# Validation

## Repository and CI baseline

| Check | Result | Evidence |
|---|---|---|
| `python3 bin/sync-build-dna --check-all` | PASS | Three existing inline copies were in sync. |
| Local Markdown links in all seven `index.md` and component `llms.txt` files | PASS | Relative local targets resolved. |
| Seven DNA JSON files and public/example targets | PASS | Files parse and all inspected local targets exist. |
| HTML discovery links | PASS | Each reference has one Markdown alternate, `llms.txt` describedby, and JSON alternate. |
| Untouched `npm run gate` | FAIL (environment prerequisite) | Sync passed; `playwright: not found` because `node_modules/` and `package-lock.json` were absent. |
| Historical Build DNA workflow, run `36547549720`, job `109337471830` | PASS | GitHub job logs show all three inline contracts in sync. This was not the current branch's run. |
| External source retrieval | BLOCKED | See `RESEARCH.md`; DNS/network errors prevented page access. |

## Reconstruction experiments

Neither experiment was executed. Both are **NOT RUN** because no independent coding agent/LLM with an isolated target repository was available. The Explore audit agent was read-only and did not reconstruct either reference.

### Scenario A — Product Card

- Reference: `https://blame76.github.io/how-to-web/blocks/product-card/`
- Target: Vanilla HTML/CSS/JavaScript.
- Data input: published `blocks/product-card/examples/premium-retail.json` (product data only; not its HTML, CSS, or JavaScript).
- Prompt: “Build a Product Card in vanilla HTML, CSS, and JavaScript from the public how-to-web reference and its Build DNA. Use the supplied product JSON. Do not access the source repository or copy the reference implementation. Preserve the contract and list any unresolved decision.”
- Independent evaluator checks: product identity/price/action semantics; image-switching keyboard and announced state; stable geometry; responsive behavior; accessibility; exact data/claims; differences from the contract. Record the produced code and evaluator evidence in an isolated run before claiming a result.
- Result: **NOT RUN**.

### Scenario B — Form Submission applied to a contact form

- Reference: `https://blame76.github.io/how-to-web/patterns/form-submission/`
- Target: Vanilla HTML/CSS/JavaScript contact-form proposal.
- Context input: name, email, and message fields from the published `contact-message.json`; no production endpoint, response mapping, data-retention, or retry guarantees are supplied. The demo's scenario values are not production policy.
- Prompt: “Apply the public Form Submission contract to a contact form with name, email, and message. Do not access or copy the example implementation. First separate the generic submission lifecycle from contact-form requirements. Implement only what is specified; list backend/domain decisions as BLOCKED instead of inventing an endpoint, success semantics, or retry policy.”
- Independent evaluator checks: validation vs service error; success vs unknown outcome; entered-data preservation; pending/duplicate behavior; retry safety; status/focus accessibility; explicit unresolved backend/domain decisions.
- Result: **NOT RUN**.

## Final test results

### Focused reference-consistency test

- `npm install`: **PASS**; six packages installed, zero reported npm vulnerabilities, and `package-lock.json` created.
- `npx playwright install chromium`: **PASS**.
- `npx playwright test tests/reference-consistency.spec.js`: **PASS**, 7 tests.
- `python3 bin/sync-build-dna --check-all`: **PASS**, 3 inline copies.
- `node --check tests/reference-consistency.spec.js`: **PASS**.
- JSON parsing and seven `public.research` target checks: **PASS**.
- `git diff --check`: initially **FAIL** on trailing whitespace in the edited Product Card research heading; removed the whitespace and re-ran the check successfully.

The existing interaction/smoke/Axe suite and updated CI workflow remain to be verified.
