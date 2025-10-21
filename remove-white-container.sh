#!/bin/bash

# Remove the white container div entirely
# Just show content directly without wrapper

echo "Removing white container wrapper..."
echo ""

for file in upload-science-2.{1,2,3,4,5,6,7}*.mjs; do
  if [ -f "$file" ]; then
    echo "Processing $file..."

    # Backup
    cp "$file" "${file}.before-no-container"

    # Transform: Remove the entire white container div
    # Remove opening div tag
    sed -i '' \
      -e 's/<div style="padding: 0; margin: 4rem auto; max-width: 1400px; width: 95%; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">//' \
      "$file"

    # Remove closing div tag (the one before the question paragraph)
    sed -i '' \
      -e 's/<\/div>$//' \
      -e 's/<\/div>$/<p style="margin-top: 3.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">/; s/<p style="margin-top: 3.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">/<p style="margin-top: 3.5rem; font-weight: 600; font-size: 17px; color: #1f2937;">/' \
      "$file"

    echo "  ✓ Removed white container from $file"
  fi
done

echo ""
echo "✓ White container removed!"
echo "  - No wrapper div"
echo "  - Content shows directly"
