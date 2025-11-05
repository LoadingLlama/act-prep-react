/**
 * Lesson Modal Component
 * Full-screen modal for displaying lesson content
 * Extracted from App.js to reduce file size
 */

import React from 'react';
import ProgressiveLessonRenderer from '../ProgressiveLessonRenderer';
import PracticeSession from './PracticeSession';

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
  const currentSection = currentLessonData?.section;

  return (
    <div className={`${classes.lessonModal} ${lessonModalOpen ? 'active' : ''}`}>
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        overflowY: 'auto',
        background: '#ffffff'
      }}>
        {/* Review Mode - Always mounted but hidden when not active */}
        <div style={{ display: lessonMode === 'review' ? 'block' : 'none' }}>
          {lesson && currentLessonData ? (
            <ProgressiveLessonRenderer
              lesson={{...lesson, id: currentLessonData.id}}
              initialStatus={lessonProgress[currentLesson] || 'not-started'}
              lessonProgress={lessonProgress}
              lessonMode={lessonMode}
              setLessonMode={setLessonMode}
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
        <div style={{ display: lessonMode === 'practice' ? 'block' : 'none' }}>
          {lesson && currentLessonData ? (
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
            />
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
  );
};

export default LessonModal;
