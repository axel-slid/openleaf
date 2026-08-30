# Openleaf feature reference

## Projects and files

- Create a blank paper or start from an existing `.tex` file.
- Import folders, `.zip`, `.tar`, `.tar.gz`, and `.tgz` archives.
- Open `.pptx` as an editable PowerPoint project.
- Browse the project tree, open multiple text tabs, and preview PDF and
  PowerPoint files.
- Export a compiled PDF or a portable archive of the complete project.

## LaTeX and PDF

- Syntax-aware source editor with line numbers, wrapping, search, minimap, and
  optional Vim shortcuts.
- Code mode for exact source work and Visual mode for structured manuscript
  editing.
- Manual and debounced automatic compilation.
- Compiler selection across `tectonic`, `latexmk`, and `pdflatex`.
- Embedded PDF preview, system PDF opening, zoom, download, and compile log.
- Offline PDF voice reader that pre-analyzes rendered text into a bounded,
  on-disk audio cache, follows playback word-by-word on the page, and supports
  five local voices plus uninterrupted live 0.5–2× speed control, fullscreen
  continuity, and elapsed/total progress. Play stays visible while a
  three-chunk safety buffer is prepared; low-priority look-ahead only runs
  during playback so the reader does not occupy the machine in the background.
  The reader stays a compact integrated bottom pill; voice and speed controls
  live together in their own Voice settings section. Clicking any PDF word
  seeks playback directly to that word.
- Included-file compilation resolves the correct project entry document.

## PowerPoint

- Convert `.ppt` and `.pptx` files into cached PDF previews with LibreOffice.
- Edit native `.pptx` projects without flattening the deck.
- Select, move, and resize existing slide elements.
- Edit text, font, emphasis, alignment, fill, and shape properties.
- Insert text boxes and shapes, reorder or duplicate slides, and present the
  deck full screen.
- Save directly to the source deck after creating an automatic backup.

## Python

- Open `.py` scripts and `.ipynb` notebooks.
- Discover project virtual environments and system Python interpreters.
- Run one cell, every cell above it, or a trace/debug pass.
- Keep a persistent kernel per file and interpreter.
- Stop or automatically restart an unresponsive kernel.

## Agents, terminals, and remote work

- Open multiple local shell terminals.
- Launch dedicated Codex and Claude sessions in the project.
- Send a selected source passage to the configured editing agent.
- Store shared agent instructions in the project root as `AGENTS.md`.
- Create SSH projects, mirror remote files for local editing and preview, and
  keep an SSH terminal beside the document.

## GitHub and review

- Configure a project GitHub remote.
- Push the active workspace or pull LaTeX sources from GitHub.
- Review session history without leaving Openleaf.
- Use compile diagnostics, save state, and file previews as one review surface.

## Personalization

- Light, dark, transparent/glass, and high-contrast theme families.
- Searchable theme gallery, accent controls, PDF preferences, typography, Vim,
  minimap, relative line numbers, and keyboard settings.
- Resizable files, source, preview, terminal, notebook, and log regions.
