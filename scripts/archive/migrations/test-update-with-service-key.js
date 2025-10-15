const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Try with service role key to bypass RLS
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

console.log('Using service role key:', Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY));

async function main() {
  const testContent = '<p style="font-size: 16px;">TEST UPDATE ' + Date.now() + '</p>';

  console.log('Attempting update with service key...');

  const { error, status } = await supabase
    .from('lessons')
    .update({
      content: testContent,
      updated_at: new Date().toISOString()
    })
    .eq('id', 'b699563d-216b-477f-aa3f-fe7b6f6afd80');

  console.log('Status:', status);
  console.log('Error:', error);

  // Verify
  const { data } = await supabase
    .from('lessons')
    .select('content, updated_at')
    .eq('id', 'b699563d-216b-477f-aa3f-fe7b6f6afd80')
    .single();

  console.log('\nVerification:');
  console.log('Content:', data.content.substring(0, 150));
  console.log('Updated at:', data.updated_at);
  console.log('\nDid it work?', data.content.includes('TEST UPDATE'));

  process.exit(0);
}

main();
