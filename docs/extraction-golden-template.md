# 🏆 ACT TEST EXTRACTION GOLDEN TEMPLATE 🏆

**THE DEFINITIVE GUIDE FOR PERFECT TEST EXTRACTION**

*Reference this document for EVERY test extraction. Follow every step. No exceptions.*

---

## 🚨 BEFORE YOU START - CRITICAL PRE-FLIGHT CHECKLIST

### ✅ **Preparation Requirements**
- [ ] PDF file path confirmed and accessible
- [ ] Test number clearly identified (e.g., Test 3, Test 4)
- [ ] Database connection working
- [ ] Test 1 available as reference format
- [ ] Answer key available (image or separate document)
- [ ] All extraction scripts are ready

### ✅ **Environment Setup**
```bash
# Verify database access
node -e "import { createClient } from '@supabase/supabase-js'; console.log('DB OK')"

# Verify PDF exists
ls -la "/path/to/test/pdf"

# Create extraction scripts directory
mkdir -p scripts/extraction/test{N}
mkdir -p scripts/verification/test{N}
```

---

## 🎯 GOLDEN EXTRACTION WORKFLOW

### **PHASE 1: EMERGENCY ASSESSMENT & SETUP**

#### Step 1.1: Database Status Check
```javascript
// Run this FIRST - assess current state
node scripts/verification/emergency-check-test-{N}-status.mjs
```

**Expected Output:**
- Question counts per section
- Content quality assessment
- Missing data identification
- Comparison to Test 1 format

#### Step 1.2: Reference Format Analysis
```javascript
// Analyze Test 1 to understand required format
node scripts/verification/analyze-test1-format.mjs
```

**Key Metrics to Record:**
- English questions with underlined text: X/75
- English questions with lesson assignments: X/75
- Average question stem length per section
- Sample formatting examples

---

### **PHASE 2: PASSAGE EXTRACTION**

#### Step 2.1: Extract All Passages
**CRITICAL COUNTS:**
- English: 5 passages
- Reading: 4 passages
- Science: 6 passages
- **Total: 15 passages (NO MORE, NO LESS)**

**⚠️ CRITICAL TABLE NAMES:**
- English passages: `act_english_passages` (NOT `act_passages`)
- Reading passages: `act_reading_passages`
- Science passages: `act_science_passages` (if separate)

```javascript
// Extract English passages first (most critical)
node scripts/extraction/extract-test{N}-english-passages-complete.mjs

// Extract other passages
node scripts/extraction/extract-test{N}-reading-passages-complete.mjs
node scripts/extraction/extract-test{N}-science-passages-complete.mjs
```

**Quality Standards:**
- Each passage must be 1500+ characters
- Real content from PDF (not placeholders)
- Proper titles assigned
- No duplicate or extra passages
- OCR text must be properly reconstructed

**English Passage Requirements:**
- Column name: `passage_text` (NOT `content`)
- Table name: `act_english_passages`
- Must include complete narrative content
- Minimum 1800+ characters per passage
- Proper paragraph breaks and formatting
- **CRITICAL**: If OCR text is fragmented, manually reconstruct complete passages

#### Step 2.2: Passage Validation
```javascript
// Verify passage extraction for each section
node scripts/verification/verify-test{N}-english-passages.mjs
node scripts/verification/verify-test{N}-reading-passages.mjs
node scripts/verification/verify-test{N}-science-passages.mjs
```

**PASS CRITERIA:**
- All passages have 1800+ characters (Test 1 quality standard)
- No missing or fragmented content
- Proper table structure used
- Content matches original PDF text
- **MANDATORY**: Compare against Test 1 quality metrics

**Manual Reconstruction Process:**
If OCR text is severely fragmented:
1. Identify passage boundaries and titles
2. Piece together content fragments systematically
3. Ensure logical flow and complete sentences
4. Verify each passage meets 1800+ character minimum
5. Cross-reference with Test 1 quality standards

---

