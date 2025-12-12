/**
 * Packet Lesson 1.2 Math - Number Substitution Technique
 * Clean structure matching English lessons exactly
 * Minimal boxes, natural flow, left-aligned
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

const PacketLesson_1_2_Math = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'substitution');

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
        chapterNum="1.2"
        title="Number Substitution Technique"
        readingTime="10 min"
        verified={true}
      />

      {/* Opening Context */}
      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '3rem'
      }}>
        Many ACT Math problems involve variables and abstract expressions. The <strong>Number Substitution Technique</strong> (also called <Term>plugging in</Term>)
        transforms these abstract problems into simple arithmetic by replacing variables with actual numbers. This strategy works on 25-35% of ACT Math questions
        and can turn confusing algebra into easy calculations that you can do in your head or with a calculator.
      </div>

      {/* Section 1 */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginTop: '3rem',
        marginBottom: '0.75rem'
      }}>
        1. What is Number Substitution?
      </h2>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Number substitution means choosing specific numbers to replace variables in a problem.</strong> Instead of manipulating abstract
        algebraic expressions, you test concrete numbers to see which answer choice works. This makes complex problems simple.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        For example, instead of solving "If x is an even integer, which expression is always odd?" algebraically, you simply pick an even number
        (like x = 4) and test each answer choice to see which gives an odd result.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Why this works:</strong> The correct answer must work for ALL valid numbers. If you choose a simple, easy-to-work-with number
        and an answer choice fails, that choice is wrong. The choice that works is correct.
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
        2. When to Use Number Substitution
      </h2>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        Number substitution works best when you see these signs:
      </p>

      <ConceptBox
        title="Perfect Scenarios for Number Substitution"
        items={[
          'Answer choices contain variables (like "2x + 3")',
          'The question asks "which expression is always..."',
          'You see phrases like "for all values of x"',
          'The problem involves properties (odd/even, positive/negative)',
          'Abstract expressions make your head spin',
          'You want to avoid complicated algebra'
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
        <strong>Look for answer choices with variables in them.</strong> If you see answer choices like:
      </p>

      <div style={{ marginBottom: '1.5rem', marginLeft: '2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>A. <MathText>x + 1</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>B. <MathText>2x</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>C. <MathText>x² + x</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>D. <MathText>3x - 1</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>E. <MathText>x² - 1</MathText></div>
      </div>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        You should use number substitution! Pick a simple number for x and test each choice.
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
        3. The Number Substitution Process
      </h2>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        Follow these steps every time you use number substitution:
      </p>

      <RuleBox
        number="1"
        title="Read the problem carefully and identify any restrictions (like 'x is positive' or 'x is even')"
      />

      <RuleBox
        number="2"
        title="Choose a simple number that meets all restrictions"
      />

      <RuleBox
        number="3"
        title="Plug your number into each answer choice"
      />

      <RuleBox
        number="4"
        title="Eliminate answer choices that don't work"
      />

      <RuleBox
        number="5"
        title="If more than one choice works, pick a different number and test again"
      />

      <TipBox title="TIP - CHOOSING SMART NUMBERS">
        Pick simple, easy-to-work-with numbers like 2, 3, 5, or 10. Avoid 0 and 1 (they have special properties that can make
        multiple wrong answers seem correct). If the problem mentions "odd" or "even," make sure your number matches!
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
        Example 1: Even/Odd Properties
      </h3>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        If x is an even integer, which of the following must be odd?
      </p>

      <div style={{ marginBottom: '1.5rem', marginLeft: '2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>A. <MathText>x + 2</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>B. <MathText>2x</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>C. <MathText>x + 1</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>D. <MathText>3x</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>E. <MathText>x²</MathText></div>
      </div>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Solution using number substitution:</strong>
      </p>

      <div style={{ margin: '1.5rem 0 2rem 2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 1:</strong> The problem says x is even. Let's pick x = 4.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 2:</strong> Test each answer choice with x = 4:
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem', marginLeft: '2rem' }}>
          A. 4 + 2 = 6 (even)
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem', marginLeft: '2rem' }}>
          B. 2(4) = 8 (even)
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem', marginLeft: '2rem' }}>
          C. 4 + 1 = 5 (odd) ✓
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem', marginLeft: '2rem' }}>
          D. 3(4) = 12 (even)
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          E. 4² = 16 (even)
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          <strong>Step 3:</strong> Only C gives an odd result. The answer is C.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '3rem',
        marginBottom: '1rem'
      }}>
        Example 2: Expression Simplification
      </h3>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        Which of the following is equivalent to <MathText>(x + 3)(x - 3)</MathText>?
      </p>

      <div style={{ marginBottom: '1.5rem', marginLeft: '2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>A. <MathText>x² - 9</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>B. <MathText>x² + 9</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>C. <MathText>x² - 6x + 9</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.25rem' }}>D. <MathText>2x</MathText></div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>E. <MathText>x² - 3</MathText></div>
      </div>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Solution using number substitution:</strong>
      </p>

      <div style={{ margin: '1.5rem 0 2rem 2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 1:</strong> Pick a simple number. Let's use x = 5.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 2:</strong> Calculate what the original expression equals:
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          (5 + 3)(5 - 3) = (8)(2) = 16
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 3:</strong> Test each answer choice to see which equals 16 when x = 5:
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem', marginLeft: '2rem' }}>
          A. 5² - 9 = 25 - 9 = 16 ✓
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem', marginLeft: '2rem' }}>
          B. 5² + 9 = 25 + 9 = 34
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem', marginLeft: '2rem' }}>
          C. 5² - 6(5) + 9 = 25 - 30 + 9 = 4
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem', marginLeft: '2rem' }}>
          D. 2(5) = 10
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          E. 5² - 3 = 25 - 3 = 22
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          <strong>Step 4:</strong> Only A gives 16. The answer is A.
        </div>
      </div>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Notice:</strong> We avoided FOIL and algebraic expansion entirely. We just tested numbers!
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
        Mistake #1: Using 0 or 1
      </h3>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>The error:</strong> Choosing 0 or 1 as your test number.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Why it's bad:</strong> These numbers have special properties. For example, 0 × anything = 0, and 1² = 1.
        This can make multiple wrong answers seem correct.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>The fix:</strong> Use simple numbers like 2, 3, 5, or 10 instead.
      </p>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Mistake #2: Ignoring Restrictions
      </h3>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>The error:</strong> Picking a number that violates the problem's conditions.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Why it's bad:</strong> If the problem says "x is odd" and you test x = 4 (even), your results will be meaningless.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>The fix:</strong> Always read carefully for restrictions like "positive," "even," "greater than 5," etc.
      </p>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Mistake #3: Stopping After One Answer Works
      </h3>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>The error:</strong> Finding one answer that works and not checking if others also work.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        <strong>Why it's bad:</strong> Sometimes multiple answers work for your chosen number. You need a second test to eliminate the wrong ones.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>The fix:</strong> Test ALL answer choices. If more than one works, pick a different number and test those choices again.
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
        6. When NOT to Use Number Substitution
      </h2>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        Number substitution isn't always the best strategy. Avoid it when:
      </p>

      <ConceptBox
        items={[
          'Answer choices are specific numbers (use backsolving instead)',
          'The problem asks for a specific value (like "x = ?")',
          'Simple algebra is faster (like x + 5 = 10)',
          'The problem involves multiple variables with complex relationships',
          'You can see the algebraic pattern immediately'
        ]}
        columns={1}
      />

      <TipBox title="TIP">
        If answer choices are variables, use substitution. If answer choices are numbers, use backsolving.
        Know the difference and you'll save time on test day!
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
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>Number substitution means picking simple numbers to replace variables.</strong> Test each answer choice
            to see which one works with your number.
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>Use this strategy when answer choices contain variables</strong> (like "2x + 3").
            Avoid using 0 or 1 as your test numbers.
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>Always respect restrictions in the problem.</strong> If it says "x is even," use an even number.
            If it says "x > 5," use a number greater than 5.
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>Test ALL answer choices.</strong> If more than one works with your first number,
            pick a different number and test again until only one choice remains.
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>Know when to switch strategies.</strong> If answer choices are numbers, use backsolving.
            If answer choices are variables, use number substitution.
          </span>
        </div>
      </div>

    </div>
  );
};

export default PacketLesson_1_2_Math;
