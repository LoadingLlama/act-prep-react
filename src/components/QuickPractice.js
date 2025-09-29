import React, { useState } from 'react';

const QuickPractice = ({ question, options, correctAnswer, explanation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);
  };

  return (
    <div className="practice-moment">
      <h5>💡 Quick Check</h5>
      <p>{question}</p>
      <div className="quick-options">
        {options.map((option, index) => (
          <div
            key={index}
            className={`option ${
              showFeedback
                ? index === correctAnswer
                  ? 'correct'
                  : selectedOption === index
                  ? 'incorrect'
                  : ''
                : ''
            }`}
            onClick={() => !showFeedback && handleOptionClick(index)}
            style={{ cursor: showFeedback ? 'default' : 'pointer' }}
          >
            {String.fromCharCode(65 + index)}) {option}
          </div>
        ))}
      </div>
      {showFeedback && (
        <div className="feedback" style={{
          marginTop: '1rem',
          padding: '0.75rem',
          borderRadius: '6px',
          background: selectedOption === correctAnswer ? '#d4edda' : '#f8d7da',
          border: selectedOption === correctAnswer ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
        }}>
          <strong>
            {selectedOption === correctAnswer ? '✅ Correct!' : '❌ Not quite.'}
          </strong>
          <br />
          {explanation}
        </div>
      )}
    </div>
  );
};

export default QuickPractice;