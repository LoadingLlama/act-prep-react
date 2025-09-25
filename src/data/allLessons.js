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
    duration: 20, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 1: Independent vs Dependent</h2>
    <p class="lesson-intro">Master the foundation of ACT English success by learning to identify independent clauses, dependent clauses, compound sentences, and comma splices. This chapter covers <strong>20% of all English questions</strong>—making it one of the most important topics to master!</p>
</div>

<div class="section why-important">
    <h3>Why This Matters for Your ACT Score</h3>
    <p>Sentence structure questions test your ability to:</p>
    <ul>
        <li><strong>Identify complete vs. incomplete sentences</strong> (avoiding fragments)</li>
        <li><strong>Properly join multiple ideas</strong> using correct punctuation</li>
        <li><strong>Recognize and fix run-on sentences</strong> and comma splices</li>
    </ul>
    <p class="score-impact">Getting these right can boost your English score by 3-5 points!</p>
</div>

<div class="section">
    <h3>Building Blocks: Understanding Clauses and Phrases</h3>
    <p>Every sentence structure question comes down to understanding these three basic components. Think of them as sentence "ingredients"—you need to know what each one does before you can combine them correctly:</p>

    <div class="concept-grid">
        <div class="concept-box independent">
            <h4>1. Independent Clauses</h4>
            <p class="definition">A <strong>complete thought</strong> that can stand alone as its own sentence. Must contain both a subject (who/what) and a predicate (what they do).</p>
            <p class="test-tip"><strong>Quick Test:</strong> Read it aloud—does it sound complete? Could you end the conversation here? If yes, it's independent!</p>
            <div class="examples">
                <h5>Examples:</h5>
                <ul>
                    <li>The dog chased its tail. <em>(subject: dog, predicate: chased its tail)</em></li>
                    <li>Monique made homemade peach scones. <em>(subject: Monique, predicate: made scones)</em></li>
                    <li>She laughed loudly. <em>(subject: she, predicate: laughed loudly)</em></li>
                    <li>The excited child opened his present eagerly. <em>(subject: child, predicate: opened present)</em></li>
                </ul>
            </div>
            <div class="key-insight">
                <p><strong>Key Insight:</strong> These could each be their own sentence with a period at the end!</p>
            </div>
        </div>

        <div class="concept-box dependent">
            <h4>2. Dependent Clauses</h4>
            <p class="definition">Contains a subject and verb but <strong>cannot stand alone</strong> because it begins with a subordinating conjunction that makes it incomplete.</p>
            <div class="subordinating-conjunctions">
                <p><strong>Most common subordinating conjunctions (memorize these!):</strong></p>
                <div class="conjunction-categories">
                    <div class="category">
                        <strong>Time:</strong> <span class="conjunction-list">when, while, before, after, since, until, once</span>
                    </div>
                    <div class="category">
                        <strong>Condition:</strong> <span class="conjunction-list">if, unless, whether</span>
                    </div>
                    <div class="category">
                        <strong>Contrast:</strong> <span class="conjunction-list">although, though, even though, whereas</span>
                    </div>
                    <div class="category">
                        <strong>Cause:</strong> <span class="conjunction-list">because, since, as</span>
                    </div>
                </div>
            </div>
            <div class="examples">
                <h5>Examples:</h5>
                <ul>
                    <li><em>While</em> the dog chased its tail... <em>(sounds incomplete, right?)</em></li>
                    <li><em>Although</em> Monique made homemade peach scones... <em>(we're waiting for more!)</em></li>
                    <li><em>Because</em> she laughed loudly... <em>(what happened because of this?)</em></li>
                    <li><em>When</em> the excited child opened his present... <em>(then what?)</em></li>
                </ul>
            </div>
            <div class="key-insight">
                <p><strong>Key Insight:</strong> Your brain is waiting for more information—that's the clue it's dependent!</p>
            </div>
        </div>

        <div class="concept-box phrase">
            <h4>3. Phrases</h4>
            <p class="definition">Missing either a subject, a complete verb, or both. Provides descriptive information but never forms a complete thought on its own.</p>
            <div class="examples">
                <h5>Examples:</h5>
                <ul>
                    <li>Chasing its tail... <em>(missing subject—who is chasing?)</em></li>
                    <li>Made from scratch... <em>(missing subject—who/what was made?)</em></li>
                    <li>The talented musician... <em>(missing predicate—what did the musician do?)</em></li>
                    <li>In the morning... <em>(missing both subject and verb—this is just a prepositional phrase)</em></li>
                </ul>
            </div>
            <div class="key-insight">
                <p><strong>Key Insight:</strong> Phrases are like puzzle pieces—they need to attach to a complete sentence to make sense!</p>
            </div>
        </div>
    </div>

    <div class="pro-tip">
        <h4>🎯 PRO TIP: The Cover Test (Your Secret Weapon!)</h4>
        <p>When you can't decide between dependent clause vs. phrase, use this foolproof method:</p>
        <div class="cover-test-steps">
            <ol>
                <li><strong>Find the first word</strong> that might be a subordinating conjunction</li>
                <li><strong>Cover it completely</strong> with your finger</li>
                <li><strong>Read what's left</strong>—is it a complete sentence?</li>
            </ol>
        </div>
        <div class="comparison-examples">
            <div class="test-example">
                <p><strong>Test #1:</strong> "<em>When</em> my brother Adam eats cookies daily"</p>
                <p>Cover "When" → "my brother Adam eats cookies daily" = Complete sentence!</p>
                <p class="result">✅ <strong>Dependent clause</strong> (complete sentence hiding behind the subordinating word)</p>
            </div>
            <div class="test-example">
                <p><strong>Test #2:</strong> "Eating cookies daily"</p>
                <p>No subordinating word to cover → "Eating cookies daily" = Still incomplete</p>
                <p class="result">✅ <strong>Phrase</strong> (no complete sentence hiding anywhere)</p>
            </div>
        </div>
        <div class="why-this-works">
            <p><strong>Why this works:</strong> Dependent clauses are just independent clauses with a subordinating word stuck in front. Remove that word, and you reveal the complete sentence underneath!</p>
        </div>
    </div>
</div>

<!-- QUIZ_1 -->


<div class="section">
    <h3>Avoiding Sentence Fragments (The #1 Mistake!)</h3>
    <div class="fragment-intro">
        <p class="key-rule">Every complete sentence needs two essential ingredients: a <strong>subject</strong> (who/what) and a <strong>complete verb</strong> (what they do/are).</p>
        <p>Fragments happen when one of these ingredients is missing. They're incomplete thoughts that leave the reader hanging!</p>
    </div>

    <div class="fragment-examples">
        <div class="fragment-breakdown">
            <h5>Fragment Type 1: Missing the Action (Verb)</h5>
            <div class="incorrect-example">
                <p><strong>❌ Fragment:</strong> The student running to get to class on time.</p>
                <p class="explanation"><em>We have a subject (student) but no complete action. "Running" is just a description—what did the student actually <strong>do</strong>?</em></p>
                <div class="fix-options">
                    <p><strong>✅ Fix Option 1:</strong> The student running to get to class on time <span class="highlight">dropped her water bottle</span>.</p>
                    <p><strong>✅ Fix Option 2:</strong> The student <span class="highlight">was</span> running to get to class on time.</p>
                    <p><strong>✅ Fix Option 3:</strong> <span class="highlight">While</span> running to get to class on time, the student <span class="highlight">slipped on the wet floor</span>.</p>
                </div>
            </div>
        </div>

        <div class="fragment-breakdown">
            <h5>Fragment Type 2: Missing the Who/What (Subject)</h5>
            <div class="incorrect-example">
                <p><strong>❌ Fragment:</strong> Excited to go to the beach and surf.</p>
                <p class="explanation"><em>We have emotions and actions, but <strong>who</strong> is excited? The subject is missing!</em></p>
                <div class="fix-options">
                    <p><strong>✅ Fix Option 1:</strong> <span class="highlight">My little brother Shaun is</span> excited to go to the beach and surf.</p>
                    <p><strong>✅ Fix Option 2:</strong> <span class="highlight">The family</span> excited to go to the beach and surf <span class="highlight">packed early</span>.</p>
                </div>
            </div>
        </div>

        <div class="fragment-breakdown">
            <h5>Fragment Type 3: The Sneaky Dependent Clause</h5>
            <div class="incorrect-example">
                <p><strong>❌ Fragment:</strong> Because the weather was perfect for hiking.</p>
                <p class="explanation"><em>This has a subject (weather) and verb (was), but that "because" makes it incomplete. So what happened because the weather was perfect?</em></p>
                <div class="fix-options">
                    <p><strong>✅ Fix Option 1:</strong> Because the weather was perfect for hiking<span class="highlight">, we decided to climb the mountain</span>.</p>
                    <p><strong>✅ Fix Option 2:</strong> <span class="highlight">We chose that trail because</span> the weather was perfect for hiking.</p>
                    <p><strong>✅ Fix Option 3:</strong> The weather was perfect for hiking. <em>(remove "because")</em></p>
                </div>
            </div>
        </div>
    </div>

    <div class="fragment-test">
        <h4>🔍 Quick Fragment Detection Test</h4>
        <p>Read the sentence aloud and ask yourself: "Is this a complete thought? Could I stop speaking here and walk away?" If the answer is no, it's a fragment!</p>
    </div>
</div>

<div class="section">
    <h3>The 5 Golden Rules for Combining Clauses</h3>
    <div class="rules-intro">
        <p><strong>These are the ONLY 5 ways to correctly combine clauses on the ACT.</strong> Every sentence structure question boils down to applying one of these rules. Master them, and you'll never miss another sentence structure question!</p>
        <p class="memorization-tip">💡 <em>Think of these as "legal" ways to connect ideas—everything else is "illegal" on the ACT!</em></p>
    </div>

    <div class="fanboys-callout">
        <h4>🔑 First, Meet the FANBOYS!</h4>
        <p>These 7 words are <strong>coordinating conjunctions</strong>—they join equal ideas (two independent clauses).</p>
        <div class="fanboys-grid">
            <div class="fanboy-item"><strong>F</strong>or <em>(because)</em></div>
            <div class="fanboy-item"><strong>A</strong>nd <em>(addition)</em></div>
            <div class="fanboy-item"><strong>N</strong>or <em>(negative and)</em></div>
            <div class="fanboy-item"><strong>B</strong>ut <em>(contrast)</em></div>
            <div class="fanboy-item"><strong>O</strong>r <em>(choice)</em></div>
            <div class="fanboy-item"><strong>Y</strong>et <em>(but)</em></div>
            <div class="fanboy-item"><strong>S</strong>o <em>(therefore)</em></div>
        </div>
        <p class="fanboys-note"><strong>Memory Trick:</strong> "Fan Boys" love connecting things equally—they never pick favorites between clauses!</p>
    </div>

    <div class="rules-container">
        <div class="rule-card rule-1">
            <div class="rule-number">1</div>
            <div class="rule-content">
                <h5>Period Separation (The Safe Choice)</h5>
                <p class="rule-description">Split two independent clauses into completely separate sentences</p>
                <div class="rule-examples">
                    <p class="example"><em>Mary loves dogs<span class="highlight">.</span> Andrew loves cats.</em></p>
                    <p class="example"><em>The storm was approaching<span class="highlight">.</span> We decided to head home.</em></p>
                </div>
                <p class="pattern">Independent<span class="highlight"> . </span>Independent</p>
                <div class="rule-insight">
                    <p><strong>When to use:</strong> Always works! When in doubt, choose the period—it's never wrong.</p>
                </div>
            </div>
        </div>

        <div class="rule-card rule-2">
            <div class="rule-number">2</div>
            <div class="rule-content">
                <h5>Comma + FANBOYS (The Connector)</h5>
                <p class="rule-description">Use comma + coordinating conjunction to show relationship between ideas</p>
                <div class="rule-examples">
                    <p class="example"><em>Mary loves dogs<span class="highlight">, and</span> Andrew loves cats.</em> <em>(addition)</em></p>
                    <p class="example"><em>The storm was approaching<span class="highlight">, so</span> we decided to head home.</em> <em>(cause/effect)</em></p>
                </div>
                <p class="pattern">Independent<span class="highlight"> , FANBOY </span>Independent</p>
                <div class="rule-insight">
                    <p><strong>When to use:</strong> When you want to show how two ideas relate to each other.</p>
                    <p><strong>⚠️ Warning:</strong> Both parts MUST be independent clauses, or this rule doesn't work!</p>
                </div>
            </div>
        </div>

        <div class="rule-card rule-3">
            <div class="rule-number">3</div>
            <div class="rule-content">
                <h5>Semicolon Connection (The Strong Link)</h5>
                <p class="rule-description">Join two closely related independent clauses with a semicolon</p>
                <div class="rule-examples">
                    <p class="example"><em>Mary loves dogs<span class="highlight">;</span> Andrew loves cats.</em></p>
                    <p class="example"><em>The storm was approaching<span class="highlight">;</span> we needed to find shelter quickly.</em></p>
                </div>
                <p class="pattern">Independent<span class="highlight"> ; </span>Independent</p>
                <div class="rule-insight">
                    <p><strong>When to use:</strong> When two ideas are very closely connected and you want to emphasize their relationship.</p>
                    <p><strong>🔍 ACT Tip:</strong> Think of semicolons as "super periods"—they're stronger than commas but softer than periods.</p>
                </div>
            </div>
        </div>

        <div class="rule-card rule-4">
            <div class="rule-number">4</div>
            <div class="rule-content">
                <h5>Dependent → Independent (With Comma)</h5>
                <p class="rule-description">Start with incomplete thought, add comma, then complete the idea</p>
                <div class="rule-examples">
                    <p class="example"><em><span class="highlight">While</span> Mary loves dogs<span class="highlight">,</span> Andrew loves cats.</em></p>
                    <p class="example"><em><span class="highlight">Because</span> the storm was approaching<span class="highlight">,</span> we decided to head home.</em></p>
                </div>
                <p class="pattern"><span class="highlight">Subordinator </span>Dependent<span class="highlight"> , </span>Independent</p>
                <div class="rule-insight">
                    <p><strong>When to use:</strong> When you want to emphasize the second part of your sentence.</p>
                    <p><strong>🎯 Key:</strong> That comma is REQUIRED—it signals the switch from incomplete to complete thought!</p>
                </div>
            </div>
        </div>

        <div class="rule-card rule-5">
            <div class="rule-number">5</div>
            <div class="rule-content">
                <h5>Independent → Dependent (No Comma)</h5>
                <p class="rule-description">Start with complete thought, then add dependent clause for extra info</p>
                <div class="rule-examples">
                    <p class="example"><em>Mary loves dogs <span class="highlight">while</span> Andrew loves cats.</em></p>
                    <p class="example"><em>We decided to head home <span class="highlight">because</span> the storm was approaching.</em></p>
                </div>
                <p class="pattern">Independent<span class="highlight"> subordinator </span>Dependent</p>
                <div class="rule-insight">
                    <p><strong>When to use:</strong> When the first part is your main point and the second part explains why/when/how.</p>
                    <p><strong>🚫 Key:</strong> NO comma needed—the flow goes naturally from complete to incomplete.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="rules-summary">
        <h4>🎯 Quick Decision Guide</h4>
        <div class="decision-flowchart">
            <p><strong>Step 1:</strong> Identify what's on the left and right of the "split"</p>
            <p><strong>Step 2:</strong> Apply the matching rule:</p>
            <ul>
                <li><strong>Independent + Independent?</strong> → Use Rule 1, 2, or 3</li>
                <li><strong>Dependent + Independent?</strong> → Use Rule 4 (with comma)</li>
                <li><strong>Independent + Dependent?</strong> → Use Rule 5 (no comma)</li>
            </ul>
        </div>
    </div>
</div>

<!-- QUIZ_2 -->

<div class="section error-section">
    <h3>The Dreaded Comma Splice</h3>
    <div class="error-explanation">
        <p class="key-rule">A comma by itself <strong>CANNOT</strong> join two independent clauses!</p>
        <p>This error is called a <strong>comma splice</strong> and is always wrong on the ACT.</p>
    </div>

    <div class="comma-splice-examples">
        <h5>Comma Splice Errors:</h5>
        <div class="error-example">
            <p>It is believed that bulls are enraged by the color red<span class="error-highlight">,</span> they are actually colorblind.</p>
        </div>
        <div class="error-example">
            <p>I cannot believe you did not get the flowers<span class="error-highlight">,</span> I left them at your front door.</p>
        </div>
    </div>

    <div class="correction-showcase">
        <h5>How to Fix Comma Splices (Using All 5 Rules):</h5>
        <div class="corrections">
            <p><strong>Rule 1:</strong> It is believed that bulls are enraged by the color red<span class="correction">.</span> They are actually colorblind.</p>
            <p><strong>Rule 2:</strong> It is believed that bulls are enraged by the color red<span class="correction">, but</span> they are actually colorblind.</p>
            <p><strong>Rule 3:</strong> It is believed that bulls are enraged by the color red<span class="correction">;</span> they are actually colorblind.</p>
            <p><strong>Rule 4:</strong> <span class="correction">While</span> it is believed that bulls are enraged by the color red<span class="correction">,</span> they are actually colorblind.</p>
            <p><strong>Rule 5:</strong> It is believed that bulls are enraged by the color red <span class="correction">though</span> they are actually colorblind.</p>
        </div>
    </div>
</div>

<!-- QUIZ_3 -->

<div class="section strategy-section">
    <h3>Your ACT Strategy</h3>

    <div class="strategy-grid">
        <div class="strategy-box">
            <h4>How to Spot These Questions</h4>
            <p>Look for these clues in answer choices:</p>
            <ul>
                <li><strong>Punctuation marks:</strong> periods, semicolons, commas, FANBOYS</li>
                <li><strong>Verb variations:</strong> "drove" vs. "driving"</li>
                <li><strong>Missing subjects/verbs:</strong> Some choices have them, others don't</li>
            </ul>
        </div>

        <div class="strategy-box">
            <h4>3-Step Approach</h4>
            <ol>
                <li><strong>Find the "split"</strong> - where is the sentence being divided?</li>
                <li><strong>Identify left and right</strong> - what type of clause/phrase is on each side?</li>
                <li><strong>Apply the rules</strong> - use the 5 golden rules to choose correctly</li>
            </ol>
        </div>
    </div>

    <div class="practice-showcase">
        <h4>Practice Example</h4>
        <div class="practice-question">
            <p class="question-text"><em>The roller coaster is opening next week, the wait time is expected to be over 4 hours long.</em></p>
            <p><strong>Which choice makes the sentence most grammatically acceptable?</strong></p>
            <div class="answer-choices">
                <div class="choice">A. NO CHANGE</div>
                <div class="choice">B. week; with the</div>
                <div class="choice">C. week and the</div>
                <div class="choice correct">D. week. The</div>
            </div>
            <div class="explanation">
                <p><strong>Answer: D</strong></p>
                <p><strong>Why:</strong> We have two independent clauses that need proper separation. Option A is a comma splice. Option D correctly uses a period (Rule #1).</p>
            </div>
        </div>
    </div>
</div>

<!-- QUIZ_4 -->

<div class="final-takeaway">
    <h3>🏆 Master This Chapter</h3>
    <p class="key-message">Perfect these five rules for combining clauses, and you'll dominate even the trickiest sentence structure questions. Remember: punctuation in answer choices = sentence structure question!</p>
    <div class="quick-reference">
        <p><strong>Quick Reference:</strong> Independent + Independent = Period, Comma+FANBOYS, or Semicolon</p>
        <p><strong>Quick Reference:</strong> Dependent + Independent = Comma between them</p>
        <p><strong>Quick Reference:</strong> Independent + Dependent = No comma between them</p>
    </div>
</div>
    `
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
    title: 'Chapter 3: Advanced Punctuation',
    duration: 15, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 3: Advanced Punctuation</h2>
    <p class="lesson-intro">Master semicolons, colons, dashes, apostrophes, and quotation marks to handle the trickiest punctuation questions on the ACT English test.</p>
</div>

<div class="section">
    <h3>Semicolons: The Super Comma</h3>
    <p>Semicolons have two main uses on the ACT:</p>

    <div class="concept-box">
        <h4>Rule 1: Joining Independent Clauses</h4>
        <p>Use a semicolon to connect two independent clauses without a conjunction.</p>
        <div class="examples">
            <p><strong>Correct:</strong> I love reading books; my sister prefers movies.</p>
            <p><strong>Incorrect:</strong> I love reading books, my sister prefers movies. <em>(comma splice)</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>Rule 2: Super Lists</h4>
        <p>Use semicolons to separate items in a list when the items already contain commas.</p>
        <div class="examples">
            <p><strong>Example:</strong> The conference included speakers from Portland, Oregon; Austin, Texas; and Miami, Florida.</p>
        </div>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Colons: The Introducer</h3>
    <p>Colons introduce what comes after them. The part before the colon must be an independent clause.</p>

    <div class="concept-box">
        <h4>What Colons Can Introduce:</h4>
        <ul>
            <li><strong>Lists:</strong> I need three things: milk, eggs, and bread.</li>
            <li><strong>Explanations:</strong> The reason is simple: hard work pays off.</li>
            <li><strong>Quotes:</strong> Shakespeare wrote: "To be or not to be."</li>
        </ul>
    </div>

    <div class="pro-tip">
        <p><strong>PRO TIP:</strong> Before the colon must be a complete sentence. Test by reading only the part before the colon—does it make sense alone?</p>
    </div>
</div>

<div class="section">
    <h3>Dashes: The Dramatic Pause</h3>
    <p>Dashes can replace commas, colons, or parentheses for emphasis.</p>

    <div class="concept-box">
        <h4>Common Uses:</h4>
        <ul>
            <li><strong>Sudden break:</strong> The weather was perfect—until it started raining.</li>
            <li><strong>Emphasis:</strong> She had one goal—to win the championship.</li>
            <li><strong>Interruption:</strong> The movie—despite poor reviews—was entertaining.</li>
        </ul>
    </div>
</div>

<!-- QUIZ_2 -->
    `
  },

  'verbs': {
    title: 'Chapter 4: Subject-Verb Agreement',
    duration: 20, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 4: Subject-Verb Agreement</h2>
    <p class="lesson-intro">Master subject-verb agreement, verb tense, and irregular verbs to tackle one of the most tested grammar concepts on the ACT English section.</p>
</div>

<div class="section">
    <h3>The Basic Rule</h3>
    <p>Subjects and verbs must agree in number: <strong>singular subjects take singular verbs, plural subjects take plural verbs.</strong></p>

    <div class="concept-box">
        <h4>Simple Examples:</h4>
        <ul>
            <li><strong>Correct:</strong> The cat <em>runs</em> quickly. (singular)</li>
            <li><strong>Correct:</strong> The cats <em>run</em> quickly. (plural)</li>
            <li><strong>Incorrect:</strong> The cat <em>run</em> quickly.</li>
            <li><strong>Incorrect:</strong> The cats <em>runs</em> quickly.</li>
        </ul>
    </div>
</div>

<div class="section">
    <h3>Tricky Situations on the ACT</h3>
    <p>The ACT makes subject-verb agreement harder by separating subjects and verbs with distracting phrases.</p>

    <div class="concept-box">
        <h4>Rule: Ignore Prepositional Phrases</h4>
        <p>The verb agrees with the subject, not with nouns in prepositional phrases.</p>
        <div class="examples">
            <p><strong>Example:</strong> The box <em>of chocolates</em> <strong>is</strong> on the table.</p>
            <p><em>Subject: box (singular) → verb: is (singular)</em></p>
            <p><em>"of chocolates" is a prepositional phrase and doesn't affect the verb</em></p>
        </div>
    </div>

    <div class="concept-box">
        <h4>Compound Subjects</h4>
        <p>When subjects are joined by "and," they're plural. When joined by "or/nor," the verb agrees with the closest subject.</p>
        <div class="examples">
            <p><strong>And = Plural:</strong> Sarah and Mike <em>are</em> coming.</p>
            <p><strong>Or = Closest:</strong> Either the teacher or the students <em>are</em> responsible.</p>
            <p><strong>Or = Closest:</strong> Either the students or the teacher <em>is</em> responsible.</p>
        </div>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Irregular Verb Forms</h3>
    <p>Some verbs have irregular past tenses and past participles that you must memorize.</p>

    <div class="concept-box">
        <h4>Most Common Irregular Verbs on the ACT:</h4>
        <div class="verb-table">
            <table>
                <tr><th>Present</th><th>Past</th><th>Past Participle</th></tr>
                <tr><td>begin</td><td>began</td><td>begun</td></tr>
                <tr><td>break</td><td>broke</td><td>broken</td></tr>
                <tr><td>choose</td><td>chose</td><td>chosen</td></tr>
                <tr><td>eat</td><td>ate</td><td>eaten</td></tr>
                <tr><td>go</td><td>went</td><td>gone</td></tr>
                <tr><td>see</td><td>saw</td><td>seen</td></tr>
                <tr><td>take</td><td>took</td><td>taken</td></tr>
                <tr><td>write</td><td>wrote</td><td>written</td></tr>
            </table>
        </div>
    </div>
</div>

<!-- QUIZ_2 -->
    `
  },

  'pronouns': {
    title: 'Chapter 5: Who vs Whom',
    duration: 22, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 5: Who vs Whom</h2>
    <p class="lesson-intro">Master pronoun case, who vs. whom, pronoun agreement, and ambiguous pronouns to handle the trickiest pronoun questions on the ACT.</p>
</div>

<div class="section">
    <h3>Who vs. Whom: The Simple Trick</h3>
    <p>This is one of the most feared grammar topics, but it's actually simple with the right approach.</p>

    <div class="concept-box">
        <h4>The "He/Him" Test</h4>
        <p>Replace the who/whom with "he" or "him." If "he" sounds right, use "who." If "him" sounds right, use "whom."</p>
        <div class="examples">
            <p><strong>Question:</strong> <em>Who/Whom</em> did you see?</p>
            <p><strong>Test:</strong> You saw <em>him</em>. (not "he")</p>
            <p><strong>Answer:</strong> <em>Whom</em> did you see?</p>
        </div>
        <div class="examples">
            <p><strong>Question:</strong> <em>Who/Whom</em> is coming to dinner?</p>
            <p><strong>Test:</strong> <em>He</em> is coming. (not "him")</p>
            <p><strong>Answer:</strong> <em>Who</em> is coming to dinner?</p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Pronoun Case</h3>
    <p>Pronouns change form based on whether they're subjects or objects.</p>

    <div class="concept-box">
        <h4>Subject vs. Object Pronouns</h4>
        <table>
            <tr><th>Subject</th><th>Object</th></tr>
            <tr><td>I</td><td>me</td></tr>
            <tr><td>you</td><td>you</td></tr>
            <tr><td>he</td><td>him</td></tr>
            <tr><td>she</td><td>her</td></tr>
            <tr><td>we</td><td>us</td></tr>
            <tr><td>they</td><td>them</td></tr>
        </table>
    </div>

    <div class="pro-tip">
        <p><strong>PRO TIP:</strong> With compound subjects/objects, remove the other person: "Jim and I" → "I went" (not "me went")</p>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Pronoun Agreement</h3>
    <p>Pronouns must agree with their antecedents in number and gender.</p>

    <div class="concept-box">
        <h4>Common Agreement Errors:</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> Each student must bring <em>their</em> book.</p>
            <p><strong>Right:</strong> Each student must bring <em>his or her</em> book.</p>
            <p><em>("Each" is singular, so the pronoun must be singular)</em></p>
        </div>
    </div>
</div>

<!-- QUIZ_2 -->
    `
  },

  'modifiers': {
    title: 'Chapter 6: Dangling Modifiers',
    duration: 18, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 6: Dangling Modifiers</h2>
    <p class="lesson-intro">Learn to identify and correct misplaced modifiers that create confusing or unintentionally funny sentences.</p>
</div>

<div class="section">
    <h3>What Are Modifiers?</h3>
    <p>Modifiers are words or phrases that describe other words. They must be placed next to what they modify.</p>

    <div class="concept-box">
        <h4>The Golden Rule</h4>
        <p><strong>Modifiers must be placed as close as possible to what they modify.</strong></p>
        <div class="examples">
            <p><strong>Wrong:</strong> Walking down the street, the trees looked beautiful.</p>
            <p><em>(This suggests the trees were walking!)</em></p>
            <p><strong>Right:</strong> Walking down the street, I noticed the trees looked beautiful.</p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Types of Modifier Errors</h3>

    <div class="concept-box">
        <h4>1. Dangling Modifiers</h4>
        <p>The modifier doesn't clearly refer to any word in the sentence.</p>
        <div class="examples">
            <p><strong>Wrong:</strong> Having finished homework, the TV was turned on.</p>
            <p><strong>Right:</strong> Having finished homework, Sarah turned on the TV.</p>
        </div>
    </div>

    <div class="concept-box">
        <h4>2. Misplaced Modifiers</h4>
        <p>The modifier is in the wrong position, creating confusion.</p>
        <div class="examples">
            <p><strong>Wrong:</strong> She almost drove her kids to school every day.</p>
            <p><em>(She "almost drove" or drove "almost every day"?)</em></p>
            <p><strong>Right:</strong> She drove her kids to school almost every day.</p>
        </div>
    </div>
</div>

<!-- QUIZ_1 -->
    `
  },

  'parallel-structure': {
    title: 'Chapter 7: Lists and Comparisons',
    duration: 16, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 7: Lists and Comparisons</h2>
    <p class="lesson-intro">Master parallel structure in lists and comparisons to create clear, balanced sentences that flow naturally.</p>
</div>

<div class="section">
    <h3>The Parallel Structure Rule</h3>
    <p>Items in a list or comparison must have the same grammatical structure.</p>

    <div class="concept-box">
        <h4>Basic Parallel Structure</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> I like swimming, running, and to bike.</p>
            <p><strong>Right:</strong> I like swimming, running, and biking.</p>
            <p><em>(All -ing words)</em></p>
        </div>
        <div class="examples">
            <p><strong>Wrong:</strong> She is smart, funny, and has talent.</p>
            <p><strong>Right:</strong> She is smart, funny, and talented.</p>
            <p><em>(All adjectives)</em></p>
        </div>
    </div>
</div>

<div class="section">
    <h3>Comparisons</h3>
    <p>When comparing two things, both sides of the comparison must be parallel.</p>

    <div class="concept-box">
        <h4>Comparison Structures</h4>
        <div class="examples">
            <p><strong>Wrong:</strong> Reading books is better than to watch TV.</p>
            <p><strong>Right:</strong> Reading books is better than watching TV.</p>
        </div>
        <div class="examples">
            <p><strong>Wrong:</strong> I prefer coffee to drinking tea.</p>
            <p><strong>Right:</strong> I prefer coffee to tea.</p>
            <p><strong>Also Right:</strong> I prefer drinking coffee to drinking tea.</p>
        </div>
    </div>
</div>

<!-- QUIZ_1 -->
    `
  },

  'misc-topics': {
    title: 'Chapter 8: Confused Words',
    duration: 20, // minutes
    content: `
<div class="lesson-header">
    <h2>Chapter 8: Confused Words</h2>
    <p class="lesson-intro">Learn commonly confused words, active vs. passive voice, and prepositional idioms that frequently appear on the ACT.</p>
</div>

<div class="section">
    <h3>Most Common Word Pairs</h3>

    <div class="concept-box">
        <h4>Their vs. There vs. They're</h4>
        <ul>
            <li><strong>Their</strong> = possession (Their car is red)</li>
            <li><strong>There</strong> = place (The book is there)</li>
            <li><strong>They're</strong> = they are (They're coming tonight)</li>
        </ul>
    </div>

    <div class="concept-box">
        <h4>Its vs. It's</h4>
        <ul>
            <li><strong>Its</strong> = possession (The dog wagged its tail)</li>
            <li><strong>It's</strong> = it is (It's raining outside)</li>
        </ul>
    </div>

    <div class="concept-box">
        <h4>Effect vs. Affect</h4>
        <ul>
            <li><strong>Effect</strong> = noun (The effect was dramatic)</li>
            <li><strong>Affect</strong> = verb (Rain will affect our plans)</li>
        </ul>
    </div>
</div>

<!-- QUIZ_1 -->

<div class="section">
    <h3>Active vs. Passive Voice</h3>
    <p>The ACT prefers active voice because it's more direct and clear.</p>

    <div class="concept-box">
        <h4>Voice Comparison</h4>
        <div class="examples">
            <p><strong>Passive:</strong> The ball was thrown by Sarah.</p>
            <p><strong>Active:</strong> Sarah threw the ball.</p>
            <p><em>(Active is better - more direct and concise)</em></p>
        </div>
    </div>
</div>

<!-- QUIZ_2 -->
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
  { id: 'sentence-structure', section: 'english', title: 'Chapter 1: Independent vs Dependent', desc: 'Independent clauses, dependent clauses, compound sentences, and comma splices', status: 'in-progress' },
  { id: 'commas', section: 'english', title: 'Chapter 2: Four Comma Types', desc: 'Unnecessary information, names rule, listing commas, and adjective lists', status: 'completed' },
  { id: 'punctuation', section: 'english', title: 'Chapter 3: Advanced Punctuation', desc: 'Semicolons, colons, dashes, apostrophes, and quotation marks', status: 'completed' },
  { id: 'verbs', section: 'english', title: 'Chapter 4: Subject-Verb Agreement', desc: 'Subject-verb agreement, verb tense, and irregular verbs', status: 'completed' },
  { id: 'pronouns', section: 'english', title: 'Chapter 5: Who vs Whom', desc: 'Pronoun case, who vs. whom, pronoun agreement, and ambiguous pronouns', status: 'in-progress' },
  { id: 'modifiers', section: 'english', title: 'Chapter 6: Dangling Modifiers', desc: 'Identifying and correcting misplaced modifiers in sentences', status: 'not-started' },
  { id: 'parallel-structure', section: 'english', title: 'Chapter 7: Lists and Comparisons', desc: 'Parallel structure in lists and comparisons', status: 'in-progress' },
  { id: 'misc-topics', section: 'english', title: 'Chapter 8: Confused Words', desc: 'Commonly confused words, active vs. passive voice, and prepositional idioms', status: 'in-progress' },
  { id: 'grammar-review', section: 'english', title: 'Grammar Review', desc: 'Comprehensive review of all grammar concepts', status: 'not-started' },
  { id: 'redundancy', section: 'english', title: 'Chapter 9: Eliminating Wordiness', desc: 'Identifying and eliminating redundant and wordy expressions', status: 'in-progress' },
  { id: 'word-choice', section: 'english', title: 'Chapter 10: Precise Language', desc: 'Selecting the clearest and most precise words in context', status: 'in-progress' },
  { id: 'transitions', section: 'english', title: 'Chapter 11: Logical Connections', desc: 'Choosing logical transitions between sentences and paragraphs', status: 'not-started' },
  { id: 'which-choice', section: 'english', title: 'Chapter 12: Best Choice', desc: 'Answering specific "which choice" questions about content', status: 'in-progress' },
  { id: 'adding-deleting', section: 'english', title: 'Chapter 13: Adding or Deleting', desc: 'Determining when to add or delete information from passages', status: 'not-started' },
  { id: 'logical-placement', section: 'english', title: 'Chapter 14: Sentence Order', desc: 'Placing sentences in the most logical order within paragraphs', status: 'in-progress' },

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