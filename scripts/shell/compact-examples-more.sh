#!/bin/bash

# Make examples more compact
# - Reduce margins between elements
# - Tighter spacing overall

echo "Making examples more compact..."
echo ""

for file in upload-science-2.{1,2,3,4,5,6,7}*.mjs; do
  if [ -f "$file" ]; then
    echo "Processing $file..."

    # Backup
    cp "$file" "${file}.before-compact"

    # Transform: Reduce all spacing
    sed -i '' \
      -e 's/margin-bottom: 2\.5rem;/margin-bottom: 1.5rem;/g' \
      -e 's/margin-bottom: 2rem;/margin-bottom: 1.2rem;/g' \
      -e 's/margin-bottom: 1\.5rem;/margin-bottom: 1rem;/g' \
      -e 's/margin-top: 2rem;/margin-top: 1.2rem;/g' \
      -e 's/margin-top: 3\.5rem;/margin-top: 2.5rem;/g' \
      -e 's/margin: 4rem auto;/margin: 2rem auto;/g' \
      "$file"

    echo "  ✓ Compacted $file"
  fi
done

echo ""
echo "✓ Examples now more compact!"
echo "  - Reduced all margins"
echo "  - Tighter spacing overall"
echo "  - More content fits on screen"
