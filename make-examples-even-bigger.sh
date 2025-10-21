#!/bin/bash

# Make white example boxes MUCH BIGGER (wider and taller)
# - HUGE padding to make white box bigger
# - Even more spacing between elements

echo "Making example boxes MUCH BIGGER (wider and taller)..."
echo ""

for file in upload-science-2.{1,2,3,4,5,6,7}*.mjs; do
  if [ -f "$file" ]; then
    echo "Processing $file..."

    # Backup
    cp "$file" "${file}.before-bigger"

    # Transform: Make white box MUCH BIGGER
    sed -i '' \
      -e 's/padding: 4rem 5rem;/padding: 8rem 12rem;/g' \
      -e 's/margin: 3rem 0;/margin: 4rem 0;/g' \
      -e 's/margin-bottom: 2\.5rem;/margin-bottom: 3.5rem;/g' \
      -e 's/margin-bottom: 2rem;/margin-bottom: 3rem;/g' \
      -e 's/margin-bottom: 1\.5rem;/margin-bottom: 2.5rem;/g' \
      -e 's/margin-top: 2rem;/margin-top: 3rem;/g' \
      -e 's/margin-top: 3\.5rem;/margin-top: 5rem;/g' \
      "$file"

    echo "  ✓ Made $file MUCH BIGGER"
  fi
done

echo ""
echo "✓ All example boxes are now MUCH BIGGER!"
echo "  - Padding: 8rem 12rem (HUGE white space)"
echo "  - All internal spacing increased"
echo "  - White box is now MUCH wider and taller"
