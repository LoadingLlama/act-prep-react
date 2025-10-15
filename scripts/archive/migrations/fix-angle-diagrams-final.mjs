import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_ID = '32cbf6f8-bf7e-4dd8-955e-449814417fff';

const improvedContent = `
            <h3>Understanding Angles & Lines</h3>

            <p>Angles are fundamental to geometry! Understanding angle types and relationships will help you solve many ACT problems. Let's master angles step-by-step, starting with the basics.</p>

            <br><br>

            <h3>Types of Angles</h3>

            <p>An angle is formed when two lines or rays meet at a point. We measure angles in degrees (°).</p>

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
                        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                            <polygon points="0 0, 10 5, 0 10" fill="#1f2937"/>
                        </marker>
                    </defs>

                    <!-- ACUTE ANGLE (45°) -->
                    <g transform="translate(120, 100)">
                        <!-- Ray 1: horizontal (0°) -->
                        <line x1="0" y1="0" x2="80" y2="0" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>
                        <!-- Ray 2: 45° up from horizontal (in SVG: negative Y) -->
                        <line x1="0" y1="0" x2="56.57" y2="-56.57" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>

                        <!-- Arc from 0° to 45°, radius 35 -->
                        <!-- Start: (35, 0) at 0° -->
                        <!-- End: (35*cos(45°), -35*sin(45°)) = (24.75, -24.75) at 45° -->
                        <path d="M 35,0 A 35,35 0 0,0 24.75,-24.75" fill="none" stroke="#3b82f6" stroke-width="3"/>

                        <!-- Label at 22.5° (angle bisector), radius 48 -->
                        <!-- Position: (48*cos(22.5°), -48*sin(22.5°)) = (44.36, -18.47) -->
                        <text x="44" y="-18" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">45°</text>

                        <text x="0" y="35" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#1f2937" text-anchor="middle">Acute</text>
                        <text x="0" y="52" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">&lt; 90°</text>
                    </g>

                    <!-- RIGHT ANGLE (90°) -->
                    <g transform="translate(320, 100)">
                        <!-- Ray 1: horizontal (0°) -->
                        <line x1="0" y1="0" x2="80" y2="0" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>
                        <!-- Ray 2: vertical up (90°) -->
                        <line x1="0" y1="0" x2="0" y2="-80" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>

                        <!-- Square indicator for right angle -->
                        <rect x="0" y="-15" width="15" height="15" fill="none" stroke="#3b82f6" stroke-width="2.5"/>

                        <!-- Label at 45° (bisector of 90°), radius 28 from corner of square -->
                        <text x="24" y="-24" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">90°</text>

                        <text x="0" y="35" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#1f2937" text-anchor="middle">Right</text>
                        <text x="0" y="52" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">= 90°</text>
                    </g>

                    <!-- OBTUSE ANGLE (120°) -->
                    <g transform="translate(520, 100)">
                        <!-- Ray 1: horizontal (0°) -->
                        <line x1="0" y1="0" x2="80" y2="0" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>
                        <!-- Ray 2: 120° from horizontal -->
                        <!-- 120° in math = -120° in SVG Y-coords -->
                        <!-- End point: (80*cos(120°), -80*sin(120°)) = (-40, -69.28) -->
                        <line x1="0" y1="0" x2="-40" y2="-69.28" stroke="#1f2937" stroke-width="2.5" marker-end="url(#arrowhead)"/>

                        <!-- Arc from 0° to 120°, radius 40 -->
                        <!-- Start: (40, 0) -->
                        <!-- End: (40*cos(120°), -40*sin(120°)) = (-20, -34.64) -->
                        <!-- Large arc flag = 0 (less than 180°), sweep = 0 (counterclockwise in SVG) -->
                        <path d="M 40,0 A 40,40 0 0,0 -20,-34.64" fill="none" stroke="#ef4444" stroke-width="3"/>

                        <!-- Label at 60° (bisector), radius 55 -->
                        <!-- Position: (55*cos(60°), -55*sin(60°)) = (27.5, -47.63) -->
                        <text x="27" y="-48" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">120°</text>

                        <text x="0" y="35" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#1f2937" text-anchor="middle">Obtuse</text>
                        <text x="0" y="52" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">&gt; 90°</text>
                    </g>

                    <!-- STRAIGHT ANGLE (180°) -->
                    <g transform="translate(780, 100)">
                        <!-- Straight line -->
                        <line x1="-60" y1="0" x2="60" y2="0" stroke="#1f2937" stroke-width="2.5"/>
                        <circle cx="-60" cy="0" r="3" fill="#1f2937"/>
                        <circle cx="60" cy="0" r="3" fill="#1f2937"/>

                        <!-- Perfect semicircular arc above the line -->
                        <!-- Arc from (-40, 0) to (40, 0), radius 40, sweeping upward -->
                        <path d="M -40,0 A 40,40 0 0,1 40,0" fill="none" stroke="#3b82f6" stroke-width="3"/>

                        <!-- Label at top of semicircle -->
                        <text x="0" y="-48" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">180°</text>

                        <text x="0" y="35" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#1f2937" text-anchor="middle">Straight</text>
                        <text x="0" y="52" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">= 180°</text>
                    </g>
                </svg>
            </div>

            <br><br>

            <h3>When Two Lines Intersect</h3>

            <p>When two straight lines cross, they create 4 angles. Two important relationships emerge:</p>

            <p><strong>Rule 1: Vertical Angles Are Equal</strong></p>
            <p>Angles across from each other (vertical angles) are always equal.</p>

            <p><strong>Rule 2: Adjacent Angles Sum to 180°</strong></p>
            <p>Angles next to each other on a straight line (adjacent angles) add up to 180°.</p>

            <div style="text-align: center; margin: 2.5rem 0;">
                <svg width="500" height="400" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">
                    <!-- Two intersecting lines forming an X -->
                    <!-- Line 1: from upper-right to lower-left -->
                    <line x1="400" y1="60" x2="100" y2="240" stroke="#1f2937" stroke-width="3"/>
                    <!-- Line 2: from upper-left to lower-right -->
                    <line x1="120" y1="40" x2="380" y2="260" stroke="#1f2937" stroke-width="3"/>

                    <!-- Center point at intersection -->
                    <circle cx="250" cy="150" r="4" fill="#1f2937"/>

                    <!-- Calculate the 4 rays from center (250, 150):
                         Upper-right: toward (400, 60) - angle ≈ -31°
                         Lower-right: toward (380, 260) - angle ≈ +49°
                         Upper-left: toward (120, 40) - angle ≈ -149°
                         Lower-left: toward (100, 240) - angle ≈ +149°
                    -->

                    <!-- RIGHT: Acute angle (a - blue) between upper-right and lower-right rays -->
                    <!-- Start at angle -31°, end at angle +49°, arc about 80° -->
                    <path d="M 279.8,131.5 A 35,35 0 0,1 276.6,172.8" fill="none" stroke="#3b82f6" stroke-width="3"/>
                    <text x="300" y="150" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">a</text>

                    <!-- LEFT: Acute angle (a - blue) between upper-left and lower-left rays -->
                    <!-- Start at angle -149°, end at angle +149°, arc about 62° (the smaller arc going left) -->
                    <path d="M 223.4,127.2 A 35,35 0 0,0 220.2,168.6" fill="none" stroke="#3b82f6" stroke-width="3"/>
                    <text x="200" y="150" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">a</text>

                    <!-- TOP: Obtuse angle (b - red) between upper-left and upper-right rays -->
                    <!-- Start at angle -149°, end at angle -31°, large arc going upward -->
                    <path d="M 223.4,127.2 A 50,50 0 0,1 279.8,131.5" fill="none" stroke="#ef4444" stroke-width="3"/>
                    <text x="250" y="100" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">b</text>

                    <!-- BOTTOM: Obtuse angle (b - red) between lower-left and lower-right rays -->
                    <!-- Start at angle +149°, end at angle +49°, large arc going downward -->
                    <path d="M 220.2,168.6 A 50,50 0 0,0 276.6,172.8" fill="none" stroke="#ef4444" stroke-width="3"/>
                    <text x="250" y="200" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">b</text>

                    <!-- Rule boxes -->
                    <rect x="30" y="310" width="440" height="35" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" rx="6"/>
                    <text x="250" y="332" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">
                        Vertical angles are equal: a = a
                    </text>

                    <rect x="30" y="355" width="440" height="35" fill="#fef2f2" stroke="#ef4444" stroke-width="2" rx="6"/>
                    <text x="250" y="377" font-family="Arial, sans-serif" font-size="15" font-weight="600" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">
                        Adjacent angles sum to 180°: a + b = 180°
                    </text>
                </svg>
            </div>

            <br><br>

            <h4>Example 1</h4>

            <p><strong>Problem:</strong></p>
            <p>Two lines intersect. If one angle measures 70°, what is the measure of the angle directly across from it (the vertical angle)?</p>

            <div style="text-align: center; margin: 1.5rem 0;">
                <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">
                    <!-- Two intersecting lines -->
                    <!-- Line 1: from top-right to bottom-left -->
                    <line x1="340" y1="50" x2="60" y2="210" stroke="#1f2937" stroke-width="3"/>
                    <!-- Line 2: from top-left to bottom-right -->
                    <line x1="90" y1="40" x2="310" y2="220" stroke="#1f2937" stroke-width="3"/>

                    <!-- Center point (calculated intersection) -->
                    <circle cx="200" cy="130" r="4" fill="#1f2937"/>

                    <!-- RIGHT side: acute angle - label 70° -->
                    <text x="250" y="130" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">70°</text>

                    <!-- LEFT side: acute angle (vertical) - label ? -->
                    <text x="150" y="130" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">?</text>

                    <!-- TOP side: obtuse angle - label 110° -->
                    <text x="200" y="90" font-family="Arial, sans-serif" font-size="18" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">110°</text>

                    <!-- BOTTOM side: obtuse angle - label 110° -->
                    <text x="200" y="170" font-family="Arial, sans-serif" font-size="18" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">110°</text>

                    <!-- Question -->
                    <text x="200" y="270" font-family="Arial, sans-serif" font-size="15" font-style="italic" fill="#374151" text-anchor="middle">Find the vertical angle (opposite 70°)</text>
                </svg>
            </div>

            <p>A. 20°<br>
            B. 70°<br>
            C. 90°<br>
            D. 110°<br>
            E. 140°</p>

            <p><strong>Solution:</strong></p>
            <p>When two lines intersect, vertical angles (angles across from each other) are always equal!</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">Given angle: 70°</div>
                <div style="margin-bottom: 0.8rem;">Vertical angles are equal</div>
                <div style="color: #10b981; font-weight: bold;">Vertical angle = 70° ✓</div>
            </div>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: B</strong></p>

            <br><br>

            <h4>Example 2</h4>

            <p><strong>Problem:</strong></p>
            <p>Two lines intersect. If one angle measures 55°, what is the measure of an adjacent angle (an angle next to it)?</p>

            <div style="text-align: center; margin: 1.5rem 0;">
                <svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">
                    <!-- Horizontal baseline -->
                    <line x1="80" y1="160" x2="420" y2="160" stroke="#1f2937" stroke-width="4"/>

                    <!-- Angled line at exactly 55° from horizontal -->
                    <!-- 55° means endpoint at (250 + r*cos(55°), 160 - r*sin(55°)) where r=120 -->
                    <!-- cos(55°)=0.574, sin(55°)=0.819 -->
                    <!-- Endpoint: (250 + 68.9, 160 - 98.3) = (318.9, 61.7) -->
                    <line x1="250" y1="160" x2="319" y2="62" stroke="#1f2937" stroke-width="4"/>

                    <!-- Center intersection point -->
                    <circle cx="250" cy="160" r="5" fill="#1f2937"/>

                    <!-- 55° acute angle (between horizontal-right and angled line) -->
                    <!-- Arc from horizontal right (45 units right) to the 55° line -->
                    <!-- Start: (295, 160), End: (295*cos(-55°)+250, 295-45*sin(55°)) -->
                    <path d="M 295,160 A 45,45 0 0,0 275.8,123.2" fill="none" stroke="#3b82f6" stroke-width="4"/>
                    <text x="310" y="135" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">55°</text>

                    <!-- 125° obtuse adjacent angle (between angled line and horizontal-left) -->
                    <!-- This is the larger arc going from the angled line to horizontal left -->
                    <path d="M 275.8,123.2 A 60,60 0 0,0 190,160" fill="none" stroke="#ef4444" stroke-width="4"/>
                    <text x="205" y="120" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">?</text>

                    <!-- Explanation -->
                    <text x="250" y="290" font-family="Arial, sans-serif" font-size="16" font-style="italic" fill="#374151" text-anchor="middle">Adjacent angles on a straight line sum to 180°</text>
                </svg>
            </div>

            <p>A. 35°<br>
            B. 55°<br>
            C. 90°<br>
            D. 125°<br>
            E. 235°</p>

            <p><strong>Solution:</strong></p>
            <p>Adjacent angles on a straight line always add up to 180°!</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">Given angle: 55°</div>
                <div style="margin-bottom: 0.8rem;">Adjacent angles sum to 180°</div>
                <div style="margin-bottom: 0.8rem;">Adjacent angle = 180° - 55°</div>
                <div style="color: #10b981; font-weight: bold;">Adjacent angle = 125° ✓</div>
            </div>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: D</strong></p>

            <br><br>

            <h3>Parallel Lines Cut by a Transversal</h3>

            <p><strong>This is THE most important angle concept on the ACT!</strong> When two parallel lines are crossed by another line (called a transversal), only TWO different angle measurements exist.</p>

            <div style="background: #eff6ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 2rem 0;">
                <p style="margin: 0; font-weight: 600; color: #1e3a8a;">The Key Pattern:</p>
                <ul style="margin: 0.5rem 0 0 1.5rem;">
                    <li><strong>Set 1 (angles 1, 3, 5, 7):</strong> Four angles are equal - all acute, forming vertical pairs</li>
                    <li><strong>Set 2 (angles 2, 4, 6, 8):</strong> Four angles are equal - all obtuse, forming vertical pairs</li>
                    <li><strong>Relationship:</strong> Any angle from Set 1 + any angle from Set 2 = 180°</li>
                </ul>
            </div>

            <div style="text-align: center; margin: 2.5rem 0;">
                <svg width="600" height="520" viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">
                    <!-- Parallel lines -->
                    <line x1="60" y1="110" x2="540" y2="110" stroke="#1f2937" stroke-width="3.5"/>
                    <line x1="60" y1="300" x2="540" y2="300" stroke="#1f2937" stroke-width="3.5"/>

                    <!-- Parallel symbols -->
                    <line x1="510" y1="102" x2="528" y2="102" stroke="#6b7280" stroke-width="2"/>
                    <line x1="510" y1="118" x2="528" y2="118" stroke="#6b7280" stroke-width="2"/>
                    <line x1="510" y1="292" x2="528" y2="292" stroke="#6b7280" stroke-width="2"/>
                    <line x1="510" y1="308" x2="528" y2="308" stroke="#6b7280" stroke-width="2"/>

                    <!-- Labels L₁ and L₂ -->
                    <text x="550" y="110" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₁</text>
                    <text x="550" y="300" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₂</text>

                    <!-- Transversal line -->
                    <line x1="220" y1="30" x2="410" y2="380" stroke="#4b5563" stroke-width="3.5"/>

                    <!-- Intersection points (calculated) -->
                    <circle cx="263.4" cy="110" r="4" fill="#1f2937"/>
                    <circle cx="366.6" cy="300" r="4" fill="#1f2937"/>

                    <!-- TOP INTERSECTION - Labels positioned at angle bisectors (geometrically calculated) -->
                    <!-- Angle 1: acute, upper-left quadrant (blue) - bisector at ~210° -->
                    <text x="237.6" y="94.7" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">1</text>

                    <!-- Angle 2: obtuse, upper-right quadrant (red) - bisector at ~300° -->
                    <text x="278.8" y="84.2" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">2</text>

                    <!-- Angle 3: acute, lower-right quadrant (blue) - VERTICAL to angle 1, bisector at ~30° -->
                    <text x="289.2" y="125.3" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">3</text>

                    <!-- Angle 4: obtuse, lower-left quadrant (red) - VERTICAL to angle 2, bisector at ~120° -->
                    <text x="248.1" y="135.8" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">4</text>

                    <!-- BOTTOM INTERSECTION - Labels positioned at angle bisectors (geometrically calculated) -->
                    <!-- Angle 5: acute, upper-left quadrant (blue) - corresponds to angle 1 -->
                    <text x="340.8" y="284.7" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">5</text>

                    <!-- Angle 6: obtuse, upper-right quadrant (red) - corresponds to angle 2 -->
                    <text x="381.9" y="274.2" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">6</text>

                    <!-- Angle 7: acute, lower-right quadrant (blue) - VERTICAL to angle 5, corresponds to angle 3 -->
                    <text x="392.4" y="315.3" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">7</text>

                    <!-- Angle 8: obtuse, lower-left quadrant (red) - VERTICAL to angle 6, corresponds to angle 4 -->
                    <text x="351.2" y="325.8" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">8</text>

                    <!-- Legend -->
                    <rect x="80" y="410" width="440" height="42" fill="#eff6ff" stroke="#3b82f6" stroke-width="2.5" rx="7"/>
                    <circle cx="105" cy="431" r="8" fill="#3b82f6"/>
                    <text x="130" y="431" font-family="Arial, sans-serif" font-size="17" font-weight="600" fill="#1f2937" dominant-baseline="middle">
                        Acute angles (1, 3, 5, 7): All equal (vertical pairs)
                    </text>

                    <rect x="80" y="465" width="440" height="42" fill="#fef2f2" stroke="#ef4444" stroke-width="2.5" rx="7"/>
                    <circle cx="105" cy="486" r="8" fill="#ef4444"/>
                    <text x="130" y="486" font-family="Arial, sans-serif" font-size="17" font-weight="600" fill="#1f2937" dominant-baseline="middle">
                        Obtuse angles (2, 4, 6, 8): All equal (vertical pairs)
                    </text>
                </svg>
            </div>

            <div style="background: #f8f9fa; padding: 1rem 1.5rem; border-radius: 8px; margin: 1.5rem 0; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; font-style: italic; color: #1f2937; font-size: 15px;">
                    <strong>Example:</strong> If angle 1 = 65°, then angles 3, 5, and 7 also equal 65° (all vertical pairs). And angles 2, 4, 6, and 8 all equal 115° (since 180° − 65° = 115°).
                </p>
            </div>

            <br>

            <h4>Example 3</h4>

            <p><strong>Problem:</strong></p>
            <p>Lines L₁ and L₂ are parallel. A transversal intersects both lines, creating 8 angles. If one of the acute angles measures 60°, what is the measure of one of the obtuse angles?</p>

            <div style="text-align: center; margin: 1.5rem 0;">
                <svg width="550" height="400" viewBox="0 0 550 400" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">
                    <!-- Parallel horizontal lines -->
                    <line x1="70" y1="120" x2="480" y2="120" stroke="#1f2937" stroke-width="4"/>
                    <line x1="70" y1="260" x2="480" y2="260" stroke="#1f2937" stroke-width="4"/>

                    <!-- Parallel symbols -->
                    <line x1="450" y1="112" x2="468" y2="112" stroke="#6b7280" stroke-width="2.5"/>
                    <line x1="450" y1="128" x2="468" y2="128" stroke="#6b7280" stroke-width="2.5"/>
                    <line x1="450" y1="252" x2="468" y2="252" stroke="#6b7280" stroke-width="2.5"/>
                    <line x1="450" y1="268" x2="468" y2="268" stroke="#6b7280" stroke-width="2.5"/>

                    <!-- Transversal creating ACTUAL 60° angle (slope = tan(60°) = 1.732) -->
                    <line x1="180" y1="60" x2="330" y2="320" stroke="#4b5563" stroke-width="4"/>

                    <!-- Intersection points (calculated for 60° transversal) -->
                    <circle cx="214.6" cy="120" r="5" fill="#1f2937"/>
                    <circle cx="295.5" cy="260" r="5" fill="#1f2937"/>

                    <!-- TOP INTERSECTION: TRUE 60° angles -->
                    <!-- Acute 60°: LOWER-RIGHT quadrant -->
                    <path d="M 264.6,120.0 A 50,50 0 0,1 239.6,163.3" fill="none" stroke="#3b82f6" stroke-width="4"/>
                    <text x="275.3" y="155.0" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>

                    <!-- Acute 60°: UPPER-LEFT quadrant (vertical pair to lower-right) -->
                    <path d="M 164.6,120.0 A 50,50 0 0,1 189.6,76.7" fill="none" stroke="#3b82f6" stroke-width="4"/>
                    <text x="153.9" y="85.0" font-family="Arial, sans-serif" font-size="22" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>

                    <!-- Obtuse 120°: UPPER-RIGHT quadrant (adjacent to lower-right acute) -->
                    <path d="M 184.6,68.0 A 60,60 0 0,0 274.6,120.0" fill="none" stroke="#ef4444" stroke-width="4"/>
                    <text x="254.6" y="50.7" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">?</text>

                    <!-- BOTTOM INTERSECTION: TRUE 60° angles -->
                    <!-- Acute 60°: LOWER-RIGHT quadrant -->
                    <path d="M 345.5,260.0 A 50,50 0 0,1 320.5,303.3" fill="none" stroke="#3b82f6" stroke-width="4"/>
                    <text x="356.2" y="295.0" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>

                    <!-- Acute 60°: UPPER-LEFT quadrant (vertical pair to lower-right) -->
                    <path d="M 245.5,260.0 A 50,50 0 0,1 270.5,216.7" fill="none" stroke="#3b82f6" stroke-width="4"/>
                    <text x="234.8" y="225.0" font-family="Arial, sans-serif" font-size="22" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">60°</text>

                    <!-- Obtuse 120°: UPPER-RIGHT quadrant (adjacent to lower-right acute) -->
                    <path d="M 265.5,208.0 A 60,60 0 0,0 355.5,260.0" fill="none" stroke="#ef4444" stroke-width="4"/>
                    <text x="335.5" y="190.7" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle">?</text>

                    <!-- Line labels -->
                    <text x="500" y="120" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₁</text>
                    <text x="500" y="260" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1f2937" dominant-baseline="middle">L₂</text>

                    <!-- Question -->
                    <text x="275" y="365" font-family="Arial, sans-serif" font-size="16" font-style="italic" fill="#374151" text-anchor="middle">Acute angles (vertical pairs) = 60°. Obtuse angles = ?</text>
                </svg>
            </div>

            <p>A. 30°<br>
            B. 60°<br>
            C. 90°<br>
            D. 120°<br>
            E. 240°</p>

            <p><strong>Solution:</strong></p>
            <p>With parallel lines and a transversal, all acute angles are equal and all obtuse angles are equal. Any acute angle + any obtuse angle = 180°.</p>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;">
                <div style="margin-bottom: 0.8rem;">Acute angle (given): 60°</div>
                <div style="margin-bottom: 0.8rem;">Acute + Obtuse = 180°</div>
                <div style="margin-bottom: 0.8rem;">Obtuse = 180° - 60°</div>
                <div style="color: #10b981; font-weight: bold;">Obtuse angle = 120° ✓</div>
            </div>

            <p style="text-align: center; font-size: 1.1rem; margin-top: 1.5rem;"><strong>Answer: D</strong></p>

            <br><br>

            <h4>Key Takeaway</h4>

            <p><strong>Master Strategy for Angles:</strong></p>
            <ol>
                <li><strong>Vertical angles are equal</strong> - Angles across from each other when lines intersect</li>
                <li><strong>Adjacent angles sum to 180°</strong> - Angles next to each other on a straight line</li>
                <li><strong>Parallel lines create two sets</strong> - All acute angles equal, all obtuse angles equal, and they sum to 180°</li>
            </ol>

            <p>Master these three rules and you'll solve any angle problem on the ACT!</p>
        `;

