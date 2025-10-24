# ACT QUESTION BANK - MASTER INDEX
## Complete Analysis & 1:1 Test Generation System

**Version**: 2.0 (Modular + Gap Analysis Integrated)
**Last Updated**: 2025-10-22
**Timeline**: 5-8 weeks
**Status**: Planning Phase Complete - Ready for Execution

---

## 🎯 QUICK START

**New to this plan?** Read in this order:
1. **This document** (you are here) - Overview and navigation
2. **[Database Schema](./01-DATABASE-SCHEMA.md)** - Understand data structure
3. **[Phase 1: Setup](./02-PHASE-1-SETUP.md)** - First 3-5 days
4. **[Phase 2: Extraction](./03-PHASE-2-EXTRACTION.md)** - Extract all 1,680 questions (3-4 weeks)

**Already familiar?** Jump to any phase below.

---

## 📚 DOCUMENTATION STRUCTURE

### **Core Plan Documents** (Read in Order)
1. **[00-MASTER-INDEX.md](./00-MASTER-INDEX.md)** ← You are here
2. **[01-DATABASE-SCHEMA.md](./01-DATABASE-SCHEMA.md)** - All 10 tables, indexes, constraints
3. **[02-PHASE-1-SETUP.md](./02-PHASE-1-SETUP.md)** - Database setup (3-5 days)
4. **[03-PHASE-2-EXTRACTION.md](./03-PHASE-2-EXTRACTION.md)** - Extract 1,680 questions with figures & explanations (3-4 weeks)
5. **[04-PHASE-3-ANALYSIS.md](./04-PHASE-3-ANALYSIS.md)** - Pattern & distractor analysis (2-3 weeks)
6. **[05-PHASE-4-GENERATION.md](./05-PHASE-4-GENERATION.md)** - Build generation system (2-3 weeks)
7. **[06-PHASE-5-VALIDATION.md](./06-PHASE-5-VALIDATION.md)** - Testing, student integration & production deployment (1-2 weeks)
8. **[07-TECHNICAL-DETAILS.md](./07-TECHNICAL-DETAILS.md)** - Stack, tools, risks, appendices

### **Specialized Integration Documents**
- **[LESSON_TAGGING_INTEGRATION.md](../LESSON_TAGGING_INTEGRATION.md)** - Tag questions to 81 lessons

---

## 🎯 PROJECT GOAL

Extract all **1,680+ questions** from 7 official ACT practice tests into Supabase, analyze patterns, and build a system to generate authentic ACT practice tests with **90-95% similarity**.

---

## 📊 PROJECT OVERVIEW

### Current State
- ✅ 7 full official ACT practice tests (raw text format)
- ✅ ~1,500 lines of manual content analysis
- ✅ 81-lesson curriculum (English: 16, Math: 35, Reading: 14, Science: 16)
- ⚠️ Only ~20% of questions systematically analyzed
- ❌ No structured database

### Target State
- ✅ All 1,680 questions in Supabase with complete metadata
- ✅ All questions tagged to curriculum lessons
- ✅ Complete passage library (75+ passages)
- ✅ ~420 figures/diagrams digitized
- ✅ Full answer explanations for every question
- ✅ Distractor analysis (why each wrong answer exists)
- ✅ Statistical models for difficulty distribution
- ✅ AI-assisted generation system (90-95% ACT similarity)
- ✅ Automated validation suite

### Success Metrics
1. **Data Completeness**: 100% of 1,680 questions extracted & validated
2. **Lesson Coverage**: 100% of questions tagged to lessons
3. **Pattern Coverage**: 95%+ of question types have templates
4. **Generation Quality**: 90%+ similarity to real ACT
5. **Distractor Quality**: Wrong answers indistinguishable from real ACT
6. **Explanation Quality**: 95%+ of explanations rated "helpful" by students
7. **QA Accuracy**: <5% error rate in extracted data

---

## 📅 TIMELINE & PHASES

### **Phase 1: Database Setup** (3-5 days)
- Set up Supabase project
- Create 7 database tables
- Initialize progress tracking
- **Deliverable**: Fully functional database ready for data

**📖 Read**: [02-PHASE-1-SETUP.md](./02-PHASE-1-SETUP.md)

---

### **Phase 2: Data Extraction** (3-4 weeks)
- Extract all 1,680 questions from 7 tests
- Parse passages, questions, answer choices
- Digitize 420 figures/diagrams
- Create AI-generated answer explanations
- Detect duplicate questions
- 3-tier QA validation process
- Auto-tag questions to lessons
- **Deliverable**: Complete question database with metadata

