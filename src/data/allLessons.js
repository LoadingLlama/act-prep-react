// This file will contain ALL lesson content from all 4 JS files
// I need to manually extract and compile all lessons with their complete content

export const allLessons = {
  // English lessons
  'getting-started': {
    title: 'Getting Started with the ACT',
    duration: 12, // minutes
    content: `
      <h3>Welcome to ACT Prep!</h3>
      <p>The ACT is a standardized test that measures your knowledge and skills in English, Mathematics, Reading, and Science. Understanding the test format and developing effective strategies are crucial for success.</p>

      <h3>Test Structure</h3>
      <p>The ACT consists of four main sections:</p>
      <ul>
          <li><strong>English (45 minutes, 75 questions):</strong> Tests grammar, usage, punctuation, and rhetorical skills</li>
          <li><strong>Mathematics (60 minutes, 60 questions):</strong> Covers algebra, geometry, and trigonometry</li>
          <li><strong>Reading (35 minutes, 40 questions):</strong> Tests reading comprehension across various subjects</li>
          <li><strong>Science (35 minutes, 40 questions):</strong> Evaluates interpretation and analysis of scientific data</li>
      </ul>

      <h3>Scoring</h3>
      <p>Each section is scored from 1-36, and your composite score is the average of all four sections. Most colleges consider a score of 20+ competitive, while top universities typically look for scores of 30+.</p>

      <h3>Study Strategy</h3>
      <p>Effective ACT preparation involves:</p>
      <ul>
          <li>Taking a diagnostic test to identify strengths and weaknesses</li>
          <li>Focusing study time on areas that need the most improvement</li>
          <li>Learning test-specific strategies and time management techniques</li>
          <li>Taking multiple practice tests to build stamina and familiarity</li>
          <li>Reviewing mistakes and understanding why correct answers are right</li>
      </ul>

      <p>Remember: consistent, focused practice is more effective than cramming. Start with your weakest areas and gradually build confidence across all sections.</p>
    `
  },

  'sentence-structure': {
    title: 'Chapter 1: Sentence Structure',
    duration: 18, // minutes
    content: `
            <p class="lesson-intro">Want to ace the ACT English section? It all starts with understanding how sentences work. Think of sentences like LEGO blocks - they have to fit together the right way, or everything falls apart!</p>

            <h3>Understanding the Building Blocks</h3>
            <p>Every sentence is built from <strong>clauses</strong> - groups of words that have both a subject (who or what) and a verb (what's happening). There are two main types you need to know:</p>

            <div class="concept-box">
                <h4>Independent Clauses (The Complete Thoughts)</h4>
                <p>An <strong>independent clause</strong> is like a complete text message - it makes total sense by itself. It has everything it needs: someone doing something. Here's the easy test: read it out loud and see if you naturally want to stop at the end. If yes, it's independent!</p>
                <p><strong>Perfect examples:</strong></p>
                <ul>
                    <li>The dog chased its tail.</li>
                    <li>Monique made some homemade peach scones for breakfast.</li>
                    <li>He picked it up.</li>
                    <li>The excited child opened up his present.</li>
                </ul>
            </div>

            <div class="concept-box">
                <h4>Dependent Clauses (The Incomplete Thoughts)</h4>
                <p>A <strong>dependent clause</strong> is like leaving someone hanging mid-conversation. It starts with words that make you go "...and then what?" These starter words (we call them subordinating conjunctions) create a cliffhanger that needs more information.</p>
                <p><strong>Common cliffhanger starters:</strong> after, although, as, because, before, even though, if, in order to, once, since, though, that, unless, until, whatever, when, whenever, whether, where, while</p>
                <p><strong>Examples that leave you hanging:</strong></p>
                <ul>
                    <li>While the dog chased its tail...</li>
                    <li>Although Monique made some homemade peach scones for breakfast...</li>
                    <li>Since he picked it up...</li>
                    <li>When the excited child opened up his present...</li>
                </ul>
            </div>

            <div class="concept-box">
                <h4>Phrases (The Missing Pieces)</h4>
                <p>A <strong>phrase</strong> is missing either the "who" or the "what's happening" (or both). Think of it like a half-finished thought that gives you extra details but can't stand alone. These are the supporting actors, not the main characters.</p>
                <p><strong>Examples of incomplete thoughts:</strong></p>
                <ul>
                    <li>Chasing its tail... (who is chasing?)</li>
                    <li>Making some homemade peach scones for breakfast... (who is making them?)</li>
                    <li>Picking it up... (who picked what up?)</li>
                    <li>Excited to open up his present... (who is excited?)</li>
                </ul>
            </div>

            <div class="tip-box">
                <h4>Quick Test: Can You Stop Talking?</h4>
                <p>Here's the simplest way to tell these apart: Read each part out loud in your head. If it feels natural to stop talking, you've got an independent clause. If you feel like you HAVE to keep going, it's either dependent or just a phrase.</p>
                <p>For dependent vs. phrase: Cover up the first word and read what's left. If it becomes a complete thought, you had a dependent clause. If it's still incomplete, it was just a phrase.</p>
                <p><strong>Try it yourself:</strong></p>
                <ul>
                    <li><strong>Complete thought:</strong> My brother Adam eats cookies every day.</li>
                    <li><strong>Needs more info:</strong> When my brother Adam eats cookies every day...</li>
                    <li><strong>Missing pieces:</strong> Eating cookies every day...</li>
                </ul>
            </div>

            <h3>Fixing Broken Sentences</h3>
            <p>Sometimes sentences break because they're missing important parts. <strong>Sentence fragments</strong> are like broken toys - they're missing the pieces they need to work properly.</p>
            <p>Your brain will usually catch these because they just sound wrong. Trust your instincts!</p>

            <div class="example-box">
                <p><strong>Broken:</strong> The student running to get to class on time. <em>(What did the student DO?)</em></p>
                <p><strong>Fixed:</strong> The student running to get to class on time dropped her water bottle.</p>
                <p><strong>Broken:</strong> Excited to go to the beach and surf. <em>(WHO is excited?)</em></p>
                <p><strong>Fixed:</strong> My little brother Shaun is excited to go to the beach and surf.</p>
            </div>

            <h3>The 5 Golden Rules for Connecting Ideas</h3>
            <p>Now for the fun part! When you have multiple complete thoughts, you need to connect them properly. Think of it like connecting train cars - there are only 5 safe ways to do it, and the ACT loves to test whether you know them.</p>

            <div class="fanboys-tip">
                <h4>Remember FANBOYS - Your New Best Friends!</h4>
                <p><strong>These 7 connecting words are VIP pass holders:</strong></p>
                <ul>
                    <li><strong>F</strong>or (because)</li>
                    <li><strong>A</strong>nd (plus)</li>
                    <li><strong>N</strong>or (and not)</li>
                    <li><strong>B</strong>ut (however)</li>
                    <li><strong>O</strong>r (choice)</li>
                    <li><strong>Y</strong>et (but)</li>
                    <li><strong>S</strong>o (therefore)</li>
                </ul>
            </div>

            <div class="rules-box">
                <h4>The 5 Ways to Connect Complete Thoughts:</h4>
                <ol>
                    <li><strong>Keep them totally separate with periods.</strong><br>
                        <em>Sarah loves hiking. Her brother prefers video games.</em><br>
                        <span class="clause-label">Complete thought → Complete thought</span></li>

                    <li><strong>Use comma + FANBOYS to join them.</strong><br>
                        <em>Sarah loves hiking, but her brother prefers video games.</em><br>
                        <span class="clause-label">Complete thought → Complete thought</span></li>

                    <li><strong>Connect with a semicolon (fancy period).</strong><br>
                        <em>Sarah loves hiking; her brother prefers video games.</em><br>
                        <span class="clause-label">Complete thought → Complete thought</span><br>
                        <em>*Semicolons work exactly like periods on the ACT!</em></li>

                    <li><strong>Start with incomplete, then complete (needs comma).</strong><br>
                        <em>Although Sarah loves hiking, her brother prefers video games.</em><br>
                        <span class="clause-label">Incomplete thought → Complete thought</span></li>

                    <li><strong>Complete thought flows into incomplete (no comma).</strong><br>
                        <em>Sarah loves hiking while her brother prefers video games.</em><br>
                        <span class="clause-label">Complete thought → Incomplete thought</span></li>
                </ol>
            </div>

            <p><strong>These 5 rules are your lifeline!</strong> The ACT will try to trick you with answers that sound okay but break these rules. Don't fall for it!</p>

            <h3>The Dreaded Comma Splice</h3>
            <p>Here's the #1 mistake that trips up students: thinking a comma can do everything. <strong>A comma by itself CANNOT connect two complete thoughts.</strong> It's like trying to hold a heavy door with just tape - it won't work!</p>

            <div class="example-box">
                <p><strong>Broken:</strong> My phone died during the movie, I missed all the important texts.</p>
                <p><strong>Broken:</strong> The pizza arrived late, we ate it anyway because we were starving.</p>
            </div>

            <p>Both examples have comma splices. Here's how to fix the first one using all 5 rules:</p>

            <div class="correction-box">
                <p><strong>Rule #1:</strong> My phone died during the movie. I missed all the important texts.</p>
                <p><strong>Rule #2:</strong> My phone died during the movie, so I missed all the important texts.</p>
                <p><strong>Rule #3:</strong> My phone died during the movie; I missed all the important texts.</p>
                <p><strong>Rule #4:</strong> When my phone died during the movie, I missed all the important texts.</p>
                <p><strong>Rule #5:</strong> My phone died during the movie because I missed all the important texts.</p>
            </div>

            <div class="tip-box">
                <h4>Spotting These Questions on Test Day</h4>
                <p>Look for these red flags that scream "sentence structure question!":</p>
                <ol>
                    <li><strong>Punctuation party in the answer choices.</strong> See periods, commas, semicolons, or FANBOYS words? You're dealing with sentence structure!</li>
                    <li><strong>Verb confusion.</strong> Some answers have different verb forms (like "swimming" vs. "swims" vs. "swam"). This usually means they're testing sentence completeness.</li>
                </ol>
            </div>

            <h3>Your Three-Step Game Plan</h3>
            <p>When you spot a sentence structure question, follow this simple process:</p>
            <ol>
                <li><strong>Find the connection point</strong> - Where are they trying to join ideas?</li>
                <li><strong>Check both sides</strong> - Is each side a complete thought or incomplete?</li>
                <li><strong>Pick the right rule</strong> - Match it to one of your 5 connection methods.</li>
            </ol>

            <div class="practice-box">
                <h4>Practice Time!</h4>
                <p><em>The concert tickets sold out in minutes, thousands of fans were disappointed.</em></p>
                <p><strong>Question:</strong> Which version fixes this sentence best?</p>
                <ul>
                    <li>A. NO CHANGE</li>
                    <li>B. minutes, and thousands</li>
                    <li>C. minutes; leaving thousands</li>
                    <li>D. minutes. Thousands</li>
                </ul>
                <p><strong>Answer:</strong> B – We need comma + FANBOYS to connect two complete thoughts. Option A is a comma splice, C changes meaning, and D works but B flows better.</p>
            </div>

            <div class="key-takeaway">
                <h4>Bottom Line</h4>
                <p>Nail these 5 connection rules and you'll crush sentence structure questions! The trick is recognizing when you're looking at complete vs. incomplete thoughts. When you see punctuation in the answers, think "connection rules" and you'll be golden.</p>
            </div>

            <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Sentence Structure",
                description: "Test your understanding with these ACT-style questions.",
                questions: [
                    {
                        id: 1,
                        passage: "The new coffee shop opened last week, it already has a long line of customers every morning.",
                        question: "Which choice makes the sentence grammatically correct?",
                        choices: [
                            "NO CHANGE",
                            "week, and it",
                            "week; it",
                            "week. It"
                        ],
                        correct: 1,
                        explanation: "We need comma + FANBOYS to connect two complete thoughts. Option A is a comma splice."
                    },
                    {
                        id: 2,
                        passage: "Although the weather was perfect for hiking. We decided to stay home and watch movies instead.",
                        question: "Which choice fixes the sentence fragment?",
                        choices: [
                            "NO CHANGE",
                            "hiking, we",
                            "hiking we",
                            "hiking; we"
                        ],
                        correct: 1,
                        explanation: "A dependent clause followed by an independent clause needs a comma, not a period."
                    },
                    {
                        id: 3,
                        passage: "The students studied hard for the exam they all received excellent grades.",
                        question: "How should this sentence be punctuated?",
                        choices: [
                            "NO CHANGE",
                            "exam, they",
                            "exam; they",
                            "exam. They"
                        ],
                        correct: 2,
                        explanation: "Two independent clauses can be connected with a semicolon (acts like a period)."
                    },
                    {
                        id: 4,
                        passage: "Running through the park in the early morning.",
                        question: "Which choice creates a complete sentence?",
                        choices: [
                            "NO CHANGE",
                            "Running through the park in the early morning, Sarah felt energized.",
                            "Running through the park in the early morning and feeling great.",
                            "Running through the park in the early morning was."
                        ],
                        correct: 1,
                        explanation: "The original is a phrase missing a subject. Option B adds a subject (Sarah) and predicate (felt energized)."
                    },
                    {
                        id: 5,
                        passage: "The concert was amazing, but the parking was terrible, so we almost missed the opening act.",
                        question: "Is this sentence correctly punctuated?",
                        choices: [
                            "YES - correctly punctuated",
                            "NO - remove comma before 'but'",
                            "NO - remove comma before 'so'",
                            "NO - needs semicolons instead"
                        ],
                        correct: 0,
                        explanation: "This sentence correctly uses comma + FANBOYS ('but' and 'so') to connect three independent clauses."
                    }
                ]
            }
        ]
    }
  },

  'commas': {
    title: 'Chapter 2: Commas - 4 Types',
    duration: 15, // minutes
    content: `
      <p class="lesson-intro">Commas are the most common type of punctuation on the English Test. In order to successfully handle comma questions, we need to become familiar with the 4 types of commas that appear on the ACT.</p>

      <h3>The Four Types of Commas on the ACT</h3>
      <p>So far, we have already discussed the first two types of commas from Chapter 1:</p>

      <div class="concept-box">
          <h4>1. Comma + FANBOYS</h4>
          <p><strong>Correct:</strong> My alarm clock did not go off this morning, so I arrived late at school.</p>
          <p>Use a comma and a FANBOYS (for, and, nor, but, or, yet, so) to join two independent clauses.</p>
      </div>

      <div class="concept-box">
          <h4>2. Dependent clause followed by independent clause</h4>
          <p><strong>Correct:</strong> While electronic music has become very popular, many people still prefer classic rock.</p>
          <p>If a sentence has a dependent clause followed by an independent clause, you must link these with a comma.</p>
      </div>

      <p>Next, we will learn the other 2 types of commas in English and on the ACT:</p>

      <div class="concept-box">
          <h4>3. Unnecessary Information</h4>
          <p>Commas are used to separate unnecessary information from the rest of the sentence. Information is unnecessary if we can remove it without fundamentally changing the meaning of the sentence. Unnecessary information can be as short as a single word or as long as a lengthy phrase.</p>
          <p><strong>Example:</strong> Mrs. Ellison, who is known for giving pop quizzes, is my least favorite teacher.</p>
          <p><strong>Example:</strong> The snowboard in the closet, the one with no stickers on it, needs to be waxed.</p>
          <p><strong>Example:</strong> The basketball team, though, did not mount a comeback this week.</p>
      </div>

      <div class="concept-box">
          <h4>4. Listing</h4>
          <p>Commas are used when listing more than two items and with lists of multiple adjectives modifying the same noun.</p>
          <p><strong>Example:</strong> The group at the picnic table ordered coconut shrimp, hot wings, and onion rings.</p>
          <p><strong>Example:</strong> The old, limping dog still managed to complete the 3-mile hike.</p>
      </div>

      <div class="tip-box">
          <h4>TIP – The "Crossing-Out" Trick</h4>
          <p>For unnecessary information commas, you must be able to completely remove the unnecessary information from the sentence. After removing the unnecessary information, what remains must still be a complete sentence that can stand by itself.</p>
          <p><strong>To test if information is unnecessary:</strong> cross out the information and read the sentence without it. If you can cross out the information and the sentence still reads as a complete sentence, the information is unnecessary and needs to be set apart by a comma or commas.</p>
          <p>Let's test with this sentence: <em>The wooden beam, set at an angle, created an optical illusion.</em></p>
          <p>Crossing out "set at an angle": <em>The wooden beam created an optical illusion.</em> ✓ This works!</p>
      </div>
    `
  },

  // I need to add ALL the other lessons here...
  // This is just a start - I need to extract content from all 4 JS files

  // Placeholder for remaining lessons
  'punctuation': {
    title: 'Chapter 3: Other Punctuation',
    duration: 8, // minutes
    content: `<p>This lesson will cover semicolons, colons, dashes, apostrophes, and quotation marks.</p>`
  },

  // Math lessons - comprehensive content
  'introduction-to-act-math': {
    title: 'Introduction to ACT Math',
    duration: 10, // minutes
    content: `
      <p class="lesson-intro">Before we start this book, let's begin by understanding the basic format of the ACT Math Test and general strategies you will need for success.</p>

      <h3>Format of the Test</h3>
      <p>The ACT Math Test consists of one section: a 50-minute section with 45 questions. A calculator is allowed in this section, and you should use your calculator a lot! Even for simple mental math, use the calculator. This will help keep your mind fresh and avoid simple mistakes.</p>

      <h3>Difficulty of the Questions</h3>
      <p>As you progress through the test, the difficulty of the questions increases. The first 5-10 questions in general will be much easier. As you move towards the later questions, the difficulty will increase slightly until around question 30, where the questions will quickly get much more difficult.</p>

      <div class="rules-box">
        <h4>Question Difficulty Breakdown:</h4>
        <table>
          <tr><th>Difficulty</th><th>Question Number</th></tr>
          <tr><td>Very Easy</td><td>1 – 5</td></tr>
          <tr><td>Easy</td><td>6 – 15</td></tr>
          <tr><td>Medium</td><td>16– 30</td></tr>
          <tr><td>Hard</td><td>31 – 45</td></tr>
        </table>
      </div>

      <h3>Time Management</h3>
      <p>On average, you have just over 1 minute (1 minute and 6 seconds to be exact) to answer each question. Some questions can be solved very quickly while others can take much longer to solve. In general, you should be solving the earlier questions in less than 60 seconds, as the later, more difficult questions will require more time.</p>

      <p>If you get to a question that you do not know how to solve, circle the number, bubble in an answer, and move on. You can always come back to the questions that you circled at the end if you have time left.</p>

      <h3>Guessing</h3>
      <p>There is no penalty for guessing. Make sure that you bubble in an answer for every single question. On a multiple-choice test, there is no best method for guessing, so look at the answer choices and pick the answer that looks best to you.</p>

      <div class="key-takeaway">
        <h4>6 Test Day Tips to Maximize Your Score</h4>
        <ol>
          <li><strong>Keep Moving:</strong> Do not get stuck on any one question for too long</li>
          <li><strong>Look For Questions You Know How To Solve:</strong> If time is running out, find questions you can solve quickly</li>
          <li><strong>Do Your Best To See All 45 questions:</strong> Don't get stuck on one hard question and miss easier ones later</li>
          <li><strong>Memorize The Equations:</strong> Having formulas memorized saves time</li>
          <li><strong>Use The Calculator!</strong> Use your calculator as much as possible</li>
          <li><strong>Practice Like Its Test Day:</strong> Set a timer and strictly follow it during practice</li>
        </ol>
      </div>
    `
  },

  'backsolving': {
    title: 'Chapter 1: Backsolving',
    duration: 25, // minutes (includes practice test)
    content: `
      <p class="lesson-intro">In the first two chapters, you will learn two important test-taking techniques: backsolving and substitution. As you work through the rest of the book, use these techniques whenever you can to solve questions.</p>

      <p>Backsolving is plugging the answer choices back into the question. On the ACT, you are given 4 answer choices for multiple choice questions, and one of those 4 choices must be correct. Rather than solving the question algebraically and determining whether your answer matches one of the answer choices, you can guess-and-check with the answer choices to find which one is correct.</p>

      <h3>Backsolving can be done using five steps:</h3>
      <div class="rules-box">
        <ol>
          <li><strong>Start with B or C.</strong> Plug the value in the answer choice back into the question. The answer choices are always in order of smallest to largest or largest to smallest so starting in the middle saves you time.</li>
          <li><strong>Solve the question using this value.</strong> Find any other unknowns if necessary.</li>
          <li><strong>If this answer choice works correctly, you're done!</strong> Bubble it in and move on.</li>
          <li><strong>If this answer choice does not work, cross it off.</strong> If you know the correct answer needs to be smaller or larger than the value you just tried, cross off any other incorrect answers.</li>
          <li><strong>Pick one of the remaining answer choices and plug it back into the question.</strong> Repeat this until you find the correct answer. Remember, one of the 4 answer choices must work!</li>
        </ol>
      </div>

      <div class="example-box">
        <h4>Example 1:</h4>
        <p><strong>Problem:</strong> If √x + 10 − 2√x − 2 = 0, what is the value of x?</p>
        <p>A. 2 &nbsp;&nbsp; B. 6 &nbsp;&nbsp; C. 14 &nbsp;&nbsp; D. 18</p>
        <p><strong>Solution:</strong> The quickest and easiest way to solve this question is backsolving. Finding the correct answer is just a process of guess-and-check. Below, you can see how the correct answer B, when x = 6, makes the equation be true.</p>
        <p>√6 + 10 − 2√6 − 2 = 0<br>
        √16 − 2√4 = 0<br>
        4 − 2(2) = 0<br>
        4 − 4 = 0<br>
        0 = 0</p>
        <p>The answer is B. If we plug in any of the other answer choices, we will get an equation that is not equal on both sides and is incorrect.</p>
      </div>

      <div class="example-box">
        <h4>Example 2:</h4>
        <p><strong>Problem:</strong> Which of the following is a solution to the equation of x³ + 5x² + 6x = 0?</p>
        <p>A) −3 &nbsp;&nbsp; B) −1 &nbsp;&nbsp; C) 1 &nbsp;&nbsp; D) 2</p>
        <p><strong>Solution:</strong> Most students look at this question and think, "Oh no, I need to factor this to solve." However, the easiest way to solve this question is backsolving! We plug the answer choices into the equation to see which one makes it equal 0.</p>
        <p>When x = −3: (−3)³ + 5(−3)² + 6(−3) = 0<br>
        −27 + 45 − 18 = 0<br>
        0 = 0</p>
        <p>The answer is A. If we plug in any other answer choices, the equation will not equal 0.</p>
      </div>

      <h3>Backsolving With Points</h3>
      <p>For questions with points in the question or answer choices, it is often effective to backsolve with points. For this method, we will use the point(s) to test which equation works correctly. Remember, if a point is on a graph, it must make the equation of the graph true.</p>

      <div class="key-takeaway">
        <h4>Key Takeaway</h4>
        <p>Backsolving is often the fastest and easiest way to solve ACT questions, especially if you get stuck and cannot solve a question algebraically, so use it to your advantage.</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `
  },

  'substitution': {
    title: 'Chapter 2: Substitution',
    duration: 20, // minutes
    content: `
      <p class="lesson-intro">Do you prefer working with numbers or variables? We would guess your answer is numbers! On the ACT, some questions have many unknown variables and few or no numbers at all. Students often find these questions more difficult. If you prefer to work with numbers, let's work with numbers! With substitution, we substitute simple numbers in for variables and solve the question using numbers instead of relying on more complex algebra with variables.</p>

      <h3>Substitution can be done with these four steps:</h3>
      <div class="rules-box">
        <ol>
          <li><strong>Pick a number for the variable(s) in the question.</strong>
            <ul>
              <li>Pick easy numbers…avoid using 0 and 1. Use 2, 3, 4 or other easy numbers. Use 10 for percent problems, 10 or 20 for group size, etc.</li>
              <li>Select different numbers for each variable. For example, if a question has an x and a y, pick x = 2 and y = 3.</li>
              <li>Follow any rules in the question. For example, if a question says x is a number that is negative and even, pick x = −2.</li>
            </ul>
          </li>
          <li><strong>Write down the number(s) that you have picked.</strong></li>
          <li><strong>Use your number(s) to work your way through the question and find your answer.</strong></li>
          <li><strong>Plug your number(s) into the answer choices. The correct answer will be the one that matches your answer.</strong></li>
        </ol>
      </div>

      <div class="example-box">
        <h4>Example 1:</h4>
        <p><strong>Problem:</strong> Jeremy has n boxes of candy bars. Each box contains m bars of candy. Jeremy has to sell 70% of his candy bars to make enough money for rent. Which of the following expresses the number of candy bars Jeremy must sell in terms of m and n?</p>
        <p>A. 0.7(m + n) &nbsp;&nbsp; B. 70nm &nbsp;&nbsp; C. nm + m &nbsp;&nbsp; D. 0.7nm</p>
        <p><strong>Solution:</strong> This question may at first seem intimidating with all the variables. To make this question easier, let's plug in numbers. We can say that Jeremy has 2 boxes of candy, so n = 2, and that each box contains 5 bars of candy, so m = 5. With our numbers, Jeremy has a total of 10 candy bars. He needs to sell 70% to make enough money for rent, so we can find the total candy bars that he must sell by finding 70% of 10.</p>
        <p>0.7(10) = 7</p>
        <p>With our numbers, Jeremy must sell 7 candy bars, so our answer is 7. Now, we can plug in the values we selected for n and m into the answer choices and see which one is equal to 7. Here, we find that D works.</p>
        <p>0.7nm = 0.7(2)(5) = 7</p>
        <p>None of the other answer choices are equal to 7 when we plug in our values for n and m. No matter what numbers you pick for n and m, you will find that D is the answer.</p>
      </div>

      <div class="example-box">
        <h4>Example 2:</h4>
        <p><strong>Problem:</strong> If cos (2x°) = a, which of the following must be true for all values of x, in degrees?</p>
        <p>A. sin(2x°) = a &nbsp;&nbsp; B. sin(x° + 90°) = a &nbsp;&nbsp; C. cos(90° − 2x°) = a &nbsp;&nbsp; D. sin(90° − 2x°) = a</p>
        <p><strong>Solution:</strong> The easiest way to solve this question is to pick a value for x and use your calculator. Let's pick x = 10°. First, we need to find out what a equals if x = 10°.</p>
        <p>cos(20°) = 0.9397</p>
        <p>Now that we know what a equals, we can plug in x = 10° for the x-values in the answer choices to see which is equal to 0.9397. Here, we can see how the correct answer choice of D works.</p>
        <p>sin(90° − 20°) = sin(70°) = 0.9397</p>
        <p>This trick will work for any value of x that we pick. The answer is D. Note that since we are solving in degrees, your calculator must be in degree mode.</p>
      </div>

      <div class="example-box">
        <h4>Example 3:</h4>
        <p><strong>Problem:</strong> If the length of a rectangle is tripled and the width is halved, how many times larger is the area of the new rectangle than the area of the original rectangle?</p>
        <p>A. 1.5 &nbsp;&nbsp; B. 2 &nbsp;&nbsp; C. 3 &nbsp;&nbsp; D. 4</p>
        <p><strong>Solution:</strong> To make this question easier, we can pick values for the length and width of the rectangle. Let's make the length 3 and the width 2. Now, we just follow the steps in the questions.</p>
        <ul>
          <li>The length is tripled: 3(3) = 9. The new length is 9.</li>
          <li>The width is halved: 2(1/2) = 1. The new width is 1.</li>
        </ul>
        <p>Next, we find the areas of the rectangles and compare. The new rectangle has an area of 9. The original rectangle has an area of 6, so we find that the new rectangle is 1.5 times as large. The answer is A.</p>
      </div>

      <div class="key-takeaway">
        <h4>Key Takeaway</h4>
        <p>Substitution may seem a bit confusing just reading the steps, but it's extremely useful for making abstract problems concrete. Pick easy numbers, follow any rules in the question, and systematically test your answer choices!</p>
      </div>
    `
  },

  'geometry-angles': {
    title: 'Chapter 3: Geometry Part 1 - Angles',
    duration: 22, // minutes
    content: `
      <p class="lesson-intro">In this chapter, we will cover all the rules you need to know for angles questions on the ACT. For angles questions, put your pencil to work by finding and labeling unknown angles. The more angles you label, the easier it will be to find the angle you need to know to answer the question.</p>

      <h3>Intersecting Lines</h3>
      <p>If two lines intersect, what do we know about the relationships between the angles?</p>
      <div class="rules-box">
        <h4>Key Rules:</h4>
        <ol>
          <li><strong>Vertical angles are equal.</strong></li>
          <li><strong>Adjacent angles are supplementary (x and y add to 180°).</strong></li>
        </ol>
      </div>

      <h3>Parallel Lines</h3>
      <p>Given two parallel lines, we know the following are true:</p>
      <div class="rules-box">
        <ol>
          <li><strong>Vertical angles are equal</strong> (ex: ∠1 = ∠4).</li>
          <li><strong>Alternate interior angles are equal</strong> (ex: ∠3 = ∠6).</li>
          <li><strong>Opposite interior angles are supplementary</strong> (ex: ∠3 + ∠5 = 180° and ∠4 + ∠6 = 180°).</li>
          <li><strong>Corresponding angles are equal</strong> (ex: ∠2 = ∠6).</li>
        </ol>
      </div>

      <p>All those rules and fancy terms are nice, but all you really need to know is that whenever two parallel lines are intersected by another line, there are two sets of identical angles.</p>
      <div class="concept-box">
        <p><strong>∠1 = ∠4 = ∠5 = ∠8</strong></p>
        <p><strong>∠2 = ∠3 = ∠6 = ∠7</strong></p>
        <p>Any of the angles from the first list will be supplementary with any of the angles from the second list. For example, ∠1 + ∠6 = 180° and ∠4 + ∠7 = 180°.</p>
      </div>

      <div class="tip-box">
        <h4>TIP – Extend Parallel Lines</h4>
        <p>Sometimes questions with parallel lines will not always look like the parallel lines in the figure. If the lines just hit and stop (ex: the corner of a parallelogram), take your pencil and extend the lines yourself to make the question look like the figure above. Then, it will be much easier to tell which angles are identical.</p>
      </div>

      <h3>Interior Angles in Polygons</h3>
      <p>You need to know the sum of the interior angles of a…</p>
      <div class="rules-box">
        <table>
          <tr><th>Shape</th><th>Sum of Interior Angles</th></tr>
          <tr><td>Triangle</td><td>180°</td></tr>
          <tr><td>Quadrilateral</td><td>360°</td></tr>
          <tr><td>Pentagon</td><td>540°</td></tr>
          <tr><td>Hexagon</td><td>720°</td></tr>
        </table>

        <h4>For any polygon:</h4>
        <p><strong>Sum of Interior Angles = 180°(n - 2)</strong> where n is the number of sides.</p>
      </div>

      <p>It does not matter what the shape looks like. All that matters for the sum of the interior angles is the number of sides.</p>

      <div class="tip-box">
        <h4>TIP – All figures are drawn to scale</h4>
        <p><strong>All figures on the ACT are drawn to scale!</strong> You can trust the angles and side lengths in the figure. If you are given a figure and do not know how to solve the question, look at the answer choices to see if you can make an educated guess on which answer looks correct.</p>

        <p>The only exception is if you see, "Note: Figure not drawn to scale." This rarely occurs on the ACT, but in case you do see it, do not trust the figure.</p>
      </div>

      <div class="example-box">
        <h4>Example:</h4>
        <p><strong>Problem:</strong> In triangle ABC below, the measure of ∠ABD is 68°, the measure of ∠ACD is 40°, D is on BC, and AD is a bisector of ∠BAC. What is the measure of ∠ADC?</p>
        <p><strong>Solution:</strong> We know that all angles in a triangle add to 180°, so we can use triangle ABC to find ∠BAC.</p>
        <p>∠BAC + ∠ABD + ∠ACD = 180°</p>
        <p>Since we are given ∠ABD = 68° and ∠ACD = 40°, we can solve for ∠BAC.</p>
        <p>∠BAC + 68° + 40° = 180°</p>
        <p>∠BAC = 180° − 68° − 40° = 72°</p>
        <p>The question tells us that AD is a bisector of ∠BAC. A bisector cuts an angle in half, so we know that ∠BAD = ∠CAD = 36°</p>
        <p>Now that we know these angles, we can use triangle ADC to find ∠ADC. We know that ∠ACD = 40° and ∠CAD = 36°. Now we can solve for ∠ADC.</p>
        <p>∠ADC + 40° + 36° = 180°</p>
        <p>∠ADC = 180° − 40° − 36° = 104°</p>
      </div>

      <div class="key-takeaway">
        <h4>Key Takeaway</h4>
        <p>Master the basic angle relationships and the polygon angle formula. As long as you memorize which angles are identical, you will be able to handle parallel lines questions. These concepts appear on almost every ACT Math test!</p>
      </div>
    `
  },

  'geometry-shapes': {
    title: 'Chapter 4: Geometry Part 2 - Shapes',
    duration: 30, // minutes
    content: `
      <p class="lesson-intro">The ACT loves to ask geometry questions, and you will see them throughout the math test. Most commonly, you will need to know how to find the area and volume of various shapes or apply the rules for various types of triangles. However, you will not be given any equations, so you need to memorize all of the equations and rules that are bolded in this chapter.</p>

      <h3>Area and Volume</h3>
      <div class="rules-box">
        <h4>Essential Formulas to Memorize:</h4>
        <table>
          <tr><th>Shape</th><th>Area/Volume</th><th>Perimeter/Circumference</th></tr>
          <tr><td><strong>Triangle</strong></td><td>A = ½bh</td><td>Perimeter = a + b + c</td></tr>
          <tr><td><strong>Rectangle</strong></td><td>A = lw</td><td>Perimeter = 2l + 2w</td></tr>
          <tr><td><strong>Square</strong></td><td>A = s²</td><td>Perimeter = 4s</td></tr>
          <tr><td><strong>Parallelogram</strong></td><td>A = bh</td><td></td></tr>
          <tr><td><strong>Circle</strong></td><td>A = πr²</td><td>C = 2πr</td></tr>
          <tr><td><strong>Trapezoid</strong></td><td>A = ½(b₁ + b₂)h</td><td></td></tr>
          <tr><td><strong>Kite</strong></td><td>A = ½d₁d₂</td><td></td></tr>
          <tr><td><strong>Rectangular Prism</strong></td><td>V = lwh</td><td>SA = 2lw + 2lh + 2wh</td></tr>
          <tr><td><strong>Cube</strong></td><td>V = s³</td><td>SA = 6s²</td></tr>
          <tr><td><strong>Right Cylinder</strong></td><td>V = πr²h</td><td></td></tr>
        </table>
      </div>

      <h3>Areas, Volumes, and Units</h3>
      <p>The ACT loves to ask area or volume questions with various units. The most common are yards and feet or feet and inches. Students often answer these questions incorrectly because they make mistakes with unit conversion, even though the math is very simple.</p>

      <div class="rules-box">
        <h4>Unit Conversions to Memorize:</h4>
        <h5>Yards and Feet</h5>
        <ul>
          <li><strong>1 yard = 3 feet</strong></li>
          <li><strong>1 square yard = 9 square feet</strong></li>
          <li><strong>1 cubic yard = 27 cubic feet</strong></li>
        </ul>

        <h5>Feet and Inches</h5>
        <ul>
          <li><strong>1 foot = 12 inches</strong></li>
          <li><strong>1 square foot = 144 square inches</strong></li>
          <li><strong>1 cubic foot = 1,728 cubic inches</strong></li>
        </ul>
      </div>

      <p><strong>Key Strategy:</strong> Always convert units BEFORE solving for any area or volume.</p>

      <h3>Volumes of Other Three-Dimensional Solids</h3>
      <p>The volume of any three-dimensional shape can be calculating using the equation <strong>V = B × h</strong> where B is the area of the base and h is the height.</p>

      <h3>Right Triangles</h3>
      <div class="rules-box">
        <h4>Pythagorean Theorem:</h4>
        <p><strong>a² + b² = c²</strong></p>
        <p>where a and b are the lengths of the legs and c is the hypotenuse. You can only use the Pythagorean Theorem equation for right triangles.</p>

        <h4>Pythagorean Triples:</h4>
        <p>Pythagorean triples are sets of whole numbers that work in the Pythagorean theorem. On the ACT, you should look out for the two common Pythagorean triples:</p>
        <ul>
          <li><strong>3, 4, 5 Right Triangle</strong></li>
          <li><strong>5, 12, 13 Right Triangle</strong></li>
        </ul>
        <p>These triangles can also be scaled up by multiplying all of the side lengths by the same number to create more Pythagorean triples. For example, a 3, 4, 5 right triangle can be doubled to become a 6, 8, 10 right triangle, tripled to become 9, 12, 15, and so on.</p>
      </div>

      <h3>Special Right Triangles</h3>
      <p>You will need to be familiar with two special right triangles: 45° − 45° − 90° and 30° − 60° − 90°. The side lengths of these triangles are always in a particular ratio.</p>

      <div class="concept-box">
        <h4>45° − 45° − 90°</h4>
        <p>Side ratio: <strong>x : x : x√2</strong></p>

        <h4>30° − 60° − 90°</h4>
        <p>Side ratio: <strong>x : x√3 : 2x</strong></p>
      </div>

      <h3>Similar Triangles</h3>
      <p>Similar triangles are triangles with the same shape but different sizes. The angles are identical, and the side lengths are proportional.</p>

      <div class="rules-box">
        <h4>For similar triangles, the ratio of the side lengths is always the same:</h4>
        <p><strong>AB/DE = BC/EF = AC/DF</strong></p>
      </div>

      <h3>More Triangles</h3>
      <div class="rules-box">
        <ul>
          <li><strong>An equilateral triangle</strong> is a triangle in which all three sides are equal and all angles are equal to 60°.</li>
          <li><strong>An isosceles triangle</strong> is a triangle in which two sides are equal and two angles are equal.</li>
          <li><strong>A scalene triangle</strong> is a triangle with three sides and three angles that are all different.</li>
        </ul>
      </div>

      <h3>Third Side of a Triangle</h3>
      <div class="rules-box">
        <p><strong>The sum of the two shorter sides of a triangle, a and b, must be greater than the longest side of a triangle, c.</strong></p>
        <p><strong>a + b > c</strong></p>
      </div>

      <div class="example-box">
        <h4>Example:</h4>
        <p><strong>Problem:</strong> One side of rectangle ABCD has a length of 9 inches. A square whose area is equal to the area of rectangle ABCD has a side length of 12 inches. What is the width, in inches, of rectangle ABCD?</p>
        <p><strong>Solution:</strong> Since the area of rectangle ABCD and the square are equal, we first find the area of the square.</p>
        <p>A = 12² = 144</p>
        <p>Now, we know the area of rectangle ABCD is 144 square inches and that one side length is 9 inches, so we can solve for the width using A = lw.</p>
        <p>144 = (9)(w)</p>
        <p>w = 16</p>
        <p>The answer is C.</p>
      </div>

      <div class="key-takeaway">
        <h4>Key Takeaway</h4>
        <p>Memorize all the basic area and volume formulas, unit conversions, Pythagorean theorem, and special right triangle ratios. As long as you have the equations memorized, you will be ready to solve any geometry questions with shapes. These appear on every ACT Math test!</p>
      </div>
    `
  },

  // Reading lessons placeholders
  'reading-intro': {
    title: 'Introduction to the Reading Test',
    duration: 12, // minutes
    content: `<p>What is on the ACT Reading Test and what you'll learn in this course.</p>`
  },

  // Science lessons placeholders
  'science-introduction': {
    title: 'Introduction to Science Test',
    duration: 10, // minutes
    content: `<p>Test format, timing, and question types overview.</p>`
  }
};

