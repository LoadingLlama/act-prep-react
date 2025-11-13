const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Fix passage_id assignments for science questions
 * Based on the analysis:
 * - Q1-6: About molar volume/Table 1 → Passage 1 (ID 91)
 * - Q7-13: About flies/colonies → Passage 2 (ID 87)
 * - Q14-19: About electrolysis → Passage 5 (ID 89)
 * - Q20-26: About standing waves → Passage 6 (ID 90)
 * - Q27-33: Actually about molar volume → Passage 1 (ID 91) - WAIT these are currently correct!
 * - Q34-40: About plant genetics → Passage 4 (ID 92)
 */
async function fixPassageAssignments() {
  console.log('🔧 Fixing passage_id assignments...\n');

  // Get passage IDs
  const { data: passages } = await supabase
    .from('practice_test_science_passages')
    .select('id, passage_number, passage_title')
    .eq('test_number', 1)
    .order('passage_number');

  const passageMap = {};
  passages.forEach(p => {
    passageMap[p.passage_number] = p.id;
  });

  console.log('Passage ID map:', passageMap);

  // Check all questions to understand the current mapping
  const { data: allQuestions } = await supabase
    .from('practice_test_science_questions')
    .select('question_number, passage_id, question_text')
    .eq('test_number', 1)
    .order('question_number');

  console.log('\n=== ANALYZING ALL QUESTIONS ===\n');

  // Define correct mappings based on content analysis
  const correctMapping = [];

  allQuestions.forEach(q => {
    const text = q.question_text;
    let correctPassageNum = null;

    // Determine which passage this question belongs to based on content
    if (text.includes('Table 1') || text.includes('Table 2') || text.includes('molar volume') ||
        (text.includes('H₂') && !text.includes('electrolysis'))) {
      correctPassageNum = 1; // Molar Volume
    } else if (text.includes('flies') || text.includes('colonies') || text.includes('Experiment 1') ||
               text.includes('Experiment 2') || text.includes('Experiment 3') || text.includes('carnaria')) {
      correctPassageNum = 2; // Flies
    } else if (text.includes('paleowildfires') || text.includes('Mesozoic') || text.includes('burning') ||
               (text.includes('Figure 2') && text.includes('sample'))) {
      correctPassageNum = 3; // Forest Fires
    } else if (text.includes('Student 1') || text.includes('Student 2') || text.includes('Student 3') ||
               text.includes('Student 4') || text.includes('purple stem') || text.includes('green stem')) {
      correctPassageNum = 4; // Plant Genetics
    } else if (text.includes('electrolysis') || text.includes('solar cell') || text.includes('H₂ produced') ||
               text.includes('solar irradiance')) {
      correctPassageNum = 5; // Water Electrolysis
    } else if (text.includes('standing wave') || text.includes('harmonic') || text.includes('oscillator') ||
               text.includes('String X') || text.includes('String Y')) {
      correctPassageNum = 6; // Standing Waves
    }

    const correctPassageId = passageMap[correctPassageNum];
    const currentPassage = passages.find(p => p.id === q.passage_id);

    correctMapping.push({
      questionNum: q.question_number,
      currentPassageId: q.passage_id,
      correctPassageId: correctPassageId,
      correctPassageNum: correctPassageNum,
      needsUpdate: q.passage_id !== correctPassageId
    });

    if (q.passage_id !== correctPassageId) {
      console.log(`Q${q.question_number}: ${currentPassage?.passage_title} → Passage ${correctPassageNum} (${passages.find(p => p.passage_number === correctPassageNum)?.passage_title})`);
    }
  });

  const needsUpdate = correctMapping.filter(m => m.needsUpdate);
  console.log(`\n${needsUpdate.length} questions need updating\n`);

  // Update all questions that need fixing
  for (const mapping of needsUpdate) {
    const { error } = await supabase
      .from('practice_test_science_questions')
      .update({ passage_id: mapping.correctPassageId })
      .eq('test_number', 1)
      .eq('question_number', mapping.questionNum);

    if (error) {
      console.error(`❌ Error updating Q${mapping.questionNum}:`, error);
    } else {
      console.log(`✅ Updated Q${mapping.questionNum} → Passage ${mapping.correctPassageNum}`);
    }
  }

  console.log('\n✅ Done!');
}

fixPassageAssignments();
