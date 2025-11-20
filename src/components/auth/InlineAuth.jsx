/**
 * Inline Authentication Component
 * Shows on page (not as modal) - inspired by Crackd design
 * Collapsible email/password form
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { validatePassword, validateEmail, sanitizeInput } from '../../utils/security';
import Logo from '../common/Logo';

const InlineAuth = () => {
  const { signUp, signIn, signInWithGoogle, signInWithFacebook, signInWithApple, user } = useAuth();
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

  const handleFacebookAuth = async () => {
    setError('');
    setLoading(true);

    try {
      const { error: facebookError } = await signInWithFacebook();

      if (facebookError) {
        setError(facebookError.message || 'Failed to sign in with Facebook');
        setLoading(false);
        return;
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleAppleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      const { error: appleError } = await signInWithApple();

      if (appleError) {
        setError(appleError.message || 'Failed to sign in with Apple');
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
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

          <button
            onClick={handleFacebookAuth}
            disabled={loading}
            onMouseEnter={() => setHoveredButton('facebook')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...styles.socialButton,
              ...styles.facebookButton,
              ...(hoveredButton === 'facebook' ? styles.facebookButtonHover : {}),
            }}
          >
            <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="#ffffff">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Login with Facebook
          </button>

          <button
            onClick={handleAppleAuth}
            disabled={loading}
            onMouseEnter={() => setHoveredButton('apple')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...styles.socialButton,
              ...styles.appleButton,
              ...(hoveredButton === 'apple' ? styles.appleButtonHover : {}),
            }}
          >
            <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="#ffffff">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Login with Apple
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
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    maxHeight: '100vh',
    width: '100%',
    padding: '16px',
    background: 'transparent',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '28px 24px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    boxSizing: 'border-box',
    '@media (max-width: 480px)': {
      maxWidth: '95%',
      padding: '24px 20px',
    },
  },
  logo: {
    textAlign: 'center',
    marginBottom: '12px',
  },
  heading: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '16px',
    lineHeight: '1.4',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  socialContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px',
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
    border: '1.5px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#374151',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  socialButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  facebookButton: {
    background: '#1877F2',
    color: '#ffffff',
    border: '1.5px solid #1877F2',
  },
  facebookButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(24, 119, 242, 0.25)',
  },
  appleButton: {
    background: '#000000',
    color: '#ffffff',
    border: '1.5px solid #000000',
  },
  appleButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
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
