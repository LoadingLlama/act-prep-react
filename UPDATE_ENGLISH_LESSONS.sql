-- ============================================================
-- UPDATE ENGLISH LESSONS WITH PREPPROS CONTENT
-- Generated: 2025-10-13T18:42:32.875Z
-- Updates 16 English lessons with full PrepPros textbook content
-- ============================================================

BEGIN;

-- ============================================================
-- Introduction to the English Test
-- Lesson: getting-started
-- Lesson ID: e9416157-f146-4cac-bcf2-0b0b6543a7e0
-- Content length: 14067 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = 'e9416157-f146-4cac-bcf2-0b0b6543a7e0'
);

DELETE FROM lesson_sections WHERE lesson_id = 'e9416157-f146-4cac-bcf2-0b0b6543a7e0';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  'e9416157-f146-4cac-bcf2-0b0b6543a7e0',
  'getting-started-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Introduction to the English Test</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The English Test on the ACT is a 35-minute section composed of 50 questions designed to test your</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">knowledge of grammar rules, language, and rhetorical skills. The questions will be presented in a</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">variety of ways, all of which we will work through together in this course.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">What is on the English test?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Overall, the English Test will feel like editing a paper. As you work through the passages, you will come</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">across underlined portions or boxed numbers that will ask you to somehow edit or analyze the passage.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">We like to say that there are 3 general types of questions:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Grammar Questions</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Grammar questions test your knowledge of standard English grammar rules. Grammar questions</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">always ask:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which choice makes the sentence most grammatically acceptable?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Topics tested on grammar questions include sentence structure, punctuation, <strong style="color: #2563eb; text-decoration: underline;">verbs</strong>, <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong>,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">misplaced modifiers</strong>, <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong>, and other miscellaneous grammar rules. To answer these</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">questions correctly, you will need to know all of the grammar rules tests on the ACT. We promise</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">that you will learn more grammar in this course than you have learned in all of high school so far!</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Grammar questions will range from easy to very difficult, so they are the most important to master</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">to achieve top ACT English Test scores.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2.</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Style Questions</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Style questions test your ability to analyze the style and effectiveness of the passage. More</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">specifically, these questions test you on conciseness, <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>, irrelevance, word choice, and</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">transitions</strong>. Style questions on the new Enhanced ACT specifically tell you as to what topic the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">question is on. The questions look like this:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which choice is least redundant in the content?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which choice most effectively maintains the essay’s tone?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">3.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which choice is the clearest and most precise in context?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">4.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which <strong style="color: #2563eb; text-decoration: underline;">transition</strong> word or <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> is the most logical in context?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Overall, style questions are very easy once we teach you how to approach then and understand</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">what the ACT is testing you on.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">3.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Paragraph Modification Questions</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Paragraph modification questions test your ability to comprehend the author’s argument, place</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">information properly, decide whether to add or delete information, and answer questions related</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">to specific details in the passage. To answer these questions correctly, you will need to read the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">questions carefully to identify what the ACT is asking you to do and read for context.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The writer is considering deleting the underlined sentence. Should it be Kept or deleted?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which choice best highlights why the boy dropped his ice cream?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">3.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Ifthe writer were to delete</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">4.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For the sake of logic and coherence, the underlined sentence should be placed:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">, the sentence would primarily lose:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Similar to style questions, paragraph modification questions are generally easy once you learn</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">how to approach them correctly. Some common examples of paragraph modification questions</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">are:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">How to Approach the English Test?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">It is important to read the entire passage. Do not skip between underlined portions. The most</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">common mistake that students make is to rush and not read the passage and/or questions carefully</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">enough. Take your time! This section is one that students generally do not have issues with time</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">management, especially once you know all of the grammar rules we are about to learn.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">When dealing with grammar questions, read the sentence and look for errors. Pay careful</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">attention to punctuation, especially for commas. Even if you do not spot any errors, always look at all</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of the answer choices. Sometime the answers choices will help you spot an error that you initially</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">missed or help you recognize what the question is testing you on.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Keep yourself moving. In other words, if you are not sure about a problem, do not waste too much time</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">stressing about it. If you are unsure about which answer is correct, bubble in your best guess,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">circle the questions number, and move on. There are 50 questions on the test, so one question is not</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">going to make or break your score. At the end, if you have time left over, you can return to the circled</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">questions and spend more time on them. A fresh look at these questions may also help you spot the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">correct answer.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Pacing</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">On the English Test, you will answer 50 questions in 35 minutes. On average, you have 42 seconds per</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">questions. Of course, that number is not helpful for pacing, so we recommend that you memorize that</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">you have 7 minutes for every 10 questions.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">You will work through 6 passages. The number of questions vary per passage. There will be 4 longer</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">passages with 10 questions per passage and 2 shorter passages with 5 questions per passage. Since the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">number of questions vary in different passages, it’ll take different amount of time per passage. So, you</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">should not pace yourself based on what passage you are on. Instead, make sure you pace yourself by the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">question number that you are on.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">As you work through the English test, you can use the pacing we discussed above to see if you are on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">pace, ahead of pace, or behind pace. After you finish every 10 questions, take a look at the clock to see</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">how you are doing on pace. If you are on pace or ahead of pace, just keep working. If you are behind</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">pace, start to work a bit more quickly. Do not freak out and start rushing; just be more aware of the time</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">and your pace as you continue to work through the passage.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Part 1:</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Grammar Questions</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Many questions on the ACT English Test will test your grammar skills. All grammar</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">questions on the ACT will starts by saying:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which choice makes the sentence most grammatically acceptable?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In Part 1 of this course, we will teach you every single grammar rule that appears on the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">ACT and how to spot which grammar rule you are being tested on.</p>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = 'e9416157-f146-4cac-bcf2-0b0b6543a7e0'
  AND ls.section_key = 'getting-started-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = 'e9416157-f146-4cac-bcf2-0b0b6543a7e0';

-- ============================================================
-- Chapter 1: Sentence Structure
-- Lesson: sentence-structure
-- Lesson ID: 4998d0fa-2f94-44ef-82c7-089a1a9b6419
-- Content length: 23143 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = '4998d0fa-2f94-44ef-82c7-089a1a9b6419'
);

DELETE FROM lesson_sections WHERE lesson_id = '4998d0fa-2f94-44ef-82c7-089a1a9b6419';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  '4998d0fa-2f94-44ef-82c7-089a1a9b6419',
  'sentence-structure-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 1: Sentence Structure</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">To conquer the ACT English Test, we first need to be able to identify the different parts of a sentence and</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">know the rules for how they can and cannot be combined.</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Clauses and Phrases</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A clause is a group of words that contains both a <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and a <strong style="color: #2563eb; text-decoration: underline;">verb</strong>. There are two types of clauses:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong> and <strong style="color: #2563eb; text-decoration: underline;">dependent clauses</strong>.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">An <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong> can stand as a sentence by itself. It always has a <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and a <strong style="color: #2563eb; text-decoration: underline;">verb</strong>. The best</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">way to identify an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong> is to read the sentence and see if you can stop talking at the end.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If you can stop, it is a complete sentence and an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong>. Here are some examples of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong>:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The dog chased its tail.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Monique made some homemade peach scones for breakfast.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">He picked it up.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The excited child opened up his present.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A <strong style="color: #2563eb; text-decoration: underline;">dependent clause</strong> cannot stand alone as a complete sentence. Most often, clauses become dependent</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">by adding a <strong style="color: #2563eb; text-decoration: underline;">subordinating conjunction</strong> to the front of the clause. The most common subordinating</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">conjunctions are listed below</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">after</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in order to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">whatever</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">although</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">once</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">when</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">as</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">since</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">whenever</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">because</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">though</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">whether</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">before</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">that</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">where</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">even though</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">unless</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">while</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">if</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">until</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Notice how in the examples below these words turn <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong> into <strong style="color: #2563eb; text-decoration: underline;">dependent clauses</strong>:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">While the dog chased its tail...</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Although Monique made some homemade peach scones for breakfast...</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Since he picked it up...</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">When the excited child opened up his present...</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> lacks a <strong style="color: #2563eb; text-decoration: underline;">subject</strong> or <strong style="color: #2563eb; text-decoration: underline;">verb</strong> or both. A <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> does not express a complete thought and can never</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">stand alone as asentence. As aresult, <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> provide additional descriptory information in a sentence.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chasing its tail...</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Making some homemade peach scones for breakfast...</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Picking it up...</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Excited to open up his present...</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">All of these example are missing the <strong style="color: #2563eb; text-decoration: underline;">subject</strong>. From the <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> alone, we do not know who is doing any of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">these actions.</p>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Independent Clauses vs. Dependent Clauses vs. Phrases</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">To tell the difference between an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong>, a <strong style="color: #2563eb; text-decoration: underline;">dependent clause</strong>, and a <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>, read the sentence out loud (or “out loud” in your head). If you can stop talking at the end of the sentence, it is an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong>. If you feel like you need to Keep talking, the sentence is a <strong style="color: #2563eb; text-decoration: underline;">dependent clause</strong> or a <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> and cannot stand alone. To tell the difference between a <strong style="color: #2563eb; text-decoration: underline;">dependent clause</strong> and a <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>, cover the first word and read the rest of the sentence. If you then have a complete sentence, it is a <strong style="color: #2563eb; text-decoration: underline;">dependent clause</strong>. If you do not have a complete sentence, it is a <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>. <strong style="color: #2563eb; text-decoration: underline;">Independent Clause</strong>: My brother Adam eats cookies every day. <strong style="color: #2563eb; text-decoration: underline;">Dependent Clause</strong>: When my brother Adam eats cookies every day... <strong style="color: #2563eb; text-decoration: underline;">Phrase</strong>: Eating cookies everyday... Exercise: For each of the clauses or <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> below, identify if it is an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong> (I), <strong style="color: #2563eb; text-decoration: underline;">dependent clause</strong> (D), or <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> (P). Write I, D, or P next to each question. 1) Areference to Canadian politics in the 1980s 2) The new clothing brand that makes clothing entirely from recycled plastic bottles is popular 3) He created the new pair of shoes specifically for a special client with size 17 feet 4) Because the water bottle was manufactured with two layers of stainless steel 5) Iluminating the crime scene with a flashlight 6) Forgetting his calculator at home was a big mistake 7) Even though potted succulents grow far better in summer than winter 8) Running out of time to complete his sculpture for the spring art show 9) With no regard for his own health and safety 10) Rain is in the forecast for the next three days 11) Expertly kneaded bread will have air pockets 12) Hiking fifteen miles in a single day with only three liters of water and a small bag of trail mix 13) While Manu was accused of cheating by both the teachers and all of the students 14) Where Stephanie’s campaign for class president relied on donations from classmates <strong style="color: #2563eb; text-decoration: underline;">Sentence Fragments</strong> A complete sentence must contain a <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and a <strong style="color: #2563eb; text-decoration: underline;">verb</strong>. <strong style="color: #2563eb; text-decoration: underline;">Sentence fragments</strong> are missing a <strong style="color: #2563eb; text-decoration: underline;">subject</strong> or a <strong style="color: #2563eb; text-decoration: underline;">verb</strong> or both and do not express a complete thought. In other words, a <strong style="color: #2563eb; text-decoration: underline;">sentence fragment</strong> cannot stand by itself. To spot <strong style="color: #2563eb; text-decoration: underline;">sentence fragments</strong>, read the entire sentence. The sentence will usually just sound plain wrong, and you will realize it is missing a <strong style="color: #2563eb; text-decoration: underline;">subject</strong> or a <strong style="color: #2563eb; text-decoration: underline;">verb</strong>. Incorrect: The student running to get to class on time. (missing a <strong style="color: #2563eb; text-decoration: underline;">verb</strong> - what did the student do?) Correct: The student running to get to class on time dropped her water bottle. Incorrect: Excited to go to the beach and surf. (missing a <strong style="color: #2563eb; text-decoration: underline;">subject</strong> - who is excited to go to the beach?) Correct: My little brother Shaun is excited to go to the beach and surf. PrepPros ACT English Course Clauses, <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong>, and Fragments Practice: In the late 1960s, the “must-have” toy at the Cincinnati Toy Fair a new type of diecast toy car 1 that would later become the popular brand Hot Wheels. Spencer, who famously noticed that a microwave 2 can melt a chocolate bar. GOD NO CHANGE >GOW NO CHANGE Fair, Fair; . Fair was Spencer famously Spencer surprised famously . Spencer, who was famous for when After hummingbirds evolved long, thin beaks to reach pollen in flowers, however this 3 evolutionary advantage allowed them to survive COM> he NO CHANGE therefore and . DELETE the underlined portion entirely on flower nectar, tree sap, and pollen. To clean all the windows on the tallest buildings, window cleaners work several twelve-hour 4 shifts over the course of a week. Her landmark doctoral thesis, published in 2019, asserting that, unlike the other autoimmune 5 disorders, Crohn’s disease has an underlying bacterial component. While the bakery varies its types of bread with 6 the seasons, ranging from tomato basil loafs in the summer to olive rosemary focaccia in the fall, and always has a line around the block. GOD NO CHANGE >GOW NO CHANGE >OW NO CHANGE cleaners, who work cleaners, working . cleaners who work asserted that asserted, . an assertion Having various types of bread With the bakery having varied bread types . The bakery varies its types of bread PrepPros ACT English Course 5 Types of <strong style="color: #2563eb; text-decoration: underline;">Compound Sentences</strong> Often on the ACT, we often face more complex sentences that have multiple clauses (more than one <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and <strong style="color: #2563eb; text-decoration: underline;">verb</strong>). These are called <strong style="color: #2563eb; text-decoration: underline;">compound sentences</strong>. On the ACT (and in English in general), multiple clauses must always appear as one of the 5 types below. 1. Two separate <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong> with periods. Mary loves dogs. Andrew loves cats. Independent Independent</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: FANBOYS</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">Memorize these 7 2. Comma + <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong> joining 2 <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong>. a For Mary loves dogs , and Andrew loves cats. Independent Independent 3. <strong style="color: #2563eb; text-decoration: underline;">Semicolon</strong> between 2 <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong>. Mary loves dogs ; Andrew loves cats. Independent special words! And Nor But Or a Independent fe) * A <strong style="color: #2563eb; text-decoration: underline;">semicolon</strong> is the same a period on the ACT. 4. <strong style="color: #2563eb; text-decoration: underline;">Dependent clause</strong> followed by <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong> (comma). While Mary loves dogs , Andrew loves cats. Dependent 5. Independent <strong style="color: #2563eb; text-decoration: underline;">Independent clause</strong> straight into <strong style="color: #2563eb; text-decoration: underline;">dependent clause</strong> (no comma). Mary loves dogs while Andrew loves cats. Independent Dependent You need to memorize these 5 rules! The ACT will challenge you by putting answer choices that “look” or “sound” good on the exam but actually break one of our rules above. Next, we will cover the most common comma mistake students make with sentence structure. <strong style="color: #2563eb; text-decoration: underline;">Comma Splice</strong> A comma by itself CANNOT be used to join two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong>. Joining two independent sentences with only a comma is called a <strong style="color: #2563eb; text-decoration: underline;">comma splice</strong> and is always incorrect. Incorrect: It is believed that bulls are enraged by the color red, they are actually colorblind. Incorrect: I cannot believe you did not get the flowers, I left them at your front door. Both of these sentences are <strong style="color: #2563eb; text-decoration: underline;">comma splices</strong>. We can correct these <strong style="color: #2563eb; text-decoration: underline;">comma splices</strong> using any of our 5 comma rules above. The first incorrect sentence is corrected below using all 5 rules. Rule #1: Itis believed that bulls are enraged by the color red. They are actually colorblind. Rule #2: It is believed that bulls are enraged by the color red, but they are actually colorblind. Rule #3: Itis believed that bulls are enraged by the color red; they are actually colorblind. Rule #4: While it is believed that bulls are enraged by the color red, they are actually colorblind. Rule #5: Itis believed that bulls are enraged by the color red though they are actually colorblind. PrepPros ACT English Course <strong style="color: #2563eb; text-decoration: underline;">Compound Sentences</strong> Practice: Which answer choices are correct? For this exercise, multiple answer choices can be correct. Select all answer choices that make the sentence correct. 1) 2) 3) 4) Hockey is my favorite I cannot skate very well. a. sport, although b. sport, but c. sport even though While penguins are clumsy a. on land, they are b. on land they are c. on land; they are amazingly graceful in water. Swimming is a great works all the muscle groups in the body. a. workout; it b. workout because it c. workout, for it Tomato plants need full sunlight to grow to full lettuce grows better in partial sunlight. a. size, but b. size; and Cc. size; a. My friends say the extra hot salsa is too spicy, 5) I still prefer it. Although my friends say the extra hot salsa is too spicy, c. 6) 7) 8) My friends say the extra hot salsa is too spicy, but On my day off, I will go a. surfing, or I will b. surfing or I will c. surfing, or will go spearfishing. The entire school loves chef makes the best pulled pork. a. Victoria because she b. Victoria; because she c. Victoria, she Liz could not a. resist, so b. resist and c. resist, she adopted the adorable golden doodle puppy. PrepPros ACT English Course</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: How to Spot Sentence Structure Questions</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">Sentence structure questions usually have at least one of the following characteristics: 1. Period, <strong style="color: #2563eb; text-decoration: underline;">semicolons</strong>, commas, and <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong> are in the answer choices. If you see answer choices with any of these, you are most likely looking at a sentence structure question. 2. Some answer choices have a <strong style="color: #2563eb; text-decoration: underline;">subject</strong> or <strong style="color: #2563eb; text-decoration: underline;">verb</strong> and others do not. For more advanced sentence structure questions, some answer choices have <strong style="color: #2563eb; text-decoration: underline;">subjects</strong> or <strong style="color: #2563eb; text-decoration: underline;">verbs</strong> while others do not. The <strong style="color: #2563eb; text-decoration: underline;">verbs</strong> may also vary in their forms; for example, one answer choice may say “drove” while another says “driving”. For these questions, be on the lookout for <strong style="color: #2563eb; text-decoration: underline;">comma splices</strong>. On the ACT, sentence structure questions commonly look like this: The roller coaster is opening next 1. Which choice makes the sentence most week, the wait time is expected to be grammatically acceptable: over 4 hours long. A. NO CHANGE B. week; with the C. week and the D. week. The ? In August 2005, Hurricane Katrina hit 2. Which choice makes the sentence New Orleans; resulting in over 1,800 most grammatically acceptable? deaths and $125 billion in damage. A. NO CHANGE B. New Orleans, the result was C. New Orleans, and the result was D. New Orleans. The result being Anytime you spot a sentence structure question, use the following approach: 1. Find where the sentence is being “split.” 2. Look left and right of the “split” point and identify the clauses or <strong style="color: #2563eb; text-decoration: underline;">phrases</strong>. 3. Apply the sentence structure rules. In the first example above, the answer is D because we have two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong>. A is a <strong style="color: #2563eb; text-decoration: underline;">comma splice</strong>. In B, the second half is not an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong>. C is missing the comma with the <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong>. In the second example, the answer is C because we have two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong> linked by a comma + <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong>. A and D are incorrect because the second half is not an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong>. Bisa <strong style="color: #2563eb; text-decoration: underline;">comma splice</strong>. PrepPros ACT English Course</p>
