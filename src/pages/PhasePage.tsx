import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useLaunchStore } from '../store/launchStore';
import { LAUNCH_STAGES } from '../data/phases';
import ProgressBar from '../components/ProgressBar';

const PHASE_STYLES = [
  { color: 'bg-blue-500',   light: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/30',   badge: 'bg-blue-500/20 text-blue-300' },
  { color: 'bg-purple-500', light: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', badge: 'bg-purple-500/20 text-purple-300' },
  { color: 'bg-amber-500',  light: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/30',  badge: 'bg-amber-500/20 text-amber-300' },
  { color: 'bg-green-500',  light: 'bg-green-500/10',  text: 'text-green-400',  border: 'border-green-500/30',  badge: 'bg-green-500/20 text-green-300' },
  { color: 'bg-indigo-500', light: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30', badge: 'bg-indigo-500/20 text-indigo-300' },
];

export default function PhasePage() {
  const { phaseId: phaseIdStr } = useParams<{ phaseId: string }>();
  const phaseId = parseInt(phaseIdStr || '1');
  const prevProgress = useRef<number | null>(null);

  const {
    phases, getPhaseProgress, getSubModulesByPhase, getSubModuleProgress,
    getTasksBySubModule, getTotalXPForPhase, getEarnedXPForPhase,
    getTotalXPForSubModule, getEarnedXPForSubModule,
    isPhaseUnlocked, isSubModuleUnlocked,
  } = useLaunchStore();

  const phase = phases.find((p) => p.id === phaseId);
  const progress = getPhaseProgress(phaseId);
  const totalXP = getTotalXPForPhase(phaseId);
  const earnedXP = getEarnedXPForPhase(phaseId);
  const style = PHASE_STYLES[phaseId - 1] || PHASE_STYLES[0];
  const subModules = getSubModulesByPhase(phaseId);

  const allTasks = useLaunchStore((s) => s.tasks).filter((t) => t.phaseId === phaseId);
  const doneTasks = allTasks.filter((t) => t.status === 'done').length;

  useEffect(() => {
    if (prevProgress.current !== null && prevProgress.current < 100 && progress === 100) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
    }
    prevProgress.current = progress;
  }, [progress]);

  if (!phase) return <div className="p-6 text-gray-400">Modul topilmadi</div>;

  const stage = LAUNCH_STAGES.find((s) => s.id === phase.stage);
  if (!isPhaseUnlocked(phaseId)) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center">
        <span className="text-6xl">🔒</span>
        <h1 className="text-2xl font-black text-white mt-4">{phase.name} — qulflangan</h1>
        <p className="text-gray-400 mt-2">Avval oldingi modulni 100% bajaring.</p>
        <Link to={stage ? `/stage/${stage.id}` : '/'} className="btn-gold mt-6 inline-block">← Orqaga</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link to="/" className="hover:text-gold">Zapusk</Link>
        <span>›</span>
        <span className={`font-semibold ${style.text}`}>{phase.emoji} {phase.name}</span>
      </div>

      {/* Phase header */}
      <div className={`card border-2 ${style.border} ${style.light}`}>
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{phase.emoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.badge}`}>
                    Bo&apos;lim {phase.id}
                  </span>
                  <span className="text-xs text-gray-400">
                    T{phase.dayStart >= 0 ? '+' : ''}{phase.dayStart} → T{phase.dayEnd >= 0 ? '+' : ''}{phase.dayEnd}
                  </span>
                </div>
                <h1 className={`text-2xl font-black mt-0.5 ${style.text}`}>{phase.name}</h1>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{phase.goal}</p>
          </div>

          <div className="text-right flex-shrink-0">
            <p className={`text-5xl font-black ${style.text}`}>{progress}%</p>
            <p className="text-gray-500 text-xs mt-1">{doneTasks}/{allTasks.length} ish bajarildi</p>
            <p className="text-gold text-xs mt-0.5 font-semibold">⚡ {earnedXP}/{totalXP} XP</p>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar value={progress} color={style.color} height="h-3" showLabel />
        </div>

        {progress === 100 && (
          <div className="mt-3 flex items-center gap-2 text-green-300 bg-green-500/10 rounded-xl px-4 py-2.5 border border-green-500/30">
            <span className="text-xl">🎉</span>
            <span className="font-bold">Bo&apos;lim to&apos;liq bajarildi! Tabriklaymiz!</span>
          </div>
        )}
      </div>

      {/* Sub-modules grid — Bo'limchalar */}
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Bo&apos;limchalar</h2>
        <p className="text-sm text-gray-500 mb-4">Ketma-ket ochiladi — oldingi bo&apos;limcha 100% bo&apos;lgach keyingisi</p>

        <div className="grid grid-cols-1 gap-3">
          {subModules.map((sm) => {
            const smProgress = getSubModuleProgress(sm.id);
            const smTasks = getTasksBySubModule(sm.id);
            const smDone = smTasks.filter((t) => t.status === 'done').length;
            const smInProgress = smTasks.filter((t) => t.status === 'inprogress').length;
            const smXP = getTotalXPForSubModule(sm.id);
            const smEarnedXP = getEarnedXPForSubModule(sm.id);
            const isComplete = smProgress === 100;

            const smUnlocked = isSubModuleUnlocked(sm.id);

            const row = (
              <div
                className={`card border-2 transition-all group ${
                  smUnlocked ? 'hover:border-gold/30 cursor-pointer' : 'opacity-60 cursor-not-allowed border-dark-border'
                } ${isComplete ? 'border-gold/40' : ''}`}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                    isComplete ? style.light : 'bg-dark-surface'
                  }`}>
                    {isComplete ? '✅' : sm.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-gray-400">{sm.id}</span>
                      <h3 className={`font-bold text-white group-hover:${style.text} transition-colors`}>
                        {sm.name}
                      </h3>
                      {isComplete && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${style.badge}`}>✓ Bajarildi</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs truncate">{sm.description}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1">
                        <ProgressBar value={smProgress} color={style.color} height="h-1.5" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 flex-shrink-0">
                        <span className="text-green-400 font-semibold">{smDone} bajarildi</span>
                        {smInProgress > 0 && <span className="text-blue-400">{smInProgress} jarayonda</span>}
                        <span>{smTasks.length - smDone - smInProgress} qoldi</span>
                      </div>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-gold font-bold text-sm">⚡{smEarnedXP}</p>
                    <p className="text-gray-400 text-xs">/{smXP} XP</p>
                    <p className={`text-xl font-black mt-1 ${isComplete ? style.text : 'text-gray-300'}`}>
                      {smProgress}%
                    </p>
                  </div>

                  <span className="text-gray-500 text-lg ml-1">{smUnlocked ? '›' : '🔒'}</span>
                </div>
              </div>
            );

            return smUnlocked ? (
              <Link key={sm.id} to={`/phase/${phaseId}/sub/${sm.id}`}>{row}</Link>
            ) : (
              <div key={sm.id}>{row}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
