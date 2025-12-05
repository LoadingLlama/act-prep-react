/**
 * Practice Test Review Component
 * Similar to diagnostic review but for practice tests
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HiArrowLeft, HiChartBar, HiChevronDown } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import PracticeTestsService from '../services/api/practiceTests.service';
import { supabase } from '../supabaseClient';
import logger from '../services/logging/logger';
import Logo from './common/Logo';

export default function PracticeTestReview({ sessionId, testNumber, onClose }) {
  console.log('🎬 PracticeTestReview component mounted with props:', {
    sessionId,
    testNumber,
    displayNumber: testNumber ? testNumber - 1 : 'unknown'
  });

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

  // Section configurations
  const sectionConfig = {
    english: { name: 'English', questionCount: 75 },
    math: { name: 'Mathematics', questionCount: 60 },
    reading: { name: 'Reading', questionCount: 40 },
    science: { name: 'Science', questionCount: 40 }
  };

  /**
   * Convert percentage accuracy to ACT scaled score (1-36)
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

  // Load practice test data
  useEffect(() => {
    loadPracticeTestData();
  }, [sessionId]);

  // Restore section and question from URL
  useEffect(() => {
    if (testData) {
      const urlSection = searchParams.get('section');
      const urlQuestion = searchParams.get('question');

      if (urlSection) {
        console.log('📍 Restoring section from URL:', urlSection);
        setSelectedSection(urlSection);
      }

      if (urlQuestion) {
        console.log('📍 Restoring question from URL:', urlQuestion);
        setStartingQuestionIndex(parseInt(urlQuestion));
      }
    }
  }, [testData, searchParams]);

  // Update URL when section changes
  useEffect(() => {
    if (selectedSection) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('section', selectedSection);
      if (startingQuestionIndex > 0) {
        newParams.set('question', startingQuestionIndex.toString());
      }
      setSearchParams(newParams, { replace: true });
    }
  }, [selectedSection]);

  // Update URL when question changes
  useEffect(() => {
    if (selectedSection && startingQuestionIndex > 0) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('section', selectedSection);
      newParams.set('question', startingQuestionIndex.toString());
      setSearchParams(newParams, { replace: true });
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

  const loadPracticeTestData = async () => {
    try {
      console.log('🔍 PracticeTestReview loading data:', {
        sessionId,
        testNumber,
        expectedTestName: `Practice Test ${testNumber - 1}`
      });

      // Clear any stale cache for this session
      const cacheKey = `practice_test_review_${sessionId}`;
      sessionStorage.removeItem(cacheKey);
      console.log('🧹 Cleared cache for session:', sessionId);

      setLoading(true);
      logger.info('PracticeTestReview', 'loadPracticeTestData', { sessionId, testNumber });

      // Load session and results in parallel
      const [sessionResponse, resultsResponse] = await Promise.all([
        supabase
          .from('practice_test_sessions')
          .select('*')
          .eq('id', sessionId)
          .single(),
        supabase
          .from('practice_test_results')
          .select('*')
          .eq('practice_session_id', sessionId)
          .order('created_at', { ascending: true })
      ]);

      console.log('📥 Database responses:', {
        sessionError: sessionResponse.error,
        sessionData: sessionResponse.data,
        resultsError: resultsResponse.error,
        resultsCount: resultsResponse.data?.length
      });

      if (sessionResponse.error) {
        console.error('❌ Session fetch error:', sessionResponse.error);
        throw sessionResponse.error;
      }

      if (resultsResponse.error) {
        console.error('❌ Results fetch error:', resultsResponse.error);
        throw resultsResponse.error;
      }

      const session = sessionResponse.data;
      const results = resultsResponse.data || [];

      if (results.length === 0) {
        console.warn('⚠️ No results found for this session - test may not have been completed');
      }

      // Load questions for all sections in parallel
      const sections = ['english', 'math', 'reading', 'science'];
      const questionsBySection = {};

      console.log('🔍 Loading practice test questions for test number:', testNumber);

      const questionPromises = sections.map(section =>
        PracticeTestsService.getPracticeTestSection(testNumber, section)
      );

      const allSectionQuestions = await Promise.all(questionPromises);

      sections.forEach((section, index) => {
        questionsBySection[section] = allSectionQuestions[index] || [];
        console.log(`📚 Loaded ${questionsBySection[section].length} questions for ${section} section`);
        if (questionsBySection[section].length > 0) {
          console.log(`   Sample question ID: ${questionsBySection[section][0].id}`);
        }
      });

      // Create maps of user answers
      const userAnswersMap = {};
      const correctnessMap = {};
      const timingMap = {};

      results.forEach(result => {
        userAnswersMap[result.question_id] = result.user_answer;
        correctnessMap[result.question_id] = result.is_correct;
        timingMap[result.question_id] = {
          time_spent: result.time_spent_seconds || 0
        };
      });

      // Merge user answers with questions
      const sectionsWithResults = {};
      sections.forEach(section => {
        const questions = questionsBySection[section] || [];
        sectionsWithResults[section] = questions.map(q => ({
          ...q,
          userAnswer: userAnswersMap[q.id],
          isCorrect: correctnessMap[q.id],
          timeSpent: timingMap[q.id]?.time_spent || 0
        }));
      });

      // Calculate section scores
      const sectionScores = {};
      sections.forEach(section => {
        const questions = sectionsWithResults[section];
        const correct = questions.filter(q => q.isCorrect).length;
        const total = questions.length;
        const percentage = total > 0 ? (correct / total) * 100 : 0;

        sectionScores[section] = {
          correct,
          total,
          percentage,
          actScore: percentageToACTScore(percentage)
        };
      });

      // Calculate composite score
      const compositeACT = Math.round(
        (sectionScores.english.actScore +
         sectionScores.math.actScore +
         sectionScores.reading.actScore +
         sectionScores.science.actScore) / 4
      );

      const data = {
        session,
        sections: sectionsWithResults,
        sectionScores,
        compositeACT,
        totalCorrect: results.filter(r => r.is_correct).length,
        totalQuestions: results.length,
        overallPercentage: session.score_percentage
      };

      console.log('✅ Practice test data loaded:', {
        testNumber,
        compositeACT,
        totalCorrect: data.totalCorrect,
        totalQuestions: data.totalQuestions,
        sectionCounts: {
          english: sectionsWithResults.english?.length,
          math: sectionsWithResults.math?.length,
          reading: sectionsWithResults.reading?.length,
          science: sectionsWithResults.science?.length
        },
        sampleQuestion: sectionsWithResults.english?.[0]
      });

      setTestData(data);
      setLoading(false);

      // Cache for instant reload
      sessionStorage.setItem(cacheKey, JSON.stringify(data));

      logger.info('PracticeTestReview', 'loadPracticeTestDataComplete', {
        sessionId,
        compositeACT
      });
    } catch (err) {
      console.error('Error loading practice test data:', err);
      logger.error('PracticeTestReview', 'loadPracticeTestData', { sessionId }, err);
      setError('Failed to load practice test data');
      setLoading(false);
    }
  };

  const handleSectionClick = (section) => {
    console.log('📖 Opening section:', section);
    setSelectedSection(section);
    setStartingQuestionIndex(0);
    setSectionDropdownOpen(false);
  };

  const handleBackToOverview = useCallback(() => {
    console.log('⬅️ Returning to overview');
    setSelectedSection(null);
    setStartingQuestionIndex(0);

    // Clear section and question from URL
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('section');
    newParams.delete('question');
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  // Handle section selection
  const handleSectionSelect = useCallback((section) => {
    if (!testData) return;
    setStartingQuestionIndex(0);
    setSelectedSection(section);
  }, [testData]);

  // Load section data into the iframe
  const loadSectionIntoIframe = useCallback((section) => {
    console.log('🔧 loadSectionIntoIframe called with:', {
      section,
      testNumber,
      hasIframe: !!iframeRef.current?.contentWindow,
      hasTestData: !!testData
    });

    if (!iframeRef.current?.contentWindow || !testData) {
      console.log('⚠️ Skipping loadSectionIntoIframe - iframe or testData not ready');
      return;
    }

    const sectionQuestions = testData.sections[section] || [];

    // Practice test questions are already transformed by PracticeTestsService
    // They have: id, text, answers (object), correctAnswer, passage, etc.
    const questions = sectionQuestions.map((q) => {
      return {
        id: q.id,
        question_number: q.question_number,
        text: q.text || '[Select the best answer.]',
        answers: q.answers || {},
        correctAnswer: q.correctAnswer || 'A',
        explanation: q.explanation || null,
        passage: q.passage || null,
        passage_title: q.passage_title || null,
        passage_image_urls: q.passage_image_urls || null,
        image_url: q.image_url || null,
        difficulty: q.difficulty,
        question_type: q.question_type
      };
    });

    console.log('📋 Sample question structure:', {
      firstQuestion: questions[0],
      totalQuestions: questions.length,
      section
    });

    // Get user's answers for this section
    const userAnswers = {};
    const correctnessMap = {};

    sectionQuestions.forEach(result => {
      const questionNum = result.question_number;
      if (questionNum) {
        userAnswers[`q${questionNum}`] = result.userAnswer;
        correctnessMap[`q${questionNum}`] = result.isCorrect;
      }
    });

    console.log('📝 User answers sample:', {
      userAnswers: Object.keys(userAnswers).slice(0, 5),
      correctnessMap: Object.keys(correctnessMap).slice(0, 5)
    });

    // Send data to iframe
    const message = {
      type: 'LOAD_REVIEW_MODE',
      section: section,
      questions: questions,
      userAnswers: userAnswers,
      correctnessMap: correctnessMap,
      reviewMode: true,
      startingQuestion: startingQuestionIndex,
      testNumber: testNumber
    };

    console.log('📤 Sending review data to iframe:', {
      section,
      testNumber,
      questionCount: questions.length,
      startingQuestion: startingQuestionIndex,
      sampleQuestionId: questions[0]?.id,
      sampleText: questions[0]?.text?.substring(0, 50)
    });

    console.log('📨 Full postMessage payload:', {
      type: message.type,
      section: message.section,
      testNumber: message.testNumber,
      questionCount: message.questions.length,
      hasUserAnswers: Object.keys(message.userAnswers).length,
      hasCorrectnessMap: Object.keys(message.correctnessMap).length,
      reviewMode: message.reviewMode,
      startingQuestion: message.startingQuestion
    });

    iframeRef.current.contentWindow.postMessage(message, '*');
    console.log('✅ postMessage sent successfully');
  }, [testData, startingQuestionIndex, testNumber]);

  // Load section when selectedSection changes
  useEffect(() => {
    console.log('⚡ selectedSection changed, checking if should load:', {
      selectedSection,
      hasIframe: !!iframeRef.current?.contentWindow,
      hasTestData: !!testData
    });

    if (selectedSection && iframeRef.current?.contentWindow && testData) {
      console.log('⏱️ Starting 100ms timer to load section into iframe');
      // Small delay to ensure iframe is ready
      const timer = setTimeout(() => {
        console.log('⏰ Timer fired, calling loadSectionIntoIframe');
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
        console.log('📨 Received PRACTICE_TEST_CLOSE message');
        setSelectedSection(null);
        setSearchParams({}, { replace: true });
      } else if (type === 'IFRAME_READY') {
        console.log('📨 Received IFRAME_READY message, selectedSection:', selectedSection);
        if (selectedSection) {
          console.log('🔄 Calling loadSectionIntoIframe from IFRAME_READY handler');
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
  }, [selectedSection, testData, loadSectionIntoIframe, handleSectionSelect, setSearchParams]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#ffffff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #08245b',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Loading practice test results...
          </p>
        </div>
      </div>
    );
  }

  if (error || !testData) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#ffffff',
        padding: '2rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error || 'Failed to load test data'}</p>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#08245b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Render section review in iframe
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
              // Go straight back to insights
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
          title={`Practice Test ${testNumber - 1} - ${sectionConfig[selectedSection]?.name} Review`}
        />
      </div>
    );
  }

  // Render overview
  const { sectionScores, compositeACT, overallPercentage, totalCorrect, totalQuestions } = testData;

  // Show warning if no answers were recorded
  if (totalCorrect === 0 && totalQuestions > 0) {
    const allSkipped = Object.values(testData.sections).every(section =>
      section.every(q => q.userAnswer === null || q.userAnswer === undefined)
    );

    if (allSkipped) {
      console.warn('⚠️ All questions appear to be unanswered - test may not have been completed');
    }
  }

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
        {/* Header with back button */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
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
                {compositeACT}
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
                {testData.totalCorrect} of {testData.totalQuestions} correct
          </div>
        </div>

            {/* Section Scores - Inline */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              flex: 1,
              alignItems: 'center'
            }}>
              {Object.entries(sectionConfig).map(([section, config]) => {
                const score = sectionScores[section];
                return (
                  <div key={section} style={{
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
                      {score.actScore}
                    </div>
                    <div style={{
                      fontSize: '0.6875rem',
                      color: '#0f172a',
                      fontWeight: '600',
                      letterSpacing: '0.03em',
                      textTransform: 'capitalize',
                      textAlign: 'center'
                    }}>
                      {section}
                    </div>
                    <div style={{
                      fontSize: '0.625rem',
                      color: '#64748b',
                      textAlign: 'center',
                      lineHeight: '1.2'
                    }}>
                      {score.correct}/{score.total}
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
            {Object.entries(sectionConfig).map(([section, config]) => {
              const score = sectionScores[section];
              const sectionQuestions = testData.sections[section] || [];
              const correct = sectionQuestions.filter(q => q.isCorrect).length;
              const incorrect = sectionQuestions.filter(q => q.userAnswer !== null && !q.isCorrect).length;
              const skipped = sectionQuestions.filter(q => q.userAnswer === null).length;
              const isExpanded = expandedSection === section;

              return (
                <div
                  key={section}
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
                    flex: '0 0 100px',
                    textTransform: 'capitalize'
                  }}>
                    {section}
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
                    {score.actScore}
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
                        e.stopPropagation();
                        console.log('🔘 Review button clicked for section:', section);
                        console.log('   Questions available:', testData.sections[section]?.length);
                        setExpandedSection(null);
                        handleSectionClick(section);
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
                        setExpandedSection(isExpanded ? null : section);
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
                  letterSpacing: '-0.01em',
                  textTransform: 'capitalize'
                }}>
                  {expandedSection} Questions
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(15, 24px)',
                  gap: '0.25rem'
                }}>
                  {(testData.sections[expandedSection] || []).map((question, idx) => {
                    const isCorrect = question.isCorrect;
                    const isAnswered = question.userAnswer !== null;
                    const questionNum = question.question_number || idx + 1;

                    return (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedSection(null);
                          setSelectedSection(expandedSection);
                          setStartingQuestionIndex(questionNum);
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
                          background: !isAnswered ? '#f8fafc' : isCorrect ? '#f0fdf4' : '#fef2f2',
                          color: !isAnswered ? '#94a3b8' : isCorrect ? '#16a34a' : '#dc2626',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
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
                const sectionQuestions = testData.sections[key] || [];

                // Group by question type
                const typeStats = {};
                sectionQuestions.forEach(question => {
                  const questionType = question.question_type || 'General';
                  if (!typeStats[questionType]) {
                    typeStats[questionType] = { correct: 0, total: 0 };
                  }
                  typeStats[questionType].total++;
                  if (question.isCorrect) {
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
                      letterSpacing: '-0.01em',
                      textTransform: 'capitalize'
                    }}>
                      {key}
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
