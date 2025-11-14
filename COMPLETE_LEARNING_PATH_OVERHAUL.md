# 🎯 Complete Learning Path Overhaul - Per-Day Study Hours

## What Changed

I've completely rewritten the learning path generation to use **EVERY setting** from your onboarding, including:
- ✅ Per-day study hours (Monday-Sunday, individual hours for each day)
- ✅ Alternating week schedules (Week 1 vs Week 2)
- ✅ Weekly review days (e.g., Sunday)
- ✅ Mock exam days (e.g., Saturday, every 2 weeks)
- ✅ Target exam date (all lessons scheduled BEFORE this date)
- ✅ Weakest section (prioritized in the path)

---

## 🔧 Required Steps (IN ORDER)

### **Step 1: Run SQL in Supabase** ⭐ CRITICAL

You MUST run these two SQL files in Supabase SQL Editor:

1. **`UPDATE_USER_GOALS_SCHEMA.sql`** - Adds per-day study hours to user_goals table
   - Adds `study_hours` (JSON: {monday: 0.75, tuesday: 1, ...})
   - Adds `study_hours_week2` (for alternating weeks)
   - Adds `use_alternating_weeks` (boolean flag)
   - Adds `weakest_section` (text)
   - Adds `review_day` and `mock_exam_day` (from previous SQL)

2. **`ADD_ITEM_TYPE_COLUMN.sql`** - Adds item_type column (if not already run)

**How to run:**
1. Go to https://rabavobdklnwvwsldbix.supabase.co
2. Click "SQL Editor" in left sidebar
3. Copy contents of `UPDATE_USER_GOALS_SCHEMA.sql`
4. Paste and click "RUN"
5. Wait for ✅ success message

### **Step 2: Test the New Learning Path**

After running the SQL:

1. **Open the app** (localhost:3000)
2. **Go to Course/Learning Path**
3. **Click "Edit Learning Path Goals"**
4. **Set your exam date** (e.g., January 1st, 2026)
5. **Click "Save Changes"**

The learning path will regenerate using:
- Your per-day study hours from onboarding
- Alternating weeks if enabled
- Review days on your chosen day (every week)
- Mock exams on your chosen day (every 2 weeks)
- All lessons scheduled BEFORE your exam date
- Final **EXAM DAY** marker on your actual test date

---

## 📋 How the New Algorithm Works

### **1. Per-Day Scheduling**

Instead of generic "5 days per week", the algorithm now:
- Checks **each day** (Monday-Sunday) for available study time
- Calculates **exact minutes** from hours (e.g., 0.75 hours = 45 minutes)
- **Skips days with 0 hours** (e.g., Wednesday = 0 in your schedule)
- **Fits lessons** into available time for each day

**Example:**
```
Monday: 0.75 hours (45 min) → Schedule 1-2 short lessons
Tuesday: 1 hour (60 min) → Schedule 2 medium lessons
Wednesday: 0 hours → SKIP (no lessons)
Thursday: 0.75 hours (45 min) → Schedule 1-2 short lessons
Friday: 1 hour (60 min) → Schedule 2 medium lessons
Saturday: 2 hours (120 min) → Schedule 3-4 lessons
Sunday: 2 hours (120 min) → REVIEW DAY (comprehensive review)
```

### **2. Alternating Weeks**

If `use_alternating_weeks` is TRUE:
- **Week 1**: Uses `study_hours` schedule
- **Week 2**: Uses `study_hours_week2` schedule
- **Week 3**: Back to `study_hours`
- **Week 4**: Back to `study_hours_week2`
- Continues alternating...

This allows you to have different schedules based on school weeks, work weeks, etc.

### **3. Structured Curriculum**

The algorithm builds a proper curriculum:
- **Week 1**: Introduction (ACT Test Basics & Overview)
- **Week 2-3**: English + Math Fundamentals
- **Week 4-5**: Reading + Math
- **Week 6-7**: Science + Math
- **Continues rotating** through subjects
- **Always teaches fundamentals first** (regardless of diagnostic results)
- **After covering all 86 lessons**: Fills remaining time with "Comprehensive Review & Practice"

### **4. Review Days & Mock Exams**

- **Review Day**: Scheduled on your chosen day (e.g., Sunday) EVERY week
  - Uses the study hours allocated for that day
  - Marked with `item_type: 'review'`

- **Mock Exam Day**: Scheduled on your chosen day (e.g., Saturday) every 2 weeks
  - Always 180 minutes (3 hours) - full practice test
  - Marked with `item_type: 'mock_exam'`

### **5. Exam Date Constraint**

- Calculates weeks available until exam date
- Spreads all lessons across available time
- **NEVER schedules past exam date**
- Adds final **"EXAM WEEK"** marker on actual exam day
  - Marked with `item_type: 'exam_day'`
  - Scheduled on the EXACT exam date

---

## 🎓 Example Learning Path

