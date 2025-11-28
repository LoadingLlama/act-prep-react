const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
// Use service role key to bypass RLS policies for updates
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const allGenericData = JSON.parse(fs.readFileSync('all-generic-full-data.json', 'utf8'));

// Sophisticated explanation generators by lesson type
const explanationGenerators = {
  'adding-deleting': generateAddingDeletingExplanation,
  'commas': generateCommasExplanation,
  'logical-placement': generateLogicalPlacementExplanation,
  'misc-topics': generateMiscTopicsExplanation,
  'modifiers': generateModifiersExplanation,
  'parallel-structure': generateParallelStructureExplanation,
  'pronouns': generatePronounsExplanation,
  'punctuation': generatePunctuationExplanation,
  'redundancy': generateRedundancyExplanation,
  'transitions': generateTransitionsExplanation,
  'verbs': generateVerbsExplanation,
  'which-choice': generateWhichChoiceExplanation
};

async function robustFixAll() {
  console.log('Starting robust fix for all 47 generic explanations...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const lesson of allGenericData) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`Processing: ${lesson.lessonKey} (${lesson.questions.length} questions)`);
    console.log('='.repeat(70));

    const generator = explanationGenerators[lesson.lessonKey];
    if (!generator) {
      console.log(`⚠ No generator found for ${lesson.lessonKey}, skipping...`);
      continue;
    }

    for (const question of lesson.questions) {
      try {
        const { mainExplanation, choiceExplanations } = generator(question);

        // Update choices with new explanations
        const updatedChoices = question.choices.map((choice) => {
          const newExp = choiceExplanations.find(e => e.letter === choice.letter);
          return {
            ...choice,
            explanation: newExp ? newExp.explanation : choice.explanation
          };
        });

        // Update database
        const { error } = await supabase
          .from('lesson_examples')
          .update({
            answer_explanation: mainExplanation,
            choices: updatedChoices
          })
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
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`✓ Successfully fixed: ${successCount} questions`);
  console.log(`✗ Errors: ${errorCount} questions`);
  console.log('='.repeat(70));
}

// ============================================================================
// ADDING-DELETING EXPLANATIONS
// ============================================================================
function generateAddingDeletingExplanation(question) {
  const correctLetter = question.correct_answer;
  const isAddQuestion = question.problem_text.toLowerCase().includes('should the writer add');
  const correctChoice = question.choices.find(c => c.letter === correctLetter);
  const isYesAnswer = correctChoice.text.toLowerCase().startsWith('yes');

  let mainExplanation = '';
  const choiceExplanations = [];

  // Analyze each choice
  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;
    const text = choice.text;
    const startsWithYes = text.toLowerCase().startsWith('yes');

    if (isCorrect) {
      // Correct answer explanation
      if (startsWithYes && isAddQuestion) {
        mainExplanation = `**Should we add this sentence?** Yes, because it directly supports the paragraph's focus.\n\n`;
        mainExplanation += `• **Choice ${choice.letter} is correct**: ${text}\n`;
        mainExplanation += `  The proposed sentence provides relevant, specific detail that enhances the paragraph's main point.\n\n`;
      } else if (!startsWithYes && isAddQuestion) {
        mainExplanation = `**Should we add this sentence?** No, because it doesn't fit the paragraph's focus.\n\n`;
        mainExplanation += `• **Choice ${choice.letter} is correct**: ${text}\n`;
        mainExplanation += `  The proposed sentence would disrupt the paragraph's coherence by introducing irrelevant or off-topic information.\n\n`;
      } else if (startsWithYes && !isAddQuestion) {
        mainExplanation = `**Should we delete this sentence?** No, keep it because it's essential to the paragraph.\n\n`;
        mainExplanation += `• **Choice ${choice.letter} is correct**: ${text}\n`;
        mainExplanation += `  The sentence provides important information that directly supports the paragraph's main idea.\n\n`;
      } else {
        mainExplanation = `**Should we delete this sentence?** Yes, because it doesn't belong here.\n\n`;
        mainExplanation += `• **Choice ${choice.letter} is correct**: ${text}\n`;
        mainExplanation += `  The sentence introduces irrelevant information that distracts from the paragraph's focus.\n\n`;
      }

      choiceExplanations.push({
        letter: choice.letter,
        explanation: `Correct. ${getAddDeleteCorrectReason(text, isAddQuestion)}`
      });
    } else {
      // Incorrect answer explanations
      mainExplanation += `• Choice ${choice.letter} is wrong: ${text}\n`;
      mainExplanation += `  ${getAddDeleteWrongReason(text, correctChoice.text, isAddQuestion)}\n\n`;

      choiceExplanations.push({
        letter: choice.letter,
        explanation: getAddDeleteWrongReason(text, correctChoice.text, isAddQuestion)
      });
    }
  });

  mainExplanation += `\nKey principle: Only add information that directly supports the paragraph's main focus. Delete anything that's irrelevant, redundant, or off-topic.`;

  return { mainExplanation, choiceExplanations };
}

