#!/usr/bin/env python3
"""
Script to replace all border declarations with boxShadow equivalents in JS/JSX files.
Handles complex patterns including template literals, ternary operators, and dynamic values.
"""

import re
import os
import glob

def replace_borders_in_file(filepath):
    """Replace all border declarations in a single file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        modified = False

        # Pattern 1: border: 'none' or border: "none" - just remove these lines
        content = re.sub(r",?\s*border:\s*['\"]none['\"],?\s*\n", "\n", content)

        # Pattern 2: Simple borders with quoted values
        # border: '1px solid #color' -> boxShadow: '0 0 0 1px #color'
        content = re.sub(
            r"border:\s*['\"](\d+px)\s+solid\s+(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))['\"]",
            r"boxShadow: '0 0 0 \1 \2'",
            content
        )

        # Pattern 3: Template literal borders
        # border: `2px solid ${color}` -> boxShadow: `0 0 0 2px ${color}`
        content = re.sub(
            r"border:\s*`(\d+px)\s+solid\s+([^`]+)`",
            r"boxShadow: `0 0 0 \1 \2`",
            content
        )

        # Pattern 4: Ternary borders - isSelected ? 'border' : 'border2'
        # border: condition ? '2px solid #color1' : '2px solid #color2'
        # -> boxShadow: condition ? '0 0 0 2px #color1' : '0 0 0 2px #color2'
        content = re.sub(
            r"border:\s*([^\n]+\?)\s*['\"](\d+px)\s+solid\s+([^'\"]+)['\"](\s*:)\s*['\"](\d+px)\s+solid\s+([^'\"]+)['\"]",
            r"boxShadow: \1 '0 0 0 \2 \3'\4 '0 0 0 \5 \6'",
            content
        )

        # Pattern 5: borderTop with simple values
        content = re.sub(
            r"borderTop:\s*['\"](\d+px)\s+solid\s+(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))['\"]",
            r"boxShadow: '0 -\1 0 0 \2'",
            content
        )

        # Pattern 6: borderBottom with simple values
        content = re.sub(
            r"borderBottom:\s*['\"](\d+px)\s+solid\s+(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))['\"]",
            r"boxShadow: '0 \1 0 0 \2'",
            content
        )

        # Pattern 7: borderLeft with simple values
        content = re.sub(
            r"borderLeft:\s*['\"](\d+px)\s+solid\s+(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))['\"]",
            r"boxShadow: '-\1 0 0 0 \2'",
            content
        )

        # Pattern 8: borderRight with simple values
        content = re.sub(
            r"borderRight:\s*['\"](\d+px)\s+solid\s+(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))['\"]",
            r"boxShadow: '\1 0 0 0 \2'",
            content
        )

        # Pattern 9: borderBottom: 'none' - remove
        content = re.sub(r",?\s*borderBottom:\s*['\"]none['\"],?\s*\n", "\n", content)
        content = re.sub(r",?\s*borderLeft:\s*['\"]none['\"],?\s*\n", "\n", content)

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True

        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    """Find and process all JS/JSX files."""
    src_dir = "/Users/cadenchiang/Desktop/act-prep-react/src"
    patterns = ["**/*.js", "**/*.jsx"]

    modified_count = 0

    for pattern in patterns:
        for filepath in glob.glob(os.path.join(src_dir, pattern), recursive=True):
            # Skip backup files and node_modules
            if ".backup" in filepath or "node_modules" in filepath:
                continue

            if replace_borders_in_file(filepath):
                print(f"Modified: {filepath}")
                modified_count += 1

    print(f"\nTotal files modified: {modified_count}")

if __name__ == "__main__":
    main()
