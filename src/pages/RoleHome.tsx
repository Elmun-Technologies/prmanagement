import { useState } from 'react';
import type { Task } from '../data/types';
import { useAuthStore, USER_ROLES } from '../store/authStore';
import { useLaunchStore } from '../store/launchStore';
import TaskItem from '../components/TaskItem';
import { TASK_RESOURCES } from '../data/taskResources';

type DayFilter = 'all' | 'today' | 'upcoming' | 'done';

const DAY_LABEL = (day: number): string => {
  if (day === 0) return 'Seminar kuni (T0)';
  if (day < 0) return `Semingacha ${Math.abs(day)} kun (T${day})`;
  return `Seminardan ${day} kun keyin (T+${day})`;
};

export default function RoleHome() {
  const { getCurrentRole, logout } = useAuthStore();
  const { tasks, currentDay, taskResultLinks } = useLaunchStore();

  const role = getCurrentRole();
  if (!role) return null;

  const [filter, setFilter] = useState<DayFilter>('today');
  const [showDone, setShowDone] = useState(false);

  // Filter tasks by this user's role
  // jamoa tasks are visible to everyone with restricted access
  const myTasks = tasks.filter(
    (t) => t.assignee === role.id || (role.id !== 'jamoa' && t.assignee === 'jamoa')
  );

  // Further filter by day/status
  const filteredTasks = myTasks.filter((t) => {
    if (filter === 'today') return t.day === currentDay;
    if (filter === 'upcoming') return t.day > currentDay && t.status !== 'done';
    if (filter === 'done') return t.status === 'done';
    return true;
  });

  const doneTasks = myTasks.filter((t) => t.status === 'done');
  const pendingTasks = myTasks.filter((t) => t.status !== 'done');
  const todayTasks = myTasks.filter((t) => t.day === currentDay);
  const completedToday = todayTasks.filter((t) => t.status === 'done').length;

  const progressPct = myTasks.length > 0 ? Math.round((doneTasks.length / myTasks.length) * 100) : 0;

  // Tasks with attached resources that haven't been submitted
  const pendingResources = pendingTasks.filter(
    (t) => (TASK_RESOURCES[t.id]?.length || 0) > 0 && !taskResultLinks[t.id]
  );

  // Group tasks by day for "all" view
  const tasksByDay = filteredTasks.reduce<Record<number, Task[]>>((acc, t) => {
    (acc[t.day] = acc[t.day] || []).push(t);
    return acc;
  }, {});
  const sortedDays = Object.keys(tasksByDay)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="bg-dark-card border-b border-dark-border px-4 py-4 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{role.emoji}</span>
            <div>
              <p className="font-bold text-white leading-tight">{role.name}</p>
              <p className="text-xs text-gray-500">{role.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-500">Umumiy progress</p>
              <p className="text-sm font-bold text-gold">{progressPct}%</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="text-xs text-gray-500 hover:text-red-400 border border-dark-border hover:border-red-400/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              Chiqish
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-dark-card border border-dark-border rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{myTasks.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Jami task</p>
          </div>
          <div className="bg-dark-card border border-green-500/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-400">{doneTasks.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Bajarildi</p>
          </div>
          <div className="bg-dark-card border border-amber-500/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-amber-400">{pendingTasks.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Kutmoqda</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Umumiy progress</span>
            <span className="text-sm font-bold text-gold">{progressPct}%</span>
          </div>
          <div className="h-2.5 bg-dark-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1.5">{doneTasks.length} / {myTasks.length} task bajarildi</p>
        </div>

        {/* Pending resources alert */}
        {pendingResources.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">📎</span>
              <div>
                <p className="font-semibold text-amber-300 text-sm">
                  {pendingResources.length} ta taskda to'ldirilmagan jadval bor
                </p>
                <p className="text-xs text-amber-400/70 mt-0.5">
                  Quyidagi tasklarni oching, shablonni yuklab to'ldiring va natija havolasini yuboring
                </p>
                <div className="mt-2 space-y-1">
                  {pendingResources.slice(0, 3).map((t) => (
                    <p key={t.id} className="text-xs text-amber-300">
                      · {t.title}
                    </p>
                  ))}
                  {pendingResources.length > 3 && (
                    <p className="text-xs text-amber-400/60">...va yana {pendingResources.length - 3} ta</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Today's summary */}
        {todayTasks.length > 0 && filter !== 'today' && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-sm font-semibold text-blue-300">
              📅 Bugungi tasklar: {completedToday}/{todayTasks.length} bajarildi
            </p>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {([
            { key: 'today',    label: `Bugun (${todayTasks.length})`,     emoji: '📅' },
            { key: 'upcoming', label: `Kelgusi (${pendingTasks.length})`, emoji: '⏰' },
            { key: 'all',      label: 'Hammasi',                          emoji: '📋' },
            { key: 'done',     label: `Bajarildi (${doneTasks.length})`,  emoji: '✅' },
          ] as { key: DayFilter; label: string; emoji: string }[]).map(({ key, label, emoji }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                filter === key
                  ? 'bg-gold/20 border-gold/50 text-gold'
                  : 'bg-dark-card border-dark-border text-gray-400 hover:border-dark-hover'
              }`}
            >
              <span>{emoji}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Task list */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">
              {filter === 'today' ? '🎉' : filter === 'done' ? '📭' : '✨'}
            </div>
            <p className="text-gray-400 font-medium">
              {filter === 'today' && 'Bugun sizga task yo\'q — dam oling!'}
              {filter === 'done' && 'Hali bajarilgan task yo\'q'}
              {filter === 'upcoming' && 'Kelgusi tasklar yo\'q'}
              {filter === 'all' && 'Tasklar topilmadi'}
            </p>
          </div>
        ) : filter === 'all' ? (
          /* Grouped by day */
          <div className="space-y-5">
            {sortedDays.map((day) => (
              <div key={day}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px flex-1 bg-dark-border" />
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                    day === currentDay
                      ? 'bg-gold/20 text-gold border-gold/40'
                      : day < currentDay
                      ? 'bg-gray-500/10 text-gray-500 border-dark-border'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  }`}>
                    {day === currentDay ? '📅 Bugun · ' : ''}{DAY_LABEL(day)}
                  </span>
                  <div className="h-px flex-1 bg-dark-border" />
                </div>
                <div className="space-y-2">
                  {tasksByDay[day]
                    .filter((t) => showDone || t.status !== 'done')
                    .map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setShowDone(!showDone)}
              className="w-full text-xs text-gray-600 hover:text-gray-400 py-2 transition-colors"
            >
              {showDone ? '▲ Bajarilganlarni yashirish' : '▼ Bajarilganlarni ko\'rsatish'}
            </button>
          </div>
        ) : (
          /* Simple flat list */
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} showDay={filter !== 'today'} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
