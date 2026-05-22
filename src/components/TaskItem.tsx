import { useState } from 'react';
import type { Task, Assignee } from '../data/types';
import { useLaunchStore } from '../store/launchStore';

const ASSIGNEE_COLORS: Record<Assignee, string> = {
  mentor:     'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  targetolog: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  sotuvchi1:  'bg-green-500/20 text-green-300 border border-green-500/30',
  sotuvchi2:  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  assistent:  'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  jamoa:      'bg-gray-500/20 text-gray-300 border border-gray-500/30',
};

const ASSIGNEE_NAMES: Record<Assignee, string> = {
  mentor: 'Mentor',
  targetolog: 'Targetolog',
  sotuvchi1: 'Sotuvchi 1',
  sotuvchi2: 'Sotuvchi 2',
  assistent: 'Assistent',
  jamoa: 'Jamoa',
};

const CATEGORY_ICONS: Record<string, string> = {
  bozor: '🔍',
  kontent: '🎬',
  trafik: '📈',
  logistika: '📦',
  sotuv: '💰',
  dojim: '📞',
  hamkor: '🤝',
};

interface TaskItemProps {
  task: Task;
  showDay?: boolean;
}

export default function TaskItem({ task, showDay }: TaskItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { completeTask, uncompleteTask, setTaskInProgress } = useLaunchStore();

  const isDone = task.status === 'done';
  const isInProgress = task.status === 'inprogress';

  return (
    <div
      className={`border rounded-xl transition-all duration-200 ${
        isDone
          ? 'border-green-500/30 bg-green-500/5'
          : isInProgress
          ? 'border-blue-500/30 bg-blue-500/5'
          : 'border-dark-border bg-dark-card hover:border-dark-hover'
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Checkbox */}
        <button
          type="button"
          onClick={() => (isDone ? uncompleteTask(task.id) : completeTask(task.id))}
          className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            isDone
              ? 'border-green-500 bg-green-500'
              : isInProgress
              ? 'border-blue-400 bg-blue-500/20'
              : 'border-gray-600 hover:border-gold'
          }`}
        >
          {isDone && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {isInProgress && <div className="w-2 h-2 rounded-full bg-blue-400" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-left flex-1"
            >
              <span className={`font-medium text-sm leading-snug ${
                isDone ? 'line-through text-gray-500' : 'text-gray-100'
              }`}>
                {CATEGORY_ICONS[task.category]} {task.title}
              </span>
            </button>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ASSIGNEE_COLORS[task.assignee]}`}>
                {ASSIGNEE_NAMES[task.assignee]}
              </span>
              <span className="text-xs bg-gold/20 text-gold border border-gold/30 px-2 py-0.5 rounded-full font-bold">
                ⚡{task.xpReward}
              </span>
            </div>
          </div>

          {showDay && (
            <p className="text-xs text-gray-500 mt-0.5">
              T{task.day >= 0 ? '+' : ''}{task.day}
            </p>
          )}

          {expanded && (
            <div className="mt-3 text-sm text-gray-300 leading-relaxed bg-dark-surface rounded-xl p-4 space-y-1 border border-dark-border">
              {task.description.split('\n').map((line, i) => {
                if (!line.trim()) return <div key={i} className="h-1" />;
                if (line.startsWith('## '))
                  return (
                    <p key={i} className="font-bold text-gold mt-3 mb-1 text-xs uppercase tracking-widest">
                      {line.replace('##', '').trim()}
                    </p>
                  );
                if (line.startsWith('### '))
                  return (
                    <p key={i} className="font-semibold text-white mt-2 text-sm">
                      {line.replace('###', '').trim()}
                    </p>
                  );
                if (line.startsWith('☐') || line.startsWith('✅') || line.startsWith('→'))
                  return (
                    <p key={i} className="flex gap-2 text-gray-300 text-sm">
                      <span className="flex-shrink-0 text-gold">{line[0]}</span>
                      <span>{line.slice(1).trim()}</span>
                    </p>
                  );
                if (/^\d+\./.test(line))
                  return (
                    <p key={i} className="flex gap-2 ml-1 text-sm">
                      <span className="font-bold text-gold flex-shrink-0">{line.match(/^\d+/)![0]}.</span>
                      <span>{line.replace(/^\d+\.\s*/, '')}</span>
                    </p>
                  );
                if (line.startsWith('|'))
                  return (
                    <p key={i} className="font-mono text-xs bg-dark-bg border border-dark-border rounded px-2 py-1 text-gray-400 overflow-x-auto">
                      {line}
                    </p>
                  );
                if (line.startsWith('**') && line.endsWith('**'))
                  return (
                    <p key={i} className="font-bold text-white text-sm">
                      {line.replace(/\*\*/g, '')}
                    </p>
                  );
                return <p key={i} className="text-gray-300 text-sm">{line}</p>;
              })}

              {!isDone && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-dark-border">
                  {isInProgress ? (
                    <button
                      type="button"
                      onClick={() => completeTask(task.id)}
                      className="btn-gold text-xs py-1.5"
                    >
                      ✓ Bajarildi
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setTaskInProgress(task.id)}
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    >
                      ▶ Boshlash
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => completeTask(task.id)}
                    className="text-gray-500 hover:text-green-400 text-xs px-2 py-1.5 transition-colors"
                  >
                    ✓ Bajarildi deb belgilash
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
