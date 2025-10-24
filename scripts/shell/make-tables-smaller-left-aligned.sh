#!/bin/bash

# Make tables smaller and left-aligned
# - Remove width: 100%
# - Tables will be only as wide as needed
# - Remove white container div entirely

echo "Making tables smaller and left-aligned..."
echo ""

for file in upload-science-2.{1,2,3,4,5,6,7}*.mjs; do
  if [ -f "$file" ]; then
    echo "Processing $file..."

    # Backup
    cp "$file" "${file}.before-small-left"

    # Transform 1: Remove white container div
    sed -i '' \
      -e 's/<div style="padding: 0; margin: 4rem auto; max-width: 1400px; width: 95%; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">//' \
      -e 's/<\/div>$//g' \
      "$file"

    # Transform 2: Change table width from 100% to auto (left-aligned, compact)
    sed -i '' \
      -e 's/width: 100%; border-collapse: collapse;/width: auto; border-collapse: collapse;/g' \
      "$file"

    echo "  ✓ Made tables smaller and left-aligned in $file"
  fi
done

echo ""
echo "✓ Tables now smaller and left-aligned!"
echo "  - width: auto (was 100%)"
echo "  - Tables only as wide as content"
echo "  - Left-aligned in modal"
echo "  - No white container wrapper"
