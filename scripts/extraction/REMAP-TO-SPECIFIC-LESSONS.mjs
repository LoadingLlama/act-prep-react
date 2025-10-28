import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🎯 REMAPPING QUESTIONS TO SPECIFIC LESSONS\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Get all lessons
const { data: lessons } = await supabase
  .from('lessons')
  .select('*');

const lessonsByKey = {};
const lessonsBySubject = {};

lessons.forEach(l => {
  lessonsByKey[l.lesson_key] = l;
  if (!lessonsBySubject[l.subject]) {
    lessonsBySubject[l.subject] = [];
  }
  lessonsBySubject[l.subject].push(l);
});

console.log(`Loaded ${lessons.length} lessons`);
console.log(`Math lessons: ${lessonsBySubject.math.length}`);
console.log(`English lessons: ${lessonsBySubject.english.length}`);

// MATH LESSON MAPPING RULES (based on question_type and question_category)
const mathLessonRules = [
  // Geometry lessons
  { lesson_key: '2.2', types: ['plane_geometry', 'solid_geometry', 'coordinate-geometry'], categories: ['plane-geometry', 'solid-geometry'] },
  { lesson_key: '2.3', types: ['linear_equations', 'graphing'], categories: ['coordinate-geometry'] },
  { lesson_key: '2.4', types: ['transformations', 'conic-sections'], categories: [] },
  { lesson_key: '2.5', types: ['conic-sections'], categories: ['conic-sections'] },
  { lesson_key: 'geometry-angles', types: ['geometry'], categories: ['GEO'], priority: 2 },

  // Algebra lessons
  { lesson_key: '3.2', types: ['fractions'], categories: ['fractions'] },
  { lesson_key: '3.3', types: ['exponents', 'radicals'], categories: ['exponents'] },
  { lesson_key: '3.4', types: ['logarithms'], categories: [] },
  { lesson_key: '3.5', types: ['inequalities', 'linear_inequalities'], categories: ['sequences'] },
  { lesson_key: '3.6', types: ['absolute-value'], categories: [] },

  // Functions & Advanced
  { lesson_key: 'functions', types: ['functions'], categories: ['functions', 'PHM-F'] },
  { lesson_key: 'quadratics', types: ['quadratics'], categories: [] },
  { lesson_key: 'systems-equations', types: ['systems'], categories: [] },
  { lesson_key: 'transforming-functions', types: ['transformations'], categories: [] },
  { lesson_key: 'exponential-growth', types: ['exponential'], categories: [] },
  { lesson_key: 'sequences', types: ['sequences', 'arithmetic-sequences'], categories: ['sequences', 'arithmetic-sequences'] },

  // Numbers
  { lesson_key: '5.1', types: ['number_theory', 'number_properties', 'number-theory'], categories: ['number-properties', 'number-theory'] },
  { lesson_key: '5.2', types: ['percentages'], categories: ['percentages'] },
  { lesson_key: '5.3', types: ['ratios', 'proportions'], categories: ['proportions'] },
  { lesson_key: '5.4', types: ['unit-conversion'], categories: [] },
  { lesson_key: '5.5', types: ['scientific-notation'], categories: ['scientific-notation'] },
  { lesson_key: '5.6', types: ['patterns'], categories: [] },

  // Statistics
  { lesson_key: '6.1', types: ['statistics-averages', 'mean', 'median', 'mode'], categories: ['statistics-averages'] },
  { lesson_key: '6.2', types: ['statistics', 'data-analysis'], categories: ['data-analysis'] },
  { lesson_key: '6.3', types: ['probability'], categories: ['probability-statistics'] },
  { lesson_key: '6.4', types: ['combinatorics', 'counting'], categories: [] },

  // Advanced topics
  { lesson_key: 'trigonometry', types: ['trigonometry'], categories: ['trigonometry'] },
  { lesson_key: 'complex-numbers', types: ['complex_numbers', 'complex-numbers'], categories: [] },
  { lesson_key: 'matrices', types: ['matrices'], categories: [] },
  { lesson_key: 'vectors', types: ['vectors'], categories: [] },
  { lesson_key: 'word-problems', types: ['word-problem', 'word_problems'], categories: ['rates', 'time-calculations'] },

  // Strategies
  { lesson_key: 'backsolving', types: ['backsolving'], categories: [] },
  { lesson_key: 'substitution', types: ['substitution'], categories: [] },

  // Catch-all for remaining
  { lesson_key: '3.1', types: ['algebra', 'prealgebra', 'arithmetic', 'math-problem-solving'], categories: ['ALG', 'PHM-A', 'IES', 'PHM-N', 'PHM-S', 'elementary-algebra', 'intermediate-algebra', 'IM'], priority: 10 }
];

