/**
 * Lesson Editor Component
 * DEPRECATED: This component used the old modular lesson structure
 * TODO: Rebuild this to work with the simplified lessons table
 */

import React from 'react';

// import ModularLessonsService from '../../services/api/modularLessons.service'; // REMOVED - using simplified structure
// import { editorStyles } from '../../styles/admin/lessonEditor.styles';

const LessonEditor = ({ lessonKey }) => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Lesson Editor</h2>
      <div style={{
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '8px',
        padding: '1.5rem',
        marginTop: '1rem'
      }}>
        <h3 style={{ marginTop: 0, color: '#856404' }}>⚠️ Component Deprecated</h3>
        <p style={{ color: '#856404', lineHeight: 1.6 }}>
          This lesson editor component has been deprecated as part of the database restructuring.
          The lesson system now uses a simplified single-table structure.
        </p>
        <p style={{ color: '#856404', marginBottom: 0 }}>
          To edit lessons, please use the Supabase dashboard directly or we can rebuild this editor
          to work with the new simplified structure.
        </p>
      </div>
    </div>
  );

  // DEPRECATED CODE - kept for reference
  /*
  const [lesson, setLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('metadata');
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadLesson = async () => {
    // Load from lessons table instead
  };

  const saveMetadata = async (updates) => {
    // Save to lessons table instead
  };

  const saveSectionContent = async (contentId, newContent) => {
    // No longer using modular sections
      await loadLesson();
    }
    setSaving(false);
    setEditingItem(null);
  };

  // Add new section
  const addSection = async () => {
    const newSection = {
      section_key: `section-${Date.now()}`,
      title: 'New Section',
      section_type: 'concept',
      order_index: lesson.sections.length
    };

    setSaving(true);
    const result = await ModularLessonsService.addSection(lesson.metadata.id, newSection);
    if (result) {
      setMessage('✓ Section added');
      await loadLesson();
    }
    setSaving(false);
  };

  // Add new example
  const addExample = async () => {
    const newExample = {
      problem_text: 'New problem text...',
      solution_text: 'Solution...',
      explanation: 'Explanation...',
      difficulty: 1,
      order_index: lesson.examples?.length || 0
    };

    setSaving(true);
    const result = await ModularLessonsService.addExample(lesson.metadata.id, newExample);
    if (result) {
      setMessage('✓ Example added');
      await loadLesson();
    }
    setSaving(false);
  };

  // Add new tip
  const addTip = async () => {
    setSaving(true);
    const result = await ModularLessonsService.addTip(
      lesson.metadata.id,
      'hint',
      'New tip text...'
    );
    if (result) {
      setMessage('✓ Tip added');
      await loadLesson();
    }
    setSaving(false);
  };

  if (loading) return <div style={editorStyles.loading}>Loading lesson...</div>;
  if (!lesson) return <div style={editorStyles.error}>Lesson not found</div>;

  return (
    <div style={editorStyles.container}>
      <div style={editorStyles.header}>
        <h1 style={editorStyles.title}>Lesson Editor</h1>
        <p style={editorStyles.subtitle}>
          Edit lesson content in small, manageable pieces
        </p>
        {message && (
          <div style={editorStyles.message}>{message}</div>
        )}
      </div>

      {/* Tab Navigation */}
      <div style={editorStyles.tabs}>
        {['metadata', 'sections', 'examples', 'concepts', 'tips'].map(tab => (
          <button
            key={tab}
            style={{
              ...editorStyles.tab,
              ...(activeTab === tab && editorStyles.tabActive)
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={editorStyles.content}>
        {/* Metadata Tab */}
        {activeTab === 'metadata' && (
          <div style={editorStyles.section}>
            <h2>Lesson Metadata</h2>
            <div style={editorStyles.form}>
              <label style={editorStyles.label}>
                Title:
                <input
                  type="text"
                  value={lesson.metadata.title}
                  onChange={(e) => saveMetadata({ title: e.target.value })}
                  style={editorStyles.input}
                  disabled={saving}
                />
              </label>

              <label style={editorStyles.label}>
                Subject:
                <select
                  value={lesson.metadata.subject}
                  onChange={(e) => saveMetadata({ subject: e.target.value })}
                  style={editorStyles.select}
                  disabled={saving}
                >
                  <option value="math">Math</option>
                  <option value="english">English</option>
                  <option value="reading">Reading</option>
                  <option value="science">Science</option>
                </select>
              </label>

              <label style={editorStyles.label}>
                Duration (minutes):
                <input
                  type="number"
                  value={lesson.metadata.duration_minutes}
                  onChange={(e) => saveMetadata({ duration_minutes: parseInt(e.target.value) })}
                  style={editorStyles.input}
                  disabled={saving}
                />
              </label>

              <label style={editorStyles.label}>
                Difficulty:
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={lesson.metadata.difficulty_level}
                  onChange={(e) => saveMetadata({ difficulty_level: parseInt(e.target.value) })}
                  style={editorStyles.range}
                  disabled={saving}
                />
                <span>{lesson.metadata.difficulty_level}/5</span>
              </label>
            </div>
          </div>
        )}

        {/* Sections Tab */}
        {activeTab === 'sections' && (
          <div style={editorStyles.section}>
            <div style={editorStyles.sectionHeader}>
              <h2>Sections</h2>
              <button onClick={addSection} style={editorStyles.addButton}>
                + Add Section
              </button>
            </div>

            {lesson.sections?.map((section) => (
              <div key={section.id} style={editorStyles.item}>
                <h3>{section.title}</h3>
                <p style={editorStyles.itemMeta}>Type: {section.section_type}</p>

                {section.content?.map((content) => (
                  <div key={content.id} style={editorStyles.contentBlock}>
                    {editingItem === content.id ? (
                      <div>
                        <textarea
                          defaultValue={content.content}
                          style={editorStyles.textarea}
                          rows={10}
                          onBlur={(e) => saveSectionContent(content.id, e.target.value)}
                          disabled={saving}
                        />
                        <button
                          onClick={() => setEditingItem(null)}
                          style={editorStyles.cancelButton}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => setEditingItem(content.id)}
                        style={editorStyles.contentPreview}
                      >
                        {content.content.substring(0, 200)}...
                        <span style={editorStyles.editHint}>Click to edit</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <div style={editorStyles.section}>
            <div style={editorStyles.sectionHeader}>
              <h2>Examples</h2>
              <button onClick={addExample} style={editorStyles.addButton}>
                + Add Example
              </button>
            </div>

            {lesson.examples?.map((example, index) => (
              <div key={example.id} style={editorStyles.item}>
                <h3>Example {index + 1}</h3>
                <div style={editorStyles.exampleContent}>
                  <strong>Problem:</strong>
                  <p>{example.problem_text}</p>
                  <strong>Solution:</strong>
                  <p>{example.solution_text}</p>
                  <strong>Explanation:</strong>
                  <p>{example.explanation}</p>
                </div>
                <button
                  onClick={() => setEditingItem(example.id)}
                  style={editorStyles.editButton}
                >
                  Edit Example
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Concepts Tab */}
        {activeTab === 'concepts' && (
          <div style={editorStyles.section}>
            <h2>Key Concepts</h2>
            {lesson.concepts?.map((concept) => (
              <div key={concept.id} style={editorStyles.item}>
                <h3>{concept.concept_title}</h3>
                <p>{concept.definition}</p>
                {concept.formula && (
                  <code style={editorStyles.formula}>{concept.formula}</code>
                )}
                <button
                  onClick={() => setEditingItem(concept.id)}
                  style={editorStyles.editButton}
                >
                  Edit Concept
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div style={editorStyles.section}>
            <div style={editorStyles.sectionHeader}>
              <h2>Tips & Hints</h2>
              <button onClick={addTip} style={editorStyles.addButton}>
                + Add Tip
              </button>
            </div>

            {lesson.tips?.map((tip) => (
              <div key={tip.id} style={editorStyles.item}>
                <span style={editorStyles.tipType}>{tip.tip_type}</span>
                <p>{tip.tip_text}</p>
                <button
                  onClick={() => setEditingItem(tip.id)}
                  style={editorStyles.editButton}
                >
                  Edit Tip
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonEditor;