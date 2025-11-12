/**
 * Course Content Component
 * Shows recommended learning path with stats, lessons, and tests in order
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { HiBookOpen, HiDocumentText, HiPencilSquare, HiAcademicCap, HiUserCircle, HiSparkles } from 'react-icons/hi2';
import { useCourseStyles } from '../../styles/app/course.styles';
import { supabase } from '../../services/api/supabase.service';
import { useAuth } from '../../contexts/AuthContext';
import soundEffects from '../../services/soundEffects';

const CourseContent = () => {
  const classes = useCourseStyles();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    lessonProgress = {},
    lessonStructure = [],
    onLessonOpen,
    onTestOpen,
    setDiagnosticTestOpen
  } = useOutletContext();

  // State for user goals and edit modal
  const [userGoals, setUserGoals] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [diagnosticCompleted, setDiagnosticCompleted] = useState(false);
  const [loadingDiagnostic, setLoadingDiagnostic] = useState(true);
  const [editForm, setEditForm] = useState({
    target_exam_date: '',
    target_score: 28,
    daily_study_minutes: 30,
    current_score: null
  });

  // Load user goals and check diagnostic completion on mount
  useEffect(() => {
    if (user) {
      loadUserGoals();
      checkDiagnosticCompletion();
    }
  }, [user]);

  const checkDiagnosticCompletion = async () => {
    try {
      const { data: results } = await supabase
        .from('diagnostic_results')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      setDiagnosticCompleted(!!results);
    } catch (error) {
      console.error('Error checking diagnostic completion:', error);
      setDiagnosticCompleted(false);
    } finally {
      setLoadingDiagnostic(false);
    }
  };

  const loadUserGoals = async () => {
    try {
      const { data: goals } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (goals) {
        setUserGoals(goals);
        setEditForm({
          target_exam_date: goals.target_exam_date || '',
          target_score: goals.target_score || 28,
          daily_study_minutes: goals.daily_study_minutes || 30,
          current_score: goals.current_score || null
        });
      }
    } catch (error) {
      console.error('Error loading user goals:', error);
    }
  };

  const saveUserGoals = async () => {
    try {
      const { error } = await supabase
        .from('user_goals')
        .upsert({
          user_id: user.id,
          target_exam_date: editForm.target_exam_date || null,
          target_score: editForm.target_score,
          daily_study_minutes: editForm.daily_study_minutes,
          current_score: editForm.current_score,
          updated_at: new Date().toISOString()
        });

      if (!error) {
        await loadUserGoals();
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error('Error saving user goals:', error);
    }
  };

  // Calculate statistics
  const totalLessons = lessonStructure.length;
  const completedLessons = Object.values(lessonProgress).filter(s => s === 'completed').length;
  const inProgressLessons = Object.values(lessonProgress).filter(s => s === 'in-progress').length;

  // Calculate section strengths from diagnostic results or use defaults
  const sectionStrengths = {
    'English': userGoals?.section_scores?.english || 75,
    'Math': userGoals?.section_scores?.math || 62,
    'Reading': userGoals?.section_scores?.reading || 88,
    'Science': userGoals?.section_scores?.science || 70
  };

  // Use user's target exam date or default to 60 days
  const testDate = userGoals?.target_exam_date
    ? new Date(userGoals.target_exam_date)
    : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

  const daysUntilTest = Math.max(0, Math.ceil((testDate - new Date()) / (1000 * 60 * 60 * 24)));

  // Helper to format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getLessonStatus = (itemId) => {
    return lessonProgress[itemId] || 'not-started';
  };

  // Calculate specific due dates for learning path
  const today = new Date();
  const getDateFromToday = (days) => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date;
  };

  // Recommended learning path with specific due dates
  const learningPath = [
    {
      week: 'Week 1',
      startDate: getDateFromToday(0),
      endDate: getDateFromToday(6),
      items: [
        { id: 'getting-started', type: 'lesson', title: 'ACT Test Basics & Overview', skills: 'Strategy', duration: '20 min', dueDate: getDateFromToday(1) },
        { id: 'diagnostic', type: 'test', title: 'Diagnostic Test', skills: 'All Sections', duration: '60 min', dueDate: getDateFromToday(3) }
      ]
    },
    {
      week: 'Week 2',
      startDate: getDateFromToday(7),
      endDate: getDateFromToday(13),
      items: [
        { id: 'english-intro', type: 'lesson', title: 'English Section Fundamentals', skills: 'Grammar', duration: '15 min', dueDate: getDateFromToday(8) },
        { id: 'sentence-structure', type: 'lesson', title: 'Building Complete Sentences', skills: 'Grammar', duration: '15 min', dueDate: getDateFromToday(9) },
        { id: 'commas', type: 'lesson', title: 'Essential Comma Rules', skills: 'Punctuation', duration: '25 min', dueDate: getDateFromToday(11) },
        { id: 'punctuation', type: 'lesson', title: 'Advanced Punctuation', skills: 'Punctuation', duration: '30 min', dueDate: getDateFromToday(13) }
      ]
    },
    {
      week: 'Week 3',
      startDate: getDateFromToday(14),
      endDate: getDateFromToday(20),
      items: [
        { id: 'backsolving', type: 'lesson', title: 'Working Backwards Strategy', skills: 'Problem Solving', duration: '15 min', dueDate: getDateFromToday(15) },
        { id: 'substitution', type: 'lesson', title: 'Number Substitution', skills: 'Algebra', duration: '15 min', dueDate: getDateFromToday(16) },
        { id: '3.1', type: 'lesson', title: 'Algebra Skills', skills: 'Algebra', duration: '20 min', dueDate: getDateFromToday(18) },
        { id: '3.2', type: 'lesson', title: 'Fractions', skills: 'Numbers', duration: '15 min', dueDate: getDateFromToday(20) }
      ]
    },
    {
      week: 'Week 4',
      startDate: getDateFromToday(21),
      endDate: getDateFromToday(27),
      items: [
        { id: 'reading-intro', type: 'lesson', title: 'Reading Section Fundamentals', skills: 'Reading', duration: '40 min', dueDate: getDateFromToday(22) },
        { id: 'passage-approach', type: 'lesson', title: 'How to Approach Passages', skills: 'Strategy', duration: '15 min', dueDate: getDateFromToday(24) },
        { id: 'core-principles', type: 'lesson', title: '7 Core Principles', skills: 'Comprehension', duration: '15 min', dueDate: getDateFromToday(25) },
        { id: 'practice-test-1', type: 'test', title: 'Test 1', skills: 'All Sections', duration: '180 min', dueDate: getDateFromToday(27) }
      ]
    },
    {
      week: 'Week 5',
      startDate: getDateFromToday(28),
      endDate: getDateFromToday(34),
      items: [
        { id: 'science-introduction', type: 'lesson', title: 'Science Section Basics', skills: 'Science', duration: '40 min', dueDate: getDateFromToday(29) },
        { id: 'specific-data-point', type: 'lesson', title: 'Data Point Questions', skills: 'Data Analysis', duration: '15 min', dueDate: getDateFromToday(31) },
        { id: 'trends', type: 'lesson', title: 'Trends Questions', skills: 'Interpretation', duration: '15 min', dueDate: getDateFromToday(34) }
      ]
    },
    {
      week: 'Week 6',
      startDate: getDateFromToday(35),
      endDate: getDateFromToday(41),
      items: [
        { id: 'verbs', type: 'lesson', title: 'Verb Agreement & Tenses', skills: 'Grammar', duration: '25 min', dueDate: getDateFromToday(36) },
        { id: 'pronouns', type: 'lesson', title: 'Pronoun Usage', skills: 'Grammar', duration: '30 min', dueDate: getDateFromToday(38) },
        { id: 'systems-equations', type: 'lesson', title: 'Systems of Equations', skills: 'Algebra', duration: '15 min', dueDate: getDateFromToday(39) },
        { id: 'practice-test-2', type: 'test', title: 'Test 2', skills: 'All Sections', duration: '180 min', dueDate: getDateFromToday(41) }
      ]
    }
  ];

  const handleItemClick = (item) => {
    soundEffects.playClick();
    if (item.type === 'lesson') {
      onLessonOpen(item.id, 'review');
    } else if (item.type === 'test') {
      if (item.id === 'diagnostic') {
        // Open diagnostic test
      } else {
        const testNumber = parseInt(item.id.split('-').pop());
        onTestOpen(testNumber);
      }
    }
  };

  const getItemIcon = (type) => {
    if (type === 'test') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      );
    }
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    );
  };

  // Loading state
  if (loadingDiagnostic) {
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.title}>Learning Path</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', color: '#6b7280' }}>
          Loading...
        </div>
      </div>
    );
  }

  // Locked state - diagnostic not completed (show blurred content)
  const renderLockedContent = () => {
    return (
      <div className={classes.container} style={{ position: 'relative' }}>
        <div className={classes.header}>
          <h1 className={classes.title}>Learning Path</h1>
        </div>

        {/* Blurred background content */}
        <div style={{
          filter: 'blur(8px)',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0.4
        }}>
          <div className={classes.content}>
            {/* Top Stats Grid */}
            <div className={classes.statsGrid}>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Test Date</div>
                <div className={classes.statValue}>Dec 15</div>
                <div className={classes.statDetail}>45 days left</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Completed</div>
                <div className={classes.statValue}>0 / {totalLessons}</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>English</div>
                <div className={classes.statValue}>--</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Math</div>
                <div className={classes.statValue}>--</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Reading</div>
                <div className={classes.statValue}>--</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Science</div>
                <div className={classes.statValue}>--</div>
              </div>
            </div>

            {/* Weekly Assignments */}
            <div className={classes.weeksContainer}>
              {learningPath.slice(0, 3).map((week, weekIndex) => (
                <div key={weekIndex} className={classes.section}>
                  <div className={classes.sectionHeader}>
                    <h2 className={classes.sectionTitle}>{week.week}</h2>
                  </div>
                  <div className={classes.weekGrid}>
                    {week.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={classes.weekCard}>
                        <div className={classes.weekCardContent}>
                          <span className={classes.weekCardIcon}>{getItemIcon(item.type)}</span>
                          <span className={classes.weekCardText}>{item.title}</span>
                        </div>
                        <span className={classes.weekCardArrow}>→</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lock overlay */}
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          textAlign: 'center',
          width: '100%',
          maxWidth: '600px',
          padding: '0 2rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '3rem 2rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              background: '#fef2f2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '0.75rem'
            }}>
              Complete Your Full Diagnostic
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              Your personalized learning path will be generated after you complete the full diagnostic assessment. This includes ACT questions and personalized study preferences to identify your strengths and create a customized study plan.
            </p>
            <button
              onClick={() => {
                soundEffects.playSuccess();
                setDiagnosticTestOpen(true);
              }}
              style={{
                background: '#b91c1c',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#991b1b';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#b91c1c';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Start Full Diagnostic
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!diagnosticCompleted) {
    return renderLockedContent();
  }

  return (
    <div className={classes.container}>
      {/* Top Bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        zIndex: 100,
        marginBottom: '2rem'
      }}>
        {/* Left: Explore */}
        <button
          onClick={() => navigate('/app/lessons')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'transparent',
            border: 'none',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#6b7280',
            borderRadius: '8px',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.color = '#1a1a1a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#6b7280';
          }}
        >
          <HiSparkles style={{ fontSize: '1.25rem' }} />
          Explore
        </button>

        {/* Center: Logo */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '1.5rem',
          fontWeight: '800',
          color: '#08245b',
          letterSpacing: '-0.02em'
        }}>
          ACT PREP
        </div>

        {/* Right: Profile Picture */}
        <button
          onClick={() => navigate('/app/profile')}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0',
            cursor: 'pointer',
            borderRadius: '50%',
            transition: 'transform 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <HiUserCircle style={{ fontSize: '2.5rem', color: '#6b7280' }} />
        </button>
      </div>

      {/* Header */}
      <div className={classes.header}>
        <h1 className={classes.title}>Learning Path</h1>
        <button
          onClick={() => setEditModalOpen(true)}
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
            transition: 'color 0.15s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#1a1a1a'}
          onMouseLeave={(e) => e.target.style.color = '#6b7280'}
        >
          <HiPencilSquare style={{ width: '16px', height: '16px' }} />
          Edit Goals
        </button>
      </div>

      {/* Main Content */}
      <div className={classes.content}>
        {/* Top Stats Grid */}
        <div className={classes.statsGrid}>
          {/* Test Date */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>Test Date</div>
            <div className={classes.statValue}>{testDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div className={classes.statDetail}>{daysUntilTest} days left</div>
          </div>

          {/* Completed */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>Completed</div>
            <div className={classes.statValue}>{completedLessons} / {totalLessons}</div>
          </div>

          {/* English */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>English</div>
            <div className={classes.statValue}>{sectionStrengths.English}%</div>
          </div>

          {/* Math */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>Math</div>
            <div className={classes.statValue}>{sectionStrengths.Math}%</div>
          </div>

          {/* Reading */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>Reading</div>
            <div className={classes.statValue}>{sectionStrengths.Reading}%</div>
          </div>

          {/* Science */}
          <div className={classes.statCard}>
            <div className={classes.statLabel}>Science</div>
            <div className={classes.statValue}>{sectionStrengths.Science}%</div>
          </div>
        </div>

        {/* Weekly Assignments */}
        <div className={classes.weeksContainer}>
          {learningPath.map((week, weekIndex) => {
            // Determine if this is the current week
            const now = new Date();
            const isCurrentWeek = now >= week.startDate && now <= week.endDate;

            return (
              <div key={weekIndex} className={`${classes.section} ${isCurrentWeek ? 'current' : ''}`}>
                <div className={classes.sectionHeader}>
                  <h2 className={classes.sectionTitle}>{week.week}</h2>
                </div>
                <div className={classes.weekGrid}>
                  {week.items.map((item, itemIndex) => {
                    const status = getLessonStatus(item.id);
                    const isCompleted = status === 'completed';
                    const lessonData = lessonStructure.find(l => l.id === item.id);
                    const chapterNum = lessonData?.chapterNum;

                    return (
                      <div
                        key={itemIndex}
                        className={`${classes.weekCard} ${isCompleted ? 'completed' : ''}`}
                        onClick={() => handleItemClick(item)}
                      >
                        <div className={classes.weekCardContent}>
                          <span className={classes.weekCardIcon}>{getItemIcon(item.type)}</span>
                          <span className={classes.weekCardText}>
                            {item.title}
                            {chapterNum && (
                              <span style={{
                                marginLeft: '0.5rem',
                                color: '#9ca3af',
                                fontSize: '0.8125rem',
                                fontWeight: '400'
                              }}>
                                {chapterNum}
                              </span>
                            )}
                          </span>
                        </div>
                        <span className={classes.weekCardArrow}>→</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Goals Modal */}
      {editModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#1a1a1a' }}>
              Edit Learning Path Goals
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Test Date */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Target Test Date
                </label>
                <input
                  type="date"
                  value={editForm.target_exam_date}
                  onChange={(e) => setEditForm({ ...editForm, target_exam_date: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Current ACT Score */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Current ACT Score (Optional)
                </label>
                <input
                  type="number"
                  min="1"
                  max="36"
                  placeholder="e.g., 24"
                  value={editForm.current_score || ''}
                  onChange={(e) => setEditForm({ ...editForm, current_score: e.target.value ? parseInt(e.target.value) : null })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Target Score */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Target ACT Score
                </label>
                <input
                  type="number"
                  min="1"
                  max="36"
                  value={editForm.target_score}
                  onChange={(e) => setEditForm({ ...editForm, target_score: parseInt(e.target.value) || 28 })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Daily Study Time */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Daily Study Time (minutes)
                </label>
                <input
                  type="number"
                  min="10"
                  max="240"
                  step="5"
                  value={editForm.daily_study_minutes}
                  onChange={(e) => setEditForm({ ...editForm, daily_study_minutes: parseInt(e.target.value) || 30 })}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
              <button
                onClick={() => setEditModalOpen(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  background: 'white',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveUserGoals}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#1a1a1a',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
