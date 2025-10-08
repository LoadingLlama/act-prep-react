import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import TypewriterText from './TypewriterText';

const useStyles = createUseStyles({
  exampleContainer: {
    margin: '2rem 0'
  },
  problemSection: {
    marginBottom: '2rem'
  },
  encouragement: {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: '1.5rem',
    opacity: 0.8
  },
  choicesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    margin: '1.5rem 0'
  },
  choiceButton: {
    background: '#ffffff',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem 1.25rem',
    fontSize: '1rem',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#1f2937',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
      transform: 'translateX(4px)'
    },
    '&.selected': {
      background: '#eff6ff',
      borderColor: '#3b82f6',
      color: '#1e40af'
    }
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

    setParsedContent({
      title,
      problemText,
      choices,
      solutionContent
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

  const { title, problemText, choices, solutionContent } = parsedContent;

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
          <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;">
            <strong>Problem:</strong>
          </p>
          <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">
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
          {choices.map(choice => (
            <button
              key={choice.letter}
              className={`${classes.choiceButton} ${selectedChoice?.letter === choice.letter ? 'selected' : ''}`}
              onClick={() => handleChoiceSelect(choice)}
              disabled={selectedChoice !== null}
            >
              <strong>{choice.letter}.</strong> {choice.text}
            </button>
          ))}
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
