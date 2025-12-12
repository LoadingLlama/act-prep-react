/**
 * Math Packet Lesson 4.2: Quadratic Equations & Parabolas
 * Comprehensive guide to quadratic functions, graphing, and solving
 */

import React from 'react';
import MathText from '../MathText';
import {
  PacketHeader,
  TipBox,
  ConceptBox,
  RuleBox
} from './PacketComponents';

const PacketLesson_4_2_Math = () => {
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
        chapterNum="4.2"
        title="Quadratic Equations & Parabolas"
        readingTime="15 min"
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
          Quadratic equations and their graphs (parabolas) appear frequently on the ACT Math section. Understanding how to solve quadratic equations, graph parabolas, and interpret their key features is essential for success.
        </p>
        <p style={{ marginBottom: '0' }}>
          <strong>Why it matters:</strong> Approximately 10-15% of ACT Math questions involve quadratics. Mastering these concepts gives you quick access to points on function questions, graphing problems, and word problems involving quadratic relationships.
        </p>
      </div>

      {/* Section 1: What is a Quadratic Function? */}
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em'
      }}>
        What is a Quadratic Function?
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem' }}>
          A quadratic function is a polynomial function of degree 2. Its graph is a U-shaped curve called a <strong>parabola</strong>.
        </p>
      </div>

      <ConceptBox title="STANDARD FORM">
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>
          <p style={{ marginBottom: '0.75rem' }}>
            The standard form of a quadratic equation is:
          </p>
          <div style={{
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: '600',
            margin: '1rem 0',
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '4px'
          }}>
            <MathText>y = ax² + bx + c</MathText>
          </div>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Where:</strong>
          </p>
          <p style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>
            • <MathText>a</MathText> determines the direction and width of the parabola
          </p>
          <p style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>
            • <MathText>b</MathText> affects the position of the vertex horizontally
          </p>
          <p style={{ marginLeft: '1rem', marginBottom: '0' }}>
            • <MathText>c</MathText> is the y-intercept (where the parabola crosses the y-axis)
          </p>
        </div>
      </ConceptBox>

      {/* Parabola Direction Diagram */}
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
          Parabola Direction
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
            src="/images/math/algebra/parabola-direction.svg"
            alt="Parabola opening up and down"
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
          If a &gt; 0, parabola opens upward (minimum). If a &lt; 0, parabola opens downward (maximum).
        </div>
      </div>

      <RuleBox title="PARABOLA DIRECTION RULE">
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>If a &gt; 0:</strong> Parabola opens upward (U-shape). The vertex is the minimum point.
          </div>
          <div style={{ marginBottom: '0' }}>
            <strong>If a &lt; 0:</strong> Parabola opens downward (∩-shape). The vertex is the maximum point.
          </div>
        </div>
      </RuleBox>

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

      {/* Section 2: Vertex Form */}
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em'
      }}>
        Vertex Form of a Parabola
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem' }}>
          Vertex form makes it easy to identify the vertex (the highest or lowest point) of a parabola.
        </p>
      </div>

      <ConceptBox title="VERTEX FORM">
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>
          <p style={{ marginBottom: '0.75rem' }}>
            The vertex form of a quadratic equation is:
          </p>
          <div style={{
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: '600',
            margin: '1rem 0',
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '4px'
          }}>
            <MathText>y = a(x - h)² + k</MathText>
          </div>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>The vertex is at the point (h, k)</strong>
          </p>
          <p style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>
            • <MathText>h</MathText> is the x-coordinate of the vertex
          </p>
          <p style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>
            • <MathText>k</MathText> is the y-coordinate of the vertex
          </p>
          <p style={{ marginLeft: '1rem', marginBottom: '0' }}>
            • <MathText>a</MathText> still determines direction (up if positive, down if negative)
          </p>
        </div>
      </ConceptBox>

      {/* Vertex Form Diagram */}
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
          Vertex Form Example
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
            src="/images/math/algebra/parabola-vertex-form.svg"
            alt="Parabola in vertex form"
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
          The blue parabola y = (x - 2)² + 1 has vertex at (2, 1)
        </div>
      </div>

      <TipBox>
        <strong>Quick identification:</strong> In vertex form <MathText>y = a(x - h)² + k</MathText>, the vertex is <MathText>(h, k)</MathText>. Notice the minus sign: <MathText>y = (x - 2)²</MathText> has vertex at <MathText>x = 2</MathText>, not <MathText>x = -2</MathText>.
      </TipBox>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginTop: '2rem',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem', fontWeight: '600' }}>
          Example 1: Finding the vertex
        </p>
        <p style={{
          marginBottom: '1rem',
          padding: '1rem 1.5rem',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          fontStyle: 'italic'
        }}>
          What is the vertex of <MathText>y = 2(x + 3)² - 5</MathText>?
        </p>
      </div>

      <div style={{ margin: '1.5rem 0 2rem 2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 1:</strong> Rewrite in the form <MathText>y = a(x - h)² + k</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          <MathText>y = 2(x - (-3))² + (-5)</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 2:</strong> Identify <MathText>h</MathText> and <MathText>k</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          <MathText>h = -3</MathText>, <MathText>k = -5</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0' }}>
          <strong>Answer:</strong> The vertex is <MathText>(-3, -5)</MathText>
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

      {/* Section 3: Solving Quadratic Equations */}
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em'
      }}>
        Solving Quadratic Equations
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem' }}>
          There are three main methods for solving quadratic equations on the ACT: factoring, the quadratic formula, and completing the square. For most ACT problems, factoring and the quadratic formula are fastest.
        </p>
      </div>

      <RuleBox title="SOLVING METHODS">
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Method 1: Factoring</strong> (when factors are obvious)
            <div style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
              Example: <MathText>x² + 5x + 6 = 0 → (x + 2)(x + 3) = 0</MathText>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Method 2: Quadratic Formula</strong> (always works)
            <div style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
              <MathText>x = [-b ± √(b² - 4ac)] / (2a)</MathText>
            </div>
          </div>
          <div style={{ marginBottom: '0' }}>
            <strong>Method 3: Backsolving</strong> (when answer choices are given)
            <div style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
              Plug in answer choices to find which satisfies the equation
            </div>
          </div>
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
          Example 2: Solving by factoring
        </p>
        <p style={{
          marginBottom: '1rem',
          padding: '1rem 1.5rem',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          fontStyle: 'italic'
        }}>
          Solve: <MathText>x² - 7x + 12 = 0</MathText>
        </p>
      </div>

      <div style={{ margin: '1.5rem 0 2rem 2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 1:</strong> Find two numbers that multiply to 12 and add to -7
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          The numbers are -3 and -4 (because -3 × -4 = 12 and -3 + -4 = -7)
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 2:</strong> Write as factored form
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          <MathText>(x - 3)(x - 4) = 0</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 3:</strong> Set each factor equal to zero
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          <MathText>x - 3 = 0</MathText> or <MathText>x - 4 = 0</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0' }}>
          <strong>Answer:</strong> <MathText>x = 3</MathText> or <MathText>x = 4</MathText>
        </div>
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginTop: '2rem',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem', fontWeight: '600' }}>
          Example 3: Using the quadratic formula
        </p>
        <p style={{
          marginBottom: '1rem',
          padding: '1rem 1.5rem',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          fontStyle: 'italic'
        }}>
          Solve: <MathText>2x² + 3x - 5 = 0</MathText>
        </p>
      </div>

      <div style={{ margin: '1.5rem 0 2rem 2rem' }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 1:</strong> Identify <MathText>a = 2</MathText>, <MathText>b = 3</MathText>, <MathText>c = -5</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 2:</strong> Plug into the quadratic formula
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          <MathText>x = [-3 ± √(3² - 4(2)(-5))] / (2(2))</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 3:</strong> Simplify under the square root
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          <MathText>x = [-3 ± √(9 + 40)] / 4 = [-3 ± √49] / 4 = [-3 ± 7] / 4</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Step 4:</strong> Calculate both solutions
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem', marginLeft: '2rem' }}>
          <MathText>x = (-3 + 7) / 4 = 1</MathText> or <MathText>x = (-3 - 7) / 4 = -2.5</MathText>
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0' }}>
          <strong>Answer:</strong> <MathText>x = 1</MathText> or <MathText>x = -2.5</MathText>
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

      {/* Section 4: Key Features of Parabolas */}
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em'
      }}>
        Key Features of Parabolas
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#374151',
        marginBottom: '2rem'
      }}>
        <p style={{ marginBottom: '1rem' }}>
          The ACT often asks about specific features of parabolas. Here's what you need to know:
        </p>
      </div>

      <ConceptBox title="PARABOLA FEATURES">
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>
          <p style={{ marginBottom: '0.75rem' }}>
            <strong>Vertex:</strong> The highest or lowest point on the parabola
          </p>
          <p style={{ marginBottom: '0.75rem' }}>
            <strong>Axis of symmetry:</strong> A vertical line through the vertex (<MathText>x = h</MathText>)
          </p>
          <p style={{ marginBottom: '0.75rem' }}>
            <strong>Y-intercept:</strong> Where the parabola crosses the y-axis (when <MathText>x = 0</MathText>)
          </p>
          <p style={{ marginBottom: '0.75rem' }}>
            <strong>X-intercepts (roots/zeros):</strong> Where the parabola crosses the x-axis (when <MathText>y = 0</MathText>)
          </p>
          <p style={{ marginBottom: '0' }}>
            <strong>Discriminant:</strong> <MathText>b² - 4ac</MathText> tells you how many x-intercepts exist
            <br />
            <span style={{ marginLeft: '1.5rem', display: 'block', marginTop: '0.5rem' }}>
              • If positive: 2 x-intercepts
              <br />• If zero: 1 x-intercept (touches x-axis at vertex)
              <br />• If negative: 0 x-intercepts (doesn't touch x-axis)
            </span>
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
          <strong>Mistake 1: Vertex form sign confusion</strong>
          <br />
          <span style={{ marginLeft: '2rem', display: 'block', marginTop: '0.5rem' }}>
            In <MathText>y = (x - h)² + k</MathText>, the vertex is at <MathText>(h, k)</MathText>, not <MathText>(-h, k)</MathText>. Notice the minus sign in the formula.
          </span>
        </p>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Mistake 2: Forgetting both solutions</strong>
          <br />
          <span style={{ marginLeft: '2rem', display: 'block', marginTop: '0.5rem' }}>
            Quadratic equations usually have two solutions. Don't stop after finding one.
          </span>
        </p>
        <p style={{ marginBottom: '0' }}>
          <strong>Mistake 3: Misidentifying a, b, c in the quadratic formula</strong>
          <br />
          <span style={{ marginLeft: '2rem', display: 'block', marginTop: '0.5rem' }}>
            Always rearrange to <MathText>ax² + bx + c = 0</MathText> form first, then identify a, b, and c with their correct signs.
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
            <strong>✓ Standard form is y = ax² + bx + c; vertex form is y = a(x - h)² + k with vertex at (h, k)</strong>
          </span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>✓ If a &gt; 0, parabola opens up (minimum); if a &lt; 0, parabola opens down (maximum)</strong>
          </span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>✓ Solve quadratics by factoring (fastest when obvious), quadratic formula (always works), or backsolving (when given answers)</strong>
          </span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>✓ The discriminant b² - 4ac tells you the number of x-intercepts</strong>
          </span>
        </div>
        <div style={{ marginBottom: '0' }}>
          <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#10b981' }}>
            <strong>✓ Always check for two solutions when solving quadratic equations</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_4_2_Math;
