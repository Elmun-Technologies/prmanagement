import { useState } from 'react';
import type { Assignee } from '../data/types';
import { useAuthStore, USER_ROLES } from '../store/authStore';

export default function RoleSelector() {
  const { login } = useAuthStore();
  const [selected, setSelected] = useState<Assignee | null>(null);
  const [confirming, setConfirming] = useState(false);

  const selectedRole = USER_ROLES.find((r) => r.id === selected);

  function handleSelect(id: Assignee) {
    setSelected(id);
    setConfirming(false);
  }

  function handleConfirm() {
    if (!selected) return;
    if (!confirming) {
      setConfirming(true);
      return;
    }
    login(selected);
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4">
      {/* Logo / Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🚀</div>
        <h1 className="text-2xl font-bold text-white">Moysklad Launch</h1>
        <p className="text-gray-400 mt-1 text-sm">Loyiha Boshqaruv Tizimi</p>
        <div className="mt-3 h-px bg-dark-border w-48 mx-auto" />
        <p className="text-gray-400 mt-3 text-base font-medium">Kim siz?</p>
        <p className="text-gray-600 text-xs mt-1">Rolingizni tanlang — tizim siz uchun moslashadi</p>
      </div>

      {/* Role cards grid */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3">
        {USER_ROLES.map((role) => {
          const isSelected = selected === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => handleSelect(role.id)}
              className={`relative text-left rounded-2xl border-2 p-4 transition-all duration-200 ${
                isSelected
                  ? role.color + ' shadow-lg scale-[1.02]'
                  : 'border-dark-border bg-dark-card hover:border-dark-hover hover:bg-dark-surface'
              }`}
            >
              {/* Full access badge */}
              {role.fullAccess && (
                <span className="absolute top-3 right-3 text-xs bg-gold/20 text-gold border border-gold/30 px-2 py-0.5 rounded-full font-medium">
                  To'liq kirish
                </span>
              )}

              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0">{role.emoji}</span>
                <div className="flex-1 min-w-0 pr-16">
                  <p className="font-bold text-white text-base leading-tight">{role.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{role.title}</p>
                  <p className={`text-xs mt-2 leading-relaxed ${isSelected ? 'text-current opacity-90' : 'text-gray-500'}`}>
                    {role.description}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="absolute bottom-3 right-3">
                  <div className="w-5 h-5 rounded-full bg-current/30 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Confirm section */}
      {selected && selectedRole && (
        <div className="mt-6 w-full max-w-2xl">
          {confirming ? (
            <div className="rounded-2xl border border-dark-border bg-dark-card p-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedRole.emoji}</span>
                <div>
                  <p className="text-white font-semibold">{selectedRole.name} sifatida kirasizmi?</p>
                  <p className="text-gray-500 text-xs">{selectedRole.title}</p>
                </div>
              </div>
              {!selectedRole.fullAccess && (
                <p className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2">
                  ⚠ Siz faqat o'zingizga tegishli tasklarni ko'rasiz. Umumiy loyiha ma'lumotlari yashiriladi.
                </p>
              )}
              {selectedRole.fullAccess && (
                <p className="text-xs text-gold bg-gold/10 border border-gold/20 rounded-lg px-3 py-2">
                  👑 Siz barcha sahifalar va ma'lumotlarga to'liq kirishga egasiz.
                </p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => login(selected)}
                  className="btn-gold flex-1 py-2.5 text-sm font-bold"
                >
                  {selectedRole.emoji} Kirish
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="px-4 py-2.5 rounded-xl border border-dark-border text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Orqaga
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full btn-gold py-3 text-base font-bold rounded-2xl"
            >
              {selectedRole.emoji} {selectedRole.name} sifatida davom etish →
            </button>
          )}
        </div>
      )}

      {/* Footer note */}
      <p className="mt-8 text-xs text-gray-700 text-center max-w-sm">
        Rolingizni o'zgartirmoqchi bo'lsangiz, sidebar da "Chiqish" tugmasini bosing
      </p>
    </div>
  );
}
