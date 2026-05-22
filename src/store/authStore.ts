import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Assignee, UserRole } from '../data/types';
import { FULL_ACCESS_ROLES } from '../data/types';

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

interface AuthState {
  currentUser: Assignee | null;
  loginAt: string | null;
}

interface AuthStore extends AuthState {
  login: (role: Assignee) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  hasFullAccess: () => boolean;
  getCurrentRole: () => UserRole | null;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      loginAt: null,

      login: (role) =>
        set({ currentUser: role, loginAt: new Date().toISOString() }),

      logout: () =>
        set({ currentUser: null, loginAt: null }),

      isLoggedIn: () => get().currentUser !== null,

      hasFullAccess: () => {
        const user = get().currentUser;
        return user !== null && FULL_ACCESS_ROLES.includes(user);
      },

      getCurrentRole: () => {
        const user = get().currentUser;
        if (!user) return null;
        return USER_ROLES.find((r) => r.id === user) || null;
      },
    }),
    {
      name: 'moysklad-auth',
      partialize: (state) => ({
        currentUser: state.currentUser,
        loginAt: state.loginAt,
      }),
    }
  )
);
