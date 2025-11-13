const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const englishFundamentalsContent = `<!--
LESSON TEMPLATE v4.0
Subject: English
Topic: English Section Fundamentals
Lesson Key: english-intro
-->

<!-- ========================================
     SECTION 1: OPENING (2 SENTENCES MAX)
     CRITICAL: Must have:
     - MAXIMUM 2 sentences
     - ACT context (# of questions or %)
     - NO blue underlined terms here
     ======================================== -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
The ACT English section consists of 75 questions in 45 minutes, making it the most time-pressured section with only 36 seconds per question. Understanding the test format, question types, and strategic approach is essential before diving into specific grammar and rhetorical skills.
</p>

<!-- ========================================
     SECTION 2: CONTENT (EXACTLY 4 H3 SECTIONS)
     Each H3 = Major Concept
     Use BULLET POINTS with indents, NOT paragraphs
     ======================================== -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Test Format and Structure
</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Section Overview
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">75 questions</strong> testing grammar, punctuation, and rhetorical skills
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">5 passages of varying topics (narrative, social studies, science, humanities)</li>
      <li style="margin: 0.2rem 0;">Approximately 15 questions per passage</li>
      <li style="margin: 0.2rem 0;">45 minutes total = ~36 seconds per question</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Passage Types
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Each passage is a complete essay with numbered sentences containing underlined portions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Most questions ask you to choose the best replacement for the underlined portion</li>
      <li style="margin: 0.2rem 0;">Choice A or F is always "NO CHANGE" (keep the original)</li>
      <li style="margin: 0.2rem 0;">Some questions ask about sentence placement, paragraph structure, or passage organization</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Question Categories
</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Conventions of Standard English (51-56 questions)
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Sentence Structure</strong> (15-20 questions)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Recognizing and correcting fragments, run-ons, and comma splices</li>
      <li style="margin: 0.2rem 0;">Properly connecting independent and dependent clauses</li>
      <li style="margin: 0.2rem 0;">Using appropriate coordinating and subordinating conjunctions</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Punctuation</strong> (13-19 questions)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Commas, semicolons, colons, dashes, and apostrophes</li>
      <li style="margin: 0.2rem 0;">End punctuation and quotation marks</li>
      <li style="margin: 0.2rem 0;">Unnecessary punctuation and comma rules</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Usage</strong> (13-19 questions)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Subject-verb agreement and pronoun-antecedent agreement</li>
      <li style="margin: 0.2rem 0;">Verb tense and pronoun case (who vs. whom, I vs. me)</li>
      <li style="margin: 0.2rem 0;">Commonly confused words and idioms</li>
      <li style="margin: 0.2rem 0;">Modifier placement and parallel structure</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Production of Writing (29-32 questions)
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Topic Development</strong> (13-16 questions)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Determining whether information is relevant to the passage</li>
      <li style="margin: 0.2rem 0;">Adding or deleting sentences based on purpose</li>
      <li style="margin: 0.2rem 0;">Choosing the most effective supporting details</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Organization, Unity, and Cohesion</strong> (11-15 questions)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Choosing logical transitions between sentences and paragraphs</li>
      <li style="margin: 0.2rem 0;">Placing sentences in the most logical order</li>
      <li style="margin: 0.2rem 0;">Introducing and concluding paragraphs effectively</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Knowledge of Language (5-8 questions)
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Precision and Concision</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Eliminating redundancy and wordiness</li>
      <li style="margin: 0.2rem 0;">Choosing the most precise word in context</li>
      <li style="margin: 0.2rem 0;">Maintaining consistent style and tone</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Key Strategies for Success
</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Time Management
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Aim for 9 minutes per passage to leave 5 minutes for review
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Don't spend more than 45 seconds on any single question</li>
      <li style="margin: 0.2rem 0;">Mark difficult questions and return to them after completing easier ones</li>
      <li style="margin: 0.2rem 0;">Most students find passages get harder as the test progresses</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Reading Strategy
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Read the passage first</strong> before answering questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read at a normal pace to understand the main idea and structure</li>
      <li style="margin: 0.2rem 0;">Don't try to spot every error on your first read-through</li>
      <li style="margin: 0.2rem 0;">Understanding the passage's purpose helps with rhetorical skills questions</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Answer questions in order since they follow the passage's flow
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read the sentence containing the underlined portion plus the sentences before and after</li>
      <li style="margin: 0.2rem 0;">Context is essential for rhetorical skills and some grammar questions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Answering Strategy
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">When in doubt, choose the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">shortest answer</strong> that is grammatically correct
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The ACT values concise writing and frequently tests redundancy</li>
      <li style="margin: 0.2rem 0;">DELETE options are correct more often than you might expect</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Trust your ear for obvious errors but verify with grammar rules
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If something "sounds wrong," it probably is</li>
      <li style="margin: 0.2rem 0;">However, some errors are designed to sound natural to trap students</li>
      <li style="margin: 0.2rem 0;">Always identify the specific grammar rule being tested</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Read all four answer choices before selecting one
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The first answer that seems correct may not be the best option</li>
      <li style="margin: 0.2rem 0;">Compare choices to find subtle differences in meaning or conciseness</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Common Traps and How to Avoid Them
</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
The "Sounds Right" Trap
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Many errors sound natural in casual speech but violate formal writing rules
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: "Each of the students have their book" sounds fine but contains two errors</li>
      <li style="margin: 0.2rem 0;">Subject-verb agreement: "each" is singular, so "has" is correct</li>
      <li style="margin: 0.2rem 0;">Pronoun agreement: "each" requires singular "his or her" not plural "their"</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
The "Longer is Better" Trap
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Students often assume longer answers are more formal or sophisticated
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The ACT consistently favors <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">concise, clear writing</strong></li>
      <li style="margin: 0.2rem 0;">Watch for redundant phrases like "past history," "future plans," "end result"</li>
      <li style="margin: 0.2rem 0;">DELETE is correct whenever the underlined portion repeats information</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
The "NO CHANGE" Trap
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Some students avoid "NO CHANGE" because they expect every question to have an error
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"NO CHANGE" is correct about 25% of the time (roughly 18-20 questions)</li>
      <li style="margin: 0.2rem 0;">If you can't identify a specific error, "NO CHANGE" is likely correct</li>
      <li style="margin: 0.2rem 0;">Don't change something just because you think there "should" be a change</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
The "Context" Trap
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Reading only the underlined sentence without surrounding context causes errors
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Transition words must logically connect ideas between sentences</li>
      <li style="margin: 0.2rem 0;">Verb tense must remain consistent with surrounding sentences</li>
      <li style="margin: 0.2rem 0;">Pronouns must clearly refer to the correct noun from earlier sentences</li>
      <li style="margin: 0.2rem 0;">Always read the sentence before and after the question</li>
    </ul>
  </li>
</ul>
</body></html>`;

async function createEnglishFundamentals() {
  console.log('Creating English Section Fundamentals lesson...\n');

  // First, check if it exists
  const { data: existing } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'english-intro')
    .single();

  let result;
  if (existing) {
    // Update existing
    result = await supabase
      .from('lessons')
      .update({
        subject: 'english',
        title: 'English Section Fundamentals',
        content: englishFundamentalsContent,
        duration: '35 min',
        updated_at: new Date().toISOString()
      })
      .eq('lesson_key', 'english-intro')
      .select();
  } else {
    // Insert new
    result = await supabase
      .from('lessons')
      .insert({
        subject: 'english',
        lesson_key: 'english-intro',
        title: 'English Section Fundamentals',
        content: englishFundamentalsContent,
        duration: '35 min',
        updated_at: new Date().toISOString()
      })
      .select();
  }

  if (result.error) {
    console.error('❌ Error:', result.error.message);
  } else {
    console.log('✅ Successfully created English Section Fundamentals');
    console.log('   Duration: 35 min');
    console.log('   Content length:', englishFundamentalsContent.length, 'chars');
  }
}

createEnglishFundamentals();
