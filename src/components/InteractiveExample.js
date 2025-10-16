import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import TypewriterText from './TypewriterText';
import PhotomathSolution from './PhotomathSolution';

const useStyles = createUseStyles({
  exampleContainer: {
    margin: '1.5rem 0 3rem 0'
  },
  elevatedBox: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.5rem 2rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    transition: 'box-shadow 0.2s ease',
    '&:hover': {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    '& > *:first-child': {
      marginTop: '0 !important'
    },
    '& h4': {
      marginTop: '0 !important',
      marginBottom: '1rem !important'
    }
  },
  problemSection: {
    marginBottom: '1.5rem'
  },
  encouragement: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    fontStyle: 'italic',
    marginBottom: '1rem',
    opacity: 0.7,
    fontWeight: '400'
  },
  choicesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    margin: '1rem 0'
  },
  solutionSection: {
    marginTop: '1.5rem',
    opacity: 0,
    animation: '$fadeIn 0.5s ease-out forwards'
  },
  '@keyframes fadeIn': {
    'from': { opacity: 0, transform: 'translateY(10px)' },
    'to': { opacity: 1, transform: 'translateY(0)' }
  }
});

const InteractiveExample = ({ content, onComplete, currentSection, index, typingSpeed, typewriterRef }) => {
  const classes = useStyles();
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [parsedContent, setParsedContent] = useState(null);

  useEffect(() => {
    // Parse the example content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // Extract title (h4)
    const titleElement = doc.querySelector('h4');
    const title = titleElement ? titleElement.outerHTML : '';

    // Find Problem and Solution sections
    const allText = content;

    // Extract problem text - text between title and choices (or Solution if no choices)
    let problemText = '';

    // First, try to find text after the title (h4) and before the choices/solution
    // Remove the title first
    let textAfterTitle = allText.replace(/<h4[^>]*>.*?<\/h4>/is, '');

    // Extract text before the first choice (<span>A.) or Solution
    const textBeforeChoicesMatch = textAfterTitle.match(/(.*?)(?:<p[^>]*>\s*<span[^>]*>[A-K]\.|<p[^>]*>\s*<strong>Solution:<\/strong>)/is);
    if (textBeforeChoicesMatch) {
      problemText = textBeforeChoicesMatch[1]
        .trim()
        .replace(/<\/?p[^>]*>/g, ' ') // Remove p tags
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
    }

    // Extract diagram (SVG inside a div) - none for geometry lessons
    const diagramHTML = '';

    // Extract choices (A. B. C. D. E.) from <span> tags with <br> separators
    let choices = [];

    // Look for the paragraph with answer choices (between Problem and Solution)
    const choicesParagraphMatch = allText.match(/<p[^>]*>\s*<span[^>]*>([A-K])\.\s*(.*?)<\/span>[\s\S]*?<\/p>\s*<p[^>]*>\s*<strong>Solution:<\/strong>/is);
    if (choicesParagraphMatch) {
      const choicesParagraph = choicesParagraphMatch[0];
      // Extract all <span> tags with answer choices
      const spanMatches = choicesParagraph.match(/<span[^>]*>([A-K])\.\s*(.*?)<\/span>/g);
      if (spanMatches && spanMatches.length > 0) {
        choices = spanMatches.map(match => {
          const [, letter, text] = match.match(/<span[^>]*>([A-K])\.\s*(.*?)<\/span>/) || [];
          return { letter, text: text?.trim() };
        }).filter(c => c.letter && c.text);
      }
    }

    // Extract solution - everything after the Solution paragraph until the end or next section
    let solutionContent = '';
    const solutionMatch = allText.match(/<p[^>]*>\s*<strong>Solution:<\/strong>\s*<\/p>([\s\S]*?)(?=<h[34]|$)/i);
    if (solutionMatch) {
      solutionContent = solutionMatch[1].trim();
    }

    // Extract correct answer (look for "Answer: X" pattern) - only for quiz-style examples
    // Note: The answer is plain text, not wrapped in <strong> tags
    const correctAnswerMatch = solutionContent.match(/Answer:\s*([A-K])/i);
    const correctAnswer = correctAnswerMatch ? correctAnswerMatch[1] : null;

    setParsedContent({
      title,
      problemText,
      diagramHTML,
      choices,
      solutionContent,
      correctAnswer
    });
  }, [content]);

  // For worked examples (no choices), automatically show the solution
  useEffect(() => {
    if (parsedContent && parsedContent.choices.length === 0 && !showSolution) {
      setShowSolution(true);
    }
  }, [parsedContent, showSolution]);

  useEffect(() => {
    if (showSolution && onComplete) {
      // Mark as complete once solution is shown
      setTimeout(() => onComplete(), 100);
    }
  }, [showSolution, onComplete]);

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
    // Reveal solution after a brief delay
    setTimeout(() => {
      setShowSolution(true);
    }, 300);
  };

  if (!parsedContent) {
    return <div>Loading example...</div>;
  }

  const { title, problemText, diagramHTML, choices, solutionContent, correctAnswer } = parsedContent;

  // Check if this is a worked example (no multiple choice) or a quiz-style example
  const isWorkedExample = choices.length === 0;

  return (
    <div className={classes.exampleContainer}>
      <div className={classes.elevatedBox}>
        {/* Title */}
        {index === currentSection ? (
          <TypewriterText
            text={title}
            typingSpeed={typingSpeed}
            skipAnimation={false}
            onComplete={() => {}}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: title }} />
        )}

        {/* Problem */}
        <div className={classes.problemSection}>
        <div dangerouslySetInnerHTML={{ __html: `
          <p style="margin: 1rem 0 1rem 0; font-size: 19px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; font-weight: 500; color: #111827;">
            ${problemText}
          </p>
        `}} />

        {/* Render diagram if present */}
        {diagramHTML && (
          <div dangerouslySetInnerHTML={{ __html: diagramHTML }} />
        )}

        {/* Answer Choices - only for quiz-style examples */}
        {!isWorkedExample && (
          <div className={classes.choicesContainer}>
          {choices.map(choice => {
            const isSelected = selectedChoice?.letter === choice.letter;
            const showFeedback = selectedChoice !== null;
            const isCorrectAnswer = choice.letter === correctAnswer;
            const isCorrectChoice = isSelected && isCorrectAnswer;
            const isIncorrectChoice = isSelected && !isCorrectAnswer;

            return (
              <div
                key={choice.letter}
                onClick={() => {
                  if (!showFeedback) {
                    handleChoiceSelect(choice);
                  }
                }}
                style={{
                  display: 'flex',
                  gap: '0.8rem',
                  padding: '0.35rem 0',
                  cursor: showFeedback ? 'default' : 'pointer',
                  alignItems: 'center',
                  borderLeft: showFeedback && isCorrectChoice ? '3px solid #48bb78' :
                              showFeedback && isIncorrectChoice ? '3px solid #f56565' :
                              showFeedback && !isSelected && isCorrectAnswer ? '3px solid #48bb78' : 'none',
                  paddingLeft: showFeedback && (isSelected || isCorrectAnswer) ? '0.6rem' : '0',
                  backgroundColor: showFeedback && isCorrectChoice ? 'rgba(72, 187, 120, 0.05)' :
                                   showFeedback && isIncorrectChoice ? 'rgba(245, 101, 101, 0.05)' :
                                   showFeedback && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.05)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Circular letter indicator */}
                <div style={{
                  width: '22px',
                  height: '22px',
                  minWidth: '22px',
                  borderRadius: '50%',
                  border: isSelected && !showFeedback ? '2px solid #10b981' :
                          showFeedback && isCorrectChoice ? '2px solid #48bb78' :
                          showFeedback && isIncorrectChoice ? '2px solid #f56565' :
                          showFeedback && !isSelected && isCorrectAnswer ? '2px solid #48bb78' : '2px solid #cbd5e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '0.65rem',
                  color: isSelected && !showFeedback ? '#10b981' :
                          showFeedback && isCorrectChoice ? '#48bb78' :
                          showFeedback && isIncorrectChoice ? '#f56565' :
                          showFeedback && !isSelected && isCorrectAnswer ? '#48bb78' : '#718096',
                  backgroundColor: isSelected && !showFeedback ? 'rgba(16, 185, 129, 0.1)' :
                                   showFeedback && isCorrectChoice ? 'rgba(72, 187, 120, 0.1)' :
                                   showFeedback && isIncorrectChoice ? 'rgba(245, 101, 101, 0.1)' :
                                   showFeedback && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.1)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}>
                  {showFeedback && isCorrectChoice ? '✓' :
                   showFeedback && isIncorrectChoice ? '✗' :
                   showFeedback && !isSelected && isCorrectAnswer ? '✓' : choice.letter}
                </div>

                {/* Option text */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '17px',
                      color: '#1f2937',
                      lineHeight: '1.6',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      fontWeight: '400'
                    }}
                    dangerouslySetInnerHTML={{ __html: choice.text }}
                  />
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>

      {/* Solution - only show after selection (or immediately for worked examples) */}
      {showSolution && (
        <div className={classes.solutionSection}>
          <PhotomathSolution solutionHTML={solutionContent} answer={correctAnswer} />
        </div>
      )}
      </div>
    </div>
  );
};

export default InteractiveExample;
