/**
 * Simple subscription fixer - uses the existing supabase client
 */

// Import using the same path as the app
const path = require('path');
const modulePath = path.resolve(__dirname, '../src/supabaseClient.js');

// Dynamically import the supabase client
async function fixSubscription() {
  try {
    // We'll use fetch to call the database directly since imports might not work
    const supabaseUrl = 'https://bqrcrdixcmklfgzsrwxn.supabase.co';
    const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcmNyZGl4Y21rbGZnenNyd3huIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTgxMTAwOCwiZXhwIjoyMDQ3Mzg3MDA4fQ.Qb59r0YZt3aQEHZc38lMBLONtBAD66nrFRcS9e63Y5I';

    console.log('🔍 Finding user: cadenchiangjunk@gmail.com');

    // First, get all users to find the user ID
    const usersResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`
      }
    });

    const usersData = await usersResponse.json();
    const user = usersData.users?.find(u => u.email === 'cadenchiangjunk@gmail.com');

    if (!user) {
      console.error('❌ User not found');
      console.log('Available users:', usersData.users?.map(u => u.email));
      return;
    }

    console.log('✅ Found user:', user.id, user.email);

    // Check current subscription
    const checkResponse = await fetch(
      `${supabaseUrl}/rest/v1/subscriptions?user_id=eq.${user.id}`,
      {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      }
    );

    const currentSub = await checkResponse.json();
    console.log('📊 Current subscription:', currentSub);

    const subscriptionData = {
      user_id: user.id,
      plan_type: 'pro',
      status: 'active',
      trial_ends_at: null,
      subscription_ends_at: null,
      updated_at: new Date().toISOString()
    };

    let response;

    if (currentSub && currentSub.length > 0) {
      // Update existing subscription
      response = await fetch(
        `${supabaseUrl}/rest/v1/subscriptions?user_id=eq.${user.id}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': serviceKey,
            'Authorization': `Bearer ${serviceKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(subscriptionData)
        }
      );
    } else {
      // Create new subscription
      subscriptionData.created_at = new Date().toISOString();
      response = await fetch(
        `${supabaseUrl}/rest/v1/subscriptions`,
        {
          method: 'POST',
          headers: {
            'apikey': serviceKey,
            'Authorization': `Bearer ${serviceKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(subscriptionData)
        }
      );
    }

    const result = await response.json();
    console.log('✅ Updated subscription:', result);

    // Verify
    const verifyResponse = await fetch(
      `${supabaseUrl}/rest/v1/subscriptions?user_id=eq.${user.id}`,
      {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const finalSub = await verifyResponse.json();
    console.log('🎉 Final subscription:', finalSub);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixSubscription();
