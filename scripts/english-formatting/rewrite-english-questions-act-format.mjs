import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 REWRITING ALL 75 ENGLISH QUESTIONS TO PROPER ACT FORMAT\n');
console.log('='.repeat(80));
console.log('\nGenerating proper ACT-style question stems...\n');

// Proper ACT-style English questions (75 questions)
// These reference the underlined portions already in the passages
const actStyleQuestions = [
  // Passage 1: Urban Farming (Questions 1-15)
  { num: 1, text: "" }, // Just check the underlined portion
  { num: 2, text: "" },
  { num: 3, text: "" },
  { num: 4, text: "" },
  { num: 5, text: "" },
  { num: 6, text: "Given that all the choices are accurate, which one provides the most specific information about the organization's growth?" },
  { num: 7, text: "Which choice most effectively emphasizes the large amount of vegetables produced?" },
  { num: 8, text: "" },
  { num: 9, text: "Which choice provides the most effective transition from the previous paragraph?" },
  { num: 10, text: "" },
  { num: 11, text: "" },
  { num: 12, text: "Given that all the choices are accurate, which one best emphasizes the positive environmental impact described in the sentence?" },
  { num: 13, text: "At this point, the writer is considering adding the following sentence: 'Many residents have never had access to fresh vegetables before.' Should the writer make this addition here?" },
  { num: 14, text: "Which choice provides the most specific example of health improvements?" },
  { num: 15, text: "Suppose the writer's goal was to write an essay that explains the economic impact of urban farming on local communities. Would this essay successfully accomplish that goal?" },

  // Passage 2: Katherine Johnson (Questions 16-27)
  { num: 16, text: "" },
  { num: 17, text: "" },
  { num: 18, text: "Given that all the choices are accurate, which one provides the most vivid description of Johnson's early mathematical abilities?" },
  { num: 19, text: "" },
  { num: 20, text: "" },
  { num: 21, text: "Which choice most effectively introduces the specific work Johnson did at NASA?" },
  { num: 22, text: "" },
  { num: 23, text: "" },
  { num: 24, text: "" },
  { num: 25, text: "Which choice provides the most effective transition to the information that follows?" },
  { num: 26, text: "" },
  { num: 27, text: "" },

  // Passage 3: Small-Town Main Streets (Questions 28-42)
  { num: 28, text: "" },
  { num: 29, text: "" },
  { num: 30, text: "" },
  { num: 31, text: "At this point, the writer is considering adding the following sentence: 'The downtown area had been struggling for over two decades.' Should the writer make this addition here?" },
  { num: 32, text: "" },
  { num: 33, text: "Given that all the choices are accurate, which one provides the most specific information about the downtown's transformation?" },
  { num: 34, text: "" },
  { num: 35, text: "" },
  { num: 36, text: "Which choice provides the most effective conclusion to the paragraph?" },
  { num: 37, text: "" },
  { num: 38, text: "" },
  { num: 39, text: "Which choice most effectively emphasizes the variety of events hosted?" },
  { num: 40, text: "" },
  { num: 41, text: "" },
  { num: 42, text: "" },

  // Passage 4: Botanical Illustration (Questions 43-57)
  { num: 43, text: "" },
  { num: 44, text: "" },
  { num: 45, text: "Given that all the choices are accurate, which one best introduces the historical importance of botanical illustration?" },
  { num: 46, text: "" },
  { num: 47, text: "" },
  { num: 48, text: "Which choice provides the most specific example of the scientific value of botanical illustrations?" },
  { num: 49, text: "" },
  { num: 50, text: "" },
  { num: 51, text: "At this point, the writer is considering adding the following sentence: 'Modern photography has largely replaced hand-drawn illustrations in many scientific fields.' Should the writer make this addition here?" },
  { num: 52, text: "" },
  { num: 53, text: "" },
  { num: 54, text: "Which choice most effectively concludes the paragraph by emphasizing the artistic skill required?" },
  { num: 55, text: "" },
  { num: 56, text: "" },
  { num: 57, text: "Suppose the writer's goal was to write an essay that explains how to become a botanical illustrator. Would this essay successfully accomplish that goal?" },

  // Passage 5: Rising Seas (Questions 58-75)
  { num: 58, text: "" },
  { num: 59, text: "" },
  { num: 60, text: "Given that all the choices are accurate, which one provides the most specific information about rising sea levels?" },
  { num: 61, text: "" },
  { num: 62, text: "" },
  { num: 63, text: "Which choice provides the most effective transition from the previous sentence?" },
  { num: 64, text: "" },
  { num: 65, text: "" },
  { num: 66, text: "At this point, the writer is considering adding the following sentence: 'Many coastal cities are already experiencing flooding during high tides.' Should the writer make this addition here?" },
  { num: 67, text: "" },
  { num: 68, text: "" },
  { num: 69, text: "Which choice most effectively emphasizes the urgency of the situation?" },
  { num: 70, text: "" },
  { num: 71, text: "" },
  { num: 72, text: "Given that all the choices are accurate, which one provides the most specific example of adaptation strategies?" },
  { num: 73, text: "" },
  { num: 74, text: "" },
  { num: 75, text: "Which choice provides the most effective conclusion to the essay?" }
];

console.log(`✅ Generated ${actStyleQuestions.length} ACT-style question stems\n`);
console.log('='.repeat(80));
console.log('\n📊 SAMPLE QUESTIONS:\n');

// Show examples
console.log('Empty question text (tests grammar/punctuation directly):');
console.log('Q1:', actStyleQuestions[0].text || '(empty - just check underlined portion)');
console.log('');
console.log('Rhetorical skills questions:');
console.log('Q6:', actStyleQuestions[5].text);
console.log('Q9:', actStyleQuestions[8].text);
console.log('');

console.log('='.repeat(80));
console.log('\n💾 UPDATING DATABASE...\n');

// Update each question in the database
let successCount = 0;
let errorCount = 0;

for (const q of actStyleQuestions) {
  const { error } = await sb
    .from('practice_test_english_questions')
    .update({
      question_text: q.text
    })
    .eq('test_number', 1)
    .eq('question_number', q.num);

  if (error) {
    console.log(`  ❌ Error updating Q${q.num}: ${error.message}`);
    errorCount++;
  } else {
    successCount++;
    if (q.num % 15 === 0) {
      console.log(`  ✓ Updated questions 1-${q.num}...`);
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n✅ UPDATE COMPLETE!`);
console.log(`   Successfully updated: ${successCount} questions`);
console.log(`   Errors: ${errorCount} questions`);
console.log('\n' + '='.repeat(80));

// Calculate statistics
const emptyQuestions = actStyleQuestions.filter(q => q.text === '').length;
const rhetoricalQuestions = actStyleQuestions.filter(q => q.text !== '').length;

console.log(`\n📊 QUESTION BREAKDOWN:`);
console.log(`   Grammar/Punctuation questions (empty text): ${emptyQuestions}`);
console.log(`   Rhetorical skills questions: ${rhetoricalQuestions}`);
console.log(`   Total: ${actStyleQuestions.length}`);
console.log('\n' + '='.repeat(80));
