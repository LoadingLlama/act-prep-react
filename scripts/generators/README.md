# ACT Math Question Generators

This directory contains reusable question generators for ACT prep lessons.

## 📁 Directory Structure

```
generators/
├── README.md                           # This file
├── parallel-lines-generator.mjs        # Lesson 2.1: Parallel Lines & Transversals
└── [future generators...]
```

## 🎯 Purpose

Each generator creates **unlimited unique, mathematically accurate problems** for a specific ACT math topic. Generators ensure:

- ✅ Mathematical accuracy (no hardcoded values)
- ✅ Visual variety (multiple orientations, label positions)
- ✅ Question diversity (multiple question types per topic)
- ✅ ACT-style presentation (clean, minimal diagrams)
- ✅ Pedagogical progression (from simple to complex)

## 🚀 Quick Start

### Using a Generator

```javascript
import { generateACTParallelLinesProblem } from './generators/parallel-lines-generator.mjs';

// Generate a problem
const problem = generateACTParallelLinesProblem({
  acuteAngle: 45,
  questionType: 'supplementary',
  flipTransversal: false
});

console.log(problem.question);  // "In the diagram below..."
console.log(problem.svg);       // <svg>...</svg>
console.log(problem.answer);    // "135°"
console.log(problem.explanation); // "Supplementary angles..."
```

### Testing a Generator

```bash
node generators/parallel-lines-generator.mjs
```

## 📖 Parallel Lines Generator (Lesson 2.1)

**File:** `parallel-lines-generator.mjs`

**Topic:** Parallel lines cut by a transversal

**Configuration Options:**

```javascript
{
  acuteAngle: 60,              // Angle measure (1-89°)
  questionType: 'supplementary', // Question type (see below)
  flipTransversal: false,      // Flip transversal orientation
  labelPosition: 'top_lr',     // Where to place given angle label
  problemNumber: 1             // Display number
}
```

**Question Types:**

| Type | Concept | Example |
|------|---------|---------|
| `supplementary` | Linear pairs sum to 180° | "If angle is 60°, find obtuse angle" |
| `corresponding` | F-pattern angles are equal | "Find corresponding angle" |
| `alternate_interior` | Z-pattern angles are equal | "Find alternate interior angle" |
| `vertical` | Opposite angles are equal | "Find vertical angle" |
| `combined` | Multi-step reasoning | "Use corresponding + supplementary" |

**Output:**

```javascript
{
  svg: "<svg>...</svg>",           // Clean ACT-style diagram
  question: "In the diagram...",   // Problem statement
  answer: "120°",                  // Correct answer
  explanation: "Supplementary...", // Step-by-step explanation
  acuteAngle: 60,
  obtuseAngle: 120,
  questionType: "supplementary",
  flipTransversal: false,
  labelPosition: "top_lr",
  problemNumber: 1
}
```

## 🏗️ Creating a New Generator

Use `parallel-lines-generator.mjs` as a template. Here's the general structure:

### 1. Geometry Utility Functions

```javascript
// Reusable math functions
function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) { ... }
function getAngle(x1, y1, x2, y2) { ... }
function polarToCartesian(cx, cy, radius, angle) { ... }
```

### 2. Question Type Definitions

```javascript
const QUESTION_TYPES = {
  TYPE_A: 'type_a',
  TYPE_B: 'type_b',
  // ...
};
```

### 3. Main Generator Function

```javascript
function generateProblem(config = {}) {
  // 1. Parse configuration
  // 2. Calculate geometry
  // 3. Generate all possible elements
  // 4. Select what to show based on question type
  // 5. Generate SVG
  // 6. Return complete problem
}
```

### 4. Element Generation

```javascript
function generateAllElements(...) {
  // Create all possible elements (angles, sides, etc.)
  // Return structured map for flexible selection
}
```

### 5. Question Selection Logic

```javascript
function selectElementsForQuestion(allElements, questionType, ...) {
  // Choose what to show
  // Generate question text
  // Generate answer
  // Generate explanation
}
```

### 6. SVG Generation

```javascript
function generateSVG({ ...params }) {
  // Create clean, minimal SVG
  // ACT-style: thin lines, professional appearance
  // Return SVG string
}
```

### 7. Export

```javascript
export { generateProblem, QUESTION_TYPES, ...utils };
```

## 💡 Best Practices

### Mathematical Accuracy

✅ **DO:** Calculate everything using trigonometry
```javascript
const slope = Math.tan(angle * Math.PI / 180);
const x2 = x1 + dy / slope;
```

❌ **DON'T:** Use hardcoded coordinates
```javascript
const x2 = 330; // What angle is this??
```

### Question Variety

- Support multiple question types (at least 3-5)
- Support multiple orientations/configurations
- Support different label positions
- Ensure problems look visually different

### Code Organization

- Comment extensively (this is a template!)
- Use clear function names
- Separate concerns (geometry → selection → SVG)
- Export utilities for reuse

### Testing

- Include standalone test execution
- Test all question types
- Test edge cases (very small/large angles)
- Verify mathematical accuracy

## 🎓 Future Generators (Planned)

### Lesson 2.2: Triangles
- Triangle angle sum
- Exterior angles
- Special triangles (30-60-90, 45-45-90)
- Pythagorean theorem

### Lesson 2.3: Polygons
- Interior angle sum
- Regular polygons
- Exterior angles

### Lesson 3.1: Circles
- Arc measures
- Inscribed angles
- Chord properties

### Lesson 4.1: Coordinate Geometry
- Distance formula
- Midpoint formula
- Slope

## 📝 Usage in Database Scripts

```javascript
import { generateACTParallelLinesProblem } from './generators/parallel-lines-generator.mjs';

// Generate 10 practice problems
const problems = [];
for (let i = 1; i <= 10; i++) {
  const problem = generateACTParallelLinesProblem({
    acuteAngle: 30 + i * 5,  // 35°, 40°, 45°, ...
    questionType: i % 2 === 0 ? 'supplementary' : 'corresponding',
    problemNumber: i
  });
  problems.push(problem);
}

// Save to database
await saveLessonProblems('2.1', problems);
```

## 🔧 Maintenance

- Keep generators in sync with lesson content
- Add new question types as needed
- Update styling to match ACT exam changes
- Test generators after geometry utility updates

## 📚 Resources

- **ACT Math Test Specs:** https://www.act.org/content/act/en/products-and-services/the-act/test-preparation.html
- **SVG Reference:** https://developer.mozilla.org/en-US/docs/Web/SVG
- **Geometry Formulas:** Review lesson content files

---

**Last Updated:** 2025-10-10
**Maintained By:** ACT Prep Development Team
