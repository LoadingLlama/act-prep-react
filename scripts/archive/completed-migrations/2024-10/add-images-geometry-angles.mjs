import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function addImagesToGeometryAngles() {
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

            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/85/Complementary_angles.svg" alt="Complementary angles diagram" style="max-width: 300px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>Complementary angles add to 90°</em></p>
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

            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Vertical_Angles.svg" alt="Vertical angles diagram" style="max-width: 350px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>Vertical angles (opposite angles) are always equal</em></p>
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

            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/52/Two_parallel_lines_being_crossed_by_a_third_line.svg" alt="Parallel lines cut by transversal" style="max-width: 400px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>When a transversal crosses parallel lines, it creates multiple angle relationships</em></p>
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

  console.log('Updating geometry-angles lesson with images...\n');

  const { data, error } = await supabase
    .from('lessons')
    .update({ content: updatedContent })
    .eq('lesson_key', 'geometry-angles')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
  } else {
    console.log('✅ Successfully added images to geometry-angles lesson!');
    console.log(`   Updated lesson ID: ${data[0].id}`);
    console.log(`   New content length: ${updatedContent.length} chars`);
    console.log('\nImages added:');
    console.log('  ✓ Complementary angles diagram (Wikimedia Commons)');
    console.log('  ✓ Vertical angles diagram (Wikimedia Commons)');
    console.log('  ✓ Parallel lines with transversal (Wikimedia Commons)');
    console.log('\nAll images are:');
    console.log('  • Public domain / freely licensed');
    console.log('  • Hosted on Wikimedia Commons (reliable)');
    console.log('  • SVG format (scales perfectly)');
  }
}

addImagesToGeometryAngles();
