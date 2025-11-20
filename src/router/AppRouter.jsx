/**
 * App Router Configuration
 * Defines all routes for the application with React Router
 * Uses lazy loading for better performance
 */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../utils/helpers';
import InlineAuth from '../components/auth/InlineAuth';

// Eagerly load critical pages
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import AppLayout from '../layouts/AppLayout';

// Lazy load other pages for better initial load performance
const CourseContent = lazy(() => import('../components/app/CourseContent'));
const TestsContent = lazy(() => import('../components/app/TestsContent'));
const LessonsContent = lazy(() => import('../components/app/LessonsContent'));
const InsightsPage = lazy(() => import('../pages/InsightsPage'));
const UpgradePage = lazy(() => import('../pages/UpgradePage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));

/**
 * Loading component for route transitions
 */
function RouteLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#ffffff'
    }}>
      <div style={{
        color: '#1a1a1a',
        fontSize: '1.2rem',
        animation: 'pulse 1.5s ease-in-out infinite'
      }}>
        Loading...
      </div>
    </div>
  );
}

/**
 * Protected Route wrapper
 * Shows inline auth if not authenticated (keeps sidebar visible)
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteLoader />;
  }

  // If not authenticated, show inline auth in the content area
  if (!user) {
    return <InlineAuth />;
  }

  return children;
}

/**
 * Public Route wrapper
 * Redirects to /app/home if already authenticated
 */
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteLoader />;
  }

  if (user) {
    return <Navigate to="/app/home" replace />;
  }

  return children;
}

/**
 * Main App Router
 */
export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          {/* Landing Page - Always accessible */}
          <Route path="/" element={<LandingPage />} />

          {/* Legacy login route - redirect to home */}
          <Route path="/login" element={
            user ? <Navigate to="/app/home" replace /> : <Navigate to="/" replace />
          } />

          {/* App Routes - Sidebar always visible, content locked until login */}
          <Route path="/app/*" element={<AppLayout />}>
            {/* Nested routes inside AppLayout */}
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={
              <ProtectedRoute>
                <Suspense fallback={<RouteLoader />}>
                  <CourseContent />
                </Suspense>
              </ProtectedRoute>
            } />
            <Route path="tests" element={
              <ProtectedRoute>
                <Suspense fallback={<RouteLoader />}>
                  <TestsContent />
                </Suspense>
              </ProtectedRoute>
            } />
            <Route path="lessons" element={
              <ProtectedRoute>
                <Suspense fallback={<RouteLoader />}>
                  <LessonsContent />
                </Suspense>
              </ProtectedRoute>
            } />
            <Route path="insights" element={
              <ProtectedRoute>
                <Suspense fallback={<RouteLoader />}>
                  <InsightsPage />
                </Suspense>
              </ProtectedRoute>
            } />
            <Route path="upgrade" element={
              <ProtectedRoute>
                <Suspense fallback={<RouteLoader />}>
                  <UpgradePage />
                </Suspense>
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <Suspense fallback={<RouteLoader />}>
                  <ProfilePage />
                </Suspense>
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute>
                <Suspense fallback={<RouteLoader />}>
                  <SettingsPage />
                </Suspense>
              </ProtectedRoute>
            } />
          </Route>

          {/* Catch all - redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
