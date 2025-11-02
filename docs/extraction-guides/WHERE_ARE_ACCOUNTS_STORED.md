# Where Are User Accounts Stored?

## Quick Answer

**User accounts are stored in Supabase's cloud database, NOT on your local computer.**

When users sign up or log in, their data goes to Supabase's servers in the cloud.

---

## Complete Storage Breakdown

### 1. User Accounts → Supabase Database (Cloud)

```
Location: Supabase PostgreSQL Database
Table: auth.users
Hosted: Supabase Cloud (AWS)
Access: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix/auth/users
```

**What's stored:**
- Email address
- Hashed password (encrypted, can't be read)
- User ID (UUID)
- Sign-up date
- Last sign-in date
- Metadata (name, etc.)

**Security:**
- Passwords are hashed with bcrypt
- Never stored in plain text
- Cannot be reversed or read

### 2. Session Tokens → Browser localStorage

```
Location: User's browser (on their computer)
Storage: localStorage (browser's local storage)
Key Name: sb-rabavobdklnwvwsldbix-auth-token
```

**What's stored:**
- JWT session token
- Expiration time
- User ID reference

**Purpose:**
- Keeps user logged in
- Validates with Supabase on each request
- Removed when user logs out

---

## Visual Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER SIGNS UP                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   Your React App      │
         │   (localhost:3001)    │
         └───────────┬───────────┘
                     │
                     │ HTTPS Request
                     │ (email, password)
                     ▼
         ┌───────────────────────┐
         │   Supabase Auth API   │
         │   (Cloud Service)     │
         └───────────┬───────────┘
                     │
                     │ Creates Account
                     ▼
         ┌───────────────────────┐
         │ PostgreSQL Database   │
         │ Table: auth.users     │
         │ ┌───────────────────┐ │
         │ │ id: abc-123       │ │
         │ │ email: user@ex.com│ │
         │ │ password: ******  │ │ ← Hashed!
         │ │ created: 2024...  │ │
         │ └───────────────────┘ │
         └───────────┬───────────┘
                     │
                     │ Returns Session Token
                     ▼
         ┌───────────────────────┐
         │   Browser Storage     │
         │   (localStorage)      │
         │ ┌───────────────────┐ │
         │ │ sb-...-auth-token │ │
         │ │ value: eyJhbG... │ │ ← JWT Token
         │ └───────────────────┘ │
         └───────────────────────┘
                     │
                     │ User stays logged in!
                     ▼
         ┌───────────────────────┐
         │   User sees main app  │
         └───────────────────────┘
```

---

## How to View Your Users

### Method 1: Supabase Dashboard (Easiest)

1. **Visit:** https://supabase.com/dashboard
2. **Login** to your Supabase account
3. **Select project:** rabavobdklnwvwsldbix
4. **Navigate:** Authentication → Users
5. **View:** All registered users with details

**You'll see:**
- List of all users
- Email addresses
- Sign-up dates
- Last sign-in times
- User IDs
- Authentication providers (Email, Google, etc.)

### Method 2: Browser DevTools (View YOUR Session)

1. **Login** to your app at http://localhost:3001
2. Press **F12** to open DevTools
3. Go to: **Application** → **Storage** → **Local Storage**
4. Look for: **http://localhost:3001**
5. Find key: **sb-rabavobdklnwvwsldbix-auth-token**
6. See your session token

### Method 3: SQL Query (Advanced)

1. Go to Supabase Dashboard → SQL Editor
2. Run this query:

```sql
SELECT
  id,
  email,
  created_at,
  last_sign_in_at,
  raw_user_meta_data->>'full_name' as name
FROM auth.users
ORDER BY created_at DESC;
```

---

## Data Flow Example

### When User Signs Up:

```
1. User fills signup form
   ↓
2. React app sends to Supabase:
   POST https://rabavobdklnwvwsldbix.supabase.co/auth/v1/signup
   Body: { email: "user@example.com", password: "secret123" }
   ↓
3. Supabase:
   - Hashes password
   - Stores in auth.users table
   - Creates session token
   ↓
4. Returns to app:
   { user: {...}, session: {...}, token: "eyJhbG..." }
   ↓
5. App stores token in localStorage
   ↓
6. User is logged in!
```

### When User Logs In:

```
1. User enters email/password
   ↓
2. React app sends to Supabase:
   POST https://rabavobdklnwvwsldbix.supabase.co/auth/v1/token?grant_type=password
   ↓
3. Supabase validates credentials
   ↓
4. Returns session token
   ↓
5. Token stored in browser
   ↓
6. User accesses app
```

### When User Refreshes Page:

```
1. App checks localStorage for token
   ↓
2. Token found → Validate with Supabase
   ↓
3. If valid → User stays logged in
   ↓
4. If expired → Redirect to login
```

---

## Where is Each Piece?

| Data Type | Storage Location | Can View? | Example |
|-----------|-----------------|-----------|---------|
| User Account | Supabase Cloud | ✅ Yes (Dashboard) | email, id, dates |
| Password | Supabase Cloud | ❌ No (Hashed) | $2b$10$... |
| Session Token | Browser localStorage | ✅ Yes (DevTools) | eyJhbGciOiJ... |
| Login State | React App Memory | ❌ No (RAM) | user object |

---

## Security Notes

### What's Secure:
✅ Passwords hashed with bcrypt (industry standard)
✅ Transmitted over HTTPS (encrypted)
✅ Session tokens expire automatically
✅ Tokens stored securely in browser

### What to Remember:
- Passwords CANNOT be read (even by you)
- Users must reset password if forgotten
- Session tokens are temporary
- Logout removes token from browser
- Account data in Supabase is backed up

---

## Testing Storage

### Create a Test Account:

1. Visit http://localhost:3001
2. Click "Sign up"
3. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123456
4. Submit

### View in Supabase:

1. Go to: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix/auth/users
2. You should see your test account!
3. Click on it to see details

### View in Browser:

1. Press F12 in your browser
2. Application → Local Storage → http://localhost:3001
3. Find: sb-rabavobdklnwvwsldbix-auth-token
4. See your session token

---

## Summary

**Where accounts are stored:**
- **Production data:** Supabase Cloud (PostgreSQL database)
- **User sessions:** Browser localStorage (temporary tokens)
- **Passwords:** Encrypted in Supabase (cannot be read)

**How to view:**
- **All users:** Supabase Dashboard
- **Your session:** Browser DevTools
- **Database:** SQL queries in Supabase

**Security:**
- Passwords hashed, never readable
- HTTPS encryption for all requests
- Automatic session expiration
- Industry-standard security practices

---

**Need to see users now?**

👉 Go to: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix/auth/users
