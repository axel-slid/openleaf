# Openleaf branch and release policy

- `prod` is the production branch. It must contain the current release-ready version of Openleaf.
- Do not commit or push to `prod` unless Alex explicitly asks to push or promote the current work to production.
- `dev` is the default development branch. Unless Alex explicitly says otherwise, create commits and push completed changes to `dev`.
- Begin new implementation work from `dev`, and leave the working repository on `dev` after a production promotion.
- Treat `main` as a legacy branch. Do not use it for new pushes unless Alex explicitly requests it.
- Before promoting `dev` to `prod`, run the relevant checks, confirm exactly which commit will be promoted, and update `prod` without including unrelated working-tree changes.

# Driving Openleaf from an agent

A running Openleaf listens on a user-only Unix socket (`<userData>/control.sock`, or `OPENLEAF_CONTROL_SOCKET`). Use the `openleaf` CLI rather than clicking the UI; add `--json` for machine-readable output and `--window ID` to target a specific window.

- `openleaf status` / `openleaf projects` / `openleaf state` — what is open, every project (id, name, folder, PDF), and the current screen, file, panels and save status.
- `openleaf add PATH`, `openleaf open PROJECT [--tab|--new-window|--here]` — PROJECT is an id, an `openleaf://project/<id>` link, a name (unique substring), or a path inside the project.
- `openleaf tabs`, `openleaf tab N|NAME`, `openleaf close-tab [N|NAME]` — a window holds at most 10 tabs.
- `openleaf panel files|source|preview|terminal|log|notes open|close`, `openleaf file RELATIVE_PATH`, `openleaf home`, `openleaf fullscreen [on|off]`.
- `openleaf find TEXT` — matches in the current file; `openleaf compile [PROJECT]` — build the current project in the UI, or PROJECT headless (returns the PDF path and log).
- `openleaf screenshot [--out FILE]` — PNG of the current window, for checking UI work; `openleaf reload` reapplies edited CSS/JS in every window (each tab keeps its project).
- `openleaf call METHOD [JSON]` — raw request; methods: status, projects, add, open, tabs, selectTab, closeTab, state, panel, openFile, home, find, compile, fullscreen, screenshot, reload.

Edit project files directly on disk (`openleaf path LINK` gives the folder); Openleaf reloads them. Tests: `node --test tests/cli-control.test.mjs` (launches an isolated instance).
