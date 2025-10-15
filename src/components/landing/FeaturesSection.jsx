import React from 'react';
import { featuresStyles } from '../../styles/landing/features.styles';
import { features } from '../../data/landingPageData';

const FeaturesSection = () => {
  return (
    <section id="features" className="features-section" style={featuresStyles.featuresSection}>
      <div style={featuresStyles.container}>
        <div style={featuresStyles.header}>
          <span style={featuresStyles.badge}>Features</span>
          <h2 style={featuresStyles.title}>Everything You Need to Succeed</h2>
          <p style={featuresStyles.subtitle}>
            Our comprehensive platform combines cutting-edge technology with proven teaching methods
          </p>
        </div>

        <div style={featuresStyles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={featuresStyles.featureCard}
              className="feature-card"
            >
              <div style={featuresStyles.featureIcon}>{feature.icon}</div>
              <h3 style={featuresStyles.featureTitle}>{feature.title}</h3>
              <p style={featuresStyles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;