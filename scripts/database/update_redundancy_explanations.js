/**
 * Update REDUNDANCY lesson questions with per-choice explanations
 * All 30 questions need ultra-specific explanations for each choice
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734'; // redundancy

// Get existing question and update it with per-choice explanations
async function updateQuestion(position, newChoices) {
  // First, get the existing question
  const { data: existing, error: fetchError } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', LESSON_ID)
    .eq('position', position)
    .single();

  if (fetchError || !existing) {
    console.error(`  ✗ Error fetching position ${position}:`, fetchError?.message);
    return false;
  }

  // Update with new choices that include explanations
  const { error: updateError } = await supabase
    .from('lesson_examples')
    .update({ choices: newChoices })
    .eq('lesson_id', LESSON_ID)
    .eq('position', position);

  if (updateError) {
    console.error(`  ✗ Error updating position ${position}:`, updateError.message);
    return false;
  }

  return true;
}

// Updated choices with ultra-specific per-choice explanations
const updatedChoices = {
  5: [ // "collaborate together"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Collaborate" already means "work together," so adding "together" creates redundancy—it repeats the same concept using different words without adding meaning.'
    },
    {
      letter: 'B',
      text: 'collaborate',
      explanation: '"Collaborate" alone is concise and complete—the word inherently means working together, so no additional words are needed to convey the meaning.'
    },
    {
      letter: 'C',
      text: 'work together in collaboration',
      explanation: 'This is even more redundant than the original—"work together" and "collaboration" express the same idea twice, making the phrase unnecessarily wordy.'
    },
    {
      letter: 'D',
      text: 'be collaborating together',
      explanation: 'This adds both the progressive tense ("be collaborating") and the redundant "together," making it wordier than necessary without changing the meaning.'
    }
  ],

  6: [ // "is located in the city of"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Is located in the city of" uses seven words where two would suffice—"located in" is verbose compared to "in," and "the city of" is unnecessary before a city name.'
    },
    {
      letter: 'B',
      text: 'is in',
      explanation: '"Is in" conveys the exact same meaning as "is located in the city of" using only two words instead of seven, eliminating all unnecessary verbiage.'
    },
    {
      letter: 'C',
      text: 'can be found in the city of',
      explanation: 'This replaces one wordy phrase with another equally verbose one—"can be found in" is no better than "is located in," and "the city of" remains unnecessary.'
    },
    {
      letter: 'D',
      text: 'has its location in',
      explanation: '"Has its location in" is awkward and wordy—it takes four words to express what "is in" says in two, without adding any additional meaning or clarity.'
    }
  ],

  7: [ // "free gift"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'By definition, a gift is something given freely without payment, so "free" is redundant—it states what is already implied by the word "gift."'
    },
    {
      letter: 'B',
      text: 'gift that was free',
      explanation: 'This expands the redundancy into a longer phrase—stating that the gift "was free" is still unnecessary since "gift" inherently means something free.'
    },
    {
      letter: 'C',
      text: 'gift',
      explanation: '"Gift" alone is complete and precise—the word itself conveys that something was given freely, making any additional modifier about being "free" redundant.'
    },
    {
      letter: 'D',
      text: 'complimentary free gift',
      explanation: 'This triples the redundancy—"complimentary," "free," and "gift" all convey the same concept of something given without charge, making this extremely wordy.'
    }
  ],

  9: [ // "at 3 PM in the afternoon"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"PM" is an abbreviation for "post meridiem," meaning "after noon" (i.e., afternoon)—so "in the afternoon" repeats information already conveyed by "PM."'
    },
    {
      letter: 'B',
      text: 'at 3 PM',
      explanation: '"At 3 PM" is complete and unambiguous—"PM" already indicates afternoon hours (noon to midnight), so no additional time-of-day clarification is needed.'
    },
    {
      letter: 'C',
      text: 'in the afternoon at 3 PM',
      explanation: 'Reversing the order doesn\'t eliminate the redundancy—"in the afternoon" is still unnecessary because "PM" already specifies that the time is in the afternoon.'
    },
    {
      letter: 'D',
      text: 'at 3 o\'clock PM in the afternoon',
      explanation: 'This compounds the redundancy by adding "o\'clock" unnecessarily and keeping both "PM" and "in the afternoon," making it even wordier than the original.'
    }
  ],

  10: [ // "final outcome of the experiment"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Final outcome" is already specific and complete—adding "of the experiment" is redundant when context makes clear what experiment is being discussed.'
    },
    {
      letter: 'B',
      text: 'result of the experiment',
      explanation: 'While this removes "final," it keeps the redundant "of the experiment" which adds no new information when context already establishes what experiment is referenced.'
    },
    {
      letter: 'C',
      text: 'DELETE the underlined portion',
      explanation: 'Deleting "of the experiment" leaves "final outcome" which is clear and complete—the context already establishes which experiment is being discussed, making the specification unnecessary.'
    },
    {
      letter: 'D',
      text: 'of the experiment\'s results',
      explanation: 'This is still redundant—when "final outcome" already identifies what\'s being discussed, adding "of the experiment\'s results" repeats information without adding clarity.'
    }
  ],

  13: [ // "surrounded on all sides"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Surrounded" means completely encircled—this already implies "on all sides," making the addition of "on all sides" a redundant clarification of what "surrounded" means.'
    },
    {
      letter: 'B',
      text: 'encircled on all sides',
      explanation: '"Encircled" has the same redundancy issue as "surrounded"—the word itself means completely circled around, so "on all sides" is unnecessary repetition.'
    },
    {
      letter: 'C',
      text: 'surrounded',
      explanation: '"Surrounded" alone is complete and unambiguous—the word inherently means encircled on all sides, requiring no additional specification.'
    },
    {
      letter: 'D',
      text: 'completely surrounded on all sides',
      explanation: 'This triples the redundancy—"completely," "surrounded," and "on all sides" all convey the same idea of total encirclement, making it extremely wordy.'
    }
  ],

  14: [ // "small in size"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Small" is an adjective that describes size—adding "in size" is redundant because "small" can only refer to size, making the clarification unnecessary.'
    },
    {
      letter: 'B',
      text: 'small',
      explanation: '"Small" alone is precise and complete—the word inherently describes size, so adding "in size" provides no additional information or clarity.'
    },
    {
      letter: 'C',
      text: 'diminutive in size',
      explanation: 'While "diminutive" is a more sophisticated synonym for "small," adding "in size" is still redundant—"diminutive" can only describe size.'
    },
    {
      letter: 'D',
      text: 'small in its dimensions',
      explanation: 'This replaces "in size" with "in its dimensions" but maintains the same redundancy—"small" already describes dimensions, making the addition verbose.'
    }
  ],

  15: [ // "past history"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"History" is by definition a record of past events—adding "past" is redundant since history cannot refer to the present or future.'
    },
    {
      letter: 'B',
      text: 'history',
      explanation: '"History" alone is correct and complete—the word inherently refers to the past, making any temporal modifier redundant.'
    },
    {
      letter: 'C',
      text: 'past historical record',
      explanation: 'This compounds redundancy—both "past" and "historical" indicate previous time, and both are unnecessary modifiers for "record" in this context.'
    },
    {
      letter: 'D',
      text: 'previous history',
      explanation: '"Previous" creates the same redundancy as "past"—history is always about previous events, so the temporal modifier adds nothing.'
    }
  ],

  16: [ // "join together"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Join" means to bring together or connect—adding "together" is redundant because joining inherently involves coming together.'
    },
    {
      letter: 'B',
      text: 'join',
      explanation: '"Join" alone conveys the complete meaning—the word inherently implies coming together, making "together" unnecessary repetition.'
    },
    {
      letter: 'C',
      text: 'unite together',
      explanation: '"Unite" has the same issue as "join"—it means to bring together, so adding "together" creates the same redundancy with a different verb.'
    },
    {
      letter: 'D',
      text: 'merge together',
      explanation: '"Merge" also means to combine into one—like "join" and "unite," it inherently implies coming together, making "together" redundant.'
    }
  ],

  19: [ // "unexpected surprise"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'A surprise is by definition something unexpected—adding "unexpected" is redundant since if something were expected, it wouldn\'t be a surprise.'
    },
    {
      letter: 'B',
      text: 'surprise',
      explanation: '"Surprise" alone is complete and precise—the word inherently means something unexpected, making the modifier unnecessary.'
    },
    {
      letter: 'C',
      text: 'unanticipated surprise',
      explanation: '"Unanticipated" creates the same redundancy as "unexpected"—surprises are always unanticipated, otherwise they wouldn\'t be surprising.'
    },
    {
      letter: 'D',
      text: 'completely unexpected surprise',
      explanation: 'This doubles down on redundancy—both "completely unexpected" and "surprise" convey the same idea, making it unnecessarily emphatic and wordy.'
    }
  ],

  20: [ // "future plans"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'Plans are by nature about the future—you can\'t have plans for the past, so "future" is a redundant modifier that states the obvious.'
    },
    {
      letter: 'B',
      text: 'plans',
      explanation: '"Plans" alone is clear and complete—the word inherently refers to future intentions or arrangements, making temporal specification unnecessary.'
    },
    {
      letter: 'C',
      text: 'plans for the future',
      explanation: 'This expands "future plans" but maintains the same redundancy—"plans" already implies future action, so "for the future" is verbose.'
    },
    {
      letter: 'D',
      text: 'upcoming future plans',
      explanation: 'This triples the future reference—"upcoming," "future," and "plans" all point to time ahead, creating excessive redundancy.'
    }
  ],

  21: [ // "advance planning"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'Planning is inherently done in advance—it\'s preparation before an event, so "advance" is a redundant modifier that states what planning means.'
    },
    {
      letter: 'B',
      text: 'planning',
      explanation: '"Planning" alone is sufficient—the word already means preparing in advance, making the temporal modifier "advance" unnecessary repetition.'
    },
    {
      letter: 'C',
      text: 'planning in advance',
      explanation: 'This expands the phrase but maintains redundancy—"planning" already means doing something beforehand, so "in advance" adds no new meaning.'
    },
    {
      letter: 'D',
      text: 'prior advance planning',
      explanation: 'This triples the redundancy—"prior," "advance," and "planning" all indicate preparation beforehand, making it extremely verbose.'
    }
  ],

  23: [ // "end result"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'A result is the outcome at the end of a process—"end" is redundant because results occur at the conclusion by definition.'
    },
    {
      letter: 'B',
      text: 'result',
      explanation: '"Result" alone is precise and complete—the word inherently refers to a final outcome, making "end" an unnecessary modifier.'
    },
    {
      letter: 'C',
      text: 'final end result',
      explanation: 'This triples the redundancy—"final," "end," and "result" all refer to the ultimate outcome, making it excessively wordy.'
    },
    {
      letter: 'D',
      text: 'ultimate end result',
      explanation: 'Like choice C, this compounds redundancy—"ultimate" and "end" both mean final, and "result" already implies an endpoint.'
    }
  ],

  24: [ // "repeat again"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Repeat" means to do again—adding "again" is redundant since repetition inherently involves doing something a second or additional time.'
    },
    {
      letter: 'B',
      text: 'repeat',
      explanation: '"Repeat" alone conveys the complete meaning—the word itself means to do again, making "again" unnecessary duplication.'
    },
    {
      letter: 'C',
      text: 'do over again',
      explanation: 'This creates the same redundancy with different words—"do over" already implies repetition, so "again" is still unnecessary.'
    },
    {
      letter: 'D',
      text: 'reiterate again',
      explanation: '"Reiterate" specifically means to repeat or say again—adding "again" creates double redundancy since "reiterate" already contains the concept twice.'
    }
  ],

  29: [ // "brief summary"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'A summary is by nature a shortened version—it\'s already brief by definition, making "brief" a redundant modifier that states the obvious.'
    },
    {
      letter: 'B',
      text: 'summary',
      explanation: '"Summary" alone is sufficient—the word inherently means a concise overview, so specifying that it\'s brief is unnecessary.'
    },
    {
      letter: 'C',
      text: 'short, brief summary',
      explanation: 'This doubles the redundant modifier—both "short" and "brief" mean the same thing, and both are unnecessary with "summary."'
    },
    {
      letter: 'D',
      text: 'concise brief summary',
      explanation: '"Concise" and "brief" are synonyms, both meaning short—using both with "summary" (which is already brief) creates triple redundancy.'
    }
  ],

  33: [ // "important essentials"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'Essentials are by definition the important, necessary elements—"important" is redundant because things cannot be essential without being important.'
    },
    {
      letter: 'B',
      text: 'important',
      explanation: 'While "important" alone is correct, it\'s less precise than "essentials" which specifically denotes necessary fundamentals, not just things of significance.'
    },
    {
      letter: 'C',
      text: 'essentials',
      explanation: '"Essentials" is the most precise and concise choice—it specifically means the necessary, important basics, making "important" redundant.'
    },
    {
      letter: 'D',
      text: 'necessary important essentials',
      explanation: 'This triples the redundancy—"necessary," "important," and "essentials" all convey the same concept of crucial fundamentals, making it extremely verbose.'
    }
  ],

  34: [ // "close proximity"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Proximity" means nearness or closeness—adding "close" is redundant because proximity already indicates being nearby.'
    },
    {
      letter: 'B',
      text: 'near',
      explanation: '"Near" is concise and clear—it conveys the same meaning as "close proximity" in one word instead of two, eliminating redundancy.'
    },
    {
      letter: 'C',
      text: 'immediate close proximity',
      explanation: 'This compounds redundancy—"immediate," "close," and "proximity" all indicate nearness, making it excessively wordy.'
    },
    {
      letter: 'D',
      text: 'proximity that is close',
      explanation: 'This expands the redundancy into a longer phrase—"that is close" still unnecessarily modifies "proximity" which already means closeness.'
    }
  ],

  35: [ // "new innovations"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'An innovation is by definition something new—it\'s a novel idea or method, making "new" a redundant modifier that states what innovation means.'
    },
    {
      letter: 'B',
      text: 'innovations',
      explanation: '"Innovations" alone is precise and complete—the word inherently refers to new developments, making the modifier "new" unnecessary.'
    },
    {
      letter: 'C',
      text: 'new and innovative developments',
      explanation: 'This is extremely redundant—"new," "innovative," and "developments" all convey novelty, making it unnecessarily wordy and repetitive.'
    },
    {
      letter: 'D',
      text: 'novel new innovations',
      explanation: '"Novel" and "new" are synonyms, both meaning original or recent—using both with "innovations" (already means new) creates triple redundancy.'
    }
  ],

  36: [ // "added bonus"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'A bonus is something extra that\'s added—"added" is redundant because a bonus is by definition an addition beyond what\'s expected or required.'
    },
    {
      letter: 'B',
      text: 'bonus',
      explanation: '"Bonus" alone conveys the complete meaning—it inherently refers to something extra or added, making "added" unnecessary repetition.'
    },
    {
      letter: 'C',
      text: 'additional added bonus',
      explanation: 'This triples the redundancy—"additional," "added," and "bonus" all mean something extra, making it excessively wordy.'
    },
    {
      letter: 'D',
      text: 'extra added bonus',
      explanation: '"Extra" and "added" are redundant with each other and with "bonus"—all three words indicate something beyond the standard, creating excessive repetition.'
    }
  ],

  38: [ // "each individual"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Each" already specifies individual items considered separately—adding "individual" is redundant because "each" inherently means "every single one individually."'
    },
    {
      letter: 'B',
      text: 'each',
      explanation: '"Each" alone is precise and complete—it already conveys that items are considered individually, making "individual" unnecessary duplication.'
    },
    {
      letter: 'C',
      text: 'every single individual',
      explanation: 'This compounds redundancy—"every," "single," and "individual" all emphasize separate consideration, making it excessively emphatic and wordy.'
    },
    {
      letter: 'D',
      text: 'all of the individual',
      explanation: 'This shifts meaning slightly (collective to distributive) while maintaining redundancy—"individual" is still unnecessary when specifying persons separately.'
    }
  ],

  39: [ // "final conclusion"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'A conclusion is by definition the final part or judgment—"final" is redundant because conclusions come at the end by nature.'
    },
    {
      letter: 'B',
      text: 'conclusion',
      explanation: '"Conclusion" alone is clear and complete—the word inherently refers to a final determination or ending, making "final" unnecessary.'
    },
    {
      letter: 'C',
      text: 'ultimate final conclusion',
      explanation: 'This doubles the redundant modifier—"ultimate" and "final" are synonyms, and both are unnecessary with "conclusion."'
    },
    {
      letter: 'D',
      text: 'ending conclusion',
      explanation: '"Ending" creates the same redundancy as "final"—conclusions are endpoints by definition, making temporal specification verbose.'
    }
  ],

  40: [ // "true facts"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'Facts are by definition things that are true—if something isn\'t true, it\'s not a fact, making "true" a completely redundant modifier.'
    },
    {
      letter: 'B',
      text: 'facts',
      explanation: '"Facts" alone is precise and complete—the word inherently means verified truths, making "true" unnecessary and logically redundant.'
    },
    {
      letter: 'C',
      text: 'actual true facts',
      explanation: 'This triples the redundancy—"actual," "true," and "facts" all assert reality/truth, making it excessively emphatic without adding meaning.'
    },
    {
      letter: 'D',
      text: 'factual truths',
      explanation: 'While avoiding the exact phrase "true facts," this maintains redundancy—"factual" and "truths" essentially mean the same thing.'
    }
  ],

  41: [ // "general consensus"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: 'Consensus means general agreement among a group—"general" is redundant because consensus inherently refers to widespread or collective agreement.'
    },
    {
      letter: 'B',
      text: 'consensus',
      explanation: '"Consensus" alone is accurate and complete—it already means general agreement, making the modifier "general" unnecessary repetition.'
    },
    {
      letter: 'C',
      text: 'widespread general consensus',
      explanation: 'This doubles the redundant modifier—"widespread" and "general" both indicate broad agreement, and both are unnecessary with "consensus."'
    },
    {
      letter: 'D',
      text: 'broad general consensus',
      explanation: 'Like choice C, this uses two synonyms ("broad" and "general") that both mean the same thing as "consensus" already implies.'
    }
  ],

  43: [ // "may possibly"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"May" already expresses possibility or potential—adding "possibly" is redundant because both words indicate that something might occur.'
    },
    {
      letter: 'B',
      text: 'may',
      explanation: '"May" alone conveys the complete meaning—it already indicates possibility, making "possibly" unnecessary duplication of the same concept.'
    },
    {
      letter: 'C',
      text: 'might possibly',
      explanation: '"Might" has the same redundancy with "possibly" as "may" does—both "might" and "possibly" express uncertainty, making one of them unnecessary.'
    },
    {
      letter: 'D',
      text: 'could possibly',
      explanation: '"Could" is another modal verb expressing possibility—like "may" and "might," it\'s redundant with "possibly" since both indicate potential occurrence.'
    }
  ],

  44: [ // "currently being"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Being" in the progressive tense already indicates current action—adding "currently" is redundant because the progressive form ("is being") inherently expresses present time.'
    },
    {
      letter: 'B',
      text: 'being',
      explanation: '"Being" alone (as in "is being") is sufficient—the progressive form already indicates ongoing present action, making "currently" unnecessary temporal specification.'
    },
    {
      letter: 'C',
      text: 'presently being',
      explanation: '"Presently" creates the same redundancy as "currently"—both are unnecessary time markers when the progressive "being" already indicates present action.'
    },
    {
      letter: 'D',
      text: 'currently in the process of being',
      explanation: 'This compounds redundancy—"currently," "in the process of," and "being" all indicate ongoing present action, making it extremely verbose.'
    }
  ],

  46: [ // "互ually help each other"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Mutually" means both parties do something to/for each other—adding "each other" is redundant because "mutually" already conveys reciprocal action.'
    },
    {
      letter: 'B',
      text: 'help each other',
      explanation: '"Help each other" is clear and complete—it conveys reciprocal assistance without needing "mutually," which would be redundant.'
    },
    {
      letter: 'C',
      text: 'mutually help one another',
      explanation: 'Substituting "one another" for "each other" doesn\'t eliminate redundancy—"mutually" is still unnecessary when "one another" already indicates reciprocity.'
    },
    {
      letter: 'D',
      text: 'reciprocally help each other mutually',
      explanation: 'This is extremely redundant—"reciprocally," "each other," and "mutually" all express the same idea of mutual action, making it excessively wordy.'
    }
  ],

  47: [ // "adequate enough"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Adequate" means sufficient or enough—adding "enough" is redundant because adequacy already means meeting requirements sufficiently.'
    },
    {
      letter: 'B',
      text: 'adequate',
      explanation: '"Adequate" alone precisely means sufficient—it already conveys that something is enough to meet needs, making "enough" unnecessary duplication.'
    },
    {
      letter: 'C',
      text: 'sufficient enough',
      explanation: '"Sufficient" and "enough" are perfect synonyms—using both together creates direct redundancy since they mean exactly the same thing.'
    },
    {
      letter: 'D',
      text: 'enough and adequate',
      explanation: 'This explicitly states both synonyms with a conjunction—"enough" and "adequate" mean the same thing, making both unnecessary.'
    }
  ],

  48: [ // "exact same"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Same" means identical—"exact" is redundant because if things are the same, they are by definition exactly alike with no differences.'
    },
    {
      letter: 'B',
      text: 'same',
      explanation: '"Same" alone is precise and sufficient—it already means identical or exactly alike, making "exact" an unnecessary intensifier.'
    },
    {
      letter: 'C',
      text: 'exactly identical',
      explanation: 'This replaces one redundant phrase with another—"exactly" and "identical" together are redundant since identical already means exactly the same.'
    },
    {
      letter: 'D',
      text: 'precisely the exact same',
      explanation: 'This triples the redundancy—"precisely," "exact," and "same" all convey identical meaning, making it excessively emphatic without adding information.'
    }
  ],

  49: [ // "revert back"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Revert" means to return to a previous state—"back" is redundant because returning inherently involves going back.'
    },
    {
      letter: 'B',
      text: 'revert',
      explanation: '"Revert" alone is complete and precise—the word already means to go back or return to an earlier condition, making "back" unnecessary.'
    },
    {
      letter: 'C',
      text: 'return back',
      explanation: '"Return" has the same redundancy with "back" as "revert" does—returning inherently means going back, making "back" duplicative.'
    },
    {
      letter: 'D',
      text: 'go back and revert',
      explanation: 'This compounds redundancy—"go back" and "revert" mean the same thing, so using both creates unnecessary repetition.'
    }
  ],

  50: [ // "whether or not"
    {
      letter: 'A',
      text: 'NO CHANGE',
      explanation: '"Whether" already presents two alternatives (if something is true or not true)—adding "or not" is usually redundant unless emphasizing both possibilities equally.'
    },
    {
      letter: 'B',
      text: 'if',
      explanation: '"If" is more concise and works when introducing a conditional—it\'s appropriate here and eliminates the wordiness of "whether or not."'
    },
    {
      letter: 'C',
      text: 'whether',
      explanation: '"Whether" alone typically suffices—it inherently presents alternatives without requiring "or not," though "or not" is sometimes added for emphasis (not needed here).'
    },
    {
      letter: 'D',
      text: 'whether or not if',
      explanation: 'This combines two different conjunctions redundantly—"whether or not" and "if" both introduce conditional clauses, making one of them unnecessary.'
    }
  ]
};

async function main() {
  console.log('Updating REDUNDANCY lesson with per-choice explanations...\n');
  console.log('='.repeat(70) + '\n');

  let updated = 0;
  const positions = [5, 6, 7, 9, 10, 13, 14, 15, 16, 19, 20, 21, 23, 24, 29, 33, 34, 35, 36, 38, 39, 40, 41, 43, 44, 46, 47, 48, 49, 50];

  for (const pos of positions) {
    if (updatedChoices[pos]) {
      if (await updateQuestion(pos, updatedChoices[pos])) {
        console.log(`  ✓ Position ${pos}: Updated with per-choice explanations`);
        updated++;
      }
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\n✅ REDUNDANCY Updated! ${updated}/${positions.length} questions now have per-choice explanations.`);
  console.log('\nRe-run verify_all_questions.js to confirm all lessons pass.');
}

main();
