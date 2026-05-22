import { useState } from 'react';
import { useAuthStore, USER_ROLES } from '../store/authStore';
import { useLaunchStore } from '../store/launchStore';

interface StandupEntry {
  id: string;
  date: string;         // YYYY-MM-DD
  roleId: string;
  roleName: string;
  roleEmoji: string;
  yesterday: string;
  today: string;
  blockers: string;
  mood: 1 | 2 | 3 | 4 | 5;
  submittedAt: string;
}

const MOOD_CONFIG: Record<number, { emoji: string; label: string; color: string }> = {
  1: { emoji: '😞', label: 'Qiyin',    color: 'text-red-400' },
  2: { emoji: '😐', label: 'Normal',   color: 'text-orange-400' },
  3: { emoji: '🙂', label: 'Yaxshi',   color: 'text-yellow-400' },
  4: { emoji: '😄', label: 'Zo\'r',    color: 'text-green-400' },
  5: { emoji: '🔥', label: 'ALANGA!',  color: 'text-gold' },
};

const STANDUP_STORAGE_KEY = 'moysklad-standups';

function loadStandups(): StandupEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STANDUP_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveStandups(entries: StandupEntry[]) {
  localStorage.setItem(STANDUP_STORAGE_KEY, JSON.stringify(entries));
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' });
}

