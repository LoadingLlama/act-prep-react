# Quick Reference Guide

## 1. KEY TERMS POPUP - GLITCHING/FLICKERING

### The Problem
The popup appears but flickers because there's no hover handler actually triggering it.

### File Locations
| File | Purpose | Lines |
|------|---------|-------|
| `/src/layouts/AppLayout.jsx` | State management | 54-55, 321, 387-405 |
| `/src/components/app/LessonsContent.jsx` | Lesson card rendering | 106, 116-121, 162 |
| `/src/styles/app/lessons-items.styles.js` | Popup styling | 197-242 |

### What's Broken
In LessonsContent.jsx (line 106, 162):
- Only `onMouseLeave={() => setHoveredMoreTag(null)}` exists
- NO `onMouseEnter` handler to SET the hover state
- The "+X more" text has no hover listeners at all

### The Fix (Pseudocode)
```javascript
// In LessonsContent.jsx, wrap the keyTermsTags in a handler:
<div 
  className={classes.keyTermsTags}
  onMouseEnter={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMoreTagPosition({
      top: rect.top,
      left: rect.left + rect.width / 2
    });
    setHoveredMoreTag({
      keyTerms: lesson.keyTerms.slice(2)
    });
  }}
  onMouseLeave={() => setHoveredMoreTag(null)}
>
  {/* content */}
</div>
```

### Why It Flickers
1. No entry trigger - popup never shows on hover
2. Even if it did show, `onMouseLeave` on parent card would hide it
3. Component re-renders might clear state

---

## 2. SIDEBAR SCROLLBAR - WHITE SPACE

### The Problem
The scrollbar track is transparent, showing white background as a gap on the right edge.

### File Location
| File | Section | Lines |
|------|---------|-------|
| `/src/components/Sidebar.js` | CSS-in-JS styles | 36-48 |

### What's Wrong (Current Styling)
```javascript
'&::-webkit-scrollbar-track': {
  background: 'transparent'  // <-- This is the problem!
}
```

### The Fix
Change to:
```javascript
'&::-webkit-scrollbar-track': {
  background: '#f9fafb'  // Subtle light gray
}
```

OR to exactly match sidebar:
```javascript
'&::-webkit-scrollbar-track': {
  background: '#ffffff'  // Same as sidebar background
}
```

---

## 3. LEARNING PATH - ADD EDIT FUNCTIONALITY

### The Problem
- Test date is hardcoded to 60 days from now (line 35)
- Section scores are hardcoded example data (lines 26-31)
- User's actual goals from onboarding are NOT displayed
- No way for user to change their test date or target score

### File Locations
| File | What It Does |
|------|-------------|
| `/src/components/app/CourseContent.jsx` | Display learning path - NEEDS UPDATE |
| `/src/layouts/AppLayout.jsx` | Load user goals - NEEDS TO DO THIS |
| `/src/components/auth/OnboardingQuestionnaire.jsx` | Collect goals - ALREADY WORKS |
| (new) `/src/components/app/EditLearningPathModal.jsx` | Edit modal - NEEDS TO CREATE |

### Data Flow (Current - WRONG)
```
User fills out onboarding questionnaire
  ↓
Data saved to Supabase profiles.onboarding_data
  ↓
??? (Not fetched or displayed)
  ↓
CourseContent uses HARDCODED values
```

### Data Flow (Target - CORRECT)
```
Supabase: profiles.onboarding_data = {
  testDate: "2025-03-15",
  targetScore: "30-33",
  studyTimePerWeek: "5-7",
  ...
}
  ↓
AppLayout: Load in useEffect, add to context
  ↓
CourseContent: Display actual values + Edit button
  ↓
EditLearningPathModal: User edits & saves
  ↓
Supabase: Updated data stored
```

### Fields to Display/Edit
- Test Date (currently hardcoded as "60 days from now")
- Target Score (currently hardcoded as "30-33")
- Study Time Per Week (currently not shown)
- Concerned Sections (currently not shown)
- Days Until Test (calculate from actual test date)

### Implementation Checklist
- [ ] Fetch `onboarding_data` from Supabase in AppLayout
- [ ] Pass through Outlet context
- [ ] Display actual values in CourseContent stat cards
- [ ] Add Edit button (pencil icon) to stat cards
- [ ] Create EditLearningPathModal component with form
- [ ] Save changes back to Supabase
- [ ] Optional: Regenerate learning path when goals change

---

## Code Quality Notes

All three issues are in HIGH-VISIBILITY areas:
1. **Popup** - Users see flickering in lessons view (primary feature)
2. **Scrollbar** - Visual detail in lesson sidebar (quality perception)
3. **Learning Path** - Home page stats (first thing users see)

### Priority Order
1. **HIGH**: Fix key terms popup (feature is broken)
2. **MEDIUM**: Fix scrollbar (visual polish)
3. **HIGH**: Add edit functionality (data display issue)

---

## Testing After Fixes

### Test 1: Key Terms Popup
- [ ] Open lessons view
- [ ] Find lesson with 3+ key terms
- [ ] Hover over "+X more" text
- [ ] Popup should appear
- [ ] Popup should NOT flicker on hover
- [ ] Popup should disappear on mouse leave

### Test 2: Scrollbar
- [ ] Open lesson modal with long navigation sidebar
- [ ] Scroll in sidebar
- [ ] Scrollbar should be visible and not "white space"
- [ ] Should look clean, not like a gap

### Test 3: Learning Path
- [ ] Complete onboarding with test date set to future date
- [ ] Go to Learning Path / Home view
- [ ] Test Date card should show YOUR date, not "60 days from now"
- [ ] Click Edit button on Test Date
- [ ] Change date and save
- [ ] Date should update

---

## File Absolute Paths

```
/Users/cadenchiang/Desktop/act-prep-react/src/layouts/AppLayout.jsx
/Users/cadenchiang/Desktop/act-prep-react/src/components/app/LessonsContent.jsx
/Users/cadenchiang/Desktop/act-prep-react/src/components/app/CourseContent.jsx
/Users/cadenchiang/Desktop/act-prep-react/src/components/Sidebar.js
/Users/cadenchiang/Desktop/act-prep-react/src/styles/app/lessons-items.styles.js
/Users/cadenchiang/Desktop/act-prep-react/src/components/auth/OnboardingQuestionnaire.jsx
```
