import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function updateGeometryAngles() {
  const updatedContent = `
            <p class="lesson-intro">Angle relationships are fundamental to ACT geometry. Understanding how angles work with intersecting lines, parallel lines, and polygons will help you solve many geometry problems quickly.</p>

            <h3>Basic Angle Pairs</h3>
            <div class="rules-box">
                <h4>Key Definitions:</h4>
                <ul>
                    <li><strong>Complementary angles:</strong> Two angles that add to 90°</li>
                    <li><strong>Supplementary angles:</strong> Two angles that add to 180°</li>
                    <li><strong>Vertical angles:</strong> Opposite angles formed by intersecting lines (always equal)</li>
                </ul>
            </div>

            <div class="example-box">
                <p><strong>Example:</strong> If one angle is 35°, its complement is 90° - 35° = 55°</p>
                <p><strong>Example:</strong> If one angle is 35°, its supplement is 180° - 35° = 145°</p>
            </div>

            <h3>Intersecting Lines</h3>
            <div class="rules-box">
                <h4>Key Rules:</h4>
                <ul>
                    <li><strong>Vertical angles are equal</strong></li>
                    <li><strong>Adjacent angles are supplementary</strong> (add to 180°)</li>
                </ul>
            </div>

            <h3>Parallel Lines</h3>
            <div class="rules-box">
                <h4>When parallel lines are cut by a transversal:</h4>
                <ul>
                    <li><strong>Corresponding angles are equal</strong></li>
                    <li><strong>Alternate interior angles are equal</strong></li>
                    <li><strong>Alternate exterior angles are equal</strong></li>
                    <li><strong>Co-interior angles are supplementary</strong></li>
                </ul>
            </div>

            <h3>Interior Angles in Polygons</h3>
            <div class="rules-box">
                <h4>Sum of Interior Angles:</h4>
                <p><strong>Sum = 180°(n - 2)</strong> where n is the number of sides</p>
                <ul>
                    <li>Triangle: 180°</li>
                    <li>Quadrilateral: 360°</li>
                    <li>Pentagon: 540°</li>
                    <li>Hexagon: 720°</li>
                </ul>
            </div>

            <div class="tip-box">
                <h4>ACT Test-Taking Strategy</h4>
                <p>If a problem states figures are NOT drawn to scale, you must calculate using formulas and given information. If the problem doesn't mention scale, the figure is typically drawn to scale and can help you eliminate unreasonable answer choices.</p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Master the basic angle relationships (complementary, supplementary, vertical) and the polygon angle formula. These concepts appear on almost every ACT Math test!</p>
            </div>
        `;

  console.log('Updating geometry-angles lesson in Supabase...\n');

  const { data, error } = await supabase
    .from('lessons')
    .update({ content: updatedContent })
    .eq('lesson_key', 'geometry-angles')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
  } else {
    console.log('✅ Successfully updated geometry-angles lesson!');
    console.log(`   Updated lesson ID: ${data[0].id}`);
    console.log(`   New content length: ${updatedContent.length} chars`);
    console.log('\nFixed issues:');
    console.log('  ✓ Removed broken diagram reference');
    console.log('  ✓ Rephrased "Figures Drawn to Scale" section');
    console.log('  ✓ Added complementary angles (was missing)');
    console.log('  ✓ Added examples for complement and supplement');
  }
}

updateGeometryAngles();
