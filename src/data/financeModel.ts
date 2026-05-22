// ─────────────────────────────────────────────────────────
// MOLIYA MODELI — MoySklad PRO Seminar + Kurs Launch
// ─────────────────────────────────────────────────────────

export const USD_RATE = 12_700; // so'm per $1

// ─────────────────────────────────────────────────────────
// 3 TA STSENARIY
// ─────────────────────────────────────────────────────────
export interface Scenario {
  id: 'pessimistic' | 'realistic' | 'optimistic';
  label: string;
  emoji: string;
  color: string;
  border: string;
  params: ScenarioParams;
}

export interface ScenarioParams {
  // Seminar
  registrations: number;       // ro'yxatdan o'tganlar soni
  showUpRate: number;          // zalga kelish foizi (0-100)
  seminarPrice: number;        // kirish narxi (so'm)
  // Kurs
  conversionRate: number;      // seminar → kurs % (0-100)
  coursePrice: number;         // kurs narxi ($)
  dojimsales: number;          // dojim orqali qo'shimcha sotuvlar
  // Marketing
  metaAdsBudget: number;       // Meta Ads (so'm)
  bloggerBudget: number;       // blogger/PR (so'm)
  // Event
  venueRent: number;           // zal ijarasi (so'm)
  cateringBudget: number;      // katering (so'm)
  seminarPack: number;         // pack narxi × soni (so'm)
  eventMisc: number;           // decor, foto, video (so'm)
  // Jamoa
  targetologFee: number;       // targetolog haq (so'm)
  assistentFee: number;        // assistent haq (so'm)
  salesCommissionPct: number;  // sotuvchi komissiya % (kurs narxidan)
  // Kurs yetkazish
  coursePackCost: number;      // course pack × soni (so'm)
  platformCost: number;        // platforma, tools (so'm)
  certificateCost: number;     // sertifikat × soni (so'm)
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'pessimistic',
    label: 'Pessimistik',
    emoji: '😟',
    color: 'text-red-400',
    border: 'border-red-500/30',
    params: {
      registrations: 150,
      showUpRate: 50,
      seminarPrice: 600_000,
      conversionRate: 7,
      coursePrice: 1_500,
      dojimsales: 3,
      metaAdsBudget: 8_000_000,
      bloggerBudget: 2_000_000,
      venueRent: 4_000_000,
      cateringBudget: 4_000_000,
      seminarPack: 150 * 25_000,
      eventMisc: 1_200_000,
      targetologFee: 2_500_000,
      assistentFee: 2_000_000,
      salesCommissionPct: 5,
      coursePackCost: 13 * 30_000,
      platformCost: 300_000,
      certificateCost: 13 * 20_000,
    },
  },
  {
    id: 'realistic',
    label: 'Realistik',
    emoji: '🎯',
    color: 'text-gold',
    border: 'border-gold/40',
    params: {
      registrations: 250,
      showUpRate: 65,
      seminarPrice: 600_000,
      conversionRate: 10,
      coursePrice: 1_500,
      dojimsales: 6,
      metaAdsBudget: 10_000_000,
      bloggerBudget: 3_500_000,
      venueRent: 4_500_000,
      cateringBudget: 5_000_000,
      seminarPack: 250 * 25_000,
      eventMisc: 1_700_000,
      targetologFee: 3_000_000,
      assistentFee: 2_500_000,
      salesCommissionPct: 5,
      coursePackCost: 22 * 30_000,
      platformCost: 300_000,
      certificateCost: 22 * 20_000,
    },
  },
  {
    id: 'optimistic',
    label: 'Optimistik',
    emoji: '🚀',
    color: 'text-green-400',
    border: 'border-green-500/30',
    params: {
      registrations: 350,
      showUpRate: 75,
      seminarPrice: 600_000,
      conversionRate: 14,
      coursePrice: 1_500,
      dojimsales: 8,
      metaAdsBudget: 12_000_000,
      bloggerBudget: 5_000_000,
      venueRent: 5_000_000,
      cateringBudget: 6_500_000,
      seminarPack: 350 * 25_000,
      eventMisc: 2_000_000,
      targetologFee: 3_500_000,
      assistentFee: 3_000_000,
      salesCommissionPct: 5,
      coursePackCost: 28 * 30_000,
      platformCost: 300_000,
      certificateCost: 28 * 20_000,
    },
  },
];

