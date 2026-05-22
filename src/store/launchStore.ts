import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TeamMember, Badge, KPI, LaunchState, LaunchStage, TaskResource, CustomMember, MemberContact } from '../data/types';
import {
  PHASES,
  LAUNCH_STAGES,
  SUB_MODULES,
  INITIAL_TASKS,
  INITIAL_TEAM,
  INITIAL_BADGES,
  INITIAL_KPIS,
} from '../data/phases';

interface XPPopup {
  id: string;
  amount: number;
  taskTitle: string;
}

interface LaunchStore extends LaunchState {
  xpPopups: XPPopup[];
  // taskId -> resources (admin belgilagan shablonlar)
  taskResourceLinks: Record<string, TaskResource[]>;
  // taskId -> completed work URL (jamoa a'zolari joylashgan natijalar)
  taskResultLinks: Record<string, string>;
  // Qo'shimcha jamoa a'zolari (tasksiz)
  customMembers: CustomMember[];
  // Rol -> real kontakt ma'lumot
  memberContacts: Record<string, MemberContact>;
  // Ochilgan bonuslar ID lari
  unlockedBonuses: string[];

  // Actions
  completeTask: (taskId: string, assignee?: string) => void;
  uncompleteTask: (taskId: string) => void;
  setTaskInProgress: (taskId: string) => void;
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  deleteTask: (taskId: string) => void;
  updateKPI: (field: keyof KPI, value: number) => void;
  setCurrentDay: (day: number) => void;
  dismissXPPopup: (id: string) => void;
  resetAll: () => void;
  setTaskResources: (taskId: string, resources: TaskResource[]) => void;
  addTaskResource: (taskId: string, resource: TaskResource) => void;
  removeTaskResource: (taskId: string, index: number) => void;
  setTaskResultLink: (taskId: string, url: string) => void;
  clearTaskResultLink: (taskId: string) => void;
  addCustomMember: (member: Omit<CustomMember, 'id' | 'addedAt'>) => void;
  updateCustomMember: (id: string, updates: Partial<Omit<CustomMember, 'id' | 'addedAt'>>) => void;
  removeCustomMember: (id: string) => void;
  setMemberContact: (roleId: string, contact: MemberContact) => void;
  unlockBonus: (bonusId: string) => void;
  resetBonus: (bonusId: string) => void;

  // Computed helpers
  getPhaseProgress: (phaseId: number) => number;
  getSubModuleProgress: (subModuleId: string) => number;
  getSubModulesByPhase: (phaseId: number) => typeof SUB_MODULES;
  getTasksBySubModule: (subModuleId: string) => Task[];
  getTodayTasks: () => Task[];
  getTasksByPhase: (phaseId: number) => Task[];
  getTasksByDay: (day: number) => Task[];
  getTotalXPForPhase: (phaseId: number) => number;
  getEarnedXPForPhase: (phaseId: number) => number;
  getTotalXPForSubModule: (subModuleId: string) => number;
  getEarnedXPForSubModule: (subModuleId: string) => number;

  // Qulflash (ketma-ket ochilish)
  getStageProgress: (stageId: LaunchStage) => number;
  isStageUnlocked: (stageId: LaunchStage) => boolean;
  isPhaseUnlocked: (phaseId: number) => boolean;
  isSubModuleUnlocked: (subModuleId: string) => boolean;
  getUnlockHint: (stageId: LaunchStage) => string | null;
}

const INITIAL_STATE: LaunchState = {
  phases: PHASES,
  tasks: INITIAL_TASKS,
  team: INITIAL_TEAM,
  kpis: INITIAL_KPIS,
  totalXP: 0,
  streak: 0,
  badges: INITIAL_BADGES,
  currentDay: -30,
  lastActiveDate: '',
};

const INITIAL_RESOURCE_LINKS: Record<string, TaskResource[]> = {};
const INITIAL_RESULT_LINKS: Record<string, string> = {};
const INITIAL_CUSTOM_MEMBERS: CustomMember[] = [];
const INITIAL_MEMBER_CONTACTS: Record<string, MemberContact> = {};
const INITIAL_UNLOCKED_BONUSES: string[] = [];

function checkAndAwardBadges(
  badges: Badge[],
  tasks: Task[],
  kpis: KPI,
  streak: number,
): Badge[] {
  return badges.map((badge) => {
    if (badge.earned) return badge;

    let earned = false;
    const now = new Date().toISOString();

    switch (badge.condition) {
      case 'phase1_complete':
        earned = tasks.filter((t) => t.phaseId === 1).every((t) => t.status === 'done');
        break;
      case 'phase2_complete':
        earned = tasks.filter((t) => t.phaseId === 2).every((t) => t.status === 'done');
        break;
      case 'leads_50':
        earned = kpis.leads >= 50;
        break;
      case 'streak_3':
        earned = streak >= 3;
        break;
      case 'streak_7':
        earned = streak >= 7;
        break;
      case 'seminar_sales_10':
        earned = kpis.courseSales >= 10;
        break;
      case 'course_sales_15':
        earned = kpis.courseSales >= 15;
        break;
      case 'all_phases_complete':
        earned = tasks.every((t) => t.status === 'done');
        break;
      case 'manychat_leads_100':
        earned = kpis.leads >= 100;
        break;
    }

    return earned ? { ...badge, earned: true, earnedAt: now } : badge;
  });
}

