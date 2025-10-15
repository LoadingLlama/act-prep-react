import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`)
};

async function fixQuizReferences() {
  log.info('🔧 Fixing quiz references to use lesson_metadata\n');

  try {
    // Get all existing quizzes
    const { data: quizzes, error: quizzesError } = await supabase
      .from('quizzes')
      .select('id, lesson_id, title');

    if (quizzesError) throw quizzesError;

    log.info(`Found ${quizzes.length} existing quizzes\n`);

    // Since we can't update them easily, let's check what's in lesson_metadata
    const { data: lessons, error: lessonsError } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title, subject')
      .eq('subject', 'english');

    if (lessonsError) throw lessonsError;

    log.success(`Found ${lessons.length} English lessons in lesson_metadata:`);
    lessons.forEach(l => {
      console.log(`  - ${l.lesson_key}: ${l.id}`);
    });

    log.info('\n📝 To fix this, you need to:');
    log.info('1. Drop the foreign key constraint temporarily');
    log.info('2. Update quiz lesson_ids to match lesson_metadata');
    log.info('3. Re-add the constraint\n');

    log.info('Or create new quizzes with correct lesson_ids\n');

  } catch (error) {
    log.error(`Error: ${error.message}`);
    console.error(error);
  }
}

fixQuizReferences();
