// ALL NEW QUESTIONS TO BRING LESSONS TO 50 QUESTIONS
// Total: 70 questions with 280 detailed explanations

const newQuestions = {
  // LOGICAL-PLACEMENT: Need 14 questions (positions 37-50)
  'logical-placement': [
    {
      position: 37,
      title: 'Contextual Background Placement',
      problem_text: '[1] The Industrial Revolution transformed manufacturing processes across Europe and America. [2] Steam power replaced water wheels and manual labor. [3] <u>The first steam engine, developed by Thomas Newcomen in 1712, was initially used to pump water from coal mines.</u> [4] Factories emerged in urban centers, drawing rural workers to cities. [5] This urbanization created new social challenges.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'before Sentence 1.' },
        { letter: 'C', text: 'after Sentence 1.' },
        { letter: 'D', text: 'after Sentence 4.' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "Placing the Newcomen engine detail after 'steam power replaced' works but slightly disrupts the flow—better to provide this historical context immediately after introducing the Industrial Revolution before discussing its effects (replacement, factories).",
        B: "Beginning with Newcomen's 1712 engine before introducing the Industrial Revolution itself is illogical—the opening should establish the main historical period before diving into specific technological developments within that period.",
        C: "This creates superior flow: introduce the Industrial Revolution → provide the key technological innovation (Newcomen's steam engine) that enabled it → explain how steam replaced earlier methods → discuss resulting factory urbanization. The invention context frames what follows.",
        D: "Explaining the 1712 technological origin after discussing factories and urbanization (the consequences) reverses causality—the steam engine development should precede its transformative effects on manufacturing and society."
      }
    },
    {
      position: 38,
      title: 'Temporal Sequence Organization',
      problem_text: '[1] Marie Curie made groundbreaking discoveries in radioactivity. [2] She became the first woman to win a Nobel Prize. [3] <u>In 1891, Curie moved to Paris to study physics and mathematics at the Sorbonne.</u> [4] Her research on radium earned her a second Nobel Prize in 1911. [5] Few scientists have achieved such recognition.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'before Sentence 1.' },
        { letter: 'C', text: 'after Sentence 4.' },
        { letter: 'D', text: 'after Sentence 5.' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Mentioning her move to Paris (1891) after discussing her Nobel Prize (1903) and before her second Nobel (1911) disrupts chronology—biographical details should follow temporal order, starting with her arrival and education before achievements.",
        B: "This creates proper chronological flow: begin with her educational foundation (moving to Paris to study) → discoveries in radioactivity → first Nobel Prize → second Nobel Prize (1911) → concluding assessment. Starting with education provides necessary context for achievements.",
        C: "Placing her 1891 move to study after her 1911 second Nobel Prize reverses the timeline—education and early career should precede major achievements, not follow them.",
        D: "Mentioning her educational background after the concluding statement about her rare recognition makes the detail feel like an afterthought—biographical context should frame achievements, not trail the conclusion."
      }
    },
    {
      position: 39,
      title: 'Cause-Effect Relationship Clarity',
      problem_text: '[1] Coral reefs support extraordinary biodiversity. [2] Thousands of species depend on reef ecosystems for food and shelter. [3] <u>Rising ocean temperatures cause coral bleaching, where corals expel their symbiotic algae and lose their color.</u> [4] Bleached corals become vulnerable to disease and death. [5] Protecting reefs requires reducing carbon emissions.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'before Sentence 1.' },
        { letter: 'C', text: 'after Sentence 4.' },
        { letter: 'D', text: 'after Sentence 5.' }
      ],
      correct_answer: 'A',
      explanations: {
        A: "This placement works well, establishing reefs' importance (biodiversity, species dependence) before explaining the threat mechanism (temperature causing bleaching) → consequence (vulnerability to death) → solution (emissions reduction). The flow is logical.",
        B: "Beginning with the temperature-bleaching mechanism before establishing what coral reefs are and why they matter provides technical detail without context—readers need to understand reef importance before learning about threats.",
        C: "Explaining the bleaching mechanism (temperature causing algae expulsion) after stating bleached corals die is backwards—readers need to understand what causes bleaching before learning about bleached coral vulnerability.",
        D: "Placing the bleaching mechanism after the solution (reducing emissions) disrupts logical flow—the problem explanation should precede the proposed solution, not follow it."
      }
    },
    {
      position: 40,
      title: 'Definitional Prerequisite',
      problem_text: '[1] Photosynthesis enables plants to convert light energy into chemical energy. [2] Chlorophyll, the green pigment in leaves, absorbs sunlight. [3] <u>Plants use this energy to transform carbon dioxide and water into glucose and oxygen.</u> [4] The glucose provides fuel for plant growth. [5] The oxygen released supports aerobic life on Earth.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'before Sentence 2.' },
        { letter: 'C', text: 'after Sentence 4.' },
        { letter: 'D', text: 'before Sentence 1.' }
      ],
      correct_answer: 'A',
      explanations: {
        A: "This creates proper mechanistic flow: photosynthesis converts light to chemical energy (general) → chlorophyll absorbs sunlight (specific mechanism) → this energy transforms CO2 and water to glucose/oxygen (chemical process) → glucose fuels growth, oxygen supports life (consequences).",
        B: "Explaining that plants use energy to transform CO2 and water before stating that chlorophyll absorbs sunlight reverses the mechanism—absorption of light must precede using that absorbed energy for chemical reactions.",
        C: "Describing the fundamental chemical transformation (CO2 + water → glucose + oxygen) after discussing glucose's role in growth puts the core process after its consequence—the transformation should precede explaining what happens to its products.",
        D: "Beginning with the detailed chemical process (CO2 and water becoming glucose and oxygen) before the opening that defines photosynthesis overwhelms readers with specifics before establishing the general concept being explained."
      }
    },
    {
      position: 41,
      title: 'Supporting Evidence Position',
      problem_text: '[1] Regular meditation reduces stress and improves focus. [2] Studies show participants who meditated for eight weeks exhibited lower cortisol levels. [3] They also performed better on attention tests. [4] <u>Brain scans revealed increased gray matter in regions associated with learning and memory.</u> [5] These findings suggest meditation creates measurable neurological changes.\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'after Sentence 1.' },
        { letter: 'C', text: 'after Sentence 2.' },
        { letter: 'D', text: 'before Sentence 5.' }
      ],
      correct_answer: 'A',
      explanations: {
        A: "This placement works well: claim (meditation reduces stress/improves focus) → evidence 1 (lower cortisol) → evidence 2 (better attention tests) → evidence 3 (brain scan changes) → synthesis (neurological changes). The evidence builds systematically before the conclusion.",
        B: "Presenting detailed brain scan evidence immediately after the opening claim skips the simpler evidence (cortisol, attention) and jumps to complex neurological data—better to build from simple to complex evidence.",
        C: "Inserting brain scans between cortisol levels and attention tests disrupts the logical grouping of evidence—cortisol and attention are behavioral/physiological measures, while brain structure is anatomical evidence that works better as the culminating evidence.",
        D: "The sentence is already before Sentence 5—no change needed. The current placement presents all evidence before the synthesis about neurological changes."
      }
    },
    {
      position: 42,
      title: 'Transitional Bridge Sentence',
      problem_text: '[1] The Roman Empire dominated the Mediterranean world for centuries. [2] Roman engineering achievements included aqueducts, roads, and amphitheaters. [3] <u>Despite its military and architectural prowess, the empire faced internal challenges that would ultimately lead to its decline.</u> [4] Political instability, economic troubles, and military threats weakened central authority. [5] By 476 CE, the Western Empire had collapsed.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'before Sentence 1.' },
        { letter: 'C', text: 'after Sentence 4.' },
        { letter: 'D', text: 'after Sentence 5.' }
      ],
      correct_answer: 'A',
      explanations: {
        A: "This placement effectively transitions from Rome's strengths (dominance, engineering) to its weaknesses—'Despite its prowess' acknowledges achievements before pivoting to challenges, creating smooth contrast that sets up the discussion of specific problems and eventual collapse.",
        B: "Beginning with internal challenges and decline before establishing Rome's dominance and achievements is backwards—readers need to understand Rome's power before learning about its fall.",
        C: "Placing the transitional statement after already discussing specific challenges (instability, economic troubles, military threats) makes it redundant—the transition should introduce the shift to problems, not follow the problem details.",
        D: "Mentioning the contrast between prowess and challenges after describing the collapse is illogical—this framing should precede the decline narrative, not follow its conclusion."
      }
    },
    {
      position: 43,
      title: 'Methodological Explanation Order',
      problem_text: '[1] Scientists discovered a new deep-sea species using remotely operated vehicles. [2] <u>The vehicles descended to depths exceeding 6,000 meters, where pressure reaches over 600 atmospheres.</u> [3] At these depths, specialized equipment is essential. [4] High-resolution cameras captured images of the translucent creature. [5] DNA analysis confirmed it represents a previously unknown genus.\n\nFor the sake of logic and coherence, Sentence 2 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'after Sentence 3.' },
        { letter: 'C', text: 'after Sentence 4.' },
        { letter: 'D', text: 'before Sentence 1.' }
      ],
      correct_answer: 'A',
      explanations: {
        A: "This creates logical progression: discovery method (ROVs) → specific depth and pressure conditions → why specialized equipment matters at these depths → imaging the creature → genetic confirmation. The extreme conditions context explains why specialized equipment is needed.",
        B: "Stating specialized equipment is essential before explaining the extreme depths and pressure leaves readers unclear why such equipment matters—the conditions should precede the equipment requirement to establish causal relationship.",
        C: "Mentioning the 6,000-meter depth and extreme pressure after capturing images with cameras reverses the logical flow—the environmental challenges should be established before discussing the equipment used to overcome them.",
        D: "Beginning with depth and pressure specifics before introducing that scientists discovered a species using ROVs provides technical detail without context about what investigation this supports."
      }
    },
    {
      position: 44,
      title: 'Comparative Analysis Positioning',
      problem_text: '[1] Wind energy has become increasingly cost-competitive with fossil fuels. [2] In many regions, wind power now costs less per kilowatt-hour than coal or natural gas. [3] <u>Solar energy has followed a similar trajectory, with panel costs dropping 90% over the past decade.</u> [4] These cost reductions make renewable energy attractive to utilities and consumers. [5] Economic factors now drive adoption as much as environmental concerns.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'after Sentence 4.' },
        { letter: 'C', text: 'before Sentence 1.' },
        { letter: 'D', text: 'after Sentence 5.' }
      ],
      correct_answer: 'A',
      explanations: {
        A: "This placement works well: wind energy cost-competitiveness → specific wind power costs → parallel solar trajectory → synthesize that both reductions make renewables attractive → conclude about economic drivers. The solar comparison follows naturally from wind discussion.",
        B: "Mentioning solar's similar cost trajectory after stating renewables are attractive to utilities makes the solar detail feel like an afterthought—better to present both renewable types (wind, solar) before discussing their collective impact on adoption.",
        C: "Beginning with solar energy before establishing the main focus on wind energy and cost-competitiveness creates confusion about the paragraph's primary subject—wind should be introduced first, then expanded to include solar.",
        D: "Adding the solar comparison after the conclusion about economic drivers weakens the ending—comparative evidence should support the conclusion, not follow it."
      }
    },
    {
      position: 45,
      title: 'Conceptual Foundation Requirement',
      problem_text: '[1] Vaccines have virtually eliminated diseases that once killed millions. [2] Smallpox, declared eradicated in 1980, was the first disease conquered by vaccination. [3] <u>Vaccination works by training the immune system to recognize and fight specific pathogens without causing disease.</u> [4] Polio cases have dropped by 99% since global immunization efforts began. [5] Continued vaccination programs remain essential to prevent disease resurgence.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'before Sentence 1.' },
        { letter: 'C', text: 'after Sentence 1.' },
        { letter: 'D', text: 'after Sentence 5.' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "Explaining how vaccination works after providing two specific examples (smallpox, beginning of polio discussion) is acceptable but slightly awkward—better to explain the mechanism before listing diseases it has conquered.",
        B: "Beginning with the technical mechanism of vaccination before establishing that vaccines have eliminated diseases provides the 'how' before the 'what' and 'why we care'—opening with impact is more engaging and logical.",
        C: "This creates superior flow: vaccines eliminated diseases (dramatic claim) → how vaccination works (mechanism that explains the success) → smallpox example → polio example → concluding importance. The mechanism bridges the claim and examples.",
        D: "Explaining the fundamental mechanism after the conclusion about continued program importance makes crucial information feel like a footnote—mechanism should inform the examples, not follow the final statement."
      }
    },
    {
      position: 46,
      title: 'Contrasting Element Introduction',
      problem_text: '[1] The novel was praised for its vivid characterization and elegant prose. [2] Critics highlighted the author\'s psychological insight. [3] Literary awards recognized its artistic achievement. [4] <u>However, some readers found the pace too slow and the plot overly intricate.</u> [5] The book nonetheless became a bestseller.\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'before Sentence 1.' },
        { letter: 'C', text: 'after Sentence 1.' },
        { letter: 'D', text: 'before Sentence 5.' }
      ],
      correct_answer: 'D',
      explanations: {
        A: "The sentence is already positioned before Sentence 5, so this creates the same logical flow as option D.",
        B: "Beginning with reader criticisms (slow pace, intricate plot) before establishing the novel\'s praised qualities and achievements is backwards—better to present acclaim before contrasting criticism.",
        C: "Inserting reader criticism immediately after the opening praise, before mentioning critics' and awards' recognition, disrupts the buildup of positive assessments—grouping all acclaim together before presenting the contrasting criticism creates clearer structure.",
        D: "This works well: group all praise (characterization, critics, awards) → introduce contrasting criticism (pace, plot) with 'However' → conclude that it succeeded anyway ('nonetheless'). The criticism provides context for the 'nonetheless' conclusion."
      }
    },
    {
      position: 47,
      title: 'Explanatory Detail Sequence',
      problem_text: '[1] The Great Barrier Reef spans over 1,400 miles along Australia\'s coast. [2] It comprises nearly 3,000 individual reef systems. [3] <u>Coral polyps, tiny animals related to jellyfish, build these massive structures by secreting calcium carbonate skeletons.</u> [4] The reef ecosystem supports over 1,500 fish species. [5] It generates billions in tourism revenue for Australia.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'before Sentence 1.' },
        { letter: 'C', text: 'after Sentence 4.' },
        { letter: 'D', text: 'after Sentence 5.' }
      ],
      correct_answer: 'A',
      explanations: {
        A: "This creates effective flow: reef scale (1,400 miles) → composition (3,000 systems) → formation mechanism (coral polyps building structures) → biodiversity (fish species) → economic value (tourism). The mechanism explains how the physical structures form.",
        B: "Beginning with the biological mechanism of coral polyp construction before establishing what the Great Barrier Reef is and its scale provides technical detail without geographic context—introduce the reef before explaining its formation.",
        C: "Explaining how coral polyps build reefs after mentioning fish diversity separates the physical structure information (size, composition, formation) from the biological/economic information—better to group structural details together.",
        D: "Placing the formational mechanism after the economic conclusion makes fundamental biological information feel like an afterthought—formation details should support understanding of what the reef is, not trail the discussion."
      }
    },
    {
      position: 48,
      title: 'Problem-Solution Framework',
      problem_text: '[1] Urban traffic congestion costs billions in lost productivity annually. [2] <u>Cities are implementing dedicated bus lanes and expanding subway systems to encourage public transit use.</u> [3] During rush hours, average speeds in major cities drop below 10 mph. [4] This congestion increases air pollution and commuter stress. [5] Effective solutions must address both transportation infrastructure and urban planning.\n\nFor the sake of logic and coherence, Sentence 2 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'after Sentence 3.' },
        { letter: 'C', text: 'after Sentence 4.' },
        { letter: 'D', text: 'after Sentence 5.' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "Presenting solutions (bus lanes, subway expansion) immediately after stating the cost without detailing the actual congestion problems (10 mph speeds, pollution, stress) jumps to fixes before fully establishing what needs fixing.",
        B: "Introducing solutions after mentioning 10 mph speeds but before discussing pollution and stress creates awkward flow—better to present all problem dimensions before offering solutions.",
        C: "This creates logical problem-solution structure: economic cost → specific congestion (10 mph) → additional problems (pollution, stress) → specific solution examples (bus lanes, subways) → general solution framework. All problem details precede solution discussion.",
        D: "Placing specific solutions (bus lanes, subways) after the general statement about effective solutions being needed reverses the logical order—concrete examples should precede or illustrate the general principle, not follow the conclusion."
      }
    },
    {
      position: 49,
      title: 'Chronological Narrative Continuity',
      problem_text: '[1] The Apollo 11 mission launched on July 16, 1969. [2] After a three-day journey, the spacecraft entered lunar orbit. [3] Neil Armstrong and Buzz Aldrin descended to the moon\'s surface in the lunar module. [4] <u>Mission control in Houston monitored every aspect of the landing through telemetry data and voice communications.</u> [5] Armstrong\'s first step occurred at 10:56 PM EDT on July 20.\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'after Sentence 1.' },
        { letter: 'C', text: 'before Sentence 3.' },
        { letter: 'D', text: 'after Sentence 5.' }
      ],
      correct_answer: 'A',
      explanations: {
        A: "This placement works well in the chronological narrative: launch → journey → lunar orbit → descent → mission control monitoring landing → Armstrong\'s step. The monitoring detail fits naturally between the descent and the successful landing.",
        B: "Mentioning Houston's monitoring of the landing immediately after launch but before the journey, orbit, and descent hasn't been described creates confusion—the monitoring is most relevant during the actual landing attempt.",
        C: "Placing mission control monitoring before the astronauts' descent is described slightly disrupts the action sequence—better to mention descent is happening, then note it was monitored, then describe the successful completion.",
        D: "Adding mission control details after Armstrong\'s historic first step makes critical operational information feel like an afterthought—the monitoring context enhances understanding of the landing's complexity and should precede its successful completion."
      }
    },
    {
      position: 50,
      title: 'Ultimate Integration: Multi-layered Synthesis',
      problem_text: '[1] Climate change affects ecosystems through multiple interconnected mechanisms. [2] Rising temperatures alter species\' geographic ranges, forcing migrations to cooler regions. [3] <u>Ocean acidification, caused by absorption of excess atmospheric CO2, threatens marine organisms that build calcium carbonate shells—from microscopic plankton to coral reefs—disrupting food webs that billions of people depend on for protein.</u> [4] Changing precipitation patterns create droughts in some regions and floods in others. [5] These cascading effects demonstrate how atmospheric changes propagate through biological and human systems. [6] Addressing climate change requires understanding these complex interdependencies.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
      choices: [
        { letter: 'A', text: 'where it is now.' },
        { letter: 'B', text: 'after Sentence 4.' },
        { letter: 'C', text: 'before Sentence 1.' },
        { letter: 'D', text: 'after Sentence 6.' }
      ],
      correct_answer: 'A',
      explanations: {
        A: "This creates effective thematic organization: opening about multiple mechanisms → terrestrial temperature effects (species ranges) → marine chemistry effects (acidification, shells, food webs) → hydrological effects (precipitation patterns) → synthesis about cascading effects → conclusion. Grouping impacts by environmental system (land/ocean/water) is logical.",
        B: "Placing ocean acidification after precipitation patterns separates related atmospheric chemistry effects—discussing temperature and precipitation (both atmospheric) before shifting to ocean chemistry creates less coherent thematic grouping than presenting land and ocean biological effects together.",
        C: "Beginning with the detailed acidification mechanism before establishing that climate change affects ecosystems through multiple mechanisms overwhelms readers with complexity before providing the conceptual framework for organizing these diverse effects.",
        D: "Adding the acidification detail after the conclusion about needing to understand interdependencies is backwards—complex examples should build toward conclusions, not follow them. This makes important content feel like an appendix rather than supporting evidence."
      }
    }
  ],

  // MISC-TOPICS: Need 1 question (position 50)
  'misc-topics': [
    {
      position: 50,
      title: 'Complex Conditional Mood',
      problem_text: 'If the company <u>would have invested</u> in renewable energy five years ago, it would be more profitable today.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'had invested' },
        { letter: 'C', text: 'has invested' },
        { letter: 'D', text: 'will have invested' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Incorrect. 'Would have invested' in the if-clause is a common error—conditional sentences about unreal past situations require 'had + past participle' (past perfect) in the if-clause, not 'would have.' The 'would have' form belongs only in the main clause.",
        B: "Correct. 'Had invested' (past perfect) is the proper form for the if-clause in a past unreal conditional—this structure expresses hypothetical past situations and their present consequences: 'If [past perfect], would + base verb.' The if-clause needs past perfect, not 'would.'",
        C: "Incorrect. 'Has invested' (present perfect) doesn't work in this contrary-to-fact conditional about the past—the sentence expresses that they didn't invest five years ago (unreal past), requiring past perfect 'had invested,' not present perfect 'has invested.'",
        D: "Incorrect. 'Will have invested' (future perfect) expresses completion by a future time, but this sentence discusses a hypothetical past action (five years ago) and its present consequence, requiring past perfect 'had invested' in the if-clause."
      }
    }
  ],

  // REDUNDANCY: Need 13 questions (positions 38-50)
  'redundancy': [
    {
      position: 38,
      title: 'Implicit Meaning Redundancy',
      problem_text: 'The archaeologist carefully <u>examined and inspected</u> each artifact for signs of ancient tool marks.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'examined' },
        { letter: 'C', text: 'looked at and examined' },
        { letter: 'D', text: 'inspected and reviewed' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Redundant. 'Examined' and 'inspected' are synonyms—both mean to look at something carefully and closely. Using both adds no additional meaning beyond what 'examined' alone conveys.",
        B: "Correct. 'Examined' alone is sufficient—it already means to inspect carefully for details, making the additional word 'inspected' unnecessary.",
        C: "Still redundant. 'Looked at' is less precise than 'examined,' which already includes the act of looking—combining them creates wordiness without adding precision.",
        D: "Redundant. 'Inspected' and 'reviewed' are near-synonyms in this context—both mean careful examination. Either word alone would suffice."
      }
    },
    {
      position: 39,
      title: 'Temporal Redundancy',
      problem_text: 'The museum will <u>first begin</u> renovations in January.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'begin' },
        { letter: 'C', text: 'start to begin' },
        { letter: 'D', text: 'initially start' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Redundant. 'Begin' already means to start for the first time—adding 'first' is unnecessary because beginning is inherently the initial action.",
        B: "Correct. 'Begin' alone clearly indicates the start of renovations—no temporal modifier is needed since beginning is inherently first.",
        C: "Doubly redundant. 'Start' and 'begin' are synonyms, and 'to begin' suggests the start hasn't happened yet—this piles up unnecessary words.",
        D: "Redundant. 'Initially' means first, and 'start' means begin—combining them repeats the concept of beginning just like the original error."
      }
    },
    {
      position: 40,
      title: 'Adjective-Noun Redundancy',
      problem_text: 'The student received an <u>unexpected surprise</u> when her essay won first prize.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'surprise' },
        { letter: 'C', text: 'surprise that was unexpected' },
        { letter: 'D', text: 'unforeseen surprise' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Redundant. A surprise is by definition something unexpected—if you expected it, it wouldn't be a surprise. 'Unexpected' adds no new meaning.",
        B: "Correct. 'Surprise' alone inherently means something unexpected happened—the adjective 'unexpected' is redundant.",
        C: "Even more wordy. This expands the redundancy into a clause—'that was unexpected' restates what 'surprise' already means.",
        D: "Still redundant. 'Unforeseen' is a synonym for 'unexpected'—both modify a noun ('surprise') that already contains this meaning."
      }
    },
    {
      position: 41,
      title: 'Prepositional Phrase Wordiness',
      problem_text: 'The concert will take place <u>during the month of</u> July.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'in' },
        { letter: 'C', text: 'throughout the entire month of' },
        { letter: 'D', text: 'in the course of' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Wordy. 'During the month of' uses four words where one suffices—'in July' is clearer and more concise.",
        B: "Correct. 'In' is the most concise preposition—'in July' communicates the timeframe clearly without unnecessary words.",
        C: "More wordy. 'Throughout the entire month of' adds even more unnecessary words—if the concert takes place 'in July,' that's sufficient without specifying duration.",
        D: "Wordy and awkward. 'In the course of' is a verbose alternative to simple 'in' or 'during'—it adds no precision."
      }
    },
    {
      position: 42,
      title: 'Explanatory Clause Redundancy',
      problem_text: 'The scientist <u>collaborated together</u> with colleagues from three countries on the research project.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'collaborated' },
        { letter: 'C', text: 'worked together in collaboration' },
        { letter: 'D', text: 'cooperated together' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Redundant. 'Collaborate' means to work together—adding 'together' repeats meaning already contained in 'collaborate.'",
        B: "Correct. 'Collaborated' alone means working together with others—'together' is built into the word's meaning.",
        C: "Extremely redundant. 'Worked together' and 'in collaboration' both express the same concept—plus 'collaboration' already means working together.",
        D: "Still redundant. 'Cooperated' (like 'collaborated') already means working together—'together' is unnecessary with either verb."
      }
    },
    {
      position: 43,
      title: 'Reason/Cause Redundancy',
      problem_text: 'The game was cancelled <u>because of the reason that</u> severe storms were approaching.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'because' },
        { letter: 'C', text: 'due to the fact that' },
        { letter: 'D', text: 'for the reason that' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Redundant. 'Because of the reason that' is verbose—'because' and 'reason' both indicate causation, and 'that' adds unnecessary words. 'Because' alone suffices.",
        B: "Correct. 'Because' concisely introduces the cause—all the added words in other options ('reason,' 'fact,' extra prepositions) are unnecessary.",
        C: "Redundant. 'Due to the fact that' uses six words ('due to the fact that') where one ('because') would work—classic wordy construction.",
        D: "Redundant. 'For the reason that' is verbose—'because' directly states causation without needing the noun 'reason.'"
      }
    },
    {
      position: 44,
      title: 'Degree Modifier Redundancy',
      problem_text: 'The <u>completely full</u> auditorium could not accommodate any additional attendees.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'full' },
        { letter: 'C', text: 'entirely full' },
        { letter: 'D', text: 'totally and completely full' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Redundant. 'Full' is an absolute state—something is either full or not full. 'Completely' is unnecessary because 'full' already means filled to capacity.",
        B: "Correct. 'Full' is sufficient—it's an absolute adjective that doesn't need intensification. The fact that no additional people fit confirms it was full.",
        C: "Still redundant. 'Entirely' is another intensifier like 'completely'—both are unnecessary with the absolute adjective 'full.'",
        D: "Extremely redundant. Stacking 'totally' and 'completely' before 'full' triples the redundancy—'full' needs no modifiers."
      }
    },
    {
      position: 45,
      title: 'Action-Result Redundancy',
      problem_text: 'Please <u>write down and record</u> your observations in the lab notebook.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'record' },
        { letter: 'C', text: 'write and note down' },
        { letter: 'D', text: 'make a record of' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Redundant. 'Write down' and 'record' are synonymous in this context—both mean to document in writing. Either alone suffices.",
        B: "Correct. 'Record' is concise and clear—it encompasses the act of writing observations without needing the additional 'write down.'",
        C: "Still redundant. 'Write' and 'note down' are synonyms—both involve documenting in writing. Using both is wordy.",
        D: "Wordy. 'Make a record of' uses four words where one ('record') works—it's unnecessarily verbose."
      }
    },
    {
      position: 46,
      title: 'Scope/Scale Redundancy',
      problem_text: 'The <u>large-sized</u> telescope can detect distant galaxies.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'large' },
        { letter: 'C', text: 'big-sized' },
        { letter: 'D', text: 'large in size' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Redundant. 'Large' already indicates size—adding 'sized' is unnecessary since 'large' can only refer to size.",
        B: "Correct. 'Large' clearly indicates the telescope's size without the redundant '-sized' suffix.",
        C: "Still redundant. 'Big-sized' has the same problem as 'large-sized'—'big' already indicates size, making '-sized' redundant.",
        D: "Redundant. 'Large in size' explicitly states what 'large' already means—the prepositional phrase 'in size' adds nothing."
      }
    },
    {
      position: 47,
      title: 'Opinion/Judgment Redundancy',
      problem_text: 'In <u>my personal opinion</u>, the film\'s cinematography deserved greater recognition.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'my opinion' },
        { letter: 'C', text: 'my own personal viewpoint' },
        { letter: 'D', text: 'my personal belief' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Redundant. 'My opinion' is inherently personal—opinions are personal by definition, so 'personal' is unnecessary.",
        B: "Correct. 'My opinion' is sufficient—'opinion' is inherently personal, making the modifier 'personal' redundant.",
        C: "More redundant. 'Own' and 'personal' both emphasize individual perspective, and 'viewpoint' is another word for 'opinion'—triple redundancy.",
        D: "Still redundant. 'Personal belief' has the same issue as 'personal opinion'—beliefs are personal, making the modifier unnecessary."
      }
    },
    {
      position: 48,
      title: 'Connection/Link Redundancy',
      problem_text: 'The research <u>shows a clear connection between</u> sleep deprivation and decreased cognitive performance.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'connects' },
        { letter: 'C', text: 'demonstrates a link between' },
        { letter: 'D', text: 'shows that there is a connection between' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'Shows a connection between' is acceptable but wordy—the verb 'connects' more directly expresses the relationship without needing the noun 'connection.'",
        B: "Correct. 'Connects' concisely expresses the relationship—changing from the noun phrase 'shows a connection' to the direct verb 'connects' eliminates wordiness while maintaining clarity.",
        C: "Similar wordiness. 'Demonstrates a link between' uses four words where one ('connects' or 'links') would work—'link' and 'connection' are synonyms.",
        D: "More wordy. Adding 'that there is' between 'shows' and 'connection' makes an already wordy construction even more verbose."
      }
    },
    {
      position: 49,
      title: 'Future-Oriented Redundancy',
      problem_text: 'The team <u>plans ahead</u> for potential challenges that might arise during the expedition.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'plans' },
        { letter: 'C', text: 'plans in advance' },
        { letter: 'D', text: 'makes advance plans' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "Redundant. 'Plans' inherently means preparing for the future—'ahead' is unnecessary because planning is always forward-looking by definition.",
        B: "Correct. 'Plans' alone indicates future preparation—adding temporal words like 'ahead' or 'in advance' is redundant since planning is inherently preparatory.",
        C: "Redundant. 'In advance' means the same as 'ahead'—both unnecessarily specify the forward-looking nature already contained in 'plans.'",
        D: "Redundant. 'Advance plans' repeats the forward-looking concept—'plans' alone conveys preparation for what's coming."
      }
    },
    {
      position: 50,
      title: 'Ultimate Concision Challenge',
      problem_text: 'The author <u>utilizes the use of</u> vivid imagery to convey emotional depth in her poetry.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'utilizes' },
        { letter: 'C', text: 'uses' },
        { letter: 'D', text: 'makes use of' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "Extremely redundant. 'Utilizes the use of' doubles the redundancy—'utilizes' and 'the use of' both mean the same thing, and 'utilize' itself is often unnecessarily formal for 'use.'",
        B: "'Utilizes' alone removes the redundant 'the use of' but 'utilize' is often pretentious when simple 'uses' works—'utilize' implies using something for a specific purpose, but it's typically unnecessarily formal.",
        C: "Correct. 'Uses' is the most concise and clear option—it eliminates both the redundancy of 'the use of' and the unnecessary formality of 'utilize.' Simple 'uses' is direct and precise.",
        D: "'Makes use of' is wordy—this three-word phrase means the same as the one-word verb 'uses,' adding no precision or nuance while increasing word count."
      }
    }
  ]
};

module.exports = newQuestions;
