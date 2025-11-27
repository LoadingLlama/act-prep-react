require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const questions = [
  {
    pos: 1,
    diff: 'hard',
    text: 'A vector **v** has components ⟨3, -4⟩. What is the magnitude of **v**?',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '7'},
      {letter: 'C', text: '√7'},
      {letter: 'D', text: '1'},
          ],
    ans: 'A',
    sol: '**Find the magnitude using the Pythagorean theorem.**\n\nFor vector **v** = ⟨3, -4⟩:\n\n```\n|v| = √(3² + (-4)²)\n    = √(9 + 16)\n    = √25\n    = 5\n```\n\n**Key insight:** The magnitude of a vector ⟨a, b⟩ is √(a² + b²), regardless of whether components are positive or negative.'
  },
  {
    pos: 2,
    diff: 'hard',
    text: 'If **u** = ⟨2, 5⟩ and **v** = ⟨-3, 1⟩, what is **u** + **v**?',
    ch: [
      {letter: 'A', text: '⟨-1, 6⟩'},
      {letter: 'B', text: '⟨5, 4⟩'},
      {letter: 'C', text: '⟨-6, 5⟩'},
      {letter: 'D', text: '⟨-1, -4⟩'},
          ],
    ans: 'A',
    sol: '**Add corresponding components.**\n\n```\nu + v = ⟨2, 5⟩ + ⟨-3, 1⟩\n      = ⟨2 + (-3), 5 + 1⟩\n      = ⟨-1, 6⟩\n```\n\n**Key insight:** Vector addition is component-wise: ⟨a₁, b₁⟩ + ⟨a₂, b₂⟩ = ⟨a₁ + a₂, b₁ + b₂⟩.'
  },
  {
    pos: 3,
    diff: 'hard',
    text: 'What is 3 times the vector ⟨-2, 4⟩?',
    ch: [
      {letter: 'A', text: '⟨-6, 12⟩'},
      {letter: 'B', text: '⟨-5, 7⟩'},
      {letter: 'C', text: '⟨1, 7⟩'},
      {letter: 'D', text: '⟨-6, 1⟩'},
          ],
    ans: 'A',
    sol: '**Multiply each component by the scalar.**\n\n```\n3 · ⟨-2, 4⟩ = ⟨3(-2), 3(4)⟩\n             = ⟨-6, 12⟩\n```\n\n**Key insight:** Scalar multiplication multiplies each component of the vector by the scalar.'
  },
  {
    pos: 4,
    diff: 'hard',
    text: 'If **v** = ⟨6, -8⟩, what is the unit vector in the direction of **v**?',
    ch: [
      {letter: 'A', text: '⟨3/5, -4/5⟩'},
      {letter: 'B', text: '⟨6/10, -8/10⟩'},
      {letter: 'C', text: '⟨1, 0⟩'},
      {letter: 'D', text: '⟨-3/5, 4/5⟩'},
          ],
    ans: 'A',
    sol: '**Divide the vector by its magnitude.**\n\nFirst, find |**v**|:\n```\n|v| = √(6² + (-8)²) = √(36 + 64) = √100 = 10\n```\n\nThen divide each component by 10:\n```\nunit vector = ⟨6/10, -8/10⟩ = ⟨3/5, -4/5⟩\n```\n\n**Key insight:** A unit vector has magnitude 1 and is found by dividing a vector by its magnitude.'
  },
  {
    pos: 5,
    diff: 'hard',
    text: 'What is the dot product of **u** = ⟨3, 2⟩ and **v** = ⟨4, -1⟩?',
    ch: [
      {letter: 'A', text: '10'},
      {letter: 'B', text: '14'},
      {letter: 'C', text: '5'},
      {letter: 'D', text: '⟨12, -2⟩'},
          ],
    ans: 'A',
    sol: '**Multiply corresponding components and add.**\n\n```\nu · v = (3)(4) + (2)(-1)\n      = 12 + (-2)\n      = 10\n```\n\n**Key insight:** The dot product ⟨a₁, b₁⟩ · ⟨a₂, b₂⟩ = a₁a₂ + b₁b₂ produces a scalar, not a vector.'
  },
  {
    pos: 6,
    diff: 'hard',
    text: 'If **u** = ⟨5, 1⟩ and **v** = ⟨-2, 3⟩, what is **u** - **v**?',
    ch: [
      {letter: 'A', text: '⟨7, -2⟩'},
      {letter: 'B', text: '⟨3, 4⟩'},
      {letter: 'C', text: '⟨-7, 2⟩'},
      {letter: 'D', text: '⟨3, -2⟩'},
          ],
    ans: 'A',
    sol: '**Subtract corresponding components.**\n\n```\nu - v = ⟨5, 1⟩ - ⟨-2, 3⟩\n      = ⟨5 - (-2), 1 - 3⟩\n      = ⟨5 + 2, 1 - 3⟩\n      = ⟨7, -2⟩\n```\n\n**Key insight:** Vector subtraction is component-wise: ⟨a₁, b₁⟩ - ⟨a₂, b₂⟩ = ⟨a₁ - a₂, b₁ - b₂⟩.'
  },
  {
    pos: 7,
    diff: 'hard',
    text: 'A vector starts at point A(2, 3) and ends at point B(7, 15). What is the component form of vector **AB**?',
    ch: [
      {letter: 'A', text: '⟨5, 12⟩'},
      {letter: 'B', text: '⟨9, 18⟩'},
      {letter: 'C', text: '⟨-5, -12⟩'},
      {letter: 'D', text: '⟨7, 15⟩'},
          ],
    ans: 'A',
    sol: '**Subtract initial point from terminal point.**\n\n```\nAB = ⟨7 - 2, 15 - 3⟩\n   = ⟨5, 12⟩\n```\n\n**Key insight:** For a vector from point (x₁, y₁) to (x₂, y₂), the component form is ⟨x₂ - x₁, y₂ - y₁⟩.'
  },
  {
    pos: 8,
    diff: 'hard',
    text: 'Vectors **u** = ⟨4, 3⟩ and **v** = ⟨-3, 4⟩. Are these vectors perpendicular?',
    ch: [
      {letter: 'A', text: 'Yes, because their dot product is 0'},
      {letter: 'B', text: 'No, because their dot product is 24'},
      {letter: 'C', text: 'Yes, because their magnitudes are equal'},
      {letter: 'D', text: 'No, because they don\'t form a 90° angle'},
          ],
    ans: 'A',
    sol: '**Check if the dot product equals zero.**\n\n```\nu · v = (4)(-3) + (3)(4)\n      = -12 + 12\n      = 0\n```\n\nSince the dot product is 0, the vectors are perpendicular.\n\n**Key insight:** Two vectors are perpendicular (orthogonal) if and only if their dot product is zero.'
  },
  {
    pos: 9,
    diff: 'hard',
    text: 'What is the magnitude of vector ⟨-5, -12⟩?',
    ch: [
      {letter: 'A', text: '13'},
      {letter: 'B', text: '17'},
      {letter: 'C', text: '√17'},
      {letter: 'D', text: '7'},
          ],
    ans: 'A',
    sol: '**Use the distance formula.**\n\n```\n|v| = √((-5)² + (-12)²)\n    = √(25 + 144)\n    = √169\n    = 13\n```\n\n**Key insight:** This is a 5-12-13 Pythagorean triple. The magnitude is always positive even when components are negative.'
  },
  {
    pos: 10,
    diff: 'hard',
    text: 'If 2**u** + **v** = ⟨8, 10⟩ and **u** = ⟨3, 4⟩, what is **v**?',
    ch: [
      {letter: 'A', text: '⟨2, 2⟩'},
      {letter: 'B', text: '⟨14, 18⟩'},
      {letter: 'C', text: '⟨5, 6⟩'},
      {letter: 'D', text: '⟨-2, -2⟩'},
          ],
    ans: 'A',
    sol: '**Solve for v algebraically.**\n\n```\n2u + v = ⟨8, 10⟩\nv = ⟨8, 10⟩ - 2u\nv = ⟨8, 10⟩ - 2⟨3, 4⟩\nv = ⟨8, 10⟩ - ⟨6, 8⟩\nv = ⟨8 - 6, 10 - 8⟩\nv = ⟨2, 2⟩\n```\n\n**Key insight:** Solve vector equations by isolating the unknown vector and performing operations component-wise.'
  },
  {
    pos: 11,
    diff: 'hard',
    text: 'A force vector **F** = ⟨20, 21⟩ acts on an object. The object moves from (0, 0) to (3, 4). What is the work done (using dot product)?',
    ch: [
      {letter: 'A', text: '144'},
      {letter: 'B', text: '104'},
      {letter: 'C', text: '60'},
      {letter: 'D', text: '84'},
          ],
    ans: 'A',
    sol: '**Work = Force · Displacement.**\n\nDisplacement vector **d** = ⟨3 - 0, 4 - 0⟩ = ⟨3, 4⟩\n\n```\nWork = F · d\n     = ⟨20, 21⟩ · ⟨3, 4⟩\n     = (20)(3) + (21)(4)\n     = 60 + 84\n     = 144\n```\n\n**Key insight:** Work is the dot product of force and displacement vectors.'
  },
  {
    pos: 12,
    diff: 'hard',
    text: 'What is -2 times vector ⟨3, -7⟩?',
    ch: [
      {letter: 'A', text: '⟨-6, 14⟩'},
      {letter: 'B', text: '⟨6, -14⟩'},
      {letter: 'C', text: '⟨1, -9⟩'},
      {letter: 'D', text: '⟨-6, -14⟩'},
          ],
    ans: 'A',
    sol: '**Multiply each component by -2.**\n\n```\n-2 · ⟨3, -7⟩ = ⟨-2(3), -2(-7)⟩\n              = ⟨-6, 14⟩\n```\n\n**Key insight:** Multiplying by a negative scalar reverses the direction of the vector.'
  },
  {
    pos: 13,
    diff: 'hard',
    text: 'If **a** = ⟨1, 2⟩, **b** = ⟨3, -1⟩, and **c** = ⟨-2, 4⟩, what is **a** + **b** + **c**?',
    ch: [
      {letter: 'A', text: '⟨2, 5⟩'},
      {letter: 'B', text: '⟨6, 1⟩'},
      {letter: 'C', text: '⟨0, 7⟩'},
      {letter: 'D', text: '⟨-4, -3⟩'},
          ],
    ans: 'A',
    sol: '**Add all vectors component-wise.**\n\n```\na + b + c = ⟨1, 2⟩ + ⟨3, -1⟩ + ⟨-2, 4⟩\n          = ⟨1 + 3 + (-2), 2 + (-1) + 4⟩\n          = ⟨2, 5⟩\n```\n\n**Key insight:** Vector addition is associative, so you can add multiple vectors by adding all x-components and all y-components separately.'
  },
  {
    pos: 14,
    diff: 'hard',
    text: 'Vector **v** has magnitude 10 and makes an angle of 0° with the positive x-axis. What is **v** in component form?',
    ch: [
      {letter: 'A', text: '⟨10, 0⟩'},
      {letter: 'B', text: '⟨0, 10⟩'},
      {letter: 'C', text: '⟨5√2, 5√2⟩'},
      {letter: 'D', text: '⟨-10, 0⟩'},
          ],
    ans: 'A',
    sol: '**Use polar to rectangular conversion.**\n\n```\nvₓ = |v| cos(θ) = 10 cos(0°) = 10(1) = 10\nvᵧ = |v| sin(θ) = 10 sin(0°) = 10(0) = 0\n\nv = ⟨10, 0⟩\n```\n\n**Key insight:** A vector at 0° points along the positive x-axis, so it has no y-component.'
  },
  {
    pos: 15,
    diff: 'hard',
    text: 'What is the angle between vectors **u** = ⟨1, 0⟩ and **v** = ⟨0, 1⟩?',
    ch: [
      {letter: 'A', text: '90°'},
      {letter: 'B', text: '0°'},
      {letter: 'C', text: '45°'},
      {letter: 'D', text: '180°'},
          ],
    ans: 'A',
    sol: '**Check the dot product.**\n\n```\nu · v = (1)(0) + (0)(1) = 0\n```\n\nSince the dot product is 0, the vectors are perpendicular.\n\n**Key insight:** ⟨1, 0⟩ points along the x-axis and ⟨0, 1⟩ points along the y-axis, which are perpendicular (90° apart).'
  },
  {
    pos: 16,
    diff: 'hard',
    text: 'If **v** = ⟨8, 15⟩, what is the magnitude of **v**?',
    ch: [
      {letter: 'A', text: '17'},
      {letter: 'B', text: '23'},
      {letter: 'C', text: '√289'},
      {letter: 'D', text: '7'},
          ],
    ans: 'A',
    sol: '**Apply the Pythagorean theorem.**\n\n```\n|v| = √(8² + 15²)\n    = √(64 + 225)\n    = √289\n    = 17\n```\n\n**Key insight:** This is an 8-15-17 Pythagorean triple, a scaled version of the 3-4-5 triangle.'
  },
  {
    pos: 17,
    diff: 'hard',
    text: 'What vector is parallel to ⟨6, -9⟩ but has magnitude 5?',
    ch: [
      {letter: 'A', text: '⟨2, -3⟩'},
      {letter: 'B', text: '⟨6, -9⟩'},
      {letter: 'C', text: '⟨3, -4.5⟩'},
      {letter: 'D', text: '⟨10, -15⟩'},
          ],
    ans: 'A',
    sol: '**Find unit vector, then scale to magnitude 5.**\n\nFirst, find the magnitude:\n```\n|v| = √(6² + (-9)²) = √(36 + 81) = √117 = 3√13\n```\n\nUnit vector: ⟨6/(3√13), -9/(3√13)⟩ = ⟨2/√13, -3/√13⟩\n\nScale by 5:\n```\n5 · ⟨2/√13, -3/√13⟩ = ⟨10/√13, -15/√13⟩\n```\n\nBut simpler: ⟨6, -9⟩ = 3⟨2, -3⟩, and |⟨2, -3⟩| = √(4+9) = √13 ≈ 3.6\n\nActually, checking: |⟨2, -3⟩| = √13 ≈ 3.6, not 5.\n\nLet me recalculate. We want a vector parallel to ⟨6, -9⟩ with magnitude 5.\n⟨6, -9⟩ simplifies to direction ⟨2, -3⟩.\n|⟨2, -3⟩| = √13\nTo get magnitude 5: (5/√13)⟨2, -3⟩ = ⟨10/√13, -15/√13⟩\n\nActually, let\'s check option A: |⟨2, -3⟩| = √(4 + 9) = √13 ≈ 3.606, not 5.\n\nWait, I need to be more careful. Let me recalculate:\n\nThe answer should be (5/√117)⟨6, -9⟩ = (5/(3√13))⟨6, -9⟩ = ⟨30/(3√13), -45/(3√13)⟩ = ⟨10/√13, -15/√13⟩\n\nHmm, none of the simple options match. Let me check if ⟨2, -3⟩ has magnitude 5:\n√(4 + 9) = √13 ≈ 3.6, not 5.\n\nThis question has an error. Let me fix it.\n\n**Key insight:** Parallel vectors have proportional components. To find a parallel vector with a specific magnitude, first find the unit vector, then multiply by the desired magnitude.'
  },
  {
    pos: 18,
    diff: 'hard',
    text: 'If **u** · **v** = 0 and both vectors are non-zero, what can you conclude?',
    ch: [
      {letter: 'A', text: 'The vectors are perpendicular'},
      {letter: 'B', text: 'The vectors are parallel'},
      {letter: 'C', text: 'The vectors have equal magnitude'},
      {letter: 'D', text: 'The vectors point in opposite directions'},
          ],
    ans: 'A',
    sol: '**Zero dot product means perpendicular vectors.**\n\nThe dot product formula is:\n```\nu · v = |u| |v| cos(θ)\n```\n\nIf **u** · **v** = 0 and both vectors are non-zero, then:\n```\n|u| |v| cos(θ) = 0\ncos(θ) = 0\nθ = 90°\n```\n\n**Key insight:** Two non-zero vectors are perpendicular (orthogonal) if and only if their dot product is zero.'
  },
  {
    pos: 19,
    diff: 'hard',
    text: 'What is the projection of **u** = ⟨4, 2⟩ onto **v** = ⟨1, 0⟩?',
    ch: [
      {letter: 'A', text: '⟨4, 0⟩'},
      {letter: 'B', text: '⟨2, 1⟩'},
      {letter: 'C', text: '⟨1, 0⟩'},
      {letter: 'D', text: '⟨0, 2⟩'},
          ],
    ans: 'A',
    sol: '**Use the projection formula.**\n\n```\nproj_v(u) = [(u · v) / (v · v)] v\n\nu · v = (4)(1) + (2)(0) = 4\nv · v = (1)(1) + (0)(0) = 1\n\nproj_v(u) = (4/1) · ⟨1, 0⟩ = 4⟨1, 0⟩ = ⟨4, 0⟩\n```\n\n**Key insight:** Projecting onto ⟨1, 0⟩ (the x-axis) gives the horizontal component of the vector.'
  },
  {
    pos: 20,
    diff: 'hard',
    text: 'Vectors **a** = ⟨2, k⟩ and **b** = ⟨-6, 9⟩ are parallel. What is k?',
    ch: [
      {letter: 'A', text: '-3'},
      {letter: 'B', text: '3'},
      {letter: 'C', text: '6'},
      {letter: 'D', text: '-6'},
          ],
    ans: 'A',
    sol: '**Parallel vectors have proportional components.**\n\nIf **a** and **b** are parallel, then **a** = c**b** for some scalar c.\n\n```\n⟨2, k⟩ = c⟨-6, 9⟩\n\nFrom x-component: 2 = c(-6)\nc = -1/3\n\nFrom y-component: k = c(9)\nk = (-1/3)(9)\nk = -3\n```\n\n**Key insight:** For parallel vectors ⟨a₁, b₁⟩ and ⟨a₂, b₂⟩, we have a₁/a₂ = b₁/b₂.'
  },
  {
    pos: 21,
    diff: 'hard',
    text: 'What is 3⟨2, -1⟩ - 2⟨4, 3⟩?',
    ch: [
      {letter: 'A', text: '⟨-2, -9⟩'},
      {letter: 'B', text: '⟨14, 3⟩'},
      {letter: 'C', text: '⟨-2, 3⟩'},
      {letter: 'D', text: '⟨2, -9⟩'},
          ],
    ans: 'A',
    sol: '**Perform scalar multiplication first, then subtract.**\n\n```\n3⟨2, -1⟩ - 2⟨4, 3⟩\n= ⟨6, -3⟩ - ⟨8, 6⟩\n= ⟨6 - 8, -3 - 6⟩\n= ⟨-2, -9⟩\n```\n\n**Key insight:** Follow order of operations: scalar multiplication before vector addition/subtraction.'
  },
  {
    pos: 22,
    diff: 'hard',
    text: 'A velocity vector **v** = ⟨60, 80⟩ represents motion in feet per second. What is the speed (magnitude)?',
    ch: [
      {letter: 'A', text: '100 ft/s'},
      {letter: 'B', text: '140 ft/s'},
      {letter: 'C', text: '70 ft/s'},
      {letter: 'D', text: '√140 ft/s'},
          ],
    ans: 'A',
    sol: '**Speed is the magnitude of velocity.**\n\n```\nspeed = |v| = √(60² + 80²)\n      = √(3600 + 6400)\n      = √10000\n      = 100 ft/s\n```\n\n**Key insight:** This is a 3-4-5 Pythagorean triple scaled by 20: (60, 80, 100) = 20(3, 4, 5).'
  },
  {
    pos: 23,
    diff: 'hard',
    text: 'If **u** = ⟨-3, 4⟩ and **v** = ⟨5, 12⟩, what is **u** · **v**?',
    ch: [
      {letter: 'A', text: '33'},
      {letter: 'B', text: '65'},
      {letter: 'C', text: '-15'},
      {letter: 'D', text: '⟨-15, 48⟩'},
          ],
    ans: 'A',
    sol: '**Calculate the dot product.**\n\n```\nu · v = (-3)(5) + (4)(12)\n      = -15 + 48\n      = 33\n```\n\n**Key insight:** The dot product adds the products of corresponding components, resulting in a scalar.'
  },
  {
    pos: 24,
    diff: 'hard',
    text: 'What is the zero vector **0**?',
    ch: [
      {letter: 'A', text: '⟨0, 0⟩'},
      {letter: 'B', text: '⟨1, 1⟩'},
      {letter: 'C', text: '0'},
      {letter: 'D', text: 'Undefined'},
          ],
    ans: 'A',
    sol: '**The zero vector has all components equal to zero.**\n\n```\n0 = ⟨0, 0⟩\n```\n\nProperties:\n- Magnitude is 0\n- Adding it to any vector doesn\'t change that vector: **v** + **0** = **v**\n- No specific direction\n\n**Key insight:** The zero vector is the additive identity for vector addition.'
  },
  {
    pos: 25,
    diff: 'hard',
    text: 'Vector **v** has magnitude 13 and makes an angle of 90° with the positive x-axis. What is **v** in component form?',
    ch: [
      {letter: 'A', text: '⟨0, 13⟩'},
      {letter: 'B', text: '⟨13, 0⟩'},
      {letter: 'C', text: '⟨13, 13⟩'},
      {letter: 'D', text: '⟨0, -13⟩'},
          ],
    ans: 'A',
    sol: '**Convert from polar to rectangular form.**\n\n```\nvₓ = |v| cos(θ) = 13 cos(90°) = 13(0) = 0\nvᵧ = |v| sin(θ) = 13 sin(90°) = 13(1) = 13\n\nv = ⟨0, 13⟩\n```\n\n**Key insight:** A vector at 90° points along the positive y-axis, so it has no x-component.'
  },
  {
    pos: 26,
    diff: 'hard',
    text: 'If 4**u** - 2**v** = ⟨14, 6⟩ and **u** = ⟨2, 3⟩, what is **v**?',
    ch: [
      {letter: 'A', text: '⟨-3, -3⟩'},
      {letter: 'B', text: '⟨3, 3⟩'},
      {letter: 'C', text: '⟨7, 3⟩'},
      {letter: 'D', text: '⟨-7, -9⟩'},
          ],
    ans: 'A',
    sol: '**Solve for v algebraically.**\n\n```\n4u - 2v = ⟨14, 6⟩\n4⟨2, 3⟩ - 2v = ⟨14, 6⟩\n⟨8, 12⟩ - 2v = ⟨14, 6⟩\n-2v = ⟨14, 6⟩ - ⟨8, 12⟩\n-2v = ⟨6, -6⟩\nv = ⟨6, -6⟩ / (-2)\nv = ⟨-3, 3⟩\n```\n\nWait, let me recalculate:\n```\n-2v = ⟨14 - 8, 6 - 12⟩ = ⟨6, -6⟩\nv = ⟨6, -6⟩ / (-2) = ⟨-3, 3⟩\n```\n\nHmm, that gives ⟨-3, 3⟩ not ⟨-3, -3⟩. Let me check the answer choice.\n\nActually I made an error. Let me recalculate:\n```\n-2v = ⟨6, -6⟩\nv = ⟨6/-2, -6/-2⟩\nv = ⟨-3, 3⟩\n```\n\nThe answer should be ⟨-3, 3⟩, but that\'s not option A. Let me verify the problem setup again or fix the answer.\n\n**Key insight:** Isolate the unknown vector and divide by the scalar coefficient component-wise.'
  },
  {
    pos: 27,
    diff: 'hard',
    text: 'What is the distance between points P(1, 4) and Q(7, 12)?',
    ch: [
      {letter: 'A', text: '10'},
      {letter: 'B', text: '14'},
      {letter: 'C', text: '√100'},
      {letter: 'D', text: '6'},
          ],
    ans: 'A',
    sol: '**Use the distance formula (magnitude of displacement vector).**\n\n```\nPQ = ⟨7 - 1, 12 - 4⟩ = ⟨6, 8⟩\n\ndistance = |PQ| = √(6² + 8²)\n         = √(36 + 64)\n         = √100\n         = 10\n```\n\n**Key insight:** This is a 3-4-5 Pythagorean triple scaled by 2: (6, 8, 10) = 2(3, 4, 5).'
  },
  {
    pos: 28,
    diff: 'hard',
    text: 'Vectors **u** = ⟨a, 3⟩ and **v** = ⟨4, 6⟩ are perpendicular. What is a?',
    ch: [
      {letter: 'A', text: '-2'},
      {letter: 'B', text: '2'},
      {letter: 'C', text: '8'},
      {letter: 'D', text: '-8'},
          ],
    ans: 'A',
    sol: '**Perpendicular vectors have dot product = 0.**\n\n```\nu · v = 0\n⟨a, 3⟩ · ⟨4, 6⟩ = 0\n(a)(4) + (3)(6) = 0\n4a + 18 = 0\n4a = -18\na = -18/4\na = -4.5\n```\n\nWait, -4.5 isn\'t an option. Let me recalculate:\n4a + 18 = 0\n4a = -18\na = -9/2 = -4.5\n\nThis doesn\'t match any option. Let me check if I made an error. Actually, -18/4 should simplify differently. Let me try again:\n\nActually, maybe the problem should be ⟨a, 2⟩ and ⟨4, 6⟩:\n4a + 12 = 0\n4a = -12\na = -3\n\nOr maybe ⟨a, 1⟩ and ⟨4, 6⟩:\n4a + 6 = 0\na = -3/2\n\nLet me try with ⟨a, 4⟩ and ⟨4, 2⟩:\n4a + 8 = 0\na = -2 ✓\n\nI\'ll fix this question.\n\n**Key insight:** For perpendicular vectors, set their dot product equal to zero and solve.'
  },
  {
    pos: 29,
    diff: 'hard',
    text: 'What is the component form of a vector with magnitude 5 pointing in the direction of ⟨3, 4⟩?',
    ch: [
      {letter: 'A', text: '⟨3, 4⟩'},
      {letter: 'B', text: '⟨15, 20⟩'},
      {letter: 'C', text: '⟨5, 5⟩'},
      {letter: 'D', text: '⟨1, 1⟩'},
          ],
    ans: 'A',
    sol: '**Find unit vector, then scale.**\n\nFirst, find the magnitude of ⟨3, 4⟩:\n```\n|v| = √(3² + 4²) = √(9 + 16) = √25 = 5\n```\n\nSince ⟨3, 4⟩ already has magnitude 5, it\'s already the answer!\n\n```\nunit vector = ⟨3/5, 4/5⟩\nvector with magnitude 5 = 5 · ⟨3/5, 4/5⟩ = ⟨3, 4⟩\n```\n\n**Key insight:** To find a vector with magnitude m in the direction of **v**, compute m · (**v**/|**v**|).'
  },
  {
    pos: 30,
    diff: 'hard',
    text: 'If **a** + **b** = ⟨5, 7⟩ and **a** - **b** = ⟨1, 3⟩, what is **a**?',
    ch: [
      {letter: 'A', text: '⟨3, 5⟩'},
      {letter: 'B', text: '⟨4, 4⟩'},
      {letter: 'C', text: '⟨2, 2⟩'},
      {letter: 'D', text: '⟨6, 10⟩'},
          ],
    ans: 'A',
    sol: '**Add the two equations to eliminate b.**\n\n```\n(a + b) + (a - b) = ⟨5, 7⟩ + ⟨1, 3⟩\n2a = ⟨6, 10⟩\na = ⟨3, 5⟩\n```\n\nVerify:\n```\nIf a = ⟨3, 5⟩, then from a + b = ⟨5, 7⟩:\nb = ⟨5, 7⟩ - ⟨3, 5⟩ = ⟨2, 2⟩\n\nCheck: a - b = ⟨3, 5⟩ - ⟨2, 2⟩ = ⟨1, 3⟩ ✓\n```\n\n**Key insight:** Solve systems of vector equations using addition/subtraction to eliminate unknowns.'
  },
  {
    pos: 31,
    diff: 'hard',
    text: 'What is the angle (in degrees) that vector ⟨1, 1⟩ makes with the positive x-axis?',
    ch: [
      {letter: 'A', text: '45°'},
      {letter: 'B', text: '90°'},
      {letter: 'C', text: '30°'},
      {letter: 'D', text: '60°'},
          ],
    ans: 'A',
    sol: '**Use inverse tangent.**\n\n```\ntan(θ) = y/x = 1/1 = 1\nθ = arctan(1) = 45°\n```\n\nAlternatively, ⟨1, 1⟩ points equally in the x and y directions, which is the diagonal of a square, forming a 45° angle.\n\n**Key insight:** For vector ⟨x, y⟩, the angle θ = arctan(y/x).'
  },
  {
    pos: 32,
    diff: 'hard',
    text: 'If **v** = ⟨7, 24⟩, what is 2**v**?',
    ch: [
      {letter: 'A', text: '⟨14, 48⟩'},
      {letter: 'B', text: '⟨9, 26⟩'},
      {letter: 'C', text: '⟨7, 24⟩'},
      {letter: 'D', text: '⟨3.5, 12⟩'},
          ],
    ans: 'A',
    sol: '**Multiply each component by 2.**\n\n```\n2v = 2⟨7, 24⟩\n   = ⟨2(7), 2(24)⟩\n   = ⟨14, 48⟩\n```\n\n**Key insight:** Scalar multiplication scales each component independently.'
  },
  {
    pos: 33,
    diff: 'hard',
    text: 'What is **u** · **u** if **u** = ⟨5, 12⟩?',
    ch: [
      {letter: 'A', text: '169'},
      {letter: 'B', text: '13'},
      {letter: 'C', text: '60'},
      {letter: 'D', text: '17'},
          ],
    ans: 'A',
    sol: '**The dot product of a vector with itself equals the square of its magnitude.**\n\n```\nu · u = (5)(5) + (12)(12)\n      = 25 + 144\n      = 169\n```\n\nAlternatively:\n```\n|u| = √(5² + 12²) = √169 = 13\nu · u = |u|² = 13² = 169\n```\n\n**Key insight:** **v** · **v** = |**v**|² always.'
  },
  {
    pos: 34,
    diff: 'hard',
    text: 'A particle moves from A(3, 7) to B(11, 13). What is the component form of its displacement vector?',
    ch: [
      {letter: 'A', text: '⟨8, 6⟩'},
      {letter: 'B', text: '⟨14, 20⟩'},
      {letter: 'C', text: '⟨-8, -6⟩'},
      {letter: 'D', text: '⟨11, 13⟩'},
          ],
    ans: 'A',
    sol: '**Subtract initial position from final position.**\n\n```\nAB = ⟨11 - 3, 13 - 7⟩\n   = ⟨8, 6⟩\n```\n\n**Key insight:** Displacement = final position - initial position.'
  },
  {
    pos: 35,
    diff: 'hard',
    text: 'If **v** = ⟨-2, 5⟩, what is -**v**?',
    ch: [
      {letter: 'A', text: '⟨2, -5⟩'},
      {letter: 'B', text: '⟨-2, 5⟩'},
      {letter: 'C', text: '⟨2, 5⟩'},
      {letter: 'D', text: '⟨-2, -5⟩'},
          ],
    ans: 'A',
    sol: '**Negate each component.**\n\n```\n-v = -⟨-2, 5⟩\n   = ⟨-(-2), -(5)⟩\n   = ⟨2, -5⟩\n```\n\n**Key insight:** The negative of a vector points in the opposite direction with the same magnitude.'
  },
  {
    pos: 36,
    diff: 'hard',
    text: 'What is the midpoint M of the vector from P(2, 8) to Q(10, 16)?',
    ch: [
      {letter: 'A', text: '(6, 12)'},
      {letter: 'B', text: '(4, 4)'},
      {letter: 'C', text: '(12, 24)'},
      {letter: 'D', text: '(8, 8)'},
          ],
    ans: 'A',
    sol: '**Average the coordinates.**\n\n```\nM = ((2 + 10)/2, (8 + 16)/2)\n  = (12/2, 24/2)\n  = (6, 12)\n```\n\n**Key insight:** The midpoint is found by averaging the x-coordinates and y-coordinates separately.'
  },
  {
    pos: 37,
    diff: 'hard',
    text: 'Vectors **u** = ⟨2, -1⟩ and **v** = ⟨k, 4⟩. For what value of k are they perpendicular?',
    ch: [
      {letter: 'A', text: '8'},
      {letter: 'B', text: '-8'},
      {letter: 'C', text: '2'},
      {letter: 'D', text: '-2'},
          ],
    ans: 'A',
    sol: '**Set dot product equal to zero.**\n\n```\nu · v = 0\n⟨2, -1⟩ · ⟨k, 4⟩ = 0\n(2)(k) + (-1)(4) = 0\n2k - 4 = 0\n2k = 4\nk = 2\n```\n\nWait, that gives k = 2, not 8. Let me recalculate.\n\nActually 2k - 4 = 0 gives 2k = 4, so k = 2.\n\nBut the answer says k = 8. Let me check if I set up the problem wrong. Maybe it should be ⟨k, -4⟩:\n2k + 4 = 0\nk = -2\n\nOr maybe ⟨4, k⟩:\n8 + (-1)k = 0\n-k = -8\nk = 8 ✓\n\nI\'ll fix the problem to use ⟨4, k⟩ instead.\n\n**Key insight:** Perpendicular vectors satisfy **u** · **v** = 0.'
  },
  {
    pos: 38,
    diff: 'hard',
    text: 'What is the x-component of the vector with magnitude 10 at angle 60° from the positive x-axis?',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '5√3'},
      {letter: 'C', text: '10'},
      {letter: 'D', text: '√3/2'},
          ],
    ans: 'A',
    sol: '**Use the cosine component.**\n\n```\nvₓ = |v| cos(θ)\n   = 10 cos(60°)\n   = 10 · (1/2)\n   = 5\n```\n\n**Key insight:** The x-component of a vector is |**v**| cos(θ), where θ is the angle from the positive x-axis.'
  },
  {
    pos: 39,
    diff: 'hard',
    text: 'If **a** = ⟨1, 3⟩ and **b** = ⟨-2, 5⟩, what is 2**a** + 3**b**?',
    ch: [
      {letter: 'A', text: '⟨-4, 21⟩'},
      {letter: 'B', text: '⟨-1, 8⟩'},
      {letter: 'C', text: '⟨0, 18⟩'},
      {letter: 'D', text: '⟨8, 21⟩'},
          ],
    ans: 'A',
    sol: '**Perform scalar multiplications, then add.**\n\n```\n2a + 3b = 2⟨1, 3⟩ + 3⟨-2, 5⟩\n        = ⟨2, 6⟩ + ⟨-6, 15⟩\n        = ⟨2 + (-6), 6 + 15⟩\n        = ⟨-4, 21⟩\n```\n\n**Key insight:** Distribute scalar multiplication over each component before adding vectors.'
  },
  {
    pos: 40,
    diff: 'hard',
    text: 'What vector when added to ⟨7, -3⟩ gives ⟨4, 2⟩?',
    ch: [
      {letter: 'A', text: '⟨-3, 5⟩'},
      {letter: 'B', text: '⟨11, -1⟩'},
      {letter: 'C', text: '⟨3, -5⟩'},
      {letter: 'D', text: '⟨-11, 1⟩'},
          ],
    ans: 'A',
    sol: '**Solve for the unknown vector.**\n\nLet **v** be the unknown vector:\n```\n⟨7, -3⟩ + v = ⟨4, 2⟩\nv = ⟨4, 2⟩ - ⟨7, -3⟩\nv = ⟨4 - 7, 2 - (-3)⟩\nv = ⟨-3, 5⟩\n```\n\nVerify: ⟨7, -3⟩ + ⟨-3, 5⟩ = ⟨4, 2⟩ ✓\n\n**Key insight:** To find **v** such that **a** + **v** = **b**, compute **v** = **b** - **a**.'
  },
  {
    pos: 41,
    diff: 'hard',
    text: 'A force **F** = ⟨12, 5⟩ newtons acts on an object. What is the magnitude of this force?',
    ch: [
      {letter: 'A', text: '13 N'},
      {letter: 'B', text: '17 N'},
      {letter: 'C', text: '7 N'},
      {letter: 'D', text: '√17 N'},
          ],
    ans: 'A',
    sol: '**Calculate the magnitude.**\n\n```\n|F| = √(12² + 5²)\n    = √(144 + 25)\n    = √169\n    = 13 N\n```\n\n**Key insight:** This is the 5-12-13 Pythagorean triple.'
  },
  {
    pos: 42,
    diff: 'hard',
    text: 'What is (1/2)⟨-6, 10⟩?',
    ch: [
      {letter: 'A', text: '⟨-3, 5⟩'},
      {letter: 'B', text: '⟨-12, 20⟩'},
      {letter: 'C', text: '⟨3, -5⟩'},
      {letter: 'D', text: '⟨-6, 10⟩'},
          ],
    ans: 'A',
    sol: '**Multiply each component by 1/2.**\n\n```\n(1/2)⟨-6, 10⟩ = ⟨(1/2)(-6), (1/2)(10)⟩\n               = ⟨-3, 5⟩\n```\n\n**Key insight:** Multiplying by 1/2 is the same as dividing by 2, which halves the magnitude.'
  },
  {
    pos: 43,
    diff: 'hard',
    text: 'Vector **v** has initial point (4, 1) and terminal point (4, 9). What is **v**?',
    ch: [
      {letter: 'A', text: '⟨0, 8⟩'},
      {letter: 'B', text: '⟨8, 0⟩'},
      {letter: 'C', text: '⟨4, 9⟩'},
      {letter: 'D', text: '⟨0, -8⟩'},
          ],
    ans: 'A',
    sol: '**Subtract initial from terminal.**\n\n```\nv = ⟨4 - 4, 9 - 1⟩\n  = ⟨0, 8⟩\n```\n\nThis is a vertical vector pointing upward along the y-axis.\n\n**Key insight:** Vectors with the same x-coordinate at both endpoints are vertical vectors.'
  },
  {
    pos: 44,
    diff: 'hard',
    text: 'If |**v**| = 15 and **v** = ⟨9, k⟩ where k > 0, what is k?',
    ch: [
      {letter: 'A', text: '12'},
      {letter: 'B', text: '6'},
      {letter: 'C', text: '√15'},
      {letter: 'D', text: '24'},
          ],
    ans: 'A',
    sol: '**Use the magnitude formula and solve for k.**\n\n```\n|v| = √(9² + k²) = 15\n9² + k² = 15²\n81 + k² = 225\nk² = 144\nk = ±12\n```\n\nSince k > 0, we have k = 12.\n\n**Key insight:** This is the 9-12-15 Pythagorean triple, a scaled version of 3-4-5.'
  },
  {
    pos: 45,
    diff: 'hard',
    text: 'What is the y-component of the vector with magnitude 20 at angle 30° from the positive x-axis?',
    ch: [
      {letter: 'A', text: '10'},
      {letter: 'B', text: '10√3'},
      {letter: 'C', text: '20'},
      {letter: 'D', text: '5'},
          ],
    ans: 'A',
    sol: '**Use the sine component.**\n\n```\nvᵧ = |v| sin(θ)\n   = 20 sin(30°)\n   = 20 · (1/2)\n   = 10\n```\n\n**Key insight:** The y-component of a vector is |**v**| sin(θ), where θ is the angle from the positive x-axis.'
  },
  {
    pos: 46,
    diff: 'hard',
    text: 'If **u** = ⟨a, b⟩ and -**u** = ⟨3, -7⟩, what is **u**?',
    ch: [
      {letter: 'A', text: '⟨-3, 7⟩'},
      {letter: 'B', text: '⟨3, -7⟩'},
      {letter: 'C', text: '⟨-3, -7⟩'},
      {letter: 'D', text: '⟨3, 7⟩'},
          ],
    ans: 'A',
    sol: '**Negate the negative vector.**\n\nIf -**u** = ⟨3, -7⟩, then:\n```\nu = -(-u)\n  = -⟨3, -7⟩\n  = ⟨-3, 7⟩\n```\n\n**Key insight:** The negative of the negative is the original: -(-**v**) = **v**.'
  },
  {
    pos: 47,
    diff: 'hard',
    text: 'For vectors **u** = ⟨1, 2⟩ and **v** = ⟨3, 6⟩, which statement is true?',
    ch: [
      {letter: 'A', text: 'v = 3u (parallel vectors)'},
      {letter: 'B', text: 'u · v = 0 (perpendicular)'},
      {letter: 'C', text: '|u| = |v|'},
      {letter: 'D', text: 'u = v'},
          ],
    ans: 'A',
    sol: '**Check if one is a scalar multiple of the other.**\n\n```\nv = ⟨3, 6⟩ = 3⟨1, 2⟩ = 3u\n```\n\nSince **v** = 3**u**, the vectors are parallel (same direction).\n\nCheck perpendicular:\n```\nu · v = (1)(3) + (2)(6) = 3 + 12 = 15 ≠ 0\n```\nNot perpendicular.\n\n**Key insight:** Parallel vectors are scalar multiples of each other.'
  },
  {
    pos: 48,
    diff: 'hard',
    text: 'What is the result of ⟨5, 12⟩ + ⟨-5, -12⟩?',
    ch: [
      {letter: 'A', text: '⟨0, 0⟩'},
      {letter: 'B', text: '⟨10, 24⟩'},
      {letter: 'C', text: '⟨0, 24⟩'},
      {letter: 'D', text: '⟨-10, -24⟩'},
          ],
    ans: 'A',
    sol: '**Add component-wise.**\n\n```\n⟨5, 12⟩ + ⟨-5, -12⟩ = ⟨5 + (-5), 12 + (-12)⟩\n                      = ⟨0, 0⟩\n```\n\nThis is the zero vector.\n\n**Key insight:** ⟨-5, -12⟩ is the additive inverse of ⟨5, 12⟩, so they sum to the zero vector.'
  },
  {
    pos: 49,
    diff: 'hard',
    text: 'The position vector of a particle at time t is **r**(t) = ⟨3t, 4t⟩. At what time does the particle reach position (12, 16)?',
    ch: [
      {letter: 'A', text: 't = 4'},
      {letter: 'B', text: 't = 3'},
      {letter: 'C', text: 't = 16'},
      {letter: 'D', text: 't = 12'},
          ],
    ans: 'A',
    sol: '**Set the position vector equal to the target position.**\n\n```\n⟨3t, 4t⟩ = ⟨12, 16⟩\n\nFrom x-component: 3t = 12 → t = 4\nFrom y-component: 4t = 16 → t = 4\n```\n\nBoth components give t = 4.\n\n**Key insight:** Parametric vector equations can be solved by setting each component equal and solving for the parameter.'
  },
  {
    pos: 50,
    diff: 'hard',
    text: 'Three vectors **a** = ⟨2, 0⟩, **b** = ⟨1, √3⟩, and **c** = ⟨-3, √3⟩ form a triangle when placed head-to-tail. What is **a** + **b** + **c**?',
    ch: [
      {letter: 'A', text: '⟨0, 2√3⟩'},
      {letter: 'B', text: '⟨0, 0⟩'},
      {letter: 'C', text: '⟨-3, √3⟩'},
      {letter: 'D', text: '⟨2, 2√3⟩'},
          ],
    ans: 'A',
    sol: '**Add all three vectors component-wise.**\n\n```\na + b + c = ⟨2, 0⟩ + ⟨1, √3⟩ + ⟨-3, √3⟩\n          = ⟨2 + 1 + (-3), 0 + √3 + √3⟩\n          = ⟨0, 2√3⟩\n```\n\n**Key insight:** When vectors form a closed triangle, they should sum to zero. Here they don\'t close perfectly, leaving a resultant of ⟨0, 2√3⟩.'
  }
];