// ─────────────────────────────────────────────────────────
// HISOB-KITOB FUNKSIYASI
// ─────────────────────────────────────────────────────────
export interface FinanceResult {
  // Asosiy ko'rsatkichlar
  attendees: number;
  courseSalesFromSeminar: number;
  totalCourseSales: number;

  // Daromad (so'm)
  seminarIncome: number;
  courseSeminarIncome: number;
  courseDojimIncome: number;
  totalRevenue: number;

  // Xarajat (so'm)
  marketingCosts: number;
  eventCosts: number;
  teamCosts: number;
  deliveryCosts: number;
  totalCosts: number;

  // Foyda
  grossProfit: number;
  netProfitSom: number;
  netProfitUsd: number;
  roi: number;
  roasMarketing: number;

  // CPL va CPS
  cplSom: number;
  cpsSom: number;
  revenuePerAttendee: number;

  // Break-even
  breakEvenCourses: number;
}

export function calcFinance(p: ScenarioParams): FinanceResult {
  const attendees = Math.round(p.registrations * (p.showUpRate / 100));
  const courseSalesFromSeminar = Math.round(attendees * (p.conversionRate / 100));
  const totalCourseSales = courseSalesFromSeminar + p.dojimsales;

  // DAROMAD
  const seminarIncome = p.registrations * p.seminarPrice;
  const courseSeminarIncome = courseSalesFromSeminar * p.coursePrice * USD_RATE;
  const courseDojimIncome = p.dojimsales * p.coursePrice * USD_RATE;
  const totalRevenue = seminarIncome + courseSeminarIncome + courseDojimIncome;

  // XARAJAT
  const marketingCosts = p.metaAdsBudget + p.bloggerBudget;
  const eventCosts = p.venueRent + p.cateringBudget + p.seminarPack + p.eventMisc;
  const salesCommissionTotal = totalCourseSales * p.coursePrice * USD_RATE * (p.salesCommissionPct / 100);
  const teamCosts = p.targetologFee + p.assistentFee + salesCommissionTotal;
  const deliveryCosts = p.coursePackCost + p.platformCost + p.certificateCost;
  const totalCosts = marketingCosts + eventCosts + teamCosts + deliveryCosts;

  // FOYDA
  const netProfitSom = totalRevenue - totalCosts;
  const netProfitUsd = netProfitSom / USD_RATE;
  const roi = totalCosts > 0 ? Math.round((netProfitSom / totalCosts) * 100) : 0;
  const roasMarketing = marketingCosts > 0 ? Math.round((totalRevenue / marketingCosts) * 10) / 10 : 0;

  // CPL va CPS
  const cplSom = p.registrations > 0 ? Math.round(marketingCosts / p.registrations) : 0;
  const cpsSom = totalCourseSales > 0 ? Math.round(totalCosts / totalCourseSales) : 0;
  const revenuePerAttendee = attendees > 0 ? Math.round(totalRevenue / attendees) : 0;

  // Break-even: nechta kurs sotilsa xarajat qoplanadi
  const breakEvenCourses = Math.ceil(
    (totalCosts - seminarIncome) / (p.coursePrice * USD_RATE * (1 - p.salesCommissionPct / 100))
  );

  return {
    attendees, courseSalesFromSeminar, totalCourseSales,
    seminarIncome, courseSeminarIncome, courseDojimIncome, totalRevenue,
    marketingCosts, eventCosts, teamCosts, deliveryCosts, totalCosts,
    grossProfit: totalRevenue - eventCosts - deliveryCosts,
    netProfitSom, netProfitUsd, roi, roasMarketing,
    cplSom, cpsSom, revenuePerAttendee,
    breakEvenCourses: Math.max(0, breakEvenCourses),
  };
}

// ─────────────────────────────────────────────────────────
// PULSLAR OQIMI (Cash Flow) — kunlar bo'yicha
// ─────────────────────────────────────────────────────────
export interface CashFlowItem {
  day: number;
  label: string;
  amount: number;   // + daromad, - xarajat (so'm)
  type: 'income' | 'expense' | 'balance';
  category: string;
}

