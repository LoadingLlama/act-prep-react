/**
 * Lesson Content JSON Schema
 *
 * Defines the structure and validation rules for lesson content.
 * Use this to validate lesson data before rendering.
 *
 * Version: 1.0.0
 *
 * Usage:
 * import { validateLessonContent, LESSON_SCHEMA } from './schemas/lessonContent.schema';
 *
 * const isValid = validateLessonContent(lessonData);
 * if (!isValid) {
 *   console.error('Invalid lesson data!');
 * }
 */

/**
 * Main lesson schema
 */
export const LESSON_SCHEMA = {
  type: 'object',
  required: ['version', 'lessonId', 'content'],
  properties: {
    version: {
      type: 'string',
      pattern: '^\\d+\\.\\d+\\.\\d+$', // e.g., "1.0.0"
      description: 'Schema version (semantic versioning)'
    },
    lessonId: {
      type: 'string',
      pattern: '^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$', // UUID
      description: 'Lesson UUID from database'
    },
    content: {
      type: 'array',
      minItems: 1,
      items: {
        oneOf: [
          { $ref: '#/definitions/paragraph' },
          { $ref: '#/definitions/heading' },
          { $ref: '#/definitions/list' },
          { $ref: '#/definitions/example' },
          { $ref: '#/definitions/key_takeaways' }
        ]
      }
    }
  },
  definitions: {
    // ============================================================================
    // PARAGRAPH
    // ============================================================================
    paragraph: {
      type: 'object',
      required: ['type', 'text'],
      properties: {
        type: { const: 'paragraph' },
        text: {
          type: 'string',
          minLength: 1,
          description: 'Paragraph text. Use {term} for key terms.'
        },
        keyTerms: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of terms to highlight (optional)'
        }
      }
    },

    // ============================================================================
    // HEADING
    // ============================================================================
    heading: {
      type: 'object',
      required: ['type', 'level', 'text'],
      properties: {
        type: { const: 'heading' },
        level: {
          type: 'number',
          enum: [3, 4],
          description: 'Heading level (3 = section, 4 = subsection)'
        },
        text: {
          type: 'string',
          minLength: 1,
          description: 'Heading text'
        }
      }
    },

    // ============================================================================
    // LIST
    // ============================================================================
    list: {
      type: 'object',
      required: ['type', 'items'],
      properties: {
        type: { const: 'list' },
        items: {
          type: 'array',
          minItems: 1,
          items: {
            oneOf: [
              { type: 'string' }, // Simple item
              {
                // Item with nested list
                type: 'object',
                required: ['text'],
                properties: {
                  text: { type: 'string' },
                  nested: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                }
              }
            ]
          }
        }
      }
    },

    // ============================================================================
    // EXAMPLE
    // ============================================================================
    example: {
      type: 'object',
      required: ['type', 'title', 'problem', 'choices', 'solution'],
      properties: {
        type: { const: 'example' },
        title: {
          type: 'string',
          pattern: '^Example \\d+:',
          description: 'Example title (e.g., "Example 1: Basic Backsolving")'
        },
        problem: {
          type: 'string',
          minLength: 1,
          description: 'Problem statement/question'
        },
        choices: {
          type: 'array',
          minItems: 2,
          maxItems: 5,
          items: {
            type: 'object',
            required: ['letter', 'value'],
            properties: {
              letter: {
                type: 'string',
                pattern: '^[A-E]$',
                description: 'Choice letter (A-E)'
              },
              value: {
                type: 'string',
                minLength: 1,
                description: 'Choice value/answer'
              }
            }
          }
        },
        solution: {
          type: 'object',
          required: ['steps', 'answer'],
          properties: {
            steps: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                required: ['attempt', 'work', 'result'],
                properties: {
                  attempt: {
                    type: 'string',
                    description: 'Description of attempt (e.g., "Start with C (14)")'
                  },
                  work: {
                    type: 'array',
                    minItems: 1,
                    items: { type: 'string' },
                    description: 'Array of work lines'
                  },
                  result: {
                    type: 'string',
                    enum: ['correct', 'incorrect'],
                    description: 'Whether this attempt worked'
                  }
                }
              }
            },
            answer: {
              type: 'string',
              pattern: '^[A-E]$',
              description: 'Final answer letter'
            }
          }
        }
      }
    },

    // ============================================================================
    // KEY TAKEAWAYS
    // ============================================================================
    key_takeaways: {
      type: 'object',
      required: ['type', 'items'],
      properties: {
        type: { const: 'key_takeaways' },
        items: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'string',
            minLength: 1
          },
          description: 'Array of takeaway strings'
        }
      }
    }
  }
};

