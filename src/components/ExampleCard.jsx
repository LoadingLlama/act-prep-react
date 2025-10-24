/**
 * ExampleCard Component
 * Renders an interactive example using structured data from Supabase
 * Matches the exact styling of InteractiveQuiz with red marker
 */

import React, { useState, useEffect } from 'react';

/**
 * Format solution text with better readability:
 * - Bold numbers and formulas
 * - Add spacing between paragraphs
 * - Highlight important terms
 */
const formatSolutionText = (text) => {
  if (!text) return null;

  // Split by double line breaks to identify paragraphs
  const paragraphs = text.split('\n\n');

  return paragraphs.map((paragraph, idx) => {
    // Split by single line breaks for individual lines
    const lines = paragraph.split('\n');

    return (
      <div key={idx} style={{ marginBottom: '1.5rem' }}>
        {lines.map((line, lineIdx) => {
          // Check if this line is a calculation or formula (contains =, ×, ÷, etc.)
          const isCalculation = /[=×÷+\-]/.test(line) && /\d/.test(line);

          // Check if line has checkmarks/crosses (feedback line)
          const isFeedback = /[✓✗]/.test(line);

          return (
            <div
              key={lineIdx}
              style={{
                marginBottom: lineIdx < lines.length - 1 ? '0.75rem' : '0',
                paddingLeft: isCalculation ? '1rem' : '0',
                fontWeight: isCalculation ? '500' : '400',
                color: isFeedback ? '#6b7280' : '#1f2937',
                fontSize: isCalculation ? '1.05rem' : '1rem',
                lineHeight: '1.8'
              }}
              dangerouslySetInnerHTML={{
                __html: line
                  // Bold numbers
                  .replace(/\b(\d+(?:\.\d+)?)\b/g, '<strong>$1</strong>')
                  // Bold answer choices (A, B, C, D, E followed by period)
                  .replace(/\b([A-E])\./g, '<strong>$1.</strong>')
                  // Bold key terms like "Total", "He needs to sell", etc.
                  .replace(/\b(Total|Step \d+|Answer|Result|Therefore|So|Note):/gi, '<strong>$1:</strong>')
              }}
            />
          );
        })}
      </div>
    );
  });
};

