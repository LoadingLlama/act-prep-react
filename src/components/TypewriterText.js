import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { sanitizeHTML } from '../utils/security';

const useStyles = createUseStyles({
  typewriterContainer: {
    position: 'relative',
    '& .preview-char': {
      opacity: 0.25,
      transition: 'none' // Remove fade transition
    }
  },
  lineReveal: {
    '& .revealing-line': {
      opacity: 1, // No fade in, instant appearance
      animation: 'none' // Remove fade animation
    }
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
      const PREVIEW_CHARS = 0; // No preview characters - pure typewriter effect

      // Find positions of all characters in the HTML
      let textCount = 0;
      let htmlIndex = 0;
      const charPositions = []; // Track positions of actual characters

      while (htmlIndex < text.length) {
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
          charPositions.push({ index: htmlIndex, count: textCount });
          textCount++;
          htmlIndex++;
        }
      }

      // Calculate preview end (displayed chars + preview chars)
      const previewEndCount = Math.min(displayedChars + PREVIEW_CHARS, charPositions.length);
      const displayEndIndex = charPositions[displayedChars - 1]?.index + 1 || 0;
      const previewEndIndex = charPositions[previewEndCount - 1]?.index + 1 || displayEndIndex;

      // Build the HTML with preview effect
      let result = '';
      let lastIndex = 0;

      // Add fully typed characters (solid black)
      result += text.substring(0, displayEndIndex);
      lastIndex = displayEndIndex;

      // Add preview characters with smooth gradient fade effect
      if (displayedChars < plainText.length && previewEndIndex > displayEndIndex) {
        const previewChars = charPositions.slice(displayedChars, previewEndCount);

        previewChars.forEach(({ index }, i) => {
          result += text.substring(lastIndex, index);

          // No fade - instant typewriter effect
          const opacity = 0.25; // Fixed low opacity for preview chars, no animation

          result += `<span style="opacity: ${opacity}; transition: none;">${text[index]}</span>`;
          lastIndex = index + 1;
        });
        result += text.substring(lastIndex, previewEndIndex);
      }

      // Simple tag balancing for common tags
      const openTags = [];
      const tagPattern = /<\/?([a-zA-Z]+)[^>]*>/g;
      let match;

      while ((match = tagPattern.exec(result)) !== null) {
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
        result += `</${openTags[i]}>`;
      }

      return result;

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
      <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(displayHTML) }} />
    </div>
  );
});

export default TypewriterText;