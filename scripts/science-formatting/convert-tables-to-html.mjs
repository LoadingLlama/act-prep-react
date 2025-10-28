import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📊 CONVERTING SCIENCE TABLES TO HTML FORMAT\n');
console.log('='.repeat(80));

// Helper function to convert plain text table to HTML
function convertTableToHTML(tableText) {
  const lines = tableText.trim().split('\n');

  // Find lines that look like table rows (contain |)
  const tableLines = lines.filter(line => line.includes('|'));

  if (tableLines.length === 0) return tableText;

  // First line is header
  const headerLine = tableLines[0];
  const headers = headerLine.split('|').map(h => h.trim()).filter(h => h);

  // Rest are data rows
  const dataLines = tableLines.slice(1);

  let html = '<table class="science-table">\n';
  html += '  <thead>\n    <tr>\n';
  headers.forEach(h => {
    html += `      <th>${h}</th>\n`;
  });
  html += '    </tr>\n  </thead>\n';
  html += '  <tbody>\n';

  dataLines.forEach(line => {
    const cells = line.split('|').map(c => c.trim()).filter(c => c);
    if (cells.length === headers.length) {
      html += '    <tr>\n';
      cells.forEach(c => {
        html += `      <td>${c}</td>\n`;
      });
      html += '    </tr>\n';
    }
  });

  html += '  </tbody>\n</table>';

  return html;
}

// Get all science passages for Test 1
const { data: passages } = await sb
  .from('practice_test_science_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

console.log(`\nFound ${passages.length} Science passages\n`);

for (const passage of passages) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`PASSAGE ${passage.passage_number}: ${passage.passage_type}`);
  console.log('='.repeat(80));

  let updatedText = passage.passage_text;
  let tableCount = 0;

  // Find all tables in the text (text between blank lines that contains |)
  const sections = updatedText.split('\n\n');

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];

    // Check if this section looks like a table
    if (section.includes('|') && section.split('\n').filter(line => line.includes('|')).length >= 2) {
      tableCount++;
      console.log(`  Found table ${tableCount}`);

      const htmlTable = convertTableToHTML(section);
      sections[i] = htmlTable;
    }
  }

  if (tableCount > 0) {
    updatedText = sections.join('\n\n');

    console.log(`  ✓ Converted ${tableCount} table(s) to HTML`);
    console.log('\n  PREVIEW:');
    console.log('  ' + updatedText.substring(0, 600).replace(/\n/g, '\n  '));

    // Update database
    const { error } = await sb
      .from('practice_test_science_passages')
      .update({ passage_text: updatedText })
      .eq('id', passage.id);

    if (error) {
      console.log(`  ❌ Error updating: ${error.message}`);
    } else {
      console.log(`  ✅ Successfully updated passage ${passage.passage_number}`);
    }
  } else {
    console.log(`  ⚠️  No tables found`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('✅ COMPLETE! All Science tables converted to HTML.');
console.log('='.repeat(80));
