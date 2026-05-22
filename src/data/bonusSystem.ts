import type { Assignee } from './types';

export type BonusTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';
export type BonusCategory = 'cash' | 'gift' | 'experience' | 'recognition' | 'time' | 'mystery';
export type BonusConditionType =
  | 'phase_complete'
  | 'kpi_leads'
  | 'kpi_seminar_sales'
  | 'kpi_course_sales'
  | 'streak'
  | 'xp'
  | 'team_xp'
  | 'task_count'
  | 'all_phases';

export interface BonusCondition {
  type: BonusConditionType;
  value: number;           // e.g. phaseId=1, leads=50, streak=7
  assignee?: Assignee;     // null = team bonus
}

export interface BonusReward {
  id: string;
  tier: BonusTier;
  category: BonusCategory;

  // What the worker sees BEFORE unlocking (teaser)
  teaserTitle: string;     // "Katta sovg'a kutmoqda..."
  teaserHint: string;      // "100% bajarilsa ochiladi"
  teaserEmoji: string;     // shown before unlock (always ? or 🎁)

  // What's revealed AFTER unlocking (the actual reward)
  actualTitle: string;     // "500,000 so'm mukofot!"
  actualDescription: string; // full details
  actualEmoji: string;     // the real emoji

  condition: BonusCondition;
  assigneeTarget: Assignee | 'all' | 'top_performer'; // who gets this
  assigneeLabel: string;   // "Barcha jamoa" / "Targetolog" / "Eng yaxshi xodim"

  // Surprise level (1=obvious, 5=total mystery)
  surpriseLevel: 1 | 2 | 3 | 4 | 5;
  // Whether this is a "personal" surprise (admin manually gives it)
  isManual?: boolean;
}

export interface SurpriseCard {
  id: string;
  emoji: string;
  title: string;
  description: string;
  condition: string;
  tier: BonusTier;
}

// ─── Tier config ─────────────────────────────────────────────────────────────

export const TIER_CONFIG: Record<BonusTier, {
  label: string; color: string; bg: string; border: string;
  glow: string; star: string;
}> = {
  bronze:    { label: 'Bronza',    color: 'text-orange-400',  bg: 'bg-orange-500/10',   border: 'border-orange-500/30',  glow: 'shadow-orange-500/20',  star: '🥉' },
  silver:    { label: 'Kumush',    color: 'text-gray-300',    bg: 'bg-gray-400/10',     border: 'border-gray-400/30',    glow: 'shadow-gray-400/20',    star: '🥈' },
  gold:      { label: 'Oltin',     color: 'text-gold',        bg: 'bg-gold/10',         border: 'border-gold/30',        glow: 'shadow-gold/20',        star: '🥇' },
  platinum:  { label: 'Platina',   color: 'text-blue-300',    bg: 'bg-blue-500/10',     border: 'border-blue-500/30',    glow: 'shadow-blue-500/20',    star: '💎' },
  legendary: { label: 'Legendary', color: 'text-purple-300',  bg: 'bg-purple-500/10',   border: 'border-purple-500/30', glow: 'shadow-purple-500/20', star: '👑' },
};

// ─── All bonus rewards ────────────────────────────────────────────────────────

