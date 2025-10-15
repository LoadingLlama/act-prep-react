import pg from 'pg';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const { Client } = pg;

// Build connection string from Supabase URL
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Extract project ref from URL (e.g., rabavobdklnwvwsldbix)
const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '');

// Construct PostgreSQL connection string
const connectionString = `postgresql://postgres.${projectRef}:${serviceKey}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`;

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
};

async function fixConstraint() {
  const client = new Client({ connectionString });

  try {
    log.info('🔧 Connecting to database...\n');
    await client.connect();
    log.success('Connected!\n');

    // Drop old constraint
    log.info('Dropping old constraint...');
    await client.query('ALTER TABLE quizzes DROP CONSTRAINT IF EXISTS quizzes_lesson_id_fkey');
    log.success('Old constraint dropped\n');

    // Add new constraint
    log.info('Adding new constraint pointing to lesson_metadata...');
    await client.query(`
      ALTER TABLE quizzes
      ADD CONSTRAINT quizzes_lesson_id_fkey
      FOREIGN KEY (lesson_id)
      REFERENCES lesson_metadata(id)
      ON DELETE CASCADE
    `);
    log.success('New constraint added\n');

    // Verify
    log.info('Verifying constraint...');
    const result = await client.query(`
      SELECT
        tc.constraint_name,
        ccu.table_name AS foreign_table_name
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
      WHERE tc.table_name = 'quizzes'
        AND tc.constraint_type = 'FOREIGN KEY'
        AND tc.constraint_name = 'quizzes_lesson_id_fkey'
    `);

    if (result.rows.length > 0) {
      log.success(`Constraint verified: quizzes.lesson_id -> ${result.rows[0].foreign_table_name}.id\n`);
    }

    log.success('🎉 Database constraint fixed successfully!');
    log.info('You can now run: node scripts/fix-and-update-quizzes.mjs');

  } catch (error) {
    log.error(`Failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

fixConstraint();
