import { useLaunchStore } from '../store/launchStore';

export default function XPPopups() {
  const xpPopups = useLaunchStore((s) => s.xpPopups);

  if (xpPopups.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {xpPopups.map((popup) => (
        <div
          key={popup.id}
          className="animate-xp-pop bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-full shadow-lg text-sm flex items-center gap-2"
        >
          <span>⚡</span>
          <span>+{popup.amount} XP</span>
          <span className="font-normal text-yellow-800 truncate max-w-[160px]">{popup.taskTitle}</span>
        </div>
      ))}
    </div>
  );
}
