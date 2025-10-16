/**
 * ExampleCard Component
 * Renders an interactive example using structured data from Supabase
 * Matches the exact styling of InteractiveQuiz with red marker
 */

import React, { useState, useEffect } from 'react';

const ExampleCard = ({ example, position, isCurrentSection, typingSpeed, onComplete }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  // For worked examples (no choices), show solution immediately
  useEffect(() => {
    if (example?.is_worked_example && !showSolution) {
      setShowSolution(true);
    }
  }, [example?.is_worked_example, showSolution]);

  // Auto-complete when solution is shown
  useEffect(() => {
    if (showSolution && onComplete) {
      setTimeout(() => onComplete(), 100);
    }
  }, [showSolution, onComplete]);

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
      padding: '1.5rem',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#fafafa'
    }}>
      {/* Example Header with red left border marker */}
      <h4 style={{
        margin: '0 0 1rem 0',
        paddingLeft: '0.75rem',
        borderLeft: '4px solid #b91c1c',
        color: '#000000',
        fontWeight: 700,
        fontSize: '1.1rem'
      }}>
        Example {position}: {example.title}
      </h4>

      {/* Problem Statement - same font as answer choices for consistency */}
      <p style={{
        fontSize: '17px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        lineHeight: '1.6',
        marginBottom: '1.25rem',
        fontWeight: '400',
        color: '#1f2937'
      }}>
        {example.problem_text}
      </p>

      {/* Diagram (if present) */}
      {example.diagram_svg && (
        <div dangerouslySetInnerHTML={{ __html: example.diagram_svg }} />
      )}

      {/* Answer Choices - matches quiz options style exactly */}
      {!example.is_worked_example && example.choices && example.choices.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
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
                    fontSize: '17px',
                    color: '#1f2937',
                    lineHeight: '1.6',
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

          {/* Solution Steps */}
          <div style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#1f2937',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: '400'
          }}>
            <ul style={{ margin: '0', paddingLeft: '1.5rem' }}>
              {example.solution_steps && example.solution_steps.map((step) => (
                <li key={step.step} style={{
                  margin: '0.5rem 0',
                }}>
                  <span dangerouslySetInnerHTML={{ __html: step.text }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleCard;
