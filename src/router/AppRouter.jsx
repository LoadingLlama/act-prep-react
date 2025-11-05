/**
 * App Router Configuration
 * Defines all routes for the application with React Router
 * Uses lazy loading for better performance
 */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { onboardingUtils, storage } from '../utils/helpers';

// Eagerly load critical pages
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import AppLayout from '../layouts/AppLayout';

// Lazy load other pages for better initial load performance
const OnboardingQuestionnaire = lazy(() => import('../components/auth/OnboardingQuestionnaire'));
const Home = lazy(() => import('../components/Home'));
const CourseContent = lazy(() => import('../components/app/CourseContent'));
const TestsContent = lazy(() => import('../components/app/TestsContent'));
const LessonsContent = lazy(() => import('../components/app/LessonsContent'));
const ResultsPage = lazy(() => import('../pages/ResultsPage'));
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
 * Redirects to landing page if not authenticated
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteLoader />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
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
  // Handler for onboarding completion when accessed directly (not logged in)
  // Note: Primary flow is now Login → Onboarding, so this is rarely used
  const handleOnboardingComplete = (data, action) => {
    console.log('⚠️ Public onboarding completed - redirecting to login');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } />

          <Route path="/onboarding" element={
            <PublicRoute>
              <Suspense fallback={<RouteLoader />}>
                <OnboardingQuestionnaire onComplete={handleOnboardingComplete} />
              </Suspense>
            </PublicRoute>
          } />

          <Route path="/login" element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          } />

          {/* Protected Routes - All under /app/* */}
          <Route path="/app/*" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            {/* Nested routes inside AppLayout */}
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={
              <Suspense fallback={<RouteLoader />}>
                <Home />
              </Suspense>
            } />
            <Route path="course" element={
              <Suspense fallback={<RouteLoader />}>
                <CourseContent />
              </Suspense>
            } />
            <Route path="tests" element={
              <Suspense fallback={<RouteLoader />}>
                <TestsContent />
              </Suspense>
            } />
            <Route path="lessons" element={
              <Suspense fallback={<RouteLoader />}>
                <LessonsContent />
              </Suspense>
            } />
            <Route path="results" element={
              <Suspense fallback={<RouteLoader />}>
                <ResultsPage />
              </Suspense>
            } />
            <Route path="profile" element={
              <Suspense fallback={<RouteLoader />}>
                <ProfilePage />
              </Suspense>
            } />
            <Route path="settings" element={
              <Suspense fallback={<RouteLoader />}>
                <SettingsPage />
              </Suspense>
            } />
          </Route>

          {/* Catch all - redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
