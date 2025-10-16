import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data: allLessons } = await supabase
  .from('lessons')
  .select('lesson_key, subject, content')
  .order('subject')
  .order('lesson_key');

console.log('LESSONS NOT MATCHING GOLD STANDARD:\n');

const notGoldStandard = [];

allLessons.forEach(lesson => {
  const content = lesson.content || '';

  // Check for gold standard markers
  const hasH3_5rem = content.includes('<h3 style="margin-top: 5rem');
  const hasH4_2rem = content.includes('<h4 style="margin-top: 2rem');
  const hasKeyTakeaways = content.includes('Key Takeaways');
  const hasProperParagraphs = content.includes('<p style="font-size: 16px; line-height: 1.7');
  const hasTimesNewRoman = content.includes('Times New Roman');

  // Consider it gold standard if it has most of these markers
  const isGoldStandard = hasH3_5rem && hasKeyTakeaways && hasProperParagraphs && content.length > 1000;

  const needsUpdate = !isGoldStandard && content.length > 0;
  if (needsUpdate) {
    notGoldStandard.push({
      key: lesson.lesson_key,
      subject: lesson.subject,
      len: content.length,
      hasH3_5rem,
      hasH4_2rem,
      hasKeyTakeaways,
      hasProperParagraphs,
      hasTimesNewRoman
    });
  }
});

const bySubject = {};
notGoldStandard.forEach(lesson => {
  if (!bySubject[lesson.subject]) bySubject[lesson.subject] = [];
  bySubject[lesson.subject].push(lesson);
});

Object.keys(bySubject).sort().forEach(subject => {
  console.log(`${subject.toUpperCase()}: ${bySubject[subject].length} lessons`);
  bySubject[subject].forEach(l => {
    console.log(`  - ${l.key} (len: ${l.len}, H3: ${l.hasH3_5rem}, KT: ${l.hasKeyTakeaways}, para: ${l.hasProperParagraphs})`);
  });
  console.log('');
});

console.log(`TOTAL NOT GOLD STANDARD: ${notGoldStandard.length}`);
console.log(`\nLESSONS WITH GOLD STANDARD: ${allLessons.length - notGoldStandard.length}`);
