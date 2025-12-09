/**
 * Packet Components
 * Reusable components for packet-style lesson pages
 * Inspired by PrepPros ACT English Course workbook format
 */

import React from 'react';

/**
 * PacketHeader - Page header with metadata badges
 */
export const PacketHeader = ({ chapterNum, title, readingTime, verified = true }) => {
  return (
    <div style={{
      marginBottom: '2rem',
      borderBottom: '2px solid #e5e7eb',
      paddingBottom: '1.5rem'
    }}>
      {/* Chapter number */}
      {chapterNum && (
        <div style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#6b7280',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem'
        }}>
          CHAPTER {chapterNum}
        </div>
      )}

      {/* Title */}
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0.5rem 0',
        lineHeight: '1.2'
      }}>
        {title}
      </h1>

      {/* Metadata badges */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem',
        flexWrap: 'wrap'
      }}>
        {readingTime && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.75rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Reading Time: {readingTime}
          </div>
        )}
        {verified && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.75rem',
            backgroundColor: '#dcfce7',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#166534',
            border: '1px solid #86efac'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Verified for 2025 ACT® Exam
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * TipBox - Highlighted tip/note box
 */
export const TipBox = ({ title = "TIP", children }) => {
  return (
    <div style={{
      margin: '2rem 0',
      padding: '1.25rem 1.5rem',
      border: '3px solid #000000',
      borderRadius: '6px'
    }}>
      <div style={{
        fontWeight: '700',
        fontSize: '14px',
        letterSpacing: '0.05em',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151'
      }}>
        {children}
      </div>
    </div>
  );
};

/**
 * SectionDivider - Visual divider between major sections
 */
export const SectionDivider = () => {
  return (
    <div style={{
      margin: '3rem 0',
      height: '1px',
      background: 'linear-gradient(to right, transparent, #d1d5db, transparent)'
    }} />
  );
};

/**
 * PageNumber - Page number indicator
 */
export const PageNumber = ({ number }) => {
  return (
    <div style={{
      textAlign: 'center',
      margin: '2rem 0 1rem 0',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#9ca3af'
    }}>
      — {number} —
    </div>
  );
};

/**
 * ExerciseHeader - Numbered exercise section header
 */
export const ExerciseHeader = ({ number, title }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      margin: '2rem 0 1rem 0',
      paddingBottom: '0.75rem',
      borderBottom: '2px solid #e5e7eb'
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#3b82f6',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        fontSize: '0.875rem'
      }}>
        {number}
      </div>
      <div style={{
        fontSize: '1.125rem',
        fontWeight: '700',
        color: '#1f2937'
      }}>
        {title}
      </div>
    </div>
  );
};

/**
 * ConceptBox - Box for displaying related concepts/terms
 */
export const ConceptBox = ({ title, items, columns = 2 }) => {
  return (
    <div style={{
      margin: '1.5rem 0',
      padding: '1.25rem',
      borderRadius: '6px',
      border: '3px solid #000000'
    }}>
      {title && (
        <div style={{
          fontWeight: '600',
          fontSize: '0.9375rem',
          color: '#374151',
          marginBottom: '0.75rem'
        }}>
          {title}
        </div>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '0.5rem 1.5rem'
      }}>
        {items.map((item, index) => (
          <div key={index} style={{
            fontSize: '0.875rem',
            color: '#1f2937',
            padding: '0.25rem 0'
          }}>
            • {item}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * ComparisonTable - Side-by-side comparison of examples
 */
export const ComparisonTable = ({ columns }) => {
  return (
    <div style={{
      margin: '1.5rem 0',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
      }}>
        {/* Headers */}
        {columns.map((col, index) => (
          <div key={`header-${index}`} style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#f3f4f6',
            borderRight: index < columns.length - 1 ? '1px solid #e5e7eb' : 'none',
            fontWeight: '700',
            fontSize: '0.875rem',
            color: '#1f2937',
            textAlign: 'center'
          }}>
            {col.header}
          </div>
        ))}
        {/* Content */}
        {columns.map((col, index) => (
          <div key={`content-${index}`} style={{
            padding: '1rem',
            borderRight: index < columns.length - 1 ? '1px solid #e5e7eb' : 'none',
            borderTop: '1px solid #e5e7eb',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            color: '#1f2937'
          }}>
            {col.content}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * RuleBox - Numbered rule with examples
 */
export const RuleBox = ({ number, title, description, example, exampleLabels }) => {
  return (
    <div style={{
      margin: '1.25rem 0 1.25rem 1.5rem'
    }}>
      <div style={{
        fontWeight: '700',
        fontSize: '15px',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        {number}. {title}
      </div>
      {example && (
        <div style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
          <div style={{
            fontSize: '15px',
            color: '#1f2937',
            marginBottom: '0.25rem'
          }}>
            {example}
          </div>
          {exampleLabels && (
            <div style={{
              fontSize: '13px',
              color: '#6b7280',
              marginTop: '0.25rem',
              display: 'flex',
              gap: '3rem'
            }}>
              {exampleLabels.map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
