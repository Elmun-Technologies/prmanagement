import { useState, useMemo } from 'react';
import { useLaunchStore } from '../store/launchStore';
import TaskItem from '../components/TaskItem';
import ProgressBar from '../components/ProgressBar';
import type { Assignee } from '../data/types';

const ASSIGNEE_OPTIONS: { id: Assignee | 'all'; label: string; emoji: string }[] = [
  { id: 'all',        label: 'Hammasi',        emoji: '👥' },
  { id: 'mentor',     label: 'Producer',       emoji: '👑' },
  { id: 'targetolog', label: 'Traffic Mgr',    emoji: '🎯' },
  { id: 'sotuvchi1',  label: 'Sales Closer 1', emoji: '💼' },
  { id: 'sotuvchi2',  label: 'Sales Closer 2', emoji: '💼' },
  { id: 'assistent',  label: 'Ops Manager',    emoji: '🤝' },
  { id: 'jamoa',      label: 'Jamoa',          emoji: '👥' },
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
    if (currentDay <= -21) return { name: 'Tayyorgarlik', emoji: '🏗️', color: 'text-blue-400' };
    if (currentDay <= -11) return { name: 'Trafik Tizimi', emoji: '⚙️', color: 'text-purple-400' };
    if (currentDay <= -1)  return { name: 'Progrev', emoji: '🔥', color: 'text-amber-400' };
    if (currentDay === 0)  return { name: 'Seminar Kuni', emoji: '🎯', color: 'text-green-400' };
    return { name: 'Asosiy Kurs', emoji: '🚀', color: 'text-indigo-400' };
  }, [currentDay]);

  // Human-readable day label
  function dayLabel(day: number): string {
    if (day === 0) return 'Seminar kuni';
    if (day < 0)  return `${Math.abs(day)} kun oldin`;
    return `${day} kun keyin`;
  }

  // Group days into sections for cleaner display
  const daysWithTasks = DAY_RANGE.filter((d) => tasks.some((t) => t.day === d));
  const preSeminarDays = daysWithTasks.filter((d) => d < 0).reverse(); // newest first
  const seminarDay     = daysWithTasks.filter((d) => d === 0);
  const postDays       = daysWithTasks.filter((d) => d > 0);

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
              ? '📅 Bugun — seminar kuni!'
              : currentDay < 0
              ? `📅 Seminargacha ${Math.abs(currentDay)} kun qoldi`
              : `📅 Seminardan keyin ${currentDay} kun o'tdi`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gold font-black text-2xl">⚡{earnedXPToday}</p>
          <p className="text-xs text-gray-500">/ {totalXPToday} XP</p>
        </div>
      </div>

      {/* Day navigator */}
      <div className="card space-y-3">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Kun tanlash</p>

        {/* Seminargacha */}
        {preSeminarDays.length > 0 && (
          <div>
            <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1">
              🏗️ Seminargacha
            </p>
            <div className="flex flex-wrap gap-1">
              {preSeminarDays.map((day) => {
                const dayTs = tasks.filter((t) => t.day === day);
                const allDone = dayTs.every((t) => t.status === 'done');
                const isActive = day === currentDay;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setCurrentDay(day)}
                    title={dayLabel(day)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-gold text-dark-bg font-bold'
                        : allDone
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-dark-surface text-gray-300 border border-dark-border hover:border-gold/40 hover:text-gold'
                    }`}
                  >
                    {Math.abs(day)} kun oldin
                    {allDone && ' ✓'}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Seminar kuni */}
        {seminarDay.length > 0 && (
          <div>
            <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider mb-1.5">
              🎯 Seminar kuni
            </p>
            {seminarDay.map((day) => {
              const dayTs = tasks.filter((t) => t.day === day);
              const allDone = dayTs.every((t) => t.status === 'done');
              const isActive = day === currentDay;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setCurrentDay(day)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-gold text-dark-bg'
                      : allDone
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30 hover:border-red-400'
                  }`}
                >
                  🎯 Seminar kuni{allDone && ' ✓'}
                </button>
              );
            })}
          </div>
        )}

        {/* Seminardan keyin */}
        {postDays.length > 0 && (
          <div>
            <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider mb-1.5">
              🚀 Seminardan keyin
            </p>
            <div className="flex flex-wrap gap-1">
              {postDays.map((day) => {
                const dayTs = tasks.filter((t) => t.day === day);
                const allDone = dayTs.every((t) => t.status === 'done');
                const isActive = day === currentDay;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setCurrentDay(day)}
                    title={dayLabel(day)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-gold text-dark-bg font-bold'
                        : allDone
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-dark-surface text-gray-300 border border-dark-border hover:border-gold/40 hover:text-gold'
                    }`}
                  >
                    {day} kun keyin
                    {allDone && ' ✓'}
                  </button>
                );
              })}
            </div>
          </div>
        )}
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
