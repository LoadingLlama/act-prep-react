import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔬 ULTRA-SPECIFIC SCIENCE LESSON REMAPPING\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Get all science lessons
const { data: scienceLessons } = await supabase
  .from('lessons')
  .select('*')
  .eq('subject', 'science');

const lessonsByKey = {};
scienceLessons.forEach(l => lessonsByKey[l.lesson_key] = l);

console.log(`Loaded ${scienceLessons.length} Science lessons\n`);

// Get all science questions
const { data: scienceQuestions } = await supabase
  .from('act_science_questions')
  .select('*');

console.log(`Loaded ${scienceQuestions.length} Science questions\n`);

// Ultra-specific mapping function
function findUltraSpecificScienceLesson(q) {
  const stem = (q.question_stem || '').toLowerCase();
  const type = (q.question_type || '').toLowerCase();
  const category = (q.question_category || '').toLowerCase();
  const allText = stem + ' ' + type + ' ' + category;

  // SPECIFIC DATA POINT questions
  if (type.includes('data-interpretation') &&
      (stem.match(/according to (figure|table|graph)/) ||
       stem.match(/what (is|was) the/) ||
       stem.match(/at .* the .* (was|is)/))) {
    return lessonsByKey['specific-data-point'];
  }

  // TRENDS questions
  if (type.includes('trends') ||
      (type.includes('data') && (stem.match(/increase|decrease|trend|pattern|as .* increases|as .* decreases/)))) {
    return lessonsByKey['trends'];
  }

  // APPROXIMATION questions
  if (type.includes('approximation') ||
      stem.match(/\b(closest to|approximately|about|roughly|nearest)\b/)) {
    return lessonsByKey['approximation'];
  }

  // MULTIPLE FIGURES questions
  if (stem.match(/figures? \d+ and \d+|both figures|all .* figures/i)) {
    return lessonsByKey['multiple-figures'];
  }

  // FIGURES + TEXT questions
  if (stem.match(/according to .* and (figure|table)|passage (states|indicates) .* figure/i)) {
    return lessonsByKey['figures-text'];
  }

  // SCATTER PLOTS
  if (stem.match(/scatter plot|plotted points|correlation/i) ||
      allText.includes('scatter')) {
    return lessonsByKey['scatter-plots'];
  }

  // INVERSE TRENDS
  if (stem.match(/inverse|inversely|as .* increases .* decreases/i)) {
    return lessonsByKey['inverse-trends-multiple-axes'];
  }

  // TWO-PART ANSWERS
  if (type.includes('two-part') ||
      stem.match(/\b(both|neither|and|or)\b.*\b(both|neither|and|or)\b/)) {
    return lessonsByKey['two-part-answers'];
  }

  // EQUATIONS AS ANSWERS
  if (stem.match(/which (equation|expression|formula)/i) ||
      allText.includes('equation')) {
    return lessonsByKey['equations-as-answers'];
  }

  // MATH ON SCIENCE
  if (type.includes('math') ||
      stem.match(/calculate|compute|sum|multiply|divide|subtract|add/i)) {
    return lessonsByKey['math-on-science'];
  }

  // MIXING questions
  if (stem.match(/\b(mix|mixture|combine|solution|concentration)\b/i)) {
    return lessonsByKey['mixing'];
  }

  // CANNOT BE DETERMINED
  if (stem.match(/cannot be determined|not enough information|insufficient/i)) {
    return lessonsByKey['cannot-be-determined'];
  }

  // CONFLICTING VIEWPOINTS
  if (type.includes('conflicting') ||
      stem.match(/scientist \d|student \d|hypothesis|both .* agree|differ/i) ||
      category.includes('cs')) {
    return lessonsByKey['conflicting-viewpoints'];
  }

  // EXPERIMENTAL SETUP / DESIGN
  if (type.includes('experimental') ||
      stem.match(/\b(control|variable|independent|dependent|constant|experimental (design|setup))\b/i) ||
      allText.includes('experimental')) {
    return lessonsByKey['experimental-setup'];
  }

  // OUTSIDE KNOWLEDGE - Water
  if (allText.match(/\b(h2o|water|ice|steam|freeze|boil|evaporate|condense)\b/i)) {
    return lessonsByKey['water-knowledge'];
  }

  // OUTSIDE KNOWLEDGE - General
  if (type.includes('outside') ||
      stem.match(/based on (your knowledge|what you know)/i)) {
    return lessonsByKey['outside-knowledge'];
  }

  // EVALUATION questions
  if (type.includes('evaluation') || type.includes('evaluating') ||
      stem.match(/\b(evaluate|assess|determine whether|valid|support|weaken)\b/i)) {
    return lessonsByKey['conflicting-viewpoints']; // Related to analysis
  }

  // QUESTION DIAGNOSIS (meta questions)
  if (stem.match(/question (asks|is asking|type)/i)) {
    return lessonsByKey['question-diagnosis'];
  }

  // RESEARCH SUMMARIES category (SIN)
  if (category.includes('sin') ||
      type.includes('research') ||
      allText.match(/experiment|study|trial|procedure|method/)) {
    // Could be experimental-setup or general research
    if (stem.match(/\b(setup|design|control|variable)\b/i)) {
      return lessonsByKey['experimental-setup'];
    }
    return lessonsByKey['specific-data-point']; // Many research questions ask for specific data
  }

  // DATA REPRESENTATION category (IOD)
  if (category.includes('iod') || type.includes('data-interpretation')) {
    // Already handled specific types above, default to specific data point
    return lessonsByKey['specific-data-point'];
  }

  // CONFLICTING VIEWPOINTS category (CS/EMI)
  if (category.includes('emi')) {
    return lessonsByKey['conflicting-viewpoints'];
  }

  // Default: use passage approach as last resort
  return lessonsByKey['passage-approach'];
}

