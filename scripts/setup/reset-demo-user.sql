/**
 * Reset Demo User
 * Run this whenever you want to test the onboarding flow again
 * This resets the demo user back to the beginning
 */

-- Reset profile to show onboarding again
UPDATE profiles
SET
    onboarding_completed = false,
    onboarding_data = NULL,
    updated_at = NOW()
WHERE email = 'demo@nomiacademy.com';

-- Verify reset - should show onboarding_completed = false
SELECT
    id,
    email,
    onboarding_completed,
    updated_at
FROM profiles
WHERE email = 'demo@nomiacademy.com';
