/**
 * Time Per Question Chart
 * Visualizes time spent on each question with sorting and filtering
 */

import React, { useState, useMemo } from 'react';
import { ClockIcon, ChartIcon } from './icons/SectionIcons';

const TimePerQuestionChart = ({ questionTimings, sectionType }) => {
  const [sortBy, setSortBy] = useState('question'); // 'question', 'time', 'fastest', 'slowest'
  const [filterCorrect, setFilterCorrect] = useState('all'); // 'all', 'correct', 'incorrect'

  // Process and sort data
  const processedData = useMemo(() => {
    if (!questionTimings || questionTimings.length === 0) return [];

    let data = [...questionTimings].map(item => ({
      ...item,
      timeInSeconds: item.time_spent / 1000 // Convert ms to seconds
    }));

    // Filter
    if (filterCorrect === 'correct') {
      data = data.filter(d => d.is_correct);
    } else if (filterCorrect === 'incorrect') {
      data = data.filter(d => !d.is_correct);
    }

    // Sort
    switch (sortBy) {
      case 'time':
        data.sort((a, b) => b.timeInSeconds - a.timeInSeconds);
        break;
      case 'fastest':
        data.sort((a, b) => a.timeInSeconds - b.timeInSeconds);
        break;
      case 'slowest':
        data.sort((a, b) => b.timeInSeconds - a.timeInSeconds);
        break;
      case 'question':
      default:
        data.sort((a, b) => a.question_number - b.question_number);
        break;
    }

    return data;
  }, [questionTimings, sortBy, filterCorrect]);

  const avgTime = useMemo(() => {
    if (processedData.length === 0) return 0;
    const total = processedData.reduce((sum, d) => sum + d.timeInSeconds, 0);
    return total / processedData.length;
  }, [processedData]);

  const maxTime = useMemo(() => {
    if (processedData.length === 0) return 100;
    return Math.max(...processedData.map(d => d.timeInSeconds));
  }, [processedData]);

  const formatTime = (seconds) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!questionTimings || questionTimings.length === 0) {
    return (
      <div style={styles.emptyState}>
        <ClockIcon size={48} color="#d1d5db" />
        <p style={styles.emptyText}>No timing data available</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <ChartIcon size={24} color="#3b82f6" />
          <h3 style={styles.title}>Time Per Question</h3>
        </div>
        <div style={styles.stats}>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Average</span>
            <span style={styles.statValue}>{formatTime(avgTime)}</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Total Questions</span>
            <span style={styles.statValue}>{processedData.length}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.filterGroup}>
          <label style={styles.label}>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.select}>
            <option value="question">Question Number</option>
            <option value="fastest">Fastest First</option>
            <option value="slowest">Slowest First</option>
          </select>
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.label}>Show:</label>
          <select value={filterCorrect} onChange={(e) => setFilterCorrect(e.target.value)} style={styles.select}>
            <option value="all">All Questions</option>
            <option value="correct">Correct Only</option>
            <option value="incorrect">Incorrect Only</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div style={styles.chart}>
        {processedData.map((item, index) => {
          const barHeight = (item.timeInSeconds / maxTime) * 100;
          const isAboveAvg = item.timeInSeconds > avgTime;

          return (
            <div key={index} style={styles.barContainer} title={`Q${item.question_number}: ${formatTime(item.timeInSeconds)}`}>
              <div style={styles.barWrapper}>
                <div
                  style={{
                    ...styles.bar,
                    height: `${Math.max(barHeight, 2)}%`,
                    backgroundColor: item.is_correct ? '#10b981' : '#ef4444',
                    opacity: isAboveAvg ? 1 : 0.6
                  }}
                />
              </div>
              <div style={styles.barLabel}>Q{item.question_number}</div>
              <div style={styles.barTime}>{formatTime(item.timeInSeconds)}</div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{...styles.legendDot, backgroundColor: '#10b981'}} />
          <span style={styles.legendText}>Correct</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendDot, backgroundColor: '#ef4444'}} />
          <span style={styles.legendText}>Incorrect</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendDot, backgroundColor: '#3b82f6', opacity: 0.6}} />
          <span style={styles.legendText}>Below Average Time</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '24px',
    marginTop: '24px',
  },

  header: {
    marginBottom: '24px',
  },

  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },

  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
  },

  stats: {
    display: 'flex',
    gap: '24px',
  },

  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  statLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500',
  },

  statValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
  },

  controls: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },

  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  label: {
    fontSize: '14px',
    color: '#374151',
    fontWeight: '500',
  },

  select: {
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#111827',
    cursor: 'pointer',
    outline: 'none',
  },

  chart: {
    display: 'flex',
    gap: '4px',
    alignItems: 'flex-end',
    minHeight: '200px',
    padding: '16px 0',
    borderTop: '1px solid #e5e7eb',
    borderBottom: '1px solid #e5e7eb',
    overflowX: 'auto',
  },

  barContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '40px',
    flex: '0 0 auto',
  },

  barWrapper: {
    height: '150px',
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'center',
  },

  bar: {
    width: '24px',
    borderRadius: '4px 4px 0 0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },

  barLabel: {
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '8px',
    fontWeight: '500',
  },

  barTime: {
    fontSize: '10px',
    color: '#9ca3af',
    marginTop: '2px',
  },

  legend: {
    display: 'flex',
    gap: '20px',
    marginTop: '16px',
    flexWrap: 'wrap',
  },

  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },

  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },

  legendText: {
    fontSize: '12px',
    color: '#6b7280',
  },

  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    gap: '12px',
  },

  emptyText: {
    fontSize: '14px',
    color: '#9ca3af',
  },
};

export default TimePerQuestionChart;
