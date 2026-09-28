#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
python3 - "$ROOT" <<'PY'
import json,pathlib,sys
r=pathlib.Path(sys.argv[1])
v=json.loads((r/"variants.json").read_text(encoding="utf-8"))
a=[]
for item in v.get("variants",[]):
    f=item.get("example")
    if not f: continue
    if not (r/f).exists(): raise SystemExit(f"example declared but missing: {f}")
    a.append({"id":item["id"],"label":item["label"],"file":f})
(r/"manifest.json").write_text(json.dumps({"examples":a},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
PY
