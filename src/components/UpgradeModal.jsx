/**
 * Upgrade Modal - Blocking payment modal when trial expires
 * Clean, minimal design with side-by-side pricing plans
 */

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { HiCheckCircle } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
import { createCheckoutSession } from '../services/stripe.service';

const useStyles = createUseStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    animation: '$fadeIn 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '1rem'
    }
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  modal: {
    background: '#ffffff',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: 'none',
    overflowY: 'auto',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
    animation: '$slideUp 0.3s ease',
    '@media (max-width: 768px)': {
      maxHeight: '95vh',
      borderRadius: '12px',
      maxWidth: '90%'
    }
  },
  '@keyframes slideUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  header: {
    padding: '1.75rem 1.5rem 1rem',
    textAlign: 'center',
    '@media (max-width: 768px)': {
      padding: '1rem 1rem 0.5rem'
    }
  },
  title: {
    fontSize: '1.375rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '0.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1.25rem'
    }
  },
  subtitle: {
    fontSize: '0.8125rem',
    color: '#64748b',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '0.75rem'
    }
  },
  durationTabs: {
    display: 'flex',
    gap: '0.375rem',
    justifyContent: 'center',
    padding: '0.25rem',
    background: '#f1f5f9',
    borderRadius: '8px',
    maxWidth: '340px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      maxWidth: '100%'
    }
  },
  durationTab: {
    flex: 1,
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: '#0f172a'
    },
    '@media (max-width: 768px)': {
      padding: '0.4rem 0.75rem',
      fontSize: '0.75rem'
    }
  },
  durationTabActive: {
    background: '#ffffff',
    color: '#0f172a',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  plansContainer: {
    padding: '0.75rem 1.5rem 1.25rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      padding: '0.5rem 1rem',
      gap: '0.75rem'
    }
  },
  planCard: {
    background: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    padding: '1.25rem 1rem',
    position: 'relative',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '1rem 0.875rem'
    }
  },
  planCardPro: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    border: '2px solid #10b981',
    color: '#ffffff'
  },
  badge: {
    position: 'absolute',
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#10b981',
    color: '#ffffff',
    padding: '0.25rem 0.75rem',
    borderRadius: '8px',
    fontSize: '0.625rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  planName: {
    fontSize: '0.9375rem',
    fontWeight: '700',
    marginBottom: '0.375rem',
    '@media (max-width: 768px)': {
      fontSize: '0.875rem'
    }
  },
  planPrice: {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '0.125rem',
    letterSpacing: '-0.02em',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem'
    }
  },
  planPeriod: {
    fontSize: '1rem',
    fontWeight: '500',
    opacity: 0.9,
    '@media (max-width: 768px)': {
      fontSize: '0.875rem'
    }
  },
  planBilling: {
    fontSize: '0.6875rem',
    opacity: 0.7,
    marginBottom: '1rem',
    lineHeight: '1.3',
    '@media (max-width: 768px)': {
      fontSize: '0.625rem'
    }
  },
  ctaButton: {
    width: '100%',
    padding: '0.5rem 1rem',
    background: '#0f172a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.8125rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      padding: '0.5rem 0.875rem',
      fontSize: '0.75rem'
    },
    '&:hover': {
      background: '#1e293b',
      transform: 'translateY(-1px)'
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  ctaButtonPro: {
    background: '#ffffff',
    color: '#10b981',
    '&:hover': {
      background: '#f8fafc',
      color: '#059669'
    }
  },
  featuresTitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    '@media (max-width: 768px)': {
      fontSize: '0.6875rem'
    }
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    '@media (max-width: 768px)': {
      gap: '0.1875rem'
    }
  },
  feature: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.375rem',
    fontSize: '0.6875rem',
    lineHeight: '1.35',
    '@media (max-width: 768px)': {
      fontSize: '0.625rem',
      gap: '0.3125rem'
    }
  },
  featureIcon: {
    fontSize: '0.875rem',
    flexShrink: 0,
    marginTop: '0.05rem',
    color: '#94a3b8',
    '@media (max-width: 768px)': {
      fontSize: '0.8125rem'
    }
  },
  featureIconPro: {
    color: '#ffffff'
  },
  footer: {
    padding: '1rem 1.5rem 1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #f1f5f9',
    fontSize: '0.6875rem',
    color: '#64748b',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      fontSize: '0.625rem'
    }
  },
  supportLink: {
    color: '#10b981',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  signOutButton: {
    background: 'none',
    border: 'none',
    color: '#64748b',
    fontSize: '0.6875rem',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline',
    '@media (max-width: 768px)': {
      fontSize: '0.625rem'
    },
    '&:hover': {
      color: '#0f172a'
    }
  }
});

const UpgradeModal = ({ trialDaysLeft = 0, onSignOut }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async (plan) => {
    try {
      if (!user) {
        console.error('No user found');
        return;
      }

      setIsLoading(true);
      await createCheckoutSession(user.id, user.email);
    } catch (error) {
      console.error('Error starting checkout:', error);
      setIsLoading(false);
      alert('Failed to start checkout. Please try again.');
    }
  };

  const freeFeatures = [
    'Access to 5 lessons per section (20 total)',
    '1 diagnostic test',
    '10 practice questions per lesson (200 total)',
    'Basic progress tracking',
    'Limited test access'
  ];

  const proFeatures = [
    'All 86 lessons across all sections',
    'Full diagnostic test with AI insights',
    'Unlimited practice questions (10,000+)',
    '5 full-length practice tests',
    'Personalized AI learning path',
    'Advanced performance analytics',
    'Section performance breakdown',
    'Weakness identification & recommendations'
  ];

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h1 className={classes.title}>Upgrade to Pro</h1>
          <p className={classes.subtitle}>
            Unlock unlimited access to all lessons, tests, and features
          </p>
        </div>

        <div className={classes.plansContainer}>
          {/* Free Plan */}
          <div className={classes.planCard}>
            <div className={classes.planName}>Free</div>
            <div className={classes.planPrice}>
              $0<span className={classes.planPeriod}>/month</span>
            </div>
            <div className={classes.planBilling}>
              {trialDaysLeft} {trialDaysLeft === 1 ? 'day' : 'days'} remaining
            </div>

            <button
              className={classes.ctaButton}
              disabled
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
            >
              Current Plan
            </button>

            <div className={classes.featuresTitle}>Includes</div>
            <ul className={classes.featuresList}>
              {freeFeatures.map((feature, index) => (
                <li key={index} className={classes.feature}>
                  <HiCheckCircle className={classes.featureIcon} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className={`${classes.planCard} ${classes.planCardPro}`}>
            <div className={classes.badge}>RECOMMENDED</div>

            <div className={classes.planName}>Pro</div>
            <div className={classes.planPrice}>
              $29<span className={classes.planPeriod}>/month</span>
            </div>
            <div className={classes.planBilling}>
              Billed monthly • Cancel anytime
            </div>

            <button
              className={`${classes.ctaButton} ${classes.ctaButtonPro}`}
              onClick={() => handleUpgrade('pro')}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Upgrade Now'}
            </button>

            <div className={classes.featuresTitle}>Includes</div>
            <ul className={classes.featuresList}>
              {proFeatures.map((feature, index) => (
                <li key={index} className={classes.feature}>
                  <HiCheckCircle className={`${classes.featureIcon} ${classes.featureIconPro}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={classes.footer}>
          <div>
            Questions? Contact us at{' '}
            <a href="mailto:support@nomiacademy.org" className={classes.supportLink}>
              support@nomiacademy.org
            </a>
          </div>
          <button className={classes.signOutButton} onClick={onSignOut}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
