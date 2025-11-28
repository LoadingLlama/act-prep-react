#!/usr/bin/env python3
"""Fix remaining directional border declarations."""

import re

def fix_file(filepath, patterns):
    """Apply fixes to a file."""
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        original = content
        for old_pattern, new_value in patterns:
            content = re.sub(old_pattern, new_value, content, flags=re.MULTILINE)

        if content != original:
            with open(filepath, 'w') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error with {filepath}: {e}")
        return False

# Define fixes
files_to_fix = [
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/ExampleCard.jsx',
        'patterns': [
            (r"borderLeft: answeredCorrectly === true && isCorrectAnswer \? '3px solid #48bb78' : 'none',",
             "boxShadow: answeredCorrectly === true && isCorrectAnswer ? '-3px 0 0 0 #48bb78' : 'none',"),
        ]
    },
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/app/CourseContent.jsx',
        'patterns': [
            (r"borderRight: idx < 6 \? '1px solid #d1d5db' : 'none'",
             "boxShadow: idx < 6 ? '1px 0 0 0 #d1d5db' : 'none'"),
            (r"borderRight: dayIdx < 6 \? '1px solid #d1d5db' : 'none',",
             "boxShadow: dayIdx < 6 ? '1px 0 0 0 #d1d5db' : 'none',"),
            (r"borderBottom: weekIdx < totalWeeks - 1 \? '1px solid #d1d5db' : 'none',",
             "boxShadow: weekIdx < totalWeeks - 1 ? '0 1px 0 0 #d1d5db' : 'none',"),
            (r"borderLeft: hoursMismatch \? '3px solid #ef4444' : '1px solid #e5e7eb'",
             "boxShadow: hoursMismatch ? '-3px 0 0 0 #ef4444' : '-1px 0 0 0 #e5e7eb'"),
            (r"borderLeft: '6px solid transparent',",
             "// borderLeft: '6px solid transparent', // Removed - was decorative"),
            (r"borderRight: '6px solid transparent',",
             "// borderRight: '6px solid transparent', // Removed - was decorative"),
            (r"borderLeft: hoursMismatch \? '3px solid #ef4444' : '1px solid #d1d5db',",
             "boxShadow: hoursMismatch ? '-3px 0 0 0 #ef4444' : '-1px 0 0 0 #d1d5db',"),
        ]
    },
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/auth/ProtectedRoute.jsx',
        'patterns': [
            (r"borderTop: '4px solid white',",
             "boxShadow: '0 -4px 0 0 white',"),
        ]
    },
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/LessonTableOfContents.js',
        'patterns': [
            (r"borderLeft: '2px solid transparent',",
             "boxShadow: '-2px 0 0 0 transparent',"),
        ]
    },
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/InteractiveExample.js',
        'patterns': [
            (r"borderLeft: showFeedback && isCorrectChoice \? '3px solid #48bb78' :\n\s+showFeedback && isIncorrectChoice \? '3px solid #f56565' : 'none',",
             "boxShadow: showFeedback && isCorrectChoice ? '-3px 0 0 0 #48bb78' :\n                          showFeedback && isIncorrectChoice ? '-3px 0 0 0 #f56565' : 'none',"),
        ]
    },
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/DiagnosticTest.jsx',
        'patterns': [
            (r"borderLeft: '6px solid transparent',",
             "// borderLeft: '6px solid transparent', // Removed - was decorative"),
            (r"borderRight: '6px solid transparent',",
             "// borderRight: '6px solid transparent', // Removed - was decorative"),
            (r"borderLeft: hoursMismatch \? '3px solid #ef4444' : '1px solid #d1d5db',",
             "boxShadow: hoursMismatch ? '-3px 0 0 0 #ef4444' : '-1px 0 0 0 #d1d5db',"),
        ]
    },
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/AllLessonsNavigator.js',
        'patterns': [
            (r"borderLeft: isCurrent \? '3px solid #2196f3' : '3px solid transparent',",
             "boxShadow: isCurrent ? '-3px 0 0 0 #2196f3' : '-3px 0 0 0 transparent',"),
        ]
    },
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/components/InteractiveQuiz.js',
        'patterns': [
            (r"borderLeft: showFeedback && isSelected && isCorrectAnswer \? '3px solid #48bb78' :\n\s+showFeedback && isSelected && !isCorrectAnswer \? '3px solid #f56565' : 'none',",
             "boxShadow: showFeedback && isSelected && isCorrectAnswer ? '-3px 0 0 0 #48bb78' :\n                            showFeedback && isSelected && !isCorrectAnswer ? '-3px 0 0 0 #f56565' : 'none',"),
        ]
    },
    {
        'file': '/Users/cadenchiang/Desktop/act-prep-react/src/pages/AboutUs.jsx',
        'patterns': [
            (r"borderBottom: '1px solid rgba\(229, 231, 235, 0\.4\)',",
             "boxShadow: '0 1px 0 0 rgba(229, 231, 235, 0.4)',"),
        ]
    },
]

modified = 0
for item in files_to_fix:
    if fix_file(item['file'], item['patterns']):
        print(f"Fixed: {item['file']}")
        modified += 1
    else:
        print(f"No changes: {item['file']}")

print(f"\nTotal files modified: {modified}")
