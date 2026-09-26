# Authoring Guide

Status: draft v0.2

This guide keeps the canonical YAML pleasant to write while remaining structured enough to validate and render.

## Source of truth

Canonical source:

`content/<kind>/<id>.yaml`

Examples:

```text
content/elements/button.yaml
content/blocks/card.yaml
content/patterns/login.yaml
```

Derived outputs:

```text
/elements/links-buttons/button/
/specs/elements/button.json
```

Never hand-edit a generated JSON spec.

## Language

Initial editorial locale:

```yaml
locale: de
```

Canonical IDs, profile names, relation types and slugs are English.

Example:

```yaml
id: button
title: Button
term_de: Schaltfläche
```

If another language is added later, use separate locale sources with the same canonical ID instead of nesting every string under language keys.

## YAML vs Markdown

Use structured YAML for anything we need to:

- validate
- filter
- generate
- relate
- review mechanically

Use Markdown inside YAML strings for explanation.

Good prose fields:

- `purpose`
- `reason`
- explanatory `notes`
- trade-off effects

Good structured fields:

- profiles
- variants
- states
- behaviors
- decisions
- mistakes
- relations
- review items
- sources
- composition
- flow

Example:

```yaml
purpose: |
  Ein **Button** löst eine Aktion aus.

mistakes:
  - id: div-as-button
    category: semantics
    reason: |
      Ein `div` erhält nicht automatisch das native
      Tastaturverhalten eines Buttons.
```

## Omission over emptiness

Do not write:

```yaml
variants: []
security: N/A
behavior: null
```

Omit fields that do not apply.

The renderer must cope with absent optional fields.

## IDs and slugs

IDs:

- lowercase kebab-case
- stable after publication
- English canonical terminology
- no presentation detail in ID

Good:

- `button`
- `product-card`
- `password-reset`

Avoid:

- `blue-button`
- `card-v2`
- `new-login`

Slugs follow taxonomy, not profiles.

## Decisions

Allowed types:

- `boolean`
- `single`
- `multiple`
- `value`
- `text`

Use `single` when exactly one known option must be chosen.

Use `multiple` when several known options may coexist.

Use `boolean` for true/false feature decisions.

Use `value` for constrained values such as count, timeout or label text with validation.

Use `text` only when the answer is intentionally open-ended.

Every required decision should answer:

- what is being decided?
- what choices exist?
- is there a recommended default?
- what trade-off matters?
- does it depend on another decision?

## Requirement grammar

Requirements are generated from decisions and context.

Do not author a second complete free-text prompt.

Keep clauses small and composable.

```yaml
requirement:
  subject: "Button"
  clauses:
    - decision: loading
      when: true
      phrase: "Während der Verarbeitung zeigt der Button einen Loading-State."
```

A later language model may improve wording, but it must not invent factual/product choices absent from structured decisions.

## Review items

Review items teach non-developers how to inspect generated output.

```yaml
review_items:
  - id: keyboard-reachable
    category: accessibility
    action: "Navigiere nur mit der Tastatur zum Element."
    expected: "Das Element ist erreichbar und der Fokus sichtbar."
    severity: must
```

Write observable actions. Avoid "Check accessibility".

## Verification

Keep developer verification separate from review items.

Example:

```yaml
verification:
  automated:
    - axe
  manual:
    - keyboard
    - zoom-200
```

## Mistakes

Use stable categories:

- semantics
- accessibility
- usability
- security
- privacy
- performance
- content
- responsive

A mistake should contain:

- ID
- category
- bad example when useful
- reason
- concern refs when applicable

Do not duplicate the full concern article.

## Relations

Allowed authored relations:

- `uses`
- `related`
- `contrasts_with`
- `replaces`

Generated inverse relations:

- `used_by`
- `replaced_by`

Do not manually author inverses.

Use typed references:

```yaml
relations:
  uses:
    - element:image
    - block:badge
  contrasts_with:
    - element:link
```

## Sources and claims

Source priority:

1. normative web/accessibility standards
2. browser/platform documentation
3. security standards/guidance
4. established public design systems
5. supplementary UX/practice sources

Source records live in `sources` with stable IDs.

Editorial prose may use source markers resolved by the renderer. A source list at the bottom does not replace claim-level attribution.

When sources disagree:

- record the trade-off
- attribute each position
- do not manufacture a universal rule

## Versioning

Each reference has:

- `status`
- `last_reviewed`
- role-specific review state
- source access/version metadata where useful

Review triggers:

- standard revision
- material browser change
- changed authoritative guidance
- defect report
- best-practice reassessment

Do not create arbitrary expiry dates.

## Authoring ergonomics gate

Before accepting the schema itself, verify:

- a knowledgeable editor can read a source file without learning a DSL
- optional fields can truly be omitted
- the same fact is not authored twice
- inverse relations are generated
- generated requirement text does not require hand-sync
- validator errors can identify the field and expected fix
- typical Wave 1a sources remain reasonably short

If a correct source becomes hundreds of lines mainly because of schema ceremony, simplify the schema before scaling content.
