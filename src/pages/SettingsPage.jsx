/**
 * Settings Page
 * User preferences and account settings
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileService from '../services/api/profile.service';
import { settingsStyles } from '../styles/settings.styles';
import '../styles/settings.css';
import { HiBell, HiMoon, HiEnvelope, HiShieldCheck, HiCreditCard, HiCheckBadge } from 'react-icons/hi2';
import GoalsSettings from '../components/GoalsSettings';
import { hasProSubscription } from '../services/subscription.service';
import { redirectToCustomerPortal, getSubscription } from '../services/stripe.service';

const SettingsPage = () => {
  const { user, signOut, resetPassword } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isPro, setIsPro] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    practiceReminders: true,
    weeklyReports: false,
    darkMode: false,
    autoSave: true,
    showHints: true,
  });

  useEffect(() => {
    loadPreferences();
    loadSubscriptionStatus();
  }, [user]);

  const loadSubscriptionStatus = async () => {
    if (!user) return;

    try {
      console.log('🔍 Checking subscription status for user:', user.id);
      const proStatus = await hasProSubscription(user.id);
      console.log('✅ Pro status:', proStatus);
      setIsPro(proStatus);

      if (proStatus) {
        const subData = await getSubscription(user.id);
        console.log('📊 Subscription data:', subData);
        setSubscription(subData);
      }
    } catch (error) {
      console.error('❌ Error loading subscription:', error);
    }
  };

  const loadPreferences = async () => {
    // Check cache first for instant load
    const cacheKey = `profile_${user.id}`;
    const cached = sessionStorage.getItem(cacheKey);
    const cacheTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);
    const now = Date.now();

    // Use cache if less than 60 seconds old
    if (cached && cacheTimestamp && (now - parseInt(cacheTimestamp)) < 60000) {
      const cachedData = JSON.parse(cached);
      if (cachedData?.preferences) {
        setPreferences({
          emailNotifications: cachedData.preferences.emailNotifications ?? true,
          practiceReminders: cachedData.preferences.practiceReminders ?? true,
          weeklyReports: cachedData.preferences.weeklyReports ?? false,
          darkMode: cachedData.preferences.darkMode ?? false,
          autoSave: cachedData.preferences.autoSave ?? true,
          showHints: cachedData.preferences.showHints ?? true,
        });
      }
      setLoading(false);
      console.log('📊 Using cached preferences data');

      // Still refresh in background
      refreshPreferencesInBackground(cacheKey);
      return;
    }

    setLoading(true);
    const { data } = await ProfileService.getProfile(user.id);

    if (data?.preferences) {
      setPreferences({
        emailNotifications: data.preferences.emailNotifications ?? true,
        practiceReminders: data.preferences.practiceReminders ?? true,
        weeklyReports: data.preferences.weeklyReports ?? false,
        darkMode: data.preferences.darkMode ?? false,
        autoSave: data.preferences.autoSave ?? true,
        showHints: data.preferences.showHints ?? true,
      });
      // Cache the profile data
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      sessionStorage.setItem(`${cacheKey}_timestamp`, String(now));
    }

    setLoading(false);
  };

  const refreshPreferencesInBackground = async (cacheKey) => {
    try {
      const { data } = await ProfileService.getProfile(user.id);
      if (data) {
        // Update cache
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        sessionStorage.setItem(`${cacheKey}_timestamp`, String(Date.now()));

        // Update state if changed
        if (data?.preferences) {
          setPreferences({
            emailNotifications: data.preferences.emailNotifications ?? true,
            practiceReminders: data.preferences.practiceReminders ?? true,
            weeklyReports: data.preferences.weeklyReports ?? false,
            darkMode: data.preferences.darkMode ?? false,
            autoSave: data.preferences.autoSave ?? true,
            showHints: data.preferences.showHints ?? true,
          });
          console.log('📊 Updated preferences from background check');
        }
      }
    } catch (error) {
      console.error('Background preferences check error:', error);
    }
  };

  const handleToggle = async (key) => {
    const newPreferences = {
      ...preferences,
      [key]: !preferences[key],
    };

    setPreferences(newPreferences);
    setSaving(true);

    const { error } = await ProfileService.updatePreferences(user.id, newPreferences);

    if (error) {
      setMessage('Failed to save preferences');
      // Revert on error
      setPreferences(preferences);
    } else {
      setMessage('Preferences saved!');
      setTimeout(() => setMessage(''), 2000);
    }

    setSaving(false);
  };

  const handlePasswordReset = async () => {
    setSaving(true);

    const { error } = await resetPassword(user.email);

    if (error) {
      setMessage('Failed to send reset email');
    } else {
      setMessage('Password reset email sent! Check your inbox.');
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div style={settingsStyles.container}>
        <div style={settingsStyles.loading}>Loading settings...</div>
      </div>
    );
  }

  return (
    <div style={settingsStyles.container}>
      <div style={settingsStyles.header}>
        <h1 style={settingsStyles.title}>Settings</h1>
        <p style={settingsStyles.subtitle}>Manage your account preferences and notifications</p>
      </div>

      {message && (
        <div
          style={{
            ...settingsStyles.message,
            ...(message.includes('saved') || message.includes('sent')
              ? settingsStyles.successMessage
              : settingsStyles.errorMessage),
          }}
        >
          {message}
        </div>
      )}

      <div style={settingsStyles.content}>
        {/* Subscription Management */}
        {isPro && subscription && (
          <div style={settingsStyles.section}>
            <div style={settingsStyles.sectionHeader}>
              <HiCreditCard size={24} />
              <div>
                <h3 style={settingsStyles.sectionTitle}>Subscription</h3>
                <p style={settingsStyles.sectionDescription}>
                  Manage your Pro subscription and billing
                </p>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              borderRadius: '12px',
              border: '2px solid #bae6fd',
              marginTop: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <HiCheckBadge size={28} color="#0ea5e9" />
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0c4a6e', marginBottom: '0.25rem' }}>
                    Pro Member
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#0369a1' }}>
                    {subscription.subscription_status === 'active' && subscription.current_period_end
                      ? `Renews on ${new Date(subscription.current_period_end).toLocaleDateString()}`
                      : 'Active subscription'}
                  </p>
                </div>
              </div>

              <button
                onClick={async () => {
                  try {
                    await redirectToCustomerPortal(user.id);
                  } catch (error) {
                    setMessage('Failed to open customer portal. Please try again.');
                  }
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#0ea5e9',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#0284c7'}
                onMouseOut={(e) => e.currentTarget.style.background = '#0ea5e9'}
              >
                <HiCreditCard size={20} />
                Manage Billing & Payment
              </button>
            </div>
          </div>
        )}

        {/* Notifications */}
        <div style={settingsStyles.section}>
          <div style={settingsStyles.sectionHeader}>
            <HiBell size={24} />
            <div>
              <h3 style={settingsStyles.sectionTitle}>Notifications</h3>
              <p style={settingsStyles.sectionDescription}>
                Choose how you want to be notified about your progress
              </p>
            </div>
          </div>

          <div style={settingsStyles.settingsList}>
            <div style={settingsStyles.settingItem}>
              <div style={settingsStyles.settingInfo}>
                <h4 style={settingsStyles.settingLabel}>Email Notifications</h4>
                <p style={settingsStyles.settingDescription}>
                  Receive emails about your account and progress
                </p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                  disabled={saving}
                />
                <span className="settings-toggle-slider"></span>
              </label>
            </div>

            <div style={settingsStyles.settingItem}>
              <div style={settingsStyles.settingInfo}>
                <h4 style={settingsStyles.settingLabel}>Practice Reminders</h4>
                <p style={settingsStyles.settingDescription}>
                  Get reminders to complete your daily practice
                </p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={preferences.practiceReminders}
                  onChange={() => handleToggle('practiceReminders')}
                  disabled={saving}
                />
                <span className="settings-toggle-slider"></span>
              </label>
            </div>

            <div style={settingsStyles.settingItem}>
              <div style={settingsStyles.settingInfo}>
                <h4 style={settingsStyles.settingLabel}>Weekly Reports</h4>
                <p style={settingsStyles.settingDescription}>
                  Receive weekly progress reports via email
                </p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={preferences.weeklyReports}
                  onChange={() => handleToggle('weeklyReports')}
                  disabled={saving}
                />
                <span className="settings-toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div style={settingsStyles.section}>
          <div style={settingsStyles.sectionHeader}>
            <HiMoon size={24} />
            <div>
              <h3 style={settingsStyles.sectionTitle}>Preferences</h3>
              <p style={settingsStyles.sectionDescription}>
                Customize your learning experience
              </p>
            </div>
          </div>

          <div style={settingsStyles.settingsList}>
            <div style={settingsStyles.settingItem}>
              <div style={settingsStyles.settingInfo}>
                <h4 style={settingsStyles.settingLabel}>Auto-Save Progress</h4>
                <p style={settingsStyles.settingDescription}>
                  Automatically save your progress as you learn
                </p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={preferences.autoSave}
                  onChange={() => handleToggle('autoSave')}
                  disabled={saving}
                />
                <span className="settings-toggle-slider"></span>
              </label>
            </div>

            <div style={settingsStyles.settingItem}>
              <div style={settingsStyles.settingInfo}>
                <h4 style={settingsStyles.settingLabel}>Show Hints</h4>
                <p style={settingsStyles.settingDescription}>
                  Display hints and tips during practice questions
                </p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={preferences.showHints}
                  onChange={() => handleToggle('showHints')}
                  disabled={saving}
                />
                <span className="settings-toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Study Goals */}
        <GoalsSettings />

        {/* Security */}
        <div style={settingsStyles.section}>
          <div style={settingsStyles.sectionHeader}>
            <HiShieldCheck size={24} />
            <div>
              <h3 style={settingsStyles.sectionTitle}>Security</h3>
              <p style={settingsStyles.sectionDescription}>
                Manage your account security settings
              </p>
            </div>
          </div>

          <div style={settingsStyles.settingsList}>
            <div style={settingsStyles.settingItem}>
              <div style={settingsStyles.settingInfo}>
                <h4 style={settingsStyles.settingLabel}>Password</h4>
                <p style={settingsStyles.settingDescription}>
                  Reset your account password
                </p>
              </div>
              <button
                onClick={handlePasswordReset}
                style={settingsStyles.secondaryButton}
                disabled={saving}
              >
                <HiEnvelope size={18} />
                Send Reset Email
              </button>
            </div>

            <div style={settingsStyles.settingItem}>
              <div style={settingsStyles.settingInfo}>
                <h4 style={settingsStyles.settingLabel}>Sign Out</h4>
                <p style={settingsStyles.settingDescription}>
                  Sign out of your account on this device
                </p>
              </div>
              <button
                onClick={signOut}
                style={settingsStyles.secondaryButton}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
