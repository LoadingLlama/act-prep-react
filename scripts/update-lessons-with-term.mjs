#!/usr/bin/env node

import fs from 'fs';

const files = ['PacketLesson_1_1.jsx', 'PacketLesson_1_2.jsx', 'PacketLesson_1_3.jsx'];

files.forEach(file => {
  const path = 'src/components/lesson/' + file;
  let content = fs.readFileSync(path, 'utf8');

  // Add Term import if not already present
  if (!content.includes("import Term from './Term'")) {
    content = content.replace(
      /import \{ useTermTooltips \} from '\.\.\/\.\.\/hooks\/useTermTooltips';/,
      "import { useTermTooltips } from '../../hooks/useTermTooltips';\nimport Term from './Term';"
    );
  }

  // Replace inline styled terms
  const regex = /<strong style=\{\{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' \}\}>([^<]+)<\/strong>/g;
  const before = (content.match(regex) || []).length;
  content = content.replace(regex, '<Term>$1</Term>');

  fs.writeFileSync(path, content, 'utf8');
  console.log(`✓ ${file}: ${before} terms updated`);
});

console.log('\n✓ All lessons updated with Term component');
