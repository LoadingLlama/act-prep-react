import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyFixes() {
  const { data } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'functions')
    .single();

  const content = data.content;

  console.log('✅ Verification of functions lesson:\n');

  const hasGradients = content.includes('linear-gradient');
  const hasWhiteTextOnLight = content.match(/background: #[ef][0-9a-f]{5}[^}]*color: white;/);
  const hasDarkText = content.includes('color: #1f2937');
  const hasBoldBorders = content.includes('border: 3px') || content.includes('border: 2px');

  console.log('Gradients removed:', hasGradients ? '❌' : '✓');
  console.log('White text on light bg:', hasWhiteTextOnLight ? '❌' : '✓');
  console.log('Dark text added:', hasDarkText ? '✓' : '❌');
  console.log('Subtle borders (1px):', hasBoldBorders ? '❌' : '✓');

  // Show snippet
  const snippet = content.substring(content.indexOf('What is a Function'), content.indexOf('What is a Function') + 450);
  console.log('\nSample section:');
  console.log(snippet + '...\n');
}

verifyFixes();