</div>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = '4998d0fa-2f94-44ef-82c7-089a1a9b6419'
  AND ls.section_key = 'sentence-structure-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = '4998d0fa-2f94-44ef-82c7-089a1a9b6419';

-- ============================================================
-- Chapter 2: Commas - 4 Types of Commas
-- Lesson: commas
-- Lesson ID: 33292648-8367-4957-9ccf-6f2dfc182141
-- Content length: 46699 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = '33292648-8367-4957-9ccf-6f2dfc182141'
);

DELETE FROM lesson_sections WHERE lesson_id = '33292648-8367-4957-9ccf-6f2dfc182141';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  '33292648-8367-4957-9ccf-6f2dfc182141',
  'commas-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 2: Commas - 4 Types of Commas</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Commas are the most common type of punctuation on the English Test. In order to successfully handle</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">comma questions, we need to become familiar with the 4 types of commas that appear on the ACT.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">So far, we have already discussed the first two types of commas.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1. Comma + <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong></p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">My alarm clock did not go off this morning, so I arrived late at school.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Use a comma and a <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong> (for, and, nor, but, or, yet, so) to join two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong>.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2. <strong style="color: #2563eb; text-decoration: underline;">Dependent clause</strong> followed by <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong></p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">While electronic music has become very popular, many people still prefer classic rock.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If a sentence has a <strong style="color: #2563eb; text-decoration: underline;">dependent clause</strong> followed by an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong>, you must link these with a</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">comma.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Next, we will learn the other 2 types of commas in English and on the ACT:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">3. Unnecessary Information</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Commas are used to separate unnecessary information from the rest of the sentence. Information is</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">unnecessary if we can remove it without fundamentally changing the meaning of the sentence.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Unnecessary information can be as short as a single word or as long as a lengthy <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example: Mrs. Ellison, who is known for giving pop quizzes, is my least favorite teacher.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example: The snowboard in the closet, the one with no stickers on it, needs to be waxed.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example: The basketball team, though, did not mount a comeback this week.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">4. Listing</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Commas are used when listing more than two items and with lists of multiple adjectives modifying the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">same noun.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example: The group at the picnic table ordered coconut shrimp, hot wings, and onion rings.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example: The old, limping dog still managed to complete the 3-mile hike.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Unnecessary Information Commas</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The most common type of comma in English and on the ACT separates unnecessary information from</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the rest of the sentence. Information is unnecessary if we can remove the information from the sentence</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">without fundamentally changing the meaning of the sentence. Unnecessary information can be</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">before a comma, after a comma, or between two commas.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Sitting behind the table, Mark waited to jump out and surprise his mother.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Dale grabbed his favorite surfboard, the blue and green one, and paddled out.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Buddy the Elf handed his father a bag of spaghetti, his face covered in syrup.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The real winner, however, had yet to be revealed.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In the sentences above, the unnecessary information is underlined. Each of these sentences still works if</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">we ignore unnecessary information. That’s how we know it is unnecessary and the commas are correct!</p>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: The “Crossing-Out” Trick</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">For unnecessary information commas, you must be able to completely remove the unnecessary information from the sentence. After removing the unnecessary information, what remains must still be a complete sentence that can stand by itself. To test if information is unnecessary, cross out the information and read the sentence without it. If you can cross out the information and the sentence still reads as a complete sentence, the information is unnecessary and needs to be set apart by acomma or commas. If you cannot cross out the information, it should not be set apart by any commas. Let’s test with the sentence below. All three versions are the same sentence, but the commas are in different locations. The wooden beam set at an angle, created an optical illusion. The wooden beam, set at an angle created an optical illusion. The wooden beam, set at an angle, created an optical illusion. For the first two sentences, a single comma must set apart the information either before or after it as unnecessary. Let’s check if these work. The weeden beam setatananele, created an optical illusion. The wooden beam set at an angle, ereated-an-opticaltusion. The wooden beam, setatanangle created anopticaltusion. The weedenbeam, set at an angle created an optical illusion. Well...none of those work for the first two sentences. Let’s try the third. A pair of commas can either separate the information between them or the information before and after. The weeden beam, set at an angle, ereated an opticaltusion. The wooden beam, setatanangle, created an optical illusion. (Yes, it works!) Using this trick can be very helpful on unnecessary information commas questions. PrepPros ACT English Course Unnecessary vs. Necessary Information At times, we will also need to determine if information is indeed unnecessary or not. These sentences are more challenging, but the trick is to delete the portion that may be unnecessary and see if the sentence loses any critical information. Consider the two sentences below: Correct: The dresses that need to be hemmed are hanging in the closet. Correct: Judith, who went to fashion school, designs dresses for a living. Why do we have no commas in the first sentence and commas for the second? In the first sentence, the information is necessary. If we just say, “the dresses are hanging in the closet,” then we do not know which specific dresses we are talking about. In the second sentence, we already know who designs the dresses, so the information about Judith going to fashion school is unnecessary. The Names Rule The ACT loves to ask you how to properly punctuate names. You are almost guaranteed to see at least one commas and names question on test day. You have probably seen names written both with and without commas...so what’s the difference? Both versions below are correct: see if you can figure out why. Correct: My friend Kelly recently moved to London. Correct: My best friend, Andrew, is a certified scuba diver. The names rule has to do with specificity. If the identifier before the name is not specific to one person (friend, American physicist, Olympic gold medalist, high school principal), the name is necessary, and there is no comma between the identifier and the name. If the identifier is specific to one person (best friend, youngest sister, Amazon CEO), the name is unnecessary information, and there are commas around the name. In the first sentence, Kelly is necessary because without her name we do not know which friend recently moved to London. In the second sentence, Andrew is unnecessary because a person can only have one best friend. We do not need the name Andrew to know who we are talking about. Names Rule Practice: Determine if the names below need commas or not. bDFYONPW Award-winning teacher Mrs. Saunders helped me become a much better writer. Broadway producer Jeffrey Seller is best known for the huge hit Hamilton. Eric’s mother Louisa cheered from the bleachers. Italian cyclist Marco Pantani won the Tour de France in 1998. Famous American entrepreneur Elon Musk is a proponent of bitcoin. The CEO of Tesla Elon Musk has revolutionized the car industry. Grammy winner Arianna Grande is releasing a new album next month. The oldest Hemswroth brother Luke Hemsworth starred in HBO’s Westworld. PrepPros ACT English Course “That” vs. “Which” <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong> <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong> that start with “that” never get commas. <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong> that start with “which” always get commas. “That” <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> are always necessary information to the sentence while “which” <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> are always unnecessary information. Correct: The dogs that live down the street are always barking. Correct: My neighbor’s dogs, which are always barking, love to play fetch. Anytime you see “which,” there must be a comma right in front of it. The exception to this rule is when “which” is part of a prepositional <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> like “on which,” “in which” or “of which.” For any of these or other similar cases, you do not use a comma. Some examples are below: Correct: The table on which the food was resting tipped over. Correct: The table, which the food was resting on, tipped over. “ing” and “ed” <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong> <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong> that start with “ing” and “ed” may or may not be separated with commas. To determine if these <strong style="color: #2563eb; text-decoration: underline;">phrases</strong>, which are called participle <strong style="color: #2563eb; text-decoration: underline;">phrases</strong>, get commas or not, determine if the information in the <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> is necessary to the sentence or not. On the ACT, “ing” and “ed” <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> most commonly appear with commas and are unnecessary information. Correct: Excited for the car ride, Jane’s bulldog started to jump up and down. Correct: Jane’s bulldog, excited for the car ride, started to jump up and down. Correct: Marcus applied for the internship, hoping that he would get the position. Correct: Judy laid down, exhausted from the long workout. “ing” and “ed” <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> can also be necessary information when the <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> is helping to specify who or what the noun is. If the <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> is necessary, there are no commas. Correct: The politician waving to the crowd is predicted to win the election. Correct: The yoga pants advertised on the front page of the website were sold out. In the first example, “waving to the crowd” is helping to specify which politician is predicted to win the election. In the second example, “advertised on the front page of the website” is specifying which yoga pants are sold out. Without these <strong style="color: #2563eb; text-decoration: underline;">phrases</strong>, we would not know which specific politician or yoga pants are being referred to. <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong> with “Who” or “Whom” When talking about a person, you must always use “who” or “whom’ to start the <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>. You can never use “that” to describe a person. “Who” or “whom” can act like a “that” or a “which” <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>, so these ones are a bit trickier with commas. We will cover “who vs. whom” later in the <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong> chapter. Incorrect: The children that were playing soccer did not notice the ice cream truck. Correct: The children who were playing soccer did not notice the ice cream truck. Correct: Dr. Roberts, who was my childhood doctor, waved to me at the supermarket. PrepPros ACT English Course Prepositional <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong> Prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> are <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> consisting ofa preposition and its object. Some of the most common prepositions on the ACT are listed below: in of to for with on at from by about as into like through after over between during before among around Prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> at the front of the sentence are always followed by a comma. We can think of these <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> as unnecessary information that we can cross out. Correct: On my way to work, | listened to my new favorite podcast. Correct: After cleaning the garage, Ralph started weeding the garden. Prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> in the middle or end of a sentence almost never have commas around them. Most prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> contain essential information that helps specify the noun that the prepositional <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> is modifying and therefore is necessary. Correct: The clothing on the bed is for vacation. The clothing on the floor is being donated. Without the prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong>, we would not know which clothing is for vacation and which is being donated. Here are some more examples: Correct: The display of affection by Lewis to his prom date made her blush. Correct: The bouquet of lilies in the vase is going to be displayed on the table. On the ACT, 99% of prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> do not have commas like the examples above, so in general you should never put commas around a prepositional <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>. Prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> in the middle or end of a sentence only get comma(s) if they contain unnecessary information. Correct: My mother, with her love of Easter, organized a massive Easter egg hunt. Incorrect: The magician had a rabbit, in his hat. Here, the first prepositional <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> is unnecessary because we already know which mother we are talking about. The second prepositional <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> is necessary since it specifies which rabbit we are talking about, so there should be no comma. Prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> that are unnecessary almost never come up on the ACT. Prepositional <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong> Practice: Underline all prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong>. Add commas if necessary. 1. Before the race began the team did a final check on the sparkplugs in the engine. 2. Donations for the campaign in Georgia broke records during the 2020 election. 3. The luxury dog bed with the ornate frame and supportive memory foam seemsa bit excessive to me. 4. During the movie Davonta’s mother went to the concession stand for some popcorn. At the corner the host stood with a microphone in her hand. PrepPros ACT English Course Punctuation for Transitional Words and <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong> Like “However” On the ACT, there are certain words and short <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> that often give students trouble on grammar questions. These words are technically called conjunctive adverbs (you do NOT need to know that). We prefer to just think of these as transitional words and <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> like “however.” Below is a list of the most commonly tested ones: However Though Therefore Instead Likewise Nevertheless Regardless Moreover Subsequently Furthermore In addition As a result Of course Otherwise For example There are three ways that these transitional words and <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> can appear in a correctly punctuated sentence. 1. At the front of the sentence followed by a comma. Correct: However, the truth would not be revealed until next week. Correct: As a result, the student was sent to the principal’s office. This is another example of unnecessary information. For both of these sentences, we can cross out the transitional word or <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> and are left with a complete sentence. 2. Separated by commas in the middle of a sentence. Correct: The truth, however, would not be revealed until next week. Correct: The student, as a result, was sent to the principal’s office. Again, this is unnecessary information. We can cross out the transitional word or <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> and read the rest of the sentence as one complete sentence. 3. Separated by a <strong style="color: #2563eb; text-decoration: underline;">semicolon</strong> and a comma when between two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong>. Correct: I expected to pay over $100 for my new hiking boots; however, I found a sale and got them for half of the original price. Correct: The player demanded his coach for more playing time; in addition, he threatened to quit if he did not get his way. If there is an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong> before and after the transitional word or <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>, we need to use a <strong style="color: #2563eb; text-decoration: underline;">semicolon</strong> and a comma for punctuation. PrepPros ACT English Course</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: How to Spot Unnecessary Information Commas Questions</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">Unnecessary information commas questions always have two defining characteristics: 1. The words in all 4 answer choices are the exact same. 2. The only difference in the answer choices is where commas are located. On the ACT, unnecessary information commas questions look like this: Electric vehicles, thousands of them, 1. Which choice makes the sentence most grammatically acceptable? already on the road in America, are one of the fastest growing industries in the world. A. NO CHANGE B. thousands, of them C. thousands of them D. thousands of, them Anytime we see a question like this, we are dealing with an unnecessary information commas question and should use the “crossing-out” trick. Be sure to read the entire sentence and pay attention to any other commas that are not in the underlined portion! Any commas that we cannot change are often important clues that we must use to find the correct answer. It is possible the other comma rules are part of a question like this as well, so make sure to read the entire sentence and look out for the sentence structure rules from Chapter 1. In the example above, the answer is C because the <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> “thousands of them already on the road in America” is unnecessary information and is separated by two commas. Backup Trick - Pauses and Commas Read the sentence out loud (or “out loud” in your head on test day) to help identify where commas are necessary. If you need to take a short pause for a breath, then you likely need a comma. Read the example below out loud and put commas where you take a short pause: Originally from Maine Mr. Johnson who has taught 8 grade biology for five years is not accustomed to winters in San Diego. Pausing is not one of our 4 commas rules! Many students mistakenly put commas anywhere they pause in sentence. At times, this is a great trick. However, this can also lead to mistakes. You should only using pausing as a backup trick when you have already used our other commas rules and still cannot tell which answer choice is correct. For the example above, the correct version is below: Correct: Originally from Maine, Mr. Johnson, who has taught 8" grade biology for five years, is not accustomed to winters in San Diego. PrepPros ACT English Course Commas Practice: Add commas where necessary. The commas in the sentences below can be any of the first 3 types of commas we have learned so far. 1. Although James demanded pizza for dinner his mother decided to make grilled chicken and broccoli instead. Mr. Alvin a very popular teacher among the students cancelled the final exam. I could not believe that Deadpool was such a popular movie. While my friend Mary thought that dolphins were the fastest animals in water she was surprised to learn it was actually a sailfish. Owls notorious for their amazing night vision have fantastic hearing at night so they can actually hear their prey from hundreds of feet away even if they cannot see it. On second thought the real reason that I did not like Scott was his lack of honesty. Some cultures though enjoy bizarre foods like bugs or snakes. After graduating Darren played for the San Diego Padres where he had a long career as a relief pitcher. Because he was the best in Dallas award-winning head chef Phillip Small owned multiple very successful restaurants. 10. My favorite author is J.K. Rowling who is famous for writing the Harry Potter series. 11. The fisherman carrying their catch walked into the Seattle fish market a place famous for how the vendors throw fish to entertain customers. 12. At first glance the cuttlefish which can change colors to blend into its surroundings looked just like the brain coral behind it and I did not see it in the tank. 13. Last summer the local flooding caused by a breach in the Reynolds Dam caused over ten thousand dollars in damage to the children’s park. 14. The basil plant for example needs full sunlight but cilantro grows best in partial sunlight. PrepPros ACT English Course Listing Commas The easiest types of commas on the English Test are listing commas. Listing commas can appear in a multiple item list and between list of multiply adjectives describing the same noun.</p>
