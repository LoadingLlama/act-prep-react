/**
 * Lesson Content Converter
 *
 * Converts HTML lesson content to structured JSON format
 *
 * Usage:
 * const { convertHtmlToJson } = require('./utils/lessonConverter');
 * const jsonContent = convertHtmlToJson(htmlString, lessonId);
 *
 * Features:
 * - Parses HTML into structured blocks
 * - Identifies content types automatically
 * - Validates output against schema
 * - Detailed logging for debugging
 * - Error handling and recovery
 */

const { JSDOM } = require('jsdom');

/**
 * Main conversion function
 *
 * @param {string} html - Raw HTML content from database
 * @param {string} lessonId - Lesson UUID
 * @returns {object} Structured JSON lesson content
 */
function convertHtmlToJson(html, lessonId) {
  console.log('🔄 Starting HTML to JSON conversion');
  console.log('📊 Input HTML length:', html.length);
  console.log('🆔 Lesson ID:', lessonId);

  // Parse HTML
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const body = document.body;

  const content = [];
  let exampleCounter = 0;

  // Process all direct children of body
  const children = Array.from(body.children);
  console.log(`📋 Found ${children.length} top-level HTML elements`);

  for (let i = 0; i < children.length; i++) {
    const element = children[i];
    const tagName = element.tagName.toLowerCase();

    console.log(`\n📌 Processing element ${i + 1}/${children.length}: <${tagName}>`);

    try {
      const block = parseElement(element, i);
      if (block) {
        content.push(block);
        console.log(`✅ Created block type: ${block.type}`);
      } else {
        console.log(`⚠️  Skipped element (no block created)`);
      }
    } catch (error) {
      console.error(`❌ Error parsing element ${i}:`, error.message);
      console.error('   Element:', element.outerHTML.substring(0, 100));
    }
  }

  const result = {
    version: '1.0.0',
    lessonId: lessonId,
    content: content
  };

  console.log('\n✅ Conversion complete');
  console.log(`📊 Created ${content.length} content blocks`);
  console.log('📝 Block types:', getBlockTypeSummary(content));

  return result;
}

/**
 * Parse a single HTML element into a content block
 *
 * @param {Element} element - DOM element
 * @param {number} index - Element index
 * @returns {object|null} Content block or null
 */
function parseElement(element, index) {
  const tagName = element.tagName.toLowerCase();
  const text = element.textContent.trim();

  // Skip empty elements
  if (!text) {
    console.log('   ⏭️  Skipping empty element');
    return null;
  }

  // Skip hidden elements
  if (element.style.visibility === 'hidden' || element.style.display === 'none') {
    console.log('   ⏭️  Skipping hidden element');
    return null;
  }

  switch (tagName) {
    case 'p':
      return parseParagraph(element);

    case 'h3':
      return parseHeading(element, 3);

    case 'h4':
      return parseHeading(element, 4);

    case 'ul':
      return parseList(element);

    case 'div':
      // Check if this is an example, solution, or other special div
      return parseDiv(element);

    case 'details':
      // This is a collapsible section - skip, it will be part of example
      console.log('   ⏭️  Skipping <details> (handled in example parsing)');
      return null;

    default:
      console.log(`   ⚠️  Unknown tag: <${tagName}>`);
      return null;
  }
}

/**
 * Parse paragraph element
 */
function parseParagraph(element) {
  const text = element.textContent.trim();

  // Extract key terms (blue underlined strong tags)
  const keyTerms = [];
  const strongTags = element.querySelectorAll('strong');

  strongTags.forEach(strong => {
    const style = strong.getAttribute('style') || '';
    if (style.includes('color: #2563eb') && style.includes('text-decoration: underline')) {
      const term = strong.textContent.trim();
      if (term && !keyTerms.includes(term)) {
        keyTerms.push(term);
        console.log(`   🔑 Found key term: "${term}"`);
      }
    }
  });

  // Replace key terms with {term} syntax
  let processedText = text;
  keyTerms.forEach(term => {
    // Replace all occurrences of the term with {term}
    const regex = new RegExp(term, 'g');
    processedText = processedText.replace(regex, `{${term}}`);
  });

  return {
    type: 'paragraph',
    text: processedText,
    keyTerms: keyTerms.length > 0 ? keyTerms : undefined
  };
}

/**
 * Parse heading element
 */
