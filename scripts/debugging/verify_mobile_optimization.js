/**
 * Mobile Optimization Verification
 * Checks all key components and pages for mobile responsiveness
 */

const fs = require('fs');
const path = require('path');

const filesToCheck = [
  // Landing Page
  'src/styles/landing/LandingPage.styles.js',

  // Main Pages
  'src/pages/AuthPage.jsx',
  'src/pages/ProfilePage.jsx',
  'src/pages/SettingsPage.jsx',
  'src/pages/UpgradePage.jsx',
  'src/pages/InsightsPage.jsx',

  // Components
  'src/components/DiagnosticTest.jsx',
  'src/components/GoalsSettings.jsx',
  'src/components/Sidebar.js',
  'src/components/AllLessonsNavigator.js',

  // Auth Components
  'src/components/auth/Login.jsx',
  'src/components/auth/Signup.jsx',
  'src/styles/auth/login.styles.js',

  // Layouts
  'src/layouts/AppLayout.jsx',
];

const mobileBreakpoints = [
  '@media (max-width: 768px)',
  '@media (max-width: 480px)',
  '@media (max-width: 640px)',
  '@media (max-width: 1024px)',
];

const mobileOptimizationPatterns = {
  // Good patterns
  good: [
    /fontSize.*px/,
    /padding.*px/,
    /margin.*px/,
    /width.*%/,
    /maxWidth.*px/,
    /flexDirection.*column/,
    /display.*flex/,
    /gridTemplateColumns.*1fr/,
  ],

  // Potentially problematic patterns
  warnings: [
    /position.*fixed/,
    /width.*100vw/,
    /overflow.*hidden/,
    /minWidth.*px/,
  ]
};

