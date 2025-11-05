/**
 * Signup Component
 * Handles new user registration with email/password
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { loginStyles } from '../../styles/auth/login.styles';

const Signup = ({ onSwitchToLogin }) => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
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

  if (success) {
    return (
      <div style={loginStyles.container}>
        <img
          src="/images/nomi-academy-logo.png"
          alt="Nomi Academy"
          style={loginStyles.logo}
        />
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
      <img
        src="/images/nomi-academy-logo.png"
        alt="Nomi Academy"
        style={loginStyles.logo}
      />
      <div style={loginStyles.card}>
        <h2 style={loginStyles.title}>Create Account</h2>
        <p style={loginStyles.subtitle}>Start your ACT prep journey today</p>

        {error && (
          <div style={loginStyles.errorMessage}>
            {error}
          </div>
        )}

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
            style={loginStyles.submitButton}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
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
