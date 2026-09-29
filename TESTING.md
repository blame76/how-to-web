# Testing

The test suite is a **pre-merge human gate**, not an autonomous release decision.

Current baseline:

1. Build DNA drift check
2. Playwright smoke tests
3. interaction-contract tests
4. automated Axe checks
5. manual human review

## First local setup

Use a currently supported Node.js release. Then:

```bash
npm install
npx playwright install chromium
```

The first `npm install` creates `package-lock.json`. Commit that lockfile before this baseline branch is merged.

## Normal gate

```bash
npm run gate
```

This runs:

```text
python3 bin/sync-build-dna --check-all
→ npx playwright test
```

Playwright starts a local Python HTTP server automatically on `127.0.0.1:4173`.

## Useful focused runs

```bash
npm run test:smoke
npm run test:contracts
npm run test:a11y
npm run test:headed
npm run test:ui
```

## What the suite proves

The contract tests cover behavior that how-to-web explicitly teaches, for example:

- focus return and Escape for Dialog / Mega Menu / Navbar,
- active-option versus committed-value behavior for Combobox,
- controlled slide state for Carousel,
- stable image switching for Product Card,
- validation, service failure, unknown outcome and pending behavior for Form Submission.

Axe catches automatically detectable accessibility defects. It does **not** replace manual accessibility review.

## Human gate

After automated tests are green, manually inspect the feature changed by the branch.

At minimum check:

- keyboard path,
- visible focus,
- narrow viewport around 320 CSS px,
- 200% browser zoom,
- wording and learning flow,
- the interaction that the Build DNA says must be preserved.

Only then merge.
