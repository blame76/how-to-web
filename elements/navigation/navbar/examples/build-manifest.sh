#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

python3 - "$ROOT" <<'PY'
import json
import pathlib
import sys

root = pathlib.Path(sys.argv[1])
variants_path = root / "variants.json"

if not variants_path.exists():
    raise SystemExit("variants.json missing")

variants = json.loads(variants_path.read_text(encoding="utf-8"))
examples = []

for variant in variants.get("variants", []):
    filename = variant.get("example")
    if not filename:
        continue

    path = root / filename
    if not path.exists():
        raise SystemExit(f"example declared but missing: {filename}")

    examples.append({
        "id": variant["id"],
        "label": variant["label"],
        "file": filename,
    })

(root / "manifest.json").write_text(
    json.dumps({"examples": examples}, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)
PY
