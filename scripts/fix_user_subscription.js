/**
 * Fix user subscription status
 * Updates cadenchiangjunk@gmail.com to Pro plan
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixUserSubscription() {
  try {
    const userEmail = 'cadenchiangjunk@gmail.com';

    console.log('🔍 Finding user:', userEmail);

    // Get user ID from auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.error('❌ Error fetching users:', authError);
      return;
    }

    const user = authData.users.find(u => u.email === userEmail);

    if (!user) {
      console.error('❌ User not found:', userEmail);
      return;
    }

    console.log('✅ Found user:', user.id);

    // Check current subscription
    const { data: currentSub, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    console.log('📊 Current subscription:', currentSub);

    // Update or create subscription
    const subscriptionData = {
      user_id: user.id,
      plan_type: 'pro',
      status: 'active',
      trial_ends_at: null,
      subscription_ends_at: null, // Lifetime pro
      updated_at: new Date().toISOString()
    };

    if (currentSub) {
      // Update existing subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .update(subscriptionData)
        .eq('user_id', user.id)
        .select();

      if (error) {
        console.error('❌ Error updating subscription:', error);
        return;
      }

      console.log('✅ Updated subscription to Pro:', data);
    } else {
      // Create new subscription
      subscriptionData.created_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('subscriptions')
        .insert([subscriptionData])
        .select();

      if (error) {
        console.error('❌ Error creating subscription:', error);
        return;
      }

      console.log('✅ Created Pro subscription:', data);
    }

    // Verify the update
    const { data: verifyData, error: verifyError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    console.log('🎉 Final subscription status:', verifyData);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

fixUserSubscription();