// ENGLISH LESSON MAPPING RULES
const englishLessonRules = [
  { lesson_key: 'sentence-structure', types: ['fragment', 'comma-splice', 'sentence-structure'], categories: ['CSE'], priority: 1 },
  { lesson_key: 'commas', types: ['comma-usage'], categories: [], priority: 2 },
  { lesson_key: 'punctuation', types: ['punctuation', 'colon', 'dash', 'semicolon'], categories: [], priority: 3 },
  { lesson_key: 'verbs', types: ['verb-tense', 'verb-agreement', 'verb-form', 'verbs'], categories: [] },
  { lesson_key: 'pronouns', types: ['pronouns', 'pronoun-ambiguous'], categories: [] },
  { lesson_key: 'modifiers', types: ['modifiers', 'modifier-misplaced', 'modifier-dangling'], categories: [] },
  { lesson_key: 'parallel-structure', types: ['parallel-structure'], categories: [] },
  { lesson_key: 'redundancy', types: ['redundancy', 'wordiness'], categories: ['KLA'], priority: 5 },
  { lesson_key: 'word-choice', types: ['word-choice', 'idiom'], categories: [] },
  { lesson_key: 'transitions', types: ['transition', 'transitions'], categories: [] },
  { lesson_key: 'which-choice', types: ['which-choice', 'purpose'], categories: [] },
  { lesson_key: 'adding-deleting', types: ['adding-deleting', 'adding-info', 'adding-sentence', 'deleting-sentence'], categories: [] },
  { lesson_key: 'logical-placement', types: ['logical-placement', 'sentence-placement', 'word-placement'], categories: [] },

  // Catch-all for remaining
  { lesson_key: 'redundancy', types: ['style', 'rhetorical-skills', 'organization', 'usage-mechanics', 'grammar', 'main-idea'], categories: ['POW'], priority: 10 }
];

// Function to find best matching lesson
function findBestLesson(question, rules, subject) {
  const questionType = question.question_type?.toLowerCase() || '';
  const questionCategory = question.question_category?.toLowerCase() || '';

  let bestMatch = null;
  let bestPriority = 999;

  for (const rule of rules) {
    const priority = rule.priority || 1;

    // Check if type matches
    const typeMatch = rule.types.some(t => questionType.includes(t.toLowerCase()) || t.toLowerCase().includes(questionType));

    // Check if category matches
    const categoryMatch = rule.categories.some(c => questionCategory.includes(c.toLowerCase()) || c.toLowerCase().includes(questionCategory));

    if (typeMatch || categoryMatch) {
      if (priority < bestPriority) {
        bestMatch = lessonsByKey[rule.lesson_key];
        bestPriority = priority;
      }
    }
  }

  return bestMatch;
}

// REMAP MATH QUESTIONS
console.log('\n📐 REMAPPING MATH QUESTIONS...\n');

const { data: mathQuestions } = await supabase
  .from('act_math_questions')
  .select('*');

const mathUpdates = [];
const mathLessonCounts = {};

for (const question of mathQuestions) {
  const bestLesson = findBestLesson(question, mathLessonRules, 'math');

  if (bestLesson && bestLesson.id !== question.lesson_id) {
    mathUpdates.push({
      id: question.id,
      oldLesson: question.lesson_id,
      newLesson: bestLesson.id,
      type: question.question_type,
      category: question.question_category
    });
  }

  const lessonKey = bestLesson ? bestLesson.lesson_key : 'unknown';
  mathLessonCounts[lessonKey] = (mathLessonCounts[lessonKey] || 0) + 1;
}

