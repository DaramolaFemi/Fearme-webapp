#!/usr/bin/env bash
# Run only after reviewing the procedure in README.md. Works in a separate clone.
set -euo pipefail
if [ "$#" -ne 1 ]; then
  echo 'Usage: bash scripts/clean-contributor-history.sh /absolute/path/to/new-clean-clone' >&2
  exit 1
fi
if [ -e "$1" ]; then echo 'Destination must not exist.' >&2; exit 1; fi
source_repo=$(git rev-parse --show-toplevel)
git clone --no-local "$source_repo" "$1"
cd "$1"
git bundle create ../portfolio-before-attribution-cleanup.bundle --all
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --msg-filter 'sed "/^[Cc]o-[Aa]uthored-[Bb]y:.*[Cc]laude/d; /^[Cc]o-[Aa]uthored-[Bb]y:.*@anthropic\.com/d"' -- --all
echo 'History cleaned in the separate clone. No remote changes have been made.'
echo 'Review git log and compare file trees before arranging a coordinated force-with-lease push.'
