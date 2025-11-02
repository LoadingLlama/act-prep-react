#!/bin/bash

###############################################################################
# Git History Cleanup Script
# Purpose: Remove .env file from entire git history
# WARNING: This rewrites git history and is destructive!
###############################################################################

set -e  # Exit on error

echo "🔒 Git History Cleanup Script"
echo "================================"
echo ""
echo "⚠️  WARNING: This script will:"
echo "   1. Rewrite your entire git history"
echo "   2. Remove .env file from all commits"
echo "   3. Require force push to remote"
echo ""
echo "Prerequisites:"
echo "   ✓ Backup repository created"
echo "   ✓ New Supabase keys generated and saved"
echo "   ✓ All team members notified (if any)"
echo ""

# Confirm user wants to proceed
read -p "Type 'CONFIRM' to proceed: " confirm
if [ "$confirm" != "CONFIRM" ]; then
    echo "❌ Aborted by user"
    exit 1
fi

echo ""
echo "📋 Step 1: Creating backup..."
BACKUP_DIR="${HOME}/Desktop/act-prep-react-BACKUP-$(date +%Y%m%d-%H%M%S)"
cp -r "/Users/cadenchiang/Desktop/act-prep-react" "$BACKUP_DIR"
echo "✅ Backup created at: $BACKUP_DIR"

echo ""
echo "📋 Step 2: Checking current git status..."
cd "/Users/cadenchiang/Desktop/act-prep-react"
git status

echo ""
echo "📋 Step 3: Removing .env from git history..."
echo "   This may take a few minutes..."
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

echo ""
echo "📋 Step 4: Cleaning up reflogs..."
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo ""
echo "📋 Step 5: Verifying .env is removed..."
if git log --all --full-history -- .env | grep -q "commit"; then
    echo "⚠️  WARNING: .env still found in history!"
    echo "   Check the output above for details"
    exit 1
else
    echo "✅ .env successfully removed from all git history"
fi

echo ""
echo "📋 Step 6: Checking .gitignore..."
if grep -q "^\.env$" .gitignore; then
    echo "✅ .env is in .gitignore"
else
    echo "⚠️  WARNING: .env not found in .gitignore"
fi

echo ""
echo "================================"
echo "✅ Git history cleanup complete!"
echo ""
echo "Next steps:"
echo "   1. Force push to remote:"
echo "      git push origin --force --all"
echo "      git push origin --force --tags"
echo ""
echo "   2. Update .env with new Supabase keys"
echo "   3. Test application"
echo "   4. Verify everything works"
echo ""
echo "⚠️  IMPORTANT:"
echo "   - Backup saved at: $BACKUP_DIR"
echo "   - Old commits are now unreachable"
echo "   - Anyone who cloned this repo must re-clone"
echo "================================"