</div>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Commas and Lists</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Listing commas are used to separate the items in a list of 3 or more items.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">I went to the grocery store to pick up chicken, cheese, and bread.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">I went to the grocery store to pick up chicken, cheese and bread.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The final comma in a list of items is called the Oxford comma. Use of the Oxford comma is stylistic, so</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">technically both lists with and without the Oxford comma are correct. As a result, the Oxford comma</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">alone will never make an answer choice correct or incorrect on the ACT. Most commonly, the ACT</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">includes the Oxford comma like the top example above.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Lists must have 3 or more items to include commas. Be sure that you do not use commas ina list of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">just two items.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">The food was both incredibly savory, and overwhelmingly satisfying.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">The food was both incredibly savory and overwhelmingly satisfying.</p>
</div>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">Mike cashed out his winnings, and then headed back to his hotel room for a nap.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">Mike cashed out his winnings and then headed back to his hotel room for a nap.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">TIP —- <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong> vs. Lists</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Be careful of the <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong> (and, but, nor, or) that can be used in a list. It is easy to confuse a two-item</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">list (which does not need a comma) with a comma + <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong> between two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">(which does need a comma). For acomma and a <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong>, make sure the second half of the sentence</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">is an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong>.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">The debate team took first place in California, and then won the grand prize for the</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">entire nation.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">The debate team took first place in California and then won the grand prize for the</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">entire nation.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">Andrew left to get his suit from the tailor but he forgot and just grabbed a</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">cheeseburger at In-n-Out.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">Andrew left to get his suit from the tailor, but he forgot and just grabbed a</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">cheeseburger at In-n-Out</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Adjective Lists with and without Commas</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Listing commas are also used to separate a list of multiple adjectives modifying the same noun.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">The wet, smelly dog was excited for the car ride home.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">The narrow, winding, treacherous roads through the mountains are difficult to drive.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">On more difficult questions, we will need to know when to use commas in lists of adjectives and when</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">commas are not necessary. Take a look at the two correct examples below to learn the difference.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">A cup of delicious, strong coffee is my favorite thing in the morning.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">My mother has lots of bright floral furniture in her living room.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The rule is a simple one: if you can switch the order of the adjectives without changing the meaning</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of the sentence, put a comma between the adjectives. If switching the order of the adjectives</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">changes the meaning of the sentence or just makes no sense, there is no comma between the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">adjectives. In short, if you can switch the adjectives, puta comma. No switch, no comma.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In the first sentence, the two adjectives “delicious” and “strong” are separated by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">acomma. Both of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">these adjectives describe the coffee on their own. We could switch the adjectives around to “strong,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">delicious coffee” without changing the meaning. Since we can switch the adjectives, we need a comma.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In the second sentence, the two adjectives “bright” and “floral” are not separated by a comma because</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">they build on one another and together modify the noun. If we switch the adjectives to “floral bright</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">furniture,” the meaning of the sentence is changed. Saying “bright floral furniture” makes senses but</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">saying “floral bright furniture” does not. Since we cannot switch the adjectives, we do not add a comma.</p>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: “The Switching Trick”</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">When you see multiple adjectives modifying a noun, switch the order of the adjectives to test whether or not you need a comma between the adjectives. Let’s use these two sentences as examples: The sweet cold ice cream was refreshing after a day at the beach. Elliot had to take off his stainless steel necklace before the swim meet. To test whether these adjectives need a comma between them, switch the order and see if the sentences still make sense. The cold sweet ice cream was refreshing after a day at the beach. Elliot had to take off his steel stainless chain before the swim meet. In the first sentence, switching “cold” and “sweet” does not change the meaning, so we need a comma. In the second sentence, “steel stainless chain” does not work, so we do not need acomma. The correct versions of both sentences are below: Correct: The sweet, cold ice cream was refreshing after a day at the beach. Correct: Elliot had to take off his stainless steel chain before the swim meet. -2?1- PrepPros ACT English Course Adjectives Lists With and Without Commas Practice: Add commas where necessary. Commas may or may not be necessary. 1. Scientists are trying to determine what animal the newly discovered fossilized bones are from. 2. The white fluffy clouds floated quickly by in the crisp evening wind. The big sun bear is known for climbing the fence and swimming in the heated community pool in the spring. HONWD The cunning sneaky red foxes got into the chicken coop again last night. The powerful liquid detergent makes my dirty sweaty clothes smell so much better. My car engine made an annoying rattling sound right before breaking down. The local hot air balloon company specializes in making colorful creative designs. Laura placed an order for Italian coffee beans and three expensive ceramic coffee mugs. PrepPros ACT English Course Commas Practice: Which answer choices are correct? Select all that apply. 1. The diners sat down. a. ordered food and b. ordered food, and c. ordered food, and they 2. will pre-order the tickets to Coachella. a. Claire, Elizabeth or Bella b. Claire, Elizabeth, or Bella Claire, Elizabeth, or Bella, 3. The forced the commander to declare war. a. invasion by the rebel forces b. invasion, by the rebel forces invasion, by the rebel forces, 4. The was given first prize by the judges. a. bright pink hot air balloon b. bright, pink hot air balloon bright, pink, hot air balloon 5. 6. 7. Nancy laid down in the a. hammock and immediately fell asleep. b. hammock, and she immediately fell asleep. c. hammock, and immediately fell asleep. Iwillneeda a. sweet cold lemonade b. sweet, and cold lemonade c. sweet, cold lemonade Itis important to to drink after the race. shelter. a. keep calm during an earthquake, and seek b. keep calm, during an earthquake, and seek c. keep calm during an earthquake and seek PrepPros ACT English Course Commas, Sentence Structure, and Unnecessary Information Now that we have learned about sentence structure and commas, let’s see the most common ways that a sentence can be structured using commas or when no commas are necessary. We will add on to the 5 rules we already learned in Chapter 1 (page 7). 1. Comma + <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong> joining 2 <strong style="color: #2563eb; text-decoration: underline;">Independent Clauses</strong> The researchers changed their approach, and they created a new medical procedure in the process. <strong style="color: #2563eb; text-decoration: underline;">Independent clause</strong> 2. <strong style="color: #2563eb; text-decoration: underline;">Independent clause</strong> <strong style="color: #2563eb; text-decoration: underline;">Independent Clause</strong> followed by Unnecessary Information <strong style="color: #2563eb; text-decoration: underline;">Phrase</strong> (comma) The researchers changed their approach, creating a new medical procedure in the process. <strong style="color: #2563eb; text-decoration: underline;">Independent clause</strong> 3. Unnecessary information Unnecessary Information <strong style="color: #2563eb; text-decoration: underline;">Phrase</strong> before <strong style="color: #2563eb; text-decoration: underline;">Independent Clause</strong> (comma) Determined to find a cure, the researchers changed their approach. Unnecessary information 4. <strong style="color: #2563eb; text-decoration: underline;">Independent clause</strong> <strong style="color: #2563eb; text-decoration: underline;">Dependent Clause</strong> followed by <strong style="color: #2563eb; text-decoration: underline;">Independent Clause</strong> (comma) Since they were determined to find a cure, the researchers changed their approach. <strong style="color: #2563eb; text-decoration: underline;">Dependent clause</strong> 5. <strong style="color: #2563eb; text-decoration: underline;">Independent clause</strong> Unnecessary Information <strong style="color: #2563eb; text-decoration: underline;">Phrase</strong>, <strong style="color: #2563eb; text-decoration: underline;">Independent Clause</strong>, Unnecessary Information <strong style="color: #2563eb; text-decoration: underline;">Phrase</strong> (2 commas) Determined to find a cure, the researchers changed their approach, creating a new medical Unnecessary information <strong style="color: #2563eb; text-decoration: underline;">Independent clause</strong> Unnecessary procedure in the process. information 6. <strong style="color: #2563eb; text-decoration: underline;">Independent Clause</strong> with Necessary Information (no comma) The researchers changed their approach by creating a new medical procedure. <strong style="color: #2563eb; text-decoration: underline;">Independent clause</strong> 7. Necessary information List with 2 items (no comma) The researchers changed their approach and created a new medical procedure in the process. *this sentence functions as one big <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong>. 8. Unnecessary Information <strong style="color: #2563eb; text-decoration: underline;">Phrase</strong>, Unnecessary Information <strong style="color: #2563eb; text-decoration: underline;">Phrase</strong>, <strong style="color: #2563eb; text-decoration: underline;">Independent Clause</strong> (2 commas) Despite the company’s efforts, which included offering a 75% refund and a replacement purse, Unnecessary information Unnecessary information Claire was still disappointed with her Chanel purse. <strong style="color: #2563eb; text-decoration: underline;">Independent clause</strong> 9. <strong style="color: #2563eb; text-decoration: underline;">Dependent Clause</strong>, <strong style="color: #2563eb; text-decoration: underline;">Independent Clause</strong>, Unnecessary Information (2 commas) As the curtains closed, the crowd stood and applauded, many with tears in their eyes. <strong style="color: #2563eb; text-decoration: underline;">Dependent clause</strong> <strong style="color: #2563eb; text-decoration: underline;">Independent clause</strong> Unnecessary information PrepPros ACT English Course These 9 sentence structures cover the most common ways that sentences appear on the ACT, but this is not a complete list. Unnecessary information can appear in the middle of clauses or other unnecessary information, so there can be many more possible sentence structures than the 9 listed on the previous page. However, if you understand the 9 most common sentence structures, you will be very well prepared to deal with even the most difficult sentences on the ACT.</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: The “1-Comma’” Rule</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">This brings us to our final sentence structure and commas rule: when a sentence has only one comma in the middle, there must be an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong> before or after the comma but not both and not neither. The only exception to this rule is a comma + <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong> linking two independent sentences. If before and after are both independent, we have a <strong style="color: #2563eb; text-decoration: underline;">comma splice</strong>. If neither is independent, we have a <strong style="color: #2563eb; text-decoration: underline;">sentence fragment</strong>. If the first half of the sentence before the comma is independent, the information after the comma must be unnecessary information (rule 2 on the previous page). If the second half of the sentence after the comma is independent, the first half must be unnecessary information (rule 3) or a <strong style="color: #2563eb; text-decoration: underline;">dependent clause</strong> (rule 4). This rule helps you answer some of the most difficult sentence structure/commas questions</p>
</div>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = '33292648-8367-4957-9ccf-6f2dfc182141'
  AND ls.section_key = 'commas-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = '33292648-8367-4957-9ccf-6f2dfc182141';

-- ============================================================
-- Chapter 3: Semicolons, Colons, Dashes, Apostrophes, and Quotation Marks
-- Lesson: punctuation
-- Lesson ID: d64c1392-8d2f-4ae5-b63a-b3df35b475ff
-- Content length: 34368 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = 'd64c1392-8d2f-4ae5-b63a-b3df35b475ff'
);

DELETE FROM lesson_sections WHERE lesson_id = 'd64c1392-8d2f-4ae5-b63a-b3df35b475ff';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  'd64c1392-8d2f-4ae5-b63a-b3df35b475ff',
  'punctuation-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 3: <strong style="color: #2563eb; text-decoration: underline;">Semicolons</strong>, <strong style="color: #2563eb; text-decoration: underline;">Colons</strong>, Dashes, <strong style="color: #2563eb; text-decoration: underline;">Apostrophes</strong>, and</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Quotation Marks</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Semicolons</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Semicolons</strong> are used to separate two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong>. On the ACT, just remember that:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Semicolon</strong> = period</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If we can replace a <strong style="color: #2563eb; text-decoration: underline;">semicolon</strong> with a period, then it is used correctly! In other words, everything before</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the <strong style="color: #2563eb; text-decoration: underline;">semicolon</strong> must stand as a complete sentence on its own, and everything after the <strong style="color: #2563eb; text-decoration: underline;">semicolon</strong> must</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">stand as a complete sentence on its own.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">My boss called me; asking that I pick up coffee for him.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">(2d half of the sentence is not an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong>)</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">After my boss called me; he asked that I pick up coffee for him.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">(1st half of sentence is not an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong>)</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">My boss called me, he asKed that I pick up coffee for him.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">(<strong style="color: #2563eb; text-decoration: underline;">comma splice</strong> - cannot connect two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong> with a comma)</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">My boss called me; he asKed that I pick up coffee for him.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">(two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong> separated by a <strong style="color: #2563eb; text-decoration: underline;">semicolon</strong>)</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Semicolons Practice:</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Exposure to sunlight is important for the human body (, / ; ) sunlight stimulates the production</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of vitamin D.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Although the President refused to negotiate directly with the Chinese government (, /; ) the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">deal was still completed before the deadline.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">3.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The dining room table was hand-crafted by Terry (, / ; ) so he was able to sell it for over four</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">thousand dollars.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">4.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Known best for his role in Forrest Gump (, /; ) Tom Hanks has been in many other famous</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">movies (, /; ) including Cast Away and Toy Story.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">5.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Completing a marathon is (, /; ) according to my friend Joe (, /; ) an incredible feat (, /; ) he</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">could not even finish the half-marathon.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">6.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Strawberries are supposed to be easy to grow (, /; ) however (, /; ) the ones in my garden die</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">every year.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">-29 -</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Colons</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A <strong style="color: #2563eb; text-decoration: underline;">colon</strong> can be used to introducea list of multiple items, a list of one item, an example, an</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">explanation, a clarification, or a definition. Examples of all of these types are below:</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;"></p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">I went to the grocery store to pick up some items for dinner: chicken, cheese, and onions.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;"></p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">I went to the market to get lunch: a turkey sandwich.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;"></p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">He got what he deserved: a one-week suspension without pay.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;"></p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chocolate milk is a great recovery drink after a hard workout: it has the carbohydrates</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">and proteins that muscles need to recover.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In order for a <strong style="color: #2563eb; text-decoration: underline;">colon</strong> to be correct, we must follow three basic rules:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The part of the sentence before a <strong style="color: #2563eb; text-decoration: underline;">colon</strong> must be an <strong style="color: #2563eb; text-decoration: underline;">independent clause</strong>. If the part of the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">sentence before the <strong style="color: #2563eb; text-decoration: underline;">colon</strong> cannot stand as a complete sentence by itself, it is always incorrect.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">The slide showing the most popular car colors in 2018: white, gray, and black.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">The slide shows the most popular car colors in 2018: white, gray, and black.</p>
</div>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">The hairstylist excelled in: cuts, coloring, and highlights.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">The hairstylist excelled in cuts, coloring, and highlights.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Everything after a <strong style="color: #2563eb; text-decoration: underline;">colon</strong> must consist of only the items in the list, an example, an explanation,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">a Clarification, or a definition. The sentence cannot continue to other topics.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">Will brought his lunch to the beach: a roast beef sandwich, and he brought his friend Joey</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">a turkey club.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;"></p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Will brought his lunch to the beach: a roast beef sandwich. He brought his friend Joey a</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">turkey club.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">3.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Colons</strong> are NEVER used with “including,”</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">not</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">“such as,” and “for example.” If you ever see a <strong style="color: #2563eb; text-decoration: underline;">colon</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">before or after any of these, it is always incorrect!</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">I went to the grocery store to pick up some items for dinner, including: chicken, cheese,</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">and onions.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">I went to the grocery store to pick up some items for dinner: including chicken, cheese,</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">and onions.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">Certain plants grow well in winter: for example garlic, leeks, radishes, and potatoes.</p>
</div>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">My favorite dishes to cook: such as chicken parmesan, cheesesteaks, and mac-and-cheese,</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">always include cheese.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">The study relied on techniques such as: direct observation and surveying.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">- 30 -</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If a list is introduced by “including” or “for example,” use a comma. This works because the list now</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">is unnecessary information. For “such as,” we can use a comma or have no comma depending on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the sentence.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">I went to the grocery store to pick up some items for dinner, including chicken, cheese,</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">and onions.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">Certain plants grow very well in winter, for example garlic, leeks, radishes, and potatoes.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">My favorite dishes to cook, such as chicken parmesan, cheesesteaks, and mac-and-cheese,</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">always include cheese.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">The study relied on techniques such as direct observation and surveying.</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Colons and Clauses</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">A <strong style="color: #2563eb; text-decoration: underline;">colon</strong> can join two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong> if the second clause after the <strong style="color: #2563eb; text-decoration: underline;">colon</strong> acts as a definition, an example, an explanation, or a clarification of the first clause. This is an advanced grammar rule that rarely appears on the ACT. Correct: Buddy got what he worked for: he really deserved that promotion. Correct: My father gave me one rule to live by: honesty is always the best policy. Since we are connecting two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong>, the examples above also would be correct with a <strong style="color: #2563eb; text-decoration: underline;">semicolon</strong>, a period, or a comma + <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong>. However, sometimes the <strong style="color: #2563eb; text-decoration: underline;">colon</strong> is the only correct option given in the answer choices. <strong style="color: #2563eb; text-decoration: underline;">Semicolons</strong>, <strong style="color: #2563eb; text-decoration: underline;">Colons</strong>, and Commas Practice: Select which punctuation is correct. Some questions may have multiple correct answers. 1. James knew exactly how to make spaghetti (, / ; /: ) boil water, add salt, and then add the pasta. 2. There’s only one way to truly get a dog’s attention (, /: / ;) food. On her college application, Leann listed some of her extracurricular activities (, /; /: ) suchas horseback riding, debate team, and volunteer work. Honda’s new compact cars are known for being fuel efficient (, /; /:) each one gets more than 25 miles per gallon. The order was requested six weeks ago (, /; / : ) we expected the sofa, chairs, and table to have arrived by now. The Italian flag has three colors (, /; /: ) green, white, and red. The directions were clear (, /; / : ) place cookie dough onto the tray, place in the oven, and cook for ten minutes. In order to examine how old the artifacts were (, /; /: ) the scientists turned to the most reliable dating method (,/ ; /: ) carbon dating (, /; /: ) which uses the properties of radiocarbon to determine the precise age of an object containing organic material. The harmonica is an easy instrument to play (, /; /: ) but it is notoriously hard to master (,/;/:) only true experts know how to hit all of notes on a harmonica. PrepPros ACT English Course Dashes Dashes can function like unnecessary information commas, parentheses, or <strong style="color: #2563eb; text-decoration: underline;">colons</strong>. Most commonly on the ACT, 2 dashes function like unnecessary information commas or parentheses to separate unnecessary information in the middle of a sentence. Correct: Residents of Washington D.C. - the capital of the United States - are still trying to get representation in Congress. Correct: Glazed donuts - even if they are unhealthy - are my favorite. Keep an eye out for pairs of dashes setting apart unnecessary information. A pair of dashes sets apart unnecessary information in the same way that a pair of commas does. It is important to remember that you cannot mix punctuation! It must be a pair of commas, a pair of dashes, or a pair of parentheses. Incorrect: Deep-dish pizza - a famous meal in Chicago, does not exist in Italy. Correct: Deep-dish pizza, a famous meal in Chicago, does not exist in Italy. Correct: Deep-dish pizza - a famous meal in Chicago - does not exist in Italy. Correct: Deep-dish pizza (a famous meal in Chicago) does not exist in Italy. On more difficult questions, a single <strong style="color: #2563eb; text-decoration: underline;">dash</strong> can act as a <strong style="color: #2563eb; text-decoration: underline;">colon</strong> introducinga list of multiple items, a list of one item, an example, an explanation, a definition, or a clarification. When acting as a <strong style="color: #2563eb; text-decoration: underline;">colon</strong>, a <strong style="color: #2563eb; text-decoration: underline;">dash</strong> must follow the same 3 <strong style="color: #2563eb; text-decoration: underline;">colon</strong> rules we just covered on page 30. Correct: You will need the following ingredients - milk, butter, flour, and eggs. Correct: In order to establish his dominance, the male lion relied on one thing - his thunderous roar. Correct: The study declared that the results were conclusive - mice will complete the maze faster if they are given soda instead of water. Challenge - Single <strong style="color: #2563eb; text-decoration: underline;">Dash</strong> Acting Like Parentheses A single <strong style="color: #2563eb; text-decoration: underline;">dash</strong> in the middle of the sentence can also separate information at the end of the sentence just like a pair of parentheses would. Correct: After three weeks, the patient was fed up with his doctor’s plan (or lack of a plan). Correct: After three weeks, the patient was fed up with his doctor’s plan - or lack of a plan. This rule has been very rarely tested on the ACT English Test in the past, but it may start to appear on future ACTs more often. - 32 - PrepPros ACT English Course Dashes Practice: All of Tommy’s favorite toys, his toy cars, his 1. 1 . NO CHANGE . toys - his toy cars, his marbles, and his marbles, and his Legos - were lost during the Legos were 1 toys - his toy cars, his marbles, and his move. Legos - were . toys: his toy cars, his marbles, and his Legos were Thailand is famous for its tourist attractions: 2. 2 . NO CHANGE >VOW attractions including: beautiful D>VOW background) - is . attractions including beautiful including beautiful beaches, fantastic food, and 2 . attractions — beautiful crystal-clear water. Known best for the amazing ability to change its . NO CHANGE . background - is colors to blend into its surroundings, the cuttlefish - one of evolution’s great mysteries . background), is (scientists still have no idea how the cuttlefish can perfectly match its body pattern to its background) is also famous for having three 3 hearts. The true breakthrough occurred when, 4, 4 . NO CHANGE . when, surprisingly enough to the surprisingly enough to the researchers, the researchers the 4 when - surprisingly enough - to the capuchin monkeys actually learned that the researchers, the . when - (surprisingly enough to the silver discs had value and could be used to buy researchers) - food. . NO CHANGE VOD Umami: an incredible complexity of flavor — is 5 often cited as why certain dishes are so delicious. Umami, an Umami-—an . Umami which is an - 33- PrepPros ACT English Course <strong style="color: #2563eb; text-decoration: underline;">Apostrophes</strong> <strong style="color: #2563eb; text-decoration: underline;">Apostrophes</strong> on the ACT have two functions: possession and contractions. Possession Rules <strong style="color: #2563eb; text-decoration: underline;">Apostrophes</strong> are most commonly used to show possession. For singular nouns, add an <strong style="color: #2563eb; text-decoration: underline;">apostrophe</strong> and the letter “s” to the end of the word to show possession. Correct: Terrence’s bike is much faster than my brother’s roller blades. For singular words that end in the letter “s,” such as “bus,” we can add an <strong style="color: #2563eb; text-decoration: underline;">apostrophe</strong> and the letter “s” or just add an <strong style="color: #2563eb; text-decoration: underline;">apostrophe</strong>. Both are technically correct. The ACT has not tested this specific rule yet, but it is good to know just in case. Correct: The bus’s driver asKed us to sit down. Correct: The bus’ driver asked us to sit down. For plural nouns that end in “s,” add the <strong style="color: #2563eb; text-decoration: underline;">apostrophe</strong> after the “s” to show possession. Correct: The boys’ jerseys were all covered in mud after the game. Some plural nouns do not end in the letter “s.” For these, add an <strong style="color: #2563eb; text-decoration: underline;">apostrophe</strong> and the letter “s” to the end of the word to show possession. Correct: Our women’s basketball team won the championship last year.</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Possessive vs. Plural</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">The ACT asks you to pick between singular possessive, plural possessive, and non-possessive, plural words. The challenge is that the words sound very similar, as you can see here: Correct: | accidentally stepped on the dog’s bone. (singular possessive) Correct: The dogs’ collars are in the basket by the door. (plural possessive) Correct: | watched as the dogs played in the yard. (non-possessive plural) Before adding an <strong style="color: #2563eb; text-decoration: underline;">apostrophe</strong>, make sure the next word is actually being possessed by the noun. In the first example, the dog is possessing the bone. In the second example, the dogs are possessing the collars. In the third example, the dogs are not possessing the played, so there is no possession. <strong style="color: #2563eb; text-decoration: underline;">Apostrophes</strong> Practice: 1. The (witch’s/witches’/witches) magic broom allowed her to fly. 2. Mary had three children, and all of the (kid’s/ kids’/kids) heights were marked on the garage door. 3. The earthquake knocked all the (door’s/doors’/doors) off their hinges. 4. The lawyer demanded that his (client’s/clients’/clients) testimony be removed from the record. 5 It should be illegal to steal (eagle’s/eagles’/eagles) eggs from their nests. PrepPros ACT English Course Possessive <strong style="color: #2563eb; text-decoration: underline;">Pronouns</strong> Possessive <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong> (his, hers, its, theirs, ours, yours) end in an “s” and do not use an <strong style="color: #2563eb; text-decoration: underline;">apostrophe</strong> to show possession. The difficulty is that words like “yours” and “ours” may look like they may need an <strong style="color: #2563eb; text-decoration: underline;">apostrophe</strong>. The correct and incorrect versions of possessive <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong> are shown below: Correct Its Incorrect It’s Its’ Hers Her’s Hers’ Yours Your''s Yours’ Ours Our’s Ours’ Theirs Their’s Theirs’ Contractions For a contraction, add an <strong style="color: #2563eb; text-decoration: underline;">apostrophe</strong>. For example, “it’s” is a contraction for “itis” and “they''re” is a contraction for “they are.”</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Possessive Pronouns vs. Contractions</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">If you need to pick between a conjunction and a possessive <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong>, plug in the complete <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> and see if it works. The cat loves playing with (its/it’s) newtoy. The cat loves playing with itis new toy. (plugin “it is”) (well that is wrong) So the answer is: Correct: The cat loves playing with its new toy. Let’s practice with the most commonly featured contractions on the ACT: “its” (possessive) vs. “it’s” (it is) I cannot believe that (its/it’s) not butter! The dog keeps chasing (its/it’s) tail. “your” (possessive) vs. “you''re” (you are) Please keep (your/you’re) feelings to yourself. (Your/you''re) not going to believe what happened on Game of Thrones! “their” (possessive) vs. “they''re” (they are) The gold medal winners all held up (their/they’re) medals for the picture. (Their/They’re) going to the opera despite the bad reviews. “whose” (possessive) vs. “who''s” (who is) I do not know (whose/who’s) socks these are. Honestly, (whose/who’s) going to pay fifteen dollars for a burrito? PrepPros ACT English Course <strong style="color: #2563eb; text-decoration: underline;">Quotation Marks</strong> <strong style="color: #2563eb; text-decoration: underline;">Quotation marks</strong> are most commonly used for direct quotes. Direct quotes that are spoken are offset by a comma. Anytime the quote is actually being spoken in some way (said, yelled, whispered, exclaimed, etc.), there is a comma before or after the quotation. Correct: Abigail said, “I will not pay until the painting is completed.” Correct: “The thunderstorm last night woke me up,” Paul whispered. Direct quotes that are not spoken have no commas. If the quote is not being spoken and is just a <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> or part of the sentence, there is no punctuation. Incorrect: My grandfather described the shells as, “beautiful souvenirs from a past life.” Correct: My grandfather described the shells as “beautiful souvenirs from a past life.” Here, the <strong style="color: #2563eb; text-decoration: underline;">quotation marks</strong> show “beautiful souvenirs from a past life” are the grandfather’s words and not the writer’s words. Since the words are not actually being spoken by the grandfather, there is no comma before the <strong style="color: #2563eb; text-decoration: underline;">quotation marks</strong>. <strong style="color: #2563eb; text-decoration: underline;">Quotation marks</strong> can be used to show a word is being used as a technical term, used in an unusual or slang way, or used as another expression that varies from standard usage. Correct: Having defined the term “contact variance,” Dr. Chen continued his lecture. Correct: Sven refers to himself as a “professional” influencer. Correct: This “revolutionary” program has left thousands of children without a basic education. Correct: Allie could smell the “fresh” fish from across the room. <strong style="color: #2563eb; text-decoration: underline;">Quotation Marks</strong> Practice: The approaching hurricane was so powerful and 1. was forecast to bring such an unprecedented UWS . NO CHANGE that The Miami Tribune told readers, that, The Miami Tribune told readers, . that The Miami Tribune told readers amount of rain that, The Miami Tribune told 1 readers “who haven''t evacuated yet to do so 1 immediately or face dire consequences.” When the children were playing a game of tag in 2 the park, the oak tree was a “home base” a safe 2 space to avoid being tagged. After the teacher saw the two boys quarreling for ; 3. A. NO CHANGE SGOW was a, “home base” was a, “home base,” was a “home base,” A. NO CHANGE B. day she asked, “ the second time that day, she asked, “what is C. day, she asked going on with you two?” D. day she asked - 36- PrepPros ACT English Course</p>
</div>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = 'd64c1392-8d2f-4ae5-b63a-b3df35b475ff'
  AND ls.section_key = 'punctuation-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = 'd64c1392-8d2f-4ae5-b63a-b3df35b475ff';

