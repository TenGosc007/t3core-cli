#!/usr/bin/env bash
set -euo pipefail

# Canary release script for t3core-cli
# Usage: yarn canary-release <version>
# Example: yarn canary-release 1.6.0  →  publishes 1.6.0-canary.N to npm with tag "canary"
#
# Steps:
#   1. Pre-flight checks (git state, npm auth)
#   2. Parse base version argument
#   3. Determine next canary number from npm registry
#   4. Quality checks (lint, ts:check, test, build)
#   5. Temporarily bump package.json
#   6. Publish with --tag canary
#   7. Restore package.json

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

PACKAGE_NAME=$(node -p "require('./package.json').name")
CURRENT_VERSION=$(node -p "require('./package.json').version")

# ─── Colors ─────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

info()  { echo -e "${CYAN}▶  $1${NC}"; }
ok()    { echo -e "${GREEN}✅  $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠   $1${NC}"; }
err()   { echo -e "${RED}❌  $1${NC}"; }

cleanup() {
  if [[ -n "${BUMPED:-}" ]]; then
    git checkout -- package.json 2>/dev/null || true
    info "Restored package.json to version $CURRENT_VERSION"
  fi
}
trap cleanup EXIT

# ─── Step 1: Pre-flight checks ──────────────────────────
info "Pre-flight checks"

if [[ -n $(git status --porcelain package.json) ]]; then
  err "package.json has uncommitted changes. Commit or stash first."
  exit 1
fi

info "Checking npm authentication..."
if ! npm whoami &>/dev/null; then
  err "Not logged in to npm. Run: npm login"
  exit 1
fi
NPM_USER=$(npm whoami)
ok "Logged in as: $NPM_USER"

# ─── Step 2: Parse base version ─────────────────────────
BASE_VERSION="${1:-}"

if [[ -z "$BASE_VERSION" ]]; then
  err "No version provided."
  echo "Usage: yarn canary-release <version>"
  echo "Example: yarn canary-release 1.6.0"
  exit 1
fi

if [[ ! "$BASE_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  err "Invalid version: '$BASE_VERSION'. Expected semver (e.g. 1.6.0)"
  exit 1
fi

ok "Base version: $BASE_VERSION"

# ─── Step 3: Determine next canary number ───────────────
info "Querying npm for existing canary versions..."

EXISTING=$(npm view "$PACKAGE_NAME" versions --json 2>/dev/null || echo "[]")

CANARY_NUM=$(node -e "
  const existing = JSON.parse(process.argv[1] || '[]');
  const prefix = process.argv[2] + '-canary.';
  let max = 0;
  for (const v of existing) {
    if (v.startsWith(prefix)) {
      const n = parseInt(v.slice(prefix.length), 10);
      if (!isNaN(n) && n > max) max = n;
    }
  }
  console.log(max + 1);
" "$EXISTING" "$BASE_VERSION")

CANARY_VERSION="$BASE_VERSION-canary.$CANARY_NUM"

ok "Canary version: $CANARY_VERSION"

# ─── Step 4: Quality checks ─────────────────────────────
info "Running quality checks..."

yarn lint
yarn ts:check
yarn test --run
yarn build

ok "Quality checks passed"

# ─── Step 5: Bump package.json ──────────────────────────
info "Bumping package.json: $CURRENT_VERSION → $CANARY_VERSION"

npm version "$CANARY_VERSION" --no-git-tag-version --allow-same-version
BUMPED="1"

# ─── Step 6: Publish ────────────────────────────────────
info "Publishing $PACKAGE_NAME@$CANARY_VERSION with tag 'canary'..."

npm publish --tag canary --access public

ok "Published $PACKAGE_NAME@$CANARY_VERSION"

# ─── Step 7: Restore (via trap) ─────────────────────────
echo ""
ok "Canary release complete!"
echo ""
echo "  Install with:  npx t3core-cli@canary"
echo "  Or specific:   npm install t3core-cli@$CANARY_VERSION"
echo ""
echo "  package.json restored to $CURRENT_VERSION (no commit needed)"
