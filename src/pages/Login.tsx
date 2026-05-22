import { useState, useEffect } from 'react';
import { useAuthStore, USER_ROLES } from '../store/authStore';
import type { Assignee } from '../data/types';

import { SUPABASE_CONFIGURED } from '../lib/supabase';

// ─── Demo mode (Supabase not yet configured) ────────────────────────────────
function DemoLogin() {
  const { login } = useAuthStore();
  const [selected, setSelected] = useState<Assignee | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function handleLogin() {
    if (selected) login(selected);
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center font-black text-3xl text-dark-bg mx-auto mb-4">M</div>
          <h1 className="text-3xl font-black text-white">MoySklad Zapusk</h1>
          <p className="text-gray-400 mt-2">Siz kimsiz? Rolingizni tanlang</p>
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-orange-400 border border-orange-500/30 bg-orange-500/10 px-3 py-1 rounded-full">
            <span>⚠️</span> Demo rejim — Supabase sozlanmagan
          </div>
        </div>

        {/* Role grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {USER_ROLES.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => { setSelected(role.id as Assignee); setConfirmed(false); }}
              className={`flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all ${
                selected === role.id
                  ? `${role.color} scale-[1.03] shadow-lg`
                  : 'border-dark-border bg-dark-card hover:border-dark-hover'
              }`}
            >
              <span className="text-3xl mb-2">{role.emoji}</span>
              <p className="font-bold text-sm text-white">{role.name}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{role.title}</p>
              {role.fullAccess && (
                <span className="mt-1.5 text-[9px] bg-gold/20 text-gold border border-gold/30 px-1.5 py-0.5 rounded-full font-semibold">
                  Full Access
                </span>
              )}
            </button>
          ))}
        </div>

        {selected && (
          <div className="bg-dark-card border border-dark-border rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{USER_ROLES.find((r) => r.id === selected)?.emoji}</span>
              <div>
                <p className="font-bold text-white">{USER_ROLES.find((r) => r.id === selected)?.name}</p>
                <p className="text-xs text-gray-500">{USER_ROLES.find((r) => r.id === selected)?.description}</p>
              </div>
            </div>
            {!USER_ROLES.find((r) => r.id === selected)?.fullAccess && (
              <div className="flex items-start gap-2 text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                <span>🔒</span>
                <span>Siz faqat o'z tasklaringizni ko'rasiz. To'liq kirish uchun Producer yoki Ops Manager rolingizni tanlang.</span>
              </div>
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="accent-gold w-4 h-4"
              />
              <span className="text-sm text-gray-300">Ha, men {USER_ROLES.find((r) => r.id === selected)?.name}man</span>
            </label>
            <button
              type="button"
              disabled={!confirmed}
              onClick={handleLogin}
              className="w-full btn-gold py-3 font-bold text-sm disabled:opacity-40"
            >
              Kirish →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Supabase Login ───────────────────────────────────────────────────────────
function SupabaseLogin() {
  const { signIn, signUp, loading } = useAuthStore();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [form, setForm] = useState({
    email: '',
    password: '',
    displayName: '',
    roleId: 'jamoa' as Assignee,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = await signIn(form.email, form.password);
    if (result.error) setError(result.error);
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = await signUp(form.email, form.password, form.roleId, form.displayName);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess('Hisob yaratildi! Email tasdiqlash xabari yuborildi.');
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center font-black text-3xl text-dark-bg mx-auto mb-4">M</div>
          <h1 className="text-3xl font-black text-white">MoySklad Zapusk</h1>
          <p className="text-gray-400 mt-1 text-sm">Jamoaviy boshqaruv tizimi</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-dark-card border border-dark-border rounded-xl p-1 mb-5">
          {(['signin', 'signup'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError(null); setSuccess(null); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === m ? 'bg-gold/20 text-gold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {m === 'signin' ? '🔑 Kirish' : '+ Hisob yaratish'}
            </button>
          ))}
        </div>

        <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="bg-dark-card border border-dark-border rounded-2xl p-5 space-y-4">

          {mode === 'signup' && (
            <>
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">Ism-familiya</label>
                <input
                  type="text"
                  placeholder="Alisher Sobirov"
                  value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  required
                  className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-gold/50"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">Rol</label>
                <div className="grid grid-cols-2 gap-2">
                  {USER_ROLES.filter((r) => r.id !== 'jamoa').map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setForm({ ...form, roleId: role.id as Assignee })}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                        form.roleId === role.id
                          ? `${role.color} border-2`
                          : 'border-dark-border hover:border-dark-hover'
                      }`}
                    >
                      <span className="text-xl">{role.emoji}</span>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">{role.name}</p>
                        <p className="text-[10px] text-gray-500 leading-tight">{role.title.split(' ').slice(0, 2).join(' ')}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs text-gray-500 font-medium block mb-1">Email</label>
            <input
              type="email"
              placeholder="email@moysklad.uz"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-gold/50"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 font-medium block mb-1">Parol</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
              className="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-gold/50"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <span>❌</span> {error}
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl p-3">
              <span>✅</span> {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-3 font-bold disabled:opacity-50"
          >
            {loading ? '⏳ Yuklanmoqda...' : mode === 'signin' ? 'Kirish →' : 'Hisob yaratish →'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-4">
          Hisob yo'qmi? Producer siz uchun hisob yaratib beradi.
        </p>
      </div>
    </div>
  );
}

// ─── Main Login component ─────────────────────────────────────────────────────
export default function Login() {
  return SUPABASE_CONFIGURED ? <SupabaseLogin /> : <DemoLogin />;
}
