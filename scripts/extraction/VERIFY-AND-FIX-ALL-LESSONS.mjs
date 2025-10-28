import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔍 VERIFYING ULTRA-SPECIFIC LESSON ASSIGNMENTS\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Get all lessons
const { data: lessons } = await supabase.from('lessons').select('*');
const lessonsByKey = {};
const lessonsBySubject = {};
lessons.forEach(l => {
  lessonsByKey[l.lesson_key] = l;
  if (!lessonsBySubject[l.subject]) lessonsBySubject[l.subject] = [];
  lessonsBySubject[l.subject].push(l);
});

console.log(`Total lessons: ${lessons.length}`);
console.log(`Math: ${lessonsBySubject.math?.length || 0}`);
console.log(`English: ${lessonsBySubject.english?.length || 0}`);
console.log(`Reading: ${lessonsBySubject.reading?.length || 0}`);
console.log(`Science: ${lessonsBySubject.science?.length || 0}\n`);

// ============================================================================
// MATH VERIFICATION - Check if assignments are truly specific
// ============================================================================
console.log('📐 VERIFYING MATH LESSON ASSIGNMENTS...\n');

const { data: mathQuestions } = await supabase
  .from('act_math_questions')
  .select('id, question_stem, question_type, question_category, lesson_id');

let mathCorrect = 0;
let mathIncorrect = 0;
const mathSamples = {};

for (const q of mathQuestions) {
  const stem = (q.question_stem || '').toLowerCase();
  const type = (q.question_type || '').toLowerCase();
  const allText = stem + ' ' + type;

  // Get current lesson
  const currentLesson = lessons.find(l => l.id === q.lesson_id);
  if (!currentLesson) continue;

  // Verify if assignment is truly specific
  let isCorrect = true;

  // Check for specific patterns
  if (currentLesson.lesson_key === '2.5') { // Circles, Ellipses, Hyperbolas
    if (!allText.match(/\b(circle|ellipse|hyperbola|conic|circumference|radius|diameter)\b/)) {
      isCorrect = false;
    }
  } else if (currentLesson.lesson_key === '2.4') { // Arcs and Sectors
    if (!allText.match(/\b(arc|sector|central angle|inscribed angle)\b/)) {
      isCorrect = false;
    }
  } else if (currentLesson.lesson_key === 'trigonometry') {
    if (!allText.match(/\b(sin|cos|tan|sine|cosine|tangent|trig|radian|degree)\b/)) {
      isCorrect = false;
    }
  } else if (currentLesson.lesson_key === 'quadratics') {
    if (!allText.match(/\b(quadratic|parabola|vertex|x\^2|\^2)\b/)) {
      isCorrect = false;
    }
  } else if (currentLesson.lesson_key === '6.3') { // Probability
    if (!allText.match(/\b(probability|likely|chance|odds|favorable)\b/)) {
      isCorrect = false;
    }
  }

  if (isCorrect) {
    mathCorrect++;
  } else {
    mathIncorrect++;
    if (!mathSamples[currentLesson.lesson_key]) {
      mathSamples[currentLesson.lesson_key] = [];
    }
    if (mathSamples[currentLesson.lesson_key].length < 3) {
      mathSamples[currentLesson.lesson_key].push({
        stem: q.question_stem?.substring(0, 100),
        type: q.question_type
      });
    }
  }
}

console.log(`✅ Correctly assigned: ${mathCorrect}`);
console.log(`❌ Potentially incorrect: ${mathIncorrect}\n`);

if (mathIncorrect > 0) {
  console.log('Sample potentially incorrect Math assignments:');
  for (const [lessonKey, samples] of Object.entries(mathSamples)) {
    const lesson = lessonsByKey[lessonKey];
    console.log(`\n  ${lessonKey} - ${lesson?.title}:`);
    samples.forEach((s, idx) => {
      console.log(`    ${idx + 1}. Type: ${s.type}`);
      console.log(`       Stem: ${s.stem}...`);
    });
  }
}