// Complete list of all lessons from actcourse.html structure
export const lessonStructure = [
  // Introduction
  { id: 'getting-started', section: 'all', title: 'Getting Started with the ACT', desc: 'Test format, timing, and scoring overview', status: 'completed' },

  // English Section
  { id: 'sentence-structure', section: 'english', title: 'Chapter 1: Sentence Structure', desc: 'Independent clauses, dependent clauses, compound sentences, and comma splices', status: 'completed' },
  { id: 'commas', section: 'english', title: 'Chapter 2: Commas - 4 Types', desc: 'Unnecessary information, names rule, listing commas, and adjective lists', status: 'completed' },
  { id: 'punctuation', section: 'english', title: 'Chapter 3: Other Punctuation', desc: 'Semicolons, colons, dashes, apostrophes, and quotation marks', status: 'in-progress' },
  { id: 'verbs', section: 'english', title: 'Chapter 4: Verbs', desc: 'Subject-verb agreement, verb tense, and irregular verbs', status: 'not-started' },
  { id: 'pronouns', section: 'english', title: 'Chapter 5: Pronouns', desc: 'Pronoun case, who vs. whom, pronoun agreement, and ambiguous pronouns', status: 'not-started' },
  { id: 'modifiers', section: 'english', title: 'Chapter 6: Misplaced Modifiers', desc: 'Identifying and correcting misplaced modifiers in sentences', status: 'not-started' },
  { id: 'parallel-structure', section: 'english', title: 'Chapter 7: Parallel Structure', desc: 'Parallel structure in lists and comparisons', status: 'not-started' },
  { id: 'misc-topics', section: 'english', title: 'Chapter 8: Miscellaneous Topics', desc: 'Commonly confused words, active vs. passive voice, and prepositional idioms', status: 'not-started' },
  { id: 'grammar-review', section: 'english', title: 'Chapter 9: Grammar Review', desc: 'Comprehensive review of all grammar concepts', status: 'not-started' },
  { id: 'redundancy', section: 'english', title: 'Chapter 10: Redundancy & Wordiness', desc: 'Identifying and eliminating redundant and wordy expressions', status: 'not-started' },
  { id: 'word-choice', section: 'english', title: 'Chapter 11: Word Choice', desc: 'Selecting the clearest and most precise words in context', status: 'not-started' },
  { id: 'transitions', section: 'english', title: 'Chapter 12: Transitions', desc: 'Choosing logical transitions between sentences and paragraphs', status: 'not-started' },
  { id: 'which-choice', section: 'english', title: 'Chapter 13: Which Choice Questions', desc: 'Answering specific "which choice" questions about content', status: 'not-started' },
  { id: 'adding-deleting', section: 'english', title: 'Chapter 14: Adding or Deleting Information', desc: 'Determining when to add or delete information from passages', status: 'not-started' },
  { id: 'logical-placement', section: 'english', title: 'Chapter 15: Logical Placement', desc: 'Placing sentences in the most logical order within paragraphs', status: 'not-started' },

  // Math Section - Most Common Topics
  { id: 'backsolving', section: 'math', title: 'Chapter 1: Backsolving', desc: 'Powerful test-taking trick for working backwards from answer choices', status: 'not-started' },
  { id: 'substitution', section: 'math', title: 'Chapter 2: Substitution', desc: 'Test-taking strategy for plugging in values', status: 'not-started' },
  { id: 'geometry-angles', section: 'math', title: 'Chapter 3: Geometry Part 1 - Angles', desc: 'Intersecting lines, parallel lines, interior angles', status: 'not-started' },
  { id: 'geometry-shapes', section: 'math', title: 'Chapter 4: Geometry Part 2 - Shapes', desc: 'Area, volume, right triangles, special triangles', status: 'not-started' },
  { id: 'lines', section: 'math', title: 'Chapter 5: Lines', desc: 'Slope, equations of lines, midpoint, distance formulas', status: 'not-started' },
  { id: 'fractions', section: 'math', title: 'Chapter 6: Fractions', desc: 'Operations with fractions and calculator techniques', status: 'not-started' },
  { id: 'algebra-skills', section: 'math', title: 'Chapter 7: Algebra Skills', desc: 'PEMDAS, negative numbers, combining terms', status: 'not-started' },
  { id: 'number-theory', section: 'math', title: 'Chapter 8: Number Theory', desc: 'Types of numbers, GCD, LCM, solution types', status: 'not-started' },
  { id: 'percentages', section: 'math', title: 'Chapter 9: Percentages', desc: 'Percentage calculations, increase/decrease', status: 'not-started' },
  { id: 'ratios-proportions', section: 'math', title: 'Chapter 10: Ratios and Proportions', desc: 'Ratio problems, proportions, direct/indirect variation', status: 'not-started' },
  { id: 'functions', section: 'math', title: 'Chapter 11: Functions', desc: 'Function notation, composition, domain, range', status: 'not-started' },
  { id: 'statistics-basics', section: 'math', title: 'Chapter 12: Mean, Median, Mode, and Range', desc: 'Basic statistics and weighted averages', status: 'not-started' },
  { id: 'exponents-roots', section: 'math', title: 'Chapter 13: Exponents and Roots', desc: 'Exponent rules and simplifying radicals', status: 'not-started' },

  // Math Section - Common Topics
  { id: 'logarithms', section: 'math', title: 'Chapter 14: Logarithms', desc: 'Logarithm basics and change of base rule', status: 'not-started' },
  { id: 'systems-equations', section: 'math', title: 'Chapter 15: Systems of Equations', desc: 'Elimination, substitution, word problems', status: 'not-started' },
  { id: 'quadratics', section: 'math', title: 'Chapter 16: Quadratics', desc: 'Factoring, quadratic formula, vertex form', status: 'not-started' },
  { id: 'trigonometry', section: 'math', title: 'Chapter 17: Trigonometry', desc: 'SOH-CAH-TOA, unit circle, trig functions', status: 'not-started' },

  // Continue with all other math, reading, and science lessons...
  // (I'll need to add all 50+ lessons here)
];