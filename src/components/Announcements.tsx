import { useState } from 'react';
import { useBackendStore } from '../store/backendStore';
import { useAuthStore } from '../store/authStore';
import type { DbAnnouncement } from '../lib/supabase';

const PRIORITY_CONFIG = {
  low:    { color: 'border-gray-500/30 bg-gray-500/5',    badge: 'text-gray-400', emoji: '📢' },
  normal: { color: 'border-blue-500/30 bg-blue-500/5',    badge: 'text-blue-400', emoji: '📣' },
  high:   { color: 'border-orange-500/30 bg-orange-500/10', badge: 'text-orange-400', emoji: '🔔' },
  urgent: { color: 'border-red-500/40 bg-red-500/10',     badge: 'text-red-400',  emoji: '🚨' },
};

function PostForm({ onClose }: { onClose: () => void }) {
  const { postAnnouncement } = useBackendStore();
  const { getSupabaseUserId } = useAuthStore();
  const [form, setForm] = useState({
    title: '',
    body: '',
    emoji: '📢',
    priority: 'normal' as DbAnnouncement['priority'],
    is_pinned: false,
    expires_in_days: '',
  });

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    const expires_at = form.expires_in_days
      ? new Date(Date.now() + Number(form.expires_in_days) * 86400000).toISOString()
      : null;
    await postAnnouncement({
      title: form.title,
      body: form.body,
      emoji: form.emoji,
      priority: form.priority,
      is_pinned: form.is_pinned,
      expires_at,
      posted_by: getSupabaseUserId(),
    });
    onClose();
  }

  const EMOJI_OPTS = ['📢', '📣', '🔔', '🚨', '🎉', '⚡', '🚀', '💡', '⚠️', '✅'];

  return (
    <form onSubmit={handlePost} className="bg-dark-card border border-dark-border rounded-2xl p-4 space-y-3">
      <p className="font-bold text-white">Yangi e'lon</p>

      <div className="flex flex-wrap gap-1.5">
        {EMOJI_OPTS.map((e) => (
          <button key={e} type="button" onClick={() => setForm({ ...form, emoji: e })}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all ${form.emoji === e ? 'bg-gold/20 border border-gold' : 'bg-dark-surface border border-dark-border'}`}>
            {e}
          </button>
        ))}
      </div>

      <input type="text" placeholder="Sarlavha *" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} required
        className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-gold/50" />

      <textarea rows={3} placeholder="Matn *" value={form.body}
        onChange={(e) => setForm({ ...form, body: e.target.value })} required
        className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-gold/50 resize-none" />

      <div className="flex gap-3">
        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as DbAnnouncement['priority'] })}
          className="flex-1 bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-sm text-white outline-none">
          {(['low', 'normal', 'high', 'urgent'] as const).map((p) => (
            <option key={p} value={p}>{p === 'low' ? 'Past' : p === 'normal' ? 'Normal' : p === 'high' ? 'Yuqori' : '🚨 Shoshilinch'}</option>
          ))}
        </select>
        <input type="number" placeholder="Amal qilish (kun)" value={form.expires_in_days}
          onChange={(e) => setForm({ ...form, expires_in_days: e.target.value })} min="1" max="30"
          className="w-32 bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-gold/50" />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.is_pinned} onChange={(e) => setForm({ ...form, is_pinned: e.target.checked })} className="accent-gold" />
        <span className="text-xs text-gray-400">📌 Tepada saqlash</span>
      </label>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="text-xs text-gray-500 px-4 py-1.5 border border-dark-border rounded-lg hover:border-dark-hover">Bekor</button>
        <button type="submit" className="text-xs btn-gold px-4 py-1.5">📤 E'lon qilish</button>
      </div>
    </form>
  );
}

export default function Announcements() {
  const { announcements, deleteAnnouncement } = useBackendStore();
  const { hasFullAccess } = useAuthStore();
  const [showForm, setShowForm] = useState(false);

  const fullAccess = hasFullAccess();

  if (announcements.length === 0 && !fullAccess) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-300">📢 E'lonlar</p>
        {fullAccess && (
          <button type="button" onClick={() => setShowForm(!showForm)}
            className="text-xs text-gold border border-gold/30 px-2.5 py-1 rounded-lg hover:bg-gold/10 transition-colors">
            {showForm ? '✕ Yopish' : '+ E\'lon qo\'shish'}
          </button>
        )}
      </div>

      {showForm && <PostForm onClose={() => setShowForm(false)} />}

      {announcements.length === 0 && (
        <div className="text-center py-4 text-gray-600 text-sm">Hech qanday e'lon yo'q</div>
      )}

      <div className="space-y-2">
        {announcements.map((ann) => {
          const conf = PRIORITY_CONFIG[ann.priority];
          const isExpired = ann.expires_at ? new Date(ann.expires_at) < new Date() : false;
          if (isExpired) return null;
          return (
            <div key={ann.id} className={`rounded-xl border p-3 ${conf.color} ${ann.is_pinned ? 'border-l-4 border-l-gold' : ''}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <span className="text-lg flex-shrink-0">{ann.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-bold text-white text-sm leading-tight">{ann.is_pinned && '📌 '}{ann.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{ann.body}</p>
                    <p className="text-[10px] text-gray-600 mt-1">
                      {new Date(ann.posted_at).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      {ann.expires_at && ` · ${new Date(ann.expires_at).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' })} gacha`}
                    </p>
                  </div>
                </div>
                {fullAccess && (
                  <button type="button" onClick={() => deleteAnnouncement(ann.id)}
                    className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0 text-sm">
                    ×
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
