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

configure_homebrew() {
  if ! command -v brew >/dev/null 2>&1; then
    if [ -x /opt/homebrew/bin/brew ]; then
      export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"
    elif [ -x /usr/local/bin/brew ]; then
      export PATH="/usr/local/bin:$PATH"
    fi
  fi

  if command -v brew >/dev/null 2>&1; then
    eval "$(brew shellenv)"
    hash -r
    return 0
  fi

  return 1
}

ensure_homebrew() {
  if configure_homebrew; then
    return
  fi

  say "Installing Homebrew for the LaTeX toolchain..."
  NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  if ! configure_homebrew; then
    echo "Homebrew installed, but its brew command could not be found."
    exit 1
  fi
}

ensure_latex_tools() {
  ensure_homebrew

  if ! command -v tectonic >/dev/null 2>&1; then
    say "Installing Tectonic..."
    brew install tectonic
  fi

  export PATH="/Library/TeX/texbin:$PATH"
  hash -r

  if ! command -v pdflatex >/dev/null 2>&1; then
    say "Installing BasicTeX for pdflatex..."
    brew install --cask basictex
    export PATH="/Library/TeX/texbin:$PATH"
    hash -r
  fi

  if ! command -v latexmk >/dev/null 2>&1; then
    local tlmgr_path
    tlmgr_path="$(command -v tlmgr || true)"
    if [ -z "$tlmgr_path" ] && [ -x /Library/TeX/texbin/tlmgr ]; then
      tlmgr_path="/Library/TeX/texbin/tlmgr"
    fi
    if [ -z "$tlmgr_path" ]; then
      echo "BasicTeX installed, but tlmgr could not be found."
      exit 1
    fi

    say "Installing latexmk..."
    case "$tlmgr_path" in
      /Library/TeX/*|/usr/local/texlive/*) sudo "$tlmgr_path" install latexmk ;;
      *) "$tlmgr_path" install latexmk ;;
    esac
    hash -r
  fi

  local missing_tools=""
  for tool in tectonic latexmk pdflatex; do
    if ! command -v "$tool" >/dev/null 2>&1; then
      missing_tools="$missing_tools $tool"
    fi
  done
  if [ -n "$missing_tools" ]; then
    echo "LaTeX tool installation finished, but these commands are still unavailable:$missing_tools"
    exit 1
  fi

  say "LaTeX toolchain ready: tectonic, latexmk, and pdflatex."
}

main() {
  if [ "$(uname -s)" != "Darwin" ] || [ "$(uname -m)" != "arm64" ]; then
    echo "This installer currently supports Apple Silicon Macs."
    exit 1
  fi

  say "Installing Openleaf..."

  if [ "${OPENLEAF_SKIP_TOOLCHAIN:-0}" != "1" ]; then
    ensure_latex_tools
  fi

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
if [ "${OPENLEAF_SOURCE_ONLY:-0}" != "1" ]; then
  main "$@"
fi