Given:
- Target Exam: January 1st, 2026 (47 days away / 6-7 weeks)
- Study Hours: Mon 0.75h, Tue 1h, Wed 0h, Thu 0.75h, Fri 1h, Sat 2h, Sun 2h
- Review Day: Sunday
- Mock Exam Day: Saturday
- Alternating Weeks: No

### Generated Path:

**Week 1: Introduction**
- Monday: ACT Test Basics & Overview (45 min)
- Tuesday: Skip (no lessons fit)
- Wednesday: Skip (0 hours)
- Thursday: Skip (no lessons)
- Friday: Skip (no lessons)
- Saturday: Skip (reserved for mock exam in week 2)
- Sunday: **REVIEW DAY** (120 min)

**Week 2: English + Math Fundamentals**
- Monday: Building Complete Sentences [English] (45 min)
- Tuesday: Essential Comma Rules [English] (60 min)
- Wednesday: Skip (0 hours)
- Thursday: Areas & Volumes [Math] (45 min)
- Friday: Lines [Math] (60 min)
- Saturday: **MOCK EXAM** (180 min) ← Every 2 weeks
- Sunday: **REVIEW DAY** (120 min)

**Week 3: English + Math Fundamentals**
- Monday-Friday: More lessons scheduled based on available time
- Saturday: Skip (mock exam in week 4)
- Sunday: **REVIEW DAY**

**Week 4: Reading + Math**
- Monday-Friday: Reading + Math lessons
- Saturday: **MOCK EXAM** (180 min)
- Sunday: **REVIEW DAY**

...continues through Week 6...

**Week 7: EXAM WEEK**
- January 1st: **EXAM DAY** ← Marked on calendar

---

## 🔄 How to Update Your Settings

After running the SQL, the "Edit Learning Path Goals" form will still show old fields. You'll need to update it to match the onboarding. For now, you can:

1. **Update via Onboarding**: Go through the onboarding flow again to set proper per-day hours
2. **Direct Database Update**: Update user_goals table directly in Supabase with your JSON schedule

### Example user_goals row:

```json
{
  "user_id": "your-user-id",
  "target_exam_date": "2026-01-01",
  "current_score": null,
  "target_score": 28,
  "study_hours": {
    "monday": 0.75,
    "tuesday": 1,
    "wednesday": 0,
    "thursday": 0.75,
    "friday": 1,
    "saturday": 2,
    "sunday": 2
  },
  "study_hours_week2": {
    "monday": 0.75,
    "tuesday": 1,
    "wednesday": 0,
    "thursday": 0.75,
    "friday": 1,
    "saturday": 2,
    "sunday": 2
  },
  "use_alternating_weeks": false,
  "weakest_section": "math",
  "review_day": "sunday",
  "mock_exam_day": "saturday",
  "learning_pace": "moderate",
  "reminder_frequency": "daily"
}
```

---

## ✅ Success Checklist

After running the SQL and regenerating the learning path:

- [ ] SQL executed successfully in Supabase
- [ ] user_goals table has new columns (study_hours, study_hours_week2, etc.)
- [ ] Edit Goals modal saves without errors
- [ ] Learning path regenerates (check console for logs)
- [ ] Calendar shows lessons ONLY on days with study hours
- [ ] Wednesday is skipped (0 hours)
- [ ] Review days appear on Sunday
- [ ] Mock exams appear every 2 weeks on Saturday
- [ ] Final week shows "EXAM WEEK"
- [ ] All lessons scheduled BEFORE January 1st

---

## 🐛 Troubleshooting

### "Could not find the 'study_hours' column"
- You didn't run `UPDATE_USER_GOALS_SCHEMA.sql` yet
- Run it in Supabase SQL Editor

### Learning path still shows 23 weeks instead of 47 weeks
- Clear browser cache and refresh
- Make sure exam date is set correctly (January 1st, 2026)
- Check console for calculation logs

### Review days not showing
- Make sure `review_day` column exists (run `UPDATE_USER_GOALS_SCHEMA.sql`)
- Check that review_day is set in user_goals (e.g., 'sunday')

### Mock exams not showing
- Make sure `mock_exam_day` column exists
- Check that mock_exam_day is set in user_goals (e.g., 'saturday')

---

## 📝 Files Modified

1. **`src/services/api/learning-path.service.js`** - Complete rewrite of scheduling algorithm
2. **`src/components/app/CourseContent.jsx`** - Updated to pass entire goals object
3. **`UPDATE_USER_GOALS_SCHEMA.sql`** - NEW - Run this in Supabase!

---

## 🎯 Next Steps

1. **Run the SQL** (UPDATE_USER_GOALS_SCHEMA.sql)
2. **Test regeneration** (change exam date and save)
3. **Verify calendar** shows proper scheduling
4. **Update Edit Goals form** to show per-day hours (future task)

---

**Last Updated**: 2025-01-14
**Status**: Code complete. Waiting for user to run SQL and test.
