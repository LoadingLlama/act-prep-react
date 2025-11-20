/**
 * Stripe Service
 * Handles Stripe checkout and customer portal integration
 */

import { supabase } from './api/supabase.service';

// Lazy-load Stripe only when needed
let stripePromise = null;

const getStripe = async () => {
  if (stripePromise) return stripePromise;

  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.error('❌ REACT_APP_STRIPE_PUBLISHABLE_KEY is not set in environment variables');
    return null;
  }

  console.log('✅ Loading Stripe with key:', publishableKey.substring(0, 20) + '...');

  // Dynamic import to prevent loading Stripe.js until actually needed
  const { loadStripe } = await import('@stripe/stripe-js');
  stripePromise = loadStripe(publishableKey);
  return stripePromise;
};

/**
 * Create a Stripe checkout session for Pro subscription
 *
 * @param {string} userId - User ID
 * @param {string} userEmail - User email
 * @returns {Promise<void>}
 */
export async function createCheckoutSession(userId, userEmail) {
  try {
    console.log('🚀 Starting checkout session creation...');
    console.log('📝 User ID:', userId);
    console.log('📧 User Email:', userEmail);
    console.log('💰 Price ID:', process.env.REACT_APP_STRIPE_PRICE_ID);

    console.log('🔄 Calling Supabase Edge Function: create-checkout-session');

    // Call your backend/edge function to create checkout session
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        userId,
        userEmail,
        priceId: process.env.REACT_APP_STRIPE_PRICE_ID, // Pro plan price ID
      }
    });

    console.log('📦 Edge Function Response:', { data, error });

    if (error) {
      console.error('❌ Error creating checkout session:', error);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));

      // Try to get the actual error message from the data
      if (data && data.error) {
        console.error('❌ Server error message:', data.error);
        throw new Error(data.error);
      }

      throw new Error(error.message || 'Failed to create checkout session');
    }

    if (!data || !data.url) {
      console.error('❌ No checkout URL in response:', data);
      console.error('❌ Full response data:', JSON.stringify(data, null, 2));

      // Check if there's an error message in the data
      if (data && data.error) {
        throw new Error(data.error);
      }

      throw new Error('Invalid response from server - no checkout URL');
    }

    console.log('✅ Got checkout URL:', data.url);
    console.log('🔄 Redirecting to Stripe Checkout...');

    // Redirect to Stripe Checkout using the URL from the session
    window.location.href = data.url;
  } catch (error) {
    console.error('💥 Error in createCheckoutSession:', error);
    throw error;
  }
}

/**
 * Redirect to Stripe Customer Portal for subscription management
 *
 * @param {string} userId - User ID
 * @returns {Promise<void>}
 */
export async function redirectToCustomerPortal(userId) {
  try {
    // Call your backend/edge function to create portal session
    const { data, error } = await supabase.functions.invoke('create-portal-session', {
      body: {
        userId
      }
    });

    if (error) {
      console.error('Error creating portal session:', error);
      throw error;
    }

    // Redirect to Stripe Customer Portal
    if (data?.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.error('Error in redirectToCustomerPortal:', error);
    throw error;
  }
}

/**
 * Get subscription status from database
 *
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} Subscription data
 */
export async function getSubscription(userId) {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      console.error('Error fetching subscription:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getSubscription:', error);
    return null;
  }
}

export default {
  createCheckoutSession,
  redirectToCustomerPortal,
  getSubscription
};
