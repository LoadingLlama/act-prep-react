#!/bin/bash

###############################################################################
# Git History Verification Script
# Purpose: Verify .env and sensitive data removed from git history
###############################################################################

echo "🔍 Git History Security Verification"
echo "====================================="
echo ""

cd "/Users/cadenchiang/Desktop/act-prep-react"

echo "📋 Check 1: Searching for .env file in git history..."
ENV_FOUND=$(git log --all --full-history -- .env 2>&1)
if [ -z "$ENV_FOUND" ]; then
    echo "✅ PASS: .env not found in git history"
else
    echo "❌ FAIL: .env still exists in git history"
    echo "$ENV_FOUND"
fi

echo ""
echo "📋 Check 2: Searching for 'SUPABASE' in commit messages..."
SUPABASE_COMMITS=$(git log --all --oneline | grep -i "supabase\|env\|secret\|key" || echo "")
if [ -z "$SUPABASE_COMMITS" ]; then
    echo "✅ PASS: No suspicious commit messages found"
else
    echo "⚠️  WARNING: Found commits mentioning keys/env:"
    echo "$SUPABASE_COMMITS"
fi

echo ""
echo "📋 Check 3: Checking .gitignore contains .env..."
if grep -q "^\.env$" .gitignore; then
    echo "✅ PASS: .env is in .gitignore"
else
    echo "❌ FAIL: .env not found in .gitignore"
fi

echo ""
echo "📋 Check 4: Verifying .env is not tracked..."
TRACKED=$(git ls-files | grep "^\.env$" || echo "")
if [ -z "$TRACKED" ]; then
    echo "✅ PASS: .env is not tracked by git"
else
    echo "❌ FAIL: .env is still tracked"
fi

echo ""
echo "📋 Check 5: Checking for .env in staged changes..."
STAGED=$(git diff --cached --name-only | grep "\.env" || echo "")
if [ -z "$STAGED" ]; then
    echo "✅ PASS: .env not in staged changes"
else
    echo "❌ FAIL: .env is staged for commit"
fi

echo ""
echo "📋 Check 6: Verifying .env file exists locally..."
if [ -f ".env" ]; then
    echo "✅ PASS: .env file exists (good for local development)"
else
    echo "⚠️  WARNING: .env file does not exist locally"
fi

echo ""
echo "====================================="
echo "📊 Verification Summary"
echo ""
echo "If all checks show ✅ PASS, your git history is clean!"
echo ""
echo "Next steps after verification:"
echo "   1. Ensure new API keys are in .env"
echo "   2. Test application locally"
echo "   3. Force push to remote"
echo "====================================="
