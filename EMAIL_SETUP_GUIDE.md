# Email Automation Setup Guide

This guide will help you set up automated email sending for the Diagnostic Test signup form.

## Overview

When users sign up for the free diagnostic test, they will automatically receive a welcome email with:
- Link to their diagnostic test
- Offer for FREE 35+ ACT Training
- Personalized from Caden Chiang @ Nomi Academy

## Setup Instructions

### Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Gmail Service (cadenatnomi@gmail.com)

1. In the EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose **"Gmail"**
4. Click "Connect Account"
5. **IMPORTANT**: Sign in with **cadenatnomi@gmail.com**
   - Make sure you're logged into the correct Gmail account!
   - You may need to allow "Less secure app access" in Gmail settings
   - Or create an "App Password" in Google Account settings (recommended)
6. After connecting, give it a name like "Nomi Academy Gmail"
7. Copy your **Service ID** (e.g., "service_xxxxxxx")

**Note**: Emails will be sent FROM cadenatnomi@gmail.com TO the user's email address.

### Step 3: Create an Email Template

1. In the EmailJS dashboard, click "Email Templates"
2. Click "Create New Template"
3. Fill in the template:

**Template Name**: `diagnostic_welcome_email`

**From Email**: cadenatnomi@gmail.com (automatically set from your connected service)

**From Name**: Nomi Academy

**Reply To**: cadenatnomi@gmail.com

**Subject**:
```
Your ACT Diagnostic Test + A Special Bonus for You!
```

**Content (HTML or Plain Text)**:
```
Hey {{to_name}},

Thanks for requesting your Free Diagnostic Test! You can grab it right here: {{diagnostic_link}}

Now, here's the exciting part: You're also qualified for a FREE 35+ ACT Training!

This is an exclusive opportunity to get personalized strategies and tips to boost your ACT score.

👉 Click here to claim your FREE 35+ TRAINING now: {{training_link}}

Secure your free training today before it's gone!

But don't wait—this special offer is only available for a limited time, and spots are filling up fast.

Best wishes,
{{from_name}}
{{from_title}}

---

If you no longer wish to receive these emails you may unsubscribe.
```

**Template Variables** (these are automatically filled):
- `{{to_name}}` - User's first name
- `{{to_email}}` - User's email address
- `{{from_name}}` - "Caden Chiang"
- `{{from_title}}` - "Student Success Manager - Nomi Academy"
- `{{diagnostic_link}}` - Link to diagnostic test
- `{{training_link}}` - Link to training
- `{{user_phone}}` - User's phone number
- `{{user_location}}` - User's location (US or International)

4. Save the template
5. Copy your **Template ID** (e.g., "template_xxxxxxx")

### Step 4: Get Your Public Key

1. In the EmailJS dashboard, go to "Account" → "General"
2. Find your **Public Key** (e.g., "xxxxxxxxxxxxxxx")

### Step 5: Update Your Code

1. Open `src/services/emailService.js`
2. Replace the placeholder values with your actual credentials:

```javascript
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // Your Template ID
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxx'; // Your Public Key
```

3. Save the file

## Testing

1. Restart your React app: `npm start`
2. Go to the landing page
3. Click "Free Diagnostic Test"
4. Fill out the form with a test email (use your own email)
5. Submit the form
6. Check your email inbox for the welcome email!

## Email Template Customization

You can customize the email template in the EmailJS dashboard:

### HTML Version (Recommended)

For a prettier email, use HTML in your template:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; }
    .button { display: inline-block; background: #1e3a8a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Nomi Academy!</h1>
    </div>
    <div class="content">
      <p>Hey {{to_name}},</p>

      <p>Thanks for requesting your Free Diagnostic Test! You can grab it right here:</p>

      <p style="text-align: center;">
        <a href="{{diagnostic_link}}" class="button">Start Your Diagnostic Test</a>
      </p>

      <p><strong>Now, here's the exciting part:</strong> You're also qualified for a FREE 35+ ACT Training!</p>

      <p>This is an exclusive opportunity to get personalized strategies and tips to boost your ACT score.</p>

      <p style="text-align: center;">
        <a href="{{training_link}}" class="button">Claim Your FREE 35+ TRAINING</a>
      </p>

      <p><strong>Secure your free training today before it's gone!</strong></p>

      <p>But don't wait—this special offer is only available for a limited time, and spots are filling up fast.</p>

      <p>Best wishes,<br>
      {{from_name}}<br>
      <em>{{from_title}}</em></p>
    </div>
    <div class="footer">
      <p>If you no longer wish to receive these emails you may unsubscribe.</p>
    </div>
  </div>
</body>
</html>
```

## Troubleshooting

### Email not sending?

1. **Check the browser console** for error messages
2. **Verify your credentials** in `emailService.js`
3. **Check EmailJS dashboard** for usage limits (free tier: 200 emails/month)
4. **Check spam folder** - emails might be filtered

### Email going to spam?

1. Use a verified domain email (not Gmail)
2. Add SPF/DKIM records to your domain
3. Use EmailJS Pro plan for better deliverability
4. Consider using SendGrid or AWS SES for production

### Want to use a different email service?

You can switch to:
- **SendGrid** - More reliable, needs backend
- **AWS SES** - Very cheap, needs backend
- **Mailgun** - Good deliverability, needs backend
- **Postmark** - Transactional emails, needs backend

## Free Tier Limits

EmailJS Free Tier:
- **200 emails/month**
- **2 email services**
- **2 email templates**

For more emails, upgrade to:
- **EmailJS Pro**: $15/month (1000 emails)
- **EmailJS Premium**: $45/month (5000 emails)

## Next Steps

After setting up email automation, you can:

1. **Track conversions** - Add analytics to see how many users sign up
2. **Follow-up emails** - Send reminder emails if they don't start the test
3. **Email sequences** - Create a series of educational emails
4. **A/B testing** - Test different email copy to improve open rates

## Support

If you need help:
- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Nomi Academy Dev: caden@nomiacademy.com (you!)

---

**Ready to send emails?** Follow the steps above and test it out! 🚀
