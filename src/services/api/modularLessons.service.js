/**
 * Modular Lessons Service
 * Works with the new modular lesson structure for easier content management
 * Each method handles a specific part of the lesson, making editing much easier
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const ModularLessonsService = {
  /**
   * LESSON METADATA METHODS
   */

  // Get all lesson metadata (lightweight - no content)
  async getAllLessonMetadata(subject = null) {
    const query = supabase
      .from('lesson_metadata')
      .select('*')
      .order('order_index');

    if (subject) {
      query.eq('subject', subject);
    }

    const { data, error } = await query;

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'getAllLessonMetadata', { subject }, error);
      return null;
    }

    return data;
  },

  // Get single lesson metadata
  async getLessonMetadata(lessonKey) {
    const { data, error } = await supabase
      .from('lesson_metadata')
      .select('*')
      .eq('lesson_key', lessonKey)
      .single();

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'getLessonMetadata', { lessonKey }, error);
      return null;
    }

    return data;
  },

  // Update lesson metadata
  async updateLessonMetadata(lessonId, updates) {
    const { data, error } = await supabase
      .from('lesson_metadata')
      .update(updates)
      .eq('id', lessonId)
      .select()
      .single();

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'updateLessonMetadata', { lessonId }, error);
      return null;
    }

    logger.info('ModularLessonsService', 'Lesson metadata updated', { lessonId });
    return data;
  },

  /**
   * SECTION METHODS
   */

  // Get all sections for a lesson
  async getLessonSections(lessonId) {
    const { data, error } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('order_index');

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'getLessonSections', { lessonId }, error);
      return null;
    }

    return data;
  },

  // Add a new section to a lesson
  async addSection(lessonId, section) {
    const { data, error } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        ...section
      })
      .select()
      .single();

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'addSection', { lessonId }, error);
      return null;
    }

    logger.info('ModularLessonsService', 'Section added', { lessonId, sectionKey: section.section_key });
    return data;
  },

  // Update a section
  async updateSection(sectionId, updates) {
    const { data, error } = await supabase
      .from('lesson_sections')
      .update(updates)
      .eq('id', sectionId)
      .select()
      .single();

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'updateSection', { sectionId }, error);
      return null;
    }

    return data;
  },

  // Delete a section
  async deleteSection(sectionId) {
    const { error } = await supabase
      .from('lesson_sections')
      .delete()
      .eq('id', sectionId);

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'deleteSection', { sectionId }, error);
      return false;
    }

    logger.info('ModularLessonsService', 'Section deleted', { sectionId });
    return true;
  },

  /**
   * CONTENT METHODS
   */

  // Get content for a section
  async getSectionContent(sectionId) {
    const { data, error } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', sectionId)
      .order('order_index');

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'getSectionContent', { sectionId }, error);
      return null;
    }

    return data;
  },

  // Update specific content block
  async updateContent(contentId, newContent) {
    const { data, error } = await supabase
      .from('section_content')
      .update({ content: newContent })
      .eq('id', contentId)
      .select()
      .single();

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'updateContent', { contentId }, error);
      return null;
    }

    logger.info('ModularLessonsService', 'Content updated', { contentId });
    return data;
  },

  // Add content to a section
  async addContent(sectionId, content, contentType = 'html') {
    const { data, error } = await supabase
      .from('section_content')
      .insert({
        section_id: sectionId,
        content_type: contentType,
        content: content,
        order_index: 0
      })
      .select()
      .single();

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'addContent', { sectionId }, error);
      return null;
    }

    return data;
  },

  /**
   * EXAMPLES METHODS
   */

  // Get all examples for a lesson
  async getLessonExamples(lessonId) {
    const { data, error } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('order_index');

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'getLessonExamples', { lessonId }, error);
      return null;
    }

    return data;
  },

  // Add an example
  async addExample(lessonId, example) {
    const { data, error } = await supabase
      .from('lesson_examples')
      .insert({
        lesson_id: lessonId,
        ...example
      })
      .select()
      .single();

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'addExample', { lessonId }, error);
      return null;
    }

    logger.info('ModularLessonsService', 'Example added', { lessonId });
    return data;
  },

  // Update an example
  async updateExample(exampleId, updates) {
    const { data, error } = await supabase
      .from('lesson_examples')
      .update(updates)
      .eq('id', exampleId)
      .select()
      .single();

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'updateExample', { exampleId }, error);
      return null;
    }

    return data;
  },

  /**
   * KEY CONCEPTS METHODS
   */

  // Get concepts for a lesson
  async getLessonConcepts(lessonId) {
    const { data, error } = await supabase
      .from('lesson_concepts')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('order_index');

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'getLessonConcepts', { lessonId }, error);
      return null;
    }

    return data;
  },

  // Update a concept
  async updateConcept(conceptId, updates) {
    const { data, error } = await supabase
      .from('lesson_concepts')
      .update(updates)
      .eq('id', conceptId)
      .select()
      .single();

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'updateConcept', { conceptId }, error);
      return null;
    }

    return data;
  },

  /**
   * TIPS METHODS
   */

  // Get tips for a lesson
  async getLessonTips(lessonId) {
    const { data, error } = await supabase
      .from('lesson_tips')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('order_index');

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'getLessonTips', { lessonId }, error);
      return null;
    }

    return data;
  },

  // Add a tip
  async addTip(lessonId, tipType, tipText) {
    const { data, error } = await supabase
      .from('lesson_tips')
      .insert({
        lesson_id: lessonId,
        tip_type: tipType,
        tip_text: tipText
      })
      .select()
      .single();

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'addTip', { lessonId }, error);
      return null;
    }

    return data;
  },

  /**
   * COMPOSITE METHODS
   */

  // Get complete lesson with all parts
  async getCompleteLessson(lessonKey) {
    logger.debug('ModularLessonsService', 'getCompleteLesson', { lessonKey });

    // Get metadata first
    const metadata = await this.getLessonMetadata(lessonKey);
    if (!metadata) return null;

    const lessonId = metadata.id;

    // Fetch all parts in parallel for performance
    const [sections, examples, concepts, tips, objectives, resources] = await Promise.all([
      this.getLessonSections(lessonId),
      this.getLessonExamples(lessonId),
      this.getLessonConcepts(lessonId),
      this.getLessonTips(lessonId),
      this.getLessonObjectives(lessonId),
      this.getLessonResources(lessonId)
    ]);

    // For each section, get its content
    const sectionsWithContent = sections ? await Promise.all(
      sections.map(async (section) => {
        const content = await this.getSectionContent(section.id);
        return { ...section, content };
      })
    ) : [];

    return {
      metadata,
      sections: sectionsWithContent,
      examples,
      concepts,
      tips,
      objectives,
      resources
    };
  },

  // Get lesson objectives
  async getLessonObjectives(lessonId) {
    const { data, error } = await supabase
      .from('lesson_objectives')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('order_index');

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'getLessonObjectives', { lessonId }, error);
      return null;
    }

    return data;
  },

  // Get lesson resources
  async getLessonResources(lessonId) {
    const { data, error } = await supabase
      .from('lesson_resources')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('order_index');

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'getLessonResources', { lessonId }, error);
      return null;
    }

    return data;
  },

  // Search across all lesson content
  async searchLessons(searchTerm) {
    const { data, error } = await supabase.rpc('search_lessons', {
      search_term: searchTerm
    });

    if (error) {
      errorTracker.trackError('ModularLessonsService', 'searchLessons', { searchTerm }, error);
      return null;
    }

    return data;
  }
};

export default ModularLessonsService;