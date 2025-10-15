/**
 * Make Angle Types Table Clean and Minimalist
 * Remove heavy styling, use subtle borders and spacing
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function makeTableMinimalist() {
  console.log('🎨 Making angle types table clean and minimalist...\\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  // Find and replace the table
  const tableMatch = content.match(/<table[\s\S]*?<\/table>/);

  if (!tableMatch) {
    console.log('❌ Could not find table');
    return false;
  }

  console.log('📝 Found table, replacing with minimalist version...\\n');

  // New minimalist table with clean typography and subtle borders
  const newTable = `<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem;">
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Type</th>
                        <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Measurement</th>
                        <th style="padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; color: #6b7280; font-size: 0.85rem;">Example</th>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0.75rem; color: #374151;">Acute</td>
                        <td style="padding: 0.5rem 0.75rem; color: #374151;">Less than 90°</td>
                        <td style="padding: 0.5rem 0.75rem; color: #6b7280;">45°, 60°, 30°</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0.75rem; color: #374151;">Right</td>
                        <td style="padding: 0.5rem 0.75rem; color: #374151;">Exactly 90°</td>
                        <td style="padding: 0.5rem 0.75rem; color: #6b7280;">90°</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0.75rem; color: #374151;">Obtuse</td>
                        <td style="padding: 0.5rem 0.75rem; color: #374151;">Greater than 90° but less than 180°</td>
                        <td style="padding: 0.5rem 0.75rem; color: #6b7280;">120°, 135°, 150°</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0.75rem; color: #374151;">Straight</td>
                        <td style="padding: 0.5rem 0.75rem; color: #374151;">Exactly 180°</td>
                        <td style="padding: 0.5rem 0.75rem; color: #6b7280;">180° (a straight line)</td>
                    </tr>
                </table>`;

  content = content.replace(tableMatch[0], newTable);

  console.log('💾 Updating database...\\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (error) {
    console.error('❌ Error:', error);
    return false;
  }

  console.log('✅ Table updated to minimalist style!\\n');
  console.log('📊 Changes:');
  console.log('  ✅ Removed alternating row backgrounds');
  console.log('  ✅ Removed bold/heavy header styling');
  console.log('  ✅ Reduced padding for compact look');
  console.log('  ✅ Used subtle border only on header');
  console.log('  ✅ Applied clean gray color palette');
  console.log('  ✅ Reduced font size for cleaner appearance\\n');

  return true;
}

makeTableMinimalist().then(success => {
  if (success) {
    console.log('✨ Table is now clean and minimalist!');
  }
}).catch(err => {
  console.error('❌ Error:', err);
});
