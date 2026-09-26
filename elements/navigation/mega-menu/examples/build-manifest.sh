#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
python3 - "$ROOT" <<'PY'
import json,pathlib,sys
r=pathlib.Path(sys.argv[1]);a=[]
for p in sorted(r.glob("*.html")):
    if p.name.startswith("_"): continue
    s=p.stem;a.append({"id":s,"label":" ".join(w.capitalize() for w in s.replace("_","-").split("-")),"file":p.name})
(r/"manifest.json").write_text(json.dumps({"examples":a},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
PY
