/**
 * View All Registered Users
 * Shows all users from Supabase authentication
 */

import { supabase } from '../../src/services/api/supabase.service.js';

async function viewUsers() {
  console.log('📊 Fetching all registered users...\n');

  try {
    // Note: This requires the service role key to view all users
    // For security, we'll query the public user data instead

    // Check if we have any profiles table
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*');

    if (profileError) {
      console.log('ℹ️  No profiles table exists yet.');
      console.log('   Users are stored in Supabase Auth, but no public profile data.');
      console.log('\n📍 To view users:');
      console.log('   1. Go to: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix');
      console.log('   2. Click "Authentication" → "Users"');
      console.log('   3. You\'ll see all registered users there\n');
    } else if (profiles && profiles.length > 0) {
      console.log(`✅ Found ${profiles.length} user profile(s):\n`);
      profiles.forEach((profile, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`  - ID: ${profile.id}`);
        console.log(`  - Name: ${profile.full_name || 'N/A'}`);
        console.log(`  - Email: ${profile.email || 'N/A'}`);
        console.log(`  - Created: ${new Date(profile.created_at).toLocaleString()}`);
        console.log('');
      });
    } else {
      console.log('ℹ️  No users registered yet.');
    }

    // Show where session data is stored
    console.log('💾 Session Storage Location:');
    console.log('   - User accounts: Supabase database (cloud)');
    console.log('   - Session tokens: Browser localStorage');
    console.log('   - Key name: supabase.auth.token');
    console.log('\n🔍 To view session in browser:');
    console.log('   1. Open browser DevTools (F12)');
    console.log('   2. Go to Application → Local Storage');
    console.log('   3. Look for key starting with "sb-"');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the function
viewUsers();
