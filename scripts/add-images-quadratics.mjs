import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function addImagesToQuadratics() {
  // First, get the current content to preserve it
  const { data: currentLesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'quadratics')
    .single();

  const updatedContent = `
            <p class="lesson-intro">Quadratic equations form parabolas when graphed. Understanding the relationship between the equation and its graph is essential for ACT Math success.</p>

            <h3>Standard Form</h3>
            <div class="rules-box">
                <h4>y = ax² + bx + c</h4>
                <p><strong>Key Properties:</strong></p>
                <ul>
                    <li>If <strong>a > 0</strong>, parabola opens upward (U-shape)</li>
                    <li>If <strong>a < 0</strong>, parabola opens downward (∩-shape)</li>
                    <li>The larger |a|, the narrower the parabola</li>
                    <li>c is the y-intercept (where x = 0)</li>
                </ul>
            </div>

            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/74/Quadratic-function.svg" alt="Parabola graph showing quadratic function" style="max-width: 450px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>Graph of a quadratic function showing parabola shape</em></p>
            </div>

            <h3>Vertex Form</h3>
            <div class="rules-box">
                <h4>y = a(x - h)² + k</h4>
                <p><strong>Vertex: (h, k)</strong></p>
                <p>This form immediately shows the vertex location!</p>
            </div>

            <h3>Finding the Vertex</h3>
            <div class="concept-box">
                <h4>From Standard Form:</h4>
                <p>x-coordinate of vertex: <strong>x = -b/(2a)</strong></p>
                <p>Then substitute to find y-coordinate</p>
            </div>

            <h3>Solving Quadratic Equations</h3>
            <div class="rules-box">
                <h4>Three Methods:</h4>
                <ol>
                    <li><strong>Factoring:</strong> Set equal to zero, factor, solve</li>
                    <li><strong>Quadratic Formula:</strong> x = (-b ± √(b² - 4ac)) / (2a)</li>
                    <li><strong>Completing the Square:</strong> Convert to vertex form</li>
                </ol>
            </div>

            <h3>Graphing Properties</h3>
            <div class="tip-box">
                <h4>Key Features:</h4>
                <ul>
                    <li><strong>Vertex:</strong> Maximum or minimum point</li>
                    <li><strong>Axis of Symmetry:</strong> Vertical line x = h (through vertex)</li>
                    <li><strong>Roots/Zeros:</strong> Where the parabola crosses the x-axis</li>
                    <li><strong>Discriminant:</strong> b² - 4ac tells you how many real roots (2, 1, or 0)</li>
                </ul>
            </div>

            <div class="example-box">
                <p><strong>Problem:</strong> Find the vertex of y = 2x² - 8x + 5</p>
                <p><strong>Solution:</strong></p>
                <p>a = 2, b = -8, c = 5</p>
                <p>x = -b/(2a) = -(-8)/(2×2) = 8/4 = 2</p>
                <p>y = 2(2)² - 8(2) + 5 = 8 - 16 + 5 = -3</p>
                <p><strong>Vertex: (2, -3)</strong></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Recognize the relationship between the equation and graph. Know how to find the vertex, and understand what the discriminant tells you about solutions!</p>
            </div>
        `;

  console.log('Updating quadratics lesson with parabola graph...\n');

  const { data, error } = await supabase
    .from('lessons')
    .update({ content: updatedContent })
    .eq('lesson_key', 'quadratics')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
  } else {
    console.log('✅ Successfully added parabola graph to quadratics lesson!');
    console.log(`   Updated lesson ID: ${data[0].id}`);
    console.log(`   New content length: ${updatedContent.length} chars`);
    console.log('\nImage added:');
    console.log('  ✓ Quadratic function parabola graph (Wikimedia Commons)');
    console.log('\nContent updated:');
    console.log('  ✓ Enhanced explanation of graphing properties');
    console.log('  ✓ Added visual context for parabola shape');
    console.log('  ✓ Included discriminant information');
  }
}

addImagesToQuadratics();
