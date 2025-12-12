/**
 * Math Packet Components
 * Math-specific reusable components for packet-style lesson pages
 * Extends PacketComponents.jsx with mathematical notation, diagrams, and formulas
 */

import React from 'react';
import MathText from '../MathText';

/**
 * FormulaBox - Highlighted formula with context
 * Displays a key mathematical formula with when/why to use it
 */
export const FormulaBox = ({ title, formula, when, variables }) => {
  return (
    <div style={{
      margin: '2rem 0',
      padding: '1.5rem',
      border: '3px solid #000000',
      borderRadius: '6px',
      backgroundColor: '#fffbeb'
    }}>
      {/* Title */}
      <div style={{
        fontWeight: '700',
        fontSize: '16px',
        letterSpacing: '0.05em',
        color: '#92400e',
        marginBottom: '1rem'
      }}>
        {title}
      </div>

      {/* Formula */}
      <div style={{
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '4px',
        border: '2px solid #fbbf24',
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1rem',
        fontFamily: 'Georgia, "Times New Roman", serif'
      }}>
        <MathText>{formula}</MathText>
      </div>

      {/* Variables explanation */}
      {variables && (
        <div style={{
          fontSize: '14px',
          color: '#78716c',
          marginBottom: '0.75rem',
          lineHeight: '1.6'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Where:</div>
          {variables.map((variable, index) => (
            <div key={index} style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>
              • <MathText>{variable.symbol}</MathText> = {variable.description}
            </div>
          ))}
        </div>
      )}

      {/* When to use */}
      {when && (
        <div style={{
          fontSize: '14px',
          lineHeight: '1.7',
          color: '#92400e',
          fontWeight: '500'
        }}>
          <strong>When to use:</strong> {when}
        </div>
      )}
    </div>
  );
};

/**
 * DiagramBox - Container for geometric diagrams
 * Displays a diagram with title and caption
 */
export const DiagramBox = ({ title, imagePath, caption, width = '100%', maxWidth = '500px' }) => {
  return (
    <div style={{
      margin: '2rem 0',
      padding: '1.5rem',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#fafafa',
      textAlign: 'center'
    }}>
      {/* Title */}
      {title && (
        <div style={{
          fontWeight: '700',
          fontSize: '15px',
          color: '#1f2937',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {title}
        </div>
      )}

      {/* Diagram Image */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '6px',
        marginBottom: caption ? '1rem' : '0'
      }}>
        <img
          src={imagePath}
          alt={title || 'Geometric diagram'}
          style={{
            width: width,
            maxWidth: maxWidth,
            height: 'auto',
            display: 'block'
          }}
        />
      </div>

      {/* Caption */}
      {caption && (
        <div style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.6',
          fontStyle: 'italic'
        }}>
          {caption}
        </div>
      )}
    </div>
  );
};

/**
 * GraphBox - Container for coordinate plane graphs
 * Similar to DiagramBox but specifically for coordinate geometry
 */
export const GraphBox = ({ title, imagePath, keyPoints, domain, range }) => {
  return (
    <div style={{
      margin: '2rem 0',
      padding: '1.5rem',
      border: '2px solid #dbeafe',
      borderRadius: '8px',
      backgroundColor: '#f0f9ff'
    }}>
      {/* Title */}
      {title && (
        <div style={{
          fontWeight: '700',
          fontSize: '15px',
          color: '#1e40af',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {title}
        </div>
      )}

      {/* Graph Image */}
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
          src={imagePath}
          alt={title || 'Coordinate graph'}
          style={{
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>

      {/* Key Points */}
      {keyPoints && keyPoints.length > 0 && (
        <div style={{
          fontSize: '14px',
          color: '#1e40af',
          lineHeight: '1.8',
          marginBottom: '0.5rem'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Key Points:</div>
          {keyPoints.map((point, index) => (
            <div key={index} style={{ marginLeft: '1rem' }}>
              • {point}
            </div>
          ))}
        </div>
      )}

      {/* Domain and Range */}
      {(domain || range) && (
        <div style={{
          fontSize: '14px',
          color: '#1e40af',
          marginTop: '0.75rem',
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center'
        }}>
          {domain && (
            <div>
              <strong>Domain:</strong> <MathText>{domain}</MathText>
            </div>
          )}
          {range && (
            <div>
              <strong>Range:</strong> <MathText>{range}</MathText>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * CalculatorTipBox - Calculator strategy tips
 * Indicates when to use or avoid calculator
 */
export const CalculatorTipBox = ({ type = 'allowed', children }) => {
  const isAllowed = type === 'allowed';
  const isRecommended = type === 'recommended';

  const backgroundColor = isAllowed ? '#f0fdf4' : isRecommended ? '#fef3c7' : '#fef2f2';
  const borderColor = isAllowed ? '#86efac' : isRecommended ? '#fcd34d' : '#fca5a5';
  const textColor = isAllowed ? '#166534' : isRecommended ? '#92400e' : '#991b1b';
  const icon = isAllowed ? '🧮' : isRecommended ? '⚡' : '🚫';
  const label = isAllowed ? 'CALCULATOR ALLOWED' : isRecommended ? 'CALCULATOR RECOMMENDED' : 'NO CALCULATOR NEEDED';

  return (
    <div style={{
      margin: '1.5rem 0',
      padding: '1rem 1.25rem',
      border: `2px solid ${borderColor}`,
      borderRadius: '6px',
      backgroundColor: backgroundColor
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: '700',
        fontSize: '13px',
        letterSpacing: '0.05em',
        color: textColor,
        marginBottom: '0.5rem'
      }}>
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div style={{
        fontSize: '14px',
        lineHeight: '1.6',
        color: textColor
      }}>
        {children}
      </div>
    </div>
  );
};

/**
 * StepByStepBox - Multi-step problem solution
 * Shows clear step-by-step mathematical reasoning
 */
export const StepByStepBox = ({ title = 'Solution', steps }) => {
  return (
    <div style={{
      margin: '2rem 0',
      padding: '1.5rem',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#fafafa'
    }}>
      {/* Title */}
      <div style={{
        fontWeight: '700',
        fontSize: '15px',
        color: '#1f2937',
        marginBottom: '1.25rem',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid #d1d5db'
      }}>
        {title}
      </div>

      {/* Steps */}
      {steps.map((step, index) => (
        <div key={index} style={{
          marginBottom: index < steps.length - 1 ? '1.5rem' : '0',
          paddingLeft: '1rem',
          borderLeft: '3px solid #3b82f6'
        }}>
          {/* Step Label */}
          <div style={{
            fontWeight: '700',
            fontSize: '14px',
            color: '#3b82f6',
            marginBottom: '0.5rem'
          }}>
            {step.label || `Step ${index + 1}`}
          </div>

          {/* Step Description */}
          <div style={{
            fontSize: '14px',
            color: '#4b5563',
            marginBottom: '0.5rem',
            lineHeight: '1.6'
          }}>
            {step.text}
          </div>

          {/* Step Math */}
          {step.math && (
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'white',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937',
              fontFamily: 'Georgia, "Times New Roman", serif'
            }}>
              <MathText>{step.math}</MathText>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * StrategyBox - ACT test-taking strategy
 * Highlights specific strategies for solving ACT Math problems
 */
export const StrategyBox = ({ title, children, icon = '💡' }) => {
  return (
    <div style={{
      margin: '2rem 0',
      padding: '1.25rem 1.5rem',
      border: '3px solid #8b5cf6',
      borderRadius: '6px',
      backgroundColor: '#faf5ff'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontWeight: '700',
        fontSize: '15px',
        letterSpacing: '0.05em',
        color: '#6b21a8',
        marginBottom: '0.75rem'
      }}>
        <span style={{ fontSize: '20px' }}>{icon}</span>
        <span>{title}</span>
      </div>
      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#581c87'
      }}>
        {children}
      </div>
    </div>
  );
};

/**
 * CommonMistakeBox - Highlight common errors
 * Shows what students commonly get wrong and how to avoid it
 */
export const CommonMistakeBox = ({ children }) => {
  return (
    <div style={{
      margin: '1.5rem 0',
      padding: '1rem 1.25rem',
      border: '2px solid #fca5a5',
      borderRadius: '6px',
      backgroundColor: '#fef2f2'
    }}>
      <div style={{
        fontWeight: '700',
        fontSize: '14px',
        letterSpacing: '0.05em',
        color: '#991b1b',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>⚠️</span>
        <span>COMMON MISTAKE</span>
      </div>
      <div style={{
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#7f1d1d'
      }}>
        {children}
      </div>
    </div>
  );
};

/**
 * MatrixBox - Display matrices
 * Shows mathematical matrices with proper formatting
 */
export const MatrixBox = ({ matrix, label }) => {
  return (
    <div style={{
      margin: '1.5rem 0',
      textAlign: 'center'
    }}>
      {label && (
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#4b5563',
          marginBottom: '0.75rem'
        }}>
          {label}
        </div>
      )}
      <div style={{
        display: 'inline-block',
        padding: '1rem',
        backgroundColor: '#fafafa',
        borderRadius: '6px',
        border: '2px solid #e5e7eb'
      }}>
        <table style={{
          borderCollapse: 'separate',
          borderSpacing: '1rem 0.5rem',
          fontSize: '16px',
          fontFamily: 'Georgia, "Times New Roman", serif'
        }}>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {rowIndex === 0 && (
                  <td style={{
                    fontSize: '40px',
                    fontWeight: '100',
                    paddingRight: '0.5rem',
                    verticalAlign: 'middle'
                  }}>
                    [
                  </td>
                )}
                {rowIndex !== 0 && <td style={{ width: '30px' }}></td>}
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={{
                    textAlign: 'center',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    {cell}
                  </td>
                ))}
                {rowIndex === 0 && (
                  <td style={{
                    fontSize: '40px',
                    fontWeight: '100',
                    paddingLeft: '0.5rem',
                    verticalAlign: 'middle'
                  }}>
                    ]
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
