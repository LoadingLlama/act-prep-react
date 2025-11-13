# START HERE - Three Issues Found & Documented

## What You Asked For

You requested analysis of three specific areas in the codebase:

1. **Key Terms Popup** - Hovering popup for terms in lessons that's glitching/flickering
2. **Sidebar Scrollbar** - Scrollbar in sidebar with white space issue
3. **Learning Path** - Component where we need to add edit functionality for test date and ACT score

---

## What I Found

All three issues have been identified, diagnosed, and documented with:
- Exact file locations
- Line numbers
- Root cause analysis
- Before/after code examples
- Implementation instructions

---

## Three Documents to Read (In Order)

### 1. QUICK_REFERENCE.md (5 min read)
Start here for a quick overview of each issue.
- Problem statement
- File locations
- Simple fixes
- Testing checklist

**File**: `/Users/cadenchiang/Desktop/act-prep-react/QUICK_REFERENCE.md`

### 2. CODE_SNIPPETS_COMPARISON.md (10 min read)
See the actual code that needs to be changed.
- Current broken code
- Needed fixed code
- Copy-paste ready solutions

**File**: `/Users/cadenchiang/Desktop/act-prep-react/CODE_SNIPPETS_COMPARISON.md`

### 3. CODEBASE_FINDINGS.md (20 min read)
Deep technical analysis of each issue.
- Complete context
- Styling information
- Data flow explanation
- Architecture details

**File**: `/Users/cadenchiang/Desktop/act-prep-react/CODEBASE_FINDINGS.md`

### 4. SEARCH_RESULTS_SUMMARY.md (Reference)
Complete file listing and component analysis.
- All 13 files that were examined
- Issue status
- Next steps

**File**: `/Users/cadenchiang/Desktop/act-prep-react/SEARCH_RESULTS_SUMMARY.md`

---

## Issue Summary

### Issue 1: Key Terms Popup - GLITCHING

**Status**: BROKEN - Feature doesn't work

**Location**: 
- `/src/layouts/AppLayout.jsx` - State (correct, but not used)
- `/src/components/app/LessonsContent.jsx` - Missing handlers

**Problem**: 
- Only `onMouseLeave` handler exists, no `onMouseEnter`
- "+X more" text has no hover listeners
- Popup is defined but never triggered

**Complexity**: Easy (5 minutes)

---

### Issue 2: Sidebar Scrollbar - WHITE SPACE

**Status**: BROKEN - Visual quality issue

**Location**: 
- `/src/components/Sidebar.js` - Lines 36-48

**Problem**: 
- Scrollbar track background is `transparent`
- Shows white sidebar background instead of track
- Creates gap-like appearance

**Fix**: 
- Change `background: 'transparent'` to `background: '#f9fafb'`

**Complexity**: Trivial (1 minute)

---

### Issue 3: Learning Path - HARDCODED VALUES

**Status**: INCOMPLETE - Data flow broken

**Location**: 
- `/src/components/app/CourseContent.jsx` - Hardcoded values
- `/src/layouts/AppLayout.jsx` - Not loading user goals
- `/src/components/auth/OnboardingQuestionnaire.jsx` - Collects goals but not used

**Problem**: 
- Test date hardcoded as "60 days from now"
- Section scores are example data (75, 62, 88, 70)
- User's actual onboarding data saved to Supabase but not displayed
- No edit functionality

**Fix**: 
1. Load user goals from Supabase in AppLayout
2. Pass through Outlet context
3. Display in CourseContent instead of hardcoded values
4. Add edit buttons (optional enhancement)

**Complexity**: Medium (20-30 minutes)

---

## Files You Need to Modify

### Must Modify (For fixes)
1. `/src/components/app/LessonsContent.jsx` - Add hover handlers
2. `/src/components/Sidebar.js` - Change scrollbar color
3. `/src/components/app/CourseContent.jsx` - Display user data
4. `/src/layouts/AppLayout.jsx` - Load user goals

### Reference Files (For context)
- `/src/styles/app/lessons-items.styles.js` - Popup styling (already correct)
- `/src/components/auth/OnboardingQuestionnaire.jsx` - Data collection (already works)
- `/src/services/api/learning-path.service.js` - Business logic (already exists)

---

## How to Use These Documents

### Option A: Quick Fix (30 minutes)
1. Read QUICK_REFERENCE.md
2. Read CODE_SNIPPETS_COMPARISON.md
3. Make the changes
4. Test using the checklist

### Option B: Deep Understanding (1.5 hours)
1. Read QUICK_REFERENCE.md for overview
2. Read CODEBASE_FINDINGS.md for deep understanding
3. Read CODE_SNIPPETS_COMPARISON.md for exact changes
4. Read SEARCH_RESULTS_SUMMARY.md for file reference
5. Make changes with full confidence

### Option C: Just Give Me the Code (10 minutes)
1. Go directly to CODE_SNIPPETS_COMPARISON.md
2. Copy the "NEEDED CODE" sections
3. Paste into the files specified
4. Done

---

## File Locations (Absolute Paths)

### Component Files
```
/Users/cadenchiang/Desktop/act-prep-react/src/layouts/AppLayout.jsx
/Users/cadenchiang/Desktop/act-prep-react/src/components/app/LessonsContent.jsx
/Users/cadenchiang/Desktop/act-prep-react/src/components/app/CourseContent.jsx
/Users/cadenchiang/Desktop/act-prep-react/src/components/Sidebar.js
/Users/cadenchiang/Desktop/act-prep-react/src/components/AllLessonsNavigator.js
```

### Style Files
```
/Users/cadenchiang/Desktop/act-prep-react/src/styles/app/lessons-items.styles.js
/Users/cadenchiang/Desktop/act-prep-react/src/styles/app/modal.styles.js
```

### Supporting Files
```
/Users/cadenchiang/Desktop/act-prep-react/src/components/auth/OnboardingQuestionnaire.jsx
/Users/cadenchiang/Desktop/act-prep-react/src/services/api/learning-path.service.js
/Users/cadenchiang/Desktop/act-prep-react/src/hooks/useTermTooltips.js
```

---

## What Each Document Contains

| Document | Purpose | Time | Best For |
|----------|---------|------|----------|
| QUICK_REFERENCE.md | Overview & checklist | 5 min | Quick start |
| CODE_SNIPPETS_COMPARISON.md | Before/after code | 10 min | Implementation |
| CODEBASE_FINDINGS.md | Technical deep dive | 20 min | Understanding |
| SEARCH_RESULTS_SUMMARY.md | File index & reference | 5 min | Lookup |

---

## Priority Order

1. **HIGH**: Fix key terms popup (feature is broken)
2. **MEDIUM**: Fix scrollbar (visual polish)
3. **HIGH**: Add learning path data (important feature)

All three can be done in under 1 hour total.

---

## Next Steps

1. Open QUICK_REFERENCE.md
2. Choose your path (Quick Fix, Deep Understanding, or Just Code)
3. Make the changes
4. Run the testing checklists
5. Commit your changes

Good luck! All the information you need is in these documents.

