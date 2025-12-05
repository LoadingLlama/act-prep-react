/**
 * Practice Session Component
 * Gamified practice interface with 5-star capability rating system
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiStar, HiUser } from 'react-icons/hi2';
import { useAuth } from '../../contexts/AuthContext';
import { useAppStyles } from '../../styles/App.styles';
import { hasProSubscription } from '../../services/subscription.service';
import { supabase } from '../../services/api/supabase.service';
import LessonsService from '../../services/api/lessons.service';
import AllLessonsNavigator from '../AllLessonsNavigator';
import { lessonStructure } from '../../data/lessonStructure';

const PracticeSession = ({ lesson, onClose, onComplete, lessonMode, setLessonMode, lessonProgress = {}, useExternalSidebar = false, preloadedQuestions, currentQuestionIndex: externalQuestionIndex, externalFlaggedQuestions, onPracticeStateChange, updateLessonProgress }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const classes = useAppStyles();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(externalQuestionIndex || 0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStars, setCurrentStars] = useState(0);
  const [newStars, setNewStars] = useState(0);
  const [attempts, setAttempts] = useState({}); // Track attempts per question
  const [showTryAgain, setShowTryAgain] = useState(false); // Track if showing try again message
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });
  const [sidebarView, setSidebarView] = useState('practice'); // 'lessons' or 'practice'
  const [isPro, setIsPro] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) return;
      try {
        const proStatus = await hasProSubscription(user.id);
        setIsPro(proStatus);
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };
    checkSubscription();
  }, [user]);

  // Toggle flag on a question
  const toggleFlag = (questionIndex) => {
    setFlaggedQuestions(prev => {
      const newFlags = new Set(prev);
      if (newFlags.has(questionIndex)) {
        newFlags.delete(questionIndex);
      } else {
        newFlags.add(questionIndex);
      }
      return newFlags;
    });
  };

  // Reset state when question index changes
  useEffect(() => {
    // When switching questions, ensure all state is clean
    if (!showExplanation) {
      setSelectedAnswer(null);
      setAnsweredCorrectly(null);
      setShowTryAgain(false);
    }
  }, [currentQuestionIndex]);

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
    // Use preloaded questions if available, otherwise load them
    const loadPracticeQuestions = async () => {
      // Check if we have preloaded questions
      if (preloadedQuestions && preloadedQuestions.length > 0) {
        console.log(`✅ Using ${preloadedQuestions.length} preloaded practice questions (instant)`);
        setQuestions(preloadedQuestions);
        return;
      }

      // Otherwise, load them now
      try {
        const startTime = performance.now();

        // Get the actual lesson UUID from Supabase
        let lessonUUID = lesson.id;
        if (!lesson.id || !lesson.id.includes('-') || lesson.id.length < 30) {
          const lessonData = await LessonsService.getLessonByKey(lesson.id);
          lessonUUID = lessonData?.id;
        }

        console.log('📝 Loading practice questions for lesson:', lessonUUID);

        // Fetch practice questions from the database with optimized query
        const { data: practiceQs, error } = await supabase
          .from('practice_questions')
          .select('id, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg, position')
          .eq('lesson_id', lessonUUID)
          .order('position', { ascending: true })
          .limit(500);

        if (error) {
          console.error('Error loading practice questions:', error);
          throw error;
        }

        const loadTime = performance.now() - startTime;
        console.log(`📝 Found ${practiceQs?.length || 0} practice questions in ${loadTime.toFixed(0)}ms`);

        if (!practiceQs || practiceQs.length === 0) {
          // Fallback to mock questions if no practice questions found
          console.log('⚠️ No practice questions found, using mock questions');
          const mockQuestions = [{
            id: 1,
            text: "This is a practice question for " + (lesson?.title || "this lesson"),
            choices: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: 1,
            explanation: "Practice questions will be generated from lesson examples once they are added to the database."
          }];
          setQuestions(mockQuestions);
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

        console.log(`✅ Practice questions ready in ${(performance.now() - startTime).toFixed(0)}ms`);
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
  }, [lesson, preloadedQuestions]);

  // Sync external question index from sidebar navigation
  useEffect(() => {
    if (externalQuestionIndex !== undefined && externalQuestionIndex !== currentQuestionIndex) {
      setCurrentQuestionIndex(externalQuestionIndex);
      setSelectedAnswer(null);
      setAnsweredCorrectly(null);
      setShowExplanation(false);
    }
  }, [externalQuestionIndex]);

  // Sync external flagged questions from sidebar navigation
  useEffect(() => {
    if (externalFlaggedQuestions !== undefined) {
      setFlaggedQuestions(externalFlaggedQuestions);
    }
  }, [externalFlaggedQuestions]);

  // Update parent component with practice state changes (excluding flagged questions to prevent loops)
  useEffect(() => {
    if (onPracticeStateChange) {
      onPracticeStateChange({
        questions,
        currentQuestionIndex,
        results,
        flaggedQuestions
      });
    }
  }, [questions, currentQuestionIndex, results]); // Removed onPracticeStateChange and flaggedQuestions to prevent infinite loop

  // Separate useEffect for flagged questions changes (manual flag toggles only)
  const flaggedQuestionsRef = useRef(flaggedQuestions);
  useEffect(() => {
    // Only update if the Set actually changed (not just a new reference)
    const prevSize = flaggedQuestionsRef.current?.size || 0;
    const currSize = flaggedQuestions?.size || 0;

    if (prevSize !== currSize && onPracticeStateChange) {
      flaggedQuestionsRef.current = flaggedQuestions;
      onPracticeStateChange({
        questions,
        currentQuestionIndex,
        results,
        flaggedQuestions
      });
    }
  }, [flaggedQuestions?.size]); // Only trigger when the size changes

  const handleAnswerSelect = (choiceIndex) => {
    if (showExplanation) return; // Prevent changing answer after checking
    setSelectedAnswer(choiceIndex);
    setAnsweredCorrectly(null); // Reset the wrong answer state when selecting new answer
    setShowTryAgain(false); // Hide try again when selecting new answer
  };

  // Function to play success sound
  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Create a pleasant chord progression
      const now = audioContext.currentTime;

      // Play three notes in succession for a pleasant sound
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 (C major chord)

      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = freq;
        oscillator.type = 'sine';

        // Envelope for smooth sound
        const startTime = now + (index * 0.1);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.5);
      });
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const questionId = currentQuestion.id;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setAnsweredCorrectly(isCorrect);

    // Only show explanation if correct
    if (isCorrect) {
      // Play success sound
      playSuccessSound();

      setShowExplanation(true);

      // Track this attempt
      const attemptCount = (attempts[questionId] || 0) + 1;
      setAttempts({ ...attempts, [questionId]: attemptCount });

      // Record result (first attempt = true if attemptCount is 1)
      const isFirstAttempt = attemptCount === 1;
      const newResults = [...results, {
        questionId: currentQuestion.id,
        correct: isCorrect,
        firstAttempt: isFirstAttempt
      }];
      setResults(newResults);

      // Update mastery stars based on FIRST ATTEMPT correct answers only
      const firstAttemptCorrect = newResults.filter(r => r.correct && r.firstAttempt).length;
      const totalQuestions = questions.length;

      // Calculate star rating based on first-attempt correct answers
      let targetStars = 0;
      if (firstAttemptCorrect >= totalQuestions * 0.95) {  // 48+ out of 50 = 5 stars
        targetStars = 5.0;
      } else if (firstAttemptCorrect >= totalQuestions * 0.90) {  // 45+ out of 50 = 4.5 stars
        targetStars = 4.5;
      } else if (firstAttemptCorrect >= totalQuestions * 0.85) {  // 43+ out of 50 = 4 stars
        targetStars = 4.0;
      } else if (firstAttemptCorrect >= totalQuestions * 0.80) {  // 40+ out of 50 = 3.5 stars
        targetStars = 3.5;
      } else if (firstAttemptCorrect >= totalQuestions * 0.75) {  // 38+ out of 50 = 3 stars
        targetStars = 3.0;
      } else if (firstAttemptCorrect >= totalQuestions * 0.70) {  // 35+ out of 50 = 2.5 stars
        targetStars = 2.5;
      } else if (firstAttemptCorrect >= totalQuestions * 0.65) {  // 33+ out of 50 = 2 stars
        targetStars = 2.0;
      } else if (firstAttemptCorrect >= totalQuestions * 0.60) {  // 30+ out of 50 = 1.5 stars
        targetStars = 1.5;
      } else if (firstAttemptCorrect >= totalQuestions * 0.55) {  // 28+ out of 50 = 1 star
        targetStars = 1.0;
      } else if (firstAttemptCorrect >= totalQuestions * 0.50) {  // 25+ out of 50 = 0.5 stars
        targetStars = 0.5;
      } else {
        targetStars = 0;
      }

      // Smoothly adjust current stars toward target
      const adjustedStars = Math.max(0, Math.min(targetStars, 5));
      setCurrentStars(adjustedStars);

      // Save to localStorage continuously
      const masteryKey = `lesson_mastery_${lesson.id}`;
      const accuracy = (firstAttemptCorrect / newResults.length) * 100;
      const masteryData = {
        rating: adjustedStars,
        date: new Date().toISOString(),
        score: Math.round(accuracy),
        questionsAnswered: newResults.length,
        totalQuestions: questions.length
      };
      localStorage.setItem(masteryKey, JSON.stringify(masteryData));

      // Update lesson progress to database to mark as in-progress
      // This keeps the last_accessed_at timestamp fresh
      if (updateLessonProgress && lessonProgress[lesson.id] !== 'completed') {
        console.log(`📝 Updating progress during practice: ${lesson.id} - in-progress`);
        updateLessonProgress(lesson.id, 'in-progress');
      }
    } else {
      // Wrong answer - track the attempt, show "Try again" feedback
      const attemptCount = (attempts[questionId] || 0) + 1;
      setAttempts({ ...attempts, [questionId]: attemptCount });
      setShowExplanation(false);
      setShowTryAgain(true);

      // Auto-fade after 3 seconds
      setTimeout(() => {
        setShowTryAgain(false);
      }, 3000);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnsweredCorrectly(null);
      setShowExplanation(false);
      setShowTryAgain(false);
    } else {
      // Session complete - currentStars has been updated continuously
      setNewStars(currentStars);
      const correctCount = results.filter(r => r.correct && r.firstAttempt).length;
      const accuracy = (correctCount / questions.length) * 100;
      console.log('⭐ Practice Complete: First-Attempt Accuracy:', accuracy.toFixed(1) + '%', 'Final Rating:', currentStars.toFixed(1), 'stars');

      // Mark lesson as completed in the database
      if (updateLessonProgress) {
        console.log(`✅ Marking lesson as completed: ${lesson.id}`);
        updateLessonProgress(lesson.id, 'completed');
      }

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

    // Ensure lesson is marked as completed when user clicks "Complete" button
    if (updateLessonProgress) {
      console.log(`✅ Final completion: marking ${lesson.id} as completed`);
      updateLessonProgress(lesson.id, 'completed');
    }

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
  const correctCount = results.filter(r => r.correct && r.firstAttempt).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  const masteryData = getMasteryLevel();

  // Helper function to separate passage from question
  const parseQuestionText = (fullText) => {
    if (!fullText) return { passage: '', question: '' };

    // Question patterns ordered by priority (most specific first)
    // These patterns typically start the actual question part
    const questionPatterns = [
      'For the sake of logic and cohesion',
      'For the sake of logic and coherence',
      'For the sake of the logic and cohesion',
      'The writer is considering adding',
      'The writer is considering deleting',
      'The writer is considering',
      'The writer wants to',
      'At this point, the writer',
      'Which choice most effectively',
      'Which choice best',
      'Which choice',
      'Which sentence',
      'Which of the following',
      'Given that all',
      'Given that the',
      'If the writer were to',
      'The best placement',
      'Should the underlined',
      'Should the writer',  // This is last because it often appears at the end
      'In the context of',
      'Suppose the writer',
      'What would be lost'
    ];

    // Find the FIRST occurrence of any question pattern (earliest in text)
    let questionStartIndex = fullText.length;
    let foundPattern = '';

    for (const pattern of questionPatterns) {
      const index = fullText.indexOf(pattern);
      if (index !== -1 && index < questionStartIndex) {
        questionStartIndex = index;
        foundPattern = pattern;
      }
    }

    // If we found a question pattern, split there
    if (questionStartIndex < fullText.length) {
      // Check if there's a paragraph break before the question
      const textBeforeQuestion = fullText.substring(0, questionStartIndex);
      const lastDoubleNewline = textBeforeQuestion.lastIndexOf('\n\n');

      // If there's a paragraph break within 50 chars before the question pattern, split there
      if (lastDoubleNewline > 0 && (questionStartIndex - lastDoubleNewline) < 100) {
        return {
          passage: fullText.substring(0, lastDoubleNewline).trim(),
          question: fullText.substring(lastDoubleNewline).trim()
        };
      }

      // Otherwise split at the pattern itself
      return {
        passage: fullText.substring(0, questionStartIndex).trim(),
        question: fullText.substring(questionStartIndex).trim()
      };
    }

    // Fallback: look for the last question mark
    const lastQuestionMark = fullText.lastIndexOf('?');
    if (lastQuestionMark > 0) {
      // Find the start of the last question (look backward for paragraph break)
      let questionStart = fullText.lastIndexOf('\n\n', lastQuestionMark);
      if (questionStart === -1) {
        questionStart = 0;
      }

      return {
        passage: fullText.substring(0, questionStart).trim(),
        question: fullText.substring(questionStart).trim()
      };
    }

    // If no question found, treat it all as passage
    return {
      passage: fullText,
      question: ''
    };
  };

  // Safety check - if no current question or questions not loaded yet
  if (questions.length === 0 || !currentQuestion) {
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
          {/* Top Header Bar matching home page */}
          <div className={classes.topHeader}>
            <div className={classes.topHeaderContent}>
              <div style={{ flex: 1 }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {user && isPro && (
                  <div className={classes.proBadge}>
                    Pro
                  </div>
                )}
                {user && (
                  <div
                    className={classes.profilePicture}
                    onClick={() => navigate('/app/profile')}
                  >
                    <HiUser style={{ width: '24px', height: '24px' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)' }}>
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '0.95rem', color: '#64748b' }}>Loading practice questions...</div>
            </div>
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
        {/* Top Header Bar matching home page */}
        <div className={classes.topHeader}>
          <div className={classes.topHeaderContent}>
            <div style={{ flex: 1 }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {user && isPro && (
                <div className={classes.proBadge}>
                  Pro
                </div>
              )}
              <div
                className={classes.profilePicture}
                onClick={() => navigate('/app/profile')}
              >
                <HiUser style={{ width: '24px', height: '24px' }} />
              </div>
            </div>
          </div>
        </div>
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
              ? "Expert mastery achieved - Perfect score!"
              : `You got ${correctCount} out of ${questions.length} questions correct`
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
                color: accuracy >= 80 ? '#10b981' : accuracy >= 60 ? '#b91c1c' : '#64748b'
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

          {/* Show Retry button only if there are incorrect answers */}
          {(() => {
            const incorrectCount = results.filter(r => !r.correct).length;
            if (incorrectCount > 0) {
              return (
                <button
                  onClick={() => {
                    // Get IDs of incorrectly answered questions
                    const incorrectQuestionIds = results.filter(r => !r.correct).map(r => r.questionId);
                    // Filter questions to only include incorrect ones
                    const incorrectQuestions = questions.filter(q => incorrectQuestionIds.includes(q.id));
                    // Reset state with only incorrect questions
                    setQuestions(incorrectQuestions);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswer(null);
                    setAnsweredCorrectly(null);
                    setShowExplanation(false);
                    setResults([]);
                    setIsComplete(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 3px 0 0 rgba(239, 68, 68, 0.4)',
                    marginBottom: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#dc2626';
                    e.target.style.boxShadow = '0 3px 0 0 rgba(220, 38, 38, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#ef4444';
                    e.target.style.boxShadow = '0 3px 0 0 rgba(239, 68, 68, 0.4)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'translateY(1px)';
                    e.target.style.boxShadow = '0 2px 0 0 rgba(220, 38, 38, 0.5)';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 3px 0 0 rgba(220, 38, 38, 0.5)';
                  }}
                >
                  Retry Incorrect Questions ({incorrectCount})
                </button>
              );
            }
            return null;
          })()}

          <button
            onClick={handleComplete}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#b91c1c',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 3px 0 0 rgba(37, 99, 235, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1d4ed8';
              e.target.style.boxShadow = '0 3px 0 0 rgba(29, 78, 216, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#b91c1c';
              e.target.style.boxShadow = '0 3px 0 0 rgba(37, 99, 235, 0.4)';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(1px)';
              e.target.style.boxShadow = '0 2px 0 0 rgba(29, 78, 216, 0.5)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 3px 0 0 rgba(29, 78, 216, 0.5)';
            }}
          >
            Continue
          </button>
        </div>
      </div>
      </>
    );
  }

  // Parse question text to separate passage from question
  const { passage, question } = parseQuestionText(currentQuestion.text);

  // Debug logging removed - was causing console spam
  // Questions without clear passage/question separation are handled gracefully below

  return (
    <>
      {/* Question Navigator Sidebar - Only render if not using external sidebar */}
      {!useExternalSidebar && (
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: sidebarCollapsed ? '64px' : '320px',
        height: '100vh',
        background: '#f8fafc',
        borderRight: '1px solid #e5e7eb',
        overflowY: 'auto',
        transition: 'width 0.3s ease',
        zIndex: 1001
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          background: '#ffffff'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem'
          }}>
            <button
              onClick={() => {
                if (onClose) onClose();
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.25rem',
                color: '#64748b',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              ←
            </button>
            {!sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  color: '#64748b',
                  padding: '0.25rem'
                }}
              >
                ◀
              </button>
            )}
          </div>
          {!sidebarCollapsed && (
            <>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '0.75rem'
              }}>
                {lesson?.title || 'Practice'}
              </div>

              {/* Toggle Tabs */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                background: '#f1f5f9',
                borderRadius: '8px',
                padding: '0.25rem'
              }}>
                <button
                  onClick={() => setSidebarView('practice')}
                  style={{
                    flex: 1,
                    padding: '0.5rem 0.75rem',
                    background: sidebarView === 'practice' ? '#ffffff' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: sidebarView === 'practice' ? '600' : '400',
                    color: sidebarView === 'practice' ? '#1a1a1a' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: sidebarView === 'practice' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  Questions
                </button>
                <button
                  onClick={() => setSidebarView('lessons')}
                  style={{
                    flex: 1,
                    padding: '0.5rem 0.75rem',
                    background: sidebarView === 'lessons' ? '#ffffff' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: sidebarView === 'lessons' ? '600' : '400',
                    color: sidebarView === 'lessons' ? '#1a1a1a' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: sidebarView === 'lessons' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  All Lessons
                </button>
              </div>
            </>
          )}
        </div>

        {/* Expand button when collapsed */}
        {sidebarCollapsed && (
          <div style={{ padding: '1rem', textAlign: 'center' }}>
            <button
              onClick={() => setSidebarCollapsed(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                color: '#64748b'
              }}
            >
              ▶
            </button>
          </div>
        )}

        {/* Practice Questions or Lessons List */}
        {!sidebarCollapsed && sidebarView === 'practice' && (
          <div style={{ padding: '1rem' }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#64748b',
              marginBottom: '0.75rem',
              paddingLeft: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{questions.length} Questions</span>
              {flaggedQuestions.size > 0 && (
                <span style={{ color: '#dc2626', fontSize: '0.7rem' }}>
                  {flaggedQuestions.size} flagged
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {questions.map((question, index) => {
                const isAnswered = results.some(r => r.questionId === question.id);
                const isCorrect = results.find(r => r.questionId === question.id)?.correct;
                const isCurrent = index === currentQuestionIndex;
                const isFlagged = flaggedQuestions.has(index);

                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: isCurrent ? '#e0f2fe' : 'transparent',
                      borderLeft: isCurrent ? '3px solid #b91c1c' : '3px solid transparent',
                      borderRadius: '6px',
                      padding: '0.5rem 0.5rem 0.5rem 0.25rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <button
                      onClick={() => {
                        setCurrentQuestionIndex(index);
                        setSelectedAnswer(null);
                        setAnsweredCorrectly(null);
                        setShowExplanation(false);
                        setShowTryAgain(false);
                      }}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.25rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.parentElement.style.background = '#f1f5f9';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.parentElement.style.background = 'transparent';
                        }
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        minWidth: '28px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        background: isAnswered
                          ? (isCorrect ? '#dcfce7' : '#fee2e2')
                          : (isCurrent ? '#dbeafe' : '#f1f5f9'),
                        color: isAnswered
                          ? (isCorrect ? '#16a34a' : '#dc2626')
                          : (isCurrent ? '#b91c1c' : '#64748b')
                      }}>
                        {isAnswered
                          ? (isCorrect ? '✓' : '✗')
                          : (index + 1)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '0.85rem',
                          fontWeight: isCurrent ? '600' : '400',
                          color: isCurrent ? '#1a1a1a' : '#374151',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          Question {index + 1}
                        </div>
                      </div>
                    </button>
                    {/* Flag button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlag(index);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        color: isFlagged ? '#dc2626' : '#9ca3af',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isFlagged) {
                          e.target.style.color = '#dc2626';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isFlagged) {
                          e.target.style.color = '#9ca3af';
                        }
                      }}
                      title={isFlagged ? 'Remove flag' : 'Flag for review'}
                    >
                      🚩
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!sidebarCollapsed && sidebarView === 'lessons' && (
          <div style={{ padding: '1rem' }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#64748b',
              marginBottom: '0.75rem',
              paddingLeft: '0.5rem'
            }}>
              English Lessons
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {lessonStructure.filter(l => l.section === 'english').map((englishLesson, index) => {
                const isCurrent = englishLesson.id === lesson?.id;
                const masteryKey = `lesson_mastery_${englishLesson.id}`;
                const masteryData = JSON.parse(localStorage.getItem(masteryKey) || '{}');
                const masteryStars = masteryData.rating || 0;

                return (
                  <button
                    key={englishLesson.id}
                    onClick={() => {
                      if (onClose) {
                        onClose();
                        // Navigate to the selected lesson
                        if (setLessonMode) {
                          setLessonMode('learn', englishLesson.id);
                        }
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      background: isCurrent ? '#e0f2fe' : 'transparent',
                      border: 'none',
                      borderLeft: isCurrent ? '3px solid #b91c1c' : '3px solid transparent',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrent) {
                        e.currentTarget.style.background = '#f1f5f9';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCurrent) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      minWidth: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: isCurrent ? '#dbeafe' : '#f1f5f9',
                      color: isCurrent ? '#b91c1c' : '#64748b'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.85rem',
                        fontWeight: isCurrent ? '600' : '400',
                        color: isCurrent ? '#1a1a1a' : '#374151',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginBottom: masteryStars > 0 ? '0.25rem' : '0'
                      }}>
                        {englishLesson.title}
                      </div>
                      {masteryStars > 0 && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          {[...Array(5)].map((_, starIndex) => (
                            <HiStar
                              key={starIndex}
                              size={10}
                              style={{
                                color: starIndex < Math.floor(masteryStars) ? '#fbbf24' : '#d1d5db'
                              }}
                            />
                          ))}
                          <span style={{
                            fontSize: '0.7rem',
                            color: '#64748b',
                            marginLeft: '0.25rem'
                          }}>
                            {masteryStars.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      )}
      <div style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '0',
        marginLeft: useExternalSidebar ? (sidebarCollapsed ? '64px' : '240px') : (sidebarCollapsed ? '64px' : '320px'),
        minHeight: '100vh',
        background: '#ffffff',
        maxWidth: useExternalSidebar ? (sidebarCollapsed ? 'calc(100% - 64px)' : 'calc(100% - 240px)') : (sidebarCollapsed ? 'calc(100% - 64px)' : 'calc(100% - 320px)'),
        transition: 'margin-left 0.3s ease, max-width 0.3s ease'
      }}>
        {/* Top Header Bar matching home page */}
        <div style={{
          width: '100%',
          marginLeft: 0,
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'width 0.3s ease, margin-left 0.3s ease'
        }}>
          <div style={{
            width: '100%',
            paddingTop: '0.625rem',
            paddingBottom: '0.625rem',
            paddingLeft: '1rem',
            paddingRight: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'padding-left 0.3s ease'
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1a1a1a'
              }}>
                {lesson?.title || 'Practice Session'}
              </div>
            </div>
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.875rem',
              color: '#1a1a1a',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center'
            }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
              {user && isPro && (
                <div className={classes.proBadge}>
                  Pro
                </div>
              )}
              <div
                className={classes.profilePicture}
                onClick={() => navigate('/app/profile')}
              >
                <HiUser style={{ width: '24px', height: '24px' }} />
              </div>
            </div>
          </div>
          {/* Progress Bar inside header */}
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

      {/* Question - centered single column layout */}
      <div className="practice-question-container" style={{
        padding: '0 3rem',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: 'calc(100vh - 60px)'
      }}>
        {/* Single column centered layout */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Passage/Context at top if it exists */}
          {passage && (
            <div style={{
              fontSize: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              lineHeight: '1.7',
              fontWeight: '400',
              color: '#1f2937',
              marginBottom: '2rem'
            }}
              dangerouslySetInnerHTML={{ __html: passage }}
              className="passage-content"
            />
          )}

          {/* Question Text centered with flag button */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
            {question && (
              <div style={{
                flex: 1,
                fontSize: '17px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                lineHeight: '1.6',
                fontWeight: '500',
                color: '#1a1a1a',
                textAlign: 'left'
              }} dangerouslySetInnerHTML={{ __html: question }} />
            )}
            {/* Flag button */}
            <button
              onClick={() => toggleFlag(currentQuestionIndex)}
              style={{
                background: 'transparent',
                border: 'none',
                borderRadius: '6px',
                padding: '0.375rem 0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: flaggedQuestions.has(currentQuestionIndex) ? '#dc2626' : '#9ca3af'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(0, 0, 0, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
              title={flaggedQuestions.has(currentQuestionIndex) ? 'Remove flag' : 'Flag for review'}
            >
              <span style={{ fontSize: '0.875rem' }}>🚩</span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '500',
                color: flaggedQuestions.has(currentQuestionIndex) ? '#dc2626' : '#9ca3af'
              }}>
                {flaggedQuestions.has(currentQuestionIndex) ? 'Flagged' : 'Flag'}
              </span>
            </button>
          </div>

            {/* Answer choices */}
            {currentQuestion.choices.map((choice, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;

              return (
                <div key={index} style={{ marginBottom: '0.75rem' }}>
                  <div
                    onClick={() => handleAnswerSelect(index)}
                    style={{
                      cursor: showExplanation ? 'default' : 'pointer',
                      border: isSelected && answeredCorrectly === null ? '2px solid #b91c1c' :
                              answeredCorrectly === true && isCorrectAnswer ? '2px solid #48bb78' : '2px solid #e5e7eb',
                      backgroundColor: answeredCorrectly === true && isCorrectAnswer ? 'rgba(72, 187, 120, 0.08)' :
                                       isSelected && answeredCorrectly === null ? 'rgba(59, 130, 246, 0.05)' : '#ffffff',
                      borderRadius: '8px',
                      padding: '1rem',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected && answeredCorrectly === null ? '0 3px 0 0 rgba(59, 130, 246, 0.3)' :
                                 answeredCorrectly === true && isCorrectAnswer ? '0 3px 0 0 rgba(72, 187, 120, 0.3)' : '0 2px 0 0 rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      if (!showExplanation) {
                        e.currentTarget.style.backgroundColor = answeredCorrectly === true && isCorrectAnswer ? 'rgba(72, 187, 120, 0.08)' : 'rgba(0, 0, 0, 0.02)';
                        if (!isSelected && answeredCorrectly !== true) {
                          e.currentTarget.style.boxShadow = '0 3px 0 0 rgba(0, 0, 0, 0.1)';
                        }
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!showExplanation) {
                        e.currentTarget.style.backgroundColor = answeredCorrectly === true && isCorrectAnswer ? 'rgba(72, 187, 120, 0.08)' :
                                                                 isSelected && answeredCorrectly === null ? 'rgba(59, 130, 246, 0.05)' : '#ffffff';
                        if (!isSelected && answeredCorrectly !== true) {
                          e.currentTarget.style.boxShadow = '0 2px 0 0 rgba(0, 0, 0, 0.05)';
                        }
                      }
                    }}
                  >
                    {/* Choice letter and text */}
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'flex-start'
                    }}>
                      {/* Circular letter indicator */}
                      <div style={{
                        width: '28px',
                        height: '28px',
                        minWidth: '28px',
                        borderRadius: '50%',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '600',
                        fontSize: '0.8rem',
                        color: isSelected && answeredCorrectly === null ? '#ffffff' :
                                answeredCorrectly === true && isCorrectAnswer ? '#ffffff' : '#64748b',
                        backgroundColor: isSelected && answeredCorrectly === null ? '#08245b' :
                                         answeredCorrectly === true && isCorrectAnswer ? '#48bb78' : '#f1f5f9',
                        transition: 'all 0.2s ease'
                      }}>
                        {answeredCorrectly === true && isCorrectAnswer ? '✓' : String.fromCharCode(65 + index)}
                      </div>

                      {/* Option text or image */}
                      <div style={{ flex: 1 }}>
                        {typeof choice === 'object' && choice.image_url ? (
                          <img
                            src={choice.image_url}
                            alt={`Choice ${String.fromCharCode(65 + index)}`}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                              display: 'block',
                              borderRadius: '4px'
                            }}
                          />
                        ) : (
                          <div style={{
                            fontSize: '16px',
                            color: '#1f2937',
                            lineHeight: '1.6',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                            fontWeight: '400'
                          }}>
                            {typeof choice === 'object' ? choice.text : choice}
                          </div>
                        )}

                      </div>
                    </div>

                    {/* Explanation - only show when answered correctly */}
                    {answeredCorrectly === true && currentQuestion.choiceExplanations && currentQuestion.choiceExplanations[index] && (
                      <div style={{
                        marginTop: '0.75rem',
                        marginLeft: '2.75rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid #e5e7eb',
                        animation: 'fadeSlideIn 0.3s ease',
                        opacity: 1
                      }}>
                        <div
                          style={{
                            fontSize: '0.85rem',
                            lineHeight: '1.6',
                            color: '#4b5563'
                          }}
                          dangerouslySetInnerHTML={{ __html: currentQuestion.choiceExplanations[index] }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Check Answer or Try Again Button */}
            {!showExplanation ? (
              <div style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {/* Try again popup - positioned relative to button */}
                {showTryAgain && (
                  <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '0.5rem',
                    backgroundColor: '#ffffff',
                    color: '#1f2937',
                    padding: '0.625rem 0.875rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '400',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #e5e7eb',
                    zIndex: 10,
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    animation: 'fadeOut 3s ease-in-out forwards'
                  }}>
                    <div style={{ lineHeight: '1.3' }}>
                      Not quite yet... Give it another try!
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTryAgain(false);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#6b7280',
                        cursor: 'pointer',
                        padding: '0',
                        fontSize: '0.85rem',
                        lineHeight: '1',
                        opacity: 0.7,
                        transition: 'opacity 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '1'}
                      onMouseLeave={(e) => e.target.style.opacity = '0.7'}
                    >
                      ×
                    </button>
                    {/* Arrow pointing down - centered */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: '50%',
                      transform: 'translateX(-50%) rotate(45deg)',
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderTop: 'none',
                      borderLeft: 'none'
                    }} />
                  </div>
                )}
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                  style={{
                    backgroundColor: selectedAnswer === null ? '#cbd5e1' : '#08245b',
                    color: '#ffffff',
                    padding: '0.875rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: selectedAnswer === null ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: selectedAnswer === null ? '0 2px 0 0 rgba(0, 0, 0, 0.1)' : '0 3px 0 0 rgba(8, 36, 91, 0.4)',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedAnswer !== null) {
                      e.target.style.backgroundColor = '#0a2f7a';
                      e.target.style.boxShadow = '0 3px 0 0 rgba(10, 47, 122, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedAnswer !== null) {
                      e.target.style.backgroundColor = '#08245b';
                      e.target.style.boxShadow = '0 3px 0 0 rgba(8, 36, 91, 0.4)';
                    }
                  }}
                  onMouseDown={(e) => {
                    if (selectedAnswer !== null) {
                      e.target.style.transform = 'translateY(1px)';
                      e.target.style.boxShadow = '0 2px 0 0 rgba(10, 47, 122, 0.5)';
                    }
                  }}
                  onMouseUp={(e) => {
                    if (selectedAnswer !== null) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 3px 0 0 rgba(10, 47, 122, 0.5)';
                    }
                  }}
                >
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#ffffff'
                  }}>
                    {answeredCorrectly === false ? (
                      <>Try Again</>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: '-1px' }}>
                          <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Check Answer
                      </>
                    )}
                  </span>
                </button>
              </div>
            ) : (
              <div style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <button
                  onClick={handleNext}
                  style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.875rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 3px 0 0 rgba(16, 185, 129, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#059669';
                    e.target.style.boxShadow = '0 3px 0 0 rgba(5, 150, 105, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#10b981';
                    e.target.style.boxShadow = '0 3px 0 0 rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'translateY(1px)';
                    e.target.style.boxShadow = '0 2px 0 0 rgba(5, 150, 105, 0.5)';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 3px 0 0 rgba(5, 150, 105, 0.5)';
                  }}
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Practice'}
                </button>
              </div>
            )}
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

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
    </>
  );
};

export default PracticeSession;
