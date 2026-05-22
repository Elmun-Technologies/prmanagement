import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLaunchStore } from '../store/launchStore';
import { PHASES, SUB_MODULES } from '../data/phases';

interface SearchResult {
  type: 'task' | 'phase' | 'submodule';
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  url: string;
  status?: string;
}

const STATUS_COLORS: Record<string, string> = {
  done:       'text-green-400',
  inprogress: 'text-blue-400',
  pending:    'text-gray-500',
};

const STATUS_LABELS: Record<string, string> = {
  done:       '✓ Bajarildi',
  inprogress: '▶ Jarayonda',
  pending:    '○ Kutmoqda',
};

export function useGlobalSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return { open, setOpen };
}

export default function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { tasks } = useLaunchStore();
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results = useCallback((): SearchResult[] => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) {
      // Show recent/quick links when empty
      return [
        { type: 'phase', id: 'quick-daily', title: 'Bugungi ishlar', subtitle: 'Bugun bajariladigan tasklar', emoji: '📋', url: '/daily' },
        { type: 'phase', id: 'quick-bonuses', title: 'Mukofotlar Xazinasi', subtitle: 'Bonus va motivatsiya tizimi', emoji: '🎁', url: '/bonuses' },
        { type: 'phase', id: 'quick-kpi', title: 'KPI Tracker', subtitle: 'Raqamlar va maqsadlar', emoji: '📊', url: '/kpi' },
        { type: 'phase', id: 'quick-team', title: 'Jamoa', subtitle: 'A\'zolar va boshqaruv', emoji: '👥', url: '/team' },
        { type: 'phase', id: 'quick-finance', title: 'Moliya Modeli', subtitle: 'Daromad va xarajat hisob-kitobi', emoji: '💹', url: '/finance' },
        { type: 'phase', id: 'quick-launch', title: 'Zapusk kuni', subtitle: 'T0 uchun nazorat ro\'yxati', emoji: '🚀', url: '/launch-day' },
      ];
    }

    const res: SearchResult[] = [];

    // Search tasks
    tasks.forEach((task) => {
      if (
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q)
      ) {
        res.push({
          type: 'task',
          id: task.id,
          title: task.title,
          subtitle: `T${task.day >= 0 ? '+' : ''}${task.day} · Bosqich ${task.phaseId}`,
          emoji: task.status === 'done' ? '✅' : task.status === 'inprogress' ? '🔄' : '⬜',
          url: `/phase/${task.phaseId}/sub/${task.subModuleId}`,
          status: task.status,
        });
      }
    });

    // Search phases
    PHASES.forEach((phase) => {
      if (phase.name.toLowerCase().includes(q) || phase.goal.toLowerCase().includes(q)) {
        res.push({
          type: 'phase',
          id: `phase-${phase.id}`,
          title: phase.name,
          subtitle: phase.goal,
          emoji: phase.emoji,
          url: `/phase/${phase.id}`,
        });
      }
    });

    // Search submodules
    SUB_MODULES.forEach((sm) => {
      if (sm.name.toLowerCase().includes(q) || sm.description.toLowerCase().includes(q)) {
        res.push({
          type: 'submodule',
          id: `sm-${sm.id}`,
          title: sm.name,
          subtitle: sm.description,
          emoji: sm.icon,
          url: `/phase/${sm.phaseId}/sub/${sm.id}`,
        });
      }
    });

    return res.slice(0, 12);
  }, [query, tasks])();

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      navigate(results[selectedIdx].url);
      onClose();
    }
  }

  function handleSelect(result: SearchResult) {
    navigate(result.url);
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-dark-card border border-dark-border rounded-2xl shadow-2xl overflow-hidden">

        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-border">
          <span className="text-gray-500 text-lg">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Task, bosqich, submodulni qidiring..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white placeholder-gray-600 outline-none text-sm"
          />
          <div className="flex items-center gap-1.5">
            <kbd className="text-[10px] text-gray-600 bg-dark-surface border border-dark-border px-1.5 py-0.5 rounded">ESC</kbd>
          </div>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="py-8 text-center text-gray-600 text-sm">
              "{query}" bo'yicha natija topilmadi
            </div>
          ) : (
            <>
              {!query && (
                <p className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold px-4 pt-3 pb-1">
                  Tezkor havolalar
                </p>
              )}
              {query && (
                <p className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold px-4 pt-3 pb-1">
                  Natijalar ({results.length})
                </p>
              )}
              {results.map((result, idx) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => handleSelect(result)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    idx === selectedIdx ? 'bg-gold/10 border-l-2 border-gold' : 'hover:bg-dark-surface'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{result.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{result.title}</p>
                    <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>
                  </div>
                  {result.status && (
                    <span className={`text-[10px] flex-shrink-0 font-medium ${STATUS_COLORS[result.status]}`}>
                      {STATUS_LABELS[result.status]}
                    </span>
                  )}
                  <span className="text-[10px] text-gray-700 flex-shrink-0">
                    {result.type === 'task' ? 'Task' : result.type === 'phase' ? 'Bosqich' : 'Bo\'lim'}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-dark-border flex items-center gap-4 text-[10px] text-gray-600">
          <span>↑↓ Navigatsiya</span>
          <span>↵ Ochish</span>
          <span className="ml-auto">Ctrl+K — ochish/yopish</span>
        </div>
      </div>
    </div>
  );
}
