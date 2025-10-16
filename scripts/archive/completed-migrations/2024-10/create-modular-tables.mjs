#!/usr/bin/env node

/**
 * Create Modular Tables in Supabase
 * This script creates all necessary tables for the modular lesson structure
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔨 Creating modular lesson tables in Supabase...\n');

// Create tables one by one
async function createTables() {
  const tables = [
    {
      name: 'lesson_metadata',
      sql: `
        CREATE TABLE IF NOT EXISTS lesson_metadata (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          lesson_key VARCHAR(100) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          subject VARCHAR(50) NOT NULL,
          category VARCHAR(100),
          difficulty_level INTEGER DEFAULT 1,
          duration_minutes INTEGER DEFAULT 30,
          order_index INTEGER DEFAULT 0,
          is_published BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_lesson_metadata_key ON lesson_metadata(lesson_key);
        CREATE INDEX IF NOT EXISTS idx_lesson_metadata_subject ON lesson_metadata(subject);
      `
    },
    {
      name: 'lesson_sections',
      sql: `
        CREATE TABLE IF NOT EXISTS lesson_sections (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
          section_key VARCHAR(100) NOT NULL,
          title VARCHAR(255) NOT NULL,
          section_type VARCHAR(50) NOT NULL,
          order_index INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(lesson_id, section_key)
        );
        CREATE INDEX IF NOT EXISTS idx_lesson_sections_lesson_id ON lesson_sections(lesson_id);
      `
    },
    {
      name: 'section_content',
      sql: `
        CREATE TABLE IF NOT EXISTS section_content (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          section_id UUID REFERENCES lesson_sections(id) ON DELETE CASCADE,
          content_type VARCHAR(50) NOT NULL,
          content TEXT NOT NULL,
          order_index INTEGER DEFAULT 0,
          metadata JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_section_content_section_id ON section_content(section_id);
      `
    },
    {
      name: 'lesson_examples',
      sql: `
        CREATE TABLE IF NOT EXISTS lesson_examples (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
          section_id UUID REFERENCES lesson_sections(id) ON DELETE SET NULL,
          title VARCHAR(255),
          problem_text TEXT NOT NULL,
          solution_text TEXT,
          explanation TEXT,
          difficulty INTEGER DEFAULT 1,
          order_index INTEGER DEFAULT 0,
          tags TEXT[],
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_lesson_examples_lesson_id ON lesson_examples(lesson_id);
      `
    }
  ];

  console.log('📊 Note: Tables will be created via Supabase SQL Editor');
  console.log('   Copy the SQL below and paste into Supabase SQL Editor:\n');
  console.log('='  .repeat(80));

  const allSql = tables.map(t => t.sql).join('\n\n');
  console.log(allSql);

  console.log('='.repeat(80));
  console.log('\n✅ After running this SQL in Supabase, run the migration script.');

  // Try to check if we can verify the tables exist
  console.log('\n🔍 Checking current database state...');

  try {
    const { data, error } = await supabase
      .from('lesson_metadata')
      .select('id')
      .limit(1);

    if (error && error.code === '42P01') {
      console.log('❌ Tables do not exist yet. Please run the SQL above in Supabase.\n');
      console.log('   1. Go to: https://rabavobdklnwvwsldbix.supabase.co/project/rabavobdklnwvwsldbix/sql');
      console.log('   2. Paste the SQL from above');
      console.log('   3. Click "Run"');
      console.log('   4. Then run: node scripts/migrate-to-modular-lessons.mjs');
    } else if (!error) {
      console.log('✅ Tables already exist! You can run the migration now.');
      console.log('   Run: node scripts/migrate-to-modular-lessons.mjs');
    }
  } catch (err) {
    console.log('⚠️  Could not verify table status:', err.message);
  }
}

createTables();
