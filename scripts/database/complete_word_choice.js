/**
 * Complete WORD-CHOICE lesson (30 questions)
 * Missing positions: 5-7, 9-10, 13-16, 19-21, 23-24, 29, 33-36, 38-41, 43-44, 46-50
 * Each choice needs SPECIFIC explanation about why it works or doesn't work
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '04df2a09-a910-4456-8fe5-2f8e7f62c50f'; // word-choice

async function addQuestion(question) {
  const { error } = await supabase.from('lesson_examples').insert({
    lesson_id: LESSON_ID,
    position: question.position,
    title: question.title,
    problem_text: question.problem_text,
    choices: question.choices,
    correct_answer: question.correct_answer,
    solution_steps: [],
    answer_explanation: question.answer_explanation || '',
    is_worked_example: false
  });

  if (error) {
    console.error(`  ✗ Error at position ${question.position}:`, error.message);
    return false;
  }
  return true;
}

const questions = [
  // EASY (5-7, 9-10, 13-14)
  {
    position: 5,
    title: 'Basic Precision: Vague vs. Specific',
    problem_text: 'The scientist made a <u>good</u> discovery that advanced our understanding of cellular biology.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Good" is too vague and doesn\'t convey the significance of a scientific discovery. More precise language is needed to describe a breakthrough that "advanced understanding."'
      },
      {
        letter: 'B',
        text: 'significant',
        explanation: '"Significant" precisely conveys that the discovery had important implications for the field, matching the context that it "advanced our understanding."'
      },
      {
        letter: 'C',
        text: 'nice',
        explanation: '"Nice" is even more vague than "good" and too casual for describing a scientific discovery. It doesn\'t convey the importance or impact of the finding.'
      },
      {
        letter: 'D',
        text: 'okay',
        explanation: '"Okay" suggests something merely acceptable or adequate, which contradicts the idea that the discovery "advanced understanding." It\'s also too informal for academic context.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'In formal writing, especially about scientific achievements, precise language is essential. "Significant" accurately describes a discovery that advances understanding, while "good," "nice," and "okay" are too vague or casual.'
  },
  {
    position: 6,
    title: 'Formal vs. Informal Diction',
    problem_text: 'The committee <u>got rid of</u> outdated regulations to streamline the approval process.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Got rid of" is conversational and informal, not appropriate for describing official committee actions. Formal writing requires more professional vocabulary.'
      },
      {
        letter: 'B',
        text: 'eliminated',
        explanation: '"Eliminated" is the precise, formal term for removing regulations. It matches the professional tone appropriate for describing committee decisions.'
      },
      {
        letter: 'C',
        text: 'ditched',
        explanation: '"Ditched" is slang and highly informal, even more casual than "got rid of." It\'s inappropriate for formal writing about government or organizational processes.'
      },
      {
        letter: 'D',
        text: 'threw out',
        explanation: '"Threw out" is colloquial and suggests physical disposal rather than the formal process of repealing regulations. It lacks the professionalism needed here.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Formal contexts require formal vocabulary. "Eliminated" is the standard, professional term for removing regulations, while the other choices are too casual or colloquial.'
  },
  {
    position: 7,
    title: 'Connotation: Neutral vs. Loaded',
    problem_text: 'The senator <u>argued</u> for increased funding for public education.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Argued" has a neutral to slightly negative connotation, suggesting conflict or debate. It doesn\'t imply the senator was necessarily convincing or constructive.'
      },
      {
        letter: 'B',
        text: 'advocated',
        explanation: '"Advocated" has a positive connotation of actively supporting a cause. It suggests the senator was championing education funding, which fits the constructive context.'
      },
      {
        letter: 'C',
        text: 'complained',
        explanation: '"Complained" has a negative connotation of whining or criticizing without offering solutions. It doesn\'t fit the constructive action of seeking funding.'
      },
      {
        letter: 'D',
        text: 'protested',
        explanation: '"Protested" suggests opposition to something, not support for it. The senator is supporting funding, not opposing it.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Word connotation matters. "Advocated" suggests active, positive support, while "argued" is neutral, "complained" is negative, and "protested" implies opposition rather than support.'
  },
  {
    position: 9,
    title: 'Precise Verb Selection',
    problem_text: 'The new policy will <u>help</u> small businesses by reducing regulatory burdens.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Help" is vague about how or to what extent the policy assists businesses. More specific language would clarify the nature of the benefit.'
      },
      {
        letter: 'B',
        text: 'benefit',
        explanation: '"Benefit" is more specific than "help," clearly indicating that businesses will gain advantages from the policy. It\'s more precise for formal policy discussion.'
      },
      {
        letter: 'C',
        text: 'be good for',
        explanation: '"Be good for" is colloquial and vague, offering no specific information about how the policy assists businesses. It\'s too informal for policy writing.'
      },
      {
        letter: 'D',
        text: 'do stuff for',
        explanation: '"Do stuff for" is extremely informal slang. "Stuff" is vague, and the phrase is far too casual for discussing government policy.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Precision in verb choice clarifies meaning. "Benefit" specifically indicates positive effects, while "help" is vague and the other options are too informal.'
  },
  {
    position: 10,
    title: 'Context-Appropriate Intensity',
    problem_text: 'The earthquake caused <u>bad</u> damage to the city\'s infrastructure.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Bad" understates the severity of earthquake damage to infrastructure. Given the context, more specific language about extent or severity is needed.'
      },
      {
        letter: 'B',
        text: 'extensive',
        explanation: '"Extensive" precisely describes damage that is widespread across the infrastructure, appropriate for the scope of earthquake damage.'
      },
      {
        letter: 'C',
        text: 'some',
        explanation: '"Some" minimizes the damage, suggesting it might be minor or limited. This contradicts the significance implied by mentioning earthquake damage to city infrastructure.'
      },
      {
        letter: 'D',
        text: 'not good',
        explanation: '"Not good" is informal and uses understatement inappropriately. It\'s too vague and casual for describing serious infrastructure damage.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'The intensity of descriptive words must match context. Earthquake damage to city infrastructure warrants "extensive" rather than the vague "bad" or understated alternatives.'
  },
  {
    position: 13,
    title: 'Academic vs. Casual Register',
    problem_text: 'The research <u>shows</u> a correlation between exercise and improved cognitive function.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Shows" is acceptable but somewhat plain for academic writing. While not wrong, a more formal alternative would elevate the register.'
      },
      {
        letter: 'B',
        text: 'demonstrates',
        explanation: '"Demonstrates" is the standard academic term for presenting research findings, providing appropriate formality for scientific writing.'
      },
      {
        letter: 'C',
        text: 'proves',
        explanation: '"Proves" overstates what correlation studies can establish. Research shows relationships but rarely "proves" causation, especially in complex systems like cognitive function.'
      },
      {
        letter: 'D',
        text: 'says',
        explanation: '"Says" is too casual and imprecise for academic writing. Research doesn\'t "say" things; it demonstrates, indicates, or suggests findings through data.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Academic writing requires precise, formal language. "Demonstrates" is the conventional term for presenting research findings, more appropriate than casual alternatives.'
  },
  {
    position: 14,
    title: 'Precise Adjective Choice',
    problem_text: 'The museum\'s <u>old</u> collection includes artifacts from ancient civilizations.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Old" is vague and could apply to anything from decades to millennia. For artifacts from ancient civilizations, more precise terminology is needed.'
      },
      {
        letter: 'B',
        text: 'historic',
        explanation: '"Historic" precisely indicates items of historical significance, appropriate for artifacts from ancient civilizations that have scholarly or cultural importance.'
      },
      {
        letter: 'C',
        text: 'aged',
        explanation: '"Aged" emphasizes the passage of time but doesn\'t convey significance or importance. It could apply to anything old, not necessarily valuable artifacts.'
      },
      {
        letter: 'D',
        text: 'antique',
        explanation: '"Antique" typically refers to items 100+ years old with collectible value, but it\'s more commercial than scholarly. "Historic" better captures the civilizational significance.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Precision matters in describing museum collections. "Historic" indicates significance and scholarly importance, while "old" is too vague for ancient artifacts.'
  },

  // MEDIUM (15-16, 19-21, 23-24, 29, 33-34)
  {
    position: 15,
    title: 'Nuanced Verb Distinction',
    problem_text: 'The data <u>suggests</u> that climate patterns are shifting more rapidly than previously predicted.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Suggests" correctly conveys that data points toward a conclusion without claiming absolute certainty, appropriate for scientific findings that may have limitations.'
      },
      {
        letter: 'B',
        text: 'proves',
        explanation: '"Proves" claims absolute certainty that data cannot provide, especially in complex systems like climate. Scientific data suggests or supports conclusions but rarely "proves" them definitively.'
      },
      {
        letter: 'C',
        text: 'thinks',
        explanation: '"Thinks" anthropomorphizes data, attributing human mental processes to inanimate information. Data cannot think; it can only indicate, suggest, or show patterns.'
      },
      {
        letter: 'D',
        text: 'believes',
        explanation: '"Believes" also inappropriately attributes human consciousness to data. Additionally, "belief" implies opinion or faith rather than evidence-based indication.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Scientific writing requires precise verbs. Data can "suggest" conclusions without claiming certainty, but cannot "prove" complex phenomena or perform human mental processes like "think" or "believe."'
  },
  {
    position: 16,
    title: 'Context-Specific Vocabulary',
    problem_text: 'The architect <u>made</u> a blueprint for the new community center.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Made" is generic and doesn\'t reflect the professional, technical nature of architectural work. Blueprints are designed through specific professional processes.'
      },
      {
        letter: 'B',
        text: 'created',
        explanation: '"Created" is slightly better than "made" but still doesn\'t capture the technical, methodical process architects use when developing blueprints.'
      },
      {
        letter: 'C',
        text: 'drafted',
        explanation: '"Drafted" is the precise term for creating architectural plans and blueprints, reflecting the technical drawing and specification process architects use.'
      },
      {
        letter: 'D',
        text: 'built',
        explanation: '"Built" refers to physical construction, not the design process. Architects draft blueprints; contractors build structures based on those plans.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Professional contexts require field-specific vocabulary. Architects "draft" blueprints using technical processes, not simply "make" or "create" them.'
  },
  {
    position: 19,
    title: 'Tone Consistency',
    problem_text: 'The documentary <u>talks about</u> the devastating effects of deforestation on biodiversity.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Talks about" is conversational and too informal for describing serious documentary content about environmental devastation.'
      },
      {
        letter: 'B',
        text: 'examines',
        explanation: '"Examines" matches the serious tone appropriate for discussing devastating environmental effects, suggesting thorough, analytical treatment of the subject.'
      },
      {
        letter: 'C',
        text: 'mentions',
        explanation: '"Mentions" suggests superficial or passing reference, minimizing the documentary\'s treatment of such a serious topic about devastation and biodiversity loss.'
      },
      {
        letter: 'D',
        text: 'chats about',
        explanation: '"Chats about" is extremely casual, suggesting light conversation. It\'s completely inappropriate for serious environmental documentary content.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Tone must match content seriousness. A documentary about devastating environmental effects "examines" the topic formally, not "talks about" or "chats about" it casually.'
  },
  {
    position: 20,
    title: 'Subtle Connotation Differences',
    problem_text: 'The committee <u>rejected</u> the proposal after careful consideration.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Rejected" is neutral and appropriate for formal decision-making, indicating the committee declined the proposal after deliberation.'
      },
      {
        letter: 'B',
        text: 'dismissed',
        explanation: '"Dismissed" suggests the proposal was given little consideration or was frivolous, contradicting "after careful consideration."'
      },
      {
        letter: 'C',
        text: 'threw out',
        explanation: '"Threw out" is too informal and suggests hasty, perhaps disrespectful treatment inconsistent with "careful consideration."'
      },
      {
        letter: 'D',
        text: 'denied',
        explanation: '"Denied" often implies someone was requesting permission or making a claim, which is less precise than "rejected" for a proposal being evaluated.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Subtle connotation matters. "Rejected" neutrally describes a formal decision after deliberation, while "dismissed" implies inadequate consideration and "threw out" is too casual.'
  },
  {
    position: 21,
    title: 'Degree of Certainty',
    problem_text: 'The evidence <u>definitely proves</u> the defendant\'s innocence.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Definitely proves" claims absolute certainty that legal evidence rarely provides. Even strong evidence typically "strongly suggests" or "indicates" rather than "definitely proves."'
      },
      {
        letter: 'B',
        text: 'strongly suggests',
        explanation: '"Strongly suggests" appropriately conveys that evidence points toward innocence without claiming the absolute certainty that legal proceedings cannot usually establish.'
      },
      {
        letter: 'C',
        text: 'might indicate',
        explanation: '"Might indicate" is too weak if the evidence genuinely supports innocence. It suggests mere possibility rather than substantial support.'
      },
      {
        letter: 'D',
        text: 'could possibly show',
        explanation: '"Could possibly show" is tentative to the point of hedging, appropriate only if evidence is very weak. The double qualification ("could" + "possibly") signals uncertainty.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Legal and scientific contexts require calibrated certainty language. Evidence "strongly suggests" conclusions without claiming the absolute certainty implied by "definitely proves."'
  },
  {
    position: 23,
    title: 'Technical Precision',
    problem_text: 'The medication <u>helps</u> reduce inflammation in patients with arthritis.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Helps reduce" is vague about the medication\'s effectiveness and mechanism. Medical writing benefits from more precise terminology.'
      },
      {
        letter: 'B',
        text: 'alleviates',
        explanation: '"Alleviates" is the precise medical term for reducing symptoms or severity, appropriate for professional discussion of medication effects on inflammation.'
      },
      {
        letter: 'C',
        text: 'makes better',
        explanation: '"Makes better" is too colloquial and imprecise for medical contexts. It doesn\'t specify what aspect improves or how.'
      },
      {
        letter: 'D',
        text: 'fixes',
        explanation: '"Fixes" suggests complete cure, which is misleading for arthritis medication that manages symptoms rather than curing the condition.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Medical contexts require technical precision. "Alleviates" is the standard medical term for symptom reduction, more precise than casual alternatives.'
  },
  {
    position: 24,
    title: 'Formality Level Matching',
    problem_text: 'The study\'s findings <u>contradict</u> previous research on the topic.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Contradict" is appropriately formal for academic writing, precisely indicating that findings oppose or disagree with previous research.'
      },
      {
        letter: 'B',
        text: 'go against',
        explanation: '"Go against" is too informal for academic research discussion. It\'s conversational phrasing that lacks the precision expected in scholarly writing.'
      },
      {
        letter: 'C',
        text: 'fight with',
        explanation: '"Fight with" anthropomorphizes research findings and is far too colloquial. Research findings don\'t "fight"; they contradict, challenge, or diverge from previous work.'
      },
      {
        letter: 'D',
        text: 'don\'t match up with',
        explanation: '"Don\'t match up with" is conversational and vague. It lacks the precision and formality required for describing relationships between research findings.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Academic writing requires formal, precise vocabulary. "Contradict" is the standard term for opposing findings, while alternatives are too casual or vague.'
  },
  {
    position: 29,
    title: 'Sophisticated Nuance',
    problem_text: 'The author\'s argument is <u>convincing</u> due to its logical structure and supporting evidence.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Convincing" appropriately describes an argument that persuades through logic and evidence, matching the sophisticated context of analytical writing.'
      },
      {
        letter: 'B',
        text: 'good',
        explanation: '"Good" is too vague and doesn\'t specify what makes the argument effective. It lacks the precision needed for literary or rhetorical analysis.'
      },
      {
        letter: 'C',
        text: 'nice',
        explanation: '"Nice" is casual and subjective, inappropriate for evaluating argument quality. It suggests superficial appeal rather than logical persuasiveness.'
      },
      {
        letter: 'D',
        text: 'okay',
        explanation: '"Okay" suggests mere adequacy, contradicting the praise implied by noting "logical structure and supporting evidence." It\'s also too informal.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Analytical writing requires precise evaluative terms. "Convincing" specifically addresses persuasive power, while "good," "nice," and "okay" are too vague or casual.'
  },
  {
    position: 33,
    title: 'Professional Register',
    problem_text: 'The CEO <u>announced</u> a major restructuring of the company.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Announced" is appropriately formal for corporate communications, precisely indicating official public disclosure of significant organizational changes.'
      },
      {
        letter: 'B',
        text: 'told people about',
        explanation: '"Told people about" is too informal and vague for corporate contexts. It doesn\'t capture the official, formal nature of CEO communications about restructuring.'
      },
      {
        letter: 'C',
        text: 'said',
        explanation: '"Said" is too casual and doesn\'t convey the formal, official nature of a CEO\'s public declaration about major company changes.'
      },
      {
        letter: 'D',
        text: 'mentioned',
        explanation: '"Mentioned" suggests a casual or passing reference, inappropriate for a major restructuring announcement. It minimizes the significance and formality of the communication.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Corporate contexts require professional vocabulary. CEOs "announce" major changes formally, not "tell people about" or casually "mention" them.'
  },
  {
    position: 34,
    title: 'Precision in Description',
    problem_text: 'The artist\'s use of color is <u>different</u> from traditional approaches.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Different" merely states a contrast without specifying its nature or value. For art criticism, more descriptive language would be more informative.'
      },
      {
        letter: 'B',
        text: 'innovative',
        explanation: '"Innovative" specifically indicates that the color use introduces new techniques or approaches, providing meaningful evaluation beyond mere difference.'
      },
      {
        letter: 'C',
        text: 'not the same as',
        explanation: '"Not the same as" is wordy and adds no information beyond "different." It\'s also more casual than appropriate for art criticism.'
      },
      {
        letter: 'D',
        text: 'weird',
        explanation: '"Weird" is informal and carries negative connotation, suggesting strangeness rather than evaluating artistic merit or approach.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Descriptive writing benefits from specific, evaluative language. "Innovative" describes the nature of the difference, while "different" merely notes it exists.'
  },

  // HARD (35-36, 38-41, 43-44, 46-50)
  {
    position: 35,
    title: 'Subtle Register Shift',
    problem_text: 'The laboratory\'s findings <u>indicate</u> a potential breakthrough in cancer treatment.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Indicate" appropriately conveys scientific findings that point toward but don\'t definitively establish a breakthrough, maintaining proper scientific caution.'
      },
      {
        letter: 'B',
        text: 'show',
        explanation: '"Show" is acceptable but less precise than "indicate" for scientific contexts where findings suggest possibilities rather than demonstrating certainties.'
      },
      {
        letter: 'C',
        text: 'hint at',
        explanation: '"Hint at" is too informal and weak for scientific findings. It suggests vague possibility rather than evidence-supported indication.'
      },
      {
        letter: 'D',
        text: 'prove',
        explanation: '"Prove" overclaims what laboratory findings typically establish. Scientific findings indicate or suggest possibilities; proof requires extensive validation and replication.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Scientific writing requires precise calibration. "Indicate" appropriately suggests evidence-based possibility without the weakness of "hint at" or overclaiming certainty like "prove."'
  },
  {
    position: 36,
    title: 'Complex Connotation Selection',
    problem_text: 'The diplomat\'s <u>persistent</u> efforts led to a peace agreement.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Persistent" has positive connotation here, suggesting admirable determination in pursuing peace, appropriate for praising diplomatic success.'
      },
      {
        letter: 'B',
        text: 'stubborn',
        explanation: '"Stubborn" carries negative connotation of inflexibility or unreasonable resistance to change, inappropriate for praising diplomatic achievement.'
      },
      {
        letter: 'C',
        text: 'obsessive',
        explanation: '"Obsessive" suggests unhealthy fixation or excessive preoccupation, carrying negative connotation inappropriate for describing successful diplomatic work.'
      },
      {
        letter: 'D',
        text: 'constant',
        explanation: '"Constant" is neutral but emphasizes continuity rather than the determination and effort implied by "persistent." It\'s less descriptive of the diplomat\'s active work.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Connotation profoundly affects meaning. "Persistent" carries positive determination, while "stubborn" and "obsessive" suggest negative inflexibility or fixation.'
  },
  {
    position: 38,
    title: 'Advanced Precision',
    problem_text: 'The economist <u>predicted</u> that inflation would decrease within six months.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Predicted" appropriately indicates a forecast based on economic analysis, acknowledging inherent uncertainty in economic projections.'
      },
      {
        letter: 'B',
        text: 'guaranteed',
        explanation: '"Guaranteed" claims certainty that economic predictions cannot provide. Economic forecasts are analytical projections, not assured outcomes.'
      },
      {
        letter: 'C',
        text: 'guessed',
        explanation: '"Guessed" suggests random speculation without analytical basis, undermining the economist\'s professional expertise and methodology.'
      },
      {
        letter: 'D',
        text: 'hoped',
        explanation: '"Hoped" suggests personal desire rather than analytical projection. Economists make predictions based on data, not express wishes.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Professional contexts require distinguishing prediction from certainty or speculation. "Predicted" indicates analytical forecast, while "guaranteed" overclaims and "guessed" underclaims expertise.'
  },
  {
    position: 39,
    title: 'Sophisticated Context Matching',
    problem_text: 'The novel\'s protagonist <u>struggles</u> with moral ambiguity throughout the narrative.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Struggles" appropriately conveys ongoing difficulty and internal conflict with moral ambiguity, matching the serious literary context.'
      },
      {
        letter: 'B',
        text: 'deals with',
        explanation: '"Deals with" is vague about whether the protagonist finds this easy or difficult. It lacks the specificity of "struggles" in conveying internal conflict.'
      },
      {
        letter: 'C',
        text: 'has problems with',
        explanation: '"Has problems with" is too casual for literary analysis and less precise than "struggles" about the nature of the protagonist\'s engagement with moral ambiguity.'
      },
      {
        letter: 'D',
        text: 'faces',
        explanation: '"Faces" suggests mere encountering rather than the ongoing internal conflict implied by "struggles." It doesn\'t capture the difficulty and emotional depth.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Literary analysis requires precise descriptive verbs. "Struggles" specifically conveys ongoing difficulty and conflict, while alternatives are too casual or less specific.'
  },
  {
    position: 40,
    title: 'Nuanced Intensity',
    problem_text: 'The critic <u>praised</u> the film\'s cinematography as revolutionary.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Praised" appropriately indicates strong approval consistent with calling something "revolutionary," matching the enthusiasm of the evaluation.'
      },
      {
        letter: 'B',
        text: 'mentioned',
        explanation: '"Mentioned" is too neutral and weak for describing an evaluation as "revolutionary." It suggests passing reference rather than enthusiastic approval.'
      },
      {
        letter: 'C',
        text: 'noted',
        explanation: '"Noted" is neutral and clinical, inconsistent with the enthusiasm required to describe cinematography as revolutionary. It suggests mere observation.'
      },
      {
        letter: 'D',
        text: 'commented on',
        explanation: '"Commented on" is too neutral for strong positive evaluation. It doesn\'t convey the approval suggested by "revolutionary."'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Intensity must match context. Calling cinematography "revolutionary" requires the enthusiasm of "praised," not the neutrality of "mentioned," "noted," or "commented on."'
  },
  {
    position: 41,
    title: 'Complex Professional Terminology',
    problem_text: 'The surgeon <u>performed</u> a complex procedure to repair the damaged heart valve.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Performed" is the standard medical term for executing surgical procedures, appropriately formal and precise for medical contexts.'
      },
      {
        letter: 'B',
        text: 'did',
        explanation: '"Did" is too casual and generic for describing surgical procedures. Medical writing requires more precise, professional vocabulary.'
      },
      {
        letter: 'C',
        text: 'carried out',
        explanation: '"Carried out" is acceptable but less precise than "performed" in medical contexts. "Performed" is the conventional term for surgical procedures.'
      },
      {
        letter: 'D',
        text: 'tried',
        explanation: '"Tried" suggests uncertainty or potential failure, undermining professional confidence. Surgeons "perform" procedures; "tried" questions their capability or success.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Medical contexts have standard terminology. Surgeons "perform" procedures using established medical vocabulary, not "do" or "try" them using casual language.'
  },
  {
    position: 43,
    title: 'Advanced Formal Distinction',
    problem_text: 'The researcher <u>obtained</u> permission to access the historical archives.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Obtained" is appropriately formal for academic and professional contexts, precisely indicating the researcher secured official permission.'
      },
      {
        letter: 'B',
        text: 'got',
        explanation: '"Got" is too informal for academic writing about research procedures. Professional contexts require more formal vocabulary like "obtained" or "secured."'
      },
      {
        letter: 'C',
        text: 'picked up',
        explanation: '"Picked up" is highly informal and suggests casual acquisition, inappropriate for describing formal permission processes in research.'
      },
      {
        letter: 'D',
        text: 'grabbed',
        explanation: '"Grabbed" is slang suggesting hasty or aggressive taking, completely inappropriate for describing formal permission processes.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Academic and professional writing requires formal vocabulary. "Obtained" appropriately describes securing official permission, while "got," "picked up," and "grabbed" are too informal.'
  },
  {
    position: 44,
    title: 'Sophisticated Evaluative Language',
    problem_text: 'The speaker\'s presentation was <u>compelling</u> due to its combination of personal narrative and statistical evidence.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Compelling" precisely describes a presentation that effectively persuades or engages through its evidence and narrative, matching the context praising its combination of elements.'
      },
      {
        letter: 'B',
        text: 'interesting',
        explanation: '"Interesting" is too weak for a presentation praised for effectively combining narrative and evidence. It suggests mere engagement, not persuasive power.'
      },
      {
        letter: 'C',
        text: 'fine',
        explanation: '"Fine" suggests mere adequacy, contradicting the praise implied by highlighting the effective combination of narrative and evidence.'
      },
      {
        letter: 'D',
        text: 'cool',
        explanation: '"Cool" is far too informal and vague for evaluating professional presentations. It lacks the specificity and formality required in professional contexts.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Evaluative language must match the sophistication of what\'s being evaluated. "Compelling" specifically describes persuasive power, while alternatives are too weak or informal.'
  },
  {
    position: 46,
    title: 'Complex Contextual Precision',
    problem_text: 'The lawyer\'s argument <u>undermined</u> the prosecution\'s case.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Undermined" precisely describes weakening the foundation or credibility of the prosecution\'s case, appropriate for legal contexts.'
      },
      {
        letter: 'B',
        text: 'hurt',
        explanation: '"Hurt" is too informal and vague for legal writing. It doesn\'t specifically describe the strategic weakening of a legal argument.'
      },
      {
        letter: 'C',
        text: 'damaged',
        explanation: '"Damaged" suggests physical harm or destruction rather than the strategic weakening of logical foundations implied by "undermined" in legal contexts.'
      },
      {
        letter: 'D',
        text: 'attacked',
        explanation: '"Attacked" suggests aggressive confrontation rather than the analytical dismantling of logical foundations that "undermined" conveys in legal argument.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Legal contexts require precise strategic vocabulary. "Undermined" specifically describes weakening logical foundations, more precise than "hurt," "damaged," or "attacked."'
  },
  {
    position: 47,
    title: 'Advanced Register Calibration',
    problem_text: 'The study <u>examined</u> the relationship between social media use and adolescent mental health.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Examined" is the standard academic term for systematic investigation, appropriately formal and precise for scholarly research.'
      },
      {
        letter: 'B',
        text: 'looked at',
        explanation: '"Looked at" is too informal for academic writing. It\'s conversational and lacks the precision expected in scholarly research description.'
      },
      {
        letter: 'C',
        text: 'checked out',
        explanation: '"Checked out" is highly informal, almost slang, completely inappropriate for describing systematic academic research.'
      },
      {
        letter: 'D',
        text: 'investigated',
        explanation: '"Investigated" is acceptable but typically implies searching for wrongdoing or solving mysteries. "Examined" is more neutral and standard for academic research.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Academic research requires standard scholarly vocabulary. "Examined" is the conventional term for systematic study, while "looked at" and "checked out" are too informal.'
  },
  {
    position: 48,
    title: 'Sophisticated Tone Matching',
    problem_text: 'The conservation effort <u>preserved</u> thousands of acres of endangered wetlands.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Preserved" precisely describes protective conservation action preventing harm or destruction, appropriate for formal environmental writing.'
      },
      {
        letter: 'B',
        text: 'saved',
        explanation: '"Saved" is more casual than "preserved" and less precise about the nature of conservation action. "Preserved" better captures systematic protection.'
      },
      {
        letter: 'C',
        text: 'kept',
        explanation: '"Kept" is too casual and vague about the conservation process. It doesn\'t capture the systematic protective measures implied by conservation efforts.'
      },
      {
        letter: 'D',
        text: 'held onto',
        explanation: '"Held onto" is informal and suggests physical grasping rather than the systematic environmental protection that "preserved" conveys.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Environmental and conservation writing requires precise formal vocabulary. "Preserved" specifically describes systematic protection, more precise than casual alternatives.'
  },
  {
    position: 49,
    title: 'Complex Professional Nuance',
    problem_text: 'The editor <u>refined</u> the manuscript before publication.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Refined" precisely describes the editorial process of improving and polishing writing, appropriate for publishing contexts.'
      },
      {
        letter: 'B',
        text: 'fixed up',
        explanation: '"Fixed up" is too informal for publishing contexts and suggests repairs to broken things rather than professional editorial improvement.'
      },
      {
        letter: 'C',
        text: 'changed',
        explanation: '"Changed" is too vague about whether modifications improved the manuscript. "Refined" specifically indicates improvement through expert editorial work.'
      },
      {
        letter: 'D',
        text: 'messed with',
        explanation: '"Messed with" is highly informal and carries negative connotation of interfering or tampering, inappropriate for professional editorial processes.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Publishing contexts require professional terminology. "Refined" precisely describes expert editorial improvement, while alternatives are too informal or vague.'
  },
  {
    position: 50,
    title: 'Advanced Contextual Sophistication',
    problem_text: 'The philosopher\'s treatise <u>elucidates</u> complex ethical questions.',
    choices: [
      {
        letter: 'A',
        text: 'NO CHANGE',
        explanation: '"Elucidates" is sophisticated vocabulary appropriate for philosophical writing, precisely meaning to make clear or explain complex ideas.'
      },
      {
        letter: 'B',
        text: 'explains',
        explanation: '"Explains" is acceptable but less sophisticated than "elucidates" for philosophical contexts. "Elucidates" better matches the formal register of treatises.'
      },
      {
        letter: 'C',
        text: 'talks about',
        explanation: '"Talks about" is far too informal for philosophical treatises. It\'s conversational and lacks the precision required for scholarly philosophical writing.'
      },
      {
        letter: 'D',
        text: 'goes into',
        explanation: '"Goes into" is informal and vague about the nature of the philosophical treatment. It lacks the precision and formality appropriate for philosophical treatises.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Philosophical writing requires sophisticated vocabulary matching its register. "Elucidates" precisely describes clarifying complex ideas, more appropriate than simpler or informal alternatives.'
  }
];

async function main() {
  console.log('Completing WORD-CHOICE lesson (30 questions with specific per-choice explanations)...\n');
  console.log('='.repeat(70) + '\n');

  let added = 0;
  for (const q of questions) {
    if (await addQuestion(q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      added++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\n✅ WORD-CHOICE Complete! Added ${added}/30 questions.`);
  console.log('Each question has specific explanations for all 4 choices.');
}

main();