### **PHASE 3: QUESTION EXTRACTION - BY SECTION**

### **🔥 ENGLISH QUESTIONS - ULTRA CRITICAL SECTION 🔥**

**This is the most complex section. Follow EXACTLY.**

#### Step 3.1: English Questions Extraction (Questions 1-75)
Break into manageable chunks:

```javascript
// Extract in batches for quality control
node scripts/extraction/extract-test{N}-english-questions-1-15.mjs
node scripts/extraction/extract-test{N}-english-questions-16-30.mjs
node scripts/extraction/extract-test{N}-english-questions-31-45.mjs
node scripts/extraction/extract-test{N}-english-questions-46-60.mjs
node scripts/extraction/extract-test{N}-english-questions-61-75.mjs
```

**MANDATORY FORMAT FOR EVERY ENGLISH QUESTION:**
```javascript
const question = {
  number: 1,
  stem: "The band's popularity <u>continually</u> grows as they tour.",
  question_type: 'word-choice',
  choices: {
    A: "NO CHANGE",
    B: "continuously",
    C: "always",
    D: "frequently"
  }
};

// Database fields populated:
{
  question_stem: "The band's popularity <u>continually</u> grows as they tour.",
  underlined_text: "continually",
  context_before: "The band's popularity ",
  context_after: " grows as they tour.",
  lesson_id: "04df2a09-a910-4456-8fe5-2f8e7f62c50f",
  difficulty_level: "medium",
  question_type: "word-choice",
  question_category: "KLA"
}
```

#### Step 3.2: English Lesson Assignment (MANDATORY)
```javascript
// NEVER skip this step - assign lessons to ALL English questions
node scripts/extraction/assign-english-lessons-test{N}.mjs
```

**Complete Lesson Mapping Template:**
```javascript
const lessonMapping = {
  'comma-splice': { lesson_id: 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac', difficulty_level: 'medium' },
  'fragment': { lesson_id: 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac', difficulty_level: 'medium' },
  'dash': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'comma-usage': { lesson_id: '3e8f0696-1bf7-4b5c-880d-fb5359923b7d', difficulty_level: 'medium' },
  'deleting-sentence': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'verb-agreement': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'easy' },
  'colon': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'sentence-placement': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' },
  'word-choice': { lesson_id: '04df2a09-a910-4456-8fe5-2f8e7f62c50f', difficulty_level: 'medium' },
  'modifier-misplaced': { lesson_id: 'f7ac1d6c-6416-47fd-9720-807224100517', difficulty_level: 'hard' },
  'which-choice': { lesson_id: '29b59c9d-ef2e-4f7f-aae2-464222884d3a', difficulty_level: 'hard' },
  'main-idea': { lesson_id: '29b59c9d-ef2e-4f7f-aae2-464222884d3a', difficulty_level: 'hard' },
  'verb-form': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'medium' },
  'redundancy': { lesson_id: '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734', difficulty_level: 'easy' },
  'transition': { lesson_id: '7aae3763-017b-4762-ad5a-346aac1f027b', difficulty_level: 'hard' },
  'verb-tense': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'easy' },
  'idiom': { lesson_id: '4a9e06f8-5ee5-4e5d-9e5d-2ce9b7c6bf16', difficulty_level: 'easy' },
  'logical-placement': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' },
  'parallel-structure': { lesson_id: 'e6153221-e330-4db4-8cc7-9c5a1d51a301', difficulty_level: 'hard' },
  'pronoun-ambiguous': { lesson_id: '3c3585a1-f137-4331-8390-29ef1f5e889f', difficulty_level: 'medium' },
  'adding-info': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'wordiness': { lesson_id: '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734', difficulty_level: 'medium' },
  'adding-sentence': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'modifier-dangling': { lesson_id: 'f7ac1d6c-6416-47fd-9720-807224100517', difficulty_level: 'hard' },
  'grammar': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'medium' },
  'punctuation': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'style': { lesson_id: '04df2a09-a910-4456-8fe5-2f8e7f62c50f', difficulty_level: 'medium' },
  'organization': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' }
};
```

