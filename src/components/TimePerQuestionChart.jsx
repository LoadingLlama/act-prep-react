/**
 * Time Per Question Chart
 * Displays a sortable chart showing time spent on each question
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '../services/api/supabase.service';

const TimePerQuestionChart = ({ userId, sessionId }) => {
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('question'); // 'question', 'time', 'section'
  const [filterSection, setFilterSection] = useState('all');

  useEffect(() => {
    if (userId && sessionId) {
      fetchQuestionTimes();
    }
  }, [userId, sessionId]);

  const fetchQuestionTimes = async () => {
    try {
      const { data, error } = await supabase
        .from('practice_test_results')
        .select('*')
        .eq('user_id', userId)
        .eq('session_id', sessionId)
        .order('question_number', { ascending: true });

      if (error) throw error;

      setQuestionData(data || []);
    } catch (error) {
      console.error('Error fetching question times:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSortedData = () => {
    let sorted = [...questionData];

    if (filterSection !== 'all') {
      sorted = sorted.filter(q => q.section?.toLowerCase() === filterSection);
    }

    switch (sortBy) {
      case 'time':
        sorted.sort((a, b) => (b.time_spent || 0) - (a.time_spent || 0));
        break;
      case 'section':
        sorted.sort((a, b) => {
          const sectionOrder = { english: 1, math: 2, reading: 3, science: 4 };
          return (sectionOrder[a.section?.toLowerCase()] || 5) - (sectionOrder[b.section?.toLowerCase()] || 5);
        });
        break;
      default: // 'question'
        sorted.sort((a, b) => (a.question_number || 0) - (b.question_number || 0));
    }

    return sorted;
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const getMaxTime = () => {
    return Math.max(...questionData.map(q => q.time_spent || 0), 1);
  };

  const getSectionColor = (section) => {
    const colors = {
      english: '#3b82f6',
      math: '#10b981',
      reading: '#f59e0b',
      science: '#8b5cf6',
    };
    return colors[section?.toLowerCase()] || '#6b7280';
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading question times...</div>
      </div>
    );
  }

  if (questionData.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>No question time data available</div>
      </div>
    );
  }

  const sortedData = getSortedData();
  const maxTime = getMaxTime();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Time Per Question</h3>
        <div style={styles.controls}>
          {/* Section Filter */}
          <select
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Sections</option>
            <option value="english">English</option>
            <option value="math">Math</option>
            <option value="reading">Reading</option>
            <option value="science">Science</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="question">By Question #</option>
            <option value="time">By Time (High to Low)</option>
            <option value="section">By Section</option>
          </select>
        </div>
      </div>

      <div style={styles.chartContainer}>
        {sortedData.map((question, index) => {
          const timeSpent = question.time_spent || 0;
          const percentage = (timeSpent / maxTime) * 100;
          const color = getSectionColor(question.section);

          return (
            <div key={index} style={styles.row}>
              <div style={styles.questionInfo}>
                <span style={styles.questionNumber}>Q{question.question_number}</span>
                <span style={styles.sectionBadge} data-section={question.section?.toLowerCase()}>
                  {question.section?.charAt(0).toUpperCase() + question.section?.slice(1)}
                </span>
              </div>
              <div style={styles.barContainer}>
                <div
                  style={{
                    ...styles.bar,
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <div style={styles.timeLabel}>{formatTime(timeSpent)}</div>
            </div>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div style={styles.summary}>
        <div style={styles.stat}>
          <div style={styles.statLabel}>Total Questions</div>
          <div style={styles.statValue}>{sortedData.length}</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statLabel}>Avg Time/Question</div>
          <div style={styles.statValue}>
            {formatTime(Math.round(sortedData.reduce((sum, q) => sum + (q.time_spent || 0), 0) / sortedData.length))}
          </div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statLabel}>Longest</div>
          <div style={styles.statValue}>{formatTime(maxTime)}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginTop: '24px',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px',
  },

  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },

  controls: {
    display: 'flex',
    gap: '12px',
  },

  select: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },

  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxHeight: '500px',
    overflowY: 'auto',
    marginBottom: '24px',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
  },

  questionInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '120px',
  },

  questionNumber: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    minWidth: '40px',
  },

  sectionBadge: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: '4px',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
  },

  barContainer: {
    flex: 1,
    height: '24px',
    backgroundColor: '#f3f4f6',
    borderRadius: '4px',
    overflow: 'hidden',
  },

  bar: {
    height: '100%',
    transition: 'width 0.3s ease',
    borderRadius: '4px',
  },

  timeLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    minWidth: '60px',
    textAlign: 'right',
  },

  summary: {
    display: 'flex',
    gap: '24px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    justifyContent: 'space-around',
  },

  stat: {
    textAlign: 'center',
  },

  statLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '4px',
    fontWeight: '500',
  },

  statValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
  },

  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280',
    fontSize: '14px',
  },

  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#9ca3af',
    fontSize: '14px',
  },
};

export default TimePerQuestionChart;
