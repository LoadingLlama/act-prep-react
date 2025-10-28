import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔬 ULTRA-SPECIFIC MOLECULAR LESSON REMAPPING\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Get all lessons
const { data: lessons } = await supabase.from('lessons').select('*');
const lessonsByKey = {};
lessons.forEach(l => lessonsByKey[l.lesson_key] = l);

// Get all Math questions with full content
const { data: mathQuestions } = await supabase
  .from('act_math_questions')
  .select('*');

// Get all English questions with full content
const { data: englishQuestions } = await supabase
  .from('act_english_questions')
  .select('*');

console.log(`Loaded ${mathQuestions.length} math questions`);
console.log(`Loaded ${englishQuestions.length} english questions\n`);

// ULTRA-SPECIFIC MATH MAPPING RULES (looking at actual content)
function findUltraSpecificMathLesson(q) {
  const stem = (q.question_stem || '').toLowerCase();
  const type = (q.question_type || '').toLowerCase();
  const category = (q.question_category || '').toLowerCase();
  const allText = stem + ' ' + type + ' ' + category;

  // Geometry - Ultra specific
  if (allText.match(/\b(arc|sector|central angle|inscribed angle)\b/)) {
    return lessonsByKey['2.4']; // Arcs and Sectors
  }
  if (allText.match(/\b(circle|ellipse|hyperbola|conic|circumference|radius|diameter)\b/)) {
    return lessonsByKey['2.5']; // Circles, Ellipses, Hyperbolas
  }
  if (allText.match(/\b(angle|parallel|perpendicular|transversal|complementary|supplementary)\b/) && !allText.includes('trig')) {
    return lessonsByKey['geometry-angles']; // Understanding Angles & Lines
  }
  if (allText.match(/\b(triangle|area|volume|perimeter|surface area|prism|pyramid|sphere|cylinder|cone)\b/)) {
    return lessonsByKey['2.2']; // Areas, Volumes & Triangles
  }
  if (allText.match(/\b(slope|line|linear|y-intercept|point-slope|standard form)\b/) && type.includes('linear')) {
    return lessonsByKey['2.3']; // Lines
  }

  // Algebra - Ultra specific
  if (allText.match(/\b(absolute value|\|.*\|)\b/)) {
    return lessonsByKey['3.6']; // Absolute Value
  }
  if (allText.match(/\b(system of equations|two equations|simultaneous|solve for both)\b/)) {
    return lessonsByKey['systems-equations']; // Systems of Equations
  }
  if (allText.match(/\b(quadratic|parabola|vertex|x\^2|ax\^2\+bx\+c|completing the square)\b/)) {
    return lessonsByKey['quadratics']; // Quadratics
  }
  if (allText.match(/\b(exponential growth|exponential decay|half-life|compound interest|population growth)\b/)) {
    return lessonsByKey['exponential-growth']; // Exponential Growth and Decay
  }
  if (allText.match(/\b(shift|translate|reflect|vertical shift|horizontal shift|f\(x\+|f\(x\-)\b/)) {
    return lessonsByKey['transforming-functions']; // Transforming Functions
  }
  if (allText.match(/\b(fraction|numerator|denominator|improper|mixed number)\b/) && type.includes('fraction')) {
    return lessonsByKey['3.2']; // Fractions
  }
  if (allText.match(/\b(exponent|power|base|exponential|radical|root|√)\b/) && !allText.includes('exponential growth')) {
    return lessonsByKey['3.3']; // Exponents and Roots
  }
  if (allText.match(/\b(logarithm|log|ln|natural log)\b/)) {
    return lessonsByKey['3.4']; // Logarithms
  }
  if (allText.match(/\b(inequality|greater than|less than|≤|≥|<|>)\b/) && type.includes('inequalit')) {
    return lessonsByKey['3.5']; // Inequalities
  }

  // Functions
  if (allText.match(/\b(function|f\(x\)|domain|range|input|output|evaluate)\b/) && type.includes('function')) {
    return lessonsByKey['functions']; // Functions
  }

  // Numbers
  if (allText.match(/\b(prime|factor|multiple|divisible|gcd|lcm|even|odd)\b/)) {
    return lessonsByKey['5.1']; // Number Theory
  }
  if (allText.match(/\b(percent|percentage|%|discount|markup|tax)\b/) && type.includes('percent')) {
    return lessonsByKey['5.2']; // Percentages
  }
  if (allText.match(/\b(ratio|proportion|scale|directly proportional)\b/) && (type.includes('ratio') || type.includes('proportion'))) {
    return lessonsByKey['5.3']; // Ratios and Proportions
  }
  if (allText.match(/\b(unit conversion|convert|meters to|feet to|hours to|minutes to)\b/)) {
    return lessonsByKey['5.4']; // Unit Conversion
  }
  if (allText.match(/\b(scientific notation|×10\^|standard form|e notation)\b/)) {
    return lessonsByKey['5.5']; // Scientific Notation
  }
  if (allText.match(/\b(pattern|repeating|sequence of|what comes next)\b/) && allText.includes('repeat')) {
    return lessonsByKey['5.6']; // Repeating Patterns
  }

  // Sequences
  if (allText.match(/\b(sequence|arithmetic sequence|geometric sequence|term|series|nth term)\b/)) {
    return lessonsByKey['sequences']; // Sequences
  }

  // Statistics
  if (allText.match(/\b(mean|median|mode|average|central tendency)\b/) && !allText.includes('advanced')) {
    return lessonsByKey['6.1']; // Mean, Median, Mode
  }
  if (allText.match(/\b(standard deviation|variance|distribution|quartile|percentile|outlier)\b/)) {
    return lessonsByKey['6.2']; // Advanced Statistics
  }
  if (allText.match(/\b(probability|likely|chance|odds|favorable outcomes)\b/)) {
    return lessonsByKey['6.3']; // Probability
  }
  if (allText.match(/\b(permutation|combination|arrangement|choose|nCr|nPr)\b/)) {
    return lessonsByKey['6.4']; // Permutations and Combinations
  }

  // Advanced
  if (allText.match(/\b(sin|cos|tan|sine|cosine|tangent|trig|radian|degree)\b/)) {
    return lessonsByKey['trigonometry']; // Trigonometry
  }
  if (allText.match(/\b(complex number|imaginary|i\^2|\+.*i|real part|imaginary part)\b/)) {
    return lessonsByKey['complex-numbers']; // Complex Numbers
  }
  if (allText.match(/\b(matrix|matrices|determinant|row|column)\b/)) {
    return lessonsByKey['matrices']; // Matrices
  }
  if (allText.match(/\b(vector|magnitude|direction|component)\b/)) {
    return lessonsByKey['vectors']; // Vectors
  }

  // Word problems
  if (allText.match(/\b(word problem|rate|speed|distance|time|work|age problem|mixture)\b/) || type.includes('word')) {
    return lessonsByKey['word-problems']; // Word Problems
  }

  // Strategies
  if (allText.match(/\b(plug in|substitute|test answer|work backwards)\b/)) {
    return lessonsByKey['backsolving']; // Backsolving
  }
  if (allText.match(/\b(substitute|substitution|let .* =)\b/) && allText.includes('strategy')) {
    return lessonsByKey['substitution']; // Substitution
  }

  // Miscellaneous
  if (allText.match(/\b(miscellaneous|other|various)\b/)) {
    return lessonsByKey['miscellaneous-topics']; // Miscellaneous Topics
  }

  // Default to Algebra Skills
  if (type.includes('algebra') || type.includes('math') || category.includes('alg')) {
    return lessonsByKey['3.1']; // Algebra Skills
  }

  return null;
}

// ULTRA-SPECIFIC ENGLISH MAPPING RULES
function findUltraSpecificEnglishLesson(q) {
  const stem = (q.question_stem || '').toLowerCase();
  const type = (q.question_type || '').toLowerCase();
  const category = (q.question_category || '').toLowerCase();
  const underlined = (q.underlined_text || '').toLowerCase();
  const allText = stem + ' ' + type + ' ' + category + ' ' + underlined;

  // Check all choices for patterns
  const allChoices = [q.choice_a, q.choice_b, q.choice_c, q.choice_d].join(' ').toLowerCase();

  // Ultra-specific pronoun detection
  if (allText.match(/\b(pronoun|he|she|it|they|them|their|his|her|its|who|whom|whose)\b/) ||
      type.includes('pronoun') ||
      underlined.match(/\b(he|she|it|they|them|their|his|her|its|who|whom)\b/)) {
    return lessonsByKey['pronouns']; // Pronouns
  }

  // Verb-specific
  if (allText.match(/\b(verb|tense|past|present|future|had|has|have|was|were|will|would)\b/) ||
      type.includes('verb')) {
    return lessonsByKey['verbs']; // Verbs
  }

  // Modifier-specific
  if (allText.match(/\b(modifier|misplaced|dangling|adjective|adverb|modifying)\b/) ||
      type.includes('modifier')) {
    return lessonsByKey['modifiers']; // Modifiers
  }

  // Parallel structure
  if (allText.match(/\b(parallel|parallelism|consistent form|same structure)\b/) ||
      type.includes('parallel')) {
    return lessonsByKey['parallel-structure']; // Parallel Structure
  }

  // Sentence structure
  if (allText.match(/\b(fragment|run-on|comma splice|complete sentence|independent clause)\b/) ||
      type.includes('fragment') || type.includes('comma-splice') || type.includes('sentence-structure')) {
    return lessonsByKey['sentence-structure']; // Sentence Structure
  }

  // Commas
  if (allText.match(/\b(comma|,)\b/) && type.includes('comma')) {
    return lessonsByKey['commas']; // Commas
  }

  // Punctuation
  if (allText.match(/\b(colon|semicolon|dash|apostrophe|quotation|:|;|--|'|")\b/) &&
      (type.includes('punctuation') || type.includes('colon') || type.includes('dash'))) {
    return lessonsByKey['punctuation']; // Punctuation
  }

  // Word choice & idioms
  if (allText.match(/\b(word choice|idiom|diction|vocabulary|appropriate word)\b/) ||
      type.includes('word-choice') || type.includes('idiom')) {
    return lessonsByKey['word-choice']; // Word Choice
  }

  // Redundancy
  if (allText.match(/\b(redundant|repetitive|wordiness|unnecessary|verbose|concise)\b/) ||
      type.includes('redundancy') || type.includes('wordiness')) {
    return lessonsByKey['redundancy']; // Redundancy
  }

  // Transitions
  if (allText.match(/\b(transition|however|therefore|moreover|furthermore|consequently|connect)\b/) ||
      type.includes('transition')) {
    return lessonsByKey['transitions']; // Transitions
  }

  // Adding/Deleting
  if (allText.match(/\b(add|delete|include|omit|relevant|should.*sentence)\b/) ||
      type.includes('adding') || type.includes('deleting')) {
    return lessonsByKey['adding-deleting']; // Adding/Deleting
  }

  // Which choice
  if (allText.match(/\b(which choice|best accomplishes|most effectively|purpose)\b/) ||
      type.includes('which-choice') || type.includes('purpose')) {
    return lessonsByKey['which-choice']; // Which Choice
  }

  // Logical placement
  if (allText.match(/\b(placement|order|sequence|organize|where.*sentence|rearrange)\b/) ||
      type.includes('placement')) {
    return lessonsByKey['logical-placement']; // Logical Placement
  }

  // Grammar review (catch-all for complex grammar)
  if (allText.match(/\b(grammar|grammatical|correct|error)\b/) && category.includes('cse')) {
    return lessonsByKey['grammar-review']; // Grammar Review
  }

  // Miscellaneous
  if (type.includes('misc') || allText.includes('miscellaneous')) {
    return lessonsByKey['misc-topics']; // Misc Topics
  }

  // Default to redundancy for POW category
  if (category.includes('pow') || type.includes('style') || type.includes('rhetorical')) {
    return lessonsByKey['redundancy'];
  }

  // Default to sentence structure for CSE category
  if (category.includes('cse')) {
    return lessonsByKey['sentence-structure'];
  }

  return null;
}

// Apply ultra-specific remapping
const mathUpdates = [];
const mathLessonCounts = {};

for (const q of mathQuestions) {
  const lesson = findUltraSpecificMathLesson(q);
  if (lesson) {
    mathLessonCounts[lesson.lesson_key] = (mathLessonCounts[lesson.lesson_key] || 0) + 1;
    if (lesson.id !== q.lesson_id) {
      mathUpdates.push({ id: q.id, newLesson: lesson.id, lesson_key: lesson.lesson_key });
    }
  }
}

const englishUpdates = [];
const englishLessonCounts = {};

for (const q of englishQuestions) {
  const lesson = findUltraSpecificEnglishLesson(q);
  if (lesson) {
    englishLessonCounts[lesson.lesson_key] = (englishLessonCounts[lesson.lesson_key] || 0) + 1;
    if (lesson.id !== q.lesson_id) {
      englishUpdates.push({ id: q.id, newLesson: lesson.id, lesson_key: lesson.lesson_key });
    }
  }
}

console.log('📊 ULTRA-SPECIFIC REMAPPING RESULTS\n');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`Math: ${mathUpdates.length} questions to update`);
console.log(`English: ${englishUpdates.length} questions to update\n`);

console.log('New Math Lesson Distribution:');
Object.entries(mathLessonCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([key, count]) => {
    const lesson = lessonsByKey[key];
    console.log(`  ${key}: ${count} - ${lesson?.title || 'Unknown'}`);
  });

console.log('\nNew English Lesson Distribution:');
Object.entries(englishLessonCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([key, count]) => {
    const lesson = lessonsByKey[key];
    console.log(`  ${key}: ${count} - ${lesson?.title || 'Unknown'}`);
  });

console.log(`\n\nMath Lessons Used: ${Object.keys(mathLessonCounts).length} of 35`);
console.log(`English Lessons Used: ${Object.keys(englishLessonCounts).length} of 16`);

// Execute if flag provided
if (process.argv.includes('--execute')) {
  console.log('\n🚀 EXECUTING ULTRA-SPECIFIC UPDATES...\n');

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

  console.log(`✅ Updated ${mathUpdated} math questions`);
  console.log(`✅ Updated ${englishUpdated} english questions`);
  console.log(`\n🎉 ULTRA-SPECIFIC REMAPPING COMPLETE!`);
}