function analyzeFile(filePath) {
  const fullPath = path.join('/Users/cadenchiang/Desktop/act-prep-react', filePath);

  if (!fs.existsSync(fullPath)) {
    return {
      file: filePath,
      exists: false,
      hasMobileStyles: false,
      breakpoints: [],
      issues: ['File not found']
    };
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  // Find mobile breakpoints
  const breakpoints = [];
  const breakpointLines = {};

  mobileBreakpoints.forEach(bp => {
    lines.forEach((line, idx) => {
      if (line.includes(bp)) {
        breakpoints.push(bp);
        if (!breakpointLines[bp]) {
          breakpointLines[bp] = [];
        }
        breakpointLines[bp].push(idx + 1);
      }
    });
  });

  // Check for responsive patterns
  const responsivePatterns = {
    hasFlexbox: /display.*flex/.test(content),
    hasGrid: /display.*grid/.test(content),
    hasPercentWidth: /width.*\d+%/.test(content),
    hasMaxWidth: /maxWidth/.test(content),
    hasMediaQueries: breakpoints.length > 0,
  };

  // Find potential issues
  const issues = [];

  // Check for fixed widths without mobile overrides
  const fixedWidthRegex = /width:\s*'\d+px'/g;
  const fixedWidths = content.match(fixedWidthRegex) || [];

  if (fixedWidths.length > 0 && breakpoints.length === 0) {
    issues.push(`Has ${fixedWidths.length} fixed widths but no mobile breakpoints`);
  }

  // Check for viewport overflow
  if (content.includes('100vw') && !content.includes('overflowX: \'hidden\'')) {
    issues.push('Uses 100vw without overflow-x: hidden');
  }

  // Check for small touch targets
  if (content.includes('padding') && content.includes('@media')) {
    // Good - has responsive padding
  } else if (content.includes('padding') && /padding.*\d+px/.test(content)) {
    const smallPadding = content.match(/padding.*['"](\d+)px['"]/g);
    if (smallPadding && smallPadding.some(p => parseInt(p.match(/\d+/)[0]) < 12)) {
      issues.push('Has small padding values that may affect touch targets');
    }
  }

  return {
    file: filePath,
    exists: true,
    hasMobileStyles: breakpoints.length > 0,
    breakpoints: [...new Set(breakpoints)],
    breakpointCount: breakpoints.length,
    breakpointLines,
    responsivePatterns,
    issues,
    score: calculateScore(breakpoints.length, responsivePatterns, issues.length)
  };
}

function calculateScore(breakpointCount, patterns, issueCount) {
  let score = 0;

  // Points for mobile breakpoints
  score += Math.min(breakpointCount * 10, 40);

  // Points for responsive patterns
  if (patterns.hasFlexbox) score += 15;
  if (patterns.hasGrid) score += 10;
  if (patterns.hasPercentWidth) score += 10;
  if (patterns.hasMaxWidth) score += 10;
  if (patterns.hasMediaQueries) score += 15;

  // Deduct for issues
  score -= issueCount * 5;

  return Math.max(0, Math.min(100, score));
}

function main() {
  console.log('MOBILE OPTIMIZATION VERIFICATION');
  console.log('='.repeat(70));
  console.log('Checking all key files for mobile responsiveness...\n');

  const results = filesToCheck.map(analyzeFile);

  // Summary
  console.log('\nDETAILED RESULTS:');
  console.log('='.repeat(70));

  results.forEach(result => {
    const emoji = result.score >= 80 ? '✅' : result.score >= 60 ? '⚠️' : '❌';
    const scoreColor = result.score >= 80 ? 'GOOD' : result.score >= 60 ? 'OK' : 'NEEDS WORK';

    console.log(`\n${emoji} ${result.file}`);

    if (!result.exists) {
      console.log('  ❌ File not found');
      return;
    }

    console.log(`  Score: ${result.score}/100 (${scoreColor})`);
    console.log(`  Mobile breakpoints: ${result.breakpointCount}`);

    if (result.breakpoints.length > 0) {
      result.breakpoints.forEach(bp => {
        const lines = result.breakpointLines[bp];
        console.log(`    ${bp}: ${lines.length} instances (lines: ${lines.slice(0, 3).join(', ')}${lines.length > 3 ? '...' : ''})`);
      });
    } else {
      console.log('    ⚠️  No mobile breakpoints found');
    }

    console.log(`  Responsive patterns:`);
    console.log(`    Flexbox: ${result.responsivePatterns.hasFlexbox ? '✓' : '✗'}`);
    console.log(`    Grid: ${result.responsivePatterns.hasGrid ? '✓' : '✗'}`);
    console.log(`    Percent widths: ${result.responsivePatterns.hasPercentWidth ? '✓' : '✗'}`);
    console.log(`    Max-width: ${result.responsivePatterns.hasMaxWidth ? '✓' : '✗'}`);

    if (result.issues.length > 0) {
      console.log(`  Issues:`);
      result.issues.forEach(issue => console.log(`    ⚠️  ${issue}`));
    } else {
      console.log(`  ✓ No issues found`);
    }
  });

  // Overall summary
  console.log('\n' + '='.repeat(70));
  console.log('SUMMARY');
  console.log('='.repeat(70));

  const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
  const filesWithMobile = results.filter(r => r.hasMobileStyles).length;
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);

  console.log(`\nOverall Score: ${avgScore.toFixed(1)}/100`);
  console.log(`Files with mobile styles: ${filesWithMobile}/${results.length}`);
  console.log(`Total issues found: ${totalIssues}`);

  console.log('\nRecommendations:');
  if (avgScore >= 80) {
    console.log('✅ Excellent mobile optimization!');
  } else if (avgScore >= 60) {
    console.log('⚠️  Good mobile support, but some improvements needed');
  } else {
    console.log('❌ Significant mobile optimization work needed');
  }

  const filesNeedingWork = results.filter(r => r.score < 60);
  if (filesNeedingWork.length > 0) {
    console.log('\nFiles needing mobile optimization:');
    filesNeedingWork.forEach(r => {
      console.log(`  - ${r.file} (score: ${r.score})`);
    });
  }

  console.log('\n' + '='.repeat(70));
}

main();
