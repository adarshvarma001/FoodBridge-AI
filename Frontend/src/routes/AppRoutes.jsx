import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import RoleSelectionPage from '../pages/auth/RoleSelectionPage';
import DonorDashboard from '../pages/donor/DonorDashboard';
import CreateDonation from '../pages/donor/CreateDonation';
import NgoDashboard from '../pages/ngo/NgoDashboard';
import VolunteerDashboard from '../pages/volunteer/VolunteerDashboard';
import AgentCenter from '../pages/agents/AgentCenter';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Forbidden from '../pages/common/Forbidden';
import NotFound from '../pages/common/NotFound';

// Route protection
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== 'ADMIN') {
    return <Forbidden />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/:role" element={<RoleSelectionPage />} />
      </Route>

      {/* Donor Routes */}
      <Route element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/donor/dashboard" element={
          <ProtectedRoute requiredRole="DONOR">
            <DonorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/donor/donations" element={
          <ProtectedRoute requiredRole="DONOR">
            <CreateDonation />
          </ProtectedRoute>
        } />
        <Route path="/donor/urgency" element={
          <ProtectedRoute requiredRole="DONOR">
            <DonorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/donor/analytics" element={
          <ProtectedRoute requiredRole="DONOR">
            <DonorDashboard />
          </ProtectedRoute>
        } />
      </Route>

      {/* NGO Routes */}
      <Route element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/ngo/dashboard" element={
          <ProtectedRoute requiredRole="NGO">
            <NgoDashboard />
          </ProtectedRoute>
        } />
        <Route path="/ngo/discover" element={
          <ProtectedRoute requiredRole="NGO">
            <NgoDashboard />
          </ProtectedRoute>
        } />
        <Route path="/ngo/demand" element={
          <ProtectedRoute requiredRole="NGO">
            <NgoDashboard />
          </ProtectedRoute>
        } />
        <Route path="/ngo/capacity" element={
          <ProtectedRoute requiredRole="NGO">
            <NgoDashboard />
          </ProtectedRoute>
        } />
      </Route>

      {/* Volunteer Routes */}
      <Route element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/volunteer/dashboard" element={
          <ProtectedRoute requiredRole="VOLUNTEER">
            <VolunteerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/volunteer/tasks" element={
          <ProtectedRoute requiredRole="VOLUNTEER">
            <VolunteerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/volunteer/route" element={
          <ProtectedRoute requiredRole="VOLUNTEER">
            <VolunteerDashboard />
          </ProtectedRoute>
        } />
      </Route>

      {/* Agent Center (all logged-in roles) */}
      <Route element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/agents" element={<AgentCenter />} />
      </Route>

      {/* Admin Routes */}
      <Route element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
