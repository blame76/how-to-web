# Product Card

> A Product Card helps users identify and compare a product in a collection and decide whether to inspect the product detail page.

## Build first from the DNA

Canonical reconstruction contract:

- [Build DNA](./build-dna.json)
- [Agent discovery](./llms.txt)
- [Human reference](./)
- [Source repository](https://github.com/blame76/how-to-web/tree/main/blocks/product-card)

When implementing this component, preserve the purpose, information hierarchy, semantic roles, interaction contract, stable media geometry, responsive behavior, accessibility constraints, and data-honesty constraints. Framework, CSS architecture and visual tokens may be adapted.

## Anatomy

Required:

- product media
- product name
- price
- primary action to the product detail

Optional:

- rating or other real proof data
- variation cue
- alternate product views

## Layout contract

- Vertical flow.
- Card uses the full width of its assigned slot up to a capped maximum.
- Reference maximum inline size: 25rem.
- Product media occupies a fixed 1:1 region.
- Switching alternate images must never resize the card or alter the media aspect ratio.

## Behavior contract

- The whole card is not a JavaScript pseudo-link.
- The primary action is a real link.
- If multiple useful views exist, image switching uses native buttons.
- Image switching is never hover-only.
- Active thumbnail state is programmatically exposed.
- Focus remains on the activated thumbnail.

## Responsive contract

- No horizontal overflow at 320 CSS px.
- Content order remains logical on narrow screens.
- The component remains usable at 200% zoom.
- Responsive images use suitable candidates and reserve geometry before load.

## Accessibility contract

- Native interactive elements.
- Visible focus.
- Full keyboard operation.
- Meaningful image alternatives.
- Thumbnail controls have distinct accessible names.
- Pointer targets meet the WCAG 2.2 target-size requirement or an applicable exception.

## Data honesty

Do not invent discounts, stock, availability, shipping promises, sustainability claims, ratings or review counts that are not supplied by the product data.

## Example

The current visual example is the fictional **Lunar Oversized Hoodie**:

- [Example data](./examples/premium-retail.json)
- [Example page](./examples/premium-retail.html)

The example demonstrates the contract; it is not the contract itself.

## Coding-agent instruction

Given this page or its Build DNA:

1. Read `build-dna.json` first.
2. Treat Purpose, Constraints, Behavior and Accessibility as normative.
3. Adapt framework, CSS methodology and design tokens to the target project.
4. Do not copy reference HTML unless the user explicitly asks for the exact implementation.
5. Ask for missing product decisions instead of inventing them.
6. Report unresolved decisions separately from implementation details.