**Test Breakdown** (per test):
- English: 75 questions (5 passages × 15 Q)
- Math: 60 questions
- Reading: 40 questions (4 passages × 10 Q)
- Science: 40 questions (6-7 passages)
- **Total**: 215 questions/test × 7 tests = **1,505 questions**

**📖 Read**: [03-PHASE-2-EXTRACTION.md](./03-PHASE-2-EXTRACTION.md)

---

### **Phase 3: Pattern Analysis** (2-3 weeks)
- Classify all question types (100+ types)
- Analyze all ~4,500 distractors
- Extract reusable templates
- Calculate difficulty scores
- Analyze statistical distributions
- **Deliverable**: Pattern library + distractor taxonomy

**📖 Read**: [04-PHASE-3-ANALYSIS.md](./04-PHASE-3-ANALYSIS.md)

---

### **Phase 4: Generation System** (2-3 weeks)
- Build template-based generator
- Build AI-assisted generator (Claude)
- Build hybrid generator
- Generate reading/science passages
- Lesson-tagged question generation
- **Deliverable**: Can generate full practice tests on demand

**📖 Read**: [05-PHASE-4-GENERATION.md](./05-PHASE-4-GENERATION.md)

---

### **Phase 5: Validation & Testing** (1-2 weeks)
- Calculate similarity scores (target: 90%+)
- Blind testing with reviewers
- Statistical validation
- Integration with student progress tracking
- Backup & recovery strategy
- Production API layer design
- Question versioning system
- Legal/copyright documentation
- Performance optimization
- **Deliverable**: Production-ready system with <5% error rate

**📖 Read**: [06-PHASE-5-VALIDATION.md](./06-PHASE-5-VALIDATION.md)

---

## 🔧 TECHNICAL STACK

- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (figures/diagrams)
- **Scripts**: Node.js (ES Modules)
- **AI**: Claude API (explanations, generation, analysis)
- **Frontend**: React + TypeScript
- **Hosting**: Vercel/Supabase

**📖 Read**: [07-TECHNICAL-DETAILS.md](./07-TECHNICAL-DETAILS.md)

---

## 💰 BUDGET

**Original Estimate**: $0 (time only)
**Revised Estimate**: $100-200

| Item | Cost |
|------|------|
| AI Explanations (Claude API) | $50-100 |
| Embeddings (duplicate detection) | $5 |
| Storage (Supabase - figures) | Free |
| QA Review (optional) | $0-300 |
| **Total** | **$55-405** |

**Note**: Can reduce to ~$55 if doing all QA yourself.

---

## ⏱️ TIME ESTIMATE

**Original**: 4-6 weeks
**Revised**: 5-8 weeks (accounting for gaps)

| Phase | Duration | Work Type |
|-------|----------|-----------|
| Phase 1: Setup | 3-5 days | One-time setup |
| Phase 2: Extraction | 3-4 weeks | Intensive, repetitive |
| Phase 3: Analysis | 2-3 weeks | Analytical |
| Phase 4: Generation | 2-3 weeks | Creative + coding |
| Phase 5: Validation | 1-2 weeks | Testing + polish |
| **TOTAL** | **5-8 weeks** | Full-time equivalent |

---

## 📈 PROGRESS TRACKING

Use `extraction_progress` table to track:
- 7 tests × 4 sections = **28 tracking rows**
- Real-time completion percentages
- Error rates and issues found
- Extraction/validation status per section

**Dashboard Query**: See [07-TECHNICAL-DETAILS.md](./07-TECHNICAL-DETAILS.md) - Appendix B

---

## 🎓 LESSON TAGGING INTEGRATION

Every question will be tagged to your **81-lesson curriculum**:
- English: 16 lessons → ~525 questions
- Math: 35 lessons → ~420 questions
- Reading: 14 lessons → ~280 questions
- Science: 16 lessons → ~280 questions

**Benefits**:
- Targeted practice after each lesson
- Analytics on lesson effectiveness
- Smart recommendations based on weak areas
- Auto-tagged question generation

**📖 Full Details**: [LESSON_TAGGING_INTEGRATION.md](../LESSON_TAGGING_INTEGRATION.md)

---

## 🚦 GETTING STARTED

### **Day 1: Read & Prepare**
1. ✅ Read this master index
2. ✅ Review [Database Schema](./01-DATABASE-SCHEMA.md)
3. ✅ Skim [Phase 1](./02-PHASE-1-SETUP.md)
4. ⚡ **Decision**: Figure digitization approach (screenshot vs manual)
5. ⚡ **Decision**: Explanation strategy (AI vs manual vs hybrid)
6. ⚡ **Decision**: QA approach (self vs hire reviewer)

