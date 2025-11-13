-- ================================================================
-- RESTORE ALL LESSON CONTENT FROM BACKUP
-- ================================================================
-- Backup date: 2025-10-21T19:02:45.951Z
-- Total lessons: 84
-- Total examples: 231
-- ================================================================


Common Mistakes to Avoid
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>Mixing up samples or trials</strong> — The most common error! If you''re tracking Sample 2 in Figure 1, make sure you track Sample 2 (not Sample 1 or 3) in Figure 2</li>
  <li style="margin-bottom: 0.75rem;"><strong>Stopping after the first figure</strong> — Students often find a value in Figure 1 and mistakenly choose it as the answer, forgetting to complete the chain to Figure 2</li>
  <li style="margin-bottom: 0.75rem;"><strong>Misreading axes</strong> — Using the wrong variable because you didn''t check which axis is which</li>
  <li style="margin-bottom: 0.75rem;"><strong>Ignoring units</strong> — Confusing similar measurements (e.g., velocity in m/s vs. km/h)</li>
  <li style="margin-bottom: 0.75rem;"><strong>Not reading experimental text when needed</strong> — Missing critical setup information that would clarify the relationship between figures</li>
</ul>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Pro Tips for Success
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>Write down intermediate values</strong> — Jot the value from Figure 1 in the margin before moving to Figure 2 to avoid losing track</li>
  <li style="margin-bottom: 0.75rem;"><strong>Use your finger or pencil to trace</strong> — Physically point to the sample/trial you''re tracking to avoid mixing them up</li>
  <li style="margin-bottom: 0.75rem;"><strong>Circle or underline key words</strong> — Mark which experiments, studies, samples, or trials the question asks about</li>
  <li style="margin-bottom: 0.75rem;"><strong>Check figure labels carefully</strong> — Verify you''re looking at the correct figure number before extracting data</li>
  <li style="margin-bottom: 0.75rem;"><strong>Map the connection between figures</strong> — Quickly identify which variable connects Figure 1 to Figure 2 (often the y-axis of Figure 1 becomes the x-axis of Figure 2)</li>
</ul>

<div style="background: linear-gradient(to right, #10b981, #059669); padding: 1.5rem; border-radius: 8px; margin: 3rem 0 2rem 0;">
  <h4 style="color: white; margin: 0 0 1rem 0; font-size: 18px; font-weight: 700;">Key Takeaways</h4>
  <ul style="color: white; margin: 0; padding-left: 1.5rem; font-size: 15px; line-height: 1.8;">
    <li style="margin-bottom: 0.75rem;"><strong>Identify multiple figures questions</strong> by looking for references to more than one figure, table, experiment, or study in the question stem</li>
    <li style="margin-bottom: 0.75rem;"><strong>Follow the chain strategy</strong>: find data in Figure 1 → use that value to search Figure 2 → extract your final answer from Figure 2</li>
    <li style="margin-bottom: 0.75rem;"><strong>Track samples/trials carefully</strong> — the most common mistake is mixing up which sample or trial you''re following across figures</li>
    <li style="margin-bottom: 0;"><strong>Use experimental text when needed</strong> — if the figures don''t contain the information you need, check the setup description above them</li>
  </ul>
