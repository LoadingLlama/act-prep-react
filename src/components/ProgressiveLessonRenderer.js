import React, { useState, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import TypewriterText from './TypewriterText';
import PracticeSection from './PracticeSection';

const useStyles = createUseStyles({
  progressiveContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    lineHeight: 1.6,
    color: '#2d3748'
  },
  section: {
    marginBottom: '2rem',
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'all 0.5s ease',
    '&.visible': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  continuePrompt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2rem 0',
    padding: '1rem',
    backgroundColor: 'transparent',
    animation: '$subtleBlink 2s infinite'
  },
  '@keyframes subtleBlink': {
    '0%, 100%': {
      opacity: 0.3
    },
    '50%': {
      opacity: 0.6
    }
  },
  promptText: {
    color: '#9ca3af',
    fontSize: '0.8rem',
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  enterKey: {
    background: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '0.2rem 0.6rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#6b7280',
    fontFamily: 'Monaco, Consolas, monospace'
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '3px',
    backgroundColor: '#e2e8f0',
    zIndex: 1000
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4299e1',
    transition: 'width 0.3s ease',
    boxShadow: '0 0 10px rgba(66, 153, 225, 0.3)'
  },
  completed: {
    '& .continue-prompt': {
      display: 'none'
    }
  },
  autoCompleteHint: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem 0',
    padding: '0.5rem',
    backgroundColor: 'transparent',
    animation: '$subtleBlink 2.5s infinite'
  },
  hintText: {
    color: '#a1a1aa',
    fontSize: '0.75rem',
    fontWeight: '300',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontStyle: 'italic'
  }
});

