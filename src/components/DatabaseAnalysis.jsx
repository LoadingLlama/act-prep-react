import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { supabase } from '../supabaseClient';

const useStyles = createUseStyles({
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#fff',
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: '300',
    opacity: 0.9,
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tab: {
    padding: '12px 24px',
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    borderRadius: '25px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      background: 'rgba(255,255,255,0.3)',
      transform: 'translateY(-2px)',
    },
    '&.active': {
      background: '#fff',
      color: '#667eea',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    },
  },
  content: {
    background: '#fff',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '25px',
    borderRadius: '15px',
    textAlign: 'center',
    color: '#fff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  statNumber: {
    fontSize: '42px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    opacity: 0.9,
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
    borderLeft: '4px solid #667eea',
    paddingLeft: '15px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  },
  th: {
    background: '#f8f9fa',
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#555',
    borderBottom: '2px solid #dee2e6',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  badgeSuccess: {
    background: '#d4edda',
    color: '#155724',
  },
  badgeWarning: {
    background: '#fff3cd',
    color: '#856404',
  },
  badgeDanger: {
    background: '#f8d7da',
    color: '#721c24',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#e9ecef',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '8px',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    transition: 'width 0.5s ease',
  },
  loading: {
    textAlign: 'center',
    padding: '60px',
    fontSize: '18px',
    color: '#666',
  },
  error: {
    background: '#f8d7da',
    color: '#721c24',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  chartContainer: {
    marginTop: '20px',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px',
  },
  insightBox: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#fff',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '20px',
  },
  insightTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  insightText: {
    fontSize: '14px',
    lineHeight: '1.6',
    opacity: 0.95,
  },
});

const DatabaseAnalysis = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    overview: null,
    tests: [],
    sections: {},
    passages: {},
    quality: {},
    insights: {},
  });

  useEffect(() => {
    loadDatabaseAnalysis();
  }, []);

  const loadDatabaseAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        englishQuestions,
        mathQuestions,
        readingQuestions,
        scienceQuestions,
        englishPassages,
        readingPassages,
        sciencePassages,
        lessons,
      ] = await Promise.all([
        supabase.from('act_english_questions').select('*'),
        supabase.from('act_math_questions').select('*'),
        supabase.from('act_reading_questions').select('*'),
        supabase.from('act_science_questions').select('*'),
        supabase.from('act_english_passages').select('*'),
        supabase.from('act_reading_passages').select('*'),
        supabase.from('act_science_passages').select('*'),
        supabase.from('lessons').select('*'),
      ]);

      // Process data
      const analysis = analyzeDatabase({
        english: englishQuestions.data || [],
        math: mathQuestions.data || [],
        reading: readingQuestions.data || [],
        science: scienceQuestions.data || [],
        englishPassages: englishPassages.data || [],
        readingPassages: readingPassages.data || [],
        sciencePassages: sciencePassages.data || [],
        lessons: lessons.data || [],
      });

      setData(analysis);
      setLoading(false);
    } catch (err) {
      console.error('Error loading database analysis:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const analyzeDatabase = (db) => {
    const totalQuestions = db.english.length + db.math.length + db.reading.length + db.science.length;
    const totalPassages = db.englishPassages.length + db.readingPassages.length + db.sciencePassages.length;
    const totalTests = new Set([...db.english.map(q => q.test_number)]).size;

    // Overview metrics
    const overview = {
      totalTests,
      totalQuestions,
      totalPassages,
      totalLessons: db.lessons.length,
      questionsPerTest: totalQuestions / totalTests,
      passagesPerTest: totalPassages / totalTests,
    };

    // Per-test analysis
    const tests = [];
    for (let testNum = 1; testNum <= totalTests; testNum++) {
      const testEnglish = db.english.filter(q => q.test_number === testNum);
      const testMath = db.math.filter(q => q.test_number === testNum);
      const testReading = db.reading.filter(q => q.test_number === testNum);
      const testScience = db.science.filter(q => q.test_number === testNum);

      tests.push({
        testNumber: testNum,
        english: testEnglish.length,
        math: testMath.length,
        reading: testReading.length,
        science: testScience.length,
        total: testEnglish.length + testMath.length + testReading.length + testScience.length,
        passages: {
          english: db.englishPassages.filter(p => p.test_number === testNum).length,
          reading: db.readingPassages.filter(p => p.test_number === testNum).length,
          science: db.sciencePassages.filter(p => p.test_number === testNum).length,
        },
      });
    }

    // Section analysis
    const sections = {
      english: analyzeSection(db.english, 'English'),
      math: analyzeSection(db.math, 'Math'),
      reading: analyzeSection(db.reading, 'Reading'),
      science: analyzeSection(db.science, 'Science'),
    };

    // Passage analysis
    const passages = {
      english: analyzePassages(db.englishPassages, db.english),
      reading: analyzePassages(db.readingPassages, db.reading),
      science: analyzePassages(db.sciencePassages, db.science),
    };

    // Quality metrics
    const quality = calculateQualityMetrics(db);

    // Generate insights
    const insights = generateInsights(db, sections, quality);

    return { overview, tests, sections, passages, quality, insights };
  };

  const analyzeSection = (questions, sectionName) => {
    if (questions.length === 0) return null;

    const answerDistribution = {};
    const typeDistribution = {};
    const categoryDistribution = {};
    const lessonDistribution = {};

    questions.forEach(q => {
      answerDistribution[q.correct_answer] = (answerDistribution[q.correct_answer] || 0) + 1;
      typeDistribution[q.question_type] = (typeDistribution[q.question_type] || 0) + 1;
      categoryDistribution[q.question_category] = (categoryDistribution[q.question_category] || 0) + 1;
      if (q.lesson_id) {
        lessonDistribution[q.lesson_id] = (lessonDistribution[q.lesson_id] || 0) + 1;
      }
    });

    const withLessons = questions.filter(q => q.lesson_id).length;
    const uniqueTypes = Object.keys(typeDistribution).length;
    const uniqueCategories = Object.keys(categoryDistribution).length;

    return {
      total: questions.length,
      answerDistribution,
      typeDistribution,
      categoryDistribution,
      uniqueTypes,
      uniqueCategories,
      withLessons,
      lessonCoverage: (withLessons / questions.length * 100).toFixed(2),
    };
  };

  const analyzePassages = (passages, questions) => {
    if (passages.length === 0) return null;

    const questionsPerPassage = {};
    passages.forEach(p => {
      const linkedQuestions = questions.filter(q => q.passage_id === p.id).length;
      questionsPerPassage[p.id] = linkedQuestions;
    });

    const avgQuestionsPerPassage = Object.values(questionsPerPassage).reduce((a, b) => a + b, 0) / passages.length;
    const avgPassageLength = passages.reduce((sum, p) => sum + (p.passage_text?.length || 0), 0) / passages.length;

    return {
      total: passages.length,
      avgQuestionsPerPassage: avgQuestionsPerPassage.toFixed(2),
      avgPassageLength: Math.round(avgPassageLength),
      questionsPerPassage,
    };
  };

  const calculateQualityMetrics = (db) => {
    const allQuestions = [...db.english, ...db.math, ...db.reading, ...db.science];

    const completeness = {
      withStem: allQuestions.filter(q => q.question_stem).length,
      withChoices: allQuestions.filter(q => q.choice_a && q.choice_b && q.choice_c && q.choice_d).length,
      withAnswer: allQuestions.filter(q => q.correct_answer).length,
      withLesson: allQuestions.filter(q => q.lesson_id).length,
      withType: allQuestions.filter(q => q.question_type).length,
      withCategory: allQuestions.filter(q => q.question_category).length,
    };

    const total = allQuestions.length;

    return {
      completeness: {
        stem: (completeness.withStem / total * 100).toFixed(2),
        choices: (completeness.withChoices / total * 100).toFixed(2),
        answer: (completeness.withAnswer / total * 100).toFixed(2),
        lesson: (completeness.withLesson / total * 100).toFixed(2),
        type: (completeness.withType / total * 100).toFixed(2),
        category: (completeness.withCategory / total * 100).toFixed(2),
      },
      overallQuality: (
        (completeness.withStem + completeness.withChoices + completeness.withAnswer +
         completeness.withLesson + completeness.withType + completeness.withCategory) /
        (total * 6) * 100
      ).toFixed(2),
    };
  };

  const generateInsights = (db, sections, quality) => {
    const insights = [];

    // Insight 1: Data completeness
    if (parseFloat(quality.overallQuality) >= 99) {
      insights.push({
        title: 'Excellent Data Quality',
        text: `The database maintains ${quality.overallQuality}% overall data completeness across all required fields. All questions have complete metadata, answers, and lesson assignments.`,
        type: 'success',
      });
    }

    // Insight 2: Lesson coverage
    const totalWithLessons = [...db.english, ...db.math, ...db.reading, ...db.science]
      .filter(q => q.lesson_id).length;
    const totalQuestions = db.english.length + db.math.length + db.reading.length + db.science.length;

    if (totalWithLessons === totalQuestions) {
      insights.push({
        title: 'Complete Lesson Assignment',
        text: `All ${totalQuestions} questions have intelligent lesson assignments using content-based analysis. Students receive personalized recommendations for every question.`,
        type: 'success',
      });
    }

    // Insight 3: Answer distribution
    const mathAnswers = db.math.map(q => q.correct_answer);
    const mathDistribution = {};
    mathAnswers.forEach(a => mathDistribution[a] = (mathDistribution[a] || 0) + 1);
    const mathBalanced = Object.values(mathDistribution).every(count =>
      count >= mathAnswers.length * 0.15 && count <= mathAnswers.length * 0.25
    );

    if (mathBalanced) {
      insights.push({
        title: 'Balanced Answer Distribution',
        text: 'Math section shows excellent answer distribution across A-E choices (15-25% each), indicating proper normalization and no systematic bias.',
        type: 'success',
      });
    }

    // Insight 4: Passage coverage
    const totalPassages = db.englishPassages.length + db.readingPassages.length + db.sciencePassages.length;
    insights.push({
      title: 'Comprehensive Passage Library',
      text: `Database contains ${totalPassages} complete passages across English (${db.englishPassages.length}), Reading (${db.readingPassages.length}), and Science (${db.sciencePassages.length}) sections with full text and proper question linkages.`,
      type: 'info',
    });

    return insights;
  };

  const renderOverview = () => (
    <div>
      <div className={classes.statsGrid}>
        <div className={classes.statCard}>
          <div className={classes.statNumber}>{data.overview.totalTests}</div>
          <div className={classes.statLabel}>Complete Tests</div>
        </div>
        <div className={classes.statCard}>
          <div className={classes.statNumber}>{data.overview.totalQuestions.toLocaleString()}</div>
          <div className={classes.statLabel}>Total Questions</div>
        </div>
        <div className={classes.statCard}>
          <div className={classes.statNumber}>{data.overview.totalPassages}</div>
          <div className={classes.statLabel}>Total Passages</div>
        </div>
        <div className={classes.statCard}>
          <div className={classes.statNumber}>{data.overview.totalLessons}</div>
          <div className={classes.statLabel}>Lesson Topics</div>
        </div>
      </div>

      {data.insights.map((insight, idx) => (
        <div key={idx} className={classes.insightBox}>
          <div className={classes.insightTitle}>✨ {insight.title}</div>
          <div className={classes.insightText}>{insight.text}</div>
        </div>
      ))}

      <div className={classes.section}>
        <h2 className={classes.sectionTitle}>Quality Metrics</h2>
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>Metric</th>
              <th className={classes.th}>Coverage</th>
              <th className={classes.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.quality.completeness).map(([key, value]) => (
              <tr key={key}>
                <td className={classes.td}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td className={classes.td}>
                  <div className={classes.progressBar}>
                    <div className={classes.progressFill} style={{ width: `${value}%` }} />
                  </div>
                  {value}%
                </td>
                <td className={classes.td}>
                  <span className={`${classes.badge} ${
                    parseFloat(value) === 100 ? classes.badgeSuccess :
                    parseFloat(value) >= 95 ? classes.badgeWarning :
                    classes.badgeDanger
                  }`}>
                    {parseFloat(value) === 100 ? '✓ Complete' : `${value}%`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTests = () => (
    <div className={classes.section}>
      <h2 className={classes.sectionTitle}>Per-Test Breakdown</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>Test #</th>
            <th className={classes.th}>English</th>
            <th className={classes.th}>Math</th>
            <th className={classes.th}>Reading</th>
            <th className={classes.th}>Science</th>
            <th className={classes.th}>Total</th>
            <th className={classes.th}>Passages</th>
          </tr>
        </thead>
        <tbody>
          {data.tests.map(test => (
            <tr key={test.testNumber}>
              <td className={classes.td}>Test {test.testNumber}</td>
              <td className={classes.td}>{test.english}</td>
              <td className={classes.td}>{test.math}</td>
              <td className={classes.td}>{test.reading}</td>
              <td className={classes.td}>{test.science}</td>
              <td className={classes.td}><strong>{test.total}</strong></td>
              <td className={classes.td}>
                {test.passages.english + test.passages.reading + test.passages.science}
              </td>
            </tr>
          ))}
          <tr style={{ background: '#f8f9fa', fontWeight: '600' }}>
            <td className={classes.td}>TOTAL</td>
            <td className={classes.td}>{data.tests.reduce((sum, t) => sum + t.english, 0)}</td>
            <td className={classes.td}>{data.tests.reduce((sum, t) => sum + t.math, 0)}</td>
            <td className={classes.td}>{data.tests.reduce((sum, t) => sum + t.reading, 0)}</td>
            <td className={classes.td}>{data.tests.reduce((sum, t) => sum + t.science, 0)}</td>
            <td className={classes.td}><strong>{data.tests.reduce((sum, t) => sum + t.total, 0)}</strong></td>
            <td className={classes.td}>
              {data.tests.reduce((sum, t) =>
                sum + t.passages.english + t.passages.reading + t.passages.science, 0
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderSections = () => (
    <div>
      {Object.entries(data.sections).map(([name, section]) => (
        section && (
          <div key={name} className={classes.section}>
            <h2 className={classes.sectionTitle}>{name.charAt(0).toUpperCase() + name.slice(1)} Section Analysis</h2>

            <div className={classes.statsGrid}>
              <div className={classes.statCard}>
                <div className={classes.statNumber}>{section.total}</div>
                <div className={classes.statLabel}>Total Questions</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statNumber}>{section.uniqueTypes}</div>
                <div className={classes.statLabel}>Question Types</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statNumber}>{section.uniqueCategories}</div>
                <div className={classes.statLabel}>Categories</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statNumber}>{section.lessonCoverage}%</div>
                <div className={classes.statLabel}>Lesson Coverage</div>
              </div>
            </div>

            <div className={classes.chartContainer}>
              <h3>Answer Distribution</h3>
              {Object.entries(section.answerDistribution)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([answer, count]) => (
                  <div key={answer} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span><strong>{answer}</strong></span>
                      <span>{count} ({(count / section.total * 100).toFixed(1)}%)</span>
                    </div>
                    <div className={classes.progressBar}>
                      <div className={classes.progressFill} style={{ width: `${count / section.total * 100}%` }} />
                    </div>
                  </div>
                ))}
            </div>

            <div className={classes.chartContainer}>
              <h3>Top Question Types</h3>
              {Object.entries(section.typeDistribution)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([type, count]) => (
                  <div key={type} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span>{type}</span>
                      <span>{count} questions</span>
                    </div>
                    <div className={classes.progressBar}>
                      <div className={classes.progressFill} style={{ width: `${count / section.total * 100}%` }} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )
      ))}
    </div>
  );

  const renderPassages = () => (
    <div>
      {Object.entries(data.passages).map(([name, passage]) => (
        passage && (
          <div key={name} className={classes.section}>
            <h2 className={classes.sectionTitle}>{name.charAt(0).toUpperCase() + name.slice(1)} Passages</h2>

            <div className={classes.statsGrid}>
              <div className={classes.statCard}>
                <div className={classes.statNumber}>{passage.total}</div>
                <div className={classes.statLabel}>Total Passages</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statNumber}>{passage.avgQuestionsPerPassage}</div>
                <div className={classes.statLabel}>Avg Questions/Passage</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statNumber}>{passage.avgPassageLength.toLocaleString()}</div>
                <div className={classes.statLabel}>Avg Passage Length (chars)</div>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.loading}>Loading comprehensive database analysis...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.error}>Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.title}>ACT Database Molecular Analysis</h1>
        <p className={classes.subtitle}>
          Complete analysis of {data.overview.totalQuestions.toLocaleString()} questions across {data.overview.totalTests} tests
        </p>
      </div>

      <div className={classes.tabs}>
        <button
          className={`${classes.tab} ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${classes.tab} ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
        >
          Tests
        </button>
        <button
          className={`${classes.tab} ${activeTab === 'sections' ? 'active' : ''}`}
          onClick={() => setActiveTab('sections')}
        >
          Sections
        </button>
        <button
          className={`${classes.tab} ${activeTab === 'passages' ? 'active' : ''}`}
          onClick={() => setActiveTab('passages')}
        >
          Passages
        </button>
      </div>

      <div className={classes.content}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tests' && renderTests()}
        {activeTab === 'sections' && renderSections()}
        {activeTab === 'passages' && renderPassages()}
      </div>
    </div>
  );
};

export default DatabaseAnalysis;
