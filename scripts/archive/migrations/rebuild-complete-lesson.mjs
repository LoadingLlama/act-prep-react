/**
 * REBUILD COMPLETE LESSON - Fix All Missing Sections
 *
 * Missing sections:
 * - Rule 2: Adjacent Angles Sum to 180°
 * - Example 1 (Vertical Angles)
 * - Example 2 (Adjacent Angles)
 * - Key Idea boxes
 * - Summary box
 * - Proper Parallel Lines section structure
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const radians = angleInDegrees * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 0.0001) return null;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

function generateRule1Diagram() {
  const cx = 250, cy = 150, lineLength = 80, angle = 70;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);
  const arcRadius = 22;
  const arc1Start = polarToCartesian(cx, cy, arcRadius, 0);
  const arc1End = polarToCartesian(cx, cy, arcRadius, -angle);
  const arc2Start = polarToCartesian(cx, cy, arcRadius, -angle);
  const arc2End = polarToCartesian(cx, cy, arcRadius, 180);
  const arc3Start = polarToCartesian(cx, cy, arcRadius, 180);
  const arc3End = polarToCartesian(cx, cy, arcRadius, 180 - angle);
  const arc4Start = polarToCartesian(cx, cy, arcRadius, 180 - angle);
  const arc4End = polarToCartesian(cx, cy, arcRadius, 360);
  const label1Pos = polarToCartesian(cx, cy, 45, -angle / 2);
  const label2Pos = polarToCartesian(cx, cy, 45, (-angle + 180) / 2);
  const label3Pos = polarToCartesian(cx, cy, 45, 180 - angle / 2);
  const label4Pos = polarToCartesian(cx, cy, 45, (180 - angle + 360) / 2);

  return `<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="2.5"/>
    <path d="M ${arc3Start.x.toFixed(1)},${arc3Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc3End.x.toFixed(1)},${arc3End.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M ${arc4Start.x.toFixed(1)},${arc4Start.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,0 ${arc4End.x.toFixed(1)},${arc4End.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="2.5"/>
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">70°</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">110°</text>
    <text x="${label3Pos.x.toFixed(1)}" y="${label3Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">70°</text>
    <text x="${label4Pos.x.toFixed(1)}" y="${label4Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">110°</text>
</svg>`;
}

function generateRule2Diagram() {
  const cx = 250, cy = 150, lineLength = 80, angle = 55;
  const p1 = polarToCartesian(cx, cy, lineLength, -angle);
  const p2 = polarToCartesian(cx, cy, lineLength, 180 - angle);
  const p3 = polarToCartesian(cx, cy, lineLength, 0);
  const p4 = polarToCartesian(cx, cy, lineLength, 180);
  const arcRadius1 = 22;
  const arc1Start = polarToCartesian(cx, cy, arcRadius1, 0);
  const arc1End = polarToCartesian(cx, cy, arcRadius1, -angle);
  const arcRadius2 = 26;
  const arc2Start = polarToCartesian(cx, cy, arcRadius2, -angle);
  const arc2End = polarToCartesian(cx, cy, arcRadius2, 180);
  const label1Pos = polarToCartesian(cx, cy, 42, -angle / 2);
  const label2Pos = polarToCartesian(cx, cy, 48, (-angle - 180) / 2);

  return `<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}" x2="${p4.x.toFixed(1)}" y2="${p4.y.toFixed(1)}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="#000"/>
    <path d="M ${arc1Start.x.toFixed(1)},${arc1Start.y.toFixed(1)} A ${arcRadius1},${arcRadius1} 0 0,0 ${arc1End.x.toFixed(1)},${arc1End.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M ${arc2Start.x.toFixed(1)},${arc2Start.y.toFixed(1)} A ${arcRadius2},${arcRadius2} 0 0,0 ${arc2End.x.toFixed(1)},${arc2End.y.toFixed(1)}" stroke="#ef4444" fill="none" stroke-width="2.5"/>
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">55°</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="18" font-style="italic" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" font-weight="bold">125°</text>
</svg>`;
}

function generateParallelDiagram() {
  const line1Y = 100, line2Y = 200, lineStart = 50, lineEnd = 450;
  const transAngle = 65, transX1 = 150, transY1 = 40, dy = 220;
  const slope = Math.tan(transAngle * Math.PI / 180);
  const transX2 = transX1 + dy / slope, transY2 = 260;
  const int1 = lineIntersection(lineStart, line1Y, lineEnd, line1Y, transX1, transY1, transX2, transY2);
  const int2 = lineIntersection(lineStart, line2Y, lineEnd, line2Y, transX1, transY1, transX2, transY2);
  if (!int1 || !int2) return '';
  const arcRadius = 25;
  const transDownAngle = Math.atan2(transY2 - int1.y, transX2 - int1.x) * (180 / Math.PI);
  const arcStart1 = polarToCartesian(int1.x, int1.y, arcRadius, 0);
  const arcEnd1 = polarToCartesian(int1.x, int1.y, arcRadius, transDownAngle);
  const transDownAngle2 = Math.atan2(transY2 - int2.y, transX2 - int2.x) * (180 / Math.PI);
  const arcStart2 = polarToCartesian(int2.x, int2.y, arcRadius, 0);
  const arcEnd2 = polarToCartesian(int2.x, int2.y, arcRadius, transDownAngle2);
  const label1Pos = polarToCartesian(int1.x, int1.y, 45, transDownAngle / 2);
  const label2Pos = polarToCartesian(int2.x, int2.y, 45, transDownAngle2 / 2);

  return `<svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
    <line x1="${lineStart}" y1="${line1Y}" x2="${lineEnd}" y2="${line1Y}" stroke="#555" stroke-width="2"/>
    <line x1="${lineStart}" y1="${line2Y}" x2="${lineEnd}" y2="${line2Y}" stroke="#555" stroke-width="2"/>
    <line x1="${transX1.toFixed(1)}" y1="${transY1}" x2="${transX2.toFixed(1)}" y2="${transY2}" stroke="#000" stroke-width="2"/>
    <circle cx="${int1.x.toFixed(1)}" cy="${int1.y.toFixed(1)}" r="3" fill="#000"/>
    <circle cx="${int2.x.toFixed(1)}" cy="${int2.y.toFixed(1)}" r="3" fill="#000"/>
    <path d="M ${arcStart1.x.toFixed(1)},${arcStart1.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,1 ${arcEnd1.x.toFixed(1)},${arcEnd1.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <path d="M ${arcStart2.x.toFixed(1)},${arcStart2.y.toFixed(1)} A ${arcRadius},${arcRadius} 0 0,1 ${arcEnd2.x.toFixed(1)},${arcEnd2.y.toFixed(1)}" stroke="#3b82f6" fill="none" stroke-width="2.5"/>
    <text x="${label1Pos.x.toFixed(1)}" y="${label1Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">a</text>
    <text x="${label2Pos.x.toFixed(1)}" y="${label2Pos.y.toFixed(1)}" font-family="Times New Roman, serif" font-size="20" font-style="italic" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle" font-weight="bold">a</text>
</svg>`;
}

// Generate complete lesson with proper structure
const completeLesson = `
            <h3>Understanding Angles & Lines</h3>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Angles are fundamental to geometry! Understanding angle types and relationships will help you solve many ACT problems. Let's master angles step-by-step, starting with the basics.</p>

            <br>

            <h3>Types of Angles</h3>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">An angle is formed when two lines or rays meet at a point. We measure angles in degrees (°).</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background: #e9ecef;">
                        <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #dee2e6;">Type</th>
                        <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #dee2e6;">Measurement</th>
                        <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #dee2e6;">Example</th>
                    </tr>
                    <tr>
                        <td style="padding: 0.75rem;"><strong>Acute</strong></td>
                        <td style="padding: 0.75rem;">Less than 90°</td>
                        <td style="padding: 0.75rem;">45°, 60°, 30°</td>
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 0.75rem;"><strong>Right</strong></td>
                        <td style="padding: 0.75rem;">Exactly 90°</td>
                        <td style="padding: 0.75rem;">90°</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.75rem;"><strong>Obtuse</strong></td>
                        <td style="padding: 0.75rem;">Greater than 90° but less than 180°</td>
                        <td style="padding: 0.75rem;">120°, 135°, 150°</td>
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 0.75rem;"><strong>Straight</strong></td>
                        <td style="padding: 0.75rem;">Exactly 180°</td>
                        <td style="padding: 0.75rem;">180° (a straight line)</td>
                    </tr>
                </table>
            </div>

            <div style="text-align: center; margin: 2rem 0;">
                <svg width="1000" height="200" viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">
                    <defs>
                        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <polygon points="0 0, 6 3, 0 6" fill="#1f2937"/>
                        </marker>
                    </defs>
                    <g transform="translate(120, 100)">
                        <line x1="0" y1="0" x2="80" y2="0" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>
                        <line x1="0" y1="0" x2="56.57" y2="-56.57" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>
                        <path d="M 35,0 A 35,35 0 0,0 24.75,-24.75" fill="none" stroke="#3b82f6" stroke-width="3"/>
                        <text x="44" y="-18" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">45°</text>
                        <text x="0" y="35" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#1f2937" text-anchor="middle">Acute</text>
                        <text x="0" y="52" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">&lt; 90°</text>
                    </g>
                    <g transform="translate(320, 100)">
                        <line x1="0" y1="0" x2="80" y2="0" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>
                        <line x1="0" y1="0" x2="0" y2="-80" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>
                        <rect x="0" y="-15" width="15" height="15" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
                        <text x="24" y="-24" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">90°</text>
                        <text x="0" y="35" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#1f2937" text-anchor="middle">Right</text>
                        <text x="0" y="52" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">= 90°</text>
                    </g>
                    <g transform="translate(520, 100)">
                        <line x1="0" y1="0" x2="80" y2="0" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>
                        <line x1="0" y1="0" x2="-40" y2="-69.28" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>
                        <path d="M 40,0 A 40,40 0 0,0 -20,-34.64" fill="none" stroke="#ef4444" stroke-width="3"/>
                        <text x="27" y="-48" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">120°</text>
                        <text x="0" y="35" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#1f2937" text-anchor="middle">Obtuse</text>
                        <text x="0" y="52" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">&gt; 90°</text>
                    </g>
                    <g transform="translate(780, 100)">
                        <line x1="-60" y1="0" x2="60" y2="0" stroke="#1f2937" stroke-width="2.5"/>
                        <circle cx="-60" cy="0" r="3" fill="#1f2937"/>
                        <circle cx="60" cy="0" r="3" fill="#1f2937"/>
                        <path d="M -40,0 A 40,40 0 0,1 40,0" fill="none" stroke="#3b82f6" stroke-width="3"/>
                        <text x="0" y="-48" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">180°</text>
                        <text x="0" y="35" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#1f2937" text-anchor="middle">Straight</text>
                        <text x="0" y="52" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">= 180°</text>
                    </g>
                </svg>
            </div>

            <br>

            <h3>When Two Lines Intersect</h3>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">When two straight lines cross, they create 4 angles. Let's learn about them <strong>one rule at a time</strong>.</p>

            <br>

            <h4>Rule 1: Vertical Angles Are Equal</h4>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;"><strong>Vertical angles</strong> are the angles opposite each other when two lines intersect. Vertical angles are always equal.</p>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">In the diagram, the 70° angles are vertical angles (equal to each other). The 110° angles are also vertical angles (equal to each other).</p>

            <div style="text-align: center; margin: 1.5rem 0;">
    ${generateRule1Diagram()}
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

            <p style="text-align: center; font-size: 0.9rem; margin-top: 0.3rem;"><strong>Answer: B</strong></p>

            <p style="margin: 0.4rem 0 0.2rem 0; font-size: 0.9rem; font-weight: 600;"><strong>Solution:</strong></p>
            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">These are vertical angles, so they're equal. Therefore, <em>x</em> = 70°.</p>

            <br>

            <h4>Rule 2: Adjacent Angles Sum to 180°</h4>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;"><strong>Adjacent angles</strong> are two angles that share a common side and together form a straight line. Adjacent angles always sum to 180°.</p>

            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">In the diagram, the 55° angle and the 125° angle are adjacent. Therefore, 55° + 125° = 180°.</p>

            <div style="text-align: center; margin: 1.5rem 0;">
    ${generateRule2Diagram()}
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

            <p style="text-align: center; font-size: 0.9rem; margin-top: 0.3rem;"><strong>Answer: E</strong></p>

            <p style="margin: 0.4rem 0 0.2rem 0; font-size: 0.9rem; font-weight: 600;"><strong>Solution:</strong></p>
            <p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Adjacent angles on a line sum to 180°. So the adjacent angle = 180° − 55° = 125°.</p>

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
    ${generateParallelDiagram()}
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

console.log('Complete lesson generated!');
console.log('Length:', completeLesson.length, 'characters');
console.log('\\nSaving to file for preview...');

import fs from 'fs';
fs.writeFileSync('complete-lesson-preview.html', `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { max-width: 800px; margin: 40px auto; padding: 20px; font-family: Arial, sans-serif; }
    </style>
</head>
<body>
${completeLesson}
</body>
</html>`);

console.log('✅ Preview saved to complete-lesson-preview.html');
console.log('\\n📊 Structure Check:');
console.log('  H3 sections:', (completeLesson.match(/<h3>/g) || []).length);
console.log('  H4 sections:', (completeLesson.match(/<h4>/g) || []).length);
console.log('  Examples:', (completeLesson.match(/<h4>Example \d+<\/h4>/g) || []).length);
console.log('  Key Ideas:', (completeLesson.match(/Key Idea:/g) || []).length);
console.log('  Remember box:', (completeLesson.match(/Remember These Two Rules/g) || []).length);
console.log('  Key Pattern box:', (completeLesson.match(/The Key Pattern/g) || []).length);

export { completeLesson };
`;
</invoke>