#!/bin/bash

# Fix remaining border patterns in JS/JSX files

# Fix dynamic borders with template literals - these are more complex
for file in $(find . -name "*.js" -o -name "*.jsx" | grep -v node_modules | grep -v ".backup"); do
  # Remove border: 'none' patterns  
  perl -i -pe "s/border: 'none'/\/\/ border: 'none'/g" "$file"
  
  # Fix hooks/useTermTooltips.js CSS string
  if [[ "$file" == *"useTermTooltips"* ]]; then
    sed -i '' 's/border: 1px solid #e5e7eb;/\/\/ border: 1px solid #e5e7eb; (removed)/g' "$file"
  fi
  
  # Fix TermDefinition.js
  if [[ "$file" == *"TermDefinition"* ]]; then
    sed -i '' "/border: 'none'/d" "$file"
  fi
done

echo "Fixed remaining border patterns"
