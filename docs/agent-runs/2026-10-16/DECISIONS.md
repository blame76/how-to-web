# Decisions

## Adopted documented rules and routine choices

- Keep Build DNA JSON as the canonical reconstruction contract; the existing architecture explicitly defines that format and the synchronization tool treats the JSON as source of truth.
- Keep examples informative, not normative. Do not change interaction or product rules where existing contracts already state a rule.
- Repair only objective repository drift: expose each existing research file from its DNA `public` map and bring Product Card's research description into line with its current fixture.
- Preserve Form Submission's `ready-for-review` status and the example's demo-only outcome settings. They do not establish a real contact-form backend or retry policy.
- Lock the already pinned npm dependencies; add no runtime dependency.
- Use the current `setup-node` release checked during this run (`v7.1.0`, immutable release commit `949feb2413d6458794dcd2491c4babbbce0c15c1`). The GitHub Advisory Database returned no known vulnerabilities for that action version.

## Decisions intentionally not made (`BLOCKED`)

- `REFERENCE-SCHEMA.md` excludes `organism`, but `BUILD-DNA.md` describes it and five published DNA files use it. A human must decide whether to update the allowed-kind schema, change those contracts, or revise the blueprint taxonomy. This run does not silently pick an architecture.
- The Form Submission DNA contracts a submission lifecycle; it does not decide a specific contact form's field policy, endpoint, HTTP/API response mapping, persistence, privacy/retention, authenticated CSRF protection, or idempotency behavior. These remain task/backend decisions. Do not generalize the simulator's `retry_safe` values.
- The independent reconstruction results for both scenarios remain unavailable; no self-assessment is substituted.
- External technical claims remain unverified because source retrieval was blocked.

## Not attempted (`OUT OF SCOPE`)

- Generating references for the other 142 `.gitkeep` placeholders or the 14 showcase directories without Build DNA.
- Introducing a site generator, CMS, framework, new reference, or production backend.
- Merging or deploying.