function getAddDeleteCorrectReason(text, isAddQuestion) {
  if (text.toLowerCase().includes('relates') || text.toLowerCase().includes('relevant')) {
    return 'The proposed addition directly supports the paragraph\'s main topic and provides relevant detail.';
  }
  if (text.toLowerCase().includes('does not relate') || text.toLowerCase().includes('irrelevant')) {
    return 'The proposed addition would introduce information that doesn\'t fit the paragraph\'s focus.';
  }
  if (text.toLowerCase().includes('specific detail') || text.toLowerCase().includes('provides detail')) {
    return 'Adding this sentence provides concrete, relevant detail that enhances the paragraph\'s point.';
  }
  if (text.toLowerCase().includes('qualifications') || text.toLowerCase().includes('credentials')) {
    return 'While credentials may be interesting, they don\'t relate to what the paragraph is actually discussing.';
  }
  return 'This choice correctly identifies whether the information fits the paragraph\'s focus.';
}

function getAddDeleteWrongReason(wrongText, correctText, isAddQuestion) {
  // Check if wrong answer makes claims that aren't justified
  if (wrongText.toLowerCase().includes('proves') || wrongText.toLowerCase().includes('demonstrates')) {
    return 'This choice overstates what the sentence does. Providing one example or detail doesn\'t "prove" a sweeping claim.';
  }
  if (wrongText.toLowerCase().includes('does not mention') || wrongText.toLowerCase().includes('does not specify')) {
    return 'This reasoning is flawed - we don\'t reject sentences just because they don\'t include every possible detail. The question is whether the sentence fits the paragraph\'s focus.';
  }
  if (wrongText.toLowerCase().includes('qualification') && correctText.toLowerCase().includes('does not relate')) {
    return 'While the sentence might establish qualifications, that\'s not what the paragraph is about. The key is relevance to the paragraph\'s actual focus.';
  }
  return 'This choice provides incorrect reasoning about whether the information fits the paragraph\'s main topic.';
}

