#!/usr/bin/env python3
"""Fix remaining multi-line border declarations."""

import re

# Define file fixes
fixes = [
    # PracticeSession.jsx - same pattern as ExampleCard
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/app/PracticeSession.jsx',
        'old': r"border: isSelected && answeredCorrectly === null \? '2px solid #3b82f6' :\s+answeredCorrectly === true && isCorrectAnswer \? '2px solid #48bb78' : '2px solid #cbd5e0',",
        'new': "boxShadow: isSelected && answeredCorrectly === null ? '0 0 0 2px #3b82f6' :\n                              answeredCorrectly === true && isCorrectAnswer ? '0 0 0 2px #48bb78' : '0 0 0 2px #cbd5e0',"
    },
    # InteractiveExample.js
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/InteractiveExample.js',
        'old': r"border: isSelected && !showFeedback \? '2px solid #10b981' :\s+showFeedback && isCorrectChoice \? '2px solid #48bb78' : '2px solid #e2e8f0',",
        'new': "boxShadow: isSelected && !showFeedback ? '0 0 0 2px #10b981' :\n                          showFeedback && isCorrectChoice ? '0 0 0 2px #48bb78' : '0 0 0 2px #e2e8f0',"
    },
    # InteractiveQuiz.js
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/InteractiveQuiz.js',
        'old': r"border: isSelected && !showFeedback \? '2px solid #10b981' :\s+showFeedback && isSelected && isCorrectAnswer \? '2px solid #48bb78' :\s+showFeedback && isSelected && !isCorrectAnswer \? '2px solid #f56565' : '1px solid rgba\(255, 255, 255, 0\.3\)',",
        'new': "boxShadow: isSelected && !showFeedback ? '0 0 0 2px #10b981' :\n                            showFeedback && isSelected && isCorrectAnswer ? '0 0 0 2px #48bb78' :\n                            showFeedback && isSelected && !isCorrectAnswer ? '0 0 0 2px #f56565' : '0 0 0 1px rgba(255, 255, 255, 0.3)',"
    },
    # CourseContent.jsx - simple border
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/app/CourseContent.jsx',
        'old': r"border: '2\.5px solid #d1d5db',",
        'new': "boxShadow: '0 0 0 2.5px #d1d5db',"
    },
    # InlineAuth.jsx - multiple simple borders
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/auth/InlineAuth.jsx',
        'old': r"border: '1\.5px solid #f3f4f6',",
        'new': "boxShadow: '0 0 0 1.5px #f3f4f6',"
    },
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/auth/InlineAuth.jsx',
        'old': r"border: '1\.5px solid #1877F2',",
        'new': "boxShadow: '0 0 0 1.5px #1877F2',"
    },
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/auth/InlineAuth.jsx',
        'old': r"border: '1\.5px solid #000000',",
        'new': "boxShadow: '0 0 0 1.5px #000000',"
    },
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/auth/InlineAuth.jsx',
        'old': r"border: '1\.5px solid #d1d5db',",
        'new': "boxShadow: '0 0 0 1.5px #d1d5db',"
    },
    # DiagnosticTestCTA.jsx
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/DiagnosticTestCTA.jsx',
        'old': r"border: '1\.5px solid #fca5a5',",
        'new': "boxShadow: '0 0 0 1.5px #fca5a5',"
    },
    # LessonRenderer.jsx - dashed border (keep as comment)
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/lesson/LessonRenderer.jsx',
        'old': r"border: '2px dashed orange',",
        'new': "// border: '2px dashed orange', // Debug border - removed"
    },
]

for fix in fixes:
    try:
        with open(fix['file'], 'r') as f:
            content = f.read()

        # Apply fix
        new_content = re.sub(fix['old'], fix['new'], content, flags=re.MULTILINE | re.DOTALL)

        if new_content != content:
            with open(fix['file'], 'w') as f:
                f.write(new_content)
            print(f"Fixed: {fix['file']}")
        else:
            print(f"No match found in: {fix['file']}")
    except Exception as e:
        print(f"Error with {fix['file']}: {e}")

print("\nDone!")
