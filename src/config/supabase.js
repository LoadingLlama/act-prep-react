import { createClient } from '@supabase/supabase-js';

// Get these values from your Supabase project settings
// Go to: Settings > API
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.log('Please add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to your .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to fetch all lessons
export const fetchLessons = async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching lessons:', error);
    return null;
  }

  // Convert array back to object format (for backward compatibility)
  const lessonsObject = {};
  data.forEach(lesson => {
    lessonsObject[lesson.lesson_key] = {
      title: lesson.title,
      duration: lesson.duration,
      content: lesson.content,
      category: lesson.category
    };
  });

  return lessonsObject;
};

// Helper function to fetch a single lesson by key
export const fetchLesson = async (lessonKey) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', lessonKey)
    .single();

  if (error) {
    console.error('Error fetching lesson:', error);
    return null;
  }

  return {
    title: data.title,
    duration: data.duration,
    content: data.content,
    category: data.category
  };
};

// Helper function to save user progress
export const saveProgress = async (userId, lessonId, completed, quizScores) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      completed: completed,
      quiz_scores: quizScores,
      last_accessed: new Date().toISOString()
    }, {
      onConflict: 'user_id,lesson_id'
    });

  if (error) {
    console.error('Error saving progress:', error);
    return null;
  }

  return data;
};

// Helper function to get user progress
export const getUserProgress = async (userId) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*, lessons(*)')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user progress:', error);
    return null;
  }

  return data;
};
