import { KPI_TARGETS, FINANCIAL_SUMMARY, conversionRate } from './kpiManagement';
import type { Phase, LaunchStage } from './types';

export const STATS_TABS = [
  { id: 'overview', label: 'Ko\'rinish', icon: '📊' },
  { id: 'phases', label: 'Fazalar', icon: '📁' },
  { id: 'stages', label: 'Bosqichlar', icon: '🗺️' },
  { id: 'today', label: 'Bugun', icon: '📋' },
] as const;

export type StatsTabId = (typeof STATS_TABS)[number]['id'];

export const FUNNEL_QUICK = [
  { key: 'leads' as const, label: 'Leadlar', icon: '📥', color: 'bg-blue-500' },
  { key: 'registrations' as const, label: 'Ro\'yxat', icon: '✅', color: 'bg-purple-500' },
  { key: 'attendees' as const, label: 'Keldi', icon: '👥', color: 'bg-amber-500' },
  { key: 'seminarSales' as const, label: 'Chipta', icon: '🎫', color: 'bg-orange-500' },
  { key: 'courseSales' as const, label: 'Kurs', icon: '💰', color: 'bg-green-500' },
] as const;

export const PHASE_STYLES: Record<number, { bar: string; border: string; text: string }> = {
  1: { bar: 'bg-blue-500', border: 'border-blue-500/30', text: 'text-blue-400' },
  2: { bar: 'bg-purple-500', border: 'border-purple-500/30', text: 'text-purple-400' },
  3: { bar: 'bg-amber-500', border: 'border-amber-500/30', text: 'text-amber-400' },
  4: { bar: 'bg-green-500', border: 'border-green-500/30', text: 'text-green-400' },
  5: { bar: 'bg-indigo-500', border: 'border-indigo-500/30', text: 'text-indigo-400' },
};

export const STAGE_STYLES: Record<LaunchStage, { border: string; accent: string }> = {
  'pre-seminar': { border: 'border-blue-500/30', accent: 'text-blue-400' },
  seminar: { border: 'border-green-500/30', accent: 'text-green-400' },
  'main-course': { border: 'border-indigo-500/30', accent: 'text-indigo-400' },
};

export function formatLaunchDay(day: number): string {
  return `T${day >= 0 ? '+' : ''}${day}`;
}

export function getCurrentPhase(phases: Phase[], currentDay: number): Phase | null {
  const active = phases.find((p) => currentDay >= p.dayStart && currentDay <= p.dayEnd);
  if (active) return active;
  if (currentDay < phases[0].dayStart) return phases[0];
  return phases[phases.length - 1];
}

export function getDayPhaseHint(phase: Phase | null, currentDay: number): string {
  if (!phase) return '';
  if (currentDay < phase.dayStart) {
    return `${formatLaunchDay(phase.dayStart)} dan boshlanadi`;
  }
  if (currentDay > phase.dayEnd) {
    return `${formatLaunchDay(phase.dayEnd)} da tugadi`;
  }
  const total = phase.dayEnd - phase.dayStart + 1;
  const elapsed = currentDay - phase.dayStart + 1;
  return `${elapsed}/${total} kun · ${phase.shortName}`;
}

export function computeLaunchSnapshot(
  kpis: { leads: number; registrations: number; attendees: number; seminarSales: number; courseSales: number },
  doneTasks: number,
  totalTasks: number,
) {
  const revenue = FINANCIAL_SUMMARY.course.formula(kpis.courseSales);
  const seminarUzs = FINANCIAL_SUMMARY.seminar.formula(kpis.seminarSales);
  const taskPct = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return {
    revenue,
    seminarUzs,
    taskPct,
    regFromLead: conversionRate(kpis.leads, kpis.registrations),
    courseFromAttend: conversionRate(kpis.attendees, kpis.courseSales),
    targets: KPI_TARGETS,
  };
}

export const DAILY_STANDUP = [
  { time: '09:00', who: 'Mentor', what: 'Kun rejasi + 1 ta ustuvor KPI' },
  { time: '13:00', who: 'Assistent', what: 'Lead/CRM yangilash, eslatmalar' },
  { time: '18:00', who: 'Jamoa', what: 'Kunlik hisobot — KPI + tasklar' },
  { time: 'Dush', who: 'Mentor', what: 'Haftalik sprint — voronka tahlil' },
];

export const QUICK_LINKS = [
  { to: '/kpi', label: 'KPI Tracker', icon: '📊', desc: 'Voronka va daromad' },
  { to: '/team', label: 'Jamoa', icon: '👥', desc: 'Rollar va RACI' },
  { to: '/daily', label: 'Bugungi ishlar', icon: '📋', desc: 'Kunlik tasklar' },
  { to: '/', label: 'Zapusk', icon: '🚀', desc: 'Bosqichlar xaritasi' },
];
