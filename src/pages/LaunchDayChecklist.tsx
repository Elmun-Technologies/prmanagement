import { useState } from 'react';
import { useLaunchStore } from '../store/launchStore';

interface CheckItem {
  id: string;
  time: string;
  task: string;
  who: string;
  whoEmoji: string;
  critical: boolean;
  category: 'setup' | 'content' | 'sales' | 'logistics' | 'post';
}

const CHECKLIST: CheckItem[] = [
  // ERTALAB 07:00–09:00
  { id: 'c1',  time: '07:00', task: 'Barcha a\'zolarga "Bugun seminar!" xabari yuborish', who: 'Mentor', whoEmoji: '👑', critical: true,  category: 'setup' },
  { id: 'c2',  time: '07:30', task: 'Kiyim-kechak va tashqi ko\'rinish tayyor', who: 'Mentor', whoEmoji: '👑', critical: false, category: 'setup' },
  { id: 'c3',  time: '08:00', task: 'Zal ochilishi — kalit olish va kirishni tekshirish', who: 'Assistent', whoEmoji: '🤝', critical: true,  category: 'logistics' },
  { id: 'c4',  time: '08:15', task: 'Projektor va ekranni yoqish, slaydlarni tekshirish', who: 'Assistent', whoEmoji: '🤝', critical: true,  category: 'setup' },
  { id: 'c5',  time: '08:15', task: 'Mikrofon va zvuk tizimini tekshirish', who: 'Assistent', whoEmoji: '🤝', critical: true,  category: 'setup' },
  { id: 'c6',  time: '08:20', task: 'Ishtirokchilar ro\'yxatini chop etish (2 nusxa)', who: 'Assistent', whoEmoji: '🤝', critical: true,  category: 'logistics' },
  { id: 'c7',  time: '08:20', task: 'Daftar, ruchka, broshurlarni stullarga qo\'yish', who: 'Assistent', whoEmoji: '🤝', critical: false, category: 'logistics' },
  { id: 'c8',  time: '08:30', task: 'Katering/suv/qahva keldi — tekshirish', who: 'Assistent', whoEmoji: '🤝', critical: false, category: 'logistics' },
  { id: 'c9',  time: '08:30', task: 'Sotuvchilarni brifing: maqsad 20 ta yopish', who: 'Mentor', whoEmoji: '👑', critical: true,  category: 'sales' },
  { id: 'c10', time: '08:45', task: 'Sotuv jadvali va hisoblash tizimini tayyor qilish', who: 'Sotuvchi 1', whoEmoji: '💼', critical: true,  category: 'sales' },
  { id: 'c11', time: '08:50', task: 'Kirim joyida stol — ro\'yxat va to\'lov apparati', who: 'Sotuvchi 2', whoEmoji: '💼', critical: true,  category: 'sales' },
  { id: 'c12', time: '08:55', task: 'Jonli mijoz — tayyorlik, pozitsiya, so\'z', who: 'Mentor', whoEmoji: '👑', critical: true,  category: 'content' },
  { id: 'c13', time: '09:00', task: 'Eshikni ochish — ishtirokchilarni qabul qilish boshlanadi', who: 'Jamoa', whoEmoji: '👥', critical: true,  category: 'setup' },

  // 09:00–13:00 — SEMINAR
  { id: 'c14', time: '09:00', task: 'Networking muzikasi, choy-qahva, suhbat', who: 'Assistent', whoEmoji: '🤝', critical: false, category: 'setup' },
  { id: 'c15', time: '09:30', task: 'Seminar boshlash — slayd 1 — "Kim biz"', who: 'Mentor', whoEmoji: '👑', critical: true,  category: 'content' },
  { id: 'c16', time: '09:45', task: 'Auditoriya og\'riqlarini aniqlash — jonli savol-javob', who: 'Mentor', whoEmoji: '👑', critical: true,  category: 'content' },
  { id: 'c17', time: '10:00', task: 'Demo: MoySklad tizimini namoyish etish (LIVE)', who: 'Mentor', whoEmoji: '👑', critical: true,  category: 'content' },
  { id: 'c18', time: '10:30', task: 'Jonli keys: haqiqiy mijoz taqdimoti', who: 'Mentor+Mijoz', whoEmoji: '🤝', critical: true,  category: 'content' },
  { id: 'c19', time: '11:00', task: 'Tanaffus — katering, sotuvchilar auditoriya bilan suhbat', who: 'Sotuvchilar', whoEmoji: '💼', critical: false, category: 'sales' },
  { id: 'c20', time: '11:15', task: 'Offer ochish — narxlar, paketlar, Early Bird', who: 'Mentor', whoEmoji: '👑', critical: true,  category: 'sales' },
  { id: 'c21', time: '11:30', task: 'Sotuv sessiyasi — har bir odam bilan muloqot', who: 'Sotuvchilar', whoEmoji: '💼', critical: true,  category: 'sales' },
  { id: 'c22', time: '12:00', task: 'Q&A — savollar, e\'tirozlarni yopish', who: 'Mentor', whoEmoji: '👑', critical: true,  category: 'content' },
  { id: 'c23', time: '12:30', task: 'Yopish — to\'lovlar, shartnomalar, rahmat', who: 'Jamoa', whoEmoji: '👥', critical: true,  category: 'sales' },

  // SEMINARDAN KEYIN
  { id: 'c24', time: '13:00', task: 'Sotuvlar hisobi — nechta sotildi, jami summa', who: 'Assistent', whoEmoji: '🤝', critical: true,  category: 'post' },
  { id: 'c25', time: '13:15', task: 'Kelmaganlar ro\'yxati — dojim qo\'ng\'iroq rejasi', who: 'Sotuvchi 1', whoEmoji: '💼', critical: true,  category: 'post' },
  { id: 'c26', time: '13:30', task: 'Seminar debrifi — 15 daqiqa, nima yaxshi/yomon', who: 'Jamoa', whoEmoji: '👥', critical: true,  category: 'post' },
  { id: 'c27', time: '14:00', task: 'Social proof kontent: fotosuratlar, video kliplar', who: 'Assistent', whoEmoji: '🤝', critical: false, category: 'post' },
  { id: 'c28', time: '15:00', task: 'Telegram guruhga natijalar e\'lon qilish', who: 'Mentor', whoEmoji: '👑', critical: false, category: 'post' },
  { id: 'c29', time: '16:00', task: 'Sotib olganlar WhatsApp/Telegram guruhiga qo\'shish', who: 'Assistent', whoEmoji: '🤝', critical: true,  category: 'post' },
];

