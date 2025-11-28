# 🚀 Switch Stripe from TEST to LIVE Mode

## ⚠️ IMPORTANT: Only do this when you're ready for real payments!

In **TEST mode**: Fake cards work (4242 4242 4242 4242), no real charges
In **LIVE mode**: Real credit cards are charged real money

---

## Current Status: TEST MODE ✅

Your `.env` file is currently set to TEST mode:
```bash
# TEST MODE (use test cards like 4242 4242 4242 4242)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51SUg2DDXXp0JfzzobWCn3H8ciKBLN93resMcMNtPKoOxLqQeUTUKFIAQFasopBZ2fPSVZ2dc404yhBKGSB6otVqO00z4tn7eSD
REACT_APP_STRIPE_PRICE_ID=price_1SUhQ5DXXp0JfzzoesoJ8Ea9
```

This is **GOOD** for development and testing!

---

## 📋 Step 1: Deploy Edge Functions (Run This Now)

First, let's deploy your Stripe functions so TEST mode works:

```bash
cd /Users/cadenchiang/Desktop/act-prep-react
./deploy-stripe.sh
```

**What the script will do:**
1. Login to Supabase (opens browser)
2. Link your project
3. Ask for your **TEST** Stripe Secret Key
4. Deploy all 3 edge functions
5. Give you webhook setup instructions

**Where to get your TEST Stripe Secret Key:**
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Click "Reveal test key" under "Secret key"
3. Copy the key (starts with `sk_test_...`)
4. Paste it when the script asks

---

## ✅ Step 2: Test Everything Works in TEST Mode

After deployment:

1. **Go to**: http://localhost:3000/app/upgrade
2. **Click**: "Start Pro Now"
3. **Use test card**: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any 5-digit ZIP
4. **Complete checkout**
5. **Verify**: You're redirected back and subscription shows as active

If this works, TEST mode is fully set up! ✅

---

## 🔴 Step 3: Switch to LIVE Mode (Only When Ready!)

### ⚠️ Before You Switch:

**Make sure you have:**
- [ ] Tested everything thoroughly in TEST mode
- [ ] Verified all features work correctly
- [ ] Set up your business legally (if required)
- [ ] Read Stripe's terms of service
- [ ] Activated your Stripe account for LIVE mode

### Part A: Get Your LIVE Stripe Keys

1. **Go to**: https://dashboard.stripe.com/apikeys (note: no "test" in URL)
2. **You may need to**:
   - Complete Stripe onboarding
   - Verify your business information
   - Add bank account details
3. **Copy**:
   - Publishable key (starts with `pk_live_...`)
   - Secret key (starts with `sk_live_...`)

### Part B: Update Frontend (.env file)

Edit `/Users/cadenchiang/Desktop/act-prep-react/.env`:

```bash
# Comment out TEST keys:
# TEST MODE (use test cards like 4242 4242 4242 4242)
# REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51SUg2DDXXp0JfzzobWCn3H8ciKBLN93resMcMNtPKoOxLqQeUTUKFIAQFasopBZ2fPSVZ2dc404yhBKGSB6otVqO00z4tn7eSD
# REACT_APP_STRIPE_PRICE_ID=price_1SUhQ5DXXp0JfzzoesoJ8Ea9

# Uncomment LIVE keys:
# LIVE MODE (real credit cards will be charged!)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_51SUg2DDXXp0JfzzoAzHQixXCSErv6VmYSusFEn2yZAZC1XCJGGg3D9e2YavZXd1ZkNuSatSL5t0nB87XibatI8rl00ZDQBp86K
REACT_APP_STRIPE_PRICE_ID=price_1SUgGBDXXp0JfzzoILq46Qjh
```

### Part C: Update Backend (Supabase Secrets)

```bash
# Set LIVE secret key
supabase secrets set STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY_HERE
```

### Part D: Create LIVE Webhook

1. **Go to**: https://dashboard.stripe.com/webhooks (LIVE mode, not test)
2. **Click**: "+ Add endpoint"
3. **Endpoint URL**: `https://rabavobdklnwvwsldbix.supabase.co/functions/v1/stripe-webhook`
4. **Select events**:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. **Click**: "Add endpoint"
6. **Copy webhook secret** (starts with `whsec_...`)
7. **Run**:
   ```bash
   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET
   ```

### Part E: Restart Your App

```bash
# Stop the current dev server (Ctrl+C)
# Start it again
npm start
```

### Part F: Test with Real Card (Small Amount!)

⚠️ **IMPORTANT**: Use a real card but test with the $29/month plan

1. Go to your app
2. Click "Start Pro Now"
3. Use a **real credit card**
4. Complete the payment
5. **Immediately cancel** if this is just a test:
   - Go to: http://localhost:3000/app/profile
   - Click "Manage Subscription"
   - Cancel subscription
   - You'll get a refund

---

## 🔄 Switching Back to TEST Mode

If you need to go back to TEST mode:

1. **Edit `.env`**: Comment LIVE keys, uncomment TEST keys
2. **Update secrets**:
   ```bash
   supabase secrets set STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY
   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_TEST_WEBHOOK_SECRET
   ```
3. **Restart**: `npm start`

---

## 📊 Monitoring Payments

### TEST Mode Dashboard
- **Payments**: https://dashboard.stripe.com/test/payments
- **Subscriptions**: https://dashboard.stripe.com/test/subscriptions
- **Webhooks**: https://dashboard.stripe.com/test/webhooks

### LIVE Mode Dashboard
- **Payments**: https://dashboard.stripe.com/payments
- **Subscriptions**: https://dashboard.stripe.com/subscriptions
- **Webhooks**: https://dashboard.stripe.com/webhooks

---

## ✅ Checklist Before Going LIVE

- [ ] Tested everything in TEST mode
- [ ] Verified subscriptions are created correctly
- [ ] Tested cancellation flow
- [ ] Confirmed webhooks are working
- [ ] Read Stripe's requirements for your business type
- [ ] Set up proper customer support
- [ ] Have refund policy ready
- [ ] Tested on mobile devices
- [ ] Verified SSL certificate (HTTPS)
- [ ] Set up proper error logging

---

## 🆘 Common Issues

### "Your account is not activated"
- Complete Stripe onboarding
- Verify your business information
- Add bank account for payouts

### "No webhook secret"
- Make sure you created the webhook in LIVE mode (not test)
- Copy the signing secret from Stripe
- Set it in Supabase: `supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...`

### "Payment failed immediately"
- Check if your Stripe account is activated
- Verify you're using LIVE keys everywhere
- Check Stripe Dashboard for error details

---

## 💡 Recommendation

**Stay in TEST mode until:**
1. You've deployed to production (nomiacademy.org)
2. You've tested everything thoroughly
3. You're ready to accept real customers
4. You've set up customer support

For now, just run `./deploy-stripe.sh` and test in TEST mode!
