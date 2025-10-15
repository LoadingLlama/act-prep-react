import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { data } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'inequalities')
    .single();

  fs.writeFileSync('inequalities-current.html', data.content);
  console.log('Content length:', data.content.length);
  console.log('\nFirst 500 chars:');
  console.log(data.content.substring(0, 500));
}

check();
