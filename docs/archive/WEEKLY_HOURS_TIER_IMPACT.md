# 📚 Weekly Study Commitment - Dramatic Impact

## How It Works Now

The **Weekly Study Commitment** tier now **drastically changes** your learning path curriculum!

### Lessons Per Week by Tier

| Tier | Hours/Week | Lessons/Week | Description |
|------|------------|--------------|-------------|
| **Light** | 1-5 hours | **2 lessons** | Very slow, sustainable pace - perfect for busy schedules |
| **Moderate** | 5-10 hours | **4 lessons** | Standard pace - balanced approach |
| **Intensive** | 10-15 hours | **7 lessons** | Fast, aggressive pace - serious prep mode |
| **Extreme** | 15+ hours | **12 lessons** | Maximum pace - cramming/intensive bootcamp mode |

## Dramatic Differences

### Example: 4 Weeks Until Exam

**Light Tier (2 lessons/week):**
- Total lessons: ~8 lessons
- Focus: Core fundamentals only
- Best for: Maintaining knowledge, light review

**Moderate Tier (4 lessons/week):**
- Total lessons: ~16 lessons
- Focus: Essential concepts + practice
- Best for: Standard ACT prep (DEFAULT)

**Intensive Tier (7 lessons/week):**
- Total lessons: ~28 lessons
- Focus: Comprehensive coverage + practice
- Best for: Serious score improvement

**Extreme Tier (12 lessons/week):**
- Total lessons: ~48 lessons (6x more than Light!)
- Focus: Everything + intensive practice
- Best for: Crash course, major score boost needed

## 🎯 Impact on Your Schedule

The differences are **MASSIVE**:

### Week 1 - Light Tier
- 2 lessons total
- Plenty of time for deep study

### Week 1 - Extreme Tier
- 12 lessons total (6x more!)
- Fast-paced, requires serious dedication

## 🚀 How to Test This

### Step 1: Run SQL Migration (If You Haven't Already)
1. Go to: https://rabavobdklnwvwsldbix.supabase.co
2. Click: **SQL Editor**
3. Copy contents of: `ADD_WEEKLY_HOURS_TIER.sql`
4. Click: **RUN**

### Step 2: Test Different Tiers
1. Go to **Course** tab → Click **"Edit Learning Path Goals"**
2. Change **Weekly Study Commitment** dropdown
3. Click **"Save Changes"**
4. Watch the calendar update!

### Step 3: Compare Results

**Try Light tier:**
- Save and check Week 1 - you'll see ~2 lessons

**Then try Extreme tier:**
- Save and check Week 1 - you'll see ~12 lessons!

## 📊 Console Logs

When you save, look for this log in the browser console:

```
[INFO] LearningPathService.curriculumPacing {
  weeklyHoursTier: 'extreme',
  lessonsPerWeek: 12,
  message: 'EXTREME tier: 12 lessons/week, mock exams every 1 week(s)'
}
```

This confirms your tier is being applied correctly!

## ✅ What's Been Implemented

- ✅ Weekly hours tier dropdown in Edit Goals modal
- ✅ Tier saved to database (user_goals.weekly_hours_tier)
- ✅ Curriculum algorithm uses tier to set lessons/week
- ✅ Dramatic differences: 2, 4, 7, or 12 lessons/week
- ✅ Default is "Moderate" (4 lessons/week)

## 🎓 Recommendations

- **Light**: Maintaining a score, reviewing basics
- **Moderate**: Standard ACT prep, 4-8 weeks out
- **Intensive**: 2-4 weeks out, need significant improvement
- **Extreme**: 1-2 weeks out, crash course mode, or very motivated students

---

**Status**: ✅ Fully Implemented
**Next**: Add same dropdown to onboarding flow
