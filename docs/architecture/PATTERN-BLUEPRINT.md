# Pattern Blueprint

Status: draft v0.2

A Pattern describes a complete user task or flow composed from Elements and Blocks.

Examples: Login, Contact Form, Search, Checkout, File Upload flow.

## Required sections

### 1. Identity and user goal

State the user task in plain language.

Example:

> A user proves their identity and enters the authenticated area.

### 2. Live flow

The sandbox demonstrates the complete safe flow.

Requirements:

- no real credentials or sensitive data
- all important states are reachable
- failure paths are demonstrable
- sandbox is clearly bounded and skippable
- no production side effects

### 3. Composition

List canonical Elements and Blocks used by the Pattern.

Do not repeat their full guidance.

### 4. Flow

Model steps and transitions explicitly.

```yaml
flow:
  initial: anonymous
  states:
    - anonymous
    - authenticating
    - authenticated
    - error
  transitions:
    - from: anonymous
      event: submit-valid
      to: authenticating
    - from: authenticating
      event: success
      to: authenticated
    - from: authenticating
      event: failure
      to: error
```

### 5. Data

Describe data categories, not implementation storage details alone.

```yaml
data:
  inputs:
    - email
    - password
  processed:
    - credentials
  persisted:
    - session
  sensitive:
    - password
```

Security/privacy claims belong to concerns; the Pattern records the data boundary.

### 6. Errors

For each meaningful failure:

- where it occurs
- what the user experiences
- whether retry is possible
- what remains preserved

### 7. Recovery

Explain how users continue after failure.

Recovery is not the same as an error message.

### 8. Abort and resume

Explicitly answer:

- Can the user leave safely?
- Is partial progress stored?
- Can the task resume?
- What expires?

Omit resume mechanics only when genuinely irrelevant; do not assume "start over" silently.

### 9. Edge cases

Examples:

- empty data
- partial failure
- timeout
- stale state
- repeated submit
- unavailable dependency

Only include cases meaningful to the Pattern.

### 10. Decisions

Patterns contain product decisions that must not be delegated silently to the LLM.

For Login these may include:

- identifier type
- remember-me
- password reset
- MFA
- passkeys
- registration link

### 11. Relevant concerns

Patterns commonly activate several concerns:

- accessibility
- security
- privacy
- content
- responsive
- performance where relevant

Patterns link to concern references and child references instead of copying them.

### 12. Common mistakes

Pattern mistakes focus on flow failures:

- losing user input after recoverable error
- unclear success destination
- double submission
- inaccessible error recovery
- exposing sensitive information in failure messages

### 13. Requirement

Generated from:

- user goal
- selected decisions
- flow requirements
- child constraints
- active concerns

The generated requirement should be suitable for implementation by a human or LLM and reviewable against the same source.

### 14. Review it yourself

Non-expert review follows the full task:

- complete happy path
- deliberately trigger a failure
- retry
- navigate with keyboard
- leave and return if resume is supported
- test repeated activation where relevant

Each item has an expected observable result.

### 15. Verify

Technical verification may include:

- integration tests
- accessibility automation
- keyboard/focus manual review
- security tests where relevant
- responsive tests
- state-transition tests

### 16. Relations

Patterns author `uses` relations to Elements/Blocks.

Inverse `used_by` / appearances are generated.

### 17. Machine spec and evidence

Generated spec:

`/specs/patterns/<id>.json`

Include source evidence, review roles and last-reviewed state.

## Pattern boundary check

If the subject has no meaningful task-level state or user flow, it is probably an Element or Block, not a Pattern.