// Fix question 17 - parallel vector with magnitude 5
questions[16] = {
  pos: 17,
  diff: 'hard',
  text: 'What vector is parallel to ⟨2, -3⟩ but has twice its magnitude?',
  ch: [
    {letter: 'A', text: '⟨4, -6⟩'},
    {letter: 'B', text: '⟨2, -3⟩'},
    {letter: 'C', text: '⟨1, -1.5⟩'},
    {letter: 'D', text: '⟨-2, 3⟩'},
      ],
  ans: 'A',
  sol: '**Parallel vectors are scalar multiples.**\n\nTo get twice the magnitude, multiply by 2:\n```\n2 · ⟨2, -3⟩ = ⟨4, -6⟩\n```\n\nVerify:\n```\n|⟨2, -3⟩| = √(4 + 9) = √13\n|⟨4, -6⟩| = √(16 + 36) = √52 = 2√13 ✓\n```\n\n**Key insight:** To get a parallel vector with k times the magnitude, multiply by scalar k.'
};

// Fix question 26 - solve for v correctly
questions[25] = {
  pos: 26,
  diff: 'hard',
  text: 'If 4**u** - 2**v** = ⟨14, 18⟩ and **u** = ⟨2, 3⟩, what is **v**?',
  ch: [
    {letter: 'A', text: '⟨-3, -3⟩'},
    {letter: 'B', text: '⟨3, 3⟩'},
    {letter: 'C', text: '⟨7, 3⟩'},
    {letter: 'D', text: '⟨-7, -9⟩'},
      ],
  ans: 'A',
  sol: '**Solve for v algebraically.**\n\n```\n4u - 2v = ⟨14, 18⟩\n4⟨2, 3⟩ - 2v = ⟨14, 18⟩\n⟨8, 12⟩ - 2v = ⟨14, 18⟩\n-2v = ⟨14, 18⟩ - ⟨8, 12⟩\n-2v = ⟨6, 6⟩\nv = ⟨6, 6⟩ / (-2)\nv = ⟨-3, -3⟩\n```\n\n**Key insight:** Isolate the unknown vector and divide by the scalar coefficient component-wise.'
};

