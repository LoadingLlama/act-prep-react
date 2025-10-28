import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 ADDING UNDERLINED PORTIONS TO PASSAGES BASED ON QUESTION TEXT\n');
console.log('='.repeat(80));

// Get all passages and questions for Test 1
const { data: passages } = await sb
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

const { data: questions } = await sb
  .from('practice_test_english_questions')
  .select('*')
  .eq('test_number', 1)
  .order('question_number');

console.log(`\nFound ${passages.length} passages and ${questions.length} questions\n`);

// Process each passage
for (const passage of passages) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`PASSAGE ${passage.passage_number}: ${passage.passage_title}`);
  console.log('='.repeat(80));

  // Get questions for this passage (15 questions per passage)
  const startQ = (passage.passage_number - 1) * 15 + 1;
  const endQ = passage.passage_number * 15;
  const passageQuestions = questions.filter(q => q.question_number >= startQ && q.question_number <= endQ);

  console.log(`\nProcessing questions ${startQ}-${endQ} (${passageQuestions.length} questions)`);

  let updatedPassageText = passage.passage_text;
  const underlinedPortions = [];

  // Process each question
  for (const q of passageQuestions) {
    if (!q.question_text) {
      console.log(`  Q${q.question_number}: No question_text - skipping`);
      continue;
    }

    // The question_text contains the problematic portion
    // We need to find this in the passage and underline it
    const questionText = q.question_text.trim();

    // Try to find this text in the passage
    const index = updatedPassageText.indexOf(questionText);

    if (index !== -1) {
      // Found it! Mark this for underlining
      underlinedPortions.push({
        questionNumber: q.question_number,
        text: questionText,
        index: index,
        subscript: q.question_number - startQ + 1  // 1-15 for each passage
      });
      console.log(`  Q${q.question_number}: Found "${questionText.substring(0, 50)}${questionText.length > 50 ? '...' : ''}"`);
    } else {
      console.log(`  Q${q.question_number}: ⚠️  Could not find "${questionText.substring(0, 50)}..." in passage`);
    }
  }

  console.log(`\n  Total underlined portions found: ${underlinedPortions.length}/${passageQuestions.length}`);

  // Sort by index in reverse order (so we can insert from end to beginning without messing up indices)
  underlinedPortions.sort((a, b) => b.index - a.index);

  // Add underlines and subscripts
  for (const portion of underlinedPortions) {
    const before = updatedPassageText.substring(0, portion.index);
    const underlinedText = updatedPassageText.substring(portion.index, portion.index + portion.text.length);
    const after = updatedPassageText.substring(portion.index + portion.text.length);

    // Add underline with subscript number AFTER the underlined text
    // Using HTML: <u>text</u><sub>1</sub>
    updatedPassageText = before + `<u>${underlinedText}</u><sub>${portion.subscript}</sub>` + after;
  }

  // Show a preview
  console.log('\n  PREVIEW OF UPDATED PASSAGE (first 500 chars):');
  console.log('  ' + updatedPassageText.substring(0, 500).replace(/\n/g, '\n  '));

  // Update the database
  console.log('\n  💾 Updating database...');
  const { error } = await sb
    .from('practice_test_english_passages')
    .update({ passage_text: updatedPassageText })
    .eq('id', passage.id);

  if (error) {
    console.log(`  ❌ Error updating passage ${passage.passage_number}:`, error.message);
  } else {
    console.log(`  ✅ Successfully updated passage ${passage.passage_number}`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('✅ COMPLETE! All passages updated with underlined portions.');
console.log('='.repeat(80));
