import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import dotenv from 'dotenv';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

// Get sample lessons to analyze
async function getSampleLessons() {
  const sampleKeys = ['backsolving', 'geometry-angles', 'quadratics', 'functions', 'trigonometry'];

  for (const key of sampleKeys) {
    const { data, error } = await supabase
      .from('lessons')
      .select('lesson_key, title, content')
      .eq('lesson_key', key)
      .single();

    if (error) {
      console.error(`Error getting ${key}:`, error);
      continue;
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`LESSON: ${key}`);
    console.log('='.repeat(60));
    console.log(`Title: ${data.title}`);
    console.log(`Content length: ${data.content.length} chars`);
    console.log('\nFirst 2000 characters:');
    console.log('-'.repeat(60));
    console.log(data.content.substring(0, 2000));
    console.log('-'.repeat(60));
  }
}

getSampleLessons();
