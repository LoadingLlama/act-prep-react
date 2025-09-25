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
    const allParts = contentWithQuizzes.split(/(<!-- QUIZ_[1-4] -->)/);

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