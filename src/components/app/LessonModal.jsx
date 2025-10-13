/**
 * Lesson Modal Component
 * Full-screen modal for displaying lesson content
 * Extracted from App.js to reduce file size
 */

import React from 'react';
import ProgressiveLessonRenderer from '../ProgressiveLessonRenderer';

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
        top: 0,
        left: '320px',
        right: 0,
        height: '60px',
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        zIndex: 200
      }}>
        <h1 style={{
          fontSize: '1.1rem',
          fontWeight: 500,
          color: '#1a1a1a',
          margin: 0
        }}>
          {currentSection ? `${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Lessons` : 'Lessons'}
        </h1>

        <div style={{
          display: 'inline-flex',
          background: '#f3f4f6',
          borderRadius: '6px',
          padding: '3px',
          gap: '2px'
        }}>
          <button
            style={{
              padding: '0.4rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 500,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: lessonMode === 'review' ? 'white' : 'transparent',
              color: lessonMode === 'review' ? '#1a1a1a' : '#6b7280',
              boxShadow: lessonMode === 'review' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
            onClick={() => setLessonMode('review')}
          >
            Review
          </button>
          <button
            style={{
              padding: '0.4rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 500,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: lessonMode === 'practice' ? 'white' : 'transparent',
              color: lessonMode === 'practice' ? '#1a1a1a' : '#6b7280',
              boxShadow: lessonMode === 'practice' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
            onClick={() => setLessonMode('practice')}
          >
            Practice
          </button>
        </div>
      </div>

      <div style={{
        position: 'fixed',
        top: '60px',
        left: '0',
        right: '0',
        bottom: '0',
        overflowY: 'auto',
        background: '#ffffff'
      }}>
        {lessonMode === 'review' ? (
          lesson && currentLessonData ? (
            <ProgressiveLessonRenderer
              lesson={{...lesson, id: currentLessonData.id}}
              lessonProgress={lessonProgress}
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
          )
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#999',
            fontSize: '1rem'
          }}>
            <p>Practice exercises coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonModal;
