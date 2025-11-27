require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const questions = [
  {pos:1,diff:'hard',text:'What is the result of adding these two matrices?\n[1  2]\n[3  4]\n\n+\n\n[5  6]\n[7  8]',ch:[{letter:'A',text:'[6  8]\n[10 12]'},{letter:'B',text:'[5  12]\n[21 32]'},{letter:'C',text:'[6  8]\n[21 32]'},{letter:'D',text:'[1  2]\n[3  4]'}],ans:'A',sol:'**Add corresponding elements.**\n\n```\n[1  2]   [5  6]   [1+5  2+6]   [6   8]\n[3  4] + [7  8] = [3+7  4+8] = [10 12]\n```\n**Key insight:** To add matrices, add corresponding elements in the same position.'},

  {pos:2,diff:'hard',text:'What is 3 times this matrix?\n[2  1]\n[4  3]',ch:[{letter:'A',text:'[6  3]\n[12 9]'},{letter:'B',text:'[5  4]\n[7  6]'},{letter:'C',text:'[6  1]\n[4  9]'},{letter:'D',text:'[2  3]\n[4  9]'}],ans:'A',sol:'**Multiply each element by the scalar.**\n\n```\n    [2  1]   [3×2  3×1]   [6  3]\n3 × [4  3] = [3×4  3×3] = [12 9]\n```\n**Key insight:** Scalar multiplication means multiplying every element in the matrix by that number.'},

  {pos:3,diff:'hard',text:'Multiply these matrices:\n[1  2] × [5]\n          [6]',ch:[{letter:'A',text:'[17]'},{letter:'B',text:'[5  12]'},{letter:'C',text:'[11]'},{letter:'D',text:'[30]'}],ans:'A',sol:'**Use row × column multiplication.**\n\n```\n[1  2] × [5]  = [1×5 + 2×6]\n         [6]    = [5 + 12]\n                = [17]\n```\n**Key insight:** For a 1×2 matrix times a 2×1 matrix, multiply across and add: (1×5) + (2×6) = 17.'},

  {pos:4,diff:'hard',text:'What is the determinant of this 2×2 matrix?\n[3  1]\n[2  4]',ch:[{letter:'A',text:'10'},{letter:'B',text:'12'},{letter:'C',text:'14'},{letter:'D',text:'8'}],ans:'A',sol:'**Use the formula: det = ad - bc.**\n\n```\nFor matrix [a  b]\n           [c  d]\n\ndet = ad - bc\n\ndet = (3)(4) - (1)(2)\n    = 12 - 2\n    = 10\n```\n**Key insight:** For a 2×2 matrix, determinant = (top-left × bottom-right) - (top-right × bottom-left).'},

  {pos:5,diff:'hard',text:'Subtract the second matrix from the first:\n[5  7]   [2  3]\n[9  6] - [4  1]',ch:[{letter:'A',text:'[3  4]\n[5  5]'},{letter:'B',text:'[7  10]\n[13 7]'},{letter:'C',text:'[3  4]\n[13 5]'},{letter:'D',text:'[10 21]\n[36 6]'}],ans:'A',sol:'**Subtract corresponding elements.**\n\n```\n[5  7]   [2  3]   [5-2  7-3]   [3  4]\n[9  6] - [4  1] = [9-4  6-1] = [5  5]\n```\n**Key insight:** Subtract each element in the second matrix from the corresponding element in the first.'},

  {pos:6,diff:'hard',text:'What is the transpose of this matrix?\n[1  2  3]\n[4  5  6]',ch:[{letter:'A',text:'[1  4]\n[2  5]\n[3  6]'},{letter:'B',text:'[1  2  3]\n[4  5  6]'},{letter:'C',text:'[6  5  4]\n[3  2  1]'},{letter:'D',text:'[3  2  1]\n[6  5  4]'}],ans:'A',sol:'**Swap rows and columns.**\n\n```\nOriginal:     Transpose:\n[1  2  3]     [1  4]\n[4  5  6]     [2  5]\n              [3  6]\n\nRows become columns, columns become rows.\n```\n**Key insight:** The transpose flips the matrix along its diagonal - row 1 becomes column 1, row 2 becomes column 2.'},

  {pos:7,diff:'hard',text:'What is the identity matrix I₂ (2×2 identity)?',ch:[{letter:'A',text:'[1  0]\n[0  1]'},{letter:'B',text:'[0  1]\n[1  0]'},{letter:'C',text:'[1  1]\n[1  1]'},{letter:'D',text:'[0  0]\n[0  0]'}],ans:'A',sol:'**The identity matrix has 1s on the diagonal, 0s elsewhere.**\n\n```\nI₂ = [1  0]\n     [0  1]\n```\n**Key insight:** The identity matrix is like the number 1 for matrices - any matrix multiplied by I equals itself.'},

  {pos:8,diff:'hard',text:'Multiply:\n[2  0] × [1  0]\n[0  3]   [0  1]',ch:[{letter:'A',text:'[2  0]\n[0  3]'},{letter:'B',text:'[2  0]\n[0  1]'},{letter:'C',text:'[1  0]\n[0  3]'},{letter:'D',text:'[3  0]\n[0  4]'}],ans:'A',sol:'**Multiply by the identity matrix.**\n\n```\n[2  0]   [1  0]   [2×1+0×0  2×0+0×1]   [2  0]\n[0  3] × [0  1] = [0×1+3×0  0×0+3×1] = [0  3]\n```\n**Key insight:** Any matrix times the identity matrix equals itself (A × I = A).'},

  {pos:9,diff:'hard',text:'What are the dimensions of this matrix?\n[1  2  3  4]\n[5  6  7  8]\n[9 10 11 12]',ch:[{letter:'A',text:'3×4'},{letter:'B',text:'4×3'},{letter:'C',text:'12×1'},{letter:'D',text:'3×3'}],ans:'A',sol:'**Count rows × columns.**\n\n```\n3 rows\n4 columns\n\nDimensions: 3×4\n```\n**Key insight:** Matrix dimensions are written as (rows × columns). This is a 3×4 matrix.'},

  {pos:10,diff:'hard',text:'What is the zero matrix O₂ (2×2 zero matrix)?',ch:[{letter:'A',text:'[0  0]\n[0  0]'},{letter:'B',text:'[1  0]\n[0  1]'},{letter:'C',text:'[0  1]\n[1  0]'},{letter:'D',text:'Undefined'}],ans:'A',sol:'**All elements are zero.**\n\n```\nO₂ = [0  0]\n     [0  0]\n```\n**Key insight:** The zero matrix has all elements equal to 0. It\'s like the number 0 for matrices.'},

  {pos:11,diff:'hard',text:'Multiply these 2×2 matrices:\n[1  2] × [5  6]\n[3  4]   [7  8]',ch:[{letter:'A',text:'[19 22]\n[43 50]'},{letter:'B',text:'[5  12]\n[21 32]'},{letter:'C',text:'[17 18]\n[39 44]'},{letter:'D',text:'[26 30]\n[38 44]'}],ans:'A',sol:'**Use row × column multiplication.**\n\n```\nRow 1, Col 1: (1×5 + 2×7) = 5 + 14 = 19\nRow 1, Col 2: (1×6 + 2×8) = 6 + 16 = 22\nRow 2, Col 1: (3×5 + 4×7) = 15 + 28 = 43\nRow 2, Col 2: (3×6 + 4×8) = 18 + 32 = 50\n\nResult: [19 22]\n        [43 50]\n```\n**Key insight:** Each element is found by multiplying corresponding elements of a row and column, then adding.'},

  {pos:12,diff:'hard',text:'What is the determinant of the identity matrix I₂?\n[1  0]\n[0  1]',ch:[{letter:'A',text:'1'},{letter:'B',text:'0'},{letter:'C',text:'2'},{letter:'D',text:'Undefined'}],ans:'A',sol:'**Use det = ad - bc.**\n\n```\ndet(I₂) = (1)(1) - (0)(0)\n        = 1 - 0\n        = 1\n```\n**Key insight:** The determinant of any identity matrix is always 1.'},

  {pos:13,diff:'hard',text:'Can you multiply a 2×3 matrix by a 2×2 matrix (in that order)?',ch:[{letter:'A',text:'Yes'},{letter:'B',text:'No'},{letter:'C',text:'Only if the elements are equal'},{letter:'D',text:'Only diagonally'}],ans:'B',sol:'**Check if dimensions are compatible.**\n\n```\n(2×3) × (2×2)\n     ↑   ↑\n     3 ≠ 2\n\nFor matrix multiplication A×B:\nNumber of columns in A must equal number of rows in B\n\n3 ≠ 2, so multiplication is not defined\n```\n**Key insight:** You can only multiply matrices when columns of first = rows of second. Here, 3 ≠ 2, so no.'},

  {pos:14,diff:'hard',text:'Add these matrices:\n[1]   [3]\n[2] + [4]\n[3]   [5]',ch:[{letter:'A',text:'[4]\n[6]\n[8]'},{letter:'B',text:'[1  3]\n[2  4]\n[3  5]'},{letter:'C',text:'[4  6  8]'},{letter:'D',text:'[14]'}],ans:'A',sol:'**Add corresponding elements.**\n\n```\n[1]   [3]   [1+3]   [4]\n[2] + [4] = [2+4] = [6]\n[3]   [5]   [3+5]   [8]\n```\n**Key insight:** Column vectors add element by element to give [4, 6, 8]ᵀ.'},

  {pos:15,diff:'hard',text:'What is -1 times this matrix?\n[2  -3]\n[4   1]',ch:[{letter:'A',text:'[-2   3]\n[-4  -1]'},{letter:'B',text:'[-2  -3]\n[-4   1]'},{letter:'C',text:'[2   3]\n[4  -1]'},{letter:'D',text:'[-1  -4]\n[-3  -2]'}],ans:'A',sol:'**Multiply each element by -1.**\n\n```\n      [2  -3]   [-1×2   -1×(-3)]   [-2   3]\n-1 × [4   1] = [-1×4   -1×1  ] = [-4  -1]\n```\n**Key insight:** Multiplying by -1 flips the sign of every element.'},

  {pos:16,diff:'hard',text:'What is the determinant of this matrix?\n[2  4]\n[1  2]',ch:[{letter:'A',text:'0'},{letter:'B',text:'4'},{letter:'C',text:'8'},{letter:'D',text:'-4'}],ans:'A',sol:'**Calculate ad - bc.**\n\n```\ndet = (2)(2) - (4)(1)\n    = 4 - 4\n    = 0\n```\n**Key insight:** When determinant = 0, the matrix is singular (non-invertible). Here, det = 0.'},

  {pos:17,diff:'hard',text:'If A is a 3×2 matrix and B is a 2×4 matrix, what are the dimensions of A×B?',ch:[{letter:'A',text:'3×4'},{letter:'B',text:'2×2'},{letter:'C',text:'3×2'},{letter:'D',text:'Cannot multiply'}],ans:'A',sol:'**Use dimension rule for multiplication.**\n\n```\n(3×2) × (2×4)\n ↓  ↑   ↑  ↓\n rows  cols\n match!\n\nResult dimensions: 3×4\n(outer dimensions)\n```\n**Key insight:** When multiplying (m×n) × (n×p), the result is (m×p). Here, 3×4.'},

  {pos:18,diff:'hard',text:'What is this matrix squared?\n[1  0]\n[0  2]',ch:[{letter:'A',text:'[1  0]\n[0  4]'},{letter:'B',text:'[1  0]\n[0  2]'},{letter:'C',text:'[2  0]\n[0  4]'},{letter:'D',text:'[1  0]\n[0  8]'}],ans:'A',sol:'**Multiply the matrix by itself.**\n\n```\n[1  0]   [1  0]   [1×1+0×0  1×0+0×2]   [1  0]\n[0  2] × [0  2] = [0×1+2×0  0×0+2×2] = [0  4]\n```\n**Key insight:** Squaring a diagonal matrix squares each diagonal element.'},

  {pos:19,diff:'hard',text:'What is the trace of this matrix (sum of diagonal elements)?\n[5  2]\n[3  7]',ch:[{letter:'A',text:'12'},{letter:'B',text:'17'},{letter:'C',text:'10'},{letter:'D',text:'35'}],ans:'A',sol:'**Add the diagonal elements.**\n\n```\nTrace = 5 + 7 = 12\n\n(Diagonal: top-left to bottom-right)\n```\n**Key insight:** The trace is the sum of elements on the main diagonal: 5 + 7 = 12.'},

  {pos:20,diff:'hard',text:'Multiply:\n[1  2  3] × [1]\n            [0]\n            [2]',ch:[{letter:'A',text:'[7]'},{letter:'B',text:'[1  0  6]'},{letter:'C',text:'[3]'},{letter:'D',text:'[6]'}],ans:'A',sol:'**Row times column multiplication.**\n\n```\n[1  2  3] × [1]  = [1×1 + 2×0 + 3×2]\n            [0]    = [1 + 0 + 6]\n            [2]    = [7]\n```\n**Key insight:** Multiply corresponding elements and add: (1×1) + (2×0) + (3×2) = 7.'},

  {pos:21,diff:'hard',text:'Is matrix multiplication commutative (does A×B = B×A)?',ch:[{letter:'A',text:'Yes, always'},{letter:'B',text:'No, generally not'},{letter:'C',text:'Only for identity matrices'},{letter:'D',text:'Only for 2×2 matrices'}],ans:'B',sol:'**Matrix multiplication is not commutative.**\n\n```\nExample:\n[1  2] × [5  6]   ≠   [5  6] × [1  2]\n[3  4]   [7  8]       [7  8]   [3  4]\n\n[19 22]  ≠  [23 34]\n[43 50]     [31 46]\n\nA×B ≠ B×A in general\n```\n**Key insight:** Unlike regular numbers, matrices don\'t commute: A×B ≠ B×A in general.'},

  {pos:22,diff:'hard',text:'What is the inverse of this matrix?\n[1  2]\n[3  4]',ch:[{letter:'A',text:'[-2    1]\n[ 1.5 -0.5]'},{letter:'B',text:'[4  -2]\n[-3  1]'},{letter:'C',text:'[1  -2]\n[-3  4]'},{letter:'D',text:'[-4   2]\n[ 3  -1]'}],ans:'A',sol:'**Use the formula for 2×2 matrix inverse.**\n\n```\nFor [a  b], inverse is    1    [ d  -b]\n    [c  d]            ad-bc  [-c   a]\n\ndet = (1)(4) - (2)(3) = -2\n\nInverse =  1  [ 4  -2]  = [-2    1]\n          -2  [-3   1]    [ 1.5 -0.5]\n```\n**Key insight:** For a 2×2 matrix, swap diagonal, negate off-diagonal, divide by determinant.'},

  {pos:23,diff:'hard',text:'What is the result?\n[2  1] + [0  0]\n[3  4]   [0  0]',ch:[{letter:'A',text:'[2  1]\n[3  4]'},{letter:'B',text:'[0  0]\n[0  0]'},{letter:'C',text:'[2  0]\n[3  0]'},{letter:'D',text:'[1  1]\n[1  1]'}],ans:'A',sol:'**Add the zero matrix.**\n\n```\n[2  1]   [0  0]   [2  1]\n[3  4] + [0  0] = [3  4]\n```\n**Key insight:** Adding the zero matrix to any matrix leaves it unchanged (A + O = A).'},

  {pos:24,diff:'hard',text:'What is the determinant of this matrix?\n[5   2]\n[10  4]',ch:[{letter:'A',text:'0'},{letter:'B',text:'20'},{letter:'C',text:'40'},{letter:'D',text:'-20'}],ans:'A',sol:'**Calculate ad - bc.**\n\n```\ndet = (5)(4) - (2)(10)\n    = 20 - 20\n    = 0\n```\n**Key insight:** The second row is exactly 2 times the first row, making this matrix singular with det = 0.'},

  {pos:25,diff:'hard',text:'Multiply:\n[3] × [1  2  3]\n',ch:[{letter:'A',text:'[3  6  9]'},{letter:'B',text:'[18]'},{letter:'C',text:'Cannot multiply'},{letter:'D',text:'[1  2  3]'}],ans:'A',sol:'**Multiply 1×1 matrix by 1×3 matrix.**\n\n```\n[3] × [1  2  3] = [3×1  3×2  3×3]\n                = [3    6    9]\n\nResult is 1×3\n```\n**Key insight:** (1×1) × (1×3) = (1×3). Each element is multiplied by 3.'},

  {pos:26,diff:'hard',text:'What is 0 times any matrix A (0×A)?',ch:[{letter:'A',text:'A'},{letter:'B',text:'0 (scalar)'},{letter:'C',text:'O (zero matrix)'},{letter:'D',text:'Identity matrix'}],ans:'C',sol:'**Zero times any matrix gives the zero matrix.**\n\n```\n    [a  b]   [0  0]\n0 × [c  d] = [0  0]\n\nEvery element becomes 0\n```\n**Key insight:** Multiplying any matrix by the scalar 0 gives the zero matrix of the same dimensions.'},

  {pos:27,diff:'hard',text:'If det(A) = 5 and det(B) = 3, what is det(A×B)?',ch:[{letter:'A',text:'15'},{letter:'B',text:'8'},{letter:'C',text:'5'},{letter:'D',text:'3'}],ans:'A',sol:'**Use the determinant multiplication property.**\n\n```\ndet(A×B) = det(A) × det(B)\n         = 5 × 3\n         = 15\n```\n**Key insight:** The determinant of a product equals the product of determinants: det(AB) = det(A)×det(B).'},

  {pos:28,diff:'hard',text:'What type of matrix is this?\n[1  0  0]\n[0  1  0]\n[0  0  1]',ch:[{letter:'A',text:'Zero matrix'},{letter:'B',text:'Identity matrix'},{letter:'C',text:'Diagonal matrix'},{letter:'D',text:'Scalar matrix'}],ans:'B',sol:'**Identify the 3×3 identity matrix.**\n\n```\nI₃ = [1  0  0]\n     [0  1  0]\n     [0  0  1]\n\n1s on diagonal, 0s elsewhere = Identity\n```\n**Key insight:** This is the 3×3 identity matrix I₃. It\'s also diagonal and scalar, but identity is most specific.'},

  {pos:29,diff:'hard',text:'Transpose this matrix:\n[1  2]\n[3  4]\n[5  6]',ch:[{letter:'A',text:'[1  3  5]\n[2  4  6]'},{letter:'B',text:'[5  6]\n[3  4]\n[1  2]'},{letter:'C',text:'[6  5]\n[4  3]\n[2  1]'},{letter:'D',text:'[1  2]\n[3  4]\n[5  6]'}],ans:'A',sol:'**Swap rows and columns.**\n\n```\nOriginal (3×2):   Transpose (2×3):\n[1  2]            [1  3  5]\n[3  4]            [2  4  6]\n[5  6]\n```\n**Key insight:** The transpose converts a 3×2 matrix to a 2×3 matrix by making rows into columns.'},

  {pos:30,diff:'hard',text:'What is the determinant of this diagonal matrix?\n[3  0]\n[0  4]',ch:[{letter:'A',text:'12'},{letter:'B',text:'7'},{letter:'C',text:'0'},{letter:'D',text:'1'}],ans:'A',sol:'**For diagonal matrices, det = product of diagonal elements.**\n\n```\ndet = (3)(4) - (0)(0)\n    = 12 - 0\n    = 12\n\nOr simply: 3 × 4 = 12\n```\n**Key insight:** For diagonal matrices, the determinant is the product of the diagonal elements.'},

  {pos:31,diff:'hard',text:'Add:\n[1  -1] + [-1  1]\n[2   3]   [-2 -3]',ch:[{letter:'A',text:'[0  0]\n[0  0]'},{letter:'B',text:'[2  0]\n[4  6]'},{letter:'C',text:'[0  0]\n[4  6]'},{letter:'D',text:'[-2  2]\n[-4 -6]'}],ans:'A',sol:'**Add corresponding elements.**\n\n```\n[1  -1]   [-1  1]   [1-1   -1+1]   [0  0]\n[2   3] + [-2 -3] = [2-2    3-3] = [0  0]\n```\n**Key insight:** These matrices are additive inverses - they sum to the zero matrix.'},

  {pos:32,diff:'hard',text:'What is A - A for any matrix A?',ch:[{letter:'A',text:'A'},{letter:'B',text:'O (zero matrix)'},{letter:'C',text:'I (identity matrix)'},{letter:'D',text:'2A'}],ans:'B',sol:'**Any matrix minus itself is zero.**\n\n```\nA - A = O\n\nExample:\n[a  b]   [a  b]   [0  0]\n[c  d] - [c  d] = [0  0]\n```\n**Key insight:** Subtracting any matrix from itself gives the zero matrix.'},

  {pos:33,diff:'hard',text:'What is det(2A) if A is a 2×2 matrix with det(A) = 3?',ch:[{letter:'A',text:'6'},{letter:'B',text:'12'},{letter:'C',text:'5'},{letter:'D',text:'9'}],ans:'B',sol:'**Use the scalar multiplication property for determinants.**\n\n```\nFor 2×2 matrix A:\ndet(kA) = k² × det(A)\n\ndet(2A) = 2² × det(A)\n        = 4 × 3\n        = 12\n```\n**Key insight:** For an n×n matrix, det(kA) = kⁿ × det(A). Here, det(2A) = 2² × 3 = 12.'},

  {pos:34,diff:'hard',text:'Which matrix is symmetric (equals its own transpose)?\n',ch:[{letter:'A',text:'[1  2]\n[2  3]'},{letter:'B',text:'[1  2]\n[3  4]'},{letter:'C',text:'[0  1]\n[-1 0]'},{letter:'D',text:'[1  2]\n[4  3]'}],ans:'A',sol:'**Check if A = Aᵀ.**\n\n```\nOption A:\nA = [1  2]    Aᵀ = [1  2]  ✓ Equal!\n    [2  3]         [2  3]\n\nSymmetric matrices have aᵢⱼ = aⱼᵢ\n(element at row i, col j = element at row j, col i)\n```\n**Key insight:** A matrix is symmetric if it equals its transpose. Here, option A is symmetric.'},

  {pos:35,diff:'hard',text:'Multiply:\n[1  0] × [5]\n[0  1]   [7]',ch:[{letter:'A',text:'[5]\n[7]'},{letter:'B',text:'[12]'},{letter:'C',text:'[5  7]'},{letter:'D',text:'[1]\n[1]'}],ans:'A',sol:'**Multiply by identity matrix.**\n\n```\n[1  0]   [5]   [1×5 + 0×7]   [5]\n[0  1] × [7] = [0×5 + 1×7] = [7]\n```\n**Key insight:** The identity matrix times any vector gives that vector unchanged (I×v = v).'},

  {pos:36,diff:'hard',text:'What is the rank of this matrix?\n[1  2]\n[2  4]',ch:[{letter:'A',text:'1'},{letter:'B',text:'2'},{letter:'C',text:'0'},{letter:'D',text:'3'}],ans:'A',sol:'**Count linearly independent rows/columns.**\n\n```\nRow 2 = 2 × Row 1\n[2  4] = 2[1  2]\n\nOnly 1 independent row\nRank = 1\n\n(Also: det = 0 confirms rank < 2)\n```\n**Key insight:** When rows are linearly dependent (one is a multiple of another), the rank is 1.'},

  {pos:37,diff:'hard',text:'What is (Aᵀ)ᵀ (transpose of transpose)?',ch:[{letter:'A',text:'A'},{letter:'B',text:'Aᵀ'},{letter:'C',text:'O'},{letter:'D',text:'2A'}],ans:'A',sol:'**Double transpose returns to original.**\n\n```\n(Aᵀ)ᵀ = A\n\nExample:\nA = [1  2]    Aᵀ = [1  3]    (Aᵀ)ᵀ = [1  2] = A\n    [3  4]         [2  4]            [3  4]\n```\n**Key insight:** Taking the transpose twice returns you to the original matrix.'},

  {pos:38,diff:'hard',text:'If A is 2×3 and B is 3×2, what are the dimensions of B×A?',ch:[{letter:'A',text:'3×3'},{letter:'B',text:'2×2'},{letter:'C',text:'2×3'},{letter:'D',text:'3×2'}],ans:'A',sol:'**Apply dimension multiplication rule.**\n\n```\n(3×2) × (2×3)\n ↓  ↑   ↑  ↓\nmatch!\n\nResult: 3×3\n```\n**Key insight:** (m×n) × (n×p) = (m×p). Here, (3×2) × (2×3) = 3×3.'},

  {pos:39,diff:'hard',text:'What is the determinant of this matrix?\n[1  0  0]\n[0  2  0]\n[0  0  3]',ch:[{letter:'A',text:'6'},{letter:'B',text:'5'},{letter:'C',text:'0'},{letter:'D',text:'1'}],ans:'A',sol:'**For diagonal matrices, multiply diagonal elements.**\n\n```\ndet = 1 × 2 × 3 = 6\n\nFor diagonal/triangular matrices,\ndet = product of diagonal entries\n```\n**Key insight:** The determinant of a diagonal matrix is the product of its diagonal elements: 1×2×3 = 6.'},

  {pos:40,diff:'hard',text:'Multiply:\n[2  3] × [1  0]\n         [0  1]',ch:[{letter:'A',text:'[2  3]'},{letter:'B',text:'[1  0]\n[0  1]'},{letter:'C',text:'[2  0]\n[0  3]'},{letter:'D',text:'[5]'}],ans:'A',sol:'**Multiply by identity.**\n\n```\n[2  3] × [1  0]  = [2×1+3×0  2×0+3×1]\n         [0  1]    = [2        3]\n                   = [2  3]\n```\n**Key insight:** Any matrix times the identity equals itself: A×I = A.'},

  {pos:41,diff:'hard',text:'What matrix when added to [3  1] gives [5  4]?\n                            [2  6]       [7  9]',ch:[{letter:'A',text:'[2  3]\n[5  3]'},{letter:'B',text:'[8  5]\n[9  15]'},{letter:'C',text:'[2  5]\n[3  3]'},{letter:'D',text:'[15 4]\n[14 54]'}],ans:'A',sol:'**Subtract to find the missing matrix.**\n\n```\n[5  4]   [3  1]   [5-3  4-1]   [2  3]\n[7  9] - [2  6] = [7-2  9-6] = [5  3]\n\nCheck: [3  1] + [2  3] = [5  4] ✓\n       [2  6]   [5  3]   [7  9]\n```\n**Key insight:** To find X where A + X = B, calculate X = B - A.'},

  {pos:42,diff:'hard',text:'Is this matrix invertible?\n[1  2]\n[3  6]',ch:[{letter:'A',text:'Yes'},{letter:'B',text:'No'},{letter:'C',text:'Only if multiplied by 2'},{letter:'D',text:'Cannot determine'}],ans:'B',sol:'**Check if determinant is zero.**\n\n```\ndet = (1)(6) - (2)(3)\n    = 6 - 6\n    = 0\n\nWhen det = 0, matrix is NOT invertible (singular)\n```\n**Key insight:** A matrix is invertible only if det ≠ 0. Here, det = 0, so it\'s not invertible.'},

  {pos:43,diff:'hard',text:'What is the element in row 2, column 3 of this matrix?\n[1  2  3  4]\n[5  6  7  8]\n[9 10 11 12]',ch:[{letter:'A',text:'7'},{letter:'B',text:'8'},{letter:'C',text:'6'},{letter:'D',text:'11'}],ans:'A',sol:'**Find the element at position (2,3).**\n\n```\nRow 2: [5  6  7  8]\n         ↑  ↑  ↑  ↑\n       col1 2  3  4\n\nElement at row 2, col 3 = 7\n```\n**Key insight:** Matrix element notation (i,j) means row i, column j. Here, (2,3) = 7.'},

  {pos:44,diff:'hard',text:'Multiply:\n[1]   \n[2] × [3  4]\n[3]',ch:[{letter:'A',text:'[3   4]\n[6   8]\n[9  12]'},{letter:'B',text:'[26]'},{letter:'C',text:'Cannot multiply'},{letter:'D',text:'[3  4  6  8  9  12]'}],ans:'A',sol:'**Multiply 3×1 by 1×2 matrix.**\n\n```\n[1]         [1×3  1×4]   [3   4]\n[2] × [3 4]=[2×3  2×4] = [6   8]\n[3]         [3×3  3×4]   [9  12]\n\nResult is 3×2\n```\n**Key insight:** (3×1) × (1×2) = (3×2). Each row element multiplies the entire second matrix.'},

  {pos:45,diff:'hard',text:'What is det(Aᵀ) if det(A) = 5?',ch:[{letter:'A',text:'5'},{letter:'B',text:'-5'},{letter:'C',text:'25'},{letter:'D',text:'1/5'}],ans:'A',sol:'**Determinant of transpose equals determinant of original.**\n\n```\ndet(Aᵀ) = det(A)\n\ndet(Aᵀ) = 5\n```\n**Key insight:** Taking the transpose doesn\'t change the determinant: det(Aᵀ) = det(A).'},

  {pos:46,diff:'hard',text:'What is A + O where O is the zero matrix?',ch:[{letter:'A',text:'A'},{letter:'B',text:'O'},{letter:'C',text:'I'},{letter:'D',text:'2A'}],ans:'A',sol:'**Zero matrix is additive identity.**\n\n```\nA + O = A\n\nExample:\n[a  b]   [0  0]   [a  b]\n[c  d] + [0  0] = [c  d]\n```\n**Key insight:** Adding the zero matrix to any matrix leaves it unchanged.'},

  {pos:47,diff:'hard',text:'Simplify: 2A + 3A',ch:[{letter:'A',text:'5A'},{letter:'B',text:'6A'},{letter:'C',text:'A'},{letter:'D',text:'2A'}],ans:'A',sol:'**Combine like terms.**\n\n```\n2A + 3A = (2+3)A = 5A\n\nExample with numbers:\n2[1  2] + 3[1  2] = [2  4] + [3  6] = [5  10] = 5[1  2]\n [3  4]    [3  4]   [6  8]   [9 12]   [15 20]    [3  4]\n```\n**Key insight:** Like regular algebra, 2A + 3A = 5A.'},

  {pos:48,diff:'hard',text:'What is the determinant of A⁻¹ if det(A) = 4?',ch:[{letter:'A',text:'1/4'},{letter:'B',text:'-4'},{letter:'C',text:'4'},{letter:'D',text:'16'}],ans:'A',sol:'**Use the inverse determinant property.**\n\n```\ndet(A⁻¹) = 1/det(A)\n\ndet(A⁻¹) = 1/4\n```\n**Key insight:** The determinant of the inverse is the reciprocal of the determinant: det(A⁻¹) = 1/det(A).'},

  {pos:49,diff:'hard',text:'If A×B = I (identity), what is B?',ch:[{letter:'A',text:'A⁻¹'},{letter:'B',text:'A'},{letter:'C',text:'O'},{letter:'D',text:'Aᵀ'}],ans:'A',sol:'**B is the inverse of A.**\n\n```\nA × B = I\n\nThis is the definition of inverse:\nB = A⁻¹\n```\n**Key insight:** If A times B gives the identity matrix, then B is the inverse of A.'},

  {pos:50,diff:'hard',text:'What is I × I (identity times identity)?',ch:[{letter:'A',text:'I'},{letter:'B',text:'O'},{letter:'C',text:'2I'},{letter:'D',text:'I²'}],ans:'A',sol:'**Identity times identity is identity.**\n\n```\n[1  0]   [1  0]   [1  0]\n[0  1] × [0  1] = [0  1] = I\n\nI × I = I\n```\n**Key insight:** The identity matrix is like the number 1: multiplying it by itself gives itself (I² = I).'},
];

async function insertQuestions() {
  // Get lesson_id for Matrices
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'matrices')
    .single();

  if (lessonError || !lesson) {
    console.error('Error finding lesson matrices:', lessonError);
    return;
  }

  const lessonId = lesson.id;
  console.log(`Found lesson matrices with ID: ${lessonId}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const { error } = await supabase
      .from('practice_questions')
      .insert({
        lesson_id: lessonId,
        subject: 'math',
        position: q.pos,
        difficulty: q.diff,
        title: `Matrices Q${q.pos}`,
        problem_text: q.text,
        choices: q.ch,
        correct_answer: q.ans,
        answer_explanation: q.sol
      });

    if (error) {
      console.error(`Error inserting Q${q.pos}:`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`\n=== COMPLETE: ${successCount}/${questions.length} success, ${errorCount}/${questions.length} errors ===\n`);
}

insertQuestions();
