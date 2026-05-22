import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLaunchStore } from '../store/launchStore';
import { useAuthStore } from '../store/authStore';
import { useBackendStore } from '../store/backendStore';
import { LAUNCH_STAGES, PHASES } from '../data/phases';
import SyncStatus from './SyncStatus';

// Full-access navigation
const NAV_FULL = [
  { to: '/',           icon: '🚀', label: 'Zapusk',       highlight: false },
  { to: '/daily',      icon: '📋', label: 'Bugungi ishlar', highlight: false },
  { to: '/bonuses',    icon: '🎁', label: 'Mukofotlar',   highlight: true  },
  { to: '/standup',    icon: '🗣️', label: 'Standup',      highlight: false },
  { to: '/calendar',   icon: '📅', label: 'Kalendar',     highlight: false },
  { to: '/launch-day', icon: '🚨', label: 'Seminar kuni', highlight: false },
  { to: '/analytics',  icon: '📊', label: 'Analitika',    highlight: false },
  { to: '/kpi',        icon: '🎯', label: 'KPI',          highlight: false },
  { to: '/finance',    icon: '💹', label: 'Moliya',       highlight: false },
  { to: '/team',       icon: '👥', label: 'Jamoa',        highlight: false },
  { to: '/dashboard',  icon: '📈', label: 'Statistika',   highlight: false },
];

