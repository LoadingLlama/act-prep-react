/**
 * Profile Page
 * User profile management with avatar upload and info editing
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProfileService from '../services/api/profile.service';
import { hasProSubscription, getFeatureAccess } from '../services/subscription.service';
import { redirectToCustomerPortal, getSubscription } from '../services/stripe.service';
import { supabase } from '../supabaseClient';
import { profileStyles } from '../styles/profile.styles';
import { HiUser, HiCamera, HiAcademicCap, HiCalendar, HiPhone, HiEnvelope, HiCheckBadge, HiClock, HiRocketLaunch, HiSparkles, HiDocumentText, HiBookOpen, HiChartBar, HiCog6Tooth } from 'react-icons/hi2';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Cache helper functions
  const getCachedProfile = () => {
    if (!user) return null;
    const cacheKey = `profile_${user.id}`;
    const cached = sessionStorage.getItem(cacheKey);
    const cacheTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);
    const now = Date.now();
    if (cached && cacheTimestamp && (now - parseInt(cacheTimestamp)) < 60000) {
      return JSON.parse(cached);
    }
    return null;
  };

  const getCachedSubscription = () => {
    if (!user) return { isPro: false, hasStripe: false, featureAccess: null, accountCreated: null };
    const cacheKey = `subscription_${user.id}`;
    const cached = sessionStorage.getItem(cacheKey);
    const cacheTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);
    const now = Date.now();
    if (cached && cacheTimestamp && (now - parseInt(cacheTimestamp)) < 300000) {
      return JSON.parse(cached);
    }
    return { isPro: false, hasStripe: false, featureAccess: null, accountCreated: null };
  };

  const cachedProfile = getCachedProfile();
  const cachedSub = getCachedSubscription();

  const [profile, setProfile] = useState(cachedProfile);
  const [loading, setLoading] = useState(!cachedProfile);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isPro, setIsPro] = useState(cachedSub.isPro);
  const [hasStripeSubscription, setHasStripeSubscription] = useState(cachedSub.hasStripe);
  const [trialDaysLeft, setTrialDaysLeft] = useState(14);
  const [accountCreatedAt, setAccountCreatedAt] = useState(cachedSub.accountCreated ? new Date(cachedSub.accountCreated) : null);
  const [featureAccess, setFeatureAccess] = useState(cachedSub.featureAccess);
  const [formData, setFormData] = useState(cachedProfile ? {
    full_name: cachedProfile.full_name || '',
    phone: cachedProfile.phone || '',
    school: cachedProfile.school || '',
    grade: cachedProfile.grade || '',
    current_score: cachedProfile.current_score || '',
    target_score: cachedProfile.target_score || '',
    test_date: cachedProfile.test_date || '',
  } : {
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
      loadSubscriptionStatus();
    }
  }, [user]);

  const loadSubscriptionStatus = async () => {
    if (!user) return;

    try {
      // Check cache first
      const cacheKey = `subscription_${user.id}`;
      const cached = sessionStorage.getItem(cacheKey);
      const cacheTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);
      const now = Date.now();

      if (cached && cacheTimestamp && (now - parseInt(cacheTimestamp)) < 300000) {
        const cachedData = JSON.parse(cached);
        setIsPro(cachedData.isPro);
        setHasStripeSubscription(cachedData.hasStripe);
        setFeatureAccess(cachedData.featureAccess);
        if (cachedData.accountCreated) {
          setAccountCreatedAt(new Date(cachedData.accountCreated));
        }
        console.log('📊 Using cached subscription data');
        return;
      }

      // Check if user is Pro
      const proStatus = await hasProSubscription(user.id);
      setIsPro(proStatus);

      // Check if user has actual Stripe subscription
      const subscription = await getSubscription(user.id);
      setHasStripeSubscription(!!subscription);

      // Get feature access
      const access = await getFeatureAccess(user.id);
      setFeatureAccess(access);

      // Get account creation date and calculate trial days
      const { data: userData } = await supabase.auth.getUser();
      let createdAt = null;
      if (userData?.user?.created_at) {
        createdAt = new Date(userData.user.created_at);
        setAccountCreatedAt(createdAt);

        if (!proStatus && access.trialDaysRemaining !== null) {
          setTrialDaysLeft(access.trialDaysRemaining);
        }
      }

      // Cache the subscription data
      const subscriptionData = {
        isPro: proStatus,
        hasStripe: !!subscription,
        featureAccess: access,
        accountCreated: createdAt ? createdAt.toISOString() : null
      };
      sessionStorage.setItem(cacheKey, JSON.stringify(subscriptionData));
      sessionStorage.setItem(`${cacheKey}_timestamp`, String(now));
    } catch (error) {
      console.error('Error loading subscription status:', error);
    }
  };

  const loadProfile = async () => {
    // Check cache first for instant load
    const cacheKey = `profile_${user.id}`;
    const cached = sessionStorage.getItem(cacheKey);
    const cacheTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);
    const now = Date.now();

    // Use cache if less than 60 seconds old
    if (cached && cacheTimestamp && (now - parseInt(cacheTimestamp)) < 60000) {
      const cachedData = JSON.parse(cached);
      setProfile(cachedData);
      setFormData({
        full_name: cachedData.full_name || '',
        phone: cachedData.phone || '',
        school: cachedData.school || '',
        grade: cachedData.grade || '',
        current_score: cachedData.current_score || '',
        target_score: cachedData.target_score || '',
        test_date: cachedData.test_date || '',
      });
      setLoading(false);
      console.log('📊 Using cached profile data');

      // Still refresh in background
      refreshProfileInBackground(cacheKey);
      return;
    }

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
      // Cache the profile data
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      sessionStorage.setItem(`${cacheKey}_timestamp`, String(now));
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

  const refreshProfileInBackground = async (cacheKey) => {
    try {
      const { data } = await ProfileService.getProfile(user.id);
      if (data) {
        // Update cache
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        sessionStorage.setItem(`${cacheKey}_timestamp`, String(Date.now()));

        // Update state if changed
        const cached = sessionStorage.getItem(cacheKey);
        if (JSON.stringify(data) !== cached) {
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
          console.log('📊 Updated profile from background check');
        }
      }
    } catch (error) {
      console.error('Background profile check error:', error);
    }
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
      console.error('Profile update error:', error);
      setMessage(`Failed to update profile: ${error.message || 'Unknown error'}`);
    } else {
      setMessage('Profile updated successfully!');
      // Clear cache to force refresh
      const cacheKey = `profile_${user.id}`;
      sessionStorage.removeItem(cacheKey);
      sessionStorage.removeItem(`${cacheKey}_timestamp`);
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
    setMessage('Uploading avatar...');
    const { error } = await ProfileService.uploadAvatar(user.id, file);

    if (error) {
      console.error('Avatar upload error:', error);
      setMessage(`Failed to upload avatar: ${error.message || 'Unknown error'}`);
    } else {
      setMessage('Avatar uploaded successfully!');
      // Clear cache to force refresh
      const cacheKey = `profile_${user.id}`;
      sessionStorage.removeItem(cacheKey);
      sessionStorage.removeItem(`${cacheKey}_timestamp`);
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
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.5rem', fontWeight: '600', color: '#111' }}>Profile</h1>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#111' }}>Manage your account</p>
      </div>

      {message && (
        <div style={{
          padding: '0.75rem',
          marginBottom: '1rem',
          background: message.includes('success') ? '#f0fdf4' : '#fef2f2',
          color: message.includes('success') ? '#16a34a' : '#dc2626',
          borderRadius: '4px',
          fontSize: '0.8125rem'
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Avatar Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile"
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <HiUser size={40} color="#ccc" />
              </div>
            )}
            <label style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white'
            }}>
              <HiCamera size={14} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', fontWeight: '600', color: '#111' }}>
              {formData.full_name || 'No name set'}
            </h3>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: '#999' }}>{user?.email}</p>
          </div>
        </div>

        {/* Subscription Status */}
        <div>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#111' }}>
            Subscription
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.25rem 0.625rem',
                background: isPro ? '#f0fdf4' : '#fef3c7',
                color: isPro ? '#16a34a' : '#d97706',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                marginBottom: '0.375rem'
              }}>
                {isPro ? 'Pro' : 'Free Trial'}
              </div>
              {accountCreatedAt && (
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#999' }}>
                  Since {accountCreatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              )}
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
              Manage Subscription
            </button>
          </div>
          {featureAccess && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.75rem' }}>
              <div style={{ padding: '0.5rem', background: '#fafafa', borderRadius: '4px' }}>
                <div style={{ color: '#999', marginBottom: '0.125rem' }}>Lessons</div>
                <div style={{ fontWeight: '500', color: '#111' }}>
                  {isPro ? 'Full Access' : `${featureAccess.lessonsPerSection}/section`}
                </div>
              </div>
              <div style={{ padding: '0.5rem', background: '#fafafa', borderRadius: '4px' }}>
                <div style={{ color: '#999', marginBottom: '0.125rem' }}>Tests</div>
                <div style={{ fontWeight: '500', color: '#111' }}>
                  {isPro ? 'Full Access' : `${featureAccess.practiceTests}`}
                </div>
              </div>
              <div style={{ padding: '0.5rem', background: '#fafafa', borderRadius: '4px' }}>
                <div style={{ color: '#999', marginBottom: '0.125rem' }}>Questions</div>
                <div style={{ fontWeight: '500', color: '#111' }}>
                  {isPro ? 'Full Access' : `${featureAccess.practiceQuestionsPerLesson}/lesson`}
                </div>
              </div>
              <div style={{ padding: '0.5rem', background: '#fafafa', borderRadius: '4px' }}>
                <div style={{ color: '#999', marginBottom: '0.125rem' }}>Insights</div>
                <div style={{ fontWeight: '500', color: '#111' }}>
                  {isPro ? 'Full' : 'Locked'}
                </div>
              </div>
              <div style={{ padding: '0.5rem', background: '#fafafa', borderRadius: '4px' }}>
                <div style={{ color: '#999', marginBottom: '0.125rem' }}>AI Path</div>
                <div style={{ fontWeight: '500', color: '#111' }}>
                  {isPro ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Personal Information */}
        <form onSubmit={handleSubmit}>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#111' }}>
            Personal Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#666', marginBottom: '0.25rem' }}>
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  fontSize: '0.8125rem',
                  background: 'transparent',
                  outline: 'none'
                }}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#666', marginBottom: '0.25rem' }}>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  fontSize: '0.8125rem',
                  background: 'transparent',
                  outline: 'none'
                }}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#666', marginBottom: '0.25rem' }}>
              Email
            </label>
            <input
              type="email"
              value={user?.email}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                fontSize: '0.8125rem',
                background: 'transparent',
                outline: 'none',
                opacity: 0.5,
                cursor: 'not-allowed'
              }}
              disabled
            />
            <small style={{ fontSize: '0.6875rem', color: '#999' }}>Cannot be changed</small>
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '0.625rem 1rem',
              background: saving ? '#ccc' : '#111',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.8125rem',
              fontWeight: '500',
              cursor: saving ? 'not-allowed' : 'pointer'
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
