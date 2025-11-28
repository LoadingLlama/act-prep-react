#!/bin/bash

cd /Users/cadenchiang/Desktop/act-prep-react/src

# Counter for modified files
modified=0

for file in $(find . -name "*.js" -o -name "*.jsx" | grep -v node_modules | grep -v ".backup"); do
  # Check if file has borders
  if grep -q "border:" "$file" || grep -q "outline:" "$file"; then
    echo "Processing: $file"

    # Remove border: 'none' and border: "none"
    sed -i '' "/border: 'none',/d" "$file"
    sed -i '' '/border: "none",/d' "$file"

    # Remove outline: 'none' and outline: "none"
    sed -i '' "/outline: 'none',/d" "$file"
    sed -i '' '/outline: "none",/d' "$file"

    # Replace border: '1px solid #color' with boxShadow: '0 0 0 1px #color'
    sed -i '' "s/border: '\([0-9]*px\) solid \(#[^']*\)'/boxShadow: '0 0 0 \1 \2'/g" "$file"
    sed -i '' 's/border: "\([0-9]*px\) solid \(#[^"]*\)"/boxShadow: "0 0 0 \1 \2"/g' "$file"

    # Replace borderTop: '2px solid #color' with boxShadow: '0 -2px 0 0 #color'
    sed -i '' "s/borderTop: '\([0-9]*px\) solid \(#[^']*\)'/boxShadow: '0 -\1 0 0 \2'/g" "$file"
    sed -i '' 's/borderTop: "\([0-9]*px\) solid \(#[^"]*\)"/boxShadow: "0 -\1 0 0 \2"/g' "$file"

    # Replace borderBottom: '2px solid #color' with boxShadow: '0 2px 0 0 #color'
    sed -i '' "s/borderBottom: '\([0-9]*px\) solid \(#[^']*\)'/boxShadow: '0 \1 0 0 \2'/g" "$file"
    sed -i '' 's/borderBottom: "\([0-9]*px\) solid \(#[^"]*\)"/boxShadow: "0 \1 0 0 \2"/g' "$file"

    # Replace borderLeft: '2px solid #color' with boxShadow: '-2px 0 0 0 #color'
    sed -i '' "s/borderLeft: '\([0-9]*px\) solid \(#[^']*\)'/boxShadow: '-\1 0 0 0 \2'/g" "$file"
    sed -i '' 's/borderLeft: "\([0-9]*px\) solid \(#[^"]*\)"/boxShadow: "-\1 0 0 0 \2"/g' "$file"

    # Replace borderRight: '2px solid #color' with boxShadow: '2px 0 0 0 #color'
    sed -i '' "s/borderRight: '\([0-9]*px\) solid \(#[^']*\)'/boxShadow: '\1 0 0 0 \2'/g" "$file"
    sed -i '' 's/borderRight: "\([0-9]*px\) solid \(#[^"]*\)"/boxShadow: "\1 0 0 0 \2"/g' "$file"

    modified=$((modified + 1))
  fi
done

echo ""
echo "Modified $modified files"
