#!/usr/bin/env node

/**
 * Add image_urls JSONB column to science passages table
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addImageUrlsColumn() {
  console.log('🔧 Adding image_urls column to practice_test_science_passages...\n');

  // Note: This SQL needs to be run directly in Supabase SQL Editor
  const sql = `
    -- Add image_urls JSONB column if it doesn't exist
    ALTER TABLE practice_test_science_passages
    ADD COLUMN IF NOT EXISTS image_urls JSONB;

    -- Also add to reading passages (for future use)
    ALTER TABLE practice_test_reading_passages
    ADD COLUMN IF NOT EXISTS image_urls JSONB;

    -- Also add to english passages (for future use)
    ALTER TABLE practice_test_english_passages
    ADD COLUMN IF NOT EXISTS image_urls JSONB;
  `;

  console.log('📋 Please run this SQL in your Supabase SQL Editor:\n');
  console.log(sql);
  console.log('\n✅ After running this SQL, you can use the update-passage-images.mjs script to add image URLs');
}

addImageUrlsColumn().then(() => process.exit(0));
