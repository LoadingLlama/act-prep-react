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
    title: 'Chapter 1: Independent vs Dependent',
    duration: 28, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 1: Independent vs Dependent Clauses</h2>
    <p class="lesson-intro">This chapter builds the foundation for <strong>all ACT English success</strong>. You'll master the two building blocks that every sentence uses: <strong>independent clauses</strong> and <strong>dependent clauses</strong>. This knowledge unlocks <strong>20% of all English questions</strong>!</p>
</div>

<div class="section why-important">
    <h3>Your Learning Path: Four Essential Steps</h3>
    <div class="concept-box">
        <p><strong>Step 1:</strong> Learn what makes a clause <span class="independent-highlight">independent</span> (complete)</p>
        <p><strong>Step 2:</strong> Understand what makes a clause <span class="dependent-highlight">dependent</span> (incomplete)</p>
        <p><strong>Step 3:</strong> Understand the difference between <span class="clause-highlight">clauses</span> and <span class="phrase-highlight">phrases</span></p>
        <p><strong>Step 4:</strong> Master the instant recognition technique</p>
        <p><strong>Result:</strong> You'll identify any clause or phrase type in under 3 seconds!</p>
    </div>
</div>

<div class="section">
    <h3>Step 1: <span style="color: #22c55e; font-weight: 600;">Independent Clauses</span> (The Complete Thoughts)</h3>

    <div class="concept-box">
        <h4>💡 Core Definition</h4>
        <p>An <span class="independent-highlight">independent clause</span> = <strong>SUBJECT + VERB + COMPLETE THOUGHT</strong></p>
        <p><strong>The Test:</strong> Can you put a period after it and walk away? If yes, it's independent!</p>
    </div>

    <div class="concept-box">
        <h4>🔍 Breaking Down the Formula</h4>
        <p><strong>SUBJECT</strong> (who or what) + <strong>VERB</strong> (the action or state) + <strong>COMPLETE THOUGHT</strong> (feels finished)</p>
    </div>

    <div class="concept-box">
        <h4>✅ Perfect Examples (Study These Patterns)</h4>
        <div class="examples">
            <p><span class="independent-highlight">The dog chased its tail.</span> ← Perfect! <span class="independent-highlight">Independent clause</span>.</p>
            <p><span class="independent-highlight">Sarah baked chocolate chip cookies yesterday.</span> ← Perfect! <span class="independent-highlight">Independent clause</span>.</p>
            <p><span class="independent-highlight">The rain stopped.</span> ← Perfect! <span class="independent-highlight">Independent clause</span> (even with just 2 words!).</p>
        </div>
        <div class="key-insight">
            <p><strong>🎯 Key Insight:</strong> Independent clauses feel complete and satisfying. Your brain doesn't wait for more information!</p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Step 2: <span style="color: #ef4444; font-weight: 600;">Dependent Clauses</span> (The Incomplete Thoughts)</h3>

    <div class="concept-box">
        <h4>💡 Core Definition</h4>
        <p>A <span class="dependent-highlight">dependent clause</span> = <strong>SUBORDINATING WORD + SUBJECT + VERB</strong></p>
        <p><strong>The Test:</strong> Does it start with a subordinating word? If yes, it CANNOT stand alone!</p>
    </div>

    <div class="concept-box">
        <h4>🔑 The Subordinating Words (Memorize This List!)</h4>
        <div class="subordinating-conjunctions">
            <p><strong>Most common subordinating conjunctions:</strong></p>
            <div class="conjunction-categories">
                <div class="category">
                    <strong>TIME WORDS:</strong> when, while, before, after, since
                </div>
                <div class="category">
                    <strong>CONTRAST WORDS:</strong> although, though, even though, whereas
                </div>
                <div class="category">
                    <strong>CAUSE/CONDITION:</strong> because, if, unless, whether
                </div>
            </div>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ How Independent Clauses Become Dependent</h4>
        <p>Watch this transformation happen:</p>
        <div class="examples">
            <p><strong>STEP 1 - <span class="independent-highlight">Independent</span> (Complete):</strong></p>
            <p><strong class="independent-highlight">Sarah baked chocolate chip cookies.</strong> ✅</p>
            <p><em>Perfect! Complete thought. Your brain is satisfied.</em></p>
            <p><strong>STEP 2 - Add Subordinating Word (Now <span class="dependent-highlight">Dependent</span>):</strong></p>
            <p><strong class="dependent-highlight">Because Sarah baked chocolate chip cookies...</strong> ❌</p>
            <p><em>Now incomplete! Your brain is waiting: "What happened because she baked cookies?"</em></p>
        </div>
    </div>
</div>

<!-- QUIZ_5 -->

<div class="section">
    <h3>Step 3: <span style="color: #3b82f6; font-weight: 600;">Clauses vs Phrases</span> - The Foundation Concept</h3>

    <div class="concept-box">
        <h4>💡 The Critical Distinction</h4>
        <p><strong><span class="clause-highlight">CLAUSE</span></strong> = Has both a SUBJECT and a VERB</p>
        <p><strong><span class="phrase-highlight">PHRASE</span></strong> = Missing either a SUBJECT or a VERB (or both)</p>
        <p><em>This is the #1 concept tested on the ACT - master this and you unlock everything!</em></p>
    </div>

    <div class="concept-box">
        <h4>📋 <span class="clause-highlight">Clauses</span> - The Complete Units</h4>
        <p>Every clause MUST have both a subject and a verb. Think of them as complete "action units."</p>
        <div class="examples">
            <p><strong>✅ <span class="clause-highlight">Clause</span> Examples (Subject + Verb):</strong></p>
            <p>• <span class="clause-highlight">The storm arrived</span> → Subject + Verb = <span class="clause-highlight">Clause</span> ✓</p>
            <p>• <span class="clause-highlight">She studied</span> → Subject + Verb = <span class="clause-highlight">Clause</span> ✓</p>
            <p>• <span class="clause-highlight">The cat sat</span> on the mat → Subject + Verb = <span class="clause-highlight">Clause</span> ✓</p>
            <p><em>Notice: Each has someone/something DOING an action or being in a state.</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 <span class="phrase-highlight">Phrases</span> - The Incomplete Units</h4>
        <p>Phrases are missing either a subject, a verb, or both. They're sentence fragments that can't stand alone.</p>
        <div class="examples">
            <p><strong>✅ <span class="phrase-highlight">Phrase</span> Examples (Missing Subject or Verb):</strong></p>
            <p>• <strong>Running through the park</strong> → No subject! (Who is running?) = <span class="phrase-highlight">Phrase</span> ✓</p>
            <p>• <strong>After the game</strong> → No verb! (What happened after?) = <span class="phrase-highlight">Phrase</span> ✓</p>
            <p>• <strong>In the morning</strong> → No subject or verb! = <span class="phrase-highlight">Phrase</span> ✓</p>
            <p>• <strong>To study harder</strong> → No subject! (Who should study?) = <span class="phrase-highlight">Phrase</span> ✓</p>
            <p><em>Notice: These feel incomplete - your brain waits for more information!</em></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The Subject-Verb Test (Works Every Time!)</h4>
        <p><strong>Step 1:</strong> Look for the subject → "Who or what is this about?"</p>
        <p><strong>Step 2:</strong> Look for the verb → "What action or state of being?"</p>
        <p><strong>Step 3:</strong> If you find BOTH → It's a <span class="clause-highlight">CLAUSE</span></p>
        <p><strong>Step 4:</strong> If you're missing either one → It's a <span class="phrase-highlight">PHRASE</span></p>
    </div>
</div>

<!-- QUIZ_6 -->

<div class="section">
    <h3>Step 4: The Instant Recognition Technique</h3>

    <div class="concept-box">
        <h4>🚀 The 3-Second Method</h4>
        <p><strong>Step 1:</strong> Look at the very first word of the clause</p>
        <p><strong>Step 2:</strong> Ask: "Is this a subordinating word from my memorized list?"</p>
        <p><strong>Step 3:</strong> Apply the rule:</p>
        <p>→ Starts with subordinating word = <strong>DEPENDENT</strong></p>
        <p>→ Starts with anything else = <strong>INDEPENDENT</strong></p>
    </div>

    <div class="concept-box">
        <h4>🎯 Practice Examples (Apply the 3-Second Method)</h4>
        <div class="examples">
            <p><strong>Example 1:</strong> "<strong >Although</strong> the weather was perfect..."</p>
            <p>→ First word = "Although" (subordinating word) → <strong class="dependent-highlight">DEPENDENT</strong> ✅</p>

            <p><strong>Example 2:</strong> "<strong>The weather</strong> was perfect."</p>
            <p>→ First word = "The" (not subordinating) → <strong class="independent-highlight">INDEPENDENT</strong> ✅</p>

            <p><strong>Example 3:</strong> "<strong>When</strong> I finish this lesson..."</p>
            <p>→ First word = "When" (subordinating word) → <strong class="dependent-highlight">DEPENDENT</strong> ✅</p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🏆 Mastery Checkpoint</h4>
        <p>You now understand the fundamental difference:</p>
        <p><strong>Independent clauses</strong> = Complete thoughts that stand alone</p>
        <p><strong>Dependent clauses</strong> = Incomplete thoughts that need more information</p>
        <p><strong>Next up: You'll learn how to combine these building blocks perfectly!</strong></p>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Recognizing Sentence Fragments</h3>

    <div class="concept-box">
        <h4>⚠️ The Fragment Problem</h4>
        <p>A <strong>fragment</strong> looks like a sentence but is missing a crucial piece. It's like a broken building block that can't stand on its own.</p>
        <p><strong>The Fragment Test:</strong> Does it feel incomplete when you read it aloud? Does your brain wait for more? If yes, it's a fragment!</p>
    </div>

    <div class="concept-box">
        <h4>🔍 The 3 Types of Fragments (With Instant Fixes)</h4>

        <div class="fragment-examples">
            <div class="fragment-breakdown">
                <p><strong>Type 1: Missing the Action (No Complete Verb)</strong></p>
                <div class="incorrect-example">
                    <p><strong>❌ Fragment:</strong> The student running to class</p>
                    <p><strong>Problem:</strong> "Running" is just a description, not a complete action. What did the student DO?</p>
                    <div class="fix-options">
                        <p><strong>✅ Quick Fixes:</strong></p>
                        <p>• Add a complete verb: The student running to class <strong>tripped</strong>.</p>
                        <p>• Make "running" complete: The student <strong>was</strong> running to class.</p>
                        <p>• Add more complete thought: The student running to class <strong>dropped her books</strong>.</p>
                    </div>
                </div>
            </div>

            <div class="fragment-breakdown">
                <p><strong>Type 2: Missing the Subject (No Who/What)</strong></p>
                <div class="incorrect-example">
                    <p><strong>❌ Fragment:</strong> Excited about the beach trip</p>
                    <p><strong>Problem:</strong> WHO is excited? The subject is completely missing.</p>
                    <div class="fix-options">
                        <p><strong>✅ Quick Fixes:</strong></p>
                        <p>• Add a subject: <strong>Sarah was</strong> excited about the beach trip.</p>
                        <p>• Connect to a complete clause: <strong>The family</strong> excited about the beach trip <strong>packed early</strong>.</p>
                    </div>
                </div>
            </div>

            <div class="fragment-breakdown">
                <p><strong>Type 3: The Sneaky Dependent Clause</strong></p>
                <div class="incorrect-example">
                    <p><strong>❌ Fragment:</strong> Because the weather was perfect</p>
                    <p><strong>Problem:</strong> That "because" makes it incomplete! What happened BECAUSE of the perfect weather?</p>
                    <div class="fix-options">
                        <p><strong>✅ Quick Fixes:</strong></p>
                        <p>• Complete the thought: Because the weather was perfect<strong>, we went hiking</strong>.</p>
                        <p>• Remove the subordinating word: <strong>The weather was perfect.</strong></p>
                        <p>• Flip the order: <strong>We went hiking because</strong> the weather was perfect.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 Master Strategy: The "Walk Away" Test</h4>
        <p>Read any sentence aloud and ask: <strong>"Could I end the conversation here and walk away?"</strong></p>
        <p><strong>If your listener would be confused or waiting for more → It's a fragment!</strong></p>
    </div>
</div>

<div class="section">
    <h3>The 5 Golden Rules: How to Combine Building Blocks Perfectly</h3>

    <div class="concept-box">
        <h4>🏆 The Universal Truth</h4>
        <p>There are <strong>exactly 5 legal ways</strong> to combine clauses on the ACT. <strong>Everything else is wrong.</strong></p>
        <p><strong>Master these 5 rules → Never miss a sentence structure question again!</strong></p>
    </div>

    <div class="concept-box">
        <h4>🔑 First: Meet the FANBOYS Family</h4>
        <p>These 7 words are <strong>coordinating conjunctions</strong>. They join equal independent clauses.</p>

        <div class="fanboys-grid">
            <div class="fanboy-item"><strong>F</strong>or (because)</div>
            <div class="fanboy-item"><strong>A</strong>nd (addition)</div>
            <div class="fanboy-item"><strong>N</strong>or (not either)</div>
            <div class="fanboy-item"><strong>B</strong>ut (contrast)</div>
            <div class="fanboy-item"><strong>O</strong>r (choice)</div>
            <div class="fanboy-item"><strong>Y</strong>et (but)</div>
            <div class="fanboy-item"><strong>S</strong>o (therefore)</div>
        </div>

        <p><strong>💡 Memory Trick:</strong> FANBOYS treat all clauses equally—they never play favorites!</p>
    </div>

    <div class="rules-container">
        <div class="rule-card rule-1">
            <div class="rule-number">1</div>
            <div class="rule-content">
                <p><strong>Period Separation (The Safe Choice)</strong></p>
                <p class="rule-description"><strong>Pattern:</strong> Independent <strong>.</strong> Independent</p>
                <div class="rule-examples">
                    <p><strong>Example:</strong> Sarah loves dogs<strong>.</strong> Andrew loves cats.</p>
                </div>
                <p><strong>When to use:</strong> Always works! When in doubt, choose the period.</p>
            </div>
        </div>

        <div class="rule-card rule-2">
            <div class="rule-number">2</div>
            <div class="rule-content">
                <p><strong>Comma + FANBOYS (The Connector)</strong></p>
                <p class="rule-description"><strong>Pattern:</strong> Independent<strong>, FANBOYS</strong> Independent</p>
                <div class="rule-examples">
                    <p><strong>Example:</strong> Sarah loves dogs<strong>, but</strong> Andrew loves cats.</p>
                </div>
                <p><strong>When to use:</strong> To show the relationship between two equal ideas.</p>
            </div>
        </div>

        <div class="rule-card rule-3">
            <div class="rule-number">3</div>
            <div class="rule-content">
                <p><strong>Semicolon Connection (The Strong Link)</strong></p>
                <p class="rule-description"><strong>Pattern:</strong> Independent<strong>;</strong> Independent</p>
                <div class="rule-examples">
                    <p><strong>Example:</strong> Sarah loves dogs<strong>;</strong> Andrew loves cats.</p>
                </div>
                <p><strong>When to use:</strong> When two ideas are very closely related. Think "super period."</p>
            </div>
        </div>

        <div class="rule-card rule-4">
            <div class="rule-number">4</div>
            <div class="rule-content">
                <p><strong>Dependent → Independent (With Comma)</strong></p>
                <p class="rule-description"><strong>Pattern:</strong> Dependent<strong>,</strong> Independent</p>
                <div class="rule-examples">
                    <p><strong>Example:</strong> <strong>Because</strong> Sarah loves dogs<strong>,</strong> she volunteers at the shelter.</p>
                </div>
                <p><strong>Critical rule:</strong> Always use a comma when dependent comes first!</p>
            </div>
        </div>

        <div class="rule-card rule-5">
            <div class="rule-number">5</div>
            <div class="rule-content">
                <p><strong>Independent → Dependent (No Comma)</strong></p>
                <p class="rule-description"><strong>Pattern:</strong> Independent Dependent</p>
                <div class="rule-examples">
                    <p><strong>Example:</strong> Sarah volunteers at the shelter <strong>because</strong> she loves dogs.</p>
                </div>
                <p><strong>Key point:</strong> No comma needed when independent comes first!</p>
            </div>
        </div>
    </div>

    <div class="final-takeaway">
        <h4>🏆 Your Sentence Structure Mastery is Complete!</h4>
        <div class="mastery-summary">
            <div class="what-you-know">
                <p><strong>✅ You Now Know:</strong></p>
                <ul>
                    <li><strong>Independent clauses</strong> = complete thoughts</li>
                    <li><strong>Dependent clauses</strong> = incomplete thoughts</li>
                    <li><strong>3-second recognition</strong> technique</li>
                    <li><strong>Fragment detection</strong> and fixes</li>
                    <li><strong>All 5 Golden Rules</strong> for combining clauses</li>
                </ul>
            </div>
            <div class="next-step">
                <p><strong>🚀 Your Next Step:</strong></p>
                <p>Practice with the quiz below, then move to Chapter 2 where you'll learn the <strong>4 types of commas</strong> that complete your punctuation mastery!</p>
            </div>
        </div>
    </div>
</div>

<!-- QUIZ_2 -->
    `
  },

  'commas': {
    title: 'Chapter 2: Four Comma Types',
    duration: 22, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 2: <span style="color: #f59e0b; font-weight: 600;">Four Comma Types</span></h2>
    <p class="lesson-intro">Building on Chapter 1's foundation, you'll now master the <strong>4 comma types that appear on every ACT</strong>. These comma rules work together with your clause knowledge to handle <strong>30% of all English questions</strong>. Master these patterns and you'll never guess on comma questions again!</p>
</div>

<div class="section why-important">
    <h3>Your Building Block Progress</h3>
    <div class="concept-box">
        <p><strong>Chapter 1 ✅:</strong> Independent vs. dependent clauses + 5 Golden Rules</p>
        <p><strong>Chapter 2 📍:</strong> 4 comma types that complete your punctuation toolkit</p>
        <p><strong>Result:</strong> You'll handle every punctuation question with confidence</p>
    </div>
</div>

<div class="section">
    <h3>Review: Two Comma Types You Already Know</h3>
    <p>From Chapter 1, you've already mastered 2 of the 4 comma types. Let's connect them to your new knowledge:</p>

    <div class="concept-box">
        <h4><span style="color: #22c55e; font-weight: 600;">Type 1: FANBOYS Comma</span> (From Golden Rule #2)</h4>
        <p><strong>Pattern:</strong> <span class="independent-highlight">Independent clause</span> <em><strong>, FANBOYS</strong></em> <span class="independent-highlight">independent clause</span></p>
        <div class="examples">
            <p><strong>Perfect Example:</strong> <span class="independent-highlight">Sarah loves chocolate</span><strong>,</strong> <strong>but</strong> <span class="independent-highlight">Andrew prefers vanilla.</span></p>
            <p><em>Why this works: Two <span class="independent-highlight">complete thoughts</span> joined with comma + connecting word</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4><span style="color: #22c55e; font-weight: 600;">Type 2: Introductory Comma</span> (From Golden Rule #4)</h4>
        <p><strong>Pattern:</strong> <span class="dependent-highlight">Dependent clause</span><strong>,</strong> <span class="independent-highlight">independent clause</span></p>
        <div class="examples">
            <p><strong>Perfect Example:</strong> <span class="dependent-highlight">When the bell rang</span><strong>,</strong> <span class="independent-highlight">students rushed to lunch.</span></p>
            <p><em>Why this works: <span class="dependent-highlight">Incomplete thought</span> needs comma before <span class="independent-highlight">complete thought</span></em></p>
        </div>
    </div>
</div>

<div class="section">
    <h3>New Learning: The Final Two Comma Types</h3>
    <p>These next two comma types handle all the remaining comma situations on the ACT:</p>

    <div class="concept-box">
        <h4><span style="color: #f59e0b; font-weight: 600;">Type 3: Unnecessary Information Commas</span></h4>
        <p><strong>The Rule:</strong> Extra information that interrupts the main sentence gets surrounded by commas</p>
        <p><strong>The Test:</strong> Can you remove the information and still have a complete sentence? If yes, it needs commas!</p>

        <div class="examples">
            <p><strong>Perfect Examples:</strong></p>
            <p>Mrs. Johnson<strong>,</strong> who teaches chemistry<strong>,</strong> assigns homework daily.</p>
            <p><em>Remove "who teaches chemistry" → "Mrs. Johnson assigns homework daily" ✓ Still complete!</em></p>

            <p>The movie<strong>,</strong> surprisingly<strong>,</strong> ended with a cliffhanger.</p>
            <p><em>Remove "surprisingly" → "The movie ended with a cliffhanger" ✓ Still complete!</em></p>

            <p>My brother<strong>,</strong> the one with curly hair<strong>,</strong> plays guitar.</p>
            <p><em>Remove "the one with curly hair" → "My brother plays guitar" ✓ Still complete!</em></p>
        </div>

        <div class="pro-tip">
            <h4>🎯 PRO TIP: The Cross-Out Test</h4>
            <p>Cover the suspected unnecessary information with your fingers. If the sentence still makes perfect sense, it's unnecessary and needs commas!</p>
        </div>
    </div>

    <div class="concept-box">
        <h4><span style="color: #f59e0b; font-weight: 600;">Type 4: List Commas</span></h4>
        <p><strong>The Rule:</strong> Separate items in a series of 3 or more things</p>
        <p><strong>Key Insight:</strong> The comma before "and" is <em>always required</em> on the ACT!</p>

        <div class="examples">
            <p><strong>Perfect Examples:</strong></p>
            <p><strong>Things:</strong> I need pencils<strong>,</strong> paper<strong>,</strong> and erasers.</p>
            <p><strong>Actions:</strong> She ran<strong>,</strong> jumped<strong>,</strong> and landed safely.</p>
            <p><strong>Describing words:</strong> The tall<strong>,</strong> dark<strong>,</strong> mysterious stranger arrived.</p>
        </div>

        <div class="pro-tip">
            <h4>🔍 Special Case: Two Adjectives Test</h4>
            <p>For describing words, try switching their order. If it still sounds right, use a comma:</p>
            <p>✅ "Dark, mysterious" = "Mysterious, dark" (both sound good → use comma)</p>
            <p>❌ "Red sports" ≠ "Sports red" (sounds wrong → no comma)</p>
        </div>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Master Strategy: Your 4-Step Comma Decision Process</h3>
    <div class="concept-box">
        <h4>When You See a Comma Question on the ACT:</h4>
        <p><strong>Step 1:</strong> Look for FANBOYS words (and, but, so, etc.)</p>
        <p>→ If found: Check if you have independent clause + comma + FANBOYS + independent clause</p>

        <p><strong>Step 2:</strong> Look for subordinating words (when, because, although, etc.)</p>
        <p>→ If found: Check if dependent clause comes first and needs comma before independent clause</p>

        <p><strong>Step 3:</strong> Try the cross-out test</p>
        <p>→ If you can remove information and sentence is still complete: Use unnecessary information commas</p>

        <p><strong>Step 4:</strong> Count items in a list</p>
        <p>→ If 3+ items: Use list commas (don't forget comma before "and"!)</p>
    </div>
</div>

<div class="section">
    <h3>Common ACT Comma Traps (Avoid These!)</h3>

    <div class="concept-box">
        <h4>❌ Trap #1: Missing the Oxford Comma</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> I bought apples, oranges and bananas.</p>
            <p><strong>Right:</strong> I bought apples, oranges<strong>,</strong> and bananas.</p>
            <p><em>The ACT always requires the comma before "and" in lists!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ Trap #2: Comma Splicing</h4>
        <div class="examples">
            <p><strong >Wrong:</strong> <span >Sarah loves chocolate</span><strong >,</strong> <span >Andrew prefers vanilla.</span> ❌</p>
            <p><strong >Right:</strong> <span >Sarah loves chocolate</span><strong >, but</strong> <span >Andrew prefers vanilla.</span> ✅</p>
            <p><em>Remember: A comma alone cannot join two <span >independent clauses</span>!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ Trap #3: Forgetting Introductory Commas</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> When the movie ended everyone applauded.</p>
            <p><strong>Right:</strong> When the movie ended<strong>,</strong> everyone applauded.</p>
            <p><em>Always use comma after dependent clause that starts a sentence!</em></p>
        </div>
    </div>
</div>

<!-- QUIZ_2 -->
    `
  },

  // I need to add ALL the other lessons here...
  // This is just a start - I need to extract content from all 4 JS files

  // Placeholder for remaining lessons
  'punctuation': {
    title: 'Chapter 3: Advanced Punctuation',
    duration: 20, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 3: <span style="color: #8b5cf6; font-weight: 600;">Advanced Punctuation</span></h2>
    <p class="lesson-intro">Building on your <strong>Chapter 1</strong> clause mastery and <strong>Chapter 2</strong> comma skills, you'll now conquer the <strong>5 advanced punctuation marks</strong> that appear on every ACT. Master these patterns and <strong>unlock another 15% of English questions</strong>!</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 3 Learning Path: 5 Power Punctuation Marks</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>1. Semicolons</strong> → The "super period" that joins related thoughts</p>
        <p><strong>2. Colons</strong> → The "announcer" that introduces what comes next</p>
        <p><strong>3. Dashes</strong> → The "spotlight" that emphasizes important information</p>
        <p><strong>4. Apostrophes</strong> → The "ownership marker" that shows possession and contractions</p>
        <p><strong>5. Quotation Marks</strong> → The "speech bubbles" that contain exact words</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #8b5cf6; font-weight: 600;">Semicolons</span> - The Super Period</h3>

    <div class="concept-box">
        <h4>💡 Core Truth About Semicolons</h4>
        <p>A semicolon is <strong>stronger than a comma but weaker than a period</strong>. It connects ideas that are <em>very closely related</em>.</p>
        <p><strong>Key Rule:</strong> Both sides of a semicolon must be <span >independent clauses</span> (remember Chapter 1!)</p>
    </div>

    <div class="concept-box">
        <h4>📋 Semicolon Rule #1: Joining Related Independent Clauses</h4>
        <p><strong>Pattern:</strong> Independent clause<strong>;</strong> independent clause</p>

        <div class="examples">
            <p><strong>Perfect Examples:</strong></p>
            <p><strong>✅ Correct:</strong> Sarah studied for hours<strong>;</strong> she was ready for the test.</p>
            <p><em>Why it works: Both sides are complete thoughts, and the second explains the result of the first.</em></p>

            <p><strong>✅ Also correct:</strong> The storm was intense<strong>;</strong> however, we continued our hike.</p>
            <p><em>Why it works: "However" is a transitional word, not a FANBOYS conjunction.</em></p>
        </div>

        <div class="examples">
            <p><strong>Common Mistakes:</strong></p>
            <p><strong>❌ Wrong:</strong> Sarah studied for hours<strong>,</strong> she was ready for the test.</p>
            <p><em>Problem: Comma splice! You can't join two independent clauses with just a comma.</em></p>

            <p><strong>❌ Wrong:</strong> Sarah studied for hours<strong>;</strong> and was ready for the test.</p>
            <p><em>Problem: "and was ready" is not an independent clause (no subject!).</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 Semicolon Rule #2: Super Lists (When Commas Get Confusing)</h4>
        <p><strong>When to use:</strong> When list items already contain commas, use semicolons to separate the major items.</p>

        <div class="examples">
            <p><strong>Perfect Example:</strong></p>
            <p><strong>✅ Clear with semicolons:</strong> The debate included experts from Portland, Oregon<strong>;</strong> Austin, Texas<strong>;</strong> and Miami, Florida.</p>
            <p><strong>❌ Confusing with commas:</strong> The debate included experts from Portland, Oregon, Austin, Texas, and Miami, Florida.</p>
            <p><em>Without semicolons, it's unclear how many cities there are!</em></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 Semicolon Test Strategy</h4>
        <p><strong>Step 1:</strong> Cover the semicolon and read each side separately</p>
        <p><strong>Step 2:</strong> Ask "Is each side a complete sentence that could stand alone?"</p>
        <p><strong>Step 3:</strong> If both are complete AND closely related → semicolon works!</p>
        <p><strong>Step 4:</strong> If there are commas within list items → semicolon needed for clarity</p>
    </div>
</div>

<div class="section">
    <h3>Part 2: Colons - The Great Announcer</h3>

    <div class="concept-box">
        <h4>💡 Core Truth About Colons</h4>
        <p>A colon says <strong>"Here comes what I promised!"</strong> It introduces and announces what follows.</p>
        <p><strong>Golden Rule:</strong> The part <em>before</em> the colon must always be an independent clause!</p>
    </div>

    <div class="concept-box">
        <h4>📋 The 3 Things Colons Can Introduce</h4>

        <div class="examples">
            <p><strong>Type 1: Lists</strong></p>
            <p><strong>✅ Correct:</strong> I need three things for the recipe<strong>:</strong> flour, eggs, and milk.</p>
            <p><strong>❌ Wrong:</strong> I need<strong>:</strong> flour, eggs, and milk.</p>
            <p><em>Why wrong: "I need" isn't complete—need what?</em></p>
        </div>

        <div class="examples">
            <p><strong>Type 2: Explanations</strong></p>
            <p><strong>✅ Correct:</strong> The reason for her success was simple<strong>:</strong> hard work and dedication.</p>
            <p><strong>✅ Also correct:</strong> She had one goal in mind<strong>:</strong> to become a doctor.</p>
        </div>

        <div class="examples">
            <p><strong>Type 3: Direct Quotations</strong></p>
            <p><strong>✅ Correct:</strong> Shakespeare's most famous line remains timeless<strong>:</strong> "To be or not to be, that is the question."</p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 Colon Test Strategy</h4>
        <p><strong>The Cover-Up Test:</strong> Cover everything after the colon. Does what remains make sense as a complete sentence?</p>
        <p>→ <strong>If YES:</strong> Colon is correct!</p>
        <p>→ <strong>If NO:</strong> Choose a different punctuation mark</p>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Part 3: Dashes - The Drama Queen</h3>

    <div class="concept-box">
        <h4>💡 Core Truth About Dashes</h4>
        <p>Dashes create <strong>dramatic emphasis</strong> and can replace commas, parentheses, or colons when you want <em>extra attention</em> on something.</p>
        <p><strong>Key Insight:</strong> Dashes are more dramatic than commas but less formal than semicolons.</p>
    </div>

    <div class="concept-box">
        <h4>📋 The 3 Main Uses of Dashes</h4>

        <div class="examples">
            <p><strong>Use 1: Sudden Interruption or Change</strong></p>
            <p><strong>✅ Example:</strong> The weather was perfect for hiking<strong>—</strong>until the thunderstorm hit.</p>
            <p><em>The dash shows a sudden, dramatic change in the situation.</em></p>
        </div>

        <div class="examples">
            <p><strong>Use 2: Extra Emphasis (Instead of a Colon)</strong></p>
            <p><strong>✅ Example:</strong> She had only one thing on her mind<strong>—</strong>winning the championship.</p>
            <p><strong>Compare to colon:</strong> She had only one thing on her mind<strong>:</strong> winning the championship.</p>
            <p><em>The dash version feels more dramatic and immediate.</em></p>
        </div>

        <div class="examples">
            <p><strong>Use 3: Setting Off Information (Pair of Dashes)</strong></p>
            <p><strong>✅ Example:</strong> The movie<strong>—</strong>despite terrible reviews<strong>—</strong>was surprisingly entertaining.</p>
            <p><strong>Compare to commas:</strong> The movie, despite terrible reviews, was surprisingly entertaining.</p>
            <p><em>The dashes create more emphasis on the contrast.</em></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 Dash vs. Other Punctuation</h4>
        <p><strong>Choose dash when:</strong> You want extra drama or emphasis</p>
        <p><strong>Choose comma when:</strong> The information is routine or expected</p>
        <p><strong>Choose colon when:</strong> You're formally introducing something</p>
        <p><strong>Choose semicolon when:</strong> You're connecting two equal, related ideas</p>
    </div>
</div>

<div class="section">
    <h3>Part 4: Apostrophes - The Ownership Expert</h3>

    <div class="concept-box">
        <h4>💡 Core Truth About Apostrophes</h4>
        <p>Apostrophes have <strong>exactly 2 jobs</strong> on the ACT: showing <span >possession</span> (ownership) and creating <span >contractions</span> (shortened words).</p>
    </div>

    <div class="concept-box">
        <h4>📋 Job 1: Showing Possession (Ownership)</h4>

        <div class="examples">
            <p><strong>Singular Nouns: Add 's</strong></p>
            <p><strong>✅ Examples:</strong></p>
            <p>• The <strong>cat's</strong> toy (the toy belongs to the cat)</p>
            <p>• <strong>Sarah's</strong> book (the book belongs to Sarah)</p>
            <p>• The <strong>class's</strong> project (even if the noun ends in 's'!)</p>
        </div>

        <div class="examples">
            <p><strong>Plural Nouns Ending in 's': Add Only '</strong></p>
            <p><strong>✅ Examples:</strong></p>
            <p>• The <strong>cats'</strong> toys (toys belonging to multiple cats)</p>
            <p>• The <strong>students'</strong> complaints (complaints from multiple students)</p>
        </div>

        <div class="examples">
            <p><strong>Irregular Plural Nouns: Add 's</strong></p>
            <p><strong>✅ Examples:</strong></p>
            <p>• The <strong>children's</strong> playground</p>
            <p>• The <strong>men's</strong> locker room</p>
            <p><em>These plurals don't end in 's', so they get full 's</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 Job 2: Contractions (Combining Words)</h4>

        <div class="examples">
            <p><strong>Common Contractions:</strong></p>
            <p>• <strong>it's</strong> = it is OR it has</p>
            <p>• <strong>they're</strong> = they are</p>
            <p>• <strong>you're</strong> = you are</p>
            <p>• <strong>can't</strong> = cannot</p>
            <p>• <strong>won't</strong> = will not</p>
            <p>• <strong>shouldn't</strong> = should not</p>
        </div>

        <div class="examples">
            <p><strong>⚠️ Danger Zone: Its vs. It's</strong></p>
            <p><strong>it's</strong> = it is OR it has (contraction)</p>
            <p>→ <em>"It's raining outside"</em> = "It is raining outside"</p>

            <p><strong>its</strong> = belonging to it (possessive, NO apostrophe!)</p>
            <p>→ <em>"The dog wagged its tail"</em> = the tail belonging to the dog</p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 Apostrophe Test Strategy</h4>
        <p><strong>For contractions:</strong> Expand the word. "It's" becomes "it is"—does it make sense?</p>
        <p><strong>For possession:</strong> Ask "who owns what?" Then follow the rules: singular = 's, plural ending in s = '</p>
        <p><strong>Remember:</strong> Possessive pronouns (its, yours, hers, theirs) NEVER use apostrophes!</p>
    </div>
</div>

<div class="section">
    <h3>Part 5: Quotation Marks - The Speech Bubbles</h3>

    <div class="concept-box">
        <h4>💡 Core Truth About Quotation Marks</h4>
        <p>Quotation marks capture <strong>exact words</strong> that someone spoke or wrote. They work like speech bubbles in comics!</p>
    </div>

    <div class="concept-box">
        <h4>📋 The 3 Essential Quotation Rules</h4>

        <div class="examples">
            <p><strong>Rule 1: Comma Placement</strong></p>
            <p><strong>✅ Correct:</strong> "I love this book<strong>,</strong>" Sarah said.</p>
            <p><strong>❌ Wrong:</strong> "I love this book"<strong>,</strong> Sarah said.</p>
            <p><em>Commas and periods always go INSIDE the quotation marks!</em></p>
        </div>

        <div class="examples">
            <p><strong>Rule 2: Question Marks and Exclamation Points</strong></p>
            <p><strong>If part of the quote:</strong> Sarah asked, "Are you coming<strong>?</strong>"</p>
            <p><strong>If not part of quote:</strong> Did Sarah say, "I'm leaving"<strong>?</strong></p>
            <p><em>These marks go inside if they belong to the quoted words, outside if they belong to the whole sentence.</em></p>
        </div>

        <div class="examples">
            <p><strong>Rule 3: Capitalizing the First Word</strong></p>
            <p><strong>✅ Complete sentence quote:</strong> The teacher announced, "<strong>T</strong>he test is tomorrow."</p>
            <p><strong>✅ Partial quote:</strong> The teacher said the test would be "<strong>c</strong>hallenging but fair."</p>
            <p><em>Capitalize only if the quote is a complete sentence.</em></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 Quotation Mark Memory Trick</h4>
        <p><strong>Think "Protective Bubble":</strong> Quotation marks protect the exact words. Commas and periods want to stay close to the words they protect, so they go inside the bubble!</p>
    </div>
</div>

<!-- QUIZ_2 -->

<div class="section">
    <h3>Chapter 3 Master Strategy: Your ACT Punctuation Decision Tree</h3>
    <div class="concept-box">
        <h4>🎯 When You See Advanced Punctuation on the ACT:</h4>

        <p><strong>Step 1:</strong> Identify what you're looking at</p>
        <p>→ Two complete thoughts? Consider semicolon or dash</p>
        <p>→ Something being introduced? Consider colon or dash</p>
        <p>→ Ownership or contraction? Check apostrophes</p>
        <p>→ Exact spoken words? Check quotation marks</p>

        <p><strong>Step 2:</strong> Apply the specific rules</p>
        <p>→ Semicolon: Both sides must be independent clauses</p>
        <p>→ Colon: Before the colon must be independent clause</p>
        <p>→ Dash: Use for emphasis or interruption</p>
        <p>→ Apostrophe: Singular = 's, plural ending in s = '</p>
        <p>→ Quotes: Commas and periods go inside</p>

        <p><strong>Step 3:</strong> When in doubt, use simpler punctuation</p>
        <p>→ Period instead of semicolon</p>
        <p>→ Comma instead of dash</p>
        <p>→ Simple sentences instead of complex punctuation</p>
    </div>
</div>

<div class="section">
    <h3>Chapter 3 Success Summary</h3>
    <div class="concept-box">
        <h4>🏆 You've Now Mastered:</h4>
        <p>✓ <strong>Semicolons</strong> → Joining related independent clauses and creating super lists</p>
        <p>✓ <strong>Colons</strong> → Introducing lists, explanations, and quotes (after independent clauses)</p>
        <p>✓ <strong>Dashes</strong> → Adding drama, emphasis, and handling interruptions</p>
        <p>✓ <strong>Apostrophes</strong> → Showing possession and creating contractions correctly</p>
        <p>✓ <strong>Quotation Marks</strong> → Capturing exact speech with proper comma placement</p>

        <p><strong>Next:</strong> Chapter 4 will build on this foundation by tackling Subject-Verb Agreement—using your clause knowledge to identify subjects correctly!</p>
    </div>
</div>
    `
  },

  'verbs': {
    title: 'Chapter 4: Subject-Verb Agreement',
    duration: 25, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 4: <span style="color: #ef4444; font-weight: 600;">Subject-Verb Agreement</span></h2>
    <p class="lesson-intro">Building on your <strong>Chapters 1-3</strong> foundation (clauses, commas, and punctuation), you'll now master <strong>subject-verb agreement</strong>—the most tested grammar concept on the ACT! This chapter unlocks <strong>another 20% of English questions</strong> using your clause identification skills from Chapter 1.</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 4 Learning Path: The 4-Step Subject-Verb Mastery System</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Step 1:</strong> The Universal Rule → How subjects and verbs must match</p>
        <p><strong>Step 2:</strong> The Distractor Game → How ACT hides the real subject</p>
        <p><strong>Step 3:</strong> Special Subject Types → Compound, indefinite, and collective subjects</p>
        <p><strong>Step 4:</strong> Verb Forms & Tenses → When to use specific verb forms</p>
        <p><strong>Your advantage:</strong> You already know how to find <span >independent clauses</span> from Chapter 1!</p>
    </div>
</div>

<div class="section">
    <h3>Step 1: The Universal Rule (It Never Changes!)</h3>

    <div class="concept-box">
        <h4>💡 The Only Rule You Need to Know</h4>
        <p><strong>Singular subjects</strong> take <span >singular verbs</span></p>
        <p><strong>Plural subjects</strong> take <span >plural verbs</span></p>
        <p><em>That's it! Every ACT question comes down to this simple rule.</em></p>
    </div>

    <div class="concept-box">
        <h4>📋 The Basic Pattern Recognition</h4>

        <div class="examples">
            <p><strong>Singular = Add 's' to Verb</strong></p>
            <p><strong>✅ Correct:</strong> The <span >cat</span> <strong>runs</strong> quickly.</p>
            <p><strong>✅ Correct:</strong> <span >Sarah</span> <strong>studies</strong> every night.</p>
            <p><strong>✅ Correct:</strong> The <span >book</span> <strong>contains</strong> many chapters.</p>
            <p><em>Rule: One thing = verb ends in 's'</em></p>
        </div>

        <div class="examples">
            <p><strong>Plural = No 's' on Verb</strong></p>
            <p><strong>✅ Correct:</strong> The <span >cats</span> <strong>run</strong> quickly.</p>
            <p><strong>✅ Correct:</strong> <span >Sarah and Mike</span> <strong>study</strong> together.</p>
            <p><strong>✅ Correct:</strong> The <span >books</span> <strong>contain</strong> different information.</p>
            <p><em>Rule: Multiple things = verb has no 's'</em></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 Memory Trick: The "S" Rule</h4>
        <p><strong>Either the subject OR the verb gets the 's'—never both, never neither!</strong></p>
        <p>• <strong>Cat</strong> runs ← Subject has no 's', verb gets 's'</p>
        <p>• <strong>Cats</strong> run ← Subject has 's', verb gets no 's'</p>
    </div>
</div>

<div class="section">
    <h3>Step 2: The Distractor Game - How ACT Hides Subjects</h3>

    <div class="concept-box">
        <h4>💡 The ACT's Favorite Trick</h4>
        <p>The ACT <strong>separates subjects from verbs</strong> with distracting words to confuse you. Your job: <strong>ignore the distractors and find the real subject!</strong></p>
    </div>

    <div class="concept-box">
        <h4>📋 Distractor Type 1: Prepositional Phrases (The Decoys)</h4>
        <p><strong>Rule:</strong> Subjects are <em>never</em> found inside prepositional phrases. Cross them out!</p>

        <div class="examples">
            <p><strong>How to Handle Prepositional Phrases:</strong></p>
            <p><strong>✅ Step-by-step process:</strong></p>
            <p>Original: "The box <em>of chocolates</em> <strong>[is/are]</strong> on the table."</p>
            <p><strong>Step 1:</strong> Cross out prepositional phrase: The box ~~of chocolates~~ <strong>[is/are]</strong> on the table.</p>
            <p><strong>Step 2:</strong> Find the subject: <span >box</span> (singular)</p>
            <p><strong>Step 3:</strong> Choose matching verb: The box <strong>is</strong> on the table. ✅</p>
        </div>

        <div class="examples">
            <p><strong>Common Prepositional Distractors:</strong></p>
            <p><strong>Example 1:</strong> The students <em>in the hallway</em> <strong>are</strong> waiting.</p>
            <p>→ Subject: <span >students</span> (plural) → verb: <strong>are</strong></p>

            <p><strong>Example 2:</strong> The leader <em>of these groups</em> <strong>has</strong> arrived.</p>
            <p>→ Subject: <span >leader</span> (singular) → verb: <strong>has</strong></p>

            <p><strong>Example 3:</strong> Each <em>of the players</em> <strong>wants</strong> to win.</p>
            <p>→ Subject: <span >Each</span> (singular!) → verb: <strong>wants</strong></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 Distractor Type 2: Interrupting Phrases</h4>
        <p><strong>Pattern:</strong> Subject + <em>, interrupting information,</em> + verb</p>

        <div class="examples">
            <p><strong>Perfect Examples:</strong></p>
            <p><strong>✅ Correct:</strong> Sarah<strong>,</strong> <em>along with her friends</em><strong>,</strong> <strong>is</strong> coming to dinner.</p>
            <p>→ Real subject: <span >Sarah</span> (singular) → verb: <strong>is</strong></p>
            <p><em>"along with her friends" is just extra information!</em></p>

            <p><strong>✅ Correct:</strong> The books<strong>,</strong> <em>as well as the pen</em><strong>,</strong> <strong>are</strong> on the desk.</p>
            <p>→ Real subject: <span >books</span> (plural) → verb: <strong>are</strong></p>
        </div>

        <div class="examples">
            <p><strong>Interrupting Phrase Warning Signs:</strong></p>
            <p>• along with • as well as • together with • in addition to</p>
            <p>• including • except • besides • rather than</p>
            <p><strong>All of these create interrupting phrases—ignore them for subject-verb agreement!</strong></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The Cross-Out Strategy</h4>
        <p><strong>Step 1:</strong> Cross out everything between commas</p>
        <p><strong>Step 2:</strong> Cross out all prepositional phrases</p>
        <p><strong>Step 3:</strong> What's left is your true subject and verb!</p>
        <p><strong>Step 4:</strong> Apply the basic singular/plural rule</p>
    </div>
</div>

<div class="section">
    <h3>Step 3: Special Subject Types (The Tricky Ones)</h3>

    <div class="concept-box">
        <h4>📋 Type 1: Compound Subjects</h4>
        <p>When you have multiple subjects, the connector word determines if it's singular or plural.</p>

        <div class="examples">
            <p><strong>AND = Always Plural</strong></p>
            <p><strong>✅ Examples:</strong></p>
            <p>• Sarah <strong>and</strong> Mike <strong>are</strong> studying.</p>
            <p>• The cat <strong>and</strong> the dog <strong>are</strong> friends.</p>
            <p>• Running <strong>and</strong> swimming <strong>are</strong> good exercise.</p>
            <p><em>Rule: Two or more things connected by "and" = always plural!</em></p>
        </div>

        <div class="examples">
            <p><strong>OR/NOR = Closest Subject Wins</strong></p>
            <p><strong>✅ Examples:</strong></p>
            <p>• Either the teacher <strong>or</strong> the students <strong>are</strong> wrong.</p>
            <p>→ Closest to verb: <span >students</span> (plural) → <strong>are</strong></p>

            <p>• Either the students <strong>or</strong> the teacher <strong>is</strong> wrong.</p>
            <p>→ Closest to verb: <span >teacher</span> (singular) → <strong>is</strong></p>

            <p>• Neither Sarah <strong>nor</strong> her friends <strong>are</strong> coming.</p>
            <p>→ Closest to verb: <span >friends</span> (plural) → <strong>are</strong></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 Type 2: Indefinite Pronouns (The Memorization List)</h4>

        <div class="examples">
            <p><strong>Always Singular (Memorize These!):</strong></p>
            <div style="background: #f0f8ff; padding: 1rem; border-radius: 8px; margin: 0.5rem 0;">
                <p><strong>Each, Every, Either, Neither</strong></p>
                <p><strong>Someone, Anyone, No one, Everyone</strong></p>
                <p><strong>Something, Anything, Nothing, Everything</strong></p>
                <p><strong>Somebody, Anybody, Nobody, Everybody</strong></p>
            </div>
            <p><strong>Examples:</strong></p>
            <p>• <strong>Each</strong> of the students <strong>has</strong> a book.</p>
            <p>• <strong>Everyone</strong> in the room <strong>is</strong> listening.</p>
            <p>• <strong>Neither</strong> of the answers <strong>seems</strong> correct.</p>
        </div>

        <div class="examples">
            <p><strong>Always Plural:</strong></p>
            <p><strong>Both, Few, Many, Several</strong></p>
            <p><strong>Examples:</strong></p>
            <p>• <strong>Both</strong> of the cats <strong>are</strong> sleeping.</p>
            <p>• <strong>Many</strong> of the students <strong>have</strong> questions.</p>
        </div>

        <div class="examples">
            <p><strong>Depends on Context:</strong></p>
            <p><strong>All, Any, Most, None, Some</strong></p>
            <p>→ Look at the noun they refer to!</p>
            <p>• <strong>Most</strong> of the cake <strong>is</strong> gone. (cake = singular)</p>
            <p>• <strong>Most</strong> of the cookies <strong>are</strong> gone. (cookies = plural)</p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 Type 3: Collective Nouns & Special Cases</h4>

        <div class="examples">
            <p><strong>Collective Nouns = Usually Singular</strong></p>
            <p><strong>Common collective nouns:</strong> team, family, group, class, committee, audience</p>
            <p>• The <strong>team</strong> <strong>is</strong> practicing.</p>
            <p>• The <strong>family</strong> <strong>has</strong> moved.</p>
            <p>• The <strong>class</strong> <strong>begins</strong> at 9 AM.</p>
        </div>

        <div class="examples">
            <p><strong>Special "Plural-Looking" Singular Nouns</strong></p>
            <p><strong>Mathematics</strong> <strong>is</strong> difficult.</p>
            <p><strong>Physics</strong> <strong>requires</strong> concentration.</p>
            <p><strong>News</strong> <strong>travels</strong> quickly.</p>
            <p><strong>Politics</strong> <strong>is</strong> complicated.</p>
        </div>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Step 4: Verb Forms & Tenses (Getting the Details Right)</h3>

    <div class="concept-box">
        <h4>💡 Core Insight About Verb Tenses</h4>
        <p>The ACT tests <strong>consistency</strong>. All verbs in a sentence or paragraph should generally be in the <em>same tense</em> unless there's a logical reason to change.</p>
    </div>

    <div class="concept-box">
        <h4>📋 The Most Tested Verb Forms</h4>

        <div class="examples">
            <p><strong>Present Perfect: "Have/Has" + Past Participle</strong></p>
            <p><strong>Use when:</strong> Action started in past, continues to present</p>
            <p>• I <strong>have lived</strong> here for five years. ✅</p>
            <p>• She <strong>has completed</strong> her homework. ✅</p>
            <p>• They <strong>have been</strong> friends since childhood. ✅</p>
        </div>

        <div class="examples">
            <p><strong>Past Perfect: "Had" + Past Participle</strong></p>
            <p><strong>Use when:</strong> Action happened before another past action</p>
            <p>• By the time I arrived, they <strong>had left</strong>. ✅</p>
            <p>• She realized she <strong>had forgotten</strong> her keys. ✅</p>
        </div>

        <div class="examples">
            <p><strong>Conditional: "Would Have" + Past Participle</strong></p>
            <p><strong>Use when:</strong> Talking about hypothetical past situations</p>
            <p>• If I had studied, I <strong>would have passed</strong>. ✅</p>
            <p>• She <strong>would have called</strong> if she could. ✅</p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 Common Irregular Verbs (High-Frequency ACT List)</h4>
        <div class="verb-table">
            <table>
                <tr><th style="background: #1a73e8; color: white;">Present</th><th style="background: #1a73e8; color: white;">Past</th><th style="background: #1a73e8; color: white;">Past Participle</th><th style="background: #1a73e8; color: white;">Meaning</th></tr>
                <tr><td><strong>begin</strong></td><td>began</td><td>begun</td><td>to start</td></tr>
                <tr><td><strong>break</strong></td><td>broke</td><td>broken</td><td>to shatter</td></tr>
                <tr><td><strong>choose</strong></td><td>chose</td><td>chosen</td><td>to select</td></tr>
                <tr><td><strong>drink</strong></td><td>drank</td><td>drunk</td><td>to consume liquid</td></tr>
                <tr><td><strong>eat</strong></td><td>ate</td><td>eaten</td><td>to consume food</td></tr>
                <tr><td><strong>go</strong></td><td>went</td><td>gone</td><td>to move/travel</td></tr>
                <tr><td><strong>lie</strong> (recline)</td><td>lay</td><td>lain</td><td>to recline</td></tr>
                <tr><td><strong>lay</strong> (place)</td><td>laid</td><td>laid</td><td>to place down</td></tr>
                <tr><td><strong>see</strong></td><td>saw</td><td>seen</td><td>to view</td></tr>
                <tr><td><strong>take</strong></td><td>took</td><td>taken</td><td>to grab/get</td></tr>
                <tr><td><strong>write</strong></td><td>wrote</td><td>written</td><td>to compose</td></tr>
            </table>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 Irregular Verb Memory Strategy</h4>
        <p><strong>The "Three Forms" Rule:</strong> Every verb has exactly three forms you need to know</p>
        <p>• <strong>Present:</strong> I write • <strong>Past:</strong> I wrote • <strong>Past Participle:</strong> I have written</p>
        <p><strong>Common mistake:</strong> "I have wrote" (❌) → "I have written" (✅)</p>
    </div>
</div>

<div class="section">
    <h3>Danger Zone: Most Common Subject-Verb Mistakes on ACT</h3>

    <div class="concept-box">
        <h4>❌ Trap #1: "Each" and "Every" Are Always Singular</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> Each of the students <strong>have</strong> their own book.</p>
            <p><strong>Right:</strong> Each of the students <strong>has</strong> <em>his or her</em> own book.</p>
            <p><em>Remember: "Each" is always singular, no matter what follows it!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ Trap #2: Don't Be Fooled by Nearby Plural Nouns</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> The collection of rare books <strong>are</strong> valuable.</p>
            <p><strong>Right:</strong> The collection of rare books <strong>is</strong> valuable.</p>
            <p><em>Subject is "collection" (singular), not "books"!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ Trap #3: Neither/Either Are Singular When Alone</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> Neither of the answers <strong>are</strong> correct.</p>
            <p><strong>Right:</strong> Neither of the answers <strong>is</strong> correct.</p>
            <p><em>"Neither" means "not one" → singular!</em></p>
        </div>
    </div>
</div>

<!-- QUIZ_2 -->

<div class="section">
    <h3>Chapter 4 Master Strategy: Your ACT Subject-Verb Decision Process</h3>
    <div class="concept-box">
        <h4>🎯 When You See Subject-Verb Agreement on the ACT:</h4>

        <p><strong>Step 1:</strong> Find the verb (the action or state of being word)</p>
        <p>→ Look for words like is/are, has/have, was/were, or action words</p>

        <p><strong>Step 2:</strong> Find the subject (who or what does the verb?)</p>
        <p>→ Cross out prepositional phrases and interrupting information</p>
        <p>→ The subject is never inside a prepositional phrase!</p>

        <p><strong>Step 3:</strong> Determine if subject is singular or plural</p>
        <p>→ Use your indefinite pronoun memory list</p>
        <p>→ Remember: compound subjects with "and" = plural</p>
        <p>→ Remember: compound subjects with "or/nor" = closest subject wins</p>

        <p><strong>Step 4:</strong> Match verb form to subject</p>
        <p>→ Singular subject = verb ends in 's' (in present tense)</p>
        <p>→ Plural subject = verb has no 's' ending</p>

        <p><strong>Step 5:</strong> Check verb tense consistency</p>
        <p>→ All verbs should generally be in same tense</p>
        <p>→ Use context clues for time relationships</p>
    </div>
</div>

<div class="section">
    <h3>Chapter 4 Success Summary</h3>
    <div class="concept-box">
        <h4>🏆 You've Now Mastered:</h4>
        <p>✓ <strong>The Universal Rule</strong> → Singular subjects take singular verbs, plural subjects take plural verbs</p>
        <p>✓ <strong>Distractor Recognition</strong> → Ignoring prepositional phrases and interrupting information</p>
        <p>✓ <strong>Special Subjects</strong> → Compound, indefinite pronoun, and collective noun rules</p>
        <p>✓ <strong>Verb Forms & Tenses</strong> → Irregular verbs and tense consistency</p>
        <p>✓ <strong>Common Traps</strong> → How ACT tries to trick you and how to avoid mistakes</p>

        <p><strong>Next:</strong> Chapter 5 will tackle pronoun agreement and the famous "Who vs. Whom" challenge—using your subject identification skills from this chapter!</p>
    </div>
</div>
    `
  },

  'pronouns': {
    title: 'Chapter 5: Who vs Whom',
    duration: 28, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 5: <span style="color: #06b6d4; font-weight: 600;">Who vs Whom</span> & Pronoun Mastery</h2>
    <p class="lesson-intro">Building on your <strong>Chapters 1-4</strong> foundation (clauses, commas, punctuation, and subject-verb agreement), you'll now conquer the <strong>most feared grammar topic</strong>: pronouns! This includes the notorious "Who vs. Whom" plus pronoun case and agreement. Master these patterns and <strong>unlock another 15% of English questions</strong>!</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 5 Learning Path: The 4-Part Pronoun System</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> Who vs. Whom → The "He/Him" trick that works 100% of the time</p>
        <p><strong>Part 2:</strong> Pronoun Case → When to use I vs. me, he vs. him, we vs. us</p>
        <p><strong>Part 3:</strong> Pronoun Agreement → Making pronouns match their antecedents perfectly</p>
        <p><strong>Part 4:</strong> Pronoun Clarity → Avoiding ambiguous and unclear pronoun references</p>
        <p><strong>Your advantage:</strong> You can already identify <span >subjects</span> from Chapter 4!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: Who vs. Whom - The Ultimate Trick</h3>

    <div class="concept-box">
        <h4>💡 Why This Topic Terrifies Students (But Shouldn't Terrify You!)</h4>
        <p><strong>The truth:</strong> Who vs. Whom looks scary, but it follows the <em>exact same pattern</em> as subject vs. object pronouns you already know!</p>
        <p><span >WHO</span> = subject (like <strong>he, she, they</strong>)</p>
        <p><span >WHOM</span> = object (like <strong>him, her, them</strong>)</p>
    </div>

    <div class="concept-box">
        <h4>🎯 The "He/Him" Test (Works Every Time!)</h4>
        <p><strong>Step 1:</strong> Find the who/whom in the sentence</p>
        <p><strong>Step 2:</strong> Replace it with "he" or "him"</p>
        <p><strong>Step 3:</strong> If "he" sounds right → use <span >WHO</span></p>
        <p><strong>Step 4:</strong> If "him" sounds right → use <span >WHOM</span></p>

        <div class="examples">
            <p><strong>Perfect Examples:</strong></p>
            <p><strong>Question:</strong> <em>Who/Whom</em> did you see at the party?</p>
            <p><strong>Test:</strong> "You saw <strong>him</strong> at the party" (not "You saw he")</p>
            <p><strong>Answer:</strong> <span >Whom</span> did you see at the party? ✅</p>
        </div>

        <div class="examples">
            <p><strong>Question:</strong> <em>Who/Whom</em> is bringing the snacks?</p>
            <p><strong>Test:</strong> "<strong>He</strong> is bringing the snacks" (not "Him is bringing")</p>
            <p><strong>Answer:</strong> <span >Who</span> is bringing the snacks? ✅</p>
        </div>

        <div class="examples">
            <p><strong>Question:</strong> The person <em>who/whom</em> I met was friendly.</p>
            <p><strong>Test:</strong> "I met <strong>him</strong>" (not "I met he")</p>
            <p><strong>Answer:</strong> The person <span >whom</span> I met was friendly. ✅</p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 Advanced Who vs. Whom (The Tricky Cases)</h4>

        <div class="examples">
            <p><strong>With Prepositions (Always WHOM!)</strong></p>
            <p><strong>Pattern:</strong> Preposition + whom</p>
            <p>• To <span >whom</span> should I address this letter?</p>
            <p>• For <span >whom</span> are you buying the gift?</p>
            <p>• With <span >whom</span> did you go to the movie?</p>
            <p><em>Rule: After prepositions (to, for, with, by, etc.), always use "whom"!</em></p>
        </div>

        <div class="examples">
            <p><strong>In Questions (Use the Flip Test)</strong></p>
            <p><strong>Tricky:</strong> <em>Who/Whom</em> do you think will win?</p>
            <p><strong>Flip it:</strong> "You think <strong>he</strong> will win" (not "him will win")</p>
            <p><strong>Answer:</strong> <span >Who</span> do you think will win? ✅</p>
        </div>

        <div class="examples">
            <p><strong>In Relative Clauses</strong></p>
            <p><strong>Example:</strong> She's the teacher <em>who/whom</em> everyone respects.</p>
            <p><strong>Test:</strong> "Everyone respects <strong>her</strong>" (object position)</p>
            <p><strong>Answer:</strong> She's the teacher <span >whom</span> everyone respects. ✅</p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 Who vs. Whom Memory Tricks</h4>
        <p><strong>Trick 1:</strong> "Who" and "he" both end in vowels → both are subjects</p>
        <p><strong>Trick 2:</strong> "Whom" and "him" both end in "m" → both are objects</p>
        <p><strong>Trick 3:</strong> When in doubt on the ACT, "who" is usually correct (it's used more often)</p>
    </div>
</div>

<div class="section">
    <h3>Part 2: Pronoun Case - Getting I, Me, We, Us Right</h3>

    <div class="concept-box">
        <h4>💡 The Core Concept</h4>
        <p>Pronouns change their form based on their job in the sentence:</p>
        <p><span >Subject pronouns</span> do the action</p>
        <p><span >Object pronouns</span> receive the action</p>
    </div>

    <div class="concept-box">
        <h4>📋 The Complete Pronoun Case Chart</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
            <tr style="background: #1a73e8; color: white;">
                <th style="padding: 0.5rem; border: 1px solid #ddd;">Subject Pronouns</th>
                <th style="padding: 0.5rem; border: 1px solid #ddd;">Object Pronouns</th>
                <th style="padding: 0.5rem; border: 1px solid #ddd;">Possessive</th>
            </tr>
            <tr><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>I</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>me</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;">my, mine</td></tr>
            <tr><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>you</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>you</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;">your, yours</td></tr>
            <tr><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>he</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>him</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;">his</td></tr>
            <tr><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>she</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>her</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;">her, hers</td></tr>
            <tr><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>we</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>us</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;">our, ours</td></tr>
            <tr><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>they</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>them</strong></td><td style="padding: 0.5rem; border: 1px solid #ddd;">their, theirs</td></tr>
        </table>
    </div>

    <div class="concept-box">
        <h4>📋 When to Use Subject vs. Object Pronouns</h4>

        <div class="examples">
            <p><strong>Subject Pronouns (Before the Verb)</strong></p>
            <p><strong>✅ Correct examples:</strong></p>
            <p>• <span >I</span> went to the store.</p>
            <p>• <span >She</span> and <span >I</span> are friends.</p>
            <p>• <span >We</span> studied together.</p>
            <p>• <span >They</span> arrived early.</p>
        </div>

        <div class="examples">
            <p><strong>Object Pronouns (After the Verb or Preposition)</strong></p>
            <p><strong>✅ Correct examples:</strong></p>
            <p>• The teacher called <span >me</span>.</p>
            <p>• Give the book to <span >her</span>.</p>
            <p>• Between you and <span >me</span>, this is difficult.</p>
            <p>• The message was for <span >us</span>.</p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ The #1 Pronoun Trap: Compound Subjects and Objects</h4>
        <p><strong>The problem:</strong> When there are two people, students often choose the wrong pronoun.</p>

        <div class="examples">
            <p><strong>Common Mistakes:</strong></p>
            <p><strong>❌ Wrong:</strong> Sarah and <strong>me</strong> went to the movies.</p>
            <p><strong>✅ Right:</strong> Sarah and <strong>I</strong> went to the movies.</p>
            <p><em>Test: Remove "Sarah and" → "I went" (not "me went")</em></p>

            <p><strong>❌ Wrong:</strong> The gift is for Tom and <strong>I</strong>.</p>
            <p><strong>✅ Right:</strong> The gift is for Tom and <strong>me</strong>.</p>
            <p><em>Test: Remove "Tom and" → "for me" (not "for I")</em></p>
        </div>

        <div class="pro-tip">
            <h4>🎯 The "Remove the Other Person" Test</h4>
            <p><strong>Step 1:</strong> Cover up or ignore the other person's name</p>
            <p><strong>Step 2:</strong> Say the sentence with just the pronoun</p>
            <p><strong>Step 3:</strong> If it sounds right alone, it's right with the other person too!</p>
        </div>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Part 3: Pronoun Agreement - Making Perfect Matches</h3>

    <div class="concept-box">
        <h4>💡 The Golden Rule of Pronoun Agreement</h4>
        <p>Every pronoun must <strong>agree</strong> with its antecedent (the noun it replaces) in:</p>
        <p>• <strong>Number:</strong> singular pronouns for singular nouns, plural for plural</p>
        <p>• <strong>Gender:</strong> he/him for males, she/her for females, it for things</p>
        <p>• <strong>Person:</strong> consistent point of view (don't mix "you" and "one")</p>
    </div>

    <div class="concept-box">
        <h4>📋 Singular Pronoun Agreement (The Tricky Ones)</h4>

        <div class="examples">
            <p><strong>Indefinite Pronouns = Always Singular</strong></p>
            <p><em>Remember these from Chapter 4? They're always singular for pronouns too!</em></p>
            <div style="background: #f0f8ff; padding: 1rem; border-radius: 8px; margin: 0.5rem 0;">
                <p><strong>Each, Every, Either, Neither, Someone, Anyone, Everyone, No one</strong></p>
            </div>

            <p><strong>✅ Correct examples:</strong></p>
            <p>• Each student must bring <strong>his or her</strong> textbook.</p>
            <p>• Everyone should do <strong>his or her</strong> best work.</p>
            <p>• Neither of the boys brought <strong>his</strong> lunch.</p>

            <p><strong>❌ Common mistakes:</strong></p>
            <p>• Each student must bring <strong>their</strong> textbook. (Wrong - "each" is singular!)</p>
            <p>• Everyone should do <strong>their</strong> best work. (Wrong - "everyone" is singular!)</p>
        </div>

        <div class="examples">
            <p><strong>Collective Nouns = Usually Singular</strong></p>
            <p><strong>Common collective nouns:</strong> team, family, group, class, committee, audience</p>

            <p><strong>✅ Correct examples:</strong></p>
            <p>• The team practiced <strong>its</strong> plays all week.</p>
            <p>• The family sold <strong>its</strong> house.</p>
            <p>• The class submitted <strong>its</strong> project.</p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 Plural Pronoun Agreement</h4>

        <div class="examples">
            <p><strong>Compound Subjects with "AND" = Plural</strong></p>
            <p><strong>✅ Correct examples:</strong></p>
            <p>• Sarah and Mike finished <strong>their</strong> homework.</p>
            <p>• The cats and dogs found <strong>their</strong> way home.</p>
        </div>

        <div class="examples">
            <p><strong>Plural Nouns = Plural Pronouns</strong></p>
            <p><strong>✅ Correct examples:</strong></p>
            <p>• The students completed <strong>their</strong> assignments.</p>
            <p>• The books are in <strong>their</strong> proper places.</p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ Pronoun Agreement Danger Zone</h4>

        <div class="examples">
            <p><strong>Trap #1: Don't Be Fooled by Nearby Plural Nouns</strong></p>
            <p><strong>❌ Wrong:</strong> Each of the students completed <strong>their</strong> test.</p>
            <p><strong>✅ Right:</strong> Each of the students completed <strong>his or her</strong> test.</p>
            <p><em>The antecedent is "Each" (singular), not "students"!</em></p>
        </div>

        <div class="examples">
            <p><strong>Trap #2: Gender-Neutral Language</strong></p>
            <p><strong>Formal/ACT Style:</strong> A student should bring <strong>his or her</strong> book.</p>
            <p><strong>Modern Style:</strong> A student should bring <strong>their</strong> book.</p>
            <p><em>On the ACT, "his or her" is usually preferred for singular antecedents.</em></p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Part 4: Pronoun Clarity - Avoiding Confusion</h3>

    <div class="concept-box">
        <h4>💡 The Clarity Principle</h4>
        <p>Every pronoun must have a <strong>clear, unambiguous antecedent</strong>. The reader should never wonder "What does 'it' refer to?"</p>
    </div>

    <div class="concept-box">
        <h4>📋 Common Clarity Problems</h4>

        <div class="examples">
            <p><strong>Problem 1: Ambiguous Reference</strong></p>
            <p><strong>❌ Unclear:</strong> Sarah told her mother that <strong>she</strong> needed to leave.</p>
            <p><em>Who needs to leave? Sarah or her mother?</em></p>

            <p><strong>✅ Clear:</strong> Sarah told her mother that <strong>Sarah</strong> needed to leave.</p>
            <p><strong>✅ Clear:</strong> Sarah told her mother, "<strong>I</strong> need to leave."</p>
        </div>

        <div class="examples">
            <p><strong>Problem 2: Vague "This," "That," "Which"</strong></p>
            <p><strong>❌ Unclear:</strong> The team practiced every day and studied film. <strong>This</strong> helped them win.</p>
            <p><em>What helped? The practicing? The studying? Both?</em></p>

            <p><strong>✅ Clear:</strong> The team practiced every day and studied film. <strong>This combination</strong> helped them win.</p>
            <p><strong>✅ Clear:</strong> The team practiced every day and studied film. <strong>These activities</strong> helped them win.</p>
        </div>

        <div class="examples">
            <p><strong>Problem 3: Missing Antecedent</strong></p>
            <p><strong>❌ Unclear:</strong> In the restaurant, <strong>they</strong> served us quickly.</p>
            <p><em>Who is "they"? There's no plural antecedent!</em></p>

            <p><strong>✅ Clear:</strong> In the restaurant, <strong>the servers</strong> served us quickly.</p>
            <p><strong>✅ Clear:</strong> At the restaurant, <strong>we were</strong> served quickly.</p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The "Point Back" Test</h4>
        <p><strong>For every pronoun, ask:</strong> Can I point back to exactly what it refers to?</p>
        <p><strong>If you can't point to a specific noun → the pronoun needs to be fixed!</strong></p>
    </div>
</div>

<!-- QUIZ_2 -->

<div class="section">
    <h3>Chapter 5 Master Strategy: Your ACT Pronoun Decision Process</h3>
    <div class="concept-box">
        <h4>🎯 When You See Pronouns on the ACT:</h4>

        <p><strong>Step 1: Who vs. Whom Questions</strong></p>
        <p>→ Use the "He/Him" test: replace with "he" or "him"</p>
        <p>→ If "he" sounds right → use "who"</p>
        <p>→ If "him" sounds right → use "whom"</p>

        <p><strong>Step 2: Pronoun Case Questions (I vs. me, we vs. us)</strong></p>
        <p>→ Remove other people from compound subjects/objects</p>
        <p>→ Test the pronoun alone in the sentence</p>
        <p>→ Subject pronouns before verbs, object pronouns after verbs/prepositions</p>

        <p><strong>Step 3: Pronoun Agreement Questions</strong></p>
        <p>→ Find the antecedent (what the pronoun replaces)</p>
        <p>→ Check if it's singular or plural</p>
        <p>→ Remember: indefinite pronouns are usually singular</p>
        <p>→ Match the pronoun to the antecedent's number and gender</p>

        <p><strong>Step 4: Pronoun Clarity Questions</strong></p>
        <p>→ Can you point back to exactly what the pronoun refers to?</p>
        <p>→ Is there any ambiguity about the reference?</p>
        <p>→ When in doubt, replace the pronoun with the specific noun</p>
    </div>
</div>

<div class="section">
    <h3>Common ACT Pronoun Traps (Avoid These!)</h3>

    <div class="concept-box">
        <h4>❌ Trap #1: "Between you and I"</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> Between you and <strong>I</strong>, this test is hard.</p>
            <p><strong>Right:</strong> Between you and <strong>me</strong>, this test is hard.</p>
            <p><em>After prepositions like "between," use object pronouns!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ Trap #2: "Each student... their"</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> Each student should bring <strong>their</strong> calculator.</p>
            <p><strong>Right:</strong> Each student should bring <strong>his or her</strong> calculator.</p>
            <p><em>"Each" is always singular, even when it sounds plural!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ Trap #3: Unclear "This" and "That"</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> I studied hard and got enough sleep. <strong>This</strong> helped me pass.</p>
            <p><strong>Right:</strong> I studied hard and got enough sleep. <strong>This preparation</strong> helped me pass.</p>
            <p><em>Make vague pronouns specific!</em></p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Chapter 5 Success Summary</h3>
    <div class="concept-box">
        <h4>🏆 You've Now Mastered:</h4>
        <p>✓ <strong>Who vs. Whom</strong> → The "He/Him" test that works every time</p>
        <p>✓ <strong>Pronoun Case</strong> → When to use I vs. me, we vs. us, they vs. them</p>
        <p>✓ <strong>Pronoun Agreement</strong> → Making pronouns match their antecedents perfectly</p>
        <p>✓ <strong>Pronoun Clarity</strong> → Avoiding ambiguous and unclear references</p>
        <p>✓ <strong>Common Traps</strong> → The mistakes ACT specifically tests for</p>

        <p><strong>Next:</strong> Chapter 6 will tackle dangling modifiers and misplaced phrases—using your understanding of clear sentence structure from all previous chapters!</p>
    </div>
</div>
    `
  },

  'modifiers': {
    title: 'Chapter 6: Dangling Modifiers',
    duration: 24, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 6: Dangling & Misplaced Modifiers</h2>
    <p class="lesson-intro">Building on your <strong>Chapters 1-5</strong> foundation (clauses, commas, punctuation, verbs, and pronouns), you'll now master <strong>modifier placement</strong>—the grammar concept that creates the funniest wrong answers but unlocks <strong>another 10% of English questions</strong> when you get it right!</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 6 Learning Path: The 3-Part Modifier System</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> The Golden Rule → Why modifiers must sit next to what they describe</p>
        <p><strong>Part 2:</strong> Dangling Modifiers → When descriptions have nothing to attach to</p>
        <p><strong>Part 3:</strong> Misplaced Modifiers → When descriptions attach to the wrong thing</p>
        <p><strong>Your advantage:</strong> You can identify <span >subjects and independent clauses</span> from previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: The Golden Rule (It Never Changes!)</h3>

    <div class="concept-box">
        <h4>💡 The Universal Modifier Principle</h4>
        <p><strong>Modifiers must sit RIGHT NEXT TO the word or phrase they describe.</strong></p>
        <p><em>That's it! This simple rule prevents 90% of modifier errors on the ACT.</em></p>
    </div>

    <div class="concept-box">
        <h4>📋 What Are Modifiers? (The Describing Words and Phrases)</h4>
        <p>Modifiers are words or phrases that give extra information about other words in the sentence.</p>

        <div class="examples">
            <p><strong>Common Modifier Types:</strong></p>
            <p><strong>Adjectives:</strong> The <span >red</span> car drove quickly.</p>
            <p><strong>Adverbs:</strong> She sang <span >beautifully</span>.</p>
            <p><strong>Phrases:</strong> <span >Running late for work</span>, Tom forgot his lunch.</p>
            <p><strong>Clauses:</strong> The book <span >that I borrowed</span> was excellent.</p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 The Proximity Rule in Action</h4>

        <div class="examples">
            <p><strong>✅ Correct Placement:</strong></p>
            <p><strong>Modifier first:</strong> <span >Walking down the street</span>, <span >I</span> noticed the trees looked beautiful.</p>
            <p><em>The modifier "Walking down the street" sits right next to "I" (who was walking).</em></p>

            <p><strong>Modifier last:</strong> <span >I</span> noticed the trees looked beautiful <span >while walking down the street</span>.</p>
            <p><em>The modifier is still close to "I" and clearly describes who was walking.</em></p>
        </div>

        <div class="examples">
            <p><strong>❌ Wrong Placement:</strong></p>
            <p><strong>Confusing:</strong> <span >Walking down the street</span>, <span >the trees</span> looked beautiful.</p>
            <p><em>This literally says the trees were walking down the street! The modifier is next to "trees" instead of the person who was actually walking.</em></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The "Who or What?" Test</h4>
        <p><strong>For every modifier, ask:</strong> "Who or what is actually doing this action or having this description?"</p>
        <p><strong>Then place the modifier right next to that word!</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 2: Dangling Modifiers - The Floating Descriptions</h3>

    <div class="concept-box">
        <h4>💡 What Makes a Modifier "Dangle"</h4>
        <p>A dangling modifier occurs when the word or phrase it's supposed to modify <strong>isn't actually in the sentence</strong>. The modifier is "dangling" with nothing to attach to!</p>
    </div>

    <div class="concept-box">
        <h4>📋 Classic Dangling Modifier Patterns</h4>

        <div class="examples">
            <p><strong>Pattern 1: Action Phrases with No Actor</strong></p>
            <p><strong>❌ Dangling:</strong> <span >Having finished homework</span>, the TV was turned on.</p>
            <p><em>Problem: Who finished homework? The TV didn't finish homework!</em></p>

            <p><strong>✅ Fixed:</strong> <span >Having finished homework</span>, <span >Sarah</span> turned on the TV.</p>
            <p><em>Now "Sarah" is right next to the modifier, so we know she finished the homework.</em></p>

            <p><strong>✅ Also fixed:</strong> <span >After Sarah finished homework</span>, she turned on the TV.</p>
            <p><em>Alternative: Make the modifier a complete clause with its own subject.</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 2: "-ing" Phrases Without Clear Subjects</strong></p>
            <p><strong>❌ Dangling:</strong> <span >Running to catch the bus</span>, my backpack fell off.</p>
            <p><em>Problem: The backpack wasn't running—I was running!</em></p>

            <p><strong>✅ Fixed:</strong> <span >Running to catch the bus</span>, <span >I</span> dropped my backpack.</p>
            <p><em>Now "I" is the subject doing the running.</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 3: "To" Phrases (Infinitives) with Missing Subjects</strong></p>
            <p><strong>❌ Dangling:</strong> <span >To get better grades</span>, more studying is necessary.</p>
            <p><em>Problem: Who wants better grades? "More studying" doesn't want grades!</em></p>

            <p><strong>✅ Fixed:</strong> <span >To get better grades</span>, <span >students</span> must study more.</p>
            <p><em>Now "students" are the ones who want better grades.</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 4: Past Participle Phrases (-ed phrases)</strong></p>
            <p><strong>❌ Dangling:</strong> <span >Born in 1990</span>, the new millennium was exciting for me.</p>
            <p><em>Problem: The millennium wasn't born in 1990—I was!</em></p>

            <p><strong>✅ Fixed:</strong> <span >Born in 1990</span>, <span >I</span> found the new millennium exciting.</p>
            <p><em>Now "I" is the one who was born in 1990.</em></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The Dangling Modifier Fix Formula</h4>
        <p><strong>Step 1:</strong> Identify what the modifier describes (who's doing the action?)</p>
        <p><strong>Step 2:</strong> Make sure that word appears right after the comma</p>
        <p><strong>Step 3:</strong> If it's not there, add it or rewrite the sentence</p>
    </div>
</div>

<div class="section">
    <h3>Part 3: Misplaced Modifiers - The Wrong Attachments</h3>

    <div class="concept-box">
        <h4>💡 What Makes a Modifier "Misplaced"</h4>
        <p>A misplaced modifier occurs when the modifier <strong>is in the sentence</strong> but sits next to the wrong word, creating confusion or unintended humor.</p>
    </div>

    <div class="concept-box">
        <h4>📋 Common Misplaced Modifier Patterns</h4>

        <div class="examples">
            <p><strong>Pattern 1: "Almost," "Only," "Just" in Wrong Positions</strong></p>
            <p><strong>❌ Confusing:</strong> She <span >almost</span> drove her kids to school every day.</p>
            <p><em>Problem: Did she "almost drive" (but didn't) or drive "almost every day"?</em></p>

            <p><strong>✅ Clear:</strong> She drove her kids to school <span >almost</span> every day.</p>
            <p><em>Now it's clear she drove them on most days, but not quite every day.</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 2: Descriptive Phrases in Wrong Locations</strong></p>
            <p><strong>❌ Confusing:</strong> The car belongs to a woman <span >with a dented fender</span>.</p>
            <p><em>Problem: Does the woman have a dented fender, or does the car?</em></p>

            <p><strong>✅ Clear:</strong> The car <span >with a dented fender</span> belongs to a woman.</p>
            <p><em>Now it's clear the car has the dented fender.</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 3: Relative Clauses (who, which, that) Far from Antecedents</strong></p>
            <p><strong>❌ Confusing:</strong> I saw a dog in the park <span >that was barking loudly</span>.</p>
            <p><em>Problem: Was the park barking loudly, or the dog?</em></p>

            <p><strong>✅ Clear:</strong> I saw a dog <span >that was barking loudly</span> in the park.</p>
            <p><em>Now it's clear the dog was barking loudly.</em></p>

            <p><strong>✅ Also clear:</strong> In the park, I saw a dog <span >that was barking loudly</span>.</p>
        </div>

        <div class="examples">
            <p><strong>Pattern 4: Prepositional Phrases Creating Ambiguity</strong></p>
            <p><strong>❌ Confusing:</strong> The teacher spoke to the student <span >with concern</span>.</p>
            <p><em>Problem: Is the teacher concerned, or is the student concerned?</em></p>

            <p><strong>✅ Clear:</strong> <span >With concern</span>, the teacher spoke to the student.</p>
            <p><em>Now it's clear the teacher was concerned.</em></p>

            <p><strong>✅ Also clear:</strong> The teacher spoke to the student who seemed concerned.</p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The Misplaced Modifier Fix Strategy</h4>
        <p><strong>Step 1:</strong> Find the modifier and ask "What exactly is it describing?"</p>
        <p><strong>Step 2:</strong> Move the modifier so it sits next to that word</p>
        <p><strong>Step 3:</strong> Read the sentence again to make sure it's clear</p>
        <p><strong>Step 4:</strong> If moving doesn't work, rewrite for clarity</p>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Special Cases: Tricky Modifier Situations on the ACT</h3>

    <div class="concept-box">
        <h4>📋 Absolute Constructions (Advanced)</h4>
        <p>Some modifying phrases are "absolute"—they modify the entire sentence rather than one specific word.</p>

        <div class="examples">
            <p><strong>Acceptable Absolute Constructions:</strong></p>
            <p><strong>✅ Correct:</strong> <span >Weather permitting</span>, we'll have the picnic tomorrow.</p>
            <p><strong>✅ Correct:</strong> <span >Generally speaking</span>, students enjoy summer break.</p>
            <p><strong>✅ Correct:</strong> <span >All things considered</span>, the project was a success.</p>
            <p><em>These phrases modify the entire situation, not a specific noun.</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 Squinting Modifiers (The Two-Way Confusers)</h4>
        <p>Sometimes a modifier sits between two words and could logically modify either one.</p>

        <div class="examples">
            <p><strong>Squinting Modifier Problems:</strong></p>
            <p><strong>❌ Ambiguous:</strong> Students who study <span >frequently</span> get better grades.</p>
            <p><em>Problem: Do students "study frequently" or "frequently get better grades"?</em></p>

            <p><strong>✅ Clear Option 1:</strong> Students who <span >frequently</span> study get better grades.</p>
            <p><strong>✅ Clear Option 2:</strong> Students who study get better grades <span >frequently</span>.</p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Chapter 6 Master Strategy: Your ACT Modifier Decision Process</h3>
    <div class="concept-box">
        <h4>🎯 When You See Modifier Questions on the ACT:</h4>

        <p><strong>Step 1: Find the modifier</strong></p>
        <p>→ Look for descriptive phrases, especially at the beginning of sentences</p>
        <p>→ Common starters: -ing phrases, -ed phrases, "to" phrases, prepositional phrases</p>

        <p><strong>Step 2: Ask "What does it describe?"</strong></p>
        <p>→ Who is doing the action in the modifier?</p>
        <p>→ What is being described by the modifier?</p>

        <p><strong>Step 3: Check placement</strong></p>
        <p>→ Is the modifier right next to what it describes?</p>
        <p>→ If not, it's either dangling or misplaced</p>

        <p><strong>Step 4: Apply the fix</strong></p>
        <p>→ For dangling: Add the missing word or rewrite</p>
        <p>→ For misplaced: Move the modifier to the correct position</p>
        <p>→ For squinting: Clarify which word is being modified</p>

        <p><strong>Step 5: Do the logic test</strong></p>
        <p>→ Read the corrected sentence</p>
        <p>→ Does it make logical sense?</p>
        <p>→ Is there any remaining ambiguity?</p>
    </div>
</div>

<div class="section">
    <h3>Common ACT Modifier Traps (Avoid These!)</h3>

    <div class="concept-box">
        <h4>❌ Trap #1: Passive Voice Creates Dangling Modifiers</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> After studying all night, the test was failed.</p>
            <p><strong>Right:</strong> After studying all night, I failed the test.</p>
            <p><em>Passive voice often removes the actual subject, creating danglers!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ Trap #2: "Only" in the Wrong Spot</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> I only ate pizza yesterday. (I did nothing but eat?)</p>
            <p><strong>Right:</strong> I ate only pizza yesterday. (Pizza was the only food)</p>
            <p><em>"Only" should go right before what it limits!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ Trap #3: Long Sentences with Multiple Modifiers</h4>
        <div class="examples">
            <p><strong>Confusing:</strong> Walking quickly down the street in her new shoes, the store Sarah wanted to visit was just ahead.</p>
            <p><strong>Clear:</strong> Walking quickly down the street in her new shoes, Sarah could see the store she wanted to visit just ahead.</p>
            <p><em>Make sure each modifier has a clear target!</em></p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Chapter 6 Success Summary</h3>
    <div class="concept-box">
        <h4>🏆 You've Now Mastered:</h4>
        <p>✓ <strong>The Golden Rule</strong> → Modifiers must sit next to what they describe</p>
        <p>✓ <strong>Dangling Modifiers</strong> → Fixing descriptions that have nothing to attach to</p>
        <p>✓ <strong>Misplaced Modifiers</strong> → Moving descriptions to the right location</p>
        <p>✓ <strong>Special Cases</strong> → Absolute constructions and squinting modifiers</p>
        <p>✓ <strong>ACT Strategy</strong> → A systematic approach to modifier questions</p>

        <p><strong>Next:</strong> Chapter 7 will tackle parallel structure in lists and comparisons—using your sentence clarity skills to make everything flow perfectly!</p>
    </div>
</div>
    `
  },

  'parallel-structure': {
    title: 'Chapter 7: Parallel Structure',
    duration: 22, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 7: Parallel Structure Mastery</h2>
    <p class="lesson-intro">Building on your <strong>Chapters 1-6</strong> foundation, you'll now master <strong>parallel structure</strong>—the grammar concept that makes sentences flow beautifully and unlocks <strong>another 10% of English questions</strong>. Think of it as the "rhythm and balance" rule that makes writing sound professional!</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 7 Learning Path: The 3-Part Parallel System</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> The Universal Rule → Why parallel items must match in form</p>
        <p><strong>Part 2:</strong> List Parallelism → Making series of 3+ items flow perfectly</p>
        <p><strong>Part 3:</strong> Comparison Parallelism → Balancing "better than," "rather than," etc.</p>
        <p><strong>Your advantage:</strong> You understand <span >sentence structure</span> from all previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: The Universal Parallel Rule (It Never Changes!)</h3>

    <div class="concept-box">
        <h4>💡 The Core Principle of Parallelism</h4>
        <p><strong>When you have a series of items (in lists or comparisons), each item must have the SAME grammatical form.</strong></p>
        <p><em>It's like music—all the notes in a chord must harmonize, or it sounds wrong!</em></p>
    </div>

    <div class="concept-box">
        <h4>📋 Why Parallelism Matters (The Psychology Behind It)</h4>
        <p>Our brains expect patterns. When items don't match, it creates mental friction and makes writing sound unprofessional.</p>

        <div class="examples">
            <p><strong>❌ Non-parallel (Sounds Off):</strong></p>
            <p>I like <span >swimming</span>, <span >to run</span>, and <span >biking</span>.</p>
            <p><em>Problem: swimming (-ing), to run (infinitive), biking (-ing) - the pattern is broken!</em></p>
        </div>

        <div class="examples">
            <p><strong>✅ Parallel (Sounds Right):</strong></p>
            <p>I like <span >swimming</span>, <span >running</span>, and <span >biking</span>.</p>
            <p><em>Perfect: All three are -ing words (gerunds) - smooth, balanced, professional!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 The Most Common Parallel Forms</h4>

        <div class="examples">
            <p><strong>Option 1: All Gerunds (-ing words)</strong></p>
            <p>✅ <strong>Sarah enjoys</strong> <span >reading</span>, <span >writing</span>, and <span >studying</span>.</p>
        </div>

        <div class="examples">
            <p><strong>Option 2: All Infinitives (to + verb)</strong></p>
            <p>✅ <strong>Sarah wants</strong> <span >to read</span>, <span >to write</span>, and <span >to study</span>.</p>
            <p>✅ <strong>Sarah wants</strong> <span >to read</span>, <span >write</span>, and <span >study</span>.</p>
            <p><em>Note: You can drop extra "to"s after the first one!</em></p>
        </div>

        <div class="examples">
            <p><strong>Option 3: All Simple Verbs</strong></p>
            <p>✅ <strong>Sarah will</strong> <span >read</span>, <span >write</span>, and <span >study</span> tonight.</p>
        </div>

        <div class="examples">
            <p><strong>Option 4: All Adjectives</strong></p>
            <p>✅ <strong>The movie was</strong> <span >funny</span>, <span >exciting</span>, and <span >memorable</span>.</p>
        </div>

        <div class="examples">
            <p><strong>Option 5: All Nouns</strong></p>
            <p>✅ <strong>I packed</strong> <span >books</span>, <span >clothes</span>, and <span >snacks</span>.</p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The "Sound Test" for Parallelism</h4>
        <p><strong>Read your list out loud.</strong> If it sounds choppy or awkward, you probably have a parallel structure error!</p>
        <p><strong>Good parallelism sounds like a smooth rhythm.</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 2: List Parallelism - Making Series Flow</h3>

    <div class="concept-box">
        <h4>💡 When Lists Need Parallelism</h4>
        <p>Any time you have <strong>3 or more items in a series</strong> (connected by commas and "and"), they must all have the same grammatical form.</p>
    </div>

    <div class="concept-box">
        <h4>📋 The 5 Most Common List Parallel Patterns</h4>

        <div class="examples">
            <p><strong>Pattern 1: Verb + -ing Lists</strong></p>
            <p><strong>❌ Wrong:</strong> She enjoys <span >swimming</span>, <span >to dance</span>, and <span >reading books</span>.</p>
            <p><strong>✅ Right:</strong> She enjoys <span >swimming</span>, <span >dancing</span>, and <span >reading</span>.</p>
            <p><em>All gerunds (-ing words) that work as nouns after "enjoys."</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 2: Descriptive Adjective Lists</strong></p>
            <p><strong>❌ Wrong:</strong> The house was <span >large</span>, <span >having beauty</span>, and <span >expensive</span>.</p>
            <p><strong>✅ Right:</strong> The house was <span >large</span>, <span >beautiful</span>, and <span >expensive</span>.</p>
            <p><em>All single adjectives that describe "house."</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 3: Action Verb Lists</strong></p>
            <p><strong>❌ Wrong:</strong> Every morning, I <span >wake up</span>, <span >brushing my teeth</span>, and <span >eat breakfast</span>.</p>
            <p><strong>✅ Right:</strong> Every morning, I <span >wake up</span>, <span >brush my teeth</span>, and <span >eat breakfast</span>.</p>
            <p><em>All simple present tense verbs in a sequence.</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 4: Noun Lists</strong></p>
            <p><strong>❌ Wrong:</strong> For the trip, bring <span >clothes</span>, <span >something to eat</span>, and <span >money</span>.</p>
            <p><strong>✅ Right:</strong> For the trip, bring <span >clothes</span>, <span >food</span>, and <span >money</span>.</p>
            <p><em>All simple nouns (things you can bring).</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 5: Prepositional Phrase Lists</strong></p>
            <p><strong>❌ Wrong:</strong> I looked <span >under the bed</span>, <span >in the closet</span>, and <span >checked the garage</span>.</p>
            <p><strong>✅ Right:</strong> I looked <span >under the bed</span>, <span >in the closet</span>, and <span >in the garage</span>.</p>
            <p><em>All prepositional phrases (places where I looked).</em></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The "Plug-In" Test for Lists</h4>
        <p><strong>Step 1:</strong> Take the part before the list (like "I enjoy...")</p>
        <p><strong>Step 2:</strong> Plug in each item individually</p>
        <p><strong>Step 3:</strong> If they all work grammatically → you have parallelism!</p>
        <p><strong>Example:</strong> "I enjoy swimming" ✓ "I enjoy dancing" ✓ "I enjoy reading" ✓</p>
    </div>
</div>

<div class="section">
    <h3>Part 3: Comparison Parallelism - Balancing Both Sides</h3>

    <div class="concept-box">
        <h4>💡 What Makes Comparisons Parallel</h4>
        <p>When you compare two things using words like "better than," "rather than," "as...as," both sides of the comparison must have <strong>the same grammatical form</strong>.</p>
    </div>

    <div class="concept-box">
        <h4>📋 The 6 Major Comparison Patterns</h4>

        <div class="examples">
            <p><strong>Pattern 1: "Better than" Comparisons</strong></p>
            <p><strong>❌ Wrong:</strong> <span >Reading books</span> is better than <span >to watch TV</span>.</p>
            <p><strong>✅ Right:</strong> <span >Reading books</span> is better than <span >watching TV</span>.</p>
            <p><em>Both sides are gerunds (-ing words used as nouns).</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 2: "Rather than" Comparisons</strong></p>
            <p><strong>❌ Wrong:</strong> I prefer <span >to study</span> rather than <span >going out</span>.</p>
            <p><strong>✅ Right:</strong> I prefer <span >to study</span> rather than <span >to go out</span>.</p>
            <p><strong>✅ Also right:</strong> I prefer <span >studying</span> rather than <span >going out</span>.</p>
        </div>

        <div class="examples">
            <p><strong>Pattern 3: "As...as" Comparisons</strong></p>
            <p><strong>❌ Wrong:</strong> She is as <span >smart</span> as <span >having beauty</span>.</p>
            <p><strong>✅ Right:</strong> She is as <span >smart</span> as <span >beautiful</span>.</p>
            <p><em>Both sides are adjectives.</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 4: "Prefer...to" Comparisons</strong></p>
            <p><strong>❌ Wrong:</strong> I prefer <span >coffee</span> to <span >drinking tea</span>.</p>
            <p><strong>✅ Right:</strong> I prefer <span >coffee</span> to <span >tea</span>.</p>
            <p><strong>✅ Also right:</strong> I prefer <span >drinking coffee</span> to <span >drinking tea</span>.</p>
        </div>

        <div class="examples">
            <p><strong>Pattern 5: "Not only...but also" Comparisons</strong></p>
            <p><strong>❌ Wrong:</strong> She is not only <span >intelligent</span> but also <span >has kindness</span>.</p>
            <p><strong>✅ Right:</strong> She is not only <span >intelligent</span> but also <span >kind</span>.</p>
            <p><em>Both sides are adjectives that follow "is."</em></p>
        </div>

        <div class="examples">
            <p><strong>Pattern 6: "Either...or" / "Neither...nor"</strong></p>
            <p><strong>❌ Wrong:</strong> You can either <span >walk</span> or <span >taking the bus</span>.</p>
            <p><strong>✅ Right:</strong> You can either <span >walk</span> or <span >take the bus</span>.</p>
            <p><em>Both sides are simple verb forms after "can."</em></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The "Cover Up" Test for Comparisons</h4>
        <p><strong>Step 1:</strong> Cover up one side of the comparison</p>
        <p><strong>Step 2:</strong> See what grammatical form is needed</p>
        <p><strong>Step 3:</strong> Make sure the other side matches that form</p>
        <p><strong>Example:</strong> "Reading is better than ___" → needs another -ing word → "watching"</p>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Advanced Parallelism: Tricky ACT Situations</h3>

    <div class="concept-box">
        <h4>📋 Complex Parallel Lists (Multiple Word Phrases)</h4>
        <p>Sometimes list items are longer phrases, but they still need parallel structure.</p>

        <div class="examples">
            <p><strong>Parallel Phrase Examples:</strong></p>
            <p><strong>✅ Correct:</strong> The job requires <span >analyzing data</span>, <span >writing reports</span>, and <span >presenting findings</span>.</p>
            <p><em>All are gerund phrases (action + object).</em></p>

            <p><strong>✅ Correct:</strong> To succeed, you must <span >study hard</span>, <span >attend class</span>, and <span >ask questions</span>.</p>
            <p><em>All are verb + adverb/object phrases.</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 Parallel Clauses (Full Sentence Parts)</h4>
        <p>Even when list items are complete clauses, they need parallel structure.</p>

        <div class="examples">
            <p><strong>Parallel Clause Examples:</strong></p>
            <p><strong>❌ Wrong:</strong> I know <span >that she is smart</span>, <span >she works hard</span>, and <span >that she will succeed</span>.</p>
            <p><strong>✅ Right:</strong> I know <span >that she is smart</span>, <span >that she works hard</span>, and <span >that she will succeed</span>.</p>
            <p><em>All clauses start with "that."</em></p>

            <p><strong>✅ Also right:</strong> I know <span >she is smart</span>, <span >she works hard</span>, and <span >she will succeed</span>.</p>
            <p><em>No "that" in any clause—also parallel!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 Correlative Conjunctions (Special Pairs)</h4>
        <p>These word pairs create comparisons that need perfect parallelism:</p>
        <div style="background: #f0f8ff; padding: 1rem; border-radius: 8px; margin: 0.5rem 0;">
            <p><strong>either...or • neither...nor • not only...but also • both...and</strong></p>
        </div>

        <div class="examples">
            <p><strong>Perfect Correlative Parallelism:</strong></p>
            <p><strong>✅ Correct:</strong> She is <strong>both</strong> <span >intelligent</span> <strong>and</strong> <span >hardworking</span>.</p>
            <p><strong>✅ Correct:</strong> You can <strong>either</strong> <span >email me</span> <strong>or</strong> <span >call me</span>.</p>
            <p><strong>✅ Correct:</strong> He is <strong>not only</strong> <span >smart</span> <strong>but also</strong> <span >funny</span>.</p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Chapter 7 Master Strategy: Your ACT Parallelism Decision Process</h3>
    <div class="concept-box">
        <h4>🎯 When You See Parallel Structure Questions on the ACT:</h4>

        <p><strong>Step 1: Find the list or comparison</strong></p>
        <p>→ Look for commas with "and" (lists) or comparison words (better than, rather than, etc.)</p>
        <p>→ Look for correlative conjunctions (either...or, not only...but also)</p>

        <p><strong>Step 2: Identify what each item should be</strong></p>
        <p>→ What comes after the main verb? (gerunds, infinitives, simple verbs?)</p>
        <p>→ What fits grammatically with the beginning of the sentence?</p>

        <p><strong>Step 3: Check if all items match</strong></p>
        <p>→ Use the "plug-in test" for lists</p>
        <p>→ Use the "cover up test" for comparisons</p>
        <p>→ All items must be the same grammatical type</p>

        <p><strong>Step 4: Fix any mismatches</strong></p>
        <p>→ Change the odd item to match the others</p>
        <p>→ Or change all items to a consistent form</p>
        <p>→ Choose the option that sounds most natural</p>

        <p><strong>Step 5: Double-check with the sound test</strong></p>
        <p>→ Read the corrected sentence aloud</p>
        <p>→ Does it have a smooth rhythm?</p>
        <p>→ Does it sound professional and clear?</p>
    </div>
</div>

<div class="section">
    <h3>Common ACT Parallelism Traps (Avoid These!)</h3>

    <div class="concept-box">
        <h4>❌ Trap #1: Mixing Gerunds and Infinitives</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> I enjoy swimming, running, and to bike.</p>
            <p><strong>Right:</strong> I enjoy swimming, running, and biking.</p>
            <p><em>Stick with one form throughout the list!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ Trap #2: Inconsistent "That" Usage</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> I know that she's smart, she works hard, and that she'll succeed.</p>
            <p><strong>Right:</strong> I know that she's smart, that she works hard, and that she'll succeed.</p>
            <p><em>Either use "that" for all clauses or none!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>❌ Trap #3: Correlative Conjunction Misalignment</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> She not only is smart but also kind.</p>
            <p><strong>Right:</strong> She is not only smart but also kind.</p>
            <p><em>What follows "not only" must match what follows "but also"!</em></p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Chapter 7 Success Summary</h3>
    <div class="concept-box">
        <h4>🏆 You've Now Mastered:</h4>
        <p>✓ <strong>The Universal Rule</strong> → All items in series must have the same grammatical form</p>
        <p>✓ <strong>List Parallelism</strong> → Making 3+ items flow smoothly in series</p>
        <p>✓ <strong>Comparison Parallelism</strong> → Balancing both sides of comparisons perfectly</p>
        <p>✓ <strong>Advanced Patterns</strong> → Complex phrases, clauses, and correlative conjunctions</p>
        <p>✓ <strong>ACT Strategy</strong> → Systematic approach to parallel structure questions</p>

        <p><strong>Next:</strong> Chapter 8 will tackle commonly confused words and usage—building on your grammatical foundation to master the trickiest word choice questions!</p>
    </div>
</div>
    `
  },

  'misc-topics': {
    title: 'Chapter 8: Word Choice & Usage',
    duration: 26, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 8: Word Choice & Usage Mastery</h2>
    <p class="lesson-intro">Building on your <strong>Chapters 1-7</strong> grammar foundation, you'll now master <strong>word choice and usage</strong>—the final piece that unlocks <strong>the remaining 10% of English questions</strong>. This includes confused words, voice, and idioms that trip up most students!</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 8 Learning Path: The 4-Part Usage System</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> Confused Word Pairs → The most tested homophones and near-homophones</p>
        <p><strong>Part 2:</strong> Active vs. Passive Voice → When to choose which voice for clarity</p>
        <p><strong>Part 3:</strong> Prepositional Idioms → Fixed phrases that sound right to native speakers</p>
        <p><strong>Part 4:</strong> Precision in Word Choice → Selecting the exact right word</p>
        <p><strong>Your advantage:</strong> You have <span >perfect grammar fundamentals</span> from all previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: Confused Word Pairs - The High-Frequency Traps</h3>

    <div class="concept-box">
        <h4>💡 Why These Words Trip Everyone Up</h4>
        <p>These words <strong>sound similar or identical</strong> but have different meanings. The ACT tests them because they're the most common writing mistakes in college-level work.</p>
    </div>

    <div class="concept-box">
        <h4>📋 The Top 12 Most Tested Word Pairs</h4>

        <div class="examples">
            <p><strong>Tier 1: The Absolute Must-Knows</strong></p>

            <p><strong>Their vs. There vs. They're</strong></p>
            <p>• <span >Their</span> = possession (belonging to them)</p>
            <p>→ <em>Their car is parked outside.</em></p>
            <p>• <span >There</span> = place or existence</p>
            <p>→ <em>The book is over there.</em> / <em>There are five people waiting.</em></p>
            <p>• <span >They're</span> = they are (contraction)</p>
            <p>→ <em>They're coming to the party tonight.</em></p>
        </div>

        <div class="examples">
            <p><strong>Its vs. It's</strong></p>
            <p>• <span >Its</span> = possession (belonging to it, NO apostrophe!)</p>
            <p>→ <em>The dog wagged its tail.</em></p>
            <p>• <span >It's</span> = it is OR it has (contraction)</p>
            <p>→ <em>It's raining outside.</em> / <em>It's been a long day.</em></p>
            <p><strong>Memory trick:</strong> If you can replace it with "it is," use "it's"!</p>
        </div>

        <div class="examples">
            <p><strong>Your vs. You're</strong></p>
            <p>• <span >Your</span> = possession (belonging to you)</p>
            <p>→ <em>Your homework is excellent.</em></p>
            <p>• <span >You're</span> = you are (contraction)</p>
            <p>→ <em>You're going to do well on the ACT.</em></p>
        </div>

        <div class="examples">
            <p><strong>Tier 2: The Tricky Ones</strong></p>

            <p><strong>Effect vs. Affect</strong></p>
            <p>• <span >Effect</span> = noun (a result, a thing)</p>
            <p>→ <em>The effect of the rain was flooding.</em></p>
            <p>• <span >Affect</span> = verb (to influence, to change)</p>
            <p>→ <em>The rain will affect our picnic plans.</em></p>
            <p><strong>Memory trick:</strong> <em>A</em>ffect = <em>A</em>ction (verb), <em>E</em>ffect = <em>E</em>nd result (noun)</p>
        </div>

        <div class="examples">
            <p><strong>Accept vs. Except</strong></p>
            <p>• <span >Accept</span> = verb (to receive, to agree to)</p>
            <p>→ <em>I accept your apology.</em></p>
            <p>• <span >Except</span> = preposition (excluding, but not)</p>
            <p>→ <em>Everyone came except Sarah.</em></p>
        </div>

        <div class="examples">
            <p><strong>Than vs. Then</strong></p>
            <p>• <span >Than</span> = comparison word</p>
            <p>→ <em>Math is harder than English.</em></p>
            <p>• <span >Then</span> = time word (next, at that time)</p>
            <p>→ <em>First we studied, then we took the test.</em></p>
        </div>

        <div class="examples">
            <p><strong>Tier 3: The Advanced Traps</strong></p>

            <p><strong>Who vs. Which vs. That</strong></p>
            <p>• <span >Who</span> = for people only</p>
            <p>→ <em>The student who studied hard passed.</em></p>
            <p>• <span >Which</span> = for things, usually with commas (non-essential info)</p>
            <p>→ <em>The book, which is on the table, belongs to me.</em></p>
            <p>• <span >That</span> = for things, no commas (essential info)</p>
            <p>→ <em>The book that you borrowed is overdue.</em></p>
        </div>

        <div class="examples">
            <p><strong>Less vs. Fewer</strong></p>
            <p>• <span >Less</span> = for uncountable things (amount)</p>
            <p>→ <em>I have less time than you.</em> (You can't count individual "times")</p>
            <p>• <span >Fewer</span> = for countable things (number)</p>
            <p>→ <em>I have fewer books than you.</em> (You can count individual books)</p>
        </div>

        <div class="examples">
            <p><strong>Between vs. Among</strong></p>
            <p>• <span >Between</span> = for 2 things or clear individual relationships</p>
            <p>→ <em>The secret is between you and me.</em></p>
            <p>• <span >Among</span> = for 3+ things or groups</p>
            <p>→ <em>The rumor spread among the students.</em></p>
        </div>

        <div class="examples">
            <p><strong>Lay vs. Lie</strong></p>
            <p>• <span >Lay</span> = to put something down (needs an object)</p>
            <p>→ <em>I will lay the book on the table.</em></p>
            <p>• <span >Lie</span> = to recline (no object needed)</p>
            <p>→ <em>I need to lie down and rest.</em></p>
            <p><strong>Memory trick:</strong> You <em>lay</em> something down, you <em>lie</em> yourself down</p>
        </div>

        <div class="examples">
            <p><strong>Farther vs. Further</strong></p>
            <p>• <span >Farther</span> = physical distance</p>
            <p>→ <em>The store is farther than I thought.</em></p>
            <p>• <span >Further</span> = metaphorical distance, degree, or additional</p>
            <p>→ <em>We need to discuss this further.</em></p>
        </div>

        <div class="examples">
            <p><strong>Good vs. Well</strong></p>
            <p>• <span >Good</span> = adjective (describes nouns)</p>
            <p>→ <em>That's a good book.</em> / <em>I feel good.</em> (describing yourself)</p>
            <p>• <span >Well</span> = adverb (describes verbs) or health adjective</p>
            <p>→ <em>She sings well.</em> / <em>I feel well.</em> (describing your health)</p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The Substitution Test for Confused Words</h4>
        <p><strong>Step 1:</strong> Try substituting the definition into the sentence</p>
        <p><strong>Step 2:</strong> If the sentence still makes sense, you chose right!</p>
        <p><strong>Example:</strong> "Their going to the store" → "Belonging to them going to the store" ❌</p>
        <p><strong>Try again:</strong> "They're going to the store" → "They are going to the store" ✅</p>
    </div>
</div>

<div class="section">
    <h3>Part 2: Active vs. Passive Voice - The Clarity Choice</h3>

    <div class="concept-box">
        <h4>💡 Why Voice Matters on the ACT</h4>
        <p>The ACT strongly prefers <span >active voice</span> because it's more <strong>direct, clear, and concise</strong>. Passive voice often sounds wordy and unclear about who's doing what.</p>
    </div>

    <div class="concept-box">
        <h4>📋 Understanding the Two Voices</h4>

        <div class="examples">
            <p><strong>Active Voice: Subject Does the Action</strong></p>
            <p><strong>Pattern:</strong> [Subject] [Action Verb] [Object]</p>
            <p><strong>✅ Examples:</strong></p>
            <p>• <span >Sarah</span> <strong>threw</strong> <span >the ball</span>.</p>
            <p>• <span >The students</span> <strong>completed</strong> <span >their homework</span>.</p>
            <p>• <span >The teacher</span> <strong>explained</strong> <span >the concept</span> clearly.</p>
            <p><em>Clear, direct, and we know exactly who did what!</em></p>
        </div>

        <div class="examples">
            <p><strong>Passive Voice: Subject Receives the Action</strong></p>
            <p><strong>Pattern:</strong> [Subject] [form of "be"] [past participle] [by someone]</p>
            <p><strong>❌ Examples (wordier, less clear):</strong></p>
            <p>• <span >The ball</span> <strong>was thrown</strong> by Sarah.</p>
            <p>• <span >The homework</span> <strong>was completed</strong> by the students.</p>
            <p>• <span >The concept</span> <strong>was explained</strong> clearly by the teacher.</p>
            <p><em>Wordy, indirect, and sometimes unclear about who's responsible!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 How to Convert Passive to Active</h4>

        <div class="examples">
            <p><strong>The 3-Step Conversion Process:</strong></p>
            <p><strong>Step 1:</strong> Find who's doing the action (often after "by")</p>
            <p><strong>Step 2:</strong> Make that person/thing the subject</p>
            <p><strong>Step 3:</strong> Change the verb to active form</p>

            <p><strong>Example conversion:</strong></p>
            <p><span >❌ Passive:</span> "Mistakes were made by the committee during the planning process."</p>
            <p><span >✅ Active:</span> "The committee made mistakes during the planning process."</p>
            <p><em>Much clearer and more direct!</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>📋 When Passive Voice IS Acceptable</h4>
        <p>Sometimes passive voice is actually the better choice:</p>

        <div class="examples">
            <p><strong>Acceptable Passive Situations:</strong></p>
            <p><strong>1. Unknown actor:</strong> "The window was broken during the storm."</p>
            <p><em>We don't know who/what broke it, so passive works.</em></p>

            <p><strong>2. Unimportant actor:</strong> "The vaccines were developed in 2020."</p>
            <p><em>We care about the vaccines, not specifically who developed them.</em></p>

            <p><strong>3. Scientific/formal writing:</strong> "The samples were analyzed using advanced techniques."</p>
            <p><em>Scientific writing often uses passive voice by convention.</em></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The "By Zombie" Test</h4>
        <p><strong>If you can add "by zombies" after the verb and it makes sense, it's passive!</strong></p>
        <p><strong>Example:</strong> "The car was driven (by zombies)" ← Passive!</p>
        <p><strong>Example:</strong> "Sarah drove the car (by zombies)" ← Doesn't work, so it's active!</p>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Part 3: Prepositional Idioms - The "Sounds Right" Rules</h3>

    <div class="concept-box">
        <h4>💡 What Are Prepositional Idioms?</h4>
        <p>These are <strong>fixed phrases</strong> where certain verbs or adjectives must be paired with specific prepositions. There's no logical reason—they just "sound right" to native speakers!</p>
    </div>

    <div class="concept-box">
        <h4>📋 High-Frequency ACT Prepositional Idioms</h4>

        <div class="examples">
            <p><strong>Verb + Preposition Combinations:</strong></p>
            <p>• <strong>agree with</strong> (a person) / <strong>agree to</strong> (a plan)</p>
            <p>→ <em>I agree with Sarah.</em> / <em>I agree to the proposal.</em></p>

            <p>• <strong>differ from</strong> (not "differ than")</p>
            <p>→ <em>This book differs from that one.</em></p>

            <p>• <strong>independent from</strong> OR <strong>independent of</strong></p>
            <p>→ <em>She is independent of her parents' financial support.</em></p>

            <p>• <strong>responsible for</strong> (not "responsible of")</p>
            <p>→ <em>He is responsible for the mess.</em></p>

            <p>• <strong>comply with</strong> (not "comply to")</p>
            <p>→ <em>Students must comply with school rules.</em></p>
        </div>

        <div class="examples">
            <p><strong>Adjective + Preposition Combinations:</strong></p>
            <p>• <strong>different from</strong> (not "different than")</p>
            <p>→ <em>This test is different from the practice test.</em></p>

            <p>• <strong>similar to</strong> (not "similar with")</p>
            <p>→ <em>Your essay is similar to mine.</em></p>

            <p>• <strong>superior to</strong> / <strong>inferior to</strong></p>
            <p>→ <em>This product is superior to the competitor's version.</em></p>

            <p>• <strong>capable of</strong> (not "capable to")</p>
            <p>→ <em>She is capable of great things.</em></p>
        </div>

        <div class="examples">
            <p><strong>Comparison Idioms:</strong></p>
            <p>• <strong>as...as</strong> (for equal comparisons)</p>
            <p>→ <em>She is as smart as her brother.</em></p>

            <p>• <strong>so...as</strong> (only in negative comparisons)</p>
            <p>→ <em>He is not so tall as his father.</em></p>

            <p>• <strong>more...than</strong> / <strong>less...than</strong></p>
            <p>→ <em>This book is more interesting than that one.</em></p>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 The Native Speaker Test</h4>
        <p><strong>When in doubt with idioms, trust your ear!</strong> Read the sentence aloud—which preposition sounds more natural?</p>
        <p><strong>If you're not a native speaker:</strong> Memorize the most common ones above, and choose the most familiar-sounding option on the ACT.</p>
    </div>
</div>

<div class="section">
    <h3>Part 4: Precision in Word Choice - The Exact Right Word</h3>

    <div class="concept-box">
        <h4>💡 Why Precision Matters</h4>
        <p>The ACT tests whether you can choose the <strong>most precise and appropriate word</strong> for the context. This includes register (formal vs. informal), connotation (positive vs. negative), and specificity.</p>
    </div>

    <div class="concept-box">
        <h4>📋 Common Precision Traps</h4>

        <div class="examples">
            <p><strong>Register: Formal vs. Informal</strong></p>
            <p><strong>Academic writing needs formal word choice:</strong></p>
            <p>• <strong>Less formal:</strong> "The experiment was pretty cool."</p>
            <p>• <strong>More formal:</strong> "The experiment yielded fascinating results."</p>

            <p>• <strong>Less formal:</strong> "Kids learn better with hands-on stuff."</p>
            <p>• <strong>More formal:</strong> "Students learn more effectively through experiential activities."</p>
        </div>

        <div class="examples">
            <p><strong>Connotation: Positive, Negative, Neutral</strong></p>
            <p><strong>Same meaning, different feelings:</strong></p>
            <p>• <strong>Positive:</strong> determined, persistent, dedicated</p>
            <p>• <strong>Negative:</strong> stubborn, obsessive, fanatical</p>
            <p>• <strong>Neutral:</strong> consistent, regular, steady</p>
        </div>

        <div class="examples">
            <p><strong>Specificity: Vague vs. Precise</strong></p>
            <p><strong>More specific is usually better:</strong></p>
            <p>• <strong>Vague:</strong> "The weather was bad."</p>
            <p>• <strong>Precise:</strong> "The thunderstorm was severe."</p>

            <p>• <strong>Vague:</strong> "She did good on the test."</p>
            <p>• <strong>Precise:</strong> "She performed exceptionally well on the test."</p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Chapter 8 Master Strategy: Your ACT Usage Decision Process</h3>
    <div class="concept-box">
        <h4>🎯 When You See Word Choice & Usage Questions on the ACT:</h4>

        <p><strong>Step 1: Identify the question type</strong></p>
        <p>→ Confused words? Look for homophones or near-homophones</p>
        <p>→ Voice? Look for passive constructions (was/were + past participle)</p>
        <p>→ Idioms? Look for verb/adjective + preposition combinations</p>
        <p>→ Precision? Consider formality, connotation, and specificity</p>

        <p><strong>Step 2: Apply the appropriate test</strong></p>
        <p>→ For confused words: Use the substitution test</p>
        <p>→ For voice: Use the "by zombies" test, prefer active</p>
        <p>→ For idioms: Trust your ear or use memorized combinations</p>
        <p>→ For precision: Choose the most appropriate tone and specificity</p>

        <p><strong>Step 3: Double-check your choice</strong></p>
        <p>→ Does it make logical sense in context?</p>
        <p>→ Does it match the formality level of the passage?</p>
        <p>→ Does it create the right emphasis and clarity?</p>
    </div>
</div>

<!-- QUIZ_2 -->

<div class="section">
    <h3>Chapter 8 Success Summary</h3>
    <div class="concept-box">
        <h4>🏆 You've Now Mastered:</h4>
        <p>✓ <strong>Confused Word Pairs</strong> → The 12 most tested homophones and usage distinctions</p>
        <p>✓ <strong>Active vs. Passive Voice</strong> → When and how to choose the clearer option</p>
        <p>✓ <strong>Prepositional Idioms</strong> → Fixed phrases that sound right to native speakers</p>
        <p>✓ <strong>Precision in Word Choice</strong> → Selecting appropriate register, connotation, and specificity</p>
        <p>✓ <strong>Complete Grammar Foundation</strong> → Every major grammar concept tested on the ACT!</p>

        <p><strong>Next:</strong> Chapter 9 will review everything through comprehensive practice—integrating all 8 chapters into ACT mastery!</p>
    </div>
</div>
    `
  },

  'grammar-review': {
    title: 'Grammar Review',
    duration: 25, // minutes
    content: `
<div class="lesson-header">
    <h2>Grammar Review</h2>
    <p class="lesson-intro">Comprehensive review of all grammar concepts covered in previous chapters to solidify your understanding.</p>
</div>

<div class="section">
    <h3>Quick Review: The Big 5 Grammar Rules</h3>

    <div class="concept-box">
        <h4>1. Independent vs. Dependent Clauses</h4>
        <p>Independent clauses can stand alone; dependent clauses cannot.</p>
    </div>

    <div class="concept-box">
        <h4>2. Comma Rules</h4>
        <p>Four types: FANBOYS, unnecessary info, names, and lists.</p>
    </div>

    <div class="concept-box">
        <h4>3. Subject-Verb Agreement</h4>
        <p>Singular subjects get singular verbs; plural subjects get plural verbs.</p>
    </div>

    <div class="concept-box">
        <h4>4. Pronoun Case</h4>
        <p>Use subject pronouns for subjects, object pronouns for objects.</p>
    </div>

    <div class="concept-box">
        <h4>5. Parallel Structure</h4>
        <p>Items in lists must have the same grammatical form.</p>
    </div>
</div>

<!-- QUIZ_1 -->
    `
  },

  'redundancy': {
    title: 'Chapter 9: Eliminating Wordiness',
    duration: 15, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 9: Eliminating Wordiness</h2>
    <p class="lesson-intro">Learn to identify and eliminate redundant and wordy expressions to make your writing more concise and effective.</p>
</div>

<div class="section">
    <h3>The Conciseness Rule</h3>
    <p>When two answer choices say the same thing, choose the shorter one.</p>

    <div class="concept-box">
        <h4>Common Redundant Phrases</h4>
        <ul>
            <li><strong>Wrong:</strong> completely eliminate → <strong>Right:</strong> eliminate</li>
            <li><strong>Wrong:</strong> end result → <strong>Right:</strong> result</li>
            <li><strong>Wrong:</strong> past history → <strong>Right:</strong> history</li>
            <li><strong>Wrong:</strong> future plans → <strong>Right:</strong> plans</li>
            <li><strong>Wrong:</strong> join together → <strong>Right:</strong> join</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3>Wordy Constructions</h3>
    <p>Replace wordy phrases with concise alternatives.</p>

    <div class="concept-box">
        <h4>Common Wordy Phrases</h4>
        <ul>
            <li><strong>Wordy:</strong> in order to → <strong>Concise:</strong> to</li>
            <li><strong>Wordy:</strong> due to the fact that → <strong>Concise:</strong> because</li>
            <li><strong>Wordy:</strong> at this point in time → <strong>Concise:</strong> now</li>
            <li><strong>Wordy:</strong> in the event that → <strong>Concise:</strong> if</li>
        </ul>
    </div>
</div>

<!-- QUIZ_1 -->
    `
  },

  'word-choice': {
    title: 'Chapter 10: Precise Language',
    duration: 18, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 10: Precise Language</h2>
    <p class="lesson-intro">Learn to select the clearest and most precise words in context for maximum clarity and impact.</p>
</div>

<div class="section">
    <h3>Choosing the Right Word</h3>
    <p>Context determines which word fits best in a sentence.</p>

    <div class="concept-box">
        <h4>Precision vs. Vagueness</h4>
        <div class="examples">
            <p><strong>Vague:</strong> The weather was bad.</p>
            <p><strong>Precise:</strong> The weather was stormy.</p>
        </div>
        <div class="examples">
            <p><strong>Vague:</strong> She walked quickly.</p>
            <p><strong>Precise:</strong> She hurried.</p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Tone and Style</h3>
    <p>Choose words that match the tone and style of the passage.</p>

    <div class="concept-box">
        <h4>Formal vs. Informal</h4>
        <div class="examples">
            <p><strong>Informal:</strong> The scientist guy discovered something cool.</p>
            <p><strong>Formal:</strong> The researcher made a significant discovery.</p>
        </div>
    </div>
</div>

<!-- QUIZ_1 -->
    `
  },

  'transitions': {
    title: 'Chapter 11: Logical Connections',
    duration: 16, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 11: Logical Connections</h2>
    <p class="lesson-intro">Learn to choose logical transitions between sentences and paragraphs to create smooth, coherent flow.</p>
</div>

<div class="section">
    <h3>Types of Transitions</h3>

    <div class="concept-box">
        <h4>Addition/Continuation</h4>
        <p><strong>Words:</strong> furthermore, additionally, moreover, also</p>
        <p><strong>Use:</strong> When adding similar ideas</p>
        <div class="examples">
            <p>The weather was perfect. <strong>Furthermore</strong>, the forecast looked good for the entire week.</p>
        </div>
    </div>

    <div class="concept-box">
        <h4>Contrast</h4>
        <p><strong>Words:</strong> however, nevertheless, on the other hand, in contrast</p>
        <p><strong>Use:</strong> When showing opposite ideas</p>
        <div class="examples">
            <p>The plan seemed good. <strong>However</strong>, it had several major flaws.</p>
        </div>
    </div>

    <div class="concept-box">
        <h4>Cause and Effect</h4>
        <p><strong>Words:</strong> therefore, consequently, as a result, thus</p>
        <p><strong>Use:</strong> When showing results</p>
        <div class="examples">
            <p>It rained heavily all night. <strong>Consequently</strong>, the game was canceled.</p>
        </div>
    </div>
</div>

<!-- QUIZ_1 -->
    `
  },

  'which-choice': {
    title: 'Chapter 12: Best Choice',
    duration: 14, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 12: Best Choice</h2>
    <p class="lesson-intro">Learn to answer specific "which choice" questions about content, focusing on relevance and supporting details.</p>
</div>

<div class="section">
    <h3>Types of "Which Choice" Questions</h3>

    <div class="concept-box">
        <h4>Supporting Detail Questions</h4>
        <p>These ask which choice best supports the paragraph's main idea.</p>
        <div class="strategy">
            <p><strong>Strategy:</strong> Look for the choice that directly relates to and strengthens the main point.</p>
        </div>
    </div>

    <div class="concept-box">
        <h4>Specific Information Questions</h4>
        <p>These ask for particular details like dates, names, or specific facts.</p>
        <div class="strategy">
            <p><strong>Strategy:</strong> Choose the most specific and relevant detail that fits the context.</p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Key Strategies</h3>

    <div class="concept-box">
        <h4>The RELEVANT Test</h4>
        <ul>
            <li><strong>R</strong>elated to the main idea?</li>
            <li><strong>E</strong>ssential to the paragraph?</li>
            <li><strong>L</strong>ogical in this context?</li>
            <li><strong>E</strong>xact and specific?</li>
            <li><strong>V</strong>aluable addition?</li>
        </ul>
    </div>
</div>

<!-- QUIZ_1 -->
    `
  },

  'adding-deleting': {
    title: 'Chapter 13: Adding or Deleting',
    duration: 16, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 13: Adding or Deleting</h2>
    <p class="lesson-intro">Learn when to add or delete information from passages to improve clarity and focus.</p>
</div>

<div class="section">
    <h3>When to ADD Information</h3>

    <div class="concept-box">
        <h4>Add When:</h4>
        <ul>
            <li>The information directly supports the main idea</li>
            <li>It provides necessary context or explanation</li>
            <li>It helps connect ideas smoothly</li>
            <li>It adds relevant, interesting details</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3>When to DELETE Information</h3>

    <div class="concept-box">
        <h4>Delete When:</h4>
        <ul>
            <li>The information is repetitive or redundant</li>
            <li>It's off-topic or irrelevant to the main idea</li>
            <li>It interrupts the flow of ideas</li>
            <li>It's too obvious or unnecessary</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3>The Decision Process</h3>

    <div class="concept-box">
        <h4>Ask Yourself:</h4>
        <ol>
            <li>What is the paragraph's main idea?</li>
            <li>Does this information support that idea?</li>
            <li>Is it already stated elsewhere?</li>
            <li>Does it help or hurt the flow?</li>
        </ol>
    </div>
</div>

<!-- QUIZ_1 -->
    `
  },

  'logical-placement': {
    title: 'Chapter 14: Sentence Order',
    duration: 14, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 14: Sentence Order</h2>
    <p class="lesson-intro">Master placing sentences in the most logical order within paragraphs to create smooth, coherent flow.</p>
</div>

<div class="section">
    <h3>Logical Order Principles</h3>

    <div class="concept-box">
        <h4>Common Organizational Patterns</h4>
        <ul>
            <li><strong>Chronological:</strong> Events in time order</li>
            <li><strong>Spatial:</strong> Geographic or physical arrangement</li>
            <li><strong>Order of Importance:</strong> Most to least important (or vice versa)</li>
            <li><strong>General to Specific:</strong> Broad concepts to specific details</li>
            <li><strong>Cause and Effect:</strong> Causes first, then effects</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3>Transition Clues</h3>

    <div class="concept-box">
        <h4>Look for Signal Words</h4>
        <ul>
            <li><strong>Time:</strong> first, then, next, finally, meanwhile</li>
            <li><strong>Addition:</strong> also, furthermore, in addition</li>
            <li><strong>Contrast:</strong> however, but, on the other hand</li>
            <li><strong>Example:</strong> for instance, such as, namely</li>
        </ul>
    </div>

    <div class="pro-tip">
        <p><strong>PRO TIP:</strong> The sentence with the most general statement usually comes first, followed by more specific supporting details.</p>
    </div>
</div>

<!-- QUIZ_1 -->
    `
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

<!-- QUIZ_7 -->

      <h3>Practice Problems</h3>
      <p>Now that you've learned the backsolving technique, try applying it to these additional practice problems. Remember to start with answer choice B or C!</p>

      <div class="example-box">
        <h4>Practice Problem 1:</h4>
        <p><strong>Problem:</strong> If 2x² - 8x + 6 = 0, what is one possible value of x?</p>
        <p>A. 1 &nbsp;&nbsp; B. 2 &nbsp;&nbsp; C. 3 &nbsp;&nbsp; D. 4</p>
        <div class="practice-hint">
          <p><strong>Hint:</strong> Start with B or C and plug the value back into the equation to see if it equals 0.</p>
        </div>
      </div>

      <div class="example-box">
        <h4>Practice Problem 2:</h4>
        <p><strong>Problem:</strong> Which point lies on the line 3x - 2y = 12?</p>
        <p>A. (2, -3) &nbsp;&nbsp; B. (4, 0) &nbsp;&nbsp; C. (0, 6) &nbsp;&nbsp; D. (6, 3)</p>
        <div class="practice-hint">
          <p><strong>Hint:</strong> Substitute each point's x and y values into the equation to see which one makes the equation true.</p>
        </div>
      </div>

      <div class="summary-box">
        <h4>🎯 Backsolving Summary</h4>
        <p><strong>When to use backsolving:</strong></p>
        <ul>
          <li>When the question asks for a specific value and gives multiple choice answers</li>
          <li>When algebraic solving seems complex or time-consuming</li>
          <li>When you're unsure how to start solving algebraically</li>
          <li>For equations, inequalities, and point-on-line problems</li>
        </ul>
        <p><strong>Remember:</strong> Always start with B or C to save time, and systematically eliminate wrong answers!</p>
      </div>
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

<!-- QUIZ_8 -->
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

<!-- QUIZ_9 -->
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
        <p><strong>Yards and Feet</strong></p>
        <ul>
          <li><strong>1 yard = 3 feet</strong></li>
          <li><strong>1 square yard = 9 square feet</strong></li>
          <li><strong>1 cubic yard = 27 cubic feet</strong></li>
        </ul>

        <p><strong>Feet and Inches</strong></p>
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

<!-- QUIZ_10 -->
    `
  },

  'lines': {
    title: 'Chapter 5: Lines',
    duration: 25, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 5: <span style="color: #3b82f6; font-weight: 600;">Lines</span></h2>
    <p class="lesson-intro">Master slope, equations of lines, midpoint, and distance formulas - the foundation of coordinate geometry on the ACT! These concepts appear on <strong>every ACT Math test</strong> and connect to many other topics like functions and graphing.</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 5 Learning Path: The 4 Essential Line Concepts</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> Slope → How steep a line is and its direction</p>
        <p><strong>Part 2:</strong> Equations of Lines → Point-slope, slope-intercept, and standard forms</p>
        <p><strong>Part 3:</strong> Midpoint Formula → Finding the center point between two coordinates</p>
        <p><strong>Part 4:</strong> Distance Formula → Finding the length between two points</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #3b82f6; font-weight: 600;">Slope</span> - The Steepness of a Line</h3>

    <div class="concept-box">
        <h4>💡 Core Definition</h4>
        <p><strong>Slope = Rise over Run = Change in y over Change in x</strong></p>
        <p><strong>Formula: m = (y₂ - y₁) / (x₂ - x₁)</strong></p>
        <p>Slope tells us how much y changes for every 1 unit that x changes.</p>
    </div>

    <div class="rules-box">
        <h4>Essential Slope Rules:</h4>
        <ul>
            <li><strong>Positive slope:</strong> Line goes UP from left to right ↗</li>
            <li><strong>Negative slope:</strong> Line goes DOWN from left to right ↘</li>
            <li><strong>Zero slope:</strong> Horizontal line (flat) →</li>
            <li><strong>Undefined slope:</strong> Vertical line ↕</li>
            <li><strong>Parallel lines:</strong> Same slope</li>
            <li><strong>Perpendicular lines:</strong> Slopes multiply to -1 (negative reciprocals)</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 1: Finding Slope</h4>
        <p><strong>Problem:</strong> Find the slope of the line passing through points (2, 5) and (6, 13).</p>
        <p><strong>Solution:</strong></p>
        <p>m = (y₂ - y₁) / (x₂ - x₁)</p>
        <p>m = (13 - 5) / (6 - 2)</p>
        <p>m = 8 / 4 = 2</p>
        <p><strong>The slope is 2, meaning the line goes up 2 units for every 1 unit right.</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 2: Perpendicular Lines</h4>
        <p><strong>Problem:</strong> A line has slope ³⁄₄. What is the slope of a line perpendicular to it?</p>
        <p><strong>Solution:</strong></p>
        <p>Perpendicular slopes are negative reciprocals.</p>
        <p>Original slope: ³⁄₄</p>
        <p>Negative reciprocal: -⁴⁄₃</p>
        <p><strong>The perpendicular slope is -⁴⁄₃</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #3b82f6; font-weight: 600;">Equations of Lines</span></h3>

    <div class="rules-box">
        <h4>Three Important Forms:</h4>

        <p><strong>1. Slope-Intercept Form: y = mx + b</strong></p>
        <ul>
            <li>m = slope</li>
            <li>b = y-intercept (where line crosses y-axis)</li>
            <li><em>Most useful for graphing and identifying slope/y-intercept</em></li>
        </ul>

        <p><strong>2. Point-Slope Form: y - y₁ = m(x - x₁)</strong></p>
        <ul>
            <li>m = slope</li>
            <li>(x₁, y₁) = any known point on the line</li>
            <li><em>Most useful when you know a point and the slope</em></li>
        </ul>

        <p><strong>3. Standard Form: Ax + By = C</strong></p>
        <ul>
            <li>A, B, C are integers (A should be positive)</li>
            <li><em>Used when both x and y intercepts are important</em></li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 3: Writing Line Equations</h4>
        <p><strong>Problem:</strong> Write the equation of the line with slope -2 that passes through (3, 7).</p>
        <p><strong>Solution:</strong></p>
        <p><strong>Method 1 - Point-Slope Form:</strong></p>
        <p>y - y₁ = m(x - x₁)</p>
        <p>y - 7 = -2(x - 3)</p>
        <p>y - 7 = -2x + 6</p>
        <p>y = -2x + 13</p>

        <p><strong>Method 2 - Slope-Intercept Form directly:</strong></p>
        <p>y = mx + b, substitute the point (3, 7) and slope -2</p>
        <p>7 = -2(3) + b</p>
        <p>7 = -6 + b</p>
        <p>b = 13</p>
        <p><strong>Final answer: y = -2x + 13</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #3b82f6; font-weight: 600;">Midpoint Formula</span></h3>

    <div class="concept-box">
        <h4>💡 The Formula</h4>
        <p><strong>Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2)</strong></p>
        <p><em>Just average the x-coordinates and average the y-coordinates!</em></p>
    </div>

    <div class="example-box">
        <h4>Example 4: Finding Midpoint</h4>
        <p><strong>Problem:</strong> Find the midpoint of the segment connecting (-4, 6) and (8, -2).</p>
        <p><strong>Solution:</strong></p>
        <p>Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2)</p>
        <p>Midpoint = ((-4 + 8)/2, (6 + (-2))/2)</p>
        <p>Midpoint = (4/2, 4/2)</p>
        <p><strong>Midpoint = (2, 2)</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #3b82f6; font-weight: 600;">Distance Formula</span></h3>

    <div class="concept-box">
        <h4>💡 The Formula</h4>
        <p><strong>Distance = √[(x₂ - x₁)² + (y₂ - y₁)²]</strong></p>
        <p><em>This is just the Pythagorean theorem in disguise!</em></p>
    </div>

    <div class="tip-box">
        <h4>🎯 Memory Trick</h4>
        <p>Think of the distance formula as creating a right triangle:</p>
        <ul>
            <li>Horizontal leg = |x₂ - x₁|</li>
            <li>Vertical leg = |y₂ - y₁|</li>
            <li>Hypotenuse = distance between the points</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 5: Finding Distance</h4>
        <p><strong>Problem:</strong> Find the distance between points (-1, 3) and (5, -5).</p>
        <p><strong>Solution:</strong></p>
        <p>Distance = √[(x₂ - x₁)² + (y₂ - y₁)²]</p>
        <p>Distance = √[(5 - (-1))² + (-5 - 3)²]</p>
        <p>Distance = √[(6)² + (-8)²]</p>
        <p>Distance = √[36 + 64]</p>
        <p>Distance = √100 = 10</p>
        <p><strong>The distance is 10 units.</strong></p>
    </div>
</div>

<div class="section">
    <h3>🔗 Connecting the Concepts</h3>

    <div class="example-box">
        <h4>Example 6: Using All Four Concepts</h4>
        <p><strong>Problem:</strong> Points A(-2, 1) and B(4, 9) are endpoints of a line segment.</p>
        <p>a) Find the slope of line AB</p>
        <p>b) Find the equation of line AB</p>
        <p>c) Find the midpoint of segment AB</p>
        <p>d) Find the length of segment AB</p>

        <p><strong>Solutions:</strong></p>
        <p><strong>a) Slope:</strong> m = (9-1)/(4-(-2)) = 8/6 = 4/3</p>
        <p><strong>b) Equation:</strong> y - 1 = (4/3)(x - (-2)) → y = (4/3)x + 11/3</p>
        <p><strong>c) Midpoint:</strong> ((-2+4)/2, (1+9)/2) = (1, 5)</p>
        <p><strong>d) Distance:</strong> √[(4-(-2))² + (9-1)²] = √[36 + 64] = √100 = 10</p>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Lines are the foundation of coordinate geometry! Master slope, line equations, midpoint, and distance formulas - these concepts connect to functions, graphing, and many other ACT topics. Practice identifying which formula to use based on what information you're given!</p>
</div>

<!-- QUIZ_11 -->
    `
  },

  'fractions': {
    title: 'Chapter 6: Fractions',
    duration: 22, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 6: <span style="color: #f59e0b; font-weight: 600;">Fractions</span></h2>
    <p class="lesson-intro">Master fraction operations and calculator techniques that appear on <strong>every ACT Math test</strong>. These skills are essential for algebra, geometry, and advanced topics - plus you'll learn calculator shortcuts that save valuable time!</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 6 Learning Path: The 4 Essential Fraction Skills</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> Adding & Subtracting Fractions → Finding common denominators</p>
        <p><strong>Part 2:</strong> Multiplying & Dividing Fractions → The easiest operations!</p>
        <p><strong>Part 3:</strong> Mixed Numbers & Improper Fractions → Converting between forms</p>
        <p><strong>Part 4:</strong> Calculator Techniques → ACT-specific shortcuts and time-savers</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #f59e0b; font-weight: 600;">Adding & Subtracting</span> Fractions</h3>

    <div class="concept-box">
        <h4>💡 The Golden Rule</h4>
        <p><strong>You can only add or subtract fractions with the same denominator!</strong></p>
        <p>If denominators are different, find a common denominator first.</p>
    </div>

    <div class="rules-box">
        <h4>Step-by-Step Process:</h4>
        <ol>
            <li><strong>Check denominators:</strong> Are they the same?</li>
            <li><strong>If different:</strong> Find the Least Common Multiple (LCM)</li>
            <li><strong>Convert:</strong> Make equivalent fractions with the common denominator</li>
            <li><strong>Add/Subtract:</strong> Only the numerators, keep the denominator</li>
            <li><strong>Simplify:</strong> Reduce to lowest terms if possible</li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 1: Same Denominators</h4>
        <p><strong>Problem:</strong> 3/8 + 5/8</p>
        <p><strong>Solution:</strong></p>
        <p>Denominators are the same, so just add numerators:</p>
        <p>3/8 + 5/8 = (3 + 5)/8 = 8/8 = 1</p>
    </div>

    <div class="example-box">
        <h4>Example 2: Different Denominators</h4>
        <p><strong>Problem:</strong> 2/3 + 1/4</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Find LCM of 3 and 4 → LCM = 12</p>
        <p>Step 2: Convert to equivalent fractions</p>
        <ul>
            <li>2/3 = (2 × 4)/(3 × 4) = 8/12</li>
            <li>1/4 = (1 × 3)/(4 × 3) = 3/12</li>
        </ul>
        <p>Step 3: Add: 8/12 + 3/12 = 11/12</p>
    </div>

    <div class="example-box">
        <h4>Example 3: Subtraction</h4>
        <p><strong>Problem:</strong> 5/6 - 1/9</p>
        <p><strong>Solution:</strong></p>
        <p>LCM of 6 and 9 = 18</p>
        <p>5/6 = 15/18 and 1/9 = 2/18</p>
        <p>15/18 - 2/18 = 13/18</p>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #f59e0b; font-weight: 600;">Multiplying & Dividing</span> Fractions</h3>

    <div class="concept-box">
        <h4>💡 The Easy Operations!</h4>
        <p><strong>Multiplication:</strong> Multiply straight across (numerator × numerator, denominator × denominator)</p>
        <p><strong>Division:</strong> Multiply by the reciprocal (flip the second fraction)</p>
    </div>

    <div class="rules-box">
        <h4>Multiplication Formula:</h4>
        <p><strong>a/b × c/d = (a × c)/(b × d)</strong></p>

        <h4>Division Formula:</h4>
        <p><strong>a/b ÷ c/d = a/b × d/c</strong></p>
        <p><em>"Keep, Change, Flip" - Keep the first fraction, change ÷ to ×, flip the second fraction</em></p>
    </div>

    <div class="example-box">
        <h4>Example 4: Multiplication</h4>
        <p><strong>Problem:</strong> 3/4 × 2/5</p>
        <p><strong>Solution:</strong></p>
        <p>3/4 × 2/5 = (3 × 2)/(4 × 5) = 6/20 = 3/10</p>
    </div>

    <div class="example-box">
        <h4>Example 5: Division</h4>
        <p><strong>Problem:</strong> 2/3 ÷ 4/7</p>
        <p><strong>Solution:</strong></p>
        <p>2/3 ÷ 4/7 = 2/3 × 7/4 = (2 × 7)/(3 × 4) = 14/12 = 7/6</p>
    </div>

    <div class="tip-box">
        <h4>🎯 Cross-Cancelling Shortcut</h4>
        <p>Before multiplying, look for numbers that divide evenly:</p>
        <p><strong>Example:</strong> 6/8 × 4/9</p>
        <p>Notice: 6 and 9 both divide by 3, and 8 and 4 both divide by 4</p>
        <p>6/8 × 4/9 = (2×1)/(2×3) = 2/6 = 1/3</p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #f59e0b; font-weight: 600;">Mixed Numbers</span> & Improper Fractions</h3>

    <div class="concept-box">
        <h4>💡 Definitions</h4>
        <p><strong>Mixed Number:</strong> A whole number plus a fraction (like 2¾)</p>
        <p><strong>Improper Fraction:</strong> Numerator ≥ denominator (like 11/4)</p>
    </div>

    <div class="rules-box">
        <h4>Converting Mixed to Improper:</h4>
        <p><strong>Formula:</strong> (whole × denominator + numerator) / denominator</p>

        <h4>Converting Improper to Mixed:</h4>
        <p><strong>Process:</strong> Divide numerator by denominator</p>
        <ul>
            <li>Quotient = whole number part</li>
            <li>Remainder = new numerator</li>
            <li>Denominator stays the same</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 6: Mixed to Improper</h4>
        <p><strong>Problem:</strong> Convert 3²⁄₅ to an improper fraction</p>
        <p><strong>Solution:</strong></p>
        <p>(3 × 5 + 2) / 5 = (15 + 2) / 5 = 17/5</p>
    </div>

    <div class="example-box">
        <h4>Example 7: Improper to Mixed</h4>
        <p><strong>Problem:</strong> Convert 23/7 to a mixed number</p>
        <p><strong>Solution:</strong></p>
        <p>23 ÷ 7 = 3 remainder 2</p>
        <p>So 23/7 = 3²⁄₇</p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #f59e0b; font-weight: 600;">Calculator Techniques</span> for the ACT</h3>

    <div class="tip-box">
        <h4>🎯 Essential Calculator Tips</h4>
        <ol>
            <li><strong>Use Parentheses:</strong> For complex fractions, use (2+3)/(4+5) format</li>
            <li><strong>Convert to Decimals:</strong> Sometimes easier to work with 0.75 instead of 3/4</li>
            <li><strong>Fraction Button:</strong> Many calculators have a a/b/c button for mixed numbers</li>
            <li><strong>Simplify Function:</strong> Look for SIMP or simplify functions</li>
        </ol>
    </div>

    <div class="rules-box">
        <h4>Common Fraction-Decimal Conversions to Memorize:</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
                <p><strong>Halves & Quarters:</strong></p>
                <ul>
                    <li>1/2 = 0.5</li>
                    <li>1/4 = 0.25</li>
                    <li>3/4 = 0.75</li>
                </ul>
            </div>
            <div>
                <p><strong>Thirds & Fifths:</strong></p>
                <ul>
                    <li>1/3 = 0.333...</li>
                    <li>2/3 = 0.666...</li>
                    <li>1/5 = 0.2</li>
                    <li>2/5 = 0.4</li>
                    <li>3/5 = 0.6</li>
                    <li>4/5 = 0.8</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="example-box">
        <h4>Example 8: Calculator Strategy</h4>
        <p><strong>Problem:</strong> What is (2/3 + 1/4) ÷ (3/5 - 1/6)?</p>
        <p><strong>Calculator Method:</strong></p>
        <p>Enter: ((2÷3)+(1÷4))÷((3÷5)-(1÷6))</p>
        <p>Result: Approximately 1.26</p>

        <p><strong>Verification Method:</strong></p>
        <p>Numerator: 2/3 + 1/4 = 8/12 + 3/12 = 11/12</p>
        <p>Denominator: 3/5 - 1/6 = 18/30 - 5/30 = 13/30</p>
        <p>Final: (11/12) ÷ (13/30) = (11/12) × (30/13) = 330/156 = 55/26 ≈ 1.26 ✓</p>
    </div>
</div>

<div class="section">
    <h3>🔗 Word Problems with Fractions</h3>

    <div class="example-box">
        <h4>Example 9: Real ACT Problem</h4>
        <p><strong>Problem:</strong> Sarah ate 1/4 of a pizza for lunch and 2/3 of the remaining pizza for dinner. What fraction of the original pizza did she eat for dinner?</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: After lunch, remaining pizza = 1 - 1/4 = 3/4</p>
        <p>Step 2: For dinner, she ate 2/3 of this remaining amount</p>
        <p>Step 3: Dinner portion = 2/3 × 3/4 = 6/12 = 1/2</p>
        <p><strong>Answer: She ate 1/2 of the original pizza for dinner.</strong></p>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Fractions are fundamental to ACT success! Master the four basic operations and calculator techniques. Remember: addition/subtraction needs common denominators, but multiplication/division works straight across. Use your calculator strategically, but know the manual methods for accuracy checks!</p>
</div>

<!-- QUIZ_12 -->
    `
  },

  'algebra-skills': {
    title: 'Chapter 7: Algebra Skills',
    duration: 28, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 7: <span style="color: #10b981; font-weight: 600;">Algebra Skills</span></h2>
    <p class="lesson-intro">Master the fundamental algebra operations that form the backbone of <strong>80% of ACT Math questions</strong>! From order of operations to factoring, these skills are your foundation for success across all math topics.</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 7 Learning Path: The 5 Essential Algebra Skills</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> PEMDAS → Perfect order of operations every time</p>
        <p><strong>Part 2:</strong> Combining Like Terms → Simplify expressions efficiently</p>
        <p><strong>Part 3:</strong> Distributive Property → Expand and factor expressions</p>
        <p><strong>Part 4:</strong> Working with Negative Numbers → Avoid common sign errors</p>
        <p><strong>Part 5:</strong> Basic Factoring → Factor out common terms and simple quadratics</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #10b981; font-weight: 600;">PEMDAS</span> - Order of Operations</h3>

    <div class="concept-box">
        <h4>💡 The Sacred Order</h4>
        <p><strong>P</strong>arentheses → <strong>E</strong>xponents → <strong>M</strong>ultiplication & <strong>D</strong>ivision → <strong>A</strong>ddition & <strong>S</strong>subtraction</p>
        <p><em>Memory device: "Please Excuse My Dear Aunt Sally"</em></p>
    </div>

    <div class="rules-box">
        <h4>Critical PEMDAS Rules:</h4>
        <ol>
            <li><strong>Always work left to right within each level</strong></li>
            <li><strong>Multiplication and Division have equal priority</strong> (do whichever comes first)</li>
            <li><strong>Addition and Subtraction have equal priority</strong> (do whichever comes first)</li>
            <li><strong>Parentheses include brackets [ ] and braces { }</strong></li>
            <li><strong>Exponents include square roots and other radicals</strong></li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 1: Basic PEMDAS</h4>
        <p><strong>Problem:</strong> 2 + 3 × 4 - 8 ÷ 2</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Multiplication and Division first (left to right)</p>
        <p>2 + 3 × 4 - 8 ÷ 2</p>
        <p>2 + 12 - 4</p>
        <p>Step 2: Addition and Subtraction (left to right)</p>
        <p>14 - 4 = 10</p>
    </div>

    <div class="example-box">
        <h4>Example 2: Complex PEMDAS</h4>
        <p><strong>Problem:</strong> (2 + 3)² - 4 × 3 + 8 ÷ (6 - 4)</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Parentheses first</p>
        <p>(2 + 3)² - 4 × 3 + 8 ÷ (6 - 4)</p>
        <p>(5)² - 4 × 3 + 8 ÷ (2)</p>
        <p>Step 2: Exponents</p>
        <p>25 - 4 × 3 + 8 ÷ 2</p>
        <p>Step 3: Multiplication and Division (left to right)</p>
        <p>25 - 12 + 4</p>
        <p>Step 4: Addition and Subtraction (left to right)</p>
        <p>13 + 4 = 17</p>
    </div>

    <div class="tip-box">
        <h4>🎯 Common PEMDAS Mistakes to Avoid</h4>
        <ul>
            <li><strong>DON'T</strong> always do multiplication before division</li>
            <li><strong>DON'T</strong> always do addition before subtraction</li>
            <li><strong>DO</strong> work left to right within the same priority level</li>
            <li><strong>DO</strong> be extra careful with negative signs in parentheses</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #10b981; font-weight: 600;">Combining Like Terms</span></h3>

    <div class="concept-box">
        <h4>💡 What Are Like Terms?</h4>
        <p><strong>Like terms have the same variable(s) raised to the same power(s)</strong></p>
        <p><em>Examples: 3x and 7x are like terms, but 3x and 3x² are not</em></p>
    </div>

    <div class="rules-box">
        <h4>Steps to Combine Like Terms:</h4>
        <ol>
            <li><strong>Identify</strong> terms with identical variable parts</li>
            <li><strong>Add or subtract</strong> the coefficients (numbers in front)</li>
            <li><strong>Keep</strong> the variable part unchanged</li>
            <li><strong>Write</strong> unlike terms separately</li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 3: Basic Like Terms</h4>
        <p><strong>Problem:</strong> 5x + 3x - 2x + 7</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Identify like terms</p>
        <ul>
            <li>x terms: 5x, 3x, -2x</li>
            <li>Constant terms: 7</li>
        </ul>
        <p>Step 2: Combine coefficients of x terms</p>
        <p>5x + 3x - 2x = (5 + 3 - 2)x = 6x</p>
        <p><strong>Final answer: 6x + 7</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 4: Multiple Variables</h4>
        <p><strong>Problem:</strong> 4x² + 3xy - 2x² + 5y - xy + 8</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Group like terms</p>
        <ul>
            <li>x² terms: 4x², -2x²</li>
            <li>xy terms: 3xy, -xy</li>
            <li>y terms: 5y</li>
            <li>Constants: 8</li>
        </ul>
        <p>Step 2: Combine each group</p>
        <p>4x² - 2x² = 2x²</p>
        <p>3xy - xy = 2xy</p>
        <p><strong>Final answer: 2x² + 2xy + 5y + 8</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #10b981; font-weight: 600;">Distributive Property</span></h3>

    <div class="concept-box">
        <h4>💡 The Formula</h4>
        <p><strong>a(b + c) = ab + ac</strong></p>
        <p><em>Multiply the outside term by each term inside the parentheses</em></p>
    </div>

    <div class="example-box">
        <h4>Example 5: Basic Distribution</h4>
        <p><strong>Problem:</strong> 3(2x + 5)</p>
        <p><strong>Solution:</strong></p>
        <p>3(2x + 5) = 3 × 2x + 3 × 5 = 6x + 15</p>
    </div>

    <div class="example-box">
        <h4>Example 6: Distribution with Variables</h4>
        <p><strong>Problem:</strong> -2x(3x - 4)</p>
        <p><strong>Solution:</strong></p>
        <p>-2x(3x - 4) = (-2x)(3x) + (-2x)(-4) = -6x² + 8x</p>
    </div>

    <div class="example-box">
        <h4>Example 7: Factoring Out Common Terms</h4>
        <p><strong>Problem:</strong> Factor 12x² + 18x</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Find the greatest common factor</p>
        <ul>
            <li>Coefficients: GCF of 12 and 18 is 6</li>
            <li>Variables: Both terms have x, so factor out x</li>
            <li>Overall GCF: 6x</li>
        </ul>
        <p>Step 2: Factor out the GCF</p>
        <p>12x² + 18x = 6x(2x + 3)</p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #10b981; font-weight: 600;">Working with Negatives</span></h3>

    <div class="rules-box">
        <h4>Essential Negative Number Rules:</h4>
        <ul>
            <li><strong>(-a) + (-b) = -(a + b)</strong> → Adding negatives gives a negative</li>
            <li><strong>(-a) - (-b) = -a + b</strong> → Subtracting a negative is adding</li>
            <li><strong>(-a) × (-b) = ab</strong> → Negative times negative is positive</li>
            <li><strong>(-a) × b = -ab</strong> → Negative times positive is negative</li>
            <li><strong>(-a)² = a²</strong> → Even power makes positive</li>
            <li><strong>(-a)³ = -a³</strong> → Odd power keeps negative</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 8: Negative Distribution</h4>
        <p><strong>Problem:</strong> -(3x - 7)</p>
        <p><strong>Solution:</strong></p>
        <p>-(3x - 7) = (-1)(3x - 7) = (-1)(3x) + (-1)(-7) = -3x + 7</p>
    </div>

    <div class="example-box">
        <h4>Example 9: Complex Signs</h4>
        <p><strong>Problem:</strong> -2(x - 3) - (4 - x)</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Distribute</p>
        <p>-2(x - 3) - (4 - x) = -2x + 6 - 4 + x</p>
        <p>Step 2: Combine like terms</p>
        <p>-2x + x + 6 - 4 = -x + 2</p>
    </div>
</div>

<div class="section">
    <h3>Part 5: <span style="color: #10b981; font-weight: 600;">Basic Factoring</span></h3>

    <div class="concept-box">
        <h4>💡 Three Main Types</h4>
        <ol>
            <li><strong>Common Factor:</strong> Factor out the GCF</li>
            <li><strong>Difference of Squares:</strong> a² - b² = (a + b)(a - b)</li>
            <li><strong>Simple Trinomials:</strong> x² + bx + c = (x + m)(x + n) where mn = c, m + n = b</li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 10: Difference of Squares</h4>
        <p><strong>Problem:</strong> Factor x² - 16</p>
        <p><strong>Solution:</strong></p>
        <p>Recognize: x² - 16 = x² - 4²</p>
        <p>This is a² - b² form where a = x, b = 4</p>
        <p>x² - 16 = (x + 4)(x - 4)</p>
    </div>

    <div class="example-box">
        <h4>Example 11: Simple Trinomial</h4>
        <p><strong>Problem:</strong> Factor x² + 7x + 12</p>
        <p><strong>Solution:</strong></p>
        <p>Need two numbers that multiply to 12 and add to 7</p>
        <p>Factors of 12: 1×12, 2×6, 3×4</p>
        <p>Check sums: 1+12=13, 2+6=8, 3+4=7 ✓</p>
        <p>x² + 7x + 12 = (x + 3)(x + 4)</p>
    </div>
</div>

<div class="section">
    <h3>🔗 Putting It All Together</h3>

    <div class="example-box">
        <h4>Example 12: Multi-Step Problem</h4>
        <p><strong>Problem:</strong> Simplify 2(3x + 1) - (x² - 4x) + (x² + x - 6)</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Distribute</p>
        <p>2(3x + 1) = 6x + 2</p>
        <p>-(x² - 4x) = -x² + 4x</p>
        <p>Step 2: Rewrite the expression</p>
        <p>6x + 2 - x² + 4x + x² + x - 6</p>
        <p>Step 3: Combine like terms</p>
        <p>x² terms: -x² + x² = 0</p>
        <p>x terms: 6x + 4x + x = 11x</p>
        <p>Constants: 2 - 6 = -4</p>
        <p><strong>Final answer: 11x - 4</strong></p>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>These algebra skills are your ACT Math foundation! Master PEMDAS for accurate calculations, combine like terms to simplify expressions, use the distributive property confidently, handle negative numbers without errors, and recognize basic factoring patterns. These skills appear in 80% of ACT Math questions!</p>
</div>

<!-- QUIZ_13 -->
    `
  },

  'percentages': {
    title: 'Chapter 9: Percentages',
    duration: 24, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 9: <span style="color: #8b5cf6; font-weight: 600;">Percentages</span></h2>
    <p class="lesson-intro">Master percentage calculations that appear on <strong>every single ACT Math test</strong>! From basic percent problems to percent change and compound interest, these skills are essential for word problems and real-world applications.</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 9 Learning Path: The 4 Essential Percentage Skills</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> Basic Percent Calculations → Finding percentages, parts, and wholes</p>
        <p><strong>Part 2:</strong> Percent Increase & Decrease → Calculate and interpret changes</p>
        <p><strong>Part 3:</strong> Successive Percentages → Multiple percentage changes</p>
        <p><strong>Part 4:</strong> Percent Word Problems → Real ACT problem types</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #8b5cf6; font-weight: 600;">Basic Percent Calculations</span></h3>

    <div class="concept-box">
        <h4>💡 The Fundamental Formula</h4>
        <p><strong>Percent = (Part / Whole) × 100</strong></p>
        <p><em>This single formula solves ALL basic percentage problems!</em></p>
    </div>

    <div class="rules-box">
        <h4>Three Types of Percent Problems:</h4>
        <ol>
            <li><strong>Find the Percent:</strong> What percent of 80 is 20?</li>
            <li><strong>Find the Part:</strong> What is 25% of 80?</li>
            <li><strong>Find the Whole:</strong> 20 is 25% of what number?</li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 1: Finding the Percent</h4>
        <p><strong>Problem:</strong> What percent of 80 is 20?</p>
        <p><strong>Solution:</strong></p>
        <p>Percent = (Part / Whole) × 100</p>
        <p>Percent = (20 / 80) × 100 = 0.25 × 100 = 25%</p>
    </div>

    <div class="example-box">
        <h4>Example 2: Finding the Part</h4>
        <p><strong>Problem:</strong> What is 25% of 80?</p>
        <p><strong>Solution:</strong></p>
        <p>Part = (Percent / 100) × Whole</p>
        <p>Part = (25 / 100) × 80 = 0.25 × 80 = 20</p>
    </div>

    <div class="example-box">
        <h4>Example 3: Finding the Whole</h4>
        <p><strong>Problem:</strong> 20 is 25% of what number?</p>
        <p><strong>Solution:</strong></p>
        <p>Whole = Part / (Percent / 100)</p>
        <p>Whole = 20 / (25 / 100) = 20 / 0.25 = 80</p>
    </div>

    <div class="tip-box">
        <h4>🎯 Quick Conversion Shortcuts</h4>
        <p>Memorize these common percentages:</p>
        <ul>
            <li><strong>25% = 1/4 = 0.25</strong></li>
            <li><strong>50% = 1/2 = 0.5</strong></li>
            <li><strong>75% = 3/4 = 0.75</strong></li>
            <li><strong>10% = 1/10 = 0.1</strong></li>
            <li><strong>20% = 1/5 = 0.2</strong></li>
        </ul>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #8b5cf6; font-weight: 600;">Percent Increase & Decrease</span></h3>

    <div class="concept-box">
        <h4>💡 The Change Formula</h4>
        <p><strong>Percent Change = (|New Value - Original Value| / Original Value) × 100</strong></p>
        <p><em>Always divide by the ORIGINAL value, not the new value!</em></p>
    </div>

    <div class="rules-box">
        <h4>Key Formulas for Change:</h4>
        <p><strong>Percent Increase = (New Value - Original Value) / Original Value × 100</strong></p>
        <p><strong>Percent Decrease = (Original Value - New Value) / Original Value × 100</strong></p>

        <h4>Finding New Values:</h4>
        <p><strong>After Increase:</strong> New Value = Original × (1 + percent increase)</p>
        <p><strong>After Decrease:</strong> New Value = Original × (1 - percent decrease)</p>
    </div>

    <div class="example-box">
        <h4>Example 4: Percent Increase</h4>
        <p><strong>Problem:</strong> A shirt's price increased from $20 to $25. What is the percent increase?</p>
        <p><strong>Solution:</strong></p>
        <p>Percent Increase = (New - Original) / Original × 100</p>
        <p>Percent Increase = (25 - 20) / 20 × 100 = 5/20 × 100 = 25%</p>
    </div>

    <div class="example-box">
        <h4>Example 5: Percent Decrease</h4>
        <p><strong>Problem:</strong> A laptop's price decreased from $800 to $640. What is the percent decrease?</p>
        <p><strong>Solution:</strong></p>
        <p>Percent Decrease = (Original - New) / Original × 100</p>
        <p>Percent Decrease = (800 - 640) / 800 × 100 = 160/800 × 100 = 20%</p>
    </div>

    <div class="example-box">
        <h4>Example 6: Finding New Value After Change</h4>
        <p><strong>Problem:</strong> If a $60 jacket is marked down 15%, what is the sale price?</p>
        <p><strong>Solution:</strong></p>
        <p>Method 1: New Value = Original × (1 - percent decrease)</p>
        <p>Sale Price = $60 × (1 - 0.15) = $60 × 0.85 = $51</p>

        <p>Method 2: Find discount first</p>
        <p>Discount = $60 × 0.15 = $9</p>
        <p>Sale Price = $60 - $9 = $51</p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #8b5cf6; font-weight: 600;">Successive Percentages</span></h3>

    <div class="concept-box">
        <h4>💡 The Golden Rule</h4>
        <p><strong>You CANNOT simply add or subtract successive percentages!</strong></p>
        <p><em>A 20% increase followed by a 20% decrease is NOT zero change!</em></p>
    </div>

    <div class="rules-box">
        <h4>How to Handle Successive Changes:</h4>
        <ol>
            <li><strong>Apply each percentage change to the result of the previous change</strong></li>
            <li><strong>Use multiplication:</strong> Final Value = Original × (1 ± change₁) × (1 ± change₂) × ...</li>
            <li><strong>+ for increases, - for decreases</strong></li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 7: Successive Changes</h4>
        <p><strong>Problem:</strong> A stock price increases 20%, then decreases 15%. If it started at $100, what's the final price?</p>
        <p><strong>Solution:</strong></p>
        <p>Final Price = Original × (1 + increase) × (1 - decrease)</p>
        <p>Final Price = $100 × (1 + 0.20) × (1 - 0.15)</p>
        <p>Final Price = $100 × 1.20 × 0.85</p>
        <p>Final Price = $100 × 1.02 = $102</p>

        <p><strong>Verification:</strong></p>
        <p>After 20% increase: $100 × 1.20 = $120</p>
        <p>After 15% decrease: $120 × 0.85 = $102 ✓</p>
    </div>

    <div class="example-box">
        <h4>Example 8: Multiple Successive Changes</h4>
        <p><strong>Problem:</strong> A population increases 10% each year for 3 years. If it starts at 1000, what's the final population?</p>
        <p><strong>Solution:</strong></p>
        <p>Final Population = Original × (1 + 0.10)³</p>
        <p>Final Population = 1000 × (1.10)³</p>
        <p>Final Population = 1000 × 1.331 = 1331</p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #8b5cf6; font-weight: 600;">Percent Word Problems</span></h3>

    <div class="tip-box">
        <h4>🎯 Common ACT Percentage Problem Types</h4>
        <ol>
            <li><strong>Tax and Tip Problems:</strong> Add percentage to original</li>
            <li><strong>Discount Problems:</strong> Subtract percentage from original</li>
            <li><strong>Commission Problems:</strong> Percentage of sales</li>
            <li><strong>Interest Problems:</strong> Simple and compound interest</li>
            <li><strong>Markup/Markdown Problems:</strong> Business pricing</li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 9: Tax Problem</h4>
        <p><strong>Problem:</strong> A meal costs $24.80 before tax. If the tax rate is 8.25%, what is the total cost?</p>
        <p><strong>Solution:</strong></p>
        <p>Total Cost = Original + Tax</p>
        <p>Total Cost = $24.80 + ($24.80 × 0.0825)</p>
        <p>Total Cost = $24.80 + $2.05 = $26.85</p>

        <p><strong>Shortcut Method:</strong></p>
        <p>Total Cost = Original × (1 + tax rate)</p>
        <p>Total Cost = $24.80 × 1.0825 = $26.85</p>
    </div>

    <div class="example-box">
        <h4>Example 10: Commission Problem</h4>
        <p><strong>Problem:</strong> A salesperson earns 6% commission on all sales. If they earned $2,400 in commission last month, what were their total sales?</p>
        <p><strong>Solution:</strong></p>
        <p>Commission = Commission Rate × Total Sales</p>
        <p>$2,400 = 0.06 × Total Sales</p>
        <p>Total Sales = $2,400 ÷ 0.06 = $40,000</p>
    </div>

    <div class="example-box">
        <h4>Example 11: Markup Problem</h4>
        <p><strong>Problem:</strong> A store buys items for $40 and marks them up 150%. What is the selling price?</p>
        <p><strong>Solution:</strong></p>
        <p>Selling Price = Cost + Markup</p>
        <p>Markup = $40 × 1.50 = $60</p>
        <p>Selling Price = $40 + $60 = $100</p>

        <p><strong>Shortcut Method:</strong></p>
        <p>Selling Price = Cost × (1 + markup rate)</p>
        <p>Selling Price = $40 × (1 + 1.50) = $40 × 2.50 = $100</p>
    </div>

    <div class="example-box">
        <h4>Example 12: Simple Interest</h4>
        <p><strong>Problem:</strong> Find the simple interest earned on $1,200 at 5% annual interest for 3 years.</p>
        <p><strong>Solution:</strong></p>
        <p><strong>Simple Interest Formula: I = PRT</strong></p>
        <ul>
            <li>P = Principal ($1,200)</li>
            <li>R = Rate (5% = 0.05)</li>
            <li>T = Time (3 years)</li>
        </ul>
        <p>Interest = $1,200 × 0.05 × 3 = $180</p>
        <p>Total Amount = Principal + Interest = $1,200 + $180 = $1,380</p>
    </div>
</div>

<div class="section">
    <h3>🔗 Advanced Percentage Strategies</h3>

    <div class="rules-box">
        <h4>Calculator Tips for Percentages:</h4>
        <ul>
            <li><strong>To find 25% of 80:</strong> Enter 80 × 0.25 (or 80 × 25 ÷ 100)</li>
            <li><strong>To increase by 15%:</strong> Multiply by 1.15</li>
            <li><strong>To decrease by 20%:</strong> Multiply by 0.80</li>
            <li><strong>To find percent change:</strong> (New - Old) ÷ Old × 100</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 13: Multi-Step Percentage Problem</h4>
        <p><strong>Problem:</strong> A company's revenue was $500,000. It increased 20% in year 1, then decreased 10% in year 2. In year 3, it increased 25%. What was the final revenue?</p>
        <p><strong>Solution:</strong></p>
        <p>Final Revenue = Original × (1.20) × (0.90) × (1.25)</p>
        <p>Final Revenue = $500,000 × 1.20 × 0.90 × 1.25</p>
        <p>Final Revenue = $500,000 × 1.35</p>
        <p>Final Revenue = $675,000</p>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Percentages appear on every ACT! Master the basic formula (Part/Whole × 100), understand percent change calculations, never add successive percentages, and practice word problems. Use the multiplier method for efficiency: increase by 25% means multiply by 1.25, decrease by 15% means multiply by 0.85!</p>
</div>

<!-- QUIZ_15 -->
    `
  },

  'exponents-roots': {
    title: 'Chapter 13: Exponents and Roots',
    duration: 26, // minutes
    content: `
                </div>
            </div>
        </div>

<div class="lesson-header">
    <h2>Chapter 13: <span style="color: #ef4444; font-weight: 600;">Exponents and Roots</span></h2>
    <p class="lesson-intro">Master the power rules and root operations that appear throughout ACT Math! From basic exponent rules to radical simplification, these skills are essential for algebra, functions, and advanced topics.</p>
</div>
                    <button class="choice-btn" data-correct="true" data-explanation="To find the part: 15% of 240 = 0.15 × 240 = 36">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">36</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would be about 12.5% of 240, not 15%.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">30</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would be about 17.5% of 240, which is too high.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">42</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="3">
            <div class="question-header">
                <span class="question-number">Question 3 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 50%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Finding the Whole</h4>
                <p>18 is 25% of what number?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="true" data-explanation="If 18 is 25% of a number, then: 18 ÷ 0.25 = 72. Check: 25% of 72 = 0.25 × 72 = 18 ✓">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">72</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would make 18 about 33% of the whole, not 25%.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">54</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would make 18 about 26.5% of the whole, close but not exactly 25%.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">68</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would make 18 about 22% of the whole, not 25%.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">82</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="4">
            <div class="question-header">
                <span class="question-number">Question 4 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 66.67%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Percent Increase</h4>
                <p>The price of a shirt increased from $20 to $25. What is the percent increase?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="This would be the percent increase if the price went from $25 to $30.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">20%</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Percent increase = (New - Original) / Original × 100 = (25 - 20) / 20 × 100 = 5/20 × 100 = 25%">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">25%</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="$5 is the dollar increase, but the percent increase is (5/20) × 100 = 25%.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">5%</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would be if we calculated (new/old) × 100 instead of the change formula.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">80%</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="5">
            <div class="question-header">
                <span class="question-number">Question 5 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 83.33%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Percent Decrease</h4>
                <p>A population decreases from 8,000 to 6,400. What is the percent decrease?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="This is close but not exact. The decrease is 1,600 out of 8,000, which is exactly 20%.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">16%</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Percent decrease = (Original - New) / Original × 100 = (8000 - 6400) / 8000 × 100 = 1600/8000 × 100 = 20%">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">20%</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would be the decrease if the population went from 6,400 to 4,800.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">25%</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This mixes up the units - 1,600 is the actual decrease, not a percentage.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">1,600%</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="6">
            <div class="question-header">
                <span class="question-number">Question 6 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 100%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Reverse Percentage Problem</h4>
                <p>An item costs $80 after a 20% discount. What was the original price?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="This would be correct if there was a 20% increase, not a 20% discount.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">$96</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="If discounted by 20%, the sale price is 80% of original. So $80 = 0.8 × Original price, therefore Original price = $80 ÷ 0.8 = $100">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">$100</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This assumes the original price was higher than it actually was.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">$104</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would be 20% less than $80, which confuses the relationship.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">$64</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="quiz-explanation" style="display: none;">
        <div class="explanation-content"></div>
        <button onclick="nextQuestion14()" class="continue-btn">Continue</button>
    </div>

    <div class="quiz-results" style="display: none;">
        <div class="results-header">
            <h3>🎉 Quiz Complete!</h3>
            <div class="score-display">
                <span class="score-text">0/6</span>
                <span class="score-label">Correct</span>
            </div>
        </div>
        <div class="performance-feedback"></div>
        <div class="results-actions">
            <button onclick="restartQuiz14()" class="action-btn secondary">🔄 Retake Quiz</button>
            <button onclick="reviewAnswers14()" class="action-btn primary">📝 Review Answers</button>
        </div>
    </div>

    <div class="quiz-navigation">
        <button id="start-quiz-btn-14" class="nav-btn primary">Start Quiz</button>
        <button id="prev-btn-14" class="nav-btn secondary" style="display: none;">← Previous</button>
        <button id="next-btn-14" class="nav-btn primary" style="display: none;">Next →</button>
        <button id="submit-quiz-btn-14" class="nav-btn primary" style="display: none;">Submit Quiz</button>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let quizStarted14 = false;
    let currentQuestion14 = 0;
    let userAnswers14 = [];
    let score14 = 0;

    const startBtn14 = document.getElementById('start-quiz-btn-14');
    const prevBtn14 = document.getElementById('prev-btn-14');
    const nextBtn14 = document.getElementById('next-btn-14');
    const submitBtn14 = document.getElementById('submit-quiz-btn-14');
    const quizContainer14 = document.querySelector('.quiz-container');
    const quizExplanation14 = document.querySelector('.quiz-explanation');
    const quizResults14 = document.querySelector('.quiz-results');
    const questionCards14 = document.querySelectorAll('.question-card');

    if (startBtn14) {
        startBtn14.addEventListener('click', startQuiz14);
    }
    if (prevBtn14) {
        prevBtn14.addEventListener('click', previousQuestion14);
    }
    if (nextBtn14) {
        nextBtn14.addEventListener('click', () => {
            if (quizExplanation14.style.display === 'block') {
                nextQuestion14();
            } else {
                const currentCard = questionCards14[currentQuestion14];
                const selectedChoice = currentCard.querySelector('.choice-btn.selected');
                if (selectedChoice) {
                    showExplanation14(selectedChoice.dataset.explanation, selectedChoice.dataset.correct === 'true');
                }
            }
        });
    }
    if (submitBtn14) {
        submitBtn14.addEventListener('click', () => {
            if (quizExplanation14.style.display === 'block') {
                submitQuiz14();
            } else {
                const currentCard = questionCards14[currentQuestion14];
                const selectedChoice = currentCard.querySelector('.choice-btn.selected');
                if (selectedChoice) {
                    showExplanation14(selectedChoice.dataset.explanation, selectedChoice.dataset.correct === 'true');
                }
            }
        });
    }

    function startQuiz14() {
        quizStarted14 = true;
        currentQuestion14 = 0;
        userAnswers14 = [];
        score14 = 0;

        if (startBtn14) startBtn14.style.display = 'none';
        if (quizResults14) quizResults14.style.display = 'none';
        if (quizContainer14) quizContainer14.style.display = 'block';

        showQuestion14(0);
        updateNavigation14();
    }

    function showQuestion14(index) {
        if (questionCards14) {
            questionCards14.forEach(card => card.classList.remove('active'));
            if (questionCards14[index]) {
                questionCards14[index].classList.add('active');
                setupQuestionListeners14(index);
            }
        }
    }

    function setupQuestionListeners14(index) {
        if (questionCards14 && questionCards14[index]) {
            const choices = questionCards14[index].querySelectorAll('.choice-btn');
            choices.forEach(choice => {
                choice.addEventListener('click', function() {
                    if (this.disabled) return;

                    choices.forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                    userAnswers14[index] = {
                        selected: this,
                        correct: this.dataset.correct === 'true',
                        explanation: this.dataset.explanation
                    };

                    setTimeout(() => {
                        showExplanation14(this.dataset.explanation, this.dataset.correct === 'true');
                    }, 300);
                });
            });
        }
    }

    function showExplanation14(explanation, isCorrect) {
        const explanationContent = document.querySelector('.explanation-content');
        if (explanationContent) {
            explanationContent.innerHTML =
                '<div class="explanation-header ' + (isCorrect ? 'correct' : 'incorrect') + '">' +
                    '<span class="explanation-icon">' + (isCorrect ? '✅' : '❌') + '</span>' +
                    '<span class="explanation-status">' + (isCorrect ? 'Correct!' : 'Incorrect') + '</span>' +
                '</div>' +
                '<div class="explanation-text">' + explanation + '</div>';
        }

        if (quizContainer14) quizContainer14.style.display = 'none';
        if (quizExplanation14) quizExplanation14.style.display = 'block';

        const navButtons = document.querySelector('.quiz-navigation');
        if (navButtons) navButtons.style.display = 'none';
    }

    function nextQuestion14() {
        if (quizExplanation14) quizExplanation14.style.display = 'none';
        if (quizContainer14) quizContainer14.style.display = 'block';

        const navButtons = document.querySelector('.quiz-navigation');
        if (navButtons) navButtons.style.display = 'flex';

        if (currentQuestion14 < questionCards14.length - 1) {
            currentQuestion14++;
            showQuestion14(currentQuestion14);
            updateNavigation14();
        } else {
            submitQuiz14();
        }
    }

    function previousQuestion14() {
        if (currentQuestion14 > 0) {
            currentQuestion14--;
            showQuestion14(currentQuestion14);
            updateNavigation14();
        }
    }

    function updateNavigation14() {
        if (prevBtn14) prevBtn14.style.display = currentQuestion14 > 0 ? 'inline-block' : 'none';
        if (nextBtn14) nextBtn14.style.display = currentQuestion14 < questionCards14.length - 1 && userAnswers14[currentQuestion14] ? 'inline-block' : 'none';
        if (submitBtn14) submitBtn14.style.display = currentQuestion14 === questionCards14.length - 1 && userAnswers14[currentQuestion14] ? 'inline-block' : 'none';
    }

    function submitQuiz14() {
        score14 = userAnswers14.filter(answer => answer && answer.correct).length;
        showResults14();
    }

    function showResults14() {
        if (quizContainer14) quizContainer14.style.display = 'none';
        if (quizExplanation14) quizExplanation14.style.display = 'none';
        if (quizResults14) quizResults14.style.display = 'block';

        const navButtons = document.querySelector('.quiz-navigation');
        if (navButtons) navButtons.style.display = 'none';

        const scoreText = document.querySelector('.score-text');
        if (scoreText) scoreText.textContent = score14 + '/6';

        const performanceFeedback = document.querySelector('.performance-feedback');
        if (performanceFeedback) {
            let feedback = '';
            if (score14 === 6) feedback = '🎉 Perfect! You have mastered percentage calculations!';
            else if (score14 >= 4) feedback = '👍 Great job! You understand most percentage concepts.';
            else if (score14 >= 2) feedback = '📚 Good start! Review the percentage formulas and try again.';
            else feedback = '💪 Keep practicing! Focus on the basic percentage formula: Part/Whole × 100.';

            performanceFeedback.innerHTML = '<p>' + feedback + '</p>';
        }
    }

    function restartQuiz14() {
        quizStarted14 = false;
        currentQuestion14 = 0;
        userAnswers14 = [];
        score14 = 0;

        if (quizResults14) quizResults14.style.display = 'none';
        if (quizExplanation14) quizExplanation14.style.display = 'none';
        if (quizContainer14) quizContainer14.style.display = 'block';
        if (startBtn14) startBtn14.style.display = 'inline-block';

        const navButtons = document.querySelector('.quiz-navigation');
        if (navButtons) navButtons.style.display = 'flex';

        questionCards14.forEach(card => {
            card.classList.remove('active');
            const choices = card.querySelectorAll('.choice-btn');
            choices.forEach(choice => {
                choice.classList.remove('selected');
                choice.disabled = false;
            });
        });

        if (questionCards14[0]) questionCards14[0].classList.add('active');
        updateNavigation14();
    }

    function reviewAnswers14() {
        if (quizResults14) quizResults14.style.display = 'none';
        if (quizContainer14) quizContainer14.style.display = 'block';

        questionCards14.forEach((card, index) => {
            const choices = card.querySelectorAll('.choice-btn');
            choices.forEach(choice => {
                choice.disabled = true;
                if (choice.dataset.correct === 'true') {
                    choice.style.backgroundColor = '#10b981';
                    choice.style.color = 'white';
                } else if (userAnswers14[index] && userAnswers14[index].selected === choice) {
                    choice.style.backgroundColor = '#ef4444';
                    choice.style.color = 'white';
                }
            });
        });

        currentQuestion14 = 0;
        showQuestion14(0);

        const navButtons = document.querySelector('.quiz-navigation');
        if (navButtons) navButtons.style.display = 'flex';
        if (prevBtn14) prevBtn14.style.display = 'none';
        if (nextBtn14) nextBtn14.style.display = questionCards14.length > 1 ? 'inline-block' : 'none';
        if (submitBtn14) submitBtn14.style.display = 'none';
        if (startBtn14) startBtn14.style.display = 'none';
    }

    window.restartQuiz14 = restartQuiz14;
    window.reviewAnswers14 = reviewAnswers14;
    window.nextQuestion14 = nextQuestion14;
});
</script>
    `
  },

  'exponents-roots': {
    title: 'Chapter 13: Exponents and Roots',
    duration: 26, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 13: <span style="color: #ef4444; font-weight: 600;">Exponents and Roots</span></h2>
    <p class="lesson-intro">Master the power rules and root operations that appear throughout ACT Math! From basic exponent rules to radical simplification, these skills are essential for algebra, functions, and advanced topics.</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 13 Learning Path: The 4 Essential Power & Root Skills</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> Exponent Rules → Master all 7 essential power laws</p>
        <p><strong>Part 2:</strong> Working with Radicals → Simplify and manipulate square roots</p>
        <p><strong>Part 3:</strong> Rational Exponents → Convert between radical and exponential forms</p>
        <p><strong>Part 4:</strong> Applications → Solve real ACT problems with exponents and roots</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #ef4444; font-weight: 600;">The 7 Essential Exponent Rules</span></h3>

    <div class="rules-box">
        <h4>The Complete Exponent Rule Set:</h4>
        <ol>
            <li><strong>Product Rule:</strong> a^m × a^n = a^(m+n)</li>
            <li><strong>Quotient Rule:</strong> a^m ÷ a^n = a^(m-n)</li>
            <li><strong>Power Rule:</strong> (a^m)^n = a^(mn)</li>
            <li><strong>Product to Power:</strong> (ab)^n = a^n × b^n</li>
            <li><strong>Quotient to Power:</strong> (a/b)^n = a^n ÷ b^n</li>
            <li><strong>Zero Exponent:</strong> a^0 = 1 (where a ≠ 0)</li>
            <li><strong>Negative Exponent:</strong> a^(-n) = 1/a^n</li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 1: Product Rule</h4>
        <p><strong>Problem:</strong> Simplify x^3 × x^5</p>
        <p><strong>Solution:</strong></p>
        <p>x^3 × x^5 = x^(3+5) = x^8</p>
        <p><em>When multiplying powers with the same base, add the exponents</em></p>
    </div>

    <div class="example-box">
        <h4>Example 2: Quotient Rule</h4>
        <p><strong>Problem:</strong> Simplify x^7 ÷ x^3</p>
        <p><strong>Solution:</strong></p>
        <p>x^7 ÷ x^3 = x^(7-3) = x^4</p>
        <p><em>When dividing powers with the same base, subtract the exponents</em></p>
    </div>

    <div class="example-box">
        <h4>Example 3: Power Rule</h4>
        <p><strong>Problem:</strong> Simplify (x^4)^3</p>
        <p><strong>Solution:</strong></p>
        <p>(x^4)^3 = x^(4×3) = x^12</p>
        <p><em>When raising a power to a power, multiply the exponents</em></p>
    </div>

    <div class="example-box">
        <h4>Example 4: Negative Exponents</h4>
        <p><strong>Problem:</strong> Simplify x^(-3)</p>
        <p><strong>Solution:</strong></p>
        <p>x^(-3) = 1/x^3</p>
        <p><em>Negative exponents mean "take the reciprocal"</em></p>
    </div>

    <div class="tip-box">
        <h4>🎯 Common Exponent Mistakes to Avoid</h4>
        <ul>
            <li><strong>DON'T</strong> add exponents when adding: x^2 + x^3 ≠ x^5</li>
            <li><strong>DON'T</strong> multiply the base: x^2 × x^3 ≠ x^6</li>
            <li><strong>DO</strong> remember: (xy)^2 = x^2y^2, not xy^2</li>
            <li><strong>DO</strong> remember: x^0 = 1, even when x is negative</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #ef4444; font-weight: 600;">Working with Radicals</span></h3>

    <div class="concept-box">
        <h4>💡 Square Root Basics</h4>
        <p><strong>√a × √b = √(ab)</strong></p>
        <p><strong>√a ÷ √b = √(a/b)</strong></p>
        <p><strong>√(a^2) = |a|</strong> (absolute value for even roots)</p>
    </div>

    <div class="rules-box">
        <h4>Simplifying Radicals - Step by Step:</h4>
        <ol>
            <li><strong>Find perfect square factors</strong> of the number under the radical</li>
            <li><strong>Extract perfect squares</strong> from under the radical</li>
            <li><strong>Simplify</strong> what's left under the radical</li>
            <li><strong>Multiply</strong> extracted factors outside the radical</li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 5: Simplifying Square Roots</h4>
        <p><strong>Problem:</strong> Simplify √72</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Factor 72 = 36 × 2 = 6² × 2</p>
        <p>Step 2: √72 = √(36 × 2) = √36 × √2</p>
        <p>Step 3: √72 = 6√2</p>
    </div>

    <div class="example-box">
        <h4>Example 6: Simplifying Variable Radicals</h4>
        <p><strong>Problem:</strong> Simplify √(x^8y^3)</p>
        <p><strong>Solution:</strong></p>
        <p>√(x^8y^3) = √(x^8) × √(y^3)</p>
        <p>= √((x^4)^2) × √(y^2 × y)</p>
        <p>= x^4 × √(y^2) × √y</p>
        <p>= x^4 × y × √y = x^4y√y</p>
    </div>

    <div class="example-box">
        <h4>Example 7: Adding and Subtracting Radicals</h4>
        <p><strong>Problem:</strong> Simplify 3√12 + 5√27 - 2√3</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Simplify each radical</p>
        <ul>
            <li>3√12 = 3√(4×3) = 3 × 2√3 = 6√3</li>
            <li>5√27 = 5√(9×3) = 5 × 3√3 = 15√3</li>
            <li>-2√3 stays the same</li>
        </ul>
        <p>Step 2: Combine like terms</p>
        <p>6√3 + 15√3 - 2√3 = (6 + 15 - 2)√3 = 19√3</p>
    </div>

    <div class="example-box">
        <h4>Example 8: Rationalizing Denominators</h4>
        <p><strong>Problem:</strong> Rationalize 6/√2</p>
        <p><strong>Solution:</strong></p>
        <p>Multiply both numerator and denominator by √2:</p>
        <p>6/√2 × √2/√2 = 6√2/2 = 3√2</p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #ef4444; font-weight: 600;">Rational Exponents</span></h3>

    <div class="concept-box">
        <h4>💡 Converting Between Forms</h4>
        <p><strong>a^(1/n) = ⁿ√a</strong> (nth root of a)</p>
        <p><strong>a^(m/n) = ⁿ√(a^m) = (ⁿ√a)^m</strong></p>
        <p><em>The denominator becomes the index of the radical</em></p>
    </div>

    <div class="rules-box">
        <h4>Common Rational Exponents:</h4>
        <ul>
            <li><strong>x^(1/2) = √x</strong></li>
            <li><strong>x^(1/3) = ³√x</strong></li>
            <li><strong>x^(2/3) = ³√(x²) = (³√x)²</strong></li>
            <li><strong>x^(-1/2) = 1/√x</strong></li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 9: Converting to Radical Form</h4>
        <p><strong>Problem:</strong> Write 8^(2/3) in radical form and evaluate</p>
        <p><strong>Solution:</strong></p>
        <p>8^(2/3) = ³√(8²) = ³√64</p>
        <p>Or: 8^(2/3) = (³√8)² = 2² = 4</p>
        <p><em>Both methods give the same answer: 4</em></p>
    </div>

    <div class="example-box">
        <h4>Example 10: Simplifying Rational Exponents</h4>
        <p><strong>Problem:</strong> Simplify x^(3/4) × x^(1/2)</p>
        <p><strong>Solution:</strong></p>
        <p>x^(3/4) × x^(1/2) = x^(3/4 + 1/2)</p>
        <p>= x^(3/4 + 2/4) = x^(5/4)</p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #ef4444; font-weight: 600;">ACT Applications</span></h3>

    <div class="tip-box">
        <h4>🎯 Common ACT Exponent & Root Problems</h4>
        <ol>
            <li><strong>Simplifying expressions</strong> with multiple exponent rules</li>
            <li><strong>Solving equations</strong> with radicals or rational exponents</li>
            <li><strong>Exponential growth/decay</strong> in word problems</li>
            <li><strong>Geometric sequences</strong> with exponential terms</li>
            <li><strong>Scientific notation</strong> calculations</li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 11: Complex Simplification</h4>
        <p><strong>Problem:</strong> Simplify (2x^3y^(-2))^4 ÷ (x^(-1)y^5)^2</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Apply power rules</p>
        <p>Numerator: (2x^3y^(-2))^4 = 2^4 × x^12 × y^(-8) = 16x^12y^(-8)</p>
        <p>Denominator: (x^(-1)y^5)^2 = x^(-2) × y^10</p>

        <p>Step 2: Divide</p>
        <p>16x^12y^(-8) ÷ x^(-2)y^10 = 16x^(12-(-2))y^(-8-10)</p>
        <p>= 16x^14y^(-18) = 16x^14/y^18</p>
    </div>

    <div class="example-box">
        <h4>Example 12: Exponential Growth</h4>
        <p><strong>Problem:</strong> A bacteria culture doubles every 3 hours. If it starts with 100 bacteria, how many bacteria are there after 12 hours?</p>
        <p><strong>Solution:</strong></p>
        <p>Number of doubling periods = 12 ÷ 3 = 4</p>
        <p>Final amount = Initial × 2^(number of periods)</p>
        <p>Final amount = 100 × 2^4 = 100 × 16 = 1,600 bacteria</p>
    </div>

    <div class="example-box">
        <h4>Example 13: Scientific Notation</h4>
        <p><strong>Problem:</strong> Calculate (3.2 × 10^8) × (1.5 × 10^(-4))</p>
        <p><strong>Solution:</strong></p>
        <p>(3.2 × 10^8) × (1.5 × 10^(-4))</p>
        <p>= (3.2 × 1.5) × (10^8 × 10^(-4))</p>
        <p>= 4.8 × 10^(8+(-4))</p>
        <p>= 4.8 × 10^4 = 48,000</p>
    </div>

    <div class="example-box">
        <h4>Example 14: Solving Radical Equations</h4>
        <p><strong>Problem:</strong> Solve √(2x + 1) = 5</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Square both sides</p>
        <p>(√(2x + 1))² = 5²</p>
        <p>2x + 1 = 25</p>
        <p>Step 2: Solve for x</p>
        <p>2x = 24</p>
        <p>x = 12</p>
        <p>Step 3: Check: √(2(12) + 1) = √25 = 5 ✓</p>
    </div>
</div>

<div class="section">
    <h3>🔗 Power & Root Summary</h3>

    <div class="rules-box">
        <h4>Quick Reference Card:</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
                <p><strong>Exponent Operations:</strong></p>
                <ul>
                    <li>a^m × a^n = a^(m+n)</li>
                    <li>a^m ÷ a^n = a^(m-n)</li>
                    <li>(a^m)^n = a^(mn)</li>
                    <li>a^0 = 1</li>
                    <li>a^(-n) = 1/a^n</li>
                </ul>
            </div>
            <div>
                <p><strong>Radical Operations:</strong></p>
                <ul>
                    <li>√a × √b = √(ab)</li>
                    <li>√a ÷ √b = √(a/b)</li>
                    <li>a^(1/n) = ⁿ√a</li>
                    <li>a^(m/n) = ⁿ√(a^m)</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Exponents and roots are fundamental to ACT success! Master the 7 exponent rules, learn to simplify radicals by factoring out perfect squares, understand rational exponents as another form of radicals, and practice complex applications. These skills appear in algebra, functions, and word problems throughout the test!</p>
</div>

<!-- QUIZ_16 -->
    `
  },

  'statistics-basics': {
    title: 'Chapter 12: Mean, Median, Mode, and Range',
    duration: 20, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 12: <span style="color: #06b6d4; font-weight: 600;">Mean, Median, Mode, and Range</span></h2>
    <p class="lesson-intro">Master the four essential statistics that appear on <strong>every ACT Math test</strong>! From calculating averages to understanding data spread, these fundamental concepts are your gateway to statistics success.</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 12 Learning Path: The 4 Essential Statistics</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Mean:</strong> The average value → Add all values and divide by count</p>
        <p><strong>Median:</strong> The middle value → Find the center when data is ordered</p>
        <p><strong>Mode:</strong> The most frequent value → Which number appears most often</p>
        <p><strong>Range:</strong> The spread → Difference between highest and lowest values</p>
    </div>
</div>

<div class="section">
    <h3><span style="color: #06b6d4; font-weight: 600;">Mean</span> - The Average</h3>

    <div class="concept-box">
        <h4>💡 The Formula</h4>
        <p><strong>Mean = (Sum of all values) ÷ (Number of values)</strong></p>
        <p><em>Add everything up, then divide by how many numbers you have</em></p>
    </div>

    <div class="example-box">
        <h4>Example 1: Basic Mean</h4>
        <p><strong>Problem:</strong> Find the mean of 3, 7, 8, 12, 15</p>
        <p><strong>Solution:</strong></p>
        <p>Sum = 3 + 7 + 8 + 12 + 15 = 45</p>
        <p>Count = 5 values</p>
        <p>Mean = 45 ÷ 5 = 9</p>
    </div>

    <div class="example-box">
        <h4>Example 2: Finding a Missing Value</h4>
        <p><strong>Problem:</strong> Four test scores have a mean of 85. If three scores are 78, 82, and 90, what is the fourth score?</p>
        <p><strong>Solution:</strong></p>
        <p>Total needed = Mean × Count = 85 × 4 = 340</p>
        <p>Sum of known scores = 78 + 82 + 90 = 250</p>
        <p>Fourth score = 340 - 250 = 90</p>
    </div>

    <div class="tip-box">
        <h4>🎯 Mean Shortcuts</h4>
        <ul>
            <li><strong>Use your calculator:</strong> Add all values, then divide</li>
            <li><strong>Check reasonableness:</strong> Mean should be between the lowest and highest values</li>
            <li><strong>Weighted averages:</strong> Some values might count more than others</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3><span style="color: #06b6d4; font-weight: 600;">Median</span> - The Middle Value</h3>

    <div class="concept-box">
        <h4>💡 The Process</h4>
        <ol>
            <li><strong>Order the data</strong> from smallest to largest</li>
            <li><strong>Find the middle position:</strong></li>
            <ul>
                <li><strong>Odd number of values:</strong> Middle value is the median</li>
                <li><strong>Even number of values:</strong> Average the two middle values</li>
            </ul>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 3: Median with Odd Count</h4>
        <p><strong>Problem:</strong> Find the median of 12, 3, 8, 15, 7</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Order the data: 3, 7, 8, 12, 15</p>
        <p>Step 2: Find the middle (5 values, so position 3)</p>
        <p><strong>Median = 8</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 4: Median with Even Count</h4>
        <p><strong>Problem:</strong> Find the median of 4, 9, 2, 12, 6, 8</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Order the data: 2, 4, 6, 8, 9, 12</p>
        <p>Step 2: Find the two middle values (positions 3 and 4): 6 and 8</p>
        <p>Step 3: Average them: (6 + 8) ÷ 2 = 7</p>
        <p><strong>Median = 7</strong></p>
    </div>

    <div class="tip-box">
        <h4>🎯 Median Tips</h4>
        <ul>
            <li><strong>Always order first!</strong> Don't try to find median without ordering</li>
            <li><strong>Count carefully:</strong> Make sure you have all values</li>
            <li><strong>Remember:</strong> Median isn't affected by extreme values (outliers)</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3><span style="color: #06b6d4; font-weight: 600;">Mode</span> - The Most Frequent</h3>

    <div class="concept-box">
        <h4>💡 The Definition</h4>
        <p><strong>Mode = the value that appears most frequently in the data set</strong></p>
        <p><em>A data set can have no mode, one mode, or multiple modes</em></p>
    </div>

    <div class="rules-box">
        <h4>Mode Possibilities:</h4>
        <ul>
            <li><strong>No Mode:</strong> All values appear the same number of times</li>
            <li><strong>One Mode (Unimodal):</strong> One value appears most frequently</li>
            <li><strong>Two Modes (Bimodal):</strong> Two values tie for most frequent</li>
            <li><strong>Multiple Modes (Multimodal):</strong> More than two values tie</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 5: Single Mode</h4>
        <p><strong>Problem:</strong> Find the mode of 3, 7, 3, 9, 3, 5, 8</p>
        <p><strong>Solution:</strong></p>
        <p>Count frequencies: 3 appears 3 times, all others appear once</p>
        <p><strong>Mode = 3</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 6: Bimodal Data</h4>
        <p><strong>Problem:</strong> Find the mode of 2, 5, 7, 5, 9, 2, 8</p>
        <p><strong>Solution:</strong></p>
        <p>Count frequencies: 2 appears 2 times, 5 appears 2 times, others appear once</p>
        <p><strong>Modes = 2 and 5</strong> (bimodal)</p>
    </div>

    <div class="example-box">
        <h4>Example 7: No Mode</h4>
        <p><strong>Problem:</strong> Find the mode of 1, 3, 5, 7, 9</p>
        <p><strong>Solution:</strong></p>
        <p>Each value appears exactly once</p>
        <p><strong>No mode</strong></p>
    </div>
</div>

<div class="section">
    <h3><span style="color: #06b6d4; font-weight: 600;">Range</span> - The Spread</h3>

    <div class="concept-box">
        <h4>💡 The Formula</h4>
        <p><strong>Range = Highest Value - Lowest Value</strong></p>
        <p><em>Range tells you how spread out your data is</em></p>
    </div>

    <div class="example-box">
        <h4>Example 8: Calculating Range</h4>
        <p><strong>Problem:</strong> Find the range of 15, 3, 22, 8, 19, 6</p>
        <p><strong>Solution:</strong></p>
        <p>Highest value = 22</p>
        <p>Lowest value = 3</p>
        <p>Range = 22 - 3 = 19</p>
    </div>

    <div class="tip-box">
        <h4>🎯 Range Insights</h4>
        <ul>
            <li><strong>Small range:</strong> Data points are close together</li>
            <li><strong>Large range:</strong> Data points are spread out</li>
            <li><strong>Zero range:</strong> All values are identical</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3>🔗 Comparing the Four Statistics</h3>

    <div class="example-box">
        <h4>Example 9: Complete Analysis</h4>
        <p><strong>Problem:</strong> For the data set 2, 4, 4, 6, 7, 9, 12, find the mean, median, mode, and range.</p>
        <p><strong>Solutions:</strong></p>

        <p><strong>Mean:</strong></p>
        <p>Sum = 2 + 4 + 4 + 6 + 7 + 9 + 12 = 44</p>
        <p>Mean = 44 ÷ 7 ≈ 6.29</p>

        <p><strong>Median:</strong></p>
        <p>Data is already ordered: 2, 4, 4, 6, 7, 9, 12</p>
        <p>Middle value (position 4) = 6</p>

        <p><strong>Mode:</strong></p>
        <p>4 appears twice, all others appear once</p>
        <p>Mode = 4</p>

        <p><strong>Range:</strong></p>
        <p>Range = 12 - 2 = 10</p>
    </div>
</div>

<div class="section">
    <h3>📊 ACT Statistics Applications</h3>

    <div class="example-box">
        <h4>Example 10: Test Score Problem</h4>
        <p><strong>Problem:</strong> Sarah's test scores are 88, 92, 85, 90, and 85. What is the difference between her mean and median scores?</p>
        <p><strong>Solution:</strong></p>

        <p><strong>Mean:</strong></p>
        <p>Sum = 88 + 92 + 85 + 90 + 85 = 440</p>
        <p>Mean = 440 ÷ 5 = 88</p>

        <p><strong>Median:</strong></p>
        <p>Ordered: 85, 85, 88, 90, 92</p>
        <p>Median = 88 (middle value)</p>

        <p><strong>Difference = |88 - 88| = 0</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 11: Which Statistic to Use?</h4>
        <p><strong>Problem:</strong> A company's salaries are: $30K, $32K, $35K, $38K, $200K. Which measure of central tendency best represents typical salary?</p>
        <p><strong>Analysis:</strong></p>
        <ul>
            <li><strong>Mean = ($30K + $32K + $35K + $38K + $200K) ÷ 5 = $67K</strong></li>
            <li><strong>Median = $35K</strong> (middle value)</li>
            <li><strong>Mode = No mode</strong> (all values appear once)</li>
        </ul>
        <p><strong>Best choice: Median ($35K)</strong> because it's not affected by the $200K outlier</p>
    </div>
</div>

<div class="section">
    <h3>📈 Quick Reference Summary</h3>

    <div class="rules-box">
        <h4>Statistics Cheat Sheet:</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
                <p><strong>Mean (Average):</strong></p>
                <ul>
                    <li>Add all values ÷ count</li>
                    <li>Affected by outliers</li>
                    <li>Most common measure</li>
                </ul>

                <p><strong>Mode (Most Frequent):</strong></p>
                <ul>
                    <li>Value appearing most often</li>
                    <li>Can have 0, 1, or many modes</li>
                    <li>Good for categorical data</li>
                </ul>
            </div>
            <div>
                <p><strong>Median (Middle):</strong></p>
                <ul>
                    <li>Middle value when ordered</li>
                    <li>Not affected by outliers</li>
                    <li>Average of two middle if even count</li>
                </ul>

                <p><strong>Range (Spread):</strong></p>
                <ul>
                    <li>Highest - Lowest value</li>
                    <li>Measures data spread</li>
                    <li>Sensitive to outliers</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Master these four essential statistics for ACT success! Remember: Mean is the average (sum÷count), Median is the middle value (order first!), Mode is most frequent (can be none, one, or multiple), and Range is the spread (high-low). Practice identifying which measure best represents data, especially when outliers are present!</p>
</div>

<!-- QUIZ_17 -->
    `
  },

  'number-theory': {
    title: 'Chapter 8: Number Theory',
    duration: 22, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 8: <span style="color: #f59e0b; font-weight: 600;">Number Theory</span></h2>
    <p class="lesson-intro">Master the different types of numbers and their properties that appear throughout ACT Math! From integers to prime numbers, understanding number classifications unlocks solutions across all math topics.</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 8 Learning Path: The 5 Essential Number Concepts</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> Number Classifications → Integers, rationals, irrationals, and more</p>
        <p><strong>Part 2:</strong> Prime & Composite Numbers → Factorization and divisibility</p>
        <p><strong>Part 3:</strong> GCD & LCM → Greatest Common Divisor and Least Common Multiple</p>
        <p><strong>Part 4:</strong> Even & Odd Properties → Rules for arithmetic operations</p>
        <p><strong>Part 5:</strong> Number Line & Absolute Value → Distance and ordering</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #f59e0b; font-weight: 600;">Number Classifications</span></h3>

    <div class="rules-box">
        <h4>The Number Hierarchy:</h4>
        <ul>
            <li><strong>Natural Numbers:</strong> 1, 2, 3, 4, 5, ... (counting numbers)</li>
            <li><strong>Whole Numbers:</strong> 0, 1, 2, 3, 4, ... (natural numbers + zero)</li>
            <li><strong>Integers:</strong> ..., -2, -1, 0, 1, 2, ... (whole numbers + negatives)</li>
            <li><strong>Rational Numbers:</strong> Numbers that can be written as a/b where b ≠ 0</li>
            <li><strong>Irrational Numbers:</strong> Numbers that cannot be written as fractions (π, √2, e)</li>
            <li><strong>Real Numbers:</strong> All rational and irrational numbers</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 1: Classifying Numbers</h4>
        <p><strong>Problem:</strong> Classify each number: 5, -3, 0, 1/2, √16, √7, π</p>
        <p><strong>Solutions:</strong></p>
        <ul>
            <li><strong>5:</strong> Natural, whole, integer, rational, real</li>
            <li><strong>-3:</strong> Integer, rational, real</li>
            <li><strong>0:</strong> Whole, integer, rational, real</li>
            <li><strong>1/2:</strong> Rational, real</li>
            <li><strong>√16 = 4:</strong> Natural, whole, integer, rational, real</li>
            <li><strong>√7:</strong> Irrational, real</li>
            <li><strong>π:</strong> Irrational, real</li>
        </ul>
    </div>

    <div class="tip-box">
        <h4>🎯 Quick Classification Tests</h4>
        <ul>
            <li><strong>Rational:</strong> Can you write it as a fraction? (includes terminating and repeating decimals)</li>
            <li><strong>Integer:</strong> Is it a whole number (positive, negative, or zero)?</li>
            <li><strong>Natural:</strong> Is it a positive counting number?</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #f59e0b; font-weight: 600;">Prime & Composite Numbers</span></h3>

    <div class="concept-box">
        <h4>💡 Key Definitions</h4>
        <p><strong>Prime Number:</strong> A natural number greater than 1 with exactly two factors: 1 and itself</p>
        <p><strong>Composite Number:</strong> A natural number greater than 1 with more than two factors</p>
        <p><strong>Special Cases:</strong> 1 is neither prime nor composite; 2 is the only even prime</p>
    </div>

    <div class="rules-box">
        <h4>First 15 Prime Numbers:</h4>
        <p><strong>2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47</strong></p>
        <p><em>Memorize at least the first 10 for quick factorization</em></p>
    </div>

    <div class="example-box">
        <h4>Example 2: Prime Factorization</h4>
        <p><strong>Problem:</strong> Find the prime factorization of 72</p>
        <p><strong>Solution:</strong></p>
        <p>72 = 8 × 9 = (2³) × (3²) = 2³ × 3²</p>
        <p>Or using factor tree:</p>
        <p>72 → 8 × 9 → (2 × 4) × (3 × 3) → 2 × (2 × 2) × 3 × 3 = 2³ × 3²</p>
    </div>

    <div class="example-box">
        <h4>Example 3: Testing for Primality</h4>
        <p><strong>Problem:</strong> Is 91 prime or composite?</p>
        <p><strong>Solution:</strong></p>
        <p>Test divisibility by primes up to √91 ≈ 9.5</p>
        <p>Test: 2 (no), 3 (no), 5 (no), 7 (yes!)</p>
        <p>91 ÷ 7 = 13, so 91 = 7 × 13</p>
        <p><strong>91 is composite</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #f59e0b; font-weight: 600;">GCD & LCM</span></h3>

    <div class="concept-box">
        <h4>💡 Definitions</h4>
        <p><strong>GCD (Greatest Common Divisor):</strong> Largest number that divides both numbers evenly</p>
        <p><strong>LCM (Least Common Multiple):</strong> Smallest positive number that both numbers divide evenly</p>
        <p><strong>Key Relationship:</strong> GCD(a,b) × LCM(a,b) = a × b</p>
    </div>

    <div class="example-box">
        <h4>Example 4: Finding GCD</h4>
        <p><strong>Problem:</strong> Find GCD(48, 18)</p>
        <p><strong>Method 1 - Prime Factorization:</strong></p>
        <p>48 = 2⁴ × 3¹</p>
        <p>18 = 2¹ × 3²</p>
        <p>GCD = 2¹ × 3¹ = 6 (take lowest powers)</p>

        <p><strong>Method 2 - Euclidean Algorithm:</strong></p>
        <p>48 = 18 × 2 + 12</p>
        <p>18 = 12 × 1 + 6</p>
        <p>12 = 6 × 2 + 0</p>
        <p>GCD = 6 (last non-zero remainder)</p>
    </div>

    <div class="example-box">
        <h4>Example 5: Finding LCM</h4>
        <p><strong>Problem:</strong> Find LCM(48, 18)</p>
        <p><strong>Method 1 - Prime Factorization:</strong></p>
        <p>48 = 2⁴ × 3¹</p>
        <p>18 = 2¹ × 3²</p>
        <p>LCM = 2⁴ × 3² = 16 × 9 = 144 (take highest powers)</p>

        <p><strong>Method 2 - Using GCD:</strong></p>
        <p>LCM = (48 × 18) ÷ GCD(48, 18) = 864 ÷ 6 = 144</p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #f59e0b; font-weight: 600;">Even & Odd Properties</span></h3>

    <div class="rules-box">
        <h4>Essential Even/Odd Rules:</h4>

        <p><strong>Addition & Subtraction:</strong></p>
        <ul>
            <li>Even ± Even = Even</li>
            <li>Odd ± Odd = Even</li>
            <li>Even ± Odd = Odd</li>
        </ul>

        <p><strong>Multiplication:</strong></p>
        <ul>
            <li>Even × Any Integer = Even</li>
            <li>Odd × Odd = Odd</li>
        </ul>

        <p><strong>Powers:</strong></p>
        <ul>
            <li>Even^n = Even (for any positive integer n)</li>
            <li>Odd^n = Odd (for any positive integer n)</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 6: Even/Odd Applications</h4>
        <p><strong>Problem:</strong> If a and b are odd integers, determine if each expression is even or odd:</p>
        <p>a) a + b</p>
        <p>b) 3a + 2b</p>
        <p>c) a²b³</p>

        <p><strong>Solutions:</strong></p>
        <p>a) Odd + Odd = Even</p>
        <p>b) 3a + 2b = Odd×Odd + Even×Odd = Odd + Even = Odd</p>
        <p>c) a²b³ = Odd² × Odd³ = Odd × Odd = Odd</p>
    </div>
</div>

<div class="section">
    <h3>Part 5: <span style="color: #f59e0b; font-weight: 600;">Number Line & Absolute Value</span></h3>

    <div class="concept-box">
        <h4>💡 Absolute Value</h4>
        <p><strong>|x| = distance from x to 0 on the number line</strong></p>
        <p>|x| = x if x ≥ 0</p>
        <p>|x| = -x if x < 0</p>
    </div>

    <div class="rules-box">
        <h4>Absolute Value Properties:</h4>
        <ul>
            <li><strong>|x| ≥ 0</strong> for all real x</li>
            <li><strong>|xy| = |x| × |y|</strong></li>
            <li><strong>|x/y| = |x| ÷ |y|</strong> (y ≠ 0)</li>
            <li><strong>|x + y| ≤ |x| + |y|</strong> (triangle inequality)</li>
            <li><strong>Distance between a and b = |a - b|</strong></li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 7: Absolute Value Calculations</h4>
        <p><strong>Problem:</strong> Evaluate each expression:</p>
        <p>a) |-5| + |3|</p>
        <p>b) |4 - 9|</p>
        <p>c) |-2| × |-7|</p>

        <p><strong>Solutions:</strong></p>
        <p>a) |-5| + |3| = 5 + 3 = 8</p>
        <p>b) |4 - 9| = |-5| = 5</p>
        <p>c) |-2| × |-7| = 2 × 7 = 14</p>
    </div>

    <div class="example-box">
        <h4>Example 8: Distance on Number Line</h4>
        <p><strong>Problem:</strong> Find the distance between -3 and 7 on the number line</p>
        <p><strong>Solution:</strong></p>
        <p>Distance = |7 - (-3)| = |7 + 3| = |10| = 10</p>
        <p>Or: Distance = |-3 - 7| = |-10| = 10</p>
    </div>
</div>

<div class="section">
    <h3>🔗 ACT Applications</h3>

    <div class="example-box">
        <h4>Example 9: Number Theory Word Problem</h4>
        <p><strong>Problem:</strong> Two bells ring at intervals of 12 and 18 minutes. If they ring together at 3:00 PM, when will they next ring together?</p>
        <p><strong>Solution:</strong></p>
        <p>Find LCM(12, 18):</p>
        <p>12 = 2² × 3</p>
        <p>18 = 2 × 3²</p>
        <p>LCM = 2² × 3² = 36 minutes</p>
        <p><strong>They will ring together again at 3:36 PM</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 10: Consecutive Integer Problem</h4>
        <p><strong>Problem:</strong> The sum of three consecutive odd integers is 57. Find the integers.</p>
        <p><strong>Solution:</strong></p>
        <p>Let the integers be n, n+2, n+4 (consecutive odds)</p>
        <p>n + (n+2) + (n+4) = 57</p>
        <p>3n + 6 = 57</p>
        <p>3n = 51</p>
        <p>n = 17</p>
        <p><strong>The integers are 17, 19, and 21</strong></p>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Number theory provides the foundation for all ACT Math! Master number classifications, prime factorization, GCD/LCM calculations, even/odd properties, and absolute value. These concepts appear in algebra, geometry, and word problems throughout the test. Understanding number properties helps you solve problems faster and avoid common mistakes!</p>
</div>

<!-- QUIZ_14 -->
    `
  },

  'ratios-proportions': {
    title: 'Chapter 10: Ratios and Proportions',
    duration: 24, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 10: <span style="color: #10b981; font-weight: 600;">Ratios and Proportions</span></h2>
    <p class="lesson-intro">Master ratios, proportions, and rate problems that appear on <strong>every ACT Math test</strong>! From simple ratios to complex rate problems, these skills unlock solutions across geometry, word problems, and real-world applications.</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 10 Learning Path: The 4 Essential Ratio Concepts</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> Basic Ratios → Understanding and simplifying ratios</p>
        <p><strong>Part 2:</strong> Proportions → Setting up and solving proportion equations</p>
        <p><strong>Part 3:</strong> Rate Problems → Speed, unit rates, and conversions</p>
        <p><strong>Part 4:</strong> Similar Figures → Using proportions in geometry</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #10b981; font-weight: 600;">Basic Ratios</span></h3>

    <div class="concept-box">
        <h4>💡 What is a Ratio?</h4>
        <p><strong>A ratio compares two quantities using division</strong></p>
        <p><strong>Ways to write ratios:</strong> 3:4, 3 to 4, 3/4</p>
        <p><em>The ratio 3:4 means "3 parts of the first quantity for every 4 parts of the second"</em></p>
    </div>

    <div class="rules-box">
        <h4>Working with Ratios:</h4>
        <ol>
            <li><strong>Simplify ratios</strong> by dividing both parts by their GCD</li>
            <li><strong>Ratios can be scaled up or down</strong> by multiplying both parts by the same number</li>
            <li><strong>Order matters:</strong> 3:4 is different from 4:3</li>
            <li><strong>Part-to-part vs part-to-whole</strong> ratios have different meanings</li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 1: Simplifying Ratios</h4>
        <p><strong>Problem:</strong> Simplify the ratio 18:24</p>
        <p><strong>Solution:</strong></p>
        <p>Find GCD of 18 and 24:</p>
        <p>18 = 2 × 3²</p>
        <p>24 = 2³ × 3</p>
        <p>GCD = 2 × 3 = 6</p>
        <p>18:24 = (18÷6):(24÷6) = 3:4</p>
    </div>

    <div class="example-box">
        <h4>Example 2: Part-to-Whole Ratios</h4>
        <p><strong>Problem:</strong> In a class of 30 students, the ratio of boys to girls is 3:2. How many boys and girls are there?</p>
        <p><strong>Solution:</strong></p>
        <p>Total ratio parts = 3 + 2 = 5</p>
        <p>Each part represents 30 ÷ 5 = 6 students</p>
        <p>Boys = 3 × 6 = 18 students</p>
        <p>Girls = 2 × 6 = 12 students</p>
        <p>Check: 18 + 12 = 30 ✓</p>
    </div>

    <div class="tip-box">
        <h4>🎯 Ratio Problem Strategy</h4>
        <ol>
            <li><strong>Identify</strong> what quantities are being compared</li>
            <li><strong>Determine</strong> if it's part-to-part or part-to-whole</li>
            <li><strong>Set up</strong> the ratio using consistent units</li>
            <li><strong>Solve</strong> using cross multiplication or scaling</li>
        </ol>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #10b981; font-weight: 600;">Proportions</span></h3>

    <div class="concept-box">
        <h4>💡 What is a Proportion?</h4>
        <p><strong>A proportion is an equation stating that two ratios are equal</strong></p>
        <p><strong>Form:</strong> a/b = c/d or a:b = c:d</p>
        <p><strong>Cross multiplication:</strong> If a/b = c/d, then ad = bc</p>
    </div>

    <div class="example-box">
        <h4>Example 3: Solving Basic Proportions</h4>
        <p><strong>Problem:</strong> Solve x/6 = 4/9</p>
        <p><strong>Solution:</strong></p>
        <p>Cross multiply: 9x = 6 × 4</p>
        <p>9x = 24</p>
        <p>x = 24/9 = 8/3</p>
    </div>

    <div class="example-box">
        <h4>Example 4: Word Problem with Proportions</h4>
        <p><strong>Problem:</strong> If 3 pounds of apples cost $4.50, how much do 8 pounds cost?</p>
        <p><strong>Solution:</strong></p>
        <p>Set up proportion: 3 pounds/$4.50 = 8 pounds/x</p>
        <p>Cross multiply: 3x = 4.50 × 8</p>
        <p>3x = 36</p>
        <p>x = $12</p>
    </div>

    <div class="example-box">
        <h4>Example 5: Recipe Proportions</h4>
        <p><strong>Problem:</strong> A recipe for 4 servings uses 2.5 cups of flour. How much flour is needed for 10 servings?</p>
        <p><strong>Solution:</strong></p>
        <p>Set up proportion: 4 servings/2.5 cups = 10 servings/x cups</p>
        <p>Cross multiply: 4x = 2.5 × 10</p>
        <p>4x = 25</p>
        <p>x = 6.25 cups</p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #10b981; font-weight: 600;">Rate Problems</span></h3>

    <div class="concept-box">
        <h4>💡 Understanding Rates</h4>
        <p><strong>Rate = a ratio that compares two different units</strong></p>
        <p><strong>Common rates:</strong> speed (miles/hour), price (dollars/pound), density (mass/volume)</p>
        <p><strong>Key formula:</strong> Distance = Rate × Time</p>
    </div>

    <div class="rules-box">
        <h4>Rate Problem Types:</h4>
        <ul>
            <li><strong>Unit Rate:</strong> Rate with denominator of 1 (miles per hour, cost per item)</li>
            <li><strong>Speed Problems:</strong> d = rt, solve for any missing variable</li>
            <li><strong>Work Rate:</strong> Combined rates when working together</li>
            <li><strong>Unit Conversion:</strong> Converting between different units</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 6: Speed and Distance</h4>
        <p><strong>Problem:</strong> A car travels 240 miles in 4 hours. What is its average speed?</p>
        <p><strong>Solution:</strong></p>
        <p>Using d = rt:</p>
        <p>240 = r × 4</p>
        <p>r = 240 ÷ 4 = 60 mph</p>
    </div>

    <div class="example-box">
        <h4>Example 7: Unit Rate Problem</h4>
        <p><strong>Problem:</strong> If 5 notebooks cost $12.75, what is the cost per notebook?</p>
        <p><strong>Solution:</strong></p>
        <p>Unit rate = Total cost ÷ Number of items</p>
        <p>Unit rate = $12.75 ÷ 5 = $2.55 per notebook</p>
    </div>

    <div class="example-box">
        <h4>Example 8: Combined Work Rate</h4>
        <p><strong>Problem:</strong> Sarah can paint a fence in 6 hours, and Mike can paint the same fence in 4 hours. How long will it take if they work together?</p>
        <p><strong>Solution:</strong></p>
        <p>Sarah's rate: 1/6 fence per hour</p>
        <p>Mike's rate: 1/4 fence per hour</p>
        <p>Combined rate: 1/6 + 1/4 = 2/12 + 3/12 = 5/12 fence per hour</p>
        <p>Time = Work ÷ Rate = 1 ÷ (5/12) = 12/5 = 2.4 hours</p>
    </div>

    <div class="example-box">
        <h4>Example 9: Unit Conversions</h4>
        <p><strong>Problem:</strong> Convert 72 kilometers per hour to meters per second</p>
        <p><strong>Solution:</strong></p>
        <p>72 km/hr × (1000 m/1 km) × (1 hr/3600 sec)</p>
        <p>= 72 × 1000 ÷ 3600</p>
        <p>= 72000 ÷ 3600 = 20 m/s</p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #10b981; font-weight: 600;">Similar Figures</span></h3>

    <div class="concept-box">
        <h4>💡 Similar Figures</h4>
        <p><strong>Similar figures have the same shape but different sizes</strong></p>
        <p><strong>Corresponding sides are proportional</strong></p>
        <p><strong>Scale factor = ratio of corresponding sides</strong></p>
    </div>

    <div class="rules-box">
        <h4>Similar Figure Properties:</h4>
        <ul>
            <li><strong>Corresponding angles are equal</strong></li>
            <li><strong>Corresponding sides are proportional</strong></li>
            <li><strong>Ratio of areas = (scale factor)²</strong></li>
            <li><strong>Ratio of volumes = (scale factor)³</strong></li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 10: Similar Triangles</h4>
        <p><strong>Problem:</strong> Two similar triangles have corresponding sides of 6 cm and 9 cm. If the smaller triangle has a perimeter of 18 cm, what is the perimeter of the larger triangle?</p>
        <p><strong>Solution:</strong></p>
        <p>Scale factor = 9/6 = 3/2</p>
        <p>Since perimeters are linear measurements:</p>
        <p>Larger perimeter = 18 × (3/2) = 27 cm</p>
    </div>

    <div class="example-box">
        <h4>Example 11: Similar Rectangles and Area</h4>
        <p><strong>Problem:</strong> Two similar rectangles have a scale factor of 2:3. If the smaller rectangle has an area of 8 square units, what is the area of the larger rectangle?</p>
        <p><strong>Solution:</strong></p>
        <p>Area ratio = (scale factor)² = (3/2)² = 9/4</p>
        <p>Larger area = 8 × (9/4) = 18 square units</p>
    </div>
</div>

<div class="section">
    <h3>🔗 Advanced Applications</h3>

    <div class="example-box">
        <h4>Example 12: Map Scale Problem</h4>
        <p><strong>Problem:</strong> On a map, 1 inch represents 50 miles. If two cities are 3.5 inches apart on the map, what is the actual distance?</p>
        <p><strong>Solution:</strong></p>
        <p>Set up proportion: 1 inch/50 miles = 3.5 inches/x miles</p>
        <p>Cross multiply: x = 50 × 3.5 = 175 miles</p>
    </div>

    <div class="example-box">
        <h4>Example 13: Mixture Problem</h4>
        <p><strong>Problem:</strong> A 20% salt solution is mixed with a 60% salt solution to create 100 liters of a 40% salt solution. How many liters of each solution are needed?</p>
        <p><strong>Solution:</strong></p>
        <p>Let x = liters of 20% solution, then (100-x) = liters of 60% solution</p>
        <p>0.20x + 0.60(100-x) = 0.40(100)</p>
        <p>0.20x + 60 - 0.60x = 40</p>
        <p>-0.40x = -20</p>
        <p>x = 50</p>
        <p><strong>Need 50 L of 20% solution and 50 L of 60% solution</strong></p>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Ratios and proportions are everywhere on the ACT! Master setting up proportions with cross multiplication, solving rate problems using d=rt, understanding unit rates and conversions, and applying proportions to similar figures. These skills connect algebra, geometry, and word problems. Remember: identify the relationship, set up the proportion correctly, and cross multiply to solve!</p>
</div>

<!-- QUIZ_18 -->
    `
  },

  'functions': {
    title: 'Chapter 11: Functions',
    duration: 26, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 11: <span style="color: #8b5cf6; font-weight: 600;">Functions</span></h2>
    <p class="lesson-intro">Master function notation, evaluation, and transformations that appear on <strong>every ACT Math test</strong>! Functions connect algebra and coordinate geometry, unlocking solutions across multiple math topics.</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 11 Learning Path: The 4 Essential Function Skills</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> Function Notation → Understanding f(x) and evaluation</p>
        <p><strong>Part 2:</strong> Domain and Range → Input and output values</p>
        <p><strong>Part 3:</strong> Function Operations → Addition, composition, and inverses</p>
        <p><strong>Part 4:</strong> Transformations → Shifting, stretching, and reflecting functions</p>
    </div>
            </div>
            <div class="question-content">
                <h4>Simplifying Ratios</h4>
                <p>What is the simplified form of the ratio 24:36?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="Close, but not fully simplified. Both 6 and 9 can be divided by 3 to get 2:3.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">6:9</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This isn't simplified. We need to find the GCD of 24 and 36, which is 12.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">12:18</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Perfect! GCD of 24 and 36 is 12. So 24÷12 : 36÷12 = 2:3.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">2:3</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This is inverted. The correct simplified ratio is 2:3, not 3:2.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">3:2</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="2">
            <div class="question-header">
                <span class="question-number">Question 2 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 33.33%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Proportion Problem</h4>
                <p>If 3 pounds of apples cost $4.50, how much do 8 pounds cost?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="This would be the cost if the rate were $1.50 per pound, but it's actually $1.50 per pound.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">$10.50</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Excellent! Set up proportion: 3/4.50 = 8/x. Cross multiply: 3x = 36, so x = $12.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">$12.00</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Too high. The unit rate is $4.50÷3 = $1.50 per pound, so 8 pounds costs 8 × $1.50 = $12.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">$13.50</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This doesn't follow the correct proportion. Remember to set up: pounds/cost = pounds/cost.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">$9.00</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="3">
            <div class="question-header">
                <span class="question-number">Question 3 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 50%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Part-to-Whole Ratios</h4>
                <p>In a class of 35 students, the ratio of boys to girls is 3:4. How many boys are in the class?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="true" data-explanation="Correct! Total parts = 3+4 = 7. Each part = 35÷7 = 5 students. Boys = 3 parts = 3×5 = 15.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">15</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would be the number of girls (4 parts × 5 students per part = 20).">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">20</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This doesn't account for the ratio properly. Use total parts to find how many students each part represents.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">12</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Too high. Remember that 3:4 means 3 parts boys out of 7 total parts.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">21</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="4">
            <div class="question-header">
                <span class="question-number">Question 4 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 66.67%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Rate Problem</h4>
                <p>A car travels 240 miles in 4 hours. At this rate, how far will it travel in 7 hours?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="This is too low. The car travels 60 mph, so in 7 hours it goes 60 × 7 = 420 miles.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">360 miles</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Perfect! Rate = 240÷4 = 60 mph. Distance = 60 × 7 = 420 miles.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">420 miles</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Too high. You might have calculated incorrectly. The rate is 60 mph, not 70 mph.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">490 miles</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Way too high. Remember: distance = rate × time, where rate = 240÷4 = 60 mph.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">560 miles</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="5">
            <div class="question-header">
                <span class="question-number">Question 5 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 83.33%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Unit Rate Conversion</h4>
                <p>If 1 inch = 2.54 cm, how many centimeters are in 8 inches?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="Too low. You need to multiply 8 by 2.54, not divide.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">3.15 cm</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This is close to dividing 8 by 2.54. Remember: more inches means more centimeters.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">10.54 cm</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Exactly right! 8 inches × 2.54 cm/inch = 20.32 cm.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">20.32 cm</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Too high. You might have added instead of multiplying. Use: 8 × 2.54 = 20.32.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">25.4 cm</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="6">
            <div class="question-header">
                <span class="question-number">Question 6 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 100%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Similar Triangles</h4>
                <p>Two similar triangles have corresponding sides in the ratio 2:5. If the smaller triangle has a perimeter of 18 cm, what is the perimeter of the larger triangle?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="This would be correct if the scale factor were 3:2, but it's 5:2.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">27 cm</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Close, but you need to use the full scale factor. The larger triangle's perimeter = 18 × (5/2) = 45.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">36 cm</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Perfect! Scale factor from small to large = 5/2. Larger perimeter = 18 × (5/2) = 45 cm.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">45 cm</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Too high. The scale factor is 5/2 = 2.5, so 18 × 2.5 = 45, not 54.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">54 cm</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="quiz-explanation" style="display: none;">
        <div class="explanation-content"></div>
        <div class="explanation-buttons">
            <button id="next-question-btn-2" class="nav-btn">Next Question →</button>
        </div>
    </div>

    <div class="quiz-results" style="display: none;">
        <div class="results-content">
            <h3>🎉 Quiz Complete!</h3>
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-text">0/6</span>
                </div>
            </div>
            <div class="performance-feedback"></div>
            <div class="results-actions">
                <button id="review-answers-btn-2" class="nav-btn secondary">Review Answers</button>
                <button id="restart-quiz-btn-2" class="nav-btn">Try Again</button>
            </div>
        </div>
    </div>

    <div class="quiz-navigation">
        <button id="start-quiz-btn-2" class="nav-btn primary">Start Quiz</button>
        <button id="prev-btn-2" class="nav-btn secondary" style="display: none;">← Previous</button>
        <button id="next-btn-2" class="nav-btn primary" style="display: none;">Next →</button>
        <button id="submit-quiz-btn-2" class="nav-btn primary" style="display: none;">Submit Quiz</button>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion2 = 0;
    let userAnswers2 = [];
    let score2 = 0;
    let quizStarted2 = false;

    const questionCards2 = document.querySelectorAll('.question-card');
    const startBtn2 = document.getElementById('start-quiz-btn-2');
    const prevBtn2 = document.getElementById('prev-btn-2');
    const nextBtn2 = document.getElementById('next-btn-2');
    const submitBtn2 = document.getElementById('submit-quiz-btn-2');
    const restartBtn2 = document.getElementById('restart-quiz-btn-2');
    const reviewBtn2 = document.getElementById('review-answers-btn-2');
    const nextQuestionBtn2 = document.getElementById('next-question-btn-2');
    const quizContainer2 = document.querySelector('.quiz-container');
    const quizExplanation2 = document.querySelector('.quiz-explanation');
    const quizResults2 = document.querySelector('.quiz-results');

    if (startBtn2) startBtn2.addEventListener('click', startQuiz2);
    if (prevBtn2) prevBtn2.addEventListener('click', previousQuestion2);
    if (nextBtn2) nextBtn2.addEventListener('click', nextQuestion2);
    if (submitBtn2) submitBtn2.addEventListener('click', submitQuiz2);
    if (restartBtn2) restartBtn2.addEventListener('click', restartQuiz2);
    if (reviewBtn2) reviewBtn2.addEventListener('click', reviewAnswers2);
    if (nextQuestionBtn2) nextQuestionBtn2.addEventListener('click', nextQuestion2);

    function startQuiz2() {
        quizStarted2 = true;
        currentQuestion2 = 0;
        userAnswers2 = [];
        score2 = 0;

        if (startBtn2) startBtn2.style.display = 'none';
        showQuestion2(0);
        updateNavigation2();
    }

    function showQuestion2(index) {
        if (questionCards2) {
            questionCards2.forEach(card => card.classList.remove('active'));
            if (questionCards2[index]) {
                questionCards2[index].classList.add('active');
                setupQuestionListeners2(index);
            }
        }
    }

    function setupQuestionListeners2(index) {
        if (questionCards2 && questionCards2[index]) {
            const choices = questionCards2[index].querySelectorAll('.choice-btn');
            choices.forEach(choice => {
                choice.addEventListener('click', function() {
                    if (this.disabled) return;

                    choices.forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                    userAnswers2[index] = {
                        selected: this,
                        correct: this.dataset.correct === 'true',
                        explanation: this.dataset.explanation
                    };

                    setTimeout(() => {
                        showExplanation2(index);
                    }, 300);
                });
            });
        }
    }

    function showExplanation2(index) {
        if (questionCards2 && questionCards2[index]) {
            const choices = questionCards2[index].querySelectorAll('.choice-btn');
            const userAnswer = userAnswers2[index];

            choices.forEach(choice => {
                choice.disabled = true;
                if (choice.dataset.correct === 'true') {
                    choice.classList.add('correct');
                } else if (choice === userAnswer.selected && !userAnswer.correct) {
                    choice.classList.add('incorrect');
                }
            });

            const explanationContent = document.querySelector('.explanation-content');
            if (explanationContent) {
                explanationContent.innerHTML =
                    '<h4>' + (userAnswer.correct ? 'Correct!' : 'Incorrect') + '</h4>' +
                    '<p>' + userAnswer.explanation + '</p>';
            }

            if (quizContainer2) quizContainer2.style.display = 'none';
            if (quizExplanation2) quizExplanation2.style.display = 'block';

            updateNavigationForExplanation2();
        }
    }

    function updateNavigationForExplanation2() {
        if (prevBtn2) prevBtn2.style.display = 'none';
        if (nextBtn2) nextBtn2.style.display = 'none';
        if (submitBtn2) submitBtn2.style.display = 'none';

        if (nextQuestionBtn2) {
            if (currentQuestion2 < (questionCards2 ? questionCards2.length - 1 : 0)) {
                nextQuestionBtn2.style.display = 'inline-flex';
                nextQuestionBtn2.textContent = 'Next Question →';
            } else {
                nextQuestionBtn2.style.display = 'inline-flex';
                nextQuestionBtn2.textContent = 'View Results →';
            }
        }
    }

    function nextQuestion2() {
        if (quizExplanation2 && quizExplanation2.style.display === 'block') {
            quizExplanation2.style.display = 'none';
            if (quizContainer2) quizContainer2.style.display = 'block';

            if (currentQuestion2 < (questionCards2 ? questionCards2.length - 1 : 0)) {
                currentQuestion2++;
                showQuestion2(currentQuestion2);
                updateNavigation2();
            } else {
                submitQuiz2();
            }
        } else if (userAnswers2[currentQuestion2]) {
            showExplanation2(currentQuestion2);
        }
    }

    function previousQuestion2() {
        if (currentQuestion2 > 0) {
            currentQuestion2--;
            showQuestion2(currentQuestion2);
            updateNavigation2();
        }
    }

    function updateNavigation2() {
        if (prevBtn2) prevBtn2.style.display = currentQuestion2 > 0 ? 'inline-flex' : 'none';

        const hasAnswered = userAnswers2[currentQuestion2];
        if (nextBtn2) nextBtn2.style.display = hasAnswered ? 'inline-flex' : 'none';

        if (currentQuestion2 === (questionCards2 ? questionCards2.length - 1 : 0) && hasAnswered) {
            if (nextBtn2) nextBtn2.style.display = 'none';
            if (submitBtn2) submitBtn2.style.display = 'inline-flex';
        } else {
            if (submitBtn2) submitBtn2.style.display = 'none';
        }
    }

    function submitQuiz2() {
        score2 = userAnswers2.filter(answer => answer && answer.correct).length;

        if (quizContainer2) quizContainer2.style.display = 'none';
        if (quizExplanation2) quizExplanation2.style.display = 'none';
        if (prevBtn2) prevBtn2.style.display = 'none';
        if (nextBtn2) nextBtn2.style.display = 'none';
        if (submitBtn2) submitBtn2.style.display = 'none';

        displayResults2();
        if (quizResults2) quizResults2.style.display = 'block';
    }

    function displayResults2() {
        const scoreText = document.querySelector('.score-text');
        const feedback = document.querySelector('.performance-feedback');

        if (scoreText) scoreText.textContent = score2 + '/6';

        let feedbackMessage = '';
        if (score2 === 6) {
            feedbackMessage = '🎉 Perfect! You\'ve mastered ratios and proportions! Ready for any ACT ratio problem.';
        } else if (score2 >= 4) {
            feedbackMessage = '👍 Great job! You understand ratios and proportions well. Review missed questions to perfect your skills.';
        } else if (score2 >= 2) {
            feedbackMessage = '📚 Good foundation! Focus on setting up proportions correctly and using cross multiplication.';
        } else {
            feedbackMessage = '💪 Keep practicing! Master the basics: simplifying ratios, setting up proportions, and cross multiplication.';
        }

        if (feedback) {
            feedback.innerHTML = feedbackMessage;
            feedback.className = 'performance-feedback';
        }
    }

    function reviewAnswers2() {
        if (quizResults2) quizResults2.style.display = 'none';
        currentQuestion2 = 0;
        showReviewMode2();
    }

    function showReviewMode2() {
        if (quizContainer2) quizContainer2.style.display = 'block';
        showQuestion2(currentQuestion2);

        const userAnswer = userAnswers2[currentQuestion2];
        if (userAnswer && questionCards2 && questionCards2[currentQuestion2]) {
            const choices = questionCards2[currentQuestion2].querySelectorAll('.choice-btn');
            choices.forEach(choice => {
                choice.disabled = true;
                if (choice.dataset.correct === 'true') {
                    choice.classList.add('correct');
                } else if (choice === userAnswer.selected && !userAnswer.correct) {
                    choice.classList.add('incorrect');
                }
                if (choice === userAnswer.selected) {
                    choice.classList.add('selected');
                }
            });
        }

        updateReviewNavigation2();
    }

    function updateReviewNavigation2() {
        if (prevBtn2) prevBtn2.style.display = currentQuestion2 > 0 ? 'inline-flex' : 'none';
        if (nextBtn2) nextBtn2.style.display = currentQuestion2 < (questionCards2 ? questionCards2.length - 1 : 0) ? 'inline-flex' : 'none';

        if (currentQuestion2 === (questionCards2 ? questionCards2.length - 1 : 0)) {
            if (submitBtn2) {
                submitBtn2.textContent = 'Back to Results';
                submitBtn2.style.display = 'inline-flex';
            }
        } else {
            if (submitBtn2) submitBtn2.style.display = 'none';
        }
    }

    function restartQuiz2() {
        currentQuestion2 = 0;
        userAnswers2 = [];
        score2 = 0;
        quizStarted2 = false;

        if (quizResults2) quizResults2.style.display = 'none';
        if (quizExplanation2) quizExplanation2.style.display = 'none';
        if (quizContainer2) quizContainer2.style.display = 'none';

        if (questionCards2) {
            questionCards2.forEach(card => {
                card.classList.remove('active');
                const choices = card.querySelectorAll('.choice-btn');
                choices.forEach(choice => {
                    choice.disabled = false;
                    choice.classList.remove('selected', 'correct', 'incorrect');
                });
            });
        }

        if (startBtn2) startBtn2.style.display = 'inline-flex';
        if (prevBtn2) prevBtn2.style.display = 'none';
        if (nextBtn2) nextBtn2.style.display = 'none';
        if (submitBtn2) submitBtn2.style.display = 'none';
    }
});
</script>
    `
  },

  'functions': {
    title: 'Chapter 11: Functions',
    duration: 26, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 11: <span style="color: #8b5cf6; font-weight: 600;">Functions</span></h2>
    <p class="lesson-intro">Master function notation, evaluation, and transformations that appear on <strong>every ACT Math test</strong>! Functions connect algebra and coordinate geometry, unlocking solutions across multiple math topics.</p>
</div>

<div class="section why-important">
    <h3>Your Chapter 11 Learning Path: The 4 Essential Function Skills</h3>
    <div class="concept-box">
        <h4>🎯 What You'll Master Today</h4>
        <p><strong>Part 1:</strong> Function Notation → Understanding f(x) and evaluation</p>
        <p><strong>Part 2:</strong> Domain and Range → Input and output values</p>
        <p><strong>Part 3:</strong> Function Operations → Addition, composition, and inverses</p>
        <p><strong>Part 4:</strong> Transformations → Shifting, stretching, and reflecting functions</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #8b5cf6; font-weight: 600;">Function Notation</span></h3>

    <div class="concept-box">
        <h4>💡 What is a Function?</h4>
        <p><strong>A function is a rule that assigns exactly one output to each input</strong></p>
        <p><strong>Function notation:</strong> f(x) = 2x + 3</p>
        <p><em>"f of x equals 2x plus 3" - f is the function name, x is the input, 2x+3 is the rule</em></p>
    </div>

    <div class="rules-box">
        <h4>Function Evaluation Steps:</h4>
        <ol>
            <li><strong>Identify the function rule</strong></li>
            <li><strong>Substitute the given input value</strong> for every x</li>
            <li><strong>Simplify using order of operations</strong></li>
            <li><strong>The result is the function output</strong></li>
        </ol>
    </div>

    <div class="example-box">
        <h4>Example 1: Basic Function Evaluation</h4>
        <p><strong>Problem:</strong> If f(x) = 3x² - 2x + 1, find f(4)</p>
        <p><strong>Solution:</strong></p>
        <p>f(4) = 3(4)² - 2(4) + 1</p>
        <p>f(4) = 3(16) - 8 + 1</p>
        <p>f(4) = 48 - 8 + 1 = 41</p>
    </div>

    <div class="example-box">
        <h4>Example 2: Function with Negative Input</h4>
        <p><strong>Problem:</strong> If g(x) = x² + 5x - 3, find g(-2)</p>
        <p><strong>Solution:</strong></p>
        <p>g(-2) = (-2)² + 5(-2) - 3</p>
        <p>g(-2) = 4 - 10 - 3 = -9</p>
    </div>

    <div class="example-box">
        <h4>Example 3: Function with Expression Input</h4>
        <p><strong>Problem:</strong> If h(x) = 2x - 7, find h(3x + 1)</p>
        <p><strong>Solution:</strong></p>
        <p>h(3x + 1) = 2(3x + 1) - 7</p>
        <p>h(3x + 1) = 6x + 2 - 7</p>
        <p>h(3x + 1) = 6x - 5</p>
    </div>

    <div class="tip-box">
        <h4>🎯 Function Evaluation Tips</h4>
        <ul>
            <li><strong>Use parentheses carefully</strong> when substituting negative values</li>
            <li><strong>Remember order of operations</strong> (PEMDAS)</li>
            <li><strong>Check your arithmetic</strong> - function problems often have calculation errors</li>
            <li><strong>Functions can use any letter</strong> - f(x), g(x), h(t), etc.</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #8b5cf6; font-weight: 600;">Domain and Range</span></h3>

    <div class="concept-box">
        <h4>💡 Key Definitions</h4>
        <p><strong>Domain:</strong> All possible input values (x-values) for the function</p>
        <p><strong>Range:</strong> All possible output values (y-values) that the function can produce</p>
        <p><em>Think: Domain = what goes IN, Range = what comes OUT</em></p>
    </div>

    <div class="rules-box">
        <h4>Common Domain Restrictions:</h4>
        <ul>
            <li><strong>Division by zero:</strong> Denominator cannot equal zero</li>
            <li><strong>Square roots:</strong> Expression under √ must be ≥ 0</li>
            <li><strong>Even roots:</strong> Expression under even root must be ≥ 0</li>
            <li><strong>Logarithms:</strong> Argument must be > 0</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 4: Finding Domain with Division</h4>
        <p><strong>Problem:</strong> Find the domain of f(x) = (x + 3)/(x - 5)</p>
        <p><strong>Solution:</strong></p>
        <p>The denominator cannot equal zero:</p>
        <p>x - 5 ≠ 0</p>
        <p>x ≠ 5</p>
        <p><strong>Domain: All real numbers except x = 5</strong></p>
        <p><strong>In interval notation: (-∞, 5) ∪ (5, ∞)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 5: Finding Domain with Square Root</h4>
        <p><strong>Problem:</strong> Find the domain of g(x) = √(2x - 6)</p>
        <p><strong>Solution:</strong></p>
        <p>The expression under the square root must be ≥ 0:</p>
        <p>2x - 6 ≥ 0</p>
        <p>2x ≥ 6</p>
        <p>x ≥ 3</p>
        <p><strong>Domain: x ≥ 3 or [3, ∞)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 6: Finding Range from Graph</h4>
        <p><strong>Problem:</strong> If f(x) = x² - 4, what is the range?</p>
        <p><strong>Solution:</strong></p>
        <p>This is a parabola opening upward with vertex at (0, -4)</p>
        <p>The minimum value is -4 (at the vertex)</p>
        <p>The function can produce all y-values ≥ -4</p>
        <p><strong>Range: y ≥ -4 or [-4, ∞)</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #8b5cf6; font-weight: 600;">Function Operations</span></h3>

    <div class="concept-box">
        <h4>💡 Four Basic Operations</h4>
        <p><strong>(f + g)(x) = f(x) + g(x)</strong> → Addition</p>
        <p><strong>(f - g)(x) = f(x) - g(x)</strong> → Subtraction</p>
        <p><strong>(f × g)(x) = f(x) × g(x)</strong> → Multiplication</p>
        <p><strong>(f ÷ g)(x) = f(x) ÷ g(x)</strong> → Division (g(x) ≠ 0)</p>
    </div>

    <div class="example-box">
        <h4>Example 7: Function Addition</h4>
        <p><strong>Problem:</strong> If f(x) = 2x + 1 and g(x) = x² - 3, find (f + g)(x)</p>
        <p><strong>Solution:</strong></p>
        <p>(f + g)(x) = f(x) + g(x)</p>
        <p>(f + g)(x) = (2x + 1) + (x² - 3)</p>
        <p>(f + g)(x) = x² + 2x - 2</p>
    </div>

    <div class="concept-box">
        <h4>💡 Function Composition</h4>
        <p><strong>(f ∘ g)(x) = f(g(x))</strong> → "f composed with g"</p>
        <p><em>Take the output of g(x) and use it as input for f(x)</em></p>
    </div>

    <div class="example-box">
        <h4>Example 8: Function Composition</h4>
        <p><strong>Problem:</strong> If f(x) = 2x + 3 and g(x) = x², find (f ∘ g)(x)</p>
        <p><strong>Solution:</strong></p>
        <p>(f ∘ g)(x) = f(g(x))</p>
        <p>First find g(x): g(x) = x²</p>
        <p>Then substitute into f: f(x²) = 2(x²) + 3 = 2x² + 3</p>
        <p><strong>(f ∘ g)(x) = 2x² + 3</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 9: Composition in Reverse Order</h4>
        <p><strong>Problem:</strong> Using the same functions, find (g ∘ f)(x)</p>
        <p><strong>Solution:</strong></p>
        <p>(g ∘ f)(x) = g(f(x))</p>
        <p>First find f(x): f(x) = 2x + 3</p>
        <p>Then substitute into g: g(2x + 3) = (2x + 3)² = 4x² + 12x + 9</p>
        <p><strong>(g ∘ f)(x) = 4x² + 12x + 9</strong></p>
        <p><em>Note: (f ∘ g)(x) ≠ (g ∘ f)(x) in general!</em></p>
    </div>

    <div class="concept-box">
        <h4>💡 Inverse Functions</h4>
        <p><strong>f⁻¹(x) is the inverse of f(x)</strong></p>
        <p><strong>Property:</strong> f(f⁻¹(x)) = x and f⁻¹(f(x)) = x</p>
        <p><em>Inverse functions "undo" each other</em></p>
    </div>

    <div class="example-box">
        <h4>Example 10: Finding an Inverse Function</h4>
        <p><strong>Problem:</strong> Find the inverse of f(x) = 2x - 5</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Replace f(x) with y: y = 2x - 5</p>
        <p>Step 2: Swap x and y: x = 2y - 5</p>
        <p>Step 3: Solve for y: x + 5 = 2y → y = (x + 5)/2</p>
        <p>Step 4: Replace y with f⁻¹(x): <strong>f⁻¹(x) = (x + 5)/2</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #8b5cf6; font-weight: 600;">Function Transformations</span></h3>

    <div class="rules-box">
        <h4>Standard Function Transformations:</h4>

        <p><strong>Vertical Transformations:</strong></p>
        <ul>
            <li><strong>f(x) + k:</strong> Shift UP by k units</li>
            <li><strong>f(x) - k:</strong> Shift DOWN by k units</li>
            <li><strong>a·f(x):</strong> Stretch vertically by factor |a| (if |a| > 1) or compress (if 0 < |a| < 1)</li>
            <li><strong>-f(x):</strong> Reflect over x-axis</li>
        </ul>

        <p><strong>Horizontal Transformations:</strong></p>
        <ul>
            <li><strong>f(x + h):</strong> Shift LEFT by h units</li>
            <li><strong>f(x - h):</strong> Shift RIGHT by h units</li>
            <li><strong>f(ax):</strong> Compress horizontally by factor 1/|a| (if |a| > 1) or stretch (if 0 < |a| < 1)</li>
            <li><strong>f(-x):</strong> Reflect over y-axis</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 11: Identifying Transformations</h4>
        <p><strong>Problem:</strong> Describe the transformations from f(x) = x² to g(x) = -2(x - 3)² + 1</p>
        <p><strong>Solution:</strong></p>
        <p>Breaking down g(x) = -2(x - 3)² + 1:</p>
        <ul>
            <li><strong>(x - 3)²:</strong> Shift RIGHT 3 units</li>
            <li><strong>-2(x - 3)²:</strong> Stretch vertically by factor 2 AND reflect over x-axis</li>
            <li><strong>-2(x - 3)² + 1:</strong> Shift UP 1 unit</li>
        </ul>
        <p><strong>Combined: Right 3, stretch by 2, reflect over x-axis, up 1</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 12: Writing Transformed Functions</h4>
        <p><strong>Problem:</strong> Start with f(x) = √x. Write the function that shifts left 2 and down 4.</p>
        <p><strong>Solution:</strong></p>
        <p>Left 2: f(x + 2) = √(x + 2)</p>
        <p>Down 4: f(x + 2) - 4 = √(x + 2) - 4</p>
        <p><strong>g(x) = √(x + 2) - 4</strong></p>
    </div>
</div>

<div class="section">
    <h3>🔗 ACT Function Applications</h3>

    <div class="example-box">
        <h4>Example 13: Real-World Function</h4>
        <p><strong>Problem:</strong> A taxi charges $3.50 plus $0.75 per mile. Write a function for the total cost C(x) for x miles, then find the cost for a 12-mile trip.</p>
        <p><strong>Solution:</strong></p>
        <p>C(x) = 3.50 + 0.75x</p>
        <p>For 12 miles: C(12) = 3.50 + 0.75(12) = 3.50 + 9.00 = $12.50</p>
    </div>

    <div class="example-box">
        <h4>Example 14: Piecewise Function</h4>
        <p><strong>Problem:</strong> Evaluate f(5) where f(x) = {x² if x < 3, 2x + 1 if x ≥ 3}</p>
        <p><strong>Solution:</strong></p>
        <p>Since 5 ≥ 3, use the second rule:</p>
        <p>f(5) = 2(5) + 1 = 11</p>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Functions are essential for ACT success! Master function notation and evaluation, understand domain/range restrictions, learn function operations including composition, and recognize transformations. Functions connect algebra and coordinate geometry throughout the test. Remember: substitute carefully, check domain restrictions, and understand that composition order matters!</p>
</div>

<!-- QUIZ_19 -->
    `
  },


  'quadratics': {
    title: 'Chapter 14: Quadratics',
    duration: 28, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 14: <span style="color: #dc2626; font-weight: 600;">Quadratics</span></h2>
    <p class="lesson-intro">Master quadratic equations, factoring techniques, and parabola properties - high-frequency ACT topics!</p>

    <div class="learning-path">
        <p><strong>Part 1:</strong> Factoring Quadratics → Master all factoring techniques</p>
        <p><strong>Part 2:</strong> Quadratic Formula → Solve any quadratic equation</p>
        <p><strong>Part 3:</strong> Vertex Form → Find maximums and minimums</p>
        <p><strong>Part 4:</strong> Parabola Properties → Graphing and transformations</p>
        <p><strong>Your advantage:</strong> You have <span style="color: #059669; font-weight: 600;">strong algebra foundations</span> from previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #dc2626; font-weight: 600;">Factoring Quadratics</span></h3>

    <div class="concept-box">
        <h4>💡 What is a Quadratic?</h4>
        <p>A quadratic equation has the form <strong>ax² + bx + c = 0</strong> where a ≠ 0.</p>
        <p>Examples: x² + 5x + 6 = 0, 2x² - 8x + 6 = 0, x² - 9 = 0</p>
    </div>

    <div class="rules-box">
        <h4>Factoring Techniques (In Order of Difficulty):</h4>

        <p><strong>1. Greatest Common Factor (GCF) - Always Check First!</strong></p>
        <p>Factor out the largest common factor from all terms.</p>

        <p><strong>2. Difference of Squares: a² - b² = (a + b)(a - b)</strong></p>
        <p>Works when you have two perfect squares being subtracted.</p>

        <p><strong>3. Perfect Square Trinomials:</strong></p>
        <p>• a² + 2ab + b² = (a + b)²</p>
        <p>• a² - 2ab + b² = (a - b)²</p>

        <p><strong>4. General Trinomials: ax² + bx + c</strong></p>
        <p>When a = 1: Look for two numbers that multiply to c and add to b</p>
        <p>When a ≠ 1: Use AC method or trial-and-error</p>
    </div>

    <div class="example-box">
        <h4>Example 1: GCF First</h4>
        <p><strong>Problem:</strong> Factor 3x² + 12x + 9</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Factor out GCF = 3</p>
        <p>3x² + 12x + 9 = 3(x² + 4x + 3)</p>
        <p>Step 2: Factor the trinomial x² + 4x + 3</p>
        <p>Need two numbers that multiply to 3 and add to 4: 1 and 3</p>
        <p><strong>3(x + 1)(x + 3)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 2: Difference of Squares</h4>
        <p><strong>Problem:</strong> Factor x² - 25</p>
        <p><strong>Solution:</strong></p>
        <p>Recognize: x² - 25 = x² - 5²</p>
        <p>Apply formula: a² - b² = (a + b)(a - b)</p>
        <p><strong>(x + 5)(x - 5)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 3: Perfect Square Trinomial</h4>
        <p><strong>Problem:</strong> Factor x² - 10x + 25</p>
        <p><strong>Solution:</strong></p>
        <p>Check if it's a perfect square: x² - 10x + 25</p>
        <p>• First term: x² = (x)²</p>
        <p>• Last term: 25 = (5)²</p>
        <p>• Middle term: -10x = -2(x)(5) ✓</p>
        <p><strong>(x - 5)²</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 4: General Trinomial (a = 1)</h4>
        <p><strong>Problem:</strong> Factor x² + 7x + 12</p>
        <p><strong>Solution:</strong></p>
        <p>Need two numbers that:</p>
        <p>• Multiply to 12: 1×12, 2×6, 3×4</p>
        <p>• Add to 7: 3 + 4 = 7 ✓</p>
        <p><strong>(x + 3)(x + 4)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 5: AC Method (a ≠ 1)</h4>
        <p><strong>Problem:</strong> Factor 2x² + 7x + 6</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Find AC = (2)(6) = 12</p>
        <p>Step 2: Find two numbers that multiply to 12 and add to 7: 3 and 4</p>
        <p>Step 3: Split middle term: 2x² + 3x + 4x + 6</p>
        <p>Step 4: Group: (2x² + 3x) + (4x + 6) = x(2x + 3) + 2(2x + 3)</p>
        <p><strong>(x + 2)(2x + 3)</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #dc2626; font-weight: 600;">The Quadratic Formula</span></h3>

    <div class="rules-box">
        <h4>The Quadratic Formula:</h4>
        <p><strong>For ax² + bx + c = 0:</strong></p>
        <p style="font-size: 1.2em; text-align: center; background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <strong>x = (-b ± √(b² - 4ac)) / (2a)</strong>
        </p>

        <p><strong>The Discriminant: Δ = b² - 4ac</strong></p>
        <ul>
            <li>If Δ > 0: Two real solutions</li>
            <li>If Δ = 0: One real solution (repeated root)</li>
            <li>If Δ < 0: No real solutions</li>
        </ul>
    </div>

    <div class="example-box">
        <h4>Example 6: Using the Quadratic Formula</h4>
        <p><strong>Problem:</strong> Solve x² - 6x + 5 = 0</p>
        <p><strong>Solution:</strong></p>
        <p>Identify: a = 1, b = -6, c = 5</p>
        <p>x = (-(-6) ± √((-6)² - 4(1)(5))) / (2(1))</p>
        <p>x = (6 ± √(36 - 20)) / 2</p>
        <p>x = (6 ± √16) / 2 = (6 ± 4) / 2</p>
        <p><strong>x = 5 or x = 1</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 7: No Real Solutions</h4>
        <p><strong>Problem:</strong> Solve x² + 2x + 5 = 0</p>
        <p><strong>Solution:</strong></p>
        <p>Check discriminant: Δ = 2² - 4(1)(5) = 4 - 20 = -16</p>
        <p>Since Δ < 0, there are <strong>no real solutions</strong></p>
    </div>

    <div class="tip-box">
        <h4>💡 When to Factor vs. Use Formula</h4>
        <p><strong>Try factoring first</strong> - it's usually faster if it works!</p>
        <p><strong>Use the formula when:</strong> Factoring doesn't work easily, or you need decimal answers</p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #dc2626; font-weight: 600;">Vertex Form and Parabolas</span></h3>

    <div class="rules-box">
        <h4>Three Forms of Quadratics:</h4>

        <p><strong>1. Standard Form: f(x) = ax² + bx + c</strong></p>
        <p>• Easy to identify y-intercept (c)</p>

        <p><strong>2. Vertex Form: f(x) = a(x - h)² + k</strong></p>
        <p>• Vertex is at (h, k)</p>
        <p>• Easy to see transformations</p>

        <p><strong>3. Factored Form: f(x) = a(x - r₁)(x - r₂)</strong></p>
        <p>• Easy to find x-intercepts (roots): r₁ and r₂</p>
    </div>

    <div class="example-box">
        <h4>Example 8: Converting to Vertex Form</h4>
        <p><strong>Problem:</strong> Convert f(x) = x² + 6x + 5 to vertex form</p>
        <p><strong>Solution (Completing the Square):</strong></p>
        <p>Step 1: f(x) = x² + 6x + 5</p>
        <p>Step 2: Take half of b coefficient: 6/2 = 3</p>
        <p>Step 3: Add and subtract 3²: f(x) = x² + 6x + 9 - 9 + 5</p>
        <p>Step 4: Group perfect square: f(x) = (x + 3)² - 4</p>
        <p><strong>Vertex form: f(x) = (x + 3)² - 4</strong></p>
        <p><strong>Vertex: (-3, -4)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 9: Finding Vertex from Standard Form</h4>
        <p><strong>Problem:</strong> Find vertex of f(x) = 2x² - 8x + 3</p>
        <p><strong>Solution:</strong></p>
        <p>Method 1 - Vertex Formula: x = -b/(2a) = -(-8)/(2×2) = 8/4 = 2</p>
        <p>f(2) = 2(2)² - 8(2) + 3 = 8 - 16 + 3 = -5</p>
        <p><strong>Vertex: (2, -5)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 10: Maximum/Minimum Problems</h4>
        <p><strong>Problem:</strong> A ball is thrown upward. Its height is h(t) = -16t² + 32t + 6. Find the maximum height.</p>
        <p><strong>Solution:</strong></p>
        <p>Since a = -16 < 0, parabola opens down → maximum exists</p>
        <p>Time at maximum: t = -b/(2a) = -32/(2×(-16)) = 1 second</p>
        <p>Maximum height: h(1) = -16(1)² + 32(1) + 6 = -16 + 32 + 6 = 22 feet</p>
        <p><strong>Maximum height: 22 feet at t = 1 second</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #dc2626; font-weight: 600;">Parabola Properties and Graphing</span></h3>

    <div class="rules-box">
        <h4>Key Parabola Properties:</h4>

        <p><strong>Direction:</strong></p>
        <p>• If a > 0: Opens up (has minimum)</p>
        <p>• If a < 0: Opens down (has maximum)</p>

        <p><strong>Width:</strong></p>
        <p>• |a| > 1: Narrow parabola</p>
        <p>• |a| < 1: Wide parabola</p>

        <p><strong>Key Points:</strong></p>
        <p>• Vertex: Either maximum or minimum point</p>
        <p>• y-intercept: Point (0, c)</p>
        <p>• x-intercepts: Solutions to ax² + bx + c = 0</p>
        <p>• Axis of symmetry: x = -b/(2a)</p>
    </div>

    <div class="example-box">
        <h4>Example 11: Complete Graph Analysis</h4>
        <p><strong>Problem:</strong> Analyze f(x) = -2x² + 8x - 6</p>
        <p><strong>Solution:</strong></p>
        <p>Direction: a = -2 < 0 → Opens down (has maximum)</p>
        <p>Vertex: x = -8/(2×(-2)) = 2, f(2) = -2(4) + 8(2) - 6 = 2</p>
        <p>Vertex: (2, 2) - this is the maximum point</p>
        <p>y-intercept: f(0) = -6 → (0, -6)</p>
        <p>x-intercepts: -2x² + 8x - 6 = 0 → -2(x² - 4x + 3) = 0</p>
        <p>x² - 4x + 3 = 0 → (x - 1)(x - 3) = 0 → x = 1, 3</p>
        <p><strong>Summary: Maximum at (2, 2), y-intercept (0, -6), x-intercepts (1, 0) and (3, 0)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 12: Parabola Transformations</h4>
        <p><strong>Problem:</strong> Describe how y = -3(x + 2)² - 1 transforms from y = x²</p>
        <p><strong>Solution:</strong></p>
        <p>Starting with y = x²:</p>
        <p>• (x + 2)²: Shift LEFT 2 units</p>
        <p>• -3(x + 2)²: Stretch by factor 3 AND reflect over x-axis</p>
        <p>• -3(x + 2)² - 1: Shift DOWN 1 unit</p>
        <p><strong>Result: Left 2, stretch by 3, flip upside down, down 1</strong></p>
        <p><strong>Vertex: (-2, -1)</strong></p>
    </div>
</div>

<div class="section">
    <h3>🔗 ACT Quadratic Applications</h3>

    <div class="example-box">
        <h4>Example 13: Profit Maximization</h4>
        <p><strong>Problem:</strong> A company's profit is P(x) = -2x² + 40x - 180, where x is the number of items (in hundreds). Find the maximum profit and optimal production level.</p>
        <p><strong>Solution:</strong></p>
        <p>Since a = -2 < 0, there's a maximum</p>
        <p>Optimal x: x = -40/(2×(-2)) = 10</p>
        <p>Maximum profit: P(10) = -2(100) + 40(10) - 180 = -200 + 400 - 180 = 20</p>
        <p><strong>Maximum profit: $2000 when producing 1000 items</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 14: Area Optimization</h4>
        <p><strong>Problem:</strong> You have 100 feet of fence to make a rectangular garden against a wall (so only 3 sides need fencing). Find dimensions for maximum area.</p>
        <p><strong>Solution:</strong></p>
        <p>Let width = x, then length = 100 - 2x</p>
        <p>Area: A(x) = x(100 - 2x) = 100x - 2x²</p>
        <p>Maximum at: x = -100/(2×(-2)) = 25 feet</p>
        <p>Length = 100 - 2(25) = 50 feet</p>
        <p>Maximum area = 25 × 50 = 1250 square feet</p>
        <p><strong>Optimal dimensions: 25 ft × 50 ft for area of 1250 ft²</strong></p>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Quadratics are everywhere on the ACT! Master factoring techniques in order (GCF, difference of squares, perfect squares, general trinomials), memorize the quadratic formula, understand vertex form for max/min problems, and recognize parabola properties from the equation. Remember: Always try factoring first, use the discriminant to predict solutions, and vertex form reveals transformations immediately!</p>
</div>

<div class="interactive-quiz">
    <h3>🎯 Interactive Quiz: Master Your Quadratics Skills!</h3>
    <div class="quiz-intro">
        <p>Test your understanding of factoring, quadratic formula, vertex form, and parabola properties - essential ACT topics!</p>
    </div>

    <div class="quiz-container">
        <div class="question-card active" data-question="1">
            <div class="question-header">
                <span class="question-number">Question 1 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 16.67%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Factoring Trinomials</h4>
                <p>Factor the quadratic expression: x² + 7x + 12</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="true" data-explanation="Perfect! We need two numbers that multiply to 12 and add to 7. Those are 3 and 4: (x + 3)(x + 4) = x² + 7x + 12.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">(x + 3)(x + 4)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Let's check: (x + 2)(x + 6) = x² + 8x + 12, not x² + 7x + 12.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">(x + 2)(x + 6)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would give x² + x - 12, with different signs. We need positive coefficients.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">(x - 3)(x - 4)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would give x² - x - 12, not the expression we need.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">(x + 1)(x - 12)</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="2">
            <div class="question-header">
                <span class="question-number">Question 2 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 33.33%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Difference of Squares</h4>
                <p>Factor the expression: 4x² - 9</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="This isn't the correct factorization. Remember the difference of squares pattern: a² - b² = (a + b)(a - b).">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">(4x + 9)(4x - 9)</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Excellent! 4x² - 9 = (2x)² - 3² = (2x + 3)(2x - 3). This is the difference of squares pattern.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">(2x + 3)(2x - 3)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would give 4x² + 12x + 9, which is a perfect square trinomial, not our expression.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">(2x + 3)²</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This expression cannot be factored using integers in this way.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">(x + 2)(4x - 9)</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="3">
            <div class="question-header">
                <span class="question-number">Question 3 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 50%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Quadratic Formula</h4>
                <p>Solve using the quadratic formula: 2x² - 5x - 3 = 0</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="true" data-explanation="Perfect! Using x = (-b ± √(b² - 4ac))/2a with a=2, b=-5, c=-3: x = (5 ± √(25 + 24))/4 = (5 ± 7)/4, so x = 3 or x = -1/2.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">x = 3, x = -1/2</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="These values don't satisfy the original equation. Check by substitution: 2(1)² - 5(1) - 3 ≠ 0.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">x = 1, x = -3/2</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Check: 2(-3)² - 5(-3) - 3 = 18 + 15 - 3 = 30 ≠ 0. These aren't correct.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">x = -3, x = 1/2</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="The discriminant is 49, which is positive, so there are two real solutions, not none.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">No real solutions</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="4">
            <div class="question-header">
                <span class="question-number">Question 4 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 66.67%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Vertex Form</h4>
                <p>What is the vertex of the parabola y = 2(x - 3)² + 1?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="true" data-explanation="Correct! In vertex form y = a(x - h)² + k, the vertex is (h, k). Here h = 3 and k = 1, so vertex is (3, 1).">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">(3, 1)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would be if the form was y = 2(x + 3)² - 1. Watch the signs carefully in vertex form.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">(-3, -1)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This mixes up the signs. In y = a(x - h)² + k, the vertex is (h, k), not (-h, -k).">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">(-3, 1)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="The x-coordinate is correct, but the y-coordinate should be positive 1, not negative.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">(3, -1)</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="5">
            <div class="question-header">
                <span class="question-number">Question 5 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 83.33%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Parabola Properties</h4>
                <p>For the parabola y = -x² + 4x + 5, what is the maximum value?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="This is the x-coordinate of the vertex, not the maximum y-value.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">2</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Excellent! The vertex x-coordinate is x = -4/(2×(-1)) = 2. The maximum y-value is y = -(2)² + 4(2) + 5 = -4 + 8 + 5 = 9.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">9</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would be correct if we forgot the negative coefficient. With a = -1, the parabola opens downward.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">5</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Since a = -1 < 0, the parabola opens downward and has a maximum, not minimum value.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">No maximum</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="6">
            <div class="question-header">
                <span class="question-number">Question 6 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 100%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Word Problem Application</h4>
                <p>A ball is thrown upward with initial velocity 48 ft/s from height 6 ft. The height equation is h = -16t² + 48t + 6. What is the maximum height?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="This is the time when maximum height occurs: t = -48/(2×(-16)) = 1.5 seconds.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">1.5 feet</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This is close, but let's check: h = -16(1.5)² + 48(1.5) + 6 = -36 + 72 + 6 = 42 feet.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">38 feet</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Perfect! At t = 1.5 seconds: h = -16(1.5)² + 48(1.5) + 6 = -16(2.25) + 72 + 6 = -36 + 78 = 42 feet.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">42 feet</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This would be if we calculated incorrectly. The maximum height is 42 feet at t = 1.5 seconds.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">54 feet</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="quiz-explanation" style="display: none;">
        <div class="explanation-content"></div>
        <div class="explanation-buttons">
            <button id="next-question-btn-5" class="nav-btn">Next Question →</button>
        </div>
    </div>

    <div class="quiz-results" style="display: none;">
        <div class="results-content">
            <h3>🎉 Quiz Complete!</h3>
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-text">0/6</span>
                </div>
            </div>
            <div class="performance-feedback"></div>
            <div class="results-actions">
                <button id="review-answers-btn-5" class="nav-btn secondary">Review Answers</button>
                <button id="restart-quiz-btn-5" class="nav-btn">Try Again</button>
            </div>
        </div>
    </div>

    <div class="quiz-navigation">
        <button id="start-quiz-btn-5" class="nav-btn primary">Start Quiz</button>
        <button id="prev-btn-5" class="nav-btn secondary" style="display: none;">← Previous</button>
        <button id="next-btn-5" class="nav-btn primary" style="display: none;">Next →</button>
        <button id="submit-quiz-btn-5" class="nav-btn primary" style="display: none;">Submit Quiz</button>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion5 = 0;
    let userAnswers5 = [];
    let score5 = 0;
    let quizStarted5 = false;

    const questionCards5 = document.querySelectorAll('.question-card');
    const startBtn5 = document.getElementById('start-quiz-btn-5');
    const prevBtn5 = document.getElementById('prev-btn-5');
    const nextBtn5 = document.getElementById('next-btn-5');
    const submitBtn5 = document.getElementById('submit-quiz-btn-5');
    const restartBtn5 = document.getElementById('restart-quiz-btn-5');
    const reviewBtn5 = document.getElementById('review-answers-btn-5');
    const nextQuestionBtn5 = document.getElementById('next-question-btn-5');
    const quizContainer5 = document.querySelector('.quiz-container');
    const quizExplanation5 = document.querySelector('.quiz-explanation');
    const quizResults5 = document.querySelector('.quiz-results');

    if (startBtn5) startBtn5.addEventListener('click', startQuiz5);
    if (prevBtn5) prevBtn5.addEventListener('click', previousQuestion5);
    if (nextBtn5) nextBtn5.addEventListener('click', nextQuestion5);
    if (submitBtn5) submitBtn5.addEventListener('click', submitQuiz5);
    if (restartBtn5) restartBtn5.addEventListener('click', restartQuiz5);
    if (reviewBtn5) reviewBtn5.addEventListener('click', reviewAnswers5);
    if (nextQuestionBtn5) nextQuestionBtn5.addEventListener('click', nextQuestion5);

    function startQuiz5() {
        quizStarted5 = true;
        currentQuestion5 = 0;
        userAnswers5 = [];
        score5 = 0;

        if (startBtn5) startBtn5.style.display = 'none';
        showQuestion5(0);
        updateNavigation5();
    }

    function showQuestion5(index) {
        if (questionCards5) {
            questionCards5.forEach(card => card.classList.remove('active'));
            if (questionCards5[index]) {
                questionCards5[index].classList.add('active');
                setupQuestionListeners5(index);
            }
        }
    }

    function setupQuestionListeners5(index) {
        if (questionCards5 && questionCards5[index]) {
            const choices = questionCards5[index].querySelectorAll('.choice-btn');
            choices.forEach(choice => {
                choice.addEventListener('click', function() {
                    if (this.disabled) return;

                    choices.forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                    userAnswers5[index] = {
                        selected: this,
                        correct: this.dataset.correct === 'true',
                        explanation: this.dataset.explanation
                    };

                    setTimeout(() => {
                        showExplanation5(index);
                    }, 300);
                });
            });
        }
    }

    function showExplanation5(index) {
        if (questionCards5 && questionCards5[index]) {
            const choices = questionCards5[index].querySelectorAll('.choice-btn');
            const userAnswer = userAnswers5[index];

            choices.forEach(choice => {
                choice.disabled = true;
                if (choice.dataset.correct === 'true') {
                    choice.classList.add('correct');
                } else if (choice === userAnswer.selected && !userAnswer.correct) {
                    choice.classList.add('incorrect');
                }
            });

            const explanationContent = document.querySelector('.explanation-content');
            if (explanationContent) {
                explanationContent.innerHTML =
                    '<h4>' + (userAnswer.correct ? 'Correct!' : 'Incorrect') + '</h4>' +
                    '<p>' + userAnswer.explanation + '</p>';
            }

            if (quizContainer5) quizContainer5.style.display = 'none';
            if (quizExplanation5) quizExplanation5.style.display = 'block';

            updateNavigationForExplanation5();
        }
    }

    function updateNavigationForExplanation5() {
        if (prevBtn5) prevBtn5.style.display = 'none';
        if (nextBtn5) nextBtn5.style.display = 'none';
        if (submitBtn5) submitBtn5.style.display = 'none';

        if (nextQuestionBtn5) {
            if (currentQuestion5 < (questionCards5 ? questionCards5.length - 1 : 0)) {
                nextQuestionBtn5.style.display = 'inline-flex';
                nextQuestionBtn5.textContent = 'Next Question →';
            } else {
                nextQuestionBtn5.style.display = 'inline-flex';
                nextQuestionBtn5.textContent = 'View Results →';
            }
        }
    }

    function nextQuestion5() {
        if (quizExplanation5 && quizExplanation5.style.display === 'block') {
            quizExplanation5.style.display = 'none';
            if (quizContainer5) quizContainer5.style.display = 'block';

            if (currentQuestion5 < (questionCards5 ? questionCards5.length - 1 : 0)) {
                currentQuestion5++;
                showQuestion5(currentQuestion5);
                updateNavigation5();
            } else {
                submitQuiz5();
            }
        } else if (userAnswers5[currentQuestion5]) {
            showExplanation5(currentQuestion5);
        }
    }

    function previousQuestion5() {
        if (currentQuestion5 > 0) {
            currentQuestion5--;
            showQuestion5(currentQuestion5);
            updateNavigation5();
        }
    }

    function updateNavigation5() {
        if (prevBtn5) prevBtn5.style.display = currentQuestion5 > 0 ? 'inline-flex' : 'none';

        const hasAnswered = userAnswers5[currentQuestion5];
        if (nextBtn5) nextBtn5.style.display = hasAnswered ? 'inline-flex' : 'none';

        if (currentQuestion5 === (questionCards5 ? questionCards5.length - 1 : 0) && hasAnswered) {
            if (nextBtn5) nextBtn5.style.display = 'none';
            if (submitBtn5) submitBtn5.style.display = 'inline-flex';
        } else {
            if (submitBtn5) submitBtn5.style.display = 'none';
        }
    }

    function submitQuiz5() {
        score5 = userAnswers5.filter(answer => answer && answer.correct).length;

        if (quizContainer5) quizContainer5.style.display = 'none';
        if (quizExplanation5) quizExplanation5.style.display = 'none';
        if (prevBtn5) prevBtn5.style.display = 'none';
        if (nextBtn5) nextBtn5.style.display = 'none';
        if (submitBtn5) submitBtn5.style.display = 'none';

        displayResults5();
        if (quizResults5) quizResults5.style.display = 'block';
    }

    function displayResults5() {
        const scoreText = document.querySelector('.score-text');
        const feedback = document.querySelector('.performance-feedback');

        if (scoreText) scoreText.textContent = score5 + '/6';

        let feedbackMessage = '';
        if (score5 === 6) {
            feedbackMessage = '🎉 Exceptional! You\'ve mastered quadratics completely! Ready for any ACT quadratic problem.';
        } else if (score5 >= 4) {
            feedbackMessage = '👍 Great mastery of quadratics! Review factoring techniques and vertex form to perfect your skills.';
        } else if (score5 >= 2) {
            feedbackMessage = '📚 Good foundation! Focus on factoring patterns and memorizing the quadratic formula.';
        } else {
            feedbackMessage = '💪 Keep practicing! Start with basic factoring, then work on the quadratic formula and vertex form.';
        }

        if (feedback) {
            feedback.innerHTML = feedbackMessage;
            feedback.className = 'performance-feedback';
        }
    }

    function reviewAnswers5() {
        if (quizResults5) quizResults5.style.display = 'none';
        currentQuestion5 = 0;
        showReviewMode5();
    }

    function showReviewMode5() {
        if (quizContainer5) quizContainer5.style.display = 'block';
        showQuestion5(currentQuestion5);

        const userAnswer = userAnswers5[currentQuestion5];
        if (userAnswer && questionCards5 && questionCards5[currentQuestion5]) {
            const choices = questionCards5[currentQuestion5].querySelectorAll('.choice-btn');
            choices.forEach(choice => {
                choice.disabled = true;
                if (choice.dataset.correct === 'true') {
                    choice.classList.add('correct');
                } else if (choice === userAnswer.selected && !userAnswer.correct) {
                    choice.classList.add('incorrect');
                }
                if (choice === userAnswer.selected) {
                    choice.classList.add('selected');
                }
            });
        }

        updateReviewNavigation5();
    }

    function updateReviewNavigation5() {
        if (prevBtn5) prevBtn5.style.display = currentQuestion5 > 0 ? 'inline-flex' : 'none';
        if (nextBtn5) nextBtn5.style.display = currentQuestion5 < (questionCards5 ? questionCards5.length - 1 : 0) ? 'inline-flex' : 'none';

        if (currentQuestion5 === (questionCards5 ? questionCards5.length - 1 : 0)) {
            if (submitBtn5) {
                submitBtn5.textContent = 'Back to Results';
                submitBtn5.style.display = 'inline-flex';
            }
        } else {
            if (submitBtn5) submitBtn5.style.display = 'none';
        }
    }

    function restartQuiz5() {
        currentQuestion5 = 0;
        userAnswers5 = [];
        score5 = 0;
        quizStarted5 = false;

        if (quizResults5) quizResults5.style.display = 'none';
        if (quizExplanation5) quizExplanation5.style.display = 'none';
        if (quizContainer5) quizContainer5.style.display = 'none';

        if (questionCards5) {
            questionCards5.forEach(card => {
                card.classList.remove('active');
                const choices = card.querySelectorAll('.choice-btn');
                choices.forEach(choice => {
                    choice.disabled = false;
                    choice.classList.remove('selected', 'correct', 'incorrect');
                });
            });
        }

        if (startBtn5) startBtn5.style.display = 'inline-flex';
        if (prevBtn5) prevBtn5.style.display = 'none';
        if (nextBtn5) nextBtn5.style.display = 'none';
        if (submitBtn5) submitBtn5.style.display = 'none';
    }
});
</script>
    `
  },

  'systems-equations': {
    title: 'Chapter 15: Systems of Equations',
    duration: 24, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 15: <span style="color: #7c3aed; font-weight: 600;">Systems of Equations</span></h2>
    <p class="lesson-intro">Master solving multiple equations simultaneously - essential for ACT word problems and advanced algebra!</p>

    <div class="learning-path">
        <p><strong>Part 1:</strong> Substitution Method → Replace one variable with an expression</p>
        <p><strong>Part 2:</strong> Elimination Method → Add/subtract equations to eliminate variables</p>
        <p><strong>Part 3:</strong> Graphical Solutions → Where lines intersect</p>
        <p><strong>Part 4:</strong> Word Problems → Real-world system applications</p>
        <p><strong>Your advantage:</strong> You have <span style="color: #059669; font-weight: 600;">strong algebra and quadratic skills</span> from previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #7c3aed; font-weight: 600;">Substitution Method</span></h3>

    <div class="concept-box">
        <h4>💡 What is a System of Equations?</h4>
        <p>A system is <strong>multiple equations with the same variables</strong> that must be true simultaneously.</p>
        <p>Example: {x + y = 5, 2x - y = 4} → Find values of x and y that work in BOTH equations</p>
    </div>

    <div class="rules-box">
        <h4>Substitution Method Steps:</h4>
        <p><strong>Step 1:</strong> Solve one equation for one variable</p>
        <p><strong>Step 2:</strong> Substitute that expression into the other equation</p>
        <p><strong>Step 3:</strong> Solve the resulting single-variable equation</p>
        <p><strong>Step 4:</strong> Back-substitute to find the other variable</p>
        <p><strong>Step 5:</strong> Check your solution in BOTH original equations</p>
    </div>

    <div class="example-box">
        <h4>Example 1: Basic Substitution</h4>
        <p><strong>Problem:</strong> Solve {x + y = 7, 2x - y = 8}</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: From first equation: y = 7 - x</p>
        <p>Step 2: Substitute into second equation: 2x - (7 - x) = 8</p>
        <p>Step 3: Solve: 2x - 7 + x = 8 → 3x = 15 → x = 5</p>
        <p>Step 4: Back-substitute: y = 7 - 5 = 2</p>
        <p>Step 5: Check: 5 + 2 = 7 ✓, 2(5) - 2 = 8 ✓</p>
        <p><strong>Solution: (5, 2)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 2: Substitution with Fractions</h4>
        <p><strong>Problem:</strong> Solve {y = 3x - 1, x + 2y = 11}</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: First equation already solved: y = 3x - 1</p>
        <p>Step 2: Substitute: x + 2(3x - 1) = 11</p>
        <p>Step 3: Solve: x + 6x - 2 = 11 → 7x = 13 → x = 13/7</p>
        <p>Step 4: Back-substitute: y = 3(13/7) - 1 = 39/7 - 7/7 = 32/7</p>
        <p><strong>Solution: (13/7, 32/7)</strong></p>
    </div>

    <div class="tip-box">
        <h4>💡 When to Use Substitution</h4>
        <p><strong>Best when:</strong> One equation already has a variable isolated (like y = ...) or can be easily isolated</p>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #7c3aed; font-weight: 600;">Elimination Method</span></h3>

    <div class="rules-box">
        <h4>Elimination Method Steps:</h4>
        <p><strong>Step 1:</strong> Line up equations with variables aligned</p>
        <p><strong>Step 2:</strong> Multiply one or both equations to make coefficients of one variable opposites</p>
        <p><strong>Step 3:</strong> Add equations to eliminate that variable</p>
        <p><strong>Step 4:</strong> Solve the resulting single-variable equation</p>
        <p><strong>Step 5:</strong> Substitute back to find the other variable</p>
    </div>

    <div class="example-box">
        <h4>Example 3: Direct Elimination</h4>
        <p><strong>Problem:</strong> Solve {3x + y = 11, 2x - y = 4}</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Align equations:</p>
        <p>3x + y = 11</p>
        <p>2x - y = 4</p>
        <p>Step 2: Coefficients of y are already opposites (+1 and -1)</p>
        <p>Step 3: Add equations: (3x + y) + (2x - y) = 11 + 4</p>
        <p>5x = 15 → x = 3</p>
        <p>Step 4: Substitute back: 3(3) + y = 11 → y = 2</p>
        <p><strong>Solution: (3, 2)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 4: Elimination with Multiplication</h4>
        <p><strong>Problem:</strong> Solve {2x + 3y = 16, 5x - 2y = 4}</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: To eliminate x, make coefficients opposites</p>
        <p>Multiply first equation by 5: 10x + 15y = 80</p>
        <p>Multiply second equation by -2: -10x + 4y = -8</p>
        <p>Step 2: Add equations: 19y = 72 → y = 72/19</p>
        <p>Step 3: Substitute back: 2x + 3(72/19) = 16</p>
        <p>2x = 16 - 216/19 = (304 - 216)/19 = 88/19</p>
        <p>x = 44/19</p>
        <p><strong>Solution: (44/19, 72/19)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 5: Elimination - Easier Variable</h4>
        <p><strong>Problem:</strong> Solve {4x + 2y = 14, 3x - 5y = -13}</p>
        <p><strong>Solution:</strong></p>
        <p>Choose to eliminate y (coefficient 2 is simpler than 4)</p>
        <p>Multiply first equation by 5: 20x + 10y = 70</p>
        <p>Multiply second equation by 2: 6x - 10y = -26</p>
        <p>Add equations: 26x = 44 → x = 44/26 = 22/13</p>
        <p>Substitute: 4(22/13) + 2y = 14</p>
        <p>2y = 14 - 88/13 = (182 - 88)/13 = 94/13</p>
        <p>y = 47/13</p>
        <p><strong>Solution: (22/13, 47/13)</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #7c3aed; font-weight: 600;">Special Cases and Graphical Solutions</span></h3>

    <div class="rules-box">
        <h4>Types of Systems:</h4>

        <p><strong>1. One Solution (Intersecting lines):</strong></p>
        <p>Most common case - lines cross at exactly one point</p>

        <p><strong>2. No Solution (Parallel lines):</strong></p>
        <p>Lines have same slope but different y-intercepts</p>
        <p>When solving, you get a false statement like 0 = 5</p>

        <p><strong>3. Infinite Solutions (Same line):</strong></p>
        <p>Equations are equivalent (one is a multiple of the other)</p>
        <p>When solving, you get a true statement like 0 = 0</p>
    </div>

    <div class="example-box">
        <h4>Example 6: No Solution</h4>
        <p><strong>Problem:</strong> Solve {2x + y = 5, 2x + y = 8}</p>
        <p><strong>Solution:</strong></p>
        <p>Subtract first from second: 0 = 3 (FALSE!)</p>
        <p><strong>No solution</strong> - the lines are parallel</p>
    </div>

    <div class="example-box">
        <h4>Example 7: Infinite Solutions</h4>
        <p><strong>Problem:</strong> Solve {x + 2y = 4, 2x + 4y = 8}</p>
        <p><strong>Solution:</strong></p>
        <p>Notice: Second equation is 2 × first equation</p>
        <p>They represent the same line!</p>
        <p><strong>Infinite solutions</strong> - any point on the line x + 2y = 4</p>
    </div>

    <div class="tip-box">
        <h4>💡 Graphical Interpretation</h4>
        <p><strong>One solution:</strong> Lines intersect at one point</p>
        <p><strong>No solution:</strong> Parallel lines (same slope, different intercepts)</p>
        <p><strong>Infinite solutions:</strong> Same line (equations are equivalent)</p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #7c3aed; font-weight: 600;">Word Problems with Systems</span></h3>

    <div class="example-box">
        <h4>Example 8: Age Problem</h4>
        <p><strong>Problem:</strong> Sarah is 3 years older than Tom. In 5 years, Sarah will be twice as old as Tom is now. How old are they now?</p>
        <p><strong>Solution:</strong></p>
        <p>Let S = Sarah's current age, T = Tom's current age</p>
        <p>Equation 1: S = T + 3 (Sarah is 3 years older)</p>
        <p>Equation 2: S + 5 = 2T (In 5 years, Sarah equals twice Tom's current age)</p>
        <p>Substitute: (T + 3) + 5 = 2T</p>
        <p>T + 8 = 2T → T = 8</p>
        <p>S = 8 + 3 = 11</p>
        <p><strong>Sarah is 11, Tom is 8</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 9: Money Problem</h4>
        <p><strong>Problem:</strong> A piggy bank contains $4.85 in dimes and quarters. There are 23 coins total. How many of each coin?</p>
        <p><strong>Solution:</strong></p>
        <p>Let d = number of dimes, q = number of quarters</p>
        <p>Equation 1: d + q = 23 (total coins)</p>
        <p>Equation 2: 0.10d + 0.25q = 4.85 (total value)</p>
        <p>From equation 1: d = 23 - q</p>
        <p>Substitute: 0.10(23 - q) + 0.25q = 4.85</p>
        <p>2.30 - 0.10q + 0.25q = 4.85</p>
        <p>0.15q = 2.55 → q = 17</p>
        <p>d = 23 - 17 = 6</p>
        <p><strong>6 dimes and 17 quarters</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 10: Mixture Problem</h4>
        <p><strong>Problem:</strong> How many gallons of 20% salt solution and 60% salt solution should be mixed to get 10 gallons of 35% salt solution?</p>
        <p><strong>Solution:</strong></p>
        <p>Let x = gallons of 20% solution, y = gallons of 60% solution</p>
        <p>Equation 1: x + y = 10 (total gallons)</p>
        <p>Equation 2: 0.20x + 0.60y = 0.35(10) = 3.5 (salt content)</p>
        <p>From equation 1: y = 10 - x</p>
        <p>Substitute: 0.20x + 0.60(10 - x) = 3.5</p>
        <p>0.20x + 6 - 0.60x = 3.5</p>
        <p>-0.40x = -2.5 → x = 6.25</p>
        <p>y = 10 - 6.25 = 3.75</p>
        <p><strong>6.25 gallons of 20% and 3.75 gallons of 60%</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 11: Rate Problem</h4>
        <p><strong>Problem:</strong> A boat travels 36 miles downstream in 2 hours and 36 miles upstream in 3 hours. Find the boat's speed in still water and the current speed.</p>
        <p><strong>Solution:</strong></p>
        <p>Let b = boat speed in still water, c = current speed</p>
        <p>Downstream speed = b + c, Upstream speed = b - c</p>
        <p>Using distance = rate × time:</p>
        <p>Equation 1: 2(b + c) = 36 → b + c = 18</p>
        <p>Equation 2: 3(b - c) = 36 → b - c = 12</p>
        <p>Add equations: 2b = 30 → b = 15 mph</p>
        <p>Substitute: 15 + c = 18 → c = 3 mph</p>
        <p><strong>Boat speed: 15 mph, Current: 3 mph</strong></p>
    </div>
</div>

<div class="section">
    <h3>🔗 ACT Systems Strategies</h3>

    <div class="tip-box">
        <h4>💡 Method Selection</h4>
        <p><strong>Use Substitution when:</strong></p>
        <p>• One variable is already isolated</p>
        <p>• Easy to solve for one variable</p>
        <p>• Coefficients are 1 or simple fractions</p>

        <p><strong>Use Elimination when:</strong></p>
        <p>• Coefficients are already opposites or easily made opposites</p>
        <p>• Both equations have similar complexity</p>
        <p>• Working with integers</p>
    </div>

    <div class="example-box">
        <h4>Example 12: ACT-Style Choice</h4>
        <p><strong>Problem:</strong> Solve {3x - 2y = 7, x + 4y = 1} Choose the best method.</p>
        <p><strong>Analysis:</strong></p>
        <p>Substitution looks good: x = 1 - 4y from second equation</p>
        <p><strong>Solution:</strong></p>
        <p>Substitute: 3(1 - 4y) - 2y = 7</p>
        <p>3 - 12y - 2y = 7 → -14y = 4 → y = -2/7</p>
        <p>x = 1 - 4(-2/7) = 1 + 8/7 = 15/7</p>
        <p><strong>Solution: (15/7, -2/7)</strong></p>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Systems of equations are crucial for ACT word problems! Master both substitution and elimination methods, choose the easier method for each problem, and always check your solutions. Remember: substitution works great when one variable is isolated, elimination works well with similar coefficients. Practice identifying the three types of solutions: one solution (intersecting lines), no solution (parallel lines), and infinite solutions (same line)!</p>
</div>

<div class="interactive-quiz">
    <h3>🎯 Interactive Quiz: Master Systems of Equations!</h3>
    <div class="quiz-intro">
        <p>Time to apply your skills! These 6 questions test substitution, elimination, and system types - key concepts for ACT success!</p>
    </div>

    <div class="quiz-container" id="systems-equations-quiz">
        <div class="question-card active" data-question="1">
            <div class="question-header">
                <span class="question-number">Question 1 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 16.67%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Substitution Method</h4>
                <p>Solve the system: {x + y = 7, 2x - y = 2}</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="true" data-explanation="Correct! From first equation: y = 7 - x. Substitute into second: 2x - (7 - x) = 2, so 2x - 7 + x = 2, giving 3x = 9, x = 3. Then y = 7 - 3 = 4.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">(3, 4)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="This doesn't satisfy the first equation: 4 + 3 = 7, but we need x + y = 7.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">(4, 3)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Check: 2 + 5 = 7 ✓, but 2(2) - 5 = 4 - 5 = -1, not 2.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">(2, 5)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Check: 5 + 2 = 7 ✓, but 2(5) - 2 = 10 - 2 = 8, not 2.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">(5, 2)</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="2">
            <div class="question-header">
                <span class="question-number">Question 2 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 33.33%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Elimination Method</h4>
                <p>Solve the system: {3x + 2y = 16, 3x - y = 7}</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="Let's check: 3(2) + 2(5) = 6 + 10 = 16 ✓, but 3(2) - 5 = 6 - 5 = 1, not 7.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">(2, 5)</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Perfect! Subtract equations: (3x + 2y) - (3x - y) = 16 - 7, so 3y = 9, y = 3. Then substitute: 3x - 3 = 7, so x = 10/3.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">(10/3, 3)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Check: 3(4) + 2(2) = 12 + 4 = 16 ✓, but 3(4) - 2 = 12 - 2 = 10, not 7.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">(4, 2)</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Check: 3(3) + 2(10/3) = 9 + 20/3 ≈ 15.67, not 16.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">(3, 10/3)</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="3">
            <div class="question-header">
                <span class="question-number">Question 3 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 50%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>System Types</h4>
                <p>What type of solution does this system have: {2x + 3y = 6, 4x + 6y = 12}?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="Not quite. Notice that the second equation is exactly 2 times the first equation.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">One unique solution</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="No solution occurs when lines are parallel (same slope, different intercepts). These equations represent the same line.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">No solution</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Exactly! The second equation 4x + 6y = 12 is just 2 times the first equation 2x + 3y = 6. They're the same line, so infinite solutions.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">Infinite solutions</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Every system has exactly one of three types: one solution, no solution, or infinite solutions.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">Cannot be determined</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="4">
            <div class="question-header">
                <span class="question-number">Question 4 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 66.67%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Word Problem</h4>
                <p>At a movie theater, 3 adult tickets and 2 child tickets cost $31. 2 adult tickets and 4 child tickets cost $26. What's the cost of one adult ticket?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="Let's check: 3($8) + 2($3.50) = $24 + $7 = $31 ✓, but 2($8) + 4($3.50) = $16 + $14 = $30, not $26.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">$8</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Perfect! Let a = adult, c = child. System: {3a + 2c = 31, 2a + 4c = 26}. Multiply first by 2: 6a + 4c = 62. Subtract second: 4a = 36, so a = $9.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">$9</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Check: 3($10) + 2($0.50) = $30 + $1 = $31 ✓, but 2($10) + 4($0.50) = $20 + $2 = $22, not $26.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">$10</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Check: 3($7) + 2($5) = $21 + $10 = $31 ✓, but 2($7) + 4($5) = $14 + $20 = $34, not $26.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">$7</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="5">
            <div class="question-header">
                <span class="question-number">Question 5 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 83.33%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>No Solution System</h4>
                <p>What type of system is {2x - 3y = 5, 4x - 6y = 12}?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="false" data-explanation="If there were one solution, the lines would intersect. But these lines have the same slope and different y-intercepts.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">One solution</span>
                    </button>
                    <button class="choice-btn" data-correct="true" data-explanation="Correct! The second equation 4x - 6y = 12 is 2 times the left side of the first (2x - 3y), but 12 ≠ 2(5). These are parallel lines - no solution.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">No solution</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Infinite solutions would mean the equations represent the same line, but 4x - 6y = 12 is not equivalent to 2x - 3y = 5.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">Infinite solutions</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="We can determine this by comparing the equations. The coefficients suggest parallel lines.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">Cannot determine</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="question-card" data-question="6">
            <div class="question-header">
                <span class="question-number">Question 6 of 6</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 100%"></div>
                </div>
            </div>
            <div class="question-content">
                <h4>Method Choice</h4>
                <p>For the system {y = 2x - 1, 3x + 4y = 22}, which method would be most efficient?</p>
                <div class="answer-choices">
                    <button class="choice-btn" data-correct="true" data-explanation="Excellent choice! Since y is already isolated in the first equation (y = 2x - 1), substitution is the most direct method.">
                        <span class="choice-letter">A</span>
                        <span class="choice-text">Substitution - y is already solved</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Elimination would require rearranging the first equation. Since y is already isolated, substitution is more efficient.">
                        <span class="choice-letter">B</span>
                        <span class="choice-text">Elimination - coefficients are simple</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="Graphing would work but is less precise and more time-consuming than substitution.">
                        <span class="choice-letter">C</span>
                        <span class="choice-text">Graphing - easier to visualize</span>
                    </button>
                    <button class="choice-btn" data-correct="false" data-explanation="When one variable is isolated, substitution is clearly the best choice.">
                        <span class="choice-letter">D</span>
                        <span class="choice-text">All methods are equally efficient</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="quiz-explanation" style="display: none;">
        <div class="explanation-content"></div>
        <div class="explanation-buttons">
            <button id="next-question-btn-8" class="nav-btn">Next Question →</button>
        </div>
    </div>

    <div class="quiz-results" style="display: none;">
        <div class="results-content">
            <h3>🎉 Quiz Complete!</h3>
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-text">0/6</span>
                </div>
            </div>
            <div class="performance-feedback"></div>
            <div class="results-actions">
                <button id="review-answers-btn-3" class="nav-btn secondary">Review Answers</button>
                <button id="restart-quiz-btn-3" class="nav-btn">Try Again</button>
            </div>
        </div>
    </div>

    <div class="quiz-navigation">
        <button id="start-quiz-btn-3" class="nav-btn primary">Start Quiz</button>
        <button id="prev-btn-3" class="nav-btn secondary" style="display: none;">← Previous</button>
        <button id="next-btn-3" class="nav-btn primary" style="display: none;">Next →</button>
        <button id="submit-quiz-btn-3" class="nav-btn primary" style="display: none;">Submit Quiz</button>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion3 = 0;
    let userAnswers3 = [];
    let score3 = 0;
    let quizStarted3 = false;

    const questionCards3 = document.querySelectorAll('.question-card');
    const startBtn3 = document.getElementById('start-quiz-btn-3');
    const prevBtn3 = document.getElementById('prev-btn-3');
    const nextBtn3 = document.getElementById('next-btn-3');
    const submitBtn3 = document.getElementById('submit-quiz-btn-3');
    const restartBtn3 = document.getElementById('restart-quiz-btn-3');
    const reviewBtn3 = document.getElementById('review-answers-btn-3');
    const nextQuestionBtn3 = document.getElementById('next-question-btn-3');
    const quizContainer3 = document.querySelector('.quiz-container');
    const quizExplanation3 = document.querySelector('.quiz-explanation');
    const quizResults3 = document.querySelector('.quiz-results');

    if (startBtn3) startBtn3.addEventListener('click', startQuiz3);
    if (prevBtn3) prevBtn3.addEventListener('click', previousQuestion3);
    if (nextBtn3) nextBtn3.addEventListener('click', nextQuestion3);
    if (submitBtn3) submitBtn3.addEventListener('click', submitQuiz3);
    if (restartBtn3) restartBtn3.addEventListener('click', restartQuiz3);
    if (reviewBtn3) reviewBtn3.addEventListener('click', reviewAnswers3);
    if (nextQuestionBtn3) nextQuestionBtn3.addEventListener('click', nextQuestion3);

    function startQuiz3() {
        quizStarted3 = true;
        currentQuestion3 = 0;
        userAnswers3 = [];
        score3 = 0;

        if (startBtn3) startBtn3.style.display = 'none';
        showQuestion3(0);
        updateNavigation3();
    }

    function showQuestion3(index) {
        if (questionCards3) {
            questionCards3.forEach(card => card.classList.remove('active'));
            if (questionCards3[index]) {
                questionCards3[index].classList.add('active');
                setupQuestionListeners3(index);
            }
        }
    }

    function setupQuestionListeners3(index) {
        if (questionCards3 && questionCards3[index]) {
            const choices = questionCards3[index].querySelectorAll('.choice-btn');
            choices.forEach(choice => {
                choice.addEventListener('click', function() {
                    if (this.disabled) return;

                    choices.forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                    userAnswers3[index] = {
                        selected: this,
                        correct: this.dataset.correct === 'true',
                        explanation: this.dataset.explanation
                    };

                    setTimeout(() => {
                        showExplanation3(index);
                    }, 300);
                });
            });
        }
    }

    function showExplanation3(index) {
        if (questionCards3 && questionCards3[index]) {
            const choices = questionCards3[index].querySelectorAll('.choice-btn');
            const userAnswer = userAnswers3[index];

            choices.forEach(choice => {
                choice.disabled = true;
                if (choice.dataset.correct === 'true') {
                    choice.classList.add('correct');
                } else if (choice === userAnswer.selected && !userAnswer.correct) {
                    choice.classList.add('incorrect');
                }
            });

            const explanationContent = document.querySelector('.explanation-content');
            if (explanationContent) {
                explanationContent.innerHTML =
                    '<h4>' + (userAnswer.correct ? 'Correct!' : 'Incorrect') + '</h4>' +
                    '<p>' + userAnswer.explanation + '</p>';
            }

            if (quizContainer3) quizContainer3.style.display = 'none';
            if (quizExplanation3) quizExplanation3.style.display = 'block';

            updateNavigationForExplanation3();
        }
    }

    function updateNavigationForExplanation3() {
        if (prevBtn3) prevBtn3.style.display = 'none';
        if (nextBtn3) nextBtn3.style.display = 'none';
        if (submitBtn3) submitBtn3.style.display = 'none';

        if (nextQuestionBtn3) {
            if (currentQuestion3 < (questionCards3 ? questionCards3.length - 1 : 0)) {
                nextQuestionBtn3.style.display = 'inline-flex';
                nextQuestionBtn3.textContent = 'Next Question →';
            } else {
                nextQuestionBtn3.style.display = 'inline-flex';
                nextQuestionBtn3.textContent = 'View Results →';
            }
        }
    }

    function nextQuestion3() {
        if (quizExplanation3 && quizExplanation3.style.display === 'block') {
            quizExplanation3.style.display = 'none';
            if (quizContainer3) quizContainer3.style.display = 'block';

            if (currentQuestion3 < (questionCards3 ? questionCards3.length - 1 : 0)) {
                currentQuestion3++;
                showQuestion3(currentQuestion3);
                updateNavigation3();
            } else {
                submitQuiz3();
            }
        } else if (userAnswers3[currentQuestion3]) {
            showExplanation3(currentQuestion3);
        }
    }

    function previousQuestion3() {
        if (currentQuestion3 > 0) {
            currentQuestion3--;
            showQuestion3(currentQuestion3);
            updateNavigation3();
        }
    }

    function updateNavigation3() {
        if (prevBtn3) prevBtn3.style.display = currentQuestion3 > 0 ? 'inline-flex' : 'none';

        const hasAnswered = userAnswers3[currentQuestion3];
        if (nextBtn3) nextBtn3.style.display = hasAnswered ? 'inline-flex' : 'none';

        if (currentQuestion3 === (questionCards3 ? questionCards3.length - 1 : 0) && hasAnswered) {
            if (nextBtn3) nextBtn3.style.display = 'none';
            if (submitBtn3) submitBtn3.style.display = 'inline-flex';
        } else {
            if (submitBtn3) submitBtn3.style.display = 'none';
        }
    }

    function submitQuiz3() {
        score3 = userAnswers3.filter(answer => answer && answer.correct).length;

        if (quizContainer3) quizContainer3.style.display = 'none';
        if (quizExplanation3) quizExplanation3.style.display = 'none';
        if (prevBtn3) prevBtn3.style.display = 'none';
        if (nextBtn3) nextBtn3.style.display = 'none';
        if (submitBtn3) submitBtn3.style.display = 'none';

        displayResults3();
        if (quizResults3) quizResults3.style.display = 'block';
    }

    function displayResults3() {
        const scoreText = document.querySelector('.score-text');
        const feedback = document.querySelector('.performance-feedback');

        if (scoreText) scoreText.textContent = score3 + '/6';

        let feedbackMessage = '';
        if (score3 === 6) {
            feedbackMessage = '🎉 Outstanding! You\'ve mastered systems of equations! Ready for any ACT system problem.';
        } else if (score3 >= 4) {
            feedbackMessage = '👍 Great work! You understand systems well. Review the challenging questions to perfect your skills.';
        } else if (score3 >= 2) {
            feedbackMessage = '📚 Good foundation! Focus on choosing the right method and checking your solutions in both equations.';
        } else {
            feedbackMessage = '💪 Keep practicing! Master substitution and elimination basics, then tackle word problems step by step.';
        }

        if (feedback) {
            feedback.innerHTML = feedbackMessage;
            feedback.className = 'performance-feedback';
        }
    }

    function reviewAnswers3() {
        if (quizResults3) quizResults3.style.display = 'none';
        currentQuestion3 = 0;
        showReviewMode3();
    }

    function showReviewMode3() {
        if (quizContainer3) quizContainer3.style.display = 'block';
        showQuestion3(currentQuestion3);

        const userAnswer = userAnswers3[currentQuestion3];
        if (userAnswer && questionCards3 && questionCards3[currentQuestion3]) {
            const choices = questionCards3[currentQuestion3].querySelectorAll('.choice-btn');
            choices.forEach(choice => {
                choice.disabled = true;
                if (choice.dataset.correct === 'true') {
                    choice.classList.add('correct');
                } else if (choice === userAnswer.selected && !userAnswer.correct) {
                    choice.classList.add('incorrect');
                }
                if (choice === userAnswer.selected) {
                    choice.classList.add('selected');
                }
            });
        }

        updateReviewNavigation3();
    }

    function updateReviewNavigation3() {
        if (prevBtn3) prevBtn3.style.display = currentQuestion3 > 0 ? 'inline-flex' : 'none';
        if (nextBtn3) nextBtn3.style.display = currentQuestion3 < (questionCards3 ? questionCards3.length - 1 : 0) ? 'inline-flex' : 'none';

        if (currentQuestion3 === (questionCards3 ? questionCards3.length - 1 : 0)) {
            if (submitBtn3) {
                submitBtn3.textContent = 'Back to Results';
                submitBtn3.style.display = 'inline-flex';
            }
        } else {
            if (submitBtn3) submitBtn3.style.display = 'none';
        }
    }

    function restartQuiz3() {
        currentQuestion3 = 0;
        userAnswers3 = [];
        score3 = 0;
        quizStarted3 = false;

        if (quizResults3) quizResults3.style.display = 'none';
        if (quizExplanation3) quizExplanation3.style.display = 'none';
        if (quizContainer3) quizContainer3.style.display = 'none';

        if (questionCards3) {
            questionCards3.forEach(card => {
                card.classList.remove('active');
                const choices = card.querySelectorAll('.choice-btn');
                choices.forEach(choice => {
                    choice.disabled = false;
                    choice.classList.remove('selected', 'correct', 'incorrect');
                });
            });
        }

        if (startBtn3) startBtn3.style.display = 'inline-flex';
        if (prevBtn3) prevBtn3.style.display = 'none';
        if (nextBtn3) nextBtn3.style.display = 'none';
        if (submitBtn3) submitBtn3.style.display = 'none';
    }
});
</script>
    `
  },

  'trigonometry': {
    title: 'Chapter 16: Trigonometry',
    duration: 26, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 16: <span style="color: #0891b2; font-weight: 600;">Trigonometry</span></h2>
    <p class="lesson-intro">Master right triangle trigonometry and the unit circle - essential for ACT geometry and advanced topics!</p>

    <div class="learning-path">
        <p><strong>Part 1:</strong> SOH-CAH-TOA → Right triangle trigonometric ratios</p>
        <p><strong>Part 2:</strong> Special Triangles → 30-60-90 and 45-45-90 exact values</p>
        <p><strong>Part 3:</strong> Unit Circle Basics → Angles and coordinates</p>
        <p><strong>Part 4:</strong> ACT Applications → Real-world trig problems</p>
        <p><strong>Your advantage:</strong> You have <span style="color: #059669; font-weight: 600;">strong geometry foundations</span> from previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #0891b2; font-weight: 600;">SOH-CAH-TOA - Right Triangle Trigonometry</span></h3>

    <div class="concept-box">
        <h4>💡 The Three Basic Trigonometric Ratios</h4>
        <p>For a right triangle with angle θ (theta):</p>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>SOH:</strong> sin θ = <u>Opposite</u> / Hypotenuse</p>
            <p><strong>CAH:</strong> cos θ = <u>Adjacent</u> / Hypotenuse</p>
            <p><strong>TOA:</strong> tan θ = <u>Opposite</u> / Adjacent</p>
        </div>
    </div>

    <div class="rules-box">
        <h4>Key Triangle Components:</h4>
        <p><strong>Hypotenuse:</strong> The longest side, opposite the right angle</p>
        <p><strong>Opposite:</strong> The side across from angle θ</p>
        <p><strong>Adjacent:</strong> The side next to angle θ (but not the hypotenuse)</p>

        <p style="margin-top: 15px;"><strong>Visual Triangle Reference:</strong></p>
        <div style="font-family: monospace; background: #f9fafb; padding: 10px; margin: 10px 0;">
        <pre>
          C
          |\
          | \
   b      |  \ a (hypotenuse)
          |   \
          |θ___\
          A  c  B
        </pre>
        </div>
        <p>For angle θ at A: opposite = a, adjacent = c, hypotenuse = b</p>
    </div>

    <div class="example-box">
        <h4>Example 1: Finding Trig Ratios</h4>
        <p><strong>Problem:</strong> In a right triangle, the side opposite to angle A is 3 and the hypotenuse is 5. Find sin A, cos A, and tan A.</p>
        <p><strong>Solution:</strong></p>
        <p>Given: opposite = 3, hypotenuse = 5</p>
        <p>Find adjacent using Pythagorean theorem: adjacent² + 3² = 5²</p>
        <p>adjacent² = 25 - 9 = 16 → adjacent = 4</p>
        <p><strong>sin A = 3/5</strong></p>
        <p><strong>cos A = 4/5</strong></p>
        <p><strong>tan A = 3/4</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 2: Using Trig to Find Sides</h4>
        <p><strong>Problem:</strong> A right triangle has hypotenuse 10 and angle A = 30°. Find the opposite and adjacent sides.</p>
        <p><strong>Solution:</strong></p>
        <p>Using sin 30° = 1/2:</p>
        <p>sin 30° = opposite/10 → 1/2 = opposite/10 → opposite = 5</p>
        <p>Using cos 30° = √3/2:</p>
        <p>cos 30° = adjacent/10 → √3/2 = adjacent/10 → adjacent = 5√3</p>
        <p><strong>Opposite = 5, Adjacent = 5√3</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 3: Using Trig to Find Angles</h4>
        <p><strong>Problem:</strong> A right triangle has opposite = 7 and adjacent = 24. Find angle θ.</p>
        <p><strong>Solution:</strong></p>
        <p>tan θ = opposite/adjacent = 7/24</p>
        <p>θ = arctan(7/24) = tan⁻¹(7/24)</p>
        <p>Using calculator: θ ≈ 16.26°</p>
        <p><strong>θ ≈ 16.3°</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #0891b2; font-weight: 600;">Special Triangles and Exact Values</span></h3>

    <div class="rules-box">
        <h4>30-60-90 Triangle (Half an Equilateral Triangle):</h4>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
            <p><strong>Side Ratios:</strong> 1 : √3 : 2</p>
            <p>If the short side (opposite 30°) = x, then:</p>
            <p>• Side opposite 30° = x</p>
            <p>• Side opposite 60° = x√3</p>
            <p>• Hypotenuse = 2x</p>
        </div>

        <p><strong>Exact Trig Values for 30° and 60°:</strong></p>
        <p>sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3 = √3/3</p>
        <p>sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3</p>
    </div>

    <div class="rules-box">
        <h4>45-45-90 Triangle (Isosceles Right Triangle):</h4>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
            <p><strong>Side Ratios:</strong> 1 : 1 : √2</p>
            <p>If each leg = x, then:</p>
            <p>• Both legs = x</p>
            <p>• Hypotenuse = x√2</p>
        </div>

        <p><strong>Exact Trig Values for 45°:</strong></p>
        <p>sin 45° = √2/2, cos 45° = √2/2, tan 45° = 1</p>
    </div>

    <div class="example-box">
        <h4>Example 4: 30-60-90 Triangle Application</h4>
        <p><strong>Problem:</strong> The shorter leg of a 30-60-90 triangle is 8. Find the other leg and hypotenuse.</p>
        <p><strong>Solution:</strong></p>
        <p>In a 30-60-90 triangle with ratios 1 : √3 : 2:</p>
        <p>Short leg (opposite 30°) = 8</p>
        <p>Long leg (opposite 60°) = 8√3</p>
        <p>Hypotenuse = 2(8) = 16</p>
        <p><strong>Other leg = 8√3, Hypotenuse = 16</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 5: 45-45-90 Triangle Application</h4>
        <p><strong>Problem:</strong> A 45-45-90 triangle has hypotenuse 10√2. Find the legs.</p>
        <p><strong>Solution:</strong></p>
        <p>In a 45-45-90 triangle with ratios 1 : 1 : √2:</p>
        <p>If leg = x, then hypotenuse = x√2</p>
        <p>x√2 = 10√2 → x = 10</p>
        <p><strong>Both legs = 10</strong></p>
    </div>

    <div class="tip-box">
        <h4>💡 Memory Aid for Exact Values</h4>
        <div style="background: #fffbeb; padding: 10px; border-radius: 6px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                <tr style="border-bottom: 1px solid #ddd;">
                    <th>Angle</th><th>sin</th><th>cos</th><th>tan</th>
                </tr>
                <tr>
                    <td>30°</td><td>1/2</td><td>√3/2</td><td>√3/3</td>
                </tr>
                <tr>
                    <td>45°</td><td>√2/2</td><td>√2/2</td><td>1</td>
                </tr>
                <tr>
                    <td>60°</td><td>√3/2</td><td>1/2</td><td>√3</td>
                </tr>
            </table>
        </div>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #0891b2; font-weight: 600;">Unit Circle Basics</span></h3>

    <div class="concept-box">
        <h4>💡 What is the Unit Circle?</h4>
        <p>A circle with radius 1 centered at the origin (0, 0).</p>
        <p>Any point on the unit circle has coordinates <strong>(cos θ, sin θ)</strong> where θ is the angle from the positive x-axis.</p>
    </div>

    <div class="rules-box">
        <h4>Key Unit Circle Points (First Quadrant):</h4>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
            <p><strong>0° (0 radians):</strong> (1, 0)</p>
            <p><strong>30° (π/6 radians):</strong> (√3/2, 1/2)</p>
            <p><strong>45° (π/4 radians):</strong> (√2/2, √2/2)</p>
            <p><strong>60° (π/3 radians):</strong> (1/2, √3/2)</p>
            <p><strong>90° (π/2 radians):</strong> (0, 1)</p>
        </div>
    </div>

    <div class="rules-box">
        <h4>Angle Conversion:</h4>
        <p><strong>Degrees to Radians:</strong> multiply by π/180</p>
        <p><strong>Radians to Degrees:</strong> multiply by 180/π</p>
        <p><strong>Common Conversions:</strong></p>
        <p>30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2, 180° = π</p>
    </div>

    <div class="example-box">
        <h4>Example 6: Finding Coordinates on Unit Circle</h4>
        <p><strong>Problem:</strong> Find the coordinates of the point on the unit circle at angle 150°.</p>
        <p><strong>Solution:</strong></p>
        <p>150° = 180° - 30°, so it's in Quadrant II</p>
        <p>Reference angle = 30°</p>
        <p>In Quadrant II: x is negative, y is positive</p>
        <p>cos 150° = -cos 30° = -√3/2</p>
        <p>sin 150° = sin 30° = 1/2</p>
        <p><strong>Coordinates: (-√3/2, 1/2)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 7: Converting Angle Measures</h4>
        <p><strong>Problem:</strong> Convert 5π/6 radians to degrees and find sin(5π/6).</p>
        <p><strong>Solution:</strong></p>
        <p>5π/6 × 180°/π = 5 × 180°/6 = 150°</p>
        <p>5π/6 is in Quadrant II (between π/2 and π)</p>
        <p>Reference angle = π - 5π/6 = π/6 (which is 30°)</p>
        <p>sin(5π/6) = sin(30°) = 1/2</p>
        <p><strong>150°, sin(5π/6) = 1/2</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #0891b2; font-weight: 600;">ACT Trigonometry Applications</span></h3>

    <div class="example-box">
        <h4>Example 8: Angle of Elevation</h4>
        <p><strong>Problem:</strong> From a point 50 feet from the base of a building, the angle of elevation to the top is 60°. How tall is the building?</p>
        <p><strong>Solution:</strong></p>
        <p>This forms a right triangle where:</p>
        <p>• Adjacent side (horizontal distance) = 50 feet</p>
        <p>• Opposite side (building height) = h</p>
        <p>• Angle = 60°</p>
        <p>tan 60° = opposite/adjacent = h/50</p>
        <p>√3 = h/50 → h = 50√3 ≈ 86.6 feet</p>
        <p><strong>Building height = 50√3 feet</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 9: Navigation Problem</h4>
        <p><strong>Problem:</strong> A plane flies 100 miles at a bearing of 30° north of east. How far north and east has it traveled?</p>
        <p><strong>Solution:</strong></p>
        <p>30° north of east means 30° from the east direction</p>
        <p>Distance north = 100 × sin 30° = 100 × (1/2) = 50 miles</p>
        <p>Distance east = 100 × cos 30° = 100 × (√3/2) = 50√3 miles</p>
        <p><strong>North: 50 miles, East: 50√3 miles</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 10: Ladder Problem</h4>
        <p><strong>Problem:</strong> A 20-foot ladder leans against a wall at an angle of 70° with the ground. How high up the wall does the ladder reach?</p>
        <p><strong>Solution:</strong></p>
        <p>The ladder is the hypotenuse = 20 feet</p>
        <p>The height is opposite to the 70° angle</p>
        <p>sin 70° = height/20</p>
        <p>height = 20 × sin 70° ≈ 20 × 0.940 = 18.8 feet</p>
        <p><strong>Height ≈ 18.8 feet</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 11: Shadow Problem</h4>
        <p><strong>Problem:</strong> A 15-foot flagpole casts a 12-foot shadow. What is the angle of elevation of the sun?</p>
        <p><strong>Solution:</strong></p>
        <p>tan θ = opposite/adjacent = 15/12 = 5/4 = 1.25</p>
        <p>θ = arctan(1.25) ≈ 51.3°</p>
        <p><strong>Angle of elevation ≈ 51.3°</strong></p>
    </div>

    <div class="tip-box">
        <h4>💡 ACT Trigonometry Strategy</h4>
        <p><strong>Always identify:</strong></p>
        <p>1. Which angle you're working with</p>
        <p>2. Which sides are opposite, adjacent, and hypotenuse relative to that angle</p>
        <p>3. Which trig ratio connects your known and unknown values</p>
        <p><strong>Remember:</strong> For special angles (30°, 45°, 60°), use exact values instead of decimal approximations!</p>
    </div>
</div>

<div class="section">
    <h3>🔗 Advanced Trigonometric Identities</h3>

    <div class="rules-box">
        <h4>Fundamental Identities (ACT Level):</h4>

        <p><strong>Pythagorean Identity:</strong></p>
        <p>sin²θ + cos²θ = 1</p>

        <p><strong>Reciprocal Identities:</strong></p>
        <p>csc θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ</p>

        <p><strong>Quotient Identity:</strong></p>
        <p>tan θ = sin θ/cos θ</p>
    </div>

    <div class="example-box">
        <h4>Example 12: Using Pythagorean Identity</h4>
        <p><strong>Problem:</strong> If sin θ = 3/5 and θ is in Quadrant I, find cos θ and tan θ.</p>
        <p><strong>Solution:</strong></p>
        <p>Using sin²θ + cos²θ = 1:</p>
        <p>(3/5)² + cos²θ = 1</p>
        <p>9/25 + cos²θ = 1</p>
        <p>cos²θ = 1 - 9/25 = 16/25</p>
        <p>cos θ = ±4/5, but since Quadrant I, cos θ = 4/5</p>
        <p>tan θ = sin θ/cos θ = (3/5)/(4/5) = 3/4</p>
        <p><strong>cos θ = 4/5, tan θ = 3/4</strong></p>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Trigonometry is essential for ACT success! Master SOH-CAH-TOA for right triangles, memorize exact values for 30°, 45°, and 60° angles, understand the unit circle basics, and practice real-world applications like angle of elevation problems. Remember: identify your angle and sides first, choose the correct trig ratio, and use exact values for special angles. Trigonometry connects geometry, algebra, and real-world problem-solving on the ACT!</p>
</div>

<!-- QUIZ_21 -->
    `
  },

  'advanced-geometry': {
    title: 'Chapter 17: Advanced Geometry',
    duration: 30, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 17: <span style="color: #059669; font-weight: 600;">Advanced Geometry</span></h2>
    <p class="lesson-intro">Master coordinate geometry, transformations, and 3D shapes - the most challenging ACT geometry topics!</p>

    <div class="learning-path">
        <p><strong>Part 1:</strong> Coordinate Geometry → Distance, midpoint, and line equations</p>
        <p><strong>Part 2:</strong> Transformations → Reflections, rotations, translations</p>
        <p><strong>Part 3:</strong> 3D Geometry → Surface area and volume of complex shapes</p>
        <p><strong>Part 4:</strong> Advanced Applications → Complex geometry problems</p>
        <p><strong>Your advantage:</strong> You have <span style="color: #dc2626; font-weight: 600;">mastered all fundamental geometry</span> from previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #059669; font-weight: 600;">Coordinate Geometry</span></h3>

    <div class="rules-box">
        <h4>Essential Coordinate Formulas:</h4>

        <p><strong>Distance Formula:</strong></p>
        <p style="text-align: center; background: #f0fdf4; padding: 10px; border-radius: 6px;">
            d = √[(x₂ - x₁)² + (y₂ - y₁)²]
        </p>

        <p><strong>Midpoint Formula:</strong></p>
        <p style="text-align: center; background: #f0fdf4; padding: 10px; border-radius: 6px;">
            M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
        </p>

        <p><strong>Slope Formula:</strong></p>
        <p style="text-align: center; background: #f0fdf4; padding: 10px; border-radius: 6px;">
            m = (y₂ - y₁)/(x₂ - x₁)
        </p>
    </div>

    <div class="example-box">
        <h4>Example 1: Distance and Midpoint</h4>
        <p><strong>Problem:</strong> Find the distance and midpoint between A(2, 3) and B(8, 11).</p>
        <p><strong>Solution:</strong></p>
        <p>Distance: d = √[(8 - 2)² + (11 - 3)²] = √[6² + 8²] = √[36 + 64] = √100 = 10</p>
        <p>Midpoint: M = ((2 + 8)/2, (3 + 11)/2) = (5, 7)</p>
        <p><strong>Distance = 10, Midpoint = (5, 7)</strong></p>
    </div>

    <div class="rules-box">
        <h4>Line Equations (Four Forms):</h4>

        <p><strong>1. Point-Slope Form:</strong> y - y₁ = m(x - x₁)</p>
        <p><strong>2. Slope-Intercept Form:</strong> y = mx + b</p>
        <p><strong>3. Standard Form:</strong> Ax + By = C</p>
        <p><strong>4. Two-Point Form:</strong> (y - y₁)/(y₂ - y₁) = (x - x₁)/(x₂ - x₁)</p>
    </div>

    <div class="example-box">
        <h4>Example 2: Line Equations</h4>
        <p><strong>Problem:</strong> Find the equation of the line passing through (3, -2) with slope 4.</p>
        <p><strong>Solution:</strong></p>
        <p>Using point-slope form: y - (-2) = 4(x - 3)</p>
        <p>y + 2 = 4x - 12</p>
        <p>y = 4x - 14 (slope-intercept form)</p>
        <p>4x - y = 14 (standard form)</p>
        <p><strong>y = 4x - 14</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 3: Parallel and Perpendicular Lines</h4>
        <p><strong>Problem:</strong> Find the equation of the line perpendicular to 2x + 3y = 6 that passes through (1, 4).</p>
        <p><strong>Solution:</strong></p>
        <p>Original line: 2x + 3y = 6 → 3y = -2x + 6 → y = -2/3 x + 2</p>
        <p>Slope of original line = -2/3</p>
        <p>Perpendicular slope = 3/2 (negative reciprocal)</p>
        <p>Using point-slope: y - 4 = 3/2(x - 1)</p>
        <p>y - 4 = 3/2 x - 3/2</p>
        <p><strong>y = 3/2 x + 5/2</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 4: Circle Equations</h4>
        <p><strong>Problem:</strong> Find the center and radius of the circle x² + y² - 6x + 4y - 12 = 0.</p>
        <p><strong>Solution:</strong></p>
        <p>Complete the square for both x and y:</p>
        <p>x² - 6x + y² + 4y = 12</p>
        <p>(x² - 6x + 9) + (y² + 4y + 4) = 12 + 9 + 4</p>
        <p>(x - 3)² + (y + 2)² = 25</p>
        <p><strong>Center: (3, -2), Radius: 5</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #059669; font-weight: 600;">Transformations</span></h3>

    <div class="rules-box">
        <h4>Basic Transformations:</h4>

        <p><strong>Translation (Slide):</strong></p>
        <p>(x, y) → (x + h, y + k) where h = horizontal shift, k = vertical shift</p>

        <p><strong>Reflection:</strong></p>
        <p>• Over x-axis: (x, y) → (x, -y)</p>
        <p>• Over y-axis: (x, y) → (-x, y)</p>
        <p>• Over y = x: (x, y) → (y, x)</p>
        <p>• Over y = -x: (x, y) → (-y, -x)</p>

        <p><strong>Rotation (about origin):</strong></p>
        <p>• 90° counterclockwise: (x, y) → (-y, x)</p>
        <p>• 180°: (x, y) → (-x, -y)</p>
        <p>• 270° counterclockwise: (x, y) → (y, -x)</p>
    </div>

    <div class="example-box">
        <h4>Example 5: Multiple Transformations</h4>
        <p><strong>Problem:</strong> Point A(3, 2) is reflected over the y-axis, then rotated 90° counterclockwise. Find the final coordinates.</p>
        <p><strong>Solution:</strong></p>
        <p>Step 1: Reflect over y-axis: (3, 2) → (-3, 2)</p>
        <p>Step 2: Rotate 90° counterclockwise: (-3, 2) → (-2, -3)</p>
        <p><strong>Final coordinates: (-2, -3)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 6: Transformation of Functions</h4>
        <p><strong>Problem:</strong> Describe how y = -2(x + 3)² - 1 transforms the parent function y = x².</p>
        <p><strong>Solution:</strong></p>
        <p>Starting with y = x²:</p>
        <p>• (x + 3)²: Shift LEFT 3 units</p>
        <p>• 2(x + 3)²: Stretch vertically by factor 2</p>
        <p>• -2(x + 3)²: Reflect over x-axis</p>
        <p>• -2(x + 3)² - 1: Shift DOWN 1 unit</p>
        <p><strong>Left 3, stretch by 2, reflect over x-axis, down 1</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #059669; font-weight: 600;">3D Geometry and Advanced Shapes</span></h3>

    <div class="rules-box">
        <h4>3D Volume Formulas:</h4>

        <p><strong>Rectangular Prism:</strong> V = lwh</p>
        <p><strong>Cylinder:</strong> V = πr²h</p>
        <p><strong>Cone:</strong> V = (1/3)πr²h</p>
        <p><strong>Sphere:</strong> V = (4/3)πr³</p>
        <p><strong>Pyramid:</strong> V = (1/3)Bh (where B = base area)</p>
    </div>

    <div class="rules-box">
        <h4>3D Surface Area Formulas:</h4>

        <p><strong>Rectangular Prism:</strong> SA = 2(lw + lh + wh)</p>
        <p><strong>Cylinder:</strong> SA = 2πr² + 2πrh = 2πr(r + h)</p>
        <p><strong>Sphere:</strong> SA = 4πr²</p>
        <p><strong>Cone:</strong> SA = πr² + πr√(r² + h²) = πr(r + s) where s = slant height</p>
    </div>

    <div class="example-box">
        <h4>Example 7: Composite 3D Shapes</h4>
        <p><strong>Problem:</strong> A grain silo consists of a cylinder with height 20 ft and radius 8 ft, topped by a hemisphere. Find the total volume.</p>
        <p><strong>Solution:</strong></p>
        <p>Cylinder volume: V₁ = πr²h = π(8)²(20) = 1280π ft³</p>
        <p>Hemisphere volume: V₂ = (1/2)(4/3)πr³ = (2/3)π(8)³ = (2/3)π(512) = 1024π/3 ft³</p>
        <p>Total volume: V = 1280π + 1024π/3 = (3840π + 1024π)/3 = 4864π/3 ft³</p>
        <p><strong>Total volume = 4864π/3 ≈ 5093 ft³</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 8: Similar 3D Shapes</h4>
        <p><strong>Problem:</strong> Two similar cylinders have radius ratio 3:4. If the smaller cylinder has volume 54π, find the volume of the larger cylinder.</p>
        <p><strong>Solution:</strong></p>
        <p>For similar solids, volume ratio = (linear ratio)³</p>
        <p>Linear ratio = 3:4 = 3/4</p>
        <p>Volume ratio = (3/4)³ = 27/64</p>
        <p>If V₁/V₂ = 27/64, and V₁ = 54π:</p>
        <p>54π/V₂ = 27/64 → V₂ = 54π × 64/27 = 128π</p>
        <p><strong>Larger cylinder volume = 128π</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #059669; font-weight: 600;">Advanced Applications</span></h3>

    <div class="example-box">
        <h4>Example 9: Optimization Problem</h4>
        <p><strong>Problem:</strong> A rectangular garden has perimeter 40 ft. What dimensions maximize the area?</p>
        <p><strong>Solution:</strong></p>
        <p>Let length = l, width = w</p>
        <p>Perimeter: 2l + 2w = 40 → l + w = 20 → w = 20 - l</p>
        <p>Area: A = lw = l(20 - l) = 20l - l²</p>
        <p>This is a quadratic opening downward, maximum at vertex</p>
        <p>l = -b/(2a) = -20/(2×(-1)) = 10</p>
        <p>w = 20 - 10 = 10</p>
        <p><strong>Maximum area: 10 ft × 10 ft = 100 ft²</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 10: Complex Area Problem</h4>
        <p><strong>Problem:</strong> A regular hexagon is inscribed in a circle of radius 6. Find the area of the hexagon.</p>
        <p><strong>Solution:</strong></p>
        <p>A regular hexagon consists of 6 equilateral triangles</p>
        <p>Each triangle has vertices at the center and two adjacent vertices of hexagon</p>
        <p>Side length of hexagon = radius = 6 (property of regular hexagon)</p>
        <p>Area of one equilateral triangle = (√3/4)s² = (√3/4)(6)² = 9√3</p>
        <p>Total area = 6 × 9√3 = 54√3</p>
        <p><strong>Hexagon area = 54√3 square units</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 11: Coordinate Geometry with Circles</h4>
        <p><strong>Problem:</strong> Find the intersection points of the circle x² + y² = 25 and the line y = x + 1.</p>
        <p><strong>Solution:</strong></p>
        <p>Substitute y = x + 1 into circle equation:</p>
        <p>x² + (x + 1)² = 25</p>
        <p>x² + x² + 2x + 1 = 25</p>
        <p>2x² + 2x + 1 = 25</p>
        <p>2x² + 2x - 24 = 0</p>
        <p>x² + x - 12 = 0</p>
        <p>(x + 4)(x - 3) = 0</p>
        <p>x = -4 or x = 3</p>
        <p>When x = -4: y = -4 + 1 = -3</p>
        <p>When x = 3: y = 3 + 1 = 4</p>
        <p><strong>Intersection points: (-4, -3) and (3, 4)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 12: Advanced Triangle Problem</h4>
        <p><strong>Problem:</strong> In triangle ABC, A(0, 0), B(6, 0), C(3, 3√3). Verify it's equilateral and find its area.</p>
        <p><strong>Solution:</strong></p>
        <p>Side AB: d = √[(6-0)² + (0-0)²] = 6</p>
        <p>Side AC: d = √[(3-0)² + (3√3-0)²] = √[9 + 27] = √36 = 6</p>
        <p>Side BC: d = √[(3-6)² + (3√3-0)²] = √[9 + 27] = √36 = 6</p>
        <p>All sides equal 6 → equilateral triangle ✓</p>
        <p>Area = (√3/4)s² = (√3/4)(6)² = 9√3</p>
        <p><strong>Equilateral triangle, Area = 9√3 square units</strong></p>
    </div>
</div>

<div class="section">
    <h3>🔗 Advanced Problem-Solving Strategies</h3>

    <div class="tip-box">
        <h4>💡 Coordinate Geometry Strategy</h4>
        <p><strong>Step 1:</strong> Plot points when possible - visualization helps!</p>
        <p><strong>Step 2:</strong> Identify what formulas you need (distance, midpoint, slope)</p>
        <p><strong>Step 3:</strong> Work systematically through calculations</p>
        <p><strong>Step 4:</strong> Check reasonableness of answers</p>
    </div>

    <div class="tip-box">
        <h4>💡 3D Geometry Strategy</h4>
        <p><strong>Break down complex shapes:</strong> Identify basic shapes (cylinders, cones, spheres, prisms)</p>
        <p><strong>Use similarity ratios:</strong> Linear ratio → Area ratio² → Volume ratio³</p>
        <p><strong>Draw diagrams:</strong> Even simple sketches help visualize 3D problems</p>
    </div>

    <div class="tip-box">
        <h4>💡 Transformation Strategy</h4>
        <p><strong>Apply transformations in order:</strong> The sequence matters!</p>
        <p><strong>Use key points:</strong> Transform vertices, then connect</p>
        <p><strong>Check with simple cases:</strong> Test your transformation rules</p>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Advanced geometry brings together all your mathematical skills! Master coordinate geometry formulas (distance, midpoint, slope), understand transformations as systematic changes, practice 3D volume and surface area calculations, and break complex problems into simpler parts. Remember: draw diagrams when possible, work step-by-step through calculations, and always check if your answers make geometric sense. Advanced geometry problems often combine multiple concepts - stay organized and methodical!</p>
</div>

<!-- QUIZ_20 -->
    `
  },

  'sequences-series': {
    title: 'Chapter 18: Sequences and Series',
    duration: 22, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 18: <span style="color: #f59e0b; font-weight: 600;">Sequences and Series</span></h2>
    <p class="lesson-intro">Master arithmetic and geometric sequences, find patterns, and calculate sums - essential for ACT pattern recognition!</p>

    <div class="learning-path">
        <p><strong>Part 1:</strong> Arithmetic Sequences → Constant differences between terms</p>
        <p><strong>Part 2:</strong> Geometric Sequences → Constant ratios between terms</p>
        <p><strong>Part 3:</strong> Series and Sums → Adding up sequence terms</p>
        <p><strong>Part 4:</strong> Pattern Recognition → Identifying sequence types on the ACT</p>
        <p><strong>Your advantage:</strong> You have <span style="color: #059669; font-weight: 600;">strong algebra and function skills</span> from previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #f59e0b; font-weight: 600;">Arithmetic Sequences</span></h3>

    <div class="concept-box">
        <h4>💡 What is an Arithmetic Sequence?</h4>
        <p>A sequence where each term differs from the previous by the same constant value (called the <strong>common difference</strong>).</p>
        <p>Example: 3, 7, 11, 15, 19, ... (common difference d = 4)</p>
    </div>

    <div class="rules-box">
        <h4>Arithmetic Sequence Formulas:</h4>

        <p><strong>General Term (nth term):</strong></p>
        <p style="text-align: center; background: #fef3c7; padding: 10px; border-radius: 6px;">
            a_n = a₁ + (n - 1)d
        </p>
        <p>where a₁ = first term, d = common difference, n = term number</p>

        <p><strong>Sum of n terms:</strong></p>
        <p style="text-align: center; background: #fef3c7; padding: 10px; border-radius: 6px;">
            S_n = n/2 × (2a₁ + (n-1)d) = n/2 × (a₁ + a_n)
        </p>
    </div>

    <div class="example-box">
        <h4>Example 1: Finding Terms in Arithmetic Sequence</h4>
        <p><strong>Problem:</strong> In the arithmetic sequence 5, 12, 19, 26, ..., find the 15th term.</p>
        <p><strong>Solution:</strong></p>
        <p>First term: a₁ = 5</p>
        <p>Common difference: d = 12 - 5 = 7</p>
        <p>15th term: a₁₅ = a₁ + (n - 1)d = 5 + (15 - 1)(7) = 5 + 14(7) = 5 + 98 = 103</p>
        <p><strong>a₁₅ = 103</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 2: Finding Position of a Term</h4>
        <p><strong>Problem:</strong> In the sequence 2, 9, 16, 23, ..., which term has value 100?</p>
        <p><strong>Solution:</strong></p>
        <p>a₁ = 2, d = 9 - 2 = 7</p>
        <p>Set a_n = 100: 2 + (n - 1)(7) = 100</p>
        <p>2 + 7n - 7 = 100</p>
        <p>7n - 5 = 100</p>
        <p>7n = 105</p>
        <p>n = 15</p>
        <p><strong>100 is the 15th term</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 3: Sum of Arithmetic Sequence</h4>
        <p><strong>Problem:</strong> Find the sum of the first 20 terms of the sequence 3, 8, 13, 18, ...</p>
        <p><strong>Solution:</strong></p>
        <p>a₁ = 3, d = 5</p>
        <p>Method 1: S₂₀ = n/2 × (2a₁ + (n-1)d) = 20/2 × (2(3) + (20-1)(5))</p>
        <p>S₂₀ = 10 × (6 + 19(5)) = 10 × (6 + 95) = 10 × 101 = 1010</p>
        <p><strong>S₂₀ = 1010</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #f59e0b; font-weight: 600;">Geometric Sequences</span></h3>

    <div class="concept-box">
        <h4>💡 What is a Geometric Sequence?</h4>
        <p>A sequence where each term is obtained by multiplying the previous term by the same constant value (called the <strong>common ratio</strong>).</p>
        <p>Example: 2, 6, 18, 54, 162, ... (common ratio r = 3)</p>
    </div>

    <div class="rules-box">
        <h4>Geometric Sequence Formulas:</h4>

        <p><strong>General Term (nth term):</strong></p>
        <p style="text-align: center; background: #fef3c7; padding: 10px; border-radius: 6px;">
            a_n = a₁ × r^(n-1)
        </p>
        <p>where a₁ = first term, r = common ratio, n = term number</p>

        <p><strong>Sum of n terms (r ≠ 1):</strong></p>
        <p style="text-align: center; background: #fef3c7; padding: 10px; border-radius: 6px;">
            S_n = a₁ × (1 - r^n) / (1 - r) = a₁ × (r^n - 1) / (r - 1)
        </p>
    </div>

    <div class="example-box">
        <h4>Example 4: Finding Terms in Geometric Sequence</h4>
        <p><strong>Problem:</strong> In the geometric sequence 4, 12, 36, 108, ..., find the 8th term.</p>
        <p><strong>Solution:</strong></p>
        <p>First term: a₁ = 4</p>
        <p>Common ratio: r = 12/4 = 3</p>
        <p>8th term: a₈ = a₁ × r^(n-1) = 4 × 3^(8-1) = 4 × 3^7 = 4 × 2187 = 8748</p>
        <p><strong>a₈ = 8748</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 5: Finding Common Ratio</h4>
        <p><strong>Problem:</strong> In a geometric sequence, the 3rd term is 20 and the 6th term is 160. Find the common ratio and first term.</p>
        <p><strong>Solution:</strong></p>
        <p>a₃ = a₁r² = 20</p>
        <p>a₆ = a₁r⁵ = 160</p>
        <p>Divide: a₆/a₃ = (a₁r⁵)/(a₁r²) = r³ = 160/20 = 8</p>
        <p>r³ = 8 → r = 2</p>
        <p>a₁r² = 20 → a₁(2)² = 20 → a₁ = 5</p>
        <p><strong>r = 2, a₁ = 5</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 6: Sum of Geometric Sequence</h4>
        <p><strong>Problem:</strong> Find the sum of the first 6 terms of the sequence 3, 6, 12, 24, ...</p>
        <p><strong>Solution:</strong></p>
        <p>a₁ = 3, r = 6/3 = 2</p>
        <p>S₆ = a₁ × (r^n - 1) / (r - 1) = 3 × (2^6 - 1) / (2 - 1)</p>
        <p>S₆ = 3 × (64 - 1) / 1 = 3 × 63 = 189</p>
        <p><strong>S₆ = 189</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #f59e0b; font-weight: 600;">Infinite Geometric Series</span></h3>

    <div class="rules-box">
        <h4>Sum of Infinite Geometric Series:</h4>
        <p><strong>When |r| < 1 (converges):</strong></p>
        <p style="text-align: center; background: #fef3c7; padding: 10px; border-radius: 6px;">
            S = a₁ / (1 - r)
        </p>
        <p><strong>When |r| ≥ 1:</strong> The series does not have a finite sum (diverges)</p>
    </div>

    <div class="example-box">
        <h4>Example 7: Infinite Geometric Series</h4>
        <p><strong>Problem:</strong> Find the sum of the infinite series 8 + 4 + 2 + 1 + 0.5 + ...</p>
        <p><strong>Solution:</strong></p>
        <p>a₁ = 8, r = 4/8 = 1/2</p>
        <p>Since |r| = 1/2 < 1, the series converges</p>
        <p>S = a₁ / (1 - r) = 8 / (1 - 1/2) = 8 / (1/2) = 16</p>
        <p><strong>Sum = 16</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 8: Converting Repeating Decimal</h4>
        <p><strong>Problem:</strong> Express 0.272727... as a fraction using infinite geometric series.</p>
        <p><strong>Solution:</strong></p>
        <p>0.272727... = 0.27 + 0.0027 + 0.000027 + ...</p>
        <p>= 27/100 + 27/10000 + 27/1000000 + ...</p>
        <p>= 27/100 × (1 + 1/100 + 1/10000 + ...)</p>
        <p>The series in parentheses: a₁ = 1, r = 1/100</p>
        <p>Sum = 1/(1 - 1/100) = 1/(99/100) = 100/99</p>
        <p>Therefore: 0.272727... = 27/100 × 100/99 = 27/99 = 3/11</p>
        <p><strong>0.272727... = 3/11</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #f59e0b; font-weight: 600;">ACT Pattern Recognition</span></h3>

    <div class="tip-box">
        <h4>💡 Identifying Sequence Types</h4>
        <p><strong>Check differences first:</strong> If consecutive differences are constant → arithmetic</p>
        <p><strong>Check ratios next:</strong> If consecutive ratios are constant → geometric</p>
        <p><strong>Look for patterns:</strong> Squares, cubes, factorials, or other special sequences</p>
    </div>

    <div class="example-box">
        <h4>Example 9: Mixed Pattern Recognition</h4>
        <p><strong>Problem:</strong> Find the next term in each sequence:</p>
        <p>a) 1, 4, 9, 16, 25, ...</p>
        <p>b) 2, 6, 18, 54, ...</p>
        <p>c) 5, 8, 11, 14, ...</p>
        <p><strong>Solution:</strong></p>
        <p>a) Perfect squares: 1², 2², 3², 4², 5², ... → Next: 6² = 36</p>
        <p>b) Geometric with r = 3: 2, 2×3, 2×3², 2×3³, ... → Next: 2×3⁴ = 162</p>
        <p>c) Arithmetic with d = 3: 5, 5+3, 5+6, 5+9, ... → Next: 14+3 = 17</p>
        <p><strong>a) 36, b) 162, c) 17</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 10: Fibonacci-type Sequence</h4>
        <p><strong>Problem:</strong> In the sequence 1, 1, 2, 3, 5, 8, 13, ..., find the 12th term.</p>
        <p><strong>Solution:</strong></p>
        <p>This is a Fibonacci sequence where each term = sum of previous two terms</p>
        <p>Continue the pattern:</p>
        <p>F₁ = 1, F₂ = 1, F₃ = 2, F₄ = 3, F₅ = 5, F₆ = 8, F₇ = 13</p>
        <p>F₈ = 13 + 8 = 21</p>
        <p>F₉ = 21 + 13 = 34</p>
        <p>F₁₀ = 34 + 21 = 55</p>
        <p>F₁₁ = 55 + 34 = 89</p>
        <p>F₁₂ = 89 + 55 = 144</p>
        <p><strong>12th term = 144</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 11: Complex ACT-style Problem</h4>
        <p><strong>Problem:</strong> The sum of the first n terms of an arithmetic sequence is S_n = 3n² + 2n. Find the 10th term.</p>
        <p><strong>Solution:</strong></p>
        <p>For an arithmetic sequence, a_n = S_n - S_(n-1)</p>
        <p>S₁₀ = 3(10)² + 2(10) = 300 + 20 = 320</p>
        <p>S₉ = 3(9)² + 2(9) = 243 + 18 = 261</p>
        <p>a₁₀ = S₁₀ - S₉ = 320 - 261 = 59</p>
        <p><strong>10th term = 59</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 12: Real-world Application</h4>
        <p><strong>Problem:</strong> A car depreciates 15% of its value each year. If it's worth $24,000 initially, what will it be worth after 5 years?</p>
        <p><strong>Solution:</strong></p>
        <p>Each year, the car retains 85% = 0.85 of its value</p>
        <p>This forms a geometric sequence: 24000, 24000(0.85), 24000(0.85)², ...</p>
        <p>After 5 years: Value = 24000 × (0.85)⁵</p>
        <p>= 24000 × 0.4437 ≈ $10,649</p>
        <p><strong>Value after 5 years ≈ $10,649</strong></p>
    </div>
</div>

<div class="section">
    <h3>🔗 ACT Sequences and Series Strategies</h3>

    <div class="tip-box">
        <h4>💡 Problem-Solving Strategy</h4>
        <p><strong>Step 1:</strong> Identify the sequence type (arithmetic, geometric, or special)</p>
        <p><strong>Step 2:</strong> Find the pattern (common difference, ratio, or rule)</p>
        <p><strong>Step 3:</strong> Apply the appropriate formula</p>
        <p><strong>Step 4:</strong> Check your answer for reasonableness</p>
    </div>

    <div class="rules-box">
        <h4>Quick Reference Formulas:</h4>
        <div style="background: #fffbeb; padding: 15px; border-radius: 8px;">
            <p><strong>Arithmetic:</strong> a_n = a₁ + (n-1)d, S_n = n/2(a₁ + a_n)</p>
            <p><strong>Geometric:</strong> a_n = a₁r^(n-1), S_n = a₁(r^n-1)/(r-1)</p>
            <p><strong>Infinite Geometric (|r|<1):</strong> S = a₁/(1-r)</p>
        </div>
    </div>
</div>

<div class="section">
    <h3>🎯 Interactive Practice Quiz</h3>

    <div class="quiz-container">
        <div class="quiz-question" data-question="1">
            <h4>Question 1: Arithmetic Sequence</h4>
            <p><strong>Problem:</strong> In the arithmetic sequence 7, 12, 17, 22, ..., what is the 20th term?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q1" value="a"> A) 95</label>
                <label><input type="radio" name="q1" value="b"> B) 102</label>
                <label><input type="radio" name="q1" value="c"> C) 107</label>
                <label><input type="radio" name="q1" value="d"> D) 112</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) 102</strong></p>
                <p><strong>Explanation:</strong> First term a₁ = 7, common difference d = 5</p>
                <p>a₂₀ = a₁ + (n-1)d = 7 + (20-1)(5) = 7 + 95 = 102</p>
            </div>
        </div>

        <div class="quiz-question" data-question="2">
            <h4>Question 2: Geometric Sequence</h4>
            <p><strong>Problem:</strong> In the geometric sequence 3, 12, 48, 192, ..., what is the 7th term?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q2" value="a"> A) 12,288</label>
                <label><input type="radio" name="q2" value="b"> B) 3,072</label>
                <label><input type="radio" name="q2" value="c"> C) 24,576</label>
                <label><input type="radio" name="q2" value="d"> D) 6,144</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: A) 12,288</strong></p>
                <p><strong>Explanation:</strong> First term a₁ = 3, common ratio r = 4</p>
                <p>a₇ = a₁ × r^(n-1) = 3 × 4^(7-1) = 3 × 4^6 = 3 × 4096 = 12,288</p>
            </div>
        </div>

        <div class="quiz-question" data-question="3">
            <h4>Question 3: Sum of Arithmetic Series</h4>
            <p><strong>Problem:</strong> What is the sum of the first 15 terms of the sequence 4, 9, 14, 19, ...?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q3" value="a"> A) 585</label>
                <label><input type="radio" name="q3" value="b"> B) 540</label>
                <label><input type="radio" name="q3" value="c"> C) 525</label>
                <label><input type="radio" name="q3" value="d"> D) 570</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: A) 585</strong></p>
                <p><strong>Explanation:</strong> a₁ = 4, d = 5</p>
                <p>S₁₅ = n/2 × (2a₁ + (n-1)d) = 15/2 × (2(4) + (15-1)(5)) = 15/2 × (8 + 70) = 15/2 × 78 = 585</p>
            </div>
        </div>

        <div class="quiz-question" data-question="4">
            <h4>Question 4: Infinite Geometric Series</h4>
            <p><strong>Problem:</strong> Find the sum of the infinite series: 24 + 12 + 6 + 3 + ...</p>
            <div class="quiz-options">
                <label><input type="radio" name="q4" value="a"> A) 36</label>
                <label><input type="radio" name="q4" value="b"> B) 48</label>
                <label><input type="radio" name="q4" value="c"> C) 42</label>
                <label><input type="radio" name="q4" value="d"> D) 60</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) 48</strong></p>
                <p><strong>Explanation:</strong> a₁ = 24, r = 12/24 = 1/2</p>
                <p>Since |r| = 1/2 < 1, the series converges</p>
                <p>S = a₁/(1-r) = 24/(1-1/2) = 24/(1/2) = 48</p>
            </div>
        </div>

        <div class="quiz-question" data-question="5">
            <h4>Question 5: Pattern Recognition</h4>
            <p><strong>Problem:</strong> What type of sequence is: 2, 8, 32, 128, ...?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q5" value="a"> A) Arithmetic with d = 6</label>
                <label><input type="radio" name="q5" value="b"> B) Geometric with r = 4</label>
                <label><input type="radio" name="q5" value="c"> C) Neither arithmetic nor geometric</label>
                <label><input type="radio" name="q5" value="d"> D) Arithmetic with d = 4</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) Geometric with r = 4</strong></p>
                <p><strong>Explanation:</strong> Check ratios: 8/2 = 4, 32/8 = 4, 128/32 = 4</p>
                <p>Since all ratios are equal, this is geometric with r = 4</p>
            </div>
        </div>

        <div class="quiz-question" data-question="6">
            <h4>Question 6: Real-World Application</h4>
            <p><strong>Problem:</strong> A ball is dropped and bounces to 60% of its previous height each time. If dropped from 100 feet, what height does it reach after the 4th bounce?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q6" value="a"> A) 12.96 feet</label>
                <label><input type="radio" name="q6" value="b"> B) 21.6 feet</label>
                <label><input type="radio" name="q6" value="c"> C) 36 feet</label>
                <label><input type="radio" name="q6" value="d"> D) 7.78 feet</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: A) 12.96 feet</strong></p>
                <p><strong>Explanation:</strong> Heights form geometric sequence: 100, 60, 36, 21.6, 12.96, ...</p>
                <p>After 4th bounce: 100 × (0.6)⁴ = 100 × 0.1296 = 12.96 feet</p>
            </div>
        </div>

        <div class="quiz-actions">
            <button onclick="checkQuizAnswers('sequences-series')" class="quiz-submit-btn">Check Answers</button>
            <button onclick="resetQuiz('sequences-series')" class="quiz-reset-btn">Reset Quiz</button>
        </div>

        <div class="quiz-results" style="display: none;">
            <h4>Quiz Results</h4>
            <p class="score-display"></p>
            <div class="results-breakdown"></div>
        </div>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Sequences and series are about recognizing patterns! Master the difference between arithmetic (constant difference) and geometric (constant ratio) sequences, memorize the key formulas, and practice identifying sequence types quickly. Remember: always check if differences are constant first, then ratios, then look for special patterns like squares or cubes. For infinite geometric series, convergence only occurs when |r| < 1. These concepts appear frequently in ACT word problems and pattern recognition questions!</p>
</div>

<!-- QUIZ_22 -->
    `
  },

  'probability-counting': {
    title: 'Chapter 19: Probability and Counting',
    duration: 25, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 19: <span style="color: #8b5cf6; font-weight: 600;">Probability and Counting</span></h2>
    <p class="lesson-intro">Master fundamental counting principles, permutations, combinations, and probability - essential for ACT problem-solving!</p>

    <div class="learning-path">
        <p><strong>Part 1:</strong> Basic Counting → Multiplication principle and organized lists</p>
        <p><strong>Part 2:</strong> Permutations → Arrangements where order matters</p>
        <p><strong>Part 3:</strong> Combinations → Selections where order doesn't matter</p>
        <p><strong>Part 4:</strong> Probability → Chance and likelihood calculations</p>
        <p><strong>Your advantage:</strong> You have <span style="color: #059669; font-weight: 600;">strong algebra and pattern recognition</span> from previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #8b5cf6; font-weight: 600;">Basic Counting Principles</span></h3>

    <div class="concept-box">
        <h4>💡 The Fundamental Counting Principle</h4>
        <p>If event A can happen in m ways and event B can happen in n ways, then both A and B can happen in <strong>m × n</strong> ways.</p>
        <p>Example: If you have 3 shirts and 4 pants, you can make 3 × 4 = 12 different outfits.</p>
    </div>

    <div class="example-box">
        <h4>Example 1: License Plates</h4>
        <p><strong>Problem:</strong> How many different license plates can be formed with 2 letters followed by 3 digits?</p>
        <p><strong>Solution:</strong></p>
        <p>First letter: 26 choices</p>
        <p>Second letter: 26 choices</p>
        <p>First digit: 10 choices (0-9)</p>
        <p>Second digit: 10 choices</p>
        <p>Third digit: 10 choices</p>
        <p>Total: 26 × 26 × 10 × 10 × 10 = 676,000</p>
        <p><strong>676,000 different license plates</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 2: Restaurant Choices</h4>
        <p><strong>Problem:</strong> A restaurant offers 4 appetizers, 6 entrees, and 3 desserts. How many different complete meals can you order?</p>
        <p><strong>Solution:</strong></p>
        <p>Total meals = 4 × 6 × 3 = 72</p>
        <p><strong>72 different complete meals</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 3: Password Creation</h4>
        <p><strong>Problem:</strong> How many 4-character passwords can be created using digits, with no repeated digits?</p>
        <p><strong>Solution:</strong></p>
        <p>First digit: 10 choices (0-9)</p>
        <p>Second digit: 9 choices (can't repeat first)</p>
        <p>Third digit: 8 choices (can't repeat first two)</p>
        <p>Fourth digit: 7 choices (can't repeat first three)</p>
        <p>Total: 10 × 9 × 8 × 7 = 5,040</p>
        <p><strong>5,040 different passwords</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #8b5cf6; font-weight: 600;">Permutations</span></h3>

    <div class="concept-box">
        <h4>💡 What are Permutations?</h4>
        <p>Permutations are arrangements where <strong>order matters</strong>.</p>
        <p>Example: ABC, ACB, BAC are all different permutations of the letters A, B, C.</p>
    </div>

    <div class="rules-box">
        <h4>Permutation Formulas:</h4>

        <p><strong>All permutations of n objects:</strong></p>
        <p style="text-align: center; background: #f3e8ff; padding: 10px; border-radius: 6px;">
            P(n) = n!
        </p>

        <p><strong>Permutations of r objects from n objects:</strong></p>
        <p style="text-align: center; background: #f3e8ff; padding: 10px; border-radius: 6px;">
            P(n,r) = n! / (n-r)!
        </p>

        <p><strong>With repetition allowed:</strong></p>
        <p style="text-align: center; background: #f3e8ff; padding: 10px; border-radius: 6px;">
            n^r
        </p>
    </div>

    <div class="example-box">
        <h4>Example 4: Arranging Books</h4>
        <p><strong>Problem:</strong> In how many ways can 5 different books be arranged on a shelf?</p>
        <p><strong>Solution:</strong></p>
        <p>This is all permutations of 5 objects</p>
        <p>P(5) = 5! = 5 × 4 × 3 × 2 × 1 = 120</p>
        <p><strong>120 ways</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 5: Committee Positions</h4>
        <p><strong>Problem:</strong> From 8 people, how many ways can we choose a president, vice president, and secretary?</p>
        <p><strong>Solution:</strong></p>
        <p>This is permutations of 3 from 8 (order matters - different positions)</p>
        <p>P(8,3) = 8! / (8-3)! = 8! / 5! = 8 × 7 × 6 = 336</p>
        <p><strong>336 ways</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 6: Repeated Letters</h4>
        <p><strong>Problem:</strong> How many distinct arrangements can be made with the letters in MISSISSIPPI?</p>
        <p><strong>Solution:</strong></p>
        <p>Total letters: 11</p>
        <p>M: 1, I: 4, S: 4, P: 2</p>
        <p>Arrangements = 11! / (1! × 4! × 4! × 2!) = 39,916,800 / (1 × 24 × 24 × 2) = 34,650</p>
        <p><strong>34,650 distinct arrangements</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #8b5cf6; font-weight: 600;">Combinations</span></h3>

    <div class="concept-box">
        <h4>💡 What are Combinations?</h4>
        <p>Combinations are selections where <strong>order doesn't matter</strong>.</p>
        <p>Example: Choosing a committee of 3 people - ABC is the same as BCA or CAB.</p>
    </div>

    <div class="rules-box">
        <h4>Combination Formula:</h4>

        <p><strong>Combinations of r objects from n objects:</strong></p>
        <p style="text-align: center; background: #f3e8ff; padding: 10px; border-radius: 6px;">
            C(n,r) = n! / (r!(n-r)!) = (n choose r)
        </p>

        <p><strong>Key relationship:</strong> C(n,r) = P(n,r) / r!</p>
    </div>

    <div class="example-box">
        <h4>Example 7: Pizza Toppings</h4>
        <p><strong>Problem:</strong> A pizza shop offers 10 toppings. How many ways can you choose 3 toppings?</p>
        <p><strong>Solution:</strong></p>
        <p>Order doesn't matter (pepperoni-sausage-mushroom = mushroom-pepperoni-sausage)</p>
        <p>C(10,3) = 10! / (3!(10-3)!) = 10! / (3! × 7!) = (10 × 9 × 8) / (3 × 2 × 1) = 720 / 6 = 120</p>
        <p><strong>120 ways</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 8: Card Hands</h4>
        <p><strong>Problem:</strong> How many different 5-card hands can be dealt from a standard 52-card deck?</p>
        <p><strong>Solution:</strong></p>
        <p>Order doesn't matter in a hand</p>
        <p>C(52,5) = 52! / (5! × 47!) = (52 × 51 × 50 × 49 × 48) / (5 × 4 × 3 × 2 × 1) = 311,875,200 / 120 = 2,598,960</p>
        <p><strong>2,598,960 different hands</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 9: Committee Selection</h4>
        <p><strong>Problem:</strong> From 12 men and 8 women, how many ways can we form a committee of 5 people with exactly 3 men and 2 women?</p>
        <p><strong>Solution:</strong></p>
        <p>Choose 3 men from 12: C(12,3) = 12! / (3! × 9!) = 220</p>
        <p>Choose 2 women from 8: C(8,2) = 8! / (2! × 6!) = 28</p>
        <p>Total ways: 220 × 28 = 6,160</p>
        <p><strong>6,160 ways</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #8b5cf6; font-weight: 600;">Probability</span></h3>

    <div class="concept-box">
        <h4>💡 Basic Probability</h4>
        <p>Probability measures the likelihood of an event occurring.</p>
        <p style="text-align: center; background: #f3e8ff; padding: 10px; border-radius: 6px;">
            P(event) = Number of favorable outcomes / Total number of possible outcomes
        </p>
        <p>Probability values range from 0 (impossible) to 1 (certain)</p>
    </div>

    <div class="rules-box">
        <h4>Probability Rules:</h4>

        <p><strong>Addition Rule (OR):</strong> P(A or B) = P(A) + P(B) - P(A and B)</p>
        <p><strong>Multiplication Rule (AND):</strong> P(A and B) = P(A) × P(B) [if independent]</p>
        <p><strong>Complement Rule:</strong> P(not A) = 1 - P(A)</p>
    </div>

    <div class="example-box">
        <h4>Example 10: Dice Probability</h4>
        <p><strong>Problem:</strong> What's the probability of rolling a sum of 7 with two dice?</p>
        <p><strong>Solution:</strong></p>
        <p>Favorable outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 ways</p>
        <p>Total outcomes: 6 × 6 = 36</p>
        <p>P(sum = 7) = 6/36 = 1/6</p>
        <p><strong>1/6 ≈ 0.167 or 16.7%</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 11: Card Probability</h4>
        <p><strong>Problem:</strong> What's the probability of drawing a king or a heart from a standard deck?</p>
        <p><strong>Solution:</strong></p>
        <p>P(king) = 4/52</p>
        <p>P(heart) = 13/52</p>
        <p>P(king and heart) = 1/52 (king of hearts)</p>
        <p>P(king or heart) = 4/52 + 13/52 - 1/52 = 16/52 = 4/13</p>
        <p><strong>4/13 ≈ 0.308 or 30.8%</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 12: Independent Events</h4>
        <p><strong>Problem:</strong> What's the probability of flipping 3 heads in a row with a fair coin?</p>
        <p><strong>Solution:</strong></p>
        <p>Each flip is independent with P(heads) = 1/2</p>
        <p>P(3 heads) = P(H) × P(H) × P(H) = 1/2 × 1/2 × 1/2 = 1/8</p>
        <p><strong>1/8 = 0.125 or 12.5%</strong></p>
    </div>
</div>

<div class="section">
    <h3>🎯 Interactive Practice Quiz</h3>

    <div class="quiz-container">
        <div class="quiz-question" data-question="1">
            <h4>Question 1: Basic Counting</h4>
            <p><strong>Problem:</strong> A school offers 6 math classes, 4 science classes, and 3 English classes. If a student takes one of each type, how many different schedules are possible?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q1" value="a"> A) 13</label>
                <label><input type="radio" name="q1" value="b"> B) 72</label>
                <label><input type="radio" name="q1" value="c"> C) 24</label>
                <label><input type="radio" name="q1" value="d"> D) 36</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) 72</strong></p>
                <p><strong>Explanation:</strong> Using multiplication principle: 6 × 4 × 3 = 72 different schedules</p>
            </div>
        </div>

        <div class="quiz-question" data-question="2">
            <h4>Question 2: Permutations</h4>
            <p><strong>Problem:</strong> From 7 people, how many ways can we choose and arrange 3 people in a line?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q2" value="a"> A) 21</label>
                <label><input type="radio" name="q2" value="b"> B) 35</label>
                <label><input type="radio" name="q2" value="c"> C) 210</label>
                <label><input type="radio" name="q2" value="d"> D) 5040</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: C) 210</strong></p>
                <p><strong>Explanation:</strong> P(7,3) = 7!/(7-3)! = 7!/4! = 7 × 6 × 5 = 210</p>
            </div>
        </div>

        <div class="quiz-question" data-question="3">
            <h4>Question 3: Combinations</h4>
            <p><strong>Problem:</strong> How many ways can you choose 4 books from 9 books on a shelf?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q3" value="a"> A) 3024</label>
                <label><input type="radio" name="q3" value="b"> B) 126</label>
                <label><input type="radio" name="q3" value="c"> C) 36</label>
                <label><input type="radio" name="q3" value="d"> D) 6561</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) 126</strong></p>
                <p><strong>Explanation:</strong> C(9,4) = 9!/(4!×5!) = (9×8×7×6)/(4×3×2×1) = 3024/24 = 126</p>
            </div>
        </div>

        <div class="quiz-question" data-question="4">
            <h4>Question 4: Basic Probability</h4>
            <p><strong>Problem:</strong> What's the probability of drawing a red card from a standard 52-card deck?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q4" value="a"> A) 1/4</label>
                <label><input type="radio" name="q4" value="b"> B) 1/2</label>
                <label><input type="radio" name="q4" value="c"> C) 1/3</label>
                <label><input type="radio" name="q4" value="d"> D) 2/3</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) 1/2</strong></p>
                <p><strong>Explanation:</strong> 26 red cards (hearts + diamonds) out of 52 total cards = 26/52 = 1/2</p>
            </div>
        </div>

        <div class="quiz-question" data-question="5">
            <h4>Question 5: Independent Events</h4>
            <p><strong>Problem:</strong> What's the probability of rolling two 6's with two dice?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q5" value="a"> A) 1/6</label>
                <label><input type="radio" name="q5" value="b"> B) 1/12</label>
                <label><input type="radio" name="q5" value="c"> C) 1/36</label>
                <label><input type="radio" name="q5" value="d"> D) 2/36</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: C) 1/36</strong></p>
                <p><strong>Explanation:</strong> P(6) × P(6) = 1/6 × 1/6 = 1/36</p>
            </div>
        </div>

        <div class="quiz-question" data-question="6">
            <h4>Question 6: Complex Probability</h4>
            <p><strong>Problem:</strong> A bag contains 5 red, 3 blue, and 2 green marbles. What's the probability of drawing a red or blue marble?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q6" value="a"> A) 3/10</label>
                <label><input type="radio" name="q6" value="b"> B) 1/2</label>
                <label><input type="radio" name="q6" value="c"> C) 4/5</label>
                <label><input type="radio" name="q6" value="d"> D) 8/10</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: C) 4/5</strong></p>
                <p><strong>Explanation:</strong> Red or blue marbles = 5 + 3 = 8, Total = 10, P = 8/10 = 4/5</p>
            </div>
        </div>

        <div class="quiz-actions">
            <button onclick="checkQuizAnswers('probability-counting')" class="quiz-submit-btn">Check Answers</button>
            <button onclick="resetQuiz('probability-counting')" class="quiz-reset-btn">Reset Quiz</button>
        </div>

        <div class="quiz-results" style="display: none;">
            <h4>Quiz Results</h4>
            <p class="score-display"></p>
            <div class="results-breakdown"></div>
        </div>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Probability and counting are fundamental to many ACT problems! Master the multiplication principle for basic counting, distinguish between permutations (order matters) and combinations (order doesn't matter), and understand basic probability rules. Remember: use permutations for arrangements and positions, combinations for selections and groups, and always check if events are independent when multiplying probabilities. These concepts appear in both math and science sections of the ACT!</p>
</div>

<!-- QUIZ_23 -->
    `
  },

  'logarithms': {
    title: 'Chapter 20: Logarithms',
    duration: 20, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 20: <span style="color: #059669; font-weight: 600;">Logarithms</span></h2>
    <p class="lesson-intro">Master logarithmic functions, properties, and equations - essential for advanced ACT math topics!</p>

    <div class="learning-path">
        <p><strong>Part 1:</strong> Definition of Logarithms → Understanding log as inverse of exponential</p>
        <p><strong>Part 2:</strong> Logarithm Properties → Rules for simplifying log expressions</p>
        <p><strong>Part 3:</strong> Solving Log Equations → Finding unknown values</p>
        <p><strong>Part 4:</strong> ACT Applications → Real-world logarithm problems</p>
        <p><strong>Your advantage:</strong> You have <span style="color: #dc2626; font-weight: 600;">mastered exponents and algebra</span> from previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #059669; font-weight: 600;">What are Logarithms?</span></h3>

    <div class="concept-box">
        <h4>💡 Logarithm Definition</h4>
        <p>A logarithm answers the question: <strong>"To what power must we raise the base to get this number?"</strong></p>
        <div style="text-align: center; background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>log_b(x) = y means b^y = x</strong></p>
        </div>
        <p>Example: log₂(8) = 3 because 2³ = 8</p>
    </div>

    <div class="rules-box">
        <h4>Common Logarithm Types:</h4>

        <p><strong>Common Log (base 10):</strong> log(x) = log₁₀(x)</p>
        <p><strong>Natural Log (base e):</strong> ln(x) = log_e(x)</p>
        <p><strong>Binary Log (base 2):</strong> log₂(x)</p>

        <p><strong>Key Relationships:</strong></p>
        <p>• log_b(b) = 1 (any base to the first power equals itself)</p>
        <p>• log_b(1) = 0 (any base to the zero power equals 1)</p>
        <p>• log_b(b^x) = x (logarithm and exponential cancel out)</p>
        <p>• b^(log_b(x)) = x (exponential and logarithm cancel out)</p>
    </div>

    <div class="example-box">
        <h4>Example 1: Converting Between Forms</h4>
        <p><strong>Problem:</strong> Convert between exponential and logarithmic form:</p>
        <p>a) 3⁴ = 81</p>
        <p>b) log₅(125) = 3</p>
        <p><strong>Solution:</strong></p>
        <p>a) 3⁴ = 81 → log₃(81) = 4</p>
        <p>b) log₅(125) = 3 → 5³ = 125</p>
        <p><strong>a) log₃(81) = 4, b) 5³ = 125</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 2: Evaluating Basic Logarithms</h4>
        <p><strong>Problem:</strong> Evaluate without a calculator:</p>
        <p>a) log₂(16)</p>
        <p>b) log₁₀(1000)</p>
        <p>c) ln(e³)</p>
        <p><strong>Solution:</strong></p>
        <p>a) log₂(16): What power of 2 gives 16? 2⁴ = 16, so log₂(16) = 4</p>
        <p>b) log₁₀(1000): What power of 10 gives 1000? 10³ = 1000, so log₁₀(1000) = 3</p>
        <p>c) ln(e³): What power of e gives e³? e³, so ln(e³) = 3</p>
        <p><strong>a) 4, b) 3, c) 3</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #059669; font-weight: 600;">Logarithm Properties</span></h3>

    <div class="rules-box">
        <h4>The Three Key Properties:</h4>

        <p><strong>1. Product Rule:</strong></p>
        <p style="text-align: center; background: #f0fdf4; padding: 10px; border-radius: 6px;">
            log_b(mn) = log_b(m) + log_b(n)
        </p>

        <p><strong>2. Quotient Rule:</strong></p>
        <p style="text-align: center; background: #f0fdf4; padding: 10px; border-radius: 6px;">
            log_b(m/n) = log_b(m) - log_b(n)
        </p>

        <p><strong>3. Power Rule:</strong></p>
        <p style="text-align: center; background: #f0fdf4; padding: 10px; border-radius: 6px;">
            log_b(m^p) = p · log_b(m)
        </p>
    </div>

    <div class="example-box">
        <h4>Example 3: Using Product Rule</h4>
        <p><strong>Problem:</strong> Simplify log₃(9 × 27) using logarithm properties.</p>
        <p><strong>Solution:</strong></p>
        <p>log₃(9 × 27) = log₃(9) + log₃(27)</p>
        <p>log₃(9) = log₃(3²) = 2</p>
        <p>log₃(27) = log₃(3³) = 3</p>
        <p>log₃(9 × 27) = 2 + 3 = 5</p>
        <p><strong>5</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 4: Using All Three Properties</h4>
        <p><strong>Problem:</strong> Express log₂(8x³/4) in terms of log₂(x).</p>
        <p><strong>Solution:</strong></p>
        <p>log₂(8x³/4) = log₂(8x³) - log₂(4)</p>
        <p>= log₂(8) + log₂(x³) - log₂(4)</p>
        <p>= log₂(2³) + 3log₂(x) - log₂(2²)</p>
        <p>= 3 + 3log₂(x) - 2</p>
        <p>= 1 + 3log₂(x)</p>
        <p><strong>1 + 3log₂(x)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 5: Change of Base Formula</h4>
        <p><strong>Problem:</strong> Calculate log₃(20) using common logarithms.</p>
        <p><strong>Solution:</strong></p>
        <p>Change of base formula: log_a(x) = log(x)/log(a)</p>
        <p>log₃(20) = log(20)/log(3)</p>
        <p>≈ 1.301/0.477 ≈ 2.73</p>
        <p><strong>log₃(20) ≈ 2.73</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #059669; font-weight: 600;">Solving Logarithmic Equations</span></h3>

    <div class="example-box">
        <h4>Example 6: Basic Log Equations</h4>
        <p><strong>Problem:</strong> Solve log₂(x) = 5</p>
        <p><strong>Solution:</strong></p>
        <p>Convert to exponential form: x = 2⁵</p>
        <p>x = 32</p>
        <p>Check: log₂(32) = log₂(2⁵) = 5 ✓</p>
        <p><strong>x = 32</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 7: Log Equations with Properties</h4>
        <p><strong>Problem:</strong> Solve log₃(x) + log₃(x - 2) = 1</p>
        <p><strong>Solution:</strong></p>
        <p>Use product rule: log₃(x(x - 2)) = 1</p>
        <p>Convert to exponential: x(x - 2) = 3¹</p>
        <p>x² - 2x = 3</p>
        <p>x² - 2x - 3 = 0</p>
        <p>(x - 3)(x + 1) = 0</p>
        <p>x = 3 or x = -1</p>
        <p>Check domain: x > 0 and x - 2 > 0, so x > 2</p>
        <p>Only x = 3 is valid</p>
        <p><strong>x = 3</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 8: Exponential Equations with Logs</h4>
        <p><strong>Problem:</strong> Solve 2^(x+1) = 50</p>
        <p><strong>Solution:</strong></p>
        <p>Take log of both sides: log(2^(x+1)) = log(50)</p>
        <p>Use power rule: (x + 1)log(2) = log(50)</p>
        <p>x + 1 = log(50)/log(2)</p>
        <p>x + 1 ≈ 1.699/0.301 ≈ 5.64</p>
        <p>x ≈ 4.64</p>
        <p><strong>x ≈ 4.64</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #059669; font-weight: 600;">Real-World Applications</span></h3>

    <div class="example-box">
        <h4>Example 9: Compound Interest</h4>
        <p><strong>Problem:</strong> How long will it take for $1000 to double at 8% annual interest compounded continuously?</p>
        <p><strong>Solution:</strong></p>
        <p>Formula: A = Pe^(rt), where A = 2000, P = 1000, r = 0.08</p>
        <p>2000 = 1000e^(0.08t)</p>
        <p>2 = e^(0.08t)</p>
        <p>Take natural log: ln(2) = ln(e^(0.08t))</p>
        <p>ln(2) = 0.08t</p>
        <p>t = ln(2)/0.08 ≈ 0.693/0.08 ≈ 8.66</p>
        <p><strong>About 8.7 years</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 10: pH Calculations</h4>
        <p><strong>Problem:</strong> If the pH of a solution is 3.5, what is the hydrogen ion concentration?</p>
        <p><strong>Solution:</strong></p>
        <p>pH = -log[H⁺], so [H⁺] = 10^(-pH)</p>
        <p>[H⁺] = 10^(-3.5)</p>
        <p>[H⁺] = 10^(-3.5) ≈ 3.16 × 10^(-4) M</p>
        <p><strong>[H⁺] ≈ 3.16 × 10^(-4) M</strong></p>
    </div>
</div>

<div class="section">
    <h3>🎯 Interactive Practice Quiz</h3>

    <div class="quiz-container">
        <div class="quiz-question" data-question="1">
            <h4>Question 1: Basic Logarithms</h4>
            <p><strong>Problem:</strong> Evaluate log₄(64)</p>
            <div class="quiz-options">
                <label><input type="radio" name="q1" value="a"> A) 2</label>
                <label><input type="radio" name="q1" value="b"> B) 3</label>
                <label><input type="radio" name="q1" value="c"> C) 4</label>
                <label><input type="radio" name="q1" value="d"> D) 16</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) 3</strong></p>
                <p><strong>Explanation:</strong> log₄(64) asks "4 to what power equals 64?" Since 4³ = 64, the answer is 3.</p>
            </div>
        </div>

        <div class="quiz-question" data-question="2">
            <h4>Question 2: Logarithm Properties</h4>
            <p><strong>Problem:</strong> Simplify log₂(8) + log₂(4)</p>
            <div class="quiz-options">
                <label><input type="radio" name="q2" value="a"> A) 3</label>
                <label><input type="radio" name="q2" value="b"> B) 4</label>
                <label><input type="radio" name="q2" value="c"> C) 5</label>
                <label><input type="radio" name="q2" value="d"> D) 6</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: C) 5</strong></p>
                <p><strong>Explanation:</strong> log₂(8) + log₂(4) = log₂(8 × 4) = log₂(32) = log₂(2⁵) = 5</p>
            </div>
        </div>

        <div class="quiz-question" data-question="3">
            <h4>Question 3: Converting Forms</h4>
            <p><strong>Problem:</strong> If log₃(x) = 4, what is x?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q3" value="a"> A) 12</label>
                <label><input type="radio" name="q3" value="b"> B) 64</label>
                <label><input type="radio" name="q3" value="c"> C) 81</label>
                <label><input type="radio" name="q3" value="d"> D) 243</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: C) 81</strong></p>
                <p><strong>Explanation:</strong> log₃(x) = 4 means 3⁴ = x, so x = 81</p>
            </div>
        </div>

        <div class="quiz-question" data-question="4">
            <h4>Question 4: Power Rule</h4>
            <p><strong>Problem:</strong> Simplify log₅(x³)</p>
            <div class="quiz-options">
                <label><input type="radio" name="q4" value="a"> A) 3log₅(x)</label>
                <label><input type="radio" name="q4" value="b"> B) log₅(3x)</label>
                <label><input type="radio" name="q4" value="c"> C) log₅(x) + 3</label>
                <label><input type="radio" name="q4" value="d"> D) (log₅(x))³</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: A) 3log₅(x)</strong></p>
                <p><strong>Explanation:</strong> Using the power rule: log_b(m^p) = p · log_b(m), so log₅(x³) = 3log₅(x)</p>
            </div>
        </div>

        <div class="quiz-question" data-question="5">
            <h4>Question 5: Solving Log Equations</h4>
            <p><strong>Problem:</strong> Solve log₂(x - 1) = 3</p>
            <div class="quiz-options">
                <label><input type="radio" name="q5" value="a"> A) x = 7</label>
                <label><input type="radio" name="q5" value="b"> B) x = 8</label>
                <label><input type="radio" name="q5" value="c"> C) x = 9</label>
                <label><input type="radio" name="q5" value="d"> D) x = 16</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: C) x = 9</strong></p>
                <p><strong>Explanation:</strong> log₂(x - 1) = 3 means x - 1 = 2³ = 8, so x = 9</p>
            </div>
        </div>

        <div class="quiz-question" data-question="6">
            <h4>Question 6: Natural Logarithms</h4>
            <p><strong>Problem:</strong> If ln(x) = 2, what is x?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q6" value="a"> A) 2</label>
                <label><input type="radio" name="q6" value="b"> B) e²</label>
                <label><input type="radio" name="q6" value="c"> C) 2e</label>
                <label><input type="radio" name="q6" value="d"> D) e + 2</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) e²</strong></p>
                <p><strong>Explanation:</strong> ln(x) = 2 means x = e², since ln is the natural logarithm (base e)</p>
            </div>
        </div>

        <div class="quiz-actions">
            <button onclick="checkQuizAnswers('logarithms')" class="quiz-submit-btn">Check Answers</button>
            <button onclick="resetQuiz('logarithms')" class="quiz-reset-btn">Reset Quiz</button>
        </div>

        <div class="quiz-results" style="display: none;">
            <h4>Quiz Results</h4>
            <p class="score-display"></p>
            <div class="results-breakdown"></div>
        </div>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Logarithms are the inverse of exponentials! Master the basic definition (log_b(x) = y means b^y = x), memorize the three key properties (product, quotient, and power rules), and practice converting between logarithmic and exponential forms. Remember: logarithms turn multiplication into addition, division into subtraction, and powers into multiplication. These concepts appear in advanced ACT problems involving exponential growth, pH calculations, and earthquake measurements!</p>
</div>

<!-- QUIZ_24 -->
    `
  },

  'conic-sections': {
    title: 'Chapter 21: Conic Sections',
    duration: 28, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 21: <span style="color: #dc2626; font-weight: 600;">Conic Sections</span></h2>
    <p class="lesson-intro">Master circles, ellipses, parabolas, and hyperbolas - advanced ACT geometry topics that test your algebraic skills!</p>

    <div class="learning-path">
        <p><strong>Part 1:</strong> Circles → Center, radius, and standard form equations</p>
        <p><strong>Part 2:</strong> Parabolas → Vertex form, focus, and directrix</p>
        <p><strong>Part 3:</strong> Ellipses → Major/minor axes and standard equations</p>
        <p><strong>Part 4:</strong> Hyperbolas → Branches and asymptotes</p>
        <p><strong>Your advantage:</strong> You have <span style="color: #059669; font-weight: 600;">mastered coordinate geometry and quadratics</span> from previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #dc2626; font-weight: 600;">Circles</span></h3>

    <div class="concept-box">
        <h4>💡 What is a Circle?</h4>
        <p>A circle is the set of all points that are exactly the same distance (radius) from a central point.</p>
    </div>

    <div class="rules-box">
        <h4>Circle Equations:</h4>

        <p><strong>Standard Form:</strong></p>
        <p style="text-align: center; background: #fef2f2; padding: 10px; border-radius: 6px;">
            (x - h)² + (y - k)² = r²
        </p>
        <p>where (h, k) is the center and r is the radius</p>

        <p><strong>General Form:</strong></p>
        <p style="text-align: center; background: #fef2f2; padding: 10px; border-radius: 6px;">
            x² + y² + Dx + Ey + F = 0
        </p>
        <p>Convert by completing the square</p>
    </div>

    <div class="example-box">
        <h4>Example 1: Standard Form Circle</h4>
        <p><strong>Problem:</strong> Find the center and radius of (x - 3)² + (y + 2)² = 25</p>
        <p><strong>Solution:</strong></p>
        <p>Compare with (x - h)² + (y - k)² = r²</p>
        <p>Center: (h, k) = (3, -2)</p>
        <p>Radius: r = √25 = 5</p>
        <p><strong>Center: (3, -2), Radius: 5</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 2: Converting General to Standard Form</h4>
        <p><strong>Problem:</strong> Convert x² + y² - 6x + 4y - 12 = 0 to standard form</p>
        <p><strong>Solution:</strong></p>
        <p>Group x and y terms: (x² - 6x) + (y² + 4y) = 12</p>
        <p>Complete the square for x: x² - 6x + 9 = (x - 3)²</p>
        <p>Complete the square for y: y² + 4y + 4 = (y + 2)²</p>
        <p>(x - 3)² + (y + 2)² = 12 + 9 + 4 = 25</p>
        <p><strong>(x - 3)² + (y + 2)² = 25</strong></p>
        <p><strong>Center: (3, -2), Radius: 5</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 3: Finding Circle Equation</h4>
        <p><strong>Problem:</strong> Write the equation of a circle with center (-1, 4) and radius 3</p>
        <p><strong>Solution:</strong></p>
        <p>Use (x - h)² + (y - k)² = r² with h = -1, k = 4, r = 3</p>
        <p>(x - (-1))² + (y - 4)² = 3²</p>
        <p><strong>(x + 1)² + (y - 4)² = 9</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #dc2626; font-weight: 600;">Parabolas</span></h3>

    <div class="concept-box">
        <h4>💡 What is a Parabola?</h4>
        <p>A parabola is the set of all points equidistant from a point (focus) and a line (directrix).</p>
        <p>Can open up/down or left/right depending on orientation.</p>
    </div>

    <div class="rules-box">
        <h4>Parabola Equations:</h4>

        <p><strong>Vertical Parabolas (opens up/down):</strong></p>
        <p style="text-align: center; background: #fef2f2; padding: 10px; border-radius: 6px;">
            (x - h)² = 4p(y - k)
        </p>
        <p>Vertex: (h, k), Focus: (h, k + p), Directrix: y = k - p</p>

        <p><strong>Horizontal Parabolas (opens left/right):</strong></p>
        <p style="text-align: center; background: #fef2f2; padding: 10px; border-radius: 6px;">
            (y - k)² = 4p(x - h)
        </p>
        <p>Vertex: (h, k), Focus: (h + p, k), Directrix: x = h - p</p>
    </div>

    <div class="example-box">
        <h4>Example 4: Vertical Parabola</h4>
        <p><strong>Problem:</strong> Find the vertex, focus, and directrix of x² = 8y</p>
        <p><strong>Solution:</strong></p>
        <p>Rewrite: x² = 8y = 4(2)y</p>
        <p>Compare with (x - h)² = 4p(y - k): h = 0, k = 0, p = 2</p>
        <p>Vertex: (0, 0)</p>
        <p>Focus: (0, 0 + 2) = (0, 2)</p>
        <p>Directrix: y = 0 - 2 = -2</p>
        <p><strong>Vertex: (0,0), Focus: (0,2), Directrix: y = -2</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 5: Horizontal Parabola</h4>
        <p><strong>Problem:</strong> Find the vertex and focus of (y - 1)² = -12(x + 2)</p>
        <p><strong>Solution:</strong></p>
        <p>Compare with (y - k)² = 4p(x - h): h = -2, k = 1, 4p = -12, so p = -3</p>
        <p>Vertex: (-2, 1)</p>
        <p>Focus: (-2 + (-3), 1) = (-5, 1)</p>
        <p>Opens left (p < 0)</p>
        <p><strong>Vertex: (-2,1), Focus: (-5,1), Opens left</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #dc2626; font-weight: 600;">Ellipses</span></h3>

    <div class="concept-box">
        <h4>💡 What is an Ellipse?</h4>
        <p>An ellipse is the set of all points where the sum of distances to two fixed points (foci) is constant.</p>
        <p>Think of it as a "stretched circle."</p>
    </div>

    <div class="rules-box">
        <h4>Ellipse Equations:</h4>

        <p><strong>Standard Form (center at origin):</strong></p>
        <p style="text-align: center; background: #fef2f2; padding: 10px; border-radius: 6px;">
            x²/a² + y²/b² = 1
        </p>

        <p><strong>General Form (center at (h,k)):</strong></p>
        <p style="text-align: center; background: #fef2f2; padding: 10px; border-radius: 6px;">
            (x-h)²/a² + (y-k)²/b² = 1
        </p>

        <p><strong>Key Properties:</strong></p>
        <p>• If a > b: major axis horizontal, length 2a</p>
        <p>• If b > a: major axis vertical, length 2b</p>
        <p>• Distance between foci: 2c where c² = |a² - b²|</p>
    </div>

    <div class="example-box">
        <h4>Example 6: Standard Ellipse</h4>
        <p><strong>Problem:</strong> Analyze the ellipse x²/25 + y²/9 = 1</p>
        <p><strong>Solution:</strong></p>
        <p>a² = 25, so a = 5</p>
        <p>b² = 9, so b = 3</p>
        <p>Since a > b, major axis is horizontal</p>
        <p>Center: (0, 0)</p>
        <p>Major axis length: 2a = 10</p>
        <p>Minor axis length: 2b = 6</p>
        <p>c² = a² - b² = 25 - 9 = 16, so c = 4</p>
        <p>Foci: (±4, 0)</p>
        <p><strong>Center: (0,0), Major axis: horizontal, Foci: (±4,0)</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 7: Ellipse with Translated Center</h4>
        <p><strong>Problem:</strong> Find the center and axes of (x-2)²/16 + (y+1)²/25 = 1</p>
        <p><strong>Solution:</strong></p>
        <p>Center: (h, k) = (2, -1)</p>
        <p>a² = 16, so a = 4</p>
        <p>b² = 25, so b = 5</p>
        <p>Since b > a, major axis is vertical</p>
        <p>Major axis length: 2b = 10 (vertical)</p>
        <p>Minor axis length: 2a = 8 (horizontal)</p>
        <p><strong>Center: (2,-1), Major axis: vertical, length 10</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 4: <span style="color: #dc2626; font-weight: 600;">Hyperbolas</span></h3>

    <div class="concept-box">
        <h4>💡 What is a Hyperbola?</h4>
        <p>A hyperbola is the set of all points where the difference of distances to two fixed points (foci) is constant.</p>
        <p>Has two separate branches.</p>
    </div>

    <div class="rules-box">
        <h4>Hyperbola Equations:</h4>

        <p><strong>Horizontal Hyperbola:</strong></p>
        <p style="text-align: center; background: #fef2f2; padding: 10px; border-radius: 6px;">
            x²/a² - y²/b² = 1
        </p>
        <p>Opens left and right</p>

        <p><strong>Vertical Hyperbola:</strong></p>
        <p style="text-align: center; background: #fef2f2; padding: 10px; border-radius: 6px;">
            y²/a² - x²/b² = 1
        </p>
        <p>Opens up and down</p>

        <p><strong>Asymptotes:</strong> y = ±(b/a)x for horizontal, y = ±(a/b)x for vertical</p>
        <p><strong>Foci distance:</strong> c² = a² + b²</p>
    </div>

    <div class="example-box">
        <h4>Example 8: Horizontal Hyperbola</h4>
        <p><strong>Problem:</strong> Analyze x²/9 - y²/16 = 1</p>
        <p><strong>Solution:</strong></p>
        <p>a² = 9, so a = 3</p>
        <p>b² = 16, so b = 4</p>
        <p>Opens horizontally (x² positive)</p>
        <p>Center: (0, 0)</p>
        <p>Vertices: (±3, 0)</p>
        <p>Asymptotes: y = ±(4/3)x</p>
        <p>c² = a² + b² = 9 + 16 = 25, so c = 5</p>
        <p>Foci: (±5, 0)</p>
        <p><strong>Horizontal hyperbola, Vertices: (±3,0), Asymptotes: y = ±(4/3)x</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 9: Vertical Hyperbola</h4>
        <p><strong>Problem:</strong> Find the asymptotes of y²/4 - x²/9 = 1</p>
        <p><strong>Solution:</strong></p>
        <p>a² = 4, so a = 2</p>
        <p>b² = 9, so b = 3</p>
        <p>Vertical hyperbola (y² positive)</p>
        <p>Asymptotes: y = ±(a/b)x = ±(2/3)x</p>
        <p><strong>Asymptotes: y = ±(2/3)x</strong></p>
    </div>
</div>

<div class="section">
    <h3>🎯 Interactive Practice Quiz</h3>

    <div class="quiz-container">
        <div class="quiz-question" data-question="1">
            <h4>Question 1: Circle Center and Radius</h4>
            <p><strong>Problem:</strong> What is the center and radius of (x + 3)² + (y - 4)² = 36?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q1" value="a"> A) Center: (-3, 4), Radius: 6</label>
                <label><input type="radio" name="q1" value="b"> B) Center: (3, -4), Radius: 6</label>
                <label><input type="radio" name="q1" value="c"> C) Center: (-3, 4), Radius: 36</label>
                <label><input type="radio" name="q1" value="d"> D) Center: (3, 4), Radius: 6</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: A) Center: (-3, 4), Radius: 6</strong></p>
                <p><strong>Explanation:</strong> (x + 3)² = (x - (-3))², so h = -3. y - 4 gives k = 4. r² = 36, so r = 6.</p>
            </div>
        </div>

        <div class="quiz-question" data-question="2">
            <h4>Question 2: Parabola Vertex</h4>
            <p><strong>Problem:</strong> What is the vertex of the parabola (x - 2)² = 8(y + 1)?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q2" value="a"> A) (2, -1)</label>
                <label><input type="radio" name="q2" value="b"> B) (-2, 1)</label>
                <label><input type="radio" name="q2" value="c"> C) (2, 1)</label>
                <label><input type="radio" name="q2" value="d"> D) (-2, -1)</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: A) (2, -1)</strong></p>
                <p><strong>Explanation:</strong> Compare with (x - h)² = 4p(y - k). Here h = 2 and k = -1, so vertex is (2, -1).</p>
            </div>
        </div>

        <div class="quiz-question" data-question="3">
            <h4>Question 3: Ellipse Orientation</h4>
            <p><strong>Problem:</strong> For the ellipse x²/4 + y²/25 = 1, which axis is longer?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q3" value="a"> A) Horizontal axis</label>
                <label><input type="radio" name="q3" value="b"> B) Vertical axis</label>
                <label><input type="radio" name="q3" value="c"> C) Both axes are equal</label>
                <label><input type="radio" name="q3" value="d"> D) Cannot be determined</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) Vertical axis</strong></p>
                <p><strong>Explanation:</strong> b² = 25 > a² = 4, so b = 5 > a = 2. The major axis is vertical with length 2b = 10.</p>
            </div>
        </div>

        <div class="quiz-question" data-question="4">
            <h4>Question 4: Hyperbola Asymptotes</h4>
            <p><strong>Problem:</strong> What are the asymptotes of x²/9 - y²/4 = 1?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q4" value="a"> A) y = ±(3/2)x</label>
                <label><input type="radio" name="q4" value="b"> B) y = ±(2/3)x</label>
                <label><input type="radio" name="q4" value="c"> C) y = ±(4/9)x</label>
                <label><input type="radio" name="q4" value="d"> D) y = ±(9/4)x</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) y = ±(2/3)x</strong></p>
                <p><strong>Explanation:</strong> For horizontal hyperbola x²/a² - y²/b² = 1, asymptotes are y = ±(b/a)x = ±(2/3)x.</p>
            </div>
        </div>

        <div class="quiz-question" data-question="5">
            <h4>Question 5: Circle Equation</h4>
            <p><strong>Problem:</strong> Convert x² + y² + 6x - 8y + 9 = 0 to standard form.</p>
            <div class="quiz-options">
                <label><input type="radio" name="q5" value="a"> A) (x + 3)² + (y - 4)² = 16</label>
                <label><input type="radio" name="q5" value="b"> B) (x - 3)² + (y + 4)² = 16</label>
                <label><input type="radio" name="q5" value="c"> C) (x + 3)² + (y - 4)² = 4</label>
                <label><input type="radio" name="q5" value="d"> D) (x - 3)² + (y + 4)² = 4</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: A) (x + 3)² + (y - 4)² = 16</strong></p>
                <p><strong>Explanation:</strong> Complete the square: (x² + 6x + 9) + (y² - 8y + 16) = -9 + 9 + 16 = 16</p>
            </div>
        </div>

        <div class="quiz-question" data-question="6">
            <h4>Question 6: Conic Identification</h4>
            <p><strong>Problem:</strong> What type of conic is represented by 4x² + 9y² = 36?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q6" value="a"> A) Circle</label>
                <label><input type="radio" name="q6" value="b"> B) Ellipse</label>
                <label><input type="radio" name="q6" value="c"> C) Parabola</label>
                <label><input type="radio" name="q6" value="d"> D) Hyperbola</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) Ellipse</strong></p>
                <p><strong>Explanation:</strong> Divide by 36: x²/9 + y²/4 = 1. Both terms are positive with different denominators, so it's an ellipse.</p>
            </div>
        </div>

        <div class="quiz-actions">
            <button onclick="checkQuizAnswers('conic-sections')" class="quiz-submit-btn">Check Answers</button>
            <button onclick="resetQuiz('conic-sections')" class="quiz-reset-btn">Reset Quiz</button>
        </div>

        <div class="quiz-results" style="display: none;">
            <h4>Quiz Results</h4>
            <p class="score-display"></p>
            <div class="results-breakdown"></div>
        </div>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Conic sections combine algebra and geometry in powerful ways! Master the standard forms of circles, ellipses, parabolas, and hyperbolas, and practice converting between general and standard forms. Remember: circles have equal coefficients for x² and y², ellipses have different positive coefficients, parabolas have only one squared term, and hyperbolas have opposite signs. These advanced topics test your ability to work with complex algebraic expressions and geometric relationships!</p>
</div>

<!-- QUIZ_25 -->
    `
  },

  'complex-numbers': {
    title: 'Chapter 22: Complex Numbers',
    duration: 18, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 22: <span style="color: #7c3aed; font-weight: 600;">Complex Numbers</span></h2>
    <p class="lesson-intro">Master imaginary and complex numbers - advanced ACT topics that extend the real number system!</p>

    <div class="learning-path">
        <p><strong>Part 1:</strong> Imaginary Numbers → Understanding i and powers of i</p>
        <p><strong>Part 2:</strong> Complex Number Operations → Addition, subtraction, multiplication</p>
        <p><strong>Part 3:</strong> Complex Conjugates → Division and absolute value</p>
        <p><strong>Part 4:</strong> Graphing Complex Numbers → The complex plane</p>
        <p><strong>Your advantage:</strong> You have <span style="color: #059669; font-weight: 600;">mastered algebra and quadratics</span> from previous chapters!</p>
    </div>
</div>

<div class="section">
    <h3>Part 1: <span style="color: #7c3aed; font-weight: 600;">Imaginary Numbers</span></h3>

    <div class="concept-box">
        <h4>💡 What is an Imaginary Number?</h4>
        <p>An imaginary number involves the square root of a negative number.</p>
        <div style="text-align: center; background: #f5f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>i = √(-1), so i² = -1</strong></p>
        </div>
        <p>This allows us to find square roots of any negative number!</p>
    </div>

    <div class="rules-box">
        <h4>Powers of i:</h4>
        <p><strong>i¹ = i</strong></p>
        <p><strong>i² = -1</strong></p>
        <p><strong>i³ = i² · i = -1 · i = -i</strong></p>
        <p><strong>i⁴ = i² · i² = (-1)(-1) = 1</strong></p>
        <p><strong>i⁵ = i⁴ · i = 1 · i = i</strong> (the pattern repeats every 4)</p>

        <p><strong>Pattern:</strong> i, -1, -i, 1, i, -1, -i, 1, ...</p>
        <p><strong>To find iⁿ:</strong> Divide n by 4 and use the remainder</p>
    </div>

    <div class="example-box">
        <h4>Example 1: Powers of i</h4>
        <p><strong>Problem:</strong> Find i⁷ and i¹⁶</p>
        <p><strong>Solution:</strong></p>
        <p>For i⁷: 7 ÷ 4 = 1 remainder 3, so i⁷ = i³ = -i</p>
        <p>For i¹⁶: 16 ÷ 4 = 4 remainder 0, so i¹⁶ = i⁰ = 1</p>
        <p><strong>i⁷ = -i, i¹⁶ = 1</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 2: Square Roots of Negative Numbers</h4>
        <p><strong>Problem:</strong> Simplify √(-25) and √(-18)</p>
        <p><strong>Solution:</strong></p>
        <p>√(-25) = √(25 · (-1)) = √25 · √(-1) = 5i</p>
        <p>√(-18) = √(18 · (-1)) = √18 · i = √(9 · 2) · i = 3√2 · i = 3i√2</p>
        <p><strong>√(-25) = 5i, √(-18) = 3i√2</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 2: <span style="color: #7c3aed; font-weight: 600;">Complex Numbers</span></h3>

    <div class="concept-box">
        <h4>💡 What is a Complex Number?</h4>
        <p>A complex number has both a real part and an imaginary part.</p>
        <div style="text-align: center; background: #f5f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>z = a + bi</strong></p>
        </div>
        <p>where a is the real part and b is the imaginary part</p>
        <p>Examples: 3 + 4i, -2 + 7i, 5 - 3i</p>
    </div>

    <div class="rules-box">
        <h4>Complex Number Operations:</h4>

        <p><strong>Addition/Subtraction:</strong></p>
        <p>(a + bi) ± (c + di) = (a ± c) + (b ± d)i</p>

        <p><strong>Multiplication:</strong></p>
        <p>(a + bi)(c + di) = ac + adi + bci + bdi² = (ac - bd) + (ad + bc)i</p>

        <p><strong>Remember:</strong> i² = -1, so replace i² with -1 when simplifying</p>
    </div>

    <div class="example-box">
        <h4>Example 3: Adding Complex Numbers</h4>
        <p><strong>Problem:</strong> (3 + 5i) + (2 - 7i)</p>
        <p><strong>Solution:</strong></p>
        <p>Add real parts: 3 + 2 = 5</p>
        <p>Add imaginary parts: 5i + (-7i) = -2i</p>
        <p><strong>(3 + 5i) + (2 - 7i) = 5 - 2i</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 4: Multiplying Complex Numbers</h4>
        <p><strong>Problem:</strong> (3 + 2i)(1 - 4i)</p>
        <p><strong>Solution:</strong></p>
        <p>Use FOIL: (3)(1) + (3)(-4i) + (2i)(1) + (2i)(-4i)</p>
        <p>= 3 - 12i + 2i - 8i²</p>
        <p>= 3 - 10i - 8(-1)</p>
        <p>= 3 - 10i + 8</p>
        <p>= 11 - 10i</p>
        <p><strong>(3 + 2i)(1 - 4i) = 11 - 10i</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 5: Squaring Complex Numbers</h4>
        <p><strong>Problem:</strong> (2 - 3i)²</p>
        <p><strong>Solution:</strong></p>
        <p>(2 - 3i)² = (2 - 3i)(2 - 3i)</p>
        <p>= 4 - 6i - 6i + 9i²</p>
        <p>= 4 - 12i + 9(-1)</p>
        <p>= 4 - 12i - 9</p>
        <p>= -5 - 12i</p>
        <p><strong>(2 - 3i)² = -5 - 12i</strong></p>
    </div>
</div>

<div class="section">
    <h3>Part 3: <span style="color: #7c3aed; font-weight: 600;">Complex Conjugates</span></h3>

    <div class="concept-box">
        <h4>💡 What is a Complex Conjugate?</h4>
        <p>The complex conjugate of a + bi is a - bi (change the sign of the imaginary part).</p>
        <p>Denoted as: z̄ or z* where z = a + bi, then z̄ = a - bi</p>
    </div>

    <div class="rules-box">
        <h4>Properties of Complex Conjugates:</h4>
        <p><strong>z · z̄ = a² + b²</strong> (always a real number)</p>
        <p><strong>|z| = √(z · z̄) = √(a² + b²)</strong> (absolute value/modulus)</p>
        <p><strong>Division:</strong> z₁/z₂ = (z₁ · z̄₂)/(z₂ · z̄₂)</p>
    </div>

    <div class="example-box">
        <h4>Example 6: Complex Conjugates</h4>
        <p><strong>Problem:</strong> Find the conjugate of 4 - 7i and compute (4 - 7i)(4 + 7i)</p>
        <p><strong>Solution:</strong></p>
        <p>Conjugate of 4 - 7i is 4 + 7i</p>
        <p>(4 - 7i)(4 + 7i) = 16 + 28i - 28i - 49i²</p>
        <p>= 16 - 49(-1) = 16 + 49 = 65</p>
        <p><strong>Conjugate: 4 + 7i, Product: 65</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 7: Dividing Complex Numbers</h4>
        <p><strong>Problem:</strong> (3 + 2i)/(1 - 4i)</p>
        <p><strong>Solution:</strong></p>
        <p>Multiply by conjugate of denominator:</p>
        <p>(3 + 2i)/(1 - 4i) · (1 + 4i)/(1 + 4i)</p>
        <p>= (3 + 2i)(1 + 4i) / (1 - 4i)(1 + 4i)</p>
        <p>Numerator: 3 + 12i + 2i + 8i² = 3 + 14i - 8 = -5 + 14i</p>
        <p>Denominator: 1 - 16i² = 1 + 16 = 17</p>
        <p><strong>(-5 + 14i)/17 = -5/17 + (14/17)i</strong></p>
    </div>

    <div class="example-box">
        <h4>Example 8: Absolute Value of Complex Numbers</h4>
        <p><strong>Problem:</strong> Find |3 - 4i|</p>
        <p><strong>Solution:</strong></p>
        <p>|3 - 4i| = √(3² + (-4)²) = √(9 + 16) = √25 = 5</p>
        <p><strong>|3 - 4i| = 5</strong></p>
    </div>
</div>

<div class="section">
    <h3>🎯 Interactive Practice Quiz</h3>

    <div class="quiz-container">
        <div class="quiz-question" data-question="1">
            <h4>Question 1: Powers of i</h4>
            <p><strong>Problem:</strong> What is i²³?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q1" value="a"> A) i</label>
                <label><input type="radio" name="q1" value="b"> B) -1</label>
                <label><input type="radio" name="q1" value="c"> C) -i</label>
                <label><input type="radio" name="q1" value="d"> D) 1</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: C) -i</strong></p>
                <p><strong>Explanation:</strong> 23 ÷ 4 = 5 remainder 3, so i²³ = i³ = -i</p>
            </div>
        </div>

        <div class="quiz-question" data-question="2">
            <h4>Question 2: Square Root of Negative Numbers</h4>
            <p><strong>Problem:</strong> Simplify √(-49)</p>
            <div class="quiz-options">
                <label><input type="radio" name="q2" value="a"> A) 7i</label>
                <label><input type="radio" name="q2" value="b"> B) -7</label>
                <label><input type="radio" name="q2" value="c"> C) 7</label>
                <label><input type="radio" name="q2" value="d"> D) -7i</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: A) 7i</strong></p>
                <p><strong>Explanation:</strong> √(-49) = √(49 · (-1)) = √49 · √(-1) = 7i</p>
            </div>
        </div>

        <div class="quiz-question" data-question="3">
            <h4>Question 3: Adding Complex Numbers</h4>
            <p><strong>Problem:</strong> (5 - 3i) + (-2 + 7i) = ?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q3" value="a"> A) 3 + 4i</label>
                <label><input type="radio" name="q3" value="b"> B) 7 - 10i</label>
                <label><input type="radio" name="q3" value="c"> C) 3 - 4i</label>
                <label><input type="radio" name="q3" value="d"> D) -7 + 10i</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: A) 3 + 4i</strong></p>
                <p><strong>Explanation:</strong> (5 - 2) + (-3i + 7i) = 3 + 4i</p>
            </div>
        </div>

        <div class="quiz-question" data-question="4">
            <h4>Question 4: Multiplying Complex Numbers</h4>
            <p><strong>Problem:</strong> (2 + 3i)(1 - i) = ?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q4" value="a"> A) 5 + i</label>
                <label><input type="radio" name="q4" value="b"> B) -1 + 5i</label>
                <label><input type="radio" name="q4" value="c"> C) 5 - i</label>
                <label><input type="radio" name="q4" value="d"> D) -1 - 5i</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: A) 5 + i</strong></p>
                <p><strong>Explanation:</strong> 2 - 2i + 3i - 3i² = 2 + i - 3(-1) = 2 + i + 3 = 5 + i</p>
            </div>
        </div>

        <div class="quiz-question" data-question="5">
            <h4>Question 5: Complex Conjugate</h4>
            <p><strong>Problem:</strong> What is the conjugate of -4 + 6i?</p>
            <div class="quiz-options">
                <label><input type="radio" name="q5" value="a"> A) 4 + 6i</label>
                <label><input type="radio" name="q5" value="b"> B) -4 - 6i</label>
                <label><input type="radio" name="q5" value="c"> C) 4 - 6i</label>
                <label><input type="radio" name="q5" value="d"> D) -4 + 6i</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) -4 - 6i</strong></p>
                <p><strong>Explanation:</strong> The conjugate changes only the sign of the imaginary part: -4 + 6i → -4 - 6i</p>
            </div>
        </div>

        <div class="quiz-question" data-question="6">
            <h4>Question 6: Absolute Value</h4>
            <p><strong>Problem:</strong> Find |5 - 12i|</p>
            <div class="quiz-options">
                <label><input type="radio" name="q6" value="a"> A) 7</label>
                <label><input type="radio" name="q6" value="b"> B) 13</label>
                <label><input type="radio" name="q6" value="c"> C) 17</label>
                <label><input type="radio" name="q6" value="d"> D) 119</label>
            </div>
            <div class="quiz-explanation" style="display: none;">
                <p><strong>Answer: B) 13</strong></p>
                <p><strong>Explanation:</strong> |5 - 12i| = √(5² + (-12)²) = √(25 + 144) = √169 = 13</p>
            </div>
        </div>

        <div class="quiz-actions">
            <button onclick="checkQuizAnswers('complex-numbers')" class="quiz-submit-btn">Check Answers</button>
            <button onclick="resetQuiz('complex-numbers')" class="quiz-reset-btn">Reset Quiz</button>
        </div>

        <div class="quiz-results" style="display: none;">
            <h4>Quiz Results</h4>
            <p class="score-display"></p>
            <div class="results-breakdown"></div>
        </div>
    </div>
</div>

<div class="key-takeaway">
    <h4>Key Takeaway</h4>
    <p>Complex numbers extend the real number system to include square roots of negative numbers! Master the powers of i (repeating pattern: i, -1, -i, 1), practice operations with complex numbers, and understand conjugates for division. Remember: i² = -1 always, complex conjugates multiply to give real numbers, and the absolute value uses the Pythagorean theorem. Complex numbers appear in advanced ACT problems and connect algebra with geometry through the complex plane!</p>
</div>

<!-- QUIZ_26 -->
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
    content: '<p>Test format, timing, and question types overview.</p>'
  }
};

// Complete list of all lessons from actcourse.html structure
export const lessonStructure = [
  // Introduction
  { id: 'getting-started', section: 'all', title: 'Getting Started with the ACT', desc: 'Test format, timing, and scoring overview', status: 'completed' },

  // English Section
  { id: 'sentence-structure', section: 'english', title: 'Chapter 1: Independent vs Dependent', desc: 'Master clause recognition and sentence structure fundamentals', tags: ['independent clauses', 'dependent clauses', 'sentence fragments', 'comma splices', 'FANBOYS', 'compound sentences'], status: 'in-progress' },
  { id: 'commas', section: 'english', title: 'Chapter 2: Four Comma Types', desc: 'Master all comma rules and avoid common comma errors', tags: ['introductory commas', 'unnecessary information commas', 'list commas', 'Oxford comma', 'restrictive vs nonrestrictive'], status: 'completed' },
  { id: 'punctuation', section: 'english', title: 'Chapter 3: Advanced Punctuation', desc: 'Master semicolons, colons, dashes, apostrophes, and quotation marks', tags: ['semicolons', 'colons', 'dashes', 'apostrophes', 'contractions'], status: 'completed' },
  { id: 'verbs', section: 'english', title: 'Chapter 4: Subject-Verb Agreement', desc: 'Master subject-verb agreement and verb tense consistency', tags: ['subject-verb agreement', 'verb tenses', 'collective nouns', 'indefinite pronouns'], status: 'completed' },
  { id: 'pronouns', section: 'english', title: 'Chapter 5: Who vs Whom', desc: 'Master pronoun case, agreement, and clarity', tags: ['who vs whom', 'pronoun agreement', 'ambiguous pronouns'], status: 'in-progress' },
  { id: 'modifiers', section: 'english', title: 'Chapter 6: Dangling Modifiers', desc: 'Identify and fix misplaced and dangling modifiers', tags: ['dangling modifiers', 'misplaced modifiers'], status: 'not-started' },
  { id: 'parallel-structure', section: 'english', title: 'Chapter 7: Parallel Structure', desc: 'Master parallel structure in lists, series, and comparisons', tags: ['parallel structure', 'correlative conjunctions'], status: 'in-progress' },
  { id: 'misc-topics', section: 'english', title: 'Chapter 8: Word Choice & Usage', desc: 'Master commonly confused words and usage rules', tags: ['its vs it\'s', 'there their they\'re', 'affect vs effect', 'than vs then'], status: 'in-progress' },
  { id: 'grammar-review', section: 'english', title: 'Grammar Review', desc: 'Comprehensive review of all English grammar concepts', tags: ['comprehensive review'], status: 'not-started' },
  { id: 'redundancy', section: 'english', title: 'Chapter 9: Eliminating Wordiness', desc: 'Identify and eliminate redundant and wordy expressions', tags: ['wordiness', 'redundancy'], status: 'in-progress' },
  { id: 'word-choice', section: 'english', title: 'Chapter 10: Precise Language', desc: 'Select the most precise and effective words in context', tags: ['word choice', 'tone and style'], status: 'in-progress' },
  { id: 'transitions', section: 'english', title: 'Chapter 11: Logical Connections', desc: 'Master transitions and logical flow between ideas', tags: ['transitions', 'logical connections'], status: 'not-started' },
  { id: 'which-choice', section: 'english', title: 'Chapter 12: Best Choice', desc: 'Answer rhetorical strategy and content questions', tags: ['author\'s purpose', 'supporting details', 'main idea'], status: 'in-progress' },
  { id: 'adding-deleting', section: 'english', title: 'Chapter 13: Adding or Deleting', desc: 'Determine when to add or delete information for clarity', tags: ['adding information', 'deleting information', 'relevance'], status: 'not-started' },
  { id: 'logical-placement', section: 'english', title: 'Chapter 14: Sentence Order', desc: 'Organize sentences for optimal logical flow', tags: ['sentence order', 'logical sequence'], status: 'in-progress' },

  // Math Section - Most Common Topics
  { id: 'backsolving', section: 'math', title: 'Chapter 1: Backsolving', desc: 'Master the backsolving strategy for multiple-choice questions', tags: ['backsolving', 'working backwards', 'answer choices', 'test-taking strategies', 'elimination method', 'reverse solving'], status: 'not-started' },
  { id: 'substitution', section: 'math', title: 'Chapter 2: Substitution', desc: 'Master the substitution strategy for complex problems', tags: ['substitution', 'plugging in values', 'test values', 'variable substitution', 'number picking', 'strategic guessing'], status: 'not-started' },
  { id: 'geometry-angles', section: 'math', title: 'Chapter 3: Geometry Part 1 - Angles', desc: 'Master angle relationships and properties', tags: ['angles', 'intersecting lines', 'parallel lines', 'interior angles', 'exterior angles', 'vertical angles', 'supplementary angles', 'complementary angles', 'angle bisectors'], status: 'not-started' },
  { id: 'geometry-shapes', section: 'math', title: 'Chapter 4: Geometry Part 2 - Shapes', desc: 'Master area, volume, and triangle properties', tags: ['area formulas', 'volume formulas', 'right triangles', 'special triangles', 'Pythagorean theorem', '45-45-90 triangles', '30-60-90 triangles', 'circles', 'polygons'], status: 'not-started' },
  { id: 'lines', section: 'math', title: 'Chapter 5: Lines', desc: 'Slope, equations of lines, midpoint, distance formulas', status: 'not-started' },
  { id: 'fractions', section: 'math', title: 'Chapter 6: Fractions', desc: 'Operations with fractions and calculator techniques', status: 'not-started' },
  { id: 'algebra-skills', section: 'math', title: 'Chapter 7: Algebra Skills', desc: 'Master fundamental algebra operations and order of operations', tags: ['PEMDAS', 'order of operations', 'negative numbers', 'combining like terms', 'distributive property', 'factoring', 'algebraic expressions', 'simplifying expressions'], status: 'not-started' },
  { id: 'number-theory', section: 'math', title: 'Chapter 8: Number Theory', desc: 'Types of numbers, GCD, LCM, solution types', status: 'not-started' },
  { id: 'percentages', section: 'math', title: 'Chapter 9: Percentages', desc: 'Percentage calculations, increase/decrease', status: 'not-started' },
  { id: 'ratios-proportions', section: 'math', title: 'Chapter 10: Ratios and Proportions', desc: 'Ratio problems, proportions, direct/indirect variation', status: 'not-started' },
  { id: 'functions', section: 'math', title: 'Chapter 11: Functions', desc: 'Function notation, composition, domain, range', status: 'not-started' },
  { id: 'statistics-basics', section: 'math', title: 'Chapter 12: Mean, Median, Mode, and Range', desc: 'Basic statistics and weighted averages', status: 'not-started' },
  { id: 'exponents-roots', section: 'math', title: 'Chapter 13: Exponents and Roots', desc: 'Exponent rules and simplifying radicals', status: 'not-started' },
  { id: 'quadratics', section: 'math', title: 'Chapter 14: Quadratics', desc: 'Factoring, quadratic formula, vertex form, parabola properties', status: 'not-started' },

  // Math Section - Common Topics
  { id: 'systems-equations', section: 'math', title: 'Chapter 15: Systems of Equations', desc: 'Elimination, substitution, word problems', status: 'not-started' },
  { id: 'trigonometry', section: 'math', title: 'Chapter 16: Trigonometry', desc: 'SOH-CAH-TOA, unit circle, trig functions', status: 'not-started' },
  { id: 'advanced-geometry', section: 'math', title: 'Chapter 17: Advanced Geometry', desc: 'Complex shapes, 3D geometry, coordinate geometry', status: 'not-started' },
  { id: 'sequences-series', section: 'math', title: 'Chapter 18: Sequences and Series', desc: 'Arithmetic and geometric sequences, pattern recognition', status: 'not-started' },
  { id: 'probability-counting', section: 'math', title: 'Chapter 19: Probability and Counting', desc: 'Permutations, combinations, basic probability', status: 'not-started' },
  { id: 'logarithms', section: 'math', title: 'Chapter 20: Logarithms', desc: 'Logarithm properties, equations, real-world applications', status: 'not-started' },
  { id: 'conic-sections', section: 'math', title: 'Chapter 21: Conic Sections', desc: 'Circles, ellipses, parabolas, hyperbolas', status: 'not-started' },
  { id: 'complex-numbers', section: 'math', title: 'Chapter 22: Complex Numbers', desc: 'Imaginary numbers, complex operations, conjugates', status: 'not-started' },

  // Continue with all other math, reading, and science lessons...
  // (I'll need to add all 50+ lessons here)
];