# Search Results Summary - Three Issues Found

## Overview

Your codebase has been thoroughly analyzed. Three issues were identified and documented:

1. **Key Terms Popup Glitching** - HOVER HANDLERS MISSING
2. **Sidebar Scrollbar White Space** - STYLING ISSUE  
3. **Learning Path Values Hardcoded** - DATA NOT DISPLAYED

All three issues have root causes identified with specific file locations and line numbers.

---

## Files Found & Analyzed

### Core Component Files
- `/src/layouts/AppLayout.jsx` - Main app layout, state management
- `/src/components/app/LessonsContent.jsx` - Lesson cards with key terms
- `/src/components/Sidebar.js` - Navigation sidebar
- `/src/components/app/CourseContent.jsx` - Learning path view

### Style Files
- `/src/styles/app/lessons-items.styles.js` - Popup & lesson item styles
- `/src/styles/app/modal.styles.js` - Modal and sidebar styles
- `/src/styles/App.styles.js` - Combined style imports

### Supporting Files
- `/src/components/auth/OnboardingQuestionnaire.jsx` - User goal collection
- `/src/hooks/useTermTooltips.js` - Term definition tooltips (different from popup)
- `/src/components/TermDefinition.js` - Term definition component
- `/src/services/api/learning-path.service.js` - Learning path business logic
- `/src/components/AllLessonsNavigator.js` - Lesson sidebar navigator

---

## Issue #1: Key Terms Popup - Glitching/Flickering

### File Paths
```
/Users/cadenchiang/Desktop/act-prep-react/src/layouts/AppLayout.jsx (Lines 54-55, 321, 387-405)
/Users/cadenchiang/Desktop/act-prep-react/src/components/app/LessonsContent.jsx (Lines 106, 116-121, 162)
/Users/cadenchiang/Desktop/act-prep-react/src/styles/app/lessons-items.styles.js (Lines 197-242)
```

### The Problem
In LessonsContent.jsx, lesson cards have `onMouseLeave={() => setHoveredMoreTag(null)}` but there is **NO** `onMouseEnter` handler to set the popup state. The "+X more" text in the keyTermsTags div has no hover listeners at all.

### Code Location
**AppLayout.jsx Lines 54-55**:
```javascript
const [hoveredMoreTag, setHoveredMoreTag] = useState(null);
const [moreTagPosition, setMoreTagPosition] = useState({ top: 0, left: 0 });
```

**AppLayout.jsx Lines 387-405** - Popup rendering (conditional):
```javascript
{hoveredMoreTag && (
  <div className={classes.keyTermsPopup} style={{...}}>
    {/* popup content */}
  </div>
)}
```

**LessonsContent.jsx Lines 116-121** - Where popup should trigger:
```javascript
{lesson.keyTerms && lesson.keyTerms.length > 0 && (
  <div className={classes.keyTermsTags}>
    {lesson.keyTerms.slice(0, 2).join(' • ')}
    {lesson.keyTerms.length > 2 && ` • +${lesson.keyTerms.length - 2} more`}
  </div>  // <-- NO HOVER HANDLERS HERE
)}
```

### Root Cause
1. Missing `onMouseEnter` handler on keyTermsTags
2. No code to set `hoveredMoreTag` state
3. No calculation of popup position

### Status
**BROKEN** - Popup is rendered but never triggered

---

## Issue #2: Sidebar Scrollbar - White Space

### File Paths
```
/Users/cadenchiang/Desktop/act-prep-react/src/components/Sidebar.js (Lines 36-48)
/Users/cadenchiang/Desktop/act-prep-react/src/components/AllLessonsNavigator.js (has similar styles)
```

### The Problem
The scrollbar track has `background: 'transparent'` which reveals the white sidebar background as empty space, creating a gap-like appearance.

### Code Location
**Sidebar.js Lines 36-48**:
```javascript
'&::-webkit-scrollbar-track': {
  background: 'transparent'  // <-- THIS IS THE PROBLEM
}
```

### Root Cause
Transparent track background allows sidebar background to show through, appearing as white space instead of a scrollbar track.

### Status
**BROKEN** - Visual quality issue

---

## Issue #3: Learning Path - Edit Functionality

### File Paths
```
/Users/cadenchiang/Desktop/act-prep-react/src/components/app/CourseContent.jsx (Lines 11-36, 152-189)
/Users/cadenchiang/Desktop/act-prep-react/src/layouts/AppLayout.jsx (Lines 226-266, 88-167)
/Users/cadenchiang/Desktop/act-prep-react/src/components/auth/OnboardingQuestionnaire.jsx (Lines 15-22)
/Users/cadenchiang/Desktop/act-prep-react/src/services/api/learning-path.service.js
```

