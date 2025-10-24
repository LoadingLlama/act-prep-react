#!/usr/bin/env node

/**
 * FIX ALL TEST 1 ANSWERS
 * Update database with 100% verified official answers from answer key images
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING ALL TEST 1 ANSWERS WITH OFFICIAL ANSWER KEY\n');
console.log('='.repeat(70));

// Official answer keys from the images provided
const officialEnglish = {
  1:'C', 2:'G', 3:'A', 4:'J', 5:'A', 6:'F', 7:'C', 8:'F', 9:'C', 10:'J',
  11:'B', 12:'F', 13:'B', 14:'J', 15:'D', 16:'G', 17:'A', 18:'G', 19:'D', 20:'G',
  21:'A', 22:'J', 23:'C', 24:'F', 25:'D', 26:'H', 27:'C', 28:'G', 29:'D', 30:'G',
  31:'D', 32:'G', 33:'B', 34:'F', 35:'A', 36:'G', 37:'A', 38:'F', 39:'C', 40:'J',
  41:'D', 42:'G', 43:'C', 44:'J', 45:'B', 46:'J', 47:'A', 48:'H', 49:'D', 50:'J',
  51:'A', 52:'H', 53:'A', 54:'J', 55:'B', 56:'F', 57:'C', 58:'G', 59:'C', 60:'J',
  61:'A', 62:'H', 63:'A', 64:'G', 65:'C', 66:'J', 67:'D', 68:'H', 69:'D', 70:'G',
  71:'C', 72:'H', 73:'D', 74:'F', 75:'B'
};

const officialMath = {
  1:'C', 2:'H', 3:'E', 4:'H', 5:'E', 6:'G', 7:'E', 8:'F', 9:'C', 10:'H',
  11:'B', 12:'J', 13:'B', 14:'G', 15:'B', 16:'F', 17:'B', 18:'K', 19:'D', 20:'G',
  21:'A', 22:'G', 23:'C', 24:'G', 25:'C', 26:'F', 27:'C', 28:'H', 29:'D', 30:'J',
  31:'D', 32:'F', 33:'B', 34:'H', 35:'B', 36:'J', 37:'E', 38:'H', 39:'A', 40:'H',
  41:'C', 42:'G', 43:'A', 44:'J', 45:'D', 46:'J', 47:'B', 48:'H', 49:'A', 50:'F',
  51:'B', 52:'F', 53:'A', 54:'K', 55:'A', 56:'J', 57:'C', 58:'F', 59:'A', 60:'J'
};

const officialReading = {
  1:'C', 2:'F', 3:'B', 4:'H', 5:'A', 6:'J', 7:'B', 8:'J', 9:'D', 10:'G',
  11:'C', 12:'F', 13:'B', 14:'H', 15:'A', 16:'H', 17:'B', 18:'J', 19:'A', 20:'F',
  21:'B', 22:'G', 23:'D', 24:'G', 25:'D', 26:'H', 27:'C', 28:'G', 29:'A', 30:'G',
  31:'A', 32:'H', 33:'C', 34:'F', 35:'A', 36:'J', 37:'C', 38:'G', 39:'D', 40:'J'
};

const officialScience = {
  1:'B', 2:'G', 3:'B', 4:'F', 5:'D', 6:'J', 7:'B', 8:'J', 9:'A', 10:'G',
  11:'A', 12:'F', 13:'B', 14:'F', 15:'C', 16:'G', 17:'C', 18:'F', 19:'B', 20:'G',
  21:'A', 22:'F', 23:'D', 24:'H', 25:'D', 26:'J', 27:'B', 28:'H', 29:'B', 30:'F',
  31:'C', 32:'J', 33:'D', 34:'H', 35:'C', 36:'G', 37:'D', 38:'H', 39:'D', 40:'H'
};

async function updateSection(tableName, officialAnswers, sectionName) {
  console.log(`\n📝 Updating ${sectionName} section...`);

  let updatedCount = 0;
  let errorCount = 0;

  for (const [qNum, correctAnswer] of Object.entries(officialAnswers)) {
    const { error } = await supabase
      .from(tableName)
      .update({ correct_answer: correctAnswer })
      .eq('test_number', 1)
      .eq('question_number', parseInt(qNum));

    if (error) {
      console.error(`   ❌ Error updating Q${qNum}: ${error.message}`);
      errorCount++;
    } else {
      updatedCount++;
      if (updatedCount % 15 === 0) {
        console.log(`   ✅ Updated ${updatedCount}/${Object.keys(officialAnswers).length} questions...`);
      }
    }
  }

  console.log(`   ✅ ${sectionName}: ${updatedCount}/${Object.keys(officialAnswers).length} updated successfully`);
  if (errorCount > 0) {
    console.log(`   ⚠️  ${errorCount} errors occurred`);
  }

  return { updatedCount, errorCount };
}

// Update all sections
const englishResults = await updateSection('act_english_questions', officialEnglish, 'ENGLISH');
const mathResults = await updateSection('act_math_questions', officialMath, 'MATH');
const readingResults = await updateSection('act_reading_questions', officialReading, 'READING');
const scienceResults = await updateSection('act_science_questions', officialScience, 'SCIENCE');

// Summary
console.log('\n' + '='.repeat(70));
console.log('FINAL UPDATE SUMMARY');
console.log('='.repeat(70));

const totalUpdated = englishResults.updatedCount + mathResults.updatedCount +
                     readingResults.updatedCount + scienceResults.updatedCount;
const totalErrors = englishResults.errorCount + mathResults.errorCount +
                    readingResults.errorCount + scienceResults.errorCount;

console.log(`\n✅ Total Updated: ${totalUpdated}/215`);
console.log(`❌ Total Errors:  ${totalErrors}`);

if (totalErrors === 0 && totalUpdated === 215) {
  console.log('\n🎉🎉🎉 ALL 215 ANSWERS UPDATED SUCCESSFULLY! 🎉🎉🎉');
  console.log('\n📊 Database now contains 100% verified official answers!');
  console.log('\n🔍 Run verify-test1-answers.mjs to confirm all answers are correct.\n');
} else {
  console.log('\n⚠️  Some updates failed. Please review errors above.\n');
}