// Fix question 28 - perpendicular vectors
questions[27] = {
  pos: 28,
  diff: 'hard',
  text: 'Vectors **u** = ⟨a, 4⟩ and **v** = ⟨4, 2⟩ are perpendicular. What is a?',
  ch: [
    {letter: 'A', text: '-2'},
    {letter: 'B', text: '2'},
    {letter: 'C', text: '8'},
    {letter: 'D', text: '-8'},
      ],
  ans: 'A',
  sol: '**Perpendicular vectors have dot product = 0.**\n\n```\nu · v = 0\n⟨a, 4⟩ · ⟨4, 2⟩ = 0\n(a)(4) + (4)(2) = 0\n4a + 8 = 0\n4a = -8\na = -2\n```\n\n**Key insight:** For perpendicular vectors, set their dot product equal to zero and solve.'
};

// Fix question 37 - perpendicular vectors
questions[36] = {
  pos: 37,
  diff: 'hard',
  text: 'Vectors **u** = ⟨2, -1⟩ and **v** = ⟨4, k⟩. For what value of k are they perpendicular?',
  ch: [
    {letter: 'A', text: '8'},
    {letter: 'B', text: '-8'},
    {letter: 'C', text: '2'},
    {letter: 'D', text: '-2'},
      ],
  ans: 'A',
  sol: '**Set dot product equal to zero.**\n\n```\nu · v = 0\n⟨2, -1⟩ · ⟨4, k⟩ = 0\n(2)(4) + (-1)(k) = 0\n8 - k = 0\nk = 8\n```\n\n**Key insight:** Perpendicular vectors satisfy **u** · **v** = 0.'
};

async function insertQuestions() {
  console.log('Finding lesson...');

  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'vectors')
    .single();

  if (lessonError) {
    console.error('Error finding lesson vectors:', lessonError);
    return;
  }

  console.log(`Found lesson vectors with ID: ${lesson.id}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const questionData = {
      lesson_id: lesson.id,
      subject: 'math',
      position: q.pos,
      difficulty: q.diff,
      title: `Vectors Question ${q.pos}`,
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
