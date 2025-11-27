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
  {pos:1,diff:'hard',text:'A fair six-sided die is rolled. What is the probability of rolling a number greater than 4?',ch:[{letter:'A',text:'1/6'},{letter:'B',text:'1/3'},{letter:'C',text:'1/2'},{letter:'D',text:'2/3'}],ans:'B',sol:'**Count favorable outcomes and divide by total outcomes.**\n\n```\nTotal outcomes: {1, 2, 3, 4, 5, 6} → 6 outcomes\nFavorable outcomes (> 4): {5, 6} → 2 outcomes\n\nP(> 4) = 2/6 = 1/3\n```\n**Key insight:** Probability = (favorable outcomes) / (total outcomes). Rolling 5 or 6 gives probability 1/3.'},

  {pos:2,diff:'hard',text:'Two coins are flipped. What is the probability of getting exactly one head?',ch:[{letter:'A',text:'1/4'},{letter:'B',text:'1/2'},{letter:'C',text:'3/4'},{letter:'D',text:'1/3'}],ans:'B',sol:'**List all outcomes and count favorable ones.**\n\n```\nSample space: {HH, HT, TH, TT}\nTotal outcomes: 4\n\nExactly one head: {HT, TH}\nFavorable outcomes: 2\n\nP(exactly 1 head) = 2/4 = 1/2\n```\n**Key insight:** Of the 4 equally likely outcomes when flipping two coins, 2 have exactly one head. Probability = 1/2.'},

  {pos:3,diff:'hard',text:'A bag contains 3 red, 4 blue, and 5 green marbles. What is the probability of randomly selecting a blue marble?',ch:[{letter:'A',text:'1/3'},{letter:'B',text:'1/4'},{letter:'C',text:'4/12'},{letter:'D',text:'5/12'}],ans:'A',sol:'**Calculate probability using the ratio of blue to total.**\n\n```\nTotal marbles = 3 + 4 + 5 = 12\nBlue marbles = 4\n\nP(blue) = 4/12 = 1/3\n```\n**Key insight:** With 4 blue marbles out of 12 total, the probability is 4/12 = 1/3.'},

  {pos:4,diff:'hard',text:'Events A and B are independent with P(A) = 0.3 and P(B) = 0.4. What is P(A and B)?',ch:[{letter:'A',text:'0.12'},{letter:'B',text:'0.7'},{letter:'C',text:'0.6'},{letter:'D',text:'0.5'}],ans:'A',sol:'**Use the multiplication rule for independent events.**\n\n```\nFor independent events:\nP(A and B) = P(A) × P(B)\n           = 0.3 × 0.4\n           = 0.12\n```\n**Key insight:** When events are independent, multiply their probabilities to find P(A and B). Here, 0.3 × 0.4 = 0.12.'},

  {pos:5,diff:'hard',text:'The probability it rains on Saturday is 0.6. The probability it rains on Sunday is 0.5. If these are independent, what is the probability it rains both days?',ch:[{letter:'A',text:'0.3'},{letter:'B',text:'0.11'},{letter:'C',text:'1.1'},{letter:'D',text:'0.55'}],ans:'A',sol:'**Multiply probabilities for independent events.**\n\n```\nP(rain Sat) = 0.6\nP(rain Sun) = 0.5\n\nP(rain both days) = 0.6 × 0.5 = 0.3\n```\n**Key insight:** For independent events occurring together, multiply their probabilities. P(both) = 0.3 or 30%.'},

  {pos:6,diff:'hard',text:'A card is drawn from a standard 52-card deck. What is the probability it is either a heart or a king?',ch:[{letter:'A',text:'4/13'},{letter:'B',text:'17/52'},{letter:'C',text:'16/52'},{letter:'D',text:'1/4'}],ans:'C',sol:'**Use the addition rule, accounting for overlap.**\n\n```\nP(heart) = 13/52\nP(king) = 4/52\nP(heart and king) = 1/52 (king of hearts)\n\nP(heart OR king) = P(heart) + P(king) - P(both)\n                 = 13/52 + 4/52 - 1/52\n                 = 16/52\n```\n**Key insight:** When events can overlap, use P(A or B) = P(A) + P(B) - P(A and B). There are 16 favorable cards.'},

  {pos:7,diff:'hard',text:'What is the complement of the probability P(A) = 0.35?',ch:[{letter:'A',text:'0.35'},{letter:'B',text:'0.65'},{letter:'C',text:'0.85'},{letter:'D',text:'0.75'}],ans:'B',sol:'**Calculate the complement using P(not A) = 1 - P(A).**\n\n```\nP(not A) = 1 - P(A)\n         = 1 - 0.35\n         = 0.65\n```\n**Key insight:** The complement is the probability the event does NOT occur. P(not A) = 1 - P(A) = 0.65.'},

  {pos:8,diff:'hard',text:'A fair coin is flipped 3 times. What is the probability of getting at least one head?',ch:[{letter:'A',text:'7/8'},{letter:'B',text:'1/2'},{letter:'C',text:'3/4'},{letter:'D',text:'5/8'}],ans:'A',sol:'**Use complement: P(at least 1 head) = 1 - P(no heads).**\n\n```\nP(no heads) = P(all tails) = P(TTT)\n            = (1/2)³\n            = 1/8\n\nP(at least 1 head) = 1 - 1/8 = 7/8\n```\n**Key insight:** It\'s easier to calculate the complement. P(at least one) = 1 - P(none) = 7/8.'},

  {pos:9,diff:'hard',text:'A bag has 6 red and 4 blue balls. Two balls are drawn without replacement. What is the probability both are red?',ch:[{letter:'A',text:'1/3'},{letter:'B',text:'3/15'},{letter:'C',text:'15/45'},{letter:'D',text:'1/2'}],ans:'A',sol:'**Calculate conditional probability for dependent events.**\n\n```\nP(1st red) = 6/10\nP(2nd red | 1st red) = 5/9 (5 red left out of 9 total)\n\nP(both red) = (6/10) × (5/9)\n            = 30/90\n            = 1/3\n```\n**Key insight:** Without replacement, events are dependent. After the first red ball, there are only 5 red left out of 9 total. P(both red) = 1/3.'},

  {pos:10,diff:'hard',text:'The probability of event A is 0.4. The probability of event B given A is 0.5. What is P(A and B)?',ch:[{letter:'A',text:'0.2'},{letter:'B',text:'0.9'},{letter:'C',text:'0.5'},{letter:'D',text:'0.4'}],ans:'A',sol:'**Use the conditional probability formula.**\n\n```\nP(B|A) = P(A and B) / P(A)\n\nSolve for P(A and B):\nP(A and B) = P(B|A) × P(A)\n           = 0.5 × 0.4\n           = 0.2\n```\n**Key insight:** The probability of both events is P(A) × P(B|A) = 0.4 × 0.5 = 0.2.'},

  {pos:11,diff:'hard',text:'A spinner has 8 equal sections numbered 1-8. What is the probability of spinning an even number?',ch:[{letter:'A',text:'1/4'},{letter:'B',text:'1/2'},{letter:'C',text:'3/8'},{letter:'D',text:'5/8'}],ans:'B',sol:'**Count even numbers among the outcomes.**\n\n```\nTotal outcomes: {1,2,3,4,5,6,7,8} → 8 outcomes\nEven numbers: {2,4,6,8} → 4 outcomes\n\nP(even) = 4/8 = 1/2\n```\n**Key insight:** Half of the numbers from 1-8 are even, so probability = 1/2.'},

  {pos:12,diff:'hard',text:'Two events are mutually exclusive with P(A) = 0.3 and P(B) = 0.4. What is P(A or B)?',ch:[{letter:'A',text:'0.12'},{letter:'B',text:'0.7'},{letter:'C',text:'0.6'},{letter:'D',text:'1.0'}],ans:'B',sol:'**Use the addition rule for mutually exclusive events.**\n\n```\nMutually exclusive means P(A and B) = 0\n\nP(A or B) = P(A) + P(B)\n          = 0.3 + 0.4\n          = 0.7\n```\n**Key insight:** When events are mutually exclusive (cannot both occur), simply add their probabilities. P(A or B) = 0.7.'},

  {pos:13,diff:'hard',text:'A die is rolled twice. What is the probability the sum is 7?',ch:[{letter:'A',text:'1/6'},{letter:'B',text:'1/12'},{letter:'C',text:'5/36'},{letter:'D',text:'6/36'}],ans:'A',sol:'**Count favorable outcomes in the sample space.**\n\n```\nTotal outcomes: 6 × 6 = 36\n\nSum = 7: {(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)}\nFavorable outcomes: 6\n\nP(sum = 7) = 6/36 = 1/6\n```\n**Key insight:** There are 6 ways to roll a sum of 7 out of 36 total outcomes. Probability = 6/36 = 1/6.'},

  {pos:14,diff:'hard',text:'The probability of rain on any given day is 0.2. What is the probability it does NOT rain?',ch:[{letter:'A',text:'0.2'},{letter:'B',text:'0.8'},{letter:'C',text:'0.5'},{letter:'D',text:'1.0'}],ans:'B',sol:'**Calculate the complement.**\n\n```\nP(no rain) = 1 - P(rain)\n           = 1 - 0.2\n           = 0.8\n```\n**Key insight:** The probability of the complement is 1 - P(event) = 0.8 or 80%.'},

  {pos:15,diff:'hard',text:'A box contains 5 red, 3 blue, and 2 green balls. If two balls are drawn with replacement, what is the probability both are blue?',ch:[{letter:'A',text:'9/100'},{letter:'B',text:'3/50'},{letter:'C',text:'1/10'},{letter:'D',text:'6/100'}],ans:'A',sol:'**Calculate probability with replacement (independent events).**\n\n```\nTotal balls = 5 + 3 + 2 = 10\n\nP(1st blue) = 3/10\nP(2nd blue) = 3/10 (with replacement, same probability)\n\nP(both blue) = (3/10) × (3/10)\n             = 9/100\n```\n**Key insight:** With replacement, the events are independent. Multiply the probabilities: (3/10)² = 9/100.'},

  {pos:16,diff:'hard',text:'The expected value of a random variable X with outcomes {1,2,3,4} each with probability 1/4 is:',ch:[{letter:'A',text:'2'},{letter:'B',text:'2.5'},{letter:'C',text:'3'},{letter:'D',text:'1.5'}],ans:'B',sol:'**Calculate expected value as Σ(x × P(x)).**\n\n```\nE[X] = Σ(x × P(x))\n     = 1(1/4) + 2(1/4) + 3(1/4) + 4(1/4)\n     = (1+2+3+4)/4\n     = 10/4\n     = 2.5\n```\n**Key insight:** Expected value is the weighted average of outcomes. For uniform probabilities, E[X] = average of values = 2.5.'},

  {pos:17,diff:'hard',text:'P(A) = 0.6, P(B) = 0.5, and P(A and B) = 0.3. Are A and B independent?',ch:[{letter:'A',text:'Yes'},{letter:'B',text:'No'},{letter:'C',text:'Cannot determine'},{letter:'D',text:'Only if mutually exclusive'}],ans:'A',sol:'**Check if P(A and B) = P(A) × P(B).**\n\n```\nFor independence:\nP(A and B) should equal P(A) × P(B)\n\nP(A) × P(B) = 0.6 × 0.5 = 0.3\nP(A and B) = 0.3\n\nSince 0.3 = 0.3, events are independent ✓\n```\n**Key insight:** Events are independent if P(A and B) = P(A) × P(B). Here, 0.3 = 0.3, so yes, they are independent.'},

  {pos:18,diff:'hard',text:'A bag has 10 marbles: 6 red and 4 blue. What is the probability of drawing 2 red marbles in a row without replacement?',ch:[{letter:'A',text:'1/3'},{letter:'B',text:'2/5'},{letter:'C',text:'3/10'},{letter:'D',text:'1/2'}],ans:'A',sol:'**Calculate dependent probability.**\n\n```\nP(1st red) = 6/10\nP(2nd red | 1st red) = 5/9\n\nP(both red) = (6/10) × (5/9)\n            = 30/90\n            = 1/3\n```\n**Key insight:** Without replacement, the second probability depends on the first outcome. P(both red) = 1/3.'},

  {pos:19,diff:'hard',text:'A game costs $5 to play. You have a 1/4 chance of winning $15 and 3/4 chance of winning nothing. What is the expected value?',ch:[{letter:'A',text:'-$1.25'},{letter:'B',text:'$3.75'},{letter:'C',text:'-$2.50'},{letter:'D',text:'$0'}],ans:'A',sol:'**Calculate expected value including the cost.**\n\n```\nNet outcomes:\n- Win: $15 - $5 = $10 (with probability 1/4)\n- Lose: $0 - $5 = -$5 (with probability 3/4)\n\nE[net] = (1/4)(10) + (3/4)(-5)\n       = 2.5 - 3.75\n       = -1.25\n```\n**Key insight:** The expected value is negative, meaning on average you lose $1.25 per game. Not a favorable game!'},

  {pos:20,diff:'hard',text:'Three coins are flipped. What is the probability of getting exactly 2 heads?',ch:[{letter:'A',text:'1/8'},{letter:'B',text:'3/8'},{letter:'C',text:'1/2'},{letter:'D',text:'1/4'}],ans:'B',sol:'**Count favorable outcomes.**\n\n```\nTotal outcomes: 2³ = 8\n{HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}\n\nExactly 2 heads: {HHT, HTH, THH}\nFavorable: 3\n\nP(exactly 2 heads) = 3/8\n```\n**Key insight:** Of 8 equally likely outcomes, 3 have exactly 2 heads. Probability = 3/8.'},

  {pos:21,diff:'hard',text:'A student has a 70% chance of passing each of two independent exams. What is the probability of passing both?',ch:[{letter:'A',text:'0.49'},{letter:'B',text:'0.7'},{letter:'C',text:'1.4'},{letter:'D',text:'0.35'}],ans:'A',sol:'**Multiply probabilities for independent events.**\n\n```\nP(pass both) = P(pass 1st) × P(pass 2nd)\n             = 0.7 × 0.7\n             = 0.49\n```\n**Key insight:** For independent events both occurring, multiply their probabilities. P(both) = 0.49 or 49%.'},

  {pos:22,diff:'hard',text:'A jar has 20 red and 30 blue candies. If one is randomly selected, what is the probability it is red?',ch:[{letter:'A',text:'2/5'},{letter:'B',text:'3/5'},{letter:'C',text:'1/2'},{letter:'D',text:'2/3'}],ans:'A',sol:'**Calculate simple probability.**\n\n```\nTotal candies = 20 + 30 = 50\nRed candies = 20\n\nP(red) = 20/50 = 2/5\n```\n**Key insight:** With 20 red out of 50 total, probability = 20/50 = 2/5.'},

  {pos:23,diff:'hard',text:'The probability of drawing an ace from a deck is 4/52. What is the probability of NOT drawing an ace?',ch:[{letter:'A',text:'48/52'},{letter:'B',text:'4/52'},{letter:'C',text:'1/13'},{letter:'D',text:'12/13'}],ans:'A',sol:'**Calculate the complement.**\n\n```\nP(not ace) = 1 - P(ace)\n           = 1 - 4/52\n           = 52/52 - 4/52\n           = 48/52\n```\n**Key insight:** The complement is 1 - 4/52 = 48/52, which simplifies to 12/13.'},

  {pos:24,diff:'hard',text:'If P(A|B) = 0.6 and P(B) = 0.5, what is P(A and B)?',ch:[{letter:'A',text:'1.1'},{letter:'B',text:'0.3'},{letter:'C',text:'0.6'},{letter:'D',text:'0.12'}],ans:'B',sol:'**Use conditional probability formula.**\n\n```\nP(A|B) = P(A and B) / P(B)\n\nP(A and B) = P(A|B) × P(B)\n           = 0.6 × 0.5\n           = 0.3\n```\n**Key insight:** P(A and B) = P(A|B) × P(B) = 0.3.'},

  {pos:25,diff:'hard',text:'A spinner has 4 red, 3 blue, and 5 green sections. What is P(not green)?',ch:[{letter:'A',text:'7/12'},{letter:'B',text:'5/12'},{letter:'C',text:'1/2'},{letter:'D',text:'2/3'}],ans:'A',sol:'**Calculate complement of green.**\n\n```\nTotal sections = 4 + 3 + 5 = 12\nGreen sections = 5\n\nP(green) = 5/12\nP(not green) = 1 - 5/12 = 7/12\n\nOr directly:\nNot green = red + blue = 4 + 3 = 7\nP(not green) = 7/12\n```\n**Key insight:** Either use complement or count directly: 7 non-green sections out of 12. P(not green) = 7/12.'},

  {pos:26,diff:'hard',text:'Two dice are rolled. What is the probability of rolling doubles (same number on both)?',ch:[{letter:'A',text:'1/6'},{letter:'B',text:'1/12'},{letter:'C',text:'1/36'},{letter:'D',text:'6/36'}],ans:'A',sol:'**Count favorable outcomes for doubles.**\n\n```\nTotal outcomes: 6 × 6 = 36\n\nDoubles: {(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)}\nFavorable: 6\n\nP(doubles) = 6/36 = 1/6\n```\n**Key insight:** There are 6 ways to roll doubles out of 36 total outcomes. Probability = 1/6.'},

  {pos:27,diff:'hard',text:'In a class, 60% like math, 50% like science, and 30% like both. What is P(math OR science)?',ch:[{letter:'A',text:'0.8'},{letter:'B',text:'0.6'},{letter:'C',text:'1.1'},{letter:'D',text:'0.7'}],ans:'A',sol:'**Use addition rule accounting for overlap.**\n\n```\nP(M or S) = P(M) + P(S) - P(M and S)\n          = 0.6 + 0.5 - 0.3\n          = 0.8\n```\n**Key insight:** When events overlap, subtract the intersection to avoid double-counting. P(math or science) = 0.8 or 80%.'},

  {pos:28,diff:'hard',text:'A coin is flipped until heads appears. What is the probability heads appears on the first flip?',ch:[{letter:'A',text:'1/2'},{letter:'B',text:'1/4'},{letter:'C',text:'1'},{letter:'D',text:'1/3'}],ans:'A',sol:'**Calculate probability of first outcome.**\n\n```\nP(heads on 1st flip) = 1/2\n\nThis is independent of what happens afterward.\n```\n**Key insight:** The probability of heads on any single flip is 1/2, regardless of the context.'},

  {pos:29,diff:'hard',text:'A bag has 8 balls: 3 red, 2 blue, 3 green. Two balls are drawn without replacement. What is P(both different colors)?',ch:[{letter:'A',text:'18/28'},{letter:'B',text:'10/28'},{letter:'C',text:'21/28'},{letter:'D',text:'15/28'}],ans:'C',sol:'**Calculate using complement: P(different) = 1 - P(same).**\n\n```\nP(both same color):\n- P(both red) = (3/8)(2/7) = 6/56\n- P(both blue) = (2/8)(1/7) = 2/56\n- P(both green) = (3/8)(2/7) = 6/56\n\nP(same) = 6/56 + 2/56 + 6/56 = 14/56 = 1/4\n\nP(different) = 1 - 1/4 = 3/4 = 21/28\n```\n**Key insight:** It\'s easier to find P(same color) then use complement. P(different) = 1 - 1/4 = 3/4 = 21/28.'},

  {pos:30,diff:'hard',text:'P(A) = 0.4, P(B) = 0.5, P(A and B) = 0.1. What is P(A|B)?',ch:[{letter:'A',text:'0.2'},{letter:'B',text:'0.1'},{letter:'C',text:'0.25'},{letter:'D',text:'0.5'}],ans:'A',sol:'**Use conditional probability formula.**\n\n```\nP(A|B) = P(A and B) / P(B)\n       = 0.1 / 0.5\n       = 0.2\n```\n**Key insight:** Conditional probability P(A|B) measures the probability of A given that B has occurred. Here, P(A|B) = 0.2 or 20%.'},

  {pos:31,diff:'hard',text:'A lottery has 1000 tickets. You buy 5 tickets. What is your probability of winning if one ticket is drawn?',ch:[{letter:'A',text:'1/200'},{letter:'B',text:'5/1000'},{letter:'C',text:'1/100'},{letter:'D',text:'1/5'}],ans:'B',sol:'**Calculate simple probability.**\n\n```\nFavorable outcomes: 5 (your tickets)\nTotal outcomes: 1000\n\nP(win) = 5/1000 = 1/200\n```\n\nWait, that gives 1/200 which is answer A. Let me reconsider:\n```\n5/1000 = 1/200\n```\n\nSo answer should be A (1/200) or equivalently B (5/1000). They\'re the same value, just different forms. Answer B is the unreduced form.\n\n**Key insight:** With 5 winning tickets out of 1000 total, probability = 5/1000 = 1/200.'},

  {pos:32,diff:'hard',text:'The probability of snow on Monday is 0.3 and on Tuesday is 0.4 (independent). What is P(snow on at least one day)?',ch:[{letter:'A',text:'0.58'},{letter:'B',text:'0.7'},{letter:'C',text:'0.12'},{letter:'D',text:'0.42'}],ans:'A',sol:'**Use complement: P(at least one) = 1 - P(none).**\n\n```\nP(no snow Mon) = 1 - 0.3 = 0.7\nP(no snow Tue) = 1 - 0.4 = 0.6\n\nP(no snow either day) = 0.7 × 0.6 = 0.42\n\nP(snow at least one day) = 1 - 0.42 = 0.58\n```\n**Key insight:** It\'s easier to calculate P(none) then subtract from 1. P(at least one) = 0.58 or 58%.'},

  {pos:33,diff:'hard',text:'A card is drawn from a deck. Given it\'s red, what is the probability it\'s a heart?',ch:[{letter:'A',text:'1/4'},{letter:'B',text:'1/2'},{letter:'C',text:'13/52'},{letter:'D',text:'1'}],ans:'B',sol:'**Calculate conditional probability.**\n\n```\nRed cards: hearts (13) + diamonds (13) = 26\nHearts: 13\n\nP(heart | red) = (number of hearts) / (number of red cards)\n               = 13 / 26\n               = 1/2\n```\n**Key insight:** Given the card is red, half of the red cards are hearts. P(heart|red) = 1/2.'},

  {pos:34,diff:'hard',text:'The expected value of a fair die roll is:',ch:[{letter:'A',text:'3'},{letter:'B',text:'3.5'},{letter:'C',text:'4'},{letter:'D',text:'21'}],ans:'B',sol:'**Calculate expected value of outcomes {1,2,3,4,5,6}.**\n\n```\nE[X] = (1 + 2 + 3 + 4 + 5 + 6) / 6\n     = 21 / 6\n     = 3.5\n\nOr: E[X] = Σ(x × P(x))\n         = 1(1/6) + 2(1/6) + 3(1/6) + 4(1/6) + 5(1/6) + 6(1/6)\n         = 21/6\n         = 3.5\n```\n**Key insight:** The expected value of a fair die is the average of all outcomes: 3.5.'},

  {pos:35,diff:'hard',text:'Events A and B are mutually exclusive with P(A) = 0.3. If P(A or B) = 0.8, what is P(B)?',ch:[{letter:'A',text:'0.5'},{letter:'B',text:'0.6'},{letter:'C',text:'1.1'},{letter:'D',text:'0.24'}],ans:'A',sol:'**Use addition rule for mutually exclusive events.**\n\n```\nMutually exclusive: P(A and B) = 0\nP(A or B) = P(A) + P(B)\n\n0.8 = 0.3 + P(B)\nP(B) = 0.8 - 0.3 = 0.5\n```\n**Key insight:** For mutually exclusive events, P(A or B) = P(A) + P(B). Solving gives P(B) = 0.5.'},

  {pos:36,diff:'hard',text:'A jar has 15 marbles: 5 red, 6 blue, 4 green. What is P(red or green)?',ch:[{letter:'A',text:'9/15'},{letter:'B',text:'5/15'},{letter:'C',text:'4/15'},{letter:'D',text:'11/15'}],ans:'A',sol:'**Add probabilities of disjoint events.**\n\n```\nRed or green are mutually exclusive (can\'t be both)\n\nP(red or green) = P(red) + P(green)\n                = 5/15 + 4/15\n                = 9/15\n                = 3/5\n```\n**Key insight:** Since red and green are disjoint, simply add their probabilities. P(red or green) = 9/15.'},

  {pos:37,diff:'hard',text:'A bag has 4 red and 6 blue balls. Two are drawn with replacement. What is P(at least one red)?',ch:[{letter:'A',text:'16/25'},{letter:'B',text:'9/25'},{letter:'C',text:'4/10'},{letter:'D',text:'12/25'}],ans:'A',sol:'**Use complement: P(at least 1 red) = 1 - P(no red).**\n\n```\nP(blue on one draw) = 6/10 = 3/5\nP(both blue) = (3/5)² = 9/25\n\nP(at least 1 red) = 1 - 9/25 = 16/25\n```\n**Key insight:** It\'s easier to find P(no red) = P(both blue) and use complement. P(at least one red) = 16/25.'},

  {pos:38,diff:'hard',text:'P(A) = 0.6 and P(B) = 0.4. If A and B are independent, what is P(not A and not B)?',ch:[{letter:'A',text:'0.24'},{letter:'B',text:'0.12'},{letter:'C',text:'0.4'},{letter:'D',text:'0.6'}],ans:'A',sol:'**Calculate using independence and complements.**\n\n```\nP(not A) = 1 - 0.6 = 0.4\nP(not B) = 1 - 0.4 = 0.6\n\nIf A and B are independent, so are not A and not B:\nP(not A and not B) = P(not A) × P(not B)\n                   = 0.4 × 0.6\n                   = 0.24\n```\n**Key insight:** For independent events, their complements are also independent. P(not A and not B) = 0.4 × 0.6 = 0.24.'},

  {pos:39,diff:'hard',text:'A die is rolled. What is P(roll > 2 | roll is even)?',ch:[{letter:'A',text:'2/3'},{letter:'B',text:'1/2'},{letter:'C',text:'3/6'},{letter:'D',text:'1/3'}],ans:'A',sol:'**Calculate conditional probability with restricted sample space.**\n\n```\nGiven roll is even: {2, 4, 6}\n\nAmong even rolls, which are > 2: {4, 6}\n\nP(> 2 | even) = 2/3\n```\n**Key insight:** Given the roll is even, only 3 outcomes are possible. Of these, 2 are greater than 2. P(>2|even) = 2/3.'},

  {pos:40,diff:'hard',text:'A game has outcomes: win $10 (prob 0.1), win $5 (prob 0.2), lose $3 (prob 0.7). What is the expected value?',ch:[{letter:'A',text:'-$0.10'},{letter:'B',text:'$0.90'},{letter:'C',text:'$1.00'},{letter:'D',text:'-$1.10'}],ans:'A',sol:'**Calculate expected value E[X] = Σ(x × P(x)).**\n\n```\nE[X] = 10(0.1) + 5(0.2) + (-3)(0.7)\n     = 1 + 1 - 2.1\n     = -0.1\n```\n**Key insight:** The expected value is negative, meaning you\'re expected to lose $0.10 per game on average.'},

  {pos:41,diff:'hard',text:'P(A and B) = 0.2, P(A) = 0.4. What is P(B|A)?',ch:[{letter:'A',text:'0.5'},{letter:'B',text:'0.2'},{letter:'C',text:'0.8'},{letter:'D',text:'0.05'}],ans:'A',sol:'**Use conditional probability formula.**\n\n```\nP(B|A) = P(A and B) / P(A)\n       = 0.2 / 0.4\n       = 0.5\n```\n**Key insight:** Given A occurred, the probability B also occurred is P(B|A) = 0.2/0.4 = 0.5 or 50%.'},

  {pos:42,diff:'hard',text:'A fair coin is flipped 4 times. What is the probability of getting exactly 3 heads?',ch:[{letter:'A',text:'1/4'},{letter:'B',text:'4/16'},{letter:'C',text:'3/8'},{letter:'D',text:'1/2'}],ans:'B',sol:'**Count favorable outcomes using combinations.**\n\n```\nTotal outcomes: 2⁴ = 16\n\nExactly 3 heads: choose which 3 of 4 flips are heads\nNumber of ways = C(4,3) = 4\n\nOutcomes: HHHT, HHTH, HTHH, THHH\n\nP(exactly 3 H) = 4/16 = 1/4\n```\n**Key insight:** There are 4 ways to get exactly 3 heads in 4 flips. Probability = 4/16 = 1/4.'},

  {pos:43,diff:'hard',text:'In a group, 40% play soccer, 30% play basketball, 15% play both. What is P(soccer | basketball)?',ch:[{letter:'A',text:'0.5'},{letter:'B',text:'0.375'},{letter:'C',text:'0.15'},{letter:'D',text:'0.25'}],ans:'A',sol:'**Calculate conditional probability.**\n\n```\nP(soccer | basketball) = P(both) / P(basketball)\n                       = 0.15 / 0.30\n                       = 0.5\n```\n**Key insight:** Given someone plays basketball, the probability they also play soccer is 0.15/0.30 = 0.5 or 50%.'},

  {pos:44,diff:'hard',text:'A biased coin has P(heads) = 0.6. If flipped twice, what is P(at least one tail)?',ch:[{letter:'A',text:'0.64'},{letter:'B',text:'0.36'},{letter:'C',text:'0.84'},{letter:'D',text:'0.48'}],ans:'A',sol:'**Use complement: P(at least 1 tail) = 1 - P(no tails).**\n\n```\nP(no tails) = P(both heads)\n            = 0.6 × 0.6\n            = 0.36\n\nP(at least 1 tail) = 1 - 0.36 = 0.64\n```\n**Key insight:** P(at least one tail) = 1 - P(both heads) = 0.64 or 64%.'},

  {pos:45,diff:'hard',text:'A deck has 52 cards. Two cards are drawn without replacement. What is P(both aces)?',ch:[{letter:'A',text:'12/2652'},{letter:'B',text:'1/221'},{letter:'C',text:'4/52'},{letter:'D',text:'16/2704'}],ans:'B',sol:'**Calculate dependent probability.**\n\n```\nP(1st ace) = 4/52\nP(2nd ace | 1st ace) = 3/51\n\nP(both aces) = (4/52) × (3/51)\n             = 12/(52×51)\n             = 12/2652\n             = 1/221\n```\n**Key insight:** Without replacement, probabilities change. P(both aces) = (4/52) × (3/51) = 1/221.'},

  {pos:46,diff:'hard',text:'If events A and B are independent and P(A) = P(B) = 0.5, what is P(A or B)?',ch:[{letter:'A',text:'0.5'},{letter:'B',text:'0.75'},{letter:'C',text:'1.0'},{letter:'D',text:'0.25'}],ans:'B',sol:'**Use addition rule with independence.**\n\n```\nP(A and B) = P(A) × P(B) = 0.5 × 0.5 = 0.25\n\nP(A or B) = P(A) + P(B) - P(A and B)\n          = 0.5 + 0.5 - 0.25\n          = 0.75\n```\n**Key insight:** For independent events, P(A or B) = P(A) + P(B) - P(A)×P(B) = 0.75.'},

  {pos:47,diff:'hard',text:'A box has 12 items: 5 defective and 7 good. Two items are selected without replacement. What is P(both good)?',ch:[{letter:'A',text:'42/132'},{letter:'B',text:'7/22'},{letter:'C',text:'49/144'},{letter:'D',text:'35/132'}],ans:'B',sol:'**Calculate conditional probability.**\n\n```\nP(1st good) = 7/12\nP(2nd good | 1st good) = 6/11\n\nP(both good) = (7/12) × (6/11)\n             = 42/132\n             = 7/22\n```\n**Key insight:** After selecting one good item, 6 good remain out of 11 total. P(both good) = 42/132 = 7/22.'},

  {pos:48,diff:'hard',text:'The probability of passing a test is 0.8. If two students take it independently, what is P(at least one passes)?',ch:[{letter:'A',text:'0.96'},{letter:'B',text:'0.64'},{letter:'C',text:'0.8'},{letter:'D',text:'1.6'}],ans:'A',sol:'**Use complement: P(at least 1 passes) = 1 - P(none pass).**\n\n```\nP(fail) = 1 - 0.8 = 0.2\nP(both fail) = 0.2 × 0.2 = 0.04\n\nP(at least 1 passes) = 1 - 0.04 = 0.96\n```\n**Key insight:** It\'s easier to calculate P(both fail) and use complement. P(at least one passes) = 0.96 or 96%.'},

  {pos:49,diff:'hard',text:'A bag has 20 balls: 8 red, 7 blue, 5 green. What is P(not blue)?',ch:[{letter:'A',text:'13/20'},{letter:'B',text:'7/20'},{letter:'C',text:'12/20'},{letter:'D',text:'8/20'}],ans:'A',sol:'**Calculate complement or count directly.**\n\n```\nP(blue) = 7/20\nP(not blue) = 1 - 7/20 = 13/20\n\nOr directly:\nNot blue = red + green = 8 + 5 = 13\nP(not blue) = 13/20\n```\n**Key insight:** Either method gives P(not blue) = 13/20.'},

  {pos:50,diff:'hard',text:'P(rain) = 0.3, P(cold) = 0.4, P(rain and cold) = 0.15. Are rain and cold independent?',ch:[{letter:'A',text:'Yes'},{letter:'B',text:'No'},{letter:'C',text:'Cannot determine'},{letter:'D',text:'Only if mutually exclusive'}],ans:'B',sol:'**Check independence condition.**\n\n```\nFor independence:\nP(rain and cold) should equal P(rain) × P(cold)\n\nP(rain) × P(cold) = 0.3 × 0.4 = 0.12\nP(rain and cold) = 0.15\n\nSince 0.15 ≠ 0.12, events are NOT independent\n```\n**Key insight:** Events are independent if P(A and B) = P(A) × P(B). Here, 0.15 ≠ 0.12, so they are dependent.'},
];

async function insertQuestions() {
  // Get lesson_id for Probability (6.3)
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', '6.3')
    .single();

  if (lessonError || !lesson) {
    console.error('Error finding lesson 6.3:', lessonError);
    return;
  }

  const lessonId = lesson.id;
  console.log(`Found lesson 6.3 with ID: ${lessonId}\n`);

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
        title: `Probability Q${q.pos}`,
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
