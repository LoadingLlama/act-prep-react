const{createClient}=require('@supabase/supabase-js');
const db=createClient('https://rabavobdklnwvwsldbix.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');
const L='f7516c41-afb2-48fb-a4e2-df9fe41d8b23';

const q=[
// EASY 1-17: ACT-realistic fundamental quadratics
{pos:1,diff:'easy',text:'Factor completely: x² - 9',ch:[{letter:'A',text:'(x-3)(x+3)'},{letter:'B',text:'(x-9)(x+1)'},{letter:'C',text:'x(x-9)'},{letter:'D',text:'Cannot be factored'}],ans:'A',sol:'**Recognize difference of squares: a² - b².**\n```\nx² - 9 = x² - 3²\n= (x-3)(x+3)\n```'},

{pos:2,diff:'easy',text:'Solve: x² - 5x + 6 = 0',ch:[{letter:'A',text:'x = 2 or x = 3'},{letter:'B',text:'x = -2 or x = -3'},{letter:'C',text:'x = 1 or x = 6'},{letter:'D',text:'x = -1 or x = -6'}],ans:'A',sol:'**Factor the quadratic.**\n```\nx² - 5x + 6 = (x-2)(x-3)\n```\n\n**Set each factor to zero.**\n```\nx = 2 or x = 3\n```'},

{pos:3,diff:'easy',text:'What are the solutions to x² + 6x + 9 = 0?',ch:[{letter:'A',text:'x = -3 (double root)'},{letter:'B',text:'x = 3'},{letter:'C',text:'x = -3 or x = 3'},{letter:'D',text:'x = -9 or x = -1'}],ans:'A',sol:'**Recognize perfect square trinomial.**\n```\nx² + 6x + 9 = (x+3)²\n```\n\n**Solve.**\n```\n(x+3)² = 0\nx = -3\n```'},

{pos:4,diff:'easy',text:'Solve: x² = 16',ch:[{letter:'A',text:'x = ±4'},{letter:'B',text:'x = 4'},{letter:'C',text:'x = 256'},{letter:'D',text:'x = 8'}],ans:'A',sol:'**Take the square root of both sides.**\n```\nx = ±√16\nx = ±4\n```'},

{pos:5,diff:'easy',text:'Factor: 2x² + 7x + 3',ch:[{letter:'A',text:'(2x+1)(x+3)'},{letter:'B',text:'(2x+3)(x+1)'},{letter:'C',text:'(x+1)(x+3)'},{letter:'D',text:'2(x+1)(x+3)'}],ans:'A',sol:'**Find factors of 2×3=6 that add to 7.**\n```\n6 and 1\n2x² + 6x + x + 3\n= 2x(x+3) + 1(x+3)\n= (2x+1)(x+3)\n```'},

{pos:6,diff:'easy',text:'Solve using the quadratic formula: x² + 2x - 8 = 0',ch:[{letter:'A',text:'x = 2 or x = -4'},{letter:'B',text:'x = -2 or x = 4'},{letter:'C',text:'x = ±2'},{letter:'D',text:'x = 8 or x = -1'}],ans:'A',sol:'**Apply quadratic formula with a=1, b=2, c=-8.**\n```\nx = [-2 ± √(4 - 4(1)(-8))]/2\n= [-2 ± √36]/2\n= [-2 ± 6]/2\n```\n\n**Simplify.**\n```\nx = 4/2 = 2  or  x = -8/2 = -4\n```'},

{pos:7,diff:'easy',text:'Which represents x² - 10x + 25 in factored form?',ch:[{letter:'A',text:'(x-5)²'},{letter:'B',text:'(x+5)²'},{letter:'C',text:'(x-5)(x+5)'},{letter:'D',text:'x(x-10)+25'}],ans:'A',sol:'**Recognize perfect square trinomial.**\n```\nx² - 10x + 25 = (x-5)²\n```'},

{pos:8,diff:'easy',text:'Solve: 3x² - 12 = 0',ch:[{letter:'A',text:'x = ±2'},{letter:'B',text:'x = 2'},{letter:'C',text:'x = ±4'},{letter:'D',text:'x = 4'}],ans:'A',sol:'**Add 12 to both sides.**\n```\n3x² = 12\n```\n\n**Divide by 3.**\n```\nx² = 4\nx = ±2\n```'},

{pos:9,diff:'easy',text:'Factor: x² + 8x + 15',ch:[{letter:'A',text:'(x+3)(x+5)'},{letter:'B',text:'(x+15)(x+1)'},{letter:'C',text:'(x-3)(x-5)'},{letter:'D',text:'Cannot factor'}],ans:'A',sol:'**Find two numbers that multiply to 15 and add to 8.**\n```\n3 and 5\nx² + 8x + 15 = (x+3)(x+5)\n```'},

{pos:10,diff:'easy',text:'Solve: x² - 7x = 0',ch:[{letter:'A',text:'x = 0 or x = 7'},{letter:'B',text:'x = 7'},{letter:'C',text:'x = -7'},{letter:'D',text:'x = 0'}],ans:'A',sol:'**Factor out x.**\n```\nx(x - 7) = 0\n```\n\n**Set each factor to zero.**\n```\nx = 0  or  x = 7\n```'},

{pos:11,diff:'easy',text:'What are the solutions to (x-4)² = 25?',ch:[{letter:'A',text:'x = 9 or x = -1'},{letter:'B',text:'x = 9'},{letter:'C',text:'x = 29 or x = 21'},{letter:'D',text:'x = 4'}],ans:'A',sol:'**Take the square root of both sides.**\n```\nx - 4 = ±5\n```\n\n**Solve for x.**\n```\nx = 4 + 5 = 9  or  x = 4 - 5 = -1\n```'},

{pos:12,diff:'easy',text:'Factor: x² - 4x - 12',ch:[{letter:'A',text:'(x-6)(x+2)'},{letter:'B',text:'(x+6)(x-2)'},{letter:'C',text:'(x-4)(x-3)'},{letter:'D',text:'(x-12)(x+1)'}],ans:'A',sol:'**Find two numbers that multiply to -12 and add to -4.**\n```\n-6 and 2\nx² - 4x - 12 = (x-6)(x+2)\n```'},

{pos:13,diff:'easy',text:'Solve: x² + 4x + 4 = 9',ch:[{letter:'A',text:'x = 1 or x = -5'},{letter:'B',text:'x = ±3'},{letter:'C',text:'x = 5 or x = -1'},{letter:'D',text:'x = 3'}],ans:'A',sol:'**Recognize left side as perfect square.**\n```\n(x+2)² = 9\n```\n\n**Take square root.**\n```\nx + 2 = ±3\nx = -2 + 3 = 1  or  x = -2 - 3 = -5\n```'},

{pos:14,diff:'easy',text:'Factor completely: 4x² - 16',ch:[{letter:'A',text:'4(x-2)(x+2)'},{letter:'B',text:'(4x-16)(x+1)'},{letter:'C',text:'4(x²-4)'},{letter:'D',text:'(2x-4)(2x+4)'}],ans:'A',sol:'**Factor out GCF first.**\n```\n4(x² - 4)\n```\n\n**Factor difference of squares.**\n```\n= 4(x-2)(x+2)\n```'},

{pos:15,diff:'easy',text:'Solve: 2x² = 8x',ch:[{letter:'A',text:'x = 0 or x = 4'},{letter:'B',text:'x = 4'},{letter:'C',text:'x = 0 or x = -4'},{letter:'D',text:'x = ±4'}],ans:'A',sol:'**Move all terms to one side.**\n```\n2x² - 8x = 0\n```\n\n**Factor out 2x.**\n```\n2x(x - 4) = 0\nx = 0  or  x = 4\n```'},

{pos:16,diff:'easy',text:'Which is the factored form of x² - 11x + 24?',ch:[{letter:'A',text:'(x-3)(x-8)'},{letter:'B',text:'(x+3)(x+8)'},{letter:'C',text:'(x-4)(x-6)'},{letter:'D',text:'(x-24)(x-1)'}],ans:'A',sol:'**Find two numbers that multiply to 24 and add to -11.**\n```\n-3 and -8\nx² - 11x + 24 = (x-3)(x-8)\n```'},

{pos:17,diff:'easy',text:'Solve: x² + 10x + 25 = 0',ch:[{letter:'A',text:'x = -5'},{letter:'B',text:'x = 5'},{letter:'C',text:'x = -5 or x = 5'},{letter:'D',text:'x = -10 or x = -15'}],ans:'A',sol:'**Factor perfect square.**\n```\n(x+5)² = 0\nx = -5\n```'},

// MEDIUM 18-34: Multi-step, applications, vertex form
{pos:18,diff:'medium',text:'Complete the square: x² + 6x - 7 = 0. What is the solution?',ch:[{letter:'A',text:'x = -7 or x = 1'},{letter:'B',text:'x = 7 or x = -1'},{letter:'C',text:'x = -3 ± 4'},{letter:'D',text:'x = 3 ± 4'}],ans:'A',sol:'**Move constant to right side.**\n```\nx² + 6x = 7\n```\n\n**Complete the square: add (6/2)² = 9 to both sides.**\n```\nx² + 6x + 9 = 16\n(x+3)² = 16\n```\n\n**Solve.**\n```\nx + 3 = ±4\nx = -3 + 4 = 1  or  x = -3 - 4 = -7\n```'},

{pos:19,diff:'medium',text:'The product of two consecutive integers is 132. What are the integers?',ch:[{letter:'A',text:'11 and 12'},{letter:'B',text:'10 and 13'},{letter:'C',text:'12 and 13'},{letter:'D',text:'-11 and -12'}],ans:'A',sol:'**Set up equation with n and n+1.**\n```\nn(n+1) = 132\nn² + n - 132 = 0\n```\n\n**Factor.**\n```\n(n-11)(n+12) = 0\nn = 11  or  n = -12\n```\n\n**Positive answer: 11 and 12.**'},

{pos:20,diff:'medium',text:'A parabola has equation y = x² - 4x + 3. What is its vertex?',ch:[{letter:'A',text:'(2, -1)'},{letter:'B',text:'(4, 3)'},{letter:'C',text:'(-2, 15)'},{letter:'D',text:'(2, 3)'}],ans:'A',sol:'**Find x-coordinate of vertex: h = -b/(2a).**\n```\nh = -(-4)/(2·1) = 4/2 = 2\n```\n\n**Find y-coordinate: substitute x=2.**\n```\nk = (2)² - 4(2) + 3 = 4 - 8 + 3 = -1\n```\n\n**Vertex: (2, -1)**'},

{pos:21,diff:'medium',text:'Using the quadratic formula, solve: 2x² + 3x - 5 = 0',ch:[{letter:'A',text:'x = 1 or x = -5/2'},{letter:'B',text:'x = -1 or x = 5/2'},{letter:'C',text:'x = 5 or x = -2'},{letter:'D',text:'No real solutions'}],ans:'A',sol:'**Apply quadratic formula with a=2, b=3, c=-5.**\n```\nx = [-3 ± √(9 - 4(2)(-5))]/(2·2)\n= [-3 ± √(9 + 40)]/4\n= [-3 ± √49]/4\n= [-3 ± 7]/4\n```\n\n**Simplify.**\n```\nx = 4/4 = 1  or  x = -10/4 = -5/2\n```'},

{pos:22,diff:'medium',text:'The area of a rectangle is 48 square inches. Its length is 2 inches more than its width. Find the width.',ch:[{letter:'A',text:'6 inches'},{letter:'B',text:'8 inches'},{letter:'C',text:'4 inches'},{letter:'D',text:'12 inches'}],ans:'A',sol:'**Set up equation with width = w, length = w+2.**\n```\nw(w+2) = 48\nw² + 2w - 48 = 0\n```\n\n**Factor.**\n```\n(w+8)(w-6) = 0\nw = 6  or  w = -8\n```\n\n**Width must be positive: 6 inches.**'},

{pos:23,diff:'medium',text:'What is the discriminant of x² - 6x + 9 = 0, and what does it tell you?',ch:[{letter:'A',text:'0; one real solution'},{letter:'B',text:'36; two real solutions'},{letter:'C',text:'-36; no real solutions'},{letter:'D',text:'9; two real solutions'}],ans:'A',sol:'**Calculate discriminant: b² - 4ac.**\n```\nΔ = (-6)² - 4(1)(9)\n= 36 - 36\n= 0\n```\n\n**Discriminant of 0 means one real solution (double root).**'},

{pos:24,diff:'medium',text:'Convert to vertex form: y = x² + 8x + 10',ch:[{letter:'A',text:'y = (x+4)² - 6'},{letter:'B',text:'y = (x+4)² + 6'},{letter:'C',text:'y = (x-4)² - 6'},{letter:'D',text:'y = (x+8)² + 10'}],ans:'A',sol:'**Complete the square.**\n```\ny = (x² + 8x) + 10\n```\n\n**Add and subtract (8/2)² = 16.**\n```\n= (x² + 8x + 16 - 16) + 10\n= (x+4)² - 6\n```'},

{pos:25,diff:'medium',text:'Factor: 3x² - 27',ch:[{letter:'A',text:'3(x-3)(x+3)'},{letter:'B',text:'(3x-27)(x+1)'},{letter:'C',text:'3(x²-9)'},{letter:'D',text:'(x-9)(3x+3)'}],ans:'A',sol:'**Factor out GCF.**\n```\n3(x² - 9)\n```\n\n**Factor difference of squares.**\n```\n= 3(x-3)(x+3)\n```'},

{pos:26,diff:'medium',text:'Solve: x² - 2x - 15 = 0',ch:[{letter:'A',text:'x = 5 or x = -3'},{letter:'B',text:'x = -5 or x = 3'},{letter:'C',text:'x = 15 or x = -1'},{letter:'D',text:'x = ±5'}],ans:'A',sol:'**Factor.**\n```\n(x-5)(x+3) = 0\n```\n\n**Solve.**\n```\nx = 5  or  x = -3\n```'},

{pos:27,diff:'medium',text:'A ball is thrown upward with initial velocity of 64 ft/s. Height is h(t) = -16t² + 64t. When does it hit the ground?',ch:[{letter:'A',text:'t = 4 seconds'},{letter:'B',text:'t = 2 seconds'},{letter:'C',text:'t = 64 seconds'},{letter:'D',text:'t = 8 seconds'}],ans:'A',sol:'**Set height to 0.**\n```\n-16t² + 64t = 0\n```\n\n**Factor.**\n```\n-16t(t - 4) = 0\nt = 0  or  t = 4\n```\n\n**t=0 is launch time, t=4 is when it lands.**'},

{pos:28,diff:'medium',text:'What are the zeros of f(x) = 2x² + 5x - 3?',ch:[{letter:'A',text:'x = 1/2 or x = -3'},{letter:'B',text:'x = -1/2 or x = 3'},{letter:'C',text:'x = 3 or x = -2'},{letter:'D',text:'x = 2 or x = -3'}],ans:'A',sol:'**Factor (or use quadratic formula).**\n```\n2x² + 5x - 3 = (2x-1)(x+3)\n```\n\n**Set to zero.**\n```\n2x - 1 = 0  →  x = 1/2\nx + 3 = 0  →  x = -3\n```'},

{pos:29,diff:'medium',text:'Solve by completing the square: x² - 10x + 16 = 0',ch:[{letter:'A',text:'x = 8 or x = 2'},{letter:'B',text:'x = -8 or x = -2'},{letter:'C',text:'x = 10 or x = 6'},{letter:'D',text:'x = 5 ± 3'}],ans:'A',sol:'**Move constant.**\n```\nx² - 10x = -16\n```\n\n**Add (10/2)² = 25.**\n```\nx² - 10x + 25 = 9\n(x-5)² = 9\n```\n\n**Solve.**\n```\nx - 5 = ±3\nx = 8  or  x = 2\n```'},

{pos:30,diff:'medium',text:'The sum of a number and its square is 56. Find the positive number.',ch:[{letter:'A',text:'7'},{letter:'B',text:'8'},{letter:'C',text:'14'},{letter:'D',text:'28'}],ans:'A',sol:'**Set up equation.**\n```\nx + x² = 56\nx² + x - 56 = 0\n```\n\n**Factor.**\n```\n(x+8)(x-7) = 0\nx = 7  or  x = -8\n```\n\n**Positive number: 7**'},

{pos:31,diff:'medium',text:'What is the axis of symmetry for y = 2x² - 12x + 5?',ch:[{letter:'A',text:'x = 3'},{letter:'B',text:'x = -3'},{letter:'C',text:'x = 6'},{letter:'D',text:'x = 12'}],ans:'A',sol:'**Use formula: x = -b/(2a).**\n```\nx = -(-12)/(2·2) = 12/4 = 3\n```'},

{pos:32,diff:'medium',text:'Factor: x² - 14x + 49',ch:[{letter:'A',text:'(x-7)²'},{letter:'B',text:'(x+7)²'},{letter:'C',text:'(x-7)(x+7)'},{letter:'D',text:'(x-14)(x-35)'}],ans:'A',sol:'**Recognize perfect square trinomial.**\n```\nx² - 14x + 49 = (x-7)²\n```'},

{pos:33,diff:'medium',text:'Solve: 4x² + 12x + 9 = 0',ch:[{letter:'A',text:'x = -3/2'},{letter:'B',text:'x = 3/2'},{letter:'C',text:'x = ±3/2'},{letter:'D',text:'x = -4 or x = -9'}],ans:'A',sol:'**Recognize perfect square.**\n```\n(2x+3)² = 0\n```\n\n**Solve.**\n```\n2x + 3 = 0\nx = -3/2\n```'},

{pos:34,diff:'medium',text:'The discriminant of ax² + bx + c = 0 is -16. How many real solutions exist?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'2'},{letter:'D',text:'Cannot determine'}],ans:'A',sol:'**Negative discriminant means no real solutions.**\n```\nΔ < 0  →  0 real solutions\n```\n\n**The solutions are complex numbers.**'},

// HARD 35-50: Complex applications, systems, optimization
{pos:35,diff:'hard',text:'A garden has dimensions that satisfy: length × width = 180, and length = width + 3. Find the dimensions.',ch:[{letter:'A',text:'15 by 12'},{letter:'B',text:'12 by 15'},{letter:'C',text:'20 by 9'},{letter:'D',text:'18 by 10'}],ans:'A',sol:'**Set up with w for width.**\n```\nw(w+3) = 180\nw² + 3w - 180 = 0\n```\n\n**Factor (or quadratic formula).**\n```\n(w+15)(w-12) = 0\nw = 12  (positive)\n```\n\n**Length = 12 + 3 = 15. Dimensions: 15 by 12**'},

{pos:36,diff:'hard',text:'For what values of k does x² + kx + 16 = 0 have exactly one real solution?',ch:[{letter:'A',text:'k = ±8'},{letter:'B',text:'k = 8'},{letter:'C',text:'k = 16'},{letter:'D',text:'k = ±4'}],ans:'A',sol:'**One solution when discriminant = 0.**\n```\nk² - 4(1)(16) = 0\nk² - 64 = 0\nk² = 64\nk = ±8\n```'},

{pos:37,diff:'hard',text:'Solve the system: y = x² - 4, y = 2x - 1',ch:[{letter:'A',text:'(3, 5) and (-1, -3)'},{letter:'B',text:'(3, 5)'},{letter:'C',text:'(-1, -3)'},{letter:'D',text:'No solution'}],ans:'A',sol:'**Substitute y from second into first.**\n```\n2x - 1 = x² - 4\n0 = x² - 2x - 3\n0 = (x-3)(x+1)\n```\n\n**Solve for x.**\n```\nx = 3  or  x = -1\n```\n\n**Find y values.**\n```\nWhen x=3: y = 2(3)-1 = 5\nWhen x=-1: y = 2(-1)-1 = -3\n```\n\n**Solutions: (3, 5) and (-1, -3)**'},

{pos:38,diff:'hard',text:'A projectile height is h(t) = -16t² + 80t + 6. What is its maximum height?',ch:[{letter:'A',text:'106 feet'},{letter:'B',text:'100 feet'},{letter:'C',text:'86 feet'},{letter:'D',text:'80 feet'}],ans:'A',sol:'**Maximum at vertex. Find t-coordinate.**\n```\nt = -b/(2a) = -80/(2·(-16)) = 80/32 = 2.5\n```\n\n**Substitute t=2.5 into h(t).**\n```\nh(2.5) = -16(2.5)² + 80(2.5) + 6\n= -16(6.25) + 200 + 6\n= -100 + 200 + 6\n= 106 feet\n```'},

{pos:39,diff:'hard',text:'Factor completely: 6x² - 11x - 10',ch:[{letter:'A',text:'(3x+2)(2x-5)'},{letter:'B',text:'(6x-5)(x+2)'},{letter:'C',text:'(3x-2)(2x+5)'},{letter:'D',text:'(6x+2)(x-5)'}],ans:'A',sol:'**Use AC method: multiply 6(-10) = -60.**\n\n**Find factors of -60 that add to -11: -15 and 4.**\n```\n6x² - 15x + 4x - 10\n= 3x(2x-5) + 2(2x-5)\n= (3x+2)(2x-5)\n```'},

{pos:40,diff:'hard',text:'If f(x) = x² - 6x + k has a minimum value of -4, what is k?',ch:[{letter:'A',text:'k = 5'},{letter:'B',text:'k = -4'},{letter:'C',text:'k = 9'},{letter:'D',text:'k = 1'}],ans:'A',sol:'**Vertex form: minimum occurs at x = -b/(2a).**\n```\nx = 6/2 = 3\n```\n\n**Minimum value is -4.**\n```\nf(3) = 9 - 18 + k = -4\n-9 + k = -4\nk = 5\n```'},

{pos:41,diff:'hard',text:'Solve: x⁴ - 13x² + 36 = 0',ch:[{letter:'A',text:'x = ±2, ±3'},{letter:'B',text:'x = ±6'},{letter:'C',text:'x = 2, 3'},{letter:'D',text:'x = ±√13'}],ans:'A',sol:'**Let u = x². Equation becomes:**\n```\nu² - 13u + 36 = 0\n(u-9)(u-4) = 0\nu = 9  or  u = 4\n```\n\n**Substitute back.**\n```\nx² = 9  →  x = ±3\nx² = 4  →  x = ±2\n```\n\n**Solutions: x = ±2, ±3**'},

{pos:42,diff:'hard',text:'A rectangle has perimeter 40 cm. Find its maximum possible area.',ch:[{letter:'A',text:'100 cm²'},{letter:'B',text:'80 cm²'},{letter:'C',text:'120 cm²'},{letter:'D',text:'400 cm²'}],ans:'A',sol:'**Perimeter: 2l + 2w = 40, so l + w = 20.**\n\n**Express area in terms of w.**\n```\nA = w(20-w) = 20w - w²\n= -(w² - 20w)\n= -(w-10)² + 100\n```\n\n**Maximum at w=10 (vertex), giving A=100 cm².**'},

{pos:43,diff:'hard',text:'For which values of c does 2x² + 5x + c = 0 have two distinct real solutions?',ch:[{letter:'A',text:'c < 25/8'},{letter:'B',text:'c > 25/8'},{letter:'C',text:'c = 25/8'},{letter:'D',text:'all c'}],ans:'A',sol:'**Two distinct real solutions when discriminant > 0.**\n```\nb² - 4ac > 0\n25 - 4(2)(c) > 0\n25 - 8c > 0\n25 > 8c\nc < 25/8\n```'},

{pos:44,diff:'hard',text:'Solve: |x² - 5x| = 6',ch:[{letter:'A',text:'x = 6, -1, 2, 3'},{letter:'B',text:'x = 6, -1'},{letter:'C',text:'x = ±6'},{letter:'D',text:'x = 3'}],ans:'A',sol:'**Set up two cases.**\n\n**Case 1: x² - 5x = 6**\n```\nx² - 5x - 6 = 0\n(x-6)(x+1) = 0\nx = 6 or x = -1\n```\n\n**Case 2: x² - 5x = -6**\n```\nx² - 5x + 6 = 0\n(x-2)(x-3) = 0\nx = 2 or x = 3\n```\n\n**All solutions: x = 6, -1, 2, 3**'},

{pos:45,diff:'hard',text:'The profit from selling x items is P(x) = -2x² + 80x - 200. How many items maximize profit?',ch:[{letter:'A',text:'20 items'},{letter:'B',text:'40 items'},{letter:'C',text:'10 items'},{letter:'D',text:'80 items'}],ans:'A',sol:'**Maximum at vertex: x = -b/(2a).**\n```\nx = -80/(2·(-2)) = -80/(-4) = 20\n```\n\n**20 items maximize profit.**'},

{pos:46,diff:'hard',text:'If the roots of x² + px + 12 = 0 are in the ratio 1:3, find p.',ch:[{letter:'A',text:'p = ±8'},{letter:'B',text:'p = 8'},{letter:'C',text:'p = -8'},{letter:'D',text:'p = 4'}],ans:'A',sol:'**Let roots be r and 3r.**\n\n**Product of roots = 12.**\n```\nr · 3r = 12\n3r² = 12\nr² = 4\nr = ±2\n```\n\n**Sum of roots = -p.**\n```\nIf r=2: 2 + 6 = 8, so p = -8\nIf r=-2: -2 + (-6) = -8, so p = 8\n```\n\n**Answer: p = ±8**'},

{pos:47,diff:'hard',text:'Solve the system: x + y = 5, xy = 6',ch:[{letter:'A',text:'(2,3) and (3,2)'},{letter:'B',text:'(2,3)'},{letter:'C',text:'(6,1) and (1,6)'},{letter:'D',text:'(5,0) and (0,5)'}],ans:'A',sol:'**From first equation: y = 5-x.**\n\n**Substitute into second.**\n```\nx(5-x) = 6\n5x - x² = 6\nx² - 5x + 6 = 0\n(x-2)(x-3) = 0\n```\n\n**Solutions: x=2, y=3 or x=3, y=2**'},

{pos:48,diff:'hard',text:'Complete the square and solve: 3x² + 12x - 9 = 0',ch:[{letter:'A',text:'x = -2 ± √7'},{letter:'B',text:'x = 2 ± √7'},{letter:'C',text:'x = -2 ± 3'},{letter:'D',text:'x = ±3'}],ans:'A',sol:'**Divide by 3.**\n```\nx² + 4x - 3 = 0\nx² + 4x = 3\n```\n\n**Add (4/2)² = 4.**\n```\nx² + 4x + 4 = 7\n(x+2)² = 7\n```\n\n**Solve.**\n```\nx + 2 = ±√7\nx = -2 ± √7\n```'},

{pos:49,diff:'hard',text:'A parabola passes through (0,3), (2,3), and has vertex at (1,2). What is its equation?',ch:[{letter:'A',text:'y = x² - 2x + 3'},{letter:'B',text:'y = -x² + 2x + 3'},{letter:'C',text:'y = x² + 2x + 3'},{letter:'D',text:'y = 2x² - 4x + 6'}],ans:'A',sol:'**Use vertex form: y = a(x-h)² + k with (h,k) = (1,2).**\n```\ny = a(x-1)² + 2\n```\n\n**Use point (0,3) to find a.**\n```\n3 = a(0-1)² + 2\n3 = a + 2\na = 1\n```\n\n**Expand: y = (x-1)² + 2 = x² - 2x + 3**'},

{pos:50,diff:'hard',text:'How many real solutions does x⁴ - 5x² + 6 = 0 have?',ch:[{letter:'A',text:'4'},{letter:'B',text:'2'},{letter:'C',text:'0'},{letter:'D',text:'1'}],ans:'A',sol:'**Let u = x².**\n```\nu² - 5u + 6 = 0\n(u-2)(u-3) = 0\nu = 2  or  u = 3\n```\n\n**Both positive, so each gives 2 real x values.**\n```\nx² = 2  →  x = ±√2\nx² = 3  →  x = ±√3\n```\n\n**Total: 4 real solutions**'}
];

async function insert(){
console.log('\n=== DELETING OLD QUADRATICS QUESTIONS ===\n');
await db.from('practice_questions').delete().eq('lesson_id',L);
console.log('✅ Deleted\n\n=== INSERTING 50 QUADRATICS QUESTIONS ===\n');

let s=0,e=0;
for(const i of q){
const{error}=await db.from('practice_questions').insert([{
lesson_id:L,subject:'math',position:i.pos,difficulty:i.diff,
title:`Quadratics Practice ${i.pos}`,problem_text:i.text,
choices:JSON.stringify(i.ch),correct_answer:i.ans,
answer_explanation:i.sol,solution_steps:[],diagram_svg:null
}]);
if(error){console.error(`❌ Q${i.pos}:`,error.message);e++;}
else{console.log(`✅ Q${i.pos} (${i.diff})`);s++;}
}
console.log(`\n=== COMPLETE: ${s}/50 success, ${e}/50 errors ===\n`);
}
insert().catch(console.error);
