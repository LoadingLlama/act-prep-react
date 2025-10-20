import { supabase } from './supabase.service';

class TermDefinitionsService {
  /**
   * Get all term definitions for a specific lesson
   * @param {string} lessonKey - The lesson key (e.g., 'geometry-angles')
   * @returns {Promise<Object>} Object with term names as keys and definition data as values
   */
  static async getDefinitionsByLesson(lessonKey) {
    try {
      const { data, error } = await supabase
        .from('term_definitions')
        .select('*')
        .eq('lesson_key', lessonKey);

      if (error) {
        console.error('Error fetching term definitions:', error);
        return {};
      }

      // Convert array to object with term names as keys
      const definitionsMap = {};
      data.forEach(item => {
        definitionsMap[item.term] = {
          definition: item.definition,
          context: item.context,
          related: item.related_terms || []
        };
      });

      return definitionsMap;
    } catch (error) {
      console.error('Error in getDefinitionsByLesson:', error);
      return {};
    }
  }

  /**
   * Get all term definitions (for all lessons)
   * @returns {Promise<Object>} Object with term names as keys and definition data as values
   */
  static async getAllDefinitions() {
    try {
      const { data, error } = await supabase
        .from('term_definitions')
        .select('*');

      if (error) {
        console.error('Error fetching all term definitions:', error);
        return {};
      }

      // Convert array to object with term names as keys
      const definitionsMap = {};
      data.forEach(item => {
        definitionsMap[item.term] = {
          definition: item.definition,
          context: item.context,
          related: item.related_terms || []
        };
      });

      return definitionsMap;
    } catch (error) {
      console.error('Error in getAllDefinitions:', error);
      return {};
    }
  }

  /**
   * Get a specific term definition
   * @param {string} term - The term to look up
   * @returns {Promise<Object|null>} Definition data or null if not found
   */
  static async getDefinition(term) {
    try {
      const { data, error } = await supabase
        .from('term_definitions')
        .select('*')
        .eq('term', term)
        .single();

      if (error) {
        console.error(`Error fetching definition for "${term}":`, error);
        return null;
      }

      return {
        definition: data.definition,
        context: data.context,
        related: data.related_terms || []
      };
    } catch (error) {
      console.error(`Error in getDefinition for "${term}":`, error);
      return null;
    }
  }
}

export default TermDefinitionsService;
