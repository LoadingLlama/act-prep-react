#!/bin/bash

# Quick start script to regenerate all 215 explanations
# Usage: ./run_regenerate.sh

set -e

echo "========================================="
echo "ACT Explanation Regeneration Script"
echo "========================================="
echo ""

# Check if API key is set
if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "ERROR: ANTHROPIC_API_KEY is not set!"
    echo ""
    echo "Please set your API key first:"
    echo "  export ANTHROPIC_API_KEY='sk-ant-your-key-here'"
    echo ""
    echo "Get your API key from: https://console.anthropic.com/settings/keys"
    exit 1
fi

echo "✓ API key is set"
echo ""

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install anthropic supabase --quiet
    echo "✓ Virtual environment created and packages installed"
else
    echo "✓ Virtual environment exists"
    source venv/bin/activate
fi

echo ""
echo "Starting regeneration of 215 explanations..."
echo "This will take approximately 4-5 minutes."
echo ""
echo "Progress will be shown below:"
echo "========================================="
echo ""

# Run the Python script
python3 generate_explanations.py

echo ""
echo "========================================="
echo "✓ Regeneration complete!"
echo ""
echo "Run this command to verify results:"
echo "  node verify_explanations.js"
echo "========================================="
