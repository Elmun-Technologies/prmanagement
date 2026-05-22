import { useState, useCallback } from 'react';
import {
  loadOrgNodes, saveOrgNodes, getDefaultOrgNodes,
  DEPARTMENT_COLORS, COLOR_OPTIONS, EMOJI_OPTIONS, DEPARTMENT_OPTIONS,
  type OrgNode,
} from '../data/orgStructure';

// ─── Node Edit Modal ──────────────────────────────────────────────────────────
function NodeModal({
  node,
  allNodes,
  onSave,
  onClose,
  onDelete,
}: {
  node: Partial<OrgNode> & { id?: string };
  allNodes: OrgNode[];
  onSave: (n: OrgNode) => void;
  onClose: () => void;
  onDelete?: () => void;
}) {
  const isNew = !node.id;
  const [form, setForm] = useState<Partial<OrgNode>>({
    id:         node.id         || `node-${Date.now()}`,
    parentId:   node.parentId   ?? null,
    name:       node.name       || '',
    title:      node.title      || '',
    emoji:      node.emoji      || '👤',
    color:      node.color      || COLOR_OPTIONS[0].value,
    department: node.department || 'Operations',
    level:      node.level      ?? 3,
    isExternal: node.isExternal || false,
    isVacant:   node.isVacant   || false,
  });

  const valid = (form.name?.trim().length ?? 0) > 0 && (form.title?.trim().length ?? 0) > 0;

  function f(key: keyof OrgNode, val: unknown) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border sticky top-0 bg-dark-card">
          <h2 className="font-bold text-white">{isNew ? '+ Yangi lavozim' : 'Lavozimni tahrirlash'}</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-white text-xl">×</button>
        </div>

        <div className="p-5 space-y-4">
          {/* Emoji */}
          <div>
            <label className="text-xs text-gray-500 font-medium block mb-1.5">Emoji</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((e) => (
                <button key={e} type="button" onClick={() => f('emoji', e)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                    form.emoji === e ? 'bg-gold/20 border-2 border-gold scale-110' : 'bg-dark-surface border border-dark-border hover:border-dark-hover'
                  }`}
                >{e}</button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Ism / Lavozim nomi *</label>
              <input
                type="text" placeholder="Sales Closer 1" value={form.name || ''}
                onChange={(e) => f('name', e.target.value)}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Title / Funksiya *</label>
              <input
                type="text" placeholder="Outbound Calls · Closing" value={form.title || ''}
                onChange={(e) => f('title', e.target.value)}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-gold/50"
              />
            </div>
          </div>

          {/* Parent & Department */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Reports To (Yuqori)</label>
              <select
                value={form.parentId || ''}
                onChange={(e) => f('parentId', e.target.value || null)}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-gold/50"
              >
                <option value="">— Hech kim (Top Level)</option>
                {allNodes.filter((n) => n.id !== form.id).map((n) => (
                  <option key={n.id} value={n.id}>{n.emoji} {n.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Bo'lim (Department)</label>
              <select
                value={form.department || ''}
                onChange={(e) => f('department', e.target.value)}
                className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-gold/50"
              >
                {DEPARTMENT_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="text-xs text-gray-500 font-medium block mb-1.5">Rang</label>
            <div className="grid grid-cols-3 gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button key={c.value} type="button" onClick={() => f('color', c.value)}
                  className={`px-2 py-1.5 rounded-lg border text-xs transition-all ${c.value} ${form.color === c.value ? 'ring-2 ring-gold' : ''}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isVacant || false} onChange={(e) => f('isVacant', e.target.checked)}
                className="accent-gold w-4 h-4" />
              <span className="text-xs text-gray-400">Bo'sh o'rin (Vacant)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isExternal || false} onChange={(e) => f('isExternal', e.target.checked)}
                className="accent-gold w-4 h-4" />
              <span className="text-xs text-gray-400">Tashqi (External/Partner)</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-dark-border">
          <div>
            {onDelete && (
              <button type="button" onClick={onDelete}
                className="text-xs text-red-400 hover:text-red-300 border border-red-500/30 px-3 py-1.5 rounded-lg transition-colors">
                🗑 O'chirish
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={onClose}
              className="text-xs text-gray-400 border border-dark-border px-4 py-1.5 rounded-lg hover:border-dark-hover transition-colors">
              Bekor
            </button>
            <button type="button" disabled={!valid} onClick={() => valid && onSave(form as OrgNode)}
              className="text-xs btn-gold px-4 py-1.5 disabled:opacity-40">
              💾 Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Single Org Node Card ─────────────────────────────────────────────────────
function NodeCard({
  node,
  onClick,
  highlighted,
}: {
  node: OrgNode;
  onClick: () => void;
  highlighted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-center text-center w-[140px] flex-shrink-0 transition-all hover:scale-105 ${highlighted ? 'scale-105' : ''}`}
    >
      <div className={`w-full rounded-2xl border-2 p-3 transition-all ${node.color} ${
        highlighted ? 'ring-2 ring-gold/50 shadow-lg shadow-gold/10' : 'hover:shadow-md'
      } ${node.isVacant ? 'opacity-60 border-dashed' : ''}`}>
        {/* Status badges */}
        <div className="absolute -top-2 -right-2 flex gap-1">
          {node.isVacant && (
            <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-bold">Vacant</span>
          )}
          {node.isExternal && (
            <span className="text-[10px] bg-gray-600 text-gray-300 px-1.5 py-0.5 rounded-full">Ext</span>
          )}
        </div>

        {/* Emoji */}
        <div className="text-3xl mb-2">{node.emoji}</div>

        {/* Name */}
        <p className="font-bold text-xs leading-tight mb-0.5 truncate w-full" title={node.name}>
          {node.name}
        </p>

        {/* Title */}
        <p className="text-[10px] opacity-70 leading-tight line-clamp-2" title={node.title}>
          {node.title}
        </p>

        {/* Department */}
        <div className={`mt-2 px-1.5 py-0.5 rounded-md text-[9px] font-semibold border inline-block ${DEPARTMENT_COLORS[node.department] || 'border-gray-500/30 bg-gray-500/10 text-gray-400'}`}>
          {node.department}
        </div>
      </div>

      {/* Edit hint */}
      <div className="absolute -bottom-5 text-[10px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        ✎ Tahrirlash
      </div>
    </button>
  );
}

// ─── Connector line helpers ───────────────────────────────────────────────────
function VertConnector() {
  return <div className="w-px h-6 bg-dark-border mx-auto" />;
}

function HorizConnector({ count }: { count: number }) {
  if (count <= 1) return null;
  return (
    <div className="flex items-center justify-center mb-0">
      <div className="h-px bg-dark-border" style={{ width: `calc(${(count - 1)} * 152px)` }} />
    </div>
  );
}

// ─── Recursive Tree Level ─────────────────────────────────────────────────────
function TreeLevel({
  nodes,
  allNodes,
  parentId,
  onEdit,
  highlightId,
  depth = 0,
}: {
  nodes: OrgNode[];
  allNodes: OrgNode[];
  parentId: string | null;
  onEdit: (node: OrgNode) => void;
  highlightId?: string;
  depth?: number;
}) {
  const children = allNodes.filter((n) => n.parentId === parentId);
  if (children.length === 0) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Horizontal connector */}
      {children.length > 1 && (
        <div className="flex items-center justify-center w-full">
          <div className="h-px bg-dark-border" style={{ width: `${(children.length - 1) * 152}px` }} />
        </div>
      )}

      {/* Children row */}
      <div className="flex items-start gap-2 justify-center">
        {children.map((child) => (
          <div key={child.id} className="flex flex-col items-center">
            {/* Vertical line from parent to this child */}
            <VertConnector />
            <NodeCard
              node={child}
              onClick={() => onEdit(child)}
              highlighted={highlightId === child.id}
            />
            {/* Recurse */}
            <TreeLevel
              nodes={nodes}
              allNodes={allNodes}
              parentId={child.id}
              onEdit={onEdit}
              highlightId={highlightId}
              depth={depth + 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main OrgChart Component ──────────────────────────────────────────────────
export default function OrgChart() {
  const [nodes, setNodes] = useState<OrgNode[]>(loadOrgNodes);
  const [editing, setEditing] = useState<Partial<OrgNode> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [highlightDept, setHighlightDept] = useState<string | null>(null);
  const [view, setView] = useState<'tree' | 'list'>('tree');

  const save = useCallback((updated: OrgNode[]) => {
    setNodes(updated);
    saveOrgNodes(updated);
  }, []);

  function handleSave(node: OrgNode) {
    if (isNew) {
      save([...nodes, node]);
    } else {
      save(nodes.map((n) => (n.id === node.id ? node : n)));
    }
    setEditing(null);
    setIsNew(false);
  }

  function handleDelete() {
    if (!editing?.id) return;
    // Reassign children to parent of deleted node
    const deletedParent = nodes.find((n) => n.id === editing.id)?.parentId ?? null;
    const updated = nodes
      .filter((n) => n.id !== editing.id)
      .map((n) => n.parentId === editing.id ? { ...n, parentId: deletedParent } : n);
    save(updated);
    setEditing(null);
  }

  function handleReset() {
    if (window.confirm('Org strukturani standart holatga qaytarasizmi?')) {
      save(getDefaultOrgNodes());
    }
  }

  const departments = [...new Set(nodes.map((n) => n.department))];
  const rootNodes = nodes.filter((n) => n.parentId === null);
  const totalVacant = nodes.filter((n) => n.isVacant).length;
  const totalExternal = nodes.filter((n) => n.isExternal).length;

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex bg-dark-surface rounded-xl border border-dark-border p-1 gap-1">
            {(['tree', 'list'] as const).map((v) => (
              <button key={v} type="button" onClick={() => setView(v)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  view === v ? 'bg-gold/20 text-gold' : 'text-gray-500 hover:text-gray-300'
                }`}>
                {v === 'tree' ? '🌲 Tree' : '📋 List'}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {departments.map((dept) => (
              <button key={dept} type="button"
                onClick={() => setHighlightDept(highlightDept === dept ? null : dept)}
                className={`text-[10px] px-2 py-1 rounded-lg border transition-all ${
                  highlightDept === dept
                    ? DEPARTMENT_COLORS[dept] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    : 'border-dark-border text-gray-500 hover:border-dark-hover'
                }`}>
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {totalVacant > 0 && (
            <span className="text-[10px] text-orange-400 border border-orange-500/30 px-2 py-1 rounded-lg">
              {totalVacant} Vacant
            </span>
          )}
          <button type="button" onClick={handleReset}
            className="text-[10px] text-gray-500 border border-dark-border px-2.5 py-1.5 rounded-lg hover:border-dark-hover transition-colors">
            ↺ Reset
          </button>
          <button type="button"
            onClick={() => { setIsNew(true); setEditing({ parentId: nodes[0]?.id ?? null, level: 3 }); }}
            className="text-xs btn-gold px-3 py-1.5">
            + Lavozim qo'shish
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Jami lavozim', value: nodes.length, color: 'text-white' },
          { label: 'Bo\'limlar', value: departments.length, color: 'text-blue-400' },
          { label: 'Vacant', value: totalVacant, color: 'text-orange-400' },
          { label: 'External', value: totalExternal, color: 'text-gray-400' },
        ].map((s) => (
          <div key={s.label} className="bg-dark-surface border border-dark-border rounded-xl p-3 text-center">
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>

      {view === 'tree' ? (
        /* ── TREE VIEW ── */
        <div className="bg-dark-card border border-dark-border rounded-2xl p-6 overflow-x-auto">
          <div className="min-w-max flex flex-col items-center gap-0">
            {/* Root nodes */}
            {rootNodes.map((root) => (
              <div key={root.id} className="flex flex-col items-center">
                <NodeCard
                  node={root}
                  onClick={() => { setIsNew(false); setEditing(root); }}
                  highlighted={highlightDept ? root.department === highlightDept : undefined}
                />
                <TreeLevel
                  nodes={nodes}
                  allNodes={nodes}
                  parentId={root.id}
                  onEdit={(n) => { setIsNew(false); setEditing(n); }}
                  highlightId={highlightDept ? undefined : undefined}
                />
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-700 mt-6">
            Har bir kartochkani bosib tahrirlash mumkin · Chiziqlar = Reporting line
          </p>
        </div>
      ) : (
        /* ── LIST VIEW ── */
        <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_auto_auto_auto] text-[10px] text-gray-600 uppercase tracking-wider px-4 py-2 border-b border-dark-border font-semibold">
            <span>Lavozim</span>
            <span>Title / Funksiya</span>
            <span>Department</span>
            <span>Status</span>
            <span />
          </div>
          <div className="divide-y divide-dark-border">
            {nodes
              .sort((a, b) => a.level - b.level || a.department.localeCompare(b.department))
              .map((node) => {
                const parent = nodes.find((n) => n.id === node.parentId);
                return (
                  <div key={node.id} className="grid grid-cols-[1fr_1fr_auto_auto_auto] items-center px-4 py-2.5 hover:bg-dark-surface transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      <span style={{ paddingLeft: `${node.level * 12}px` }}>{node.emoji}</span>
                      <div className="min-w-0">
                        <p className={`text-sm font-medium truncate ${node.isVacant ? 'text-gray-500 italic' : 'text-gray-200'}`}>
                          {node.name}
                        </p>
                        {parent && (
                          <p className="text-[10px] text-gray-600 truncate">↳ {parent.name}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 truncate pr-2">{node.title}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${DEPARTMENT_COLORS[node.department] || 'border-gray-500/30 bg-gray-500/10 text-gray-400'}`}>
                      {node.department}
                    </span>
                    <div className="flex gap-1 px-2">
                      {node.isVacant && <span className="text-[9px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-1 rounded">Vacant</span>}
                      {node.isExternal && <span className="text-[9px] bg-gray-600/30 text-gray-400 border border-gray-600/30 px-1 rounded">Ext</span>}
                    </div>
                    <button type="button"
                      onClick={() => { setIsNew(false); setEditing(node); }}
                      className="text-[10px] text-gray-500 hover:text-gold transition-colors px-2">
                      ✎
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-600 px-1">
        <span className="text-gray-500 font-semibold">Belgi:</span>
        <span>🟡 <span className="border border-dashed border-orange-400 px-1 rounded">Vacant</span> — Bo'sh o'rin</span>
        <span>⬜ <span className="border border-gray-500/50 px-1 rounded">Ext</span> — Tashqi hamkor</span>
        <span>Chiziq — Reporting line (kim kimga hisobot beradi)</span>
      </div>

      {/* Edit/Add Modal */}
      {editing && (
        <NodeModal
          node={editing}
          allNodes={nodes}
          onSave={handleSave}
          onClose={() => { setEditing(null); setIsNew(false); }}
          onDelete={!isNew ? handleDelete : undefined}
        />
      )}
    </div>
  );
}
