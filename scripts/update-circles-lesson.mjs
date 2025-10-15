import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Use service role key provided by user
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function updateCirclesLesson() {
  const updatedContent = `
            <p class="lesson-intro">Circles appear frequently on the ACT Math test. You'll need to know both basic circle measurements and circle equations on the coordinate plane.</p>

            <h3>Basic Circle Formulas</h3>
            <div class="rules-box">
                <h4>Essential Formulas:</h4>
                <p><strong>Diameter:</strong> d = 2r (twice the radius)</p>
                <p><strong>Circumference:</strong> C = 2πr or C = πd</p>
                <p><strong>Area:</strong> A = πr²</p>
                <p><strong>Remember:</strong> π ≈ 3.14</p>
            </div>

            <div class="example-box">
                <p><strong>Problem:</strong> A circle has radius 5. Find its circumference and area.</p>
                <p><strong>Solution:</strong></p>
                <p>Circumference: C = 2πr = 2π(5) = 10π ≈ 31.4</p>
                <p>Area: A = πr² = π(5)² = 25π ≈ 78.5</p>
            </div>

            <h3>Circle Equations</h3>
            <div class="rules-box">
                <h4>Standard Form:</h4>
                <p><strong>(x - h)² + (y - k)² = r²</strong></p>
                <p>Center: (h, k), Radius: r</p>

                <h4>General Form:</h4>
                <p><strong>x² + y² + Dx + Ey + F = 0</strong></p>
                <p>Complete the square to convert to standard form</p>
            </div>

            <h3>Ellipse Equations</h3>
            <div class="rules-box">
                <h4>Standard Form:</h4>
                <p><strong>(x - h)²/a² + (y - k)²/b² = 1</strong></p>
                <p>Center: (h, k)</p>
                <p>If a > b: horizontal major axis, length 2a</p>
                <p>If b > a: vertical major axis, length 2b</p>
            </div>

            <h3>Hyperbola Equations</h3>
            <div class="concept-box">
                <h4>Two Types:</h4>
                <p><strong>Horizontal:</strong> (x - h)²/a² - (y - k)²/b² = 1</p>
                <p><strong>Vertical:</strong> (y - k)²/a² - (x - h)²/b² = 1</p>
            </div>

            <h3>Key Circle Properties</h3>
            <div class="tip-box">
                <h4>Important Facts:</h4>
                <ul>
                    <li>Tangent lines are perpendicular to radii at point of tangency</li>
                    <li>Chords equidistant from center are equal in length</li>
                    <li>Inscribed angles are half the central angle</li>
                </ul>
            </div>

            <div class="example-box">
                <p><strong>Problem:</strong> Find the center and radius of x² + y² - 6x + 4y + 9 = 0</p>
                <p><strong>Solution:</strong></p>
                <p>Complete the square:</p>
                <p>(x² - 6x + 9) + (y² + 4y + 4) = -9 + 9 + 4</p>
                <p>(x - 3)² + (y + 2)² = 4</p>
                <p>Center: (3, -2), Radius: 2</p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Know both basic circle formulas (area, circumference) AND circle equations. The ACT tests both! Practice completing the square to convert between general and standard forms.</p>
            </div>
        `;

  console.log('Updating circles-ellipses lesson in Supabase...\n');

  const { data, error } = await supabase
    .from('lessons')
    .update({ content: updatedContent })
    .eq('lesson_key', 'circles-ellipses')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
  } else {
    console.log('✅ Successfully updated circles-ellipses lesson!');
    console.log(`   Updated lesson ID: ${data[0].id}`);
    console.log(`   New content length: ${updatedContent.length} chars`);
    console.log('\nAdded critical ACT content:');
    console.log('  ✓ Basic Circle Formulas section');
    console.log('    - Diameter formula (d = 2r)');
    console.log('    - Circumference formula (C = 2πr)');
    console.log('    - Area formula (A = πr²)');
    console.log('  ✓ Example problem using area and circumference');
    console.log('\nThis lesson now covers BOTH:');
    console.log('  • Basic circle measurements (frequently tested)');
    console.log('  • Circle equations on coordinate plane (advanced)');
  }
}

updateCirclesLesson();
