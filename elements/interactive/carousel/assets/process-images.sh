#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$ROOT/source"
OUT="$ROOT/generated"

mkdir -p "$SRC" "$OUT"

if command -v magick >/dev/null 2>&1; then
    IM=(magick)
    IDENTIFY=(magick identify)
elif command -v convert >/dev/null 2>&1 && command -v identify >/dev/null 2>&1; then
    IM=(convert)
    IDENTIFY=(identify)
else
    echo "ImageMagick fehlt."
    echo "Ubuntu/Debian: sudo apt install imagemagick"
    exit 1
fi

shopt -s nullglob nocaseglob
files=(
    "$SRC"/*.png
    "$SRC"/*.jpg
    "$SRC"/*.jpeg
    "$SRC"/*.webp
    "$SRC"/*.avif
    "$SRC"/*.tif
    "$SRC"/*.tiff
)
shopt -u nocaseglob

if [ ${#files[@]} -eq 0 ]; then
    echo "Keine Source Images gefunden: $SRC"
    echo "Lege die Originale dort ab und starte das Script erneut."
    exit 0
fi

supports_avif=0
if "${IM[@]}" -list format 2>/dev/null | grep -Eq '^[[:space:]]*AVIF'; then
    supports_avif=1
fi

target_widths=(640 960 1440 1920 2560)

for input in "${files[@]}"; do
    [ -f "$input" ] || continue

    filename="$(basename "$input")"
    base="${filename%.*}"

    source_width="$("${IDENTIFY[@]}" -format '%w' "$input")"
    source_height="$("${IDENTIFY[@]}" -format '%h' "$input")"

    if ! [[ "$source_width" =~ ^[0-9]+$ ]] || ! [[ "$source_height" =~ ^[0-9]+$ ]]; then
        echo "Übersprungen, Maße nicht lesbar: $filename"
        continue
    fi

    echo
    echo "Source: $filename (${source_width}x${source_height})"

    rm -f "$OUT/${base}-"*.webp "$OUT/${base}-"*.avif

    declare -A seen=()
    widths=()

    for width in "${target_widths[@]}"; do
        if [ "$width" -le "$source_width" ] && [ -z "${seen[$width]+x}" ]; then
            widths+=("$width")
            seen[$width]=1
        fi
    done

    if [ -z "${seen[$source_width]+x}" ]; then
        widths+=("$source_width")
        seen[$source_width]=1
    fi

    for width in "${widths[@]}"; do
        echo "  → ${width}px WebP"
        "${IM[@]}" "$input" \
            -auto-orient \
            -resize "${width}x>" \
            -strip \
            -quality 84 \
            "$OUT/${base}-${width}.webp"

        if [ "$supports_avif" -eq 1 ]; then
            echo "  → ${width}px AVIF"
            "${IM[@]}" "$input" \
                -auto-orient \
                -resize "${width}x>" \
                -strip \
                -quality 60 \
                "$OUT/${base}-${width}.avif"
        fi
    done

    unset seen
done

echo
echo "Fertig: $OUT"
echo "Cropping erfolgt bewusst nicht im Asset-Script."
echo "Focal point / object-position definieren wir später pro Slide in JSON."

if [ "$supports_avif" -eq 0 ]; then
    echo "Hinweis: Diese ImageMagick-Installation unterstützt kein AVIF; WebP wurde vollständig erzeugt."
fi
