# Combobox

> An editable Combobox is an input plus a controlled popup of candidate values. The difficult part is not the dropdown — it is the state contract.

## Decide before building custom ARIA

Use the [Build DNA selection gate](./build-dna.json).

### Prefer a native select when

- valid values are closed and known,
- the user selects one existing value,
- custom text filtering is not required.

### Consider datalist when

- arbitrary text remains valid,
- suggestions are simple,
- the target browser and assistive-technology matrix has been tested.

`datalist` currently has meaningful styling/support/accessibility limitations, so it is not a universal shortcut.

### Build a custom editable Combobox when

the task genuinely needs controlled query filtering, active suggestion state, an explicit free-text/restricted value policy, or a controlled listbox popup.

Visual styling by itself is not sufficient justification.

## The state contract

Do not collapse these states:

- **query** — text currently in the input,
- **popup_open** — whether suggestions are visible,
- **active_option** — the currently navigated suggestion,
- **selected_value** — the explicitly committed value,
- **value_policy** — free text or restricted list value.

An active option is not automatically selected.

## Baseline behavior

This reference uses **list autocomplete with manual selection**.

- typing filters suggestions,
- no suggestion becomes selected merely because it is first,
- DOM focus remains on the input,
- `aria-activedescendant` represents the active option,
- Arrow Down/Up changes the active option,
- Enter commits it,
- Escape closes without committing it,
- Tab stays normal focus navigation,
- native text-editing keys remain native.

## Value policies

### Free Text Suggestions

Suggestions help, but unlisted text may remain the field value.

### Restricted Selection

Typing filters known values, but only an explicitly committed listed option is valid.

### Rich Suggestions

Options may display secondary metadata while still acting as one selectable value. If independent controls/cells are required inside each result, this listbox variant is no longer the right popup contract.

## Build first from the DNA

- [Build DNA](./build-dna.json)
- [Agent discovery](./llms.txt)
- [Human reference](./)
- [Research](./RESEARCH.md)

## Coding-agent entry points

The Build DNA is normative:

- pattern selection: select vs datalist vs Combobox,
- generic editable Combobox,
- Free Text Suggestions,
- Restricted Selection,
- Rich Suggestions,
- adaptation into an existing project.

Do not infer value policy, automatic selection or submission behavior from appearance.
