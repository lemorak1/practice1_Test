# Repo Agent Instructions

This repository uses several npm scripts for validation. After modifying any files in this repo you must run the following commands:

```
npm run typecheck
npm run lint
npm run test:firebase
```

These checks may fail if dependencies are missing. Still, attempt to run them and report the results.

For documentation, keep the style consistent with existing docs under `docs/`.
