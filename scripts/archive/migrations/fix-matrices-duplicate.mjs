import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixMatricesDuplicate() {
  console.log('🔧 Fixing duplicate paragraph in Matrices lesson...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  const matrices = lessons.find(l => l.title === 'Matrices');

  if (matrices) {
    const $ = cheerio.load(matrices.content, { xmlMode: false, decodeEntities: false });

    // Remove duplicate paragraphs
    const seenText = new Set();
    $('p').each(function() {
      const text = $(this).text().trim().toLowerCase().substring(0, 80);
      if (text.length > 10) {
        if (seenText.has(text)) {
          console.log('Removing duplicate:', text.substring(0, 50) + '...');
          $(this).remove();
        } else {
          seenText.add(text);
        }
      }
    });

    const updatedContent = $.html('.lesson-content');

    await supabase
      .from('lessons')
      .update({
        content: updatedContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', matrices.id);

    console.log('✅ Fixed Matrices lesson');
  }
}

fixMatricesDuplicate();
