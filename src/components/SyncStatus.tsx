import { useBackendStore } from '../store/backendStore';

export default function SyncStatus() {
  const { syncStatus, lastSyncAt, isOnline } = useBackendStore();

  if (syncStatus === 'offline') return null;

  const configs = {
    idle:    { dot: 'bg-gray-500',  label: '',                text: 'text-gray-500' },
    syncing: { dot: 'bg-blue-400 animate-pulse', label: 'Sync...', text: 'text-blue-400' },
    synced:  { dot: 'bg-green-500', label: 'Synced',          text: 'text-green-400' },
    error:   { dot: 'bg-red-500',   label: 'Sync error',      text: 'text-red-400' },
    offline: { dot: 'bg-gray-600',  label: 'Offline',         text: 'text-gray-500' },
  };

  const c = configs[syncStatus];
  const lastSync = lastSyncAt
    ? new Date(lastSyncAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div className="flex items-center gap-1.5" title={lastSync ? `Oxirgi sync: ${lastSync}` : undefined}>
      {!isOnline && (
        <span className="text-[10px] text-orange-400 bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded-full">
          📵 Offline
        </span>
      )}
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
      {c.label && <span className={`text-[10px] ${c.text}`}>{c.label}</span>}
    </div>
  );
}
