import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 ADDING UNDERLINED PORTIONS TO ALL 5 PASSAGES\n');
console.log('='.repeat(80));

// Helper function to find similar text in passage
function findSimilarText(passage, questionText) {
  const words = questionText.trim().split(/\s+/);

  // Try to find a sequence of 4-6 words that appears in both
  for (let len = 6; len >= 4; len--) {
    for (let i = 0; i <= words.length - len; i++) {
      const phrase = words.slice(i, i + len).join(' ');
      const normalizedPhrase = phrase.replace(/[^\w\s]/g, '').toLowerCase();
      const normalizedPassage = passage.replace(/[^\w\s]/g, '').toLowerCase();

      if (normalizedPassage.includes(normalizedPhrase)) {
        const regex = new RegExp(phrase.split(' ').map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+'), 'i');
        const match = passage.match(regex);
        if (match) {
          return {
            index: match.index,
            matchedPhrase: match[0]
          };
        }
      }
    }
  }

  return null;
}

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

let totalMatches = 0;
let totalQuestions = 0;

// Process all 5 passages
for (const passage of passages) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`PASSAGE ${passage.passage_number}: ${passage.passage_title}`);
  console.log('='.repeat(80));

  const startQ = (passage.passage_number - 1) * 15 + 1;
  const endQ = passage.passage_number * 15;
  const passageQuestions = questions.filter(q => q.question_number >= startQ && q.question_number <= endQ);

  console.log(`\nProcessing questions ${startQ}-${endQ} (${passageQuestions.length} questions)\n`);

  let updatedPassageText = passage.passage_text;
  const underlinedPortions = [];

  for (const q of passageQuestions) {
    totalQuestions++;
    if (!q.question_text) {
      console.log(`  Q${q.question_number}: No question_text - skipping`);
      continue;
    }

    const match = findSimilarText(passage.passage_text, q.question_text);

    if (match) {
      underlinedPortions.push({
        questionNumber: q.question_number,
        matchedPhrase: match.matchedPhrase,
        index: match.index,
        subscript: q.question_number - startQ + 1
      });
      totalMatches++;
      console.log(`  Q${q.question_number}: ✓ Found "${match.matchedPhrase.substring(0, 40)}..."`);
    } else {
      console.log(`  Q${q.question_number}: ✗ No match`);
    }
  }

  console.log(`\n  ✅ Matched ${underlinedPortions.length}/${passageQuestions.length} questions`);

  // Sort by index in reverse order
  underlinedPortions.sort((a, b) => b.index - a.index);

  // Add underlines and subscripts
  for (const portion of underlinedPortions) {
    const before = updatedPassageText.substring(0, portion.index);
    const underlinedText = portion.matchedPhrase;
    const after = updatedPassageText.substring(portion.index + underlinedText.length);

    // Add underline with subscript AFTER
    updatedPassageText = before + `<u>${underlinedText}</u><sub>${portion.subscript}</sub>` + after;
  }

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
console.log(`\n✅ COMPLETE! Updated ${totalMatches}/${totalQuestions} questions across all 5 passages`);
console.log('='.repeat(80));
