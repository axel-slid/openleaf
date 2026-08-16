#!/bin/bash
# Openleaf installer - https://alex-dils.com/openleaf
set -euo pipefail

export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
OPENLEAF_INSTALL_TMP=""

cleanup() {
  if [ -n "$OPENLEAF_INSTALL_TMP" ] && [ -d "$OPENLEAF_INSTALL_TMP" ]; then
    rm -rf "$OPENLEAF_INSTALL_TMP"
  fi
}

trap cleanup EXIT

say() { printf '\n\033[1m%s\033[0m\n' "$1"; }

main() {
  if [ "$(uname -s)" != "Darwin" ] || [ "$(uname -m)" != "arm64" ]; then
    echo "This installer currently supports Apple Silicon Macs."
    exit 1
  fi

  say "Installing Openleaf..."

  local archive checksum_file unpack_dir install_dir target backup
  OPENLEAF_INSTALL_TMP="$(mktemp -d "${TMPDIR:-/tmp}/openleaf-install.XXXXXX")"
  archive="$OPENLEAF_INSTALL_TMP/Openleaf-macOS-arm64.zip"
  checksum_file="$OPENLEAF_INSTALL_TMP/SHA256SUMS.txt"
  unpack_dir="$OPENLEAF_INSTALL_TMP/unpacked"

  curl -fL "https://github.com/axel-slid/openleaf/releases/latest/download/Openleaf-macOS-arm64.zip" -o "$archive"
  curl -fL "https://github.com/axel-slid/openleaf/releases/latest/download/SHA256SUMS.txt" -o "$checksum_file"
  (cd "$OPENLEAF_INSTALL_TMP" && shasum -a 256 -c "$(basename "$checksum_file")")

  mkdir -p "$unpack_dir"
  ditto -x -k "$archive" "$unpack_dir"

  if [ ! -d "$unpack_dir/Openleaf.app" ]; then
    echo "The downloaded release does not contain Openleaf.app."
    exit 1
  fi

  install_dir="${OPENLEAF_INSTALL_DIR:-/Applications}"
  if [ "$install_dir" = "/Applications" ] && [ ! -w "$install_dir" ]; then
    install_dir="$HOME/Applications"
  fi
  mkdir -p "$install_dir"
  target="$install_dir/Openleaf.app"

  if [ -e "$target" ]; then
    mkdir -p "$HOME/.Trash"
    backup="$HOME/.Trash/Openleaf-previous-$(date +%Y%m%d-%H%M%S).app"
    mv "$target" "$backup"
  fi

  ditto "$unpack_dir/Openleaf.app" "$target"
  xattr -dr com.apple.quarantine "$target"

  if [ "${OPENLEAF_SKIP_OPEN:-0}" != "1" ]; then
    open "$target"
  fi

  say "Openleaf is installed and running."
}

# Running through main ensures a truncated download executes nothing.
main "$@"
