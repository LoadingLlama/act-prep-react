/**
 * Math Packet Lesson 2.1: Understanding Angles & Lines
 * Comprehensive guide to angle relationships and geometric properties
 */

import React from 'react';
import MathText from '../MathText';
import {
  PacketHeader,
  TipBox,
  ConceptBox,
  RuleBox
} from './PacketComponents';

const PacketLesson_2_1_Math = () => {
  return (
    <div style={{
      maxWidth: '850px',
      margin: '0 auto',
      padding: '3rem 2rem 6rem 2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      lineHeight: '1.6',
      color: '#1f2937'
    }}>
      {/* Header */}
      <PacketHeader
        chapterNum="2.1"
        title="Understanding Angles & Lines"
        readingTime="12 min"
        verified={true}
      />

      {/* Opening Context */}
      <div style={{
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#374151',
        marginBottom: '3rem'
      }}>
        <p style={{ marginBottom: '1rem' }}>
          Angles and lines are fundamental to ACT Math geometry. Understanding angle relationships allows you to solve problems quickly without complex algebra. This lesson covers the essential angle rules you'll use on test day.
        </p>
        <p style={{ marginBottom: '0' }}>
          <strong>Why it matters:</strong> Approximately 15-20% of ACT Math questions involve angles, lines, and geometric relationships. Mastering these concepts ensures you can solve these problems in under 30 seconds each.
        </p>
      </div>

      {/* Section 1: Basic Angle Vocabulary */}
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em'
      }}>
        What You Need to Know
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem' }}>
          Before diving into angle relationships, let's review the basic vocabulary:
        </p>
      </div>

      <ConceptBox title="ANGLE TYPES">
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>
          <p style={{ marginBottom: '0.75rem' }}>
            <strong>Acute angle:</strong> Measures less than 90°
          </p>
          <p style={{ marginBottom: '0.75rem' }}>
            <strong>Right angle:</strong> Measures exactly 90°
          </p>
          <p style={{ marginBottom: '0.75rem' }}>
            <strong>Obtuse angle:</strong> Measures between 90° and 180°
          </p>
          <p style={{ marginBottom: '0' }}>
            <strong>Straight angle:</strong> Measures exactly 180° (forms a line)
          </p>
        </div>
      </ConceptBox>

      {/* Section Divider */}
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

      {/* Section 2: Supplementary and Complementary Angles */}
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em'
      }}>
        Supplementary and Complementary Angles
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem' }}>
          Two of the most common angle relationships you'll encounter are supplementary and complementary angles.
        </p>
      </div>

      <RuleBox title="ANGLE PAIR RULES">
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Rule 1:</strong> Complementary angles add to <MathText>90°</MathText>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Rule 2:</strong> Supplementary angles add to <MathText>180°</MathText>
          </div>
          <div style={{ marginBottom: '0' }}>
            <strong>Rule 3:</strong> Angles on a straight line are supplementary (they add to <MathText>180°</MathText>)
          </div>
        </div>
      </RuleBox>

      <TipBox>
        <strong>Memory trick:</strong> Complementary = Corner (right angle = 90°). Supplementary = Straight line (180°).
      </TipBox>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem', fontWeight: '600' }}>
          Example 1: Finding a complementary angle
        </p>
        <p style={{
          marginBottom: '1rem',
          padding: '1rem 1.5rem',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          fontStyle: 'italic'
        }}>
          If one angle measures 35°, what is the measure of its complement?
        </p>
      </div>

      <div style={{ margin: '1.5rem 0 2rem 2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 1:</strong> Recall that complementary angles add to 90°.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 2:</strong> Set up the equation: <MathText>35° + x = 90°</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 3:</strong> Solve: <MathText>x = 90° - 35° = 55°</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0' }}>
          <strong>Answer:</strong> The complement is <MathText>55°</MathText>
        </div>
      </div>

      {/* Section Divider */}
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

      {/* Section 3: Vertical Angles */}
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em'
      }}>
        Vertical Angles
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem' }}>
          When two lines intersect, they form two pairs of opposite angles called <strong>vertical angles</strong>. Vertical angles are always equal.
        </p>
      </div>

      {/* Vertical Angles Diagram */}
      <div style={{
        margin: '2rem 0',
        padding: '1.5rem',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        textAlign: 'center'
      }}>
        <div style={{
          fontWeight: '700',
          fontSize: '15px',
          color: '#1f2937',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Vertical Angles
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '6px',
          marginBottom: '1rem'
        }}>
          <img
            src="/images/math/geometry/vertical-angles.svg"
            alt="Vertical angles diagram"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.6',
          fontStyle: 'italic'
        }}>
          Angle a = Angle c, and Angle b = Angle d
        </div>
      </div>

      <RuleBox title="VERTICAL ANGLES RULE">
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>
          <strong>When two lines intersect, vertical angles are equal.</strong>
          <br />
          Additionally, adjacent angles are supplementary (they add to 180°).
        </div>
      </RuleBox>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginTop: '2rem',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem', fontWeight: '600' }}>
          Example 2: Using vertical angles
        </p>
        <p style={{
          marginBottom: '1rem',
          padding: '1rem 1.5rem',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          fontStyle: 'italic'
        }}>
          Two lines intersect. One angle measures 130°. What are the measures of the other three angles?
        </p>
      </div>

      <div style={{ margin: '1.5rem 0 2rem 2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 1:</strong> The vertical angle (opposite) also measures 130°.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 2:</strong> Adjacent angles are supplementary: <MathText>180° - 130° = 50°</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0' }}>
          <strong>Answer:</strong> The four angles measure <MathText>130°, 50°, 130°, 50°</MathText>
        </div>
      </div>

      {/* Section Divider */}
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

      {/* Section 4: Parallel Lines and Transversals */}
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em'
      }}>
        Parallel Lines Cut by a Transversal
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem' }}>
          When a line (transversal) crosses two parallel lines, it creates eight angles with special relationships. This is one of the most tested concepts in ACT geometry.
        </p>
      </div>

      {/* Parallel Lines Diagram */}
      <div style={{
        margin: '2rem 0',
        padding: '1.5rem',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        textAlign: 'center'
      }}>
        <div style={{
          fontWeight: '700',
          fontSize: '15px',
          color: '#1f2937',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Parallel Lines Cut by a Transversal
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '6px',
          marginBottom: '1rem'
        }}>
          <img
            src="/images/math/geometry/parallel-lines-transversal.svg"
            alt="Parallel lines cut by a transversal"
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.6',
          fontStyle: 'italic'
        }}>
          When parallel lines are cut by a transversal, specific angle relationships emerge
        </div>
      </div>

      <RuleBox title="PARALLEL LINES ANGLE RULES">
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Rule 1:</strong> Corresponding angles are equal (angles in the same position at each intersection)
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Rule 2:</strong> Alternate interior angles are equal (angles on opposite sides of the transversal, between the parallel lines)
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Rule 3:</strong> Alternate exterior angles are equal (angles on opposite sides of the transversal, outside the parallel lines)
          </div>
          <div style={{ marginBottom: '0' }}>
            <strong>Rule 4:</strong> Consecutive interior angles are supplementary (they add to 180°)
          </div>
        </div>
      </RuleBox>

      <TipBox>
        <strong>Quick rule:</strong> When you see parallel lines cut by a transversal, there are really only two different angle measures. All acute angles are equal, and all obtuse angles are equal. Any acute + any obtuse = 180°.
      </TipBox>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginTop: '2rem',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem', fontWeight: '600' }}>
          Example 3: Using parallel lines
        </p>
        <p style={{
          marginBottom: '1rem',
          padding: '1rem 1.5rem',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          fontStyle: 'italic'
        }}>
          Two parallel lines are cut by a transversal. One angle measures 65°. What do the other seven angles measure?
        </p>
      </div>

      <div style={{ margin: '1.5rem 0 2rem 2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 1:</strong> The 65° angle is acute. All acute angles equal 65° (corresponding and alternate angles).
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 2:</strong> Find the obtuse angles: <MathText>180° - 65° = 115°</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0' }}>
          <strong>Answer:</strong> Four angles measure 65° and four angles measure 115°
        </div>
      </div>

      {/* Section Divider */}
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

      {/* Section 5: Common Mistakes */}
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em'
      }}>
        Common Mistakes to Avoid
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Mistake 1: Confusing complementary and supplementary</strong>
          <br />
          <span style={{ marginLeft: '2rem', display: 'block', marginTop: '0.5rem' }}>
            Remember: Complementary = 90° (corner), Supplementary = 180° (straight line)
          </span>
        </p>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Mistake 2: Assuming lines are parallel without confirmation</strong>
          <br />
          <span style={{ marginLeft: '2rem', display: 'block', marginTop: '0.5rem' }}>
            Only use parallel line rules when the problem explicitly states the lines are parallel or shows the parallel symbol (||)
          </span>
        </p>
        <p style={{ marginBottom: '0' }}>
          <strong>Mistake 3: Forgetting that vertical angles are equal</strong>
          <br />
          <span style={{ marginLeft: '2rem', display: 'block', marginTop: '0.5rem' }}>
            When two lines intersect, opposite angles are always equal. This often provides a quick solution path.
          </span>
        </p>
      </div>

      {/* Section Divider */}
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
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em'
      }}>
        Key Takeaways
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>✓ Complementary angles add to 90°, supplementary angles add to 180°</strong>
          </span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>✓ Vertical angles (opposite angles at an intersection) are always equal</strong>
          </span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>✓ When parallel lines are cut by a transversal, there are only two different angle measures</strong>
          </span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>✓ Corresponding angles and alternate angles are equal with parallel lines</strong>
          </span>
        </div>
        <div style={{ marginBottom: '0' }}>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>✓ Look for angle relationships before setting up equations—visual recognition is faster</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_2_1_Math;
