const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const idsToDelete = [
  '6864f513-3683-4fcd-9f9a-8c8001add392',
  '0ed0cb05-5432-4d8c-9f1d-cfb469152d50',
  'd2dd9c7e-60a2-4f6e-9ef8-772b3037e338',
  'dc5c794c-af08-4ae2-9977-62e2a72a6189',
  '33904572-033b-456e-9536-4ec476d3c11b',
  '3de4e172-c4d4-42c5-916c-593d6448c08a',
  '867498ec-d6ba-4dc9-852a-9669f2999418',
  '4964df40-9675-4b1b-ab99-2ba688a44fd3',
  '2f6247b8-015f-4b4b-83c9-4454adbde9c2',
  '4d8b2e88-a775-49f2-8719-6004382093d1',
  '239576a2-e6bf-4881-930f-b2af27c2e1c2',
  '421261dc-ee0e-4daa-92bd-b18c03330a40',
  'edeab2c0-863f-413b-bc46-7eb5775bc5ca',
  'ada2bfb8-1256-4baa-a915-807dde0888bf',
  'abb7f776-32a6-4d89-ba6c-1e8995b21ba4',
  '77e37bfe-ddb3-4e2f-8be3-b9cfe1c2329c',
  '64317eb9-9c8f-48aa-9c85-f841386cdff5',
  '81c1db4b-e9d7-487c-bd0d-369fe6d774aa',
  '632c6ee6-50d9-4321-8092-99d683219759',
  'b9c4ab6c-4c63-4192-991f-22c69bc82c9f',
  'd1d8de93-e8e5-48fe-a413-1513dd738a28',
  'b9f1cdbf-007a-4e04-bb83-eab39a5ad500',
  '4779d340-3fde-40dc-84aa-40ee6cb9d04a',
  '3ac61ebe-59ba-424b-9c10-796736011b3e'
];

async function deleteIncomplete() {
  console.log('Deleting 24 incomplete questions...\n');

  let deleted = 0;

  for (const id of idsToDelete) {
    const { error } = await supabase
      .from('lesson_examples')
      .delete()
      .eq('id', id);

    if (error) {
      console.log(`✗ Failed to delete ${id}: ${error.message}`);
    } else {
      console.log(`✓ Deleted ${id}`);
      deleted++;
    }
  }

  console.log(`\n✓ Deleted ${deleted} of ${idsToDelete.length} incomplete questions`);

  // Check counts for each lesson
  const lessons = ['logical-placement', 'redundancy', 'transitions', 'word-choice'];
  console.log('\nNew question counts:');
  for (const key of lessons) {
    const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', key).single();
    const { count } = await supabase.from('lesson_examples').select('*', { count: 'exact', head: true }).eq('lesson_id', lesson.id);
    console.log(`  ${key}: ${count} questions`);
  }
}

deleteIncomplete();
