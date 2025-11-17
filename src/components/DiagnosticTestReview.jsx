/**
 * Diagnostic Test Review Component
 * Opens the diagnostic test in the actual test interface with review mode enabled
 * Shows user's answers and correct/incorrect indicators
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HiXMark, HiArrowLeft } from 'react-icons/hi2';
import InsightsService from '../services/api/insights.service';
import DiagnosticService from '../services/api/diagnostic.service';
import logger from '../services/logging/logger';

export default function DiagnosticTestReview({ sessionId, onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const iframeRef = useRef(null);

  // Section configurations
  const sectionConfig = {
    english: {
      name: 'English',
      emoji: '📝',
      questionCount: 75,
      color: '#08245b' // Dark blue
    },
    math: {
      name: 'Mathematics',
      emoji: '🔢',
      questionCount: 60,
      color: '#b91c1c' // Red
    },
    reading: {
      name: 'Reading',
      emoji: '📖',
      questionCount: 40,
      color: '#713f12' // Brown
    },
    science: {
      name: 'Science',
      emoji: '🔬',
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

      // Get full diagnostic test data with questions and user answers
      const data = await InsightsService.getDiagnosticTestDetails(sessionId);
      console.log('📊 Loaded diagnostic data for review:', data);
      console.log('📊 Session:', data.session);
      console.log('📊 Total results:', data.results?.length);
      console.log('📊 Questions by section:', {
        english: data.questionsBySection?.english?.length,
        math: data.questionsBySection?.math?.length,
        reading: data.questionsBySection?.reading?.length,
        science: data.questionsBySection?.science?.length
      });

      if (!data.results || data.results.length === 0) {
        console.error('❌ NO RESULTS FOUND - This diagnostic test has no saved answers!');
        console.error('This means the test was not properly saved to diagnostic_test_results table');
        setError('No results found for this diagnostic test. The test data may not have been saved properly.');
        setLoading(false);
        return;
      }

      setTestData(data);
      setLoading(false);
    } catch (err) {
      console.error('❌ Error loading diagnostic data:', err);
      setError('Failed to load diagnostic test data');
      setLoading(false);
    }
  };

  // Handle section selection
  const handleSectionSelect = useCallback((section) => {
    if (!testData) return;

    console.log(`🎯 Loading section: ${section}`);
    setSelectedSection(section);

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

      // Parse choices if it's a JSON string
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
      const answers = {};
      if (parsedChoices && Array.isArray(parsedChoices)) {
        parsedChoices.forEach(choice => {
          // Extract letter and text: "F. NO CHANGE" => {F: "NO CHANGE"}
          const match = choice.match(/^([A-K])\.\s*(.+)$/);
          if (match) {
            answers[match[1]] = match[2];
          }
        });
      }

      // correct_answer is already stored as a letter (A, B, C, D, etc.) in the database
      const correctAnswerLetter = q.correct_answer || 'A';

      if (idx === 0) {
        console.log('🔍 DiagnosticReview first question:', {
          question_number: q.question_number,
          raw_correct_answer: q.correct_answer,
          correct_answer_type: typeof q.correct_answer,
          finalLetter: correctAnswerLetter,
          will_show_as: `Answer ${correctAnswerLetter}`,
          allKeys: Object.keys(q),
          answer_related_keys: Object.keys(q).filter(k => k.toLowerCase().includes('answer') || k.toLowerCase().includes('correct'))
        });
      }

      const transformedQuestion = {
        id: q.id,
        question_number: q.question_number,
        text: q.question_text, // practice-test.html expects 'text', not 'question_text'
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

    console.log('📨 Sending message to iframe:', message);
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
      zIndex: 3000,
      overflow: 'auto'
    }}>
      {/* Header */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.375rem',
              cursor: 'pointer',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.8125rem',
              fontWeight: '500',
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
            Back to Insights
          </button>
          <h1 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#1a1a1a',
            margin: 0
          }}>
            Diagnostic Test Review
          </h1>
        </div>
        <div style={{
          fontSize: '0.8125rem',
          color: '#6b7280',
          fontWeight: '500'
        }}>
          Score: {testData.scorePercentage?.toFixed(1)}% ({testData.correctAnswers}/{testData.totalQuestions})
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '3rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)' // Subtract header height + padding
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '1.25rem'
        }}>
          <h2 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.25rem'
          }}>
            Review Your Diagnostic Test
          </h2>
          <p style={{
            fontSize: '0.8125rem',
            color: '#6b7280',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Select a section below to review all questions with your answers and explanations
          </p>
        </div>

        {/* Section Cards */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap'
        }}>
          {Object.entries(sectionConfig).map(([key, config]) => {
            const sectionResults = testData.questionsBySection[key] || [];
            const correct = sectionResults.filter(r => r.is_correct).length;
            const total = sectionResults.length;
            const accuracy = total > 0 ? (correct / total) * 100 : 0;

            return (
              <div
                key={key}
                onClick={() => handleSectionSelect(key)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderLeft: `3px solid ${config.color}`,
                  borderRadius: '8px',
                  padding: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  width: '200px',
                  minWidth: '200px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{
                  fontSize: '1.75rem',
                  marginBottom: '0.5rem'
                }}>
                  {config.emoji}
                </div>
                <h3 style={{
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  marginBottom: '0.25rem',
                  textTransform: 'capitalize'
                }}>
                  {key}
                </h3>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginBottom: '0.625rem'
                }}>
                  {total} questions
                </p>
                <div style={{
                  fontSize: '1.375rem',
                  fontWeight: '700',
                  color: config.color,
                  marginBottom: '0.25rem'
                }}>
                  {accuracy.toFixed(1)}%
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  {correct} / {total} correct
                </div>
                <div style={{
                  width: '100%',
                  height: '4px',
                  background: '#f3f4f6',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  marginTop: '0.625rem'
                }}>
                  <div style={{
                    height: '100%',
                    background: config.color,
                    width: `${accuracy}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
