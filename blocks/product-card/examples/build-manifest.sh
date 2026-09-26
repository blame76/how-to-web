#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

python3 - "$ROOT" <<'PY'
import json
import pathlib
import sys

root = pathlib.Path(sys.argv[1])
examples = []

for path in sorted(root.glob("*.html")):
    if path.name.startswith("_"):
        continue

    stem = path.stem
    label = " ".join(word.capitalize() for word in stem.replace("_", "-").split("-"))
    meta_path = path.with_suffix(".json")

    if meta_path.exists():
        try:
            meta = json.loads(meta_path.read_text(encoding="utf-8"))
            label = meta.get("label") or label
        except (json.JSONDecodeError, OSError):
            pass

    examples.append({
        "id": stem,
        "label": label,
        "file": path.name
    })

(root / "manifest.json").write_text(
    json.dumps({"examples": examples}, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8"
)

print(f"{len(examples)} Beispiel(e) in {root / 'manifest.json'}")
PY
