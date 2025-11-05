import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import OnboardingQuestionnaire from './components/auth/OnboardingQuestionnaire';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AIChat from './components/AIChat';
import DiagnosticTest from './components/DiagnosticTest';
import PracticeTestPage from './pages/PracticeTestPage';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import TestsContent from './components/app/TestsContent';
import LessonsContent from './components/app/LessonsContent';
import CourseContent from './components/app/CourseContent';
import LessonModal from './components/app/LessonModal';
import { useAppStyles } from './styles/App.styles';
import { storage, domUtils, onboardingUtils } from './utils/helpers';
import { getAllLessons } from './utils/lessonsDb';
import { lessonStructure } from './data/lessonStructure';
import { supabase } from './supabaseClient';

function App() {
  const { user, loading } = useAuth();
  const classes = useAppStyles();
  const [activeTab, setActiveTab] = useState('home');
  const [activeSection, setActiveSection] = useState('getting-started');
  const [lessonContent, setLessonContent] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [diagnosticTestOpen, setDiagnosticTestOpen] = useState(false);
  const [practiceTestOpen, setPracticeTestOpen] = useState(false);
  const [practiceTestNumber, setPracticeTestNumber] = useState(null);
  const [hoveredMoreTag, setHoveredMoreTag] = useState(null);
  const [moreTagPosition, setMoreTagPosition] = useState({ top: 0, left: 0 });
  const [lessonProgress, setLessonProgress] = useState(() => {
    return storage.get('actPrepProgress', {});
  });
  const [expandedSections, setExpandedSections] = useState(() => {
    return storage.get('expandedSections', { english: true, math: false, reading: false, science: false });
  });
  const [lessonMode, setLessonMode] = useState('review'); // 'review' or 'practice'
  const [viewMode, setViewMode] = useState(() => {
    return storage.get('lessonsViewMode', 'grid'); // 'grid' or 'list'
  });
  const [onboardingComplete, setOnboardingComplete] = useState(null); // null = loading, true/false = status
  const [onboardingData, setOnboardingData] = useState(null);
  const [showAuthPage, setShowAuthPage] = useState(false); // true when user should see signup after onboarding
  const [shouldShowDiagnostic, setShouldShowDiagnostic] = useState(false); // true when user should see diagnostic after signup
  const [hasStarted, setHasStarted] = useState(() => {
    // Check if user has clicked "Get Started" in this session
    // Don't check localStorage to ensure fresh visits always show landing page
    return sessionStorage.getItem('hasStarted') === 'true';
  });

  // Save view mode to localStorage when it changes
  useEffect(() => {
    storage.set('lessonsViewMode', viewMode);
  }, [viewMode]);

  // Reset hasStarted when user logs out
  useEffect(() => {
    if (!user && !loading) {
      // User is not authenticated, reset hasStarted to show landing page
      setHasStarted(false);
    }
  }, [user, loading]);

  // Check onboarding status and transfer localStorage data when user logs in
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setOnboardingComplete(null);
        return;
      }

      try {
        // Check if user has onboarding data in database
        const { data, error } = await supabase
          .from('profiles')
          .select('onboarding_completed, onboarding_data')
          .eq('id', user.id)
          .maybeSingle();

        // If profile doesn't exist yet, create it
        if (error && error.code === 'PGRST116') {
          console.log('📝 Profile does not exist, creating...');
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({ id: user.id, email: user.email });

          if (insertError) {
            console.error('Error creating profile:', insertError);
          }
          setOnboardingComplete(false);
          return;
        }

        if (error) {
          console.error('Error checking onboarding status:', error);
          setOnboardingComplete(false);
          return;
        }

        // If no data (profile doesn't exist), create it
        if (!data) {
          console.log('📝 Profile does not exist, creating...');
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({ id: user.id, email: user.email });

          if (insertError) {
            console.error('Error creating profile:', insertError);
          }
          setOnboardingComplete(false);
          return;
        }

        // Check if localStorage has onboarding data
        const localOnboardingData = onboardingUtils.getAnswers();
        const shouldShowDiagnosticFlag = storage.get('shouldShowDiagnosticAfterSignup', false);

        // If user doesn't have onboarding in database but has it in localStorage, transfer it
        if (!data?.onboarding_completed && localOnboardingData) {
          console.log('💾 Transferring onboarding data from localStorage to database...');
          try {
            const { error: updateError } = await supabase
              .from('profiles')
              .update({
                onboarding_completed: true,
                onboarding_data: localOnboardingData
              })
              .eq('id', user.id);

            if (updateError) {
              console.error('Error saving onboarding data:', updateError);
            } else {
              console.log('✅ Onboarding data saved to database');
              // Clear localStorage after successful transfer
              onboardingUtils.clearAnswers();

              // If user signed up from onboarding, show diagnostic screen
              if (shouldShowDiagnosticFlag) {
                console.log('🎯 User signed up from onboarding, will show diagnostic screen');
                storage.remove('shouldShowDiagnosticAfterSignup');
                setShouldShowDiagnostic(true);
                setOnboardingComplete(false); // Show onboarding component with diagnostic screen
              } else {
                setOnboardingComplete(true);
              }
              setOnboardingData(localOnboardingData);
            }
          } catch (error) {
            console.error('Error transferring onboarding data:', error);
          }
          return;
        }

        // Use database data
        setOnboardingComplete(data?.onboarding_completed || false);
        setOnboardingData(data?.onboarding_data);
      } catch (error) {
        console.error('Error checking onboarding:', error);
        setOnboardingComplete(false);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  useEffect(() => {
    // Load lessons from Supabase
    const loadLessonsFromSupabase = async () => {
      console.log('📚 App.js: Loading lessons from Supabase...');
      const data = await getAllLessons();
      if (data) {
        // Convert to object keyed by lesson_key
        const lessonsObj = {};
        data.forEach(lesson => {
          console.log(`  📖 Loading lesson: ${lesson.lesson_key} (${lesson.title})`);
          console.log(`     - Has content_json: ${!!lesson.content_json}`);
          if (lesson.content_json) {
            console.log(`     - JSON blocks: ${lesson.content_json.content?.length}`);
          }
          lessonsObj[lesson.lesson_key] = {
            title: lesson.title,
            content: lesson.content,
            content_json: lesson.content_json,  // Include new JSON format
            duration: lesson.duration,
            interactiveData: { practiceSections: [] }
          };
        });
        console.log('✅ App.js: All lessons loaded. Lesson keys:', Object.keys(lessonsObj));
        setLessonContent(lessonsObj);
      }
    };

    loadLessonsFromSupabase();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSectionFilter = (section) => {
    setActiveSection(section);
  };

  const toggleSection = (section) => {
    const newExpandedSections = { ...expandedSections, [section]: !expandedSections[section] };
    setExpandedSections(newExpandedSections);
    storage.set('expandedSections', newExpandedSections);
  };

  const openLesson = (lessonId, mode = 'review') => {
    setCurrentLesson(lessonId);
    setLessonModalOpen(true);
    setLessonMode(mode);
    setHoveredMoreTag(null); // Clear hover popup
    domUtils.preventBodyScroll();
  };

  const updateLessonProgress = (lessonId, status) => {
    const newProgress = { ...lessonProgress, [lessonId]: status };
    setLessonProgress(newProgress);
    storage.set('actPrepProgress', newProgress);
  };

  const getLessonStatus = (lessonId) => {
    return lessonProgress[lessonId] || 'not-started';
  };

  const closeLessonModal = () => {
    setLessonModalOpen(false);
    setCurrentLesson(null);
    domUtils.restoreBodyScroll();
  };

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

  const handleGetStarted = () => {
    console.log('🚀 User clicked Get Started');
    sessionStorage.setItem('hasStarted', 'true');
    setHasStarted(true);
  };

  const handleSignIn = () => {
    console.log('🔐 User clicked Sign In');
    sessionStorage.setItem('hasStarted', 'true');
    setHasStarted(true);
    setShowAuthPage(true);
  };

  const handleOnboardingComplete = (data, action = false) => {
    console.log('📋 Onboarding complete:', { action, hasData: !!data });

    // If action is 'signup', user wants to create account
    if (action === 'signup') {
      console.log('🔐 User wants to sign up, showing auth page');
      // Mark that diagnostic should be shown after signup
      storage.set('shouldShowDiagnosticAfterSignup', true);
      setShowAuthPage(true);
      return;
    }

    // If user skipped onboarding (action === false)
    if (action === false) {
      console.log('⏭️  User skipped onboarding');
      // If not authenticated, show auth page
      if (!user) {
        console.log('🔐 User not authenticated, showing auth page');
        setShowAuthPage(true);
      } else {
        // If authenticated, just mark onboarding as complete
        setOnboardingComplete(true);
      }
      return;
    }

    // If action is true (shouldStartDiagnostic from authenticated flow)
    setOnboardingComplete(true);
    setOnboardingData(data);
    if (action === true) {
      setDiagnosticTestOpen(true);
    }
  };

  // ========== NOT AUTHENTICATED ==========
  if (!user && !loading) {
    // If user completed onboarding and wants to sign up, show auth page
    if (showAuthPage) {
      console.log('🔐 Showing auth page after onboarding completion');
      return <AuthPage />;
    }

    // Always show landing page first for unauthenticated users
    if (!hasStarted) {
      console.log('👋 Showing landing page');
      return <LandingPage onGetStarted={handleGetStarted} onSignIn={handleSignIn} />;
    }

    // If user clicked "Get Started" but hasn't completed onboarding yet, show questionnaire
    console.log('📝 Showing onboarding questionnaire');
    return <OnboardingQuestionnaire onComplete={handleOnboardingComplete} />;
  }

  // ========== AUTHENTICATED ==========

  // Show onboarding if user is authenticated but hasn't completed it
  if (user && onboardingComplete === false) {
    // If shouldShowDiagnostic is true, show just the diagnostic screen
    if (shouldShowDiagnostic) {
      console.log('🎯 Showing diagnostic screen after signup');
      return (
        <OnboardingQuestionnaire
          userId={user.id}
          onComplete={handleOnboardingComplete}
          showDiagnosticScreen={true}
        />
      );
    }

    // Otherwise show full onboarding (backwards compatibility)
    console.log('📝 Showing post-auth onboarding (database says not complete)');
    return (
      <OnboardingQuestionnaire
        userId={user.id}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  // Show loading while checking onboarding status
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

  // Show loading or protected content
  return (
    <ProtectedRoute>
      <div className={classes.container}>
        <Sidebar activeView={activeTab} onNavigate={handleTabClick} />

        <div className={classes.mainContent}>
          <div className={classes.content}>
            {activeTab === 'home' && (
              <Home
                lessonProgress={lessonProgress}
                lessonStructure={lessonStructure}
                onNavigate={handleTabClick}
                onLessonOpen={openLesson}
              />
            )}
            {activeTab === 'course' && (
              <CourseContent
                lessonProgress={lessonProgress}
                lessonStructure={lessonStructure}
                onLessonOpen={openLesson}
                onTestOpen={openPracticeTest}
              />
            )}
            {activeTab === 'tests' && (
              <TestsContent
                classes={classes}
                activeTab={activeTab}
                setDiagnosticTestOpen={setDiagnosticTestOpen}
                setPracticeTestOpen={openPracticeTest}
              />
            )}
            {activeTab === 'lessons' && (
              <LessonsContent
                classes={classes}
                activeTab={activeTab}
                activeSection={activeSection}
                handleSectionFilter={handleSectionFilter}
                viewMode={viewMode}
                setViewMode={setViewMode}
                lessonStructure={lessonStructure}
                lessonContent={lessonContent}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                getLessonStatus={getLessonStatus}
                openLesson={openLesson}
                hoveredMoreTag={hoveredMoreTag}
                setHoveredMoreTag={setHoveredMoreTag}
                setMoreTagPosition={setMoreTagPosition}
              />
            )}
            {activeTab === 'profile' && <ProfilePage />}
            {activeTab === 'settings' && <SettingsPage />}
          </div>
        </div>

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
          <DiagnosticTest onClose={() => setDiagnosticTestOpen(false)} />
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

        {/* AI Chat Component - Hidden for now */}
        {false && (
          <AIChat
            currentLesson={currentLesson}
            lessonContent={lessonContent[currentLesson]}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}

export default App;
