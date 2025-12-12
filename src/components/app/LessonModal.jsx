/**
 * Lesson Modal Component
 * Full-screen modal for displaying lesson content
 * Extracted from App.js to reduce file size
 */

import React from 'react';
import ProgressiveLessonRenderer from '../ProgressiveLessonRenderer';
import PracticeSession from './PracticeSession';
import AllLessonsNavigator from '../AllLessonsNavigator';
import { lessonStructure as allLessonStructure } from '../../data/lessonStructure';
import { supabase } from '../../services/api/supabase.service';
import LessonsService from '../../services/api/lessons.service';
import PacketLesson_1_1 from '../lesson/PacketLesson_1_1';
import PacketLesson_1_2 from '../lesson/PacketLesson_1_2';
import PacketLesson_1_3 from '../lesson/PacketLesson_1_3';
import PacketLesson_1_4 from '../lesson/PacketLesson_1_4';
import PacketLesson_1_5 from '../lesson/PacketLesson_1_5';
import PacketLesson_1_6 from '../lesson/PacketLesson_1_6';
import PacketLesson_1_7 from '../lesson/PacketLesson_1_7';
import PacketLesson_1_8 from '../lesson/PacketLesson_1_8';
import PacketLesson_1_9 from '../lesson/PacketLesson_1_9';
import PacketLesson_2_1 from '../lesson/PacketLesson_2_1';
import PacketLesson_2_2 from '../lesson/PacketLesson_2_2';
import PacketLesson_2_3 from '../lesson/PacketLesson_2_3';
import PacketLesson_2_4 from '../lesson/PacketLesson_2_4';
import PacketLesson_2_5 from '../lesson/PacketLesson_2_5';
import PacketLesson_2_6 from '../lesson/PacketLesson_2_6';
import PacketLesson_1_1_Math from '../lesson/PacketLesson_1_1_Math';
import PacketLesson_1_2_Math from '../lesson/PacketLesson_1_2_Math';
import PacketLesson_2_1_Math from '../lesson/PacketLesson_2_1_Math';

/**
 * LessonModal - Full-screen modal for lesson viewing
 * @param {Object} props - Component props
 * @param {Object} props.classes - JSS style classes
 * @param {boolean} props.lessonModalOpen - Whether the modal is open
 * @param {Object|null} props.lessonContent - Current lesson content
 * @param {string|null} props.currentLesson - Current lesson ID
 * @param {Array} props.lessonStructure - Array of lesson data
 * @param {string} props.lessonMode - Current mode ('review' or 'practice')
 * @param {Function} props.setLessonMode - Function to set lesson mode
 * @param {Object} props.lessonProgress - Object tracking lesson progress
 * @param {Function} props.closeLessonModal - Function to close the modal
 * @param {Function} props.openLesson - Function to open a lesson
 * @param {Function} props.updateLessonProgress - Function to update lesson progress
 * @returns {JSX.Element} Lesson modal component
 */
const LessonModal = ({
  classes,
  lessonModalOpen,
  lessonContent,
  currentLesson,
  lessonStructure,
  lessonMode,
  setLessonMode,
  lessonProgress,
  closeLessonModal,
  openLesson,
  updateLessonProgress
}) => {
  const lesson = lessonContent;
  const currentLessonData = lessonStructure.find(item => item.id === currentLesson);
  const [practiceState, setPracticeState] = React.useState({
    questions: [],
    currentQuestionIndex: 0,
    results: []
  });

  // Mark lesson as in-progress when opened (if not already completed)
  React.useEffect(() => {
    if (lessonModalOpen && currentLesson) {
      const currentStatus = lessonProgress[currentLesson];
      console.log(`📊 Lesson opened: ${currentLesson}, current status: ${currentStatus}`);

      // Only mark as in-progress if it's not-started or undefined
      if (!currentStatus || currentStatus === 'not-started') {
        console.log(`📝 Marking lesson as in-progress: ${currentLesson}`);
        updateLessonProgress(currentLesson, 'in-progress');
      }
    }
  }, [lessonModalOpen, currentLesson, lessonProgress, updateLessonProgress]);

  // Preload practice questions when lesson opens
  React.useEffect(() => {
    const preloadPracticeQuestions = async () => {
      if (!lessonModalOpen || !currentLesson || !lessonContent) return;

      try {
        const startTime = performance.now();
        console.log('🔄 Preloading practice questions for:', currentLesson);

        // Get the actual lesson UUID from Supabase
        let lessonUUID = currentLesson;
        if (!currentLesson.includes('-') || currentLesson.length < 30) {
          const lessonData = await LessonsService.getLessonByKey(currentLesson);
          lessonUUID = lessonData?.id;
        }

        // Fetch practice questions from the database
        const { data: practiceQs, error } = await supabase
          .from('practice_questions')
          .select('id, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg, position')
          .eq('lesson_id', lessonUUID)
          .order('position', { ascending: true })
          .limit(500);

        if (error) {
          console.error('❌ Error preloading practice questions:', error);
          return;
        }

        if (!practiceQs || practiceQs.length === 0) {
          console.log('⚠️ No practice questions found for preloading');
          return;
        }

        // Convert practice questions to the format expected by the component
        const letterToIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5 };

        const practiceQuestions = practiceQs.map((q, index) => ({
          id: q.id || index + 1,
          text: q.problem_text || `Question ${index + 1}`,
          choices: Array.isArray(q.choices) ? q.choices : ["Option A", "Option B", "Option C", "Option D"],
          choiceExplanations: [],
          correctAnswer: q.correct_answer
            ? (letterToIndex[q.correct_answer] !== undefined ? letterToIndex[q.correct_answer] : parseInt(q.correct_answer) || 0)
            : 0,
          explanation: q.answer_explanation || "Review the lesson content for detailed explanation.",
          solutionSteps: q.solution_steps || null,
          diagram: q.diagram_svg || null
        }));

        const loadTime = performance.now() - startTime;
        console.log(`✅ Preloaded ${practiceQuestions.length} practice questions in ${loadTime.toFixed(0)}ms`);

        // Update practice state with preloaded questions
        setPracticeState(prev => ({
          ...prev,
          questions: practiceQuestions
        }));

      } catch (error) {
        console.error('❌ Error preloading practice questions:', error);
      }
    };

    preloadPracticeQuestions();
  }, [lessonModalOpen, currentLesson, lessonContent]);

  // Handler for question navigation in practice mode
  const handleQuestionClick = (index) => {
    if (lessonMode === 'practice') {
      setPracticeState(prev => ({
        ...prev,
        currentQuestionIndex: index
      }));
    }
  };

  // Handler for flag toggle in practice mode
  const handleFlagToggle = (index) => {
    if (lessonMode === 'practice') {
      setPracticeState(prev => {
        const newFlags = new Set(prev.flaggedQuestions || new Set());
        if (newFlags.has(index)) {
          newFlags.delete(index);
        } else {
          newFlags.add(index);
        }
        return {
          ...prev,
          flaggedQuestions: newFlags
        };
      });
    }
  };

  return (
    <div className={`${classes.lessonModal} ${lessonModalOpen ? 'active' : ''}`}>
      <div className={classes.lessonContent}>
        {/* Left Sidebar - All Lessons Navigator */}
        <AllLessonsNavigator
          lessons={allLessonStructure}
          currentLessonId={currentLesson}
          onLessonSelect={(lessonId) => openLesson(lessonId)}
          onClose={closeLessonModal}
          currentSection={currentLessonData?.section}
          practiceMode={lessonMode === 'practice'}
          lessonMode={lessonMode}
          questions={practiceState.questions || []}
          currentQuestionIndex={practiceState.currentQuestionIndex || 0}
          results={practiceState.results || []}
          flaggedQuestions={practiceState.flaggedQuestions || new Set()}
          onQuestionClick={handleQuestionClick}
          onFlagToggle={handleFlagToggle}
        />

        <div className={classes.lessonMain}>
          {/* Review Mode - Always mounted but hidden when not active */}
          <div style={{ display: lessonMode === 'review' ? 'flex' : 'none', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          {lesson && currentLessonData ? (
            <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
              {/* Use packet format for specific lessons */}
              {currentLesson === 'sentence-structure' ? (
                <PacketLesson_1_1 />
              ) : currentLesson === 'commas' ? (
                <PacketLesson_1_2 />
              ) : currentLesson === 'punctuation' ? (
                <PacketLesson_1_3 />
              ) : currentLesson === 'verbs' ? (
                <PacketLesson_1_4 />
              ) : currentLesson === 'pronouns' ? (
                <PacketLesson_1_5 />
              ) : currentLesson === 'modifiers' ? (
                <PacketLesson_1_6 />
              ) : currentLesson === 'parallel-structure' ? (
                <PacketLesson_1_7 />
              ) : currentLesson === 'misc-topics' ? (
                <PacketLesson_1_8 />
              ) : currentLesson === 'grammar-review' ? (
                <PacketLesson_1_9 />
              ) : currentLesson === 'redundancy' ? (
                <PacketLesson_2_1 />
              ) : currentLesson === 'word-choice' ? (
                <PacketLesson_2_2 />
              ) : currentLesson === 'transitions' ? (
                <PacketLesson_2_3 />
              ) : currentLesson === 'which-choice' ? (
                <PacketLesson_2_4 />
              ) : currentLesson === 'adding-deleting' ? (
                <PacketLesson_2_5 />
              ) : currentLesson === 'logical-placement' ? (
                <PacketLesson_2_6 />
              ) : currentLesson === 'backsolving' ? (
                <PacketLesson_1_1_Math />
              ) : currentLesson === 'substitution' ? (
                <PacketLesson_1_2_Math />
              ) : currentLesson === 'angles-lines' ? (
                <PacketLesson_2_1_Math />
              ) : (
                <ProgressiveLessonRenderer
                  lesson={{...lesson, id: currentLessonData.id}}
                  initialStatus={lessonProgress[currentLesson] || 'not-started'}
                  lessonProgress={lessonProgress}
                  lessonMode={lessonMode}
                  setLessonMode={setLessonMode}
                  hideNavigator={true}
                  onNavigate={(type, lessonId) => {
                    if (type === 'home') {
                      closeLessonModal();
                    } else if (type === 'lesson' && lessonId) {
                      openLesson(lessonId);
                    } else if (type === 'next') {
                      const currentIndex = lessonStructure.findIndex(l => l.id === currentLessonData.id);
                      if (currentIndex >= 0 && currentIndex < lessonStructure.length - 1) {
                        openLesson(lessonStructure[currentIndex + 1].id);
                      }
                    } else if (type === 'previous') {
                      const currentIndex = lessonStructure.findIndex(l => l.id === currentLessonData.id);
                      if (currentIndex > 0) {
                        openLesson(lessonStructure[currentIndex - 1].id);
                      }
                    }
                  }}
                  onStatusChange={(status) => updateLessonProgress(currentLesson, status)}
                />
              )}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#999',
              fontSize: '1rem'
            }}>
              <p>This lesson content is being prepared. Check back soon!</p>
            </div>
          )}
          </div>

          {/* Practice Mode - Always mounted but hidden when not active */}
          <div style={{ display: lessonMode === 'practice' ? 'flex' : 'none', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          {lesson && currentLessonData ? (
            <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
              <PracticeSession
                lesson={{...lesson, id: currentLessonData.id, title: currentLessonData.title}}
                onClose={closeLessonModal}
                onComplete={(rating) => {
                  console.log('Practice completed with rating:', rating);
                  updateLessonProgress(currentLesson, 'completed');
                }}
                lessonProgress={lessonProgress}
                lessonMode={lessonMode}
                setLessonMode={setLessonMode}
                useExternalSidebar={true}
                preloadedQuestions={practiceState.questions}
                currentQuestionIndex={practiceState.currentQuestionIndex}
                externalFlaggedQuestions={practiceState.flaggedQuestions}
                onPracticeStateChange={setPracticeState}
                updateLessonProgress={updateLessonProgress}
              />
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#999',
              fontSize: '1rem'
            }}>
              <p>This lesson content is being prepared. Check back soon!</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