-- ============================================================
-- Chapter 4: Verbs
-- Lesson: verbs
-- Lesson ID: d1281768-ce7e-47f7-aa84-f4533d41c416
-- Content length: 25192 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = 'd1281768-ce7e-47f7-aa84-f4533d41c416'
);

DELETE FROM lesson_sections WHERE lesson_id = 'd1281768-ce7e-47f7-aa84-f4533d41c416';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  'd1281768-ce7e-47f7-aa84-f4533d41c416',
  'verbs-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 4: <strong style="color: #2563eb; text-decoration: underline;">Verbs</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Verbs</strong> questions test you on two major topics - <strong style="color: #2563eb; text-decoration: underline;">subject</strong>-<strong style="color: #2563eb; text-decoration: underline;">verb</strong> agreement and <strong style="color: #2563eb; text-decoration: underline;">verb</strong> tense. The <strong style="color: #2563eb; text-decoration: underline;">subject</strong>-</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">verb</strong> agreement questions are trickier, as at times it can be difficult to find the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and “hear” which</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">verb</strong> is correct. You will learn a few methods in this chapter to correctly answer these questions. For</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the <strong style="color: #2563eb; text-decoration: underline;">verb</strong> tense questions, the approach is much more straightforward: read for context and go with the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">answer that sounds correct.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Subject</strong>-<strong style="color: #2563eb; text-decoration: underline;">Verb</strong> Agreement</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Whenever you see a <strong style="color: #2563eb; text-decoration: underline;">verbs</strong> question on the ACT, your first job is to find the <strong style="color: #2563eb; text-decoration: underline;">subject</strong>. The <strong style="color: #2563eb; text-decoration: underline;">subject</strong>, which</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">is the person, place, or thing doing the action, is usually at the beginning of the sentence.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The <strong style="color: #2563eb; text-decoration: underline;">subject</strong> of the sentence must agree with the <strong style="color: #2563eb; text-decoration: underline;">verb</strong>. If the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> is singular, the <strong style="color: #2563eb; text-decoration: underline;">verb</strong> must be</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">singular, and if the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> is plural, the <strong style="color: #2563eb; text-decoration: underline;">verb</strong> must be plural. In simple sentences when the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">verbs</strong> are right next to each other, it will be easy to select the right <strong style="color: #2563eb; text-decoration: underline;">verb</strong>:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Cats (loves/love) to sit in empty boxes.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">My dog (barks/bark) at the mailman every day.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Easy right? Unfortunately, <strong style="color: #2563eb; text-decoration: underline;">verbs</strong> questions will not be this easy on test day. The ACT increases the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">difficulty by putting distance between the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and the <strong style="color: #2563eb; text-decoration: underline;">verb</strong>. The farther away the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> is from the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">verb</strong>, the more likely we are to say the <strong style="color: #2563eb; text-decoration: underline;">verb</strong> incorrectly. Remember, what sounds right is not always</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">right. You cannot trust your ear on <strong style="color: #2563eb; text-decoration: underline;">subject</strong>-<strong style="color: #2563eb; text-decoration: underline;">verb</strong> agreement questions.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">There are 3 ways the ACT will try to trick you on <strong style="color: #2563eb; text-decoration: underline;">subject</strong>-<strong style="color: #2563eb; text-decoration: underline;">verb</strong> agreement:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Unnecessary information <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> between the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and <strong style="color: #2563eb; text-decoration: underline;">verb</strong>.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Unnecessary information <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> never contain the <strong style="color: #2563eb; text-decoration: underline;">subject</strong>. Cross out any unnecessary</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">information <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> to find the <strong style="color: #2563eb; text-decoration: underline;">subject</strong>.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Tortoises, known to live to over 150 years old, (is/are) sold at the local pet shop.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The committee, composed of two former CEOs, one politician, three lawyers, and two doctors,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">(vote/votes) to delay the release of the new product until next quarter.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> between the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and <strong style="color: #2563eb; text-decoration: underline;">verb</strong> (most common).</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> never contain the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> or the <strong style="color: #2563eb; text-decoration: underline;">verb</strong>. Cross out prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">find the <strong style="color: #2563eb; text-decoration: underline;">subject</strong>.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The entire group of students (is/are) organizing a bake sale to raise money.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The pod of dolphins (hunts/hunt) as a team.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">3.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Group nouns that sound plural but are singular.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Group nouns (class, committee, team) are singular even though the group consists of more than one</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">person/thing.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The sheep herd (waits/wait) to be sheared.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The jury (agrees/agree) that the defendant deserves to be put in jail.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">- 44 -</p>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Read the Subject and Verbs Side-by-side</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">Once you find the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and <strong style="color: #2563eb; text-decoration: underline;">verb</strong>, read them next to each other and ignore the information in between. This will help you more easily identify which one is correct. A large percentage of the voters, many of whom are under the age of 30, (prefer/prefers) the new housing proposal. Cross out any unnecessary information and prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong>. A large percentage efthe voters, manyehyhem are under the age of 30, (prefer/prefers) the new housing proposal. The <strong style="color: #2563eb; text-decoration: underline;">subject</strong> is “percentage.” Put the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and <strong style="color: #2563eb; text-decoration: underline;">verb</strong> next to each other and ignore the rest of the sentence. Correct: A percentage prefers the new housing proposal. Practice: 1. The entire class of first graders (cheer/cheers) when the ice cream truck arrives. 2. The proposal for planting a new grove of orange trees (requires/require) an approval of 80% to pass. 3. With the budget finally approved, the new system for payroll, scheduling, and human resources that took three years to build (is/are) finally going live next month.</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Plug in “he/she/it” for singular subject and “they” for plural subjects</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">Sometimes it is difficult to “hear” which <strong style="color: #2563eb; text-decoration: underline;">verb</strong> correctly matches with the <strong style="color: #2563eb; text-decoration: underline;">subject</strong>. For singular words, plug in “he,” “she,” or “it” for the <strong style="color: #2563eb; text-decoration: underline;">subject</strong>. For plural words, plug in “they” for the <strong style="color: #2563eb; text-decoration: underline;">subject</strong>. With this trick, we will be able to easily hear which <strong style="color: #2563eb; text-decoration: underline;">verb</strong> properly agrees with the <strong style="color: #2563eb; text-decoration: underline;">subject</strong>. The exact time for the meeting with the softball coach and location for the showcase (has/have) not been finalized. If we read the sentence as is, it is difficult to tell which <strong style="color: #2563eb; text-decoration: underline;">verb</strong> fits. After crossing out the prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong>, the sentence looks like this: The exact time forthe meeting seftball with the eeach and location fertheshewease (has/have) not been finalized. The <strong style="color: #2563eb; text-decoration: underline;">subjects</strong> are “time” and “location,” so the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> is plural. Replace the <strong style="color: #2563eb; text-decoration: underline;">subjects</strong> with “they.” They (has/have) not been finalized. Now it’s easy...we can tell that “have” is correct. Try this tip with the examples below: 1. 2. Each of the runners who complete the marathon (wins/win) a medal. The complex designs and intricate needlework (makes/make) Julia’s carpets the most popular in the entire art market. - 45 - PrepPros ACT English Course <strong style="color: #2563eb; text-decoration: underline;">Subject</strong>-<strong style="color: #2563eb; text-decoration: underline;">Verb</strong> Agreement Practice: 1. The stable hand hired by the farm owners (groom/grooms) the horses every morning. 2. Both of the apartments (is/are) never vacant during the summer. 3. Ned, the winner of the gold medal in the 200-meter breaststroke, and Claire, the bronze medal winner in the 1000-meter freestyle, (was/were) featured on the cover of the swimming magazine. 4. Gold coins and silver bars, all once thought to be lost forever, (was/were) found in the sunken pirate ship. 5. Each of the girl scouts (sells/sell) delicious Thin Mint cookies. 6. The cast of the award-winning show (takes/take) a bow after the show ends. 7. Killer whales, which are the top predators in the ocean, (have/has) been documented hunting great white sharks. 8. The overall rating from the reviewers of the new restaurant, which is scored on categories including the food quality and the ambiance, (is/are) worse than before the renovation and reopening. 9. To help raise money to save the farm, Janet donates her old clothes, Mike organizes a bake sale, and Chloe and Bill (has/have) a yard sale. 10. One of the recipes for chocolate chip cookies in the cookbooks (call/calls) for brown sugar. 11. Flamingos, famous for their bright pink feathers, actually (get/gets) their color from a diet of shrimp and algae. 12. The entire group of seagulls (is/are) following the child who keeps dropping french fries. 13. One of the symptoms (make/makes) Dr. Smith think that Andy just has the common cold. 14. Freediving, a very unique and uncommon sport, (require/requires) divers to hold their breath for long periods of time. - 46 - PrepPros ACT English Course <strong style="color: #2563eb; text-decoration: underline;">Verb</strong> Tense For questions on <strong style="color: #2563eb; text-decoration: underline;">verb</strong> tense, trust your ear. As a native English speaker, you will know what sounds right or wrong in the sentence as long as you read for context. To find which tense is correct, read the previous sentence(s) and look for other <strong style="color: #2563eb; text-decoration: underline;">verbs</strong>. Make sure to match the tense in the rest of the paragraph. On the ACT, do not pick a complicated tense (has run, had ran, had been running, would have run, etc.) when a simple tense works. Last year, Margot (designs/designed/will design) a new line of summer dresses. Before he votes tomorrow, Dale (researches/research/will research) each candidate’s positions on the major issues. The referee stopped the fight after the boxers (refuses/refused /will refuse) to follow the rules. In English, we use the perfect tense when there are multiple timelines in a sentence. The perfect tense is when we say “has” or “have” or “had” with the <strong style="color: #2563eb; text-decoration: underline;">verb</strong>. If you read for context and read the entire sentence, we should be able to “hear” when we need to use the perfect tense. Many surfers enjoy paddling out, but few (rode/have ridden) waves over ten feet tall. While the group of entrepreneurs claimed to all be successful, only a few (will start/have started) their own businesses. The bison (ate/had been eating) when the lions began their attack. By the beginning of next year, the doctors (finish/finished/will have finished) their preliminary research on lung cancer. The conditional tense describes what would or could happen in the future. The kind of <strong style="color: #2563eb; text-decoration: underline;">verb</strong> conjugation that we need depends on how likely the outcome is to actually happen (probable, improbable, impossible). Again, the Key here is to trust your ear and go with what sounds right to you. If|make the free throw, we (will win/would win/would have won) the game. IfImade the free throw, we (will win/would win/would have won) the game. If|had made the free throw, we (will win/would win/would have won) the game. The ACT also tests you on irregular <strong style="color: #2563eb; text-decoration: underline;">verbs</strong>. For these <strong style="color: #2563eb; text-decoration: underline;">verbs</strong>, just trust your ear and go with what sounds correct to you. Before the show (began/begun), the lights were dimmed. The deliveryman had (rang/rung) the doorbell before dropping off the package. By the time the meal was over, the boy had (ate/eaten) an entire bag of popcorn and had (drank/drunk) a liter of cola. PrepPros ACT English Course</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Irregular Verbs</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">- “a” vs. “u” versions aw ai ely For many of the most difficult irregular <strong style="color: #2563eb; text-decoration: underline;">verbs</strong>, there is an “a” version (ex: swam) and a “u” version (ex: swum). We use these <strong style="color: #2563eb; text-decoration: underline;">verbs</strong> incorrectly all of the time, so using your ear and trying to hear which one sounds correct is difficult. All you need to do is remember the simple rules below: With “has,” “have,” or “had” ===> Use the “u” version (perfect tense) Correct: Before you arrived, I had swum some laps. With no “has,” “have,” or “had” c=" Use the“a” version (past tense) Correct: I swam some laps this morning. The most commonly tested irregular <strong style="color: #2563eb; text-decoration: underline;">verbs</strong> following this pattern are below. <strong style="color: #2563eb; text-decoration: underline;">Verb</strong> Past Tense Perfect Tense begin began has/have/had begun drink drank has/have/had drunk sink sank has/have/had sunk swim swam has/have/had swum run ran has/have/had run sing sang has/have/had sung <strong style="color: #2563eb; text-decoration: underline;">Verb</strong> Tense Practice: 1. The car accident on the freeway delayed my commute and (causes/caused) me to be late for the job interview. 2. After playing basketball for two hours, Jimmy (devours/devoured) a carnitas burrito and two fish tacos. 3. Itis impossible to believe that Andrew (tells/told) his parents what really happened. 4. Before! woke up, Chris had already (swam/swum) twenty laps. 5. Ifyou had ordered the tickets last week, they (would arrive/would have arrived) by now. 6. The sign asked that you (be/are) polite to the waiters and tip well. 7. The dance competition (began/begins) at 10am, and the awards ceremony then starts at 4pm. 8. If] finish all of my homework, I (will get/get/would get) to go to the new Star Wars movie. 9. The local pizza parlor (closes/closed) its doors for good last year. 10. Mary went to the mall and (buys/bought/buyed) a new outfit for her graduation party. 11. The ship had already been (sank/sunk) before the battle was finished. 12. If the rebels had won the war, the world would (of/have) been a very different place. - 48 - PrepPros ACT English Course</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: How to Spot Subject-Verb Agreement vs. Verb Tense Questions</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">Spotting <strong style="color: #2563eb; text-decoration: underline;">verbs</strong> questions in general is pretty easy: the answer choices will have different forms of the same <strong style="color: #2563eb; text-decoration: underline;">verb</strong>. Knowing we are dealing with a <strong style="color: #2563eb; text-decoration: underline;">verbs</strong> question is a good start, but to answer the question correctly we need to know if we are being tested on <strong style="color: #2563eb; text-decoration: underline;">subject</strong>-<strong style="color: #2563eb; text-decoration: underline;">verb</strong> agreement or <strong style="color: #2563eb; text-decoration: underline;">verb</strong> tense. <strong style="color: #2563eb; text-decoration: underline;">Subject</strong>-<strong style="color: #2563eb; text-decoration: underline;">verb</strong> agreement questions always have one defining characteristic: 1. <strong style="color: #2563eb; text-decoration: underline;">Verbs</strong> in the answer choices have singular and plural versions. Look for “is” vs. “are,” “has” vs. “have,” “was” vs. “were,” and any other <strong style="color: #2563eb; text-decoration: underline;">verbs</strong> with a singular, like “runs,” vs. a plural, like “run.” Anytime you see <strong style="color: #2563eb; text-decoration: underline;">verbs</strong> that have a singular and plural version in the answer choices, the question is testing you on <strong style="color: #2563eb; text-decoration: underline;">subject</strong>-<strong style="color: #2563eb; text-decoration: underline;">verb</strong> agreement. The addition of solar panels to the roof of a house in Nevada make the house 1. Which choice makes the sentence most grammatically acceptable: ? A. NO CHANGE on average 20% more energy efficient. B. makes C. have made D. were making In this example, B is correct because the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> “addition” is singular. The only <strong style="color: #2563eb; text-decoration: underline;">verb</strong> that matches with “addition” is “makes.” Even though there are different tenses in the answer choices, we only need to use <strong style="color: #2563eb; text-decoration: underline;">subject</strong>-<strong style="color: #2563eb; text-decoration: underline;">verb</strong> agreement to find the correct answer. <strong style="color: #2563eb; text-decoration: underline;">Verb</strong> tense questions always have two defining characteristics: 1. <strong style="color: #2563eb; text-decoration: underline;">Verbs</strong> in the answer choices are in different tenses. For example, if “requires,” “required,” and “will require” are in the answer choices, the question is testing you on tense. 2. <strong style="color: #2563eb; text-decoration: underline;">Verbs</strong> in the answer choices do NOT have singular and plural versions. If there are not options for singular and plural versions, <strong style="color: #2563eb; text-decoration: underline;">subject</strong>-<strong style="color: #2563eb; text-decoration: underline;">verb</strong> agreement is not being tested. The girl scouts are hosting a bake sale 2. Which choice makes the sentence tomorrow to raise money. To get ready, most grammatically acceptable:? Adya would need to bake two trays of A. NO CHANGE C. needed D. needs ; blondies and a box of donut holes. B. was needing In this example, D is correct because the <strong style="color: #2563eb; text-decoration: underline;">verb</strong> must be present tense. In the previous sentence, the <strong style="color: #2563eb; text-decoration: underline;">verb</strong> “are” is present tense, so we know this sentence should also be in present tense. Answer choices A, B, and C are in the wrong tense. - 49 - PrepPros ACT English Course</p>
