import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: lessons } = await supabase
  .from('lessons')
  .select('*')
  .eq('subject', 'math')
  .order('order_index');

const lesson = lessons[0]; // First lesson

console.log('Lesson:', lesson.title);
console.log('');

const $ = cheerio.load(lesson.content, { xmlMode: false, decodeEntities: false });

// Find all h4 example headings
$('h4').each(function(index) {
  const heading = $(this).text();
  if (heading.match(/Example/i)) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(heading);
    console.log('='.repeat(60));

    // Get the next few elements after this heading
    let $current = $(this).next();
    let elementCount = 0;

    while ($current.length && elementCount < 15 && !$current.is('h3, h4')) {
      const tagName = $current.prop('tagName');
      const text = $current.text().trim().substring(0, 100);
      const html = $current.html().substring(0, 150);

      console.log(`\n<${tagName.toLowerCase()}>`);
      console.log('Text:', text);
      console.log('HTML:', html);

      // Check for broken spans
      if (html.includes('<span>√</span>')) {
        console.log('⚠️  BROKEN SQUARE ROOT DETECTED');
      }

      $current = $current.next();
      elementCount++;
    }
  }
});
