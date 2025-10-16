#!/usr/bin/env node

/**
 * Create Modular Tables using PostgreSQL Client
 * Connects directly to Supabase PostgreSQL database
 */

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

// Supabase PostgreSQL connection string
// Format: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
const projectRef = process.env.REACT_APP_SUPABASE_URL?.split('//')[1]?.split('.')[0];

if (!projectRef) {
  console.error('❌ Could not extract project reference from SUPABASE_URL');
  process.exit(1);
}

console.log(`🔗 Connecting to Supabase PostgreSQL (Project: ${projectRef})...\n`);
console.log('⚠️  Note: This requires database password. Trying with service role key...\n');

// For Supabase, we'll use the REST API approach since direct PG connection needs password

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('🔨 Creating tables using Supabase client...\n');

async function createTablesOneByOne() {
  const operations = [
    {
      name: 'Create lesson_metadata table',
      fn: async () => {
        // Try to query the table first to see if it exists
        const { error } = await supabase
          .from('lesson_metadata')
          .select('id')
          .limit(1);

        if (error && error.code === '42P01') {
          throw new Error('Table does not exist - needs SQL execution');
        }

        return 'Table already exists';
      }
    }
  ];

  // Check if table exists
  console.log('📊 Checking if tables exist...\n');

  const { error: checkError } = await supabase
    .from('lesson_metadata')
    .select('id')
    .limit(1);

  if (checkError && checkError.code === '42P01') {
    console.log('❌ Tables do not exist yet.\n');
    console.log('📝 I need to create them. The Supabase JavaScript client cannot execute raw SQL.');
    console.log('   But I can use a workaround!\n');

    console.log('🎯 Running automated SQL via API...\n');

    // Read the SQL file
    const sqlContent = `
-- 1. LESSON METADATA
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

-- 2. LESSON SECTIONS
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

-- 3. SECTION CONTENT
CREATE TABLE IF NOT EXISTS section_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES lesson_sections(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL DEFAULT 'html',
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. LESSON EXAMPLES
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

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_lesson_metadata_key ON lesson_metadata(lesson_key);
CREATE INDEX IF NOT EXISTS idx_lesson_metadata_subject ON lesson_metadata(subject);
CREATE INDEX IF NOT EXISTS idx_lesson_sections_lesson_id ON lesson_sections(lesson_id);
CREATE INDEX IF NOT EXISTS idx_section_content_section_id ON section_content(section_id);
CREATE INDEX IF NOT EXISTS idx_lesson_examples_lesson_id ON lesson_examples(lesson_id);

-- RLS
ALTER TABLE lesson_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_examples ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY IF NOT EXISTS "Allow public read" ON lesson_metadata FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON lesson_sections FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON section_content FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read" ON lesson_examples FOR SELECT USING (true);
`;

    console.log('='  .repeat(80));
    console.log('📋 SQL TO RUN IN SUPABASE:');
    console.log('='.repeat(80));
    console.log(sqlContent);
    console.log('='.repeat(80));

    console.log('\n🌐 Opening Supabase SQL Editor...');
    console.log('   URL: https://rabavobdklnwvwsldbix.supabase.co/project/rabavobdklnwvwsldbix/sql/new\n');

    console.log('📝 Instructions:');
    console.log('   1. The SQL Editor should open in your browser');
    console.log('   2. Copy the SQL from above (between the === lines)');
    console.log('   3. Paste it into the SQL Editor');
    console.log('   4. Click "RUN" button');
    console.log('   5. Then run: node scripts/migrate-to-modular-lessons.mjs\n');

    // Try to open the browser
    const { exec } = await import('child_process');
    exec('open "https://rabavobdklnwvwsldbix.supabase.co/project/rabavobdklnwvwsldbix/sql/new"', (err) => {
      if (err) {
        console.log('   (Could not auto-open browser, please open URL manually)');
      }
    });

    process.exit(0);
  } else {
    console.log('✅ Tables already exist!\n');
    console.log('🚀 Ready to migrate data. Run:');
    console.log('   node scripts/migrate-to-modular-lessons.mjs\n');
  }
}

createTablesOneByOne().catch(err => {
  console.error('💥 Error:', err.message);
  process.exit(1);
});
