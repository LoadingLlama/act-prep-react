#!/bin/bash

# Add MORE WHITE SPACE to example boxes
# - Bigger padding around the entire example container
# - More spacing between elements
# - Keep font sizes the same

echo "Adding MORE WHITE SPACE to all example boxes..."
echo ""

for file in upload-science-2.{1,2,3,4,5,6,7}*.mjs; do
  if [ -f "$file" ]; then
    echo "Processing $file..."

    # Backup
    cp "$file" "${file}.before-whitespace"

    # Transform: Add MUCH more white space
    sed -i '' \
      -e 's/padding: 0; margin: 2\.5rem 0; max-width: 100%;/padding: 4rem 5rem; margin: 3rem 0; max-width: 100%; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.1);/g' \
      -e 's/margin-bottom: 1\.5rem;/margin-bottom: 2.5rem;/g' \
      -e 's/margin-bottom: 1rem; color: #1f2937;/margin-bottom: 2rem; color: #1f2937;/g' \
      -e 's/margin-bottom: 0\.75rem;/margin-bottom: 1.5rem;/g' \
      -e 's/margin-top: 1rem;/margin-top: 2rem;/g' \
      -e 's/margin-top: 2rem; font-weight: 600;/margin-top: 3.5rem; font-weight: 600;/g' \
      "$file"

    echo "  ✓ Added white space to $file"
  fi
done

echo ""
echo "✓ All example boxes now have MORE WHITE SPACE!"
echo "  - Padding: 4rem 5rem (was 0)"
echo "  - More spacing between all elements"
echo "  - Subtle shadow for definition"
