# Mega Menu

> A Mega Menu exposes many site-navigation destinations in scanable groups when a simple dropdown no longer provides enough hierarchy or overview.

## Build first from the DNA

- [Build DNA](./build-dna.json)
- [Agent discovery](./llms.txt)
- [Human reference](./)
- [Research](./RESEARCH.md)

## Baseline semantics

Typical website navigation is not an ARIA `menu`/`menubar`.

Use:

- a navigation landmark,
- real links for destinations,
- native buttons for disclosure,
- `aria-expanded` for state,
- semantic lists and group headings.

If a top-level category is itself a destination, keep the link and disclosure button as separate controls.

## Interaction

Click/tap and Enter/Space are the baseline. Hover is optional enhancement only.

Escape closes the open panel and returns focus to its disclosure trigger. Moving focus fully outside the navigation closes the panel. Normal Tab/Shift+Tab remains the primary keyboard path.

Only one mega panel is open at a time in the reference variants.

## Hover

No hover is required by the reference.

If a project adds hover:

- click/tap must still work,
- the panel must remain reachable with the pointer,
- Escape must dismiss it,
- avoid instant flicker,
- meet WCAG 1.4.13.

## Variants

- [Grouped Links](./examples/grouped-links.html) — category-based groups.
- [Task Based](./examples/task-based.html) — groups based on user tasks.
- [Featured Content](./examples/featured-content.html) — groups plus one subordinate teaser.

## Responsive

Preserve the information architecture. On narrow viewports, stack groups/disclosures vertically instead of squeezing the desktop grid.

## Coding-agent entry points

The Build DNA is normative:

- generic Mega Menu
- Grouped Links
- Task Based
- Featured Content
- adaptation into an existing project

Do not invent hover behavior, information architecture or dismiss rules from visual appearance.
