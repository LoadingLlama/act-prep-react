import React, { useState, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  typewriterContainer: {
    position: 'relative'
  },
  cursor: {
    display: 'inline-block',
    backgroundColor: '#4299e1',
    width: '2px',
    height: '1.2em',
    marginLeft: '2px',
    animation: '$blink 1s infinite'
  },
  '@keyframes blink': {
    '0%, 50%': { opacity: 1 },
    '51%, 100%': { opacity: 0 }
  }
});

const TypewriterText = ({
  text,
  speed = 20,
  onComplete,
  showCursor = true,
  startDelay = 0,
  className = "",
  onInstantComplete
}) => {
  const classes = useStyles();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [shouldCompleteInstantly, setShouldCompleteInstantly] = useState(false);
  const [visibleText, setVisibleText] = useState('');
  const containerRef = React.useRef(null);

  // SUPER AGGRESSIVE SCROLL - This will work for sure
  const forceScroll = useCallback(() => {
    if (containerRef.current) {
      console.log('SCROLLING TO ELEMENT'); // Debug log
      containerRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      });
    }
  }, []);

  // Extract only visible text from HTML for character-by-character typing
  const extractVisibleText = useCallback((htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || '';
  }, []);

  // Build HTML with visible characters up to current position
  const buildProgressiveHTML = useCallback((htmlString, targetLength) => {
    if (targetLength <= 0) return '';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    let charCount = 0;

    const processNode = (node) => {
      if (charCount >= targetLength) return null;

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const remainingChars = targetLength - charCount;

        if (remainingChars >= text.length) {
          charCount += text.length;
          return document.createTextNode(text);
        } else {
          charCount += remainingChars;
          return document.createTextNode(text.substring(0, remainingChars));
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const newElement = document.createElement(node.tagName);

        // Copy attributes
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          newElement.setAttribute(attr.name, attr.value);
        }

        // Process child nodes
        for (let i = 0; i < node.childNodes.length; i++) {
          if (charCount >= targetLength) break;
          const processedChild = processNode(node.childNodes[i]);
          if (processedChild) {
            newElement.appendChild(processedChild);
          }
        }

        // Only return element if it has content or if we're still within target length
        if (newElement.hasChildNodes() || charCount < targetLength) {
          return newElement;
        }
      }

      return null;
    };

    const resultDiv = document.createElement('div');
    for (let i = 0; i < tempDiv.childNodes.length; i++) {
      if (charCount >= targetLength) break;
      const processedNode = processNode(tempDiv.childNodes[i]);
      if (processedNode) {
        resultDiv.appendChild(processedNode);
      }
    }

    return resultDiv.innerHTML;
  }, []);

  useEffect(() => {
    if (text) {
      setVisibleText(extractVisibleText(text));
      setDisplayedText('');
      setIsComplete(false);
      setShouldCompleteInstantly(false);
    }
  }, [text, extractVisibleText]);

  // Start aggressive interval when typing begins
  useEffect(() => {
    let intervalId;
    if (hasStarted && !isComplete) {
      console.log('STARTING SCROLL INTERVAL'); // Debug log
      intervalId = setInterval(() => {
        forceScroll();
      }, 100); // Every 100ms
    }

    return () => {
      if (intervalId) {
        console.log('CLEARING SCROLL INTERVAL'); // Debug log
        clearInterval(intervalId);
      }
    };
  }, [hasStarted, isComplete, forceScroll]);

  useEffect(() => {
    if (startDelay > 0) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
        // Initial scroll
        setTimeout(forceScroll, 100);
      }, startDelay);
      return () => clearTimeout(startTimer);
    } else {
      setHasStarted(true);
      // Initial scroll
      setTimeout(forceScroll, 100);
    }
  }, [startDelay, forceScroll]);

  useEffect(() => {
    if (!hasStarted || !visibleText) return;

    // Instant completion triggered
    if (shouldCompleteInstantly && !isComplete) {
      setDisplayedText(text);
      setIsComplete(true);
      // Force scroll immediately
      setTimeout(forceScroll, 50);
      if (onComplete) {
        setTimeout(onComplete, 100);
      }
      return;
    }

    const currentLength = extractVisibleText(displayedText).length;

    if (currentLength < visibleText.length && !shouldCompleteInstantly) {
      const timer = setTimeout(() => {
        const newHTML = buildProgressiveHTML(text, currentLength + 1);
        setDisplayedText(newHTML);
        // Force scroll after each character
        setTimeout(forceScroll, 20);
      }, speed);
      return () => clearTimeout(timer);
    } else if (!isComplete && currentLength >= visibleText.length) {
      setIsComplete(true);
      if (onComplete) {
        setTimeout(onComplete, 100);
      }
    }
  }, [displayedText, text, visibleText, speed, hasStarted, isComplete, onComplete, shouldCompleteInstantly, extractVisibleText, buildProgressiveHTML, forceScroll]);

  // Expose instant complete function
  React.useImperativeHandle(onInstantComplete, () => ({
    completeInstantly: () => {
      if (!isComplete) {
        setShouldCompleteInstantly(true);
      }
    },
    isComplete: () => isComplete
  }), [isComplete]);

  return (
    <span ref={containerRef} className={`${classes.typewriterContainer} ${className}`}>
      <span dangerouslySetInnerHTML={{ __html: displayedText }} />
    </span>
  );
};

export default TypewriterText;