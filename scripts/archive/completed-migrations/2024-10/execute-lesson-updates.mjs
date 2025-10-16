#!/usr/bin/env node

/**
 * Execute English Lesson Updates
 * Runs the SQL to update all 16 lessons in database
 */

import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🚀 Executing English Lesson Updates...\n');
console.log('⚠️  This will REPLACE all existing English lesson content!\n');

// Read SQL file
const sqlPath = '/Users/cadenchiang/Desktop/act-prep-react/UPDATE_ENGLISH_LESSONS.sql';
const sql = fs.readFileSync(sqlPath, 'utf-8');

console.log(`📄 SQL file size: ${(sql.length / 1024).toFixed(2)} KB`);
console.log(`📝 Contains updates for 16 lessons\n`);

// Confirm execution
console.log('='.repeat(60));
console.log('EXECUTING SQL UPDATES');
console.log('='.repeat(60) + '\n');

async function executeUpdates() {
  try {
    // Execute the SQL
    console.log('⏳ Executing SQL transaction...\n');

    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      console.error('❌ Error executing SQL:', error.message);
      console.error('Full error:', error);
      return false;
    }

    console.log('✅ SQL executed successfully!\n');

    // Run verification query
    console.log('🔍 Running verification...\n');

    const { data: verification, error: verifyError } = await supabase
      .from('lesson_metadata')
      .select(`
        lesson_key,
        title,
        updated_at
      `)
      .eq('subject', 'english')
      .order('order_index', { ascending: true });

    if (verifyError) {
      console.error('❌ Verification error:', verifyError.message);
      return false;
    }

    console.log('📊 Updated Lessons:\n');
    verification.forEach((lesson, i) => {
      console.log(`${i + 1}. [${lesson.lesson_key}] ${lesson.title}`);
      console.log(`   Updated: ${new Date(lesson.updated_at).toLocaleString()}\n`);
    });

    console.log('='.repeat(60));
    console.log('✅ ALL UPDATES COMPLETE!');
    console.log('='.repeat(60) + '\n');

    return true;
  } catch (err) {
    console.error('💥 Unexpected error:', err.message);
    return false;
  }
}

executeUpdates();