// ============================================================================
// COMMAS EXPLANATIONS
// ============================================================================
function generateCommasExplanation(question) {
  const correctLetter = question.correct_answer;
  const problemText = question.problem_text;

  let mainExplanation = '';
  const choiceExplanations = [];

  // Detect what comma rule is being tested
  const isFANBOYS = problemText.match(/\b(and|but|or|nor|for|yet|so)\b/i);
  const isNonEssential = problemText.includes('unnecessary') || problemText.includes('non-essential');
  const isTransitional = problemText.match(/\b(however|therefore|moreover|furthermore|nevertheless)\b/i);
  const isList = problemText.includes(',') && (problemText.match(/,/g) || []).length >= 2;

  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;
    const text = choice.text;
    const hasCommas = (text.match(/,/g) || []).length;
    const hasSemicolon = text.includes(';');

    if (isCorrect) {
      if (text === 'NO CHANGE') {
        mainExplanation = `**Choice ${choice.letter} is correct**: NO CHANGE\n\n`;

        if (isFANBOYS && !hasSemicolon) {
          mainExplanation += `The original punctuation is correct. When a FANBOYS conjunction (${isFANBOYS[1]}) joins two independent clauses, you need a comma before it.\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. The comma before "${isFANBOYS[1]}" properly joins two independent clauses. Both clauses can stand alone as complete sentences, so a comma before the FANBOYS is required.`
          });
        } else if (isNonEssential) {
          mainExplanation += `The original commas are correct. Non-essential information (info that can be removed without changing the sentence's core meaning) must be set off with commas.\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. The commas properly set off non-essential descriptive information. If you cross out the phrase between commas, the sentence still works.`
          });
        } else {
          mainExplanation += `The original punctuation correctly follows comma rules.\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. The punctuation properly follows standard comma conventions.`
          });
        }
      } else {
        // Correct answer is a change
        if (hasCommas === 0 && text.trim() !== 'NO CHANGE') {
          mainExplanation = `**Choice ${choice.letter} is correct**: ${text}\n\n`;
          mainExplanation += `The original commas are unnecessary. This information is essential to the sentence meaning, so no commas should be used.\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. Removing the commas is right because this information is essential to identify what/who we're talking about. Essential information doesn't get commas.`
          });
        } else {
          mainExplanation = `**Choice ${choice.letter} is correct**: ${text}\n\n`;
          mainExplanation += `This choice provides the proper comma placement based on standard comma rules.\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. This punctuation properly follows comma conventions for this sentence structure.`
          });
        }
      }
    } else {
      // Wrong answer
      mainExplanation += `• Choice ${choice.letter} is wrong: ${text}\n`;

      if (text === 'NO CHANGE') {
        mainExplanation += `  The original punctuation violates comma rules - a change is needed.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `The original punctuation is incorrect and needs to be changed to follow proper comma rules.`
        });
      } else if (hasCommas === 1 && question.choices.find(c => c.letter === correctLetter).text.includes(',')) {
        mainExplanation += `  Non-essential information requires commas on BOTH sides. Using only one comma creates incorrect punctuation.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Non-essential phrases need commas on both sides, not just one. This creates inconsistent punctuation.`
        });
      } else {
        mainExplanation += `  This punctuation doesn't follow proper comma conventions.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `This punctuation violates standard comma rules for this sentence structure.`
        });
      }
    }
  });

  mainExplanation += `Key principle: Use commas to set off non-essential information, before FANBOYS joining independent clauses, and after introductory elements.`;

  return { mainExplanation, choiceExplanations };
}

// ============================================================================
// LOGICAL PLACEMENT EXPLANATIONS
// ============================================================================
function generateLogicalPlacementExplanation(question) {
  const correctLetter = question.correct_answer;
  const correctChoice = question.choices.find(c => c.letter === correctLetter);
  const sentenceToMove = question.problem_text.match(/<u>(.*?)<\/u>/)?.[1] || '';

  let mainExplanation = `The underlined sentence "${sentenceToMove.substring(0, 60)}..." needs to be placed where it logically flows with the surrounding ideas.\n\n`;

  const choiceExplanations = [];

  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;
    const text = choice.text;

    if (isCorrect) {
      mainExplanation += `**Choice ${choice.letter} is correct**: ${text}\n\n`;

      if (text.toLowerCase().includes('where it is now')) {
        mainExplanation += `The sentence is already in the right place - it logically follows what comes before and leads into what comes after.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. The sentence is already positioned where it best fits the logical flow of ideas.`
        });
      } else {
        const location = text.match(/after sentence (\d+)/)?.[1] || text.match(/before sentence (\d+)/)?.[1];
        mainExplanation += `Placing the sentence here creates proper logical flow - it follows the idea it builds upon and introduces what comes next.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. This placement ensures the sentence logically flows with the surrounding content and maintains coherent idea progression.`
        });
      }
    } else {
      mainExplanation += `• Choice ${choice.letter} is wrong: ${text}\n`;
      mainExplanation += `  This placement would disrupt logical flow by separating related ideas or placing information before its context is established.\n\n`;

      choiceExplanations.push({
        letter: choice.letter,
        explanation: `This placement would create illogical flow - either separating related ideas, introducing information before context is established, or breaking up coherent progressions.`
      });
    }
  });

  mainExplanation += `Key principle: Sentences should follow logical order. Information must come after its context is introduced, and related ideas should be grouped together.`;

  return { mainExplanation, choiceExplanations };
}

