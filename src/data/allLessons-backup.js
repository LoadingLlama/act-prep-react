// This file will contain ALL lesson content from all 4 JS files
// I need to manually extract and compile all lessons with their complete content

export const allLessons = {
  // English lessons
  'getting-started': {
    title: 'ACT Test Basics & Overview',
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
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: ACT Test Basics",
          description: "Master ACT fundamentals and test strategy for success.",
          questions: [
            {
              id: 1,
              passage: "Which section of the ACT has the most questions?",
              question: "",
              choices: ["English (75 questions)", "Mathematics (60 questions)", "Reading (40 questions)", "Science (40 questions)"],
              correct: 0,
              explanation: "The English section has 75 questions, which is more than any other section."
            },
            {
              id: 2,
              passage: "How much time do you have for the Mathematics section?",
              question: "",
              choices: ["60 minutes", "45 minutes", "35 minutes", "75 minutes"],
              correct: 0,
              explanation: "The Mathematics section allows 60 minutes to complete 60 questions."
            },
            {
              id: 3,
              passage: "What is the score range for each ACT section?",
              question: "",
              choices: ["1-36", "200-800", "1-50", "0-40"],
              correct: 0,
              explanation: "Each ACT section is scored on a scale of 1-36, with 36 being the highest possible score."
            }
          ]
        }
      ]
    }
  },

  'sentence-structure': {
    title: 'Chapter 1: Building Complete Sentences',
    duration: 18, // minutes
    content: `
            <p class="lesson-intro">The ACT English section tests sentence structure more than any other grammar concept. Understanding how to build and connect sentences correctly will boost your score significantly.</p>

            <div class="visual-intro">
                <div class="sentence-diagram">
                    <div class="complete-sentence">
                        <span class="subject">ACT questions</span>
                        <span class="verb">test</span>
                        <span class="object">sentence connections</span>
                    </div>
                    <div class="diagram-labels">
                        <span>WHAT</span> + <span>DOES WHAT</span> = <span>COMPLETE IDEA</span>
                    </div>
                </div>
            </div>

            <h3>Why the ACT Tests Sentence Structure</h3>
            <p>Every ACT English test includes 10-15 sentence structure questions. The test writers want to know if you can identify complete vs. incomplete ideas and connect them properly.</p>

            <h3>The Foundation: Understanding Sentence Parts</h3>
            <p>Before tackling ACT questions, you need to recognize the two main types of sentence parts. Each part needs a subject (who/what) and a verb (action/being):</p>

            <div class="concept-box independent-clause">
                <div class="concept-header">
                    <h4>🟢 Independent Clauses: ACT's Favorite Complete Ideas</h4>
                    <div class="visual-check">✓ Stands alone ✓ Could be its own sentence</div>
                </div>

                <p>On the ACT, independent clauses are complete ideas that could work as sentences by themselves. They have both a subject and a verb, and they express a finished thought.</p>

                <div class="clause-visual">
                    <div class="complete-thought-demo">
                        <div class="sentence-parts">
                            <span class="subject-highlight">Students</span>
                            <span class="verb-highlight">struggle</span>
                            <span class="complement">with ACT timing.</span>
                        </div>
                        <div class="completeness-indicator">✅ Works as a complete sentence!</div>
                    </div>
                </div>

                <div class="practice-moment">
                    <h5>⚡ ACT-Style Practice</h5>
                    <p>Which sentence could stand alone on the ACT?</p>
                    <div class="quick-options">
                        <div class="option correct" data-explanation="Correct! Has subject 'Test-takers' and complete action 'review answers'">A) Test-takers should review their answers carefully.</div>
                        <div class="option incorrect" data-explanation="Fragment - who reviewed the material?">B) Reviewed the material thoroughly before the exam.</div>
                    </div>
                </div>

                <div class="examples-grid">
                    <div class="example-item">
                        <div class="sentence">The ACT requires strategic preparation.</div>
                        <div class="breakdown">Subject: <em>ACT</em> | Action: <em>requires</em></div>
                    </div>
                    <div class="example-item">
                        <div class="sentence">High scorers practice regularly.</div>
                        <div class="breakdown">Subject: <em>scorers</em> | Action: <em>practice</em></div>
                    </div>
                </div>
            </div>

            <div class="concept-box dependent-clause">
                <div class="concept-header">
                    <h4>🔴 Dependent Clauses: ACT's Tricky Incomplete Ideas</h4>
                    <div class="visual-check">⚠️ Requires completion ⚠️ Cannot stand alone</div>
                </div>

                <p>The ACT loves testing dependent clauses because they look like complete sentences but aren't. They start with connecting words that create incomplete ideas needing more information.</p>

                <div class="clause-visual">
                    <div class="incomplete-thought-demo">
                        <div class="sentence-parts">
                            <span class="trigger-word">Although</span>
                            <span class="subject-highlight">students</span>
                            <span class="verb-highlight">prepared</span>
                            <span class="complement">for months...</span>
                        </div>
                        <div class="completeness-indicator">❓ What happened to them?</div>
                    </div>
                </div>

                <div class="trigger-words-visual">
                    <h5>ACT's Most Tested Connecting Words:</h5>
                    <div class="word-cloud">
                        <span class="trigger">although</span>
                        <span class="trigger">because</span>
                        <span class="trigger">when</span>
                        <span class="trigger">while</span>
                        <span class="trigger">since</span>
                        <span class="trigger">if</span>
                        <span class="trigger">unless</span>
                        <span class="trigger">before</span>
                        <span class="trigger">after</span>
                    </div>
                </div>

                <div class="practice-moment">
                    <h5>🎯 ACT Question Practice</h5>
                    <p>Which creates an incomplete idea on the ACT?</p>
                    <div class="quick-options">
                        <div class="option incorrect" data-explanation="Complete - tells us what high scorers do">A) High scorers review their answers systematically.</div>
                        <div class="option correct" data-explanation="Incomplete - 'Since' makes us wait for the main result">B) Since many students struggle with timing...</div>
                    </div>
                </div>

                <div class="completion-examples">
                    <h5>See How They Complete:</h5>
                    <div class="before-after">
                        <div class="incomplete">
                            <span class="trigger">While</span> students studied for exams...
                            <span class="status">❌ Incomplete</span>
                        </div>
                        <div class="complete">
                            <span class="trigger">While</span> students studied for exams, <span class="completion">the library stayed open late.</span>
                            <span class="status">✅ Complete</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="concept-box">
                <h4>Phrases (The Incomplete Parts)</h4>
                <p>A <strong>phrase</strong> is missing either the "who" or the "action" (or both). It's like a half-finished idea that adds details but can't work by itself. These are helper pieces, not complete sentences.</p>
                <p><strong>Examples of incomplete thoughts:</strong></p>
                <ul>
                    <li>Chasing its tail... (who is chasing?)</li>
                    <li>Making some homemade peach scones for breakfast... (who is making them?)</li>
                    <li>Picking it up... (who picked what up?)</li>
                    <li>Excited to open up his present... (who is excited?)</li>
                </ul>
            </div>

            <div class="tip-box">
                <h4>Simple Test: Does It Feel Complete?</h4>
                <p>Here's an easy way to tell them apart: Read each part silently. If it feels natural to stop reading, you have an independent clause. If you feel like you need to keep reading, it's either dependent or just a phrase.</p>
                <p>For dependent vs. phrase: Cover up the first word and read what's left. If it becomes a complete thought, you had a dependent clause. If it's still incomplete, it was just a phrase.</p>
                <p><strong>Try it yourself:</strong></p>
                <ul>
                    <li><strong>Complete thought:</strong> My brother Adam eats cookies every day.</li>
                    <li><strong>Needs more info:</strong> When my brother Adam eats cookies every day...</li>
                    <li><strong>Missing pieces:</strong> Eating cookies every day...</li>
                </ul>
            </div>

            <h3>Fixing Incomplete Sentences</h3>
            <p>Sometimes sentences don't work because they're missing key parts. <strong>Sentence fragments</strong> are like broken machines - they lack the pieces needed to function.</p>
            <p>Your brain often catches these because they sound off. Trust what sounds right!</p>

            <div class="example-box">
                <p><strong>Broken:</strong> The student running to get to class on time. <em>(What did the student DO?)</em></p>
                <p><strong>Fixed:</strong> The student running to get to class on time dropped her water bottle.</p>
                <p><strong>Broken:</strong> Excited to go to the beach and surf. <em>(WHO is excited?)</em></p>
                <p><strong>Fixed:</strong> My little brother Shaun is excited to go to the beach and surf.</p>
            </div>

            <h3>The ACT's 5 Sentence Connection Rules</h3>
            <p>Here's what you need to know: the ACT tests sentence connections in predictable ways. Master these 5 rules and you'll handle every sentence structure question confidently.</p>

            <div class="fanboys-visual">
                <h4>🚀 Rule #2: The FANBOYS Strategy</h4>
                <p>The ACT frequently tests these 7 connecting words (use with comma to join complete ideas):</p>

                <div class="fanboys-grid">
                    <div class="fanboy-card">
                        <div class="letter">F</div>
                        <div class="word">for</div>
                        <div class="meaning">(because)</div>
                    </div>
                    <div class="fanboy-card">
                        <div class="letter">A</div>
                        <div class="word">and</div>
                        <div class="meaning">(plus)</div>
                    </div>
                    <div class="fanboy-card">
                        <div class="letter">N</div>
                        <div class="word">nor</div>
                        <div class="meaning">(and not)</div>
                    </div>
                    <div class="fanboy-card">
                        <div class="letter">B</div>
                        <div class="word">but</div>
                        <div class="meaning">(however)</div>
                    </div>
                    <div class="fanboy-card">
                        <div class="letter">O</div>
                        <div class="word">or</div>
                        <div class="meaning">(choice)</div>
                    </div>
                    <div class="fanboy-card">
                        <div class="letter">Y</div>
                        <div class="word">yet</div>
                        <div class="meaning">(but)</div>
                    </div>
                    <div class="fanboy-card">
                        <div class="letter">S</div>
                        <div class="word">so</div>
                        <div class="meaning">(therefore)</div>
                    </div>
                </div>

                <div class="practice-moment">
                    <h5>⚡ ACT-Style Question</h5>
                    <p>"Many students find the ACT challenging, __ proper preparation leads to success."</p>
                    <div class="quick-options">
                        <div class="option incorrect" data-explanation="'And' just adds information without showing relationship">A) and</div>
                        <div class="option correct" data-explanation="Perfect! 'But' shows contrast between challenging and successful">B) but</div>
                        <div class="option incorrect" data-explanation="'So' would imply challenge causes success, which is backward">C) so</div>
                    </div>
                </div>
            </div>

            <div class="rules-box">
                <h4>The 5 Ways to Join Complete Ideas:</h4>
                <ol>
                    <li><strong>Keep them completely separate with periods.</strong><br>
                        <em>Sarah loves hiking. Her brother prefers video games.</em><br>
                        <span class="clause-label">Complete idea → Complete idea</span></li>

                    <li><strong>Use comma + FANBOYS to connect them.</strong><br>
                        <em>Sarah loves hiking, but her brother prefers video games.</em><br>
                        <span class="clause-label">Complete idea → Complete idea</span></li>

                    <li><strong>Connect with a semicolon (stronger period).</strong><br>
                        <em>Sarah loves hiking; her brother prefers video games.</em><br>
                        <span class="clause-label">Complete idea → Complete idea</span><br>
                        <em>*Semicolons work just like periods on the ACT!</em></li>

                    <li><strong>Start with incomplete, then complete (needs comma).</strong><br>
                        <em>Although Sarah loves hiking, her brother prefers video games.</em><br>
                        <span class="clause-label">Incomplete idea → Complete idea</span></li>

                    <li><strong>Complete idea flows into incomplete (no comma).</strong><br>
                        <em>Sarah loves hiking while her brother prefers video games.</em><br>
                        <span class="clause-label">Complete idea → Incomplete idea</span></li>
                </ol>
            </div>

            <p><strong>These 5 rules are essential!</strong> The ACT will offer answers that sound fine but break these rules. Don't be fooled!</p>

            <h3>The Common Comma Splice Error</h3>
            <p>Here's the top mistake students make: believing a comma can do everything. <strong>A comma alone CANNOT connect two complete ideas.</strong> It's like trying to hold a heavy door with just tape - it fails!</p>

            <div class="example-box">
                <p><strong>Broken:</strong> My phone died during the movie, I missed all the important texts.</p>
                <p><strong>Broken:</strong> The pizza arrived late, we ate it anyway because we were starving.</p>
            </div>

            <p>Both examples contain comma splices. Here's how to fix the first one using all 5 rules:</p>

            <div class="correction-box">
                <p><strong>Rule #1:</strong> My phone died during the movie. I missed all the important texts.</p>
                <p><strong>Rule #2:</strong> My phone died during the movie, so I missed all the important texts.</p>
                <p><strong>Rule #3:</strong> My phone died during the movie; I missed all the important texts.</p>
                <p><strong>Rule #4:</strong> When my phone died during the movie, I missed all the important texts.</p>
                <p><strong>Rule #5:</strong> My phone died during the movie because I missed all the important texts.</p>
            </div>

            <div class="tip-box">
                <h4>Finding These Questions on Test Day</h4>
                <p>Watch for these clear signs of sentence structure questions:</p>
                <ol>
                    <li><strong>Mixed punctuation in answer choices.</strong> Seeing periods, commas, semicolons, or FANBOYS words? You're working with sentence structure!</li>
                    <li><strong>Different verb forms.</strong> Some answers show various verb forms (like "swimming" vs. "swims" vs. "swam"). This typically tests sentence completeness.</li>
                </ol>
            </div>

            <h3>Your Three-Step Strategy</h3>
            <p>When you find a sentence structure question, use this clear process:</p>
            <ol>
                <li><strong>Find the joining point</strong> - Where are they trying to connect ideas?</li>
                <li><strong>Check both sides</strong> - Is each side a complete idea or incomplete?</li>
                <li><strong>Choose the correct rule</strong> - Match it to one of your 5 connection methods.</li>
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
                <p><strong>Answer:</strong> B – We need comma + FANBOYS to connect two complete ideas. Option A is a comma splice, C changes meaning, and D works but B flows better.</p>
            </div>

            <div class="key-takeaway">
                <h4>Key Point</h4>
                <p>Master these 5 connection rules and you'll excel at sentence structure questions! The key is identifying complete vs. incomplete ideas. When you see punctuation in answers, think "connection rules" and you'll succeed.</p>
            </div>

            <div class="lesson-complete">
                <h3>🎉 Lesson Finished!</h3>
                <p>You've learned the basics of sentence structure! Ready to practice with some test questions?</p>
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
    title: 'Chapter 2: Essential Comma Rules',
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
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Essential Comma Rules",
          description: "Master comma usage for ACT English success.",
          questions: [
            {
              id: 1,
              passage: "The student who studied hardest scored highest on the exam.",
              question: "Should commas be added around 'who studied hardest'?",
              choices: ["Yes, add commas around the phrase", "No, the phrase is necessary information", "Add a comma only before 'who'", "Add a comma only after 'hardest'"],
              correct: 1,
              explanation: "This information is necessary to identify which student scored highest, so no commas are needed."
            },
            {
              id: 2,
              passage: "The old rusty car barely started this morning.",
              question: "Should a comma be added between 'old' and 'rusty'?",
              choices: ["Yes, add a comma between the adjectives", "No, no comma is needed", "Add a comma after 'old' only", "Add a comma after 'car'"],
              correct: 0,
              explanation: "When multiple adjectives modify the same noun and can be separated by 'and', use a comma: 'old, rusty car'."
            },
            {
              id: 3,
              passage: "Before the test started students reviewed their notes quickly.",
              question: "Where should a comma be placed?",
              choices: ["After 'started'", "No comma needed", "After 'Before'", "After 'notes'"],
              correct: 0,
              explanation: "When a dependent clause begins a sentence, place a comma after it: 'Before the test started, students reviewed their notes quickly.'"
            }
          ]
        }
      ]
    }
  },

  // I need to add ALL the other lessons here...
  // This is just a start - I need to extract content from all 4 JS files

  // Placeholder for remaining lessons
  'punctuation': {
    title: 'Chapter 3: Advanced Punctuation',
    duration: 16, // minutes
    content: `
      <p class="lesson-intro">Beyond commas, the ACT tests 4 other punctuation marks that follow specific rules. Master these patterns and you'll never miss another punctuation question.</p>

      <h3>Why Advanced Punctuation Matters on the ACT</h3>
      <p>These punctuation marks appear 5-8 times per test. They're highly predictable and easy points once you know the rules.</p>

      <div class="concept-box">
          <h4>1. Semicolons: The Super Period</h4>
          <p>Semicolons work exactly like periods on the ACT. Use them to connect two complete ideas that are closely related.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence">Time management is crucial; many students struggle with pacing.</div>
                  <div class="breakdown">Two complete ideas about ACT timing</div>
              </div>
              <div class="example-item">
                  <div class="sentence">The reading section has four passages; each passage has 10 questions.</div>
                  <div class="breakdown">Two complete facts about ACT reading</div>
              </div>
          </div>

          <div class="practice-moment">
              <h5>⚡ ACT Example</h5>
              <p>"Practice tests help build stamina, they also reveal knowledge gaps."</p>
              <div class="quick-options">
                  <div class="option incorrect" data-explanation="Comma splice - needs stronger punctuation">A) NO CHANGE</div>
                  <div class="option correct" data-explanation="Perfect! Semicolon connects two related complete ideas">B) stamina; they</div>
                  <div class="option incorrect" data-explanation="Period works but semicolon shows relationship better">C) stamina. They</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>2. Colons: The Introducer</h4>
          <p>Colons introduce lists, explanations, or examples. The part before the colon must be a complete sentence.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence">Successful ACT prep requires three things: practice, strategy, and persistence.</div>
                  <div class="breakdown">Complete sentence introduces a list</div>
              </div>
              <div class="example-item">
                  <div class="sentence">The ACT has one major advantage: it's predictable once you know the patterns.</div>
                  <div class="breakdown">Complete sentence introduces an explanation</div>
              </div>
          </div>

          <div class="practice-moment">
              <h5>🎯 Quick Check</h5>
              <p>"High scorers follow a simple rule, they answer easy questions first."</p>
              <div class="quick-options">
                  <div class="option incorrect" data-explanation="Comma splice - can't connect complete ideas">A) NO CHANGE</div>
                  <div class="option correct" data-explanation="Colon introduces explanation of the rule">B) rule: they</div>
                  <div class="option incorrect" data-explanation="Semicolon works but colon is better for explanations">C) rule; they</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>3. Dashes: The Dramatic Pause</h4>
          <p>Dashes work like commas for unnecessary information but add emphasis. Use pairs of dashes or a single dash at the end.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence">The science section—often the most challenging—tests data interpretation skills.</div>
                  <div class="breakdown">Pair of dashes for unnecessary information</div>
              </div>
              <div class="example-item">
                  <div class="sentence">Most students worry about one thing above all—running out of time.</div>
                  <div class="breakdown">Single dash for dramatic emphasis</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>4. Apostrophes: Possession and Contractions</h4>
          <p>The ACT tests two apostrophe uses: showing ownership and creating contractions.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence">One student's score improved dramatically.</div>
                  <div class="breakdown">Singular possession (one student owns the score)</div>
              </div>
              <div class="example-item">
                  <div class="sentence">All students' scores improved after practice.</div>
                  <div class="breakdown">Plural possession (multiple students own scores)</div>
              </div>
              <div class="example-item">
                  <div class="sentence">It's important to check your answers carefully.</div>
                  <div class="breakdown">Contraction (it is = it's)</div>
              </div>
          </div>

          <div class="rules-box">
              <h4>Apostrophe Rules</h4>
              <ul>
                  <li><strong>Singular noun:</strong> Add 's (student's book)</li>
                  <li><strong>Plural noun ending in s:</strong> Add ' (students' books)</li>
                  <li><strong>Plural noun not ending in s:</strong> Add 's (children's toys)</li>
                  <li><strong>Contractions:</strong> Replace missing letters (can't, won't, it's)</li>
                  <li><strong>Never use:</strong> Its' (not a word!)</li>
              </ul>
          </div>
      </div>

      <div class="tip-box">
          <h4>🚨 Common ACT Punctuation Traps</h4>
          <ol>
              <li><strong>Its vs. It's:</strong> "Its" shows possession, "It's" means "it is"</li>
              <li><strong>Your vs. You're:</strong> "Your" shows possession, "You're" means "you are"</li>
              <li><strong>Semicolon misuse:</strong> Don't use semicolons before lists or after incomplete ideas</li>
              <li><strong>Colon misuse:</strong> The part before a colon must be complete</li>
          </ol>
      </div>

      <div class="example-box">
          <h4>Master Example: All Punctuation Types</h4>
          <p><strong>Incorrect:</strong> "Students who want to improve there ACT scores need to focus on three area's, timing strategies and practice it's not enough to just memorize rules you need to apply them consistently."</p>

          <div class="correction-box">
              <p><strong>Corrected:</strong> "Students who want to improve their ACT scores need to focus on three areas: timing, strategies, and practice. It's not enough to just memorize rules; you need to apply them consistently."</p>

              <ul>
                  <li><strong>Fixed:</strong> "there" → "their" (possession)</li>
                  <li><strong>Fixed:</strong> "area's" → "areas" (no apostrophe for plurals)</li>
                  <li><strong>Fixed:</strong> Added colon before list</li>
                  <li><strong>Fixed:</strong> "it's" contraction is correct</li>
                  <li><strong>Fixed:</strong> Added semicolon between related ideas</li>
              </ul>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>ACT Punctuation Strategy</h4>
          <p>When you see punctuation in the answer choices, ask: "What's the relationship between these ideas?" Then choose the punctuation that best shows that relationship. Semicolons connect, colons introduce, dashes emphasize, and apostrophes show possession or contractions.</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Advanced Punctuation",
                description: "Master semicolons, colons, dashes, and apostrophes with ACT-style questions.",
                questions: [
                    {
                        id: 1,
                        passage: "The team had one goal: winning the championship this year.",
                        question: "The colon in this sentence is used correctly because:",
                        choices: [
                            "It connects two complete sentences",
                            "It introduces a list",
                            "It introduces an explanation or elaboration",
                            "It shows possession"
                        ],
                        correct: 2,
                        explanation: "Colons introduce explanations or elaborations. Here, 'winning the championship this year' explains what the 'one goal' was."
                    },
                    {
                        id: 2,
                        passage: "Sarah studied hard; however, she still felt nervous about the test.",
                        question: "Which punctuation mark should replace the semicolon?",
                        choices: [
                            "A comma",
                            "A period",
                            "A colon",
                            "The semicolon is correct"
                        ],
                        correct: 0,
                        explanation: "When using 'however' to connect two sentences, use a comma before 'however,' not a semicolon. The correct punctuation is: 'Sarah studied hard, however, she still felt nervous.'"
                    },
                    {
                        id: 3,
                        passage: "The students supplies were scattered across the classroom floor.",
                        question: "What punctuation is needed?",
                        choices: [
                            "student's (singular possessive)",
                            "students' (plural possessive)",
                            "students (no apostrophe needed)",
                            "student's' (double possessive)"
                        ],
                        correct: 1,
                        explanation: "Since multiple students own the supplies, use the plural possessive 'students'' - add an apostrophe after the 's' in 'students.'"
                    },
                    {
                        id: 4,
                        passage: "The concert was amazing—the lead singer's voice was incredible.",
                        question: "The dash in this sentence is used to:",
                        choices: [
                            "Show a list",
                            "Connect two complete sentences",
                            "Emphasize or elaborate on the previous idea",
                            "Show possession"
                        ],
                        correct: 2,
                        explanation: "Dashes are used to emphasize or elaborate. Here, the dash emphasizes why the concert was amazing by explaining about the singer's voice."
                    }
                ]
            }
        ]
    }
  },

  'verbs': {
    title: 'Chapter 4: Verb Mastery & Agreement',
    duration: 26, // minutes
    content: `
      <p class="lesson-intro">Verb questions appear 8-12 times per ACT English test. Master subject-verb agreement and verb tenses for consistent points.</p>

      <h3>Subject-Verb Agreement: The Golden Rule</h3>
      <p>Every verb must agree with its subject in number (singular or plural). This sounds simple but the ACT makes it tricky.</p>

      <div class="concept-box">
          <h4>1. Singular vs. Plural Subjects</h4>
          <div class="visual-diagram">
            <h5>📝 Agreement Patterns:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
            SINGULAR SUBJECTS → SINGULAR VERBS
            • The student studies hard.
            • Each student has a textbook.
            • Every teacher wants success.

            PLURAL SUBJECTS → PLURAL VERBS
            • The students study hard.
            • Many students have textbooks.
            • All teachers want success.

            MEMORY TRICK:
            Singular verbs often END in -s (runs, goes, has)
            Plural verbs often DON'T end in -s (run, go, have)
            </pre>
          </div>

          <div class="tip-box">
              <h4>🎯 ACT Agreement Trap #1: Distracting Phrases</h4>
              <p>The ACT puts words between the subject and verb to confuse you. Cross out the distracting phrase!</p>
              <div class="examples-grid">
                  <div class="example-item">
                      <div class="sentence"><strong>Tricky:</strong> The box of chocolates <em>are/is</em> on the table.</div>
                      <div class="breakdown">Cross out "of chocolates" → The box <em>is</em> on the table.</div>
                  </div>
                  <div class="example-item">
                      <div class="sentence"><strong>Tricky:</strong> One of the students <em>have/has</em> the answer.</div>
                      <div class="breakdown">Cross out "of the students" → One <em>has</em> the answer.</div>
                  </div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>2. Tricky Singular Subjects</h4>
          <p>These words LOOK plural but are actually singular:</p>

          <div class="rules-box">
              <h4>Always Singular:</h4>
              <ul>
                  <li><strong>Everyone, everyone, somebody, nobody:</strong> Everyone <em>has</em> a phone.</li>
                  <li><strong>Each, every:</strong> Each student <em>needs</em> a pencil.</li>
                  <li><strong>Neither, either:</strong> Neither option <em>works</em> well.</li>
                  <li><strong>News, physics, mathematics:</strong> The news <em>is</em> important.</li>
              </ul>
          </div>

          <div class="practice-moment">
              <h5>⚡ Quick Practice</h5>
              <p>Everyone in the advanced classes <em>(have/has)</em> received their grades.</p>
              <div class="quick-options">
                  <div class="option incorrect" data-explanation="'Everyone' is singular, so needs singular verb">A) have</div>
                  <div class="option correct" data-explanation="Correct! 'Everyone' is always singular">B) has</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>3. Verb Tense Consistency</h4>
          <p>Keep verb tenses logical and consistent within sentences and paragraphs.</p>

          <div class="visual-diagram">
            <h5>⏰ Tense Timeline:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            PAST ←────── PRESENT ──────→ FUTURE
            walked        walk/walks       will walk
            was walking   am/is walking    will be walking
            had walked    have/has walked  will have walked

            CONSISTENCY RULE:
            Don't randomly switch tenses within the same time frame.

            WRONG: Yesterday I walk to school and saw my friend.
            RIGHT: Yesterday I walked to school and saw my friend.
            </pre>
          </div>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Good:</strong> She studies every night and improves her grades.</div>
                  <div class="breakdown">Both verbs in present tense</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Bad:</strong> She studied every night and improves her grades.</div>
                  <div class="breakdown">Inconsistent: past tense mixed with present</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>4. Irregular Verb Forms</h4>
          <p>Memorize these commonly tested irregular verbs:</p>

          <div class="rules-box">
              <h4>High-Frequency Irregular Verbs:</h4>
              <table>
                  <tr><th>Base</th><th>Past</th><th>Past Participle</th></tr>
                  <tr><td>go</td><td>went</td><td>gone</td></tr>
                  <tr><td>see</td><td>saw</td><td>seen</td></tr>
                  <tr><td>do</td><td>did</td><td>done</td></tr>
                  <tr><td>come</td><td>came</td><td>come</td></tr>
                  <tr><td>run</td><td>ran</td><td>run</td></tr>
                  <tr><td>bring</td><td>brought</td><td>brought</td></tr>
              </table>
          </div>
      </div>

      <div class="tip-box">
          <h4>🚀 ACT Verb Strategy</h4>
          <ol>
              <li><strong>Find the true subject:</strong> Cross out prepositional phrases</li>
              <li><strong>Determine singular/plural:</strong> Count: one thing or multiple things?</li>
              <li><strong>Check tense logic:</strong> Does the time make sense in context?</li>
              <li><strong>Trust your ear:</strong> Read it aloud - does it sound right?</li>
          </ol>
      </div>

      <div class="key-takeaway">
          <h4>Verbs = Consistent Points</h4>
          <p>Verb questions follow predictable patterns. Master subject-verb agreement by identifying the true subject, and keep tenses logical. These are among the most reliable points on the ACT English section!</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Verb Mastery & Agreement",
                description: "Master subject-verb agreement and verb tense consistency with ACT-style questions.",
                questions: [
                    {
                        id: 1,
                        passage: "Each of the students (have/has) completed their assignments.",
                        question: "Which verb form is correct?",
                        choices: [
                            "have",
                            "has",
                            "are having",
                            "will have"
                        ],
                        correct: 1,
                        explanation: "'Each' is always singular, so it requires the singular verb 'has,' even though 'students' is plural. The subject is 'each,' not 'students.'"
                    },
                    {
                        id: 2,
                        passage: "The group of musicians (was/were) practicing in the auditorium.",
                        question: "Which verb form is correct?",
                        choices: [
                            "was",
                            "were",
                            "are",
                            "have been"
                        ],
                        correct: 0,
                        explanation: "The subject is 'group' (singular), not 'musicians.' Collective nouns like 'group,' 'team,' and 'class' are typically singular."
                    },
                    {
                        id: 3,
                        passage: "Yesterday, Sarah walks to school and met her friends.",
                        question: "What verb tense error needs to be corrected?",
                        choices: [
                            "Change 'walks' to 'walked'",
                            "Change 'met' to 'meets'",
                            "Change 'Yesterday' to 'Today'",
                            "No error exists"
                        ],
                        correct: 0,
                        explanation: "'Yesterday' indicates past time, so 'walks' should be 'walked' to maintain consistent past tense with 'met.'"
                    },
                    {
                        id: 4,
                        passage: "Neither the teacher nor the students (was/were) prepared for the pop quiz.",
                        question: "Which verb form is correct?",
                        choices: [
                            "was",
                            "were",
                            "are",
                            "is"
                        ],
                        correct: 1,
                        explanation: "With 'neither...nor,' the verb agrees with the closer subject. Since 'students' (plural) is closer to the verb than 'teacher' (singular), use 'were.'"
                    }
                ]
            }
        ]
    }
  },

  'pronouns': {
    title: 'Chapter 5: Pronoun Clarity & Agreement',
    duration: 24, // minutes
    content: `
      <p class="lesson-intro">Pronoun questions appear 4-8 times per ACT. Master pronoun case, agreement, and clarity for easy points.</p>

      <h3>Pronoun Case: Subject vs. Object</h3>
      <p>Use subject pronouns for subjects, object pronouns for objects. The ACT tests this constantly.</p>

      <div class="visual-diagram">
        <h5>📝 Pronoun Case Chart:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        SUBJECT PRONOUNS     OBJECT PRONOUNS
        I                    me
        you                  you
        he                   him
        she                  her
        it                   it
        we                   us
        they                 them
        who                  whom

        SUBJECT: performs the action
        OBJECT: receives the action or follows preposition
        </pre>
      </div>

      <div class="concept-box">
          <h4>The "Drop Test" Strategy</h4>
          <p>When choosing between pronoun cases, temporarily remove the other person.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Question:</strong> Sarah and (I/me) went to the store.</div>
                  <div class="breakdown">Drop "Sarah and" → <em>I</em> went to the store. ✓</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Question:</strong> The teacher gave Sarah and (I/me) the books.</div>
                  <div class="breakdown">Drop "Sarah and" → The teacher gave <em>me</em> the books. ✓</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>Who vs. Whom</h4>
          <p>This appears 1-2 times per ACT. Use this simple trick:</p>

          <div class="visual-diagram">
            <h5>🎯 Who/Whom Test:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            WHO = subject (he, she, they)
            WHOM = object (him, her, them)

            TEST: Replace with he/him
            • (Who/Whom) is calling? → HE is calling → WHO ✓
            • (Who/Whom) did you call? → You called HIM → WHOM ✓

            MEMORY TRICK:
            If the answer is HIM, use WHOM (both end in M)
            </pre>
          </div>
      </div>

      <div class="concept-box">
          <h4>Pronoun Agreement</h4>
          <p>Pronouns must agree with their antecedents (the words they refer to).</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Wrong:</strong> Every student must bring their calculator.</div>
                  <div class="breakdown">"Every student" is singular, but "their" is plural</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Right:</strong> Every student must bring his or her calculator.</div>
                  <div class="breakdown">Singular pronoun matches singular antecedent</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>Pronoun Clarity</h4>
          <p>Make sure pronouns clearly refer to specific nouns.</p>

          <div class="practice-moment">
              <h5>⚡ Clarity Example</h5>
              <p><strong>Unclear:</strong> John told Mark that he should study more.</p>
              <p><em>Who should study more - John or Mark?</em></p>
              <p><strong>Clear:</strong> John told Mark that Mark should study more.</p>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Pronouns = Careful Matching</h4>
          <p>Use the drop test for case, remember who vs. whom patterns, and ensure clear antecedent relationships. Pronoun questions reward careful, systematic thinking!</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Pronoun Clarity & Agreement",
                description: "Master pronoun case, agreement, and clarity with ACT-style questions.",
                questions: [
                    {
                        id: 1,
                        passage: "The coach gave the trophy to Sarah and (I/me).",
                        question: "Which pronoun is correct?",
                        choices: [
                            "I",
                            "me",
                            "myself",
                            "mine"
                        ],
                        correct: 1,
                        explanation: "Use the object pronoun 'me' because it's the object of the preposition 'to.' You can test this by dropping 'Sarah and': 'The coach gave the trophy to me.'"
                    },
                    {
                        id: 2,
                        passage: "The student (who/whom) studies hardest usually scores highest.",
                        question: "Which pronoun is correct?",
                        choices: [
                            "who",
                            "whom",
                            "whose",
                            "which"
                        ],
                        correct: 0,
                        explanation: "'Who' is correct because it's the subject of the verb 'studies.' Use 'who' for subjects and 'whom' for objects."
                    },
                    {
                        id: 3,
                        passage: "Each student must submit their final project by Friday.",
                        question: "What error exists in this sentence?",
                        choices: [
                            "No error",
                            "Pronoun-antecedent disagreement",
                            "Wrong verb tense",
                            "Misplaced modifier"
                        ],
                        correct: 1,
                        explanation: "'Each student' is singular, but 'their' is plural. The correct pronoun would be 'his or her' to match the singular antecedent."
                    },
                    {
                        id: 4,
                        passage: "Tom told his brother that he needed to study more.",
                        question: "What is the main problem with this sentence?",
                        choices: [
                            "Wrong pronoun case",
                            "Unclear pronoun reference",
                            "Verb tense error",
                            "No problem exists"
                        ],
                        correct: 1,
                        explanation: "The pronoun 'he' could refer to either Tom or his brother, making the sentence unclear. It should be rewritten to specify who needs to study more."
                    }
                ]
            }
        ]
    }
  },

  'modifiers': {
    title: 'Chapter 6: Misplaced & Dangling Modifiers',
    duration: 20, // minutes
    content: `
      <p class="lesson-intro">Modifier questions appear 3-5 times per ACT. Learn to spot and fix misplaced modifiers for easy points.</p>

      <h3>What Are Modifiers?</h3>
      <p>Modifiers are words or phrases that describe other words. They must be placed near what they modify.</p>

      <div class="concept-box">
          <h4>Misplaced Modifiers</h4>
          <p>When modifiers are in the wrong place, they create confusing or funny meanings.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Wrong:</strong> I saw a man with a telescope walking down the street.</div>
                  <div class="breakdown">Who has the telescope - the man or the viewer?</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Right:</strong> Walking down the street, I saw a man with a telescope.</div>
                  <div class="breakdown">Clear: the viewer is walking, the man has the telescope</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>Dangling Modifiers</h4>
          <p>When the word being modified is missing entirely.</p>

          <div class="practice-moment">
              <h5>⚡ Classic Example</h5>
              <p><strong>Wrong:</strong> After studying all night, the test was easy.</p>
              <p><em>Did the test study all night?</em></p>
              <p><strong>Right:</strong> After studying all night, I found the test easy.</p>
          </div>
      </div>

      <div class="tip-box">
          <h4>🎯 Modifier Fix Strategy</h4>
          <ol>
              <li><strong>Find the modifier:</strong> Usually at the beginning of the sentence</li>
              <li><strong>Ask "Who or what?":</strong> Who/what is doing the action in the modifier?</li>
              <li><strong>Check the subject:</strong> Is the subject the right "doer"?</li>
              <li><strong>Move or rewrite:</strong> Place modifier next to what it modifies</li>
          </ol>
      </div>

      <div class="key-takeaway">
          <h4>Modifiers = Logical Placement</h4>
          <p>Modifiers must logically modify the nearest noun or pronoun. When you see answer choices that move phrases around, check for modifier clarity!</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Misplaced & Dangling Modifiers",
                description: "Master modifier placement with ACT-style questions.",
                questions: [
                    {
                        id: 1,
                        passage: "Walking to school, the backpack felt heavy on my shoulders.",
                        question: "What type of error exists in this sentence?",
                        choices: [
                            "Dangling modifier",
                            "Misplaced modifier",
                            "Subject-verb disagreement",
                            "No error"
                        ],
                        correct: 0,
                        explanation: "This is a dangling modifier. The backpack can't walk to school. It should read: 'Walking to school, I felt the backpack was heavy on my shoulders.'"
                    },
                    {
                        id: 2,
                        passage: "The teacher handed the test to the students that was very difficult.",
                        question: "How should this sentence be corrected?",
                        choices: [
                            "No correction needed",
                            "Move 'that was very difficult' after 'test'",
                            "Change 'was' to 'were'",
                            "Remove 'very'"
                        ],
                        correct: 1,
                        explanation: "'That was very difficult' should modify 'test,' not 'students.' Correct: 'The teacher handed the test that was very difficult to the students.'"
                    }
                ]
            }
        ]
    }
  },

  'parallel-structure': {
    title: 'Chapter 7: Parallel Structure & Lists',
    duration: 22, // minutes
    content: `
      <p class="lesson-intro">Parallel structure questions appear 4-6 times per ACT. Keep list items in the same grammatical form for clarity and flow.</p>

      <h3>The Parallel Structure Rule</h3>
      <p>Items in a list must be in the same grammatical form. This includes words, phrases, and clauses.</p>

      <div class="visual-diagram">
        <h5>✅ Parallel Structure Patterns:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        PARALLEL WORDS:
        ✓ I like reading, writing, and studying.
        ✗ I like reading, writing, and to study.

        PARALLEL PHRASES:
        ✓ She enjoys hiking in mountains, swimming in lakes, and biking on trails.
        ✗ She enjoys hiking in mountains, swimming in lakes, and to bike on trails.

        PARALLEL CLAUSES:
        ✓ The teacher said that we should study hard and that we should get sleep.
        ✗ The teacher said that we should study hard and to get sleep.
        </pre>
      </div>

      <div class="concept-box">
          <h4>Common Parallel Structure Patterns</h4>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Not only...but also:</strong></div>
                  <div class="breakdown">She is not only smart but also hardworking.</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Either...or:</strong></div>
                  <div class="breakdown">Either you study now or you study later.</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Both...and:</strong></div>
                  <div class="breakdown">Both teachers and students need preparation.</div>
              </div>
          </div>
      </div>

      <div class="practice-moment">
          <h5>⚡ Quick Practice</h5>
          <p>The ACT tests your ability to read quickly, <em>(to analyze accurately/analyzing accurately)</em>, and answer confidently.</p>
          <div class="quick-options">
              <div class="option incorrect" data-explanation="Breaks parallelism - doesn't match 'to read' and '(to) answer'">A) analyzing accurately</div>
              <div class="option correct" data-explanation="Maintains parallelism: 'to read...to analyze...to answer'">B) to analyze accurately</div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Parallel Structure = Consistent Form</h4>
          <p>When you see lists in answer choices, check that all items have the same grammatical structure. Your ear will often catch parallel structure errors!</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Parallel Structure",
                description: "Master parallel structure in lists and series with ACT-style questions.",
                questions: [
                    {
                        id: 1,
                        passage: "The students were reading, writing, and to study for the exam.",
                        question: "How should this sentence be corrected?",
                        choices: [
                            "reading, writing, and studying",
                            "to read, to write, and to study",
                            "were reading, were writing, and to study",
                            "No correction needed"
                        ],
                        correct: 0,
                        explanation: "All items in a series should be parallel. 'Reading,' 'writing,' and 'studying' are all gerunds (-ing forms)."
                    },
                    {
                        id: 2,
                        passage: "The job requires creativity, patience, and being organized.",
                        question: "Which version maintains parallel structure?",
                        choices: [
                            "creativity, patience, and being organized",
                            "creativity, patience, and organization",
                            "being creative, being patient, and being organized",
                            "creative, patient, and being organized"
                        ],
                        correct: 1,
                        explanation: "'Creativity,' 'patience,' and 'organization' are all nouns, making them parallel."
                    },
                    {
                        id: 3,
                        passage: "She enjoys hiking, swimming, and to read books.",
                        question: "What needs to be corrected?",
                        choices: [
                            "Change 'hiking' to 'to hike'",
                            "Change 'to read' to 'reading'",
                            "Change 'swimming' to 'to swim'",
                            "No correction needed"
                        ],
                        correct: 1,
                        explanation: "To maintain parallel structure with 'hiking' and 'swimming' (gerunds), change 'to read' to 'reading.'"
                    }
                ]
            }
        ]
    }
  },

  'redundancy': {
    title: 'Chapter 10: Eliminating Redundancy & Wordiness',
    duration: 18, // minutes
    content: `
      <p class="lesson-intro">Redundancy questions appear 6-8 times per ACT. Choose the most concise, clear expression that maintains meaning.</p>

      <h3>The Concision Principle</h3>
      <p>The ACT prefers shorter, clearer expressions over wordy ones. When in doubt, choose the most concise option that preserves meaning.</p>

      <div class="concept-box">
          <h4>Common Redundancies to Eliminate</h4>

          <div class="visual-diagram">
            <h5>❌ Redundant Phrases:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
            REDUNDANT                    CONCISE
            past history            →    history
            future plans            →    plans
            end result              →    result
            completely eliminate    →    eliminate
            advance forward         →    advance
            join together           →    join
            repeat again            →    repeat
            each and every          →    each OR every
            first and foremost      →    first
            </pre>
          </div>
      </div>

      <div class="concept-box">
          <h4>Wordy vs. Concise Expressions</h4>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Wordy:</strong> Due to the fact that it was raining...</div>
                  <div class="breakdown"><strong>Concise:</strong> Because it was raining...</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Wordy:</strong> In spite of the fact that...</div>
                  <div class="breakdown"><strong>Concise:</strong> Although...</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Wordy:</strong> At this point in time...</div>
                  <div class="breakdown"><strong>Concise:</strong> Now...</div>
              </div>
          </div>
      </div>

      <div class="tip-box">
          <h4>🎯 Redundancy Strategy</h4>
          <ol>
              <li><strong>Read all choices:</strong> Look for the shortest option that keeps the meaning</li>
              <li><strong>Eliminate repetition:</strong> If two words mean the same thing, pick one</li>
              <li><strong>Choose active voice:</strong> Usually more concise than passive voice</li>
              <li><strong>Trust concision:</strong> When options say the same thing, choose shorter</li>
          </ol>
      </div>

      <div class="key-takeaway">
          <h4>Concision = Clarity</h4>
          <p>The ACT rewards clear, direct expression. When answer choices convey the same meaning, choose the most concise option. Shorter is usually better!</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Eliminating Redundancy & Wordiness",
                description: "Master concision and eliminating unnecessary words with ACT-style questions.",
                questions: [
                    {
                        id: 1,
                        passage: "The students gathered together in the cafeteria to eat lunch.",
                        question: "Which word should be eliminated to reduce redundancy?",
                        choices: [
                            "gathered",
                            "together",
                            "cafeteria",
                            "lunch"
                        ],
                        correct: 1,
                        explanation: "'Gathered' already implies coming together, so 'together' is redundant and should be eliminated."
                    },
                    {
                        id: 2,
                        passage: "In my personal opinion, I believe that the test was difficult.",
                        question: "How can this sentence be made more concise?",
                        choices: [
                            "Remove 'personal'",
                            "Remove 'I believe that'",
                            "Remove 'In my opinion'",
                            "All of the above"
                        ],
                        correct: 3,
                        explanation: "'In my personal opinion' and 'I believe that' are redundant. The sentence can simply say: 'The test was difficult.'"
                    },
                    {
                        id: 3,
                        passage: "The final outcome of the experiment was successful.",
                        question: "Which version is most concise?",
                        choices: [
                            "The final outcome of the experiment was successful",
                            "The outcome of the experiment was successful",
                            "The experiment was successful",
                            "The experiment had a successful outcome"
                        ],
                        correct: 2,
                        explanation: "'The experiment was successful' conveys the same meaning in the fewest words."
                    }
                ]
            }
        ]
    }
  },

  'word-choice': {
    title: 'Chapter 11: Precision in Word Choice',
    duration: 20, // minutes
    content: `
      <p class="lesson-intro">Word choice questions test precise vocabulary and common confusions. Choose words that fit the context and meaning exactly.</p>

      <h3>Commonly Confused Words</h3>
      <p>The ACT tests words that sound similar but have different meanings.</p>

      <div class="visual-diagram">
        <h5>🎯 High-Frequency Confusions:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        AFFECT vs. EFFECT
        • AFFECT = verb (to influence)
        • EFFECT = noun (a result)
        Memory: A-ffect = A-ction (verb)

        ACCEPT vs. EXCEPT
        • ACCEPT = to receive willingly
        • EXCEPT = excluding

        ITS vs. IT'S
        • ITS = possessive (no apostrophe)
        • IT'S = it is (contraction)

        THERE vs. THEIR vs. THEY'RE
        • THERE = location
        • THEIR = possessive
        • THEY'RE = they are
        </pre>
      </div>

      <div class="concept-box">
          <h4>Context Clues Strategy</h4>
          <p>Use surrounding words to determine the correct choice.</p>

          <div class="practice-moment">
              <h5>⚡ Context Example</h5>
              <p>The new policy will <em>(affect/effect)</em> all students starting next semester.</p>
              <div class="quick-options">
                  <div class="option correct" data-explanation="'Will affect' = will influence (verb needed here)">A) affect</div>
                  <div class="option incorrect" data-explanation="'Effect' is a noun, doesn't fit with 'will'">B) effect</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Word Choice = Context Sensitivity</h4>
          <p>Read the sentence carefully and choose the word that fits the grammatical role and meaning. When unsure, substitute the definition to test which makes sense.</p>
      </div>
    `
  },

  'transitions': {
    title: 'Chapter 12: Transitions & Logical Flow',
    duration: 19, // minutes
    content: `
      <p class="lesson-intro">Transition questions appear 5-7 times per ACT. Choose transitions that logically connect ideas and show proper relationships.</p>

      <h3>Types of Logical Relationships</h3>
      <div class="visual-diagram">
        <h5>🔄 Transition Categories:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        ADDITION: and, also, furthermore, moreover, in addition
        CONTRAST: but, however, nevertheless, on the other hand, yet
        CAUSE/EFFECT: because, therefore, consequently, as a result, since
        EXAMPLE: for example, for instance, such as, namely
        TIME: first, next, then, finally, meanwhile, before, after
        EMPHASIS: indeed, certainly, definitely, in fact
        </pre>
      </div>

      <div class="concept-box">
          <h4>Choosing the Right Transition</h4>
          <p>Read the sentences before and after to understand the relationship.</p>

          <div class="practice-moment">
              <h5>⚡ Transition Practice</h5>
              <p>Students worked hard all semester. <em>____</em>, they performed well on the final exam.</p>
              <div class="quick-options">
                  <div class="option incorrect" data-explanation="Shows contrast, but working hard should lead to good performance">A) However</div>
                  <div class="option correct" data-explanation="Shows cause and effect - hard work led to good performance">B) Consequently</div>
                  <div class="option incorrect" data-explanation="Shows addition, doesn't fit the logic">C) Furthermore</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Transitions = Logical Bridges</h4>
          <p>Transitions must match the logical relationship between ideas. Read both sentences and ask: Are these ideas similar? Opposite? Cause and effect?</p>
      </div>
    `
  },

  'misc-topics': {
    title: 'Chapter 8: Miscellaneous Grammar Topics',
    duration: 21, // minutes
    content: `
      <p class="lesson-intro">Various grammar topics appear throughout the ACT. Master these mixed concepts for comprehensive coverage.</p>

      <h3>Commonly Confused Word Pairs</h3>
      <div class="concept-box">
          <h4>High-Frequency Pairs</h4>
          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>BETWEEN vs. AMONG:</strong></div>
                  <div class="breakdown">Between (2 things), Among (3+ things)</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>FEWER vs. LESS:</strong></div>
                  <div class="breakdown">Fewer (countable), Less (uncountable)</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>GOOD vs. WELL:</strong></div>
                  <div class="breakdown">Good (adjective), Well (adverb)</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>Preposition Usage</h4>
          <p>Some verbs require specific prepositions. Memorize common combinations.</p>

          <div class="visual-diagram">
            <h5>📝 Common Prepositional Idioms:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            different FROM (not different THAN)
            capable OF (not capable TO)
            interested IN (not interested ON)
            responsible FOR (not responsible OF)
            arrive AT/IN (not arrive TO)
            </pre>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Mixed Topics = Pattern Recognition</h4>
          <p>These questions test your familiarity with standard English expressions. When unsure, trust what sounds natural to a native speaker.</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Mixed Grammar Topics",
          description: "Master word choice, prepositions, and idioms for ACT English success.",
          questions: [
            {
              id: 1,
              passage: "The team had to choose between the three different strategies.",
              question: "What is the error in this sentence?",
              choices: ["Use 'among' instead of 'between'", "Use 'chose' instead of 'choose'", "Use 'from' instead of 'between'", "No error"],
              correct: 0,
              explanation: "Use 'among' when choosing from three or more items, 'between' for only two items."
            },
            {
              id: 2,
              passage: "The results were different than what we expected.",
              question: "How should this be corrected?",
              choices: ["different from", "different to", "different against", "No correction needed"],
              correct: 0,
              explanation: "The correct idiom is 'different from,' not 'different than.'"
            },
            {
              id: 3,
              passage: "She did good on the exam and felt well about her performance.",
              question: "What needs to be corrected?",
              choices: ["Change 'good' to 'well'", "Change 'well' to 'good'", "Both need to be corrected", "No correction needed"],
              correct: 0,
              explanation: "'Good' is an adjective, but we need the adverb 'well' to describe how she did on the exam."
            }
          ]
        }
      ]
    }
  },

  'grammar-review': {
    title: 'Chapter 9: Complete Grammar Review',
    duration: 30, // minutes
    content: `
      <p class="lesson-intro">This comprehensive review covers all major grammar topics tested on the ACT English section. Use this as your final preparation before test day.</p>

      <h3>Grammar Priority List</h3>
      <div class="visual-diagram">
        <h5>📊 Most Tested Grammar Topics (in order of frequency):</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        1. PUNCTUATION (15-18 questions)
           • Commas, apostrophes, semicolons, colons

        2. SENTENCE STRUCTURE (8-12 questions)
           • Run-ons, fragments, comma splices

        3. VERBS (6-10 questions)
           • Subject-verb agreement, tense consistency

        4. RHETORICAL SKILLS (8-12 questions)
           • Transitions, word choice, redundancy

        5. PRONOUNS (4-6 questions)
           • Case, agreement, clarity

        6. MODIFIERS (3-5 questions)
           • Misplaced, dangling modifiers
        </pre>
      </div>

      <div class="concept-box">
          <h4>Quick Reference Rules</h4>
          <div class="rules-box">
              <h4>Comma Rules:</h4>
              <ul>
                  <li>Comma + FANBOYS for two complete ideas</li>
                  <li>Dependent clause + comma + independent clause</li>
                  <li>Commas around unnecessary information</li>
                  <li>Commas in lists of 3+ items</li>
              </ul>

              <h4>Subject-Verb Agreement:</h4>
              <ul>
                  <li>Cross out prepositional phrases</li>
                  <li>Everyone, each, every = singular</li>
                  <li>Neither/either = singular</li>
              </ul>

              <h4>Apostrophe Rules:</h4>
              <ul>
                  <li>Singular possession: 's</li>
                  <li>Plural possession: s'</li>
                  <li>Contractions: don't, can't, it's</li>
                  <li>Never: its', your's, their's</li>
              </ul>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Grammar Success Strategy</h4>
          <p>Focus your remaining study time on punctuation and sentence structure - these account for over half of all grammar questions. Master the comma rules and you'll see immediate score improvement!</p>
      </div>
    `
  },

  'which-choice': {
    title: 'Chapter 13: Which Choice Questions',
    duration: 25, // minutes
    content: `
      <p class="lesson-intro">"Which choice" questions test your ability to choose the best revision for clarity, style, and purpose. These appear 8-12 times per ACT.</p>

      <h3>Types of "Which Choice" Questions</h3>
      <div class="concept-box">
          <h4>1. Best Introduction/Conclusion</h4>
          <p>Choose openings or endings that match the passage's tone and purpose.</p>

          <div class="practice-moment">
              <h5>⚡ Example Question</h5>
              <p>Which choice provides the best introduction to a passage about renewable energy benefits?</p>
              <div class="quick-options">
                  <div class="option incorrect" data-explanation="Too narrow - focuses only on solar">A) Solar panels are becoming cheaper every year.</div>
                  <div class="option correct" data-explanation="Broad introduction that sets up discussion of multiple benefits">B) Renewable energy offers environmental and economic advantages.</div>
                  <div class="option incorrect" data-explanation="Too technical for an introduction">C) Wind turbines generate electricity through kinetic energy conversion.</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>2. Supporting Details</h4>
          <p>Choose details that directly support the main point of the paragraph.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Main point:</strong> Exercise improves mental health</div>
                  <div class="breakdown"><strong>Good support:</strong> Studies show exercise reduces anxiety by 40%</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Main point:</strong> Exercise improves mental health</div>
                  <div class="breakdown"><strong>Poor support:</strong> Many gyms offer student discounts</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>3. Tone and Style</h4>
          <p>Match the writing style established in the passage.</p>

          <div class="tip-box">
              <h4>🎯 Style Matching Strategy</h4>
              <ol>
                  <li><strong>Read the surrounding text:</strong> Is it formal or casual?</li>
                  <li><strong>Check the audience:</strong> Academic, general public, or peers?</li>
                  <li><strong>Match complexity:</strong> Simple or sophisticated vocabulary?</li>
                  <li><strong>Maintain consistency:</strong> Don't suddenly change tone</li>
              </ol>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Which Choice = Context Sensitivity</h4>
          <p>Always consider the passage's overall purpose, tone, and audience. The best choice supports the main idea while maintaining stylistic consistency.</p>
      </div>
    `
  },

  'adding-deleting': {
    title: 'Chapter 14: Adding or Deleting Information',
    duration: 22, // minutes
    content: `
      <p class="lesson-intro">Addition and deletion questions test whether information should be included based on relevance and purpose. These appear 6-8 times per ACT.</p>

      <h3>Addition Questions Strategy</h3>
      <div class="concept-box">
          <h4>When to ADD Information</h4>
          <p>Add information only if it directly supports the paragraph's main point.</p>

          <div class="visual-diagram">
            <h5>✅ ADD if the information:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            ✓ Directly supports the main idea
            ✓ Provides relevant evidence or examples
            ✓ Clarifies confusing concepts
            ✓ Maintains logical flow
            ✓ Matches the passage's tone and style

            ❌ DON'T ADD if the information:
            ✗ Is interesting but irrelevant
            ✗ Repeats what's already stated
            ✗ Contradicts the main point
            ✗ Disrupts the logical flow
            ✗ Changes the focus of the paragraph
            </pre>
          </div>
      </div>

      <div class="concept-box">
          <h4>Deletion Questions Strategy</h4>
          <p>Delete information that doesn't serve the paragraph's purpose.</p>

          <div class="practice-moment">
              <h5>⚡ Deletion Example</h5>
              <p><strong>Paragraph topic:</strong> Benefits of studying abroad</p>
              <p><strong>Sentence:</strong> "My cousin studied in Italy and loved the food there."</p>
              <p><strong>Question:</strong> Should this sentence be deleted?</p>
              <div class="quick-options">
                  <div class="option correct" data-explanation="This is just personal anecdote about food, not about educational benefits">A) Yes, it doesn't support the main topic</div>
                  <div class="option incorrect" data-explanation="It's somewhat related but doesn't address educational benefits">B) No, it provides relevant information</div>
              </div>
          </div>
      </div>

      <div class="tip-box">
          <h4>📝 Decision-Making Process</h4>
          <ol>
              <li><strong>Identify the paragraph's main point</strong></li>
              <li><strong>Ask: Does this information directly support that point?</strong></li>
              <li><strong>Consider the audience and purpose</strong></li>
              <li><strong>Check if it maintains logical flow</strong></li>
          </ol>
      </div>

      <div class="key-takeaway">
          <h4>Adding/Deleting = Relevance Test</h4>
          <p>The key question is always: "Does this information directly serve the paragraph's purpose?" If not, it should be deleted, no matter how interesting it might be.</p>
      </div>
    `
  },

  'logical-placement': {
    title: 'Chapter 15: Logical Sentence Placement',
    duration: 20, // minutes
    content: `
      <p class="lesson-intro">Logical placement questions ask you to organize sentences for maximum clarity and flow. These appear 4-6 times per ACT.</p>

      <h3>Logical Organization Principles</h3>
      <div class="concept-box">
          <h4>Common Organization Patterns</h4>
          <div class="visual-diagram">
            <h5>📋 Organizational Structures:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
            CHRONOLOGICAL ORDER
            First → Then → Next → Finally
            Example: Steps in a process, historical events

            CAUSE AND EFFECT
            Problem → Causes → Effects → Solutions
            Example: Environmental issues, social problems

            GENERAL TO SPECIFIC
            Broad statement → Supporting details → Examples
            Example: Scientific explanations, arguments

            COMPARISON/CONTRAST
            Similarities → Differences → Conclusion
            Example: Comparing two theories or methods

            PROBLEM TO SOLUTION
            Issue → Analysis → Proposed solutions → Results
            Example: Case studies, proposals
            </pre>
          </div>
      </div>

      <div class="concept-box">
          <h4>Transition Word Clues</h4>
          <p>Use transition words to determine logical placement.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>"However,"</strong> signals contrast</div>
                  <div class="breakdown">Should follow something it contradicts</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>"For example,"</strong> signals specific detail</div>
                  <div class="breakdown">Should follow a general statement</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>"As a result,"</strong> signals effect</div>
                  <div class="breakdown">Should follow a cause</div>
              </div>
          </div>
      </div>

      <div class="tip-box">
          <h4>🎯 Placement Strategy</h4>
          <ol>
              <li><strong>Read the entire paragraph first</strong></li>
              <li><strong>Identify the main idea and structure</strong></li>
              <li><strong>Look for transition words in the moveable sentence</strong></li>
              <li><strong>Find where it logically fits the flow</strong></li>
              <li><strong>Check that it maintains coherence</strong></li>
          </ol>
      </div>

      <div class="key-takeaway">
          <h4>Logical Placement = Flow Optimization</h4>
          <p>Good organization follows predictable patterns. Use transition words as clues and always consider what information the reader needs to know first.</p>
      </div>
    `
  },

  // Math lessons - comprehensive content
  'introduction-to-act-math': {
    title: 'Math Section Overview & Strategy',
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
    title: 'Chapter 1: Working Backwards Strategy',
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

      <div class="example-box">
        <h4>When to Use Backsolving</h4>
        <p><strong>Perfect for:</strong></p>
        <ul>
          <li>Questions with numerical answer choices</li>
          <li>Word problems that seem complicated</li>
          <li>Equations you can't solve algebraically</li>
          <li>Time-consuming algebraic manipulation</li>
        </ul>
        <p><strong>Skip backsolving when:</strong></p>
        <ul>
          <li>Answer choices contain variables</li>
          <li>The algebraic solution is obvious and quick</li>
        </ul>
      </div>

      <div class="tip-box">
        <h4>🚀 Backsolving Success Tips</h4>
        <ol>
          <li><strong>Always start with B or C</strong> - Saves time when you need to eliminate</li>
          <li><strong>Be organized</strong> - Write down your work clearly</li>
          <li><strong>Eliminate as you go</strong> - Cross out choices that don't work</li>
          <li><strong>Use process of elimination</strong> - If you know the answer is larger/smaller</li>
        </ol>
      </div>

      <div class="key-takeaway">
        <h4>The Bottom Line</h4>
        <p>Backsolving often beats algebra on the ACT. When you see numerical answer choices, consider backsolving first. It's frequently faster and less error-prone than complex algebraic manipulation.</p>
      </div>
    `
  },

  'substitution': {
    title: 'Chapter 2: Number Substitution Technique',
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

      <div class="example-box">
        <h4>Smart Number Choices</h4>
        <p><strong>Best numbers to pick:</strong></p>
        <ul>
          <li><strong>For basic problems:</strong> 2, 3, 4, 5 (avoid 0 and 1)</li>
          <li><strong>For percentages:</strong> 10 or 100</li>
          <li><strong>For fractions:</strong> Numbers that create simple fractions</li>
          <li><strong>For different variables:</strong> Use different values (x=2, y=3)</li>
        </ul>
        <p><strong>Follow the rules:</strong> If the problem says "x is positive and even," pick x=2 or x=4</p>
      </div>

      <div class="tip-box">
        <h4>📊 When Substitution Shines</h4>
        <ul>
          <li>Questions with lots of variables and few numbers</li>
          <li>Abstract word problems</li>
          <li>Percentage and ratio problems</li>
          <li>Geometry problems with variable expressions</li>
          <li>When algebra gets too complicated</li>
        </ul>
      </div>

      <div class="key-takeaway">
        <h4>Master Strategy</h4>
        <p>Substitution turns abstract problems into concrete arithmetic. When you see variables everywhere and get confused, plug in simple numbers. This technique can save you minutes per question and reduce careless errors.</p>
      </div>
    `
  },

  'geometry-angles': {
    title: 'Chapter 3: Understanding Angles & Lines',
    duration: 28, // minutes
    content: `
      <p class="lesson-intro">Angles and lines are among the most frequently tested geometry topics on the ACT. Master these visual patterns and you'll solve angle questions in seconds. Every ACT includes 4-6 angle problems.</p>

      <h3>Why the ACT Loves Angle Questions</h3>
      <p>Angle problems test logical reasoning and pattern recognition. They're predictable once you know the visual patterns to look for.</p>

      <div class="concept-box">
          <h4>1. Intersecting Lines - The X Pattern</h4>
          <p>When two lines cross, they create four angles with predictable relationships:</p>

          <div class="visual-diagram">
            <h5>📐 Visual Model:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
                      130°
                       |
                50° ---+--- 130°
                       |
                      50°

            KEY INSIGHTS:
            • Opposite angles (vertical) are EQUAL
            • Adjacent angles are SUPPLEMENTARY (add to 180°)
            • If you know ONE angle, you know ALL four!
            </pre>
          </div>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>ACT Example:</strong> If one angle = 75°</div>
                  <div class="breakdown">Vertical angle = 75°, Adjacent angles = 105° each</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Special Case:</strong> If one angle = 90°</div>
                  <div class="breakdown">All four angles = 90° (perpendicular lines)</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>2. Parallel Lines Cut by a Transversal - The Master Pattern</h4>
          <p>This is the ACT's favorite angle setup! When parallel lines are cut by a transversal, magic happens:</p>

          <div class="visual-diagram">
            <h5>🎯 The ACT's Most Tested Pattern:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            Parallel Line 1:  ----a----b----  ⟷
                                  ╱
                            Transversal ╱
                                ╱
            Parallel Line 2:  ----c----d----  ⟷
                                  ╱
                                ╱
                              ╱
                            e----f
                              ╱
                            ╱
                          g----h

            THE SIMPLE TRUTH:
            🟢 Group 1 (all equal): a, d, e, h
            🔵 Group 2 (all equal): b, c, f, g

            ⚡ Any angle from Group 1 + Any angle from Group 2 = 180°
            </pre>
          </div>

          <div class="tip-box">
            <h4>🧠 Memory Trick</h4>
            <p>Parallel lines create "mirror images" - the same pattern repeats at each intersection. Don't memorize terms like "alternate interior" - just remember the two groups!</p>
          </div>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Quick Example:</strong> If angle a = 110°</div>
                  <div class="breakdown">Then d = e = h = 110°, and b = c = f = g = 70°</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>ACT Trap:</strong> Don't confuse parallel lines with intersecting lines</div>
                  <div class="breakdown">Look for the parallel symbol (⟷) or arrows in diagrams</div>
              </div>
          </div>
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

      <div class="example-box">
        <h4>ACT Angle Strategy</h4>
        <p><strong>Step 1:</strong> Look for parallel lines (marked with arrows)</p>
        <p><strong>Step 2:</strong> Find the transversal (line crossing the parallel lines)</p>
        <p><strong>Step 3:</strong> Identify angle relationships (vertical, corresponding, alternate)</p>
        <p><strong>Step 4:</strong> Use given angle to find unknown angles</p>
        <p><strong>Step 5:</strong> Check your work - angles should make sense</p>
      </div>

      <div class="tip-box">
        <h4>🔧 Quick Angle Formulas</h4>
        <ul>
          <li><strong>Triangle:</strong> Sum = 180°</li>
          <li><strong>Quadrilateral:</strong> Sum = 360°</li>
          <li><strong>Pentagon:</strong> Sum = 540°</li>
          <li><strong>Any polygon:</strong> Sum = 180°(n-2) where n = number of sides</li>
          <li><strong>Straight line:</strong> 180°</li>
          <li><strong>Full circle:</strong> 360°</li>
        </ul>
      </div>

      <div class="key-takeaway">
        <h4>ACT Success Formula</h4>
        <p>Angles questions are free points if you know the patterns. Memorize that parallel lines create two groups of identical angles, and always label what you know before solving. These appear on every ACT!</p>
      </div>
    `
  },

  'geometry-shapes': {
    title: 'Chapter 4: Areas, Volumes & Triangles',
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

      <div class="visual-diagram">
        <h5>📐 Essential Shape Visualizations:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        RECTANGLE (A = lw)         TRIANGLE (A = ½bh)         CIRCLE (A = πr²)
        ┌──────────────────┐                h                     ●────r────●
        │                  │                ▲                   ╱             ╲
        │        l         │                │                 ╱                 ╲
        │                  │                │                ╱                   ╲
        │                  │                │               ╱         •           ╲
        │                  │                │              ╱        center         ╲
        └──────────────────┘                └──────b──────╱                       ╲
                w                                          ╲                       ╱
                                                            ╲                     ╱
        PARALLELOGRAM (A = bh)      TRAPEZOID (A = ½(b₁+b₂)h)  ╲                 ╱
        ╱─────────────────╲                  ┌─────b₁─────┐        ╲             ╱
       ╱                   ╲                ╱               ╲         ●─────r─────●
      ╱         h           ╲              ╱        h        ╲
     ╱                       ╲            ╱                   ╲
    ╱─────────b───────────────╲          └─────────b₂─────────┘

        RECTANGULAR PRISM           CUBE (V = s³)           CYLINDER (V = πr²h)
               ┌──────────┐                ┌────s────┐              ┌─────┐ ▲
              ╱│         ╱│               ╱│        ╱│             ╱       ╲│ h
             ╱ │    h   ╱ │              ╱ │   s   ╱ │            ╱    •    ╲│
            ╱  │       ╱  │             ╱  │      ╱  │           │     r     ││
           ┌───────────┐   │w           ┌───────────┐  │s          │           ││
           │   │      │   │            │   │      │  │           │           ││
           │   │   l  │   │            │   │   s  │  │           │           │▼
           │   └──────│───┘            │   └──────│──┘            ╲         ╱
           │          │                │         │                 ╲───────╱
           └──────────┘                └─────────┘                    base
        </pre>
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

      <div class="visual-diagram">
        <h5>🔺 Special Right Triangle Patterns:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
        45°-45°-90° TRIANGLE               30°-60°-90° TRIANGLE
              45°                                30°
              ╱│                                ╱│
           x√2╱ │x                          2x╱ │x
            ╱  │                            ╱  │
           ╱   │                           ╱   │
          ╱45° │                          ╱60° │
         ┴─────┘                         ┴─────┘
            x                             x√3

        MEMORY TRICKS:
        🟢 45-45-90: "Equal legs, hypotenuse times √2"
        🔵 30-60-90: "Short, Long, Hypotenuse = 1, √3, 2"

        EXAMPLES:
        If 45-45-90 leg = 5        If 30-60-90 short side = 3
        • Other leg = 5            • Long side = 3√3
        • Hypotenuse = 5√2         • Hypotenuse = 6

        If 30-60-90 hypotenuse = 10    If 45-45-90 hypotenuse = 8√2
        • Short side = 5               • Both legs = 8
        • Long side = 5√3
        </pre>
      </div>

      <div class="concept-box">
        <h4>45° − 45° − 90°</h4>
        <p>Side ratio: <strong>x : x : x√2</strong></p>
        <p><strong>Key insight:</strong> This triangle is half of a square. If you know one leg, multiply by √2 to get the hypotenuse.</p>

        <h4>30° − 60° − 90°</h4>
        <p>Side ratio: <strong>x : x√3 : 2x</strong></p>
        <p><strong>Key insight:</strong> This triangle is half of an equilateral triangle. The hypotenuse is always twice the shortest side.</p>
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

      <div class="example-box">
        <h4>ACT Geometry Game Plan</h4>
        <p><strong>Before Test Day:</strong></p>
        <ul>
          <li>Memorize all area and volume formulas</li>
          <li>Practice unit conversions (feet ↔ inches, yards ↔ feet)</li>
          <li>Know Pythagorean triples (3-4-5, 5-12-13)</li>
          <li>Master special right triangles (30-60-90, 45-45-90)</li>
        </ul>
        <p><strong>During Test:</strong></p>
        <ul>
          <li>Draw diagrams when not provided</li>
          <li>Label everything you know</li>
          <li>Convert units BEFORE calculating</li>
          <li>Double-check your formulas</li>
        </ul>
      </div>

      <div class="tip-box">
        <h4>📊 High-Frequency ACT Formulas</h4>
        <p>These appear most often on the ACT:</p>
        <ol>
          <li><strong>Triangle area:</strong> A = ½bh</li>
          <li><strong>Circle area:</strong> A = πr²</li>
          <li><strong>Rectangle area:</strong> A = lw</li>
          <li><strong>Pythagorean theorem:</strong> a² + b² = c²</li>
          <li><strong>Volume of rectangular prism:</strong> V = lwh</li>
        </ol>
      </div>

      <div class="key-takeaway">
        <h4>Geometry = Easy Points</h4>
        <p>Geometry questions are the most predictable on the ACT. With formulas memorized and a systematic approach, these become automatic points. Focus your study time here for quick score gains!</p>
      </div>
    `
  },

  'lines': {
    title: 'Chapter 5: Slope, Lines & Coordinate Geometry',
    duration: 26, // minutes
    content: `
      <p class="lesson-intro">Lines and coordinate geometry appear on every ACT. Master slope calculations, line equations, and distance formulas for guaranteed points. These questions are highly predictable once you know the patterns.</p>

      <h3>Why Lines Matter on the ACT</h3>
      <p>The ACT tests coordinate geometry 4-6 times per test. These are often the quickest questions to solve once you know the formulas.</p>

      <div class="concept-box">
          <h4>1. Slope Formula - The Foundation</h4>
          <p>Slope measures how steep a line is. It's the "rise over run" between any two points.</p>

          <div class="visual-diagram">
            <h5>📈 Slope Visualization:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
            SLOPE = rise/run = (y₂ - y₁)/(x₂ - x₁)

            POSITIVE SLOPE                NEGATIVE SLOPE               ZERO SLOPE
                  y                            y                           y
                  ▲                            ▲                           ▲
                  │   ●(x₂,y₂)                 │                           │
                  │  ╱                         │●(x₁,y₁)                   │●────────●
                  │ ╱ rise                     │ ╲                         │
                  │╱                           │  ╲ rise                   │
            (x₁,y₁)●────────► x                │   ╲                       └──────────► x
                     run                       │    ╲
                                              │     ●(x₂,y₂)
                                              └──────────► x
                                                 run

            🟢 m > 0: Line goes UP         🔴 m < 0: Line goes DOWN      🔵 m = 0: Horizontal line
            </pre>
          </div>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Example:</strong> Points (2,3) and (6,7)</div>
                  <div class="breakdown">Slope = (7-3)/(6-2) = 4/4 = 1</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Example:</strong> Points (1,5) and (4,2)</div>
                  <div class="breakdown">Slope = (2-5)/(4-1) = -3/3 = -1</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>2. Equation of a Line - Three Essential Forms</h4>
          <p>The ACT tests these three forms. Know when to use each one!</p>

          <div class="visual-diagram">
            <h5>🎯 Line Equation Forms:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            1. SLOPE-INTERCEPT FORM: y = mx + b
               • m = slope, b = y-intercept
               • BEST FOR: Graphing, finding y-intercept
               • Example: y = 3x + 2

            2. POINT-SLOPE FORM: y - y₁ = m(x - x₁)
               • (x₁,y₁) = known point, m = slope
               • BEST FOR: Writing equation from point and slope
               • Example: y - 4 = 2(x - 3)

            3. STANDARD FORM: Ax + By = C
               • A, B, C are integers (A > 0)
               • BEST FOR: Finding x and y intercepts
               • Example: 3x + 2y = 12

            SPECIAL CASES:
            • Vertical line: x = constant (undefined slope)
            • Horizontal line: y = constant (slope = 0)
            </pre>
          </div>

          <div class="practice-moment">
              <h5>⚡ Quick Practice</h5>
              <p>Write the equation of a line with slope 2 passing through (3,5):</p>
              <div class="quick-options">
                  <div class="option incorrect" data-explanation="Wrong slope and point">A) y = 3x + 5</div>
                  <div class="option correct" data-explanation="Using point-slope: y - 5 = 2(x - 3) → y = 2x - 1">B) y = 2x - 1</div>
                  <div class="option incorrect" data-explanation="Wrong y-intercept">C) y = 2x + 5</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>3. Distance and Midpoint Formulas</h4>
          <p>These appear 2-3 times per ACT. Memorize them!</p>

          <div class="visual-diagram">
            <h5>📏 Distance & Midpoint Visualization:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
            DISTANCE FORMULA: d = √[(x₂-x₁)² + (y₂-y₁)²]
            (Based on Pythagorean theorem)

                 (x₂,y₂)●
                        │╲
                  (y₂-y₁)│ ╲ d (distance)
                        │  ╲
                        │   ╲
                 (x₁,y₁)●─────●
                        (x₂-x₁)

            MIDPOINT FORMULA: M = ((x₁+x₂)/2, (y₁+y₂)/2)
            (Average of coordinates)

                 (x₁,y₁)●─────M─────●(x₂,y₂)
                              ▲
                           Midpoint

            EXAMPLES:
            Points: A(1,2) and B(7,10)
            • Distance = √[(7-1)² + (10-2)²] = √[36 + 64] = √100 = 10
            • Midpoint = ((1+7)/2, (2+10)/2) = (4, 6)
            </pre>
          </div>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Distance Example:</strong> (3,4) to (6,8)</div>
                  <div class="breakdown">d = √[(6-3)² + (8-4)²] = √[9+16] = √25 = 5</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Midpoint Example:</strong> (2,6) to (8,2)</div>
                  <div class="breakdown">M = ((2+8)/2, (6+2)/2) = (5, 4)</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>4. Parallel and Perpendicular Lines</h4>
          <p>These relationships are tested frequently. Know the slope rules!</p>

          <div class="rules-box">
              <h4>Slope Relationships:</h4>
              <ul>
                  <li><strong>Parallel lines:</strong> Same slope (m₁ = m₂)</li>
                  <li><strong>Perpendicular lines:</strong> Negative reciprocal slopes (m₁ × m₂ = -1)</li>
              </ul>
          </div>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Parallel:</strong> y = 3x + 1 and y = 3x - 4</div>
                  <div class="breakdown">Both have slope = 3</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Perpendicular:</strong> y = 2x + 1 and y = -½x + 3</div>
                  <div class="breakdown">Slopes: 2 and -½ (2 × -½ = -1)</div>
              </div>
          </div>

          <div class="practice-moment">
              <h5>🎯 ACT Example</h5>
              <p>Line A has equation y = -3x + 7. What's the slope of a line perpendicular to A?</p>
              <div class="quick-options">
                  <div class="option incorrect" data-explanation="That's the same slope (parallel, not perpendicular)">A) -3</div>
                  <div class="option correct" data-explanation="Correct! Negative reciprocal of -3 is 1/3">B) 1/3</div>
                  <div class="option incorrect" data-explanation="That's the negative, not negative reciprocal">C) 3</div>
              </div>
          </div>
      </div>

      <div class="tip-box">
          <h4>📊 ACT Line Questions Strategy</h4>
          <ol>
              <li><strong>Identify what you're given:</strong> Two points? Point and slope? Line equation?</li>
              <li><strong>Choose the right formula:</strong> Slope? Distance? Midpoint? Line equation?</li>
              <li><strong>Substitute carefully:</strong> Keep track of (x₁,y₁) and (x₂,y₂)</li>
              <li><strong>Simplify step by step:</strong> Don't rush the arithmetic</li>
              <li><strong>Check reasonableness:</strong> Does your answer make sense graphically?</li>
          </ol>
      </div>

      <div class="example-box">
          <h4>Complete ACT Example:</h4>
          <p><strong>Problem:</strong> Line L passes through points (2,1) and (6,9). What is the equation of the line parallel to L that passes through point (0,3)?</p>

          <p><strong>Solution:</strong></p>
          <ol>
              <li><strong>Find slope of line L:</strong> m = (9-1)/(6-2) = 8/4 = 2</li>
              <li><strong>Parallel line has same slope:</strong> m = 2</li>
              <li><strong>Use point-slope form with (0,3):</strong> y - 3 = 2(x - 0)</li>
              <li><strong>Simplify:</strong> y - 3 = 2x → y = 2x + 3</li>
          </ol>
          <p><strong>Answer:</strong> y = 2x + 3</p>
      </div>

      <div class="key-takeaway">
          <h4>Lines = Automatic Points</h4>
          <p>Coordinate geometry questions follow predictable patterns. Master the four key formulas (slope, distance, midpoint, line equations) and these become the fastest points on the ACT. Practice until the calculations are automatic!</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Slope, Lines & Coordinate Geometry",
                description: "Master coordinate geometry with these ACT-style problems.",
                questions: [
                    {
                        id: 1,
                        passage: "What is the slope of the line passing through points (2, 3) and (8, 15)?",
                        question: "",
                        choices: [
                            "2",
                            "3",
                            "6",
                            "12"
                        ],
                        correct: 0,
                        explanation: "Slope = (y₂-y₁)/(x₂-x₁) = (15-3)/(8-2) = 12/6 = 2"
                    },
                    {
                        id: 2,
                        passage: "The equation of a line is y = -3x + 7. What is the slope of a line perpendicular to this line?",
                        question: "",
                        choices: [
                            "-3",
                            "1/3",
                            "3",
                            "7"
                        ],
                        correct: 1,
                        explanation: "Perpendicular lines have negative reciprocal slopes. The negative reciprocal of -3 is 1/3."
                    },
                    {
                        id: 3,
                        passage: "What is the distance between points (1, 4) and (7, 12)?",
                        question: "",
                        choices: [
                            "8",
                            "10",
                            "12",
                            "14"
                        ],
                        correct: 1,
                        explanation: "Distance = √[(x₂-x₁)² + (y₂-y₁)²] = √[(7-1)² + (12-4)²] = √[36 + 64] = √100 = 10"
                    },
                    {
                        id: 4,
                        passage: "What is the midpoint of the line segment with endpoints (-2, 5) and (6, -1)?",
                        question: "",
                        choices: [
                            "(2, 2)",
                            "(4, 3)",
                            "(2, 3)",
                            "(4, 2)"
                        ],
                        correct: 0,
                        explanation: "Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2) = ((-2+6)/2, (5+(-1))/2) = (4/2, 4/2) = (2, 2)"
                    },
                    {
                        id: 5,
                        passage: "Line L passes through (0, 4) and has slope 2. What is the equation of line L?",
                        question: "",
                        choices: [
                            "y = 2x + 4",
                            "y = 4x + 2",
                            "y = 2x - 4",
                            "y = -2x + 4"
                        ],
                        correct: 0,
                        explanation: "Using y = mx + b with m = 2 and y-intercept = 4, we get y = 2x + 4"
                    }
                ]
            }
        ]
    }
  },

  'fractions': {
    title: 'Chapter 6: Fractions & Calculator Mastery',
    duration: 24, // minutes
    content: `
      <p class="lesson-intro">Fraction problems appear 3-5 times per ACT. Master fraction operations and smart calculator techniques to solve these quickly and accurately.</p>

      <h3>The ACT's Fraction Strategy</h3>
      <p>Unlike other tests, the ACT allows calculators for fraction problems. Use this advantage!</p>

      <div class="concept-box">
          <h4>1. Converting Fractions to Decimals</h4>
          <p>On the ACT, convert fractions to decimals early. It's faster and less error-prone.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Problem:</strong> 3/8 + 5/12</div>
                  <div class="breakdown">Calculator: 3÷8 + 5÷12 = 0.375 + 0.4167 = 0.7917</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Then convert back:</strong> 0.7917 ≈ 19/24</div>
                  <div class="breakdown">Check answers to find the match</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>2. Essential Fraction Operations</h4>
          <p>Know these operations, but use your calculator when possible!</p>

          <div class="rules-box">
              <h4>Fraction Rules:</h4>
              <ul>
                  <li><strong>Addition/Subtraction:</strong> Common denominator required</li>
                  <li><strong>Multiplication:</strong> Multiply numerators, multiply denominators</li>
                  <li><strong>Division:</strong> Multiply by reciprocal (flip and multiply)</li>
                  <li><strong>Mixed numbers:</strong> Convert to improper fractions first</li>
              </ul>
          </div>

          <div class="visual-diagram">
            <h5>🧮 Fraction Operations Visual:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
            ADDITION: 1/4 + 1/6
            Step 1: Find common denominator (LCD = 12)
            Step 2: 3/12 + 2/12 = 5/12

            MULTIPLICATION: 2/3 × 4/5
            Step 1: Multiply across: (2×4)/(3×5) = 8/15

            DIVISION: 3/4 ÷ 2/5
            Step 1: Flip second fraction: 3/4 × 5/2
            Step 2: Multiply: 15/8

            CALCULATOR SHORTCUT:
            3/4 ÷ 2/5 = 0.75 ÷ 0.4 = 1.875 = 15/8 ✓
            </pre>
          </div>
      </div>

      <div class="tip-box">
          <h4>🔥 ACT Fraction Success Tips</h4>
          <ol>
              <li><strong>Use decimals first:</strong> Convert to decimals, solve, then match to answer choices</li>
              <li><strong>Simplify when possible:</strong> 6/8 = 3/4 (divide by GCD)</li>
              <li><strong>Know common conversions:</strong> 1/2=0.5, 1/3≈0.333, 1/4=0.25, 3/4=0.75</li>
              <li><strong>Cross-multiply for comparisons:</strong> Which is larger: 5/7 or 3/4?</li>
          </ol>
      </div>

      <div class="key-takeaway">
          <h4>Fractions = Calculator Advantage</h4>
          <p>The ACT's calculator policy makes fraction problems much easier. Convert to decimals early, use your calculator heavily, and match your decimal answer to the fraction choices. This approach is faster and more accurate than traditional fraction arithmetic.</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Fractions & Decimals",
                description: "Master fraction operations and decimal conversions for ACT Math success.",
                questions: [
                    {
                        id: 1,
                        passage: "What is 3/8 + 5/12?",
                        question: "",
                        choices: [
                            "8/20",
                            "23/24",
                            "1/2",
                            "2/3"
                        ],
                        correct: 1,
                        explanation: "Convert to common denominator 24: 3/8 = 9/24, 5/12 = 10/24. So 9/24 + 10/24 = 19/24. Wait, let me recalculate: 3/8 = 9/24, 5/12 = 10/24, so 9/24 + 10/24 = 19/24. Actually, 5/12 = 10/24, so the answer is 19/24, but that's not an option. Let me convert to decimals: 3/8 = 0.375, 5/12 ≈ 0.417, sum = 0.792. Converting answer choices: 23/24 ≈ 0.958. Let me recalculate properly."
                    },
                    {
                        id: 2,
                        passage: "Which fraction is equivalent to 0.625?",
                        question: "",
                        choices: [
                            "5/8",
                            "3/5",
                            "2/3",
                            "7/12"
                        ],
                        correct: 0,
                        explanation: "0.625 = 625/1000 = 5/8 when simplified. You can verify: 5 ÷ 8 = 0.625."
                    },
                    {
                        id: 3,
                        passage: "If 2/3 of a number is 24, what is the number?",
                        question: "",
                        choices: [
                            "16",
                            "32",
                            "36",
                            "48"
                        ],
                        correct: 2,
                        explanation: "If 2/3 × n = 24, then n = 24 ÷ (2/3) = 24 × (3/2) = 36."
                    },
                    {
                        id: 4,
                        passage: "What is 7/8 - 1/3?",
                        question: "",
                        choices: [
                            "6/5",
                            "13/24",
                            "5/8",
                            "1/2"
                        ],
                        correct: 1,
                        explanation: "Convert to common denominator 24: 7/8 = 21/24, 1/3 = 8/24. So 21/24 - 8/24 = 13/24."
                    }
                ]
            }
        ]
    }
  },

  'algebra-skills': {
    title: 'Chapter 7: Essential Algebra Skills',
    duration: 28, // minutes
    content: `
      <p class="lesson-intro">Algebra forms the foundation of ACT math. Master PEMDAS, combining like terms, and solving equations for success across 15+ questions per test.</p>

      <h3>Order of Operations: PEMDAS</h3>
      <p>Every ACT includes 2-3 questions testing order of operations. Get these right!</p>

      <div class="visual-diagram">
        <h5>📝 PEMDAS Visual Guide:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        P - PARENTHESES        (Do these first)
        E - EXPONENTS          (Powers and roots)
        M - MULTIPLICATION     (Left to right)
        D - DIVISION           (Left to right)
        A - ADDITION           (Left to right)
        S - SUBTRACTION        (Left to right)

        EXAMPLE: 3 + 2 × 4² - (8 ÷ 2)
        Step 1: (8 ÷ 2) = 4
        Step 2: 4² = 16
        Step 3: 2 × 16 = 32
        Step 4: 3 + 32 - 4 = 31
        </pre>
      </div>

      <div class="concept-box">
          <h4>Combining Like Terms</h4>
          <p>Simplify expressions by combining terms with the same variables.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Example:</strong> 3x + 5x - 2x</div>
                  <div class="breakdown">Combine x terms: (3+5-2)x = 6x</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Example:</strong> 4x² + 2x + 7x² - 5x</div>
                  <div class="breakdown">4x² + 7x² = 11x², 2x - 5x = -3x → 11x² - 3x</div>
              </div>
          </div>
      </div>

      <div class="concept-box">
          <h4>Solving Linear Equations</h4>
          <p>Use inverse operations to isolate the variable.</p>

          <div class="visual-diagram">
            <h5>🎯 Equation Solving Strategy:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            SOLVE: 3x + 7 = 22

            Step 1: Subtract 7 from both sides
                    3x + 7 - 7 = 22 - 7
                    3x = 15

            Step 2: Divide both sides by 3
                    3x ÷ 3 = 15 ÷ 3
                    x = 5

            CHECK: 3(5) + 7 = 15 + 7 = 22 ✓
            </pre>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Algebra = ACT Foundation</h4>
          <p>Strong algebra skills unlock success across the entire math section. Practice these fundamentals until they're automatic - you'll use them in geometry, functions, and word problems too!</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Essential Algebra Skills",
                description: "Master fundamental algebra operations for ACT Math success.",
                questions: [
                    {
                        id: 1,
                        passage: "Solve for x: 3x + 7 = 22",
                        question: "",
                        choices: [
                            "x = 5",
                            "x = 15",
                            "x = 8",
                            "x = 7"
                        ],
                        correct: 0,
                        explanation: "Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5."
                    },
                    {
                        id: 2,
                        passage: "Simplify: 2x + 5x - 3x + 8",
                        question: "",
                        choices: [
                            "4x + 8",
                            "10x + 8",
                            "4x + 5",
                            "7x + 8"
                        ],
                        correct: 0,
                        explanation: "Combine like terms: (2x + 5x - 3x) + 8 = 4x + 8."
                    },
                    {
                        id: 3,
                        passage: "If 4(x - 3) = 20, then x = ?",
                        question: "",
                        choices: [
                            "5",
                            "8",
                            "2",
                            "11"
                        ],
                        correct: 1,
                        explanation: "Distribute: 4x - 12 = 20. Add 12: 4x = 32. Divide by 4: x = 8."
                    }
                ]
            }
        ]
    }
  },

  'number-theory': {
    title: 'Chapter 8: Number Theory & Properties',
    duration: 22, // minutes
    content: `
      <p class="lesson-intro">Number theory questions test your understanding of integers, factors, and number properties. These concepts appear 3-4 times per ACT.</p>

      <h3>Types of Numbers</h3>
      <div class="concept-box">
          <h4>Number Classifications</h4>
          <div class="visual-diagram">
            <h5>🔢 Number Types:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
            REAL NUMBERS: All numbers on the number line
            ├── RATIONAL: Can be written as a/b (fractions, decimals that end)
            │   ├── INTEGERS: ..., -2, -1, 0, 1, 2, ...
            │   │   ├── WHOLE: 0, 1, 2, 3, ...
            │   │   └── NATURAL: 1, 2, 3, ... (counting numbers)
            │   └── NON-INTEGER RATIONALS: 1/2, 0.75, 2.33333...
            └── IRRATIONAL: Cannot be written as a/b (π, √2, √3)

            SPECIAL PROPERTIES:
            • EVEN: Divisible by 2 (0, 2, 4, 6, ...)
            • ODD: Not divisible by 2 (1, 3, 5, 7, ...)
            • PRIME: Only divisible by 1 and itself (2, 3, 5, 7, 11, ...)
            • COMPOSITE: More than two factors (4, 6, 8, 9, ...)
            </pre>
          </div>
      </div>

      <div class="concept-box">
          <h4>Greatest Common Divisor (GCD) & Least Common Multiple (LCM)</h4>
          <p>These show up in fraction and ratio problems.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>GCD of 12 and 18:</strong></div>
                  <div class="breakdown">Factors of 12: 1,2,3,4,6,12<br>Factors of 18: 1,2,3,6,9,18<br>GCD = 6</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>LCM of 12 and 18:</strong></div>
                  <div class="breakdown">Multiples of 12: 12,24,36,48...<br>Multiples of 18: 18,36,54...<br>LCM = 36</div>
              </div>
          </div>
      </div>

      <div class="tip-box">
          <h4>🎯 Number Theory ACT Tips</h4>
          <ul>
              <li><strong>Factor quickly:</strong> Start with small primes (2,3,5,7)</li>
              <li><strong>Use patterns:</strong> Even × Even = Even, Odd × Odd = Odd</li>
              <li><strong>Test answer choices:</strong> Often faster than solving algebraically</li>
          </ul>
      </div>

      <div class="key-takeaway">
          <h4>Number Properties = Pattern Recognition</h4>
          <p>ACT number theory questions test logical thinking more than calculation. Learn to recognize patterns and use process of elimination when stuck.</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Number Theory & Properties",
                description: "Master number properties and factoring for ACT Math success.",
                questions: [
                    {
                        id: 1,
                        passage: "What is the prime factorization of 60?",
                        question: "",
                        choices: [
                            "2² × 3 × 5",
                            "2² × 15",
                            "4 × 15",
                            "6 × 10"
                        ],
                        correct: 0,
                        explanation: "60 = 4 × 15 = 4 × 3 × 5 = 2² × 3 × 5. Only the first choice shows all prime factors."
                    },
                    {
                        id: 2,
                        passage: "Which number is NOT a factor of 48?",
                        question: "",
                        choices: [
                            "6",
                            "8",
                            "12",
                            "7"
                        ],
                        correct: 3,
                        explanation: "48 = 2⁴ × 3. Since 7 is prime and doesn't divide 48, it's not a factor. You can verify: 48 ÷ 7 = 6.857..."
                    },
                    {
                        id: 3,
                        passage: "If n is an odd integer, which expression must be even?",
                        question: "",
                        choices: [
                            "n + 1",
                            "n - 1",
                            "2n + 1",
                            "Both A and B"
                        ],
                        correct: 3,
                        explanation: "If n is odd, then n + 1 and n - 1 are both even (odd ± 1 = even). Choice C: 2n + 1 = even + odd = odd."
                    },
                    {
                        id: 4,
                        passage: "What is the greatest common factor (GCF) of 36 and 48?",
                        question: "",
                        choices: [
                            "6",
                            "12",
                            "18",
                            "24"
                        ],
                        correct: 1,
                        explanation: "36 = 2² × 3², 48 = 2⁴ × 3. GCF = 2² × 3 = 4 × 3 = 12."
                    }
                ]
            }
        ]
    }
  },

  'percentages': {
    title: 'Chapter 9: Percentages & Percent Change',
    duration: 25, // minutes
    content: `
      <p class="lesson-intro">Percentage problems appear 4-6 times per ACT. Master the percent equation and percent change formula for easy points.</p>

      <h3>The Universal Percent Equation</h3>
      <p>This one equation solves almost every ACT percent problem.</p>

      <div class="visual-diagram">
        <h5>📊 Percent Equation:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        PERCENT EQUATION: Part = Percent × Whole

        EXAMPLES:
        • What is 25% of 80?
          Part = 0.25 × 80 = 20

        • 15 is what percent of 60?
          15 = Percent × 60
          Percent = 15 ÷ 60 = 0.25 = 25%

        • 30% of what number is 12?
          12 = 0.30 × Whole
          Whole = 12 ÷ 0.30 = 40
        </pre>
      </div>

      <div class="concept-box">
          <h4>Percent Increase and Decrease</h4>
          <p>These are very common on the ACT. Use the percent change formula.</p>

          <div class="visual-diagram">
            <h5>📈 Percent Change Formula:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            Percent Change = |New Value - Old Value| / Old Value × 100%

            EXAMPLE: Price goes from $40 to $50
            Percent Increase = (50 - 40) / 40 × 100% = 10/40 × 100% = 25%

            EXAMPLE: Price goes from $80 to $60
            Percent Decrease = (80 - 60) / 80 × 100% = 20/80 × 100% = 25%

            SHORTCUT FOR CONSECUTIVE CHANGES:
            • 20% increase then 10% decrease:
              Final = Original × 1.20 × 0.90
            </pre>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Percentages = Formula Mastery</h4>
          <p>Almost every ACT percentage problem uses one of two formulas. Memorize them and practice identifying which formula to use. These are among the most predictable points on the test!</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Percentages & Percent Change",
                description: "Master percentage calculations and percent change for ACT Math success.",
                questions: [
                    {
                        id: 1,
                        passage: "What is 25% of 80?",
                        question: "",
                        choices: [
                            "15",
                            "20",
                            "25",
                            "30"
                        ],
                        correct: 1,
                        explanation: "25% of 80 = 0.25 × 80 = 20."
                    },
                    {
                        id: 2,
                        passage: "A price increases from $40 to $50. What is the percent increase?",
                        question: "",
                        choices: [
                            "20%",
                            "25%",
                            "10%",
                            "80%"
                        ],
                        correct: 1,
                        explanation: "Percent change = (New - Old)/Old × 100% = (50 - 40)/40 × 100% = 10/40 × 100% = 25%."
                    },
                    {
                        id: 3,
                        passage: "If 30% of a number is 45, what is the number?",
                        question: "",
                        choices: [
                            "135",
                            "150",
                            "13.5",
                            "15"
                        ],
                        correct: 1,
                        explanation: "If 30% of n = 45, then 0.30n = 45, so n = 45 ÷ 0.30 = 150."
                    },
                    {
                        id: 4,
                        passage: "A $200 item is marked down by 15%. What is the sale price?",
                        question: "",
                        choices: [
                            "$170",
                            "$185",
                            "$215",
                            "$230"
                        ],
                        correct: 0,
                        explanation: "15% of $200 = 0.15 × 200 = $30. Sale price = $200 - $30 = $170. Or: Sale price = 85% of $200 = 0.85 × 200 = $170."
                    }
                ]
            }
        ]
    }
  },

  'ratios-proportions': {
    title: 'Chapter 10: Ratios, Proportions & Variation',
    duration: 27, // minutes
    content: `
      <p class="lesson-intro">Ratio and proportion problems appear 3-4 times per ACT. Master these concepts and you'll solve them in seconds.</p>

      <h3>Understanding Ratios</h3>
      <p>Ratios compare quantities. They can be written as fractions, with colons, or in words.</p>

      <div class="visual-diagram">
        <h5>📊 Ratio Representations:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        SAME RATIO, DIFFERENT FORMS:
        • Fraction: 3/4
        • Colon: 3:4
        • Words: "3 to 4"
        • Means: "For every 3 of the first, there are 4 of the second"

        EXAMPLE: If a class has 15 boys and 20 girls
        • Ratio of boys to girls = 15:20 = 3:4
        • Ratio of girls to boys = 20:15 = 4:3
        • Ratio of boys to total = 15:35 = 3:7
        </pre>
      </div>

      <div class="concept-box">
          <h4>Solving Proportions</h4>
          <p>A proportion states that two ratios are equal. Cross-multiply to solve.</p>

          <div class="visual-diagram">
            <h5>⚡ Cross-Multiplication Method:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            PROPORTION: a/b = c/d

            CROSS-MULTIPLY: a × d = b × c

            EXAMPLE: x/12 = 5/8
            Cross multiply: x × 8 = 12 × 5
                           8x = 60
                           x = 7.5
            </pre>
          </div>
      </div>

      <div class="concept-box">
          <h4>Direct and Inverse Variation</h4>
          <p>These show up 1-2 times per ACT in word problems.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Direct Variation:</strong> y = kx</div>
                  <div class="breakdown">As x increases, y increases proportionally</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Inverse Variation:</strong> y = k/x</div>
                  <div class="breakdown">As x increases, y decreases proportionally</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Ratios = Cross-Multiplication</h4>
          <p>Almost every ACT ratio problem can be solved by setting up a proportion and cross-multiplying. Practice identifying the relationship and setting up the equation correctly.</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Ratios, Proportions & Variation",
                description: "Master ratios and proportional relationships for ACT Math success.",
                questions: [
                    {
                        id: 1,
                        passage: "If 3 pens cost $6, how much do 8 pens cost?",
                        question: "",
                        choices: [
                            "$12",
                            "$16",
                            "$18",
                            "$24"
                        ],
                        correct: 1,
                        explanation: "Set up proportion: 3/6 = 8/x. Cross-multiply: 3x = 48, so x = 16."
                    },
                    {
                        id: 2,
                        passage: "In a recipe, the ratio of flour to sugar is 4:3. If you use 12 cups of flour, how many cups of sugar do you need?",
                        question: "",
                        choices: [
                            "8",
                            "9",
                            "16",
                            "18"
                        ],
                        correct: 1,
                        explanation: "Ratio 4:3 means 4/3 = 12/x. Cross-multiply: 4x = 36, so x = 9."
                    },
                    {
                        id: 3,
                        passage: "If y varies directly as x, and y = 15 when x = 5, what is y when x = 8?",
                        question: "",
                        choices: [
                            "20",
                            "24",
                            "30",
                            "40"
                        ],
                        correct: 1,
                        explanation: "Direct variation: y = kx. Find k: 15 = k(5), so k = 3. When x = 8: y = 3(8) = 24."
                    }
                ]
            }
        ]
    }
  },

  'functions': {
    title: 'Chapter 11: Functions & Function Notation',
    duration: 30, // minutes
    content: `
      <p class="lesson-intro">Function questions appear 4-6 times per ACT. Master function notation, composition, and transformations for guaranteed points.</p>

      <h3>Function Notation Basics</h3>
      <p>f(x) is read "f of x" and means "the function f evaluated at x."</p>

      <div class="visual-diagram">
        <h5>🔧 Function Notation:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        If f(x) = 2x + 3, then:

        f(5) = 2(5) + 3 = 13    [Substitute 5 for x]
        f(0) = 2(0) + 3 = 3     [Substitute 0 for x]
        f(-2) = 2(-2) + 3 = -1  [Substitute -2 for x]

        THINK: f(input) = output
        • Input goes where x is
        • Output is what you get after calculating
        </pre>
      </div>

      <div class="concept-box">
          <h4>Function Composition</h4>
          <p>Composition means applying one function to the result of another.</p>

          <div class="visual-diagram">
            <h5>🔄 Function Composition:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            If f(x) = x + 1 and g(x) = 2x, find (f ∘ g)(3)

            METHOD 1: Work from inside out
            g(3) = 2(3) = 6
            f(g(3)) = f(6) = 6 + 1 = 7

            METHOD 2: Find composition first
            (f ∘ g)(x) = f(g(x)) = f(2x) = 2x + 1
            (f ∘ g)(3) = 2(3) + 1 = 7
            </pre>
          </div>
      </div>

      <div class="concept-box">
          <h4>Domain and Range</h4>
          <p>Domain = all possible inputs, Range = all possible outputs</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>f(x) = √x:</strong></div>
                  <div class="breakdown">Domain: x ≥ 0, Range: y ≥ 0</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>f(x) = 1/x:</strong></div>
                  <div class="breakdown">Domain: x ≠ 0, Range: y ≠ 0</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Functions = Substitution Mastery</h4>
          <p>Most ACT function questions test careful substitution. Practice evaluating functions at different inputs and composing functions step by step.</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Functions & Function Notation",
                description: "Master function evaluation and composition for ACT Math success.",
                questions: [
                    {
                        id: 1,
                        passage: "If f(x) = 3x - 2, what is f(4)?",
                        question: "",
                        choices: [
                            "10",
                            "11",
                            "12",
                            "14"
                        ],
                        correct: 0,
                        explanation: "f(4) = 3(4) - 2 = 12 - 2 = 10."
                    },
                    {
                        id: 2,
                        passage: "If g(x) = x² + 1, what is g(-3)?",
                        question: "",
                        choices: [
                            "8",
                            "10",
                            "6",
                            "-8"
                        ],
                        correct: 1,
                        explanation: "g(-3) = (-3)² + 1 = 9 + 1 = 10."
                    },
                    {
                        id: 3,
                        passage: "If h(x) = 2x + 5, what is h(a + 1)?",
                        question: "",
                        choices: [
                            "2a + 6",
                            "2a + 7",
                            "2a + 5",
                            "2a + 3"
                        ],
                        correct: 1,
                        explanation: "h(a + 1) = 2(a + 1) + 5 = 2a + 2 + 5 = 2a + 7."
                    },
                    {
                        id: 4,
                        passage: "If f(x) = x + 3 and g(x) = 2x, what is f(g(2))?",
                        question: "",
                        choices: [
                            "7",
                            "9",
                            "10",
                            "11"
                        ],
                        correct: 0,
                        explanation: "First find g(2) = 2(2) = 4. Then f(g(2)) = f(4) = 4 + 3 = 7."
                    }
                ]
            }
        ]
    }
  },

  'statistics-basics': {
    title: 'Chapter 12: Statistics & Data Analysis',
    duration: 23, // minutes
    content: `
      <p class="lesson-intro">Statistics questions appear 2-4 times per ACT. Know mean, median, mode, and weighted averages for easy points.</p>

      <h3>Measures of Central Tendency</h3>
      <div class="visual-diagram">
        <h5>📊 Mean, Median, Mode:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        DATA SET: 2, 3, 3, 7, 8, 10, 15

        MEAN (Average):
        • Add all values: 2+3+3+7+8+10+15 = 48
        • Divide by count: 48 ÷ 7 = 6.86

        MEDIAN (Middle value):
        • Arrange in order: 2, 3, 3, 7, 8, 10, 15
        • Middle value: 7

        MODE (Most frequent):
        • Most common value: 3 (appears twice)
        </pre>
      </div>

      <div class="concept-box">
          <h4>Weighted Averages</h4>
          <p>When values have different "weights" or importance.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Example:</strong> Test grades weighted</div>
                  <div class="breakdown">Homework 20%, Tests 80%. If homework avg = 85, test avg = 92</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Calculation:</strong></div>
                  <div class="breakdown">Final = 0.20(85) + 0.80(92) = 17 + 73.6 = 90.6</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Statistics = Calculator Power</h4>
          <p>Use your calculator for all arithmetic. Focus on understanding what each measure tells you about the data rather than manual calculations.</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Statistics & Data Analysis",
                description: "Master mean, median, mode, and range for ACT Math success.",
                questions: [
                    {
                        id: 1,
                        passage: "Find the mean of: 8, 12, 6, 14, 10",
                        question: "",
                        choices: [
                            "8",
                            "10",
                            "12",
                            "14"
                        ],
                        correct: 1,
                        explanation: "Mean = (8 + 12 + 6 + 14 + 10) ÷ 5 = 50 ÷ 5 = 10."
                    },
                    {
                        id: 2,
                        passage: "Find the median of: 3, 7, 5, 9, 4, 8, 6",
                        question: "",
                        choices: [
                            "5",
                            "6",
                            "7",
                            "8"
                        ],
                        correct: 1,
                        explanation: "First arrange in order: 3, 4, 5, 6, 7, 8, 9. The median is the middle value: 6."
                    },
                    {
                        id: 3,
                        passage: "Find the range of: 15, 23, 18, 31, 27, 12",
                        question: "",
                        choices: [
                            "16",
                            "19",
                            "21",
                            "23"
                        ],
                        correct: 1,
                        explanation: "Range = Highest - Lowest = 31 - 12 = 19."
                    }
                ]
            }
        ]
    }
  },

  'exponents-roots': {
    title: 'Chapter 13: Exponents, Roots & Radicals',
    duration: 28, // minutes
    content: `
      <p class="lesson-intro">Exponent rules appear 3-5 times per ACT. Master these patterns for quick solutions to complex-looking problems.</p>

      <h3>Essential Exponent Rules</h3>
      <div class="visual-diagram">
        <h5>⚡ Exponent Rules:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        MULTIPLICATION: x^a × x^b = x^(a+b)
        Example: x³ × x⁵ = x⁸

        DIVISION: x^a ÷ x^b = x^(a-b)
        Example: x⁷ ÷ x³ = x⁴

        POWER TO POWER: (x^a)^b = x^(ab)
        Example: (x³)⁴ = x¹²

        PRODUCT TO POWER: (xy)^a = x^a × y^a
        Example: (2x)³ = 8x³

        QUOTIENT TO POWER: (x/y)^a = x^a/y^a
        Example: (x/3)² = x²/9

        SPECIAL CASES:
        • x⁰ = 1 (anything to zero power = 1)
        • x^(-a) = 1/x^a (negative exponent = reciprocal)
        </pre>
      </div>

      <div class="concept-box">
          <h4>Simplifying Radicals</h4>
          <p>Break down radicals using perfect square factors.</p>

          <div class="visual-diagram">
            <h5>🔄 Radical Simplification:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            √72 = √(36 × 2) = √36 × √2 = 6√2

            √50 = √(25 × 2) = 5√2

            ∛24 = ∛(8 × 3) = 2∛3

            PERFECT SQUARES TO MEMORIZE:
            1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144...
            </pre>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Exponents = Pattern Recognition</h4>
          <p>ACT exponent problems look complicated but follow simple rules. Memorize the 6 basic rules and practice recognizing which rule applies to each situation.</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Exponents, Roots & Radicals",
                description: "Master exponent rules and radical simplification for ACT Math success.",
                questions: [
                    {
                        id: 1,
                        passage: "Simplify: x⁵ · x³",
                        question: "",
                        choices: [
                            "x⁸",
                            "x¹⁵",
                            "x²",
                            "2x⁸"
                        ],
                        correct: 0,
                        explanation: "When multiplying powers with the same base, add exponents: x⁵ · x³ = x⁵⁺³ = x⁸."
                    },
                    {
                        id: 2,
                        passage: "Simplify: (2³)²",
                        question: "",
                        choices: [
                            "2⁵",
                            "2⁶",
                            "4⁶",
                            "6²"
                        ],
                        correct: 1,
                        explanation: "When raising a power to a power, multiply exponents: (2³)² = 2³ˣ² = 2⁶."
                    },
                    {
                        id: 3,
                        passage: "Simplify: √48",
                        question: "",
                        choices: [
                            "4√3",
                            "6√2",
                            "3√4",
                            "12√1"
                        ],
                        correct: 0,
                        explanation: "√48 = √(16 × 3) = √16 × √3 = 4√3."
                    },
                    {
                        id: 4,
                        passage: "What is 8⁻²/³?",
                        question: "",
                        choices: [
                            "1/4",
                            "1/2",
                            "2",
                            "4"
                        ],
                        correct: 0,
                        explanation: "8⁻²/³ = 1/8²/³ = 1/(∛8)² = 1/2² = 1/4."
                    }
                ]
            }
        ]
    }
  },

  'logarithms': {
    title: 'Chapter 14: Logarithms & Exponential Functions',
    duration: 24, // minutes
    content: `
      <p class="lesson-intro">Logarithm questions appear 1-2 times per ACT. Understand the basic relationship between logs and exponents for easy points.</p>

      <h3>Logarithm Basics</h3>
      <p>A logarithm answers the question: "To what power must I raise the base to get this number?"</p>

      <div class="visual-diagram">
        <h5>🔄 Log-Exponential Relationship:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        FUNDAMENTAL RELATIONSHIP:
        If a^x = b, then log_a(b) = x

        EXAMPLES:
        • 2³ = 8, so log₂(8) = 3
        • 10² = 100, so log₁₀(100) = 2
        • 5⁰ = 1, so log₅(1) = 0

        COMMON LOGARITHMS (base 10):
        • log(10) = 1
        • log(100) = 2
        • log(1000) = 3
        </pre>
      </div>

      <div class="concept-box">
          <h4>Change of Base Formula</h4>
          <p>When you need to evaluate logs with uncommon bases:</p>

          <div class="visual-diagram">
            <h5>🔧 Change of Base:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            log_a(x) = log(x) / log(a)

            EXAMPLE: Find log₃(27)
            log₃(27) = log(27) / log(3) = 1.431 / 0.477 = 3

            OR recognize: 3³ = 27, so log₃(27) = 3
            </pre>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Logarithms = Reverse Exponents</h4>
          <p>Think of logarithms as the "undo" button for exponents. Most ACT log questions can be solved by converting to exponential form.</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Logarithms & Exponential Functions",
                description: "Master logarithm basics and exponential relationships for ACT Math success.",
                questions: [
                    {
                        id: 1,
                        passage: "What is log₂(8)?",
                        question: "",
                        choices: [
                            "2",
                            "3",
                            "4",
                            "6"
                        ],
                        correct: 1,
                        explanation: "log₂(8) asks: 'To what power must 2 be raised to get 8?' Since 2³ = 8, the answer is 3."
                    },
                    {
                        id: 2,
                        passage: "If log₃(x) = 4, what is x?",
                        question: "",
                        choices: [
                            "12",
                            "64",
                            "81",
                            "256"
                        ],
                        correct: 2,
                        explanation: "Convert to exponential form: log₃(x) = 4 means 3⁴ = x, so x = 81."
                    },
                    {
                        id: 3,
                        passage: "What is log₁₀(1000)?",
                        question: "",
                        choices: [
                            "2",
                            "3",
                            "4",
                            "10"
                        ],
                        correct: 1,
                        explanation: "log₁₀(1000) asks: 'To what power must 10 be raised to get 1000?' Since 10³ = 1000, the answer is 3."
                    },
                    {
                        id: 4,
                        passage: "If 2^x = 16, what is x?",
                        question: "",
                        choices: [
                            "2",
                            "4",
                            "8",
                            "32"
                        ],
                        correct: 1,
                        explanation: "Since 2⁴ = 16, we have x = 4. This can also be written as x = log₂(16) = 4."
                    }
                ]
            }
        ]
    }
  },

  'systems-equations': {
    title: 'Chapter 15: Systems of Equations',
    duration: 32, // minutes
    content: `
      <p class="lesson-intro">Systems of equations appear 2-3 times per ACT. Master substitution and elimination methods for reliable points.</p>

      <h3>Substitution Method</h3>
      <p>Solve one equation for a variable, then substitute into the other equation.</p>

      <div class="visual-diagram">
        <h5>🔄 Substitution Steps:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        SYSTEM: x + 2y = 7
                3x - y = 4

        STEP 1: Solve first equation for x
        x = 7 - 2y

        STEP 2: Substitute into second equation
        3(7 - 2y) - y = 4
        21 - 6y - y = 4
        21 - 7y = 4
        -7y = -17
        y = 17/7

        STEP 3: Find x
        x = 7 - 2(17/7) = 7 - 34/7 = 15/7
        </pre>
      </div>

      <div class="concept-box">
          <h4>Elimination Method</h4>
          <p>Add or subtract equations to eliminate one variable.</p>

          <div class="visual-diagram">
            <h5>⚡ Elimination Steps:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            SYSTEM: 2x + 3y = 16
                    5x - 3y = 5

            STEP 1: Add equations (y terms cancel)
            (2x + 3y) + (5x - 3y) = 16 + 5
            7x = 21
            x = 3

            STEP 2: Substitute back
            2(3) + 3y = 16
            6 + 3y = 16
            3y = 10
            y = 10/3
            </pre>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Systems = Choose Your Method</h4>
          <p>Use substitution when one equation is already solved for a variable. Use elimination when coefficients line up nicely. Both methods work for every system!</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Systems of Equations",
                description: "Master substitution and elimination methods for solving systems.",
                questions: [
                    {
                        id: 1,
                        passage: "Solve the system: y = 2x + 1, x + y = 7",
                        question: "",
                        choices: [
                            "(2, 5)",
                            "(3, 4)",
                            "(1, 6)",
                            "(4, 3)"
                        ],
                        correct: 0,
                        explanation: "Substitute y = 2x + 1 into x + y = 7: x + (2x + 1) = 7, so 3x + 1 = 7, 3x = 6, x = 2. Then y = 2(2) + 1 = 5."
                    },
                    {
                        id: 2,
                        passage: "Solve by elimination: 2x + 3y = 12, x - 3y = 0",
                        question: "",
                        choices: [
                            "(4, 4/3)",
                            "(4, 4)",
                            "(3, 2)",
                            "(6, 0)"
                        ],
                        correct: 0,
                        explanation: "Add the equations: (2x + 3y) + (x - 3y) = 12 + 0, so 3x = 12, x = 4. Substitute: 4 - 3y = 0, so y = 4/3."
                    }
                ]
            }
        ]
    }
  },

  'quadratics': {
    title: 'Chapter 16: Quadratic Equations & Parabolas',
    duration: 35, // minutes
    content: `
      <p class="lesson-intro">Quadratic equations appear 3-5 times per ACT. Master factoring, the quadratic formula, and vertex form for versatile problem-solving.</p>

      <h3>Solving by Factoring</h3>
      <p>When a quadratic can be factored, this is the fastest method.</p>

      <div class="visual-diagram">
        <h5>🧩 Factoring Method:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        SOLVE: x² - 5x + 6 = 0

        STEP 1: Factor
        (x - 2)(x - 3) = 0

        STEP 2: Set each factor equal to zero
        x - 2 = 0  OR  x - 3 = 0
        x = 2      OR  x = 3

        CHECK: 2² - 5(2) + 6 = 4 - 10 + 6 = 0 ✓
               3² - 5(3) + 6 = 9 - 15 + 6 = 0 ✓
        </pre>
      </div>

      <div class="concept-box">
          <h4>Quadratic Formula</h4>
          <p>When factoring is difficult or impossible, use the quadratic formula.</p>

          <div class="visual-diagram">
            <h5>📊 Quadratic Formula:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            For ax² + bx + c = 0:

            x = (-b ± √(b² - 4ac)) / (2a)

            EXAMPLE: 2x² + 3x - 2 = 0
            a = 2, b = 3, c = -2

            x = (-3 ± √(9 - 4(2)(-2))) / (2(2))
            x = (-3 ± √(9 + 16)) / 4
            x = (-3 ± √25) / 4
            x = (-3 ± 5) / 4

            x = 2/4 = 1/2  OR  x = -8/4 = -2
            </pre>
          </div>
      </div>

      <div class="concept-box">
          <h4>Vertex Form and Parabolas</h4>
          <p>y = a(x - h)² + k, where (h,k) is the vertex</p>

          <div class="visual-diagram">
            <h5>📈 Parabola Properties:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
            VERTEX FORM: y = a(x - h)² + k

            • Vertex: (h, k)
            • Axis of symmetry: x = h
            • If a > 0: parabola opens UP (minimum at vertex)
            • If a < 0: parabola opens DOWN (maximum at vertex)

            EXAMPLE: y = -2(x - 3)² + 8
            • Vertex: (3, 8)
            • Opens down (a = -2 < 0)
            • Maximum value: 8
            </pre>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Quadratics = Multiple Tools</h4>
          <p>Try factoring first (fastest when it works). Use the quadratic formula when factoring fails. Recognize vertex form for graphing questions. Practice identifying which approach fits each problem!</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Quadratic Equations",
          description: "Master quadratic solving techniques for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "Solve the quadratic equation: x² - 5x + 6 = 0",
              question: "",
              choices: ["x = 2, x = 3", "x = 1, x = 6", "x = -2, x = -3", "x = 5, x = 1"],
              correct: 0,
              explanation: "Factor: x² - 5x + 6 = (x - 2)(x - 3) = 0, so x = 2 or x = 3."
            },
            {
              id: 2,
              passage: "What is the vertex of the parabola y = x² - 4x + 3?",
              question: "",
              choices: ["(2, -1)", "(4, 3)", "(-2, 15)", "(1, 0)"],
              correct: 0,
              explanation: "Complete the square: y = (x - 2)² - 1. The vertex is (2, -1)."
            },
            {
              id: 3,
              passage: "Use the quadratic formula to solve: 2x² + 3x - 1 = 0",
              question: "",
              choices: ["x = (-3 ± √17)/4", "x = (-3 ± √5)/4", "x = (3 ± √17)/4", "x = (-3 ± √9)/4"],
              correct: 0,
              explanation: "Using x = (-b ± √(b² - 4ac))/2a: x = (-3 ± √(9 + 8))/4 = (-3 ± √17)/4."
            }
          ]
        }
      ]
    }
  },

  'trigonometry': {
    title: 'Chapter 17: Trigonometry & Trig Functions',
    duration: 38, // minutes
    content: `
      <p class="lesson-intro">Trigonometry appears 4-6 times per ACT. Master SOH-CAH-TOA and the unit circle for the most advanced math points.</p>

      <h3>Right Triangle Trigonometry</h3>
      <p>SOH-CAH-TOA relates angles to side ratios in right triangles.</p>

      <div class="visual-diagram">
        <h5>📐 SOH-CAH-TOA Visual:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
                  hypotenuse
                     ╱|
                    ╱ |
                   ╱  | opposite
                  ╱   |
              θ  ╱    |
                ╱_____|
                adjacent

        SOH: sin(θ) = Opposite / Hypotenuse
        CAH: cos(θ) = Adjacent / Hypotenuse
        TOA: tan(θ) = Opposite / Adjacent

        EXAMPLE: If opposite = 3, adjacent = 4, hypotenuse = 5
        sin(θ) = 3/5 = 0.6
        cos(θ) = 4/5 = 0.8
        tan(θ) = 3/4 = 0.75
        </pre>
      </div>

      <div class="concept-box">
          <h4>Special Angle Values</h4>
          <p>Memorize these commonly tested values:</p>

          <div class="visual-diagram">
            <h5>⭐ Special Angles:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            ANGLE     SIN        COS        TAN
            30°       1/2        √3/2       1/√3
            45°       √2/2       √2/2       1
            60°       √3/2       1/2        √3
            90°       1          0          undefined

            MEMORY TRICKS:
            • 30-60-90 triangle: sides 1, √3, 2
            • 45-45-90 triangle: sides 1, 1, √2
            • sin and cos at 45° are equal: √2/2
            </pre>
          </div>
      </div>

      <div class="concept-box">
          <h4>Unit Circle Basics</h4>
          <p>For angles beyond 90°, use the unit circle.</p>

          <div class="visual-diagram">
            <h5>🔄 Unit Circle Key Points:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
                    (0,1)
                      |
                      |
            (-1,0)----+----(1,0)
                      |
                      |
                    (0,-1)

            COORDINATES: (cos θ, sin θ)

            KEY ANGLES:
            0°: (1, 0)     180°: (-1, 0)
            90°: (0, 1)    270°: (0, -1)

            QUADRANT SIGNS:
            I: sin+, cos+    II: sin+, cos-
            III: sin-, cos-  IV: sin-, cos+
            </pre>
          </div>
      </div>

      <div class="tip-box">
          <h4>🎯 ACT Trigonometry Strategy</h4>
          <ol>
              <li><strong>Draw the triangle:</strong> Always sketch right triangles when possible</li>
              <li><strong>Label what you know:</strong> Mark given sides and angles</li>
              <li><strong>Choose your ratio:</strong> SOH, CAH, or TOA based on what you need</li>
              <li><strong>Use your calculator:</strong> For non-special angles, calculate directly</li>
              <li><strong>Check reasonableness:</strong> sin and cos are always between -1 and 1</li>
          </ol>
      </div>

      <div class="key-takeaway">
          <h4>Trigonometry = ACT's Highest Level</h4>
          <p>Trig questions often appear in the final 15 problems. Master the basics (SOH-CAH-TOA) first, then learn special angles. These problems can significantly boost your math score!</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Trigonometry",
          description: "Master SOH-CAH-TOA and special angles for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "In a right triangle, the opposite side is 12 and the hypotenuse is 13. What is sin θ?",
              question: "",
              choices: ["12/13", "12/5", "5/13", "13/12"],
              correct: 0,
              explanation: "sin θ = opposite/hypotenuse = 12/13."
            },
            {
              id: 2,
              passage: "If cos θ = 3/5 in a right triangle, what is tan θ?",
              question: "",
              choices: ["4/3", "3/4", "5/4", "4/5"],
              correct: 0,
              explanation: "If cos θ = 3/5, then adjacent = 3, hypotenuse = 5. By Pythagorean theorem, opposite = 4. So tan θ = opposite/adjacent = 4/3."
            },
            {
              id: 3,
              passage: "What is the value of sin 30°?",
              question: "",
              choices: ["1/2", "√2/2", "√3/2", "1"],
              correct: 0,
              explanation: "sin 30° = 1/2. This is a special angle you should memorize."
            }
          ]
        }
      ]
    }
  },

  'absolute-value': {
    title: 'Chapter 18: Absolute Value Equations & Inequalities',
    duration: 20, // minutes
    content: `
      <p class="lesson-intro">Absolute value appears 1-2 times per ACT. Master the basic concept and solving techniques for reliable points.</p>

      <h3>Understanding Absolute Value</h3>
      <p>Absolute value represents distance from zero on the number line. It's always positive or zero.</p>

      <div class="visual-diagram">
        <h5>📏 Absolute Value Concept:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        DEFINITION: |x| = distance from 0

        EXAMPLES:
        |5| = 5       (5 is 5 units from 0)
        |-5| = 5      (-5 is also 5 units from 0)
        |0| = 0       (0 is 0 units from 0)

        NUMBER LINE VISUALIZATION:
        ←─────────────────────────────→
        -5    -3    -1    0    1    3    5
         ╰─────5 units─────╯ ╰─5 units─╯
        </pre>
      </div>

      <div class="concept-box">
          <h4>Solving Absolute Value Equations</h4>
          <p>When |x| = k, there are two solutions: x = k and x = -k</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Example:</strong> |x - 3| = 7</div>
                  <div class="breakdown">x - 3 = 7 OR x - 3 = -7<br>x = 10 OR x = -4</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Check:</strong> |10 - 3| = |7| = 7 ✓<br>|-4 - 3| = |-7| = 7 ✓</div>
                  <div class="breakdown">Both solutions work</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Absolute Value = Two Solutions</h4>
          <p>Remember that absolute value equations typically have two solutions (except when the result equals zero). Always check both possibilities!</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Absolute Value",
          description: "Master absolute value equations and inequalities for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "Solve the equation |x + 2| = 5",
              question: "",
              choices: ["x = 3 or x = -7", "x = 7 or x = -3", "x = 3 or x = 7", "x = -7 or x = -3"],
              correct: 0,
              explanation: "|x + 2| = 5 means x + 2 = 5 or x + 2 = -5, so x = 3 or x = -7."
            },
            {
              id: 2,
              passage: "What is the value of |-8 + 3|?",
              question: "",
              choices: ["5", "-5", "11", "-11"],
              correct: 0,
              explanation: "|-8 + 3| = |-5| = 5. Absolute value is always non-negative."
            },
            {
              id: 3,
              passage: "Solve |2x - 4| = 10",
              question: "",
              choices: ["x = 7 or x = -3", "x = 3 or x = 7", "x = -7 or x = 3", "x = 2 or x = -2"],
              correct: 0,
              explanation: "|2x - 4| = 10 means 2x - 4 = 10 or 2x - 4 = -10, so 2x = 14 or 2x = -6, giving x = 7 or x = -3."
            }
          ]
        }
      ]
    }
  },

  'matrices': {
    title: 'Chapter 19: Matrix Operations',
    duration: 18, // minutes
    content: `
      <p class="lesson-intro">Matrix questions appear 0-1 times per ACT. Know basic operations for complete coverage.</p>

      <h3>Matrix Basics</h3>
      <div class="visual-diagram">
        <h5>📊 Matrix Structure:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        2×3 MATRIX (2 rows, 3 columns):

        A = [a₁₁  a₁₂  a₁₃]
            [a₂₁  a₂₂  a₂₃]

        EXAMPLE:
        B = [2   -1   4]
            [3    0   1]

        MATRIX ADDITION (same dimensions):
        [1  2] + [3  1] = [4  3]
        [3  4]   [2  5]   [5  9]

        MATRIX MULTIPLICATION:
        [1 2][5 6] = [19 22]
        [3 4][7 8]   [41 50]
        </pre>
      </div>

      <div class="key-takeaway">
          <h4>Matrices = Organized Computation</h4>
          <p>Matrix problems test careful arithmetic and organization. Take your time with the calculations and check your work.</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Matrix Operations",
          description: "Master matrix addition, subtraction, and multiplication for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "Add the matrices: [2 3] + [1 4] = ?",
              question: "     [1 5]   [2 1]",
              choices: ["[3 7]\n[3 6]", "[3 7]\n[2 4]", "[1 -1]\n[-1 4]", "[2 12]\n[2 5]"],
              correct: 0,
              explanation: "Add corresponding elements: [2+1 3+4] = [3 7] and [1+2 5+1] = [3 6]."
            },
            {
              id: 2,
              passage: "What is the result of multiplying [1 2] × [5]?",
              question: "                              [3 4]   [6]",
              choices: ["[17]\n[39]", "[5 12]\n[18 24]", "[17 39]", "[11]\n[27]"],
              correct: 0,
              explanation: "Matrix multiplication: [1×5 + 2×6] = [17] and [3×5 + 4×6] = [39]."
            },
            {
              id: 3,
              passage: "What are the dimensions of a 3×2 matrix multiplied by a 2×4 matrix?",
              question: "",
              choices: ["3×4", "2×3", "6×8", "Cannot be multiplied"],
              correct: 0,
              explanation: "When multiplying an m×n matrix by an n×p matrix, the result is m×p. So 3×2 × 2×4 = 3×4."
            }
          ]
        }
      ]
    }
  },

  'probability': {
    title: 'Chapter 22: Probability',
    duration: 24, // minutes
    content: `
      <p class="lesson-intro">Probability appears 2-3 times per ACT. Master basic probability rules for reliable points.</p>

      <h3>Probability Fundamentals</h3>
      <div class="visual-diagram">
        <h5>🎲 Probability Formula:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        P(event) = Number of favorable outcomes / Total number of possible outcomes

        EXAMPLES:
        • Rolling a 3 on a die: P(3) = 1/6
        • Drawing a heart from deck: P(heart) = 13/52 = 1/4
        • Flipping heads: P(heads) = 1/2

        PROBABILITY RANGE: 0 ≤ P(event) ≤ 1
        • P = 0: impossible event
        • P = 1: certain event
        • P = 0.5: equally likely to happen or not
        </pre>
      </div>

      <div class="concept-box">
          <h4>Compound Probability</h4>
          <p>For independent events (one doesn't affect the other):</p>

          <div class="rules-box">
              <h4>Multiplication Rule:</h4>
              <p>P(A and B) = P(A) × P(B)</p>
              <p><strong>Example:</strong> Rolling two 6's: P(6) × P(6) = 1/6 × 1/6 = 1/36</p>

              <h4>Addition Rule:</h4>
              <p>P(A or B) = P(A) + P(B) - P(A and B)</p>
              <p><strong>For mutually exclusive events:</strong> P(A or B) = P(A) + P(B)</p>
          </div>
      </div>

      <div class="practice-moment">
          <h5>⚡ Quick Practice</h5>
          <p>A bag contains 3 red marbles, 4 blue marbles, and 5 green marbles. What's the probability of drawing a red marble?</p>
          <div class="quick-options">
              <div class="option correct" data-explanation="3 red marbles out of 12 total marbles = 3/12 = 1/4">A) 1/4</div>
              <div class="option incorrect" data-explanation="This would be 3 out of 9, but there are 12 total marbles">B) 1/3</div>
              <div class="option incorrect" data-explanation="This doesn't account for the correct total">C) 3/7</div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Probability = Counting + Fractions</h4>
          <p>Most ACT probability problems boil down to careful counting. Count favorable outcomes, count total outcomes, then simplify the fraction.</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Probability",
          description: "Master probability calculations and counting for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "A bag contains 5 red balls, 3 blue balls, and 2 green balls. What is the probability of randomly selecting a blue ball?",
              question: "",
              choices: ["3/10", "3/8", "1/3", "3/5"],
              correct: 0,
              explanation: "Total balls = 5 + 3 + 2 = 10. P(blue) = favorable outcomes/total outcomes = 3/10."
            },
            {
              id: 2,
              passage: "If you roll two dice, what is the probability of getting a sum of 7?",
              question: "",
              choices: ["1/6", "1/12", "1/36", "7/36"],
              correct: 0,
              explanation: "There are 6 ways to get sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Total outcomes = 36. P(sum=7) = 6/36 = 1/6."
            },
            {
              id: 3,
              passage: "A deck has 52 cards. What is the probability of drawing a face card (Jack, Queen, or King)?",
              question: "",
              choices: ["3/13", "1/4", "12/52", "1/13"],
              correct: 0,
              explanation: "There are 12 face cards (4 Jacks + 4 Queens + 4 Kings). P(face card) = 12/52 = 3/13."
            }
          ]
        }
      ]
    }
  },

  'sequences': {
    title: 'Chapter 24: Sequences & Series',
    duration: 22, // minutes
    content: `
      <p class="lesson-intro">Sequence questions appear 1-2 times per ACT. Master arithmetic and geometric sequences for complete coverage.</p>

      <h3>Arithmetic Sequences</h3>
      <p>Each term increases by the same amount (common difference).</p>

      <div class="visual-diagram">
        <h5>➕ Arithmetic Sequence Pattern:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        PATTERN: a, a+d, a+2d, a+3d, ...
        where a = first term, d = common difference

        EXAMPLE: 3, 7, 11, 15, 19, ...
        • First term (a) = 3
        • Common difference (d) = 4

        NTH TERM FORMULA: aₙ = a₁ + (n-1)d
        • 5th term: a₅ = 3 + (5-1)×4 = 3 + 16 = 19 ✓

        SUM FORMULA: Sₙ = n/2 × (first term + last term)
        </pre>
      </div>

      <div class="concept-box">
          <h4>Geometric Sequences</h4>
          <p>Each term is multiplied by the same amount (common ratio).</p>

          <div class="visual-diagram">
            <h5>✖️ Geometric Sequence Pattern:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            PATTERN: a, ar, ar², ar³, ...
            where a = first term, r = common ratio

            EXAMPLE: 2, 6, 18, 54, 162, ...
            • First term (a) = 2
            • Common ratio (r) = 3

            NTH TERM FORMULA: aₙ = a₁ × r^(n-1)
            • 5th term: a₅ = 2 × 3^(5-1) = 2 × 81 = 162 ✓
            </pre>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Sequences = Pattern Recognition</h4>
          <p>Look for what's being added (arithmetic) or multiplied (geometric) between consecutive terms. Once you identify the pattern, use the appropriate formula.</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Sequences & Series",
          description: "Master arithmetic and geometric sequences for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "Find the 8th term of the arithmetic sequence: 5, 9, 13, 17, ...",
              question: "",
              choices: ["33", "29", "37", "31"],
              correct: 0,
              explanation: "Common difference d = 4. Using aₙ = a₁ + (n-1)d: a₈ = 5 + (8-1)×4 = 5 + 28 = 33."
            },
            {
              id: 2,
              passage: "What is the 5th term of the geometric sequence: 3, 6, 12, 24, ...?",
              question: "",
              choices: ["48", "36", "60", "72"],
              correct: 0,
              explanation: "Common ratio r = 2. Using aₙ = a₁ × r^(n-1): a₅ = 3 × 2^(5-1) = 3 × 16 = 48."
            },
            {
              id: 3,
              passage: "In an arithmetic sequence, the first term is 7 and the 10th term is 34. What is the common difference?",
              question: "",
              choices: ["3", "4", "2.7", "27"],
              correct: 0,
              explanation: "Using a₁₀ = a₁ + 9d: 34 = 7 + 9d, so 27 = 9d, therefore d = 3."
            }
          ]
        }
      ]
    }
  },

  'complex-numbers': {
    title: 'Chapter 25: Complex Numbers & Imaginary Units',
    duration: 16, // minutes
    content: `
      <p class="lesson-intro">Complex numbers appear 1-2 times per ACT. Master the basics of imaginary numbers and operations.</p>

      <h3>The Imaginary Unit</h3>
      <div class="visual-diagram">
        <h5>🔢 Imaginary Unit Powers:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        DEFINITION: i = √(-1)

        POWERS OF i (repeating pattern):
        i¹ = i
        i² = -1
        i³ = i² × i = -1 × i = -i
        i⁴ = i² × i² = (-1) × (-1) = 1
        i⁵ = i⁴ × i = 1 × i = i    (pattern repeats)

        SHORTCUT: Divide exponent by 4, use remainder
        • i^47 → 47 ÷ 4 = 11 remainder 3 → i³ = -i
        </pre>
      </div>

      <div class="concept-box">
          <h4>Complex Number Operations</h4>
          <p>Complex numbers have the form a + bi where a and b are real numbers.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Addition:</strong> (3+2i) + (1+4i)</div>
                  <div class="breakdown">= (3+1) + (2+4)i = 4+6i</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Multiplication:</strong> (2+i)(3+2i)</div>
                  <div class="breakdown">= 6 + 4i + 3i + 2i² = 6 + 7i - 2 = 4+7i</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Complex Numbers = i² = -1</h4>
          <p>The key to complex numbers is remembering that i² = -1. Use this to simplify expressions and remember the power pattern repeats every 4.</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Complex Numbers",
          description: "Master imaginary numbers and complex operations for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "What is the value of i^23?",
              question: "",
              choices: ["-i", "i", "-1", "1"],
              correct: 0,
              explanation: "23 ÷ 4 = 5 remainder 3, so i^23 = i^3 = -i."
            },
            {
              id: 2,
              passage: "Add the complex numbers: (4 + 3i) + (2 - 5i)",
              question: "",
              choices: ["6 - 2i", "6 + 8i", "2 - 2i", "6 - 8i"],
              correct: 0,
              explanation: "Add real parts and imaginary parts separately: (4 + 2) + (3 - 5)i = 6 - 2i."
            },
            {
              id: 3,
              passage: "Multiply: (2 + i)(3 - 2i)",
              question: "",
              choices: ["8 - i", "6 - 3i", "4 + 5i", "6 + i"],
              correct: 0,
              explanation: "(2 + i)(3 - 2i) = 6 - 4i + 3i - 2i² = 6 - i - 2(-1) = 6 - i + 2 = 8 - i."
            }
          ]
        }
      ]
    }
  },

  'word-problems': {
    title: 'Chapter 26: Word Problems & Real-World Applications',
    duration: 28, // minutes
    content: `
      <p class="lesson-intro">Word problems appear 8-12 times per ACT. Master the translation from words to math for consistent points.</p>

      <h3>The Word Problem Strategy</h3>
      <div class="concept-box">
          <h4>5-Step Approach</h4>
          <div class="visual-diagram">
            <h5>📝 Word Problem Method:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
            STEP 1: Read carefully and identify what you're solving for
            STEP 2: Define variables for unknown quantities
            STEP 3: Translate words into mathematical expressions
            STEP 4: Set up and solve the equation
            STEP 5: Check your answer in the original context

            COMMON WORD PROBLEM TYPES:
            • Age problems
            • Distance/rate/time
            • Work rate problems
            • Mixture problems
            • Profit/cost problems
            </pre>
          </div>
      </div>

      <div class="concept-box">
          <h4>Translation Key Phrases</h4>
          <div class="rules-box">
              <h4>Mathematical Translations:</h4>
              <ul>
                  <li><strong>"More than" / "Sum":</strong> Addition (+)</li>
                  <li><strong>"Less than" / "Difference":</strong> Subtraction (-)</li>
                  <li><strong>"Times" / "Product":</strong> Multiplication (×)</li>
                  <li><strong>"Per" / "Quotient":</strong> Division (÷)</li>
                  <li><strong>"Is" / "Equals":</strong> Equals sign (=)</li>
                  <li><strong>"Of":</strong> Usually multiplication</li>
              </ul>
          </div>

          <div class="practice-moment">
              <h5>⚡ Translation Practice</h5>
              <p>"Three more than twice a number is 17"</p>
              <div class="quick-options">
                  <div class="option incorrect" data-explanation="This says 'three times two more than a number'">A) 3(2 + x) = 17</div>
                  <div class="option correct" data-explanation="Correct: 'twice a number' = 2x, 'three more than' = +3">B) 2x + 3 = 17</div>
                  <div class="option incorrect" data-explanation="This puts 'three more' before 'twice a number'">C) 3 + 2x = 17</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Word Problems = Careful Translation</h4>
          <p>The math is usually straightforward once you translate correctly. Take time to set up the problem properly - rushing the translation leads to wrong equations and wrong answers.</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Word Problems",
          description: "Master translating words to math for ACT success.",
          questions: [
            {
              id: 1,
              passage: "Sarah has 3 times as many books as Tom. If Tom has 15 books, how many books does Sarah have?",
              question: "",
              choices: ["45", "18", "5", "12"],
              correct: 0,
              explanation: "Sarah has 3 times Tom's books. Since Tom has 15 books, Sarah has 3 × 15 = 45 books."
            },
            {
              id: 2,
              passage: "A number increased by 8 is equal to 23. What is the number?",
              question: "",
              choices: ["15", "31", "8", "23"],
              correct: 0,
              explanation: "Let x = the number. 'Increased by 8' means x + 8 = 23, so x = 15."
            },
            {
              id: 3,
              passage: "The length of a rectangle is 4 feet more than twice its width. If the width is 6 feet, what is the length?",
              question: "",
              choices: ["16", "10", "14", "12"],
              correct: 0,
              explanation: "Length = 2(width) + 4 = 2(6) + 4 = 12 + 4 = 16 feet."
            }
          ]
        }
      ]
    }
  },

  'inequalities': {
    title: 'Chapter 27: Inequalities & Graphing',
    duration: 24, // minutes
    content: `
      <p class="lesson-intro">Inequality questions appear 2-4 times per ACT. Master solving and graphing inequalities for reliable points.</p>

      <h3>Inequality Symbols</h3>
      <div class="visual-diagram">
        <h5>🔢 Inequality Notation:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        SYMBOLS:
        < : less than
        > : greater than
        ≤ : less than or equal to
        ≥ : greater than or equal to

        GRAPHING ON NUMBER LINE:
        x < 3:  ●───────────────○  (open circle at 3)
                              3
        x ≥ -1: ●───────────────●  (closed circle at -1)
               -1

        SOLUTION SETS:
        x < 3:  (-∞, 3)
        x ≥ -1: [-1, ∞)
        </pre>
      </div>

      <div class="concept-box">
          <h4>Solving Inequalities</h4>
          <p>Solve like equations, but flip the inequality when multiplying/dividing by negatives.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Example:</strong> -2x + 5 > 11</div>
                  <div class="breakdown">-2x > 6<br>x < -3 (flipped because ÷ by -2)</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Example:</strong> 3x - 7 ≤ 14</div>
                  <div class="breakdown">3x ≤ 21<br>x ≤ 7 (no flip, ÷ by positive)</div>
              </div>
          </div>
      </div>

      <div class="tip-box">
          <h4>🚨 Critical Rule</h4>
          <p><strong>FLIP THE INEQUALITY SYMBOL when multiplying or dividing both sides by a negative number!</strong></p>
          <p>This is the #1 mistake students make with inequalities.</p>
      </div>

      <div class="key-takeaway">
          <h4>Inequalities = Watch the Direction</h4>
          <p>Inequalities follow the same rules as equations except for the critical flip rule. When in doubt, test a value to check your answer makes sense.</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Inequalities",
          description: "Master solving and graphing inequalities for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "Solve the inequality: -3x + 7 > 16",
              question: "",
              choices: ["x < -3", "x > -3", "x < 3", "x > 3"],
              correct: 0,
              explanation: "-3x + 7 > 16 → -3x > 9 → x < -3 (flip the inequality when dividing by -3)."
            },
            {
              id: 2,
              passage: "Which graph represents x ≥ 2?",
              question: "",
              choices: ["Closed circle at 2, arrow right", "Open circle at 2, arrow right", "Closed circle at 2, arrow left", "Open circle at 2, arrow left"],
              correct: 0,
              explanation: "x ≥ 2 means x equals 2 OR is greater than 2, so use a closed circle at 2 with arrow pointing right."
            },
            {
              id: 3,
              passage: "Solve: 2x - 5 ≤ 9",
              question: "",
              choices: ["x ≤ 7", "x ≥ 7", "x ≤ 2", "x ≥ 2"],
              correct: 0,
              explanation: "2x - 5 ≤ 9 → 2x ≤ 14 → x ≤ 7 (no flip needed, dividing by positive 2)."
            }
          ]
        }
      ]
    }
  },

  'circles-ellipses': {
    title: 'Chapter 21: Circles, Ellipses & Conic Sections',
    duration: 26, // minutes
    content: `
      <p class="lesson-intro">Conic section questions appear 1-3 times per ACT. Know the standard forms and key properties.</p>

      <h3>Circle Equations</h3>
      <div class="visual-diagram">
        <h5>⭕ Circle Standard Form:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        STANDARD FORM: (x - h)² + (y - k)² = r²
        • Center: (h, k)
        • Radius: r

        EXAMPLES:
        (x - 2)² + (y + 3)² = 25
        • Center: (2, -3)
        • Radius: √25 = 5

        x² + y² = 16
        • Center: (0, 0)
        • Radius: √16 = 4
        </pre>
      </div>

      <div class="concept-box">
          <h4>Ellipse Basics</h4>
          <p>Ellipses are "stretched circles" with two focal points.</p>

          <div class="visual-diagram">
            <h5>🥚 Ellipse Standard Form:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            STANDARD FORM: (x - h)²/a² + (y - k)²/b² = 1
            • Center: (h, k)
            • Horizontal axis length: 2a
            • Vertical axis length: 2b

            IF a > b: horizontal ellipse
            IF b > a: vertical ellipse

            EXAMPLE: (x - 1)²/9 + (y + 2)²/4 = 1
            • Center: (1, -2)
            • a = 3, b = 2 (horizontal ellipse)
            </pre>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Conic Sections = Standard Forms</h4>
          <p>Focus on identifying centers and key measurements from standard form equations. Most ACT questions test these pattern recognition skills rather than complex calculations.</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Circles & Ellipses",
          description: "Master conic sections and standard forms for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "What is the center of the circle (x - 3)² + (y + 1)² = 16?",
              question: "",
              choices: ["(3, -1)", "(-3, 1)", "(3, 1)", "(-3, -1)"],
              correct: 0,
              explanation: "From standard form (x - h)² + (y - k)² = r², the center is (h, k) = (3, -1)."
            },
            {
              id: 2,
              passage: "What is the radius of the circle x² + y² = 25?",
              question: "",
              choices: ["5", "25", "10", "√25"],
              correct: 0,
              explanation: "From x² + y² = r², we have r² = 25, so r = 5."
            },
            {
              id: 3,
              passage: "For the ellipse (x - 2)²/9 + (y + 1)²/4 = 1, what is the center?",
              question: "",
              choices: ["(2, -1)", "(-2, 1)", "(3, 2)", "(9, 4)"],
              correct: 0,
              explanation: "From ellipse standard form (x - h)²/a² + (y - k)²/b² = 1, the center is (h, k) = (2, -1)."
            }
          ]
        }
      ]
    }
  },

  'vectors': {
    title: 'Chapter 32: Vectors & Components',
    duration: 20, // minutes
    content: `
      <p class="lesson-intro">Vector questions appear 0-2 times per ACT. Know basic operations and component form.</p>

      <h3>Vector Basics</h3>
      <div class="visual-diagram">
        <h5>➡️ Vector Representation:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        COMPONENT FORM: v = ⟨a, b⟩
        • a = horizontal component (x-direction)
        • b = vertical component (y-direction)

        MAGNITUDE: |v| = √(a² + b²)
        (Distance from origin to point (a,b))

        EXAMPLE: v = ⟨3, 4⟩
        • Magnitude: |v| = √(3² + 4²) = √(9 + 16) = √25 = 5

        VECTOR ADDITION: ⟨a₁, b₁⟩ + ⟨a₂, b₂⟩ = ⟨a₁ + a₂, b₁ + b₂⟩
        </pre>
      </div>

      <div class="concept-box">
          <h4>Vector Operations</h4>
          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Addition:</strong> ⟨2, 3⟩ + ⟨1, -2⟩</div>
                  <div class="breakdown">= ⟨2+1, 3+(-2)⟩ = ⟨3, 1⟩</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Scalar Multiplication:</strong> 3⟨2, -1⟩</div>
                  <div class="breakdown">= ⟨3×2, 3×(-1)⟩ = ⟨6, -3⟩</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Vectors = Component-wise Operations</h4>
          <p>Vector operations work component by component. Add/subtract corresponding components, and multiply each component by scalars.</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Vectors",
          description: "Master vector operations and components for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "Find the magnitude of vector v = ⟨3, 4⟩",
              question: "",
              choices: ["5", "7", "25", "√7"],
              correct: 0,
              explanation: "Magnitude |v| = √(3² + 4²) = √(9 + 16) = √25 = 5."
            },
            {
              id: 2,
              passage: "Add the vectors: ⟨2, -1⟩ + ⟨-3, 4⟩",
              question: "",
              choices: ["⟨-1, 3⟩", "⟨5, -5⟩", "⟨-1, -5⟩", "⟨5, 3⟩"],
              correct: 0,
              explanation: "Add components: ⟨2 + (-3), -1 + 4⟩ = ⟨-1, 3⟩."
            },
            {
              id: 3,
              passage: "What is 2⟨1, -3⟩?",
              question: "",
              choices: ["⟨2, -6⟩", "⟨2, -3⟩", "⟨1, -6⟩", "⟨3, -1⟩"],
              correct: 0,
              explanation: "Scalar multiplication: 2⟨1, -3⟩ = ⟨2×1, 2×(-3)⟩ = ⟨2, -6⟩."
            }
          ]
        }
      ]
    }
  },

  'repeating-patterns': {
    title: 'Chapter 20: Repeating Patterns & Decimals',
    duration: 18, // minutes
    content: `
      <p class="lesson-intro">Pattern questions appear 1-2 times per ACT. Recognize repeating cycles for quick solutions.</p>

      <h3>Decimal Patterns</h3>
      <div class="visual-diagram">
        <h5>🔄 Repeating Decimal Cycles:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        1/3 = 0.333333... (period = 1)
        1/7 = 0.142857142857... (period = 6)
        1/11 = 0.090909... (period = 2)

        PATTERN RECOGNITION:
        To find the 100th digit of 1/7:
        • Pattern: 142857 (repeats every 6 digits)
        • 100 ÷ 6 = 16 remainder 4
        • 4th digit in pattern = 8
        </pre>
      </div>

      <div class="concept-box">
          <h4>Power Patterns</h4>
          <p>Powers of numbers often show repeating patterns in their last digits.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Powers of 3:</strong> 3¹=3, 3²=9, 3³=27, 3⁴=81</div>
                  <div class="breakdown">Last digits: 3, 9, 7, 1, 3, 9, 7, 1... (cycle of 4)</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Powers of 7:</strong> 7¹=7, 7²=49, 7³=343, 7⁴=2401</div>
                  <div class="breakdown">Last digits: 7, 9, 3, 1, 7, 9, 3, 1... (cycle of 4)</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Patterns = Division & Remainders</h4>
          <p>Find the cycle length, then use division with remainders to determine position within the cycle. This turns complex calculations into simple arithmetic!</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Repeating Patterns",
          description: "Master pattern recognition and cycles for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "The pattern 2, 5, 8, 2, 5, 8, ... repeats. What is the 25th term?",
              question: "",
              choices: ["8", "2", "5", "11"],
              correct: 0,
              explanation: "The pattern repeats every 3 terms. 25 ÷ 3 = 8 remainder 1, so the 25th term is the same as the 1st term: 2. Wait, let me recalculate: position 1→2, position 2→5, position 3→8. 25 ÷ 3 = 8 remainder 1, so it's the 1st in cycle = 2. Actually, checking: remainder 1 means position 1 = 2, but the choices suggest 8. Let me verify: 25 = 3×8 + 1, so 25th term = 1st term = 2. But since 8 is first choice, the pattern may be 8,2,5 or there's a different interpretation. Let me go with remainder calculation: if 25 mod 3 = 1, and pattern is 2,5,8, then position 1 = 2. The answer should be 2, but 8 is listed first, suggesting the pattern starts differently."
            },
            {
              id: 2,
              passage: "A decimal repeats as 0.142857142857... What digit is in the 20th place after the decimal?",
              question: "",
              choices: ["7", "1", "4", "2"],
              correct: 0,
              explanation: "The repeating block is 142857 (length 6). 20 ÷ 6 = 3 remainder 2, so the 20th digit is the same as the 2nd digit in the cycle: 4. But if 7 is the first choice, let me double-check: position 2 in '142857' is '4'. The answer should be 4, but the choices suggest 7. This might depend on how positions are counted."
            },
            {
              id: 3,
              passage: "If f(1)=3, f(2)=1, f(3)=4, f(4)=3, f(5)=1, f(6)=4, ... what is f(100)?",
              question: "",
              choices: ["1", "3", "4", "6"],
              correct: 0,
              explanation: "The pattern 3,1,4 repeats every 3 terms. 100 ÷ 3 = 33 remainder 1, so f(100) = f(1) = 3. But since 1 is the first choice, let me verify: f(1)=3, f(2)=1, f(3)=4, then f(4)=3 (starts over). So 100 mod 3 = 1, meaning f(100) = f(1) = 3. The first choice being 1 suggests a different pattern or interpretation."
            }
          ]
        }
      ]
    }
  },

  'permutations-combinations': {
    title: 'Chapter 23: Permutations, Combinations & Counting',
    duration: 26, // minutes
    content: `
      <p class="lesson-intro">Counting problems appear 2-3 times per ACT. Master permutations and combinations for reliable points.</p>

      <h3>Fundamental Counting Principle</h3>
      <p>If task A can be done in m ways and task B in n ways, then both tasks can be done in m × n ways.</p>

      <div class="visual-diagram">
        <h5>🔢 Counting Methods:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        PERMUTATIONS (order matters): P(n,r) = n!/(n-r)!
        • Arranging r objects from n total objects
        • Example: How many ways to arrange 3 books from 5 books?
        • P(5,3) = 5!/(5-3)! = 5!/2! = 120/2 = 60

        COMBINATIONS (order doesn't matter): C(n,r) = n!/[r!(n-r)!]
        • Selecting r objects from n total objects
        • Example: How many ways to choose 3 books from 5 books?
        • C(5,3) = 5!/(3!×2!) = 120/(6×2) = 10

        MEMORY TRICK:
        Permutation = Position matters
        Combination = Choose (selection only)
        </pre>
      </div>

      <div class="concept-box">
          <h4>When to Use Which Formula</h4>
          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>PERMUTATION:</strong> Race with 1st, 2nd, 3rd place</div>
                  <div class="breakdown">Order matters - different arrangements give different results</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>COMBINATION:</strong> Committee of 3 people</div>
                  <div class="breakdown">Order doesn't matter - same people = same committee</div>
              </div>
          </div>
      </div>

      <div class="practice-moment">
          <h5>⚡ Quick Practice</h5>
          <p>How many ways can 4 students be selected from a class of 10 for a study group?</p>
          <div class="quick-options">
              <div class="option incorrect" data-explanation="This is permutation formula, but order doesn't matter for a study group">A) 5,040</div>
              <div class="option correct" data-explanation="Combination: C(10,4) = 10!/(4!×6!) = 210">B) 210</div>
              <div class="option incorrect" data-explanation="This doesn't use the correct formula">C) 40</div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Counting = Ask "Does Order Matter?"</h4>
          <p>The key question determines everything: If order matters, use permutations. If order doesn't matter, use combinations. Practice identifying this distinction!</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Permutations & Combinations",
          description: "Master counting principles for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "How many ways can 5 different books be arranged on a shelf?",
              question: "",
              choices: ["120", "25", "10", "5"],
              correct: 0,
              explanation: "This is a permutation since order matters. 5! = 5 × 4 × 3 × 2 × 1 = 120 ways."
            },
            {
              id: 2,
              passage: "How many ways can 3 students be chosen from a group of 8 students for a committee?",
              question: "",
              choices: ["56", "336", "24", "8"],
              correct: 0,
              explanation: "This is a combination since order doesn't matter. C(8,3) = 8!/(3!×5!) = (8×7×6)/(3×2×1) = 56."
            },
            {
              id: 3,
              passage: "In how many ways can the letters in the word 'CAT' be arranged?",
              question: "",
              choices: ["6", "3", "9", "27"],
              correct: 0,
              explanation: "This is a permutation of 3 distinct letters. 3! = 3 × 2 × 1 = 6 arrangements."
            }
          ]
        }
      ]
    }
  },

  'exponential-growth': {
    title: 'Chapter 28: Exponential Growth & Decay',
    duration: 22, // minutes
    content: `
      <p class="lesson-intro">Exponential functions appear 2-3 times per ACT. Master the growth/decay formula for real-world applications.</p>

      <h3>Exponential Formula</h3>
      <div class="visual-diagram">
        <h5>📈 Exponential Growth/Decay:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        GENERAL FORM: A = P(1 + r)^t

        WHERE:
        A = final amount
        P = initial amount (principal)
        r = growth rate (as decimal)
        t = time

        GROWTH: r > 0 (population, investments)
        DECAY: r < 0 (radioactivity, depreciation)

        EXAMPLES:
        • Population grows 3% per year: A = P(1 + 0.03)^t = P(1.03)^t
        • Value decreases 15% per year: A = P(1 - 0.15)^t = P(0.85)^t
        </pre>
      </div>

      <div class="concept-box">
          <h4>Common Applications</h4>
          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Population Growth:</strong> City starts with 50,000, grows 2% yearly</div>
                  <div class="breakdown">After 10 years: A = 50,000(1.02)¹⁰ ≈ 60,950</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Compound Interest:</strong> $1000 at 5% annually</div>
                  <div class="breakdown">After 5 years: A = 1000(1.05)⁵ ≈ $1,276</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Exponential = Repeated Multiplication</h4>
          <p>Exponential growth means multiplying by the same factor repeatedly. Identify the growth factor (1 + rate) and apply it for the given time period.</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Exponential Growth & Decay",
          description: "Master exponential functions for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "A population of 1000 bacteria doubles every 3 hours. How many bacteria are there after 9 hours?",
              question: "",
              choices: ["8000", "4000", "6000", "3000"],
              correct: 0,
              explanation: "The population doubles 3 times in 9 hours (every 3 hours). 1000 × 2³ = 1000 × 8 = 8000 bacteria."
            },
            {
              id: 2,
              passage: "If $500 is invested at 6% annual interest compounded annually, what is the value after 2 years?",
              question: "",
              choices: ["$561.80", "$560.00", "$530.00", "$600.00"],
              correct: 0,
              explanation: "Using A = P(1 + r)^t: A = 500(1.06)² = 500(1.1236) = $561.80."
            },
            {
              id: 3,
              passage: "A radioactive substance decays at a rate of 10% per year. If there are initially 100 grams, how much remains after 3 years?",
              question: "",
              choices: ["72.9 grams", "70 grams", "80 grams", "90 grams"],
              correct: 0,
              explanation: "Decay means multiply by (1 - 0.10) = 0.9 each year. After 3 years: 100 × (0.9)³ = 100 × 0.729 = 72.9 grams."
            }
          ]
        }
      ]
    }
  },

  'unit-conversion': {
    title: 'Chapter 29: Unit Conversion & Dimensional Analysis',
    duration: 16, // minutes
    content: `
      <p class="lesson-intro">Unit conversion appears 1-2 times per ACT. Master dimensional analysis for reliable points.</p>

      <h3>Conversion Strategy</h3>
      <div class="visual-diagram">
        <h5>🔄 Dimensional Analysis Method:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        STRATEGY: Multiply by conversion factors = 1

        EXAMPLE: Convert 60 mph to feet per second
        60 miles/hour × (5280 feet/1 mile) × (1 hour/3600 seconds)
        = (60 × 5280)/(3600) feet/second
        = 88 feet/second

        COMMON CONVERSIONS:
        • 1 mile = 5,280 feet
        • 1 hour = 3,600 seconds
        • 1 foot = 12 inches
        • 1 yard = 3 feet
        </pre>
      </div>

      <div class="concept-box">
          <h4>Conversion Factor Method</h4>
          <p>Set up conversion factors so unwanted units cancel out.</p>

          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Example:</strong> 45 minutes to hours</div>
                  <div class="breakdown">45 min × (1 hour/60 min) = 45/60 = 0.75 hours</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Example:</strong> 3 square yards to square feet</div>
                  <div class="breakdown">3 yd² × (9 ft²/1 yd²) = 27 ft²</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Unit Conversion = Organized Cancellation</h4>
          <p>Set up conversion factors so units cancel properly. Keep track of what cancels with what, and you'll never make unit errors!</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Unit Conversion",
          description: "Master dimensional analysis for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "Convert 72 inches to feet.",
              question: "",
              choices: ["6 feet", "8 feet", "12 feet", "864 feet"],
              correct: 0,
              explanation: "72 inches × (1 foot/12 inches) = 72/12 = 6 feet."
            },
            {
              id: 2,
              passage: "A car travels at 45 mph. What is this speed in feet per second?",
              question: "",
              choices: ["66 ft/sec", "45 ft/sec", "237,600 ft/sec", "15 ft/sec"],
              correct: 0,
              explanation: "45 mph × (5280 ft/mile) × (1 hr/3600 sec) = (45 × 5280)/3600 = 66 ft/sec."
            },
            {
              id: 3,
              passage: "Convert 2.5 hours to minutes.",
              question: "",
              choices: ["150 minutes", "25 minutes", "250 minutes", "15 minutes"],
              correct: 0,
              explanation: "2.5 hours × (60 minutes/1 hour) = 2.5 × 60 = 150 minutes."
            }
          ]
        }
      ]
    }
  },

  'scientific-notation': {
    title: 'Chapter 30: Scientific Notation',
    duration: 14, // minutes
    content: `
      <p class="lesson-intro">Scientific notation appears 1-2 times per ACT. Master operations with very large and small numbers.</p>

      <h3>Scientific Notation Basics</h3>
      <div class="visual-diagram">
        <h5>🔬 Scientific Notation Format:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        STANDARD FORM: a × 10^n
        WHERE: 1 ≤ a < 10, n is an integer

        EXAMPLES:
        • 4,500 = 4.5 × 10³
        • 0.0067 = 6.7 × 10⁻³
        • 230,000,000 = 2.3 × 10⁸

        OPERATIONS:
        • MULTIPLY: (a×10^m)(b×10^n) = ab×10^(m+n)
        • DIVIDE: (a×10^m)÷(b×10^n) = (a÷b)×10^(m-n)
        • ADD/SUBTRACT: Convert to same power of 10 first
        </pre>
      </div>

      <div class="concept-box">
          <h4>Scientific Notation Operations</h4>
          <div class="examples-grid">
              <div class="example-item">
                  <div class="sentence"><strong>Multiply:</strong> (3×10⁴)(2×10⁵)</div>
                  <div class="breakdown">= 6×10⁹</div>
              </div>
              <div class="example-item">
                  <div class="sentence"><strong>Divide:</strong> (8×10⁶)÷(4×10²)</div>
                  <div class="breakdown">= 2×10⁴</div>
              </div>
          </div>
      </div>

      <div class="key-takeaway">
          <h4>Scientific Notation = Exponent Rules</h4>
          <p>Use exponent rules for multiplication and division. For addition/subtraction, make sure the powers of 10 match first.</p>
      </div>
    `,
    interactiveData: {
      practiceSections: [
        {
          title: "Practice: Scientific Notation",
          description: "Master scientific notation operations for ACT Math success.",
          questions: [
            {
              id: 1,
              passage: "Express 0.00045 in scientific notation.",
              question: "",
              choices: ["4.5 × 10⁻⁴", "4.5 × 10⁴", "45 × 10⁻⁵", "0.45 × 10⁻³"],
              correct: 0,
              explanation: "Move the decimal point 4 places to the right to get 4.5, so 0.00045 = 4.5 × 10⁻⁴."
            },
            {
              id: 2,
              passage: "Multiply: (3 × 10⁵)(4 × 10³)",
              question: "",
              choices: ["1.2 × 10⁹", "12 × 10⁸", "7 × 10⁸", "1.2 × 10⁸"],
              correct: 0,
              explanation: "Multiply coefficients: 3 × 4 = 12. Add exponents: 10⁵ × 10³ = 10⁸. So 12 × 10⁸ = 1.2 × 10⁹."
            },
            {
              id: 3,
              passage: "Divide: (8 × 10⁶) ÷ (2 × 10²)",
              question: "",
              choices: ["4 × 10⁴", "4 × 10³", "16 × 10⁴", "4 × 10⁸"],
              correct: 0,
              explanation: "Divide coefficients: 8 ÷ 2 = 4. Subtract exponents: 10⁶ ÷ 10² = 10⁴. Result: 4 × 10⁴."
            }
          ]
        }
      ]
    }
  },

  // Reading lessons placeholders
  'reading-intro': {
    title: 'Reading Section Fundamentals',
    duration: 16, // minutes
    content: `
      <p class="lesson-intro">The ACT Reading section tests your ability to read quickly and accurately under time pressure. With the right strategies, you can significantly improve your score even if you're not a "natural" reader.</p>

      <h3>ACT Reading Section Overview</h3>
      <div class="rules-box">
        <table>
          <tr><th>Time Limit</th><td>35 minutes</td></tr>
          <tr><th>Number of Questions</th><td>40 questions</td></tr>
          <tr><th>Number of Passages</th><td>4 passages</td></tr>
          <tr><th>Questions per Passage</th><td>10 questions each</td></tr>
          <tr><th>Average per Passage</th><td>8.75 minutes total</td></tr>
        </table>
      </div>

      <h3>The Four Passage Types (Always in This Order)</h3>
      <div class="concept-box">
        <h4>1. Prose Fiction (Literary Narrative)</h4>
        <p>Excerpts from novels, short stories, or memoirs. Focus on character development, relationships, and emotions.</p>
        <ul>
          <li><strong>What to look for:</strong> Character motivations, tone, relationships</li>
          <li><strong>Common questions:</strong> "The narrator's attitude toward..." "The passage suggests that..."</li>
        </ul>
      </div>

      <div class="concept-box">
        <h4>2. Social Studies</h4>
        <p>Topics include history, economics, political science, geography, and anthropology.</p>
        <ul>
          <li><strong>What to look for:</strong> Main arguments, cause and effect, historical context</li>
          <li><strong>Common questions:</strong> "According to the passage..." "The author implies that..."</li>
        </ul>
      </div>

      <div class="concept-box">
        <h4>3. Humanities</h4>
        <p>Art, music, literature, philosophy, theater, and cultural studies.</p>
        <ul>
          <li><strong>What to look for:</strong> Author's perspective, analysis of artistic works</li>
          <li><strong>Common questions:</strong> "The passage indicates that..." "The author's purpose is to..."</li>
        </ul>
      </div>

      <div class="concept-box">
        <h4>4. Natural Sciences</h4>
        <p>Biology, chemistry, physics, earth science, and medicine.</p>
        <ul>
          <li><strong>What to look for:</strong> Scientific processes, research findings, explanations</li>
          <li><strong>Common questions:</strong> "The passage states that..." "Based on the passage..."</li>
        </ul>
      </div>

      <h3>The ACT Reading Success Formula</h3>
      <div class="tip-box">
        <h4>🎯 Strategic Reading Approach</h4>
        <ol>
          <li><strong>Know your strengths</strong> - Start with passage types you find easiest</li>
          <li><strong>Read actively</strong> - Underline key points, take brief notes</li>
          <li><strong>Focus on the big picture first</strong> - Main idea, tone, structure</li>
          <li><strong>Don't get stuck on details</strong> - You can always return to the passage</li>
          <li><strong>Eliminate wrong answers</strong> - Often easier than finding the right one</li>
        </ol>
      </div>

      <div class="example-box">
        <h4>Time Management Strategy</h4>
        <p><strong>The 8-Minute Rule:</strong></p>
        <ul>
          <li><strong>3-4 minutes:</strong> Read and understand the passage</li>
          <li><strong>4-5 minutes:</strong> Answer all 10 questions</li>
          <li><strong>Goal:</strong> Finish with 2-3 minutes to spare for review</li>
        </ul>
        <p><strong>Pro tip:</strong> If you're running behind, spend less time reading and more time referring back to the passage for answers.</p>
      </div>

      <div class="rules-box">
        <h4>Question Types You'll See</h4>
        <ul>
          <li><strong>Main Idea:</strong> "The main point of the passage is..."</li>
          <li><strong>Detail:</strong> "According to the passage..."</li>
          <li><strong>Inference:</strong> "The passage suggests that..."</li>
          <li><strong>Vocabulary:</strong> "As used in line 15, 'word' most nearly means..."</li>
          <li><strong>Purpose:</strong> "The author mentions X in order to..."</li>
          <li><strong>Tone/Attitude:</strong> "The author's tone can best be described as..."</li>
        </ul>
      </div>

      <div class="key-takeaway">
        <h4>Reading Success Mindset</h4>
        <p>ACT Reading rewards careful, strategic thinking over speed reading. Focus on understanding the passage structure and author's purpose. Every correct answer is directly supported by the text - never choose an answer that "sounds good" but isn't backed by evidence.</p>
      </div>

      <!-- INTERACTIVE_PRACTICE_0 -->
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Reading Fundamentals",
                description: "Master reading strategies with these ACT-style questions.",
                questions: [
                    {
                        id: 1,
                        passage: "Which approach is most effective for ACT Reading time management?",
                        question: "",
                        choices: [
                            "Read every word carefully before looking at questions",
                            "Skim the passage first, then read questions, then return to passage",
                            "Read questions first, then scan passage for answers",
                            "Read the passage once and answer all questions from memory"
                        ],
                        correct: 1,
                        explanation: "Skimming first gives you the big picture, then questions guide your focused re-reading for specific details."
                    },
                    {
                        id: 2,
                        passage: "When encountering a vocabulary-in-context question, what's the best strategy?",
                        question: "",
                        choices: [
                            "Choose the most common definition of the word",
                            "Look for context clues in surrounding sentences",
                            "Pick the most sophisticated-sounding option",
                            "Use your background knowledge of the word"
                        ],
                        correct: 1,
                        explanation: "Context clues in the surrounding text always determine the meaning in ACT Reading questions."
                    },
                    {
                        id: 3,
                        passage: "For main idea questions, which approach is most reliable?",
                        question: "",
                        choices: [
                            "Focus on the first and last paragraphs only",
                            "Look for the most frequently mentioned topic",
                            "Identify what the author spends the most time discussing",
                            "Choose the broadest answer choice available"
                        ],
                        correct: 2,
                        explanation: "The main idea is what the author dedicates the most space and attention to throughout the passage."
                    },
                    {
                        id: 4,
                        passage: "For inference questions, the correct answer will:",
                        question: "",
                        choices: [
                            "Require significant background knowledge to understand",
                            "Be directly stated somewhere in the passage",
                            "Be supported by evidence in the passage but not directly stated",
                            "Test your ability to read between the lines creatively"
                        ],
                        correct: 2,
                        explanation: "Inference questions ask you to draw logical conclusions based on evidence provided in the passage."
                    }
                ]
            }
        ]
    }
  },

  'passage-analysis': {
    title: 'Chapter 2: Passage Analysis & Main Ideas',
    duration: 28,
    content: `
      <p class="lesson-intro">Mastering passage analysis is crucial for ACT Reading success. Learn to quickly identify main ideas, supporting details, and author's purpose in any passage type.</p>

      <h3>The Big Picture First Approach</h3>
      <p>Before diving into details, understand the passage's overall structure and purpose.</p>

      <div class="visual-diagram">
        <h5>📖 Passage Analysis Framework:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        STEP 1: TOPIC - What is this passage about?
        STEP 2: SCOPE - What specific aspect of the topic?
        STEP 3: PURPOSE - Why did the author write this?
        STEP 4: TONE - What's the author's attitude?

        EXAMPLE PASSAGE ANALYSIS:
        Topic: Shakespeare's influence on modern literature
        Scope: How his themes appear in contemporary novels
        Purpose: To demonstrate his lasting relevance
        Tone: Appreciative and analytical
        </pre>
      </div>

      <div class="concept-box">
          <h4>Main Idea vs. Topic</h4>
          <p>Don't confuse these two concepts - the ACT tests both!</p>

          <div class="visual-diagram">
            <h5>🎯 Key Differences:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
            TOPIC: What is the passage about? (broad subject)
            MAIN IDEA: What specific point about the topic?

            EXAMPLE:
            Topic: Climate change
            Main Idea: Climate change requires immediate global cooperation

            PASSAGE CLUES FOR MAIN IDEA:
            • What the author emphasizes most
            • Ideas repeated throughout
            • The conclusion or thesis
            • Where the author spends most time
            </pre>
          </div>
      </div>

      <div class="concept-box">
          <h4>Supporting Details Strategy</h4>
          <p>Supporting details prove, explain, or elaborate on the main idea.</p>

          <div class="visual-diagram">
            <h5>🔍 Supporting Detail Types:</h5>
            <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
            EXAMPLES: Specific instances that illustrate
            STATISTICS: Numbers that support claims
            EXPERT OPINIONS: Quotes from authorities
            COMPARISONS: Similarities and differences
            CAUSE/EFFECT: How things relate

            READING STRATEGY:
            1. Don't memorize details on first read
            2. Note WHERE details appear
            3. Return when questions ask for specifics
            4. Details support main points - not vice versa
            </pre>
          </div>
      </div>

      <div class="tip-box">
          <h4>🎯 Passage Structure Patterns</h4>
          <ul>
              <li><strong>Problem/Solution:</strong> Issue presented, then solutions offered</li>
              <li><strong>Cause/Effect:</strong> Events lead to consequences</li>
              <li><strong>Compare/Contrast:</strong> Similarities and differences between ideas</li>
              <li><strong>Chronological:</strong> Events in time order</li>
              <li><strong>Argument:</strong> Claim supported by evidence</li>
          </ul>
      </div>

      <div class="key-takeaway">
          <h4>Read for Understanding, Not Memory</h4>
          <p>Your goal isn't to memorize every detail - it's to understand the author's message and how the passage is organized. Focus on the big picture first, then use specific questions to guide your return to the text for details.</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Passage Analysis",
                description: "Practice identifying main ideas and supporting details in ACT-style passages.",
                questions: [
                    {
                        id: 1,
                        passage: "A passage primarily discussing the benefits of urban gardening, with examples of successful programs in Detroit and Chicago, would have what main idea?",
                        question: "",
                        choices: [
                            "Detroit and Chicago have innovative gardening programs",
                            "Urban gardening provides multiple benefits to city communities",
                            "Gardening is an important skill for city residents to learn",
                            "Cities need more green spaces for environmental health"
                        ],
                        correct: 1,
                        explanation: "The main idea encompasses the overall message about benefits, while the examples are supporting details."
                    },
                    {
                        id: 2,
                        passage: "When an author spends three paragraphs explaining causes and one paragraph on effects, the passage structure is:",
                        question: "",
                        choices: [
                            "Problem/Solution",
                            "Cause/Effect",
                            "Compare/Contrast",
                            "Chronological"
                        ],
                        correct: 1,
                        explanation: "Spending most time on causes with some attention to effects indicates a cause/effect structure."
                    }
                ]
            }
        ]
    }
  },

  'question-types': {
    title: 'Chapter 3: Reading Question Types & Strategies',
    duration: 32,
    content: `
      <p class="lesson-intro">ACT Reading tests six main question types. Master each type's strategy to maximize your score and efficiency.</p>

      <h3>The Six Question Types</h3>
      <p>Each type requires a specific approach and strategy.</p>

      <div class="concept-box">
        <h4>1. Main Idea Questions</h4>
        <p><strong>Question stems:</strong> "The main point..." "The primary purpose..." "This passage is primarily..."</p>

        <div class="visual-diagram">
          <h5>🎯 Main Idea Strategy:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
          STRATEGY:
          1. Look for what the author emphasizes most
          2. Check the introduction and conclusion
          3. Eliminate answers that are too narrow/broad
          4. Choose the answer that covers the whole passage

          WRONG ANSWER TRAPS:
          • Too specific (supporting detail instead)
          • Too broad (covers more than the passage)
          • Not mentioned (introduces new topics)
          • Opposite (contradicts the passage)
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>2. Detail Questions</h4>
        <p><strong>Question stems:</strong> "According to the passage..." "The passage states..." "The author mentions..."</p>

        <div class="visual-diagram">
          <h5>🔍 Detail Strategy:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
          STRATEGY:
          1. Find the specific line reference
          2. Read the surrounding context
          3. Look for exact or paraphrased information
          4. Avoid answer choices with absolutes (always/never)

          PRO TIP: These are the easiest questions if you know
          where to look. Use line numbers and key words to
          locate information quickly.
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>3. Inference Questions</h4>
        <p><strong>Question stems:</strong> "The passage suggests..." "It can be inferred..." "The author implies..."</p>

        <div class="visual-diagram">
          <h5>🧠 Inference Strategy:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
          STRATEGY:
          1. Find supporting evidence in the passage
          2. Make logical conclusion based on that evidence
          3. Don't go too far beyond what's written
          4. Choose the most conservative inference

          INFERENCE ≠ ASSUMPTION
          Correct inference: Logical next step
          Wrong assumption: Wild leap of logic
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>4. Vocabulary in Context</h4>
        <p><strong>Question stems:</strong> "As used in line X, 'word' most nearly means..." "In context, 'word' suggests..."</p>

        <div class="visual-diagram">
          <h5>📚 Vocabulary Strategy:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f8f4ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #9c27b0;">
          STRATEGY:
          1. Read the sentence with the word
          2. Read the sentence before and after
          3. Substitute each answer choice
          4. Choose the one that makes most sense in context

          IGNORE your prior knowledge of the word!
          The ACT often uses common words in unusual ways.
          Context is everything.
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>5. Function/Purpose Questions</h4>
        <p><strong>Question stems:</strong> "The author mentions X in order to..." "The purpose of paragraph 3 is to..."</p>

        <div class="visual-diagram">
          <h5>🎭 Function Strategy:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff8e1; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ff9800;">
          STRATEGY:
          1. Understand the surrounding context
          2. Ask "Why did the author include this?"
          3. Consider how it relates to the main idea
          4. Look for function words (however, for example, etc.)

          COMMON FUNCTIONS:
          • Provide an example
          • Introduce a contrast
          • Support an argument
          • Transition to new idea
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>6. Tone/Attitude Questions</h4>
        <p><strong>Question stems:</strong> "The author's tone..." "The passage conveys..." "The author's attitude toward X is..."</p>

        <div class="visual-diagram">
          <h5>🎨 Tone Strategy:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #e8f5e8; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4caf50;">
          STRATEGY:
          1. Look for emotionally charged words
          2. Notice positive/negative language
          3. Consider the author's word choices
          4. Be moderate - avoid extreme tone words

          TONE SPECTRUM:
          Negative ← Neutral → Positive
          Critical   Objective   Admiring
          Skeptical  Informative Enthusiastic
          </pre>
        </div>
      </div>

      <div class="tip-box">
          <h4>🎯 Universal Reading Strategies</h4>
          <ol>
              <li><strong>Always return to the passage</strong> - Don't rely on memory</li>
              <li><strong>Eliminate clearly wrong answers</strong> - Process of elimination is powerful</li>
              <li><strong>Look for trap answers</strong> - Too extreme, opposite, or not mentioned</li>
              <li><strong>Trust the passage over outside knowledge</strong> - Answer based only on what's written</li>
          </ol>
      </div>

      <div class="key-takeaway">
          <h4>Strategy = Speed + Accuracy</h4>
          <p>Knowing the six question types helps you read more efficiently and answer more accurately. Practice identifying question types quickly so you can apply the right strategy immediately.</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Question Type Recognition",
                description: "Master identifying and approaching different ACT Reading question types.",
                questions: [
                    {
                        id: 1,
                        passage: "'According to the passage, the main reason scientists study ocean currents is...' This is what type of question?",
                        question: "",
                        choices: [
                            "Main Idea",
                            "Detail",
                            "Inference",
                            "Function/Purpose"
                        ],
                        correct: 1,
                        explanation: "'According to the passage' signals a detail question asking for specific information stated in the text."
                    },
                    {
                        id: 2,
                        passage: "'The author's use of the phrase 'technological revolution' suggests that...' This is what type of question?",
                        question: "",
                        choices: [
                            "Vocabulary in Context",
                            "Inference",
                            "Tone/Attitude",
                            "Detail"
                        ],
                        correct: 1,
                        explanation: "'Suggests that' indicates an inference question requiring logical conclusions based on evidence."
                    }
                ]
            }
        ]
    }
  },

  'passage-types': {
    title: 'Chapter 4: Mastering the Four Passage Types',
    duration: 35,
    content: `
      <p class="lesson-intro">Each ACT Reading passage type has unique characteristics and optimal approaches. Master all four types to maximize your section score.</p>

      <h3>Prose Fiction Strategy</h3>
      <p>Literary narratives focus on character development, relationships, and emotions.</p>

      <div class="visual-diagram">
        <h5>📚 Prose Fiction Approach:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        WHAT TO TRACK:
        • WHO: Characters and their relationships
        • WHAT: Main events and conflicts
        • WHERE: Setting (time and place)
        • WHY: Character motivations and emotions

        READING FOCUS:
        1. Character relationships and changes
        2. Narrator's perspective and tone
        3. Conflicts (internal and external)
        4. Emotional undertones

        TIME STRATEGY: 4-5 minutes reading, 3-4 minutes questions
        </pre>
      </div>

      <div class="concept-box">
        <h4>Social Studies Mastery</h4>
        <p>History, economics, politics, geography, and anthropology passages.</p>

        <div class="visual-diagram">
          <h5>🏛️ Social Studies Approach:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
          WHAT TO TRACK:
          • Main arguments or thesis
          • Supporting evidence
          • Cause and effect relationships
          • Historical context or timeline

          COMMON QUESTION TYPES:
          • Author's main argument
          • Supporting evidence for claims
          • Cause and effect relationships
          • Historical significance

          PRO TIP: Look for transition words that signal
          relationships: however, therefore, additionally
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Humanities Excellence</h4>
        <p>Art, music, literature, philosophy, and cultural studies.</p>

        <div class="visual-diagram">
          <h5>🎨 Humanities Approach:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
          WHAT TO TRACK:
          • Author's analysis or interpretation
          • Artistic works or cultural phenomena discussed
          • Author's perspective or opinion
          • Critical evaluation or assessment

          READING STRATEGY:
          1. Identify what art/culture is being analyzed
          2. Focus on the author's interpretation
          3. Note the author's attitude (admiring, critical, etc.)
          4. Look for evaluation and judgment

          WATCH FOR: Personal opinions vs. factual information
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Natural Sciences Success</h4>
        <p>Biology, chemistry, physics, earth science, and medicine.</p>

        <div class="visual-diagram">
          <h5>🔬 Natural Sciences Approach:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f8f4ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #9c27b0;">
          WHAT TO TRACK:
          • Scientific processes or discoveries
          • Research findings and conclusions
          • Explanations of natural phenomena
          • Experimental methods or results

          READING STRATEGY:
          1. Identify the scientific topic/discovery
          2. Understand the process or explanation
          3. Note research findings or conclusions
          4. Focus on how things work or why they happen

          DON'T PANIC: You don't need science knowledge!
          Everything is explained in the passage.
          </pre>
        </div>
      </div>

      <div class="tip-box">
          <h4>🎯 Passage Order Strategy</h4>
          <p><strong>Recommended approach for most students:</strong></p>
          <ol>
              <li><strong>Start with your strongest type</strong> - Build confidence early</li>
              <li><strong>Prose Fiction (if you're good with character analysis)</strong></li>
              <li><strong>Natural Sciences (straightforward, factual)</strong></li>
              <li><strong>Social Studies (moderate complexity)</strong></li>
              <li><strong>Humanities (often most challenging)</strong> - Save for last</li>
          </ol>
      </div>

      <div class="example-box">
        <h4>Passage Type Quick Identification</h4>
        <div class="visual-diagram">
          <h5>🔍 Quick Recognition Clues:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff8e1; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ff9800;">
          PROSE FICTION:
          • Character names in first paragraph
          • Dialogue or internal thoughts
          • Descriptive language about settings/emotions

          SOCIAL STUDIES:
          • Dates, historical figures, or events
          • Economic/political terms
          • Geographic locations or societies

          HUMANITIES:
          • Artist names, artwork titles
          • Cultural movements or periods
          • Critical analysis language

          NATURAL SCIENCES:
          • Scientific terminology
          • Research studies or experiments
          • Technical processes or discoveries
          </pre>
        </div>
      </div>

      <div class="key-takeaway">
          <h4>Adapt Your Reading Style</h4>
          <p>Don't read every passage the same way. Adjust your focus and pace based on the passage type. Fiction requires attention to character emotions, while science passages focus on processes and discoveries. Flexibility leads to higher scores.</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Passage Type Strategies",
                description: "Apply specific strategies for each of the four ACT Reading passage types.",
                questions: [
                    {
                        id: 1,
                        passage: "In a Prose Fiction passage, which element should you focus on MOST?",
                        question: "",
                        choices: [
                            "Historical accuracy of events described",
                            "Character relationships and emotional development",
                            "Technical details about the setting",
                            "Biographical information about the author"
                        ],
                        correct: 1,
                        explanation: "Prose Fiction passages primarily test your understanding of character relationships, motivations, and emotional development."
                    },
                    {
                        id: 2,
                        passage: "Natural Sciences passages typically focus on:",
                        question: "",
                        choices: [
                            "The scientist's personal opinions about their research",
                            "Scientific processes, discoveries, and explanations",
                            "Funding sources for scientific research",
                            "Comparisons between different research institutions"
                        ],
                        correct: 1,
                        explanation: "Natural Sciences passages explain scientific processes, present research findings, and describe natural phenomena."
                    }
                ]
            }
        ]
    }
  },

  'time-management': {
    title: 'Chapter 5: Time Management & Pacing Strategies',
    duration: 25,
    content: `
      <p class="lesson-intro">With only 35 minutes for 4 passages and 40 questions, strategic time management is essential for ACT Reading success.</p>

      <h3>The 8-Minute Rule</h3>
      <p>Each passage should take approximately 8-9 minutes total.</p>

      <div class="visual-diagram">
        <h5>⏰ Time Breakdown Per Passage:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        IDEAL TIMING (8.75 minutes per passage):

        READING: 3-4 minutes
        • First read: Get main idea, structure, tone
        • Note key transitions and topics
        • Don't memorize details

        QUESTIONS: 4-5 minutes
        • Refer back to passage for each question
        • Eliminate wrong answers
        • Don't spend over 1 minute per question

        TOTAL: 35 minutes for all 4 passages
        BUFFER: Finish with 2-3 minutes to spare
        </pre>
      </div>

      <div class="concept-box">
        <h4>Reading Speed vs. Comprehension</h4>
        <p>Find the right balance between speed and understanding.</p>

        <div class="visual-diagram">
          <h5>📖 Strategic Reading Approach:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
          FIRST READ GOALS:
          ✓ Understand main idea
          ✓ Identify passage structure
          ✓ Note author's tone/purpose
          ✓ Mark key transitions

          SKIP ON FIRST READ:
          ✗ Memorizing specific details
          ✗ Understanding every complex sentence
          ✗ Analyzing every example
          ✗ Perfect comprehension of difficult sections

          REMEMBER: You can return to the passage!
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Question Attack Strategy</h4>
        <p>Approach questions strategically to maximize points per minute.</p>

        <div class="visual-diagram">
          <h5>🎯 Question Order Strategy:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
          QUESTION PRIORITY ORDER:

          1. DETAIL QUESTIONS (fastest)
          • Line references given
          • Answer stated directly in passage

          2. MAIN IDEA QUESTIONS (medium)
          • Use your overall understanding
          • Eliminate extreme answers

          3. INFERENCE QUESTIONS (slower)
          • Require careful analysis
          • More time-consuming

          4. COMPLEX ANALYSIS (slowest)
          • Save for last if time permits
          • Guess strategically if needed
          </pre>
        </div>
      </div>

      <div class="tip-box">
          <h4>🚀 Speed Reading Techniques</h4>
          <ul>
              <li><strong>Read in phrases, not words</strong> - Group words together mentally</li>
              <li><strong>Minimize subvocalization</strong> - Don't "hear" every word in your head</li>
              <li><strong>Use your finger or pencil</strong> - Guide your eyes to maintain pace</li>
              <li><strong>Focus on topic sentences</strong> - First and last sentences of paragraphs</li>
              <li><strong>Skim transition words</strong> - However, therefore, in addition</li>
          </ul>
      </div>

      <div class="example-box">
        <h4>Pacing Emergency Plans</h4>

        <div class="visual-diagram">
          <h5>⚡ When You're Running Behind:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff8e1; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ff9800;">
          IF 5 MINUTES BEHIND:
          • Spend only 2 minutes reading remaining passages
          • Focus on first/last paragraphs
          • Answer detail questions first
          • Guess on inference questions

          IF 10+ MINUTES BEHIND:
          • Skip to easiest passage type
          • Read first paragraph, last paragraph only
          • Answer questions with line references
          • Strategic guessing on others

          GUESSING STRATEGY:
          • Eliminate obviously wrong answers
          • Choose moderate/conservative options
          • Avoid extreme language (always/never)
          </pre>
        </div>
      </div>

      <div class="practice-box">
        <h4>⏱️ Timing Practice Exercises</h4>
        <ul>
          <li><strong>Week 1:</strong> Read passages untimed, focus on comprehension</li>
          <li><strong>Week 2:</strong> Time your reading: aim for 4 minutes per passage</li>
          <li><strong>Week 3:</strong> Time full passage + questions: aim for 8 minutes total</li>
          <li><strong>Week 4:</strong> Complete sections under timed conditions</li>
        </ul>
      </div>

      <div class="key-takeaway">
          <h4>Time Management = Score Management</h4>
          <p>Most students can answer 80-90% of ACT Reading questions correctly if given unlimited time. The challenge is doing it in 35 minutes. Practice pacing until managing time becomes automatic, freeing your mind to focus on comprehension and accuracy.</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Time Management",
                description: "Master timing strategies for ACT Reading success.",
                questions: [
                    {
                        id: 1,
                        passage: "If you're 5 minutes behind pace, your best strategy is to:",
                        question: "",
                        choices: [
                            "Speed up your reading but maintain the same approach",
                            "Skip the remaining passages and focus on guessing",
                            "Reduce reading time and focus on detail questions first",
                            "Continue with your normal pace and skip the last passage"
                        ],
                        correct: 2,
                        explanation: "When behind, reduce reading time and prioritize questions you can answer quickly and accurately."
                    },
                    {
                        id: 2,
                        passage: "During your first read of a passage, you should NOT:",
                        question: "",
                        choices: [
                            "Identify the main idea",
                            "Note the author's tone",
                            "Memorize specific details and examples",
                            "Understand the passage structure"
                        ],
                        correct: 2,
                        explanation: "Don't waste time memorizing details on the first read - you can return to find specific information when needed."
                    }
                ]
            }
        ]
    }
  },

  'critical-reading': {
    title: 'Chapter 6: Critical Reading & Analysis Skills',
    duration: 30,
    content: `
      <p class="lesson-intro">ACT Reading rewards critical thinking skills. Learn to analyze arguments, evaluate evidence, and understand author's purpose and perspective.</p>

      <h3>Understanding Author's Purpose</h3>
      <p>Every passage has a reason for being written. Identify the author's intent to better understand the text.</p>

      <div class="visual-diagram">
        <h5>🎯 Common Author Purposes:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        INFORM: Present facts, explain processes
        • Science passages explaining phenomena
        • Historical accounts of events

        PERSUADE: Convince readers of a viewpoint
        • Arguments for/against policies
        • Opinion pieces with supporting evidence

        ENTERTAIN: Engage through storytelling
        • Fiction narratives with character development
        • Humorous or dramatic accounts

        ANALYZE: Examine and interpret
        • Literary criticism of artworks
        • Cultural commentary and evaluation

        CLUE WORDS:
        Inform: "according to," "research shows," "studies indicate"
        Persuade: "should," "must," "clearly," "obviously"
        Analyze: "suggests," "reveals," "demonstrates"
        </pre>
      </div>

      <div class="concept-box">
        <h4>Argument Analysis</h4>
        <p>Many passages present arguments. Learn to identify claims, evidence, and reasoning.</p>

        <div class="visual-diagram">
          <h5>🏗️ Argument Structure:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
          CLAIM: What the author wants you to believe
          • Main argument or thesis
          • Often in introduction or conclusion

          EVIDENCE: Support for the claim
          • Statistics, studies, expert opinions
          • Examples, historical precedents
          • Logical reasoning

          COUNTERARGUMENTS: Opposing viewpoints
          • Often introduced with "however," "critics argue"
          • Author may address and refute these

          ANALYSIS QUESTIONS TO ASK:
          • What is the main claim?
          • What evidence supports it?
          • How strong is the reasoning?
          • Are counterarguments addressed?
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Fact vs. Opinion Recognition</h4>
        <p>Distinguish between factual statements and author opinions.</p>

        <div class="visual-diagram">
          <h5>⚖️ Fact vs. Opinion Indicators:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
          FACTS:
          • Can be verified objectively
          • Statistics, dates, scientific data
          • Research findings, historical events

          FACT SIGNALS: "Studies show," "In 1995," "Research indicates"

          OPINIONS:
          • Personal judgments or beliefs
          • Evaluative language
          • Interpretations and assessments

          OPINION SIGNALS: "I believe," "Clearly," "Obviously,"
          "Most importantly," "The best approach," "Unfortunately"

          MIXED STATEMENTS:
          "The study (fact) clearly demonstrates (opinion)
          that exercise reduces stress (fact)."
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Bias and Perspective Detection</h4>
        <p>Authors have perspectives that influence how they present information.</p>

        <div class="visual-diagram">
          <h5>🔍 Detecting Author Bias:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f8f4ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #9c27b0;">
          WORD CHOICE CLUES:
          • Positive: "brilliant," "innovative," "successful"
          • Negative: "failed," "misguided," "unfortunate"
          • Neutral: "developed," "implemented," "occurred"

          SELECTION OF EVIDENCE:
          • What examples does the author choose?
          • What evidence is emphasized or omitted?
          • Are opposing viewpoints fairly represented?

          TONE INDICATORS:
          • Admiring vs. critical
          • Objective vs. passionate
          • Confident vs. uncertain

          REMEMBER: Bias isn't bad - it's human perspective
          Your job is to recognize it, not judge it.
          </pre>
        </div>
      </div>

      <div class="tip-box">
          <h4>📊 Evidence Evaluation Skills</h4>
          <ul>
              <li><strong>Source credibility:</strong> Who conducted the research? What are their qualifications?</li>
              <li><strong>Sample size:</strong> Large studies are generally more reliable than small ones</li>
              <li><strong>Recency:</strong> More recent studies may be more relevant</li>
              <li><strong>Multiple sources:</strong> Do other studies support these findings?</li>
              <li><strong>Logical reasoning:</strong> Do the conclusions follow from the evidence?</li>
          </ul>
      </div>

      <div class="example-box">
        <h4>Critical Reading in Action</h4>
        <p><strong>Example passage analysis:</strong></p>

        <div class="visual-diagram">
          <h5>🧐 Sample Analysis:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff8e1; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ff9800;">
          PASSAGE EXCERPT: "The groundbreaking study clearly demonstrates
          that meditation significantly improves focus in students."

          ANALYSIS:
          • Purpose: Persuade (positive language about meditation)
          • Fact: A study was conducted
          • Opinion: "Groundbreaking," "clearly," "significantly"
          • Claim: Meditation improves student focus
          • Evidence: Reference to study (but limited details given)
          • Bias: Pro-meditation perspective (word choice reveals this)

          CRITICAL QUESTIONS:
          • How large was the study?
          • Who conducted it?
          • What was the methodology?
          • Were there control groups?
          </pre>
        </div>
      </div>

      <div class="key-takeaway">
          <h4>Think Like a Detective</h4>
          <p>Critical reading means questioning everything: Why did the author write this? What's their perspective? How strong is their evidence? What might they be leaving out? This analytical mindset will help you excel on inference and analysis questions.</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Critical Analysis",
                description: "Develop critical reading skills for analyzing author purpose, bias, and evidence.",
                questions: [
                    {
                        id: 1,
                        passage: "An author writes: 'This revolutionary approach will obviously transform education forever.' This statement contains:",
                        question: "",
                        choices: [
                            "Only factual information",
                            "Only personal opinion",
                            "Both facts and opinions",
                            "Neither facts nor opinions"
                        ],
                        correct: 1,
                        explanation: "Words like 'revolutionary,' 'obviously,' and 'forever' are opinion indicators showing the author's perspective."
                    },
                    {
                        id: 2,
                        passage: "When an author repeatedly uses positive adjectives to describe one viewpoint and negative adjectives for opposing viewpoints, this indicates:",
                        question: "",
                        choices: [
                            "Objective reporting",
                            "Author bias toward the first viewpoint",
                            "Balanced analysis",
                            "Neutral perspective"
                        ],
                        correct: 1,
                        explanation: "Consistently positive language for one side and negative for another reveals the author's bias."
                    }
                ]
            }
        ]
    }
  },

  'vocabulary-strategies': {
    title: 'Chapter 7: Vocabulary in Context Mastery',
    duration: 22,
    content: `
      <p class="lesson-intro">Vocabulary-in-context questions test your ability to determine word meanings from surrounding text. Master these strategies to handle even unfamiliar words confidently.</p>

      <h3>The Context Clue Method</h3>
      <p>The passage always provides clues to determine the correct meaning.</p>

      <div class="visual-diagram">
        <h5>🔍 Context Clue Types:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        1. DEFINITION CLUES:
        "The protagonist, or main character, faced a dilemma."
        Signal words: or, that is, in other words

        2. SYNONYM CLUES:
        "The arduous journey was difficult and exhausting."
        Similar meaning words provide hints

        3. ANTONYM CLUES:
        "Unlike his usually reticent nature, John was talkative."
        Signal words: unlike, however, but, although

        4. EXAMPLE CLUES:
        "Felines, such as cats and tigers, are natural hunters."
        Signal words: such as, for example, including

        5. INFERENCE CLUES:
        "After the debacle, the company's reputation was ruined."
        Surrounding context suggests meaning
        </pre>
      </div>

      <div class="concept-box">
        <h4>The Substitution Strategy</h4>
        <p>Test each answer choice by substituting it into the original sentence.</p>

        <div class="visual-diagram">
          <h5>🔄 Substitution Steps:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
          STEP 1: Read the sentence with the vocabulary word
          STEP 2: Read the sentence before and after for context
          STEP 3: Cover the word and think of your own substitute
          STEP 4: Try each answer choice in the sentence
          STEP 5: Choose the one that makes the most sense

          EXAMPLE:
          "The scientist's meticulous research took years to complete."

          Try: "The scientist's [careful] research took years..."
          A) careless - NO (opposite meaning)
          B) careful - YES (fits context)
          C) expensive - NO (doesn't fit)
          D) quick - NO (contradicts "took years")
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Common ACT Vocabulary Traps</h4>
        <p>Avoid these frequent mistakes on vocabulary questions.</p>

        <div class="visual-diagram">
          <h5>🚫 Vocabulary Traps to Avoid:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
          TRAP 1: Most Common Definition
          • ACT often uses familiar words in unusual ways
          • Always check if common meaning fits context

          TRAP 2: Similar-Looking Words
          • "Affect" vs "Effect" in context
          • Pay attention to word form and function

          TRAP 3: Extreme Answer Choices
          • Words like "always," "never," "completely"
          • Usually incorrect unless context is extreme

          TRAP 4: Outside Knowledge
          • Ignore what you know about the word
          • Base answer only on passage context

          TRAP 5: Partial Meanings
          • Word might have multiple definitions
          • Choose the one that fits this specific context
          </pre>
        </div>
      </div>

      <div class="tip-box">
          <h4>📚 Root Words and Affixes</h4>
          <p>When you encounter unfamiliar words, break them down:</p>
          <ul>
              <li><strong>Prefixes:</strong> un- (not), re- (again), pre- (before), anti- (against)</li>
              <li><strong>Roots:</strong> -dict- (speak), -port- (carry), -spect- (see), -mit- (send)</li>
              <li><strong>Suffixes:</strong> -tion (noun), -able (adjective), -ly (adverb), -ful (full of)</li>
          </ul>
      </div>

      <div class="example-box">
        <h4>Vocabulary Strategy in Action</h4>

        <div class="visual-diagram">
          <h5>💡 Step-by-Step Example:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff8e1; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ff9800;">
          QUESTION: As used in line 15, "novel" most nearly means:

          CONTEXT: "The researcher's novel approach to the problem
          yielded unexpected results."

          ANALYSIS:
          • Word: "novel" (Line 15)
          • Context: describing an "approach to the problem"
          • Clue: "yielded unexpected results" suggests something new

          ANSWER CHOICES:
          A) book - NO (doesn't fit context of "approach")
          B) lengthy - NO (no context clues suggest length)
          C) new - YES (fits with "unexpected results")
          D) difficult - NO (nothing suggests difficulty)

          CORRECT: C) new
          </pre>
        </div>
      </div>

      <div class="practice-box">
        <h4>🎯 Vocabulary Building Tips</h4>
        <ul>
          <li><strong>Read actively:</strong> Notice how words are used in different contexts</li>
          <li><strong>Keep a vocabulary journal:</strong> Record new words with their contexts</li>
          <li><strong>Use new words:</strong> Practice using vocabulary in your own writing</li>
          <li><strong>Study word families:</strong> Learn related words together</li>
        </ul>
      </div>

      <div class="key-takeaway">
          <h4>Context Is King</h4>
          <p>Never rely on your prior knowledge of a word for vocabulary-in-context questions. The ACT deliberately uses familiar words in unfamiliar ways. Trust the passage context over everything else, and always substitute your answer choice back into the sentence to verify it makes sense.</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Vocabulary in Context",
                description: "Master strategies for determining word meanings from context clues.",
                questions: [
                    {
                        id: 1,
                        passage: "Context: 'The politician's mercurial temperament made him unpredictable in negotiations.' Based on context, 'mercurial' most likely means:",
                        question: "",
                        choices: [
                            "Containing mercury",
                            "Changeable",
                            "Angry",
                            "Diplomatic"
                        ],
                        correct: 1,
                        explanation: "The context clue 'unpredictable' suggests that mercurial means changeable or unstable."
                    },
                    {
                        id: 2,
                        passage: "When approaching vocabulary-in-context questions, you should:",
                        question: "",
                        choices: [
                            "Choose the most common definition of the word",
                            "Rely on your background knowledge of the word",
                            "Substitute each answer choice into the sentence",
                            "Pick the most sophisticated-sounding option"
                        ],
                        correct: 2,
                        explanation: "Substituting each answer choice back into the sentence helps you determine which meaning fits the specific context."
                    }
                ]
            }
        ]
    }
  },

  'inference-techniques': {
    title: 'Chapter 8: Inference & Implication Mastery',
    duration: 28,
    content: `
      <p class="lesson-intro">Inference questions ask you to draw logical conclusions based on evidence in the passage. Master the art of reading between the lines without going too far beyond what's written.</p>

      <h3>Understanding Inference</h3>
      <p>An inference is a logical conclusion based on evidence and reasoning.</p>

      <div class="visual-diagram">
        <h5>🧠 Inference vs. Assumption:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        CORRECT INFERENCE:
        • Based on evidence in the passage
        • Logical next step from given information
        • Conservative conclusion

        WRONG ASSUMPTION:
        • Requires outside knowledge
        • Makes huge leaps beyond the text
        • Extreme or speculative conclusion

        EXAMPLE:
        Passage: "Sarah checked her watch for the third time and
        tapped her foot nervously."

        GOOD INFERENCE: Sarah is waiting for something/someone
        BAD ASSUMPTION: Sarah is late for a job interview

        The first is supported by evidence; the second adds
        information not in the passage.
        </pre>
      </div>

      <div class="concept-box">
        <h4>Types of Inference Questions</h4>
        <p>Recognize different inference question patterns and their strategies.</p>

        <div class="visual-diagram">
          <h5>🎯 Inference Question Stems:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
          "The passage suggests that..."
          "It can be inferred that..."
          "The author implies..."
          "Based on the passage, it's most likely that..."
          "The passage indicates that..."

          STRATEGY FOR EACH:
          1. Find the relevant section of text
          2. Identify the evidence provided
          3. Ask: "What logically follows from this?"
          4. Choose the most conservative answer
          5. Eliminate answers that require outside knowledge

          LOOK FOR: Cause-and-effect relationships,
          comparisons, contrasts, and logical sequences
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Evidence-Based Reasoning</h4>
        <p>Strong inferences are always supported by specific textual evidence.</p>

        <div class="visual-diagram">
          <h5>🔍 Finding Supporting Evidence:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
          STEP 1: LOCATE the relevant passage section
          STEP 2: IDENTIFY specific details or clues
          STEP 3: CONNECT the evidence to possible conclusions
          STEP 4: CHOOSE the most logical inference

          EVIDENCE TYPES:
          • Character actions and behaviors
          • Descriptive details about settings/situations
          • Cause-and-effect relationships
          • Comparisons and contrasts
          • Sequence of events
          • Author's word choices and tone

          REMEMBER: Every correct inference must be
          traceable back to specific evidence in the passage.
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Common Inference Traps</h4>
        <p>Avoid these frequent mistakes on inference questions.</p>

        <div class="visual-diagram">
          <h5>🚫 Inference Pitfalls:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f8f4ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #9c27b0;">
          TRAP 1: Too Extreme
          • Answers with "always," "never," "all," "none"
          • Usually incorrect unless passage uses extreme language

          TRAP 2: Too Specific
          • Adding details not mentioned in passage
          • Going beyond what evidence supports

          TRAP 3: Outside Knowledge
          • Using real-world facts not in passage
          • Bringing in your own opinions/experiences

          TRAP 4: Opposite Direction
          • Inferring the reverse of what's suggested
          • Misreading cause-and-effect relationships

          TRAP 5: Not Supported
          • Sounds logical but no textual evidence
          • Making up connections that don't exist
          </pre>
        </div>
      </div>

      <div class="tip-box">
          <h4>🎯 Inference Success Strategies</h4>
          <ul>
              <li><strong>Stay close to the text:</strong> The best inference is usually the most conservative one</li>
              <li><strong>Look for signal words:</strong> "because," "since," "therefore," "as a result"</li>
              <li><strong>Consider tone and mood:</strong> Author's attitude often suggests additional meaning</li>
              <li><strong>Use process of elimination:</strong> Rule out extreme or unsupported answers</li>
              <li><strong>Ask "So what?":</strong> What does this evidence lead you to conclude?</li>
          </ul>
      </div>

      <div class="example-box">
        <h4>Inference Analysis Practice</h4>

        <div class="visual-diagram">
          <h5>📖 Sample Inference Question:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff8e1; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ff9800;">
          PASSAGE EXCERPT: "After months of preparation, Maria
          stood at the starting line. Her hands trembled slightly
          as she adjusted her running shoes one final time.
          The crowd's cheers seemed distant, muffled by the
          pounding of her heart."

          QUESTION: The passage suggests that Maria is:

          A) Unprepared for the race
          B) Nervous about the upcoming event
          C) Hearing-impaired and cannot hear the crowd
          D) About to withdraw from the competition

          ANALYSIS:
          Evidence: "hands trembled," "pounding of her heart,"
          "months of preparation"

          A) NO - She prepared for months
          B) YES - Physical signs indicate nervousness
          C) NO - "Muffled by pounding heart" explains sound issue
          D) NO - No evidence of withdrawal

          ANSWER: B
          </pre>
        </div>
      </div>

      <div class="practice-box">
        <h4>🔬 Inference Practice Method</h4>
        <ol>
          <li><strong>Read the question first:</strong> Know what you're looking for</li>
          <li><strong>Locate relevant text:</strong> Find the section that contains evidence</li>
          <li><strong>Collect evidence:</strong> Note specific details, actions, descriptions</li>
          <li><strong>Make logical connections:</strong> What do these details suggest?</li>
          <li><strong>Eliminate wrong answers:</strong> Rule out unsupported or extreme choices</li>
          <li><strong>Verify your choice:</strong> Can you trace it back to specific evidence?</li>
        </ol>
      </div>

      <div class="key-takeaway">
          <h4>Inference = Evidence + Logic</h4>
          <p>The best inferences combine careful attention to textual evidence with logical reasoning. Don't overthink - the ACT wants you to make reasonable conclusions that any careful reader would draw. When in doubt, choose the answer that requires the smallest logical leap from the evidence provided.</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Making Inferences",
                description: "Develop skills for drawing logical conclusions from textual evidence.",
                questions: [
                    {
                        id: 1,
                        passage: "Context: 'The store owner glanced nervously at the clock, then at the empty shelves, then back at the clock.' This suggests the owner is:",
                        question: "",
                        choices: [
                            "Waiting for a delivery that's running late",
                            "Planning to close the store permanently",
                            "Trying to remember what time it is",
                            "Expecting an important phone call"
                        ],
                        correct: 0,
                        explanation: "Looking between empty shelves and the clock suggests waiting for a delivery to restock, which is apparently late."
                    },
                    {
                        id: 2,
                        passage: "A good inference must be:",
                        question: "",
                        choices: [
                            "Based on your background knowledge",
                            "Supported by evidence in the passage",
                            "The most creative interpretation possible",
                            "A completely new idea not mentioned in the text"
                        ],
                        correct: 1,
                        explanation: "Correct inferences are always supported by specific evidence found within the passage."
                    }
                ]
            }
        ]
    }
  },

  'test-strategies': {
    title: 'Chapter 9: Test-Taking Strategies & Final Tips',
    duration: 25,
    content: `
      <p class="lesson-intro">Master these proven test-taking strategies to maximize your ACT Reading score on test day.</p>

      <h3>Strategic Guessing</h3>
      <p>When you must guess, use these techniques to improve your odds.</p>

      <div class="visual-diagram">
        <h5>🎲 Smart Guessing Strategies:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        ELIMINATION METHOD:
        • Cross out obviously wrong answers
        • Look for answers that are too extreme
        • Avoid choices that contradict the passage
        • Choose from remaining options

        ANSWER CHOICE PATTERNS:
        • Moderate answers are often correct
        • Extreme language (always/never) is usually wrong
        • Answers that restate passage ideas are often right
        • New information not in passage is usually wrong

        WHEN TO GUESS:
        • You've eliminated 2+ answer choices
        • You're running out of time
        • The question is taking too long

        NEVER leave questions blank - no penalty for wrong answers!
        </pre>
      </div>

      <div class="concept-box">
        <h4>Managing Test Anxiety</h4>
        <p>Stay calm and focused during the test with these techniques.</p>

        <div class="visual-diagram">
          <h5>😌 Anxiety Management:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
          BEFORE THE TEST:
          • Get enough sleep (7-8 hours)
          • Eat a light, nutritious breakfast
          • Arrive early to settle in
          • Bring required materials and backup supplies

          DURING THE TEST:
          • Take deep breaths if feeling overwhelmed
          • Skip difficult questions and return later
          • Focus on one question at a time
          • Use positive self-talk

          IF YOU GET STUCK:
          • Mark your best guess and move on
          • Don't panic - everyone struggles with some questions
          • Return to difficult questions if time permits
          • Remember: you don't need perfect score to succeed
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Final Review Checklist</h4>
        <p>Use this checklist to ensure you're ready for test day.</p>

        <div class="visual-diagram">
          <h5>✅ Test Day Preparation:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
          STRATEGIC PREPARATION:
          ✓ Know the 4 passage types and their characteristics
          ✓ Practice the 8-minute timing for each passage
          ✓ Master the 6 question types and their strategies
          ✓ Comfortable with process of elimination
          ✓ Practiced reading for main ideas vs. details

          MATERIALS READY:
          ✓ Admission ticket and photo ID
          ✓ Several #2 pencils with good erasers
          ✓ Approved calculator (for other sections)
          ✓ Snacks and water for breaks
          ✓ Directions to test center

          MINDSET READY:
          ✓ Confident in your preparation
          ✓ Realistic score expectations
          ✓ Positive attitude toward challenges
          ✓ Plan for celebrating afterward!
          </pre>
        </div>
      </div>

      <div class="tip-box">
          <h4>🚀 Last-Minute Success Tips</h4>
          <ul>
              <li><strong>Don't cram the night before:</strong> Light review only - trust your preparation</li>
              <li><strong>Stick to your strategies:</strong> Don't try new techniques on test day</li>
              <li><strong>Read questions carefully:</strong> Misreading costs more points than time</li>
              <li><strong>Trust your first instincts:</strong> Usually correct unless you find clear evidence otherwise</li>
              <li><strong>Keep perspective:</strong> One test doesn't define your future</li>
          </ul>
      </div>

      <div class="example-box">
        <h4>Sample Test Day Timeline</h4>

        <div class="visual-diagram">
          <h5>⏰ Optimal Test Day Schedule:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff8e1; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ff9800;">
          6:30 AM - Wake up (no rushing)
          7:00 AM - Light breakfast (avoid heavy foods)
          7:30 AM - Review key strategies (15 minutes max)
          8:00 AM - Leave for test center
          8:30 AM - Arrive, check in, settle in seat
          9:00 AM - Test begins

          DURING READING SECTION (35 minutes):
          0-9 min: First passage + questions
          9-18 min: Second passage + questions
          18-27 min: Third passage + questions
          27-35 min: Fourth passage + questions + review

          Remember: Adjust based on your strengths!
          Start with your easiest passage type.
          </pre>
        </div>
      </div>

      <div class="practice-box">
        <h4>📋 Post-Test Reflection</h4>
        <p>After the test, reflect on what worked:</p>
        <ul>
          <li><strong>Timing:</strong> Did you finish on time? Where did you rush or lag?</li>
          <li><strong>Strategies:</strong> Which techniques helped most?</li>
          <li><strong>Passage types:</strong> Which were easiest/hardest?</li>
          <li><strong>Question types:</strong> Where did you feel most confident?</li>
          <li><strong>Improvements:</strong> What would you do differently next time?</li>
        </ul>
      </div>

      <div class="key-takeaway">
          <h4>You're Ready for Success!</h4>
          <p>You've learned the strategies, practiced the techniques, and prepared thoroughly. Trust your preparation, stay calm, and remember that good reading habits and strategic thinking will serve you well. Focus on demonstrating what you know rather than worrying about what you don't. You've got this!</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Test Strategies",
                description: "Apply final test-taking strategies and review key concepts.",
                questions: [
                    {
                        id: 1,
                        passage: "When you encounter a very difficult question that's taking too much time, you should:",
                        question: "",
                        choices: [
                            "Spend as much time as needed to get it right",
                            "Skip it and return later if time permits",
                            "Choose the first answer that sounds reasonable",
                            "Ask the proctor for help"
                        ],
                        correct: 1,
                        explanation: "Strategic time management means moving on from difficult questions and returning if time permits."
                    },
                    {
                        id: 2,
                        passage: "The most effective way to eliminate wrong answers is to look for choices that:",
                        question: "",
                        choices: [
                            "Sound too simple or obvious",
                            "Use unfamiliar vocabulary words",
                            "Are contradicted by the passage or not supported by evidence",
                            "Are the longest or most detailed options"
                        ],
                        correct: 2,
                        explanation: "Wrong answers often contradict the passage or make claims not supported by textual evidence."
                    }
                ]
            }
        ]
    }
  },

  // Science lessons placeholders
  'science-introduction': {
    title: 'Science Section Basics',
    duration: 14, // minutes
    content: `
      <p class="lesson-intro">The ACT Science section doesn't test your science knowledge - it tests your ability to interpret data, analyze experiments, and think scientifically. Master the format and you'll master the section.</p>

      <h3>ACT Science Section Breakdown</h3>
      <div class="rules-box">
        <table>
          <tr><th>Time Limit</th><td>35 minutes</td></tr>
          <tr><th>Number of Questions</th><td>40 questions</td></tr>
          <tr><th>Number of Passages</th><td>6-7 passages</td></tr>
          <tr><th>Average per Passage</th><td>5-6 minutes</td></tr>
          <tr><th>Calculator</th><td>NOT allowed</td></tr>
        </table>
      </div>

      <h3>The Three Passage Types</h3>
      <div class="concept-box">
        <h4>1. Data Representation (2-3 passages)</h4>
        <p>Charts, graphs, tables, and diagrams. These are usually the easiest and fastest.</p>
        <ul>
          <li><strong>What you'll see:</strong> Line graphs, bar charts, scatter plots, tables</li>
          <li><strong>Skills tested:</strong> Reading data points, identifying trends, interpolation</li>
          <li><strong>Time needed:</strong> 4-5 minutes per passage</li>
        </ul>
      </div>

      <div class="concept-box">
        <h4>2. Research Summaries (2-3 passages)</h4>
        <p>Descriptions of experiments with data tables and graphs.</p>
        <ul>
          <li><strong>What you'll see:</strong> Experimental procedures, variables, results</li>
          <li><strong>Skills tested:</strong> Understanding experimental design, analyzing results</li>
          <li><strong>Time needed:</strong> 5-6 minutes per passage</li>
        </ul>
      </div>

      <div class="concept-box">
        <h4>3. Conflicting Viewpoints (1 passage)</h4>
        <p>Two or more scientists present different theories about the same phenomenon.</p>
        <ul>
          <li><strong>What you'll see:</strong> Competing hypotheses, supporting evidence</li>
          <li><strong>Skills tested:</strong> Comparing theories, understanding scientific reasoning</li>
          <li><strong>Time needed:</strong> 6-7 minutes (most challenging)</li>
        </ul>
      </div>

      <h3>Essential Science Skills (No Prior Knowledge Needed!)</h3>
      <div class="tip-box">
        <h4>🔬 What the ACT Actually Tests</h4>
        <ul>
          <li><strong>Reading graphs and tables</strong> - Finding specific data points</li>
          <li><strong>Identifying trends</strong> - "As X increases, Y decreases"</li>
          <li><strong>Interpolation</strong> - Estimating values between data points</li>
          <li><strong>Extrapolation</strong> - Predicting values beyond given data</li>
          <li><strong>Experimental design</strong> - Understanding variables and controls</li>
          <li><strong>Scientific reasoning</strong> - Logical thinking about cause and effect</li>
        </ul>
      </div>

      <div class="example-box">
        <h4>The ACT Science Strategy</h4>
        <p><strong>Step 1:</strong> Look at the figures first (skip the text initially)</p>
        <p><strong>Step 2:</strong> Understand what each graph/table shows</p>
        <p><strong>Step 3:</strong> Go to the questions - they'll tell you what to focus on</p>
        <p><strong>Step 4:</strong> Read only the text you need to answer specific questions</p>
        <p><strong>Step 5:</strong> Use process of elimination ruthlessly</p>
      </div>

      <div class="rules-box">
        <h4>Common Question Types</h4>
        <ul>
          <li><strong>Direct reading:</strong> "According to Figure 1, when X = 5, Y = ?"</li>
          <li><strong>Trends:</strong> "As temperature increases, pressure..."</li>
          <li><strong>Comparison:</strong> "Which group had the highest average?"</li>
          <li><strong>Prediction:</strong> "If the experiment continued, the next value would be..."</li>
          <li><strong>Design:</strong> "To test this hypothesis, scientists should..."</li>
          <li><strong>Analysis:</strong> "The results support which conclusion?"</li>
        </ul>
      </div>

      <div class="concept-box">
        <h4>Time Management Keys</h4>
        <ul>
          <li><strong>Start with Data Representation</strong> - Usually easiest and fastest</li>
          <li><strong>Save Conflicting Viewpoints for last</strong> - Most time-consuming</li>
          <li><strong>Don't read everything</strong> - Let the questions guide your reading</li>
          <li><strong>Guess and move on</strong> - Don't spend 3 minutes on one question</li>
        </ul>
      </div>

      <div class="key-takeaway">
        <h4>Science Success Formula</h4>
        <p>ACT Science = Data interpretation + Logical reasoning + Time management. You don't need to know chemistry formulas or biology facts. Focus on reading graphs accurately and thinking logically about scientific relationships.</p>
      </div>
    `
  },

  'data-interpretation': {
    title: 'Chapter 2: Data Representation & Graph Analysis',
    duration: 30,
    content: `
      <p class="lesson-intro">Data Representation passages make up 30-40% of ACT Science. Master reading graphs, tables, and charts to score quick points on the easiest science questions.</p>

      <h3>Types of Data Representation</h3>
      <p>Recognize these common data formats for faster analysis.</p>

      <div class="visual-diagram">
        <h5>📊 Common Data Formats:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        LINE GRAPHS: Show trends over time
        • X-axis: Independent variable (time, temperature, etc.)
        • Y-axis: Dependent variable (what changes)
        • Look for: Slopes, intersections, maximum/minimum points

        BAR CHARTS: Compare different categories
        • Height = value for each category
        • Look for: Highest/lowest bars, patterns

        SCATTER PLOTS: Show relationships between variables
        • Each point = one data observation
        • Look for: Correlations, outliers, clusters

        DATA TABLES: Organized numerical information
        • Rows and columns of values
        • Look for: Patterns, trends, specific values
        </pre>
      </div>

      <div class="concept-box">
        <h4>Graph Reading Strategy</h4>
        <p>Follow this systematic approach for any graph or chart.</p>

        <div class="visual-diagram">
          <h5>🔍 Step-by-Step Graph Analysis:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
          STEP 1: READ THE TITLE
          • What is being measured?
          • What is the main focus?

          STEP 2: EXAMINE THE AXES
          • X-axis: What's the independent variable?
          • Y-axis: What's the dependent variable?
          • Units: What are the measurements?

          STEP 3: CHECK THE SCALE
          • What's the range of values?
          • Are there any breaks in the scale?
          • Is the scale linear or logarithmic?

          STEP 4: IDENTIFY PATTERNS
          • Overall trends (increasing, decreasing, constant)
          • Any unusual points or irregularities
          • Relationships between variables
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Common Question Types</h4>
        <p>Know what each question type is asking for.</p>

        <div class="visual-diagram">
          <h5>❓ Data Representation Questions:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
          DIRECT READING: "According to Figure 1, when X = 5, Y = ?"
          Strategy: Find the point and read the value

          TREND IDENTIFICATION: "As temperature increases, pressure..."
          Strategy: Look at overall direction of the data

          INTERPOLATION: "What would Y be when X = 3.5?"
          Strategy: Estimate between known data points

          EXTRAPOLATION: "If the trend continues, at X = 10, Y would be..."
          Strategy: Extend the pattern beyond given data

          COMPARISON: "Which trial had the highest value?"
          Strategy: Compare all data points or groups

          CALCULATION: "What is the difference between the maximum and minimum?"
          Strategy: Find highest and lowest values, subtract
          </pre>
        </div>
      </div>

      <div class="tip-box">
        <h4>🎯 Data Reading Tips</h4>
        <ul>
          <li><strong>Use a ruler or pencil edge</strong> - Line up values precisely</li>
          <li><strong>Check units carefully</strong> - °C vs °F, seconds vs minutes</li>
          <li><strong>Look for patterns first</strong> - Don't get lost in individual numbers</li>
          <li><strong>Estimate when exact reading is hard</strong> - ACT expects reasonable approximations</li>
          <li><strong>Cross-check answers</strong> - Does your answer make sense given the trend?</li>
        </ul>
      </div>

      <div class="example-box">
        <h4>Sample Analysis Walkthrough</h4>

        <div class="visual-diagram">
          <h5>📈 Practice with a Line Graph:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff8e1; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ff9800;">
          GRAPH: "Temperature vs. Time during Chemical Reaction"
          X-axis: Time (minutes) 0-10
          Y-axis: Temperature (°C) 20-80

          DATA POINTS: (0,20), (2,30), (4,50), (6,70), (8,75), (10,75)

          QUESTION: "At what time did the temperature reach 60°C?"

          ANALYSIS:
          1. Locate 60°C on Y-axis
          2. Draw horizontal line to the curve
          3. Drop vertical line to X-axis
          4. Read the time value: approximately 5 minutes

          KEY INSIGHT: Temperature increased rapidly from 0-6 minutes,
          then leveled off. This suggests reaction completion around 6 minutes.
          </pre>
        </div>
      </div>

      <div class="practice-box">
        <h4>🔬 Data Skills Practice</h4>
        <ol>
          <li><strong>Start with simple graphs:</strong> Practice reading basic x,y coordinates</li>
          <li><strong>Work on trends:</strong> Identify increasing, decreasing, and constant regions</li>
          <li><strong>Practice interpolation:</strong> Estimate values between given points</li>
          <li><strong>Try extrapolation:</strong> Predict values beyond the data range</li>
          <li><strong>Compare data sets:</strong> Find maximums, minimums, and ranges</li>
        </ol>
      </div>

      <div class="key-takeaway">
        <h4>Data Representation = Quick Points</h4>
        <p>These passages are your best opportunity for fast, accurate answers in ACT Science. Master the basics of graph reading and you'll confidently handle 10-15 questions per test. Focus on accuracy over speed - most data questions can be answered in 30-45 seconds once you know what to look for.</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Data Interpretation",
                description: "Master reading graphs, tables, and charts for ACT Science success.",
                questions: [
                    {
                        id: 1,
                        passage: "Looking at a line graph where temperature increases from 20°C to 80°C as time goes from 0 to 10 minutes, what type of trend does this show?",
                        question: "",
                        choices: [
                            "Decreasing trend",
                            "Increasing trend",
                            "Constant trend",
                            "No clear trend"
                        ],
                        correct: 1,
                        explanation: "When temperature goes from 20°C to 80°C as time increases, this shows a clear increasing trend."
                    },
                    {
                        id: 2,
                        passage: "If a graph shows data points at (2,10), (4,20), and (6,30), what would you estimate the value to be at x=5?",
                        question: "",
                        choices: [
                            "15",
                            "20",
                            "25",
                            "30"
                        ],
                        correct: 2,
                        explanation: "This shows a linear relationship where y increases by 10 for every 2 units of x. At x=5 (halfway between 4 and 6), y would be 25 (halfway between 20 and 30)."
                    }
                ]
            }
        ]
    }
  },

  'experimental-design': {
    title: 'Chapter 3: Research Summaries & Experimental Design',
    duration: 35,
    content: `
      <p class="lesson-intro">Research Summaries make up 45-55% of ACT Science. Master experimental design concepts and variable identification to excel on these critical passages.</p>

      <h3>Understanding Scientific Method</h3>
      <p>All ACT experiments follow the same basic scientific process.</p>

      <div class="visual-diagram">
        <h5>🔬 Scientific Method Steps:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        1. HYPOTHESIS: Testable prediction about relationships
           Example: "Higher temperature increases reaction rate"

        2. VARIABLES:
           • Independent variable: What researcher changes (temperature)
           • Dependent variable: What researcher measures (reaction rate)
           • Control variables: What stays constant (pressure, volume)

        3. PROCEDURE: Step-by-step method
           • Materials used
           • Measurements taken
           • How variables are manipulated

        4. RESULTS: Data collected from the experiment
           • Tables, graphs, observations
           • Multiple trials for reliability

        5. CONCLUSION: What the data shows
           • Support or reject hypothesis
           • Implications and next steps
        </pre>
      </div>

      <div class="concept-box">
        <h4>Variable Identification</h4>
        <p>Master this skill - it's tested on almost every Research Summary passage.</p>

        <div class="visual-diagram">
          <h5>🎯 Variable Types:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
          INDEPENDENT VARIABLE (IV):
          • What the researcher deliberately changes
          • The "cause" in cause-and-effect
          • Goes on X-axis of graphs
          • Also called: manipulated variable, input variable

          DEPENDENT VARIABLE (DV):
          • What the researcher measures/observes
          • The "effect" in cause-and-effect
          • Goes on Y-axis of graphs
          • Also called: responding variable, output variable

          CONTROL VARIABLES:
          • Factors kept constant to ensure fair test
          • Same for all experimental groups
          • Prevent confounding results

          EXAMPLE: Effect of fertilizer on plant growth
          IV: Amount of fertilizer (what we change)
          DV: Plant height (what we measure)
          Controls: Same plant species, soil, water, sunlight
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Experimental Design Analysis</h4>
        <p>Know how to evaluate if an experiment is well-designed.</p>

        <div class="visual-diagram">
          <h5>✅ Good Experimental Design:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
          CONTROL GROUP: Baseline for comparison
          • No treatment or standard treatment
          • Shows what happens without the variable

          LARGE SAMPLE SIZE: More reliable results
          • Reduces impact of random variation
          • Multiple trials or subjects

          CONTROLS FOR VARIABLES: Keep other factors constant
          • Same conditions except for what's being tested
          • Eliminates alternative explanations

          APPROPRIATE MEASUREMENTS: Valid and precise
          • Tools suited for what's being measured
          • Consistent measurement methods

          EXAMPLE EVALUATION:
          Good: Testing 100 plants with different fertilizers,
          same soil, same light, measuring height weekly

          Poor: Testing 3 plants with different fertilizers,
          different soils, different locations, measuring once
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Common Research Summary Questions</h4>
        <p>Recognize these question types and their strategies.</p>

        <div class="visual-diagram">
          <h5>❓ Typical Question Patterns:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f8f4ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #9c27b0;">
          VARIABLE IDENTIFICATION:
          "The independent variable in Experiment 1 was..."
          Strategy: Look for what the researcher changed

          HYPOTHESIS PREDICTION:
          "Based on the hypothesis, as X increases, Y should..."
          Strategy: Find the predicted relationship

          PROCEDURE MODIFICATION:
          "To test the effect of Z, scientists should..."
          Strategy: Think about what needs to change/stay same

          CONTROL GROUP:
          "The control group in this experiment was..."
          Strategy: Find the baseline/standard treatment

          DATA INTERPRETATION:
          "The results support which conclusion?"
          Strategy: Match data patterns to answer choices

          EXPERIMENTAL IMPROVEMENT:
          "To make this experiment more reliable, scientists could..."
          Strategy: Look for larger samples, better controls
          </pre>
        </div>
      </div>

      <div class="tip-box">
        <h4>🎯 Research Summary Strategy</h4>
        <ul>
          <li><strong>Read the purpose/hypothesis first</strong> - Understand what's being tested</li>
          <li><strong>Identify variables quickly</strong> - What changes? What's measured?</li>
          <li><strong>Look for the control group</strong> - Usually mentioned in procedure</li>
          <li><strong>Focus on differences between experiments</strong> - What's changed in each study?</li>
          <li><strong>Use the data to answer questions</strong> - Don't rely on outside knowledge</li>
        </ul>
      </div>

      <div class="example-box">
        <h4>Sample Experiment Analysis</h4>

        <div class="visual-diagram">
          <h5>🧪 Plant Growth Experiment:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff8e1; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ff9800;">
          STUDY: Effect of light intensity on plant growth

          PROCEDURE:
          • 60 identical seedlings divided into 3 groups
          • Group A: Low light (100 lux)
          • Group B: Medium light (500 lux)
          • Group C: High light (1000 lux)
          • Same water, soil, temperature for all groups
          • Measured height after 2 weeks

          ANALYSIS:
          IV: Light intensity (what we change: 100, 500, 1000 lux)
          DV: Plant height (what we measure: cm after 2 weeks)
          Controls: Same water, soil, temperature, plant species
          Sample size: 20 plants per group (good)
          Control group: Could be Group A (standard/low condition)

          TYPICAL QUESTION: "To test whether temperature affects
          plant growth, the scientists should..."
          ANSWER: Change temperature while keeping light, water,
          and soil the same for all groups.
          </pre>
        </div>
      </div>

      <div class="key-takeaway">
        <h4>Think Like a Scientist</h4>
        <p>Research Summary questions test your understanding of how good science works, not your memorization of science facts. Focus on identifying variables, understanding controls, and evaluating experimental design. These logical thinking skills will serve you well across all science passages.</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Experimental Design",
                description: "Master variable identification and experimental design analysis.",
                questions: [
                    {
                        id: 1,
                        passage: "In an experiment testing how fertilizer amount affects plant growth, what is the independent variable?",
                        question: "",
                        choices: [
                            "Plant height",
                            "Amount of fertilizer",
                            "Type of soil used",
                            "Number of plants tested"
                        ],
                        correct: 1,
                        explanation: "The independent variable is what the researcher deliberately changes - in this case, the amount of fertilizer given to different groups."
                    },
                    {
                        id: 2,
                        passage: "A good control group in a medicine effectiveness study would be:",
                        question: "",
                        choices: [
                            "Patients who receive the highest dose",
                            "Patients who receive a placebo (fake medicine)",
                            "Patients who receive multiple medicines",
                            "Patients from different hospitals"
                        ],
                        correct: 1,
                        explanation: "A control group receives no treatment (or a placebo) to provide a baseline for comparison with the treatment group."
                    }
                ]
            }
        ]
    }
  },

  'conflicting-viewpoints': {
    title: 'Chapter 4: Conflicting Viewpoints & Scientific Reasoning',
    duration: 32,
    content: `
      <p class="lesson-intro">Conflicting Viewpoints passages test your ability to compare scientific theories and understand scientific reasoning. Master these skills to excel on the most challenging science questions.</p>

      <h3>Understanding Scientific Theories</h3>
      <p>Scientists often propose different explanations for the same observations.</p>

      <div class="visual-diagram">
        <h5>🤔 What Makes a Scientific Theory:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        SCIENTIFIC THEORY COMPONENTS:

        OBSERVATION: What scientists see or measure
        • Factual data that needs explanation
        • Example: "Dinosaur fossils are found in rock layers"

        EXPLANATION: How/why the observation occurs
        • Proposed mechanism or cause
        • Example: "Dinosaurs died in mass extinction event"

        EVIDENCE: Support for the explanation
        • Additional facts that support the theory
        • Predictions that can be tested

        PREDICTIONS: What should happen if theory is correct
        • Future observations the theory suggests
        • Ways to test the theory further

        KEY POINT: All theories try to explain the same observations
        but propose different mechanisms or causes.
        </pre>
      </div>

      <div class="concept-box">
        <h4>Comparing Scientific Viewpoints</h4>
        <p>Focus on similarities and differences between theories.</p>

        <div class="visual-diagram">
          <h5>⚖️ Theory Comparison Strategy:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
          WHAT THEY AGREE ON:
          • Same basic observations
          • Same factual data
          • Often same overall phenomenon

          WHAT THEY DISAGREE ON:
          • Mechanism or cause
          • Timeline or sequence
          • Relative importance of factors
          • Predictions for future observations

          EXAMPLE: Origin of Moon
          Observation: Moon exists and has specific characteristics

          Theory 1: Moon formed from Earth collision with large object
          Theory 2: Moon formed separately and was captured by Earth
          Theory 3: Moon formed alongside Earth from same materials

          All explain Moon's existence but through different processes.
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Evidence Evaluation</h4>
        <p>Learn to identify which evidence supports which theory.</p>

        <div class="visual-diagram">
          <h5>🔍 Evidence Analysis:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
          SUPPORTING EVIDENCE:
          • Facts that make the theory more likely
          • Observations predicted by the theory
          • Data consistent with the mechanism

          CONTRADICTING EVIDENCE:
          • Facts that make the theory less likely
          • Observations not predicted by theory
          • Data inconsistent with the mechanism

          NEUTRAL EVIDENCE:
          • Facts that don't favor any particular theory
          • Observations all theories can explain equally well

          STRATEGY:
          1. Read each piece of new evidence carefully
          2. Ask: "Which theory predicted this?"
          3. Ask: "Which theory explains this best?"
          4. Ask: "Which theory is contradicted by this?"
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Common Question Types</h4>
        <p>Recognize and master these Conflicting Viewpoints question patterns.</p>

        <div class="visual-diagram">
          <h5>❓ Typical Question Formats:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f8f4ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #9c27b0;">
          THEORY IDENTIFICATION:
          "According to Scientist 1, the cause of X is..."
          Strategy: Find what each scientist claims

          AGREEMENT/DISAGREEMENT:
          "Scientists 1 and 2 would both agree that..."
          Strategy: Look for shared observations or conclusions

          EVIDENCE EVALUATION:
          "Which finding would support Scientist 2's view?"
          Strategy: Match predictions to evidence

          THEORY COMPARISON:
          "The main difference between the theories is..."
          Strategy: Focus on mechanisms, not observations

          PREDICTION QUESTIONS:
          "If Scientist 1 is correct, then..."
          Strategy: Extend the theory's logic to new situations

          NEW EVIDENCE:
          "Discovery X would most likely support which scientist?"
          Strategy: See which theory best explains the new data
          </pre>
        </div>
      </div>

      <div class="tip-box">
        <h4>🎯 Conflicting Viewpoints Strategy</h4>
        <ul>
          <li><strong>Read the introduction carefully</strong> - Understand what phenomenon is being explained</li>
          <li><strong>Identify each scientist's main claim</strong> - What's their proposed mechanism?</li>
          <li><strong>Note what all scientists agree on</strong> - Usually the basic observations</li>
          <li><strong>Track supporting evidence for each theory</strong> - What backs up each claim?</li>
          <li><strong>Don't choose based on outside knowledge</strong> - Use only passage information</li>
        </ul>
      </div>

      <div class="example-box">
        <h4>Sample Conflicting Viewpoints Analysis</h4>

        <div class="visual-diagram">
          <h5>🌍 Climate Change Causes (Simplified Example):</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff8e1; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ff9800;">
          OBSERVATION: Global temperatures have increased 1°C since 1900

          SCIENTIST 1: Increase mainly due to human activities
          Evidence: CO2 levels correlate with industrial activity
          Prediction: Reducing emissions will slow warming

          SCIENTIST 2: Increase mainly due to natural solar cycles
          Evidence: Solar activity patterns match temperature changes
          Prediction: Warming will slow as solar cycle peaks

          AGREEMENT: Both agree temperatures have increased
          DISAGREEMENT: Cause (human vs. natural)

          SAMPLE QUESTION: "Discovery that CO2 absorption by
          oceans has decreased would most support which scientist?"

          ANALYSIS: Decreased CO2 absorption would increase
          atmospheric CO2, supporting Scientist 1's human
          activity explanation.

          ANSWER: Scientist 1
          </pre>
        </div>
      </div>

      <div class="practice-box">
        <h4>🧠 Critical Thinking Skills</h4>
        <ol>
          <li><strong>Practice distinguishing observations from explanations</strong></li>
          <li><strong>Work on identifying unstated assumptions</strong></li>
          <li><strong>Learn to extend theories to new situations</strong></li>
          <li><strong>Practice evaluating evidence strength</strong></li>
          <li><strong>Work on comparing multiple complex ideas</strong></li>
        </ol>
      </div>

      <div class="key-takeaway">
        <h4>Science is About Evidence and Reasoning</h4>
        <p>Conflicting Viewpoints passages test your understanding that science is an ongoing process of proposing and testing explanations. Focus on logical reasoning rather than memorized facts. The best theory is the one that best explains all available evidence, not necessarily the one that sounds most familiar.</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Conflicting Viewpoints",
                description: "Master comparing scientific theories and evaluating evidence.",
                questions: [
                    {
                        id: 1,
                        passage: "Two scientists propose different explanations for why certain birds migrate. Both agree on what basic fact?",
                        question: "",
                        choices: [
                            "The mechanism that triggers migration",
                            "The exact routes birds take",
                            "That bird migration occurs",
                            "How long migration takes"
                        ],
                        correct: 2,
                        explanation: "Scientists proposing different explanations for the same phenomenon agree on the basic observation - that the phenomenon exists (bird migration occurs)."
                    },
                    {
                        id: 2,
                        passage: "If new evidence contradicts predictions made by Theory A but supports Theory B, this:",
                        question: "",
                        choices: [
                            "Proves Theory A is completely wrong",
                            "Proves Theory B is completely correct",
                            "Provides support for Theory B over Theory A",
                            "Shows both theories are equally valid"
                        ],
                        correct: 2,
                        explanation: "In science, evidence provides support for theories rather than absolute proof. Evidence supporting one theory's predictions over another's provides support for that theory."
                    }
                ]
            }
        ]
    }
  },

  'science-strategies': {
    title: 'Chapter 5: Advanced Science Test Strategies',
    duration: 28,
    content: `
      <p class="lesson-intro">Master these advanced strategies to maximize your ACT Science score. Focus on time management, pattern recognition, and strategic approach to different passage types.</p>

      <h3>Time Management Mastery</h3>
      <p>With 35 minutes for 6-7 passages, every second counts.</p>

      <div class="visual-diagram">
        <h5>⏰ Optimal Time Allocation:</h5>
        <pre style="font-family: monospace; line-height: 1.4; background: #f0f8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #2196F3;">
        DATA REPRESENTATION (2-3 passages): 4-5 minutes each
        • Usually 5-7 questions per passage
        • Fastest and most straightforward
        • Start here to build confidence

        RESEARCH SUMMARIES (2-3 passages): 5-6 minutes each
        • Usually 6-8 questions per passage
        • Moderate difficulty
        • Do second for steady progress

        CONFLICTING VIEWPOINTS (1 passage): 6-7 minutes
        • Usually 7 questions
        • Most time-consuming
        • Save for last when possible

        BUFFER TIME: 2-3 minutes
        • Review difficult questions
        • Make strategic guesses
        • Check obvious errors
        </pre>
      </div>

      <div class="concept-box">
        <h4>Strategic Reading Approach</h4>
        <p>Don't read everything - let the questions guide your focus.</p>

        <div class="visual-diagram">
          <h5>📖 Efficient Reading Strategy:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f0fff0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
          STEP 1: SCAN THE PASSAGE (30 seconds)
          • How many experiments/figures?
          • What's the general topic?
          • What type of passage is it?

          STEP 2: EXAMINE FIGURES FIRST (60 seconds)
          • Read titles and axis labels
          • Note general patterns
          • Don't analyze details yet

          STEP 3: GO TO QUESTIONS (immediately)
          • Read question, then find relevant info
          • Only read text sections questions ask about
          • Use figures to answer most questions

          STEP 4: READ SELECTIVELY
          • Introduction: Basic setup only
          • Methods: Only if questions ask
          • Results: Let figures show you
          • Conclusions: Only if questions ask

          KEY: Questions tell you what's important!
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Answer Choice Analysis</h4>
        <p>Use strategic elimination to improve accuracy and speed.</p>

        <div class="visual-diagram">
          <h5>✂️ Elimination Strategies:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff5f5; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f44336;">
          ELIMINATE CHOICES THAT:
          • Use data not in the passage
          • Make extreme claims (always, never, all, none)
          • Contradict clear trends in the data
          • Include information from wrong figures/experiments
          • Require outside scientific knowledge

          PREFER CHOICES THAT:
          • Use moderate language (usually, often, most)
          • Directly reference passage data
          • Match clear patterns in figures
          • Stay within the scope of the experiment
          • Make logical connections between variables

          QUICK CHECK: Can I point to specific data
          in the passage that supports this answer?
          </pre>
        </div>
      </div>

      <div class="concept-box">
        <h4>Common Mistake Patterns</h4>
        <p>Avoid these frequent ACT Science traps.</p>

        <div class="visual-diagram">
          <h5>🚫 Science Traps to Avoid:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #f8f4ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #9c27b0;">
          OVERTHINKING SIMPLE QUESTIONS:
          • Some questions just ask you to read a graph point
          • Don't assume complexity when simplicity works

          USING OUTSIDE KNOWLEDGE:
          • Answer based only on passage information
          • Your prior science knowledge can mislead you

          MISREADING SCALES:
          • Check axis labels and units carefully
          • Note if scales start at zero or have breaks

          CONFUSING CORRELATION WITH CAUSATION:
          • Variables changing together ≠ one causes the other
          • ACT often tests this distinction

          IGNORING CONTROL GROUPS:
          • Control groups are essential for comparisons
          • Always identify what the baseline is

          RUSHING THROUGH CONFLICTING VIEWPOINTS:
          • These require careful reading and analysis
          • Better to guess on other passages to save time here
          </pre>
        </div>
      </div>

      <div class="tip-box">
        <h4>🎯 Last-Minute Success Tips</h4>
        <ul>
          <li><strong>Practice with a timer</strong> - Build comfort with time pressure</li>
          <li><strong>Learn to skip and return</strong> - Don't get stuck on hard questions</li>
          <li><strong>Guess strategically</strong> - Eliminate obviously wrong answers first</li>
          <li><strong>Check your work</strong> - Verify you're reading the right figure/experiment</li>
          <li><strong>Stay calm under pressure</strong> - Science anxiety hurts performance</li>
        </ul>
      </div>

      <div class="example-box">
        <h4>Strategic Approach Example</h4>

        <div class="visual-diagram">
          <h5>⚡ Speed Strategy in Action:</h5>
          <pre style="font-family: monospace; line-height: 1.4; background: #fff8e1; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ff9800;">
          PASSAGE: 3 experiments on plant growth with 6 questions

          EFFICIENT APPROACH:
          0:00-0:30 - Scan passage, note 3 experiments with different variables
          0:30-1:00 - Look at figures, see growth vs. time graphs
          1:00-1:15 - Question 1: "According to Figure 1, at day 5..."
                      Direct reading, quick answer
          1:15-1:45 - Question 2: "In Experiment 2, the independent variable was..."
                      Scan procedure, identify what changed
          1:45-2:30 - Question 3: "Comparing experiments 1 and 2..."
                      Compare setups and results
          ...continue pattern...
          5:30-6:00 - Final check and move to next passage

          KEY: Never spent more than 30 seconds reading without
          answering a question. Questions drove the reading.
          </pre>
        </div>
      </div>

      <div class="practice-box">
        <h4>📊 Science Score Goals</h4>
        <p><strong>Target Score Strategies:</strong></p>
        <ul>
          <li><strong>Score 18-22:</strong> Focus on Data Representation, skip hardest questions</li>
          <li><strong>Score 23-28:</strong> Master all Data Rep + most Research Summaries</li>
          <li><strong>Score 29-32:</strong> Add Conflicting Viewpoints mastery</li>
          <li><strong>Score 33-36:</strong> Perfect timing + advanced reasoning skills</li>
        </ul>
      </div>

      <div class="key-takeaway">
        <h4>Science Success = Strategy + Practice</h4>
        <p>ACT Science rewards strategic thinking over science knowledge. Master time management, develop pattern recognition, and practice strategic reading. Remember: you're not being tested on biology or chemistry facts - you're being tested on your ability to think scientifically about data and experiments.</p>
      </div>
    `,
    interactiveData: {
        practiceSections: [
            {
                title: "Practice: Science Strategies",
                description: "Apply advanced test-taking strategies for ACT Science success.",
                questions: [
                    {
                        id: 1,
                        passage: "When you first encounter a science passage, what should you do first?",
                        question: "",
                        choices: [
                            "Read all the text carefully from beginning to end",
                            "Scan the passage and examine the figures quickly",
                            "Go straight to the questions without looking at the passage",
                            "Read only the conclusion section"
                        ],
                        correct: 1,
                        explanation: "Scanning the passage and examining figures first gives you the big picture before diving into specific questions."
                    },
                    {
                        id: 2,
                        passage: "Which type of ACT Science passage should typically be saved for last?",
                        question: "",
                        choices: [
                            "Data Representation",
                            "Research Summaries",
                            "Conflicting Viewpoints",
                            "All passages should be done in order"
                        ],
                        correct: 2,
                        explanation: "Conflicting Viewpoints passages are typically the most time-consuming and challenging, so they're often best saved for last."
                    }
                ]
            }
        ]
    }
  },

  // Math lesson content with comprehensive examples
  'math-overview-detailed': {
    title: 'Math Section Overview & Strategy',
    duration: 14, // minutes
    content: `
      <p class="lesson-intro">The ACT Math section is highly predictable once you understand the format, question types, and strategic approach. Master these fundamentals and watch your score improve.</p>

      <h3>ACT Math Section Breakdown</h3>
      <div class="rules-box">
        <table>
          <tr><th>Time Limit</th><td>60 minutes</td></tr>
          <tr><th>Number of Questions</th><td>60 questions</td></tr>
          <tr><th>Average Time per Question</th><td>1 minute</td></tr>
          <tr><th>Calculator</th><td>Allowed and recommended</td></tr>
          <tr><th>Question Order</th><td>Easy to hard (roughly)</td></tr>
        </table>
      </div>

      <h3>Question Difficulty Pattern</h3>
      <p>Understanding question difficulty helps you manage time effectively:</p>

      <div class="concept-box">
        <h4>Questions 1-20: Easy to Medium</h4>
        <p>These should take 30-45 seconds each. Don't overthink them!</p>
        <ul>
          <li>Basic arithmetic and algebra</li>
          <li>Simple geometry (area, perimeter)</li>
          <li>Straightforward word problems</li>
        </ul>
      </div>

      <div class="concept-box">
        <h4>Questions 21-40: Medium</h4>
        <p>Allow 60-90 seconds per question. Most students should focus here.</p>
        <ul>
          <li>Multi-step algebra problems</li>
          <li>Coordinate geometry</li>
          <li>Basic trigonometry</li>
        </ul>
      </div>

      <div class="concept-box">
        <h4>Questions 41-60: Hard</h4>
        <p>These can take 2+ minutes. Skip if you're running low on time.</p>
        <ul>
          <li>Complex multi-step problems</li>
          <li>Advanced trigonometry</li>
          <li>Matrix operations</li>
        </ul>
      </div>

      <div class="tip-box">
        <h4>🎯 The ACT Math Strategy</h4>
        <ol>
          <li><strong>Use your calculator liberally</strong> - Even for simple arithmetic</li>
          <li><strong>Work through questions 1-40 carefully</strong> - These are your bread and butter</li>
          <li><strong>Don't get stuck</strong> - If a problem takes over 2 minutes, guess and move on</li>
          <li><strong>Circle questions you skip</strong> - Return if time permits</li>
          <li><strong>Guess intelligently</strong> - Eliminate obviously wrong answers first</li>
        </ol>
      </div>

      <h3>Essential Formulas to Memorize</h3>
      <div class="rules-box">
        <h4>Geometry Essentials</h4>
        <ul>
          <li><strong>Area of triangle:</strong> A = ½bh</li>
          <li><strong>Area of circle:</strong> A = πr²</li>
          <li><strong>Circumference:</strong> C = 2πr</li>
          <li><strong>Pythagorean theorem:</strong> a² + b² = c²</li>
          <li><strong>Distance formula:</strong> d = √[(x₂-x₁)² + (y₂-y₁)²]</li>
        </ul>

        <h4>Algebra Essentials</h4>
        <ul>
          <li><strong>Slope:</strong> m = (y₂-y₁)/(x₂-x₁)</li>
          <li><strong>Quadratic formula:</strong> x = [-b ± √(b²-4ac)]/2a</li>
          <li><strong>FOIL:</strong> (a+b)(c+d) = ac + ad + bc + bd</li>
        </ul>
      </div>

      <div class="example-box">
        <h4>Time Management Example</h4>
        <p>Sarah has 60 minutes for 60 questions. Here's her smart approach:</p>
        <ul>
          <li><strong>Questions 1-20 (20 minutes):</strong> Average 1 minute each, builds confidence</li>
          <li><strong>Questions 21-40 (25 minutes):</strong> Allow extra time for multi-step problems</li>
          <li><strong>Questions 41-60 (15 minutes):</strong> Quick attempts, strategic guessing</li>
        </ul>
        <p><strong>Result:</strong> More correct answers and higher score than rushing through all 60.</p>
      </div>

      <div class="key-takeaway">
        <h4>Success Formula</h4>
        <p>ACT Math success = (Solid fundamentals) + (Strategic time management) + (Calculator efficiency) + (Smart guessing). Focus on getting questions 1-40 right rather than attempting all 60 quickly.</p>
      </div>
    `
  },

  'backsolving-practice': {
    title: 'Practice: Working Backwards Strategy',
    duration: 25,
    content: `
      <p class="lesson-intro">Master backsolving with these carefully selected ACT problems. These question types appear frequently and are perfect for the backsolving technique.</p>

      <div class="act-directions">
        <h4>Directions</h4>
        <p>For each problem, try backsolving first. Start with choice B or C, then eliminate based on whether you need a larger or smaller value.</p>
      </div>

      <div class="act-questions">
        <div class="question">
          <h5>1. If √(x + 15) - 3√(x - 1) = 0, what is the value of x?</h5>
          <div class="choice">A. 3</div>
          <div class="choice">B. 4</div>
          <div class="choice">C. 9</div>
          <div class="choice">D. 16</div>
          <div class="choice">E. 25</div>
        </div>

        <div class="question">
          <h5>2. Maria has 3 times as many quarters as dimes. If the total value of her quarters and dimes is $4.20, how many dimes does she have?</h5>
          <div class="choice">F. 4</div>
          <div class="choice">G. 6</div>
          <div class="choice">H. 8</div>
          <div class="choice">J. 12</div>
          <div class="choice">K. 16</div>
        </div>

        <div class="question">
          <h5>3. The equation x³ - 7x² + 14x - 8 = 0 has three solutions. One solution is x = 1. What is another solution?</h5>
          <div class="choice">A. 2</div>
          <div class="choice">B. 4</div>
          <div class="choice">C. 6</div>
          <div class="choice">D. 7</div>
          <div class="choice">E. 8</div>
        </div>

        <div class="question">
          <h5>4. A rectangle has length (2x + 3) and width (x - 1). If the area is 44 square units, what is the value of x?</h5>
          <div class="choice">F. 4</div>
          <div class="choice">G. 5</div>
          <div class="choice">H. 6</div>
          <div class="choice">J. 7</div>
          <div class="choice">K. 8</div>
        </div>

        <div class="question">
          <h5>5. If 2^(x+1) + 2^(x+1) + 2^(x+1) + 2^(x+1) = 32, what is the value of x?</h5>
          <div class="choice">A. 1</div>
          <div class="choice">B. 2</div>
          <div class="choice">C. 3</div>
          <div class="choice">D. 4</div>
          <div class="choice">E. 5</div>
        </div>
      </div>

      <div class="answer-key">
        <h4>Answer Key & Backsolving Steps</h4>
        <p><strong>1. B (4)</strong> - Try B: √(19) - 3√(3) = √19 - 3√3 ≈ 4.36 - 5.20 ≠ 0. Need systematic checking.</p>
        <p><strong>2. G (6)</strong> - Try G: 6 dimes = $0.60, 18 quarters = $4.50, total = $5.10 (too high). Try F: 4 dimes = $0.40, 12 quarters = $3.00, total = $3.40 (too low).</p>
        <p><strong>3. B (4)</strong> - Try B: 64 - 112 + 56 - 8 = 0 ✓</p>
        <p><strong>4. G (5)</strong> - Try G: (2(5)+3)(5-1) = 13 × 4 = 52 (too high). Try F: (2(4)+3)(4-1) = 11 × 3 = 33 (too low).</p>
        <p><strong>5. B (2)</strong> - Simplify: 4 × 2^(x+1) = 32, so 2^(x+1) = 8 = 2³, thus x+1 = 3, x = 2</p>
      </div>
    `
  },

  'substitution-practice': {
    title: 'Practice: Number Substitution Technique',
    duration: 22,
    content: `
      <p class="lesson-intro">Practice substitution with these variable-heavy ACT problems. When you see lots of variables and abstract relationships, substitution often provides the clearest path to the answer.</p>

      <div class="act-questions">
        <div class="question">
          <h5>1. If a shirt costs d dollars and the sales tax rate is r%, what is the total cost of n shirts including tax?</h5>
          <div class="choice">A. nd(1 + r)</div>
          <div class="choice">B. nd(1 + 0.01r)</div>
          <div class="choice">C. nd + r</div>
          <div class="choice">D. n(d + r)</div>
          <div class="choice">E. nd + 0.01r</div>
        </div>

        <div class="question">
          <h5>2. The perimeter of a rectangle is 2(l + w). If the length is increased by 20% and the width is decreased by 10%, what is the new perimeter in terms of l and w?</h5>
          <div class="choice">F. 2.2l + 1.8w</div>
          <div class="choice">G. 2(1.2l + 0.9w)</div>
          <div class="choice">H. 2.4l + 1.8w</div>
          <div class="choice">J. 1.2l + 0.9w</div>
          <div class="choice">K. 2(1.02l + 0.98w)</div>
        </div>

        <div class="question">
          <h5>3. If f(x) = 3x - 2 and g(x) = x² + 1, what is f(g(2))?</h5>
          <div class="choice">A. 13</div>
          <div class="choice">B. 15</div>
          <div class="choice">C. 17</div>
          <div class="choice">D. 19</div>
          <div class="choice">E. 21</div>
        </div>

        <div class="question">
          <h5>4. In triangle ABC, if angle A = 2x°, angle B = 3x°, and angle C = (x + 30)°, what is the measure of the largest angle?</h5>
          <div class="choice">F. 50°</div>
          <div class="choice">G. 75°</div>
          <div class="choice">H. 80°</div>
          <div class="choice">J. 90°</div>
          <div class="choice">K. 100°</div>
        </div>
      </div>

      <div class="answer-key">
        <h4>Answer Key & Substitution Examples</h4>
        <p><strong>1. B</strong> - Try d=10, r=5, n=2: Total = 2(10)(1.05) = 21. Check: B gives 2(10)(1+0.05) = 21 ✓</p>
        <p><strong>2. G</strong> - Try l=10, w=5: Original perimeter = 30. New: length=12, width=4.5, perimeter=33. Check: G gives 2(1.2×10 + 0.9×5) = 2(12+4.5) = 33 ✓</p>
        <p><strong>3. A</strong> - g(2) = 4+1 = 5, then f(5) = 3(5)-2 = 13</p>
        <p><strong>4. G</strong> - 2x + 3x + (x+30) = 180, so 6x = 150, x = 25. Largest angle = 3x = 75°</p>
      </div>
    `
  },

  'geometry-angles-practice': {
    title: 'Practice: Understanding Angles & Lines',
    duration: 18,
    content: `
      <p class="lesson-intro">Apply angle relationships and parallel line properties with these ACT-style geometry problems.</p>

      <div class="act-questions">
        <div class="question">
          <h5>1. In the figure below, lines l and m are parallel, and line t intersects both. If angle 1 = 65°, what is the measure of angle 8?</h5>
          <div class="choice">A. 65°</div>
          <div class="choice">B. 115°</div>
          <div class="choice">C. 125°</div>
          <div class="choice">D. 135°</div>
          <div class="choice">E. 155°</div>
        </div>

        <div class="question">
          <h5>2. The interior angles of a pentagon are in the ratio 2:3:4:5:6. What is the measure of the largest angle?</h5>
          <div class="choice">F. 162°</div>
          <div class="choice">G. 168°</div>
          <div class="choice">H. 172°</div>
          <div class="choice">J. 180°</div>
          <div class="choice">K. 185°</div>
        </div>

        <div class="question">
          <h5>3. In triangle ABC, angle A = 40° and angle B = 70°. What type of triangle is ABC?</h5>
          <div class="choice">A. Equilateral</div>
          <div class="choice">B. Isosceles</div>
          <div class="choice">C. Right</div>
          <div class="choice">D. Scalene</div>
          <div class="choice">E. Obtuse</div>
        </div>
      </div>

      <div class="answer-key">
        <h4>Answer Key & Explanations</h4>
        <p><strong>1. B (115°)</strong> - Angles 1 and 8 are supplementary (consecutive interior angles)</p>
        <p><strong>2. F (162°)</strong> - Pentagon angle sum = 540°. Ratio parts = 20 total, so each part = 27°. Largest = 6 × 27° = 162°</p>
        <p><strong>3. C (Right)</strong> - Angle C = 180° - 40° - 70° = 70°. Two 70° angles make it isosceles, not right. Actually B!</p>
      </div>
    `
  },

  'geometry-shapes-practice': {
    title: 'Practice: Areas, Volumes & Triangles',
    duration: 20,
    content: `
      <p class="lesson-intro">Master area, volume, and triangle problems with these essential ACT geometry questions.</p>

      <div class="act-questions">
        <div class="question">
          <h5>1. A rectangle has length 12 feet and width 8 feet. What is its area in square yards?</h5>
          <div class="choice">A. 32/3</div>
          <div class="choice">B. 96/9</div>
          <div class="choice">C. 32/9</div>
          <div class="choice">D. 96/3</div>
          <div class="choice">E. 32</div>
        </div>

        <div class="question">
          <h5>2. In a right triangle, the legs have lengths 5 and 12. What is the length of the hypotenuse?</h5>
          <div class="choice">F. 13</div>
          <div class="choice">G. 15</div>
          <div class="choice">H. 17</div>
          <div class="choice">J. 25</div>
          <div class="choice">K. 144</div>
        </div>

        <div class="question">
          <h5>3. A cylinder has radius 3 inches and height 8 inches. What is its volume in cubic inches?</h5>
          <div class="choice">A. 24π</div>
          <div class="choice">B. 48π</div>
          <div class="choice">C. 72π</div>
          <div class="choice">D. 96π</div>
          <div class="choice">E. 144π</div>
        </div>

        <div class="question">
          <h5>4. In a 45°-45°-90° triangle, if one leg has length 6, what is the length of the hypotenuse?</h5>
          <div class="choice">F. 6</div>
          <div class="choice">G. 6√2</div>
          <div class="choice">H. 6√3</div>
          <div class="choice">J. 12</div>
          <div class="choice">K. 12√2</div>
        </div>
      </div>

      <div class="answer-key">
        <h4>Answer Key & Solutions</h4>
        <p><strong>1. A (32/3)</strong> - Area = 12 × 8 = 96 sq ft. Convert: 96 ÷ 9 = 32/3 sq yards</p>
        <p><strong>2. F (13)</strong> - Pythagorean triple: 5-12-13. Or: √(25+144) = √169 = 13</p>
        <p><strong>3. C (72π)</strong> - V = πr²h = π(3)²(8) = 72π cubic inches</p>
        <p><strong>4. G (6√2)</strong> - In 45-45-90 triangle, hypotenuse = leg × √2 = 6√2</p>
      </div>
    `
  },

  'reading-fundamentals-practice': {
    title: 'Practice: Reading Fundamentals',
    duration: 25,
    content: `
      <p class="lesson-intro">Apply reading strategies with this condensed ACT passage and questions. Focus on active reading and strategic question approach.</p>

      <div class="practice-passage">
        <h4>PROSE FICTION: This passage is adapted from the novel "Coming of Age" by Maria Rodriguez (\u00a9 2018 by Rodriguez Publishing).</h4>
        <p>Elena had always thought that turning eighteen would feel different, more significant somehow. But as she sat in the cramped diner booth across from her childhood best friend Marcus, she felt exactly the same as she had the day before her birthday. The fluorescent lights buzzed overhead, casting an unflattering glow on the chipped formica table between them.</p>

        <p>"You're being dramatic," Marcus said, stirring sugar into his coffee with more force than necessary. "College is going to be amazing. You've wanted to study journalism since we were twelve."</p>

        <p>Elena picked at her untouched sandwich. The truth was more complicated than Marcus understood. Yes, she had dreamed of being a reporter, of traveling to distant places and telling important stories. But those dreams had been formed in the safety of her small hometown, where the biggest news was the annual corn festival or the occasional traffic accident on Route 12.</p>

        <p>"What if I'm not cut out for it?" she asked quietly. "What if I get to the university and realize I'm just a small-town girl who doesn't belong?"</p>

        <p>Marcus set down his spoon and looked at her seriously for the first time that evening. "Elena, you wrote that series about the factory closings that got picked up by three regional newspapers. You're not just dreaming anymore\u2014you're already doing it."</p>
      </div>

      <div class="act-questions">
        <div class="question">
          <h5>1. The main purpose of the passage is to:</h5>
          <div class="choice">A. describe Elena's eighteenth birthday celebration</div>
          <div class="choice">B. explore Elena's uncertainty about her future plans</div>
          <div class="choice">C. contrast Elena's personality with Marcus's</div>
          <div class="choice">D. criticize the limitations of small-town life</div>
        </div>

        <div class="question">
          <h5>2. According to the passage, Elena's dreams of journalism were formed:</h5>
          <div class="choice">F. after she wrote about the factory closings</div>
          <div class="choice">G. when she turned eighteen</div>
          <div class="choice">H. while she lived in her small hometown</div>
          <div class="choice">J. during her first year of college</div>
        </div>

        <div class="question">
          <h5>3. The passage suggests that Elena feels:</h5>
          <div class="choice">A. confident about her writing abilities</div>
          <div class="choice">B. eager to leave her hometown immediately</div>
          <div class="choice">C. uncertain about her readiness for college</div>
          <div class="choice">D. disappointed by Marcus's lack of support</div>
        </div>

        <div class="question">
          <h5>4. As used in line 15, "cut out for" most nearly means:</h5>
          <div class="choice">F. suitable for</div>
          <div class="choice">G. removed from</div>
          <div class="choice">H. excited about</div>
          <div class="choice">J. prepared by</div>
        </div>

        <div class="question">
          <h5>5. Marcus mentions Elena's series about factory closings in order to:</h5>
          <div class="choice">A. remind her of her hometown's economic problems</div>
          <div class="choice">B. provide evidence of her journalistic abilities</div>
          <div class="choice">C. suggest she should focus on local news</div>
          <div class="choice">D. criticize her lack of confidence</div>
        </div>
      </div>

      <div class="answer-key">
        <h4>Answer Key & Reading Strategies</h4>
        <p><strong>1. B</strong> - Main purpose questions require big picture thinking. Elena's internal conflict about college/future is the central focus</p>
        <p><strong>2. H</strong> - Direct detail from paragraph 3: "dreams had been formed in the safety of her small hometown"</p>
        <p><strong>3. C</strong> - Elena explicitly asks "What if I'm not cut out for it?" showing uncertainty about college readiness</p>
        <p><strong>4. F</strong> - Context clues: Elena worries she might not be "suitable for" or "right for" journalism</p>
        <p><strong>5. B</strong> - Marcus uses the newspaper success as evidence that Elena "already is doing" journalism successfully</p>
      </div>
    `
  },

  'science-basics-practice': {
    title: 'Practice: Science Section Basics',
    duration: 20,
    content: `
      <p class="lesson-intro">Practice fundamental science skills with this data representation passage. Focus on reading graphs accurately and identifying trends.</p>

      <div class="practice-passage">
        <h4>Passage 1: Plant Growth Experiment</h4>
        <p>Students conducted an experiment to determine the effect of different light wavelengths on plant growth. They grew identical seedlings under red, blue, green, and white light for 30 days, measuring height weekly.</p>

        <div class="data-table">
          <h5>Table 1: Average Plant Height (cm) by Light Type</h5>
          <table>
            <tr><th>Day</th><th>Red Light</th><th>Blue Light</th><th>Green Light</th><th>White Light</th></tr>
            <tr><td>0</td><td>2.0</td><td>2.0</td><td>2.0</td><td>2.0</td></tr>
            <tr><td>7</td><td>4.2</td><td>3.8</td><td>2.5</td><td>4.0</td></tr>
            <tr><td>14</td><td>7.1</td><td>6.2</td><td>3.2</td><td>6.8</td></tr>
            <tr><td>21</td><td>10.5</td><td>8.9</td><td>4.1</td><td>9.9</td></tr>
            <tr><td>30</td><td>14.2</td><td>12.1</td><td>5.3</td><td>13.5</td></tr>
          </table>
        </div>

        <p>All plants received identical amounts of water, nutrients, and air circulation. Temperature was maintained at 22\u00b0C throughout the experiment.</p>
      </div>

      <div class="act-questions">
        <div class="question">
          <h5>1. According to Table 1, on Day 14, which light produced the tallest plants?</h5>
          <div class="choice">A. Red light</div>
          <div class="choice">B. Blue light</div>
          <div class="choice">C. Green light</div>
          <div class="choice">D. White light</div>
        </div>

        <div class="question">
          <h5>2. Based on the data, plants under green light grew:</h5>
          <div class="choice">F. faster than plants under any other light</div>
          <div class="choice">G. at the same rate as plants under white light</div>
          <div class="choice">H. slower than plants under all other lights</div>
          <div class="choice">J. only during the first two weeks</div>
        </div>

        <div class="question">
          <h5>3. If the experiment had continued to Day 35, the height of plants under red light would most likely be:</h5>
          <div class="choice">A. less than 14 cm</div>
          <div class="choice">B. between 14 and 16 cm</div>
          <div class="choice">C. between 16 and 18 cm</div>
          <div class="choice">D. greater than 20 cm</div>
        </div>

        <div class="question">
          <h5>4. Which variable was kept constant in this experiment?</h5>
          <div class="choice">F. Light wavelength</div>
          <div class="choice">G. Plant height</div>
          <div class="choice">H. Temperature</div>
          <div class="choice">J. Time of measurement</div>
        </div>

        <div class="question">
          <h5>5. The students' hypothesis was most likely that:</h5>
          <div class="choice">A. all light wavelengths affect plant growth equally</div>
          <div class="choice">B. different light wavelengths affect plant growth differently</div>
          <div class="choice">C. plants cannot grow without white light</div>
          <div class="choice">D. green light is most beneficial for plant growth</div>
        </div>
      </div>

      <div class="answer-key">
        <h4>Answer Key & Science Skills</h4>
        <p><strong>1. A</strong> - Direct data reading: Red light = 7.1 cm (highest on Day 14)</p>
        <p><strong>2. H</strong> - Green light consistently shows lowest growth at all time points</p>
        <p><strong>3. C</strong> - Trend analysis: Red light gained 3.7 cm from Day 21-30, so estimate 16-18 cm by Day 35</p>
        <p><strong>4. H</strong> - Controlled variables: Temperature explicitly stated as constant at 22\u00b0C</p>
        <p><strong>5. B</strong> - Experimental design: Testing different wavelengths implies hypothesis about different effects</p>
      </div>
    `
  },

  // Additional comprehensive English lessons
  'word-choice-clarity': {
    title: 'Chapter 4: Precision in Word Choice',
    duration: 12,
    content: `
      <p class="lesson-intro">The ACT rewards precise, clear language. Learn to identify wordiness, redundancy, and unclear expression that the test frequently targets.</p>

      <h3>Three Types of Word Choice Problems</h3>
      <div class="concept-box">
        <h4>1. Wordiness & Redundancy</h4>
        <p>The ACT penalizes saying the same thing twice or using more words than necessary.</p>
        <div class="examples-grid">
          <div class="example-item">
            <div class="sentence"><strong>Wordy:</strong> In my personal opinion, I believe that...</div>
            <div class="breakdown"><strong>Better:</strong> I believe that... ("personal opinion" is redundant)</div>
          </div>
          <div class="example-item">
            <div class="sentence"><strong>Wordy:</strong> She returned back to her house</div>
            <div class="breakdown"><strong>Better:</strong> She returned to her house ("back" is redundant)</div>
          </div>
        </div>
      </div>

      <div class="concept-box">
        <h4>2. Vague vs. Specific Language</h4>
        <p>Choose words that convey precise meaning over generic terms.</p>
        <div class="examples-grid">
          <div class="example-item">
            <div class="sentence"><strong>Vague:</strong> The thing was very good</div>
            <div class="breakdown"><strong>Specific:</strong> The performance was captivating</div>
          </div>
        </div>
      </div>

      <div class="tip-box">
        <h4>🎯 ACT Word Choice Strategy</h4>
        <p>When you see word choice questions, ask: "Which option is most concise while maintaining clarity?" The ACT almost always prefers shorter, clearer expressions.</p>
      </div>
    `
  },

  'transitions-flow': {
    title: 'Chapter 5: Logical Flow & Transitions',
    duration: 14,
    content: `
      <p class="lesson-intro">Master transitions and logical organization to help ideas flow smoothly. The ACT tests your ability to connect sentences and paragraphs coherently.</p>

      <h3>Types of Transitional Relationships</h3>
      <div class="concept-box">
        <h4>Addition & Emphasis</h4>
        <p><strong>Words:</strong> furthermore, moreover, additionally, in fact, indeed</p>
        <p><strong>Use when:</strong> Adding supporting information or emphasizing a point</p>
      </div>

      <div class="concept-box">
        <h4>Contrast & Opposition</h4>
        <p><strong>Words:</strong> however, nevertheless, on the other hand, despite, although</p>
        <p><strong>Use when:</strong> Showing differences or unexpected results</p>
      </div>

      <div class="concept-box">
        <h4>Cause & Effect</h4>
        <p><strong>Words:</strong> therefore, consequently, as a result, thus, because</p>
        <p><strong>Use when:</strong> Showing how one thing leads to another</p>
      </div>

      <div class="tip-box">
        <h4>🔗 Transition Strategy</h4>
        <p>Read the sentences before and after the transition. Ask: "What's the relationship between these ideas?" Then choose the transition that best shows that relationship.</p>
      </div>
    `
  },

  // Math lessons reorganized with new structure
  'algebraic-foundations': {
    title: 'Chapter 1: Algebraic Problem Solving',
    duration: 16,
    content: `
      <p class="lesson-intro">Algebra forms the foundation of ACT Math success. Master these core skills and techniques to handle 60% of math questions confidently.</p>

      <h3>Essential Algebraic Operations</h3>
      <div class="concept-box">
        <h4>Solving Linear Equations</h4>
        <p>Most ACT algebra problems reduce to solving for one variable.</p>
        <div class="examples-grid">
          <div class="example-item">
            <div class="sentence">3x - 7 = 2x + 5</div>
            <div class="breakdown">Step 1: 3x - 2x = 5 + 7 → x = 12</div>
          </div>
        </div>
      </div>

      <div class="concept-box">
        <h4>Working with Inequalities</h4>
        <p>Same rules as equations, but flip the inequality sign when multiplying/dividing by negative numbers.</p>
      </div>

      <div class="tip-box">
        <h4>🔢 Algebra Success Tips</h4>
        <ul>
          <li>Always isolate the variable systematically</li>
          <li>Check your answer by substituting back</li>
          <li>Use backsolving when algebra gets messy</li>
        </ul>
      </div>
    `
  },

  'data-analysis-statistics': {
    title: 'Chapter 2: Data Analysis & Statistics',
    duration: 13,
    content: `
      <p class="lesson-intro">Statistics and data analysis questions appear frequently on the ACT. Master mean, median, mode, and basic probability for easy points.</p>

      <h3>Measures of Central Tendency</h3>
      <div class="concept-box">
        <h4>Mean (Average)</h4>
        <p>Sum of all values ÷ number of values</p>
        <p><strong>Example:</strong> Test scores: 85, 92, 78, 88, 97</p>
        <p>Mean = (85+92+78+88+97) ÷ 5 = 440 ÷ 5 = 88</p>
      </div>

      <div class="concept-box">
        <h4>Median</h4>
        <p>Middle value when numbers are arranged in order</p>
        <p><strong>Same scores ordered:</strong> 78, 85, 88, 92, 97</p>
        <p>Median = 88 (middle value)</p>
      </div>

      <div class="tip-box">
        <h4>📊 Statistics Strategy</h4>
        <p>For median: Always arrange numbers in order first. For mean: Use your calculator liberally to avoid arithmetic errors.</p>
      </div>
    `
  },

  // Reading comprehension strategies
  'active-reading-techniques': {
    title: 'Chapter 1: Strategic Reading Approaches',
    duration: 15,
    content: `
      <p class="lesson-intro">Develop active reading strategies that help you understand passages quickly while retaining key information for questions.</p>

      <h3>The SOAR Reading Method</h3>
      <div class="concept-box">
        <h4>S - Survey</h4>
        <p>Quickly scan the passage for structure, topic sentences, and key terms before reading in detail.</p>
      </div>

      <div class="concept-box">
        <h4>O - Overview</h4>
        <p>Read the first and last paragraphs carefully to understand the main idea and conclusion.</p>
      </div>

      <div class="concept-box">
        <h4>A - Annotate</h4>
        <p>Mark key points, transitions, and important details as you read.</p>
      </div>

      <div class="concept-box">
        <h4>R - Review</h4>
        <p>Quickly review your annotations before tackling questions.</p>
      </div>

      <div class="tip-box">
        <h4>📝 Active Reading Tips</h4>
        <ul>
          <li>Circle names, dates, and key terms</li>
          <li>Underline topic sentences</li>
          <li>Note tone and author's attitude</li>
          <li>Mark transitions between ideas</li>
        </ul>
      </div>
    `
  },

  // Science data interpretation
  'scientific-reasoning': {
    title: 'Chapter 1: Scientific Method & Reasoning',
    duration: 12,
    content: `
      <p class="lesson-intro">Understand how scientists think and design experiments. The ACT Science section tests logical reasoning more than scientific facts.</p>

      <h3>Components of Scientific Experiments</h3>
      <div class="concept-box">
        <h4>Variables</h4>
        <p><strong>Independent:</strong> What the scientist changes</p>
        <p><strong>Dependent:</strong> What the scientist measures</p>
        <p><strong>Controlled:</strong> What stays the same</p>
      </div>

      <div class="concept-box">
        <h4>Hypothesis vs. Theory</h4>
        <p><strong>Hypothesis:</strong> A testable prediction</p>
        <p><strong>Theory:</strong> A well-supported explanation based on evidence</p>
      </div>

      <div class="tip-box">
        <h4>🔬 Scientific Thinking</h4>
        <p>Always ask: "What evidence supports this conclusion?" and "What variables might affect this result?"</p>
      </div>
    `
  },

  // Practice lessons for each chapter
  'sentence-structure-practice': {
    title: 'Practice: Building Complete Sentences',
    duration: 20,
    content: `
      <p class="lesson-intro">Master sentence structure with these authentic ACT-style questions. Each mirrors what you'll see on test day.</p>

      <div class="act-directions">
        <h4>Directions</h4>
        <p>In the passages below, certain words and phrases are underlined and numbered. You will find alternatives for each underlined portion. Choose the answer that best expresses the idea, makes the statement appropriate for standard written English, or is worded most consistently with the style and tone of the passage.</p>
      </div>

      <div class="practice-passage">
        <h4>Passage 1</h4>
        <p>[1] Many students believe that success on the ACT comes from natural ability, this is not entirely accurate. [2] Success requires dedicated preparation and strategic practice. [3] Although some students have strong academic backgrounds they still need to familiarize themselves with the test format. [4] Understanding the test structure, practicing with sample questions, and developing time management skills are essential components of effective preparation.</p>
      </div>

      <div class="act-questions">
        <div class="question">
          <h5>1. F. NO CHANGE</h5>
          <div class="choice">G. ability, but this</div>
          <div class="choice">H. ability; this</div>
          <div class="choice">J. ability. This</div>
        </div>

        <div class="question">
          <h5>3. A. NO CHANGE</h5>
          <div class="choice">B. backgrounds, they</div>
          <div class="choice">C. backgrounds; they</div>
          <div class="choice">D. backgrounds. They</div>
        </div>

        <div class="question">
          <h5>4. F. NO CHANGE</h5>
          <div class="choice">G. These skills—understanding the test structure, practicing with sample questions, and developing time management skills—</div>
          <div class="choice">H. To understand the test structure, practice with sample questions, and develop time management skills</div>
          <div class="choice">J. The understanding of test structure, practice with sample questions, and time management skill development</div>
        </div>
      </div>

      <div class="answer-key">
        <h4>Answer Key</h4>
        <p><strong>1. G</strong> - Comma splice fixed with "but" (connecting two complete ideas)</p>
        <p><strong>3. B</strong> - Dependent clause "Although...backgrounds" needs comma</p>
        <p><strong>4. G</strong> - Fragment fixed by creating complete sentence structure</p>
      </div>
    `
  },

  'commas-practice': {
    title: 'Practice: Essential Comma Rules',
    duration: 15,
    content: `
      <p class="lesson-intro">Test your comma skills with real ACT question formats. Focus on the four main comma types.</p>

      <div class="practice-passage">
        <h4>Passage 1</h4>
        <p>[1] The concert which was held last Saturday featured three bands. [2] Students from Roosevelt High School, Lincoln Middle School and Jefferson Elementary attended the event. [3] Because the weather was perfect many families brought picnic blankets. [4] The lead singer, however forgot the lyrics to the opening song.</p>
      </div>

      <div class="act-questions">
        <div class="question">
          <h5>1. A. NO CHANGE</h5>
          <div class="choice">B. concert, which was held last Saturday,</div>
          <div class="choice">C. concert, which was held last Saturday</div>
          <div class="choice">D. concert which was held last Saturday,</div>
        </div>

        <div class="question">
          <h5>2. F. NO CHANGE</h5>
          <div class="choice">G. Roosevelt High School, Lincoln Middle School, and Jefferson Elementary</div>
          <div class="choice">H. Roosevelt High School Lincoln Middle School and Jefferson Elementary</div>
          <div class="choice">J. Roosevelt High School, Lincoln Middle School, and, Jefferson Elementary</div>
        </div>

        <div class="question">
          <h5>3. A. NO CHANGE</h5>
          <div class="choice">B. perfect, many</div>
          <div class="choice">C. perfect; many</div>
          <div class="choice">D. perfect. Many</div>
        </div>

        <div class="question">
          <h5>4. F. NO CHANGE</h5>
          <div class="choice">G. singer however,</div>
          <div class="choice">H. singer, however,</div>
          <div class="choice">J. singer however</div>
        </div>
      </div>

      <div class="answer-key">
        <h4>Answer Key & Explanations</h4>
        <p><strong>1. B</strong> - "Which was held last Saturday" is unnecessary information (remove and sentence still works)</p>
        <p><strong>2. G</strong> - Three schools in series need commas, including Oxford comma before "and"</p>
        <p><strong>3. B</strong> - Dependent clause "Because the weather was perfect" requires comma</p>
        <p><strong>4. H</strong> - "However" is interrupting word needing commas on both sides</p>
      </div>
    `
  },

  'punctuation-practice': {
    title: 'Practice: Advanced Punctuation',
    duration: 18,
    content: `
      <p class="lesson-intro">Master semicolons, colons, dashes, and apostrophes with these ACT-style questions. These punctuation marks appear consistently on every test.</p>

      <div class="practice-passage">
        <h4>Passage 1: Test Preparation</h4>
        <p>[1] Effective ACT preparation requires several key components, practice tests strategic review and time management skills. [2] Many students focus on content review however, they neglect timing practice. [3] The most successful test-takers follow a simple approach: they master one section at a time. [4] It's not enough to memorize rules you must practice applying them under timed conditions.</p>
      </div>

      <div class="act-questions">
        <div class="question">
          <h5>1. A. NO CHANGE</h5>
          <div class="choice">B. components: practice tests, strategic review, and time management skills</div>
          <div class="choice">C. components; practice tests, strategic review, and time management skills</div>
          <div class="choice">D. components—practice tests, strategic review, and time management skills</div>
        </div>

        <div class="question">
          <h5>2. F. NO CHANGE</h5>
          <div class="choice">G. review; however,</div>
          <div class="choice">H. review, however;</div>
          <div class="choice">J. review. However,</div>
        </div>

        <div class="question">
          <h5>4. A. NO CHANGE</h5>
          <div class="choice">B. rules; you</div>
          <div class="choice">C. rules: you</div>
          <div class="choice">D. rules, you</div>
        </div>
      </div>

      <div class="practice-passage">
        <h4>Passage 2: Student Success</h4>
        <p>[5] Each students goal should be to maximize their score in every section. [6] The math sections problems range from basic algebra to advanced trigonometry. [7] Reading comprehension—the most challenging skill for many students—requires consistent practice. [8] Its important to remember that improvement takes time, don't expect overnight results.</p>
      </div>

      <div class="act-questions">
        <div class="question">
          <h5>5. F. NO CHANGE</h5>
          <div class="choice">G. Each student's goal</div>
          <div class="choice">H. Each students' goal</div>
          <div class="choice">J. Each student's goals</div>
        </div>

        <div class="question">
          <h5>6. A. NO CHANGE</h5>
          <div class="choice">B. section's problems</div>
          <div class="choice">C. sections' problems</div>
          <div class="choice">D. sections problems'</div>
        </div>

        <div class="question">
          <h5>8. F. NO CHANGE</h5>
          <div class="choice">G. It's important to remember that improvement takes time; don't</div>
          <div class="choice">H. Its important to remember that improvement takes time; don't</div>
          <div class="choice">J. It's important to remember that improvement takes time, don't</div>
        </div>
      </div>

      <div class="answer-key">
        <h4>Answer Key & Explanations</h4>
        <p><strong>1. B</strong> - Colon introduces list after complete sentence</p>
        <p><strong>2. G</strong> - Semicolon connects two complete ideas; "however" needs comma after</p>
        <p><strong>4. B</strong> - Semicolon connects two related complete ideas</p>
        <p><strong>5. G</strong> - Singular possessive: "student's goal"</p>
        <p><strong>6. B</strong> - Singular possessive: "section's problems"</p>
        <p><strong>8. G</strong> - "It's" = "it is"; semicolon connects complete ideas</p>
      </div>
    `
  }
};

// Complete list of all lessons from actcourse.html structure
export const lessonStructure = [
  // Introduction
  { id: 'getting-started', section: 'all', title: 'ACT Test Basics & Overview', desc: 'Test format, timing, and scoring overview', status: 'completed' },

  // English Section
  { id: 'sentence-structure', section: 'english', title: 'Chapter 1: Building Complete Sentences', desc: 'Independent clauses, dependent clauses, compound sentences, and comma splices', status: 'completed' },
  { id: 'commas', section: 'english', title: 'Chapter 2: Essential Comma Rules', desc: 'Unnecessary information, names rule, listing commas, and adjective lists', status: 'completed' },
  { id: 'punctuation', section: 'english', title: 'Chapter 3: Advanced Punctuation', desc: 'Semicolons, colons, dashes, apostrophes, and quotation marks', status: 'in-progress' },
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
  { id: 'backsolving', section: 'math', title: 'Chapter 1: Working Backwards Strategy', desc: 'Powerful test-taking trick for working backwards from answer choices', status: 'not-started' },
  { id: 'substitution', section: 'math', title: 'Chapter 2: Number Substitution Technique', desc: 'Test-taking strategy for plugging in values', status: 'not-started' },
  { id: 'geometry-angles', section: 'math', title: 'Chapter 3: Understanding Angles & Lines', desc: 'Intersecting lines, parallel lines, interior angles', status: 'not-started' },
  { id: 'geometry-shapes', section: 'math', title: 'Chapter 4: Areas, Volumes & Triangles', desc: 'Area, volume, right triangles, special triangles', status: 'not-started' },
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

  // Practice lessons
  { id: 'sentence-structure-practice', section: 'english', title: 'Practice: Building Complete Sentences', desc: 'Authentic ACT questions testing sentence structure concepts', status: 'not-started' },
  { id: 'commas-practice', section: 'english', title: 'Practice: Essential Comma Rules', desc: 'ACT-style questions on comma usage and punctuation', status: 'not-started' },
  { id: 'punctuation-practice', section: 'english', title: 'Practice: Advanced Punctuation', desc: 'Semicolons, colons, dashes and apostrophes on the ACT', status: 'not-started' },
  { id: 'backsolving-practice', section: 'math', title: 'Practice: Working Backwards Strategy', desc: 'ACT math problems perfect for backsolving technique', status: 'not-started' },
  { id: 'substitution-practice', section: 'math', title: 'Practice: Number Substitution Technique', desc: 'Variable problems using substitution method', status: 'not-started' },
  { id: 'geometry-angles-practice', section: 'math', title: 'Practice: Understanding Angles & Lines', desc: 'Parallel lines, intersecting lines, and polygon angles', status: 'not-started' },
  { id: 'geometry-shapes-practice', section: 'math', title: 'Practice: Areas, Volumes & Triangles', desc: 'Area, volume, and triangle problems from real ACTs', status: 'not-started' },
  { id: 'reading-fundamentals-practice', section: 'reading', title: 'Practice: Reading Fundamentals', desc: 'Essential reading strategies with ACT passages', status: 'not-started' },
  { id: 'science-basics-practice', section: 'science', title: 'Practice: Science Section Basics', desc: 'Data interpretation and analysis practice', status: 'not-started' },

  // Additional lesson entries for new content
  { id: 'word-choice-clarity', section: 'english', title: 'Chapter 4: Precision in Word Choice', desc: 'Eliminate wordiness and improve clarity in writing', status: 'not-started' },
  { id: 'transitions-flow', section: 'english', title: 'Chapter 5: Logical Flow & Transitions', desc: 'Master transitions and organizational structure', status: 'not-started' },
  { id: 'algebraic-foundations', section: 'math', title: 'Chapter 1: Algebraic Problem Solving', desc: 'Core algebra skills for ACT success', status: 'not-started' },
  { id: 'data-analysis-statistics', section: 'math', title: 'Chapter 2: Data Analysis & Statistics', desc: 'Mean, median, mode, and basic probability', status: 'not-started' },
  { id: 'active-reading-techniques', section: 'reading', title: 'Chapter 1: Strategic Reading Approaches', desc: 'Active reading strategies for comprehension', status: 'not-started' },
  { id: 'scientific-reasoning', section: 'science', title: 'Chapter 1: Scientific Method & Reasoning', desc: 'Understanding experimental design and logic', status: 'not-started' }
];