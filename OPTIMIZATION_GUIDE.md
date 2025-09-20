# React App Optimization for Token Efficiency

## Problem
The current `App.js` file is 48KB+ containing everything in one massive component, causing high token usage when AI needs to read/modify it.

## Solution: Modular Architecture

### 1. Component Structure Created
```
src/
├── components/
│   ├── Header.js          (~1KB - logo, timer, submit button)
│   ├── Navigation.js      (~2KB - prev/next buttons)
│   ├── Timer.js          (~1KB - countdown timer)
│   ├── PassageSection.js  (~3KB - passages with switching)
│   ├── QuestionsSection.js (~4KB - questions with navigation)
│   └── DiagnosticTest.js  (~8KB - main test logic)
├── data/
│   ├── testData.js       (~5KB - questions and passages)
│   └── analytics.js      (~2KB - scoring logic)
├── hooks/
│   ├── useTimer.js       (~1KB - timer logic)
│   └── useTestState.js   (~2KB - test state management)
└── utils/
    └── testUtils.js      (~1KB - helper functions)
```

### 2. Benefits
- **Targeted Editing**: Only read the specific component you need to modify
- **Reduced Context**: Each file is 1-8KB instead of 48KB
- **Better Organization**: Related code is grouped together
- **Faster Development**: Less scrolling, easier to find specific functionality

### 3. Usage Examples

**Before (reading entire App.js):**
```
Read App.js → 48KB, 1200+ lines
```

**After (targeted component reading):**
```
Read Timer.js → 1KB, ~30 lines
Read Navigation.js → 2KB, ~60 lines
```

### 4. Implementation Plan
1. ✅ Create folder structure
2. ✅ Extract Timer component
3. ✅ Extract Navigation component
4. ✅ Extract Header component
5. ✅ Create simplified App.js alternative
6. 🚧 Extract remaining components (in progress)
7. 📝 Move data to separate files
8. 📝 Update main App.js to use new structure

### 5. Quick Switch
To use the simplified version immediately:
```bash
mv src/App.js src/App.backup.js
mv src/App.simple.js src/App.js
```

### 6. Token Savings
- **Before**: Reading full App.js = ~1500 tokens
- **After**: Reading specific component = ~100-300 tokens
- **Savings**: 80-90% reduction in context size for targeted edits