/**
 * Check Example 2 SVG - See the arcs
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkExample2SVG() {
  console.log('🔍 Checking Example 2 SVG...\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  // Extract Example 2
  const ex2Match = content.match(/<h4[^>]*>Example 2<\/h4>([\s\S]*?)(?=<h4[^>]*>Example 3|$)/);

  if (!ex2Match) {
    console.log('❌ Example 2 not found');
    return;
  }

  // Extract SVG
  const svgMatch = ex2Match[1].match(/<svg[\s\S]*?<\/svg>/);

  if (!svgMatch) {
    console.log('❌ No SVG in Example 2');
    return;
  }

  const svg = svgMatch[0];
  console.log('📐 Example 2 SVG:\n');
  console.log('='.repeat(70));
  console.log(svg);
  console.log('='.repeat(70));
  console.log('\n');

  // Count arcs (path elements)
  const paths = svg.match(/<path/g) || [];
  console.log(`Arc count: ${paths.length} <path> elements\n`);

  // Extract each path
  const pathMatches = [...svg.matchAll(/<path[^>]*>/g)];
  console.log('Individual arcs:');
  pathMatches.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p[0]}`);
  });
}

checkExample2SVG();
