import { useState, useEffect } from 'react';
import { useLaunchStore } from '../store/launchStore';
import {
  BONUS_REWARDS,
  TIER_CONFIG,
  computeBonusProgress,
  ALMOST_THERE_MESSAGES,
  UNLOCK_MESSAGES,
  type BonusProgress,
  type BonusTier,
} from '../data/bonusSystem';
import type { BonusReward } from '../data/bonusSystem';

const FILTER_TABS = [
  { id: 'all',      label: 'Hammasi',   emoji: '🎁' },
  { id: 'active',   label: 'Jarayonda', emoji: '🔥' },
  { id: 'unlocked', label: 'Ochildi',   emoji: '✅' },
  { id: 'phase',    label: 'Bosqichlar', emoji: '🚀' },
  { id: 'kpi',      label: 'Natijalar', emoji: '📊' },
  { id: 'streak',   label: 'Streak',    emoji: '⚡' },
] as const;

type FilterId = typeof FILTER_TABS[number]['id'];

// ─── Mystery Box Card ─────────────────────────────────────────────────────────

function BonusCard({
  progress,
  onReveal,
}: {
  progress: BonusProgress;
  onReveal: (bonus: BonusReward) => void;
}) {
  const { bonus, currentValue, targetValue, percentage, isUnlocked } = progress;
  const tier = TIER_CONFIG[bonus.tier];
  const [shaking, setShaking] = useState(false);

  // Shake animation when >80% complete
  useEffect(() => {
    if (percentage >= 80 && percentage < 100) {
      const interval = setInterval(() => {
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [percentage]);

  const isAlmostThere = percentage >= 70 && percentage < 100;
  const almostMsg = ALMOST_THERE_MESSAGES[Math.floor(Math.random() * ALMOST_THERE_MESSAGES.length)];

  return (
    <div
      className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
        isUnlocked
          ? `${tier.border} ${tier.bg} shadow-lg ${tier.glow}`
          : isAlmostThere
          ? 'border-amber-500/50 bg-amber-500/5 shadow-amber-500/20 shadow-md'
          : 'border-dark-border bg-dark-card'
      }`}
    >
      {/* Tier badge */}
      <div className="absolute top-3 left-3">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tier.bg} ${tier.color} border ${tier.border}`}>
          {tier.star} {tier.label}
        </span>
      </div>

      {/* Surprise level indicator (locked only) */}
      {!isUnlocked && (
        <div className="absolute top-3 right-3 flex gap-0.5">
          {Array.from({ length: bonus.surpriseLevel }).map((_, i) => (
            <span key={i} className="text-[10px] text-amber-400">⭐</span>
          ))}
        </div>
      )}

      <div className="p-4 pt-10">
        {/* Mystery box or revealed content */}
        {isUnlocked ? (
          /* REVEALED */
          <div className="text-center">
            <div className="text-5xl mb-3 animate-bounce">{bonus.actualEmoji}</div>
            <h3 className={`font-black text-base leading-tight ${tier.color}`}>
              {bonus.actualTitle}
            </h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              {bonus.actualDescription}
            </p>
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-400 font-semibold">Ochildi! Barakalla! 🎉</span>
            </div>
          </div>
        ) : (
          /* LOCKED / MYSTERY */
          <div className="text-center">
            {/* Animated mystery box */}
            <div
              className={`text-6xl mb-3 inline-block cursor-pointer select-none transition-transform ${
                shaking ? 'animate-bounce' : ''
              } ${percentage >= 50 ? 'hover:scale-110' : ''}`}
              onClick={() => percentage >= 100 && onReveal(bonus)}
              title={percentage >= 100 ? 'Ochish uchun bosing!' : 'Bajarish davom eting'}
            >
              {percentage >= 100 ? '🎁' : percentage >= 70 ? '🔒' : '📦'}
            </div>

            <h3 className="font-bold text-white text-sm leading-tight">
              {bonus.teaserTitle}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{bonus.teaserHint}</p>

            {isAlmostThere && (
              <p className="text-xs text-amber-400 font-semibold mt-2 animate-pulse">
                {almostMsg}
              </p>
            )}

            {percentage >= 100 && (
              <button
                type="button"
                onClick={() => onReveal(bonus)}
                className="mt-3 btn-gold text-xs py-2 px-4 animate-pulse"
              >
                🎁 Ochish!
              </button>
            )}
          </div>
        )}

        {/* Progress bar */}
        {!isUnlocked && (
          <div className="mt-4">
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>Bajarildi</span>
              <span className={percentage >= 70 ? 'text-amber-400 font-bold' : ''}>
                {currentValue} / {targetValue}
              </span>
            </div>
            <div className="h-2 bg-dark-hover rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  percentage >= 100
                    ? 'bg-green-500'
                    : percentage >= 70
                    ? 'bg-amber-500'
                    : percentage >= 40
                    ? 'bg-gold'
                    : 'bg-gray-600'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-right mt-0.5">
              <span className={`text-[10px] font-bold ${
                percentage >= 100 ? 'text-green-400' : percentage >= 70 ? 'text-amber-400' : 'text-gray-600'
              }`}>
                {percentage}%
              </span>
            </div>
          </div>
        )}

        {/* Who gets it */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-[10px] text-gray-600">Kimga:</span>
          <span className="text-[10px] font-medium text-gray-400 bg-dark-surface px-2 py-0.5 rounded-full">
            {bonus.assigneeLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Reveal Modal ─────────────────────────────────────────────────────────────

function RevealModal({
  bonus,
  onClose,
  onConfirm,
}: {
  bonus: BonusReward;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [step, setStep] = useState<'teaser' | 'reveal'>('teaser');
  const tier = TIER_CONFIG[bonus.tier];
  const unlockMsg = UNLOCK_MESSAGES[Math.floor(Math.random() * UNLOCK_MESSAGES.length)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className={`bg-dark-card border-2 ${tier.border} rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden`}>

        {step === 'teaser' ? (
          <div className="p-8 text-center space-y-5">
            <div className="text-8xl animate-bounce">🎁</div>
            <h2 className="text-xl font-black text-white">Siz bu mukofotga loyiqsiz!</h2>
            <p className="text-gray-400 text-sm">
              Maqsad bajarildi — ichida nima borligini bilmaysiz... Ochishga tayyormisiz?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('reveal')}
                className="btn-gold flex-1 py-3 font-black text-lg"
              >
                🎁 Ha, OCHAMAN!
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 border border-dark-border rounded-xl text-gray-400 text-sm"
              >
                Keyin
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            {/* Celebration */}
            <p className={`text-sm font-black uppercase tracking-widest ${tier.color}`}>
              {unlockMsg}
            </p>

            <div className="text-7xl my-3">{bonus.actualEmoji}</div>

            <div className={`rounded-2xl border ${tier.border} ${tier.bg} p-4`}>
              <h2 className={`text-lg font-black ${tier.color} leading-tight`}>
                {bonus.actualTitle}
              </h2>
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                {bonus.actualDescription}
              </p>
            </div>

            <div className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <span>Kimga:</span>
              <span className="font-semibold text-gray-400">{bonus.assigneeLabel}</span>
            </div>

            <button
              type="button"
              onClick={() => { onConfirm(); onClose(); }}
              className="w-full btn-gold py-3 font-black"
            >
              ✓ Qabul qilindi! Rahmat!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Bonuses() {
  const {
    kpis, totalXP, streak,
    tasks, unlockedBonuses, unlockBonus,
    getPhaseProgress,
  } = useLaunchStore();

  const [filter, setFilter] = useState<FilterId>('all');
  const [revealingBonus, setRevealingBonus] = useState<BonusReward | null>(null);
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);

  const phaseProgress: Record<number, number> = {};
  for (let i = 1; i <= 5; i++) phaseProgress[i] = getPhaseProgress(i);

  const allPhasesComplete = Object.values(phaseProgress).every((p) => p === 100);

  const allProgress: BonusProgress[] = BONUS_REWARDS.map((bonus) =>
    computeBonusProgress(bonus, kpis, totalXP, streak, phaseProgress, allPhasesComplete, unlockedBonuses)
  );

  const unlockedCount = allProgress.filter((p) => p.isUnlocked).length;
  const totalCount = allProgress.length;
  const nearlyUnlocked = allProgress.filter((p) => p.percentage >= 70 && !p.isUnlocked).length;

  function filterProgress(p: BonusProgress): boolean {
    if (filter === 'unlocked') return p.isUnlocked;
    if (filter === 'active') return !p.isUnlocked && p.percentage > 0;
    if (filter === 'phase') return p.bonus.condition.type === 'phase_complete' || p.bonus.condition.type === 'all_phases';
    if (filter === 'kpi') return p.bonus.condition.type.startsWith('kpi');
    if (filter === 'streak') return p.bonus.condition.type === 'streak' || p.bonus.condition.type === 'xp';
    return true;
  }

  const filtered = allProgress.filter(filterProgress);

  // Sort: unlocked first (by tier desc), then by percentage desc
  const tierOrder: BonusTier[] = ['legendary', 'platinum', 'gold', 'silver', 'bronze'];
  const sorted = [...filtered].sort((a, b) => {
    if (a.isUnlocked !== b.isUnlocked) return a.isUnlocked ? -1 : 1;
    if (a.percentage !== b.percentage) return b.percentage - a.percentage;
    return tierOrder.indexOf(a.bonus.tier) - tierOrder.indexOf(b.bonus.tier);
  });

  function handleReveal(bonus: BonusReward) {
    setRevealingBonus(bonus);
  }

  function handleConfirmReveal() {
    if (revealingBonus) {
      unlockBonus(revealingBonus.id);
      setJustUnlocked(revealingBonus.id);
      setTimeout(() => setJustUnlocked(null), 3000);
    }
    setRevealingBonus(null);
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">

      {/* Hero header */}
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-dark-card via-dark-surface to-dark-card p-6">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 text-[120px] opacity-5 leading-none pointer-events-none">🏆</div>

        <div className="relative">
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-1">Motivatsiya & Bonus Tizimi</p>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
            Mukofotlar Xazinasi 🎁
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-xl">
            Har bir maqsadda syurpriz kutmoqda. Natijaga qara — mukofot o'zi keladi.
            <span className="text-amber-400 font-semibold"> Qanday syurpriz? — Ochganingizda bilib olasiz!</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            <div className="bg-dark-bg/60 rounded-xl p-3 text-center border border-dark-border">
              <p className="text-2xl font-black text-gold">{unlockedCount}</p>
              <p className="text-xs text-gray-500 mt-0.5">Ochildi</p>
            </div>
            <div className="bg-dark-bg/60 rounded-xl p-3 text-center border border-dark-border">
              <p className="text-2xl font-black text-white">{totalCount}</p>
              <p className="text-xs text-gray-500 mt-0.5">Jami mukofot</p>
            </div>
            <div className="bg-dark-bg/60 rounded-xl p-3 text-center border border-amber-500/20">
              <p className="text-2xl font-black text-amber-400">{nearlyUnlocked}</p>
              <p className="text-xs text-gray-500 mt-0.5">Yaqin qoldi</p>
            </div>
            <div className="bg-dark-bg/60 rounded-xl p-3 text-center border border-dark-border">
              <p className="text-2xl font-black text-purple-400">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Yutuq faizi</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI snapshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Leadlar', value: kpis.leads, max: 200, emoji: '🎯', color: 'text-purple-400' },
          { label: 'Seminar sotuv', value: kpis.seminarSales, max: 20, emoji: '🎤', color: 'text-green-400' },
          { label: 'Kurs sotuv', value: kpis.courseSales, max: 20, emoji: '📚', color: 'text-blue-400' },
          { label: 'Streak', value: streak, max: 14, emoji: '🔥', color: 'text-orange-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-dark-card border border-dark-border rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">{stat.emoji}</span>
              <span className={`text-xs font-bold ${stat.color}`}>{stat.value}/{stat.max}</span>
            </div>
            <p className="text-[10px] text-gray-500 mb-1.5">{stat.label}</p>
            <div className="h-1.5 bg-dark-hover rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  stat.value >= stat.max ? 'bg-green-500' : 'bg-current'
                }`}
                style={{
                  width: `${Math.min(100, Math.round((stat.value / stat.max) * 100))}%`,
                  color: stat.color.replace('text-', '').replace('-400', ''),
                  backgroundColor: stat.value >= stat.max ? '' : undefined,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTER_TABS.map((tab) => {
          const count = tab.id === 'all' ? totalCount
            : tab.id === 'unlocked' ? allProgress.filter((p) => p.isUnlocked).length
            : tab.id === 'active' ? allProgress.filter((p) => !p.isUnlocked && p.percentage > 0).length
            : tab.id === 'phase' ? allProgress.filter((p) => ['phase_complete','all_phases'].includes(p.bonus.condition.type)).length
            : tab.id === 'kpi' ? allProgress.filter((p) => p.bonus.condition.type.startsWith('kpi')).length
            : allProgress.filter((p) => ['streak','xp'].includes(p.bonus.condition.type)).length;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                filter === tab.id
                  ? 'bg-gold/20 border-gold/50 text-gold'
                  : 'bg-dark-card border-dark-border text-gray-400 hover:border-dark-hover'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
              <span className="text-[10px] text-gray-600">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Bonus grid */}
      {sorted.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-500">Bu kategoriyada mukofot topilmadi</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((progress) => (
            <BonusCard
              key={progress.bonus.id}
              progress={progress}
              onReveal={handleReveal}
            />
          ))}
        </div>
      )}

      {/* Motivational footer */}
      <div className="rounded-2xl border border-dark-border bg-dark-card p-5 text-center">
        <p className="text-2xl mb-2">🚀</p>
        <p className="text-white font-bold">Maqsad — natija — mukofot!</p>
        <p className="text-gray-500 text-sm mt-1">
          Har bir bajarilgan task sizi katta mukofotga yaqinlashtiradi.
          Kuting... syurpriz kutmoqda!
        </p>
      </div>

      {/* Reveal modal */}
      {revealingBonus && (
        <RevealModal
          bonus={revealingBonus}
          onClose={() => setRevealingBonus(null)}
          onConfirm={handleConfirmReveal}
        />
      )}

      {/* Just unlocked toast */}
      {justUnlocked && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gold text-dark-bg font-black text-sm px-6 py-3 rounded-full shadow-2xl animate-bounce">
          🎉 Mukofot ochildi! Barakalla!
        </div>
      )}
    </div>
  );
}
