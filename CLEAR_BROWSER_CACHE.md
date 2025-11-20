# Clear Browser Cache to Fix Stripe.js Error

The "Failed to load Stripe.js" error is caused by your browser caching the old version of the code. Follow these steps:

## Option 1: Hard Refresh (Quickest)

1. **Close ALL browser tabs** with localhost:3000
2. **Open a new tab**
3. Navigate to http://localhost:3000
4. **Hard refresh**:
   - **Mac**: Press `Cmd + Shift + R`
   - **Windows/Linux**: Press `Ctrl + Shift + F5`

## Option 2: Clear Application Cache (Most Thorough)

### Chrome/Brave:
1. Open DevTools: Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
2. Go to **Application** tab
3. In left sidebar, click **Storage**
4. Click **Clear site data** button
5. Refresh the page: `Cmd+R` or `Ctrl+R`

### Firefox:
1. Open DevTools: Press `F12`
2. Go to **Storage** tab
3. Right-click on your localhost domain
4. Click **Delete All**
5. Refresh the page

### Safari:
1. Open DevTools: `Cmd+Option+I`
2. Go to **Storage** tab
3. Click **Local Storage** and **Session Storage**
4. Delete all items
5. Refresh the page

## Option 3: Incognito/Private Window (Fastest Test)

1. Open an **Incognito/Private window**:
   - Chrome: `Cmd+Shift+N` (Mac) / `Ctrl+Shift+N` (Windows)
   - Firefox: `Cmd+Shift+P` (Mac) / `Ctrl+Shift+P` (Windows)
   - Safari: `Cmd+Shift+N`
2. Navigate to http://localhost:3000
3. Test the app (cache-free)

## Why This Happens

The browser cached the old version of `stripe.service.js` that loaded Stripe immediately. The new version uses lazy loading, but your browser is still running the old cached code.

## Verification

After clearing cache, you should see in browser console:
```
✅ Loading Stripe with key: pk_test_51SUg2DDXXp0...
```

This means the new lazy loading is working correctly.
