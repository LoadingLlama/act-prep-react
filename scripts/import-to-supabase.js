// Script to import lessons data into Supabase
// Run this AFTER you've run the migration SQL in your Supabase dashboard
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Use service key for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials!');
  console.log('\nPlease add these to your .env file:');
  console.log('REACT_APP_SUPABASE_URL=your_project_url');
  console.log('SUPABASE_SERVICE_KEY=your_service_role_key');
  console.log('\nYou can find these in your Supabase dashboard under Settings > API');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importLessons() {
  try {
    // Read the extracted lessons data
    const lessonsPath = path.join(__dirname, 'lessons-data.json');
    const lessonsData = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));

    console.log(`📚 Found ${lessonsData.length} lessons to import`);

    // Import lessons in batches
    const batchSize = 10;
    let imported = 0;

    for (let i = 0; i < lessonsData.length; i += batchSize) {
      const batch = lessonsData.slice(i, i + batchSize);

      const { data, error } = await supabase
        .from('lessons')
        .upsert(batch, {
          onConflict: 'lesson_key',
          ignoreDuplicates: false
        });

      if (error) {
        console.error(`❌ Error importing batch ${i / batchSize + 1}:`, error);
        throw error;
      }

      imported += batch.length;
      console.log(`✅ Imported ${imported}/${lessonsData.length} lessons`);
    }

    console.log('\n🎉 Import complete!');
    console.log('\nNext steps:');
    console.log('1. Verify the data in your Supabase dashboard (Table Editor > lessons)');
    console.log('2. Update your React components to use the Supabase client');

  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

importLessons();
