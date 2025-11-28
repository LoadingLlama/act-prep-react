/**
 * Complete which-choice lesson with 30 questions
 * Positions: 5-7, 9-10, 13-16, 19-21, 23-24, 29, 33-36, 38-41, 43-44, 46-50
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '29b59c9d-ef2e-4f7f-aae2-464222884d3a'; // which-choice

async function addQuestion(question) {
  const { error } = await supabase.from('lesson_examples').insert({
    lesson_id: LESSON_ID,
    position: question.position,
    title: question.title,
    problem_text: question.problem_text,
    choices: question.choices,
    correct_answer: question.correct_answer,
    solution_steps: [],
    answer_explanation: question.answer_explanation,
    is_worked_example: false
  });

  if (error) {
    console.error(`  ✗ Error at position ${question.position}:`, error.message);
    return false;
  }
  return true;
}

const questions = [
  // EASY: 5-7, 9-10 (5 questions)
  {
    position: 5,
    title: 'Basic Emphasis: Highlighting Key Details',
    problem_text: 'The city park includes walking trails, picnic areas, and playgrounds. <u>It also has tennis courts.</u>\n\nWhich choice most effectively emphasizes the variety of recreational facilities available?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'Simply adding one more facility as a separate sentence doesn\'t emphasize the overall variety—it treats the tennis courts as an afterthought rather than part of a comprehensive list.'
      },
      {
        letter: 'B',
        text: 'In addition, tennis courts are available for visitors.',
        explanation: 'While "in addition" acknowledges there\'s more, this phrasing still separates tennis courts from the other facilities rather than presenting them as part of a unified variety.'
      },
      {
        letter: 'C',
        text: ', and even tennis courts for sports enthusiasts.',
        explanation: 'Incorporating tennis courts into the same sentence with "and even" effectively emphasizes the range by presenting all facilities as part of one comprehensive list, with "even" suggesting the variety extends beyond basics.'
      },
      {
        letter: 'D',
        text: 'Tennis courts can also be found there.',
        explanation: 'This passive construction ("can be found") weakens the emphasis on variety and treats tennis courts as an incidental detail rather than an integral part of the park\'s diverse offerings.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C best emphasizes variety by integrating tennis courts into a single comprehensive list and using "even" to highlight the breadth of facilities.'
  },
  {
    position: 6,
    title: 'Simple Detail Support: Reinforcing Main Idea',
    problem_text: 'Maria began painting as a hobby in high school. <u>She practiced every weekend.</u> Today, she displays her artwork in galleries across the country.\n\nWhich choice provides the most relevant detail supporting the progression from hobbyist to professional artist?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Practiced every weekend" shows dedication but doesn\'t indicate progression beyond basic hobby-level commitment—it doesn\'t bridge the gap to professional recognition mentioned in the next sentence.'
      },
      {
        letter: 'B',
        text: 'She enjoyed working with watercolors.',
        explanation: 'Mentioning a medium preference provides no information about skill development or the journey from hobbyist to professional—it\'s a static detail that doesn\'t show progression.'
      },
      {
        letter: 'C',
        text: 'Within three years, she had won several regional art competitions.',
        explanation: 'Winning competitions demonstrates a clear progression from beginner to recognized artist, providing the specific milestone that bridges "high school hobby" to "galleries across the country."'
      },
      {
        letter: 'D',
        text: 'Painting helped her relax after school.',
        explanation: 'This focuses on painting\'s therapeutic benefit rather than skill development, providing no evidence of the professional trajectory described in the paragraph.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C provides specific evidence of progression (competitions) that logically connects hobby-level painting to professional gallery displays.'
  },
  {
    position: 7,
    title: 'Basic Specificity: Adding Concrete Details',
    problem_text: 'The museum\'s new exhibit features ancient artifacts. <u>Visitors can see interesting objects from the past.</u>\n\nWhich choice provides the most specific information about what visitors will encounter?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Interesting objects from the past" is entirely redundant with "ancient artifacts" already stated, and both phrases are equally vague—neither specifies what visitors will actually see.'
      },
      {
        letter: 'B',
        text: 'The exhibit includes pottery, jewelry, and tools from Egyptian dynasties.',
        explanation: 'This provides concrete specificity: it names exact artifact types (pottery, jewelry, tools) and identifies the precise civilization (Egyptian dynasties), giving readers clear expectations about the exhibit\'s content.'
      },
      {
        letter: 'C',
        text: 'Many items are on display for people to observe.',
        explanation: 'This merely restates that things are viewable without adding any specific information about what those things are—it\'s generic filler that applies to any museum exhibit.'
      },
      {
        letter: 'D',
        text: 'The collection contains valuable historical pieces.',
        explanation: '"Valuable historical pieces" is as vague as the original "ancient artifacts"—it doesn\'t specify types of objects, time period, or cultural origin.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B replaces vague description with concrete specifics about artifact types and cultural origin, giving readers clear information about the exhibit.'
  },
  {
    position: 9,
    title: 'Supporting Main Focus: Staying On Topic',
    problem_text: 'The documentary explores how coral reefs support marine biodiversity. <u>Coral reefs are found in tropical waters around the world.</u> Scientists estimate that reefs provide habitat for over 25% of all ocean species.\n\nWhich choice best supports the paragraph\'s focus on biodiversity rather than geography?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'Geographic distribution (where reefs are located) shifts focus away from the biodiversity topic. This information about tropical locations doesn\'t support the main idea about how many species reefs sustain.'
      },
      {
        letter: 'B',
        text: 'The Great Barrier Reef is the world\'s largest coral reef system.',
        explanation: 'Introducing a specific reef system by size is a geographic/physical detail that distracts from biodiversity—it doesn\'t explain how reefs support diverse marine life.'
      },
      {
        letter: 'C',
        text: 'Coral reefs create complex three-dimensional structures that offer countless niches for different organisms.',
        explanation: 'This directly supports the biodiversity focus by explaining the mechanism: complex structures create varied habitats (niches) that enable different species to coexist, which explains the 25% statistic that follows.'
      },
      {
        letter: 'D',
        text: 'Tourists visit coral reefs to observe colorful fish.',
        explanation: 'Tourism is irrelevant to the scientific focus on biodiversity—it shifts to human recreation rather than explaining the ecological role of reefs in supporting species.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C maintains focus on biodiversity by explaining how reef structure enables species diversity, directly supporting the paragraph\'s central topic.'
  },
  {
    position: 10,
    title: 'Basic Tone Match: Maintaining Consistency',
    problem_text: 'The research paper analyzes economic trends in global markets. <u>The data shows some pretty wild fluctuations in stock prices.</u>\n\nWhich choice best matches the formal, academic tone established in the opening sentence?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Pretty wild" is casual, conversational language inappropriate for an academic research paper—it undermines the formal tone established by "analyzes economic trends."'
      },
      {
        letter: 'B',
        text: 'The data reveals significant volatility in equity valuations.',
        explanation: 'This uses formal academic language: "reveals" (not "shows"), "significant volatility" (not "wild fluctuations"), and "equity valuations" (not "stock prices")—all matching the scholarly tone.'
      },
      {
        letter: 'C',
        text: 'Stock prices went up and down a lot.',
        explanation: 'This oversimplified phrasing ("went up and down a lot") sounds elementary and clashes with the sophisticated vocabulary of "analyzes economic trends in global markets."'
      },
      {
        letter: 'D',
        text: 'You can see crazy changes in the market.',
        explanation: 'Both "You can see" (second person) and "crazy" (slang) are informal and conversational, completely inconsistent with academic research paper style.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B uses formal academic vocabulary and technical terminology that matches the scholarly tone of the research paper context.'
  },

  // MEDIUM: 13-16, 19-21, 23-24, 29 (10 questions)
  {
    position: 13,
    title: 'Establishing Context: Setting Up Following Information',
    problem_text: '<u>Urban gardens have become increasingly popular.</u> These spaces allow city residents to grow fresh vegetables, reducing their reliance on grocery stores while building community connections. The gardens also improve air quality and provide habitats for pollinators.\n\nWhich choice most effectively introduces the paragraph\'s focus on multiple benefits of urban gardens?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'While accurate, "increasingly popular" focuses on a trend rather than introducing the specific benefits (food production, community, environment, pollinators) that the paragraph will detail.'
      },
      {
        letter: 'B',
        text: 'Many cities have started urban garden programs.',
        explanation: 'This introduces the idea that cities sponsor programs but doesn\'t preview the diverse benefits (food, community, environment) that follow—it focuses on who creates gardens, not what gardens accomplish.'
      },
      {
        letter: 'C',
        text: 'Urban gardens offer environmental, social, and nutritional benefits to city communities.',
        explanation: 'This directly previews the three categories of benefits detailed in the paragraph: environmental (air quality, pollinators), social (community connections), and nutritional (fresh vegetables), effectively setting up what follows.'
      },
      {
        letter: 'D',
        text: 'Growing vegetables in cities is a practical solution.',
        explanation: 'This only introduces the food production aspect, failing to preview the community-building and environmental benefits that constitute half of the paragraph\'s content.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C effectively introduces the paragraph by previewing all three benefit categories (environmental, social, nutritional) that will be explained.'
  },
  {
    position: 14,
    title: 'Emphasizing Cause-Effect: Highlighting Relationships',
    problem_text: 'The invention of the printing press in the 15th century transformed European society. <u>Books became more available to common people.</u> Literacy rates increased dramatically, and new ideas spread rapidly across the continent.\n\nWhich choice most effectively emphasizes the cause-and-effect relationship between the printing press and social change?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Became more available" is passive and doesn\'t explicitly connect the printing press (cause) to book availability (effect)—it states a change without attributing causation.'
      },
      {
        letter: 'B',
        text: 'People enjoyed reading books more than before.',
        explanation: 'This shifts to personal preference (enjoyment) rather than the causal mechanism—it doesn\'t explain how the printing press created the social transformation mentioned in the topic sentence.'
      },
      {
        letter: 'C',
        text: 'By making books affordable and abundant, the press democratized knowledge that had been restricted to the wealthy elite.',
        explanation: 'This explicitly shows cause (press made books affordable/abundant) leading to effect (knowledge democratization), using strong causal language and directly linking the technology to social transformation.'
      },
      {
        letter: 'D',
        text: 'The printing press was an important technological achievement.',
        explanation: 'This evaluates the invention\'s importance but doesn\'t explain the cause-effect mechanism of how it transformed society—it\'s a judgment rather than an explanation of impact.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C uses explicit causal language ("By making...the press democratized") to show how the printing press mechanism produced social transformation.'
  },
  {
    position: 15,
    title: 'Precise Word Choice in Context: Selecting Best Fit',
    problem_text: 'The architect\'s design <u>shows</u> the principles of sustainable building, incorporating solar panels, rainwater collection, and natural ventilation systems.\n\nWhich choice most precisely conveys that the design actively demonstrates these principles in action?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Shows" is generic and could mean the design merely displays or mentions the principles—it doesn\'t convey that these principles are actively integrated into the building\'s function.'
      },
      {
        letter: 'B',
        text: 'exemplifies',
        explanation: '"Exemplifies" means to serve as a perfect example of something in practice—it conveys that the design doesn\'t just show but actively embodies sustainable principles through its working features (solar panels, water collection).'
      },
      {
        letter: 'C',
        text: 'indicates',
        explanation: '"Indicates" suggests the design points to or suggests these principles without necessarily implementing them—it\'s weaker than needed for a design that actually incorporates these functional systems.'
      },
      {
        letter: 'D',
        text: 'mentions',
        explanation: '"Mentions" implies the principles are merely referenced rather than implemented—completely inconsistent with a design that incorporates actual solar panels and water collection systems.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B ("exemplifies") precisely conveys that the design serves as a working model of sustainable principles, not just a reference to them.'
  },
  {
    position: 16,
    title: 'Supporting with Evidence: Choosing Relevant Details',
    problem_text: 'The community center\'s after-school program has proven highly successful at engaging local youth. <u>The center is located on Maple Street near the library.</u> Attendance has tripled since the program began, and participants report improved academic performance.\n\nWhich choice provides the most relevant evidence supporting the program\'s success?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'The physical location (Maple Street, near library) provides no evidence about program success—it\'s geographic information unrelated to engagement or outcomes.'
      },
      {
        letter: 'B',
        text: 'The program offers activities from 3 PM to 6 PM on weekdays.',
        explanation: 'Operating hours are logistical details that don\'t demonstrate success—knowing when it runs doesn\'t prove it\'s effective at engaging youth or improving outcomes.'
      },
      {
        letter: 'C',
        text: 'Students participate in tutoring, art classes, and mentorship programs designed to build both academic and social skills.',
        explanation: 'This explains what makes the program successful (tutoring for academics, art/mentorship for engagement, social skills development), providing concrete evidence for both the "engaging youth" and "improved academic performance" claims.'
      },
      {
        letter: 'D',
        text: 'Many parents in the neighborhood work full-time jobs.',
        explanation: 'This explains why the program might be needed (working parents) but provides no evidence that it\'s actually successful at its stated goals of engagement and academic improvement.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C provides specific program components that directly support both the engagement claim and academic improvement mentioned in the paragraph.'
  },
  {
    position: 19,
    title: 'Achieving Concision: Eliminating Wordiness',
    problem_text: 'The research team <u>conducted an investigation into the question of whether or not</u> sleep deprivation affects cognitive performance.\n\nWhich choice most concisely conveys the idea without losing essential information?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'This is wordy: "conducted an investigation into the question of whether or not" uses 10 words where 1-2 would suffice—it\'s bureaucratic padding that adds no meaning.'
      },
      {
        letter: 'B',
        text: 'investigated whether',
        explanation: '"Investigated whether" conveys the exact same meaning in 2 words instead of 10—"investigated" already means "conducted an investigation," and "whether" doesn\'t need "the question of" or "or not."'
      },
      {
        letter: 'C',
        text: 'looked into trying to find out if',
        explanation: 'This replaces one wordy phrase with another equally verbose one—"looked into trying to find out if" is casual and still unnecessarily long.'
      },
      {
        letter: 'D',
        text: 'studied the relationship between',
        explanation: 'While more concise than the original, this changes the meaning—"studied the relationship" assumes there IS a relationship, whereas "investigated whether" asks if there\'s an effect at all.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B eliminates all redundancy while preserving the exact meaning, reducing 10 words to 2 without any loss of precision.'
  },
  {
    position: 20,
    title: 'Maintaining Focus: Avoiding Tangents',
    problem_text: 'Jazz music emerged in New Orleans in the early 20th century, blending African rhythms with European harmonies. <u>Louis Armstrong was born in New Orleans in 1901 and became one of the most influential figures in jazz history.</u> The genre spread rapidly to cities like Chicago and New York, where it evolved into various distinct styles.\n\nGiven that the paragraph focuses on the geographic spread and evolution of jazz as a genre, should this sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it provides important historical context about jazz origins.',
        explanation: 'While Armstrong is historically important, this sentence focuses on one individual\'s biography rather than the genre\'s geographic spread—it interrupts the flow from New Orleans origins to geographic spread/evolution.'
      },
      {
        letter: 'B',
        text: 'Kept, because it connects New Orleans to the development of jazz.',
        explanation: 'The previous sentence already established New Orleans as jazz\'s birthplace; this sentence shifts from genre development to individual biography, which doesn\'t advance the paragraph\'s focus on geographic/stylistic evolution.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it shifts focus from the genre\'s geographic spread to an individual musician\'s biography.',
        explanation: 'The paragraph traces jazz from New Orleans → Chicago/New York with focus on geographic spread and style evolution. Introducing Armstrong\'s personal history interrupts this geographic/stylistic narrative with biographical detail.'
      },
      {
        letter: 'D',
        text: 'Deleted, because Armstrong was not actually important to jazz development.',
        explanation: 'This reasoning is factually incorrect—Armstrong was extremely important to jazz. The sentence should be deleted because of focus/organization issues, not because Armstrong was unimportant.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should be deleted because it disrupts the paragraph\'s geographic/stylistic focus with biographical information about one individual.'
  },
  {
    position: 21,
    title: 'Establishing Appropriate Tone: Formality Level',
    problem_text: 'The study examines the neural mechanisms underlying memory formation. <u>It turns out that</u> the hippocampus plays a crucial role in consolidating short-term memories into long-term storage.\n\nWhich choice establishes the most appropriate tone for an academic research discussion?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"It turns out that" is conversational and suggests surprise or casual discovery—inappropriate for academic writing presenting established research findings about neural mechanisms.'
      },
      {
        letter: 'B',
        text: 'Researchers have discovered that',
        explanation: 'This maintains academic tone by attributing findings to researchers and using formal language, appropriate for a study examining scientific processes like "neural mechanisms underlying memory formation."'
      },
      {
        letter: 'C',
        text: 'Get this:',
        explanation: '"Get this" is extremely casual, almost excited colloquial speech—completely inappropriate for academic discussion of neural mechanisms and memory consolidation processes.'
      },
      {
        letter: 'D',
        text: 'You might be surprised to learn that',
        explanation: 'Second-person address ("You") and the suggestion of surprise are both too informal for academic research writing, which maintains objective, third-person professional tone.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B uses formal, objective language appropriate for academic research, avoiding the casual conversational tone of the alternatives.'
  },
  {
    position: 23,
    title: 'Effective Opening: Engaging Reader Interest',
    problem_text: '<u>Bioluminescence is the production and emission of light by living organisms.</u> This remarkable phenomenon occurs in various marine species, from microscopic plankton to deep-sea fish, serving purposes ranging from attracting prey to confusing predators.\n\nWhich choice most effectively captures reader attention while introducing the essay\'s topic?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'This textbook definition is dry and technical—while accurate, it reads like an encyclopedia entry rather than an engaging essay opening that would draw readers into the topic.'
      },
      {
        letter: 'B',
        text: 'This essay will discuss bioluminescence in marine organisms.',
        explanation: 'This meta-commentary ("This essay will discuss") is the weakest possible opening—it tells readers what they\'re about to read instead of actually engaging them with the topic itself.'
      },
      {
        letter: 'C',
        text: 'In the darkness of the deep ocean, countless creatures generate their own light, transforming the abyss into a glittering alien landscape.',
        explanation: 'This creates vivid imagery ("glittering alien landscape") and intrigue ("darkness...creatures generate their own light"), engaging reader curiosity while introducing bioluminescence\'s most dramatic context—deep ocean environments.'
      },
      {
        letter: 'D',
        text: 'Many organisms can produce light.',
        explanation: 'This is bland and generic—it states a fact without any descriptive detail, context, or language that would capture interest or suggest why bioluminescence is worth reading about.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C uses vivid, evocative language and imagery to engage reader interest while introducing the topic of bioluminescence in its most dramatic context.'
  },
  {
    position: 24,
    title: 'Supporting Conclusion: Reinforcing Main Point',
    problem_text: 'The restoration project successfully preserved the historic theater while making it accessible to modern audiences through careful updates to safety systems and seating. <u>The theater opened in 1925.</u>\n\nWhich choice most effectively concludes the paragraph by reinforcing the success of balancing preservation with modernization?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'The opening date (1925) is a historical fact that doesn\'t address the paragraph\'s focus on balancing preservation with modernization—it provides background information rather than a conclusion.'
      },
      {
        letter: 'B',
        text: 'Many people attend performances at the theater.',
        explanation: 'Current attendance is evidence of success but doesn\'t specifically reinforce the key point about balancing historic preservation with modern accessibility—it\'s too generic.'
      },
      {
        letter: 'C',
        text: 'The result is a venue that honors its architectural heritage while meeting contemporary standards for comfort and safety.',
        explanation: 'This explicitly reinforces the main point by directly addressing both elements: "honors architectural heritage" (preservation) and "contemporary standards" (modernization), making it a strong concluding statement about the balance achieved.'
      },
      {
        letter: 'D',
        text: 'The project took three years to complete.',
        explanation: 'Timeline information (three years) is a logistical detail that doesn\'t reinforce the main point about successfully balancing preservation with modernization—it\'s about duration, not outcome.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C effectively concludes by explicitly restating how the project achieved its dual goals of preservation and modernization.'
  },
  {
    position: 29,
    title: 'Effective Transition Sentence: Bridging Paragraphs',
    problem_text: '[Previous paragraph discusses the physical health benefits of regular exercise]\n\n<u>Exercise has many benefits.</u> Studies show that physical activity reduces symptoms of depression and anxiety by releasing endorphins and other mood-regulating neurotransmitters. Regular exercisers report better sleep quality and improved self-esteem.\n\nWhich choice most effectively transitions from physical health benefits to mental health benefits?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Exercise has many benefits" is too vague to serve as an effective transition—it could apply to the previous paragraph (physical) or this one (mental) without specifically signaling the shift in focus.'
      },
      {
        letter: 'B',
        text: 'Beyond these physical advantages, exercise also profoundly impacts mental and emotional well-being.',
        explanation: 'This explicitly acknowledges what came before ("physical advantages") while clearly signaling the new focus ("mental and emotional well-being"), creating a smooth bridge between paragraphs with clear directional language.'
      },
      {
        letter: 'C',
        text: 'Depression affects millions of people worldwide.',
        explanation: 'This abruptly introduces depression statistics without connecting to the previous paragraph about physical health—it\'s a jarring topic switch rather than a bridge.'
      },
      {
        letter: 'D',
        text: 'Many people exercise regularly.',
        explanation: 'This generic statement about exercise prevalence doesn\'t transition between topics—it could appear in either paragraph and doesn\'t signal the shift from physical to mental health benefits.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B creates an effective transition by explicitly referencing the previous topic (physical) while introducing the new focus (mental/emotional).'
  },

  // HARD: 33-36, 38-41, 43-44, 46-50 (11 questions)
  {
    position: 33,
    title: 'Complex Rhetorical Purpose: Achieving Multiple Goals',
    problem_text: 'The biologist studied tardigrades, microscopic animals that can survive extreme conditions. <u>These creatures can withstand temperatures from near absolute zero to above boiling, pressures six times greater than those in the deepest ocean trenches, and radiation levels that would be lethal to most life forms.</u>\n\nWhich choice most effectively emphasizes the extremity of conditions tardigrades endure while maintaining the scientific credibility of the passage?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'This provides specific scientific data (temperature ranges, pressure comparisons, radiation levels) that demonstrates extreme survival capabilities while maintaining objective, factual tone appropriate for scientific discussion.'
      },
      {
        letter: 'B',
        text: 'Tardigrades are basically indestructible and can survive anything you throw at them.',
        explanation: 'While this emphasizes extremity, the casual language ("basically," "anything you throw at them") and hyperbole ("indestructible") undermine scientific credibility with informal, imprecise claims.'
      },
      {
        letter: 'C',
        text: 'These animals can survive harsh environments.',
        explanation: '"Harsh environments" is too vague to effectively emphasize the extremity—it doesn\'t specify what makes the conditions extreme or how extreme they are, failing to convey the remarkable nature of tardigrade survival.'
      },
      {
        letter: 'D',
        text: 'Scientists are amazed by how tough these little guys are.',
        explanation: 'The colloquial language ("little guys"), attribution of emotion ("amazed"), and lack of specific data all undermine scientific credibility while failing to precisely demonstrate what makes tardigrades\' survival abilities extreme.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Choice A achieves both rhetorical goals: it emphasizes extremity through specific data while maintaining scientific credibility through objective, precise language.'
  },
  {
    position: 34,
    title: 'Sophisticated Detail Selection: Supporting Nuanced Claim',
    problem_text: 'While social media has often been criticized for spreading misinformation, <u>platforms have recently implemented new features.</u> These tools empower users to make more informed decisions about the content they encounter and share.\n\nWhich choice provides the most specific and relevant support for the claim that platforms are addressing misinformation?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"New features" is vague—it doesn\'t specify what the features are or how they address misinformation, failing to provide concrete evidence for the claim about empowering informed decisions.'
      },
      {
        letter: 'B',
        text: 'millions of people use social media every day.',
        explanation: 'Usage statistics are completely irrelevant to the claim about platforms addressing misinformation—this shifts to platform popularity rather than misinformation solutions.'
      },
      {
        letter: 'C',
        text: 'platforms have introduced fact-checking labels, source credibility indicators, and tools that show how content has been altered or taken out of context.',
        explanation: 'This provides three specific mechanisms (fact-checking labels, credibility indicators, context tools) that directly support the claim about empowering informed decisions—each tool helps users evaluate content reliability.'
      },
      {
        letter: 'D',
        text: 'technology companies are concerned about their reputations.',
        explanation: 'Corporate motivation (reputation concern) doesn\'t support the claim about empowering users—it addresses why companies act but not what they\'re doing or whether it\'s effective against misinformation.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C provides specific examples of anti-misinformation features that directly support how platforms empower informed user decisions.'
  },
  {
    position: 35,
    title: 'Advanced Audience Consideration: Balancing Expertise Levels',
    problem_text: 'The team analyzed gene expression using RNA sequencing. <u>This technique sequences RNA molecules.</u>\n\nGiven that this passage is written for readers with basic science knowledge but no specialized molecular biology training, which choice best explains the technique\'s significance?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'This merely repeats what the acronym stands for (RNA sequencing sequences RNA)—it\'s circular and doesn\'t explain why sequencing RNA matters or what insights it provides to non-specialists.'
      },
      {
        letter: 'B',
        text: 'RNA sequencing employs next-generation sequencing platforms to generate comprehensive transcriptome profiles through high-throughput cDNA library preparation and bioinformatic alignment algorithms.',
        explanation: 'This is far too technical for the stated audience—terms like "transcriptome profiles," "cDNA library preparation," and "bioinformatic alignment algorithms" require specialized training to understand.'
      },
      {
        letter: 'C',
        text: 'This method reveals which genes are active in cells, providing insights into cellular function and how cells respond to different conditions.',
        explanation: 'This explains significance in accessible terms: it connects the technique (RNA sequencing) to understandable outcomes (which genes are active) and practical applications (understanding cell function/response) without requiring specialized knowledge.'
      },
      {
        letter: 'D',
        text: 'It\'s a really cool way to look at genes.',
        explanation: 'This is too casual and vague for readers with "basic science knowledge"—it treats the audience as complete novices and provides no actual explanation of the technique\'s purpose or significance.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C explains the technique\'s significance in clear, accessible terms appropriate for readers with basic science knowledge but no molecular biology specialization.'
  },
  {
    position: 36,
    title: 'Nuanced Tone Adjustment: Matching Register',
    problem_text: 'The economic downturn <u>hurt</u> small businesses more severely than large corporations, which had greater financial reserves to weather the crisis.\n\nGiven the analytical, professional tone of this policy report, which choice most appropriately conveys the economic impact?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'While "hurt" is not incorrect, it\'s slightly informal and emotional for a policy report—analytical writing typically uses more precise, neutral terminology to describe economic impacts.'
      },
      {
        letter: 'B',
        text: 'affected',
        explanation: '"Affected" is neutral but too vague for this context—it doesn\'t specify the negative direction of impact ("more severely" in the original conveys damage, which "affected" alone doesn\'t capture).'
      },
      {
        letter: 'C',
        text: 'impacted adversely',
        explanation: '"Impacted adversely" uses formal, precise language appropriate for policy analysis: "impacted" is the professional term for economic effects, and "adversely" specifies the negative direction without emotional connotation.'
      },
      {
        letter: 'D',
        text: 'totally devastated',
        explanation: '"Totally devastated" is hyperbolic and emotional—while small businesses were harmed more than corporations, "totally devastated" overstates the case and introduces inappropriate dramatic language for analytical writing.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C uses appropriately formal, precise terminology for a policy report while accurately conveying negative economic impact without emotional language.'
  },
  {
    position: 38,
    title: 'Strategic Information Placement: Logical Flow',
    problem_text: '[Sentence 1] The library\'s renovation includes new technology hubs with 3D printers and recording studios. [Sentence 2] Community members of all ages now use the library as a creative workspace. [Sentence 3] <u>The renovation project began in 2020 with a $2 million grant from the city.</u> [Sentence 4] Membership has increased by 40% since the upgrades were completed.\n\nFor the sake of logic and cohesion, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now, because funding information should come after the results.',
        explanation: 'This creates an illogical flow: discussing results (community use, membership increase) before explaining when/how the project happened confuses the chronological and causal sequence.'
      },
      {
        letter: 'B',
        text: 'before Sentence 1, because readers need to know when and how the renovation was funded before learning what it includes.',
        explanation: 'Starting with funding details (2020, $2 million grant) provides chronological context before describing what was done (technology hubs) and the results (community use, membership increase)—this follows a logical temporal and causal sequence.'
      },
      {
        letter: 'C',
        text: 'after Sentence 4, because financial information should always come last.',
        explanation: 'There\'s no logical reason financial information must come last—in fact, placing funding information after results creates confusion about the timeline and makes causation (funding → renovation → results) harder to follow.'
      },
      {
        letter: 'D',
        text: 'deleted entirely, because funding information is not relevant to the library\'s use.',
        explanation: 'Funding information provides important context about how the renovation happened—it\'s relevant to understanding the project\'s scope and should be included, just better positioned.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 3 should begin the paragraph to establish chronological context (when/how funded) before describing the renovation and its results.'
  },
  {
    position: 39,
    title: 'Complex Purpose: Establishing Authority',
    problem_text: 'According to the committee\'s recommendations, <u>schools should think about maybe updating their curriculum to include more digital literacy components.</u>\n\nWhich choice most effectively conveys the committee\'s recommendation with appropriate authority and clarity?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'The tentative language ("think about maybe") dramatically undermines authority—official committee recommendations should be stated decisively, not hedged with multiple qualifiers that suggest uncertainty.'
      },
      {
        letter: 'B',
        text: 'schools must integrate comprehensive digital literacy instruction across all grade levels.',
        explanation: 'This conveys authority through decisive language ("must integrate") and specificity ("comprehensive," "across all grade levels"), presenting the recommendation with the certainty appropriate for an official committee directive.'
      },
      {
        letter: 'C',
        text: 'it would be nice if schools added some digital stuff.',
        explanation: 'This is extremely casual ("it would be nice," "digital stuff") and vague, completely inappropriate for conveying an official committee recommendation—it sounds like a personal suggestion, not institutional guidance.'
      },
      {
        letter: 'D',
        text: 'schools could possibly consider whether to update things.',
        explanation: 'Excessive hedging ("could possibly consider whether") and vague language ("things") drain all authority from the recommendation, making it sound uncertain rather than directive.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B uses decisive, specific language that conveys the authority appropriate for an official committee recommendation.'
  },
  {
    position: 40,
    title: 'Sophisticated Concision: Eliminating Redundancy',
    problem_text: 'The archaeologist carefully excavated the fragile artifacts <u>with great care and attention to detail, taking caution not to damage them.</u>\n\nWhich choice most effectively eliminates redundancy while preserving essential meaning?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'This is extremely redundant: "carefully" already conveys "with great care," "attention to detail," and "taking caution"—the phrase repeats the same idea four times using different words.'
      },
      {
        letter: 'B',
        text: 'to avoid damage.',
        explanation: 'Since "carefully excavated" already implies avoiding damage, and "fragile artifacts" establishes that damage is a concern, simply stating the purpose "to avoid damage" provides new information (the goal) without repeating "carefully."'
      },
      {
        letter: 'C',
        text: 'in a way that showed carefulness and avoided breaking them.',
        explanation: 'This still contains redundancy: "carefully excavated" already means "in a way that showed carefulness," so this phrase repeats rather than adds to the meaning.'
      },
      {
        letter: 'D',
        text: 'with extreme caution and paying very close attention so as not to cause any damage whatsoever to them.',
        explanation: 'This is even more redundant than the original—it expands "carefully" into multiple overlapping phrases without adding any new information beyond what "carefully excavated fragile artifacts" already conveys.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B eliminates all redundancy by removing words that repeat "carefully" while preserving the essential information about the excavation\'s purpose.'
  },
  {
    position: 41,
    title: 'Advanced Relevance Assessment: Evaluating Evidence Quality',
    problem_text: 'The study examined whether exposure to green spaces reduces stress in urban residents. Participants who spent 30 minutes in parks showed measurably lower cortisol levels than those who remained in office environments. <u>Cortisol is a hormone released by the adrenal glands in response to stress, and elevated levels over extended periods can contribute to various health problems including hypertension and weakened immune function.</u> These findings suggest that integrating natural areas into city planning could have significant public health benefits.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it explains why cortisol levels matter to the study\'s stress-reduction claim.',
        explanation: 'The sentence explains what cortisol is and why elevated levels are problematic (health issues), which helps readers understand why "lower cortisol levels" represents meaningful stress reduction with health implications—this supports the public health claim.'
      },
      {
        letter: 'B',
        text: 'Kept, because it provides scientific definitions necessary for all readers.',
        explanation: 'While the definition helps some readers, this isn\'t the primary justification—the sentence is valuable not just for defining cortisol but for explaining why the study\'s findings have health significance.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it distracts from the main focus on green spaces.',
        explanation: 'The sentence doesn\'t distract—it directly supports understanding why cortisol measurements indicate stress reduction and health benefits, which is central to the claim about green spaces\' public health value.'
      },
      {
        letter: 'D',
        text: 'Deleted, because the study is about parks, not hormones.',
        explanation: 'This oversimplifies the study\'s focus—while parks are the intervention being tested, cortisol (a hormone) is the measurable indicator of stress reduction, so explaining it is directly relevant to the study\'s claims.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it explains why cortisol measurement matters, supporting the study\'s claims about stress reduction and public health.'
  },
  {
    position: 43,
    title: 'Precision in Academic Context: Qualifying Claims',
    problem_text: 'The data <u>proves</u> that increased screen time correlates with reduced sleep quality in adolescents.\n\nGiven the academic context discussing correlation research, which choice most precisely represents the strength and type of claim the data supports?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Proves" claims absolute certainty and causation, but correlation studies show association, not causation—this overstates what correlation data can demonstrate and is imprecise for academic research discussion.'
      },
      {
        letter: 'B',
        text: 'demonstrates',
        explanation: '"Demonstrates" appropriately conveys that the data shows a relationship without claiming absolute proof or causation—it\'s precise for correlation findings where evidence supports but doesn\'t "prove" the relationship.'
      },
      {
        letter: 'C',
        text: 'suggests the possibility that',
        explanation: 'This is too weak—if data shows correlation, "suggests the possibility" understates the finding, making it sound speculative when the correlation has been measured and is not merely possible.'
      },
      {
        letter: 'D',
        text: 'kind of shows',
        explanation: '"Kind of shows" is casual, imprecise language inappropriate for academic writing, and it inappropriately introduces uncertainty about findings that have been measured.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B uses appropriately precise language for correlation research, conveying evidence without overclaiming causation or absolute proof.'
  },
  {
    position: 44,
    title: 'Strategic Emphasis Through Structure: Sentence Positioning',
    problem_text: 'Marine biologists have observed remarkable intelligence in octopuses. These creatures can solve complex puzzles, use tools, and even recognize individual human faces. <u>One particularly notable case involved an octopus named Otto who repeatedly short-circuited his aquarium\'s overhead lights by squirting water at them, apparently annoyed by their brightness.</u> Research suggests octopuses possess problem-solving abilities comparable to some mammals.\n\nWhich choice most effectively emphasizes the range of octopus intelligence rather than focusing on a single dramatic example?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'While Otto\'s story is engaging, focusing on one dramatic anecdote draws attention to a specific incident rather than emphasizing the breadth of capabilities (puzzles, tools, recognition, problem-solving) mentioned in surrounding sentences.'
      },
      {
        letter: 'B',
        text: 'Researchers have documented octopuses opening childproof bottles, escaping from enclosures, and adapting their hunting strategies based on previous experience.',
        explanation: 'This lists multiple types of intelligent behaviors (opening bottles, escaping, adapting strategies) that demonstrate cognitive range, supporting the "remarkable intelligence" claim by showing breadth rather than a single colorful incident.'
      },
      {
        letter: 'C',
        text: 'Otto the octopus became famous on the internet.',
        explanation: 'This shifts to popularity/fame rather than intelligence capabilities—it doesn\'t support the paragraph\'s focus on cognitive abilities at all.'
      },
      {
        letter: 'D',
        text: 'Many species of octopuses live in different ocean environments.',
        explanation: 'Geographic distribution is irrelevant to intelligence—this completely shifts away from the cognitive abilities that are the paragraph\'s focus.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B emphasizes the range of octopus intelligence through multiple examples rather than one dramatic anecdote, better supporting the paragraph\'s central claim.'
  },
  {
    position: 46,
    title: 'Complex Audience Adaptation: Balancing Technical and Accessible',
    problem_text: 'The vaccine <u>introduces antigens that stimulate adaptive immune response through MHC class II presentation to CD4+ T helper cells, initiating clonal expansion and B cell antibody production.</u>\n\nGiven that this public health brochure targets general adult readers with no medical background, which choice best explains the vaccine mechanism?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'This highly technical explanation (MHC class II, CD4+ T cells, clonal expansion) is completely inappropriate for general readers—it requires immunology knowledge they don\'t have and will confuse rather than inform.'
      },
      {
        letter: 'B',
        text: 'works by teaching your immune system to recognize and fight specific diseases without making you sick.',
        explanation: 'This uses accessible analogy ("teaching your immune system") and focuses on the practical outcome (recognize/fight diseases, not making you sick) appropriate for general readers who need to understand what vaccines do, not the molecular details.'
      },
      {
        letter: 'C',
        text: 'does stuff to your body\'s defenses.',
        explanation: 'This is too vague and casual for even a general audience—"does stuff" provides no actual information about mechanism or purpose, failing to educate readers about how vaccines work.'
      },
      {
        letter: 'D',
        text: 'contains dead germs.',
        explanation: 'This oversimplifies to the point of inaccuracy—many vaccines don\'t contain "dead germs," and this doesn\'t explain the mechanism or outcome, just vaguely hints at one type of vaccine component.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B translates technical process into accessible language appropriate for general readers while accurately conveying the vaccine\'s function and benefit.'
  },
  {
    position: 47,
    title: 'Sophisticated Conclusion: Synthesizing Multiple Points',
    problem_text: 'The essay has discussed how renewable energy technologies have become more efficient, how their costs have decreased dramatically, and how public support for clean energy has grown. <u>Solar panels are one type of renewable energy.</u>\n\nWhich choice most effectively concludes by synthesizing the essay\'s main points about renewable energy progress?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'Defining one technology type ("solar panels are one type") doesn\'t synthesize the three main points (efficiency gains, cost reduction, public support)—it introduces a narrow detail rather than drawing themes together.'
      },
      {
        letter: 'B',
        text: 'These converging trends—technological advancement, economic viability, and social acceptance—position renewable energy to transform the global energy landscape.',
        explanation: 'This synthesizes all three essay points (technological = efficiency, economic = costs, social = public support) and projects their combined significance ("transform energy landscape"), effectively concluding by showing how the parts form a larger whole.'
      },
      {
        letter: 'C',
        text: 'In conclusion, this essay discussed renewable energy.',
        explanation: 'This meta-commentary merely announces that the essay discussed the topic without synthesizing points or providing closure—it\'s the weakest possible conclusion that adds no insight.'
      },
      {
        letter: 'D',
        text: 'Wind and solar energy will be important in the future.',
        explanation: 'This makes a vague prediction about two technologies without referencing the essay\'s specific points about efficiency improvements, cost reduction, or public support—it doesn\'t synthesize the argument.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B effectively synthesizes the essay\'s three main points and projects their combined significance, providing strong closure.'
  },
  {
    position: 48,
    title: 'Nuanced Detail Relevance: Context-Specific Support',
    problem_text: 'Urban wildlife has adapted remarkably to city environments, with some species thriving better than in rural areas. <u>Peregrine falcons, once endangered due to pesticide use, now nest on skyscraper ledges that mimic their natural cliff habitats, and they hunt the abundant pigeons that congregate in cities.</u> This adaptation demonstrates nature\'s resilience.\n\nGiven that the paragraph focuses on successful urban adaptation rather than conservation history, which version best supports the main point?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'While the endangerment history is interesting, half of this sentence focuses on past pesticide problems rather than current urban adaptation—the conservation backstory distracts from the paragraph\'s focus on how wildlife thrives in cities now.'
      },
      {
        letter: 'B',
        text: 'Peregrine falcons nest on skyscraper ledges that substitute for cliff faces, and they prey on the dense urban pigeon populations unavailable in wilderness areas.',
        explanation: 'This focuses entirely on current urban adaptation mechanisms: how cities provide substitute habitat (ledges for cliffs) and food advantages (dense pigeon populations), directly supporting "thriving better than in rural areas" without historical distraction.'
      },
      {
        letter: 'C',
        text: 'Peregrine falcons are impressive birds of prey.',
        explanation: 'This generic description provides no information about urban adaptation—it doesn\'t explain how or why falcons thrive in cities, failing to support the paragraph\'s focus.'
      },
      {
        letter: 'D',
        text: 'Pesticides once nearly wiped out peregrine falcon populations.',
        explanation: 'This focuses entirely on historical conservation problems with no connection to urban adaptation—it\'s completely off-topic for a paragraph about how wildlife currently thrives in cities.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B stays focused on current urban adaptation mechanisms without the conservation history tangent, better supporting the paragraph\'s main point.'
  },
  {
    position: 49,
    title: 'Advanced Rhetorical Strategy: Anticipating Counterarguments',
    problem_text: 'Schools should extend lunch periods from 20 to 45 minutes to improve student wellbeing. <u>Longer lunch periods would be beneficial for students.</u> Research shows that adequate break time improves afternoon concentration and reduces stress.\n\nWhich choice most effectively strengthens the argument by addressing a likely concern about extended lunch periods?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: 'This simply restates the claim ("would be beneficial") without adding evidence or addressing potential objections like schedule impacts or lost instructional time—it doesn\'t strengthen the argument.'
      },
      {
        letter: 'B',
        text: 'Many students currently eat lunch too quickly.',
        explanation: 'While this describes a problem longer lunches might solve, it doesn\'t address the likely counterargument that extending lunch will reduce instructional time or create scheduling difficulties.'
      },
      {
        letter: 'C',
        text: 'While extending lunch requires schedule adjustments, schools that have made this change report that improved afternoon focus and reduced behavioral issues more than compensate for the shorter class periods.',
        explanation: 'This acknowledges the main counterargument (schedule challenges) and directly refutes it with evidence (improved focus, fewer behavioral issues outweigh shorter classes), strategically strengthening the argument by showing awareness of opposition.'
      },
      {
        letter: 'D',
        text: 'Students need time to relax.',
        explanation: 'This adds another reason for longer lunch but doesn\'t address counterarguments—it provides support but doesn\'t strategically anticipate and counter objections about instructional time.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Choice C strengthens the argument by acknowledging and refuting the most likely objection (schedule impacts) with evidence of offsetting benefits.'
  },
  {
    position: 50,
    title: 'Ultimate Synthesis: Achieving Multiple Complex Goals',
    problem_text: 'The restoration of native prairie ecosystems involves complex ecological relationships. <u>Plants and animals interact in prairies.</u>\n\nWhich choice best concludes this technical article by emphasizing restoration complexity while maintaining scientific credibility and providing meaningful closure?',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Plants and animals interact" is overly simplistic for a technical article conclusion—it doesn\'t convey complexity, lacks scientific precision, and provides no meaningful closure about restoration challenges or significance.'
      },
      {
        letter: 'B',
        text: 'Success requires not only reintroducing native species but also reestablishing the intricate relationships among flora, fauna, soil microbiota, and disturbance regimes like fire—a process that may take decades to achieve stable, self-sustaining communities.',
        explanation: 'This achieves all three goals: emphasizes complexity (intricate relationships, multiple components), maintains scientific credibility (technical terms like soil microbiota, disturbance regimes), and provides closure (time scale, definition of success as stable communities).'
      },
      {
        letter: 'C',
        text: 'Prairies are cool ecosystems that we should totally save.',
        explanation: 'Casual language ("cool," "totally") destroys scientific credibility, "we should save" shifts to opinion rather than technical analysis, and there\'s no discussion of complexity—this fails all three goals.'
      },
      {
        letter: 'D',
        text: 'In summary, this article discussed prairie restoration.',
        explanation: 'Meta-commentary provides weak closure, doesn\'t emphasize complexity or scientific concepts, and adds no meaningful content—it merely announces the topic was discussed without synthesizing insights about restoration challenges.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Choice B achieves all three rhetorical goals: emphasizing complexity through multiple ecological components, maintaining scientific credibility with technical terminology, and providing meaningful closure about restoration timeline and success criteria.'
  }
];

async function main() {
  console.log('Creating WHICH-CHOICE lesson questions...\n');
  console.log('='.repeat(70) + '\n');

  let added = 0;
  for (const q of questions) {
    if (await addQuestion(q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      added++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\n✅ WHICH-CHOICE Complete! Added ${added}/${questions.length} questions.`);
}

main();