### **Week 1: Database Setup**
1. Execute [Phase 1](./02-PHASE-1-SETUP.md)
2. Set up Supabase project
3. Run all schema creation scripts
4. Initialize progress tracking
5. Test with sample data

### **Weeks 2-5: Extraction**
1. Execute [Phase 2](./03-PHASE-2-EXTRACTION.md)
2. Start with English (most structured)
3. Digitize figures as you go
4. Generate explanations per test
5. Run QA after each test
6. Track progress daily

### **Weeks 6-8: Analysis & Generation**
1. Execute [Phase 3](./04-PHASE-3-ANALYSIS.md)
2. Execute [Phase 4](./05-PHASE-4-GENERATION.md)
3. Execute [Phase 5](./06-PHASE-5-VALIDATION.md)

---

## 🆘 SUPPORT & RESOURCES

### **Questions About...**
- **Database design?** → [01-DATABASE-SCHEMA.md](./01-DATABASE-SCHEMA.md)
- **Extraction process?** → [03-PHASE-2-EXTRACTION.md](./03-PHASE-2-EXTRACTION.md)
- **Lesson tagging?** → [LESSON_TAGGING_INTEGRATION.md](../LESSON_TAGGING_INTEGRATION.md)
- **Technical stack?** → [07-TECHNICAL-DETAILS.md](./07-TECHNICAL-DETAILS.md)
- **Production deployment?** → [06-PHASE-5-VALIDATION.md](./06-PHASE-5-VALIDATION.md)

### **Stuck on a Phase?**
Each phase document has:
- Clear task breakdown
- Code examples
- Validation checks
- Troubleshooting tips

---

## ✅ SUCCESS CRITERIA

### **Minimum Viable Product (MVP)**
- [ ] All 1,505 questions extracted
- [ ] All questions tagged to lessons
- [ ] Question types classified
- [ ] Basic distractor analysis
- [ ] Can generate English + Math questions
- [ ] <5% error rate in extracted data

### **Full Success**
- [ ] Complete answer explanations (all questions)
- [ ] All figures digitized and stored
- [ ] Complete distractor analysis
- [ ] 100+ pattern templates
- [ ] Can generate all 4 sections
- [ ] 90%+ similarity score
- [ ] 85%+ expert approval rate
- [ ] Production API ready

### **Stretch Goals**
- [ ] Student performance validation
- [ ] Adaptive difficulty system
- [ ] PDF export functionality
- [ ] Analytics dashboard
- [ ] Collaborative teacher features

---

## 📂 DIRECTORY STRUCTURE

```
act-prep-react/
├── docs/
│   ├── master-plan/
│   │   ├── 00-MASTER-INDEX.md (this file)
│   │   ├── 01-DATABASE-SCHEMA.md
│   │   ├── 02-PHASE-1-SETUP.md
│   │   ├── 03-PHASE-2-EXTRACTION.md
│   │   ├── 04-PHASE-3-ANALYSIS.md
│   │   ├── 05-PHASE-4-GENERATION.md
│   │   ├── 06-PHASE-5-VALIDATION.md
│   │   └── 07-TECHNICAL-DETAILS.md
│   ├── LESSON_TAGGING_INTEGRATION.md
│   └── progress-reports/ (weekly updates)
├── scripts/
│   ├── database/ (setup, utils, backups)
│   ├── extraction/ (parsers, validators)
│   ├── analysis/ (classification, patterns)
│   ├── generation/ (templates, AI, hybrid)
│   └── validation/ (testing, similarity)
├── database/
│   └── schemas/
│       └── act_question_bank_schema.sql
└── data/
    ├── practice-tests/ (7 ACT tests)
    └── figures/ (digitized diagrams)
```

---

## 🎯 NEXT STEPS

1. **Read** [Database Schema](./01-DATABASE-SCHEMA.md) to understand data structure
2. **Review** [Phase 1](./02-PHASE-1-SETUP.md) for setup instructions
3. **Make decisions** on critical gaps (figures, explanations, QA)
4. **Begin Phase 1** when ready
5. **Track progress** using extraction_progress table

---

**Ready to start?** → **[Begin with Database Schema →](./01-DATABASE-SCHEMA.md)**

---

**Version History**:
- v1.0 (2025-10-22): Original comprehensive plan
- v2.0 (2025-10-22): Modular structure + gaps integrated
