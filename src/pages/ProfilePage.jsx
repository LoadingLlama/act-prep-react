/**
 * Profile Page
 * User profile management with avatar upload and info editing
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileService from '../services/api/profile.service';
import { profileStyles } from '../styles/profile.styles';
import { HiUser, HiCamera, HiAcademicCap, HiCalendar, HiPhone, HiEnvelope } from 'react-icons/hi2';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    school: '',
    grade: '',
    current_score: '',
    target_score: '',
    test_date: '',
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    setLoading(true);
    const { data, error } = await ProfileService.getProfile(user.id);

    if (data) {
      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        phone: data.phone || '',
        school: data.school || '',
        grade: data.grade || '',
        current_score: data.current_score || '',
        target_score: data.target_score || '',
        test_date: data.test_date || '',
      });
    } else if (error && error.code === 'PGRST116') {
      // Profile doesn't exist, create it
      await ProfileService.createProfile(user.id, {
        email: user.email,
        full_name: user.user_metadata?.full_name || '',
      });
      await loadProfile();
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const updates = {
      ...formData,
      current_score: formData.current_score ? parseInt(formData.current_score) : null,
      target_score: formData.target_score ? parseInt(formData.target_score) : null,
    };

    const { error } = await ProfileService.updateProfile(user.id, updates);

    if (error) {
      setMessage('Failed to update profile');
    } else {
      setMessage('Profile updated successfully!');
      await loadProfile();
    }

    setSaving(false);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage('File size must be less than 2MB');
      return;
    }

    setSaving(true);
    const { error } = await ProfileService.uploadAvatar(user.id, file);

    if (error) {
      setMessage('Failed to upload avatar');
    } else {
      setMessage('Avatar uploaded successfully!');
      await loadProfile();
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div style={profileStyles.container}>
        <div style={profileStyles.loading}>Loading profile...</div>
      </div>
    );
  }

  return (
    <div style={profileStyles.container}>
      <div style={profileStyles.header}>
        <h1 style={profileStyles.title}>My Profile</h1>
        <p style={profileStyles.subtitle}>Manage your personal information and ACT prep goals</p>
      </div>

      {message && (
        <div
          style={{
            ...profileStyles.message,
            ...(message.includes('success') ? profileStyles.successMessage : profileStyles.errorMessage),
          }}
        >
          {message}
        </div>
      )}

      <div style={profileStyles.content}>
        {/* Avatar Section */}
        <div style={profileStyles.avatarSection}>
          <div style={profileStyles.avatarContainer}>
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile"
                style={profileStyles.avatar}
              />
            ) : (
              <div style={profileStyles.avatarPlaceholder}>
                <HiUser size={48} color="#94a3b8" />
              </div>
            )}
            <label style={profileStyles.avatarUpload}>
              <HiCamera size={18} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={profileStyles.avatarInput}
              />
            </label>
          </div>
          <div style={profileStyles.avatarInfo}>
            <h3 style={profileStyles.userName}>{formData.full_name || 'No name set'}</h3>
            <p style={profileStyles.userEmail}>{user?.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} style={profileStyles.form}>
          <div style={profileStyles.formSection}>
            <h3 style={profileStyles.sectionTitle}>
              <HiUser size={20} />
              Personal Information
            </h3>

            <div style={profileStyles.formRow}>
              <div style={profileStyles.formGroup}>
                <label style={profileStyles.label}>Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  style={profileStyles.input}
                  placeholder="Enter your full name"
                />
              </div>

              <div style={profileStyles.formGroup}>
                <label style={profileStyles.label}>
                  <HiPhone size={16} style={{ marginBottom: -2 }} /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={profileStyles.input}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div style={profileStyles.formGroup}>
              <label style={profileStyles.label}>
                <HiEnvelope size={16} style={{ marginBottom: -2 }} /> Email Address
              </label>
              <input
                type="email"
                value={user?.email}
                style={{ ...profileStyles.input, ...profileStyles.inputDisabled }}
                disabled
              />
              <small style={profileStyles.helpText}>Email cannot be changed</small>
            </div>
          </div>

          <div style={profileStyles.formSection}>
            <h3 style={profileStyles.sectionTitle}>
              <HiAcademicCap size={20} />
              Academic Information
            </h3>

            <div style={profileStyles.formRow}>
              <div style={profileStyles.formGroup}>
                <label style={profileStyles.label}>School</label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  style={profileStyles.input}
                  placeholder="High School Name"
                />
              </div>

              <div style={profileStyles.formGroup}>
                <label style={profileStyles.label}>Grade</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  style={profileStyles.select}
                >
                  <option value="">Select Grade</option>
                  <option value="9">9th Grade</option>
                  <option value="10">10th Grade</option>
                  <option value="11">11th Grade</option>
                  <option value="12">12th Grade</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div style={profileStyles.formSection}>
            <h3 style={profileStyles.sectionTitle}>
              <HiCalendar size={20} />
              ACT Prep Goals
            </h3>

            <div style={profileStyles.formRow}>
              <div style={profileStyles.formGroup}>
                <label style={profileStyles.label}>Current Score</label>
                <input
                  type="number"
                  name="current_score"
                  value={formData.current_score}
                  onChange={handleChange}
                  style={profileStyles.input}
                  placeholder="1-36"
                  min="1"
                  max="36"
                />
              </div>

              <div style={profileStyles.formGroup}>
                <label style={profileStyles.label}>Target Score</label>
                <input
                  type="number"
                  name="target_score"
                  value={formData.target_score}
                  onChange={handleChange}
                  style={profileStyles.input}
                  placeholder="1-36"
                  min="1"
                  max="36"
                />
              </div>

              <div style={profileStyles.formGroup}>
                <label style={profileStyles.label}>Test Date</label>
                <input
                  type="date"
                  name="test_date"
                  value={formData.test_date}
                  onChange={handleChange}
                  style={profileStyles.input}
                />
              </div>
            </div>
          </div>

          <div style={profileStyles.formActions}>
            <button
              type="submit"
              style={profileStyles.submitButton}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
