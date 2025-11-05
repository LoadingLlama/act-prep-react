import React from 'react';
import { ctaStyles } from '../../styles/landing/cta.styles';

const CTASection = ({ openModal }) => {
  return (
    <section className="cta-section" style={ctaStyles.ctaSection}>
      <div style={ctaStyles.container}>
        <h2 style={ctaStyles.title}>Ready to Transform Your ACT Score?</h2>
        <p style={ctaStyles.subtitle}>
          Join thousands of students already preparing with Nomi Academy
        </p>
        <button style={ctaStyles.ctaButton} onClick={openModal}>
          Get Early Access
        </button>
        <p style={ctaStyles.disclaimer}>
          Limited spots available • No credit card required
        </p>
      </div>
    </section>
  );
};

export default CTASection;