import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function verifyCriticalIssues() {
  console.log('========================================');
  console.log('VERIFYING CRITICAL ISSUES IN SUPABASE');
  console.log('========================================\n');

  // Issue 1: Verify algebra-skills is missing core concepts
  console.log('🔍 ISSUE 1: Verifying algebra-skills lesson...\n');

  const { data: algebraSkills } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'algebra-skills')
    .single();

  if (algebraSkills) {
    console.log('✓ Lesson found in Supabase');
    console.log(`Title: ${algebraSkills.title}`);
    console.log(`Length: ${algebraSkills.content.length} chars\n`);

    const content = algebraSkills.content.toLowerCase();

    console.log('Checking for core concepts:');
    console.log(`  • "distribute": ${content.includes('distribute') ? '✓ FOUND' : '✗ MISSING'}`);
    console.log(`  • "distributive": ${content.includes('distributive') ? '✓ FOUND' : '✗ MISSING'}`);
    console.log(`  • "combine like terms": ${content.includes('combine like terms') || content.includes('combining like terms') ? '✓ FOUND' : '✗ MISSING'}`);
    console.log(`  • "like terms": ${content.includes('like terms') ? '✓ FOUND' : '✗ MISSING'}`);
    console.log(`  • "factor": ${content.includes('factor') ? '✓ FOUND' : '✗ MISSING'}`);
    console.log(`  • "expand": ${content.includes('expand') ? '✓ FOUND' : '✗ MISSING'}`);
    console.log(`  • "foil": ${content.includes('foil') ? '✓ FOUND' : '✗ MISSING'}`);

    console.log('\n📝 First 500 characters of content:');
    console.log(algebraSkills.content.substring(0, 500) + '...\n');
  } else {
    console.log('✗ Lesson NOT FOUND in database\n');
  }

  console.log('========================================\n');

  // Issue 2: Verify circles-ellipses is missing formulas
  console.log('🔍 ISSUE 2: Verifying circles-ellipses lesson...\n');

  const { data: circles } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'circles-ellipses')
    .single();

  if (circles) {
    console.log('✓ Lesson found in Supabase');
    console.log(`Title: ${circles.title}`);
    console.log(`Length: ${circles.content.length} chars\n`);

    const content = circles.content.toLowerCase();

    console.log('Checking for circle formulas:');
    console.log(`  • "area": ${content.includes('area') ? '✓ FOUND' : '✗ MISSING'}`);
    console.log(`  • "circumference": ${content.includes('circumference') ? '✓ FOUND' : '✗ MISSING'}`);
    console.log(`  • "πr²" or "pi*r^2": ${content.includes('πr²') || content.includes('pi*r^2') || content.includes('πr2') || content.includes('area of a circle') ? '✓ FOUND' : '✗ MISSING'}`);
    console.log(`  • "2πr" or "2*pi*r": ${content.includes('2πr') || content.includes('2*pi*r') || content.includes('2πr') ? '✓ FOUND' : '✗ MISSING'}`);
    console.log(`  • "diameter": ${content.includes('diameter') ? '✓ FOUND' : '✗ MISSING'}`);

    console.log('\n📝 Full content:');
    console.log(circles.content);
    console.log('\n');
  } else {
    console.log('✗ Lesson NOT FOUND in database\n');
  }

  console.log('========================================\n');

  // Issue 3: Verify geometry-angles has broken image references
  console.log('🔍 ISSUE 3: Verifying geometry-angles for broken images...\n');

  const { data: geoAngles } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (geoAngles) {
    console.log('✓ Lesson found in Supabase');
    console.log(`Title: ${geoAngles.title}`);
    console.log(`Length: ${geoAngles.content.length} chars\n`);

    const content = geoAngles.content;

    console.log('Checking for image/diagram references:');
    console.log(`  • "diagram": ${content.toLowerCase().includes('diagram') ? '✓ FOUND' : '✗ NOT FOUND'}`);
    console.log(`  • "figure": ${content.toLowerCase().includes('figure') ? '✓ FOUND' : '✗ NOT FOUND'}`);
    console.log(`  • "graph": ${content.toLowerCase().includes('graph') ? '✓ FOUND' : '✗ NOT FOUND'}`);
    console.log(`  • "<img": ${content.includes('<img') ? '✓ HAS IMAGE TAG' : '✗ NO IMAGE TAG'}`);

    // Find the exact quotes with diagram references
    const lines = content.split('\n');
    const diagramLines = lines.filter(line =>
      line.toLowerCase().includes('diagram') ||
      line.toLowerCase().includes('figure') ||
      line.toLowerCase().includes('graph')
    );

    if (diagramLines.length > 0) {
      console.log('\n📝 Lines mentioning diagrams/figures/graphs:');
      diagramLines.forEach(line => console.log(`  "${line.trim()}"`));
    }

    console.log('\n');
  } else {
    console.log('✗ Lesson NOT FOUND in database\n');
  }

  console.log('========================================\n');

  // Issue 4: Count total lessons to verify database connectivity
  console.log('🔍 VERIFICATION: Checking database connection...\n');

  const { data: allLessons, error } = await supabase
    .from('lessons')
    .select('id, title, lesson_key, subject')
    .eq('subject', 'math');

  if (error) {
    console.log('✗ DATABASE ERROR:', error.message);
  } else {
    console.log(`✓ Successfully connected to Supabase`);
    console.log(`✓ Found ${allLessons.length} math lessons in database`);
    console.log(`✓ All data is stored and accessible\n`);
  }

  console.log('========================================');
  console.log('VERIFICATION COMPLETE');
  console.log('========================================\n');
}

verifyCriticalIssues();
