# Openleaf branch and release policy

- `prod` is the production branch. It must contain the current release-ready version of Openleaf.
- Do not commit or push to `prod` unless Alex explicitly asks to push or promote the current work to production.
- `dev` is the default development branch. Unless Alex explicitly says otherwise, create commits and push completed changes to `dev`.
- Begin new implementation work from `dev`, and leave the working repository on `dev` after a production promotion.
- Treat `main` as a legacy branch. Do not use it for new pushes unless Alex explicitly requests it.
- Before promoting `dev` to `prod`, run the relevant checks, confirm exactly which commit will be promoted, and update `prod` without including unrelated working-tree changes.
