import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import XPPopups from './components/XPPopups';
import LaunchHome from './pages/LaunchHome';
import StagePage from './pages/StagePage';
import Dashboard from './pages/Dashboard';
import PhasePage from './pages/PhasePage';
import SubModulePage from './pages/SubModulePage';
import DailyTodo from './pages/DailyTodo';
import Gamification from './pages/Gamification';
import Team from './pages/Team';
import KPITracker from './pages/KPITracker';
import FinanceModel from './pages/FinanceModel';
import RoleHome from './pages/RoleHome';
import Bonuses from './pages/Bonuses';
import LaunchDayChecklist from './pages/LaunchDayChecklist';
import Standup from './pages/Standup';
import Analytics from './pages/Analytics';
import Calendar from './pages/CalendarView';
import GlobalSearch, { useGlobalSearch } from './components/GlobalSearch';
import SyncStatus from './components/SyncStatus';
import { useAuthStore } from './store/authStore';
import { useBackendStore } from './store/backendStore';
import Login from './pages/Login';
import { useState, useEffect } from 'react';

function AppShell() {
  const { isLoggedIn, hasFullAccess, initAuth, initialized } = useAuthStore();
  const { initialize: initBackend } = useBackendStore();
  const { open: searchOpen, setOpen: setSearchOpen } = useGlobalSearch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize auth + backend on mount
  useEffect(() => {
    initAuth().then(() => initBackend());
  }, []);

  // Show loading splash while auth initializes
  if (!initialized) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center font-black text-3xl text-dark-bg mx-auto mb-4 animate-pulse">M</div>
          <p className="text-gray-500 text-sm">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  // Show login if not logged in
  if (!isLoggedIn()) {
    return <Login />;
  }

  const fullAccess = hasFullAccess();

  return (
    <div className="flex min-h-screen bg-dark-bg">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile unless open */}
      <div className={`fixed md:sticky top-0 z-40 md:z-auto h-screen transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="flex-1 overflow-y-auto min-h-screen">
        {/* Mobile topbar */}
        <div className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-dark-card border-b border-dark-border md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white text-xl"
          >
            ☰
          </button>
          <span className="font-bold text-white flex-1">MoySklad Zapusk</span>
          <SyncStatus />
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="text-gray-400 hover:text-white ml-2"
          >
            🔍
          </button>
        </div>
        <Routes>
          {/* Common routes for all roles */}
          <Route path="/daily" element={<DailyTodo />} />

          {/* Role-specific home */}
          <Route path="/role-home" element={<RoleHome />} />

          {/* Full access routes — redirect restricted users to their home */}
          <Route path="/" element={fullAccess ? <LaunchHome /> : <Navigate to="/role-home" replace />} />
          <Route path="/stage/:stageId" element={fullAccess ? <StagePage /> : <Navigate to="/role-home" replace />} />
          <Route path="/dashboard" element={fullAccess ? <Dashboard /> : <Navigate to="/role-home" replace />} />
          <Route path="/phase/:phaseId" element={fullAccess ? <PhasePage /> : <Navigate to="/role-home" replace />} />
          <Route path="/phase/:phaseId/sub/:subId" element={fullAccess ? <SubModulePage /> : <Navigate to="/role-home" replace />} />
          <Route path="/kpi" element={fullAccess ? <KPITracker /> : <Navigate to="/role-home" replace />} />
          <Route path="/gamification" element={fullAccess ? <Gamification /> : <Navigate to="/role-home" replace />} />
          <Route path="/team" element={fullAccess ? <Team /> : <Navigate to="/role-home" replace />} />
          <Route path="/finance" element={fullAccess ? <FinanceModel /> : <Navigate to="/role-home" replace />} />
          <Route path="/bonuses"     element={<Bonuses />} />
          <Route path="/launch-day"  element={<LaunchDayChecklist />} />
          <Route path="/standup"     element={<Standup />} />
          <Route path="/analytics"   element={fullAccess ? <Analytics /> : <Navigate to="/role-home" replace />} />
          <Route path="/calendar"    element={<Calendar />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={fullAccess ? '/' : '/role-home'} replace />} />
        </Routes>
      </main>
      <XPPopups />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppShell />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
