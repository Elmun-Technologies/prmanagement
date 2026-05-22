export type TaskStatus = 'pending' | 'inprogress' | 'done';
export type Assignee =
  | 'mentor'
  | 'targetolog'
  | 'sotuvchi1'
  | 'sotuvchi2'
  | 'assistent'
  | 'dizayner'
  | 'videograf'
  | 'jamoa';

export type PhaseColor = 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'phase5';
export type LaunchStage = 'pre-seminar' | 'seminar' | 'main-course';

/** Producer va Yordamchi — to'liq kirish. Qolganlar — faqat o'z tasklari. */
export const FULL_ACCESS_ROLES: Assignee[] = ['mentor', 'assistent'];

export interface UserRole {
  id: Assignee;
  name: string;
  title: string;
  emoji: string;
  description: string;
  color: string;
  fullAccess: boolean;
}
export type ResourceType = 'sheets' | 'forms' | 'docs' | 'slides' | 'drive' | 'link';

export interface TaskResource {
  type: ResourceType;
  label: string;       // "Mijozlar jadvali"
  url: string;         // Google Drive / Forms URL
  hint: string;        // "Yuklab oling, to'ldiring, qayta yuboring"
  required: boolean;   // Taskni bajarish uchun majburiy
}

export interface LaunchStageInfo {
  id: LaunchStage;
  order: number;
  label: string;
  subtitle: string;
  description: string;
  emoji: string;
  phaseIds: number[];
}

export interface SubModule {
  id: string;        // e.g. "1.1", "2.3"
  phaseId: number;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export interface Task {
  id: string;
  phaseId: number;
  subModuleId: string; // e.g. "1.1"
  day: number; // T-30 = -30, T0 = 0, T+1 = 1
  title: string;
  description: string;
  assignee: Assignee;
  status: TaskStatus;
  xpReward: number;
  category: 'bozor' | 'kontent' | 'trafik' | 'logistika' | 'sotuv' | 'dojim' | 'hamkor';
}

export interface Phase {
  id: number;
  name: string;
  shortName: string;
  goal: string;
  color: PhaseColor;
  stage: LaunchStage;
  dayStart: number;
  dayEnd: number;
  emoji: string;
}

export interface TeamMember {
  id: Assignee;
  name: string;
  role: string;
  avatar: string;
  xp: number;
  tasksCompleted: number;
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  earned: boolean;
  earnedAt?: string;
  condition: string;
}

export interface KPI {
  leads: number;
  registrations: number;
  attendees: number;
  seminarSales: number; // 600,000 UZS tickets sold
  courseSales: number;  // $1,500 course sales
  callsMade: number;
  partnerPosts: number;
}

export interface LaunchState {
  phases: Phase[];
  tasks: Task[];
  team: TeamMember[];
  kpis: KPI;
  totalXP: number;
  streak: number;
  badges: Badge[];
  currentDay: number;
  lastActiveDate: string;
}
