#!/usr/bin/env node

/**
 * Add multiple image_url columns to science passages table
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addImageColumns() {
  console.log('🔧 Adding multiple image_url columns...\n');

  // SQL to add up to 5 image URL columns per passage
  const sql = `
    -- Add image_url columns to science passages (most passages have 1-3 tables/figures)
    ALTER TABLE practice_test_science_passages
    ADD COLUMN IF NOT EXISTS image_url_1 TEXT,
    ADD COLUMN IF NOT EXISTS image_url_2 TEXT,
    ADD COLUMN IF NOT EXISTS image_url_3 TEXT,
    ADD COLUMN IF NOT EXISTS image_url_4 TEXT,
    ADD COLUMN IF NOT EXISTS image_url_5 TEXT;

    -- Also add to reading passages (for future use)
    ALTER TABLE practice_test_reading_passages
    ADD COLUMN IF NOT EXISTS image_url_1 TEXT,
    ADD COLUMN IF NOT EXISTS image_url_2 TEXT,
    ADD COLUMN IF NOT EXISTS image_url_3 TEXT;

    -- Also add to english passages (for future use)
    ALTER TABLE practice_test_english_passages
    ADD COLUMN IF NOT EXISTS image_url_1 TEXT,
    ADD COLUMN IF NOT EXISTS image_url_2 TEXT;
  `;

  console.log('📋 Please run this SQL in your Supabase SQL Editor:\n');
  console.log(sql);
  console.log('\n✅ After running this SQL, you can update passages with image URLs');
  console.log('\nExample update:');
  console.log(`
await supabase
  .from('practice_test_science_passages')
  .update({
    image_url_1: 'https://your-url/table1.png',
    image_url_2: 'https://your-url/table2.png',
    image_url_3: 'https://your-url/figure1.png'
  })
  .eq('test_number', 1)
  .eq('passage_number', 1);
  `);
}

addImageColumns().then(() => process.exit(0));
