#!/bin/bash

# NBCON PRO Release Script
set -e

VERSION_TYPE=$1

if [ -z "$VERSION_TYPE" ]; then
    echo "Usage: ./scripts/release.sh [patch|minor|major]"
    exit 1
fi

echo "📦 Creating $VERSION_TYPE release..."

# Update version
pnpm version $VERSION_TYPE

# Get new version
VERSION=$(node -p "require('./package.json').version")

# Create git tag
git tag -a "v$VERSION" -m "NBCON PRO v$VERSION release"

# Push changes and tags
git push origin main
git push origin --tags

echo "✅ Release v$VERSION created and pushed!"

