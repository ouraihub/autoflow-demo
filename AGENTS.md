# AGENTS.md

Demo project for AutoFlow acceptance tests.

- Every exported function has a test in a `*.test.ts` file next to it.
- `npm test` must pass.

## Agent runtime

- The AutoFlow agent installs omp at `@latest` on every run. This is the repository owner's decision: omp releases several times a week and is used at its latest version locally too. Reviews must not request pinning omp. The model keys exposed to that run are owner-controlled.
- AutoFlow itself is referenced by full commit SHA; upgrading that SHA is a normal reviewed change.
