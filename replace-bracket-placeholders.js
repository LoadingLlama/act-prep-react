const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate actual paragraph content based on bracket description
function generateParagraphFromBracket(bracketText, followingText = '') {
  const bracket = bracketText.toLowerCase();

  // Map common bracket patterns to actual paragraph content
  if (bracket.includes('previous paragraph') && bracket.includes('physical health') && bracket.includes('exercise')) {
    return `Regular exercise provides numerous physical health benefits. Studies have consistently shown that physical activity strengthens the cardiovascular system, reduces the risk of chronic diseases like diabetes and heart disease, and helps maintain healthy body weight. Additionally, exercise improves bone density, enhances muscular strength, and boosts immune function.`;
  }

  if (bracket.includes('essay arguing') && bracket.includes('financial literacy')) {
    return `High schools should require all students to complete a course in financial literacy before graduation. In today's complex economic landscape, young adults face critical financial decisions—from managing student loans to understanding credit scores—yet most receive no formal education in these essential skills.`;
  }

  if (bracket.includes('formal academic paper') && bracket.includes('neuroscience')) {
    return `Recent advances in neuroimaging technology have enabled researchers to examine brain structures and functions with unprecedented precision. These technological developments have significantly enhanced our understanding of neural mechanisms underlying cognition and behavior.`;
  }

  if (bracket.includes('argument') && bracket.includes('classroom size') && bracket.includes('educational outcomes')) {
    return `Reducing classroom size represents one of the most effective interventions for improving student academic performance. Research across multiple educational systems demonstrates that smaller class sizes enable teachers to provide more individualized attention, foster stronger student engagement, and create more interactive learning environments.`;
  }

  if (bracket.includes('smartphone apps') && bracket.includes('water intake')) {
    return `Modern technology has made it easier than ever to maintain healthy hydration habits. Smartphone applications designed to track daily water consumption have become increasingly sophisticated, offering features ranging from simple intake logging to personalized hydration goals based on individual factors like weight, activity level, and climate.`;
  }

  if (bracket.includes('arts funding') && bracket.includes('schools')) {
    return `Schools nationwide face difficult budget decisions, and arts programs are often the first to be cut when funds become scarce. However, this short-sighted approach ignores substantial evidence demonstrating that arts education contributes significantly to student development across multiple dimensions.`;
  }

  if (bracket.includes('libraries') && bracket.includes('digital age')) {
    return `In an era dominated by digital information and online resources, some question whether traditional libraries continue to serve a vital purpose. However, public libraries have evolved far beyond their historical role as mere repositories of books, transforming into dynamic community centers that address diverse educational and social needs.`;
  }

  if (bracket.includes('shakespeare') && bracket.includes('globe theatre')) {
    return `William Shakespeare's association with the Globe Theatre fundamentally shaped his approach to dramatic writing. The unique architectural features and performance conditions of this iconic playhouse directly influenced the playwright's stagecraft, character development, and thematic explorations.`;
  }

  if (bracket.includes('biomimicry') && bracket.includes('engineering')) {
    return `Nature has spent billions of years solving complex engineering challenges through evolutionary processes. Biomimicry, the practice of learning from and mimicking natural strategies to solve human design problems, has emerged as a revolutionary approach in modern engineering and architecture.`;
  }

  if (bracket.includes('beginning') && bracket.includes('essay')) {
    return `The opening of an essay establishes the foundation for everything that follows, setting the tone, introducing the topic, and engaging the reader's interest.`;
  }

  // Generic fallback based on bracket content
  if (bracket.includes('paragraph') || bracket.includes('essay')) {
    // Extract key topic from bracket
    const match = bracketText.match(/about ([\w\s]+)/i) || bracketText.match(/that ([\w\s]+)/i);
    if (match) {
      const topic = match[1].trim();
      return `The ${topic.toLowerCase()} presents important considerations that merit careful examination. Understanding the context and implications of ${topic.toLowerCase()} helps readers appreciate the significance of the discussion that follows.`;
    }
  }

  // Default fallback
  return `This passage provides important context for understanding the information that follows. The background discussed here establishes a foundation for the subsequent analysis and helps frame the key points being developed.`;
}

async function replaceBracketPlaceholders() {
  console.log('Replacing bracket placeholders with full paragraph content...\\n');
  console.log('='.repeat(80));

  const allEnglishLessons = [
    'adding-deleting', 'logical-placement', 'which-choice'
  ];

  let totalReplaced = 0;
  let errorCount = 0;

  for (const lessonKey of allEnglishLessons) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id);

    console.log(`\\nProcessing ${lessonKey}...`);

    for (const q of questions) {
      if (!q.problem_text || !q.problem_text.includes('[') || !q.problem_text.includes(']')) {
        continue;
      }

      // Extract bracket content
      const bracketRegex = /\[([^\]]+)\]/g;
      let newText = q.problem_text;
      let hasReplacement = false;

      const matches = [...q.problem_text.matchAll(bracketRegex)];
      for (const match of matches) {
        const fullBracket = match[0]; // e.g., "[Previous paragraph discusses...]"
        const bracketContent = match[1]; // e.g., "Previous paragraph discusses..."

        // Skip [NEW SENTENCE], [1], [2], etc. - these are structural markers
        if (bracketContent.match(/^(NEW SENTENCE|\d+|Sentence \d+)$/i)) {
          continue;
        }

        // Generate paragraph content
        const paragraphContent = generateParagraphFromBracket(bracketContent, newText);

        // Replace the bracket with actual content
        newText = newText.replace(fullBracket, paragraphContent);
        hasReplacement = true;
      }

      if (!hasReplacement) {
        continue;
      }

      // Update the question in database
      const { error } = await supabase
        .from('lesson_examples')
        .update({ problem_text: newText })
        .eq('id', q.id);

      if (error) {
        console.log(`  ✗ Failed: ${q.title} - ${error.message}`);
        errorCount++;
      } else {
        console.log(`  ✓ Replaced: ${q.title} (position ${q.position})`);
        totalReplaced++;
      }
    }
  }

  console.log('\\n' + '='.repeat(80));
  console.log(`✓ Successfully replaced: ${totalReplaced} questions`);
  console.log(`✗ Errors: ${errorCount} questions`);
  console.log('='.repeat(80));
}

replaceBracketPlaceholders();
