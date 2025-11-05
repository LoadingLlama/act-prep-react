/**
 * App Layout Component
 * Main layout for authenticated users with sidebar navigation
 * Handles routing, progress loading, and lesson modals
 */

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
import { useAppStyles } from '../styles/App.styles';
import { storage, domUtils, onboardingUtils } from '../utils/helpers';
import { getAllLessons } from '../utils/lessonsDb';
import { lessonStructure } from '../data/lessonStructure';
import { getAllProgress, migrateLocalStorageProgress, updateProgress } from '../services/progressService';
import { supabase } from '../supabaseClient';

// Components
import Sidebar from '../components/Sidebar';
import LessonModal from '../components/app/LessonModal';
import DiagnosticTest from '../components/DiagnosticTest';
import PracticeTestPage from '../pages/PracticeTestPage';
import OnboardingQuestionnaire from '../components/auth/OnboardingQuestionnaire';
import AIChat from '../components/AIChat';

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

  // Onboarding State
  const [onboardingComplete, setOnboardingComplete] = useState(null);

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

  // Check onboarding status and load progress
  useEffect(() => {
    const checkOnboardingAndLoadProgress = async () => {
      console.log('🔍 AppLayout: Checking onboarding status...', { hasUser: !!user });

      if (!user) {
        setOnboardingComplete(null);
        return;
      }

      try {
        // DEMO MODE: Check if onboarding was completed in this session
        if (user.email === 'demo@nomiacademy.com') {
          console.log('🎭 DEMO MODE: Checking session state...');
          const demoOnboardingComplete = sessionStorage.getItem('demo_onboarding_complete');

          if (demoOnboardingComplete === 'true') {
            console.log('🎭 DEMO MODE: Already completed in this session');
            setOnboardingComplete(true);
          } else {
            console.log('🎭 DEMO MODE: First load, showing onboarding');
            setOnboardingComplete(false);
          }
          return;
        }

        // Check onboarding status
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('onboarding_completed, onboarding_data')
          .eq('id', user.id)
          .maybeSingle();

        console.log('📊 Profile data:', { profile, error });

        if (error && error.code === 'PGRST116') {
          // Profile doesn't exist, create it
          console.log('📝 Creating profile...');
          await supabase.from('profiles').insert({ id: user.id, email: user.email });
          setOnboardingComplete(false);
          return;
        }

        if (error) {
          console.error('❌ Error checking onboarding:', error);
          setOnboardingComplete(false);
          return;
        }

        if (!profile) {
          // Create profile if doesn't exist
          console.log('📝 No profile found, creating...');
          await supabase.from('profiles').insert({ id: user.id, email: user.email });
          setOnboardingComplete(false);
          return;
        }

        // Set onboarding status from profile
        console.log('📊 Profile onboarding status:', profile?.onboarding_completed);
        setOnboardingComplete(profile?.onboarding_completed || false);

        // Load progress from database
        if (profile?.onboarding_completed) {
          console.log('📚 Loading lesson progress...');

          // Migrate localStorage progress if it exists
          await migrateLocalStorageProgress(user.id);

          // Load all progress from database
          const progress = await getAllProgress(user.id);
          setLessonProgress(progress);
          console.log(`✅ Loaded progress for ${Object.keys(progress).length} lessons`);
        }
      } catch (error) {
        console.error('Error in checkOnboardingAndLoadProgress:', error);
        setOnboardingComplete(false);
      }
    };

    checkOnboardingAndLoadProgress();
  }, [user]);

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

  // Onboarding handler - Called when user completes onboarding questions
  const handleOnboardingComplete = async (data, action = false) => {
    console.log('🎯🎯🎯 APPLAYOUT: ONBOARDING COMPLETE HANDLER 🎯🎯🎯');
    console.log('📋 Action:', action);
    console.log('📋 Data:', data);
    console.log('📋 Current onboardingComplete state:', onboardingComplete);

    // DEMO MODE: Don't save onboarding data for demo account
    const isDemoUser = user?.email === 'demo@nomiacademy.com';

    if (isDemoUser) {
      console.log('🎭 DEMO MODE: Skipping database save, saving to sessionStorage');
      sessionStorage.setItem('demo_onboarding_complete', 'true');
    } else if (user && data) {
      // Save onboarding data to database for regular users
      await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          onboarding_data: data
        })
        .eq('id', user.id);
      console.log('💾 Saved to database');
    }

    // Open diagnostic test directly if user wants to take it
    if (action === true) {
      console.log('🚀🚀🚀 ACTION IS TRUE - Opening diagnostic immediately...');
      // Open diagnostic FIRST, before changing onboarding state
      setDiagnosticTestOpen(true);
      // THEN mark onboarding complete so home page renders underneath
      setTimeout(() => {
        console.log('📋 Setting onboardingComplete to TRUE');
        setOnboardingComplete(true);
      }, 100);
    } else {
      console.log('⏭️ User skipped, going to home');
      // Mark complete and navigate
      setOnboardingComplete(true);
      navigate('/app/home');
    }
  };

  // Show onboarding if not complete
  if (user && onboardingComplete === false) {
    return (
      <OnboardingQuestionnaire
        userId={user.id}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  // Show loading while checking onboarding
  if (user && onboardingComplete === null) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#ffffff'
      }}>
        <div style={{ color: '#1a1a1a', fontSize: '1.2rem' }}>Loading...</div>
      </div>
    );
  }

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
      />

      {/* Main Content Area */}
      <div className={classes.mainContent}>
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
        <DiagnosticTest onClose={() => {
          console.log('🏁 Diagnostic test closed, navigating to home');
          setDiagnosticTestOpen(false);
          navigate('/app/home');
        }} />
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

      {/* AI Chat Assistant - Mobile Optimized */}
      <AIChat
        currentLesson={currentLesson}
        lessonContent={lessonContent[currentLesson]}
      />
    </div>
  );
}
