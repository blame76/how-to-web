# Form Submission

> A form is not finished when the user presses Submit. It is finished when the outcome is clear and the next step is safe.

## What this pattern covers

This pattern starts at **submit intent** and follows the task until a clear outcome:

- input can be corrected,
- valid data can be submitted,
- the user can see when work is in progress,
- success is explicit,
- validation failure is not confused with service failure,
- retry is defined instead of guessed.

The contact form in the human reference is only a demonstration. It is not the generic contract.

## The core flow

```text
editing
  ├─ invalid → correction → editing
  └─ submitting
       ├─ success
       ├─ validation_error → correction
       ├─ submission_error → recovery
       └─ outcome_unknown → domain-specific recovery
```

Not every implementation needs to render every state visually. A normal server-rendered form may let the browser handle navigation while an asynchronous enhancement makes `submitting` visible.

## Four outcomes people should be able to distinguish

### Success

The task completed. Tell the user what happened in task language.

### Validation error

Something in the submitted data can be corrected by the user. Identify the problem and preserve entered values.

### Submission error

The data may be fine, but the service could not complete the task. Do not blame a form field for a server problem.

### Outcome unknown

The client lost certainty about whether the server completed the action. Do not automatically claim failure or encourage an unsafe retry.

## Validation

Client-side validation helps the user.

Server-side validation remains authoritative.

Native HTML validation, fully controlled server-rendered validation and enhanced validation can all be valid choices. Timing and presentation should be deliberate rather than copied as a universal rule.

## Submission

Use the semantics of the task:

- GET for retrieval/search-like tasks without intended side effects.
- POST for typical state-changing submissions.

Native form submission is a useful baseline. Asynchronous submission is an enhancement that creates extra visible state and error handling; it must not silently change the underlying task contract.

## Retry and duplicates

A disabled button is not a complete duplicate-submission strategy.

For state-changing requests, decide whether repeated processing is harmless, whether the server can deduplicate, and what the user should do when the result is uncertain.

## Accessibility

The flow must make errors, progress and completion understandable without relying only on visual styling.

For dynamic flows:

- status changes should be programmatically exposed,
- focus behavior after errors should be deliberate,
- error messages should identify the problem in text,
- recoverable errors should keep the user's input.

## Build DNA

- [Build DNA](./build-dna.json)
- [Agent discovery](./llms.txt)
- [Human reference](./)
- [Research](./RESEARCH.md)

The Build DNA is normative. Research, examples and explanatory prose are informative unless the contract explicitly incorporates them.
