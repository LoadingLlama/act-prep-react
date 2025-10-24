import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('🔒 Creating Multi-Layer Backup System...\n');

// 1. Fetch all data
console.log('📥 Fetching all lessons and examples...');
const { data: lessons } = await supabase
  .from('lessons')
  .select('*')
  .order('subject', { ascending: true })
  .order('order_index', { ascending: true });

const { data: examples } = await supabase
  .from('lesson_examples')
  .select('*')
  .order('lesson_id', { ascending: true })
  .order('position', { ascending: true });

console.log(`✓ Fetched ${lessons.length} lessons and ${examples.length} examples\n`);

// 2. Create backup directory
const backupDir = 'backups';
const timestamp = new Date().toISOString().split('T')[0];

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// 3. JSON Backup (Complete Database)
console.log('📦 Layer 1: JSON Database Backup...');
const jsonBackup = {
  created_at: new Date().toISOString(),
  database: 'rabavobdklnwvwsldbix.supabase.co',
  stats: {
    total_lessons: lessons.length,
    total_examples: examples.length,
    by_subject: lessons.reduce((acc, l) => {
      acc[l.subject] = (acc[l.subject] || 0) + 1;
      return acc;
    }, {})
  },
  lessons: lessons,
  examples: examples
};

const jsonPath = path.join(backupDir, `database-backup-${timestamp}.json`);
fs.writeFileSync(jsonPath, JSON.stringify(jsonBackup, null, 2));
console.log(`  ✓ Saved: ${jsonPath}`);
console.log(`  📊 Size: ${(fs.statSync(jsonPath).size / 1024 / 1024).toFixed(2)} MB\n`);

// 4. Individual HTML Exports by Subject
console.log('📄 Layer 2: Individual HTML Lesson Exports...');
const htmlDir = path.join(backupDir, 'html-lessons');
if (!fs.existsSync(htmlDir)) {
  fs.mkdirSync(htmlDir, { recursive: true });
}

const subjects = ['english', 'math', 'reading', 'science'];
let htmlCount = 0;

for (const subject of subjects) {
  const subjectDir = path.join(htmlDir, subject);
  if (!fs.existsSync(subjectDir)) {
    fs.mkdirSync(subjectDir, { recursive: true });
  }

  const subjectLessons = lessons.filter(l => l.subject === subject);

  for (const lesson of subjectLessons) {
    const filename = `${lesson.lesson_key}.html`;
    const filepath = path.join(subjectDir, filename);
    fs.writeFileSync(filepath, lesson.content || '');
    htmlCount++;
  }
}

console.log(`  ✓ Saved ${htmlCount} HTML files to ${htmlDir}\n`);

// 5. Examples JSON by Lesson
console.log('📝 Layer 3: Examples Backup by Lesson...');
const examplesDir = path.join(backupDir, 'examples-by-lesson');
if (!fs.existsSync(examplesDir)) {
  fs.mkdirSync(examplesDir, { recursive: true });
}

const examplesByLesson = examples.reduce((acc, ex) => {
  if (!acc[ex.lesson_id]) {
    acc[ex.lesson_id] = [];
  }
  acc[ex.lesson_id].push(ex);
  return acc;
}, {});

let exampleFileCount = 0;
for (const [lessonId, lessonExamples] of Object.entries(examplesByLesson)) {
  const lesson = lessons.find(l => l.id === lessonId);
  if (lesson) {
    const filename = `${lesson.lesson_key}-examples.json`;
    const filepath = path.join(examplesDir, filename);
    fs.writeFileSync(filepath, JSON.stringify({
      lesson_key: lesson.lesson_key,
      lesson_title: lesson.title,
      examples: lessonExamples
    }, null, 2));
    exampleFileCount++;
  }
}

console.log(`  ✓ Saved ${exampleFileCount} example files to ${examplesDir}\n`);

