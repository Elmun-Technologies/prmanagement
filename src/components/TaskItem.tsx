import { useState } from 'react';
import type { Task, Assignee, TaskResource } from '../data/types';
import { useLaunchStore } from '../store/launchStore';
import { TASK_RESOURCES, getResourceIcon, getResourceColor, getResourceTypeName } from '../data/taskResources';

const ASSIGNEE_COLORS: Record<Assignee, string> = {
  mentor:     'bg-gold/20 text-gold border border-gold/30',
  targetolog: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  sotuvchi1:  'bg-green-500/20 text-green-300 border border-green-500/30',
  sotuvchi2:  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  assistent:  'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  dizayner:   'bg-pink-500/20 text-pink-300 border border-pink-500/30',
  videograf:  'bg-red-500/20 text-red-300 border border-red-500/30',
  jamoa:      'bg-gray-500/20 text-gray-300 border border-gray-500/30',
};

const ASSIGNEE_NAMES: Record<Assignee, string> = {
  mentor:     'Producer',
  targetolog: 'Targetolog',
  sotuvchi1:  'Sotuvchi 1',
  sotuvchi2:  'Sotuvchi 2',
  assistent:  'Yordamchi',
  dizayner:   'Dizayner',
  videograf:  'Videograf',
  jamoa:      'Jamoa',
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

// Resource panel shown inside expanded task
function ResourcePanel({ taskId }: { taskId: string }) {
  const { taskResourceLinks, taskResultLinks, addTaskResource, removeTaskResource, setTaskResultLink, clearTaskResultLink } =
    useLaunchStore();

  const predefined = TASK_RESOURCES[taskId] || [];
  const custom = taskResourceLinks[taskId] || [];
  const allResources: TaskResource[] = [...predefined, ...custom];

  const resultLink = taskResultLinks[taskId] || '';

  const [showAddForm, setShowAddForm] = useState(false);
  const [editResult, setEditResult] = useState(false);
  const [resultInput, setResultInput] = useState(resultLink);
  const [newRes, setNewRes] = useState<{ type: string; label: string; url: string; hint: string }>({
    type: 'sheets',
    label: '',
    url: '',
    hint: '',
  });

  function handleSaveResultLink() {
    const trimmed = resultInput.trim();
    if (trimmed) {
      setTaskResultLink(taskId, trimmed);
    } else {
      clearTaskResultLink(taskId);
    }
    setEditResult(false);
  }

  function handleAddResource() {
    if (!newRes.label.trim() || !newRes.url.trim()) return;
    addTaskResource(taskId, {
      type: newRes.type as TaskResource['type'],
      label: newRes.label.trim(),
      url: newRes.url.trim(),
      hint: newRes.hint.trim(),
      required: false,
    });
    setNewRes({ type: 'sheets', label: '', url: '', hint: '' });
    setShowAddForm(false);
  }

  if (allResources.length === 0 && !showAddForm) {
    return (
      <div className="mt-3 rounded-xl border border-dashed border-dark-border p-3 flex items-center justify-between">
        <span className="text-xs text-gray-500">Hujjat/Jadval biriktirilmagan</span>
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="text-xs text-gold hover:text-gold/80 font-medium transition-colors"
        >
          + Havola qo'shish
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      {/* Resource list */}
      {allResources.length > 0 && (
        <div className="rounded-xl border border-dark-border bg-dark-surface overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-dark-border">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              📎 Kerakli Hujjatlar ({allResources.length})
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs text-gold hover:text-gold/80 font-medium transition-colors"
            >
              + Qo'shish
            </button>
          </div>

          <div className="divide-y divide-dark-border">
            {allResources.map((res, idx) => {
              const colors = getResourceColor(res.type);
              const isPredefined = idx < predefined.length;
              const isPlaceholder = res.url.includes('/create') || res.url === '#';
              return (
                <div key={idx} className="p-3">
                  <div className="flex items-start gap-2.5">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-base ${colors.bg} ${colors.border} border`}>
                      {getResourceIcon(res.type)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                          {getResourceTypeName(res.type)}
                        </span>
                        {res.required && (
                          <span className="text-xs text-red-400 font-medium">● Majburiy</span>
                        )}
                        {isPlaceholder && (
                          <span className="text-xs text-amber-400">⚠ Havola qo'shilmagan</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-200 mt-0.5">{res.label}</p>
                      {res.hint && (
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{res.hint}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!isPlaceholder && (
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${colors.bg} ${colors.text} ${colors.border} hover:opacity-80`}
                        >
                          Ochish ↗
                        </a>
                      )}
                      {isPlaceholder && (
                        <span className="text-xs text-gray-600 px-2 py-1.5">URL kerak</span>
                      )}
                      {!isPredefined && (
                        <button
                          type="button"
                          onClick={() => removeTaskResource(taskId, idx - predefined.length)}
                          className="text-gray-600 hover:text-red-400 transition-colors text-sm px-1"
                          title="O'chirish"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add new resource form */}
      {showAddForm && (
        <div className="rounded-xl border border-gold/30 bg-gold/5 p-3 space-y-2">
          <p className="text-xs font-semibold text-gold">+ Yangi hujjat/havola qo'shish</p>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={newRes.type}
              onChange={(e) => setNewRes({ ...newRes, type: e.target.value })}
              className="col-span-2 bg-dark-surface border border-dark-border rounded-lg px-2 py-1.5 text-xs text-gray-200 outline-none focus:border-gold/50"
            >
              <option value="sheets">📊 Google Sheets</option>
              <option value="forms">📋 Google Forms</option>
              <option value="docs">📝 Google Docs</option>
              <option value="slides">🎞️ Google Slides</option>
              <option value="drive">📁 Google Drive</option>
              <option value="link">🔗 Boshqa havola</option>
            </select>
            <input
              type="text"
              placeholder="Nomi (masalan: CRM Jadvali)"
              value={newRes.label}
              onChange={(e) => setNewRes({ ...newRes, label: e.target.value })}
              className="col-span-2 bg-dark-surface border border-dark-border rounded-lg px-2 py-1.5 text-xs text-gray-200 placeholder-gray-600 outline-none focus:border-gold/50"
            />
            <input
              type="url"
              placeholder="Google Drive havola URL"
              value={newRes.url}
              onChange={(e) => setNewRes({ ...newRes, url: e.target.value })}
              className="col-span-2 bg-dark-surface border border-dark-border rounded-lg px-2 py-1.5 text-xs text-gray-200 placeholder-gray-600 outline-none focus:border-gold/50 font-mono"
            />
            <input
              type="text"
              placeholder="Izoh (ixtiyoriy)"
              value={newRes.hint}
              onChange={(e) => setNewRes({ ...newRes, hint: e.target.value })}
              className="col-span-2 bg-dark-surface border border-dark-border rounded-lg px-2 py-1.5 text-xs text-gray-200 placeholder-gray-600 outline-none focus:border-gold/50"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddResource}
              disabled={!newRes.label.trim() || !newRes.url.trim()}
              className="btn-gold text-xs py-1.5 disabled:opacity-40"
            >
              Saqlash
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1.5"
            >
              Bekor
            </button>
          </div>
        </div>
      )}

      {/* Result link section */}
      <div className="rounded-xl border border-dark-border bg-dark-surface overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-dark-border">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            📤 Bajarilgan natija havolasi
          </span>
          {resultLink && !editResult && (
            <button
              type="button"
              onClick={() => { setEditResult(true); setResultInput(resultLink); }}
              className="text-xs text-gray-500 hover:text-gold transition-colors"
            >
              Tahrirlash
            </button>
          )}
        </div>

        <div className="p-3">
          {resultLink && !editResult ? (
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-sm">✓</span>
              <a
                href={resultLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2 flex-1 truncate"
              >
                {resultLink}
              </a>
              <button
                type="button"
                onClick={() => { clearTaskResultLink(taskId); setResultInput(''); }}
                className="text-gray-600 hover:text-red-400 transition-colors text-sm px-1 flex-shrink-0"
                title="O'chirish"
              >
                ×
              </button>
            </div>
          ) : editResult || !resultLink ? (
            <div className="space-y-2">
              <p className="text-xs text-gray-500">
                Jadval/hujjatni to'ldirganingizdan so'ng, bajarilgan nusxangizning havolasini shu yerga joylashtiring.
              </p>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://docs.google.com/..."
                  value={resultInput}
                  onChange={(e) => setResultInput(e.target.value)}
                  className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-2 py-1.5 text-xs text-gray-200 placeholder-gray-600 outline-none focus:border-green-500/50 font-mono"
                />
                <button
                  type="button"
                  onClick={handleSaveResultLink}
                  disabled={!resultInput.trim()}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40"
                >
                  Yuklash ✓
                </button>
                {editResult && (
                  <button
                    type="button"
                    onClick={() => setEditResult(false)}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2"
                  >
                    Bekor
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function TaskItem({ task, showDay }: TaskItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { completeTask, uncompleteTask, setTaskInProgress, taskResultLinks } = useLaunchStore();

  const isDone = task.status === 'done';
  const isInProgress = task.status === 'inprogress';

  const predefinedResources = TASK_RESOURCES[task.id] || [];
  const customResources = useLaunchStore.getState().taskResourceLinks[task.id] || [];
  const hasResources = predefinedResources.length > 0 || customResources.length > 0;
  const hasResult = !!taskResultLinks[task.id];

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
            <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
              {/* Resource indicator */}
              {hasResources && (
                <span
                  title="Biriktirilgan hujjatlar bor"
                  className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    hasResult
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {hasResult ? '📤✓' : '📎'}
                </span>
              )}
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
            <div className="mt-3 space-y-3">
              {/* Resources panel — shown first */}
              <ResourcePanel taskId={task.id} />

              {/* Description */}
              <div className="text-sm text-gray-300 leading-relaxed bg-dark-surface rounded-xl p-4 space-y-1 border border-dark-border">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">📋 Batafsil ko'rsatmalar</p>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
