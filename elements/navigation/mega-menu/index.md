# Mega Menu

> A Mega Menu is justified by the overview it creates, not by the amount of screen space it can occupy.

## Decide before you build

The first question is not “How do I build a Mega Menu?” but:

**Does a Mega Menu solve this navigation task better than a simpler pattern?**

Use the [Build DNA selection gate](./build-dna.json).

A Mega Menu is easier to justify when:

- there are many relevant destinations,
- those destinations form meaningful, stable groups,
- users benefit from seeing several groups at the same time,
- reduced drill-down or better scanability improves the task,
- the same information architecture still makes sense on narrow viewports.

It is harder to justify when:

- a small dropdown already exposes the relevant destinations clearly,
- groups are forced or mostly mirror the organization chart,
- the real problem is unclear/deep information architecture,
- the goal is to put nearly every site page into one panel,
- the main argument is visual impact.

There is **no universal link-count threshold** in this contract.

When the choice matters, compare the Mega Menu with the simplest credible alternative using the same information architecture and realistic findability tasks. Prefer the simpler pattern when it serves the tasks equally well.

## Pattern vs information architecture

A Mega Menu makes grouping visible. That helps only when the groups themselves help users decide.

A large panel cannot repair weak labels or an internal organization model that users do not understand.

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

## Build first from the DNA

- [Build DNA](./build-dna.json)
- [Agent discovery](./llms.txt)
- [Human reference](./)
- [Research](./RESEARCH.md)

## Coding-agent entry points

The Build DNA is normative:

- pattern selection / Mega Menu justification
- generic Mega Menu
- Grouped Links
- Task Based
- Featured Content
- adaptation into an existing project

Do not invent hover behavior, information architecture or dismiss rules from visual appearance.
