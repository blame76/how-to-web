# how-to-web

**See it. Name it. Specify it. Rebuild it.**

how-to-web is a visual and machine-readable reference for web building blocks.

For humans it explains what a component, block, organism or pattern is, which decisions matter, what current best practices say and how to review the result.

For coding agents it provides **Build DNA**: a portable reconstruction contract that describes purpose, composition, behavior, responsive rules, accessibility and constraints without binding the implementation to a framework.

## First complete prototype

### Product Card

- Human reference: `blocks/product-card/index.html`
- LLM-friendly reference: `blocks/product-card/index.md`
- Build DNA: `blocks/product-card/build-dna.json`
- Agent discovery: `blocks/product-card/llms.txt`
- Research: `blocks/product-card/RESEARCH.md`
- Example: `blocks/product-card/examples/premium-retail.html`

Public target:

```text
https://blame76.github.io/how-to-web/blocks/product-card/
```

A coding-agent request should be able to stay this small:

```text
Baue mir eine Product Card nach
https://blame76.github.io/how-to-web/blocks/product-card/
```

The agent should discover the Build DNA from the page and reconstruct the component for the requested stack instead of copying the reference HTML.

## Build DNA

Build DNA is the how-to-web machine-readable layer.

It separates:

- **what must survive reconstruction** — purpose, semantics, behavior, constraints, accessibility;
- **what may adapt** — framework, CSS architecture, design tokens and visual styling;
- **example data** — concrete content used only to demonstrate the component.

See `docs/architecture/BUILD-DNA.md` for the current contract.

## Agent discovery

The repository publishes `llms.txt`. Individual component paths may provide a more specific `llms.txt`; agents should prefer the most specific applicable file.

## Status

The Product Card is the reference prototype. Other features should only be expanded in series after its Build-DNA reconstruction test is satisfactory.
