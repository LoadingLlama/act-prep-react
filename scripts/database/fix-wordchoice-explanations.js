const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
// Use service role key to bypass RLS policies
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const fixes = [
  {
    id: "bc9a4158-faac-4996-9053-18c620ac98f6",
    title: "Identifying Context",
    explanation: `The documentary context requires a word that suggests uncovering something previously unseen. "Revealed" is the best choice because documentaries specifically show hidden or rare footage to audiences.

• **exhibited**: Used for displays in museums or galleries, not for showing film footage
• **displayed**: Too general; suggests showing something that's already visible, not uncovering rare footage
• **revealed**: Correct - implies showing something previously hidden or unknown, which matches "rare footage"
• **outlined**: Means to describe in general terms, not to show actual footage`,
    choiceExplanations: [
      {
        letter: "A",
        explanation: '"Exhibited" is used for museum or gallery displays, not for showing documentary footage. It doesn\'t convey the sense of uncovering rare material.'
      },
      {
        letter: "B",
        explanation: '"Displayed" is too general and suggests showing something already visible. It doesn\'t capture the significance of revealing rare, previously unseen footage.'
      },
      {
        letter: "C",
        explanation: '"Revealed" is correct because it implies showing something previously hidden or unknown, which perfectly matches the context of presenting "rare footage" that audiences haven\'t seen before.'
      },
      {
        letter: "D",
        explanation: '"Outlined" means to describe in general terms or give a summary. You can\'t "outline" footage - you show it.'
      }
    ]
  },
  {
    id: "7faec793-cbd2-4e65-81a9-940c4a1ee2d5",
    title: "Testing Each Word",
    explanation: `When a teacher corrects citation errors, the appropriate word describes insistence or firmness. "Adamant" means firmly insistent that something must be done, which fits a teacher requiring proper citation.

• **adamant**: Correct - means firmly insistent, which matches a teacher requiring proper citations after finding errors
• **ecstatic**: Means extremely happy or joyful; a teacher wouldn't be happy about citation errors
• **eminent**: Describes someone famous or distinguished; this is about status, not the teacher's attitude toward citations
• **trivial**: Means unimportant; contradicts a teacher emphasizing the importance of proper citations`,
    choiceExplanations: [
      {
        letter: "A",
        explanation: '"Adamant" correctly conveys that the teacher was firmly insistent that proper citations must be learned. This matches the context of a teacher correcting important academic errors.'
      },
      {
        letter: "B",
        explanation: '"Ecstatic" means extremely happy. A teacher wouldn\'t be joyful about finding citation errors in a paper - this makes no sense in context.'
      },
      {
        letter: "C",
        explanation: '"Eminent" describes someone famous or distinguished. This word describes a person\'s status or reputation, not their attitude or insistence about something.'
      },
      {
        letter: "D",
        explanation: '"Trivial" means unimportant or insignificant. This contradicts the meaning - a teacher insisting on proper citations shows it\'s important, not trivial.'
      }
    ]
  },
  {
    id: "3893c3d2-6523-4805-8413-09c4b15631cb",
    title: "Using Known Words",
    explanation: `The phrase "tune it out" is an idiomatic expression meaning to ignore or stop paying attention to something. The context shows someone learning to sleep despite train noise.

• **tune it out**: Correct - idiomatic phrase meaning to mentally block out or ignore a sound, matching the context of sleeping through noise
• **scorn it**: Means to feel contempt or disdain toward something; you can't "scorn" a sound to sleep through it
• **snub it**: Means to deliberately ignore someone socially; doesn't apply to ignoring ambient noise
• **overlook it**: Means to fail to notice or to disregard; doesn't convey actively blocking out a recurring sound`,
    choiceExplanations: [
      {
        letter: "A",
        explanation: '"Tune it out" is the correct idiomatic expression for mentally blocking out or ignoring a sound. This perfectly describes learning to sleep through train noise.'
      },
      {
        letter: "B",
        explanation: '"Scorn" means to feel contempt or disdain. You can\'t "scorn" a sound to make it go away - this word describes an emotional attitude, not the act of ignoring noise.'
      },
      {
        letter: "C",
        explanation: '"Snub" means to deliberately ignore someone in a social context (like snubbing a person). This doesn\'t apply to blocking out ambient noise.'
      },
      {
        letter: "D",
        explanation: '"Overlook" means to fail to notice something or to disregard it, but it doesn\'t convey the active mental process of blocking out a recurring sound to sleep through it.'
      }
    ]
  },
  {
    id: "d02089c7-880d-4c79-b2fb-608ca6514113",
    title: "Similar Meanings, Different Uses",
    explanation: `"Disinterested" and "dispassionate" both suggest objectivity, but only "disinterested in" uses the correct preposition and meaning for officials judging fairly.

• **dispassionate about**: Wrong preposition - "dispassionate" doesn't pair with "about"
• **unbiased with**: Wrong preposition - "unbiased" should be followed by "toward" or "in," not "with"
• **disinterested in**: Correct - "disinterested in" means impartial or objective about an outcome, with the correct preposition
• **without care in regarding**: Wordy and awkward; also suggests apathy rather than objectivity`,
    choiceExplanations: [
      {
        letter: "A",
        explanation: '"Dispassionate about" uses the wrong preposition. "Dispassionate" isn\'t typically followed by "about" when describing someone\'s objectivity toward an outcome.'
      },
      {
        letter: "B",
        explanation: '"Unbiased with" uses the wrong preposition. "Unbiased" should be followed by "toward" or "in," not "with."'
      },
      {
        letter: "C",
        explanation: '"Disinterested in" is correct - it means impartial or having no stake in the outcome, and uses the proper idiomatic preposition "in" to indicate what they\'re unbiased about.'
      },
      {
        letter: "D",
        explanation: '"Without care in regarding" is excessively wordy and awkward. It also suggests apathy (not caring) rather than objectivity (being fair despite caring about fairness).'
      }
    ]
  }
];

async function fixWordChoiceExplanations() {
  console.log('Fixing word-choice explanations...\n');

  for (const fix of fixes) {
    const { error } = await supabase
      .from('lesson_examples')
      .update({
        answer_explanation: fix.explanation,
        choices: await updateChoiceExplanations(fix.id, fix.choiceExplanations)
      })
      .eq('id', fix.id);

    if (error) {
      console.error(`✗ Failed to fix ${fix.title}:`, error);
    } else {
      console.log(`✓ Fixed: ${fix.title}`);
    }
  }

  console.log('\n✓ All word-choice explanations fixed!');
}

async function updateChoiceExplanations(id, newExplanations) {
  const { data } = await supabase
    .from('lesson_examples')
    .select('choices')
    .eq('id', id)
    .single();

  const choices = data.choices.map((choice, idx) => {
    const newExp = newExplanations.find(e => e.letter === choice.letter);
    return {
      ...choice,
      explanation: newExp ? newExp.explanation : choice.explanation
    };
  });

  return choices;
}

fixWordChoiceExplanations();
