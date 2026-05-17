#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   Before running this script, bump the version first:
#
#     npm version patch   # bug fixes
#     npm version minor   # new features
#     npm version major   # breaking changes
#
#   Then run:
#     yarn release:tag
#
#   If the script fails, fix the reported error, re-bump if needed, and run again.

PACKAGE_NAME=$(node -p "require('./package.json').name")
VERSION=$(node -p "require('./package.json').version")
TAG="v$VERSION"

echo ""
echo "Check if the new tag already exists"
git tag "$TAG"
echo ""

echo "🔍  Pre-release checks for $PACKAGE_NAME@$VERSION"
echo "---------------------------------------------------"

echo "▶  [1/6] Lint..."
yarn lint

echo "▶  [2/6] TypeScript check..."
yarn ts:check

echo "▶  [3/6] Build..."
yarn build

echo "▶  [4/6] npm whoami..."
npm whoami

echo "▶  [5/6] npm view $PACKAGE_NAME..."
npm view "$PACKAGE_NAME"

echo "▶  [6/6] Publish dry-run..."
npm publish --dry-run

echo ""
echo "✅  All checks passed. Creating git tag $TAG..."
echo ""
echo "Push it with:"
echo "  git push origin release/v$TAG --tags"