console.log(`Found ${mathUpdates.length} math questions to remap`);
console.log('\nNew Math Lesson Distribution:');
Object.entries(mathLessonCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([key, count]) => {
    const lesson = lessonsByKey[key];
    console.log(`  ${key}: ${count} questions${lesson ? ` - ${lesson.title}` : ''}`);
  });

// REMAP ENGLISH QUESTIONS
console.log('\n\n📝 REMAPPING ENGLISH QUESTIONS...\n');

const { data: englishQuestions } = await supabase
  .from('act_english_questions')
  .select('*');

const englishUpdates = [];
const englishLessonCounts = {};

for (const question of englishQuestions) {
  const bestLesson = findBestLesson(question, englishLessonRules, 'english');

  if (bestLesson && bestLesson.id !== question.lesson_id) {
    englishUpdates.push({
      id: question.id,
      oldLesson: question.lesson_id,
      newLesson: bestLesson.id,
      type: question.question_type,
      category: question.question_category
    });
  }

  const lessonKey = bestLesson ? bestLesson.lesson_key : 'unknown';
  englishLessonCounts[lessonKey] = (englishLessonCounts[lessonKey] || 0) + 1;
}

console.log(`Found ${englishUpdates.length} english questions to remap`);
console.log('\nNew English Lesson Distribution:');
Object.entries(englishLessonCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([key, count]) => {
    const lesson = lessonsByKey[key];
    console.log(`  ${key}: ${count} questions${lesson ? ` - ${lesson.title}` : ''}`);
  });

// Summary
console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('📊 REMAPPING SUMMARY\n');
console.log(`Math: ${mathUpdates.length} questions to update`);
console.log(`English: ${englishUpdates.length} questions to update`);
console.log(`Total: ${mathUpdates.length + englishUpdates.length} questions to update`);

console.log('\n\nMath Lessons Used: ' + Object.keys(mathLessonCounts).length + ' of 35');
console.log('English Lessons Used: ' + Object.keys(englishLessonCounts).length + ' of 16');

// Ask for confirmation before updating
console.log('\n\n⚠️  Ready to update database. This will remap questions to more specific lessons.');
console.log('Review the distributions above before proceeding.\n');

// Save mapping plan to file
import fs from 'fs';
const mappingPlan = {
  generated_at: new Date().toISOString(),
  math: {
    updates: mathUpdates.length,
    distribution: mathLessonCounts
  },
  english: {
    updates: englishUpdates.length,
    distribution: englishLessonCounts
  },
  changes: {
    math: mathUpdates,
    english: englishUpdates
  }
};

fs.writeFileSync(
  '/Users/cadenchiang/Desktop/act-prep-react/reports/lesson-remapping-plan.json',
  JSON.stringify(mappingPlan, null, 2)
);

console.log('✅ Mapping plan saved to: reports/lesson-remapping-plan.json');
console.log('\nRun with --execute flag to apply changes to database.');

// If --execute flag provided, apply updates
if (process.argv.includes('--execute')) {
  console.log('\n🚀 EXECUTING DATABASE UPDATES...\n');

  let mathUpdated = 0;
  for (const update of mathUpdates) {
    const { error } = await supabase
      .from('act_math_questions')
      .update({ lesson_id: update.newLesson })
      .eq('id', update.id);

    if (!error) mathUpdated++;
  }

  let englishUpdated = 0;
  for (const update of englishUpdates) {
    const { error } = await supabase
      .from('act_english_questions')
      .update({ lesson_id: update.newLesson })
      .eq('id', update.id);

    if (!error) englishUpdated++;
  }

  console.log(`\n✅ Updated ${mathUpdated} math questions`);
  console.log(`✅ Updated ${englishUpdated} english questions`);
  console.log(`\n🎉 REMAPPING COMPLETE!`);
}
