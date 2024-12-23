import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import { AuthGuard } from './components/layout/AuthGuard';
import Dashboard from './pages/Dashboard/Dashboard';
import Ambulances from './pages/Ambulances/Ambulances';
import Trips from './pages/Trips/Trips';
import Hospitals from './pages/Hospitals/Hospitals';
import Staff from './pages/Staff/Staff';
import Patients from './pages/Patients/Patients';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Layout />
              </AuthGuard>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="ambulances" element={<Ambulances />} />
            <Route path="trips" element={<Trips />} />
            <Route path="hospitals" element={<Hospitals />} />
            <Route path="staff" element={<Staff />} />
            <Route path="patients" element={<Patients />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;