export const BONUS_REWARDS: BonusReward[] = [

  // ══════════════════════════════════════════════════════
  // PHASE COMPLETION BONUSES (syurpriz qutichalar)
  // ══════════════════════════════════════════════════════

  {
    id: 'phase1-done',
    tier: 'bronze',
    category: 'experience',
    teaserTitle: 'Bosqich 1 syurprizi 🎁',
    teaserHint: 'Bozor tahlili 100% bajarilsa ochiladi',
    teaserEmoji: '🎁',
    actualTitle: 'Jamoa nonushta partiyasi! 🍳',
    actualDescription: 'Butun jamoa uchun Premium nonushta! Mentor tanlagan kafeda ertalab uchrashuv — strategiya muhokamasi bilan birga. Budget: 400,000 so\'m.',
    actualEmoji: '🍳',
    condition: { type: 'phase_complete', value: 1 },
    assigneeTarget: 'all',
    assigneeLabel: 'Butun jamoa',
    surpriseLevel: 4,
  },

  {
    id: 'phase2-done',
    tier: 'silver',
    category: 'mystery',
    teaserTitle: 'Katta syurpriz sizni kutmoqda ✨',
    teaserHint: 'Marketing infra 100% tayyor bo\'lganda ochiladi',
    teaserEmoji: '🎁',
    actualTitle: 'Jamoa uchun "Sovg\'a qutisi" + 1,000,000 so\'m!',
    actualDescription: 'Har bir a\'zo uchun alohida sovg\'a qutisi (AirPods, SmartWatch, sumka, parfyum — kimga nima tushadi bilmaydi!) + umumiy 1,000,000 so\'m pul mukofoti jamoaga bo\'linadi.',
    actualEmoji: '🎊',
    condition: { type: 'phase_complete', value: 2 },
    assigneeTarget: 'all',
    assigneeLabel: 'Butun jamoa',
    surpriseLevel: 5,
  },

  {
    id: 'phase3-done',
    tier: 'gold',
    category: 'cash',
    teaserTitle: 'Oltin kuticha sizni kutmoqda 🔒',
    teaserHint: 'Progrev (T-10 dan T-1) bosqichi tugaganda ochiladi',
    teaserEmoji: '🔒',
    actualTitle: 'Har bir a\'zoga 500,000 so\'m + "Olov" badge!',
    actualDescription: 'Butun jamoa T-10 dan T0 gacha barcha tasklarni 100% bajargani uchun — har bir a\'zoga 500,000 so\'m naqd pul mukofoti va eksklyuziv "Olov" unvoni beriladi.',
    actualEmoji: '💰',
    condition: { type: 'phase_complete', value: 3 },
    assigneeTarget: 'all',
    assigneeLabel: 'Butun jamoa',
    surpriseLevel: 3,
  },

  {
    id: 'phase4-done',
    tier: 'platinum',
    category: 'cash',
    teaserTitle: '💎 Seminar natijasiga qarab katta mukofot',
    teaserHint: 'Seminar kuni va keyingi bosqich tugagach ochiladi',
    teaserEmoji: '💎',
    actualTitle: 'Seminar natijasiga qarab: 2,000,000 so\'m jamoa fondi!',
    actualDescription: '20+ kurs sotilsa — 2,000,000 so\'m jamoa mukofot fondi. Eng ko\'p yopgan sotuvchi: 800,000, 2-chi: 400,000, qolgan jamoa: 200,000 dan. PLUS har bir sotuvchi uchun kurs sotuvidagi 3% komissiya.',
    actualEmoji: '🏆',
    condition: { type: 'phase_complete', value: 4 },
    assigneeTarget: 'all',
    assigneeLabel: 'Butun jamoa + Sotuvchilar',
    surpriseLevel: 2,
  },

  {
    id: 'phase5-done',
    tier: 'legendary',
    category: 'mystery',
    teaserTitle: '👑 GRAND PRIZE — Afsonaviy mukofot',
    teaserHint: 'Kurs muvaffaqiyatli tugagach, barcha tasklar 100% bajarilsa ochiladi',
    teaserEmoji: '👑',
    actualTitle: 'GRAND PRIZE: Sayohat + 5,000,000 so\'m + Keyingi loyihada ko\'proq ulush!',
    actualDescription: 'Butun zapusk muvaffaqiyatli yakunlangani uchun — 1) Jamoa uchun weekend sayohati (Chimyon/Charvak) 2) Har bir a\'zoga 1,000,000 so\'m (Mentor 2x) 3) Keyingi kurs zapuskida har bir a\'zoga +1% ulush beriladi. Bu real afsonaviy yutuq!',
    actualEmoji: '🌟',
    condition: { type: 'all_phases', value: 100 },
    assigneeTarget: 'all',
    assigneeLabel: 'Butun jamoa — GRAND PRIZE',
    surpriseLevel: 5,
  },

  // ══════════════════════════════════════════════════════
  // KPI MILESTONES (natijaga qarab)
  // ══════════════════════════════════════════════════════

  {
    id: 'leads-50',
    tier: 'bronze',
    category: 'recognition',
    teaserTitle: '50 lead syurprizi 🎯',
    teaserHint: 'Birinchi 50 ta lead yig\'ilganda ochiladi',
    teaserEmoji: '🎯',
    actualTitle: 'Targetolog: "Trafik Ustasi" unvoni + 300,000 so\'m!',
    actualDescription: '50 ta lead — bu birinchi katta milestone! Targetolog uchun: 300,000 so\'m naqd + "Trafik Ustasi" rasmiy unvoni + LinkedIn/Instagram da e\'lon. Butun jamoa uchun: kichik tort 🎂',
    actualEmoji: '🎯',
    condition: { type: 'kpi_leads', value: 50 },
    assigneeTarget: 'targetolog',
    assigneeLabel: 'Targetolog (asosan) + Jamoa',
    surpriseLevel: 3,
  },

  {
    id: 'leads-100',
    tier: 'silver',
    category: 'cash',
    teaserTitle: '100 lead — platinum chegarasi 🚀',
    teaserHint: '100 ta lead to\'planganda bu ochiladi',
    teaserEmoji: '🚀',
    actualTitle: 'Targetolog: 500,000 so\'m + Yangi gadjet!',
    actualDescription: '100 lead — MAQSAD bajarildi! Targetolog uchun 500,000 so\'m naqd + o\'zi tanlagan gadjet (AirPods yoki SmartWatch, budget 800k gacha). Butun jamoaga: restoranda kechki ovqat!',
    actualEmoji: '💫',
    condition: { type: 'kpi_leads', value: 100 },
    assigneeTarget: 'targetolog',
    assigneeLabel: 'Targetolog + Restoran kechki ovqat',
    surpriseLevel: 4,
  },

  {
    id: 'leads-200',
    tier: 'gold',
    category: 'mystery',
    teaserTitle: '🔥 200 lead — Alanga darajasi!',
    teaserHint: '200 lead yig\'ilsa bu oltin kuticha ochiladi',
    teaserEmoji: '🔥',
    actualTitle: 'Targetolog: 1,500,000 so\'m + Keyingi loyihada mustaqil budget!',
    actualDescription: '200 lead — bu REKORD! Targetolog 1,500,000 so\'m mukofot + keyingi zapusk uchun o\'zi boshqaradigan 5,000,000 so\'m reklama byudjeti va to\'liq muxtoriyat. Bu katta ishonch!',
    actualEmoji: '🔥',
    condition: { type: 'kpi_leads', value: 200 },
    assigneeTarget: 'targetolog',
    assigneeLabel: 'Targetolog — Katta yutuq!',
    surpriseLevel: 5,
  },

  {
    id: 'seminar-10-sales',
    tier: 'silver',
    category: 'cash',
    teaserTitle: '🎤 Seminar sotuvlari syurprizi',
    teaserHint: 'Seminarda 10+ kurs sotilsa ochiladi',
    teaserEmoji: '🎤',
    actualTitle: 'Sotuvchilar: 200,000 so\'mdan + "Yopuvchi" unvoni!',
    actualDescription: 'Birinchi 10 ta kurs yopildi — boshlandi! Har bir sotuvchiga 200,000 so\'m naqd. Eng ko\'p yopganga "Altın Yopuvchi" 🥇 unvoni va 300,000 so\'m qo\'shimcha.',
    actualEmoji: '💼',
    condition: { type: 'kpi_seminar_sales', value: 10 },
    assigneeTarget: 'all',
    assigneeLabel: 'Sotuvchilar (asosan)',
    surpriseLevel: 3,
  },

  {
    id: 'seminar-20-sales',
    tier: 'gold',
    category: 'cash',
    teaserTitle: '🏆 20 sotuv — MAQSAD!',
    teaserHint: 'Seminarda 20 ta kurs sotilsa bu KATTA mukofot ochiladi',
    teaserEmoji: '🏆',
    actualTitle: 'MAQSAD BAJARILDI! Sotuvchi 1: 700k, Sotuvchi 2: 500k, Mentor: 500k!',
    actualDescription: '20 ta kurs = maqsad 100%! Mukofotlar: Eng yaxshi sotuvchi — 700,000 so\'m, 2-chi sotuvchi — 500,000 so\'m, Mentor — 500,000 so\'m, Targetolog — 300,000 so\'m, Assistent — 200,000 so\'m. PLUS: Jamoa sertifikati va keyingi loyihada umumiy foiz oshadi.',
    actualEmoji: '🎊',
    condition: { type: 'kpi_seminar_sales', value: 20 },
    assigneeTarget: 'all',
    assigneeLabel: 'Barcha jamoa — KATTA MUKOFOT',
    surpriseLevel: 2,
  },

  {
    id: 'course-5-sales',
    tier: 'silver',
    category: 'cash',
    teaserTitle: '📚 Dastlabki kurs sotuvlari',
    teaserHint: 'Asosiy kursdan 5 ta sotuv bo\'lgach ochiladi',
    teaserEmoji: '📚',
    actualTitle: 'Sotuvchilar: 3% komissiya + "Kurs Agenti" badge!',
    actualDescription: 'Birinchi 5 ta kurs ($7,500 aylanma) — kuchli start! Har bir sotuvchi sotgan kursdan 3% komissiya oladi. Bu bonus doimiy — har yangi sotuvda to\'lanadi. PLUS "Kurs Agenti" professional badge.',
    actualEmoji: '📚',
    condition: { type: 'kpi_course_sales', value: 5 },
    assigneeTarget: 'all',
    assigneeLabel: 'Sotuvchilar — Komissiya tizimi',
    surpriseLevel: 3,
  },

  {
    id: 'course-15-sales',
    tier: 'platinum',
    category: 'mystery',
    teaserTitle: '💎 15 kurs — Platina yutuq!',
    teaserHint: '15 ta kurs sotilsa bu ochiladi — ichida nima borligini bilmaysiz!',
    teaserEmoji: '💎',
    actualTitle: 'Syurpriz: Jamoa uchun maxsus tadbirga chiptalar!',
    actualDescription: 'Bu kutilmagan syurpriz! Jamoa tanlagan ko\'ngilochar tadbir uchun to\'liq chiptalar (kontsert, teatr, sport o\'yini, yoki weekend Resort) — narxi 3,000,000 so\'m gacha. Qo\'shimcha: har bir a\'zoga 500,000 so\'m "yaxshi yashang" puli.',
    actualEmoji: '🎭',
    condition: { type: 'kpi_course_sales', value: 15 },
    assigneeTarget: 'all',
    assigneeLabel: 'Butun jamoa — Maxsus tadbir!',
    surpriseLevel: 5,
  },

  {
    id: 'course-20-sales',
    tier: 'legendary',
    category: 'cash',
    teaserTitle: '👑 20 kurs — AFSONAVIY MAQSAD!',
    teaserHint: '20 ta kurs = $30,000 — bu erishilganda o\'ta katta mukofot ochiladi',
    teaserEmoji: '👑',
    actualTitle: 'REKORD! Har bir sotuvchi: 1,500,000 so\'m + Keyingi loyihada 5% ulush!',
    actualDescription: '20 ta kurs = $30,000 aylanma = REKORD! Mukofotlar: Har bir sotuvchi 1,500,000 so\'m naqd. Mentor 2,000,000 so\'m. Targetolog 1,000,000 so\'m. Assistent 800,000 so\'m. PLUS — barcha jamoa keyingi loyihada 5% ulush oladi (foydadan). Bu kelajak sarmoyasi!',
    actualEmoji: '💎',
    condition: { type: 'kpi_course_sales', value: 20 },
    assigneeTarget: 'all',
    assigneeLabel: 'Barcha jamoa — LEGENDARY MUKOFOT',
    surpriseLevel: 2,
  },

  // ══════════════════════════════════════════════════════
  // STREAK BONUSES (ketma-ket ish)
  // ══════════════════════════════════════════════════════

  {
    id: 'streak-3',
    tier: 'bronze',
    category: 'recognition',
    teaserTitle: '🔥 3 kun streaki — Kichik syurpriz',
    teaserHint: '3 kun ketma-ket ishlang — biror narsa sizni kutmoqda',
    teaserEmoji: '🔥',
    actualTitle: '"Olov" unvoni + Maxsus kofye partiyasi ☕',
    actualDescription: '3 kun uzluksiz ishlagansiz — bu g\'ayrat! "Olov" unvoni + kofye va shirinliklar bilan kichik to\'y. Hech kim bilmaydi — kutilmagan quvonch!',
    actualEmoji: '☕',
    condition: { type: 'streak', value: 3 },
    assigneeTarget: 'all',
    assigneeLabel: 'Streak egasi',
    surpriseLevel: 4,
  },

  {
    id: 'streak-7',
    tier: 'silver',
    category: 'time',
    teaserTitle: '⚡ 7 kunlik streak — Katta mukofot',
    teaserHint: '7 kun uzluksiz ishlasangiz bu ochiladi',
    teaserEmoji: '⚡',
    actualTitle: 'Dam olish kuni + 200,000 so\'m "yashash uchun" pul!',
    actualDescription: '1 hafta uzluksiz mehnat — siz haqiqiy chempionsiz! Mukofot: 1 ta to\'liq dam olish kuni + 200,000 so\'m naqd. Buni qanday sarflashingiz sizga bog\'liq. Hech kimga sir!',
    actualEmoji: '🌟',
    condition: { type: 'streak', value: 7 },
    assigneeTarget: 'all',
    assigneeLabel: 'Haftalik chempion',
    surpriseLevel: 4,
  },

  {
    id: 'streak-14',
    tier: 'gold',
    category: 'mystery',
    teaserTitle: '🌟 14 kun — Afsonaviy chidamlilik!',
    teaserHint: '2 hafta uzluksiz ishlasangiz — bu mis\' tilli kuticha sizni kutmoqda',
    teaserEmoji: '🌟',
    actualTitle: 'SYURPRIZ PAKETI: Nima borligini bilmaysiz toki ochmaguningizcha!',
    actualDescription: 'Bu maxsus paket — oldindan hech kimga aytilmaydi. Ichida: yoki premium gadjet, yoki sayohat chiptasi, yoki kurs sertifikati, yoki naqd 500k, yoki bularning kombinatsiyasi. Faqat siz bilasiz — va ochilganda haqiqiy WOW moment!',
    actualEmoji: '🎁',
    condition: { type: 'streak', value: 14 },
    assigneeTarget: 'all',
    assigneeLabel: 'Chidamlilik chempioni',
    surpriseLevel: 5,
  },

  // ══════════════════════════════════════════════════════
  // XP MILESTONES
  // ══════════════════════════════════════════════════════

  {
    id: 'xp-1000',
    tier: 'bronze',
    category: 'recognition',
    teaserTitle: '⚡ 1,000 XP — Birinchi chegara',
    teaserHint: '1,000 XP to\'plang — kichik syurpriz kutmoqda',
    teaserEmoji: '⚡',
    actualTitle: '"Tadbirkor" darajasi + Maxsus profil badge!',
    actualDescription: '1,000 XP — siz haqiqiy ishchi! Tizimda "Tadbirkor" darajasiga ko\'tarilasiz + profilingizga eksklyuziv badge. Bu faqat tizim ichida emas — real hayotda ham e\'lon qilinadi (Instagram story).',
    actualEmoji: '⚡',
    condition: { type: 'xp', value: 1000 },
    assigneeTarget: 'all',
    assigneeLabel: 'XP milestoni',
    surpriseLevel: 3,
  },

  {
    id: 'xp-3000',
    tier: 'gold',
    category: 'cash',
    teaserTitle: '🏅 3,000 XP — Oltin chegara!',
    teaserHint: '3,000 XP = katta yutuq, katta mukofot',
    teaserEmoji: '🏅',
    actualTitle: '"Sotuv Ustasi" darajasi + 300,000 so\'m naqd!',
    actualDescription: '3,000 XP — siz zapuskning asosiy kuchi! "Sotuv Ustasi" darajasi + 300,000 so\'m naqd pul. Bu pul hech qanday shart-sharoitsiz — shunchaki siz yaxshi ishlagansiz uchun.',
    actualEmoji: '🏅',
    condition: { type: 'xp', value: 3000 },
    assigneeTarget: 'all',
    assigneeLabel: 'XP chempioni',
    surpriseLevel: 3,
  },

  {
    id: 'xp-5000',
    tier: 'legendary',
    category: 'mystery',
    teaserTitle: '👑 5,000 XP — LEGENDARY darajasi!',
    teaserHint: '5,000 XP = afsonaviy mukofot, hech kim hali ochmagan',
    teaserEmoji: '👑',
    actualTitle: '"Moysklad Legend" + Keyingi loyihada PARTNER sifatida!',
    actualDescription: '5,000 XP — siz bu zapuskning qahramonisiz! Mukofotlar: 1) "Moysklad Legend" rasmiy unvoni 2) Keyingi loyihada to\'liq partner sifatida kirasiz (foyda ulushi bilan) 3) Sizning ismingiz keyingi kursning marketing materiallarida e\'lon qilinadi.',
    actualEmoji: '👑',
    condition: { type: 'xp', value: 5000 },
    assigneeTarget: 'all',
    assigneeLabel: 'Moysklad Legend',
    surpriseLevel: 5,
  },
];

