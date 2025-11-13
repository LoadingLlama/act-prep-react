# ACT Prep React Codebase Analysis

## Overview
This document provides a comprehensive breakdown of the three main areas you need to understand and fix:

1. Key Terms Popup (Glitching/Flickering)
2. Sidebar Scrollbar (White Space Issue)
3. Learning Path Component (Edit Functionality)

---

## 1. KEY TERMS POPUP - Hover Implementation

### Location & Structure

#### Main Files Involved:
1. **AppLayout.jsx** - Central state management for hover logic
2. **LessonsContent.jsx** - Component that triggers hover state
3. **App.styles.js** - Style imports
4. **lessons-items.styles.js** - Actual popup styling

### State Management in AppLayout.jsx

Lines 54-55 in `/src/layouts/AppLayout.jsx`:
```javascript
const [hoveredMoreTag, setHoveredMoreTag] = useState(null);
const [moreTagPosition, setMoreTagPosition] = useState({ top: 0, left: 0 });
```

These states are passed to child components via Outlet context (lines 316-331):
```javascript
<Outlet context={{
  lessonProgress,
  lessonStructure,
  lessonContent,
  expandedSections,
  hoveredMoreTag,
  onNavigate: handleNavigate,
  onLessonOpen: openLesson,
  onTestOpen: openPracticeTest,
  toggleSection,
  getLessonStatus,
  updateLessonProgress,
  setHoveredMoreTag,        // <-- Function to update hover state
  setMoreTagPosition,        // <-- Function to update position
  setDiagnosticTestOpen
}} />
```

### Popup Rendering in AppLayout.jsx

Lines 386-405 in `/src/layouts/AppLayout.jsx`:
```javascript
{/* Key Terms Popup */}
{hoveredMoreTag && (
  <div
    className={classes.keyTermsPopup}
    style={{
      top: `${moreTagPosition.top}px`,
      left: `${moreTagPosition.left}px`,
      transform: 'translate(-50%, -100%)'
    }}
  >
    <div className={classes.keyTermsPopupTitle}>Key Terms</div>
    <div className={classes.keyTermsPopupList}>
      {hoveredMoreTag.keyTerms?.map((term, index) => (
        <div key={index} className={classes.keyTermsPopupItem}>
          {term}
        </div>
      ))}
    </div>
  </div>
)}
```

**PROBLEM IDENTIFIED**: The popup is rendered when `hoveredMoreTag` is truthy, but there's no triggering mechanism visible in LessonsContent. The state is set but never actually triggered by hover events on the "+X more" text.

### Hover Handlers in LessonsContent.jsx

Lines 106 & 162 in `/src/components/app/LessonsContent.jsx`:
```javascript
// In renderLessonCard:
onMouseLeave={() => setHoveredMoreTag(null)}

// In renderPracticeCard:
onMouseLeave={() => setHoveredMoreTag(null)}
```

**ISSUE**: Only `onMouseLeave` is defined, but there's no `onMouseEnter` or hover handler that actually sets the `hoveredMoreTag` state with the lesson's key terms!

Lines 116-121 show the key terms display:
```javascript
{lesson.keyTerms && lesson.keyTerms.length > 0 && (
  <div className={classes.keyTermsTags}>
    {lesson.keyTerms.slice(0, 2).join(' • ')}
    {lesson.keyTerms.length > 2 && ` • +${lesson.keyTerms.length - 2} more`}
  </div>
)}
```

The "+X more" text is part of a plain div with no hover handlers!

### Popup Styling

File: `/src/styles/app/lessons-items.styles.js`, lines 197-242:

```javascript
keyTermsPopup: {
  position: 'fixed',
  background: 'white',
  borderRadius: '6px',
  padding: '0.5rem 0.65rem',
  zIndex: 2000,
  pointerEvents: 'none',        // <-- Cannot interact with it
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.04)',
  minWidth: '160px',
  maxWidth: '220px',
  '&::after': {                  // Arrow pointing down
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid white'
  }
},
keyTermsPopupTitle: {
  fontSize: '0.6rem',
  fontWeight: '600',
  color: '#9ca3af',
  marginBottom: '0.4rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
},
keyTermsPopupList: {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem'
},
keyTermsPopupItem: {
  fontSize: '0.7rem',
  color: '#374151',
  padding: '0.2rem 0',
  lineHeight: '1.3',
  borderBottom: '1px solid #f3f4f6',
  '&:last-child': {
    borderBottom: 'none'
  }
}
```

### ROOT CAUSES OF FLICKERING:

