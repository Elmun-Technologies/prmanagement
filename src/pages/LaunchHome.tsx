import { Link } from 'react-router-dom';
import { useLaunchStore } from '../store/launchStore';
import { LAUNCH_STAGES } from '../data/phases';
import ProgressBar from '../components/ProgressBar';

export default function LaunchHome() {
  const {
    getStageProgress, isStageUnlocked, getUnlockHint, tasks, currentDay, totalXP, streak,
  } = useLaunchStore();

  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const overallProgress = tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0;

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="mb-10">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">Zapusk Management</p>
        <h1 className="text-4xl font-black text-white leading-tight">MOYSKLAD PRO Akademiya</h1>
        <p className="text-gray-400 mt-2 max-w-2xl">
          Marketing jamoasi uchun bosqichma-bosqich zapusk. Har bir bosqich oldingisi 100% bo&apos;lgach ochiladi.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="flex items-center gap-1.5 text-xs bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5">
            <span>📅</span>
            <span className="text-gray-400">
              {currentDay === 0
                ? 'Bugun seminar kuni!'
                : currentDay < 0
                ? `Seminargacha ${Math.abs(currentDay)} kun qoldi`
                : `Seminardan ${currentDay} kun o'tdi`}
            </span>
            <span className="text-white font-bold ml-1">(T{currentDay >= 0 ? '+' : ''}{currentDay})</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5">
            <span>⚡</span>
            <span className="text-gray-400">Mukofot balli:</span>
            <span className="text-gold font-bold">{totalXP.toLocaleString()} XP</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5">
            <span>🔥</span>
            <span className="text-gray-400">Ketma-ket ish:</span>
            <span className="text-orange-400 font-bold">{streak} kun</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5">
            <span>📊</span>
            <span className="text-gray-400">Umumiy progress:</span>
            <span className="text-green-400 font-bold">{overallProgress}%</span>
          </span>
        </div>
        <div className="mt-4 max-w-md">
          <ProgressBar value={overallProgress} color="bg-gold" height="h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {LAUNCH_STAGES.map((stage) => {
          const progress = getStageProgress(stage.id);
          const unlocked = isStageUnlocked(stage.id);
          const hint = getUnlockHint(stage.id);

          const card = (
            <div
              className={`relative rounded-2xl overflow-hidden h-full flex flex-col transition-all
                ${unlocked ? 'hover:scale-[1.02] hover:shadow-gold-lg' : 'opacity-75'}`}
            >
              <div
                className={`flex-1 min-h-[200px] flex flex-col items-center justify-center p-6 relative
                  ${unlocked ? 'bg-gold' : 'bg-dark-surface border-2 border-dark-border'}`}
              >
                {!unlocked && (
                  <div className="absolute inset-0 bg-black/65 flex items-center justify-center z-10 p-4">
                    <div className="text-center">
                      <span className="text-4xl block mb-2">🔒</span>
                      <p className="text-white text-xs font-medium">{hint}</p>
                    </div>
                  </div>
                )}
                <span className="text-5xl mb-3">{stage.emoji}</span>
                <p className={`font-black text-xl text-center ${unlocked ? 'text-dark-bg' : 'text-gray-500'}`}>
                  {stage.label}
                </p>
                <p className={`text-xs mt-1 ${unlocked ? 'text-dark-bg/70' : 'text-gray-600'}`}>{stage.subtitle}</p>
              </div>
              <div className="bg-dark-card border-t border-dark-border p-4">
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{stage.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-2xl font-black ${unlocked ? 'text-gold' : 'text-gray-600'}`}>{progress}%</span>
                  <span className={`text-sm font-semibold ${unlocked ? 'text-gold' : 'text-gray-600'}`}>
                    {unlocked ? 'Kirish →' : 'Qulflangan'}
                  </span>
                </div>
                <ProgressBar value={progress} color={unlocked ? 'bg-gold' : 'bg-gray-600'} height="h-1.5" />
              </div>
            </div>
          );

          return unlocked ? (
            <Link key={stage.id} to={`/stage/${stage.id}`} className="block">
              {card}
            </Link>
          ) : (
            <div key={stage.id}>{card}</div>
          );
        })}
      </div>

      <div className="glass-card p-5">
        <h2 className="text-white font-bold mb-3">Bugun nima qilish kerak?</h2>
        <div className="flex flex-wrap gap-2">
          <Link to="/daily" className="btn-outline text-sm">Bugungi ishlar</Link>
          <Link to="/kpi" className="btn-outline text-sm">KPI</Link>
          <Link to="/team" className="btn-ghost text-sm">Jamoa</Link>
          <Link to="/dashboard" className="btn-ghost text-sm">Statistika</Link>
        </div>
      </div>
    </div>
  );
}
