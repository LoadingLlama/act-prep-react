#!/usr/bin/env node

/**
 * Quick Check and Migrate Script
 * Checks database state and runs migration if possible
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('🔍 Checking Supabase connection and database structure...\n');

  // Check if old lessons table exists
  console.log('1️⃣  Checking old "lessons" table...');
  try {
    const { data: oldLessons, error: oldError } = await supabase
      .from('lessons')
      .select('id, lesson_key, title')
      .limit(5);

    if (oldError) {
      console.error(`   ❌ Error: ${oldError.message}`);
    } else {
      console.log(`   ✅ Found ${oldLessons?.length || 0} lessons in old table (showing first 5)`);
      if (oldLessons && oldLessons.length > 0) {
        oldLessons.forEach(l => console.log(`      - ${l.title} (${l.lesson_key})`));
      }
    }
  } catch (err) {
    console.error(`   ❌ Unexpected error: ${err.message}`);
  }

  // Check if new tables exist
  console.log('\n2️⃣  Checking new modular tables...');
  try {
    const { data: newLessons, error: newError } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title')
      .limit(5);

    if (newError && newError.code === '42P01') {
      console.log('   ❌ Modular tables DO NOT exist yet');
      console.log('\n📝 To create the modular tables:');
      console.log('   1. Open Supabase SQL Editor:');
      console.log(`      https://${supabaseUrl.replace('https://', '').split('.')[0]}.supabase.co/project/${supabaseUrl.replace('https://', '').split('.')[0]}/sql`);
      console.log('\n   2. Copy and paste this SQL:\n');

      console.log('   ─'.repeat(80));
      console.log(`
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

CREATE TABLE IF NOT EXISTS section_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES lesson_sections(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lesson_metadata_key ON lesson_metadata(lesson_key);
CREATE INDEX IF NOT EXISTS idx_lesson_sections_lesson_id ON lesson_sections(lesson_id);
CREATE INDEX IF NOT EXISTS idx_section_content_section_id ON section_content(section_id);
CREATE INDEX IF NOT EXISTS idx_lesson_examples_lesson_id ON lesson_examples(lesson_id);

-- Enable RLS
ALTER TABLE lesson_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_examples ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Allow public read" ON lesson_metadata FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON lesson_sections FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON section_content FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON lesson_examples FOR SELECT USING (true);
`);
      console.log('   ─'.repeat(80));
      console.log('\n   3. Click "Run" in Supabase');
      console.log('   4. Then run this script again to migrate the data\n');

    } else if (newError) {
      console.error(`   ❌ Error: ${newError.message}`);
    } else {
      console.log(`   ✅ Modular tables exist! Found ${newLessons?.length || 0} lessons already migrated`);
      if (newLessons && newLessons.length > 0) {
        newLessons.forEach(l => console.log(`      - ${l.title} (${l.lesson_key})`));
      } else {
        console.log('\n🚀 Tables exist but are empty. Ready to migrate!');
        console.log('   Run: node scripts/migrate-to-modular-lessons.mjs');
      }
    }
  } catch (err) {
    console.error(`   ❌ Unexpected error: ${err.message}`);
  }

  console.log('\n✅ Check complete!\n');
}

main().catch(err => {
  console.error('💥 Error:', err);
  process.exit(1);
});
