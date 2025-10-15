#!/usr/bin/env node

/**
 * Automatically create modular tables in Supabase
 * Runs SQL directly via Supabase client
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔨 Creating modular tables in Supabase...\n');

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
          content_type VARCHAR(50) NOT NULL DEFAULT 'html',
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

  // Create each table
  for (const table of tables) {
    console.log(`  📦 Creating table: ${table.name}...`);

    const { error } = await supabase.rpc('exec_sql', { sql: table.sql });

    if (error) {
      // Try direct query instead
      console.log(`     Trying alternative method...`);

      // Split into individual statements and execute each
      const statements = table.sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      for (const stmt of statements) {
        const { error: stmtError } = await supabase.rpc('exec_sql', { sql: stmt });
        if (stmtError) {
          console.log(`     ⚠️  ${stmtError.message}`);
        }
      }
    } else {
      console.log(`     ✅ Created`);
    }
  }

  // Enable RLS and create policies
  console.log('\n  🔒 Setting up Row Level Security...');

  const rlsStatements = [
    'ALTER TABLE lesson_metadata ENABLE ROW LEVEL SECURITY',
    'ALTER TABLE lesson_sections ENABLE ROW LEVEL SECURITY',
    'ALTER TABLE section_content ENABLE ROW LEVEL SECURITY',
    'ALTER TABLE lesson_examples ENABLE ROW LEVEL SECURITY',
    "DROP POLICY IF EXISTS \"Allow public read\" ON lesson_metadata",
    "DROP POLICY IF EXISTS \"Allow public read\" ON lesson_sections",
    "DROP POLICY IF EXISTS \"Allow public read\" ON section_content",
    "DROP POLICY IF EXISTS \"Allow public read\" ON lesson_examples",
    "CREATE POLICY \"Allow public read\" ON lesson_metadata FOR SELECT USING (true)",
    "CREATE POLICY \"Allow public read\" ON lesson_sections FOR SELECT USING (true)",
    "CREATE POLICY \"Allow public read\" ON section_content FOR SELECT USING (true)",
    "CREATE POLICY \"Allow public read\" ON lesson_examples FOR SELECT USING (true)"
  ];

  for (const stmt of rlsStatements) {
    await supabase.rpc('exec_sql', { sql: stmt });
  }

  console.log('     ✅ RLS configured\n');

  // Verify tables exist
  console.log('  🔍 Verifying tables...');

  try {
    const { data: metadataCheck, error: e1 } = await supabase
      .from('lesson_metadata')
      .select('id')
      .limit(1);

    const { data: sectionsCheck, error: e2 } = await supabase
      .from('lesson_sections')
      .select('id')
      .limit(1);

    const { data: contentCheck, error: e3 } = await supabase
      .from('section_content')
      .select('id')
      .limit(1);

    const { data: examplesCheck, error: e4 } = await supabase
      .from('lesson_examples')
      .select('id')
      .limit(1);

    if (!e1 && !e2 && !e3 && !e4) {
      console.log('     ✅ All 4 tables verified!\n');
      return true;
    } else {
      console.log('     ⚠️  Some tables may not be accessible yet');
      if (e1) console.log(`        lesson_metadata: ${e1.message}`);
      if (e2) console.log(`        lesson_sections: ${e2.message}`);
      if (e3) console.log(`        section_content: ${e3.message}`);
      if (e4) console.log(`        lesson_examples: ${e4.message}`);
      return false;
    }
  } catch (err) {
    console.error('     ❌ Verification failed:', err.message);
    return false;
  }
}

createTables()
  .then(success => {
    if (success) {
      console.log('✅ Tables created successfully!\n');
      console.log('🚀 Next step: Run migration script');
      console.log('   node scripts/migrate-to-modular-lessons.mjs\n');
      process.exit(0);
    } else {
      console.log('\n⚠️  Tables may need manual creation in Supabase SQL Editor');
      console.log('   File: create-modular-tables.sql\n');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('💥 Error:', err);
    process.exit(1);
  });
