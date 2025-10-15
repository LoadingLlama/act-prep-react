/**
 * Check Example Structure in Backsolving Lesson
 * Verify that examples have proper solution HTML structure
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  console.log('='.repeat(80));
  console.log('CHECKING EXAMPLE STRUCTURE IN BACKSOLVING LESSON');
  console.log('='.repeat(80));
  console.log();

  // Get the backsolving lesson
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('content')
    .eq('id', 'b699563d-216b-477f-aa3f-fe7b6f6afd80')
    .single();

  if (error) {
    console.error('Error fetching lesson:', error);
    process.exit(1);
  }

  // Extract examples from content
  const exampleMatches = lesson.content.match(/<h4[^>]*style="[^"]*exampleHeader[^"]*">Example \d+<\/h4>[\s\S]*?(?=<h[34]|<h3 style="margin-top: 5rem|$)/gi);

  if (!exampleMatches) {
    console.log('No examples found in lesson');
    process.exit(0);
  }

  console.log(`Found ${exampleMatches.length} examples\n`);

  exampleMatches.forEach((example, index) => {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`EXAMPLE ${index + 1}`);
    console.log('='.repeat(80));

    // Extract the solution part
    const solutionMatch = example.match(/<p[^>]*>\s*<strong>Solution:<\/strong>\s*<\/p>([\s\S]*?)$/i);

    if (solutionMatch) {
      const solutionHTML = solutionMatch[1].trim();
      console.log('\nSOLUTION HTML:');
      console.log('-'.repeat(80));
      console.log(solutionHTML.substring(0, 1000));
      if (solutionHTML.length > 1000) {
        console.log('\n... (truncated, total length:', solutionHTML.length, 'chars)');
      }

      // Check structure
      console.log('\n\nSTRUCTURE ANALYSIS:');
      console.log('-'.repeat(80));
      const hasUL = solutionHTML.includes('<ul');
      const hasLI = solutionHTML.includes('<li');
      const liCount = (solutionHTML.match(/<li[^>]*>/g) || []).length;
      const nestedULCount = (solutionHTML.match(/<ul[^>]*>/g) || []).length;

      console.log('Has <ul> tags:', hasUL);
      console.log('Has <li> tags:', hasLI);
      console.log('Number of <li> tags:', liCount);
      console.log('Number of nested <ul> tags:', nestedULCount);

      if (hasUL && hasLI) {
        console.log('✓ Good structure for PhotomathSolution component');
      } else {
        console.log('⚠ May need restructuring for PhotomathSolution component');
      }
    } else {
      console.log('\n⚠ No solution found in this example');
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log('ANALYSIS COMPLETE');
  console.log('='.repeat(80));

  process.exit(0);
}

main();
