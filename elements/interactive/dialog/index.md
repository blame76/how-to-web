# Dialog

> A modal Dialog interrupts the current context only when a focused task or decision requires temporary modal attention.

## Build first from the DNA

- [Build DNA](./build-dna.json)
- [Agent discovery](./llms.txt)
- [Human reference](./)
- [Research](./RESEARCH.md)
- [Source repository](https://github.com/blame76/how-to-web/tree/main/elements/interactive/dialog)

## Scope

This reference covers modal dialogs.

Not covered here:

- popovers
- tooltips
- drawers/off-canvas navigation
- toasts
- non-modal floating panels

## Baseline

Prefer native `<dialog>` with `showModal()` when the target platform supports it.

The contract includes:

- accessible name
- initial focus
- background inertness
- Tab/Shift+Tab containment
- Escape dismissal
- explicit close/cancel
- focus return

## Initial-focus strategies

### Information / Long Content

Focus a static start point such as the dialog title with `tabindex="-1"` when reading the content from the beginning matters.

### Form

Focus the first field that is actually relevant to the task.

### Destructive Confirmation

Focus the less destructive action, usually Cancel.

## Closing

Escape closes the modal. There must also be a visible explicit close/cancel action.

After closing, return focus to the invoker unless the workflow has a documented better target.

Backdrop-click dismissal is a product decision, not a default.

## Responsive

At narrow widths the dialog may become nearly or fully edge-to-edge. Content and actions remain reachable at 320 CSS px and 200% zoom.

## Coding-agent entry points

The Build DNA is normative:

- generic Dialog
- Information / Long Content
- Form
- Destructive Confirmation
- adaptation into an existing project

Do not infer destructive defaults, backdrop-close behavior or focus strategy from visual appearance.
