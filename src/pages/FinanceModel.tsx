import { useState, useMemo } from 'react';
import {
  SCENARIOS, calcFinance, buildCashFlow, getCostCategories,
  USD_RATE, type ScenarioParams,
} from '../data/financeModel';
import ProgressBar from '../components/ProgressBar';

const TABS = [
  { id: 'overview',   label: 'Ko\'rinish',   emoji: '📊' },
  { id: 'revenue',    label: 'Daromad',      emoji: '💰' },
  { id: 'costs',      label: 'Xarajatlar',   emoji: '💸' },
  { id: 'cashflow',   label: 'Pul Oqimi',    emoji: '📈' },
  { id: 'scenarios',  label: 'Stsenariy',    emoji: '🎯' },
];

function fmt(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)} mlrd`;
  if (n >= 1_000_000)     return `${(n / 1_000_000).toFixed(1)} mln`;
  if (n >= 1_000)         return `${(n / 1_000).toFixed(0)}k`;
  return n.toLocaleString();
}
function fmtSom(n: number) { return `${fmt(n)} so'm`; }
function fmtUsd(n: number) { return `$${Math.round(n).toLocaleString()}`; }

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
  color?: string;
}
function SliderRow({ label, value, min, max, step, unit = '', onChange, color = 'accent-yellow-500' }: SliderRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 w-44 flex-shrink-0">{label}</span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={`flex-1 h-1.5 rounded-full cursor-pointer ${color}`}
        style={{ accentColor: '#c8a96e' }}
      />
      <span className="text-xs text-white font-bold w-24 text-right flex-shrink-0">
        {unit === '$' ? `$${value.toLocaleString()}` : unit === '%' ? `${value}%` : fmtSom(value)}
      </span>
    </div>
  );
}

