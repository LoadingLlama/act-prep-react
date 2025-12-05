/**
 * Check for italics spacing issues
 * Find patterns like <i>word</i>word or word<i>word</i> (missing spaces)
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkItalicsSpacing() {
  console.log('🔍 CHECKING FOR ITALICS SPACING ISSUES\n');
  console.log('='.repeat(80));

  const sections = ['english', 'math', 'reading', 'science'];
  const testNumbers = [2, 3, 4, 5, 6, 7];

  let totalIssues = 0;
  const issueExamples = [];

  // Pattern to find missing spaces around italics tags
  // Matches: word<i> or </i>word or <i>word without proper spacing
  const patterns = [
    { regex: /\w<\/?i>/g, description: 'word directly before tag' },
    { regex: /<\/?i>\w/g, description: 'word directly after tag' },
    { regex: /<i>[A-Z]\./g, description: 'possible abbreviation issue like <i>R.' }
  ];

  for (const testNum of testNumbers) {
    for (const section of sections) {
      // Check questions
      const questionTable = `practice_test_${section}_questions`;
      const { data: questions, error: qError } = await supabase
        .from(questionTable)
        .select('question_number, question_text, choices')
        .eq('test_number', testNum);

      if (qError || !questions) continue;

      questions.forEach(q => {
        const text = q.question_text || '';
        const choicesStr = JSON.stringify(q.choices || []);

        patterns.forEach(({ regex, description }) => {
          const matches = text.match(regex);
          if (matches && matches.length > 0) {
            totalIssues++;
            if (issueExamples.length < 10) {
              const context = text.substring(
                Math.max(0, text.indexOf(matches[0]) - 30),
                Math.min(text.length, text.indexOf(matches[0]) + 50)
              );
              issueExamples.push({
                test: testNum,
                section,
                question: q.question_number,
                issue: description,
                match: matches[0],
                context: context
              });
            }
          }

          const choiceMatches = choicesStr.match(regex);
          if (choiceMatches && choiceMatches.length > 0) {
            totalIssues++;
          }
        });
      });

      // Check passages
      if (section !== 'math') {
        const passageTable = `practice_test_${section}_passages`;
        const { data: passages, error: pError } = await supabase
          .from(passageTable)
          .select('passage_number, passage_text')
          .eq('test_number', testNum);

        if (pError || !passages) continue;

        passages.forEach(p => {
          const text = p.passage_text || '';

          patterns.forEach(({ regex, description }) => {
            const matches = text.match(regex);
            if (matches && matches.length > 0) {
              totalIssues++;
              if (issueExamples.length < 15) {
                const context = text.substring(
                  Math.max(0, text.indexOf(matches[0]) - 30),
                  Math.min(text.length, text.indexOf(matches[0]) + 50)
                );
                issueExamples.push({
                  test: testNum,
                  section,
                  passage: p.passage_number,
                  issue: description,
                  match: matches[0],
                  context: context
                });
              }
            }
          });
        });
      }
    }
  }

  console.log(`\n📊 FOUND ${totalIssues} POTENTIAL ITALICS SPACING ISSUES\n`);
  console.log('='.repeat(80));

  if (issueExamples.length > 0) {
    console.log('\n📝 EXAMPLE ISSUES:\n');
    issueExamples.forEach((ex, idx) => {
      console.log(`${idx + 1}. Test ${ex.test} ${ex.section.toUpperCase()} ${ex.question ? `Q${ex.question}` : `Passage ${ex.passage}`}`);
      console.log(`   Issue: ${ex.issue}`);
      console.log(`   Match: "${ex.match}"`);
      console.log(`   Context: "...${ex.context}..."`);
      console.log('');
    });
  }

  console.log('='.repeat(80));
  console.log('CHECK COMPLETE\n');
}

checkItalicsSpacing().catch(console.error);
