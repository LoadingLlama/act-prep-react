#!/bin/bash

echo "Uploading all ACT-style examples..."
echo ""

echo "1/4 Uploading 2.1 examples..."
node upload-science-2.1-examples.mjs
echo ""

echo "2/4 Uploading 2.2 examples..."
node upload-science-2.2-examples.mjs
echo ""

echo "3/4 Uploading 2.3 examples..."
node upload-science-2.3-examples.mjs
echo ""

echo "4/4 Uploading 2.4 examples..."
node upload-science-2.4-all.mjs
echo ""

echo "✓ All ACT-style examples uploaded successfully!"
echo "  - Bigger containers (3.5rem 3rem padding, 900px max-width)"
echo "  - Smaller tables (13px font, compact spacing)"
echo "  - 20px figure titles"
