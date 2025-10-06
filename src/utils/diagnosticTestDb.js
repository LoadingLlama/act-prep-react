import { supabase } from '../supabaseClient'

// Fetch all diagnostic test questions
export const getDiagnosticQuestions = async (section = null) => {
  let query = supabase
    .from('diagnostic_test_questions')
    .select('*')
    .order('lesson_id', { ascending: true })
    .order('question_id', { ascending: true })

  if (section) {
    query = query.eq('section', section)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching diagnostic questions:', error)
    return null
  }

  return data
}

// Fetch questions for a specific lesson
export const getDiagnosticQuestionsByLesson = async (lessonId) => {
  const { data, error } = await supabase
    .from('diagnostic_test_questions')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('question_id', { ascending: true })

  if (error) {
    console.error('Error fetching lesson questions:', error)
    return null
  }

  return data
}

// Save user's answer to a diagnostic question
export const saveDiagnosticAnswer = async (userId, questionId, userAnswer, isCorrect, timeSpent) => {
  const { data, error } = await supabase
    .from('diagnostic_test_results')
    .insert([
      {
        user_id: userId,
        question_id: questionId,
        user_answer: userAnswer,
        is_correct: isCorrect,
        time_spent_seconds: timeSpent
      }
    ])

  if (error) {
    console.error('Error saving diagnostic answer:', error)
    return null
  }

  return data
}

// Create a new diagnostic test session
export const createDiagnosticSession = async (userId, section, totalQuestions) => {
  const { data, error } = await supabase
    .from('diagnostic_test_sessions')
    .insert([
      {
        user_id: userId,
        section: section,
        total_questions: totalQuestions
      }
    ])
    .select()

  if (error) {
    console.error('Error creating diagnostic session:', error)
    return null
  }

  return data[0]
}

// Complete a diagnostic test session
export const completeDiagnosticSession = async (sessionId, correctAnswers, scorePercentage) => {
  const { data, error } = await supabase
    .from('diagnostic_test_sessions')
    .update({
      session_end: new Date().toISOString(),
      correct_answers: correctAnswers,
      score_percentage: scorePercentage,
      completed: true
    })
    .eq('id', sessionId)

  if (error) {
    console.error('Error completing diagnostic session:', error)
    return null
  }

  return data
}

// Get user's diagnostic test history
export const getUserDiagnosticHistory = async (userId) => {
  const { data, error } = await supabase
    .from('diagnostic_test_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('session_start', { ascending: false })

  if (error) {
    console.error('Error fetching diagnostic history:', error)
    return null
  }

  return data
}

// Get user's performance by section
export const getUserPerformanceBySection = async (userId) => {
  const { data, error } = await supabase
    .from('diagnostic_test_sessions')
    .select('section, score_percentage, correct_answers, total_questions')
    .eq('user_id', userId)
    .eq('completed', true)
    .order('session_start', { ascending: false })

  if (error) {
    console.error('Error fetching performance by section:', error)
    return null
  }

  // Group by section and get the latest score for each
  const sectionPerformance = {}
  data.forEach(session => {
    if (!sectionPerformance[session.section]) {
      sectionPerformance[session.section] = session
    }
  })

  return sectionPerformance
}

// Bulk insert diagnostic questions (for migration from existing data)
export const bulkInsertDiagnosticQuestions = async (questions) => {
  const { data, error } = await supabase
    .from('diagnostic_test_questions')
    .insert(questions)

  if (error) {
    console.error('Error bulk inserting questions:', error)
    return null
  }

  return data
}
