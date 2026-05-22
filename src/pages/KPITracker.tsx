import { useMemo, useState } from 'react';
import { useLaunchStore } from '../store/launchStore';
import type { KPI } from '../data/types';
import ProgressBar from '../components/ProgressBar';
import {
  KPI_TARGETS,
  FUNNEL_STAGES,
  SECONDARY_KPIS,
  FINANCIAL_SUMMARY,
  WEEKLY_MILESTONES,
  KPI_ALERTS,
  CHANNEL_TRACKING,
  EDIT_QUICK_ACTIONS,
  getHealth,
  conversionRate,
  type KpiHealth,
} from '../data/kpiManagement';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'funnel', label: 'Voronka', icon: '🔽' },
  { id: 'metrics', label: 'Batafsil KPI', icon: '📈' },
  { id: 'plan', label: 'Reja & Kanallar', icon: '📋' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const HEALTH_STYLES: Record<KpiHealth, { text: string; bg: string; border: string }> = {
  good: { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  warning: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  critical: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  neutral: { text: 'text-gray-500', bg: 'bg-dark-surface', border: 'border-dark-border' },
};

function NumberInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-8 h-8 rounded-lg bg-dark-surface border border-dark-border text-gray-300 hover:border-gold/50 font-bold"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        min={0}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        className="w-20 text-center bg-dark-surface border border-dark-border rounded-lg py-1.5 text-sm font-bold text-white focus:border-gold/50 focus:outline-none"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 rounded-lg bg-dark-surface border border-dark-border text-gray-300 hover:border-gold/50 font-bold"
      >
        +
      </button>
    </div>
  );
}

function HealthBadge({ health, label }: { health: KpiHealth; label?: string }) {
  const s = HEALTH_STYLES[health];
  const icons = { good: '✓', warning: '⚠', critical: '!', neutral: '—' };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
      {icons[health]} {label || (health === 'good' ? 'Yaxshi' : health === 'warning' ? 'Diqqat' : health === 'critical' ? 'Xavf' : '—')}
    </span>
  );
}

