# how-to-web Taxonomy

Status: 0.1 working taxonomy

## Purpose

The taxonomy answers one practical question:

> **What kind of thing are we teaching?**

It is not a design-system hierarchy and not an attempt to classify every web concept perfectly.

The goal is to choose the smallest category that matches the **learning subject and its contract**.

Folder location and `build-dna.json.kind` should normally agree. Existing reference features may predate this taxonomy; do not reorganize them only for taxonomy purity.

---

## The categories

### Element

A small reusable UI unit with its own semantics, states or accessibility behavior.

Typical signals:

- can be understood largely on its own,
- has a small interaction/state contract,
- is reused inside larger compositions,
- does not represent a complete user task.

Examples:

- button,
- link,
- input,
- disclosure trigger,
- possibly a focused interactive control such as a combobox.

Build DNA emphasis:

- semantics,
- states,
- keyboard behavior,
- accessibility,
- interaction constraints.

---

### Block

A reusable composition of several elements that forms a meaningful content or interface unit.

Typical signals:

- contains multiple elements,
- has its own information hierarchy or data contract,
- can be placed in different pages or contexts,
- does not coordinate a complete multi-step task.

Examples:

- product card,
- article teaser,
- newsletter block,
- profile card.

Build DNA emphasis:

- composition,
- hierarchy,
- data contract,
- layout,
- responsive behavior.

---

### Organism

A larger coordinated UI composition whose parts must work together as one interaction surface.

Typical signals:

- multiple elements or blocks coordinate state or behavior,
- focus, disclosure, selection or responsive behavior spans several parts,
- accessibility depends on the composition, not only the individual controls,
- still represents an interface structure rather than a complete task flow.

Examples:

- complex navigation,
- large interactive header,
- coordinated filter/search surface.

Build DNA emphasis:

- coordination,
- shared state,
- behavior,
- focus,
- responsive transformations,
- accessibility across parts.

---

### Pattern

A complete or recognizable user task / flow.

Typical signals:

- has a beginning and an outcome,
- contains transitions rather than only component states,
- errors and recovery matter,
- data moves between steps or systems,
- several different UI structures could implement the same task.

Examples:

- form submission,
- sign-in flow,
- checkout step,
- file upload flow.

Build DNA emphasis:

- task contract,
- transitions,
- errors,
- recovery,
- data flow,
- side effects,
- completion criteria.

---

### Concern

A cross-cutting contract that affects many pages, components or patterns without being a single visible UI structure.

Typical signals:

- applies to many otherwise unrelated features,
- often remains partly or completely invisible,
- is expressed through rules, consistency and integration points,
- cannot be meaningfully demonstrated as one standalone widget,
- still produces concrete implementation obligations.

Examples:

- page metadata,
- accessibility,
- performance,
- security/privacy aspects when treated cross-cutting,
- responsive behavior when taught as a cross-cutting discipline rather than one layout.

Build DNA emphasis:

- scope,
- policy,
- consistency,
- source of truth,
- constraints,
- integration points,
- validation/review rules.

A Concern may have a human-facing demo or inspector. The demo illustrates the Concern; it does not turn the Concern into an Element or Organism.

---

### Layout

A spatial structure that primarily defines containment, alignment, order and responsive reflow.

Typical signals:

- the main problem is where things go,
- semantics and task behavior are secondary,
- the contract survives content changes,
- responsive transformation is central.

Examples:

- container,
- grid,
- split layout,
- sidebar/main layout.

Build DNA emphasis:

- spatial rules,
- containment,
- intrinsic sizing,
- breakpoints/reflow,
- ordering,
- overflow.

---

### Reference

A vocabulary or explanatory concept that is useful to understand but is not itself an implementation contract.

Typical signals:

- explains a term, rule or distinction,
- has no meaningful standalone UI or task behavior,
- readers use it to make or review other things,
- a Build DNA would mostly restate prose instead of defining reconstructable behavior.

Examples:

- terminology pages,
- HTTP method explanation,
- semantic distinctions,
- glossary material.

A Reference normally does **not** need Build DNA.

---

## Decision guide

Use this order. Stop at the first strong match.

```text
Is it mainly an explanatory concept?
→ Reference

Is it a cross-cutting rule/contract that affects many features?
→ Concern

Is it a complete user task with outcomes, errors or recovery?
→ Pattern

Is the main contract spatial arrangement and reflow?
→ Layout

Is it a coordinated multi-part interaction surface?
→ Organism

Is it a reusable composition of multiple elements?
→ Block

Otherwise, if it is a small reusable semantic/interactive unit:
→ Element
```

This is a decision aid, not an ontology proof.

---

## Important boundary: Organism vs Pattern

Ask:

> **Can two very different interface compositions implement the same thing we are teaching?**

If yes, the subject may be a Pattern.

Example:

- A modal form, full page form and wizard could all implement **form submission**.
- Therefore form submission is a Pattern, not an Organism.

An Organism teaches the coordinated interface itself.

A Pattern teaches the task that can survive a change of interface composition.

---

## Important boundary: Organism vs Concern

Ask:

> **Can I point at one coordinated interface and say “that is the thing”?**

If yes, Organism may fit.

If the subject exists across the whole document/project and is primarily a set of consistency rules, it is probably a Concern.

Example:

- A Mega Menu is a coordinated navigation interface.
- Page Metadata exists across document head, social representation, structured data and agent discovery.

Therefore Page Metadata is a Concern.

---

## Important boundary: Concern vs Reference

A Concern creates implementation and review obligations.

A Reference mainly creates understanding.

Example:

- “What does canonical mean?” → Reference material.
- “How must this project define canonical URL, social URL and structured identity consistently?” → Concern.

---

## Folder taxonomy

Current top-level content taxonomy:

```text
elements/
blocks/
patterns/
concerns/
docs/
```

`Layout` and `Reference` may live in dedicated top-level areas only when enough real content justifies them.

Do not create empty category trees in advance.

Existing features are not moved merely to satisfy the taxonomy. Reclassification or relocation should happen only when it solves a real navigation, teaching or maintenance problem.

---

## Page Metadata classification

`concerns/page-metadata`

Why:

- it affects nearly every page,
- it is mostly invisible,
- it spans several machine consumers,
- it has no single UI composition,
- its central problem is consistency across multiple representations of the same document.

Its human demo may contain:

- visible fine print,
- document/head inspector,
- search representation,
- social share preview,
- JSON-LD view,
- agent discovery view.

Those are teaching surfaces for the Concern, not separate required components.

---

## Internal review question

Before accepting a category, ask:

> **What would become incorrect if we classified this differently?**

If the answer is “nothing except the folder name”, do not overthink the classification.

Taxonomy should improve learning, reconstruction and discovery — not become work of its own.
