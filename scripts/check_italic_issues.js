/**
 * Check for italic formatting issues in math questions
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bqrcrdixcmklfgzsrwxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcmNyZGl4Y21rbGZnenNyd3huIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTgxMTAwOCwiZXhwIjoyMDQ3Mzg3MDA4fQ.Qb59r0YZt3aQEHZc38lMBLONtBAD66nrFRcS9e63Y5I';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkItalicIssues() {
  try {
    console.log('🔍 Checking for italic formatting issues in math questions...\n');

    // Get first 10 math questions from diagnostic test
    const { data: mathQuestions, error } = await supabase
      .from('practice_test_math_questions')
      .select('id, question_number, question_text, question_prompt, choices')
      .eq('test_number', 1)
      .order('question_number', { ascending: true })
      .limit(10);

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    console.log(`Found ${mathQuestions.length} math questions\n`);

    let issuesFound = 0;

    mathQuestions.forEach((q, idx) => {
      console.log(`\n━━━ Question ${q.question_number} (ID: ${q.id}) ━━━`);

      const questionText = q.question_text || q.question_prompt || '';
      const choices = q.choices || {};

      // Check for italic markers
      const hasUnderscores = questionText.includes('_');
      const hasEmTags = questionText.includes('<em>') || questionText.includes('</em>');
      const hasItalicTags = questionText.includes('<i>') || questionText.includes('</i>');
      const hasStarMarkers = questionText.includes('*');

      if (hasUnderscores || hasEmTags || hasItalicTags || hasStarMarkers) {
        issuesFound++;
        console.log('⚠️  ITALIC MARKERS FOUND:');
        if (hasUnderscores) console.log('   - Underscores (_)');
        if (hasEmTags) console.log('   - <em> tags');
        if (hasItalicTags) console.log('   - <i> tags');
        if (hasStarMarkers) console.log('   - Asterisks (*)');
        console.log('\nQuestion Text:');
        console.log(questionText.substring(0, 200));
        if (questionText.length > 200) console.log('...');
      }

      // Check choices
      Object.entries(choices).forEach(([key, value]) => {
        if (!value) return;

        const hasChoiceUnderscores = value.includes('_');
        const hasChoiceEmTags = value.includes('<em>') || value.includes('</em>');
        const hasChoiceItalicTags = value.includes('<i>') || value.includes('</i>');
        const hasChoiceStarMarkers = value.includes('*');

        if (hasChoiceUnderscores || hasChoiceEmTags || hasChoiceItalicTags || hasChoiceStarMarkers) {
          issuesFound++;
          console.log(`⚠️  ITALIC MARKERS in Choice ${key}:`);
          if (hasChoiceUnderscores) console.log('   - Underscores (_)');
          if (hasChoiceEmTags) console.log('   - <em> tags');
          if (hasChoiceItalicTags) console.log('   - <i> tags');
          if (hasChoiceStarMarkers) console.log('   - Asterisks (*)');
          console.log(`   ${key}: ${value}`);
        }
      });

      if (!hasUnderscores && !hasEmTags && !hasItalicTags && !hasStarMarkers) {
        const choicesHaveIssues = Object.values(choices).some(v =>
          v && (v.includes('_') || v.includes('<em>') || v.includes('<i>') || v.includes('*'))
        );
        if (!choicesHaveIssues) {
          console.log('✅ No italic markers found');
        }
      }
    });

    console.log('\n\n═══════════════════════════════════════');
    console.log(`Summary: ${issuesFound > 0 ? `⚠️  ${issuesFound} issues found` : '✅ No issues found'}`);
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Exception:', error);
  }
}

checkItalicIssues();