function updateStreak(lastActiveDate: string, currentStreak: number): { streak: number; lastActiveDate: string } {
  const today = new Date().toDateString();
  const last = lastActiveDate ? new Date(lastActiveDate).toDateString() : '';

  if (last === today) {
    return { streak: currentStreak, lastActiveDate };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  if (last === yesterdayStr) {
    return { streak: currentStreak + 1, lastActiveDate: new Date().toISOString() };
  }

  return { streak: 1, lastActiveDate: new Date().toISOString() };
}

export const useLaunchStore = create<LaunchStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      xpPopups: [],
      taskResourceLinks: INITIAL_RESOURCE_LINKS,
      taskResultLinks: INITIAL_RESULT_LINKS,
      customMembers: INITIAL_CUSTOM_MEMBERS,
      memberContacts: INITIAL_MEMBER_CONTACTS,
      unlockedBonuses: INITIAL_UNLOCKED_BONUSES,

      completeTask: (taskId, assigneeOverride) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === taskId);
        if (!task || task.status === 'done') return;

        const { streak, lastActiveDate } = updateStreak(state.lastActiveDate, state.streak);
        const newTotalXP = state.totalXP + task.xpReward;

        const newTasks = state.tasks.map((t) =>
          t.id === taskId ? { ...t, status: 'done' as const } : t
        );

        const assigneeId = assigneeOverride || task.assignee;
        const newTeam = state.team.map((m) =>
          m.id === assigneeId
            ? { ...m, xp: m.xp + task.xpReward, tasksCompleted: m.tasksCompleted + 1, streak }
            : m
        );

        const newBadges = checkAndAwardBadges(state.badges, newTasks, state.kpis, streak);

        const popup: XPPopup = {
          id: `${taskId}-${Date.now()}`,
          amount: task.xpReward,
          taskTitle: task.title,
        };

        set({
          tasks: newTasks,
          team: newTeam,
          totalXP: newTotalXP,
          streak,
          lastActiveDate,
          badges: newBadges,
          xpPopups: [...state.xpPopups, popup],
        });

        setTimeout(() => {
          get().dismissXPPopup(popup.id);
        }, 3000);
      },

      uncompleteTask: (taskId) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === taskId);
        if (!task || task.status !== 'done') return;

        const newTasks = state.tasks.map((t) =>
          t.id === taskId ? { ...t, status: 'pending' as const } : t
        );

        const newTeam = state.team.map((m) =>
          m.id === task.assignee
            ? { ...m, xp: Math.max(0, m.xp - task.xpReward), tasksCompleted: Math.max(0, m.tasksCompleted - 1) }
            : m
        );

        set({
          tasks: newTasks,
          team: newTeam,
          totalXP: Math.max(0, state.totalXP - task.xpReward),
        });
      },

      setTaskInProgress: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, status: 'inprogress' as const } : t
          ),
        }));
      },

      addTask: (task) => {
        const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        set((state) => ({
          tasks: [...state.tasks, { ...task, id, status: 'pending' as const }],
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        }));
      },

      updateKPI: (field, value) => {
        set((state) => {
          const newKpis = { ...state.kpis, [field]: value };
          const newBadges = checkAndAwardBadges(state.tasks, state.tasks, newKpis, state.streak);
          return { kpis: newKpis, badges: newBadges };
        });
      },

      setCurrentDay: (day) => set({ currentDay: day }),

      dismissXPPopup: (id) => {
        set((state) => ({
          xpPopups: state.xpPopups.filter((p) => p.id !== id),
        }));
      },

      resetAll: () => set({
        ...INITIAL_STATE,
        xpPopups: [],
        taskResourceLinks: {},
        taskResultLinks: {},
        customMembers: [],
        memberContacts: {},
      }),

      setTaskResources: (taskId, resources) =>
        set((state) => ({
          taskResourceLinks: { ...state.taskResourceLinks, [taskId]: resources },
        })),

      addTaskResource: (taskId, resource) =>
        set((state) => ({
          taskResourceLinks: {
            ...state.taskResourceLinks,
            [taskId]: [...(state.taskResourceLinks[taskId] || []), resource],
          },
        })),

      removeTaskResource: (taskId, index) =>
        set((state) => ({
          taskResourceLinks: {
            ...state.taskResourceLinks,
            [taskId]: (state.taskResourceLinks[taskId] || []).filter((_, i) => i !== index),
          },
        })),

      setTaskResultLink: (taskId, url) =>
        set((state) => ({
          taskResultLinks: { ...state.taskResultLinks, [taskId]: url },
        })),

      clearTaskResultLink: (taskId) =>
        set((state) => {
          const { [taskId]: _, ...rest } = state.taskResultLinks;
          return { taskResultLinks: rest };
        }),

      addCustomMember: (member) =>
        set((state) => ({
          customMembers: [
            ...state.customMembers,
            {
              ...member,
              id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              addedAt: new Date().toISOString(),
            },
          ],
        })),

      updateCustomMember: (id, updates) =>
        set((state) => ({
          customMembers: state.customMembers.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),

      removeCustomMember: (id) =>
        set((state) => ({
          customMembers: state.customMembers.filter((m) => m.id !== id),
        })),

      setMemberContact: (roleId, contact) =>
        set((state) => ({
          memberContacts: { ...state.memberContacts, [roleId]: contact },
        })),

      unlockBonus: (bonusId) =>
        set((state) => ({
          unlockedBonuses: state.unlockedBonuses.includes(bonusId)
            ? state.unlockedBonuses
            : [...state.unlockedBonuses, bonusId],
        })),

      resetBonus: (bonusId) =>
        set((state) => ({
          unlockedBonuses: state.unlockedBonuses.filter((id) => id !== bonusId),
        })),

      getPhaseProgress: (phaseId) => {
        const tasks = get().tasks.filter((t) => t.phaseId === phaseId);
        if (tasks.length === 0) return 0;
        const done = tasks.filter((t) => t.status === 'done').length;
        return Math.round((done / tasks.length) * 100);
      },

      getSubModuleProgress: (subModuleId) => {
        const tasks = get().tasks.filter((t) => t.subModuleId === subModuleId);
        if (tasks.length === 0) return 0;
        const done = tasks.filter((t) => t.status === 'done').length;
        return Math.round((done / tasks.length) * 100);
      },

      getSubModulesByPhase: (phaseId) => {
        return SUB_MODULES.filter((sm) => sm.phaseId === phaseId).sort((a, b) => a.order - b.order);
      },

      getTasksBySubModule: (subModuleId) => {
        return get().tasks.filter((t) => t.subModuleId === subModuleId);
      },

      getTotalXPForSubModule: (subModuleId) => {
        return get().tasks
          .filter((t) => t.subModuleId === subModuleId)
          .reduce((sum, t) => sum + t.xpReward, 0);
      },

      getEarnedXPForSubModule: (subModuleId) => {
        return get().tasks
          .filter((t) => t.subModuleId === subModuleId && t.status === 'done')
          .reduce((sum, t) => sum + t.xpReward, 0);
      },

      getTodayTasks: () => {
        const { tasks, currentDay } = get();
        return tasks.filter((t) => t.day === currentDay);
      },

      getTasksByPhase: (phaseId) => {
        return get().tasks.filter((t) => t.phaseId === phaseId);
      },

      getTasksByDay: (day) => {
        return get().tasks.filter((t) => t.day === day);
      },

      getTotalXPForPhase: (phaseId) => {
        return get()
          .tasks.filter((t) => t.phaseId === phaseId)
          .reduce((sum, t) => sum + t.xpReward, 0);
      },

      getEarnedXPForPhase: (phaseId) => {
        return get()
          .tasks.filter((t) => t.phaseId === phaseId && t.status === 'done')
          .reduce((sum, t) => sum + t.xpReward, 0);
      },

      getStageProgress: (stageId) => {
        const stage = LAUNCH_STAGES.find((s) => s.id === stageId);
        if (!stage) return 0;
        const tasks = get().tasks.filter((t) => stage.phaseIds.includes(t.phaseId));
        if (tasks.length === 0) return 0;
        const done = tasks.filter((t) => t.status === 'done').length;
        return Math.round((done / tasks.length) * 100);
      },

      isStageUnlocked: (_stageId) => true,

      isPhaseUnlocked: (phaseId) => {
        const phase = PHASES.find((p) => p.id === phaseId);
        return !!phase;
      },

      isSubModuleUnlocked: (subModuleId) => {
        const sm = SUB_MODULES.find((s) => s.id === subModuleId);
        return !!sm;
      },

      getUnlockHint: (_stageId) => null,
    }),
    {
      name: 'moysklad-launch-store',
      version: 5,
      migrate: (_persistedState, _version) => {
        // Version bumped — reset tasks/badges to fresh data (keeps KPI, XP, streak)
        return {};
      },
      partialize: (state) => ({
        tasks: state.tasks,
        team: state.team,
        kpis: state.kpis,
        totalXP: state.totalXP,
        streak: state.streak,
        badges: state.badges,
        currentDay: state.currentDay,
        lastActiveDate: state.lastActiveDate,
        taskResourceLinks: state.taskResourceLinks,
        taskResultLinks: state.taskResultLinks,
        customMembers: state.customMembers,
        memberContacts: state.memberContacts,
        unlockedBonuses: state.unlockedBonuses,
      }),
    }
  )
);
