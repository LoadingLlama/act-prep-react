/**
 * Check Quiz Details
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkQuiz() {
  console.log('🔍 Fetching a sample quiz...\\n');

  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  console.log('Sample quiz data:');
  console.log(JSON.stringify(data, null, 2));

  // Save to file
  const outputPath = resolve(__dirname, '../SAMPLE_QUIZ.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\\n💾 Saved to: ${outputPath}`);
}

checkQuiz();
