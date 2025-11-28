const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const allEnglishLessons = [
  'adding-deleting',
  'commas',
  'logical-placement',
  'misc-topics',
  'modifiers',
  'parallel-structure',
  'pronouns',
  'punctuation',
  'redundancy',
  'transitions',
  'verbs',
  'which-choice',
  'word-choice'
];

async function addAllPerChoiceExplanations() {
  console.log('Adding per-choice explanations to ALL English questions...\n');
  console.log('='.repeat(80));

  let totalFixed = 0;
  let totalErrors = 0;
  let totalSkipped = 0;

  for (const lessonKey of allEnglishLessons) {
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

    // Get ALL questions
    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position');

    // Filter questions that need per-choice explanations
    const questionsNeedingFix = questions.filter(q => {
      if (!q.choices || q.choices.length === 0) return false;
      // Check if ANY choice has empty explanation
      return q.choices.some(c => !c.explanation || c.explanation.trim() === '');
    });

    console.log(`  ${questions.length} total questions, ${questionsNeedingFix.length} need per-choice explanations`);

    for (const question of questionsNeedingFix) {
      try {
        // Generate per-choice explanations based on lesson type and question content
        const updatedChoices = generateSmartChoiceExplanations(question, lessonKey);

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
  console.log(`⊘ Skipped (already had explanations): ${totalSkipped} questions`);
  console.log('='.repeat(80));
}

// Smart generator that creates context-aware explanations
function generateSmartChoiceExplanations(question, lessonKey) {
  const correctAnswer = question.correct_answer;
  const choices = question.choices || [];
  const problemText = question.problem_text || '';
  const title = question.title || '';

  return choices.map(choice => {
    // If explanation already exists and isn't empty, keep it
    if (choice.explanation && choice.explanation.trim() !== '') {
      return choice;
    }

    const isCorrect = choice.letter === correctAnswer;
    const choiceText = choice.text || '';

    let explanation = '';

    if (isCorrect) {
      explanation = generateCorrectExplanation(lessonKey, choiceText, title, problemText);
    } else {
      explanation = generateIncorrectExplanation(lessonKey, choiceText, title, problemText, correctAnswer);
    }

    return {
      ...choice,
      explanation
    };
  });
}

function generateCorrectExplanation(lessonKey, choiceText, title, problemText) {
  const isNoChange = choiceText === 'NO CHANGE';
  const isDelete = choiceText.toLowerCase().includes('delete');

  switch (lessonKey) {
    case 'commas':
      if (isNoChange) {
        return 'Correct. The original punctuation properly follows comma rules for this sentence structure.';
      }
      if (choiceText.includes(',') && choiceText.match(/,/g).length === 2) {
        return 'Correct. This sets off non-essential information with commas on both sides, following proper comma conventions.';
      }
      if (!choiceText.includes(',')) {
        return 'Correct. No commas are needed here because this information is essential to the sentence meaning.';
      }
      return 'Correct. This comma placement follows standard conventions for this sentence structure.';

    case 'punctuation':
      if (choiceText.includes(';')) {
        return 'Correct. The semicolon properly joins two independent clauses. Both sides can stand alone as complete sentences.';
      }
      if (choiceText.includes(':')) {
        return 'Correct. The colon introduces what follows (list, explanation, or elaboration) after a complete clause.';
      }
      if (choiceText.includes('—') || choiceText.includes(' - ')) {
        return 'Correct. The dash(es) properly set off additional information with emphasis.';
      }
      if (choiceText.includes("'")) {
        return 'Correct. This uses the apostrophe properly for possession or contraction.';
      }
      return 'Correct. This punctuation follows proper conventions.';

    case 'verbs':
      return 'Correct. This verb form agrees with the subject and uses the appropriate tense for the passage\'s time frame.';

    case 'pronouns':
      if (choiceText.toLowerCase().includes('who')) {
        return 'Correct. "Who" is used when the pronoun is the subject performing the action.';
      }
      if (choiceText.toLowerCase().includes('whom')) {
        return 'Correct. "Whom" is used when the pronoun is the object receiving the action.';
      }
      return 'Correct. This pronoun properly agrees with its antecedent in number and gender.';

    case 'modifiers':
      return 'Correct. The modifier is placed immediately next to what it describes, creating clear, unambiguous meaning.';

    case 'parallel-structure':
      return 'Correct. This maintains parallel structure - all items in the list have the same grammatical form.';

    case 'redundancy':
      if (isNoChange || isDelete) {
        return 'Correct. This eliminates redundancy by removing unnecessary repetition while maintaining clarity.';
      }
      return 'Correct. This is the most concise option that avoids redundant phrasing.';

    case 'transitions':
      if (isDelete) {
        return 'Correct. No transition is needed here - the relationship between ideas is already clear without one.';
      }
      return 'Correct. This transition properly signals the logical relationship (contrast, cause-effect, addition, or sequence) between the connected ideas.';

    case 'misc-topics':
      if (choiceText.toLowerCase().includes('affect')) {
        return 'Correct. "Affect" is the verb meaning to influence or have an impact on something.';
      }
      if (choiceText.toLowerCase().includes('effect')) {
        return 'Correct. "Effect" is the noun meaning result or outcome.';
      }
      if (choiceText.toLowerCase().includes('than')) {
        return 'Correct. "Than" is used for making comparisons between two things.';
      }
      if (choiceText.toLowerCase().includes('then')) {
        return 'Correct. "Then" indicates time sequence or what happens next.';
      }
      return 'Correct. This word choice follows proper usage conventions.';

    case 'word-choice':
      return 'Correct. This word accurately fits the context and conveys the intended meaning.';

    case 'adding-deleting':
      if (choiceText.toLowerCase().startsWith('yes')) {
        return 'Correct. Adding this information directly supports and enhances the paragraph\'s main focus with relevant detail.';
      } else {
        return 'Correct. The proposed addition would introduce information that doesn\'t fit the paragraph\'s focus or is already implied.';
      }

    case 'logical-placement':
      if (choiceText.toLowerCase().includes('where it is now')) {
        return 'Correct. The sentence is already positioned where it best maintains logical flow and coherent idea progression.';
      }
      return 'Correct. This placement ensures the sentence follows its context and leads naturally into what comes next.';

    case 'which-choice':
      return 'Correct. This choice directly fulfills what the question asks for without overreaching or adding unstated requirements.';

    default:
      return 'Correct. This is the best answer based on standard conventions.';
  }
}

function generateIncorrectExplanation(lessonKey, choiceText, title, problemText, correctLetter) {
  const isNoChange = choiceText === 'NO CHANGE';
  const isDelete = choiceText.toLowerCase().includes('delete');

  switch (lessonKey) {
    case 'commas':
      if (isNoChange) {
        return 'The original punctuation violates comma rules and needs to be corrected.';
      }
      if (choiceText.match(/,/g)?.length === 1) {
        return 'Non-essential information requires commas on BOTH sides, not just one. This creates inconsistent punctuation.';
      }
      return 'This comma placement doesn\'t follow proper conventions for this sentence structure.';

    case 'punctuation':
      if (choiceText.includes(';')) {
        return 'A semicolon doesn\'t work here - check if both sides can stand alone as complete sentences.';
      }
      if (choiceText.includes(':')) {
        return 'A colon doesn\'t work here - the part before the colon must be a complete independent clause.';
      }
      return 'This punctuation doesn\'t follow standard conventions for this context.';

    case 'verbs':
      return 'This verb form either doesn\'t agree with the subject in number or uses the wrong tense for the passage\'s time frame.';

    case 'pronouns':
      if (choiceText.toLowerCase().includes('who') || choiceText.toLowerCase().includes('whom')) {
        return 'This pronoun form is incorrect. Remember: "who" for subjects (doing action), "whom" for objects (receiving action).';
      }
      return 'This pronoun doesn\'t agree with its antecedent or creates ambiguous reference.';

    case 'modifiers':
      return 'This creates a misplaced or dangling modifier - the descriptive phrase isn\'t positioned next to what it describes.';

    case 'parallel-structure':
      return 'This breaks parallel structure by mixing different grammatical forms (e.g., switching from nouns to verbs, or infinitives to gerunds).';

    case 'redundancy':
      if (isNoChange) {
        return 'The original text is wordy and contains redundant phrasing that should be eliminated.';
      }
      return 'This option is still redundant or unnecessarily wordy compared to the correct answer.';

    case 'transitions':
      if (isDelete) {
        return 'A transition is needed here to clarify the relationship between these ideas.';
      }
      return 'This transition signals the wrong type of relationship between the connected ideas.';

    case 'misc-topics':
      if (choiceText.toLowerCase().includes('affect') || choiceText.toLowerCase().includes('effect')) {
        return 'This confuses affect (verb) with effect (noun). Check whether you need a verb (affect) or noun (effect).';
      }
      if (choiceText.toLowerCase().includes('than') || choiceText.toLowerCase().includes('then')) {
        return 'This confuses than (comparison) with then (time). Check whether you\'re comparing or sequencing.';
      }
      return 'This word doesn\'t fit the grammatical context or violates standard usage rules.';

    case 'word-choice':
      return 'This word doesn\'t accurately fit the context or convey the intended meaning as precisely as the correct answer.';

    case 'adding-deleting':
      if (choiceText.toLowerCase().startsWith('yes')) {
        if (choiceText.toLowerCase().includes('proves') || choiceText.toLowerCase().includes('demonstrates')) {
          return 'This overstates what the sentence does. One detail doesn\'t "prove" a broad claim. Focus on whether it fits the paragraph\'s topic.';
        }
        return 'While this reasoning sounds plausible, the addition doesn\'t actually support the paragraph\'s main focus.';
      } else {
        if (choiceText.toLowerCase().includes('does not mention') || choiceText.toLowerCase().includes('does not specify')) {
          return 'This reasoning is flawed - we don\'t reject sentences just for lacking every possible detail. The key is relevance to the paragraph\'s focus.';
        }
        return 'This reasoning incorrectly identifies why the information should be removed. The sentence actually fits the paragraph\'s purpose.';
      }

    case 'logical-placement':
      return 'This placement disrupts logical flow by either separating related ideas, introducing information before its context, or breaking coherent progressions.';

    case 'which-choice':
      return 'This choice either doesn\'t fulfill what the question specifically asks for, or adds requirements that aren\'t stated in the question.';

    default:
      return 'This choice doesn\'t best address the question requirements.';
  }
}

addAllPerChoiceExplanations();
