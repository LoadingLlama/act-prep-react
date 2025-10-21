#!/bin/bash

# Transform examples to ultra-wide, no-background style

echo "Transforming examples to ULTRA-WIDE style..."
echo "  - Removing gray background boxes"
echo "  - Making almost full screen width"
echo "  - More compact vertical spacing"
echo ""

for file in upload-science-2.{1,2,3,4}*.mjs; do
  if [ -f "$file" ]; then
    echo "Processing $file..."

    # Backup
    cp "$file" "${file}.v1-backup"

    # Apply ultra-wide transformations
    sed -i '' \
      -e 's/<div style="background-color: #f3f4f6; padding: 3\.5rem 3rem; max-width: 900px; border: 2px solid #d1d5db; border-radius: 8px; margin: 2rem 0;">/<div style="padding: 0; margin: 2.5rem 0; max-width: 100%;">/g' \
      -e 's/font-size: 20px; margin-bottom: 1\.5rem; color: #1f2937;">Figure/font-size: 18px; margin-bottom: 1rem; color: #1f2937;">Figure/g' \
      -e 's/font-size: 20px; margin-bottom: 1\.5rem; color: #1f2937;">Table/font-size: 18px; margin-bottom: 1rem; color: #1f2937;">Table/g' \
      -e 's/margin-bottom: 1rem; font-size: 13px;/margin-bottom: 0.75rem; font-size: 14px;/g' \
      -e 's/margin-top: 2rem; font-weight: 600; font-size: 16px;/margin-top: 2rem; font-weight: 600; font-size: 17px;/g' \
      -e 's/margin-top: 1\.5rem; font-size: 13px;/margin-top: 1rem; font-size: 13px;/g' \
      "$file"

    echo "  ✓ Transformed $file"
  fi
done

echo ""
echo "✓ All examples transformed to ULTRA-WIDE style!"
echo "  - No gray backgrounds"
echo "  - Almost full screen width"
echo "  - Compact, clean layout"
