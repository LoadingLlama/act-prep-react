/**
 * Create Demo User Profile (AUTOMATIC VERSION)
 * Email: demo@nomiacademy.com
 * Password: Demo123!
 *
 * PREREQUISITE: Create the user in Supabase Dashboard first!
 * 1. Go to Authentication > Users
 * 2. Click "Add user" > "Create new user"
 * 3. Email: demo@nomiacademy.com
 * 4. Password: Demo123!
 * 5. Auto Confirm User: YES
 * 6. Click "Create user"
 *
 * Then run this script - it will automatically find the user ID
 */

-- Create or update the demo user's profile (automatically finds user ID)
INSERT INTO profiles (id, email, onboarding_completed, onboarding_data, created_at, updated_at)
SELECT
    id,
    'demo@nomiacademy.com',
    false,
    NULL,
    NOW(),
    NOW()
FROM auth.users
WHERE email = 'demo@nomiacademy.com'
ON CONFLICT (id) DO UPDATE
SET
    onboarding_completed = false,
    onboarding_data = NULL,
    updated_at = NOW();

-- Verify the demo user profile was created
SELECT id, email, onboarding_completed, created_at FROM profiles WHERE email = 'demo@nomiacademy.com';
