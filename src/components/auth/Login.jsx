/**
 * Login Component
 * Handles user authentication with email/password and Google OAuth
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { loginStyles } from '../../styles/auth/login.styles';
import { validateEmail, sanitizeInput } from '../../utils/security';

const Login = ({ onSwitchToSignup }) => {
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [googleHovered, setGoogleHovered] = useState(false);
  const [facebookHovered, setFacebookHovered] = useState(false);
  const [appleHovered, setAppleHovered] = useState(false);

  /**
   * Handle email/password login
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate email
    const validatedEmail = validateEmail(email);
    if (!validatedEmail) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Sanitize password input (basic sanitization, not HTML escaping)
    const sanitizedPassword = sanitizeInput(password, { allowHTML: false, maxLength: 128 });
    if (!sanitizedPassword) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      const { error: signInError } = await signIn(validatedEmail, sanitizedPassword);

      if (signInError) {
        setError(signInError.message || 'Failed to sign in');
        setLoading(false);
        return;
      }

      // Success - AuthContext will handle state update
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  /**
   * Handle Google OAuth login
   */
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const { error: googleError } = await signInWithGoogle();

      if (googleError) {
        setError(googleError.message || 'Failed to sign in with Google');
        setLoading(false);
        return;
      }

      // OAuth will redirect - no need to handle success here
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.logo}>
        <span style={loginStyles.logoNomi}>Nomi</span>
        <span style={loginStyles.logoAcademy}>Academy</span>
      </div>
      <div style={loginStyles.card}>
        <h2 style={loginStyles.title}>Welcome Back</h2>
        <p style={loginStyles.subtitle}>Sign in to continue your ACT prep journey</p>

        {error && (
          <div style={loginStyles.errorMessage}>
            {error}
          </div>
        )}

        <div style={loginStyles.socialButtonsContainer}>
          <button
            type="button"
            onClick={handleGoogleLogin}
            onMouseEnter={() => setGoogleHovered(true)}
            onMouseLeave={() => setGoogleHovered(false)}
            style={{
              ...loginStyles.socialButton,
              ...loginStyles.googleButton,
              ...(googleHovered ? {
                background: '#ffffff',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.12)',
                transform: 'translateY(-1px)',
              } : {}),
            }}
            disabled={loading}
          >
            <svg style={loginStyles.googleIcon} viewBox="0 0 24 24">
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
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            onMouseEnter={() => setFacebookHovered(true)}
            onMouseLeave={() => setFacebookHovered(false)}
            style={{
              ...loginStyles.socialButton,
              ...loginStyles.facebookButton,
              ...(facebookHovered ? {
                background: '#0c66d8',
                boxShadow: '0 6px 12px rgba(24, 119, 242, 0.4)',
                transform: 'translateY(-1px)',
              } : {}),
            }}
            disabled={loading}
          >
            <svg style={loginStyles.googleIcon} viewBox="0 0 24 24" fill="#ffffff">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            onMouseEnter={() => setAppleHovered(true)}
            onMouseLeave={() => setAppleHovered(false)}
            style={{
              ...loginStyles.socialButton,
              ...loginStyles.appleButton,
              ...(appleHovered ? {
                background: '#2a2a2a',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
                transform: 'translateY(-1px)',
              } : {}),
            }}
            disabled={loading}
          >
            <svg style={loginStyles.googleIcon} viewBox="0 0 24 24" fill="#ffffff">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Continue with Apple
          </button>
        </div>

        <div style={loginStyles.divider}>
          <span style={loginStyles.dividerText}>or sign in with email</span>
        </div>

        <form onSubmit={handleSubmit} style={loginStyles.form}>
          <div style={loginStyles.inputGroup}>
            <label style={loginStyles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={{
                ...loginStyles.input,
                ...(emailFocused ? loginStyles.inputFocus : {}),
              }}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          <div style={loginStyles.inputGroup}>
            <label style={loginStyles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              style={{
                ...loginStyles.input,
                ...(passwordFocused ? loginStyles.inputFocus : {}),
              }}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            style={{
              ...loginStyles.submitButton,
              ...(loading ? loginStyles.submitButtonDisabled : {}),
            }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={loginStyles.footer}>
          <p style={loginStyles.footerText}>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              style={loginStyles.linkButton}
              disabled={loading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