1. **Missing Hover Handler**: There's no `onMouseEnter` handler that sets `hoveredMoreTag` when hovering over the "+X more" text
2. **Component Re-renders**: When lesson cards re-render, if `hoveredMoreTag` is set, it might be getting cleared due to state changes
3. **Event Propagation**: The `onMouseLeave` on the card container will clear the hover state even if user hovers over the popup
4. **No Debouncing**: No debounce or delay to prevent rapid toggling

---

## 2. SIDEBAR SCROLLBAR - White Space Issue

### Location

File: `/src/components/Sidebar.js`, lines 36-48:

```javascript
sidebar: {
  position: 'fixed',
  left: 0,
  top: 0,
  width: '240px',
  height: '100vh',
  background: '#ffffff',
  padding: '0',
  overflowY: 'auto',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #e5e7eb',
  transition: 'transform 0.3s ease',
  '&::-webkit-scrollbar': {
    width: '4px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.08)',
    borderRadius: '2px',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.12)'
    }
  },
  '@media (max-width: 1024px)': {
    transform: 'translateX(-100%)',
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
    '&.open': {
      transform: 'translateX(0)'
    }
  }
}
```

### Issue Analysis:

**Problem**: The sidebar has a transparent track (background) for the scrollbar, which shows white space where the scrollbar track should be. The scrollbar thumb is quite small (4px) with low opacity (0.08 alpha).

**Visual Result**: 
- 4px wide track area is visible with transparent background
- Shows the white sidebar background through the track area
- Creates a "gap" appearance on the right side of the sidebar when scrollable

### Where Scrollbar is Used in Lessons View:

In the lesson modal (AllLessonsNavigator.js), the sidebar can become scrollable when there are many lessons listed. The scrollbar styling applies to the navigator container.

File: `/src/components/AllLessonsNavigator.styles.js` - likely has similar scrollbar styles

---

## 3. LEARNING PATH COMPONENT - Edit Functionality

### Current Learning Path Display

File: `/src/components/app/CourseContent.jsx` - This is the main "Learning Path" view

**Stats Display (Lines 152-189)**:
```javascript
<div className={classes.statsGrid}>
  {/* Test Date */}
  <div className={classes.statCard}>
    <div className={classes.statLabel}>Test Date</div>
    <div className={classes.statValue}>{testDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
    <div className={classes.statDetail}>{daysUntilTest} days left</div>
  </div>

  {/* Completed */}
  <div className={classes.statCard}>
    <div className={classes.statLabel}>Completed</div>
    <div className={classes.statValue}>{completedLessons} / {totalLessons}</div>
  </div>

  {/* English, Math, Reading, Science scores */}
  {/* Each section gets a stat card */}
</div>
```

**Current Data Flow**:

1. **Test Date**: Hardcoded to 60 days from now (line 35):
   ```javascript
   const testDate = new Date();
   testDate.setDate(testDate.getDate() + 60);
   const daysUntilTest = 60;
   ```

2. **Section Scores**: Hardcoded example data (lines 26-31):
   ```javascript
   const sectionStrengths = {
     'English': 75,
     'Math': 62,
     'Reading': 88,
     'Science': 70
   };
   ```

### User Goals Data Location

User goals are collected in OnboardingQuestionnaire.jsx but NOT currently used in CourseContent!

File: `/src/components/auth/OnboardingQuestionnaire.jsx` (Lines 15-22):
```javascript
const [answers, setAnswers] = useState({
  testDate: '',              // User's selected test date
  grade: '',                 // User's grade level
  targetScore: '',           // Target ACT score (e.g., '30-33')
  studyTimePerWeek: '',      // Study time (e.g., '5-7')
  concernedSections: [],     // Which sections they're weak in
  studyExperience: ''        // Their prep experience level
});
```

### Where Goals Are Stored

File: `/src/layouts/AppLayout.jsx` (Lines 226-266) - `handleOnboardingComplete`:
```javascript
const handleOnboardingComplete = async (data, action = false) => {
  // data contains the user's answers
  // Saved to Supabase:
  await supabase
    .from('profiles')
    .update({
      onboarding_completed: true,
      onboarding_data: data   // <-- Stored here!
    })
    .eq('id', user.id);
};
```

### Learning Path Service

File: `/src/services/api/learning-path.service.js`:

The service already supports generating learning paths with user goals:

