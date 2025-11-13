const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Manually place images in logical locations based on passage structure
 */
async function manualImagePlacement() {
  console.log('🔧 Manual image placement...\n');

  const placements = {
    // Passage 1: Molar Volume of Gases (2 images: Table 1, Table 2)
    1: [
      {
        searchAfter: '<i><i>Table 1</i></i>',
        findPattern: /pressure, in atmospheres \(atm\), at a temperature of 273 kelvins \(K\)\./,
        imageNum: 1,
        description: 'After Table 1 description'
      },
      {
        searchAfter: '<i><i>Table 2</i></i>',
        findPattern: /shows how the molar volume of each of the 6 gases varies with temperature at a pressure of 1\.00 atm\./,
        imageNum: 2,
        description: 'After Table 2 description'
      }
    ],

    // Passage 2: Flies as Bacterial Vectors (3 images: Figure 1, 2, 3)
    2: [
      {
        searchAfter: '<i><i>Figure 1</i></i>',
        findPattern: /The results are shown in <i><i>Figure 1<\/i><\/i>\./,
        imageNum: 1,
        description: 'After Figure 1 reference'
      },
      {
        searchAfter: '<i><i>Figure 2</i></i>',
        findPattern: /The results are shown in <i><i>Figure 2<\/i><\/i>\./,
        imageNum: 2,
        description: 'After Figure 2 reference'
      },
      {
        searchAfter: '<i><i>Figure 3</i></i>',
        findPattern: /The results are shown in <i><i>Figure 3<\/i><\/i>\./,
        imageNum: 3,
        description: 'After Figure 3 reference'
      }
    ],

    // Passage 3: Forest Fires and Oxygen Levels (2 images: Figure 1 twice)
    3: [
      {
        searchAfter: 'Forest fires require oxygen',
        findPattern: /each 10-million-year interval of the <i>Mesozoic era<\/i> \(250-65 million years ago, mya\)\./,
        imageNum: 1,
        description: 'After first Figure 1 description'
      },
      {
        searchAfter: '<i><i>Figure 1</i></i>also shows',
        findPattern: /in Earth's atmosphere from 250 mya to 70 mya\./,
        imageNum: 2,
        description: 'After second Figure 1 description'
      }
    ],

    // Passage 5: Water Electrolysis (3 images: Figure 1, Figure 2, Table 1)
    5: [
      {
        searchAfter: '(<i>Figure 1</i>',
        findPattern: /\(<i>Figure 1<\/i> shows the apparatus at the initiation of electrolysis\.\)/,
        imageNum: 1,
        description: 'After Figure 1 parenthetical'
      },
      {
        searchAfter: '<i>Figure 2</i>',
        findPattern: /<i>Figure 2<\/i> shows the total volume of H₂ produced \(in L\) in each month of the experiment\./,
        imageNum: 2,
        description: 'After Figure 2 description'
      },
      {
        searchAfter: '<i>Table 1</i>',
        findPattern: /in watts per square meter \(W\/m²\), at the location of the solar cell during each month of the experiment\./,
        imageNum: 3,
        description: 'After Table 1 description'
      }
    ],

    // Passage 6: Standing Waves (2 images: Figure 1, Table 2)
    6: [
      {
        searchAfter: '<i>Figure 1</i>',
        findPattern: /<i>Figure 1<\/i> illustrates a harmonic and also the apparatus that a student used to perform 2 experiments on standing waves\./,
        imageNum: 1,
        description: 'After Figure 1 description'
      },
      {
        searchAfter: 'See Table 2',
        findPattern: /See Table 2\./,
        imageNum: 2,
        description: 'After Table 2 reference'
      }
    ]
  };

  const { data: passages, error } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 1);

  if (error) {
    console.error('Error:', error);
    return;
  }

  for (const passage of passages) {
    const passageNum = passage.passage_number;

    if (!placements[passageNum]) {
      console.log(`\nPassage ${passageNum}: No images`);
      continue;
    }

    console.log(`\n=== Passage ${passageNum}: ${passage.passage_title} ===`);

    let text = passage.passage_text;

    // Remove all existing placeholders
    text = text.replace(/\n*\{\{image\d+\}\}\n*/g, '');

    // Apply placements in reverse order to maintain positions
    const reversedPlacements = [...placements[passageNum]].reverse();

    for (const placement of reversedPlacements) {
      const match = text.match(placement.findPattern);

      if (match) {
        const insertPos = match.index + match[0].length;
        text = text.substring(0, insertPos) + `\n\n{{image${placement.imageNum}}}\n\n` + text.substring(insertPos);
        console.log(`  ✓ Placed {{image${placement.imageNum}}}: ${placement.description}`);
      } else {
        console.log(`  ✗ Could not find pattern for {{image${placement.imageNum}}}: ${placement.description}`);
      }
    }

    // Clean up excessive newlines
    text = text.replace(/\n{4,}/g, '\n\n');

    // Update passage
    const { error: updateError } = await supabase
      .from('practice_test_science_passages')
      .update({ passage_text: text })
      .eq('id', passage.id);

    if (updateError) {
      console.error(`  ❌ Error:`, updateError);
    } else {
      console.log(`  ✅ Updated`);
    }
  }

  console.log('\n✅ Done!');
}

manualImagePlacement();