// 6. Create Restore Script
console.log('🔧 Layer 4: Creating Restore Script...');
const restoreScriptContent = `import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// RESTORE SCRIPT - Use this to restore backup to a Supabase instance
// Usage: node restore-from-backup.mjs <SUPABASE_URL> <SUPABASE_SERVICE_KEY>

const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.error('Usage: node restore-from-backup.mjs <SUPABASE_URL> <SUPABASE_SERVICE_KEY>');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function restore() {
  console.log('🔄 Restoring database from backup...');

  const backup = JSON.parse(fs.readFileSync('backups/database-backup-${timestamp}.json', 'utf8'));

  console.log(\`📊 Backup contains \${backup.lessons.length} lessons and \${backup.examples.length} examples\`);
  console.log(\`📅 Backup created: \${backup.created_at}\`);

  // Restore lessons
  console.log('\\n📚 Restoring lessons...');
  for (const lesson of backup.lessons) {
    const { id, created_at, updated_at, ...lessonData } = lesson;
    const { error } = await supabase
      .from('lessons')
      .upsert(lessonData, { onConflict: 'lesson_key' });

    if (error) {
      console.error(\`  ❌ Error restoring \${lesson.lesson_key}: \${error.message}\`);
    } else {
      console.log(\`  ✓ Restored: \${lesson.lesson_key}\`);
    }
  }

  console.log('\\n✅ Restore complete!');
  console.log('Note: Examples must be re-uploaded using lesson-specific scripts due to ID mapping.');
}

restore();
`;

const restorePath = path.join(backupDir, 'restore-from-backup.mjs');
fs.writeFileSync(restorePath, restoreScriptContent);
console.log(`  ✓ Saved: ${restorePath}\n`);

// 7. Create README
console.log('📖 Layer 5: Creating Backup Documentation...');
const readme = `# Database Backup - ${new Date().toLocaleDateString()}

## Backup Statistics
- **Created:** ${new Date().toISOString()}
- **Source:** rabavobdklnwvwsldbix.supabase.co
- **Total Lessons:** ${lessons.length}
- **Total Examples:** ${examples.length}

### Breakdown by Subject
${Object.entries(jsonBackup.stats.by_subject).map(([subject, count]) => `- **${subject}:** ${count} lessons`).join('\n')}

## Backup Layers

### 1. Complete JSON Database (\`database-backup-${timestamp}.json\`)
Full database export including all lessons, examples, and metadata.
Size: ${(fs.statSync(jsonPath).size / 1024 / 1024).toFixed(2)} MB

### 2. Individual HTML Lessons (\`html-lessons/\`)
Each lesson's HTML content saved as individual files, organized by subject:
- english/ (${lessons.filter(l => l.subject === 'english').length} files)
- math/ (${lessons.filter(l => l.subject === 'math').length} files)
- reading/ (${lessons.filter(l => l.subject === 'reading').length} files)
- science/ (${lessons.filter(l => l.subject === 'science').length} files)

### 3. Examples by Lesson (\`examples-by-lesson/\`)
JSON files containing examples for each lesson (${exampleFileCount} files)

### 4. Restore Script (\`restore-from-backup.mjs\`)
Automated script to restore backup to any Supabase instance.

Usage:
\`\`\`bash
node restore-from-backup.mjs <SUPABASE_URL> <SERVICE_KEY>
\`\`\`

## How to Use This Backup

### Quick Recovery (Individual Files)
Browse \`html-lessons/\` to view any lesson's HTML content directly.

### Full Database Restore
1. Create new Supabase project or have target credentials ready
2. Run: \`node restore-from-backup.mjs <URL> <KEY>\`
3. Examples will need to be re-uploaded using lesson-specific scripts

### Git Version Control
This backup is committed to git for additional redundancy on GitHub.

## Backup Verification
- ✓ All ${lessons.length} lessons exported
- ✓ All ${examples.length} examples saved
- ✓ HTML files created
- ✓ Restore script generated
- ✓ Multi-layer redundancy established
`;

const readmePath = path.join(backupDir, 'README.md');
fs.writeFileSync(readmePath, readme);
console.log(`  ✓ Saved: ${readmePath}\n`);

// Summary
console.log('═'.repeat(60));
console.log('✅ MULTI-LAYER BACKUP COMPLETE');
console.log('═'.repeat(60));
console.log(`📁 Backup Directory: ${backupDir}/`);
console.log('');
console.log('🔒 Backup Layers:');
console.log(`  1. JSON Database Backup (${(fs.statSync(jsonPath).size / 1024).toFixed(0)} KB)`);
console.log(`  2. HTML Lessons (${htmlCount} files)`);
console.log(`  3. Examples by Lesson (${exampleFileCount} files)`);
console.log('  4. Restore Script');
console.log('  5. Documentation (README.md)');
console.log('');
console.log('📝 Next Step: Commit to git for GitHub backup');
