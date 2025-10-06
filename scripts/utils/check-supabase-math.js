const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');
global.fetch = fetch;

const supabaseUrl = 'https://rabavodbdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMathLessons() {
    try {
        const { data, error } = await supabase
            .from('lessons')
            .select('lesson_key, title, order_index')
            .eq('subject', 'math')
            .order('order_index', { ascending: true });

        if (error) throw error;

        console.log(`\nFound ${data.length} math lessons in Supabase:\n`);
        data.forEach((lesson, i) => {
            console.log(`${i + 1}. [${lesson.order_index}] ${lesson.lesson_key}: ${lesson.title}`);
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkMathLessons();