export default function KPITracker() {
  const { kpis, updateKPI } = useLaunchStore();
  const [editMode, setEditMode] = useState(false);
  const [tab, setTab] = useState<TabId>('dashboard');
  const [adSpendUsd, setAdSpendUsd] = useState(0);

  const metrics = useMemo(() => {
    const courseRevenue = FINANCIAL_SUMMARY.course.formula(kpis.courseSales);
    const seminarRevenue = FINANCIAL_SUMMARY.seminar.formula(kpis.seminarSales);
    const cpl = kpis.leads > 0 && adSpendUsd > 0 ? (adSpendUsd / kpis.leads).toFixed(2) : null;
    const regFromLead = conversionRate(kpis.leads, kpis.registrations);
    const attendFromReg = conversionRate(kpis.registrations, kpis.attendees);
    const courseFromAttend = conversionRate(kpis.attendees, kpis.courseSales);
    const seminarFromReg = conversionRate(kpis.registrations, kpis.seminarSales);
    const totalCoursePct = Math.min(100, Math.round((kpis.courseSales / KPI_TARGETS.courseSales) * 100));
    const totalLeadPct = Math.min(100, Math.round((kpis.leads / KPI_TARGETS.leads) * 100));
    const alerts = KPI_ALERTS.filter((a) => a.check(kpis, adSpendUsd));

    return {
      courseRevenue,
      seminarRevenue,
      cpl,
      regFromLead,
      attendFromReg,
      courseFromAttend,
      seminarFromReg,
      totalCoursePct,
      totalLeadPct,
      alerts,
      overallHealth: getHealth(totalCoursePct, 40, 80),
    };
  }, [kpis, adSpendUsd]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">KPI Tracker</h1>
          <p className="text-gray-400 text-sm mt-1">
            Maqsad: <span className="text-gold font-semibold">200 lead · 200 seminar · 20 kurs ($30,000)</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <HealthBadge health={metrics.overallHealth} label="Umumiy holat" />
          <button
            type="button"
            onClick={() => setEditMode(!editMode)}
            className={editMode ? 'btn-gold' : 'btn-ghost'}
          >
            {editMode ? '✓ Saqlash' : '✏️ Tahrirlash'}
          </button>
        </div>
      </div>

      {/* Alerts */}
      {metrics.alerts.length > 0 && (
        <div className="space-y-2">
          {metrics.alerts.map((a) => (
            <div key={a.id} className="card border-amber-500/40 bg-amber-500/5 text-sm text-amber-200">
              ⚠️ {a.message}
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-dark-border pb-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              tab === t.id ? 'bg-gold/20 text-gold border border-gold/40' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      {tab === 'dashboard' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card border-green-500/30 bg-gradient-to-br from-green-900/30 to-dark-card">
              <p className="text-xs text-green-400 font-bold uppercase">Kurs daromadi</p>
              <p className="text-3xl font-black text-white mt-1">${metrics.courseRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Maqsad: ${KPI_TARGETS.totalRevenueUsd.toLocaleString()} · {kpis.courseSales}/{KPI_TARGETS.courseSales} ta</p>
              <div className="mt-3">
                <ProgressBar value={kpis.courseSales} max={KPI_TARGETS.courseSales} color="bg-green-500" height="h-2" />
              </div>
              <p className="text-xs text-gray-400 mt-1">{metrics.totalCoursePct}% · ${KPI_TARGETS.coursePriceUsd}/ta</p>
            </div>

            <div className="card border-orange-500/30 bg-gradient-to-br from-orange-900/20 to-dark-card">
              <p className="text-xs text-orange-400 font-bold uppercase">Seminar (so&apos;m)</p>
              <p className="text-3xl font-black text-white mt-1">{(metrics.seminarRevenue / 1_000_000).toFixed(0)}M</p>
              <p className="text-xs text-gray-500 mt-1">{kpis.seminarSales} × {KPI_TARGETS.seminarPriceUzs.toLocaleString()} so&apos;m</p>
              <div className="mt-3">
                <ProgressBar value={kpis.seminarSales} max={KPI_TARGETS.seminarTickets} color="bg-orange-500" height="h-2" />
              </div>
            </div>

            <div className="card border-blue-500/30">
              <p className="text-xs text-blue-400 font-bold uppercase">Leadlar</p>
              <p className="text-3xl font-black text-white mt-1">{kpis.leads}</p>
              <p className="text-xs text-gray-500 mt-1">Maqsad: {KPI_TARGETS.leads}</p>
              <div className="mt-3">
                <ProgressBar value={kpis.leads} max={KPI_TARGETS.leads} color="bg-blue-500" height="h-2" />
              </div>
              <p className="text-xs text-gray-400 mt-2">{metrics.totalLeadPct}%</p>
            </div>

            <div className="card border-purple-500/30">
              <p className="text-xs text-purple-400 font-bold uppercase">Zal konversiya</p>
              <p className="text-3xl font-black text-white mt-1">{metrics.courseFromAttend}%</p>
              <p className="text-xs text-gray-500 mt-1">Kelgan → Kurs (maqsad 10%+)</p>
              <HealthBadge health={getHealth(metrics.courseFromAttend, 5, 10)} />
            </div>
          </div>

          {/* CPL */}
          <div className="card">
            <h2 className="font-bold text-white mb-3">💵 Reklama samaradorligi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Ads spend (USD) — qo&apos;lda</label>
                <input
                  type="number"
                  min={0}
                  value={adSpendUsd || ''}
                  onChange={(e) => setAdSpendUsd(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-white focus:border-gold/50 focus:outline-none"
                  placeholder="Masalan 450"
                />
              </div>
              <div className="bg-dark-surface rounded-lg p-3 border border-dark-border">
                <p className="text-xs text-gray-500">CPL (hisoblangan)</p>
                <p className="text-2xl font-black text-white">{metrics.cpl ? `$${metrics.cpl}` : '—'}</p>
                <p className="text-xs text-gray-500">Maqsad: &lt; ${KPI_TARGETS.cplTargetUsd}</p>
                {metrics.cpl && (
                  <HealthBadge health={parseFloat(metrics.cpl) <= KPI_TARGETS.cplTargetUsd ? 'good' : 'critical'} />
                )}
              </div>
              <div className="bg-dark-surface rounded-lg p-3 border border-dark-border">
                <p className="text-xs text-gray-500">Ads budget limit</p>
                <p className="text-2xl font-black text-gold">${KPI_TARGETS.adSpendMaxUsd}</p>
                <p className="text-xs text-gray-500">Butun zapusk</p>
              </div>
            </div>
          </div>

          {/* Conversion summary */}
          <div className="card">
            <h2 className="font-bold text-white mb-3">📐 Konversiya xulosasi</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Lead → Ro\'yxat', pct: metrics.regFromLead, target: '70%+', health: getHealth(metrics.regFromLead, 40, 70) },
                { label: 'Ro\'yxat → Keldi', pct: metrics.attendFromReg, target: '90%+', health: getHealth(metrics.attendFromReg, 70, 90) },
                { label: 'Keldi → Kurs', pct: metrics.courseFromAttend, target: '10%+', health: getHealth(metrics.courseFromAttend, 5, 10) },
                {
                  label: 'Qo\'ng\'iroq',
                  pct: Math.min(100, Math.round((kpis.callsMade / KPI_TARGETS.callsMade) * 100)),
                  display: `${kpis.callsMade}`,
                  target: `${KPI_TARGETS.callsMade}+`,
                  health: getHealth(Math.min(100, Math.round((kpis.callsMade / KPI_TARGETS.callsMade) * 100))),
                },
              ].map((row) => (
                <div key={row.label} className={`rounded-lg p-3 border ${HEALTH_STYLES[row.health].border} ${HEALTH_STYLES[row.health].bg}`}>
                  <p className="text-xs text-gray-500">{row.label}</p>
                  <p className={`text-xl font-black ${HEALTH_STYLES[row.health].text}`}>
                    {'display' in row ? row.display : `${row.pct}%`}
                  </p>
                  <p className="text-[10px] text-gray-600">Maqsad: {row.target}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FUNNEL */}
      {tab === 'funnel' && (
        <div className="space-y-5">
          <div className="card">
            <h2 className="font-bold text-white mb-4">🔽 Sotuv voronkasi (visual)</h2>
            <div className="space-y-2 max-w-2xl mx-auto">
              {FUNNEL_STAGES.map((stage, i) => {
                const value = kpis[stage.key] as number;
                const widthPct = Math.max(15, Math.min(100, (value / stage.target) * 100));
                const prev = i > 0 ? (kpis[FUNNEL_STAGES[i - 1].key] as number) : value;
                const stepConv = i > 0 ? conversionRate(prev, value) : null;
                return (
                  <div key={stage.id} className="relative">
                    {i > 0 && stepConv !== null && (
                      <p className="text-center text-xs text-gray-500 py-1">↓ {stepConv}% o&apos;tish</p>
                    )}
                    <div
                      className={`mx-auto rounded-lg py-3 px-4 ${stage.color} transition-all`}
                      style={{ width: `${widthPct}%`, minWidth: '40%' }}
                    >
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-sm">{stage.emoji} {stage.label}</span>
                        <span className="font-black">{value} / {stage.target}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card border-gold/20">
            <h3 className="font-bold text-gold mb-2">🎯 Zapusk raqamlar (eslab qoling)</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>→ Zalda: <strong className="text-white">20 ta</strong> kurs ($1,500) = $30,000</li>
              <li>→ Dojim T+1-7: <strong className="text-white">+{KPI_TARGETS.dojimExtraSales} ta</strong> qo&apos;shimcha</li>
              <li>→ Jami kurs maqsad: <strong className="text-white">{KPI_TARGETS.courseSales + KPI_TARGETS.dojimExtraSales}</strong> (20 zal + 7 dojim ideal)</li>
              <li>→ Seminar: <strong className="text-white">200</strong> kishi × 600k = filtr + premium tajriba</li>
            </ul>
          </div>
        </div>
      )}

      {/* METRICS */}
      {tab === 'metrics' && (
        <div className="space-y-4">
          {FUNNEL_STAGES.map((stage) => {
            const value = kpis[stage.key] as number;
            const pct = Math.min(100, Math.round((value / stage.target) * 100));
            const health = getHealth(pct);
            return (
              <div key={stage.id} className={`card border ${HEALTH_STYLES[health].border}`}>
                <div className="flex flex-wrap items-start gap-4">
                  <span className="text-3xl">{stage.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between gap-2 items-start">
                      <div>
                        <h3 className="font-bold text-white">{stage.label}</h3>
                        <p className="text-xs text-gray-500">{stage.description}</p>
                        <p className="text-xs text-gold/80 mt-1">💡 {stage.benchmark}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <HealthBadge health={health} />
                        {editMode ? (
                          <NumberInput value={value} onChange={(v) => updateKPI(stage.key, v)} />
                        ) : (
                          <div className="text-right">
                            <span className="text-2xl font-black text-white">{value}</span>
                            <span className="text-gray-500 text-sm">/{stage.target}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1">
                        <ProgressBar value={value} max={stage.target} color={stage.color} height="h-2.5" />
                      </div>
                      <span className="text-sm font-bold text-gray-400 w-12">{pct}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide pt-2">Qo&apos;shimcha KPI</p>
          {SECONDARY_KPIS.map((config) => {
            const value = kpis[config.key];
            const pct = Math.min(100, Math.round((value / config.target) * 100));
            return (
              <div key={config.key} className="card">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <h3 className="font-bold text-white">{config.emoji} {config.label}</h3>
                    <p className="text-xs text-gray-500">{config.description}</p>
                    <p className="text-xs text-blue-400 mt-1">💡 {config.tip}</p>
                  </div>
                  {editMode ? (
                    <NumberInput value={value} onChange={(v) => updateKPI(config.key, v)} />
                  ) : (
                    <span className="text-xl font-black text-white">{value}<span className="text-gray-500 text-sm">/{config.target}</span></span>
                  )}
                </div>
                <ProgressBar value={value} max={config.target} color="bg-indigo-500" className="mt-2" height="h-1.5" />
              </div>
            );
          })}

          {editMode && (
            <div className="card border-gold/30 bg-gold/5">
              <h3 className="font-semibold text-gold mb-3 text-sm">⚡ Tez yangilash</h3>
              <div className="flex flex-wrap gap-2">
                {EDIT_QUICK_ACTIONS.map((action) => (
                  <button
                    key={`${action.key}-${action.delta}`}
                    type="button"
                    onClick={() => updateKPI(action.key, kpis[action.key] + action.delta)}
                    className="btn-gold text-xs py-1.5"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PLAN */}
      {tab === 'plan' && (
        <div className="space-y-5">
          <div className="card">
            <h2 className="font-bold text-white mb-3">📅 Haftalik milestone</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-dark-border text-left">
                    <th className="py-2 pr-4">Bosqich</th>
                    <th className="py-2 pr-4">Kunlar</th>
                    <th className="py-2 pr-4">Lead</th>
                    <th className="py-2 pr-4">Reg</th>
                    <th className="py-2">Izoh</th>
                  </tr>
                </thead>
                <tbody>
                  {WEEKLY_MILESTONES.map((m, i) => (
                    <tr key={i} className="border-b border-dark-border/50 text-gray-300">
                      <td className="py-2 pr-4 font-medium text-white">{m.phase}</td>
                      <td className="py-2 pr-4 text-gold">{m.days}</td>
                      <td className="py-2 pr-4">{m.leads ?? '—'}</td>
                      <td className="py-2 pr-4">{m.regs ?? (m.courseExtra ?? m.courseTotal ?? '—')}</td>
                      <td className="py-2 text-gray-500">{m.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="font-bold text-white mb-3">📡 Kanal bo&apos;yicha kuzatuv</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-dark-border text-left">
                    <th className="py-2 pr-3">Kanal</th>
                    <th className="py-2 pr-3">Metrika</th>
                    <th className="py-2 pr-3">Maqsad</th>
                    <th className="py-2">Mas&apos;ul</th>
                  </tr>
                </thead>
                <tbody>
                  {CHANNEL_TRACKING.map((c, i) => (
                    <tr key={i} className="border-b border-dark-border/50">
                      <td className="py-2 pr-3 text-white font-medium">{c.channel}</td>
                      <td className="py-2 pr-3 text-gray-400">{c.metric}</td>
                      <td className="py-2 pr-3 text-gold">{c.target}</td>
                      <td className="py-2 text-gray-500">{c.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="font-bold text-white mb-3">📊 Google Sheets — KPI tablar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                'KPI Dashboard (bu yerda qo\'lda + Sheets)',
                'Lead CRM',
                'Talabalar $2k',
                'Hamkorlar UTM',
                'Dojim T+1',
                'Seminar T0',
                'Zapusk Yakuniy',
                'Ads spend / CPL',
              ].map((name) => (
                <div key={name} className="bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-gray-300">
                  📑 {name}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Assistent har kuni 18:00 da yangilaydi. Mentor dushanba sprintda ko&apos;rib chiqadi.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
