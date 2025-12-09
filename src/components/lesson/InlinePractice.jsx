/**
 * Inline Practice Components
 * Seamlessly integrated practice questions with minimal styling
 */

import React, { useState } from 'react';

/**
 * QuickCheck - Simple multiple choice practice
 */
export const QuickCheck = ({ question, choices, correctAnswer, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleChoice = (index) => {
    setSelected(index);
    setShowFeedback(true);
  };

  const handleRetry = () => {
    setSelected(null);
    setShowFeedback(false);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div style={{
      margin: '2rem 0',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: '#fafafa'
    }}>
      <div style={{
        backgroundColor: '#dc2626',
        padding: '0.25rem 1.25rem',
        fontSize: '10px',
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: '0.05em'
      }}>
        EXERCISE
      </div>
      <div style={{
        padding: '1rem 1.25rem'
      }}>
        <div style={{
          fontSize: '15px',
          fontWeight: '500',
          color: '#1f2937',
          marginBottom: '0.75rem'
        }}>
          {question}
        </div>

        <div>
          {choices.map((choice, index) => (
          <div
            key={index}
            onClick={() => !showFeedback && handleChoice(index)}
            onMouseEnter={() => !showFeedback && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              padding: '0.5rem 0',
              cursor: showFeedback ? 'default' : 'pointer',
              fontSize: '15px',
              color: '#1f2937',
              lineHeight: '1.6'
            }}
          >
            <span style={{ fontWeight: '600', marginRight: '0.5rem' }}>
              {index + 1})
            </span>
            <span style={{
              textDecoration: selected === index ? 'underline' : 'none',
              fontWeight: hoveredIndex === index && !showFeedback ? '700' : 'normal'
            }}>
              {choice}
            </span>
            {showFeedback && index === correctAnswer && (
              <span style={{ marginLeft: '0.5rem', color: '#16a34a' }}>✓</span>
            )}
            {showFeedback && index === selected && index !== correctAnswer && (
              <span style={{ marginLeft: '0.5rem', color: '#dc2626' }}>✗</span>
            )}
          </div>
        ))}
        </div>

        {showFeedback && (
          <>
            <div style={{
              marginTop: '0.75rem',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#374151',
              fontStyle: 'italic'
            }}>
              {explanation}
            </div>
            <button
              onClick={handleRetry}
              style={{
                marginTop: '0.75rem',
                padding: '0.5rem 1.25rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * IdentifyError - Find the mistake in a sentence
 */
export const IdentifyError = ({ sentence, parts, correctPart, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleSelect = (index) => {
    setSelected(index);
    setShowFeedback(true);
  };

  const handleRetry = () => {
    setSelected(null);
    setShowFeedback(false);
  };

  const isCorrect = selected === correctPart;

  return (
    <div style={{
      margin: '2rem 0',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: '#fafafa'
    }}>
      <div style={{
        backgroundColor: '#dc2626',
        padding: '0.25rem 1.25rem',
        fontSize: '10px',
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: '0.05em'
      }}>
        EXERCISE
      </div>
      <div style={{
        padding: '1rem 1.25rem'
      }}>
        <div style={{
          fontSize: '15px',
          fontWeight: '500',
          color: '#1f2937',
          marginBottom: '0.75rem'
        }}>
          Identify which part of this sentence contains an error.
        </div>

        <div style={{
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#1f2937',
          marginBottom: '0.75rem'
        }}>
          {sentence}
        </div>

        <div>
          {parts.map((part, index) => (
          <div
            key={index}
            onClick={() => !showFeedback && handleSelect(index)}
            onMouseEnter={() => !showFeedback && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              padding: '0.5rem 0',
              cursor: showFeedback ? 'default' : 'pointer',
              fontSize: '15px',
              color: '#1f2937',
              lineHeight: '1.6'
            }}
          >
            <span style={{ fontWeight: '600', marginRight: '0.5rem' }}>
              {index + 1})
            </span>
            <span style={{
              textDecoration: selected === index ? 'underline' : 'none',
              fontWeight: hoveredIndex === index && !showFeedback ? '700' : 'normal'
            }}>
              {part}
            </span>
            {showFeedback && index === correctPart && (
              <span style={{ marginLeft: '0.5rem', color: '#dc2626' }}>← Error</span>
            )}
          </div>
        ))}
        </div>

        {showFeedback && (
          <>
            <div style={{
              marginTop: '0.75rem',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#374151',
              fontStyle: 'italic'
            }}>
              {explanation}
            </div>
            <button
              onClick={handleRetry}
              style={{
                marginTop: '0.75rem',
                padding: '0.5rem 1.25rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * TrueFalse - Quick true/false check
 */
export const TrueFalse = ({ statement, correctAnswer, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleChoice = (choice) => {
    setSelected(choice);
    setShowFeedback(true);
  };

  const handleRetry = () => {
    setSelected(null);
    setShowFeedback(false);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div style={{
      margin: '2rem 0',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: '#fafafa'
    }}>
      <div style={{
        backgroundColor: '#dc2626',
        padding: '0.25rem 1.25rem',
        fontSize: '10px',
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: '0.05em'
      }}>
        EXERCISE
      </div>
      <div style={{
        padding: '1rem 1.25rem'
      }}>
        <div style={{
          fontSize: '15px',
          fontWeight: '500',
          color: '#1f2937',
          marginBottom: '0.75rem'
        }}>
          True or False?
        </div>

        <div style={{
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#1f2937',
          marginBottom: '0.75rem'
        }}>
          {statement}
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
        <div
          onClick={() => !showFeedback && handleChoice(true)}
          onMouseEnter={() => !showFeedback && setHoveredOption('true')}
          onMouseLeave={() => setHoveredOption(null)}
          style={{
            cursor: showFeedback ? 'default' : 'pointer',
            fontSize: '15px',
            color: '#1f2937'
          }}
        >
          <span style={{
            textDecoration: selected === true ? 'underline' : 'none',
            fontWeight: hoveredOption === 'true' && !showFeedback ? '700' : '600'
          }}>
            TRUE
          </span>
          {showFeedback && correctAnswer === true && (
            <span style={{ marginLeft: '0.5rem', color: '#16a34a' }}>✓</span>
          )}
          {showFeedback && selected === true && correctAnswer === false && (
            <span style={{ marginLeft: '0.5rem', color: '#dc2626' }}>✗</span>
          )}
        </div>
        <div
          onClick={() => !showFeedback && handleChoice(false)}
          onMouseEnter={() => !showFeedback && setHoveredOption('false')}
          onMouseLeave={() => setHoveredOption(null)}
          style={{
            cursor: showFeedback ? 'default' : 'pointer',
            fontSize: '15px',
            color: '#1f2937'
          }}
        >
          <span style={{
            textDecoration: selected === false ? 'underline' : 'none',
            fontWeight: hoveredOption === 'false' && !showFeedback ? '700' : '600'
          }}>
            FALSE
          </span>
          {showFeedback && correctAnswer === false && (
            <span style={{ marginLeft: '0.5rem', color: '#16a34a' }}>✓</span>
          )}
          {showFeedback && selected === false && correctAnswer === true && (
            <span style={{ marginLeft: '0.5rem', color: '#dc2626' }}>✗</span>
          )}
        </div>
        </div>

        {showFeedback && (
          <>
            <div style={{
              marginTop: '0.75rem',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#374151',
              fontStyle: 'italic'
            }}>
              {explanation}
            </div>
            <button
              onClick={handleRetry}
              style={{
                marginTop: '0.75rem',
                padding: '0.5rem 1.25rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * ApplyTheRule - Practice applying a specific rule
 */
export const ApplyTheRule = ({ title, question, options, correctAnswer, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleSelect = (index) => {
    setSelected(index);
    setShowFeedback(true);
  };

  const handleRetry = () => {
    setSelected(null);
    setShowFeedback(false);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div style={{
      margin: '2rem 0',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: '#fafafa'
    }}>
      <div style={{
        backgroundColor: '#dc2626',
        padding: '0.25rem 1.25rem',
        fontSize: '10px',
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: '0.05em'
      }}>
        EXERCISE
      </div>
      <div style={{
        padding: '1rem 1.25rem'
      }}>
        <div style={{
          fontSize: '15px',
          fontWeight: '500',
          color: '#1f2937',
          marginBottom: '0.75rem'
        }}>
          {question}
        </div>

        <div>
          {options.map((option, index) => (
          <div
            key={index}
            onClick={() => !showFeedback && handleSelect(index)}
            onMouseEnter={() => !showFeedback && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              padding: '0.5rem 0',
              cursor: showFeedback ? 'default' : 'pointer',
              fontSize: '15px',
              color: '#1f2937',
              lineHeight: '1.6'
            }}
          >
            <span style={{ fontWeight: '600', marginRight: '0.5rem' }}>
              {index + 1})
            </span>
            <span style={{
              textDecoration: selected === index ? 'underline' : 'none',
              fontWeight: hoveredIndex === index && !showFeedback ? '700' : 'normal'
            }}>
              {option}
            </span>
            {showFeedback && index === correctAnswer && (
              <span style={{ marginLeft: '0.5rem', color: '#16a34a' }}>✓</span>
            )}
            {showFeedback && index === selected && index !== correctAnswer && (
              <span style={{ marginLeft: '0.5rem', color: '#dc2626' }}>✗</span>
            )}
          </div>
        ))}
        </div>

        {showFeedback && (
          <>
            <div style={{
              marginTop: '0.75rem',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#374151',
              fontStyle: 'italic'
            }}>
              {explanation}
            </div>
            <button
              onClick={handleRetry}
              style={{
                marginTop: '0.75rem',
                padding: '0.5rem 1.25rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * LabelSentences - Label sentences as Independent (I), Dependent (D), or Phrase (P)
 */
export const LabelSentences = ({ sentences }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswer = (index, label) => {
    if (!answers[index]) {
      setAnswers({ ...answers, [index]: label });
    }
  };

  const handleRetry = () => {
    setAnswers({});
  };

  const allAnswered = Object.keys(answers).length === sentences.length;

  const score = sentences.reduce((acc, sentence, index) => {
    return acc + (answers[index] === sentence.correctLabel ? 1 : 0);
  }, 0);

  return (
    <div style={{
      margin: '1.5rem 0',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: '#fafafa'
    }}>
      <div style={{
        backgroundColor: '#dc2626',
        padding: '0.25rem 1.25rem',
        fontSize: '10px',
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: '0.05em'
      }}>
        EXERCISE
      </div>
      <div style={{
        padding: '0.75rem 1rem'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#1f2937',
          marginBottom: '0.5rem'
        }}>
          Label each sentence as <strong>Independent (I)</strong>, <strong>Dependent (D)</strong>, or <strong>Phrase (P)</strong>:
        </div>

        <div>
          {sentences.map((sentence, index) => (
            <div
              key={index}
              style={{
                padding: '0.5rem 0',
                borderBottom: index < sentences.length - 1 ? '1px solid #e5e7eb' : 'none'
              }}
            >
              <div style={{
                fontSize: '14px',
                color: '#1f2937',
                marginBottom: '0.375rem',
                lineHeight: '1.5'
              }}>
                {index + 1}. {sentence.text}
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                {['I', 'D', 'P'].map((label) => {
                  const isSelected = answers[index] === label;
                  const isCorrect = sentence.correctLabel === label;
                  const hasAnswered = answers[index] !== undefined;

                  let backgroundColor = '#f3f4f6';
                  let textColor = '#6b7280';

                  if (hasAnswered) {
                    if (isCorrect) {
                      backgroundColor = '#dcfce7';
                      textColor = '#166534';
                    } else if (isSelected) {
                      backgroundColor = '#fee2e2';
                      textColor = '#991b1b';
                    }
                  } else if (isSelected) {
                    backgroundColor = '#eff6ff';
                    textColor = '#2563eb';
                  }

                  return (
                    <button
                      key={label}
                      onClick={() => handleAnswer(index, label)}
                      style={{
                        padding: '0.25rem 0.75rem',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor,
                        color: textColor,
                        fontWeight: isSelected || (hasAnswered && isCorrect) ? '600' : '500',
                        fontSize: '13px',
                        cursor: hasAnswered ? 'default' : 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {label}
                      {hasAnswered && isSelected && isCorrect && (
                        <span style={{ marginLeft: '0.375rem' }}>✓</span>
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <span style={{ marginLeft: '0.375rem' }}>✕</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {allAnswered && (
          <>
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              backgroundColor: score === sentences.length ? '#f0fdf4' : '#fef3c7',
              borderRadius: '6px'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: score === sentences.length ? '#166534' : '#92400e',
                marginBottom: '0.375rem'
              }}>
                Score: {score} / {sentences.length}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#374151',
                fontStyle: 'italic'
              }}>
                {score === sentences.length
                  ? 'Perfect! You understand the difference between independent clauses, dependent clauses, and phrases.'
                  : score >= sentences.length * 0.7
                  ? 'Good work! Review the ones you missed to strengthen your understanding.'
                  : 'Keep practicing! Review the rules above and try again.'}
              </div>
            </div>
            <button
              onClick={handleRetry}
              style={{
                marginTop: '0.75rem',
                padding: '0.5rem 1.25rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * IdentifyCommaType - Identify which comma rule applies to each sentence
 */
export const IdentifyCommaType = ({ sentences }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswer = (index, type) => {
    if (!answers[index]) {
      setAnswers({ ...answers, [index]: type });
    }
  };

  const handleRetry = () => {
    setAnswers({});
  };

  const allAnswered = Object.keys(answers).length === sentences.length;

  const score = sentences.reduce((acc, sentence, index) => {
    return acc + (answers[index] === sentence.correctType ? 1 : 0);
  }, 0);

  const types = [
    { code: '1', label: 'Type 1 (FANBOYS)', desc: 'Comma + FANBOYS' },
    { code: '2', label: 'Type 2 (Dependent)', desc: 'Dependent → Independent' },
    { code: '3', label: 'Type 3 (Unnecessary)', desc: 'Unnecessary Info' },
    { code: '4', label: 'Type 4 (List)', desc: 'List/Series' },
    { code: 'X', label: 'Incorrect', desc: 'Wrong comma usage' }
  ];

  return (
    <div style={{
      margin: '1.5rem 0',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: '#fafafa'
    }}>
      <div style={{
        backgroundColor: '#dc2626',
        padding: '0.25rem 1.25rem',
        fontSize: '10px',
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: '0.05em'
      }}>
        EXERCISE
      </div>
      <div style={{
        padding: '0.75rem 1rem'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#1f2937',
          marginBottom: '0.5rem'
        }}>
          Identify which comma rule applies to each sentence (or if the comma usage is incorrect):
        </div>

        <div>
          {sentences.map((sentence, index) => (
            <div
              key={index}
              style={{
                padding: '0.5rem 0',
                borderBottom: index < sentences.length - 1 ? '1px solid #e5e7eb' : 'none'
              }}
            >
              <div style={{
                fontSize: '14px',
                color: '#1f2937',
                marginBottom: '0.375rem',
                lineHeight: '1.5'
              }}>
                {index + 1}. {sentence.text}
              </div>
              <div style={{
                display: 'flex',
                gap: '0.4rem',
                flexWrap: 'wrap'
              }}>
                {types.map((type) => {
                  const isSelected = answers[index] === type.code;
                  const isCorrect = sentence.correctType === type.code;
                  const hasAnswered = answers[index] !== undefined;

                  let backgroundColor = '#f3f4f6';
                  let textColor = '#6b7280';

                  if (hasAnswered) {
                    if (isCorrect) {
                      backgroundColor = '#dcfce7';
                      textColor = '#166534';
                    } else if (isSelected) {
                      backgroundColor = '#fee2e2';
                      textColor = '#991b1b';
                    }
                  }

                  return (
                    <button
                      key={type.code}
                      onClick={() => handleAnswer(index, type.code)}
                      title={type.desc}
                      style={{
                        padding: '0.2rem 0.5rem',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor,
                        color: textColor,
                        fontWeight: isSelected || (hasAnswered && isCorrect) ? '600' : '500',
                        fontSize: '12px',
                        cursor: hasAnswered ? 'default' : 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {type.code}
                      {hasAnswered && isSelected && isCorrect && (
                        <span style={{ marginLeft: '0.25rem' }}>✓</span>
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <span style={{ marginLeft: '0.25rem' }}>✕</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {allAnswered && (
          <>
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              backgroundColor: score === sentences.length ? '#f0fdf4' : '#fef3c7',
              borderRadius: '6px'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: score === sentences.length ? '#166534' : '#92400e',
                marginBottom: '0.375rem'
              }}>
                Score: {score} / {sentences.length}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#374151',
                fontStyle: 'italic'
              }}>
                {score === sentences.length
                  ? 'Perfect! You\'ve mastered all four comma types.'
                  : score >= sentences.length * 0.7
                  ? 'Good work! Review the ones you missed to strengthen your understanding.'
                  : 'Keep practicing! Review the comma rules above and try again.'}
              </div>
            </div>
            <button
              onClick={handleRetry}
              style={{
                marginTop: '0.75rem',
                padding: '0.5rem 1.25rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * CommaCorrectness - Identify if comma usage is correct or incorrect
 * Shows corrected version for incorrect sentences
 */
export const CommaCorrectness = ({ sentences }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswer = (index, isCorrectAnswer) => {
    if (!answers[index]) {
      setAnswers({ ...answers, [index]: isCorrectAnswer });
    }
  };

  const handleRetry = () => {
    setAnswers({});
  };

  const allAnswered = Object.keys(answers).length === sentences.length;

  const score = sentences.reduce((acc, sentence, index) => {
    return acc + (answers[index] === sentence.isCorrect ? 1 : 0);
  }, 0);

  return (
    <div style={{
      margin: '1.5rem 0',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: '#fafafa'
    }}>
      <div style={{
        backgroundColor: '#dc2626',
        padding: '0.25rem 1.25rem',
        fontSize: '10px',
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: '0.05em'
      }}>
        EXERCISE
      </div>
      <div style={{
        padding: '0.75rem 1rem'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '0.75rem'
        }}>
          Is the comma usage correct or incorrect in each sentence?
        </div>

        <div>
          {sentences.map((sentence, index) => {
            const hasAnswered = answers[index] !== undefined;
            const userAnswer = answers[index];
            const correctAnswer = sentence.isCorrect;
            const isUserCorrect = userAnswer === correctAnswer;

            return (
              <div
                key={index}
                style={{
                  padding: '0.75rem 0',
                  borderBottom: index < sentences.length - 1 ? '1px solid #e5e7eb' : 'none'
                }}
              >
                <div style={{
                  fontSize: '14px',
                  color: '#1f2937',
                  marginBottom: '0.5rem',
                  lineHeight: '1.6'
                }}>
                  {index + 1}. {sentence.text}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginBottom: hasAnswered && !correctAnswer ? '0.5rem' : '0'
                }}>
                  <button
                    onClick={() => handleAnswer(index, true)}
                    disabled={hasAnswered}
                    style={{
                      padding: '0.375rem 1rem',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: hasAnswered && userAnswer === true
                        ? (isUserCorrect ? '#dcfce7' : '#fee2e2')
                        : (hasAnswered && correctAnswer === true ? '#dcfce7' : '#f3f4f6'),
                      color: hasAnswered && userAnswer === true
                        ? (isUserCorrect ? '#166534' : '#991b1b')
                        : (hasAnswered && correctAnswer === true ? '#166534' : '#6b7280'),
                      fontWeight: hasAnswered && (userAnswer === true || correctAnswer === true) ? '600' : '500',
                      fontSize: '13px',
                      cursor: hasAnswered ? 'default' : 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Correct
                    {hasAnswered && userAnswer === true && isUserCorrect && ' ✓'}
                    {hasAnswered && userAnswer === true && !isUserCorrect && ' ✕'}
                    {hasAnswered && userAnswer !== true && correctAnswer === true && ' ✓'}
                  </button>

                  <button
                    onClick={() => handleAnswer(index, false)}
                    disabled={hasAnswered}
                    style={{
                      padding: '0.375rem 1rem',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: hasAnswered && userAnswer === false
                        ? (isUserCorrect ? '#dcfce7' : '#fee2e2')
                        : (hasAnswered && correctAnswer === false ? '#dcfce7' : '#f3f4f6'),
                      color: hasAnswered && userAnswer === false
                        ? (isUserCorrect ? '#166534' : '#991b1b')
                        : (hasAnswered && correctAnswer === false ? '#166534' : '#6b7280'),
                      fontWeight: hasAnswered && (userAnswer === false || correctAnswer === false) ? '600' : '500',
                      fontSize: '13px',
                      cursor: hasAnswered ? 'default' : 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Incorrect
                    {hasAnswered && userAnswer === false && isUserCorrect && ' ✓'}
                    {hasAnswered && userAnswer === false && !isUserCorrect && ' ✕'}
                    {hasAnswered && userAnswer !== false && correctAnswer === false && ' ✓'}
                  </button>
                </div>

                {hasAnswered && !correctAnswer && (
                  <div style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: '#f0fdf4',
                    borderLeft: '3px solid #16a34a',
                    borderRadius: '4px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#166534',
                      marginBottom: '0.25rem'
                    }}>
                      Corrected:
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#1f2937',
                      lineHeight: '1.5'
                    }}>
                      {sentence.correctedVersion}
                    </div>
                    {sentence.explanation && (
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        marginTop: '0.375rem',
                        fontStyle: 'italic'
                      }}>
                        {sentence.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allAnswered && (
          <>
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              backgroundColor: score === sentences.length ? '#f0fdf4' : '#fef3c7',
              borderRadius: '6px'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: score === sentences.length ? '#166534' : '#92400e',
                marginBottom: '0.375rem'
              }}>
                Score: {score} / {sentences.length}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#374151',
                fontStyle: 'italic'
              }}>
                {score === sentences.length
                  ? 'Perfect! You correctly identified all comma usage.'
                  : score >= sentences.length * 0.7
                  ? 'Good work! Review the corrections above to strengthen your understanding.'
                  : 'Keep practicing! Review the corrected sentences above and try again.'}
              </div>
            </div>
            <button
              onClick={handleRetry}
              style={{
                marginTop: '0.75rem',
                padding: '0.5rem 1.25rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};
