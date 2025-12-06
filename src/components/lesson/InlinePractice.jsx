/**
 * Inline Practice Components
 * Seamlessly integrated practice questions with varied styles
 */

import React, { useState } from 'react';

/**
 * QuickCheck - Simple multiple choice practice
 */
export const QuickCheck = ({ question, choices, correctAnswer, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChoice = (index) => {
    setSelected(index);
    setShowFeedback(true);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div style={{
      margin: '2rem 0 2rem 1rem',
      padding: '1.5rem',
      backgroundColor: '#fafafa',
      borderLeft: '4px solid #3b82f6',
      borderRadius: '4px'
    }}>
      <div style={{
        fontSize: '13px',
        fontWeight: '700',
        letterSpacing: '0.05em',
        color: '#3b82f6',
        marginBottom: '1rem'
      }}>
        ✏️ QUICK CHECK
      </div>

      <div style={{
        fontSize: '15px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1rem',
        lineHeight: '1.6'
      }}>
        {question}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoice(index)}
            disabled={showFeedback}
            style={{
              padding: '0.75rem 1rem',
              textAlign: 'left',
              border: showFeedback
                ? (index === correctAnswer ? '2px solid #16a34a' : index === selected ? '2px solid #dc2626' : '1px solid #d1d5db')
                : '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: showFeedback
                ? (index === correctAnswer ? '#f0fdf4' : index === selected ? '#fef2f2' : '#ffffff')
                : (selected === index ? '#f3f4f6' : '#ffffff'),
              cursor: showFeedback ? 'default' : 'pointer',
              fontSize: '14px',
              color: '#1f2937',
              transition: 'all 0.2s',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                fontWeight: '600',
                minWidth: '20px'
              }}>
                {String.fromCharCode(65 + index)}.
              </span>
              <span style={{ flex: 1 }}>{choice}</span>
              {showFeedback && index === correctAnswer && (
                <span style={{ color: '#16a34a', fontWeight: '700' }}>✓</span>
              )}
              {showFeedback && index === selected && index !== correctAnswer && (
                <span style={{ color: '#dc2626', fontWeight: '700' }}>✗</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {showFeedback && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
          border: isCorrect ? '1px solid #86efac' : '1px solid #fecaca',
          borderRadius: '6px',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#1f2937'
        }}>
          <div style={{
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: isCorrect ? '#16a34a' : '#dc2626'
          }}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
          </div>
          <div>{explanation}</div>
        </div>
      )}
    </div>
  );
};

/**
 * IdentifyError - Find the mistake in a sentence
 */