### The Problem
CourseContent.jsx displays hardcoded test date (60 days from now) and example scores instead of user's actual onboarding data. User goals are collected during onboarding and saved to Supabase but never loaded or displayed.

### Code Location
**CourseContent.jsx Lines 26-36** (HARDCODED):
```javascript
const sectionStrengths = {
  'English': 75,
  'Math': 62,
  'Reading': 88,
  'Science': 70
};

const testDate = new Date();
testDate.setDate(testDate.getDate() + 60);
const daysUntilTest = 60;
```

**OnboardingQuestionnaire.jsx Lines 15-22** (DATA COLLECTED BUT NOT USED):
```javascript
const [answers, setAnswers] = useState({
  testDate: '',
  grade: '',
  targetScore: '',
  studyTimePerWeek: '',
  concernedSections: [],
  studyExperience: ''
});
```

**AppLayout.jsx Lines 226-266** (DATA SAVED TO DATABASE):
```javascript
const handleOnboardingComplete = async (data, action = false) => {
  // ... saves to Supabase:
  await supabase
    .from('profiles')
    .update({
      onboarding_completed: true,
      onboarding_data: data  // <-- User goals are stored here
    })
    .eq('id', user.id);
};
```

### Root Cause
1. CourseContent.jsx doesn't fetch or use user goals
2. Goals are saved to Supabase but never loaded in AppLayout
3. Goals are not passed through Outlet context
4. No state management for user goals in AppLayout

### Status
**INCOMPLETE** - Data flow partially implemented

---

## All Files Referenced

### Main Components
1. `/Users/cadenchiang/Desktop/act-prep-react/src/layouts/AppLayout.jsx` - App wrapper, state
2. `/Users/cadenchiang/Desktop/act-prep-react/src/components/app/LessonsContent.jsx` - Lessons view
3. `/Users/cadenchiang/Desktop/act-prep-react/src/components/app/CourseContent.jsx` - Learning path
4. `/Users/cadenchiang/Desktop/act-prep-react/src/components/Sidebar.js` - Sidebar navigation
5. `/Users/cadenchiang/Desktop/act-prep-react/src/components/AllLessonsNavigator.js` - Lesson navigator

### Styling
6. `/Users/cadenchiang/Desktop/act-prep-react/src/styles/app/lessons-items.styles.js` - Lesson item styles
7. `/Users/cadenchiang/Desktop/act-prep-react/src/styles/app/modal.styles.js` - Modal styles
8. `/Users/cadenchiang/Desktop/act-prep-react/src/styles/app/layout.styles.js` - Layout styles
9. `/Users/cadenchiang/Desktop/act-prep-react/src/styles/App.styles.js` - Style imports

### Auth & Services
10. `/Users/cadenchiang/Desktop/act-prep-react/src/components/auth/OnboardingQuestionnaire.jsx` - Onboarding form
11. `/Users/cadenchiang/Desktop/act-prep-react/src/services/api/learning-path.service.js` - Learning path logic
12. `/Users/cadenchiang/Desktop/act-prep-react/src/hooks/useTermTooltips.js` - Term tooltips
13. `/Users/cadenchiang/Desktop/act-prep-react/src/components/TermDefinition.js` - Term definition component

---

## Documentation Generated

Three detailed documents have been created in your project root:

1. **CODEBASE_FINDINGS.md** (13KB) - Comprehensive technical analysis
   - Full context for each issue
   - Code structure explanation
   - Data flow diagrams

2. **QUICK_REFERENCE.md** - Quick lookup guide
   - Problem summary
   - File locations
   - Quick fixes
   - Testing checklist

3. **CODE_SNIPPETS_COMPARISON.md** - Before/after code examples
   - Current broken code
   - Needed fixes
   - Copy-paste ready solutions

---

## Quick Actions

### Fix Popup (5 minutes)
1. Open `/src/components/app/LessonsContent.jsx`
2. Find `renderLessonCard` function (line 101)
3. Add hover handler to `keyTermsTags` div (see CODE_SNIPPETS_COMPARISON.md)
4. Repeat for `renderPracticeCard` function (line 144)

### Fix Scrollbar (1 minute)
1. Open `/src/components/Sidebar.js`
2. Find `&::-webkit-scrollbar-track` (line 40)
3. Change `background: 'transparent'` to `background: '#f9fafb'`

### Add Learning Path Features (30 minutes)
1. Load user goals in AppLayout useEffect
2. Add to Outlet context
3. Update CourseContent to display actual values
4. Optional: Create EditLearningPathModal component

---

## Next Steps

1. Review **CODEBASE_FINDINGS.md** for complete technical context
2. Check **QUICK_REFERENCE.md** for implementation checklist
3. Use **CODE_SNIPPETS_COMPARISON.md** as copy-paste reference
4. Fix issues in priority order (Popup, Scrollbar, Learning Path)
5. Test each fix using the testing checklists provided

