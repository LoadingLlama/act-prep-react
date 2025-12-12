/**
 * Diagnostic Test Review Component
 * Redesigned to match website style - compact, simple, clean
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HiArrowLeft, HiChartBar, HiChevronDown } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import DiagnosticService from '../services/api/diagnostic.service';
import { supabase } from '../supabaseClient';
import logger from '../services/logging/logger';
import Logo from './common/Logo';

export default function DiagnosticTestReview({ sessionId, onClose, onReady }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [startingQuestionIndex, setStartingQuestionIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState('english');
  const [sectionDropdownOpen, setSectionDropdownOpen] = useState(false);
  const iframeRef = useRef(null);
  const dropdownRef = useRef(null);

  // Section configurations - all using consistent blue theme
  const sectionConfig = {
    english: { name: 'English', questionCount: 75 },
    math: { name: 'Mathematics', questionCount: 60 },
    reading: { name: 'Reading', questionCount: 40 },
    science: { name: 'Science', questionCount: 40 }
  };

  /**
   * Convert percentage accuracy to ACT scaled score (1-36)
   * Based on typical ACT conversion charts
   */
  const percentageToACTScore = (percentage) => {
    if (percentage >= 98) return 36;
    if (percentage >= 96) return 35;
    if (percentage >= 94) return 34;
    if (percentage >= 92) return 33;
    if (percentage >= 90) return 32;
    if (percentage >= 88) return 31;
    if (percentage >= 86) return 30;
    if (percentage >= 84) return 29;
    if (percentage >= 82) return 28;
    if (percentage >= 80) return 27;
    if (percentage >= 78) return 26;
    if (percentage >= 76) return 25;
    if (percentage >= 74) return 24;
    if (percentage >= 72) return 23;
    if (percentage >= 70) return 22;
    if (percentage >= 68) return 21;
    if (percentage >= 65) return 20;
    if (percentage >= 62) return 19;
    if (percentage >= 59) return 18;
    if (percentage >= 56) return 17;
    if (percentage >= 53) return 16;
    if (percentage >= 50) return 15;
    if (percentage >= 47) return 14;
    if (percentage >= 44) return 13;
    if (percentage >= 41) return 12;
    if (percentage >= 38) return 11;
    if (percentage >= 35) return 10;
    if (percentage >= 32) return 9;
    if (percentage >= 29) return 8;
    if (percentage >= 26) return 7;
    if (percentage >= 23) return 6;
    if (percentage >= 20) return 5;
    if (percentage >= 17) return 4;
    if (percentage >= 14) return 3;
    if (percentage >= 10) return 2;
    return 1;
  };

  // Load diagnostic test data
  useEffect(() => {
    loadDiagnosticData();
  }, [sessionId]);

  // Restore section and question from URL (disabled - causes modal to be skipped)
  // useEffect(() => {
  //   if (testData) {
  //     const urlSection = searchParams.get('section');
  //     const urlQuestion = searchParams.get('question');

  //     if (urlSection) {
  //       console.log('📍 Restoring section from URL:', urlSection);
  //       setSelectedSection(urlSection);
  //     }

  //     if (urlQuestion) {
  //       console.log('📍 Restoring question from URL:', urlQuestion);
  //       setStartingQuestionIndex(parseInt(urlQuestion));
  //     }
  //   }
  // }, [testData, searchParams]);

  // Update URL when section changes
  useEffect(() => {
    if (selectedSection) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('section', selectedSection);
      if (startingQuestionIndex > 0) {
        newParams.set('question', startingQuestionIndex.toString());
      }
      setSearchParams(newParams, { replace: true });
      console.log('🔗 Updated URL with section:', selectedSection);
    }
  }, [selectedSection]);

  // Update URL when question changes
  useEffect(() => {
    if (selectedSection && startingQuestionIndex > 0) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('section', selectedSection);
      newParams.set('question', startingQuestionIndex.toString());
      setSearchParams(newParams, { replace: true });
      console.log('🔗 Updated URL with question:', startingQuestionIndex);
    }
  }, [startingQuestionIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSectionDropdownOpen(false);
      }
    };

    if (sectionDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [sectionDropdownOpen]);

  const loadDiagnosticData = async () => {
    try {
      // Don't cache diagnostic review data - too large for sessionStorage
      // Data loads quickly from database with parallel queries anyway
      setLoading(true);
      logger.info('DiagnosticTestReview', 'loadDiagnosticData', { sessionId });

      // Run session and results queries in parallel
      const [sessionResponse, resultsResponse] = await Promise.all([
        supabase
          .from('diagnostic_test_sessions')
          .select('*')
          .eq('id', sessionId)
          .single(),
        supabase
          .from('diagnostic_test_results')
          .select('*, time_spent, started_at, completed_at')
          .eq('diagnostic_session_id', sessionId)
          .order('created_at', { ascending: true })
      ]);

      if (sessionResponse.error) throw sessionResponse.error;
      if (resultsResponse.error) throw resultsResponse.error;

      const session = sessionResponse.data;
      const results = resultsResponse.data;

      // Load questions from diagnostic service in parallel for faster loading
      const sections = ['english', 'math', 'reading', 'science'];
      const questionsBySection = {};

      const questionPromises = sections.map(section =>
        DiagnosticService.getDiagnosticQuestions(section)
      );

      const allSectionQuestions = await Promise.all(questionPromises);

      sections.forEach((section, index) => {
        questionsBySection[section] = allSectionQuestions[index] || [];
      });

      // Create maps of user answers
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
          english: allResults.filter(r => questionsBySection.english.find(q => q.id === r.question_id)),
          math: allResults.filter(r => questionsBySection.math.find(q => q.id === r.question_id)),
          reading: allResults.filter(r => questionsBySection.reading.find(q => q.id === r.question_id)),
          science: allResults.filter(r => questionsBySection.science.find(q => q.id === r.question_id))
        },
        totalQuestions: results.length,
        correctAnswers: results.filter(r => r.is_correct).length,
        scorePercentage: session.score_percentage
      };

      setTestData(data);

      // Don't cache in sessionStorage - the full questions with explanations/passages are too large
      // and would cause QuotaExceededError. Data loads quickly from database anyway.
      console.log('✅ Loaded diagnostic review data (not caching due to size)');

      setLoading(false);
      if (onReady) onReady();
    } catch (err) {
      console.error('Error loading diagnostic data:', err);
      setError('Failed to load diagnostic test data');
      setLoading(false);
      if (onReady) onReady();
    }
  };

  // Toggle section expansion - only one section at a time
  const toggleSection = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  // Handle question click
  const handleQuestionClick = (section, questionIndex) => {
    setStartingQuestionIndex(questionIndex);
    setSelectedSection(section);
  };

  // Handle section selection
  const handleSectionSelect = useCallback((section) => {
    console.log('🔵 handleSectionSelect called with section:', section);
    console.log('   testData exists:', !!testData);

    if (!testData) {
      console.warn('⚠️ testData is null, cannot select section');
      return;
    }

    // Find first wrong answer in this section, or start at question 1
    const sectionQuestions = testData.questionsBySection[section] || [];
    console.log(`   Section ${section} has ${sectionQuestions.length} questions`);

    const firstWrongQuestion = sectionQuestions.find(q => q.isCorrect === false);

    const startingQuestion = firstWrongQuestion ? firstWrongQuestion.question_number : 1;
    console.log('🎯 Starting at question:', startingQuestion, firstWrongQuestion ? '(first wrong answer)' : '(default)');

    setStartingQuestionIndex(startingQuestion);
    setSelectedSection(section);
    console.log('✅ Set selectedSection to:', section);
  }, [testData]);

  // Load section data into the iframe
  const loadSectionIntoIframe = useCallback((section) => {
    if (!iframeRef.current?.contentWindow || !testData) return;

    const sectionQuestions = testData.questionsBySection[section] || [];

    // Transform data to match practice test format
    const questions = sectionQuestions.map((result) => {
      const q = result.question;

      let answers = {};
      if (q.answers && typeof q.answers === 'object' && !Array.isArray(q.answers) && Object.keys(q.answers).length > 0) {
        answers = q.answers;
      } else {
        let parsedChoices = q.choices;
        if (typeof q.choices === 'string') {
          try {
            parsedChoices = JSON.parse(q.choices);
          } catch (e) {
            parsedChoices = [];
          }
        }

        if (parsedChoices && Array.isArray(parsedChoices)) {
          parsedChoices.forEach((choice, choiceIdx) => {
            let match = choice.match(/^([A-K])\.\s*(.+)$/);
            if (!match) match = choice.match(/^([A-K])\)\s*(.+)$/);
            if (!match) match = choice.match(/^([A-K]):\s*(.+)$/);
            if (!match) match = choice.match(/^([A-K])\s+(.+)$/);

            if (match) {
              answers[match[1]] = match[2].trim();
            } else {
              const letter = String.fromCharCode(65 + choiceIdx);
              answers[letter] = choice.trim();
            }
          });
        }
      }

      const correctAnswerLetter = q.correctAnswer || 'A';
      let questionText = q.question_prompt || q.question_text;

      if (!questionText && section === 'english') {
        questionText = '[Select the best answer for the underlined portion.]';
      } else if (!questionText) {
        questionText = '[Select the best answer.]';
      }

      return {
        id: q.id,
        question_number: q.question_number,
        text: questionText,
        answers: answers,
        correctAnswer: correctAnswerLetter,
        explanation: q.explanation || null,
        passage: q.passage || null,
        passage_title: q.passage_title || null,
        image_url: q.image_url || null,
        difficulty: q.difficulty,
        question_type: q.question_type
      };
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

    // Send data to iframe
    const message = {
      type: 'LOAD_REVIEW_MODE',
      section: section,
      questions: questions,
      userAnswers: userAnswers,
      correctnessMap: correctnessMap,
      reviewMode: true,
      startingQuestion: startingQuestionIndex
    };

    iframeRef.current.contentWindow.postMessage(message, '*');
  }, [testData, startingQuestionIndex]);

  // Load section when selectedSection changes (but not when question changes)
  useEffect(() => {
    if (selectedSection && iframeRef.current?.contentWindow && testData) {
      // Small delay to ensure iframe is ready
      const timer = setTimeout(() => {
        loadSectionIntoIframe(selectedSection);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedSection, testData, loadSectionIntoIframe]);

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      const { type, section } = event.data;

      if (type === 'PRACTICE_TEST_CLOSE') {
        setSelectedSection(null);
        setSearchParams({}, { replace: true });
      } else if (type === 'IFRAME_READY') {
        if (selectedSection) {
          loadSectionIntoIframe(selectedSection);
        }
      } else if (type === 'SWITCH_SECTION') {
        console.log('📨 Received SWITCH_SECTION message:', section);
        if (section && section !== selectedSection) {
          handleSectionSelect(section);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [selectedSection, testData, loadSectionIntoIframe, handleSectionSelect]);

  // Log selectedSection changes for debugging
  useEffect(() => {
    console.log('🔄 selectedSection state changed to:', selectedSection);
  }, [selectedSection]);

  // Log render state
  console.log('🎨 DiagnosticTestReview rendering:', {
    selectedSection,
    hasTestData: !!testData,
    loading,
    error
  });

  // Loading state - skip rendering, handled at card level
  if (loading) {
    return null;
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
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ fontSize: '0.875rem', color: '#0f172a' }}>
          {error || 'Failed to load test data'}
        </div>
        <button
          onClick={onClose}
          style={{
            padding: '0.5rem 1rem',
            background: '#08245b',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.875rem',
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
    console.log('📺 Rendering iframe view for section:', selectedSection);
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'white',
        zIndex: 10000
      }}>
        {/* Back Button Overlay */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '1rem',
          zIndex: 10001
        }}>
          <button
            onClick={() => {
              // Go straight back to insights, not to modal overview
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.5rem 0.75rem',
              background: 'transparent',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#ffffff',
              cursor: 'pointer',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.backdropFilter = 'blur(10px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.backdropFilter = 'none';
            }}
          >
            <HiArrowLeft size={16} />
            Back
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

  // Main review screen as modal (no sidebar)
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
      {/* Modal Content */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        background: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '0.5px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        animation: 'scaleIn 0.3s ease-out'
      }}>
        {/* Header with back button and title */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              background: 'transparent',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#0f172a',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.color = '#b91c1c';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#0f172a';
            }}
          >
            <HiArrowLeft size={16} />
            <span>Back</span>
          </button>

          <h2 style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            margin: 0,
            fontSize: '1rem',
            fontWeight: '700',
            color: '#0f172a',
            letterSpacing: '-0.01em'
          }}>
            Diagnostic Test
          </h2>

          <div style={{ width: '80px' }} /> {/* Spacer for balance */}
        </div>

        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          background: '#ffffff'
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '1.5rem'
          }}>
          {/* Score Summary - Compact */}
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            background: '#ffffff',
            borderRadius: '8px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            {/* Composite Score */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              paddingRight: '2rem',
              borderRight: '0.5px solid #e2e8f0'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#08245b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ffffff',
                letterSpacing: '-0.02em'
              }}>
                {(() => {
                  const sections = Object.keys(sectionConfig);
                  const sectionScores = sections.map(key => {
                    const sectionResults = testData.questionsBySection[key] || [];
                    const total = sectionResults.length;
                    const correct = sectionResults.filter(r => r.is_correct).length;
                    const accuracy = total > 0 ? (correct / total) * 100 : 0;
                    return percentageToACTScore(accuracy);
                  });
                  const composite = Math.round(sectionScores.reduce((a, b) => a + b, 0) / sectionScores.length);
                  return composite;
                })()}
              </div>
              <div style={{
                fontSize: '0.6875rem',
                color: '#0f172a',
                fontWeight: '600',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textAlign: 'center'
              }}>
                Composite Score
              </div>
              <div style={{
                fontSize: '0.6875rem',
                color: '#0f172a',
                textAlign: 'center'
              }}>
                {testData.correctAnswers} of {testData.totalQuestions} correct
              </div>
            </div>

            {/* Section Scores - Inline */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              flex: 1,
              alignItems: 'center'
            }}>
              {Object.entries(sectionConfig).map(([key, config]) => {
                const sectionResults = testData.questionsBySection[key] || [];
                const total = sectionResults.length;
                const correct = sectionResults.filter(r => r.is_correct).length;
                const accuracy = total > 0 ? (correct / total) * 100 : 0;
                const score = percentageToACTScore(accuracy);

                return (
                  <div key={key} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: '#08245b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.125rem',
                      fontWeight: '700',
                      color: '#ffffff',
                      letterSpacing: '-0.02em'
                    }}>
                      {score}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#0f172a',
                      lineHeight: '1.3',
                      textAlign: 'center'
                    }}>
                      {config.name}
                    </div>
                    <div style={{
                      fontSize: '0.6875rem',
                      color: '#0f172a',
                      lineHeight: '1.3',
                      textAlign: 'center'
                      }}>
                        {correct}/{total}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sections */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1.5rem',
            alignItems: 'flex-start'
          }}>
            {/* Section List - Fixed Width */}
            <div style={{
              flex: '0 0 600px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
            {Object.entries(sectionConfig).map(([key, config]) => {
              const sectionResults = testData.questionsBySection[key] || [];
              const correct = sectionResults.filter(r => r.is_correct).length;
              const incorrect = sectionResults.filter(r => r.user_answer !== null && !r.is_correct).length;
              const skipped = sectionResults.filter(r => r.user_answer === null).length;
              const total = sectionResults.length;
              const accuracy = total > 0 ? (correct / total) * 100 : 0;
              const isExpanded = expandedSection === key;

              return (
                <div
                  key={key}
                  style={{
                    background: '#ffffff',
                    border: '0.5px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  {/* Section Name */}
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#0f172a',
                    margin: 0,
                    letterSpacing: '-0.01em',
                    minWidth: '100px',
                    flex: '0 0 100px'
                  }}>
                    {config.name}
                  </h3>

                  {/* Score */}
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#08245b',
                    letterSpacing: '-0.02em',
                    minWidth: '36px',
                    textAlign: 'center',
                    flex: '0 0 36px'
                  }}>
                    {percentageToACTScore(accuracy)}
                  </div>

                  {/* Stats - Inline */}
                  <div style={{
                    display: 'flex',
                    gap: '1.25rem',
                    flex: 1,
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span style={{
                        fontSize: '0.6875rem',
                        color: '#0f172a',
                        fontWeight: '500',
                        minWidth: '48px'
                      }}>Correct</span>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#16a34a',
                        minWidth: '20px',
                        textAlign: 'right'
                      }}>{correct}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span style={{
                        fontSize: '0.6875rem',
                        color: '#0f172a',
                        fontWeight: '500',
                        minWidth: '48px'
                      }}>Wrong</span>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#dc2626',
                        minWidth: '20px',
                        textAlign: 'right'
                      }}>{incorrect}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span style={{
                        fontSize: '0.6875rem',
                        color: '#0f172a',
                        fontWeight: '500',
                        minWidth: '48px'
                      }}>Skipped</span>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#0f172a',
                        minWidth: '20px',
                        textAlign: 'right'
                      }}>{skipped}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.375rem' }}>
                    <button
                      onClick={(e) => {
                        console.log('🔘 Review button clicked for section:', key);
                        e.stopPropagation();
                        setExpandedSection(null);
                        handleSectionSelect(key);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#0f172a',
                        color: '#ffffff',
                        border: '1px solid #0f172a',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 3px 0 0 rgba(15, 23, 42, 0.25)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#1e293b';
                        e.currentTarget.style.borderColor = '#1e293b';
                        e.currentTarget.style.boxShadow = '0 3px 0 0 rgba(30, 41, 59, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#0f172a';
                        e.currentTarget.style.borderColor = '#0f172a';
                        e.currentTarget.style.boxShadow = '0 3px 0 0 rgba(15, 23, 42, 0.25)';
                      }}
                    >
                      Review
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSection(key);
                      }}
                      style={{
                        padding: '0.5rem 0.75rem',
                        background: isExpanded ? '#f8fafc' : '#ffffff',
                        color: isExpanded ? '#0f172a' : '#64748b',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.color = '#0f172a';
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.boxShadow = '0 3px 0 0 rgba(0, 0, 0, 0.15)';
                      }}
                      onMouseOut={(e) => {
                        if (!isExpanded) {
                          e.currentTarget.style.background = '#ffffff';
                          e.currentTarget.style.color = '#64748b';
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.boxShadow = '0 3px 0 0 rgba(0, 0, 0, 0.1)';
                        } else {
                          e.currentTarget.style.background = '#f8fafc';
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.boxShadow = '0 3px 0 0 rgba(0, 0, 0, 0.1)';
                        }
                      }}
                    >
                      {isExpanded ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              );
            })}
            </div>

            {/* Question Grid - Right Side */}
            {expandedSection && (
              <div style={{
                flex: 1,
                background: '#ffffff',
                borderRadius: '8px',
                padding: '1rem 1.25rem',
                border: 'none',
                alignSelf: 'flex-start'
              }}>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#0f172a',
                  margin: '0 0 0.75rem 0',
                  letterSpacing: '-0.01em'
                }}>
                  {sectionConfig[expandedSection].name} Questions
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(15, 24px)',
                  gap: '0.25rem'
                }}>
                  {(testData.questionsBySection[expandedSection] || []).map((result, idx) => {
                    const isCorrect = result.is_correct;
                    const isAnswered = result.user_answer !== null && result.user_answer !== undefined;
                    const questionNum = result.question?.question_number || idx + 1;

                    // Determine colors based on answer status
                    let bgColor, textColor;
                    if (!isAnswered) {
                      // Unanswered/Skipped - Gray
                      bgColor = '#f1f5f9';
                      textColor = '#64748b';
                    } else if (isCorrect) {
                      // Correct - Green
                      bgColor = '#dcfce7';
                      textColor = '#166534';
                    } else {
                      // Incorrect - Red
                      bgColor = '#fee2e2';
                      textColor = '#991b1b';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedSection(null);
                          handleQuestionClick(expandedSection, questionNum);
                        }}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.625rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          border: 'none',
                          outline: 'none',
                          background: bgColor,
                          color: textColor,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        title={`Question ${questionNum}: ${!isAnswered ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'}`}
                      >
                        {questionNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Topic Breakdown - Top Weak Areas */}
          <div style={{
            border: 'none',
            borderRadius: '8px',
            padding: '1rem',
            background: '#ffffff'
          }}>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#0f172a',
              margin: '0 0 1rem 0',
              letterSpacing: '-0.01em'
            }}>
              Areas to improve
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              {Object.entries(sectionConfig).map(([key, config]) => {
                const sectionResults = testData.questionsBySection[key] || [];

                // Group by question type
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

                // Get top 3 weak areas only
                const weakAreas = Object.entries(typeStats)
                  .map(([type, stats]) => ({
                    type,
                    accuracy: (stats.correct / stats.total) * 100,
                    correct: stats.correct,
                    total: stats.total
                  }))
                  .filter(area => area.accuracy < 70)
                  .sort((a, b) => a.accuracy - b.accuracy)
                  .slice(0, 3);

                if (weakAreas.length === 0) return null;

                return (
                  <div key={key} style={{
                    paddingBottom: '1rem',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <div style={{
                      fontSize: '0.8125rem',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '0.625rem',
                      letterSpacing: '-0.01em'
                    }}>
                      {config.name}
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.375rem'
                    }}>
                      {weakAreas.map((area, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.375rem 0'
                          }}
                        >
                          <span style={{
                            color: '#0f172a',
                            flex: 1,
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}>{area.type}</span>
                          <span style={{
                            fontWeight: '600',
                            color: '#0f172a',
                            fontSize: '0.75rem',
                            marginLeft: '0.5rem'
                          }}>
                            {area.accuracy.toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

