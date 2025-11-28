# ⚡ QUICK START: Deploy to nomiacademy.org

**Follow these exact steps - copy and paste everything**

---

## 🎯 STEP 1: Get Your Environment Variables

Run this to see your keys:

```bash
cat /Users/cadenchiang/Desktop/act-prep-react/.env
```

**Copy the output** - you'll need it in Step 3!

---

## 🚀 STEP 2: Deploy to Vercel

1. **Open this link**: https://vercel.com/new

2. **Click**: "Continue with GitHub"

3. **Import**: Find `LoadingLlama/act-prep-react` and click "Import"

---

## 🔑 STEP 3: Add Environment Variables in Vercel

When you see "Configure Project", scroll to **Environment Variables** and add these 3:

### Variable 1:
```
Name: REACT_APP_SUPABASE_URL
Value: https://rabavobdklnwvwsldbix.supabase.co
```

### Variable 2:
```
Name: REACT_APP_SUPABASE_ANON_KEY
Value: [PASTE YOUR ANON KEY FROM STEP 1]
```

### Variable 3:
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: [PASTE YOUR SERVICE ROLE KEY FROM STEP 1]
```

**Then click**: "Deploy"

⏱️ **Wait 2-3 minutes** for the build to complete.

---

## 🌐 STEP 4: Add Your Domain

After deployment succeeds:

1. **Click**: "Continue to Dashboard"
2. **Go to**: Settings → Domains
3. **Type**: `nomiacademy.org`
4. **Click**: "Add"

Vercel will show you DNS settings to configure.

---

## 📡 STEP 5: Configure DNS at Your Domain Registrar

**Where did you buy nomiacademy.org?**

Go to your domain registrar's DNS settings and add:

### DNS Record 1:
```
Type: A
Name: @
Value: 76.76.21.21
```

### DNS Record 2:
```
Type: A
Name: www
Value: 76.76.21.21
```

**Save** the DNS records.

⏱️ **Wait 10-30 minutes** for DNS to propagate.

---

## 🔐 STEP 6: Update Supabase

1. **Open**: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix/auth/url-configuration

2. **Change Site URL to**:
   ```
   https://nomiacademy.org
   ```

3. **Add these Redirect URLs** (click "+ Add URL" for each):
   ```
   https://nomiacademy.org/*
   https://www.nomiacademy.org/*
   ```

4. **Click**: "Save"

---

## ✅ STEP 7: Test Your Website

1. **Visit**: https://nomiacademy.org

2. **Check**:
   - ✅ Site loads
   - ✅ Can log in
   - ✅ Lessons work

---

## 🎉 DONE!

Your ACT prep app is now live at:
**https://nomiacademy.org**

Every time you push to GitHub, it auto-deploys! 🚀

---

## ❓ Need Help?

See the full guide: `DEPLOYMENT_GUIDE_NOMIACADEMY.md`
