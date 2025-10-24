#!/bin/bash

# Transform all example files to use new ACT-style formatting
# Bigger containers, smaller tables

for file in upload-science-2.1-examples.mjs upload-science-2.2-examples.mjs upload-science-2.3-examples.mjs upload-science-2.4-all.mjs; do
  if [ -f "$file" ]; then
    echo "Transforming $file..."

    # Create backup
    cp "$file" "${file}.backup"

    # Apply transformations
    sed -i '' \
      -e 's/padding: 2rem;/padding: 3.5rem 3rem; max-width: 900px;/g' \
      -e 's/margin: 1\.5rem 0;/margin: 2rem 0;/g' \
      -e 's/font-size: 15px;/font-size: 13px;/g' \
      -e 's/padding: 1rem; border: 2px solid/padding: 0.6rem; border: 1px solid/g' \
      -e 's/padding: 0\.875rem;/padding: 0.5rem;/g' \
      -e 's/font-size: 18px; margin-bottom: 1\.5rem; color: #1f2937;">Figure/font-size: 20px; margin-bottom: 1.5rem; color: #1f2937;">Figure/g' \
      -e 's/font-size: 18px; margin-bottom: 1\.5rem; color: #1f2937;">Table/font-size: 20px; margin-bottom: 1.5rem; color: #1f2937;">Table/g' \
      "$file"

    echo "✓ Transformed $file"
  fi
done

echo ""
echo "✓ All example files transformed to ACT style!"
echo "New styling:"
echo "  - Containers: bigger (3.5rem 3rem padding, max-width 900px)"
echo "  - Tables: smaller (13px font, 0.5-0.6rem padding)"
echo "  - Figure titles: 20px (was 18px)"
