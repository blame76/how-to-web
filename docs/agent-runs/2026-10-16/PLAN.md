# Plan

Status vocabulary: `PASS`, `FAIL`, `BLOCKED`, `NOT RUN`.

## Prioritized work

| Priority | Class | Work | Dependency | Acceptance |
|---|---|---|---|---|
| 1 | EXECUTE | Fix the six missing `public.research` pointers and correct the stale Product Card image-count text using the current fixture as evidence. | Baseline audit | All seven DNA files advertise their existing research file; references remain valid JSON; only generated inline copies are synchronized by the existing tool. |
| 2 | EXECUTE | Add a focused Playwright consistency test for the seven public contracts, discovery links, and local Markdown/example targets. | Reference audit | The test checks canonical contract fields, HTML discovery links, and locally resolvable references without external network access. |
| 3 | EXECUTE | Generate a lockfile for the already pinned npm dependencies, update setup instructions, and make CI run the existing quality gate. | Dependency install; Playwright browser install in CI | `npm ci` succeeds and CI invokes `npm run gate`, including current smoke, contract, and Axe tests. |
| 4 | EXECUTE | Maintain the seven required dated process documents and prepare two reproducible reconstruction experiments. | Audit and actual test results | Each required file distinguishes observed facts from decisions, unavailable evidence, and unrun work. |
| 5 | BLOCKED | Independently execute Product Card and Form Submission reconstructions. | An independent coding agent/LLM and isolated target project | Keep both experiments `NOT RUN` unless an independent environment becomes available; self-review is not evidence. |
| 6 | BLOCKED | Verify linked technical claims against WHATWG, W3C/WAI, MDN, and OWASP sources. | External source access | Do not claim verification if network fetch remains unavailable; record URLs, attempts, and uncertainty. |
| 7 | BLOCKED | Resolve the schema's `organism` kind inconsistency and any full generic contact-form/backend policy. | Human architecture/domain decisions | Document the exact question and leave affected design work unchanged. |
| 8 | OUT OF SCOPE | Fill every `.gitkeep`, create further references, or add a CMS/framework/backend. | Not applicable | No work in these areas. |

## Validation criteria

- Run focused reference consistency tests and the existing `npm run gate`.
- Check that inline DNA copies match canonical JSON after edits.
- Review the full diff and the actual CI scope; do not claim an independent reconstruction.
- Scan every changed/created file for secrets before committing.
- Do not merge or deploy.