</div>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = 'd1281768-ce7e-47f7-aa84-f4533d41c416'
  AND ls.section_key = 'verbs-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = 'd1281768-ce7e-47f7-aa84-f4533d41c416';

-- ============================================================
-- Chapter 5: Pronouns
-- Lesson: pronouns
-- Lesson ID: f7aadb91-0ce8-4e09-b7bb-5909d4481e6b
-- Content length: 23295 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = 'f7aadb91-0ce8-4e09-b7bb-5909d4481e6b'
);

DELETE FROM lesson_sections WHERE lesson_id = 'f7aadb91-0ce8-4e09-b7bb-5909d4481e6b';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  'f7aadb91-0ce8-4e09-b7bb-5909d4481e6b',
  'pronouns-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 5: <strong style="color: #2563eb; text-decoration: underline;">Pronouns</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Pronouns</strong> are words that stand in for a person, place, or thing. On the ACT, you will need to know how to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">select the proper <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> based on case (“he’” vs. “him” or “who” vs. “whom”), make sure that a <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">agrees with the word it is replacing, and spot ambiguous <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong>.</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Pronoun Case</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">To start, let’s work on <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> case. <strong style="color: #2563eb; text-decoration: underline;">Pronouns</strong> have two cases: <strong style="color: #2563eb; text-decoration: underline;">subject</strong> and object. The <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong>’s role</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in the sentence (<strong style="color: #2563eb; text-decoration: underline;">subject</strong> or object) dictates which type of <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> is correct.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Subject</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Singular</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Object</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Plural</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Singular</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Plural</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">I</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">We</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Me</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Us</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">You</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">You</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">You</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">You</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">He/She/It</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">They</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Him/Her/It</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Them</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Who</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Who</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Whom</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Whom</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For simple <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> case questions, it will be easy to tell which <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> is correct. Just trust your ear!</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">(They/them) went to the street festival on Saturday afternoon.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The man handed (we/us) a stack of flyers.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">One type of more advanced <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong> question occurs when the <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> is in a list. Since we often say</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">pronouns</strong> in a list incorrectly, we may no longer be able to simply “hear” which <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> is correct. Fora</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> ina list, ignore the other items in the list and just read the <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> to tell which is</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">correct.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The policeman asked to speak to my friends and (me/]).</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">His girlfriend and (he/him) went to the hockey game.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The entire gang and (they/them) are responsible for this.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">At times, <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong> are also included in a prepositional <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>. <strong style="color: #2563eb; text-decoration: underline;">Pronouns</strong> in prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">always are in the object case. Remember this rule, as it can be difficult to tell which on is correct by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">just using your ear.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The bet between Joe and (I/me) was for just five dollars.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">To (who/whom) was the award given to?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Jerry claims that a great rivalry exists among Tim, Scott, and (he/him).</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Who vs. Whom</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">You need to know the difference between “who” and “whom,” as it is tested on almost every ACT.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Technically, “who” is the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> of the sentence, and “whom” is the object. But knowing that is not very</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">helpful. Here’s the trick you need to memorize:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If you can replace the word with “he,” “she,” or “they,” use “who.”</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If you can replace the word with “him,” “her,” or “them,” use “whom.”</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">You may need to rearrange the sentence a bit, but this trick will work for any who vs. whom question.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Try with the examples below:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">(Who/whom) stole the apple off the teacher’s desk?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">To (who/whom) should I address this letter?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">(Who/whom) do you want to the win the Bachelor?</p>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Who vs. Whom in Phrases</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">On more difficult questions, who/whom can also be used to introduce a <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> describing a person. Using our normal “he/him” trick does not work if we look at the entire sentence. However, if we just look at the <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> on its own, the trick still works. The child (who/whom) | invited to the party was very noisy. The child (who/whom) was running down the street was very noisy. If we plug in “he” or “him” to the entire sentence, neither sounds correct. To tell if it is “who” or “whom,” only look at the <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>, which is in the brackets below. The child | (who/whom) I invited to the party| was very noisy. The child | (who/whom) was running down the street| was very noisy. If we just look at the <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>, can we say, “he | invited to the party?” No, but we could say, “I invited him to the party,” so the first one must be “whom.” If we look at the second example, we can say, “he was running down the street,” so “who” is correct. The second trick involves looking at the next word after “who” or “whom.” If the word right after is a <strong style="color: #2563eb; text-decoration: underline;">verb</strong>, use “who.” If the word right after is a noun, use “whom.” In the first example, “I” is a noun, so we use “whom.” In the second example, “was” is a <strong style="color: #2563eb; text-decoration: underline;">verb</strong>, so we use “who.” 1. On my way to the farmer’s market, I ran into my childhood best friend, (who/whom) | had not seen in years. 2. I could not believe how much the florists (who/whom) opened up a shop down the street charge for their roses. 3. After the investigation, the owner fired the employee (who/whom) the private investigator identified as the one responsible for stealing over $5,000 of company funds.</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Reflexive Pronouns</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">Reflexive <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong>, which use the “-self” ending (myself, yourself, himself...), can only be used when the <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> is referring back to a person or thing elsewhere in the sentence or in previous sentences. Incorrect: I grabbed three donuts and put them in a box for me. Correct: I grabbed three donuts and put them in a box for myself. Incorrect: | asked my coworker to put three donuts in a box for myself. Correct: | asked my coworker to put three donuts in a box for me. PrepPros ACT English Course Possessive <strong style="color: #2563eb; text-decoration: underline;">Pronouns</strong> At times, <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong> will also be used to show possession. It is important that these <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong> still match with the word(s) that are being replaced (we will cover this more on the next page). Possessive Nouns Singular Possessive Adjectives Plural Singular Plural Mine Ours My Our Yours Yours Your Your His/Hers/Its Theirs His/Her/Its Their Incorrect: The entire team went on stage to pick up their trophy. Correct: The entire team went on stage to pick up its trophy. The <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> here is referring back to “team,” which is singular. In order to match correctly, we must use the singular <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> “its.” Try with the examples below: Emmanuel and James came back home after forgetting (his/their) phones. Thousands of tourists travel to Egypt each year to see (its/their) ancient pyramids. <strong style="color: #2563eb; text-decoration: underline;">Pronoun</strong> Case Practice: 1. Before jumping in the pool, please ask (I/me/myself) for permission. 2. According to Mary, the three-act play was directed by John and (she/her). 3. The restaurant manager asked that an order of spaghetti and meatballs be set aside for (him/himself) after he put some of his favorite cheese on a plate for (him/himself). 4. Inorder to lift the table, my mother asked Eric, Rich, and (me/I) for help. 5. (Who/whom) is the best chess player in the world right now? 6. People often travel to casinos in Las Vegas to test (their/they’re/your) luck at the blackjack tables and to see (its/their) famous skyline. 7. After pouring (me/myself) a glass of lemonade, I went out to sit by the pool. 8. The painting, which was completed by Rachel and (she/her/herself), was praised by critics for (its /it’s /its’) shading. 9. All we ask is that you return the puppies to (we/us/ourselves) as soon as possible. 10. Terry, (who/whom) is the top ranked basketball recruit in the city, always dominates the player (who/whom) he is guarded by. 11. The team captain, the coaches, and (they/them) all gathered together for a team photo. 12. We were all wondering (who/whom) had pulled the senior class prank and (who/whom) the principal had called to his office. PrepPros ACT English Course <strong style="color: #2563eb; text-decoration: underline;">Pronoun</strong> Agreement <strong style="color: #2563eb; text-decoration: underline;">Pronouns</strong> must agree with the <strong style="color: #2563eb; text-decoration: underline;">antecedent</strong>, which is the noun that the <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> is replacing. Whenever you see a <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> on the ACT, you must find exactly who or what it is referring to. The <strong style="color: #2563eb; text-decoration: underline;">antecedent</strong> can be in the same sentence as the <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> or in a preceding sentence. The <strong style="color: #2563eb; text-decoration: underline;">antecedent</strong> can also be anywhere in the sentence (unnecessary information, prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong>, etc). <strong style="color: #2563eb; text-decoration: underline;">Pronouns</strong> must match the <strong style="color: #2563eb; text-decoration: underline;">antecedent</strong> in terms of plurality and gender. A singular <strong style="color: #2563eb; text-decoration: underline;">antecedent</strong> must have a singular <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong>; a plural <strong style="color: #2563eb; text-decoration: underline;">antecedent</strong> must have a plural <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong>. A male <strong style="color: #2563eb; text-decoration: underline;">antecedent</strong> must have a male <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong>; a female <strong style="color: #2563eb; text-decoration: underline;">antecedent</strong> must have a female <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong>. on Incorrect: Correct: Each attendee atthe partyraised Singular J Each attendee at the party raised his or her drink for a toast. Singular Correct: their drink for a toast. Plural The guests Singular atthe partyraised their drinks for a toast. Plural Plural <strong style="color: #2563eb; text-decoration: underline;">Pronouns</strong> Agreement Practice: 1. Ben or Tom will give (his/their) presentation to the class today. 2. The popularity of food trucks can be credited to (its/their) convenience and unique menu items. Each member of the women’s track team improved (her/their) time. Jane and Sarah, after a long conversation with another group of hikers on the trail, said (she/they) were too tired to go any farther today. Please remind each student to bring in (his or her/their) signed participation form for tomorrow’s field trip. The puppy lost (its/it’s/its’) ball in the ocean. A person (who/whom) is committed to (their/his or her) dreams can achieve (it/them). The writers soon found that all of (his or her/their) writing skills and fantastic stories were useless unless (he or she/they) could get signed by a publishing company. The leaf cutter ant, which is native to Central and South America, is best known for (its/their) methodical cutting and carrying of small pieces of leaves to the nest. 10. If you plan to give a presentation on the importance of accurate data, (one/you) should check (one’s/your) facts first. PrepPros ACT English Course Ambiguous <strong style="color: #2563eb; text-decoration: underline;">Pronouns</strong> For a <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> to be correct, we must know exactly who or what it is referring to. If we do not know exactly who or what a <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> is referring to, the <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> is ambiguous and is always incorrect. Incorrect: Stephen smiled at his father as he threw the ball. We do not know if “he” is referring to Stephen or his father, so “he” is ambiguous and incorrect. Correct: Stephen smiled at his father as his father threw the ball. Even though it may seem redundant, replacing “he” with “his father” fixes the ambiguous <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> error. Incorrect: Even though the order had not yet shown up, the librarian insisted that she had ordered some. We have no idea what “some” is referring to in this sentence. Correct: Even though the order had not yet shown up, the librarian insisted that she had ordered four copies of the new book.</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Spotting Ambiguous Pronouns Questions</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">Anytime you see a <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> in the answer choices, check to see if the <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> is ambiguous. Here are all of the <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong> you should Keep an eye out for: he, him, his, she, her, hers, they, them, their, it, its, this, that, these, those, some, none. On the ACT, ambiguous <strong style="color: #2563eb; text-decoration: underline;">pronouns</strong> questions look something like this: Of the 2020 inductees to the Rock & Roll 1. Which choice makes the sentence most grammatically acceptable? Hall of Fame, which include Biggie Smalls, Nine Inch Nails and its lead singer Trent A. Reznor, and the Doobie Brothers, it is B. they are C. D. widely agreed that he is the most famous. Ted sat down with his dinner: three pulled 2. NO CHANGE Biggie is itis Which choice makes the sentence pork sliders with a side of french fries. most grammatically acceptable? James, Ted’s younger brother, immediately A. NO CHANGE C. one of them. D. some. asked for one. B. aslider. In the first example, the answer is C because we need to specify who is the most famous. “He,” “they,” or “it” could be referring to multiple people or things, so answer choices A, B, and D are all ambiguous. The only answer choice that is specific is C. In the second example, the answer is B since it specifies what James is asking for. If we just say James asked for “one” or “one of them” or “some,” we do not know if James wants a slider or a French fry. PrepPros ACT English Course Ambiguous <strong style="color: #2563eb; text-decoration: underline;">Pronouns</strong> Practice: When the owner of Pizza Port greets a TD > 1 customer, he always smiles. 1 OM After the student handed in the overdue homework assignment to the teacher, she 2 NO CHANGE greets a customer, the owner always smiles. greets a customer, they always smile. . greets customers, he always smiles. D>TOW NO CHANGE the teacher, walking the teacher, the teacher walks . the teacher, the student walked walked away angrily. 2 Not long after Chris and Andrew got a $15,000 loan from the bank for their restaurant, it went 3 bankrupt. A friend of mine recently had a conversation with a marine that changed his view on the war. 4 TOW> NO CHANGE he one . the restaurant TOW> NO CHANGE marine that changed my friend''s view marine, who changed their views . marine, changing his view The human brain is a miracle when it comes to working through complex problems. It is also the reason that most people are really bad investors. Our brains are not good at calculating probabilities or handling uncertainty. When we see stocks decreasing in value compared to other investments in our portfolio, we want to sell them immediately, but 5 that is often the wrong decision. In addition, we SO W NO CHANGE those the stocks it are genetically wired for risk aversion. The humans that took less risk survived and passed down their genes. These, I believe, are why many people mismanage their money. LSGOW NO CHANGE This risk aversion, I believe, is Those are, I believe, . It, I believe, is PrepPros ACT English Course</p>
</div>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = 'f7aadb91-0ce8-4e09-b7bb-5909d4481e6b'
  AND ls.section_key = 'pronouns-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = 'f7aadb91-0ce8-4e09-b7bb-5909d4481e6b';

-- ============================================================
-- Chapter 6: Misplaced Modifiers
-- Lesson: modifiers
-- Lesson ID: e57a463a-2257-4a89-966f-ad34b9a4b102
-- Content length: 15878 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = 'e57a463a-2257-4a89-966f-ad34b9a4b102'
);

