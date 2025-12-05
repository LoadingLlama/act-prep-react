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
      // Check cache first
      const cacheKey = `practice_test_review_${sessionId}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setTestData(JSON.parse(cached));
        setLoading(false);
        console.log('📊 Using cached practice test review data');
        return;
      }

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
          .eq('user_id', (await supabase.auth.getUser()).data.user.id)
          .eq('test_number', testNumber)
          .order('created_at', { ascending: true })
      ]);

      if (sessionResponse.error) throw sessionResponse.error;
      if (resultsResponse.error) throw resultsResponse.error;

      const session = sessionResponse.data;
      const results = resultsResponse.data;

      // Load questions for all sections in parallel
      const sections = ['english', 'math', 'reading', 'science'];
      const questionsBySection = {};

      const questionPromises = sections.map(section =>
        PracticeTestsService.getPracticeTestSection(testNumber, section)
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

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'NAVIGATE_TO_QUESTION') {
        setStartingQuestionIndex(event.data.questionIndex);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Store test data in sessionStorage for iframe access
  useEffect(() => {
    if (selectedSection && testData) {
      const sectionQuestions = testData.sections[selectedSection];
      sessionStorage.setItem('reviewTestQuestions', JSON.stringify(sectionQuestions));
      sessionStorage.setItem('reviewTestSection', selectedSection);
      sessionStorage.setItem('reviewStartingQuestion', startingQuestionIndex);
    }
  }, [selectedSection, testData, startingQuestionIndex]);

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
        background: '#ffffff',
        zIndex: 3000
      }}>
        <iframe
          ref={iframeRef}
          key={`${selectedSection}-${startingQuestionIndex}`}
          src="/tests/test-review.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: '#ffffff'
          }}
          title={`Practice Test ${testNumber - 1} - ${selectedSection} Review`}
        />
      </div>
    );
  }

  // Render overview
  const { sectionScores, compositeACT, overallPercentage } = testData;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#ffffff',
      zIndex: 3000,
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
        zIndex: 10
      }}>
        <button
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'transparent',
            border: 'none',
            color: '#08245b',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: '6px',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <HiArrowLeft style={{ fontSize: '1.25rem' }} />
          Back to Insights
        </button>
        <Logo size="compact" />
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        {/* Title */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          Practice Test {testNumber - 1} Results
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '0.875rem',
          marginBottom: '2rem'
        }}>
          Completed {new Date(testData.session.created_at).toLocaleDateString()}
        </p>

        {/* Composite Score */}
        <div style={{
          background: 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#ffffff'
        }}>
          <div style={{ fontSize: '0.875rem', fontWeight: '600', opacity: 0.9, marginBottom: '0.5rem' }}>
            ACT COMPOSITE SCORE
          </div>
          <div style={{ fontSize: '4rem', fontWeight: '700', lineHeight: '1' }}>
            {compositeACT}
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, marginTop: '0.5rem' }}>
            {overallPercentage?.toFixed(1)}% Overall
          </div>
        </div>

        {/* Section Scores Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {Object.entries(sectionConfig).map(([section, config]) => {
            const score = sectionScores[section];
            return (
              <div
                key={section}
                onClick={() => handleSectionClick(section)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#08245b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.75rem'
                }}>
                  {config.name}
                </div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#08245b',
                  lineHeight: '1',
                  marginBottom: '0.5rem'
                }}>
                  {score.actScore}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  {score.correct}/{score.total} ({score.percentage.toFixed(0)}%)
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
            Click on any section above to review questions and explanations
          </p>
        </div>
      </div>
    </div>
  );
}
