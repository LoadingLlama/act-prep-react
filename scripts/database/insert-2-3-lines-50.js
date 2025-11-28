require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const questions = [
  {
    pos: 1,
    diff: 'hard',
    text: 'What is the slope of the line passing through points (2, 3) and (5, 9)?',
    ch: [
      {letter: 'A', text: '2'},
      {letter: 'B', text: '1/2'},
      {letter: 'C', text: '6'},
      {letter: 'D', text: '3'},
          ],
    ans: 'A',
    sol: '**Slope = (y₂ - y₁) / (x₂ - x₁).**\n\n```\nm = (9 - 3) / (5 - 2)\n  = 6 / 3\n  = 2\n```\n\n**Key insight:** Slope measures the change in y over the change in x.'
  },
  {
    pos: 2,
    diff: 'hard',
    text: 'What is the equation of a line with slope 3 passing through point (1, 2)?',
    ch: [
      {letter: 'A', text: 'y = 3x - 1'},
      {letter: 'B', text: 'y = 3x + 2'},
      {letter: 'C', text: 'y = 3x + 1'},
      {letter: 'D', text: 'y = x + 2'},
          ],
    ans: 'A',
    sol: '**Use point-slope form, then solve for y.**\n\n```\ny - y₁ = m(x - x₁)\ny - 2 = 3(x - 1)\ny - 2 = 3x - 3\ny = 3x - 1\n```\n\n**Key insight:** Start with point-slope form and convert to slope-intercept form.'
  },
  {
    pos: 3,
    diff: 'hard',
    text: 'What is the slope of a line perpendicular to y = 2x + 5?',
    ch: [
      {letter: 'A', text: '-1/2'},
      {letter: 'B', text: '2'},
      {letter: 'C', text: '-2'},
      {letter: 'D', text: '1/2'},
          ],
    ans: 'A',
    sol: '**Perpendicular slopes are negative reciprocals.**\n\n```\nOriginal slope = 2\nPerpendicular slope = -1/2\n```\n\n**Key insight:** If one line has slope m, a perpendicular line has slope -1/m.'
  },
  {
    pos: 4,
    diff: 'hard',
    text: 'What is the x-intercept of the line 3x + 4y = 12?',
    ch: [
      {letter: 'A', text: '4'},
      {letter: 'B', text: '3'},
      {letter: 'C', text: '12'},
      {letter: 'D', text: '-4'},
          ],
    ans: 'A',
    sol: '**Set y = 0 and solve for x.**\n\n```\n3x + 4(0) = 12\n3x = 12\nx = 4\n```\n\n**Key insight:** The x-intercept occurs where the line crosses the x-axis (y = 0).'
  },
  {
    pos: 5,
    diff: 'hard',
    text: 'What is the y-intercept of the line y = -2x + 7?',
    ch: [
      {letter: 'A', text: '7'},
      {letter: 'B', text: '-2'},
      {letter: 'C', text: '3.5'},
      {letter: 'D', text: '0'},
          ],
    ans: 'A',
    sol: '**In slope-intercept form y = mx + b, b is the y-intercept.**\n\n```\ny = -2x + 7\n\ny-intercept = 7\n```\n\n**Key insight:** The y-intercept is the constant term in y = mx + b form.'
  },
  {
    pos: 6,
    diff: 'hard',
    text: 'Are the lines y = 3x + 2 and y = 3x - 5 parallel, perpendicular, or neither?',
    ch: [
      {letter: 'A', text: 'Parallel'},
      {letter: 'B', text: 'Perpendicular'},
      {letter: 'C', text: 'Neither'},
      {letter: 'D', text: 'The same line'},
          ],
    ans: 'A',
    sol: '**Parallel lines have equal slopes.**\n\n```\nSlope of first line = 3\nSlope of second line = 3\n\nSince slopes are equal, lines are parallel.\n```\n\n**Key insight:** Parallel lines never intersect and have the same slope.'
  },
  {
    pos: 7,
    diff: 'hard',
    text: 'What is the distance between points (1, 2) and (4, 6)?',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '7'},
      {letter: 'C', text: '√7'},
      {letter: 'D', text: '25'},
          ],
    ans: 'A',
    sol: '**Use the distance formula.**\n\n```\nd = √[(x₂-x₁)² + (y₂-y₁)²]\n  = √[(4-1)² + (6-2)²]\n  = √[3² + 4²]\n  = √[9 + 16]\n  = √25\n  = 5\n```\n\n**Key insight:** This is a 3-4-5 Pythagorean triple.'
  },
  {
    pos: 8,
    diff: 'hard',
    text: 'What is the midpoint of the line segment from (-2, 5) to (4, 11)?',
    ch: [
      {letter: 'A', text: '(1, 8)'},
      {letter: 'B', text: '(2, 16)'},
      {letter: 'C', text: '(3, 6)'},
      {letter: 'D', text: '(6, 6)'},
          ],
    ans: 'A',
    sol: '**Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2).**\n\n```\nMidpoint = ((-2+4)/2, (5+11)/2)\n         = (2/2, 16/2)\n         = (1, 8)\n```\n\n**Key insight:** Average the x-coordinates and y-coordinates separately.'
  },
  {
    pos: 9,
    diff: 'hard',
    text: 'What is the slope of a horizontal line?',
    ch: [
      {letter: 'A', text: '0'},
      {letter: 'B', text: '1'},
      {letter: 'C', text: 'Undefined'},
      {letter: 'D', text: '∞'},
          ],
    ans: 'A',
    sol: '**Horizontal lines have zero change in y.**\n\n```\nm = Δy/Δx = 0/Δx = 0\n```\n\n**Key insight:** Horizontal lines are of the form y = c (constant).'
  },
  {
    pos: 10,
    diff: 'hard',
    text: 'What is the slope of a vertical line?',
    ch: [
      {letter: 'A', text: 'Undefined'},
      {letter: 'B', text: '0'},
      {letter: 'C', text: '1'},
      {letter: 'D', text: '∞'},
          ],
    ans: 'A',
    sol: '**Vertical lines have zero change in x.**\n\n```\nm = Δy/Δx = Δy/0 = undefined\n```\n\n**Key insight:** Vertical lines are of the form x = c (constant).'
  },
  {
    pos: 11,
    diff: 'hard',
    text: 'Convert the equation 2x - 3y = 6 to slope-intercept form.',
    ch: [
      {letter: 'A', text: 'y = (2/3)x - 2'},
      {letter: 'B', text: 'y = -(2/3)x + 2'},
      {letter: 'C', text: 'y = 2x - 6'},
      {letter: 'D', text: 'y = (3/2)x - 2'},
          ],
    ans: 'A',
    sol: '**Solve for y.**\n\n```\n2x - 3y = 6\n-3y = -2x + 6\ny = (2/3)x - 2\n```\n\n**Key insight:** Isolate y on one side to get y = mx + b form.'
  },
  {
    pos: 12,
    diff: 'hard',
    text: 'Two lines have slopes m₁ = 4 and m₂ = -1/4. Are they perpendicular?',
    ch: [
      {letter: 'A', text: 'Yes'},
      {letter: 'B', text: 'No'},
      {letter: 'C', text: 'They are parallel'},
      {letter: 'D', text: 'They are the same line'},
          ],
    ans: 'A',
    sol: '**Check if slopes are negative reciprocals.**\n\n```\nm₁ × m₂ = 4 × (-1/4) = -1\n```\n\nSince the product is -1, the lines are perpendicular.\n\n**Key insight:** Two lines are perpendicular if and only if m₁ × m₂ = -1.'
  },
  {
    pos: 13,
    diff: 'hard',
    text: 'What is the slope of the line 5x + 2y = 10?',
    ch: [
      {letter: 'A', text: '-5/2'},
      {letter: 'B', text: '5/2'},
      {letter: 'C', text: '-2/5'},
      {letter: 'D', text: '2/5'},
          ],
    ans: 'A',
    sol: '**Convert to slope-intercept form.**\n\n```\n5x + 2y = 10\n2y = -5x + 10\ny = (-5/2)x + 5\n\nSlope = -5/2\n```\n\n**Key insight:** The coefficient of x in y = mx + b is the slope.'
  },
  {
    pos: 14,
    diff: 'hard',
    text: 'A line passes through (0, -3) and has slope 4. What is its equation?',
    ch: [
      {letter: 'A', text: 'y = 4x - 3'},
      {letter: 'B', text: 'y = 4x + 3'},
      {letter: 'C', text: 'y = -3x + 4'},
      {letter: 'D', text: 'y = x - 3'},
          ],
    ans: 'A',
    sol: '**Use slope-intercept form y = mx + b.**\n\nSince the point (0, -3) is the y-intercept (b = -3):\n```\ny = 4x + (-3)\ny = 4x - 3\n```\n\n**Key insight:** When given the y-intercept directly, just plug into y = mx + b.'
  },
  {
    pos: 15,
    diff: 'hard',
    text: 'Find the equation of the line parallel to y = 2x + 1 that passes through (3, 5).',
    ch: [
      {letter: 'A', text: 'y = 2x - 1'},
      {letter: 'B', text: 'y = 2x + 1'},
      {letter: 'C', text: 'y = -1/2x + 13/2'},
      {letter: 'D', text: 'y = 2x + 5'},
          ],
    ans: 'A',
    sol: '**Parallel lines have the same slope.**\n\nSlope = 2 (same as given line)\n\n```\ny - 5 = 2(x - 3)\ny - 5 = 2x - 6\ny = 2x - 1\n```\n\n**Key insight:** Use the same slope and the new point with point-slope form.'
  },
  {
    pos: 16,
    diff: 'hard',
    text: 'What is the length of the line segment from (0, 0) to (3, 4)?',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '7'},
      {letter: 'C', text: '12'},
      {letter: 'D', text: '√7'},
          ],
    ans: 'A',
    sol: '**Use the distance formula.**\n\n```\nd = √[(3-0)² + (4-0)²]\n  = √[9 + 16]\n  = √25\n  = 5\n```\n\n**Key insight:** This is the famous 3-4-5 right triangle.'
  },
  {
    pos: 17,
    diff: 'hard',
    text: 'Find the equation of the line perpendicular to y = 3x - 2 that passes through (6, 1).',
    ch: [
      {letter: 'A', text: 'y = -1/3x + 3'},
      {letter: 'B', text: 'y = 3x + 1'},
      {letter: 'C', text: 'y = -1/3x + 1'},
      {letter: 'D', text: 'y = -3x + 19'},
          ],
    ans: 'A',
    sol: '**Perpendicular slope = -1/3.**\n\n```\ny - 1 = -1/3(x - 6)\ny - 1 = -1/3x + 2\ny = -1/3x + 3\n```\n\n**Key insight:** The perpendicular slope to 3 is -1/3.'
  },
  {
    pos: 18,
    diff: 'hard',
    text: 'If a line has x-intercept 4 and y-intercept 3, what is its slope?',
    ch: [
      {letter: 'A', text: '-3/4'},
      {letter: 'B', text: '3/4'},
      {letter: 'C', text: '-4/3'},
      {letter: 'D', text: '4/3'},
          ],
    ans: 'A',
    sol: '**Use the two intercept points.**\n\nPoints: (4, 0) and (0, 3)\n\n```\nm = (3 - 0) / (0 - 4)\n  = 3 / (-4)\n  = -3/4\n```\n\n**Key insight:** x-intercept gives point (a, 0), y-intercept gives point (0, b).'
  },
  {
    pos: 19,
    diff: 'hard',
    text: 'What is the equation of a horizontal line passing through (5, -2)?',
    ch: [
      {letter: 'A', text: 'y = -2'},
      {letter: 'B', text: 'x = 5'},
      {letter: 'C', text: 'y = 5'},
      {letter: 'D', text: 'x = -2'},
          ],
    ans: 'A',
    sol: '**Horizontal lines have equation y = c.**\n\nSince it passes through (5, -2), the y-coordinate is always -2.\n\n```\ny = -2\n```\n\n**Key insight:** Horizontal lines have the form y = constant.'
  },
  {
    pos: 20,
    diff: 'hard',
    text: 'What is the equation of a vertical line passing through (3, 7)?',
    ch: [
      {letter: 'A', text: 'x = 3'},
      {letter: 'B', text: 'y = 7'},
      {letter: 'C', text: 'y = 3'},
      {letter: 'D', text: 'x = 7'},
          ],
    ans: 'A',
    sol: '**Vertical lines have equation x = c.**\n\nSince it passes through (3, 7), the x-coordinate is always 3.\n\n```\nx = 3\n```\n\n**Key insight:** Vertical lines have the form x = constant.'
  },
  {
    pos: 21,
    diff: 'hard',
    text: 'Convert y - 4 = 3(x + 2) to slope-intercept form.',
    ch: [
      {letter: 'A', text: 'y = 3x + 10'},
      {letter: 'B', text: 'y = 3x - 2'},
      {letter: 'C', text: 'y = 3x + 6'},
      {letter: 'D', text: 'y = 3x + 4'},
          ],
    ans: 'A',
    sol: '**Distribute and solve for y.**\n\n```\ny - 4 = 3(x + 2)\ny - 4 = 3x + 6\ny = 3x + 10\n```\n\n**Key insight:** Distribute first, then isolate y.'
  },
  {
    pos: 22,
    diff: 'hard',
    text: 'What is the slope of the line through points (-1, 3) and (-1, 8)?',
    ch: [
      {letter: 'A', text: 'Undefined'},
      {letter: 'B', text: '0'},
      {letter: 'C', text: '5'},
      {letter: 'D', text: '1'},
          ],
    ans: 'A',
    sol: '**Check for vertical line.**\n\n```\nm = (8 - 3) / (-1 - (-1))\n  = 5 / 0\n  = undefined\n```\n\nSince both points have the same x-coordinate, this is a vertical line.\n\n**Key insight:** When x₁ = x₂, the line is vertical and slope is undefined.'
  },
  {
    pos: 23,
    diff: 'hard',
    text: 'If line L has equation y = mx + 5 and passes through (2, 11), what is m?',
    ch: [
      {letter: 'A', text: '3'},
      {letter: 'B', text: '6'},
      {letter: 'C', text: '5.5'},
      {letter: 'D', text: '8'},
          ],
    ans: 'A',
    sol: '**Substitute the point and solve for m.**\n\n```\n11 = m(2) + 5\n11 = 2m + 5\n6 = 2m\nm = 3\n```\n\n**Key insight:** Plug in the known point (x, y) to find the slope.'
  },
  {
    pos: 24,
    diff: 'hard',
    text: 'What is the distance from point (3, 4) to the origin?',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '7'},
      {letter: 'C', text: '√7'},
      {letter: 'D', text: '12'},
          ],
    ans: 'A',
    sol: '**Origin is (0, 0).**\n\n```\nd = √[(3-0)² + (4-0)²]\n  = √[9 + 16]\n  = √25\n  = 5\n```\n\n**Key insight:** Another 3-4-5 Pythagorean triple.'
  },
  {
    pos: 25,
    diff: 'hard',
    text: 'Two lines are given: y = 2x + 3 and y = 2x - 7. What is the distance between their y-intercepts?',
    ch: [
      {letter: 'A', text: '10'},
      {letter: 'B', text: '4'},
      {letter: 'C', text: '-4'},
      {letter: 'D', text: '5'},
          ],
    ans: 'A',
    sol: '**Find the y-intercepts and subtract.**\n\n```\nFirst y-intercept = 3\nSecond y-intercept = -7\n\nDistance = |3 - (-7)| = |3 + 7| = 10\n```\n\n**Key insight:** The y-intercepts occur at (0, 3) and (0, -7).'
  },
  {
    pos: 26,
    diff: 'hard',
    text: 'What is the slope-intercept form of 4x + 3y = 12?',
    ch: [
      {letter: 'A', text: 'y = -4/3x + 4'},
      {letter: 'B', text: 'y = 4/3x + 4'},
      {letter: 'C', text: 'y = -3/4x + 3'},
      {letter: 'D', text: 'y = 4x + 12'},
          ],
    ans: 'A',
    sol: '**Solve for y.**\n\n```\n4x + 3y = 12\n3y = -4x + 12\ny = -4/3x + 4\n```\n\n**Key insight:** Divide all terms by the coefficient of y.'
  },
  {
    pos: 27,
    diff: 'hard',
    text: 'A line passes through (2, 5) and (6, 5). What is its equation?',
    ch: [
      {letter: 'A', text: 'y = 5'},
      {letter: 'B', text: 'x = 5'},
      {letter: 'C', text: 'y = x + 3'},
      {letter: 'D', text: 'y = 0'},
          ],
    ans: 'A',
    sol: '**Both points have the same y-coordinate.**\n\nThis is a horizontal line at y = 5.\n\n```\nm = (5 - 5) / (6 - 2) = 0 / 4 = 0\n\ny = 5\n```\n\n**Key insight:** When y₁ = y₂, the line is horizontal.'
  },
  {
    pos: 28,
    diff: 'hard',
    text: 'What is the midpoint of the segment from (6, -2) to (-4, 8)?',
    ch: [
      {letter: 'A', text: '(1, 3)'},
      {letter: 'B', text: '(2, 6)'},
      {letter: 'C', text: '(5, 5)'},
      {letter: 'D', text: '(10, -10)'},
          ],
    ans: 'A',
    sol: '**Average the coordinates.**\n\n```\nMidpoint = ((6-4)/2, (-2+8)/2)\n         = (2/2, 6/2)\n         = (1, 3)\n```\n\n**Key insight:** Midpoint formula is just averaging x and y coordinates.'
  },
  {
    pos: 29,
    diff: 'hard',
    text: 'If a line has slope 0, which statement is true?',
    ch: [
      {letter: 'A', text: 'It is horizontal'},
      {letter: 'B', text: 'It is vertical'},
      {letter: 'C', text: 'It passes through the origin'},
      {letter: 'D', text: 'It has undefined slope'},
          ],
    ans: 'A',
    sol: '**Slope 0 means no change in y.**\n\nA line with slope 0 is horizontal (form: y = c).\n\n**Key insight:** Zero slope = horizontal, undefined slope = vertical.'
  },
  {
    pos: 30,
    diff: 'hard',
    text: 'Find the y-coordinate of the point on line y = 4x - 7 where x = 3.',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '12'},
      {letter: 'C', text: '-4'},
      {letter: 'D', text: '19'},
          ],
    ans: 'A',
    sol: '**Substitute x = 3 into the equation.**\n\n```\ny = 4(3) - 7\ny = 12 - 7\ny = 5\n```\n\n**Key insight:** Replace x with the given value and calculate y.'
  },
  {
    pos: 31,
    diff: 'hard',
    text: 'What is the distance between the points (5, 1) and (1, 4)?',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '7'},
      {letter: 'C', text: '√7'},
      {letter: 'D', text: '25'},
          ],
    ans: 'A',
    sol: '**Use distance formula.**\n\n```\nd = √[(1-5)² + (4-1)²]\n  = √[(-4)² + 3²]\n  = √[16 + 9]\n  = √25\n  = 5\n```\n\n**Key insight:** Another 3-4-5 triangle (with legs -4 and 3).'
  },
  {
    pos: 32,
    diff: 'hard',
    text: 'Convert x + 2y = 8 to slope-intercept form.',
    ch: [
      {letter: 'A', text: 'y = -1/2x + 4'},
      {letter: 'B', text: 'y = 1/2x + 4'},
      {letter: 'C', text: 'y = -x + 8'},
      {letter: 'D', text: 'y = -2x + 8'},
          ],
    ans: 'A',
    sol: '**Solve for y.**\n\n```\nx + 2y = 8\n2y = -x + 8\ny = -1/2x + 4\n```\n\n**Key insight:** Isolate y by moving x to the right and dividing.'
  },
  {
    pos: 33,
    diff: 'hard',
    text: 'What is the equation of the line through (0, 0) with slope -3?',
    ch: [
      {letter: 'A', text: 'y = -3x'},
      {letter: 'B', text: 'y = 3x'},
      {letter: 'C', text: 'y = -3'},
      {letter: 'D', text: 'y = -3x + 0'},
          ],
    ans: 'A',
    sol: '**Use y = mx + b with b = 0.**\n\nSince the line passes through the origin, b = 0:\n```\ny = -3x + 0\ny = -3x\n```\n\n**Key insight:** Lines through the origin have equation y = mx.'
  },
  {
    pos: 34,
    diff: 'hard',
    text: 'Two points are (a, 3) and (5, 3). What is the slope of the line through them?',
    ch: [
      {letter: 'A', text: '0'},
      {letter: 'B', text: 'Undefined'},
      {letter: 'C', text: '3'},
      {letter: 'D', text: '5 - a'},
          ],
    ans: 'A',
    sol: '**Both points have y = 3.**\n\n```\nm = (3 - 3) / (5 - a)\n  = 0 / (5 - a)\n  = 0\n```\n\n**Key insight:** Horizontal lines have slope 0, regardless of the x-coordinates.'
  },
  {
    pos: 35,
    diff: 'hard',
    text: 'What is the x-intercept of y = 3x - 9?',
    ch: [
      {letter: 'A', text: '3'},
      {letter: 'B', text: '-9'},
      {letter: 'C', text: '-3'},
      {letter: 'D', text: '9'},
          ],
    ans: 'A',
    sol: '**Set y = 0 and solve for x.**\n\n```\n0 = 3x - 9\n9 = 3x\nx = 3\n```\n\n**Key insight:** x-intercept is where the line crosses the x-axis.'
  },
  {
    pos: 36,
    diff: 'hard',
    text: 'Find the slope of the line 7x - 2y = 14.',
    ch: [
      {letter: 'A', text: '7/2'},
      {letter: 'B', text: '-7/2'},
      {letter: 'C', text: '2/7'},
      {letter: 'D', text: '7'},
          ],
    ans: 'A',
    sol: '**Convert to slope-intercept form.**\n\n```\n7x - 2y = 14\n-2y = -7x + 14\ny = 7/2x - 7\n\nSlope = 7/2\n```\n\n**Key insight:** The coefficient of x in y = mx + b is the slope.'
  },
  {
    pos: 37,
    diff: 'hard',
    text: 'What is the equation of a line with slope -2 and y-intercept 6?',
    ch: [
      {letter: 'A', text: 'y = -2x + 6'},
      {letter: 'B', text: 'y = 2x + 6'},
      {letter: 'C', text: 'y = -2x - 6'},
      {letter: 'D', text: 'y = 6x - 2'},
          ],
    ans: 'A',
    sol: '**Use y = mx + b directly.**\n\n```\nm = -2, b = 6\ny = -2x + 6\n```\n\n**Key insight:** When slope and y-intercept are given, plug directly into y = mx + b.'
  },
  {
    pos: 38,
    diff: 'hard',
    text: 'A line has x-intercept -3 and y-intercept 4. Find its equation in standard form.',
    ch: [
      {letter: 'A', text: '4x - 3y = -12'},
      {letter: 'B', text: '4x + 3y = 12'},
      {letter: 'C', text: '3x - 4y = 12'},
      {letter: 'D', text: 'x/(-3) + y/4 = 1'},
          ],
    ans: 'A',
    sol: '**Use intercept form, then convert.**\n\nIntercept form: x/(-3) + y/4 = 1\n\nMultiply by -12 (LCM of 3 and 4):\n```\n-12(x/(-3)) + -12(y/4) = -12\n4x - 3y = -12\n```\n\n**Key insight:** x/a + y/b = 1 is the intercept form.'
  },
  {
    pos: 39,
    diff: 'hard',
    text: 'What is the slope of the line through (3, -2) and (-1, 6)?',
    ch: [
      {letter: 'A', text: '-2'},
      {letter: 'B', text: '2'},
      {letter: 'C', text: '-1/2'},
      {letter: 'D', text: '1/2'},
          ],
    ans: 'A',
    sol: '**Use slope formula.**\n\n```\nm = (6 - (-2)) / (-1 - 3)\n  = (6 + 2) / (-4)\n  = 8 / (-4)\n  = -2\n```\n\n**Key insight:** Be careful with signs when subtracting negative numbers.'
  },
  {
    pos: 40,
    diff: 'hard',
    text: 'If point (k, 8) lies on the line y = 2x + 4, what is k?',
    ch: [
      {letter: 'A', text: '2'},
      {letter: 'B', text: '4'},
      {letter: 'C', text: '6'},
      {letter: 'D', text: '8'},
          ],
    ans: 'A',
    sol: '**Substitute y = 8 into the equation.**\n\n```\n8 = 2k + 4\n4 = 2k\nk = 2\n```\n\n**Key insight:** If a point lies on a line, its coordinates satisfy the equation.'
  },
  {
    pos: 41,
    diff: 'hard',
    text: 'What is the perpendicular distance from the origin to the line x + y = 5?',
    ch: [
      {letter: 'A', text: '5/√2'},
      {letter: 'B', text: '5'},
      {letter: 'C', text: '√5'},
      {letter: 'D', text: '5√2'},
          ],
    ans: 'A',
    sol: '**Use the distance from point to line formula.**\n\nFor line ax + by + c = 0 and point (x₀, y₀):\n```\nd = |ax₀ + by₀ + c| / √(a² + b²)\n```\n\nRewrite as x + y - 5 = 0:\n```\nd = |1(0) + 1(0) - 5| / √(1² + 1²)\n  = |-5| / √2\n  = 5/√2\n```\n\n**Key insight:** This formula gives perpendicular distance from a point to a line.'
  },
  {
    pos: 42,
    diff: 'hard',
    text: 'Two parallel lines are y = 3x + 2 and y = 3x + k. If the distance between them is measured along the y-axis, what is |k - 2|?',
    ch: [
      {letter: 'A', text: '|k - 2|'},
      {letter: 'B', text: '3'},
      {letter: 'C', text: 'k'},
      {letter: 'D', text: '0'},
          ],
    ans: 'A',
    sol: '**The vertical distance is the difference in y-intercepts.**\n\n```\nFirst y-intercept: 2\nSecond y-intercept: k\n\nDistance along y-axis = |k - 2|\n```\n\n**Key insight:** For parallel lines y = mx + b₁ and y = mx + b₂, vertical distance is |b₂ - b₁|.'
  },
  {
    pos: 43,
    diff: 'hard',
    text: 'What is the equation of the line passing through (-2, 5) and (4, 5)?',
    ch: [
      {letter: 'A', text: 'y = 5'},
      {letter: 'B', text: 'x = 5'},
      {letter: 'C', text: 'y = x + 5'},
      {letter: 'D', text: 'y = -2'},
          ],
    ans: 'A',
    sol: '**Both points have y = 5.**\n\nThis is a horizontal line:\n```\ny = 5\n```\n\n**Key insight:** When two points have the same y-coordinate, the line is horizontal.'
  },
  {
    pos: 44,
    diff: 'hard',
    text: 'Find the slope of a line perpendicular to the line through (2, 1) and (5, 10).',
    ch: [
      {letter: 'A', text: '-1/3'},
      {letter: 'B', text: '3'},
      {letter: 'C', text: '-3'},
      {letter: 'D', text: '1/3'},
          ],
    ans: 'A',
    sol: '**Find original slope, then take negative reciprocal.**\n\n```\nm = (10 - 1) / (5 - 2)\n  = 9 / 3\n  = 3\n\nPerpendicular slope = -1/3\n```\n\n**Key insight:** Perpendicular slopes are negative reciprocals.'
  },
  {
    pos: 45,
    diff: 'hard',
    text: 'What is the y-coordinate of the midpoint between (3, -4) and (7, 10)?',
    ch: [
      {letter: 'A', text: '3'},
      {letter: 'B', text: '5'},
      {letter: 'C', text: '6'},
      {letter: 'D', text: '7'},
          ],
    ans: 'A',
    sol: '**Average the y-coordinates.**\n\n```\ny-coordinate of midpoint = (-4 + 10) / 2\n                         = 6 / 2\n                         = 3\n```\n\n**Key insight:** Midpoint y-coordinate is the average of the two y-values.'
  },
  {
    pos: 46,
    diff: 'hard',
    text: 'A line passes through (2, -3) and has an undefined slope. What is its equation?',
    ch: [
      {letter: 'A', text: 'x = 2'},
      {letter: 'B', text: 'y = -3'},
      {letter: 'C', text: 'y = 2x'},
      {letter: 'D', text: 'x = -3'},
          ],
    ans: 'A',
    sol: '**Undefined slope means vertical line.**\n\nVertical lines have form x = constant:\n```\nx = 2\n```\n\n**Key insight:** Undefined slope always indicates a vertical line.'
  },
  {
    pos: 47,
    diff: 'hard',
    text: 'What is the slope of the line 6y = 12x - 18?',
    ch: [
      {letter: 'A', text: '2'},
      {letter: 'B', text: '12'},
      {letter: 'C', text: '6'},
      {letter: 'D', text: '1/2'},
          ],
    ans: 'A',
    sol: '**Divide everything by 6.**\n\n```\n6y = 12x - 18\ny = 2x - 3\n\nSlope = 2\n```\n\n**Key insight:** Isolate y to get slope-intercept form.'
  },
  {
    pos: 48,
    diff: 'hard',
    text: 'Points A(1, 2), B(4, 6), and C are collinear. If C has x-coordinate 7, what is its y-coordinate?',
    ch: [
      {letter: 'A', text: '10'},
      {letter: 'B', text: '8'},
      {letter: 'C', text: '12'},
      {letter: 'D', text: '9'},
          ],
    ans: 'A',
    sol: '**Find the line equation through A and B.**\n\n```\nSlope = (6-2)/(4-1) = 4/3\n\nUsing point-slope with A:\ny - 2 = (4/3)(x - 1)\ny = (4/3)x + 2/3\n\nFor x = 7:\ny = (4/3)(7) + 2/3\ny = 28/3 + 2/3\ny = 30/3\ny = 10\n```\n\n**Key insight:** Collinear points all lie on the same line.'
  },
  {
    pos: 49,
    diff: 'hard',
    text: 'Find the distance from point (4, 1) to the line y = 3.',
    ch: [
      {letter: 'A', text: '2'},
      {letter: 'B', text: '4'},
      {letter: 'C', text: '1'},
      {letter: 'D', text: '3'},
          ],
    ans: 'A',
    sol: '**Distance to horizontal line is difference in y-coordinates.**\n\n```\nPoint has y = 1\nLine has y = 3\n\nDistance = |3 - 1| = 2\n```\n\n**Key insight:** Distance from a point to a horizontal line is the vertical distance.'
  },
  {
    pos: 50,
    diff: 'hard',
    text: 'If lines y = 2x + 3 and y = kx - 1 are parallel, what is k?',
    ch: [
      {letter: 'A', text: '2'},
      {letter: 'B', text: '3'},
      {letter: 'C', text: '-1'},
      {letter: 'D', text: '1/2'},
          ],
    ans: 'A',
    sol: '**Parallel lines have equal slopes.**\n\n```\nSlope of first line = 2\n\nFor lines to be parallel:\nk = 2\n```\n\n**Key insight:** Parallel lines have identical slopes but different y-intercepts.'
  }
];

async function insertQuestions() {
  console.log('Finding lesson...');

  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', '2.3')
    .single();

  if (lessonError) {
    console.error('Error finding lesson 2.3:', lessonError);
    return;
  }

  console.log(`Found lesson 2.3 with ID: ${lesson.id}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const questionData = {
      lesson_id: lesson.id,
      subject: 'math',
      position: q.pos,
      difficulty: q.diff,
      title: `Lines Question ${q.pos}`,
      problem_text: q.text,
      choices: q.ch,
      correct_answer: q.ans,
      answer_explanation: q.sol
    };

    const { data, error } = await supabase
      .from('practice_questions')
      .insert([questionData]);

    if (error) {
      console.error(`Error inserting question ${q.pos}:`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`\n=== COMPLETE: ${successCount}/${questions.length} success, ${errorCount}/${questions.length} errors ===`);
}

insertQuestions();
