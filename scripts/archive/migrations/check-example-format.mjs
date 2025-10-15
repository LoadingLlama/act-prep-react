import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'geometry-angles')
  .single();

const parsed = JSON.parse(data.content);
console.log('Content type:', typeof data.content);
console.log('Parsed is array:', Array.isArray(parsed));

if (Array.isArray(parsed)) {
  const example = parsed.find(s => s.type === 'example');
  if (example) {
    console.log('\nFirst 800 chars of example:');
    console.log(example.content.substring(0, 800));
  }
}