// ─── Computed helpers ─────────────────────────────────────────────────────────

export interface BonusProgress {
  bonus: BonusReward;
  currentValue: number;
  targetValue: number;
  percentage: number;
  isUnlocked: boolean;
}

export function computeBonusProgress(
  bonus: BonusReward,
  kpis: { leads: number; seminarSales: number; courseSales: number },
  totalXP: number,
  streak: number,
  phaseProgress: Record<number, number>,  // phaseId -> %
  allPhasesComplete: boolean,
  unlockedBonusIds: string[],
): BonusProgress {
  const isUnlocked = unlockedBonusIds.includes(bonus.id);
  let currentValue = 0;
  let targetValue = bonus.condition.value;

  switch (bonus.condition.type) {
    case 'phase_complete':
      currentValue = phaseProgress[bonus.condition.value] || 0;
      targetValue = 100;
      break;
    case 'kpi_leads':
      currentValue = kpis.leads;
      targetValue = bonus.condition.value;
      break;
    case 'kpi_seminar_sales':
      currentValue = kpis.seminarSales;
      targetValue = bonus.condition.value;
      break;
    case 'kpi_course_sales':
      currentValue = kpis.courseSales;
      targetValue = bonus.condition.value;
      break;
    case 'streak':
      currentValue = streak;
      targetValue = bonus.condition.value;
      break;
    case 'xp':
      currentValue = totalXP;
      targetValue = bonus.condition.value;
      break;
    case 'all_phases':
      currentValue = allPhasesComplete ? 100 : 0;
      targetValue = 100;
      break;
    default:
      currentValue = 0;
  }

  const percentage = Math.min(100, Math.round((currentValue / targetValue) * 100));
  const shouldUnlock = percentage >= 100 && !isUnlocked;

  return {
    bonus,
    currentValue,
    targetValue,
    percentage,
    isUnlocked: isUnlocked || shouldUnlock,
  };
}

// Motivational messages shown near almost-unlocked bonuses
export const ALMOST_THERE_MESSAGES = [
  'Sal qoldi! Davom eting! 🔥',
  'Hozir ochilmoqchi! 💫',
  'Oxirgi sprint! 🚀',
  'Deyarli yetdingiz! ⚡',
  'Bu kuticha sizniki! 🎁',
];

// Random unlock celebration messages
export const UNLOCK_MESSAGES = [
  '🎉 WOW! Ajoyib natija!',
  '🔥 FIRE! Siz zo\'rsiz!',
  '💎 MUKOFOT OCHILDI!',
  '🚀 INCREDIBLE!',
  '⭐ LEGENDARY MOVE!',
];
