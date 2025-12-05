/**
 * Diagnostic Insights Modal Component
 * Displays comprehensive diagnostic test results with ACT scores,
 * section breakdowns, strengths/weaknesses, and question-by-question review
 */

import React, { useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { convertDiagnosticToACT, getPerformanceLevel } from '../../utils/actScoreConversion';

/**
 * Diagnostic Insights Modal
 * @param {object} insightsData - Complete insights data including results and analysis
 * @param {function} onClose - Close modal callback
 * @param {boolean} show - Whether to show the modal
 */
const DiagnosticInsightsModal = ({ insightsData, onClose, show }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  if (!show || !insightsData) return null;

  const { results, analysis, correctAnswers, totalQuestions, scorePercentage, allQuestionResults, questions: allQuestions } = insightsData;

  // Calculate section scores and ACT scores
  const sectionScores = results.map(section => {
    const correct = section.questions.filter(q => q.isCorrect).length;
    const total = section.questions.length;
    return {
      section: section.section,
      correct,
      total,
      percentage: ((correct / total) * 100).toFixed(1)
    };
  });

  // Convert to ACT scores (1-36 scale)
  const actScores = convertDiagnosticToACT(sectionScores);

  console.log('🎯 ACT Score Conversion:', {
    raw_scores: sectionScores,
    act_scores: actScores,
    composite: actScores.composite
  });

  // Log insights display for verification
  console.log('📈 Displaying insights from diagnostic test:', {
    totalSections: results.length,
    sections: sectionScores,
    overallScore: `${correctAnswers}/${totalQuestions} (${scorePercentage.toFixed(1)}%)`,
    analysisStrengths: analysis?.strong_lessons?.length || 0,
    analysisWeaknesses: analysis?.weak_lessons?.length || 0
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '900px',
          maxHeight: '85vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: '1rem',
            right: '1rem',
            float: 'right',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            transition: 'all 0.15s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#e5e7eb';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#f3f4f6';
          }}
        >
          <HiXMark style={{ fontSize: '1rem' }} />
          Close
        </button>

      <div style={{
        padding: '2.5rem',
        clear: 'both'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            Diagnostic Test Results
          </h1>
          <p style={{
            fontSize: '0.95rem',
            color: '#6b7280',
            lineHeight: '1.5',
            margin: 0
          }}>
            Here's your comprehensive performance analysis and personalized insights
          </p>
        </div>

        {/* Overall Score Card */}
        <div style={{
          background: 'linear-gradient(135deg, #08245b 0%, #0a2f6e 100%)',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          color: 'white'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', opacity: 0.9 }}>
              Your Estimated ACT Score
            </div>
            <div style={{ fontSize: '5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              {actScores.composite}
            </div>
            <div style={{ fontSize: '1.125rem', fontWeight: '600', opacity: 0.9, marginBottom: '1rem' }}>
              {getPerformanceLevel(actScores.composite)} • {correctAnswers}/{totalQuestions} ({scorePercentage.toFixed(1)}%)
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              fontSize: '0.875rem',
              opacity: 0.9
            }}>
              <div>
                <div style={{ fontWeight: '600' }}>English: {actScores.english}</div>
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>Math: {actScores.math}</div>
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>Reading: {actScores.reading}</div>
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>Science: {actScores.science}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Breakdown */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '1rem'
          }}>
            Section Breakdown
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {sectionScores.map(section => {
              const sectionActScore = actScores[section.section];
              const performanceLevel = getPerformanceLevel(sectionActScore);

              return (
                <div key={section.section} style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#6b7280',
                    textTransform: 'capitalize',
                    marginBottom: '0.5rem'
                  }}>
                    {section.section}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.75rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: '#1a1a1a'
                    }}>
                      {sectionActScore}
                    </div>
                    <div style={{
                      fontSize: '1rem',
                      color: '#6b7280'
                    }}>
                      / 36
                    </div>
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: sectionActScore >= 28 ? '#059669' : sectionActScore >= 20 ? '#d97706' : '#dc2626',
                    marginBottom: '0.5rem'
                  }}>
                    {performanceLevel}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#9ca3af',
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '0.5rem'
                  }}>
                    {section.correct}/{section.total} ({section.percentage}% Correct)
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question-by-Question Results */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '1rem'
          }}>
            Question-by-Question Results
          </h2>
          {results.map((section, sectionIdx) => (
            <div key={sectionIdx} style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '1rem',
                textTransform: 'capitalize'
              }}>
                {section.section} Section
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                gap: '0.5rem'
              }}>
                {section.questions.map((q, qIdx) => {
                  const fullQuestion = allQuestions?.find(fq => fq.question_number === q.questionNum);
                  return (
                    <div
                      key={qIdx}
                      onClick={() => {
                        if (fullQuestion) {
                          setSelectedQuestion({
                            ...fullQuestion,
                            userAnswer: q.userAnswer,
                            isCorrect: q.isCorrect,
                            questionNum: q.questionNum
                          });
                        }
                      }}
                      style={{
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        background: q.isCorrect ? '#dcfce7' : '#fee2e2',
                        color: q.isCorrect ? '#166534' : '#991b1b',
                        border: `2px solid ${q.isCorrect ? '#bbf7d0' : '#fecaca'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                      title={`Q${q.questionNum}: ${q.isCorrect ? 'Correct' : 'Incorrect'} - Click to review`}
                    >
                      {q.questionNum}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Strengths and Weaknesses */}
        {analysis && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '1rem'
            }}>
              Strengths & Areas for Improvement
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem'
            }}>
              {/* Strengths */}
              <div style={{
                background: '#dcfce7',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#166534',
                  marginBottom: '1rem'
                }}>
                  💪 Strong Areas
                </div>
                {analysis.strong_lessons && analysis.strong_lessons.length > 0 ? (
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#166534' }}>
                    {analysis.strong_lessons.slice(0, 5).map((lesson, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem' }}>
                        {lesson.lesson_title} ({lesson.accuracy.toFixed(0)}% accuracy)
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#166534', margin: 0 }}>Keep practicing to identify your strengths!</p>
                )}
              </div>

              {/* Weaknesses */}
              <div style={{
                background: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#991b1b',
                  marginBottom: '1rem'
                }}>
                  📚 Focus Areas
                </div>
                {analysis.weak_lessons && analysis.weak_lessons.length > 0 ? (
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#991b1b' }}>
                    {analysis.weak_lessons.slice(0, 5).map((lesson, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem' }}>
                        {lesson.lesson_title} ({lesson.accuracy.toFixed(0)}% accuracy)
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#991b1b', margin: 0 }}>Great job! No major weak areas identified.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Question Type Analysis */}
        {analysis && analysis.question_type_breakdown && analysis.question_type_breakdown.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '1rem'
            }}>
              Performance by Question Type
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              {analysis.question_type_breakdown.map((qt, idx) => {
                const isWeak = qt.accuracy < 70;
                return (
                  <div key={idx} style={{
                    background: isWeak ? '#fef3c7' : '#f9fafb',
                    border: `1px solid ${isWeak ? '#fcd34d' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    padding: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#1a1a1a',
                        textTransform: 'capitalize'
                      }}>
                        {qt.question_type.replace(/_/g, ' ')}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        textTransform: 'uppercase'
                      }}>
                        {qt.section}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: isWeak ? '#b45309' : '#059669',
                      marginBottom: '0.25rem'
                    }}>
                      {qt.accuracy.toFixed(0)}%
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#6b7280'
                    }}>
                      {qt.correct}/{qt.total} correct
                      {isWeak && (
                        <span style={{ color: '#b45309', marginLeft: '0.5rem', fontWeight: '600' }}>
                          ⚠ Focus needed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Learning Path Generated Notice */}
        <div style={{
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          border: '1px solid #93c5fd',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem'
          }}>
            🎉
          </div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#b91c1c',
            marginBottom: '0.5rem'
          }}>
            Your Personalized Learning Path is Ready!
          </div>
          <div style={{
            fontSize: '0.95rem',
            color: '#b91c1c',
            lineHeight: '1.6'
          }}>
            Based on your diagnostic results and study preferences, we've created a customized plan with lessons prioritized for your weak areas. Your learning path includes:
          </div>
          <div style={{
            marginTop: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            fontSize: '0.875rem',
            color: '#b91c1c'
          }}>
            <div>
              <div style={{ fontWeight: '600' }}>📅 Study Schedule</div>
              <div>{insightsData.questions ? 'Personalized daily plan' : 'Custom schedule'}</div>
            </div>
            <div>
              <div style={{ fontWeight: '600' }}>🎯 Target Score</div>
              <div>{analysis?.target_score || 'Your goal'}</div>
            </div>
            <div>
              <div style={{ fontWeight: '600' }}>⏱️ Daily Study Time</div>
              <div>{analysis?.daily_minutes ? `${analysis.daily_minutes} minutes` : 'Custom duration'}</div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={onClose}
            style={{
              background: '#08245b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.875rem 2.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#061a3d';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#08245b';
            }}
          >
            Start Your Learning Journey →
          </button>
        </div>
      </div>

      {/* Question Review Modal */}
      {selectedQuestion && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={() => setSelectedQuestion(null)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              padding: '2rem',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedQuestion(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6b7280',
                padding: '0.5rem',
                lineHeight: 1
              }}
            >
              <HiXMark />
            </button>

            {/* Question Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: selectedQuestion.isCorrect ? '#dcfce7' : '#fee2e2',
                color: selectedQuestion.isCorrect ? '#166534' : '#991b1b',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Question {selectedQuestion.questionNum} - {selectedQuestion.isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                textTransform: 'capitalize'
              }}>
                {selectedQuestion.section} Section
              </div>
            </div>

            {/* Passage (if applicable) */}
            {selectedQuestion.passage && (
              <div style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                {selectedQuestion.passage_title && (
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '1rem'
                  }}>
                    {selectedQuestion.passage_title}
                  </div>
                )}
                <div style={{
                  fontSize: '0.95rem',
                  color: '#374151',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedQuestion.passage}
                </div>
              </div>
            )}

            {/* Question Text */}
            <div style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              {selectedQuestion.text}
            </div>

            {/* Answer Choices */}
            <div style={{ marginBottom: '1.5rem' }}>
              {Object.entries(selectedQuestion.answers || {}).map(([letter, text]) => {
                const isUserAnswer = selectedQuestion.userAnswer === letter;
                const isCorrectAnswer = selectedQuestion.correctAnswer === letter;

                let backgroundColor = 'white';
                let borderColor = '#e5e7eb';
                let textColor = '#1a1a1a';

                if (isCorrectAnswer) {
                  backgroundColor = '#dcfce7';
                  borderColor = '#bbf7d0';
                  textColor = '#166534';
                } else if (isUserAnswer && !isCorrectAnswer) {
                  backgroundColor = '#fee2e2';
                  borderColor = '#fecaca';
                  textColor = '#991b1b';
                }

                return (
                  <div
                    key={letter}
                    style={{
                      padding: '1rem',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '8px',
                      marginBottom: '0.75rem',
                      background: backgroundColor,
                      color: textColor
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <div style={{ fontWeight: '600', flexShrink: 0 }}>{letter}.</div>
                      <div style={{ flex: 1 }}>
                        {text}
                        {isCorrectAnswer && (
                          <span style={{ marginLeft: '0.5rem', fontWeight: '600' }}>✓ Correct Answer</span>
                        )}
                        {isUserAnswer && !isCorrectAnswer && (
                          <span style={{ marginLeft: '0.5rem', fontWeight: '600' }}>✗ Your Answer</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {selectedQuestion.explanation && (
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#b91c1c',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Explanation
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  color: '#b91c1c',
                  lineHeight: '1.6'
                }}>
                  {selectedQuestion.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DiagnosticInsightsModal;