// ============================================================================
// ENGLISH VERIFICATION
// ============================================================================
console.log('\n\n📝 VERIFYING ENGLISH LESSON ASSIGNMENTS...\n');

const { data: englishQuestions } = await supabase
  .from('act_english_questions')
  .select('id, question_stem, question_type, underlined_text, choice_a, choice_b, choice_c, choice_d, lesson_id');

let englishCorrect = 0;
let englishIncorrect = 0;
const englishSamples = {};

for (const q of englishQuestions) {
  const stem = (q.question_stem || '').toLowerCase();
  const type = (q.question_type || '').toLowerCase();
  const underlined = (q.underlined_text || '').toLowerCase();
  const allText = stem + ' ' + type + ' ' + underlined;

  const currentLesson = lessons.find(l => l.id === q.lesson_id);
  if (!currentLesson) continue;

  let isCorrect = true;

  // Verify pronoun assignment
  if (currentLesson.lesson_key === 'pronouns') {
    if (!allText.match(/\b(he|she|it|they|them|their|his|her|its|who|whom|whose)\b/) &&
        !type.includes('pronoun')) {
      isCorrect = false;
    }
  }
  // Verify verb assignment
  else if (currentLesson.lesson_key === 'verbs') {
    if (!allText.match(/\b(verb|tense|past|present|future|had|has|have|was|were|will|would)\b/) &&
        !type.includes('verb')) {
      isCorrect = false;
    }
  }
  // Verify comma assignment
  else if (currentLesson.lesson_key === 'commas') {
    if (!allText.includes('comma') && !type.includes('comma') && !underlined.includes(',')) {
      isCorrect = false;
    }
  }

  if (isCorrect) {
    englishCorrect++;
  } else {
    englishIncorrect++;
    if (!englishSamples[currentLesson.lesson_key]) {
      englishSamples[currentLesson.lesson_key] = [];
    }
    if (englishSamples[currentLesson.lesson_key].length < 3) {
      englishSamples[currentLesson.lesson_key].push({
        stem: q.question_stem?.substring(0, 100),
        type: q.question_type,
        underlined: q.underlined_text
      });
    }
  }
}

console.log(`✅ Correctly assigned: ${englishCorrect}`);
console.log(`❌ Potentially incorrect: ${englishIncorrect}\n`);

if (englishIncorrect > 0) {
  console.log('Sample potentially incorrect English assignments:');
  for (const [lessonKey, samples] of Object.entries(englishSamples)) {
    const lesson = lessonsByKey[lessonKey];
    console.log(`\n  ${lessonKey} - ${lesson?.title}:`);
    samples.forEach((s, idx) => {
      console.log(`    ${idx + 1}. Type: ${s.type}`);
      console.log(`       Underlined: ${s.underlined}`);
      console.log(`       Stem: ${s.stem}...`);
    });
  }
}

// ============================================================================
// SCIENCE ULTRA-SPECIFIC MAPPING
// ============================================================================
console.log('\n\n🔬 ANALYZING SCIENCE FOR ULTRA-SPECIFIC MAPPING...\n');

const { data: scienceQuestions } = await supabase
  .from('act_science_questions')
  .select('*');

const { data: scienceLessons } = await supabase
  .from('lessons')
  .select('*')
  .eq('subject', 'science');

console.log(`Science lessons available: ${scienceLessons.length}`);
scienceLessons.forEach(l => {
  console.log(`  - ${l.lesson_key}: ${l.title}`);
});

