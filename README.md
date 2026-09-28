# how-to-web

**See it. Name it. Specify it. Rebuild it.**

how-to-web is a visual and machine-readable reference for web building blocks.

For humans it explains what a component, block, organism or pattern is, which decisions matter, what current best practices say and how to review the result.

For coding agents it provides **Build DNA**: a portable reconstruction contract that describes purpose, composition, behavior, responsive rules, accessibility and constraints without binding the implementation to a framework.

## Reference feature

### Product Card

- Human reference: `blocks/product-card/index.html`
- LLM-friendly reference: `blocks/product-card/index.md`
- Build DNA: `blocks/product-card/build-dna.json`
- Agent discovery: `blocks/product-card/llms.txt`
- Research: `blocks/product-card/RESEARCH.md`
- Examples: `blocks/product-card/examples/` (`premium-retail`, `technical-retail`, `compact`)

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

### Navbar

- Human reference: `elements/navigation/navbar/index.html`
- LLM-friendly reference: `elements/navigation/navbar/index.md`
- Build DNA: `elements/navigation/navbar/build-dna.json`
- Agent discovery: `elements/navigation/navbar/llms.txt`
- Research: `elements/navigation/navbar/RESEARCH.md`
- Examples: `elements/navigation/navbar/examples/` (`simple`, `with-disclosures`, `utility-plus-primary`)

Public target:

```text
https://blame76.github.io/how-to-web/elements/navigation/navbar/
```

### Carousel

- Human reference: `elements/interactive/carousel/index.html`
- LLM-friendly reference: `elements/interactive/carousel/index.md`
- Build DNA: `elements/interactive/carousel/build-dna.json`
- Agent discovery: `elements/interactive/carousel/llms.txt`
- Research: `elements/interactive/carousel/RESEARCH.md`
- Examples: `elements/interactive/carousel/examples/` (`editorial-story`, `content-rail`, `media-gallery`)
- Full-Bleed demo: `elements/interactive/carousel/examples/editorial-story.html`

### Dialog

- Human reference: `elements/interactive/dialog/index.html`
- LLM-friendly reference: `elements/interactive/dialog/index.md`
- Build DNA: `elements/interactive/dialog/build-dna.json`
- Agent discovery: `elements/interactive/dialog/llms.txt`
- Research: `elements/interactive/dialog/RESEARCH.md`
- Examples: `elements/interactive/dialog/examples/` (`information`, `form`, `confirmation`)

### Mega Menu

- Human reference: `elements/navigation/mega-menu/index.html`
- LLM-friendly reference: `elements/navigation/mega-menu/index.md`
- Build DNA: `elements/navigation/mega-menu/build-dna.json`
- Agent discovery: `elements/navigation/mega-menu/llms.txt`
- Research: `elements/navigation/mega-menu/RESEARCH.md`
- Examples: `elements/navigation/mega-menu/examples/` (`grouped-links`, `task-based`, `featured-content`)

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

Product Card, Navbar, Carousel, Dialog and Mega Menu are reference features for the series. New features should reuse the same human-reference, Build-DNA, Markdown and agent-discovery structure.
