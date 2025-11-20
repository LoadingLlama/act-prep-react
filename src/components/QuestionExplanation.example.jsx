/**
 * Example usage of the QuestionExplanation component
 *
 * This demonstrates how to use QuestionExplanation for displaying
 * diagnostic test question results with explanations.
 */

import React from 'react';
import QuestionExplanation from './QuestionExplanation';

const QuestionExplanationExample = () => {
  // Example: User answered incorrectly
  const example1 = {
    userAnswer: 'B',
    correctAnswer: 'A',
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
This choice fixes the comma splice (incorrectly joining two complete sentences with just a comma). "Of the thousands" makes the first part dependent, so it can properly connect to the second part.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Still has the comma splice error.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Creates a run-on sentence without proper punctuation.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> Changes the meaning of the original sentence.</div>
</div>
</div>`
  };

  // Example: User answered correctly
  const example2 = {
    userAnswer: 'C',
    correctAnswer: 'C',
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Correct! This answer uses parallel structure (keeping verb tenses consistent) throughout the sentence.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Mixes verb tenses inconsistently.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Uses passive voice unnecessarily.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> Changes the subject-verb agreement (subject and verb must match).</div>
</div>
</div>`
  };

  // Example: User didn't answer
  const example3 = {
    userAnswer: null,
    correctAnswer: 'D',
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Multiply first: 3(5) = 15. Then subtract: 15 - 2 = 13.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Added instead of multiplying first.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Subtracted before multiplying.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Forgot to subtract 2 from the result.</div>
</div>
</div>`
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
        QuestionExplanation Component Examples
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
          Example 1: Incorrect Answer
        </h2>
        <QuestionExplanation
          userAnswer={example1.userAnswer}
          correctAnswer={example1.correctAnswer}
          explanation={example1.explanation}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
          Example 2: Correct Answer
        </h2>
        <QuestionExplanation
          userAnswer={example2.userAnswer}
          correctAnswer={example2.correctAnswer}
          explanation={example2.explanation}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
          Example 3: Not Answered
        </h2>
        <QuestionExplanation
          userAnswer={example3.userAnswer}
          correctAnswer={example3.correctAnswer}
          explanation={example3.explanation}
        />
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '1rem',
        background: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Usage Instructions
        </h3>
        <pre style={{
          fontSize: '0.75rem',
          background: '#ffffff',
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto',
          lineHeight: '1.5'
        }}>
{`import QuestionExplanation from './QuestionExplanation';

<QuestionExplanation
  userAnswer="B"           // User's selected answer (null if not answered)
  correctAnswer="A"        // The correct answer letter
  explanation={htmlString} // HTML explanation from database
/>`}
        </pre>
      </div>
    </div>
  );
};

export default QuestionExplanationExample;
