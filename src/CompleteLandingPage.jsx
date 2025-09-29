import React, { useState, useEffect, useRef, useCallback } from 'react';

const CompleteLandingPage = () => {
  // State management for all interactive features
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    grade: '',
    score: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentDynamicText, setCurrentDynamicText] = useState(0);
  const [signupCount, setSignupCount] = useState(7567);
  const [currentSignupIndex, setCurrentSignupIndex] = useState(0);
  const [isDemoStarted, setIsDemoStarted] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showLesson, setShowLesson] = useState(false);
  const [isTabHighlighted, setIsTabHighlighted] = useState(false);
  const [teachingStep, setTeachingStep] = useState(0);
  const [showHighlights, setShowHighlights] = useState({});
  const [showPopups, setShowPopups] = useState({});
  const [showSolutionSteps, setShowSolutionSteps] = useState(false);
  const [animatedBars, setAnimatedBars] = useState(false);
  const [isAnswerInput, setIsAnswerInput] = useState(false);

  // Refs for DOM manipulation
  const demoSectionRef = useRef(null);
  const chartContainerRef = useRef(null);
  const sectionsRef = useRef([]);
  const lessonPanelRef = useRef(null);
  const modalRef = useRef(null);

  // Recent signups data for social proof
  const recentSignups = [
    'Sarah from California just joined',
    'Michael from New York just joined',
    'Emma from Texas just joined',
    'David from Florida just joined',
    'Ashley from Illinois just joined',
    'Jordan from Pennsylvania just joined',
    'Madison from Ohio just joined',
    'Tyler from Georgia just joined'
  ];

  // Dynamic texts for hero section - CORRECTED to match HTML
  const dynamicTexts = [
    'Elite Preparation',
    'Expert Personal Tutors',
    'Science-Based Methods',
    'Full-Tailored Courses',
    'Precision Analytics',
    'Diagnostic Test',
    'AI-Powered Learning'
  ];

  // Chart data for all 9 weeks
  const chartData = [
    { week: 1, traditional: 45, launchPrep: 35, tooltip: 'Traditional: 45% vs Launch Prep: 35%' },
    { week: 2, traditional: 60, launchPrep: 40, tooltip: 'Traditional: 60% vs Launch Prep: 40%' },
    { week: 3, traditional: 70, launchPrep: 45, tooltip: 'Traditional: 70% vs Launch Prep: 45%' },
    { week: 4, traditional: 75, launchPrep: 50, tooltip: 'Traditional: 75% vs Launch Prep: 50%' },
    { week: 5, traditional: 78, launchPrep: 65, tooltip: 'Traditional: 78% vs Launch Prep: 65%' },
    { week: 6, traditional: 80, launchPrep: 78, tooltip: 'Traditional: 80% vs Launch Prep: 78%' },
    { week: 7, traditional: 81, launchPrep: 88, tooltip: 'Traditional: 81% vs Launch Prep: 88%' },
    { week: 8, traditional: 82, launchPrep: 95, tooltip: 'Traditional: 82% vs Launch Prep: 95%' },
    { week: 9, traditional: 82, launchPrep: 100, tooltip: 'Traditional: 82% vs Launch Prep: 100%' }
  ];

  // Complete JSS Styles Object - All CSS converted to JavaScript
  const styles = {
    // Global styles and CSS variables
    root: {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
      background: '#000000',
      color: '#ffffff',
      lineHeight: 1.4,
      fontWeight: 400,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      scrollBehavior: 'smooth',
      overflowX: 'hidden',
      maxWidth: '100vw'
    },

    // Header styles
    header: {
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'saturate(180%) blur(30px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 1000,
      padding: '0.6rem 0',
      transition: 'all 0.3s ease'
    },

    nav: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    logo: {
      fontSize: '1.2rem',
      fontWeight: 600,
      color: '#f5f5f7',
      letterSpacing: '-0.01em'
    },

    navLinks: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },

    navLink: {
      color: '#f5f5f7',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: 400,
      transition: 'all 0.3s ease',
      position: 'relative',
      ':hover': {
        color: '#007aff',
        transform: 'translateY(-1px)'
      }
    },

    ctaNav: {
      background: '#007aff',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      border: 'none',
      fontSize: '0.9rem',
      fontWeight: 500,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        background: '#0056cc',
        transform: 'scale(1.05)'
      }
    },

    // Hero Section styles
    hero: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      background: '#000000',
      position: 'relative',
      padding: '2rem',
      opacity: 1,
      transform: 'translateY(0)'
    },

    heroBadge: {
      background: 'transparent',
      border: '1px solid #007aff',
      color: '#007aff',
      padding: '0.5rem 1.2rem',
      borderRadius: '24px',
      fontWeight: 400,
      fontSize: '0.8rem',
      marginBottom: '2rem',
      animation: 'fadeInUp 0.8s ease 0.2s both'
    },

    // Spinning Light Animation
    spinningLight: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
      animation: 'rotate 15s linear infinite',
      transformOrigin: '50% 50%'
    },


    // Dynamic text styles
    dynamicText: {
      display: 'inline-block',
      color: 'rgba(255, 255, 255, 0.8) !important',
      fontWeight: '400 !important',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 1,
      transform: 'translateY(0px)'
    },

    dynamicTextFadeOut: {
      opacity: 0,
      transform: 'translateY(-20px)'
    },

    dynamicTextFadeIn: {
      opacity: 0,
      transform: 'translateY(20px)'
    },

    heroTitle: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
      fontSize: '3.5rem',
      fontWeight: 600,
      lineHeight: 1.05,
      marginBottom: '1rem',
      letterSpacing: '-0.025em',
      animation: 'fadeInUp 0.8s ease 0.4s both',
      position: 'relative',
      zIndex: 1,
      color: '#ffffff'
    },

    heroSubtitle: {
      fontSize: '1.1rem',
      color: '#a1a1a6',
      maxWidth: '560px',
      margin: '0 auto 1.5rem',
      lineHeight: 1.5,
      animation: 'fadeInUp 0.8s ease 0.6s both',
      fontWeight: 400
    },

    guaranteeText: {
      fontSize: '1.1rem',
      color: '#ffffff',
      maxWidth: '600px',
      margin: '0 auto 3rem',
      lineHeight: 1.5,
      animation: 'fadeInUp 0.8s ease 0.8s both',
      fontWeight: 500,
      textAlign: 'center'
    },

    heroCta: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      alignItems: 'center',
      animation: 'fadeInUp 0.8s ease 0.8s both',
      marginBottom: '0.3rem'
    },

    btnPrimary: {
      background: '#007aff',
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: 500,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
      padding: '1.5rem 2.5rem',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      textDecoration: 'none',
      textAlign: 'center',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      height: '48px',
      width: '160px',
      whiteSpace: 'nowrap',
      ':hover': {
        background: '#0056cc'
      }
    },

    btnSecondary: {
      background: 'rgba(255, 255, 255, 0.08)',
      color: '#ffffff',
      fontSize: '1rem',
      fontWeight: 500,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
      padding: '0.8rem 1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(20px)',
      textDecoration: 'none',
      textAlign: 'center',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      height: '48px',
      width: '160px',
      whiteSpace: 'nowrap',
      ':hover': {
        background: 'rgba(255, 255, 255, 0.12)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)'
      }
    },

    // Social Proof styles
    socialProof: {
      marginTop: '3rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      animation: 'fadeInUp 0.8s ease 1.2s both'
    },

    recentSignup: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      color: '#a1a1a6',
      background: 'rgba(255, 255, 255, 0.05)',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'opacity 0.3s ease-in-out',
      opacity: 1
    },

    signupDot: {
      width: '8px',
      height: '8px',
      background: '#34c759',
      borderRadius: '50%',
      animation: 'pulse 2s ease-in-out infinite'
    },

    totalSignups: {
      fontSize: '0.85rem',
      color: '#6e6e73',
      fontWeight: 500
    },

    waitlistOffer: {
      textAlign: 'center',
      marginTop: '0.2rem',
      opacity: 0,
      animation: 'fadeInUp 0.8s ease 1s both'
    },

    offerText: {
      fontSize: '0.8rem',
      color: '#a1a1a6',
      margin: 0
    },

    freeHighlight: {
      color: '#6e6e73',
      fontWeight: 500
    },

    strikethrough: {
      textDecoration: 'line-through',
      color: '#6e6e73'
    },

    // Timeline Section styles
    timelineSection: {
      background: '#ffffff',
      padding: '4rem 2rem',
      minHeight: '400px',
      display: 'block',
      visibility: 'visible',
      opacity: 1
    },

    timelineContainer: {
      maxWidth: '1000px',
      margin: '0 auto'
    },

    timelineHeader: {
      textAlign: 'center',
      marginBottom: '3rem'
    },

    timelineTitle: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: 600,
      color: '#1d1d1f',
      marginBottom: '1rem',
      letterSpacing: '-0.02em'
    },

    timelineDescription: {
      fontSize: '1.1rem',
      color: '#6e6e73',
      lineHeight: 1.6
    },

    journeyLayout: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center'
    },

    journeyExplanation: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },

    explanationItem: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
      textAlign: 'left'
    },

    explanationNumber: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: '#007aff',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: '0.9rem',
      flexShrink: 0
    },

    explanationContent: {
      flex: 1
    },

    explanationContentH3: {
      fontSize: '1.2rem',
      fontWeight: 600,
      color: '#1d1d1f',
      marginBottom: '0.5rem',
      lineHeight: 1.3
    },

    explanationContentP: {
      fontSize: '0.95rem',
      color: '#6e6e73',
      lineHeight: 1.5,
      margin: 0
    },

    staircaseVisual: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    staircaseTimeline: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      transform: 'rotate(-5deg)'
    },

    step: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      transition: 'all 0.3s ease'
    },

    stepBlock: {
      background: 'linear-gradient(135deg, #007aff, #0056cc)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 122, 255, 0.3)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      ':hover': {
        transform: 'scale(1.05) translateY(-2px)',
        boxShadow: '0 8px 30px rgba(0, 122, 255, 0.4)',
        borderColor: '#007aff',
        background: 'rgba(0, 122, 255, 0.05)'
      }
    },

    // Progressive step sizing - CORRECTED to match HTML
    step0Block: {
      width: '70px',
      height: '40px'
    },

    step1Block: {
      width: '80px',
      height: '60px'
    },

    step2Block: {
      width: '90px',
      height: '80px'
    },

    step3Block: {
      width: '100px',
      height: '100px'
    },

    stepLabel: {
      fontSize: '0.85rem',
      fontWeight: 600,
      color: '#1d1d1f',
      marginBottom: '0.25rem',
      lineHeight: 1.2
    },

    stepSubtitle: {
      fontSize: '0.75rem',
      color: '#6e6e73',
      fontWeight: 500
    },

    // Features Section styles
    featuresSection: {
      padding: '6rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },

    sectionHeader: {
      textAlign: 'center',
      marginBottom: '4rem'
    },

    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#ffffff',
      marginBottom: '1rem',
      lineHeight: 1.2
    },

    sectionSubtitle: {
      fontSize: '1.1rem',
      color: '#86868b',
      lineHeight: 1.5,
      maxWidth: '800px',
      margin: '0 auto'
    },

    scienceContainer: {
      maxWidth: '900px',
      margin: '0 auto'
    },

    comparisonGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      marginBottom: '3rem'
    },

    methodCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '2rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      ':hover': {
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
      }
    },

    methodHeader: {
      marginBottom: '1.5rem'
    },

    methodTitle: {
      fontSize: '1.3rem',
      fontWeight: 600,
      color: '#ffffff',
      marginBottom: '0.5rem'
    },

    methodProcess: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      marginBottom: '1rem',
      flexWrap: 'wrap'
    },

    processStep: {
      background: 'rgba(0, 122, 255, 0.1)',
      color: '#007aff',
      padding: '0.5rem 0.8rem',
      borderRadius: '8px',
      fontSize: '0.85rem',
      fontWeight: 500,
      whiteSpace: 'nowrap'
    },

    processArrow: {
      color: '#6e6e73',
      fontSize: '1rem',
      fontWeight: 500
    },

    methodResult: {
      fontSize: '0.95rem',
      color: '#86868b',
      lineHeight: 1.5,
      margin: 0
    },

    methodTraditional: {
      borderColor: 'rgba(255, 59, 48, 0.3)',
      position: 'relative'
    },

    methodLaunch: {
      borderColor: 'rgba(0, 122, 255, 0.5)',
      background: 'rgba(0, 122, 255, 0.08)',
      border: '3px solid #007aff',
      position: 'relative'
    },

    // Pseudo-element styles for method cards
    methodTraditionalIcon: {
      position: 'absolute',
      top: '1.5rem',
      right: '1.5rem',
      fontSize: '1.8rem',
      opacity: 0.9
    },

    methodLaunchIcon: {
      position: 'absolute',
      top: '1.5rem',
      right: '1.5rem',
      fontSize: '1.8rem',
      opacity: 1,
      color: '#ffffff',
      fontWeight: 800,
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },

    scienceInsight: {
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      border: '1px solid rgba(0, 122, 255, 0.1)',
      borderRadius: '12px',
      padding: '1.5rem',
      marginTop: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      boxShadow: '0 4px 16px rgba(0, 122, 255, 0.08)',
      position: 'relative',
      overflow: 'hidden'
    },

    scienceInsightBefore: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(0, 122, 255, 0.3), transparent)',
      opacity: 0.8
    },

    insightText: {
      fontSize: '1rem',
      color: '#1d1d1f',
      lineHeight: 1.5,
      margin: 0,
      textAlign: 'center'
    },

    // Learning Progress Section styles
    learningProgressSection: {
      padding: '6rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },

    progressContainer: {
      maxWidth: '1000px',
      margin: '0 auto'
    },

    progressChartContainer: {
      marginBottom: '3rem'
    },

    chartTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: '2rem'
    },

    chartLegend: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginBottom: '2rem'
    },

    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },

    legendColor: {
      width: '20px',
      height: '20px',
      borderRadius: '4px'
    },

    legendLabel: {
      fontSize: '0.9rem',
      color: '#6e6e73',
      fontWeight: 500
    },

    chartWrapper: {
      position: 'relative'
    },

    chartGraph: {
      position: 'relative',
      height: '300px',
      display: 'flex',
      alignItems: 'flex-end',
      gap: '0.5rem',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '12px',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },

    yAxis: {
      position: 'absolute',
      left: '0.5rem',
      top: '0.5rem',
      bottom: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '40px'
    },

    yLabel: {
      fontSize: '0.8rem',
      color: '#6e6e73',
      textAlign: 'right'
    },

    chartContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '0.8rem',
      height: '240px',
      marginLeft: '60px',
      flex: 1
    },

    weekColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'scale(1.05)'
      }
    },

    weekBars: {
      display: 'flex',
      gap: '4px',
      marginBottom: '0.5rem',
      height: '200px',
      alignItems: 'flex-end'
    },

    bar: {
      width: '20px',
      borderRadius: '4px 4px 0 0',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      ':hover': {
        transform: 'scaleY(1.1)',
        filter: 'brightness(1.1)'
      }
    },

    traditionalBar: {
      background: '#d1d5db',
      height: '0px' // Will be animated
    },

    launchPrepBar: {
      background: '#007aff',
      height: '0px' // Will be animated
    },

    weekLabel: {
      fontSize: '0.8rem',
      color: '#6e6e73',
      fontWeight: 500,
      textAlign: 'center',
      opacity: 0,
      transform: 'translateY(10px)',
      transition: 'all 0.3s ease'
    },

    progressSummary: {
      textAlign: 'center',
      marginBottom: '3rem'
    },

    summaryTitle: {
      fontSize: '1.8rem',
      marginBottom: '0.5rem',
      lineHeight: 1.2,
      fontWeight: 700,
      color: '#ffffff'
    },

    summaryText: {
      fontSize: '1rem',
      color: '#86868b',
      margin: 0,
      lineHeight: 1.4
    },

    progressExplanation: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },

    explanationPoint: {
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      borderRadius: '12px',
      padding: '1rem',
      ':hover': {
        background: 'rgba(0, 122, 255, 0.05)',
        transform: 'translateY(-2px)'
      }
    },

    pointNumber: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: '#007aff',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem',
      fontWeight: 600,
      marginBottom: '0.8rem'
    },

    pointContent: {},

    pointContentH4: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#ffffff',
      marginBottom: '0.5rem'
    },

    pointContentP: {
      fontSize: '0.9rem',
      color: '#86868b',
      lineHeight: 1.5,
      margin: 0
    },

    // Demo Section styles - CORRECTED to match HTML
    demoSection: {
      padding: '6rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      background: '#000000' // CRITICAL: Missing black background
    },

    demoContainer: {
      maxWidth: '900px',
      margin: '0 auto'
    },

    demoShowcase: {
      textAlign: 'center'
    },

    demoHeader: {
      marginBottom: '3rem'
    },

    demoHeaderDiv: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      marginBottom: '0.5rem',
      justifyContent: 'center'
    },

    newBadge: {
      background: 'linear-gradient(135deg, #ff6b35, #ff8e00)',
      color: 'white',
      padding: '0.3rem 0.8rem',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    demoScreen: {
      position: 'relative',
      overflow: 'hidden',
      minHeight: '280px' // CORRECTED: Should be minHeight 280px not height 600px
      // REMOVED: Unnecessary background, border, border-radius for 1:1 parity
    },

    demoContent: {
      position: 'relative',
      width: '100%',
      height: '100%'
    },

    demoInterface: {
      position: 'relative',
      width: '100%',
      maxWidth: '900px',
      height: '550px', // CORRECTED: Should be 550px to match HTML exactly
      background: 'white',
      borderRadius: '0',
      overflow: 'hidden',
      boxShadow: 'none',
      display: 'flex',
      opacity: '0', // ADDED: Initial opacity 0 to match HTML
      animation: 'slideInUp 1s ease 0.5s forwards', // ADDED: slideInUp animation to match HTML
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      ':hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
      }
    },

    // Dashboard Interface styles
    dashboardInterface: {
      width: '100%',
      height: '100%',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transition: 'all 0.6s ease'
    },

    appHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      borderBottom: '1px solid #e5e5e7',
      background: '#fafafa'
    },

    appLogo: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#007aff'
    },

    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },

    userAvatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: '#007aff',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem',
      fontWeight: 600
    },

    navTabs: {
      display: 'flex',
      background: '#f8f9fa',
      borderBottom: '1px solid #e5e5e7'
    },

    navTab: {
      flex: 1,
      padding: '0.8rem 1rem',
      textAlign: 'center',
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#6e6e73',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderBottom: '3px solid transparent'
    },

    navTabActive: {
      color: '#007aff',
      borderBottomColor: '#007aff',
      background: '#ffffff'
    },

    navTabHighlight: {
      background: 'rgba(0, 122, 255, 0.1)',
      color: '#007aff',
      animation: 'pulse-tab 1s ease-in-out infinite'
    },

    dashboardContent: {
      padding: '2rem',
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },

    dashboardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.8rem',
      maxWidth: '450px',
      margin: '0 auto'
    },

    dashboardCard: {
      background: '#f8f9fa',
      border: '1px solid #e5e5e7',
      borderRadius: '8px',
      padding: '1rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease'
    },

    cardMetric: {
      fontSize: '1.8rem',
      color: '#007aff',
      fontWeight: 600
    },

    cardTitle: {
      marginTop: '0.3rem',
      fontSize: '0.8rem',
      color: '#6e6e73'
    },

    weakAreaCard: {
      border: '1px solid #ff9500',
      background: '#ffffff'
    },

    actionButton: {
      cursor: 'pointer',
      background: '#007aff',
      color: 'white',
      border: 'none',
      padding: '0.8rem',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease',
      ':hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)'
      }
    },

    // Lesson Panel styles - CORRECTED transform value
    lessonPanel: {
      display: 'none',
      opacity: 0,
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      background: 'white',
      flexDirection: 'column',
      transform: 'translateX(0)', // CORRECTED: Should be 0 not 20px initially
      transition: 'all 0.6s ease'
    },

    lessonHeader: {
      background: 'linear-gradient(135deg, #007aff, #0056cc)',
      color: 'white',
      padding: '1rem 1.5rem',
      fontSize: '1rem',
      fontWeight: 600
    },

    lessonContent: {
      padding: '2rem',
      flex: 1,
      overflow: 'auto'
    },

    problemTitle: {
      fontSize: '1.2rem',
      fontWeight: 600,
      color: '#1d1d1f',
      marginBottom: '1rem',
      textAlign: 'center'
    },

    mathProblem: {
      textAlign: 'center',
      marginBottom: '2rem'
    },

    mathEquation: {
      position: 'relative',
      fontSize: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '0.5rem 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '40px'
    },

    equationTerm: {
      position: 'relative',
      padding: '4px',
      background: 'transparent',
      transition: 'all 0.3s ease'
    },

    answerSection: {
      margin: '2rem 0',
      textAlign: 'center'
    },

    answerInput: {
      width: '280px',
      padding: '0.8rem 1rem',
      border: '2px solid #e5e5e7',
      borderRadius: '12px',
      fontSize: '1rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      background: '#fafafa'
    },

    helpButton: {
      background: 'transparent',
      color: '#a1a1a6',
      border: '1px solid #e5e5e7',
      padding: '0.4rem 0.8rem',
      borderRadius: '6px',
      fontSize: '0.8rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      opacity: 0.7,
      ':hover': {
        opacity: 1,
        color: '#6e6e73'
      }
    },

    solutionSteps: {
      opacity: 0,
      transition: 'opacity 0.3s ease'
    },

    step: {
      opacity: 0,
      padding: '0.8rem',
      margin: '0.5rem 0',
      background: 'rgba(0, 122, 255, 0.05)',
      borderRadius: '8px',
      fontSize: '0.9rem',
      color: '#1d1d1f',
      transition: 'opacity 0.5s ease'
    },

    stepNumber: {
      fontWeight: 600,
      color: '#007aff'
    },

    stepHighlight: {
      background: 'rgba(0, 122, 255, 0.1)',
      padding: '0.2rem 0.4rem',
      borderRadius: '4px',
      fontWeight: 600
    },

    // Chat Panel styles - CORRECTED positioning and dimensions
    chatPanel: {
      position: 'absolute',
      bottom: '1rem',
      right: '1rem',
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #007aff, #0056cc)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 20px rgba(0, 122, 255, 0.4)',
      zIndex: 10
    },

    chatPanelExpanded: {
      width: '320px',
      height: '400px', // CORRECTED: Should be 400px not 320px
      borderRadius: '20px', // CORRECTED: Should be 20px not 16px
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start'
    },

    chatToggle: {
      fontSize: '1.5rem',
      transition: 'all 0.3s ease'
    },

    chatHeader: {
      padding: '1rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      fontWeight: 600,
      fontSize: '0.9rem',
      display: 'none'
    },

    chatMessages: {
      flex: 1,
      padding: '1rem',
      overflow: 'auto',
      display: 'none',
      flexDirection: 'column',
      gap: '0.8rem'
    },

    message: {
      padding: '0.8rem 1rem',
      borderRadius: '12px',
      fontSize: '0.8rem',
      lineHeight: 1.4,
      opacity: 0,
      transform: 'translateY(10px)',
      animation: 'none'
    },

    userMessage: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      alignSelf: 'flex-end',
      maxWidth: '80%'
    },

    aiMessage: {
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#1d1d1f',
      alignSelf: 'flex-start',
      maxWidth: '80%'
    },

    demoStatus: {
      position: 'absolute',
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      backdropFilter: 'blur(10px)'
    },

    // Stats Section styles
    statsSection: {
      padding: '6rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },

    goalsContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center'
    },

    goalsTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#ffffff',
      marginBottom: '3rem',
      lineHeight: 1.2
    },

    goalsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '2rem'
    },

    goalItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      ':hover': {
        transform: 'translateY(-4px)',
        background: 'rgba(255, 255, 255, 0.08)',
        borderColor: 'rgba(0, 122, 255, 0.3)'
      }
    },

    goalNumber: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#007aff',
      marginBottom: '0.5rem',
      lineHeight: 1
    },

    goalLabel: {
      fontSize: '0.9rem',
      color: '#86868b',
      fontWeight: 500,
      textAlign: 'center'
    },

    // Universities Section styles
    universitiesSection: {
      padding: '6rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },

    universitiesShowcase: {
      maxWidth: '800px',
      margin: '0 auto'
    },

    universityCarousel: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap'
    },

    universityVisualCard: {
      background: 'linear-gradient(135deg, #007aff, #0056cc)',
      color: 'white',
      padding: '2rem',
      borderRadius: '16px',
      textAlign: 'center',
      minWidth: '150px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      boxShadow: '0 8px 32px rgba(0, 122, 255, 0.3)',
      ':hover': {
        transform: 'scale(1.05) rotate(2deg)',
        boxShadow: '0 15px 30px rgba(0, 122, 255, 0.2)'
      }
    },

    universityVisualName: {
      fontSize: '1.2rem',
      fontWeight: 600,
      marginBottom: '0.5rem'
    },

    universityVisualBadge: {
      fontSize: '0.8rem',
      opacity: 0.9,
      background: 'rgba(255, 255, 255, 0.2)',
      padding: '0.3rem 0.6rem',
      borderRadius: '12px'
    },

    // CTA Section styles
    ctaSection: {
      padding: '6rem 2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #000000, #1a1a1a)',
      marginTop: '4rem',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },

    ctaContent: {
      maxWidth: '600px',
      margin: '0 auto'
    },

    ctaTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#ffffff',
      marginBottom: '1rem',
      lineHeight: 1.2
    },

    ctaSubtitle: {
      fontSize: '1.1rem',
      color: '#86868b',
      marginBottom: '2rem',
      lineHeight: 1.5
    },

    ctaSpecial: {
      background: '#007aff',
      color: 'white',
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      fontWeight: 600,
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        background: '#0056cc',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 32px rgba(0, 122, 255, 0.4)'
      }
    },

    // Footer styles
    footer: {
      textAlign: 'center',
      padding: '2rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#6e6e73',
      fontSize: '0.9rem'
    },

    // Modal styles
    modal: {
      display: 'none',
      position: 'fixed',
      zIndex: 2000,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backdropFilter: 'blur(0px)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    },

    modalShow: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(20px)'
    },

    modalContent: {
      background: '#ffffff',
      margin: '5% auto',
      padding: '3rem 2.5rem',
      borderRadius: '20px',
      width: '90%',
      maxWidth: '500px',
      position: 'relative',
      transform: 'scale(0.9) translateY(50px)',
      opacity: 0,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
    },

    modalContentShow: {
      transform: 'scale(1) translateY(0)',
      opacity: 1
    },

    modalTitle: {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#1d1d1f',
      marginBottom: '0.5rem',
      textAlign: 'center'
    },

    modalSubtitle: {
      fontSize: '1rem',
      color: '#6e6e73',
      marginBottom: '2rem',
      textAlign: 'center',
      lineHeight: 1.5
    },

    close: {
      position: 'absolute',
      top: '1.2rem',
      right: '1.8rem',
      fontSize: '1.3rem',
      cursor: 'pointer',
      color: '#a1a1a6',
      transition: 'color 0.2s ease',
      ':hover': {
        color: '#6e6e73'
      }
    },

    formGroup: {
      marginBottom: '1.5rem'
    },

    formInput: {
      width: '100%',
      padding: '0.8rem 1rem',
      border: '2px solid #e5e5e7',
      borderRadius: '12px',
      fontSize: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      ':focus': {
        outline: 'none',
        borderColor: '#007aff',
        boxShadow: '0 0 0 3px rgba(0, 122, 255, 0.1)'
      }
    },

    formSubmit: {
      width: '100%',
      marginTop: '1rem',
      background: '#007aff',
      color: 'white',
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      fontWeight: 600,
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        background: '#0056cc',
        transform: 'translateY(-1px)'
      }
    },

    successMessage: {
      display: 'none',
      background: '#34c759',
      color: 'white',
      padding: '2rem',
      borderRadius: '12px',
      textAlign: 'center',
      marginTop: '2rem',
      fontSize: '1rem',
      lineHeight: 1.5
    },

    // Animation classes
    fadeIn: {
      opacity: '1 !important',
      transform: 'translateY(0) !important'
    },

    scrollInView: {},

    animate: {
      opacity: '1 !important',
      transform: 'translateY(0) !important'
    },

    hidden: {
      opacity: 0,
      transform: 'translateX(-100%)'
    },

    // Responsive design
    '@media (max-width: 768px)': {
      journeyLayout: {
        gridTemplateColumns: '1fr',
        gap: '2rem'
      },
      comparisonGrid: {
        gridTemplateColumns: '1fr'
      },
      heroTitle: {
        fontSize: '2.5rem'
      },
      sectionTitle: {
        fontSize: '2rem'
      },
      heroCta: {
        flexDirection: 'column',
        gap: '0.8rem'
      },
      navLinks: {
        display: 'none'
      }
    }
  };

  // Event handlers
  const openModal = useCallback(() => {
    setIsModalOpen(true);
    const modal = modalRef.current;
    if (modal) {
      modal.style.display = 'block';
      // Trigger reflow
      // eslint-disable-next-line no-unused-expressions
      modal.offsetHeight;
      // Add show class
      requestAnimationFrame(() => {
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modal.style.backdropFilter = 'blur(20px)';
        const content = modal.querySelector('.modal-content');
        if (content) {
          content.style.transform = 'scale(1) translateY(0)';
          content.style.opacity = '1';
        }
      });
    }
  }, []);

  const closeModal = useCallback(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      modal.style.backdropFilter = 'blur(0px)';
      const content = modal.querySelector('.modal-content');
      if (content) {
        content.style.transform = 'scale(0.9) translateY(50px)';
        content.style.opacity = '0';
      }
      setTimeout(() => {
        modal.style.display = 'none';
        setIsModalOpen(false);
        setShowSuccessMessage(false);
      }, 400);
    }
  }, []);

  const handleNavClick = useCallback((e, target) => {
    e.preventDefault();
    const targetElement = document.querySelector(target);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.school || !formData.grade) {
      alert('Please fill in all required fields');
      return;
    }

    const submissionData = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    const existingData = JSON.parse(localStorage.getItem('launchPrepApplications') || '[]');
    existingData.push(submissionData);
    localStorage.setItem('launchPrepApplications', JSON.stringify(existingData));

    setShowSuccessMessage(true);

    setTimeout(() => {
      closeModal();
      setFormData({
        name: '',
        email: '',
        phone: '',
        school: '',
        grade: '',
        score: ''
      });
      setShowSuccessMessage(false);
    }, 3000);
  }, [formData, closeModal]);

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }, []);

  // Dynamic text rotation - CORRECTED timing to match HTML (3750ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDynamicText((prev) => (prev + 1) % dynamicTexts.length);
    }, 3750);

    return () => clearInterval(interval);
  }, []);

  // Social proof rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSignupIndex((prev) => (prev + 1) % recentSignups.length);
      setSignupCount((prev) => prev + 1);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Demo intersection observer
  useEffect(() => {
    const demoSection = demoSectionRef.current;
    if (!demoSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isDemoStarted) {
            setIsDemoStarted(true);

            // Start demo after a short delay
            setTimeout(() => {
              startDashboardDemo();
            }, 500);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(demoSection);

    return () => observer.disconnect();
  }, [isDemoStarted]);

  // Section fade-in animations
  useEffect(() => {
    const sections = document.querySelectorAll('section:not(.hero)');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Chart animation
  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (!chartContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedBars) {
            setAnimatedBars(true);

            // Animate bars
            const bars = entry.target.querySelectorAll('.bar');
            const weekLabels = entry.target.querySelectorAll('.week-label');

            bars.forEach((bar, index) => {
              setTimeout(() => {
                const height = bar.getAttribute('data-height');
                if (height) {
                  bar.style.height = (height * 2.0) + 'px';
                }
              }, 800 + (index * 150));
            });

            // Animate week labels
            weekLabels.forEach((label, index) => {
              setTimeout(() => {
                label.style.opacity = '1';
                label.style.transform = 'translateY(0)';
              }, 1200 + (index * 100));
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(chartContainer);

    return () => observer.disconnect();
  }, [animatedBars]);

  // Demo functions
  const startDashboardDemo = useCallback(() => {
    // Highlight Math Practice tab after 1.5 seconds
    setTimeout(() => {
      setIsTabHighlighted(true);
    }, 1500);

    // Click Math Practice tab after 2 seconds
    setTimeout(() => {
      clickMathPracticeTab();
    }, 2000);
  }, []);

  const clickMathPracticeTab = useCallback(() => {
    setIsTabHighlighted(false);

    // Add clicking animation
    setTimeout(() => {
      transitionToLesson();
    }, 300);
  }, []);

  const transitionToLesson = useCallback(() => {
    // Hide dashboard
    setShowDashboard(false);

    // Show lesson panel after dashboard transitions out
    setTimeout(() => {
      setShowLesson(true);

      // Start AI demo after lesson panel is visible
      setTimeout(() => {
        startAIDemo();
      }, 500);
    }, 600);
  }, []);

  const startAIDemo = useCallback(() => {
    // Expand chat after 300ms
    setTimeout(() => {
      setIsChatExpanded(true);

      // Start teaching sequence after messages are shown - CORRECTED timing to match HTML
      const messagesLength = 4; // Number of chat messages displayed
      setTimeout(() => {
        startTeachingSequence();
      }, messagesLength * 600 + 200); // HTML formula: messages.length * 600 + 200
    }, 300);
  }, []);

  const startTeachingSequence = useCallback(() => {
    // Step 1: Highlight x² term
    setTimeout(() => {
      setShowHighlights({ term1: true });
      setShowPopups({ popup1: true });
    }, 500);

    // Step 2: Highlight 6x term
    setTimeout(() => {
      setShowHighlights({ term1: true, term2: true });
      setShowPopups({ popup1: true, popup2: true });
    }, 2000);

    // Step 3: Highlight constant term
    setTimeout(() => {
      setShowHighlights({ term1: true, term2: true, term3: true });
      setShowPopups({ popup1: true, popup2: true, popup3: true });
    }, 3500);

    // Step 4: Show solution steps
    setTimeout(() => {
      setShowSolutionSteps(true);
      setTeachingStep(1);
    }, 5000);

    setTimeout(() => {
      setTeachingStep(2);
    }, 6500);

    setTimeout(() => {
      setTeachingStep(3);
    }, 8000);
  }, []);

  const toggleChat = useCallback(() => {
    setIsChatExpanded(prev => !prev);
  }, []);

  const askForHelp = useCallback(() => {
    if (!isChatExpanded) {
      setIsChatExpanded(true);
    }
    startTeachingSequence();
  }, [isChatExpanded, startTeachingSequence]);

  const checkAnswer = useCallback(() => {
    // Simple answer checking - in real app this would be more sophisticated
    setShowSolutionSteps(true);
    startTeachingSequence();
  }, [startTeachingSequence]);

  // Modal click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && event.target === modalRef.current) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div style={styles.root}>
      {/* Header */}
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logo}>Launch Prep</div>
          <ul style={styles.navLinks}>
            <li>
              <a
                href="#features"
                className="nav-link"
                style={styles.navLink}
                onClick={(e) => handleNavClick(e, '#features')}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#demo"
                className="nav-link"
                style={styles.navLink}
                onClick={(e) => handleNavClick(e, '#demo')}
              >
                Demo
              </a>
            </li>
            <li>
              <a
                href="#stats"
                className="nav-link"
                style={styles.navLink}
                onClick={(e) => handleNavClick(e, '#stats')}
              >
                Results
              </a>
            </li>
            <li>
              <a
                href="#universities"
                className="nav-link"
                style={styles.navLink}
                onClick={(e) => handleNavClick(e, '#universities')}
              >
                Team
              </a>
            </li>
          </ul>
          <button style={styles.ctaNav} onClick={openModal}>
            Join Waitlist
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" style={styles.hero}>
        {/* Spinning Light Animation */}
        <div style={styles.spinningLight}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200%',
            height: '200%',
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              transparent 30deg,
              rgba(255, 165, 0, 0.05) 40deg,
              rgba(255, 180, 30, 0.12) 50deg,
              rgba(255, 195, 60, 0.18) 60deg,
              rgba(255, 210, 90, 0.22) 70deg,
              rgba(255, 220, 100, 0.25) 80deg,
              rgba(255, 210, 90, 0.22) 90deg,
              rgba(255, 195, 60, 0.18) 100deg,
              rgba(255, 180, 30, 0.12) 110deg,
              rgba(255, 165, 0, 0.05) 120deg,
              transparent 130deg,
              transparent 360deg
            )`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            filter: 'blur(2px)'
          }}></div>
        </div>

        <div style={styles.heroBadge}>
          Coming Soon • Early December
        </div>
        <h1 style={styles.heroTitle}>
          <span style={{ fontWeight: 700, color: 'white' }}>Master the ACT with</span>
          <br />
          <span
            style={{
              ...styles.dynamicText,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.8)'
            }}
          >
            {dynamicTexts[currentDynamicText]}
          </span>
        </h1>
        <p style={styles.guaranteeText}>
          Guaranteed 35+ ACT score or your money back.*
        </p>
        <div style={styles.heroCta}>
          <button style={styles.btnPrimary} onClick={openModal}>
            Join Waitlist
          </button>
          <a href="#demo" style={styles.btnSecondary} onClick={(e) => handleNavClick(e, '#demo')}>
            Watch Demo
          </a>
        </div>
        <div style={styles.waitlistOffer}>
          <p style={styles.offerText}>
            Waitlist gets full access for <span style={styles.freeHighlight}>FREE</span> • Normally <span style={styles.strikethrough}>$999</span>
          </p>
        </div>

        {/* Social Proof */}
        <div style={styles.socialProof}>
          <div style={styles.recentSignup}>
            <span style={styles.signupDot}></span>
            <span className="signup-text">
              {recentSignups[currentSignupIndex]}
            </span>
          </div>
          <div style={styles.totalSignups}>
            <span style={{ color: '#007aff', fontWeight: 600 }}>{signupCount.toLocaleString()}</span> students on waitlist
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section" style={styles.timelineSection}>
        <div style={styles.timelineContainer}>
          <div style={styles.timelineHeader}>
            <h2 style={styles.timelineTitle}>Your Learning Journey</h2>
            <p style={styles.timelineDescription}>
              Four progressive steps designed to take you from baseline to perfect score
            </p>
          </div>

          <div style={styles.journeyLayout}>
            <div style={styles.journeyExplanation}>
              <div style={styles.explanationItem}>
                <div style={styles.explanationNumber}>1</div>
                <div style={styles.explanationContent}>
                  <h3 style={styles.explanationContentH3}>Comprehensive Diagnostic</h3>
                  <p style={styles.explanationContentP}>
                    Full-length practice test to identify your specific strengths and knowledge gaps across all ACT sections.
                  </p>
                </div>
              </div>

              <div style={styles.explanationItem}>
                <div style={styles.explanationNumber}>2</div>
                <div style={styles.explanationContent}>
                  <h3 style={styles.explanationContentH3}>Foundation Building</h3>
                  <p style={styles.explanationContentP}>
                    Targeted lessons addressing your weak areas while reinforcing core concepts and test-taking strategies.
                  </p>
                </div>
              </div>

              <div style={styles.explanationItem}>
                <div style={styles.explanationNumber}>3</div>
                <div style={styles.explanationContent}>
                  <h3 style={styles.explanationContentH3}>Advanced Application</h3>
                  <p style={styles.explanationContentP}>
                    Practice with increasingly difficult problems, timing strategies, and section-specific optimization techniques.
                  </p>
                </div>
              </div>

              <div style={styles.explanationItem}>
                <div style={styles.explanationNumber}>4</div>
                <div style={styles.explanationContent}>
                  <h3 style={styles.explanationContentH3}>Score Mastery</h3>
                  <p style={styles.explanationContentP}>
                    Final preparation with full practice tests, review sessions, and confidence-building exercises.
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.staircaseVisual}>
              <div style={styles.staircaseTimeline}>
                <div className="step step-0" style={styles.step}>
                  <div style={{ ...styles.stepBlock, ...styles.step0Block }}>
                    <div style={styles.stepLabel}>Start</div>
                    <div style={styles.stepSubtitle}>Baseline</div>
                  </div>
                </div>

                <div className="step step-1" style={styles.step}>
                  <div style={{ ...styles.stepBlock, ...styles.step1Block }}>
                    <div style={styles.stepLabel}>Build</div>
                    <div style={styles.stepSubtitle}>Foundation</div>
                  </div>
                </div>

                <div className="step step-2" style={styles.step}>
                  <div style={{ ...styles.stepBlock, ...styles.step2Block }}>
                    <div style={styles.stepLabel}>Apply</div>
                    <div style={styles.stepSubtitle}>Skills</div>
                  </div>
                </div>

                <div className="step step-3" style={styles.step}>
                  <div style={{ ...styles.stepBlock, ...styles.step3Block }}>
                    <div style={styles.stepLabel}>Master</div>
                    <div style={styles.stepSubtitle}>Perfect Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section" style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Innovative Learning Architecture</h2>
          <p style={styles.sectionSubtitle}>
            Revolutionary methodology that builds complete mastery while competitors focus on isolated problem-solving.
          </p>
        </div>

        <div style={styles.scienceContainer}>
          <div style={styles.comparisonGrid}>
            <div className="method-traditional" style={{ ...styles.methodCard, ...styles.methodTraditional }}>
              {/* Warning icon for traditional method */}
              <div style={styles.methodTraditionalIcon}>⚠️</div>
              <div style={styles.methodHeader}>
                <h3 style={styles.methodTitle}>Most Courses</h3>
              </div>
              <div style={styles.methodProcess}>
                <div style={styles.processStep}>Test</div>
                <div style={styles.processArrow}>→</div>
                <div style={styles.processStep}>Fix mistakes</div>
                <div style={styles.processArrow}>→</div>
                <div style={styles.processStep}>Plateau at 80%</div>
              </div>
              <p style={styles.methodResult}>Gaps remain, can't reach perfection</p>
            </div>

            <div className="method-launch" style={{ ...styles.methodCard, ...styles.methodLaunch }}>
              {/* Checkmark icon for Launch Prep method */}
              <div style={styles.methodLaunchIcon}>✓</div>
              <div style={styles.methodHeader}>
                <h3 style={styles.methodTitle}>Launch Prep</h3>
              </div>
              <div style={styles.methodProcess}>
                <div style={styles.processStep}>Build foundation</div>
                <div style={styles.processArrow}>→</div>
                <div style={styles.processStep}>Fill gaps</div>
                <div style={styles.processArrow}>→</div>
                <div style={styles.processStep}>Reach 100%</div>
              </div>
              <p style={styles.methodResult}>Complete mastery through foundations</p>
            </div>
          </div>

          {/* Bottom insight section - CORRECTED */}
          <div style={styles.scienceInsight}>
            <div style={styles.scienceInsightBefore}></div>
            <p style={styles.insightText}>
              <strong>Bottom-up learning beats top-down 23% of the time.</strong>
              We build foundations first instead of rushing to practice tests.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Progress Section */}
      <section className="learning-progress-section" style={styles.learningProgressSection}>
        <div style={styles.progressContainer}>
          <div style={styles.progressChartContainer}>
            <h3 style={styles.chartTitle}>Score Progress: Foundation vs. Quick Fixes</h3>
            <div style={styles.chartLegend}>
              <div style={styles.legendItem}>
                <div style={{ ...styles.legendColor, background: '#d1d5db' }}></div>
                <span style={styles.legendLabel}>Traditional Method</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{ ...styles.legendColor, background: '#007aff' }}></div>
                <span style={styles.legendLabel}>Launch Prep</span>
              </div>
            </div>
            <div style={styles.chartWrapper}>
              <div style={styles.chartGraph} id="progressChart" ref={chartContainerRef}>
                <div style={styles.yAxis}>
                  <div style={styles.yLabel}>100%</div>
                  <div style={styles.yLabel}>75%</div>
                  <div style={styles.yLabel}>50%</div>
                  <div style={styles.yLabel}>25%</div>
                  <div style={styles.yLabel}>0%</div>
                </div>
                <div style={styles.chartContainer}>
                  {chartData.map((data, index) => (
                    <div key={index} style={styles.weekColumn} title={data.tooltip}>
                      <div style={styles.weekBars}>
                        <div
                          className="bar traditional-bar"
                          style={styles.traditionalBar}
                          data-height={data.traditional}
                          data-value={`${data.traditional}%`}
                        ></div>
                        <div
                          className="bar launch-prep-bar"
                          style={styles.launchPrepBar}
                          data-height={data.launchPrep}
                          data-value={`${data.launchPrep}%`}
                        ></div>
                      </div>
                      <div className="week-label" style={styles.weekLabel}>Week {data.week}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={styles.progressSummary}>
            <h2 style={styles.summaryTitle}>Start Slower. Finish Stronger.</h2>
            <p style={styles.summaryText}>We build foundations for perfect scores while others rush to quick fixes.</p>
          </div>

          <div style={styles.progressExplanation}>
            <div style={styles.explanationPoint}>
              <div style={styles.pointNumber}>1</div>
              <div style={styles.pointContent}>
                <h4 style={styles.pointContentH4}>Weeks 1-3: Foundation Building</h4>
                <p style={styles.pointContentP}>
                  We build solid foundations while others rush to practice tests. This creates exponential growth later.
                </p>
              </div>
            </div>
            <div style={styles.explanationPoint}>
              <div style={styles.pointNumber}>2</div>
              <div style={styles.pointContent}>
                <h4 style={styles.pointContentH4}>Weeks 4-6: Acceleration Phase</h4>
                <p style={styles.pointContentP}>
                  Everything connects and learning accelerates dramatically while others hit walls from gaps.
                </p>
              </div>
            </div>
            <div style={styles.explanationPoint}>
              <div style={styles.pointNumber}>3</div>
              <div style={styles.pointContent}>
                <h4 style={styles.pointContentH4}>Weeks 7-9: Perfect Mastery</h4>
                <p style={styles.pointContentP}>
                  Reach 100% mastery while others plateau at 80%. Complete foundations unlock perfect scores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="demo-section" style={styles.demoSection} ref={demoSectionRef}>
        <div style={styles.demoContainer}>
          <div style={styles.demoShowcase}>
            <div style={styles.demoHeader}>
              <div>
                <div style={styles.demoHeaderDiv}>
                  <span style={styles.newBadge}>New</span>
                  <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>See Launch Prep in Action</h2>
                </div>
                <p style={styles.sectionSubtitle}>Live demo of our AI-powered ACT prep platform</p>
              </div>
            </div>
            <div style={styles.demoScreen} id="demoScreen">
              <div style={styles.demoContent}>
                <div style={styles.demoInterface}>
                  {/* Dashboard Interface - Shows First */}
                  {showDashboard && (
                    <div style={styles.dashboardInterface} id="dashboardInterface">
                      <div style={styles.appHeader}>
                        <div style={styles.appLogo}>Launch Prep</div>
                        <div style={styles.userInfo}>
                          <span>Sarah Chen</span>
                          <div style={styles.userAvatar}>SC</div>
                        </div>
                      </div>

                      <div style={styles.navTabs}>
                        <div style={{ ...styles.navTab, ...styles.navTabActive }}>
                          Dashboard
                        </div>
                        <div
                          id="mathPracticeTab"
                          style={{
                            ...styles.navTab,
                            ...(isTabHighlighted ? styles.navTabHighlight : {})
                          }}
                        >
                          Math Practice
                        </div>
                        <div style={styles.navTab}>Tests</div>
                        <div style={styles.navTab}>Progress</div>
                      </div>

                      <div style={styles.dashboardContent}>
                        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1d1d1f', marginBottom: '0.3rem' }}>
                            Welcome back, Sarah!
                          </h2>
                          <p style={{ color: '#6e6e73', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                            Ready to improve your ACT score?
                          </p>
                        </div>

                        <div style={styles.dashboardGrid}>
                          <div style={styles.dashboardCard}>
                            <div style={styles.cardMetric}>28</div>
                            <div style={styles.cardTitle}>Current Score</div>
                          </div>

                          <div style={{ ...styles.dashboardCard, ...styles.weakAreaCard }}>
                            <div style={{ fontSize: '1.1rem', color: '#ff9500', fontWeight: 600 }}>Quadratics</div>
                            <div style={{ marginTop: '0.3rem', color: '#ff9500', fontWeight: 600, fontSize: '0.8rem' }}>
                              Needs Practice
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', maxWidth: '400px', margin: '1.5rem auto 0' }}>
                          <div style={styles.actionButton} onClick={() => clickMathPracticeTab()}>
                            <div style={{ fontWeight: 600, fontSize: '0.8rem', lineHeight: 1.3, color: 'white', marginBottom: '0.2rem' }}>
                              Continue Practice
                            </div>
                            <div style={{ fontSize: '0.65rem', opacity: 0.9, color: 'white' }}>
                              Math • Quadratics
                            </div>
                          </div>

                          <div style={{ ...styles.dashboardCard, background: '#f8f9fa', color: '#1d1d1f', border: '1px solid #e5e5e7' }}>
                            <div style={{ fontWeight: 600, fontSize: '0.8rem', lineHeight: 1.3, marginBottom: '0.2rem' }}>
                              Start Lesson
                            </div>
                            <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>
                              Learn new concepts
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                          <p style={{ color: '#007aff', fontSize: '0.65rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                            Click "Math Practice" to improve quadratics
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Lesson Panel - Shows After Dashboard */}
                  {showLesson && (
                    <div
                      id="lessonPanel"
                      style={{
                        ...styles.lessonPanel,
                        display: 'flex',
                        opacity: 1,
                        transform: 'translateX(0)'
                      }}
                      ref={lessonPanelRef}
                    >
                      <div style={styles.lessonHeader}>
                        📚 ACT Math • Quadratic Equations
                      </div>
                      <div style={styles.lessonContent}>
                        <div style={styles.problemTitle}>Practice Problem #12</div>
                        <div style={styles.mathProblem}>
                          <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>Solve for x:</div>
                          <div style={styles.mathEquation}>
                            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                id="term1"
                                style={{
                                  ...styles.equationTerm,
                                  ...(showHighlights.term1 ? { background: 'rgba(255, 149, 0, 0.3)', borderRadius: '6px' } : {})
                                }}
                              >
                                x²
                              </span>
                              <span> - </span>
                              <span
                                id="term2"
                                style={{
                                  ...styles.equationTerm,
                                  ...(showHighlights.term2 ? { background: 'rgba(52, 199, 89, 0.3)', borderRadius: '6px' } : {})
                                }}
                              >
                                6x
                              </span>
                              <span> + </span>
                              <span
                                id="term3"
                                style={{
                                  ...styles.equationTerm,
                                  ...(showHighlights.term3 ? { background: 'rgba(0, 122, 255, 0.3)', borderRadius: '6px' } : {})
                                }}
                              >
                                8
                              </span>
                              <span> = 0</span>
                            </div>

                            {/* Teaching Popups */}
                            {showPopups.popup1 && (
                              <div style={{
                                position: 'absolute',
                                top: '-60px',
                                left: '-80px',
                                background: 'linear-gradient(135deg, #007aff, #00d4ff)',
                                color: 'white',
                                padding: '1rem 1.25rem',
                                borderRadius: '16px',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                opacity: 1,
                                zIndex: 15,
                                maxWidth: '200px',
                                lineHeight: 1.4,
                                boxShadow: '0 8px 24px rgba(0, 122, 255, 0.3)',
                                transform: 'scale(1)',
                                animation: 'fadeInUp 0.5s ease forwards'
                              }}>
                                This is x² (coefficient a = 1)
                                <div style={{
                                  position: 'absolute',
                                  bottom: '-8px',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  width: 0,
                                  height: 0,
                                  borderLeft: '8px solid transparent',
                                  borderRight: '8px solid transparent',
                                  borderTop: '8px solid #007aff'
                                }}></div>
                              </div>
                            )}

                            {showPopups.popup2 && (
                              <div style={{
                                position: 'absolute',
                                top: '-60px',
                                left: '20px',
                                background: 'linear-gradient(135deg, #34c759, #30d158)',
                                color: 'white',
                                padding: '1rem 1.25rem',
                                borderRadius: '16px',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                opacity: 1,
                                zIndex: 15,
                                maxWidth: '200px',
                                lineHeight: 1.4,
                                boxShadow: '0 8px 24px rgba(52, 199, 89, 0.3)',
                                transform: 'scale(1)',
                                animation: 'fadeInUp 0.5s ease forwards'
                              }}>
                                This is 6x (coefficient b = 6)
                                <div style={{
                                  position: 'absolute',
                                  bottom: '-8px',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  width: 0,
                                  height: 0,
                                  borderLeft: '8px solid transparent',
                                  borderRight: '8px solid transparent',
                                  borderTop: '8px solid #34c759'
                                }}></div>
                              </div>
                            )}

                            {showPopups.popup3 && (
                              <div style={{
                                position: 'absolute',
                                top: '-60px',
                                right: '-80px',
                                background: 'linear-gradient(135deg, #007aff, #00d4ff)',
                                color: 'white',
                                padding: '1rem 1.25rem',
                                borderRadius: '16px',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                opacity: 1,
                                zIndex: 15,
                                maxWidth: '200px',
                                lineHeight: 1.4,
                                boxShadow: '0 8px 24px rgba(0, 122, 255, 0.3)',
                                transform: 'scale(1)',
                                animation: 'fadeInUp 0.5s ease forwards'
                              }}>
                                This is 8 (coefficient c = 8)
                                <div style={{
                                  position: 'absolute',
                                  bottom: '-8px',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  width: 0,
                                  height: 0,
                                  borderLeft: '8px solid transparent',
                                  borderRight: '8px solid transparent',
                                  borderTop: '8px solid #007aff'
                                }}></div>
                              </div>
                            )}
                          </div>

                          {/* Answer Input Box */}
                          <div style={styles.answerSection}>
                            <div style={{ marginBottom: '1rem' }}>
                              <label style={{ display: 'block', color: '#6e6e73', fontWeight: 500, marginBottom: '0.5rem' }}>
                                Your Answer:
                              </label>
                              <input
                                type="text"
                                placeholder="Enter x values (e.g., x = 2, 4)"
                                style={styles.answerInput}
                                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                              />
                              <div style={{ marginTop: '0.5rem' }}>
                                <button
                                  onClick={askForHelp}
                                  style={styles.helpButton}
                                >
                                  ? need help
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Teaching Steps - Hidden by default */}
                          {showSolutionSteps && (
                            <div style={{ ...styles.solutionSteps, opacity: 1 }}>
                              {teachingStep >= 1 && (
                                <div style={{ ...styles.step, opacity: 1 }}>
                                  <span style={styles.stepNumber}>Step 1:</span> Factor:{' '}
                                  <span style={styles.stepHighlight}>(x - 4)(x - 2) = 0</span>
                                </div>
                              )}
                              {teachingStep >= 2 && (
                                <div style={{ ...styles.step, opacity: 1 }}>
                                  <span style={styles.stepNumber}>Step 2:</span> Solve each factor: x - 4 = 0 → x = 4, x - 2 = 0 → x = 2
                                </div>
                              )}
                              {teachingStep >= 3 && (
                                <div style={{ ...styles.step, opacity: 1 }}>
                                  <span style={styles.stepNumber}>Answer:</span>{' '}
                                  <strong>x = 4 or x = 2</strong> ✅
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Tutor Chat Bar */}
                  <div
                    id="chatPanel"
                    style={{
                      ...styles.chatPanel,
                      ...(isChatExpanded ? styles.chatPanelExpanded : {})
                    }}
                    onClick={toggleChat}
                  >
                    {!isChatExpanded && (
                      <div style={styles.chatToggle}>🤖</div>
                    )}

                    {isChatExpanded && (
                      <>
                        <div style={{ ...styles.chatHeader, display: 'block' }}>
                          🤖 AI Tutor
                        </div>
                        <div id="chatMessages" style={{ ...styles.chatMessages, display: 'flex' }}>
                          <div style={{ ...styles.message, ...styles.userMessage }}>
                            Can you teach me this step by step?
                          </div>
                          <div style={{ ...styles.message, ...styles.aiMessage }}>
                            Absolutely! I'll guide you through each step with visual hints.
                          </div>
                          <div style={{ ...styles.message, ...styles.userMessage }}>
                            That's so helpful! 🎯
                          </div>
                          <div style={{ ...styles.message, ...styles.aiMessage }}>
                            Watch as I highlight and explain each part above!
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div style={styles.demoStatus}>
                  ✨ AI adapts to your learning pace and style
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section" style={styles.statsSection}>
        <div style={styles.goalsContainer}>
          <h2 style={styles.goalsTitle}>Our Goals for You</h2>
          <div style={styles.goalsGrid}>
            <div style={styles.goalItem}>
              <span style={styles.goalNumber}>36</span>
              <span style={styles.goalLabel}>Score Target</span>
            </div>
            <div style={styles.goalItem}>
              <span style={styles.goalNumber}>8</span>
              <span style={styles.goalLabel}>Point Goal</span>
            </div>
            <div style={styles.goalItem}>
              <span style={styles.goalNumber}>24</span>
              <span style={styles.goalLabel}>Hour Course</span>
            </div>
            <div style={styles.goalItem}>
              <span style={styles.goalNumber}>100%</span>
              <span style={styles.goalLabel}>AI Powered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section id="universities" className="universities-section" style={styles.universitiesSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Built by Top Minds</h2>
        </div>

        <div style={styles.universitiesShowcase}>
          <div style={styles.universityCarousel}>
            <div style={styles.universityVisualCard}>
              <div style={styles.universityVisualName}>Harvard</div>
              <div style={styles.universityVisualBadge}>Perfect SAT</div>
            </div>
            <div style={styles.universityVisualCard}>
              <div style={styles.universityVisualName}>Stanford</div>
              <div style={styles.universityVisualBadge}>Valedictorian</div>
            </div>
            <div style={styles.universityVisualCard}>
              <div style={styles.universityVisualName}>Princeton</div>
              <div style={styles.universityVisualBadge}>Summa Cum Laude</div>
            </div>
            <div style={styles.universityVisualCard}>
              <div style={styles.universityVisualName}>Berkeley</div>
              <div style={styles.universityVisualBadge}>Phi Beta Kappa</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Future?</h2>
          <p style={styles.ctaSubtitle}>Join the waitlist • Get free access when we launch</p>
          <button style={styles.ctaSpecial} onClick={openModal}>Join Waitlist</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Launch Prep. The future of test preparation.</p>
      </footer>

      {/* Modal */}
      <div
        ref={modalRef}
        style={{
          ...styles.modal,
          display: isModalOpen ? 'block' : 'none'
        }}
      >
        <div
          className="modal-content"
          style={styles.modalContent}
        >
          <span
            style={styles.close}
            onClick={closeModal}
          >
            &times;
          </span>
          <h2 style={styles.modalTitle}>Join the Waitlist</h2>
          <p style={styles.modalSubtitle}>Get free access when we launch - no payment required</p>

          {!showSuccessMessage ? (
            <form onSubmit={handleFormSubmit}>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  style={styles.formInput}
                  id="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="email"
                  style={styles.formInput}
                  id="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="tel"
                  style={styles.formInput}
                  id="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  style={styles.formInput}
                  id="school"
                  placeholder="High School"
                  value={formData.school}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  style={styles.formInput}
                  id="grade"
                  placeholder="Current Grade (e.g., 11th grade)"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  style={styles.formInput}
                  id="score"
                  placeholder="Current ACT Score (or 'Not taken')"
                  value={formData.score}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" style={styles.formSubmit}>Join Waitlist</button>
            </form>
          ) : (
            <div style={{ ...styles.successMessage, display: 'block' }}>
              🎉 You're on the waitlist! You'll get free access when we launch - no payment required.
            </div>
          )}
        </div>
      </div>

      {/* Add CSS animations and pseudo-elements */}
      <style jsx global>{`
        /* Global CSS Reset - CRITICAL FOR 100% PARITY */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          overflow-x: hidden;
          max-width: 100vw;
        }

        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Navigation underline animation - MISSING CRITICAL FEATURE */
        .nav-link {
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #007aff;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Chart tooltip pseudo-elements - CRITICAL MISSING FEATURE */
        .week-column {
          position: relative;
        }

        .week-column::before {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1000;
        }

        .week-column:hover::before {
          opacity: 1;
        }

        /* Bar hover tooltips - MISSING FEATURE */
        .bar {
          position: relative;
        }

        .bar:hover::after {
          content: attr(data-value);
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          white-space: nowrap;
          z-index: 1000;
        }

        /* Method card background overlays - MISSING FEATURE */
        .method-traditional::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.03);
          border-radius: inherit;
          pointer-events: none;
        }

        .method-launch::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.05);
          border-radius: inherit;
          pointer-events: none;
        }

        /* Section fade-in with classes instead of inline styles */
        section {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        section.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero section should be visible immediately */
        section.hero {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(-10px) rotate(-3deg);
          }
        }

        @keyframes pulse-tab {
          0%, 100% {
            background: rgba(0, 122, 255, 0.1);
            box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.2);
          }
          50% {
            background: rgba(0, 122, 255, 0.2);
            box-shadow: 0 0 0 6px rgba(0, 122, 255, 0.15);
          }
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
          position: absolute;
          font-size: 2rem;
          opacity: 0.3;
        }

        .floating-element:nth-child(1) {
          top: 20%;
          left: 10%;
        }

        .floating-element:nth-child(2) {
          animation-delay: 2s;
          top: 30%;
          right: 15%;
        }

        .floating-element:nth-child(3) {
          animation-delay: 4s;
          bottom: 25%;
          left: 20%;
        }

        /* Navigation hover effects */
        .nav-link:hover::after {
          width: 100%;
        }

        /* Week column tooltip hover */
        .week-column:hover .tooltip {
          opacity: 1;
        }

        /* Ensure message animations work properly */
        .message {
          animation-fill-mode: forwards !important;
        }
      `}</style>
    </div>
  );
};

export default CompleteLandingPage;