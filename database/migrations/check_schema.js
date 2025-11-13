/**
 * Check the actual schema of the lessons table
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function checkSchema() {
  try {
    console.log('🔍 Checking lessons table schema...\n');

    // Get one lesson to see all columns
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error:', error.message);
      return;
    }

    if (data && data.length > 0) {
      const lesson = data[0];
      console.log('📋 Columns in lessons table:');
      Object.keys(lesson).forEach(key => {
        const value = lesson[key];
        const type = typeof value;
        const preview = value ? String(value).substring(0, 50) : 'null';
        console.log(`   - ${key}: ${type} (${preview}${String(value).length > 50 ? '...' : ''})`);
      });
    }

    console.log('\n📊 Total lessons:', data.length > 0 ? 'exists' : 'none');

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
  }
}

checkSchema();
