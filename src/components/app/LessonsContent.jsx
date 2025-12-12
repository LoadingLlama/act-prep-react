/**
 * Lessons Content Component
 * Displays the lessons grid with filtering and compact professional design
 */

import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLessonsContentStyles } from '../../styles/app/lessons-content.styles';
import { getFeatureAccess } from '../../services/subscription.service';
import StatusIcon from '../StatusIcon';
import {
  HiStar,
  HiBookOpen,
  HiAcademicCap,
  HiBeaker,
  HiChartBar,
  HiCalculator,
  HiDocumentText,
  HiLightBulb,
  HiSparkles,
  HiPencilSquare,
  HiChatBubbleLeftRight,
  HiCube,
  HiArrowTrendingUp,
  HiHashtag,
  HiChartPie,
  HiCpuChip,
  HiQuestionMarkCircle,
  HiRocketLaunch,
  HiPuzzlePiece,
  HiLockClosed,
  HiBolt,
  HiCheckCircle,
  HiChevronDown,
  HiChevronUp,
  HiClock,
  HiArrowLeft
} from 'react-icons/hi2';
import soundEffects from '../../services/soundEffects';

const LessonsContent = () => {
  const classes = useLessonsContentStyles();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    lessonStructure = [],
    lessonContent = {},
    expandedSections = {},
    toggleSection,
    getLessonStatus,
    onLessonOpen: openLesson,
    setHoveredMoreTag,
    setMoreTagPosition,
    setHeaderControls
  } = useOutletContext();

  // Local state for filtering
  const [viewMode, setViewMode] = useState('grid');
  const [mode, setMode] = useState(() => {
    // Check URL parameter for initial mode
    const params = new URLSearchParams(location.search);
    return params.get('mode') === 'drills' ? 'drills' : 'lessons';
  });
  const [featureAccess, setFeatureAccess] = useState(null);
  const [previewLesson, setPreviewLesson] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [practiceQuestionCounts, setPracticeQuestionCounts] = useState(() => {
    // Load cached counts from localStorage for instant rendering
    try {
      const cached = localStorage.getItem('practiceQuestionCounts');
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        // Cache valid for 1 hour
        if (Date.now() - timestamp < 3600000) {
          console.log('📊 Using cached practice question counts');
          return data;
        }
      }
    } catch (e) {
      console.error('Error loading cached question counts:', e);
    }
    return {};
  });
  const [isLoadingCounts, setIsLoadingCounts] = useState(false);


  // Check for mode parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlMode = params.get('mode');
    if (urlMode === 'drills') {
      setMode('drills');
    } else {
      // If no mode parameter or mode=lessons, default to lessons
      setMode('lessons');
    }
  }, [location.search]);

  // Set header controls for mode toggle
  useEffect(() => {
    if (setHeaderControls) {
      setHeaderControls(
        <div className={classes.modeToggle} style={{ marginLeft: '-2rem' }}>
          <button
            className={`${classes.modeButton} ${mode === 'lessons' ? 'active' : ''}`}
            style={isInitialRender ? { transition: 'none' } : {}}
            onClick={() => {
              soundEffects.playToggle();
              setMode('lessons');
              navigate('/app/lessons');
            }}
          >
            <HiBookOpen style={{ fontSize: '1rem' }} />
            Lessons
          </button>
          <button
            className={`${classes.modeButton} ${mode === 'drills' ? 'active' : ''}`}
            style={isInitialRender ? { transition: 'none' } : {}}
            onClick={() => {
              soundEffects.playToggle();
              setMode('drills');
              navigate('/app/lessons?mode=drills');
            }}
          >
            <HiBolt style={{ fontSize: '1rem' }} />
            Drills
          </button>
        </div>
      );
    }

    // Disable initial render flag after first render
    if (isInitialRender) {
      setTimeout(() => setIsInitialRender(false), 50);
    }

    // Clean up on unmount
    return () => {
      if (setHeaderControls) {
        setHeaderControls(null);
      }
    };
  }, [mode, setHeaderControls, classes, navigate, isInitialRender]);

  // Check feature access
  useEffect(() => {
    if (user) {
      checkFeatureAccess();
    }
  }, [user]);

  const checkFeatureAccess = async () => {
    try {
      const access = await getFeatureAccess(user.id);
      setFeatureAccess(access);
    } catch (error) {
      console.error('Error checking feature access:', error);
    }
  };

  // Load practice question counts
  useEffect(() => {
    const loadPracticeQuestionCounts = async () => {
      try {
        setIsLoadingCounts(true);
        const { supabase } = await import('../../services/api/supabase.service');

        console.log('📊 Loading practice question counts...');

        // Fetch both lessons and questions in parallel
        const [lessonsResult, questionsResult] = await Promise.all([
          supabase.from('lessons').select('id, lesson_key'),
          supabase.from('practice_questions').select('lesson_id')
        ]);

        if (lessonsResult.error) {
          console.error('Error loading lessons:', lessonsResult.error);
          throw lessonsResult.error;
        }
        if (questionsResult.error) {
          console.error('Error loading questions:', questionsResult.error);
          throw questionsResult.error;
        }

        console.log('📊 Loaded', lessonsResult.data?.length, 'lessons and', questionsResult.data?.length, 'questions');

        // Create mapping from UUID to lesson_key
        const idToKeyMap = {};
        lessonsResult.data?.forEach(l => {
          idToKeyMap[l.id] = l.lesson_key;
        });

        // Count questions per lesson using lesson_key
        const counts = {};
        questionsResult.data?.forEach(q => {
          const lessonKey = idToKeyMap[q.lesson_id];
          if (lessonKey) {
            counts[lessonKey] = (counts[lessonKey] || 0) + 1;
          }
        });

        console.log('📊 Practice question counts loaded:', Object.keys(counts).length, 'lessons with questions');
        console.log('📊 Sample counts:', Object.entries(counts).slice(0, 5));

        // Cache the counts in localStorage
        try {
          localStorage.setItem('practiceQuestionCounts', JSON.stringify({
            data: counts,
            timestamp: Date.now()
          }));
          console.log('📊 Cached practice question counts to localStorage');
        } catch (e) {
          console.error('Error caching question counts:', e);
        }

        setPracticeQuestionCounts(counts);
      } catch (error) {
        console.error('❌ Error loading practice question counts:', error);
      } finally {
        setIsLoadingCounts(false);
      }
    };

    loadPracticeQuestionCounts();
  }, []);

  // Get mastery rating for a lesson from localStorage
  const getMasteryRating = (lessonId) => {
    const masteryKey = `lesson_mastery_${lessonId}`;
    const saved = localStorage.getItem(masteryKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.rating || 0;
      } catch (e) {
        return 0;
      }
    }
    return 0;
  };

  const getRatingLabel = (rating) => {
    if (rating === 0) return 'Not Started';
    if (rating === 1) return 'Beginner';
    if (rating === 2) return 'Learning';
    if (rating === 3) return 'Competent';
    if (rating === 4) return 'Advanced';
    if (rating === 5) return 'Expert';
    return 'Not Started';
  };

  const getRatingColor = (rating) => {
    if (rating === 0) return '#94a3b8';
    if (rating <= 2) return '#f59e0b';
    if (rating <= 3) return '#3b82f6';
    if (rating <= 4) return '#6366f1';
    return '#10b981';
  };

  const toggleCategory = (categoryKey) => {
    soundEffects.playToggle();
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };


  const getCategoryIcon = (category, section) => {
    const iconMap = {
      'Introduction': HiSparkles,
      'Grammar Fundamentals': HiPencilSquare,
      'Rhetorical Skills': HiChatBubbleLeftRight,
      'Test-Taking Strategies': HiLightBulb,
      'Geometry': HiCube,
      'Algebra Fundamentals': HiCalculator,
      'Advanced Algebra': HiArrowTrendingUp,
      'Numbers & Operations': HiHashtag,
      'Statistics & Probability': HiChartPie,
      'Advanced Topics': HiCpuChip,
      'Fundamentals': HiAcademicCap,
      'Question Types': HiQuestionMarkCircle,
      'Advanced Strategies': HiRocketLaunch,
      'Data Interpretation': HiChartBar,
      'Advanced Question Types': HiPuzzlePiece,
      'Background Knowledge': HiBookOpen,
      'Other': HiDocumentText
    };
    const IconComponent = iconMap[category] || HiDocumentText;

    return <IconComponent />;
  };


  // New function to get all lessons grouped by section and category
  const getAllLessonsBySection = () => {
    const sections = {
      english: { title: 'English', lessons: [] },
      math: { title: 'Math', lessons: [] },
      reading: { title: 'Reading', lessons: [] },
      science: { title: 'Science', lessons: [] }
    };

    lessonStructure.forEach((lesson, index) => {
      // In drills mode, exclude Introduction lessons
      if (mode === 'drills' && lesson.category === 'Introduction') return;

      const isLocked = featureAccess && !featureAccess.isPro && index >= featureAccess.lessonsPerSection;
      const enhancedLesson = {
        ...lesson,
        duration: lessonContent[lesson.id]?.duration || lesson.duration,
        isLocked
      };

      if (sections[lesson.section]) {
        sections[lesson.section].lessons.push(enhancedLesson);
      }
    });

    // Group lessons within each section by category
    Object.keys(sections).forEach(sectionKey => {
      const categoryGroups = {};
      sections[sectionKey].lessons.forEach(lesson => {
        const category = lesson.category || 'Other';
        if (!categoryGroups[category]) {
          categoryGroups[category] = [];
        }
        categoryGroups[category].push(lesson);
      });
      sections[sectionKey].categoryGroups = categoryGroups;
    });

    return sections;
  };

  const renderLessonCard = (lesson) => {
    const status = getLessonStatus(lesson.id);
    const isGridView = viewMode === 'grid';

    // Format duration to "X min" format
    const formatDuration = (duration) => {
      if (!duration) return '';
      // If it's like "25 minutes", convert to "25 min"
      return duration.replace(/\s*minutes?$/i, ' min');
    };

    const handleMoreTagHover = (e, lesson) => {
      e.stopPropagation();
      const rect = e.target.getBoundingClientRect();
      setMoreTagPosition({
        top: rect.top,
        left: rect.left + rect.width / 2
      });
      setHoveredMoreTag(lesson);
    };

    const cardStyle = {
      ...(lesson.isLocked ? { opacity: 0.6, cursor: 'pointer' } : {}),
      ...(lesson.cover_image_url && isGridView ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.6)), url(${lesson.cover_image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        minHeight: '180px',
        borderRadius: '12px',
        padding: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      } : {})
    };

    return (
      <div
        key={lesson.id}
        className={`${isGridView ? classes.lessonCard : classes.lessonCardListView} ${status}`}
        onClick={() => {
          soundEffects.playClick();
          if (lesson.isLocked) {
            navigate('/app/upgrade');
          } else {
            setPreviewLesson({ ...lesson, status });
          }
        }}
        onMouseLeave={() => setHoveredMoreTag(null)}
        style={cardStyle}
      >
        <div className={classes.lessonStatus} style={!isGridView ? { position: 'relative', top: 'auto', right: 'auto' } : {}}>
          {lesson.isLocked ? <HiLockClosed style={{ fontSize: '1.125rem', color: '#3b82f6' }} /> : <StatusIcon status={status} />}
        </div>
        <div className={classes.lessonInfo} style={!isGridView ? { paddingRight: 0 } : {}}>
          <div className={classes.lessonTitle} style={{
            ...(!isGridView ? { fontSize: '0.8rem', marginBottom: '0.15rem', lineHeight: '1.2' } : {}),
            ...(lesson.cover_image_url && isGridView ? { color: '#ffffff', textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' } : {})
          }}>
            {lesson.title}
            {lesson.isLocked && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#3b82f6', fontWeight: '600' }}>Pro</span>}
          </div>
          {lesson.chapterNum && isGridView && (
            <div className={classes.lessonChapter} style={lesson.cover_image_url ? {
              background: 'rgba(255, 255, 255, 0.95)',
              WebkitBackgroundClip: 'unset',
              WebkitTextFillColor: 'unset',
              backgroundClip: 'unset',
              color: '#08245b',
              padding: '0.125rem 0.5rem',
              borderRadius: '4px',
              display: 'inline-block'
            } : {}}>{lesson.chapterNum}</div>
          )}
          {lesson.keyTerms && lesson.keyTerms.length > 0 && isGridView && (
            <div className={classes.keyTermsTags} style={lesson.cover_image_url ? { color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' } : {}}>
              {lesson.keyTerms.slice(0, 2).join(' • ')}
              {lesson.keyTerms.length > 2 && (
                <span
                  onMouseEnter={(e) => handleMoreTagHover(e, lesson)}
                  style={{ cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted' }}
                >
                  {` • +${lesson.keyTerms.length - 2} more`}
                </span>
              )}
            </div>
          )}
          {lesson.duration && isGridView && (
            <div style={{
              fontSize: '0.75rem',
              color: lesson.cover_image_url ? 'rgba(255, 255, 255, 0.85)' : '#64748b',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              ...(lesson.cover_image_url ? { textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' } : {})
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {formatDuration(lesson.duration)}
            </div>
          )}
          {lesson.chapterNum && !isGridView && (
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '500' }}>{lesson.chapterNum}</div>
          )}
        </div>
        {lesson.duration && !isGridView && (
          <div style={{
            fontSize: '0.7rem',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            flexShrink: 0
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {formatDuration(lesson.duration)}
          </div>
        )}
      </div>
    );
  };

  // Practice view render - same as lessons but with star ratings
  const renderPracticeCard = (lesson) => {
    const rating = getMasteryRating(lesson.id);
    const ratingColor = getRatingColor(rating);
    const isGridView = viewMode === 'grid';
    const isGolden = rating === 5;

    // Format duration to "X min" format
    const formatDuration = (duration) => {
      if (!duration) return '';
      // If it's like "25 minutes", convert to "25 min"
      return duration.replace(/\s*minutes?$/i, ' min');
    };

    const handleMoreTagHover = (e, lesson) => {
      e.stopPropagation();
      const rect = e.target.getBoundingClientRect();
      setMoreTagPosition({
        top: rect.top,
        left: rect.left + rect.width / 2
      });
      setHoveredMoreTag(lesson);
    };

    return (
      <div
        key={lesson.id}
        className={`${isGridView ? classes.lessonCard : classes.lessonCardListView} ${isGolden ? 'golden' : ''}`}
        onClick={() => {
          soundEffects.playClick();
          openLesson(lesson.id, 'drills');
        }}
        onMouseLeave={() => setHoveredMoreTag(null)}
      >
        <div className={classes.lessonInfo} style={!isGridView ? { paddingRight: 0 } : {}}>
          <div className={classes.lessonTitle} style={!isGridView ? { fontSize: '0.8rem', marginBottom: '0.15rem', lineHeight: '1.2' } : { overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{lesson.title}</div>
          {lesson.chapterNum && isGridView && (
            <div className={classes.lessonChapter}>{lesson.chapterNum}</div>
          )}
          {lesson.chapterNum && !isGridView && (
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '500' }}>{lesson.chapterNum}</div>
          )}
        </div>
        {/* Star Rating - positioned inline on the right for list view, absolute for grid view */}
        {/* Hide stars for Introduction lessons */}
        {lesson.category !== 'Introduction' && (
          <div style={!isGridView ? {
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            flexShrink: 0
          } : {
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            display: 'flex',
            gap: '1px',
            alignItems: 'center',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = rating >= star;
              const isHalf = rating >= star - 0.5 && rating < star;
              const starColor = '#fbbf24'; // Golden color for all filled stars
              const starSize = !isGridView ? '0.7rem' : '0.875rem';

              return (
                <div key={star} style={{ position: 'relative', display: 'inline-block', fontSize: starSize, lineHeight: 1 }}>
                  {isHalf ? (
                    <>
                      <HiStar style={{ display: 'block', color: '#e5e7eb' }} />
                      <div style={{ position: 'absolute', width: '50%', overflow: 'hidden', left: 0, top: 0, height: '100%' }}>
                        <HiStar style={{ display: 'block', color: starColor }} />
                      </div>
                    </>
                  ) : (
                    <HiStar
                      style={{
                        display: 'block',
                        color: isFilled ? starColor : '#e5e7eb'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };


  // Calculate progress stats across all sections
  const calculateProgress = () => {
    let allLessons = lessonStructure;

    // In drills mode, exclude Introduction lessons
    if (mode === 'drills') {
      allLessons = allLessons.filter(lesson => lesson.category !== 'Introduction');
    }

    const completedCount = allLessons.filter(lesson => getLessonStatus(lesson.id) === 'completed').length;
    const totalCount = allLessons.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return {
      percentage,
      completed: completedCount,
      total: totalCount
    };
  };

  const progress = calculateProgress();
  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress.percentage / 100) * circumference;

  return (
    <div className={classes.lessonsContainer}>
      {/* Main Content */}
      <div className={classes.lessonsMainContent}>
      {/* Mode Toggle moved to AppLayout header */}
      <div className={classes.contentSection}>
        {/* Render section cards in grid */}
        <div className={classes.categoriesGrid}>
          {Object.entries(getAllLessonsBySection()).map(([sectionKey, sectionData]) => {
            if (!sectionData.lessons.length) return null;

            const isExpanded = expandedCategories[sectionKey];

            // Check if any section is expanded
            const anyExpanded = Object.values(expandedCategories).some(val => val === true);

            // Hide this card if another section is expanded
            if (anyExpanded && !isExpanded) return null;
            const totalLessons = sectionData.lessons.length;
            const completedCount = sectionData.lessons.filter(l => getLessonStatus(l.id) === 'completed').length;

            // Calculate total questions
            const totalQuestions = sectionData.lessons.reduce((sum, l) => {
              const questionCount = practiceQuestionCounts[l.id] || 0;
              return sum + questionCount;
            }, 0);

            // Calculate progress percentage
            const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

            // Get section icon, colors, and cover images
            let SectionIcon = HiPencilSquare;
            let iconColor = '#ffffff';
            let bgColor = '#3b82f6';
            let borderColor = '#2563eb';
            let progressBarColor = '#1e40af';
            let coverImage = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80'; // Classic library for English

            if (sectionKey === 'science') {
              SectionIcon = HiBeaker;
              iconColor = '#ffffff';
              bgColor = '#10b981';
              borderColor = '#059669';
              progressBarColor = '#047857';
              coverImage = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80'; // Science laboratory
            } else if (sectionKey === 'math') {
              SectionIcon = HiCalculator;
              iconColor = '#ffffff';
              bgColor = '#dc2626';
              borderColor = '#b91c1c';
              progressBarColor = '#991b1b';
              coverImage = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80'; // Mathematics formulas
            } else if (sectionKey === 'reading') {
              SectionIcon = HiBookOpen;
              iconColor = '#ffffff';
              bgColor = '#d97706';
              borderColor = '#b45309';
              progressBarColor = '#92400e';
              coverImage = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80'; // Old books
            }

            return (
              <React.Fragment key={sectionKey}>
                {/* Section Card */}
                <div
                  className={classes.categoryCard}
                  onClick={() => {
                    soundEffects.playClick();
                    toggleCategory(sectionKey);
                  }}
                  style={{
                    gridColumn: isExpanded ? '1 / -1' : 'auto'
                  }}
                >
                  {/* Top colored section with icon and background image */}
                  <div
                    className={classes.categoryCardHeader}
                    style={{
                      background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${coverImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderBottom: `1px solid #e5e7eb`
                    }}
                  >
                    <div
                      className={classes.categoryIcon}
                      style={{
                        color: iconColor,
                        filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))'
                      }}
                    >
                      <SectionIcon />
                    </div>
                  </div>

                  {/* Bottom white section with text */}
                  {!isExpanded && (
                    <div className={classes.categoryInfo}>
                      <div className={classes.categoryTitle}>{sectionData.title}</div>
                      <div className={classes.categorySubtitle}>
                        {mode === 'lessons'
                          ? `${totalLessons} lesson${totalLessons !== 1 ? 's' : ''}`
                          : isLoadingCounts && Object.keys(practiceQuestionCounts).length === 0
                            ? (
                              <span style={{
                                display: 'inline-block',
                                width: '60px',
                                height: '12px',
                                background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 1.5s infinite',
                                borderRadius: '3px'
                              }}></span>
                            )
                            : `${totalQuestions} question${totalQuestions !== 1 ? 's' : ''}`
                        }
                      </div>

                      {/* Progress Bar */}
                      <div style={{
                        width: '100%',
                        height: '24px',
                        background: '#e5e7eb',
                        borderRadius: '999px',
                        overflow: 'hidden',
                        marginTop: '0.75rem',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingLeft: '0.75rem'
                      }}>
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: `${progressPercentage}%`,
                          background: progressBarColor,
                          borderRadius: '999px',
                          transition: 'width 0.3s ease'
                        }} />
                        <div style={{
                          position: 'relative',
                          zIndex: 1,
                          fontSize: '0.75rem',
                          color: progressPercentage > 10 ? '#ffffff' : '#374151',
                          fontWeight: '700',
                          textShadow: progressPercentage > 10 ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none'
                        }}>
                          {progressPercentage}%
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expanded Lessons List */}
                  {isExpanded && (
                    <div style={{
                      padding: '1.25rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e5e7eb',
                      background: '#ffffff'
                    }}>
                      {/* Back Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEffects.playClick();
                          toggleCategory(sectionKey);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0',
                          marginBottom: '0.5rem',
                          background: 'transparent',
                          border: 'none',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#6b7280',
                          cursor: 'pointer',
                          transition: 'color 0.15s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = '#1a1a1a';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = '#6b7280';
                        }}
                      >
                        <HiArrowLeft style={{ fontSize: '1rem' }} />
                        Back to Courses
                      </button>

                      {/* Section Title */}
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#1a1a1a',
                        marginBottom: '1.5rem'
                      }}>
                        {sectionData.title}
                      </div>

                      {Object.entries(sectionData.categoryGroups).map(([category, lessons]) => (
                        <div key={category} style={{ marginBottom: '1.5rem' }}>
                          {/* Category Header */}
                          <div style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#1a1a1a',
                            marginBottom: '0.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            {category}
                          </div>

                          {/* Lessons in Category */}
                          {lessons.map(lesson => {
                            const status = getLessonStatus(lesson.id);
                            const isCompleted = status === 'completed';
                            const isInProgress = status === 'in-progress';
                            const showCheckmark = isCompleted || isInProgress;

                            return (
                              <div
                                key={lesson.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!lesson.isLocked) {
                                    soundEffects.playClick();
                                    openLesson(lesson.id, mode === 'drills' ? 'practice' : 'review');
                                  } else {
                                    navigate('/app/upgrade');
                                  }
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.75rem',
                                  padding: '0.625rem 0.75rem',
                                  margin: '0.25rem 0',
                                  cursor: lesson.isLocked ? 'not-allowed' : 'pointer',
                                  opacity: lesson.isLocked ? 0.5 : 1,
                                  borderRadius: '6px',
                                  transition: 'background 0.15s'
                                }}
                                onMouseOver={(e) => {
                                  if (!lesson.isLocked) e.currentTarget.style.background = '#f3f4f6';
                                }}
                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                              >
                                {/* Checkbox */}
                                <div style={{
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  {showCheckmark ? (
                                    <HiCheckCircle style={{
                                      fontSize: '1.25rem',
                                      color: '#3b82f6'
                                    }} />
                                  ) : (
                                    <div style={{
                                      width: '18px',
                                      height: '18px',
                                      border: '2px solid #d1d5db',
                                      borderRadius: '4px'
                                    }} />
                                  )}
                                </div>

                                {/* Lesson Title */}
                                <div style={{
                                  flex: 1,
                                  fontSize: '0.875rem',
                                  color: '#374151',
                                  fontWeight: '500'
                                }}>
                                  {lesson.title}
                                </div>

                                {/* Duration for Lessons, Question Count for Drills, or Lock Icon */}
                                {lesson.isLocked ? (
                                  <HiLockClosed style={{ color: '#9ca3af', fontSize: '1rem' }} />
                                ) : mode === 'lessons' ? (
                                  <div style={{
                                    fontSize: '0.875rem',
                                    color: '#6b7280',
                                    fontWeight: '500'
                                  }}>
                                    {lessonContent[lesson.id]?.duration || ''}
                                  </div>
                                ) : isLoadingCounts && Object.keys(practiceQuestionCounts).length === 0 ? (
                                  <span style={{
                                    display: 'inline-block',
                                    width: '40px',
                                    height: '14px',
                                    background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer 1.5s infinite',
                                    borderRadius: '3px'
                                  }}></span>
                                ) : (
                                  <div style={{
                                    fontSize: '0.875rem',
                                    color: '#6b7280',
                                    fontWeight: '500'
                                  }}>
                                    0/{practiceQuestionCounts[lesson.id] || 0}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      </div>

      {/* Progress Sidebar */}
      <div className={classes.progressSidebar}>
        <div className={classes.progressCard}>
          <h3 className={classes.progressTitle}>Progress</h3>

          {/* Circular Progress */}
          <div className={classes.progressCircleContainer}>
            <div className={classes.progressCircle}>
              <svg className={classes.progressCircleSvg} width="180" height="180">
                <circle
                  className={classes.progressCircleBackground}
                  cx="90"
                  cy="90"
                  r={radius}
                />
                <circle
                  className={classes.progressCircleProgress}
                  cx="90"
                  cy="90"
                  r={radius}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className={classes.progressText}>
                <div className={classes.progressPercentage}>{progress.percentage}%</div>
                <div className={classes.progressFraction}>{progress.completed}/{progress.total}</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={classes.progressStats}>
            <div className={classes.progressStat}>
              <div className={classes.progressStatLabel}>Completed</div>
              <div className={classes.progressStatValue} style={{ color: '#10b981' }}>
                {progress.completed}
              </div>
            </div>
            <div className={classes.progressStat}>
              <div className={classes.progressStatLabel}>Remaining</div>
              <div className={classes.progressStatValue} style={{ color: '#ef4444' }}>
                {progress.total - progress.completed}
              </div>
            </div>
          </div>
        </div>

        {/* View Session History Button */}
        <button
          onClick={() => {
            soundEffects.playClick();
            navigate('/app/insights');
          }}
          style={{
            width: '100%',
            marginTop: '1rem',
            padding: '0.625rem 1.5rem',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '100px',
            fontSize: '0.8125rem',
            fontWeight: '500',
            color: '#64748b',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#f9fafb';
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.color = '#1a1a1a';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
          }}
        >
          <HiClock style={{ fontSize: '1rem' }} />
          <span>View session history</span>
        </button>
      </div>

      {/* Lesson Preview Modal */}
      {previewLesson && (
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
        }}
        onClick={() => setPreviewLesson(null)}
        >
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewLesson(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                color: '#6b7280',
                cursor: 'pointer',
                padding: '0.25rem',
                lineHeight: 1
              }}
            >
              ×
            </button>

            <h2 style={{ margin: '0 0 1rem', fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', paddingRight: '2rem' }}>
              {previewLesson.title}
            </h2>

            {previewLesson.section && (
              <div style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                marginBottom: '1rem',
                background: previewLesson.section === 'english' ? '#f0f9ff' :
                           previewLesson.section === 'math' ? '#fef2f2' :
                           previewLesson.section === 'reading' ? '#fefce8' :
                           previewLesson.section === 'science' ? '#f0fdf4' : '#f3f4f6',
                color: previewLesson.section === 'english' ? '#0369a1' :
                       previewLesson.section === 'math' ? '#dc2626' :
                       previewLesson.section === 'reading' ? '#ca8a04' :
                       previewLesson.section === 'science' ? '#15803d' : '#6b7280'
              }}>
                {previewLesson.section?.toUpperCase()}
              </div>
            )}

            {previewLesson.status && (
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: previewLesson.status === 'completed' ? '#16a34a' : previewLesson.status === 'in-progress' ? '#f59e0b' : '#94a3b8'
                }} />
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {previewLesson.status === 'completed' ? 'Completed' : previewLesson.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                </span>
              </div>
            )}

            {previewLesson.chapterNum && (
              <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <strong>Chapter:</strong> {previewLesson.chapterNum}
              </p>
            )}

            {previewLesson.duration && (
              <p style={{ margin: '0 0 1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <strong>Duration:</strong> {previewLesson.duration}
              </p>
            )}

            {previewLesson.keyTerms && previewLesson.keyTerms.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Key Concepts:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {previewLesson.keyTerms.map((term, idx) => (
                    <span key={idx} style={{
                      padding: '0.25rem 0.625rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      background: '#f3f4f6',
                      color: '#374151'
                    }}>
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
              <button
                onClick={() => setPreviewLesson(null)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  background: 'white',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPreviewLesson(null);
                  openLesson(previewLesson.id, 'review');
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Start Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsContent;
