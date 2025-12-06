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

  const handleChoice = (index) => {
    setSelected(index);
    setShowFeedback(true);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div style={{
      margin: '2rem 0 2rem 1.5rem'
    }}>
      <div style={{
        fontSize: '15px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1rem'
      }}>
        Exercise: {question}
      </div>

      <div style={{ marginLeft: '1.5rem' }}>
        {choices.map((choice, index) => (
          <div
            key={index}
            onClick={() => !showFeedback && handleChoice(index)}
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
              textDecoration: selected === index ? 'underline' : 'none'
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
        <div style={{
          marginTop: '1rem',
          marginLeft: '1.5rem',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#374151',
          fontStyle: 'italic'
        }}>
          {explanation}
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
      margin: '2rem 0 2rem 1.5rem'
    }}>
      <div style={{
        fontSize: '15px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        Exercise: Identify which part of this sentence contains an error.
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#1f2937',
        marginBottom: '1rem',
        marginLeft: '1.5rem'
      }}>
        {sentence}
      </div>

      <div style={{ marginLeft: '1.5rem' }}>
        {parts.map((part, index) => (
          <div
            key={index}
            onClick={() => !showFeedback && handleSelect(index)}
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
              textDecoration: selected === index ? 'underline' : 'none'
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
        <div style={{
          marginTop: '1rem',
          marginLeft: '1.5rem',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#374151',
          fontStyle: 'italic'
        }}>
          {explanation}
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
      margin: '2rem 0 2rem 1.5rem'
    }}>
      <div style={{
        fontSize: '15px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1rem'
      }}>
        Exercise: True or False?
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#1f2937',
        marginBottom: '1rem',
        marginLeft: '1.5rem'
      }}>
        {statement}
      </div>

      <div style={{ marginLeft: '1.5rem', display: 'flex', gap: '2rem' }}>
        <div
          onClick={() => !showFeedback && handleChoice(true)}
          style={{
            cursor: showFeedback ? 'default' : 'pointer',
            fontSize: '15px',
            color: '#1f2937',
            fontWeight: '600'
          }}
        >
          <span style={{
            textDecoration: selected === true ? 'underline' : 'none'
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
          style={{
            cursor: showFeedback ? 'default' : 'pointer',
            fontSize: '15px',
            color: '#1f2937',
            fontWeight: '600'
          }}
        >
          <span style={{
            textDecoration: selected === false ? 'underline' : 'none'
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
        <div style={{
          marginTop: '1rem',
          marginLeft: '1.5rem',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#374151',
          fontStyle: 'italic'
        }}>
          {explanation}
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
      margin: '2rem 0 2rem 1.5rem'
    }}>
      <div style={{
        fontSize: '15px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1rem'
      }}>
        Exercise: {question}
      </div>

      <div style={{ marginLeft: '1.5rem' }}>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => !showFeedback && handleSelect(index)}
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
              textDecoration: selected === index ? 'underline' : 'none'
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
        <div style={{
          marginTop: '1rem',
          marginLeft: '1.5rem',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#374151',
          fontStyle: 'italic'
        }}>
          {explanation}
        </div>
      )}
    </div>
  );
};
