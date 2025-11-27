/**
 * Diagnostic Test Review Component
 * Redesigned to match website style - compact, simple, clean
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HiArrowLeft, HiChartBar } from 'react-icons/hi2';
import DiagnosticService from '../services/api/diagnostic.service';
import { supabase } from '../supabaseClient';
import logger from '../services/logging/logger';
import Logo from './common/Logo';

export default function DiagnosticTestReview({ sessionId, onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const iframeRef = useRef(null);

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

  const loadDiagnosticData = async () => {
    try {
      // Check cache first for instant loading
      const cacheKey = `diagnostic_review_${sessionId}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setTestData(JSON.parse(cached));
        setLoading(false);
        console.log('📊 Using cached diagnostic review data');
        return;
      }

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

      // Cache the data for instant loading next time
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      console.log('💾 Cached diagnostic review data');

      setLoading(false);
    } catch (err) {
      console.error('Error loading diagnostic data:', err);
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

    setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        loadSectionIntoIframe(section);

        setTimeout(() => {
          iframeRef.current?.contentWindow?.postMessage({
            type: 'JUMP_TO_QUESTION',
            questionIndex: questionIndex
          }, '*');
        }, 500);
      }
    }, 100);
  };

  // Handle section selection
  const handleSectionSelect = useCallback((section) => {
    if (!testData) return;
    setSelectedSection(section);

    setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        loadSectionIntoIframe(section);
      }
    }, 100);

    // Close modal after selecting section to review
    onClose();
  }, [testData, onClose]);

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
      reviewMode: true
    };

    iframeRef.current.contentWindow.postMessage(message, '*');
  }, [testData]);

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      const { type } = event.data;

      if (type === 'PRACTICE_TEST_CLOSE') {
        setSelectedSection(null);
      } else if (type === 'IFRAME_READY') {
        if (selectedSection) {
          loadSectionIntoIframe(selectedSection);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [selectedSection, testData, loadSectionIntoIframe]);

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
          borderTop: '4px solid #08245b',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Loading test review...
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
        gap: '1rem'
      }}>
        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
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
            onClick={() => setSelectedSection(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.5rem 0.75rem',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              fontSize: '0.8125rem',
              fontWeight: '600',
              color: '#08245b',
              cursor: 'pointer',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f8fafc';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#ffffff';
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
      padding: '2rem'
    }}>
      {/* Modal Content */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        background: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header with close button */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h1 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#0f172a',
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            Diagnostic Test
          </h1>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              borderRadius: '6px',
              transition: 'background 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f8fafc';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <HiArrowLeft size={24} style={{ color: '#64748b' }} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          background: '#f8fafc'
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '1.5rem'
          }}>
          {/* Score Summary - Circular Display */}
          <div style={{
            marginBottom: '2rem',
            background: '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
          }}>
            {/* Composite Score - Large and Prominent */}
            <div style={{
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                fontSize: '0.75rem',
                color: '#64748b',
                fontWeight: '600',
                marginBottom: '0.5rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Composite Score
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #08245b 0%, #0f3a7a 100%)',
                boxShadow: '0 4px 12px rgba(8, 36, 91, 0.2)'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  letterSpacing: '-0.02em'
                }}>
                  {(() => {
                    // Calculate composite ACT score (average of all 4 sections)
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
              </div>
              <div style={{
                fontSize: '0.6875rem',
                color: '#64748b',
                marginTop: '0.5rem'
              }}>
                {testData.correctAnswers} of {testData.totalQuestions} correct
              </div>
            </div>

            {/* Section Scores - Circular Display */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem'
            }}>
              {Object.entries(sectionConfig).map(([key, config]) => {
                const sectionResults = testData.questionsBySection[key] || [];
                const total = sectionResults.length;
                const correct = sectionResults.filter(r => r.is_correct).length;
                const accuracy = total > 0 ? (correct / total) * 100 : 0;
                const score = percentageToACTScore(accuracy);

                return (
                  <div key={key} style={{
                    textAlign: 'center'
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: '#f8fafc',
                      border: '3px solid #08245b',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        color: '#08245b',
                        letterSpacing: '-0.02em'
                      }}>
                        {score}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#0f172a',
                      marginBottom: '0.125rem'
                    }}>
                      {config.name}
                    </div>
                    <div style={{
                      fontSize: '0.6875rem',
                      color: '#64748b'
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
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            marginBottom: '1.5rem'
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
                    border: 'none',
                    borderRadius: '8px',
                    padding: '1rem',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  {/* Section Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                  }}>
                    <h3 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#0f172a',
                      margin: 0,
                      letterSpacing: '-0.01em'
                    }}>
                      {config.name}
                    </h3>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#08245b',
                      letterSpacing: '-0.02em'
                    }}>
                      {percentageToACTScore(accuracy)}
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      flex: 1,
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '0.6875rem',
                        color: '#64748b',
                        marginBottom: '0.125rem',
                        fontWeight: '500'
                      }}>Correct</div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#0f172a'
                      }}>{correct}</div>
                    </div>
                    <div style={{
                      flex: 1,
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '0.6875rem',
                        color: '#64748b',
                        marginBottom: '0.125rem',
                        fontWeight: '500'
                      }}>Wrong</div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#0f172a'
                      }}>{incorrect}</div>
                    </div>
                    <div style={{
                      flex: 1,
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '0.6875rem',
                        color: '#64748b',
                        marginBottom: '0.125rem',
                        fontWeight: '500'
                      }}>Skipped</div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#0f172a'
                      }}>{skipped}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.375rem' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSectionSelect(key);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0.75rem',
                        background: '#0f172a',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        letterSpacing: '-0.01em'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#1e293b';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#0f172a';
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
                        background: 'transparent',
                        color: '#64748b',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        letterSpacing: '-0.01em'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.color = '#0f172a';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#64748b';
                      }}
                    >
                      {isExpanded ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  {/* Question Grid */}
                  {isExpanded && (
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #f1f5f9'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(32px, 1fr))',
                        gap: '0.375rem'
                      }}>
                        {sectionResults.map((result, idx) => {
                          const isCorrect = result.is_correct;
                          const isAnswered = result.user_answer !== null;
                          const questionNum = result.question?.question_number || idx + 1;

                          return (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuestionClick(key, idx);
                              }}
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
                                border: 'none',
                                background: !isAnswered ? '#f8fafc' : isCorrect ? '#f0fdf4' : '#fef2f2',
                                color: !isAnswered ? '#94a3b8' : isCorrect ? '#16a34a' : '#dc2626',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
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
              );
            })}
          </div>

          {/* Topic Breakdown - Top Weak Areas */}
          <div>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#0f172a',
              margin: '0 0 0.75rem 0',
              letterSpacing: '-0.01em'
            }}>
              Areas to improve
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem'
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
                  <div key={key}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#64748b',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.01em'
                    }}>
                      {config.name}
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem'
                    }}>
                      {weakAreas.map((area, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.5rem 0',
                            borderBottom: idx < weakAreas.length - 1 ? '1px solid #f1f5f9' : 'none'
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
                            color: '#64748b',
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

