import { useParams, Link } from 'react-router-dom';
import { LAUNCH_STAGES, PHASES } from '../data/phases';
import { useLaunchStore } from '../store/launchStore';
import ProgressBar from '../components/ProgressBar';

export default function StagePage() {
  const { stageId } = useParams<{ stageId: string }>();
  const {
    getStageProgress, isStageUnlocked, isPhaseUnlocked, getPhaseProgress,
    getSubModulesByPhase, getUnlockHint,
  } = useLaunchStore();

  const stage = LAUNCH_STAGES.find((s) => s.id === stageId);
  if (!stage) {
    return (
      <div className="p-8 text-gray-400">
        Bosqich topilmadi. <Link to="/" className="text-gold">Bosh sahifa</Link>
      </div>
    );
  }

  const unlocked = isStageUnlocked(stage.id);
  const progress = getStageProgress(stage.id);
  const phases = PHASES.filter((p) => stage.phaseIds.includes(p.id)).sort((a, b) => a.id - b.id);

  if (!unlocked) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center">
        <span className="text-6xl">🔒</span>
        <h1 className="text-2xl font-black text-white mt-4">{stage.label} — qulflangan</h1>
        <p className="text-gray-400 mt-2">{getUnlockHint(stage.id)}</p>
        <Link to="/" className="btn-gold mt-6 inline-block">← Bosh sahifaga</Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-gold">Zapusk</Link>
        <span>›</span>
        <span className="text-white font-semibold">{stage.label}</span>
      </div>

      <div className="mb-8">
        <div className="flex items-start gap-4">
          <span className="text-5xl">{stage.emoji}</span>
          <div className="flex-1">
            <p className="text-gold text-xs font-semibold uppercase tracking-wide">{stage.subtitle}</p>
            <h1 className="text-3xl font-black text-white">{stage.label}</h1>
            <p className="text-gray-400 mt-1">{stage.description}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black text-gold">{progress}%</p>
            <p className="text-gray-500 text-xs">{phases.length} modul</p>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar value={progress} color="bg-gold" height="h-2" />
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-4">
        Modullar ketma-ket ochiladi — oldingi modul 100% bo&apos;lgach keyingisi ochiladi.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {phases.map((phase, idx) => {
          const phaseUnlocked = isPhaseUnlocked(phase.id);
          const phaseProgress = getPhaseProgress(phase.id);
          const subCount = getSubModulesByPhase(phase.id).length;

          const inner = (
            <>
              <div
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative overflow-hidden
                  ${phaseUnlocked ? 'bg-gold' : 'bg-dark-surface border-2 border-dark-border'}`}
              >
                {!phaseUnlocked && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <span className="text-3xl">🔒</span>
                  </div>
                )}
                <p className={`font-black text-5xl leading-none ${phaseUnlocked ? 'text-dark-bg' : 'text-gray-600'}`}>
                  {idx + 1}
                </p>
                <p className={`font-black text-sm mt-1 ${phaseUnlocked ? 'text-dark-bg' : 'text-gray-600'}`}>MODUL</p>
              </div>
              <p className={`text-sm font-semibold mt-2 text-center leading-snug ${phaseUnlocked ? 'text-white group-hover:text-gold' : 'text-gray-600'}`}>
                {phase.name}
              </p>
              <p className="text-gray-600 text-xs text-center mt-0.5">
                {subCount} bo&apos;limcha · {phaseProgress}%
              </p>
            </>
          );

          return phaseUnlocked ? (
            <Link key={phase.id} to={`/phase/${phase.id}`} className="group block">
              {inner}
            </Link>
          ) : (
            <div key={phase.id} className="opacity-70 cursor-not-allowed">{inner}</div>
          );
        })}
      </div>
    </div>
  );
}
