#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$ROOT/source"
OUT="$ROOT/generated"
mkdir -p "$SRC" "$OUT"
command -v magick >/dev/null 2>&1 || { echo "ImageMagick (magick) fehlt."; exit 1; }
shopt -s nullglob
files=("$SRC"/*)
if [ ${#files[@]} -eq 0 ]; then
  echo "Keine Quelldateien in $SRC"
  exit 0
fi
supports_avif=0
magick -list format 2>/dev/null | grep -Eq '^[[:space:]]*AVIF' && supports_avif=1 || true
for input in "${files[@]}"; do
  [ -f "$input" ] || continue
  name="$(basename "$input")"
  base="${name%.*}"
  for width in 480 960 1440 1920; do
    magick "$input" -auto-orient -resize "${width}x${width}>" -strip -quality 82 "$OUT/${base}-${width}.webp"
    if [ "$supports_avif" -eq 1 ]; then
      magick "$input" -auto-orient -resize "${width}x${width}>" -strip -quality 58 "$OUT/${base}-${width}.avif"
    fi
  done
done
echo "Fertig: $OUT"