const ProgressiveLessonRenderer = ({ content, interactiveData }) => {
  const classes = useStyles();
  const [currentSection, setCurrentSection] = useState(0);
  const [sections, setSections] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [currentSectionComplete, setCurrentSectionComplete] = useState(false);
  const typewriterRef = React.useRef(null);
  const currentSectionRef = React.useRef(null);

  // Scroll to current section
  const scrollToCurrentSection = useCallback(() => {
    if (currentSectionRef.current) {
      const element = currentSectionRef.current;
      const elementRect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate where the element currently is
      const elementCenter = elementRect.top + (elementRect.height / 2);
      const desiredCenter = windowHeight / 2;

      // Calculate how much we need to scroll to center the element
      const scrollDistance = elementCenter - desiredCenter;

      // Scroll to center the new section
      window.scrollBy({
        top: scrollDistance,
        behavior: 'auto'
      });
    }
  }, []);

  // Parse content into sections
  useEffect(() => {
    const parsedSections = parseContentIntoSections(content, interactiveData);
    setSections(parsedSections);
  }, [content, interactiveData]);

  // Reset section completion when advancing to new section
  useEffect(() => {
    const currentSectionData = sections[currentSection];
    if (currentSectionData && currentSectionData.type === 'interactive') {
      // Interactive sections are immediately "complete" for navigation purposes
      setCurrentSectionComplete(true);
    } else {
      // Text sections need to finish typing first
      setCurrentSectionComplete(false);
    }

    // Scroll to the new current section whenever it changes
    if (sections.length > 0) {
      setTimeout(scrollToCurrentSection, 100);
    }
  }, [currentSection, sections, scrollToCurrentSection]);

  // Handle keyboard navigation
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      // Check if AI input is focused - if so, ignore lesson Enter key handling
      const activeElement = document.activeElement;
      const isAIInputFocused = activeElement && (
        activeElement.placeholder === "Ask AI" ||
        activeElement.placeholder === "Ask me anything about ACT prep..." ||
        activeElement.closest('[data-ai-chat]')
      );

      if (isAIInputFocused) {
        return; // Let AI chat handle the Enter key
      }

      event.preventDefault();

      // Check if current section is still typing
      const currentSectionData = sections[currentSection];
      if (currentSectionData && currentSectionData.type === 'text') {
        // If typewriter is still running, complete it instantly
        if (typewriterRef.current && !typewriterRef.current.isComplete()) {
          typewriterRef.current.completeInstantly();
          return;
        }
      }

      // If current section is complete, advance to next
      if (currentSectionComplete) {
        if (currentSection < sections.length - 1) {
          setCurrentSection(prev => prev + 1);
          setCurrentSectionComplete(false);
        } else if (currentSection === sections.length - 1) {
          setIsComplete(true);
        }
      }
    }
  }, [currentSection, sections, currentSectionComplete]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const progressPercentage = sections.length > 0 ? ((currentSection + 1) / sections.length) * 100 : 0;

  return (
    <div className={`${classes.progressiveContainer} ${isComplete ? classes.completed : ''}`}>
      {/* Progress Bar */}
      <div className={classes.progressBar}>
        <div
          className={classes.progressFill}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Render sections progressively */}
      {sections.map((section, index) => (
        <div key={index}>
          {index <= currentSection && (
            <div
              ref={index === currentSection ? currentSectionRef : null}
              className={`${classes.section} visible`}
            >
              {section.type === 'text' ? (
                <>
                  <TypewriterText
                    text={section.content}
                    speed={20}
                    onComplete={() => {
                      setCurrentSectionComplete(true);
                    }}
                    showCursor={index === currentSection}
                    onInstantComplete={index === currentSection ? typewriterRef : null}
                  />

                  {/* Auto-complete hint while typing */}
                  {index === currentSection && !currentSectionComplete && (
                    <div className={classes.autoCompleteHint}>
                      <div className={classes.hintText}>
                        <span>Press</span>
                        <kbd className={classes.enterKey}>Enter</kbd>
                        <span>to skip ahead</span>
                      </div>
                    </div>
                  )}
                </>
              ) : section.type === 'interactive' ? (
                <PracticeSection
                  title={section.data.title}
                  description={section.data.description}
                  questions={section.data.questions}
                  isTest={section.data.isTest || false}
                  duration={section.data.duration}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              )}

              {/* Continue prompt positioned within section */}
              {index === currentSection && index < sections.length - 1 && currentSectionComplete && (
                <div className={classes.continuePrompt}>
                  <div className={classes.promptText}>
                    <span>Press</span>
                    <kbd className={classes.enterKey}>Enter</kbd>
                    <span>to continue</span>
                  </div>
                </div>
              )}

              {/* Completion prompt positioned within section */}
              {index === currentSection && index === sections.length - 1 && currentSectionComplete && !isComplete && (
                <div className={classes.continuePrompt}>
                  <div className={classes.promptText}>
                    <span>Press</span>
                    <kbd className={classes.enterKey}>Enter</kbd>
                    <span>to complete lesson</span>
                    <span style={{ marginLeft: '1rem', opacity: 0.6 }}>
                      🎉 Almost done!
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {isComplete && (
        <div className={`${classes.section} visible`} style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div style={{
            padding: '2rem',
            backgroundColor: '#f0fff4',
            border: '2px solid #48bb78',
            borderRadius: '12px',
            fontSize: '1.1rem',
            color: '#2f855a'
          }}>
            🎉 <strong>Lesson Complete!</strong> Great job working through this material at your own pace.
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to parse content into logical sections
const parseContentIntoSections = (content, interactiveData) => {
  const sections = [];

  if (!content) return sections;

  // Split content by major headers and interactive markers
  let remainingContent = content;

  // Handle interactive sections
  if (interactiveData?.practiceSections) {
    interactiveData.practiceSections.forEach((section, index) => {
      const marker = `<!-- INTERACTIVE_PRACTICE_${index} -->`;

      if (remainingContent.includes(marker)) {
        const [before, after] = remainingContent.split(marker);

        // Add content before marker as text sections
        if (before.trim()) {
          const textSections = splitIntoTextSections(before);
          sections.push(...textSections);
        }

        // Add interactive section
        sections.push({
          type: 'interactive',
          data: section
        });

        remainingContent = after;
      }
    });
  }

  // Add remaining content
  if (remainingContent.trim()) {
    const textSections = splitIntoTextSections(remainingContent);
    sections.push(...textSections);
  }

  return sections;
};

// Split text content into logical sections
const splitIntoTextSections = (htmlContent) => {
  const sections = [];

  // Split by major sections (h3 tags, major divs, etc.)
  const sectionRegex = /<h3[^>]*>.*?<\/h3>|<div class="[^"]*(?:example-box|rules-box|key-takeaway|concept-box|tip-box)[^"]*"[^>]*>.*?<\/div>/gs;

  let lastIndex = 0;
  let match;

  while ((match = sectionRegex.exec(htmlContent)) !== null) {
    // Add content before this section
    if (match.index > lastIndex) {
      const beforeContent = htmlContent.slice(lastIndex, match.index).trim();
      if (beforeContent) {
        sections.push({
          type: 'text',
          content: beforeContent
        });
      }
    }

    // Add the matched section
    sections.push({
      type: 'text',
      content: match[0]
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining content
  if (lastIndex < htmlContent.length) {
    const remainingContent = htmlContent.slice(lastIndex).trim();
    if (remainingContent) {
      sections.push({
        type: 'text',
        content: remainingContent
      });
    }
  }

  // If no major sections found, split by paragraphs/divs
  if (sections.length === 0) {
    const paragraphs = htmlContent.split(/(?=<p|<div|<h[1-6]|<ul|<ol)/g).filter(p => p.trim());
    return paragraphs.map(p => ({
      type: 'text',
      content: p.trim()
    }));
  }

  return sections;
};

export default ProgressiveLessonRenderer;