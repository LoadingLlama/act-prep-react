# ACT Prep Test System - Developer Documentation

## Overview
This is a comprehensive ACT test preparation system with four main test sections: English, Math, Reading, and Science. The system has been fully optimized for maintainability, performance, and code reusability.

## Architecture

### 🗂️ File Structure
```
public/
├── shared-styles.css          # Global CSS framework
├── test-utils.js             # Shared JavaScript utilities
├── english-test.html         # English section (50 questions, 35 min)
├── math-test.html           # Math section (45 questions, 60 min)
├── reading-test.html        # Reading section (36 questions, 40 min)
├── science-test.html        # Science section (40 questions, 40 min)
├── diagnostic-test.html     # Test launcher/overview
├── analytics.html           # Comprehensive results analysis
└── index.html              # Main landing page
```

### 🎨 CSS Framework (`shared-styles.css`)

#### CSS Custom Properties
All colors, spacing, fonts, and other design tokens are defined as CSS custom properties:
```css
:root {
    --primary-color: #1a1a1a;
    --success-color: #10b981;
    --spacing-md: 1rem;
    --font-lg: 1.125rem;
    /* ... etc */
}
```

#### Reusable Component Classes
- **Layout**: `.test-container`, `.test-header`, `.test-content`
- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-error`
- **Navigation**: `.nav-button`, `.navigation`
- **Modals**: `.modal`, `.modal-content`, `.modal-header`
- **Question Interface**: `.question`, `.choices`, `.choice`, `.flag-button`
- **Utility Classes**: `.text-center`, `.hidden`, `.mb-3`, etc.

### 🧰 JavaScript Framework (`test-utils.js`)

#### ACTTestUtils Class
The main utility class that handles all test functionality:

```javascript
const testUtils = new ACTTestUtils();

// Initialize test
testUtils.setupTest({
    sectionName: 'English',
    totalQuestions: 50,
    duration: 35
});
```

#### Key Features
- **Data Persistence**: Auto-saves to localStorage every 30 seconds
- **Navigation**: Question-by-question navigation with keyboard shortcuts
- **Flagging**: Flag questions for review
- **Timing**: Per-question timing tracking and section timers
- **Modal Interface**: Question navigator/index
- **Answer Tracking**: Comprehensive answer storage and retrieval

#### Keyboard Shortcuts
- `←/→`: Navigate between questions
- `F`: Toggle flag on current question
- `Space`: Open question navigator
- `Esc`: Close modal

#### Data Structure
```javascript
// localStorage keys used:
// - [section]TestData: Current test session data
// - [section]TestResults: Final results after completion

{
    answers: {
        q1: { answer: 'A', timestamp: 1234567890 },
        q2: { answer: 'B', timestamp: 1234567891 }
    },
    timeSpentPerQuestion: {
        q1: 45000,  // milliseconds
        q2: 32000
    },
    flaggedQuestions: ['q5', 'q12', 'q23'],
    currentQuestion: 15,
    sectionName: 'English',
    totalQuestions: 50
}
```

## Test Flow

### 🔄 Navigation Flow
1. **Diagnostic Test** (`diagnostic-test.html`) → Test overview and launcher
2. **English Test** (`english-test.html`) → 50 questions, 35 minutes
3. **Math Test** (`math-test.html`) → 45 questions, 60 minutes
4. **Reading Test** (`reading-test.html`) → 36 questions, 40 minutes
5. **Science Test** (`science-test.html`) → 40 questions, 40 minutes
6. **Analytics** (`analytics.html`) → Comprehensive results and recommendations

### 💾 Data Persistence
- **During Test**: Auto-saves progress every 30 seconds + on navigation
- **Between Sections**: Saves final results for each completed section
- **Analytics**: Collects all section results for comprehensive analysis

## Development Guidelines

### 🏗️ Adding New Questions
Each test file uses a dynamic question generator for demo purposes. To add real questions:

1. Replace the `generateRemainingQuestions()` function
2. Add static HTML for each question following this pattern:
```html
<div class="question" id="question1">
    <div class="question-text">
        <strong>1.</strong> Your question text here
    </div>
    <ul class="choices">
        <li class="choice" data-choice="A">
            <strong>A.</strong> Choice A text
        </li>
        <!-- ... more choices -->
    </ul>
</div>
```

### 🎯 Choice Patterns
- **Odd-numbered questions**: A, B, C, D
- **Even-numbered questions**: F, G, H, J
- **Math questions**: A, B, C, D, E (odds) / F, G, H, J, K (evens)

### 🔧 Customizing Styles
1. **Global changes**: Edit `shared-styles.css` CSS custom properties
2. **Section-specific**: Add styles to the `<style>` section in each test file
3. **Component changes**: Modify the base classes in `shared-styles.css`

### 📊 Analytics Integration
The analytics page automatically collects data from all test sections. To modify analytics:

1. **ACTAnalytics.collectAllTestResults()**: Gathers all section data
2. **Section results**: Calculated automatically from answers + timing
3. **Recommendations**: Algorithm-based suggestions in `generateRecommendations()`

## Performance Optimizations

### ✅ Code Reduction
- **84% reduction**: From 6,648 lines to 1,081 lines
- **Eliminated duplication**: Single CSS file vs. repeated styles
- **Modular JavaScript**: Shared utilities vs. copied functions

### ⚡ Runtime Optimizations
- **CSS Custom Properties**: Efficient style calculations
- **Event Delegation**: Efficient event handling
- **LocalStorage Batching**: Reduced write operations
- **Lazy Loading**: Dynamic question generation

### 📱 Responsive Design
- **Mobile-first**: Optimized for all screen sizes
- **Touch-friendly**: Large tap targets and gestures
- **Accessible**: Keyboard navigation and screen readers

## Browser Support
- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Features Used**: CSS Custom Properties, ES6 Classes, LocalStorage
- **Fallbacks**: Graceful degradation for older browsers

## Testing
To test the complete flow:

1. Open `diagnostic-test.html`
2. Complete each section (or use "End Section" for quick testing)
3. Verify data persistence between sections
4. Check analytics page shows all section results
5. Test responsive design on different screen sizes

## Maintenance
- **CSS Variables**: Easy theme customization
- **Modular JavaScript**: Add features without breaking existing code
- **Documented APIs**: Clear function signatures and usage
- **Error Handling**: Graceful fallbacks for missing data
- **Version Control**: Each section can be updated independently

## Troubleshooting

### Common Issues
1. **Missing Data**: Check localStorage keys match expected format
2. **Navigation Issues**: Verify question IDs follow pattern `question${n}`
3. **Timer Problems**: Ensure duration is in minutes (converted to ms internally)
4. **Responsive Issues**: Test CSS custom property support

### Debugging Tools
- **Browser DevTools**: Check localStorage, console errors
- **Test Utilities**: Built-in logging for state changes
- **CSS Inspector**: Verify custom property calculations
- **Network Tab**: Check for missing assets

## Future Enhancements
- **Question Bank Integration**: Connect to external question database
- **User Accounts**: Save progress across sessions
- **Advanced Analytics**: AI-powered recommendations
- **Accessibility**: Enhanced screen reader support
- **Offline Mode**: Service worker for offline testing
- **Progress Sync**: Cloud synchronization across devices

---

**Last Updated**: September 2024
**Framework Version**: 1.0
**Compatibility**: Modern Browsers (2020+)