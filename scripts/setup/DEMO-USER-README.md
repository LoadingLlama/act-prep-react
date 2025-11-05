# Demo User Setup

Testing the onboarding flow without creating new accounts every time.

## Demo Credentials

**Email:** `demo@nomiacademy.com`
**Password:** `Demo123!`

---

## Initial Setup (One-Time)

### Step 1: Check What Tables Exist

1. Go to **Supabase Dashboard** → Your Project → **SQL Editor**
2. Run this script: `scripts/setup/check-database-schema.sql`
3. This shows you what tables and columns exist

### Step 2: Create the Profiles Table (if needed)

1. Go to **SQL Editor** in Supabase
2. Run this script: `scripts/setup/001_create_profiles_table.sql`
3. This creates the `profiles` table with correct schema
4. Verify it worked - you should see the table structure

### Step 3: Create the Demo User in Supabase Auth

1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email:** `demo@nomiacademy.com`
   - **Password:** `Demo123!`
   - ✅ **Auto Confirm User** (check this box)
4. Click **"Create user"**
5. **Copy the User ID** that was created (you'll need it)

### Step 4: Create Profile Entry for Demo User

1. Go to **SQL Editor** in Supabase
2. Run this (replace `USER_ID_HERE` with the actual user ID):

```sql
INSERT INTO profiles (id, email, onboarding_completed, onboarding_data)
VALUES ('USER_ID_HERE', 'demo@nomiacademy.com', false, NULL)
ON CONFLICT (id) DO UPDATE
SET onboarding_completed = false, onboarding_data = NULL;
```

✅ Demo user is now ready!

---

## Testing the Onboarding Flow

### Log in with Demo Account:
- Email: `demo@nomiacademy.com`
- Password: `Demo123!`

### 🎭 Demo Mode Features:
- ✅ **Shows onboarding on first login** (per browser session)
- ✅ **Remembers completion during session** - won't show onboarding again after you complete it
- ✅ **Never saves to database** - all progress is temporary
- ✅ **Resets on new session** - close all tabs or log out to reset
- ✅ **No database cleanup needed** - everything is session-based!

**To test onboarding again:** Close all browser tabs or log out, then log back in!

---

## Manual Reset (Not Usually Needed)

The demo account automatically resets on each login, so you don't need this. But if you ever need to manually clear the demo user's data in the database, run this:

```sql
UPDATE profiles
SET onboarding_completed = false, onboarding_data = NULL, updated_at = NOW()
WHERE email = 'demo@nomiacademy.com';
```

---

## Troubleshooting

**"Invalid login credentials"**
- Make sure you created the user in Supabase Dashboard first
- Make sure "Auto Confirm User" was checked

**Demo user goes straight to home page**
- Run the reset script to clear onboarding_completed flag

**Demo user doesn't exist**
- Go back to Step 1 and create the user in Supabase Dashboard