#### Step 3.3: English Validation (BEFORE CONTINUING)
```javascript
// MUST pass before proceeding to other sections
node scripts/verification/validate-english-complete-test{N}.mjs
```

**PASS CRITERIA:**
- 75/75 questions with quality content from PDF
- 75/75 questions with lesson_id assigned
- 75/75 questions with difficulty_level assigned
- 60+/75 questions with underlined_text extracted
- 75/75 questions with context_before and context_after

---

### **🔢 MATH QUESTIONS (Questions 1-60)**

#### Step 3.4: Math Questions Extraction
```javascript
// Extract in batches
node scripts/extraction/extract-test{N}-math-questions-1-20.mjs
node scripts/extraction/extract-test{N}-math-questions-21-40.mjs
node scripts/extraction/extract-test{N}-math-questions-41-60.mjs
```

**CRITICAL REQUIREMENTS:**
- 5 answer choices (A-E or F-K)
- Real content from PDF
- choice_e field populated (Math has 5 choices, not 4)

---

### **📖 READING QUESTIONS (Questions 1-40)**

#### Step 3.5: Reading Questions Extraction
```javascript
// Extract by passage
node scripts/extraction/extract-test{N}-reading-questions-1-10.mjs   # Passage 1
node scripts/extraction/extract-test{N}-reading-questions-11-20.mjs  # Passage 2
node scripts/extraction/extract-test{N}-reading-questions-21-30.mjs  # Passage 3
node scripts/extraction/extract-test{N}-reading-questions-31-40.mjs  # Passage 4
```

---

### **🔬 SCIENCE QUESTIONS (Questions 1-40)**

#### Step 3.6: Science Questions Extraction
```javascript
// Extract by passage (6-7 questions each)
node scripts/extraction/extract-test{N}-science-questions-1-6.mjs    # Passage 1
node scripts/extraction/extract-test{N}-science-questions-7-13.mjs   # Passage 2
node scripts/extraction/extract-test{N}-science-questions-14-20.mjs  # Passage 3
node scripts/extraction/extract-test{N}-science-questions-21-27.mjs  # Passage 4
node scripts/extraction/extract-test{N}-science-questions-28-34.mjs  # Passage 5
node scripts/extraction/extract-test{N}-science-questions-35-40.mjs  # Passage 6
```

---

### **PHASE 4: ANSWER KEY INTEGRATION**

#### Step 4.1: Extract and Verify Answer Keys
```javascript
// Process answer key image/document
node scripts/extraction/extract-test{N}-answer-keys.mjs

// Verify all answers assigned
node scripts/verification/verify-test{N}-answers.mjs
```

**PASS CRITERIA:**
- All 215 questions have correct_answer populated
- No null or empty answer fields
- Answer format matches (A/B/C/D for most, A/B/C/D/E for math)

---

### **PHASE 5: COMPREHENSIVE VALIDATION**

#### Step 5.1: Section-by-Section Validation
```javascript
// Run each validation - ALL must pass
node scripts/verification/validate-test{N}-english.mjs
node scripts/verification/validate-test{N}-math.mjs
node scripts/verification/validate-test{N}-reading.mjs
node scripts/verification/validate-test{N}-science.mjs
```

#### Step 5.2: Final Comprehensive Check
```javascript
// THE final validation before declaring success
node scripts/verification/final-test{N}-verification.mjs
```

**MUST SHOW:**
```
🎊 TEST {N} EXTRACTION: MISSION ACCOMPLISHED! 🎊

✅ English: 75/75 questions with lessons and formatting
✅ Math: 60/60 questions with real content
✅ Reading: 40/40 questions with real content
✅ Science: 40/40 questions with real content
✅ Total: 215/215 questions complete!
```

---

## 🚨 CRITICAL ERROR PREVENTION

