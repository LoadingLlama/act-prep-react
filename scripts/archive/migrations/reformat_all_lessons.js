const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Visual mapping for each lesson based on title
const visualMap = {
    'Chapter 3: Geometry Part 1 - Angles': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Complement_angle.svg',
            alt: 'Complementary angles diagram',
            caption: 'Complementary angles: Two angles that add up to 90 degrees',
            position: 'after-heading:Complementary Angles'
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Angle_supplementary1.svg',
            alt: 'Supplementary angles diagram',
            caption: 'Supplementary angles: Two angles that add up to 180 degrees',
            position: 'after-heading:Supplementary Angles'
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Angles_with_parallel_lines.png',
            alt: 'Parallel lines with transversal',
            caption: 'When a transversal crosses parallel lines, it creates several angle relationships',
            position: 'after-heading:Parallel Lines'
        }
    ],
    'Chapter 4: Geometry Part 2 - Shapes': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Dreieck_gleichschenklig-rechtwinklig_rep-2.svg/200px-Dreieck_gleichschenklig-rechtwinklig_rep-2.svg.png',
            alt: '45-45-90 right triangle',
            caption: '45-45-90 Triangle: The legs are equal, and the hypotenuse is leg × √2',
            position: 'after-heading:Special Right Triangles'
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Dreieck_30_60_90_rep-3.svg/200px-Dreieck_30_60_90_rep-3.svg.png',
            alt: '30-60-90 right triangle',
            caption: '30-60-90 Triangle: The sides are in the ratio 1 : √3 : 2',
            position: 'after-heading:Special Right Triangles'
        }
    ],
    'Chapter 5: Lines': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/1/19/FuncionLineal00.svg',
            alt: 'Linear function graph',
            caption: 'Linear functions create straight lines with constant slope',
            position: 'after-intro'
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Linearity.svg',
            alt: 'Parallel and perpendicular lines',
            caption: 'Parallel lines have equal slopes; perpendicular lines have negative reciprocal slopes',
            position: 'after-heading:Parallel and Perpendicular Lines'
        }
    ],
    'Chapter 11: Functions': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Linearity.svg',
            alt: 'Function graph example',
            caption: 'A function maps each input to exactly one output',
            position: 'after-intro'
        }
    ],
    'Chapter 13: Exponents and Roots': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Exponential.svg',
            alt: 'Exponential growth comparison',
            caption: 'Exponential functions grow much faster than linear or polynomial functions',
            position: 'after-heading:Exponential Growth'
        }
    ],
    'Chapter 14: Logarithms': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Logarithm_plots.png',
            alt: 'Logarithm function graphs',
            caption: 'Logarithm functions for different bases - notice they all pass through (1, 0)',
            position: 'after-intro'
        }
    ],
    'Chapter 16: Quadratics': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Function_x%5E2-bx.svg',
            alt: 'Upward opening parabola',
            caption: 'A parabola opening upward (positive leading coefficient)',
            position: 'after-intro'
        }
    ],
    'Chapter 17: Trigonometry': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Unit_circle_used_to_define_sine_and_cosine.svg/400px-Unit_circle_used_to_define_sine_and_cosine.svg.png',
            alt: 'Unit circle with sine and cosine',
            caption: 'The unit circle: sine is the y-coordinate, cosine is the x-coordinate',
            position: 'after-heading:Unit Circle'
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Trigonometric_function_triangle_mnemonic.svg/400px-Trigonometric_function_triangle_mnemonic.svg.png',
            alt: 'Trigonometric ratios in right triangle',
            caption: 'SOH-CAH-TOA: Sine = Opposite/Hypotenuse, Cosine = Adjacent/Hypotenuse, Tangent = Opposite/Adjacent',
            position: 'after-intro'
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Sine_cosine_one_period.svg/400px-Sine_cosine_one_period.svg.png',
            alt: 'Sine and cosine waves',
            caption: 'Sine and cosine functions create periodic waves',
            position: 'after-heading:Trigonometric Functions'
        }
    ],
    'Chapter 19: Matrices': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Matrix_multiplication_diagram_2.svg',
            alt: 'Matrix multiplication diagram',
            caption: 'Matrix multiplication: row × column to get each element',
            position: 'after-heading:Matrix Multiplication'
        }
    ],
    'Chapter 21: Circles, Ellipses, and Hyperbolas': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Circle.svg/250px-Circle.svg.png',
            alt: 'Circle with radius and diameter',
            caption: 'A circle with radius r and diameter d = 2r',
            position: 'after-intro'
        }
    ],
    'Chapter 22: Probability': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/04fig-venn-001.png/200px-04fig-venn-001.png',
            alt: 'Venn diagram',
            caption: 'Venn diagrams help visualize probability relationships between events',
            position: 'after-intro'
        }
    ],
    'Chapter 25: Complex Numbers': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/A_plus_bi.svg',
            alt: 'Complex plane',
            caption: 'The complex plane: real numbers on the x-axis, imaginary numbers on the y-axis',
            position: 'after-intro'
        }
    ],
    'Chapter 31: Arcs and Sectors': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/BogenSektorSegment.svg/400px-BogenSektorSegment.svg.png',
            alt: 'Arc, sector, and segment of a circle',
            caption: 'An arc is part of the circumference; a sector is a "slice" of the circle',
            position: 'after-intro'
        }
    ],
    'Chapter 32: Vectors': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vector_from_A_to_B.svg/300px-Vector_from_A_to_B.svg.png',
            alt: 'Vector representation',
            caption: 'A vector has both magnitude (length) and direction',
            position: 'after-intro'
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/M0006_fVecCart.svg/400px-M0006_fVecCart.svg.png',
            alt: 'Vector components',
            caption: 'A vector can be broken down into x and y components',
            position: 'after-heading:Vector Components'
        }
    ],
    'Chapter 33: Shifting and Transforming Functions': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Function_x%5E2-bx.svg',
            alt: 'Function transformation example',
            caption: 'Functions can be shifted, stretched, or reflected',
            position: 'after-intro'
        }
    ],
    'Chapter 34: Statistics': [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Standard_Normal_Distribution-en.svg/400px-Standard_Normal_Distribution-en.svg.png',
            alt: 'Normal distribution histogram',
            caption: 'A histogram showing the normal distribution - the bell curve',
            position: 'after-heading:Distributions'
        }
    ]
};

