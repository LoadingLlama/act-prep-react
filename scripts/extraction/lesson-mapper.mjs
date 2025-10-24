/**
 * Lesson Mapping System
 * Maps ACT question types to lesson_keys with 100% accuracy
 */

export const QUESTION_TYPE_TO_LESSON = {
  // Grammar & Usage (Conventions of Standard English)
  'comma-splice': 'sentence-structure',
  'run-on': 'sentence-structure',
  'fragment': 'sentence-structure',
  'comma-usage': 'commas',
  'comma-unnecessary': 'commas',
  'comma-list': 'commas',
  'comma-introductory': 'commas',
  'comma-nonessential': 'commas',
  'semicolon': 'punctuation',
  'colon': 'punctuation',
  'dash': 'punctuation',
  'apostrophe': 'punctuation',
  'verb-tense': 'verbs',
  'verb-agreement': 'verbs',
  'verb-form': 'verbs',
  'pronoun-case': 'pronouns',
  'pronoun-agreement': 'pronouns',
  'pronoun-ambiguous': 'pronouns',
  'pronoun-possessive': 'pronouns',
  'modifier-misplaced': 'modifiers',
  'modifier-dangling': 'modifiers',
  'parallel-structure': 'parallel-structure',
  'comparison': 'misc-topics',
  'idiom': 'misc-topics',
  'adjective-adverb': 'misc-topics',

  // Knowledge of Language
  'redundancy': 'redundancy',
  'wordiness': 'redundancy',
  'word-choice': 'word-choice',
  'tone': 'word-choice',
  'style': 'word-choice',
  'transition': 'transitions',
  'transition-word': 'transitions',
  'transition-sentence': 'transitions',

  // Production of Writing
  'which-choice': 'which-choice',
  'adding-sentence': 'adding-deleting',
  'deleting-sentence': 'adding-deleting',
  'adding-info': 'adding-deleting',
  'deleting-info': 'adding-deleting',
  'sentence-placement': 'logical-placement',
  'paragraph-placement': 'logical-placement',
  'logical-order': 'logical-placement',
  'main-idea': 'which-choice',
  'purpose': 'which-choice'
};

/**
 * Get lesson_key from question type
 */
export function getLessonKey(questionType) {
  return QUESTION_TYPE_TO_LESSON[questionType] || null;
}

/**
 * Get lesson ID from lesson_key (requires database query)
 */
export async function getLessonId(supabase, lessonKey) {
  const { data, error } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', lessonKey)
    .eq('subject', 'english')
    .single();

  if (error) {
    console.error(`Error finding lesson for key "${lessonKey}":`, error.message);
    return null;
  }

  return data?.id || null;
}

/**
 * Categorize question based on analysis
 * Returns: { questionType, lessonKey, category }
 */
export function categorizeQuestion(questionNumber, underlinedText, choices, notes) {
  const analysis = {
    questionNumber,
    questionType: null,
    lessonKey: null,
    category: null // CSE, KLA, or POW
  };

  // Analyze based on notes or patterns
  const notesLower = (notes || '').toLowerCase();

  // Sentence Structure Issues
  if (notesLower.includes('comma splice') || notesLower.includes('run-on')) {
    analysis.questionType = 'comma-splice';
    analysis.category = 'CSE';
  } else if (notesLower.includes('fragment')) {
    analysis.questionType = 'fragment';
    analysis.category = 'CSE';
  }

  // Comma Usage
  else if (notesLower.includes('comma') && !notesLower.includes('splice')) {
    analysis.questionType = 'comma-usage';
    analysis.category = 'CSE';
  }

  // Punctuation
  else if (notesLower.includes('dash') || notesLower.includes('—')) {
    analysis.questionType = 'dash';
    analysis.category = 'CSE';
  } else if (notesLower.includes('colon') || notesLower.includes(':')) {
    analysis.questionType = 'colon';
    analysis.category = 'CSE';
  } else if (notesLower.includes('semicolon')) {
    analysis.questionType = 'semicolon';
    analysis.category = 'CSE';
  }

  // Verbs
  else if (notesLower.includes('verb') || notesLower.includes('agreement') ||
           notesLower.includes('tense')) {
    if (notesLower.includes('agreement')) {
      analysis.questionType = 'verb-agreement';
    } else if (notesLower.includes('tense')) {
      analysis.questionType = 'verb-tense';
    } else {
      analysis.questionType = 'verb-form';
    }
    analysis.category = 'CSE';
  }

  // Pronouns
  else if (notesLower.includes('pronoun')) {
    if (notesLower.includes('case')) {
      analysis.questionType = 'pronoun-case';
    } else if (notesLower.includes('agreement')) {
      analysis.questionType = 'pronoun-agreement';
    } else if (notesLower.includes('ambiguous')) {
      analysis.questionType = 'pronoun-ambiguous';
    } else {
      analysis.questionType = 'pronoun-agreement';
    }
    analysis.category = 'CSE';
  }

  // Word Choice
  else if (notesLower.includes('word choice') || notesLower.includes('tone')) {
    analysis.questionType = 'word-choice';
    analysis.category = 'KLA';
  }

  // Transitions
  else if (notesLower.includes('transition')) {
    analysis.questionType = 'transition';
    analysis.category = 'KLA';
  }

  // Adding/Deleting
  else if (notesLower.includes('delet') || notesLower.includes('add')) {
    if (notesLower.includes('sentence')) {
      analysis.questionType = 'deleting-sentence';
    } else {
      analysis.questionType = 'deleting-info';
    }
    analysis.category = 'POW';
  }

  // Placement
  else if (notesLower.includes('placement') || notesLower.includes('where')) {
    analysis.questionType = 'sentence-placement';
    analysis.category = 'POW';
  }

  // Which Choice Questions
  else if (notesLower.includes('which choice') || notesLower.includes('best conveys')) {
    analysis.questionType = 'which-choice';
    analysis.category = 'POW';
  }

  // Get lesson key from question type
  analysis.lessonKey = getLessonKey(analysis.questionType);

  return analysis;
}
