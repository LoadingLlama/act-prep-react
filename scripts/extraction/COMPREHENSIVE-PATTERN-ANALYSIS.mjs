import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔬 COMPREHENSIVE PATTERN & TYPE ANALYSIS\n');
console.log('═══════════════════════════════════════════════════════════════\n');

const analysis = {
  totalQuestions: 0,
  bySection: {},
  allQuestionTypes: {},
  allQuestionCategories: {},
  answerDistributions: {},
  lessonDistributions: {},
  sentencePatterns: {},
  choicePatterns: {}
};

// Analyze all sections
const sections = [
  { table: 'act_english_questions', name: 'ENGLISH' },
  { table: 'act_math_questions', name: 'MATH' },
  { table: 'act_reading_questions', name: 'READING' },
  { table: 'act_science_questions', name: 'SCIENCE' }
];

for (const section of sections) {
  console.log(`\n📊 Analyzing ${section.name}...`);

  const { data: questions, error } = await supabase
    .from(section.table)
    .select('*')
    .order('test_number, question_number');

  if (error) {
    console.error(`Error: ${error.message}`);
    continue;
  }

  console.log(`   Found ${questions.length} questions`);

  analysis.totalQuestions += questions.length;

  analysis.bySection[section.name] = {
    totalQuestions: questions.length,
    questionTypes: {},
    questionCategories: {},
    answerDistribution: { A: 0, B: 0, C: 0, D: 0, E: 0 },
    lessonDistribution: {},
    byTest: {},
    patterns: {
      avgQuestionLength: 0,
      avgChoiceLength: 0,
      totalChars: 0,
      totalWords: 0
    }
  };

  // Analyze each question
  for (const q of questions) {
    // Question types
    if (q.question_type) {
      analysis.bySection[section.name].questionTypes[q.question_type] =
        (analysis.bySection[section.name].questionTypes[q.question_type] || 0) + 1;
      analysis.allQuestionTypes[q.question_type] =
        (analysis.allQuestionTypes[q.question_type] || 0) + 1;
    }

    // Question categories
    if (q.question_category) {
      analysis.bySection[section.name].questionCategories[q.question_category] =
        (analysis.bySection[section.name].questionCategories[q.question_category] || 0) + 1;
      analysis.allQuestionCategories[q.question_category] =
        (analysis.allQuestionCategories[q.question_category] || 0) + 1;
    }

    // Answer distribution
    const answer = q.correct_answer;
    if (answer) {
      analysis.bySection[section.name].answerDistribution[answer]++;
      if (!analysis.answerDistributions[section.name]) {
        analysis.answerDistributions[section.name] = { A: 0, B: 0, C: 0, D: 0, E: 0 };
      }
      analysis.answerDistributions[section.name][answer]++;
    }

    // Lesson distribution
    if (q.lesson_id) {
      analysis.bySection[section.name].lessonDistribution[q.lesson_id] =
        (analysis.bySection[section.name].lessonDistribution[q.lesson_id] || 0) + 1;
    }

    // Test distribution
    if (!analysis.bySection[section.name].byTest[q.test_number]) {
      analysis.bySection[section.name].byTest[q.test_number] = {
        count: 0,
        types: {},
        categories: {},
        answers: { A: 0, B: 0, C: 0, D: 0, E: 0 }
      };
    }
    analysis.bySection[section.name].byTest[q.test_number].count++;
    if (q.question_type) {
      analysis.bySection[section.name].byTest[q.test_number].types[q.question_type] =
        (analysis.bySection[section.name].byTest[q.test_number].types[q.question_type] || 0) + 1;
    }
    if (q.question_category) {
      analysis.bySection[section.name].byTest[q.test_number].categories[q.question_category] =
        (analysis.bySection[section.name].byTest[q.test_number].categories[q.question_category] || 0) + 1;
    }
    if (answer) {
      analysis.bySection[section.name].byTest[q.test_number].answers[answer]++;
    }

    // Text patterns
    if (q.question_stem) {
      analysis.bySection[section.name].patterns.totalChars += q.question_stem.length;
      analysis.bySection[section.name].patterns.totalWords += q.question_stem.split(/\s+/).length;
    }

    // English-specific patterns
    if (section.name === 'ENGLISH') {
      // NO CHANGE pattern
      if (q.choice_a?.includes('NO CHANGE')) {
        if (!analysis.bySection[section.name].patterns.noChange) {
          analysis.bySection[section.name].patterns.noChange = { total: 0, correct: 0 };
        }
        analysis.bySection[section.name].patterns.noChange.total++;
        if (answer === 'A') {
          analysis.bySection[section.name].patterns.noChange.correct++;
        }
      }

      // DELETE pattern
      if (q.choice_d?.includes('DELETE')) {
        if (!analysis.bySection[section.name].patterns.delete) {
          analysis.bySection[section.name].patterns.delete = { total: 0, correct: 0 };
        }
        analysis.bySection[section.name].patterns.delete.total++;
        if (answer === 'D') {
          analysis.bySection[section.name].patterns.delete.correct++;
        }
      }

      // Underlined text
      if (q.underlined_text) {
        if (!analysis.bySection[section.name].patterns.underlinedText) {
          analysis.bySection[section.name].patterns.underlinedText = { count: 0, avgLength: 0, totalLength: 0 };
        }
        analysis.bySection[section.name].patterns.underlinedText.count++;
        analysis.bySection[section.name].patterns.underlinedText.totalLength += q.underlined_text.length;
      }
    }
  }

  // Calculate averages
  const sectionData = analysis.bySection[section.name];
  sectionData.patterns.avgQuestionLength = Math.round(
    sectionData.patterns.totalChars / questions.length
  );
  sectionData.patterns.avgWordsPerQuestion = Math.round(
    sectionData.patterns.totalWords / questions.length
  );

  if (section.name === 'ENGLISH' && sectionData.patterns.underlinedText) {
    sectionData.patterns.underlinedText.avgLength = Math.round(
      sectionData.patterns.underlinedText.totalLength / sectionData.patterns.underlinedText.count
    );
  }
}

