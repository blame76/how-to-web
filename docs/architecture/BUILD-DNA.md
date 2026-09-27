# Build DNA

Status: 0.1 prototype

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

Do not invent separate schemas prematurely. Extend the common contract only when repeated features demonstrate a real need.
