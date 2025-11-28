# Code Cleanup & Refactoring Plan

## ✅ Phase 1 Complete: Remove Unused Files
**Status: COMPLETE**
- Deleted 13 unused files
- Removed 7,563 lines of dead code
- App compiles successfully with no errors

### Files Deleted:
1. CompleteLandingPage.jsx (3,099 lines)
2. lessonQuizData.js (1,472 lines)
3. DatabaseAnalysis.jsx (725 lines)
4. DiagnosticTestUI.jsx (599 lines)
5. CompleteLandingPageRefactored.jsx (119 lines)
6. quizData.js (147 lines)
7. AppStyles.js (297 lines) - duplicate
8. LessonStyles.js (342 lines)
9. lessonConverter.js (477 lines)
10. lessonEnhancer.js (197 lines)
11. quizDataProvider.js (58 lines)
12. getQuizData.js (16 lines)
13. config/supabase.js (15 lines)

## 🔄 Remaining Work: 27 Files Over 300 Lines

### Large Files Requiring Splitting (>700 lines):
1. **App.styles.js** - 972 lines
   - Split into: layout.styles, header.styles, navigation.styles, lessons.styles, modal.styles
   
2. **LandingPage.jsx** - 957 lines
   - Split into components: Hero, Features, Stats, Testimonials, CTA
   
3. **ProgressiveLessonRenderer.js** - 891 lines
   - Extract: LessonHeader, LessonNav, ContentRenderer, ProgressTracker
   
4. **Home.js** - 823 lines
   - Extract: DashboardHeader, ProgressCard, RecommendedLessons, Calendar widget
   
5. **OnboardingQuestionnaire.jsx** - 758 lines
   - Extract: QuestionCard, ProgressBar, CompletionScreen
   
6. **CourseContent.jsx** - 746 lines
   - Extract: PathCard, MilestonesList, ProgressIndicator

### Medium Files (400-700 lines):
7. ResultsPage.jsx - 567 lines
8. practiceTests.service.js - 565 lines
9. ProgressiveLessonRenderer.styles.js - 511 lines
10. LessonsContent.jsx - 484 lines
11. AllLessonsNavigator.js - 462 lines
12. PracticeTestPage.jsx - 448 lines
13. AppLayout.jsx - 404 lines
14. InteractiveQuiz.js - 404 lines

### Small Files (300-400 lines):
15. lessonContent.schema.js - 390 lines
16. AIChat.styles.js - 359 lines
17. ExampleCard.jsx - 357 lines
18. AIChat.js - 341 lines
19. LessonEditor.jsx - 336 lines
20. Calendar.js - 334 lines
21. quiz.styles.js - 332 lines
22. TestsContent.jsx - 330 lines
23. useTermTooltips.js - 325 lines
24. SettingsPage.jsx - 323 lines
25. ProfilePage.jsx - 322 lines
26. InteractiveQuiz.styles.js - 316 lines
27. PhotomathSolution.js - 306 lines

## 🎯 Strategy:
1. Split files using component extraction pattern
2. Create subdirectories for related modules
3. Maintain exact same functionality (no UI changes)
4. Test after each major split
5. Commit incrementally for easy rollback

## 📊 Metrics:
- **Total files to split:** 27
- **Total lines to refactor:** 25,392
- **Target:** All files < 300 lines
- **Estimated new files needed:** 60-80

## 🔧 Next Steps:
1. Split largest files first (App.styles, LandingPage, etc.)
2. Remove unused imports/variables  
3. Clean console.logs
4. Final testing
5. Merge to main