// Function to find ultra-specific science lesson
function findUltraSpecificScienceLesson(q) {
  const stem = (q.question_stem || '').toLowerCase();
  const type = (q.question_type || '').toLowerCase();
  const category = (q.question_category || '').toLowerCase();
  const allText = stem + ' ' + type + ' ' + category;

  // Data Representation lessons
  if (allText.match(/\b(graph|table|chart|data|plot|figure|axis|trend)\b/) &&
      !allText.match(/\b(experiment|study|researcher|hypothesis|conclusion)\b/)) {

    // Advanced graphs
    if (allText.match(/\b(scatter plot|box plot|logarithmic|exponential curve|regression)\b/)) {
      return scienceLessons.find(l => l.lesson_key === 'advanced-graphs');
    }

    // Basic graphs and tables
    return scienceLessons.find(l => l.lesson_key === 'graphs-tables');
  }

  // Research Summaries lessons
  if (allText.match(/\b(experiment|study|procedure|method|trial|test|measure|observe)\b/)) {

    // Experimental setup/design
    if (allText.match(/\b(control|variable|independent|dependent|constant|design|setup)\b/)) {
      return scienceLessons.find(l => l.lesson_key === 'experimental-setup');
    }

    // General experiments
    return scienceLessons.find(l => l.lesson_key === 'experiments');
  }

  // Conflicting Viewpoints
  if (allText.match(/\b(scientist|hypothesis|theory|model|viewpoint|perspective|argues|claims|both scientists|student)\b/)) {
    return scienceLessons.find(l => l.lesson_key === 'conflicting-viewpoints');
  }

  // Passage approach strategies
  if (allText.match(/\b(passage|approach|strategy|reading)\b/) && type.includes('strategy')) {
    return scienceLessons.find(l => l.lesson_key === 'passage-approach');
  }

  // Question diagnosis
  if (allText.match(/\b(question type|identify|recognize|diagnosis)\b/)) {
    return scienceLessons.find(l => l.lesson_key === 'question-diagnosis');
  }

  // Default to graphs-tables for data interpretation
  if (category.includes('iod') || type.includes('data')) {
    return scienceLessons.find(l => l.lesson_key === 'graphs-tables');
  }

  // Default to experiments for research summaries
  if (category.includes('sin') || type.includes('research')) {
    return scienceLessons.find(l => l.lesson_key === 'experiments');
  }

  // Default to conflicting viewpoints
  if (category.includes('cs')) {
    return scienceLessons.find(l => l.lesson_key === 'conflicting-viewpoints');
  }

  return null;
}

const scienceUpdates = [];
const scienceLessonCounts = {};

for (const q of scienceQuestions) {
  const lesson = findUltraSpecificScienceLesson(q);
  if (lesson) {
    scienceLessonCounts[lesson.lesson_key] = (scienceLessonCounts[lesson.lesson_key] || 0) + 1;
    if (lesson.id !== q.lesson_id) {
      scienceUpdates.push({ id: q.id, newLesson: lesson.id, lesson_key: lesson.lesson_key });
    }
  }
}

console.log(`\nScience: ${scienceUpdates.length} questions to update\n`);
console.log('New Science Lesson Distribution:');
Object.entries(scienceLessonCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([key, count]) => {
    const lesson = scienceLessons.find(l => l.lesson_key === key);
    console.log(`  ${key}: ${count} - ${lesson?.title || 'Unknown'}`);
  });

console.log(`\nScience Lessons Used: ${Object.keys(scienceLessonCounts).length} of ${scienceLessons.length}`);

// Execute updates if flag provided
if (process.argv.includes('--execute')) {
  console.log('\n🚀 EXECUTING SCIENCE UPDATES...\n');

  let scienceUpdated = 0;
  for (const update of scienceUpdates) {
    const { error } = await supabase
      .from('act_science_questions')
      .update({ lesson_id: update.newLesson })
      .eq('id', update.id);
    if (!error) scienceUpdated++;
  }

  console.log(`✅ Updated ${scienceUpdated} science questions`);
  console.log(`\n🎉 SCIENCE REMAPPING COMPLETE!`);
}

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('📊 FINAL SUMMARY\n');
console.log(`Math: ${mathCorrect}/${mathQuestions.length} correctly assigned (${((mathCorrect/mathQuestions.length)*100).toFixed(1)}%)`);
console.log(`English: ${englishCorrect}/${englishQuestions.length} correctly assigned (${((englishCorrect/englishQuestions.length)*100).toFixed(1)}%)`);
console.log(`Science: ${scienceUpdates.length} to be updated for ultra-specific mapping`);
