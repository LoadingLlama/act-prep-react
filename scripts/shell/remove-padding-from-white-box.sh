#!/bin/bash

# Remove padding from white box container
# Keep the size but remove internal padding so graph takes full space

echo "Removing padding from white box containers..."
echo ""

for file in upload-science-2.{1,2,3,4,5,6,7}*.mjs; do
  if [ -f "$file" ]; then
    echo "Processing $file..."

    # Backup
    cp "$file" "${file}.before-no-padding"

    # Transform: Remove padding from white box
    sed -i '' \
      -e 's/padding: 3rem 4rem; margin: 4rem auto;/padding: 0; margin: 4rem auto;/g' \
      "$file"

    echo "  ✓ Removed padding from $file"
  fi
done

echo ""
echo "✓ Padding removed from all white boxes!"
echo "  - Padding: 0 (was 3rem 4rem)"
echo "  - Graph/table now takes full width of white box"