const ExampleCard = ({ example, position, isCurrentSection, typingSpeed, onComplete, onSolutionViewed }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  // For worked examples (no choices), show solution immediately
  useEffect(() => {
    if (example?.is_worked_example && !showSolution) {
      setShowSolution(true);
    }
  }, [example?.is_worked_example, showSolution]);

  // Notify parent when solution is shown
  useEffect(() => {
    if (showSolution && onSolutionViewed) {
      onSolutionViewed();
    }
  }, [showSolution, onSolutionViewed]);

  // Extract question from problem_text (look for last <p> tag with question mark or colon)
  const extractQuestionAndContent = (htmlText) => {
    if (!htmlText) return { content: '', question: '' };

    // Split by <p> tags and find the last one that looks like a question
    const pTagRegex = /<p[^>]*>(.*?)<\/p>/gs;
    const matches = [...htmlText.matchAll(pTagRegex)];

    if (matches.length === 0) return { content: htmlText, question: '' };

    // Find the last <p> tag that contains a question mark or ends with colon
    for (let i = matches.length - 1; i >= 0; i--) {
      const match = matches[i];
      const text = match[1];
      if (text.includes('?') || text.includes(':') && text.length < 200) {
        // This is likely the question
        const questionHtml = match[0];
        const content = htmlText.replace(questionHtml, '').trim();
        return { content, question: text };
      }
    }

    return { content: htmlText, question: '' };
  };

  const { content: problemContent, question: questionText } = extractQuestionAndContent(example?.problem_text);

  // If example data is missing, don't render anything
  if (!example || !example.title || !example.problem_text) {
    console.warn('⚠️ ExampleCard: Missing required example data, not rendering');
    return null;
  }

  const handleChoiceClick = (letter) => {
    if (selectedChoice) return; // Already selected
    setSelectedChoice(letter);
    setTimeout(() => setShowSolution(true), 300);
  };

  return (
    <div style={{
      margin: '3rem 0',
      padding: '0'
    }}>
      {/* Example Header - gray bar with red accent */}
      <div style={{
        backgroundColor: '#f3f4f6',
        padding: '0.5rem 0.75rem',
        marginBottom: '1.25rem',
        borderLeft: '3px solid #ef4444',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#6b7280',
          letterSpacing: '0.025em'
        }}>
          Example {position}: {example.title}
        </div>
      </div>

      {/* Two-column layout: Problem/Table on left, Answer Choices on right */}
      <div style={{
        display: 'flex',
        gap: '3rem',
        alignItems: 'flex-start',
        marginBottom: '1.25rem'
      }}>
        {/* LEFT SIDE: Problem Statement and Table */}
        <div style={{
          flex: '1 1 60%',
          minWidth: '0'
        }}>
          <div style={{
            fontSize: '17px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            lineHeight: '1.6',
            fontWeight: '400',
            color: '#1f2937'
          }}
          dangerouslySetInnerHTML={{ __html: problemContent }}
          >
          </div>

          {/* Diagram (if present) */}
          {example.diagram_svg && (
            <div dangerouslySetInnerHTML={{ __html: example.diagram_svg }} />
          )}
        </div>

        {/* RIGHT SIDE: Question + Answer Choices - sticky positioned with subtle separator */}
        {!example.is_worked_example && example.choices && example.choices.length > 0 && (
          <div style={{
            flex: '0 0 35%',
            position: 'sticky',
            top: '2rem',
            alignSelf: 'flex-start',
            paddingLeft: '2rem',
            borderLeft: '1px solid #e5e7eb'
          }}>
            {/* Question text */}
            {questionText && (
              <div style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1.2rem',
                lineHeight: '1.5',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}>
                {questionText}
              </div>
            )}

            {/* Answer choices */}
            {example.choices.map((choice) => {
            const isSelected = selectedChoice === choice.letter;
            const isCorrectAnswer = choice.letter === example.correct_answer;
            const showFeedback = showSolution;

            return (
              <div
                key={choice.letter}
                onClick={() => {
                  if (!showFeedback) {
                    handleChoiceClick(choice.letter);
                  }
                }}
                style={{
                  display: 'flex',
                  gap: '0.8rem',
                  padding: '0.5rem 0.75rem',
                  margin: '0.25rem 0',
                  cursor: showFeedback ? 'default' : 'pointer',
                  alignItems: 'center',
                  borderLeft: showFeedback && isSelected && isCorrectAnswer ? '3px solid #48bb78' :
                              showFeedback && isSelected && !isCorrectAnswer ? '3px solid #f56565' :
                              showFeedback && !isSelected && isCorrectAnswer ? '3px solid #48bb78' : 'none',
                  paddingLeft: showFeedback && (isSelected || isCorrectAnswer) ? '0.75rem' : '0.75rem',
                  backgroundColor: showFeedback && isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.08)' :
                                   showFeedback && isSelected && !isCorrectAnswer ? 'rgba(245, 101, 101, 0.08)' :
                                   showFeedback && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.08)' : 'transparent',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: !showFeedback ? 'rgba(0, 0, 0, 0.02)' : undefined
                  }
                }}
              >
                {/* Circular letter indicator */}
                <div style={{
                  width: '26px',
                  height: '26px',
                  minWidth: '26px',
                  borderRadius: '50%',
                  border: isSelected && !showFeedback ? '2px solid #10b981' :
                          showFeedback && isSelected && isCorrectAnswer ? '2px solid #48bb78' :
                          showFeedback && isSelected && !isCorrectAnswer ? '2px solid #f56565' :
                          showFeedback && !isSelected && isCorrectAnswer ? '2px solid #48bb78' : '2px solid #cbd5e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '0.7rem',
                  color: isSelected && !showFeedback ? '#10b981' :
                          showFeedback && isSelected && isCorrectAnswer ? '#48bb78' :
                          showFeedback && isSelected && !isCorrectAnswer ? '#f56565' :
                          showFeedback && !isSelected && isCorrectAnswer ? '#48bb78' : '#718096',
                  backgroundColor: isSelected && !showFeedback ? 'rgba(16, 185, 129, 0.1)' :
                                   showFeedback && isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.15)' :
                                   showFeedback && isSelected && !isCorrectAnswer ? 'rgba(245, 101, 101, 0.15)' :
                                   showFeedback && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.15)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}>
                  {showFeedback && isSelected && isCorrectAnswer ? '✓' :
                   showFeedback && isSelected && !isCorrectAnswer ? '✗' :
                   showFeedback && !isSelected && isCorrectAnswer ? '✓' : choice.letter}
                </div>

                {/* Option text */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '15px',
                    color: '#1f2937',
                    lineHeight: '1.5',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: '400'
                  }}>
                    {choice.text}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>

      {/* Solution - matches quiz explanation style */}
      {showSolution && (
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          {/* Show correct answer in bold red */}
          <div style={{
            fontSize: '1.15rem',
            fontWeight: '700',
            color: '#dc2626',
            marginBottom: '1.25rem',
            letterSpacing: '0.01em'
          }}>
            Answer: {example.correct_answer}
          </div>

          {/* Solution header */}
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#6b7280',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            Solution
          </div>

          {/* Solution Steps or Answer Explanation */}
          <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}>
            {/* If solution_steps exists and has items, display them */}
            {example.solution_steps && example.solution_steps.length > 0 ? (
              <ul style={{
                margin: '0',
                paddingLeft: '1.5rem',
                listStyle: 'none'
              }}>
                {example.solution_steps.map((step, idx) => (
                  <li key={step.step} style={{
                    marginBottom: '1.25rem',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#1f2937'
                  }}>
                    {/* Step number bullet */}
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      fontWeight: '600',
                      color: '#2563eb'
                    }}>
                      {idx + 1}.
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: step.text }} />
                  </li>
                ))}
              </ul>
            ) : example.answer_explanation ? (
              /* Format answer_explanation with better spacing and bold text */
              <div style={{
                fontSize: '1rem',
                lineHeight: '1.8'
              }}>
                {formatSolutionText(example.answer_explanation)}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleCard;
