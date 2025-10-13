/**
 * AI Chat Service
 * Handles AI API communication and response generation
 * Extracted from AIChat component to reduce file size
 */

/**
 * Simulates AI API call and returns response
 * @param {string} question - User's question
 * @param {string} lesson - Current lesson key
 * @param {Object} content - Lesson content
 * @returns {Promise<string>} AI response
 * @throws {Error} If input validation fails
 */
export const callAIAPI = async (question, lesson, content) => {
  // Input validation for security
  if (typeof question !== 'string' || question.length > 1000) {
    throw new Error('Invalid question input');
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

  const responses = {
    'backsolving': [
      "Backsolving is perfect when you see complex equations. Start with answer choice B or C (middle values) and plug them back into the original equation. Whichever makes the equation true is your answer.",
      "Use backsolving when traditional algebra would take too long. Just test each answer choice by substituting it into the equation until you find the one that works."
    ],
    'substitution': [
      "With substitution, pick simple numbers for variables (like 2, 3, or 5) and avoid 0 and 1. Solve the problem with your chosen numbers, then test which answer choice gives the same result.",
      "Substitution turns abstract algebra into concrete arithmetic. Pick easy numbers that follow any rules given in the problem, solve with those numbers, then match your result to the answer choices."
    ]
  };

  // Prevent prototype pollution by using hasOwnProperty
  if (lesson && typeof lesson === 'string' && responses.hasOwnProperty(lesson)) {
    return responses[lesson][Math.floor(Math.random() * responses[lesson].length)];
  }

  const fallbacks = [
    "I'd be happy to help! Can you be more specific about what you're struggling with?",
    "That's a great question. Let me think about the best way to explain this concept.",
    "I can help you understand this better. What specific part would you like me to clarify?"
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
