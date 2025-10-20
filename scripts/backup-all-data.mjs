#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function backupAllData() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║    Complete Database Backup (Before Cleanup)     ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupDir = path.join(__dirname, '../backups/database-backup-' + timestamp);

  // Create backup directory
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  console.log(`📁 Backup directory: ${backupDir}\n`);

  const tablesToBackup = [
    'lesson_metadata',
    'lesson_sections',
    'lesson_section_content',
    'section_content',
    'lesson_examples',
    'examples',
    'lesson_term_definitions',
    'term_definitions',
    'quiz_questions',
    'quizzes'
  ];

  let totalRows = 0;
  const backup = {
    timestamp: new Date().toISOString(),
    tables: {}
  };

  for (const table of tablesToBackup) {
    try {
      console.log(`📥 Backing up ${table}...`);

      // Fetch all data
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' });

      if (error) {
        console.log(`   ⏭️  Table does not exist or error: ${error.message}`);
        continue;
      }

      if (data && data.length > 0) {
        backup.tables[table] = {
          rowCount: count || data.length,
          data: data
        };

        // Save individual table backup
        const tablePath = path.join(backupDir, `${table}.json`);
        fs.writeFileSync(tablePath, JSON.stringify(data, null, 2));

        console.log(`   ✅ Backed up ${data.length} rows to ${table}.json`);
        totalRows += data.length;
      } else {
        console.log(`   ⏭️  Table is empty (0 rows)`);
        backup.tables[table] = {
          rowCount: 0,
          data: []
        };
      }
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`);
    }
  }

  // Save complete backup manifest
  const manifestPath = path.join(backupDir, 'backup-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(backup, null, 2));

  // Create backup summary
  const summaryPath = path.join(backupDir, 'BACKUP_SUMMARY.md');
  let summary = '# Database Backup Summary\n\n';
  summary += `**Date:** ${new Date().toISOString()}\n`;
  summary += `**Total Rows Backed Up:** ${totalRows}\n\n`;
  summary += '## Tables Backed Up:\n\n';

  for (const [table, info] of Object.entries(backup.tables)) {
    summary += `- **${table}**: ${info.rowCount} rows\n`;
  }

  summary += '\n## Files:\n\n';
  summary += '- `backup-manifest.json` - Complete backup with all tables\n';
  for (const table of Object.keys(backup.tables)) {
    summary += `- \`${table}.json\` - Individual table backup\n`;
  }

  summary += '\n## Restoration:\n\n';
  summary += 'To restore from this backup, use the restore script:\n\n';
  summary += '```bash\n';
  summary += `node scripts/restore-from-backup.mjs ${backupDir}\n`;
  summary += '```\n';

  fs.writeFileSync(summaryPath, summary);

  console.log('\n' + '═'.repeat(60));
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║           BACKUP COMPLETED SUCCESSFULLY!          ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');
  console.log(`✅ Total rows backed up: ${totalRows}`);
  console.log(`📁 Backup location: ${backupDir}`);
  console.log(`📄 Summary: BACKUP_SUMMARY.md\n`);

  return backupDir;
}

backupAllData().catch(err => {
  console.error('❌ Backup failed:', err);
  process.exit(1);
});
