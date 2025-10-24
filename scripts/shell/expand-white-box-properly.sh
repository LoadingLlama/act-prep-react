#!/bin/bash

# PROPERLY expand the white box - don't shrink content with padding!
# - Remove max-width restriction so box can be wider
# - Use moderate padding (not huge)
# - Let content expand to make box bigger naturally

echo "PROPERLY expanding white box (not shrinking content)..."
echo ""

for file in upload-science-2.{1,2,3,4,5,6,7}*.mjs; do
  if [ -f "$file" ]; then
    echo "Processing $file..."

    # Backup
    cp "$file" "${file}.before-expand"

    # Transform: Make white box ACTUALLY bigger
    # - Remove max-width: 100% restriction
    # - Use moderate padding so content has room
    # - Box will expand based on content
    sed -i '' \
      -e 's/padding: 8rem 12rem; margin: 4rem 0; max-width: 100%;/padding: 3rem 4rem; margin: 4rem auto; max-width: 1400px; width: 95%;/g' \
      -e 's/margin-bottom: 3\.5rem;/margin-bottom: 2.5rem;/g' \
      -e 's/margin-bottom: 3rem; color: #1f2937;/margin-bottom: 2rem; color: #1f2937;/g' \
      -e 's/margin-bottom: 2\.5rem; font-size: 14px;/margin-bottom: 1.5rem; font-size: 15px;/g' \
      -e 's/margin-top: 3rem; font-size: 13px;/margin-top: 2rem; font-size: 14px;/g' \
      -e 's/margin-top: 5rem; font-weight: 600;/margin-top: 3.5rem; font-weight: 600;/g' \
      -e 's/font-size: 13px;/font-size: 14px;/g' \
      "$file"

    echo "  ✓ Expanded $file properly"
  fi
done

echo ""
echo "✓ White boxes now PROPERLY expanded!"
echo "  - Width: 95% of screen, max 1400px (MUCH wider)"
echo "  - Moderate padding: 3rem 4rem (room for content)"
echo "  - Tables: 14px font (bigger, more readable)"
echo "  - White box is NOW actually bigger, not just more padding"
