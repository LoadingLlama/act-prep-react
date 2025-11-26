/**
 * MathText Component
 * Renders text with inline math expressions using KaTeX
 */
import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * Convert plain text math to LaTeX
 * Handles fractions, exponents, roots, etc.
 */
const convertToLatex = (text) => {
  if (!text) return '';

  let converted = text;

  // Convert fractions: 2/3 → \frac{2}{3}
  // Match patterns like "2/3" or "11/12" or "x²/y" etc
  converted = converted.replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}');
  converted = converted.replace(/([a-z]\^?\d*)\/([a-z]\^?\d*)/g, '\\frac{$1}{$2}');

  // Convert exponents: x² → x^{2}, 2³ → 2^{3}
  converted = converted.replace(/([a-z0-9])²/g, '$1^{2}');
  converted = converted.replace(/([a-z0-9])³/g, '$1^{3}');
  converted = converted.replace(/([a-z0-9])⁴/g, '$1^{4}');
  converted = converted.replace(/([a-z0-9])⁵/g, '$1^{5}');
  converted = converted.replace(/([a-z0-9])⁶/g, '$1^{6}');

  // Convert square roots: √16 → \sqrt{16}
  converted = converted.replace(/√(\d+)/g, '\\sqrt{$1}');
  converted = converted.replace(/√\(([^)]+)\)/g, '\\sqrt{$1}');

  // Convert cube roots: ∛27 → \sqrt[3]{27}
  converted = converted.replace(/∛(\d+)/g, '\\sqrt[3]{$1}');
  converted = converted.replace(/∛\(([^)]+)\)/g, '\\sqrt[3]{$1}');

  // Convert fourth roots: ∜16 → \sqrt[4]{16}
  converted = converted.replace(/∜(\d+)/g, '\\sqrt[4]{$1}');
  converted = converted.replace(/∜\(([^)]+)\)/g, '\\sqrt[4]{$1}');

  // Handle complex expressions in parentheses for roots
  // Like √(49x⁸) or √(9a²b⁴)
  converted = converted.replace(/√\(([^)]+)\)/g, (match, inner) => {
    return `\\sqrt{${inner}}`;
  });

  // Convert mixed fractions: 2 3/4 → 2\frac{3}{4}
  converted = converted.replace(/(\d+)\s+(\d+)\/(\d+)/g, '$1\\frac{$2}{$3}');

  return converted;
};

/**
 * Split text into math and non-math segments
 * Returns array of {type: 'text'|'math', content: string}
 */
const parseTextWithMath = (text) => {
  if (!text) return [{ type: 'text', content: '' }];

  const segments = [];
  let currentText = '';
  let inMath = false;

  // Simple heuristic: if the text contains math symbols, treat as math
  const hasMathSymbols = /[\/√∛∜²³⁴⁵⁶^×÷±∞∑∏∫]/.test(text);
  const hasFractions = /\d+\/\d+/.test(text);
  const hasExponents = /\^\d+|[²³⁴⁵⁶]/.test(text);

  if (hasMathSymbols || hasFractions || hasExponents) {
    // Split by common delimiters while preserving math
    const parts = text.split(/(\b\d+\/\d+\b|√\d+|√\([^)]+\)|∛\d+|∜\d+|\([^)]+\)|\w\^\d+|\w[²³⁴⁵⁶])/);

    for (const part of parts) {
      if (!part) continue;

      if (/\d+\/\d+|√|∛|∜|\^|[²³⁴⁵⁶]/.test(part)) {
        // This is a math segment
        segments.push({ type: 'math', content: convertToLatex(part) });
      } else {
        // Regular text
        segments.push({ type: 'text', content: part });
      }
    }
  } else {
    // No math detected, just regular text
    segments.push({ type: 'text', content: text });
  }

  return segments.length > 0 ? segments : [{ type: 'text', content: text }];
};

/**
 * MathText component - renders text with inline math
 */
const MathText = ({ children, className = '', style = {} }) => {
  if (!children) return null;

  const text = String(children);

  // Check if this looks like it contains math
  const hasMath = /[\/√∛∜²³⁴⁵⁶^×÷±∞]|\d+\/\d+/.test(text);

  if (!hasMath) {
    // No math detected, just render as plain text
    return <span className={className} style={style}>{text}</span>;
  }

  // Parse and render with math
  const segments = parseTextWithMath(text);

  return (
    <span className={className} style={style}>
      {segments.map((segment, index) => {
        if (segment.type === 'math') {
          try {
            return <InlineMath key={index} math={segment.content} />;
          } catch (e) {
            console.warn('KaTeX rendering error:', e, 'for:', segment.content);
            return <span key={index}>{segment.content}</span>;
          }
        } else {
          return <span key={index}>{segment.content}</span>;
        }
      })}
    </span>
  );
};

export default MathText;
