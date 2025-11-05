/**
 * Create Demo User Profile
 * Email: demo@nomiacademy.com
 * Password: Demo123!
 *
 * PREREQUISITE: You must create the user in Supabase Dashboard first!
 * 1. Go to Authentication > Users
 * 2. Click "Add user" > "Create new user"
 * 3. Email: demo@nomiacademy.com
 * 4. Password: Demo123!
 * 5. Auto Confirm User: YES
 * 6. Click "Create user"
 * 7. Copy the User ID
 *
 * Then replace USER_ID_HERE below with the actual UUID
 */

-- Create or update the demo user's profile
-- REPLACE 'USER_ID_HERE' with the actual user ID from auth.users
INSERT INTO profiles (id, email, onboarding_completed, onboarding_data, created_at, updated_at)
VALUES (
    'USER_ID_HERE',  -- ← REPLACE THIS with actual user ID
    'demo@nomiacademy.com',
    false,
    NULL,
    NOW(),
    NOW()
)
ON CONFLICT (id) DO UPDATE
SET
    onboarding_completed = false,
    onboarding_data = NULL,
    updated_at = NOW();

-- Verify the demo user profile was created
SELECT id, email, onboarding_completed FROM profiles WHERE email = 'demo@nomiacademy.com';

-- Alternative: If you want to automatically find the user ID, use this instead:
-- INSERT INTO profiles (id, email, onboarding_completed, onboarding_data, created_at, updated_at)
-- SELECT
--     id,
--     'demo@nomiacademy.com',
--     false,
--     NULL,
--     NOW(),
--     NOW()
-- FROM auth.users
-- WHERE email = 'demo@nomiacademy.com'
-- ON CONFLICT (id) DO UPDATE
-- SET
--     onboarding_completed = false,
--     onboarding_data = NULL,
--     updated_at = NOW();