// Content cleanup function
function cleanContent(content, title) {
    let cleaned = content;

    // Remove references to "this book", "the book", etc.
    cleaned = cleaned.replace(/\bthis book\b/gi, 'this course');
    cleaned = cleaned.replace(/\bthe book\b/gi, 'these lessons');
    cleaned = cleaned.replace(/\bthroughout the book\b/gi, 'throughout this course');
    cleaned = cleaned.replace(/\bin this book\b/gi, 'in this course');
    cleaned = cleaned.replace(/\bwork through the rest of the book\b/gi, 'as you practice');
    cleaned = cleaned.replace(/\blater in the book\b/gi, 'in upcoming lessons');
    cleaned = cleaned.replace(/\bearlier in the book\b/gi, 'in previous lessons');

    // Change "chapter" references to "lesson" or "topic"
    cleaned = cleaned.replace(/\bnext chapter\b/gi, 'next lesson');
    cleaned = cleaned.replace(/\bprevious chapter\b/gi, 'previous lesson');
    cleaned = cleaned.replace(/\bthis chapter\b/gi, 'this lesson');
    cleaned = cleaned.replace(/\bChapter \d+/g, 'Lesson');

    // Fix duplicate headings - remove if the title appears again in content
    const titleWithoutChapter = title.replace(/^Chapter \d+:\s*/, '');
    const duplicateHeadingRegex = new RegExp(`<h2[^>]*>${title}</h2>\\s*<h2[^>]*>${titleWithoutChapter}</h2>`, 'gi');
    cleaned = cleaned.replace(duplicateHeadingRegex, `<h2>${titleWithoutChapter}</h2>`);

    // Remove excessive line breaks and spacing
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    cleaned = cleaned.replace(/(<\/h[123]>)\s*\n\s*\n\s*\n/g, '$1\n\n');

    // Fix weird dashes and formatting
    cleaned = cleaned.replace(/---+/g, '');
    cleaned = cleaned.replace(/===+/g, '');

    // Ensure paragraphs are wrapped properly
    cleaned = cleaned.replace(/<p>([^<]*)<\/p>/g, (match, p1) => {
        if (p1.trim()) {
            return `<p class="lesson-text">${p1}</p>`;
        }
        return match;
    });

    return cleaned;
}

