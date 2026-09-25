# Block Blueprint

Status: draft v0.2

A block is a reusable composition of elements. It has no complete multi-step user flow of its own.

Examples: Card, Hero, Product Card, Alert Banner, CTA Section.

## Required sections

### 1. Identity and purpose

Explain what the block communicates or enables.

### 2. Live

Show the complete block in a realistic but minimal example.

Optional controls may switch block variants. Avoid turning the sandbox into a page builder.

### 3. Composition

Composition is structured, not prose-only.

```yaml
composition:
  required:
    - element:image
    - element:heading
    - value:price
  optional:
    - block:badge
    - element:rating
    - value:previous-price
    - element:button
  order:
    - image
    - badge
    - heading
    - rating
    - price
    - button
  constraints:
    - "Heading contains the primary product link."
    - "CTA follows the Button reference."
```

Required and optional children must be explicit.

### 4. Content hierarchy

Document what information must remain primary, secondary and tertiary.

A visual redesign may change layout without destroying information hierarchy.

### 5. Variants

Blocks may have their own composition variants.

Example:

```yaml
variants:
  - image-top
  - image-left
  - compact
```

These are Block variants, not child-element variants.

### 6. Responsive composition

Describe reflow rules and invariants.

Example:

```yaml
responsive:
  invariants:
    - "Heading remains before the primary action in reading order."
  adaptations:
    - condition: "narrow container"
      change: "CTA may become full width."
```

Avoid hard-coding arbitrary breakpoints in editorial guidance unless the breakpoint itself is the lesson.

### 7. Decisions

Product decisions may include:

- optional children
- content hierarchy choices
- variant
- action availability
- density

### 8. Relevant concerns

Typical:

- accessibility of composition and reading order
- responsive
- performance for media-heavy blocks
- content
- security/privacy only where data boundaries exist

Child rules should be referenced, not copied.

### 9. Common mistakes

Focus on composition failures:

- duplicate primary actions
- visual order conflicts with reading order
- entire card made clickable while nested controls remain interactive
- missing hierarchy
- hidden critical information on narrow layouts

### 10. Requirement

Generate the requirement from chosen variant, child set, constraints and decisions.

### 11. Review it yourself

Checks should be observable by a non-expert:

- Can you identify the primary information?
- Is the primary action obvious?
- Does the block still make sense at narrow width?
- Does keyboard order follow reading order?

### 12. Verify

Technical checks for:

- child semantics
- reading/focus order
- responsive behavior
- relevant automation

### 13. Relations

A Block MUST author `uses` for canonical child references.

`used_by` is generated.

### 14. Machine spec and evidence

Generated spec:

`/specs/blocks/<id>.json`

Include review status and sources.

## Block boundary check

It is no longer a Block when documentation primarily describes:

- several sequential user steps
- cross-step validation/recovery
- persistent flow state
- abandonment/resume

Those belong in a Pattern.