/**
 * Validate lesson content against schema
 *
 * @param {object} lessonData - The lesson data to validate
 * @returns {object} { valid: boolean, errors: array }
 */
export const validateLessonContent = (lessonData) => {
  console.log('🔍 Validating lesson content...');

  const errors = [];

  // Check top-level structure
  if (!lessonData || typeof lessonData !== 'object') {
    errors.push('Lesson data must be an object');
    return { valid: false, errors };
  }

  // Check required fields
  if (!lessonData.version) {
    errors.push('Missing required field: version');
  }

  if (!lessonData.lessonId) {
    errors.push('Missing required field: lessonId');
  }

  if (!lessonData.content || !Array.isArray(lessonData.content)) {
    errors.push('Missing or invalid field: content (must be an array)');
    return { valid: false, errors };
  }

  // Validate version format
  if (lessonData.version && !/^\d+\.\d+\.\d+$/.test(lessonData.version)) {
    errors.push(`Invalid version format: ${lessonData.version} (expected: X.Y.Z)`);
  }

  // Validate lessonId format (UUID)
  if (lessonData.lessonId && !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(lessonData.lessonId)) {
    errors.push(`Invalid lessonId format: ${lessonData.lessonId} (expected: UUID)`);
  }

  // Validate each content block
  lessonData.content.forEach((block, index) => {
    if (!block.type) {
      errors.push(`Block ${index}: Missing 'type' field`);
      return;
    }

    // Validate based on type
    switch (block.type) {
      case 'paragraph':
        if (!block.text) {
          errors.push(`Block ${index} (paragraph): Missing 'text' field`);
        }
        break;

      case 'heading':
        if (!block.level) {
          errors.push(`Block ${index} (heading): Missing 'level' field`);
        } else if (![3, 4].includes(block.level)) {
          errors.push(`Block ${index} (heading): Invalid level ${block.level} (must be 3 or 4)`);
        }
        if (!block.text) {
          errors.push(`Block ${index} (heading): Missing 'text' field`);
        }
        break;

      case 'list':
        if (!block.items || !Array.isArray(block.items)) {
          errors.push(`Block ${index} (list): Missing or invalid 'items' field`);
        }
        break;

      case 'example':
        if (!block.title) errors.push(`Block ${index} (example): Missing 'title'`);
        if (!block.problem) errors.push(`Block ${index} (example): Missing 'problem'`);
        if (!block.choices) errors.push(`Block ${index} (example): Missing 'choices'`);
        if (!block.solution) errors.push(`Block ${index} (example): Missing 'solution'`);
        break;

      case 'key_takeaways':
        if (!block.items || !Array.isArray(block.items)) {
          errors.push(`Block ${index} (key_takeaways): Missing or invalid 'items' field`);
        }
        break;

      default:
        errors.push(`Block ${index}: Unknown type '${block.type}'`);
    }
  });

  const valid = errors.length === 0;

  if (valid) {
    console.log('✅ Lesson content is valid');
  } else {
    console.error('❌ Lesson content validation failed:', errors);
  }

  return { valid, errors };
};

/**
 * Get a template for a specific content type
 *
 * Useful for creating new content blocks
 *
 * @param {string} type - Content type
 * @returns {object} Template object
 */
export const getContentTemplate = (type) => {
  const templates = {
    paragraph: {
      type: 'paragraph',
      text: 'Your paragraph text here. Use {key term} for highlighting.',
      keyTerms: []
    },
    heading: {
      type: 'heading',
      level: 3,
      text: 'Your heading text'
    },
    list: {
      type: 'list',
      items: [
        'First item',
        {
          text: 'Item with nested list',
          nested: ['Nested item 1', 'Nested item 2']
        }
      ]
    },
    example: {
      type: 'example',
      title: 'Example 1: Title',
      problem: 'Problem statement',
      choices: [
        { letter: 'A', value: 'Choice A' },
        { letter: 'B', value: 'Choice B' },
        { letter: 'C', value: 'Choice C' },
        { letter: 'D', value: 'Choice D' },
        { letter: 'E', value: 'Choice E' }
      ],
      solution: {
        steps: [
          {
            attempt: 'Try A',
            work: ['Step 1', 'Step 2'],
            result: 'incorrect'
          }
        ],
        answer: 'B'
      }
    },
    key_takeaways: {
      type: 'key_takeaways',
      items: [
        'First takeaway',
        'Second takeaway'
      ]
    }
  };

  return templates[type] || null;
};

console.log('✅ Lesson content schema loaded');
