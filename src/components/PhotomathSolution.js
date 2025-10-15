import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  solutionContainer: {
    marginTop: '1.5rem',
    position: 'relative'
  },
  answerDisplay: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: '1rem',
    letterSpacing: '0.02em'
  },
  solutionHeader: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#6b7280',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '1rem'
  },
  stepsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  stepItem: {
    padding: '0',
    position: 'relative'
  },
  stepMainText: {
    fontSize: '17px',
    lineHeight: '1.4',
    color: '#1f2937',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '400',
    marginBottom: '0.25rem',
    '& .highlight-red': {
      color: '#1f2937',
      fontWeight: '400',
      fontSize: '17px'
    }
  },
  subStepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
    marginTop: '0.25rem',
    paddingLeft: '0'
  },
  subStep: {
    fontSize: '17px',
    lineHeight: '1.4',
    color: '#1f2937',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '400',
    marginBottom: '0',
    '& .highlight-red': {
      color: '#1f2937',
      fontWeight: '400',
      fontSize: '17px'
    }
  },
  mathLine: {
    fontSize: '17px',
    lineHeight: '1.5',
    color: '#1f2937',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '400',
    marginBottom: '0.15rem',
    '& .highlight-red': {
      color: '#1f2937',
      fontWeight: '400',
      fontSize: '17px'
    }
  },
  explanationLine: {
    fontSize: '17px',
    lineHeight: '1.5',
    color: '#1f2937',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '400',
    marginTop: '0.1rem',
    marginBottom: '0.35rem',
    '& strong': {
      fontWeight: '600',
      color: '#1f2937'
    },
    '& u': {
      textDecoration: 'underline',
      textDecorationColor: '#f97316',
      textDecorationThickness: '2px',
      textUnderlineOffset: '2px',
      color: '#1f2937'
    }
  }
});

/**
 * Highlight numbers and math expressions in red
 * Keep it simple and minimalist
 */
const highlightMathInRed = (html) => {
  // Only highlight numbers, parentheses, operators, and special symbols in red
  // Don't wrap any other text - keep it simple
  return html.replace(/(\d+(?:\.\d+)?|\(|\)|\+|-|×|÷|=|≠|✓)/g, '<span class="highlight-red">$1</span>');
};

/**
 * Separate math from text explanation
 * Returns { math: string, explanation: string }
 */
const separateMathAndText = (html) => {
  // Remove HTML tags temporarily for analysis
  const plainText = html.replace(/<[^>]*>/g, '').trim();

  // Special case: if line ends with just ✓, keep it as pure math
  if (plainText.endsWith('✓') && !plainText.includes('Eliminate') && !plainText.includes('×')) {
    return { math: highlightMathInRed(plainText), explanation: null };
  }

  // Patterns that indicate where math ends and explanation begins
  const separators = [
    ' × ',           // "6 × Eliminate E"
    ' ✓ ',           // "5 ✓ This works"
    ' Eliminate',    // "6 Eliminate E"
    ', so ',
    ', therefore ',
    ', which ',
    '. So ',
    '. Therefore ',
    'We got ',
    'Try ',
    'Since ',
    'Because '
  ];

  // Check if line has a separator
  for (const sep of separators) {
    const sepIndex = plainText.indexOf(sep);
    if (sepIndex !== -1) {
      // Split at the separator
      // Math part is everything before separator
      // Explanation is separator + everything after
      const mathPart = plainText.substring(0, sepIndex).trim();
      const explanationPart = plainText.substring(sepIndex).trim();

      // Only create separation if both parts exist
      if (mathPart && explanationPart) {
        return {
          math: highlightMathInRed(mathPart),
          explanation: explanationPart // Don't highlight explanation, keep it subtle
        };
      }
    }
  }

  // If no separator found, check if it's mostly math or mostly text
  const mathChars = (plainText.match(/[\d\(\)\+\-×÷=≠✓]/g) || []).length;
  const totalChars = plainText.replace(/\s/g, '').length;
  const mathRatio = mathChars / totalChars;

  // If more than 50% math characters, treat as math line
  if (mathRatio > 0.5) {
    return { math: highlightMathInRed(plainText), explanation: null };
  } else {
    // Mostly text, treat as explanation
    return { math: null, explanation: plainText };
  }
};

/**
 * PhotomathSolution Component
 * Clean, compact solution display:
 * - Shows all steps at once
 * - Consistent black text
 * - Red highlighting on numbers
 * - Organized and compact spacing
 */
const PhotomathSolution = ({ solutionHTML, answer }) => {
  const classes = useStyles();
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    // Parse solution HTML into steps
    const parser = new DOMParser();
    const doc = parser.parseFromString(solutionHTML, 'text/html');

    const extractedSteps = [];

    // Find all top-level list items (each is a step)
    const topLevelUL = doc.querySelector('ul');
    if (topLevelUL) {
      const listItems = topLevelUL.querySelectorAll(':scope > li');
      listItems.forEach((li) => {
        // Clone the li to manipulate
        const liClone = li.cloneNode(true);

        // Extract the main text (before any nested ul)
        let mainText = '';
        const firstNestedUL = liClone.querySelector('ul');

        if (firstNestedUL) {
          // Get text before the nested ul
          const childNodes = Array.from(liClone.childNodes);
          for (const node of childNodes) {
            if (node === firstNestedUL) break;
            if (node.nodeType === Node.TEXT_NODE) {
              mainText += node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'UL') {
              mainText += node.outerHTML;
            }
          }
        } else {
          mainText = liClone.innerHTML;
        }

        // Get nested items (keep as single lines - no separation)
        const nestedItems = [];
        if (firstNestedUL) {
          const nestedLIs = firstNestedUL.querySelectorAll('li');
          nestedLIs.forEach(nestedLI => {
            nestedItems.push(nestedLI.innerHTML.trim());
          });
        }

        extractedSteps.push({
          mainText: mainText.trim(),
          nestedItems
        });
      });
    } else {
      // If no list structure, try to find paragraphs or other content
      const paragraphs = doc.querySelectorAll('p');
      paragraphs.forEach(p => {
        extractedSteps.push({
          mainText: p.innerHTML.trim(),
          nestedItems: []
        });
      });
    }

    // If we found no steps, treat the entire content as one step
    if (extractedSteps.length === 0) {
      extractedSteps.push({
        mainText: solutionHTML,
        nestedItems: []
      });
    }

    setSteps(extractedSteps);
  }, [solutionHTML]);

  if (steps.length === 0) {
    return null;
  }

  return (
    <div className={classes.solutionContainer}>
      {/* Answer Display - bold red text at the top */}
      {answer && (
        <div className={classes.answerDisplay}>
          Answer: {answer}
        </div>
      )}

      {/* Solution Header - subtle */}
      <div className={classes.solutionHeader}>
        Solution
      </div>

      {/* All Steps Visible - compact */}
      <div className={classes.stepsWrapper}>
        {steps.map((step, index) => (
            <div
              key={index}
              className={classes.stepItem}
            >
              {/* Main step text */}
              <div
                className={classes.stepMainText}
                dangerouslySetInnerHTML={{ __html: step.mainText }}
              />

              {/* Sub-steps (nested items) */}
              {step.nestedItems.length > 0 && (
                <div className={classes.subStepsList}>
                  {step.nestedItems.map((nestedItem, nestedIndex) => (
                    <div
                      key={nestedIndex}
                      className={classes.subStep}
                      dangerouslySetInnerHTML={{ __html: nestedItem }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhotomathSolution;
