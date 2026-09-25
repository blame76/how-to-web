# Review Gate

Status: draft v0.2

A reference can end review as:

- **PASS** — publishable reference quality
- **NEEDS WORK** — concrete fixable findings
- **BLOCKED** — unresolved evidence, classification or product-model question

Review is role-based. One person or model may perform several roles, but the roles should be reviewed separately.

## Reviewer roles

Always:

- Editorial / Product
- Technical
- Accessibility

Conditional:

- Security
- Privacy
- Performance

## Core Gate — all references

### Classification

- [ ] Correct kind: Element, Block or Pattern
- [ ] For Elements: primary profile is correct
- [ ] Secondary profiles are justified
- [ ] Content is not being forced into the wrong kind/profile

### Purpose

- [ ] Purpose is understandable without implementation knowledge
- [ ] Use boundary is clear where a meaningful alternative exists

### Live

- [ ] Example is real and usable
- [ ] Example teaches the subject rather than decoration
- [ ] Sandbox is clearly bounded
- [ ] Sandbox can be skipped
- [ ] Sandbox does not trap keyboard/screenreader users

### Semantics / structure

- [ ] Native semantics are preferred where appropriate
- [ ] Anatomy/composition/flow matches the kind
- [ ] No duplicated child-reference guidance

### Decisions

- [ ] Product decisions are explicit
- [ ] Required decisions are not silently chosen by the reference
- [ ] Recommended defaults are marked as recommendations, not universal truth
- [ ] Trade-offs are visible when legitimate alternatives exist

### Common mistakes

- [ ] Known practical implementation mistakes are covered
- [ ] Mistakes are categorized
- [ ] Concern guidance is referenced, not duplicated

### Review competence

- [ ] "Review it yourself" contains observable actions and expected outcomes
- [ ] A non-developer can use the checks after Vibe Coding

### Evidence

- [ ] Normative/factual claims are sourced
- [ ] Sources favor authoritative standards/platform guidance
- [ ] Contested guidance is represented as trade-off, not false certainty

### Relations / duplication

- [ ] Relations use controlled vocabulary
- [ ] Canonical direction is authored only once
- [ ] Existing references are linked instead of copied

### Machine representation

- [ ] Canonical YAML is valid
- [ ] Human and machine outputs are generated from the same source
- [ ] No manually divergent machine spec

## Element conditional gates

### semantic

- [ ] Native meaning is correct
- [ ] Document/content context is clear
- [ ] Accessibility meaning is considered

### layout

- [ ] Reflow/overflow constraints are documented
- [ ] Zoom/narrow-container behavior is understood

### media

- [ ] Alternative/fallback behavior exists where needed
- [ ] Responsive media behavior is considered
- [ ] Performance implications are addressed where material

### control

- [ ] Relevant states are documented
- [ ] Activation behavior is documented
- [ ] Keyboard and focus behavior are reviewed

### interactive

- [ ] State transitions are explicit
- [ ] Keyboard model is explicit
- [ ] Focus management is explicit
- [ ] Escape/close/recovery behavior is explicit where relevant

### data

- [ ] Data relationships/headers are understandable
- [ ] Empty/missing values are handled
- [ ] Responsive readability is considered

## Block Gate

- [ ] Required children listed
- [ ] Optional children listed
- [ ] Child order/hierarchy explicit
- [ ] Child constraints reference canonical Elements/Blocks
- [ ] Block variants are separate from child variants
- [ ] Responsive composition preserves reading/information hierarchy

## Pattern Gate

- [ ] User goal is explicit
- [ ] Flow states and transitions are explicit
- [ ] Data boundary is documented
- [ ] Error behavior is documented
- [ ] Recovery is documented
- [ ] Abort/resume behavior is consciously decided
- [ ] Meaningful edge cases exist
- [ ] Pattern composes canonical child references

## Platform Gate — how-to-web itself

The reference site must meet the standards it teaches.

At minimum review:

- [ ] keyboard navigation
- [ ] visible focus
- [ ] landmarks/headings
- [ ] skip navigation
- [ ] sandbox entry/exit
- [ ] zoom/reflow
- [ ] contrast
- [ ] reduced motion where motion exists
- [ ] screenreader usability of interactive examples

Platform failures can block publishing a reference even when its content is correct.

## Fixture matrix

Before declaring the blueprints stable, dry-run them against:

| Fixture | Purpose |
|---|---|
| Divider | minimal/reference noise |
| Link | multi-profile semantics/control |
| Button | control + states |
| Input | form state + error + A11y |
| Image | media + alt + performance |
| Dialog | complex behavior + focus |
| Card | composition |
| Login | complete flow |

A schema change is preferred over fixture-specific hacks when multiple fixtures expose the same weakness.

## Wave 1a

Publish only after the model survives one full production cycle:

Elements:
- Link
- Button
- Input
- Dialog

Block:
- Card

Pattern:
- Login

Wave 1b starts only if Wave 1a does not require a structural schema rewrite.
