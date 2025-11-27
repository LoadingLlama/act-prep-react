# 🔧 Stripe Payment Integration Setup Guide

## ❌ Current Issue
Your Stripe payment isn't working because the **Supabase Edge Functions** aren't deployed yet. These functions handle the checkout process server-side.

---

## ✅ Quick Fix (15 minutes)

### Step 1: Login to Supabase CLI

```bash
# Login to Supabase
supabase login
```

This will open a browser window - authorize the CLI.

---

### Step 2: Link Your Project

```bash
# Navigate to your project
cd /Users/cadenchiang/Desktop/act-prep-react

# Link to your Supabase project
supabase link --project-ref rabavobdklnwvwsldbix
```

When prompted, use your Supabase database password: `Minecraft12!`

---

### Step 3: Set Environment Variables in Supabase

You need to add your Stripe secret keys to Supabase:

```bash
# Set Stripe Secret Key (TEST MODE)
supabase secrets set STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY

# Set Stripe Webhook Secret (get this from Stripe Dashboard after webhook setup)
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Set Supabase credentials for webhook function
supabase secrets set SUPABASE_URL=https://rabavobdklnwvwsldbix.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4
```

#### 🔑 How to Get Your Stripe Secret Key:

1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy your **Secret key** (starts with `sk_test_...`)
3. Replace `sk_test_YOUR_STRIPE_SECRET_KEY` above with your actual key

---

### Step 4: Deploy Edge Functions

```bash
# Deploy all three Stripe functions
supabase functions deploy create-checkout-session
supabase functions deploy create-portal-session
supabase functions deploy stripe-webhook
```

You should see success messages for each function.

---

### Step 5: Set Up Stripe Webhook

After deploying, you need to configure Stripe to send webhooks to your Supabase function:

1. **Go to**: https://dashboard.stripe.com/test/webhooks
2. **Click**: "+ Add endpoint"
3. **Endpoint URL**: `https://rabavobdklnwvwsldbix.supabase.co/functions/v1/stripe-webhook`
4. **Events to send**: Select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. **Click**: "Add endpoint"
6. **Copy the webhook signing secret** (starts with `whsec_...`)
7. Run this command with your webhook secret:
   ```bash
   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_ACTUAL_WEBHOOK_SECRET
   ```

---

### Step 6: Test the Integration

1. **In your browser**, go to: http://localhost:3000/app/upgrade
2. **Click**: "Start Pro Now"
3. **You should see**:
   - Console logs showing "Calling Supabase Edge Function"
   - Redirect to Stripe Checkout page
4. **Use test card**: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
5. **Complete payment**
6. **Check** that you're redirected back and subscription is active

---

## 🧪 Verify Deployment

Check if your functions are live:

```bash
# List deployed functions
supabase functions list

# Check function logs
supabase functions serve create-checkout-session --debug
```

---

## 🔍 Troubleshooting

### Error: "Failed to create checkout session"

**Check logs:**
```bash
supabase functions logs create-checkout-session --limit 50
```

**Common causes:**
- ❌ Missing `STRIPE_SECRET_KEY` environment variable
- ❌ Invalid Stripe API key
- ❌ Wrong price ID in `.env` file

### Error: "Subscription not created after payment"

**Check webhook logs:**
```bash
supabase functions logs stripe-webhook --limit 50
```

**Common causes:**
- ❌ Webhook not configured in Stripe Dashboard
- ❌ Wrong webhook URL
- ❌ Missing `STRIPE_WEBHOOK_SECRET`

### Test Webhook Locally (Development)

If you want to test webhooks locally:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local function
stripe listen --forward-to https://rabavobdklnwvwsldbix.supabase.co/functions/v1/stripe-webhook
```

---

## 🚀 Production Deployment (When Ready)

### Switch to Live Mode:

1. **In `.env` file**, comment out TEST keys and uncomment LIVE keys:

```bash
# TEST MODE (use test cards like 4242 4242 4242 4242)
# REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51SUg2DDXXp0JfzzobWCn3H8ciKBLN93resMcMNtPKoOxLqQeUTUKFIAQFasopBZ2fPSVZ2dc404yhBKGSB6otVqO00z4tn7eSD
# REACT_APP_STRIPE_PRICE_ID=price_1SUhQ5DXXp0JfzzoesoJ8Ea9

# LIVE MODE (real credit cards will be charged!)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_51SUg2DDXXp0JfzzoAzHQixXCSErv6VmYSusFEn2yZAZC1XCJGGg3D9e2YavZXd1ZkNuSatSL5t0nB87XibatI8rl00ZDQBp86K
REACT_APP_STRIPE_PRICE_ID=price_1SUgGBDXXp0JfzzoILq46Qjh
```

2. **Update Supabase secrets** with LIVE keys:

```bash
# Get your LIVE secret key from: https://dashboard.stripe.com/apikeys
supabase secrets set STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY
```

3. **Set up LIVE webhook**:
   - Go to: https://dashboard.stripe.com/webhooks
   - Add the same endpoint URL
   - Copy the LIVE webhook secret
   - Update: `supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_LIVE_SECRET`

4. **Redeploy** (if needed):
```bash
npm run build
# Deploy to Vercel or your hosting platform
```

---

## 📊 Monitor Payments

### Stripe Dashboard
- **Payments**: https://dashboard.stripe.com/test/payments
- **Subscriptions**: https://dashboard.stripe.com/test/subscriptions
- **Webhooks**: https://dashboard.stripe.com/test/webhooks

### Supabase Database
Check subscriptions table:
```sql
SELECT * FROM subscriptions ORDER BY created_at DESC LIMIT 10;
```

---

## ✅ Success Checklist

- [ ] Logged into Supabase CLI
- [ ] Linked project to Supabase
- [ ] Set all environment variables (secrets)
- [ ] Deployed all 3 edge functions
- [ ] Configured Stripe webhook
- [ ] Tested with test card (4242...)
- [ ] Verified subscription in database
- [ ] Checked function logs for errors

---

## 🆘 Need Help?

If you're still having issues:

1. **Check edge function logs**:
   ```bash
   supabase functions logs create-checkout-session --limit 100
   ```

2. **Check Stripe Dashboard** for any errors

3. **Verify environment variables are set**:
   ```bash
   supabase secrets list
   ```

4. **Test the function directly**:
   ```bash
   curl -X POST https://rabavobdklnwvwsldbix.supabase.co/functions/v1/create-checkout-session \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{"userId":"test-user-id","userEmail":"test@example.com","priceId":"price_1SUhQ5DXXp0JfzzoesoJ8Ea9"}'
   ```
