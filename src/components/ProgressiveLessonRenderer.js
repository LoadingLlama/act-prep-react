import React, { useState, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import TypewriterText from './TypewriterText';
import PracticeSection from './PracticeSection';
import InteractiveQuiz from './InteractiveQuiz';
import TableOfContentsSidebar from './TableOfContentsSidebar';
import ControlsSidebar from './ControlsSidebar';

const useStyles = createUseStyles({
  progressiveContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    lineHeight: 1.6,
    color: '#1a202c',
    background: 'linear-gradient(135deg, #f8faff 0%, #e8f4ff 50%, #f0f8ff 100%)',
    padding: '1.5rem 2.5rem',
    maxWidth: '2200px',
    margin: '0 auto',
    marginLeft: '85px',
    marginRight: '85px',
    textAlign: 'left',
    width: 'calc(100% - 160px)',
    borderRadius: '0 0 20px 20px',

    '& h3': {
      color: '#2d3748',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      margin: '1.5rem 0 1rem 0'
    },
    '& h4': {
      color: '#4a5568',
      fontSize: '1.1rem',
      fontWeight: '600',
      margin: '1rem 0 0.5rem 0'
    },
    '& p': {
      fontSize: '1rem',
      marginBottom: '1rem',
      lineHeight: 1.6,
      color: '#4a5568'
    },
    '& strong': {
      color: '#2d3748',
      fontWeight: '600'
    },
    '& em': {
      color: '#c53030',
      fontStyle: 'italic'
    },
    '& ul, & ol': {
      marginBottom: '1rem'
    },
    '& li': {
      fontSize: '1rem',
      marginBottom: '0.5rem',
      color: '#4a5568'
    }
  },
  section: {
    marginBottom: '1.2rem',
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'all 0.4s ease-out',
    '&.visible': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    '&.faded': {
      opacity: 0.4,
      transform: 'none'
    },
    '&.current': {
      opacity: 1,
      transform: 'none',
      borderRadius: '12px',
      padding: '0.6rem',
      background: 'rgba(255, 255, 255, 0.05)'
    }
  },
  continuePrompt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '1rem 0 0 0',
    padding: '0.5rem',
    backgroundColor: 'transparent',
    opacity: 0.3,
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 0.6
    }
  },
  promptText: {
    color: '#9ca3af',
    fontSize: '0.75rem',
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem'
  },
  enterKey: {
    background: 'linear-gradient(135deg, #1a73e8 0%, #2b77c9 100%)',
    border: '1px solid #1a73e8',
    borderRadius: '6px',
    padding: '0.2rem 0.6rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Monaco, Consolas, monospace',
    boxShadow: '0 2px 4px rgba(26, 115, 232, 0.2)',

    // More subtle styling for skip hint context
    '.autoCompleteHint &': {
      background: 'rgba(156, 163, 175, 0.2)',
      border: '1px solid rgba(156, 163, 175, 0.3)',
      color: '#6b7280',
      fontSize: '0.65rem',
      padding: '0.15rem 0.4rem',
      boxShadow: 'none'
    },

    // Subtle styling for continue prompt context
    '.continuePrompt &': {
      background: 'rgba(156, 163, 175, 0.15)',
      border: '1px solid rgba(156, 163, 175, 0.25)',
      color: '#9ca3af',
      fontSize: '0.65rem',
      padding: '0.15rem 0.4rem',
      boxShadow: 'none'
    }
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    backgroundColor: '#e2f8ff',
    zIndex: 1000
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #3182ce 0%, #2b77c9 50%, #1a73e8 100%)',
    transition: 'width 0.3s ease',
    boxShadow: '0 0 15px rgba(26, 115, 232, 0.4)'
  },
  completed: {
    '& .continue-prompt': {
      display: 'none'
    }
  },
  autoCompleteHint: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '1rem 0 0 0',
    padding: '0.5rem',
    backgroundColor: 'transparent',
    opacity: 0.4,
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 0.7
    }
  },
  hintText: {
    color: '#9ca3af',
    fontSize: '0.8rem',
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem'
  },
  quizLockNotice: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    margin: '1.5rem 0',
    padding: '1rem 1.25rem',
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px'
  },
  lockIcon: {
    fontSize: '1.5rem',
    color: '#718096'
  },
  lockText: {
    '& strong': {
      color: '#4a5568',
      fontSize: '0.95rem',
      fontWeight: '600',
      display: 'block',
      marginBottom: '0.3rem'
    },
    '& p': {
      color: '#718096',
      fontSize: '0.85rem',
      margin: 0,
      lineHeight: '1.4'
    }
  }
});