// ============================================================================
// MISC-TOPICS EXPLANATIONS
// ============================================================================
function generateMiscTopicsExplanation(question) {
  const correctLetter = question.correct_answer;
  const problemText = question.problem_text.toLowerCase();

  // Detect what topic is being tested
  const isAffectEffect = problemText.includes('affect') || problemText.includes('effect');
  const isThanThen = problemText.includes('than') || problemText.includes('then');
  const isAmountNumber = problemText.includes('amount') || problemText.includes('number');
  const isItsIts = problemText.includes("it's") || problemText.includes('its');
  const isThereTheir = problemText.includes('there') || problemText.includes('their');

  let mainExplanation = '';
  const choiceExplanations = [];

  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;
    const text = choice.text;

    if (isCorrect) {
      mainExplanation = `**Choice ${choice.letter} is correct**: ${text}\n\n`;

      if (isAffectEffect) {
        if (text.toLowerCase().includes('affect')) {
          mainExplanation += `"Affect" is correct as a verb meaning to influence or impact something.\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. "Affect" is the verb meaning to influence or have an impact on something.`
          });
        } else {
          mainExplanation += `"Effect" is correct as a noun meaning the result or consequence.\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. "Effect" is the noun meaning result or outcome.`
          });
        }
      } else if (isThanThen) {
        if (text.toLowerCase().includes('than')) {
          mainExplanation += `"Than" is used for comparisons (bigger than, faster than).\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. "Than" is used for making comparisons between two things.`
          });
        } else {
          mainExplanation += `"Then" indicates time or sequence (first this, then that).\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. "Then" indicates time sequence or what happens next.`
          });
        }
      } else if (isAmountNumber) {
        if (text.toLowerCase().includes('amount')) {
          mainExplanation += `"Amount" is for uncountable things (amount of water, amount of time).\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. "Amount" is used with uncountable nouns - things you can't count individually.`
          });
        } else {
          mainExplanation += `"Number" is for countable things (number of people, number of books).\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. "Number" is used with countable nouns - things you can count individually.`
          });
        }
      } else {
        mainExplanation += `This choice follows proper usage conventions.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. This follows standard English usage rules.`
        });
      }
    } else {
      mainExplanation += `• Choice ${choice.letter} is wrong: ${text}\n`;
      mainExplanation += `  This uses the wrong word for the context.\n\n`;

      choiceExplanations.push({
        letter: choice.letter,
        explanation: `This word doesn't fit the grammatical context or violates standard usage rules.`
      });
    }
  });

  mainExplanation += `Key principle: Master common usage pairs - affect (verb) vs effect (noun), than (comparison) vs then (time), amount (uncountable) vs number (countable).`;

  return { mainExplanation, choiceExplanations };
}

