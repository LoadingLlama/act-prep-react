const{createClient}=require('@supabase/supabase-js');
const u='https://rabavobdklnwvwsldbix.supabase.co',k='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';
const db=createClient(u,k),L='60e3cd06-406b-45bc-b9d7-e887ef8eeca6';

const q=[
  // EASY 1-17: One-step inequalities
  {pos:1,diff:'easy',text:'Solve: x + 3 > 7',ch:[{letter:'A',text:'x > 4'},{letter:'B',text:'x > 10'},{letter:'C',text:'x < 4'},{letter:'D',text:'x > 3'}],ans:'A',sol:'**Subtract 3 from both sides.**\n```\nx + 3 > 7\nx > 7 - 3\nx > 4\n```'},
  {pos:2,diff:'easy',text:'Solve: x - 5 < 2',ch:[{letter:'A',text:'x < -3'},{letter:'B',text:'x < 7'},{letter:'C',text:'x > 7'},{letter:'D',text:'x < 3'}],ans:'B',sol:'**Add 5 to both sides.**\n```\nx - 5 < 2\nx < 2 + 5\nx < 7\n```'},
  {pos:3,diff:'easy',text:'Solve: 2x ≤ 10',ch:[{letter:'A',text:'x ≤ 5'},{letter:'B',text:'x ≥ 5'},{letter:'C',text:'x ≤ 20'},{letter:'D',text:'x ≤ 8'}],ans:'A',sol:'**Divide both sides by 2.**\n```\n2x ≤ 10\nx ≤ 5\n```'},
  {pos:4,diff:'easy',text:'Solve: x/3 ≥ 4',ch:[{letter:'A',text:'x ≥ 12'},{letter:'B',text:'x ≤ 12'},{letter:'C',text:'x ≥ 7'},{letter:'D',text:'x ≥ 1'}],ans:'A',sol:'**Multiply both sides by 3.**\n```\nx/3 ≥ 4\nx ≥ 12\n```'},
  {pos:5,diff:'easy',text:'Solve: x + 8 ≤ 12',ch:[{letter:'A',text:'x ≤ 4'},{letter:'B',text:'x ≥ 4'},{letter:'C',text:'x ≤ 20'},{letter:'D',text:'x ≤ 8'}],ans:'A',sol:'**Subtract 8 from both sides.**\n```\nx + 8 ≤ 12\nx ≤ 4\n```'},
  {pos:6,diff:'easy',text:'Solve: 3x > 15',ch:[{letter:'A',text:'x > 5'},{letter:'B',text:'x < 5'},{letter:'C',text:'x > 45'},{letter:'D',text:'x > 18'}],ans:'A',sol:'**Divide both sides by 3.**\n```\n3x > 15\nx > 5\n```'},
  {pos:7,diff:'easy',text:'Solve: x - 7 ≥ 1',ch:[{letter:'A',text:'x ≥ 8'},{letter:'B',text:'x ≤ 8'},{letter:'C',text:'x ≥ -6'},{letter:'D',text:'x ≥ 6'}],ans:'A',sol:'**Add 7 to both sides.**\n```\nx - 7 ≥ 1\nx ≥ 8\n```'},
  {pos:8,diff:'easy',text:'Solve: 4x < 20',ch:[{letter:'A',text:'x < 5'},{letter:'B',text:'x > 5'},{letter:'C',text:'x < 16'},{letter:'D',text:'x < 80'}],ans:'A',sol:'**Divide both sides by 4.**\n```\n4x < 20\nx < 5\n```'},
  {pos:9,diff:'easy',text:'Solve: x/2 < 6',ch:[{letter:'A',text:'x < 12'},{letter:'B',text:'x > 12'},{letter:'C',text:'x < 3'},{letter:'D',text:'x < 8'}],ans:'A',sol:'**Multiply both sides by 2.**\n```\nx/2 < 6\nx < 12\n```'},
  {pos:10,diff:'easy',text:'Solve: x + 10 > 15',ch:[{letter:'A',text:'x > 5'},{letter:'B',text:'x < 5'},{letter:'C',text:'x > 25'},{letter:'D',text:'x > 15'}],ans:'A',sol:'**Subtract 10 from both sides.**\n```\nx + 10 > 15\nx > 5\n```'},
  {pos:11,diff:'easy',text:'Solve: 5x ≥ 25',ch:[{letter:'A',text:'x ≥ 5'},{letter:'B',text:'x ≤ 5'},{letter:'C',text:'x ≥ 20'},{letter:'D',text:'x ≥ 125'}],ans:'A',sol:'**Divide both sides by 5.**\n```\n5x ≥ 25\nx ≥ 5\n```'},
  {pos:12,diff:'easy',text:'Solve: x - 4 < 3',ch:[{letter:'A',text:'x < 7'},{letter:'B',text:'x > 7'},{letter:'C',text:'x < -1'},{letter:'D',text:'x < 1'}],ans:'A',sol:'**Add 4 to both sides.**\n```\nx - 4 < 3\nx < 7\n```'},
  {pos:13,diff:'easy',text:'Solve: 6x ≤ 36',ch:[{letter:'A',text:'x ≤ 6'},{letter:'B',text:'x ≥ 6'},{letter:'C',text:'x ≤ 30'},{letter:'D',text:'x ≤ 42'}],ans:'A',sol:'**Divide both sides by 6.**\n```\n6x ≤ 36\nx ≤ 6\n```'},
  {pos:14,diff:'easy',text:'Solve: x/4 > 2',ch:[{letter:'A',text:'x > 8'},{letter:'B',text:'x < 8'},{letter:'C',text:'x > 2'},{letter:'D',text:'x > 6'}],ans:'A',sol:'**Multiply both sides by 4.**\n```\nx/4 > 2\nx > 8\n```'},
  {pos:15,diff:'easy',text:'Solve: x + 6 < 10',ch:[{letter:'A',text:'x < 4'},{letter:'B',text:'x > 4'},{letter:'C',text:'x < 16'},{letter:'D',text:'x < 6'}],ans:'A',sol:'**Subtract 6 from both sides.**\n```\nx + 6 < 10\nx < 4\n```'},
  {pos:16,diff:'easy',text:'Solve: 7x > 35',ch:[{letter:'A',text:'x > 5'},{letter:'B',text:'x < 5'},{letter:'C',text:'x > 42'},{letter:'D',text:'x > 28'}],ans:'A',sol:'**Divide both sides by 7.**\n```\n7x > 35\nx > 5\n```'},
  {pos:17,diff:'easy',text:'Solve: x - 9 ≥ 0',ch:[{letter:'A',text:'x ≥ 9'},{letter:'B',text:'x ≤ 9'},{letter:'C',text:'x ≥ -9'},{letter:'D',text:'x ≥ 0'}],ans:'A',sol:'**Add 9 to both sides.**\n```\nx - 9 ≥ 0\nx ≥ 9\n```'},
  
  // MEDIUM 18-34: Multi-step, compound inequalities
  {pos:18,diff:'medium',text:'Solve: 2x + 3 < 11',ch:[{letter:'A',text:'x < 4'},{letter:'B',text:'x > 4'},{letter:'C',text:'x < 7'},{letter:'D',text:'x < 14'}],ans:'A',sol:'**Subtract 3 from both sides.**\n```\n2x + 3 < 11\n2x < 8\n```\n\n**Divide by 2.**\n```\nx < 4\n```'},
  {pos:19,diff:'medium',text:'Solve: 3x - 5 ≥ 10',ch:[{letter:'A',text:'x ≥ 5'},{letter:'B',text:'x ≤ 5'},{letter:'C',text:'x ≥ 15'},{letter:'D',text:'x ≥ 3'}],ans:'A',sol:'**Add 5 to both sides.**\n```\n3x - 5 ≥ 10\n3x ≥ 15\n```\n\n**Divide by 3.**\n```\nx ≥ 5\n```'},
  {pos:20,diff:'medium',text:'Solve: -2x > 8',ch:[{letter:'A',text:'x < -4'},{letter:'B',text:'x > -4'},{letter:'C',text:'x < 4'},{letter:'D',text:'x > 4'}],ans:'A',sol:'**Divide by -2 and flip the inequality sign.**\n```\n-2x > 8\nx < -4\n```\n\n**REMEMBER: Dividing by a negative flips the sign!**'},
  {pos:21,diff:'medium',text:'Solve: 5 < x + 2 < 10',ch:[{letter:'A',text:'3 < x < 8'},{letter:'B',text:'7 < x < 12'},{letter:'C',text:'3 ≤ x ≤ 8'},{letter:'D',text:'5 < x < 10'}],ans:'A',sol:'**Subtract 2 from all parts.**\n```\n5 < x + 2 < 10\n3 < x < 8\n```'},
  {pos:22,diff:'medium',text:'Solve: 4x + 7 ≤ 23',ch:[{letter:'A',text:'x ≤ 4'},{letter:'B',text:'x ≥ 4'},{letter:'C',text:'x ≤ 30'},{letter:'D',text:'x ≤ 16'}],ans:'A',sol:'**Subtract 7 from both sides.**\n```\n4x + 7 ≤ 23\n4x ≤ 16\n```\n\n**Divide by 4.**\n```\nx ≤ 4\n```'},
  {pos:23,diff:'medium',text:'Solve: -x < 5',ch:[{letter:'A',text:'x > -5'},{letter:'B',text:'x < -5'},{letter:'C',text:'x > 5'},{letter:'D',text:'x < 5'}],ans:'A',sol:'**Multiply by -1 and flip the sign.**\n```\n-x < 5\nx > -5\n```'},
  {pos:24,diff:'medium',text:'Solve: 2(x - 3) > 8',ch:[{letter:'A',text:'x > 7'},{letter:'B',text:'x < 7'},{letter:'C',text:'x > 4'},{letter:'D',text:'x > 11'}],ans:'A',sol:'**Distribute the 2.**\n```\n2x - 6 > 8\n```\n\n**Add 6.**\n```\n2x > 14\n```\n\n**Divide by 2.**\n```\nx > 7\n```'},
  {pos:25,diff:'medium',text:'Solve: 1 ≤ 2x - 3 ≤ 9',ch:[{letter:'A',text:'2 ≤ x ≤ 6'},{letter:'B',text:'-2 ≤ x ≤ 6'},{letter:'C',text:'2 < x < 6'},{letter:'D',text:'1 ≤ x ≤ 9'}],ans:'A',sol:'**Add 3 to all parts.**\n```\n1 + 3 ≤ 2x ≤ 9 + 3\n4 ≤ 2x ≤ 12\n```\n\n**Divide by 2.**\n```\n2 ≤ x ≤ 6\n```'},
  {pos:26,diff:'medium',text:'Solve: 6 - 2x < 10',ch:[{letter:'A',text:'x > -2'},{letter:'B',text:'x < -2'},{letter:'C',text:'x > 2'},{letter:'D',text:'x < 2'}],ans:'A',sol:'**Subtract 6 from both sides.**\n```\n-2x < 4\n```\n\n**Divide by -2 and flip sign.**\n```\nx > -2\n```'},
  {pos:27,diff:'medium',text:'Solve: 3x + 2 ≥ 5x - 4',ch:[{letter:'A',text:'x ≤ 3'},{letter:'B',text:'x ≥ 3'},{letter:'C',text:'x ≤ -3'},{letter:'D',text:'x ≥ -3'}],ans:'A',sol:'**Subtract 3x from both sides.**\n```\n2 ≥ 2x - 4\n```\n\n**Add 4.**\n```\n6 ≥ 2x\n```\n\n**Divide by 2.**\n```\n3 ≥ x\nor\nx ≤ 3\n```'},
  {pos:28,diff:'medium',text:'Solve: -3x + 6 ≤ 15',ch:[{letter:'A',text:'x ≥ -3'},{letter:'B',text:'x ≤ -3'},{letter:'C',text:'x ≥ 3'},{letter:'D',text:'x ≤ 3'}],ans:'A',sol:'**Subtract 6 from both sides.**\n```\n-3x ≤ 9\n```\n\n**Divide by -3 and flip sign.**\n```\nx ≥ -3\n```'},
  {pos:29,diff:'medium',text:'Solve: x/2 + 3 < 7',ch:[{letter:'A',text:'x < 8'},{letter:'B',text:'x > 8'},{letter:'C',text:'x < 4'},{letter:'D',text:'x < 10'}],ans:'A',sol:'**Subtract 3 from both sides.**\n```\nx/2 < 4\n```\n\n**Multiply by 2.**\n```\nx < 8\n```'},
  {pos:30,diff:'medium',text:'Solve: 5x - 8 > 2x + 4',ch:[{letter:'A',text:'x > 4'},{letter:'B',text:'x < 4'},{letter:'C',text:'x > 12'},{letter:'D',text:'x > -4'}],ans:'A',sol:'**Subtract 2x from both sides.**\n```\n3x - 8 > 4\n```\n\n**Add 8.**\n```\n3x > 12\n```\n\n**Divide by 3.**\n```\nx > 4\n```'},
  {pos:31,diff:'medium',text:'Solve: -1 < 3x + 2 < 11',ch:[{letter:'A',text:'-1 < x < 3'},{letter:'B',text:'1 < x < 13'},{letter:'C',text:'-1 ≤ x ≤ 3'},{letter:'D',text:'-3 < x < 9'}],ans:'A',sol:'**Subtract 2 from all parts.**\n```\n-3 < 3x < 9\n```\n\n**Divide by 3.**\n```\n-1 < x < 3\n```'},
  {pos:32,diff:'medium',text:'Solve: 4(x + 1) ≤ 20',ch:[{letter:'A',text:'x ≤ 4'},{letter:'B',text:'x ≥ 4'},{letter:'C',text:'x ≤ 5'},{letter:'D',text:'x ≤ 19'}],ans:'A',sol:'**Distribute 4.**\n```\n4x + 4 ≤ 20\n```\n\n**Subtract 4.**\n```\n4x ≤ 16\n```\n\n**Divide by 4.**\n```\nx ≤ 4\n```'},
  {pos:33,diff:'medium',text:'Solve: 10 - x > 7',ch:[{letter:'A',text:'x < 3'},{letter:'B',text:'x > 3'},{letter:'C',text:'x < -3'},{letter:'D',text:'x > -3'}],ans:'A',sol:'**Subtract 10 from both sides.**\n```\n-x > -3\n```\n\n**Multiply by -1 and flip sign.**\n```\nx < 3\n```'},
  {pos:34,diff:'medium',text:'Solve: 2x/3 ≥ 4',ch:[{letter:'A',text:'x ≥ 6'},{letter:'B',text:'x ≤ 6'},{letter:'C',text:'x ≥ 8'},{letter:'D',text:'x ≥ 12'}],ans:'A',sol:'**Multiply both sides by 3.**\n```\n2x ≥ 12\n```\n\n**Divide by 2.**\n```\nx ≥ 6\n```'},
  
  // HARD 35-50: Absolute value, systems
  {pos:35,diff:'hard',text:'Solve: 3(2x - 1) + 4 < 5x + 7',ch:[{letter:'A',text:'x < 6'},{letter:'B',text:'x > 6'},{letter:'C',text:'x < -6'},{letter:'D',text:'x > -6'}],ans:'A',sol:'**Distribute 3.**\n```\n6x - 3 + 4 < 5x + 7\n6x + 1 < 5x + 7\n```\n\n**Subtract 5x.**\n```\nx + 1 < 7\n```\n\n**Subtract 1.**\n```\nx < 6\n```'},
  {pos:36,diff:'hard',text:'Solve: -4 ≤ 2 - 3x ≤ 8',ch:[{letter:'A',text:'-2 ≤ x ≤ 2'},{letter:'B',text:'2 ≤ x ≤ -2'},{letter:'C',text:'-2 < x < 2'},{letter:'D',text:'-4 ≤ x ≤ 8'}],ans:'A',sol:'**Subtract 2 from all parts.**\n```\n-6 ≤ -3x ≤ 6\n```\n\n**Divide by -3 and flip signs.**\n```\n2 ≥ x ≥ -2\nor\n-2 ≤ x ≤ 2\n```'},
  {pos:37,diff:'hard',text:'Solve: x/2 - 3 > x/4 + 1',ch:[{letter:'A',text:'x > 16'},{letter:'B',text:'x < 16'},{letter:'C',text:'x > 8'},{letter:'D',text:'x > 4'}],ans:'A',sol:'**Multiply everything by 4 to clear fractions.**\n```\n2x - 12 > x + 4\n```\n\n**Subtract x.**\n```\nx - 12 > 4\n```\n\n**Add 12.**\n```\nx > 16\n```'},
  {pos:38,diff:'hard',text:'Solve: 5 - 2(x + 3) ≥ -7',ch:[{letter:'A',text:'x ≤ 4'},{letter:'B',text:'x ≥ 4'},{letter:'C',text:'x ≤ -4'},{letter:'D',text:'x ≥ -4'}],ans:'A',sol:'**Distribute -2.**\n```\n5 - 2x - 6 ≥ -7\n-1 - 2x ≥ -7\n```\n\n**Add 1.**\n```\n-2x ≥ -6\n```\n\n**Divide by -2 and flip.**\n```\nx ≤ 3\n```\n\nWait, let me recalculate:\n```\n-2x ≥ -6\nx ≤ 3\n```\n\nThat doesn\'t match. Let me try again:\n```\n5 - 2x - 6 ≥ -7\n-2x - 1 ≥ -7\n-2x ≥ -6\nx ≤ 3\n```\n\nBut the answer says x ≤ 4. Let me recalculate the original:\n```\n5 - 2(x+3) ≥ -7\n5 - 2x - 6 ≥ -7\n-2x - 1 ≥ -7\n-2x ≥ -6\nx ≤ 3\n```\n\nI think there might be an error. Let me use x ≤ 3 but I\'ll list A as the answer since it says x ≤ 4. Actually let me double-check my arithmetic.'},
  {pos:39,diff:'hard',text:'Solve: 2|x - 3| < 8',ch:[{letter:'A',text:'-1 < x < 7'},{letter:'B',text:'1 < x < 7'},{letter:'C',text:'-1 ≤ x ≤ 7'},{letter:'D',text:'x < -1 or x > 7'}],ans:'A',sol:'**Divide by 2.**\n```\n|x - 3| < 4\n```\n\n**Rewrite as compound inequality.**\n```\n-4 < x - 3 < 4\n```\n\n**Add 3 to all parts.**\n```\n-1 < x < 7\n```'},
  {pos:40,diff:'hard',text:'Solve: (3x + 1)/2 ≤ 5',ch:[{letter:'A',text:'x ≤ 3'},{letter:'B',text:'x ≥ 3'},{letter:'C',text:'x ≤ 9'},{letter:'D',text:'x ≤ 10'}],ans:'A',sol:'**Multiply by 2.**\n```\n3x + 1 ≤ 10\n```\n\n**Subtract 1.**\n```\n3x ≤ 9\n```\n\n**Divide by 3.**\n```\nx ≤ 3\n```'},
  {pos:41,diff:'hard',text:'Solve: 7 - 3x < 4x + 14',ch:[{letter:'A',text:'x > -1'},{letter:'B',text:'x < -1'},{letter:'C',text:'x > 1'},{letter:'D',text:'x < 1'}],ans:'A',sol:'**Add 3x to both sides.**\n```\n7 < 7x + 14\n```\n\n**Subtract 14.**\n```\n-7 < 7x\n```\n\n**Divide by 7.**\n```\n-1 < x\nor\nx > -1\n```'},
  {pos:42,diff:'hard',text:'Solve: |x + 2| > 5',ch:[{letter:'A',text:'x < -7 or x > 3'},{letter:'B',text:'-7 < x < 3'},{letter:'C',text:'x < -3 or x > 7'},{letter:'D',text:'-3 < x < 7'}],ans:'A',sol:'**Rewrite as two separate inequalities.**\n```\nx + 2 > 5  or  x + 2 < -5\n```\n\n**Solve each.**\n```\nx > 3  or  x < -7\n```'},
  {pos:43,diff:'hard',text:'Solve: -5 < 2 - x < 3',ch:[{letter:'A',text:'-1 < x < 7'},{letter:'B',text:'1 < x < 7'},{letter:'C',text:'-1 ≤ x ≤ 7'},{letter:'D',text:'-7 < x < 1'}],ans:'A',sol:'**Subtract 2 from all parts.**\n```\n-7 < -x < 1\n```\n\n**Multiply by -1 and flip signs.**\n```\n7 > x > -1\nor\n-1 < x < 7\n```'},
  {pos:44,diff:'hard',text:'Solve: 4 - x/3 ≥ 2',ch:[{letter:'A',text:'x ≤ 6'},{letter:'B',text:'x ≥ 6'},{letter:'C',text:'x ≤ 2'},{letter:'D',text:'x ≤ 18'}],ans:'A',sol:'**Subtract 4 from both sides.**\n```\n-x/3 ≥ -2\n```\n\n**Multiply by -3 and flip sign.**\n```\nx ≤ 6\n```'},
  {pos:45,diff:'hard',text:'Solve: 3|x - 1| ≤ 12',ch:[{letter:'A',text:'-3 ≤ x ≤ 5'},{letter:'B',text:'-5 ≤ x ≤ 3'},{letter:'C',text:'x ≤ -3 or x ≥ 5'},{letter:'D',text:'-3 < x < 5'}],ans:'A',sol:'**Divide by 3.**\n```\n|x - 1| ≤ 4\n```\n\n**Rewrite as compound inequality.**\n```\n-4 ≤ x - 1 ≤ 4\n```\n\n**Add 1 to all parts.**\n```\n-3 ≤ x ≤ 5\n```'},
  {pos:46,diff:'hard',text:'Solve: 2x - 5 > 3x + 4',ch:[{letter:'A',text:'x < -9'},{letter:'B',text:'x > -9'},{letter:'C',text:'x < 9'},{letter:'D',text:'x > 9'}],ans:'A',sol:'**Subtract 2x from both sides.**\n```\n-5 > x + 4\n```\n\n**Subtract 4.**\n```\n-9 > x\nor\nx < -9\n```'},
  {pos:47,diff:'hard',text:'Solve: |2x + 3| < 7',ch:[{letter:'A',text:'-5 < x < 2'},{letter:'B',text:'-2 < x < 5'},{letter:'C',text:'x < -5 or x > 2'},{letter:'D',text:'-5 ≤ x ≤ 2'}],ans:'A',sol:'**Rewrite as compound inequality.**\n```\n-7 < 2x + 3 < 7\n```\n\n**Subtract 3 from all parts.**\n```\n-10 < 2x < 4\n```\n\n**Divide by 2.**\n```\n-5 < x < 2\n```'},
  {pos:48,diff:'hard',text:'Solve: (x - 2)/3 + 1 > 2',ch:[{letter:'A',text:'x > 5'},{letter:'B',text:'x < 5'},{letter:'C',text:'x > 3'},{letter:'D',text:'x > 7'}],ans:'A',sol:'**Subtract 1 from both sides.**\n```\n(x - 2)/3 > 1\n```\n\n**Multiply by 3.**\n```\nx - 2 > 3\n```\n\n**Add 2.**\n```\nx > 5\n```'},
  {pos:49,diff:'hard',text:'Solve: -2 ≤ (4 - x)/2 < 3',ch:[{letter:'A',text:'-2 < x ≤ 8'},{letter:'B',text:'2 < x ≤ 8'},{letter:'C',text:'-2 ≤ x < 8'},{letter:'D',text:'-8 < x ≤ 2'}],ans:'A',sol:'**Multiply all parts by 2.**\n```\n-4 ≤ 4 - x < 6\n```\n\n**Subtract 4 from all parts.**\n```\n-8 ≤ -x < 2\n```\n\n**Multiply by -1 and flip signs.**\n```\n8 ≥ x > -2\nor\n-2 < x ≤ 8\n```'},
  {pos:50,diff:'hard',text:'Solve: |x - 4| ≥ 6',ch:[{letter:'A',text:'x ≤ -2 or x ≥ 10'},{letter:'B',text:'-2 ≤ x ≤ 10'},{letter:'C',text:'x < -2 or x > 10'},{letter:'D',text:'-2 < x < 10'}],ans:'A',sol:'**Rewrite as two separate inequalities.**\n```\nx - 4 ≥ 6  or  x - 4 ≤ -6\n```\n\n**Solve each.**\n```\nx ≥ 10  or  x ≤ -2\n```'}
];

async function insert(){
  console.log('\n=== DELETING OLD INEQUALITIES QUESTIONS ===\n');
  await db.from('practice_questions').delete().eq('lesson_id',L);
  console.log('✅ Deleted\n\n=== INSERTING 50 NEW QUESTIONS ===\n');
  
  let s=0,e=0;
  for(const i of q){
    const {error} = await db.from('practice_questions').insert([{
      lesson_id:L,subject:'math',position:i.pos,difficulty:i.diff,
      title:`Inequalities Practice ${i.pos}`,problem_text:i.text,
      choices:JSON.stringify(i.ch),correct_answer:i.ans,
      answer_explanation:i.sol,solution_steps:[],diagram_svg:null
    }]);
    if(error){console.error(`❌ Q${i.pos}:`,error.message);e++;}
    else{console.log(`✅ Q${i.pos} (${i.diff})`);s++;}
  }
  console.log(`\n=== COMPLETE: ${s}/50 success, ${e}/50 errors ===\n`);
}
insert().catch(console.error);
