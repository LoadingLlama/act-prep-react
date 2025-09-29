import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import TypewriterText from './TypewriterText';
import InteractiveQuiz from './InteractiveQuiz';
import TableOfContentsSidebar from './TableOfContentsSidebar';
import ControlsSidebar from './ControlsSidebar';
import { splitIntoTextSections } from '../utils/splitIntoTextSections';

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
  },
  aiIndicator: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(237, 248, 255, 0.9) 100%)',
    backdropFilter: 'blur(12px)',
    border: '2px solid rgba(26, 115, 232, 0.15)',
    borderRadius: '25px',
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.75rem',
    color: '#4a5568',
    fontWeight: '500',
    zIndex: 100,
    opacity: 0.8,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(26, 115, 232, 0.1)',
    '&:hover': {
      opacity: 1,
      transform: 'translateX(-50%) translateY(-2px)',
      boxShadow: '0 6px 20px rgba(26, 115, 232, 0.15)'
    }
  },
  aiLogo: {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    background: 'linear-gradient(135deg, #10a37f 0%, #1a73e8 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    fontFamily: 'Monaco, Consolas, monospace'
  },
  completeButton: {
    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    cursor: 'pointer',
    margin: '2rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(72, 187, 120, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(72, 187, 120, 0.4)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 4px 15px rgba(72, 187, 120, 0.3)'
    },
    '&.completing': {
      animation: '$buttonComplete 0.6s ease forwards',
      pointerEvents: 'none'
    }
  },
  '@keyframes buttonComplete': {
    '0%': {
      transform: 'scale(1)'
    },
    '50%': {
      transform: 'scale(1.1)',
      background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.5)'
    },
    '100%': {
      transform: 'scale(1)',
      background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
    }
  },
});

