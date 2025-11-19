/**
 * Diagnostic Test Review Component
 * Opens the diagnostic test in the actual test interface with review mode enabled
 * Shows user's answers and correct/incorrect indicators
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HiXMark, HiArrowLeft } from 'react-icons/hi2';
import InsightsService from '../services/api/insights.service';
import DiagnosticService from '../services/api/diagnostic.service';
import { supabase } from '../supabaseClient';
import logger from '../services/logging/logger';
import { EnglishIcon, MathIcon, ReadingIcon, ScienceIcon, CheckCircleIcon, XCircleIcon, MinusCircleIcon } from './icons/SectionIcons';
import TimePerQuestionChart from './TimePerQuestionChart';

export default function DiagnosticTestReview({ sessionId, onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showFocusAreas, setShowFocusAreas] = useState(false);
  const iframeRef = useRef(null);

  // Section configurations
  const sectionConfig = {
    english: {
      name: 'English',
      icon: EnglishIcon,
      questionCount: 75,
      color: '#08245b' // Dark blue
    },
    math: {
      name: 'Mathematics',
      icon: MathIcon,
      questionCount: 60,
      color: '#b91c1c' // Red
    },
    reading: {
      name: 'Reading',
      icon: ReadingIcon,
      questionCount: 40,
      color: '#713f12' // Brown
    },
    science: {
      name: 'Science',
      icon: ScienceIcon,
      questionCount: 40,
      color: '#10b981' // Green
    }
  };

  // Load diagnostic test data
  useEffect(() => {
    loadDiagnosticData();
  }, [sessionId]);

  const loadDiagnosticData = async () => {
    try {
      setLoading(true);
      logger.info('DiagnosticTestReview', 'loadDiagnosticData', { sessionId });

      // Get user's answers and session info
      const { data: session, error: sessionError } = await supabase
        .from('diagnostic_test_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (sessionError) throw sessionError;

      // Get all user answers for this session (including timing data)
      const { data: results, error: resultsError } = await supabase
        .from('diagnostic_test_results')
        .select('*, time_spent, started_at, completed_at')
        .eq('diagnostic_session_id', sessionId)
        .order('created_at', { ascending: true });

      if (resultsError) throw resultsError;

      console.log(`📊 Loaded ${results?.length || 0} user answers from diagnostic_test_results with timing data`);

      // Load THE EXACT SAME QUESTIONS that the diagnostic test uses
      // This ensures review shows the same questions user saw during the test
      const sections = ['english', 'math', 'reading', 'science'];
      const questionsBySection = {};

      for (const section of sections) {
        console.log(`📥 Loading ${section} questions using DiagnosticService (same source as test)...`);
        const sectionQuestions = await DiagnosticService.getDiagnosticQuestions(section);
        console.log(`✅ Loaded ${sectionQuestions?.length || 0} ${section} questions`);
        questionsBySection[section] = sectionQuestions || [];
      }

      // Create a map of question_id -> user's answer/correctness/timing
      const userAnswersMap = {};
      const correctnessMap = {};
      const timingMap = {};

      results.forEach(result => {
        userAnswersMap[result.question_id] = result.user_answer;
        correctnessMap[result.question_id] = result.is_correct;
        timingMap[result.question_id] = {
          time_spent: result.time_spent,
          started_at: result.started_at,
          completed_at: result.completed_at
        };
      });

      // Merge questions with user answers
      const allResults = [];
      for (const section of sections) {
        const sectionQs = questionsBySection[section];
        sectionQs.forEach(q => {
          allResults.push({
            question_id: q.id,
            user_answer: userAnswersMap[q.id],
            is_correct: correctnessMap[q.id],
            question: q,
            time_spent: timingMap[q.id]?.time_spent || 0,
            started_at: timingMap[q.id]?.started_at,
            completed_at: timingMap[q.id]?.completed_at
          });
        });
      }

      const data = {
        session,
        results: allResults,
        questionsBySection: {
          english: allResults.filter(r => questionsBySection.english.find(q => q.id === r.question_id)).map(r => r),
          math: allResults.filter(r => questionsBySection.math.find(q => q.id === r.question_id)).map(r => r),
          reading: allResults.filter(r => questionsBySection.reading.find(q => q.id === r.question_id)).map(r => r),
          science: allResults.filter(r => questionsBySection.science.find(q => q.id === r.question_id)).map(r => r)
        },
        totalQuestions: results.length,
        correctAnswers: results.filter(r => r.is_correct).length,
        scorePercentage: session.score_percentage
      };

      console.log('📊 Final diagnostic review data:', {
        totalQuestions: data.totalQuestions,
        english: data.questionsBySection.english.length,
        math: data.questionsBySection.math.length,
        reading: data.questionsBySection.reading.length,
        science: data.questionsBySection.science.length
      });

      setTestData(data);
      setLoading(false);
    } catch (err) {
      console.error('❌ Error loading diagnostic data:', err);
      setError('Failed to load diagnostic test data');
      setLoading(false);
    }
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle question click
  const handleQuestionClick = (section, questionIndex) => {
    setSelectedSection(section);
    setSelectedQuestion(questionIndex);

    // Load section data into iframe after it mounts, then jump to question
    setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        loadSectionIntoIframe(section);

        // After iframe loads, jump to the specific question
        setTimeout(() => {
          iframeRef.current?.contentWindow?.postMessage({
            type: 'JUMP_TO_QUESTION',
            questionIndex: questionIndex
          }, '*');
        }, 500);
      }
    }, 100);
  };

  // Handle review wrong answers (includes wrong and skipped)
  const handleReviewWrongAnswers = () => {
    // Find first section with wrong or skipped answers
    const wrongAnswerSections = Object.entries(sectionConfig).find(([key]) => {
      const sectionResults = testData.questionsBySection[key] || [];
      return sectionResults.some(r => !r.is_correct); // Wrong or skipped
    });

    if (wrongAnswerSections) {
      setSelectedSection(wrongAnswerSections[0]);
      setSelectedQuestion('wrong'); // Special flag to show only wrong/skipped answers
    }
  };

  // Handle section selection
  const handleSectionSelect = useCallback((section) => {
    if (!testData) return;

    console.log(`🎯 Loading section: ${section}`);
    setSelectedSection(section);
    setSelectedQuestion(null);

    // Load section data into iframe after it mounts
    setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        loadSectionIntoIframe(section);
      }
    }, 100);
  }, [testData]);

  // Load section data into the iframe
  const loadSectionIntoIframe = useCallback((section) => {
    if (!iframeRef.current?.contentWindow || !testData) return;

    const sectionQuestions = testData.questionsBySection[section] || [];

    console.log(`📤 Sending ${sectionQuestions.length} ${section} questions to iframe`);

    // Transform data to match practice test format
    const questions = sectionQuestions.map((result, idx) => {
      const q = result.question;

      console.log(`📝 Processing question ${q.question_number}:`, {
        has_choices: !!q.choices,
        choices_type: typeof q.choices,
        has_answers: !!q.answers,
        answers_type: typeof q.answers,
        answers_keys_count: q.answers ? Object.keys(q.answers).length : 0,
        choices_preview: q.choices ? JSON.stringify(q.choices).substring(0, 100) : null,
        answers_preview: q.answers ? JSON.stringify(q.answers).substring(0, 100) : null
      });

      // DiagnosticService should have already transformed choices into answers object
      let answers = {};

      if (q.answers && typeof q.answers === 'object' && !Array.isArray(q.answers) && Object.keys(q.answers).length > 0) {
        // Already transformed by DiagnosticService and has content
        answers = q.answers;
        console.log(`✅ Question ${q.question_number} already has answers object:`, Object.keys(answers));
      } else {
        // Fallback: Need to parse choices
        console.warn(`⚠️ Question ${q.question_number} missing answers, trying to parse from choices`);
        let parsedChoices = q.choices;
        if (typeof q.choices === 'string') {
          try {
            parsedChoices = JSON.parse(q.choices);
          } catch (e) {
            console.error('Failed to parse choices:', q.choices);
            parsedChoices = [];
          }
        }

        // Convert choices array to answers object format expected by practice-test.html
        // Choices are like ["F. NO CHANGE", "G. colors: rich oranges"]
        if (parsedChoices && Array.isArray(parsedChoices)) {
          parsedChoices.forEach((choice, choiceIdx) => {
            // Try multiple patterns
            let match = choice.match(/^([A-K])\.\s*(.+)$/);
            if (!match) match = choice.match(/^([A-K])\)\s*(.+)$/);
            if (!match) match = choice.match(/^([A-K]):\s*(.+)$/);
            if (!match) match = choice.match(/^([A-K])\s+(.+)$/);

            if (match) {
              answers[match[1]] = match[2].trim();
            } else {
              // Use array index as fallback
              const letter = String.fromCharCode(65 + choiceIdx);
              answers[letter] = choice.trim();
            }
          });
        }

        if (Object.keys(answers).length === 0) {
          console.error(`❌ Question ${q.question_number} has NO answers after all parsing attempts!`);
        } else {
          console.log(`✅ Question ${q.question_number} parsed answers:`, Object.keys(answers));
        }
      }

      // DiagnosticService returns correctAnswer which is already a letter (A, B, C, etc.) from database
      // Database stores correct_answer as a letter, not a number
      const correctAnswerLetter = q.correctAnswer || 'A';

      // Debug EVERY question's correct answer
      if (idx < 5) {
        console.log(`🔍 Question ${q.question_number} correct answer:`, {
          question_number: q.question_number,
          correctAnswer_from_service: q.correctAnswer,
          correct_answer_lowercase: q.correct_answer,
          finalLetter: correctAnswerLetter,
          answerChoices: Object.keys(answers),
          allQuestionKeys: Object.keys(q)
        });
      }

      // Get question text - try question_prompt first (for English), then question_text, then generate from question type
      let questionText = q.question_prompt || q.question_text;

      // If still no text, generate a basic prompt based on the question
      if (!questionText && section === 'english') {
        questionText = '[Select the best answer for the underlined portion.]';
      } else if (!questionText) {
        questionText = '[Select the best answer.]';
      }

      const transformedQuestion = {
        id: q.id,
        question_number: q.question_number,
        text: questionText, // practice-test.html expects 'text'
        answers: answers, // practice-test.html expects 'answers', not 'choices'
        correctAnswer: correctAnswerLetter, // Already a letter (A, B, C, D) from database
        explanation: q.explanation || null,
        passage: q.passage || null,
        passage_title: q.passage_title || null,
        image_url: q.image_url || null,
        difficulty: q.difficulty,
        question_type: q.question_type
      };

      console.log(`Question ${q.question_number}:`, {
        correctAnswer: transformedQuestion.correctAnswer,
        hasExplanation: !!transformedQuestion.explanation,
        answersKeys: Object.keys(answers),
        rawCorrectAnswer: q.correct_answer
      });

      return transformedQuestion;
    });

    // Get user's answers for this section
    const userAnswers = {};
    const correctnessMap = {};

    sectionQuestions.forEach(result => {
      const questionNum = result.question?.question_number;
      if (questionNum) {
        userAnswers[`q${questionNum}`] = result.user_answer;
        correctnessMap[`q${questionNum}`] = result.is_correct;
      }
    });

    console.log('📝 User answers:', userAnswers);
    console.log('✅ Correctness map:', correctnessMap);

    // Send data to iframe
    const message = {
      type: 'LOAD_REVIEW_MODE',
      section: section,
      questions: questions,
      userAnswers: userAnswers,
      correctnessMap: correctnessMap,
      reviewMode: true
    };

    console.log('📨 Sending message to iframe with', questions.length, 'questions');
    console.log('📨 First question being sent:', {
      question_number: questions[0]?.question_number,
      text: questions[0]?.text?.substring(0, 50),
      answers: questions[0]?.answers,
      correctAnswer: questions[0]?.correctAnswer,
      hasPassage: !!questions[0]?.passage
    });
    iframeRef.current.contentWindow.postMessage(message, '*');
  }, [testData]);

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // Security check
      if (event.origin !== window.location.origin) return;

      const { type } = event.data;

      if (type === 'PRACTICE_TEST_CLOSE') {
        console.log('📪 Test closed from iframe');
        handleBackToSelection();
      } else if (type === 'IFRAME_READY') {
        console.log('✅ Iframe ready, loading section data');
        if (selectedSection) {
          loadSectionIntoIframe(selectedSection);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [selectedSection, testData, loadSectionIntoIframe]);

  const handleBackToSelection = useCallback(() => {
    setSelectedSection(null);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#ffffff',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #dc2626',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <div style={{ fontSize: '1.125rem', color: '#6b7280' }}>
          Loading diagnostic test review...
        </div>
      </div>
    );
  }

  // Error state
  if (error || !testData) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#ffffff',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem'
      }}>
        <div style={{ fontSize: '3rem' }}>❌</div>
        <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a' }}>
          {error || 'Failed to load test data'}
        </div>
        <button
          onClick={onClose}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#dc2626',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Back to Insights
        </button>
      </div>
    );
  }

  // If section is selected, show the test interface
  if (selectedSection) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'white',
        zIndex: 3000
      }}>
        {/* Back Button Overlay */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '1rem',
          zIndex: 3001
        }}>
          <button
            onClick={() => {
              setSelectedSection(null);
              setSelectedQuestion(null);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.375rem',
              background: 'transparent',
              border: 'none',
              fontSize: '0.8125rem',
              fontWeight: '500',
              color: '#6b7280',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.color = '#1a1a1a';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            <HiArrowLeft size={16} />
            Back to Review
          </button>
        </div>

        <iframe
          ref={iframeRef}
          key={selectedSection}
          src="/tests/practice-test.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block'
          }}
          title={`Diagnostic ${sectionConfig[selectedSection]?.name} Review`}
        />
      </div>
    );
  }

  // Section selection screen
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#f9fafb',
      zIndex: 9999,
      overflow: 'auto'
    }}>
      {/* Header */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.color = '#1a1a1a';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            <HiArrowLeft size={18} />
            Back to Insights
          </button>

          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: 0
          }}>
            Diagnostic Test Review
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            background: '#f9fafb',
            borderRadius: '6px'
          }}>
            Score: <span style={{ fontWeight: '700', color: '#1a1a1a' }}>{testData.scorePercentage?.toFixed(1)}%</span>
            <span style={{ marginLeft: '0.5rem', color: '#9ca3af' }}>({testData.correctAnswers}/{testData.totalQuestions})</span>
          </div>

          <button
            onClick={handleReviewWrongAnswers}
            disabled={testData.results.filter(r => !r.is_correct).length === 0}
            style={{
              padding: '0.625rem 1.25rem',
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: testData.results.filter(r => !r.is_correct).length === 0 ? 'not-allowed' : 'pointer',
              opacity: testData.results.filter(r => !r.is_correct).length === 0 ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              if (testData.results.filter(r => !r.is_correct).length > 0) {
                e.currentTarget.style.background = '#dc2626';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#ef4444';
            }}
          >
            Review Wrong ({testData.results.filter(r => !r.is_correct).length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1.5rem 1rem'
      }}>
        {/* Section Performance */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.75rem'
          }}>
            Section Performance
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            '@media (max-width: 768px)': { gridTemplateColumns: '1fr' }
          }}>
            {Object.entries(sectionConfig).map(([key, config]) => {
              const sectionResults = testData.questionsBySection[key] || [];
              const correct = sectionResults.filter(r => r.is_correct).length;
              const incorrect = sectionResults.filter(r => r.user_answer !== null && !r.is_correct).length;
              const skipped = sectionResults.filter(r => r.user_answer === null).length;
              const total = sectionResults.length;
              const accuracy = total > 0 ? (correct / total) * 100 : 0;
              const isExpanded = expandedSections[key];

              return (
                <div
                  key={key}
                  style={{
                    background: '#ffffff',
                    borderRadius: '8px',
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div
                    onClick={() => handleSectionSelect(key)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <config.icon size={28} color={config.color} />
                        <div>
                          <h3 style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                            {config.name}
                          </h3>
                          <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                            {total} questions
                          </p>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: '700', color: accuracy >= 70 ? '#10b981' : accuracy >= 50 ? '#f59e0b' : '#ef4444' }}>
                          {accuracy.toFixed(0)}%
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <div style={{ flex: 1, padding: '0.5rem', background: '#f0fdf4', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.6875rem', color: '#065f46', marginBottom: '0.125rem' }}>Correct</div>
                        <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#10b981' }}>{correct}</div>
                      </div>
                      <div style={{ flex: 1, padding: '0.5rem', background: '#fef2f2', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.6875rem', color: '#991b1b', marginBottom: '0.125rem' }}>Wrong</div>
                        <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#ef4444' }}>{incorrect}</div>
                      </div>
                      <div style={{ flex: 1, padding: '0.5rem', background: '#fefce8', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.6875rem', color: '#854d0e', marginBottom: '0.125rem' }}>Skipped</div>
                        <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#f59e0b' }}>{skipped}</div>
                      </div>
                    </div>

                    <div style={{
                      width: '100%',
                      height: '4px',
                      background: '#f1f5f9',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{
                        height: '100%',
                        background: accuracy >= 70 ? '#10b981' : accuracy >= 50 ? '#f59e0b' : '#ef4444',
                        width: `${accuracy}%`,
                        transition: 'width 0.5s ease'
                      }} />
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSectionSelect(key);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background: config.color,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.8125rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        width: '100%'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.opacity = '0.9';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    >
                      Review {config.name} →
                    </button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(key);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.375rem',
                      marginTop: '0.5rem',
                      background: 'transparent',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#6b7280',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#1a1a1a';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#6b7280';
                    }}
                  >
                    {isExpanded ? '▼ Hide Questions' : '▶ Show Questions'}
                  </button>

                  {isExpanded && (
                    <div style={{
                      marginTop: '0.5rem',
                      padding: '0.75rem',
                      background: '#f9fafb',
                      borderRadius: '6px'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(28px, 1fr))',
                        gap: '0.375rem'
                      }}>
                        {sectionResults.map((result, idx) => {
                          const isCorrect = result.is_correct;
                          const isAnswered = result.user_answer !== null;
                          const questionNum = result.question?.question_number || idx + 1;

                          return (
                            <div
                              key={idx}
                              onClick={() => handleQuestionClick(key, idx)}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                background: !isAnswered ? '#fef3c7' : isCorrect ? '#dcfce7' : '#fee2e2',
                                color: !isAnswered ? '#f59e0b' : isCorrect ? '#10b981' : '#ef4444',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              title={`Question ${questionNum}: ${!isAnswered ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'}`}
                            >
                              {questionNum}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Time Per Question Charts */}
        {Object.entries(sectionConfig).map(([key, config]) => {
          const sectionResults = testData.questionsBySection[key] || [];

          // Prepare timing data for the chart
          const questionTimings = sectionResults
            .filter(r => r.time_spent && r.time_spent > 0)
            .map(r => ({
              question_number: r.question?.question_number,
              time_spent: r.time_spent,
              is_correct: r.is_correct
            }));

          // Only show if we have timing data
          if (questionTimings.length === 0) return null;

          return (
            <div key={`timing-${key}`}>
              <TimePerQuestionChart
                questionTimings={questionTimings}
                sectionType={key}
              />
            </div>
          );
        })}

        {/* Focus Areas */}
        <div style={{
          background: '#ffffff',
          border: 'none',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '1rem'
          }}>
            Focus Areas by Topic
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Object.entries(sectionConfig).map(([key, config]) => {
              const sectionResults = testData.questionsBySection[key] || [];

              // Group questions by question_type
              const typeStats = {};
              sectionResults.forEach(result => {
                const questionType = result.question?.question_type || 'General';
                if (!typeStats[questionType]) {
                  typeStats[questionType] = { correct: 0, total: 0 };
                }
                typeStats[questionType].total++;
                if (result.is_correct) {
                  typeStats[questionType].correct++;
                }
              });

              // Find weak areas (< 70% accuracy)
              const weakAreas = Object.entries(typeStats)
                .map(([type, stats]) => ({
                  type,
                  accuracy: (stats.correct / stats.total) * 100,
                  correct: stats.correct,
                  total: stats.total
                }))
                .filter(area => area.accuracy < 70)
                .sort((a, b) => a.accuracy - b.accuracy);

              if (weakAreas.length === 0) return null;

              return (
                <div key={key} style={{
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  border: 'none'
                }}>
                  <div style={{
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <config.icon size={20} color={config.color} />
                    <span>{config.name}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', paddingLeft: '1.75rem' }}>
                    {weakAreas.map((area, idx) => (
                      <div key={idx} style={{
                        fontSize: '0.75rem',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <span>{area.type}</span>
                        <span style={{
                          fontWeight: '600',
                          color: area.accuracy < 50 ? '#ef4444' : '#f59e0b'
                        }}>
                          {area.correct}/{area.total} ({area.accuracy.toFixed(0)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {Object.entries(sectionConfig).every(([key]) => {
            const sectionResults = testData.questionsBySection[key] || [];
            const typeStats = {};
            sectionResults.forEach(result => {
              const questionType = result.question?.question_type || 'General';
              if (!typeStats[questionType]) {
                typeStats[questionType] = { correct: 0, total: 0 };
              }
              typeStats[questionType].total++;
              if (result.is_correct) {
                typeStats[questionType].correct++;
              }
            });
            return Object.values(typeStats).every(stats => (stats.correct / stats.total) * 100 >= 70);
          }) && (
            <div style={{
              padding: '0.75rem',
              background: '#f0fdf4',
              borderRadius: '4px',
              fontSize: '0.8125rem',
              color: '#166534',
              textAlign: 'center'
            }}>
              Great job! All topics scored above 70%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
