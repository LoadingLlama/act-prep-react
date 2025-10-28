#!/bin/bash

# PRACTICE TEST 7 EXTRACTION HELPER
# This script helps identify section boundaries in the source file

SOURCE_FILE="/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 7.txt"

echo "==================================================================="
echo "PRACTICE TEST 7 - SECTION BOUNDARY ANALYSIS"
echo "==================================================================="

echo -e "\n📝 ENGLISH SECTION:"
grep -n "^PASSAGE" "$SOURCE_FILE" | head -10

echo -e "\n🔢 MATH SECTION:"
grep -n "MATH TEST" "$SOURCE_FILE"
grep -n "DO YOUR FIGURING HERE" "$SOURCE_FILE" | head -5

echo -e "\n📖 READING SECTION:"
grep -n "READING TEST" "$SOURCE_FILE"

echo -e "\n🔬 SCIENCE SECTION:"
grep -n "SCIENCE TEST" "$SOURCE_FILE"

echo -e "\n📊 ANSWER KEY LOCATION:"
grep -n "ANSWER KEY" "$SOURCE_FILE"

echo -e "\n==================================================================="
echo "Total lines: $(wc -l < "$SOURCE_FILE")"
echo "==================================================================="
