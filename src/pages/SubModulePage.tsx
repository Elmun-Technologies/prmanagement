import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { useLaunchStore } from '../store/launchStore';
import { SUB_MODULES } from '../data/phases';
import type { Assignee } from '../data/types';
import TaskItem from '../components/TaskItem';
import ProgressBar from '../components/ProgressBar';

const PHASE_STYLES = [
  { color: 'bg-blue-500',   light: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/30',   badge: 'bg-blue-500/20 text-blue-300' },
  { color: 'bg-purple-500', light: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', badge: 'bg-purple-500/20 text-purple-300' },
  { color: 'bg-amber-500',  light: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/30',  badge: 'bg-amber-500/20 text-amber-300' },
  { color: 'bg-green-500',  light: 'bg-green-500/10',  text: 'text-green-400',  border: 'border-green-500/30',  badge: 'bg-green-500/20 text-green-300' },
  { color: 'bg-indigo-500', light: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30', badge: 'bg-indigo-500/20 text-indigo-300' },
];

export default function SubModulePage() {
  const { phaseId: phaseIdStr, subId } = useParams<{ phaseId: string; subId: string }>();
  const phaseId = parseInt(phaseIdStr || '1');
  const prevProgress = useRef<number | null>(null);

  const {
    phases, getSubModuleProgress, getTasksBySubModule,
    getTotalXPForSubModule, getEarnedXPForSubModule,
    getSubModulesByPhase, completeTask, uncompleteTask, setTaskInProgress,
    isSubModuleUnlocked, addTask, deleteTask,
  } = useLaunchStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: 'mentor' as Assignee,
    day: -30,
    category: 'bozor' as const,
    xpReward: 30,
  });

  const phase = phases.find((p) => p.id === phaseId);
  const subModule = SUB_MODULES.find((sm) => sm.id === subId);
  const style = PHASE_STYLES[phaseId - 1] || PHASE_STYLES[0];

  const tasks = getTasksBySubModule(subId || '');
  const progress = getSubModuleProgress(subId || '');
  const totalXP = getTotalXPForSubModule(subId || '');
  const earnedXP = getEarnedXPForSubModule(subId || '');

  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'inprogress').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;

  // Group by day
  const tasksByDay = useMemo(() => {
    const map = new Map<number, typeof tasks>();
    tasks.forEach((t) => {
      if (!map.has(t.day)) map.set(t.day, []);
      map.get(t.day)!.push(t);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [tasks]);

  // Sibling sub-modules for navigation
  const siblings = getSubModulesByPhase(phaseId);
  const currentIdx = siblings.findIndex((sm) => sm.id === subId);
  const prevSub = siblings[currentIdx - 1];
  const nextSub = siblings[currentIdx + 1];

  // Confetti on 100%
  useEffect(() => {
    if (prevProgress.current !== null && prevProgress.current < 100 && progress === 100) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    }
    prevProgress.current = progress;
  }, [progress]);

  if (!phase || !subModule) return <div className="p-6 text-gray-400">Bo&apos;limcha topilmadi</div>;

  if (!isSubModuleUnlocked(subId || '')) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center">
        <span className="text-6xl">🔒</span>
        <h1 className="text-2xl font-black text-white mt-4">{subModule.name} — qulflangan</h1>
        <p className="text-gray-400 mt-2">Avval oldingi bo&apos;limchani 100% bajaring.</p>
        <Link to={`/phase/${phaseId}`} className="btn-gold mt-6 inline-block">← Modulga qaytish</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
        <Link to="/" className="hover:text-gold">Zapusk</Link>
        <span>›</span>
        <Link to={`/phase/${phaseId}`} className={`hover:${style.text} font-medium`}>
          {phase.emoji} {phase.name}
        </Link>
        <span>›</span>
        <span className={`font-bold ${style.text}`}>{subModule.icon} {subModule.name}</span>
      </div>

      {/* Sub-module header */}
      <div className={`card border-2 ${style.border} ${style.light}`}>
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
            progress === 100 ? style.light : 'bg-dark-surface'
          } border ${style.border}`}>
            {progress === 100 ? '✅' : subModule.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.badge}`}>
                Bo'limcha {subModule.id}
              </span>
              <span className="text-xs text-gray-400">
                {phase.emoji} {phase.name}
              </span>
            </div>
            <h1 className={`text-xl font-black mt-1 ${style.text}`}>{subModule.name}</h1>
            <p className="text-gray-400 text-sm mt-0.5">{subModule.description}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className={`text-4xl font-black ${style.text}`}>{progress}%</p>
            <p className="text-gray-400 text-xs">⚡{earnedXP}/{totalXP} XP</p>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar value={progress} color={style.color} height="h-2.5" showLabel />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-green-500/10 rounded-xl px-3 py-2 text-center border border-green-500/30">
            <p className="text-xl font-bold text-green-400">{doneTasks}</p>
            <p className="text-xs text-green-300">✓ Bajarildi</p>
          </div>
          <div className="bg-blue-500/10 rounded-xl px-3 py-2 text-center border border-blue-500/30">
            <p className="text-xl font-bold text-blue-400">{inProgressTasks}</p>
            <p className="text-xs text-blue-300">▶ Jarayonda</p>
          </div>
          <div className="bg-dark-surface rounded-xl px-3 py-2 text-center border border-dark-border">
            <p className="text-xl font-bold text-gray-300">{pendingTasks}</p>
            <p className="text-xs text-gray-500">○ Qoldi</p>
          </div>
        </div>

        {progress === 100 && (
          <div className="mt-3 flex items-center gap-2 text-green-300 bg-green-500/10 rounded-xl px-4 py-2.5 border border-green-500/30">
            <span>🎉</span>
            <span className="font-bold">Bo&apos;limcha to&apos;liq bajarildi!</span>
          </div>
        )}
      </div>

      {/* Quick complete all */}
      {pendingTasks > 0 && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => tasks.filter((t) => t.status === 'pending').forEach((t) => completeTask(t.id))}
            className="text-sm text-gray-400 hover:text-green-400 border border-dark-border hover:border-green-500/40 px-3 py-1.5 rounded-lg transition-colors"
          >
            ✓ Hammasini bajarildi deb belgilash
          </button>
          <button
            type="button"
            onClick={() => tasks.filter((t) => t.status === 'done').forEach((t) => uncompleteTask(t.id))}
            className="text-sm text-gray-400 hover:text-red-400 border border-dark-border hover:border-red-500/40 px-3 py-1.5 rounded-lg transition-colors"
          >
            ↺ Hammasini qayta ochish
          </button>
        </div>
      )}

      {/* Tasks header + Add button */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white">Ishlar ro&apos;yxati</h2>
        <button
          onClick={() => setShowAddForm((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
            showAddForm
              ? 'bg-dark-border text-gray-400'
              : 'bg-gold text-dark-bg hover:bg-gold-light'
          }`}
        >
          {showAddForm ? '✕ Bekor' : '+ Ish qo\'shish'}
        </button>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="card border-2 border-gold/30 bg-dark-card space-y-3">
          <p className="text-xs font-bold text-gold uppercase tracking-wide">Yangi ish qo&apos;shish</p>

          <input
            type="text"
            placeholder="Ish nomi *"
            value={newTask.title}
            onChange={(e) => setNewTask((t) => ({ ...t, title: e.target.value }))}
            className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/50"
          />

          <textarea
            placeholder="Tavsif — qanday bajarish kerak (ixtiyoriy)"
            value={newTask.description}
            onChange={(e) => setNewTask((t) => ({ ...t, description: e.target.value }))}
            rows={3}
            className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 resize-none"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Mas&apos;ul</label>
              <select
                value={newTask.assignee}
                onChange={(e) => setNewTask((t) => ({ ...t, assignee: e.target.value as Assignee }))}
                className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50"
              >
                <option value="mentor">Mentor</option>
                <option value="targetolog">Targetolog</option>
                <option value="sotuvchi1">Sotuvchi 1</option>
                <option value="sotuvchi2">Sotuvchi 2</option>
                <option value="assistent">Assistent</option>
                <option value="jamoa">Jamoa</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Kun (T-30 dan T+7)</label>
              <input
                type="number"
                min={-30}
                max={7}
                value={newTask.day}
                onChange={(e) => setNewTask((t) => ({ ...t, day: parseInt(e.target.value) || -30 }))}
                className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Kategoriya</label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask((t) => ({ ...t, category: e.target.value as typeof newTask.category }))}
                className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50"
              >
                <option value="bozor">🔍 Bozor</option>
                <option value="kontent">🎬 Kontent</option>
                <option value="trafik">📈 Trafik</option>
                <option value="logistika">📦 Logistika</option>
                <option value="sotuv">💰 Sotuv</option>
                <option value="dojim">📞 Dojim</option>
                <option value="hamkor">🤝 Hamkor</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">XP mukofot</label>
              <input
                type="number"
                min={10}
                max={200}
                step={10}
                value={newTask.xpReward}
                onChange={(e) => setNewTask((t) => ({ ...t, xpReward: parseInt(e.target.value) || 30 }))}
                className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50"
              />
            </div>
          </div>

          <button
            disabled={!newTask.title.trim()}
            onClick={() => {
              if (!newTask.title.trim() || !phase || !subModule) return;
              addTask({
                phaseId,
                subModuleId: subModule.id,
                title: newTask.title.trim(),
                description: newTask.description.trim(),
                assignee: newTask.assignee,
                day: newTask.day,
                category: newTask.category,
                xpReward: newTask.xpReward,
              });
              setNewTask({ title: '', description: '', assignee: 'mentor', day: -30, category: 'bozor', xpReward: 30 });
              setShowAddForm(false);
            }}
            className="w-full btn-gold py-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + Ish qo&apos;shish
          </button>
        </div>
      )}

      {/* Tasks grouped by day */}
      <div className="space-y-5">
        {tasksByDay.length === 0 ? (
          <div className="card text-center py-10 text-gray-400">
            <p className="text-4xl mb-2">{subModule.icon}</p>
            <p>Bu bo&apos;limchada ishlar mavjud emas</p>
            <p className="text-xs mt-1">Yuqoridagi "+ Ish qo&apos;shish" tugmasini bosing</p>
          </div>
        ) : (
          tasksByDay.map(([day, dayTasks]) => {
            const dayDone = dayTasks.filter((t) => t.status === 'done').length;
            return (
              <div key={day}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${style.light} ${style.text} border ${style.border}`}>
                    T{day >= 0 ? '+' : ''}{day}
                  </div>
                  <div className="flex-1 h-px bg-dark-border" />
                  <span className="text-xs text-gray-500">{dayDone}/{dayTasks.length}</span>
                </div>

                <div className="space-y-2">
                  {dayTasks
                    .sort((a, b) => {
                      if (a.status === 'done' && b.status !== 'done') return 1;
                      if (a.status !== 'done' && b.status === 'done') return -1;
                      return 0;
                    })
                    .map((task) => (
                      <div key={task.id} className="group relative">
                        <TaskItem task={task} />
                        {task.id.startsWith('custom-') && (
                          <button
                            onClick={() => deleteTask(task.id)}
                            title="Ishni o'chirish"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-all text-xs px-1.5 py-0.5 rounded bg-dark-surface border border-dark-border"
                          >
                            🗑
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-dark-border">
        {prevSub ? (
          <Link
            to={`/phase/${phaseId}/sub/${prevSub.id}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors"
          >
            <span>←</span>
            <span>{prevSub.icon} {prevSub.name}</span>
          </Link>
        ) : (
          <Link
            to={`/phase/${phaseId}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors"
          >
            <span>←</span>
            <span>{phase.emoji} {phase.name} ga qaytish</span>
          </Link>
        )}

        {nextSub ? (
          <Link
            to={`/phase/${phaseId}/sub/${nextSub.id}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors"
          >
            <span>{nextSub.icon} {nextSub.name}</span>
            <span>→</span>
          </Link>
        ) : (
          <Link
            to={`/phase/${Math.min(5, phaseId + 1)}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors"
          >
            <span>Keyingi Bo&apos;lim →</span>
          </Link>
        )}
      </div>
    </div>
  );
}
