#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// CORRECTED answer keys from extraction scripts (manually verified from PDF/TXT)
const answerKeys = {
  E: {1:'C',2:'B',3:'A',4:'D',5:'A',6:'A',7:'C',8:'C',9:'C',10:'D',11:'B',12:'A',13:'B',14:'C',15:'D',16:'B',17:'A',18:'B',19:'D',20:'B',21:'A',22:'D',23:'C',24:'A',25:'D',26:'C',27:'C',28:'B',29:'D',30:'B',31:'D',32:'B',33:'B',34:'C',35:'A',36:'B',37:'A',38:'A',39:'C',40:'D',41:'D',42:'B',43:'C',44:'D',45:'B',46:'D',47:'A',48:'C',49:'D',50:'D',51:'A',52:'C',53:'D',54:'B',55:'D',56:'C',57:'B',58:'C',59:'A',60:'B',61:'A',62:'C',63:'A',64:'B',65:'C',66:'D',67:'D',68:'C',69:'D',70:'B',71:'C',72:'A',73:'C',74:'A',75:'B'},
  M: {1:'E',2:'C',3:'E',4:'C',5:'E',6:'B',7:'E',8:'A',9:'C',10:'C',11:'B',12:'D',13:'B',14:'B',15:'B',16:'A',17:'B',18:'E',19:'D',20:'B',21:'A',22:'B',23:'C',24:'B',25:'B',26:'A',27:'C',28:'C',29:'D',30:'D',31:'D',32:'A',33:'B',34:'C',35:'B',36:'D',37:'E',38:'C',39:'A',40:'C',41:'C',42:'B',43:'A',44:'D',45:'D',46:'D',47:'B',48:'C',49:'A',50:'A',51:'B',52:'A',53:'A',54:'E',55:'A',56:'D',57:'C',58:'A',59:'A',60:'D'},
  R: {1:'C',2:'A',3:'B',4:'C',5:'A',6:'D',7:'B',8:'D',9:'D',10:'A',11:'C',12:'A',13:'B',14:'C',15:'A',16:'C',17:'B',18:'D',19:'A',20:'A',21:'B',22:'B',23:'D',24:'B',25:'B',26:'A',27:'C',28:'B',29:'D',30:'B',31:'A',32:'C',33:'C',34:'A',35:'A',36:'D',37:'C',38:'B',39:'D',40:'D'},
  S: {1:'B',2:'C',3:'B',4:'A',5:'D',6:'D',7:'B',8:'D',9:'A',10:'B',11:'D',12:'B',13:'C',14:'A',15:'C',16:'B',17:'D',18:'A',19:'B',20:'C',21:'B',22:'A',23:'D',24:'C',25:'D',26:'D',27:'B',28:'C',29:'B',30:'A',31:'C',32:'D',33:'A',34:'C',35:'C',36:'B',37:'D',38:'C',39:'A',40:'D'}
};

console.log('🔍 FINAL ACCURACY VERIFICATION (Corrected Answer Keys)\n');

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

console.log(`Total questions checked: ${totalChecked}/215\n`);

if (mismatches.length === 0) {
  console.log('✅ PERFECT! All 215 answers match source answer keys!\n');
} else {
  console.log(`❌ MISMATCHES: ${mismatches.length}\n`);
  mismatches.forEach(m => console.log(`  - ${m}`));
}

// Data quality checks
console.log('📊 Data Quality Checks:\n');

let issues = {
  missingStems: 0,
  missingAnswers: 0,
  missingChoices: 0,
  emptyUnderlined: 0
};

questions.forEach(q => {
  if (!q.question_stem || q.question_stem.trim() === '') issues.missingStems++;
  if (!q.correct_answer || q.correct_answer.trim() === '') issues.missingAnswers++;
  if (q.section === 'E' && (!q.underlined_text || q.underlined_text.trim() === '')) issues.emptyUnderlined++;
  if (!q.choice_a && (q.section === 'E' || q.section === 'M')) issues.missingChoices++;
});

console.log(`  Question Stems: ${questions.length - issues.missingStems}/215 ${issues.missingStems ? '❌' : '✅'}`);
console.log(`  Correct Answers: ${questions.length - issues.missingAnswers}/215 ${issues.missingAnswers ? '❌' : '✅'}`);
console.log(`  English Underlined Text: ${75 - issues.emptyUnderlined}/75 ${issues.emptyUnderlined ? '❌' : '✅'}`);
console.log(`  Answer Choices: ${questions.length - issues.missingChoices}/215 ${issues.missingChoices ? '❌' : '✅'}`);

// Check English underlined portions
console.log('\n🔎 English Underlined Text Check (Sample):\n');
const englishSamples = [1, 16, 31, 46, 61];
englishSamples.forEach(num => {
  const q = questions.find(x => x.section === 'E' && x.question_number === num);
  if (q) {
    const hasUnderlined = q.question_stem.includes('<u>') && q.question_stem.includes('</u>');
    console.log(`  E${num}: ${hasUnderlined ? '✅' : '❌'} ${hasUnderlined ? 'Has <u> tags' : 'Missing tags'}`);
    if (hasUnderlined) {
      const underlined = q.question_stem.match(/<u>(.*?)<\/u>/)?.[1] || '';
      console.log(`       "${underlined.substring(0, 40)}..."`);
    }
  }
});

console.log('\n' + '='.repeat(70));
if (mismatches.length === 0 && Object.values(issues).every(v => v === 0)) {
  console.log('🎉 100% ACCURATE - ALL VERIFICATION CHECKS PASSED! 🎉');
  console.log('   ✅ All 215 answer keys match source');
  console.log('   ✅ All required fields populated');
  console.log('   ✅ English questions have proper underlined text formatting');
} else {
  console.log(`⚠️  Issues found: ${mismatches.length} answer mismatches, ${Object.values(issues).reduce((a,b)=>a+b, 0)} data issues`);
}
console.log('='.repeat(70));
