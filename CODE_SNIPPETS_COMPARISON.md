# Code Snippets - Current vs Needed Changes

## Issue 1: Key Terms Popup Hover Handlers

### CURRENT CODE (BROKEN)
**File**: `/src/components/app/LessonsContent.jsx` (Lines 101-141)

```javascript
const renderLessonCard = (lesson) => {
  const status = getLessonStatus(lesson.id);
  const isGridView = viewMode === 'grid';

  const formatDuration = (duration) => {
    if (!duration) return '';
    return duration.replace(/\s*minutes?$/i, ' min');
  };

  return (
    <div
      key={lesson.id}
      className={`${isGridView ? classes.lessonCard : classes.lessonCardListView} ${status}`}
      onClick={() => openLesson(lesson.id, 'review')}
      onMouseLeave={() => setHoveredMoreTag(null)}  // <-- ONLY THIS, NO ENTER!
    >
      <div className={classes.lessonStatus}>
        <StatusIcon status={status} />
      </div>
      <div className={classes.lessonInfo}>
        {lesson.chapterNum && (
          <div className={classes.lessonChapter}>Topic {lesson.chapterNum}</div>
        )}
        <div className={classes.lessonTitle}>{lesson.title}</div>
        {lesson.keyTerms && lesson.keyTerms.length > 0 && (
          <div className={classes.keyTermsTags}>  {/* <-- NO HOVER HANDLERS HERE */}
            {lesson.keyTerms.slice(0, 2).join(' • ')}
            {lesson.keyTerms.length > 2 && ` • +${lesson.keyTerms.length - 2} more`}
          </div>
        )}
        {lesson.duration && (
          <div style={{...}}>
            {/* duration display */}
          </div>
        )}
      </div>
    </div>
  );
};
```

### NEEDED CODE (FIXED)

```javascript
const renderLessonCard = (lesson) => {
  const status = getLessonStatus(lesson.id);
  const isGridView = viewMode === 'grid';

  const formatDuration = (duration) => {
    if (!duration) return '';
    return duration.replace(/\s*minutes?$/i, ' min');
  };

  // NEW: Handle more tag hover
  const handleMoreTagHover = (e) => {
    if (lesson.keyTerms && lesson.keyTerms.length > 2) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMoreTagPosition({
        top: rect.top,
        left: rect.left + rect.width / 2
      });
      setHoveredMoreTag({
        keyTerms: lesson.keyTerms.slice(2)
      });
    }
  };

  return (
    <div
      key={lesson.id}
      className={`${isGridView ? classes.lessonCard : classes.lessonCardListView} ${status}`}
      onClick={() => openLesson(lesson.id, 'review')}
      onMouseLeave={() => setHoveredMoreTag(null)}
    >
      <div className={classes.lessonStatus}>
        <StatusIcon status={status} />
      </div>
      <div className={classes.lessonInfo}>
        {lesson.chapterNum && (
          <div className={classes.lessonChapter}>Topic {lesson.chapterNum}</div>
        )}
        <div className={classes.lessonTitle}>{lesson.title}</div>
        {lesson.keyTerms && lesson.keyTerms.length > 0 && (
          <div 
            className={classes.keyTermsTags}
            onMouseEnter={handleMoreTagHover}  // <-- ADD THIS
            onMouseLeave={() => setHoveredMoreTag(null)}  // <-- ADD THIS
          >
            {lesson.keyTerms.slice(0, 2).join(' • ')}
            {lesson.keyTerms.length > 2 && ` • +${lesson.keyTerms.length - 2} more`}
          </div>
        )}
        {lesson.duration && (
          <div style={{...}}>
            {/* duration display */}
          </div>
        )}
      </div>
    </div>
  );
};
```

**KEY CHANGES**:
1. Added `handleMoreTagHover` function that:
   - Gets the bounding rect of the more tag element
   - Calculates position for popup
   - Sets the hovered state with remaining terms
2. Added `onMouseEnter={handleMoreTagHover}` to keyTermsTags div
3. Added `onMouseLeave={() => setHoveredMoreTag(null)}` to keyTermsTags div (in addition to card)

**Note**: Apply same changes to `renderPracticeCard` function (starting line 144)

---

## Issue 2: Sidebar Scrollbar Styling

### CURRENT CODE (BROKEN)
**File**: `/src/components/Sidebar.js` (Lines 36-48)

```javascript
const useStyles = createUseStyles({
  // ... other styles ...
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
      background: 'transparent'  // <-- PROBLEM HERE
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.08)',
      borderRadius: '2px',
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.12)'
      }
    },
    // ... media queries ...
  }
});
```

### NEEDED CODE (FIXED)

```javascript
const useStyles = createUseStyles({
  // ... other styles ...
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
      background: '#f9fafb'  // <-- CHANGED: Subtle light gray
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.08)',
      borderRadius: '2px',
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.12)'
      }
    },
    // ... media queries ...
  }
});
```

**KEY CHANGES**:
- Changed `background: 'transparent'` to `background: '#f9fafb'`
- Alternative: `background: '#ffffff'` to exactly match sidebar

