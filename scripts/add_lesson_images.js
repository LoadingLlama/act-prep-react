const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Academic, Cambridge-style university images from Unsplash
// These are classic, scholarly images of libraries, universities, old books, etc.
const academicImages = {
  // English/Reading lessons
  'reading': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80', // Old books in library
  'words-in-context': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80', // Open book in library
  'sentence-structure': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', // Cambridge-style library
  'commas': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80', // Old books
  'parallel-structure': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80', // University library
  'redundancy': 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80', // Classic library
  'word-choice': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80', // Old books
  'transitions': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80', // Books on desk
  'which-choice': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80', // Open book
  'adding-deleting': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', // Library aisle
  'logical-placement': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80', // University library

  // Math lessons
  'math-intro': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', // Mathematics formulas
  'backsolving': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80', // Chalkboard with math
  'substitution': 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80', // Math on blackboard
  'word-problems': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', // Mathematics symbols
  'absolute-value': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80', // Chalkboard equations
  'exponents-roots': 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80', // Math formulas
  'quadratics': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', // Mathematics
  'geometry-shapes': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80', // Geometry on board
  'lines': 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80', // Linear equations
  'circles-ellipses': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', // Geometric shapes
  'arcs-sectors': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80', // Geometry
  'exponential-growth': 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80', // Exponential functions
  'repeating-patterns': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', // Patterns
  'statistics-intro': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80', // Statistics board
  'statistics-advanced': 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80', // Advanced stats

  // Science lessons
  'science-intro': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', // Science laboratory
  'passage-approach': 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&q=80', // Lab equipment
  'specific-data-point': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', // Scientific instruments
  'inverse-trends-multiple-axes': 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&q=80', // Lab glassware
  'cannot-be-determined': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', // Science lab
  'equations-as-answers': 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&q=80', // Laboratory
  'math-on-science': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', // Scientific tools

  // Strategy lessons
  'getting-started': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', // Classic university library
  'finding-correct-answer': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80', // Study hall
  'reading-approaches': 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80', // Reading room
  'pacing-time-management': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80', // Old clock in library
  'question-types': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80', // Study materials
  'breaking-down-questions': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', // Library shelves
  'answer-choices': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80', // Academic setting
  'maximizing-score': 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80', // University hall

  // Default fallback
  'default': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80' // Classic Cambridge library
};

async function addImageColumn() {
  console.log('\n📸 Adding cover_image_url column to lessons table...\n');

  try {
    // Get all lessons
    const { data: lessons, error: fetchError } = await supabase
      .from('lessons')
      .select('id, lesson_key, title, subject');

    if (fetchError) {
      console.error('Error fetching lessons:', fetchError);
      return;
    }

    console.log(`Found ${lessons.length} lessons\n`);

    let updated = 0;
    let failed = 0;

    // Update each lesson with appropriate image
    for (const lesson of lessons) {
      let imageUrl = academicImages[lesson.lesson_key] || academicImages[lesson.subject] || academicImages.default;

      const { error: updateError } = await supabase
        .from('lessons')
        .update({ cover_image_url: imageUrl })
        .eq('id', lesson.id);

      if (updateError) {
        console.error(`❌ Failed to update ${lesson.title}:`, updateError.message);
        failed++;
      } else {
        console.log(`✅ ${lesson.subject.toUpperCase()} - ${lesson.title}`);
        console.log(`   Image: ${imageUrl.substring(0, 60)}...`);
        updated++;
      }
    }

    console.log(`\n📊 Results: ${updated} updated, ${failed} failed\n`);

  } catch (err) {
    console.error('Error:', err);
  }
}

addImageColumn();
