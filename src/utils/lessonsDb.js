import { supabase } from '../supabaseClient'

// Fetch all lessons
export const getAllLessons = async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching lessons:', error)
    return null
  }

  return data
}

// Fetch lessons by subject
export const getLessonsBySubject = async (subject) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', subject)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching lessons by subject:', error)
    return null
  }

  return data
}

// Fetch a single lesson by ID
export const getLessonById = async (lessonId) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single()

  if (error) {
    console.error('Error fetching lesson:', error)
    return null
  }

  return data
}

// Fetch a single lesson by lesson_key
export const getLessonByKey = async (lessonKey) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', lessonKey)
    .single()

  if (error) {
    console.error('Error fetching lesson by key:', error)
    return null
  }

  return data
}

// Save user progress
export const saveUserProgress = async (userId, lessonId, completed, scorePercentage, timeSpent) => {
  const { data, error } = await supabase
    .from('user_lesson_progress')
    .upsert([
      {
        user_id: userId,
        lesson_id: lessonId,
        completed: completed,
        score_percentage: scorePercentage,
        time_spent_minutes: timeSpent,
        last_accessed: new Date().toISOString()
      }
    ], { onConflict: 'user_id,lesson_id' })

  if (error) {
    console.error('Error saving user progress:', error)
    return null
  }

  return data
}

// Get user progress for a specific lesson
export const getUserLessonProgress = async (userId, lessonId) => {
  const { data, error } = await supabase
    .from('user_lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single()

  if (error) {
    console.error('Error fetching user progress:', error)
    return null
  }

  return data
}

// Get all user progress
export const getAllUserProgress = async (userId) => {
  const { data, error } = await supabase
    .from('user_lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .order('last_accessed', { ascending: false })

  if (error) {
    console.error('Error fetching all user progress:', error)
    return null
  }

  return data
}
