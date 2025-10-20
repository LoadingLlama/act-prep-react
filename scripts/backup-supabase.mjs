#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function backupDatabase() {
  console.log('=========================================');
  console.log('ACT Prep Database Backup (Supabase API)');
  console.log('=========================================');
  console.log('Timestamp:', new Date().toISOString());
  console.log('');

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const backupDir = path.join(__dirname, '../backups');

  // Create backup directory
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const backup = {
    metadata: {
      timestamp: new Date().toISOString(),
      database: 'ACT Prep Application',
      version: '1.0'
    },
    data: {}
  };

  try {
    // Backup lesson_metadata
    console.log('📦 Backing up lesson_metadata...');
    const { data: metadata, error: metadataError } = await supabase
      .from('lesson_metadata')
      .select('*')
      .order('lesson_key');

    if (metadataError) throw metadataError;
    backup.data.lesson_metadata = metadata;
    console.log(`✅ Backed up ${metadata.length} lesson metadata records`);

    // Backup lesson_sections
    console.log('📦 Backing up lesson_sections...');
    const { data: sections, error: sectionsError } = await supabase
      .from('lesson_sections')
      .select('*')
      .order('lesson_id, order_index');

    if (sectionsError) throw sectionsError;
    backup.data.lesson_sections = sections;
    console.log(`✅ Backed up ${sections.length} lesson section records`);

    // Backup section_content
    console.log('📦 Backing up section_content...');
    const { data: content, error: contentError } = await supabase
      .from('lesson_section_content')
      .select('*')
      .order('section_id, order_index');

    if (contentError) throw contentError;
    backup.data.section_content = content;
    console.log(`✅ Backed up ${content.length} section content records`);

    // Calculate total content size
    const totalChars = content.reduce((sum, item) => sum + (item.content?.length || 0), 0);
    console.log(`📊 Total content: ${(totalChars / 1000000).toFixed(2)} million characters`);

    // Save as JSON
    const jsonFile = path.join(backupDir, `actprep_backup_${timestamp}.json`);
    fs.writeFileSync(jsonFile, JSON.stringify(backup, null, 2));
    const jsonSize = (fs.statSync(jsonFile).size / 1024 / 1024).toFixed(2);
    console.log('');
    console.log(`✅ JSON backup saved: ${jsonFile}`);
    console.log(`   Size: ${jsonSize} MB`);

    // Save as SQL (for easy restore)
    console.log('');
    console.log('📦 Creating SQL backup...');
    let sql = '-- ACT Prep Database Backup\n';
    sql += `-- Created: ${new Date().toISOString()}\n`;
    sql += `-- Total lessons: ${metadata.length}\n\n`;

    sql += '-- Clear existing data\n';
    sql += 'TRUNCATE TABLE section_content CASCADE;\n';
    sql += 'TRUNCATE TABLE lesson_sections CASCADE;\n';
    sql += 'TRUNCATE TABLE lesson_metadata CASCADE;\n\n';

    sql += '-- Restore lesson_metadata\n';
    metadata.forEach(row => {
      const lessonKey = (row.lesson_key || '').replace(/'/g, "''");
      const title = (row.title || '').replace(/'/g, "''");
      const subject = row.subject || 'unknown';
      const values = [
        row.id,
        `'${lessonKey}'`,
        `'${title}'`,
        `'${subject}'`,
        row.order_index || 0,
        row.created_at ? `'${row.created_at}'` : 'NOW()',
        row.updated_at ? `'${row.updated_at}'` : 'NOW()'
      ].join(', ');
      sql += `INSERT INTO lesson_metadata (id, lesson_key, title, subject, order_index, created_at, updated_at) VALUES (${values});\n`;
    });

    sql += '\n-- Restore lesson_sections\n';
    sections.forEach(row => {
      const sectionTitle = (row.section_title || '').replace(/'/g, "''");
      const values = [
        row.id,
        row.lesson_id,
        `'${sectionTitle}'`,
        row.order_index || 0,
        row.created_at ? `'${row.created_at}'` : 'NOW()',
        row.updated_at ? `'${row.updated_at}'` : 'NOW()'
      ].join(', ');
      sql += `INSERT INTO lesson_sections (id, lesson_id, section_title, order_index, created_at, updated_at) VALUES (${values});\n`;
    });

    sql += '\n-- Restore section_content\n';
    content.forEach(row => {
      const contentEscaped = row.content ? row.content.replace(/'/g, "''").replace(/\\/g, '\\\\') : '';
      const values = [
        row.id,
        row.section_id,
        `'${contentEscaped}'`,
        row.order_index,
        row.created_at ? `'${row.created_at}'` : 'NOW()',
        row.updated_at ? `'${row.updated_at}'` : 'NOW()'
      ].join(', ');
      sql += `INSERT INTO section_content (id, section_id, content, order_index, created_at, updated_at) VALUES (${values});\n`;
    });

    const sqlFile = path.join(backupDir, `actprep_backup_${timestamp}.sql`);
    fs.writeFileSync(sqlFile, sql);
    const sqlSize = (fs.statSync(sqlFile).size / 1024 / 1024).toFixed(2);
    console.log(`✅ SQL backup saved: ${sqlFile}`);
    console.log(`   Size: ${sqlSize} MB`);

    console.log('');
    console.log('=========================================');
    console.log('✅ Backup completed successfully!');
    console.log('=========================================');
    console.log('');
    console.log('Summary:');
    console.log(`  - ${metadata.length} lessons`);
    console.log(`  - ${sections.length} sections`);
    console.log(`  - ${content.length} content blocks`);
    console.log(`  - ${(totalChars / 1000000).toFixed(2)} million characters`);
    console.log('');
    console.log('Files created:');
    console.log(`  - ${jsonFile}`);
    console.log(`  - ${sqlFile}`);

  } catch (error) {
    console.error('');
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

backupDatabase();
