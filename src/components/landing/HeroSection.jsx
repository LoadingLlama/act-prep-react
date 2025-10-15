import React from 'react';
import { heroStyles } from '../../styles/landing/hero.styles';
import { dynamicTexts } from '../../data/landingPageData';

const HeroSection = ({ currentDynamicText, openModal, signupCount }) => {
  return (
    <section className="hero" style={heroStyles.hero}>
      {/* Spinning Light Animation */}
      <div style={heroStyles.spinningLight}>
        <div style={heroStyles.spinningLightInner}></div>
      </div>

      <div style={heroStyles.heroBadge}>
        Coming Soon • Early December
      </div>

      <h1 style={heroStyles.heroTitle}>
        <span style={{ fontWeight: 700, color: 'white' }}>Master the ACT with</span>
        <br />
        <span style={heroStyles.dynamicText}>
          {dynamicTexts[currentDynamicText]}
        </span>
      </h1>

      <p style={heroStyles.heroDescription}>
        AI-powered tutoring platform that adapts to your learning style.
        <br />
        Join <span style={heroStyles.signupCount}>{signupCount.toLocaleString()}</span> students preparing for success.
      </p>

      <div style={heroStyles.heroButtons}>
        <button style={heroStyles.ctaButton} onClick={openModal}>
          Join Waitlist
        </button>
        <a
          href="#demo"
          style={heroStyles.demoButton}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Watch Demo
        </a>
      </div>

      {/* Gradient orbs */}
      <div style={heroStyles.gradientOrbs}>
        <div style={heroStyles.orb1}></div>
        <div style={heroStyles.orb2}></div>
        <div style={heroStyles.orb3}></div>
      </div>

      {/* Hero auras */}
      <div style={heroStyles.heroAuras}>
        <div style={heroStyles.aura1}></div>
        <div style={heroStyles.aura2}></div>
      </div>
    </section>
  );
};

export default HeroSection;