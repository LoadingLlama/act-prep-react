# Typeform Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Typeform Account
1. Go to https://www.typeform.com/
2. Sign up for FREE account
3. Click "Create a typeform"

### Step 2: Build Your Form

Add these questions in order:

**Question 1: Welcome Screen**
- Type: Welcome screen
- Title: "Let's get you set up for ACT success!"
- Button text: "Get Started"

**Question 2: First Name**
- Type: Short text
- Question: "What's your first name?"
- Required: Yes

**Question 3: Email**
- Type: Email
- Question: "What's your email address?"
- Required: Yes

**Question 4: Phone**
- Type: Phone number
- Question: "What's your phone number?"
- Required: Yes

**Question 5: Location**
- Type: Multiple choice
- Question: "Are you currently living in the US?"
- Options:
  - Yes
  - No
- Required: Yes

**Question 6: Consent**
- Type: Yes/No
- Question: "I agree to receive occasional updates from Nomi Academy. You can unsubscribe anytime."
- Required: No

**Question 7: Thank You Screen**
- Type: Ending
- Title: "Perfect! Now let's schedule your session..."
- Description: "You'll see our calendar on the next screen"

### Step 3: Configure Settings

1. Click **Settings** (gear icon)
2. Go to **Notifications**
   - Enable "Email me when someone completes"
   - This sends responses to your email automatically!

3. Go to **Results** to view all responses

### Step 4: Get Your Embed Link

1. Click **Share** button (top right)
2. Go to **Embed** tab
3. Copy the **Full page** URL
   - Should look like: `https://form.typeform.com/to/abc123xyz`
4. **IMPORTANT**: Make sure it's the FULL URL, not just the form ID

### Step 5: Update Your Code

Replace this line in `src/pages/LandingPage.jsx`:

```javascript
typeformUrl="YOUR_TYPEFORM_URL_HERE"
```

With your actual Typeform URL:

```javascript
typeformUrl="https://form.typeform.com/to/YOUR_FORM_ID"
```

## That's it! 🎉

### How it works:

1. User clicks "Free Diagnostic Test"
2. **Typeform appears** → They fill it out
3. Typeform submits → **Auto-tracked in Typeform dashboard**
4. **Calendly appears** → They book their session
5. You get:
   - Email notification with their responses
   - All data in Typeform Results tab
   - Calendar booking from Calendly

### View Responses

Go to: https://admin.typeform.com/
- Click your form
- Click "Results" to see all submissions
- Download as CSV/Excel anytime
- Set up integrations (Google Sheets, Slack, etc.)

### Benefits:

✅ Beautiful one-question-at-a-time UX
✅ Auto-tracked responses
✅ Email notifications
✅ Export to CSV/Excel
✅ No database needed
✅ Free up to 100 responses/month

Need more? Typeform Plus is $29/month for unlimited responses.
