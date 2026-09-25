# Element Blueprint

Status: draft v0.2

An element is atomic or small-molecular, independently usable, reusable in multiple patterns, and has its own semantics, states, behavior or accessibility contract.

The blueprint is a rendering contract. The canonical data lives in YAML as defined by `REFERENCE-SCHEMA.md`.

## Required human-page order

### 1. Identity

Show:

- canonical term
- German explanation/alias
- one-sentence purpose
- status and review date

### 2. Live

Show the real element first.

Rules:

- functional, not a screenshot
- default state visible immediately
- controls only when they teach a meaningful decision
- must be skippable and must not trap keyboard/screenreader users
- sandbox must not interfere with the page around it

### 3. Understand

Explain:

- purpose
- when to use
- when not to use, when meaningful
- anatomy
- native semantics

Do not force `when_not_to_use` for elements where it adds no useful distinction.

### 4. Options

Render applicable fields only:

- variants
- states
- behaviors
- contexts
- trade-offs

Profile rules decide which are required.

### 5. Decide

Render structured product decisions.

The page must distinguish:

- recommended default
- required project decision
- optional enhancement
- trade-off

The reference must not silently make product decisions on behalf of the user.

### 6. Best practices

Use three labels:

- Recommended
- Consider
- Avoid

Claims that depend on standards or evidence must carry inline source markers.

### 7. Common mistakes

Show concrete bad implementations and why they fail.

Mistakes are categorized and may link to concerns. Avoid duplicating full concern guidance.

### 8. Relevant concerns

Only show concerns that materially apply.

Typical examples:

- accessibility
- responsive
- security
- privacy
- performance
- content

Accessibility relevance must always be assessed, even when the resulting guidance is very short.

### 9. Requirement

Generate a human-readable requirement from:

- selected decisions
- current context
- requirement grammar

The generated text is output, not authored truth.

### 10. Review it yourself

Give a non-expert an actionable checklist:

- action to perform
- expected outcome
- severity

Prefer observable checks over abstract rules.

### 11. Verify

Developer/technical verification:

- automated checks
- manual keyboard/focus checks
- responsive/zoom checks
- component-specific checks

Do not use Lighthouse score as a universal atom-level gate.

### 12. Relations

Show:

- Uses, where meaningful
- Related
- Contrasts with
- Used by, generated from inverse relations

### 13. Machine spec

Link the generated spec:

`/specs/elements/<id>.json`

### 14. Sources and review status

Show:

- evidence list
- review roles/status
- last reviewed date

## Profile additions

### semantic

Requires:

- semantics
- content/document context
- accessibility meaning

### layout

Requires:

- constraints
- overflow/reflow
- responsive behavior

### media

Requires:

- alternative/fallback strategy
- responsive media behavior
- performance implications

### control

Requires:

- states
- activation behavior
- keyboard/focus contract

### interactive

Requires:

- state transitions
- keyboard model
- focus management
- close/recovery behavior where relevant

### data

Requires:

- data relationships
- headers/labels
- empty/missing-value handling
- responsive readability

## Omission rule

If a section is not required by the core blueprint or active profiles and contributes no useful information, omit it.

Never render empty headings or `N/A`.

## Element boundary check

Move content out of Elements when:

- it describes a complete user task across multiple steps -> Pattern
- it composes multiple reusable children into a content unit -> Block
- it describes cross-cutting quality guidance -> Concern
- it explains protocol/platform terminology -> Basics
