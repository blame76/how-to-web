# Profile Schema

Status: draft v0.2

Profiles describe the role an element plays. They are not taxonomy folders and they are not mutually exclusive.

Only `kind: element` uses this profile model by default. Blocks and patterns have their own blueprints.

## Model

```yaml
profiles:
  primary: control
  secondary:
    - semantic
```

Rules:

1. Exactly one primary profile.
2. Zero or more secondary profiles.
3. The slug does not change when profiles change.
4. The primary profile controls the default visible sections.
5. Secondary profiles add requirements; they never remove primary requirements.
6. Profile assignment is part of Core Review.

## Allowed profiles

### semantic

For elements whose main job is meaning or document structure.

Examples:

- heading
- paragraph
- time
- abbreviation
- divider

Adds emphasis on:

- native semantics
- content rules
- document context
- assistive-technology meaning

Usually does not require:

- interaction states
- keyboard behavior

### layout

For primitives whose main job is arrangement, containment or positioning.

Examples:

- container
- stack
- grid
- sticky
- scroll-container

Adds emphasis on:

- layout constraints
- overflow
- reflow
- responsive behavior
- zoom behavior

### media

For visual/audio/embedded content.

Examples:

- image
- video
- audio
- embed
- icon when used as content

Adds emphasis on:

- alternatives/fallbacks
- loading behavior
- responsive media
- performance
- accessible names/descriptions where applicable

### control

For directly operable controls.

Examples:

- button
- checkbox
- radio
- select
- text input
- link with href

Adds emphasis on:

- states
- activation
- input/output
- keyboard
- focus
- target size
- disabled/readonly semantics where applicable

### interactive

For stateful widgets or compound interactions.

Examples:

- dialog
- tabs
- accordion
- combobox
- tooltip

Adds emphasis on:

- state machine
- keyboard model
- focus management
- open/close behavior
- escape/recovery behavior
- announcements where applicable

An element can be both `control` and `interactive`; choose the profile that best describes its primary user contract.

### data

For presentation or manipulation of structured data.

Examples:

- data table
- sortable table
- KPI/stat where data semantics matter

Adds emphasis on:

- headers/associations
- sorting/filtering semantics where applicable
- empty/missing values
- readable structure
- responsive degradation

## Examples

### Link

```yaml
profiles:
  primary: control
  secondary:
    - semantic
```

Reason: the user's contract is navigation/activation, but the element also carries document semantics.

### Button

```yaml
profiles:
  primary: control
  secondary: []
```

A toggle button may add `interactive` as secondary.

### Dialog

```yaml
profiles:
  primary: interactive
  secondary:
    - semantic
```

### Image

```yaml
profiles:
  primary: media
  secondary:
    - semantic
```

The semantic profile matters because informative and decorative images have different meaning.

### Table

Static data table:

```yaml
profiles:
  primary: data
  secondary:
    - semantic
```

Sortable table:

```yaml
profiles:
  primary: data
  secondary:
    - semantic
    - interactive
```

## Profile review

Every element review must answer:

- Is the primary profile the best description of the user contract?
- Is a secondary profile missing?
- Is a profile being added only to force a preferred page section?
- Does the profile reflect actual behavior, not implementation technology?
- Would the same element in another context need a different secondary profile?

If profile assignment feels artificial, change the profile model rather than forcing the element into it.
