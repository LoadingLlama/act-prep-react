/**
 * Check for mobile width issues that could cause horizontal overflow on iPhone
 * iPhone widths: iPhone SE=375px, iPhone 12/13=390px, iPhone 14 Pro Max=430px
 */

const fs = require('fs');

const filesToCheck = [
  'src/styles/landing/LandingPage.styles.js',
  'src/styles/App.styles.js',
  'src/styles/app/layout.styles.js',
];

const problematicPatterns = {
  // Things that commonly cause horizontal overflow
  fixed100vw: /width:\s*['"]100vw['"]/g,
  largeFixedWidths: /(?:width|minWidth|maxWidth):\s*['"](\d{4,})px['"]/g,
  noOverflowHidden: /maxWidth:\s*['"]100vw['"](?!.*overflowX)/g,
  largePadding: /padding:\s*['"](\d+)px/g,
  largeMargin: /margin.*['"](\d+)px/g,
  calcWithoutConstraint: /calc\([^)]*100vw[^)]*\)(?!.*max-width)/g,
};

function analyzeFile(filePath) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`ANALYZING: ${filePath}`);
  console.log('='.repeat(70));

  const fullPath = `/Users/cadenchiang/Desktop/act-prep-react/${filePath}`;

  if (!fs.existsSync(fullPath)) {
    console.log('❌ File not found');
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  let issuesFound = 0;

  // Check for 100vw usage
  const vwMatches = content.match(problematicPatterns.fixed100vw);
  if (vwMatches) {
    console.log(`\n⚠️  Found ${vwMatches.length} instances of width: 100vw`);
    vwMatches.forEach(match => {
      const lineNum = lines.findIndex(line => line.includes(match));
      console.log(`   Line ${lineNum + 1}: ${match}`);
      issuesFound++;
    });
  }

  // Check for very large fixed widths
  const largeWidthMatches = [...content.matchAll(problematicPatterns.largeFixedWidths)];
  if (largeWidthMatches.length > 0) {
    console.log(`\n⚠️  Found ${largeWidthMatches.length} very large fixed widths (>=1000px)`);
    largeWidthMatches.forEach(match => {
      const lineNum = lines.findIndex(line => line.includes(match[0]));
      console.log(`   Line ${lineNum + 1}: ${match[0]} (${match[1]}px might be too wide for mobile)`);
      issuesFound++;
    });
  }

  // Check for elements with maxWidth 100vw without overflow handling
  if (content.includes('100vw') && !content.includes("overflowX: 'hidden'")) {
    console.log(`\n⚠️  Uses 100vw but doesn't have overflowX: 'hidden'`);
    issuesFound++;
  }

  // Check padding/margin in mobile breakpoints
  const mobileSection = content.match(/@media \(max-width: 768px\)[^}]*{([^}]*)}/g);
  if (mobileSection) {
    mobileSection.forEach((section, idx) => {
      const largePadding = section.match(/padding:\s*['"](\d+)px['"]/g);
      if (largePadding) {
        largePadding.forEach(pad => {
          const value = parseInt(pad.match(/\d+/)[0]);
          if (value > 24) {
            console.log(`\n⚠️  Large padding in mobile breakpoint: ${pad}`);
            issuesFound++;
          }
        });
      }
    });
  }

  // Check for specific problematic patterns
  const problematicLines = [];

  lines.forEach((line, idx) => {
    // Check for container widths
    if (line.includes('container') && line.includes('width')) {
      problematicLines.push({ line: idx + 1, content: line.trim(), issue: 'Container width definition' });
    }

    // Check for navbar/header widths
    if ((line.includes('navbar') || line.includes('header')) && line.includes('width')) {
      problematicLines.push({ line: idx + 1, content: line.trim(), issue: 'Navbar/Header width' });
    }

    // Check for sticky elements with width
    if (line.includes('sticky') && (line.includes('width') || line.includes('left') || line.includes('right'))) {
      problematicLines.push({ line: idx + 1, content: line.trim(), issue: 'Sticky element positioning' });
    }

    // Check for calc() with viewport units
    if (line.includes('calc') && line.includes('vw')) {
      problematicLines.push({ line: idx + 1, content: line.trim(), issue: 'calc() with viewport width' });
    }
  });

  if (problematicLines.length > 0) {
    console.log(`\n⚠️  Potentially problematic lines for mobile:`);
    problematicLines.forEach(item => {
      console.log(`   Line ${item.line} (${item.issue}): ${item.content.substring(0, 80)}...`);
    });
    issuesFound += problematicLines.length;
  }

  // Check for specific iPhone-safe patterns
  console.log(`\n✓ iPhone-Safe Patterns:`);
  const safePatterns = {
    hasMaxWidth: /@media.*max-width.*768px/g.test(content),
    hasOverflowHidden: /overflowX:\s*['"]hidden['"]/g.test(content),
    hasPercentWidths: /width:\s*['"]100%['"]/g.test(content),
    hasFlexbox: /display:\s*['"]flex['"]/g.test(content),
  };

  console.log(`   Has mobile breakpoints: ${safePatterns.hasMaxWidth ? '✓' : '✗'}`);
  console.log(`   Has overflow-x hidden: ${safePatterns.hasOverflowHidden ? '✓' : '✗'}`);
  console.log(`   Uses percentage widths: ${safePatterns.hasPercentWidths ? '✓' : '✗'}`);
  console.log(`   Uses flexbox: ${safePatterns.hasFlexbox ? '✓' : '✗'}`);

  if (issuesFound === 0) {
    console.log(`\n✅ No critical width issues found!`);
  } else {
    console.log(`\n⚠️  Found ${issuesFound} potential width issues`);
  }

  return issuesFound;
}

function main() {
  console.log('CHECKING FOR MOBILE WIDTH ISSUES ON iPHONE');
  console.log('='.repeat(70));
  console.log('Target widths: iPhone SE (375px), iPhone 12/13 (390px), iPhone 14 Pro Max (430px)');

  let totalIssues = 0;

  filesToCheck.forEach(file => {
    const issues = analyzeFile(file);
    totalIssues += issues || 0;
  });

  console.log(`\n${'='.repeat(70)}`);
  console.log('SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total potential issues: ${totalIssues}`);

  if (totalIssues === 0) {
    console.log('✅ No critical width issues found!');
  } else {
    console.log('\n⚠️  Recommendations:');
    console.log('1. Add overflowX: "hidden" to body and container elements');
    console.log('2. Use max-width with percentage values instead of fixed widths');
    console.log('3. Reduce padding on mobile (max 20px for containers)');
    console.log('4. Wrap calc() expressions with max-width constraints');
    console.log('5. Test on actual iPhone or use Chrome DevTools iPhone simulation');
  }

  console.log('\nTo test on Chrome DevTools:');
  console.log('1. Open DevTools (F12)');
  console.log('2. Click Toggle Device Toolbar (Ctrl+Shift+M)');
  console.log('3. Select "iPhone SE", "iPhone 12 Pro", or "iPhone 14 Pro Max"');
  console.log('4. Refresh page and check for horizontal scroll');
}

main();
