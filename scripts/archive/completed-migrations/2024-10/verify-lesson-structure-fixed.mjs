import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessonKeys = ['3.4', '3.5', '3.6'];

/**
 * Verify lesson structure matches the template
 */
async function verifyStructure() {
  console.log('\n🔍 VERIFYING LESSON STRUCTURE');
  console.log('='.repeat(80));

  for (const key of lessonKeys) {
    try {
      console.log(`\n📝 Lesson ${key}:`);

      // Get lesson
      const { data: lesson } = await supabase
        .from('lesson_metadata')
        .select('id, title')
        .eq('lesson_key', key)
        .single();

      if (!lesson) {
        console.error(`  ✗ Lesson ${key} not found`);
        continue;
      }

      // Get section
      const { data: section } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', lesson.id)
        .eq('section_key', `${key}-main`)
        .single();

      if (!section) {
        console.error(`  ✗ Section not found`);
        continue;
      }

      // Get content
      const { data: content } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_id', section.id)
        .eq('content_type', 'html')
        .single();

      if (!content) {
        console.error(`  ✗ Content not found`);
        continue;
      }

      const html = content.content;

      // Count H3 sections (numbered major sections) - allow whitespace
      const h3Pattern = /<h3[^>]*>\s*\d+\.\s*[^<]+<\/h3>/gi;
      const h3Matches = html.match(h3Pattern) || [];
      const h3Count = h3Matches.length;

      // Count examples - just count "Example 1", "Example 2", etc.
      const exampleMatches = html.match(/Example \d+:/gi) || [];
      const exampleCount = exampleMatches.length;

      // Count red borders (should match examples)
      const redBorderMatches = html.match(/border-left:\s*4px\s+solid\s+#b91c1c/gi) || [];
      const redBorderCount = redBorderMatches.length;

      // Count H4 subsections (all H4 tags)
      const h4Pattern = /<h4[^>]*>/gi;
      const allH4Matches = html.match(h4Pattern) || [];
      const totalH4Count = allH4Matches.length;
      const h4SubsectionCount = totalH4Count - exampleCount; // Subtract examples

      // Check for Key Takeaways
      const hasKeyTakeaways = /Key Takeaways/i.test(html);

      // Check for green checkmarks in Key Takeaways
      const greenCheckmarkCount = (html.match(/color:\s*#4caf50/gi) || []).length;

      // Check character count
      const charCount = html.length;

      console.log(`  Title: "${lesson.title}"`);
      console.log(`  Character count: ${charCount}`);
      console.log(`  H3 sections (numbered): ${h3Count}`);
      console.log(`  H4 subsections (excluding examples): ${h4SubsectionCount}`);
      console.log(`  Examples: ${exampleCount}`);
      console.log(`  Red borders: ${redBorderCount}`);
      console.log(`  Key Takeaways: ${hasKeyTakeaways ? '✓' : '✗'}`);
      console.log(`  Green checkmarks: ${greenCheckmarkCount}`);

      // Validate against template
      const issues = [];
      if (h3Count !== exampleCount) {
        issues.push(`⚠️  GOLDEN RULE VIOLATION: ${h3Count} H3 sections but ${exampleCount} examples (should be equal)`);
      }
      if (h3Count < 3 || h3Count > 5) {
        issues.push(`⚠️  H3 count out of range: ${h3Count} (should be 3-5)`);
      }
      if (exampleCount < 3 || exampleCount > 5) {
        issues.push(`⚠️  Example count out of range: ${exampleCount} (should be 3-5)`);
      }
      if (exampleCount !== redBorderCount) {
        issues.push(`⚠️  Example count (${exampleCount}) doesn't match red borders (${redBorderCount})`);
      }
      if (!hasKeyTakeaways) {
        issues.push('⚠️  Missing Key Takeaways section');
      }
      if (greenCheckmarkCount < 4 || greenCheckmarkCount > 6) {
        issues.push(`⚠️  Key Takeaways should have 4-6 bullets, found ${greenCheckmarkCount}`);
      }
      if (charCount < 13000 || charCount > 17000) {
        issues.push(`⚠️  Character count slightly out of range: ${charCount} (ideal: 13,000-17,000)`);
      }

      if (issues.length === 0) {
        console.log('  ✅ PERFECT STRUCTURE - Matches template exactly!');
      } else {
        console.log('  Status:');
        issues.forEach(issue => console.log(`    ${issue}`));
      }

    } catch (error) {
      console.error(`✗ Error verifying lesson ${key}:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('✓ Verification complete\n');
}

verifyStructure();
