import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Session } from '@supabase/supabase-js';
import type { Assignee, UserRole } from '../data/types';
import { FULL_ACCESS_ROLES } from '../data/types';
import { supabase, SUPABASE_CONFIGURED } from '../lib/supabase';
import { auth } from '../lib/api';

// ──────────────────────────────────────────────────────────────────
// Role definitions (UI config, not stored in DB)
// ──────────────────────────────────────────────────────────────────
export const USER_ROLES: UserRole[] = [
  {
    id: 'mentor',
    name: 'Producer',
    title: 'Project Lead & Presenter',
    emoji: '👑',
    description: 'Full access — all pages, finance model, analytics, team management, KPIs',
    color: 'border-gold bg-gold/10 text-gold',
    fullAccess: true,
  },
  {
    id: 'assistent',
    name: 'Ops Manager',
    title: 'Producer Assistant / Project Ops',
    emoji: '🤝',
    description: 'Full access — same as Producer: ops, logistics, coordination, reporting',
    color: 'border-blue-400 bg-blue-400/10 text-blue-300',
    fullAccess: true,
  },
  {
    id: 'targetolog',
    name: 'Traffic Mgr',
    title: 'Paid Traffic Specialist',
    emoji: '🎯',
    description: 'Own tasks only: Meta Ads, Audiences, Creatives A/B, Pixel, CPL/ROAS reporting',
    color: 'border-purple-400 bg-purple-400/10 text-purple-300',
    fullAccess: false,
  },
  {
    id: 'sotuvchi1',
    name: 'Sales Closer 1',
    title: 'Sales Manager / Closer',
    emoji: '💼',
    description: 'Own tasks only: Outbound calls, Follow-up, Sales session, Objection handling',
    color: 'border-green-400 bg-green-400/10 text-green-300',
    fullAccess: false,
  },
  {
    id: 'sotuvchi2',
    name: 'Sales Closer 2',
    title: 'Sales Manager / Closer',
    emoji: '💼',
    description: 'Own tasks only: Outbound calls, Follow-up, Sales session, Objection handling',
    color: 'border-emerald-400 bg-emerald-400/10 text-emerald-300',
    fullAccess: false,
  },
  {
    id: 'dizayner',
    name: 'Creative',
    title: 'Creative Designer',
    emoji: '🎨',
    description: 'Own tasks only: Visuals, Branding, Creatives, Templates, Seminar Pack design',
    color: 'border-pink-400 bg-pink-400/10 text-pink-300',
    fullAccess: false,
  },
  {
    id: 'videograf',
    name: 'Video Creator',
    title: 'Video Production Specialist',
    emoji: '🎬',
    description: 'Own tasks only: Shoot, Edit, Reels production, Content calendar execution',
    color: 'border-red-400 bg-red-400/10 text-red-300',
    fullAccess: false,
  },
  {
    id: 'jamoa',
    name: 'Team',
    title: 'General Team Member',
    emoji: '👥',
    description: 'Team tasks: shared events, meetings, team-wide activities',
    color: 'border-gray-400 bg-gray-400/10 text-gray-300',
    fullAccess: false,
  },
];

// ──────────────────────────────────────────────────────────────────
// Store state
// ──────────────────────────────────────────────────────────────────
interface AuthState {
  // Supabase session
  session: Session | null;
  supabaseUser: User | null;

  // Role override (for demo mode without Supabase)
  currentUser: Assignee | null;
  loginAt: string | null;

  // Loading states
  loading: boolean;
  initialized: boolean;
}

interface AuthActions {
  // Supabase auth
  signIn:  (email: string, password: string) => Promise<{ error: string | null }>;
  signUp:  (email: string, password: string, roleId: Assignee, displayName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  initAuth: () => Promise<void>;

  // Demo / role selector mode (fallback when Supabase not configured)
  login:   (role: Assignee) => void;
  logout:  () => void;

  // Getters
  isLoggedIn:    () => boolean;
  hasFullAccess: () => boolean;
  getCurrentRole: () => UserRole | null;
  getCurrentRoleId: () => Assignee | null;
  getSupabaseUserId: () => string | null;
}

type AuthStore = AuthState & AuthActions;


export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // ── State ──
      session: null,
      supabaseUser: null,
      currentUser: null,
      loginAt: null,
      loading: false,
      initialized: false,

      // ── Supabase Auth ──
      initAuth: async () => {
        if (!SUPABASE_CONFIGURED) {
          set({ initialized: true });
          return;
        }
        const { data: { session } } = await auth.getSession();
        set({ session, supabaseUser: session?.user ?? null, initialized: true });

        // Listen for auth state changes
        supabase.auth.onAuthStateChange((_event, session) => {
          set({ session, supabaseUser: session?.user ?? null });
        });
      },

      signIn: async (email, password) => {
        set({ loading: true });
        const { data, error } = await auth.signIn(email, password);
        if (error) {
          set({ loading: false });
          return { error: error.message };
        }
        set({ session: data.session, supabaseUser: data.user, loading: false });
        return { error: null };
      },

      signUp: async (email, password, roleId, displayName) => {
        set({ loading: true });
        const { data, error } = await auth.signUp(email, password, roleId, displayName);
        if (error) {
          set({ loading: false });
          return { error: error.message };
        }
        set({ session: data.session, supabaseUser: data.user, loading: false });
        return { error: null };
      },

      signOut: async () => {
        if (SUPABASE_CONFIGURED) await auth.signOut();
        set({ session: null, supabaseUser: null, currentUser: null, loginAt: null });
      },

      // ── Demo / Role Selector (fallback) ──
      login: (role) => set({ currentUser: role, loginAt: new Date().toISOString() }),
      logout: () => {
        get().signOut();
      },

      // ── Getters ──
      isLoggedIn: () => {
        const s = get();
        if (SUPABASE_CONFIGURED) return s.supabaseUser !== null;
        return s.currentUser !== null;
      },

      hasFullAccess: () => {
        const roleId = get().getCurrentRoleId();
        return roleId !== null && FULL_ACCESS_ROLES.includes(roleId);
      },

      getCurrentRoleId: (): Assignee | null => {
        const s = get();
        // If Supabase is configured, get role from user metadata
        if (SUPABASE_CONFIGURED && s.supabaseUser) {
          const meta = s.supabaseUser.user_metadata;
          return (meta?.role_id as Assignee) || 'jamoa';
        }
        return s.currentUser;
      },

      getCurrentRole: () => {
        const roleId = get().getCurrentRoleId();
        if (!roleId) return null;
        return USER_ROLES.find((r) => r.id === roleId) || null;
      },

      getSupabaseUserId: () => {
        return get().supabaseUser?.id || null;
      },
    }),
    {
      name: 'moysklad-auth-v2',
      partialize: (state) => ({
        currentUser: state.currentUser,
        loginAt:     state.loginAt,
      }),
    }
  )
);
