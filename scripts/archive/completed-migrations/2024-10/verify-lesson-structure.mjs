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

      // Count H3 sections (numbered major sections)
      const h3Pattern = /<h3[^>]*>\s*\d+\.\s*[^<]+<\/h3>/gi;
      const h3Matches = html.match(h3Pattern) || [];
      const h3Count = h3Matches.length;

      // Count examples (red border H4)
      const examplePattern = /<h4[^>]*border-left:\s*4px\s+solid\s+#b91c1c[^>]*>Example\s+\d+:/gi;
      const exampleMatches = html.match(examplePattern) || [];
      const exampleCount = exampleMatches.length;

      // Count H4 subsections (not examples, not Key Takeaways)
      const h4Pattern = /<h4[^>]*>/gi;
      const allH4Matches = html.match(h4Pattern) || [];
      const h4Count = allH4Matches.length - exampleCount; // Subtract examples

      // Check for Key Takeaways
      const keyTakeawaysPattern = /<h3[^>]*>Key Takeaways<\/h3>/i;
      const hasKeyTakeaways = keyTakeawaysPattern.test(html);

      // Check character count
      const charCount = html.length;

      console.log(`  Title: "${lesson.title}"`);
      console.log(`  Character count: ${charCount}`);
      console.log(`  H3 sections (numbered): ${h3Count}`);
      console.log(`  H4 subsections: ${h4Count}`);
      console.log(`  Examples: ${exampleCount}`);
      console.log(`  Key Takeaways: ${hasKeyTakeaways ? '✓' : '✗'}`);

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
      if (!hasKeyTakeaways) {
        issues.push('⚠️  Missing Key Takeaways section');
      }
      if (charCount < 13000 || charCount > 17000) {
        issues.push(`⚠️  Character count out of range: ${charCount} (should be 13,000-17,000)`);
      }

      if (issues.length === 0) {
        console.log('  ✅ PERFECT STRUCTURE');
      } else {
        console.log('  Issues found:');
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
