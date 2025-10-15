import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: lessons } = await supabase
  .from('lessons')
  .select('*')
  .eq('subject', 'math')
  .order('order_index');

// Find Matrices lesson
const matrices = lessons.find(l => l.title === 'Matrices');

console.log('='.repeat(70));
console.log('MATRICES LESSON (66 words)');
console.log('='.repeat(70));
console.log(matrices.content);
console.log('='.repeat(70));
