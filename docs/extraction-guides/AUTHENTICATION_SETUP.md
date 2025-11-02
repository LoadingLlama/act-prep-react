# Authentication Setup Guide

## Overview

Your ACT Prep application now has a complete authentication system with:
- Email/Password login and signup
- Google OAuth login
- Protected routes
- Session management
- Logout functionality

## What Was Implemented

### 1. Authentication Context (`src/contexts/AuthContext.jsx`)
- Global authentication state management
- User session tracking
- Authentication methods (signUp, signIn, signOut, etc.)

### 2. Login & Signup Components
- **Login** (`src/components/auth/Login.jsx`): Email/password + Google OAuth
- **Signup** (`src/components/auth/Signup.jsx`): Email/password registration
- **AuthPage** (`src/pages/AuthPage.jsx`): Container with login/signup switching

### 3. Protected Routes
- **ProtectedRoute** (`src/components/auth/ProtectedRoute.jsx`): Guards routes requiring authentication
- Main app is now protected - users must login to access

### 4. Integration
- App.js updated to check authentication
- Sidebar updated with Logout button
- AuthProvider wraps entire app in index.js

## Current Status

✅ **Working:**
- Email/password signup and login
- Session persistence across page refreshes
- Protected routes
- Logout functionality

⚠️ **Needs Configuration:**
- Google OAuth (requires Supabase setup)

## Configure Google OAuth

To enable Google login, follow these steps:

### Step 1: Enable Google Auth in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `rabavobdklnwvwsldbix`
3. Navigate to **Authentication** → **Providers**
4. Find **Google** and click to enable it

### Step 2: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen if prompted
6. For Application type, select **Web application**
7. Add authorized redirect URI:
   ```
   https://rabavobdklnwvwsldbix.supabase.co/auth/v1/callback
   ```
8. Copy the **Client ID** and **Client Secret**

### Step 3: Configure in Supabase

1. Return to Supabase Dashboard → Authentication → Providers → Google
2. Paste your **Client ID** and **Client Secret**
3. Click **Save**

### Step 4: Test Google Login

1. Start your app: `npm start`
2. Visit http://localhost:3001
3. Click "Continue with Google"
4. You should be redirected to Google's login page
5. After authentication, you'll be redirected back to your app

## How It Works

### Authentication Flow

1. **User visits app** → AuthContext checks for existing session
2. **No session** → Shows Login/Signup page
3. **User logs in** → Supabase creates session
4. **Session valid** → Shows main app (protected content)
5. **User clicks Logout** → Session destroyed, returns to login

### Code Structure

```
src/
├── contexts/
│   └── AuthContext.jsx          # Global auth state & methods
├── components/
│   └── auth/
│       ├── Login.jsx             # Login form
│       ├── Signup.jsx            # Signup form
│       └── ProtectedRoute.jsx    # Route guard
├── pages/
│   └── AuthPage.jsx              # Auth page container
├── styles/
│   └── auth/
│       └── login.styles.js       # Auth component styles
└── App.js                        # Protected main app
```

## Testing

### Test Email/Password Auth

1. Visit http://localhost:3001
2. Click "Sign up"
3. Fill in the form with:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Submit the form
5. Check email for verification link (if enabled)
6. Login with same credentials
7. You should see the main app dashboard

### Test Logout

1. After logging in, look at the sidebar
2. Click the "Logout" button at the bottom
3. You should be redirected to the login page
4. Session is cleared from localStorage

### Test Session Persistence

1. Login to your account
2. Refresh the page (F5)
3. You should remain logged in
4. Close browser and reopen - session should persist

## Database Setup (Optional)

To store user profile data, you can create a profiles table:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Troubleshooting

### Google OAuth Not Working

- Check that redirect URI matches exactly in Google Console
- Ensure Google provider is enabled in Supabase
- Verify Client ID and Secret are correct
- Check browser console for errors

### Session Not Persisting

- Check browser localStorage (should see `supabase.auth.token`)
- Verify Supabase URL and keys in `.env`
- Check that AuthProvider wraps entire app

### Login Shows Errors

- Check Supabase dashboard → Authentication → Users
- Verify email confirmation is not required (or check email)
- Check browser console for detailed error messages

## Security Notes

- Passwords are hashed by Supabase (never stored in plain text)
- Session tokens are stored securely in localStorage
- All auth requests go through Supabase's secure API
- Row Level Security (RLS) should be enabled on all tables

## Next Steps

1. **Configure Google OAuth** (follow steps above)
2. **Add password reset functionality** (already implemented in AuthContext)
3. **Create user profile pages** (optional)
4. **Add email verification** (configure in Supabase)
5. **Customize login/signup UI** (edit styles in `login.styles.js`)

## Support

If you need help:
- Check Supabase docs: https://supabase.com/docs/guides/auth
- Review code comments in `AuthContext.jsx`
- Test authentication flows in development

---

**Status:** ✅ Authentication system fully implemented and ready to use!

**App URL:** http://localhost:3001 (currently running)
