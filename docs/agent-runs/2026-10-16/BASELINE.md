# Baseline

Execution date: 2026-10-16  
Repository: `blame76/how-to-web`  
Branch: `copilot/auftrag-how-to-web-finalization`  
Starting commit: `6d00045bf94add6ba6dd454435b8394d20fd04c1`  
Working tree: clean at inspection.

## Execution environment

- Agent: GitHub Copilot coding agent. The exact model identifier was not exposed.
- Node.js: `v22.23.3`; npm: `10.9.9`.
- No independent reconstruction agent or isolated target project was available.

## Existing references

The seven Build-DNA references are:

| Reference | Published path |
|---|---|
| Product Card | `blocks/product-card/` |
| Navbar | `elements/navigation/navbar/` |
| Mega Menu | `elements/navigation/mega-menu/` |
| Carousel | `elements/interactive/carousel/` |
| Dialog | `elements/interactive/dialog/` |
| Combobox | `elements/interactive/combobox/` |
| Form Submission | `patterns/form-submission/` |

All seven have a parseable `build-dna.json`, `index.md`, component `llms.txt`, `RESEARCH.md`, example data/HTML, and the three expected HTML discovery links. The published paths and local example targets resolve. Their DNA distinguishes `must_preserve` from `may_change`, provides acceptance criteria, and documents behavior/accessibility requirements. Product Card, Navbar, Mega Menu, Carousel, Dialog, and Combobox omit their existing `RESEARCH.md` from the DNA `public` map; Form Submission already includes it.

There are three generated inline Build-DNA copies (Product Card, Combobox, Form Submission). `python3 bin/sync-build-dna --check-all` passes for all three. The Form Submission DNA is `ready-for-review`; its example is a simulation, not a backend contract.

## Known gaps and defects

- `blocks/product-card/RESEARCH.md` still describes a two-image demo and a missing third image. The current `premium-retail.json` supplies three image views, including a detail crop sharing the studio image and a separate moon-back image.
- `docs/architecture/REFERENCE-SCHEMA.md` lists `element`, `block`, and `pattern` as allowed kinds, while `docs/architecture/BUILD-DNA.md` also describes `organism` and five existing reference DNA files use that kind. No schema decision is inferred here.
- Form Submission describes a submission lifecycle, not a complete domain-specific contact-form specification. Field/domain behavior, endpoint, backend guarantees, and production retry policy are not supplied by its demonstration data.
- Fourteen additional HTML showcase directories have no `build-dna.json`; the repository also contains 142 `.gitkeep` placeholders. They are outside the seven-reference scope and are not being populated wholesale.

## Existing validation and CI

- `python3 bin/sync-build-dna --check-all`: **PASS**, 3 inline copies.
- Relative Markdown links in the seven `index.md` and component `llms.txt` files: **PASS**.
- JSON parsing and local `public`/example targets for the seven references: **PASS**.
- Untouched `npm run gate`: **FAIL** after the DNA sync step because `playwright` is not installed (`node_modules/` and `package-lock.json` were absent).
- `.github/workflows/build-dna.yml` checked only inline DNA synchronization. The available historical Build DNA workflow run for PR #11 (run `36547549720`, job `109337471830`) succeeded and logged all three inline copies in sync. No failing run was identified in the recent run listing.
- `TESTING.md` already defines Playwright smoke, interaction-contract, and Axe checks, but the workflow did not run them.

## Scope boundary

Other examples, scaffolds, and existing interaction tests were inventoried/reviewed. No new reference, framework, backend behavior, product rule, deployment, or merge is authorized by this task.
