# 🧪 PRACTICE TEST 1 - TESTING GUIDE WITH LOGGING

## ✅ PRE-TEST CHECKLIST

Before starting, open your browser console (F12 or Cmd+Option+I) and keep it open throughout the test.

## 📋 EXPECTED LOG SEQUENCE

### **PHASE 1: Starting the Test**
When you click "Begin Test", you should see:
```
🗄️ Querying practice_test_english_questions for test_number=2
📦 Got 75 questions from practice_test_english_questions
```

### **PHASE 2: During Each Section**
As you answer questions and finish each section:

**Section End (English → Math → Reading → Science):**
```
✅ DATA VALIDATION:
   section: "english"
   totalQuestions: 75
   questionsWithAnswers: [number you answered]
   questionsSkipped: [number you skipped]
   correctAnswers: [number correct]
   allHaveQuestionId: true
   allHaveUserAnswer: true
   allHaveIsCorrect: true

💾 Saved results to sessionStorage, total sections: 1
📚 All completed sections: ["english"]
```

### **PHASE 3: Test Completion (After Science Section)**
```
🎉 TEST COMPLETE - FINAL RESULTS:
   sectionsCount: 4
   sections: ["english", "math", "reading", "science"]
   totalQuestions: 215
   totalCorrect: [your score]
   percentage: [XX.X]%
   totalAnswersInAllSections: 215

📤 Posting COMPLETE message to parent: {type: 'PRACTICE_TEST_COMPLETE'}
✅ Complete message posted to parent
```

### **PHASE 4: React Receives Message**
```
================================================================================
🎉 REACT: TEST COMPLETE MESSAGE RECEIVED
================================================================================
Test Number: 2
User ID: [your user id]
Calling handleTestCompletion...
================================================================================
```

### **PHASE 5: Processing Begins**
```
================================================================================
🔄 PRACTICE TEST RESULT PROCESSOR STARTED
================================================================================
Test Number: 2
User ID: [your user id]
Sections Received: 4

📦 Processing section 1/4: english
   Questions in section: 75

📦 Processing section 2/4: math
   Questions in section: 60

📦 Processing section 3/4: reading
   Questions in section: 40

📦 Processing section 4/4: science
   Questions in section: 40

✅ FLATTENED RESULTS:
   Total answers: 215
   Sections: 4

🔍 SAMPLE QUESTION VALIDATION:
   Has questionId: true
   Has userAnswer: true
   Has isCorrect: true
   Has section: true
   Sample: {questionId: "...", section: "english", userAnswer: "A", isCorrect: true}
```

### **PHASE 6: Session Creation**
```
📝 CREATING SESSION:
   User ID: [your id]
   Test Number: 2
   Total Questions: 215
   Correct Answers: [your score]
   Score: [XX.XX]%

✅ Session created successfully: [session-id-uuid]
```

### **PHASE 7: Saving Answers**
```
💾 SAVING ANSWERS TO DATABASE:
   ✓ Saved question 1: english Q1 (A)
   ✓ Saved question 2: english Q2 (B)
   ✓ Saved question 3: english Q3 (null)
   Progress: 20/215 (43%)
   Progress: 40/215 (46%)
   ...
   Progress: 200/215 (69%)

📊 SAVE RESULTS:
   ✅ Saved: 215/215
   ❌ Failed: 0
```

### **PHASE 8: Cache Clearing**
```
🗑️ CLEARING CACHE:
   Cleared: practice_tests_[user-id]
   Cleared: insights_[user-id]
   Total cache keys cleared: 2
```

### **PHASE 9: Completion**
```
================================================================================
✅ PRACTICE TEST PROCESSING COMPLETE
================================================================================
Session ID: [session-id]
Test Number: 2
Score: [XX.XX]%
Saved: 215 answers
Failed: 0 answers
================================================================================
```

## 🚨 ERROR DETECTION

### ❌ **IF YOU SEE THIS - SOMETHING IS WRONG:**

**Missing Data:**
```
❌ NO RESULTS IN SESSIONSTORAGE!
```
→ Test results weren't saved from HTML

**Session Creation Failed:**
```
❌ SESSION CREATION FAILED!
```
→ Database error creating practice_test_sessions

**Save Failures:**
```
📊 SAVE RESULTS:
   ✅ Saved: 150/215
   ❌ Failed: 65
```
→ Some answers didn't save to database

**Missing Fields:**
```
🔍 SAMPLE QUESTION VALIDATION:
   Has questionId: false   ← ERROR!
   Has userAnswer: false   ← ERROR!
```
→ Data structure is wrong

## ✅ SUCCESS INDICATORS

After test completes, you should see:
1. ✅ Processing modal with progress bar
2. ✅ "Complete!" message
3. ✅ Automatic redirect to Insights page
4. ✅ Practice Test 1 in the list
5. ✅ Correct score displayed
6. ✅ Click to review works

## 🔍 POST-TEST VERIFICATION

### In Insights Page:
Check console for:
```
📦 Loaded practice test sessions from DB: 1
✅ Cached practice tests to sessionStorage
```

### Click "Review" Button:
You should see all your answers:
- ✅ Correct answers in green
- ❌ Incorrect answers in red
- ⚪ Skipped questions in gray

## 📝 WHAT TO REPORT

If something goes wrong, copy the ENTIRE console log and send it. Look for:
1. The LAST error message (❌)
2. Which PHASE it failed in
3. The saved/failed counts
4. Any missing field warnings

## 🎯 EXPECTED FINAL STATE

After successful completion:
- ✅ 215 answers saved to database
- ✅ Session marked as completed
- ✅ Practice Test 1 visible in Insights
- ✅ All correct/incorrect/skipped counts accurate
- ✅ Can review all questions with answers preserved
