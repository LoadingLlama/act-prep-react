import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 MANUALLY ADDING 6 REMAINING UNDERLINED PORTIONS\n');
console.log('='.repeat(80));

// Get passages
const { data: passages } = await sb
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .in('passage_number', [2, 3])
  .order('passage_number');

console.log(`\nFound ${passages.length} passages to update\n`);

// Passage 2 - Questions 16, 20, 23, 24, 27
// Passage 3 - Question 42

const updates = [
  {
    passageNumber: 2,
    questionNumber: 16,
    subscript: 1,
    findText: "Katherine Johnson's precise mathematical calculations",
    replaceWith: "Katherine <u>Johnson's</u><sub>1</sub> precise mathematical calculations"
  },
  {
    passageNumber: 2,
    questionNumber: 20,
    subscript: 5,
    findText: "earning prestigious degrees in both mathematics and French",
    replaceWith: "earning prestigious degrees in both <u>mathematics and French</u><sub>5</sub>"
  },
  {
    passageNumber: 2,
    questionNumber: 23,
    subscript: 8,
    findText: 'human "computers" —mostly women— performed',
    replaceWith: 'human "<u>computers" —mostly women—</u><sub>8</sub> performed'
  },
  {
    passageNumber: 2,
    questionNumber: 24,
    subscript: 9,
    findText: "Her computational skills proved indispensable",
    replaceWith: "Her computational skills proved <u>indispensable</u><sub>9</sub>"
  },
  {
    passageNumber: 2,
    questionNumber: 27,
    subscript: 12,
    findText: "verify the electronic computer's calculations",
    replaceWith: "verify the electronic <u>computer's</u><sub>12</sub> calculations"
  },
  {
    passageNumber: 3,
    questionNumber: 42,
    subscript: 12,
    findText: "a community center hosting farmers markets, concerts, and art exhibitions",
    replaceWith: "a community center hosting <u>farmers markets, concerts, and art exhibitions</u><sub>12</sub>"
  }
];

for (const update of updates) {
  const passage = passages.find(p => p.passage_number === update.passageNumber);

  if (!passage) {
    console.log(`❌ Could not find passage ${update.passageNumber}`);
    continue;
  }

  console.log(`\nQ${update.questionNumber} (Passage ${update.passageNumber}, subscript ${update.subscript}):`);
  console.log(`  Looking for: "${update.findText.substring(0, 50)}..."`);

  if (passage.passage_text.includes(update.findText)) {
    const updatedText = passage.passage_text.replace(update.findText, update.replaceWith);

    console.log(`  ✓ Found and replacing`);

    const { error } = await sb
      .from('practice_test_english_passages')
      .update({ passage_text: updatedText })
      .eq('id', passage.id);

    if (error) {
      console.log(`  ❌ Error updating: ${error.message}`);
    } else {
      console.log(`  ✅ Successfully updated`);
      // Update local copy for next iteration
      passage.passage_text = updatedText;
    }
  } else {
    console.log(`  ⚠️  Text not found exactly - checking variations...`);

    // Try to find it with slight variations
    const variations = [
      update.findText.replace(/'/g, "'"),
      update.findText.replace(/"/g, '"').replace(/"/g, '"'),
      update.findText.replace(/—/g, '–'),
      update.findText.replace(/—/g, '-')
    ];

    let found = false;
    for (const variant of variations) {
      if (passage.passage_text.includes(variant)) {
        const updatedText = passage.passage_text.replace(variant, update.replaceWith);
        console.log(`  ✓ Found variant and replacing`);

        const { error } = await sb
          .from('practice_test_english_passages')
          .update({ passage_text: updatedText })
          .eq('id', passage.id);

        if (error) {
          console.log(`  ❌ Error updating: ${error.message}`);
        } else {
          console.log(`  ✅ Successfully updated`);
          passage.passage_text = updatedText;
          found = true;
          break;
        }
      }
    }

    if (!found) {
      console.log(`  ❌ Could not find any variation`);
      console.log(`  First 200 chars of passage:`);
      console.log(`  ${passage.passage_text.substring(0, 200)}`);
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log('✅ COMPLETE! All remaining underlines added manually.');
console.log('='.repeat(80));
