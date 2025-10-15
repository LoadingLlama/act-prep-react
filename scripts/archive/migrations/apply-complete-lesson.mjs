import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Read original to preserve Types of Angles section
const { data: original } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'geometry-angles')
  .single();

console.log('🔧 Rebuilding complete lesson...\n');

// Extract well-formatted Types of Angles section
const typesMatch = original.content.match(/<h3>Types of Angles<\/h3>[\s\S]*?(?=<h3>When Two Lines Intersect)/);
const typesSection = typesMatch ? typesMatch[0] : '';

// Build complete lesson
const completeLesson = `
            <h3>Understanding Angles & Lines</h3>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Angles are fundamental to geometry! Understanding angle types and relationships will help you solve many ACT problems. Let's master angles step-by-step, starting with the basics.</p>

            <br>

            ${typesSection}
            
            <h3>When Two Lines Intersect</h3>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">When two straight lines cross, they create 4 angles. Let's learn about them <strong>one rule at a time</strong>.</p>

            <br>

            <h4>Rule 1: Vertical Angles Are Equal</h4>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;"><strong>Vertical angles</strong> are the angles opposite each other when two lines intersect. Vertical angles are always equal.</p>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">In the diagram, the 70° angles are vertical angles (equal to each other). The 110° angles are also vertical angles (equal to each other).</p>

            <div style="text-align: center; margin: 1.5rem 0;">
    <svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="277.4" y1="74.8" x2="222.6" y2="225.2" stroke="#000" stroke-width="2"/>
    <line x1="330.0" y1="150.0" x2="170.0" y2="150.0" stroke="#000" stroke-width="2"/>
    <circle cx="250" cy="150" r="3" fill="#000"/>
    <path d="M 272.0,150.0 A 22,22 0 0,0 257.5,129.3" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M 257.5,129.3 A 22,22 0 0,0 228.0,150.0" stroke="#ef4444" fill="none" stroke-width="2.5"/>
    <path d="M 228.0,150.0 A 22,22 0 0,0 242.5,170.7" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M 242.5,170.7 A 22,22 0 0,0 272.0,150.0" stroke="#ef4444" fill="none" stroke-width="2.5"/>
    <text x="286.9" y="124.2" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">70°</text>
    <text x="275.8" y="186.9" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">110°</text>
    <text x="213.1" y="175.8" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">70°</text>
    <text x="224.2" y="113.1" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">110°</text>
</svg>
</div>

            <div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
                <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">💡 Key Idea:</p>
                <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1e3a8a;">Angles across from each other are <strong>always equal</strong>. If one angle is 70°, the angle across from it is also 70°!</p>
            </div>

            <h4>Example 1</h4>

            <p><strong>Problem:</strong></p>
            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">In the figure below, lines intersect. What is the value of <em>x</em>?</p>

            <div style="text-align: center; margin: 1.5rem 0;">
                <svg width="380" height="250" viewBox="0 0 380 250" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="139.6" y1="63.9" x2="240.4" y2="186.1" stroke="#000" stroke-width="1.5"/>
    <line x1="290.0" y1="125.0" x2="90.0" y2="125.0" stroke="#000" stroke-width="1.5"/>
    <path d="M 211.0,125.0 A 16,16 0 0,0 201.9,112.3" stroke="#000" fill="none" stroke-width="1.2"/>
    <text x="223.4" y="105.0" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle" dominant-baseline="middle">70°</text>
    <text x="156.6" y="145.0" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">x°</text>
</svg>
            </div>

            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">A. 35°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">B. 70°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">C. 90°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">D. 110°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">E. 140°</span>

            <p style="margin: 0.4rem 0 0.2rem 0; font-size: 0.9rem; font-weight: 600;"><strong>Solution:</strong></p>
            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">These are vertical angles, so they're equal. Therefore, <em>x</em> = 70°.</p>

            <p style="text-align: center; font-size: 0.9rem; margin-top: 0.3rem;"><strong>Answer: B</strong></p>

            <br>

            <h4>Rule 2: Adjacent Angles Sum to 180°</h4>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;"><strong>Adjacent angles</strong> are two angles that share a common side and together form a straight line. Adjacent angles always sum to 180°.</p>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">In the diagram, the 55° angle and the 125° angle are adjacent. Therefore, 55° + 125° = 180°.</p>

            <div style="text-align: center; margin: 1.5rem 0;">
    <svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="295.9" y1="84.5" x2="204.1" y2="215.5" stroke="#000" stroke-width="2"/>
    <line x1="330.0" y1="150.0" x2="170.0" y2="150.0" stroke="#000" stroke-width="2"/>
    <circle cx="250" cy="150" r="3" fill="#000"/>
    <path d="M 272.0,150.0 A 22,22 0 0,0 262.6,132.0" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M 264.9,128.7 A 26,26 0 0,0 224.0,150.0" stroke="#ef4444" fill="none" stroke-width="2.5"/>
    <text x="287.3" y="130.6" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">55°</text>
    <text x="227.8" y="107.4" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">125°</text>
</svg>
</div>

            <div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
                <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">💡 Key Idea:</p>
                <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1e3a8a;">Angles next to each other on a straight line add up to <strong>180°</strong>. If one angle is 55°, the adjacent angle is 180° − 55° = 125°!</p>
            </div>

            <h4>Example 2</h4>

            <p><strong>Problem:</strong></p>
            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Two lines intersect. One angle measures 55°. What is the measure of an adjacent angle?</p>

            <div style="text-align: center; margin: 1.5rem 0;">
                <svg width="380" height="250" viewBox="0 0 380 250" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="149.7" y1="76.3" x2="230.3" y2="173.7" stroke="#000" stroke-width="1.5"/>
    <line x1="290.0" y1="125.0" x2="90.0" y2="125.0" stroke="#000" stroke-width="1.5"/>
    <path d="M 206.0,125.0 A 11,11 0 0,0 199.7,116.1" stroke="#000" fill="none" stroke-width="1.2"/>
    <text x="225.1" y="107.9" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle" dominant-baseline="middle">55°</text>
    <text x="154.9" y="142.1" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">?</text>
</svg>
            </div>

            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">A. 25°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">B. 35°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">C. 55°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">D. 90°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">E. 125°</span>

            <p style="margin: 0.4rem 0 0.2rem 0; font-size: 0.9rem; font-weight: 600;"><strong>Solution:</strong></p>
            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Adjacent angles on a line sum to 180°. So the adjacent angle = 180° − 55° = 125°.</p>

            <p style="text-align: center; font-size: 0.9rem; margin-top: 0.3rem;"><strong>Answer: E</strong></p>

            <br>

            <div style="background: #f0fdf4; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #10b981;">
                <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #065f46;">✓ Remember These Two Rules:</p>
                <ul style="margin: 0; padding-left: 1.5rem; color: #064e3b; font-size: 0.9rem; line-height: 1.6;">
                    <li><strong>Vertical angles:</strong> Opposite angles at an intersection are equal</li>
                    <li><strong>Adjacent angles:</strong> Angles on a straight line sum to 180°</li>
                </ul>
            </div>

            <br>

            <h3>Parallel Lines Cut by a Transversal</h3>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">When a line crosses two parallel lines, it creates 8 angles. But here's the good news: <strong>you only need to find ONE angle</strong>!</p>

            <div style="text-align: center; margin: 2.5rem 0;">
    <svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="50" y1="100" x2="450" y2="100" stroke="#555" stroke-width="2"/>
    <line x1="50" y1="200" x2="450" y2="200" stroke="#555" stroke-width="2"/>
    <line x1="150.0" y1="40" x2="252.6" y2="260" stroke="#000" stroke-width="2"/>
    <circle cx="178.0" cy="100.0" r="3" fill="#000"/>
    <circle cx="224.6" cy="200.0" r="3" fill="#000"/>
    <path d="M 203.0,100.0 A 25,25 0 0,1 188.5,122.7" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M 249.6,200.0 A 25,25 0 0,1 235.2,222.7" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <text x="215.9" y="124.2" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">a</text>
    <text x="262.6" y="224.2" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">a</text>
</svg>
</div>

            <div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
                <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">🔑 The Key Pattern:</p>
                <ul style="margin: 0; padding-left: 1.5rem; color: #1e3a8a; font-size: 0.9rem; line-height: 1.6;">
                    <li><strong>Set 1 (angles 1, 3, 5, 7):</strong> Four angles are equal - all acute, forming vertical pairs</li>
                    <li><strong>Set 2 (angles 2, 4, 6, 8):</strong> Four angles are equal - all obtuse, forming vertical pairs</li>
                    <li><strong>Relationship:</strong> Any angle from Set 1 + any angle from Set 2 = 180°</li>
                </ul>
            </div>

            <div style="background: #f8f9fa; padding: 1rem 1.5rem; border-radius: 8px; margin: 1.5rem 0; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; font-style: italic; color: #1f2937; font-size: 14px;">
                    <strong>Example:</strong> If angle 1 = 65°, then angles 3, 5, and 7 also equal 65° (all vertical pairs). And angles 2, 4, 6, and 8 all equal 115° (since 180° − 65° = 115°).
                </p>
            </div>

            <br>

            <h4>Example 3</h4>

            <p><strong>Problem:</strong></p>
            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">In the figure below, two parallel lines are cut by a transversal. What is the value of <em>x</em>?</p>

            <div style="text-align: center; margin: 1.5rem 0;">
                <svg width="380" height="255" viewBox="0 0 380 255" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="40" y1="90" x2="340" y2="90" stroke="#000" stroke-width="1.5"/>
    <line x1="40" y1="180" x2="340" y2="180" stroke="#000" stroke-width="1.5"/>
    <line x1="100.0" y1="45" x2="195.3" y2="210" stroke="#000" stroke-width="1.5"/>
    <path d="M 142.0,90.0 A 16,16 0 0,1 134.0,103.9" stroke="#000" fill="none" stroke-width="1.2"/>
    <path d="M 169.9,166.1 A 16,16 0 0,1 193.9,180.0" stroke="#000" fill="none" stroke-width="1.2"/>
    <text x="158.9" y="109.0" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle" dominant-baseline="middle">60°</text>
    <text x="196.9" y="147.1" font-family="Times New Roman, serif" font-size="15" font-style="italic" fill="#000" text-anchor="middle" dominant-baseline="middle">x°</text>
</svg>
            </div>

            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">A. 30°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">B. 60°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">C. 90°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">D. 120°</span>
            <span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">E. 240°</span>

            <p style="margin: 0.4rem 0 0.2rem 0; font-size: 0.9rem; font-weight: 600;"><strong>Solution:</strong></p>
            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">With parallel lines and a transversal, all acute angles are equal and all obtuse angles are equal. Any acute angle + any obtuse angle = 180°.</p>

            <div style="background: #f8f9fa; padding: 0.9rem; border-radius: 6px; margin: 0.25rem 0; text-align: center; font-size: 0.9rem; line-height: 1.5;">
                <div style="margin-bottom: 0.2rem;">Acute angle (given): 60°</div>
                <div style="margin-bottom: 0.2rem;">Acute + Obtuse = 180°</div>
                <div style="margin-bottom: 0.2rem;">Obtuse = 180° - 60°</div>
                <div style="color: #10b981; font-weight: bold;">Obtuse angle = 120° ✓</div>
            </div>

            <p style="text-align: center; font-size: 0.9rem; margin-top: 0.3rem;"><strong>Answer: D</strong></p>

            <br>

            <h4>Key Takeaway</h4>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;"><strong>Master Strategy for Angles:</strong></p>
            <ol>
                <li><strong>Vertical angles are equal</strong> - Angles across from each other when lines intersect</li>
                <li><strong>Adjacent angles sum to 180°</strong> - Angles next to each other on a straight line</li>
                <li><strong>Parallel lines create two sets</strong> - All acute angles equal, all obtuse angles equal, and they sum to 180°</li>
            </ol>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Master these three rules and you'll solve any angle problem on the ACT!</p>
        `;