</div>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('figures-text', 'science', 'Topic 2.5 - Figures + Text Questions', 'Topic 2.5 - Figures + Text Questions...', 'intermediate', 30, 7, '<!--
LESSON TEMPLATE v4.0
Subject: Science
Topic Number: 2.5
Topic: Figures + Text
Lesson Key: figures-text
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
On certain Science questions, the information shown in figures and tables alone is insufficient to answer the question, requiring you to consult the experimental text above the figures to find missing details about variables, experimental conditions, or setup parameters. These questions test your ability to integrate information from multiple sources—combining numerical data from figures with contextual information from the passage text to arrive at the correct answer.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. When Figures Alone Aren''t Enough
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Most Science questions can be answered using only the figures and tables, but some questions require additional context from the experimental text
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The question asks about units or values for a specific term that are not shown anywhere in the figures or tables</li>
      <li style="margin: 0.2rem 0;">The question references experimental conditions, setup details, or control variables not visible in the data displays</li>
      <li style="margin: 0.2rem 0;">You need definitions of abbreviations, variables, or scientific terms used in the question</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Recognize These Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The question asks about something not visible in any figure or table
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: "How many trials were run without electricity?" when electricity isn''t shown in any chart</li>
      <li style="margin: 0.2rem 0;">Example: "What was the initial temperature?" when figures only show final temperatures</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">The question uses terms or abbreviations you don''t recognize
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: A question mentions "RM" but you don''t know what RM stands for</li>
      <li style="margin: 0.2rem 0;">The experimental text will define these terms in the introduction or setup description</li>
    </ul>
  </li>
</ul>

<!-- Example 1 will be inserted here by ExampleCard component -->
<!-- Database: position=1, lesson_id=[UUID], title="Finding Missing Information in Experimental Text" -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Where to Look in the Experimental Text
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The experimental text typically appears directly above the figures and tables, organized into clear sections
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Introductory section</strong> — Defines terms, explains the general topic, describes what the experiment is studying</li>
      <li style="margin: 0.2rem 0;"><strong>Experiment/Study descriptions</strong> — Details the specific procedures, lists control variables, explains what changed between trials</li>
      <li style="margin: 0.2rem 0;"><strong>Figure captions</strong> — Sometimes crucial information appears in small text directly below or above figures</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Strategic Reading Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Don''t read the experimental text during your initial 30-second preview
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Most questions won''t need it, so reading it upfront wastes time</li>
      <li style="margin: 0.2rem 0;">Only go to the text when a question specifically requires information not in the figures</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When you do need the text, scan strategically
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look for bold terms, capitalized abbreviations, or numbered experiments that match the question</li>
      <li style="margin: 0.2rem 0;">Read only the relevant section—you don''t need to read the entire passage</li>
      <li style="margin: 0.2rem 0;">Once you find the information, return immediately to the question</li>
    </ul>
  </li>
</ul>

<!-- Example 2 will be inserted here by ExampleCard component -->
<!-- Database: position=2, lesson_id=[UUID], title="Combining Text and Figures to Answer Questions" -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Common Scenarios Requiring Text
</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Scenario 1: Control Variables
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Question asks: "In which trials was [variable X] held constant?"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Variable X doesn''t appear in any figure or table</li>
      <li style="margin: 0.2rem 0;">Solution: Check the experimental text describing each experiment''s conditions</li>
      <li style="margin: 0.2rem 0;">The text will explicitly state which variables were controlled</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Scenario 2: Initial Conditions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Question asks about starting values or initial setup
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Figures only show final measurements or changes over time</li>
      <li style="margin: 0.2rem 0;">Solution: The experimental description states initial conditions before measurements began</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Scenario 3: Term Definitions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Question uses abbreviations or specialized terms
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: "RM," "reactive material," "compound X"</li>
      <li style="margin: 0.2rem 0;">Solution: Introductory paragraph defines all key terms and abbreviations</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Pro Tips and Common Mistakes
</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Pro Tips
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Check figures first, always</strong> — Even on "text required" questions, start by checking if the answer might actually be in a figure you missed</li>
  <li style="margin: 0.3rem 0;"><strong>Use keywords to locate information</strong> — If the question asks about "electricity," scan the text for that exact word</li>
  <li style="margin: 0.3rem 0;"><strong>Don''t read more than necessary</strong> — Extract only the specific fact you need, then return to the question</li>
  <li style="margin: 0.3rem 0;"><strong>Mark helpful text</strong> — If a passage requires multiple text lookups, underline or circle key facts for quicker reference</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Common Mistakes
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Reading all the text upfront</strong> — This wastes precious time since most questions don''t need it</li>
  <li style="margin: 0.3rem 0;"><strong>Assuming information must be in a figure</strong> — If you can''t find it after checking all figures, go to the text instead of guessing</li>
  <li style="margin: 0.3rem 0;"><strong>Reading the wrong experiment''s description</strong> — Make sure you''re reading about Experiment 1 if the question asks about Experiment 1</li>
  <li style="margin: 0.3rem 0;"><strong>Getting lost in unnecessary details</strong> — Stay focused on finding the one specific piece of information the question needs</li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Don''t read experimental text during your initial passage preview—only consult it when a question asks about information not visible in any figure or table, such as control variables, initial conditions, or term definitions.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>When you need the text, scan strategically for keywords rather than reading everything—look for bold terms, capitalized abbreviations, or experiment numbers that match what the question is asking about.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always check figures and tables first before going to the text—even on questions that seem to require text, the answer might be in a figure you overlooked, and you''ll waste time reading if you jump to text too quickly.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Extract only the specific fact you need from the text, then immediately return to the question—getting sidetracked by interesting but irrelevant details in the passage wastes valuable time and won''t help you answer the question correctly.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('two-part-answers', 'science', 'Topic 3.1 - 2-Part Answers', 'Topic 3.1 - 2-Part Answers...', 'intermediate', 30, 8, '<!-- Science Lesson 3.1: Two-Part Answers -->
<!-- ACT Science - Unit 3: Special Question Types -->
<!-- Lesson Key: two-part-answers -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Two-part answer questions present claims paired with explanations, requiring you to evaluate both components independently. The key strategy is to start with the explanation (second part) first, as it''s typically easier to validate using figures or scientific knowledge, then work backward to evaluate the claim.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
How to Identify Two-Part Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Two-part questions have answer choices formatted as "<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">claim, because explanation</strong>"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: "Yes, because the boiling point of water is above 100°C"</li>
      <li style="margin: 0.2rem 0;">Example: "No, acetone has the lowest percent combustibility at 40°C"</li>
      <li style="margin: 0.2rem 0;">The claim is the first part (Yes/No or which option)</li>
      <li style="margin: 0.2rem 0;">The explanation follows "because" or "as" or similar connecting words</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Most two-part questions follow a <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">standard pattern</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Answers A and B share the same claim</li>
      <li style="margin: 0.2rem 0;">Answers C and D share the same claim (opposite of A/B)</li>
      <li style="margin: 0.2rem 0;">Answers A and C share the same explanation</li>
      <li style="margin: 0.2rem 0;">Answers B and D share the same explanation (different from A/C)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Always read carefully - some questions don''t follow the standard pattern</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Strategy: Start with the Explanation
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Begin by evaluating the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">explanation</strong> (the part after "because"):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Explanations are usually based on figures, tables, or basic scientific facts</li>
      <li style="margin: 0.2rem 0;">They''re much easier to verify than claims</li>
      <li style="margin: 0.2rem 0;">You can quickly eliminate 2 incorrect answers by finding the wrong explanation</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">How to check explanations:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look at the figure or table referenced</li>
      <li style="margin: 0.2rem 0;">Verify specific numerical values or trends</li>
      <li style="margin: 0.2rem 0;">Use basic scientific knowledge (boiling point of water = 100°C, etc.)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Once you''ve eliminated 2 answers with wrong explanations, evaluate the claim between the remaining 2 answers</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Common Patterns and Shortcuts
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Using the standard pattern to your advantage:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you determine the explanation is correct, eliminate answers with the opposite explanation</li>
      <li style="margin: 0.2rem 0;">If you can''t determine the claim, picking the right explanation gives you a 50/50 chance</li>
      <li style="margin: 0.2rem 0;">This reduces guessing from 4 options to 2 options</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Be careful with <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">contradiction traps</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Some wrong answers pair a correct claim with an incorrect explanation</li>
      <li style="margin: 0.2rem 0;">Or pair an incorrect claim with a correct explanation</li>
      <li style="margin: 0.2rem 0;">Both parts must be correct for the answer to be correct</li>
    </ul>
  </li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always start by evaluating the explanation (second part) first, as it''s easier to verify
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use the standard pattern (A/B same claim, C/D same claim; A/C same explanation, B/D same explanation) to eliminate quickly
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Verify explanations using figures, tables, or basic scientific knowledge before evaluating claims
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Both the claim and explanation must be correct - don''t fall for answers with one correct part and one incorrect part
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('cannot-be-determined', 'science', 'Topic 3.2 - Cannot Be Determined', 'Topic 3.2 - Cannot Be Determined...', 'intermediate', 30, 9, '<!-- Science Lesson 3.2: Cannot Be Determined -->
<!-- ACT Science - Unit 3: Special Question Types -->
<!-- Lesson Key: cannot-be-determined -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Questions with "cannot be determined" as an answer choice test whether you can identify when the provided data is insufficient to answer the question. The key is to systematically search for the required information in figures, tables, and experimental text before concluding that it cannot be determined.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
When to Choose "Cannot Be Determined"
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Choose "<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">cannot be determined</strong>" when the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">locators</strong> from the question cannot be found in the data:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The figure doesn''t show the specific variable you need</li>
      <li style="margin: 0.2rem 0;">The table doesn''t include the row or column required</li>
      <li style="margin: 0.2rem 0;">The experimental text doesn''t provide the necessary information</li>
      <li style="margin: 0.2rem 0;">The data shows aggregated totals but the question asks for individual values</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Do NOT treat these questions differently - use the same systematic approach:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Start by checking figures and tables</li>
      <li style="margin: 0.2rem 0;">Then check experimental text above the figures</li>
      <li style="margin: 0.2rem 0;">Only after exhausting all sources should you choose "cannot be determined"</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Common Traps: Units and Aggregated Data
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Unit mismatches</strong> are a common trick in difficult questions:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Question asks for grams per week, but figure shows total weight gain</li>
      <li style="margin: 0.2rem 0;">Question asks for individual dog consumption, but figure shows group totals</li>
      <li style="margin: 0.2rem 0;">Question asks for percentage of one food type, but only total percentages are given</li>
      <li style="margin: 0.2rem 0;">Pay close attention to what units the question asks for vs. what units are provided</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Aggregated vs. individual data</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If the figure shows total for a group, you cannot determine individual values</li>
      <li style="margin: 0.2rem 0;">Example: Figure shows total food remaining for 5 dogs → cannot determine for 1 dog</li>
      <li style="margin: 0.2rem 0;">Example: Table shows weight gain → cannot determine starting weight without baseline</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Systematic Search Strategy
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Step 1: Identify exactly what the question is asking for:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">What variable? (weight, food amount, percentage, etc.)</li>
      <li style="margin: 0.2rem 0;">What units? (grams, grams per week, percentage, etc.)</li>
      <li style="margin: 0.2rem 0;">For which subject? (individual, group, specific food type, etc.)</li>
      <li style="margin: 0.2rem 0;">At what time/condition? (after 3 hours, at Week 4, etc.)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 2: Check the figure referenced:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look at axis labels - do they match what you need?</li>
      <li style="margin: 0.2rem 0;">Check the legend - does it show the specific group/food type?</li>
      <li style="margin: 0.2rem 0;">Verify the units match what the question asks for</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 3: Check tables (if present):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Do the rows/columns include the specific item you need?</li>
      <li style="margin: 0.2rem 0;">Can you combine information from multiple tables/figures?</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 4: Check experimental text:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sometimes the answer is in the description above the figures</li>
      <li style="margin: 0.2rem 0;">Look for setup details, control variables, or baseline measurements</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 5: Only if you cannot find the information anywhere:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Choose "Cannot be determined"</li>
      <li style="margin: 0.2rem 0;">Be confident - if the data truly isn''t there, this is the correct answer</li>
    </ul>
  </li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Systematically search figures, tables, and experimental text before choosing "cannot be determined"
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Pay close attention to units - mismatched units are a common trap (grams vs. grams per week)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Distinguish between aggregated group data and individual data - you cannot determine individual values from totals
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>If the required locators (specific variables, conditions, or subjects) are truly absent, confidently choose "cannot be determined"
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('equations-as-answers', 'science', 'Topic 3.3 - Equations as Answers', 'Topic 3.3 - Equations as Answers...', 'intermediate', 30, 10, '<!-- Science Lesson 3.3: Equations as Answers -->
<!-- ACT Science - Unit 3: Special Question Types -->
<!-- Lesson Key: equations-as-answers -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Questions with equations as answer choices require you to identify the correct mathematical relationship between variables based on data patterns in figures or tables. The key is to test each equation systematically using specific data points from the provided information.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
How to Identify Equation Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">All four answer choices are <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">mathematical equations or formulas</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: y = 2x + 3</li>
      <li style="margin: 0.2rem 0;">Example: T = 100 - 5h</li>
      <li style="margin: 0.2rem 0;">Example: P = 760/d</li>
      <li style="margin: 0.2rem 0;">The variables in the equations correspond to axes or columns in the data</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">The question typically asks: "Which equation best represents the relationship between..."
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">May ask about relationship between two variables</li>
      <li style="margin: 0.2rem 0;">May ask which equation matches the data pattern</li>
      <li style="margin: 0.2rem 0;">Sometimes asks for an equation to predict values</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Strategy: Pick Easy Numbers to Test
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Step 1: Identify the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">variables</strong> in the equations and match them to the data:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Figure out which variable is which (x-axis, y-axis, table columns)</li>
      <li style="margin: 0.2rem 0;">Make sure you understand what each variable represents</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 2: Choose the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">easiest data point</strong> to test:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look for simple numbers (0, 1, 10, 100) that make calculations easy</li>
      <li style="margin: 0.2rem 0;">Avoid decimals or complex numbers if possible</li>
      <li style="margin: 0.2rem 0;">Using x=0 or y=0 often simplifies equations dramatically</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 3: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Plug the data point</strong> into each equation:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Substitute the values from your chosen data point</li>
      <li style="margin: 0.2rem 0;">Calculate what the equation predicts</li>
      <li style="margin: 0.2rem 0;">Eliminate equations that don''t match the actual data</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 4: If multiple equations remain, test a <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">second data point</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Repeat the process with another easy data point</li>
      <li style="margin: 0.2rem 0;">Continue until only one equation remains</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Common Equation Patterns to Recognize
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Linear relationships</strong> (y = mx + b):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Data points form a straight line</li>
      <li style="margin: 0.2rem 0;">Constant rate of change</li>
      <li style="margin: 0.2rem 0;">Example: Temperature decreases by 5°C for each 1km increase in altitude</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Inverse relationships</strong> (y = k/x):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">As one variable increases, the other decreases</li>
      <li style="margin: 0.2rem 0;">Product of x and y is constant</li>
      <li style="margin: 0.2rem 0;">Example: Pressure decreases as volume increases (P = k/V)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Direct proportions</strong> (y = kx):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Linear relationship passing through origin (0,0)</li>
      <li style="margin: 0.2rem 0;">Ratio of y to x is constant</li>
      <li style="margin: 0.2rem 0;">Example: Distance = speed × time (when starting at 0)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">You don''t need to derive equations - just <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">test the given options</strong> against the data</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Tips for Quick Elimination
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Check the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">direction of relationship</strong> first:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If data shows y increasing as x increases, eliminate equations with negative slopes</li>
      <li style="margin: 0.2rem 0;">If data shows y decreasing as x increases, eliminate equations with positive slopes</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Use <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">special values</strong> strategically:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">When x=0, equations simplify to y = b (the y-intercept)</li>
      <li style="margin: 0.2rem 0;">When y=0, you can solve for x-intercept</li>
      <li style="margin: 0.2rem 0;">When x=1, equations simplify nicely (y = m + b)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Don''t waste time doing complex algebra - systematically test one data point at a time until you eliminate all wrong answers</li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Test equations by plugging in actual data points - don''t try to derive them from scratch
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Choose the easiest data points first (values of 0, 1, 10, or 100 make calculations simple)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Eliminate equations systematically - one data point often eliminates 2-3 wrong answers
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Check the direction of the relationship first to quickly eliminate impossible equations
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('mixing', 'science', 'Topic 3.4 - Mixing', 'Topic 3.4 - Mixing...', 'intermediate', 30, 11, '<!-- Science Lesson 3.4: Mixing -->
<!-- ACT Science - Unit 3: Special Question Types -->
<!-- Lesson Key: mixing -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Mixing questions require you to combine information from multiple figures, tables, or experiments to answer a single question. The key is to systematically identify what information each source provides and how they connect together.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
How to Identify Mixing Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The question asks you to use <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">multiple sources of information</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Mentions two or more figures (e.g., "Based on Figures 1 and 2...")</li>
      <li style="margin: 0.2rem 0;">Asks about data from different experiments or trials</li>
      <li style="margin: 0.2rem 0;">Requires combining a table with descriptive text</li>
      <li style="margin: 0.2rem 0;">Needs you to link data across different parts of the passage</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">One source provides <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">partial information</strong> that must be completed with another source:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Figure 1 shows temperature, Figure 2 shows pressure at each temperature</li>
      <li style="margin: 0.2rem 0;">Table 1 lists compound names, Table 2 shows properties by ID number</li>
      <li style="margin: 0.2rem 0;">Graph shows results, but you need text to understand experimental conditions</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Strategy: The Bridge Method
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Step 1: Identify the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">target</strong> - what is the question asking for?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">What final value or comparison do you need?</li>
      <li style="margin: 0.2rem 0;">Circle or note the specific question being asked</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 2: Identify the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">starting point</strong> - what information are you given?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">What specific value or condition is provided in the question?</li>
      <li style="margin: 0.2rem 0;">Where can you find this in the passage?</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 3: Find the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">bridge</strong> - what connects them?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look for a common variable that appears in both sources</li>
      <li style="margin: 0.2rem 0;">This is your "bridge" to transfer information between sources</li>
      <li style="margin: 0.2rem 0;">Example: Temperature appears in both Figure 1 and Figure 2</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 4: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Cross the bridge</strong> - follow the connection:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Start with the given information in source 1</li>
      <li style="margin: 0.2rem 0;">Use the bridge variable to move to source 2</li>
      <li style="margin: 0.2rem 0;">Find your target answer in source 2</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Common Mixing Patterns
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Two-step lookup</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Question gives you value A</li>
      <li style="margin: 0.2rem 0;">Figure 1 converts A → B</li>
      <li style="margin: 0.2rem 0;">Figure 2 converts B → C (your answer)</li>
      <li style="margin: 0.2rem 0;">Example: Time → Temperature (Fig 1) → Pressure (Fig 2)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Condition matching</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Text describes which trial had certain conditions</li>
      <li style="margin: 0.2rem 0;">Table shows results for each trial</li>
      <li style="margin: 0.2rem 0;">You must match the condition to the trial to find the result</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Cross-referencing</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Table 1 uses names (e.g., "Compound X")</li>
      <li style="margin: 0.2rem 0;">Table 2 uses codes (e.g., "Compound 1")</li>
      <li style="margin: 0.2rem 0;">You need to link them using a key or legend</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Tips for Complex Mixing Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Write it down</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">For multi-step problems, jot down intermediate values</li>
      <li style="margin: 0.2rem 0;">Example: "Time 2 → Temp 40°C → Pressure ?"</li>
      <li style="margin: 0.2rem 0;">This prevents errors when switching between sources</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Check your units</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Make sure the bridge variable has matching units</li>
      <li style="margin: 0.2rem 0;">If Figure 1 shows temperature in °C, Figure 2 must also use °C</li>
      <li style="margin: 0.2rem 0;">Watch for conversions (grams to kilograms, etc.)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Don''t skip intermediate steps - work methodically through each source in order</li>
  <li style="margin: 0.3rem 0;">If you get lost, restart from the beginning and identify the bridge variable again</li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use the Bridge Method: identify what you''re given, what you need, and what variable connects them
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Work step-by-step through each source - don''t try to skip ahead or you''ll make errors
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Write down intermediate values when crossing between multiple figures to avoid confusion
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always verify that the bridge variable has matching units across all sources
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('scatter-plots', 'science', 'Topic 2.6 - Scatter Plots', 'Topic 2.6 - Scatter Plots...', 'intermediate', 30, 12, '<!-- Science Lesson 2.6: Scatter Plots -->
<!-- ACT Science - Unit 2: Data Representation -->
<!-- Lesson Key: scatter-plots -->

<p style="font-size: 17px; line-height: 1.8; margin-bottom: 1rem;">
Scatter plots show relationships between two variables by plotting individual data points. Understanding how to read scatter plots and count data points is essential for ACT Science success.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
What Is a Scatter Plot?
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">A <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">scatter plot</strong> displays individual data points on a graph, with each point representing one measurement or trial
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">x-axis</strong> typically shows the independent variable (what scientists change)</li>
      <li style="margin: 0.2rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">y-axis</strong> shows the dependent variable (what scientists measure)</li>
      <li style="margin: 0.2rem 0;">Each point represents one trial or observation</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Unlike line graphs that connect all points, scatter plots show individual data points that may or may not form a clear pattern
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Some scatter plots show tight clustering (<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">strong relationship</strong>)</li>
      <li style="margin: 0.2rem 0;">Others show loose patterns (<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">weak relationship</strong>)</li>
      <li style="margin: 0.2rem 0;">Points may follow <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">positive</strong>, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">negative</strong>, or <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">no correlation</strong></li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Scatter plots are commonly used when:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Testing for correlations between variables</li>
      <li style="margin: 0.2rem 0;">Showing multiple trials at the same conditions</li>
      <li style="margin: 0.2rem 0;">Displaying variation or spread in data</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
How to Read Scatter Plots
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Start by identifying what each axis represents:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look at axis labels and units</li>
      <li style="margin: 0.2rem 0;">Note the scale (linear, logarithmic, etc.)</li>
      <li style="margin: 0.2rem 0;">Check the range of values shown</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">To find the value of a specific point:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Draw an imaginary vertical line down to the x-axis</li>
      <li style="margin: 0.2rem 0;">Draw an imaginary horizontal line to the y-axis</li>
      <li style="margin: 0.2rem 0;">Read the values where these lines intersect the axes</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Look for overall patterns:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Positive correlation</strong>: points rise from left to right</li>
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Negative correlation</strong>: points fall from left to right</li>
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">No correlation</strong>: points scattered randomly</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Note any <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">outliers</strong> (points far from the general pattern)</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Counting Data Points on Scatter Plots
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Questions often ask: "How many trials were conducted at [specific condition]?"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Find the x-value that matches the condition</li>
      <li style="margin: 0.2rem 0;">Draw an imaginary vertical line at that x-value</li>
      <li style="margin: 0.2rem 0;">Count every point that touches that vertical line</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When counting points:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Be systematic - count from top to bottom or bottom to top</li>
      <li style="margin: 0.2rem 0;">Watch for overlapping points (multiple trials at same x and y)</li>
      <li style="margin: 0.2rem 0;">Don''t count points at neighboring x-values</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common mistakes to avoid:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Counting all points on the graph instead of just at the specified x-value</li>
      <li style="margin: 0.2rem 0;">Missing overlapping points that appear as one dot</li>
      <li style="margin: 0.2rem 0;">Including points from adjacent x-values</li>
    </ul>
  </li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Each point on a scatter plot represents one trial or observation at specific x and y values
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>To count trials at a specific condition, find the x-value and count all points at that vertical line
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Watch for overlapping points that may appear as single dots but represent multiple trials
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Scatter plots show relationships and variation - look for overall patterns while understanding individual data points
  </li>
</ul>')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('inverse-trends-multiple-axes', 'science', 'Topic 2.7 - Inverse Trends and Graphs with Multiple Axes', 'Topic 2.7 - Inverse Trends and Graphs with Multiple Axes...', 'intermediate', 30, 13, '<!-- Science Lesson 2.7: Inverse Trends and Multiple Axes -->
<!-- ACT Science - Unit 2: Data Representation -->
<!-- Lesson Key: inverse-trends-multiple-axes -->

<p style="font-size: 17px; line-height: 1.8; margin-bottom: 1rem;">
Inverse relationships occur when one variable increases as another decreases, and many ACT Science figures display multiple y-axes to show different measurements simultaneously. Understanding these concepts is critical for interpreting complex experimental data.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
What Is an Inverse Relationship?
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">An <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">inverse (or negative) relationship</strong> means that as one variable increases, the other variable decreases
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: As altitude increases, air pressure decreases</li>
      <li style="margin: 0.2rem 0;">Example: As temperature increases, solubility of some gases decreases</li>
      <li style="margin: 0.2rem 0;">On a graph, inverse relationships show <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">downward-sloping</strong> lines or curves</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Inverse relationships are different from direct (positive) relationships:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Direct</strong>: both variables increase together (upward slope)</li>
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Inverse</strong>: one increases while the other decreases (downward slope)</li>
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">No relationship</strong>: variables are independent (flat or random pattern)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common inverse relationships in science:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Pressure vs. volume (Boyle''s Law)</li>
      <li style="margin: 0.2rem 0;">Speed vs. time remaining</li>
      <li style="margin: 0.2rem 0;">Predator population vs. prey population (with time lag)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Understanding Figures with Multiple Y-Axes
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Many ACT Science figures show <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">two different y-axes</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Left y-axis</strong>: typically shows one measurement with its own scale</li>
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Right y-axis</strong>: shows a different measurement with a different scale</li>
      <li style="margin: 0.2rem 0;">Both measurements share the same <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">x-axis</strong></li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Why use multiple y-axes?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">To compare two variables that have different units (e.g., temperature in °C and pressure in kPa)</li>
      <li style="margin: 0.2rem 0;">To show variables with very different ranges (e.g., 0-100 vs. 0-5)</li>
      <li style="margin: 0.2rem 0;">To visualize how two different measurements change together</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">How to read figures with multiple y-axes:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Identify which line/curve corresponds to which y-axis (check the legend or labels)</li>
      <li style="margin: 0.2rem 0;">When reading a value, trace horizontally to the CORRECT y-axis for that variable</li>
      <li style="margin: 0.2rem 0;">Never mix up the axes - using the wrong axis gives a completely wrong answer</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Identifying Which Axis to Use
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Critical strategy: Match the variable name to the axis label
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If the question asks about "temperature," look for the y-axis labeled "Temperature (°C)"</li>
      <li style="margin: 0.2rem 0;">If the question asks about "pressure," look for the y-axis labeled "Pressure (kPa)"</li>
      <li style="margin: 0.2rem 0;">Check units carefully - they tell you which axis to use</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Visual cues that help identify the correct axis:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Lines/curves are often color-coded to match their corresponding y-axis</li>
      <li style="margin: 0.2rem 0;">Legends typically specify which line uses which axis</li>
      <li style="margin: 0.2rem 0;">Axis labels include units that match the variable in the question</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common mistake to avoid:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Reading from the left axis when you should use the right axis (or vice versa)</li>
      <li style="margin: 0.2rem 0;">This is one of the most common errors on ACT Science</li>
      <li style="margin: 0.2rem 0;">Always double-check: Does the axis label match what the question is asking?</li>
    </ul>
  </li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Inverse relationships show one variable increasing while another decreases (downward-sloping pattern)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Figures with multiple y-axes display two different measurements with different scales on the left and right sides
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always match the variable in the question to the correct y-axis label and units before reading values
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Using the wrong y-axis is a common mistake - check axis labels, units, and legend carefully
  </li>
</ul>')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('math-on-science', 'science', 'Topic 3.5 - Math on the Science Test', 'Topic 3.5 - Math on the Science Test...', 'intermediate', 30, 14, '<!-- Science Lesson 3.5: Math on Science -->
<!-- ACT Science - Unit 3: Special Question Types -->
<!-- Lesson Key: math-on-science -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Math on Science questions require you to perform simple calculations using data from figures or tables. The key is to identify exactly what operation is needed (addition, subtraction, multiplication, division, or finding averages) and use the correct values from the data.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Common Math Operations
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Finding differences</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"How much did X increase/decrease from A to B?"</li>
      <li style="margin: 0.2rem 0;">Subtract the smaller from the larger value</li>
      <li style="margin: 0.2rem 0;">Example: Temperature went from 20°C to 80°C → Increase = 80 - 20 = 60°C</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Finding totals</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"What is the total of X and Y?"</li>
      <li style="margin: 0.2rem 0;">Add the values together</li>
      <li style="margin: 0.2rem 0;">Example: Trial 1 = 25g, Trial 2 = 30g → Total = 25 + 30 = 55g</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Finding averages</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"What is the average (or mean) of these values?"</li>
      <li style="margin: 0.2rem 0;">Add all values and divide by how many there are</li>
      <li style="margin: 0.2rem 0;">Example: Values are 10, 20, 30 → Average = (10 + 20 + 30) ÷ 3 = 20</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Finding ratios</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"How many times greater/smaller is X compared to Y?"</li>
      <li style="margin: 0.2rem 0;">Divide the larger by the smaller</li>
      <li style="margin: 0.2rem 0;">Example: A = 100, B = 20 → A is 100 ÷ 20 = 5 times greater</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Strategy: Read Carefully for Units and Operations
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Step 1: Identify <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">exactly what the question is asking</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look for key words: "increase," "decrease," "total," "average," "difference"</li>
      <li style="margin: 0.2rem 0;">Determine what operation you need to perform</li>
      <li style="margin: 0.2rem 0;">Note the units in the question</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 2: Locate the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">correct values</strong> in the data:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Find the specific rows, columns, or data points needed</li>
      <li style="margin: 0.2rem 0;">Double-check you''re reading from the correct axis or column</li>
      <li style="margin: 0.2rem 0;">Verify the units match what the question asks for</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 3: Perform the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">calculation</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Do the math carefully - these are usually simple calculations</li>
      <li style="margin: 0.2rem 0;">Watch for negative signs and decimals</li>
      <li style="margin: 0.2rem 0;">Round only if the question asks for it</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 4: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Check your answer</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Does the magnitude make sense? (e.g., average should be between min and max)</li>
      <li style="margin: 0.2rem 0;">Are the units correct?</li>
      <li style="margin: 0.2rem 0;">Did you answer the exact question asked?</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Watch Out for These Traps
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Unit conversion traps</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Figure shows grams, question asks for kilograms</li>
      <li style="margin: 0.2rem 0;">Figure shows minutes, question asks for hours</li>
      <li style="margin: 0.2rem 0;">Always check if you need to convert units before calculating</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Rate vs. total amount</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Question asks for "per hour" but figure shows total</li>
      <li style="margin: 0.2rem 0;">Must divide total by time to get rate</li>
      <li style="margin: 0.2rem 0;">Example: 120 miles in 3 hours → Rate = 120 ÷ 3 = 40 miles per hour</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Increase vs. final value</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"What was the increase?" → Find the difference (subtract)</li>
      <li style="margin: 0.2rem 0;">"What was the final value?" → Just read the final value (don''t subtract)</li>
      <li style="margin: 0.2rem 0;">Make sure you understand which one the question is asking for</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Reading the wrong row/column</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Tables can be confusing - double-check your values</li>
      <li style="margin: 0.2rem 0;">Use your finger to trace from row header to column</li>
      <li style="margin: 0.2rem 0;">This simple mistake accounts for many wrong answers</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Quick Tips for Accuracy
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Write down the values you''re using before calculating - this prevents reading errors</li>
  <li style="margin: 0.3rem 0;">For averages, double-check how many values you''re averaging</li>
  <li style="margin: 0.3rem 0;">If an answer choice is way bigger or smaller than the others, check your decimal point</li>
  <li style="margin: 0.3rem 0;">Use <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">estimation</strong> to eliminate obviously wrong answers quickly</li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Read the question carefully to identify the exact operation needed (difference, total, average, ratio)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always verify that units in your answer match what the question asks for
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Distinguish between rate (per unit time) and total amount - they require different calculations
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Write down values before calculating to avoid reading the wrong row or column from tables
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('water-knowledge', 'science', 'Topic 4.1 - Water Knowledge', 'Topic 4.1 - Water Knowledge...', 'intermediate', 30, 15, '<!-- Science Lesson 4.1: Water Knowledge -->
<!-- ACT Science - Unit 4: Outside Knowledge -->
<!-- Lesson Key: water-knowledge -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
The ACT Science test assumes you know basic facts about water''s physical and chemical properties. These questions test whether you can apply fundamental water knowledge to interpret experiments and data, without requiring you to memorize complex chemistry.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Essential Water Facts You Must Know
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Freezing point</strong>: Water freezes at 0°C (32°F)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Below 0°C, water is solid (ice)</li>
      <li style="margin: 0.2rem 0;">At 0°C, water can be liquid or solid (transition point)</li>
      <li style="margin: 0.2rem 0;">Above 0°C, water is liquid</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Boiling point</strong>: Water boils at 100°C (212°F) at sea level
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Below 100°C, water is liquid</li>
      <li style="margin: 0.2rem 0;">At 100°C, water can be liquid or gas (transition point)</li>
      <li style="margin: 0.2rem 0;">Above 100°C, water is gas (water vapor/steam)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Density</strong>: Water has maximum density at 4°C
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Ice is less dense than liquid water (that''s why ice floats)</li>
      <li style="margin: 0.2rem 0;">Water density ≈ 1 g/cm³ or 1 g/mL</li>
      <li style="margin: 0.2rem 0;">Oil is less dense than water (floats on top)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Chemical formula</strong>: H₂O (2 hydrogen atoms, 1 oxygen atom)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Water is a compound, not an element</li>
      <li style="margin: 0.2rem 0;">Made by combining hydrogen and oxygen</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
States of Matter for Water
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Solid (ice)</strong>: Below 0°C
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Fixed shape and volume</li>
      <li style="margin: 0.2rem 0;">Molecules are tightly packed and vibrate in place</li>
      <li style="margin: 0.2rem 0;">Less dense than liquid water (expands when freezing)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Liquid</strong>: Between 0°C and 100°C
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Takes shape of container, fixed volume</li>
      <li style="margin: 0.2rem 0;">Molecules can move and slide past each other</li>
      <li style="margin: 0.2rem 0;">Most common state at room temperature (~20-25°C)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Gas (water vapor/steam)</strong>: Above 100°C
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">No fixed shape or volume, expands to fill container</li>
      <li style="margin: 0.2rem 0;">Molecules move freely and rapidly</li>
      <li style="margin: 0.2rem 0;">Much less dense than liquid water</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Common Water Properties Tested
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Solubility</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Water is a "universal solvent" - dissolves many substances</li>
      <li style="margin: 0.2rem 0;">Salt (NaCl) dissolves in water</li>
      <li style="margin: 0.2rem 0;">Sugar dissolves in water</li>
      <li style="margin: 0.2rem 0;">Oil does NOT dissolve in water (immiscible)</li>
      <li style="margin: 0.2rem 0;">More solute dissolves in hot water than cold water (for most substances)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">pH</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Pure water has pH = 7 (neutral)</li>
      <li style="margin: 0.2rem 0;">pH < 7 is acidic</li>
      <li style="margin: 0.2rem 0;">pH > 7 is basic (alkaline)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Specific heat</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Water requires a lot of energy to change temperature</li>
      <li style="margin: 0.2rem 0;">This is why water is good for regulating temperature</li>
      <li style="margin: 0.2rem 0;">Water heats up and cools down slowly compared to most substances</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
How to Use Water Knowledge on the Test
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Read the question carefully to identify what water property is being tested</li>
  <li style="margin: 0.3rem 0;">Look for temperature values in the data:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If temp < 0°C → expect ice/solid</li>
      <li style="margin: 0.2rem 0;">If temp is 0-100°C → expect liquid</li>
      <li style="margin: 0.2rem 0;">If temp > 100°C → expect gas/steam</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Apply your knowledge to eliminate wrong answer choices quickly</li>
  <li style="margin: 0.3rem 0;">Don''t overthink - the ACT tests basic facts, not advanced chemistry</li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Water freezes at 0°C and boils at 100°C - these are the most commonly tested facts
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Ice is less dense than liquid water, which is why ice floats
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Water is a universal solvent that dissolves salt and sugar but not oil
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Pure water has pH = 7 (neutral), with acids below 7 and bases above 7
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('experimental-setup', 'science', 'Topic 4.2 - Experimental Setup', 'Topic 4.2 - Experimental Setup...', 'intermediate', 30, 16, '<!-- Science Lesson 4.2: Experimental Setup -->
<!-- ACT Science - Unit 4: Outside Knowledge -->
<!-- Lesson Key: experimental-setup -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Experimental setup questions test your understanding of basic experimental design principles, such as controls, variables, and how to set up a valid experiment. You don''t need advanced science knowledge - just common sense about fair testing and scientific methodology.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Key Experimental Design Concepts
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Independent variable</strong>: What the experimenter changes on purpose
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">This is the variable you control/manipulate</li>
      <li style="margin: 0.2rem 0;">Example: Amount of fertilizer added to plants</li>
      <li style="margin: 0.2rem 0;">Usually shown on the x-axis of graphs</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Dependent variable</strong>: What you measure as a result
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">This changes in response to the independent variable</li>
      <li style="margin: 0.2rem 0;">Example: Height of plants after adding fertilizer</li>
      <li style="margin: 0.2rem 0;">Usually shown on the y-axis of graphs</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Controlled variables</strong>: Factors kept the same across all trials
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Must be identical to ensure a fair test</li>
      <li style="margin: 0.2rem 0;">Example: Same type of plant, same amount of water, same light exposure</li>
      <li style="margin: 0.2rem 0;">If not controlled, you can''t tell what caused the difference</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Control group</strong>: The baseline for comparison
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Doesn''t receive the experimental treatment</li>
      <li style="margin: 0.2rem 0;">Example: Plants that receive NO fertilizer</li>
      <li style="margin: 0.2rem 0;">Used to see if the treatment actually had an effect</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
What Makes a Good Experiment?
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Change only ONE variable at a time</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you change multiple things, you can''t tell which one caused the result</li>
      <li style="margin: 0.2rem 0;">Example: Don''t change both fertilizer amount AND water amount</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Keep everything else constant</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">All trials should be identical except for the independent variable</li>
      <li style="margin: 0.2rem 0;">Same equipment, same environment, same procedure</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Use a control group for comparison</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Shows what happens without the treatment</li>
      <li style="margin: 0.2rem 0;">Helps determine if changes are due to the treatment or something else</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Repeat trials (replication)</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Multiple trials reduce random errors</li>
      <li style="margin: 0.2rem 0;">Makes results more reliable and trustworthy</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Common Question Types
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">"Which variable was the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">independent variable</strong>?"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look for what the experimenter intentionally changed</li>
      <li style="margin: 0.2rem 0;">Often appears in the trial descriptions (Trial 1: 10g, Trial 2: 20g, etc.)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">"Which trial served as the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">control</strong>?"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look for the trial with no treatment or "normal" conditions</li>
      <li style="margin: 0.2rem 0;">Example: 0 grams of fertilizer, or room temperature</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">"What should be <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">kept constant</strong>?"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look for variables NOT mentioned as independent or dependent</li>
      <li style="margin: 0.2rem 0;">Everything except what you''re testing should be the same</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">"How could this experiment be <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">improved</strong>?"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Add a control group if missing</li>
      <li style="margin: 0.2rem 0;">Increase number of trials</li>
      <li style="margin: 0.2rem 0;">Control additional variables</li>
      <li style="margin: 0.2rem 0;">Use more precise measurement tools</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Strategy for Setup Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Read the experimental description carefully to identify:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">What changes between trials? (independent variable)</li>
      <li style="margin: 0.2rem 0;">What is measured? (dependent variable)</li>
      <li style="margin: 0.2rem 0;">What stays the same? (controlled variables)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Use common sense - experimental design is about fairness and logic</li>
  <li style="margin: 0.3rem 0;">Ask yourself: "If I changed two things at once, how would I know which one caused the result?"</li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Independent variable is what you change; dependent variable is what you measure
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Good experiments change only ONE variable at a time and keep everything else constant
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Control groups provide a baseline for comparison and don''t receive the experimental treatment
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use common sense and logic - if you change multiple things, you can''t determine what caused the result
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('outside-knowledge', 'science', 'Topic 4.3 - Other Outside Knowledge', 'Topic 4.3 - Other Outside Knowledge...', 'intermediate', 30, 17, '<!-- Science Lesson 4.3: Other Outside Knowledge -->
<!-- ACT Science - Unit 4: Outside Knowledge -->
<!-- Lesson Key: outside-knowledge -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Beyond water and experimental setup, the ACT Science occasionally tests other basic science facts that most high school students should know. These questions require minimal memorization - just fundamental concepts from biology, chemistry, physics, and earth science.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Basic Chemistry Facts
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Elements vs. Compounds</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Element: Pure substance made of one type of atom (H, O, C, Fe)</li>
      <li style="margin: 0.2rem 0;">Compound: Two or more elements bonded together (H₂O, CO₂, NaCl)</li>
      <li style="margin: 0.2rem 0;">Mixture: Two or more substances physically mixed (not bonded)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">pH Scale</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">pH < 7 = Acidic (lemon juice, vinegar, stomach acid)</li>
      <li style="margin: 0.2rem 0;">pH = 7 = Neutral (pure water)</li>
      <li style="margin: 0.2rem 0;">pH > 7 = Basic/Alkaline (soap, bleach, baking soda)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Atoms and Molecules</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Atom: Smallest unit of an element</li>
      <li style="margin: 0.2rem 0;">Molecule: Two or more atoms bonded together</li>
      <li style="margin: 0.2rem 0;">Protons = positive charge, Electrons = negative charge, Neutrons = no charge</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Basic Physics Facts
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Energy and Heat</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Heat flows from hot to cold (never the reverse without work)</li>
      <li style="margin: 0.2rem 0;">Energy cannot be created or destroyed (conservation of energy)</li>
      <li style="margin: 0.2rem 0;">Dark colors absorb more heat than light colors</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Speed and Velocity</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Speed = Distance ÷ Time</li>
      <li style="margin: 0.2rem 0;">Velocity includes direction (speed + direction)</li>
      <li style="margin: 0.2rem 0;">Acceleration = change in velocity over time</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Density</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Density = Mass ÷ Volume</li>
      <li style="margin: 0.2rem 0;">Objects less dense than water float</li>
      <li style="margin: 0.2rem 0;">Objects more dense than water sink</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Basic Biology Facts
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Photosynthesis</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Plants use sunlight to convert CO₂ + H₂O → glucose + O₂</li>
      <li style="margin: 0.2rem 0;">Requires light, water, and carbon dioxide</li>
      <li style="margin: 0.2rem 0;">Produces oxygen as a byproduct</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Cellular Respiration</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Cells break down glucose + O₂ → CO₂ + H₂O + energy</li>
      <li style="margin: 0.2rem 0;">Opposite of photosynthesis</li>
      <li style="margin: 0.2rem 0;">Provides energy for cells to function</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Food Chains</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Producers (plants) make their own food from sunlight</li>
      <li style="margin: 0.2rem 0;">Consumers (animals) eat other organisms</li>
      <li style="margin: 0.2rem 0;">Decomposers break down dead organisms</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Basic Earth Science Facts
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Weather and Climate</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Warm air rises, cool air sinks</li>
      <li style="margin: 0.2rem 0;">Water evaporates when heated, condenses when cooled</li>
      <li style="margin: 0.2rem 0;">Humidity = amount of water vapor in the air</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Rocks and Minerals</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Igneous: Formed from cooled lava/magma</li>
      <li style="margin: 0.2rem 0;">Sedimentary: Formed from compressed layers of sediment</li>
      <li style="margin: 0.2rem 0;">Metamorphic: Formed from heat and pressure changing existing rocks</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Earth''s Atmosphere</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Mostly nitrogen (~78%) and oxygen (~21%)</li>
      <li style="margin: 0.2rem 0;">Atmospheric pressure decreases with altitude</li>
      <li style="margin: 0.2rem 0;">Greenhouse gases trap heat in the atmosphere</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
How to Handle Outside Knowledge Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Don''t panic if you don''t immediately know the answer - use logic and process of elimination</li>
  <li style="margin: 0.3rem 0;">The ACT rarely tests obscure facts - stick to basic concepts from high school science classes</li>
  <li style="margin: 0.3rem 0;">Many questions give you context clues in the passage that hint at the answer</li>
  <li style="margin: 0.3rem 0;">Use <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">common sense</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Does the answer align with everyday experience?</li>
      <li style="margin: 0.2rem 0;">Can you eliminate answers that seem unrealistic?</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">If completely stuck, use the data in the passage to make an educated guess</li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The ACT tests basic high school science concepts, not advanced specialized knowledge
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Know fundamental facts: pH scale, photosynthesis, heat flow, density, and atmospheric composition
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use common sense and everyday experience when outside knowledge questions appear
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Most passages provide context clues - read carefully to find hints about the correct answer
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('conflicting-viewpoints', 'science', 'Topic 4.4 - Conflicting Viewpoints', 'Topic 4.4 - Conflicting Viewpoints...', 'intermediate', 30, 18, '<!-- Science Lesson 4.4: Conflicting Viewpoints -->
<!-- ACT Science - Unit 4: Outside Knowledge -->
<!-- Lesson Key: conflicting-viewpoints -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Conflicting viewpoints passages present two or more scientists, students, or hypotheses that disagree about a scientific topic. Your job is to understand each viewpoint, identify similarities and differences, and determine which viewpoint is supported by given evidence.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Structure of Conflicting Viewpoints Passages
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Introduction</strong>: Brief background on the topic
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sets up the scientific question or phenomenon</li>
      <li style="margin: 0.2rem 0;">May include basic facts or definitions</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Viewpoint 1 (Scientist 1 or Hypothesis 1)</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Presents one explanation or theory</li>
      <li style="margin: 0.2rem 0;">Provides reasoning and evidence</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Viewpoint 2 (Scientist 2 or Hypothesis 2)</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Presents a different or opposing explanation</li>
      <li style="margin: 0.2rem 0;">Provides counter-reasoning and evidence</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Sometimes a <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Viewpoint 3</strong> is included with a third perspective</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Common Question Types
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Understanding individual viewpoints</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"According to Scientist 1, what causes X?"</li>
      <li style="margin: 0.2rem 0;">"Hypothesis 2 would predict that..."</li>
      <li style="margin: 0.2rem 0;">Strategy: Find the specific viewpoint section and locate the answer</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Comparing viewpoints</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"How do the viewpoints differ on...?"</li>
      <li style="margin: 0.2rem 0;">"What do both scientists agree on?"</li>
      <li style="margin: 0.2rem 0;">Strategy: Make a quick comparison chart or note similarities/differences</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Evaluating with new evidence</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"New data shows X. This finding supports which viewpoint?"</li>
      <li style="margin: 0.2rem 0;">"Which experiment would help distinguish between the viewpoints?"</li>
      <li style="margin: 0.2rem 0;">Strategy: Test the new evidence against each viewpoint''s predictions</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Weakening/strengthening arguments</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"Which finding would weaken Scientist 2''s viewpoint?"</li>
      <li style="margin: 0.2rem 0;">"Which observation supports Hypothesis 1?"</li>
      <li style="margin: 0.2rem 0;">Strategy: Look for evidence that contradicts or confirms key claims</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Strategy for Conflicting Viewpoints
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Step 1: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Skim the introduction</strong> to understand the topic
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">What phenomenon or question is being debated?</li>
      <li style="margin: 0.2rem 0;">Don''t get bogged down in details - just get the gist</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 2: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Go straight to the questions</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Don''t read all viewpoints in detail first</li>
      <li style="margin: 0.2rem 0;">Let the questions guide what you need to read</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 3: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">For each question, locate the relevant viewpoint</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Question about Scientist 1? Read only that section</li>
      <li style="margin: 0.2rem 0;">Question comparing viewpoints? Read both sections</li>
      <li style="margin: 0.2rem 0;">Be efficient - don''t read more than necessary</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 4: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Identify the main claim</strong> of each viewpoint
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Usually stated in the first 1-2 sentences</li>
      <li style="margin: 0.2rem 0;">Example: "Scientist 1 believes the extinction was caused by asteroids"</li>
      <li style="margin: 0.2rem 0;">Example: "Scientist 2 argues that volcanic activity was responsible"</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 5: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Note key differences and similarities</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">What do they disagree on?</li>
      <li style="margin: 0.2rem 0;">What do they agree on (if anything)?</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
Tips for Success
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Don''t take sides - remain objective and understand each viewpoint on its own terms</li>
  <li style="margin: 0.3rem 0;">Watch for <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">extreme language</strong> in answer choices:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"Both scientists agree that..." → Must be stated by BOTH</li>
      <li style="margin: 0.2rem 0;">"Only Scientist 1 believes..." → Must be unique to Scientist 1</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">For "new evidence" questions, ask: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">What would each viewpoint predict?</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If new data matches Scientist 1''s prediction → supports Scientist 1</li>
      <li style="margin: 0.2rem 0;">If new data contradicts Scientist 2''s prediction → weakens Scientist 2</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">These passages require more reading than data interpretation passages, but the questions are often straightforward if you know where to look</li>
</ul>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Go straight to questions - don''t read all viewpoints in detail first
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Identify the main claim of each viewpoint (usually in the first 1-2 sentences)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>For new evidence questions, determine what each viewpoint would predict
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Note key differences and similarities between viewpoints to answer comparison questions
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

