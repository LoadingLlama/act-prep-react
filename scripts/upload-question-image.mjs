/**
 * Upload an image for a specific math/science question or science passage
 *
 * For questions:
 *   node scripts/upload-question-image.mjs <section> <test_number> <question_number> <image_path>
 *   Example: node scripts/upload-question-image.mjs math 1 15 ./diagram.png
 *
 * For science passages:
 *   node scripts/upload-question-image.mjs science-passage <test_number> <passage_number> <image_path>
 *   Example: node scripts/upload-question-image.mjs science-passage 1 3 ./experiment-diagram.png
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { basename } from 'path';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function uploadQuestionImage(section, testNumber, questionOrPassageNumber, imagePath) {
  console.log(`📤 Uploading image for ${section} Test ${testNumber}...\n`);

  try {
    // Validate section
    const isPassage = section === 'science-passage';
    const baseSection = isPassage ? 'science' : section;

    if (!['math', 'science', 'science-passage'].includes(section)) {
      throw new Error('Section must be "math", "science", or "science-passage"');
    }

    const tableName = isPassage
      ? 'practice_test_science_passages'
      : `practice_test_${baseSection}_questions`;

    // Read the image file
    const imageFile = readFileSync(imagePath);
    const fileName = basename(imagePath);
    const fileExt = fileName.split('.').pop();

    // Create a unique file path in storage
    const storagePath = isPassage
      ? `science-passages/test${testNumber}/passage${questionOrPassageNumber}_${Date.now()}.${fileExt}`
      : `${baseSection}-questions/test${testNumber}/q${questionOrPassageNumber}_${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    console.log('📁 Uploading to Supabase Storage...');
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('test-images')
      .upload(storagePath, imageFile, {
        contentType: `image/${fileExt}`,
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('test-images')
      .getPublicUrl(storagePath);

    console.log('✅ Image uploaded successfully!');
    console.log('🔗 Public URL:', publicUrl);

    // Update the question or passage record
    console.log(`\n📝 Updating ${isPassage ? 'passage' : 'question'} record...`);
    const updateQuery = supabase
      .from(tableName)
      .update({ image_url: publicUrl })
      .eq('test_number', parseInt(testNumber));

    if (isPassage) {
      updateQuery.eq('passage_number', parseInt(questionOrPassageNumber));
    } else {
      updateQuery.eq('question_number', parseInt(questionOrPassageNumber));
    }

    const { error: updateError } = await updateQuery;

    if (updateError) {
      throw new Error(`Failed to update ${isPassage ? 'passage' : 'question'}: ${updateError.message}`);
    }

    console.log(`✅ ${isPassage ? 'Passage' : 'Question'} updated with image URL!`);
    console.log(`\n🎉 Complete! The image will now show up when this ${isPassage ? 'passage' : 'question'} is displayed in the test.`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('Bucket not found')) {
      console.log('\n📦 You need to create the "test-images" storage bucket first:');
      console.log('1. Go to Supabase Dashboard > Storage');
      console.log('2. Create a new bucket called "test-images"');
      console.log('3. Make it public');
      console.log('4. Run this script again');
    }
  }
}

// Get command line arguments
const [,, section, testNumber, questionOrPassageNumber, imagePath] = process.argv;

if (!section || !testNumber || !questionOrPassageNumber || !imagePath) {
  console.log('Usage:');
  console.log('  For questions: node scripts/upload-question-image.mjs <section> <test_number> <question_number> <image_path>');
  console.log('  For passages:  node scripts/upload-question-image.mjs science-passage <test_number> <passage_number> <image_path>');
  console.log('\nExamples:');
  console.log('  node scripts/upload-question-image.mjs math 1 15 ./diagram.png');
  console.log('  node scripts/upload-question-image.mjs science-passage 1 3 ./experiment-setup.png');
  process.exit(1);
}

uploadQuestionImage(section, testNumber, questionOrPassageNumber, imagePath);
