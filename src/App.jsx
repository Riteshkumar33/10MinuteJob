import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WorkerProvider } from './context/WorkerContext';

import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import WorkerProfilePage from './pages/WorkerProfilePage';
import EmployerSearchPage from './pages/EmployerSearchPage';
import FindJobsPage from './pages/FindJobsPage';

function App() {
  return (
    <WorkerProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/search" replace />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<WorkerProfilePage />} />
            <Route path="/search" element={<EmployerSearchPage />} />
            <Route path="/jobs" element={<FindJobsPage />} />
          </Routes>
        </div>
      </Router>
    </WorkerProvider>
  );
}

export default App;