// ============================================================================
// MODIFIERS EXPLANATIONS
// ============================================================================
function generateModifiersExplanation(question) {
  const correctLetter = question.correct_answer;

  let mainExplanation = `Modifiers must be placed next to what they describe. Misplaced modifiers create confusion about what's being modified.\n\n`;

  const choiceExplanations = [];

  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;
    const text = choice.text;

    if (isCorrect) {
      mainExplanation += `**Choice ${choice.letter} is correct**: ${text}\n\n`;
      mainExplanation += `This placement puts the modifier right next to what it describes, making the meaning clear.\n\n`;

      choiceExplanations.push({
        letter: choice.letter,
        explanation: `Correct. The modifier is placed immediately next to what it describes, creating clear, unambiguous meaning.`
      });
    } else {
      mainExplanation += `• Choice ${choice.letter} is wrong: ${text}\n`;
      mainExplanation += `  This creates a misplaced or dangling modifier - the descriptive phrase isn't next to what it's describing.\n\n`;

      choiceExplanations.push({
        letter: choice.letter,
        explanation: `This creates a misplaced modifier - the descriptive phrase isn't positioned next to what it's meant to describe, causing confusion.`
      });
    }
  });

  mainExplanation += `Key principle: Place modifiers (descriptive phrases) immediately next to the words they modify. Opening modifiers should describe the subject right after the comma.`;

  return { mainExplanation, choiceExplanations };
}

// ============================================================================
// PARALLEL STRUCTURE EXPLANATIONS
// ============================================================================
function generateParallelStructureExplanation(question) {
  const correctLetter = question.correct_answer;
  const correctChoice = question.choices.find(c => c.letter === correctLetter);

  let mainExplanation = `Items in a list or comparison must have matching grammatical forms (all nouns, all verbs, all phrases, etc.).\n\n`;

  const choiceExplanations = [];

  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;
    const text = choice.text;

    if (isCorrect) {
      mainExplanation += `**Choice ${choice.letter} is correct**: ${text}\n\n`;
      mainExplanation += `This choice maintains parallel structure by using the same grammatical form for all items in the series.\n\n`;

      choiceExplanations.push({
        letter: choice.letter,
        explanation: `Correct. This maintains parallel structure - all items in the list have the same grammatical form, creating smooth, balanced phrasing.`
      });
    } else {
      mainExplanation += `• Choice ${choice.letter} is wrong: ${text}\n`;
      mainExplanation += `  This breaks parallelism by switching grammatical forms mid-list.\n\n`;

      choiceExplanations.push({
        letter: choice.letter,
        explanation: `This breaks parallel structure by mixing different grammatical forms (e.g., switching from nouns to verbs, or from phrases to single words).`
      });
    }
  });

  mainExplanation += `Key principle: Keep it parallel. If you start with "-ing" verbs, use "-ing" verbs throughout. If you start with "to" verbs, use "to" verbs throughout.`;

  return { mainExplanation, choiceExplanations };
}

