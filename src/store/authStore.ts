import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Assignee, UserRole } from '../data/types';
import { FULL_ACCESS_ROLES } from '../data/types';

export const USER_ROLES: UserRole[] = [
  {
    id: 'mentor',
    name: 'Producer',
    title: 'Loyiha Rahbari',
    emoji: '👑',
    description: 'To\'liq kirish — barcha sahifalar, rejalar, moliya, jamoani boshqarish',
    color: 'border-gold bg-gold/10 text-gold',
    fullAccess: true,
  },
  {
    id: 'assistent',
    name: 'Yordamchi',
    title: 'Producer yordamchisi',
    emoji: '🤝',
    description: 'To\'liq kirish — Producer bilan bir xil imkoniyatlar',
    color: 'border-blue-400 bg-blue-400/10 text-blue-300',
    fullAccess: true,
  },
  {
    id: 'targetolog',
    name: 'Targetolog',
    title: 'Reklama Mutaxassisi',
    emoji: '🎯',
    description: 'Faqat o\'z tasklari: Meta Ads, auditoriyalar, kreativlar, hisobotlar',
    color: 'border-purple-400 bg-purple-400/10 text-purple-300',
    fullAccess: false,
  },
  {
    id: 'sotuvchi1',
    name: 'Sotuvchi 1',
    title: 'Savdo Menejeri',
    emoji: '💼',
    description: 'Faqat o\'z tasklari: qo\'ng\'iroqlar, dojim, sotuv sessiyasi',
    color: 'border-green-400 bg-green-400/10 text-green-300',
    fullAccess: false,
  },
  {
    id: 'sotuvchi2',
    name: 'Sotuvchi 2',
    title: 'Savdo Menejeri',
    emoji: '💼',
    description: 'Faqat o\'z tasklari: qo\'ng\'iroqlar, dojim, sotuv sessiyasi',
    color: 'border-emerald-400 bg-emerald-400/10 text-emerald-300',
    fullAccess: false,
  },
  {
    id: 'dizayner',
    name: 'Dizayner',
    title: 'Grafik Dizayner',
    emoji: '🎨',
    description: 'Faqat o\'z tasklari: vizuallar, brending, kreativlar, shablonlar',
    color: 'border-pink-400 bg-pink-400/10 text-pink-300',
    fullAccess: false,
  },
  {
    id: 'videograf',
    name: 'Videograf',
    title: 'Video Kontent Yaratuvchi',
    emoji: '🎬',
    description: 'Faqat o\'z tasklari: s\'yomka, montaj, Reels, kontent kalendar',
    color: 'border-red-400 bg-red-400/10 text-red-300',
    fullAccess: false,
  },
  {
    id: 'jamoa',
    name: 'Jamoa',
    title: 'Umumiy Jamoa a\'zosi',
    emoji: '👥',
    description: 'Jamoaviy tasklar: umumiy tadbirlar, yig\'ilishlar, umumiy vazifalar',
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
