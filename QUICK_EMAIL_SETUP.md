# Quick Email Setup Checklist ✅

Follow these steps to enable automated emails from **cadenatnomi@gmail.com**:

## 1. Sign up for EmailJS
- [ ] Go to https://www.emailjs.com
- [ ] Create a free account
- [ ] Verify your email

## 2. Connect Gmail Account
- [ ] In EmailJS dashboard, go to "Email Services"
- [ ] Click "Add New Service" → Choose "Gmail"
- [ ] **Sign in with cadenatnomi@gmail.com**
- [ ] Copy your Service ID (e.g., `service_abc123`)

## 3. Create Email Template
- [ ] In EmailJS dashboard, go to "Email Templates"
- [ ] Click "Create New Template"
- [ ] Name it: `diagnostic_welcome_email`
- [ ] Set From Name: `Nomi Academy`
- [ ] Set Reply To: `cadenatnomi@gmail.com`
- [ ] Copy the email content from `EMAIL_SETUP_GUIDE.md`
- [ ] Save and copy your Template ID (e.g., `template_xyz789`)

## 4. Get Public Key
- [ ] In EmailJS dashboard, go to "Account" → "General"
- [ ] Copy your Public Key (e.g., `user_abc123xyz789`)

## 5. Update Code
- [ ] Open `src/services/emailService.js`
- [ ] Replace `YOUR_SERVICE_ID` with your Service ID
- [ ] Replace `YOUR_TEMPLATE_ID` with your Template ID
- [ ] Replace `YOUR_PUBLIC_KEY` with your Public Key
- [ ] Save the file

## 6. Test It!
- [ ] Restart the app: `npm start`
- [ ] Go to http://localhost:3000
- [ ] Click "Free Diagnostic Test"
- [ ] Fill out the form with YOUR email
- [ ] Submit and check your inbox!

---

## Need Help?

### Gmail App Password (Recommended)

If EmailJS can't connect to your Gmail:

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification (if not already enabled)
3. Go to "App passwords"
4. Generate a new app password for "EmailJS"
5. Use this password when connecting Gmail to EmailJS

### Still Having Issues?

Check the full guide: `EMAIL_SETUP_GUIDE.md`

---

**Estimated Setup Time**: 10 minutes ⏱️

**Cost**: Free (200 emails/month) 💰
