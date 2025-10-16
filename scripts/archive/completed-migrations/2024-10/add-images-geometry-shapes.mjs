import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function addImagesToGeometryShapes() {
  const updatedContent = `
            <p class="lesson-intro">Geometry shapes are tested frequently on the ACT. Knowing formulas, properties, and special triangles will help you solve problems quickly and accurately.</p>

            <h3>Triangles - Pythagorean Theorem</h3>
            <div class="rules-box">
                <h4>For Right Triangles:</h4>
                <p><strong>a² + b² = c²</strong></p>
                <p>where c is the hypotenuse (longest side)</p>
            </div>

            <h3>Special Right Triangles</h3>
            <div class="rules-box">
                <h4>45-45-90 Triangle:</h4>
                <p>Sides are in ratio <strong>1 : 1 : √2</strong></p>
                <p>If legs = x, then hypotenuse = x√2</p>
            </div>

            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Triangle-45-45-90.svg" alt="45-45-90 triangle diagram" style="max-width: 300px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>45-45-90 triangle with side ratios 1 : 1 : √2</em></p>
            </div>

            <div class="rules-box">
                <h4>30-60-90 Triangle:</h4>
                <p>Sides are in ratio <strong>1 : √3 : 2</strong></p>
                <p>Short leg : Long leg : Hypotenuse</p>
            </div>

            <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/68/30-60-90.svg" alt="30-60-90 triangle diagram" style="max-width: 300px; height: auto;" />
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;"><em>30-60-90 triangle with side ratios 1 : √3 : 2</em></p>
            </div>

            <h3>Triangle Properties</h3>
            <div class="concept-box">
                <h4>Key Facts:</h4>
                <ul>
                    <li>Sum of angles = 180°</li>
                    <li>Area = (1/2) × base × height</li>
                    <li>Perimeter = sum of all sides</li>
                </ul>
            </div>

            <h3>Quadrilaterals</h3>
            <div class="rules-box">
                <h4>Common Shapes:</h4>
                <p><strong>Rectangle:</strong> Area = length × width</p>
                <p><strong>Square:</strong> Area = side²</p>
                <p><strong>Parallelogram:</strong> Area = base × height</p>
                <p><strong>Trapezoid:</strong> Area = (1/2)(b₁ + b₂) × height</p>
            </div>

            <h3>Circles</h3>
            <div class="rules-box">
                <h4>Essential Formulas:</h4>
                <p><strong>Circumference:</strong> C = 2πr or πd</p>
                <p><strong>Area:</strong> A = πr²</p>
                <p>Remember: diameter = 2 × radius</p>
            </div>

            <h3>3D Shapes (Solids)</h3>
            <div class="concept-box">
                <h4>Volume Formulas:</h4>
                <p><strong>Rectangular Prism:</strong> V = length × width × height</p>
                <p><strong>Cube:</strong> V = side³</p>
                <p><strong>Cylinder:</strong> V = πr²h</p>
                <p><strong>Sphere:</strong> V = (4/3)πr³</p>
                <p><strong>Cone:</strong> V = (1/3)πr²h</p>
            </div>

            <div class="example-box">
                <p><strong>Problem:</strong> In a 30-60-90 triangle, the short leg is 5. Find the hypotenuse.</p>
                <p><strong>Solution:</strong></p>
                <p>Using ratio 1 : √3 : 2</p>
                <p>If short leg = 5, then hypotenuse = 5 × 2 = 10</p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>Memorize the special right triangle ratios (45-45-90 and 30-60-90) - they appear on almost every ACT! Know your area and volume formulas!</p>
            </div>
        `;

  console.log('Updating geometry-shapes lesson with triangle diagrams...\n');

  const { data, error } = await supabase
    .from('lessons')
    .update({ content: updatedContent })
    .eq('lesson_key', 'geometry-shapes')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
  } else {
    console.log('✅ Successfully added triangle diagrams to geometry-shapes lesson!');
    console.log(`   Updated lesson ID: ${data[0].id}`);
    console.log(`   New content length: ${updatedContent.length} chars`);
    console.log('\nImages added:');
    console.log('  ✓ 45-45-90 triangle with side ratios (Wikimedia Commons)');
    console.log('  ✓ 30-60-90 triangle with side ratios (Wikimedia Commons)');
    console.log('\nContent enhanced:');
    console.log('  ✓ Visual representation of special triangles');
    console.log('  ✓ Clear ratio displays on diagrams');
    console.log('  ✓ Comprehensive shape formulas added');
  }
}

addImagesToGeometryShapes();