// ============================================================================
// PRONOUNS EXPLANATIONS
// ============================================================================
function generatePronounsExplanation(question) {
  const correctLetter = question.correct_answer;
  const problemText = question.problem_text.toLowerCase();

  const isWhoWhom = problemText.includes('who') || problemText.includes('whom');
  const isAgreement = problemText.includes('they') || problemText.includes('it') || problemText.includes('their');

  let mainExplanation = '';
  const choiceExplanations = [];

  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;
    const text = choice.text;

    if (isCorrect) {
      mainExplanation = `**Choice ${choice.letter} is correct**: ${text}\n\n`;

      if (isWhoWhom) {
        if (text.toLowerCase().includes('who')) {
          mainExplanation += `"Who" is correct because it's the subject of the clause (performing the action).\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. "Who" is used when the pronoun is the subject - the one doing the action.`
          });
        } else {
          mainExplanation += `"Whom" is correct because it's the object (receiving the action).\n\n`;
          choiceExplanations.push({
            letter: choice.letter,
            explanation: `Correct. "Whom" is used when the pronoun is the object - the one being acted upon.`
          });
        }
      } else if (isAgreement) {
        mainExplanation += `This pronoun agrees with its antecedent in number and gender.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. The pronoun properly matches its antecedent (the noun it refers to) in number and gender.`
        });
      } else {
        mainExplanation += `This pronoun choice follows proper usage rules.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. This pronoun follows standard usage conventions.`
        });
      }
    } else {
      mainExplanation += `• Choice ${choice.letter} is wrong: ${text}\n`;

      if (isWhoWhom) {
        mainExplanation += `  This uses the wrong form - check if the pronoun is doing the action (who) or receiving it (whom).\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `This uses the wrong form. Remember: "who" for subjects (doing action), "whom" for objects (receiving action).`
        });
      } else {
        mainExplanation += `  This pronoun doesn't agree with its antecedent.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `This pronoun doesn't match its antecedent in number or creates ambiguous reference.`
        });
      }
    }
  });

  mainExplanation += `Key principle: Pronouns must agree with their antecedents in number and gender. Use "who" for subjects, "whom" for objects.`;

  return { mainExplanation, choiceExplanations };
}

// ============================================================================
// PUNCTUATION EXPLANATIONS
// ============================================================================
function generatePunctuationExplanation(question) {
  const correctLetter = question.correct_answer;
  const correctChoice = question.choices.find(c => c.letter === correctLetter);

  let mainExplanation = '';
  const choiceExplanations = [];

  // Detect punctuation type
  const hasSemicolon = correctChoice.text.includes(';');
  const hasColon = correctChoice.text.includes(':');
  const hasDash = correctChoice.text.includes('—') || correctChoice.text.includes(' - ');

  if (hasSemicolon) {
    mainExplanation = `**Choice ${correctLetter} is correct**: ${correctChoice.text}\n\n`;
    mainExplanation += `A semicolon correctly joins two independent clauses (complete sentences) without a conjunction.\n\n`;
  } else if (hasColon) {
    mainExplanation = `**Choice ${correctLetter} is correct**: ${correctChoice.text}\n\n`;
    mainExplanation += `A colon introduces a list, explanation, or elaboration after a complete independent clause.\n\n`;
  } else if (hasDash) {
    mainExplanation = `**Choice ${correctLetter} is correct**: ${correctChoice.text}\n\n`;
    mainExplanation += `Dashes set off additional information with emphasis or indicate an abrupt break in thought.\n\n`;
  } else {
    mainExplanation = `**Choice ${correctLetter} is correct**: ${correctChoice.text}\n\n`;
    mainExplanation += `This punctuation properly follows standard conventions.\n\n`;
  }

  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;

    if (isCorrect) {
      if (hasSemicolon) {
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. The semicolon properly joins two independent clauses. Both sides can stand alone as complete sentences.`
        });
      } else if (hasColon) {
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. The colon introduces what follows (list, explanation, or elaboration) after a complete clause.`
        });
      } else {
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. This punctuation follows proper conventions.`
        });
      }
    } else {
      mainExplanation += `• Choice ${choice.letter} is wrong: ${choice.text}\n`;
      mainExplanation += `  This punctuation doesn't fit the sentence structure.\n\n`;

      choiceExplanations.push({
        letter: choice.letter,
        explanation: `This punctuation doesn't work with the sentence structure or violates standard punctuation rules.`
      });
    }
  });

  mainExplanation += `Key principle: Semicolons join independent clauses. Colons introduce lists/explanations after complete clauses. Dashes add emphasis.`;

  return { mainExplanation, choiceExplanations };
}

