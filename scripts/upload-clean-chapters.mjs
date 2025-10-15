import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const chapters = [
  { key: 'sentence-structure', file: 'sentence-structure-clean.html' },
  { key: 'commas', file: 'commas-clean.html' },
  { key: 'punctuation', file: 'punctuation-clean.html' }
];

for (const chapter of chapters) {
  const htmlPath = resolve(__dirname, '../formatted-lessons/', chapter.file);
  const html = readFileSync(htmlPath, 'utf-8');

  console.log(`Uploading ${chapter.key}...`);
  console.log(`Content length: ${html.length} chars`);

  const { error } = await supabase
    .from('lessons')
    .update({ content: html })
    .eq('lesson_key', chapter.key);

  if (error) {
    console.log(`❌ Error uploading ${chapter.key}: ${error.message}`);
  } else {
    console.log(`✅ Successfully uploaded ${chapter.key}!`);
  }
}