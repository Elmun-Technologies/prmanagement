import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useLaunchStore } from '../store/launchStore';
import ProgressBar from '../components/ProgressBar';

const XP_LEVELS = [
  { level: 1, name: 'Yangi Boshlovchi', minXP: 0, color: 'text-gray-500' },
  { level: 2, name: 'Tadbirkor', minXP: 200, color: 'text-blue-500' },
  { level: 3, name: 'Strateg', minXP: 500, color: 'text-purple-500' },
  { level: 4, name: 'Marketolog', minXP: 1000, color: 'text-yellow-500' },
  { level: 5, name: 'Sotuv Ustasi', minXP: 2000, color: 'text-orange-500' },
  { level: 6, name: 'Zapusk Chempioni', minXP: 3500, color: 'text-red-500' },
  { level: 7, name: 'Moysklad Legend', minXP: 5000, color: 'text-pink-500' },
];

function getCurrentLevel(xp: number) {
  let current = XP_LEVELS[0];
  let next = XP_LEVELS[1];
  for (let i = 0; i < XP_LEVELS.length; i++) {
    if (xp >= XP_LEVELS[i].minXP) {
      current = XP_LEVELS[i];
      next = XP_LEVELS[i + 1] || XP_LEVELS[i];
    }
  }
  return { current, next };
}

const BADGE_TIPS: Record<string, string> = {
  startap: 'Faza 1 ni 100% bajaring',
  trafikchi: '50 ta lead yig\'ing',
  sozlovchi: 'Faza 2 ni 100% bajaring',
  olov: '3 kun ketma-ket ishlang',
  seminar_usta: 'Seminarda 10+ kurs soting',
  sotuv_masteri: 'Jami 15 ta kurs soting',
  streak7: '7 kun uzluksiz ishlang',
  champion: 'Barcha tasklar 100% bajarilsin',
  avtomat: '100+ lead ManyChat orqali kelsin',
};