console.log('📊 Complete lesson built:');
console.log('  Length:', completeLesson.length, 'characters');
console.log('  H3 sections:', (completeLesson.match(/<h3>/g) || []).length);
console.log('  H4 sections:', (completeLesson.match(/<h4>/g) || []).length);
console.log('  Examples:', (completeLesson.match(/<h4>Example \d+<\/h4>/g) || []).length);
console.log('  Key Ideas:', (completeLesson.match(/Key Idea:/g) || []).length);
console.log('  Remember box:', (completeLesson.match(/Remember These Two Rules/g) || []).length);

console.log('\n💾 Applying to database...\n');

const { error } = await supabase
  .from('lessons')
  .update({
    content: completeLesson,
    updated_at: new Date().toISOString()
  })
  .eq('id', original.id);

if (error) {
  console.error('❌ Error:', error);
} else {
  console.log('✅ COMPLETE! Lesson fully rebuilt and applied.');
  console.log('\n📋 What was fixed:');
  console.log('  ✅ Added back Rule 2: Adjacent Angles Sum to 180°');
  console.log('  ✅ Added back Example 1 (Vertical Angles)');
  console.log('  ✅ Added back Example 2 (Adjacent Angles)');
  console.log('  ✅ Added 3 Key Idea boxes (subtle style)');
  console.log('  ✅ Added Summary box "Remember These Two Rules"');
  console.log('  ✅ Fixed section structure');
  console.log('  ✅ Proper heading hierarchy');
  console.log('  ✅ Minimalist, clean formatting throughout');
  console.log('\n🔄 Refresh your browser to see the complete lesson!');
}
