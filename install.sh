#!/bin/bash
# Openleaf installer - https://alex-dils.com/openleaf
set -euo pipefail

export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

say() { printf '\n\033[1m%s\033[0m\n' "$1"; }

say "Installing Openleaf..."

if ! command -v npm >/dev/null 2>&1; then
  if command -v brew >/dev/null 2>&1; then
    say "Node.js not found - installing it with Homebrew first..."
    brew install node
  else
    echo "Openleaf needs Node.js. Install it from https://nodejs.org (or install Homebrew), then re-run this command."
    exit 1
  fi
fi

npm install -g github:axel-slid/openleaf

if [ "$(uname -s)" = "Darwin" ]; then
  openleaf install
  openleaf open
  say "Openleaf is in your Applications folder and running."
else
  say "Openleaf CLI installed. Start it with: openleaf dev"
fi
