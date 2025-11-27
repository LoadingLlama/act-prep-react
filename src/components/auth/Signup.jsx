/**
 * Signup Component
 * Handles new user registration with email/password
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { loginStyles } from '../../styles/auth/login.styles';
import { validatePassword, validateEmail, sanitizeInput } from '../../utils/security';

const Signup = ({ onSwitchToLogin }) => {
  const { signUp, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [googleHovered, setGoogleHovered] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    // Sanitize name input
    const sanitizedName = sanitizeInput(formData.name, { maxLength: 100 });
    if (!sanitizedName) {
      setError('Name is required');
      return false;
    }

    // Validate email
    const validatedEmail = validateEmail(formData.email);
    if (!validatedEmail) {
      setError('Please enter a valid email address');
      return false;
    }

    // Validate password strength
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.errors.join('. '));
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.name,
        }
      );

      if (signUpError) {
        setError(signUpError.message || 'Failed to create account');
        setLoading(false);
        return;
      }

      // Success
      setSuccess(true);
      setLoading(false);

      // Auto-switch to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  /**
   * Handle Google OAuth signup
   */
  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);

    try {
      const { error: googleError } = await signInWithGoogle();

      if (googleError) {
        setError(googleError.message || 'Failed to sign up with Google');
        setLoading(false);
        return;
      }

      // OAuth will redirect - no need to handle success here
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={loginStyles.container}>
        <div style={loginStyles.logo}>
          <span style={loginStyles.logoNomi}>Nomi</span>
          <span style={loginStyles.logoAcademy}>Academy</span>
        </div>
        <div style={loginStyles.card}>
          <div style={loginStyles.successMessage}>
            <h2 style={loginStyles.title}>Account Created!</h2>
            <p style={loginStyles.subtitle}>
              Check your email to verify your account. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.logo}>
        <span style={loginStyles.logoNomi}>Nomi</span>
        <span style={loginStyles.logoAcademy}>Academy</span>
      </div>
      <div style={loginStyles.card}>
        <h2 style={loginStyles.title}>Almost There!</h2>
        <p style={loginStyles.subtitle}>Sign up now for your FREE diagnostic test</p>

        {error && (
          <div style={loginStyles.errorMessage}>
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignup}
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

        <div style={loginStyles.divider}>
          <span style={loginStyles.dividerText}>or sign up with email</span>
        </div>

        <form onSubmit={handleSubmit} style={loginStyles.form}>
          <div style={loginStyles.inputGroup}>
            <label style={loginStyles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={loginStyles.input}
              placeholder="John Doe"
              required
              disabled={loading}
            />
          </div>

          <div style={loginStyles.inputGroup}>
            <label style={loginStyles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={loginStyles.input}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          <div style={loginStyles.inputGroup}>
            <label style={loginStyles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={loginStyles.input}
              placeholder="••••••••"
              required
              disabled={loading}
            />
            <small style={loginStyles.hint}>Must be at least 6 characters</small>
          </div>

          <div style={loginStyles.inputGroup}>
            <label style={loginStyles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={loginStyles.input}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            onMouseEnter={() => setSubmitHovered(true)}
            onMouseLeave={() => setSubmitHovered(false)}
            style={{
              ...loginStyles.submitButton,
              ...(submitHovered ? {
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 12px rgba(30, 58, 138, 0.4)',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              } : {}),
            }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Claim My Free Diagnostic Test'}
          </button>
        </form>

        <div style={loginStyles.footer}>
          <p style={loginStyles.footerText}>
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              style={loginStyles.linkButton}
              disabled={loading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
