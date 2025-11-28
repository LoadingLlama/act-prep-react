require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSchema() {
  console.log('\n🔍 Checking diagnostic_test_results schema\n');

  const { data, error } = await supabase.rpc('exec_sql', {
    sql: `
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'diagnostic_test_results'
      ORDER BY ordinal_position;
    `
  });

  if (error) {
    console.error('❌ Error:', error);

    // Fallback: try direct query
    const { data: columns, error: err2 } = await supabase
      .from('diagnostic_test_results')
      .select('*')
      .limit(1);

    console.log('Sample row structure:', columns);
  } else {
    console.log('📋 Schema:');
    console.table(data);
  }

  // Check constraints
  console.log('\n🔒 Checking constraints...\n');

  const constraintQuery = await supabase.rpc('exec_sql', {
    sql: `
      SELECT
        conname as constraint_name,
        contype as constraint_type,
        pg_get_constraintdef(oid) as definition
      FROM pg_constraint
      WHERE conrelid = 'diagnostic_test_results'::regclass;
    `
  });

  if (!constraintQuery.error) {
    console.table(constraintQuery.data);
  }
}

checkSchema()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });
