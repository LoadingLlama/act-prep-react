-- 50 Questions for Algebra Skills (3.1) - PEMDAS, negative numbers, combining terms
-- Difficulty: Questions 1-17 (easy), 18-34 (medium), 35-50 (hard)
-- Lesson ID: 8d9e41b9-d906-48f6-a1d3-eecb02a7be9f

-- EASY QUESTIONS (1-17)

-- Question 1
INSERT INTO practice_questions (lesson_id, subject, position, difficulty, title, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg)
VALUES (
  '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'math',
  1,
  'easy',
  'Algebra Skills Practice 1',
  'What is 5 + 3 × 2?',
  '[{"letter":"A","text":"16","explanation":"This incorrectly adds first: (5 + 3) × 2 = 8 × 2 = 16. You must follow PEMDAS order of operations, which requires multiplication before addition."},{"letter":"B","text":"11","explanation":"CORRECT. Following PEMDAS, multiply first: 3 × 2 = 6, then add: 5 + 6 = 11. Multiplication always comes before addition in order of operations."},{"letter":"C","text":"13","explanation":"This adds the wrong numbers together. There is no calculation that produces 13 from 5 + 3 × 2 when following any order of operations."},{"letter":"D","text":"10","explanation":"This only performs the multiplication 3 × 2 = 6 and then adds 4 instead of 5, or makes a different arithmetic error. The correct calculation is 5 + 6 = 11."}]',
  'B',
  'CORRECT. Following PEMDAS, multiply first: 3 × 2 = 6, then add: 5 + 6 = 11. Multiplication always comes before addition in order of operations.',
  '[]',
  NULL
);

-- Question 2
INSERT INTO practice_questions (lesson_id, subject, position, difficulty, title, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg)
VALUES (
  '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'math',
  2,
  'easy',
  'Algebra Skills Practice 2',
  'What is -8 + 5?',
  '[{"letter":"A","text":"-13","explanation":"This incorrectly adds the absolute values: -(8 + 5) = -13. When adding a positive to a negative, subtract the smaller from the larger and keep the sign of the larger."},{"letter":"B","text":"13","explanation":"This gives the positive version of adding absolute values. When adding -8 and 5, you need to keep track of the negative sign on the 8."},{"letter":"C","text":"-3","explanation":"CORRECT. Think of this as starting at -8 and moving 5 units to the right: -8 + 5 = -3. Or subtract: 8 - 5 = 3, and since 8 is larger, the answer is negative."},{"letter":"D","text":"3","explanation":"This has the correct magnitude but wrong sign. The answer should be negative because |-8| > |5|, so the negative number dominates."}]',
  'C',
  'CORRECT. Think of this as starting at -8 and moving 5 units to the right: -8 + 5 = -3. Or subtract: 8 - 5 = 3, and since 8 is larger, the answer is negative.',
  '[]',
  NULL
);

-- Question 3
INSERT INTO practice_questions (lesson_id, subject, position, difficulty, title, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg)
VALUES (
  '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'math',
  3,
  'easy',
  'Algebra Skills Practice 3',
  'Simplify: 3x + 5x',
  '[{"letter":"A","text":"8x","explanation":"CORRECT. These are like terms (both have variable x), so add the coefficients: 3 + 5 = 8, giving 8x."},{"letter":"B","text":"15x","explanation":"This multiplies the coefficients (3 × 5 = 15) instead of adding them. When combining like terms, you add coefficients, not multiply them."},{"letter":"C","text":"8x^2","explanation":"This incorrectly changes the exponent. When adding like terms with the same variable, the exponent stays the same; only the coefficient changes."},{"letter":"D","text":"15x^2","explanation":"This both multiplies coefficients incorrectly and changes the exponent. The correct operation is to add coefficients: 3x + 5x = (3+5)x = 8x."}]',
  'A',
  'CORRECT. These are like terms (both have variable x), so add the coefficients: 3 + 5 = 8, giving 8x.',
  '[]',
  NULL
);

-- Question 4
INSERT INTO practice_questions (lesson_id, subject, position, difficulty, title, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg)
VALUES (
  '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'math',
  4,
  'easy',
  'Algebra Skills Practice 4',
  'What is 12 ÷ 4 × 3?',
  '[{"letter":"A","text":"1","explanation":"This incorrectly divides 12 ÷ (4 × 3) = 12 ÷ 12 = 1. Division and multiplication have equal priority and are performed left to right."},{"letter":"B","text":"9","explanation":"CORRECT. Working left to right: 12 ÷ 4 = 3, then 3 × 3 = 9. Division and multiplication have equal priority in PEMDAS."},{"letter":"C","text":"4","explanation":"This might come from 12 ÷ 3 = 4, forgetting to include the multiplication by 3 at all."},{"letter":"D","text":"36","explanation":"This incorrectly multiplies 12 × 3 = 36 first, ignoring the division. You must work left to right when operations have equal priority."}]',
  'B',
  'CORRECT. Working left to right: 12 ÷ 4 = 3, then 3 × 3 = 9. Division and multiplication have equal priority in PEMDAS.',
  '[]',
  NULL
);

-- Question 5
INSERT INTO practice_questions (lesson_id, subject, position, difficulty, title, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg)
VALUES (
  '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'math',
  5,
  'easy',
  'Algebra Skills Practice 5',
  'What is -4 - 7?',
  '[{"letter":"A","text":"-11","explanation":"CORRECT. Subtracting a positive is the same as adding a negative: -4 - 7 = -4 + (-7) = -11. Both numbers are negative, so add their absolute values and keep the negative sign."},{"letter":"B","text":"11","explanation":"This gives the absolute value of the answer but with the wrong sign. When both numbers are negative, the result must be negative."},{"letter":"C","text":"-3","explanation":"This incorrectly subtracts the absolute values: 7 - 4 = 3, then makes it negative. But -4 - 7 means moving 7 more units left from -4."},{"letter":"D","text":"3","explanation":"This might come from |-7| - |-4| = 3, but ignores the signs. The correct calculation is -4 - 7 = -11."}]',
  'A',
  'CORRECT. Subtracting a positive is the same as adding a negative: -4 - 7 = -4 + (-7) = -11. Both numbers are negative, so add their absolute values and keep the negative sign.',
  '[]',
  NULL
);

-- Question 6
INSERT INTO practice_questions (lesson_id, subject, position, difficulty, title, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg)
VALUES (
  '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'math',
  6,
  'easy',
  'Algebra Skills Practice 6',
  'Simplify: 7y - 2y',
  '[{"letter":"A","text":"5y","explanation":"CORRECT. Subtract the coefficients: 7 - 2 = 5, so 7y - 2y = 5y."},{"letter":"B","text":"9y","explanation":"This adds the coefficients (7 + 2 = 9) instead of subtracting. The minus sign means subtraction: 7 - 2 = 5."},{"letter":"C","text":"5","explanation":"This forgets to keep the variable y. When combining like terms, the variable stays: 7y - 2y = 5y, not just 5."},{"letter":"D","text":"14y","explanation":"This multiplies the coefficients (7 × 2 = 14) instead of subtracting. Combining like terms means adding or subtracting coefficients, not multiplying."}]',
  'A',
  'CORRECT. Subtract the coefficients: 7 - 2 = 5, so 7y - 2y = 5y.',
  '[]',
  NULL
);

-- Question 7
INSERT INTO practice_questions (lesson_id, subject, position, difficulty, title, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg)
VALUES (
  '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'math',
  7,
  'easy',
  'Algebra Skills Practice 7',
  'What is 6 + 2 × (4 - 1)?',
  '[{"letter":"A","text":"24","explanation":"This incorrectly calculates (6 + 2) × (4 - 1) = 8 × 3 = 24. Parentheses create a group, but you cannot add the 6 to what is inside the parentheses."},{"letter":"B","text":"12","explanation":"CORRECT. Following PEMDAS: First parentheses (4 - 1) = 3, then multiplication 2 × 3 = 6, finally addition 6 + 6 = 12."},{"letter":"C","text":"10","explanation":"This might add 6 + 2 = 8 first, then add (4 - 1) = 3 to get 11, or make another error. The correct order is parentheses, then multiplication, then addition."},{"letter":"D","text":"18","explanation":"This might come from 6 + 2 × 4 - 1 = 6 + 8 - 1 = 13, or from 6 × 3 = 18. The correct calculation is 6 + (2 × 3) = 12."}]',
  'B',
  'CORRECT. Following PEMDAS: First parentheses (4 - 1) = 3, then multiplication 2 × 3 = 6, finally addition 6 + 6 = 12.',
  '[]',
  NULL
);

