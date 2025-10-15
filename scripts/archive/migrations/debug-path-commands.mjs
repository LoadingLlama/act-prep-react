/**
 * DEBUG: Investigate what path commands are being flagged as invalid
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function debugPaths() {
  const { data } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'lines')
    .single();

  const svgs = data.content.match(/<svg[\s\S]*?<\/svg>/g) || [];
  const secondSVG = svgs[1]; // 2nd SVG which should have Path #1 error

  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║          DEBUGGING PATH COMMANDS                         ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  console.log('Analyzing 2nd SVG from lines lesson...\n');

  // Extract ALL d= attributes
  const regex = /\sd="([^"]*)"/g;
  let match;
  let i = 0;

  while ((match = regex.exec(secondSVG)) !== null) {
    i++;
    const d = match[1];
    const startsWithValidCommand = /^[MLHVCSQTAZ]/i.test(d.trim());

    console.log(`Path #${i}:`);
    console.log(`  d="${d}"`);
    console.log(`  Valid: ${startsWithValidCommand ? '✓' : '❌'}`);

    if (!startsWithValidCommand) {
      console.log(`  First 20 chars: "${d.trim().substring(0, 20)}"`);
      console.log(`  ERROR: Does not start with valid SVG path command`);
    }
    console.log('');
  }

  console.log(`Total d= attributes found: ${i}`);
}

debugPaths().catch(console.error);
