interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  color = 'bg-blue-500',
  height = 'h-2',
  showLabel = false,
  label,
  animated = true,
  className = '',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-gray-400">{label}</span>}
          {showLabel && <span className="text-xs font-semibold text-gray-300">{pct}%</span>}
        </div>
      )}
      <div className={`w-full bg-dark-hover rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} ${color} rounded-full ${animated ? 'transition-all duration-700 ease-out' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
