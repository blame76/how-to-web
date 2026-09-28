#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

python3 - "$ROOT" <<'PY'
from pathlib import Path
import html
import json
import sys

root = Path(sys.argv[1])
dna_path = root / "build-dna.json"
html_path = root / "index.html"

start = "    <!-- BUILD_DNA_INLINE:START -->"
end = "    <!-- BUILD_DNA_INLINE:END -->"

dna_raw = dna_path.read_text(encoding="utf-8")
json.loads(dna_raw)
escaped = html.escape(dna_raw.strip(), quote=False)

page = html_path.read_text(encoding="utf-8")
if start not in page or end not in page:
    raise SystemExit("Build DNA inline markers missing in index.html")

before, rest = page.split(start, 1)
_, after = rest.split(end, 1)

block = f'''{start}
    <details class="build-dna-inline">
      <summary>Build DNA · normative reconstruction contract</summary>
      <div class="build-dna-inline__intro">
        <p><strong>NORMATIVE BUILD CONTRACT.</strong> Read this before reconstructing the component.</p>
        <p>This contract overrides visual examples, research recommendations and explanatory prose unless the contract explicitly references them.</p>
        <p>Canonical source: <a href="./build-dna.json"><code>build-dna.json</code></a>. This inline copy is generated from that file for single-pass readers and agents.</p>
      </div>
      <pre><code class="language-json">{escaped}</code></pre>
    </details>
    {end}'''

html_path.write_text(before + block + after, encoding="utf-8")
print("Synced build-dna.json -> index.html inline contract")
PY
