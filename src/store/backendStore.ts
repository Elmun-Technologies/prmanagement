/**
 * backendStore — syncs with Supabase in real-time.
 * This store overlays the local launchStore:
 *   - Task statuses come from Supabase (real-time)
 *   - KPI values come from Supabase (real-time)
 *   - Standups, bonuses, org nodes all from Supabase
 */
import { create } from 'zustand';
import { tasks as tasksApi, kpis as kpisApi, bonuses as bonusesApi, announcements as announcementsApi, userXP } from '../lib/api';
import type { DbAnnouncement } from '../lib/supabase';
import { SUPABASE_CONFIGURED } from '../lib/supabase';
import { useAuthStore } from './authStore';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error' | 'offline';

interface BackendState {
  // Sync metadata
  syncStatus: SyncStatus;
  lastSyncAt: string | null;
  isOnline: boolean;

  // Remote data
  taskStatuses:   Record<string, 'pending' | 'inprogress' | 'done'>;
  kpiValues:      Record<string, number>;
  unlockedBonuses: string[];
  announcements:  DbAnnouncement[];

  // Online users (presence)
  onlineUsers: { roleId: string; roleName: string; emoji: string }[];
}

interface BackendActions {
  initialize:    () => Promise<void>;
  setTaskStatus: (taskId: string, status: 'pending' | 'inprogress' | 'done') => Promise<void>;
  setKpi:        (key: string, value: number) => Promise<void>;
  setKpis:       (values: Record<string, number>) => Promise<void>;
  unlockBonus:   (bonusId: string) => Promise<void>;
  postAnnouncement: (ann: Omit<DbAnnouncement, 'id' | 'posted_at'>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  addXP:         (amount: number) => Promise<void>;
}

type BackendStore = BackendState & BackendActions;

export const useBackendStore = create<BackendStore>()((set, get) => ({
  syncStatus:      'idle',
  lastSyncAt:      null,
  isOnline:        navigator.onLine,
  taskStatuses:    {},
  kpiValues:       {},
  unlockedBonuses: [],
  announcements:   [],
  onlineUsers:     [],

  initialize: async () => {
    if (!SUPABASE_CONFIGURED) {
      set({ syncStatus: 'offline' });
      return;
    }

    set({ syncStatus: 'syncing' });

    try {
      // Load all data in parallel
      const [statusRows, kpiRows, bonusIds, anns] = await Promise.all([
        tasksApi.getAll(),
        kpisApi.getAll(),
        bonusesApi.getUnlocked(),
        announcementsApi.getActive(),
      ]);

      const taskStatuses: Record<string, 'pending' | 'inprogress' | 'done'> = {};
      statusRows.forEach((r) => { taskStatuses[r.task_id] = r.status; });

      set({
        taskStatuses,
        kpiValues:       kpiRows,
        unlockedBonuses: bonusIds,
        announcements:   anns,
        syncStatus:      'synced',
        lastSyncAt:      new Date().toISOString(),
      });

      // ── Subscribe to real-time changes ──
      tasksApi.subscribe((payload) => {
        const row = payload.new;
        set((state) => ({
          taskStatuses: { ...state.taskStatuses, [row.task_id]: row.status },
        }));
      });

      kpisApi.subscribe((payload) => {
        const row = payload.new;
        set((state) => ({
          kpiValues: { ...state.kpiValues, [row.key]: Number(row.value) },
        }));
      });

      bonusesApi.subscribe((payload) => {
        const row = payload.new;
        set((state) => ({
          unlockedBonuses: [...new Set([...state.unlockedBonuses, row.bonus_id])],
        }));
      });

      announcementsApi.subscribe((payload) => {
        const row = payload.new;
        set((state) => ({
          announcements: [row, ...state.announcements],
        }));
      });

    } catch (err) {
      console.error('[backendStore.initialize]', err);
      set({ syncStatus: 'error' });
    }

    // Online/offline detection
    window.addEventListener('online',  () => set({ isOnline: true }));
    window.addEventListener('offline', () => set({ isOnline: false }));
  },

  setTaskStatus: async (taskId, status) => {
    // Optimistic update
    set((state) => ({
      taskStatuses: { ...state.taskStatuses, [taskId]: status },
    }));

    if (!SUPABASE_CONFIGURED) return;

    const userId = useAuthStore.getState().getSupabaseUserId();
    const ok = await tasksApi.setStatus(taskId, status, userId || undefined);
    if (!ok) {
      // Rollback on error — we don't know old value here, so just mark as error
      set({ syncStatus: 'error' });
    }

    // Award XP when task is marked done
    if (status === 'done' && userId) {
      await userXP.addXP(userId, 10);
    }
  },

  setKpi: async (key, value) => {
    set((state) => ({
      kpiValues: { ...state.kpiValues, [key]: value },
    }));

    if (!SUPABASE_CONFIGURED) return;
    const userId = useAuthStore.getState().getSupabaseUserId();
    await kpisApi.set(key, value, userId || undefined);
  },

  setKpis: async (values) => {
    set((state) => ({
      kpiValues: { ...state.kpiValues, ...values },
    }));

    if (!SUPABASE_CONFIGURED) return;
    const userId = useAuthStore.getState().getSupabaseUserId();
    await kpisApi.setMany(values, userId || undefined);
  },

  unlockBonus: async (bonusId) => {
    set((state) => ({
      unlockedBonuses: [...new Set([...state.unlockedBonuses, bonusId])],
    }));

    if (!SUPABASE_CONFIGURED) return;
    const userId = useAuthStore.getState().getSupabaseUserId();
    await bonusesApi.unlock(bonusId, userId || undefined);
  },

  postAnnouncement: async (ann) => {
    if (!SUPABASE_CONFIGURED) return;
    const userId = useAuthStore.getState().getSupabaseUserId();
    const result = await announcementsApi.post({ ...ann, posted_by: userId });
    if (result) {
      set((state) => ({
        announcements: [result, ...state.announcements],
      }));
    }
  },

  deleteAnnouncement: async (id) => {
    set((state) => ({
      announcements: state.announcements.filter((a) => a.id !== id),
    }));
    if (!SUPABASE_CONFIGURED) return;
    await announcementsApi.delete(id);
  },

  addXP: async (amount) => {
    if (!SUPABASE_CONFIGURED) return;
    const userId = useAuthStore.getState().getSupabaseUserId();
    if (userId) await userXP.addXP(userId, amount);
  },
}));
