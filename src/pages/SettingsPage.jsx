/**
 * Settings Page
 * User preferences and account settings
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileService from '../services/api/profile.service';
import { settingsStyles } from '../styles/settings.styles';
import { HiBell, HiMoon, HiEnvelope, HiShieldCheck, HiTrash } from 'react-icons/hi2';
import GoalsSettings from '../components/GoalsSettings';

const SettingsPage = () => {
  const { user, signOut, resetPassword } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
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
  }, [user]);

  const loadPreferences = async () => {
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
    }

    setLoading(false);
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

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // TODO: Implement account deletion
      alert('Account deletion coming soon');
    }
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
              <label style={settingsStyles.toggle}>
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                  disabled={saving}
                />
                <span style={settingsStyles.toggleSlider}></span>
              </label>
            </div>

            <div style={settingsStyles.settingItem}>
              <div style={settingsStyles.settingInfo}>
                <h4 style={settingsStyles.settingLabel}>Practice Reminders</h4>
                <p style={settingsStyles.settingDescription}>
                  Get reminders to complete your daily practice
                </p>
              </div>
              <label style={settingsStyles.toggle}>
                <input
                  type="checkbox"
                  checked={preferences.practiceReminders}
                  onChange={() => handleToggle('practiceReminders')}
                  disabled={saving}
                />
                <span style={settingsStyles.toggleSlider}></span>
              </label>
            </div>

            <div style={settingsStyles.settingItem}>
              <div style={settingsStyles.settingInfo}>
                <h4 style={settingsStyles.settingLabel}>Weekly Reports</h4>
                <p style={settingsStyles.settingDescription}>
                  Receive weekly progress reports via email
                </p>
              </div>
              <label style={settingsStyles.toggle}>
                <input
                  type="checkbox"
                  checked={preferences.weeklyReports}
                  onChange={() => handleToggle('weeklyReports')}
                  disabled={saving}
                />
                <span style={settingsStyles.toggleSlider}></span>
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
              <label style={settingsStyles.toggle}>
                <input
                  type="checkbox"
                  checked={preferences.autoSave}
                  onChange={() => handleToggle('autoSave')}
                  disabled={saving}
                />
                <span style={settingsStyles.toggleSlider}></span>
              </label>
            </div>

            <div style={settingsStyles.settingItem}>
              <div style={settingsStyles.settingInfo}>
                <h4 style={settingsStyles.settingLabel}>Show Hints</h4>
                <p style={settingsStyles.settingDescription}>
                  Display hints and tips during practice questions
                </p>
              </div>
              <label style={settingsStyles.toggle}>
                <input
                  type="checkbox"
                  checked={preferences.showHints}
                  onChange={() => handleToggle('showHints')}
                  disabled={saving}
                />
                <span style={settingsStyles.toggleSlider}></span>
              </label>
            </div>
          </div>
        </div>

        {/* Study Goals */}
        <div style={{ marginBottom: '2rem' }}>
          <GoalsSettings />
        </div>

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

        {/* Danger Zone */}
        <div style={{ ...settingsStyles.section, ...settingsStyles.dangerSection }}>
          <div style={settingsStyles.sectionHeader}>
            <HiTrash size={24} color="#dc2626" />
            <div>
              <h3 style={{ ...settingsStyles.sectionTitle, color: '#dc2626' }}>Danger Zone</h3>
              <p style={settingsStyles.sectionDescription}>
                Irreversible actions
              </p>
            </div>
          </div>

          <div style={settingsStyles.settingsList}>
            <div style={settingsStyles.settingItem}>
              <div style={settingsStyles.settingInfo}>
                <h4 style={settingsStyles.settingLabel}>Delete Account</h4>
                <p style={settingsStyles.settingDescription}>
                  Permanently delete your account and all data
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                style={settingsStyles.dangerButton}
              >
                <HiTrash size={18} />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