// Limited navigation
const NAV_LIMITED = [
  { to: '/role-home',  icon: '🏠', label: 'Mening ishlarim', highlight: false },
  { to: '/daily',      icon: '📋', label: 'Bugungi tasklar',  highlight: false },
  { to: '/standup',    icon: '🗣️', label: 'Standup',          highlight: false },
  { to: '/bonuses',    icon: '🎁', label: 'Mukofotlar',       highlight: true  },
  { to: '/calendar',   icon: '📅', label: 'Kalendar',         highlight: false },
  { to: '/launch-day', icon: '🚨', label: 'Seminar kuni',     highlight: false },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const {
    tasks, totalXP, streak, currentDay, setCurrentDay,
    getStageProgress, isStageUnlocked, isPhaseUnlocked,
    getPhaseProgress, getSubModuleProgress, getSubModulesByPhase, isSubModuleUnlocked,
  } = useLaunchStore();

  const { getCurrentRole, logout, hasFullAccess, signOut } = useAuthStore();
  const { syncStatus } = useBackendStore();
  const role = getCurrentRole();
  const fullAccess = hasFullAccess();

  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const overallProgress = tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0;

  const myTasks = role && !fullAccess ? tasks.filter((t) => t.assignee === role.id) : tasks;
  const myDone = myTasks.filter((t) => t.status === 'done').length;
  const myProgress = myTasks.length ? Math.round((myDone / myTasks.length) * 100) : 0;
  const displayProgress = fullAccess ? overallProgress : myProgress;

  return (
    <aside className="w-56 bg-dark-card border-r border-dark-border flex flex-col h-screen flex-shrink-0">

      {/* ── HEADER ── */}
      <div className="px-3 pt-4 pb-3 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center font-black text-dark-bg text-sm flex-shrink-0">
            M
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-sm text-white leading-tight">MoySklad</p>
            <div className="h-1.5 bg-dark-surface rounded-full overflow-hidden mt-0.5">
              <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${displayProgress}%` }} />
            </div>
          </div>
          <span className="text-[10px] text-gold font-bold flex-shrink-0">{displayProgress}%</span>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <SyncStatus />
        </div>

        {/* Role row */}
        {role && (
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="text-base">{role.emoji}</span>
            <span className={`text-xs font-semibold truncate flex-1 ${role.color.includes('text-') ? '' : 'text-gray-300'}`}>
              {role.name}
            </span>
            <span className="text-[10px] text-gray-600 flex-shrink-0">
              {fullAccess ? '👑' : '🔒'}
            </span>
            <button
              type="button"
              onClick={logout}
              className="text-[10px] text-gray-600 hover:text-red-400 transition-colors flex-shrink-0 ml-1"
              title="Chiqish"
            >
              Chiqish
            </button>
          </div>
        )}
      </div>

      {/* ── COMPACT STATS ── */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-dark-border gap-2">
        {/* XP */}
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-sm">⚡</span>
          <p className="text-gold font-bold text-xs">{totalXP.toLocaleString()}</p>
          <span className="text-[10px] text-gray-600">XP</span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-dark-border" />

        {/* Streak */}
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-sm">🔥</span>
          <p className="text-orange-400 font-bold text-xs">{streak}</p>
          <span className="text-[10px] text-gray-600">kun</span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-dark-border" />

        {/* Day */}
        {fullAccess ? (
          <div className="flex items-center gap-1">
            <span className="text-sm">📅</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentDay(Math.max(-30, currentDay - 1))}
                className="text-gray-500 hover:text-white text-[10px] font-bold"
              >
                ‹
              </button>
              <span className={`text-xs font-bold ${currentDay === 0 ? 'text-red-400' : 'text-white'}`}>
                T{currentDay >= 0 ? '+' : ''}{currentDay}
              </span>
              <button
                type="button"
                onClick={() => setCurrentDay(Math.min(21, currentDay + 1))}
                className="text-gray-500 hover:text-white text-[10px] font-bold"
              >
                ›
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span className="text-sm">✅</span>
            <span className="text-xs font-bold text-white">{myDone}/{myTasks.length}</span>
          </div>
        )}
      </div>

      {/* ── SEARCH ── */}
      <div className="px-2 py-1.5">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 bg-dark-surface border border-dark-border rounded-lg text-xs text-gray-500 hover:border-gold/40 hover:text-gray-300 transition-all"
        >
          <span>🔍</span>
          <span className="flex-1 text-left">Qidirish...</span>
          <kbd className="text-[9px] bg-dark-hover border border-dark-border px-1 py-0.5 rounded hidden sm:block">⌘K</kbd>
        </button>
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="px-1.5 pb-1 overflow-y-auto flex-1">
        {/* Main nav links */}
        <div className="space-y-0.5 pb-2 border-b border-dark-border mb-2">
          {(fullAccess ? NAV_FULL : NAV_LIMITED).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/' || item.to === '/role-home'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all
                ${isActive
                  ? 'bg-gold/15 text-gold font-semibold'
                  : item.highlight
                  ? 'text-gold/80 hover:bg-gold/10 border border-gold/20'
                  : 'text-gray-400 hover:bg-dark-hover hover:text-gray-200'
                }`
              }
            >
              <span className="text-sm flex-shrink-0">{item.icon}</span>
              <span className="flex-1 truncate">{item.label}</span>
              {item.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
              )}
            </NavLink>
          ))}
        </div>

        {/* Phase tree — full access only */}
        {fullAccess && (
          <>
            <p className="text-[10px] text-gray-600 uppercase tracking-wider px-2 pb-1 font-semibold">Bosqichlar</p>
            <div className="space-y-0.5">
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
                      className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left transition-all text-xs
                        ${stageUnlocked ? 'text-gray-300 hover:bg-dark-hover cursor-pointer' : 'text-gray-600 cursor-not-allowed opacity-50'}`}
                    >
                      <span className="text-sm flex-shrink-0">{stageUnlocked ? stage.emoji : '🔒'}</span>
                      <span className="flex-1 truncate font-medium">{stage.label}</span>
                      <span className={`text-[10px] flex-shrink-0 ${stageProgress === 100 ? 'text-green-400' : 'text-gray-600'}`}>
                        {stageProgress}%
                      </span>
                      {stageUnlocked && (
                        <span className={`text-[10px] text-gray-600 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
                      )}
                    </button>

                    {isExpanded && stageUnlocked && (
                      <div className="ml-3 border-l border-dark-border pl-2 space-y-0.5 mb-1 mt-0.5">
                        {PHASES.filter((p) => p.stage === stage.id).map((phase) => {
                          const phaseUnlocked = isPhaseUnlocked(phase.id);
                          const phaseProgress = getPhaseProgress(phase.id);
                          return (
                            <div key={phase.id}>
                              <button
                                type="button"
                                disabled={!phaseUnlocked}
                                onClick={() => phaseUnlocked && navigate(`/phase/${phase.id}`)}
                                className={`w-full text-left px-2 py-1 rounded-md text-[11px] flex items-center gap-1
                                  ${phaseUnlocked ? 'text-gray-400 hover:text-white hover:bg-dark-hover' : 'text-gray-600 cursor-not-allowed'}`}
                              >
                                <span>{phaseUnlocked ? phase.emoji : '🔒'}</span>
                                <span className="flex-1 truncate">{phase.shortName}</span>
                                <span className={`text-[10px] ${phaseProgress === 100 ? 'text-green-400' : 'text-gray-600'}`}>
                                  {phaseProgress}%
                                </span>
                              </button>
                              {phaseUnlocked && (
                                <div className="ml-3 space-y-0.5">
                                  {getSubModulesByPhase(phase.id).map((sm) => {
                                    const smUnlocked = isSubModuleUnlocked(sm.id);
                                    const smProg = getSubModuleProgress(sm.id);
                                    return (
                                      <NavLink
                                        key={sm.id}
                                        to={smUnlocked ? `/phase/${phase.id}/sub/${sm.id}` : '#'}
                                        onClick={(e) => { if (!smUnlocked) e.preventDefault(); else onClose?.(); }}
                                        className={({ isActive }) =>
                                          `block px-2 py-0.5 rounded text-[10px] truncate
                                          ${!smUnlocked ? 'text-gray-600 cursor-not-allowed' : isActive ? 'text-gold bg-gold/10' : 'text-gray-500 hover:text-gray-300 hover:bg-dark-hover'}`
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
            </div>
          </>
        )}

        {/* Limited role: quick task list */}
        {!fullAccess && (
          <>
            <p className="text-[10px] text-gray-600 uppercase tracking-wider px-2 pb-1 font-semibold">Mening tasklarim</p>
            <div className="space-y-0.5">
              {myTasks.slice(0, 8).map((task) => (
                <div
                  key={task.id}
                  className={`px-2 py-1 rounded-md text-[10px] leading-snug ${
                    task.status === 'done' ? 'text-green-500 line-through opacity-60' :
                    task.status === 'inprogress' ? 'text-blue-400' : 'text-gray-500'
                  }`}
                >
                  {task.status === 'done' ? '✓' : task.status === 'inprogress' ? '▶' : '○'} {task.title}
                </div>
              ))}
              {myTasks.length > 8 && (
                <p className="text-[10px] text-gray-600 px-2">+{myTasks.length - 8} ta boshqa task</p>
              )}
            </div>
          </>
        )}
      </nav>
    </aside>
  );
}
