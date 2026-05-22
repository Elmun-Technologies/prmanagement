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
import RoleSelector from './pages/RoleSelector';
import RoleHome from './pages/RoleHome';
import Bonuses from './pages/Bonuses';
import LaunchDayChecklist from './pages/LaunchDayChecklist';
import Standup from './pages/Standup';
import Analytics from './pages/Analytics';
import Calendar from './pages/CalendarView';
import GlobalSearch, { useGlobalSearch } from './components/GlobalSearch';
import { useAuthStore } from './store/authStore';

function AppShell() {
  const { isLoggedIn, hasFullAccess } = useAuthStore();
  const { open: searchOpen, setOpen: setSearchOpen } = useGlobalSearch();

  // Show role selector if not logged in
  if (!isLoggedIn()) {
    return <RoleSelector />;
  }

  const fullAccess = hasFullAccess();

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto min-h-screen">
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