async function fixAngleDiagrams() {
  console.log('🎯 Updating diagrams with GEOMETRIC PRECISION...\n');

  try {
    console.log('Applying geometrically calculated positions...');
    const { error: contentError } = await supabase
      .from('lessons')
      .update({
        content: improvedContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', LESSON_ID);

    if (contentError) {
      console.log('❌ Error:', contentError.message);
      return;
    }

    console.log('✅ Diagrams FIXED with REAL geometric calculations!');
    console.log('\n🔬 Diagram 3: Parallel Lines (Main)');
    console.log('   ✓ Intersection 1 calculated at (263.4, 110)');
    console.log('   ✓ Intersection 2 calculated at (366.6, 300)');
    console.log('   ✓ All 8 angle labels positioned at geometric bisectors');
    console.log('   ✓ Vertical pairs: 1&3, 2&4, 5&7, 6&8 (mathematically correct!)');
    console.log('\n📝 Example 3: 60° Parallel Lines Problem - CORRECTED!');
    console.log('   ✓ Transversal redesigned: (180, 60) → (330, 320)');
    console.log('   ✓ Slope: 1.732 (tan(60°)) - creates ACTUAL 60° angles!');
    console.log('   ✓ Intersection 1: (214.6, 120)');
    console.log('   ✓ Intersection 2: (295.5, 260)');
    console.log('   ✓ Arc paths calculated with TRUE 60° trigonometry');
    console.log('   ✓ Labels positioned at calculated arc bisectors');
    console.log('\n🎉 FIXED: Transversal now creates real 60° angles (not 47°)!');
    console.log('💡 Geometric library available: geometry-diagram-generator.mjs');
  } catch (error) {
    console.log('❌ Unexpected error:', error.message);
  }
}

fixAngleDiagrams();
