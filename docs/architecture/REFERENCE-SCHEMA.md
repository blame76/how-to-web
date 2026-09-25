# Reference Schema

Status: draft v0.2

This document defines the canonical content model for how-to-web. It is not a page template. Rendering rules belong to the kind-specific blueprints.

## Core principles

- The canonical source is structured YAML.
- Human HTML and machine JSON are derived outputs.
- Paths describe domain structure, not rendering profiles.
- Irrelevant fields are omitted. Do not author `N/A`.
- English canonical IDs and slugs; German editorial content for the initial locale.
- Facts, decisions, relations, review steps and evidence are structured data.
- Explanatory prose may use Markdown inside approved text fields.

## Identity

Every record MUST define:

```yaml
id: button
kind: element
locale: de
title: Button
term_de: Schaltfläche
slug: elements/links-buttons/button
status: draft
last_reviewed: null
```

Allowed `kind` values:

- `element`
- `block`
- `pattern`

## Profiles

Profiles apply to elements. They do not change the slug.

```yaml
profiles:
  primary: control
  secondary:
    - semantic
```

The primary profile controls the default documentation surface. Secondary profiles add relevant gates and sections.

See `PROFILE-SCHEMA.md`.

## Purpose

Purpose is short explanatory prose.

```yaml
purpose: |
  Ein **Button** löst eine Aktion aus.
  Er führt nicht primär zu einer anderen Ressource.
```

Target: one to three short paragraphs.

## Use boundaries

```yaml
when_to_use:
  - text: "Eine unmittelbare Aktion auslösen."
  - text: "Ein Formular absenden."

when_not_to_use:
  - text: "Wenn das Ziel eine andere Seite oder Ressource ist."
    use_instead:
      - element:link
```

Use lists for scannability. Each item should contain one decision.

## Live

`live` describes the experiential sandbox, not a screenshot.

```yaml
live:
  default_example: default
  examples:
    - id: default
      label: "Standard"
  controls:
    - decision_ref: variant
    - decision_ref: loading
```

Controls are optional. A divider may have a live example without controls.

## Anatomy and semantics

```yaml
anatomy:
  - id: label
    required: true
    description: "Beschreibt die ausgelöste Aktion."
  - id: icon
    required: false
    description: "Kann das Label unterstützen."

semantics:
  native_html: button
  notes:
    - "Native Semantik bevorzugen."
```

For blocks use the composition model from `BLOCK-BLUEPRINT.md`.

## Variants

Variants answer: "What kind of this thing is it?"

```yaml
variants:
  - id: primary
    label: Primary
  - id: secondary
    label: Secondary
```

Do not mix variants with states.

## States

A state is an observable condition at one point in time.

```yaml
states:
  - default
  - hover
  - focus-visible
  - active
  - disabled
  - loading
```

Examples include `checked`, `selected`, `expanded`, `invalid`.

## Behaviors

Behavior is cause -> effect or a transition between states.

```yaml
behaviors:
  - id: activate-pointer
    trigger: "click"
    result: "action"
  - id: submit-loading
    trigger: "submit"
    transition:
      from: default
      to: loading
```

Keep states and transitions separate.

## Contexts

Contexts describe expectations created by the surrounding UI.

```yaml
contexts:
  - id: inside-form
    notes:
      - "Der Button-Typ muss bewusst festgelegt werden."
  - id: inside-dialog
    notes:
      - "Aktion und Fokusverhalten müssen zum Dialog passen."
```

Only author this field when the surrounding context materially changes expectations.

## Decisions

Every product decision MUST use one of five types:

- `boolean`
- `single`
- `multiple`
- `value`
- `text`

```yaml
decisions:
  - id: variant
    question: "Welche visuelle Priorität hat die Aktion?"
    type: single
    required: true
    options:
      - primary
      - secondary
      - danger
    recommended_default: primary
    tradeoffs: []
```

Optional fields:

- `depends_on`
- `tradeoffs`
- `recommended_default`
- `constraints`

Decisions define what the author/user must choose. The LLM must not silently invent required product decisions.

## Requirement generation

A finished requirement is derived from decisions + context + grammar.

```yaml
requirement:
  subject: "Button"
  clauses:
    - decision: variant
      phrases:
        primary: "Verwende einen Primary Button."
        secondary: "Verwende einen Secondary Button."
    - decision: loading
      when: true
      phrase: "Während der Verarbeitung zeigt der Button einen Loading-State."
```

Do not maintain a separate hand-written final prompt as a second source of truth.

## Concerns

Concerns are references to cross-cutting guidance.

```yaml
concerns:
  accessibility:
    - accessibility/focus
    - accessibility/name-role-value
  security: []
  privacy: []
```

Omit empty concern groups in authored YAML.

## Common mistakes

Mistakes are structured and categorized.

Allowed initial categories:

- `semantics`
- `accessibility`
- `usability`
- `security`
- `privacy`
- `performance`
- `content`
- `responsive`

```yaml
mistakes:
  - id: div-as-button
    category: semantics
    bad_example: '<div onclick="save()">Speichern</div>'
    reason: "Kein natives Button-Verhalten."
    concern_refs:
      - accessibility/keyboard
```

A mistake may reference a concern; it must not duplicate the concern article.

## Relations

Author only canonical directions.

Allowed authored relations:

- `uses`
- `related`
- `contrasts_with`
- `replaces`

Generated inverse relations:

- `used_by`
- `replaced_by`

```yaml
relations:
  uses:
    - element:image
    - element:heading
  related:
    - element:icon-button
  contrasts_with:
    - element:link
```

No free-text relation types.

## Review it yourself

These checks are for people reviewing generated results, not developer test runners.

```yaml
review_items:
  - id: keyboard-reachable
    category: accessibility
    action: "Erreiche das Element ausschließlich mit der Tastatur."
    expected: "Das Element ist erreichbar und der Fokus sichtbar."
    severity: must
```

Required fields:

- `id`
- `category`
- `action`
- `expected`
- `severity` (`must`, `should`, `consider`)

## Verification

Technical verification is separate from user review competence.

```yaml
verification:
  automated:
    - axe
  manual:
    - keyboard
    - zoom-200
```

Only list checks that are meaningful for the reference.

## Trade-offs and open questions

Use when reputable guidance or product goals permit multiple legitimate approaches.

```yaml
tradeoffs:
  - id: disabled-submit
    question: "Submit deaktivieren oder Validierung nach Aktivierung zeigen?"
    options:
      - id: disabled
        effects:
          - "Verhindert frühe Übermittlung."
      - id: enabled
        effects:
          - "Erlaubt unmittelbares Feedback."
```

Do not manufacture consensus.

## Sources

Normative or factual claims must point to evidence close to the claim in the rendered page.

```yaml
sources:
  - id: wcag-target-size
    authority: W3C
    title: "WCAG 2.2"
    locator: "2.5.8 Target Size (Minimum)"
    url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html"
    accessed: "YYYY-MM-DD"
```

Markdown prose may reference sources by source ID. Rendering resolves the marker inline and also builds the source list.

## Version and review status

```yaml
status: draft
last_reviewed: null
review:
  editorial: pending
  technical: pending
  accessibility: pending
```

Conditional roles such as security and performance are added only where relevant.

Review triggers include:

- standard changes
- material browser behavior changes
- changed authoritative guidance
- discovered defect
- changed best-practice assessment

No arbitrary expiry date is required.

## Derived outputs

A valid canonical source can produce at least:

- human page: `/<slug>/`
- machine spec: `/specs/<kind>/<id>.json`
- relation graph
- generated requirement
- review checklist

The YAML source is the authority when generated outputs disagree.
