import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLaunchStore } from '../store/launchStore';
import { useAuthStore } from '../store/authStore';
import { LAUNCH_STAGES, PHASES } from '../data/phases';
import ProgressBar from './ProgressBar';

// Full-access navigation (Producer + Yordamchi)
const NAV_FULL = [
  { to: '/',         icon: '🚀', label: 'Zapusk' },
  { to: '/daily',    icon: '📋', label: 'Bugungi ishlar' },
  { to: '/kpi',      icon: '📊', label: 'KPI' },
  { to: '/finance',  icon: '💹', label: 'Moliya Modeli' },
  { to: '/team',     icon: '👥', label: 'Jamoa' },
  { to: '/dashboard',icon: '📈', label: 'Statistika' },
];

// Limited navigation (other roles)
const NAV_LIMITED = [
  { to: '/role-home', icon: '🏠', label: 'Mening ishlarim' },
  { to: '/daily',     icon: '📅', label: 'Bugungi tasklar' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [expandedStage, setExpandedStage] = useState<string | null>('pre-seminar');

  const {
    tasks, totalXP, streak, currentDay, setCurrentDay,
    getStageProgress, isStageUnlocked, isPhaseUnlocked,
    getPhaseProgress, getSubModuleProgress, getSubModulesByPhase, isSubModuleUnlocked,
  } = useLaunchStore();

  const { getCurrentRole, logout, hasFullAccess } = useAuthStore();
  const role = getCurrentRole();
  const fullAccess = hasFullAccess();

  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const overallProgress = tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0;

  // For limited roles, only count their own tasks
  const myTasks = role && !fullAccess
    ? tasks.filter((t) => t.assignee === role.id)
    : tasks;
  const myDone = myTasks.filter((t) => t.status === 'done').length;
  const myProgress = myTasks.length ? Math.round((myDone / myTasks.length) * 100) : 0;

  const displayProgress = fullAccess ? overallProgress : myProgress;

  return (
    <aside className="w-60 bg-dark-card border-r border-dark-border flex flex-col h-screen sticky top-0 flex-shrink-0">

      {/* Header + progress */}
      <div className="px-4 pt-5 pb-4 border-b border-dark-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center font-black text-dark-bg">M</div>
            <div>
              <p className="font-black text-sm text-white">MoySklad</p>
              <p className="text-gold/70 text-xs">Zapusk</p>
            </div>
          </div>
          {/* Current role badge */}
          {role && (
            <div className="flex-shrink-0">
              <span className="text-lg" title={role.name}>{role.emoji}</span>
            </div>
          )}
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{fullAccess ? 'Umumiy' : 'Mening'} progress</span>
            <span className="text-gold font-bold">{displayProgress}%</span>
          </div>
          <ProgressBar value={displayProgress} color="bg-gold" height="h-1.5" />
        </div>
      </div>

      {/* Role indicator */}
      {role && (
        <div className={`mx-3 mt-2 px-3 py-2 rounded-xl border ${role.color} flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <span className="text-base">{role.emoji}</span>
            <div>
              <p className="text-xs font-bold leading-tight">{role.name}</p>
              <p className="text-[10px] opacity-70 leading-none">
                {fullAccess ? '👑 To\'liq kirish' : '🔒 Cheklangan kirish'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="text-[10px] opacity-60 hover:opacity-100 transition-opacity ml-1 flex-shrink-0"
            title="Roldan chiqish"
          >
            Chiqish
          </button>
        </div>
      )}

      {/* Stats panel */}
      <div className="px-3 py-2 border-b border-dark-border mt-2 space-y-1.5">
        {/* XP */}
        <div className="flex items-center justify-between bg-dark-surface rounded-lg px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-base">⚡</span>
            <div>
              <p className="text-[10px] text-gray-500 leading-none">Mukofot balli</p>
              <p className="text-[10px] text-gray-600 leading-none">(task bajarganda olinadi)</p>
            </div>
          </div>
          <p className="text-gold font-black text-sm">{totalXP.toLocaleString()} XP</p>
        </div>

        {/* Streak */}
        <div className="flex items-center justify-between bg-dark-surface rounded-lg px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🔥</span>
            <div>
              <p className="text-[10px] text-gray-500 leading-none">Ketma-ket ish kuni</p>
              <p className="text-[10px] text-gray-600 leading-none">(uzilmay ishlash)</p>
            </div>
          </div>
          <p className="text-orange-400 font-black text-sm">{streak} kun</p>
        </div>

        {/* Day counter — only for full access (others see their task count) */}
        {fullAccess ? (
          <div className="bg-dark-surface rounded-lg px-3 py-1.5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-base">📅</span>
                <div>
                  <p className="text-[10px] text-gray-500 leading-none">Seminar kuniga nisbatan</p>
                  <p className="text-[10px] text-gray-600 leading-none">
                    {currentDay === 0
                      ? 'Bugun — seminar kuni!'
                      : currentDay < 0
                      ? `Seminargacha ${Math.abs(currentDay)} kun`
                      : `Seminardan ${currentDay} kun o'tdi`}
                  </p>
                </div>
              </div>
              <p className="text-white font-black text-sm">
                T{currentDay >= 0 ? '+' : ''}{currentDay}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 mt-1">
              <button
                type="button"
                onClick={() => setCurrentDay(Math.max(-30, currentDay - 1))}
                className="text-gray-400 hover:text-white text-xs px-2 py-0.5 rounded bg-dark-hover hover:bg-dark-border transition-colors"
              >
                ← Oldingi
              </button>
              <span className="text-[10px] text-gray-600">kun</span>
              <button
                type="button"
                onClick={() => setCurrentDay(Math.min(21, currentDay + 1))}
                className="text-gray-400 hover:text-white text-xs px-2 py-0.5 rounded bg-dark-hover hover:bg-dark-border transition-colors"
              >
                Keyingi →
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-dark-surface rounded-lg px-3 py-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-base">✅</span>
              <p className="text-[10px] text-gray-500 leading-none">Mening tasklarim</p>
            </div>
            <p className="text-white font-black text-sm">{myDone}/{myTasks.length}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="px-2 py-2 border-b border-dark-border space-y-0.5">
        {(fullAccess ? NAV_FULL : NAV_LIMITED).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/' || item.to === '/role-home'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Phase tree — only for full access */}
      {fullAccess ? (
        <nav className="flex-1 px-2 py-2 overflow-y-auto space-y-1">
          <p className="text-xs text-gray-600 uppercase tracking-wide px-2 py-1 font-semibold">Bosqichlar</p>

          {LAUNCH_STAGES.map((stage) => {
            const stageUnlocked = isStageUnlocked(stage.id);
            const stageProgress = getStageProgress(stage.id);
            const isExpanded = expandedStage === stage.id;

            return (
              <div key={stage.id}>
                <button
                  type="button"
                  disabled={!stageUnlocked}
                  onClick={() => {
                    if (!stageUnlocked) return;
                    setExpandedStage(isExpanded ? null : stage.id);
                    navigate(`/stage/${stage.id}`);
                  }}
                  className={`w-full flex items-center gap-2 px-2 py-2 rounded-xl text-left transition-all
                    ${stageUnlocked ? 'hover:bg-dark-hover cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                >
                  <span>{stageUnlocked ? stage.emoji : '🔒'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-200 truncate">{stage.label}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex-1 h-1 bg-dark-surface rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full" style={{ width: `${stageProgress}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-500 w-7">{stageProgress}%</span>
                    </div>
                  </div>
                  {stageUnlocked && (
                    <span className={`text-[10px] text-gray-500 ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
                  )}
                </button>

                {isExpanded && stageUnlocked && (
                  <div className="ml-3 border-l border-dark-border pl-2 space-y-0.5 mb-1">
                    {PHASES.filter((p) => p.stage === stage.id).map((phase) => {
                      const phaseUnlocked = isPhaseUnlocked(phase.id);
                      const phaseProgress = getPhaseProgress(phase.id);
                      return (
                        <div key={phase.id}>
                          <button
                            type="button"
                            disabled={!phaseUnlocked}
                            onClick={() => phaseUnlocked && navigate(`/phase/${phase.id}`)}
                            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center gap-1
                              ${phaseUnlocked ? 'text-gray-400 hover:text-white hover:bg-dark-hover' : 'text-gray-600 cursor-not-allowed'}`}
                          >
                            <span>{phaseUnlocked ? phase.emoji : '🔒'}</span>
                            <span className="flex-1 truncate">{phase.shortName}</span>
                            <span className={phaseProgress === 100 ? 'text-green-400' : ''}>{phaseProgress}%</span>
                          </button>
                          {phaseUnlocked && (
                            <div className="ml-4 space-y-0.5 pb-1">
                              {getSubModulesByPhase(phase.id).map((sm) => {
                                const smUnlocked = isSubModuleUnlocked(sm.id);
                                const smProg = getSubModuleProgress(sm.id);
                                return (
                                  <NavLink
                                    key={sm.id}
                                    to={smUnlocked ? `/phase/${phase.id}/sub/${sm.id}` : '#'}
                                    onClick={(e) => !smUnlocked && e.preventDefault()}
                                    className={({ isActive }) =>
                                      `block px-2 py-1 rounded text-[10px] truncate
                                      ${!smUnlocked ? 'text-gray-600 cursor-not-allowed' : isActive ? 'text-gold bg-gold/10' : 'text-gray-500 hover:text-gray-300'}`
                                    }
                                  >
                                    {smUnlocked ? sm.icon : '🔒'} {sm.name} {smProg === 100 ? '✓' : `${smProg}%`}
                                  </NavLink>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      ) : (
        /* Limited role: show my task summary */
        <div className="flex-1 px-3 py-3 overflow-y-auto">
          <p className="text-xs text-gray-600 uppercase tracking-wide px-1 py-1 font-semibold mb-2">
            Mening bo'limlarim
          </p>
          <div className="space-y-1">
            {myTasks.slice(0, 10).map((task) => (
              <div
                key={task.id}
                className={`px-2 py-1.5 rounded-lg text-[10px] leading-tight ${
                  task.status === 'done'
                    ? 'text-green-500 line-through'
                    : task.status === 'inprogress'
                    ? 'text-blue-400'
                    : 'text-gray-500'
                }`}
              >
                {task.status === 'done' ? '✓' : task.status === 'inprogress' ? '▶' : '○'} {task.title}
              </div>
            ))}
            {myTasks.length > 10 && (
              <p className="text-[10px] text-gray-600 px-2">...va yana {myTasks.length - 10} ta task</p>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-3 border-t border-dark-border">
        {fullAccess ? (
          <>
            <p className="text-[10px] text-gray-600 text-center mb-1">Ketma-ket tizim:</p>
            <div className="flex items-center justify-center gap-1 text-[10px]">
              <span className="text-blue-400">📦 Modul</span>
              <span className="text-gray-600">→</span>
              <span className="text-purple-400">📋 Bo&apos;limcha</span>
              <span className="text-gray-600">→</span>
              <span className="text-green-400">✅ Ishlar</span>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={logout}
            className="w-full text-xs text-gray-500 hover:text-red-400 border border-dark-border hover:border-red-400/30 py-2 rounded-xl transition-colors text-center"
          >
            🚪 Boshqa rol bilan kirish
          </button>
        )}
      </div>
    </aside>
  );
}
