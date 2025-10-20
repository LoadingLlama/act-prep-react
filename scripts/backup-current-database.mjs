#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use SERVICE_ROLE_KEY for full access
const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function backupDatabase() {
  console.log('=========================================');
  console.log('ACT Prep Database Backup');
  console.log('=========================================');
  console.log('Timestamp:', new Date().toISOString());
  console.log('');

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const backupDir = path.join(__dirname, '../backups');

  // Create backup directory
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const backup = {
    metadata: {
      timestamp: new Date().toISOString(),
      database: 'ACT Prep Application',
      version: '2.0',
      tables: ['lessons', 'lesson_examples', 'lesson_term_definitions']
    },
    data: {}
  };

  try {
    // Backup lessons table
    console.log('📦 Backing up lessons...');
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .order('created_at', { ascending: true });

    if (lessonsError) {
      console.error('❌ Error backing up lessons:', lessonsError.message);
    } else {
      backup.data.lessons = lessons;
      console.log(`✓ Backed up ${lessons.length} lessons`);
    }

    // Backup lesson_examples table
    console.log('\n📦 Backing up lesson_examples...');
    const { data: examples, error: examplesError } = await supabase
      .from('lesson_examples')
      .select('*')
      .order('created_at', { ascending: true });

    if (examplesError) {
      console.error('❌ Error backing up lesson_examples:', examplesError.message);
    } else {
      backup.data.lesson_examples = examples;
      console.log(`✓ Backed up ${examples.length} examples`);
    }

    // Backup lesson_term_definitions table
    console.log('\n📦 Backing up lesson_term_definitions...');
    const { data: terms, error: termsError } = await supabase
      .from('lesson_term_definitions')
      .select('*')
      .order('created_at', { ascending: true });

    if (termsError) {
      console.error('❌ Error backing up lesson_term_definitions:', termsError.message);
    } else {
      backup.data.lesson_term_definitions = terms;
      console.log(`✓ Backed up ${terms.length} term definitions`);
    }

    // Write backup to file
    const backupFilename = `actprep_backup_${timestamp}.json`;
    const backupPath = path.join(backupDir, backupFilename);

    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));

    console.log('\n=========================================');
    console.log('✅ Backup completed successfully!');
    console.log('=========================================');
    console.log(`📁 Backup file: ${backupFilename}`);
    console.log(`📍 Location: ${backupPath}`);
    console.log(`📊 File size: ${(fs.statSync(backupPath).size / 1024 / 1024).toFixed(2)} MB`);
    console.log('');
    console.log('Summary:');
    console.log(`  • Lessons: ${backup.data.lessons?.length || 0}`);
    console.log(`  • Examples: ${backup.data.lesson_examples?.length || 0}`);
    console.log(`  • Term Definitions: ${backup.data.lesson_term_definitions?.length || 0}`);

  } catch (error) {
    console.error('\n❌ Backup failed:', error.message);
    process.exit(1);
  }
}

backupDatabase();