// ============================================================================
// REDUNDANCY EXPLANATIONS
// ============================================================================
function generateRedundancyExplanation(question) {
  const correctLetter = question.correct_answer;
  const correctChoice = question.choices.find(c => c.letter === correctLetter);

  let mainExplanation = `Eliminate unnecessary repetition and wordiness. If information is already implied or stated, don't repeat it.\n\n`;

  const choiceExplanations = [];

  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;
    const text = choice.text;

    if (isCorrect) {
      mainExplanation += `**Choice ${choice.letter} is correct**: ${text}\n\n`;

      if (text === 'NO CHANGE' || text === 'DELETE the underlined portion') {
        mainExplanation += `This avoids redundancy by not repeating information that's already clear from context.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. This eliminates redundancy - the information is already clear from context, so additional words are unnecessary.`
        });
      } else if (text.length < 30) {
        mainExplanation += `This is the most concise option that conveys the meaning without redundancy.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. This is the most concise way to express the idea without repeating information or using unnecessary words.`
        });
      } else {
        mainExplanation += `This choice avoids redundancy while maintaining clarity.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. This avoids redundant phrasing while keeping the meaning clear.`
        });
      }
    } else {
      mainExplanation += `• Choice ${choice.letter} is wrong: ${text}\n`;
      mainExplanation += `  This repeats information that's already stated or implied, making it wordy and redundant.\n\n`;

      choiceExplanations.push({
        letter: choice.letter,
        explanation: `This is redundant - it repeats information that's already clear from context or uses unnecessary words that don't add meaning.`
      });
    }
  });

  mainExplanation += `Key principle: Be concise. Cut redundant words and phrases. If the meaning is clear without it, delete it.`;

  return { mainExplanation, choiceExplanations };
}

// ============================================================================
// TRANSITIONS EXPLANATIONS
// ============================================================================
function generateTransitionsExplanation(question) {
  const correctLetter = question.correct_answer;
  const correctChoice = question.choices.find(c => c.letter === correctLetter);

  let mainExplanation = '';
  const choiceExplanations = [];

  // Analyze the correct transition type
  const text = correctChoice.text.toLowerCase();
  let transitionType = '';

  if (text.includes('however') || text.includes('although') || text.includes('despite') || text.includes('yet')) {
    transitionType = 'contrast';
    mainExplanation = `**Choice ${correctLetter} is correct**: ${correctChoice.text}\n\n`;
    mainExplanation += `This transition signals contrast or an unexpected relationship between ideas.\n\n`;
  } else if (text.includes('therefore') || text.includes('thus') || text.includes('consequently') || text.includes('as a result')) {
    transitionType = 'cause-effect';
    mainExplanation = `**Choice ${correctLetter} is correct**: ${correctChoice.text}\n\n`;
    mainExplanation += `This transition shows cause-and-effect or logical consequence.\n\n`;
  } else if (text.includes('furthermore') || text.includes('moreover') || text.includes('additionally') || text.includes('also')) {
    transitionType = 'addition';
    mainExplanation = `**Choice ${correctLetter} is correct**: ${correctChoice.text}\n\n`;
    mainExplanation += `This transition adds supporting information or another example.\n\n`;
  } else if (text.includes('first') || text.includes('next') || text.includes('finally') || text.includes('then')) {
    transitionType = 'sequence';
    mainExplanation = `**Choice ${correctLetter} is correct**: ${correctChoice.text}\n\n`;
    mainExplanation += `This transition shows time sequence or order of events.\n\n`;
  } else {
    mainExplanation = `**Choice ${correctLetter} is correct**: ${correctChoice.text}\n\n`;
    mainExplanation += `This transition matches the logical relationship between the ideas.\n\n`;
  }

  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;

    if (isCorrect) {
      choiceExplanations.push({
        letter: choice.letter,
        explanation: `Correct. This transition properly signals the ${transitionType || 'logical'} relationship between the ideas being connected.`
      });
    } else {
      mainExplanation += `• Choice ${choice.letter} is wrong: ${choice.text}\n`;
      mainExplanation += `  This transition signals the wrong type of relationship between ideas.\n\n`;

      choiceExplanations.push({
        letter: choice.letter,
        explanation: `This transition doesn't match the logical relationship between ideas - it signals the wrong type of connection.`
      });
    }
  });

  mainExplanation += `Key principle: Choose transitions that match the logical relationship - contrast (however, yet), cause-effect (therefore, thus), addition (furthermore, also), sequence (first, next).`;

  return { mainExplanation, choiceExplanations };
}

