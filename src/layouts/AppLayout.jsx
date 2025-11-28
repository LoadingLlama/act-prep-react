/**
 * App Layout Component
 * Main layout for authenticated users with sidebar navigation
 * Handles routing, progress loading, and lesson modals
 */

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HiBars3, HiClock, HiUser } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
import { useAppStyles } from '../styles/App.styles';
import { storage, domUtils } from '../utils/helpers';
import { getAllLessons } from '../utils/lessonsDb';
import { lessonStructure } from '../data/lessonStructure';
import { getAllProgress, migrateLocalStorageProgress, updateProgress } from '../services/progressService';
import { hasProSubscription, getTrialInfo } from '../services/subscription.service';
import { supabase } from '../supabaseClient';

// Components
import Sidebar from '../components/Sidebar';
import LessonModal from '../components/app/LessonModal';
import DiagnosticTest from '../components/DiagnosticTest';
import PracticeTestPage from '../pages/PracticeTestPage';
import UpgradeModal from '../components/UpgradeModal';

/**
 * AppLayout - Protected area wrapper with sidebar and routing
 */
export default function AppLayout() {
  const { user, signOut } = useAuth();
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
  const [trialDaysLeft, setTrialDaysLeft] = useState(3);
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreakTooltip, setShowStreakTooltip] = useState(false);

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
  const [headerControls, setHeaderControls] = useState(null);

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
          const trialInfo = await getTrialInfo(user.id);
          setTrialDaysLeft(trialInfo.daysRemaining);
          setIsTrialExpired(trialInfo.isExpired);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };

    checkSubscription();
  }, [user]);

  // Calculate activity streak
  useEffect(() => {
    const fetchStreak = async () => {
      if (!user) {
        setStreak(0);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('session_history')
          .select('created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (!data || data.length === 0) {
          setStreak(0);
          return;
        }

        // Calculate streak by counting consecutive days
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const uniqueDates = [...new Set(data.map(session => {
          const date = new Date(session.created_at);
          date.setHours(0, 0, 0, 0);
          return date.getTime();
        }))].sort((a, b) => b - a);

        let currentStreak = 0;
        let checkDate = today.getTime();

        for (const activityDate of uniqueDates) {
          const daysDiff = Math.floor((checkDate - activityDate) / (1000 * 60 * 60 * 24));
          if (daysDiff === 0 || daysDiff === 1) {
            currentStreak++;
            checkDate = activityDate;
          } else if (daysDiff > 1) {
            break;
          }
        }
        setStreak(currentStreak);
      } catch (error) {
        console.error('Error fetching streak:', error);
        setStreak(0);
      }
    };
    fetchStreak();
  }, [user]);

  // Sign out handler for upgrade modal
  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

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
    console.log(`🎯 [${new Date().toISOString()}] updateLessonProgress called: ${lessonId} → ${status}`);
    const currentStatus = lessonProgress[lessonId];
    console.log(`   Current status in state: ${currentStatus}`);

    // Skip if status is the same (avoid unnecessary updates)
    if (currentStatus === status) {
      console.log(`   ℹ️ Status unchanged, skipping update`);
      return;
    }

    // Skip if trying to mark as in-progress when already completed
    if (status === 'in-progress' && currentStatus === 'completed') {
      console.log(`   ℹ️ Lesson already completed, not reverting to in-progress`);
      return;
    }

    // Update local state immediately for responsiveness
    console.log(`📥 Setting local state for ${lessonId}: ${currentStatus} → ${status}`);
    setLessonProgress(prevProgress => {
      // Double-check at the moment of setState
      if (prevProgress[lessonId] === status) {
        console.log(`   ℹ️ Status already ${status}, no change needed`);
        return prevProgress;
      }
      if (status === 'in-progress' && prevProgress[lessonId] === 'completed') {
        console.log(`   ℹ️ Preventing downgrade from completed to in-progress`);
        return prevProgress;
      }
      const newProgress = { ...prevProgress, [lessonId]: status };
      console.log(`✅ Local state will be updated for ${lessonId}: ${prevProgress[lessonId]} → ${status}`);
      return newProgress;
    });

    // Sync to database in background
    if (user) {
      try {
        console.log(`🔄 Starting database sync for ${lessonId}...`);
        const success = await updateProgress(user.id, lessonId, status);
        if (success) {
          console.log(`✅ [${new Date().toISOString()}] Database synced for ${lessonId} → ${status}`);
        } else {
          console.error(`❌ [${new Date().toISOString()}] Failed to update database for ${lessonId}`);
          // Optionally revert local state on failure
        }
      } catch (error) {
        console.error(`❌ [${new Date().toISOString()}] Error updating database for ${lessonId}:`, error);
        // Optionally revert local state on error
      }
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
        isTrialExpired={isTrialExpired}
      />

      {/* Main Content Area */}
      <div className={classes.mainContent}>
        {/* Top Header Bar - Always show */}
        <div className={classes.topHeader}>
          <div className={classes.topHeaderContent}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              {headerControls}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {user && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.25rem',
                      padding: '0 0.6rem',
                      height: '26px',
                      borderRadius: '6px',
                      background: streak === 0
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 197, 253, 0.15) 50%, rgba(191, 219, 254, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(234, 88, 12, 0.2) 0%, rgba(251, 146, 60, 0.15) 50%, rgba(254, 215, 170, 0.1) 100%)',
                      border: 'none',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      letterSpacing: '0.02em'
                    }}
                    onMouseEnter={() => setShowStreakTooltip(true)}
                    onMouseLeave={() => setShowStreakTooltip(false)}
                  >
                    <span style={{ fontSize: '0.85rem', lineHeight: '1' }}>{streak === 0 ? '❄️' : '🔥'}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      color: streak === 0 ? '#1e40af' : '#ea580c',
                      lineHeight: '1'
                    }}>
                      {streak}
                    </span>
                    {showStreakTooltip && (
                      <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(15, 23, 42, 0.95)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        zIndex: 1000,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        pointerEvents: 'none'
                      }}>
                        {streak === 0 ? 'No active streak' : `${streak} day${streak !== 1 ? 's' : ''} of activity`}
                        <div style={{
                          position: 'absolute',
                          top: '-4px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '4px solid transparent',
                          borderRight: '4px solid transparent',
                          borderBottom: '4px solid rgba(15, 23, 42, 0.95)'
                        }} />
                      </div>
                    )}
                  </div>
                  {isPro && (
                    <div className={classes.proBadge}>
                      Pro
                    </div>
                  )}
                </div>
              )}
              <div
                className={classes.profilePicture}
                onClick={() => handleNavigate('profile')}
              >
                <HiUser style={{ width: '24px', height: '24px' }} />
              </div>
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
            setDiagnosticTestOpen,
            setHeaderControls
          }} />
        </div>
      </div>

      {/* Lesson Modal */}
      <LessonModal
        classes={classes}
        lessonModalOpen={lessonModalOpen}
        lessonContent={(() => {
          // Find the lesson in lessonStructure to get its lesson_key
          const lesson = lessonStructure.find(l => l.id === currentLesson);
          return lesson ? lessonContent[lesson.lesson_key] : null;
        })()}
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

      {/* Blocking Upgrade Modal - shown when trial expires */}
      {!isPro && isTrialExpired && (
        <UpgradeModal
          trialDaysLeft={trialDaysLeft}
          onSignOut={handleSignOut}
        />
      )}

    </div>
  );
}
