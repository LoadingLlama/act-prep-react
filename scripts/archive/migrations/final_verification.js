const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function finalVerification() {
    console.log('\n=== FINAL VERIFICATION OF ALL 35 MATH LESSONS ===\n');

    const { data: lessons, error } = await supabase
        .from('lessons')
        .select('id, title, content')
        .eq('subject', 'math')
        .order('id', { ascending: true });

    if (error) {
        console.error('Error:', error);
        return;
    }

    let totalVisuals = 0;
    let lessonsWithVisuals = 0;
    let lessonsWithBookRefs = 0;

    lessons.forEach((lesson, index) => {
        const visualCount = (lesson.content.match(/diagram-box/g) || []).length;
        const hasBookRefs = /\b(this book|the book)\b/i.test(lesson.content);

        if (visualCount > 0) {
            lessonsWithVisuals++;
            totalVisuals += visualCount;
        }

        if (hasBookRefs) {
            lessonsWithBookRefs++;
            console.log(`⚠️  [${index + 1}] ${lesson.title} - Still has book references!`);
        } else {
            const status = visualCount > 0 ? `✅ ${visualCount} visual(s)` : '✅ Content cleaned';
            console.log(`[${index + 1}] ${lesson.title} - ${status}`);
        }
    });

    console.log('\n' + '='.repeat(60));
    console.log('VERIFICATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total lessons checked: ${lessons.length}`);
    console.log(`Lessons with visuals: ${lessonsWithVisuals}`);
    console.log(`Total visuals added: ${totalVisuals}`);
    console.log(`Lessons with book references: ${lessonsWithBookRefs}`);
    console.log(`\n${lessonsWithBookRefs === 0 ? '✅ ALL CLEAR!' : '⚠️  Some lessons need review'}`);
    console.log('='.repeat(60) + '\n');
}

finalVerification();