export function buildCashFlow(p: ScenarioParams): CashFlowItem[] {
  const r = calcFinance(p);
  const items: CashFlowItem[] = [
    { day: -30, label: 'Meta Ads — 1-oy', amount: -Math.round(p.metaAdsBudget * 0.5), type: 'expense', category: 'Marketing' },
    { day: -20, label: 'Meta Ads — 2-oy', amount: -Math.round(p.metaAdsBudget * 0.3), type: 'expense', category: 'Marketing' },
    { day: -15, label: 'Blogger / PR shartnoma', amount: -Math.round(p.bloggerBudget * 0.7), type: 'expense', category: 'Marketing' },
    { day: -10, label: 'Meta Ads — isitish', amount: -Math.round(p.metaAdsBudget * 0.2), type: 'expense', category: 'Marketing' },
    { day: -7,  label: 'Zal bron avans', amount: -Math.round(p.venueRent * 0.5), type: 'expense', category: 'Logistika' },
    { day: -5,  label: 'Seminar Pack buyurtma', amount: -p.seminarPack, type: 'expense', category: 'Logistika' },
    { day: -5,  label: 'Blogger qolgan to\'lov', amount: -Math.round(p.bloggerBudget * 0.3), type: 'expense', category: 'Marketing' },
    { day: -3,  label: 'Targetolog oy haq', amount: -p.targetologFee, type: 'expense', category: 'Jamoa' },
    { day: -2,  label: 'Katering buyurtma (avans)', amount: -Math.round(p.cateringBudget * 0.5), type: 'expense', category: 'Logistika' },
    { day: -1,  label: 'Assistent + boshqa', amount: -(p.assistentFee + p.eventMisc), type: 'expense', category: 'Jamoa' },
    { day: 0,   label: 'Seminar kirish daromad', amount: r.seminarIncome, type: 'income', category: 'Seminar' },
    { day: 0,   label: 'Zal qolgan to\'lov + katering', amount: -(Math.round(p.venueRent * 0.5) + Math.round(p.cateringBudget * 0.5)), type: 'expense', category: 'Logistika' },
    { day: 0,   label: 'Kurs sotuvlar (zalda)', amount: r.courseSeminarIncome, type: 'income', category: 'Kurs' },
    { day: 1,   label: 'Kurs to\'lovlar kelishi (1-kun)', amount: Math.round(r.courseSeminarIncome * 0.6), type: 'income', category: 'Kurs' },
    { day: 3,   label: 'Dojim sotuvlar boshlanadi', amount: Math.round(r.courseDojimIncome * 0.5), type: 'income', category: 'Dojim' },
    { day: 5,   label: 'Course Pack xarajati', amount: -p.coursePackCost, type: 'expense', category: 'Kurs' },
    { day: 7,   label: 'Dojim qolgan to\'lovlar', amount: Math.round(r.courseDojimIncome * 0.5), type: 'income', category: 'Dojim' },
    { day: 7,   label: 'Platforma va tools', amount: -p.platformCost, type: 'expense', category: 'Kurs' },
    { day: 7,   label: 'Sotuvchi komissiya', amount: -Math.round(r.totalCourseSales * p.coursePrice * USD_RATE * (p.salesCommissionPct / 100)), type: 'expense', category: 'Jamoa' },
    { day: 14,  label: 'Kurs qolgan to\'lovlar', amount: Math.round(r.courseSeminarIncome * 0.4), type: 'income', category: 'Kurs' },
    { day: 21,  label: 'Sertifikat xarajati', amount: -p.certificateCost, type: 'expense', category: 'Kurs' },
  ];
  return items.sort((a, b) => a.day - b.day);
}

// ─────────────────────────────────────────────────────────
// XARAJAT KATEGORIYALAR (donut chart uchun)
// ─────────────────────────────────────────────────────────
export interface CostCategory {
  name: string;
  emoji: string;
  color: string;
  amount: number;
  pct: number;
}

export function getCostCategories(p: ScenarioParams): CostCategory[] {
  const r = calcFinance(p);
  const total = r.totalCosts;
  return [
    { name: 'Marketing', emoji: '📢', color: 'bg-blue-500', amount: r.marketingCosts, pct: Math.round((r.marketingCosts / total) * 100) },
    { name: 'Logistika', emoji: '🏛️', color: 'bg-amber-500', amount: r.eventCosts, pct: Math.round((r.eventCosts / total) * 100) },
    { name: 'Jamoa', emoji: '👥', color: 'bg-purple-500', amount: r.teamCosts, pct: Math.round((r.teamCosts / total) * 100) },
    { name: 'Kurs yetkazish', emoji: '🎓', color: 'bg-green-500', amount: r.deliveryCosts, pct: Math.round((r.deliveryCosts / total) * 100) },
  ];
}
