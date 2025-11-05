import React, { useState, useEffect, useRef } from 'react';
import { statsStyles } from '../../styles/landing/stats.styles';
import { chartData, stats } from '../../data/landingPageData';

const StatsSection = () => {
  const [animatedBars, setAnimatedBars] = useState(false);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedBars(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (chartContainerRef.current) {
      observer.observe(chartContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="stats-section" style={statsStyles.statsSection}>
      <div style={statsStyles.container}>
        <h2 style={statsStyles.title}>Proven Results</h2>
        <p style={statsStyles.subtitle}>
          Our students consistently outperform traditional prep methods
        </p>

        <div style={statsStyles.statsGrid}>
          <div style={statsStyles.statCard}>
            <div style={statsStyles.statNumber}>{stats.studentsHelped.toLocaleString()}+</div>
            <div style={statsStyles.statLabel}>Students Helped</div>
          </div>
          <div style={statsStyles.statCard}>
            <div style={statsStyles.statNumber}>+{stats.averageImprovement}</div>
            <div style={statsStyles.statLabel}>Average Score Improvement</div>
          </div>
          <div style={statsStyles.statCard}>
            <div style={statsStyles.statNumber}>{stats.successRate}%</div>
            <div style={statsStyles.statLabel}>Success Rate</div>
          </div>
          <div style={statsStyles.statCard}>
            <div style={statsStyles.statNumber}>{stats.satisfactionRate}%</div>
            <div style={statsStyles.statLabel}>Student Satisfaction</div>
          </div>
        </div>

        <div ref={chartContainerRef} style={statsStyles.chartContainer}>
          <h3 style={statsStyles.chartTitle}>Performance Over Time</h3>
          <div style={statsStyles.chart}>
            {chartData.map((data, index) => (
              <div key={index} style={statsStyles.chartBar}>
                <div style={statsStyles.barContainer}>
                  <div
                    style={{
                      ...statsStyles.barTraditional,
                      height: animatedBars ? `${data.traditional}%` : '0%'
                    }}
                    title={data.tooltip}
                  />
                  <div
                    style={{
                      ...statsStyles.barLaunchPrep,
                      height: animatedBars ? `${data.nomiAcademy}%` : '0%'
                    }}
                    title={data.tooltip}
                  />
                </div>
                <div style={statsStyles.barLabel}>Week {data.week}</div>
              </div>
            ))}
          </div>
          <div style={statsStyles.chartLegend}>
            <div style={statsStyles.legendItem}>
              <span style={statsStyles.legendDotTraditional}></span>
              Traditional Prep
            </div>
            <div style={statsStyles.legendItem}>
              <span style={statsStyles.legendDotLaunchPrep}></span>
              Nomi Academy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;