# Build DNA

Status: 0.1 working contract

## Purpose

Build DNA is the portable reconstruction contract between a human requirement and a coding agent.

A Build DNA file must contain enough information for an independent implementation to preserve the meaning and behavior of a web building block without requiring access to its original HTML, CSS or JavaScript.

Build DNA is **not**:

- a source-code serialization,
- a design-token dump,
- a screenshot description,
- a framework component API,
- example content.

## Reconstruction principle

A successful reconstruction may look different and use a different stack while remaining equivalent in the things that matter.

Priority order:

1. Purpose
2. Constraints
3. Behavior
4. Composition
5. Responsive behavior
6. Accessibility
7. Visual treatment

When two instructions conflict, the higher-priority layer wins.

## Core fields

A Build DNA document should normally expose:

- `format`
- `version`
- `id`
- `kind`
- `title`
- `purpose`
- `reconstruction_priority`
- `composition`
- `data_contract`
- `layout`
- `visual`
- `behavior`
- `responsive`
- `accessibility`
- `performance` when relevant
- `constraints`
- `adaptation_contract`
- `agent_contract`
- `acceptance`
- `public`
- `examples`

Irrelevant optional sections should be omitted rather than filled with `N/A`.

## Adaptation contract

Every Build DNA should distinguish:

### Must preserve

Examples:

- purpose,
- semantics,
- information hierarchy,
- state/behavior contract,
- keyboard operation,
- responsive constraints,
- security/privacy constraints,
- data honesty.

### May adapt

Examples:

- framework,
- template language,
- CSS methodology,
- class names,
- design tokens,
- typeface,
- colors,
- radii,
- shadows,
- exact spacing.

## Example data is separate

Concrete demos live beside the Build DNA and may link back with `conforms_to`.

A coding agent must not infer generic requirements solely from example content.

Example:

```json
{
  "conforms_to": "../build-dna.json",
  "product": {
    "name": "Lunar Oversized Hoodie"
  }
}
```

The hoodie is example data. `product.name` is part of the contract.

## Agent discovery

Each public feature should expose:

1. `index.html` — human reference
2. `index.md` — LLM-friendly reference
3. `build-dna.json` — canonical reconstruction contract
4. `llms.txt` — local discovery
5. HTML discovery links:
   - `rel="alternate" type="text/markdown"` → `index.md`
   - `rel="describedby"` → local `llms.txt`
   - `rel="alternate" type="application/json"` → `build-dna.json`

The repository root should maintain a concise `llms.txt` index.


## Inline delivery for single-pass readers

A feature may mirror its canonical `build-dna.json` inside `index.html` so a single-pass reader or coding agent can receive the normative contract without following a second request.

The source hierarchy is strict:

1. **`build-dna.json` is the canonical normative source.**
2. The inline HTML block is a **generated transport copy**.
3. The inline copy must never be edited manually.
4. Research, examples, Markdown reference and explanatory prose remain informative unless the Build DNA explicitly incorporates a rule.

Inline copies are delimited by:

```html
<!-- BUILD_DNA_INLINE:START -->
...
<!-- BUILD_DNA_INLINE:END -->
```

The repository-level tool owns synchronization:

```bash
python3 bin/sync-build-dna blocks/product-card
python3 bin/sync-build-dna --check blocks/product-card
python3 bin/sync-build-dna --check-all
```

`--check-all` discovers every `index.html` that contains an inline Build DNA marker pair and fails when:

- the matching `build-dna.json` is missing or invalid,
- the marker pair is malformed,
- the generated inline block differs from the canonical JSON.

CI runs only `--check-all`. It never rewrites repository files.

The sync tool intentionally does **not** generate `index.md`, research, examples or human-facing explanations. Those require semantic review rather than byte-level synchronization.

## Agent request examples

A public feature may expose several concise request examples for coding agents, for example:

- generic reconstruction,
- a named documented variant,
- adaptation into an existing project or design system.

These examples are **not** separate specifications. They all resolve to the same Build DNA. The Build DNA stays normative; examples only demonstrate different user intents.

When useful, `agent_contract.request_examples` may expose the same entry points machine-readably.

## Reconstruction test

A Build DNA is not accepted merely because it validates as JSON.

Gate:

1. Give a fresh coding agent the public feature URL.
2. Do not provide the original implementation files.
3. Ask it to reconstruct the feature in a different or clean target stack.
4. Compare purpose, composition, behavior, responsive behavior, accessibility and constraints.
5. If important implementation behavior must be explained outside the DNA, the DNA is incomplete.
6. If multiple independent agents converge on the contract while differing in implementation details, the DNA is doing its job.

## Kinds

The same contract applies across how-to-web, but emphasis changes:

- **Layout** → spatial, responsive and containment DNA
- **Element** → semantics, states and control DNA
- **Block** → composition, hierarchy and data DNA
- **Organism** → behavior, coordination and accessibility DNA
- **Pattern** → task flow, errors, recovery and data-flow DNA
- **Concern** → cross-cutting policy, consistency, source-of-truth, integration and review DNA
- **Reference** → normally no Build DNA; explanatory vocabulary rather than a reconstructable implementation contract

See `docs/architecture/TAXONOMY.md` for category boundaries and the decision guide.

Do not invent separate schemas prematurely. Extend the common contract only when repeated features demonstrate a real need.
