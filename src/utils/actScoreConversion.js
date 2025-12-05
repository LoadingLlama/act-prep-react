/**
 * ACT Score Conversion Utilities
 * Converts raw scores to ACT scale scores (1-36) for each section
 */

// ACT Score Conversion Tables (based on official ACT scoring)
export const ACT_SCORE_TABLES = {
  english: {
    // Raw score (correct answers) -> Scale score (1-36)
    75: 36, 74: 35, 73: 35, 72: 34, 71: 33, 70: 33, 69: 32, 68: 31, 67: 30,
    66: 30, 65: 29, 64: 28, 63: 28, 62: 27, 61: 26, 60: 26, 59: 25, 58: 24,
    57: 24, 56: 23, 55: 22, 54: 22, 53: 21, 52: 20, 51: 20, 50: 19, 49: 18,
    48: 18, 47: 17, 46: 16, 45: 16, 44: 15, 43: 14, 42: 14, 41: 13, 40: 12,
    39: 12, 38: 11, 37: 11, 36: 10, 35: 10, 34: 9, 33: 9, 32: 8, 31: 8,
    30: 7, 29: 7, 28: 6, 27: 6, 26: 5, 25: 5, 24: 4, 23: 4, 22: 3, 21: 3,
    20: 2, 19: 2, 18: 1
  },
  math: {
    // Raw score (correct answers) -> Scale score (1-36)
    60: 36, 59: 35, 58: 34, 57: 33, 56: 32, 55: 31, 54: 30, 53: 29, 52: 28,
    51: 27, 50: 26, 49: 25, 48: 24, 47: 23, 46: 22, 45: 21, 44: 20, 43: 19,
    42: 18, 41: 17, 40: 16, 39: 15, 38: 14, 37: 13, 36: 12, 35: 11, 34: 10,
    33: 9, 32: 8, 31: 7, 30: 6, 29: 5, 28: 4, 27: 3, 26: 2, 25: 1
  },
  reading: {
    // Raw score (correct answers) -> Scale score (1-36)
    40: 36, 39: 35, 38: 34, 37: 33, 36: 32, 35: 31, 34: 30, 33: 29, 32: 28,
    31: 27, 30: 26, 29: 25, 28: 24, 27: 23, 26: 22, 25: 21, 24: 20, 23: 19,
    22: 18, 21: 17, 20: 16, 19: 15, 18: 14, 17: 13, 16: 12, 15: 11, 14: 10,
    13: 9, 12: 8, 11: 7, 10: 6, 9: 5, 8: 4, 7: 3, 6: 2, 5: 1
  },
  science: {
    // Raw score (correct answers) -> Scale score (1-36)
    40: 36, 39: 35, 38: 34, 37: 33, 36: 32, 35: 31, 34: 30, 33: 29, 32: 28,
    31: 27, 30: 26, 29: 25, 28: 24, 27: 23, 26: 22, 25: 21, 24: 20, 23: 19,
    22: 18, 21: 17, 20: 16, 19: 15, 18: 14, 17: 13, 16: 12, 15: 11, 14: 10,
    13: 9, 12: 8, 11: 7, 10: 6, 9: 5, 8: 4, 7: 3, 6: 2, 5: 1
  }
};

/**
 * Convert raw score to ACT scale score (1-36) for a section
 * @param {string} section - Section name (english, math, reading, science)
 * @param {number} rawScore - Number of correct answers
 * @returns {number} ACT scale score (1-36)
 */
export function convertToACTScore(section, rawScore) {
  const sectionLower = section.toLowerCase();
  const table = ACT_SCORE_TABLES[sectionLower];

  if (!table) {
    console.warn(`No conversion table for section: ${section}`);
    return Math.round((rawScore / getMaxScore(section)) * 36);
  }

  // Handle 0 correct answers - lowest possible ACT score is 1
  if (rawScore <= 0) {
    return 1;
  }

  // Find closest raw score in table
  let scaleScore = table[rawScore];

  // If exact match not found, interpolate
  if (!scaleScore) {
    const scores = Object.keys(table).map(Number).sort((a, b) => b - a);
    const lower = scores.find(s => s <= rawScore);
    const upper = scores.find(s => s >= rawScore);

    if (lower) scaleScore = table[lower];
    else if (upper) scaleScore = table[upper];
    else scaleScore = 1;
  }

  return scaleScore;
}

/**
 * Get maximum possible raw score for a section
 * @param {string} section - Section name
 * @returns {number} Maximum raw score
 */
export function getMaxScore(section) {
  const maxScores = {
    english: 75,
    math: 60,
    reading: 40,
    science: 40
  };
  return maxScores[section.toLowerCase()] || 0;
}

/**
 * Calculate composite ACT score from section scores
 * @param {Object} sectionScores - Object with section scale scores
 * @returns {number} Composite ACT score (rounded to nearest integer)
 */
export function calculateComposite(sectionScores) {
  const { english, math, reading, science } = sectionScores;
  const sum = english + math + reading + science;
  return Math.round(sum / 4);
}

/**
 * Convert all section results to ACT scores
 * @param {Array} results - Array of section results with {section, correct, total}
 * @returns {Object} ACT scores for each section and composite
 */
export function convertDiagnosticToACT(results) {
  const actScores = {};

  results.forEach(result => {
    actScores[result.section] = convertToACTScore(result.section, result.correct);
  });

  actScores.composite = calculateComposite(actScores);

  return actScores;
}

/**
 * Get performance level description based on ACT score
 * @param {number} score - ACT scale score (1-36)
 * @returns {string} Performance level
 */
export function getPerformanceLevel(score) {
  if (score >= 32) return 'Excellent';
  if (score >= 28) return 'Good';
  if (score >= 24) return 'Above Average';
  if (score >= 20) return 'Average';
  if (score >= 16) return 'Below Average';
  return 'Needs Improvement';
}