export default function Gamification() {
  const { totalXP, streak, badges, tasks, team } = useLaunchStore();
  const { current: level, next: nextLevel } = getCurrentLevel(totalXP);
  const prevXP = useRef(totalXP);

  const earnedBadges = badges.filter((b) => b.earned);
  const unearnedBadges = badges.filter((b) => !b.earned);

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === 'done').length;

  // Fire confetti on new badge
  useEffect(() => {
    if (totalXP > prevXP.current && earnedBadges.length > 0) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
    prevXP.current = totalXP;
  }, [earnedBadges.length]);

  const xpToNextLevel = nextLevel.minXP - level.minXP;
  const xpInCurrentLevel = totalXP - level.minXP;
  const levelProgress = level.level === nextLevel.level ? 100 : Math.round((xpInCurrentLevel / xpToNextLevel) * 100);

  // Leaderboard sorted by XP
  const leaderboard = [...team].sort((a, b) => b.xp - a.xp);

  const RANK_STYLES = [
    'bg-yellow-400 text-yellow-900',
    'bg-gray-400 text-gray-900',
    'bg-orange-400 text-orange-900',
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Yutuqlar & Gamifikatsiya</h1>
        <p className="text-gray-500 text-sm mt-1">XP yig'ing, badge oling, jamoada birinchi bo'ling</p>
      </div>

      {/* XP Level */}
      <div className="card bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-indigo-200 text-sm">Daraja {level.level}</p>
            <h2 className="text-2xl font-black">{level.name}</h2>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black">⚡ {totalXP.toLocaleString()}</p>
            <p className="text-indigo-200 text-sm">XP</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-indigo-200 text-xs mb-1">
            <span>{level.name} ({level.minXP} XP)</span>
            {level.level !== nextLevel.level && (
              <span>{nextLevel.name} ({nextLevel.minXP} XP)</span>
            )}
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="h-3 bg-white rounded-full transition-all duration-700"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          {level.level !== nextLevel.level && (
            <p className="text-indigo-200 text-xs mt-1 text-right">
              {nextLevel.minXP - totalXP} XP qoldi
            </p>
          )}
        </div>

        {/* Level path */}
        <div className="mt-4 flex items-center gap-1 overflow-x-auto pb-1">
          {XP_LEVELS.map((lvl) => (
            <div key={lvl.level} className="flex items-center gap-1 flex-shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                totalXP >= lvl.minXP ? 'bg-white text-indigo-700' : 'bg-white/20 text-white/50'
              }`}>
                {lvl.level}
              </div>
              {lvl.level < XP_LEVELS.length && (
                <div className={`w-6 h-0.5 ${totalXP >= lvl.minXP ? 'bg-white' : 'bg-white/20'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        <div className="card text-center">
          <p className="text-3xl font-bold text-orange-500">🔥{streak}</p>
          <p className="text-xs text-gray-500 mt-1">Streak (kun)</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-400">{doneTasks}</p>
          <p className="text-xs text-gray-500 mt-1">Task bajarildi</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-gold">{earnedBadges.length}</p>
          <p className="text-xs text-gray-500 mt-1">Badge olindi</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-blue-400">{Math.round((doneTasks / totalTasks) * 100)}%</p>
          <p className="text-xs text-gray-500 mt-1">Umumiy progress</p>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-lg font-bold text-white mb-3">🏅 Badgelar</h2>

        {earnedBadges.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2">Olingan</p>
            <div className="grid grid-cols-3 gap-3">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="card border-2 border-gold/50 bg-gold/10 text-center">
                  <span className="text-4xl">{badge.emoji}</span>
                  <p className="font-bold text-sm mt-2 text-gold">{badge.name}</p>
                  <p className="text-xs text-gold/70 mt-1">{badge.description}</p>
                  {badge.earnedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(badge.earnedAt).toLocaleDateString('uz-UZ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Qolgan ({unearnedBadges.length})</p>
          <div className="grid grid-cols-3 gap-3">
            {unearnedBadges.map((badge) => (
              <div key={badge.id} className="card border border-dark-border text-center opacity-50">
                <span className="text-4xl grayscale">{badge.emoji}</span>
                <p className="font-bold text-sm mt-2 text-gray-400">{badge.name}</p>
                <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                <p className="text-xs text-blue-400 mt-1 font-medium">
                  💡 {BADGE_TIPS[badge.id] || badge.condition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <h2 className="text-lg font-bold text-white mb-3">🏆 Jamoa Reytingi</h2>
        <div className="space-y-2">
          {leaderboard.map((member, idx) => (
            <div key={member.id} className="card flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${
                RANK_STYLES[idx] || 'bg-dark-surface text-gray-300'
              }`}>
                {idx + 1}
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                {member.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{member.name}</p>
                <p className="text-gray-500 text-xs">{member.role}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gold">⚡ {member.xp}</p>
                <p className="text-xs text-gray-400">{member.tasksCompleted} task</p>
              </div>
              <div className="w-20">
                <ProgressBar
                  value={member.xp}
                  max={Math.max(...leaderboard.map((m) => m.xp), 1)}
                  color="bg-yellow-400"
                  height="h-1.5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak info */}
      <div className="card bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Streak tizimi</p>
            <h3 className="text-xl font-bold mt-0.5">🔥 {streak} kun ketma-ket</h3>
          </div>
          <div className="text-right">
            {streak < 3 && <p className="text-orange-200 text-sm">"Olov" badge uchun {3 - streak} kun</p>}
            {streak >= 3 && streak < 7 && <p className="text-orange-200 text-sm">"Chempion" uchun {7 - streak} kun</p>}
            {streak >= 7 && <p className="text-orange-200 text-sm">Ajoyib! Davom eting!</p>}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                i < streak ? 'bg-white text-orange-600' : 'bg-white/20 text-white/40'
              }`}
            >
              {i < streak ? '🔥' : (i + 1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