### **❌ NEVER DO THESE THINGS:**
1. **Use placeholder content** - Always extract from actual PDF
2. **Skip lesson assignment** - English questions MUST have lesson_id
3. **Ignore underlined formatting** - English needs `<u>text</u>` format
4. **Create extra passages** - ACT has exactly 15 passages
5. **Rush validation** - Every step must pass before continuing

### **✅ ALWAYS DO THESE THINGS:**
1. **Extract real content** from PDF text
2. **Assign lessons** to all English questions
3. **Format underlined text** properly in context
4. **Validate each phase** before proceeding
5. **Compare to Test 1** as quality reference

---

## 🏁 FINAL SIGN-OFF CHECKLIST

**Only declare extraction complete when ALL items checked:**

### Database Content
- [ ] 215 total questions (75 English + 60 Math + 40 Reading + 40 Science)
- [ ] 15 total passages (5 English + 4 Reading + 6 Science)
- [ ] All questions have real content from PDF (no placeholders)
- [ ] All questions have complete answer choices
- [ ] All questions have correct answers assigned

### English Questions (Most Critical)
- [ ] All 75 questions have proper `<u>underlined</u>` formatting
- [ ] All 75 questions have `underlined_text` extracted
- [ ] All 75 questions have `context_before` and `context_after`
- [ ] All 75 questions have valid `lesson_id` (not null)
- [ ] All 75 questions have valid `difficulty_level` (not null)
- [ ] All 75 questions have proper `question_type`

### Quality Standards
- [ ] Content quality matches Test 1 standards
- [ ] No database errors or warnings
- [ ] All validation scripts pass
- [ ] Final verification shows 100% completion

### Documentation
- [ ] All extraction scripts saved and documented
- [ ] Any issues encountered are documented
- [ ] Verification results saved for reference

---

## 🆘 EMERGENCY RECOVERY PROCEDURES

### If Extraction Goes Wrong:

#### 1. **STOP IMMEDIATELY**
- Don't make it worse by continuing
- Document exactly what went wrong
- Preserve any working components

#### 2. **Assess Damage**
```javascript
node scripts/verification/emergency-damage-assessment-test{N}.mjs
```

#### 3. **Recovery Strategy**
- Use Test 1 as reference format
- Restore from backup if available
- Re-extract problematic sections only
- Never bulk-delete without backup

#### 4. **Prevention for Next Time**
- Identify what step was skipped
- Update this template if needed
- Add additional validation checks

---

## 🛠️ TEMPLATE SCRIPT GENERATORS

### Generate Full Script Set
```bash
# Create all necessary scripts for Test N
node scripts/generators/create-test{N}-extraction-suite.mjs
```

### Key Script Templates
1. **Emergency Status Check** - `emergency-check-test{N}-status.mjs`
2. **Passage Extraction** - `extract-test{N}-passages-complete.mjs`
3. **English Questions** - `extract-test{N}-english-questions-{range}.mjs`
4. **Other Questions** - `extract-test{N}-{subject}-questions-{range}.mjs`
5. **Answer Key Integration** - `extract-test{N}-answer-keys.mjs`
6. **Final Verification** - `final-test{N}-verification.mjs`

---

## 📊 SUCCESS METRICS

### Perfect Extraction Achieved When:
- ✅ **215/215 questions** with real PDF content
- ✅ **15/15 passages** with quality content
- ✅ **75/75 English questions** with complete lesson assignments
- ✅ **75/75 English questions** with proper underlined formatting
- ✅ **0 errors** in validation scripts
- ✅ **100% match** to Test 1 quality standards

---

## 🎖️ GOLDEN RULE

> **"Extract it right the first time. Quality over speed. Every shortcut creates technical debt."**

**This template represents the distilled wisdom from emergency Test 2 restoration. Follow it religiously for perfect extractions every time.**

---

*Last Updated: Based on Test 2 Emergency Restoration Success*
*Next Update: After each successful test extraction*