const ProgressiveLessonRenderer = ({ lesson, onComplete }) => {
  const classes = useStyles();
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [visibleSections, setVisibleSections] = useState(1);
  const [currentSectionComplete, setCurrentSectionComplete] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [quizCompletionStatus, setQuizCompletionStatus] = useState({});
  const [textCompletionStatus, setTextCompletionStatus] = useState({});
  const [sectionStatusOverride, setSectionStatusOverride] = useState({});
  const [typingSpeed, setTypingSpeed] = useState(25);
  const typewriterRef = React.useRef(null);
  const sectionRefs = React.useRef([]);

  // Track current section changes
  React.useEffect(() => {
    if (sections.length > 0 && sections[currentSection]) {
      const currentSectionData = sections[currentSection];
      console.log(`*** CURRENT SECTION CHANGED TO ${currentSection} ***`);
      console.log(`Section type: ${currentSectionData.type}`);
      console.log(`Content preview: ${currentSectionData.content?.substring(0, 100)}`);

    }
  }, [currentSection, sections]);

  const splitIntoTextSections = (content) => {
    if (!content || !content.trim()) return [];

    const cleanContent = content.trim();
    const sections = [];

    // Strategy: Create readable chunks by splitting on logical boundaries
    if (cleanContent.includes('<h3')) {
      // Split by H3 headers first
      const h3Parts = cleanContent.split(/(?=<h3[^>]*>)/);

      for (let part of h3Parts) {
        part = part.trim();
        if (!part || part.length < 50) continue;

        // Check if this H3 section is very long and needs further splitting
        const wordCount = (part.match(/\b\w+\b/g) || []).length;

        if (wordCount > 200) {
          // Long section - split by major elements
          const subSections = splitByElements(part);
          sections.push(...subSections);
        } else {
          // Normal sized H3 section - keep as one
          sections.push({
            type: 'text',
            content: part
          });
        }
      }
    } else {
      // No H3 headers - split by other elements
      const subSections = splitByElements(cleanContent);
      sections.push(...subSections);
    }

    return sections.length > 0 ? sections : [{
      type: 'text',
      content: cleanContent
    }];
  };

  const splitByElements = (content) => {
    const sections = [];

    // Split by concept boxes and major divs
    if (content.includes('<div class="concept-box') || content.includes('<div class="section')) {
      const parts = content.split(/(<div class="(?:concept-box|section)[^"]*"[^>]*>[\s\S]*?<\/div>)/);
      let currentSection = '';

      for (let part of parts) {
        part = part.trim();
        if (!part) continue;

        if (part.startsWith('<div class="concept-box') || part.startsWith('<div class="section')) {
          // Concept box or section div - save any accumulated content first
          if (currentSection.trim() && currentSection.trim().length > 50) {
            sections.push({
              type: 'text',
              content: currentSection.trim()
            });
          }

          // Add concept box as its own section
          sections.push({
            type: 'text',
            content: part
          });

          currentSection = '';
        } else {
          // Regular content - accumulate
          currentSection += part;

          // If getting long, create a section
          const wordCount = (currentSection.match(/\b\w+\b/g) || []).length;
          if (wordCount > 150) {
            sections.push({
              type: 'text',
              content: currentSection.trim()
            });
            currentSection = '';
          }
        }
      }

      // Add any remaining content
      if (currentSection.trim() && currentSection.trim().length > 50) {
        sections.push({
          type: 'text',
          content: currentSection.trim()
        });
      }
    } else {
      // No special divs - split by paragraphs if content is long
      const wordCount = (content.match(/\b\w+\b/g) || []).length;

      if (wordCount > 150) {
        const paragraphs = content.split(/(<\/p>\s*)/);
        let currentSection = '';
        let sectionWords = 0;

        for (let i = 0; i < paragraphs.length; i++) {
          const para = paragraphs[i];
          const paraWords = (para.match(/\b\w+\b/g) || []).length;

          currentSection += para;
          sectionWords += paraWords;

          // Create section when we have enough content
          if (sectionWords >= 100 && para.includes('</p>')) {
            if (currentSection.trim()) {
              sections.push({
                type: 'text',
                content: currentSection.trim()
              });
            }
            currentSection = '';
            sectionWords = 0;
          }
        }

        // Add remaining content
        if (currentSection.trim()) {
          sections.push({
            type: 'text',
            content: currentSection.trim()
          });
        }
      } else {
        // Short content - keep as one section
        sections.push({
          type: 'text',
          content: content
        });
      }
    }

    const filteredSections = sections.filter(section => section.content && section.content.trim().length > 30); // Reduced minimum
    console.log('SECTIONS BEFORE FILTER:', sections.length, 'AFTER FILTER:', filteredSections.length);
    sections.forEach((section, i) => {
      if (!section.content || section.content.trim().length <= 30) {
        console.log(`FILTERED OUT Section ${i}: length ${section.content?.length}, content: "${section.content?.substring(0, 50)}"`);
      } else {
        // Check if any kept sections contain PRO TIP
        if (section.content.includes('PRO TIP')) {
        }
      }
    });
    return filteredSections;
  };



  useEffect(() => {
    if (!lesson || !lesson.content) {
      setSections([]);
      return;
    }

    // Reset state when lesson changes
    setCurrentSection(0);
    setVisibleSections(1);
    setCurrentSectionComplete(false);
    setIsComplete(false);
    setQuizCompletionStatus({});
    setSectionStatusOverride({}); // Clear status overrides on lesson change

    // COMPLETELY REWRITE the quiz processing - much simpler approach
    const processedSections = [];

    // Split the entire lesson content by quiz markers first
    const contentWithQuizzes = lesson.content;
    console.log('FULL LESSON CONTENT LENGTH:', contentWithQuizzes.length);
    console.log('CONTENT CONTAINS QUIZ_1:', contentWithQuizzes.includes('<!-- QUIZ_1 -->'));


    // Split by ALL quiz markers at once
    const allParts = contentWithQuizzes.split(/(<!-- QUIZ_[1-4] -->)/);
    console.log('SPLIT INTO PARTS:', allParts.length);

    allParts.forEach((part, index) => {
      if (!part.trim()) return;

      // Check if this part is a quiz marker
      const quizMatch = part.match(/<!-- QUIZ_(\d+) -->/);
      if (quizMatch) {
        const quizId = parseInt(quizMatch[1]);
        console.log('FOUND QUIZ MARKER:', quizId);
        const quizData = getQuizData(quizId);

        if (quizData) {
          processedSections.push({
            type: 'quiz',
            data: quizData,
            isFinal: quizId === 4
          });
          console.log('ADDED QUIZ:', quizId);
        }
      } else {
        // This is text content - split it into manageable sections
        const textSections = splitIntoTextSections(part);
        console.log('TEXT SECTIONS CREATED:', textSections.length);
        textSections.forEach((section, i) => {
          console.log(`Section ${i}: ${section.content.substring(0, 100)}...`);
        });
        processedSections.push(...textSections);
      }
    });

    console.log('FINAL PROCESSED SECTIONS:', processedSections.length);
    processedSections.forEach((section, i) => {
      const preview = section.content?.substring(0, 100) || 'No content';
      console.log(`Final Section ${i} (${section.type}): ${preview}...`);

      // Check specifically for PRO TIP
      if (section.content?.includes('PRO TIP')) {
      }
    });

    setSections(processedSections);
    sectionRefs.current = processedSections.map((_, i) => sectionRefs.current[i] || React.createRef());

    console.log(`Lesson loaded with ${processedSections.length} sections`);
    console.log('SECTION TYPES:', processedSections.map((s, i) => `${i}: ${s.type}`));
    console.log('QUIZ SECTIONS:', processedSections.filter(s => s.type === 'quiz').length);
  }, [lesson]);

  const getQuizData = (quizId) => {
    const quizzes = {
      1: {
        title: "Interactive Quiz: Clause Identification",
        intro: "Test your understanding of clauses and phrases. Choose the correct answer for each question.",
        questions: [
          {
            text: "Identify the type: <strong>When the storm arrived</strong>",
            options: [
              { text: "Independent clause", isCorrect: false, explanation: "This has a subject and verb but starts with 'when,' making it dependent." },
              { text: "Dependent clause", isCorrect: true, explanation: "Correct! 'When' makes this clause dependent on another clause to complete the thought." },
              { text: "Phrase", isCorrect: false, explanation: "This has both a subject (storm) and a verb (arrived), so it's a clause, not a phrase." }
            ]
          },
          {
            text: "Identify the type: <strong>Running through the park</strong>",
            options: [
              { text: "Independent clause", isCorrect: false, explanation: "This lacks a subject and finite verb, so it cannot stand alone." },
              { text: "Dependent clause", isCorrect: false, explanation: "This doesn't have a subject and finite verb - it's not a clause at all." },
              { text: "Phrase", isCorrect: true, explanation: "Correct! This is a participial phrase with no subject or finite verb." }
            ]
          },
          {
            text: "Identify the type: <strong>The cat sat on the mat</strong>",
            options: [
              { text: "Independent clause", isCorrect: true, explanation: "Perfect! This has a subject (cat), verb (sat), and expresses a complete thought." },
              { text: "Dependent clause", isCorrect: false, explanation: "This clause can stand alone - there's no subordinating word making it dependent." },
              { text: "Phrase", isCorrect: false, explanation: "This has both a subject and verb, making it a clause, not a phrase." }
            ]
          },
          {
            text: "Identify the type: <strong>Because she studied hard</strong>",
            options: [
              { text: "Independent clause", isCorrect: false, explanation: "'Because' creates a dependent relationship - this cannot stand alone." },
              { text: "Dependent clause", isCorrect: true, explanation: "Exactly! 'Because' is a subordinating conjunction that makes this clause dependent." },
              { text: "Phrase", isCorrect: false, explanation: "This has a subject (she) and verb (studied), so it's a clause." }
            ]
          }
        ]
      },
      2: {
        title: "Final Assessment: FANBOYS & Compound Sentences",
        intro: "Apply your knowledge of FANBOYS and compound sentence construction. This is your final test!",
        questions: [
          {
            text: "Which FANBOYS conjunction best connects these ideas: 'I want to go swimming' + 'it's raining outside'?",
            options: [
              { text: "and", isCorrect: false, explanation: "'And' shows addition, but these ideas contrast with each other." },
              { text: "but", isCorrect: true, explanation: "Perfect! 'But' shows the contrast between wanting to swim and the rain preventing it." },
              { text: "or", isCorrect: false, explanation: "'Or' shows alternatives, but we're contrasting two situations here." },
              { text: "so", isCorrect: false, explanation: "'So' shows cause and effect, but we're showing contrast, not causation." }
            ]
          },
          {
            text: "Identify the error: 'I studied hard for the test, I still failed.'",
            options: [
              { text: "Missing conjunction", isCorrect: true, explanation: "Correct! This is a comma splice. You need a FANBOYS conjunction: 'I studied hard for the test, but I still failed.'" },
              { text: "Wrong punctuation", isCorrect: false, explanation: "The comma placement is correct for a compound sentence, but you need a conjunction." },
              { text: "No error", isCorrect: false, explanation: "This is a comma splice - two independent clauses joined by only a comma." }
            ]
          },
          {
            text: "Which sentence correctly uses a FANBOYS conjunction?",
            options: [
              { text: "I was tired, so I went to bed early.", isCorrect: true, explanation: "Excellent! This correctly shows cause (tired) and effect (went to bed) with proper comma + conjunction." },
              { text: "I was tired so I went to bed early.", isCorrect: false, explanation: "Missing the comma before 'so' in this compound sentence." },
              { text: "I was tired, I went to bed early.", isCorrect: false, explanation: "This is a comma splice - needs a conjunction after the comma." }
            ]
          },
          {
            text: "What's the best way to fix this comma splice: 'The movie was long, it was boring.'?",
            options: [
              { text: "The movie was long it was boring.", isCorrect: false, explanation: "This creates a run-on sentence - you still need proper punctuation." },
              { text: "The movie was long, and it was boring.", isCorrect: true, explanation: "Perfect! Adding 'and' creates a proper compound sentence showing both qualities." },
              { text: "The movie was long; it was boring.", isCorrect: false, explanation: "While grammatically correct with a semicolon, the question asks for FANBOYS usage." }
            ]
          },
          {
            text: "In compound sentences, FANBOYS conjunctions must be:",
            options: [
              { text: "Preceded by a comma", isCorrect: true, explanation: "Exactly right! In compound sentences, always use comma + FANBOYS to join independent clauses." },
              { text: "Followed by a semicolon", isCorrect: false, explanation: "Semicolons replace FANBOYS conjunctions; they don't follow them." },
              { text: "Used without commas", isCorrect: false, explanation: "You always need a comma before FANBOYS in compound sentences." }
            ]
          }
        ]
      },
      3: {
        title: "Practice Quiz: Comma Splices & Fragments",
        intro: "Test your ability to identify and fix common sentence errors.",
        questions: [
          {
            text: "Which sentence correctly fixes this comma splice: 'The storm was approaching, we decided to head home.'",
            options: [
              { text: "The storm was approaching we decided to head home.", isCorrect: false, explanation: "This creates a run-on sentence. You need proper punctuation or conjunction." },
              { text: "The storm was approaching, so we decided to head home.", isCorrect: true, explanation: "Perfect! 'So' shows cause and effect with proper comma + FANBOYS structure." },
              { text: "The storm was approaching; and we decided to head home.", isCorrect: false, explanation: "Don't use semicolon + conjunction together. Choose one or the other." }
            ]
          },
          {
            text: "Identify the sentence fragment: Which needs to be corrected?",
            options: [
              { text: "After the game ended.", isCorrect: true, explanation: "Correct! This dependent clause needs an independent clause to complete the thought." },
              { text: "The team celebrated their victory.", isCorrect: false, explanation: "This is a complete sentence with subject (team) and verb (celebrated)." },
              { text: "Everyone went home happy.", isCorrect: false, explanation: "This is a complete sentence with subject (everyone) and verb (went)." }
            ]
          },
          {
            text: "Which sentence uses correct punctuation between independent clauses?",
            options: [
              { text: "I love reading books, my sister prefers movies.", isCorrect: false, explanation: "This is a comma splice. Two independent clauses need more than just a comma." },
              { text: "I love reading books; my sister prefers movies.", isCorrect: true, explanation: "Excellent! Semicolon correctly separates two independent clauses." },
              { text: "I love reading books my sister prefers movies.", isCorrect: false, explanation: "This is a run-on sentence. Independent clauses need separation." }
            ]
          }
        ]
      },
      4: {
        title: "Final Mastery Test: Sentence Structure",
        intro: "Demonstrate your complete understanding of sentence structure rules. This is your final assessment!",
        questions: [
          {
            text: "Which sentence demonstrates proper use of dependent and independent clauses?",
            options: [
              { text: "Although it was raining, we went for a walk.", isCorrect: true, explanation: "Perfect! Dependent clause + comma + independent clause follows Rule #4." },
              { text: "Although it was raining we went for a walk.", isCorrect: false, explanation: "Missing comma between dependent and independent clauses." },
              { text: "Although it was raining. We went for a walk.", isCorrect: false, explanation: "Don't separate dependent clauses with periods - they can't stand alone." }
            ]
          },
          {
            text: "What's the best way to combine: 'The concert was sold out.' + 'We waited in line anyway.'",
            options: [
              { text: "The concert was sold out, we waited in line anyway.", isCorrect: false, explanation: "This is a comma splice. Need FANBOYS conjunction with the comma." },
              { text: "The concert was sold out, but we waited in line anyway.", isCorrect: true, explanation: "Excellent! Shows contrast with comma + 'but' (FANBOYS)." },
              { text: "The concert was sold out; but we waited in line anyway.", isCorrect: false, explanation: "Don't use semicolon + conjunction together. Choose one method." }
            ]
          },
          {
            text: "Identify the correct sentence structure pattern:",
            options: [
              { text: "Independent, Independent", isCorrect: false, explanation: "This would be a comma splice. Independent clauses need proper separation." },
              { text: "Independent; Independent", isCorrect: true, explanation: "Correct! Semicolon properly separates two independent clauses." },
              { text: "Dependent; Independent", isCorrect: false, explanation: "Dependent clauses need commas, not semicolons, before independent clauses." }
            ]
          },
          {
            text: "Master Question: Which shows perfect command of the 5 Golden Rules?",
            options: [
              { text: "When I study hard, I get better grades, and my parents are proud.", isCorrect: true, explanation: "Perfect mastery! Dependent → Independent (comma) + Independent (comma + FANBOYS)." },
              { text: "When I study hard I get better grades and my parents are proud.", isCorrect: false, explanation: "Missing comma after dependent clause and before FANBOYS conjunction." },
              { text: "When I study hard, I get better grades; and my parents are proud.", isCorrect: false, explanation: "Don't mix semicolon with FANBOYS conjunction. Choose one method." }
            ]
          },
          {
            text: "Final Challenge: Fix this complex error: 'Because the weather was perfect, we decided to have a picnic, it was the best day ever.'",
            options: [
              { text: "Because the weather was perfect, we decided to have a picnic. It was the best day ever.", isCorrect: true, explanation: "Masterful! Fixed the comma splice by separating the last independent clause with a period." },
              { text: "Because the weather was perfect we decided to have a picnic, it was the best day ever.", isCorrect: false, explanation: "Still has comma splice and missing comma after dependent clause." },
              { text: "Because the weather was perfect, we decided to have a picnic; it was the best day ever.", isCorrect: false, explanation: "While semicolon fixes comma splice, this creates an awkward break in thought flow." }
            ]
          }
        ]
      }
    };

    return quizzes[quizId] || null;
  };


  // Keyboard navigation - stable and predictable
  // Scroll restriction - prevent scrolling past visible content
  useEffect(() => {
    const handleScroll = () => {
      if (visibleSections < sections.length) {
        const lastVisibleSection = sectionRefs.current[visibleSections - 1];
        if (lastVisibleSection) {
          const rect = lastVisibleSection.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // If user has scrolled past the last visible section, scroll back
          if (rect.bottom < 0) {
            lastVisibleSection.scrollIntoView({
              behavior: 'smooth',
              block: 'end'
            });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections, sections.length]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent any default behavior

        // Avoid processing if already complete
        if (isComplete) {
          return;
        }

        const currentSectionData = sections[currentSection];
        if (!currentSectionData) {
          return;
        }

        console.log('Enter pressed:', {
          currentSection,
          currentSectionComplete,
          sectionType: currentSectionData.type,
          totalSections: sections.length
        });

        // CASE 1: Complete current text section (only if it's a text section and not complete)
        if (!currentSectionComplete && currentSectionData.type === 'text') {
          console.log('Completing current text section');
          if (typewriterRef.current) {
            typewriterRef.current.completeInstantly();
          }
          setCurrentSectionComplete(true);
          setTextCompletionStatus(prev => ({ ...prev, [currentSection]: true }));

          // Scroll to keep current section visible
          setTimeout(() => {
            if (sectionRefs.current[currentSection]) {
              sectionRefs.current[currentSection].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
              });
            }
          }, 100);
          return;
        }

        // CASE 2: Advance to next section (only if current section is complete)
        if (currentSectionComplete) {
          // Block advancement if current section is an incomplete quiz
          if (currentSectionData.type === 'quiz' && !quizCompletionStatus[currentSection]) {
            console.log('Blocked by incomplete quiz');
            return;
          }

          // If not at the last section, advance
          if (currentSection < sections.length - 1) {
            const nextSection = currentSection + 1;
            const nextSectionData = sections[nextSection];
            console.log(`Advancing from section ${currentSection} to section ${nextSection}`);
            console.log(`Next section type: ${nextSectionData?.type}, content preview: ${nextSectionData?.content?.substring(0, 100)}`);

            // Check if next section contains PRO TIP
            if (nextSectionData?.content?.includes('PRO TIP')) {
            }

            setCurrentSection(nextSection);
            setVisibleSections(prev => Math.max(prev, nextSection + 1));
            setCurrentSectionComplete(false);

            // Scroll to the new section
            setTimeout(() => {
              if (sectionRefs.current[nextSection]) {
                sectionRefs.current[nextSection].scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                  inline: 'nearest'
                });
              }
            }, 200);
            return;
          }

          // If at last section, complete the lesson
          if (currentSection === sections.length - 1) {
            console.log('Completing lesson');
            setIsComplete(true);
            if (onComplete) {
              onComplete();
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection, currentSectionComplete, isComplete, sections, quizCompletionStatus, visibleSections, onComplete]);

  const handleSectionClick = (index) => {
    // Only allow clicking on visible sections
    if (index < visibleSections) {
      // Check if we can jump to this section (validate quiz completions)
      for (let i = 0; i < index; i++) {
        const sectionData = sections[i];
        if (sectionData?.type === 'quiz' && !quizCompletionStatus[i]) {
          // Cannot jump past an incomplete quiz
          return;
        }
      }

      console.log(`Clicking section ${index}`);
      setCurrentSection(index);

      // Preserve completion state for sections
      const sectionData = sections[index];

      if (sectionData?.type === 'quiz') {
        // For quizzes, use the quiz completion status
        setCurrentSectionComplete(!!quizCompletionStatus[index]);
      } else {
        // For text sections, preserve completion state when navigating
        if (textCompletionStatus[index] || index < visibleSections - 1) {
          setCurrentSectionComplete(true);
        } else {
          // This section hasn't been completed yet
          setCurrentSectionComplete(false);
        }
      }

      // Scroll to the section with better positioning
      setTimeout(() => {
        if (sectionRefs.current[index]) {
          const element = sectionRefs.current[index];
          const rect = element.getBoundingClientRect();
          const offsetTop = window.pageYOffset + rect.top - 100; // 100px margin from top

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  // Function to get the display status for ControlsSidebar without affecting lesson flow
  const getSectionDisplayStatus = () => {
    // Check if there's a manual override first
    if (sectionStatusOverride[currentSection]) {
      return sectionStatusOverride[currentSection];
    }

    // Default logic for determining status
    if (currentSectionComplete) {
      return 'completed';
    } else if (currentSection < visibleSections) {
      return 'in_progress';
    } else {
      return 'pending';
    }
  };

  if (sections.length === 0) {
    return <div>Loading lesson...</div>;
  }

  const progressPercentage = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className={classes.progressiveContainer}>

      {/* Progress bar */}
      <div className={classes.progressBar}>
        <div
          className={classes.progressFill}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Table of Contents */}
      <TableOfContentsSidebar
        sections={sections}
        currentSection={currentSection}
        maxLoadedSection={visibleSections - 1}
        onSectionClick={handleSectionClick}
      />

      {/* Controls Sidebar */}
      <ControlsSidebar
        currentSection={currentSection}
        maxLoadedSection={visibleSections - 1}
        sectionStatus={getSectionDisplayStatus()}
        onStatusChange={(status) => {
          // Only update the display override, don't affect lesson flow
          setSectionStatusOverride(prev => ({ ...prev, [currentSection]: status }));
        }}
        typingSpeed={typingSpeed}
        onSpeedChange={setTypingSpeed}
      />

      {/* Lesson content */}
      {sections.map((section, index) => (
        <div
          key={index}
          ref={el => sectionRefs.current[index] = el}
          className={[
            classes.section,
            index < visibleSections ? 'visible' : '',
            index === currentSection ? 'current' : ''
          ].filter(Boolean).join(' ')}
        >
          {section.type === 'text' ? (
            <>
              {console.log(`Rendering text section ${index}, isCurrent: ${index === currentSection}, isVisible: ${index < visibleSections}, content preview: ${(section.content || '').substring(0, 50)}`)}
              {index === currentSection ? (
                // Current section: Use TypewriterText for animation
                <div>
                  <TypewriterText
                    text={section.content || ''}
                    startDelay={200}
                    typingSpeed={typingSpeed}
                    skipAnimation={textCompletionStatus[index] === true}
                    onComplete={() => {
                      // Mark section as complete when typing finishes
                      console.log(`Section ${index} typewriter completed - marking as complete`);
                      if (index === currentSection) {
                        setCurrentSectionComplete(true);
                        setTextCompletionStatus(prev => ({ ...prev, [index]: true }));
                      }
                    }}
                    ref={typewriterRef}
                  />
                </div>
              ) : index < currentSection ? (
                // Previous sections: Show instantly (already typed)
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              ) : null}
            </>
          ) : section.type === 'quiz' ? (
            section.data ? (
              <>
                <InteractiveQuiz
                  quizData={section.data}
                  quizId={`quiz-${index}`}
                  isFinal={section.isFinal || false}
                  onComplete={() => {
                    console.log(`Quiz ${index} completed`);
                    if (index === currentSection) {
                      setCurrentSectionComplete(true);
                      setQuizCompletionStatus(prev => ({ ...prev, [index]: true }));
                    }
                  }}
                />
                {/* Quiz completion requirement notice */}
                {index === currentSection && !quizCompletionStatus[index] && (
                  <div className={classes.quizLockNotice}>
                    <div className={classes.lockIcon}>🔒</div>
                    <div className={classes.lockText}>
                      <strong>Quiz Required</strong>
                      <p>You must complete this quiz to continue to the next section.</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div>Quiz data not found</div>
            )
          ) : (
            <>
              {console.log(`Rendering fallback section ${index}, isCurrent: ${index === currentSection}`)}
              {index === currentSection ? (
                // Current section: Use TypewriterText for animation
                <TypewriterText
                  text={section.content || ''}
                  startDelay={200}
                  typingSpeed={typingSpeed}
                  skipAnimation={textCompletionStatus[index] === true}
                  onComplete={() => {
                    // Mark section as complete when typing finishes
                    console.log(`Section ${index} (fallback) typewriter completed - marking as complete`);
                    if (index === currentSection) {
                      setCurrentSectionComplete(true);
                      setTextCompletionStatus(prev => ({ ...prev, [index]: true }));
                    }
                  }}
                  ref={typewriterRef}
                />
              ) : index < currentSection ? (
                // Previous sections: Show instantly (already typed)
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              ) : null}
            </>
          )}
          {/* Continue prompt - only show when section is complete */}
          {index === currentSection && index < sections.length - 1 && currentSectionComplete && (
            <div className={classes.continuePrompt}>
              <div className={classes.promptText}>
                <span>Press</span>
                <kbd className={classes.enterKey}>Enter</kbd>
                <span>to continue</span>
              </div>
            </div>
          )}
          {/* Completion prompt - only show for last section when complete */}
          {index === currentSection && index === sections.length - 1 && currentSectionComplete && !isComplete && (
            <div className={classes.continuePrompt}>
              <div className={classes.promptText}>
                <span>Press</span>
                <kbd className={classes.enterKey}>Enter</kbd>
                <span>to complete lesson</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressiveLessonRenderer;