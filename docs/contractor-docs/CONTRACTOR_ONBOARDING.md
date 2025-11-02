# Contractor Onboarding Checklist

## Day 1: Setup & Training (2-3 hours)

### Step 1: Access Setup (15 min)
Send contractor these credentials:

```
Supabase Dashboard:
URL: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix
Email: [CREATE CONTRACTOR ACCOUNT]
Password: [GENERATE TEMP PASSWORD]

OR

Share these in environment:
- SUPABASE_URL: https://rabavobdklnwvwsldbix.supabase.co
- SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Contractor Action:**
- [ ] Log into Supabase Dashboard
- [ ] Navigate to Table Editor
- [ ] Navigate to Storage
- [ ] Confirm you can see all tables

---

### Step 2: Share Documents (5 min)
Send contractor:
1. `FIVERR_CONTRACTOR_INSTRUCTIONS.md` - Main guide
2. PDF of Practice Test 1 (or whichever test they'll start with)
3. Screenshot of what a completed entry looks like

**Contractor Action:**
- [ ] Read full instructions document
- [ ] Download PDF
- [ ] Review screenshot examples
- [ ] Ask any clarifying questions

---

### Step 3: Practice Entry - English Passage (30 min)

**You provide:**
- Choose a SHORT English passage from the PDF (1-2 paragraphs)
- Tell contractor: "Practice entering Passage 1 only, no questions yet"

**Contractor does:**
1. Copy passage text from PDF
2. Add paragraph breaks
3. Add any bold/italic/underline formatting
4. Enter into `practice_test_english_passages` table
5. Screenshot the database entry
6. Send you screenshot for review

**You review:**
- [ ] Formatting correct
- [ ] No typos
- [ ] Proper paragraph breaks
- [ ] Give feedback

---

### Step 4: Practice Entry - English Questions (45 min)

**You provide:**
- Tell contractor: "Now enter questions 1-5 for the passage you just created"

**Contractor does:**
1. Find passage_id from previous entry
2. Enter 5 questions with JSON formatted choices
3. Link to correct passage_id
4. Screenshot database entries
5. Send you screenshots

**You review:**
- [ ] JSON format correct
- [ ] Proper double quotes used
- [ ] Questions linked to correct passage
- [ ] All choices A-D present
- [ ] Give feedback

---

### Step 5: Practice Entry - Math with Diagram (30 min)

**You provide:**
- Choose 1 math question WITH a diagram
- Tell contractor: "Enter this math question and upload the diagram"

**Contractor does:**
1. Enter question text
2. Enter choices in JSON format
3. Screenshot the diagram from PDF
4. Upload to Storage → `test-images/math-questions/practice/`
5. Get public URL
6. Paste URL into image_url field
7. Send you screenshot of database entry + confirm image loads

**You review:**
- [ ] Question entered correctly
- [ ] Image uploaded and cropped properly
- [ ] URL works (click it)
- [ ] Image displays in database entry
- [ ] Give feedback

---

### Step 6: Test on Localhost (15 min)

**You do:**
1. Pull the practice entries into your localhost
2. Navigate to the test
3. Show contractor how their entry appears on the website
4. Take screenshot or record short video
5. Send to contractor: "Here's how your entry looks on the website"

**This is motivating!** They see their work live.

---

### Step 7: Final Q&A (15 min)

**Ask contractor:**
- "What are you still unclear about?"
- "What do you think will be hardest?"
- "Do you need any tools or resources?"

**Clarify:**
- Payment terms
- Timeline expectations
- Communication protocol
- How to ask questions

---

## Day 2: First Complete Passage (3 hours)

**Assignment:**
"Complete 1 full English passage with all 15 questions"

**Contractor delivers:**
- Passage entered
- All 15 questions entered
- Screenshots of entries

**You review:**
- Use CONTRACTOR_QUALITY_CHECKLIST.md
- Test on localhost
- Provide detailed feedback
- Approve or request revisions

---

## Day 3: Production Work Begins

If Day 2 work is good quality:
- **Assign:** Complete Test 1 English section (all 5 passages)
- Set deadline: 2-3 days
- Check in daily

If Day 2 needs improvement:
- Provide feedback
- Assign 1 more practice passage
- Review again before proceeding

---

## Communication Templates

### Welcome Email
```
Hi [Name],

Welcome to the team! You'll be helping us digitize ACT practice tests.

Here's what to do today:
1. Access Supabase Dashboard (credentials below)
2. Read the full instructions document attached
3. Complete the practice entries (I'll send you details)
4. We'll review together and then you're off to the races!

Expected time today: 2-3 hours for training
Pay for training time: [AMOUNT]

Login Info:
[CREDENTIALS]

Instructions Document:
[ATTACH FIVERR_CONTRACTOR_INSTRUCTIONS.md]

Let me know when you've logged in successfully!

[Your Name]
```

### After Practice Entry Feedback
```
Hi [Name],

Great first attempt! Here's my feedback:

✅ What you did well:
- Formatting looks good
- Paragraph breaks correct
- Questions linked properly

⚠️ What to fix:
- Q3: JSON format needs double quotes not single
- Q5: Missing choice D
- Passage text has typo in line 3: "teh" should be "the"

Please make these corrections and resubmit.

Once these look good, you're ready for production work!

[Your Name]
```

### Production Assignment
```
Hi [Name],

Your practice work looks excellent! You're ready to start on the actual tests.

ASSIGNMENT: Practice Test 1 - English Section
- 5 passages
- 75 questions total
- Due: [DATE]
- Pay: $[AMOUNT]

PDF attached. Let me know if you have any questions.

Send me an update at end of each day with:
- What you completed
- Any issues encountered
- ETA for completion

Thanks!
[Your Name]
```

---

## Red Flags to Watch For

🚩 **Contractor doesn't ask questions**
- Silence usually means confusion
- Check in proactively: "Any questions so far?"

🚩 **Practice work has many errors**
- May need more training
- Consider if this contractor is right fit

🚩 **Claims they'll finish very fast**
- "I can do whole test in 4 hours"
- This is unrealistic, quality will suffer

🚩 **Doesn't follow JSON format after multiple corrections**
- This is fundamental requirement
- May not be detail-oriented enough

---

## Green Flags to Look For

✅ **Asks thoughtful questions**
- "Should I type this table or screenshot it?"
- "How do you want me to handle this special formatting?"

✅ **Practice work is careful**
- Takes time, doesn't rush
- Double-checks their work

✅ **Sends progress updates**
- "Finished Passage 1, starting Passage 2"
- Proactive communication

✅ **Finds errors in source material**
- "I think there's a typo in the PDF here..."
- Shows they're paying attention

---

## Tools to Provide Contractor

### Optional but Helpful:
1. **Screenshot Tool**
   - Mac: Cmd+Shift+4
   - Windows: Snipping Tool
   - Chrome Extension: "Full Page Screen Capture"

2. **Text Editor with JSON Validation**
   - VS Code (free)
   - JSONLint.com (online validator)

3. **Image Editing (for cropping)**
   - Preview (Mac)
   - Paint (Windows)
   - Any simple crop tool

---

## Success Metrics

After onboarding, contractor should be able to:
- [ ] Enter passage independently with correct formatting
- [ ] Enter questions with valid JSON choices
- [ ] Upload and link images correctly
- [ ] Maintain 95%+ accuracy
- [ ] Complete 1 passage in ~30-45 minutes
- [ ] Complete full test section in estimated time
- [ ] Communicate clearly when stuck

If contractor meets all these after training → They're ready for full production work!
