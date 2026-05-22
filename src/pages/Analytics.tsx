import { useMemo } from 'react';
import { useLaunchStore } from '../store/launchStore';
import { PHASES } from '../data/phases';

const CATEGORY_CONFIG: Record<string, { label: string; emoji: string; color: string }> = {
  bozor:    { label: 'Bozor tahlili', emoji: '🔍', color: 'bg-blue-500' },
  kontent:  { label: 'Kontent',       emoji: '🎬', color: 'bg-purple-500' },
  trafik:   { label: 'Trafik',        emoji: '📈', color: 'bg-pink-500' },
  logistika:{ label: 'Logistika',     emoji: '📦', color: 'bg-orange-500' },
  sotuv:    { label: 'Sotuv',         emoji: '💰', color: 'bg-green-500' },
  dojim:    { label: 'Dojim',         emoji: '📞', color: 'bg-teal-500' },
  hamkor:   { label: 'Hamkor',        emoji: '🤝', color: 'bg-indigo-500' },
};

const ASSIGNEE_NAMES: Record<string, string> = {
  mentor: 'Producer', targetolog: 'Targetolog', sotuvchi1: 'Sotuvchi 1',
  sotuvchi2: 'Sotuvchi 2', assistent: 'Yordamchi', dizayner: 'Dizayner',
  videograf: 'Videograf', jamoa: 'Jamoa',
};

function MiniBar({ value, max, color = 'bg-gold', label, sublabel }: {
  value: number; max: number; color?: string; label: string; sublabel?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="text-xs text-gray-400 w-24 flex-shrink-0 truncate" title={label}>{label}</div>
      <div className="flex-1 h-5 bg-dark-hover rounded-full overflow-hidden relative">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
        <span className="absolute inset-0 flex items-center px-2 text-[10px] font-bold text-white">
          {value} {sublabel || ''}
        </span>
      </div>
      <span className="text-xs text-gray-500 w-8 flex-shrink-0 text-right">{pct}%</span>
    </div>
  );
}

function StatCard({ label, value, sub, color = 'text-gold' }: {
  label: string; value: string | number; sub?: string; color?: string;
}) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
    </div>
  );
}

export default function Analytics() {
  const { tasks, kpis, totalXP, streak } = useLaunchStore();

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === 'done').length;
    const inProgress = tasks.filter((t) => t.status === 'inprogress').length;
    const pending = tasks.filter((t) => t.status === 'pending').length;

    // By phase
    const byPhase = PHASES.map((p) => {
      const pt = tasks.filter((t) => t.phaseId === p.id);
      const pd = pt.filter((t) => t.status === 'done').length;
      return { phase: p, total: pt.length, done: pd };
    });

    // By category
    const byCategory = Object.keys(CATEGORY_CONFIG).map((cat) => {
      const ct = tasks.filter((t) => t.category === cat);
      const cd = ct.filter((t) => t.status === 'done').length;
      return { cat, total: ct.length, done: cd };
    }).filter((c) => c.total > 0);

    // By assignee
    const byAssignee = Object.keys(ASSIGNEE_NAMES).map((id) => {
      const at = tasks.filter((t) => t.assignee === id);
      const ad = at.filter((t) => t.status === 'done').length;
      return { id, total: at.length, done: ad };
    }).filter((a) => a.total > 0);

    // By day — velocity chart (last 10 days up to current)
    const dayMap: Record<number, { total: number; done: number }> = {};
    tasks.forEach((t) => {
      if (!dayMap[t.day]) dayMap[t.day] = { total: 0, done: 0 };
      dayMap[t.day].total++;
      if (t.status === 'done') dayMap[t.day].done++;
    });
    const dayEntries = Object.entries(dayMap)
      .map(([day, v]) => ({ day: Number(day), ...v }))
      .sort((a, b) => a.day - b.day);

    // XP potential
    const earnedXP = tasks.filter((t) => t.status === 'done').reduce((s, t) => s + t.xpReward, 0);
    const totalPotentialXP = tasks.reduce((s, t) => s + t.xpReward, 0);

    return { total, done, inProgress, pending, byPhase, byCategory, byAssignee, dayEntries, earnedXP, totalPotentialXP };
  }, [tasks]);

  const overallPct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
  const xpPct = stats.totalPotentialXP > 0 ? Math.round((stats.earnedXP / stats.totalPotentialXP) * 100) : 0;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-white">Analitika 📊</h1>
        <p className="text-gray-400 text-sm mt-1">Loyiha progressi, tezlik va taqsimot</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Umumiy progress" value={`${overallPct}%`} sub={`${stats.done}/${stats.total} task`} />
        <StatCard label="Bajarildi" value={stats.done} sub="task" color="text-green-400" />
        <StatCard label="Jarayonda" value={stats.inProgress} sub="task" color="text-blue-400" />
        <StatCard label="XP yig'ildi" value={`${stats.earnedXP.toLocaleString()}`} sub={`${xpPct}% potensialdan`} />
      </div>

      {/* KPI panel */}
      <div className="bg-dark-card border border-dark-border rounded-2xl p-5 space-y-3">
        <h2 className="font-bold text-white text-sm uppercase tracking-wider">📈 KPI Progress</h2>
        <div className="space-y-2">
          <MiniBar value={kpis.leads} max={200} label="Leadlar" sublabel="lead" color="bg-purple-500" />
          <MiniBar value={kpis.registrations} max={200} label="Ro'yxatdan o'tgan" sublabel="kishi" color="bg-blue-500" />
          <MiniBar value={kpis.attendees} max={150} label="Seminar kelgan" sublabel="kishi" color="bg-teal-500" />
          <MiniBar value={kpis.seminarSales} max={20} label="Seminar sotuv" sublabel="ta" color="bg-green-500" />
          <MiniBar value={kpis.courseSales} max={20} label="Kurs sotuv" sublabel="ta" color="bg-gold" />
          <MiniBar value={kpis.callsMade} max={300} label="Qo'ng'iroqlar" sublabel="ta" color="bg-orange-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* By Phase */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-5 space-y-3">
          <h2 className="font-bold text-white text-sm uppercase tracking-wider">🚀 Bosqichlar bo'yicha</h2>
          <div className="space-y-2">
            {stats.byPhase.map(({ phase, total, done }) => {
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <div key={phase.id} className="flex items-center gap-3">
                  <span className="text-sm w-5 flex-shrink-0">{phase.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 truncate">{phase.shortName}</p>
                    <div className="h-2 bg-dark-hover rounded-full overflow-hidden mt-0.5">
                      <div
                        className={`h-full rounded-full ${pct === 100 ? 'bg-green-500' : 'bg-gold'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-white">{pct}%</p>
                    <p className="text-[10px] text-gray-600">{done}/{total}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* By Category */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-5 space-y-3">
          <h2 className="font-bold text-white text-sm uppercase tracking-wider">🏷️ Kategoriya bo'yicha</h2>
          <div className="space-y-2">
            {stats.byCategory.sort((a, b) => b.done - a.done).map(({ cat, total, done }) => {
              const conf = CATEGORY_CONFIG[cat];
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <div key={cat} className="flex items-center gap-3">
                  <span className="text-sm w-5 flex-shrink-0">{conf.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">{conf.label}</p>
                    <div className="h-2 bg-dark-hover rounded-full overflow-hidden mt-0.5">
                      <div className={`h-full rounded-full ${conf.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-white">{done}/{total}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* By Assignee */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-5 space-y-3">
          <h2 className="font-bold text-white text-sm uppercase tracking-wider">👥 A'zolar bo'yicha</h2>
          <div className="space-y-2">
            {stats.byAssignee.sort((a, b) => b.done - a.done).map(({ id, total, done }) => {
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <div key={id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">{ASSIGNEE_NAMES[id] || id}</p>
                    <div className="h-2 bg-dark-hover rounded-full overflow-hidden mt-0.5">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-white">{done}/{total}</p>
                    <p className="text-[10px] text-gray-600">{pct}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily velocity chart */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-5 space-y-3">
          <h2 className="font-bold text-white text-sm uppercase tracking-wider">📅 Kunlik taqsimot</h2>
          <p className="text-xs text-gray-600">Har kunda nechta task bor (bajarilgan + qolgan)</p>
          <div className="overflow-x-auto">
            <div className="flex items-end gap-1 h-28 min-w-[400px]">
              {stats.dayEntries.slice(0, 30).map(({ day, total, done }) => {
                const totalHeight = total > 0 ? Math.min(100, Math.round((total / Math.max(...stats.dayEntries.map((d) => d.total))) * 100)) : 0;
                const doneHeight = total > 0 ? Math.round((done / total) * totalHeight) : 0;
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-0.5" title={`T${day >= 0 ? '+' : ''}${day}: ${done}/${total}`}>
                    <div className="w-full flex flex-col-reverse" style={{ height: '96px' }}>
                      <div className="w-full bg-dark-hover rounded-t-sm" style={{ height: `${totalHeight}%` }}>
                        <div className="w-full bg-gold rounded-t-sm" style={{ height: `${doneHeight === 0 ? 0 : (doneHeight / totalHeight) * 100}%` }} />
                      </div>
                    </div>
                    <p className="text-[8px] text-gray-700 leading-none">
                      {day >= 0 ? `+${day}` : day}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-4 text-[10px] text-gray-600">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-gold rounded-sm inline-block" /> Bajarildi</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-dark-hover rounded-sm inline-block" /> Jami</span>
          </div>
        </div>
      </div>

      {/* Summary insight */}
      <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
        <h2 className="font-bold text-white mb-3">💡 Xulosa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-400">
          <div>
            <p className="text-xs text-gray-600 mb-1">Eng faol kategoriya</p>
            <p className="text-white font-semibold">
              {stats.byCategory.sort((a, b) => (b.done / b.total) - (a.done / a.total))[0]?.cat
                ? `${CATEGORY_CONFIG[stats.byCategory.sort((a, b) => (b.done / b.total) - (a.done / a.total))[0].cat].emoji} ${CATEGORY_CONFIG[stats.byCategory.sort((a, b) => (b.done / b.total) - (a.done / a.total))[0].cat].label}`
                : '—'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Eng ko'p tasklar</p>
            <p className="text-white font-semibold">
              {stats.byPhase.sort((a, b) => b.total - a.total)[0]?.phase.emoji}{' '}
              {stats.byPhase.sort((a, b) => b.total - a.total)[0]?.phase.shortName}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Streak / XP</p>
            <p className="text-white font-semibold">🔥 {streak} kun · ⚡{totalXP.toLocaleString()} XP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