---

## Issue 3: Learning Path - Display User Goals

### CURRENT CODE (BROKEN)
**File**: `/src/components/app/CourseContent.jsx` (Lines 11-36)

```javascript
const CourseContent = () => {
  const classes = useCourseStyles();
  const {
    lessonProgress = {},
    lessonStructure = [],
    onLessonOpen,
    onTestOpen
  } = useOutletContext();

  // Calculate statistics
  const totalLessons = lessonStructure.length;
  const completedLessons = Object.values(lessonProgress).filter(s => s === 'completed').length;
  const inProgressLessons = Object.values(lessonProgress).filter(s => s === 'in-progress').length;

  // Calculate section strengths (example data - would come from test results in real app)
  const sectionStrengths = {
    'English': 75,
    'Math': 62,
    'Reading': 88,
    'Science': 70
  };

  // Calculate test date (example: 60 days from now)  <-- HARDCODED!
  const testDate = new Date();
  testDate.setDate(testDate.getDate() + 60);
  const daysUntilTest = 60;

  // ... rest of component ...
```

### NEEDED CODE (FIXED)

```javascript
const CourseContent = () => {
  const classes = useCourseStyles();
  const {
    lessonProgress = {},
    lessonStructure = [],
    onLessonOpen,
    onTestOpen,
    userGoals = {}  // <-- ADD THIS to context
  } = useOutletContext();

  // Calculate statistics
  const totalLessons = lessonStructure.length;
  const completedLessons = Object.values(lessonProgress).filter(s => s === 'completed').length;
  const inProgressLessons = Object.values(lessonProgress).filter(s => s === 'in-progress').length;

  // Calculate section strengths - would come from diagnostic
  const sectionStrengths = {
    'English': userGoals.englishScore || 75,
    'Math': userGoals.mathScore || 62,
    'Reading': userGoals.readingScore || 88,
    'Science': userGoals.scienceScore || 70
  };

  // Use actual test date from user goals
  const testDate = userGoals.testDate ? new Date(userGoals.testDate) : new Date();
  const daysUntilTest = userGoals.testDate 
    ? Math.floor((new Date(userGoals.testDate) - new Date()) / (1000 * 60 * 60 * 24))
    : 60;

  // ... rest of component ...
```

### IN APPLAYOUT.JSX

**File**: `/src/layouts/AppLayout.jsx` (Lines 88-167)

Add to the `checkOnboardingAndLoadProgress` useEffect:

```javascript
useEffect(() => {
  const checkOnboardingAndLoadProgress = async () => {
    console.log('🔍 AppLayout: Checking onboarding status...', { hasUser: !!user });

    if (!user) {
      setOnboardingComplete(null);
      return;
    }

    try {
      // ... existing demo mode check ...
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('onboarding_completed, onboarding_data')  // <-- Already selecting this
        .eq('id', user.id)
        .maybeSingle();

      // ... rest of checks ...

      if (!profile) {
        // ... create profile ...
        setOnboardingComplete(false);
        return;
      }

      // Set onboarding status from profile
      console.log('📊 Profile onboarding status:', profile?.onboarding_completed);
      setOnboardingComplete(profile?.onboarding_completed || false);

      // Load progress from database
      if (profile?.onboarding_completed) {
        console.log('📚 Loading lesson progress...');

        // Migrate localStorage progress if it exists
        await migrateLocalStorageProgress(user.id);

        // Load all progress from database
        const progress = await getAllProgress(user.id);
        setLessonProgress(progress);
        console.log(`✅ Loaded progress for ${Object.keys(progress).length} lessons`);
        
        // NEW: Store user goals from onboarding data in state
        if (profile.onboarding_data) {
          // Map onboarding answers to goals format
          const userGoals = {
            testDate: profile.onboarding_data.testDate || null,
            targetScore: profile.onboarding_data.targetScore || '30-33',
            studyTimePerWeek: profile.onboarding_data.studyTimePerWeek || '5-7',
            concernedSections: profile.onboarding_data.concernedSections || [],
            grade: profile.onboarding_data.grade || ''
          };
          // Store in context or state as needed
          console.log('📋 User goals loaded:', userGoals);
        }
      }
    } catch (error) {
      console.error('Error in checkOnboardingAndLoadProgress:', error);
      setOnboardingComplete(false);
    }
  };

  checkOnboardingAndLoadProgress();
}, [user]);
```

Then add to Outlet context (around line 316):

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
  setHoveredMoreTag,
  setMoreTagPosition,
  setDiagnosticTestOpen,
  userGoals  // <-- ADD THIS
}} />
```

---

## Summary of Changes

| Issue | File | What to Add/Change | Difficulty |
|-------|------|-------------------|------------|
| Popup | LessonsContent.jsx | Add hover handlers to keyTermsTags | Easy |
| Scrollbar | Sidebar.js | Change track background color | Trivial |
| Learning Path | AppLayout.jsx | Load user goals from Supabase | Medium |
| Learning Path | CourseContent.jsx | Display user goals instead of hardcoded | Medium |

