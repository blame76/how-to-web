#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$ROOT/source"
OUT="$ROOT/generated"

mkdir -p "$SRC" "$OUT"

if command -v magick >/dev/null 2>&1; then
    IM="magick"
elif command -v convert >/dev/null 2>&1; then
    IM="convert"
else
    echo "ImageMagick fehlt. Installiere es z. B. mit:"
    echo "  sudo apt install imagemagick"
    exit 1
fi

shopt -s nullglob
files=("$SRC"/*)

if [ ${#files[@]} -eq 0 ]; then
    echo "Keine Quelldateien in $SRC"
    exit 0
fi

supports_avif=0

if "$IM" -list format 2>/dev/null | grep -Eq '^[[:space:]]*AVIF'; then
    supports_avif=1
fi

for input in "${files[@]}"; do
    [ -f "$input" ] || continue

    name="$(basename "$input")"
    base="${name%.*}"

    echo "Verarbeite: $name"

    for width in 480 960 1440 1920; do
        "$IM" "$input" \
            -auto-orient \
            -resize "${width}x${width}>" \
            -strip \
            -quality 82 \
            "$OUT/${base}-${width}.webp"

        if [ "$supports_avif" -eq 1 ]; then
            "$IM" "$input" \
                -auto-orient \
                -resize "${width}x${width}>" \
                -strip \
                -quality 58 \
                "$OUT/${base}-${width}.avif"
        fi
    done
done

echo
echo "Fertig: $OUT"

if [ "$supports_avif" -eq 1 ]; then
    echo "Erzeugt: WebP + AVIF"
else
    echo "Erzeugt: WebP"
    echo "AVIF wird von dieser ImageMagick-Installation nicht unterstützt."
fi