DELETE FROM lesson_sections WHERE lesson_id = 'e57a463a-2257-4a89-966f-ad34b9a4b102';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  'e57a463a-2257-4a89-966f-ad34b9a4b102',
  'modifiers-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 6: <strong style="color: #2563eb; text-decoration: underline;">Misplaced Modifiers</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A <strong style="color: #2563eb; text-decoration: underline;">misplaced modifier</strong> is a word, <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>, or clause that is improperly separated from the noun</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">that it modifies. A <strong style="color: #2563eb; text-decoration: underline;">misplaced modifier</strong> leads to a sentence that has an incorrect or unintended meaning.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Misplaced modifiers</strong> are hard to spot because we usually know what the sentence is really supposed to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">be saying.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">Consistently erupting, Jack loves taking pictures of the Old Faithful geyser at</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Yellowstone National Park.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">So what''s wrong here? The modifier “consistently erupting” is supposed to be modifying the Old</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Faithful geyser, but instead it is modifying Jack! Let’s hope Jack is not consistently erupting. When a</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">sentence begins with a modifying <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>, the <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> must modify the very first noun that follows the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">comma. There are two ways to fix this error:</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">Consistently erupting, the Old Faithful geyser at Yellowstone National Park is one of</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Jack’s favorite things to take pictures of.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">Since it is consistently erupting, Jack loves taking pictures of the Old Faithful geyser at</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Yellowstone National Park.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In the first correct version, the modifier “consistently erupting” is right next to and correctly modifying</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the Old Faithful geyser. In the second correct version, we added a <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> “it” to change the modifier</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">from a <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> to a <strong style="color: #2563eb; text-decoration: underline;">dependent clause</strong>, so we now know that the geyser is erupting. When we get to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">“Jack,” there is no longer any confusion about who or what is erupting.</p>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: “Next-door Neighbor Rule”</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">For a modifier to be properly placed, it must be right “next-door” to the noun it is describing. Modifiers can be at the beginning, middle, or end of a sentence. If the modifier is at the beginning of the sentence, the first noun after must be the word being modified. cn Running from the police, Eric hopped the fence and hid underneatha car. If the modifier is in the middle or end of the sentence, it must be modifying the noun directly before it. Dr. Anderson, a world-renown surgeon, fixed my broken leg. ar, - 62 - PrepPros ACT English Course Front of the Sentence Modifiers with a Comma On the ACT, most <strong style="color: #2563eb; text-decoration: underline;">misplaced modifiers</strong> questions have a modifier at the front of the sentence separated by a comma. For this type of question, consider who or what the modifier is describing and then make sure that person, place, or thing is the first noun in the rest of the sentence. Incorrect: Not popular since the early 1980s, the documentary about mullets explored the origins of the wildly popular hairstyle. Correct: Not popular since the early 1980s, mullets were the topic of a recently released documentary. The modifier is “not popular since the early 1980s,” so the next noun must be whoever or whatever the modifier is describing. In the incorrect version, the next noun “documentaries” is not what we are supposed to be describing. The correct version puts the described word “mullets” right next-door to the modifier at the beginning of the sentence. Practice: 1. Addressing the group of reporters gathered A. NO CHANGE B. the police chief said he did not know if the outside of the police station, there was no suspect was in custody or not. 1 indication that the police chief knew if the suspect C. no indication of whether or not the suspect was in custody was given by the police was in custody or not. chief. 1 D. the police chief''s report gave no indication of whether the suspect was in custody or not. | 2. A brand new approach to automobile A. Ford, installed the first moving assembly manufacturing, Henry Ford and Ford Motor line in 1913. 2 Company installed the first moving assembly line C. the first moving assembly line was ; 2 mn 1913. NO CHANGE B. the Ford Motor Company, owned by Henry installed by Henry Ford and Ford Motor 3 Company in 1913. D. 1913 was the first year that Henry Ford and the Ford Motor Company installed the moving assembly line. . NO CHANGE Designed for beauty and symmetry, Laura 3 Saunders created a modern art museum that is an By designing it for beauty and symmetry . A design with beauty and symmetry architectural marvel. >gow Both beautiful and symmetric - 63 - PrepPros ACT English Course Middle or the End of the Sentence Modifier with Commas A modifier in the middle or at the end of the sentence must be directly after whoever or whatever it is modifying. Incorrect: The research team, which arrived at their nesting grounds early this year, tracked the movements of the blue storks. Correct: The research team tracked the movements of the blue storks, which arrived at their nesting grounds early this year. Correct: The research team, which tracked the movement of the blue storks, noted that the birds arrived at their nesting grounds early. In the incorrect example, the modifier “which arrived at their nesting grounds early this year” was incorrectly modifying the research team. However, this modifier should be modifying the blue storks, so the first correct example moves the modifier to the end of the sentence right “next-door” to the blue storks. We could also fix the incorrect sentence by changing the modifier in the middle as is displayed in the second correct example. The new modifier “which tracked the movement of the blue storks” now properly modifies the research team. Practice: There was little doubt that the new technique for 1. A. NO CHANGE B. which had been caught earlier this deep frying the cod, which uses less oil and a new morning 1 type of batter, results in a more crispy and less C. one that is popular among locals D. using hotter oil and smaller pieces of fish 1 oily breading. Modifiers without Commas In some questions, the modifier will not be separated by any commas. These are the harder to spot, but the “next-door neighbor’ rule still applies. Keep an eye out for <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> starting with “that” or words ending in “-ing” and “-ed.” Incorrect: A tarantula bit one of my coworkers that had a huge, hairy body. Correct: A tarantula that had a huge, hairy body bit one of my coworkers. The incorrect sentence has the modifier “that had a huge, hairy body” describing the coworker and not the tarantula. By moving the modifier right next to the tarantula in the correct sentence, we are describing the tarantula as having a huge, hairy body. Practice: 1. Three businessmen talked on the balcony A. NO CHANGE B. celebrating the deal talked on the balcony 1 smoking cigars. smoking cigars to celebrate the deal, : C. smoking cigars talked to celebrate the deal on the balcony. D. smoking cigars to celebrate the deal talked on the balcony. - 64 - PrepPros ACT English Course Prepositional <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong> as Modifiers Prepositional <strong style="color: #2563eb; text-decoration: underline;">phrases</strong> can also act as modifiers and must be placed in the correct position to have the intended meaning. These occur less commonly on the ACT and are often difficult to spot. Incorrect: Paul and his father talked about the baseball game in the stands. Correct: In the stands, Paul and his father talked about the baseball game. In the first sentence, the baseball game is in the stands. We know that’s not the case, so we need to move the prepositional <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> “in the stands” to the beginning of the sentence. Now, the <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> is describing Paul and his father as being in the stands. Practice: 1. The Subaru dealership sold the new car to the The best placement for the underlined portion would be: buyer with automatic parallel parking. A. where it is now. 1 B. after the word Subaru. C . after the word sold. D . after the word car. Modifiers in Parentheses Modifiers that are set apart in parentheses must be placed directly “next-door” to whoever or whatever they are modifying. <strong style="color: #2563eb; text-decoration: underline;">Phrases</strong> in parentheses will always be in the middle or end of the sentence, so the word being described must be right before the parentheses. This type of <strong style="color: #2563eb; text-decoration: underline;">misplaced modifier</strong> is very rarely test on the ACT. Incorrect: The scientists tried to develop a new method to make their self-pollination study (where pollen from the same plant arrives at the stigma of the flower) completely free of pollen contamination from other plants. Correct: The scientists tried to develop a new method to study self-pollination (where pollen from the same plant arrives at the stigma of the flower) completely free of pollen contamination from other plants. The modifier in the parentheses is defining what self-pollination is, so self-pollination must be directly before the parentheses, as it is in the correct sentence. In the incorrect sentence, the word study is directly before the parentheses, so the modifier in parentheses is incorrectly describing the selfpollination study. Practice: Plant the roses in a sunny spot in the backyard 1. A. NO CHANGE and be sure to water them every day just after B. recommended the expert gardener sunrise, the expert gardener recommended (who C. was the expert gardener’s recommendation had been growing and selling his own roses for D. the gardener, who was an expert, recommended the past two decades). -65 - PrepPros ACT English Course</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: How to Spot Misplaced Modifiers Questions</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">The hardest part about <strong style="color: #2563eb; text-decoration: underline;">misplaced modifiers</strong> questions is spotting them! Most students think these questions are about phrasing or flow and never realize what they are actually being tested on. <strong style="color: #2563eb; text-decoration: underline;">Misplaced modifiers</strong> questions always have at least one and, very often, both of the following defining characteristics: 1. All 4 answer choices are similar in length, and the answer choices have the same words scrambled in different orders. Anytime you see 4 long answer choices that are all saying the same general thing in different orders, you are very likely looking at a <strong style="color: #2563eb; text-decoration: underline;">misplaced modifiers</strong> question. 2. The first word varies in the answer choices. If the first word or group of words is different in 3 or 4 of the answer choices, the question is most likely testing you on <strong style="color: #2563eb; text-decoration: underline;">misplaced modifiers</strong>. On the ACT, <strong style="color: #2563eb; text-decoration: underline;">misplaced modifiers</strong> questions will look like this: Analyzing the ultraviolet camera footage, scientists discovered that fish communicate using UV coloration and 1. Which choice makes the sentence most grammatically acceptable? . signaling. NO CHANGE fish were found to communicate using UV coloration and signaling. C. it was discovered by scientists that fish communicate using UV coloration and signaling. D. UV coloration and signaling were discovered as a way fish communicate. Whenever you spot a <strong style="color: #2563eb; text-decoration: underline;">misplaced modifiers</strong> question, identify the modifier and ask yourself, “who or what is the modifier describing?” In this example, the modifier is “analyzing the ultraviolet camera footage.” Who or what is analyzing the camera footage? The scientists! Since “the scientists” must be right next-door, the answer is A. - 66 - PrepPros ACT English Course</p>
</div>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = 'e57a463a-2257-4a89-966f-ad34b9a4b102'
  AND ls.section_key = 'modifiers-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = 'e57a463a-2257-4a89-966f-ad34b9a4b102';

-- ============================================================
-- Chapter 7: Parallel Structure
-- Lesson: parallel-structure
-- Lesson ID: 09a41283-2118-41cb-8d51-bd161b67c16d
-- Content length: 18864 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = '09a41283-2118-41cb-8d51-bd161b67c16d'
);

DELETE FROM lesson_sections WHERE lesson_id = '09a41283-2118-41cb-8d51-bd161b67c16d';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  '09a41283-2118-41cb-8d51-bd161b67c16d',
  'parallel-structure-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 7: <strong style="color: #2563eb; text-decoration: underline;">Parallel Structure</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Parallel structure</strong> is the repetition of a chosen grammatical form within a sentence as items are</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">listed or compared. The items in a list can be words, <strong style="color: #2563eb; text-decoration: underline;">phrases</strong>, or clauses. Whenever we see items ina</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">list or a comparison between items, we must make sure the items have <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong>.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Parallel Structure</strong> and Lists</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The items in any list must be written with the same grammatical form. [tems must be all nouns, all</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">verbs</strong>, and so on. When lists are written with proper <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong>, the sentence flows more</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">smoothly and sounds better. As a result, many students can “hear” which answer choice is the correct</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">without even realizing they are being tested on <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong>.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">To protect her fragile hands, Julia will not rake the leaves, wash the dishes, and has</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">decided she will not take out the trash.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">To protect her fragile hands, Julia will not rake the leaves, wash the dishes, or take out</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the trash.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">Elon Musk is known for self-driving cars and pioneering the SpaceX program.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">Elon Musk is known for self-driving cars and the SpaceX program.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">Elon Musk is known for manufacturing self-driving cars and pioneering the SpaceX</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">program.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;"></p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">After calling in sick to school, Charlie hoped to get excused from class, receiving an</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">extension on his homework assignment, and spend the afternoon watching movies at</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">home.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">After calling in sick to school, Charlie hoped to get excused from class, receive an</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">extension on his homework assignment, and spend the afternoon watching movies at</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">home.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">No matter how simple or complex the items in the list are, they must be parallel. Lists of 3 or more</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">items are easier to spot, and you will be able to more obviously “hear” which answer choice is correct or</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">incorrect. Lists of 2, however, are more difficult to spot and can often sound good to us even if they are</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">not parallel. Be aware of <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong> anytime you seea list of 2 on the ACT, as this is a topic</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">that tricks many students when it appears on test day.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Parallel Structure</strong> and Lists Practice: Correct the <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong> errors in the sentences below:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Theresa was expecting a visit from her mother, so she made her bed, cleaning the shelves of the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">refrigerator, and swept the kitchen floor.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Attempting to sneak out of the house, Janice grabbed her phone, her purse, and wallet and then</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">was climbing out the back window.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">3.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chevy, our golden retriever, chews on the furniture, he barks at the neighbors, and thinks his</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">shadow is real.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">4.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">It’s harder to lift the couch by myself than lifting it with some friends.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">I would rather get free music with commercials than paying for music with no commercials.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Special Cases for <strong style="color: #2563eb; text-decoration: underline;">Parallel Structure</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In addition to lists, there are also certain other special cases for <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong>. These special cases,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">which are officially called correlative conjunctions, must have the same grammatical structure for both</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">parts of the conjunctions.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Keep an eye out for these ones on the ACT:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Neither</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">nor __</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Either or __</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Notonly___ butalso___</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Both ___ and</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In all of these special cases, the “blanks” must be parallel. For example:</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">My mother not only took away my keys but also she locked them in the safe.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">My mother not only took away my keys but also locked them in the safe.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In the incorrect example, “took away my Keys” is not parallel with “she locked them in the safe.” Since</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the “she” is not in the first part, it cannot be in the second part. In the correct version, “took away my</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">keys” is parallel with “locked them in the safe.”</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Special Cases for <strong style="color: #2563eb; text-decoration: underline;">Parallel Structure</strong> Practice: Correct the <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong> errors.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Bothascholar and quite athletic, Sylvia got a scholarship to row crew in college.</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The news report is neither accurate nor written fairly.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">3.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Neither scolding the child nor attempts to bribe him helped to calm him down.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">4.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The haunted house not only required participants to sign a waiver before entering but also</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">asking them to turn their phones off for the entire experience.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">5.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Forms of payment accepted are either cash or sending payment with Venmo.</p>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: How to Spot Parallel Structure and Lists Questions</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;"><strong style="color: #2563eb; text-decoration: underline;">Parallel structure</strong> and lists questions always have the following defining characteristic: 1. The sentence includes a list of two or more items. Anytime there is a list, we will need to consider <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong>. Keep an eye out for list of two, as these can be difficult to notice errors with <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong>. On the ACT, <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong> and lists questions look like this: The responsibilities of the coffee packer 1. Which choice makes the sentence most position included packing the coffee beans, grammatically acceptable? which have been roasted, and keeping the A. work area around the machine clean and a Kept. orderly. D. having kept NO CHANGE In the example above, the answer is A. The list of two responsibilities, “packing the beans” and “keeping the work area around the machine clean and orderly” must be parallel. “Packing” and “keeping” match and have correct <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong>. PrepPros ACT English Course <strong style="color: #2563eb; text-decoration: underline;">Parallel Structure</strong> and Comparisons For any comparisons, the items being compared must be parallel. Comparing without proper <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong> can lead to unintended or incorrect comparisons. In other words, make sure you are comparing apples to apples and not apples to oranges. A common fix to <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong> mistakes is to add “those of” or “that of” or other similar variations before the second item in the comparison. If you ever see “those of’ or “that of’ or a similar variation in a question, the question is likely testing <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong>. If you see any commonly used comparison words such as “more,” “less,” “better,” “worse,” and “than,” there is a comparison, and you will need to consider <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong>. Incorrect: The fried chicken at Chick-fil-A is much better than Popeyes. Correct: The fried chicken at Chick-fil-A is better than the fried chicken at Popeyes. Correct: The fried chicken at Chick-fil-A is better than Popeyes’ fried chicken. Correct: The fried chicken at Chick-fil-A is better than that at Popeyes. <strong style="color: #2563eb; text-decoration: underline;">Parallel Structure</strong> and Comparisons Practice: Correct the <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong> errors. 1. Unlike Mr. Rodriguez, Mr. Allen’s math exams are curved, so everyone gets a better grade. 2. There was no mystery greater than the left shoe thief at my high school. 3. Walter stands by his bold claim that Michael Jordan’s shoes are better than all current NBA players. 4. Unlike the 2014 World Cup in Brazil, the teams at the 2010 World Cup in South Africa had to deal with the constant noise from the vuvuzela horns.</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: How to Spot Parallel Structure and Comparisons Questions</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;"><strong style="color: #2563eb; text-decoration: underline;">Parallel structure</strong> and comparison questions always have at least one of the following defining characteristics: 1. A commonly used comparison word such as “more,” “less,” “better,” “worse,” and “than’ is in the answer choices or in the sentence. Anytime there is a comparison, we need to keep an eye out for <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong>. 2. The <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> “that of’ or “those of’ or a similar variation (“that in, nt those at,” etc.) is in any of the answer choices. On the ACT, <strong style="color: #2563eb; text-decoration: underline;">parallel structure</strong> and comparisons questions look like this: Victoria concluded that the juiciness of fuji apples is a better indicator for the flavor than for a bosc pear. 1. Which choice makes the sentence most grammatically acceptable? A. NO CHANGE B. than of bosc pears. C. than for that of bosc pears. D. then bosc pears. Whenever you see a comparison, make sure you know exactly what is being compared. I[n this example, the comparison is between “the juiciness of fuji apples” and “the juiciness of bosc pears.” We must compare the juiciness of the fuji apple to the juiciness of the bosc pears and not to the pear itself. The only answer that does this is C, where “that of bosc pears” is short for “the juiciness of bosc pears.” i PrepPros ACT English Course</p>
</div>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = '09a41283-2118-41cb-8d51-bd161b67c16d'
  AND ls.section_key = 'parallel-structure-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = '09a41283-2118-41cb-8d51-bd161b67c16d';

-- ============================================================
-- Chapter 8: Other Miscellaneous Topics
-- Lesson: misc-topics
-- Lesson ID: 1ab3ef29-b3fb-43b2-a5f5-964a7c8422ce
-- Content length: 35786 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = '1ab3ef29-b3fb-43b2-a5f5-964a7c8422ce'
);

DELETE FROM lesson_sections WHERE lesson_id = '1ab3ef29-b3fb-43b2-a5f5-964a7c8422ce';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  '1ab3ef29-b3fb-43b2-a5f5-964a7c8422ce',
  'misc-topics-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 8: Other Miscellaneous Topics</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">There are a variety of other miscellaneous topics that appear on the English Test. We will cover all of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">these topics in this chapter.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Commonly Confused Words</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT will test you on many commonly confused words. The most common one of these on the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">English Test is “affect” vs. “effect.”</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Affect vs. Effect</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">“Affect” is a <strong style="color: #2563eb; text-decoration: underline;">verb</strong>, meaning to act on or produce a change in. “Effect” is a noun, meaning the result</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of a change. As long as you remember this rule, “affect” vs. “effect” questions should be easy!</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">Sunshine and palm trees affect my mood positively.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">Sunshine and palms trees have a positive effect on my mood.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Many of the other most commonly confused words that appear on the ACT are below. There are many</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">more beyond the ones listed. If you ever see a word choice question and are unsure, just go with your</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">gut...most of the time you will be correct!</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Advice - an opinion or</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">recommendation (noun)</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Conscience - sense of right or wrong</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Lie - to lie down</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Conscious - awake</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Lay - to place</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Council - a group that advises</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Lose - to misplace or not win</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Counsel - to advice</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Loose - to not be tight</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Complement - something that</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Indifferent - not caring</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Advise - to recommend or give</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">information (<strong style="color: #2563eb; text-decoration: underline;">verb</strong>)</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Accept - to receive</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Except - to take or leave out</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">completes</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Allusion - an indirect reference</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Illusion - a false perception of reality</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Passed - to have moved beyond</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Desert - dry, sandy region</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Allowed - permitted to happen</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Aloud - out loud</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Not different - the same</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Compliment - to praise</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Past - gone by in time</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Dessert - a sweet course at the end</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of a meal</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Precede - to come before</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Proceed - to go forward</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Ascent - climb</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Dual - having two parts</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Assent - agreement</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Duel - a fight between 2 people</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Assure - to remove doubt</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Elicit - to draw or bring out</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Ensure - to make certain a thing will</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Illicit - illegal</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Principle - arule</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Principal - head of a school</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Their - possessive <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">or won''t happen</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Insure - to get insurance</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">There - indicates location</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Emit - to send out, to throw off</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">They’re - they are</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Omit - to leave out</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Beside — next to</h3>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Besides — in addition</h3>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Breath — inhalation/exhalation of air</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Through - into or out of, continuing</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Eminent - famous, respected</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Threw - past tense of throw</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Imminent - ready to take place</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Thorough - careful or complete</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Breathe - to inhale or exhale</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Though - however</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Farther - refers to physical distance</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Cite - to quote or document</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Thru - abbreviated form of through</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Further - moreover</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Sight - vision</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Site - position or place</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in time</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Immanent - inherent or intrinsic</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">To - toward</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Lead - a type of metal</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Too — also</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Led - past tense oflead</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Two - 2</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Than vs. Then</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">“Than” is only used for comparisons. “Then” has multiple meanings: it can be used when dealing with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">time, to mean “in addition to,” or with “if/then” statements. When you see “then” and “than” on the test,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">just remember use this quick rule: for a comparison, use “than.” Otherwise, use “then.”</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">I think that chocolate with almonds is much better then ice cream.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">I think that chocolate with almonds is much better than ice cream.</p>
