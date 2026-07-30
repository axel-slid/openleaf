# Openleaf 0.2.0

Openleaf 0.2.0 expands the paper workspace into a broader research studio with
native PowerPoint editing and a persistent Python workflow.

## Download

The release includes `Openleaf-macOS-arm64.zip`, an Apple Silicon macOS app.
A LaTeX compiler is required to compile papers; LibreOffice is optional and
enables PowerPoint preview.

## PowerPoint projects

- Open `.pptx` directly from New Project.
- Edit slide text, formatting, shapes, position, and size.
- Insert text boxes and shapes.
- Duplicate, reorder, and present slides.
- Save back into the native PowerPoint file.
- Create an automatic backup before each write.
- Follow the active Openleaf theme throughout the editor.

## Python workspace

- Open Python scripts and notebooks inside the document layout.
- Discover virtual-environment and system interpreters.
- Run the current cell or all cells above it.
- Trace/debug a cell and stop the persistent kernel.
- Keep notebook output visible beside the working file.

## Paper and remote-work improvements

- More reliable compilation for projects that use included LaTeX files.
- Cached PowerPoint previews with clear LibreOffice guidance.
- Local and SSH project support with shell, Codex, and Claude terminals.
- GitHub push/pull, history, AGENTS.md, and project export in the same workspace.

## Validation

- JavaScript syntax validation for the main, preload, renderer, presentation
  editor, and packaging code.
- Included-file compilation regression.
- PowerPoint preview regression.
- PowerPoint editor UI and save-path regression.
- Native Apple Silicon package verification before release.
