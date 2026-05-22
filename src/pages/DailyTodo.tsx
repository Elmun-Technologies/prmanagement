import { useState, useMemo } from 'react';
import { useLaunchStore } from '../store/launchStore';
import TaskItem from '../components/TaskItem';
import ProgressBar from '../components/ProgressBar';
import type { Assignee } from '../data/types';

const ASSIGNEE_OPTIONS: { id: Assignee | 'all'; label: string; emoji: string }[] = [
  { id: 'all', label: 'Hammasi', emoji: '👥' },
  { id: 'mentor', label: 'Mentor', emoji: '🎤' },
  { id: 'targetolog', label: 'Targetolog', emoji: '📈' },
  { id: 'sotuvchi1', label: 'Sotuvchi 1', emoji: '💼' },
  { id: 'sotuvchi2', label: 'Sotuvchi 2', emoji: '💼' },
  { id: 'assistent', label: 'Assistent', emoji: '📋' },
  { id: 'jamoa', label: 'Jamoa', emoji: '🤝' },
];

const DAY_RANGE = Array.from({ length: 52 }, (_, i) => i - 30);

export default function DailyTodo() {
  const { currentDay, setCurrentDay, getTasksByDay, tasks } = useLaunchStore();
  const [filterAssignee, setFilterAssignee] = useState<Assignee | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'done'>('all');

  const dayTasks = getTasksByDay(currentDay);

  const filteredTasks = useMemo(() => {
    return dayTasks.filter((t) => {
      if (filterAssignee !== 'all' && t.assignee !== filterAssignee) return false;
      if (filterStatus === 'pending' && t.status === 'done') return false;
      if (filterStatus === 'done' && t.status !== 'done') return false;
      return true;
    });
  }, [dayTasks, filterAssignee, filterStatus]);

  const done = dayTasks.filter((t) => t.status === 'done').length;
  const totalXPToday = dayTasks.reduce((sum, t) => sum + t.xpReward, 0);
  const earnedXPToday = dayTasks.filter((t) => t.status === 'done').reduce((sum, t) => sum + t.xpReward, 0);
  const progress = dayTasks.length > 0 ? Math.round((done / dayTasks.length) * 100) : 0;

  const phaseForDay = useMemo(() => {
    if (currentDay <= -21) return { name: 'Poydevor', emoji: '🏗️', color: 'text-blue-400' };
    if (currentDay <= -11) return { name: 'Mashina', emoji: '⚙️', color: 'text-purple-400' };
    if (currentDay <= -1)  return { name: 'Isitish', emoji: '🔥', color: 'text-amber-400' };
    if (currentDay === 0)  return { name: 'Seminar Kuni', emoji: '🎯', color: 'text-green-400' };
    return { name: 'Asosiy Kurs', emoji: '🚀', color: 'text-indigo-400' };
  }, [currentDay]);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Kunlik Tasklar</h1>
          <p className={`text-sm mt-1 font-medium ${phaseForDay.color}`}>
            {phaseForDay.emoji} {phaseForDay.name}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {currentDay === 0
              ? '📅 Bugun — seminar kuni'
              : currentDay < 0
              ? `📅 Seminargacha ${Math.abs(currentDay)} kun qoldi`
              : `📅 Seminardan keyin ${currentDay}-kun`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gold font-black text-2xl">⚡{earnedXPToday}</p>
          <p className="text-xs text-gray-500">/ {totalXPToday} XP</p>
        </div>
      </div>

      {/* Day navigator */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Kun tanlash</p>
          <p className="text-xs text-gray-600">
            <span className="text-amber-400 font-bold">T0</span> = seminar kuni ·
            <span className="text-red-400 font-bold"> T-N</span> = oldin ·
            <span className="text-green-400 font-bold"> T+N</span> = keyin
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {DAY_RANGE.map((day) => {
            const dayTs = tasks.filter((t) => t.day === day);
            const hasTasks = dayTs.length > 0;
            const allDone = hasTasks && dayTs.every((t) => t.status === 'done');
            const isToday = day === currentDay;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setCurrentDay(day)}
                disabled={!hasTasks}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  isToday
                    ? 'bg-gold text-dark-bg font-bold'
                    : allDone
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                    : hasTasks
                    ? 'bg-dark-surface text-gray-300 border border-dark-border hover:border-gold/40 hover:text-gold'
                    : 'bg-dark-bg text-gray-600 cursor-not-allowed'
                }`}
              >
                T{day >= 0 ? '+' : ''}{day}
                {allDone && <span className="ml-0.5 text-green-400">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card text-center py-3">
          <p className="text-2xl font-bold text-white">{done}<span className="text-gray-500 text-lg">/{dayTasks.length}</span></p>
          <p className="text-xs text-gray-500 mt-0.5">Bajarildi</p>
          <ProgressBar value={done} max={dayTasks.length || 1} color="bg-green-500" height="h-1" className="mt-2" />
        </div>
        <div className="card text-center py-3">
          <p className="text-2xl font-bold text-gold">⚡{earnedXPToday}</p>
          <p className="text-xs text-gray-500 mt-0.5">/ {totalXPToday} XP</p>
          <ProgressBar value={earnedXPToday} max={totalXPToday || 1} color="bg-gold" height="h-1" className="mt-2" />
        </div>
        <div className="card text-center py-3">
          <p className="text-2xl font-bold text-blue-400">{progress}%</p>
          <p className="text-xs text-gray-500 mt-0.5">Progress</p>
          <ProgressBar value={progress} max={100} color="bg-blue-500" height="h-1" className="mt-2" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-1 flex-wrap">
          {ASSIGNEE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFilterAssignee(opt.id as Assignee | 'all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterAssignee === opt.id
                  ? 'bg-gold/20 text-gold border border-gold/40'
                  : 'bg-dark-surface text-gray-400 border border-dark-border hover:border-gold/30 hover:text-gray-200'
              }`}
            >
              {opt.emoji} {opt.label}
            </button>
          ))}
        </div>

        <div className="w-px bg-dark-border mx-1" />

        {(['all', 'pending', 'done'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterStatus === s
                ? 'bg-dark-hover text-white border border-dark-border'
                : 'bg-dark-surface text-gray-400 border border-dark-border hover:text-gray-200'
            }`}
          >
            {s === 'all' ? 'Barchasi' : s === 'done' ? '✓ Bajarilgan' : '○ Qolgan'}
          </button>
        ))}
      </div>

      {/* Task list */}
      {dayTasks.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">
          <p className="text-5xl mb-3">📅</p>
          <p className="font-medium text-gray-300">Bu kun uchun task yo&apos;q</p>
          <p className="text-sm mt-1">Boshqa kunni tanlang</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="card text-center py-8 text-gray-500">
          <p className="text-3xl mb-2">🔍</p>
          <p className="font-medium">Filter bo&apos;yicha task topilmadi</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