const ProgressiveLessonRenderer = ({ lesson, initialStatus, onComplete, onStatusChange }) => {
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
  const [isCompleting, setIsCompleting] = useState(false);
  const typewriterRef = React.useRef(null);
  const sectionRefs = React.useRef([]);





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
    setTextCompletionStatus({});
    setSectionStatusOverride({});

    // COMPLETELY REWRITE the quiz processing - much simpler approach
    const processedSections = [];

    // Split the entire lesson content by quiz markers first
    const contentWithQuizzes = lesson.content;

    // Split by ALL quiz markers at once
    const allParts = contentWithQuizzes.split(/(<!-- QUIZ_\d+ -->)/);

    allParts.forEach((part, index) => {
      if (!part.trim()) return;

      // Check if this part is a quiz marker
      const quizMatch = part.match(/<!-- QUIZ_(\d+) -->/);
      if (quizMatch) {
        const quizId = parseInt(quizMatch[1]);
        const quizData = getQuizData(quizId);

        if (quizData) {
          processedSections.push({
            type: 'quiz',
            data: quizData,
            isFinal: quizId === 4
          });
        }
      } else {
        // This is text content - split it into manageable sections
        const textSections = splitIntoTextSections(part);
        processedSections.push(...textSections);
      }
    });

    setSections(processedSections);
    sectionRefs.current = processedSections.map((_, i) => sectionRefs.current[i] || React.createRef());
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
          },
          {
            text: "Identify the type: <strong>In the garden</strong>",
            options: [
              { text: "Independent clause", isCorrect: false, explanation: "This has no subject or verb - it cannot be a clause." },
              { text: "Dependent clause", isCorrect: false, explanation: "This is not a clause at all since it lacks both a subject and a finite verb." },
              { text: "Phrase", isCorrect: true, explanation: "Perfect! This is a prepositional phrase with no subject or verb." }
            ]
          }
        ]
      },
      2: {
        title: "Final Assessment: FANBOYS & Compound Sentences",
        intro: "Apply your knowledge of FANBOYS and compound sentence construction. This is your final test!",
        questions: [
          {
            text: "Which FANBOYS conjunction best connects these ideas:<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>'I want to go swimming' + 'it's raining outside'</div>",
            options: [
              { text: "and", isCorrect: false, explanation: "'And' shows addition, but these ideas contrast with each other." },
              { text: "but", isCorrect: true, explanation: "Perfect! 'But' shows the contrast between wanting to swim and the rain preventing it." },
              { text: "or", isCorrect: false, explanation: "'Or' shows alternatives, but we're contrasting two situations here." },
              { text: "so", isCorrect: false, explanation: "'So' shows cause and effect, but we're showing contrast, not causation." }
            ]
          },
          {
            text: "Identify the error:<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>'I studied hard for the test, I still failed.'</div>",
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
            text: "What's the best way to fix this comma splice:<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>'The movie was long, it was boring.'</div>",
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
            text: "Which sentence correctly fixes this comma splice:<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>'The storm was approaching, we decided to head home.'</div>",
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
          },
          {
            text: "What's the difference between these two sentences?<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>Sentence A: 'While studying for the test.'<br/>Sentence B: 'While I was studying for the test.'</div>",
            options: [
              { text: "Both are complete sentences", isCorrect: false, explanation: "Sentence A is missing a subject - 'while studying' has no clear subject performing the action." },
              { text: "A is a phrase, B is a dependent clause", isCorrect: true, explanation: "Excellent! A lacks a clear subject (phrase), while B has 'I' as subject + 'was studying' as verb (dependent clause)." },
              { text: "Both are dependent clauses", isCorrect: false, explanation: "Sentence A is actually a phrase because it doesn't have a clear subject and finite verb." }
            ]
          },
          {
            text: "Advanced Challenge: Identify the error pattern in this sentence:<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>'The students working on the project, they finished early.'</div>",
            options: [
              { text: "Run-on sentence", isCorrect: false, explanation: "This isn't a run-on - there's actually a comma separating the parts." },
              { text: "Comma splice with unclear structure", isCorrect: true, explanation: "Perfect analysis! 'The students working on the project' is unclear (phrase?), and 'they finished early' creates a comma splice pattern." },
              { text: "Missing conjunction only", isCorrect: false, explanation: "The bigger issue is the unclear structure of the first part - it's not a clear independent clause." }
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
            text: "Final Challenge: Fix this complex error:<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>'Because the weather was perfect, we decided to have a picnic, it was the best day ever.'</div>",
            options: [
              { text: "Because the weather was perfect, we decided to have a picnic. It was the best day ever.", isCorrect: true, explanation: "Masterful! Fixed the comma splice by separating the last independent clause with a period." },
              { text: "Because the weather was perfect we decided to have a picnic, it was the best day ever.", isCorrect: false, explanation: "Still has comma splice and missing comma after dependent clause." },
              { text: "Because the weather was perfect, we decided to have a picnic; it was the best day ever.", isCorrect: false, explanation: "While semicolon fixes comma splice, this creates an awkward break in thought flow." }
            ]
          },
          {
            text: "Ultimate Mastery: Which sentence demonstrates perfect understanding of ALL the rules?<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>Choose the sentence that uses dependent clauses, independent clauses, proper punctuation, and FANBOYS correctly.</div>",
            options: [
              { text: "Although the test was difficult, Sarah studied hard, and she earned an A.", isCorrect: true, explanation: "Perfect mastery! Dependent clause (Although...) + comma + independent clause + comma + FANBOYS + independent clause. This shows complete understanding of all sentence structure rules." },
              { text: "Although the test was difficult Sarah studied hard, and she earned an A.", isCorrect: false, explanation: "Missing comma after the dependent clause 'Although the test was difficult.'" },
              { text: "Although the test was difficult, Sarah studied hard and she earned an A.", isCorrect: false, explanation: "Missing comma before 'and' when joining two independent clauses with FANBOYS." }
            ]
          }
        ]
      },
      5: {
        title: "Interactive Quiz: Independent vs Dependent Clauses",
        intro: "Now test your understanding of independent vs dependent clauses. Identify whether each clause can stand alone or needs more information.",
        questions: [
          {
            text: "Identify the clause type: <strong>The students finished their homework</strong>",
            options: [
              { text: "Independent clause", isCorrect: true, explanation: "Perfect! This has a subject (students), verb (finished), and expresses a complete thought that can stand alone." },
              { text: "Dependent clause", isCorrect: false, explanation: "This clause can stand alone as a complete sentence - there's no subordinating word making it dependent." }
            ]
          },
          {
            text: "Identify the clause type: <strong>When the bell rings</strong>",
            options: [
              { text: "Independent clause", isCorrect: false, explanation: "This cannot stand alone as a complete thought. 'When' makes it dependent - we need to know what happens when the bell rings." },
              { text: "Dependent clause", isCorrect: true, explanation: "Correct! 'When' is a subordinating conjunction that makes this clause dependent on another clause to complete the meaning." }
            ]
          },
          {
            text: "Identify the clause type: <strong>Although she studied hard</strong>",
            options: [
              { text: "Independent clause", isCorrect: false, explanation: "'Although' creates dependency - this clause leaves us hanging, waiting to learn what happened despite her studying hard." },
              { text: "Dependent clause", isCorrect: true, explanation: "Exactly! 'Although' is a subordinating conjunction that makes this clause incomplete and dependent on additional information." }
            ]
          },
          {
            text: "Identify the clause type: <strong>The movie was excellent</strong>",
            options: [
              { text: "Independent clause", isCorrect: true, explanation: "Perfect! This expresses a complete thought with subject (movie) and verb (was) - it can stand alone as a sentence." },
              { text: "Dependent clause", isCorrect: false, explanation: "This clause is complete and can stand alone - there's no subordinating word making it dependent." }
            ]
          },
          {
            text: "Identify the clause type: <strong>Because the weather was perfect</strong>",
            options: [
              { text: "Independent clause", isCorrect: false, explanation: "'Because' signals cause and effect - this clause makes us wait to learn what happened because the weather was perfect." },
              { text: "Dependent clause", isCorrect: true, explanation: "Correct! 'Because' is a subordinating conjunction that creates dependency - this clause needs an independent clause to complete the thought." }
            ]
          }
        ]
      },
      6: {
        title: "Interactive Quiz: Clauses vs Phrases",
        intro: "Test your ability to distinguish between clauses (have both subject + verb) and phrases (missing subject or verb or both).",
        questions: [
          {
            text: "Identify the type: <strong>Running through the forest</strong>",
            options: [
              { text: "Clause", isCorrect: false, explanation: "This is missing a subject - we don't know who or what is running. No subject means it's not a clause." },
              { text: "Phrase", isCorrect: true, explanation: "Correct! This is a participial phrase - it has an action (running) but no clear subject performing the action." }
            ]
          },
          {
            text: "Identify the type: <strong>The dog barked loudly</strong>",
            options: [
              { text: "Clause", isCorrect: true, explanation: "Perfect! This has both a subject (dog) and a verb (barked), making it a clause." },
              { text: "Phrase", isCorrect: false, explanation: "This has both a subject (dog) and a verb (barked), so it must be a clause, not a phrase." }
            ]
          },
          {
            text: "Identify the type: <strong>In the middle of the night</strong>",
            options: [
              { text: "Clause", isCorrect: false, explanation: "This has no subject or verb - just prepositions and nouns. Without both subject and verb, it cannot be a clause." },
              { text: "Phrase", isCorrect: true, explanation: "Exactly! This is a prepositional phrase - it has no subject or verb, just describes location/time." }
            ]
          },
          {
            text: "Identify the type: <strong>While she was sleeping</strong>",
            options: [
              { text: "Clause", isCorrect: true, explanation: "Correct! This has a subject (she) and a verb (was sleeping), making it a clause (specifically a dependent clause)." },
              { text: "Phrase", isCorrect: false, explanation: "This has both a subject (she) and a verb (was sleeping), so it's definitely a clause." }
            ]
          },
          {
            text: "Identify the type: <strong>To finish the project on time</strong>",
            options: [
              { text: "Clause", isCorrect: false, explanation: "This infinitive phrase has no clear subject - we don't know who needs to finish the project." },
              { text: "Phrase", isCorrect: true, explanation: "Perfect! This is an infinitive phrase - it expresses purpose but lacks a subject, making it a phrase." }
            ]
          }
        ]
      },
      7: {
        title: "Interactive Quiz: Test Your Backsolving Skills!",
        intro: "Ready to test your skills? These 6 questions cover backsolving techniques - exactly like you'll see on test day!",
        questions: [
          {
            text: "<strong>Square Root Equation:</strong><br/>If √(2x + 3) - √(x + 1) = 1, what is the value of x?",
            options: [
              { text: "1", isCorrect: false, explanation: "Testing x = 1: √(2(1) + 3) - √(1 + 1) = √5 - √2 ≈ 2.24 - 1.41 = 0.83 ≠ 1" },
              { text: "3", isCorrect: true, explanation: "Perfect! Testing x = 3: √(2(3) + 3) - √(3 + 1) = √9 - √4 = 3 - 2 = 1 ✓ Exactly what we need!" },
              { text: "6", isCorrect: false, explanation: "Testing x = 6: √(2(6) + 3) - √(6 + 1) = √15 - √7 ≈ 3.87 - 2.65 = 1.22 ≠ 1" },
              { text: "8", isCorrect: false, explanation: "Testing x = 8: √(2(8) + 3) - √(8 + 1) = √19 - √9 ≈ 4.36 - 3 = 1.36 ≠ 1" }
            ]
          },
          {
            text: "<strong>Quadratic Equation:</strong><br/>Which value is a solution to x² - 7x + 12 = 0?",
            options: [
              { text: "2", isCorrect: false, explanation: "Testing x = 2: (2)² - 7(2) + 12 = 4 - 14 + 12 = 2 ≠ 0" },
              { text: "3", isCorrect: true, explanation: "Excellent! Testing x = 3: (3)² - 7(3) + 12 = 9 - 21 + 12 = 0 ✓ Perfect match!" },
              { text: "5", isCorrect: false, explanation: "Testing x = 5: (5)² - 7(5) + 12 = 25 - 35 + 12 = 2 ≠ 0" },
              { text: "6", isCorrect: false, explanation: "Testing x = 6: (6)² - 7(6) + 12 = 36 - 42 + 12 = 6 ≠ 0" }
            ]
          },
          {
            text: "<strong>Exponential Equation:</strong><br/>If 3ˣ - 2 = 25, what is the value of x?",
            options: [
              { text: "2", isCorrect: false, explanation: "Testing x = 2: 3² - 2 = 9 - 2 = 7 ≠ 25" },
              { text: "3", isCorrect: true, explanation: "Perfect! Testing x = 3: 3³ - 2 = 27 - 2 = 25 ✓ Much easier than solving algebraically!" },
              { text: "4", isCorrect: false, explanation: "Testing x = 4: 3⁴ - 2 = 81 - 2 = 79 ≠ 25" },
              { text: "5", isCorrect: false, explanation: "Testing x = 5: 3⁵ - 2 = 243 - 2 = 241 ≠ 25" }
            ]
          },
          {
            text: "<strong>Absolute Value:</strong><br/>If |2x - 6| = 10, which could be a value of x?",
            options: [
              { text: "-2", isCorrect: true, explanation: "Perfect! Testing x = -2: |2(-2) - 6| = |-4 - 6| = |-10| = 10 ✓ This works!" },
              { text: "1", isCorrect: false, explanation: "Testing x = 1: |2(1) - 6| = |2 - 6| = |-4| = 4 ≠ 10" },
              { text: "4", isCorrect: false, explanation: "Testing x = 4: |2(4) - 6| = |8 - 6| = |2| = 2 ≠ 10" },
              { text: "8", isCorrect: false, explanation: "Testing x = 8: |2(8) - 6| = |16 - 6| = |10| = 10 ✓ This also works! But we already found the correct answer with x = -2." }
            ]
          },
          {
            text: "<strong>Point on a Line:</strong><br/>Which point lies on the line y = 2x + 1?",
            options: [
              { text: "(1, 2)", isCorrect: false, explanation: "Testing point (1, 2): y = 2(1) + 1 = 3, but the point has y = 2. So 2 ≠ 3" },
              { text: "(2, 5)", isCorrect: true, explanation: "Perfect! Testing point (2, 5): y = 2(2) + 1 = 4 + 1 = 5 ✓ The point (2, 5) satisfies the equation!" },
              { text: "(3, 6)", isCorrect: false, explanation: "Testing point (3, 6): y = 2(3) + 1 = 7, but the point has y = 6. So 6 ≠ 7" },
              { text: "(4, 9)", isCorrect: false, explanation: "Testing point (4, 9): y = 2(4) + 1 = 9 ✓ This also works! But since we're looking for one answer, (2, 5) is correct." }
            ]
          }
        ]
      },
      8: {
        title: "Interactive Quiz: Test Your Substitution Skills!",
        intro: "Ready to master substitution? These 6 questions test your ability to use strategic number substitution!",
        questions: [
          {
            text: "<strong>Variable Expression:</strong><br/>If x = 3, what is the value of 2x² - 5x + 1?",
            options: [
              { text: "4", isCorrect: true, explanation: "Perfect! Substituting x = 3: 2(3)² - 5(3) + 1 = 2(9) - 15 + 1 = 18 - 15 + 1 = 4 ✓" },
              { text: "7", isCorrect: false, explanation: "Check your calculation: 2(3)² - 5(3) + 1 = 18 - 15 + 1 = 4" },
              { text: "10", isCorrect: false, explanation: "Remember to follow order of operations: exponents first, then multiplication" },
              { text: "13", isCorrect: false, explanation: "Be careful with signs: -5(3) = -15, not +15" }
            ]
          },
          {
            text: "<strong>Word Problem:</strong><br/>Sarah has n books and buys 3 more. She then gives away half of all her books. If n = 10, how many books does she have left?",
            options: [
              { text: "5", isCorrect: false, explanation: "Don't forget she buys 3 more first: (10 + 3) ÷ 2 = 6.5" },
              { text: "6.5", isCorrect: true, explanation: "Excellent! With n = 10: She has 10 + 3 = 13 books, then gives away half: 13 ÷ 2 = 6.5 books" },
              { text: "8", isCorrect: false, explanation: "Remember to add the 3 books she buys before dividing by 2" },
              { text: "13", isCorrect: false, explanation: "You found the total before giving away half, but she gives away half of all her books" }
            ]
          },
          {
            text: "<strong>Function Evaluation:</strong><br/>If f(x) = x³ - 2x + 5, what is f(2)?",
            options: [
              { text: "9", isCorrect: true, explanation: "Perfect! f(2) = 2³ - 2(2) + 5 = 8 - 4 + 5 = 9 ✓" },
              { text: "5", isCorrect: false, explanation: "Don't forget the x³ term: 2³ = 8, so f(2) = 8 - 4 + 5 = 9" },
              { text: "11", isCorrect: false, explanation: "Check your arithmetic: 8 - 4 + 5 = 9, not 11" },
              { text: "7", isCorrect: false, explanation: "Make sure to substitute x = 2 into all terms: 2³ - 2(2) + 5" }
            ]
          },
          {
            text: "<strong>Algebraic Expression:</strong><br/>If a = 4 and b = -2, what is a² + 3ab - b²?",
            options: [
              { text: "-12", isCorrect: true, explanation: "Excellent! a² + 3ab - b² = 4² + 3(4)(-2) - (-2)² = 16 + (-24) - 4 = -12 ✓" },
              { text: "-4", isCorrect: false, explanation: "Be careful with (-2)²: it equals +4, not -4" },
              { text: "12", isCorrect: false, explanation: "Watch the signs: 3ab = 3(4)(-2) = -24, which is negative" },
              { text: "36", isCorrect: false, explanation: "Remember that (-2)² = 4, and 3(4)(-2) = -24" }
            ]
          },
          {
            text: "<strong>Distance Formula:</strong><br/>What is the distance between points (1, 2) and (5, 5)?",
            options: [
              { text: "3", isCorrect: false, explanation: "Use the distance formula: √[(x₂-x₁)² + (y₂-y₁)²]" },
              { text: "5", isCorrect: true, explanation: "Perfect! Distance = √[(5-1)² + (5-2)²] = √[16 + 9] = √25 = 5 ✓" },
              { text: "7", isCorrect: false, explanation: "Check your calculation: (5-1)² + (5-2)² = 16 + 9 = 25" },
              { text: "25", isCorrect: false, explanation: "Don't forget to take the square root: √25 = 5" }
            ]
          },
          {
            text: "<strong>Percentage Problem:</strong><br/>If x represents a price and it increases by 25%, what is the new price in terms of x?",
            options: [
              { text: "x + 25", isCorrect: false, explanation: "25% means 25% of x, not just adding 25" },
              { text: "1.25x", isCorrect: true, explanation: "Perfect! A 25% increase means the new price is 100% + 25% = 125% = 1.25x ✓" },
              { text: "x + 0.25", isCorrect: false, explanation: "25% of x is 0.25x, so new price is x + 0.25x = 1.25x" },
              { text: "0.25x", isCorrect: false, explanation: "This is just the increase amount, not the new total price" }
            ]
          }
        ]
      },
      9: {
        title: "Interactive Quiz: Test Your Angle Knowledge!",
        intro: "Master angle relationships with these 6 essential geometry problems!",
        questions: [
          {
            text: "<strong>Vertical Angles:</strong><br/>Two intersecting lines form four angles. If one angle measures 65°, what is the measure of the angle directly opposite to it?",
            options: [
              { text: "25°", isCorrect: false, explanation: "Vertical angles are not complementary. They are equal to each other." },
              { text: "65°", isCorrect: true, explanation: "Perfect! Vertical angles (opposite angles formed by intersecting lines) are always equal. So the opposite angle is also 65°." },
              { text: "115°", isCorrect: false, explanation: "This would be a supplementary angle (adjacent, not opposite). Vertical angles are equal." },
              { text: "130°", isCorrect: false, explanation: "Vertical angles are congruent, not double the original angle." }
            ]
          },
          {
            text: "<strong>Supplementary Angles:</strong><br/>Two adjacent angles form a straight line. If one angle measures 42°, what is the measure of the other angle?",
            options: [
              { text: "48°", isCorrect: false, explanation: "These would be complementary (adding to 90°). Supplementary angles add to 180°." },
              { text: "138°", isCorrect: true, explanation: "Excellent! Supplementary angles add to 180°. So 180° - 42° = 138°." },
              { text: "42°", isCorrect: false, explanation: "This would make them vertical angles. Adjacent angles forming a line are supplementary." },
              { text: "318°", isCorrect: false, explanation: "Angles on a straight line add to 180°, not 360°." }
            ]
          },
          {
            text: "<strong>Triangle Angles:</strong><br/>In a triangle, two angles measure 45° and 60°. What is the measure of the third angle?",
            options: [
              { text: "75°", isCorrect: true, explanation: "Perfect! The sum of angles in any triangle is 180°. So 180° - 45° - 60° = 75°." },
              { text: "105°", isCorrect: false, explanation: "Check your calculation: 45° + 60° + ? = 180°, so ? = 75°." },
              { text: "85°", isCorrect: false, explanation: "The sum would be 190°, which exceeds 180° for a triangle." },
              { text: "30°", isCorrect: false, explanation: "This would make the sum only 135°, which is less than 180°." }
            ]
          },
          {
            text: "<strong>Parallel Lines:</strong><br/>Two parallel lines are cut by a transversal. If one interior angle measures 110°, what is the measure of its corresponding angle?",
            options: [
              { text: "70°", isCorrect: false, explanation: "This would be the supplementary angle. Corresponding angles are equal when lines are parallel." },
              { text: "110°", isCorrect: true, explanation: "Perfect! When parallel lines are cut by a transversal, corresponding angles are congruent (equal)." },
              { text: "180°", isCorrect: false, explanation: "No single angle in this setup measures 180°. Corresponding angles are equal." },
              { text: "220°", isCorrect: false, explanation: "Angles cannot exceed 180° in standard geometry problems." }
            ]
          },
          {
            text: "<strong>Exterior Angle:</strong><br/>In a triangle, an exterior angle measures 125°. If one of the remote interior angles measures 55°, what is the measure of the other remote interior angle?",
            options: [
              { text: "70°", isCorrect: true, explanation: "Excellent! An exterior angle equals the sum of the two remote interior angles: 125° = 55° + ? So ? = 70°." },
              { text: "55°", isCorrect: false, explanation: "This would make both remote interior angles equal, but 55° + 55° = 110° ≠ 125°." },
              { text: "180°", isCorrect: false, explanation: "No interior angle of a triangle can be 180°." },
              { text: "125°", isCorrect: false, explanation: "This is the exterior angle, not an interior angle." }
            ]
          },
          {
            text: "<strong>Complementary Angles:</strong><br/>Two angles are complementary. If one angle is 3 times the other, what is the measure of the smaller angle?",
            options: [
              { text: "22.5°", isCorrect: true, explanation: "Perfect! Let the smaller angle = x, then the larger = 3x. Since they're complementary: x + 3x = 90°, so 4x = 90°, x = 22.5°." },
              { text: "30°", isCorrect: false, explanation: "If one angle is 30°, the other would be 90°, but 30° × 3 ≠ 90°." },
              { text: "45°", isCorrect: false, explanation: "If both angles were 45°, one wouldn't be 3 times the other." },
              { text: "67.5°", isCorrect: false, explanation: "This would be the larger angle (3 × 22.5°), not the smaller one." }
            ]
          }
        ]
      },
      10: {
        title: "Interactive Quiz: Test Your Shape & Area Skills!",
        intro: "Master area formulas and shape properties with these 6 essential problems!",
        questions: [
          {
            text: "<strong>Rectangle Area:</strong><br/>A rectangle has length 8 cm and width 5 cm. What is its area?",
            options: [
              { text: "13 cm²", isCorrect: false, explanation: "This is the perimeter calculation (8 + 5). Area = length × width." },
              { text: "26 cm²", isCorrect: false, explanation: "This is the perimeter (2 × 8 + 2 × 5). For area, multiply length × width." },
              { text: "40 cm²", isCorrect: true, explanation: "Perfect! Area of rectangle = length × width = 8 × 5 = 40 cm²." },
              { text: "80 cm²", isCorrect: false, explanation: "You might have doubled the correct answer. Area = 8 × 5 = 40 cm²." }
            ]
          },
          {
            text: "<strong>Triangle Area:</strong><br/>A triangle has base 12 meters and height 8 meters. What is its area?",
            options: [
              { text: "48 m²", isCorrect: true, explanation: "Excellent! Area of triangle = ½ × base × height = ½ × 12 × 8 = 48 m²." },
              { text: "96 m²", isCorrect: false, explanation: "You forgot to multiply by ½. Triangle area = ½ × base × height." },
              { text: "20 m²", isCorrect: false, explanation: "This is base + height. Use the formula: ½ × base × height." },
              { text: "192 m²", isCorrect: false, explanation: "This is base × height × 2. Triangle area = ½ × base × height." }
            ]
          },
          {
            text: "<strong>Circle Area:</strong><br/>A circle has radius 6 cm. What is its area? (Use π ≈ 3.14)",
            options: [
              { text: "37.68 cm²", isCorrect: false, explanation: "This is the circumference (2πr). Area = πr² = π × 6² = 36π." },
              { text: "113.04 cm²", isCorrect: true, explanation: "Perfect! Area = πr² = 3.14 × 6² = 3.14 × 36 = 113.04 cm²." },
              { text: "226.08 cm²", isCorrect: false, explanation: "You might have used 2πr². The correct formula is πr²." },
              { text: "18.84 cm²", isCorrect: false, explanation: "Check your calculation: π × 6² = 3.14 × 36 = 113.04 cm²." }
            ]
          },
          {
            text: "<strong>Pythagorean Theorem:</strong><br/>A right triangle has legs of 3 cm and 4 cm. What is the length of the hypotenuse?",
            options: [
              { text: "5 cm", isCorrect: true, explanation: "Perfect! Using a² + b² = c²: 3² + 4² = 9 + 16 = 25, so c = √25 = 5 cm. This is the famous 3-4-5 triangle!" },
              { text: "7 cm", isCorrect: false, explanation: "This is just 3 + 4. Use the Pythagorean theorem: √(3² + 4²)." },
              { text: "12 cm", isCorrect: false, explanation: "This is 3 × 4. Use a² + b² = c², then take the square root." },
              { text: "25 cm", isCorrect: false, explanation: "This is 3² + 4² before taking the square root. c = √25 = 5." }
            ]
          },
          {
            text: "<strong>Parallelogram Area:</strong><br/>A parallelogram has base 10 m and height 6 m. What is its area?",
            options: [
              { text: "30 m²", isCorrect: false, explanation: "You might have divided by 2. Parallelogram area = base × height (no ½)." },
              { text: "60 m²", isCorrect: true, explanation: "Excellent! Area of parallelogram = base × height = 10 × 6 = 60 m²." },
              { text: "32 m²", isCorrect: false, explanation: "This looks like perimeter calculation. Area = base × height." },
              { text: "16 m²", isCorrect: false, explanation: "Check your calculation: base × height = 10 × 6 = 60 m²." }
            ]
          },
          {
            text: "<strong>Trapezoid Area:</strong><br/>A trapezoid has parallel sides of 8 cm and 12 cm, with height 5 cm. What is its area?",
            options: [
              { text: "50 cm²", isCorrect: true, explanation: "Perfect! Area of trapezoid = ½ × (sum of parallel sides) × height = ½ × (8 + 12) × 5 = ½ × 20 × 5 = 50 cm²." },
              { text: "100 cm²", isCorrect: false, explanation: "You forgot the ½. Trapezoid area = ½ × (b₁ + b₂) × h." },
              { text: "25 cm²", isCorrect: false, explanation: "Check your calculation: ½ × (8 + 12) × 5 = ½ × 20 × 5 = 50 cm²." },
              { text: "480 cm²", isCorrect: false, explanation: "This is much too large. Use: ½ × (sum of bases) × height." }
            ]
          }
        ]
      },
      11: {
        title: "Interactive Quiz: Test Your Lines & Coordinates Skills!",
        intro: "Master slope, distance, and midpoint formulas with these 6 essential problems!",
        questions: [
          {
            text: "<strong>Slope Formula:</strong><br/>What is the slope of the line passing through points (2, 3) and (6, 11)?",
            options: [
              { text: "2", isCorrect: true, explanation: "Perfect! Slope = (y₂ - y₁)/(x₂ - x₁) = (11 - 3)/(6 - 2) = 8/4 = 2." },
              { text: "4", isCorrect: false, explanation: "This is the change in x. Use slope = change in y / change in x = 8/4 = 2." },
              { text: "8", isCorrect: false, explanation: "This is the change in y. Remember to divide by change in x: 8/4 = 2." },
              { text: "1/2", isCorrect: false, explanation: "You might have inverted the fraction. Slope = (11-3)/(6-2) = 8/4 = 2." }
            ]
          },
          {
            text: "<strong>Distance Formula:</strong><br/>What is the distance between points (-1, 2) and (3, 5)?",
            options: [
              { text: "3", isCorrect: false, explanation: "This is just the change in y. Use the full distance formula: √[(x₂-x₁)² + (y₂-y₁)²]." },
              { text: "4", isCorrect: false, explanation: "This is just the change in x. Use the distance formula with both coordinates." },
              { text: "5", isCorrect: true, explanation: "Excellent! Distance = √[(3-(-1))² + (5-2)²] = √[4² + 3²] = √[16 + 9] = √25 = 5." },
              { text: "7", isCorrect: false, explanation: "Check your calculation: √[(3-(-1))² + (5-2)²] = √[16 + 9] = √25 = 5." }
            ]
          },
          {
            text: "<strong>Midpoint Formula:</strong><br/>What is the midpoint of the line segment with endpoints (1, 4) and (7, 10)?",
            options: [
              { text: "(3, 6)", isCorrect: false, explanation: "Check your calculation: midpoint = ((1+7)/2, (4+10)/2) = (8/2, 14/2) = (4, 7)." },
              { text: "(4, 7)", isCorrect: true, explanation: "Perfect! Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2) = ((1+7)/2, (4+10)/2) = (4, 7)." },
              { text: "(6, 6)", isCorrect: false, explanation: "The x-coordinate is wrong. Average the x-coordinates: (1+7)/2 = 4." },
              { text: "(8, 14)", isCorrect: false, explanation: "You forgot to divide by 2. Midpoint uses averages: ((1+7)/2, (4+10)/2)." }
            ]
          },
          {
            text: "<strong>Point-Slope Form:</strong><br/>What is the equation of the line with slope 3 passing through point (2, 5)?",
            options: [
              { text: "y = 3x - 1", isCorrect: true, explanation: "Perfect! Using point-slope form: y - 5 = 3(x - 2) → y - 5 = 3x - 6 → y = 3x - 1." },
              { text: "y = 3x + 11", isCorrect: false, explanation: "Check your algebra: y - 5 = 3(x - 2) → y = 3x - 6 + 5 = 3x - 1." },
              { text: "y = 3x + 5", isCorrect: false, explanation: "You might have used y = mx + b incorrectly. Substitute the point to find b." },
              { text: "y = -3x + 11", isCorrect: false, explanation: "The slope should be positive 3. Check your point-slope calculation." }
            ]
          },
          {
            text: "<strong>Parallel Lines:</strong><br/>What is the slope of a line parallel to the line y = -2x + 7?",
            options: [
              { text: "2", isCorrect: false, explanation: "This is the opposite of the given slope. Parallel lines have the same slope." },
              { text: "-2", isCorrect: true, explanation: "Excellent! Parallel lines have identical slopes. The slope of y = -2x + 7 is -2." },
              { text: "1/2", isCorrect: false, explanation: "This would be the slope of a perpendicular line. Parallel lines have the same slope." },
              { text: "7", isCorrect: false, explanation: "This is the y-intercept, not the slope. The slope is the coefficient of x." }
            ]
          },
          {
            text: "<strong>Perpendicular Lines:</strong><br/>What is the slope of a line perpendicular to the line with slope 4?",
            options: [
              { text: "4", isCorrect: false, explanation: "This would be a parallel line. Perpendicular lines have negative reciprocal slopes." },
              { text: "-4", isCorrect: false, explanation: "This is just the negative. Perpendicular lines have negative reciprocal slopes." },
              { text: "-1/4", isCorrect: true, explanation: "Perfect! Perpendicular lines have slopes that are negative reciprocals. The negative reciprocal of 4 is -1/4." },
              { text: "1/4", isCorrect: false, explanation: "Don't forget the negative sign. Perpendicular slopes are negative reciprocals: -1/4." }
            ]
          }
        ]
      },
      12: {
        title: "Interactive Quiz: Test Your Fraction Skills!",
        intro: "Master fraction operations and calculator techniques with these 6 problems!",
        questions: [
          {
            text: "<strong>Adding Fractions:</strong><br/>What is 3/4 + 2/5?",
            options: [
              { text: "5/9", isCorrect: false, explanation: "You can't just add numerators and denominators. Find a common denominator first." },
              { text: "6/20", isCorrect: false, explanation: "This is 3/4 × 2/5, not addition. For addition, find common denominator: LCD of 4 and 5 is 20." },
              { text: "23/20", isCorrect: true, explanation: "Perfect! 3/4 + 2/5 = 15/20 + 8/20 = 23/20 (using common denominator 20)." },
              { text: "1 3/20", isCorrect: false, explanation: "Convert to improper fraction: 23/20. This equals 1 3/20, but the answer format is 23/20." }
            ]
          },
          {
            text: "<strong>Multiplying Fractions:</strong><br/>What is 2/3 × 4/5?",
            options: [
              { text: "6/8", isCorrect: false, explanation: "For multiplication, multiply straight across: (2×4)/(3×5) = 8/15." },
              { text: "8/15", isCorrect: true, explanation: "Excellent! When multiplying fractions: (2×4)/(3×5) = 8/15." },
              { text: "6/15", isCorrect: false, explanation: "Check your numerator: 2 × 4 = 8, not 6." },
              { text: "8/8", isCorrect: false, explanation: "Check your denominator: 3 × 5 = 15, not 8." }
            ]
          },
          {
            text: "<strong>Dividing Fractions:</strong><br/>What is 3/4 ÷ 2/3?",
            options: [
              { text: "6/12", isCorrect: false, explanation: "To divide fractions, multiply by the reciprocal: 3/4 × 3/2." },
              { text: "9/8", isCorrect: true, explanation: "Perfect! 3/4 ÷ 2/3 = 3/4 × 3/2 = 9/8 (multiply by reciprocal)." },
              { text: "6/7", isCorrect: false, explanation: "Remember: dividing by a fraction means multiplying by its reciprocal." },
              { text: "1/2", isCorrect: false, explanation: "Check your calculation: 3/4 × 3/2 = 9/8." }
            ]
          },
          {
            text: "<strong>Converting to Decimal:</strong><br/>What is 3/8 as a decimal?",
            options: [
              { text: "0.375", isCorrect: true, explanation: "Perfect! 3 ÷ 8 = 0.375. You can also remember that 1/8 = 0.125, so 3/8 = 3 × 0.125 = 0.375." },
              { text: "0.3", isCorrect: false, explanation: "This would be 3/10. To convert 3/8, divide: 3 ÷ 8 = 0.375." },
              { text: "0.38", isCorrect: false, explanation: "Close! But 3 ÷ 8 = 0.375, not 0.38." },
              { text: "0.5", isCorrect: false, explanation: "This is 1/2 or 4/8. For 3/8, divide: 3 ÷ 8 = 0.375." }
            ]
          },
          {
            text: "<strong>Fraction Word Problem:</strong><br/>Sarah ate 2/5 of a pizza and John ate 1/4 of the same pizza. What fraction of the pizza did they eat together?",
            options: [
              { text: "3/9", isCorrect: false, explanation: "You can't just add numerators and denominators. Find common denominator: LCD of 5 and 4 is 20." },
              { text: "2/20", isCorrect: false, explanation: "This is just 2/5 converted. Don't forget to add John's portion: 1/4." },
              { text: "13/20", isCorrect: true, explanation: "Excellent! 2/5 + 1/4 = 8/20 + 5/20 = 13/20 (using common denominator 20)." },
              { text: "7/20", isCorrect: false, explanation: "Check your addition: 8/20 + 5/20 = 13/20." }
            ]
          },
          {
            text: "<strong>Simplifying Fractions:</strong><br/>What is 18/24 in simplest form?",
            options: [
              { text: "9/12", isCorrect: false, explanation: "This can be simplified further. Both 9 and 12 are divisible by 3." },
              { text: "6/8", isCorrect: false, explanation: "This can be simplified further. Both 6 and 8 are divisible by 2." },
              { text: "3/4", isCorrect: true, explanation: "Perfect! 18/24 = (18÷6)/(24÷6) = 3/4. The GCD of 18 and 24 is 6." },
              { text: "2/3", isCorrect: false, explanation: "Check your division: 18÷6 = 3 and 24÷6 = 4, so 18/24 = 3/4." }
            ]
          }
        ]
      },
      13: {
        title: "Interactive Quiz: Test Your Algebra Skills!",
        intro: "Master fundamental algebra operations with these 6 essential problems!",
        questions: [
          {
            text: "<strong>Order of Operations:</strong><br/>What is the value of 3 + 2 × 4² - 5?",
            options: [
              { text: "18", isCorrect: false, explanation: "Remember PEMDAS: exponents first (4² = 16), then multiplication (2 × 16 = 32), then addition and subtraction left to right." },
              { text: "30", isCorrect: true, explanation: "Perfect! Following PEMDAS: 3 + 2 × 4² - 5 = 3 + 2 × 16 - 5 = 3 + 32 - 5 = 30." },
              { text: "75", isCorrect: false, explanation: "You might have calculated (3 + 2) × 4² - 5. Remember to follow PEMDAS order." },
              { text: "95", isCorrect: false, explanation: "Check your order of operations: exponents first, then multiplication, then addition/subtraction." }
            ]
          },
          {
            text: "<strong>Combining Like Terms:</strong><br/>Simplify: 3x + 5x - 2x + 7",
            options: [
              { text: "6x + 7", isCorrect: true, explanation: "Excellent! Combine like terms: 3x + 5x - 2x = 6x, so the answer is 6x + 7." },
              { text: "8x + 7", isCorrect: false, explanation: "Check your arithmetic: 3 + 5 - 2 = 6, not 8." },
              { text: "6x + 2", isCorrect: false, explanation: "The constant term is +7, not +2." },
              { text: "10x + 7", isCorrect: false, explanation: "You might have added all coefficients: 3 + 5 - 2 = 6, not 10." }
            ]
          },
          {
            text: "<strong>Distributive Property:</strong><br/>Expand: 3(2x - 4)",
            options: [
              { text: "6x - 12", isCorrect: true, explanation: "Perfect! Using distributive property: 3(2x - 4) = 3 × 2x - 3 × 4 = 6x - 12." },
              { text: "6x - 4", isCorrect: false, explanation: "Don't forget to multiply 3 by both terms: 3 × (-4) = -12." },
              { text: "5x - 7", isCorrect: false, explanation: "This looks like addition instead of multiplication. Use distributive property: 3 × 2x and 3 × (-4)." },
              { text: "6x + 12", isCorrect: false, explanation: "Watch the sign: 3 × (-4) = -12, not +12." }
            ]
          },
          {
            text: "<strong>Solving Linear Equations:</strong><br/>Solve for x: 2x + 7 = 15",
            options: [
              { text: "x = 4", isCorrect: true, explanation: "Excellent! Subtract 7 from both sides: 2x = 8, then divide by 2: x = 4." },
              { text: "x = 8", isCorrect: false, explanation: "You forgot to divide by 2. After 2x = 8, divide both sides by 2." },
              { text: "x = 11", isCorrect: false, explanation: "Check your work: 2(11) + 7 = 29 ≠ 15. The correct answer is x = 4." },
              { text: "x = 22", isCorrect: false, explanation: "This would be if you multiplied instead of dividing. Solve: 2x = 8, so x = 4." }
            ]
          },
          {
            text: "<strong>Factoring:</strong><br/>Factor: x² + 5x + 6",
            options: [
              { text: "(x + 2)(x + 3)", isCorrect: true, explanation: "Perfect! Find two numbers that multiply to 6 and add to 5: 2 and 3. So x² + 5x + 6 = (x + 2)(x + 3)." },
              { text: "(x + 1)(x + 6)", isCorrect: false, explanation: "Check: (x + 1)(x + 6) = x² + 7x + 6. We need the middle term to be 5x." },
              { text: "(x - 2)(x - 3)", isCorrect: false, explanation: "This would give x² - 5x + 6. We need +5x, so both factors should be positive." },
              { text: "(x + 5)(x + 1)", isCorrect: false, explanation: "Check: (x + 5)(x + 1) = x² + 6x + 5. The constant term should be 6." }
            ]
          },
          {
            text: "<strong>Working with Exponents:</strong><br/>Simplify: x³ × x⁵",
            options: [
              { text: "x⁸", isCorrect: true, explanation: "Perfect! When multiplying powers with the same base, add exponents: x³ × x⁵ = x³⁺⁵ = x⁸." },
              { text: "x¹⁵", isCorrect: false, explanation: "You multiplied the exponents. When multiplying powers, add the exponents: 3 + 5 = 8." },
              { text: "x²", isCorrect: false, explanation: "You subtracted the exponents. For multiplication, add them: 3 + 5 = 8." },
              { text: "2x⁸", isCorrect: false, explanation: "The coefficient stays 1. When multiplying powers with same base, just add exponents." }
            ]
          }
        ]
      },
      14: {
        title: "Interactive Quiz: Test Your Number Theory Skills!",
        intro: "Master number types, GCD, LCM, and solution types with these 6 problems!",
        questions: [
          {
            text: "<strong>Prime Numbers:</strong><br/>Which of the following is a prime number?",
            options: [
              { text: "15", isCorrect: false, explanation: "15 = 3 × 5, so it has factors other than 1 and itself." },
              { text: "17", isCorrect: true, explanation: "Perfect! 17 is prime because its only factors are 1 and 17." },
              { text: "21", isCorrect: false, explanation: "21 = 3 × 7, so it has factors other than 1 and itself." },
              { text: "25", isCorrect: false, explanation: "25 = 5 × 5, so it has factors other than 1 and itself." }
            ]
          },
          {
            text: "<strong>Greatest Common Divisor (GCD):</strong><br/>What is the GCD of 18 and 24?",
            options: [
              { text: "2", isCorrect: false, explanation: "Both numbers are divisible by larger numbers. Find the largest common factor." },
              { text: "3", isCorrect: false, explanation: "Both are divisible by 3, but there's a larger common factor." },
              { text: "6", isCorrect: true, explanation: "Perfect! 18 = 2 × 3² and 24 = 2³ × 3, so GCD = 2 × 3 = 6." },
              { text: "72", isCorrect: false, explanation: "This is the LCM (Least Common Multiple), not the GCD." }
            ]
          },
          {
            text: "<strong>Least Common Multiple (LCM):</strong><br/>What is the LCM of 12 and 15?",
            options: [
              { text: "3", isCorrect: false, explanation: "This is the GCD. LCM is the smallest number that both 12 and 15 divide into." },
              { text: "27", isCorrect: false, explanation: "Check: is 27 divisible by both 12 and 15? 27 ÷ 12 = 2.25 (not a whole number)." },
              { text: "60", isCorrect: true, explanation: "Perfect! 12 = 2² × 3 and 15 = 3 × 5, so LCM = 2² × 3 × 5 = 60." },
              { text: "180", isCorrect: false, explanation: "This is too large. The LCM is the smallest common multiple: 60." }
            ]
          },
          {
            text: "<strong>Even vs Odd:</strong><br/>If n is an odd integer, which expression must be even?",
            options: [
              { text: "n + 1", isCorrect: true, explanation: "Perfect! If n is odd, then n + 1 is even (odd + odd = even, but odd + 1 = even)." },
              { text: "n + 3", isCorrect: false, explanation: "If n is odd, then n + 3 is even (odd + odd = even), but this isn't the simplest answer." },
              { text: "2n + 1", isCorrect: false, explanation: "2n is always even, so 2n + 1 is always odd." },
              { text: "n²", isCorrect: false, explanation: "If n is odd, then n² is also odd (odd × odd = odd)." }
            ]
          },
          {
            text: "<strong>Rational Numbers:</strong><br/>Which of the following is a rational number?",
            options: [
              { text: "π", isCorrect: false, explanation: "π is irrational - it cannot be expressed as a fraction of integers." },
              { text: "√2", isCorrect: false, explanation: "√2 is irrational - it cannot be expressed as a fraction of integers." },
              { text: "0.75", isCorrect: true, explanation: "Perfect! 0.75 = 3/4, which is a ratio of integers, so it's rational." },
              { text: "√3", isCorrect: false, explanation: "√3 is irrational - it cannot be expressed as a fraction of integers." }
            ]
          },
          {
            text: "<strong>Integer Types:</strong><br/>Which set contains only integers?",
            options: [
              { text: "{-2, 0, 1.5, 3}", isCorrect: false, explanation: "1.5 is not an integer (it's between 1 and 2)." },
              { text: "{-3, -1, 0, 2, 5}", isCorrect: true, explanation: "Perfect! All numbers are whole numbers or their negatives, which defines integers." },
              { text: "{0, 1, 2, 2.5, 4}", isCorrect: false, explanation: "2.5 is not an integer (it's between 2 and 3)." },
              { text: "{1/2, 1, 3/2, 2}", isCorrect: false, explanation: "1/2 and 3/2 are fractions, not integers." }
            ]
          }
        ]
      },
      15: {
        title: "Interactive Quiz: Test Your Percentage Skills!",
        intro: "Master percentage calculations and real-world applications with these 6 problems!",
        questions: [
          {
            text: "<strong>Basic Percentage:</strong><br/>What is 25% of 80?",
            options: [
              { text: "15", isCorrect: false, explanation: "Check your calculation: 25% = 0.25, so 0.25 × 80 = 20." },
              { text: "20", isCorrect: true, explanation: "Perfect! 25% of 80 = 0.25 × 80 = 20." },
              { text: "25", isCorrect: false, explanation: "This would be 25% of 100. For 80: 0.25 × 80 = 20." },
              { text: "32", isCorrect: false, explanation: "This looks like 40% of 80. Check: 25% = 0.25, so 0.25 × 80 = 20." }
            ]
          },
          {
            text: "<strong>Percentage Increase:</strong><br/>A price increases from $40 to $50. What is the percentage increase?",
            options: [
              { text: "10%", isCorrect: false, explanation: "The increase is $10, but percentage increase = (increase/original) × 100% = (10/40) × 100%." },
              { text: "20%", isCorrect: false, explanation: "Check your calculation: (50-40)/40 × 100% = 10/40 × 100% = 25%." },
              { text: "25%", isCorrect: true, explanation: "Perfect! Percentage increase = (50-40)/40 × 100% = 10/40 × 100% = 25%." },
              { text: "125%", isCorrect: false, explanation: "This would be if you used 50/40. Use (new-old)/old for percentage change." }
            ]
          },
          {
            text: "<strong>Percentage Decrease:</strong><br/>A $60 item is marked down by 30%. What is the sale price?",
            options: [
              { text: "$30", isCorrect: false, explanation: "This would be 50% off. With 30% off: $60 - $18 = $42." },
              { text: "$42", isCorrect: true, explanation: "Perfect! 30% of $60 = $18, so sale price = $60 - $18 = $42." },
              { text: "$48", isCorrect: false, explanation: "This would be 20% off. Check: 30% of $60 = $18, so $60 - $18 = $42." },
              { text: "$78", isCorrect: false, explanation: "This adds the discount instead of subtracting it. Sale price = $60 - $18 = $42." }
            ]
          },
          {
            text: "<strong>Finding the Whole:</strong><br/>If 15% of a number is 24, what is the number?",
            options: [
              { text: "3.6", isCorrect: false, explanation: "This is 15% of 24. Set up: 0.15 × n = 24, so n = 24 ÷ 0.15." },
              { text: "39", isCorrect: false, explanation: "Check: 15% of 39 = 5.85 ≠ 24. Use n = 24 ÷ 0.15." },
              { text: "160", isCorrect: true, explanation: "Perfect! If 15% of n = 24, then 0.15n = 24, so n = 24 ÷ 0.15 = 160." },
              { text: "360", isCorrect: false, explanation: "This is too large. Check: 24 ÷ 0.15 = 160." }
            ]
          },
          {
            text: "<strong>Compound Percentage:</strong><br/>An item costs $100. After a 20% increase, then a 10% decrease, what is the final price?",
            options: [
              { text: "$90", isCorrect: false, explanation: "You can't just subtract percentages. Calculate step by step: 100 → 120 → 108." },
              { text: "$100", isCorrect: false, explanation: "The changes don't cancel out. Calculate: 100 × 1.20 × 0.90 = 108." },
              { text: "$108", isCorrect: true, explanation: "Perfect! $100 × 1.20 = $120, then $120 × 0.90 = $108." },
              { text: "$110", isCorrect: false, explanation: "This treats it as +20% -10% = +10%. But percentage changes multiply, not add." }
            ]
          },
          {
            text: "<strong>Percentage of Percentage:</strong><br/>What is 40% of 25% of 200?",
            options: [
              { text: "20", isCorrect: true, explanation: "Perfect! 25% of 200 = 50, then 40% of 50 = 20. Or: 0.40 × 0.25 × 200 = 20." },
              { text: "50", isCorrect: false, explanation: "This is just 25% of 200. Don't forget to take 40% of that result." },
              { text: "65", isCorrect: false, explanation: "This looks like 40% + 25% = 65%. But we need 40% OF 25%, which means multiply." },
              { text: "80", isCorrect: false, explanation: "This is 40% of 200. We need 40% of (25% of 200)." }
            ]
          }
        ]
      },
      16: {
        title: "Interactive Quiz: Test Your Exponents & Roots Skills!",
        intro: "Master exponent rules and radical operations with these 6 problems!",
        questions: [
          {
            text: "<strong>Exponent Rules:</strong><br/>Simplify: 2⁴ × 2³",
            options: [
              { text: "2⁷", isCorrect: true, explanation: "Perfect! When multiplying powers with the same base, add exponents: 2⁴ × 2³ = 2⁴⁺³ = 2⁷." },
              { text: "2¹²", isCorrect: false, explanation: "This would be if you multiplied the exponents. Remember: add exponents when multiplying same bases." },
              { text: "4⁷", isCorrect: false, explanation: "The base stays the same. Only add the exponents: 2⁴ × 2³ = 2⁷." },
              { text: "128", isCorrect: false, explanation: "While 2⁷ = 128, the expression should be left as 2⁷." }
            ]
          },
          {
            text: "<strong>Zero Exponent:</strong><br/>Evaluate: 5⁰",
            options: [
              { text: "0", isCorrect: false, explanation: "Any non-zero number raised to the power of 0 equals 1, not 0." },
              { text: "1", isCorrect: true, explanation: "Perfect! Any non-zero number raised to the power of 0 equals 1." },
              { text: "5", isCorrect: false, explanation: "This would be 5¹. Remember: any non-zero number to the 0 power is 1." },
              { text: "Undefined", isCorrect: false, explanation: "5⁰ is defined and equals 1. Only 0⁰ is sometimes considered undefined." }
            ]
          },
          {
            text: "<strong>Square Root:</strong><br/>Simplify: √36",
            options: [
              { text: "6", isCorrect: true, explanation: "Perfect! √36 = 6 because 6² = 36." },
              { text: "±6", isCorrect: false, explanation: "√36 represents the principal (positive) square root, which is 6." },
              { text: "18", isCorrect: false, explanation: "This is 36 ÷ 2. The square root asks: what number squared gives 36?" },
              { text: "3", isCorrect: false, explanation: "3² = 9, not 36. We need 6² = 36." }
            ]
          },
          {
            text: "<strong>Cube Root:</strong><br/>Evaluate: ∛64",
            options: [
              { text: "4", isCorrect: true, explanation: "Perfect! ∛64 = 4 because 4³ = 64." },
              { text: "8", isCorrect: false, explanation: "8² = 64, but we need the cube root. 4³ = 64." },
              { text: "16", isCorrect: false, explanation: "This is too large. Check: 4³ = 4 × 4 × 4 = 64." },
              { text: "21.33...", isCorrect: false, explanation: "This is 64 ÷ 3. We need the number that when cubed gives 64." }
            ]
          },
          {
            text: "<strong>Negative Exponent:</strong><br/>Simplify: 3⁻²",
            options: [
              { text: "-9", isCorrect: false, explanation: "Negative exponents don't make the answer negative. 3⁻² = 1/3² = 1/9." },
              { text: "1/9", isCorrect: true, explanation: "Perfect! 3⁻² = 1/3² = 1/9. Negative exponents mean 'take the reciprocal'." },
              { text: "6", isCorrect: false, explanation: "This isn't correct. 3⁻² = 1/3² = 1/9." },
              { text: "9", isCorrect: false, explanation: "This would be 3². With negative exponent: 3⁻² = 1/3² = 1/9." }
            ]
          },
          {
            text: "<strong>Fractional Exponent:</strong><br/>Evaluate: 16^(1/2)",
            options: [
              { text: "4", isCorrect: true, explanation: "Perfect! 16^(1/2) = √16 = 4. A fractional exponent 1/2 means square root." },
              { text: "8", isCorrect: false, explanation: "This is 16 ÷ 2. The exponent 1/2 means square root, so √16 = 4." },
              { text: "256", isCorrect: false, explanation: "This would be 16². The exponent 1/2 means square root: √16 = 4." },
              { text: "32", isCorrect: false, explanation: "This is 16 × 2. Remember: 16^(1/2) = √16 = 4." }
            ]
          }
        ]
      },
      17: {
        title: "Interactive Quiz: Test Your Statistics Basics Skills!",
        intro: "Master mean, median, mode, and range with these 6 problems!",
        questions: [
          {
            text: "<strong>Mean (Average):</strong><br/>Find the mean of: 4, 7, 9, 12, 18",
            options: [
              { text: "9", isCorrect: false, explanation: "This is the median (middle value). Mean = sum ÷ count = 50 ÷ 5 = 10." },
              { text: "10", isCorrect: true, explanation: "Perfect! Mean = (4 + 7 + 9 + 12 + 18) ÷ 5 = 50 ÷ 5 = 10." },
              { text: "11", isCorrect: false, explanation: "Check your addition: 4 + 7 + 9 + 12 + 18 = 50, then 50 ÷ 5 = 10." },
              { text: "14", isCorrect: false, explanation: "This is the range (18 - 4). Mean = sum ÷ count = 50 ÷ 5 = 10." }
            ]
          },
          {
            text: "<strong>Median:</strong><br/>Find the median of: 3, 8, 12, 15, 20, 22",
            options: [
              { text: "12", isCorrect: false, explanation: "With 6 numbers, median is the average of the 3rd and 4th values: (12 + 15) ÷ 2." },
              { text: "13.5", isCorrect: true, explanation: "Perfect! With even numbers, median = average of middle two values = (12 + 15) ÷ 2 = 13.5." },
              { text: "15", isCorrect: false, explanation: "This is the 4th value. With 6 numbers, take the average of 3rd and 4th: (12 + 15) ÷ 2." },
              { text: "13.3", isCorrect: false, explanation: "This is the mean. Median with even numbers = (12 + 15) ÷ 2 = 13.5." }
            ]
          },
          {
            text: "<strong>Mode:</strong><br/>Find the mode of: 2, 5, 7, 5, 9, 5, 3",
            options: [
              { text: "5", isCorrect: true, explanation: "Perfect! Mode is the most frequent value. 5 appears 3 times, more than any other number." },
              { text: "5.3", isCorrect: false, explanation: "This is approximately the mean. Mode is the most frequent value, which is 5." },
              { text: "7", isCorrect: false, explanation: "7 appears only once. Mode is the most frequent value: 5 appears 3 times." },
              { text: "No mode", isCorrect: false, explanation: "There is a mode! 5 appears 3 times, making it the most frequent." }
            ]
          },
          {
            text: "<strong>Range:</strong><br/>Find the range of: 15, 8, 23, 12, 19, 6",
            options: [
              { text: "13.8", isCorrect: false, explanation: "This is approximately the mean. Range = largest - smallest = 23 - 6." },
              { text: "15.5", isCorrect: false, explanation: "This is the median. Range = largest - smallest = 23 - 6 = 17." },
              { text: "17", isCorrect: true, explanation: "Perfect! Range = largest value - smallest value = 23 - 6 = 17." },
              { text: "23", isCorrect: false, explanation: "This is the largest value. Range = largest - smallest = 23 - 6 = 17." }
            ]
          },
          {
            text: "<strong>Data Set Analysis:</strong><br/>A test has scores: 85, 88, 85, 92, 85, 90. What is the mode?",
            options: [
              { text: "85", isCorrect: true, explanation: "Perfect! 85 appears 3 times, making it the most frequent score (mode)." },
              { text: "87.5", isCorrect: false, explanation: "This is approximately the mean. Mode is the most frequent value: 85." },
              { text: "92", isCorrect: false, explanation: "92 is the highest score, not the mode. 85 appears most frequently." },
              { text: "No mode", isCorrect: false, explanation: "85 appears 3 times, making it the clear mode." }
            ]
          },
          {
            text: "<strong>Mean vs Median:</strong><br/>Dataset: 10, 12, 14, 16, 48. Which is larger?",
            options: [
              { text: "Mean is larger", isCorrect: true, explanation: "Perfect! Mean = 20, Median = 14. The outlier (48) pulls the mean higher than the median." },
              { text: "Median is larger", isCorrect: false, explanation: "Mean = (10+12+14+16+48)÷5 = 20, Median = 14. Mean is larger due to the outlier." },
              { text: "They are equal", isCorrect: false, explanation: "Mean = 20, Median = 14. The large outlier (48) makes the mean larger." },
              { text: "Cannot be determined", isCorrect: false, explanation: "We can calculate: Mean = 20, Median = 14. Mean is larger." }
            ]
          }
        ]
      },
      18: {
        title: "Interactive Quiz: Test Your Ratios & Proportions Skills!",
        intro: "Master ratios, proportions, and rate problems with these 6 problems!",
        questions: [
          {
            text: "<strong>Basic Ratio:</strong><br/>Express 12:18 in simplest form.",
            options: [
              { text: "2:3", isCorrect: true, explanation: "Perfect! Divide both terms by their GCD (6): 12÷6 = 2, 18÷6 = 3, so 12:18 = 2:3." },
              { text: "4:6", isCorrect: false, explanation: "This can be simplified further. Divide by 2: 4:6 = 2:3." },
              { text: "6:9", isCorrect: false, explanation: "This can be simplified further. Divide by 3: 6:9 = 2:3." },
              { text: "12:18", isCorrect: false, explanation: "This is not in simplest form. Divide both by 6 to get 2:3." }
            ]
          },
          {
            text: "<strong>Proportion:</strong><br/>Solve for x: 3/5 = x/20",
            options: [
              { text: "12", isCorrect: true, explanation: "Perfect! Cross multiply: 3 × 20 = 5 × x, so 60 = 5x, therefore x = 12." },
              { text: "15", isCorrect: false, explanation: "Check: 15/20 = 3/4 ≠ 3/5. Cross multiply: 3 × 20 = 5x, so x = 12." },
              { text: "9", isCorrect: false, explanation: "This would give 9/20, which doesn't equal 3/5. Cross multiply to get x = 12." },
              { text: "33.3", isCorrect: false, explanation: "Check your calculation. Cross multiply: 3 × 20 = 5x, so x = 60 ÷ 5 = 12." }
            ]
          },
          {
            text: "<strong>Scale Factor:</strong><br/>A map has scale 1:50,000. If two cities are 3 cm apart on the map, what's the actual distance?",
            options: [
              { text: "150 m", isCorrect: false, explanation: "Check your conversion. 3 cm × 50,000 = 150,000 cm = 1,500 m = 1.5 km." },
              { text: "1.5 km", isCorrect: true, explanation: "Perfect! 3 cm × 50,000 = 150,000 cm = 1,500 m = 1.5 km." },
              { text: "15 km", isCorrect: false, explanation: "This is 10 times too large. 150,000 cm = 1,500 m = 1.5 km." },
              { text: "50 km", isCorrect: false, explanation: "This doesn't use the scale correctly. 3 × 50,000 = 150,000 cm = 1.5 km." }
            ]
          },
          {
            text: "<strong>Rate Problem:</strong><br/>A car travels 240 miles in 4 hours. At this rate, how far will it travel in 7 hours?",
            options: [
              { text: "420 miles", isCorrect: true, explanation: "Perfect! Rate = 240 ÷ 4 = 60 mph. Distance = 60 × 7 = 420 miles." },
              { text: "480 miles", isCorrect: false, explanation: "This would be for 8 hours. Rate = 60 mph, so 7 hours = 60 × 7 = 420 miles." },
              { text: "360 miles", isCorrect: false, explanation: "This would be for 6 hours. Rate = 60 mph, so 7 hours = 60 × 7 = 420 miles." },
              { text: "1680 miles", isCorrect: false, explanation: "This multiplies 240 × 7. Find rate first: 240 ÷ 4 = 60 mph, then 60 × 7 = 420." }
            ]
          },
          {
            text: "<strong>Recipe Proportion:</strong><br/>A recipe for 4 people uses 3 cups of flour. How much flour for 10 people?",
            options: [
              { text: "6 cups", isCorrect: false, explanation: "This would be for 8 people. Set up proportion: 3/4 = x/10, so x = 7.5 cups." },
              { text: "7.5 cups", isCorrect: true, explanation: "Perfect! Set up proportion: 3/4 = x/10. Cross multiply: 30 = 4x, so x = 7.5 cups." },
              { text: "8 cups", isCorrect: false, explanation: "Close, but check: 3/4 = x/10 gives x = 30/4 = 7.5 cups." },
              { text: "12 cups", isCorrect: false, explanation: "This would be for 16 people. For 10 people: 3/4 = x/10, so x = 7.5 cups." }
            ]
          },
          {
            text: "<strong>Unit Rate:</strong><br/>12 pencils cost $8. What is the cost per pencil?",
            options: [
              { text: "$0.50", isCorrect: false, explanation: "Check your division: $8 ÷ 12 = $0.667 ≈ $0.67." },
              { text: "$0.67", isCorrect: true, explanation: "Perfect! Unit rate = $8 ÷ 12 pencils = $0.667 ≈ $0.67 per pencil." },
              { text: "$0.75", isCorrect: false, explanation: "This would be if 12 pencils cost $9. We have $8 ÷ 12 = $0.67." },
              { text: "$1.50", isCorrect: false, explanation: "This is too high. $8 ÷ 12 = $0.67 per pencil." }
            ]
          }
        ]
      },
      19: {
        title: "Interactive Quiz: Test Your Functions Skills!",
        intro: "Master function notation, evaluation, and transformations with these 6 problems!",
        questions: [
          {
            text: "<strong>Function Evaluation:</strong><br/>If f(x) = 2x + 3, find f(5).",
            options: [
              { text: "13", isCorrect: true, explanation: "Perfect! f(5) = 2(5) + 3 = 10 + 3 = 13." },
              { text: "10", isCorrect: false, explanation: "You forgot to add 3. f(5) = 2(5) + 3 = 10 + 3 = 13." },
              { text: "8", isCorrect: false, explanation: "Check your calculation: f(5) = 2(5) + 3 = 10 + 3 = 13." },
              { text: "25", isCorrect: false, explanation: "This looks like 5² = 25. Use f(5) = 2(5) + 3 = 13." }
            ]
          },
          {
            text: "<strong>Function Domain:</strong><br/>What is the domain of f(x) = 1/(x-4)?",
            options: [
              { text: "All real numbers", isCorrect: false, explanation: "The function is undefined when x = 4 (division by zero), so x = 4 is excluded." },
              { text: "x ≠ 4", isCorrect: true, explanation: "Perfect! The function is undefined when x - 4 = 0, so x ≠ 4." },
              { text: "x > 4", isCorrect: false, explanation: "x can be less than 4 too. We just can't have x = 4 (division by zero)." },
              { text: "x ≥ 0", isCorrect: false, explanation: "Negative values are allowed. Only x = 4 makes the denominator zero." }
            ]
          },
          {
            text: "<strong>Function Composition:</strong><br/>If f(x) = x + 2 and g(x) = 3x, find f(g(2)).",
            options: [
              { text: "6", isCorrect: false, explanation: "This is g(2). You need f(g(2)): first g(2) = 6, then f(6) = 6 + 2 = 8." },
              { text: "8", isCorrect: true, explanation: "Perfect! First find g(2) = 3(2) = 6, then f(6) = 6 + 2 = 8." },
              { text: "12", isCorrect: false, explanation: "This is 3 × 4. Work inside out: g(2) = 6, then f(6) = 8." },
              { text: "10", isCorrect: false, explanation: "Check your steps: g(2) = 3(2) = 6, then f(6) = 6 + 2 = 8." }
            ]
          },
          {
            text: "<strong>Inverse Function:</strong><br/>If f(x) = 3x - 6, what is f⁻¹(x)?",
            options: [
              { text: "(x + 6)/3", isCorrect: true, explanation: "Perfect! To find inverse: y = 3x - 6, swap variables: x = 3y - 6, solve: y = (x + 6)/3." },
              { text: "(x - 6)/3", isCorrect: false, explanation: "Check your algebra. Start with x = 3y - 6, add 6: x + 6 = 3y, so y = (x + 6)/3." },
              { text: "3x + 6", isCorrect: false, explanation: "This doesn't undo the original function. The inverse is (x + 6)/3." },
              { text: "-3x + 6", isCorrect: false, explanation: "To find inverse, solve x = 3y - 6 for y: y = (x + 6)/3." }
            ]
          },
          {
            text: "<strong>Function Transformation:</strong><br/>How does g(x) = f(x) + 3 transform f(x)?",
            options: [
              { text: "Shifts up 3 units", isCorrect: true, explanation: "Perfect! Adding 3 to the function shifts the entire graph up by 3 units." },
              { text: "Shifts down 3 units", isCorrect: false, explanation: "Adding 3 shifts up. Subtracting 3 would shift down." },
              { text: "Shifts right 3 units", isCorrect: false, explanation: "That would be f(x - 3). Adding to the output shifts vertically." },
              { text: "Shifts left 3 units", isCorrect: false, explanation: "That would be f(x + 3). Adding to the output (y-value) shifts up." }
            ]
          },
          {
            text: "<strong>Piecewise Function:</strong><br/>For f(x) = {x + 1 if x < 0; 2x if x ≥ 0}, find f(-2).",
            options: [
              { text: "-1", isCorrect: true, explanation: "Perfect! Since -2 < 0, use the first piece: f(-2) = -2 + 1 = -1." },
              { text: "-4", isCorrect: false, explanation: "This uses the wrong piece. Since -2 < 0, use f(x) = x + 1: f(-2) = -1." },
              { text: "1", isCorrect: false, explanation: "Check the condition: -2 < 0, so use f(x) = x + 1: f(-2) = -2 + 1 = -1." },
              { text: "3", isCorrect: false, explanation: "This doesn't match either piece. Since -2 < 0: f(-2) = -2 + 1 = -1." }
            ]
          }
        ]
      },
      20: {
        title: "Interactive Quiz: Test Your Advanced Geometry Skills!",
        intro: "Master circles, 3D shapes, and advanced geometric concepts with these 6 problems!",
        questions: [
          {
            text: "<strong>Circle Area:</strong><br/>Find the area of a circle with radius 6.",
            options: [
              { text: "36π", isCorrect: true, explanation: "Perfect! Area = πr² = π(6)² = 36π square units." },
              { text: "12π", isCorrect: false, explanation: "This is the circumference (2πr = 12π). Area = πr² = 36π." },
              { text: "6π", isCorrect: false, explanation: "This would be for radius 6. Area = πr² = π(6)² = 36π." },
              { text: "72π", isCorrect: false, explanation: "Check your calculation: Area = πr² = π(6)² = π(36) = 36π." }
            ]
          },
          {
            text: "<strong>Sphere Volume:</strong><br/>Find the volume of a sphere with radius 3.",
            options: [
              { text: "36π", isCorrect: true, explanation: "Perfect! Volume = (4/3)πr³ = (4/3)π(3)³ = (4/3)π(27) = 36π cubic units." },
              { text: "27π", isCorrect: false, explanation: "This would be if the formula were πr³. The correct formula is (4/3)πr³ = 36π." },
              { text: "12π", isCorrect: false, explanation: "This is the surface area (4πr² = 36π). Volume = (4/3)πr³ = 36π." },
              { text: "108π", isCorrect: false, explanation: "This is 4πr³. The correct formula is (4/3)πr³ = 36π." }
            ]
          },
          {
            text: "<strong>Cylinder Volume:</strong><br/>A cylinder has radius 4 and height 5. Find its volume.",
            options: [
              { text: "80π", isCorrect: true, explanation: "Perfect! Volume = πr²h = π(4)²(5) = π(16)(5) = 80π cubic units." },
              { text: "40π", isCorrect: false, explanation: "This is πrh instead of πr²h. Volume = π(4)²(5) = 80π." },
              { text: "20π", isCorrect: false, explanation: "This is πr²h/4. Volume = πr²h = π(16)(5) = 80π." },
              { text: "320π", isCorrect: false, explanation: "This is too large. Volume = πr²h = π(4)²(5) = 80π." }
            ]
          },
          {
            text: "<strong>Cone Volume:</strong><br/>A cone has radius 6 and height 9. Find its volume.",
            options: [
              { text: "108π", isCorrect: true, explanation: "Perfect! Volume = (1/3)πr²h = (1/3)π(6)²(9) = (1/3)π(36)(9) = 108π cubic units." },
              { text: "324π", isCorrect: false, explanation: "This is the volume without the 1/3 factor. Cone volume = (1/3)πr²h = 108π." },
              { text: "54π", isCorrect: false, explanation: "This is half the correct answer. Volume = (1/3)π(36)(9) = 108π." },
              { text: "36π", isCorrect: false, explanation: "This is just πr². Volume = (1/3)πr²h = (1/3)π(36)(9) = 108π." }
            ]
          },
          {
            text: "<strong>Arc Length:</strong><br/>Find the arc length of a 60° arc in a circle with radius 12.",
            options: [
              { text: "4π", isCorrect: true, explanation: "Perfect! Arc length = (θ/360°) × 2πr = (60°/360°) × 2π(12) = (1/6) × 24π = 4π." },
              { text: "2π", isCorrect: false, explanation: "This would be for a 30° arc. For 60°: (60/360) × 24π = 4π." },
              { text: "8π", isCorrect: false, explanation: "This would be for a 120° arc. For 60°: (1/6) × 24π = 4π." },
              { text: "12π", isCorrect: false, explanation: "This is half the circumference (180°). For 60°: (60/360) × 24π = 4π." }
            ]
          },
          {
            text: "<strong>Sector Area:</strong><br/>Find the area of a 90° sector in a circle with radius 8.",
            options: [
              { text: "16π", isCorrect: true, explanation: "Perfect! Sector area = (θ/360°) × πr² = (90°/360°) × π(8)² = (1/4) × 64π = 16π." },
              { text: "32π", isCorrect: false, explanation: "This would be for a 180° sector. For 90°: (1/4) × 64π = 16π." },
              { text: "8π", isCorrect: false, explanation: "This would be for a 45° sector. For 90°: (90/360) × 64π = 16π." },
              { text: "64π", isCorrect: false, explanation: "This is the entire circle area. For a 90° sector: (1/4) × 64π = 16π." }
            ]
          }
        ]
      },
      21: {
        title: "Interactive Quiz: Test Your Trigonometry Skills!",
        intro: "Master sine, cosine, tangent, and trigonometric identities with these 6 problems!",
        questions: [
          {
            text: "<strong>Basic Trigonometry:</strong><br/>In a right triangle with opposite = 3 and hypotenuse = 5, find sin θ.",
            options: [
              { text: "3/5", isCorrect: true, explanation: "Perfect! sin θ = opposite/hypotenuse = 3/5." },
              { text: "4/5", isCorrect: false, explanation: "This would be cos θ (adjacent/hypotenuse). sin θ = opposite/hypotenuse = 3/5." },
              { text: "3/4", isCorrect: false, explanation: "This would be tan θ (opposite/adjacent). sin θ = opposite/hypotenuse = 3/5." },
              { text: "5/3", isCorrect: false, explanation: "This is the reciprocal. sin θ = opposite/hypotenuse = 3/5." }
            ]
          },
          {
            text: "<strong>Special Angles:</strong><br/>What is cos 60°?",
            options: [
              { text: "1/2", isCorrect: true, explanation: "Perfect! cos 60° = 1/2. This is a standard special angle value." },
              { text: "√3/2", isCorrect: false, explanation: "This is sin 60°. cos 60° = 1/2." },
              { text: "√2/2", isCorrect: false, explanation: "This is cos 45°. cos 60° = 1/2." },
              { text: "0", isCorrect: false, explanation: "This is cos 90°. cos 60° = 1/2." }
            ]
          },
          {
            text: "<strong>Pythagorean Identity:</strong><br/>If sin θ = 3/5, what is cos² θ?",
            options: [
              { text: "16/25", isCorrect: true, explanation: "Perfect! Using sin² θ + cos² θ = 1: (3/5)² + cos² θ = 1, so cos² θ = 1 - 9/25 = 16/25." },
              { text: "4/5", isCorrect: false, explanation: "This is cos θ, not cos² θ. cos² θ = 1 - sin² θ = 1 - 9/25 = 16/25." },
              { text: "9/25", isCorrect: false, explanation: "This is sin² θ. cos² θ = 1 - sin² θ = 1 - 9/25 = 16/25." },
              { text: "7/25", isCorrect: false, explanation: "Check: sin² θ + cos² θ = 1, so cos² θ = 1 - (3/5)² = 16/25." }
            ]
          },
          {
            text: "<strong>Unit Circle:</strong><br/>What is sin 270°?",
            options: [
              { text: "-1", isCorrect: true, explanation: "Perfect! At 270°, we're at the bottom of the unit circle where y = -1, so sin 270° = -1." },
              { text: "0", isCorrect: false, explanation: "This is cos 270°. sin 270° = -1 (y-coordinate at 270°)." },
              { text: "1", isCorrect: false, explanation: "This is sin 90°. sin 270° = -1." },
              { text: "Undefined", isCorrect: false, explanation: "sin is defined for all angles. sin 270° = -1." }
            ]
          },
          {
            text: "<strong>SOH-CAH-TOA:</strong><br/>In a right triangle, if adjacent = 12 and opposite = 5, find tan θ.",
            options: [
              { text: "5/12", isCorrect: true, explanation: "Perfect! tan θ = opposite/adjacent = 5/12." },
              { text: "12/5", isCorrect: false, explanation: "This is the reciprocal (cot θ). tan θ = opposite/adjacent = 5/12." },
              { text: "5/13", isCorrect: false, explanation: "This would be sin θ if hypotenuse = 13. tan θ = opposite/adjacent = 5/12." },
              { text: "12/13", isCorrect: false, explanation: "This would be cos θ if hypotenuse = 13. tan θ = opposite/adjacent = 5/12." }
            ]
          },
          {
            text: "<strong>Reference Angles:</strong><br/>What is sin 150°?",
            options: [
              { text: "1/2", isCorrect: true, explanation: "Perfect! 150° = 180° - 30°, so sin 150° = sin 30° = 1/2 (positive in quadrant II)." },
              { text: "-1/2", isCorrect: false, explanation: "Sin is positive in quadrant II. sin 150° = sin 30° = 1/2." },
              { text: "√3/2", isCorrect: false, explanation: "This is cos 30°. sin 150° = sin 30° = 1/2." },
              { text: "-√3/2", isCorrect: false, explanation: "This is cos 150°. sin 150° = sin 30° = 1/2." }
            ]
          }
        ]
      },
      22: {
        title: "Interactive Quiz: Test Your Sequences & Series Skills!",
        intro: "Master arithmetic sequences, geometric sequences, and series with these 6 problems!",
        questions: [
          {
            text: "<strong>Arithmetic Sequence:</strong><br/>Find the 10th term of the sequence: 3, 7, 11, 15, ...",
            options: [
              { text: "39", isCorrect: true, explanation: "Perfect! This is arithmetic with a₁ = 3, d = 4. a₁₀ = a₁ + (n-1)d = 3 + 9(4) = 39." },
              { text: "35", isCorrect: false, explanation: "This would be the 9th term. a₁₀ = 3 + 9(4) = 3 + 36 = 39." },
              { text: "43", isCorrect: false, explanation: "This would be the 11th term. a₁₀ = 3 + (10-1)(4) = 3 + 36 = 39." },
              { text: "40", isCorrect: false, explanation: "Check the pattern: common difference is 4, so a₁₀ = 3 + 9(4) = 39." }
            ]
          },
          {
            text: "<strong>Geometric Sequence:</strong><br/>Find the 5th term of: 2, 6, 18, 54, ...",
            options: [
              { text: "162", isCorrect: true, explanation: "Perfect! This is geometric with a₁ = 2, r = 3. a₅ = a₁ × r⁴ = 2 × 3⁴ = 2 × 81 = 162." },
              { text: "486", isCorrect: false, explanation: "This would be the 6th term. a₅ = 2 × 3⁴ = 2 × 81 = 162." },
              { text: "108", isCorrect: false, explanation: "Check the pattern: each term is multiplied by 3. a₅ = 2 × 3⁴ = 162." },
              { text: "81", isCorrect: false, explanation: "This is 3⁴. The 5th term is a₅ = 2 × 3⁴ = 162." }
            ]
          },
          {
            text: "<strong>Arithmetic Series:</strong><br/>Find the sum of the first 10 terms: 5, 8, 11, 14, ...",
            options: [
              { text: "185", isCorrect: true, explanation: "Perfect! a₁ = 5, d = 3, a₁₀ = 5 + 9(3) = 32. S₁₀ = n(a₁ + aₙ)/2 = 10(5 + 32)/2 = 185." },
              { text: "170", isCorrect: false, explanation: "Check your calculation. a₁₀ = 32, so S₁₀ = 10(5 + 32)/2 = 10(37)/2 = 185." },
              { text: "200", isCorrect: false, explanation: "This is too high. S₁₀ = 10(first + last)/2 = 10(5 + 32)/2 = 185." },
              { text: "160", isCorrect: false, explanation: "Recheck: a₁₀ = 5 + 9(3) = 32, S₁₀ = 10(5 + 32)/2 = 185." }
            ]
          },
          {
            text: "<strong>Geometric Series:</strong><br/>Find the sum of the first 4 terms: 3, 6, 12, 24, ...",
            options: [
              { text: "45", isCorrect: true, explanation: "Perfect! Sum = 3 + 6 + 12 + 24 = 45. Or use formula: S₄ = 3(2⁴-1)/(2-1) = 3(15) = 45." },
              { text: "48", isCorrect: false, explanation: "This includes the 5th term (48). First 4 terms: 3 + 6 + 12 + 24 = 45." },
              { text: "39", isCorrect: false, explanation: "Check your addition: 3 + 6 + 12 + 24 = 45." },
              { text: "60", isCorrect: false, explanation: "This is too high. Sum of first 4 terms: 3 + 6 + 12 + 24 = 45." }
            ]
          },
          {
            text: "<strong>Finding Terms:</strong><br/>In the arithmetic sequence where a₁ = 7 and d = -3, which term equals -8?",
            options: [
              { text: "6th term", isCorrect: true, explanation: "Perfect! Set aₙ = -8: 7 + (n-1)(-3) = -8. Solving: -3(n-1) = -15, so n-1 = 5, n = 6." },
              { text: "5th term", isCorrect: false, explanation: "a₅ = 7 + 4(-3) = -5. For -8: 7 + (n-1)(-3) = -8 gives n = 6." },
              { text: "7th term", isCorrect: false, explanation: "a₇ = 7 + 6(-3) = -11. For -8: solve 7 + (n-1)(-3) = -8 to get n = 6." },
              { text: "4th term", isCorrect: false, explanation: "a₄ = 7 + 3(-3) = -2. For -8: 7 + (n-1)(-3) = -8 gives n = 6." }
            ]
          },
          {
            text: "<strong>Series Application:</strong><br/>A ball drops from 80 feet and bounces to 3/4 of its previous height each time. How high is the 3rd bounce?",
            options: [
              { text: "33.75 feet", isCorrect: true, explanation: "Perfect! 1st bounce: 80 × 3/4 = 60 ft. 2nd bounce: 60 × 3/4 = 45 ft. 3rd bounce: 45 × 3/4 = 33.75 ft." },
              { text: "45 feet", isCorrect: false, explanation: "This is the 2nd bounce height. 3rd bounce: 45 × 3/4 = 33.75 feet." },
              { text: "60 feet", isCorrect: false, explanation: "This is the 1st bounce height. 3rd bounce: 80 × (3/4)³ = 80 × 27/64 = 33.75 feet." },
              { text: "25.3 feet", isCorrect: false, explanation: "This would be the 4th bounce. 3rd bounce: 80 × (3/4)³ = 33.75 feet." }
            ]
          }
        ]
      },
      23: {
        title: "Interactive Quiz: Test Your Probability & Counting Skills!",
        intro: "Master probability, combinations, and counting principles with these 6 problems!",
        questions: [
          {
            text: "<strong>Basic Probability:</strong><br/>A standard die is rolled. What's the probability of rolling a 3 or 5?",
            options: [
              { text: "1/3", isCorrect: true, explanation: "Perfect! P(3 or 5) = P(3) + P(5) = 1/6 + 1/6 = 2/6 = 1/3." },
              { text: "1/6", isCorrect: false, explanation: "This is the probability of rolling just one specific number. P(3 or 5) = 2/6 = 1/3." },
              { text: "2/3", isCorrect: false, explanation: "This would be if 4 out of 6 outcomes were favorable. Only 2 outcomes (3,5) are favorable." },
              { text: "1/2", isCorrect: false, explanation: "This would mean 3 favorable outcomes. Only 3 and 5 are favorable: 2/6 = 1/3." }
            ]
          },
          {
            text: "<strong>Combinations:</strong><br/>How many ways can you choose 3 students from a class of 8?",
            options: [
              { text: "56", isCorrect: true, explanation: "Perfect! C(8,3) = 8!/(3!(8-3)!) = 8!/(3!5!) = (8×7×6)/(3×2×1) = 336/6 = 56." },
              { text: "336", isCorrect: false, explanation: "This is P(8,3) where order matters. For combinations: C(8,3) = 336/6 = 56." },
              { text: "24", isCorrect: false, explanation: "This is 3! = 6 × 4. C(8,3) = (8×7×6)/(3×2×1) = 56." },
              { text: "512", isCorrect: false, explanation: "This is 8³. Use combination formula: C(8,3) = 8!/(3!5!) = 56." }
            ]
          },
          {
            text: "<strong>Independent Events:</strong><br/>Two coins are flipped. What's the probability both show heads?",
            options: [
              { text: "1/4", isCorrect: true, explanation: "Perfect! P(HH) = P(H) × P(H) = 1/2 × 1/2 = 1/4." },
              { text: "1/2", isCorrect: false, explanation: "This is the probability of one head. For both heads: 1/2 × 1/2 = 1/4." },
              { text: "1/3", isCorrect: false, explanation: "This doesn't apply here. P(both heads) = 1/2 × 1/2 = 1/4." },
              { text: "2/3", isCorrect: false, explanation: "This is too high. P(HH) = 1/2 × 1/2 = 1/4." }
            ]
          },
          {
            text: "<strong>Permutations:</strong><br/>In how many ways can 5 books be arranged on a shelf?",
            options: [
              { text: "120", isCorrect: true, explanation: "Perfect! This is 5! = 5 × 4 × 3 × 2 × 1 = 120 ways." },
              { text: "25", isCorrect: false, explanation: "This is 5². For arrangements, use 5! = 120." },
              { text: "10", isCorrect: false, explanation: "This is too small. 5! = 5 × 4 × 3 × 2 × 1 = 120." },
              { text: "625", isCorrect: false, explanation: "This is 5⁴. For arrangements without repetition: 5! = 120." }
            ]
          },
          {
            text: "<strong>Conditional Probability:</strong><br/>A bag has 3 red and 2 blue marbles. If you draw red first (without replacement), what's P(red second)?",
            options: [
              { text: "1/2", isCorrect: true, explanation: "Perfect! After drawing 1 red, there are 2 red and 2 blue left (4 total). P(red) = 2/4 = 1/2." },
              { text: "3/5", isCorrect: false, explanation: "This is the initial probability. After drawing 1 red: 2 red out of 4 remaining = 1/2." },
              { text: "2/5", isCorrect: false, explanation: "This would be the probability of blue initially. After 1 red drawn: P(red) = 2/4 = 1/2." },
              { text: "2/3", isCorrect: false, explanation: "Check the remaining marbles: 2 red, 2 blue (4 total). P(red) = 2/4 = 1/2." }
            ]
          },
          {
            text: "<strong>Counting Principle:</strong><br/>A restaurant offers 4 appetizers, 6 main courses, and 3 desserts. How many different meal combinations are possible?",
            options: [
              { text: "72", isCorrect: true, explanation: "Perfect! Use multiplication principle: 4 × 6 × 3 = 72 different combinations." },
              { text: "13", isCorrect: false, explanation: "This is 4 + 6 + 3. Use multiplication for combinations: 4 × 6 × 3 = 72." },
              { text: "24", isCorrect: false, explanation: "This is 4 × 6. Don't forget the desserts: 4 × 6 × 3 = 72." },
              { text: "144", isCorrect: false, explanation: "This is 4 × 6 × 6. There are 3 desserts: 4 × 6 × 3 = 72." }
            ]
          }
        ]
      },
      24: {
        title: "Interactive Quiz: Test Your Logarithms Skills!",
        intro: "Master logarithmic functions, properties, and exponential equations with these 6 problems!",
        questions: [
          {
            text: "<strong>Basic Logarithm:</strong><br/>Evaluate: log₂ 8",
            options: [
              { text: "3", isCorrect: true, explanation: "Perfect! log₂ 8 = 3 because 2³ = 8." },
              { text: "4", isCorrect: false, explanation: "2⁴ = 16, not 8. log₂ 8 = 3 because 2³ = 8." },
              { text: "8", isCorrect: false, explanation: "This is the argument, not the answer. log₂ 8 = 3." },
              { text: "16", isCorrect: false, explanation: "log₂ 8 asks 'what power of 2 gives 8?' Answer: 3." }
            ]
          },
          {
            text: "<strong>Natural Logarithm:</strong><br/>If ln x = 2, what is x?",
            options: [
              { text: "e²", isCorrect: true, explanation: "Perfect! If ln x = 2, then x = e² (the definition of natural logarithm)." },
              { text: "2", isCorrect: false, explanation: "If x = 2, then ln 2 ≈ 0.693, not 2. When ln x = 2, x = e²." },
              { text: "2e", isCorrect: false, explanation: "This would give ln(2e) = ln 2 + ln e = ln 2 + 1 ≠ 2. Answer is x = e²." },
              { text: "e + 2", isCorrect: false, explanation: "This doesn't relate to the logarithm properly. If ln x = 2, then x = e²." }
            ]
          },
          {
            text: "<strong>Logarithm Properties:</strong><br/>Simplify: log₃ 9 + log₃ 3",
            options: [
              { text: "3", isCorrect: true, explanation: "Perfect! log₃ 9 = 2 and log₃ 3 = 1, so 2 + 1 = 3. Or use log₃(9×3) = log₃ 27 = 3." },
              { text: "2", isCorrect: false, explanation: "This is just log₃ 9. Don't forget log₃ 3 = 1: total is 2 + 1 = 3." },
              { text: "4", isCorrect: false, explanation: "log₃ 9 = 2 and log₃ 3 = 1, so the sum is 3." },
              { text: "27", isCorrect: false, explanation: "This is 9 × 3. log₃ 9 + log₃ 3 = 2 + 1 = 3." }
            ]
          },
          {
            text: "<strong>Change of Base:</strong><br/>Express log₅ 25 in terms of natural logarithms.",
            options: [
              { text: "ln 25 / ln 5", isCorrect: true, explanation: "Perfect! Change of base formula: log₅ 25 = ln 25 / ln 5." },
              { text: "ln 5 / ln 25", isCorrect: false, explanation: "This is the reciprocal. Correct formula: log_a b = ln b / ln a." },
              { text: "ln 25 × ln 5", isCorrect: false, explanation: "Change of base uses division, not multiplication: ln 25 / ln 5." },
              { text: "ln 25 - ln 5", isCorrect: false, explanation: "This would be ln(25/5). Change of base: log₅ 25 = ln 25 / ln 5." }
            ]
          },
          {
            text: "<strong>Exponential Equation:</strong><br/>Solve: 3^x = 81",
            options: [
              { text: "4", isCorrect: true, explanation: "Perfect! 3⁴ = 81, so x = 4. Or take log: x log 3 = log 81, x = log 81 / log 3 = 4." },
              { text: "3", isCorrect: false, explanation: "3³ = 27, not 81. Check: 3⁴ = 81, so x = 4." },
              { text: "27", isCorrect: false, explanation: "This is 81/3. We need the exponent: 3^x = 81 means x = 4." },
              { text: "81", isCorrect: false, explanation: "This is the result, not the exponent. 3⁴ = 81, so x = 4." }
            ]
          },
          {
            text: "<strong>Logarithmic Equation:</strong><br/>Solve: log₂(x + 3) = 4",
            options: [
              { text: "13", isCorrect: true, explanation: "Perfect! If log₂(x + 3) = 4, then x + 3 = 2⁴ = 16, so x = 13." },
              { text: "16", isCorrect: false, explanation: "This is 2⁴. But x + 3 = 16, so x = 13." },
              { text: "1", isCorrect: false, explanation: "If x = 1, then log₂(4) = 2 ≠ 4. Solve: x + 3 = 16, so x = 13." },
              { text: "7", isCorrect: false, explanation: "If x = 7, then log₂(10) ≠ 4. Correct: x + 3 = 16, so x = 13." }
            ]
          }
        ]
      },
      25: {
        title: "Interactive Quiz: Test Your Conic Sections Skills!",
        intro: "Master circles, parabolas, ellipses, and hyperbolas with these 6 problems!",
        questions: [
          {
            text: "<strong>Circle Equation:</strong><br/>What is the center of the circle (x-3)² + (y+2)² = 16?",
            options: [
              { text: "(3, -2)", isCorrect: true, explanation: "Perfect! In form (x-h)² + (y-k)² = r², the center is (h,k) = (3,-2)." },
              { text: "(-3, 2)", isCorrect: false, explanation: "Signs are flipped. In (x-3)² + (y+2)² = 16, center is (3,-2)." },
              { text: "(3, 2)", isCorrect: false, explanation: "The y-coordinate sign is wrong. (y+2)² means k = -2, so center is (3,-2)." },
              { text: "(16, 16)", isCorrect: false, explanation: "16 is r², not coordinates. Center is (3,-2) and radius is 4." }
            ]
          },
          {
            text: "<strong>Parabola Vertex:</strong><br/>Find the vertex of y = x² - 4x + 7.",
            options: [
              { text: "(2, 3)", isCorrect: true, explanation: "Perfect! Using x = -b/(2a) = 4/2 = 2, then y = 4 - 8 + 7 = 3. Vertex is (2,3)." },
              { text: "(-2, 3)", isCorrect: false, explanation: "x-coordinate is wrong. x = -(-4)/(2×1) = 2, so vertex is (2,3)." },
              { text: "(2, 7)", isCorrect: false, explanation: "y-coordinate is wrong. When x = 2: y = 4 - 8 + 7 = 3." },
              { text: "(4, 7)", isCorrect: false, explanation: "This uses the coefficient values. Vertex formula gives (2,3)." }
            ]
          },
          {
            text: "<strong>Ellipse Standard Form:</strong><br/>For the ellipse x²/25 + y²/9 = 1, what are the lengths of the semi-major and semi-minor axes?",
            options: [
              { text: "a = 5, b = 3", isCorrect: true, explanation: "Perfect! From x²/25 + y²/9 = 1, we have a² = 25 so a = 5, and b² = 9 so b = 3." },
              { text: "a = 25, b = 9", isCorrect: false, explanation: "These are a² and b². Take square roots: a = 5, b = 3." },
              { text: "a = 3, b = 5", isCorrect: false, explanation: "These are swapped. Since 25 > 9, a = 5 (major) and b = 3 (minor)." },
              { text: "a = 10, b = 6", isCorrect: false, explanation: "These are the full axis lengths. Semi-axes are a = 5, b = 3." }
            ]
          },
          {
            text: "<strong>Hyperbola Orientation:</strong><br/>For x²/16 - y²/9 = 1, which way do the branches open?",
            options: [
              { text: "Horizontally", isCorrect: true, explanation: "Perfect! Since the x² term is positive and y² term is negative, this is a horizontal hyperbola." },
              { text: "Vertically", isCorrect: false, explanation: "Vertical hyperbolas have form -x²/a² + y²/b² = 1. This opens horizontally." },
              { text: "Diagonally", isCorrect: false, explanation: "Standard hyperbolas open horizontally or vertically, not diagonally." },
              { text: "Cannot be determined", isCorrect: false, explanation: "The positive x² term indicates horizontal opening." }
            ]
          },
          {
            text: "<strong>Parabola Focus:</strong><br/>For the parabola y² = 8x, where is the focus?",
            options: [
              { text: "(2, 0)", isCorrect: true, explanation: "Perfect! For y² = 4px, we have 4p = 8, so p = 2. Focus is at (p,0) = (2,0)." },
              { text: "(8, 0)", isCorrect: false, explanation: "This uses the coefficient directly. From y² = 4px = 8x, p = 2, so focus is (2,0)." },
              { text: "(0, 2)", isCorrect: false, explanation: "This would be for x² = 8y. For y² = 8x, focus is (2,0)." },
              { text: "(4, 0)", isCorrect: false, explanation: "This is p if 4p = 16. But 4p = 8, so p = 2 and focus is (2,0)." }
            ]
          },
          {
            text: "<strong>Circle Radius:</strong><br/>What is the radius of x² + y² - 6x + 4y - 12 = 0?",
            options: [
              { text: "5", isCorrect: true, explanation: "Perfect! Complete the square: (x-3)² + (y+2)² = 25, so r = √25 = 5." },
              { text: "25", isCorrect: false, explanation: "This is r². The radius is √25 = 5." },
              { text: "3", isCorrect: false, explanation: "This is from the -6x term. After completing the square, r = 5." },
              { text: "√13", isCorrect: false, explanation: "This would be if you didn't complete the square correctly. r = 5." }
            ]
          }
        ]
      },
      26: {
        title: "Interactive Quiz: Test Your Complex Numbers Skills!",
        intro: "Master complex number operations, polar form, and applications with these 6 problems!",
        questions: [
          {
            text: "<strong>Complex Addition:</strong><br/>Simplify: (3 + 4i) + (2 - 3i)",
            options: [
              { text: "5 + i", isCorrect: true, explanation: "Perfect! Add real parts: 3 + 2 = 5. Add imaginary parts: 4i + (-3i) = i." },
              { text: "5 - i", isCorrect: false, explanation: "Check the imaginary part: 4i - 3i = i, not -i." },
              { text: "1 + 7i", isCorrect: false, explanation: "You've mixed up the operations. (3+2) + (4-3)i = 5 + i." },
              { text: "6 + i", isCorrect: false, explanation: "Real part calculation is wrong: 3 + 2 = 5, not 6." }
            ]
          },
          {
            text: "<strong>Complex Multiplication:</strong><br/>Multiply: (2 + 3i)(1 - 2i)",
            options: [
              { text: "8 - i", isCorrect: true, explanation: "Perfect! (2+3i)(1-2i) = 2 - 4i + 3i - 6i² = 2 - i + 6 = 8 - i." },
              { text: "2 - 6i", isCorrect: false, explanation: "You forgot i² = -1. Expand: 2 - 4i + 3i - 6i² = 2 - i + 6 = 8 - i." },
              { text: "-4 - i", isCorrect: false, explanation: "Check your arithmetic: 2(1) + 3i(-2i) = 2 + 6 = 8 for real part." },
              { text: "8 + i", isCorrect: false, explanation: "Imaginary part sign is wrong: -4i + 3i = -i, not +i." }
            ]
          },
          {
            text: "<strong>Complex Modulus:</strong><br/>Find |3 - 4i|.",
            options: [
              { text: "5", isCorrect: true, explanation: "Perfect! |3 - 4i| = √(3² + (-4)²) = √(9 + 16) = √25 = 5." },
              { text: "7", isCorrect: false, explanation: "This is 3 + 4, not the modulus. Use |a + bi| = √(a² + b²) = 5." },
              { text: "1", isCorrect: false, explanation: "This is 3 - 4 + 1. Modulus: √(3² + 4²) = 5." },
              { text: "25", isCorrect: false, explanation: "This is the modulus squared. |3 - 4i| = √25 = 5." }
            ]
          },
          {
            text: "<strong>Complex Conjugate:</strong><br/>What is the conjugate of 2 - 5i?",
            options: [
              { text: "2 + 5i", isCorrect: true, explanation: "Perfect! The conjugate of a - bi is a + bi, so conjugate of 2 - 5i is 2 + 5i." },
              { text: "-2 + 5i", isCorrect: false, explanation: "You changed the real part too. Only change the sign of the imaginary part." },
              { text: "2 - 5i", isCorrect: false, explanation: "This is the original number. Conjugate changes the sign of the imaginary part." },
              { text: "-2 - 5i", isCorrect: false, explanation: "Both signs are wrong. Conjugate of 2 - 5i is 2 + 5i." }
            ]
          },
          {
            text: "<strong>Powers of i:</strong><br/>Simplify: i²⁰²³",
            options: [
              { text: "-i", isCorrect: true, explanation: "Perfect! Powers of i cycle every 4: i¹=i, i²=-1, i³=-i, i⁴=1. 2023 = 4(505) + 3, so i²⁰²³ = i³ = -i." },
              { text: "i", isCorrect: false, explanation: "2023 ÷ 4 = 505 remainder 3, so i²⁰²³ = i³ = -i." },
              { text: "1", isCorrect: false, explanation: "This would be i²⁰²⁰. Since 2023 has remainder 3 when divided by 4: i²⁰²³ = i³ = -i." },
              { text: "-1", isCorrect: false, explanation: "This is i². Since 2023 ≡ 3 (mod 4), we get i³ = -i." }
            ]
          },
          {
            text: "<strong>Complex Division:</strong><br/>Simplify: (4 + 2i)/(1 - i)",
            options: [
              { text: "1 + 3i", isCorrect: true, explanation: "Perfect! Multiply by conjugate: (4+2i)(1+i)/((1-i)(1+i)) = (4+6i+2i²)/(1+1) = (2+6i)/2 = 1+3i." },
              { text: "4 + 2i", isCorrect: false, explanation: "You can't divide complex numbers by just dividing parts. Use conjugate method." },
              { text: "3 + i", isCorrect: false, explanation: "Check your arithmetic: (4+2i)(1+i) = 4+4i+2i-2 = 2+6i, then divide by 2." },
              { text: "1 - 3i", isCorrect: false, explanation: "Sign error in imaginary part. (4+2i)/(1-i) = 1+3i." }
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

        // Check if current text section is still typing
        const isCurrentlyTyping = typewriterRef.current &&
                                  typewriterRef.current.isTypingActive &&
                                  typewriterRef.current.isTypingActive();

        // CASE 1: Complete current text section if typing
        if (isCurrentlyTyping && typewriterRef.current) {
          typewriterRef.current.completeInstantly();
          // Don't set currentSectionComplete here - let the TypewriterText onComplete handle it
          // This prevents immediate advancement

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

        // CASE 2: Advance to next section (only if current section is complete and NOT currently typing)
        if (currentSectionComplete && !isCurrentlyTyping) {
          // Block advancement if current section is an incomplete quiz
          if (currentSectionData.type === 'quiz' && !quizCompletionStatus[currentSection]) {
            return;
          }

          // If not at the last section, advance
          if (currentSection < sections.length - 1) {
            const nextSection = currentSection + 1;

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

          // If at last section and truly complete, mark lesson as complete
          if (currentSection === sections.length - 1) {
            const lastSection = sections[currentSection];
            // Only mark complete if it's not a quiz, or if it's a completed quiz
            if (lastSection.type !== 'quiz' || quizCompletionStatus[currentSection]) {
              setIsComplete(true);
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection, currentSectionComplete, isComplete, sections, quizCompletionStatus, visibleSections, onComplete]);

  const handleSectionClick = (index) => {
    // Allow clicking on any section that has been made visible (rendered on screen)
    if (index <= visibleSections - 1) {
      if (sectionRefs.current[index]) {
        // Use 'center' to properly center the content in the viewport
        sectionRefs.current[index].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    }
  };

  // Function to get the display status for ControlsSidebar without affecting lesson flow
  const getSectionDisplayStatus = () => {
    // Check if there's a manual override first
    if (sectionStatusOverride[currentSection]) {
      return sectionStatusOverride[currentSection];
    }

    // Only show completed when entire lesson is finished
    if (isComplete) {
      return 'completed';
    } else if (currentSection < visibleSections || currentSectionComplete) {
      return 'in_progress';
    } else {
      return 'pending';
    }
  };

  // Handle lesson completion with button animation
  const handleLessonComplete = () => {
    setIsCompleting(true);

    // Update status to completed immediately
    if (onStatusChange) {
      onStatusChange('completed');
    }

    // After button animation completes, exit to lesson tab
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 600); // Match the button animation duration
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
          // Update both local display and global lesson status
          setSectionStatusOverride(prev => ({ ...prev, [currentSection]: status }));

          // Update the global lesson status via callback
          if (onStatusChange) {
            onStatusChange(status);
          }

          // Handle status-specific state changes
          if (status === 'completed') {
            setIsComplete(true);
          } else if (status === 'in_progress') {
            setIsComplete(false);
          }
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
              {index === currentSection ? (
                // Current section: Use TypewriterText for animation
                <TypewriterText
                  text={section.content || ''}
                  startDelay={200}
                  typingSpeed={typingSpeed}
                  skipAnimation={textCompletionStatus[index] === true}
                  onComplete={() => {
                    // Mark section as complete when typing finishes
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
          {/* Continue prompt - only show when section is complete and not typing and not an incomplete quiz */}
          {index === currentSection && index < sections.length - 1 && currentSectionComplete &&
           !(typewriterRef.current && typewriterRef.current.isTypingActive && typewriterRef.current.isTypingActive()) &&
           !(section.type === 'quiz' && !quizCompletionStatus[index]) && (
            <div className={classes.continuePrompt}>
              <div className={classes.promptText}>
                <span>Press</span>
                <kbd className={classes.enterKey}>Enter</kbd>
                <span>to continue</span>
              </div>
            </div>
          )}
          {/* Complete button - only show for last section when truly complete */}
          {index === currentSection && index === sections.length - 1 && currentSectionComplete &&
           (section.type !== 'quiz' || quizCompletionStatus[index]) && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                className={`${classes.completeButton} ${isCompleting ? 'completing' : ''}`}
                onClick={handleLessonComplete}
                disabled={isCompleting}
              >
                <span>✓</span>
                <span>{isCompleting ? 'Completing...' : 'Complete Lesson'}</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressiveLessonRenderer;