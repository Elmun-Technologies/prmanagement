import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLaunchStore } from '../store/launchStore';
import ProgressBar from '../components/ProgressBar';
import {
  TEAM_PROFILES,
  TEAM_ORG,
  MEETING_SCHEDULE,
  ESCALATION_RULES,
  DAILY_MANAGEMENT_CHECKLIST,
  RACI_MATRIX,
  RACI_LEGEND,
} from '../data/teamManagement';
import type { Assignee } from '../data/types';

const TABS = [
  { id: 'overview', label: 'Ko\'rinish', icon: '📊' },
  { id: 'management', label: 'Management', icon: '🏢' },
  { id: 'roles', label: 'Rollar', icon: '👤' },
  { id: 'raci', label: 'Matritsa', icon: '📋' },
  { id: 'tasks', label: 'Ishlar', icon: '✅' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const MEMBER_COLORS: Record<Assignee, { bg: string; text: string; border: string; glow: string }> = {
  mentor:     { bg: 'from-blue-600 to-blue-800', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
  targetolog: { bg: 'from-purple-600 to-purple-800', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
  sotuvchi1:  { bg: 'from-green-600 to-green-800', text: 'text-green-400', border: 'border-green-500/30', glow: 'shadow-green-500/20' },
  sotuvchi2:  { bg: 'from-emerald-600 to-emerald-800', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  assistent:  { bg: 'from-orange-600 to-orange-800', text: 'text-orange-400', border: 'border-orange-500/30', glow: 'shadow-orange-500/20' },
  jamoa:      { bg: 'from-gray-600 to-gray-800', text: 'text-gray-400', border: 'border-gray-500/30', glow: 'shadow-gray-500/20' },
};

const CATEGORY_ICONS: Record<string, string> = {
  bozor: '🔍', kontent: '🎬', trafik: '📈',
  logistika: '📦', sotuv: '💰', dojim: '📞', hamkor: '🤝',
};

const STAGE_LABELS = {
  'pre-seminar': 'Seminargacha',
  seminar: 'Seminar',
  'main-course': 'Asosiy Kurs',
};

function RoleDetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-3">
      <p className="text-xs font-bold text-gold uppercase tracking-wide mb-1.5">{title}</p>
      {children}
    </div>
  );
}

export default function Team() {
  const { team, tasks, phases } = useLaunchStore();
  const [tab, setTab] = useState<TabId>('overview');
  const [expandedRole, setExpandedRole] = useState<Assignee | null>('mentor');
  const [taskFilter, setTaskFilter] = useState<Assignee | 'all'>('all');

  const maxXP = Math.max(...team.map((m) => m.xp), 1);

  const memberStats = useMemo(() => {
    return team.map((member) => {
      const memberTasks = tasks.filter((t) => t.assignee === member.id);
      const doneTasks = memberTasks.filter((t) => t.status === 'done');
      const pendingTasks = memberTasks.filter((t) => t.status === 'pending');
      const inProgressTasks = memberTasks.filter((t) => t.status === 'inprogress');
      const catBreakdown: Record<string, { total: number; done: number }> = {};
      memberTasks.forEach((t) => {
        if (!catBreakdown[t.category]) catBreakdown[t.category] = { total: 0, done: 0 };
        catBreakdown[t.category].total++;
        if (t.status === 'done') catBreakdown[t.category].done++;
      });
      const completion = memberTasks.length > 0
        ? Math.round((doneTasks.length / memberTasks.length) * 100)
        : 0;
      const profile = TEAM_PROFILES.find((p) => p.id === member.id);
      return {
        ...member,
        memberTasks,
        doneTasks,
        pendingTasks,
        inProgressTasks,
        catBreakdown,
        completion,
        profile,
      };
    });
  }, [team, tasks]);

  const topPerformer = [...memberStats].sort((a, b) => b.xp - a.xp)[0];
  const filteredTasks = taskFilter === 'all'
    ? tasks
    : tasks.filter((t) => t.assignee === taskFilter);

  const totalTasks = tasks.length;
  const totalDone = tasks.filter((t) => t.status === 'done').length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Jamoa & Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            5 a'zo · {totalDone}/{totalTasks} ish bajarildi · Eng yaxshi:{' '}
            <span className="text-gold font-semibold">{topPerformer?.name}</span> (⚡{topPerformer?.xp} XP)
          </p>
        </div>
        <Link to="/daily" className="btn-gold text-sm">
          Bugungi ishlar →
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-dark-border pb-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              tab === t.id
                ? 'bg-gold/20 text-gold border border-gold/40'
                : 'text-gray-400 hover:text-white hover:bg-dark-surface'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === 'overview' && (
        <div className="space-y-5">
          <div className="card border-gold/20 bg-gradient-to-r from-dark-card to-dark-surface">
            <p className="text-xs text-gold font-bold uppercase mb-2">Zapusk jamoasi — qisqa</p>
            <p className="text-sm text-gray-300">
              Har bir kishi aniq KPI va vazifaga ega. <strong className="text-white">Mentor</strong> strategiya va kontent,{' '}
              <strong className="text-white">Assistent</strong> operatsiya, <strong className="text-white">Targetolog</strong> trafik,{' '}
              <strong className="text-white">2 sotuvchi</strong> qo'ng'iroq va yopish. Batafsil: Management va Rollar tablari.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {memberStats.filter((m) => m.id !== 'jamoa').map((m) => {
              const color = MEMBER_COLORS[m.id] || MEMBER_COLORS.jamoa;
              return (
                <button
                  key={m.id}
                  onClick={() => { setTab('roles'); setExpandedRole(m.id); }}
                  className={`card text-center border-2 ${color.border} hover:scale-[1.02] transition-transform`}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color.bg} flex items-center justify-center text-white font-bold text-sm mx-auto shadow-lg ${color.glow}`}>
                    {m.avatar}
                  </div>
                  <p className="font-semibold text-sm mt-2 text-white">{m.name}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{m.profile?.roleUz || m.role}</p>
                  <p className="text-gold font-bold mt-2">⚡{m.xp}</p>
                  <ProgressBar value={m.xp} max={maxXP} color="bg-gold" height="h-1" />
                  <p className="text-xs text-gray-400 mt-1">{m.completion}% · {m.memberTasks.length} ish</p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {memberStats.filter((m) => m.id !== 'jamoa').map((m) => {
              const color = MEMBER_COLORS[m.id] || MEMBER_COLORS.jamoa;
              return (
                <div key={m.id} className={`card border ${color.border}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color.bg} flex items-center justify-center text-white font-black flex-shrink-0`}>
                      {m.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-white">{m.name}</h3>
                          <p className={`text-sm ${color.text}`}>{m.profile?.roleUz}</p>
                        </div>
                        <p className="text-xl font-black text-gold">⚡{m.xp}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div className="bg-green-500/10 rounded-lg px-2 py-1.5 text-center border border-green-500/20">
                          <p className="font-bold text-green-400">{m.doneTasks.length}</p>
                          <p className="text-[10px] text-green-600">Bajarildi</p>
                        </div>
                        <div className="bg-blue-500/10 rounded-lg px-2 py-1.5 text-center border border-blue-500/20">
                          <p className="font-bold text-blue-400">{m.inProgressTasks.length}</p>
                          <p className="text-[10px] text-blue-600">Jarayonda</p>
                        </div>
                        <div className="bg-dark-surface rounded-lg px-2 py-1.5 text-center border border-dark-border">
                          <p className="font-bold text-gray-300">{m.pendingTasks.length}</p>
                          <p className="text-[10px] text-gray-500">Qolgan</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <ProgressBar value={m.completion} color="bg-green-500" height="h-1.5" />
                      </div>
                      {m.profile && (
                        <p className="text-xs text-gray-500 mt-2">
                          KPI: {m.profile.kpiTargets.slice(0, 2).map((k) => k.label).join(', ')}...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MANAGEMENT */}
      {tab === 'management' && (
        <div className="space-y-5">
          <div className="card">
            <h2 className="text-lg font-bold text-white mb-3">🏢 Tashkilot tuzilmasi</h2>
            <p className="text-sm text-gray-400 mb-3">{TEAM_ORG.ceo}</p>
            <pre className="text-sm text-gray-300 font-mono bg-dark-surface rounded-lg p-4 overflow-x-auto whitespace-pre-wrap border border-dark-border">
              {TEAM_ORG.structure}
            </pre>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold text-white mb-3">📅 Yig'ilishlar jadvali</h2>
            <div className="space-y-3">
              {MEETING_SCHEDULE.map((m, i) => (
                <div key={i} className="bg-dark-surface rounded-lg p-4 border border-dark-border">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <span className="text-gold font-bold text-sm">{m.when}</span>
                    <span className="text-xs text-gray-500">{m.duration} · {m.who}</span>
                  </div>
                  <p className="font-semibold text-white">{m.name}</p>
                  <p className="text-sm text-gray-400 mt-1">→ {m.agenda}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold text-white mb-3">🚨 Eskalatsiya (muammo → kim → qachon)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-500 border-b border-dark-border">
                    <th className="py-2 pr-4">Muammo</th>
                    <th className="py-2 pr-4">Birinchi</th>
                    <th className="py-2 pr-4">Keyin</th>
                    <th className="py-2">SLA</th>
                  </tr>
                </thead>
                <tbody>
                  {ESCALATION_RULES.map((e, i) => (
                    <tr key={i} className="border-b border-dark-border/50 text-gray-300">
                      <td className="py-2 pr-4">{e.issue}</td>
                      <td className="py-2 pr-4 text-gold">{e.first}</td>
                      <td className="py-2 pr-4">{e.then}</td>
                      <td className="py-2">{e.sla}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold text-white mb-3">☀️ Kunlik management checklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.entries(DAILY_MANAGEMENT_CHECKLIST) as [Assignee, string[]][]).map(([id, items]) => {
                const profile = TEAM_PROFILES.find((p) => p.id === id);
                const color = MEMBER_COLORS[id];
                return (
                  <div key={id} className={`rounded-lg border ${color.border} p-3 bg-dark-surface`}>
                    <p className={`font-bold text-sm ${color.text} mb-2`}>{profile?.name || id}</p>
                    <ul className="space-y-1">
                      {items.map((item, j) => (
                        <li key={j} className="text-xs text-gray-400 flex gap-2">
                          <span className="text-gold">☐</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card border-gold/30">
            <h2 className="text-lg font-bold text-white mb-2">📊 Google Sheets — bitta manba</h2>
            <p className="text-sm text-gray-400 mb-3">Assistent har kuni yangilaydi. Barcha jamoa shu fayldan ishlaydi.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {['Lead CRM', 'Talabalar ($2k)', 'Hamkorlar UTM', 'KPI Dashboard', 'Dojim T+1', 'Seminar kuni', 'Zapusk Yakuniy'].map((tab) => (
                <div key={tab} className="bg-dark-bg rounded px-2 py-1.5 text-gray-300 border border-dark-border">
                  📑 {tab}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ROLES */}
      {tab === 'roles' && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Har rol uchun: KPI, vazifalar, bosqich bo'yicha, aloqa, vositalar.</p>
          {TEAM_PROFILES.filter((p) => p.id !== 'jamoa').map((profile) => {
            const color = MEMBER_COLORS[profile.id];
            const stats = memberStats.find((m) => m.id === profile.id);
            const open = expandedRole === profile.id;
            return (
              <div key={profile.id} className={`card border ${color.border} overflow-hidden`}>
                <button
                  type="button"
                  onClick={() => setExpandedRole(open ? null : profile.id)}
                  className="w-full flex items-center gap-4 text-left"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color.bg} flex items-center justify-center text-white font-black text-lg flex-shrink-0`}>
                    {profile.id === 'mentor' ? 'M' : profile.id === 'targetolog' ? 'T' : profile.id === 'sotuvchi1' ? 'S1' : profile.id === 'sotuvchi2' ? 'S2' : 'A'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{profile.name}</h3>
                    <p className={`text-sm ${color.text}`}>{profile.roleUz}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stats?.memberTasks.length ?? 0} ish · {stats?.completion ?? 0}% · KPI: {profile.kpiTargets.length} ta
                    </p>
                  </div>
                  <span className="text-gray-500 text-xl">{open ? '▼' : '▶'}</span>
                </button>

                {open && (
                  <div className="mt-4 pt-4 border-t border-dark-border space-y-1 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      <div className="bg-dark-surface rounded-lg p-3">
                        <p className="text-xs text-gray-500">Telefon</p>
                        <p className="text-white">{profile.phone}</p>
                      </div>
                      <div className="bg-dark-surface rounded-lg p-3">
                        <p className="text-xs text-gray-500">Telegram</p>
                        <p className="text-white">{profile.telegram}</p>
                      </div>
                      <div className="bg-dark-surface rounded-lg p-3">
                        <p className="text-xs text-gray-500">Ish vaqti</p>
                        <p className="text-white text-xs">{profile.workHours}</p>
                      </div>
                    </div>

                    <RoleDetailSection title="KPI maqsadlari">
                      <ul className="space-y-1">
                        {profile.kpiTargets.map((k, i) => (
                          <li key={i} className="text-gray-300 flex justify-between gap-2">
                            <span>{k.label}</span>
                            <span className="text-gold font-semibold">{k.target}</span>
                          </li>
                        ))}
                      </ul>
                    </RoleDetailSection>

                    <RoleDetailSection title="Asosiy vazifalar">
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {profile.mainResponsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </RoleDetailSection>

                    <RoleDetailSection title="Qilmaslik kerak">
                      <ul className="list-disc list-inside text-gray-500 space-y-1">
                        {profile.dontDo.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </RoleDetailSection>

                    <RoleDetailSection title="Vositalar">
                      <div className="flex flex-wrap gap-2">
                        {profile.tools.map((t) => (
                          <span key={t} className="text-xs bg-dark-surface border border-dark-border rounded px-2 py-1 text-gray-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </RoleDetailSection>

                    {(['pre-seminar', 'seminar', 'main-course'] as const).map((stage) => (
                      profile.byStage[stage]?.length > 0 && (
                        <RoleDetailSection key={stage} title={STAGE_LABELS[stage]}>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            {profile.byStage[stage].map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </RoleDetailSection>
                      )
                    ))}

                    {profile.weeklyRoutine.length > 0 && (
                      <RoleDetailSection title="Haftalik rutina">
                        {profile.weeklyRoutine.map((w, i) => (
                          <div key={i} className="mb-2">
                            <p className="text-gold text-xs font-bold">{w.day}</p>
                            <ul className="text-gray-400 text-xs mt-0.5">
                              {w.tasks.map((t, j) => (
                                <li key={j}>→ {t}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </RoleDetailSection>
                    )}

                    <p className="text-xs text-gray-600 mt-3">
                      Hisobot: {profile.reportsTo === 'ceo' ? 'CEO' : profile.reportsTo} · Boshqaradi: {profile.manages.join(', ') || '—'}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* RACI */}
      {tab === 'raci' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">{RACI_LEGEND}</p>
          {(['pre-seminar', 'seminar', 'main-course'] as const).map((stage) => (
            <div key={stage} className="card overflow-x-auto">
              <h3 className="font-bold text-white mb-3">{STAGE_LABELS[stage]}</h3>
              <table className="w-full text-xs min-w-[600px]">
                <thead>
                  <tr className="text-gray-500 border-b border-dark-border">
                    <th className="py-2 pr-3 text-left">Faoliyat</th>
                    <th className="py-2 px-2 text-center">M</th>
                    <th className="py-2 px-2 text-center">T</th>
                    <th className="py-2 px-2 text-center">S1</th>
                    <th className="py-2 px-2 text-center">S2</th>
                    <th className="py-2 px-2 text-center">A</th>
                  </tr>
                </thead>
                <tbody>
                  {RACI_MATRIX.map((row, i) => {
                    const cells = stage === 'pre-seminar' ? row.pre : stage === 'seminar' ? row.seminar : row.course;
                    return (
                      <tr key={i} className="border-b border-dark-border/50">
                        <td className="py-2 pr-3 text-gray-300 font-medium">{row.activity}</td>
                        {(['mentor', 'targetolog', 'sotuvchi1', 'sotuvchi2', 'assistent'] as Assignee[]).map((id) => (
                          <td key={id} className={`py-2 px-2 text-center font-mono ${raciColor(cells[id])}`}>
                            {cells[id]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {TEAM_PROFILES.filter((p) => p.id !== 'jamoa').map((p) => {
              const c = MEMBER_COLORS[p.id];
              return (
                <div key={p.id} className={`card py-2 ${c.border}`}>
                  <span className={`font-bold ${c.text}`}>{p.name}</span>
                  <p className="text-gray-500 mt-1 line-clamp-2">{p.roleUz}</p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-600">
            Batafsil RACI: har faoliyat qatorida Mentor/Assistent/... ustunlari — Rollar tabida bosqich bo'yicha yozilgan.
          </p>
        </div>
      )}

      {/* TASKS */}
      {tab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTaskFilter('all')}
              className={`px-3 py-1 rounded-lg text-sm ${taskFilter === 'all' ? 'bg-gold/20 text-gold' : 'text-gray-400'}`}
            >
              Hammasi ({tasks.length})
            </button>
            {team.filter((m) => m.id !== 'jamoa').map((m) => {
              const count = tasks.filter((t) => t.assignee === m.id).length;
              return (
                <button
                  key={m.id}
                  onClick={() => setTaskFilter(m.id)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    taskFilter === m.id ? 'bg-gold/20 text-gold' : 'text-gray-400'
                  }`}
                >
                  {m.name} ({count})
                </button>
              );
            })}
          </div>

          {(['mentor', 'targetolog', 'sotuvchi1', 'sotuvchi2', 'assistent'] as Assignee[]).map((id) => {
            if (taskFilter !== 'all' && taskFilter !== id) return null;
            const mTasks = tasks.filter((t) => t.assignee === id);
            const done = mTasks.filter((t) => t.status === 'done').length;
            const color = MEMBER_COLORS[id];
            const phaseGroups = phases.map((ph) => ({
              phase: ph,
              tasks: mTasks.filter((t) => t.phaseId === ph.id),
            })).filter((g) => g.tasks.length > 0);

            return (
              <div key={id} className={`card border ${color.border}`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`font-bold ${color.text}`}>{team.find((t) => t.id === id)?.name}</h3>
                  <span className="text-sm text-gray-400">{done}/{mTasks.length} bajarildi</span>
                </div>
                {phaseGroups.map(({ phase, tasks: pTasks }) => (
                  <div key={phase.id} className="mb-3">
                    <p className="text-xs font-bold text-gray-500 mb-1">
                      {phase.emoji} {phase.name} ({pTasks.length})
                    </p>
                    <ul className="space-y-1">
                      {pTasks.slice(0, taskFilter === id ? 999 : 5).map((t) => (
                        <li key={t.id}>
                          <Link
                            to={`/phase/${t.phaseId}/sub/${t.subModuleId}`}
                            className="text-sm text-gray-300 hover:text-gold flex items-center gap-2"
                          >
                            <span>{t.status === 'done' ? '✅' : t.status === 'inprogress' ? '🔄' : '⬜'}</span>
                            <span className="truncate">{t.title}</span>
                            <span className="text-gray-600 text-xs ml-auto">T{t.day >= 0 ? '+' : ''}{t.day}</span>
                          </Link>
                        </li>
                      ))}
                      {taskFilter === 'all' && pTasks.length > 5 && (
                        <li className="text-xs text-gray-600">+{pTasks.length - 5} boshqa...</li>
                      )}
                    </ul>
                  </div>
                ))}
                {taskFilter === id && (
                  <Link to="/daily" className="text-xs text-gold hover:underline mt-2 inline-block">
                    Kunlik rejimda barcha ishlar →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function raciColor(val: string): string {
  if (val === '—') return 'text-gray-600';
  if (val.includes('A')) return 'text-gold font-bold';
  if (val.includes('R')) return 'text-green-400';
  return 'text-gray-400';
}
