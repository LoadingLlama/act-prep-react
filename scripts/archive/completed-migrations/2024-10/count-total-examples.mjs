import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function countExamples() {
  const { data, error } = await supabase
    .from('examples')
    .select('id', { count: 'exact' });

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`Total examples in database: ${data.length}`);
}

countExamples();
