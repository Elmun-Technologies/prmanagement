import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <div className="flex min-h-screen bg-dark-bg">
        <Sidebar />
        <main className="flex-1 overflow-y-auto min-h-screen">
          <Routes>
            <Route path="/" element={<LaunchHome />} />
            <Route path="/stage/:stageId" element={<StagePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/daily" element={<DailyTodo />} />
            {/* Bo'lim (Phase) */}
            <Route path="/phase/:phaseId" element={<PhasePage />} />
            {/* Bo'limcha (Sub-module) */}
            <Route path="/phase/:phaseId/sub/:subId" element={<SubModulePage />} />
            <Route path="/kpi" element={<KPITracker />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/team" element={<Team />} />
            <Route path="/finance" element={<FinanceModel />} />
          </Routes>
        </main>
        <XPPopups />
      </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
