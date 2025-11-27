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
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.5rem', fontWeight: '600', color: '#111' }}>Settings</h1>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#111' }}>Manage your preferences</p>
      </div>

      {message && (
        <div style={{
          padding: '0.75rem',
          marginBottom: '1rem',
          background: (message.includes('saved') || message.includes('sent')) ? '#f0fdf4' : '#fef2f2',
          color: (message.includes('saved') || message.includes('sent')) ? '#16a34a' : '#dc2626',
          borderRadius: '4px',
          fontSize: '0.8125rem'
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Subscription */}
        {isPro && subscription && (
          <div>
            <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#111' }}>
              Subscription
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem' }}>
                  Pro Member
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#999' }}>
                  {subscription.subscription_status === 'active' && subscription.current_period_end
                    ? `Renews ${new Date(subscription.current_period_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                    : 'Active'}
                </p>
              </div>
              <button
                onClick={async () => {
                  try {
                    await redirectToCustomerPortal(user.id);
                  } catch (error) {
                    setMessage('Failed to open portal');
                  }
                }}
                style={{
                  padding: '0.5rem 0.875rem',
                  background: '#111',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Manage Billing
              </button>
            </div>
          </div>
        )}

        {/* Notifications */}
        <div>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#111' }}>
            Notifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ fontSize: '0.8125rem', color: '#111' }}>Email Notifications</span>
              <input
                type="checkbox"
                checked={preferences.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
                disabled={saving}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ fontSize: '0.8125rem', color: '#111' }}>Practice Reminders</span>
              <input
                type="checkbox"
                checked={preferences.practiceReminders}
                onChange={() => handleToggle('practiceReminders')}
                disabled={saving}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ fontSize: '0.8125rem', color: '#111' }}>Weekly Reports</span>
              <input
                type="checkbox"
                checked={preferences.weeklyReports}
                onChange={() => handleToggle('weeklyReports')}
                disabled={saving}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
            </label>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#111' }}>
            Preferences
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ fontSize: '0.8125rem', color: '#111' }}>Auto-Save Progress</span>
              <input
                type="checkbox"
                checked={preferences.autoSave}
                onChange={() => handleToggle('autoSave')}
                disabled={saving}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ fontSize: '0.8125rem', color: '#111' }}>Show Hints</span>
              <input
                type="checkbox"
                checked={preferences.showHints}
                onChange={() => handleToggle('showHints')}
                disabled={saving}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
            </label>
          </div>
        </div>

        {/* Study Goals */}
        <GoalsSettings />

        {/* Security */}
        <div>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#111' }}>
            Security
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8125rem', color: '#111' }}>Password</span>
              <button
                onClick={handlePasswordReset}
                disabled={saving}
                style={{
                  padding: '0.5rem 0.875rem',
                  background: 'white',
                  color: '#111',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  cursor: saving ? 'not-allowed' : 'pointer'
                }}
              >
                Reset
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8125rem', color: '#111' }}>Sign Out</span>
              <button
                onClick={signOut}
                style={{
                  padding: '0.5rem 0.875rem',
                  background: 'white',
                  color: '#dc2626',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
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
