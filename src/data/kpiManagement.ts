import type { KPI } from './types';

/** Zapusk maqsadlari — barcha sahifalar bilan mos */
export const KPI_TARGETS = {
  leads: 200,
  registrations: 200,
  attendees: 200,
  seminarTickets: 200,
  courseSales: 20,
  coursePriceUsd: 1500,
  seminarPriceUzs: 600_000,
  callsMade: 250,
  partnerPosts: 5,
  dojimExtraSales: 7,
  adSpendMaxUsd: 600,
  cplTargetUsd: 7.5,
  totalRevenueUsd: 30_000,
  totalSeminarRevenueUzs: 200 * 600_000,
};

export type KpiHealth = 'good' | 'warning' | 'critical' | 'neutral';

export function getHealth(pct: number, warningAt = 50, goodAt = 85): KpiHealth {
  if (pct >= goodAt) return 'good';
  if (pct >= warningAt) return 'warning';
  if (pct > 0) return 'critical';
  return 'neutral';
}

export function conversionRate(from: number, to: number): number {
  if (from <= 0) return 0;
  return Math.round((to / from) * 100);
}

export const FUNNEL_STAGES = [
  {
    id: 'leads',
    label: 'Leadlar',
    emoji: '📥',
    key: 'leads' as keyof KPI,
    target: KPI_TARGETS.leads,
    color: 'bg-blue-500',
    description: 'Landing, Meta Ads, ManyChat, hamkor UTM',
    benchmark: 'CPL < $7.5 · 200+ maqsad',
  },
  {
    id: 'registrations',
    label: 'Seminar ro\'yxat',
    emoji: '✅',
    key: 'registrations' as keyof KPI,
    target: KPI_TARGETS.registrations,
    color: 'bg-purple-500',
    description: '600k to\'lov yoki tasdiqlangan forma',
    benchmark: 'Lead → Reg: 70%+ (issiq auditoriya)',
  },
  {
    id: 'attendees',
    label: 'Seminarga keldi',
    emoji: '👥',
    key: 'attendees' as keyof KPI,
    target: KPI_TARGETS.attendees,
    color: 'bg-amber-500',
    description: 'T+0 zalda ro\'yxatdan o\'tgan',
    benchmark: 'Reg → Keldi: 90%+ (tasdiq + eslatma)',
  },
  {
    id: 'seminarSales',
    label: 'Chipta to\'landi',
    emoji: '🎫',
    key: 'seminarSales' as keyof KPI,
    target: KPI_TARGETS.seminarTickets,
    color: 'bg-orange-500',
    description: '600,000 so\'m seminar (filter)',
    benchmark: 'Keldi ≈ chipta (oldindan to\'lov)',
  },
  {
    id: 'courseSales',
    label: 'Kurs $1,500',
    emoji: '💰',
    key: 'courseSales' as keyof KPI,
    target: KPI_TARGETS.courseSales,
    color: 'bg-green-500',
    description: 'Zal + dojim (T+1-7)',
    benchmark: 'Keldi → Kurs: 10%+ (20/200)',
  },
];

export const SECONDARY_KPIS = [
  {
    key: 'callsMade' as keyof KPI,
    label: 'Qo\'ng\'iroqlar',
    emoji: '📞',
    target: KPI_TARGETS.callsMade,
    description: 'Lead tasdiqlash + dojim',
    tip: '200+ qo\'ng\'iroq · 1 sotuv ~10-15 ta qo\'ng\'iroq',
  },
  {
    key: 'partnerPosts' as keyof KPI,
    label: 'Hamkor postlar',
    emoji: '🤝',
    target: KPI_TARGETS.partnerPosts,
    description: 'PR kollaboratsiya',
    tip: '3-5 hamkor · 30+ lead/post maqsad',
  },
];

export const FINANCIAL_SUMMARY = {
  course: {
    label: 'Kurs daromadi (USD)',
    goal: KPI_TARGETS.totalRevenueUsd,
    formula: (sales: number) => sales * KPI_TARGETS.coursePriceUsd,
  },
  seminar: {
    label: 'Seminar daromadi (so\'m)',
    goal: KPI_TARGETS.totalSeminarRevenueUzs,
    formula: (tickets: number) => tickets * KPI_TARGETS.seminarPriceUzs,
  },
};

export const WEEKLY_MILESTONES = [
  { phase: 'Faza 1-2', days: 'T-30 → T-11', leads: 0, regs: 0, note: 'Poydevor + trafik mashina' },
  { phase: 'Faza 3', days: 'T-10 → T-1', leads: 150, regs: 120, note: 'Isitish, kunlik kontent' },
  { phase: 'Seminar', days: 'T0', leads: 200, regs: 200, note: '200 keldi · 20 kurs zalda' },
  { phase: 'Dojim', days: 'T+1 → T+7', courseExtra: 7, note: '+5-7 kurs dojim' },
  { phase: 'Kurs', days: 'T+14', courseTotal: 20, note: '1-dars · onboarding' },
];

export const KPI_ALERTS = [
  { id: 'cpl', check: (k: KPI, spend = 0) => k.leads > 0 && spend / k.leads > KPI_TARGETS.cplTargetUsd, message: 'CPL maqsaddan yuqori — kreativ/auditoriya optimizatsiya' },
  { id: 'reg', check: (k: KPI) => k.leads >= 50 && conversionRate(k.leads, k.registrations) < 50, message: 'Lead → Reg past — qo\'ng\'iroq va ManyChat tekshiring' },
  { id: 'show', check: (k: KPI) => k.registrations >= 50 && conversionRate(k.registrations, k.attendees) < 75, message: 'No-show ko\'p — SMS/WhatsApp eslatma kuchaytiring' },
  { id: 'close', check: (k: KPI) => k.attendees >= 30 && conversionRate(k.attendees, k.courseSales) < 8, message: 'Zal konversiya past — taklif, sotuvchi, jonli keys tekshiring' },
];

export const CHANNEL_TRACKING = [
  { channel: 'Instagram Reels', metric: 'Reach / Lead', target: '80+ lead', owner: 'Targetolog + Mentor' },
  { channel: 'Meta Ads', metric: 'CPL / Spend', target: '< $7.5 · < $600', owner: 'Targetolog' },
  { channel: 'ManyChat / Bot', metric: 'Lead', target: '50+', owner: 'Assistent' },
  { channel: 'Hamkorlar', metric: 'Lead / Sotuv', target: '30+ lead · 8+ sotuv', owner: 'Mentor' },
  { channel: 'Qo\'ng\'iroq', metric: 'Konversiya', target: '15%+', owner: 'Sotuvchilar' },
  { channel: 'SMS / WhatsApp', metric: 'Tasdiq', target: '90%+ kelish', owner: 'Assistent' },
];

export const EDIT_QUICK_ACTIONS: { label: string; key: keyof KPI; delta: number }[] = [
  { label: '+1 Lead', key: 'leads', delta: 1 },
  { label: '+5 Lead', key: 'leads', delta: 5 },
  { label: '+1 Ro\'yxat', key: 'registrations', delta: 1 },
  { label: '+1 Keldi', key: 'attendees', delta: 1 },
  { label: '+1 Chipta', key: 'seminarSales', delta: 1 },
  { label: '+1 Kurs', key: 'courseSales', delta: 1 },
  { label: '+10 Qo\'ng\'iroq', key: 'callsMade', delta: 10 },
  { label: '+1 Hamkor post', key: 'partnerPosts', delta: 1 },
];
