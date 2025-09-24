import React, { useState, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  typewriterContainer: {
    position: 'relative'
  },
  lineReveal: {
    '& .revealing-line': {
      opacity: 0,
      animation: '$fadeInLine 0.5s ease-out forwards'
    }
  },
  '@keyframes fadeInLine': {
    'from': { opacity: 0, transform: 'translateY(10px)' },
    'to': { opacity: 1, transform: 'translateY(0)' }
  }
});

const TypewriterText = React.forwardRef(({
  text,
  onComplete,
  startDelay = 0,
  className = ""
}, ref) => {
  const classes = useStyles();
  const [displayedLines, setDisplayedLines] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [shouldCompleteInstantly, setShouldCompleteInstantly] = useState(false);
  const [lines, setLines] = useState([]);
  const containerRef = React.useRef(null);

  // Split content into lines for progressive reveal
  const splitIntoLines = useCallback((htmlString) => {
    if (!htmlString) return [];

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    const lines = [];
    const elements = Array.from(tempDiv.children);

    // If no block elements, split by line breaks
    if (elements.length === 0) {
      const text = tempDiv.textContent || '';
      return text.split('\n').filter(line => line.trim().length > 0);
    }

    // Otherwise, treat each block element as a line
    elements.forEach(element => {
      if (element.tagName && ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'].includes(element.tagName)) {
        lines.push(element.outerHTML);
      } else {
        // For inline elements, treat as text
        const text = element.textContent || '';
        if (text.trim()) {
          lines.push(text);
        }
      }
    });

    return lines;
  }, []);

  useEffect(() => {
    if (text) {
      const lineArray = splitIntoLines(text);
      setLines(lineArray);
      setDisplayedLines(0);
      setIsComplete(false);
      setShouldCompleteInstantly(false);
    }
  }, [text, splitIntoLines]);

  // Removed aggressive scroll interval

  useEffect(() => {
    if (startDelay > 0) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);
      return () => clearTimeout(startTimer);
    } else {
      setHasStarted(true);
    }
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted || lines.length === 0) return;

    // Instant completion triggered
    if (shouldCompleteInstantly && !isComplete) {
      setDisplayedLines(lines.length);
      setIsComplete(true);
      if (onComplete) {
        setTimeout(onComplete, 100);
      }
      return;
    }

    if (displayedLines < lines.length && !shouldCompleteInstantly) {
      // Reveal lines one by one with timing
      const timer = setTimeout(() => {
        setDisplayedLines(prev => prev + 1);
      }, 800); // Slower line-by-line reveal
      return () => clearTimeout(timer);
    } else if (!isComplete && displayedLines >= lines.length) {
      setIsComplete(true);
      if (onComplete) {
        setTimeout(onComplete, 100);
      }
    }
  }, [displayedLines, lines, hasStarted, isComplete, onComplete, shouldCompleteInstantly]);

  // Expose instant complete function
  React.useImperativeHandle(ref, () => ({
    completeInstantly: () => {
      if (!isComplete) {
        setShouldCompleteInstantly(true);
      }
    },
    isComplete: () => isComplete
  }), [isComplete]);

  const buildDisplayHTML = () => {
    return lines.slice(0, displayedLines).map((line, index) => {
      const isNewLine = index === displayedLines - 1;
      if (line.startsWith('<')) {
        // HTML element - wrap with revealing class
        return `<div class="${isNewLine ? 'revealing-line' : ''}">${line}</div>`;
      } else {
        // Plain text - wrap in paragraph with revealing class
        return `<p class="${isNewLine ? 'revealing-line' : ''}">${line}</p>`;
      }
    }).join('');
  };

  return (
    <div
      key={text?.substring(0, 50)} // Unique key to re-trigger animation for each section
      ref={containerRef}
      className={`${classes.typewriterContainer} ${classes.lineReveal} ${className}`}
    >
      <div dangerouslySetInnerHTML={{ __html: buildDisplayHTML() }} />
    </div>
  );
});

export default TypewriterText;