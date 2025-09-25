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
    <h2>Chapter 2: Four Comma Types</h2>
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
        <h4>Type 1: FANBOYS Comma (From Golden Rule #2)</h4>
        <p><strong>Pattern:</strong> <span class="independent-highlight">Independent clause</span> <em><strong>, FANBOYS</strong></em> <span class="independent-highlight">independent clause</span></p>
        <div class="examples">
            <p><strong>Perfect Example:</strong> <span class="independent-highlight">Sarah loves chocolate</span><strong>,</strong> <strong>but</strong> <span class="independent-highlight">Andrew prefers vanilla.</span></p>
            <p><em>Why this works: Two <span class="independent-highlight">complete thoughts</span> joined with comma + connecting word</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>Type 2: Introductory Comma (From Golden Rule #4)</h4>
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
        <h4>Type 3: Unnecessary Information Commas</h4>
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
        <h4>Type 4: List Commas</h4>
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
    <h2>Chapter 3: Advanced Punctuation</h2>
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
    <h3>Part 1: Semicolons - The Super Period</h3>

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
    <h2>Chapter 4: Subject-Verb Agreement</h2>
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
    <h2>Chapter 5: Who vs Whom & Pronoun Mastery</h2>
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

  // Math Section - Common Topics
  { id: 'logarithms', section: 'math', title: 'Chapter 14: Logarithms', desc: 'Logarithm basics and change of base rule', status: 'not-started' },
  { id: 'systems-equations', section: 'math', title: 'Chapter 15: Systems of Equations', desc: 'Elimination, substitution, word problems', status: 'not-started' },
  { id: 'quadratics', section: 'math', title: 'Chapter 16: Quadratics', desc: 'Factoring, quadratic formula, vertex form', status: 'not-started' },
  { id: 'trigonometry', section: 'math', title: 'Chapter 17: Trigonometry', desc: 'SOH-CAH-TOA, unit circle, trig functions', status: 'not-started' },

  // Continue with all other math, reading, and science lessons...
  // (I'll need to add all 50+ lessons here)
];