const CATEGORY_CONFIG = {
  setup:     { label: 'Tayyorgarlik',  emoji: '⚙️', color: 'text-blue-400',   border: 'border-blue-500/20' },
  content:   { label: 'Kontent',       emoji: '🎤', color: 'text-purple-400', border: 'border-purple-500/20' },
  sales:     { label: 'Sotuv',         emoji: '💰', color: 'text-green-400',  border: 'border-green-500/20' },
  logistics: { label: 'Logistika',     emoji: '📦', color: 'text-orange-400', border: 'border-orange-500/20' },
  post:      { label: 'Seminar keyin', emoji: '📊', color: 'text-gold',       border: 'border-gold/20' },
};

export default function LaunchDayChecklist() {
  const { kpis } = useLaunchStore();
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | keyof typeof CATEGORY_CONFIG>('all');
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filtered = CHECKLIST.filter((item) => {
    if (filter !== 'all' && item.category !== filter) return false;
    if (showCriticalOnly && !item.critical) return false;
    return true;
  });

  const total = CHECKLIST.length;
  const done = checked.size;
  const pct = Math.round((done / total) * 100);
  const critical = CHECKLIST.filter((c) => c.critical);
  const criticalDone = critical.filter((c) => checked.has(c.id)).length;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5 print:p-2">

      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/30 p-5 print:bg-white print:border print:border-gray-300">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest">🚨 Launch Day</p>
            <h1 className="text-2xl font-black text-white mt-1">Seminar Kuni — Nazorat Ro'yxati</h1>
            <p className="text-gray-400 text-sm mt-1">Har bir bandni yoping — hech narsa esdan chiqmasin!</p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="text-xs border border-dark-border text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors print:hidden"
          >
            🖨️ Chop etish
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-black/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-white">{done}/{total}</p>
            <p className="text-xs text-gray-500">Bajarildi</p>
          </div>
          <div className="bg-black/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-red-400">{criticalDone}/{critical.length}</p>
            <p className="text-xs text-gray-500">Muhim bandlar</p>
          </div>
          <div className="bg-black/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-gold">{kpis.seminarSales}</p>
            <p className="text-xs text-gray-500">Sotuvlar (maqsad: 20)</p>
          </div>
        </div>

        <div className="mt-3">
          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${pct === 100 ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1 text-right">{pct}% bajarildi</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 print:hidden">
        {([['all', '🎯', 'Hammasi'], ...Object.entries(CATEGORY_CONFIG).map(([k, v]) => [k, v.emoji, v.label])] as [string, string, string][]).map(([id, emoji, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id as typeof filter)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              filter === id
                ? 'bg-gold/20 border-gold/50 text-gold'
                : 'bg-dark-card border-dark-border text-gray-400 hover:border-dark-hover'
            }`}
          >
            {emoji} {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowCriticalOnly(!showCriticalOnly)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
            showCriticalOnly ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-dark-card border-dark-border text-gray-400'
          }`}
        >
          🚨 Faqat muhimlar
        </button>
      </div>

      {/* Checklist */}
      <div className="space-y-1.5">
        {filtered.map((item) => {
          const isDone = checked.has(item.id);
          const cat = CATEGORY_CONFIG[item.category];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                isDone
                  ? 'bg-green-500/5 border-green-500/20 opacity-70'
                  : item.critical
                  ? `bg-dark-card border-red-500/20 hover:border-red-500/40`
                  : 'bg-dark-card border-dark-border hover:border-dark-hover'
              }`}
            >
              {/* Checkbox */}
              <div className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                isDone ? 'bg-green-500 border-green-500' : item.critical ? 'border-red-400' : 'border-gray-600'
              }`}>
                {isDone && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* Time */}
              <span className="text-xs font-mono text-gray-500 flex-shrink-0 w-10">{item.time}</span>

              {/* Task */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${isDone ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                  {item.critical && !isDone && <span className="text-red-400 mr-1">●</span>}
                  {item.task}
                </p>
              </div>

              {/* Category */}
              <span className={`text-[10px] hidden sm:block flex-shrink-0 ${cat.color}`}>
                {cat.emoji} {cat.label}
              </span>

              {/* Who */}
              <span className="text-xs text-gray-500 flex-shrink-0">
                {item.whoEmoji} {item.who}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reset button */}
      {checked.size > 0 && (
        <button
          type="button"
          onClick={() => setChecked(new Set())}
          className="text-xs text-gray-600 hover:text-red-400 transition-colors print:hidden"
        >
          ↺ Hammasini qaytarish
        </button>
      )}
    </div>
  );
}
