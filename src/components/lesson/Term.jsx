/**
 * Term Component - Blue underlined term with tooltip
 * Use this component to mark key terms that should have hover tooltips
 *
 * Usage:
 *   <Term>subject-verb agreement</Term>
 *   <Term term="semicolon">semicolons</Term>  // if display text differs from database term
 */

import React from 'react';

const Term = ({ children, term }) => {
  // Use the term prop if provided, otherwise use children text
  const termKey = term || (typeof children === 'string' ? children : '');

  return (
    <strong
      data-term={termKey}
      style={{
        color: '#2563eb',
        fontWeight: '600',
        textDecoration: 'underline',
        cursor: 'pointer'
      }}
    >
      {children}
    </strong>
  );
};

export default Term;
