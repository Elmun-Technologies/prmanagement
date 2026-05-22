import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLaunchStore } from '../store/launchStore';
import { LAUNCH_STAGES, PHASES } from '../data/phases';
import ProgressBar from './ProgressBar';

const NAV = [
  { to: '/', icon: '🚀', label: 'Zapusk' },
  { to: '/daily', icon: '📋', label: 'Bugungi ishlar' },
  { to: '/kpi', icon: '📊', label: 'KPI' },
  { to: '/finance', icon: '💹', label: 'Moliya Modeli' },
  { to: '/team', icon: '👥', label: 'Jamoa' },
  { to: '/dashboard', icon: '📈', label: 'Statistika' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [expandedStage, setExpandedStage] = useState<string | null>('pre-seminar');

  const {
    tasks, totalXP, streak, currentDay, setCurrentDay,
    getStageProgress, isStageUnlocked, isPhaseUnlocked,
    getPhaseProgress, getSubModuleProgress, getSubModulesByPhase, isSubModuleUnlocked,
  } = useLaunchStore();

  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const overallProgress = tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0;

  return (
    <aside className="w-60 bg-dark-card border-r border-dark-border flex flex-col h-screen sticky top-0 flex-shrink-0">
      <div className="px-4 pt-5 pb-4 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center font-black text-dark-bg">M</div>
          <div>
            <p className="font-black text-sm text-white">MoySklad</p>
            <p className="text-gold/70 text-xs">Zapusk</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Umumiy</span>
            <span className="text-gold font-bold">{overallProgress}%</span>
          </div>
          <ProgressBar value={overallProgress} color="bg-gold" height="h-1.5" />
        </div>
      </div>

      <div className="px-4 py-2 border-b border-dark-border flex gap-2 text-xs">
        <div className="flex-1 bg-dark-surface rounded-lg py-1.5 text-center">
          <p className="text-gold font-bold">{totalXP}</p>
          <p className="text-gray-500">XP</p>
        </div>
        <div className="flex-1 bg-dark-surface rounded-lg py-1.5 text-center">
          <p className="text-orange-400 font-bold">{streak}</p>
          <p className="text-gray-500">Streak</p>
        </div>
        <div className="flex-1 bg-dark-surface rounded-lg py-1.5 flex items-center justify-center gap-1">
          <button onClick={() => setCurrentDay(Math.max(-30, currentDay - 1))} className="text-gray-500 hover:text-white">←</button>
          <span className="text-white font-bold">T{currentDay >= 0 ? '+' : ''}{currentDay}</span>
          <button onClick={() => setCurrentDay(Math.min(7, currentDay + 1))} className="text-gray-500 hover:text-white">→</button>
        </div>
      </div>

      <nav className="px-2 py-2 border-b border-dark-border space-y-0.5">
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </nav>

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

      <div className="px-4 py-3 border-t border-dark-border text-center">
        <p className="text-[10px] text-gray-600">Bo&apos;lim → Bo&apos;limcha → Ishlar</p>
      </div>
    </aside>
  );
}