```javascript
async generateLearningPath(userId, goals, diagnosticAnalysis) {
  // goals parameter should contain:
  // - exam_date
  // - daily_study_minutes
  // - target_score
  // - study_days_per_week
  
  const pathData = {
    user_id: userId,
    path_name: `ACT Prep - ${goals.exam_date ? new Date(goals.exam_date).toLocaleDateString() : 'Custom'}`,
    exam_date: goals.exam_date,
    daily_study_minutes: goals.daily_study_minutes || 30,
    target_score: goals.target_score,
    current_estimated_score: diagnosticAnalysis?.overall_score || 0,
    is_active: true,
    completion_percentage: 0
  };
  
  // ... generates learning path with scheduled lessons
}
```

### What Needs to be Done for Edit Functionality

1. **Fetch user's onboarding_data** from Supabase profiles table
2. **Display in CourseContent** instead of hardcoded values
3. **Add Edit Button** to each stat card
4. **Create Edit Modal** to modify test date, target score, etc.
5. **Update Supabase** when user makes changes
6. **Regenerate Learning Path** if goals change significantly

### Data Structure Mapping

**From Onboarding → Learning Path**:
- `testDate` → `exam_date`
- `targetScore` (e.g., '30-33') → `target_score`
- `studyTimePerWeek` (e.g., '5-7') → `daily_study_minutes` (calculate from weekly)
- `concernedSections` → Used for diagnostic analysis
- `grade` → Context for content pacing

---

## File Paths Summary

### Key Files to Modify:

**1. Key Terms Popup Fix**:
- `/src/layouts/AppLayout.jsx` - Central state (Already correct)
- `/src/components/app/LessonsContent.jsx` - ADD hover handlers
- `/src/styles/app/lessons-items.styles.js` - Styling (Already correct)

**2. Scrollbar Fix**:
- `/src/components/Sidebar.js` - Update scrollbar styling
- `/src/components/AllLessonsNavigator.styles.js` - Similar styling

**3. Learning Path Edit Feature**:
- `/src/components/app/CourseContent.jsx` - Display user data, add edit buttons
- `/src/layouts/AppLayout.jsx` - Fetch onboarding_data from Supabase
- Create new component: `/src/components/app/EditLearningPathModal.jsx` - Edit dialog
- `/src/services/api/learning-path.service.js` - Already has support, just needs to be called

### Supporting Files Referenced:
- `/src/components/auth/OnboardingQuestionnaire.jsx` - User data collection
- `/src/styles/app/lessons-content.styles.js` - Component styles
- `/src/styles/app/course.styles.js` - Learning path view styles

---

## Technical Details for Each Fix

### Fix 1: Key Terms Popup

**Root Cause**: Missing hover event handlers on the "+X more" text

**Solution**:
1. Wrap the "+X more" text in a span with hover handlers
2. Add `onMouseEnter` to set `hoveredMoreTag` with lesson data
3. Calculate popup position based on element position
4. Add `onMouseLeave` to clear the hover state
5. Optional: Add debounce to prevent rapid flickering

**Code Pattern**:
```javascript
const handleMoreTagHover = (e, lesson) => {
  const rect = e.currentTarget.getBoundingClientRect();
  setMoreTagPosition({
    top: rect.top,
    left: rect.left + rect.width / 2
  });
  setHoveredMoreTag({
    keyTerms: lesson.keyTerms.slice(2)
  });
};

onMouseEnter={(e) => handleMoreTagHover(e, lesson)}
onMouseLeave={() => setHoveredMoreTag(null)}
```

### Fix 2: Sidebar Scrollbar

**Root Cause**: Transparent scrollbar track shows white background as "white space"

**Solution**:
1. Change track background to a subtle gray or light shade
2. OR: Set track background to match sidebar background (#ffffff)
3. Increase scrollbar thumb width for better visibility
4. Consider using `::-webkit-scrollbar-corner` styling for consistency

**Code Pattern**:
```javascript
'&::-webkit-scrollbar-track': {
  background: '#f9fafb'  // Light gray instead of transparent
},
'&::-webkit-scrollbar-thumb': {
  background: 'rgba(0, 0, 0, 0.12)',
  borderRadius: '2px',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.2)'
  }
}
```

### Fix 3: Learning Path Edit Functionality

**Current State**: Hardcoded values, no user data display

**Solution Steps**:
1. Load `onboarding_data` from Supabase in AppLayout useEffect
2. Pass through context to CourseContent
3. Display actual test date and target score (not hardcoded)
4. Add Edit button with pencil icon
5. Create modal component with form fields
6. Update Supabase when user saves changes
7. Optionally regenerate learning path if critical fields change

**Data Flow**:
```
Supabase (profiles.onboarding_data)
  ↓
AppLayout (useEffect loads data)
  ↓
Outlet context
  ↓
CourseContent (displays & allows edit)
  ↓
EditLearningPathModal (form component)
  ↓
Back to Supabase (update)
```