// Get lesson names
const { data: lessons } = await supabase
  .from('lessons')
  .select('id, lesson_key, title, subject');

const lessonMap = {};
if (lessons) {
  lessons.forEach(l => {
    lessonMap[l.id] = {
      key: l.lesson_key,
      title: l.title,
      subject: l.subject
    };
  });
}

// Add lesson names to distribution
for (const section in analysis.bySection) {
  const lessonDist = analysis.bySection[section].lessonDistribution;
  analysis.bySection[section].lessonDistributionNamed = {};

  for (const lessonId in lessonDist) {
    const lesson = lessonMap[lessonId];
    if (lesson) {
      analysis.bySection[section].lessonDistributionNamed[lesson.key] = {
        count: lessonDist[lessonId],
        title: lesson.title
      };
    }
  }
}

// Generate comprehensive statistics
console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('📈 COMPREHENSIVE STATISTICS\n');

console.log(`Total Questions Analyzed: ${analysis.totalQuestions}`);
console.log(`Unique Question Types: ${Object.keys(analysis.allQuestionTypes).length}`);
console.log(`Unique Question Categories: ${Object.keys(analysis.allQuestionCategories).length}`);

console.log('\n\n📊 ALL QUESTION TYPES (Sorted by Frequency):');
console.log('─'.repeat(80));
const sortedTypes = Object.entries(analysis.allQuestionTypes).sort((a, b) => b[1] - a[1]);
sortedTypes.forEach(([type, count], idx) => {
  const percentage = ((count / analysis.totalQuestions) * 100).toFixed(2);
  console.log(`${idx + 1}. ${type}: ${count} questions (${percentage}%)`);
});

console.log('\n\n🏷️  ALL QUESTION CATEGORIES (Sorted by Frequency):');
console.log('─'.repeat(80));
const sortedCategories = Object.entries(analysis.allQuestionCategories).sort((a, b) => b[1] - a[1]);
sortedCategories.forEach(([category, count], idx) => {
  const percentage = ((count / analysis.totalQuestions) * 100).toFixed(2);
  console.log(`${idx + 1}. ${category}: ${count} questions (${percentage}%)`);
});