-- Question 8
INSERT INTO practice_questions (lesson_id, subject, position, difficulty, title, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg)
VALUES (
  '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'math',
  8,
  'easy',
  'Algebra Skills Practice 8',
  'What is (-3) × 4?',
  '[{"letter":"A","text":"12","explanation":"This gives the absolute value but wrong sign. A negative times a positive always gives a negative result."},{"letter":"B","text":"-12","explanation":"CORRECT. Multiply the absolute values: 3 × 4 = 12. Since one number is negative and one is positive, the result is negative: -12."},{"letter":"C","text":"-7","explanation":"This adds instead of multiplies: -3 + 4 = 1, or possibly confuses the operation. The problem requires multiplication: (-3) × 4 = -12."},{"letter":"D","text":"1","explanation":"This might come from -3 + 4 = 1. The operation is multiplication, not addition."}]',
  'B',
  'CORRECT. Multiply the absolute values: 3 × 4 = 12. Since one number is negative and one is positive, the result is negative: -12.',
  '[]',
  NULL
);

-- Question 9
INSERT INTO practice_questions (lesson_id, subject, position, difficulty, title, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg)
VALUES (
  '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'math',
  9,
  'easy',
  'Algebra Skills Practice 9',
  'Simplify: 4a + 3b + 2a',
  '[{"letter":"A","text":"6a + 3b","explanation":"CORRECT. Combine like terms: 4a + 2a = 6a. The 3b cannot be combined with the a terms because they have different variables."},{"letter":"B","text":"9ab","explanation":"This incorrectly adds all coefficients and combines different variables into a product. You cannot combine 4a + 3b + 2a into 9ab; only like terms can be combined."},{"letter":"C","text":"9a + 3b","explanation":"This adds all three coefficients to the a term: 4 + 3 + 2 = 9. But 3b has a different variable, so only 4a + 2a = 6a can be combined."},{"letter":"D","text":"4a + 5b","explanation":"This incorrectly combines 3b + 2a to get 5b. You cannot add terms with different variables; 2a stays as 2a and combines with 4a to make 6a."}]',
  'A',
  'CORRECT. Combine like terms: 4a + 2a = 6a. The 3b cannot be combined with the a terms because they have different variables.',
  '[]',
  NULL
);

-- Question 10
INSERT INTO practice_questions (lesson_id, subject, position, difficulty, title, problem_text, choices, correct_answer, answer_explanation, solution_steps, diagram_svg)
VALUES (
  '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f',
  'math',
  10,
  'easy',
  'Algebra Skills Practice 10',
  'What is 20 - 3 × 4?',
  '[{"letter":"A","text":"68","explanation":"This appears to come from a calculation error. Following PEMDAS correctly gives 20 - 12 = 8, not 68."},{"letter":"B","text":"8","explanation":"CORRECT. Following PEMDAS, multiply first: 3 × 4 = 12, then subtract: 20 - 12 = 8."},{"letter":"C","text":"32","explanation":"This incorrectly calculates (20 - 3) × 4 = 17 × 4 = 68, or makes another error. You must multiply before subtracting."},{"letter":"D","text":"17","explanation":"This subtracts first: 20 - 3 = 17, then forgets to multiply by 4. Following PEMDAS, you must do 3 × 4 = 12 first, then 20 - 12 = 8."}]',
  'B',
  'CORRECT. Following PEMDAS, multiply first: 3 × 4 = 12, then subtract: 20 - 12 = 8.',
  '[]',
  NULL
);

-- Continue with remaining questions...
-- Due to length, I'll create a complete file with all 50 questions

