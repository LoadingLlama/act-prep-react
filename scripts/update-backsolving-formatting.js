/**
 * Update Backsolving Lesson - Fix Example 1 Formatting
 * Fixes solution steps to display on separate lines with better visual design
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

const LESSON_ID = '06685249-874d-431f-9b7f-1c711d64a9cf';

// Old format (current simple format without collapsible)
const OLD_EXAMPLE_1 = `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Example 1: Basic Backsolving</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If √x + 10 − 2√x − 2 = 0, what is the value of x?</p>

<div style="margin: 0.5rem 0 1rem 0; line-height: 1.8;">
  <div><strong>A.</strong> 2</div>
  <div><strong>B.</strong> 6</div>
  <div><strong>C.</strong> 14</div>
  <div><strong>D.</strong> 18</div>
  <div><strong>E.</strong> 22</div>
</div>

<p style="margin: 1rem 0 0.5rem 0;"><strong>Solution:</strong></p>

<div style="margin: 0.5rem 0;">
  <div style="margin-bottom: 0.75rem;">
    <div style="font-weight: 600; margin-bottom: 0.25rem;">Start with C (14):</div>
    <div style="font-family: 'Courier New', monospace; font-size: 15px; line-height: 1.6; margin-left: 1rem;">
      <div>√14 + 10 − 2√14 − 2</div>
      <div>= √24 − 2√12</div>
      <div>≈ 4.9 − 6.9</div>
      <div>≠ 0</div>
    </div>
    <div style="margin-left: 1rem; color: #666;">❌ Doesn't work</div>
  </div>

  <div style="margin-bottom: 0.75rem;">
    <div style="font-weight: 600; margin-bottom: 0.25rem;">Try B (6):</div>
    <div style="font-family: 'Courier New', monospace; font-size: 15px; line-height: 1.6; margin-left: 1rem;">
      <div>√6 + 10 − 2√6 − 2</div>
      <div>= √16 − 2√4</div>
      <div>= 4 − 2(2)</div>
      <div>= 4 − 4</div>
      <div>= 0</div>
    </div>
    <div style="margin-left: 1rem; color: #666;">✓ Works!</div>
  </div>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 1rem 0;"><strong>Answer: B</strong></p>`;

// New format (collapsible solution, clean and simple)
const NEW_EXAMPLE_1 = `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Example 1: Basic Backsolving</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If √x + 10 − 2√x − 2 = 0, what is the value of x?</p>

<div style="margin: 0.5rem 0 1rem 0; line-height: 1.8;">
  <div><strong>A.</strong> 2</div>
  <div><strong>B.</strong> 6</div>
  <div><strong>C.</strong> 14</div>
  <div><strong>D.</strong> 18</div>
  <div><strong>E.</strong> 22</div>
</div>

<details style="margin: 1rem 0; border: 1px solid #e5e7eb; border-radius: 6px; padding: 0;">
  <summary style="cursor: pointer; padding: 0.75rem 1rem; font-weight: 600; background: #f9fafb; border-radius: 6px; user-select: none; list-style: none; display: flex; align-items: center; gap: 0.5rem;">
    <span style="transition: transform 0.2s;">▶</span> Solution
  </summary>
  <div style="padding: 1rem; border-top: 1px solid #e5e7eb;">
    <div style="margin-bottom: 1rem;">
      <div style="font-weight: 600; margin-bottom: 0.5rem;">Start with C (14):</div>
      <div style="line-height: 1.8; margin-left: 1rem;">
        <div>√14 + 10 − 2√14 − 2</div>
        <div>= √24 − 2√12</div>
        <div>≈ 4.9 − 6.9</div>
        <div>≠ 0</div>
      </div>
      <div style="margin-left: 1rem; color: #666; margin-top: 0.25rem;">❌ Doesn't work</div>
    </div>

    <div style="margin-bottom: 1rem;">
      <div style="font-weight: 600; margin-bottom: 0.5rem;">Try B (6):</div>
      <div style="line-height: 1.8; margin-left: 1rem;">
        <div>√6 + 10 − 2√6 − 2</div>
        <div>= √16 − 2√4</div>
        <div>= 4 − 2(2)</div>
        <div>= 4 − 4</div>
        <div>= 0</div>
      </div>
      <div style="margin-left: 1rem; color: #666; margin-top: 0.25rem;">✓ Works!</div>
    </div>

    <p style="margin: 0; font-weight: 600;"><strong>Answer: B</strong></p>
  </div>
</details>

<style>
details[open] summary span {
  transform: rotate(90deg);
}
</style>`;

async function main() {
  console.log('='.repeat(80));
  console.log('UPDATE BACKSOLVING LESSON - EXAMPLE 1 FORMATTING');
  console.log('='.repeat(80));
  console.log();

  try {
    // First, get the current content
    const { data: currentLesson, error: fetchError } = await supabase
      .from('lessons')
      .select('content')
      .eq('id', LESSON_ID)
      .single();

    if (fetchError) {
      console.error('❌ Error fetching lesson:', fetchError);
      process.exit(1);
    }

    console.log('✓ Fetched current lesson');
    console.log('  Current content length:', currentLesson.content.length, 'characters');

    // Replace the old example with the new one
    const updatedContent = currentLesson.content.replace(OLD_EXAMPLE_1, NEW_EXAMPLE_1);

    if (updatedContent === currentLesson.content) {
      console.error('❌ No changes made - old content not found');
      console.log('\nSearching for similar content...');
      const hasExample1 = currentLesson.content.includes('Example 1: Basic Backsolving');
      console.log('  Has "Example 1: Basic Backsolving":', hasExample1);
      process.exit(1);
    }

    console.log('✓ Content updated in memory');
    console.log('  New content length:', updatedContent.length, 'characters');
    console.log('  Difference:', updatedContent.length - currentLesson.content.length, 'characters');

    // Update the lesson in Supabase
    const { data, error } = await supabase
      .from('lessons')
      .update({
        content: updatedContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', LESSON_ID)
      .select();

    if (error) {
      console.error('❌ Error updating lesson:', error);
      process.exit(1);
    }

    console.log('\n✓ Successfully updated lesson in Supabase!');
    console.log('\nChanges made:');
    console.log('  ✓ Made solution collapsible with <details> element');
    console.log('  ✓ Removed monospace font - uses normal font now');
    console.log('  ✓ Clean gray border and subtle background');
    console.log('  ✓ Arrow icon rotates when expanded');
    console.log('  ✓ Answer choices remain clean with bold letters');
    console.log('  ✓ Solution steps on separate lines');
    console.log('  ✓ Minimal, compact design');
    console.log('\n  Updated at:', new Date().toISOString());

    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
