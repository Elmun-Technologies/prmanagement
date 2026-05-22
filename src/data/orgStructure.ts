// ─────────────────────────────────────────────
// ORG STRUCTURE — MoySklad Launch Team
// ─────────────────────────────────────────────

export interface OrgNode {
  id: string;
  parentId: string | null;
  name: string;
  title: string;
  emoji: string;
  color: string;          // Tailwind border+bg color class
  roleId?: string;        // Links to authStore role
  department: string;
  reportsTo?: string;
  level: number;          // 0 = CEO, 1 = Director, 2 = Manager, 3 = Specialist
  isExternal?: boolean;   // Partners, freelancers
  isVacant?: boolean;     // Position not yet filled
}

const ORG_STORAGE_KEY = 'moysklad-org-nodes';

const DEFAULT_NODES: OrgNode[] = [
  // ── Level 0: CEO / Project Owner
  {
    id: 'ceo',
    parentId: null,
    name: 'Project Owner',
    title: 'CEO / Founder',
    emoji: '🏆',
    color: 'border-gold bg-gold/10 text-gold',
    department: 'Leadership',
    level: 0,
  },

  // ── Level 1: Producer
  {
    id: 'producer',
    parentId: 'ceo',
    name: 'Producer',
    title: 'Project Lead & Presenter',
    emoji: '👑',
    color: 'border-gold bg-gold/10 text-gold',
    roleId: 'mentor',
    department: 'Leadership',
    level: 1,
  },

  // ── Level 2: Department Leads
  {
    id: 'ops',
    parentId: 'producer',
    name: 'Ops Manager',
    title: 'Operations & Logistics',
    emoji: '🤝',
    color: 'border-blue-400 bg-blue-400/10 text-blue-300',
    roleId: 'assistent',
    department: 'Operations',
    level: 2,
  },
  {
    id: 'marketing',
    parentId: 'producer',
    name: 'Traffic Manager',
    title: 'Paid Traffic & Performance',
    emoji: '🎯',
    color: 'border-purple-400 bg-purple-400/10 text-purple-300',
    roleId: 'targetolog',
    department: 'Marketing',
    level: 2,
  },
  {
    id: 'sales',
    parentId: 'producer',
    name: 'Sales Team',
    title: 'Revenue & Closing',
    emoji: '💰',
    color: 'border-green-400 bg-green-400/10 text-green-300',
    department: 'Sales',
    level: 2,
  },
  {
    id: 'creative',
    parentId: 'producer',
    name: 'Creative Team',
    title: 'Content & Design',
    emoji: '🎨',
    color: 'border-pink-400 bg-pink-400/10 text-pink-300',
    department: 'Creative',
    level: 2,
  },

  // ── Level 3: Specialists under Marketing
  {
    id: 'ads-specialist',
    parentId: 'marketing',
    name: 'Meta Ads Specialist',
    title: 'Campaigns · CPL · ROAS',
    emoji: '📈',
    color: 'border-purple-400/50 bg-purple-400/5 text-purple-400',
    department: 'Marketing',
    level: 3,
    isVacant: false,
  },
  {
    id: 'smm',
    parentId: 'marketing',
    name: 'SMM / Automation',
    title: 'ManyChat · Stories · Organic',
    emoji: '🤖',
    color: 'border-indigo-400/50 bg-indigo-400/5 text-indigo-400',
    department: 'Marketing',
    level: 3,
    isVacant: true,
  },

  // ── Level 3: Specialists under Sales
  {
    id: 'closer1',
    parentId: 'sales',
    name: 'Sales Closer 1',
    title: 'Front Desk · A-Segment',
    emoji: '💼',
    color: 'border-green-400/50 bg-green-400/5 text-green-400',
    roleId: 'sotuvchi1',
    department: 'Sales',
    level: 3,
  },
  {
    id: 'closer2',
    parentId: 'sales',
    name: 'Sales Closer 2',
    title: 'Floor Sales · B-Segment · Follow-up',
    emoji: '💼',
    color: 'border-emerald-400/50 bg-emerald-400/5 text-emerald-400',
    roleId: 'sotuvchi2',
    department: 'Sales',
    level: 3,
  },

  // ── Level 3: Specialists under Creative
  {
    id: 'designer',
    parentId: 'creative',
    name: 'Creative Designer',
    title: 'Visuals · Branding · Templates',
    emoji: '🎨',
    color: 'border-pink-400/50 bg-pink-400/5 text-pink-400',
    roleId: 'dizayner',
    department: 'Creative',
    level: 3,
  },
  {
    id: 'videographer',
    parentId: 'creative',
    name: 'Video Creator',
    title: 'Reels · Edit · Content Calendar',
    emoji: '🎬',
    color: 'border-red-400/50 bg-red-400/5 text-red-400',
    roleId: 'videograf',
    department: 'Creative',
    level: 3,
  },

  // ── External Partners
  {
    id: 'partner1',
    parentId: 'producer',
    name: 'Key Partner',
    title: 'BD / PR Partner',
    emoji: '🤝',
    color: 'border-gray-500/50 bg-gray-500/5 text-gray-400',
    department: 'External',
    level: 2,
    isExternal: true,
    isVacant: true,
  },
];

export function loadOrgNodes(): OrgNode[] {
  try {
    const stored = localStorage.getItem(ORG_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_NODES;
}

export function saveOrgNodes(nodes: OrgNode[]) {
  localStorage.setItem(ORG_STORAGE_KEY, JSON.stringify(nodes));
}

export function getDefaultOrgNodes(): OrgNode[] {
  return DEFAULT_NODES;
}

export const DEPARTMENT_COLORS: Record<string, string> = {
  Leadership:  'bg-gold/20 text-gold border-gold/30',
  Operations:  'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Marketing:   'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Sales:       'bg-green-500/20 text-green-300 border-green-500/30',
  Creative:    'bg-pink-500/20 text-pink-300 border-pink-500/30',
  External:    'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export const COLOR_OPTIONS = [
  { label: 'Gold (Leadership)',  value: 'border-gold bg-gold/10 text-gold' },
  { label: 'Blue (Ops)',        value: 'border-blue-400 bg-blue-400/10 text-blue-300' },
  { label: 'Purple (Marketing)',value: 'border-purple-400 bg-purple-400/10 text-purple-300' },
  { label: 'Green (Sales)',     value: 'border-green-400 bg-green-400/10 text-green-300' },
  { label: 'Pink (Creative)',   value: 'border-pink-400 bg-pink-400/10 text-pink-300' },
  { label: 'Red (Video)',       value: 'border-red-400 bg-red-400/10 text-red-300' },
  { label: 'Gray (External)',   value: 'border-gray-400 bg-gray-400/10 text-gray-400' },
  { label: 'Orange',            value: 'border-orange-400 bg-orange-400/10 text-orange-300' },
  { label: 'Teal',              value: 'border-teal-400 bg-teal-400/10 text-teal-300' },
];

export const EMOJI_OPTIONS = ['👑','🤝','🎯','💰','🎨','🎬','📈','🤖','💼','📞','🔧','⚙️','📊','🏆','🚀','⚡','✍️','🖥️','📱','🎙️','🌐'];

export const DEPARTMENT_OPTIONS = ['Leadership', 'Operations', 'Marketing', 'Sales', 'Creative', 'External', 'Finance', 'HR', 'Tech'];