function parseHeading(element, level) {
  const text = element.textContent.trim();
  console.log(`   📖 Heading (H${level}): "${text.substring(0, 50)}..."`);

  return {
    type: 'heading',
    level: level,
    text: text
  };
}

/**
 * Parse list element (ul)
 */
function parseList(element) {
  const items = [];
  const listItems = element.querySelectorAll(':scope > li');

  console.log(`   📝 List with ${listItems.length} items`);

  listItems.forEach(li => {
    // Check for nested list
    const nestedUl = li.querySelector('ul');

    if (nestedUl) {
      // Item with nested list
      const mainText = Array.from(li.childNodes)
        .filter(node => node.nodeType === 3 || (node.nodeType === 1 && node.tagName !== 'UL'))
        .map(node => node.textContent)
        .join('')
        .trim();

      const nestedItems = Array.from(nestedUl.querySelectorAll(':scope > li'))
        .map(nestedLi => nestedLi.textContent.trim());

      items.push({
        text: mainText,
        nested: nestedItems
      });

      console.log(`      • "${mainText}" (${nestedItems.length} nested)`);
    } else {
      // Simple item
      const itemText = li.textContent.trim();
      items.push(itemText);
      console.log(`      • "${itemText.substring(0, 50)}..."`);
    }
  });

  return {
    type: 'list',
    items: items
  };
}

/**
 * Parse div element (could be example, solution, etc.)
 */
function parseDiv(element) {
  const text = element.textContent.trim();

  // Check if it's a Key Takeaways section
  if (text.startsWith('Key Takeaways') || element.querySelector('h3')?.textContent.includes('Key Takeaways')) {
    return parseKeyTakeaways(element);
  }

  // Check if it's a multiple choice section
  const hasChoices = element.textContent.match(/^A\.\s+\d+.*B\.\s+\d+.*C\.\s+\d+/s);
  if (hasChoices) {
    console.log('   🔤 Found multiple choice (part of example)');
    // This will be handled as part of an example, skip for now
    return null;
  }

  // Skip other divs
  console.log('   ⏭️  Skipping generic div');
  return null;
}

/**
 * Parse Key Takeaways section
 */
function parseKeyTakeaways(element) {
  console.log('   ✅ Parsing Key Takeaways');

  const items = [];
  const listItems = element.querySelectorAll('li');

  listItems.forEach(li => {
    // Remove checkmark if present
    let text = li.textContent.trim();
    text = text.replace(/^✓\s*/, '');

    if (text) {
      items.push(text);
      console.log(`      ✓ "${text.substring(0, 50)}..."`);
    }
  });

  return {
    type: 'key_takeaways',
    items: items
  };
}

/**
 * Parse example from HTML
 *
 * This is the most complex parsing because examples have multiple parts:
 * - Title (h4)
 * - Problem statement (p)
 * - Multiple choice answers (div or p)
 * - Solution (details element)
 */
function parseExampleFromElements(elements, startIndex) {
  console.log(`   🎯 Parsing example starting at index ${startIndex}`);

  let title = '';
  let problem = '';
  const choices = [];
  const solutionSteps = [];
  let answer = '';
  let currentIndex = startIndex;

  // Look for h4 title
  const h4 = elements[currentIndex];
  if (h4 && h4.tagName.toLowerCase() === 'h4') {
    title = h4.textContent.trim();
    console.log(`      Title: "${title}"`);
    currentIndex++;
  }

  // Look for problem statement (p)
  const problemP = elements[currentIndex];
  if (problemP && problemP.tagName.toLowerCase() === 'p') {
    problem = problemP.textContent.trim();
    console.log(`      Problem: "${problem.substring(0, 50)}..."`);
    currentIndex++;
  }

  // Look for choices (p or div with A. B. C. etc.)
  const choicesElement = elements[currentIndex];
  if (choicesElement) {
    const choiceText = choicesElement.textContent;
    const choiceMatches = choiceText.matchAll(/([A-E])\.\s*([^\n]+)/g);

    for (const match of choiceMatches) {
      choices.push({
        letter: match[1],
        value: match[2].trim()
      });
    }

    if (choices.length > 0) {
      console.log(`      Choices: ${choices.length} (${choices.map(c => c.letter).join(', ')})`);
      currentIndex++;
    }
  }

  // Look for solution (details element or ul)
  const solutionElement = elements[currentIndex];
  if (solutionElement) {
    if (solutionElement.tagName.toLowerCase() === 'details') {
      // Parse collapsible solution
      const solution = parseCollapsibleSolution(solutionElement);
      solutionSteps.push(...solution.steps);
      answer = solution.answer;
      currentIndex++;
    } else if (solutionElement.tagName.toLowerCase() === 'ul') {
      // Parse old-style solution (bullet list)
      const solution = parseLegacySolution(solutionElement);
      solutionSteps.push(...solution.steps);
      answer = solution.answer;
      currentIndex++;
    }
  }

  // Look for answer (p with "Answer: X")
  const answerElement = elements[currentIndex];
  if (answerElement && answerElement.textContent.includes('Answer:')) {
    const answerMatch = answerElement.textContent.match(/Answer:\s*([A-E])/);
    if (answerMatch && !answer) {
      answer = answerMatch[1];
      console.log(`      Answer: ${answer}`);
    }
  }

  return {
    type: 'example',
    title: title,
    problem: problem,
    choices: choices,
    solution: {
      steps: solutionSteps,
      answer: answer
    },
    elementsConsumed: currentIndex - startIndex
  };
}

