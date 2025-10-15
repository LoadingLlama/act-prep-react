const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySamples() {
    // Sample lessons with visuals to verify
    const samplesToCheck = [
        'Chapter 17: Trigonometry',
        'Chapter 3: Geometry Part 1 - Angles',
        'Chapter 32: Vectors'
    ];

    const samples = [];

    for (const title of samplesToCheck) {
        const { data, error } = await supabase
            .from('lessons')
            .select('id, title, content')
            .eq('subject', 'math')
            .eq('title', title)
            .single();

        if (error) {
            console.error(`Error fetching ${title}:`, error);
            continue;
        }

        // Extract first 1000 chars and check for visuals
        const preview = data.content.substring(0, 1500);
        const hasVisuals = data.content.includes('diagram-box');
        const visualCount = (data.content.match(/diagram-box/g) || []).length;
        const hasBookReferences = /\b(this book|the book)\b/i.test(data.content);

        samples.push({
            title: data.title,
            id: data.id,
            hasVisuals,
            visualCount,
            hasBookReferences,
            contentPreview: preview
        });

        console.log(`\n${'='.repeat(60)}`);
        console.log(`LESSON: ${data.title}`);
        console.log(`${'='.repeat(60)}`);
        console.log(`ID: ${data.id}`);
        console.log(`Visuals Added: ${visualCount}`);
        console.log(`Book References Removed: ${!hasBookReferences ? 'YES' : 'NO (still has some)'}`);
        console.log(`\nContent Preview (first 1500 chars):`);
        console.log(preview);
        console.log(`\n${'='.repeat(60)}\n`);
    }

    fs.writeFileSync('/tmp/verification_samples.json', JSON.stringify(samples, null, 2));
    console.log('Verification samples saved to /tmp/verification_samples.json');
}

verifySamples();
