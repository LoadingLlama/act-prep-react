/**
 * Check Teaching Diagrams - See what's currently there
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTeachingDiagrams() {
  console.log('🔍 Checking teaching diagrams...\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  // Find Rule 1
  console.log('📝 Rule 1: Vertical Angles\n');
  const rule1Match = content.match(/<h4[^>]*>Rule 1: Vertical Angles Are Equal<\/h4>([\s\S]*?)(?=<h4|$)/);
  if (rule1Match) {
    const rule1Content = rule1Match[1];
    const hasSVG = rule1Content.includes('<svg');
    console.log(`  Has diagram: ${hasSVG ? '✅' : '❌'}`);
    if (hasSVG) {
      const svgMatch = rule1Content.match(/<svg[\s\S]*?<\/svg>/);
      if (svgMatch) {
        const pathCount = (svgMatch[0].match(/<path/g) || []).length;
        console.log(`  Arc count: ${pathCount}`);
      }
    }
  } else {
    console.log('  ❌ Not found');
  }

  // Find Rule 2
  console.log('\n📝 Rule 2: Adjacent Angles\n');
  const rule2Match = content.match(/<h4[^>]*>Rule 2: Adjacent Angles Sum to 180°<\/h4>([\s\S]*?)(?=<h4|$)/);
  if (rule2Match) {
    const rule2Content = rule2Match[1];
    const hasSVG = rule2Content.includes('<svg');
    console.log(`  Has diagram: ${hasSVG ? '✅' : '❌'}`);
    if (hasSVG) {
      const svgMatch = rule2Content.match(/<svg[\s\S]*?<\/svg>/);
      if (svgMatch) {
        const pathCount = (svgMatch[0].match(/<path/g) || []).length;
        console.log(`  Arc count: ${pathCount}`);
      }
    }
  } else {
    console.log('  ❌ Not found');
  }

  // Find Rule 4 (or Rule 3 - parallel lines)
  console.log('\n📝 Rule 3/4: Parallel Lines\n');
  const rule3Match = content.match(/<h4[^>]*>Rule [34]:[^<]*Parallel Lines[^<]*<\/h4>([\s\S]*?)(?=<h4|$)/);
  if (rule3Match) {
    const rule3Content = rule3Match[1];
    const hasSVG = rule3Content.includes('<svg');
    console.log(`  Has diagram: ${hasSVG ? '✅' : '❌'}`);
    if (hasSVG) {
      const svgMatch = rule3Content.match(/<svg[\s\S]*?<\/svg>/);
      if (svgMatch) {
        const pathCount = (svgMatch[0].match(/<path/g) || []).length;
        console.log(`  Arc count: ${pathCount}`);
      }
    }
  } else {
    console.log('  ❌ Not found');
  }

  console.log('\n');
}

checkTeachingDiagrams();
