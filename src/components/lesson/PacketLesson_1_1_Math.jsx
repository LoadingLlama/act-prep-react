/**
 * Packet Lesson 1.1 Math - Working Backwards Strategy (Backsolving)
 * REDESIGNED to match English lesson structure exactly
 * Minimal boxes, clean flow, left-aligned
 */

import React, { useRef } from 'react';
import {
  PacketHeader,
  TipBox,
  ConceptBox,
  RuleBox
} from './PacketComponents';
import MathText from '../MathText';
import Term from './Term';
import { useTermTooltips } from '../../hooks/useTermTooltips';

const PacketLesson_1_1_Math = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'backsolving');

  return (
    <div ref={contentRef} style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '3rem 3rem',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: '15px',
      lineHeight: '1.7',
      color: '#1f2937'
    }}>
      {/* Header */}
      <PacketHeader
        chapterNum="1.1"
        title="Working Backwards Strategy"
        readingTime="12 min"
        verified={true}
      />

      {/* Opening Context */}
      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '3rem'
      }}>
        The ACT Math test gives you five answer choices for every question. This isn't just to make guessing easier—it's an opportunity!
        The <strong>Working Backwards Strategy</strong> (also called <Term>backsolving</Term>) lets you use the answer choices themselves to solve problems, often much faster than traditional algebra.
        This technique works on 30-40% of ACT Math questions and can save you critical time on test day.
      </div>

      {/* Section 1 */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginTop: '3rem',
        marginBottom: '0.75rem'
      }}>
        1. What is Backsolving?
      </h2>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Backsolving means testing the answer choices to see which one works.</strong> Instead of solving algebraically to find the answer,
        you plug each choice back into the problem until you find the one that satisfies all the conditions.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        Think of it like trying keys on a keyring. You don't need to figure out which key fits—you just try each one until the door opens.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Why this works:</strong> The ACT always provides exactly one correct answer among the five choices. If you test an answer and it works perfectly,
        you're guaranteed it's correct—no need to check the others.
      </p>

      {/* Section divider */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        margin: '4rem 0 1.5rem 0'
      }}>
        • • •
      </div>

      {/* Section 2 */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        2. When to Use Backsolving
      </h2>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        Backsolving works best when you see these signs:
      </p>

      <ConceptBox
        title="Perfect Scenarios for Backsolving"
        items={[
          'The question asks "What is the value of x?"',
          'Answer choices are specific numbers (not variables)',
          'The problem has multiple steps or conditions',
          'Setting up an equation looks complicated',
          'The algebraic approach isn\'t immediately obvious',
          'You\'re running short on time'
        ]}
        columns={1}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        How to Identify
      </h3>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Look for questions that give you concrete numbers as answer choices.</strong> If you see answer choices like:
      </p>

      <div style={{ marginBottom: '1.5rem', marginLeft: '2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>A. 3</div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>B. 5</div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>C. 7</div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>D. 9</div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>E. 11</div>
      </div>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        You can backsolve! Each number can be tested in the original problem.
      </p>

      {/* Section divider */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        margin: '4rem 0 1.5rem 0'
      }}>
        • • •
      </div>

      {/* Section 3 */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        3. The Backsolving Process
      </h2>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        Follow these steps every time you backsolve:
      </p>

      <RuleBox
        number="1"
        title="Read the problem carefully and identify what the question is asking for"
      />

      <RuleBox
        number="2"
        title="Start with answer choice C (the middle value)"
      />

      <RuleBox
        number="3"
        title="Plug choice C into the problem and check if it satisfies all conditions"
      />

      <RuleBox
        number="4"
        title="If C works perfectly, you're done! If C is too large, try A or B. If C is too small, try D or E."
      />

      <RuleBox
        number="5"
        title="Repeat until you find the answer that works"
      />

      <TipBox title="TIP">
        <strong>Always start with choice C.</strong> ACT answer choices are usually arranged in order (smallest to largest or largest to smallest).
        If C doesn't work, you'll know whether to try a larger or smaller value, eliminating 2-3 choices immediately.
      </TipBox>

      {/* Section divider */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        margin: '4rem 0 1.5rem 0'
      }}>
        • • •
      </div>

      {/* Section 4 */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        4. Worked Examples
      </h2>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Example 1: Simple Equation
      </h3>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        If <MathText>3x + 7 = 22</MathText>, what is the value of x?
      </p>

      <div style={{ marginBottom: '1.5rem', marginLeft: '2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>A. 3</div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>B. 5</div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>C. 7</div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>D. 9</div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>E. 15</div>
      </div>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Solution using backsolving:</strong>
      </p>

      <div style={{ margin: '1.5rem 0 2rem 2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 1:</strong> Start with C. Try x = 7.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          <MathText>3(7) + 7 = 21 + 7 = 28</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 2:</strong> Check. 28 ≠ 22, so C is too large. We need a smaller value.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 3:</strong> Try B. Try x = 5.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          <MathText>3(5) + 7 = 15 + 7 = 22 ✓</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          <strong>Step 4:</strong> This equals 22! The answer is B.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '3rem',
        marginBottom: '1rem'
      }}>
        Example 2: Word Problem
      </h3>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        Sarah has 3 times as many books as Tom. Together they have 48 books. How many books does Tom have?
      </p>

      <div style={{ marginBottom: '1.5rem', marginLeft: '2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>A. 8</div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>B. 10</div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>C. 12</div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>D. 16</div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>E. 18</div>
      </div>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Solution using backsolving:</strong>
      </p>

      <div style={{ margin: '1.5rem 0 2rem 2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 1:</strong> Start with C. Try Tom = 12 books.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 2:</strong> Calculate Sarah. Sarah has 3 times as many.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          Sarah = 3 × 12 = 36 books
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 3:</strong> Check total. Do they add up to 48?
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          12 + 36 = 48 ✓
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          <strong>Step 4:</strong> Yes! The answer is C.
        </div>
      </div>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Notice how much faster this was than setting up algebra!</strong> We didn't need to write:
      </p>

      <div style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
        <div style={{
          fontSize: '15px',
          color: '#6b7280',
          fontStyle: 'italic',
          textDecoration: 'line-through',
          marginBottom: '0.25rem'
        }}>
          Let t = Tom's books, then Sarah has 3t
        </div>
        <div style={{
          fontSize: '15px',
          color: '#6b7280',
          fontStyle: 'italic',
          textDecoration: 'line-through',
          marginBottom: '0.25rem'
        }}>
          t + 3t = 48
        </div>
        <div style={{
          fontSize: '15px',
          color: '#6b7280',
          fontStyle: 'italic',
          textDecoration: 'line-through'
        }}>
          4t = 48, so t = 12
        </div>
      </div>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        We just tested the number and it worked!
      </p>

      {/* Section divider */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        margin: '4rem 0 1.5rem 0'
      }}>
        • • •
      </div>

      {/* Section 5 */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        5. Common Mistakes to Avoid
      </h2>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Mistake #1: Testing Choices in Random Order
      </h3>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>The error:</strong> Testing answer choices in random order instead of starting with C.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Why it's bad:</strong> You waste time checking unnecessary answers. If you start with C and it's too big,
        you immediately know to try A or B—eliminating 2 choices.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>The fix:</strong> Always start with C (the middle value).
      </p>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Mistake #2: Stopping Too Early
      </h3>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>The error:</strong> Stopping before verifying your answer.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Why it's bad:</strong> You might think an answer works but miss a condition.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>The fix:</strong> Always check that your answer satisfies ALL conditions in the problem.
      </p>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Mistake #3: Using Backsolving When Algebra is Faster
      </h3>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>The error:</strong> Using backsolving on simple one-step equations like <MathText>x + 5 = 12</MathText>.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Why it's bad:</strong> Simple equations are faster to solve directly.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>The fix:</strong> Use backsolving for multi-step problems or when algebra isn't obvious. For simple equations, solve directly.
      </p>

      {/* Section divider */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        margin: '4rem 0 1.5rem 0'
      }}>
        • • •
      </div>

      {/* Section 6 */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        6. When NOT to Backsolve
      </h2>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        Backsolving isn't always the best strategy. Avoid it when:
      </p>

      <ConceptBox
        items={[
          'The equation is very simple (like x + 3 = 10)',
          'Answer choices contain variables (like "2x + 3")',
          'You need to find multiple unknowns',
          'The problem asks for a formula or expression',
          'Testing each choice would take longer than algebra'
        ]}
        columns={1}
      />

      <TipBox title="TIP">
        If you can solve the problem in 2-3 algebraic steps, just do it. Backsolving shines on complex multi-step problems
        where setting up equations is confusing.
      </TipBox>

      {/* Section divider */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        margin: '4rem 0 1.5rem 0'
      }}>
        • • •
      </div>

      {/* Key Takeaways */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem'
      }}>
        Key Takeaways
      </h2>

      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#374151' }}>
            <strong>Backsolving means testing answer choices</strong> instead of solving algebraically.
            It works on 30-40% of ACT Math problems.
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#374151' }}>
            <strong>Always start with choice C</strong> (the middle value). This lets you eliminate 2-3 choices
            immediately if C is too large or too small.
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#374151' }}>
            <strong>Use backsolving for multi-step problems</strong> where setting up equations is complicated
            or unclear. Skip it for simple one-step equations.
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#374151' }}>
            <strong>Always verify your answer</strong> by checking that it satisfies ALL conditions in the problem.
            Don't stop after the first thing that "looks right."
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#374151' }}>
            <strong>Practice this strategy until it's automatic.</strong> The more you use it,
            the faster you'll recognize which problems are perfect for backsolving.
          </span>
        </div>
      </div>

    </div>
  );
};

export default PacketLesson_1_1_Math;