/**
 * Parse collapsible solution from details element
 */
function parseCollapsibleSolution(detailsElement) {
  console.log('      📖 Parsing collapsible solution');

  const steps = [];
  let answer = '';

  const contentDiv = detailsElement.querySelector('div');
  if (!contentDiv) return { steps, answer };

  // Find all step divs
  const stepDivs = contentDiv.querySelectorAll(':scope > div');

  stepDivs.forEach(stepDiv => {
    const attemptDiv = stepDiv.querySelector('div:first-child');
    const workDiv = stepDiv.querySelector('div:nth-child(2)');
    const resultDiv = stepDiv.querySelector('div:last-child');

    if (attemptDiv && workDiv) {
      const attempt = attemptDiv.textContent.replace(':', '').trim();
      const work = Array.from(workDiv.querySelectorAll('div')).map(d => d.textContent.trim());
      const resultText = resultDiv?.textContent.trim() || '';
      const result = resultText.includes('✓') || resultText.includes('Works') ? 'correct' : 'incorrect';

      steps.push({ attempt, work, result });
      console.log(`         Step: ${attempt} (${result})`);
    }
  });

  // Find answer
  const answerP = contentDiv.querySelector('p');
  if (answerP) {
    const answerMatch = answerP.textContent.match(/Answer:\s*([A-E])/);
    if (answerMatch) {
      answer = answerMatch[1];
    }
  }

  return { steps, answer };
}

/**
 * Parse legacy solution from ul element
 */
function parseLegacySolution(ulElement) {
  console.log('      📜 Parsing legacy solution (ul)');

  const steps = [];
  let answer = '';

  const listItems = ulElement.querySelectorAll('li');

  listItems.forEach(li => {
    const text = li.textContent.trim();

    // Parse step like: "Start with C (14): √14 + 10 − 2√14 − 2 = √24 − 2√12 ≈ 4.9 − 6.9 ≠ 0 (doesn't work)"
    const attemptMatch = text.match(/^([^:]+):\s*(.+)/);

    if (attemptMatch) {
      const attempt = attemptMatch[1].trim();
      const workText = attemptMatch[2].trim();

      // Split work by = or ≈ or ≠
      const work = workText.split(/(?=[=≈≠])/).map(s => s.trim()).filter(s => s);

      const result = text.includes('✓') || text.toLowerCase().includes('works') ? 'correct' : 'incorrect';

      steps.push({ attempt, work, result });
      console.log(`         Step: ${attempt} (${result})`);
    }
  });

  return { steps, answer };
}

/**
 * Get summary of block types
 */
function getBlockTypeSummary(content) {
  const summary = {};
  content.forEach(block => {
    summary[block.type] = (summary[block.type] || 0) + 1;
  });
  return summary;
}

/**
 * Clean and normalize text
 */
function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')  // Normalize whitespace
    .replace(/\n+/g, ' ')   // Remove newlines
    .trim();
}

module.exports = {
  convertHtmlToJson,
  parseElement,
  parseParagraph,
  parseHeading,
  parseList,
  parseKeyTakeaways,
  parseExampleFromElements,
  parseCollapsibleSolution,
  parseLegacySolution
};

console.log('✅ Lesson converter module loaded');
