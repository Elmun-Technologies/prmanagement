import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLaunchStore } from '../store/launchStore';
import { LAUNCH_STAGES } from '../data/phases';
import ProgressBar from '../components/ProgressBar';
import TaskItem from '../components/TaskItem';
import { KPI_TARGETS, FUNNEL_STAGES } from '../data/kpiManagement';
import {
  STATS_TABS,
  FUNNEL_QUICK,
  PHASE_STYLES,
  STAGE_STYLES,
  formatLaunchDay,
  getCurrentPhase,
  getDayPhaseHint,
  computeLaunchSnapshot,
  DAILY_STANDUP,
  QUICK_LINKS,
  type StatsTabId,
} from '../data/statsManagement';

export default function Dashboard() {
  const {
    kpis,
    totalXP,
    streak,
    badges,
    tasks,
    phases,
    team,
    currentDay,
    getTodayTasks,
    getPhaseProgress,
    getStageProgress,
  } = useLaunchStore();

  const [tab, setTab] = useState<StatsTabId>('overview');

  const todayTasks = getTodayTasks();
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'inprogress').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
  const earnedBadges = badges.filter((b) => b.earned).length;
  const currentPhase = getCurrentPhase(phases, currentDay);

  const snapshot = useMemo(
    () => computeLaunchSnapshot(kpis, doneTasks, tasks.length),
    [kpis, doneTasks, tasks.length],
  );

  const topTeam = useMemo(
    () => [...team].sort((a, b) => b.xp - a.xp).slice(0, 5),
    [team],
  );

  const maxTeamXp = Math.max(...topTeam.map((m) => m.xp), 1);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Statistika</h1>
          <p className="text-gray-400 text-sm mt-1">
            {formatLaunchDay(currentDay)}
            {currentPhase && (
              <>
                {' · '}
                <span className={PHASE_STYLES[currentPhase.id]?.text || 'text-gold'}>
                  {currentPhase.emoji} {currentPhase.name}
                </span>
              </>
            )}
            {' · '}
            {doneTasks}/{tasks.length} task · {inProgressTasks} jarayonda
          </p>
          {currentPhase && (
            <p className="text-xs text-gray-500 mt-1">{getDayPhaseHint(currentPhase, currentDay)}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/kpi" className="btn-ghost text-sm">KPI →</Link>
          <Link to="/daily" className="btn-gold text-sm">Bugungi ishlar →</Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-dark-border pb-2">
        {STATS_TABS.map((t) => (
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

      {/* OVERVIEW */}
      {tab === 'overview' && (
        <div className="space-y-5">
          {/* Funnel strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {FUNNEL_QUICK.map((k) => {
              const value = kpis[k.key];
              const tgt =
                k.key === 'seminarSales' ? KPI_TARGETS.seminarTickets : KPI_TARGETS[k.key];
              return (
                <Link key={k.key} to="/kpi" className="card hover:border-gold/30 transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">{k.label}</span>
                    <span>{k.icon}</span>
                  </div>
                  <p className="text-xl font-black text-white">
                    {value}<span className="text-sm text-gray-500 font-normal">/{tgt}</span>
                  </p>
                  <ProgressBar value={value} max={tgt} color={k.color} height="h-1.5" className="mt-2" />
                </Link>
              );
            })}
          </div>

          {/* Hero metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card border-green-500/30 bg-gradient-to-br from-green-900/25 to-dark-card">
              <p className="text-xs text-green-400 font-bold uppercase">Kurs daromadi</p>
              <p className="text-3xl font-black text-white mt-1">${snapshot.revenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">
                Maqsad ${KPI_TARGETS.totalRevenueUsd.toLocaleString()} · {kpis.courseSales}/{KPI_TARGETS.courseSales} ta
              </p>
              <ProgressBar
                value={kpis.courseSales}
                max={KPI_TARGETS.courseSales}
                color="bg-green-500"
                height="h-2"
                className="mt-3"
              />
            </div>

            <div className="card border-gold/30 bg-gradient-to-br from-amber-900/20 to-dark-card">
              <p className="text-xs text-gold font-bold uppercase">Umumiy XP</p>
              <p className="text-3xl font-black text-white mt-1">{totalXP.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">
                {earnedBadges}/{badges.length} badge · Task {snapshot.taskPct}%
              </p>
              <ProgressBar value={snapshot.taskPct} max={100} color="bg-gold" height="h-2" className="mt-3" />
            </div>

            <div className="card border-orange-500/30 bg-gradient-to-br from-orange-900/20 to-dark-card">
              <p className="text-xs text-orange-400 font-bold uppercase">Streak</p>
              <p className="text-3xl font-black text-white mt-1">{streak} kun</p>
              <p className="text-xs text-gray-500 mt-1">
                {streak < 3 ? '3 kunda «Olov» badge' : streak < 7 ? '7 kunda «Haftalik Chempion»' : 'Ajoyib ritm!'}
              </p>
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <div
                    key={d}
                    className={`h-2 flex-1 rounded-full ${d <= streak ? 'bg-orange-500' : 'bg-dark-surface'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Conversion + task status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card">
              <h2 className="font-bold text-white mb-3">📐 Konversiya (hozir)</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Lead → Ro&apos;yxat</span>
                  <span className="text-white font-bold">{snapshot.regFromLead}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Keldi → Kurs</span>
                  <span className="text-white font-bold">{snapshot.courseFromAttend}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Seminar (so&apos;m)</span>
                  <span className="text-orange-400 font-bold">
                    {(snapshot.seminarUzs / 1_000_000).toFixed(1)}M
                  </span>
                </div>
              </div>
              <Link to="/kpi" className="text-xs text-gold mt-3 inline-block hover:underline">
                Batafsil KPI →
              </Link>
            </div>

            <div className="card">
              <h2 className="font-bold text-white mb-3">✅ Task holati</h2>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-dark-surface rounded-lg py-3 border border-dark-border">
                  <p className="text-2xl font-black text-green-400">{doneTasks}</p>
                  <p className="text-xs text-gray-500">Bajarildi</p>
                </div>
                <div className="bg-dark-surface rounded-lg py-3 border border-amber-500/30">
                  <p className="text-2xl font-black text-amber-400">{inProgressTasks}</p>
                  <p className="text-xs text-gray-500">Jarayonda</p>
                </div>
                <div className="bg-dark-surface rounded-lg py-3 border border-dark-border">
                  <p className="text-2xl font-black text-gray-400">{pendingTasks}</p>
                  <p className="text-xs text-gray-500">Kutilmoqda</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="card hover:border-gold/40 transition-colors text-center py-4"
              >
                <span className="text-2xl">{link.icon}</span>
                <p className="font-bold text-white text-sm mt-2">{link.label}</p>
                <p className="text-xs text-gray-500">{link.desc}</p>
              </Link>
            ))}
          </div>

          {/* Badges */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-white">🏅 Yutuqlar</h2>
              <span className="text-xs text-gray-500">{earnedBadges}/{badges.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm max-w-xs ${
                    badge.earned
                      ? 'bg-gold/10 border-gold/40 text-gold'
                      : 'bg-dark-surface border-dark-border text-gray-500 opacity-60'
                  }`}
                >
                  <span className="text-xl">{badge.emoji}</span>
                  <div>
                    <p className="font-semibold text-xs">{badge.name}</p>
                    <p className="text-[10px] opacity-80 line-clamp-1">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today preview */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-white">
                Bugungi tasklar ({formatLaunchDay(currentDay)})
              </h2>
              <Link to="/daily" className="text-sm text-gold hover:underline">
                Hammasi →
              </Link>
            </div>
            {todayTasks.length === 0 ? (
              <div className="card text-center text-gray-500 py-8">
                <p className="text-4xl mb-2">📅</p>
                <p>Bu kun uchun task yo&apos;q</p>
                <p className="text-xs mt-1">Sidebarda kunni ← → bilan o&apos;zgartiring</p>
              </div>
            ) : (
              <div className="space-y-2">
                {todayTasks.slice(0, 3).map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
                {todayTasks.length > 3 && (
                  <Link to="/daily" className="block text-center text-sm text-gold py-2">
                    Yana {todayTasks.length - 3} ta →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PHASES */}
      {tab === 'phases' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            5 modul · Maqsad: seminar oldidan tayyorlik, T0 da 20 kurs, T+1-21 dojim va onboarding
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {phases.map((phase) => {
              const progress = getPhaseProgress(phase.id);
              const phaseTasks = tasks.filter((t) => t.phaseId === phase.id);
              const done = phaseTasks.filter((t) => t.status === 'done').length;
              const style = PHASE_STYLES[phase.id];
              const isActive = currentPhase?.id === phase.id;

              return (
                <Link
                  key={phase.id}
                  to={`/phase/${phase.id}`}
                  className={`card border-2 transition-all hover:border-gold/40 ${
                    style?.border || 'border-dark-border'
                  } ${isActive ? 'ring-1 ring-gold/50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{phase.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <p className={`font-bold ${style?.text || 'text-white'}`}>{phase.name}</p>
                        {isActive && (
                          <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full shrink-0">
                            Hozir
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{phase.shortName} · {formatLaunchDay(phase.dayStart)}…{formatLaunchDay(phase.dayEnd)}</p>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2">{phase.goal}</p>
                      <p className="text-sm text-white font-semibold mt-2">
                        {done}/{phaseTasks.length} task
                      </p>
                      <ProgressBar
                        value={progress}
                        max={100}
                        color={style?.bar || 'bg-gold'}
                        height="h-2"
                        className="mt-2"
                        showLabel
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Funnel reference */}
          <div className="card border-gold/20">
            <h3 className="font-bold text-gold mb-2">Voronka maqsadlari</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              {FUNNEL_STAGES.map((s) => (
                <span key={s.id} className="text-gray-300">
                  {s.emoji} {s.label}: <strong className="text-white">{s.target}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STAGES */}
      {tab === 'stages' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LAUNCH_STAGES.map((stage) => {
              const progress = getStageProgress(stage.id);
              const style = STAGE_STYLES[stage.id];
              const stagePhases = phases.filter((p) => stage.phaseIds.includes(p.id));

              return (
                <Link
                  key={stage.id}
                  to={`/stage/${stage.id}`}
                  className={`card border-2 hover:border-gold/40 transition-all ${style.border}`}
                >
                  <span className="text-4xl">{stage.emoji}</span>
                  <p className={`font-bold text-lg mt-2 ${style.accent}`}>{stage.label}</p>
                  <p className="text-xs text-gray-500">{stage.subtitle}</p>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{stage.description}</p>
                  <p className="text-2xl font-black text-white mt-3">{progress}%</p>
                  <ProgressBar value={progress} color="bg-gold" height="h-2" className="mt-2" />
                  <div className="mt-3 flex flex-wrap gap-1">
                    {stagePhases.map((p) => (
                      <span key={p.id} className="text-xs bg-dark-surface px-2 py-0.5 rounded text-gray-400">
                        {p.emoji} {p.shortName}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="card">
            <h2 className="font-bold text-white mb-3">⏰ Kunlik standup</h2>
            <div className="space-y-2">
              {DAILY_STANDUP.map((row, i) => (
                <div
                  key={i}
                  className="flex flex-wrap gap-3 items-center py-2 border-b border-dark-border/50 last:border-0"
                >
                  <span className="text-gold font-mono text-sm w-14">{row.time}</span>
                  <span className="text-white font-medium text-sm w-24">{row.who}</span>
                  <span className="text-gray-400 text-sm flex-1">{row.what}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team mini */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-white">👥 Jamoa reytingi</h2>
              <Link to="/team" className="text-xs text-gold hover:underline">Batafsil →</Link>
            </div>
            <div className="space-y-3">
              {topTeam.map((member, i) => (
                <div key={member.id} className="flex items-center gap-3">
                  <span className="text-gray-500 w-5 text-sm font-bold">#{i + 1}</span>
                  <div
                    className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-sm"
                  >
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{member.name}</p>
                    <div className="mt-1">
                      <ProgressBar value={member.xp} max={maxTeamXp} color="bg-gold" height="h-1" />
                    </div>
                  </div>
                  <span className="text-gold font-bold text-sm">⚡{member.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TODAY */}
      {tab === 'today' && (
        <div className="space-y-4">
          <div className="card border-gold/30">
            <p className="text-gold font-bold">{formatLaunchDay(currentDay)}</p>
            {currentPhase && (
              <p className="text-white mt-1">
                {currentPhase.emoji} {currentPhase.name} — {getDayPhaseHint(currentPhase, currentDay)}
              </p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              {todayTasks.length} ta task · {todayTasks.filter((t) => t.status === 'done').length} bajarildi
            </p>
          </div>

          {todayTasks.length === 0 ? (
            <div className="card text-center py-12 text-gray-500">
              <p className="text-5xl mb-3">🎯</p>
              <p className="font-medium text-white">Bugun task yo&apos;q</p>
              <p className="text-sm mt-2">Keyingi kunga o&apos;ting yoki boshqa fazadan ish tanlang</p>
              <Link to="/daily" className="btn-gold inline-block mt-4">
                Kunlik rejim →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {todayTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
