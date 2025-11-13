/**
 * App Layout Component
 * Main layout for authenticated users with sidebar navigation
 * Handles routing, progress loading, and lesson modals
 */

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HiBars3, HiClock } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
import { useAppStyles } from '../styles/App.styles';
import { storage, domUtils } from '../utils/helpers';
import { getAllLessons } from '../utils/lessonsDb';
import { lessonStructure } from '../data/lessonStructure';
import { getAllProgress, migrateLocalStorageProgress, updateProgress } from '../services/progressService';
import { hasProSubscription } from '../services/subscription.service';
import { supabase } from '../supabaseClient';

// Components
import Sidebar from '../components/Sidebar';
import LessonModal from '../components/app/LessonModal';
import DiagnosticTest from '../components/DiagnosticTest';
import PracticeTestPage from '../pages/PracticeTestPage';

/**
 * AppLayout - Protected area wrapper with sidebar and routing
 */
export default function AppLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useAppStyles();

  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [diagnosticTestOpen, setDiagnosticTestOpen] = useState(false);
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [practiceTestNumber, setPracticeTestNumber] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(14);

  // Debug logging for diagnostic state changes
  useEffect(() => {
    console.log('🔔 diagnosticTestOpen state changed:', diagnosticTestOpen);
  }, [diagnosticTestOpen]);

  // Data State
  const [lessonContent, setLessonContent] = useState({});
  const [lessonProgress, setLessonProgress] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonMode, setLessonMode] = useState('review');
  const [expandedSections, setExpandedSections] = useState(() => {
    return storage.get('expandedSections', { english: true, math: false, reading: false, science: false });
  });
  const [hoveredMoreTag, setHoveredMoreTag] = useState(null);
  const [moreTagPosition, setMoreTagPosition] = useState({ top: 0, left: 0 });

  // Get active view from URL
  const activeView = location.pathname.split('/')[2] || 'home';

  // Load lessons from Supabase
  useEffect(() => {
    const loadLessonsFromSupabase = async () => {
      console.log('📚 AppLayout: Loading lessons from Supabase...');
      const data = await getAllLessons();
      if (data) {
        const lessonsObj = {};
        data.forEach(lesson => {
          lessonsObj[lesson.lesson_key] = {
            title: lesson.title,
            content: lesson.content,
            content_json: lesson.content_json,
            duration: lesson.duration,
            interactiveData: { practiceSections: [] }
          };
        });
        console.log('✅ AppLayout: All lessons loaded');
        setLessonContent(lessonsObj);
      }
    };

    loadLessonsFromSupabase();
  }, []);

  // Load user progress when authenticated
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return;

      try {
        console.log('📚 Loading lesson progress...');

        // Migrate localStorage progress if it exists
        await migrateLocalStorageProgress(user.id);

        // Load all progress from database
        const progress = await getAllProgress(user.id);
        setLessonProgress(progress);
        console.log(`✅ Loaded progress for ${Object.keys(progress).length} lessons`);
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };

    loadProgress();
  }, [user]);

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) return;

      try {
        // Check if user is Pro
        const proStatus = await hasProSubscription(user.id);
        setIsPro(proStatus);

        // Only calculate trial days if not Pro
        if (!proStatus) {
          const { data: userData } = await supabase.auth.getUser();
          if (userData?.user?.created_at) {
            const createdAt = new Date(userData.user.created_at);
            const now = new Date();
            const daysSinceCreation = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
            const daysRemaining = Math.max(0, 14 - daysSinceCreation);
            setTrialDaysLeft(daysRemaining);
          }
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };

    checkSubscription();
  }, [user]);

  // Get user initials from email
  const getUserInitials = () => {
    if (!user?.email) return '?';
    const email = user.email;
    const name = email.split('@')[0];
    const parts = name.split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Navigation handler
  const handleNavigate = (view) => {
    navigate(`/app/${view}`);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  // Lesson handlers
  const openLesson = (lessonId, mode = 'review') => {
    setCurrentLesson(lessonId);
    setLessonModalOpen(true);
    setLessonMode(mode);
    setHoveredMoreTag(null);
    domUtils.preventBodyScroll();
  };

  const closeLessonModal = () => {
    setLessonModalOpen(false);
    setCurrentLesson(null);
    domUtils.restoreBodyScroll();
  };

  const updateLessonProgress = async (lessonId, status) => {
    // Update local state immediately for responsiveness
    const newProgress = { ...lessonProgress, [lessonId]: status };
    setLessonProgress(newProgress);

    // Sync to database in background
    if (user) {
      await updateProgress(user.id, lessonId, status);
    }
  };

  const getLessonStatus = (lessonId) => {
    return lessonProgress[lessonId] || 'not-started';
  };

  // Practice test handlers
  const openPracticeTest = (testNumber) => {
    setPracticeTestNumber(testNumber);
    setPracticeTestOpen(true);
    domUtils.preventBodyScroll();
  };

  const closePracticeTest = () => {
    setPracticeTestOpen(false);
    setPracticeTestNumber(null);
    domUtils.restoreBodyScroll();
  };

  // Toggle section
  const toggleSection = (section) => {
    const newExpandedSections = { ...expandedSections, [section]: !expandedSections[section] };
    setExpandedSections(newExpandedSections);
    storage.set('expandedSections', newExpandedSections);
  };


  // Onboarding questionnaire now handled in DiagnosticTest.jsx - no blocking UI needed here

  // Render main app layout
  return (
    <div className={classes.container}>
      {/* Hamburger Menu Button for Mobile */}
      <button
        className={classes.hamburgerButton}
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <HiBars3 />
      </button>

      {/* Sidebar with mobile support */}
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isPro={isPro}
        trialDaysLeft={trialDaysLeft}
      />

      {/* Main Content Area */}
      <div className={classes.mainContent}>
        {/* Top Right Header */}
        <div className={classes.topHeader}>
          <div style={{ position: 'relative' }}>
            <div
              className={`${classes.profilePicture} ${isPro ? classes.profilePicturePro : ''}`}
              onClick={() => handleNavigate('profile')}
            >
              {getUserInitials()}
            </div>
            <div className={`${classes.statusBadge} ${isPro ? classes.proBadge : classes.trialBadge}`}>
              {isPro ? 'PRO' : <HiClock size={10} />}
            </div>
          </div>
        </div>

        <div className={classes.content}>
          <Outlet context={{
            lessonProgress,
            lessonStructure,
            lessonContent,
            expandedSections,
            hoveredMoreTag,
            onNavigate: handleNavigate,
            onLessonOpen: openLesson,
            onTestOpen: openPracticeTest,
            toggleSection,
            getLessonStatus,
            updateLessonProgress,
            setHoveredMoreTag,
            setMoreTagPosition,
            setDiagnosticTestOpen
          }} />
        </div>
      </div>

      {/* Lesson Modal */}
      <LessonModal
        classes={classes}
        lessonModalOpen={lessonModalOpen}
        lessonContent={lessonContent[currentLesson]}
        currentLesson={currentLesson}
        lessonStructure={lessonStructure}
        lessonMode={lessonMode}
        setLessonMode={setLessonMode}
        lessonProgress={lessonProgress}
        closeLessonModal={closeLessonModal}
        openLesson={openLesson}
        updateLessonProgress={updateLessonProgress}
      />

      {/* Diagnostic Test Modal */}
      {diagnosticTestOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'white',
          zIndex: 2000,
          overflow: 'auto'
        }}>
          <DiagnosticTest onClose={() => {
            console.log('🏁 Diagnostic test closed, navigating to home');
            setDiagnosticTestOpen(false);
            navigate('/app/home');
          }} />
        </div>
      )}

      {/* Practice Test Modal */}
      {practiceTestOpen && practiceTestNumber && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'white',
          zIndex: 2000,
          overflow: 'auto'
        }}>
          <PracticeTestPage testId={practiceTestNumber} onClose={closePracticeTest} />
        </div>
      )}

      {/* Key Terms Popup */}
      {hoveredMoreTag && (
        <div
          className={classes.keyTermsPopup}
          style={{
            top: `${moreTagPosition.top}px`,
            left: `${moreTagPosition.left}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className={classes.keyTermsPopupTitle}>Key Terms</div>
          <div className={classes.keyTermsPopupList}>
            {hoveredMoreTag.keyTerms?.map((term, index) => (
              <div key={index} className={classes.keyTermsPopupItem}>
                {term}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
