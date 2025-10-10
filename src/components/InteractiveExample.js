import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import TypewriterText from './TypewriterText';

const useStyles = createUseStyles({
  exampleContainer: {
    margin: '2rem 0 5rem 0'
  },
  problemSection: {
    marginBottom: '2rem'
  },
  encouragement: {
    fontSize: '0.9rem',
    color: '#10b981',
    fontStyle: 'italic',
    marginBottom: '1.5rem',
    opacity: 0.9,
    fontWeight: '500'
  },
  choicesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    margin: '1.5rem 0'
  },
  solutionSection: {
    marginTop: '2rem',
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

    // Extract problem (everything between "PROBLEM:" and "SOLUTION:")
    const problemMatch = allText.match(/<strong>Problem:<\/strong><\/p>([\s\S]*?)(?=<p[^>]*><strong>Solution:)/i);
    const problemContent = problemMatch ? problemMatch[1].trim() : '';

    // Extract choices (A. B. C. D.)
    const choiceMatches = problemContent.match(/([A-D])\.\s*([^<\n]+)/g) || [];
    const choices = choiceMatches.map(match => {
      const [, letter, text] = match.match(/([A-D])\.\s*(.+)/) || [];
      return { letter, text: text?.trim() };
    }).filter(c => c.letter && c.text);

    // Extract problem text (before choices)
    const problemTextMatch = problemContent.match(/<p[^>]*>(.*?)(?=<p[^>]*>[A-D]\.|\[A-D]\.|<br>A\.)/is);
    const problemText = problemTextMatch ? problemTextMatch[1].trim() : problemContent.split(/<br>|<p/)[0].trim();

    // Extract solution (everything after "SOLUTION:" until the end or next section)
    const solutionMatch = allText.match(/<strong>Solution:<\/strong><\/p>([\s\S]*?)(?=<h[34]|$)/i);
    const solutionContent = solutionMatch ? solutionMatch[1].trim() : '';

    // Extract correct answer (look for "Answer: X" pattern)
    const correctAnswerMatch = solutionContent.match(/<strong>Answer:\s*([A-D])<\/strong>/i);
    const correctAnswer = correctAnswerMatch ? correctAnswerMatch[1] : null;

    setParsedContent({
      title,
      problemText,
      choices,
      solutionContent,
      correctAnswer
    });
  }, [content]);

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

  const { title, problemText, choices, solutionContent, correctAnswer } = parsedContent;

  return (
    <div className={classes.exampleContainer}>
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
          <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #10b981;">
            <strong>Problem:</strong>
          </p>
          <p style="margin: 0 0 1.5rem 0; font-size: 1.3rem; font-family: 'Times New Roman', Times, Georgia, serif; line-height: 1.8; letter-spacing: 0.015em; color: #2d3748;">
            ${problemText}
          </p>
        `}} />

        {!selectedChoice && (
          <div className={classes.encouragement}>
            💭 Try to solve this! No pressure if you get it wrong—this is just for learning.
          </div>
        )}

        {/* Answer Choices */}
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
                  gap: '1.25rem',
                  padding: '0.5rem 0',
                  cursor: showFeedback ? 'default' : 'pointer',
                  alignItems: 'center',
                  borderLeft: showFeedback && isCorrectChoice ? '3px solid #48bb78' :
                              showFeedback && isIncorrectChoice ? '3px solid #f56565' :
                              showFeedback && !isSelected && isCorrectAnswer ? '3px solid #48bb78' : 'none',
                  paddingLeft: showFeedback && (isSelected || isCorrectAnswer) ? '0.75rem' : '0',
                  backgroundColor: showFeedback && isCorrectChoice ? 'rgba(72, 187, 120, 0.05)' :
                                   showFeedback && isIncorrectChoice ? 'rgba(245, 101, 101, 0.05)' :
                                   showFeedback && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.05)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Circular letter indicator */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  minWidth: '24px',
                  borderRadius: '50%',
                  border: isSelected && !showFeedback ? '2px solid #10b981' :
                          showFeedback && isCorrectChoice ? '2px solid #48bb78' :
                          showFeedback && isIncorrectChoice ? '2px solid #f56565' :
                          showFeedback && !isSelected && isCorrectAnswer ? '2px solid #48bb78' : '2px solid #cbd5e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '0.7rem',
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
                  <div style={{
                    fontSize: '1.3rem',
                    color: '#2d3748',
                    lineHeight: '1.8',
                    fontFamily: '"Times New Roman", Times, Georgia, serif',
                    letterSpacing: '0.015em'
                  }}>
                    {choice.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Solution - only show after selection */}
      {showSolution && (
        <div className={classes.solutionSection}>
          <div dangerouslySetInnerHTML={{ __html: `
            <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;">
              <strong>Solution:</strong>
            </p>
            ${solutionContent}
          `}} />
        </div>
      )}
    </div>
  );
};

export default InteractiveExample;
