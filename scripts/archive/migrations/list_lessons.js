import { supabaseUrl, supabaseServiceKey } from './config.mjs';
const { createClient } = require('@supabase/supabase-js');

// supabaseUrl imported from config.mjs
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listMathLessons() {
    try {
        const { data, error } = await supabase
            .from('lessons')
            .select('id, title')
            .eq('subject', 'math')
            .order('id', { ascending: true });

        if (error) throw error;

        console.log(`Total math lessons: ${data.length}\n`);
        data.forEach((lesson, index) => {
            console.log(`${index + 1}. ID: ${lesson.id}, Title: ${lesson.title}`);
        });

        return data;
    } catch (error) {
        console.error('Error fetching lessons:', error);
        throw error;
    }
}

listMathLessons();
