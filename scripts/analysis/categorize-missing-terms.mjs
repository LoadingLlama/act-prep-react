import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Categorizes missing terms into groups
 */
function categorizeTerm(term) {
  // Section headers/labels (contain ":", numbers, or specific patterns)
  if (
    /^(Skill|Step|Method|Reminder|Example|Minute|However|Critical Strategy|Why this matters|Recommended approach|Introduction|Viewpoint|Understanding|Comparing|Evaluating|Weakening|Identify|Note|What would|For each|Go straight|Skim|Choose NO CHANGE):/.test(term) ||
    /^\d+\.\s/.test(term) || // Starts with number followed by dot
    /^→/.test(term) || // Arrow symbols
    term.includes('questions)') || // Question count ranges
    term.includes('minutes:') ||
    /^(Common|Different|Quick|Slower)\s/.test(term) && term.endsWith(':')
  ) {
    return 'structural';
  }

  // Long instructional phrases (> 6 words or contain specific action verbs)
  const wordCount = term.split(/\s+/).length;
  if (
    wordCount > 6 ||
    /^(read|plug|cross|write|check|find|work|try|complete|always pick|only consider)/.test(term.toLowerCase()) ||
    term.includes('if you') ||
    term.includes('when to') ||
    term.includes('how to')
  ) {
    return 'instruction';
  }

  // Bracketed numbers or list markers
  if (term.includes('[1]') || term.includes('[2]') || term.includes('[3]') || /^\d+\.$/.test(term)) {
    return 'list_marker';
  }

  // Short descriptive labels (1-4 words, ends with colon)
  if (wordCount <= 4 && term.endsWith(':')) {
    return 'label';
  }

  // Likely legitimate concepts that need definitions (1-5 words, no special patterns)
  if (wordCount <= 5 && !term.includes(':') && !term.startsWith('→')) {
    return 'concept';
  }

  // Everything else
  return 'unclear';
}

async function analyzeAndCategorizeMissingTerms() {
  console.log('📊 CATEGORIZING MISSING TERM DEFINITIONS\n');

  // Fetch existing definitions
  const { data: definitions } = await supabase
    .from('lesson_term_definitions')
    .select('term');

  const existingTerms = new Set(definitions.map(d => d.term));

  // Fetch all lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('lesson_key, title, content, content_json');

  // Extract all blue underlined terms
  const allTermsInLessons = new Set();
  const regex = /<strong[^>]*style="[^"]*color:\s*#2563eb[^"]*text-decoration:\s*underline[^"]*"[^>]*>(.*?)<\/strong>/gi;

  for (const lesson of lessons) {
    const content = lesson.content_json || lesson.content || '';
    let match;
    while ((match = regex.exec(content)) !== null) {
      const term = match[1].trim();
      if (term) {
        allTermsInLessons.add(term);
      }
    }
  }

  // Find missing terms
  const missingTerms = Array.from(allTermsInLessons).filter(term => !existingTerms.has(term));

  // Categorize
  const categories = {
    structural: [],
    label: [],
    instruction: [],
    list_marker: [],
    concept: [],
    unclear: []
  };

  for (const term of missingTerms) {
    const category = categorizeTerm(term);
    categories[category].push(term);
  }

  // Display results
  console.log(`${'='.repeat(80)}`);
  console.log(`📋 CATEGORY ANALYSIS`);
  console.log(`${'='.repeat(80)}\n`);

  console.log(`Total missing terms: ${missingTerms.length}\n`);

  // 1. Structural elements (should NOT be blue underlined)
  console.log(`${'='.repeat(80)}`);
  console.log(`🏗️  STRUCTURAL ELEMENTS (${categories.structural.length})`);
  console.log(`Recommendation: Remove blue underline styling - these are section headers`);
  console.log(`${'='.repeat(80)}\n`);
  categories.structural.sort().forEach(term => console.log(`  • "${term}"`));

  // 2. Labels (should probably NOT be blue underlined)
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🏷️  LABELS (${categories.label.length})`);
  console.log(`Recommendation: Remove blue underline styling - these are just labels`);
  console.log(`${'='.repeat(80)}\n`);
  categories.label.sort().forEach(term => console.log(`  • "${term}"`));

  // 3. Instructions (should NOT be blue underlined)
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📝 INSTRUCTIONAL PHRASES (${categories.instruction.length})`);
  console.log(`Recommendation: Remove blue underline styling - these are instructions, not terms`);
  console.log(`${'='.repeat(80)}\n`);
  categories.instruction.sort().forEach(term => console.log(`  • "${term}"`));

  // 4. List markers (should NOT be blue underlined)
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🔢 LIST MARKERS (${categories.list_marker.length})`);
  console.log(`Recommendation: Remove blue underline styling - these are list/reference markers`);
  console.log(`${'='.repeat(80)}\n`);
  categories.list_marker.sort().forEach(term => console.log(`  • "${term}"`));

  // 5. Legitimate concepts (NEED definitions)
  console.log(`\n${'='.repeat(80)}`);
  console.log(`✅ LEGITIMATE CONCEPTS (${categories.concept.length})`);
  console.log(`Recommendation: Add definitions to lesson_term_definitions table`);
  console.log(`${'='.repeat(80)}\n`);
  categories.concept.sort().forEach(term => console.log(`  • "${term}"`));

  // 6. Unclear (needs manual review)
  console.log(`\n${'='.repeat(80)}`);
  console.log(`❓ UNCLEAR (${categories.unclear.length})`);
  console.log(`Recommendation: Manual review needed`);
  console.log(`${'='.repeat(80)}\n`);
  categories.unclear.sort().forEach(term => console.log(`  • "${term}"`));

  // Summary
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📊 SUMMARY`);
  console.log(`${'='.repeat(80)}\n`);

  const shouldRemoveStyling = categories.structural.length + categories.label.length +
                               categories.instruction.length + categories.list_marker.length;
  const needDefinitions = categories.concept.length;
  const needReview = categories.unclear.length;

  console.log(`Terms that should NOT be styled (remove blue underline): ${shouldRemoveStyling}`);
  console.log(`Terms that NEED definitions added: ${needDefinitions}`);
  console.log(`Terms that need manual review: ${needReview}`);
  console.log(`\nTotal missing: ${missingTerms.length}`);
  console.log(`${'='.repeat(80)}\n`);
}

analyzeAndCategorizeMissingTerms().catch(console.error);
