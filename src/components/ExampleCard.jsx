/**
 * ExampleCard Component
 * Renders an interactive example using structured data from Supabase
 * Matches the exact styling of InteractiveQuiz with red marker
 */

import React, { useState, useEffect } from 'react';

/**
 * Parse answer explanation to extract explanation for each choice
 */
const parseChoiceExplanations = (text) => {
  if (!text) return {};

  const explanations = {};

  // Extract each choice section
  text.match(/\*\*Choice ([A-E]):(.*?)(?=\*\*Choice [A-E]:|The answer is|$)/gs)?.forEach(match => {
    const letterMatch = match.match(/\*\*Choice ([A-E]):/);
    const letter = letterMatch ? letterMatch[1] : '';

    // Extract explanation (everything between the choice text and the correct/incorrect marker)
    const contentMatch = match.match(/:\s*"([^"]+)"\*\*\s*(.*?)(?=✓ CORRECT|✗ Incorrect)/s);
    const explanation = contentMatch ? contentMatch[2].trim() : '';

    if (letter && explanation) {
      explanations[letter] = explanation;
    }
  });

  return explanations;
};

const ExampleCard = ({ example, position, isCurrentSection, typingSpeed, onComplete, onSolutionViewed }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);

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

  // Parse explanations for each choice
  const choiceExplanations = parseChoiceExplanations(example?.answer_explanation);

  // If example data is missing, don't render anything
  if (!example || !example.title || !example.problem_text) {
    console.warn('⚠️ ExampleCard: Missing required example data, not rendering');
    return null;
  }

  const handleChoiceClick = (letter) => {
    if (hasCheckedAnswer) return; // Already checked answer
    setSelectedChoice(letter);
  };

  const handleCheckAnswer = () => {
    if (!selectedChoice) return; // Must select an answer first
    setHasCheckedAnswer(true);
    setShowSolution(true); // Immediate, smooth transition
  };

  return (
    <div style={{
      margin: '3rem 0',
      padding: '0',
      position: 'relative'
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

      {/* Container for sticky question and scrollable content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'start'
      }}>
        {/* LEFT SIDE: Sticky Problem Statement */}
        <div style={{
          position: 'sticky',
          top: '1rem',
          alignSelf: 'start',
          maxHeight: 'calc(100vh - 2rem)',
          overflowY: 'auto'
        }}>
          <div style={{
            fontSize: '17px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            lineHeight: '1.6',
            fontWeight: '400',
            color: '#1f2937',
            paddingRight: '1rem'
          }}
          dangerouslySetInnerHTML={{ __html: problemContent }}
          >
          </div>

          {/* Diagram (if present) */}
          {example.diagram_svg && (
            <div style={{ marginTop: '1.5rem' }} dangerouslySetInnerHTML={{ __html: example.diagram_svg }} />
          )}
        </div>

        {/* RIGHT SIDE: Scrollable content (choices and solution) */}
        <div>

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
            const showFeedback = hasCheckedAnswer;
            const explanation = choiceExplanations[choice.letter];

            return (
              <div key={choice.letter} style={{ marginBottom: '1rem' }}>
                <div
                  onClick={() => handleChoiceClick(choice.letter)}
                  style={{
                    cursor: hasCheckedAnswer ? 'default' : 'pointer',
                    borderLeft: showFeedback && isSelected && isCorrectAnswer ? '3px solid #48bb78' :
                                showFeedback && isSelected && !isCorrectAnswer ? '3px solid #f56565' :
                                showFeedback && !isSelected && isCorrectAnswer ? '3px solid #48bb78' : 'none',
                    backgroundColor: showFeedback && isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.08)' :
                                     showFeedback && isSelected && !isCorrectAnswer ? 'rgba(245, 101, 101, 0.08)' :
                                     showFeedback && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.08)' : 'transparent',
                    borderRadius: '6px',
                    padding: '0.75rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Choice letter and text */}
                  <div style={{
                    display: 'flex',
                    gap: '0.8rem',
                    alignItems: 'center'
                  }}>
                    {/* Circular letter indicator */}
                    <div style={{
                      width: '26px',
                      height: '26px',
                      minWidth: '26px',
                      borderRadius: '50%',
                      border: isSelected && !showFeedback ? '2px solid #3b82f6' :
                              showFeedback && isSelected && isCorrectAnswer ? '2px solid #48bb78' :
                              showFeedback && isSelected && !isCorrectAnswer ? '2px solid #f56565' :
                              showFeedback && !isSelected && isCorrectAnswer ? '2px solid #48bb78' : '2px solid #cbd5e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '600',
                      fontSize: '0.7rem',
                      color: isSelected && !showFeedback ? '#3b82f6' :
                              showFeedback && isSelected && isCorrectAnswer ? '#48bb78' :
                              showFeedback && isSelected && !isCorrectAnswer ? '#f56565' :
                              showFeedback && !isSelected && isCorrectAnswer ? '#48bb78' : '#718096',
                      backgroundColor: isSelected && !showFeedback ? 'rgba(59, 130, 246, 0.1)' :
                                       showFeedback && isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.15)' :
                                       showFeedback && isSelected && !isCorrectAnswer ? 'rgba(245, 101, 101, 0.15)' :
                                       showFeedback && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.15)' : 'transparent',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
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

                  {/* Explanation integrated into the same box */}
                  {showFeedback && explanation && (
                    <div style={{
                      marginTop: '0.75rem',
                      marginLeft: '2.25rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                      animation: 'fadeSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: 1
                    }}>
                      <div style={{
                        fontSize: '0.8rem',
                        lineHeight: '1.6',
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        {explanation}
                      </div>
                      <div style={{
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        color: isCorrectAnswer ? '#16a34a' : '#dc2626'
                      }}>
                        {isCorrectAnswer ? '✓ CORRECT' : '✗ Incorrect'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

            {/* Check Answer Button - Bottom Right */}
            {!hasCheckedAnswer && selectedChoice && (
              <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={handleCheckAnswer}
                  style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '400',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#059669';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#10b981';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: '-1px' }}>
                      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Check Answer
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        </div> {/* Close right side div */}
      </div> {/* Close grid container */}

      {/* Smooth animation styles */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }
      `}</style>
    </div>
  );
};

export default ExampleCard;
