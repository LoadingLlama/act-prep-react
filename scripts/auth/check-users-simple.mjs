/**
 * Simple User Check Script
 * Shows where user data is stored and how to access it
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('\n🔐 Authentication Data Storage Locations\n');
console.log('━'.repeat(60));

console.log('\n1️⃣  USER ACCOUNTS (Supabase Cloud Database)');
console.log('   Location: PostgreSQL database in Supabase');
console.log(`   Dashboard: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix/auth/users`);
console.log('   Table: auth.users (managed by Supabase Auth)');

console.log('\n2️⃣  SESSION TOKENS (Browser localStorage)');
console.log('   Location: User\'s browser localStorage');
console.log('   Key pattern: sb-rabavobdklnwvwsldbix-auth-token');
console.log('   Contains: JWT token with user session');

console.log('\n3️⃣  PASSWORD SECURITY');
console.log('   Passwords: Hashed with bcrypt (never stored in plain text)');
console.log('   Hash location: auth.users.encrypted_password');
console.log('   Cannot be reversed: Passwords are secure');

console.log('\n📊 HOW TO VIEW REGISTERED USERS:\n');

console.log('Method 1: Supabase Dashboard (Easiest)');
console.log('  → Visit: https://supabase.com/dashboard');
console.log('  → Select your project: rabavobdklnwvwsldbix');
console.log('  → Click: Authentication → Users');
console.log('  → See all registered users with emails, dates, etc.');

console.log('\nMethod 2: Browser DevTools (View Your Session)');
console.log('  → Open browser and login to your app');
console.log('  → Press F12 to open DevTools');
console.log('  → Go to: Application → Storage → Local Storage');
console.log('  → Find key: sb-rabavobdklnwvwsldbix-auth-token');
console.log('  → View your current session token');

console.log('\nMethod 3: Database Query (Advanced)');
console.log('  → Use Supabase SQL Editor');
console.log('  → Run: SELECT * FROM auth.users;');
console.log('  → Requires service_role key');

console.log('\n📈 DATA FLOW:\n');
console.log('  Sign Up → Supabase creates account in auth.users');
console.log('  Login → Supabase returns session token');
console.log('  Token → Stored in browser localStorage');
console.log('  Refresh → Token validated with Supabase');
console.log('  Logout → Token removed from localStorage');

console.log('\n━'.repeat(60));

// Try to connect and show current status
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('\n✅ Supabase Connection Status:');
console.log(`   URL: ${supabaseUrl}`);
console.log(`   Key: ${supabaseKey ? '✓ Configured' : '✗ Missing'}`);

console.log('\n💡 TIP: Create a test account to see it in the dashboard!');
console.log('   1. Visit http://localhost:3001');
console.log('   2. Click "Sign up"');
console.log('   3. Create account with any email/password');
console.log('   4. Check Supabase dashboard to see it\n');
