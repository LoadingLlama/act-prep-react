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
        <span style={loginStyles.logoAcademy}> Academy</span>
      </div>
      <div style={loginStyles.card}>
        <h2 style={loginStyles.title}>Welcome Back</h2>
        <p style={loginStyles.subtitle}>Sign in to continue your ACT prep journey</p>

        {error && (
          <div style={loginStyles.errorMessage}>
            {error}
          </div>
        )}

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

        <div style={loginStyles.divider}>
          <span style={loginStyles.dividerText}>or</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          style={loginStyles.googleButton}
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
