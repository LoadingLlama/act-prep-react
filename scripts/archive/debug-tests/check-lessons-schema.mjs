#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔍 Checking lessons table schema...\n');

const { data, error } = await supabase
  .from('lessons')
  .select('*')
  .limit(1);

if (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

if (data && data.length > 0) {
  console.log('📋 Columns in lessons table:');
  Object.keys(data[0]).forEach(col => {
    console.log(`   - ${col}`);
  });

  console.log('\n📊 Sample data:');
  console.log(JSON.stringify(data[0], null, 2));
}
