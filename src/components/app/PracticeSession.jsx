/**
 * Practice Session Component
 * Gamified practice interface with 5-star capability rating system
 */

import React, { useState, useEffect } from 'react';
import { HiStar } from 'react-icons/hi2';
import AllLessonsNavigator from '../AllLessonsNavigator';
import { lessonStructure } from '../../data/lessonStructure';

const PracticeSession = ({ lesson, onClose, onComplete, lessonMode, setLessonMode, lessonProgress = {} }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStars, setCurrentStars] = useState(0);
  const [newStars, setNewStars] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });

  // Listen for sidebar collapse changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('sidebarCollapsed');
      setSidebarCollapsed(saved === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check on body class changes (for same-tab updates)
    const observer = new MutationObserver(() => {
      const saved = localStorage.getItem('sidebarCollapsed');
      setSidebarCollapsed(saved === 'true');
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Load current mastery level
    const masteryKey = `lesson_mastery_${lesson.id}`;
    const saved = localStorage.getItem(masteryKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCurrentStars(data.rating || 0);
      } catch (e) {
        setCurrentStars(0);
      }
    }
  }, [lesson.id]);

  useEffect(() => {
    // Load practice questions from the lesson's examples
    const loadPracticeQuestions = async () => {
      try {
        // Import the examples service
        const ExamplesService = (await import('../../services/api/examples.service')).default;
        const LessonsService = (await import('../../services/api/lessons.service')).default;

        // Get the actual lesson UUID from Supabase
        let lessonUUID = lesson.id;
        if (!lesson.id || !lesson.id.includes('-') || lesson.id.length < 30) {
          const lessonData = await LessonsService.getLessonByKey(lesson.id);
          lessonUUID = lessonData?.id;
        }

        console.log('📝 Loading practice questions for lesson:', lessonUUID);

        // Fetch examples from the database
        const examples = lessonUUID ? await ExamplesService.getExamplesByLessonId(lessonUUID) : [];
        console.log('📝 Found', examples.length, 'examples for practice');

        if (examples.length === 0) {
          // Fallback to mock questions if no examples found
          console.log('⚠️ No examples found, using mock questions');
          const mockQuestions = [
            {
              id: 1,
              text: "This is a practice question for " + (lesson?.title || "this lesson"),
              choices: ["Option A", "Option B", "Option C", "Option D"],
              correctAnswer: 1,
              explanation: "Practice questions will be generated from lesson examples once they are added to the database."
            }
          ];
          setQuestions(mockQuestions);
          return;
        }

        // Convert examples to practice questions (take up to 10)
        const practiceQuestions = examples.slice(0, 10).map((example, index) => {
          // Parse the example data to extract question format
          const questionData = example.question_data || {};

          return {
            id: example.id || index + 1,
            text: questionData.question || example.question_text || example.title || `Question ${index + 1}`,
            choices: questionData.choices || questionData.options || [
              "Option A",
              "Option B",
              "Option C",
              "Option D"
            ],
            correctAnswer: questionData.correct_answer !== undefined ? questionData.correct_answer : 0,
            explanation: questionData.explanation || example.explanation || "Review the lesson content for detailed explanation."
          };
        });

        console.log('📝 Generated', practiceQuestions.length, 'practice questions');
        setQuestions(practiceQuestions);

      } catch (error) {
        console.error('❌ Error loading practice questions:', error);
        // Fallback to basic mock question
        setQuestions([{
          id: 1,
          text: "Practice questions are being prepared for this lesson.",
          choices: ["Continue", "OK", "Understood", "Got it"],
          correctAnswer: 0,
          explanation: "Check back soon for full practice questions!"
        }]);
      }
    };

    loadPracticeQuestions();
  }, [lesson]);

  const handleAnswerSelect = (choiceIndex) => {
    if (showExplanation) return; // Prevent changing answer after showing explanation
    setSelectedAnswer(choiceIndex);
  };

  const handleCheckAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setAnsweredCorrectly(isCorrect);
    setShowExplanation(true);
    setResults([...results, { questionId: currentQuestion.id, correct: isCorrect }]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnsweredCorrectly(null);
      setShowExplanation(false);
    } else {
      // Calculate stars based on accuracy - can go up OR down
      const finalCorrectCount = [...results, { questionId: questions[currentQuestionIndex].id, correct: answeredCorrectly }]
        .filter(r => r.correct).length;
      const accuracy = (finalCorrectCount / questions.length) * 100;

      // Award or deduct stars based on accuracy
      let starsChange = 0;
      if (accuracy >= 90) {
        starsChange = 1.0;
      } else if (accuracy >= 80) {
        starsChange = 0.75;
      } else if (accuracy >= 70) {
        starsChange = 0.5;
      } else if (accuracy >= 60) {
        starsChange = 0.25;
      } else if (accuracy >= 50) {
        starsChange = -0.25; // Penalty for poor performance
      } else {
        starsChange = -0.5; // Bigger penalty for very poor performance
      }

      const earnedStars = Math.max(0, Math.min(currentStars + starsChange, 5));
      setNewStars(earnedStars);
      console.log('⭐ Practice Complete: Accuracy:', accuracy.toFixed(1) + '%', 'Stars change:', starsChange > 0 ? '+' + starsChange : starsChange, 'Current:', currentStars, '→ New:', earnedStars);
      setIsComplete(true);
    }
  };

  const handleComplete = () => {
    // Save rating to localStorage or database
    const masteryKey = `lesson_mastery_${lesson.id}`;
    const masteryData = {
      rating: newStars,
      date: new Date().toISOString(),
      score: Math.round((correctCount / questions.length) * 100),
      completions: (currentStars || 0) + 1
    };
    console.log('⭐ Saving mastery data:', masteryData);
    localStorage.setItem(masteryKey, JSON.stringify(masteryData));

    if (onComplete) {
      onComplete(newStars);
    }
    if (onClose) {
      onClose();
    }
  };

  const getMasteryLevel = () => {
    const masteryKey = `lesson_mastery_${lesson.id}`;
    const saved = localStorage.getItem(masteryKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const correctCount = results.filter(r => r.correct).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  const masteryData = getMasteryLevel();

  if (questions.length === 0) {
    return (
      <>
        <AllLessonsNavigator
          lessonStructure={lessonStructure}
          currentLessonId={lesson?.id}
          lessonProgress={lessonProgress}
          lessonMode={lessonMode}
          setLessonMode={setLessonMode}
          onLessonChange={(lessonId) => {
            console.log('Practice: Switch to lesson', lessonId);
          }}
          onBackClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        />
        <div style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: '0',
          marginLeft: sidebarCollapsed ? '64px' : '320px',
          minHeight: '100vh',
          background: '#ffffff',
          maxWidth: sidebarCollapsed ? 'calc(100% - 64px)' : 'calc(100% - 320px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'margin-left 0.3s ease, max-width 0.3s ease'
        }}>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '0.95rem', color: '#64748b' }}>Loading practice questions...</div>
          </div>
        </div>
      </>
    );
  }

  if (isComplete) {
    const getMasteryLabel = (stars) => {
      if (stars === 0) return 'Not Started';
      if (stars === 1) return 'Beginner';
      if (stars === 2) return 'Learning';
      if (stars === 3) return 'Competent';
      if (stars === 4) return 'Advanced';
      if (stars === 5) return 'Expert';
      return 'Not Started';
    };

    const isMaxStars = newStars === 5;

    return (
      <>
        <AllLessonsNavigator
          lessonStructure={lessonStructure}
          currentLessonId={lesson?.id}
          lessonProgress={lessonProgress}
          lessonMode={lessonMode}
          setLessonMode={setLessonMode}
          onLessonChange={(lessonId) => {
            console.log('Practice: Switch to lesson', lessonId);
          }}
          onBackClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        />
        <div style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: '0',
          marginLeft: sidebarCollapsed ? '64px' : '320px',
          minHeight: '100vh',
          background: '#ffffff',
          maxWidth: sidebarCollapsed ? 'calc(100% - 64px)' : 'calc(100% - 320px)',
          transition: 'margin-left 0.3s ease, max-width 0.3s ease'
        }}>
        <div style={{
          padding: '4rem 3rem',
          margin: '0 auto',
          maxWidth: '900px'
        }}>
          <div style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: '#1a1a1a'
          }}>
            Practice Session Complete
          </div>
          <div style={{
            fontSize: '1rem',
            textAlign: 'center',
            color: '#64748b',
            marginBottom: '3rem'
          }}>
            {isMaxStars
              ? "Expert mastery achieved"
              : (() => {
                  const starsChange = newStars - currentStars;
                  if (starsChange >= 0.75) return "Excellent performance";
                  if (starsChange >= 0.5) return "Good progress";
                  if (starsChange >= 0.25) return "Making progress";
                  if (starsChange === 0) return "Review recommended";
                  if (starsChange >= -0.25) return "Review the lesson material";
                  return "Additional practice needed";
                })()
            }
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.5rem'
              }}>Questions Correct</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1a1a1a'
              }}>{correctCount}/{questions.length}</div>
            </div>
            <div style={{
              padding: '1.5rem',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.5rem'
              }}>Accuracy</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: accuracy >= 80 ? '#10b981' : accuracy >= 60 ? '#3b82f6' : '#64748b'
              }}>{accuracy}%</div>
            </div>
          </div>

          {/* Star Progression Display */}
          <div style={{
            marginTop: '0.5rem',
            marginBottom: '2.5rem',
            padding: '2rem 1.5rem',
            background: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#64748b',
              marginBottom: '1.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textAlign: 'center'
            }}>
              Mastery Level
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              {/* Previous Stars */}
              {currentStars > 0 && (
                <>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#9ca3af',
                      fontWeight: '500'
                    }}>Previous</div>
                    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = currentStars >= star;
                        const isHalf = currentStars >= star - 0.5 && currentStars < star;
                        return (
                          <div key={star} style={{ position: 'relative', width: '1.25rem', height: '1.25rem' }}>
                            {isHalf ? (
                              <>
                                <HiStar style={{ position: 'absolute', color: '#e5e7eb', fontSize: '1.25rem' }} />
                                <div style={{ position: 'absolute', width: '50%', overflow: 'hidden' }}>
                                  <HiStar style={{ color: '#cbd5e1', fontSize: '1.25rem' }} />
                                </div>
                              </>
                            ) : (
                              <HiStar style={{ color: isFilled ? '#cbd5e1' : '#e5e7eb', fontSize: '1.25rem' }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '400', color: '#cbd5e1' }}>→</div>
                </>
              )}

              {/* New Stars */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  fontSize: '0.7rem',
                  color: '#1a1a1a',
                  fontWeight: '600'
                }}>Current</div>
                <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = newStars >= star;
                    const isHalf = newStars >= star - 0.5 && newStars < star;
                    const starColor = '#1a1a1a';
                    return (
                      <div key={star} style={{ position: 'relative', width: '1.5rem', height: '1.5rem' }}>
                        {isHalf ? (
                          <>
                            <HiStar style={{ position: 'absolute', color: '#e5e7eb', fontSize: '1.5rem' }} />
                            <div style={{ position: 'absolute', width: '50%', overflow: 'hidden' }}>
                              <HiStar style={{ color: starColor, fontSize: '1.5rem' }} />
                            </div>
                          </>
                        ) : (
                          <HiStar
                            style={{
                              color: isFilled ? starColor : '#e5e7eb',
                              fontSize: '1.5rem'
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1a1a1a',
              textAlign: 'center'
            }}>
              {getMasteryLabel(newStars)}
            </div>

            {!isMaxStars && newStars < 5 && (
              <div style={{
                fontSize: '0.8rem',
                color: '#9ca3af',
                textAlign: 'center',
                marginTop: '0.75rem'
              }}>
                {Math.ceil((5 - newStars) * 2)} more practice session{Math.ceil((5 - newStars) * 2) !== 1 ? 's' : ''} needed for Expert level
              </div>
            )}
          </div>

          <button
            onClick={handleComplete}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#007AFF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0051D5';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#007AFF';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            Continue
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <AllLessonsNavigator
        lessonStructure={lessonStructure}
        currentLessonId={lesson?.id}
        lessonProgress={lessonProgress}
        lessonMode={lessonMode}
        setLessonMode={setLessonMode}
        onLessonChange={(lessonId) => {
          // Switch to the selected lesson in practice mode
          console.log('Practice: Switch to lesson', lessonId);
          // This would need to be wired up to actually change lessons
        }}
        onBackClick={() => {
          // Close practice and go back
          if (onClose) {
            onClose();
          }
        }}
      />
      <div style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '0',
        marginLeft: sidebarCollapsed ? '64px' : '320px',
        minHeight: '100vh',
        background: '#ffffff',
        maxWidth: sidebarCollapsed ? 'calc(100% - 64px)' : 'calc(100% - 320px)',
        transition: 'margin-left 0.3s ease, max-width 0.3s ease'
      }}>
        {/* Minimal Header */}
        <div style={{
          padding: '1.5rem 3rem 1rem 3rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
        {masteryData && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontWeight: '500',
              color: '#64748b'
            }}>
              <HiStar size={14} />
              {masteryData.rating}/5
            </div>
          </div>
        )}
        <div style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#1a1a1a',
          marginBottom: '0.35rem'
        }}>
          {lesson?.title || 'Practice Session'}
        </div>
        <div style={{
          fontSize: '0.8rem',
          color: '#64748b',
          marginBottom: '0.75rem'
        }}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div style={{
          width: '100%',
          height: '3px',
          background: '#f1f5f9',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: '#10b981',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Question - matching ExampleCard.jsx layout */}
      <div style={{
        padding: '2rem 3rem',
        position: 'relative'
      }}>
        {/* Two-column grid layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* LEFT SIDE: Problem Statement */}
          <div style={{
            position: 'sticky',
            top: '2rem',
            alignSelf: 'start',
            maxHeight: 'calc(100vh - 4rem)',
            overflowY: 'auto'
          }}>
            <div style={{
              fontSize: '17px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              lineHeight: '1.6',
              fontWeight: '400',
              color: '#1f2937'
            }}>
              {currentQuestion.text}
            </div>
          </div>

          {/* RIGHT SIDE: Answer Choices */}
          <div style={{
            position: 'sticky',
            top: '2rem',
            alignSelf: 'flex-start'
          }}>
            {/* Answer choices */}
            {currentQuestion.choices.map((choice, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;
              const hasCheckedAnswer = showExplanation;

              return (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  <div
                    onClick={() => !hasCheckedAnswer && handleAnswerSelect(index)}
                    style={{
                      cursor: hasCheckedAnswer ? 'default' : 'pointer',
                      borderLeft: hasCheckedAnswer && isSelected && isCorrectAnswer ? '3px solid #48bb78' :
                                  hasCheckedAnswer && isSelected && !isCorrectAnswer ? '3px solid #f56565' :
                                  hasCheckedAnswer && !isSelected && isCorrectAnswer ? '3px solid #48bb78' : 'none',
                      backgroundColor: hasCheckedAnswer && isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.08)' :
                                       hasCheckedAnswer && isSelected && !isCorrectAnswer ? 'rgba(245, 101, 101, 0.08)' :
                                       hasCheckedAnswer && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.08)' : 'transparent',
                      borderRadius: '6px',
                      padding: '0.75rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {/* Choice letter and text */}
                    <div style={{
                      display: 'flex',
                      gap: '0.8rem',
                      alignItems: 'center'
                    }}>
                      {/* Circular letter indicator */}
                      <div style={{
                        width: '26px',
                        height: '26px',
                        minWidth: '26px',
                        borderRadius: '50%',
                        border: isSelected && !hasCheckedAnswer ? '2px solid #3b82f6' :
                                hasCheckedAnswer && isSelected && isCorrectAnswer ? '2px solid #48bb78' :
                                hasCheckedAnswer && isSelected && !isCorrectAnswer ? '2px solid #f56565' :
                                hasCheckedAnswer && !isSelected && isCorrectAnswer ? '2px solid #48bb78' : '2px solid #cbd5e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '600',
                        fontSize: '0.7rem',
                        color: isSelected && !hasCheckedAnswer ? '#3b82f6' :
                                hasCheckedAnswer && isSelected && isCorrectAnswer ? '#48bb78' :
                                hasCheckedAnswer && isSelected && !isCorrectAnswer ? '#f56565' :
                                hasCheckedAnswer && !isSelected && isCorrectAnswer ? '#48bb78' : '#718096',
                        backgroundColor: isSelected && !hasCheckedAnswer ? 'rgba(59, 130, 246, 0.1)' :
                                         hasCheckedAnswer && isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.15)' :
                                         hasCheckedAnswer && isSelected && !isCorrectAnswer ? 'rgba(245, 101, 101, 0.15)' :
                                         hasCheckedAnswer && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.15)' : 'transparent',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}>
                        {hasCheckedAnswer && isSelected && isCorrectAnswer ? '✓' :
                         hasCheckedAnswer && isSelected && !isCorrectAnswer ? '✗' :
                         hasCheckedAnswer && !isSelected && isCorrectAnswer ? '✓' : String.fromCharCode(65 + index)}
                      </div>

                      {/* Option text */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '15px',
                          color: '#1f2937',
                          lineHeight: '1.5',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                          fontWeight: '400'
                        }}>
                          {choice}
                        </div>
                      </div>
                    </div>

                    {/* Explanation - only show for correct answer */}
                    {hasCheckedAnswer && currentQuestion.explanation && isCorrectAnswer && (
                      <div style={{
                        marginTop: '0.75rem',
                        marginLeft: '2.25rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                        animation: 'fadeSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        opacity: 1
                      }}>
                        <div style={{
                          fontSize: '0.8rem',
                          lineHeight: '1.6',
                          color: '#374151',
                          marginBottom: '0.5rem'
                        }}>
                          {currentQuestion.explanation}
                        </div>
                        <div style={{
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          color: '#16a34a'
                        }}>
                          ✓ CORRECT
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Check Answer Button or Next Button */}
            {!showExplanation ? (
              <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                  style={{
                    backgroundColor: selectedAnswer === null ? '#cbd5e1' : '#007AFF',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '400',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: selectedAnswer === null ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedAnswer !== null) {
                      e.target.style.backgroundColor = '#0051D5';
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedAnswer !== null) {
                      e.target.style.backgroundColor = '#007AFF';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: '-1px' }}>
                      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Check Answer
                  </span>
                </button>
              </div>
            ) : (
              <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={handleNext}
                  style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '400',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#059669';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#10b981';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Practice'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Smooth animation styles */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }
      `}</style>
    </div>
    </>
  );
};

export default PracticeSession;
