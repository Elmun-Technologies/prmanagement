import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLaunchStore } from '../store/launchStore';
import type { Task } from '../data/types';

const ASSIGNEE_COLORS: Record<string, string> = {
  mentor:     'bg-gold/80',
  targetolog: 'bg-purple-500',
  sotuvchi1:  'bg-green-500',
  sotuvchi2:  'bg-emerald-500',
  assistent:  'bg-blue-500',
  dizayner:   'bg-pink-500',
  videograf:  'bg-red-500',
  jamoa:      'bg-gray-500',
};

function dayLabel(day: number): string {
  if (day === 0) return 'T0 — Seminar kuni';
  if (day < 0) return `T${day} — Seminargacha ${Math.abs(day)} kun`;
  return `T+${day} — Seminardan ${day} kun keyin`;
}

function DayColumn({ day, tasks, isToday, onClick }: {
  day: number;
  tasks: Task[];
  isToday: boolean;
  onClick: (day: number) => void;
}) {
  const done = tasks.filter((t) => t.status === 'done').length;
  const pct = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <button
      type="button"
      onClick={() => onClick(day)}
      className={`flex-shrink-0 w-20 border rounded-xl p-2 text-center transition-all hover:scale-[1.02] ${
        isToday
          ? 'border-gold bg-gold/10'
          : day === 0
          ? 'border-red-500/50 bg-red-500/5'
          : 'border-dark-border bg-dark-card hover:border-dark-hover'
      }`}
    >
      <p className={`text-xs font-bold ${isToday ? 'text-gold' : day === 0 ? 'text-red-400' : 'text-gray-400'}`}>
        {day === 0 ? 'T0' : day > 0 ? `T+${day}` : `T${day}`}
      </p>
      <div className="mt-1.5 space-y-0.5 min-h-[60px]">
        {tasks.slice(0, 4).map((t) => (
          <div
            key={t.id}
            className={`h-1.5 rounded-full ${
              t.status === 'done' ? 'bg-green-500' : ASSIGNEE_COLORS[t.assignee] || 'bg-gray-500'
            }`}
            title={t.title}
          />
        ))}
        {tasks.length > 4 && (
          <p className="text-[9px] text-gray-600">+{tasks.length - 4}</p>
        )}
      </div>
      <div className="mt-1.5">
        <div className="h-1 bg-dark-hover rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-[9px] text-gray-600 mt-0.5">{done}/{tasks.length}</p>
      </div>
      {isToday && <div className="w-1.5 h-1.5 bg-gold rounded-full mx-auto mt-1" />}
    </button>
  );
}

export default function CalendarView() {
  const navigate = useNavigate();
  const { tasks, currentDay, setCurrentDay } = useLaunchStore();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [filterAssignee, setFilterAssignee] = useState<string>('all');

  // Days from -30 to +21
  const allDays = Array.from({ length: 52 }, (_, i) => i - 30);
  const daysWithTasks = allDays.filter((d) => tasks.some((t) => t.day === d));

  // Phases as ranges for color coding
  const dayRanges = [
    { label: 'Bozor & Infra', from: -30, to: -21, color: 'bg-blue-500/10 border-blue-500/20' },
    { label: 'Marketing',     from: -20, to: -11, color: 'bg-purple-500/10 border-purple-500/20' },
    { label: 'Progrev',       from: -10, to: -1,  color: 'bg-orange-500/10 border-orange-500/20' },
    { label: 'Seminar',       from:   0, to:   1,  color: 'bg-red-500/10 border-red-500/20' },
    { label: 'Asosiy Kurs',   from:   1, to:  28,  color: 'bg-green-500/10 border-green-500/20' },
  ];

  function getDayRange(day: number) {
    return dayRanges.find((r) => day >= r.from && day <= r.to);
  }

  const selectedTasks = selectedDay !== null
    ? tasks.filter((t) => t.day === selectedDay && (filterAssignee === 'all' || t.assignee === filterAssignee))
    : [];

  const assignees = [...new Set(tasks.map((t) => t.assignee))];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Kalendar Ko'rinish 📅</h1>
          <p className="text-gray-400 text-sm mt-1">T-30 dan T+21 gacha barcha tasklar sana bo'yicha</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSelectedDay(currentDay)}
            className="text-xs btn-gold py-1.5 px-3"
          >
            📅 Bugun (T{currentDay >= 0 ? '+' : ''}{currentDay})
          </button>
        </div>
      </div>

      {/* Phase ranges legend */}
      <div className="flex flex-wrap gap-2">
        {dayRanges.map((r) => (
          <div key={r.label} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs text-gray-400 ${r.color}`}>
            <span className="font-medium">{r.label}</span>
            <span className="text-gray-600">T{r.from >= 0 ? '+' : ''}{r.from} → T{r.to >= 0 ? '+' : ''}{r.to}</span>
          </div>
        ))}
      </div>

      {/* Scrollable calendar */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {daysWithTasks.map((day) => {
            const dayTasks = tasks.filter((t) => t.day === day);
            const range = getDayRange(day);
            return (
              <div key={day} className={`rounded-xl p-1 border ${range?.color || 'border-transparent'}`}>
                <DayColumn
                  day={day}
                  tasks={dayTasks}
                  isToday={day === currentDay}
                  onClick={setSelectedDay}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected day panel */}
      {selectedDay !== null && (
        <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
            <div>
              <h2 className="font-bold text-white">{dayLabel(selectedDay)}</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {tasks.filter((t) => t.day === selectedDay).length} ta task
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentDay(selectedDay)}
                className="text-xs text-gold border border-gold/30 px-3 py-1 rounded-lg hover:bg-gold/10 transition-colors"
              >
                Bu kuni belgilash
              </button>
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                className="text-gray-500 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* Filter */}
          <div className="px-5 py-2 border-b border-dark-border flex gap-2 overflow-x-auto">
            {['all', ...assignees].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setFilterAssignee(a)}
                className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  filterAssignee === a ? 'bg-gold/20 border-gold/50 text-gold' : 'border-dark-border text-gray-500 hover:border-dark-hover'
                }`}
              >
                {a === 'all' ? 'Hammasi' : a}
              </button>
            ))}
          </div>

          <div className="divide-y divide-dark-border">
            {selectedTasks.length === 0 ? (
              <div className="p-6 text-center text-gray-600 text-sm">Bu kun uchun task topilmadi</div>
            ) : (
              selectedTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => navigate(`/phase/${task.phaseId}/sub/${task.subModuleId}`)}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-dark-surface transition-colors text-left"
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ASSIGNEE_COLORS[task.assignee] || 'bg-gray-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-600">{task.assignee} · {task.category}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      task.status === 'done' ? 'bg-green-500/20 text-green-400' :
                      task.status === 'inprogress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-dark-hover text-gray-500'
                    }`}>
                      {task.status === 'done' ? '✓ Done' : task.status === 'inprogress' ? '▶ Jarayonda' : '○ Kutmoqda'}
                    </span>
                    <span className="text-xs text-gold font-bold">⚡{task.xpReward}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Assignee legend */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-4">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Rang kodlash — Kim</p>
        <div className="flex flex-wrap gap-3">
          {assignees.map((a) => (
            <div key={a} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${ASSIGNEE_COLORS[a] || 'bg-gray-500'}`} />
              <span className="text-xs text-gray-400">{a}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-400">Bajarildi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