export const IdentifyError = ({ sentence, parts, correctPart, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (index) => {
    setSelected(index);
    setShowFeedback(true);
  };

  const isCorrect = selected === correctPart;

  return (
    <div style={{
      margin: '2rem 0 2rem 1rem',
      padding: '1.5rem',
      backgroundColor: '#fffbeb',
      border: '2px solid #fbbf24',
      borderRadius: '6px'
    }}>
      <div style={{
        fontSize: '13px',
        fontWeight: '700',
        letterSpacing: '0.05em',
        color: '#d97706',
        marginBottom: '1rem'
      }}>
        🔍 SPOT THE ERROR
      </div>

      <div style={{
        fontSize: '15px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1rem'
      }}>
        Which part of this sentence is incorrect?
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#1f2937',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#ffffff',
        borderRadius: '4px'
      }}>
        {sentence}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {parts.map((part, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={showFeedback}
            style={{
              padding: '0.5rem 1rem',
              textAlign: 'left',
              border: showFeedback
                ? (index === correctPart ? '2px solid #dc2626' : index === selected ? '2px solid #9ca3af' : '1px solid #d1d5db')
                : '1px solid #d1d5db',
              borderRadius: '4px',
              backgroundColor: showFeedback
                ? (index === correctPart ? '#fef2f2' : index === selected ? '#f3f4f6' : '#ffffff')
                : (selected === index ? '#f3f4f6' : '#ffffff'),
              cursor: showFeedback ? 'default' : 'pointer',
              fontSize: '13px',
              color: '#1f2937'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: '600', color: '#6b7280' }}>
                Part {index + 1}:
              </span>
              <span>{part}</span>
              {showFeedback && index === correctPart && (
                <span style={{ marginLeft: 'auto', color: '#dc2626', fontWeight: '700' }}>← Error here</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {showFeedback && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
          border: isCorrect ? '1px solid #86efac' : '1px solid #fecaca',
          borderRadius: '6px',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#1f2937'
        }}>
          <div style={{
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: isCorrect ? '#16a34a' : '#dc2626'
          }}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
          </div>
          <div>{explanation}</div>
        </div>
      )}
    </div>
  );
};

/**
 * TrueFalse - Quick true/false check
 */
export const TrueFalse = ({ statement, correctAnswer, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChoice = (choice) => {
    setSelected(choice);
    setShowFeedback(true);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div style={{
      margin: '2rem 0 2rem 1rem',
      padding: '1.5rem',
      backgroundColor: '#f0f9ff',
      border: '2px solid #38bdf8',
      borderRadius: '6px'
    }}>
      <div style={{
        fontSize: '13px',
        fontWeight: '700',
        letterSpacing: '0.05em',
        color: '#0284c7',
        marginBottom: '1rem'
      }}>
        ✓✗ TRUE OR FALSE?
      </div>

      <div style={{
        fontSize: '15px',
        fontWeight: '500',
        color: '#1f2937',
        marginBottom: '1.5rem',
        lineHeight: '1.6'
      }}>
        {statement}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => handleChoice(true)}
          disabled={showFeedback}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: showFeedback
              ? (correctAnswer === true ? '2px solid #16a34a' : selected === true ? '2px solid #dc2626' : '1px solid #d1d5db')
              : '1px solid #d1d5db',
            borderRadius: '6px',
            backgroundColor: showFeedback
              ? (correctAnswer === true ? '#f0fdf4' : selected === true ? '#fef2f2' : '#ffffff')
              : (selected === true ? '#e0f2fe' : '#ffffff'),
            cursor: showFeedback ? 'default' : 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            color: '#1f2937'
          }}
        >
          TRUE
          {showFeedback && correctAnswer === true && <span style={{ marginLeft: '0.5rem', color: '#16a34a' }}>✓</span>}
        </button>
        <button
          onClick={() => handleChoice(false)}
          disabled={showFeedback}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: showFeedback
              ? (correctAnswer === false ? '2px solid #16a34a' : selected === false ? '2px solid #dc2626' : '1px solid #d1d5db')
              : '1px solid #d1d5db',
            borderRadius: '6px',
            backgroundColor: showFeedback
              ? (correctAnswer === false ? '#f0fdf4' : selected === false ? '#fef2f2' : '#ffffff')
              : (selected === false ? '#e0f2fe' : '#ffffff'),
            cursor: showFeedback ? 'default' : 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            color: '#1f2937'
          }}
        >
          FALSE
          {showFeedback && correctAnswer === false && <span style={{ marginLeft: '0.5rem', color: '#16a34a' }}>✓</span>}
        </button>
      </div>

      {showFeedback && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
          border: isCorrect ? '1px solid #86efac' : '1px solid #fecaca',
          borderRadius: '6px',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#1f2937'
        }}>
          <div style={{
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: isCorrect ? '#16a34a' : '#dc2626'
          }}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
          </div>
          <div>{explanation}</div>
        </div>
      )}
    </div>
  );
};

/**
 * ApplyTheRule - Practice applying a specific rule
 */
export const ApplyTheRule = ({ title, question, options, correctAnswer, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (index) => {
    setSelected(index);
    setShowFeedback(true);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div style={{
      margin: '2rem 0 2rem 1rem',
      padding: '1.5rem',
      backgroundColor: '#faf5ff',
      border: '2px solid #a78bfa',
      borderRadius: '6px'
    }}>
      <div style={{
        fontSize: '13px',
        fontWeight: '700',
        letterSpacing: '0.05em',
        color: '#7c3aed',
        marginBottom: '0.5rem'
      }}>
        📝 APPLY THE RULE
      </div>

      {title && (
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#6b7280',
          marginBottom: '1rem',
          fontStyle: 'italic'
        }}>
          {title}
        </div>
      )}

      <div style={{
        fontSize: '15px',
        fontWeight: '500',
        color: '#1f2937',
        marginBottom: '1.25rem',
        lineHeight: '1.6'
      }}>
        {question}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={showFeedback}
            style={{
              padding: '0.75rem 1rem',
              textAlign: 'left',
              border: showFeedback
                ? (index === correctAnswer ? '2px solid #16a34a' : index === selected ? '2px solid #dc2626' : '1px solid #d1d5db')
                : '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: showFeedback
                ? (index === correctAnswer ? '#f0fdf4' : index === selected ? '#fef2f2' : '#ffffff')
                : (selected === index ? '#faf5ff' : '#ffffff'),
              cursor: showFeedback ? 'default' : 'pointer',
              fontSize: '14px',
              color: '#1f2937',
              fontFamily: 'monospace',
              lineHeight: '1.5'
            }}
          >
            {option}
            {showFeedback && index === correctAnswer && (
              <span style={{ marginLeft: '0.75rem', color: '#16a34a', fontWeight: '700' }}>✓</span>
            )}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
          border: isCorrect ? '1px solid #86efac' : '1px solid #fecaca',
          borderRadius: '6px',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#1f2937'
        }}>
          <div style={{
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: isCorrect ? '#16a34a' : '#dc2626'
          }}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
          </div>
          <div>{explanation}</div>
        </div>
      )}
    </div>
  );
};