</div>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">I need to call my mother, and than we can leave.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">I need to call my mother, and then we can leave.</p>
</div>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Have vs. Of</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Many people often mistakenly use “could of” or “would of.” This is always incorrect! To be correct, we</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">need to use “could have” or “would have.” The words “could,” “should,” “would,” and “might” should</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">always be followed by “have” not “of’. The reason we often make this mistake is the contraction</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">“could’ve,” which is short for “could have,” is often pronounced like “could of.”</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">If we left the show earlier, we could of avoided the traffic in the parking lot.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">If we left the could earlier, we could have avoided the traffic in the parking lot.</p>
</div>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Countable vs. Non-countable Adjectives</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A countable noun is something that you can count, such as bottles of milk or hours. A noncountable</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">noun is something that cannot be expressed in a plural form, such as time or air. Certain adjectives,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">shown in the table below, can only be used to modify countable or non-countable nouns.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Countable</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Non-Countable</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">number</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">amount</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">many</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">much</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">fewer</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">less</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">few</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">little</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">The amount of time to make lunch depends on the number of ingredients in the dish.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">I do not place much significance on how many trophies and athlete has won.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">Skim milk has fewer calories than whole milk, so I drink less whole milk than skim milk.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">I can spare only a little time for this. I need to leave in a few minutes.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Active Voice</strong> vs. <strong style="color: #2563eb; text-decoration: underline;">Passive Voice</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Active voice</strong> means that the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> of the sentence is performing the <strong style="color: #2563eb; text-decoration: underline;">verbs</strong> action. On the other hand,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">passive voice</strong> means that the <strong style="color: #2563eb; text-decoration: underline;">subject</strong> is acted on by the <strong style="color: #2563eb; text-decoration: underline;">verb</strong>. On the ACT, never select an answer</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">choice that is in <strong style="color: #2563eb; text-decoration: underline;">passive voice</strong>; <strong style="color: #2563eb; text-decoration: underline;">active voice</strong> is always better than <strong style="color: #2563eb; text-decoration: underline;">passive voice</strong>.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Active Voice</strong>: I picked up the pencil.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Passive Voice</strong>: The pencil was picked up by me.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Active Voice</strong>: The police chief announced the list of suspects.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Passive Voice</strong>: The list of suspects was announced by the police chief.</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Prepositional Idioms</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In the English language, idioms are expressions that are stated in a certain way because it is a widely</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">accepted practice. Certain words must be paired with certain prepositions to be correct.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">Bobby was afraid by the dark</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">Bobby was afraid of the dark.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">These questions do not come up often on the ACT, and you should not study this topic unless you</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">have mastered all other chapters in this course. When prepositional idioms do appear on the ACT, read</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the entire sentence and rely on what sounds best to you. To help you, below is a list of some</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">prepositional idioms that may appear on the ACT.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">You should not try memorize this entire this! It is not the best use of your study time. If you do struggle</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">on these, study the list below and hopefully it will help you better know what sounds best if you do face</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">any questions on this on test day.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Anxious about</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Aim at</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Admire for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Ask about</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Arrive at</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Advocate for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Be curious about</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Effective at</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Ask for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Bring about</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Succeed at</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Blame for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Complain about</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Celebrated for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Think about</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Accompanied by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Compensate for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Wonder about</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Amazed by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Criticize for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Worry about</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Assisted by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Endure for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Confused by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Famous for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Advise against</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Encouraged by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Known for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Argue against</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Followed by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Last for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Decide against</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Impressed by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Look for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Rebel against</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Shocked by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Meant for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Surprised by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Named for/after</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Celebrate as</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Struck by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Necessary for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Known as/to be</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Puzzled by</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Prized for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Recognized as</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Responsible for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Regard as</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Recognize for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">See as</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Strive for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Serve as</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Tolerance for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">View as</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Strive for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Wait for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Watch for</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">- 79</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">-</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Abstain from</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Accuse of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Able to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Across from</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Appreciation of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Accustomed to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Defend from/against</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Approve of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Adapt to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Different from</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Capable of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Admit to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Discourage from</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Certain of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Agree to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Excuse from</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Composed of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Belong to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Obvious from</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Comprised of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Central to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Protect from/against</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Consist of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Conform to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Refrain from</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Cure of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Come to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Deprive of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Critical to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Adept in/at</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Family of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Devoted to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Confident in</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In recognition of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Exposed to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Engage in/with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In hope of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Listen to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Interested in</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">(in)capable of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Native to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Involved in</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Independent</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Object to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Success in/at</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Knowledge of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Opposed to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Take pride in</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A means of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Point to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A model of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Prefer</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Enter into</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Mastery of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Recommend ___to__</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Look into</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A native of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Relate to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Inquire into</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">An offer of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Reluctant to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Insight into</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Principles of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Reply to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Read into</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Proponent of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Similar to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Remind of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Threaten to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Based on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Source of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Unique to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Depend on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Take advantage of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Draw on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Understanding of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Biased toward</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Focus on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Use of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Have a tendency toward</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Impose on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A wealth of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">to __</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Agree with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Insist on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Modeled on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Argue over</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Contrast with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Reflect on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Control over</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Correlate with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Rely on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Talk over</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Consistent with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Think over</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Familiar with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Identify with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Interfere with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Occupied with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Sympathize with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Trust with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">- 80</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">-</p>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = '1ab3ef29-b3fb-43b2-a5f5-964a7c8422ce'
  AND ls.section_key = 'misc-topics-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = '1ab3ef29-b3fb-43b2-a5f5-964a7c8422ce';

-- ============================================================
-- Chapter 9: Grammar Review
-- Lesson: grammar-review
-- Lesson ID: 1b265e10-62cb-4361-be0d-52de6b0d63f8
-- Content length: 930 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = '1b265e10-62cb-4361-be0d-52de6b0d63f8'
);

DELETE FROM lesson_sections WHERE lesson_id = '1b265e10-62cb-4361-be0d-52de6b0d63f8';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  '1b265e10-62cb-4361-be0d-52de6b0d63f8',
  'grammar-review-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 9: Grammar Review</p>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = '1b265e10-62cb-4361-be0d-52de6b0d63f8'
  AND ls.section_key = 'grammar-review-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = '1b265e10-62cb-4361-be0d-52de6b0d63f8';

-- ============================================================
-- Chapter 10: Redundancy, Wordiness, and Irrelevance
-- Lesson: redundancy
-- Lesson ID: 180cc54f-7ac9-46a1-8e6b-ec8bb9f8341d
-- Content length: 12149 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = '180cc54f-7ac9-46a1-8e6b-ec8bb9f8341d'
);

DELETE FROM lesson_sections WHERE lesson_id = '180cc54f-7ac9-46a1-8e6b-ec8bb9f8341d';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  '180cc54f-7ac9-46a1-8e6b-ec8bb9f8341d',
  'redundancy-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 10: <strong style="color: #2563eb; text-decoration: underline;">Redundancy</strong>, <strong style="color: #2563eb; text-decoration: underline;">Wordiness</strong>, and Irrelevance</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">On the English Test, <strong style="color: #2563eb; text-decoration: underline;">wordiness</strong>, <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>, and irrelevance are common errors. Anytime we see</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>, <strong style="color: #2563eb; text-decoration: underline;">wordiness</strong>, or irrelevant information in an answer choice, it is always incorrect; the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">shortest and simplest answer choice is almost always correct. The goal is for the sentence to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">express the same information in the shortest grammatically correct way. If anything is wordy,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">redundant, or irrelevant, get rid of it.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Redundancy</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The most common mistake on these types of questions is <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>. To check for <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>, read</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the sentence itself and the sentence(s) before to check for any repeated information.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">After two years of traveling, Jerome finally returned back home.</p>
</div>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">After two years of traveling, Jerome finally returned home.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">By definition, if Jerome is returning, he is coming back. Therefore, we do not need the word “back” in</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the sentence.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">In Sweden, there are about 300,000 to 400,000 moose, many of which stand over seven</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">feet tall, roaming freely in the Swedish forests.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">In Sweden, there are about 300,000 to 400,000 moose, many of which stand over 7 feet</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">tall, roaming freely in the forests.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The sentence already specifies the moose are in Sweden, so saying “Swedish” is redundant.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">Wordiness</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Sentences can also be unnecessarily wordy without <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>. For these questions, pick the answer</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">choice that uses the fewest words to express the same idea.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">The ancient Italian sculptures were donated to a cultural institution supporting</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">intellectual endeavors related to renaissance art.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">The ancient Italian sculptures were donated to a museum devoted to renaissance art.</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Irrelevance</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Incorrect answer choices may include information that is irrelevant to what is being discussed in the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">passage. Irrelevant information most often appears as a long and wordy answer choice and is</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">always incorrect.</p>

<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #991b1b; margin: 0 0 0.5rem 0;">✗ Incorrect</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #991b1b;">To win the game, Ricky needed to make both free throws. Players are not allowed to step</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in the lane during a free throw attempt. He made the first one. The entire gym was quiet</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">as he stepped to the line for the second.</p>

<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">
  <p style="font-weight: 700; color: #065f46; margin: 0 0 0.5rem 0;">✓ Correct</p>
  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #065f46;">To win the game, Ricky needed to make both free throws. He made the first one. The</p>
</div>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">entire gym was quiet as he stepped to the line for the second.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">-90 -</p>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: How to Spot Redundancy, Wordiness, and Irrelevance Questions</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">The ACT now directly tell you if a question is testing you on <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>, <strong style="color: #2563eb; text-decoration: underline;">wordiness</strong>, or irrelevance. <strong style="color: #2563eb; text-decoration: underline;">Redundancy</strong>, <strong style="color: #2563eb; text-decoration: underline;">wordiness</strong>, and irrelevance questions will ask you one of the following questions: 1. Which choice is the least redundant in context? 2. Which choice best avoids <strong style="color: #2563eb; text-decoration: underline;">wordiness</strong> and <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong> in context? On the ACT, <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>, <strong style="color: #2563eb; text-decoration: underline;">wordiness</strong>, and irrelevance questions look like this: 1. The July 4th “Walk for Wags” event, a Which choice is the least redundant in context? fundraising event for local dog shelters, raised over $10,000 this year. A. NO CHANGE B. this year for local dog shelters. C. in July of this year. D. for local dog shelters. In the example above, the answer is A. The sentence already said the event is for local dog shelters, so B and D are incorrect. The sentence also already states the event is in July, so Cis incorrect. As we said at the beginning of this chapter, always pick the shortest and simplest answers choice, as the shortest answer choice is always correct for these types of questions.</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Never Use The “Short Answer Is Correct” Trick on Grammar Questions</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">When you are working on grammar questions, do not always pick the shortest answer! On grammar questions, there are times when the shortest answer is incorrect. Make sure that you are applying the grammar rules. Remember, you are only being tested on <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong> when the ACT directly asks you to pick the least redundant answer choice. One example of when the shortest answer is not correct is below: 1. The answer choice is an ambiguous <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong>. If the answer is so short that we do not know exactly who or what it is referring to, it is incorrect! Keep an eye out for these words: they, them, it, this, that, these, those, some, none. 1. Which choice makes the sentence most Freddie became so fascinated with coral grammatically acceptable? after watching the documentary about A, NO CHANGE B. some of them to after finished the growing coral colonies in home aquariums that he ordered some. documentary. C. afew to his home. D. some coral colonies. In this example, “some” is an ambiguous <strong style="color: #2563eb; text-decoration: underline;">pronoun</strong> and is incorrect. “Some” could be referring to the coral colonies or the aquariums. The only answer that specifies what Freddie is ordering is D. The question asks which choice is grammatically acceptable, so this is not a <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>/conciseness questions. -91 - PrepPros ACT English Course</p>
</div>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = '180cc54f-7ac9-46a1-8e6b-ec8bb9f8341d'
  AND ls.section_key = 'redundancy-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = '180cc54f-7ac9-46a1-8e6b-ec8bb9f8341d';

-- ============================================================
-- Chapter 11: Word Choice
-- Lesson: word-choice
-- Lesson ID: a3029ba0-38fe-4ae9-ae80-3550c93b157b
-- Content length: 4157 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = 'a3029ba0-38fe-4ae9-ae80-3550c93b157b'
);

DELETE FROM lesson_sections WHERE lesson_id = 'a3029ba0-38fe-4ae9-ae80-3550c93b157b';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  'a3029ba0-38fe-4ae9-ae80-3550c93b157b',
  'word-choice-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 11: Word Choice</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Word choice questions on the ACT ask you to select which word is correct. For these questions, read</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the sentence and sentence(s) before and after for context to tell which word is correct.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Some word choice questions may test your knowledge of the definitions of words as well. Ifa question</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">is testing your vocabulary, do not assume the hardest vocabulary word is correct. Sometimes, the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">ACT puts challenging words on the test that you need to know and other times the challenging words</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">are incorrect answers. On test day, do the best you can with the words that you know. If you know</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">that a word works, pick that word no matter how easy or hard the word seems. If you do not know a</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">word and have to guess, take your best guess and move on.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Word choice questions will always have 4 words with no punctuation or the same punctuation and will</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">ask you, “which choice is clearest and most precise in context?” An example is below:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Adding solar panels to your house can</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">;</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">;</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">;</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">emit huge savings on energy bills each</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which choice is the clearest and most</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">precise in context?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A. NO CHANGE</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">month.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">B. claim</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">C. gift</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">D. result in</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The best way to answer these questions is to read for context, plug each word into the sentence, and</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">pick the one that makes the most sense in the context. Here, the correct answer is “D” since “result in” is</p>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = 'a3029ba0-38fe-4ae9-ae80-3550c93b157b'
  AND ls.section_key = 'word-choice-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = 'a3029ba0-38fe-4ae9-ae80-3550c93b157b';

-- ============================================================
-- Chapter 12: Transitions
-- Lesson: transitions
-- Lesson ID: b8d75097-0dfe-4281-865a-02e0f97af8f4
-- Content length: 21625 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = 'b8d75097-0dfe-4281-865a-02e0f97af8f4'
);

DELETE FROM lesson_sections WHERE lesson_id = 'b8d75097-0dfe-4281-865a-02e0f97af8f4';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  'b8d75097-0dfe-4281-865a-02e0f97af8f4',
  'transitions-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 12: <strong style="color: #2563eb; text-decoration: underline;">Transitions</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT tests your reading comprehension skills by asking you to select the correct <strong style="color: #2563eb; text-decoration: underline;">transition</strong>. All of the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">answer choices in these questions will be grammatically correct, so you are being tested on your ability</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">to read for context and select the correct <strong style="color: #2563eb; text-decoration: underline;">transition</strong>.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">To answer these questions, you should use the following approach:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Ignore the <strong style="color: #2563eb; text-decoration: underline;">transition</strong> currently in the passage. Cover up the <strong style="color: #2563eb; text-decoration: underline;">transition</strong> word and read the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">sentence(s) before and after without the <strong style="color: #2563eb; text-decoration: underline;">transition</strong>.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Determine the relationship between the sentences.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Look at the answer choices and select the <strong style="color: #2563eb; text-decoration: underline;">transition</strong> that correctly relates the ideas. Some</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">questions have an option with no <strong style="color: #2563eb; text-decoration: underline;">transition</strong>. If no <strong style="color: #2563eb; text-decoration: underline;">transition</strong> is necessary, select the option with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">no <strong style="color: #2563eb; text-decoration: underline;">transition</strong>.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">There are two types of <strong style="color: #2563eb; text-decoration: underline;">transitions</strong> questions:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">All 4 answer choices are <strong style="color: #2563eb; text-decoration: underline;">transitions</strong>. If all 4 answer choices are a <strong style="color: #2563eb; text-decoration: underline;">transition</strong>, you are only being</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">tested on selecting the correct <strong style="color: #2563eb; text-decoration: underline;">transition</strong>. These questions look like this:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">From a distance, the ocean looked pretty calm</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which <strong style="color: #2563eb; text-decoration: underline;">transition</strong> word is the most logical</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">today even though a storm had arrived last</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in context?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">night. Under the circumstances, the scene</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A. NO CHANGE</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">was much more chaotic with big waves and</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">B. For instance,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">strong riptides.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">C. Up close,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">D. For example,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">As we can see with the example above, all 4 answer choices are grammatically correct. If we only read</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the second sentence, there is no way to know which answer choice is correct. Once we read the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">sentences together, it becomes obvious that C is correct. Since the previous sentence started with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">“from a distance,” we need to <strong style="color: #2563eb; text-decoration: underline;">transition</strong> to the second sentence of “up close.”</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">3 answer choices are <strong style="color: #2563eb; text-decoration: underline;">transitions</strong>, and 1 has no <strong style="color: #2563eb; text-decoration: underline;">transition</strong>. If we see a question like this, the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">ACT is asking us to consider which <strong style="color: #2563eb; text-decoration: underline;">transition</strong> is correct and whether a <strong style="color: #2563eb; text-decoration: underline;">transition</strong> is even necessary.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Most often, the correct answer is the one that takes away the <strong style="color: #2563eb; text-decoration: underline;">transition</strong> entirely.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Stepping out on the island’s port on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which <strong style="color: #2563eb; text-decoration: underline;">transition</strong> word, if any, is the most</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Monday, the new couple debuted their</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">logical in context?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">own classic take on beach attire. As</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">a</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A. NO CHANGE</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">result, the actor opted for a classic white</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">B. In other words, the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">tee and board shorts while his model</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">C. Consequently, the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">counterpart wore a floral print coverup</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">D. The</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">and strappy sandals.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In this example, there is no <strong style="color: #2563eb; text-decoration: underline;">transition</strong> necessary, so the correct answer is “D.” Whenever faced with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">whether the <strong style="color: #2563eb; text-decoration: underline;">transition</strong> is necessary or not, ask yourself if the <strong style="color: #2563eb; text-decoration: underline;">transition</strong> properly links the sentences.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Again, to do this properly, you must read for context.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">- 96 -</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Categories of <strong style="color: #2563eb; text-decoration: underline;">Transitions</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Below, we have listed the most common <strong style="color: #2563eb; text-decoration: underline;">transitions</strong>. We have divided these <strong style="color: #2563eb; text-decoration: underline;">transitions</strong> into categories</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">based on the type of relationship between the ideas.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Additive <strong style="color: #2563eb; text-decoration: underline;">Transitions</strong> - providing additional support or evidence:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">additionally</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">further</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">again</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">furthermore</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">moreover</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of course</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">also</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in addition</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">then</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">as well</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">indeed</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">what is more</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">besides</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in fact</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Resulting <strong style="color: #2563eb; text-decoration: underline;">Transitions</strong> - connecting an issue to the consequences:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">accordingly</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">for that reason</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">therefore</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">as aresult</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">hence</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">then</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">because</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in order to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">thus</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">consequently</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">since</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">to this/that end</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Contrasting <strong style="color: #2563eb; text-decoration: underline;">Transitions</strong> - connecting two things by focusing on their differences:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">after all</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">however</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">otherwise</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">although</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in contrast</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">rather</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">regardless</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">at the same time</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in spite of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">besides</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">instead</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">still</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">but</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">meanwhile</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">though</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">by contrast</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">nevertheless</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">yet</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">conversely</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">nonetheless</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">whereas</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">despite this</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">on the contrary</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">even so</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">on the other hand</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Agreement/Similar <strong style="color: #2563eb; text-decoration: underline;">Transitions</strong> - connecting two things by focusing on their similarities:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">also</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in fact</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">likewise</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">by the same token</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">indeed</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of course</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">correspondingly</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">just as</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">similarly</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Summary <strong style="color: #2563eb; text-decoration: underline;">Transitions</strong> - providing a summary of the ideas in the previous sentence(s):</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">after all</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in other words</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">thus</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">briefly</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in short</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">to conclude</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">finally</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in sum</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">to summarize</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in conclusion</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in the end</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">ultimately</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example <strong style="color: #2563eb; text-decoration: underline;">Transitions</strong> - linking a general idea to a specific example of this idea:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">for example</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in this case</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">for instance</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">namely</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">- 97</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">-</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">specifically</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Sequential <strong style="color: #2563eb; text-decoration: underline;">Transitions</strong> - connecting sentences based on when events occur:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">after</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">finally</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">recently</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">at last</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">first</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">so far</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">before</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">following</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">soon</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">currently</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">later</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">subsequently</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">during</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">meanwhile</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">then</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">earlier</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">now</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">today</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">eventually</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">next</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">while</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Emphasis <strong style="color: #2563eb; text-decoration: underline;">Transitions</strong> - providing additional emphasis on what the previous sentence(s) said:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">above all</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in fact</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">clearly</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of course</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">truly</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">indeed</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">obviously</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Clarification <strong style="color: #2563eb; text-decoration: underline;">Transitions</strong> - providing clarification on what the previous sentence(s) claimed:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">especially</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">particularly</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in other words</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">specifically</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">- 98 -</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">that is</p>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = 'b8d75097-0dfe-4281-865a-02e0f97af8f4'
  AND ls.section_key = 'transitions-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = 'b8d75097-0dfe-4281-865a-02e0f97af8f4';

