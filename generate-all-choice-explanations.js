const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Lessons that need per-choice explanations for practice questions
const lessonsNeedingChoiceExp = [
  'redundancy',
  'word-choice',
  'transitions',
  'which-choice',
  'adding-deleting',
  'logical-placement'
];

async function generateAllChoiceExplanations() {
  console.log('Generating per-choice explanations for practice questions...\n');
  console.log('='.repeat(80));

  let totalFixed = 0;
  let totalErrors = 0;

  for (const lessonKey of lessonsNeedingChoiceExp) {
    console.log(`\nProcessing: ${lessonKey}`);
    console.log('-'.repeat(80));

    // Get lesson ID
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    if (!lesson) {
      console.log(`  ⚠️  Lesson not found: ${lessonKey}`);
      continue;
    }

    // Get all practice questions (positions > 4) with empty choice explanations
    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .gt('position', 4)
      .order('position');

    // Filter questions that need choice explanations
    const questionsNeedingFix = questions.filter(q => {
      if (!q.choices || q.choices.length === 0) return false;
      // Check if any choice has empty explanation
      return q.choices.some(c => !c.explanation || c.explanation.trim() === '');
    });

    console.log(`  Found ${questionsNeedingFix.length} questions needing choice explanations`);

    for (const question of questionsNeedingFix) {
      try {
        // Generate per-choice explanations based on lesson type
        const updatedChoices = generateChoiceExplanations(question, lessonKey);

        // Update database
        const { error } = await supabase
          .from('lesson_examples')
          .update({ choices: updatedChoices })
          .eq('id', question.id);

        if (error) {
          console.log(`    ✗ ${question.title}: ${error.message}`);
          totalErrors++;
        } else {
          console.log(`    ✓ ${question.title}`);
          totalFixed++;
        }
      } catch (err) {
        console.log(`    ✗ ${question.title}: ${err.message}`);
        totalErrors++;
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`✓ Successfully fixed: ${totalFixed} questions`);
  console.log(`✗ Errors: ${totalErrors} questions`);
  console.log('='.repeat(80));
}

function generateChoiceExplanations(question, lessonKey) {
  const correctAnswer = question.correct_answer;
  const choices = question.choices || [];
  const mainExp = question.answer_explanation || '';
  const problemText = question.problem_text || '';

  return choices.map(choice => {
    const isCorrect = choice.letter === correctAnswer;

    // If explanation already exists and isn't empty, keep it
    if (choice.explanation && choice.explanation.trim() !== '') {
      return choice;
    }

    // Generate explanation based on lesson type
    let explanation = '';

    if (isCorrect) {
      explanation = generateCorrectChoiceExplanation(choice, lessonKey, mainExp, problemText);
    } else {
      explanation = generateIncorrectChoiceExplanation(choice, lessonKey, mainExp, problemText, correctAnswer);
    }

    return {
      ...choice,
      explanation
    };
  });
}

function generateCorrectChoiceExplanation(choice, lessonKey, mainExp, problemText) {
  const choiceText = choice.text || '';

  switch (lessonKey) {
    case 'redundancy':
      if (choiceText === 'NO CHANGE' || choiceText.includes('DELETE')) {
        return 'Correct. This is the most concise option that eliminates redundancy without losing meaning.';
      }
      if (choiceText.length < 30) {
        return 'Correct. This provides the clearest expression without unnecessary repetition or wordiness.';
      }
      return 'Correct. This choice avoids redundant phrasing while maintaining clarity.';

    case 'word-choice':
      return `Correct. This word choice accurately fits the context and meaning required by the sentence.`;

    case 'transitions':
      if (choiceText === 'DELETE') {
        return 'Correct. No transition is needed here - the relationship between ideas is already clear.';
      }
      return `Correct. This transition properly signals the logical relationship between the ideas being connected.`;

    case 'which-choice':
      return 'Correct. This choice directly fulfills what the question asks for without overreaching or adding requirements not in the question.';

    case 'adding-deleting':
      if (choiceText.toLowerCase().startsWith('yes')) {
        return 'Correct. Adding this information supports and enhances the paragraph\'s main focus.';
      } else {
        return 'Correct. The proposed addition would introduce irrelevant information that doesn\'t fit the paragraph\'s focus.';
      }

    case 'logical-placement':
      if (choiceText.toLowerCase().includes('where it is now')) {
        return 'Correct. The sentence is already positioned where it best fits the logical flow of ideas.';
      }
      return 'Correct. This placement ensures the sentence logically flows with the surrounding content and maintains coherent idea progression.';

    default:
      return 'Correct. This is the best answer based on standard conventions for this question type.';
  }
}

function generateIncorrectChoiceExplanation(choice, lessonKey, mainExp, problemText, correctLetter) {
  const choiceText = choice.text || '';

  switch (lessonKey) {
    case 'redundancy':
      if (choiceText === 'NO CHANGE') {
        return 'The original text contains redundant phrasing that should be eliminated for conciseness.';
      }
      return 'This choice is wordy or repeats information that\'s already clear from context.';

    case 'word-choice':
      return 'This word doesn\'t accurately fit the context or intended meaning of the sentence.';

    case 'transitions':
      if (choiceText === 'DELETE') {
        return 'A transition is needed here to properly connect the relationship between these ideas.';
      }
      return 'This transition signals the wrong type of relationship between the ideas being connected.';

    case 'which-choice':
      return 'This choice either doesn\'t fulfill what the question specifically asks for, or adds requirements not stated in the question.';

    case 'adding-deleting':
      if (choiceText.toLowerCase().startsWith('yes')) {
        if (choiceText.toLowerCase().includes('proves') || choiceText.toLowerCase().includes('demonstrates')) {
          return 'This overstates what the sentence does. Providing one detail doesn\'t "prove" a broad claim. Focus on whether it fits the paragraph\'s topic.';
        }
        return 'While this reasoning sounds plausible, the proposed addition doesn\'t actually fit the paragraph\'s main focus.';
      } else {
        if (choiceText.toLowerCase().includes('does not mention') || choiceText.toLowerCase().includes('does not specify')) {
          return 'This reasoning is flawed - we don\'t reject sentences just because they lack every possible detail. The key is relevance to the paragraph\'s focus.';
        }
        return 'This reasoning doesn\'t correctly identify why the information should be kept. The sentence actually supports the paragraph\'s purpose.';
      }

    case 'logical-placement':
      return 'This placement would create illogical flow by either separating related ideas, introducing information before context is established, or breaking up coherent progressions.';

    default:
      return 'This choice doesn\'t best address the question requirements.';
  }
}

generateAllChoiceExplanations();
