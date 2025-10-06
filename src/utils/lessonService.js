import { supabase } from '../supabaseClient';

/**
 * Fetch all lessons for a specific subject
 * @param {string} subject - 'math', 'english', 'reading', or 'science'
 * @returns {Promise<Object>} - Lessons object with lesson_key as keys
 */
export async function fetchLessonsBySubject(subject) {
    try {
        const { data, error } = await supabase
            .from('lessons')
            .select('*')
            .eq('subject', subject)
            .order('order_index', { ascending: true });

        if (error) throw error;

        // Convert array to object format matching the original structure
        const lessonsObject = {};
        data.forEach(lesson => {
            lessonsObject[lesson.lesson_key] = {
                title: lesson.title,
                content: lesson.content
            };
        });

        return lessonsObject;
    } catch (error) {
        console.error(`Error fetching ${subject} lessons:`, error);
        throw error;
    }
}

/**
 * Fetch a single lesson by subject and key
 * @param {string} subject - 'math', 'english', 'reading', or 'science'
 * @param {string} lessonKey - The lesson key
 * @returns {Promise<Object>} - Lesson object with title and content
 */
export async function fetchLesson(subject, lessonKey) {
    try {
        const { data, error } = await supabase
            .from('lessons')
            .select('*')
            .eq('subject', subject)
            .eq('lesson_key', lessonKey)
            .single();

        if (error) throw error;

        return {
            title: data.title,
            content: data.content
        };
    } catch (error) {
        console.error(`Error fetching lesson ${subject}/${lessonKey}:`, error);
        throw error;
    }
}

/**
 * Fetch all lessons from all subjects
 * @returns {Promise<Object>} - All lessons organized by subject
 */
export async function fetchAllLessons() {
    try {
        const { data, error } = await supabase
            .from('lessons')
            .select('*')
            .order('subject', { ascending: true })
            .order('order_index', { ascending: true });

        if (error) throw error;

        // Organize by subject
        const lessonsBySubject = {
            math: {},
            english: {},
            reading: {},
            science: {}
        };

        data.forEach(lesson => {
            if (lessonsBySubject[lesson.subject]) {
                lessonsBySubject[lesson.subject][lesson.lesson_key] = {
                    title: lesson.title,
                    content: lesson.content
                };
            }
        });

        return lessonsBySubject;
    } catch (error) {
        console.error('Error fetching all lessons:', error);
        throw error;
    }
}

/**
 * Get lesson list (titles and keys) for navigation
 * @param {string} subject - 'math', 'english', 'reading', or 'science'
 * @returns {Promise<Array>} - Array of lesson metadata
 */
export async function fetchLessonList(subject) {
    try {
        const { data, error } = await supabase
            .from('lessons')
            .select('lesson_key, title, order_index')
            .eq('subject', subject)
            .order('order_index', { ascending: true });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error(`Error fetching ${subject} lesson list:`, error);
        throw error;
    }
}