-- ============================================================
-- Chapter 13: Which Choice
-- Lesson: which-choice
-- Lesson ID: 367b813b-fc32-4ddc-9523-2fff7f812679
-- Content length: 10751 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = '367b813b-fc32-4ddc-9523-2fff7f812679'
);

DELETE FROM lesson_sections WHERE lesson_id = '367b813b-fc32-4ddc-9523-2fff7f812679';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  '367b813b-fc32-4ddc-9523-2fff7f812679',
  'which-choice-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 13: Which Choice</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">“Which choice” questions ask you to make changes to a sentence or portions of a sentence. The changes</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">that should be made will be detailed in the questions itself. These questions are very easy to spot: the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">question will always have the words “which choice” (more common) or “which one” (less</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">common) in the question.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For “which choice” questions, your job is to figure out exactly what the question is asking you to do</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">and select the answer choice that does that. Do not worry about grammar, conciseness, or style,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">as these are never tested on these questions unless the question specifically asks about grammar,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">conciseness, or style. For “which choice” questions, shorter is NOT always better.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The first type of “which choice” question asks you to make a specific change to the sentence. For</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">these questions, focus on the sentence you are being asKed to edit. You should still read the sentences</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">before and after the underlined portion, but you often will not need to rely too much on the context.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The first home refrigerators were patented in</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which choice most specifically describes what</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">was used to build iceboxes?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the 1920s. Before their invention, Americans</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A. NO CHANGE</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">kept their food cold in iceboxes, which required</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">B. which were only cold enough to keep food</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">ice to be bought and placed into the box each</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">C</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">cool but not freeze anything.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">. wooden boxes with tin and insulated with</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">cork and sawdust.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">week.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">D. the very first invention that allowed</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">people to keep food cold in their houses.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Notice that all of the answer choices are grammatically correct. Your job here is to pick the answer that</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">“most specifically describes what was used to build iceboxes.” Therefore, the answer must be C since it</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">is the only answer choice that has any information about the materials used to build iceboxes.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Whenever he was at the toy store, Harold</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Which choice most clearly emphasizes how the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">dinosaurs increase in size?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">always begged his Mom for some of the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A. NO CHANGE</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">grow-in-water dinosaurs that sprawl when</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">B. change in size</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">laced i</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">placed</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">C. expand</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">into water.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">D. soak</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Again, notice that all four answers choices are grammatically correct. To answer this question, we must</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">focus on which answer choice “emphasizes how the dinosaurs increase in size.” Therefore, the answer</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">choice C is correct, as “expand” highlights how the dinosaurs increase in size.</p>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Don’t Overthink It. Just Answer the Question!</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">For “which choice” questions, just answer the question that the ACT is asking. It’s that simple! We cannot stress this enough. As long as you approach these questions correctly, they should be easy. This is particularly important for the questions about specific details. For example, if the questions asks, “which answer choice best highlights the colors of autumn,” pick the answer choice that has colors in it. For the majority of the “which choice” questions, it’s really that easy! PrepPros ACT English Course The second type of “which choice” question asks you to select the correct sentence based on the context in the passage. Most commonly, you need to select the correct introduction, conclusion, or <strong style="color: #2563eb; text-decoration: underline;">transition</strong>. For these questions, you will need to read for context. In general, it is good practice to read the 2 sentences before and the 2 sentences after, but you may need to read more than that for certain questions. When first reading for context, ignore the underlined portion. Focus on where the question is directing you to read. If the question asks, “which choice best introduces the paragraph,” you need to read the entire paragraph before selecting your answer. The most common mistake students make is answering the question before reading the entire paragraph. If you do that, you do not really know what the paragraph is about yet and can very easily pick the incorrect answer. Recently, many businesses have been adding Given that all the choices are accurate, which choice provides the best conclusion to the color to the workplace to boost employee paragraph? morale and creativeness. Blue and green help A. NO CHANGE employees feel calm and hopeful, red B. Painting the walls or putting up artwork ; ; can both successfully bring color to the stimulates employees to be more creative, and office yellow inspires good memories. Selecting the ‘ht TBA col hel ‘mize cofors Cal het p taxtze th C. Orange can help increase employee’s fits f enthusiasm. sac promsser D. It may seem simple but selecting the right shareholders. colors can really brighten the office. This example requires you to think about the paragraph as a whole. The first two sentences of the paragraph focus on the relationship between colors and the workplace. In order to properly conclude the paragraph, the answer choice must summarize the discussion about colors and the workplace. The correct answer D is the only one that properly concludes the paragraph. In the Mona Lisa, one of Da Vinci’s best- Which of the following true statements, if as known paintings, the viewers feel as if the added here, would draw a conclusion most ,; ; consistent with the rest of the paragraph? woman is looking directly into their own eyes. ; ; A. NO CHANGE The incredible control of color and brushwork makes the woman in the painting B. Control of color is also an important element in other Da Vinci paintings. C. Landscapes were another interesting type of seem incredibly lifelike. While Da Vinci painting that Da Vinci created. completed many incredible paintings in his D. It feels like the woman in the painting is lifetime, the Mona Lisa stands out not only as always watching you. one of Da Vinci''s best but also as one of the masterpieces from its era. Da Vinci''s attention to detail separates the Mona Lisa from all other portraits painted during the Renaissance. The correct answer is A. Since we are looking for a sentence to conclude the paragraph, the answer must conclude what the paragraph was discussing, which is about how the Mona Lisa is an outstanding painting. A is the only answer choice that correctly concludes this paragraph. - 103 - PrepPros ACT English Course</p>
</div>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = '367b813b-fc32-4ddc-9523-2fff7f812679'
  AND ls.section_key = 'which-choice-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = '367b813b-fc32-4ddc-9523-2fff7f812679';

-- ============================================================
-- Chapter 14: Adding or Deleting Information
-- Lesson: adding-deleting
-- Lesson ID: 6fba31a5-1fd0-4e59-998d-3d253190b0ad
-- Content length: 24862 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = '6fba31a5-1fd0-4e59-998d-3d253190b0ad'
);

DELETE FROM lesson_sections WHERE lesson_id = '6fba31a5-1fd0-4e59-998d-3d253190b0ad';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  '6fba31a5-1fd0-4e59-998d-3d253190b0ad',
  'adding-deleting-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 14: Adding or Deleting Information</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Adding or deleting information questions ask you to consider whether information should be included</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">in the passage or not. For these questions, you must read for context. We recommend reading the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">entire paragraph in which the question is located. Depending on the question, you may need to read</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">more than that, so use your best judgment.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">To best answer these questions, read the paragraph twice: once with the information included and</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">once with the information deleted. Reading the paragraph both with and without the information in</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the question should make it clear whether the information should be included or deleted.</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Adding Information</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The first type of adding information question gives you a sentence or portion of a sentence and asks you</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">if the information should or should not be added. The answer choices will always have two parts: (1)</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">should the information be added, “yes” or “no,” and (2) a justification of why the information should or</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">should not be added.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">When looking at the second part of the answer choices, make sure that you are only considering the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">sentence or portion of a sentence that is or is not being added. Many students pick a justification</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">that goes far beyond what the sentence or portion of the sentence says or include details that have</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">nothing to do with the sentence itself.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Dr. Paul’s career began in 1965 when he</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">enrolled at Georgetown’s Medical School. He</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">At this point, the writer is considering adding</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the following true statement:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">graduated at the top of his class and got hired as</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">As a young man, Noah Anderson attended</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Yale University, where he played baseball</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">a surgeon at the Houston Medical Center. He</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">and studied biology, and then enrolled at</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Stanford’s Medical School.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">decided to specialize in heart surgery, quickly</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">becoming known as one of the top young</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">surgeons in Texas.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Should the write make this addition here?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A. Yes, because it establishes the qualifications</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of Dr. Paulus’ mentor.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Prior to accepting his promotion to head</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">heart surgeon, Dr. Paul had spent the last eight</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">years training under Dr. Noah Anderson, one of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">ae</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the best cardiologists in the U.S.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">1</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">During</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">what could be best summarized as an</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">B. Yes, because it indicates that Dr. Noah</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Neoerson had ‘ top-notch education. h</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">C. No, because it does not also indicate where</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Dr. Paul studied.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">D. No, because the information is not relevant</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">apprenticeship, Dr. Paul assisted in over 1,800</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">to the passage’s discussion of Dr. Paul’s</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">assorted cardiac surgeries, perfecting his ability</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">career.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">to conduct open-heart surgery.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For this question, the correct answer is D. The sentence is not relevant to the passage’s focus, which is</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">on Dr. Paul’s career.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">- 109 -</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The second type of adding information question will underline a portion of the sentence and ask if you</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">should make a revision.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">After months of remote learning, a handful of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">2.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">students are finding a sliver of normal school</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">At this point, the writer is considering</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">revising the underlined portion to the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">following:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">life through learning pods. The students</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">English learners, who require support in</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">identified for learning pods include some of</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">two languages, are a second group.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the most vulnerable. One such group is special</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">education students who need in-person</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Should the write make this revision?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">services and may not tolerate long hours on</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A. Yes, because it provides examples of who</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the computer. English learners are a second</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the English learners are.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">B. Yes, because it clarifies who the English</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">group. Others eligible for the pods lacka</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">learners are.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">C. No, because it distracts from the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">sustainable study environment at home or face</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">emotional issues worsened by the pandemic.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">paragraph’s discussion of learning pods.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">D. No, because it does not specify where the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">While most students will continue to study</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">English learners will study.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">online, some small groups will begin returning</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">to campus as soon as next week.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For this question, the answer is B. The term “English learners” is not specifically defined and likely one</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the reader is not familiar with. The revised version clarified what the term “English learners” means, so</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the revision should be made.</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Deleting Information</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The first type of deleting information question is just like the first type of adding information question</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">with one obvious difference: the question will ask if the underlined portion of the sentence should or</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">should not deleted. The approach for these questions is identical to the approach for the adding</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">information questions we just covered at the start of this chapter, so we will not repeat it again</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">here.</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Jerry and Eric have joined a growing number</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">ee</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">;</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">;</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">;</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of mountain bikers in California who prefer</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">extreme downhill mountain biking.”</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Rather</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The writer is considering deleting the underlined</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">portion. Should the underlined portion be kept</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">or deleted?</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A. Kept, because it highlights how dangerous</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">than following the established trails, they</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">journey to the tops of mountains in central</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">California and find their own trails to ride. “It</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">is just us, the bikes, and the great outdoors.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">mountain biking is.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">B. Kept, because it details where Jerry and Eric</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">go for the extreme downhill mountain biking.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">C. Deleted, because it is not important where</p>

<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">Jerry and Eric go mountain biking.</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">D. Deleted, because it distracts from the main</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">We have to find out own path down, and I love</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">point of the paragraph.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">that added level of adventure,” says Eric.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The correct answer here is B. The <strong style="color: #2563eb; text-decoration: underline;">phrase</strong> “the tops of the mountains in” provides a relevant detail about</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">where the “extreme downhill mountain biking” takes place and also help explain why it is called</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">“extreme downhill mountain biking.”</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The second type of deleting information question asks you to identify what the passage would lose if a</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">certain word, <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>, or sentence were deleted. For these questions, it is all about the context! A good</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">trick here is to try “deleting” the word, <strong style="color: #2563eb; text-decoration: underline;">phrase</strong>, or sentence: read the paragraph with the word,</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; text-decoration: underline;">phrase</strong>, or sentence and without it. Then, ask yourself what the passage loses when the information is</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">deleted.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Some popular ecotourism destinations have</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">been burdened by the presence of travelers.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">It’s not uncommon for overeager tourists to</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">wander off the designated paths and leave</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">trash behind. Certain destinations like the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If the writer were to delete the preceding</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">sentence, the paragraph would primarily lose:</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A. reasons why there has not been much</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">tourism in certain areas.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">B. examples of ways that ecotourism has helped</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">the local economy.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">C. an example of steps that ecotourism</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Galapagos Islands have begun to combat this</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">problem by limiting the number of visitors.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">destinations have taken to minimize the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">impact of tourists.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">D. reasons that tourists travel to remote</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">locations.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The correct answer here is C.</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The final sentence in this paragraph gives a specific example a how some</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">of the ecotourist destinations have tried to control the damage done by travelers.</p>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Read for context (as much as you need)</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">The most common mistake on adding and deleting information questions is to rush and not read enough. For any question that asks you about adding or deleting information, make sure to read for content both before and after. This means reading at least the preceding sentence and the following sentence. At times, you may need to read the entire paragraph to get the context that you need. Take your time...these questions are not particularly difficult as long as you read the paragraph and questions carefully! PrepPros ACT English Course</p>
</div>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: DELETE the underlined portion.</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">Some questions will have “DELETE the underlined portion” as answer choice D or J. Whenever you see this answer choice, pay extra close attention to what the question is asking you to do: these questions can be testing grammar (most commonly sentence structure), <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>, irrelevance, and <strong style="color: #2563eb; text-decoration: underline;">transitions</strong>. On the new Enhanced ACT, the question will tell you what the question is testing you on! When you see these questions, you should follow these steps: 1. Read the question carefully to identify which type of question you are looking at. The question will make it clear if you are being tested on grammar, <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>, or <strong style="color: #2563eb; text-decoration: underline;">transitions</strong>. 2. For grammar questions, read the entire sentence as it is written and with the underlined portion deleted. See if the current sentence or deleting the underlined portion creates a <strong style="color: #2563eb; text-decoration: underline;">sentence fragment</strong>, run-on sentence, or any other sentence structure error. 3. For <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong> and <strong style="color: #2563eb; text-decoration: underline;">transitions</strong> questions, read the previous sentence(s). For <strong style="color: #2563eb; text-decoration: underline;">redundancy</strong>, look to see if any of the answer choices are redundant with information in the sentence itself or the previous sentence(s). For <strong style="color: #2563eb; text-decoration: underline;">transitions</strong>, read for context to see if the <strong style="color: #2563eb; text-decoration: underline;">transition</strong> is necessary. These questions can appear like the examples below: Even though the door was locked, the 1. Which choice is the least redundant in context? weary traveler tried repeatedly to open A. it. He swiped his key card over and over B. multiple times C. D. before giving up and sleeping on the front NO CHANGE hoping the door would open DELETE the underlined portion porch. The first sentence already says the traveler “tried repeatedly to open” the door, so the correct answer is D. The masked bandit hoppedthe fence and 2. Which <strong style="color: #2563eb; text-decoration: underline;">transition</strong> word, if any, is the most logical in context? disappeared into the night. For example, he had successfully evaded all four of police officers that had been chasing him. A. NO CHANGE B. Similarly, C. In summary, D. DELETE the underlined portion For <strong style="color: #2563eb; text-decoration: underline;">transitions</strong> questions with the option to delete the <strong style="color: #2563eb; text-decoration: underline;">transition</strong>, the <strong style="color: #2563eb; text-decoration: underline;">transition</strong> word or words are almost always unnecessary, as in this example. The answer is D. 3. Nitrogen gas, which is a key nutrient for Which choice make the sentence most grammatically acceptable? plants, constitutes 78 percent of the Earth’s ; ; , air, however plants cannot use nitrogen in A. the gas form. NO CHANGE B. but C. therefore D. DELETE the underlined portion This example may look like another <strong style="color: #2563eb; text-decoration: underline;">transition</strong> question, but it is actually testing sentence structure. The answer is B because we need a comma + <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong> to link two <strong style="color: #2563eb; text-decoration: underline;">independent clauses</strong>. A and C are incorrect because they a not <strong style="color: #2563eb; text-decoration: underline;">FANBOYS</strong>, and deleting the underlined portion creates a <strong style="color: #2563eb; text-decoration: underline;">comma splice</strong>. PrepPros ACT English Course</p>
</div>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = '6fba31a5-1fd0-4e59-998d-3d253190b0ad'
  AND ls.section_key = 'adding-deleting-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = '6fba31a5-1fd0-4e59-998d-3d253190b0ad';

-- ============================================================
-- Chapter 15: Logical Placement
-- Lesson: logical-placement
-- Lesson ID: 6a4e92d2-a681-42ea-9f0d-d5970c57e9af
-- Content length: 3208 characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = '6a4e92d2-a681-42ea-9f0d-d5970c57e9af'
);

DELETE FROM lesson_sections WHERE lesson_id = '6a4e92d2-a681-42ea-9f0d-d5970c57e9af';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  '6a4e92d2-a681-42ea-9f0d-d5970c57e9af',
  'logical-placement-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Chapter 15: Logical Placement</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Logical placement questions ask you to place a sentence in the paragraph. These questions are all about</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">context. To find the correct answer, plug the sentence into each potential spot in the answer</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">choices and re-read the paragraph. When checking the placement, make sure that you read the</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">sentence(s) before and after the sentence you are placing. Many students make mistakes by not</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">continuing to read the sentence(s) after where the sentence is being placed. The correct placement</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">should flow smoothly and fit in with the context of the paragraph.</p>

<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: Notice the Bracketed Numbers [1] or Letters [A]</h4>
  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">As you are reading the passages, some paragraphs will have bracketed numbers at the beginning of each sentence. On the ACT, it will look just like this: [1] Morgan Freeman’s smooth voice is one of the many things that have made him an A-list celebrity. [2] Everyone has probably tried to do a Morgan Freeman impression, but nobody can match the real thing. [3] Still, that has never stopped me from trying to Bracketed numbers only appear for a logical placement question, so read these paragraphs more carefully. Be aware that the paragraph may currently be out of order, so it may seem confusing when you first read it. Bracketed letters appear when a logical placement question will be at the end of the passage. When reading the passage, you do not need to pay attention to the letters. Just know there will be a question at the end of the passage asking you where to place a sentence.</p>
</div>


<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = '6a4e92d2-a681-42ea-9f0d-d5970c57e9af'
  AND ls.section_key = 'logical-placement-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = '6a4e92d2-a681-42ea-9f0d-d5970c57e9af';


COMMIT;

-- ============================================================
-- VERIFICATION QUERY
-- Check that all lessons were updated
-- ============================================================

SELECT
  lm.lesson_key,
  lm.title,
  COUNT(DISTINCT ls.id) as section_count,
  COUNT(sc.id) as content_count,
  SUM(LENGTH(sc.content)) as total_content_length,
  lm.updated_at
FROM lesson_metadata lm
LEFT JOIN lesson_sections ls ON lm.id = ls.lesson_id
LEFT JOIN section_content sc ON ls.id = sc.section_id
WHERE lm.subject = 'english'
GROUP BY lm.id, lm.lesson_key, lm.title, lm.updated_at
ORDER BY lm.order_index;
