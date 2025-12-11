/**
 * App Router Configuration
 * Defines all routes for the application with React Router
 * Uses lazy loading for better performance
 */

import React, { lazy, Suspense, useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../utils/helpers';
import InlineAuth from '../components/auth/InlineAuth';

// Eagerly load critical pages
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import AboutUs from '../pages/AboutUs';
import AppLayout from '../layouts/AppLayout';
import AuthCallback from '../pages/AuthCallback';

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
 * Uses overlay to prevent white flash - keeps previous content visible
 */
function RouteLoader() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(4px)',
      zIndex: 9999,
      pointerEvents: 'none'
    }}>
      <div style={{
        background: '#08245b',
        color: '#ffffff',
        padding: '1rem 2rem',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '500',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        Loading...
      </div>
    </div>
  );
}

/**
 * Scroll restoration component
 * Scrolls to top on route change
 */
function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to top immediately when location changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return null;
}

/**
 * Page transition wrapper for smooth fade effects
 * Only transitions on actual route changes, not tab visibility
 * Skips animation for internal /app/* navigation
 */
function PageTransition({ children }) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathnameRef = React.useRef(location.pathname);

  useEffect(() => {
    // Only transition if the pathname actually changed
    if (prevPathnameRef.current !== location.pathname) {
      const prevPath = prevPathnameRef.current;
      const currentPath = location.pathname;

      // Skip transition if both paths are internal /app/* routes
      const bothAreAppRoutes = prevPath.startsWith('/app') && currentPath.startsWith('/app');

      if (!bothAreAppRoutes) {
        setIsTransitioning(true);

        const timer = setTimeout(() => {
          setIsTransitioning(false);
          prevPathnameRef.current = location.pathname;
        }, 150);

        return () => clearTimeout(timer);
      }

      // Update ref immediately for app-to-app navigation (no transition)
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        opacity: isTransitioning ? 0 : 1,
        transition: isTransitioning ? 'opacity 0.15s ease-in-out' : 'none',
        width: '100%',
        minHeight: '100vh',
        willChange: isTransitioning ? 'opacity' : 'auto'
      }}
    >
      {children}
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
      <ScrollToTop />
      <Suspense fallback={<RouteLoader />}>
        <PageTransition>
          <Routes>
            {/* Landing Page - Always accessible */}
            <Route path="/" element={<LandingPage />} />

          {/* About Us Page - Always accessible */}
          <Route path="/about" element={<AboutUs />} />

          {/* OAuth Callback - Handle Google/Facebook/Apple auth redirects */}
          <Route path="/auth/callback" element={<AuthCallback />} />

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
            <Route path="lesson/:lessonId" element={
              <ProtectedRoute>
                <Suspense fallback={<RouteLoader />}>
                  <CourseContent />
                </Suspense>
              </ProtectedRoute>
            } />
          </Route>

            {/* Catch all - redirect to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </Suspense>
    </BrowserRouter>
  );
}
