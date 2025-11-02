# 🚀 Deploy ACT Prep App to nomiacademy.org

**Complete step-by-step guide to deploy your app to nomiacademy.org**

---

## 📋 OVERVIEW

We'll use **Vercel** (free, fast, perfect for React apps):
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificate (HTTPS)
- ✅ Custom domain support (nomiacademy.org)
- ✅ Zero configuration needed
- ✅ Excellent for SPAs with Supabase

---

## 🎯 PART 1: Deploy to Vercel (10 minutes)

### Step 1: Sign Up for Vercel

1. **Go to**: https://vercel.com/signup
2. **Click**: "Continue with GitHub"
3. **Authorize**: Vercel to access your GitHub account
4. You'll be taken to your Vercel dashboard

### Step 2: Import Your Project

1. **In Vercel dashboard**, click: **"Add New..." → "Project"**
2. **Find**: `LoadingLlama/act-prep-react` in the repository list
3. **Click**: "Import"

### Step 3: Configure Project Settings

**IMPORTANT**: You need to add your environment variables!

In the "Configure Project" screen:

1. **Project Name**: `nomiacademy` (or keep default)
2. **Framework Preset**: Vercel should auto-detect "Create React App"
3. **Root Directory**: `.` (leave as default)

4. **Environment Variables** - Click "Add" and enter these THREE variables:

   ```
   Name: REACT_APP_SUPABASE_URL
   Value: https://rabavobdklnwvwsldbix.supabase.co
   ```

   ```
   Name: REACT_APP_SUPABASE_ANON_KEY
   Value: [Your anon key from .env file]
   ```

   ```
   Name: SUPABASE_SERVICE_ROLE_KEY
   Value: [Your service role key from .env file]
   ```

   ⚠️ **To get these values**: Run this command in terminal:
   ```bash
   cat /Users/cadenchiang/Desktop/act-prep-react/.env
   ```

5. **Click**: "Deploy"

### Step 4: Wait for Deployment (2-3 minutes)

Vercel will:
- Install dependencies
- Build your React app
- Deploy it to a temporary URL like: `nomiacademy.vercel.app`

You'll see a success screen with confetti! 🎉

---

## 🌐 PART 2: Connect Custom Domain (5 minutes)

### Step 1: Add Domain in Vercel

1. **In your Vercel project**, go to: **Settings → Domains**
2. **Enter domain**: `nomiacademy.org`
3. **Click**: "Add"
4. Vercel will show you DNS records to configure

### Step 2: Configure DNS Settings

**Where did you buy nomiacademy.org?** (GoDaddy, Namecheap, Google Domains, etc.)

You need to add these DNS records:

#### Option A: Using A Records (Recommended)

Add these **A records** in your domain registrar's DNS settings:

```
Type: A
Name: @ (or leave blank for root domain)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

```
Type: A
Name: www
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

#### Option B: Using CNAME (Alternative)

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Verify Domain in Vercel

1. After adding DNS records, **go back to Vercel**
2. **Click**: "Verify" or "Refresh"
3. ⚠️ **DNS propagation can take 5 minutes to 48 hours** (usually ~10 minutes)
4. Vercel will automatically provision an SSL certificate once verified

---

## 🔐 PART 3: Update Supabase Settings (5 minutes)

Your app uses Supabase authentication, so you need to add the new domain:

### Step 1: Add Site URL

1. **Go to**: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix/auth/url-configuration
2. **Site URL**: Change from `http://localhost:3000` to:
   ```
   https://nomiacademy.org
   ```
3. **Click**: "Save"

### Step 2: Add Redirect URLs

In the same page, under **Redirect URLs**, add:

```
https://nomiacademy.org
https://nomiacademy.org/*
https://nomiacademy.org/auth/callback
https://www.nomiacademy.org
https://www.nomiacademy.org/*
```

**Click**: "Save"

### Step 3: Update Allowed Origins (CORS)

Still in Supabase:

1. Go to: **Settings → API → CORS Settings**
2. Add these origins:
   ```
   https://nomiacademy.org
   https://www.nomiacademy.org
   ```

---

## ✅ PART 4: Test Everything (5 minutes)

### Step 1: Wait for DNS Propagation

Check if your domain is live:

```bash
# In terminal, run:
dig nomiacademy.org

# Or visit:
https://dnschecker.org/#A/nomiacademy.org
```

### Step 2: Test the Website

1. **Visit**: https://nomiacademy.org
2. **Test these**:
   - ✅ Site loads
   - ✅ Can log in
   - ✅ Lessons load correctly
   - ✅ Examples work
   - ✅ HTTPS (lock icon in browser)

### Step 3: Test www Redirect

1. **Visit**: https://www.nomiacademy.org
2. Should redirect to: https://nomiacademy.org

---

## 🔄 PART 5: Automatic Deployments

**Good news**: Every time you push to GitHub, Vercel automatically deploys!

Workflow:
1. Make changes locally
2. `git add .`
3. `git commit -m "your message"`
4. `git push origin main`
5. Vercel automatically deploys in ~2 minutes
6. Live at nomiacademy.org!

You can see deployment status at: https://vercel.com/dashboard

---

## 📝 QUICK REFERENCE: DNS Settings

**For your domain registrar** (GoDaddy, Namecheap, etc.):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 3600 |
| A | www | 76.76.21.21 | 3600 |

Or use CNAME:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | cname.vercel-dns.com | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

---

## 🐛 TROUBLESHOOTING

### Issue: Domain not loading after 1 hour

**Solution**:
```bash
# Check DNS propagation
dig nomiacademy.org

# Should show:
# nomiacademy.org.  3600  IN  A  76.76.21.21
```

If not, double-check DNS records in your domain registrar.

### Issue: "Invalid redirect URL" on login

**Solution**: Make sure you added all redirect URLs in Supabase (Part 3, Step 2)

### Issue: App loads but data doesn't

**Solution**: Check environment variables in Vercel:
- Go to: Vercel Dashboard → Project → Settings → Environment Variables
- Verify all 3 variables are set correctly

### Issue: Build fails in Vercel

**Solution**: Check build logs in Vercel dashboard. Usually means:
- Missing environment variables
- Build error in code

---

## 📞 SUPPORT

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **DNS Checker**: https://dnschecker.org

---

## 🎉 SUCCESS CHECKLIST

- [ ] Signed up for Vercel account
- [ ] Imported GitHub repository to Vercel
- [ ] Added all 3 environment variables
- [ ] First deployment successful
- [ ] Added custom domain in Vercel
- [ ] Configured DNS records at domain registrar
- [ ] Domain verified in Vercel
- [ ] SSL certificate issued (HTTPS working)
- [ ] Updated Supabase Site URL
- [ ] Added redirect URLs in Supabase
- [ ] Updated CORS settings in Supabase
- [ ] Tested nomiacademy.org loads
- [ ] Tested login works
- [ ] Tested lessons load
- [ ] Tested www redirect works

---

**Ready? Let's start with Part 1!** 🚀
