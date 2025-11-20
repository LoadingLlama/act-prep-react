/**
 * Upgrade Page
 * Single-tier pricing focused on converting free trial users
 */

import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { HiCheck, HiSparkles, HiRocketLaunch, HiStar, HiLockClosed } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/api/supabase.service';
import { createCheckoutSession } from '../services/stripe.service';
import { getTrialInfo } from '../services/subscription.service';

const useStyles = createUseStyles({
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 2rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      padding: '4.5rem 0.5rem 1.5rem 0.5rem',
      justifyContent: 'flex-start',
      width: '100%',
      maxWidth: '100%',
      margin: 0
    }
  },
  trialBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.35rem 0.85rem',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '1px solid #93c5fd',
    borderRadius: '16px',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: '1rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    maxWidth: '700px'
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
    letterSpacing: '-0.03em',
    lineHeight: '1.1',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem',
      lineHeight: '1.2'
    }
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6b7280',
    lineHeight: '1.5',
    marginBottom: '0.5rem',
    '@media (max-width: 768px)': {
      fontSize: '0.875rem',
      lineHeight: '1.4'
    }
  },
  priceHighlight: {
    fontSize: '0.9rem',
    color: '#3b82f6',
    fontWeight: '600',
    marginTop: '0.5rem'
  },
  mainCard: {
    maxWidth: '750px',
    width: '100%',
    background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
    borderRadius: '16px',
    border: '2px solid #e5e7eb',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    '@media (max-width: 768px)': {
      padding: '1.25rem 0.875rem',
      maxWidth: '100%',
      width: '100%',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)'
    }
  },
  priceSection: {
    textAlign: 'center',
    padding: '1.5rem',
    background: 'linear-gradient(135deg, #08245b 0%, #0d3a8f 100%)',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    color: '#ffffff',
    '@media (max-width: 768px)': {
      padding: '1.25rem 1rem'
    }
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '0.35rem',
    marginBottom: '0.5rem',
    '@media (max-width: 768px)': {
      gap: '0.25rem'
    }
  },
  price: {
    fontSize: '3rem',
    fontWeight: '800',
    lineHeight: '1',
    '@media (max-width: 768px)': {
      fontSize: '2.25rem'
    }
  },
  priceSymbol: {
    fontSize: '1.75rem',
    opacity: 0.9,
    '@media (max-width: 768px)': {
      fontSize: '1.5rem'
    }
  },
  pricePeriod: {
    fontSize: '1.125rem',
    opacity: 0.9,
    fontWeight: '500',
    '@media (max-width: 768px)': {
      fontSize: '1rem'
    }
  },
  priceNote: {
    fontSize: '0.8rem',
    opacity: 0.8,
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '0.75rem',
      marginBottom: '0.875rem'
    }
  },
  ctaButton: {
    width: '100%',
    maxWidth: '320px',
    padding: '0.875rem 2rem',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: '#ffffff',
    color: '#08245b',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(255, 255, 255, 0.3)'
    }
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '1.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.625rem',
      marginBottom: '1.25rem'
    }
  },
  featureColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    '@media (max-width: 768px)': {
      gap: '0.4rem'
    }
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    '@media (max-width: 768px)': {
      gap: '0.35rem'
    }
  },
  checkIcon: {
    fontSize: '1.125rem',
    color: '#10b981',
    flexShrink: 0,
    marginTop: '0.125rem',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem',
      marginTop: '0.05rem'
    }
  },
  featureText: {
    fontSize: '0.85rem',
    color: '#374151',
    lineHeight: '1.4',
    fontWeight: '500',
    '@media (max-width: 768px)': {
      fontSize: '0.7rem',
      lineHeight: '1.3'
    }
  },
  featureHighlight: {
    fontWeight: '600',
    color: '#1a1a1a'
  },
  comparisonSection: {
    marginTop: '1.5rem',
    padding: '1.25rem',
    background: '#f9fafb',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    '@media (max-width: 768px)': {
      padding: '1rem',
      marginTop: '1.25rem'
    }
  },
  comparisonTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '1rem',
    textAlign: 'center',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem',
      marginBottom: '0.75rem'
    }
  },
  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr 1fr',
      gap: '0.625rem'
    }
  },
  comparisonCard: {
    padding: '1rem',
    borderRadius: '8px',
    '@media (max-width: 768px)': {
      padding: '0.75rem 0.625rem'
    }
  },
  freeCard: {
    background: '#ffffff',
    border: '1.5px solid #e5e7eb'
  },
  proCard: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '1.5px solid #60a5fa'
  },
  comparisonCardTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    '@media (max-width: 768px)': {
      fontSize: '0.825rem',
      marginBottom: '0.5rem',
      gap: '0.3rem'
    }
  },
  comparisonList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    '@media (max-width: 768px)': {
      gap: '0.35rem'
    }
  },
  comparisonItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.75rem',
    color: '#6b7280',
    '@media (max-width: 768px)': {
      fontSize: '0.65rem',
      gap: '0.3rem',
      lineHeight: '1.3'
    }
  },
  limitedIcon: {
    fontSize: '0.95rem',
    color: '#ef4444',
    flexShrink: 0
  },
  guaranteeBanner: {
    textAlign: 'center',
    marginTop: '1.5rem',
    padding: '1rem',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '1.5px solid #86efac',
    borderRadius: '10px'
  },
  guaranteeTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#166534',
    marginBottom: '0.35rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem'
  },
  guaranteeText: {
    fontSize: '0.8rem',
    color: '#15803d',
    lineHeight: '1.5'
  }
});

