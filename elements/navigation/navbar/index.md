# Navbar

> A Navbar provides consistent global navigation to the site's most important destinations while preserving orientation and operability across responsive states.

## Build first from the DNA

- [Build DNA](./build-dna.json)
- [Agent discovery](./llms.txt)
- [Human reference](./)
- [Research](./RESEARCH.md)
- [Source repository](https://github.com/blame76/how-to-web/tree/main/elements/navigation/navbar)

Preserve information architecture, link/button semantics, current-page orientation, disclosure behavior, responsive continuity and accessibility. Framework, breakpoint and visual tokens may adapt.

## Scope

Included:

- home/brand link
- primary global links
- current-page state
- optional disclosure groups
- optional narrow/mobile trigger
- optional utility links

Not included:

- promo/announcement bar
- complete search system
- cart or checkout state
- complex account workflow
- mega menu
- complete Site Header composition

## Anatomy

Required:

- navigation landmark
- home link
- primary link list

Optional:

- current page
- disclosure buttons and child link groups
- narrow/mobile disclosure trigger
- utility link group

## Behavior contract

- Links navigate.
- Buttons disclose.
- A control should not navigate and disclose at the same time.
- Ordinary site navigation does not use ARIA menu/menubar semantics by default.
- Disclosure buttons expose expanded state.
- Hover is never required.
- Tab and Shift+Tab remain the keyboard baseline.
- Escape closes an open disclosure and produces logical focus behavior.
- Arrow-key navigation is optional, not required.

## Responsive contract

Mobile is **not** a separate variant.

Across responsive states:

- labels remain the same,
- destinations remain the same,
- ordering remains the same,
- essential destinations remain reachable,
- presentation may collapse behind one explicit disclosure trigger.

## Accessibility contract

- use native `nav`, links and buttons
- keep list semantics for navigation groups
- distinguish multiple navigation landmarks when present
- expose the current page with `aria-current="page"`
- expose disclosure state with `aria-expanded`
- keep visible keyboard focus
- meet WCAG 2.2 target-size minimum or an applicable exception
- do not let sticky/overlay content completely obscure focused components
- integrate a page-level bypass mechanism for repeated global navigation

## Variants

- [Simple](./examples/simple.html) — direct global links.
- [With Disclosures](./examples/with-disclosures.html) — grouped destinations opened by buttons.
- [Utility + Primary](./examples/utility-plus-primary.html) — primary and service links with explicit hierarchy.

Each variant owns its own responsive state. The examples demonstrate the contract; none of them is the contract itself.

## Coding-agent instruction

1. Read `build-dna.json` first.
2. Treat Purpose, Constraints, Behavior and Accessibility as normative.
3. Preserve supplied labels, destinations, ordering and hierarchy.
4. Adapt framework, CSS methodology, visual tokens and exact breakpoint to the target project.
5. Do not infer missing navigation groups from the screenshots or examples.
6. Report missing information-architecture decisions rather than inventing them.