// Section-specific detailed output
for (const section in analysis.bySection) {
  const data = analysis.bySection[section];

  console.log(`\n\n═══════════════════════════════════════════════════════════════`);
  console.log(`${section} SECTION DETAILED ANALYSIS`);
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log(`Total Questions: ${data.totalQuestions}`);
  console.log(`Avg Question Length: ${data.patterns.avgQuestionLength} characters`);
  console.log(`Avg Words Per Question: ${data.patterns.avgWordsPerQuestion}`);

  console.log('\n📊 Answer Distribution:');
  const answers = ['A', 'B', 'C', 'D', 'E'];
  answers.forEach(ans => {
    if (data.answerDistribution[ans] > 0) {
      const pct = ((data.answerDistribution[ans] / data.totalQuestions) * 100).toFixed(2);
      console.log(`   ${ans}: ${data.answerDistribution[ans]} (${pct}%)`);
    }
  });

  console.log('\n📋 Question Types (All):');
  const sectionTypes = Object.entries(data.questionTypes).sort((a, b) => b[1] - a[1]);
  sectionTypes.forEach(([type, count], idx) => {
    const pct = ((count / data.totalQuestions) * 100).toFixed(2);
    console.log(`   ${idx + 1}. ${type}: ${count} (${pct}%)`);
  });

  console.log('\n🏷️  Question Categories (All):');
  const sectionCategories = Object.entries(data.questionCategories).sort((a, b) => b[1] - a[1]);
  sectionCategories.forEach(([category, count], idx) => {
    const pct = ((count / data.totalQuestions) * 100).toFixed(2);
    console.log(`   ${idx + 1}. ${category}: ${count} (${pct}%)`);
  });

  if (section === 'ENGLISH') {
    console.log('\n🔤 English-Specific Patterns:');
    if (data.patterns.noChange) {
      const ncPct = ((data.patterns.noChange.total / data.totalQuestions) * 100).toFixed(2);
      const ncCorrectPct = ((data.patterns.noChange.correct / data.patterns.noChange.total) * 100).toFixed(2);
      console.log(`   NO CHANGE: ${data.patterns.noChange.total} questions (${ncPct}%)`);
      console.log(`   NO CHANGE correct: ${data.patterns.noChange.correct} (${ncCorrectPct}% of NO CHANGE questions)`);
    }
    if (data.patterns.delete) {
      const delPct = ((data.patterns.delete.total / data.totalQuestions) * 100).toFixed(2);
      const delCorrectPct = ((data.patterns.delete.correct / data.patterns.delete.total) * 100).toFixed(2);
      console.log(`   DELETE: ${data.patterns.delete.total} questions (${delPct}%)`);
      console.log(`   DELETE correct: ${data.patterns.delete.correct} (${delCorrectPct}% of DELETE questions)`);
    }
    if (data.patterns.underlinedText) {
      const underlinePct = ((data.patterns.underlinedText.count / data.totalQuestions) * 100).toFixed(2);
      console.log(`   Underlined text: ${data.patterns.underlinedText.count} questions (${underlinePct}%)`);
      console.log(`   Avg underlined length: ${data.patterns.underlinedText.avgLength} characters`);
    }
  }

  console.log('\n📚 Lesson Distribution:');
  const lessonDist = Object.entries(data.lessonDistributionNamed || {}).sort((a, b) => b[1].count - a[1].count);
  lessonDist.forEach(([key, info], idx) => {
    const pct = ((info.count / data.totalQuestions) * 100).toFixed(2);
    console.log(`   ${idx + 1}. ${key} - ${info.title}: ${info.count} (${pct}%)`);
  });
}

// Save comprehensive JSON
const output = {
  generated_at: new Date().toISOString(),
  summary: {
    total_questions: analysis.totalQuestions,
    unique_question_types: Object.keys(analysis.allQuestionTypes).length,
    unique_question_categories: Object.keys(analysis.allQuestionCategories).length,
    sections_analyzed: Object.keys(analysis.bySection).length
  },
  all_question_types: sortedTypes.map(([type, count]) => ({
    type,
    count,
    percentage: ((count / analysis.totalQuestions) * 100).toFixed(2)
  })),
  all_question_categories: sortedCategories.map(([category, count]) => ({
    category,
    count,
    percentage: ((count / analysis.totalQuestions) * 100).toFixed(2)
  })),
  by_section: analysis.bySection
};

fs.writeFileSync(
  '/Users/cadenchiang/Desktop/act-prep-react/reports/comprehensive-pattern-analysis.json',
  JSON.stringify(output, null, 2)
);

console.log('\n\n✅ COMPREHENSIVE ANALYSIS COMPLETE');
console.log('─'.repeat(80));
console.log('Report saved to: /Users/cadenchiang/Desktop/act-prep-react/reports/comprehensive-pattern-analysis.json');
