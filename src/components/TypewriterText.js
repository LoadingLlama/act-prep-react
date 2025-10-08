import React, { useState, useEffect } from 'react';
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
  className = "",
  typingSpeed = 25,
  skipAnimation = false
}, ref) => {
  const classes = useStyles();
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [shouldCompleteInstantly, setShouldCompleteInstantly] = useState(false);
  const [plainText, setPlainText] = useState('');
  const [isTypingActive, setIsTypingActive] = useState(false);
  const containerRef = React.useRef(null);
  const onCompleteRef = React.useRef(onComplete);

  // Keep onComplete ref up to date
  React.useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (text) {
      // Keep original HTML but extract text length for character counting
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text;
      const extractedText = tempDiv.textContent || tempDiv.innerText || '';


      setPlainText(extractedText);

      if (skipAnimation) {
        // If skipping animation, immediately show all text
        setDisplayedChars(extractedText.length);
        setIsComplete(true);
        setIsTypingActive(false);
        setHasStarted(true);
        setShouldCompleteInstantly(false);
        if (onCompleteRef.current) {
          setTimeout(() => onCompleteRef.current(), 50);
        }
      } else {
        setDisplayedChars(0);
        setIsComplete(false);
        setShouldCompleteInstantly(false);
        setIsTypingActive(true);
        setHasStarted(true); // Always start immediately
      }
    }
  }, [text, skipAnimation]); // Removed onComplete from dependencies to prevent resets

  useEffect(() => {
    if (!hasStarted || !plainText) {
      return;
    }

    // Instant completion triggered
    if (shouldCompleteInstantly && !isComplete) {
      setDisplayedChars(plainText.length);
      setIsComplete(true);
      setIsTypingActive(false);
      if (onCompleteRef.current) {
        setTimeout(() => onCompleteRef.current(), 100);
      }
      return;
    }

    // If we're done with all characters, mark complete
    if (displayedChars >= plainText.length) {
      if (!isComplete) {
        setIsComplete(true);
        setIsTypingActive(false);
        if (onCompleteRef.current) {
          setTimeout(() => onCompleteRef.current(), 100);
        }
      }
      return;
    }

    // Type character by character
    if (displayedChars < plainText.length) {
      const timer = setTimeout(() => {
        setDisplayedChars(prev => prev + 1);
        // Auto-scroll to keep typing in view
        if (containerRef.current) {
          containerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        }
      }, typingSpeed); // Configurable typing speed
      return () => clearTimeout(timer);
    }
  }, [displayedChars, plainText, hasStarted, isComplete, onComplete, shouldCompleteInstantly, typingSpeed]);

  // Expose instant complete function
  React.useImperativeHandle(ref, () => ({
    completeInstantly: () => {
      if (!isComplete) {
        setShouldCompleteInstantly(true);
      }
    },
    isComplete: () => isComplete,
    isTypingActive: () => isTypingActive
  }), [isComplete, isTypingActive]);

  const buildDisplayHTML = () => {
    if (!text || !plainText) {
      return '';
    }

    if (displayedChars === 0) {
      return '<span style="opacity: 0;">.</span>'; // Invisible placeholder to prevent blank screen
    }

    // Fallback to simple text truncation if HTML parsing fails
    try {
      // Simple approach: truncate the plain text and insert it into a basic HTML structure

      // For basic HTML preservation, we'll use a simple regex approach
      // This handles the most common cases without complex DOM parsing
      let htmlOutput = text;

      // Find where to truncate by counting actual text characters
      let textCount = 0;
      let htmlIndex = 0;

      while (textCount < displayedChars && htmlIndex < text.length) {
        const char = text[htmlIndex];

        if (char === '<') {
          // Skip over HTML tags
          const tagEnd = text.indexOf('>', htmlIndex);
          if (tagEnd !== -1) {
            htmlIndex = tagEnd + 1;
          } else {
            htmlIndex++;
          }
        } else {
          // Regular character
          textCount++;
          htmlIndex++;
        }
      }

      // Truncate at the HTML index and try to close any open tags
      htmlOutput = text.substring(0, htmlIndex);

      // Simple tag balancing for common tags
      const openTags = [];
      const tagPattern = /<\/?([a-zA-Z]+)[^>]*>/g;
      let match;

      while ((match = tagPattern.exec(htmlOutput)) !== null) {
        const tagName = match[1].toLowerCase();
        if (match[0].startsWith('</')) {
          // Closing tag
          const index = openTags.lastIndexOf(tagName);
          if (index !== -1) {
            openTags.splice(index, 1);
          }
        } else if (!match[0].endsWith('/>')) {
          // Opening tag (not self-closing)
          openTags.push(tagName);
        }
      }

      // Close any remaining open tags
      for (let i = openTags.length - 1; i >= 0; i--) {
        htmlOutput += `</${openTags[i]}>`;
      }

      return htmlOutput;

    } catch (error) {
      // If anything goes wrong, fall back to plain text
      console.warn('TypewriterText HTML processing failed, using plain text:', error);
      return plainText.substring(0, displayedChars);
    }
  };

  const displayHTML = buildDisplayHTML();

  return (
    <div
      key={text?.substring(0, 50)} // Unique key to re-trigger animation for each section
      ref={containerRef}
      className={`${classes.typewriterContainer} ${classes.lineReveal} ${className}`}
    >
      <div dangerouslySetInnerHTML={{ __html: displayHTML }} />
    </div>
  );
});

export default TypewriterText;