// Apply remapping
const updates = [];
const lessonCounts = {};

for (const q of scienceQuestions) {
  const lesson = findUltraSpecificScienceLesson(q);
  if (lesson) {
    lessonCounts[lesson.lesson_key] = (lessonCounts[lesson.lesson_key] || 0) + 1;
    if (lesson.id !== q.lesson_id) {
      updates.push({
        id: q.id,
        newLesson: lesson.id,
        lessonKey: lesson.lesson_key,
        type: q.question_type,
        category: q.question_category
      });
    }
  }
}

console.log('📊 ULTRA-SPECIFIC SCIENCE REMAPPING RESULTS\n');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`Questions to update: ${updates.length}\n`);

console.log('New Science Lesson Distribution:');
Object.entries(lessonCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([key, count]) => {
    const lesson = lessonsByKey[key];
    console.log(`  ${key}: ${count} - ${lesson?.title || 'Unknown'}`);
  });

console.log(`\nScience Lessons Used: ${Object.keys(lessonCounts).length} of ${scienceLessons.length}`);

const unusedLessons = scienceLessons.filter(l => !lessonCounts[l.lesson_key]);
if (unusedLessons.length > 0) {
  console.log(`\nUnused lessons (${unusedLessons.length}):`);
  unusedLessons.forEach(l => {
    console.log(`  - ${l.lesson_key}: ${l.title}`);
  });
}

// Execute if flag provided
if (process.argv.includes('--execute')) {
  console.log('\n🚀 EXECUTING SCIENCE UPDATES...\n');

  let updated = 0;
  for (const update of updates) {
    const { error } = await supabase
      .from('act_science_questions')
      .update({ lesson_id: update.newLesson })
      .eq('id', update.id);
    if (!error) updated++;
  }

  console.log(`✅ Updated ${updated} science questions`);
  console.log(`\n🎉 ULTRA-SPECIFIC SCIENCE REMAPPING COMPLETE!`);
}
