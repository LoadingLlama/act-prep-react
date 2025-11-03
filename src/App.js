import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
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
import { storage, domUtils } from './utils/helpers';
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

  // Save view mode to localStorage when it changes
  useEffect(() => {
    storage.set('lessonsViewMode', viewMode);
  }, [viewMode]);

  // Check onboarding status when user logs in
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setOnboardingComplete(null);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('onboarding_completed, onboarding_data')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking onboarding status:', error);
          // If profile doesn't exist or error, assume onboarding not complete
          setOnboardingComplete(false);
          return;
        }

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

  const handleOnboardingComplete = (data, shouldStartDiagnostic = false) => {
    setOnboardingComplete(true);
    setOnboardingData(data);
    // Open diagnostic test if user chose to start it
    if (shouldStartDiagnostic) {
      setDiagnosticTestOpen(true);
    }
  };

  // Show auth page if not authenticated
  if (!user && !loading) {
    return <AuthPage />;
  }

  // Show onboarding if user is authenticated but hasn't completed it
  if (user && onboardingComplete === false) {
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
