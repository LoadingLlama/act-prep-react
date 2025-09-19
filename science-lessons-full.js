// Science Lessons Content
const scienceLessons = {
    'science-introduction': {
        title: 'Introduction to Science Test',
        content: `
            <div class="lesson-intro">
                The Science Test consists of 40 questions that you will have 35 minutes to answer. While it is called the Science Test, this section requires very little actual science knowledge.
            </div>
            
            <h3>What is on each ACT Science Test?</h3>
            <p>The ACT Science Test always consists of:</p>
            
            <div class="concept-box">
                <h4>5 Charts and Graphs Passages</h4>
                <p>Test your ability to read charts and graphs and interpret information given in tables, diagrams, and figures. For certain passages, you will also be asked questions about the experimental design. This is the most common type of passage on the ACT.</p>
            </div>
            
            <div class="concept-box">
                <h4>1 Conflicting Viewpoints Passage</h4>
                <p>Asks you to understand, analyze, and compare different hypotheses, opinions, or conclusions. This passage has much more text and sometimes has no charts or graphs at all. The headings say "Student 1, Student 2" or "Scientist 1, Scientist 2," so these passages are easy to spot.</p>
            </div>
            
            <h3>Six Types of Questions</h3>
            <ul>
                <li><strong>Detail:</strong> Ask you to locate a specific piece of data from graphs, charts, tables, or diagrams</li>
                <li><strong>Pattern:</strong> Ask you to spot a trend on a graph, table, or chart (increase, decreasing, etc.)</li>
                <li><strong>Inference:</strong> Ask you to make a conclusion based on the data provided</li>
                <li><strong>Method:</strong> Test your understanding of experimental setup and scientific methods</li>
                <li><strong>Scientific Knowledge:</strong> Require you to use some outside scientific knowledge (least common)</li>
                <li><strong>Compare/Contrast:</strong> Only in conflicting viewpoints passages, ask you to consider various aspects of opposing arguments</li>
            </ul>
            
            <div class="tip-box">
                <h4>Important Note</h4>
                <p>A more accurate name for this test would be "The Analyzing Charts and Graphs on Random Topics Quickly Test." You can get a great score even if you don't love science class!</p>
            </div>
        `
    },
    
    'passage-approach': {
        title: 'Chapter 1: How to Approach the Passages',
        content: `
            <div class="lesson-intro">
                Science passages often look intimidating due to the amount of information and random topics. Here's how to tackle them effectively.
            </div>
            
            <h3>Charts & Graphs Strategies</h3>
            <p>For the five charts and graphs passages:</p>
            
            <div class="rules-box">
                <h4>30-Second Rule</h4>
                <p>Spend around 30 seconds before starting on the questions. Focus on:</p>
                <ul>
                    <li>Labels of the axes</li>
                    <li>What is being measured in each chart</li>
                    <li>Where information is located</li>
                    <li>Read only the first sentence of the passage and experiments</li>
                </ul>
            </div>
            
            <div class="tip-box">
                <h4>Key Strategy</h4>
                <p>Most of the information in charts and graphs passages is extra and unnecessary. Don't spend time trying to read and understand the entire passage—it's not necessary and you will run out of time!</p>
            </div>
            
            <h3>Question Difficulty Progression</h3>
            <p>Within each passage, questions go from easy to hard. The first 2-3 questions are generally straightforward, often just asking you to spot a trend or find a data point. Later questions can get more difficult.</p>
            
            <h3>Conflicting Viewpoints Strategy</h3>
            <div class="concept-box">
                <h4>Different Approach Required</h4>
                <p>Rather than skimming, you must treat this more like a reading passage:</p>
                <ul>
                    <li>Read and annotate the entire passage</li>
                    <li>Underline key differences between viewpoints</li>
                    <li>Most students save this passage for last as it's most time-consuming</li>
                </ul>
            </div>
            
            <h3>Time Management Tips</h3>
            <div class="tip-box">
                <h4>5-6 Minutes Per Passage</h4>
                <p>If you spend more than 30 seconds on a problem, bubble in your best guess, circle the question, and move on. You can always come back if you have time.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Remember</h4>
                <p>Trust the questions! If a question begins with "Based on Figure 2," the answer is in Figure 2. The ACT is not trying to trick you.</p>
            </div>
        `
    },
    
    'question-diagnosis': {
        title: 'Question Diagnosis',
        content: `
            <div class="lesson-intro">
                The most important skill for success on the Science Test is knowing where to look for information in the passage.
            </div>
            
            <h3>4 Places to Look in a Science Passage</h3>
            
            <div class="concept-box">
                <h4>1. Figures and Tables</h4>
                <p>The most common place for answers. The question will tell you which Figure or Table to look at.</p>
                <p><strong>When to go here:</strong></p>
                <ul>
                    <li>The question directs you by saying "Figure 1," "Table 1," etc.</li>
                    <li>The answers are all numbers with units</li>
                </ul>
            </div>
            
            <div class="concept-box">
                <h4>2. Experimental Text</h4>
                <p>Text right above the Figures and Tables that explains what they show and gives other relevant information.</p>
                <p><strong>When to go here:</strong></p>
                <ul>
                    <li>Questions about experimental setup or differences between experiments</li>
                    <li>Questions about variables not shown in Figures or Tables</li>
                    <li>Answer choices have units not in the Figures or Tables</li>
                </ul>
            </div>
            
            <div class="concept-box">
                <h4>3. Introductory Text</h4>
                <p>Text at the beginning of the passage, mainly for definitions of unfamiliar terms.</p>
                <p><strong>When to go here:</strong></p>
                <ul>
                    <li>Terms or scientific words appear in the question that you need to know</li>
                    <li>If you've looked at Experimental Text and didn't find what you need</li>
                </ul>
            </div>
            
            <div class="concept-box">
                <h4>4. Not in the Passage</h4>
                <p>Basic science knowledge & experimental thinking questions that require your own knowledge.</p>
            </div>
            
            <div class="tip-box">
                <h4>Pro Tip</h4>
                <p>Always read both the question AND the answer choices. Both will provide big clues that direct you where to look in the passage.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Strategy</h4>
                <p>As you get better at question diagnosis, you'll be able to more quickly and consistently locate the correct information, manage your time better, and improve your score.</p>
            </div>
        `
    },
    
    'specific-data-point': {
        title: 'Specific Data Point Questions',
        content: `
            <div class="lesson-intro">
                Many of the easiest questions on the ACT Science Test will simply ask you to go to the Figures and Tables and find a specific data point.
            </div>
            
            <h3>How to Spot These Questions</h3>
            
            <div class="tip-box">
                <h4>Two Clear Indicators</h4>
                <ol>
                    <li><strong>Questions tell you which chart to look at:</strong> "According to Figure 2..." "Based on Table 1..." "The data in Figure 1 show..."</li>
                    <li><strong>All answer choices are numbers with units:</strong> Like 5 cm, 8 cm, 12 cm, 18 cm</li>
                </ol>
            </div>
            
            <h3>How to Answer Successfully</h3>
            <p>To answer these questions successfully, you must:</p>
            <ul>
                <li>Read the question carefully to know exactly what you're looking for</li>
                <li>Pay special attention to the axes and legends</li>
                <li>Make sure you find the exact data point the question asks for</li>
                <li>Pay attention to units in answer choices to ensure you're looking at the correct axis or data</li>
            </ul>
            
            <div class="example-box">
                <h4>Example Question</h4>
                <p><strong>Based on Figure 3, the average depth of the tomato plant roots at 17 days was:</strong></p>
                <p>A. 5 cm<br>
                B. 8 cm<br>
                C. 12 cm<br>
                D. 18 cm</p>
                
                <p>If the question says "Based on Figure 1," go to Figure 1! The ACT is not trying to trick you; it is telling you where the answer is.</p>
            </div>
            
            <div class="rules-box">
                <h4>Remember the Units</h4>
                <p>The units in the answer choices will help you make sure you are looking at the correct axis of a graph or the correct data in a table.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>These are often the easiest questions on the Science Test. Master these to build confidence and secure points quickly!</p>
            </div>
        `
    },
    
    'trends': {
        title: 'Trends Questions',
        content: `
            <div class="lesson-intro">
                Trends questions ask you to spot patterns in data. These can range from very easy questions that simply ask you to track how numbers change across a graph to difficult questions that ask you to identify non-obvious trends within tables.
            </div>
            
            <h3>How to Spot Trends Questions</h3>
            
            <div class="tip-box">
                <h4>Look at the Answer Choices</h4>
                <p>The easiest way to spot a trends question is to use the answer choices. If you see answer choices that say "increases only" or "remains constant," you're dealing with a trends question.</p>
                
                <p><strong>Example:</strong> As the temperature decreases, the angle of the rose bush stems:</p>
                <ul>
                    <li>A. Increased only</li>
                    <li>B. Increased then decreased</li>
                    <li>C. Decreased only</li>
                    <li>D. Remained constant</li>
                </ul>
            </div>
            
            <h3>How to Answer Successfully</h3>
            <p>When you are asked to spot trends:</p>
            <ul>
                <li>Focus on identifying the pattern in the data, not specific numbers</li>
                <li>Read the questions carefully to make sure you're looking at the correct data</li>
                <li>For table questions, identify which trials to compare by finding where only one variable changes</li>
            </ul>
            
            <h3>Trends in Tables</h3>
            <div class="concept-box">
                <h4>More Challenging</h4>
                <p>More difficult trends questions often appear in passages with large data tables. The challenge is to identify which parts of the table to look at. You need to:</p>
                <ul>
                    <li>Read the question carefully</li>
                    <li>Identify which variable(s) should be changing and which should remain constant</li>
                    <li>Find trials that show the trend you're being asked about</li>
                </ul>
            </div>
            
            <div class="rules-box">
                <h4>Key Rule for Tables</h4>
                <p>When trying to identify trends in tables, look at groups of trials where only one independent variable is being changed. This way you can spot the trend based on how the independent variable affects a dependent variable.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Remember</h4>
                <p>Focus on the pattern, not the specific numbers. The ACT wants to see if you can identify how variables relate to each other.</p>
            </div>
        `
    },
    
    'approximation': {
        title: 'Approximation Questions',
        content: `
            <div class="lesson-intro">
                Approximation questions ask you to estimate the value of a data point that is not specifically given in the Figures and Tables.
            </div>
            
            <h3>How to Spot Approximation Questions</h3>
            
            <div class="tip-box">
                <h4>Answer Choices Give Them Away</h4>
                <p>These questions are easy to spot because of their distinctive answer format:</p>
                <ul>
                    <li>A) Less than 100m</li>
                    <li>B) Between 100m and 150m</li>
                    <li>C) Between 150m and 250m</li>
                    <li>D) Greater than 250m</li>
                </ul>
                <p>Every time you see answer choices like this, it's an approximation question asking about a value not actually shown in the Figures or Tables.</p>
            </div>
            
            <h3>Approximation on Graphs</h3>
            <p>Approximation questions on graphs will be one of two types:</p>
            
            <div class="concept-box">
                <h4>Bracketing Questions</h4>
                <p>You'll be asked to find a data point that is between two given data points. Simply consider what data points the value fits between, then spot the correct answer.</p>
            </div>
            
            <div class="concept-box">
                <h4>Extending Questions</h4>
                <p>You'll be asked about a data point outside of the graph. Simply take your pencil and extend the trend line outside of the graph. The answer should be easy to spot after that.</p>
            </div>
            
            <h3>Approximation in Tables</h3>
            <div class="rules-box">
                <h4>Strategy for Tables</h4>
                <p>When facing approximation questions in tables:</p>
                <ul>
                    <li>For easier questions, follow trends across the entire table</li>
                    <li>For more difficult questions, identify which specific trials will help you find the trends</li>
                    <li>Pay careful attention to other variables—those not part of the question should remain constant</li>
                </ul>
            </div>
            
            <div class="practice-box">
                <h4>Practice Approach</h4>
                <p>Use the given values to estimate where the data point would appear. Look for the closest values in the data and interpolate or extrapolate based on the pattern.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Strategy</h4>
                <p>You need to use the given values to estimate where the data point the question is asking you to find would appear. Look for patterns and use them to make reasonable estimates.</p>
            </div>
        `
    },
    
    'multiple-figures': {
        title: 'Multiple Figures Questions',
        content: `
            <div class="lesson-intro">
                More difficult questions on the ACT Science Test will require you to use multiple Tables or Figures to find the right answer.
            </div>
            
            <h3>How to Spot Multiple Figures Questions</h3>
            
            <div class="tip-box">
                <h4>Question Language Clues</h4>
                <p><strong>Easier questions tell you exactly where to look:</strong></p>
                <ul>
                    <li>"Based on Figures 1 and 2..."</li>
                    <li>"According to Table 1 and Figure 3..."</li>
                </ul>
                
                <p><strong>More difficult questions are less specific:</strong></p>
                <ul>
                    <li>"Based on Experiments 1 and 2"</li>
                    <li>"The data in Studies 2 and 3 shows..."</li>
                    <li>"According to the results of the studies..."</li>
                </ul>
            </div>
            
            <h3>How to Answer Successfully</h3>
            <div class="concept-box">
                <h4>Three-Step Process</h4>
                <ol>
                    <li><strong>Find out how the figures/tables are related:</strong> Look for common variables or connecting information</li>
                    <li><strong>Find a data point on the first figure/table:</strong> Use this to direct you to the right information on the second figure/table</li>
                    <li><strong>Use that information to find your answer:</strong> Combine the information from both sources</li>
                </ol>
            </div>
            
            <h3>Using Text Above Figures and Tables</h3>
            <div class="rules-box">
                <h4>When Figures Aren't Enough</h4>
                <p>On some multiple figures questions, you may need additional information not located in the Figures or Tables. If the question asks about information not in the Figures or Tables, look in the text above that describes the setup of the experiment.</p>
                
                <p><strong>Example:</strong> If a question asks "How many Trials were run without electricity?" and there's no electricity data in the charts, go to the experimental description text.</p>
            </div>
            
            <div class="practice-box">
                <h4>Reading Strategy</h4>
                <p>Be sure to read the more difficult questions carefully and identify the key words that will help you know which Figures and Tables to look at. Pay close attention to the labels on the axes as well.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Don't Worry!</h4>
                <p>We know that sounds really complicated on paper, but once you get the hang of it these questions are not that bad! The key is practice and systematic approach.</p>
            </div>
        `
    },
    
    'figures-text': {
        title: 'Figures + Text Questions',
        content: `
            <div class="lesson-intro">
                On certain questions, the information in the Figures and Tables is not enough. If you find that you need more information to answer the question, look at the experimental text.
            </div>
            
            <h3>When to Use the Text</h3>
            <p>Most often, these questions will ask you about:</p>
            <ul>
                <li>Certain units or values for a specific term not included in the Figures or Tables</li>
                <li>Experimental procedures or setup details</li>
                <li>Definitions of terms used in the experiment</li>
                <li>Conditions or variables that are controlled but not shown in the data</li>
            </ul>
            
            <div class="concept-box">
                <h4>Simple Strategy</h4>
                <p>If this happens, just go to the text above the Figures or Tables and find the information there. The experimental text will explain what the Table or Figure is showing and provide other relevant details.</p>
            </div>
            
            <h3>Common Examples</h3>
            
            <div class="example-box">
                <h4>Experimental Conditions</h4>
                <p>Questions might ask about conditions like temperature, pressure, or other controlled variables that aren't graphed but are mentioned in the experimental description.</p>
            </div>
            
            <div class="example-box">
                <h4>Time References</h4>
                <p>Questions about "at time = 0 seconds" or "at point Z" where these references are explained in the text but not clearly labeled in the figures.</p>
            </div>
            
            <div class="example-box">
                <h4>Experimental Setup</h4>
                <p>Questions about why certain procedures were followed or what specific experimental conditions were maintained.</p>
            </div>
            
            <div class="tip-box">
                <h4>Pro Tip</h4>
                <p>These questions often don't require you to look at a chart or graph at all. They're testing whether you can find and understand information from the experimental description.</p>
            </div>
            
            <div class="rules-box">
                <h4>Reading Strategy</h4>
                <p>When you encounter these questions:</p>
                <ol>
                    <li>Try the figures first</li>
                    <li>If the information isn't there, go to the experimental text</li>
                    <li>Look for italicized terms (often definitions)</li>
                    <li>Pay attention to experimental conditions and setup details</li>
                </ol>
            </div>
            
            <div class="key-takeaway">
                <h4>Remember</h4>
                <p>The experimental text is there to provide context and additional information. Don't skip reading it entirely during your initial 30-second scan of the passage.</p>
            </div>
        `
    },
    
    'two-part-answers': {
        title: '2-Part Answers',
        content: `
            <div class="lesson-intro">
                On the ACT Science Test, you will see many questions with two parts in the answers. These questions test both a claim and the reasoning behind it.
            </div>
            
            <h3>How to Approach 2-Part Questions</h3>
            
            <div class="rules-box">
                <h4>Recommended Strategy</h4>
                <p>Always break the answers into two parts and work to answer one part at a time. We recommend:</p>
                <ol>
                    <li><strong>Start with the second part (the explanation)</strong> - usually based on Figures/Tables or basic scientific knowledge</li>
                    <li><strong>Answer the first part (the claim) last</strong> - use the explanation to eliminate incorrect answers</li>
                </ol>
            </div>
            
            <h3>Common Answer Pattern</h3>
            
            <div class="tip-box">
                <h4>Typical Structure</h4>
                <p>Most 2-part questions follow this pattern:</p>
                <ul>
                    <li><strong>First part (claim):</strong> A and B match, C and D match</li>
                    <li><strong>Second part (explanation):</strong> A and C match, B and D match</li>
                </ul>
                
                <p><strong>Example:</strong></p>
                <ul>
                    <li>A. Yes, because the boiling point of water is below 100°C</li>
                    <li>B. Yes, because the boiling point of water is above 100°C</li>
                    <li>C. No, because the boiling point of water is below 100°C</li>
                    <li>D. No, because the boiling point of water is above 100°C</li>
                </ul>
            </div>
            
            <h3>Strategy Benefits</h3>
            <div class="concept-box">
                <h4>Why Start with the Explanation</h4>
                <p>The second part of the answer is usually:</p>
                <ul>
                    <li>Based on the Figures and Tables (easier to verify)</li>
                    <li>Based on basic scientific knowledge</li>
                    <li>Much easier to validate than the first part</li>
                </ul>
                
                <p>Even if you can't tell exactly which claim is correct, you should be able to eliminate 2 answers as incorrect and guess between just 2 answers.</p>
            </div>
            
            <h3>Important Warning</h3>
            <div class="correction-box">
                <h4>Not All Questions Follow the Pattern</h4>
                <p>Always read the answers carefully! Some questions don't follow the standard pattern:</p>
                
                <p><strong>Example:</strong> Does the hummingbird or sparrow show greater increase in flight distance?</p>
                <ul>
                    <li>A. The hummingbird, because D increased by 0.8 miles</li>
                    <li>B. The hummingbird, because D increased by 1.6 miles</li>
                    <li>C. The sparrow, because D increased by 1.2 miles</li>
                    <li>D. The sparrow, because D increased by 2.0 miles</li>
                </ul>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Strategy</h4>
                <p>Use the pattern recognition to save time, but always verify by reading each answer choice carefully. The explanation part is your key to eliminating wrong answers quickly.</p>
            </div>
        `
    },
    
    'cannot-be-determined': {
        title: 'Cannot Be Determined',
        content: `
            <div class="lesson-intro">
                When you see "cannot be determined" as an answer choice, don't treat the question any differently. Use your normal process, but be ready to recognize when information simply isn't provided.
            </div>
            
            <h3>Normal Process Still Applies</h3>
            <p>Follow your standard approach:</p>
            <ol>
                <li>Start with the Figures and Tables</li>
                <li>If you can't find information there, move to the text above the experiments</li>
                <li>Check for definitions in the introductory text</li>
                <li>Only choose "cannot be determined" when the locators from the question cannot be found</li>
            </ol>
            
            <h3>When to Choose "Cannot Be Determined"</h3>
            
            <div class="rules-box">
                <h4>Clear Indicators</h4>
                <p>Choose this answer when:</p>
                <ul>
                    <li>The specific variable or measurement asked about is not shown in any figure or table</li>
                    <li>The question asks for individual data when only group/average data is provided</li>
                    <li>Required information is simply not present in the passage</li>
                </ul>
            </div>
            
            <div class="tip-box">
                <h4>Watch Out for Unit Tricks</h4>
                <p>Pay close attention to units for these questions. Many difficult "cannot be determined" questions will use different units to try to trick you. Make sure the data you're looking at matches the units requested in the question.</p>
            </div>
            
            <h3>Common Scenarios</h3>
            
            <div class="example-box">
                <h4>Individual vs. Group Data</h4>
                <p>If a figure shows average data for 5 subjects, but the question asks about 1 specific subject, the answer is often "cannot be determined" because individual data isn't provided.</p>
            </div>
            
            <div class="example-box">
                <h4>Missing Variables</h4>
                <p>If a question asks about a variable that simply isn't measured or shown in any of the experimental data, you cannot determine the answer from the given information.</p>
            </div>
            
            <div class="concept-box">
                <h4>Process of Elimination</h4>
                <p>Sometimes you can arrive at "cannot be determined" by eliminating other answer choices that clearly contradict the data shown, leaving only this option as logical.</p>
            </div>
            
            <div class="practice-box">
                <h4>Don't Overthink</h4>
                <p>If you've checked all the usual places (figures, experimental text, introductory text) and the information simply isn't there, trust that "cannot be determined" is likely correct.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Remember</h4>
                <p>The ACT won't trick you with this answer choice. If the information truly isn't in the passage, "cannot be determined" is a legitimate and correct answer.</p>
            </div>
        `
    },
    
    'equations-as-answers': {
        title: 'Equations as Answers',
        content: `
            <div class="lesson-intro">
                When you see equations as answer choices, you'll be asked to identify which equation correctly models some information in the Figures or Tables.
            </div>
            
            <h3>How to Answer These Questions</h3>
            
            <div class="rules-box">
                <h4>Test Point Strategy</h4>
                <ol>
                    <li><strong>Pick a test point:</strong> Choose a clear point from the chart, graph, or table</li>
                    <li><strong>Plug into equations:</strong> Use this point to test which equation matches the data</li>
                    <li><strong>Use endpoints:</strong> If exact values are hard to read, endpoints of graphs are often easier to use</li>
                </ol>
            </div>
            
            <div class="example-box">
                <h4>Example Process</h4>
                <p>If you have a graph showing the relationship between variables P and V, and you can see that when V = 4, P = 16:</p>
                
                <p><strong>Test each equation:</strong></p>
                <ul>
                    <li>A. V = 3P → 4 = 3(16) = 48 ✗</li>
                    <li>B. V = 0.5P → 4 = 0.5(16) = 8 ✗</li>
                    <li>C. P = 4V → 16 = 4(4) = 16 ✓</li>
                    <li>D. P = 0.5V → 16 = 0.5(4) = 2 ✗</li>
                </ul>
            </div>
            
            <h3>Tips for Success</h3>
            
            <div class="tip-box">
                <h4>Choose Clear Data Points</h4>
                <p>Look for points where you can easily read exact values from the graph or table. Avoid points where you have to estimate if possible.</p>
            </div>
            
            <div class="tip-box">
                <h4>Test Multiple Points</h4>
                <p>If two equations seem to work with your first test point, pick a second point to verify which equation is truly correct.</p>
            </div>
            
            <div class="concept-box">
                <h4>Linear Relationships</h4>
                <p>Most equation questions involve linear relationships. Look for:</p>
                <ul>
                    <li>Direct relationships (as one increases, the other increases)</li>
                    <li>Inverse relationships (as one increases, the other decreases)</li>
                    <li>The slope or rate of change between variables</li>
                </ul>
            </div>
            
            <h3>Common Question Types</h3>
            
            <div class="practice-box">
                <h4>Prediction Questions</h4>
                <p>Sometimes you'll be asked to use the equation to predict a value outside the given data range. Once you've identified the correct equation, simply plug in the new value.</p>
            </div>
            
            <div class="correction-box">
                <h4>Variable Names</h4>
                <p>Pay careful attention to which variable is which in the equations. Make sure you're plugging values into the correct variables (x vs y, P vs V, etc.).</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Strategy</h4>
                <p>Start by picking a test point on the chart, graph, or table to plug into the equations. Then use this point to identify which equation matches the data.</p>
            </div>
        `
    },
    
    'mixing': {
        title: 'Mixing Questions',
        content: `
            <div class="lesson-intro">
                Mixing problems are often some of the most difficult problems that appear when you are dealing with multiple solutions in an experiment. Usually, these questions are one of the last two questions in a passage.
            </div>
            
            <h3>How to Approach Mixing Questions</h3>
            
            <div class="concept-box">
                <h4>Three-Step Process</h4>
                <ol>
                    <li><strong>Identify the two solutions:</strong> Determine which solutions you need to combine to create the mixed solution</li>
                    <li><strong>Use the data:</strong> Look at the Figure or Table to discover where the new solution would appear</li>
                    <li><strong>Find the range:</strong> Answers often appear as bracketed ranges like approximation problems</li>
                </ol>
            </div>
            
            <h3>Key Concepts</h3>
            
            <div class="rules-box">
                <h4>Average Values</h4>
                <p>When mixing equal amounts of two solutions, the resulting value will typically be somewhere between the two original values, often close to their average.</p>
            </div>
            
            <div class="example-box">
                <h4>Example Scenario</h4>
                <p>If Sample 1 has a concentration of 800 mg/L and Sample 2 has 400 mg/L, mixing equal amounts would likely result in a concentration around 600 mg/L (the average).</p>
            </div>
            
            <h3>Answer Format</h3>
            
            <div class="tip-box">
                <h4>Range Answers</h4>
                <p>Mixing problems often have answers in ranges:</p>
                <ul>
                    <li>A. Between 100 mg/L and 300 mg/L</li>
                    <li>B. Between 300 mg/L and 600 mg/L</li>
                    <li>C. Between 600 mg/L and 900 mg/L</li>
                    <li>D. Greater than 900 mg/L</li>
                </ul>
            </div>
            
            <h3>Complex Mixing Questions</h3>
            
            <div class="concept-box">
                <h4>Interpolation Problems</h4>
                <p>Some mixing questions ask about creating a solution with a specific property (like 6 grams of preservative Z) that falls between existing samples. Use the data to interpolate where this new sample would fall.</p>
            </div>
            
            <div class="practice-box">
                <h4>Strategy Tips</h4>
                <ul>
                    <li>Look for patterns in how the measured values change with different sample compositions</li>
                    <li>Use the data from similar samples to estimate the mixed result</li>
                    <li>Consider the proportions if unequal amounts are being mixed</li>
                </ul>
            </div>
            
            <div class="correction-box">
                <h4>Don't Overthink</h4>
                <p>These problems might seem complex, but they usually follow logical patterns. If you mix two things, the result should fall somewhere between their individual properties.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Remember</h4>
                <p>Mixing problems test your ability to predict results when combining solutions. Use the existing data to estimate where the new mixed solution would appear on the charts or graphs.</p>
            </div>
        `
    },
    
    'scatter-plots': {
        title: 'Scatter Plots',
        content: `
            <div class="lesson-intro">
                Scatter plot graphs are very common on the ACT. One important thing to know is that the number of dots on the scatter plot tells you the number of times that the scientist collected data.
            </div>
            
            <h3>Key Information from Scatter Plots</h3>
            
            <div class="concept-box">
                <h4>Data Collection Frequency</h4>
                <p>Scatter plot questions often ask you to determine how frequently data was being collected. This requires you to:</p>
                <ol>
                    <li>Pay attention to the x-axis (usually time)</li>
                    <li>Count the number of dots</li>
                    <li>Calculate the frequency based on the time intervals</li>
                </ol>
            </div>
            
            <div class="example-box">
                <h4>Example Analysis</h4>
                <p>If you see data points at 10, 20, 30, 40, 50, and 60 minutes (6 points over 50 minutes), the data was collected every 10 minutes.</p>
            </div>
            
            <h3>Common Question Types</h3>
            
            <div class="tip-box">
                <h4>Frequency Questions</h4>
                <p>"According to Figure 1, how often were each of the samples measured?"</p>
                <ul>
                    <li>A. Every minute</li>
                    <li>B. Every 10 minutes</li>
                    <li>C. Every 30 minutes</li>
                    <li>D. Once per hour</li>
                </ul>
            </div>
            
            <div class="tip-box">
                <h4>Projection Questions</h4>
                <p>"If the samples were measured at the same frequency over a three-hour period, how many times would the samples be measured?"</p>
                <p>Use the frequency you determined to calculate total measurements over a different time period.</p>
            </div>
            
            <h3>Reading Scatter Plots</h3>
            
            <div class="rules-box">
                <h4>What to Look For</h4>
                <ul>
                    <li><strong>Time intervals:</strong> Space between data points on the time axis</li>
                    <li><strong>Consistency:</strong> Regular spacing indicates regular data collection</li>
                    <li><strong>Total time span:</strong> From first to last data point</li>
                    <li><strong>Number of points:</strong> Total data points collected</li>
                </ul>
            </div>
            
            <div class="practice-box">
                <h4>Calculation Method</h4>
                <p>To find frequency:</p>
                <ol>
                    <li>Find the time difference between consecutive data points</li>
                    <li>Check if this interval is consistent across the graph</li>
                    <li>This interval is your measurement frequency</li>
                </ol>
            </div>
            
            <div class="concept-box">
                <h4>Multiple Data Series</h4>
                <p>When scatter plots show multiple samples (different colors/shapes), all samples are typically measured at the same frequency. Count dots from any one series to determine the frequency.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Simple Strategy</h4>
                <p>The number of dots on the scatter plot tells you the number of times that the scientist collected data. Use this to determine measurement frequency and make projections.</p>
            </div>
        `
    },
    
    'inverse-trends-multiple-axes': {
        title: 'Inverse Trends and Graphs with Multiple Axes',
        content: `
            <div class="lesson-intro">
                Inverse trends and graphs with multiple axes commonly appear on the more difficult questions at the end of passages.
            </div>
            
            <h3>Inverse Trends</h3>
            
            <div class="concept-box">
                <h4>What Makes Them Challenging</h4>
                <p>For these questions, you need to pay close attention to which way the trend is moving. Often, the harder questions will ask you to go backwards:</p>
                <ul>
                    <li>Working from right to left instead of left to right</li>
                    <li>Following a decreasing trend instead of an increasing one</li>
                    <li>Analyzing what happens when a variable decreases rather than increases</li>
                </ul>
            </div>
            
            <div class="example-box">
                <h4>Example Question</h4>
                <p>"As the speed of the flying squirrel decreases, what happens to the percentage of wing membrane exposed?"</p>
                <p>This requires you to follow the trend in reverse—looking at what happens as speed goes down rather than up.</p>
            </div>
            
            <h3>Graphs with Multiple Axes</h3>
            
            <div class="rules-box">
                <h4>Key Things to Watch</h4>
                <p>Most often, you'll see graphs with 2 different values being graphed on the y-axis:</p>
                <ul>
                    <li>Left y-axis might show speed (feet/second)</li>
                    <li>Right y-axis might show percentage (% of wing membrane exposed)</li>
                    <li>Both share the same x-axis (usually time)</li>
                </ul>
            </div>
            
            <div class="tip-box">
                <h4>Reading Strategy</h4>
                <p>Always read the questions carefully and pay close attention to the units to know whether you are using the values on the left or right side of the y-axis.</p>
            </div>
            
            <h3>Common Question Patterns</h3>
            
            <div class="concept-box">
                <h4>Relationship Questions</h4>
                <p>"Which of the following statements best describes what happened to [variable 1] from 3 to 5 seconds?"</p>
                <ul>
                    <li>A. Increased, because [variable 2] increased</li>
                    <li>B. Increased, because [variable 2] decreased</li>
                    <li>C. Decreased, because [variable 2] increased</li>
                    <li>D. Decreased, because [variable 2] decreased</li>
                </ul>
            </div>
            
            <div class="practice-box">
                <h4>Step-by-Step Approach</h4>
                <ol>
                    <li><strong>Identify the time period:</strong> Find the specified time range on the x-axis</li>
                    <li><strong>Track the first variable:</strong> See if it increases or decreases</li>
                    <li><strong>Track the second variable:</strong> See if it increases or decreases</li>
                    <li><strong>Match the pattern:</strong> Find the answer choice that describes both changes correctly</li>
                </ol>
            </div>
            
            <div class="correction-box">
                <h4>Direction Matters</h4>
                <p>Pay careful attention to the direction specified in the question. "As X decreases" requires you to follow the trend from right to left or from higher to lower values, not the natural left-to-right reading pattern.</p>
            </div>
            
            <div class="tip-box">
                <h4>Legend and Labels</h4>
                <p>Always check the legend to see which line corresponds to which variable, and check axis labels to see which axis corresponds to which measurement.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Take Your Time</h4>
                <p>These questions require careful reading and systematic analysis. Don't rush—make sure you're tracking the right variables in the right direction over the specified time period.</p>
            </div>
        `
    },
    
    'math-on-science': {
        title: 'Math on the Science Test',
        content: `
            <div class="lesson-intro">
                As odd as it seems, on the Science Test there are some questions that require basic math. For these questions, you will not need to find a specific number, but instead you need to be able to effectively estimate and approximate.
            </div>
            
            <h3>No Calculator Strategy</h3>
            
            <div class="rules-box">
                <h4>Rounding and Estimation</h4>
                <p>Since you do not have a calculator in this section, it is usually easiest to round any data points to easier numbers that you can then calculate in your head or with some simple algebra on paper.</p>
            </div>
            
            <div class="example-box">
                <h4>Example: Time Conversion</h4>
                <p>Based on Table 1, approximately how many hours did it take to complete the experiment?</p>
                <p><strong>Time for experiment completion (minutes): 252</strong></p>
                
                <p>Solution: 252 ÷ 60 ≈ 25 ÷ 6 ≈ 4 hours</p>
                <p>Round 252 to 250, then 250 ÷ 60 = 25 ÷ 6 ≈ 4</p>
            </div>
            
            <h3>Common Math Skills Needed</h3>
            
            <div class="concept-box">
                <h4>Percentage Calculations</h4>
                <p>What is 10% of 84? → 8.4 ≈ 8</p>
            </div>
            
            <div class="concept-box">
                <h4>Unit Conversions</h4>
                <ul>
                    <li>How many dozens are in 130? → 130 ÷ 12 ≈ 11</li>
                    <li>How many hours are in 1 week? → 7 × 24 = 168</li>
                </ul>
            </div>
            
            <div class="concept-box">
                <h4>Rate Problems</h4>
                <p>You are driving 28 mph. How long does it take you to complete a 180-mile road trip?</p>
                <p>180 ÷ 28 ≈ 180 ÷ 30 = 6 hours</p>
            </div>
            
            <div class="concept-box">
                <h4>Mass/Weight Problems</h4>
                <p>If 1 mole of a substance weighs 26g, how much do 11 moles weigh?</p>
                <p>11 × 26 ≈ 11 × 25 = 275g</p>
            </div>
            
            <h3>Estimation Techniques</h3>
            
            <div class="tip-box">
                <h4>Cutting Off Digits</h4>
                <p>When dealing with large numbers, cutting off the last digits can make calculations easier:</p>
                <p>252 ÷ 60 becomes 25 ÷ 6</p>
                <p>1,400g ÷ 20.5g becomes 1,400 ÷ 20 = 70</p>
            </div>
            
            <div class="practice-box">
                <h4>Complex Example</h4>
                <p>A bead weighs 20.5g. A bowl weighs 1000g. A bowl filled with beads weighs 1.4kg. How many beads are in the bowl?</p>
                
                <p><strong>Solution:</strong></p>
                <ol>
                    <li>Convert: 1.4kg = 1,400g</li>
                    <li>Weight of beads only: 1,400g - 1,000g = 400g</li>
                    <li>Number of beads: 400g ÷ 20.5g ≈ 400 ÷ 20 = 20 beads</li>
                </ol>
            </div>
            
            <div class="rules-box">
                <h4>Key Strategy</h4>
                <p>Do not try to find exact numbers. The ACT Science section is testing your ability to estimate and approximate quickly. Round to make calculations manageable.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Remember</h4>
                <p>These math questions appear occasionally and test basic arithmetic with scientific data. Focus on estimation and rounding to make calculations manageable without a calculator.</p>
            </div>
        `
    },
    
    'water-knowledge': {
        title: 'Water Knowledge',
        content: `
            <div class="lesson-intro">
                The ACT Science Test loves to ask you about water. These questions can appear as both scientific knowledge questions and experimental thinking questions.
            </div>
            
            <h3>Essential Water Facts</h3>
            
            <div class="rules-box">
                <h4>Key Temperature Points</h4>
                <ul>
                    <li><strong>Boiling Point of H₂O = 100°C</strong></li>
                    <li><strong>Freezing Point of H₂O = 0°C</strong></li>
                </ul>
            </div>
            
            <div class="rules-box">
                <h4>Phase Changes</h4>
                <ul>
                    <li><strong>Evaporation:</strong> Liquid to Gas</li>
                    <li><strong>Condensation:</strong> Gas to Liquid</li>
                </ul>
            </div>
            
            <h3>Common Question Types</h3>
            
            <div class="example-box">
                <h4>Experimental Setup Questions</h4>
                <p><strong>Example:</strong> "The wet soil mixture was oven-dried before the experiment was conducted. What is the most likely reason for doing so?"</p>
                <ul>
                    <li>A. Remove fertilizers</li>
                    <li>B. Remove moisture ✓</li>
                    <li>C. Increase the mass</li>
                    <li>D. Reduce the force</li>
                </ul>
            </div>
            
            <div class="example-box">
                <h4>Temperature-Based Questions</h4>
                <p><strong>Example:</strong> "An experiment is conducted to test the volume of runoff water from a 10kg pile of snow. If the experiment was repeated at -5°C, what would most likely happen to the volume of runoff water collected?"</p>
                <ul>
                    <li>A. Increased, because the melting point of water is above -5°C</li>
                    <li>B. Increased, because the melting point of water is below -5°C</li>
                    <li>C. Decreased, because the melting point of water is above -5°C ✓</li>
                    <li>D. Decreased, because the melting point of water is below -5°C</li>
                </ul>
            </div>
            
            <h3>Reasoning Behind Water Questions</h3>
            
            <div class="concept-box">
                <h4>Why Remove Moisture?</h4>
                <p>Scientists often dry samples to:</p>
                <ul>
                    <li>Get accurate mass measurements of the actual substance (not including water weight)</li>
                    <li>Prevent water from interfering with chemical reactions</li>
                    <li>Ensure consistent starting conditions</li>
                </ul>
            </div>
            
            <div class="concept-box">
                <h4>Temperature Effects</h4>
                <p>Understanding freezing and boiling points helps predict:</p>
                <ul>
                    <li>Whether water will remain liquid, freeze, or evaporate</li>
                    <li>How much liquid water will be collected in experiments</li>
                    <li>Whether phase changes will occur during experiments</li>
                </ul>
            </div>
            
            <div class="tip-box">
                <h4>Most Questions Don't Require Charts</h4>
                <p>The majority of water questions focus on experimental steps that relate to water. Usually, these questions will not require you to look at a chart or graph—they test your basic understanding of water's properties.</p>
            </div>
            
            <div class="practice-box">
                <h4>Think Logically</h4>
                <p>When you see water-related questions:</p>
                <ol>
                    <li>Consider the temperature conditions</li>
                    <li>Think about what state water would be in</li>
                    <li>Consider why scientists might want to remove or control water</li>
                    <li>Use the key temperatures (0°C and 100°C) as reference points</li>
                </ol>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Strategy</h4>
                <p>These questions test basic scientific thinking about water's properties. Remember the key temperatures and phase changes, and think about why controlling water content might be important in experiments.</p>
            </div>
        `
    },
    
    'experimental-setup': {
        title: 'Experimental Setup',
        content: `
            <div class="lesson-intro">
                Other questions will ask you to identify the "most likely" reason that a certain setup or step was taken in the experiment. When you see "most likely" in the question, think like a scientist and pick the answer that makes the most logical sense.
            </div>
            
            <h3>Key Indicator</h3>
            
            <div class="tip-box">
                <h4>Look for "Most Likely"</h4>
                <p>When you see the term "most likely" in the question, the answer is usually not going to be in the passage; instead, you will need to rely on your own outside science knowledge and logical thinking.</p>
            </div>
            
            <h3>Common Experimental Setup Questions</h3>
            
            <div class="example-box">
                <h4>Controlling Variables</h4>
                <p><strong>Example:</strong> "The reason that all of the plants in the experiment were grown in the same acre plot was most likely:"</p>
                <ul>
                    <li>A. To be exposed to different environments</li>
                    <li>B. To receive the same amount of rain ✓</li>
                    <li>C. To increase cross pollination</li>
                    <li>D. To increase their growth rates</li>
                </ul>
                
                <p><strong>Logic:</strong> Same location = same environmental conditions</p>
            </div>
            
            <div class="example-box">
                <h4>Environmental Control</h4>
                <p><strong>Example:</strong> "What is the most likely reason the terrariums were placed outside?"</p>
                <ul>
                    <li>A. To receive the same soil quality</li>
                    <li>B. To receive the same amount of rain</li>
                    <li>C. To be the same temperature ✓</li>
                    <li>D. To receive the same nutrients</li>
                </ul>
                
                <p><strong>Logic:</strong> Outside placement ensures all samples experience the same temperature conditions</p>
            </div>
            
            <h3>Scientific Thinking Principles</h3>
            
            <div class="concept-box">
                <h4>Control Variables</h4>
                <p>Scientists try to keep everything the same except for the variable they're testing. Look for setups that ensure:</p>
                <ul>
                    <li>Same environmental conditions (temperature, light, humidity)</li>
                    <li>Same starting materials or amounts</li>
                    <li>Same time periods for observation</li>
                    <li>Same measurement techniques</li>
                </ul>
            </div>
            
            <div class="concept-box">
                <h4>Eliminate Bias</h4>
                <p>Experimental setups often aim to:</p>
                <ul>
                    <li>Prevent external factors from affecting results</li>
                    <li>Ensure fair comparison between different groups</li>
                    <li>Reduce measurement errors</li>
                    <li>Make results repeatable</li>
                </ul>
            </div>
            
            <h3>How to Approach These Questions</h3>
            
            <div class="rules-box">
                <h4>Think Like a Scientist</h4>
                <ol>
                    <li><strong>Identify what's being tested:</strong> What variable is the experiment trying to measure?</li>
                    <li><strong>Consider what needs to be controlled:</strong> What other factors might affect the results?</li>
                    <li><strong>Look for the setup that controls those factors:</strong> Which answer choice best ensures a fair test?</li>
                </ol>
            </div>
            
            <div class="practice-box">
                <h4>Common Setup Purposes</h4>
                <ul>
                    <li><strong>Same location:</strong> Controls temperature, weather, soil conditions</li>
                    <li><strong>Same time period:</strong> Controls seasonal effects, ensures fair comparison</li>
                    <li><strong>Multiple trials:</strong> Increases reliability of results</li>
                    <li><strong>Control groups:</strong> Provides baseline for comparison</li>
                </ul>
            </div>
            
            <div class="correction-box">
                <h4>Avoid Overthinking</h4>
                <p>These questions test basic scientific reasoning, not complex theories. Go with the answer that makes the most logical sense for ensuring a fair, controlled experiment.</p>
            </div>
            
            <div class="key-takeaway">
                <h4>Core Principle</h4>
                <p>Good experimental design controls for outside variables while testing only the variable of interest. The "most likely" reason for any setup is usually to make the experiment more controlled and reliable.</p>
            </div>
        `
    },
}

// Merge with existing lessonContent
Object.assign(lessonContent, scienceLessons);