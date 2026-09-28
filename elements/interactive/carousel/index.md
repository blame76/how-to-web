# Carousel

> A Carousel presents a controlled sequence of related content when showing everything at once would be impractical or weaken the intended hierarchy.

## Build first from the DNA

- [Build DNA](./build-dna.json)
- [Agent discovery](./llms.txt)
- [Human reference](./)
- [Research](./RESEARCH.md)
- [Source repository](https://github.com/blame76/how-to-web/tree/main/elements/interactive/carousel)

## Scope

A carousel is a sequence with an explicit navigation and state contract. It is not automatically an autoplaying slider.

Default:

- manual navigation
- native previous/next buttons
- no hover requirement
- no drag-only interaction
- no inferred infinite wrapping
- no autofocus on slide change
- reduced-motion support

## Variants

- [Editorial / Visual Story](./examples/editorial-story.html) — one full-bleed slide at a time.
- [Content Rail](./examples/content-rail.html) — several cards visible in a horizontally scrollable rail.
- [Media Gallery](./examples/media-gallery.html) — one primary medium with direct thumbnail selection.

## Behavior

Previous/next controls keep focus after activation. In single-slide variants, inactive slides are removed from interaction. Position changes may be announced with a concise polite status. Autoplay is off unless explicitly requested.

If autoplay is enabled, it needs a stop/start control and must stop when keyboard focus enters the carousel.

## Responsive

The sequence and meaning stay stable. Visible count, crop, spacing and safe areas may adapt. The component must remain usable at 320 CSS px and 200% zoom.

## Motion

Respect `prefers-reduced-motion: reduce`. Non-essential transitions are removed or reduced while functionality stays intact.

## Coding-agent entry points

The Build DNA is normative; these are only entry points:

- generic Carousel
- Editorial / Visual Story
- Content Rail
- Media Gallery
- adaptation into an existing project

Read `build-dna.json` before implementing and report missing decisions rather than inventing autoplay, wrapping or focus behavior.
