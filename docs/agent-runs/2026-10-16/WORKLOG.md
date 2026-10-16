# Worklog

## 2026-10-16 — repository baseline

- Recorded starting branch `copilot/auftrag-how-to-web-finalization`, commit `6d00045bf94add6ba6dd454435b8394d20fd04c1`, and a clean working tree.
- Read the root README, `llms.txt`, `TESTING.md`, all eight `docs/architecture/` documents, and the seven reference Build DNA, Markdown guides, discovery files, and research notes. Reviewed example inventories, Playwright contracts, smoke/Axe tests, and the Build DNA workflow.
- A read-only Explore agent audited the same seven reference packages. It confirmed the missing `public.research` pointers in six DNA files and found no other objective contract or link defect.
- Confirmed all seven JSON files and declared local reference/example targets parse/resolve. All seven pages have Markdown, `llms.txt`, and JSON discovery links. Existing component Markdown links resolve.
- Ran `python3 bin/sync-build-dna --check-all`: **PASS**, three generated copies.
- Ran the untouched `npm run gate`: DNA synchronization passed, then Playwright failed to start because dependencies were not installed. No lockfile existed.
- Retrieved the historical Build DNA CI job logs for run `36547549720`: **PASS** for the three inline copies. The workflow did not include Playwright/Axe.
- Compared Product Card research with `premium-retail.json`; the research note's two-image/third-image-pending statement is stale. The actual fixture has three views; the detail crop uses the studio source and the back view uses its own image.
- Attempted external retrieval of WHATWG forms, WAI form validation/Combobox/Dialog guidance, MDN `requestSubmit`, and OWASP input-validation guidance. Fetches were blocked by DNS/network access; no source claim was treated as newly verified.
- No independent coding agent or isolated project was available for either reconstruction scenario.

## 2026-10-16 — contract and discovery corrections

- Added `public.research: "./RESEARCH.md"` to the six DNA files that omitted an existing research document. Synchronized the generated Product Card and Combobox inline copies with `bin/sync-build-dna`.
- Added an explicit Form Submission scope boundary to the public Markdown and agent discovery text: it specifies a generic submission lifecycle, not task-specific fields/backend behavior.
- Corrected the Product Card research note to match the current three-view fixture, including the shared source used by its detail crop.
- Added a Playwright consistency test for all seven canonical contracts, discovery links, example/public targets, and relative links in each component's Markdown guidance.
- Ran `npm install`: **PASS**, six packages installed and npm reported zero vulnerabilities; this created the missing lockfile. Installed the Playwright Chromium browser successfully.
- Static checks confirmed JSON parsing, JavaScript syntax, and DNA synchronization. `git diff --check` found a trailing-space Markdown hard break in the updated Product Card research header; it was removed. Re-run whitespace checks and tests next.
- Re-ran whitespace, JSON, syntax, and DNA synchronization checks: **PASS**. `npx playwright test tests/reference-consistency.spec.js`: **PASS**, 7/7 references.
- Ran `npm ci && npm run gate`: lockfile installation and DNA synchronization passed, then 37/38 Playwright tests passed. The existing Form Submission 320-CSS-pixel smoke check failed: a mistake-list article retained a two-column grid with a `14rem` minimum, causing page overflow. The touched Form Submission edits were Markdown-only; this is an existing responsive defect directly covered by its DNA's 320px contract. Correct the narrow layout rather than weakening the test.
- Added a narrow-screen single-column rule for Form Submission's mistake rows. The targeted 320px smoke check passed. Re-ran `npm run gate`: **PASS**, all 38 tests, including smoke, seven interaction contracts, the seven new reference-consistency checks, and Axe.
- Updated the workflow to use locked dependencies, install Chromium, and run `npm run gate` for pull requests. Set up Node 22 via `actions/setup-node` pinned to its checked immutable v7.1.0 commit. The remote run for this workflow change is pending a pushed commit.

## Implementation and verification

Updates will be added here as work proceeds; test commands and their actual results will be recorded in `VALIDATION.md`.
