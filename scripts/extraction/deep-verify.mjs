#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Source answer keys (normalized)
const answerKeys = {
  E: {1:'C',2:'B',3:'A',4:'D',5:'A',6:'A',7:'C',8:'C',9:'C',10:'D',11:'B',12:'A',13:'B',14:'C',15:'D',16:'B',17:'A',18:'B',19:'D',20:'B',21:'A',22:'D',23:'C',24:'A',25:'D',26:'C',27:'C',28:'B',29:'D',30:'B',31:'D',32:'B',33:'B',34:'C',35:'A',36:'B',37:'A',38:'A',39:'C',40:'D',41:'D',42:'B',43:'C',44:'D',45:'B',46:'D',47:'A',48:'C',49:'D',50:'D',51:'A',52:'C',53:'D',54:'B',55:'C',56:'A',57:'C',58:'A',59:'B',60:'B',61:'D',62:'C',63:'A',64:'B',65:'C',66:'D',67:'D',68:'C',69:'D',70:'B',71:'C',72:'A',73:'C',74:'A',75:'B'},
  M: {1:'E',2:'C',3:'E',4:'C',5:'E',6:'B',7:'E',8:'A',9:'C',10:'C',11:'B',12:'D',13:'B',14:'B',15:'B',16:'A',17:'B',18:'E',19:'D',20:'B',21:'A',22:'B',23:'C',24:'B',25:'B',26:'A',27:'C',28:'C',29:'D',30:'D',31:'D',32:'A',33:'B',34:'C',35:'B',36:'D',37:'E',38:'C',39:'A',40:'C',41:'C',42:'B',43:'A',44:'D',45:'D',46:'D',47:'B',48:'C',49:'A',50:'A',51:'B',52:'A',53:'A',54:'E',55:'A',56:'D',57:'C',58:'A',59:'A',60:'D'},
  R: {1:'C',2:'A',3:'B',4:'C',5:'A',6:'D',7:'B',8:'D',9:'D',10:'A',11:'C',12:'A',13:'B',14:'C',15:'A',16:'C',17:'B',18:'D',19:'A',20:'A',21:'B',22:'B',23:'D',24:'B',25:'B',26:'A',27:'C',28:'B',29:'D',30:'B',31:'A',32:'C',33:'C',34:'A',35:'A',36:'D',37:'C',38:'B',39:'D',40:'D'},
  S: {1:'B',2:'C',3:'B',4:'A',5:'D',6:'D',7:'B',8:'D',9:'A',10:'B',11:'D',12:'B',13:'C',14:'A',15:'C',16:'B',17:'D',18:'A',19:'B',20:'C',21:'B',22:'A',23:'D',24:'C',25:'D',26:'D',27:'B',28:'C',29:'B',30:'A',31:'C',32:'D',33:'A',34:'C',35:'C',36:'B',37:'D',38:'C',39:'A',40:'D'}
};

console.log('🔍 DEEP VERIFICATION - Checking Database vs Source Answer Keys\n');

const { data: questions, error } = await supabase
  .from('act_questions')
  .select('*')
  .eq('test_number', 1)
  .order('section')
  .order('question_number');

if (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}

let mismatches = [];
let totalChecked = 0;

for (const q of questions) {
  totalChecked++;
  const expectedAnswer = answerKeys[q.section]?.[q.question_number];

  if (!expectedAnswer) {
    mismatches.push(`${q.section}${q.question_number}: No source answer key found`);
    continue;
  }

  if (q.correct_answer !== expectedAnswer) {
    mismatches.push(`${q.section}${q.question_number}: DB has "${q.correct_answer}" but should be "${expectedAnswer}"`);
  }
}

console.log(`Checked: ${totalChecked} questions\n`);

if (mismatches.length === 0) {
  console.log('✅ PERFECT MATCH! All answers match source answer keys!\n');
} else {
  console.log(`❌ MISMATCHES FOUND: ${mismatches.length}\n`);
  mismatches.forEach(m => console.log(`  - ${m}`));
  console.log('');
}

// Spot check specific questions
console.log('📋 Spot Checking Key Questions:\n');

const spotChecks = [
  {section: 'E', num: 1, expectedStem: 'There are thousands of new animal species'},
  {section: 'E', num: 16, expectedStem: 'in effect, helping'},
  {section: 'M', num: 1, expectedStem: 'f(x,y) = 3x'},
  {section: 'R', num: 1, expectedStem: 'perspective of a narrator'},
  {section: 'S', num: 1, expectedStem: 'absolute value'}
];

for (const check of spotChecks) {
  const q = questions.find(x => x.section === check.section && x.question_number === check.num);
  if (q) {
    const stemMatch = q.question_stem.includes(check.expectedStem);
    const answerMatch = q.correct_answer === answerKeys[check.section][check.num];
    console.log(`  ${check.section}${check.num}: ${stemMatch && answerMatch ? '✅' : '❌'}`);
    console.log(`    Stem: ${q.question_stem.substring(0, 60)}...`);
    console.log(`    Answer: ${q.correct_answer} (expected: ${answerKeys[check.section][check.num]})`);
  }
}

console.log('\n' + '='.repeat(70));
if (mismatches.length === 0) {
  console.log('🎉 VERIFICATION COMPLETE - 100% ACCURATE! 🎉');
} else {
  console.log(`⚠️  VERIFICATION COMPLETE - ${mismatches.length} ISSUES NEED FIXING`);
}
console.log('='.repeat(70));
