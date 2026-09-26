#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
python3 - "$ROOT" <<'PY'
import json, pathlib, sys
root=pathlib.Path(sys.argv[1])
examples=[]
for path in sorted(root.glob("*.html")):
    if path.name.startswith("_"):
        continue
    stem=path.stem
    label=" ".join(word.capitalize() for word in stem.replace("_","-").split("-"))
    examples.append({"id":stem,"label":label,"file":path.name})
(root/"manifest.json").write_text(json.dumps({"examples":examples},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(f"{len(examples)} Beispiel(e) in manifest.json")
PY
