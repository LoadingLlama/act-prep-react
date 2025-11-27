// TRANSITIONS, WHICH-CHOICE, and WORD-CHOICE questions

const remainingQuestions = {
  // TRANSITIONS: Need 13 questions (positions 38-50)
  'transitions': [
    {
      position: 38,
      title: 'Addition vs. Contrast',
      problem_text: 'The medication significantly reduced blood pressure in clinical trials. <u>However,</u> it also improved cholesterol levels.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Additionally,' },
        { letter: 'C', text: 'Nevertheless,' },
        { letter: 'D', text: 'Conversely,' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'However' signals contrast, implying improved cholesterol opposes reduced blood pressure. Both are positive medication effects being listed together, not contrasted—this needs an addition transition.",
        B: "'Additionally' correctly signals that improved cholesterol is a second benefit being added to the first (blood pressure)—both are positive effects, making addition the proper relationship.",
        C: "'Nevertheless' signals concession (despite X, Y happened), but improved cholesterol isn't happening despite reduced blood pressure—they're both intended benefits occurring together.",
        D: "'Conversely' signals opposite directions or outcomes, but blood pressure reduction and cholesterol improvement aren't opposites—they're parallel positive results."
      }
    },
    {
      position: 39,
      title: 'Cause-Effect Signal',
      problem_text: 'The region experienced three years of severe drought. <u>For example,</u> agricultural production declined by forty percent.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'As a result,' },
        { letter: 'C', text: 'Similarly,' },
        { letter: 'D', text: 'Meanwhile,' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'For example' signals illustration, but agricultural decline isn't an example of drought—it's a consequence. The drought caused the production decline, requiring a cause-effect transition.",
        B: "'As a result' correctly signals causation—the agricultural decline is a direct consequence of the three-year drought, showing cause (drought) leading to effect (production decline).",
        C: "'Similarly' signals likeness, implying agricultural decline is like the drought. The decline is caused by the drought, not similar to it—this needs causation, not comparison.",
        D: "'Meanwhile' signals simultaneous occurrence, suggesting production decline happened at the same time as drought coincidentally. The decline was caused by the drought, requiring causation not simultaneity."
      }
    },
    {
      position: 40,
      title: 'Example/Illustration',
      problem_text: 'Ancient civilizations developed sophisticated astronomical knowledge. <u>In contrast,</u> the Mayans created accurate calendars predicting celestial events centuries in advance.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'For instance,' },
        { letter: 'C', text: 'On the other hand,' },
        { letter: 'D', text: 'Therefore,' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'In contrast' signals opposition, implying Mayan calendars oppose or differ from sophisticated astronomy. Mayans' calendars are an example of sophisticated astronomy, not a contrast—this needs illustration.",
        B: "'For instance' correctly signals that Mayan calendars exemplify the sophisticated astronomical knowledge mentioned—the specific example illustrates the general claim about ancient civilizations.",
        C: "'On the other hand' signals contrast between alternatives, but Mayans aren't an alternative to ancient civilizations—they are one of the ancient civilizations being discussed.",
        D: "'Therefore' signals conclusion or result, implying Mayan calendars are a logical consequence of ancient astronomy. They're an example of it, not a result of it."
      }
    },
    {
      position: 41,
      title: 'Sequential Relationship',
      problem_text: 'The chef prepared the ingredients carefully. <u>Moreover,</u> she combined them in the mixing bowl.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Next,' },
        { letter: 'C', text: 'However,' },
        { letter: 'D', text: 'In other words,' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'Moreover' signals addition of another related point, but combining ingredients isn't an additional point—it's the next step in a sequential cooking process requiring temporal ordering.",
        B: "'Next' correctly signals temporal sequence in the cooking process—after preparing ingredients (step 1), she then combined them (step 2). This is chronological ordering, not addition.",
        C: "'However' signals contrast, implying combining ingredients opposes preparing them. These are sequential steps in cooking, not contrasting actions.",
        D: "'In other words' signals restatement, implying combining ingredients rephrases preparing them. These are distinct sequential actions, not different phrasings of the same action."
      }
    },
    {
      position: 42,
      title: 'Emphasis/Intensification',
      problem_text: 'The storm caused significant property damage. <u>For example,</u> it destroyed the town\'s historic courthouse completely.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Indeed,' },
        { letter: 'C', text: 'Likewise,' },
        { letter: 'D', text: 'Alternatively,' }
      ],
      correct_answer: 'A',
      explanations: {
        A: "'For example' works well here—destroying the courthouse completely is a specific example that illustrates the general statement about significant property damage. This exemplification transition is appropriate.",
        B: "'Indeed' signals emphasis or confirmation, which could work, but 'for example' is more precise since the courthouse destruction specifically illustrates the type of damage, not just emphasizes it.",
        C: "'Likewise' signals similarity between parallel items, but there's only one damage example given—'likewise' requires a previous example to which this one is similar.",
        D: "'Alternatively' signals a different option or choice, implying courthouse destruction is an alternative to property damage. It's a specific instance of damage, not an alternative to it."
      }
    },
    {
      position: 43,
      title: 'Concession/Qualification',
      problem_text: 'The company increased profits this quarter. <u>Therefore,</u> it faces several legal challenges that could affect future earnings.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'However,' },
        { letter: 'C', text: 'Consequently,' },
        { letter: 'D', text: 'Similarly,' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'Therefore' signals that legal challenges are a result of increased profits. The challenges aren't caused by profits—they're a contrasting concern despite the profits, requiring contrast transition.",
        B: "'However' correctly signals contrast—while profits increased (positive), legal challenges exist (negative concern). This introduces qualifying information that contrasts with the positive financial news.",
        C: "'Consequently' signals cause-effect like 'therefore,' implying legal challenges result from profits. The challenges are independent problems, not consequences of profitability.",
        D: "'Similarly' signals likeness, implying legal challenges are like increased profits. One is success, the other is a problem—they're contrasts, not similar situations."
      }
    },
    {
      position: 44,
      title: 'Restatement/Clarification',
      problem_text: 'The data revealed unexpected patterns. <u>In contrast,</u> the findings suggested a previously unknown relationship between the variables.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Specifically,' },
        { letter: 'C', text: 'Nevertheless,' },
        { letter: 'D', text: 'Subsequently,' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'In contrast' signals opposition, implying the previously unknown relationship opposes unexpected patterns. The relationship is what made the patterns unexpected—they're the same finding restated more specifically, not contrasts.",
        B: "'Specifically' correctly signals that the second sentence clarifies or elaborates on the first—the unknown relationship explains what made the patterns unexpected, providing specific detail about general findings.",
        C: "'Nevertheless' signals concession, implying the relationship finding occurred despite unexpected patterns. They're describing the same discovery from different angles, not concessive points.",
        D: "'Subsequently' signals time sequence, implying the relationship finding came after discovering patterns. They're describing the same simultaneous discovery, not sequential events."
      }
    },
    {
      position: 45,
      title: 'Comparison/Analogy',
      problem_text: 'Ancient Roman aqueducts transported water across vast distances using gravity. <u>For instance,</u> modern pipeline systems rely on pumps to move liquids over long ranges.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Similarly,' },
        { letter: 'C', text: 'Therefore,' },
        { letter: 'D', text: 'Instead,' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'For instance' signals modern pipelines exemplify Roman aqueducts. Pipelines are a different technology being compared to aqueducts, not an example of them—this needs comparison, not exemplification.",
        B: "'Similarly' correctly signals comparison between parallel systems—both ancient aqueducts and modern pipelines solve the problem of long-distance liquid transport, showing similarity in function despite different methods.",
        C: "'Therefore' signals causation, implying modern pipelines result from Roman aqueducts. This is a comparison of parallel technologies, not a cause-effect relationship.",
        D: "'Instead' signals replacement, which captures the difference in method (gravity vs. pumps) but misses the similarity in purpose (long-distance transport) that 'similarly' better conveys."
      }
    },
    {
      position: 46,
      title: 'Contrast Within Similarity',
      problem_text: 'Both novels explore themes of identity and belonging. <u>For example,</u> the first focuses on individual psychology while the second examines community dynamics.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'However,' },
        { letter: 'C', text: 'Likewise,' },
        { letter: 'D', text: 'Accordingly,' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'For example' signals the differing approaches exemplify exploring identity/belonging. The sentence contrasts how they explore these themes, not providing examples—this needs contrast transition.",
        B: "'However' correctly signals contrast in approach despite similarity in themes—both explore identity and belonging (similarity), but use different focuses: individual vs. community (contrast within similarity).",
        C: "'Likewise' signals similarity, but the sentence emphasizes difference in approach (psychology vs. community)—while themes are similar, the sentence's focus is on contrasting methods.",
        D: "'Accordingly' signals logical consequence, implying the different approaches result from exploring themes. The approaches are contrasting choices, not consequences of the shared themes."
      }
    },
    {
      position: 47,
      title: 'Temporal Overlap',
      problem_text: 'The excavation uncovered pottery fragments from the third century. <u>Then,</u> archaeologists found coins from the same period nearby.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Meanwhile,' },
        { letter: 'C', text: 'Additionally,' },
        { letter: 'D', text: 'Thus,' }
      ],
      correct_answer: 'C',
      explanations: {
        A: "'Then' suggests sequential discovery (pottery first, coins later) when the sentence emphasizes both being from the same period—'additionally' better captures accumulating evidence than temporal sequence.",
        B: "'Meanwhile' suggests simultaneous discovery, which could work but emphasizes timing more than the accumulation of similar-period artifacts—'additionally' better captures adding evidence of the period.",
        C: "'Additionally' correctly signals accumulation of archaeological evidence from the same period—coins are additional finds supporting the third-century timeframe, emphasizing the building collection of contemporary artifacts.",
        D: "'Thus' signals causation or conclusion, implying coins were found because pottery was found. Finding coins is additional evidence of the period, not a result of finding pottery."
      }
    },
    {
      position: 48,
      title: 'Synthesis/Summary',
      problem_text: 'The study examined diet, exercise, and sleep patterns. Participants who maintained healthy habits in all three areas showed measurable benefits. <u>Specifically,</u> these factors work together to support overall health.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'In summary,' },
        { letter: 'C', text: 'For instance,' },
        { letter: 'D', text: 'On the contrary,' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'Specifically' signals elaboration with detail, but the sentence synthesizes the overall finding rather than providing specific details—this is a general conclusion, not specific elaboration.",
        B: "'In summary' correctly signals synthesis of the findings—after discussing individual factors and their combined benefits, this sentence summarizes the key takeaway about their integrated effect.",
        C: "'For instance' signals an example will follow, but the sentence provides a concluding interpretation of what all the data means together, not an example of one of the factors.",
        D: "'On the contrary' signals contradiction, implying the integrative effect opposes the previous discussion. The sentence synthesizes what was discussed, not contradicts it."
      }
    },
    {
      position: 49,
      title: 'Alternative Perspective',
      problem_text: 'Some historians argue the treaty caused the subsequent conflict. <u>Similarly,</u> others contend that internal political instability was the primary factor.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Conversely,' },
        { letter: 'C', text: 'Furthermore,' },
        { letter: 'D', text: 'Hence,' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'Similarly' signals agreement between views, but one attributes cause to the treaty while the other to internal politics—these are competing explanations, not similar arguments.",
        B: "'Conversely' correctly signals contrasting alternative explanations—one view blames external factors (treaty), the other internal factors (political instability), presenting opposite interpretations of causation.",
        C: "'Furthermore' signals addition to support the same argument, but the second view contradicts the first by offering a different cause—these are alternatives, not additive support.",
        D: "'Hence' signals causation or conclusion, implying the internal instability view results from the treaty view. These are competing scholarly arguments, not cause and effect."
      }
    },
    {
      position: 50,
      title: 'Ultimate Transition Sophistication',
      problem_text: 'The experiment\'s initial results suggested a simple linear relationship. Subsequent analysis revealed multiple variables interacting in complex ways. <u>For example,</u> the phenomenon requires multi-dimensional modeling rather than simple correlation.\n\nWhich transition word is the most logical in context?',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Consequently,' },
        { letter: 'C', text: 'Nevertheless,' },
        { letter: 'D', text: 'Likewise,' }
      ],
      correct_answer: 'B',
      explanations: {
        A: "'For example' signals the modeling requirement exemplifies complex interactions. The modeling need is a conclusion resulting from discovering complexity, not an example of it—this needs causation.",
        B: "'Consequently' correctly signals that the modeling requirement is a logical result of discovering complex interactions—the complexity (cause) necessitates sophisticated modeling (effect), showing causation from evidence to methodological implication.",
        C: "'Nevertheless' signals concession, implying multi-dimensional modeling is needed despite complex interactions. The complexity is precisely why sophisticated modeling is required, making this supportive not concessive.",
        D: "'Likewise' signals similarity between parallel items, but there's only one finding (complexity) and its implication (modeling need)—'likewise' requires multiple similar items being compared."
      }
    }
  ]
};

module.exports = remainingQuestions;
