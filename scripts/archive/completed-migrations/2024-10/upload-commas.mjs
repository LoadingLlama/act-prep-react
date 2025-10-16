import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessonKey = 'commas';
const htmlPath = resolve(__dirname, '../formatted-lessons/commas.html');

const html = readFileSync(htmlPath, 'utf-8');

console.log(`Uploading ${lessonKey}...`);
console.log(`Content length: ${html.length} chars`);

const { error } = await supabase
  .from('lessons')
  .update({ content: html })
  .eq('lesson_key', lessonKey);

if (error) {
  console.log(`❌ Error: ${error.message}`);
} else {
  console.log(`✅ Successfully uploaded ${lessonKey}!`);
}