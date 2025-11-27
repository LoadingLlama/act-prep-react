/**
 * Inline Authentication Component
 * Shows on page (not as modal) - inspired by Crackd design
 * Collapsible email/password form
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi2';
import { useAuth } from '../../contexts/AuthContext';
import { validatePassword, validateEmail, sanitizeInput } from '../../utils/security';
import Logo from '../common/Logo';

const InlineAuth = () => {
  const { signUp, signIn, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Default to login mode
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isBackHovered, setIsBackHovered] = useState(false);

  // Prevent body scrolling when auth is shown
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  // Don't render if user is logged in
  if (user) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      const { error: googleError } = await signInWithGoogle();

      if (googleError) {
        setError(googleError.message || 'Failed to sign in with Google');
        setLoading(false);
        return;
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (isSignup && !sanitizeInput(formData.name, { maxLength: 100 })) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    const validatedEmail = validateEmail(formData.email);
    if (!validatedEmail) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (isSignup) {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        setError(passwordValidation.errors.join('. '));
        setLoading(false);
        return;
      }
    }

    try {
      if (isSignup) {
        const { error: signUpError } = await signUp(
          formData.email,
          formData.password,
          { full_name: formData.name }
        );

        if (signUpError) {
          setError(signUpError.message || 'Failed to create account');
          setLoading(false);
          return;
        }
      } else {
        const { error: signInError } = await signIn(formData.email, formData.password);

        if (signInError) {
          setError(signInError.message || 'Failed to sign in');
          setLoading(false);
          return;
        }
      }

      setLoading(false);
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.card}>
        {/* Back Button */}
        <button
          onClick={handleBack}
          onMouseEnter={() => setIsBackHovered(true)}
          onMouseLeave={() => setIsBackHovered(false)}
          style={{
            ...styles.backButton,
            ...(isBackHovered ? styles.backButtonHover : {})
          }}
        >
          <HiArrowLeft style={{ width: '20px', height: '20px' }} />
        </button>

        {/* Logo */}
        <div style={styles.logo}>
          <Logo size="medium" />
        </div>

        {/* Tagline */}
        <h2 style={styles.heading}>
          Login or sign up below to get started!
        </h2>

        {/* Social Buttons */}
        <div style={styles.socialContainer}>
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            onMouseEnter={() => setHoveredButton('google')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...styles.socialButton,
              ...(hoveredButton === 'google' ? styles.socialButtonHover : {}),
            }}
          >
            <svg style={styles.socialIcon} viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Login with Google
          </button>
        </div>

        {/* Toggle email form link */}
        <button
          onClick={() => setShowEmailForm(!showEmailForm)}
          style={styles.cantLoginLink}
          disabled={loading}
        >
          {showEmailForm ? 'Hide email login' : "Can't login with these?"}
        </button>

        {/* Collapsible Email Form */}
        {showEmailForm && (
          <div style={styles.emailFormContainer}>
            <div style={styles.divider}>
              <span style={styles.dividerLine} />
              <span style={styles.dividerText}>or use email</span>
              <span style={styles.dividerLine} />
            </div>

            {error && (
              <div style={styles.errorMessage}>
                {error}
              </div>
            )}

            <form onSubmit={handleEmailAuth} style={styles.form}>
              {isSignup && (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Full Name"
                  required
                  disabled={loading}
                />
              )}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="Email"
                required
                disabled={loading}
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                placeholder="Password"
                required
                disabled={loading}
              />

              <button
                type="submit"
                style={styles.submitButton}
                disabled={loading}
              >
                {loading ? (isSignup ? 'Creating account...' : 'Logging in...') : (isSignup ? 'Create account' : 'Login')}
              </button>

              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                style={styles.switchModeButton}
                disabled={loading}
              >
                {isSignup ? 'Already have an account?' : 'Create an account'}
              </button>

              {!isSignup && (
                <button
                  type="button"
                  style={styles.forgotPasswordButton}
                  disabled={loading}
                >
                  Forgot password?
                </button>
              )}
            </form>

            <button
              onClick={() => setShowEmailForm(false)}
              style={styles.hideEmailButton}
              disabled={loading}
            >
              Hide email login
            </button>
          </div>
        )}

        {/* Terms */}
        <p style={styles.termsText}>
          By signing up, you agree to the{' '}
          <a href="/terms" style={styles.link}>Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy" style={styles.link}>Privacy Policy</a>
        </p>
      </div>

      {/* Rating - Outside the box */}
      <div style={styles.ratingContainer}>
        <span style={styles.stars}>★★★★★</span>
        <span style={styles.ratingText}>
          <strong>Rated 4.9</strong> by students
        </span>
      </div>
    </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'auto',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: '#ffffff',
    borderRadius: '16px',
    padding: '28px 24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    border: 'none',
    boxSizing: 'border-box',
    maxHeight: '90vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '@media (max-width: 480px)': {
      maxWidth: 'calc(100% - 40px)',
      width: 'calc(100% - 40px)',
      padding: '24px 20px',
      maxHeight: '85vh',
      borderRadius: '12px',
    },
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    transition: 'all 0.2s ease',
  },
  backButtonHover: {
    background: '#f3f4f6',
    color: '#374151',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '12px',
    '@media (max-width: 480px)': {
      marginBottom: '8px',
    },
  },
  heading: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '16px',
    lineHeight: '1.4',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    '@media (max-width: 480px)': {
      fontSize: '13px',
      marginBottom: '12px',
    },
  },
  socialContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px',
    '@media (max-width: 480px)': {
      gap: '6px',
      marginBottom: '8px',
    },
  },
  socialButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: '500',
    width: '100%',
    background: '#ffffff',
    border: '1.5px solid #f3f4f6',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#374151',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    minHeight: '44px',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    '@media (max-width: 480px)': {
      padding: '12px 16px',
      fontSize: '13px',
      minHeight: '48px',
    },
  },
  socialButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  socialIcon: {
    width: '20px',
    height: '20px',
    flexShrink: 0,
  },
  cantLoginLink: {
    width: '100%',
    textAlign: 'center',
    padding: '8px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#1e3a8a',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  emailFormContainer: {
    marginTop: '12px',
    animation: 'slideDown 0.3s ease',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#e5e7eb',
  },
  dividerText: {
    fontSize: '11px',
    color: '#9ca3af',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  input: {
    padding: '10px 12px',
    fontSize: '14px',
    border: '1.5px solid #d1d5db',
    borderRadius: '7px',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#111827',
  },
  submitButton: {
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '4px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  switchModeButton: {
    width: '100%',
    textAlign: 'center',
    padding: '8px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#1e3a8a',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  forgotPasswordButton: {
    width: '100%',
    textAlign: 'center',
    padding: '6px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  hideEmailButton: {
    width: '100%',
    textAlign: 'center',
    padding: '8px',
    marginTop: '8px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  errorMessage: {
    padding: '10px 12px',
    background: '#FEF2F2',
    border: '1px solid #FCA5A5',
    borderRadius: '7px',
    color: '#DC2626',
    fontSize: '13px',
    marginBottom: '12px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  termsText: {
    fontSize: '10px',
    color: '#9ca3af',
    lineHeight: '1.5',
    marginTop: '12px',
    marginBottom: '0',
    textAlign: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  link: {
    color: '#1e3a8a',
    textDecoration: 'underline',
    fontWeight: '500',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginTop: '12px',
  },
  stars: {
    fontSize: '14px',
    color: '#FFB800',
    letterSpacing: '1px',
  },
  ratingText: {
    fontSize: '11px',
    color: '#9ca3af',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
  },
};

export default InlineAuth;
