#!/usr/bin/env node

/**
 * Execute SQL directly via Supabase REST API
 */

import dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

console.log('🔨 Creating modular tables via REST API...\n');

async function executeSql(sql) {
  const url = `${supabaseUrl}/rest/v1/rpc/exec_sql`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    },
    body: JSON.stringify({ query: sql })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  return response.json();
}

async function createTablesSequentially() {
  const statements = [
    // Table 1: lesson_metadata
    `CREATE TABLE IF NOT EXISTS lesson_metadata (
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
    )`,

    // Indexes for lesson_metadata
    `CREATE INDEX IF NOT EXISTS idx_lesson_metadata_key ON lesson_metadata(lesson_key)`,
    `CREATE INDEX IF NOT EXISTS idx_lesson_metadata_subject ON lesson_metadata(subject)`,

    // Table 2: lesson_sections
    `CREATE TABLE IF NOT EXISTS lesson_sections (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
      section_key VARCHAR(100) NOT NULL,
      title VARCHAR(255) NOT NULL,
      section_type VARCHAR(50) NOT NULL,
      order_index INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(lesson_id, section_key)
    )`,

    // Indexes for lesson_sections
    `CREATE INDEX IF NOT EXISTS idx_lesson_sections_lesson_id ON lesson_sections(lesson_id)`,

    // Table 3: section_content
    `CREATE TABLE IF NOT EXISTS section_content (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      section_id UUID REFERENCES lesson_sections(id) ON DELETE CASCADE,
      content_type VARCHAR(50) NOT NULL DEFAULT 'html',
      content TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      metadata JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,

    // Indexes for section_content
    `CREATE INDEX IF NOT EXISTS idx_section_content_section_id ON section_content(section_id)`,

    // Table 4: lesson_examples
    `CREATE TABLE IF NOT EXISTS lesson_examples (
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
    )`,

    // Indexes for lesson_examples
    `CREATE INDEX IF NOT EXISTS idx_lesson_examples_lesson_id ON lesson_examples(lesson_id)`,

    // Enable RLS
    `ALTER TABLE lesson_metadata ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE lesson_sections ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE section_content ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE lesson_examples ENABLE ROW LEVEL SECURITY`,

    // Create policies
    `DROP POLICY IF EXISTS "Allow public read" ON lesson_metadata`,
    `DROP POLICY IF EXISTS "Allow public read" ON lesson_sections`,
    `DROP POLICY IF EXISTS "Allow public read" ON section_content`,
    `DROP POLICY IF EXISTS "Allow public read" ON lesson_examples`,

    `CREATE POLICY "Allow public read" ON lesson_metadata FOR SELECT USING (true)`,
    `CREATE POLICY "Allow public read" ON lesson_sections FOR SELECT USING (true)`,
    `CREATE POLICY "Allow public read" ON section_content FOR SELECT USING (true)`,
    `CREATE POLICY "Allow public read" ON lesson_examples FOR SELECT USING (true)`
  ];

  console.log(`📝 Executing ${statements.length} SQL statements...\n`);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i].trim();
    const shortName = stmt.substring(0, 60).replace(/\n/g, ' ') + '...';

    process.stdout.write(`  ${i + 1}/${statements.length} ${shortName} `);

    try {
      await executeSql(stmt);
      console.log('✅');
    } catch (err) {
      if (err.message.includes('already exists') || err.message.includes('does not exist')) {
        console.log('⏭️');
      } else {
        console.log('❌');
        console.error(`     Error: ${err.message}`);
      }
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n✅ SQL execution complete!\n');
}

createTablesSequentially()
  .then(() => {
    console.log('🎉 Tables should now be created in Supabase\n');
    console.log('🚀 Next: Run the migration script');
    console.log('   node scripts/migrate-to-modular-lessons.mjs\n');
  })
  .catch(err => {
    console.error('\n💥 Failed:', err.message);
    console.log('\n⚠️  Alternative: Run SQL manually in Supabase');
    console.log('   1. Open: https://rabavobdklnwvwsldbix.supabase.co/project/rabavobdklnwvwsldbix/sql');
    console.log('   2. Copy contents of: create-modular-tables.sql');
    console.log('   3. Click "Run"');
    process.exit(1);
  });