export default function FinanceModel() {
  const [tab, setTab] = useState('overview');
  const [activeScenarioId, setActiveScenarioId] = useState<'pessimistic' | 'realistic' | 'optimistic'>('realistic');
  const [customMode, setCustomMode] = useState(false);

  const baseScenario = SCENARIOS.find(s => s.id === activeScenarioId)!;
  const [params, setParams] = useState<ScenarioParams>(baseScenario.params);

  const activeParams = customMode ? params : baseScenario.params;
  const result = useMemo(() => calcFinance(activeParams), [activeParams]);
  const cashFlow = useMemo(() => buildCashFlow(activeParams), [activeParams]);
  const costCats = useMemo(() => getCostCategories(activeParams), [activeParams]);

  function selectScenario(id: typeof activeScenarioId) {
    setActiveScenarioId(id);
    setParams(SCENARIOS.find(s => s.id === id)!.params);
    setCustomMode(false);
  }

  function updateParam<K extends keyof ScenarioParams>(key: K, val: number) {
    setCustomMode(true);
    setParams(p => ({ ...p, [key]: val }));
  }

  const cumulativeCF: { day: number; label: string; balance: number }[] = [];
  let balance = 0;
  cashFlow.forEach(item => {
    balance += item.amount;
    cumulativeCF.push({ day: item.day, label: item.label, balance });
  });

  const maxAbsBalance = Math.max(...cumulativeCF.map(c => Math.abs(c.balance)), 1);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-white">💹 Moliya Modeli</h1>
          <p className="text-gray-400 text-sm mt-1">MoySklad PRO Seminar + Kurs — to'liq moliyaviy prognoz</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">$1 =</span>
          <span className="text-gold font-bold text-sm">{USD_RATE.toLocaleString()} so'm</span>
        </div>
      </div>

      {/* Scenario selector */}
      <div className="grid grid-cols-3 gap-3">
        {SCENARIOS.map(s => {
          const r = calcFinance(s.params);
          const isActive = activeScenarioId === s.id && !customMode;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => selectScenario(s.id)}
              className={`card border-2 text-left transition-all ${
                isActive ? `${s.border} bg-dark-surface` : 'border-dark-border hover:border-dark-hover'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{s.emoji}</span>
                <span className={`font-bold text-sm ${isActive ? s.color : 'text-gray-300'}`}>{s.label}</span>
                {isActive && <span className="ml-auto text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-full">Faol</span>}
              </div>
              <p className={`text-xl font-black ${s.color}`}>{fmtSom(r.netProfitSom)}</p>
              <p className="text-xs text-gray-500 mt-0.5">Sof foyda · ROI {r.roi}%</p>
              <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-gray-400">
                <span>🎟 {s.params.registrations} reg</span>
                <span>🎓 ~{Math.round(s.params.registrations * s.params.showUpRate / 100 * s.params.conversionRate / 100) + s.params.dojimsales} kurs</span>
              </div>
            </button>
          );
        })}
      </div>
      {customMode && (
        <div className="text-xs text-gold bg-gold/10 border border-gold/30 px-3 py-1.5 rounded-lg">
          ✏️ Maxsus rejim — parametrlarni o'zgartiryapsiz
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-dark-surface rounded-xl p-1">
        {TABS.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
              tab === t.id ? 'bg-dark-card text-gold border border-gold/20' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <span className="mr-1">{t.emoji}</span>{t.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════ OVERVIEW TAB ═══════════════════════ */}
      {tab === 'overview' && (
        <div className="space-y-4">
          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Jami Daromad',  value: fmtSom(result.totalRevenue),   sub: fmtUsd(result.totalRevenue / USD_RATE), color: 'text-green-400' },
              { label: 'Jami Xarajat',  value: fmtSom(result.totalCosts),     sub: fmtUsd(result.totalCosts / USD_RATE),   color: 'text-red-400' },
              { label: 'Sof Foyda',     value: fmtSom(result.netProfitSom),   sub: fmtUsd(result.netProfitUsd),            color: 'text-gold' },
              { label: 'ROI',           value: `${result.roi}%`,               sub: `ROAS ${result.roasMarketing}x`,        color: 'text-purple-400' },
            ].map(m => (
              <div key={m.label} className="card text-center">
                <p className={`text-2xl font-black ${m.color}`}>{m.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{m.sub}</p>
                <p className="text-xs text-gray-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Funnel */}
          <div className="card space-y-3">
            <p className="text-sm font-bold text-white mb-1">📐 Sotuv Voronkasi</p>
            {[
              { label: 'Lead (reklama)', val: Math.round(activeParams.metaAdsBudget / 15_000), color: 'bg-blue-500', note: '\u2248 CPL 15,000 so\u02bcm' },
              { label: 'Registratsiya',  val: activeParams.registrations,                       color: 'bg-purple-500', note: `${Math.round(activeParams.registrations / Math.round(activeParams.metaAdsBudget / 15_000) * 100)}% konv` },
              { label: 'Zal (keldi)',    val: result.attendees,                                  color: 'bg-amber-500', note: `${activeParams.showUpRate}% show-up` },
              { label: 'Kurs (zaldan)', val: result.courseSalesFromSeminar,                     color: 'bg-green-500', note: `${activeParams.conversionRate}% konv` },
              { label: 'Dojim sotuvlar',val: activeParams.dojimsales,                           color: 'bg-emerald-500', note: 'B+D segment' },
              { label: 'JAMI KURS',     val: result.totalCourseSales,                           color: 'bg-gold', note: `~${fmtUsd(result.totalCourseSales * activeParams.coursePrice)} daromad` },
            ].map((row, i, arr) => (
              <div key={row.label}>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-36 flex-shrink-0">{row.label}</span>
                  <div className="flex-1">
                    <ProgressBar value={row.val} max={arr[0].val} color={row.color} height="h-3" />
                  </div>
                  <span className="text-sm font-bold text-white w-8 text-right flex-shrink-0">{row.val}</span>
                  <span className="text-xs text-gray-500 w-28 flex-shrink-0">{row.note}</span>
                </div>
              </div>
            ))}
          </div>

          {/* P&L jadval */}
          <div className="card">
            <p className="text-sm font-bold text-white mb-3">📋 Foyda va Zarar (P&L)</p>
            <div className="space-y-1.5 text-sm">
              {[
                { label: 'Seminar kirish daromad', val: result.seminarIncome, type: '+' },
                { label: `Kurs (zaldan, ${result.courseSalesFromSeminar} ta × $${activeParams.coursePrice})`, val: result.courseSeminarIncome, type: '+' },
                { label: `Dojim (${activeParams.dojimsales} ta × $${activeParams.coursePrice})`, val: result.courseDojimIncome, type: '+' },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between py-1 border-b border-dark-border">
                  <span className="text-gray-300">{r.label}</span>
                  <span className="text-green-400 font-semibold">+{fmtSom(r.val)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between py-1.5 border-b-2 border-dark-border font-bold">
                <span className="text-white">= JAMI DAROMAD</span>
                <span className="text-green-400">{fmtSom(result.totalRevenue)}</span>
              </div>
              {[
                { label: 'Marketing (ads + blogger)',  val: result.marketingCosts },
                { label: 'Logistika (zal, katering, pack, misc)', val: result.eventCosts },
                { label: 'Jamoa (targetolog, assistent, komissiya)', val: result.teamCosts },
                { label: 'Kurs yetkazish (pack, platforma, sertifikat)', val: result.deliveryCosts },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between py-1 border-b border-dark-border">
                  <span className="text-gray-300">{r.label}</span>
                  <span className="text-red-400 font-semibold">–{fmtSom(r.val)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between py-1.5 border-b-2 border-dark-border font-bold">
                <span className="text-white">= JAMI XARAJAT</span>
                <span className="text-red-400">–{fmtSom(result.totalCosts)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-white font-black text-base">= SOF FOYDA</span>
                <span className={`font-black text-xl ${result.netProfitSom >= 0 ? 'text-gold' : 'text-red-400'}`}>
                  {result.netProfitSom >= 0 ? '+' : ''}{fmtSom(result.netProfitSom)}
                </span>
              </div>
            </div>
          </div>

          {/* Key ratios */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'CPL (1 lead)',              val: fmtSom(result.cplSom),               sub: 'reklama xarajati / registratsiyalar', color: 'text-blue-400' },
              { label: 'CPS (1 kurs sotuv)',        val: fmtSom(result.cpsSom),               sub: 'jami xarajat / kurs sotuvlar',        color: 'text-purple-400' },
              { label: 'Revenue / zal kishi',      val: fmtSom(result.revenuePerAttendee),   sub: 'har kelgan kishidan o\'rtacha daromad', color: 'text-amber-400' },
            ].map(m => (
              <div key={m.label} className="card text-center">
                <p className={`text-xl font-black ${m.color}`}>{m.val}</p>
                <p className="text-xs text-gray-500 mt-1">{m.label}</p>
                <p className="text-xs text-gray-600 mt-0.5 italic">{m.sub}</p>
              </div>
            ))}
          </div>

          {/* Break-even */}
          <div className={`card border ${result.breakEvenCourses <= result.totalCourseSales ? 'border-green-500/30 bg-green-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{result.breakEvenCourses <= result.totalCourseSales ? '✅' : '⚠️'}</span>
              <div>
                <p className="text-white font-bold">Break-Even nuqta</p>
                <p className="text-gray-400 text-sm">
                  Barcha xarajatni qoplash uchun <span className="text-white font-bold">{result.breakEvenCourses} ta kurs</span> sotilishi kerak.
                  Prognozda <span className="text-gold font-bold">{result.totalCourseSales} ta</span> sotiladi.
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className={`text-2xl font-black ${result.breakEvenCourses <= result.totalCourseSales ? 'text-green-400' : 'text-amber-400'}`}>
                  {result.totalCourseSales - result.breakEvenCourses > 0 ? '+' : ''}{result.totalCourseSales - result.breakEvenCourses} ta
                </p>
                <p className="text-xs text-gray-500">break-evendan</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════ REVENUE TAB ═══════════════════════ */}
      {tab === 'revenue' && (
        <div className="space-y-4">
          <div className="card space-y-4">
            <p className="text-sm font-bold text-gold uppercase tracking-wide">Parametrlarni sozlash</p>
            <SliderRow label="Registratsiyalar soni" value={activeParams.registrations} min={50} max={500} step={10} unit="ta" onChange={v => updateParam('registrations', v)} />
            <SliderRow label="Show-up rate (zalga kelish)" value={activeParams.showUpRate} min={30} max={90} step={5} unit="%" onChange={v => updateParam('showUpRate', v)} />
            <SliderRow label="Kurs konversiya (zal → kurs)" value={activeParams.conversionRate} min={3} max={25} step={1} unit="%" onChange={v => updateParam('conversionRate', v)} />
            <SliderRow label="Dojim orqali sotuvlar" value={activeParams.dojimsales} min={0} max={15} step={1} unit="ta" onChange={v => updateParam('dojimsales', v)} />
            <SliderRow label="Seminar kirish narxi" value={activeParams.seminarPrice} min={200_000} max={1_000_000} step={50_000} unit="som" onChange={v => updateParam('seminarPrice', v)} />
            <SliderRow label="Kurs narxi ($)" value={activeParams.coursePrice} min={500} max={3_000} step={100} unit="$" onChange={v => updateParam('coursePrice', v)} />
          </div>

          {/* Revenue breakdown */}
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                title: '🎟 Seminar Kirish',
                formula: `${activeParams.registrations} reg × ${fmtSom(activeParams.seminarPrice)}`,
                amount: result.seminarIncome,
                amountUsd: result.seminarIncome / USD_RATE,
                color: 'text-blue-400',
                bar: 'bg-blue-500',
              },
              {
                title: '🎓 Kurs (zaldan)',
                formula: `${result.courseSalesFromSeminar} ta kurs × $${activeParams.coursePrice}`,
                amount: result.courseSeminarIncome,
                amountUsd: result.courseSalesFromSeminar * activeParams.coursePrice,
                color: 'text-green-400',
                bar: 'bg-green-500',
              },
              {
                title: '📞 Dojim sotuvlar',
                formula: `${activeParams.dojimsales} ta kurs × $${activeParams.coursePrice}`,
                amount: result.courseDojimIncome,
                amountUsd: activeParams.dojimsales * activeParams.coursePrice,
                color: 'text-emerald-400',
                bar: 'bg-emerald-500',
              },
            ].map(r => (
              <div key={r.title} className="card">
                <div className="flex items-center justify-between mb-2">
                  <p className={`font-bold ${r.color}`}>{r.title}</p>
                  <p className={`text-xl font-black ${r.color}`}>{fmtSom(r.amount)}</p>
                </div>
                <p className="text-xs text-gray-500 mb-2">{r.formula} · {fmtUsd(r.amountUsd)}</p>
                <ProgressBar value={r.amount} max={result.totalRevenue} color={r.bar} height="h-2" />
                <p className="text-xs text-gray-600 mt-1 text-right">{Math.round(r.amount / result.totalRevenue * 100)}% umumiy daromaddan</p>
              </div>
            ))}
          </div>

          <div className="card bg-green-500/5 border border-green-500/20">
            <div className="flex items-center justify-between">
              <p className="text-white font-bold">JAMI DAROMAD</p>
              <div className="text-right">
                <p className="text-3xl font-black text-green-400">{fmtSom(result.totalRevenue)}</p>
                <p className="text-sm text-gray-400">{fmtUsd(result.totalRevenue / USD_RATE)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════ COSTS TAB ═══════════════════════ */}
      {tab === 'costs' && (
        <div className="space-y-4">
          <div className="card space-y-4">
            <p className="text-sm font-bold text-gold uppercase tracking-wide">Xarajatlarni sozlash</p>
            <p className="text-xs text-gray-500 -mt-2">Marketing</p>
            <SliderRow label="Meta Ads byudjeti" value={activeParams.metaAdsBudget} min={2_000_000} max={30_000_000} step={500_000} onChange={v => updateParam('metaAdsBudget', v)} />
            <SliderRow label="Blogger / PR" value={activeParams.bloggerBudget} min={0} max={10_000_000} step={500_000} onChange={v => updateParam('bloggerBudget', v)} />
            <p className="text-xs text-gray-500">Logistika</p>
            <SliderRow label="Zal ijarasi" value={activeParams.venueRent} min={1_000_000} max={15_000_000} step={500_000} onChange={v => updateParam('venueRent', v)} />
            <SliderRow label="Katering (jami)" value={activeParams.cateringBudget} min={1_000_000} max={15_000_000} step={500_000} onChange={v => updateParam('cateringBudget', v)} />
            <p className="text-xs text-gray-500">Jamoa</p>
            <SliderRow label="Targetolog haq" value={activeParams.targetologFee} min={500_000} max={10_000_000} step={500_000} onChange={v => updateParam('targetologFee', v)} />
            <SliderRow label="Assistent haq" value={activeParams.assistentFee} min={500_000} max={10_000_000} step={500_000} onChange={v => updateParam('assistentFee', v)} />
            <SliderRow label="Sotuvchi komissiya %" value={activeParams.salesCommissionPct} min={0} max={15} step={1} unit="%" onChange={v => updateParam('salesCommissionPct', v)} />
          </div>

          {/* Cost categories */}
          <div className="grid grid-cols-2 gap-3">
            {costCats.map(c => (
              <div key={c.name} className="card">
                <div className="flex items-center gap-2 mb-2">
                  <span>{c.emoji}</span>
                  <span className="font-bold text-white text-sm">{c.name}</span>
                  <span className="ml-auto text-xs text-gray-400">{c.pct}%</span>
                </div>
                <p className="text-xl font-black text-red-400">{fmtSom(c.amount)}</p>
                <div className="mt-2">
                  <ProgressBar value={c.amount} max={result.totalCosts} color={c.color} height="h-2" />
                </div>
              </div>
            ))}
          </div>

          {/* Cost breakdown detail */}
          <div className="card">
            <p className="text-sm font-bold text-white mb-3">Batafsil xarajatlar</p>
            <div className="space-y-1.5 text-sm">
              {[
                { cat: '📢 Marketing', items: [
                  { name: 'Meta Ads', val: activeParams.metaAdsBudget },
                  { name: 'Blogger/PR', val: activeParams.bloggerBudget },
                ]},
                { cat: '🏛️ Logistika', items: [
                  { name: 'Zal ijarasi', val: activeParams.venueRent },
                  { name: 'Katering', val: activeParams.cateringBudget },
                  { name: 'Seminar Pack', val: activeParams.seminarPack },
                  { name: 'Decor, foto, video', val: activeParams.eventMisc },
                ]},
                { cat: '👥 Jamoa', items: [
                  { name: 'Targetolog', val: activeParams.targetologFee },
                  { name: 'Assistent', val: activeParams.assistentFee },
                  { name: `Sotuvchi komissiya (${activeParams.salesCommissionPct}%)`, val: result.teamCosts - activeParams.targetologFee - activeParams.assistentFee },
                ]},
                { cat: '🎓 Kurs yetkazish', items: [
                  { name: 'Course Pack', val: activeParams.coursePackCost },
                  { name: 'Platforma', val: activeParams.platformCost },
                  { name: 'Sertifikat', val: activeParams.certificateCost },
                ]},
              ].map(group => (
                <div key={group.cat}>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-3 mb-1">{group.cat}</p>
                  {group.items.map(item => (
                    <div key={item.name} className="flex items-center justify-between py-1 border-b border-dark-border">
                      <span className="text-gray-300 text-xs">{item.name}</span>
                      <span className="text-red-400 text-xs font-semibold">–{fmtSom(item.val)}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex items-center justify-between py-2 mt-2">
                <span className="text-white font-black">JAMI XARAJAT</span>
                <span className="text-red-400 font-black text-lg">–{fmtSom(result.totalCosts)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════ CASH FLOW TAB ═══════════════════════ */}
      {tab === 'cashflow' && (
        <div className="space-y-4">
          <div className="card">
            <p className="text-sm font-bold text-white mb-4">📅 Pul Oqimi — T-30 dan T+21 gacha</p>

            {/* Cumulative balance bar chart */}
            <div className="space-y-2 mb-6">
              {cumulativeCF.map((c, i) => {
                const pct = Math.abs(c.balance) / maxAbsBalance * 100;
                const isPos = c.balance >= 0;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-10 flex-shrink-0 text-right">
                      T{c.day >= 0 ? '+' : ''}{c.day}
                    </span>
                    <div className="flex-1 h-5 bg-dark-surface rounded relative overflow-hidden">
                      <div
                        className={`h-full rounded ${isPos ? 'bg-green-500/70' : 'bg-red-500/50'}`}
                        style={{ width: `${pct}%` }}
                      />
                      <span className="absolute inset-0 flex items-center px-2 text-xs font-semibold text-white">
                        {isPos ? '+' : ''}{fmtSom(c.balance)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Har bir tranzaksiya */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Barcha tranzaksiyalar</p>
            <div className="space-y-1.5">
              {cashFlow.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5 border-b border-dark-border">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs text-gray-500 w-10 flex-shrink-0">
                    T{item.day >= 0 ? '+' : ''}{item.day}
                  </span>
                  <span className="flex-1 text-xs text-gray-300">{item.label}</span>
                  <span className={`text-xs font-bold flex-shrink-0 ${item.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                    {item.type === 'income' ? '+' : '–'}{fmtSom(Math.abs(item.amount))}
                  </span>
                  <span className="text-xs text-gray-600 w-20 flex-shrink-0 text-right">{item.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cash flow summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="card text-center">
              <p className="text-xl font-black text-red-400">
                –{fmtSom(cashFlow.filter(c => c.type === 'expense' && c.day < 0).reduce((s, c) => s + Math.abs(c.amount), 0))}
              </p>
              <p className="text-xs text-gray-500 mt-1">T-30 → T-1 xarajat</p>
            </div>
            <div className="card text-center">
              <p className="text-xl font-black text-green-400">
                +{fmtSom(cashFlow.filter(c => c.type === 'income' && c.day === 0).reduce((s, c) => s + c.amount, 0))}
              </p>
              <p className="text-xs text-gray-500 mt-1">T0 seminar kirimi</p>
            </div>
            <div className="card text-center">
              <p className="text-xl font-black text-gold">
                +{fmtSom(cashFlow.filter(c => c.type === 'income' && c.day > 0).reduce((s, c) => s + c.amount, 0))}
              </p>
              <p className="text-xs text-gray-500 mt-1">T+1 → T+21 kirimi</p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════ SCENARIOS TAB ═══════════════════════ */}
      {tab === 'scenarios' && (
        <div className="space-y-4">
          {/* Comparison table */}
          <div className="card overflow-x-auto">
            <p className="text-sm font-bold text-white mb-4">Stsenariylar taqqoslash</p>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left text-gray-400 py-2 font-medium">Ko'rsatkich</th>
                  {SCENARIOS.map(s => (
                    <th key={s.id} className={`text-center py-2 font-bold ${s.color}`}>
                      {s.emoji} {s.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: '🎟 Registratsiya', key: 'registrations' as const, format: (v: number) => `${v} ta` },
                  { label: '👥 Zalga keldi', key: 'attendees' as const, isResult: true, format: (v: number) => `${v} ta` },
                  { label: '🎓 Kurs (zaldan)', key: 'courseSalesFromSeminar' as const, isResult: true, format: (v: number) => `${v} ta` },
                  { label: '📞 Dojim', key: 'dojimsales' as const, format: (v: number) => `${v} ta` },
                  { label: '📊 JAMI KURS', key: 'totalCourseSales' as const, isResult: true, format: (v: number) => `${v} ta`, bold: true },
                  { label: '💰 Jami Daromad', key: 'totalRevenue' as const, isResult: true, format: fmtSom, bold: true },
                  { label: '💸 Jami Xarajat', key: 'totalCosts' as const, isResult: true, format: fmtSom },
                  { label: '✨ Sof Foyda', key: 'netProfitSom' as const, isResult: true, format: fmtSom, bold: true },
                  { label: '📈 ROI', key: 'roi' as const, isResult: true, format: (v: number) => `${v}%`, bold: true },
                  { label: '🎯 CPL', key: 'cplSom' as const, isResult: true, format: fmtSom },
                  { label: '💲 CPS', key: 'cpsSom' as const, isResult: true, format: fmtSom },
                ].map(row => (
                  <tr key={row.label} className="border-b border-dark-border">
                    <td className={`py-1.5 ${row.bold ? 'text-white font-bold' : 'text-gray-400'}`}>{row.label}</td>
                    {SCENARIOS.map(s => {
                      const r = calcFinance(s.params);
                      const val = row.isResult
                        ? r[row.key as keyof typeof r] as number
                        : s.params[row.key as keyof ScenarioParams] as number;
                      return (
                        <td key={s.id} className={`text-center py-1.5 ${row.bold ? `font-black ${s.color}` : 'text-gray-300'}`}>
                          {row.format(val)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Risk tahlili */}
          <div className="card">
            <p className="text-sm font-bold text-white mb-3">⚠️ Risk Tahlili</p>
            <div className="space-y-3">
              {[
                {
                  risk: 'Show-up rate past (< 40%)',
                  impact: 'Zal 100 kishidan kam — kurs sotuvlari kritik kamayadi',
                  solution: 'T-3 dan T-1 gacha intensiv qo\'ng\'iroq protokoli, eslatmalar avtomatikasi',
                  level: 'high',
                },
                {
                  risk: 'Registratsiya < 150 ta (T-5 da)',
                  impact: 'Seminar daromadi yetarli emas, zal bo\'sh ko\'rinadi',
                  solution: 'Backup plan: $50 qo\'shimcha ads, hamkorlarga repeat post, chegirma promo',
                  level: 'high',
                },
                {
                  risk: 'Kurs konversiya < 7%',
                  impact: 'Break-even nuqtasiga yetilmaydi',
                  solution: 'Sotuvchi floor script yoqilsin, value stack kuchaytir, dojim intensivlashtir',
                  level: 'medium',
                },
                {
                  risk: 'Reklama CPL > 30,000 so\'m',
                  impact: 'Marketing byudjeti oshadi, ROI tushadi',
                  solution: 'Kreativlarni A/B test, auditoriyani qayta sozla, hamkor kanallarga o\'t',
                  level: 'medium',
                },
                {
                  risk: 'Dollar kursi o\'zgarishi',
                  impact: 'Kurs daromadi (dollar) so\'mda o\'zgaradi',
                  solution: 'Narxni dollarni ko\'rsating — mijoz joriy kurs bo\'yicha to\'laydi',
                  level: 'low',
                },
              ].map(r => (
                <div key={r.risk} className={`rounded-xl p-3 border ${
                  r.level === 'high' ? 'border-red-500/30 bg-red-500/5' :
                  r.level === 'medium' ? 'border-amber-500/30 bg-amber-500/5' :
                  'border-gray-500/30 bg-gray-500/5'
                }`}>
                  <div className="flex items-start gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${
                      r.level === 'high' ? 'bg-red-500/20 text-red-400' :
                      r.level === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {r.level === 'high' ? 'YUQORI' : r.level === 'medium' ? 'O\'RTA' : 'PAST'}
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">{r.risk}</p>
                      <p className="text-gray-400 text-xs mt-0.5">📉 {r.impact}</p>
                      <p className="text-blue-400 text-xs mt-1">✅ {r.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mentor vaqt qiymati */}
          <div className="card border border-gold/20 bg-gold/5">
            <p className="text-sm font-bold text-gold mb-3">⏱ Mentor Vaqti (hisobga olinmagan xarajat)</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { task: 'Zapuskga tayyorgarlik (T-30→T-1)', hours: 60 },
                { task: 'Seminar (T0)', hours: 8 },
                { task: 'Kurs o\'tkazish (T+14→T+21)', hours: 24 },
                { task: 'Materiallar tayyorlash', hours: 40 },
                { task: 'Talabalar bilan mentorluk', hours: 20 },
                { task: 'JAMI', hours: 152, bold: true },
              ].map(r => (
                <div key={r.task} className={`flex justify-between ${r.bold ? 'col-span-2 border-t border-gold/20 pt-2 font-bold text-gold' : 'text-gray-400'}`}>
                  <span>{r.task}</span>
                  <span>{r.hours} soat</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              💡 152 soat × soatlik stavka = qo'shimcha "implicit" xarajat. Ammo kurs kundan-kunga osonlashadi — materiallar qayta ishlatiladi, ROI har guruhda o'sadi.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
