import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 REWRITING ENGLISH QUESTIONS TO ACTUAL ACT FORMAT\n');
console.log('='.repeat(80));

// Get all passages
const { data: passages } = await sb
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

// Get all questions
const { data: questions } = await sb
  .from('practice_test_english_questions')
  .select('*')
  .eq('test_number', 1)
  .order('question_number');

console.log(`\nFound ${passages.length} passages and ${questions.length} questions\n`);

let updateCount = 0;

// For each passage, extract sentences with underlined portions
for (const passage of passages) {
  console.log(`\nProcessing Passage ${passage.passage_number}...`);

  const passageText = passage.passage_text;

  // Find all underlined portions in order
  const underlineMatches = [...passageText.matchAll(/<u>([^<]+)<\/u>/g)];

  // Get questions for this passage
  const passageQuestions = questions.filter(q => q.passage_id === passage.id);

  console.log(`  Found ${underlineMatches.length} underlined portions for ${passageQuestions.length} questions`);

  // For each question, extract the sentence containing the underlined portion
  passageQuestions.forEach((question, index) => {
    if (index >= underlineMatches.length) {
      console.log(`  ⚠️  Question ${question.question_number} has no matching underline`);
      return;
    }

    const underlinedText = underlineMatches[index][1];
    const underlinePattern = `<u>${underlinedText}</u>`;

    // Find the sentence containing this underlined portion
    // Split by sentence boundaries but keep context
    const sentences = passageText.split(/(?<=[.!?])\s+/);

    let questionStem = '';
    for (const sentence of sentences) {
      if (sentence.includes(underlinePattern)) {
        // Extract just the sentence with the underline
        questionStem = sentence.replace(/<p>|<\/p>/g, '').trim();
        break;
      }
    }

    // If we couldn't find it in sentences, try finding context around the underline
    if (!questionStem) {
      const index = passageText.indexOf(underlinePattern);
      if (index !== -1) {
        // Get 150 chars before and after
        const start = Math.max(0, index - 150);
        const end = Math.min(passageText.length, index + underlinePattern.length + 150);
        questionStem = passageText.substring(start, end).replace(/<p>|<\/p>/g, '').trim();

        // Clean up to start at word boundary
        if (start > 0) {
          questionStem = '...' + questionStem.substring(questionStem.indexOf(' ') + 1);
        }
        // Clean up to end at word boundary
        if (end < passageText.length) {
          questionStem = questionStem.substring(0, questionStem.lastIndexOf(' ')) + '...';
        }
      }
    }

    if (questionStem) {
      console.log(`  Q${question.question_number}: ${questionStem.substring(0, 60)}...`);
    } else {
      console.log(`  ⚠️  Q${question.question_number}: Could not extract sentence`);
    }
  });
}

console.log('\n' + '='.repeat(80));
console.log('\n⏸️  Script created - ready to run full update');
console.log('   This will rewrite all question_text fields to match ACT format');
console.log('='.repeat(80));