export default function Standup() {
  const { getCurrentRole, hasFullAccess } = useAuthStore();
  const { currentDay } = useLaunchStore();
  const role = getCurrentRole();
  const fullAccess = hasFullAccess();

  const [standups, setStandups] = useState<StandupEntry[]>(loadStandups);
  const [form, setForm] = useState({ yesterday: '', today: '', blockers: '', mood: 3 as 1|2|3|4|5 });
  const [submitted, setSubmitted] = useState(false);
  const [viewDate, setViewDate] = useState(todayStr());

  const today = todayStr();
  const myTodayStandup = standups.find(
    (s) => s.date === today && s.roleId === role?.id
  );

  function handleSubmit() {
    if (!role || !form.today.trim()) return;
    const entry: StandupEntry = {
      id: `${today}-${role.id}-${Date.now()}`,
      date: today,
      roleId: role.id,
      roleName: role.name,
      roleEmoji: role.emoji,
      yesterday: form.yesterday.trim(),
      today: form.today.trim(),
      blockers: form.blockers.trim(),
      mood: form.mood,
      submittedAt: new Date().toISOString(),
    };
    const updated = [...standups.filter((s) => !(s.date === today && s.roleId === role.id)), entry];
    saveStandups(updated);
    setStandups(updated);
    setSubmitted(true);
    setForm({ yesterday: '', today: '', blockers: '', mood: 3 });
  }

  const viewStandups = standups.filter((s) => s.date === viewDate);
  const availableDates = [...new Set(standups.map((s) => s.date))].sort().reverse();

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Kunlik Standup 🗣️</h1>
          <p className="text-gray-400 text-sm mt-1">
            {formatDate(today)} · T{currentDay >= 0 ? '+' : ''}{currentDay}
          </p>
        </div>
        {myTodayStandup && !submitted && (
          <span className="text-xs text-green-400 border border-green-500/30 bg-green-500/10 px-3 py-1.5 rounded-xl">
            ✓ Bugungi standup yuborildi
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Form section */}
        <div className="space-y-4">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{role?.emoji || '👤'}</span>
              <div>
                <p className="font-bold text-white">{role?.name || 'Foydalanuvchi'}</p>
                <p className="text-xs text-gray-500">Bugungi standup</p>
              </div>
            </div>

            {(myTodayStandup || submitted) ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <p className="text-green-400 font-semibold text-sm">✓ Standup yuborildi!</p>
                <p className="text-xs text-gray-500 mt-1">Bugungi standupingiz saqlandi. Ertaga yana kirib yuboring.</p>
                {myTodayStandup && (
                  <div className="mt-3 space-y-2 text-xs text-gray-400">
                    {myTodayStandup.yesterday && <p><span className="text-gray-600">Kecha:</span> {myTodayStandup.yesterday}</p>}
                    <p><span className="text-gray-600">Bugun:</span> {myTodayStandup.today}</p>
                    {myTodayStandup.blockers && <p><span className="text-red-400">⚠ To'siq:</span> {myTodayStandup.blockers}</p>}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Yesterday */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1.5">
                    Kecha nima qildim? <span className="text-gray-700">(ixtiyoriy)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Kecha bajargan asosiy ishlarim..."
                    value={form.yesterday}
                    onChange={(e) => setForm({ ...form, yesterday: e.target.value })}
                    className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-gold/50 resize-none"
                  />
                </div>

                {/* Today */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1.5">
                    Bugun nima qilaman? <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Bugun bajaramoqchi bo'lgan asosiy 2-3 ta ish..."
                    value={form.today}
                    onChange={(e) => setForm({ ...form, today: e.target.value })}
                    className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-gold/50 resize-none"
                  />
                </div>

                {/* Blockers */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1.5">
                    To'siq/muammo bormi? <span className="text-gray-700">(ixtiyoriy)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Yordam kerakmi? Biror narsa to'sqinlik qilyaptimi..."
                    value={form.blockers}
                    onChange={(e) => setForm({ ...form, blockers: e.target.value })}
                    className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-gold/50 resize-none"
                  />
                </div>

                {/* Mood */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-2">Bugungi kayfiyat</label>
                  <div className="flex gap-2">
                    {([1, 2, 3, 4, 5] as const).map((m) => {
                      const conf = MOOD_CONFIG[m];
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setForm({ ...form, mood: m })}
                          className={`flex-1 py-2 rounded-xl border text-lg transition-all ${
                            form.mood === m
                              ? `border-current ${conf.color} bg-current/10 scale-110`
                              : 'border-dark-border text-gray-600 hover:border-dark-hover'
                          }`}
                          title={conf.label}
                        >
                          {conf.emoji}
                        </button>
                      );
                    })}
                  </div>
                  <p className={`text-xs text-center mt-1 font-medium ${MOOD_CONFIG[form.mood].color}`}>
                    {MOOD_CONFIG[form.mood].label}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!form.today.trim()}
                  className="w-full btn-gold py-3 font-bold disabled:opacity-40"
                >
                  📤 Yuborish
                </button>
              </>
            )}
          </div>
        </div>

        {/* Team standups (full access) or own history */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-gray-300">
              {fullAccess ? 'Jamoa standupi' : 'Mening tarixim'}
            </p>
            <select
              value={viewDate}
              onChange={(e) => setViewDate(e.target.value)}
              className="flex-1 bg-dark-surface border border-dark-border rounded-lg px-2 py-1 text-xs text-gray-300 outline-none"
            >
              <option value={today}>Bugun</option>
              {availableDates.filter((d) => d !== today).map((d) => (
                <option key={d} value={d}>{formatDate(d)}</option>
              ))}
            </select>
          </div>

          {viewStandups.length === 0 ? (
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8 text-center">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-gray-500 text-sm">Bu kun uchun standup yo'q</p>
            </div>
          ) : (
            <div className="space-y-3">
              {viewStandups
                .filter((s) => fullAccess || s.roleId === role?.id)
                .map((s) => {
                  const mood = MOOD_CONFIG[s.mood];
                  return (
                    <div key={s.id} className="bg-dark-card border border-dark-border rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{s.roleEmoji}</span>
                          <div>
                            <p className="font-bold text-white text-sm">{s.roleName}</p>
                            <p className="text-[10px] text-gray-600">
                              {new Date(s.submittedAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        <span className={`text-lg ${mood.color}`} title={mood.label}>{mood.emoji}</span>
                      </div>

                      {s.yesterday && (
                        <div className="bg-dark-surface rounded-lg p-3">
                          <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider mb-1">Kecha</p>
                          <p className="text-xs text-gray-400 leading-relaxed">{s.yesterday}</p>
                        </div>
                      )}

                      <div className="bg-dark-surface rounded-lg p-3">
                        <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider mb-1">Bugun</p>
                        <p className="text-xs text-gray-300 leading-relaxed">{s.today}</p>
                      </div>

                      {s.blockers && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                          <p className="text-[10px] text-red-400 font-semibold uppercase tracking-wider mb-1">⚠ To'siq</p>
                          <p className="text-xs text-red-300 leading-relaxed">{s.blockers}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}

          {/* Submitted count */}
          {fullAccess && (
            <div className="text-center">
              <p className="text-xs text-gray-600">
                {viewStandups.length} / {USER_ROLES.filter((r) => !r.fullAccess).length + 2} a'zo standup yubordi
              </p>
              <div className="flex justify-center gap-1 mt-2">
                {USER_ROLES.filter((r) => r.id !== 'jamoa').map((r) => {
                  const submitted = viewStandups.some((s) => s.roleId === r.id);
                  return (
                    <span
                      key={r.id}
                      className={`text-sm ${submitted ? 'opacity-100' : 'opacity-30'}`}
                      title={`${r.name}: ${submitted ? 'yubordi' : 'hali yubormadi'}`}
                    >
                      {r.emoji}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
