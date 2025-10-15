import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function get() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'inequalities')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(data.content);
}

get();
