# Production test strategy

Run the complete release gate with:

```sh
npm test
```

`npm run test:production` launches Openleaf with an isolated temporary user-data directory and verifies:

- 200 explicit production DOM contracts covering the project, editor, PDF, terminal, notes, and PowerPoint surfaces
- global accessibility and semantic invariants
- layout and perceptual visual baselines at 1180×700, 1440×900, and 1728×1050
- project, settings, new-project, and command-palette states
- startup, overlay, command-palette, reflow, and screenshot latency budgets
- background generation of missing project-card previews without blocking the project grid

The production suite never opens or modifies real projects. Visual comparisons use a 256-bit perceptual fingerprint with a small tolerance for antialiasing differences. Intentional visual changes must be reviewed and recorded in `tests/production/visual-baselines.json`.