// Function to create image HTML
function createImageHTML(imageData) {
    return `
<div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
    <img src="${imageData.url}" alt="${imageData.alt}" style="max-width: 400px; height: auto;" />
    <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
        <em>${imageData.caption}</em>
    </p>
</div>
`;
}

// Function to insert visuals into content
function insertVisuals(content, title) {
    const visuals = visualMap[title];
    if (!visuals || visuals.length === 0) {
        return content;
    }

    let enhanced = content;

    visuals.forEach(visual => {
        const imageHTML = createImageHTML(visual);

        if (visual.position === 'after-intro') {
            // Insert after first paragraph or heading
            const firstParagraphMatch = enhanced.match(/(<p[^>]*>.*?<\/p>)/);
            if (firstParagraphMatch) {
                enhanced = enhanced.replace(firstParagraphMatch[0], firstParagraphMatch[0] + imageHTML);
            }
        } else if (visual.position.startsWith('after-heading:')) {
            const headingText = visual.position.replace('after-heading:', '');
            const headingRegex = new RegExp(`(<h[23][^>]*>${headingText}[^<]*<\/h[23]>)`, 'i');
            const match = enhanced.match(headingRegex);
            if (match) {
                enhanced = enhanced.replace(match[0], match[0] + imageHTML);
            } else {
                // If heading not found, try to insert early in content
                const firstHeading = enhanced.match(/(<h2[^>]*>.*?<\/h2>)/);
                if (firstHeading) {
                    enhanced = enhanced.replace(firstHeading[0], firstHeading[0] + imageHTML);
                }
            }
        }
    });

    return enhanced;
}

// Main function to reformat all lessons
async function reformatAllLessons() {
    const changes = [];

    try {
        // Fetch all math lessons
        const { data: lessons, error } = await supabase
            .from('lessons')
            .select('*')
            .eq('subject', 'math')
            .order('id', { ascending: true });

        if (error) throw error;

        console.log(`\n=== REFORMATTING ${lessons.length} MATH LESSONS ===\n`);

        // Process each lesson
        for (let i = 0; i < lessons.length; i++) {
            const lesson = lessons[i];
            console.log(`\n[${i + 1}/${lessons.length}] Processing: ${lesson.title}`);

            const originalContent = lesson.content;

            // Step 1: Clean content
            let newContent = cleanContent(originalContent, lesson.title);

            // Step 2: Insert visuals
            newContent = insertVisuals(newContent, lesson.title);

            // Track changes
            const changeLog = {
                id: lesson.id,
                title: lesson.title,
                contentChanged: originalContent !== newContent,
                visualsAdded: visualMap[lesson.title] ? visualMap[lesson.title].length : 0,
                visualURLs: visualMap[lesson.title] ? visualMap[lesson.title].map(v => v.url) : []
            };

            changes.push(changeLog);

            // Update in Supabase
            const { error: updateError } = await supabase
                .from('lessons')
                .update({ content: newContent })
                .eq('id', lesson.id);

            if (updateError) {
                console.error(`  ❌ Error updating: ${updateError.message}`);
                changeLog.error = updateError.message;
            } else {
                console.log(`  ✅ Updated successfully`);
                console.log(`     - Content cleaned: ${changeLog.contentChanged ? 'YES' : 'NO'}`);
                console.log(`     - Visuals added: ${changeLog.visualsAdded}`);
            }

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Save change report
        const report = {
            timestamp: new Date().toISOString(),
            totalLessons: lessons.length,
            lessonsUpdated: changes.filter(c => c.contentChanged || c.visualsAdded > 0).length,
            totalVisualsAdded: changes.reduce((sum, c) => sum + c.visualsAdded, 0),
            changes: changes
        };

        fs.writeFileSync('/tmp/reformat_report.json', JSON.stringify(report, null, 2));

        console.log('\n\n=== SUMMARY ===');
        console.log(`Total lessons processed: ${report.totalLessons}`);
        console.log(`Lessons updated: ${report.lessonsUpdated}`);
        console.log(`Total visuals added: ${report.totalVisualsAdded}`);
        console.log(`\nDetailed report saved to: /tmp/reformat_report.json`);

        return report;

    } catch (error) {
        console.error('Error reformatting lessons:', error);
        throw error;
    }
}

// Run the script
reformatAllLessons()
    .then(() => {
        console.log('\n✅ All lessons reformatted successfully!');
        process.exit(0);
    })
    .catch(error => {
        console.error('\n❌ Script failed:', error);
        process.exit(1);
    });
