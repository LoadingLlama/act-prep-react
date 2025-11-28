// WHICH-CHOICE and WORD-CHOICE questions (final 29 questions)

const finalQuestions = {
  // WHICH-CHOICE: Need 16 questions (positions 35-50)
  'which-choice': [
    {
      position: 35,
      title: 'Vivid Sensory Detail',
      problem_text: 'The bakery <u>smelled good</u> every morning.\n\nWhich choice provides the most vivid sensory description?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'had a nice smell' },
        { letter: 'C', text: 'filled the street with the warm scent of cinnamon and fresh bread' },
        { letter: 'D', text: 'was known for its aroma' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Smelled good' is vague and generic—'good' doesn't create vivid sensory imagery about what specific scents characterize the bakery.",
        B: "'Had a nice smell' is equally vague as the original—'nice' doesn't specify which aromas or create sensory detail.",
        C: "This creates vivid sensory imagery through specific details: 'warm scent' (temperature + smell), 'cinnamon' (specific spice), 'fresh bread' (specific baked good)—these concrete details allow readers to imagine the exact smells.",
        D: "'Known for its aroma' tells rather than shows—it states the bakery has a notable smell without providing the vivid sensory details that would let readers experience it."
      }
    },
    {
      position: 36,
      title: 'Establishing Tone',
      problem_text: '<u>The investigation proceeded.</u> Forensic teams examined the scene methodically, documenting each piece of evidence with meticulous precision before the laboratory analysis would begin.\n\nWhich choice best establishes a formal, methodical tone for the opening?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'The investigation happened.' },
        { letter: 'C', text: 'The investigation unfolded with systematic rigor.' },
        { letter: 'D', text: 'They started investigating stuff.' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Proceeded' is neutral and somewhat formal, but it doesn't establish the methodical, precise tone that follows—it's adequate but not as strong as an option that previews the systematic approach.",
        B: "'Happened' is too casual and passive for a formal forensic context—it doesn't convey the deliberate, organized nature of professional investigation.",
        C: "'Unfolded with systematic rigor' establishes formal, methodical tone through elevated vocabulary ('unfolded,' 'systematic rigor') that matches and previews the detailed, precise forensic work described in the following sentence.",
        D: "Casual language ('stuff') and informal structure completely clash with the formal, technical tone of forensic investigation—this undermines rather than establishes appropriate tone."
      }
    },
    {
      position: 37,
      title: 'Relevant Detail vs. Digression',
      problem_text: 'Marie Curie won two Nobel Prizes for her research on radioactivity. <u>Her daughter Irène also became a chemist and won a Nobel Prize, continuing the family tradition.</u> Curie\'s isolation of radium transformed medical treatments.\n\nWhich choice maintains focus on Marie Curie\'s achievements without digressing?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'She was the first woman to win a Nobel Prize.' },
        { letter: 'C', text: 'The Nobel Prize was established by Alfred Nobel, a Swedish inventor.' },
        { letter: 'D', text: 'Many women have since won Nobel Prizes in various fields.' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "While interesting, discussing Irène's achievements digresses from focusing on Marie's specific accomplishments—the paragraph's focus is Marie's achievements, not family legacy.",
        B: "This adds relevant detail about Marie's historic distinction without digressing—it builds on the Nobel Prize mention while maintaining focus on Marie's pioneering status.",
        C: "Explaining the Nobel Prize's origin is unnecessary background that digresses from Marie's accomplishments—readers likely know about the prize, and this shifts focus to Alfred Nobel.",
        D: "Discussing other women Nobel laureates moves away from Marie's specific achievements to generalize about women scientists—this changes focus from the individual to a broader group."
      }
    },
    {
      position: 38,
      title: 'Quantitative Specificity',
      problem_text: 'The conservation program <u>increased the eagle population</u> in the region.\n\nWhich choice most precisely quantifies the program\'s success?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'raised the eagle population from 12 breeding pairs in 1980 to 147 pairs in 2020' },
        { letter: 'C', text: 'made the eagle population better' },
        { letter: 'D', text: 'helped eagles in the area' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'Increased' indicates growth but lacks quantitative data—we don't know by how much or over what timeframe, making the success impossible to evaluate.",
        B: "This provides precise quantification with specific numbers (12 to 147 breeding pairs), units of measurement (breeding pairs), and timeframe (1980-2020)—this data allows readers to assess the program\'s dramatic success.",
        C: "'Made better' is vague and subjective—'better' doesn't quantify the change or specify what improved about the population.",
        D: "'Helped eagles' is extremely vague—it doesn't specify what improved (population numbers, health, habitat) or by how much."
      }
    },
    {
      position: 39,
      title: 'Active Verb Choice',
      problem_text: 'The hurricane <u>caused damage to</u> coastal infrastructure.\n\nWhich choice uses the most active, direct language?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'damaged' },
        { letter: 'C', text: 'was responsible for damage to' },
        { letter: 'D', text: 'resulted in damage being done to' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'Caused damage to' uses the weaker noun 'damage' instead of the stronger verb 'damaged'—this adds unnecessary words and reduces directness.",
        B: "'Damaged' converts the noun phrase into a direct active verb—this is more concise and forceful, making the hurricane's destructive action immediate and clear.",
        C: "'Was responsible for damage to' is even more indirect and wordy than the original—it further distances the action through passive construction.",
        D: "'Resulted in damage being done to' is extremely wordy and passive—it uses multiple helping verbs and passive voice where a single active verb ('damaged') would work."
      }
    },
    {
      position: 40,
      title: 'Logical Sequence Introduction',
      problem_text: '<u>There are steps in the scientific method.</u> First, researchers formulate a hypothesis. Then, they design experiments to test it. Finally, they analyze results and draw conclusions.\n\nWhich choice most effectively introduces the process that follows?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'The scientific method involves several sequential steps.' },
        { letter: 'C', text: 'Science is important.' },
        { letter: 'D', text: 'Researchers do experiments.' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'There are steps' is weak and generic—it doesn't preview that these steps form a sequential process or belong specifically to the scientific method.",
        B: "This effectively introduces what follows by naming the process (scientific method), indicating structure (several steps), and previewing their nature (sequential)—this prepares readers for the ordered explanation.",
        C: "'Science is important' is too broad and doesn't introduce the specific process about to be described—it's a general statement unrelated to explaining methodology.",
        D: "'Researchers do experiments' mentions only one part of the process without introducing the full method or its sequential nature—this fails to frame the complete explanation that follows."
      }
    },
    {
      position: 41,
      title: 'Appropriate Technical Level',
      problem_text: 'The smartphone app <u>utilizes advanced cryptographic algorithms employing AES-256 encryption protocols with SHA-2 hash functions</u> to protect user data.\n\nWhich choice is most appropriate for a general audience consumer review?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'uses strong encryption' },
        { letter: 'C', text: 'employs data security measures' },
        { letter: 'D', text: 'does computer security stuff' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "This level of technical detail (AES-256, SHA-2 hash functions) is excessive for general consumer reviews—most readers won't understand these specifications and don't need this depth for a purchasing decision.",
        B: "'Uses strong encryption' appropriately conveys the security benefit in accessible language—'strong' indicates quality without requiring technical knowledge, and 'encryption' is widely understood for data protection.",
        C: "'Employs data security measures' is somewhat vague—'measures' doesn't clarify that encryption specifically is used, making it less informative than option B.",
        D: "Casual phrasing ('stuff') is too informal for any review, and 'computer security' is imprecise about what specific protection is provided."
      }
    },
    {
      position: 42,
      title: 'Concise Conclusion',
      problem_text: 'The drought affected agriculture, reduced water supplies, and forced population migrations. <u>All of these things that have been discussed above happened because there was not enough rain for several years.</u>\n\nWhich choice most concisely concludes the impact list?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'These interconnected effects devastated the region.' },
        { letter: 'C', text: 'The effects were bad.' },
        { letter: 'D', text: 'In summary, to repeat what was said, the impacts mentioned in the previous sentence were significant.' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "This is extremely wordy and redundant—'all of these things discussed above' and 'not enough rain for several years' repeat what's already established, and the entire sentence could be far more concise.",
        B: "This concisely synthesizes the impacts ('these interconnected effects' efficiently references the three listed impacts) and adds meaningful evaluation ('devastated') without unnecessary repetition.",
        C: "'Were bad' is too informal and vague for formal writing about serious consequences—it doesn't convey the severity or interconnected nature of the impacts.",
        D: "This is even wordier than the original—'in summary, to repeat what was said' is redundant meta-commentary, and it explicitly restates that it's repeating information."
      }
    },
    {
      position: 43,
      title: 'Effective Contrast',
      problem_text: 'Artificial intelligence excels at processing vast datasets rapidly. <u>Humans are different.</u>\n\nWhich choice most effectively contrasts human capabilities with AI?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Humans work more slowly.' },
        { letter: 'C', text: 'Human intelligence offers contextual understanding and creative problem-solving that machines cannot replicate.' },
        { letter: 'D', text: 'People are not computers.' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Are different' is too vague—it acknowledges difference without explaining what human capabilities offer that AI lacks, missing the opportunity for meaningful contrast.",
        B: "'Work more slowly' only acknowledges a limitation without highlighting human strengths—effective contrast should show what humans do well, not just what they do worse.",
        C: "This creates effective contrast by highlighting specific human strengths (contextual understanding, creative problem-solving) that complement AI's data processing strength—it shows they excel in different areas rather than simply being different.",
        D: "'Not computers' states the obvious without providing meaningful contrast about capabilities—this is a tautology rather than a substantive comparison."
      }
    },
    {
      position: 44,
      title: 'Sophisticated Cause-Effect',
      problem_text: 'Deforestation <u>leads to</u> increased soil erosion.\n\nWhich choice most sophisticatedly explains the causal mechanism?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'causes' },
        { letter: 'C', text: 'accelerates soil erosion by removing tree roots that stabilize soil structure and leaf canopies that reduce rainfall impact' },
        { letter: 'D', text: 'makes soil erosion happen' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Leads to' indicates causation but doesn't explain the mechanism—readers know deforestation causes erosion but not how or why this relationship exists.",
        B: "'Causes' is more direct than 'leads to' but equally lacking in mechanistic explanation—it states the relationship without explaining it.",
        C: "This explains the causal mechanism with specific details: removing tree roots eliminates soil stabilization, and removing canopies eliminates rainfall protection—this shows readers why and how deforestation causes erosion.",
        D: "'Makes happen' is casual phrasing that adds no explanatory value—it's less formal and less informative than even 'causes.'"
      }
    },
    {
      position: 45,
      title: 'Appropriate Evidence Type',
      problem_text: 'Solar panels have become more affordable. <u>My neighbor installed some last year.</u>\n\nWhich choice provides the most relevant evidence for the claim?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Solar energy comes from the sun.' },
        { letter: 'C', text: 'Installation costs dropped 70% over the past decade, making residential solar economically viable for average homeowners.' },
        { letter: 'D', text: 'Many people like renewable energy.' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "An anecdotal example about one neighbor doesn't effectively support a claim about affordability trends—this is weak evidence lacking data about actual cost changes.",
        B: "Explaining where solar energy comes from is irrelevant to a claim about affordability—this provides background information unrelated to cost trends.",
        C: "This provides strong quantitative evidence with specific data (70% cost reduction), timeframe (decade), and direct relevance to the affordability claim—this convincingly supports the statement about increased affordability.",
        D: "General popularity doesn't address affordability—people might desire something regardless of whether it's become more affordable or not."
      }
    },
    {
      position: 46,
      title: 'Maintaining Parallel Focus',
      problem_text: 'The workshop will teach participants how to write effective proposals, deliver persuasive presentations, and <u>you will also learn about team collaboration</u>.\n\nWhich choice maintains parallel structure and consistent focus?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'collaborate effectively in teams' },
        { letter: 'C', text: 'teams are important too' },
        { letter: 'D', text: 'the instructor talks about working together' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "This breaks parallel structure—the first two items use infinitives ('to write,' 'deliver') while this switches to a clause ('you will learn'), creating grammatical inconsistency.",
        B: "'Collaborate effectively in teams' maintains parallel structure with the same infinitive form as the previous items (write, deliver, collaborate)—all three are now consistent verbs describing skills taught.",
        C: "'Teams are important' breaks parallel structure and shifts from listing skills taught to making a general statement—this doesn't match the pattern of describing workshop content.",
        D: "This shifts focus from what participants will learn to what the instructor does—the parallel items should all describe skills participants gain, not instructor actions."
      }
    },
    {
      position: 47,
      title: 'Eliminating Ambiguous Pronouns',
      problem_text: 'The coach told the player that <u>he</u> needed to improve his defensive skills.\n\nWhich choice eliminates the ambiguous pronoun reference?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'the player' },
        { letter: 'C', text: 'everyone' },
        { letter: 'D', text: 'somebody' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'He' is ambiguous—it could refer to either the coach or the player, leaving unclear who needs to improve defensive skills.",
        B: "'The player' eliminates ambiguity by explicitly stating who needs improvement—this makes clear that the coach is giving feedback about the player's skills, not reflecting on his own abilities.",
        C: "'Everyone' changes the meaning—it would indicate both coach and player need improvement, which isn't the point of the coach giving specific feedback to the player.",
        D: "'Somebody' adds vagueness rather than clarifying—it suggests an unidentified person needs improvement, undermining the specific coach-player interaction."
      }
    },
    {
      position: 48,
      title: 'Precise Qualification',
      problem_text: 'Exercise improves health. <u>Everyone should do it.</u>\n\nWhich choice adds appropriate qualification to avoid overgeneralizing?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Exercise is the only way to be healthy.' },
        { letter: 'C', text: 'Most people can benefit from regular physical activity, though individuals should consult healthcare providers about appropriate exercise for their specific conditions.' },
        { letter: 'D', text: 'Exercise never has risks.' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Everyone should do it' overgeneralizes—some people have medical conditions, injuries, or disabilities that require modified exercise approaches or medical supervision before starting exercise programs.",
        B: "This creates an even more extreme overgeneralization by claiming exercise is the only path to health—nutrition, sleep, stress management, and genetics all play crucial roles in health.",
        C: "This appropriately qualifies the recommendation by acknowledging that most (not all) people benefit, and emphasizing individual medical considerations—this avoids overgeneralization while still supporting exercise's value.",
        D: "This is factually false—exercise does carry risks (injuries, overtraining, cardiovascular stress for certain conditions), and claiming otherwise undermines credibility through absolute statements."
      }
    },
    {
      position: 49,
      title: 'Sophisticated Counterargument Transition',
      problem_text: 'Critics argue the policy will harm small businesses. <u>The policy helps small businesses.</u>\n\nWhich choice most effectively acknowledges and refutes the counterargument?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'However, evidence suggests the policy may actually benefit small businesses by reducing regulatory burdens and providing tax incentives.' },
        { letter: 'C', text: 'The critics are wrong.' },
        { letter: 'D', text: 'But actually the opposite is true.' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "This bluntly contradicts critics without acknowledgment or evidence—effective refutation should recognize the opposing view while explaining why evidence points elsewhere.",
        B: "This sophisticatedly refutes the counterargument by using 'However' to signal rebuttal, 'evidence suggests' to indicate empirical basis, and providing specific mechanisms (reduced burdens, tax incentives) that explain why critics may be mistaken.",
        C: "'Critics are wrong' is dismissive without substance—effective refutation provides evidence and reasoning, not just contradiction.",
        D: "'The opposite is true' provides simple contradiction without evidence, reasoning, or acknowledgment of why critics might hold their view—this fails to engage seriously with the counterargument."
      }
    },
    {
      position: 50,
      title: 'Ultimate Integration: Multi-Goal Fulfillment',
      problem_text: 'The museum\'s new exhibit explores daily life in medieval Europe. <u>Visitors can see old things from history.</u>\n\nWhich choice best establishes scholarly tone, provides specific detail, and maintains engagement?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'The displays are cool.' },
        { letter: 'C', text: 'Interactive displays allow visitors to examine illuminated manuscripts, touch replica tools, and experience period music, bringing the medieval world tangibly to life.' },
        { letter: 'D', text: 'There are artifacts.' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Old things from history' is casual language inappropriate for museum description—it lacks specificity, scholarly tone, and the vivid detail that would engage readers.",
        B: "Casual language ('cool') destroys scholarly credibility, and the sentence provides no specific information about what the exhibit contains—this fails all three goals.",
        C: "This achieves all three goals: scholarly tone through precise vocabulary ('illuminated manuscripts,' 'replica tools,' 'period music'), specific detail listing exact exhibit components, and engagement through emphasizing interactivity and sensory experience ('touch,' 'experience,' 'tangibly to life').",
        D: "'There are artifacts' is vague and dry—it provides minimal information, lacks specific detail about what artifacts, and fails to engage readers through vivid description or interactive elements."
      }
    }
  ],

  // WORD-CHOICE: Need 13 questions (positions 38-50)
  'word-choice': [
    {
      position: 38,
      title: 'Connotation Precision',
      problem_text: 'The politician <u>manipulated</u> public opinion through carefully crafted speeches.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'shaped' },
        { letter: 'C', text: 'controlled' },
        { letter: 'D', text: 'handled' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'Manipulated' has negative connotations of deception or unethical influence—if the passage isn't making a critical judgment about the politician, this word choice introduces inappropriate bias.",
        B: "'Shaped' is neutral, describing the act of influencing opinion through rhetoric without the negative connotations of deception—this allows the facts to speak without loaded language unless criticism is intended.",
        C: "'Controlled' implies total domination of public thought, which overstates what speeches can accomplish—people retain independent judgment even when influenced.",
        D: "'Handled' is too casual and vague for formal writing about political communication—it doesn't precisely describe the relationship between speeches and public opinion."
      }
    },
    {
      position: 39,
      title: 'Verb Precision: Near-Synonyms',
      problem_text: 'The detective <u>examined</u> the crime scene for evidence.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'inspected' },
        { letter: 'C', text: 'scrutinized' },
        { letter: 'D', text: 'glanced at' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Examined' is good but somewhat general—it indicates careful looking but doesn't emphasize the thoroughness and critical analysis essential to crime scene investigation.",
        B: "'Inspected' suggests systematic checking, which fits but doesn't fully capture the intense analytical attention detectives give to crime scenes searching for small clues.",
        C: "'Scrutinized' best captures the intense, detailed examination with critical analysis that characterizes professional crime scene investigation—it emphasizes thoroughness and analytical rigor.",
        D: "'Glanced at' completely contradicts the careful attention required—glancing is brief and casual, opposite of the thorough examination crime scenes demand."
      }
    },
    {
      position: 40,
      title: 'Academic Register',
      problem_text: 'The study <u>found out</u> that sleep deprivation affects cognitive function.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'figured out' },
        { letter: 'C', text: 'revealed' },
        { letter: 'D', text: 'discovered' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Found out' is too casual for academic writing—it's phrasal verb (verb + particle) construction is less formal than single-word alternatives appropriate for research contexts.",
        B: "'Figured out' is even more casual than 'found out'—this colloquial expression is inappropriate for formal research reporting.",
        C: "'Revealed' is appropriately formal for academic writing, suggesting the study uncovered or made evident information previously unclear—this is standard language for discussing research findings.",
        D: "'Discovered' could work but slightly overstates—discoveries are major findings, while this might be confirming previous research. 'Revealed' is more neutral about the finding's novelty."
      }
    },
    {
      position: 41,
      title: 'Intensity Calibration',
      problem_text: 'The teacher was <u>annoyed</u> when students repeatedly arrived late to class.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'enraged' },
        { letter: 'C', text: 'bothered' },
        { letter: 'D', text: 'frustrated' }
      ],
      correct_answer: 'D',
      explanations: {
        A: "'Annoyed' suggests mild irritation, which may understate the emotion—repeated lateness typically causes more than mere annoyance, especially disrupting class instruction.",
        B: "'Enraged' is too intense—extreme anger is disproportionate to lateness unless the passage emphasizes an over-reaction. This would suggest loss of control inappropriate for professional context.",
        C: "'Bothered' is too mild and vague—it doesn't capture the specific frustration of repeatedly dealing with disruptive behavior that undermines teaching.",
        D: "'Frustrated' appropriately conveys displeasure at an ongoing problem (repeated lateness) with the right intensity—more than annoyed but less than enraged, matching professional disappointment at disruptive behavior."
      }
    },
    {
      position: 42,
      title: 'Action Specificity',
      problem_text: 'The author <u>wrote</u> three novels in five years.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'penned' },
        { letter: 'C', text: 'composed' },
        { letter: 'D', text: 'created' }
      ],
      correct_answer: 'A',
      explanations: {
        A: "'Wrote' is clear, precise, and direct for describing novel composition—it's the standard, unambiguous verb for creating written works like novels.",
        B: "'Penned' is acceptable but slightly pretentious or old-fashioned—while technically correct, it draws unnecessary attention to word choice rather than focusing on content.",
        C: "'Composed' is typically used for music, poetry, or formal letters—while applicable to writing, it's less natural for novels than the straightforward 'wrote.'",
        D: "'Created' is too broad—it could mean wrote, illustrated, conceptualized, or produced. 'Wrote' specifically indicates the author produced the written text."
      }
    },
    {
      position: 43,
      title: 'Temporal Precision',
      problem_text: 'The company <u>recently</u> announced plans to expand operations.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'last week' },
        { letter: 'C', text: 'soon' },
        { letter: 'D', text: 'eventually' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'Recently' is vague—it could mean yesterday, last week, or last month, leaving readers uncertain about the timing and whether the information is current.",
        B: "'Last week' provides specific timeframe, allowing readers to judge the information's timeliness and relevance—specific temporal references are generally better than vague ones.",
        C: "'Soon' refers to future time, but the sentence describes a past announcement—this creates temporal confusion about when the announcement occurred.",
        D: "'Eventually' suggests something happening after delays or obstacles, which doesn't fit an announcement context—announcements happen at specific moments, not gradually over time."
      }
    },
    {
      position: 44,
      title: 'Cause-Effect Verb Selection',
      problem_text: 'The storm <u>affected</u> coastal communities.\n\nWhich choice most precisely indicates the nature of the storm\'s impact?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'influenced' },
        { letter: 'C', text: 'devastated' },
        { letter: 'D', text: 'touched' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Affected' is vague about the nature and severity of impact—it could mean anything from mild inconvenience to catastrophic destruction, requiring more precision.",
        B: "'Influenced' suggests subtle, indirect effects—this is too weak for storms, which cause direct physical damage rather than gentle influence.",
        C: "'Devastated' specifically indicates severe destruction and damage—if the passage context supports this interpretation, it's far more precise than vague 'affected,' conveying the storm's catastrophic impact.",
        D: "'Touched' is far too gentle and poetic for storm damage—storms don't gently touch communities; they cause concrete physical effects that need direct language."
      }
    },
    {
      position: 45,
      title: 'Eliminating Colloquialisms',
      problem_text: 'The research findings were <u>pretty surprising</u> to the scientific community.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'really unexpected' },
        { letter: 'C', text: 'unexpected' },
        { letter: 'D', text: 'kind of surprising' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Pretty' as an intensifier is informal/colloquial—'pretty surprising' is appropriate for conversation but too casual for formal scientific writing.",
        B: "'Really' is also an informal intensifier—while slightly more acceptable than 'pretty,' formal writing should avoid these colloquial intensifiers in favor of more precise language.",
        C: "'Unexpected' is appropriately formal and self-sufficient—good formal writing often doesn't need intensifiers; the adjective alone conveys that the findings surprised the community.",
        D: "'Kind of' is extremely informal and also hedges/weakens the claim—this colloquial phrase is inappropriate for formal scientific writing."
      }
    },
    {
      position: 46,
      title: 'Distinguishing Abstract vs. Concrete',
      problem_text: 'The program <u>fostered</u> leadership skills among participants.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'encouraged' },
        { letter: 'C', text: 'developed' },
        { letter: 'D', text: 'made' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Fostered' suggests creating supportive conditions for growth—it's somewhat abstract and implies indirect development rather than direct skill-building.",
        B: "'Encouraged' suggests motivating participants toward leadership—this focuses on attitude/willingness rather than actual skill acquisition and development.",
        C: "'Developed' directly indicates the program built/created leadership skills—this is most precise for describing a program that teaches and cultivates concrete abilities.",
        D: "'Made' is too vague and casual—it doesn't specify what kind of creation or influence occurred, and it's less precise than 'developed' for skill acquisition."
      }
    },
    {
      position: 47,
      title: 'Nuanced Criticism vs. Praise',
      problem_text: 'The film\'s pacing was <u>slow</u>, allowing viewers to absorb the cinematographer\'s stunning visual compositions.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'sluggish' },
        { letter: 'C', text: 'deliberate' },
        { letter: 'D', text: 'boring' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Slow' has negative connotations of dragging or tedious pacing—but the sentence presents the pacing positively (allowing absorption of visuals), creating mixed signals.",
        B: "'Sluggish' intensifies negative connotations of labored, unresponsive movement—this contradicts the positive framing of the pacing's purpose.",
        C: "'Deliberate' has positive/neutral connotations of intentional, measured pacing for artistic purpose—this aligns with the sentence's positive framing of allowing visual appreciation.",
        D: "'Boring' is explicitly negative criticism—this directly contradicts the sentence's praise of how the pacing enables appreciation of stunning visuals."
      }
    },
    {
      position: 48,
      title: 'Scientific Precision',
      problem_text: 'The bacteria <u>grew</u> in the petri dish.\n\nWhich choice uses the most precise scientific terminology?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'multiplied' },
        { letter: 'C', text: 'proliferated' },
        { letter: 'D', text: 'got bigger' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Grew' is ambiguous—it could mean individual cells increased in size (growth) or that the population increased through reproduction (proliferation). Scientific writing requires distinguishing these concepts.",
        B: "'Multiplied' clearly indicates population increase through reproduction, which is better than 'grew'—however, 'proliferated' is the more precise scientific term for rapid reproduction/spread.",
        C: "'Proliferated' is the precise scientific term for rapid reproduction and spread of cells—this is standard terminology in microbiology for describing bacterial population increase in culture.",
        D: "'Got bigger' is casual and ambiguous like 'grew'—it lacks scientific precision and could refer to cell size or population, plus it's too informal for scientific writing."
      }
    },
    {
      position: 49,
      title: 'Distinguishing Objectivity Levels',
      problem_text: 'The controversial policy <u>obviously</u> failed to achieve its stated objectives.\n\nWhich choice maintains appropriate objectivity for analytical writing?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'clearly' },
        { letter: 'C', text: 'undoubtedly' },
        { letter: 'D', text: 'failed' }
      ],
      correct_answer: 'D',
      explanations: {
        A: "'Obviously' inserts the writer\'s opinion that the failure should be evident to everyone—this undermines objectivity by assuming readers share this view and discouraging alternative interpretations.",
        B: "'Clearly' is slightly better than 'obviously' but still asserts the writer\'s interpretation as self-evident—objective analysis should present evidence and let readers judge clarity.",
        C: "'Undoubtedly' is even more emphatic than 'obviously'—it completely dismisses any reasonable doubt, which is inappropriate for analytical writing about debatable policy outcomes.",
        D: "Removing the qualifier and stating 'failed' maintains objectivity—the writer can present evidence of failure without insisting readers must see it as obvious/clear, allowing evidence to support the claim."
      }
    },
    {
      position: 50,
      title: 'Ultimate Word Choice Sophistication',
      problem_text: 'The author\'s latest novel <u>looks at</u> the intersection of technology and human relationships in contemporary society.\n\nWhich choice most precisely captures the analytical nature of literary work?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'examines' },
        { letter: 'C', text: 'explores' },
        { letter: 'D', text: 'talks about' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Looks at' is too casual and physical—it suggests mere observation rather than the analytical depth and creative investigation that characterizes literary examination of themes.",
        B: "'Examines' suggests systematic analytical study—while more formal than 'looks at,' it implies scientific/academic approach rather than the creative, multi-faceted investigation typical of literary fiction.",
        C: "'Explores' best captures how fiction engages themes—it suggests investigating from multiple angles, discovering new perspectives, and creative inquiry rather than systematic analysis, matching how literature approaches complex subjects.",
        D: "'Talks about' is extremely casual, almost conversational—novels don't 'talk'; they dramatize, investigate, portray. This fails to convey the sophisticated literary engagement with themes."
      }
    }
  ]
};

module.exports = finalQuestions;
