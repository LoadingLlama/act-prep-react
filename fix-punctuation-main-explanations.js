const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixPunctuationMainExplanations() {
  console.log('Fixing punctuation lesson main explanations...\n');
  console.log('='.repeat(80));

  // Get punctuation lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'punctuation')
    .single();

  if (!lesson) {
    console.log('❌ Punctuation lesson not found');
    return;
  }

  // Get all questions with empty or null main explanations
  const { data: questions } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('position');

  // Filter questions needing main explanations
  const questionsNeedingFix = questions.filter(q =>
    !q.answer_explanation || q.answer_explanation.trim() === ''
  );

  console.log(`Found ${questionsNeedingFix.length} questions needing main explanations\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const question of questionsNeedingFix) {
    try {
      const mainExplanation = generatePunctuationExplanation(question);

      const { error } = await supabase
        .from('lesson_examples')
        .update({ answer_explanation: mainExplanation })
        .eq('id', question.id);

      if (error) {
        console.log(`  ✗ ${question.title}: ${error.message}`);
        errorCount++;
      } else {
        console.log(`  ✓ ${question.title}`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ✗ ${question.title}: ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`✓ Successfully fixed: ${successCount} questions`);
  console.log(`✗ Errors: ${errorCount} questions`);
  console.log('='.repeat(80));
}

function generatePunctuationExplanation(question) {
  const title = question.title || '';
  const correctAnswer = question.correct_answer;
  const choices = question.choices || [];
  const correctChoice = choices.find(c => c.letter === correctAnswer);

  // Detect punctuation type from title
  let explanation = '';

  if (title.includes('Semicolon')) {
    explanation = `**Semicolons** join two independent clauses without a conjunction. Both sides must be complete sentences that could stand alone. The correct answer properly uses or omits the semicolon based on sentence structure.\n\n`;
  } else if (title.includes('Colon')) {
    explanation = `**Colons** introduce lists, explanations, or elaborations after a complete independent clause. The part before the colon must be able to stand alone as a complete sentence.\n\n`;
  } else if (title.includes('Dash') || title.includes('Dashes')) {
    explanation = `**Dashes** set off additional information with emphasis or indicate an abrupt break in thought. Use a pair of dashes (like parentheses) for interruptions, or a single dash for emphasis.\n\n`;
  } else if (title.includes('Possessive') || title.includes('Its') || title.includes('Your') || title.includes('Whose')) {
    explanation = `**Possessive vs. Contraction**: Watch for apostrophes. "It's" = "it is", while "its" shows possession. "You're" = "you are", while "your" shows possession. "Who's" = "who is", while "whose" shows possession.\n\n`;
  } else if (title.includes('Quotation')) {
    explanation = `**Quotation marks** enclose direct speech, titles of short works, or words used ironically. Commas and periods go inside quotation marks; colons and semicolons go outside.\n\n`;
  } else if (title.includes('Parentheses')) {
    explanation = `**Parentheses** enclose additional, non-essential information. Punctuation goes outside the parentheses unless it's part of the parenthetical content.\n\n`;
  } else if (title.includes('Hyphen')) {
    explanation = `**Hyphens** join compound modifiers before nouns (e.g., "well-known author") and connect numbers. Don't hyphenate after -ly adverbs.\n\n`;
  } else if (title.includes('Ellipsis')) {
    explanation = `**Ellipses** (. . .) indicate omitted words in quotations or trailing off. Use three dots with spaces between.\n\n`;
  } else if (title.includes('Exclamation')) {
    explanation = `**Exclamation points** show strong emotion or emphasis. Use sparingly in formal writing.\n\n`;
  } else if (title.includes('Slash')) {
    explanation = `**Slashes** show alternatives (and/or) or separate lines of poetry. Use sparingly in formal prose.\n\n`;
  } else {
    explanation = `**Punctuation** must follow standard conventions to ensure clarity and proper sentence structure.\n\n`;
  }

  // Add choice-by-choice breakdown
  choices.forEach(choice => {
    const isCorrect = choice.letter === correctAnswer;
    if (isCorrect) {
      explanation += `**Choice ${choice.letter} is correct**: ${choice.text}\n`;
      if (choice.explanation) {
        explanation += `${choice.explanation}\n\n`;
      } else {
        explanation += `This uses proper punctuation conventions.\n\n`;
      }
    }
  });

  choices.forEach(choice => {
    const isCorrect = choice.letter === correctAnswer;
    if (!isCorrect) {
      explanation += `• Choice ${choice.letter} is wrong: ${choice.text}\n`;
      if (choice.explanation) {
        explanation += `  ${choice.explanation}\n\n`;
      } else {
        explanation += `  This doesn't follow standard punctuation rules.\n\n`;
      }
    }
  });

  return explanation.trim();
}

fixPunctuationMainExplanations();
