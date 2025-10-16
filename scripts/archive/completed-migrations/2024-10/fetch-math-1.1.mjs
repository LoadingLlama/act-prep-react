import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'absolute-value')
  .single();

if (data && data.content) {
  writeFileSync('/tmp/math-1.1-example.html', data.content);
  console.log('Math 1.1 saved to /tmp/math-1.1-example.html');
  console.log('Content length:', data.content.length);
} else {
  console.log('Could not fetch math 1.1 lesson');
}