const UpgradePage = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const [trialDaysLeft, setTrialDaysLeft] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const calculateTrialDays = async () => {
      if (!user) return;

      try {
        const trialInfo = await getTrialInfo(user.id);
        setTrialDaysLeft(trialInfo.daysRemaining);
      } catch (error) {
        console.error('Error calculating trial days:', error);
      }
    };

    calculateTrialDays();
  }, [user]);

  const handleUpgrade = async () => {
    try {
      if (!user) {
        console.error('No user found');
        return;
      }

      setIsLoading(true);
      console.log('Redirecting to Stripe Checkout...');
      await createCheckoutSession(user.id, user.email);
    } catch (error) {
      console.error('Error starting checkout:', error);
      setIsLoading(false);
      alert('Failed to start checkout. Please try again.');
    }
  };

  const proFeatures = [
    { text: 'Full access to all lessons across all sections', highlight: 'Full access' },
    { text: 'Full diagnostic test access' },
    { text: 'Unlimited practice tests' },
    { text: 'Unlimited practice questions' },
    { text: 'AI learning path recommendations' },
    { text: 'Performance insights & analytics' },
    { text: 'Detailed progress tracking' },
    { text: 'Section performance breakdown' },
    { text: 'Weak area identification' },
    { text: 'Custom study schedules' }
  ];

  const freeFeatures = [
    '5 lessons per section (limited)',
    '1 practice test only',
    '10 practice questions per lesson',
    'No insights or analytics'
  ];

  return (
    <div className={classes.container}>
      <div className={classes.trialBadge}>
        <HiSparkles />
        {trialDaysLeft} {trialDaysLeft === 1 ? 'Day' : 'Days'} Left in Your Free Trial
      </div>

      <div className={classes.header}>
        <h1 className={classes.title}>
          Get Full Access to Ace the ACT
        </h1>
        <p className={classes.subtitle}>
          All lessons, tests, and AI-powered features to maximize your score.
        </p>
        <div className={classes.priceHighlight}>
          Save $48/year with annual billing
        </div>
      </div>

      <div className={classes.mainCard}>
        <div className={classes.priceSection}>
          <div className={classes.priceContainer}>
            <span className={classes.priceSymbol}>$</span>
            <span className={classes.price}>29</span>
            <span className={classes.pricePeriod}>/month</span>
          </div>
          <div className={classes.priceNote}>
            Billed monthly • Cancel anytime
          </div>
          <button
            className={classes.ctaButton}
            onClick={handleUpgrade}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'wait' : 'pointer' }}
          >
            <HiRocketLaunch style={{ fontSize: '1.125rem' }} />
            {isLoading ? 'Redirecting to Checkout...' : 'Start Pro Now'}
          </button>
        </div>

        <div className={classes.featuresGrid}>
          <div className={classes.featureColumn}>
            {proFeatures.slice(0, 5).map((feature, index) => (
              <div key={index} className={classes.featureItem}>
                <HiCheck className={classes.checkIcon} />
                <span className={classes.featureText}>
                  {feature.highlight ? (
                    <>
                      {feature.text.split(feature.highlight)[0]}
                      <span className={classes.featureHighlight}>{feature.highlight}</span>
                      {feature.text.split(feature.highlight)[1]}
                    </>
                  ) : (
                    feature.text
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className={classes.featureColumn}>
            {proFeatures.slice(5).map((feature, index) => (
              <div key={index} className={classes.featureItem}>
                <HiCheck className={classes.checkIcon} />
                <span className={classes.featureText}>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.comparisonSection}>
          <h3 className={classes.comparisonTitle}>Free vs Pro</h3>
          <div className={classes.comparisonGrid}>
            <div className={`${classes.comparisonCard} ${classes.freeCard}`}>
              <div className={classes.comparisonCardTitle} style={{ color: '#6b7280' }}>
                <HiLockClosed />
                Free Trial
              </div>
              <ul className={classes.comparisonList}>
                {freeFeatures.map((feature, index) => (
                  <li key={index} className={classes.comparisonItem}>
                    <HiLockClosed className={classes.limitedIcon} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${classes.comparisonCard} ${classes.proCard}`}>
              <div className={classes.comparisonCardTitle} style={{ color: '#1e40af' }}>
                <HiStar />
                Pro Access
              </div>
              <ul className={classes.comparisonList}>
                {proFeatures.slice(0, 4).map((feature, index) => (
                  <li key={index} className={classes.comparisonItem} style={{ color: '#1e40af', fontWeight: '600' }}>
                    <HiCheck style={{ color: '#10b981', fontSize: '0.95rem' }} />
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UpgradePage;