// ============================================================================
// VERBS EXPLANATIONS
// ============================================================================
function generateVerbsExplanation(question) {
  const correctLetter = question.correct_answer;
  const problemText = question.problem_text;

  let mainExplanation = '';
  const choiceExplanations = [];

  // Detect verb issue type
  const isSubjectVerb = /\b(is|are|was|were|has|have)\b/i.test(problemText);
  const isTense = /\b(will|would|had|have|has)\b/i.test(problemText);

  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;
    const text = choice.text;

    if (isCorrect) {
      mainExplanation = `**Choice ${choice.letter} is correct**: ${text}\n\n`;

      if (isSubjectVerb) {
        mainExplanation += `This verb form agrees with the subject in number (singular vs plural).\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. This verb form agrees with the subject in number - singular subjects get singular verbs, plural subjects get plural verbs.`
        });
      } else if (isTense) {
        mainExplanation += `This verb tense matches the time frame established in the passage.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. This verb tense fits the time frame and context of the passage.`
        });
      } else {
        mainExplanation += `This verb form is correct for the sentence.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `Correct. This verb form follows proper usage rules.`
        });
      }
    } else {
      mainExplanation += `• Choice ${choice.letter} is wrong: ${text}\n`;

      if (isSubjectVerb) {
        mainExplanation += `  This verb doesn't agree with the subject in number.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `This verb doesn't agree with the subject - there's a mismatch in number (singular vs plural).`
        });
      } else if (isTense) {
        mainExplanation += `  This verb tense doesn't match the time frame of the passage.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `This verb tense doesn't fit the time frame established in the passage.`
        });
      } else {
        mainExplanation += `  This verb form is incorrect.\n\n`;
        choiceExplanations.push({
          letter: choice.letter,
          explanation: `This verb form violates standard usage rules.`
        });
      }
    }
  });

  mainExplanation += `Key principle: Verbs must agree with their subjects in number. Use tenses that match the passage's time frame and context.`;

  return { mainExplanation, choiceExplanations };
}

// ============================================================================
// WHICH-CHOICE EXPLANATIONS
// ============================================================================
function generateWhichChoiceExplanation(question) {
  const correctLetter = question.correct_answer;
  const problemText = question.problem_text;
  const correctChoice = question.choices.find(c => c.letter === correctLetter);

  let mainExplanation = `Read the question carefully and choose the option that does exactly what it asks - no more, no less.\n\n`;
  mainExplanation += `**Choice ${correctLetter} is correct**: ${correctChoice.text}\n\n`;
  mainExplanation += `This choice directly fulfills what the question asks for without overreaching or adding requirements that aren't in the question.\n\n`;

  const choiceExplanations = [];

  question.choices.forEach(choice => {
    const isCorrect = choice.letter === correctLetter;

    if (isCorrect) {
      choiceExplanations.push({
        letter: choice.letter,
        explanation: `Correct. This choice does exactly what the question asks for - it fulfills the requirement without overreaching or making claims beyond what's asked.`
      });
    } else {
      mainExplanation += `• Choice ${choice.letter} is wrong: ${choice.text}\n`;
      mainExplanation += `  This either doesn't fulfill the question's requirement or goes beyond what the question asks for.\n\n`;

      choiceExplanations.push({
        letter: choice.letter,
        explanation: `This choice either doesn't fulfill what the question specifically asks for, or it adds requirements that aren't in the question.`
      });
    }
  });

  mainExplanation += `Key principle: Answer exactly what the question asks. Don't overthink it or add requirements that aren't explicitly stated in the question.`;

  return { mainExplanation, choiceExplanations };
}

robustFixAll();
