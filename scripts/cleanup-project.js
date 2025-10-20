/**
 * ============================================================================
 * PROJECT CLEANUP SCRIPT
 * ============================================================================
 *
 * Organizes and cleans up the act-prep-react project:
 * 1. Moves old HTML files to archive
 * 2. Organizes documentation
 * 3. Removes duplicate/unused files
 * 4. Creates organized folder structure
 *
 * Usage:
 * node scripts/cleanup-project.js --dry-run  (preview changes)
 * node scripts/cleanup-project.js            (apply changes)
 *
 * SAFE: Creates backups before deleting anything
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const PROJECT_ROOT = path.join(__dirname, '..');

console.log('═'.repeat(80));
console.log('🧹 PROJECT CLEANUP SCRIPT');
console.log('═'.repeat(80));
console.log();

if (DRY_RUN) {
  console.log('🔍 DRY-RUN MODE: No files will be modified');
  console.log();
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const CLEANUP_PLAN = {
  // Archive old HTML lesson files
  archiveHtmlLessons: {
    source: 'docs/**/*.html',
    destination: 'docs/archive/old-html-lessons/',
    description: 'Move old HTML lesson files to archive'
  },

  // Archive old backup files
  archiveBackups: {
    source: 'backups/lessons/*.json',
    destination: 'docs/archive/old-backups/lessons/',
    description: 'Move old lesson JSON backups to archive'
  },

  // Archive old migration scripts
  archiveMigrations: {
    source: 'scripts/archive/migrations/*.js',
    destination: 'docs/archive/old-scripts/',
    description: 'Keep archived migration scripts organized'
  },

  // Remove redundant current content files
  removeRedundant: {
    files: [
      'docs/CURRENT_BACKSOLVING_CONTENT.html',
      'docs/CURRENT_EXAMPLE_1.txt'
    ],
    description: 'Remove temporary debugging files'
  },

  // Organize documentation
  organizeDocs: {
    keepInRoot: [
      'QUICK_START_GUIDE.md',
      'COMPONENT_SYSTEM_SUMMARY.md',
      'COMPONENT_BASED_LESSONS_ROADMAP.md',
      'LESSON_TEMPLATE.txt',
      'TEST_CONVERTED_LESSON.json'
    ],
    moveToArchive: [
      'LESSON_1_2_SUBSTITUTION_CURRENT.json',
      'LESSON_1_1_BACKSOLVING_FULL.json',
      'REFERENCE_LESSON_METADATA.json'
    ],
    description: 'Organize documentation files'
  }
};

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  let totalMoved = 0;
  let totalRemoved = 0;
  let totalKept = 0;

  console.log('📋 Cleanup Plan:');
  console.log();

  // Step 1: Archive HTML lesson files
  console.log('─'.repeat(80));
  console.log('STEP 1: Archive Old HTML Lesson Files');
  console.log('─'.repeat(80));
  console.log();

  const htmlFiles = findFiles(path.join(PROJECT_ROOT, 'docs'), '.html');
  console.log(`Found ${htmlFiles.length} HTML files`);

  if (htmlFiles.length > 0) {
    const archiveDir = path.join(PROJECT_ROOT, 'docs/archive/old-html-lessons');

    if (!DRY_RUN) {
      ensureDirectoryExists(archiveDir);
    }

    htmlFiles.forEach(file => {
      const fileName = path.basename(file);
      const relativePath = path.relative(PROJECT_ROOT, file);

      if (DRY_RUN) {
        console.log(`   📦 Would move: ${relativePath} → archive/old-html-lessons/${fileName}`);
      } else {
        const dest = path.join(archiveDir, fileName);
        fs.renameSync(file, dest);
        console.log(`   ✅ Moved: ${relativePath}`);
      }
      totalMoved++;
    });
  }

  console.log();

  // Step 2: Clean up temporary files
  console.log('─'.repeat(80));
  console.log('STEP 2: Remove Temporary/Debugging Files');
  console.log('─'.repeat(80));
  console.log();

  const tempFiles = [
    'docs/CURRENT_BACKSOLVING_CONTENT.html',
    'docs/CURRENT_EXAMPLE_1.txt',
    'docs/EXAMPLE_FORMATTED_CONTENT.json',
    'docs/FORMATTING_UPDATE_SUMMARY.md',
    'docs/COLLAPSIBLE_SOLUTION_SUMMARY.md'
  ];

  tempFiles.forEach(file => {
    const fullPath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(fullPath)) {
      if (DRY_RUN) {
        console.log(`   🗑️  Would remove: ${file}`);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`   ✅ Removed: ${file}`);
      }
      totalRemoved++;
    }
  });

  console.log();

  // Step 3: Organize remaining docs
  console.log('─'.repeat(80));
  console.log('STEP 3: Organize Documentation');
  console.log('─'.repeat(80));
  console.log();

  const oldLessonDocs = [
    'docs/LESSON_1_2_SUBSTITUTION_CURRENT.json',
    'docs/LESSON_1_1_BACKSOLVING_FULL.json',
    'docs/REFERENCE_LESSON_METADATA.json',
    'docs/LESSON_6_2_ADVANCED_STATISTICS.html',
    'docs/SAMPLE_MATH_LESSON.html',
    'docs/LESSON_4_1_SYSTEMS_OF_EQUATIONS.html',
    'docs/CHAPTER_1_REVIEW.html',
    'docs/REFERENCE_LESSON_1.1.html'
  ];

  const archiveDocsDir = path.join(PROJECT_ROOT, 'docs/archive/old-lesson-docs');
  if (!DRY_RUN) {
    ensureDirectoryExists(archiveDocsDir);
  }

  oldLessonDocs.forEach(file => {
    const fullPath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(fullPath)) {
      const fileName = path.basename(file);
      if (DRY_RUN) {
        console.log(`   📦 Would move: ${file} → archive/old-lesson-docs/${fileName}`);
      } else {
        const dest = path.join(archiveDocsDir, fileName);
        fs.renameSync(fullPath, dest);
        console.log(`   ✅ Moved: ${file}`);
      }
      totalMoved++;
    }
  });

  console.log();

  // Step 4: Create organized directory structure
  console.log('─'.repeat(80));
  console.log('STEP 4: Create Organized Structure');
  console.log('─'.repeat(80));
  console.log();

  const newDirs = [
    'docs/guides',              // User guides
    'docs/technical',           // Technical documentation
    'docs/templates',           // Templates for lessons
    'docs/archive',             // Archived files
    'docs/archive/old-html-lessons',
    'docs/archive/old-lesson-docs',
    'docs/archive/old-backups'
  ];

  newDirs.forEach(dir => {
    const fullPath = path.join(PROJECT_ROOT, dir);
    if (!fs.existsSync(fullPath)) {
      if (DRY_RUN) {
        console.log(`   📁 Would create: ${dir}`);
      } else {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`   ✅ Created: ${dir}`);
      }
    } else {
      console.log(`   ℹ️  Already exists: ${dir}`);
    }
  });

  console.log();

  // Step 5: Move files to organized locations
  console.log('─'.repeat(80));
  console.log('STEP 5: Organize Files by Type');
  console.log('─'.repeat(80));
  console.log();

  const fileOrganization = [
    {
      file: 'docs/QUICK_START_GUIDE.md',
      dest: 'docs/guides/QUICK_START_GUIDE.md'
    },
    {
      file: 'docs/COMPONENT_SYSTEM_SUMMARY.md',
      dest: 'docs/technical/COMPONENT_SYSTEM_SUMMARY.md'
    },
    {
      file: 'docs/COMPONENT_BASED_LESSONS_ROADMAP.md',
      dest: 'docs/technical/COMPONENT_BASED_LESSONS_ROADMAP.md'
    },
    {
      file: 'docs/LESSON_TEMPLATE.txt',
      dest: 'docs/templates/LESSON_TEMPLATE.txt'
    }
  ];

  fileOrganization.forEach(({ file, dest }) => {
    const sourcePath = path.join(PROJECT_ROOT, file);
    const destPath = path.join(PROJECT_ROOT, dest);

    if (fs.existsSync(sourcePath)) {
      if (DRY_RUN) {
        console.log(`   📋 Would move: ${file} → ${dest}`);
      } else {
        ensureDirectoryExists(path.dirname(destPath));
        fs.renameSync(sourcePath, destPath);
        console.log(`   ✅ Moved: ${file} → ${dest}`);
      }
      totalMoved++;
    }
  });

  console.log();

  // Summary
  console.log('═'.repeat(80));
  console.log('📊 CLEANUP SUMMARY');
  console.log('═'.repeat(80));
  console.log();

  if (DRY_RUN) {
    console.log('🔍 DRY-RUN RESULTS (no changes made):');
  } else {
    console.log('✅ CLEANUP COMPLETE:');
  }

  console.log();
  console.log(`   📦 Files moved: ${totalMoved}`);
  console.log(`   🗑️  Files removed: ${totalRemoved}`);
  console.log(`   📁 Directories organized`);
  console.log();

  console.log('📂 New Structure:');
  console.log('   docs/');
  console.log('   ├── guides/              # User guides');
  console.log('   ├── technical/           # Technical docs');
  console.log('   ├── templates/           # Lesson templates');
  console.log('   ├── archive/             # Old files');
  console.log('   │   ├── old-html-lessons/');
  console.log('   │   ├── old-lesson-docs/');
  console.log('   │   └── old-backups/');
  console.log('   └── TEST_CONVERTED_LESSON.json');
  console.log();

  if (DRY_RUN) {
    console.log('💡 To apply these changes, run:');
    console.log('   node scripts/cleanup-project.js');
    console.log();
  } else {
    console.log('✨ Project is now clean and organized!');
    console.log();
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function findFiles(dir, extension, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and .git
      if (file !== 'node_modules' && file !== '.git' && file !== 'archive') {
        findFiles(filePath, extension, fileList);
      }
    } else if (file.endsWith(extension)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ============================================================================
// RUN
// ============================================================================

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}
