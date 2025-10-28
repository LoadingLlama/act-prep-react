import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 ADDING UNDERLINED PORTIONS USING FUZZY MATCHING\n');
console.log('='.repeat(80));

// Helper function to find similar text in passage
function findSimilarText(passage, questionText, threshold = 0.7) {
  // Extract key words from question text (5+ words in a row)
  const words = questionText.trim().split(/\s+/);

  // Try to find a sequence of 4-6 words that appears in both
  for (let len = 6; len >= 4; len--) {
    for (let i = 0; i <= words.length - len; i++) {
      const phrase = words.slice(i, i + len).join(' ');
      // Make case-insensitive and ignore punctuation
      const normalizedPhrase = phrase.replace(/[^\w\s]/g, '').toLowerCase();
      const normalizedPassage = passage.replace(/[^\w\s]/g, '').toLowerCase();

      if (normalizedPassage.includes(normalizedPhrase)) {
        // Found a match! Now find the exact location in the original passage
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

// Process just Passage 1 first as a test
const passage = passages[0];
console.log(`\n${'='.repeat(80)}`);
console.log(`PASSAGE 1: ${passage.passage_title}`);
console.log('='.repeat(80));

const startQ = 1;
const endQ = 15;
const passageQuestions = questions.filter(q => q.question_number >= startQ && q.question_number <= endQ);

console.log(`\nProcessing questions ${startQ}-${endQ} (${passageQuestions.length} questions)\n`);

let updatedPassageText = passage.passage_text;
const underlinedPortions = [];

for (const q of passageQuestions) {
  if (!q.question_text) {
    console.log(`Q${q.question_number}: No question_text - skipping`);
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
    console.log(`Q${q.question_number}: ✓ Found "${match.matchedPhrase}" at index ${match.index}`);
  } else {
    console.log(`Q${q.question_number}: ✗ No match for "${q.question_text.substring(0, 50)}..."`);
  }
}

console.log(`\n✅ Found ${underlinedPortions.length}/${passageQuestions.length} matches`);

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

console.log('\n📝 PREVIEW OF UPDATED PASSAGE (first 800 chars):');
console.log(updatedPassageText.substring(0, 800));

console.log('\n' + '='.repeat(80));
console.log('Would you like to:');
console.log('A) Apply this update to Passage 1');
console.log('B) Process all 5 passages');
console.log('C) Adjust the matching algorithm');
