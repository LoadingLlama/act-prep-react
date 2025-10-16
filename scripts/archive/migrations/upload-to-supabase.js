import { supabaseUrl, supabaseServiceKey } from './config.mjs';
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// supabaseUrl imported from config.mjs
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';
const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  try {
    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║           UPLOADING REFORMATTED LESSONS TO SUPABASE          ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');

    // Load reformatted lessons
    const lessons = JSON.parse(
      fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/perfect-lessons.json', 'utf8')
    );

    console.log(`✓ Loaded ${lessons.length} reformatted lessons\n`);

    console.log('─'.repeat(66));
    console.log('UPLOADING TO SUPABASE...');
    console.log('─'.repeat(66) + '\n');

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];

      try {
        const { error } = await supabase
          .from('lessons')
          .update({ content: lesson.reformattedContent })
          .eq('id', lesson.id);

        if (error) throw error;

        successCount++;
        console.log(`✅ [${String(i+1).padStart(2)}/35] ${lesson.title.padEnd(45)} Updated`);

      } catch (err) {
        errorCount++;
        console.log(`❌ [${String(i+1).padStart(2)}/35] ${lesson.title.padEnd(45)} ERROR`);
        console.error(`   Error: ${err.message}`);
      }
    }

    console.log('\n' + '─'.repeat(66));
    console.log('UPLOAD COMPLETE');
    console.log('─'.repeat(66));
    console.log(`  Successfully updated: ${successCount}/35 lessons`);
    console.log(`  Errors:               ${errorCount}/35 lessons`);
    console.log('─'.repeat(66));

    if (successCount === 35) {
      console.log('\n🎉 ALL 35 MATH LESSONS SUCCESSFULLY UPDATED IN SUPABASE! 🎉\n');
    } else {
      console.log('\n⚠️  Some lessons failed to update. Please check errors above.\n');
    }

  } catch (err) {
    console.error('\n❌ Fatal error:', err.message);
    process.exit(1);
  }
})();
