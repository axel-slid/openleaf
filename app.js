const projectScreen = document.getElementById("projectScreen");
const editorScreen = document.getElementById("editorScreen");
const presentationScreen = document.getElementById("presentationScreen");
const pptxMenubar = document.getElementById("pptxMenubar");
const pptxMenusToggle = document.getElementById("pptxMenusToggle");
const pptxPrintButton = document.getElementById("pptxPrintButton");
const pptxFitButton = document.getElementById("pptxFitButton");
const pptxBackButton = document.getElementById("pptxBackButton");
const pptxProjectTitle = document.getElementById("pptxProjectTitle");
const pptxSaveStatus = document.getElementById("pptxSaveStatus");
const pptxCollaborationStatus = document.getElementById("pptxCollaborationStatus");
const pptxSaveButton = document.getElementById("pptxSaveButton");
const pptxPresentButton = document.getElementById("pptxPresentButton");
const pptxPresentControls = document.getElementById("pptxPresentControls");
const pptxPresentPreviousButton = document.getElementById("pptxPresentPreviousButton");
const pptxPresentNextButton = document.getElementById("pptxPresentNextButton");
const pptxPresentExitButton = document.getElementById("pptxPresentExitButton");
const pptxPresentStatus = document.getElementById("pptxPresentStatus");
const pptxUndoButton = document.getElementById("pptxUndoButton");
const pptxRedoButton = document.getElementById("pptxRedoButton");
const pptxSelectButton = document.getElementById("pptxSelectButton");
const pptxAddTextButton = document.getElementById("pptxAddTextButton");
const pptxAddRectangleButton = document.getElementById("pptxAddRectangleButton");
const pptxAddEllipseButton = document.getElementById("pptxAddEllipseButton");
const pptxAddLineButton = document.getElementById("pptxAddLineButton");
const pptxAddImageButton = document.getElementById("pptxAddImageButton");
const pptxAddChartButton = document.getElementById("pptxAddChartButton");
const pptxAddTableButton = document.getElementById("pptxAddTableButton");
const pptxImageFileInput = document.getElementById("pptxImageFileInput");
const pptxBackgroundButton = document.getElementById("pptxBackgroundButton");
const pptxBackgroundColorInput = document.getElementById("pptxBackgroundColorInput");
const pptxLayoutButton = document.getElementById("pptxLayoutButton");
const pptxThemeButton = document.getElementById("pptxThemeButton");
const pptxTransitionButton = document.getElementById("pptxTransitionButton");
const pptxDeleteElementButton = document.getElementById("pptxDeleteElementButton");
const pptxSendToBackButton = document.getElementById("pptxSendToBackButton");
const pptxSendBackwardButton = document.getElementById("pptxSendBackwardButton");
const pptxBringForwardButton = document.getElementById("pptxBringForwardButton");
const pptxBringToFrontButton = document.getElementById("pptxBringToFrontButton");
const pptxFilePane = document.querySelector(".pptx-file-pane");
const pptxFileTree = document.getElementById("pptxFileTree");
const pptxFileRefreshButton = document.getElementById("pptxFileRefreshButton");
const pptxNewFileButton = document.getElementById("pptxNewFileButton");
const pptxNewFolderButton = document.getElementById("pptxNewFolderButton");
const pptxDownloadPackageButton = document.getElementById("pptxDownloadPackageButton");
const pptxSlideCount = document.getElementById("pptxSlideCount");
const pptxSlideList = document.getElementById("pptxSlideList");
const pptxStageLabel = document.getElementById("pptxStageLabel");
const pptxStatusSlide = document.getElementById("pptxStatusSlide");
const pptxZoomRange = document.getElementById("pptxZoomRange");
const pptxZoomOutButton = document.getElementById("pptxZoomOutButton");
const pptxZoomInButton = document.getElementById("pptxZoomInButton");
const pptxZoomOutput = document.getElementById("pptxZoomOutput");
const pptxStageViewport = document.getElementById("pptxStageViewport");
const pptxSlideCanvas = document.getElementById("pptxSlideCanvas");
const pptxBackgroundCanvas = document.getElementById("pptxBackgroundCanvas");
const pptxElementLayer = document.getElementById("pptxElementLayer");
const pptxVerticalGuide = document.getElementById("pptxVerticalGuide");
const pptxHorizontalGuide = document.getElementById("pptxHorizontalGuide");
const pptxContextToolbar = document.getElementById("pptxContextToolbar");
const pptxTextContextControls = document.getElementById("pptxTextContextControls");
const pptxEditTextButton = document.getElementById("pptxEditTextButton");
const pptxElementType = document.getElementById("pptxElementType");
const pptxInspectorEmpty = document.getElementById("pptxInspectorEmpty");
const pptxInspectorFields = document.getElementById("pptxInspectorFields");
const pptxTextInput = document.getElementById("pptxTextInput");
const pptxXInput = document.getElementById("pptxXInput");
const pptxYInput = document.getElementById("pptxYInput");
const pptxWidthInput = document.getElementById("pptxWidthInput");
const pptxHeightInput = document.getElementById("pptxHeightInput");
const pptxFontSizeInput = document.getElementById("pptxFontSizeInput");
const pptxColorInput = document.getElementById("pptxColorInput");
const pptxOutlineControls = document.getElementById("pptxOutlineControls");
const pptxLineColorInput = document.getElementById("pptxLineColorInput");
const pptxLineWidthInput = document.getElementById("pptxLineWidthInput");
const pptxLineStyleSelect = document.getElementById("pptxLineStyleSelect");
const pptxFontFamilyInput = document.getElementById("pptxFontFamilyInput");
const pptxBoldButton = document.getElementById("pptxBoldButton");
const pptxItalicButton = document.getElementById("pptxItalicButton");
const pptxUnderlineButton = document.getElementById("pptxUnderlineButton");
const pptxAlignSelect = document.getElementById("pptxAlignSelect");
const pptxTerminalSlot = document.getElementById("pptxTerminalSlot");
const pptxTerminalToggle = document.getElementById("pptxTerminalToggle");
const projectGrid = document.getElementById("projectGrid");
const projectEmpty = document.getElementById("projectEmpty");
const projectHeroTitle = document.getElementById("projectHeroTitle");
const projectSearch = document.getElementById("projectSearch");
const projectSortButton = document.getElementById("projectSortButton");
const projectSortMenu = document.getElementById("projectSortMenu");
const projectGridButton = document.getElementById("projectGridButton");
const projectRowsButton = document.getElementById("projectRowsButton");
const addProjectButton = document.getElementById("addProjectButton");
const templatesButton = document.getElementById("templatesButton");
const remoteWorkspaceButton = document.getElementById("remoteWorkspaceButton");
const helpButton = document.getElementById("helpButton");
const newProjectPanel = document.getElementById("newProjectPanel");
const closeNewProjectButton = document.getElementById("closeNewProjectButton");
const projectDropZone = document.getElementById("projectDropZone");
const projectImportButtons = Array.from(document.querySelectorAll("[data-project-kind]"));
const refreshProjectsButton = document.getElementById("refreshProjectsButton");
const backToProjectsButton = document.getElementById("backToProjectsButton");
const sshConnectionBadge = document.getElementById("sshConnectionBadge");
const commandPalette = document.getElementById("commandPalette");
const commandPaletteInput = document.getElementById("commandPaletteInput");
const commandPaletteList = document.getElementById("commandPaletteList");
const closeCommandPaletteButton = document.getElementById("closeCommandPaletteButton");
const fileRail = document.getElementById("fileRail");
const fileRailButton = document.getElementById("fileRailButton");
const filePane = document.getElementById("filePane");
const fileSplitter = document.getElementById("fileSplitter");
const sourceRail = document.getElementById("sourceRail");
const sourceRailButton = document.getElementById("sourceRailButton");
const topRefreshFilesButton = document.getElementById("topRefreshFilesButton");
const railRefreshFilesButton = document.getElementById("railRefreshFilesButton");
const railHelpButton = document.getElementById("railHelpButton");
const fileTree = document.getElementById("fileTree");
const fileOutline = document.getElementById("fileOutline");
const fileOutlineBody = document.getElementById("fileOutlineBody");
const fileOutlineToggle = document.getElementById("fileOutlineToggle");
const fileOutlineResizeHandle = document.getElementById("fileOutlineResizeHandle");
const filePreview = document.getElementById("filePreview");
const fileHeaderRefreshButton = document.getElementById("fileHeaderRefreshButton");
const newFileButton = document.getElementById("newFileButton");
const newFolderButton = document.getElementById("newFolderButton");
const downloadPackageButton = document.getElementById("downloadPackageButton");
const latexSource = document.getElementById("latexSource");
const visualEditor = document.getElementById("visualEditor");
const mediaViewer = document.getElementById("mediaViewer");
const sourceMinimap = document.getElementById("sourceMinimap");
const sourceMinimapLines = sourceMinimap && sourceMinimap.querySelector(".source-minimap-lines");
const sourceMinimapViewport = sourceMinimap && sourceMinimap.querySelector(".source-minimap-viewport");
const ipynbNotebookEditor = document.getElementById("ipynbNotebookEditor");
const ipynbNotebookCells = document.getElementById("ipynbNotebookCells");
const ipynbAddCellButton = document.getElementById("ipynbAddCellButton");
const ipynbAddMarkdownButton = document.getElementById("ipynbAddMarkdownButton");
const ipynbRunAllButton = document.getElementById("ipynbRunAllButton");
const ipynbClearOutputsButton = document.getElementById("ipynbClearOutputsButton");
const ipynbKernelLabel = document.getElementById("ipynbKernelLabel");
const ipynbVimModeIndicator = document.getElementById("ipynbVimModeIndicator");
const pythonRuntimeControls = document.getElementById("pythonRuntimeControls");
const pythonKernelButton = document.getElementById("pythonKernelButton");
const pythonKernelMenu = document.getElementById("pythonKernelMenu");
const textTabs = document.getElementById("textTabs");
const workspace = document.getElementById("workspace");
const sourcePane = document.querySelector(".source-pane");
const splitter = document.getElementById("splitter");
const previewRail = document.getElementById("previewRail");
const previewRailButton = document.getElementById("previewRailButton");
const sourceStats = document.getElementById("sourceStats");
const saveState = document.getElementById("saveState");
const compileState = document.getElementById("compileState");
const pdfTitle = document.getElementById("pdfTitle");
const pdfMeta = document.getElementById("pdfMeta");
const pdfFileMenu = document.getElementById("pdfFileMenu");
const pdfSidebarButton = document.getElementById("pdfSidebarButton");
const pdfSidebar = document.getElementById("pdfSidebar");
const pdfThumbnailList = document.getElementById("pdfThumbnailList");
const pdfViewer = document.getElementById("pdfViewer");
const previewPane = document.querySelector(".preview-pane");
const previewPaneHeader = document.getElementById("previewPaneHeader");
const pdfViewerShell = document.getElementById("pdfViewerShell");
const pdfSpeechControls = document.getElementById("pdfSpeechControls");
const pdfSpeechButton = document.getElementById("pdfSpeechButton");
const pdfSpeechStatus = document.getElementById("pdfSpeechStatus");
const pdfSpeechProgressCurrent = document.getElementById("pdfSpeechProgressCurrent");
const pdfSpeechProgressTotal = document.getElementById("pdfSpeechProgressTotal");
const pdfSpeechProgressDetail = document.getElementById("pdfSpeechProgressDetail");
const pdfSpeechRate = document.getElementById("pdfSpeechRate");
const pdfSpeechRateOutput = document.getElementById("pdfSpeechRateOutput");
const pdfSpeechVoice = document.getElementById("pdfSpeechVoice");
const pdfPronunciationDictionary = document.getElementById("pdfPronunciationDictionary");
const pythonNotebookPanel = document.getElementById("pythonNotebookPanel");
const pythonNotebookMeta = document.getElementById("pythonNotebookMeta");
const pythonNotebookFeed = document.getElementById("pythonNotebookFeed");
const pythonEditorToolbar = document.getElementById("pythonEditorToolbar");
const pythonRunCellButton = document.getElementById("pythonRunCellButton");
const pythonRunAboveButton = document.getElementById("pythonRunAboveButton");
const pythonDebugCellButton = document.getElementById("pythonDebugCellButton");
const pythonStopButton = document.getElementById("pythonStopButton");
const pythonClearButton = document.getElementById("pythonClearButton");
const pythonScratchRunButton = document.getElementById("pythonScratchRunButton");
const pythonScratchInput = document.getElementById("pythonScratchInput");
const compileLogPanel = document.getElementById("compileLogPanel");
const compileLogResizeHandle = document.getElementById("compileLogResizeHandle");
const compileLogCollapsedButton = document.getElementById("compileLogCollapsedButton");
const compileLog = document.getElementById("compileLog");
const saveButton = document.getElementById("saveButton");
const compileButton = document.getElementById("compileButton");
const openPdfButton = document.getElementById("openPdfButton");
const downloadPdfButton = document.getElementById("downloadPdfButton");
const historyButton = document.getElementById("historyButton");
const pushGithubButton = document.getElementById("pushGithubButton");
const pullGithubButton = document.getElementById("pullGithubButton");
const pdfReaderButton = document.getElementById("pdfReaderButton");
const pdfCinematicButton = document.getElementById("pdfCinematicButton");
const pdfCinematicStage = document.getElementById("pdfCinematicStage");
const pdfCinematicArtwork = document.getElementById("pdfCinematicArtwork");
const pdfCinematicCloseButton = document.getElementById("pdfCinematicCloseButton");
const pdfCinematicTitle = document.getElementById("pdfCinematicTitle");
const pdfCinematicNarration = document.getElementById("pdfCinematicNarration");
const pdfCinematicStatus = document.getElementById("pdfCinematicStatus");
const pdfCinematicProgressBar = document.getElementById("pdfCinematicProgressBar");
const pdfCinematicPlaybackButton = document.getElementById("pdfCinematicPlaybackButton");
const pdfCinematicBackdropButtons = Array.from(document.querySelectorAll("[data-cinematic-artwork]"));
const pdfCinematicBackdropIntensity = document.getElementById("pdfCinematicBackdropIntensity");
const pdfCinematicTextSize = document.getElementById("pdfCinematicTextSize");
const pdfCinematicFollowButton = document.getElementById("pdfCinematicFollowButton");
const historyPanel = document.getElementById("historyPanel");
const closeHistoryButton = document.getElementById("closeHistoryButton");
const historyPanelBody = document.getElementById("historyPanelBody");
const pdfPageIndicator = document.getElementById("pdfPageIndicator");
const autoCompileToggle = document.getElementById("autoCompileToggle");
const autoSaveToggle = document.getElementById("autoSaveToggle");
const sourceModeButton = document.getElementById("sourceModeButton");
const visualModeButton = document.getElementById("visualModeButton");
const vimModeIndicator = document.getElementById("vimModeIndicator");
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");
const minimapToggleButton = document.getElementById("minimapToggleButton");
const editorFullscreenButton = document.getElementById("editorFullscreenButton");
const editorTitle = document.getElementById("editorTitle");
const activeDocumentTitle = document.getElementById("activeDocumentTitle");
const editTitleButton = document.getElementById("editTitleButton");
const topSaveStatusButton = document.getElementById("topSaveStatusButton");
const topSaveStatusLabel = document.getElementById("topSaveStatusLabel");
const settingsButtons = Array.from(document.querySelectorAll(".settingsButton"));
const settingsBackdrop = document.getElementById("settingsBackdrop");
const templatesPanel = document.getElementById("templatesPanel");
const closeTemplatesButton = document.getElementById("closeTemplatesButton");
const importTemplateButton = document.getElementById("importTemplateButton");
const onlineTemplateGrid = document.getElementById("onlineTemplateGrid");
const customTemplateGrid = document.getElementById("customTemplateGrid");
const customTemplateEmpty = document.getElementById("customTemplateEmpty");
const sshProjectPanel = document.getElementById("sshProjectPanel");
const closeSshProjectButton = document.getElementById("closeSshProjectButton");
const cancelSshProjectButton = document.getElementById("cancelSshProjectButton");
const connectSshProjectButton = document.getElementById("connectSshProjectButton");
const sshKnownHostSelect = document.getElementById("sshKnownHostSelect");
const sshProjectUserInput = document.getElementById("sshProjectUserInput");
const sshProjectHostInput = document.getElementById("sshProjectHostInput");
const sshProjectPathInput = document.getElementById("sshProjectPathInput");
const sshProjectStatus = document.getElementById("sshProjectStatus");
const sshAuthTerminalShell = document.getElementById("sshAuthTerminalShell");
const sshAuthTerminal = document.getElementById("sshAuthTerminal");
const settingsDrawer = document.getElementById("settingsDrawer");
const closeSettingsButton = document.getElementById("closeSettingsButton");
const settingsTitle = document.getElementById("settingsTitle");
const settingsSearchInput = document.getElementById("settingsSearchInput");
const settingsSearchEmpty = document.getElementById("settingsSearchEmpty");
const settingsNavButtons = Array.from(document.querySelectorAll(".settings-nav-button"));
const settingsPanels = Array.from(document.querySelectorAll("[data-settings-panel]"));
const settingsThemePreset = document.getElementById("settingsThemePreset");
const settingsThemeCategoryBar = document.getElementById("settingsThemeCategoryBar");
const settingsThemeGallery = document.getElementById("settingsThemeGallery");
const settingsThemeToggle = document.getElementById("settingsThemeToggle");
const settingsAccentPicker = document.getElementById("settingsAccentPicker");
const settingsFileSidebarToggle = document.getElementById("settingsFileSidebarToggle");
const settingsPdfRenderModeButtons = Array.from(document.querySelectorAll("[data-pdf-render-mode]"));
const settingsVimModeToggle = document.getElementById("settingsVimModeToggle");
const settingsRelativeLineNumbersToggle = document.getElementById("settingsRelativeLineNumbersToggle");
const settingsMinimapToggle = document.getElementById("settingsMinimapToggle");
const settingsTextWrappingToggle = document.getElementById("settingsTextWrappingToggle");
const settingsSpellCheckToggle = document.getElementById("settingsSpellCheckToggle");
const settingsExtraFeaturesToggle = document.getElementById("settingsExtraFeaturesToggle");
const settingsAgentChoice = document.getElementById("settingsAgentChoice");
const remoteHostInput = document.getElementById("remoteHostInput");
const remotePathInput = document.getElementById("remotePathInput");
const saveRemoteButton = document.getElementById("saveRemoteButton");
const openRemoteTerminalButton = document.getElementById("openRemoteTerminalButton");
const remoteStatus = document.getElementById("remoteStatus");
const defaultGithubRemoteInput = document.getElementById("defaultGithubRemoteInput");
const projectGithubRemoteInput = document.getElementById("projectGithubRemoteInput");
const saveProjectSettingsButton = document.getElementById("saveProjectSettingsButton");
const pullProjectGithubButton = document.getElementById("pullProjectGithubButton");
const projectSettingsStatus = document.getElementById("projectSettingsStatus");
const latexSnippetButtons = Array.from(document.querySelectorAll("[data-latex-snippet]"));
const pdfZoomOutButton = document.getElementById("pdfZoomOutButton");
const pdfZoomInButton = document.getElementById("pdfZoomInButton");
const pdfZoomLabel = document.getElementById("pdfZoomLabel");
const terminalPanel = document.getElementById("terminalPanel");
const terminalTabs = document.getElementById("terminalTabs");
const terminalBody = document.getElementById("terminalBody");
const terminalTabsResizeHandle = document.getElementById("terminalTabsResizeHandle");
const terminalEmpty = document.getElementById("terminalEmpty");
const terminalResizeHandle = document.getElementById("terminalResizeHandle");
const terminalCollapsedButton = document.getElementById("terminalCollapsedButton");
const terminalNewButton = document.getElementById("terminalNewButton");
const terminalRemoteButton = document.getElementById("terminalRemoteButton");
const terminalShellButton = document.getElementById("terminalShellButton");
const terminalCodexButton = document.getElementById("terminalCodexButton");
const terminalClaudeButton = document.getElementById("terminalClaudeButton");
const terminalSplitButton = document.getElementById("terminalSplitButton");
const terminalKillButton = document.getElementById("terminalKillButton");
const terminalMaximizeButton = document.getElementById("terminalMaximizeButton");
const terminalClosePanelButton = document.getElementById("terminalClosePanelButton");
const selectionCodexPopover = document.getElementById("selectionCodexPopover");
const selectionCodexPrompt = document.getElementById("selectionCodexPrompt");
const selectionCodexSendButton = document.getElementById("selectionCodexSendButton");
const agentsPathLabel = document.getElementById("agentsPathLabel");
const agentsEditor = document.getElementById("agentsEditor");
const reloadAgentsButton = document.getElementById("reloadAgentsButton");
const saveAgentsButton = document.getElementById("saveAgentsButton");
const agentsStatus = document.getElementById("agentsStatus");
const profileNameInput = document.getElementById("profileNameInput");
const profileEmailInput = document.getElementById("profileEmailInput");
const profileWorkInput = document.getElementById("profileWorkInput");
const profileBioInput = document.getElementById("profileBioInput");
const profileAiContextInput = document.getElementById("profileAiContextInput");

const DEFAULT_ACCENT = "#f97316";
const DEFAULT_GITHUB_REMOTE = "https://github.com/axel-slid/openleaf-latex-documents.git";
const PROFILE_STORAGE_KEY = "latexStudioAiProfile";
const REMOTE_STORAGE_KEY = "latexStudioRemoteWorkspace";
const DEFAULT_GITHUB_STORAGE_KEY = "latexStudioDefaultGithubRemote";
const CLOSE_ICON_SVG = `
  <svg class="icon icon-x" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12"></path>
  </svg>
`;
const TRASH_ICON_SVG = `
  <svg class="icon icon-trash" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 6h18"></path>
    <path d="M8 6V4h8v2"></path>
    <path d="M6 6l1 14h10l1-14"></path>
    <path d="M10 10v6M14 10v6"></path>
  </svg>
`;
const STAR_ICON_SVG = `
  <svg class="icon icon-star" viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path>
  </svg>
`;
const EXTERNAL_LINK_ICON_SVG = `
  <svg class="icon icon-external" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 3h7v7"></path>
    <path d="M10 14 21 3"></path>
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path>
  </svg>
`;
const MATERIAL_ICON_BASE = "node_modules/material-icon-theme/icons";
const FILE_ICON_NAMES = new Map([
  ["readme.md", "readme.svg"],
  ["license", "license.svg"],
  ["dockerfile", "docker.svg"],
  ["makefile", "makefile.svg"]
]);
const FILE_ICON_EXTENSIONS = new Map([
  [".tex", "tex.svg"],
  [".ltx", "tex.svg"],
  [".cls", "latex-class.clone.svg"],
  [".sty", "latex-package.clone.svg"],
  [".bst", "bibtex-style.svg"],
  [".bib", "bibliography.svg"],
  [".pdf", "pdf.svg"],
  [".ppt", "powerpoint.svg"],
  [".pptx", "powerpoint.svg"],
  [".md", "markdown.svg"],
  [".txt", "document.svg"],
  [".log", "log.svg"],
  [".yaml", "yaml.svg"],
  [".yml", "yaml.svg"],
  [".json", "json.svg"],
  [".jsonl", "json.svg"],
  [".js", "javascript.svg"],
  [".jsx", "react.svg"],
  [".ts", "typescript.svg"],
  [".tsx", "react_ts.svg"],
  [".css", "css.svg"],
  [".scss", "sass.svg"],
  [".html", "html.svg"],
  [".xml", "xml.svg"],
  [".py", "python.svg"],
  [".ipynb", "jupyter.svg"],
  [".r", "r.svg"],
  [".rs", "rust.svg"],
  [".go", "go.svg"],
  [".java", "java.svg"],
  [".c", "c.svg"],
  [".cc", "cpp.svg"],
  [".cpp", "cpp.svg"],
  [".h", "cheader.svg"],
  [".hpp", "cppheader.svg"],
  [".rb", "ruby.svg"],
  [".php", "php.svg"],
  [".lua", "lua.svg"],
  [".toml", "toml.svg"],
  [".ini", "settings.svg"],
  [".cfg", "settings.svg"],
  [".sql", "database.svg"],
  [".sh", "console.svg"],
  [".bash", "console.svg"],
  [".zsh", "console.svg"],
  [".csv", "table.svg"],
  [".tsv", "table.svg"],
  [".zip", "zip.svg"],
  [".tar", "zip.svg"],
  [".tgz", "zip.svg"],
  [".gz", "zip.svg"],
  [".png", "image.svg"],
  [".jpg", "image.svg"],
  [".jpeg", "image.svg"],
  [".gif", "image.svg"],
  [".webp", "image.svg"],
  [".svg", "svg.svg"]
]);
const FOLDER_ICON_NAMES = new Map([
  ["figures", "folder-images.svg"],
  ["images", "folder-images.svg"],
  ["img", "folder-images.svg"],
  ["output", "folder-dist.svg"],
  ["outputs", "folder-dist.svg"],
  ["templates", "folder-template.svg"],
  ["tex", "folder-docs.svg"],
  ["docs", "folder-docs.svg"]
]);
const LATEX_SNIPPETS = {
  figure: "\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.8\\linewidth]{figures/example.png}\n  \\caption{Caption text.}\n  \\label{fig:example}\n\\end{figure}",
  equation: "\\begin{equation}\n  y = mx + b\n\\end{equation}",
  table: "\\begin{table}[h]\n  \\centering\n  \\begin{tabular}{ll}\n    \\hline\n    A & B \\\\\n    \\hline\n  \\end{tabular}\n  \\caption{Caption text.}\n  \\label{tab:example}\n\\end{table}",
  citation: "Recent work~\\cite{key} shows..."
};
const TEMPLATE_HIDDEN_STORAGE_KEY = "latexStudioHiddenBuiltInTemplates";
const LATEX_COMPLETIONS = [
  { text: "\\begin{equation}\n  \n\\end{equation}", displayText: "\\begin{equation}", className: "latex-hint-environment" },
  { text: "\\begin{align}\n  \n\\end{align}", displayText: "\\begin{align}", className: "latex-hint-environment" },
  { text: "\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.8\\linewidth]{}\n  \\caption{}\n  \\label{fig:}\n\\end{figure}", displayText: "\\begin{figure}", className: "latex-hint-environment" },
  { text: "\\begin{table}[h]\n  \\centering\n  \\begin{tabular}{}\n  \\end{tabular}\n  \\caption{}\n  \\label{tab:}\n\\end{table}", displayText: "\\begin{table}", className: "latex-hint-environment" },
  { text: "\\section{}", displayText: "\\section{}", className: "latex-hint-section" },
  { text: "\\subsection{}", displayText: "\\subsection{}", className: "latex-hint-section" },
  { text: "\\paragraph{}", displayText: "\\paragraph{}", className: "latex-hint-section" },
  { text: "\\textbf{}", displayText: "\\textbf{}", className: "latex-hint-inline" },
  { text: "\\emph{}", displayText: "\\emph{}", className: "latex-hint-inline" },
  { text: "\\cite{}", displayText: "\\cite{}", className: "latex-hint-ref" },
  { text: "\\ref{}", displayText: "\\ref{}", className: "latex-hint-ref" },
  { text: "\\label{}", displayText: "\\label{}", className: "latex-hint-ref" },
  { text: "\\includegraphics[width=0.8\\linewidth]{}", displayText: "\\includegraphics", className: "latex-hint-figure" },
  { text: "\\frac{}{}", displayText: "\\frac{}{}", className: "latex-hint-math" },
  { text: "\\sqrt{}", displayText: "\\sqrt{}", className: "latex-hint-math" },
  { text: "\\sum_{}^{}", displayText: "\\sum_{}^{}", className: "latex-hint-math" },
  { text: "\\int_{}^{}", displayText: "\\int_{}^{}", className: "latex-hint-math" },
  { text: "\\mathbf{}", displayText: "\\mathbf{}", className: "latex-hint-math" },
  { text: "\\mathbb{}", displayText: "\\mathbb{}", className: "latex-hint-math" }
];
const PROJECT_GREETINGS = [
  "Hello, {name}!",
  "Hey there, {name}",
  "Happy Wednesday, {name}",
  "Hi {name}, how are you?",
  "How was your day, {name}?",
  "How's it going, {name}?",
  "Welcome to the weekend, {name}",
  "Welcome, {name}",
  "What's new, {name}?",
  "{name} returns!",
  "Back at it, {name}",
  "Sunday session, {name}?",
  "That Friday feeling, {name}",
  "Coffee and code, {name}?",
  "Evening, {name}",
  "Good afternoon, {name}",
  "Good evening, {name}",
  "Good morning, {name}",
  "Welcome back, {name}.",
  "Ready when you are, {name}.",
  "Good to see you, {name}.",
  "Let's work, {name}.",
  "Back at the desk, {name}."
];
const PROJECT_GREETINGS_NO_NAME = [
  "Hello!",
  "Hey there",
  "Happy Wednesday",
  "Hi, how are you?",
  "How was your day?",
  "How's it going?",
  "Let's chat incognito",
  "Sunday session?",
  "That Friday feeling",
  "Welcome to the weekend",
  "Welcome",
  "What's new?",
  "Back at it!",
  "Coffee and code?",
  "Evening",
  "Good afternoon",
  "Good evening",
  "Good morning",
  "Greetings, whoever you are",
  "Welcome back.",
  "Ready when you are.",
  "Good to see you.",
  "Let's work.",
  "Back at the desk."
];
const PROJECT_DAY_GREETINGS = {
  0: {
    named: ["Happy Sunday, {name}", "Sunday session, {name}?", "Welcome to the weekend, {name}"],
    anonymous: ["Happy Sunday", "Sunday session?", "Welcome to the weekend"]
  },
  1: {
    named: ["Happy Monday, {name}"],
    anonymous: ["Happy Monday"]
  },
  2: {
    named: ["Happy Tuesday, {name}"],
    anonymous: ["Happy Tuesday"]
  },
  3: {
    named: ["Happy Wednesday, {name}"],
    anonymous: ["Happy Wednesday"]
  },
  4: {
    named: ["Happy Thursday, {name}"],
    anonymous: ["Happy Thursday"]
  },
  5: {
    named: ["Happy Friday, {name}", "That Friday feeling, {name}"],
    anonymous: ["Happy Friday", "That Friday feeling"]
  },
  6: {
    named: ["Happy Saturday, {name}", "Welcome to the weekend, {name}"],
    anonymous: ["Happy Saturday!", "Welcome to the weekend"]
  }
};
const PROJECT_TIME_GREETINGS = {
  morning: {
    named: ["Good morning, {name}", "Morning, {name}", "Ready when you are, {name}.", "Back at the desk, {name}.", "Good to see you, {name}."],
    anonymous: ["Good morning", "Morning", "Ready when you are.", "Back at the desk.", "Good to see you."]
  },
  afternoon: {
    named: ["Good afternoon, {name}", "Hi {name}, how are you?", "How's it going, {name}?", "Ready when you are, {name}.", "Let's work, {name}."],
    anonymous: ["Good afternoon", "Hi, how are you?", "How's it going?", "Ready when you are.", "Let's work."]
  },
  evening: {
    named: ["Good evening, {name}", "Evening, {name}", "How was your day, {name}?", "Back at it, {name}", "Ready when you are, {name}."],
    anonymous: ["Good evening", "Evening", "How was your day?", "Back at it!", "Ready when you are."]
  }
};
const THEME_VARIABLES = [
  "--bg",
  "--glass",
  "--glass-strong",
  "--panel",
  "--page",
  "--text",
  "--muted",
  "--border",
  "--border-strong",
  "--red",
  "--green",
  "--blue",
  "--blue-dark",
  "--cm-bg",
  "--cm-gutter",
  "--cm-text",
  "--cm-keyword",
  "--cm-variable",
  "--cm-atom",
  "--cm-comment",
  "--cm-string",
  "--cm-number",
  "--pdf-bg",
  "--pdf-paper",
  "--pdf-page-filter",
  "--pdf-dark-bg",
  "--pdf-dark-paper",
  "--pdf-dark-filter",
  "--terminal-bg",
  "--terminal-header-bg",
  "--terminal-text",
  "--terminal-muted",
  "--terminal-selection"
];
const HIGH_CONTRAST_PRESETS = new Set([
  "github-light",
  "light-cyan-hc",
  "light-rose-hc",
  "light-amber-hc",
  "pastel-amber-hc",
  "light-mono-hc",
  "light-blue-hc",
  "light-forest-hc",
  "light-violet-hc",
  "light-slate-hc",
  "cobalt-paper-hc",
  "mint-paper-hc",
  "plum-paper-hc",
  "coral-paper-hc",
  "teal-paper-hc",
  "gold-paper-hc",
  "abyss",
  "tomorrow-night-blue",
  "pastel-graphite-hc",
  "lavender-contrast-hc",
  "mint-contrast-hc",
  "rose-contrast-hc",
  "pastel-cobalt-hc",
  "dusk-contrast-hc",
  "pastel-noir-hc",
  "pastel-ink-hc",
  "pastel-aurora-hc",
  "pastel-plum-hc",
  "aurora-contrast-hc"
]);
const TRANSPARENT_PRESETS = new Set([
  "glass-light",
  "glass-dark",
  "glass-mocha",
  "glass-ocean",
  "glass-violet",
  "glass-forest",
  "glass-amber"
]);
const THEME_PRESETS = {
  custom: null,
  "light-plus": {
    theme: "light",
    accent: "#007acc",
    background: "linear-gradient(135deg, rgba(0, 122, 204, 0.1), rgba(225, 231, 239, 0.92)), #eef2f7",
    colors: {
      "--bg": "#eef2f7",
      "--glass": "rgba(255, 255, 255, 0.72)",
      "--glass-strong": "rgba(255, 255, 255, 0.88)",
      "--panel": "rgba(250, 252, 255, 0.9)",
      "--page": "#ffffff",
      "--text": "#1f2328",
      "--muted": "#667085",
      "--border": "rgba(92, 105, 122, 0.24)",
      "--border-strong": "rgba(72, 82, 96, 0.34)",
      "--red": "#d1242f",
      "--green": "#1a7f37",
      "--blue": "#007acc",
      "--blue-dark": "#005a9e",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#f3f4f6",
      "--cm-text": "#1f2937",
      "--cm-keyword": "#0000ff",
      "--cm-variable": "#0070c1",
      "--cm-atom": "#795e26",
      "--cm-comment": "#008000",
      "--cm-string": "#a31515",
      "--cm-number": "#098658",
      "--pdf-bg": "#cfd6df",
      "--pdf-paper": "#ffffff"
    }
  },
  "dark-plus": {
    theme: "dark",
    accent: "#3794ff",
    background: "linear-gradient(135deg, #1e1e1e, #181818 62%, #111111)",
    colors: {
      "--bg": "#1e1e1e",
      "--glass": "rgba(37, 37, 38, 0.78)",
      "--glass-strong": "rgba(45, 45, 48, 0.9)",
      "--panel": "rgba(30, 30, 30, 0.92)",
      "--page": "#f8f8f5",
      "--text": "#cccccc",
      "--muted": "#969696",
      "--border": "rgba(204, 204, 204, 0.14)",
      "--border-strong": "rgba(204, 204, 204, 0.26)",
      "--red": "#f44747",
      "--green": "#6a9955",
      "--blue": "#3794ff",
      "--blue-dark": "#1f6feb",
      "--cm-bg": "#1e1e1e",
      "--cm-gutter": "#252526",
      "--cm-text": "#d4d4d4",
      "--cm-keyword": "#c586c0",
      "--cm-variable": "#9cdcfe",
      "--cm-atom": "#4ec9b0",
      "--cm-comment": "#6a9955",
      "--cm-string": "#ce9178",
      "--cm-number": "#b5cea8",
      "--pdf-bg": "#111827",
      "--pdf-paper": "#d9dee6",
      "--pdf-page-filter": "invert(0.88) hue-rotate(180deg) contrast(0.88) brightness(1.12)"
    }
  },
  monokai: {
    theme: "dark",
    accent: "#f92672",
    background: "linear-gradient(135deg, #272822, #20211c 62%, #191a16)",
    colors: {
      "--bg": "#272822",
      "--glass": "rgba(39, 40, 34, 0.8)",
      "--glass-strong": "rgba(55, 56, 47, 0.92)",
      "--panel": "rgba(39, 40, 34, 0.94)",
      "--page": "#f8f8f2",
      "--text": "#f8f8f2",
      "--muted": "#c2c2b0",
      "--border": "rgba(248, 248, 242, 0.16)",
      "--border-strong": "rgba(248, 248, 242, 0.3)",
      "--red": "#f92672",
      "--green": "#a6e22e",
      "--blue": "#66d9ef",
      "--blue-dark": "#3db8c9",
      "--cm-bg": "#272822",
      "--cm-gutter": "#1f201b",
      "--cm-text": "#f8f8f2",
      "--cm-keyword": "#f92672",
      "--cm-variable": "#66d9ef",
      "--cm-atom": "#a6e22e",
      "--cm-comment": "#75715e",
      "--cm-string": "#e6db74",
      "--cm-number": "#ae81ff",
      "--pdf-bg": "#1d1e19",
      "--pdf-paper": "#f1eee0",
      "--pdf-page-filter": "invert(0.88) hue-rotate(180deg) contrast(0.9) brightness(1.08) saturate(0.86)"
    }
  },
  "solarized-dark": {
    theme: "dark",
    accent: "#268bd2",
    background: "linear-gradient(135deg, #002b36, #073642 68%, #001f27)",
    colors: {
      "--bg": "#002b36",
      "--glass": "rgba(0, 43, 54, 0.78)",
      "--glass-strong": "rgba(7, 54, 66, 0.92)",
      "--panel": "rgba(7, 54, 66, 0.9)",
      "--page": "#fdf6e3",
      "--text": "#eee8d5",
      "--muted": "#93a1a1",
      "--border": "rgba(147, 161, 161, 0.18)",
      "--border-strong": "rgba(147, 161, 161, 0.3)",
      "--red": "#dc322f",
      "--green": "#859900",
      "--blue": "#268bd2",
      "--blue-dark": "#1d6fa5",
      "--cm-bg": "#073642",
      "--cm-gutter": "#002b36",
      "--cm-text": "#93a1a1",
      "--cm-keyword": "#859900",
      "--cm-variable": "#268bd2",
      "--cm-atom": "#2aa198",
      "--cm-comment": "#586e75",
      "--cm-string": "#b58900",
      "--cm-number": "#d33682",
      "--pdf-bg": "#002b36",
      "--pdf-paper": "#eee8d5",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.08) sepia(0.12)"
    }
  },
  "quiet-light": {
    theme: "light",
    accent: "#5876a3",
    background: "linear-gradient(135deg, rgba(88, 118, 163, 0.1), rgba(240, 243, 247, 0.9)), #f6f8fa",
    colors: {
      "--bg": "#f6f8fa",
      "--glass": "rgba(255, 255, 255, 0.7)",
      "--glass-strong": "rgba(255, 255, 255, 0.88)",
      "--panel": "rgba(255, 255, 255, 0.88)",
      "--page": "#ffffff",
      "--text": "#1f2937",
      "--muted": "#6b7280",
      "--border": "rgba(107, 114, 128, 0.22)",
      "--border-strong": "rgba(75, 85, 99, 0.32)",
      "--red": "#b91c1c",
      "--green": "#047857",
      "--blue": "#5876a3",
      "--blue-dark": "#405b80",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#f3f4f6",
      "--cm-text": "#1f2937",
      "--cm-keyword": "#5b5f97",
      "--cm-variable": "#5876a3",
      "--cm-atom": "#047857",
      "--cm-comment": "#6b7280",
      "--cm-string": "#8b5a2b",
      "--cm-number": "#7c3aed",
      "--pdf-bg": "#d6dce4",
      "--pdf-paper": "#ffffff"
    }
  },
  "solarized-light": {
    theme: "light",
    accent: "#268bd2",
    background: "linear-gradient(135deg, #fdf6e3, #eee8d5 64%, #e8dcc2)",
    colors: {
      "--bg": "#fdf6e3",
      "--glass": "rgba(253, 246, 227, 0.74)",
      "--glass-strong": "rgba(253, 246, 227, 0.9)",
      "--panel": "rgba(253, 246, 227, 0.92)",
      "--page": "#ffffff",
      "--text": "#073642",
      "--muted": "#657b83",
      "--border": "rgba(101, 123, 131, 0.24)",
      "--border-strong": "rgba(88, 110, 117, 0.34)",
      "--red": "#dc322f",
      "--green": "#859900",
      "--blue": "#268bd2",
      "--blue-dark": "#1d6fa5",
      "--cm-bg": "#fdf6e3",
      "--cm-gutter": "#eee8d5",
      "--cm-text": "#586e75",
      "--cm-keyword": "#859900",
      "--cm-variable": "#268bd2",
      "--cm-atom": "#2aa198",
      "--cm-comment": "#93a1a1",
      "--cm-string": "#b58900",
      "--cm-number": "#d33682"
    }
  },
  "catppuccin-latte": {
    theme: "light",
    accent: "#1e66f5",
    background: "linear-gradient(135deg, #eff1f5, #e6e9ef 70%, #dce0e8)",
    colors: {
      "--bg": "#eff1f5",
      "--glass": "rgba(239, 241, 245, 0.76)",
      "--glass-strong": "rgba(230, 233, 239, 0.92)",
      "--panel": "rgba(239, 241, 245, 0.94)",
      "--page": "#ffffff",
      "--text": "#4c4f69",
      "--muted": "#6c6f85",
      "--border": "rgba(108, 111, 133, 0.22)",
      "--border-strong": "rgba(76, 79, 105, 0.36)",
      "--red": "#d20f39",
      "--green": "#40a02b",
      "--blue": "#1e66f5",
      "--blue-dark": "#1a56cf",
      "--cm-bg": "#eff1f5",
      "--cm-gutter": "#e6e9ef",
      "--cm-text": "#4c4f69",
      "--cm-keyword": "#8839ef",
      "--cm-variable": "#1e66f5",
      "--cm-atom": "#179299",
      "--cm-comment": "#8c8fa1",
      "--cm-string": "#40a02b",
      "--cm-number": "#fe640b",
      "--pdf-bg": "#ccd0da",
      "--pdf-paper": "#ffffff"
    }
  },
  "min-light": {
    theme: "light",
    accent: "#007acc",
    background: "linear-gradient(135deg, #ffffff, #f8fafc 72%, #edf2f7)",
    colors: {
      "--bg": "#f8fafc",
      "--glass": "rgba(255, 255, 255, 0.78)",
      "--glass-strong": "rgba(255, 255, 255, 0.94)",
      "--panel": "rgba(255, 255, 255, 0.94)",
      "--page": "#ffffff",
      "--text": "#1a202c",
      "--muted": "#718096",
      "--border": "rgba(113, 128, 150, 0.2)",
      "--border-strong": "rgba(74, 85, 104, 0.32)",
      "--red": "#e53e3e",
      "--green": "#38a169",
      "--blue": "#007acc",
      "--blue-dark": "#005a9e",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#f7fafc",
      "--cm-text": "#1a202c",
      "--cm-keyword": "#805ad5",
      "--cm-variable": "#3182ce",
      "--cm-atom": "#319795",
      "--cm-comment": "#a0aec0",
      "--cm-string": "#2f855a",
      "--cm-number": "#dd6b20",
      "--pdf-bg": "#d8dee8",
      "--pdf-paper": "#ffffff"
    }
  },
  "honey-light": {
    theme: "light",
    accent: "#d97706",
    background: "linear-gradient(135deg, #fff7df, #f8ead0 72%, #f0d7aa)",
    colors: {
      "--bg": "#fff6df",
      "--glass": "rgba(255, 250, 232, 0.8)",
      "--glass-strong": "rgba(255, 247, 223, 0.94)",
      "--panel": "rgba(255, 250, 232, 0.94)",
      "--page": "#fffdf7",
      "--text": "#2f2415",
      "--muted": "#7f6a4e",
      "--border": "rgba(141, 94, 28, 0.24)",
      "--border-strong": "rgba(141, 94, 28, 0.4)",
      "--red": "#b42318",
      "--green": "#3f7d20",
      "--blue": "#b45309",
      "--blue-dark": "#92400e",
      "--cm-bg": "#fffdf7",
      "--cm-gutter": "#fbefd4",
      "--cm-text": "#2f2415",
      "--cm-keyword": "#b45309",
      "--cm-variable": "#7c4a03",
      "--cm-atom": "#047857",
      "--cm-comment": "#9a7b55",
      "--cm-string": "#5f7f1f",
      "--cm-number": "#c2410c",
      "--pdf-bg": "#ead4a8",
      "--pdf-paper": "#fffdf7"
    }
  },
  "marigold-paper": {
    theme: "light",
    accent: "#f59e0b",
    background: "linear-gradient(135deg, #fff4c7, #ffe7a3 68%, #fac46a)",
    colors: {
      "--bg": "#fff4c7",
      "--glass": "rgba(255, 244, 199, 0.78)",
      "--glass-strong": "rgba(255, 234, 168, 0.94)",
      "--panel": "rgba(255, 247, 214, 0.94)",
      "--page": "#fffefa",
      "--text": "#24170a",
      "--muted": "#7c5a27",
      "--border": "rgba(180, 83, 9, 0.28)",
      "--border-strong": "rgba(146, 64, 14, 0.46)",
      "--red": "#dc2626",
      "--green": "#15803d",
      "--blue": "#ca8a04",
      "--blue-dark": "#a16207",
      "--cm-bg": "#fffefa",
      "--cm-gutter": "#fff0c2",
      "--cm-text": "#24170a",
      "--cm-keyword": "#c2410c",
      "--cm-variable": "#a16207",
      "--cm-atom": "#0f766e",
      "--cm-comment": "#a17c45",
      "--cm-string": "#4d7c0f",
      "--cm-number": "#b45309",
      "--pdf-bg": "#f2cf7d",
      "--pdf-paper": "#fffefa"
    }
  },
  "butterscotch-light": {
    theme: "light",
    accent: "#c86f13",
    background: "linear-gradient(135deg, #fff9ed, #f6dfbd 70%, #e5b56e)",
    colors: {
      "--bg": "#fff9ed",
      "--glass": "rgba(255, 249, 237, 0.78)",
      "--glass-strong": "rgba(255, 244, 224, 0.94)",
      "--panel": "rgba(255, 247, 232, 0.94)",
      "--page": "#fffefb",
      "--text": "#2b1c0f",
      "--muted": "#765738",
      "--border": "rgba(158, 91, 21, 0.26)",
      "--border-strong": "rgba(124, 66, 14, 0.44)",
      "--red": "#b91c1c",
      "--green": "#2f7d32",
      "--blue": "#b36a12",
      "--blue-dark": "#8c4d08",
      "--cm-bg": "#fffefb",
      "--cm-gutter": "#f7e9d3",
      "--cm-text": "#2b1c0f",
      "--cm-keyword": "#b45309",
      "--cm-variable": "#8a4b09",
      "--cm-atom": "#0f766e",
      "--cm-comment": "#8b7357",
      "--cm-string": "#4d7c0f",
      "--cm-number": "#be5c12",
      "--pdf-bg": "#e8c994",
      "--pdf-paper": "#fffefb"
    }
  },
  "saffron-paper": {
    theme: "light",
    accent: "#eab308",
    background: "linear-gradient(135deg, #fffbea, #fbefb9 66%, #f2c94c)",
    colors: {
      "--bg": "#fffbea",
      "--glass": "rgba(255, 251, 234, 0.8)",
      "--glass-strong": "rgba(254, 243, 199, 0.94)",
      "--panel": "rgba(255, 248, 219, 0.94)",
      "--page": "#ffffff",
      "--text": "#211707",
      "--muted": "#71551a",
      "--border": "rgba(161, 98, 7, 0.26)",
      "--border-strong": "rgba(113, 63, 18, 0.42)",
      "--red": "#dc2626",
      "--green": "#15803d",
      "--blue": "#ca8a04",
      "--blue-dark": "#a16207",
      "--cm-bg": "#fffef8",
      "--cm-gutter": "#fbefb9",
      "--cm-text": "#211707",
      "--cm-keyword": "#b45309",
      "--cm-variable": "#92400e",
      "--cm-atom": "#0f766e",
      "--cm-comment": "#8a7444",
      "--cm-string": "#4d7c0f",
      "--cm-number": "#b45309",
      "--pdf-bg": "#edd27c",
      "--pdf-paper": "#ffffff"
    }
  },
  "github-light": {
    theme: "light",
    accent: "#0969da",
    background: "linear-gradient(135deg, #ffffff, #f5f7fa 72%, #e6ebf0)",
    colors: {
      "--bg": "#ffffff",
      "--glass": "rgba(255, 255, 255, 0.94)",
      "--glass-strong": "rgba(255, 255, 255, 0.98)",
      "--panel": "rgba(255, 255, 255, 0.98)",
      "--page": "#ffffff",
      "--text": "#000000",
      "--muted": "#24292f",
      "--border": "rgba(0, 0, 0, 0.48)",
      "--border-strong": "rgba(0, 0, 0, 0.76)",
      "--red": "#cf222e",
      "--green": "#116329",
      "--blue": "#0969da",
      "--blue-dark": "#0550ae",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#f6f8fa",
      "--cm-text": "#24292f",
      "--cm-keyword": "#cf222e",
      "--cm-variable": "#0550ae",
      "--cm-atom": "#8250df",
      "--cm-comment": "#6e7781",
      "--cm-string": "#0a3069",
      "--cm-number": "#953800",
      "--pdf-bg": "#b7bec8",
      "--pdf-paper": "#ffffff"
    }
  },
  "light-cyan-hc": {
    theme: "light",
    accent: "#007a8a",
    background: "linear-gradient(135deg, #f8feff, #e7fbff 68%, #d7f3f8)",
    colors: {
      "--bg": "#f8feff",
      "--glass": "rgba(255, 255, 255, 0.96)",
      "--glass-strong": "rgba(255, 255, 255, 0.99)",
      "--panel": "rgba(255, 255, 255, 0.98)",
      "--page": "#ffffff",
      "--text": "#031f26",
      "--muted": "#214a55",
      "--border": "rgba(3, 31, 38, 0.5)",
      "--border-strong": "rgba(3, 31, 38, 0.82)",
      "--red": "#b42318",
      "--green": "#067647",
      "--blue": "#007a8a",
      "--blue-dark": "#005e68",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#e7fbff",
      "--cm-text": "#031f26",
      "--cm-keyword": "#8a145f",
      "--cm-variable": "#005e68",
      "--cm-atom": "#067647",
      "--cm-comment": "#475467",
      "--cm-string": "#8f4a00",
      "--cm-number": "#6f2dbd",
      "--pdf-bg": "#b8dfe8",
      "--pdf-paper": "#ffffff"
    }
  },
  "light-rose-hc": {
    theme: "light",
    accent: "#be123c",
    background: "linear-gradient(135deg, #fff8fb, #ffe8ef 68%, #fbd0dc)",
    colors: {
      "--bg": "#fff8fb",
      "--glass": "rgba(255, 255, 255, 0.96)",
      "--glass-strong": "rgba(255, 255, 255, 0.99)",
      "--panel": "rgba(255, 255, 255, 0.98)",
      "--page": "#ffffff",
      "--text": "#2b0614",
      "--muted": "#5f2639",
      "--border": "rgba(43, 6, 20, 0.52)",
      "--border-strong": "rgba(43, 6, 20, 0.84)",
      "--red": "#be123c",
      "--green": "#047857",
      "--blue": "#2563eb",
      "--blue-dark": "#1d4ed8",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#ffe8ef",
      "--cm-text": "#2b0614",
      "--cm-keyword": "#be123c",
      "--cm-variable": "#1d4ed8",
      "--cm-atom": "#047857",
      "--cm-comment": "#667085",
      "--cm-string": "#92400e",
      "--cm-number": "#7c3aed",
      "--pdf-bg": "#e9beca",
      "--pdf-paper": "#ffffff"
    }
  },
  "light-amber-hc": {
    theme: "light",
    accent: "#b45309",
    background: "linear-gradient(135deg, #fffdf6, #fff1c6 68%, #f4d97e)",
    colors: {
      "--bg": "#fffdf6",
      "--glass": "rgba(255, 255, 255, 0.96)",
      "--glass-strong": "rgba(255, 255, 255, 0.99)",
      "--panel": "rgba(255, 255, 255, 0.98)",
      "--page": "#ffffff",
      "--text": "#251605",
      "--muted": "#5f3d11",
      "--border": "rgba(37, 22, 5, 0.52)",
      "--border-strong": "rgba(37, 22, 5, 0.86)",
      "--red": "#b42318",
      "--green": "#166534",
      "--blue": "#075985",
      "--blue-dark": "#0c4a6e",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#fff1c6",
      "--cm-text": "#251605",
      "--cm-keyword": "#9333ea",
      "--cm-variable": "#075985",
      "--cm-atom": "#166534",
      "--cm-comment": "#6b5f47",
      "--cm-string": "#92400e",
      "--cm-number": "#c2410c",
      "--pdf-bg": "#e7cf84",
      "--pdf-paper": "#ffffff"
    }
  },
  "pastel-amber-hc": {
    theme: "light",
    accent: "#d97706",
    background: "linear-gradient(135deg, #fffaf0, #fdecc8 68%, #f7d28c)",
    colors: {
      "--bg": "#fffaf0",
      "--glass": "rgba(255, 255, 255, 0.96)",
      "--glass-strong": "rgba(255, 251, 235, 0.99)",
      "--panel": "rgba(255, 250, 240, 0.98)",
      "--page": "#ffffff",
      "--text": "#1f1304",
      "--muted": "#4f3411",
      "--border": "rgba(31, 19, 4, 0.54)",
      "--border-strong": "rgba(31, 19, 4, 0.86)",
      "--red": "#b42318",
      "--green": "#166534",
      "--blue": "#8a4b09",
      "--blue-dark": "#713f12",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#fdecc8",
      "--cm-text": "#1f1304",
      "--cm-keyword": "#9a3412",
      "--cm-variable": "#713f12",
      "--cm-atom": "#166534",
      "--cm-comment": "#5f5140",
      "--cm-string": "#4d7c0f",
      "--cm-number": "#b45309",
      "--pdf-bg": "#e6c579",
      "--pdf-paper": "#ffffff"
    }
  },
  "light-mono-hc": {
    theme: "light",
    accent: "#0f62fe",
    background: "linear-gradient(135deg, #ffffff, #f4f4f4 68%, #e8e8e8)",
    colors: {
      "--bg": "#ffffff",
      "--glass": "rgba(255, 255, 255, 0.97)",
      "--glass-strong": "rgba(255, 255, 255, 0.99)",
      "--panel": "rgba(255, 255, 255, 0.98)",
      "--page": "#ffffff",
      "--text": "#000000",
      "--muted": "#3d3d3d",
      "--border": "rgba(0, 0, 0, 0.56)",
      "--border-strong": "rgba(0, 0, 0, 0.88)",
      "--red": "#da1e28",
      "--green": "#0e6027",
      "--blue": "#0f62fe",
      "--blue-dark": "#0043ce",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#f4f4f4",
      "--cm-text": "#000000",
      "--cm-keyword": "#8a0091",
      "--cm-variable": "#0043ce",
      "--cm-atom": "#0e6027",
      "--cm-comment": "#525252",
      "--cm-string": "#a2191f",
      "--cm-number": "#6929c4",
      "--pdf-bg": "#d0d0d0",
      "--pdf-paper": "#ffffff"
    }
  },
  "light-blue-hc": {
    theme: "light",
    accent: "#1d4ed8",
    background: "linear-gradient(135deg, #f8fbff, #e8f1ff 68%, #d4e4fb)",
    colors: {
      "--bg": "#f8fbff",
      "--glass": "rgba(255, 255, 255, 0.96)",
      "--glass-strong": "rgba(255, 255, 255, 0.99)",
      "--panel": "rgba(255, 255, 255, 0.98)",
      "--page": "#ffffff",
      "--text": "#04142e",
      "--muted": "#26437a",
      "--border": "rgba(4, 20, 46, 0.52)",
      "--border-strong": "rgba(4, 20, 46, 0.84)",
      "--red": "#b42318",
      "--green": "#067647",
      "--blue": "#1d4ed8",
      "--blue-dark": "#1e40af",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#e8f1ff",
      "--cm-text": "#04142e",
      "--cm-keyword": "#1d4ed8",
      "--cm-variable": "#0e7490",
      "--cm-atom": "#067647",
      "--cm-comment": "#475467",
      "--cm-string": "#9a3412",
      "--cm-number": "#6d28d9",
      "--pdf-bg": "#bcd2ef",
      "--pdf-paper": "#ffffff"
    }
  },
  "light-forest-hc": {
    theme: "light",
    accent: "#15803d",
    background: "linear-gradient(135deg, #f7fdf9, #e6f9ed 68%, #cdefdb)",
    colors: {
      "--bg": "#f7fdf9",
      "--glass": "rgba(255, 255, 255, 0.96)",
      "--glass-strong": "rgba(255, 255, 255, 0.99)",
      "--panel": "rgba(255, 255, 255, 0.98)",
      "--page": "#ffffff",
      "--text": "#04210f",
      "--muted": "#1f4d33",
      "--border": "rgba(4, 33, 15, 0.52)",
      "--border-strong": "rgba(4, 33, 15, 0.84)",
      "--red": "#b42318",
      "--green": "#15803d",
      "--blue": "#0e7490",
      "--blue-dark": "#155e75",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#e6f9ed",
      "--cm-text": "#04210f",
      "--cm-keyword": "#15803d",
      "--cm-variable": "#155e75",
      "--cm-atom": "#92400e",
      "--cm-comment": "#4d5f55",
      "--cm-string": "#a2191f",
      "--cm-number": "#6929c4",
      "--pdf-bg": "#b7dcc6",
      "--pdf-paper": "#ffffff"
    }
  },
  "light-violet-hc": {
    theme: "light",
    accent: "#6d28d9",
    background: "linear-gradient(135deg, #fbf9ff, #f0e9ff 68%, #e0d1fb)",
    colors: {
      "--bg": "#fbf9ff",
      "--glass": "rgba(255, 255, 255, 0.96)",
      "--glass-strong": "rgba(255, 255, 255, 0.99)",
      "--panel": "rgba(255, 255, 255, 0.98)",
      "--page": "#ffffff",
      "--text": "#180432",
      "--muted": "#432466",
      "--border": "rgba(24, 4, 50, 0.52)",
      "--border-strong": "rgba(24, 4, 50, 0.84)",
      "--red": "#b42318",
      "--green": "#067647",
      "--blue": "#6d28d9",
      "--blue-dark": "#5b21b6",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#f0e9ff",
      "--cm-text": "#180432",
      "--cm-keyword": "#6d28d9",
      "--cm-variable": "#1d4ed8",
      "--cm-atom": "#067647",
      "--cm-comment": "#5b5568",
      "--cm-string": "#a2191f",
      "--cm-number": "#0e7490",
      "--pdf-bg": "#d4c3ee",
      "--pdf-paper": "#ffffff"
    }
  },
  "light-slate-hc": {
    theme: "light",
    accent: "#334155",
    background: "linear-gradient(135deg, #fafbfc, #eef1f5 68%, #dde3ea)",
    colors: {
      "--bg": "#fafbfc",
      "--glass": "rgba(255, 255, 255, 0.97)",
      "--glass-strong": "rgba(255, 255, 255, 0.99)",
      "--panel": "rgba(255, 255, 255, 0.98)",
      "--page": "#ffffff",
      "--text": "#0b1220",
      "--muted": "#33415c",
      "--border": "rgba(11, 18, 32, 0.54)",
      "--border-strong": "rgba(11, 18, 32, 0.86)",
      "--red": "#b42318",
      "--green": "#067647",
      "--blue": "#334155",
      "--blue-dark": "#1e293b",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#eef1f5",
      "--cm-text": "#0b1220",
      "--cm-keyword": "#1e293b",
      "--cm-variable": "#0e7490",
      "--cm-atom": "#067647",
      "--cm-comment": "#64748b",
      "--cm-string": "#9a3412",
      "--cm-number": "#6d28d9",
      "--pdf-bg": "#c9d2dd",
      "--pdf-paper": "#ffffff"
    }
  },
  "glass-light": {
    theme: "light",
    accent: "#2563eb",
    background: "transparent",
    transparent: true,
    colors: {
      "--bg": "rgba(244, 248, 255, 0.16)",
      "--glass": "rgba(255, 255, 255, 0.14)",
      "--glass-strong": "rgba(255, 255, 255, 0.28)",
      "--panel": "rgba(255, 255, 255, 0.18)",
      "--page": "#ffffff",
      "--text": "#111827",
      "--muted": "#4b5563",
      "--border": "rgba(60, 72, 94, 0.3)",
      "--border-strong": "rgba(38, 50, 72, 0.48)",
      "--red": "#dc2626",
      "--green": "#15803d",
      "--blue": "#2563eb",
      "--blue-dark": "#1d4ed8",
      "--cm-bg": "rgba(255, 255, 255, 0.26)",
      "--cm-gutter": "rgba(236, 242, 250, 0.16)",
      "--cm-text": "#111827",
      "--cm-keyword": "#9333ea",
      "--cm-variable": "#1d4ed8",
      "--cm-atom": "#0f766e",
      "--cm-comment": "#64748b",
      "--cm-string": "#166534",
      "--cm-number": "#c2410c",
      "--pdf-bg": "#c9d3e0",
      "--pdf-paper": "#ffffff"
    }
  },
  "glass-dark": {
    theme: "dark",
    accent: "#93c5fd",
    background: "transparent",
    transparent: true,
    colors: {
      "--bg": "rgba(9, 13, 22, 0.14)",
      "--glass": "rgba(15, 23, 42, 0.16)",
      "--glass-strong": "rgba(15, 23, 42, 0.3)",
      "--panel": "rgba(15, 23, 42, 0.2)",
      "--page": "#ffffff",
      "--text": "#f8fafc",
      "--muted": "#cbd5e1",
      "--border": "rgba(203, 213, 225, 0.24)",
      "--border-strong": "rgba(226, 232, 240, 0.42)",
      "--red": "#fca5a5",
      "--green": "#86efac",
      "--blue": "#93c5fd",
      "--blue-dark": "#60a5fa",
      "--cm-bg": "rgba(9, 13, 22, 0.28)",
      "--cm-gutter": "rgba(15, 23, 42, 0.18)",
      "--cm-text": "#f8fafc",
      "--cm-keyword": "#d8b4fe",
      "--cm-variable": "#93c5fd",
      "--cm-atom": "#99f6e4",
      "--cm-comment": "#94a3b8",
      "--cm-string": "#bbf7d0",
      "--cm-number": "#fdba74",
      "--pdf-bg": "#111827",
      "--pdf-paper": "#ffffff",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.1)"
    }
  },
  "glass-mocha": {
    theme: "dark",
    accent: "#f5c2e7",
    background: "transparent",
    transparent: true,
    colors: {
      "--bg": "rgba(17, 17, 27, 0.15)",
      "--glass": "rgba(30, 30, 46, 0.16)",
      "--glass-strong": "rgba(30, 30, 46, 0.3)",
      "--panel": "rgba(30, 30, 46, 0.2)",
      "--page": "#ffffff",
      "--text": "#f5e0dc",
      "--muted": "#cdd6f4",
      "--border": "rgba(245, 194, 231, 0.26)",
      "--border-strong": "rgba(245, 224, 220, 0.48)",
      "--red": "#f38ba8",
      "--green": "#a6e3a1",
      "--blue": "#89b4fa",
      "--blue-dark": "#74a7fa",
      "--cm-bg": "rgba(17, 17, 27, 0.3)",
      "--cm-gutter": "rgba(30, 30, 46, 0.18)",
      "--cm-text": "#f5e0dc",
      "--cm-keyword": "#f5c2e7",
      "--cm-variable": "#89b4fa",
      "--cm-atom": "#94e2d5",
      "--cm-comment": "#a6adc8",
      "--cm-string": "#a6e3a1",
      "--cm-number": "#fab387",
      "--pdf-bg": "#11111b",
      "--pdf-paper": "#ffffff",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.1)"
    }
  },
  "github-dark": {
    theme: "dark",
    accent: "#58a6ff",
    background: "linear-gradient(135deg, #0d1117, #161b22 70%, #010409)",
    colors: {
      "--bg": "#0d1117",
      "--glass": "rgba(13, 17, 23, 0.78)",
      "--glass-strong": "rgba(22, 27, 34, 0.92)",
      "--panel": "rgba(22, 27, 34, 0.92)",
      "--page": "#f6f8fa",
      "--text": "#c9d1d9",
      "--muted": "#8b949e",
      "--border": "rgba(139, 148, 158, 0.2)",
      "--border-strong": "rgba(139, 148, 158, 0.32)",
      "--red": "#ff7b72",
      "--green": "#7ee787",
      "--blue": "#58a6ff",
      "--blue-dark": "#1f6feb",
      "--cm-bg": "#0d1117",
      "--cm-gutter": "#161b22",
      "--cm-text": "#c9d1d9",
      "--cm-keyword": "#ff7b72",
      "--cm-variable": "#79c0ff",
      "--cm-atom": "#d2a8ff",
      "--cm-comment": "#8b949e",
      "--cm-string": "#a5d6ff",
      "--cm-number": "#ffa657"
    }
  },
  dracula: {
    theme: "dark",
    accent: "#ff79c6",
    background: "linear-gradient(135deg, #282a36, #21222c 68%, #191a21)",
    colors: {
      "--bg": "#282a36",
      "--glass": "rgba(40, 42, 54, 0.78)",
      "--glass-strong": "rgba(68, 71, 90, 0.9)",
      "--panel": "rgba(40, 42, 54, 0.92)",
      "--page": "#f8f8f2",
      "--text": "#f8f8f2",
      "--muted": "#bd93f9",
      "--border": "rgba(248, 248, 242, 0.16)",
      "--border-strong": "rgba(248, 248, 242, 0.28)",
      "--red": "#ff5555",
      "--green": "#50fa7b",
      "--blue": "#8be9fd",
      "--blue-dark": "#62d6ee",
      "--cm-bg": "#282a36",
      "--cm-gutter": "#21222c",
      "--cm-text": "#f8f8f2",
      "--cm-keyword": "#ff79c6",
      "--cm-variable": "#8be9fd",
      "--cm-atom": "#bd93f9",
      "--cm-comment": "#6272a4",
      "--cm-string": "#f1fa8c",
      "--cm-number": "#bd93f9"
    }
  },
  nord: {
    theme: "dark",
    accent: "#88c0d0",
    background: "linear-gradient(135deg, #2e3440, #3b4252 70%, #242933)",
    colors: {
      "--bg": "#2e3440",
      "--glass": "rgba(46, 52, 64, 0.78)",
      "--glass-strong": "rgba(59, 66, 82, 0.92)",
      "--panel": "rgba(46, 52, 64, 0.94)",
      "--page": "#eceff4",
      "--text": "#eceff4",
      "--muted": "#d8dee9",
      "--border": "rgba(216, 222, 233, 0.16)",
      "--border-strong": "rgba(216, 222, 233, 0.28)",
      "--red": "#bf616a",
      "--green": "#a3be8c",
      "--blue": "#88c0d0",
      "--blue-dark": "#5e81ac",
      "--cm-bg": "#2e3440",
      "--cm-gutter": "#3b4252",
      "--cm-text": "#d8dee9",
      "--cm-keyword": "#81a1c1",
      "--cm-variable": "#88c0d0",
      "--cm-atom": "#b48ead",
      "--cm-comment": "#616e88",
      "--cm-string": "#a3be8c",
      "--cm-number": "#b48ead"
    }
  },
  "gruvbox-dark": {
    theme: "dark",
    accent: "#fabd2f",
    background: "linear-gradient(135deg, #282828, #3c3836 72%, #1d2021)",
    colors: {
      "--bg": "#282828",
      "--glass": "rgba(40, 40, 40, 0.78)",
      "--glass-strong": "rgba(60, 56, 54, 0.9)",
      "--panel": "rgba(40, 40, 40, 0.94)",
      "--page": "#fbf1c7",
      "--text": "#ebdbb2",
      "--muted": "#bdae93",
      "--border": "rgba(235, 219, 178, 0.16)",
      "--border-strong": "rgba(235, 219, 178, 0.3)",
      "--red": "#fb4934",
      "--green": "#b8bb26",
      "--blue": "#83a598",
      "--blue-dark": "#458588",
      "--cm-bg": "#282828",
      "--cm-gutter": "#3c3836",
      "--cm-text": "#ebdbb2",
      "--cm-keyword": "#fb4934",
      "--cm-variable": "#83a598",
      "--cm-atom": "#d3869b",
      "--cm-comment": "#928374",
      "--cm-string": "#b8bb26",
      "--cm-number": "#d3869b"
    }
  },
  "one-dark-pro": {
    theme: "dark",
    accent: "#61afef",
    background: "linear-gradient(135deg, #282c34, #21252b 70%, #1b1e24)",
    colors: {
      "--bg": "#282c34",
      "--glass": "rgba(40, 44, 52, 0.78)",
      "--glass-strong": "rgba(33, 37, 43, 0.92)",
      "--panel": "rgba(40, 44, 52, 0.94)",
      "--page": "#f5f5f5",
      "--text": "#abb2bf",
      "--muted": "#828997",
      "--border": "rgba(171, 178, 191, 0.16)",
      "--border-strong": "rgba(171, 178, 191, 0.28)",
      "--red": "#e06c75",
      "--green": "#98c379",
      "--blue": "#61afef",
      "--blue-dark": "#528bff",
      "--cm-bg": "#282c34",
      "--cm-gutter": "#21252b",
      "--cm-text": "#abb2bf",
      "--cm-keyword": "#c678dd",
      "--cm-variable": "#61afef",
      "--cm-atom": "#56b6c2",
      "--cm-comment": "#5c6370",
      "--cm-string": "#98c379",
      "--cm-number": "#d19a66"
    }
  },
  abyss: {
    theme: "dark",
    accent: "#00d7ff",
    background: "linear-gradient(135deg, #000000, #00111f 72%, #000000)",
    colors: {
      "--bg": "#000000",
      "--glass": "rgba(0, 8, 16, 0.94)",
      "--glass-strong": "rgba(0, 17, 31, 0.98)",
      "--panel": "rgba(0, 8, 16, 0.98)",
      "--page": "#ffffff",
      "--text": "#ffffff",
      "--muted": "#d7f7ff",
      "--border": "rgba(255, 255, 255, 0.58)",
      "--border-strong": "rgba(255, 255, 255, 0.86)",
      "--red": "#ff5c5c",
      "--green": "#00ffbf",
      "--blue": "#00d7ff",
      "--blue-dark": "#39a7ff",
      "--cm-bg": "#000000",
      "--cm-gutter": "#001a2e",
      "--cm-text": "#ffffff",
      "--cm-keyword": "#ff73d7",
      "--cm-variable": "#00d7ff",
      "--cm-atom": "#00ffbf",
      "--cm-comment": "#a8b7c7",
      "--cm-string": "#ffe66d",
      "--cm-number": "#ff9b6d",
      "--pdf-bg": "#000000",
      "--pdf-paper": "#ffffff"
    }
  },
  "kimbie-dark": {
    theme: "dark",
    accent: "#dc3958",
    background: "linear-gradient(135deg, #221a0f, #362712 72%, #18130b)",
    colors: {
      "--bg": "#221a0f",
      "--glass": "rgba(34, 26, 15, 0.78)",
      "--glass-strong": "rgba(54, 39, 18, 0.9)",
      "--panel": "rgba(34, 26, 15, 0.94)",
      "--page": "#fbf2df",
      "--text": "#d3af86",
      "--muted": "#a57a4c",
      "--border": "rgba(211, 175, 134, 0.16)",
      "--border-strong": "rgba(211, 175, 134, 0.3)",
      "--red": "#dc3958",
      "--green": "#889b4a",
      "--blue": "#8ab1b0",
      "--blue-dark": "#5f8f8d",
      "--cm-bg": "#221a0f",
      "--cm-gutter": "#362712",
      "--cm-text": "#d3af86",
      "--cm-keyword": "#dc3958",
      "--cm-variable": "#8ab1b0",
      "--cm-atom": "#98676a",
      "--cm-comment": "#84613d",
      "--cm-string": "#f79a32",
      "--cm-number": "#f06431"
    }
  },
  "catppuccin-mocha": {
    theme: "dark",
    accent: "#89b4fa",
    background: "linear-gradient(135deg, #1e1e2e, #181825 70%, #11111b)",
    colors: {
      "--bg": "#1e1e2e",
      "--glass": "rgba(30, 30, 46, 0.78)",
      "--glass-strong": "rgba(24, 24, 37, 0.92)",
      "--panel": "rgba(30, 30, 46, 0.94)",
      "--page": "#f5f5ff",
      "--text": "#cdd6f4",
      "--muted": "#a6adc8",
      "--border": "rgba(205, 214, 244, 0.16)",
      "--border-strong": "rgba(205, 214, 244, 0.3)",
      "--red": "#f38ba8",
      "--green": "#a6e3a1",
      "--blue": "#89b4fa",
      "--blue-dark": "#74a7fa",
      "--cm-bg": "#1e1e2e",
      "--cm-gutter": "#181825",
      "--cm-text": "#cdd6f4",
      "--cm-keyword": "#cba6f7",
      "--cm-variable": "#89b4fa",
      "--cm-atom": "#94e2d5",
      "--cm-comment": "#6c7086",
      "--cm-string": "#a6e3a1",
      "--cm-number": "#fab387",
      "--pdf-bg": "#11111b",
      "--pdf-paper": "#f5f5ff",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.12)"
    }
  },
  "tokyo-night": {
    theme: "dark",
    accent: "#7aa2f7",
    background: "linear-gradient(135deg, #1a1b26, #16161e 72%, #0f1018)",
    colors: {
      "--bg": "#1a1b26",
      "--glass": "rgba(26, 27, 38, 0.78)",
      "--glass-strong": "rgba(22, 22, 30, 0.92)",
      "--panel": "rgba(26, 27, 38, 0.94)",
      "--page": "#f4f6ff",
      "--text": "#c0caf5",
      "--muted": "#9aa5ce",
      "--border": "rgba(192, 202, 245, 0.16)",
      "--border-strong": "rgba(192, 202, 245, 0.3)",
      "--red": "#f7768e",
      "--green": "#9ece6a",
      "--blue": "#7aa2f7",
      "--blue-dark": "#5f82d6",
      "--cm-bg": "#1a1b26",
      "--cm-gutter": "#16161e",
      "--cm-text": "#c0caf5",
      "--cm-keyword": "#bb9af7",
      "--cm-variable": "#7dcfff",
      "--cm-atom": "#2ac3de",
      "--cm-comment": "#565f89",
      "--cm-string": "#9ece6a",
      "--cm-number": "#ff9e64",
      "--pdf-bg": "#0f1018",
      "--pdf-paper": "#f4f6ff",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.1)"
    }
  },
  "ayu-dark": {
    theme: "dark",
    accent: "#ffcc66",
    background: "linear-gradient(135deg, #0f1419, #111822 72%, #0a0e13)",
    colors: {
      "--bg": "#0f1419",
      "--glass": "rgba(15, 20, 25, 0.78)",
      "--glass-strong": "rgba(17, 24, 34, 0.92)",
      "--panel": "rgba(15, 20, 25, 0.94)",
      "--page": "#fff9ec",
      "--text": "#e6e1cf",
      "--muted": "#b3b1ad",
      "--border": "rgba(230, 225, 207, 0.16)",
      "--border-strong": "rgba(230, 225, 207, 0.3)",
      "--red": "#f07178",
      "--green": "#aad94c",
      "--blue": "#59c2ff",
      "--blue-dark": "#39a7e8",
      "--cm-bg": "#0f1419",
      "--cm-gutter": "#111822",
      "--cm-text": "#e6e1cf",
      "--cm-keyword": "#ff8f40",
      "--cm-variable": "#59c2ff",
      "--cm-atom": "#95e6cb",
      "--cm-comment": "#5c6773",
      "--cm-string": "#aad94c",
      "--cm-number": "#d2a6ff",
      "--pdf-bg": "#0a0e13",
      "--pdf-paper": "#fff9ec",
      "--pdf-page-filter": "invert(0.85) hue-rotate(180deg) contrast(0.88) brightness(1.1)"
    }
  },
  "honey-dark": {
    theme: "dark",
    accent: "#fbbf24",
    background: "linear-gradient(135deg, #1b1408, #2a1d0b 70%, #120d05)",
    colors: {
      "--bg": "#120d05",
      "--glass": "rgba(27, 20, 8, 0.82)",
      "--glass-strong": "rgba(42, 29, 11, 0.94)",
      "--panel": "rgba(27, 20, 8, 0.95)",
      "--page": "#fff7e6",
      "--text": "#f8e7bd",
      "--muted": "#caa96b",
      "--border": "rgba(251, 191, 36, 0.2)",
      "--border-strong": "rgba(251, 191, 36, 0.42)",
      "--red": "#f87171",
      "--green": "#bef264",
      "--blue": "#fbbf24",
      "--blue-dark": "#d97706",
      "--cm-bg": "#120d05",
      "--cm-gutter": "#1b1408",
      "--cm-text": "#f8e7bd",
      "--cm-keyword": "#fdba74",
      "--cm-variable": "#facc15",
      "--cm-atom": "#86efac",
      "--cm-comment": "#9f8755",
      "--cm-string": "#bef264",
      "--cm-number": "#fca5a5",
      "--pdf-bg": "#070501",
      "--pdf-paper": "#fff7e6",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.08) sepia(0.12)"
    }
  },
  "molten-amber": {
    theme: "dark",
    accent: "#fb923c",
    background: "linear-gradient(135deg, #1c0f0a, #351909 70%, #100706)",
    colors: {
      "--bg": "#100706",
      "--glass": "rgba(28, 15, 10, 0.84)",
      "--glass-strong": "rgba(53, 25, 9, 0.94)",
      "--panel": "rgba(28, 15, 10, 0.95)",
      "--page": "#fff4e6",
      "--text": "#ffe8cf",
      "--muted": "#e0ad80",
      "--border": "rgba(251, 146, 60, 0.22)",
      "--border-strong": "rgba(251, 146, 60, 0.46)",
      "--red": "#fb7185",
      "--green": "#a3e635",
      "--blue": "#fb923c",
      "--blue-dark": "#ea580c",
      "--cm-bg": "#100706",
      "--cm-gutter": "#1c0f0a",
      "--cm-text": "#ffe8cf",
      "--cm-keyword": "#fb923c",
      "--cm-variable": "#fdba74",
      "--cm-atom": "#5eead4",
      "--cm-comment": "#9b735a",
      "--cm-string": "#a3e635",
      "--cm-number": "#fda4af",
      "--pdf-bg": "#080302",
      "--pdf-paper": "#fff4e6",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.92) brightness(1.08) sepia(0.08)"
    }
  },
  "saffron-night": {
    theme: "dark",
    accent: "#eab308",
    background: "linear-gradient(135deg, #171005, #231907 68%, #0f0a03)",
    colors: {
      "--bg": "#0f0a03",
      "--glass": "rgba(23, 16, 5, 0.82)",
      "--glass-strong": "rgba(35, 25, 7, 0.94)",
      "--panel": "rgba(23, 16, 5, 0.95)",
      "--page": "#fff8e1",
      "--text": "#f8e8b4",
      "--muted": "#c9aa62",
      "--border": "rgba(234, 179, 8, 0.22)",
      "--border-strong": "rgba(234, 179, 8, 0.46)",
      "--red": "#fb7185",
      "--green": "#bef264",
      "--blue": "#facc15",
      "--blue-dark": "#ca8a04",
      "--cm-bg": "#0f0a03",
      "--cm-gutter": "#171005",
      "--cm-text": "#f8e8b4",
      "--cm-keyword": "#f59e0b",
      "--cm-variable": "#fde047",
      "--cm-atom": "#86efac",
      "--cm-comment": "#9c8452",
      "--cm-string": "#bef264",
      "--cm-number": "#fdba74",
      "--pdf-bg": "#070501",
      "--pdf-paper": "#fff8e1",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.08) sepia(0.1)"
    }
  },
  "amber-slate": {
    theme: "dark",
    accent: "#f59e0b",
    background: "linear-gradient(135deg, #111827, #20202a 70%, #0b1020)",
    colors: {
      "--bg": "#111827",
      "--glass": "rgba(17, 24, 39, 0.82)",
      "--glass-strong": "rgba(31, 41, 55, 0.94)",
      "--panel": "rgba(17, 24, 39, 0.95)",
      "--page": "#fff8ec",
      "--text": "#f4ead8",
      "--muted": "#c7ad82",
      "--border": "rgba(245, 158, 11, 0.22)",
      "--border-strong": "rgba(245, 158, 11, 0.44)",
      "--red": "#fca5a5",
      "--green": "#86efac",
      "--blue": "#fbbf24",
      "--blue-dark": "#d97706",
      "--cm-bg": "#0b1020",
      "--cm-gutter": "#111827",
      "--cm-text": "#f4ead8",
      "--cm-keyword": "#fbbf24",
      "--cm-variable": "#fdba74",
      "--cm-atom": "#99f6e4",
      "--cm-comment": "#9ca3af",
      "--cm-string": "#bbf7d0",
      "--cm-number": "#fca5a5",
      "--pdf-bg": "#0b1020",
      "--pdf-paper": "#fff8ec",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.1)"
    }
  },
  palenight: {
    theme: "dark",
    accent: "#82aaff",
    background: "linear-gradient(135deg, #292d3e, #222638 72%, #1b1e2d)",
    colors: {
      "--bg": "#292d3e",
      "--glass": "rgba(41, 45, 62, 0.78)",
      "--glass-strong": "rgba(34, 38, 56, 0.92)",
      "--panel": "rgba(41, 45, 62, 0.94)",
      "--page": "#f7f8ff",
      "--text": "#a6accd",
      "--muted": "#8796b0",
      "--border": "rgba(166, 172, 205, 0.16)",
      "--border-strong": "rgba(166, 172, 205, 0.3)",
      "--red": "#f07178",
      "--green": "#c3e88d",
      "--blue": "#82aaff",
      "--blue-dark": "#6d8fe8",
      "--cm-bg": "#292d3e",
      "--cm-gutter": "#222638",
      "--cm-text": "#a6accd",
      "--cm-keyword": "#c792ea",
      "--cm-variable": "#82aaff",
      "--cm-atom": "#89ddff",
      "--cm-comment": "#676e95",
      "--cm-string": "#c3e88d",
      "--cm-number": "#f78c6c",
      "--pdf-bg": "#1b1e2d",
      "--pdf-paper": "#f7f8ff",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.1)"
    }
  },
  "tomorrow-night-blue": {
    theme: "dark",
    accent: "#bbdaff",
    background: "linear-gradient(135deg, #001733, #002451 72%, #000a18)",
    colors: {
      "--bg": "#001733",
      "--glass": "rgba(0, 23, 51, 0.94)",
      "--glass-strong": "rgba(0, 36, 81, 0.98)",
      "--panel": "rgba(0, 23, 51, 0.98)",
      "--page": "#ffffff",
      "--text": "#ffffff",
      "--muted": "#bbdaff",
      "--border": "rgba(187, 218, 255, 0.58)",
      "--border-strong": "rgba(187, 218, 255, 0.86)",
      "--red": "#ff9da4",
      "--green": "#d1f1a9",
      "--blue": "#bbdaff",
      "--blue-dark": "#7aa6da",
      "--cm-bg": "#001733",
      "--cm-gutter": "#00346e",
      "--cm-text": "#ffffff",
      "--cm-keyword": "#ebbbff",
      "--cm-variable": "#bbdaff",
      "--cm-atom": "#ffc58f",
      "--cm-comment": "#7285b7",
      "--cm-string": "#d1f1a9",
      "--cm-number": "#ffc58f",
      "--pdf-bg": "#000a18",
      "--pdf-paper": "#ffffff"
    }
  },
  "pastel-graphite-hc": {
    theme: "dark",
    accent: "#a7c7ff",
    background: "linear-gradient(135deg, #111318, #1b1d26 68%, #090b10)",
    colors: {
      "--bg": "#090b10",
      "--glass": "rgba(17, 19, 24, 0.94)",
      "--glass-strong": "rgba(27, 29, 38, 0.98)",
      "--panel": "rgba(17, 19, 24, 0.98)",
      "--page": "#f7f8ff",
      "--text": "#f7f8ff",
      "--muted": "#d8ddf2",
      "--border": "rgba(197, 207, 232, 0.58)",
      "--border-strong": "rgba(226, 232, 255, 0.9)",
      "--red": "#ffb4bd",
      "--green": "#b8f2d0",
      "--blue": "#a7c7ff",
      "--blue-dark": "#7da7ef",
      "--cm-bg": "#111318",
      "--cm-gutter": "#1b1d26",
      "--cm-text": "#f7f8ff",
      "--cm-keyword": "#f0b6ff",
      "--cm-variable": "#a7c7ff",
      "--cm-atom": "#b8f2d0",
      "--cm-comment": "#aeb7d0",
      "--cm-string": "#ffe3a1",
      "--cm-number": "#ffc3a6",
      "--pdf-bg": "#090b10",
      "--pdf-paper": "#ffffff"
    }
  },
  "lavender-contrast-hc": {
    theme: "dark",
    accent: "#d7b8ff",
    background: "linear-gradient(135deg, #14101f, #211a30 70%, #0c0914)",
    colors: {
      "--bg": "#0c0914",
      "--glass": "rgba(20, 16, 31, 0.94)",
      "--glass-strong": "rgba(33, 26, 48, 0.98)",
      "--panel": "rgba(20, 16, 31, 0.98)",
      "--page": "#fff8ff",
      "--text": "#fff8ff",
      "--muted": "#eadfff",
      "--border": "rgba(215, 184, 255, 0.62)",
      "--border-strong": "rgba(244, 224, 255, 0.92)",
      "--red": "#ffb3ca",
      "--green": "#c5f4c9",
      "--blue": "#b9d2ff",
      "--blue-dark": "#93b7ff",
      "--cm-bg": "#14101f",
      "--cm-gutter": "#211a30",
      "--cm-text": "#fff8ff",
      "--cm-keyword": "#ffb3ea",
      "--cm-variable": "#b9d2ff",
      "--cm-atom": "#b7f7e7",
      "--cm-comment": "#b8a9d6",
      "--cm-string": "#fff0a8",
      "--cm-number": "#ffc6a8",
      "--pdf-bg": "#0c0914",
      "--pdf-paper": "#ffffff"
    }
  },
  "mint-contrast-hc": {
    theme: "dark",
    accent: "#9ef0d1",
    background: "linear-gradient(135deg, #071814, #0d2a24 70%, #030c0a)",
    colors: {
      "--bg": "#030c0a",
      "--glass": "rgba(7, 24, 20, 0.94)",
      "--glass-strong": "rgba(13, 42, 36, 0.98)",
      "--panel": "rgba(7, 24, 20, 0.98)",
      "--page": "#f6fffb",
      "--text": "#f6fffb",
      "--muted": "#d4f7eb",
      "--border": "rgba(158, 240, 209, 0.6)",
      "--border-strong": "rgba(219, 255, 242, 0.92)",
      "--red": "#ffb1b8",
      "--green": "#9ef0d1",
      "--blue": "#a7d8ff",
      "--blue-dark": "#7fb8ec",
      "--cm-bg": "#071814",
      "--cm-gutter": "#0d2a24",
      "--cm-text": "#f6fffb",
      "--cm-keyword": "#ffbaf4",
      "--cm-variable": "#a7d8ff",
      "--cm-atom": "#9ef0d1",
      "--cm-comment": "#9ec9bd",
      "--cm-string": "#fff1aa",
      "--cm-number": "#ffc7a8",
      "--pdf-bg": "#030c0a",
      "--pdf-paper": "#ffffff"
    }
  },
  "rose-contrast-hc": {
    theme: "dark",
    accent: "#ffb4d0",
    background: "linear-gradient(135deg, #1c0f16, #2b1722 70%, #10070c)",
    colors: {
      "--bg": "#10070c",
      "--glass": "rgba(28, 15, 22, 0.94)",
      "--glass-strong": "rgba(43, 23, 34, 0.98)",
      "--panel": "rgba(28, 15, 22, 0.98)",
      "--page": "#fff8fa",
      "--text": "#fff8fa",
      "--muted": "#f6dbe5",
      "--border": "rgba(255, 180, 208, 0.6)",
      "--border-strong": "rgba(255, 226, 237, 0.92)",
      "--red": "#ff9fb3",
      "--green": "#c8f0bd",
      "--blue": "#bcd4ff",
      "--blue-dark": "#91b1ef",
      "--cm-bg": "#1c0f16",
      "--cm-gutter": "#2b1722",
      "--cm-text": "#fff8fa",
      "--cm-keyword": "#ffb4d0",
      "--cm-variable": "#bcd4ff",
      "--cm-atom": "#b8efd7",
      "--cm-comment": "#d1aab9",
      "--cm-string": "#ffe6a7",
      "--cm-number": "#ffc0a6",
      "--pdf-bg": "#10070c",
      "--pdf-paper": "#ffffff"
    }
  },
  "pastel-cobalt-hc": {
    theme: "dark",
    accent: "#9bd5ff",
    background: "linear-gradient(135deg, #061328, #102a4d 70%, #020814)",
    colors: {
      "--bg": "#020814",
      "--glass": "rgba(6, 19, 40, 0.94)",
      "--glass-strong": "rgba(16, 42, 77, 0.98)",
      "--panel": "rgba(6, 19, 40, 0.98)",
      "--page": "#f7fbff",
      "--text": "#f7fbff",
      "--muted": "#d4e8ff",
      "--border": "rgba(155, 213, 255, 0.62)",
      "--border-strong": "rgba(229, 244, 255, 0.94)",
      "--red": "#ffb2c1",
      "--green": "#b8f7d4",
      "--blue": "#9bd5ff",
      "--blue-dark": "#70bbf2",
      "--cm-bg": "#061328",
      "--cm-gutter": "#102a4d",
      "--cm-text": "#f7fbff",
      "--cm-keyword": "#ddb8ff",
      "--cm-variable": "#9bd5ff",
      "--cm-atom": "#a7f3d0",
      "--cm-comment": "#9fb8d6",
      "--cm-string": "#fff0a3",
      "--cm-number": "#ffccb0",
      "--pdf-bg": "#020814",
      "--pdf-paper": "#ffffff"
    }
  },
  "dusk-contrast-hc": {
    theme: "dark",
    accent: "#f0b8ff",
    background: "linear-gradient(135deg, #17091e, #2d1838 70%, #08030c)",
    colors: {
      "--bg": "#08030c",
      "--glass": "rgba(23, 9, 30, 0.94)",
      "--glass-strong": "rgba(45, 24, 56, 0.98)",
      "--panel": "rgba(23, 9, 30, 0.98)",
      "--page": "#fff9ff",
      "--text": "#fff9ff",
      "--muted": "#efd8f7",
      "--border": "rgba(240, 184, 255, 0.64)",
      "--border-strong": "rgba(255, 232, 255, 0.94)",
      "--red": "#ffabc2",
      "--green": "#c5f4c9",
      "--blue": "#b9d4ff",
      "--blue-dark": "#8ab8ff",
      "--cm-bg": "#17091e",
      "--cm-gutter": "#2d1838",
      "--cm-text": "#fff9ff",
      "--cm-keyword": "#ffb5e7",
      "--cm-variable": "#b9d4ff",
      "--cm-atom": "#b8f7e3",
      "--cm-comment": "#c6a4d0",
      "--cm-string": "#ffeda8",
      "--cm-number": "#ffc0a8",
      "--pdf-bg": "#08030c",
      "--pdf-paper": "#ffffff"
    }
  },
  "pastel-noir-hc": {
    theme: "dark",
    accent: "#b8e0ff",
    background: "linear-gradient(135deg, #080a10, #141826 70%, #03050a)",
    colors: {
      "--bg": "#03050a",
      "--glass": "rgba(8, 10, 16, 0.95)",
      "--glass-strong": "rgba(20, 24, 38, 0.99)",
      "--panel": "rgba(8, 10, 16, 0.98)",
      "--page": "#fbfdff",
      "--text": "#fbfdff",
      "--muted": "#d9e6ff",
      "--border": "rgba(184, 224, 255, 0.68)",
      "--border-strong": "rgba(235, 247, 255, 0.96)",
      "--red": "#ffb8c8",
      "--green": "#baf7d2",
      "--blue": "#b8e0ff",
      "--blue-dark": "#85c8ff",
      "--cm-bg": "#080a10",
      "--cm-gutter": "#141826",
      "--cm-text": "#fbfdff",
      "--cm-keyword": "#f3b8ff",
      "--cm-variable": "#b8e0ff",
      "--cm-atom": "#baf7d2",
      "--cm-comment": "#aab7d4",
      "--cm-string": "#fff0ad",
      "--cm-number": "#ffc4ad",
      "--pdf-bg": "#03050a",
      "--pdf-paper": "#ffffff"
    }
  },
  "pastel-ink-hc": {
    theme: "dark",
    accent: "#c8d0ff",
    background: "linear-gradient(135deg, #10111c, #1e2133 70%, #080914)",
    colors: {
      "--bg": "#080914",
      "--glass": "rgba(16, 17, 28, 0.95)",
      "--glass-strong": "rgba(30, 33, 51, 0.99)",
      "--panel": "rgba(16, 17, 28, 0.98)",
      "--page": "#fbfbff",
      "--text": "#fbfbff",
      "--muted": "#dfe3ff",
      "--border": "rgba(200, 208, 255, 0.68)",
      "--border-strong": "rgba(241, 243, 255, 0.96)",
      "--red": "#ffb6d0",
      "--green": "#c7f8c8",
      "--blue": "#c8d0ff",
      "--blue-dark": "#9da9ff",
      "--cm-bg": "#10111c",
      "--cm-gutter": "#1e2133",
      "--cm-text": "#fbfbff",
      "--cm-keyword": "#ffb8e7",
      "--cm-variable": "#c8d0ff",
      "--cm-atom": "#b7f7ea",
      "--cm-comment": "#aeb6d8",
      "--cm-string": "#fff2b0",
      "--cm-number": "#ffc8b2",
      "--pdf-bg": "#080914",
      "--pdf-paper": "#ffffff"
    }
  },
  "pastel-aurora-hc": {
    theme: "dark",
    accent: "#a8f5e4",
    background: "linear-gradient(135deg, #071118, #13283a 56%, #130b24)",
    colors: {
      "--bg": "#04080f",
      "--glass": "rgba(7, 17, 24, 0.95)",
      "--glass-strong": "rgba(19, 40, 58, 0.99)",
      "--panel": "rgba(7, 17, 24, 0.98)",
      "--page": "#f9fffd",
      "--text": "#f9fffd",
      "--muted": "#d8fff5",
      "--border": "rgba(168, 245, 228, 0.68)",
      "--border-strong": "rgba(232, 255, 249, 0.96)",
      "--red": "#ffb2c6",
      "--green": "#a8f5e4",
      "--blue": "#b5d9ff",
      "--blue-dark": "#83bdff",
      "--cm-bg": "#071118",
      "--cm-gutter": "#13283a",
      "--cm-text": "#f9fffd",
      "--cm-keyword": "#ddb8ff",
      "--cm-variable": "#b5d9ff",
      "--cm-atom": "#a8f5e4",
      "--cm-comment": "#9bbdc0",
      "--cm-string": "#fff0a8",
      "--cm-number": "#ffc5ae",
      "--pdf-bg": "#04080f",
      "--pdf-paper": "#ffffff"
    }
  },
  "pastel-plum-hc": {
    theme: "dark",
    accent: "#ffc1ea",
    background: "linear-gradient(135deg, #160b18, #29172d 68%, #0b050d)",
    colors: {
      "--bg": "#0b050d",
      "--glass": "rgba(22, 11, 24, 0.95)",
      "--glass-strong": "rgba(41, 23, 45, 0.99)",
      "--panel": "rgba(22, 11, 24, 0.98)",
      "--page": "#fff9fd",
      "--text": "#fff9fd",
      "--muted": "#f7dff0",
      "--border": "rgba(255, 193, 234, 0.68)",
      "--border-strong": "rgba(255, 235, 249, 0.96)",
      "--red": "#ffabc0",
      "--green": "#c8f5c8",
      "--blue": "#c9dcff",
      "--blue-dark": "#9fbfff",
      "--cm-bg": "#160b18",
      "--cm-gutter": "#29172d",
      "--cm-text": "#fff9fd",
      "--cm-keyword": "#ffc1ea",
      "--cm-variable": "#c9dcff",
      "--cm-atom": "#baf7dc",
      "--cm-comment": "#d5aecf",
      "--cm-string": "#ffefab",
      "--cm-number": "#ffc3ae",
      "--pdf-bg": "#0b050d",
      "--pdf-paper": "#ffffff"
    }
  },
  "prism-light": {
    theme: "light",
    accent: "#7c3aed",
    background: "radial-gradient(circle at 14% 12%, rgba(124, 58, 237, 0.24), transparent 30%), radial-gradient(circle at 84% 8%, rgba(14, 165, 233, 0.22), transparent 28%), linear-gradient(135deg, #fbfdff, #edf4ff 58%, #f7eafe)",
    colors: {
      "--bg": "#edf4ff",
      "--glass": "rgba(255, 255, 255, 0.72)",
      "--glass-strong": "rgba(255, 255, 255, 0.9)",
      "--panel": "rgba(255, 255, 255, 0.9)",
      "--page": "#ffffff",
      "--text": "#172033",
      "--muted": "#5d6880",
      "--border": "rgba(93, 104, 128, 0.26)",
      "--border-strong": "rgba(76, 64, 128, 0.38)",
      "--red": "#d12b6a",
      "--green": "#07835f",
      "--blue": "#2563eb",
      "--blue-dark": "#1d4ed8",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#eef4ff",
      "--cm-text": "#172033",
      "--cm-keyword": "#7c3aed",
      "--cm-variable": "#2563eb",
      "--cm-atom": "#0891b2",
      "--cm-comment": "#7a8499",
      "--cm-string": "#0f766e",
      "--cm-number": "#db2777",
      "--pdf-bg": "#cfdaf0",
      "--pdf-paper": "#ffffff"
    }
  },
  "frosted-candy": {
    theme: "light",
    accent: "#ec4899",
    background: "radial-gradient(circle at 18% 16%, rgba(236, 72, 153, 0.24), transparent 30%), radial-gradient(circle at 90% 18%, rgba(45, 212, 191, 0.24), transparent 30%), linear-gradient(135deg, #fff7fb, #edfdf9 54%, #eef2ff)",
    colors: {
      "--bg": "#f4fbff",
      "--glass": "rgba(255, 255, 255, 0.7)",
      "--glass-strong": "rgba(255, 255, 255, 0.9)",
      "--panel": "rgba(255, 255, 255, 0.9)",
      "--page": "#ffffff",
      "--text": "#1f2937",
      "--muted": "#64748b",
      "--border": "rgba(100, 116, 139, 0.24)",
      "--border-strong": "rgba(148, 76, 128, 0.38)",
      "--red": "#db2777",
      "--green": "#0f766e",
      "--blue": "#2563eb",
      "--blue-dark": "#1e40af",
      "--cm-bg": "#ffffff",
      "--cm-gutter": "#f6eef8",
      "--cm-text": "#1f2937",
      "--cm-keyword": "#be185d",
      "--cm-variable": "#2563eb",
      "--cm-atom": "#0f766e",
      "--cm-comment": "#7c8597",
      "--cm-string": "#047857",
      "--cm-number": "#c026d3",
      "--pdf-bg": "#d7e2ef",
      "--pdf-paper": "#ffffff"
    }
  },
  "sunset-gradient": {
    theme: "dark",
    accent: "#ff9f6e",
    background: "radial-gradient(circle at 18% 8%, rgba(255, 159, 110, 0.28), transparent 32%), radial-gradient(circle at 82% 14%, rgba(168, 85, 247, 0.22), transparent 30%), linear-gradient(135deg, #160f20, #241832 54%, #0c1222)",
    colors: {
      "--bg": "#0c1222",
      "--glass": "rgba(22, 15, 32, 0.82)",
      "--glass-strong": "rgba(36, 24, 50, 0.94)",
      "--panel": "rgba(16, 20, 34, 0.94)",
      "--page": "#fff8f2",
      "--text": "#f8f2ec",
      "--muted": "#d1c4bf",
      "--border": "rgba(255, 190, 150, 0.18)",
      "--border-strong": "rgba(255, 213, 181, 0.34)",
      "--red": "#ff7a90",
      "--green": "#8ee6b1",
      "--blue": "#93c5fd",
      "--blue-dark": "#60a5fa",
      "--cm-bg": "#141827",
      "--cm-gutter": "#201729",
      "--cm-text": "#f8f2ec",
      "--cm-keyword": "#ff9f6e",
      "--cm-variable": "#93c5fd",
      "--cm-atom": "#8ee6b1",
      "--cm-comment": "#a99a98",
      "--cm-string": "#ffd166",
      "--cm-number": "#f0abfc",
      "--pdf-bg": "#0c1222",
      "--pdf-paper": "#fff8f2",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.1) sepia(0.08)"
    }
  },
  "lagoon-gradient": {
    theme: "dark",
    accent: "#67e8f9",
    background: "radial-gradient(circle at 12% 10%, rgba(103, 232, 249, 0.2), transparent 30%), radial-gradient(circle at 92% 12%, rgba(52, 211, 153, 0.18), transparent 28%), linear-gradient(135deg, #031b2a, #062f3d 52%, #04131f)",
    colors: {
      "--bg": "#04131f",
      "--glass": "rgba(3, 27, 42, 0.82)",
      "--glass-strong": "rgba(6, 47, 61, 0.94)",
      "--panel": "rgba(5, 24, 36, 0.94)",
      "--page": "#f5ffff",
      "--text": "#effcff",
      "--muted": "#b6d9df",
      "--border": "rgba(103, 232, 249, 0.18)",
      "--border-strong": "rgba(180, 250, 255, 0.36)",
      "--red": "#fb7185",
      "--green": "#34d399",
      "--blue": "#67e8f9",
      "--blue-dark": "#22d3ee",
      "--cm-bg": "#062333",
      "--cm-gutter": "#052030",
      "--cm-text": "#effcff",
      "--cm-keyword": "#a78bfa",
      "--cm-variable": "#67e8f9",
      "--cm-atom": "#34d399",
      "--cm-comment": "#7aa9b0",
      "--cm-string": "#f8e16c",
      "--cm-number": "#f0abfc",
      "--pdf-bg": "#04131f",
      "--pdf-paper": "#f5ffff",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.1)"
    }
  },
  "aurora-contrast-hc": {
    theme: "dark",
    accent: "#7fffd4",
    background: "radial-gradient(circle at 18% 8%, rgba(127, 255, 212, 0.26), transparent 30%), radial-gradient(circle at 82% 10%, rgba(190, 140, 255, 0.28), transparent 30%), linear-gradient(135deg, #020910, #071f2c 52%, #150b24)",
    colors: {
      "--bg": "#020910",
      "--glass": "rgba(2, 9, 16, 0.95)",
      "--glass-strong": "rgba(7, 31, 44, 0.99)",
      "--panel": "rgba(2, 12, 20, 0.98)",
      "--page": "#fbfffd",
      "--text": "#fbfffd",
      "--muted": "#d9fff5",
      "--border": "rgba(127, 255, 212, 0.7)",
      "--border-strong": "rgba(232, 255, 248, 0.98)",
      "--red": "#ffb3c7",
      "--green": "#7fffd4",
      "--blue": "#b9dcff",
      "--blue-dark": "#8fc4ff",
      "--cm-bg": "#03131d",
      "--cm-gutter": "#082636",
      "--cm-text": "#fbfffd",
      "--cm-keyword": "#e5b8ff",
      "--cm-variable": "#b9dcff",
      "--cm-atom": "#7fffd4",
      "--cm-comment": "#a8d2d1",
      "--cm-string": "#fff1a8",
      "--cm-number": "#ffc3ae",
      "--pdf-bg": "#020910",
      "--pdf-paper": "#ffffff"
    }
  }
};

function lightHighContrastPreset({ accent, tint, text = "#111827", secondary = "#374151" }) {
  return {
    theme: "light",
    accent,
    background: `linear-gradient(135deg, #ffffff, ${tint} 72%, color-mix(in srgb, ${tint} 76%, ${accent}))`,
    colors: {
      "--bg": tint,
      "--glass": "rgba(255, 255, 255, 0.96)",
      "--glass-strong": "rgba(255, 255, 255, 0.99)",
      "--panel": "rgba(255, 255, 255, 0.98)",
      "--page": "#ffffff",
      "--text": text,
      "--muted": secondary,
      "--border": "rgba(17, 24, 39, 0.5)",
      "--border-strong": "rgba(17, 24, 39, 0.86)",
      "--red": "#a40e26",
      "--green": "#006b3c",
      "--blue": accent,
      "--blue-dark": accent,
      "--cm-bg": "#ffffff",
      "--cm-gutter": tint,
      "--cm-text": text,
      "--cm-keyword": accent,
      "--cm-variable": "#005ea8",
      "--cm-atom": "#006b3c",
      "--cm-comment": secondary,
      "--cm-string": "#8a2c0d",
      "--cm-number": "#6b21a8",
      "--pdf-bg": tint,
      "--pdf-paper": "#ffffff"
    }
  };
}

function darkGlassPreset({ accent, tint, text, muted, keyword, variable, atom, string, number }) {
  return {
    theme: "dark",
    accent,
    background: "transparent",
    transparent: true,
    colors: {
      "--bg": `color-mix(in srgb, ${tint} 18%, transparent)`,
      "--glass": `color-mix(in srgb, ${tint} 28%, transparent)`,
      "--glass-strong": `color-mix(in srgb, ${tint} 46%, transparent)`,
      "--panel": `color-mix(in srgb, ${tint} 36%, transparent)`,
      "--page": "#ffffff",
      "--text": text,
      "--muted": muted,
      "--border": `color-mix(in srgb, ${accent} 28%, transparent)`,
      "--border-strong": `color-mix(in srgb, ${accent} 48%, transparent)`,
      "--red": "#fda4af",
      "--green": "#86efac",
      "--blue": accent,
      "--blue-dark": accent,
      "--cm-bg": `color-mix(in srgb, ${tint} 42%, transparent)`,
      "--cm-gutter": `color-mix(in srgb, ${tint} 52%, transparent)`,
      "--cm-text": text,
      "--cm-keyword": keyword,
      "--cm-variable": variable,
      "--cm-atom": atom,
      "--cm-comment": muted,
      "--cm-string": string,
      "--cm-number": number,
      "--pdf-bg": tint,
      "--pdf-paper": "#ffffff",
      "--pdf-page-filter": "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.1)"
    }
  };
}

Object.assign(THEME_PRESETS, {
  "cobalt-paper-hc": lightHighContrastPreset({ accent: "#0047ab", tint: "#e8f0ff", text: "#07152f", secondary: "#30496f" }),
  "mint-paper-hc": lightHighContrastPreset({ accent: "#006b4f", tint: "#e5f8f0", text: "#05251c", secondary: "#315c50" }),
  "plum-paper-hc": lightHighContrastPreset({ accent: "#6b21a8", tint: "#f5e9ff", text: "#260637", secondary: "#5f3a70" }),
  "coral-paper-hc": lightHighContrastPreset({ accent: "#b42318", tint: "#fff0eb", text: "#35100c", secondary: "#71443e" }),
  "teal-paper-hc": lightHighContrastPreset({ accent: "#006d77", tint: "#e7f8f8", text: "#062a2d", secondary: "#315f63" }),
  "gold-paper-hc": lightHighContrastPreset({ accent: "#8a5a00", tint: "#fff6d8", text: "#302000", secondary: "#6c5525" }),
  "glass-ocean": darkGlassPreset({ accent: "#22d3ee", tint: "#062433", text: "#ecfeff", muted: "#a5d8df", keyword: "#67e8f9", variable: "#7dd3fc", atom: "#5eead4", string: "#bbf7d0", number: "#fdba74" }),
  "glass-violet": darkGlassPreset({ accent: "#c4b5fd", tint: "#21163b", text: "#faf5ff", muted: "#cfc3e8", keyword: "#e9d5ff", variable: "#c4b5fd", atom: "#a5f3fc", string: "#bbf7d0", number: "#f9a8d4" }),
  "glass-forest": darkGlassPreset({ accent: "#6ee7b7", tint: "#09291f", text: "#ecfdf5", muted: "#a7d6c4", keyword: "#a7f3d0", variable: "#93c5fd", atom: "#5eead4", string: "#bef264", number: "#fbbf24" }),
  "glass-amber": darkGlassPreset({ accent: "#fbbf24", tint: "#30210a", text: "#fffbeb", muted: "#dac9a4", keyword: "#fde68a", variable: "#93c5fd", atom: "#86efac", string: "#fcd34d", number: "#fb923c" })
});
const DEFAULT_FILE_WIDTH = 240;
const MIN_FILE_WIDTH = 220;
const MAX_FILE_WIDTH = 460;
const FILE_COLLAPSE_THRESHOLD = 165;
const DEFAULT_EDITOR_WIDTH = 520;
const MIN_EDITOR_WIDTH = 320;
const SOURCE_COLLAPSE_THRESHOLD = 235;
const PDF_COLLAPSE_THRESHOLD = 260;
const DEFAULT_PDF_MIN_WIDTH = 540;
const DEFAULT_PDF_ZOOM = 1;
const PDF_BASE_RENDER_SCALE = 0.72;
const MIN_PDF_ZOOM = 0.7;
const MAX_PDF_ZOOM = 4;
const MAX_PDF_RENDER_SCALE = 5;
const DEFAULT_TERMINAL_HEIGHT = 254;
const MIN_TERMINAL_HEIGHT = 140;
const MAX_TERMINAL_HEIGHT = 520;
const TERMINAL_COLLAPSE_THRESHOLD = 92;
const DEFAULT_TERMINAL_TABS_WIDTH = 184;
const MIN_TERMINAL_TABS_WIDTH = 132;
const MAX_TERMINAL_TABS_WIDTH = 320;
const DEFAULT_COMPILE_LOG_HEIGHT = 170;
const MIN_COMPILE_LOG_HEIGHT = 118;
const MAX_COMPILE_LOG_HEIGHT = 430;
const COMPILE_LOG_COLLAPSE_THRESHOLD = 72;
const EXTERNAL_SOURCE_POLL_MS = 900;
const DEFAULT_FILE_OUTLINE_HEIGHT = 220;
const MIN_FILE_OUTLINE_HEIGHT = 92;
const MAX_FILE_OUTLINE_HEIGHT = 420;
const SPELL_SUGGESTIONS = new Map(Object.entries({
  accomodate: ["accommodate"],
  acheive: ["achieve"],
  adress: ["address"],
  arguement: ["argument"],
  becuase: ["because"],
  definately: ["definitely"],
  enviroment: ["environment"],
  figuer: ["figure"],
  goverment: ["government"],
  occured: ["occurred"],
  recieve: ["receive"],
  seperate: ["separate"],
  teh: ["the"],
  thier: ["their"],
  wich: ["which"],
  wokring: ["working"]
}));
const SPELL_IGNORED_WORDS = new Set([
  "latex",
  "tex",
  "bibtex",
  "codex",
  "openleaf",
  "pdf",
  "rgb",
  "vae",
  "cnf",
  "sashimi",
  "neurofibroma",
  "github",
  "yaml",
  "json",
  "markdown"
]);

let editor;
let projects = [];
let projectPreviewGeneration = 0;
let projectPreviewQueue = Promise.resolve();
let templateLibrary = { builtIn: [], custom: [] };
let projectFiles = [];
let activeProject = null;
let activeFile = null;
let savedText = "";
let openTextTabs = [];
let activeTextTabPath = "";
let isLoading = false;
let isCompiling = false;
let pendingCompile = false;
let autoCompileTimer = null;
let autoSaveTimer = null;
let externalSourcePollTimer = null;
let externalSourcePollBusy = false;
let activeDiskSignature = "";
let visualItems = [];
let visualBlocks = [];
let markdownVisualTimer = null;
let suppressSourceChange = false;
let ipynbCellEditors = [];
let syncingIpynbSource = false;
let pdfJsPromise = null;
let pdfRenderToken = 0;
let pdfResizeTimer = null;
let pdfZoomGestureTimer = null;
let pdfLazyRenderObserver = null;
let pdfLazyRenderQueue = [];
let pdfLazyRenderActive = false;
let pdfGestureStartZoom = DEFAULT_PDF_ZOOM;
let pdfPageTextLines = new Map();
let renderedPdfPageCount = 0;
let renderedPdfZoom = DEFAULT_PDF_ZOOM;
let pdfZoom = DEFAULT_PDF_ZOOM;
let pdfSpeechPlan = { chunks: [], wordCount: 0, pageCount: 0, documentKey: "", fingerprint: "" };
let pdfSpeechChunkIndex = 0;
let pdfSpeechWordIndex = 0;
let pdfSpeechPlaying = false;
let pdfSpeechPaused = false;
let pdfSpeechBackend = { available: false, model: "", voice: "" };
let pdfSpeechAudio = null;
let pdfSpeechAnimationFrame = 0;
let pdfSpeechRequestGeneration = 0;
let pdfSpeechCurrentTimings = [];
let pdfSpeechAudioCache = new Map();
let pdfSpeechFirstChunkReady = false;
let pdfSpeechPlanRevision = 0;
let pdfSpeechPreparedCount = 0;
let pdfSpeechPreprocessActive = false;
let pdfSpeechBackgroundPreloadActive = false;
let pdfSpeechChunkDurations = [];
let pdfSpeechWordMetadata = new Map();
let pdfWordMeasureContext = null;
let pdfSpeechAutoFollow = true;
let pdfWordDefinitionCard = null;
let pdfWordDefinitionCache = null;
let pdfWordDefinitionRequest = 0;
let extraFeaturesEnabled = false;
let pdfCinematicAudio = null;
let pdfCinematicGeneration = 0;
let pdfCinematicChunkIndex = 0;
let pdfCinematicWordIndex = 0;
let pdfCinematicCurrentTimings = [];
let pdfCinematicAnimationFrame = 0;
let pdfCinematicPlaying = false;
let pdfCinematicPaused = false;
let pdfCinematicFollowText = true;
let pdfCinematicActiveWord = null;
const PDF_CINEMATIC_ARTWORKS = [
  "assets/cinematic/monet-bridge-water-lilies.webp",
  "assets/cinematic/van-gogh-starry-night.webp",
  "assets/cinematic/heart-of-andes.webp"
];
let pdfPronunciationDictionaryTimer = null;
let pdfDarkMode = false;
let pdfRenderMode = "adaptive";
let selectedPdfRelativePath = "";
const pdfViewPreviewWrites = new Set();
let remoteCompiledPdfRelativePath = "";
let remoteCompiledPdfBuffer = null;
let pdfSidebarVisible = false;
let minimapVisible = true;
let editorFullscreenActive = false;
let editorFullscreenSnapshot = null;
let textWrappingEnabled = true;
let spellCheckEnabled = false;
let selectionAgentChoice = "codex";
let remoteWorkspace = { user: "", host: "", path: "" };
let defaultGithubRemote = DEFAULT_GITHUB_REMOTE;
let hiddenBuiltInTemplates = [];
let projectViewMode = "grid";
let projectSortMode = "favorites";
let projectCollections = [];
let openProjectCollectionId = "";
let openleafTourStepIndex = -1;
let openleafTourOverlay = null;
let vimModeEnabled = false;
let vimModeState = "off";
let relativeLineNumbersEnabled = false;
let terminalSessions = [];
let activeTerminalId = null;
let splitTerminalIds = [];
let terminalFitTimer = null;
const AGENT_OUTPUT_IDLE_MS = 4000;
const AGENT_TURN_MINIMUM_MS = 6000;
let agentsLoadToken = 0;
let fileContextMenu = null;
let projectContextMenu = null;
let commandPaletteItems = [];
let commandPaletteActiveIndex = 0;
let copiedProjectItem = null;
let draggedTextTabPath = "";
let activeMediaFile = null;
const PPTX_EMU_PER_INCH = 914400;
const OPENLEAF_PRESENTATION_ELEMENT_MIME = "application/x-openleaf-presentation-element";
let activePresentation = null;
let activePresentationPdf = null;
let activePresentationThumbnailPdf = null;
let activePresentationSlideIndex = 0;
let selectedPresentationElement = null;
let presentationChangeMap = new Map();
let presentationElementBaselines = new Map();
let presentationDirty = false;
let presentationCollaborationTimer = null;
let presentationCollaborationBusy = false;
let presentationRenderToken = 0;
let presentationThumbnailToken = 0;
let presentationBackgroundRenderTask = null;
let presentationZoomRenderFrame = 0;
let presentationZoomAnchor = null;
let presentationCanvasScale = 1;
let presentationDragState = null;
let presentationSelectionScope = "canvas";
let presentationTextSelection = null;
let presentationSelectionInspectorFrame = 0;
let presentationSlideClipboard = null;
let presentationElementClipboard = null;
let presentationElementPasteCount = 0;
let presentationPasteShortcutAt = 0;
let presentationUndoStack = [];
let presentationRedoStack = [];
let presentationHistorySuspended = false;
let historyPanelOpen = false;
let sourceMinimapFrame = 0;
let sourceMinimapDragging = false;
let findHighlightMarks = [];
let lastFindQuery = "";
let aiProfile = {};
let selectionCodexText = "";
let selectionCodexTimer = null;
let spellIssueMarks = [];
let spellCheckTimer = null;
let spellContextMenu = null;
let historyEvents = [];
let historyCaptureTimer = null;
let lastHistoryText = "";
let historySelectedIndex = 0;
let selectedThemeCategory = "";
let lastPythonLayoutFileKey = "";
let activeFileRenameInput = null;
let activeFileCreation = null;
let selectedFileTreeNode = null;
let expandedFileFolders = new Set();
let pythonRunSequence = 0;
const pythonNotebookRuns = new Map();
const pythonRunningFiles = new Set();
let sshProjectResolve = null;
let sshAuthSession = null;
const pendingTerminalExits = new Map();

init();

async function init() {
  relativeLineNumbersEnabled = localStorage.getItem("latexStudioRelativeLineNumbers") === "true";
  hiddenBuiltInTemplates = readHiddenBuiltInTemplates();
  defineBibtexMode();
  if (historyPanel && historyPanel.parentElement !== document.body) document.body.appendChild(historyPanel);
  setupSettings();
  setupSourceEditor();
  setupTerminalPanel();
  setupPdfSpeech();
  wireEvents();
  await loadProjects();
  maybeStartOpenleafTour();
}

function defineBibtexMode() {
  if (!window.CodeMirror || CodeMirror.modes.bibtex) return;
  CodeMirror.defineMode("bibtex", () => ({
    startState: () => ({ inString: false }),
    token(stream, state) {
      if (stream.eatSpace()) return null;
      if (stream.peek() === "%") {
        stream.skipToEnd();
        return "comment";
      }
      if (!state.inString && stream.match(/@[A-Za-z]+/)) return "keyword";
      if (!state.inString && stream.match(/[A-Za-z_][\w-]*(?=\s*=)/)) return "variable-2";
      if (stream.peek() === "{" || stream.peek() === "}") {
        stream.next();
        return "bracket";
      }
      if (stream.peek() === "\"") {
        stream.next();
        state.inString = !state.inString;
        return "string";
      }
      if (state.inString) {
        stream.eatWhile(/[^"]/);
        return "string";
      }
      if (stream.match(/\d+/)) return "number";
      stream.next();
      return null;
    }
  }));
}

function setupSourceEditor() {
  editor = CodeMirror.fromTextArea(latexSource, {
    keyMap: vimModeEnabled ? "vim" : "default",
    mode: "stex",
    gutters: editorGutters(),
    lineNumbers: true,
    lineWrapping: textWrappingEnabled,
    indentUnit: 2,
    tabSize: 2,
    viewportMargin: 80,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    hintOptions: { hint: latexCompletionHint, completeSingle: false }
  });
  applyEditorKeyMap();
  installVisualLineVimKeys();
  installVimExCommands();

  editor.on("change", () => {
    if (isLoading || !activeProject) return;
    if (suppressSourceChange) {
      suppressSourceChange = false;
      return;
    }
    handleSourceChanged({ renderVisual: !visualEditor.hidden });
    updateRelativeLineNumbers();
    scheduleSpellGrammarCheck();
  });
  editor.on("scroll", () => {
    updateSourceMinimapViewport();
    positionSelectionCodexPopover();
  });
  editor.on("cursorActivity", () => {
    updateRelativeLineNumbers();
    updateVimModeIndicator();
    scheduleSelectionCodexPopover();
  });
  editor.on("inputRead", maybeShowLatexCompletion);
  editor.on("viewportChange", updateRelativeLineNumbers);
  editor.on("vim-mode-change", (event) => {
    vimModeState = String((event && event.mode) || "normal").toLowerCase();
    updateVimModeIndicator();
  });
  editor.getWrapperElement().addEventListener("contextmenu", handleEditorContextMenu);
  setupSourceMinimap();
  scheduleSourceMinimapUpdate();
  updateVimModeIndicator();
  scheduleSpellGrammarCheck();
}

function installVisualLineVimKeys() {
  if (window.CodeMirror && CodeMirror.Vim && !CodeMirror.Vim.__agentDeskDisplayLineKeys) {
    CodeMirror.Vim.mapCommand("j", "motion", "moveByDisplayLines", { forward: true }, {});
    CodeMirror.Vim.mapCommand("k", "motion", "moveByDisplayLines", { forward: false }, {});
    CodeMirror.Vim.__agentDeskDisplayLineKeys = true;
  }
}

function installVimExCommands() {
  if (!window.CodeMirror || !CodeMirror.Vim || CodeMirror.Vim.__openleafExCommands) return;

  CodeMirror.Vim.defineEx("write", "w", (_cm, params) => {
    if (!vimExAllowsBangOnly(params, "w")) return;
    void saveManuscript();
  });
  CodeMirror.Vim.defineEx("quit", "q", (_cm, params) => {
    void quitProjectFromVim(params);
  });
  CodeMirror.Vim.defineEx("wq", "wq", (_cm, params) => {
    void saveAndQuitProjectFromVim(params, "wq");
  });
  CodeMirror.Vim.defineEx("exit", "exit", (_cm, params) => {
    void saveAndQuitProjectFromVim(params, "exit");
  });
  CodeMirror.Vim.defineEx("xit", "x", (_cm, params) => {
    void saveAndQuitProjectFromVim(params, "x");
  });

  CodeMirror.Vim.__openleafExCommands = true;
}

function vimExAllowsBangOnly(params, command) {
  const argument = String((params && params.argString) || "").trim();
  if (!argument || argument === "!") return true;
  compileLog.textContent = `:${command} only accepts an optional ! suffix in Openleaf.`;
  return false;
}

async function quitProjectFromVim(params) {
  if (!vimExAllowsBangOnly(params, "q")) return false;
  const force = String((params && params.argString) || "").trim() === "!";
  return showProjects({ discardChanges: force });
}

async function saveAndQuitProjectFromVim(params, command) {
  if (!vimExAllowsBangOnly(params, command)) return false;
  const saved = await saveManuscript();
  if (!saved) return false;
  return showProjects();
}

function latexCompletionHint(cm) {
  const cursor = cm.getCursor();
  const line = cm.getLine(cursor.line) || "";
  let startCh = cursor.ch;
  while (startCh > 0 && /[A-Za-z*]/.test(line[startCh - 1])) startCh -= 1;
  if (startCh > 0 && line[startCh - 1] === "\\") startCh -= 1;
  const prefix = line.slice(startCh, cursor.ch).toLowerCase();
  const list = LATEX_COMPLETIONS
    .filter((item) => item.displayText.toLowerCase().startsWith(prefix) || item.text.toLowerCase().startsWith(prefix))
    .map((item) => ({
      text: item.text,
      displayText: item.displayText,
      className: item.className,
      hint(cmInstance, data, completion) {
        cmInstance.replaceRange(completion.text, data.from, data.to);
        const inserted = completion.text;
        const braceIndex = inserted.indexOf("{}");
        if (braceIndex >= 0) {
          const before = inserted.slice(0, braceIndex);
          const lineOffset = before.split("\n").length - 1;
          const chOffset = lineOffset ? before.split("\n").pop().length : before.length;
          cmInstance.setCursor({ line: data.from.line + lineOffset, ch: (lineOffset ? 0 : data.from.ch) + chOffset + 1 });
        }
      }
    }));
  return {
    list,
    from: CodeMirror.Pos(cursor.line, startCh),
    to: CodeMirror.Pos(cursor.line, cursor.ch)
  };
}

function maybeShowLatexCompletion(cm, change) {
  if (!window.CodeMirror || !CodeMirror.showHint || !change || !change.text) return;
  if (activeMediaFile || !visualEditor.hidden) return;
  const inserted = change.text.join("\n");
  if (inserted === "\\" || /^\\[A-Za-z]+$/.test(currentLatexPrefix(cm))) {
    CodeMirror.showHint(cm, latexCompletionHint, { completeSingle: false });
  }
}

function currentLatexPrefix(cm) {
  const cursor = cm.getCursor();
  const line = cm.getLine(cursor.line) || "";
  const left = line.slice(0, cursor.ch);
  const match = left.match(/\\[A-Za-z*]*$/);
  return match ? match[0] : "";
}

function setupSettings() {
  const savedPreset = normalizeThemePreset(localStorage.getItem("latexStudioThemePreset"));
  const preset = THEME_PRESETS[savedPreset];
  const savedTheme = (preset && preset.theme) || localStorage.getItem("latexStudioTheme") || "light";
  const savedAccent = (preset && preset.accent) || normalizeHexColor(localStorage.getItem("latexStudioAccent")) || DEFAULT_ACCENT;
  const showSidebar = localStorage.getItem("latexStudioShowSidebar") === "true";
  const fileWidth = clampNumber(Number(localStorage.getItem("latexStudioFileWidth")), MIN_FILE_WIDTH, MAX_FILE_WIDTH, DEFAULT_FILE_WIDTH);
  const fileOutlineHeight = clampNumber(Number(localStorage.getItem("latexStudioFileOutlineHeight")), MIN_FILE_OUTLINE_HEIGHT, MAX_FILE_OUTLINE_HEIGHT, DEFAULT_FILE_OUTLINE_HEIGHT);
  const fileOutlineCollapsed = localStorage.getItem("latexStudioFileOutlineCollapsed") === "true";
  const autoSaveEnabled = localStorage.getItem("latexStudioAutoSave") !== "false";
  const terminalHeight = clampNumber(Number(localStorage.getItem("latexStudioTerminalHeight")), MIN_TERMINAL_HEIGHT, MAX_TERMINAL_HEIGHT, DEFAULT_TERMINAL_HEIGHT);
  const terminalTabsWidth = clampNumber(Number(localStorage.getItem("latexStudioTerminalTabsWidth")), MIN_TERMINAL_TABS_WIDTH, MAX_TERMINAL_TABS_WIDTH, DEFAULT_TERMINAL_TABS_WIDTH);
  const terminalCollapsed = localStorage.getItem("latexStudioTerminalCollapsed") !== "false";
  const compileLogHeight = clampNumber(Number(localStorage.getItem("latexStudioCompileLogHeight")), MIN_COMPILE_LOG_HEIGHT, MAX_COMPILE_LOG_HEIGHT, DEFAULT_COMPILE_LOG_HEIGHT);
  const compileLogCollapsed = localStorage.getItem("latexStudioCompileLogCollapsed") !== "false";
  const sourceCollapsed = localStorage.getItem("latexStudioSourceCollapsed") === "true";
  const pdfCollapsed = localStorage.getItem("latexStudioPdfCollapsed") === "true";
  pdfZoom = clampNumber(Number(localStorage.getItem("latexStudioPdfZoom")), MIN_PDF_ZOOM, MAX_PDF_ZOOM, DEFAULT_PDF_ZOOM);
  pdfSidebarVisible = localStorage.getItem("latexStudioPdfSidebarVisible") === "true";
  pdfRenderMode = normalizePdfRenderMode(
    localStorage.getItem("latexStudioPdfRenderMode")
      || (localStorage.getItem("latexStudioPdfInvertPages") === "true" ? "invert" : "adaptive")
  );
  projectViewMode = localStorage.getItem("latexStudioProjectView") === "rows" ? "rows" : "grid";
  projectSortMode = normalizeProjectSortMode(localStorage.getItem("latexStudioProjectSort"));
  vimModeEnabled = localStorage.getItem("latexStudioVimMode") === "true";
  relativeLineNumbersEnabled = localStorage.getItem("latexStudioRelativeLineNumbers") === "true";
  minimapVisible = localStorage.getItem("latexStudioMinimapVisible") !== "false";
  textWrappingEnabled = localStorage.getItem("latexStudioTextWrapping") !== "false";
  spellCheckEnabled = localStorage.getItem("latexStudioSpellCheck") === "true";
  extraFeaturesEnabled = localStorage.getItem("openleafExtraFeaturesEnabled") === "true";
  selectionAgentChoice = normalizeAgentChoice(localStorage.getItem("latexStudioSelectionAgent"));
  remoteWorkspace = readRemoteWorkspace();
  defaultGithubRemote = readDefaultGithubRemote();
  aiProfile = readAiProfile();

  applyTheme(savedTheme, savedAccent, { presetId: savedPreset });
  syncSurfaceThemesToAppTheme(savedTheme, { persist: false });
  applyLayoutSettings({ showSidebar, fileWidth });
  setFileOutlineHeight(fileOutlineHeight, { persist: false });
  setFileOutlineCollapsed(fileOutlineCollapsed, { persist: false });
  applySourceLayout({ collapsed: sourceCollapsed });
  applyPdfPaneLayout({ collapsed: pdfCollapsed });
  applyTerminalLayout({ height: terminalHeight, collapsed: terminalCollapsed });
  setTerminalTabsWidth(terminalTabsWidth, { persist: false });
  applyCompileLogLayout({ height: compileLogHeight, collapsed: compileLogCollapsed });
  applyPdfSidebarVisibility({ persist: false });
  autoSaveToggle.checked = autoSaveEnabled;
  settingsVimModeToggle.checked = vimModeEnabled;
  settingsRelativeLineNumbersToggle.checked = relativeLineNumbersEnabled;
  settingsMinimapToggle.checked = minimapVisible;
  settingsTextWrappingToggle.checked = textWrappingEnabled;
  settingsSpellCheckToggle.checked = spellCheckEnabled;
  if (settingsExtraFeaturesToggle) settingsExtraFeaturesToggle.checked = extraFeaturesEnabled;
  settingsAgentChoice.value = selectionAgentChoice;
  applyExtraFeaturesSetting(extraFeaturesEnabled, { persist: false });
  updatePdfRenderModeButtons();
  populateProfileForm();
  populateRemoteForm();
  populateDefaultGithubForm();
  populateProjectSettingsForm();
  setSshConnectionState("disconnected");
  applyMinimapVisibility();
  applySpellCheckSetting();
  updateSaveButtonVisibility();
  updateProjectViewButtons();
  updateProjectSortControl();
  updatePdfZoomLabel();
  updateEditorFullscreenButton();
  updateProjectHeroGreeting({ rotate: true });
  renderThemeGallery();

  settingsThemePreset.addEventListener("change", () => {
    applyThemePreset(settingsThemePreset.value);
    renderPdf({ showLoading: false, preserveView: true });
  });

  settingsThemeToggle.addEventListener("change", () => {
    const nextTheme = settingsThemeToggle.checked ? "dark" : "light";
    const accent = normalizeHexColor(settingsAccentPicker.value) || DEFAULT_ACCENT;
    applyTheme(nextTheme, accent, { presetId: "custom" });
    syncSurfaceThemesToAppTheme(nextTheme);
    localStorage.setItem("latexStudioThemePreset", "custom");
    localStorage.setItem("latexStudioTheme", nextTheme);
    localStorage.setItem("latexStudioAccent", accent);
    renderPdf({ showLoading: false, preserveView: true });
  });

  settingsAccentPicker.addEventListener("input", () => {
    const accent = normalizeHexColor(settingsAccentPicker.value) || DEFAULT_ACCENT;
    const theme = document.body.dataset.theme || "light";
    applyTheme(theme, accent, { presetId: "custom" });
    localStorage.setItem("latexStudioThemePreset", "custom");
    localStorage.setItem("latexStudioTheme", theme);
    localStorage.setItem("latexStudioAccent", accent);
  });

  settingsFileSidebarToggle.addEventListener("change", () => {
    setFileSidebarVisible(settingsFileSidebarToggle.checked);
  });

  settingsPdfRenderModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      pdfRenderMode = normalizePdfRenderMode(button.dataset.pdfRenderMode);
      localStorage.setItem("latexStudioPdfRenderMode", pdfRenderMode);
      updatePdfRenderModeButtons();
      renderPdf({ showLoading: false });
      if (projectScreen && !projectScreen.hidden) renderProjectGrid();
    });
  });

  settingsVimModeToggle.addEventListener("change", () => {
    setVimMode(settingsVimModeToggle.checked);
  });

  settingsRelativeLineNumbersToggle.addEventListener("change", () => {
    setRelativeLineNumbers(settingsRelativeLineNumbersToggle.checked);
  });

  settingsMinimapToggle.addEventListener("change", () => {
    setMinimapVisible(settingsMinimapToggle.checked);
  });

  settingsTextWrappingToggle.addEventListener("change", () => {
    setTextWrapping(settingsTextWrappingToggle.checked);
  });

  settingsSpellCheckToggle.addEventListener("change", () => {
    spellCheckEnabled = settingsSpellCheckToggle.checked;
    localStorage.setItem("latexStudioSpellCheck", String(spellCheckEnabled));
    applySpellCheckSetting();
  });

  if (settingsExtraFeaturesToggle) {
    settingsExtraFeaturesToggle.addEventListener("change", () => {
      applyExtraFeaturesSetting(settingsExtraFeaturesToggle.checked);
    });
  }

  settingsAgentChoice.addEventListener("change", () => {
    selectionAgentChoice = normalizeAgentChoice(settingsAgentChoice.value);
    settingsAgentChoice.value = selectionAgentChoice;
    localStorage.setItem("latexStudioSelectionAgent", selectionAgentChoice);
  });

  autoSaveToggle.addEventListener("change", () => {
    localStorage.setItem("latexStudioAutoSave", String(autoSaveToggle.checked));
    updateSaveButtonVisibility();

    if (autoSaveToggle.checked) scheduleAutoSave();
    else clearTimeout(autoSaveTimer);
  });

  settingsSearchInput.addEventListener("input", updateSettingsSearch);

  settingsNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.dataset.settingsSection) return;
      clearSettingsSearch();
      setSettingsPanel(button.dataset.settingsSection);
    });
  });
  reloadAgentsButton.addEventListener("click", loadAgentsFile);
  saveAgentsButton.addEventListener("click", saveAgentsFile);
  saveRemoteButton.addEventListener("click", saveRemoteWorkspace);
  openRemoteTerminalButton.addEventListener("click", () => {
    saveRemoteWorkspace();
    createTerminalSession("ssh");
  });
  if (defaultGithubRemoteInput) defaultGithubRemoteInput.addEventListener("input", saveDefaultGithubRemote);
  if (saveProjectSettingsButton) saveProjectSettingsButton.addEventListener("click", saveProjectSettings);
  if (pullProjectGithubButton) pullProjectGithubButton.addEventListener("click", pullActiveProjectFromGithub);
  if (closeSshProjectButton) closeSshProjectButton.addEventListener("click", () => closeSshProjectPanel());
  if (cancelSshProjectButton) cancelSshProjectButton.addEventListener("click", () => closeSshProjectPanel());
  if (connectSshProjectButton) connectSshProjectButton.addEventListener("click", connectSshProject);
  if (sshKnownHostSelect) {
    sshKnownHostSelect.addEventListener("change", () => {
      if (!sshKnownHostSelect.value) return;
      const parsed = splitRemoteHost(sshKnownHostSelect.value);
      if (sshProjectUserInput && parsed.user) sshProjectUserInput.value = parsed.user;
      if (sshProjectHostInput) sshProjectHostInput.value = parsed.host;
    });
  }
  agentsEditor.addEventListener("input", () => {
    if (!activeProject) return;
    agentsStatus.textContent = "Unsaved AGENTS.md changes.";
    setStatusClass(agentsStatus);
  });
  [profileNameInput, profileEmailInput, profileWorkInput, profileBioInput, profileAiContextInput].forEach((input) => {
    input.addEventListener("input", saveProfileFromForm);
  });
}

function applyThemePreset(presetId) {
  const normalizedPreset = normalizeThemePreset(presetId);
  const preset = THEME_PRESETS[normalizedPreset];

  if (!preset) {
    const theme = document.body.dataset.theme || "light";
    const accent = normalizeHexColor(settingsAccentPicker.value) || DEFAULT_ACCENT;
    applyTheme(theme, accent, { presetId: "custom" });
    syncSurfaceThemesToAppTheme(theme);
    localStorage.setItem("latexStudioThemePreset", "custom");
    localStorage.setItem("latexStudioTheme", theme);
    localStorage.setItem("latexStudioAccent", accent);
    return;
  }

  applyTheme(preset.theme, preset.accent, { presetId: normalizedPreset });
  syncSurfaceThemesToAppTheme(preset.theme);
  localStorage.setItem("latexStudioThemePreset", normalizedPreset);
  localStorage.setItem("latexStudioTheme", preset.theme);
  localStorage.setItem("latexStudioAccent", preset.accent);
}

function updateThemeGallerySelection() {
  if (!settingsThemeGallery) return;
  const selected = document.body.dataset.themePreset || "custom";
  settingsThemeGallery.querySelectorAll("[data-theme-card]").forEach((card) => {
    const active = card.dataset.themeCard === selected;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", String(active));
  });
}

function themeCategoryLabel(label) {
  return String(label || "")
    .replace("Light High Contrast", "Light Contrast")
    .replace("Dark High Contrast", "Dark Contrast");
}

function themeCategoryForPreset(presetId) {
  const option = Array.from(settingsThemePreset?.querySelectorAll("optgroup option") || [])
    .find((candidate) => candidate.value === presetId);
  return option?.parentElement?.label || "";
}

function renderThemeGallery() {
  if (!settingsThemeGallery || !settingsThemePreset || !settingsThemeCategoryBar) return;
  const groups = Array.from(settingsThemePreset.querySelectorAll("optgroup"));
  const availableCategories = groups.map((group) => group.label);
  if (!availableCategories.includes(selectedThemeCategory)) {
    selectedThemeCategory = themeCategoryForPreset(document.body.dataset.themePreset) || availableCategories[0] || "";
  }

  settingsThemeCategoryBar.replaceChildren();
  groups.forEach((group) => {
    const button = document.createElement("button");
    const active = group.label === selectedThemeCategory;
    button.type = "button";
    button.className = `theme-category-button${active ? " active" : ""}`;
    button.dataset.themeCategory = group.label;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(active));
    button.textContent = themeCategoryLabel(group.label);
    button.addEventListener("click", () => {
      selectedThemeCategory = group.label;
      renderThemeGallery();
    });
    settingsThemeCategoryBar.appendChild(button);
  });

  settingsThemeGallery.replaceChildren();
  groups.filter((group) => group.label === selectedThemeCategory).forEach((group) => {
    const section = document.createElement("section");
    section.className = "theme-gallery-section";
    const grid = document.createElement("div");
    grid.className = "theme-card-grid";

    Array.from(group.querySelectorAll("option")).forEach((option) => {
      const preset = THEME_PRESETS[option.value];
      if (!preset) return;
      const colors = preset.colors || {};
      const card = document.createElement("button");
      card.type = "button";
      card.className = "theme-card";
      card.dataset.themeCard = option.value;
      card.setAttribute("aria-label", `Use ${option.textContent} theme`);
      card.style.setProperty("--theme-card-accent", preset.accent || colors["--blue"] || DEFAULT_ACCENT);
      card.style.setProperty("--theme-card-surface", colors["--cm-bg"] || colors["--panel"] || colors["--bg"] || "#ffffff");
      card.style.setProperty("--theme-card-border", colors["--border-strong"] || colors["--border"] || "#94a3b8");
      card.innerHTML = `
        <span class="theme-card-circle" aria-hidden="true"></span>
        <span class="theme-card-copy">
          <strong>${escapeHtml(option.textContent)}</strong>
        </span>
        <span class="theme-card-check" aria-hidden="true">✓</span>
      `;
      card.addEventListener("click", () => {
        applyThemePreset(option.value);
        renderPdf({ showLoading: false, preserveView: true });
      });
      grid.appendChild(card);
    });
    section.append(grid);
    settingsThemeGallery.appendChild(section);
  });
  updateThemeGallerySelection();
}

function applyTheme(theme, accent, { presetId = "custom" } = {}) {
  const normalizedPreset = normalizeThemePreset(presetId);
  const preset = THEME_PRESETS[normalizedPreset];
  const normalizedTheme = (preset && preset.theme) || (theme === "dark" ? "dark" : "light");
  const normalizedAccent = normalizeHexColor((preset && preset.accent) || accent) || DEFAULT_ACCENT;
  const rgb = hexToRgb(normalizedAccent);

  document.body.dataset.theme = normalizedTheme;
  document.body.dataset.themePreset = normalizedPreset;
  document.body.dataset.contrast = HIGH_CONTRAST_PRESETS.has(normalizedPreset) ? "high" : "normal";
  document.body.classList.toggle("high-contrast", HIGH_CONTRAST_PRESETS.has(normalizedPreset));
  document.body.classList.toggle("transparent-theme", TRANSPARENT_PRESETS.has(normalizedPreset));
  document.documentElement.style.setProperty("--accent", normalizedAccent);
  document.documentElement.style.setProperty("--accent-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  document.body.style.setProperty("--accent", normalizedAccent);
  document.body.style.setProperty("--accent-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  applyThemeVariables(preset);

  settingsThemePreset.value = normalizedPreset;
  updateThemeGallerySelection();
  settingsThemeToggle.checked = normalizedTheme === "dark";
  settingsAccentPicker.value = normalizedAccent;
  sourcePane.dataset.terminalTheme = resolvedTerminalTheme();
  if (presentationScreen) presentationScreen.dataset.terminalTheme = resolvedTerminalTheme();
  compileLogPanel.dataset.logTheme = resolvedCompileLogTheme();
  refreshTerminalThemes();
  scheduleSourceMinimapUpdate();
  updateVimModeIndicator();
}

function syncSurfaceThemesToAppTheme(theme, { persist = true } = {}) {
  const mode = theme === "dark" ? "dark" : "light";
  pdfDarkMode = mode === "dark";

  sourcePane.dataset.terminalTheme = mode;
  if (presentationScreen) presentationScreen.dataset.terminalTheme = mode;
  compileLogPanel.dataset.logTheme = mode;
  applyPdfRenderMode();
  refreshTerminalThemes();
  if (projectScreen && !projectScreen.hidden) renderProjectGrid();

  if (persist) {
    localStorage.setItem("latexStudioPdfDarkMode", String(pdfDarkMode));
  }
}

function applyThemeVariables(preset) {
  const presetColors = (preset && preset.colors) || {};
  const presetDark = Boolean(preset && preset.theme === "dark");
  const presetAccentRgb = hexToRgb((preset && preset.accent) || DEFAULT_ACCENT);
  const derivedColors = preset
    ? {
        "--cm-bg": presetDark ? presetColors["--bg"] : "#ffffff",
        "--cm-gutter": presetDark ? presetColors["--glass-strong"] || presetColors["--panel"] : "#f3f4f6",
        "--cm-text": presetColors["--text"],
        "--cm-keyword": presetColors["--red"] || presetColors["--blue"],
        "--cm-variable": presetColors["--blue"],
        "--cm-atom": presetColors["--green"],
        "--cm-comment": presetColors["--muted"],
        "--cm-string": presetColors["--green"],
        "--cm-number": presetColors["--red"],
        "--pdf-bg": presetColors["--pdf-bg"] || (presetDark ? presetColors["--bg"] : presetColors["--page"] || "#f3f4f6"),
        "--pdf-paper": presetColors["--pdf-paper"] || presetColors["--page"] || "#ffffff",
        "--pdf-page-filter": presetColors["--pdf-page-filter"] || (presetDark ? "invert(0.86) hue-rotate(180deg) contrast(0.9) brightness(1.12)" : "none"),
        "--pdf-dark-bg": presetColors["--pdf-dark-bg"] || presetColors["--pdf-bg"] || presetColors["--bg"] || "#1f2937",
        "--pdf-dark-paper": presetColors["--pdf-dark-paper"] || presetColors["--cm-bg"] || presetColors["--panel"] || presetColors["--bg"] || "#111827",
        "--pdf-dark-filter": presetColors["--pdf-dark-filter"] || "invert(0.86) hue-rotate(180deg) contrast(0.88) brightness(1.16)",
        "--terminal-bg": presetDark
          ? (presetColors["--cm-bg"] || presetColors["--bg"] || "#111827")
          : (presetColors["--cm-bg"] || presetColors["--page"] || "#ffffff"),
        "--terminal-header-bg": presetDark
          ? (presetColors["--panel"] || presetColors["--bg"] || "#111827")
          : (presetColors["--panel"] || presetColors["--page"] || "#ffffff"),
        "--terminal-text": presetColors["--cm-text"] || presetColors["--text"],
        "--terminal-muted": presetColors["--muted"],
        "--terminal-selection": `rgba(${presetAccentRgb.r}, ${presetAccentRgb.g}, ${presetAccentRgb.b}, 0.2)`
      }
    : {};

  THEME_VARIABLES.forEach((name) => {
    const value = presetColors[name] || derivedColors[name];
    if (value) {
      document.documentElement.style.setProperty(name, value);
      document.body.style.setProperty(name, value);
    } else {
      document.documentElement.style.removeProperty(name);
      document.body.style.removeProperty(name);
    }
  });

  if (preset && preset.background) document.body.style.background = preset.background;
  else document.body.style.removeProperty("background");
}

function readAiProfile() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || "{}");
    return normalizeAiProfile(parsed);
  } catch (error) {
    return {};
  }
}

function readRemoteWorkspace() {
  try {
    const parsed = JSON.parse(localStorage.getItem(REMOTE_STORAGE_KEY) || "{}");
    return normalizeRemoteWorkspace(parsed);
  } catch (error) {
    return { user: "", host: "", path: "" };
  }
}

function normalizeRemoteWorkspace(value) {
  const parsedHost = splitRemoteHost(value && (value.host || value.server));
  return {
    user: String(value && value.user ? value.user : parsedHost.user).trim(),
    host: String(parsedHost.host).trim(),
    path: String(value && value.path ? value.path : "").trim(),
    controlPath: String(value && value.controlPath ? value.controlPath : "").trim()
  };
}

function splitRemoteHost(value = "") {
  const raw = String(value || "").trim();
  const at = raw.lastIndexOf("@");
  if (at > 0) return { user: raw.slice(0, at), host: raw.slice(at + 1) };
  return { user: "", host: raw };
}

function remoteWorkspaceLabel(remote = remoteWorkspace) {
  const normalized = normalizeRemoteWorkspace(remote);
  const target = normalized.user ? `${normalized.user}@${normalized.host}` : normalized.host;
  return normalized.path ? `${target}:${normalized.path}` : target;
}

function setSshConnectionState(state = "disconnected", message = "") {
  if (!sshConnectionBadge) return;
  const connected = state === "connected";
  const connecting = state === "connecting";
  const visible = connected || connecting || Boolean(message);
  const stateLabel = message || (connected
    ? "SSH connected"
    : connecting
      ? "SSH connecting"
      : "SSH disconnected");
  const targetLabel = connected ? remoteWorkspaceLabel(remoteWorkspace) : "";
  sshConnectionBadge.hidden = !visible;
  sshConnectionBadge.dataset.state = state;
  sshConnectionBadge.title = targetLabel ? `${stateLabel}: ${targetLabel}` : stateLabel;
  sshConnectionBadge.setAttribute("aria-label", sshConnectionBadge.title);
}

function isRemoteProject() {
  return Boolean(activeProject && activeProject.remote);
}

function normalizeRelativeDocumentPath(value = "") {
  return String(value || "").replace(/^\/+/, "");
}

function clearRemoteCompiledPdf() {
  remoteCompiledPdfRelativePath = "";
  remoteCompiledPdfBuffer = null;
}

function rememberRemoteCompiledPdf(result = {}) {
  const relativePath = normalizeRelativeDocumentPath(result.compiledPdfRelativePath || "");
  if (!relativePath || !result.pdf) {
    clearRemoteCompiledPdf();
    return;
  }
  remoteCompiledPdfRelativePath = relativePath;
  remoteCompiledPdfBuffer = result.pdf;
}

function remotePdfBufferForRender(relativePath = "") {
  const requestedPath = normalizeRelativeDocumentPath(relativePath);
  if (remoteCompiledPdfBuffer && requestedPath && requestedPath === remoteCompiledPdfRelativePath) {
    return remoteCompiledPdfBuffer;
  }
  if (remoteCompiledPdfBuffer && !requestedPath && remoteCompiledPdfRelativePath) {
    return remoteCompiledPdfBuffer;
  }
  return null;
}

function readDefaultGithubRemote() {
  return String(localStorage.getItem(DEFAULT_GITHUB_STORAGE_KEY) || DEFAULT_GITHUB_REMOTE).trim() || DEFAULT_GITHUB_REMOTE;
}

function populateDefaultGithubForm() {
  if (!defaultGithubRemoteInput) return;
  defaultGithubRemoteInput.value = defaultGithubRemote || DEFAULT_GITHUB_REMOTE;
}

function saveDefaultGithubRemote() {
  if (!defaultGithubRemoteInput) return;
  defaultGithubRemote = defaultGithubRemoteInput.value.trim() || DEFAULT_GITHUB_REMOTE;
  localStorage.setItem(DEFAULT_GITHUB_STORAGE_KEY, defaultGithubRemote);
}

function normalizeAgentChoice(value) {
  return ["codex", "claude", "shell"].includes(value) ? value : "codex";
}

function normalizeAiProfile(profile) {
  return {
    name: String(profile.name || "").trim(),
    email: String(profile.email || "").trim(),
    work: String(profile.work || "").trim(),
    bio: String(profile.bio || "").trim(),
    aiContext: String(profile.aiContext || "").trim()
  };
}

function populateProfileForm() {
  profileNameInput.value = aiProfile.name || "";
  profileEmailInput.value = aiProfile.email || "";
  profileWorkInput.value = aiProfile.work || "";
  profileBioInput.value = aiProfile.bio || "";
  profileAiContextInput.value = aiProfile.aiContext || "";
}

function populateRemoteForm() {
  if (remoteHostInput) remoteHostInput.value = remoteWorkspace.user ? `${remoteWorkspace.user}@${remoteWorkspace.host}` : remoteWorkspace.host || "";
  if (remotePathInput) remotePathInput.value = remoteWorkspace.path || "";
}

function populateProjectSettingsForm() {
  if (!projectGithubRemoteInput || !projectSettingsStatus) return;
  const remote = activeProject && activeProject.githubRemote ? activeProject.githubRemote : "";
  projectGithubRemoteInput.value = remote;
  projectSettingsStatus.textContent = activeProject
    ? (remote ? `Project GitHub is set to ${remote}.` : "")
    : "";
  setStatusClass(projectSettingsStatus, remote ? "ok" : undefined);
}

async function saveProjectSettings() {
  if (!activeProject || !window.localOverleaf || !window.localOverleaf.saveProjectSettings) return;
  const githubRemote = projectGithubRemoteInput.value.trim();
  projectSettingsStatus.textContent = "Saving project settings...";
  setStatusClass(projectSettingsStatus);

  try {
    const result = await window.localOverleaf.saveProjectSettings(activeProject.id, { githubRemote });
    activeProject = result.project || activeProject;
    populateProjectSettingsForm();
  } catch (error) {
    projectSettingsStatus.textContent = formatError(error);
    setStatusClass(projectSettingsStatus, "error");
  }
}

function saveRemoteWorkspace() {
  const parsedHost = splitRemoteHost(remoteHostInput.value);
  remoteWorkspace = normalizeRemoteWorkspace({
    user: parsedHost.user,
    host: parsedHost.host,
    path: remotePathInput.value
  });
  localStorage.setItem(REMOTE_STORAGE_KEY, JSON.stringify(remoteWorkspace));
  remoteStatus.textContent = remoteWorkspace.host
    ? `Saved SSH target ${remoteWorkspaceLabel(remoteWorkspace)}.`
    : "Remote target cleared.";
  setStatusClass(remoteStatus, remoteWorkspace.host ? "ok" : undefined);
}

async function populateSshKnownHosts() {
  if (!sshKnownHostSelect) return [];
  let hosts = [];
  try {
    if (window.localOverleaf && window.localOverleaf.listSshHosts) {
      const result = await window.localOverleaf.listSshHosts();
      hosts = Array.isArray(result.hosts) ? result.hosts : [];
    }
  } catch (error) {
    hosts = [];
  }

  const savedTarget = remoteWorkspace.host
    ? (remoteWorkspace.user ? `${remoteWorkspace.user}@${remoteWorkspace.host}` : remoteWorkspace.host)
    : "";
  const uniqueHosts = Array.from(new Set([savedTarget, ...hosts].filter(Boolean))).slice(0, 24);
  sshKnownHostSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = uniqueHosts.length ? "Choose a known host..." : "No known hosts found";
  sshKnownHostSelect.appendChild(placeholder);
  uniqueHosts.forEach((host) => {
    const option = document.createElement("option");
    option.value = host;
    option.textContent = host;
    sshKnownHostSelect.appendChild(option);
  });
  sshKnownHostSelect.disabled = !uniqueHosts.length;
  return uniqueHosts;
}

async function openSshProjectFlow({ startTerminal = true } = {}) {
  if (!sshProjectPanel) return null;
  cleanupSshAuthSession();
  closeCommandPalette({ keepBackdrop: true });
  closeSettings({ keepBackdrop: true });
  closeNewProjectPanel({ keepBackdrop: true });
  closeTemplatesPanel({ keepBackdrop: true });
  settingsBackdrop.hidden = false;
  sshProjectPanel.hidden = false;
  sshProjectPanel.dataset.startTerminal = String(Boolean(startTerminal));
  if (sshProjectStatus) sshProjectStatus.textContent = "";
  if (sshAuthTerminalShell) sshAuthTerminalShell.hidden = true;
  if (sshAuthTerminal) sshAuthTerminal.innerHTML = "";
  if (sshProjectUserInput) sshProjectUserInput.value = remoteWorkspace.user || "";
  if (sshProjectHostInput) sshProjectHostInput.value = remoteWorkspace.host || "";
  if (sshProjectPathInput) sshProjectPathInput.value = remoteWorkspace.path || "~";
  await populateSshKnownHosts();
  requestAnimationFrame(() => {
    if (sshProjectUserInput) sshProjectUserInput.focus();
  });

  return new Promise((resolve) => {
    sshProjectResolve = resolve;
  });
}

function closeSshProjectPanel({ keepBackdrop = false, value = null } = {}) {
  cleanupSshAuthSession();
  if (sshProjectPanel) sshProjectPanel.hidden = true;
  if (sshProjectResolve) {
    const resolve = sshProjectResolve;
    sshProjectResolve = null;
    resolve(value);
  }
  if (!keepBackdrop) updateOverlayBackdrop();
}

async function connectSshProject() {
  const user = String(sshProjectUserInput && sshProjectUserInput.value ? sshProjectUserInput.value : "").trim();
  const host = String(sshProjectHostInput && sshProjectHostInput.value ? sshProjectHostInput.value : "").trim();
  const remotePath = String(sshProjectPathInput && sshProjectPathInput.value ? sshProjectPathInput.value : "").trim() || "~";
  if (!host) {
    if (sshProjectStatus) {
      sshProjectStatus.textContent = "Enter a server first.";
      setStatusClass(sshProjectStatus, "error");
    }
    return;
  }

  const pendingRemote = normalizeRemoteWorkspace({ user, host, path: remotePath });
  const shouldStartTerminal = sshProjectPanel && sshProjectPanel.dataset.startTerminal !== "false";

  if (sshProjectStatus) {
    sshProjectStatus.textContent = "Authenticating SSH connection...";
    setStatusClass(sshProjectStatus);
  }
  setSshConnectionState("connecting", "SSH connecting");
  if (connectSshProjectButton) connectSshProjectButton.disabled = true;

  try {
    await runSshAuthentication(pendingRemote);
    if (sshProjectStatus) {
      sshProjectStatus.textContent = "SSH authentication succeeded. Verifying remote path...";
      setStatusClass(sshProjectStatus);
    }
    const verification = await window.localOverleaf.verifySshConnection(pendingRemote);
    remoteWorkspace = normalizeRemoteWorkspace({
      ...pendingRemote,
      ...((verification && verification.remote) || {}),
      path: verification && verification.root ? verification.root : pendingRemote.path
    });
    localStorage.setItem(REMOTE_STORAGE_KEY, JSON.stringify(remoteWorkspace));
    populateRemoteForm();
    setSshConnectionState("connected");
    if (sshProjectStatus) {
      sshProjectStatus.textContent = `Connected to ${remoteWorkspaceLabel(remoteWorkspace)}.`;
      setStatusClass(sshProjectStatus, "ok");
    }
    closeSshProjectPanel({ value: remoteWorkspace });
    await openVerifiedRemoteWorkspace({ startTerminal: shouldStartTerminal });
  } catch (error) {
    setSshConnectionState("error", "SSH failed");
    if (sshProjectStatus) {
      sshProjectStatus.textContent = formatSshConnectionError(error, pendingRemote);
      setStatusClass(sshProjectStatus, "error");
    }
  } finally {
    if (connectSshProjectButton) connectSshProjectButton.disabled = false;
  }
}

function formatSshConnectionError(error, remote = {}) {
  const message = formatError(error);
  const remotePath = String(remote.path || "").trim();
  const looksRelativeLinuxPath = remotePath && !remotePath.startsWith("/") && !remotePath.startsWith("~") && remotePath.includes("/");
  if (/Remote path is not a directory/i.test(message) && looksRelativeLinuxPath) {
    return `${message}\nTip: Linux paths like /mnt/shared/... need the leading slash.`;
  }
  return message;
}

async function runSshAuthentication(remote) {
  if (!window.localOverleaf || !window.Terminal || !window.FitAddon || !sshAuthTerminal || !sshAuthTerminalShell) return;
  cleanupSshAuthSession();
  sshAuthTerminalShell.hidden = false;
  sshAuthTerminal.innerHTML = "";

  const descriptor = await window.localOverleaf.createTerminal(null, "ssh-auth", { remote });
  const term = new Terminal({
    allowProposedApi: false,
    convertEol: true,
    cursorBlink: true,
    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
    fontSize: 12,
    lineHeight: 1.25,
    rows: 8,
    scrollback: 500,
    theme: terminalTheme()
  });
  const fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  term.open(sshAuthTerminal);
  term.onData((data) => window.localOverleaf.writeTerminal(descriptor.id, data));
  term.onResize(({ cols, rows }) => window.localOverleaf.resizeTerminal(descriptor.id, cols, rows));
  term.writeln(`\x1b[38;5;214m${descriptor.commandLabel}\x1b[0m`);

  const exitResult = await new Promise((resolve) => {
    sshAuthSession = { id: descriptor.id, term, fitAddon, exited: false, resolve };
    requestAnimationFrame(() => {
      fitAddon.fit();
      sshAuthTerminal.focus();
    });
    if (pendingTerminalExits.has(descriptor.id)) {
      const pendingExit = pendingTerminalExits.get(descriptor.id);
      pendingTerminalExits.delete(descriptor.id);
      resolve(pendingExit);
    }
  });

  if (Number(exitResult && exitResult.code) !== 0) {
    throw new Error("SSH authentication did not complete. Check the prompt above and try again.");
  }
}

function cleanupSshAuthSession() {
  if (sshAuthSession && !sshAuthSession.exited && window.localOverleaf) {
    window.localOverleaf.killTerminal(sshAuthSession.id).catch(() => {});
  }
  if (sshAuthSession && sshAuthSession.term) {
    try {
      sshAuthSession.term.dispose();
    } catch (error) {
    }
  }
  sshAuthSession = null;
}

async function openVerifiedRemoteWorkspace({ startTerminal = true } = {}) {
  setSshConnectionState("connected");
  resetTextTabs();
  selectedPdfRelativePath = "";
  clearRemoteCompiledPdf();
  projectFiles = [];
  editor.setValue("");
  activeProject = {
    id: `remote:${remoteWorkspaceLabel(remoteWorkspace)}`,
    name: `SSH ${remoteWorkspace.host}`,
    texName: "remote",
    folderName: remoteWorkspace.path || "~",
    remote: true
  };
  showEditorShell();
  activeDocumentTitle.textContent = `SSH: ${remoteWorkspaceLabel(remoteWorkspace)}`;
  pdfTitle.textContent = "SSH workspace";
  pdfMeta.textContent = remoteWorkspace.path || remoteWorkspace.host;
  pdfViewer.innerHTML = '<div class="pdf-loading">Remote workspace. Open a TeX file to compile it locally.</div>';
  fileTree.innerHTML = '<div class="file-message">Loading remote files...</div>';
  setFileSidebarVisible(true, { persist: false });
  setTerminalCollapsed(false, { persist: false });
  setCompileLogCollapsed(true, { persist: false });
  await new Promise((resolve) => setTimeout(resolve, 120));
  await loadProjectFiles();
  if (startTerminal) {
    const session = await createTerminalSession("ssh");
    if (session) compileLog.textContent = `Connected to ${remoteWorkspaceLabel(remoteWorkspace)}.`;
  }
}

function saveProfileFromForm() {
  aiProfile = normalizeAiProfile({
    name: profileNameInput.value,
    email: profileEmailInput.value,
    work: profileWorkInput.value,
    bio: profileBioInput.value,
    aiContext: profileAiContextInput.value
  });
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(aiProfile));
  updateProjectHeroGreeting();
}

function greetingAllowedForHour(greeting, hour) {
  const normalized = String(greeting || "").toLowerCase();
  if (normalized.includes("night owl")) return hour < 5 || hour >= 22;
  if (normalized.includes("how was your day")) return hour >= 16;
  if (normalized.startsWith("good morning")) return hour >= 5 && hour < 12;
  if (normalized.startsWith("good afternoon")) return hour >= 12 && hour < 17;
  if (normalized.startsWith("good evening") || normalized.startsWith("evening")) return hour >= 17 && hour < 22;
  return true;
}

function updateProjectHeroGreeting({ rotate = false } = {}) {
  if (!projectHeroTitle) return;
  const firstName = String(aiProfile.name || "").trim().split(/\s+/)[0] || "";
  projectHeroTitle.hidden = !firstName;
  projectHeroTitle.style.display = firstName ? "" : "none";
  if (!firstName) return;
  const now = new Date();
  const hour = now.getHours();
  const bucket = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
  const timeGreetings = PROJECT_TIME_GREETINGS[bucket] || PROJECT_TIME_GREETINGS.morning;
  const greetings = firstName ? timeGreetings.named : timeGreetings.anonymous;
  const storageKey = firstName ? `latexStudioGreetingIndex:${firstName.toLowerCase()}` : "latexStudioGreetingIndex";
  let index = clampNumber(Number(localStorage.getItem(storageKey)), 0, greetings.length - 1, 0);
  if (rotate) {
    index = (index + 1) % greetings.length;
    localStorage.setItem(storageKey, String(index));
  }
  projectHeroTitle.textContent = (greetings[index] || "Hello!").replace("{name}", firstName);
}

function profilePromptContext() {
  const rows = [
    ["Name", aiProfile.name],
    ["Email", aiProfile.email],
    ["Type of work", aiProfile.work],
    ["Bio", aiProfile.bio],
    ["AI context", aiProfile.aiContext]
  ].filter(([, value]) => String(value || "").trim());

  if (!rows.length) return "";
  return [
    "User profile context:",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Use this profile only as background context for tone, domain, and preferences."
  ].join("\n");
}

function withProfileContext(prompt) {
  const context = profilePromptContext();
  return context ? `${context}\n\nUser request:\n${prompt}` : prompt;
}

function applyLayoutSettings({ showSidebar, pdfMinWidth = DEFAULT_PDF_MIN_WIDTH, fileWidth = getFileSidebarWidth() }) {
  workspace.classList.toggle("files-hidden", !showSidebar);
  fileRail.hidden = showSidebar;
  settingsFileSidebarToggle.checked = showSidebar;
  workspace.style.setProperty("--pdf-min-width", `${pdfMinWidth}px`);
  workspace.style.setProperty("--file-width", `${fileWidth}px`);
}

function applyMinimapVisibility() {
  if (!sourceMinimap) return;
  sourceMinimap.hidden = !minimapVisible || isIpynbFile() || !visualEditor.hidden || Boolean(mediaViewer && !mediaViewer.hidden);
  if (sourceMinimap.hidden) workspace.classList.add("minimap-hidden");
  else workspace.classList.remove("minimap-hidden");
  updateMinimapToggleButton();
  if (editor) requestAnimationFrame(() => editor.refresh());
  scheduleSourceMinimapUpdate();
}

function updateMinimapToggleButton() {
  if (!minimapToggleButton) return;
  const label = minimapVisible ? "Hide minimap" : "Show minimap";
  minimapToggleButton.setAttribute("aria-label", label);
  minimapToggleButton.setAttribute("title", label);
  minimapToggleButton.setAttribute("aria-pressed", String(minimapVisible));
  minimapToggleButton.classList.toggle("active", minimapVisible);
}

function setMinimapVisible(visible) {
  minimapVisible = Boolean(visible);
  settingsMinimapToggle.checked = minimapVisible;
  localStorage.setItem("latexStudioMinimapVisible", String(minimapVisible));
  applyMinimapVisibility();
}

function updateEditorFullscreenButton() {
  if (!editorFullscreenButton) return;
  const label = editorFullscreenActive ? "Exit editor fullscreen" : "Enter editor fullscreen";
  editorFullscreenButton.setAttribute("aria-label", label);
  editorFullscreenButton.setAttribute("title", label);
  editorFullscreenButton.setAttribute("aria-pressed", String(editorFullscreenActive));
  editorFullscreenButton.classList.toggle("active", editorFullscreenActive);
}

function refreshEditorFullscreenLayout() {
  requestAnimationFrame(() => {
    if (editor) editor.refresh();
    scheduleSourceMinimapUpdate();
    updateSourceMinimapViewport();
    scheduleTerminalFit();
  });
}

function setEditorFullscreen(active) {
  const next = Boolean(active);
  if (next === editorFullscreenActive) {
    updateEditorFullscreenButton();
    return;
  }

  if (next) {
    editorFullscreenSnapshot = {
      showSidebar: !workspace.classList.contains("files-hidden"),
      fileWidth: getFileSidebarWidth(),
      sourceCollapsed: workspace.classList.contains("source-hidden"),
      pdfCollapsed: workspace.classList.contains("pdf-hidden"),
      terminalCollapsed: sourcePane.classList.contains("terminal-collapsed"),
      terminalMaximized: sourcePane.classList.contains("terminal-maximized"),
      compileLogCollapsed: compileLogPanel.classList.contains("log-collapsed"),
      compileLogMaximized: previewPane.classList.contains("log-maximized")
    };
    editorFullscreenActive = true;
    workspace.classList.add("editor-fullscreen");
    sourcePane.classList.remove("terminal-maximized");
    previewPane.classList.remove("log-maximized");
    setSourceCollapsed(false, { persist: false });
    setFileSidebarVisible(false, { persist: false });
    setPdfCollapsed(true, { persist: false });
    setTerminalCollapsed(true, { persist: false });
    setCompileLogCollapsed(true, { persist: false });
  } else {
    const snapshot = editorFullscreenSnapshot || {};
    editorFullscreenActive = false;
    workspace.classList.remove("editor-fullscreen");
    applyLayoutSettings({
      showSidebar: snapshot.showSidebar !== false,
      fileWidth: snapshot.fileWidth || getFileSidebarWidth()
    });
    setSourceCollapsed(Boolean(snapshot.sourceCollapsed), { persist: false });
    setPdfCollapsed(Boolean(snapshot.pdfCollapsed), { persist: false });
    setTerminalCollapsed(Boolean(snapshot.terminalCollapsed), { persist: false });
    setCompileLogCollapsed(Boolean(snapshot.compileLogCollapsed), { persist: false });
    sourcePane.classList.toggle("terminal-maximized", Boolean(snapshot.terminalMaximized) && !snapshot.terminalCollapsed);
    previewPane.classList.toggle("log-maximized", Boolean(snapshot.compileLogMaximized) && !snapshot.compileLogCollapsed);
    editorFullscreenSnapshot = null;
  }

  updateEditorFullscreenButton();
  refreshEditorFullscreenLayout();
}

function applyPdfSidebarVisibility({ persist = true } = {}) {
  if (!pdfSidebar || !pdfSidebarButton) return;
  pdfSidebar.hidden = false;
  pdfSidebar.inert = !pdfSidebarVisible;
  pdfSidebar.setAttribute("aria-hidden", String(!pdfSidebarVisible));
  if (pdfSidebar.parentElement) {
    pdfSidebar.parentElement.classList.toggle("pdf-sidebar-visible", pdfSidebarVisible);
  }
  const label = pdfSidebarVisible ? "Hide PDF sidebar" : "Show PDF sidebar";
  pdfSidebarButton.setAttribute("aria-label", label);
  pdfSidebarButton.title = label;
  pdfSidebarButton.setAttribute("aria-pressed", String(pdfSidebarVisible));
  if (persist) localStorage.setItem("latexStudioPdfSidebarVisible", String(pdfSidebarVisible));
}

function setPdfSidebarVisible(visible) {
  pdfSidebarVisible = Boolean(visible);
  applyPdfSidebarVisibility();
  if (pdfSidebarVisible) renderPdf({ showLoading: false, preserveView: true });
}

function setTextWrapping(enabled) {
  textWrappingEnabled = Boolean(enabled);
  settingsTextWrappingToggle.checked = textWrappingEnabled;
  localStorage.setItem("latexStudioTextWrapping", String(textWrappingEnabled));
  if (editor) {
    editor.setOption("lineWrapping", textWrappingEnabled);
    editor.refresh();
    scheduleSourceMinimapUpdate();
    updateSourceMinimapViewport();
  }
}

function applySpellCheckSetting() {
  latexSource.spellcheck = spellCheckEnabled;
  if (editor && editor.getInputField()) editor.getInputField().spellcheck = spellCheckEnabled;
  if (spellCheckEnabled) scheduleSpellGrammarCheck();
  else clearSpellGrammarMarks();
}

function setFileSidebarVisible(show, { persist = true } = {}) {
  applyLayoutSettings({ showSidebar: show, fileWidth: getFileSidebarWidth() });
  if (persist) localStorage.setItem("latexStudioShowSidebar", String(show));
  renderPdf({ showLoading: false });
}

function getEditorPaneWidth() {
  const current = Number.parseFloat(getComputedStyle(workspace).getPropertyValue("--editor-width"));
  return clampNumber(current, MIN_EDITOR_WIDTH, 960, DEFAULT_EDITOR_WIDTH);
}

function applySourceLayout({ collapsed = workspace.classList.contains("source-hidden") } = {}) {
  workspace.classList.toggle("source-hidden", collapsed);
  sourceRail.hidden = !collapsed;

  if (!collapsed) {
    const currentWidth = getEditorPaneWidth();
    workspace.style.setProperty("--editor-width", `${Math.max(MIN_EDITOR_WIDTH, currentWidth)}px`);
    requestAnimationFrame(() => {
      if (editor) editor.refresh();
      scheduleTerminalFit();
      renderPdf({ showLoading: false });
    });
  }
}

function setSourceCollapsed(collapsed, { persist = true } = {}) {
  applySourceLayout({ collapsed });
  if (persist) localStorage.setItem("latexStudioSourceCollapsed", String(collapsed));
  renderPdf({ showLoading: false });
}

function applyPdfPaneLayout({ collapsed = workspace.classList.contains("pdf-hidden") } = {}) {
  workspace.classList.toggle("pdf-hidden", collapsed);
  previewRail.hidden = !collapsed;
  if (!collapsed) {
    requestAnimationFrame(() => {
      renderPdf({ showLoading: false });
      updatePdfPageIndicator();
    });
  }
}

function setPdfCollapsed(collapsed, { persist = true } = {}) {
  applyPdfPaneLayout({ collapsed });
  if (persist) localStorage.setItem("latexStudioPdfCollapsed", String(collapsed));
}

function getFileSidebarWidth() {
  const current = Number.parseFloat(getComputedStyle(workspace).getPropertyValue("--file-width"));
  return clampNumber(current, MIN_FILE_WIDTH, MAX_FILE_WIDTH, DEFAULT_FILE_WIDTH);
}

function getFileOutlineHeight() {
  const current = Number.parseFloat(getComputedStyle(filePane).getPropertyValue("--file-outline-height"));
  return clampNumber(current, MIN_FILE_OUTLINE_HEIGHT, MAX_FILE_OUTLINE_HEIGHT, DEFAULT_FILE_OUTLINE_HEIGHT);
}

function setFileOutlineHeight(height, { persist = true } = {}) {
  const clamped = clampNumber(height, MIN_FILE_OUTLINE_HEIGHT, MAX_FILE_OUTLINE_HEIGHT, DEFAULT_FILE_OUTLINE_HEIGHT);
  filePane.style.setProperty("--file-outline-height", `${clamped}px`);
  if (persist) localStorage.setItem("latexStudioFileOutlineHeight", String(Math.round(clamped)));
}

function setFileOutlineCollapsed(collapsed, { persist = true } = {}) {
  fileOutline.classList.toggle("collapsed", Boolean(collapsed));
  const arrow = fileOutlineToggle && fileOutlineToggle.querySelector("span:first-child");
  if (arrow) arrow.textContent = collapsed ? "▸" : "▾";
  if (persist) localStorage.setItem("latexStudioFileOutlineCollapsed", String(Boolean(collapsed)));
}

function getPdfMinimumWidth() {
  return DEFAULT_PDF_MIN_WIDTH;
}

function presentationTerminalIsActive() {
  return Boolean(
    presentationScreen
    && !presentationScreen.hidden
    && pptxTerminalSlot
    && terminalPanel.parentElement === pptxTerminalSlot
  );
}

function terminalLayoutHost() {
  return presentationTerminalIsActive() ? presentationScreen : sourcePane;
}

function terminalIsCollapsed() {
  return presentationTerminalIsActive()
    ? !presentationScreen.classList.contains("pptx-terminal-open")
    : sourcePane.classList.contains("terminal-collapsed");
}

function getTerminalHeight() {
  const current = Number.parseFloat(getComputedStyle(terminalLayoutHost()).getPropertyValue("--terminal-height"));
  return clampNumber(current, MIN_TERMINAL_HEIGHT, MAX_TERMINAL_HEIGHT, DEFAULT_TERMINAL_HEIGHT);
}

function setTerminalHeight(height, { persist = true } = {}) {
  const clamped = clampNumber(height, MIN_TERMINAL_HEIGHT, MAX_TERMINAL_HEIGHT, DEFAULT_TERMINAL_HEIGHT);
  sourcePane.style.setProperty("--terminal-height", `${clamped}px`);
  workspace.style.setProperty("--terminal-height", `${clamped}px`);
  if (presentationScreen) presentationScreen.style.setProperty("--terminal-height", `${clamped}px`);
  if (persist) localStorage.setItem("latexStudioTerminalHeight", String(Math.round(clamped)));
  scheduleTerminalFit();
}

function getTerminalTabsWidth() {
  const current = Number.parseFloat(getComputedStyle(terminalLayoutHost()).getPropertyValue("--terminal-tabs-width"));
  return clampNumber(current, MIN_TERMINAL_TABS_WIDTH, MAX_TERMINAL_TABS_WIDTH, DEFAULT_TERMINAL_TABS_WIDTH);
}

function setTerminalTabsWidth(width, { persist = true } = {}) {
  const clamped = clampNumber(width, MIN_TERMINAL_TABS_WIDTH, MAX_TERMINAL_TABS_WIDTH, DEFAULT_TERMINAL_TABS_WIDTH);
  sourcePane.style.setProperty("--terminal-tabs-width", `${clamped}px`);
  workspace.style.setProperty("--terminal-tabs-width", `${clamped}px`);
  if (presentationScreen) presentationScreen.style.setProperty("--terminal-tabs-width", `${clamped}px`);
  if (persist) localStorage.setItem("latexStudioTerminalTabsWidth", String(Math.round(clamped)));
  scheduleTerminalFit();
}

function applyTerminalLayout({ height = getTerminalHeight(), collapsed = sourcePane.classList.contains("terminal-collapsed") } = {}) {
  setTerminalHeight(height, { persist: false });
  sourcePane.classList.toggle("terminal-collapsed", collapsed);
  if (!collapsed) scheduleTerminalFit();
}

function setTerminalCollapsed(collapsed, { persist = true } = {}) {
  if (presentationTerminalIsActive()) {
    setPresentationTerminalOpen(!collapsed, { persist });
    return;
  }
  sourcePane.classList.toggle("terminal-collapsed", collapsed);
  if (collapsed) sourcePane.classList.remove("terminal-maximized");
  if (persist) localStorage.setItem("latexStudioTerminalCollapsed", String(collapsed));
  if (!collapsed) scheduleTerminalFit();
}

function getCompileLogHeight() {
  const current = Number.parseFloat(getComputedStyle(previewPane).getPropertyValue("--compile-log-height"));
  return clampNumber(current, MIN_COMPILE_LOG_HEIGHT, MAX_COMPILE_LOG_HEIGHT, DEFAULT_COMPILE_LOG_HEIGHT);
}

function setCompileLogHeight(height, { persist = true } = {}) {
  const clamped = clampNumber(height, MIN_COMPILE_LOG_HEIGHT, MAX_COMPILE_LOG_HEIGHT, DEFAULT_COMPILE_LOG_HEIGHT);
  previewPane.style.setProperty("--compile-log-height", `${clamped}px`);
  if (persist) localStorage.setItem("latexStudioCompileLogHeight", String(Math.round(clamped)));
}

function applyCompileLogLayout({ height = getCompileLogHeight(), collapsed = compileLogPanel.classList.contains("log-collapsed") } = {}) {
  setCompileLogHeight(height, { persist: false });
  setCompileLogCollapsed(collapsed, { persist: false });
}

function setCompileLogCollapsed(collapsed, { persist = true } = {}) {
  compileLogPanel.classList.toggle("log-collapsed", collapsed);
  previewPane.classList.toggle("log-collapsed", collapsed);
  if (collapsed) previewPane.classList.remove("log-maximized");
  if (persist) localStorage.setItem("latexStudioCompileLogCollapsed", String(collapsed));
}

function setCompileLogMaximized(maximized) {
  previewPane.classList.toggle("log-maximized", Boolean(maximized));
  if (maximized) setCompileLogCollapsed(false, { persist: false });
}

function normalizeThemePreset(value) {
  return Object.prototype.hasOwnProperty.call(THEME_PRESETS, value) ? value : "custom";
}

function normalizePdfRenderMode(value) {
  return ["adaptive", "original", "invert"].includes(value) ? value : "adaptive";
}

function updatePdfRenderModeButtons() {
  settingsPdfRenderModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.pdfRenderMode === pdfRenderMode);
  });
}

function applyEditorKeyMap() {
  if (!editor) return;
  editor.setOption("keyMap", vimModeEnabled ? "vim" : "default");
}

function setVimMode(enabled) {
  vimModeEnabled = Boolean(enabled);
  vimModeState = vimModeEnabled ? "normal" : "off";
  localStorage.setItem("latexStudioVimMode", String(vimModeEnabled));
  settingsVimModeToggle.checked = vimModeEnabled;
  applyEditorKeyMap();
  ipynbCellEditors.forEach(({ editor: cellEditor }) => cellEditor.setOption("keyMap", vimModeEnabled ? "vim" : "default"));
  updateVimModeIndicator();
  compileLog.textContent = `Vim shortcuts ${vimModeEnabled ? "enabled" : "disabled"}.`;
}

function toggleVimMode() {
  setVimMode(!vimModeEnabled);
}

function editorGutters() {
  return relativeLineNumbersEnabled
    ? ["relative-line-gutter", "CodeMirror-linenumbers"]
    : ["CodeMirror-linenumbers"];
}

function applyRelativeLineNumberSetting() {
  if (!editor) return;
  editor.setOption("gutters", editorGutters());
  updateRelativeLineNumbers();
  editor.refresh();
}

function setRelativeLineNumbers(enabled) {
  relativeLineNumbersEnabled = Boolean(enabled);
  settingsRelativeLineNumbersToggle.checked = relativeLineNumbersEnabled;
  localStorage.setItem("latexStudioRelativeLineNumbers", String(relativeLineNumbersEnabled));
  applyRelativeLineNumberSetting();
}

function updateRelativeLineNumbers() {
  if (!editor) return;
  editor.operation(() => {
    for (let line = 0; line < editor.lineCount(); line += 1) {
      editor.setGutterMarker(line, "relative-line-gutter", null);
    }
  });
  if (!relativeLineNumbersEnabled) {
    return;
  }

  const viewport = editor.getViewport();
  const from = viewport.from;
  const to = Math.min(editor.lineCount() - 1, viewport.to);
  const cursorLine = editor.getCursor().line;

  editor.operation(() => {
    for (let line = from; line <= to; line += 1) {
      const marker = document.createElement("span");
      marker.className = "relative-line-number";
      const distance = Math.abs(line - cursorLine);
      marker.textContent = String(distance);
      editor.setGutterMarker(line, "relative-line-gutter", marker);
    }
  });
}

function updateIpynbVimModeIndicator(state = vimModeState || "normal") {
  if (!ipynbVimModeIndicator) return;
  const visible = vimModeEnabled && isPythonExecutionFile();
  ipynbVimModeIndicator.hidden = !visible;
  if (!visible) {
    ipynbVimModeIndicator.textContent = "";
    ipynbVimModeIndicator.dataset.vimState = "off";
    return;
  }
  const normalized = String(state || "normal").toLowerCase();
  ipynbVimModeIndicator.textContent = normalized === "insert" ? "Insert" : normalized === "visual" ? "Visual" : "Normal";
  ipynbVimModeIndicator.dataset.vimState = normalized;
}

function updateVimModeIndicator() {
  const state = vimModeEnabled ? (vimModeState || "normal") : "off";
  updateIpynbVimModeIndicator(state);
  if (!vimModeIndicator) return;
  const sourceVisible = !editor || !editor.getWrapperElement().hidden;
  vimModeIndicator.hidden = !vimModeEnabled || !sourceVisible || isPythonExecutionFile();
  if (!vimModeEnabled) {
    vimModeIndicator.textContent = "";
    vimModeIndicator.dataset.vimState = "off";
    return;
  }
  const label = state === "insert"
    ? "Insert"
    : state === "visual"
      ? "Visual"
      : "Normal";
  vimModeIndicator.textContent = label;
  vimModeIndicator.dataset.vimState = state;
}

function resolvedTerminalTheme() {
  return document.body.dataset.theme === "dark" ? "dark" : "light";
}

function resolvedCompileLogTheme() {
  return document.body.dataset.theme === "dark" ? "dark" : "light";
}

function updateActiveDocumentTitle() {
  if (activeMediaFile) {
    const mediaTitle = (activeFile && activeFile.name) || "Image preview";
    activeDocumentTitle.textContent = mediaTitle;
    activeDocumentTitle.title = mediaTitle;
    return;
  }

  const metaTitle = activeProject ? extractVisualMeta(getSourceText()).title : "";
  const fallback = (activeProject && activeProject.name)
    || (activeFile && activeFile.name)
    || "No document loaded";
  const title = metaTitle || fallback;

  activeDocumentTitle.textContent = title;
  activeDocumentTitle.title = title;
}

function currentDocumentTitle() {
  if (activeMediaFile) return (activeFile && activeFile.name) || "Image preview";
  const metaTitle = activeProject ? extractVisualMeta(getSourceText()).title : "";
  return metaTitle
    || (activeProject && activeProject.name)
    || (activeFile && activeFile.name)
    || "No document loaded";
}

function startActiveTitleEdit() {
  if (!activeProject || activeMediaFile) return;
  const originalTitle = currentDocumentTitle();
  const input = document.createElement("input");
  input.className = "top-document-title-input";
  input.type = "text";
  input.value = originalTitle === "No document loaded" ? "" : originalTitle;
  input.setAttribute("aria-label", "Rename document title");

  activeDocumentTitle.hidden = true;
  activeDocumentTitle.insertAdjacentElement("afterend", input);

  let finished = false;
  const finish = async (commit) => {
    if (finished) return;
    finished = true;
    const nextTitle = input.value.trim();
    input.remove();
    activeDocumentTitle.hidden = false;
    if (!commit || !nextTitle || nextTitle === originalTitle) return;
    await renameActiveDocumentTitle(nextTitle);
  };

  input.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      event.preventDefault();
      finish(true);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      finish(false);
    }
  });
  input.addEventListener("blur", () => finish(true));

  requestAnimationFrame(() => {
    input.focus();
    input.select();
  });
}

async function renameActiveDocumentTitle(nextTitle) {
  if (!activeProject) return;
  if (activeFile && activeFile.editable && /\.tex$/i.test(activeFile.name || "")) {
    const nextSource = replaceLatexTitle(getSourceText(), nextTitle);
    editor.setValue(nextSource);
    handleSourceChanged({ renderVisual: !visualEditor.hidden });
    await saveManuscript();
    return;
  }

  try {
    const result = await window.localOverleaf.renameProject(activeProject.id, nextTitle);
    projects = result.projects || projects;
    activeProject = (projects || []).find((project) => project.id === activeProject.id) || { ...activeProject, name: nextTitle };
    updateActiveDocumentTitle();
    setSaveState("Title updated", "ok");
  } catch (error) {
    compileLog.textContent = formatError(error);
  }
}

function replaceLatexTitle(tex, title) {
  const escapedTitle = escapeLatexTitle(title);
  const pattern = /\\title\s*\{/;
  const match = pattern.exec(tex);
  if (!match) {
    const documentClass = tex.match(/\\documentclass(?:\[[^\]]*\])?\{[^}]+\}\s*/);
    if (documentClass) {
      const insertAt = documentClass.index + documentClass[0].length;
      return `${tex.slice(0, insertAt)}\n\\title{${escapedTitle}}\n${tex.slice(insertAt)}`;
    }
    return `\\title{${escapedTitle}}\n${tex}`;
  }

  let depth = 1;
  let cursor = match.index + match[0].length;
  while (cursor < tex.length) {
    const char = tex[cursor];
    const previous = tex[cursor - 1];
    if (char === "{" && previous !== "\\") depth += 1;
    if (char === "}" && previous !== "\\") depth -= 1;
    if (depth === 0) {
      return `${tex.slice(0, match.index)}\\title{${escapedTitle}}${tex.slice(cursor + 1)}`;
    }
    cursor += 1;
  }

  return `${tex}\n\\title{${escapedTitle}}\n`;
}

function escapeLatexTitle(value) {
  return String(value || "")
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([#$%&_{}])/g, "\\$1")
    .replace(/\^/g, "\\^{}")
    .replace(/~/g, "\\~{}");
}

function updateEditorFileTitle() {
  editorTitle.textContent = (activeFile && activeFile.name) || (activeProject && activeProject.texName) || "main.tex";
}

function activeFileExtension() {
  const name = String((activeFile && activeFile.name) || "").toLowerCase();
  return name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
}

function isMarkdownFile(file = activeFile) {
  const name = String((file && file.name) || "").toLowerCase();
  return name.endsWith(".md") || name.endsWith(".markdown");
}

function applyEditorModeForFile(file = activeFile) {
  if (!editor) return;
  const name = String((file && file.name) || "").toLowerCase();
  const extension = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  const modeByExtension = {
    ".tex": "stex",
    ".ltx": "stex",
    ".sty": "stex",
    ".cls": "stex",
    ".bst": "stex",
    ".bib": "bibtex",
    ".md": "markdown",
    ".markdown": "markdown",
    ".yaml": "yaml",
    ".yml": "yaml",
    ".py": "python",
    ".ipynb": "python",
    ".js": "javascript",
    ".jsx": { name: "javascript", jsx: true },
    ".ts": { name: "javascript", typescript: true },
    ".tsx": { name: "javascript", typescript: true, jsx: true },
    ".css": "css",
    ".html": "htmlmixed",
    ".xml": "xml",
    ".sh": "shell",
    ".bash": "shell",
    ".zsh": "shell",
    ".json": { name: "javascript", json: true }
  };
  editor.setOption("mode", modeByExtension[extension] || null);
  const pythonFile = isPythonExecutionFile(file);
  sourceModeButton.hidden = pythonFile;
  visualModeButton.hidden = pythonFile;
  if (pythonFile) setMode("source");
  updateVimModeIndicator();
}

function isPythonExecutionFile(file = activeFile) {
  const name = String((file && (file.relativePath || file.name)) || "").toLowerCase();
  return name.endsWith(".py") || name.endsWith(".ipynb");
}

function isIpynbFile(file = activeFile) {
  const name = String((file && (file.relativePath || file.name)) || "").toLowerCase();
  return name.endsWith(".ipynb");
}

function pythonNotebookHistoryKey(projectId = activeProject && activeProject.id, relativePath = activeFile && activeFile.relativePath) {
  return projectId && relativePath ? `${projectId}:${relativePath}` : "";
}

function currentPythonRuns() {
  const key = pythonNotebookHistoryKey();
  return key ? (pythonNotebookRuns.get(key) || []) : [];
}

function placePythonNotebookPanel(embedded) {
  if (!pythonNotebookPanel) return;
  if (embedded) {
    if (pythonNotebookPanel.parentElement !== sourcePane) sourcePane.appendChild(pythonNotebookPanel);
    return;
  }
  if (pythonNotebookPanel.parentElement !== previewPane) pdfViewerShell.after(pythonNotebookPanel);
}

function placeTerminalPanel(wide) {
  if (!terminalPanel || !workspace || !sourcePane) return;
  if (presentationTerminalIsActive()) return;
  workspace.classList.toggle("python-terminal-wide", wide);
  if (wide) {
    if (terminalPanel.parentElement !== workspace) workspace.appendChild(terminalPanel);
  } else if (terminalPanel.parentElement !== sourcePane) {
    sourcePane.appendChild(terminalPanel);
  }
}

function placePresentationTerminalPanel() {
  if (!terminalPanel || !pptxTerminalSlot) return;
  workspace.classList.remove("python-terminal-wide");
  if (terminalPanel.parentElement !== pptxTerminalSlot) pptxTerminalSlot.appendChild(terminalPanel);
  terminalCollapsedButton.hidden = true;
  presentationScreen.dataset.terminalTheme = resolvedTerminalTheme();
}

function restoreEditorTerminalPanel() {
  if (!terminalPanel || !sourcePane) return;
  if (terminalPanel.parentElement !== sourcePane) sourcePane.appendChild(terminalPanel);
  terminalCollapsedButton.hidden = false;
  presentationScreen.classList.remove("pptx-terminal-open", "pptx-terminal-maximized");
  if (pptxTerminalSlot) pptxTerminalSlot.classList.remove("open");
  if (pptxTerminalToggle) pptxTerminalToggle.setAttribute("aria-expanded", "false");
}

function setPresentationTerminalOpen(open, { persist = true } = {}) {
  const expanded = Boolean(open);
  presentationScreen.classList.toggle("pptx-terminal-open", expanded);
  if (!expanded) presentationScreen.classList.remove("pptx-terminal-maximized");
  if (pptxTerminalSlot) pptxTerminalSlot.classList.toggle("open", expanded);
  if (pptxTerminalToggle) {
    pptxTerminalToggle.setAttribute("aria-expanded", String(expanded));
    pptxTerminalToggle.classList.toggle("active", expanded);
  }
  if (persist) localStorage.setItem("openleafPresentationTerminalOpen", String(expanded));
  if (expanded) {
    const projectRoot = activeProject && activeProject.rootPath;
    const belongsToActiveProject = (session) => (
      !session.exited
      && activeProject
      && session.projectId === activeProject.id
      && (!projectRoot || session.cwd === projectRoot)
    );
    const projectSession = terminalSessions.find((session) => (
      belongsToActiveProject(session)
      && session.kind === "shell"
    )) || terminalSessions.find(belongsToActiveProject);
    if (projectSession) activateTerminal(projectSession.id);
    else void createTerminalSession("shell");
    scheduleTerminalFit();
  }
  requestAnimationFrame(() => {
    if (activePresentation && !presentationScreen.hidden) void renderPresentationSlide({ preserveSelection: true });
  });
}

function syncPythonNotebookVisibility() {
  if (!pythonNotebookPanel || !previewPane) return;
  const pythonFile = isPythonExecutionFile() && !activeMediaFile;
  const notebookFile = isIpynbFile();
  const layoutFileKey = pythonFile ? pythonNotebookHistoryKey() : "";
  if (layoutFileKey !== lastPythonLayoutFileKey) {
    if (notebookFile) setTerminalCollapsed(true, { persist: false });
    lastPythonLayoutFileKey = layoutFileKey;
  }
  const visible = pythonFile && !notebookFile && currentPythonRuns().length > 0;
  const embeddedNotebook = false;
  const rightSideOutput = visible;
  if (pythonRuntimeControls) pythonRuntimeControls.hidden = !pythonFile || Boolean(activeProject && activeProject.remote);
  const lastInterpreter = [...currentPythonRuns()].reverse().find((run) => run.response && run.response.interpreter);
  updatePythonKernelLabel(lastInterpreter ? lastInterpreter.response.interpreter : "");
  // Keep the normal Terminal/Log split while the PDF is visible. Only merge
  // the bottom row when Python output has actually replaced the PDF pane.
  placeTerminalPanel(rightSideOutput);
  placePythonNotebookPanel(embeddedNotebook);
  if (pythonEditorToolbar) pythonEditorToolbar.hidden = !pythonFile || notebookFile;
  if (sourcePane) sourcePane.classList.toggle("python-file-active", pythonFile);
  if (sourcePane) sourcePane.classList.toggle("ipynb-notebook-mode", notebookFile);
  if (sourcePane) sourcePane.classList.toggle("ipynb-output-active", embeddedNotebook);
  pythonNotebookPanel.hidden = !visible;
  pythonNotebookPanel.classList.toggle("python-notebook-embedded", embeddedNotebook);
  previewPane.classList.toggle("python-output-active", rightSideOutput);
  previewPane.classList.toggle("python-file-preview", pythonFile);
  if (previewPaneHeader) previewPaneHeader.hidden = rightSideOutput;
  if (pdfViewerShell) pdfViewerShell.hidden = rightSideOutput;
  if (compileLogPanel) compileLogPanel.hidden = rightSideOutput;
  if (previewRailButton) previewRailButton.textContent = rightSideOutput ? "Python" : "PDF";
  if (visible) {
    if (historyPanel) historyPanel.hidden = true;
    renderPythonNotebookFeed();
  }
  if (notebookFile) renderIpynbInlineOutputs();
}

function pythonCellAtCursor() {
  const text = getSourceText();
  if (editor.somethingSelected()) {
    return {
      code: editor.getSelection(),
      label: "Selection",
      nextLine: null
    };
  }

  const lines = text.split("\n");
  const cursorLine = editor.getCursor().line;
  const markers = [];
  lines.forEach((line, index) => {
    if (/^\s*#\s*%%(?:\s*\[[^\]]+\])?\s*$/i.test(line)) markers.push(index);
  });
  if (!markers.length) return { code: text, label: activeFileExtension() === ".ipynb" ? "Notebook" : "Script", nextLine: null };

  let markerIndex = -1;
  markers.forEach((line, index) => {
    if (line <= cursorLine) markerIndex = index;
  });
  const start = markerIndex >= 0 ? markers[markerIndex] + 1 : 0;
  const nextMarker = markers[markerIndex + 1];
  const end = Number.isInteger(nextMarker) ? nextMarker : lines.length;
  return {
    code: lines.slice(start, end).join("\n"),
    label: `Cell ${Math.max(1, markerIndex + 1)}`,
    nextLine: Number.isInteger(nextMarker) ? Math.min(lines.length - 1, nextMarker + 1) : null
  };
}

function pythonCellsThroughCursor() {
  if (editor.somethingSelected()) return pythonCellAtCursor();
  const text = getSourceText();
  const lines = text.split("\n");
  const cursorLine = editor.getCursor().line;
  const nextMarker = lines.findIndex((line, index) => (
    index > cursorLine && /^\s*#\s*%%(?:\s*\[[^\]]+\])?\s*$/i.test(line)
  ));
  const end = nextMarker === -1 ? lines.length : nextMarker;
  return {
    code: lines.slice(0, end).join("\n"),
    label: "Run above",
    nextLine: nextMarker === -1 ? null : Math.min(lines.length - 1, nextMarker + 1)
  };
}

async function runActivePythonCell({ cell: providedCell = null, save = true, debug = false } = {}) {
  if (!isPythonExecutionFile() || !activeProject || !activeFile) return false;
  const projectId = activeProject.id;
  const relativePath = activeFile.relativePath;
  const historyKey = pythonNotebookHistoryKey(projectId, relativePath);
  if (pythonRunningFiles.has(historyKey)) {
    compileLog.textContent = "This Python session is already running a cell.";
    return false;
  }
  const baseCell = providedCell || pythonCellAtCursor();
  const cell = debug ? { ...baseCell, label: `Debug ${baseCell.label.toLowerCase()}` } : baseCell;
  const executionCode = debug
    ? `import trace as __openleaf_trace\n__openleaf_trace.Trace(trace=True, count=False).runctx(${JSON.stringify(baseCell.code)}, globals(), globals())`
    : cell.code;
  if (!cell.code.trim()) {
    compileLog.textContent = "The current Python cell is empty.";
    return false;
  }

  const run = {
    id: ++pythonRunSequence,
    label: cell.label,
    code: cell.code,
    status: "running",
    response: null,
    error: ""
  };
  const runs = pythonNotebookRuns.get(historyKey) || [];
  runs.push(run);
  pythonNotebookRuns.set(historyKey, runs);
  pythonRunningFiles.add(historyKey);
  setPdfCollapsed(false, { persist: false });
  syncPythonNotebookVisibility();
  renderPythonNotebookFeed();

  const saved = save ? await saveManuscript() : true;
  if (!saved) {
    run.status = "error";
    run.error = "The file could not be saved, so Python was not run.";
    pythonRunningFiles.delete(historyKey);
    renderPythonNotebookFeed();
    return false;
  }

  try {
    const response = await window.localOverleaf.runPythonCell(projectId, relativePath, executionCode, selectedPythonInterpreter());
    run.status = response.stderr ? "error" : "complete";
    run.response = response;
  } catch (error) {
    run.status = "error";
    run.error = formatError(error);
  } finally {
    pythonRunningFiles.delete(historyKey);
    if (pythonNotebookHistoryKey() === historyKey) {
      renderPythonNotebookFeed();
      if (cell.nextLine !== null) editor.setCursor({ line: cell.nextLine, ch: 0 });
      editor.focus();
    }
  }
  return run.status === "complete";
}

async function runPythonScratchCell() {
  if (!pythonScratchInput) return false;
  const code = pythonScratchInput.value.trim();
  if (!code) return false;
  const completed = await runActivePythonCell({
    cell: { code, label: "Scratch", nextLine: null },
    save: false
  });
  if (completed) pythonScratchInput.value = "";
  return completed;
}

async function stopActivePythonKernel() {
  if (!activeProject || !activeFile || !isPythonExecutionFile()) return;
  const historyKey = pythonNotebookHistoryKey();
  try {
    await window.localOverleaf.stopPythonKernel(activeProject.id, activeFile.relativePath);
  } catch (error) {
    compileLog.textContent = formatError(error);
  } finally {
    pythonRunningFiles.delete(historyKey);
    renderPythonNotebookFeed();
  }
}

function clearActivePythonOutputs() {
  const historyKey = pythonNotebookHistoryKey();
  if (historyKey) pythonNotebookRuns.delete(historyKey);
  syncPythonNotebookVisibility();
}

function deletePythonRun(runId) {
  const historyKey = pythonNotebookHistoryKey();
  if (!historyKey) return;
  const remaining = (pythonNotebookRuns.get(historyKey) || []).filter((run) => run.id !== runId);
  if (remaining.length) pythonNotebookRuns.set(historyKey, remaining);
  else pythonNotebookRuns.delete(historyKey);
  syncPythonNotebookVisibility();
  if (remaining.length) renderPythonNotebookFeed();
}

function renderPythonNotebookFeed() {
  if (isIpynbFile()) {
    renderIpynbInlineOutputs();
    return;
  }
  if (!pythonNotebookFeed || !isPythonExecutionFile()) return;
  const runs = currentPythonRuns();
  pythonNotebookFeed.innerHTML = "";
  runs.forEach((run) => pythonNotebookFeed.appendChild(renderPythonRunCard(run)));
  const lastResponse = [...runs].reverse().find((run) => run.response && run.response.interpreter);
  pythonNotebookMeta.textContent = lastResponse
    ? `Connected to Python (${pythonEnvironmentLabel(lastResponse.response.interpreter)})`
    : "Connecting to Python…";
  const running = pythonRunningFiles.has(pythonNotebookHistoryKey());
  [pythonRunCellButton, pythonRunAboveButton, pythonDebugCellButton, pythonScratchRunButton]
    .filter(Boolean)
    .forEach((button) => { button.disabled = running; });
  pythonStopButton.disabled = !running;
  requestAnimationFrame(() => {
    pythonNotebookFeed.scrollTop = pythonNotebookFeed.scrollHeight;
  });
}

function pythonEnvironmentLabel(interpreter) {
  const parts = String(interpreter || "Python").split(/[\\/]/).filter(Boolean);
  const binIndex = parts.lastIndexOf("bin");
  if (binIndex > 0) return parts[binIndex - 1];
  return parts[parts.length - 1] || "Python";
}

function pythonKernelPreferenceKey(projectId = activeProject && activeProject.id) {
  return projectId ? `openleafPythonKernel:${projectId}` : "";
}

function selectedPythonInterpreter() {
  const key = pythonKernelPreferenceKey();
  return key ? (localStorage.getItem(key) || "") : "";
}

function updatePythonKernelLabel(fallbackInterpreter = "") {
  if (!ipynbKernelLabel) return;
  const interpreter = selectedPythonInterpreter() || fallbackInterpreter;
  ipynbKernelLabel.textContent = interpreter ? `Python (${pythonEnvironmentLabel(interpreter)})` : "Select Kernel";
}

function closePythonKernelMenu() {
  if (!pythonKernelMenu || !pythonKernelButton) return;
  pythonKernelMenu.hidden = true;
  pythonKernelButton.setAttribute("aria-expanded", "false");
}

async function selectPythonInterpreter(interpreter) {
  const key = pythonKernelPreferenceKey();
  if (!key || !activeFile) return;
  await window.localOverleaf.stopPythonKernel(activeProject.id, activeFile.relativePath).catch(() => false);
  localStorage.setItem(key, interpreter);
  updatePythonKernelLabel(interpreter);
  closePythonKernelMenu();
}

async function openPythonKernelMenu() {
  if (!pythonKernelMenu || !pythonKernelButton || !activeProject || activeProject.remote) return;
  if (!pythonKernelMenu.hidden) {
    closePythonKernelMenu();
    return;
  }
  pythonKernelMenu.hidden = false;
  pythonKernelMenu.innerHTML = '<div class="python-kernel-menu-title">Select Python kernel</div><div class="python-kernel-loading">Finding Python environments…</div>';
  pythonKernelButton.setAttribute("aria-expanded", "true");
  const rect = pythonKernelButton.getBoundingClientRect();
  pythonKernelMenu.style.top = `${Math.round(rect.bottom + 5)}px`;
  pythonKernelMenu.style.right = `${Math.max(10, Math.round(window.innerWidth - rect.right))}px`;
  try {
    const interpreters = await window.localOverleaf.listPythonInterpreters(activeProject.id);
    const selected = selectedPythonInterpreter();
    pythonKernelMenu.replaceChildren();
    const title = document.createElement("div");
    title.className = "python-kernel-menu-title";
    title.textContent = "Select Python kernel";
    pythonKernelMenu.appendChild(title);
    interpreters.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `python-kernel-option${item.path === selected ? " active" : ""}`;
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", String(item.path === selected));
      button.innerHTML = `<span><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.path)}</small></span><b aria-hidden="true">${item.path === selected ? "✓" : ""}</b>`;
      button.addEventListener("click", () => void selectPythonInterpreter(item.path));
      pythonKernelMenu.appendChild(button);
    });
    if (!interpreters.length) {
      const empty = document.createElement("div");
      empty.className = "python-kernel-loading";
      empty.textContent = "No Python interpreters found.";
      pythonKernelMenu.appendChild(empty);
    } else {
      const active = pythonKernelMenu.querySelector('.python-kernel-option.active') || pythonKernelMenu.querySelector('.python-kernel-option');
      if (active) active.focus();
    }
  } catch (error) {
    const loading = pythonKernelMenu.querySelector('.python-kernel-loading');
    if (loading) loading.textContent = formatError(error);
  }
}

function renderPythonRunCard(run) {
  const card = document.createElement("article");
  card.className = "python-run-card";

  const executionCount = document.createElement("div");
  executionCount.className = "python-execution-count";
  executionCount.textContent = `[${run.id}]`;

  const source = document.createElement("section");
  source.className = "python-run-source collapsed";
  source.tabIndex = 0;
  source.setAttribute("role", "button");
  source.setAttribute("aria-expanded", "false");
  source.setAttribute("aria-label", "Show full executed code");
  source.dataset.tip = "Click to show the full executed code";
  const sourceCode = document.createElement("pre");
  sourceCode.className = "cm-s-default";
  const displayCode = String(run.code || "").replace(/^(?:[ \t]*\r?\n)+/, "");
  const firstLine = displayCode.split(/\r?\n/, 1)[0];
  const renderSourceCode = (expanded) => {
    sourceCode.replaceChildren();
    const visibleCode = expanded ? displayCode : firstLine;
    if (window.CodeMirror && typeof window.CodeMirror.runMode === "function") {
      window.CodeMirror.runMode(visibleCode, "python", sourceCode);
    } else {
      sourceCode.textContent = visibleCode;
    }
  };
  renderSourceCode(false);
  const deleteButton = document.createElement("button");
  deleteButton.className = "python-run-delete";
  deleteButton.type = "button";
  deleteButton.setAttribute("aria-label", `Delete executed cell ${run.id}`);
  deleteButton.dataset.tip = "Delete this executed cell";
  deleteButton.innerHTML = TRASH_ICON_SVG;
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    deletePythonRun(run.id);
  });
  const toggleSource = () => {
    const expanded = source.getAttribute("aria-expanded") === "true";
    source.setAttribute("aria-expanded", String(!expanded));
    source.classList.toggle("collapsed", expanded);
    renderSourceCode(!expanded);
    source.dataset.tip = expanded ? "Click to show the full executed code" : "Click to show only the first line";
  };
  source.addEventListener("click", toggleSource);
  source.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleSource();
  });
  source.append(sourceCode, deleteButton);

  const output = document.createElement("section");
  output.className = "python-run-output";
  const outputLabel = document.createElement("div");
  outputLabel.className = "python-run-label";
  const elapsed = run.response ? `${Math.max(0.1, run.response.elapsedMs / 1000).toFixed(1)}s` : "";
  const statusMark = run.status === "complete" ? "✓" : run.status === "error" ? "×" : "●";
  outputLabel.innerHTML = `<span class="python-run-status ${run.status}">${statusMark}</span><span>${elapsed || run.status}</span>`;
  output.appendChild(outputLabel);

  if (run.status === "running") {
    const pending = document.createElement("div");
    pending.className = "python-running";
    pending.textContent = "Running cell…";
    output.appendChild(pending);
  } else {
    const stdout = String((run.response && run.response.stdout) || "");
    const stderr = String((run.response && run.response.stderr) || run.error || "");
    const images = (run.response && Array.isArray(run.response.images)) ? run.response.images : [];
    const plotlyOutputs = (run.response && Array.isArray(run.response.plotly)) ? run.response.plotly : [];
    if (stdout) appendPythonTextOutput(output, stdout, "stdout");
    if (stderr) appendPythonTextOutput(output, stderr, "stderr");
    images.forEach((base64, index) => {
      const image = document.createElement("img");
      image.className = "python-run-image";
      image.alt = `Python plot ${index + 1}`;
      image.src = `data:image/png;base64,${base64}`;
      output.appendChild(image);
    });
    plotlyOutputs.forEach((serializedFigure, index) => {
      const plot = document.createElement("div");
      plot.className = "python-run-plotly";
      plot.setAttribute("aria-label", `Plotly plot ${index + 1}`);
      output.appendChild(plot);
      requestAnimationFrame(() => {
        try {
          const figure = JSON.parse(serializedFigure);
          window.Plotly.newPlot(plot, figure.data || [], figure.layout || {}, {
            displaylogo: false,
            responsive: true
          });
        } catch (error) {
          plot.textContent = `Could not render Plotly output: ${formatError(error)}`;
          plot.classList.add("error");
        }
      });
    });
    if (!stdout && !stderr && !images.length && !plotlyOutputs.length) {
      const empty = document.createElement("div");
      empty.className = "python-no-output";
      empty.textContent = "Completed with no output.";
      output.appendChild(empty);
    }
  }

  card.append(executionCount, source, output);
  return card;
}

function appendPythonTextOutput(container, text, className) {
  const pre = document.createElement("pre");
  pre.className = className;
  pre.textContent = text;
  container.appendChild(pre);
}

function parseIpynbEditorCells(text = getSourceText()) {
  if (!String(text || "").trim()) return [{ type: "code", code: "" }];
  const cells = [];
  let current = null;
  const push = () => {
    if (!current) return;
    const lines = current.type === "markdown"
      ? current.lines.map((line) => line.replace(/^# ?/, ""))
      : current.lines;
    cells.push({ type: current.type, code: lines.join("\n").replace(/\s+$/, "") });
  };
  String(text || "").split("\n").forEach((line) => {
    const marker = line.match(/^\s*#\s*%%(?:\s*\[(markdown)\])?\s*$/i);
    if (marker) {
      push();
      current = { type: marker[1] ? "markdown" : "code", lines: [] };
      return;
    }
    if (!current) current = { type: "code", lines: [] };
    current.lines.push(line);
  });
  push();
  return cells;
}

function serializeIpynbEditorCells() {
  return ipynbCellEditors.map(({ type, editor: cellEditor }) => {
    const marker = type === "markdown" ? "# %% [markdown]" : "# %%";
    const value = type === "markdown"
      ? cellEditor.getValue().split("\n").map((line) => line ? `# ${line}` : "#").join("\n")
      : cellEditor.getValue();
    return `${marker}\n${value}`.trimEnd();
  }).join("\n\n");
}

function syncIpynbSourceFromCells() {
  if (syncingIpynbSource || !isIpynbFile()) return;
  syncingIpynbSource = true;
  const text = serializeIpynbEditorCells();
  suppressSourceChange = true;
  editor.setValue(text);
  suppressSourceChange = false;
  syncingIpynbSource = false;
  handleSourceChanged();
}

function destroyIpynbCellEditors() {
  ipynbCellEditors.forEach(({ editor: cellEditor }) => {
    if (cellEditor && typeof cellEditor.toTextArea === "function") cellEditor.toTextArea();
  });
  ipynbCellEditors = [];
}

async function runIpynbCell(index, { advance = true } = {}) {
  const entry = ipynbCellEditors[index];
  if (!entry || entry.type !== "code") return false;
  syncIpynbSourceFromCells();
  const nextExecutionCount = Math.max(0, ...currentPythonRuns().map((run) => Number(run.notebookExecutionCount) || 0)) + 1;
  const completed = await runActivePythonCell({
    cell: { code: entry.editor.getValue(), label: `Cell ${index + 1}`, nextLine: null }
  });
  const latestRun = currentPythonRuns().at(-1);
  if (latestRun && latestRun.label === `Cell ${index + 1}`) latestRun.notebookExecutionCount = nextExecutionCount;
  renderIpynbInlineOutputs();
  if (advance) {
    if (index >= ipynbCellEditors.length - 1) addIpynbCell("code");
    else if (ipynbCellEditors[index + 1]) ipynbCellEditors[index + 1].editor.focus();
  }
  return completed;
}

function advanceIpynbMarkdownCell(index) {
  syncIpynbSourceFromCells();
  if (index >= ipynbCellEditors.length - 1) addIpynbCell("code");
  else if (ipynbCellEditors[index + 1]) ipynbCellEditors[index + 1].editor.focus();
}

function renderIpynbMarkdownCell(index, { advance = true } = {}) {
  const entry = ipynbCellEditors[index];
  if (!entry || entry.type !== "markdown") return;
  syncIpynbSourceFromCells();
  const wrapper = entry.editor.getWrapperElement();
  entry.preview.innerHTML = renderMarkdownToHtml(entry.editor.getValue())
    || '<p class="ipynb-markdown-empty">Empty Markdown cell</p>';
  wrapper.hidden = true;
  entry.preview.hidden = false;
  entry.card.classList.add("ipynb-markdown-rendered");
  if (advance) {
    if (index >= ipynbCellEditors.length - 1) addIpynbCell("code");
    else if (ipynbCellEditors[index + 1]) ipynbCellEditors[index + 1].editor.focus();
  }
}

async function runAllIpynbCells() {
  const codeIndexes = ipynbCellEditors
    .map((entry, index) => entry.type === "code" ? index : -1)
    .filter((index) => index >= 0);
  for (const index of codeIndexes) await runIpynbCell(index, { advance: false });
  const last = ipynbCellEditors.at(-1);
  if (last && (last.type !== "code" || last.editor.getValue().trim())) addIpynbCell("code");
}

function renderIpynbInlineOutputs() {
  if (!isIpynbFile() || !ipynbNotebookCells) return;
  const runs = currentPythonRuns();
  const lastInterpreter = [...runs].reverse().find((run) => run.response && run.response.interpreter);
  updatePythonKernelLabel(lastInterpreter ? lastInterpreter.response.interpreter : "");
  ipynbCellEditors.forEach((entry, index) => {
    const outputHost = entry.card.querySelector(".ipynb-cell-output");
    const count = entry.card.querySelector(".ipynb-cell-count");
    if (entry.type !== "code") {
      outputHost.replaceChildren();
      count.textContent = "";
      return;
    }
    const matchingRuns = runs.filter((run) => run.label === `Cell ${index + 1}`);
    const run = matchingRuns[matchingRuns.length - 1];
    outputHost.replaceChildren();
    count.textContent = run ? `[${run.notebookExecutionCount || "…"}]` : "[ ]";
    if (!run) return;
    const rendered = renderPythonRunCard(run);
    const output = rendered.querySelector(".python-run-output");
    if (output) {
      const empty = output.querySelector(".python-no-output");
      if (empty) empty.remove();
      outputHost.appendChild(output);
    }
  });
}

function renderIpynbNotebookEditor({ focusIndex = null } = {}) {
  if (!ipynbNotebookEditor || !ipynbNotebookCells || !isIpynbFile()) return;
  const cells = parseIpynbEditorCells();
  destroyIpynbCellEditors();
  ipynbNotebookCells.replaceChildren();

  cells.forEach((cell, index) => {
    const card = document.createElement("article");
    card.className = `ipynb-cell ipynb-cell-${cell.type}`;
    const gutter = document.createElement("div");
    gutter.className = "ipynb-cell-gutter";
    const runButton = document.createElement("button");
    runButton.type = "button";
    runButton.className = "ipynb-cell-run";
    runButton.setAttribute("aria-label", `Run notebook cell ${index + 1}`);
    runButton.dataset.tip = cell.type === "code" ? "Run cell (Shift+Enter)" : "Render Markdown (Shift+Enter)";
    runButton.innerHTML = '<svg class="ipynb-play-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.8 5.6C7.72 4.93 6.35 5.71 6.35 6.98v10.04c0 1.27 1.37 2.05 2.45 1.38l8.45-5.02c1.01-.62 1.01-2.14 0-2.76L8.8 5.6Z"></path></svg>';
    const count = document.createElement("span");
    count.className = "ipynb-cell-count";
    count.textContent = cell.type === "code" ? "[ ]" : "";
    gutter.append(runButton, count);

    const body = document.createElement("div");
    body.className = "ipynb-cell-body";
    const header = document.createElement("header");
    header.className = "ipynb-cell-header";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "ipynb-cell-delete";
    remove.setAttribute("aria-label", `Delete notebook cell ${index + 1}`);
    remove.dataset.tip = "Delete cell";
    remove.innerHTML = TRASH_ICON_SVG;
    header.append(remove);
    const textarea = document.createElement("textarea");
    textarea.value = cell.code;
    textarea.setAttribute("aria-label", `${cell.type === "markdown" ? "Markdown" : "Python"} cell ${index + 1}`);
    const language = document.createElement("span");
    language.className = "ipynb-cell-language";
    language.textContent = cell.type === "markdown" ? "Markdown" : "Python";
    const markdownPreview = document.createElement("div");
    markdownPreview.className = "ipynb-markdown-preview";
    markdownPreview.hidden = true;
    markdownPreview.setAttribute("role", "button");
    markdownPreview.tabIndex = 0;
    markdownPreview.setAttribute("aria-label", `Edit Markdown cell ${index + 1}`);
    markdownPreview.dataset.tip = "Click to edit Markdown";
    const output = document.createElement("div");
    output.className = "ipynb-cell-output";
    body.append(header, textarea, language, markdownPreview, output);
    card.append(gutter, body);
    ipynbNotebookCells.appendChild(card);

    const cellEditor = CodeMirror.fromTextArea(textarea, {
      mode: cell.type === "markdown" ? "markdown" : "python",
      keyMap: vimModeEnabled ? "vim" : "default",
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: 2,
      tabSize: 2,
      viewportMargin: Infinity,
      extraKeys: {
        "Shift-Enter": () => cell.type === "code"
          ? void runIpynbCell(index)
          : renderIpynbMarkdownCell(index)
      }
    });
    ipynbCellEditors.push({ type: cell.type, editor: cellEditor, card, preview: markdownPreview });
    cellEditor.on("change", () => {
      if (!isLoading) syncIpynbSourceFromCells();
    });
    cellEditor.on("vim-mode-change", (event) => {
      vimModeState = String((event && event.mode) || "normal").toLowerCase();
      updateIpynbVimModeIndicator(vimModeState);
    });
    cellEditor.on("focus", () => updateIpynbVimModeIndicator(vimModeState || "normal"));
    runButton.addEventListener("click", () => cell.type === "code"
      ? void runIpynbCell(index)
      : renderIpynbMarkdownCell(index));
    const editMarkdown = () => {
      if (cell.type !== "markdown" || markdownPreview.hidden) return;
      markdownPreview.hidden = true;
      cellEditor.getWrapperElement().hidden = false;
      card.classList.remove("ipynb-markdown-rendered");
      cellEditor.refresh();
      cellEditor.focus();
    };
    markdownPreview.addEventListener("click", editMarkdown);
    markdownPreview.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      editMarkdown();
    });
    remove.addEventListener("click", () => {
      cellEditor.toTextArea();
      ipynbCellEditors.splice(index, 1);
      syncIpynbSourceFromCells();
      renderIpynbNotebookEditor({ focusIndex: ipynbCellEditors.length ? Math.max(0, index - 1) : null });
    });
  });

  renderIpynbInlineOutputs();
  updateIpynbVimModeIndicator(vimModeEnabled ? "normal" : "off");
  requestAnimationFrame(() => {
    ipynbCellEditors.forEach(({ editor: cellEditor }) => cellEditor.refresh());
    if (Number.isInteger(focusIndex) && ipynbCellEditors[focusIndex]) ipynbCellEditors[focusIndex].editor.focus();
  });
}

function addIpynbCell(type = "code") {
  if (!isIpynbFile()) return;
  syncIpynbSourceFromCells();
  const marker = type === "markdown" ? "# %% [markdown]" : "# %%";
  const existing = getSourceText().trimEnd();
  const text = existing ? `${existing}\n\n${marker}\n` : `${marker}\n`;
  suppressSourceChange = true;
  editor.setValue(text);
  suppressSourceChange = false;
  handleSourceChanged();
  renderIpynbNotebookEditor({ focusIndex: parseIpynbEditorCells(text).length - 1 });
}

function addIpynbCodeCell() {
  addIpynbCell("code");
}

function currentTextTab() {
  return openTextTabs.find((tab) => tab.relativePath === activeTextTabPath) || null;
}

function sourceDiskSignature(file, text = "") {
  if (!file) return "";
  return [
    file.relativePath || file.name || "",
    Number(file.mtimeMs || 0).toFixed(3),
    Number(file.size || String(text || "").length || 0)
  ].join(":");
}

function updateActiveDiskSignature(file = activeFile, text = savedText) {
  activeDiskSignature = sourceDiskSignature(file, text);
}

function syncActiveTextTabFromEditor() {
  const tab = currentTextTab();
  if (!tab || !editor || tab.kind === "image") return;
  tab.text = getSourceText();
  tab.savedText = savedText;
  tab.dirty = tab.text !== tab.savedText;
}

function resetTextTabs() {
  openTextTabs = [];
  activeTextTabPath = "";
  activeFile = null;
  activeMediaFile = null;
  renderTextTabs();
  syncPythonNotebookVisibility();
}

function setActiveLoadedTextFile(file, text, { preview = false } = {}) {
  const relativePath = file.relativePath;
  let tab = openTextTabs.find((item) => item.relativePath === relativePath);
  if (!tab) {
    clearReplaceablePreviewTab(relativePath);
    tab = {
      relativePath,
      name: file.name,
      file,
      text,
      savedText: text,
      dirty: false,
      preview: Boolean(preview),
      kind: "text"
    };
    openTextTabs.push(tab);
  } else {
    tab.name = file.name;
    tab.file = file;
    tab.text = text;
    tab.savedText = text;
    tab.dirty = false;
    tab.kind = "text";
    if (!preview) tab.preview = false;
  }

  activeTextTabPath = relativePath;
  activeFile = file;
  activeMediaFile = null;
  savedText = text;
  updateActiveDiskSignature(file, text);
  applyEditorModeForFile(file);
  mediaViewer.hidden = true;
  renderTextTabs();
  renderFileTree();
  updateFileOutline();
  resetHistoryEvents(text);
  scheduleSpellGrammarCheck();
  syncPythonNotebookVisibility();
}

function updateActiveTextTabAfterSave(file, text) {
  const tab = currentTextTab();
  if (!tab) return;
  tab.file = file || tab.file;
  tab.name = (file && file.name) || tab.name;
  tab.relativePath = (file && file.relativePath) || tab.relativePath;
  activeTextTabPath = tab.relativePath;
  tab.text = text;
  tab.savedText = text;
  tab.dirty = false;
  tab.preview = false;
  tab.kind = "text";
  activeFile = file || activeFile;
  savedText = text;
  updateActiveDiskSignature(activeFile, text);
  renderTextTabs();
  renderFileTree();
  updateFileOutline();
  recordHistoryEvent("Saved");
}

function updateActiveTextTabDirtyState() {
  const tab = currentTextTab();
  if (!tab || tab.kind === "image") return;
  tab.text = getSourceText();
  tab.dirty = tab.text !== tab.savedText;
  renderTextTabs();
  updateFileOutline();
}

function startExternalSourcePolling() {
  stopExternalSourcePolling();
  externalSourcePollTimer = setInterval(pollExternalSourceUpdate, EXTERNAL_SOURCE_POLL_MS);
}

function stopExternalSourcePolling() {
  if (externalSourcePollTimer) clearInterval(externalSourcePollTimer);
  externalSourcePollTimer = null;
  externalSourcePollBusy = false;
}

async function pollExternalSourceUpdate() {
  if (
    externalSourcePollBusy
    || !activeProject
    || !activeFile
    || activeMediaFile
    || editorScreen.hidden
    || isLoading
    || isCompiling
    || !window.localOverleaf
    || !window.localOverleaf.readProjectFile
  ) {
    return;
  }

  if (getSourceText() !== savedText) return;

  externalSourcePollBusy = true;
  const requestProjectId = activeProject.id;
  const requestRelativePath = activeFile.relativePath;
  try {
    const result = await window.localOverleaf.readProjectFile(requestProjectId, requestRelativePath);
    // The project or file may have changed while the disk read was in flight;
    // applying a stale result would show another file's LaTeX in the editor.
    if (
      !activeProject
      || activeProject.id !== requestProjectId
      || !activeFile
      || activeFile.relativePath !== requestRelativePath
      || editorScreen.hidden
      || isLoading
      || isCompiling
      || getSourceText() !== savedText
    ) {
      return;
    }
    const nextSignature = sourceDiskSignature(result.file, result.tex);
    if (nextSignature === activeDiskSignature) return;

    activeDiskSignature = nextSignature;
    activeProject = result.project || activeProject;
    if (result.tex === savedText) {
      activeFile = result.file || activeFile;
      updateActiveTextTabAfterSave(activeFile, savedText);
      return;
    }

    const wasVisual = !visualEditor.hidden;
    suppressSourceChange = true;
    setSourceText(result.tex);
    suppressSourceChange = false;
    activeFile = result.file || activeFile;
    savedText = result.tex;
    updateActiveTextTabAfterSave(activeFile, result.tex);
    updateEditorFileTitle();
    updateActiveDocumentTitle();
    updateStats();
    scheduleSourceMinimapUpdate();
    await loadProjectFiles();
    if (wasVisual) renderVisualEditor();
    setSaveState("Synced from disk", "ok");
    scheduleAutoCompile("External edits detected");
  } catch (error) {
    // Polling should never interrupt editing; surface details in the log only.
    compileLog.textContent = formatError(error);
  } finally {
    externalSourcePollBusy = false;
  }
}

function switchTextTab(relativePath) {
  if (!relativePath || relativePath === activeTextTabPath) return;
  const tab = openTextTabs.find((item) => item.relativePath === relativePath);
  if (!tab) return;

  syncActiveTextTabFromEditor();
  recordHistoryEvent("Edited");
  activeTextTabPath = tab.relativePath;
  activeFile = tab.file;
  activeMediaFile = tab.kind === "image" ? tab.file : null;
  savedText = tab.kind === "text" ? tab.savedText : "";

  isLoading = true;
  try {
    if (tab.kind === "image") {
      showMediaTab(tab);
    } else {
      mediaViewer.hidden = true;
      applyEditorModeForFile(tab.file);
      editor.setValue(tab.text);
      setMode(visualEditor.hidden ? "source" : "visual");
      resetHistoryEvents(tab.text);
    }
    updateEditorFileTitle();
    updateActiveDocumentTitle();
    updateStats();
    scheduleSourceMinimapUpdate();
    scheduleSpellGrammarCheck();
    if (tab.kind !== "image") renderVisualEditor();
    renderFileTree();
    setSaveState(tab.dirty ? "Unsaved changes" : "Saved", tab.dirty ? undefined : "ok");
    renderTextTabs();
  } finally {
    isLoading = false;
    syncPythonNotebookVisibility();
    requestAnimationFrame(() => editor.refresh());
  }
}

function closeTextTab(relativePath) {
  const tab = openTextTabs.find((item) => item.relativePath === relativePath);
  if (!tab) return;
  if (tab.relativePath === activeTextTabPath) syncActiveTextTabFromEditor();
  if (tab.dirty) {
    const confirmed = window.confirm(`Close "${tab.name}" and discard unsaved tab changes?`);
    if (!confirmed) return;
  }

  const index = openTextTabs.findIndex((item) => item.relativePath === relativePath);
  openTextTabs.splice(index, 1);

  if (relativePath === activeTextTabPath) {
    const nextTab = openTextTabs[Math.max(0, index - 1)] || openTextTabs[0];
    if (nextTab) {
      activeTextTabPath = "";
      switchTextTab(nextTab.relativePath);
      return;
    }

    activeTextTabPath = "";
    activeFile = null;
    activeMediaFile = null;
    savedText = "";
    isLoading = true;
    editor.setValue("");
    mediaViewer.hidden = true;
    isLoading = false;
    updateEditorFileTitle();
    updateActiveDocumentTitle();
    updateStats();
    scheduleSourceMinimapUpdate();
    renderVisualEditor();
    syncPythonNotebookVisibility();
  }

  renderTextTabs();
  renderFileTree();
  syncPythonNotebookVisibility();
}

function removeTextTabsUnderPath(relativePath) {
  const removedActive = openTextTabs.some((tab) => (
    tab.relativePath === activeTextTabPath &&
    (tab.relativePath === relativePath || tab.relativePath.startsWith(`${relativePath}/`))
  ));
  openTextTabs = openTextTabs.filter((tab) => tab.relativePath !== relativePath && !tab.relativePath.startsWith(`${relativePath}/`));

  if (removedActive) {
    const nextTab = openTextTabs[0];
    if (nextTab) {
      activeTextTabPath = "";
      switchTextTab(nextTab.relativePath);
    } else {
      activeTextTabPath = "";
      activeFile = null;
      activeMediaFile = null;
      savedText = "";
      isLoading = true;
      editor.setValue("");
      mediaViewer.hidden = true;
      isLoading = false;
      updateEditorFileTitle();
      updateActiveDocumentTitle();
      updateStats();
      scheduleSourceMinimapUpdate();
    }
  }

  renderTextTabs();
  syncPythonNotebookVisibility();
}

function renderTextTabs() {
  if (!textTabs) return;
  textTabs.innerHTML = "";

  openTextTabs.forEach((tab) => {
    const button = document.createElement("button");
    button.className = "text-tab";
    button.classList.toggle("active", tab.relativePath === activeTextTabPath);
    button.classList.toggle("preview", Boolean(tab.preview));
    button.type = "button";
    button.draggable = true;
    button.title = tab.relativePath;
    button.dataset.relativePath = tab.relativePath;
    button.innerHTML = `
      ${fileIconMarkup(tab.file || { name: tab.name, relativePath: tab.relativePath, kind: "file" })}
      <span class="text-tab-name">${escapeHtml(tab.name)}</span>
      <span class="text-tab-dirty" aria-hidden="true">${tab.dirty ? "•" : ""}</span>
      <span class="text-tab-close" role="button" aria-label="Close ${escapeHtml(tab.name)}" title="Close ${escapeHtml(tab.name)}">${CLOSE_ICON_SVG}</span>
      <span class="text-tab-curve text-tab-curve-left" aria-hidden="true"></span>
      <span class="text-tab-curve text-tab-curve-right" aria-hidden="true"></span>
    `;
    button.addEventListener("click", () => switchTextTab(tab.relativePath));
    button.addEventListener("dblclick", () => pinTextTab(tab.relativePath));
    button.addEventListener("dragstart", (event) => {
      syncActiveTextTabFromEditor();
      draggedTextTabPath = tab.relativePath;
      event.dataTransfer.setData("text/plain", tab.relativePath);
      event.dataTransfer.effectAllowed = "move";
      button.classList.add("dragging");
    });
    button.addEventListener("dragover", (event) => {
      const sourcePath = draggedTextTabPath || event.dataTransfer.getData("text/plain");
      if (!sourcePath || sourcePath === tab.relativePath) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      const rect = button.getBoundingClientRect();
      const placeAfter = event.clientX > rect.left + rect.width / 2;
      clearTextTabDropIndicators();
      button.classList.toggle("drop-before", !placeAfter);
      button.classList.toggle("drop-after", placeAfter);
    });
    button.addEventListener("dragleave", () => {
      button.classList.remove("drop-before", "drop-after");
    });
    button.addEventListener("drop", (event) => {
      const sourcePath = draggedTextTabPath || event.dataTransfer.getData("text/plain");
      if (!sourcePath || sourcePath === tab.relativePath) return;
      event.preventDefault();
      const rect = button.getBoundingClientRect();
      reorderTextTabs(sourcePath, tab.relativePath, event.clientX > rect.left + rect.width / 2);
    });
    button.addEventListener("dragend", () => {
      draggedTextTabPath = "";
      clearTextTabDropIndicators();
    });
    button.querySelector(".text-tab-close").addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeTextTab(tab.relativePath);
    });
    textTabs.appendChild(button);
  });
}

function clearReplaceablePreviewTab(nextRelativePath) {
  const index = openTextTabs.findIndex((tab) => tab.preview && !tab.dirty && tab.relativePath !== nextRelativePath);
  if (index === -1) return;
  const [tab] = openTextTabs.splice(index, 1);
  if (tab.relativePath === activeTextTabPath) activeTextTabPath = "";
}

function pinTextTab(relativePath) {
  const tab = openTextTabs.find((item) => item.relativePath === relativePath);
  if (!tab) return;
  tab.preview = false;
  renderTextTabs();
}

function clearTextTabDropIndicators() {
  if (!textTabs) return;
  textTabs.querySelectorAll(".text-tab").forEach((tab) => {
    tab.classList.remove("dragging", "drop-before", "drop-after");
  });
}

function reorderTextTabs(sourcePath, targetPath, placeAfter = false) {
  const sourceIndex = openTextTabs.findIndex((tab) => tab.relativePath === sourcePath);
  if (sourceIndex === -1 || sourcePath === targetPath) return;

  const [tab] = openTextTabs.splice(sourceIndex, 1);
  const targetIndex = openTextTabs.findIndex((item) => item.relativePath === targetPath);
  if (targetIndex === -1) openTextTabs.push(tab);
  else openTextTabs.splice(placeAfter ? targetIndex + 1 : targetIndex, 0, tab);

  draggedTextTabPath = "";
  renderTextTabs();
}

function clampNumber(value, min, max, fallback) {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function normalizeHexColor(value) {
  if (!value) return "";
  const match = String(value).trim().match(/^#?([0-9a-fA-F]{6})$/);
  return match ? `#${match[1].toLowerCase()}` : "";
}

function hexToRgb(value) {
  const normalized = normalizeHexColor(value) || DEFAULT_ACCENT;
  const number = Number.parseInt(normalized.slice(1), 16);
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255
  };
}

function openDocumentationSettings() {
  openSettings();
  setSettingsPanel("documentation");
}

const OPENLEAF_TOUR_STEPS = [
  {
    title: "Welcome to Openleaf",
    copy: "A private, local workspace for papers, readings, PDFs, presentations, and AI-assisted research. Here are the 10 features worth knowing first."
  },
  {
    selector: "#addProjectButton",
    title: "Create or import anything",
    copy: "Start a blank paper or bring in an existing TeX file, project folder, archive, or PowerPoint deck. Your original files stay on your Mac."
  },
  {
    selector: "#templatesButton",
    title: "Begin with a real template",
    copy: "Use academic paper, thesis, poster, résumé, and presentation starters, then keep your own templates beside them."
  },
  {
    selector: "#projectSearch",
    title: "Find work instantly",
    copy: "Search every project from Home. Favorite, sort, and switch between grid and compact list views without opening files one by one."
  },
  {
    selector: ".project-collection-card, #projectGrid",
    title: "Organize subjects and divisions",
    copy: "Drag one project onto another to create an Apple-style subject folder. Open it to add divisions such as Readings, Notes, and Assignments."
  },
  {
    selector: ".file-pane, #fileRailButton",
    title: "A complete project file tree",
    copy: "Create, rename, duplicate, move, and import project files. PDFs inside a reading folder are available directly from the PDF title menu."
  },
  {
    selector: ".toolbar-segment, #visualModeButton",
    title: "Code and Visual editing",
    copy: "Switch between precise source editing and a structured visual manuscript view. Your content remains the same in both modes."
  },
  {
    selector: "#compileButton",
    title: "Compile locally",
    copy: "Build the current document with one click. Openleaf keeps the PDF, log, and source side by side and only refreshes what changed."
  },
  {
    selector: "#pdfSpeechControls",
    title: "Read with synchronized speech",
    copy: "The local Adam voice pre-analyzes the PDF, tracks real progress, highlights each word, and pauses or resumes with Space when you are not typing."
  },
  {
    selector: ".settingsButton, #helpButton",
    title: "Make Openleaf yours",
    copy: "Choose contrast themes, voice speed, custom pronunciation rules, Vim shortcuts, GitHub, and experimental Cinematic Mode. Replay this tour from Documentation anytime."
  }
];

function maybeStartOpenleafTour() {
  if (window.localOverleaf && window.localOverleaf.isTestRuntime) return;
  if (localStorage.getItem("openleafWelcomeTourVersion") === "1") return;
  setTimeout(() => startOpenleafTour(), 650);
}

function startOpenleafTour() {
  closeOpenleafTour({ remember: false });
  openleafTourOverlay = document.createElement("section");
  openleafTourOverlay.className = "openleaf-tour-overlay";
  openleafTourOverlay.setAttribute("role", "dialog");
  openleafTourOverlay.setAttribute("aria-modal", "true");
  openleafTourOverlay.setAttribute("aria-label", "Openleaf feature tutorial");
  openleafTourOverlay.innerHTML = `
    <div class="openleaf-tour-spotlight" aria-hidden="true"></div>
    <article class="openleaf-tour-card">
      <div class="openleaf-tour-step-label"></div>
      <h2></h2>
      <p></p>
      <div class="openleaf-tour-dots" aria-hidden="true"></div>
      <footer>
        <button class="openleaf-tour-skip" type="button">Skip tour</button>
        <span>
          <button class="openleaf-tour-back" type="button">Back</button>
          <button class="openleaf-tour-next" type="button">Next</button>
        </span>
      </footer>
    </article>
  `;
  document.body.appendChild(openleafTourOverlay);
  openleafTourOverlay.querySelector(".openleaf-tour-skip").addEventListener("click", () => closeOpenleafTour());
  openleafTourOverlay.querySelector(".openleaf-tour-back").addEventListener("click", () => showOpenleafTourStep(openleafTourStepIndex - 1));
  openleafTourOverlay.querySelector(".openleaf-tour-next").addEventListener("click", () => {
    if (openleafTourStepIndex >= OPENLEAF_TOUR_STEPS.length - 1) closeOpenleafTour();
    else showOpenleafTourStep(openleafTourStepIndex + 1);
  });
  openleafTourStepIndex = 0;
  showOpenleafTourStep(0);
}

function closeOpenleafTour({ remember = true } = {}) {
  if (openleafTourOverlay) openleafTourOverlay.remove();
  openleafTourOverlay = null;
  openleafTourStepIndex = -1;
  if (remember) localStorage.setItem("openleafWelcomeTourVersion", "1");
}

function visibleTourTarget(selector) {
  if (!selector) return null;
  return Array.from(document.querySelectorAll(selector)).find((element) => {
    const bounds = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return !element.hidden && style.display !== "none" && style.visibility !== "hidden" && bounds.width > 2 && bounds.height > 2;
  }) || null;
}

function showOpenleafTourStep(index) {
  if (!openleafTourOverlay) return;
  openleafTourStepIndex = clampNumber(index, 0, OPENLEAF_TOUR_STEPS.length - 1, 0);
  const step = OPENLEAF_TOUR_STEPS[openleafTourStepIndex];
  const card = openleafTourOverlay.querySelector(".openleaf-tour-card");
  card.querySelector(".openleaf-tour-step-label").textContent = `Feature ${openleafTourStepIndex + 1} of ${OPENLEAF_TOUR_STEPS.length}`;
  card.querySelector("h2").textContent = step.title;
  card.querySelector("p").textContent = step.copy;
  card.querySelector(".openleaf-tour-dots").innerHTML = OPENLEAF_TOUR_STEPS.map((_item, dotIndex) => (
    `<i class="${dotIndex === openleafTourStepIndex ? "active" : ""}"></i>`
  )).join("");
  card.querySelector(".openleaf-tour-back").disabled = openleafTourStepIndex === 0;
  card.querySelector(".openleaf-tour-next").textContent = openleafTourStepIndex === OPENLEAF_TOUR_STEPS.length - 1 ? "Start using Openleaf" : "Next";
  positionOpenleafTour();
  card.querySelector(".openleaf-tour-next").focus({ preventScroll: true });
}

function positionOpenleafTour() {
  if (!openleafTourOverlay || openleafTourStepIndex < 0) return;
  const step = OPENLEAF_TOUR_STEPS[openleafTourStepIndex];
  const target = visibleTourTarget(step.selector);
  const spotlight = openleafTourOverlay.querySelector(".openleaf-tour-spotlight");
  const card = openleafTourOverlay.querySelector(".openleaf-tour-card");
  const margin = 18;
  const gap = 16;
  if (!target) {
    spotlight.hidden = true;
    card.style.left = "50%";
    card.style.top = "50%";
    card.style.transform = "translate(-50%, -50%)";
    return;
  }
  spotlight.hidden = false;
  const targetBounds = target.getBoundingClientRect();
  spotlight.style.left = `${Math.max(8, targetBounds.left - 7)}px`;
  spotlight.style.top = `${Math.max(8, targetBounds.top - 7)}px`;
  spotlight.style.width = `${Math.min(window.innerWidth - 16, targetBounds.width + 14)}px`;
  spotlight.style.height = `${Math.min(window.innerHeight - 16, targetBounds.height + 14)}px`;
  card.style.transform = "none";
  const cardBounds = card.getBoundingClientRect();
  const belowTop = targetBounds.bottom + gap;
  const top = belowTop + cardBounds.height <= window.innerHeight - margin
    ? belowTop
    : Math.max(margin, targetBounds.top - cardBounds.height - gap);
  const left = clampNumber(targetBounds.left + targetBounds.width / 2 - cardBounds.width / 2, margin, window.innerWidth - cardBounds.width - margin, margin);
  card.style.left = `${Math.round(left)}px`;
  card.style.top = `${Math.round(top)}px`;
}

function wireEvents() {
  window.addEventListener("beforeunload", () => recordHistoryEvent("Edited"));
  window.addEventListener("resize", positionOpenleafTour);
  settingsButtons.forEach((button) => button.addEventListener("click", openSettings));
  closeSettingsButton.addEventListener("click", closeSettings);
  settingsBackdrop.addEventListener("click", closeOverlayModals);
  closeNewProjectButton.addEventListener("click", closeNewProjectPanel);
  templatesButton.addEventListener("click", openTemplatesPanel);
  closeTemplatesButton.addEventListener("click", closeTemplatesPanel);
  importTemplateButton.addEventListener("click", importCustomTemplate);
  closeCommandPaletteButton.addEventListener("click", closeCommandPalette);
  commandPaletteInput.addEventListener("input", renderCommandPalette);
  commandPaletteInput.addEventListener("keydown", handleCommandPaletteKeydown);
  fileRailButton.addEventListener("click", () => setFileSidebarVisible(true));
  sourceRailButton.addEventListener("click", () => setSourceCollapsed(false));
  previewRailButton.addEventListener("click", () => setPdfCollapsed(false));
  undoButton.addEventListener("click", () => editor.undo());
  redoButton.addEventListener("click", () => editor.redo());
  if (minimapToggleButton) minimapToggleButton.addEventListener("click", () => setMinimapVisible(!minimapVisible));
  if (editorFullscreenButton) editorFullscreenButton.addEventListener("click", () => setEditorFullscreen(!editorFullscreenActive));
  if (fileHeaderRefreshButton) fileHeaderRefreshButton.addEventListener("click", refreshActiveProject);
  newFileButton.addEventListener("click", () => createProjectFile("file"));
  newFolderButton.addEventListener("click", () => createProjectFile("folder"));
  if (downloadPackageButton) downloadPackageButton.addEventListener("click", downloadProjectPackage);
  activeDocumentTitle.addEventListener("dblclick", startActiveTitleEdit);
  if (editTitleButton) editTitleButton.addEventListener("click", startActiveTitleEdit);
  remoteWorkspaceButton.addEventListener("click", () => openSshProjectFlow());
  helpButton.addEventListener("click", openDocumentationSettings);
  if (railHelpButton) railHelpButton.addEventListener("click", openDocumentationSettings);
  document.getElementById("replayWelcomeTourButton")?.addEventListener("click", () => {
    closeSettings();
    startOpenleafTour();
  });
  fileOutlineToggle.addEventListener("click", () => {
    setFileOutlineCollapsed(!fileOutline.classList.contains("collapsed"));
  });
  selectionCodexSendButton.addEventListener("click", sendSelectionToCodex);
  selectionCodexPrompt.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendSelectionToCodex();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      hideSelectionCodexPopover();
      editor.focus();
    }
  });
  addProjectButton.addEventListener("click", () => toggleNewProjectPanel());
  projectImportButtons.forEach((button) => {
    button.addEventListener("click", () => addProject(button.dataset.projectKind));
  });
  wireProjectDrop(projectDropZone);
  refreshProjectsButton.addEventListener("click", loadProjects);
  projectSearch.addEventListener("input", renderProjectGrid);
  if (projectSortButton) projectSortButton.addEventListener("click", toggleProjectSortMenu);
  if (projectSortMenu) {
    projectSortMenu.addEventListener("click", (event) => {
      event.stopPropagation();
      const button = event.target.closest("[data-project-sort]");
      if (!button) return;
      setProjectSort(button.dataset.projectSort);
      setProjectSortMenuOpen(false);
    });
  }
  projectGridButton.addEventListener("click", () => setProjectView("grid"));
  projectRowsButton.addEventListener("click", () => setProjectView("rows"));
  backToProjectsButton.addEventListener("click", showProjects);
  if (pptxBackButton) pptxBackButton.addEventListener("click", showProjects);
  if (pptxFileRefreshButton) pptxFileRefreshButton.addEventListener("click", loadProjectFiles);
  if (pptxNewFileButton) pptxNewFileButton.addEventListener("click", () => createProjectFile("file"));
  if (pptxNewFolderButton) pptxNewFolderButton.addEventListener("click", () => createProjectFile("folder"));
  if (pptxDownloadPackageButton) pptxDownloadPackageButton.addEventListener("click", downloadProjectPackage);
  if (pptxFilePane) wireFileDrop(pptxFilePane);
  if (pptxSaveButton) pptxSaveButton.addEventListener("click", saveActivePresentation);
  if (pptxPresentButton) pptxPresentButton.addEventListener("click", () => void setPresentationView(true));
  if (pptxPresentPreviousButton) {
    pptxPresentPreviousButton.addEventListener("click", () => void selectPresentationSlideByOffset(-1));
  }
  if (pptxPresentNextButton) {
    pptxPresentNextButton.addEventListener("click", () => void selectPresentationSlideByOffset(1));
  }
  if (pptxPresentExitButton) {
    pptxPresentExitButton.addEventListener("click", () => void setPresentationView(false));
  }
  if (pptxUndoButton) pptxUndoButton.addEventListener("click", () => void undoPresentationChange());
  if (pptxRedoButton) pptxRedoButton.addEventListener("click", () => void redoPresentationChange());
  if (pptxSelectButton) {
    pptxSelectButton.addEventListener("click", () => {
      selectPresentationElement(null);
      presentationSelectionScope = "canvas";
      pptxStageViewport.focus({ preventScroll: true });
    });
  }
  if (pptxAddTextButton) pptxAddTextButton.addEventListener("click", addPresentationTextBox);
  if (pptxAddRectangleButton) pptxAddRectangleButton.addEventListener("click", () => addPresentationShape("rect"));
  if (pptxAddEllipseButton) pptxAddEllipseButton.addEventListener("click", () => addPresentationShape("ellipse"));
  if (pptxAddLineButton) pptxAddLineButton.addEventListener("click", addPresentationLine);
  if (pptxAddImageButton && pptxImageFileInput) {
    pptxAddImageButton.addEventListener("click", () => {
      pptxImageFileInput.value = "";
      pptxImageFileInput.click();
    });
    pptxImageFileInput.addEventListener("change", async () => {
      const [file] = Array.from(pptxImageFileInput.files || []);
      if (file) await addPresentationImageFile(file);
    });
  }
  if (pptxAddChartButton) pptxAddChartButton.addEventListener("click", addPresentationChart);
  if (pptxAddTableButton) pptxAddTableButton.addEventListener("click", addPresentationTable);
  if (pptxMenusToggle && pptxMenubar) {
    pptxMenusToggle.addEventListener("click", () => {
      const collapsed = pptxMenubar.classList.toggle("collapsed");
      pptxMenusToggle.setAttribute("aria-pressed", String(collapsed));
      requestAnimationFrame(() => renderPresentationSlide({ preserveSelection: true }));
    });
  }
  if (pptxPrintButton) pptxPrintButton.addEventListener("click", () => window.print());
  if (pptxFitButton) {
    pptxFitButton.addEventListener("click", () => {
      setPresentationZoom(100);
    });
  }
  if (pptxBackgroundButton && pptxBackgroundColorInput) {
    pptxBackgroundButton.addEventListener("click", () => pptxBackgroundColorInput.click());
    pptxBackgroundColorInput.addEventListener("input", () => setPresentationBackground(pptxBackgroundColorInput.value));
  }
  if (pptxLayoutButton) pptxLayoutButton.addEventListener("click", addPresentationTitleLayout);
  if (pptxThemeButton) {
    pptxThemeButton.addEventListener("click", () => {
      openSettings();
      setSettingsPanel("appearance");
    });
  }
  if (pptxTransitionButton) pptxTransitionButton.addEventListener("click", setPresentationFadeTransition);
  if (pptxMenubar) {
    pptxMenubar.querySelectorAll("[data-pptx-menu]").forEach((button) => {
      button.addEventListener("click", () => handlePresentationMenu(button.dataset.pptxMenu));
    });
  }
  if (pptxDeleteElementButton) pptxDeleteElementButton.addEventListener("click", deleteSelectedPresentationElement);
  if (pptxSendToBackButton) pptxSendToBackButton.addEventListener("click", () => reorderSelectedPresentationElement("back"));
  if (pptxSendBackwardButton) pptxSendBackwardButton.addEventListener("click", () => reorderSelectedPresentationElement("backward"));
  if (pptxBringForwardButton) pptxBringForwardButton.addEventListener("click", () => reorderSelectedPresentationElement("forward"));
  if (pptxBringToFrontButton) pptxBringToFrontButton.addEventListener("click", () => reorderSelectedPresentationElement("front"));
  if (pptxEditTextButton) {
    pptxEditTextButton.addEventListener("click", () => {
      focusPresentationElementText(selectedPresentationElement);
    });
  }
  if (pptxContextToolbar) {
    pptxContextToolbar.addEventListener("pointerdown", (event) => {
      const selectionState = capturePresentationTextSelection();
      if (selectionState && selectionState.end > selectionState.start && event.target.closest("button")) {
        event.preventDefault();
      }
    });
  }
  if (pptxTerminalToggle) {
    pptxTerminalToggle.addEventListener("click", () => {
      setPresentationTerminalOpen(!presentationScreen.classList.contains("pptx-terminal-open"));
    });
  }
  if (pptxZoomRange) {
    pptxZoomRange.addEventListener("input", () => {
      setPresentationZoom(pptxZoomRange.value);
    });
  }
  if (pptxZoomOutButton) pptxZoomOutButton.addEventListener("click", () => stepPresentationZoom(-1));
  if (pptxZoomInButton) pptxZoomInButton.addEventListener("click", () => stepPresentationZoom(1));
  if (pptxElementLayer) {
    pptxElementLayer.addEventListener("pointerdown", (event) => {
      if (event.target === pptxElementLayer) selectPresentationElement(null);
    });
  }
  if (pptxStageViewport) {
    pptxStageViewport.addEventListener("click", () => {
      if (presentationViewIsActive()) void selectPresentationSlideByOffset(1);
    });
    pptxStageViewport.addEventListener("wheel", (event) => {
      if ((!event.metaKey && !event.ctrlKey) || presentationViewIsActive()) return;
      const delta = event.deltaY || event.deltaX;
      if (!delta) return;
      event.preventDefault();
      stepPresentationZoom(delta < 0 ? 1 : -1, {
        clientX: event.clientX,
        clientY: event.clientY
      });
    }, { passive: false });
  }
  document.addEventListener("fullscreenchange", () => {
    if (presentationViewIsActive() && !document.fullscreenElement) {
      void setPresentationView(false, { manageFullscreen: false });
    }
  });
  [
    [pptxTextInput, "text", (value) => value],
    [pptxXInput, "x", (value) => Number(value) * PPTX_EMU_PER_INCH],
    [pptxYInput, "y", (value) => Number(value) * PPTX_EMU_PER_INCH],
    [pptxWidthInput, "cx", (value) => Math.max(0.05, Number(value)) * PPTX_EMU_PER_INCH],
    [pptxHeightInput, "cy", (value) => Math.max(0.05, Number(value)) * PPTX_EMU_PER_INCH],
    [pptxFontSizeInput, "fontSize", (value) => Math.max(6, Number(value))],
    [pptxFontFamilyInput, "fontFamily", (value) => value]
  ].forEach(([control, property, transform]) => {
    if (!control) return;
    control.addEventListener("input", () => updateSelectedPresentationElement(property, transform(control.value)));
  });
  if (pptxColorInput) {
    pptxColorInput.addEventListener("input", () => {
      const isText = selectedPresentationElement
        && (selectedPresentationElement.type === "text" || selectedPresentationElement.hasTextBody);
      updateSelectedPresentationElement(isText ? "color" : "fillColor", pptxColorInput.value);
    });
  }
  if (pptxLineColorInput) {
    pptxLineColorInput.addEventListener("input", () => {
      updateSelectedPresentationOutline({ lineColor: pptxLineColorInput.value }, { activateIfNeeded: true });
    });
  }
  if (pptxLineWidthInput) {
    pptxLineWidthInput.addEventListener("input", () => {
      updateSelectedPresentationOutline({ lineWidth: pptxLineWidthInput.value });
    });
  }
  if (pptxLineStyleSelect) {
    pptxLineStyleSelect.addEventListener("change", () => {
      updateSelectedPresentationOutline({ lineStyle: pptxLineStyleSelect.value }, { activateIfNeeded: true });
    });
  }
  [
    [pptxBoldButton, "bold"],
    [pptxItalicButton, "italic"],
    [pptxUnderlineButton, "underline"]
  ].forEach(([button, property]) => {
    if (!button) return;
    button.addEventListener("click", () => {
      if (selectedPresentationElement) updateSelectedPresentationElement(property, !presentationSelectionStyleValue(property));
    });
  });
  if (pptxAlignSelect) {
    pptxAlignSelect.addEventListener("change", () => updateSelectedPresentationElement("align", pptxAlignSelect.value));
  }
  document.addEventListener("selectionchange", () => {
    if (!presentationScreen || presentationScreen.hidden) return;
    capturePresentationTextSelection();
    cancelAnimationFrame(presentationSelectionInspectorFrame);
    presentationSelectionInspectorFrame = requestAnimationFrame(() => {
      if (presentationScreen && !presentationScreen.hidden) renderPresentationInspector();
    });
  });
  topRefreshFilesButton.addEventListener("click", refreshActiveProject);
  railRefreshFilesButton.addEventListener("click", refreshActiveProject);
  wireFileDrop(filePane);
  if (saveButton) saveButton.addEventListener("click", saveManuscript);
  compileButton.addEventListener("click", () => compileManuscript({ manual: true }));
  openPdfButton.addEventListener("click", openPdf);
  downloadPdfButton.addEventListener("click", downloadPdf);
  if (pdfSidebarButton) pdfSidebarButton.addEventListener("click", () => setPdfSidebarVisible(!pdfSidebarVisible));
  if (pdfTitle) pdfTitle.addEventListener("click", togglePdfFileMenu);
  if (pdfMeta) pdfMeta.addEventListener("click", togglePdfFileMenu);
  historyButton.addEventListener("click", openHistoryWindow);
  if (pushGithubButton) pushGithubButton.addEventListener("click", pushActiveProjectToGithub);
  if (pullGithubButton) pullGithubButton.addEventListener("click", pullActiveProjectFromGithub);
  if (pdfReaderButton) pdfReaderButton.addEventListener("click", togglePdfReaderMode);
  if (pdfCinematicButton) pdfCinematicButton.addEventListener("click", openPdfCinematicMode);
  if (pdfCinematicCloseButton) pdfCinematicCloseButton.addEventListener("click", closePdfCinematicMode);
  if (pdfCinematicPlaybackButton) pdfCinematicPlaybackButton.addEventListener("click", togglePdfCinematicPlayback);
  pdfCinematicBackdropButtons.forEach((button) => button.addEventListener("click", () => {
    setPdfCinematicArtwork(Number(button.dataset.cinematicArtwork));
  }));
  if (pdfCinematicBackdropIntensity) pdfCinematicBackdropIntensity.addEventListener("input", applyPdfCinematicAppearance);
  if (pdfCinematicTextSize) pdfCinematicTextSize.addEventListener("input", applyPdfCinematicAppearance);
  if (pdfCinematicFollowButton) pdfCinematicFollowButton.addEventListener("click", () => {
    pdfCinematicFollowText = !pdfCinematicFollowText;
    pdfCinematicFollowButton.classList.toggle("active", pdfCinematicFollowText);
    pdfCinematicFollowButton.setAttribute("aria-pressed", String(pdfCinematicFollowText));
    if (pdfCinematicFollowText && pdfCinematicActiveWord) scrollPdfCinematicWordIntoView(pdfCinematicActiveWord, true);
  });
  if (pdfSpeechButton) pdfSpeechButton.addEventListener("click", togglePdfSpeech);
  if (pdfSpeechRate) pdfSpeechRate.addEventListener("input", handlePdfSpeechRateChange);
  if (pdfSpeechVoice) pdfSpeechVoice.addEventListener("change", handlePdfSpeechVoiceChange);
  if (pdfPronunciationDictionary) pdfPronunciationDictionary.addEventListener("input", handlePdfPronunciationDictionaryChange);
  closeHistoryButton.addEventListener("click", () => setHistoryPanelOpen(false));
  pdfZoomOutButton.addEventListener("click", () => changePdfZoom(-0.1));
  pdfZoomInButton.addEventListener("click", () => changePdfZoom(0.1));
  const pdfFitButton = document.getElementById("pdfFitButton");
  if (pdfFitButton) pdfFitButton.addEventListener("click", fitPdfToBoundaries);
  pdfViewer.addEventListener("wheel", handlePdfWheelZoom, { passive: false });
  pdfViewer.addEventListener("pointerdown", handlePdfSpeechManualNavigation, { passive: true });
  pdfViewer.addEventListener("scroll", updatePdfPageIndicator, { passive: true });
  pdfViewer.addEventListener("scroll", closePdfWordDefinition, { passive: true });
  pdfViewer.addEventListener("click", handlePdfSpeechWordClick, true);
  pdfViewer.addEventListener("contextmenu", handlePdfSpeechWordDefinition, true);
  pdfViewer.addEventListener("gesturestart", handlePdfGestureStart);
  pdfViewer.addEventListener("gesturechange", handlePdfGestureChange);
  pdfViewer.addEventListener("gestureend", handlePdfGestureEnd);
  terminalNewButton.addEventListener("click", () => createTerminalSession("shell"));
  terminalRemoteButton.addEventListener("click", () => createTerminalSession("ssh"));
  terminalShellButton.addEventListener("click", () => createTerminalSession("shell"));
  terminalCodexButton.addEventListener("click", () => createTerminalSession("codex"));
  terminalClaudeButton.addEventListener("click", () => createTerminalSession("claude"));
  terminalSplitButton.addEventListener("click", splitActiveTerminal);
  terminalKillButton.addEventListener("click", () => {
    if (activeTerminalId) closeTerminalSession(activeTerminalId);
  });
  terminalMaximizeButton.addEventListener("click", toggleTerminalMaximized);
  terminalClosePanelButton.addEventListener("click", () => setTerminalCollapsed(true));
  terminalCollapsedButton.addEventListener("click", () => setTerminalCollapsed(false));
  if (pythonRunCellButton) pythonRunCellButton.addEventListener("click", () => runActivePythonCell());
  if (pythonRunAboveButton) pythonRunAboveButton.addEventListener("click", () => runActivePythonCell({ cell: pythonCellsThroughCursor() }));
  if (pythonDebugCellButton) pythonDebugCellButton.addEventListener("click", () => runActivePythonCell({ debug: true }));
  if (pythonStopButton) pythonStopButton.addEventListener("click", stopActivePythonKernel);
  if (pythonClearButton) pythonClearButton.addEventListener("click", clearActivePythonOutputs);
  if (pythonKernelButton) pythonKernelButton.addEventListener("click", (event) => {
    event.stopPropagation();
    void openPythonKernelMenu();
  });
  document.addEventListener("click", (event) => {
    if (pdfWordDefinitionCard && !pdfWordDefinitionCard.contains(event.target)) closePdfWordDefinition();
    if (!pythonKernelMenu || pythonKernelMenu.hidden) return;
    if (!pythonKernelMenu.contains(event.target) && !pythonKernelButton.contains(event.target)) closePythonKernelMenu();
  });
  document.addEventListener("keydown", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const isTextEntry = Boolean(target && target.closest("input, textarea, select, [contenteditable='true'], .CodeMirror"));
    if (event.code === "Space" && !event.metaKey && !event.ctrlKey && !event.altKey && !isTextEntry) {
      if (pdfCinematicStage && !pdfCinematicStage.hidden) {
        event.preventDefault();
        togglePdfCinematicPlayback();
        return;
      }
      if (pdfSpeechPlaying || pdfSpeechPaused) {
        event.preventDefault();
        togglePdfSpeech();
        return;
      }
    }
    if (event.key === "Escape" && openleafTourOverlay) {
      event.preventDefault();
      closeOpenleafTour();
      return;
    }
    if (event.key === "Escape" && pdfWordDefinitionCard) {
      event.preventDefault();
      closePdfWordDefinition();
      return;
    }
    if (event.key === "Escape" && openProjectCollectionId) {
      event.preventDefault();
      closeProjectCollection();
      renderProjectGrid();
      return;
    }
    if (event.key === "Escape" && pdfCinematicStage && !pdfCinematicStage.hidden) {
      event.preventDefault();
      closePdfCinematicMode();
      return;
    }
    if (!pythonKernelMenu || pythonKernelMenu.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closePythonKernelMenu();
      pythonKernelButton.focus();
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const options = [...pythonKernelMenu.querySelectorAll(".python-kernel-option")];
    if (!options.length) return;
    event.preventDefault();
    const current = options.indexOf(document.activeElement);
    const delta = event.key === "ArrowDown" ? 1 : -1;
    options[(current + delta + options.length) % options.length].focus();
  });
  if (pythonScratchRunButton) pythonScratchRunButton.addEventListener("click", runPythonScratchCell);
  if (pythonScratchInput) {
    pythonScratchInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" || event.shiftKey) return;
      event.preventDefault();
      void runPythonScratchCell();
    });
  }
  if (ipynbAddCellButton) ipynbAddCellButton.addEventListener("click", addIpynbCodeCell);
  if (ipynbAddMarkdownButton) ipynbAddMarkdownButton.addEventListener("click", () => addIpynbCell("markdown"));
  if (ipynbRunAllButton) ipynbRunAllButton.addEventListener("click", () => void runAllIpynbCells());
  if (ipynbClearOutputsButton) ipynbClearOutputsButton.addEventListener("click", clearActivePythonOutputs);
  compileLogCollapsedButton.addEventListener("click", () => setCompileLogCollapsed(false));
  sourceModeButton.addEventListener("click", () => setMode("source"));
  visualModeButton.addEventListener("click", () => setMode("visual"));
  latexSnippetButtons.forEach((button) => {
    button.addEventListener("click", () => insertLatexSnippet(button.dataset.latexSnippet));
  });
  setupFileSplitter();
  setupSplitter();
  setupNotesPanel();
  setupTooltips();
  setupTerminalResize();
  setupTerminalTabsResize();
  setupCompileLogResize();
  setupFileOutlineResize();
  updateLogState();

  autoCompileToggle.checked = localStorage.getItem("latexStudioAutoCompile") === "true";
  autoCompileToggle.addEventListener("change", () => {
    localStorage.setItem("latexStudioAutoCompile", String(autoCompileToggle.checked));
    if (autoCompileToggle.checked) scheduleAutoCompile("Auto compile enabled");
    else {
      clearTimeout(autoCompileTimer);
      setCompileState("Auto compile paused");
    }
  });

  editor.addKeyMap({
    Tab(cm) {
      if (cm.somethingSelected()) cm.indentSelection("add");
      else cm.replaceSelection("  ", "end");
    },
    "Cmd-S": () => saveManuscript(),
    "Ctrl-S": () => saveManuscript(),
    "Cmd-F": () => openFind(),
    "Ctrl-F": () => openFind(),
    "Cmd-G": () => findNextMatch(false),
    "Ctrl-G": () => findNextMatch(false),
    "Shift-Cmd-G": () => findNextMatch(true),
    "Shift-Ctrl-G": () => findNextMatch(true),
    "Cmd-Enter": () => compileManuscript({ manual: true }),
    "Ctrl-Enter": () => compileManuscript({ manual: true })
  });

  // Handle this on the editor input itself so Shift+Enter consistently wins
  // over CodeMirror's newline handling in both normal and Vim modes.
  editor.getInputField().addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || !event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return;
    if (!isPythonExecutionFile()) return;
    event.preventDefault();
    event.stopPropagation();
    void runActivePythonCell();
  }, true);

  window.addEventListener("resize", () => {
    closeFileContextMenu();
    clearTimeout(pdfResizeTimer);
    pdfResizeTimer = setTimeout(() => renderPdf({ showLoading: false }), 180);
    scheduleTerminalFit();
    if (presentationScreen && !presentationScreen.hidden) {
      clearTimeout(pdfResizeTimer);
      pdfResizeTimer = setTimeout(() => renderPresentationSlide({ preserveSelection: true }), 120);
    }
  });
  window.addEventListener("click", () => {
    closeFileContextMenu();
    closeProjectContextMenu();
    closeSpellContextMenu();
    setProjectSortMenuOpen(false);
    if (pdfFileMenu) pdfFileMenu.hidden = true;
    if (!selectionCodexPopover.contains(document.activeElement)) hideSelectionCodexPopover();
  });
  window.addEventListener("scroll", () => {
    closeFileContextMenu();
    closeProjectContextMenu();
  }, true);
  document.addEventListener("keydown", handlePresentationHistoryShortcut, true);
  window.addEventListener("keydown", handleGlobalShortcut);
  document.addEventListener("copy", handlePresentationCopy);
  document.addEventListener("paste", (event) => {
    void handlePresentationPaste(event);
  });

  if (window.localOverleaf) {
    window.localOverleaf.onCommand((command) => {
      if (command === "add-project") toggleNewProjectPanel(true);
      if (command === "command-palette") openCommandPalette();
      if (command === "projects") showProjects();
      if (command === "save") {
        if (presentationScreen && !presentationScreen.hidden) saveActivePresentation();
        else saveManuscript();
      }
      if (command === "compile") compileManuscript({ manual: true });
      if (command === "open-pdf") openPdf();
      if (command === "reload") reloadFromDisk();
      if (command === "find") openFind();
      if (command === "find-next") findNextMatch(false);
      if (command === "find-previous") findNextMatch(true);
      if (command === "history") openHistoryWindow();
      if (command === "fullscreen-enter") document.body.classList.add("window-fullscreen");
      if (command === "fullscreen-leave") document.body.classList.remove("window-fullscreen");
    });
  }
}

function handleGlobalShortcut(event) {
  if (event.defaultPrevented) return;
  if (handlePresentationShortcut(event)) return;

  if (event.key === "Escape") {
    if (!selectionCodexPopover.hidden) {
      event.preventDefault();
      hideSelectionCodexPopover();
      editor.focus();
      return;
    }

    if (!commandPalette.hidden) {
      event.preventDefault();
      closeCommandPalette();
      return;
    }

    if (!templatesPanel.hidden) {
      event.preventDefault();
      closeTemplatesPanel();
      return;
    }

    if (!newProjectPanel.hidden) {
      event.preventDefault();
      closeNewProjectPanel();
      return;
    }

    if (sshProjectPanel && !sshProjectPanel.hidden) {
      event.preventDefault();
      closeSshProjectPanel();
      return;
    }

    if (projectSortMenu && !projectSortMenu.hidden) {
      event.preventDefault();
      setProjectSortMenuOpen(false);
      return;
    }

    if (projectContextMenu) {
      event.preventDefault();
      closeProjectContextMenu();
      return;
    }

    if (fileContextMenu) {
      event.preventDefault();
      closeFileContextMenu();
      return;
    }

    if (!settingsDrawer.hidden) {
      event.preventDefault();
      closeSettings();
      return;
    }
    return;
  }

  const shortcut = event.metaKey || event.ctrlKey;
  if (!shortcut) return;

  const key = event.key.toLowerCase();
  if (key === "p" && !event.shiftKey) {
    event.preventDefault();
    openCommandPalette();
    return;
  }

  if (key === "f" && !event.shiftKey) {
    event.preventDefault();
    openFind();
    return;
  }

  if (key === "g" && !event.altKey) {
    event.preventDefault();
    findNextMatch(event.shiftKey);
    return;
  }

  if (key === ",") {
    event.preventDefault();
    openSettings();
    return;
  }

  if (key === "s") {
    event.preventDefault();
    if (presentationScreen && !presentationScreen.hidden) saveActivePresentation();
    else saveManuscript();
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    compileManuscript({ manual: true });
    return;
  }

  if (!event.shiftKey) return;

  if (key === "f") {
    event.preventDefault();
    setFileSidebarVisible(workspace.classList.contains("files-hidden"));
    return;
  }

  if (key === "t") {
    event.preventDefault();
    setTerminalCollapsed(!terminalIsCollapsed());
    return;
  }

  if (key === "m") {
    event.preventDefault();
    setMode(visualEditor.hidden ? "visual" : "source");
  }
}

function openSettings() {
  closeCommandPalette();
  closeNewProjectPanel({ keepBackdrop: true });
  closeTemplatesPanel({ keepBackdrop: true });
  closeSshProjectPanel({ keepBackdrop: true });
  populateProjectSettingsForm();
  populateDefaultGithubForm();
  settingsBackdrop.hidden = false;
  settingsDrawer.hidden = false;
  const activeSection = nextAllowedSettingsSection(settingsDrawer.dataset.activeSection || "workspace");
  setSettingsPanel(activeSection);
  updateSettingsSearch();
}

function closeSettings({ keepBackdrop = false } = {}) {
  settingsDrawer.hidden = true;
  if (!keepBackdrop) updateOverlayBackdrop();
}

function closeOverlayModals() {
  closeCommandPalette();
  closeSettings({ keepBackdrop: true });
  closeNewProjectPanel({ keepBackdrop: true });
  closeTemplatesPanel({ keepBackdrop: true });
  closeSshProjectPanel({ keepBackdrop: true });
  updateOverlayBackdrop();
}

function updateOverlayBackdrop() {
  settingsBackdrop.hidden = settingsDrawer.hidden && newProjectPanel.hidden && templatesPanel.hidden && commandPalette.hidden && sshProjectPanel.hidden;
}

async function openTemplatesPanel() {
  closeCommandPalette();
  closeSettings({ keepBackdrop: true });
  closeNewProjectPanel({ keepBackdrop: true });
  closeSshProjectPanel({ keepBackdrop: true });
  settingsBackdrop.hidden = false;
  templatesPanel.hidden = false;
  templatesButton.classList.add("active");
  await loadTemplates();
}

function closeTemplatesPanel({ keepBackdrop = false } = {}) {
  templatesPanel.hidden = true;
  templatesButton.classList.remove("active");
  if (!keepBackdrop) updateOverlayBackdrop();
}

async function loadTemplates() {
  onlineTemplateGrid.innerHTML = '<div class="template-loading">Loading templates...</div>';
  customTemplateGrid.innerHTML = "";
  customTemplateEmpty.hidden = true;

  try {
    templateLibrary = await window.localOverleaf.listTemplates();
    renderTemplates();
  } catch (error) {
    onlineTemplateGrid.innerHTML = `<div class="template-loading project-error">${escapeHtml(formatError(error))}</div>`;
  }
}

function renderTemplates() {
  const visibleBuiltIns = (templateLibrary.builtIn || []).filter((template) => !hiddenBuiltInTemplates.includes(template.id));
  renderTemplateGrid(onlineTemplateGrid, visibleBuiltIns, { custom: false });
  renderTemplateGrid(customTemplateGrid, templateLibrary.custom || [], { custom: true });
  customTemplateEmpty.hidden = Boolean((templateLibrary.custom || []).length);
}

function readHiddenBuiltInTemplates() {
  try {
    const parsed = JSON.parse(localStorage.getItem(TEMPLATE_HIDDEN_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch (error) {
    return [];
  }
}

function writeHiddenBuiltInTemplates() {
  localStorage.setItem(TEMPLATE_HIDDEN_STORAGE_KEY, JSON.stringify(hiddenBuiltInTemplates));
}

function renderTemplateGrid(container, templates, { custom }) {
  container.innerHTML = "";
  templates.forEach((template) => {
    const card = document.createElement("article");
    card.className = "template-card";
    const previewKind = templatePreviewKind(template, custom);
    card.innerHTML = `
      <div class="template-preview template-preview-${escapeHtml(previewKind)}" aria-hidden="true">
        ${templatePreviewMarkup(previewKind)}
      </div>
      <div>
        <h4>${escapeHtml(template.name)}</h4>
        <small>${escapeHtml(template.sourceName || (custom ? "Custom template" : "Online template"))}</small>
      </div>
      <div class="template-card-actions">
        <button class="template-use-button" type="button">Use</button>
        ${template.sourceUrl ? `<button class="template-source-button" type="button" title="Open template source">${EXTERNAL_LINK_ICON_SVG}<span>Source</span></button>` : ""}
        <button class="template-remove-button template-trash-button" type="button" aria-label="Remove ${escapeHtml(template.name)}" title="Remove template">
          ${TRASH_ICON_SVG}
          <span class="visually-hidden">Remove</span>
        </button>
      </div>
    `;

    card.querySelector(".template-use-button").addEventListener("click", () => createProjectFromTemplate(template.id));
    const sourceButton = card.querySelector(".template-source-button");
    if (sourceButton) {
      sourceButton.addEventListener("click", () => window.localOverleaf.openExternalLink(template.sourceUrl));
    }
    const removeButton = card.querySelector(".template-remove-button");
    if (removeButton) {
      removeButton.addEventListener("click", () => (custom ? removeCustomTemplate(template) : hideBuiltInTemplate(template)));
    }
    container.appendChild(card);
    renderRealTemplatePreview(card, template, previewKind);
  });
}

function hideBuiltInTemplate(template) {
  const confirmed = window.confirm(`Remove "${template.name}" from the template browser?\n\nYou can restore it by clearing app preferences.`);
  if (!confirmed) return;
  hiddenBuiltInTemplates = Array.from(new Set([...hiddenBuiltInTemplates, template.id]));
  writeHiddenBuiltInTemplates();
  renderTemplates();
}

async function renderRealTemplatePreview(card, template, previewKind) {
  const preview = card.querySelector(".template-preview");
  if (!preview) return;
  let cachedImageIsSharp = false;
  if (template.previewImageUrl) {
    preview.classList.remove("template-preview-source");
    preview.classList.add("template-preview-pdf");
    const image = previewImageElement(template.previewImageUrl, `${template.name} preview`);
    preview.replaceChildren(image);
    try {
      await image.decode();
      cachedImageIsSharp = image.naturalWidth >= 720 || image.naturalHeight >= 900;
    } catch (error) {
      cachedImageIsSharp = false;
    }
    if (cachedImageIsSharp || !card.isConnected) return;
  } else {
    preview.innerHTML = templateSourcePreviewMarkup(template.previewText, previewKind);
    preview.classList.add("template-preview-source");
  }

  if (!window.localOverleaf.templatePreviewPdf) return;

  try {
    const [pdfjsLib, pdfBuffer] = await Promise.all([
      loadPdfJs(),
      window.localOverleaf.templatePreviewPdf(template.id)
    ]);
    if (!card.isConnected) return;

    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(pdfBuffer) });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    if (!card.isConnected) return;

    const baseViewport = page.getViewport({ scale: 1 });
    const fitWidth = Math.max(180, preview.clientWidth - 10) / baseViewport.width;
    const fitHeight = Math.max(220, preview.clientHeight - 10) / baseViewport.height;
    const viewport = page.getViewport({ scale: Math.min(fitWidth, fitHeight) });
    const outputScale = Math.min(Math.max(window.devicePixelRatio || 1, 4), 4);
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;

    const context = canvas.getContext("2d");
    context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
    preparePdfCanvasForRender(context, canvas);
    await page.render({ canvasContext: context, viewport, background: "#ffffff" }).promise;
    if (!card.isConnected) return;

    preview.classList.remove("template-preview-source");
    preview.classList.add("template-preview-pdf");
    preview.replaceChildren(canvas);
    if (window.localOverleaf.cacheTemplatePreview) {
      window.localOverleaf.cacheTemplatePreview(template.id, canvas.toDataURL("image/png")).catch(() => {});
    }
  } catch (error) {
    preview.dataset.previewError = formatError(error);
  }
}

function previewImageElement(src, alt = "") {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";
  return image;
}

function templatePreviewKind(template, custom) {
  const text = `${template.id || ""} ${template.name || ""} ${template.description || ""}`.toLowerCase();
  if (text.includes("beamer") || text.includes("presentation") || text.includes("poster")) return "slides";
  if (text.includes("cv") || text.includes("resume")) return "resume";
  if (text.includes("homework") || text.includes("cs 170") || text.includes("problem")) return "homework";
  if (text.includes("lab")) return "lab";
  if (text.includes("thesis") || text.includes("report")) return "report";
  if (custom) return "custom";
  return "paper";
}

function templateSourcePreviewMarkup(source, kind) {
  const title = extractTemplatePreviewTitle(source) || (kind === "slides" ? "Presentation" : "Template");
  const sections = Array.from(String(source || "").matchAll(/\\(?:section|chapter)\*?\{([^}]+)\}/g))
    .map((match) => latexToVisual(match[1]))
    .slice(0, 5);
  const bodyLines = String(source || "")
    .split("\n")
    .map((line) => latexToVisual(line).trim())
    .filter((line) => line && !line.startsWith("\\") && !line.startsWith("%"))
    .slice(0, 7);
  const previewLines = [
    ...sections.map((section) => ({ kind: "section", text: section })),
    ...bodyLines.map((line) => ({ kind: "body", text: line }))
  ].slice(0, 8);

  return `
    <div class="template-paper-preview">
      <strong>${escapeHtml(title)}</strong>
      ${previewLines.map((line) => `<span class="template-real-line ${line.kind === "section" ? "section" : ""}">${escapeHtml(line.text)}</span>`).join("")}
    </div>
  `;
}

function extractTemplatePreviewTitle(source) {
  const titleMatch = String(source || "").match(/\\title\{([^}]+)\}/);
  if (titleMatch) return latexToVisual(titleMatch[1]);
  const nameMatch = String(source || "").match(/\{\\LARGE\s+([^}]+)\}/);
  if (nameMatch) return latexToVisual(nameMatch[1]);
  return "";
}

function templatePreviewMarkup(kind) {
  if (kind === "slides") {
    return `
      <span class="template-slide-title"></span>
      <span class="template-slide-row wide"></span>
      <span class="template-slide-row"></span>
      <span class="template-slide-block"></span>
    `;
  }

  if (kind === "resume") {
    return `
      <span class="template-resume-name"></span>
      <span class="template-resume-contact"></span>
      <span class="template-section-line"></span>
      <span class="template-line wide"></span>
      <span class="template-line"></span>
      <span class="template-section-line"></span>
      <span class="template-line wide"></span>
    `;
  }

  const rows = kind === "homework"
    ? ["template-heading", "template-problem", "template-line wide", "template-line", "template-equation", "template-problem", "template-line wide"]
    : kind === "lab"
      ? ["template-heading", "template-line wide", "template-line", "template-table", "template-line wide", "template-line"]
      : kind === "report"
        ? ["template-heading", "template-toc", "template-line wide", "template-line", "template-section-line", "template-line wide"]
        : ["template-heading", "template-abstract", "template-line wide", "template-line", "template-section-line", "template-line wide", "template-line"];

  return rows.map((row) => `<span class="${row}"></span>`).join("");
}

async function importCustomTemplate() {
  setProjectBusy(true);
  try {
    templateLibrary = await window.localOverleaf.importTemplate();
    renderTemplates();
  } catch (error) {
    customTemplateGrid.innerHTML = `<div class="template-loading project-error">${escapeHtml(formatError(error))}</div>`;
    customTemplateEmpty.hidden = true;
  } finally {
    setProjectBusy(false);
  }
}

async function removeCustomTemplate(template) {
  const confirmed = window.confirm(`Remove "${template.name}" from your templates?\n\nThis will not delete any projects created from it.`);
  if (!confirmed) return;

  setProjectBusy(true);
  try {
    templateLibrary = await window.localOverleaf.removeTemplate(template.id);
    renderTemplates();
  } catch (error) {
    customTemplateGrid.innerHTML = `<div class="template-loading project-error">${escapeHtml(formatError(error))}</div>`;
    customTemplateEmpty.hidden = true;
  } finally {
    setProjectBusy(false);
  }
}

async function createProjectFromTemplate(templateId) {
  setProjectBusy(true);
  try {
    const result = await window.localOverleaf.createProjectFromTemplate(templateId);
    projects = result.projects || projects;
    renderProjectGrid();
    closeTemplatesPanel();
    if (result.project) await openProject(result.project.id);
  } catch (error) {
    onlineTemplateGrid.innerHTML = `<div class="template-loading project-error">${escapeHtml(formatError(error))}</div>`;
  } finally {
    setProjectBusy(false);
  }
}

function openCommandPalette(initialValue = "") {
  closeSettings({ keepBackdrop: true });
  closeNewProjectPanel({ keepBackdrop: true });
  closeTemplatesPanel({ keepBackdrop: true });
  closeSshProjectPanel({ keepBackdrop: true });
  settingsBackdrop.hidden = false;
  commandPalette.hidden = false;
  commandPaletteInput.value = initialValue;
  commandPaletteActiveIndex = 0;
  renderCommandPalette();
  requestAnimationFrame(() => {
    commandPaletteInput.focus();
    commandPaletteInput.select();
  });
}

function closeCommandPalette({ keepBackdrop = false } = {}) {
  commandPalette.hidden = true;
  commandPaletteItems = [];
  if (!keepBackdrop) updateOverlayBackdrop();
}

function renderCommandPalette() {
  const query = commandPaletteInput.value.trim();
  commandPaletteItems = buildCommandPaletteItems(query).slice(0, 10);
  commandPaletteActiveIndex = clampNumber(commandPaletteActiveIndex, 0, Math.max(commandPaletteItems.length - 1, 0), 0);
  commandPaletteList.innerHTML = "";

  commandPaletteItems.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "command-palette-item";
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", index === commandPaletteActiveIndex ? "true" : "false");
    button.innerHTML = `
      <span class="command-item-main">${escapeHtml(item.label)}</span>
      <span class="command-item-sub">${escapeHtml(item.detail || "")}</span>
      <kbd>${escapeHtml(item.hint || "")}</kbd>
    `;
    button.addEventListener("mouseenter", () => {
      commandPaletteActiveIndex = index;
      updateCommandPaletteSelection();
    });
    button.addEventListener("click", () => runCommandPaletteItem(item));
    commandPaletteList.appendChild(button);
  });

  if (!commandPaletteItems.length) {
    commandPaletteList.innerHTML = '<p class="command-empty">No commands found.</p>';
  }
}

function buildCommandPaletteItems(rawQuery) {
  const query = rawQuery.toLowerCase();
  const isOpenMode = query.startsWith("/open");
  const isHelpMode = query.startsWith("/help");
  const search = isOpenMode ? query.replace(/^\/open\s*/, "") : query.replace(/^\//, "");
  const commands = commandPaletteCommands();

  if (isHelpMode) {
    const helpSearch = query.replace(/^\/help\s*/, "");
    return commands
      .filter((item) => !helpSearch || `${item.label} ${item.detail} ${item.hint}`.toLowerCase().includes(helpSearch))
      .map((item) => ({
        ...item,
        detail: `${item.detail}${item.hint ? ` · ${item.hint}` : ""}`,
        hint: "run"
      }));
  }

  if (isOpenMode || rawQuery === "" || !rawQuery.startsWith("/")) {
    const projectItems = projects
      .filter((project) => {
        const haystack = `${project.name} ${project.texName} ${project.folderName}`.toLowerCase();
        return !search || haystack.includes(search);
      })
      .map((project) => ({
        id: `project:${project.id}`,
        label: project.displayName || project.name,
        detail: `${project.texName} · ${project.folderName}`,
        hint: "open",
        action: () => {
          closeCommandPalette();
          openProject(project.id);
        }
      }));

    if (isOpenMode) return projectItems;
    return [
      ...commands.filter((item) => !query || `${item.label} ${item.detail}`.toLowerCase().includes(query)),
      ...projectItems
    ];
  }

  return commands.filter((item) => `${item.label} ${item.detail}`.toLowerCase().includes(query));
}

function commandPaletteCommands() {
  return [
    { id: "help", label: "/help", detail: "Show available command palette actions", hint: "commands", action: () => openCommandPalette("/help ") },
    { id: "open", label: "/open", detail: "Open a project", hint: "projects", action: () => openCommandPalette("/open ") },
    { id: "new", label: "/new", detail: "Create a new project", hint: "project", action: () => { closeCommandPalette(); toggleNewProjectPanel(true); } },
    { id: "templates", label: "/templates", detail: "Browse and add LaTeX templates", hint: "library", action: () => { closeCommandPalette({ keepBackdrop: true }); openTemplatesPanel(); } },
    { id: "settings", label: "/settings", detail: "Open settings", hint: "Cmd+,", action: () => { closeCommandPalette({ keepBackdrop: true }); openSettings(); } },
    { id: "compile", label: "/compile", detail: "Compile the active PDF", hint: "Cmd+Enter", action: () => { closeCommandPalette(); compileManuscript({ manual: true }); } },
    { id: "save", label: "/save", detail: "Save the active TeX file", hint: "Cmd+S", action: () => { closeCommandPalette(); saveManuscript(); } },
    { id: "vim", label: "/vim", detail: `${vimModeEnabled ? "Disable" : "Enable"} Vim shortcuts`, hint: "toggle", action: () => { closeCommandPalette(); toggleVimMode(); } },
    { id: "minimap", label: "/minimap", detail: `${minimapVisible ? "Hide" : "Show"} the editor minimap`, hint: "toggle", action: () => { closeCommandPalette(); setMinimapVisible(!minimapVisible); } },
    { id: "relative", label: "/relative", detail: `${relativeLineNumbersEnabled ? "Disable" : "Enable"} relative line numbers`, hint: "toggle", action: () => { closeCommandPalette(); setRelativeLineNumbers(!relativeLineNumbersEnabled); } },
    { id: "wrap", label: "/wrap", detail: `${textWrappingEnabled ? "Disable" : "Enable"} editor text wrapping`, hint: "toggle", action: () => { closeCommandPalette(); setTextWrapping(!textWrappingEnabled); } },
    { id: "visual", label: "/visual", detail: "Switch to visual mode", hint: "view", action: () => { closeCommandPalette(); setMode("visual"); } },
    { id: "code", label: "/code", detail: "Switch to code mode", hint: "view", action: () => { closeCommandPalette(); setMode("source"); } },
    { id: "history", label: "/history", detail: "Open project history", hint: "window", action: () => { closeCommandPalette(); openHistoryWindow(); } },
    { id: "remote", label: "/ssh", detail: "Open a new SSH project", hint: "remote", action: () => { closeCommandPalette(); openSshProjectFlow(); } },
    { id: "terminal", label: "/terminal", detail: "Toggle terminal", hint: "panel", action: () => { closeCommandPalette(); setTerminalCollapsed(!sourcePane.classList.contains("terminal-collapsed")); } },
    { id: "files", label: "/files", detail: "Toggle file sidebar", hint: "sidebar", action: () => { closeCommandPalette(); setFileSidebarVisible(workspace.classList.contains("files-hidden")); } }
  ];
}

function updateCommandPaletteSelection() {
  Array.from(commandPaletteList.querySelectorAll(".command-palette-item")).forEach((item, index) => {
    item.setAttribute("aria-selected", index === commandPaletteActiveIndex ? "true" : "false");
  });
}

function handleCommandPaletteKeydown(event) {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    commandPaletteActiveIndex = commandPaletteItems.length ? (commandPaletteActiveIndex + 1) % commandPaletteItems.length : 0;
    updateCommandPaletteSelection();
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    commandPaletteActiveIndex = commandPaletteItems.length ? (commandPaletteActiveIndex - 1 + commandPaletteItems.length) % commandPaletteItems.length : 0;
    updateCommandPaletteSelection();
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    const item = commandPaletteItems[commandPaletteActiveIndex];
    if (item) runCommandPaletteItem(item);
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeCommandPalette();
  }
}

function runCommandPaletteItem(item) {
  if (item && typeof item.action === "function") item.action();
}

function hasOpenProjectContext() {
  return Boolean(activeProject && editorScreen && !editorScreen.hidden);
}

function settingsSectionAllowed(section) {
  if (!section || section === "remote") return false;
  if (section === "project" || section === "agents") return hasOpenProjectContext();
  return true;
}

function nextAllowedSettingsSection(section) {
  const exists = settingsPanels.some((panel) => panel.dataset.settingsPanel === section);
  if (exists && settingsSectionAllowed(section)) return section;
  return "workspace";
}

function setSettingsPanel(section) {
  const nextSection = nextAllowedSettingsSection(section);
  const title = {
    general: "General",
    appearance: "Appearance",
    voice: "Voice",
    profile: "Profile",
    workspace: "Workspace",
    project: "GitHub",
    remote: "Remote",
    latex: "LaTeX Handbook",
    agents: "AGENTS.md",
    documentation: "Documentation"
  }[nextSection] || "Settings";

  settingsDrawer.dataset.activeSection = nextSection;
  settingsTitle.textContent = title;
  settingsNavButtons.forEach((button) => {
    const sectionName = button.dataset.settingsSection;
    if (!sectionName) return;
    button.hidden = !settingsSectionAllowed(sectionName);
    button.classList.toggle("active", sectionName === nextSection);
  });
  updateSettingsNavGroups();
  settingsPanels.forEach((panel) => {
    const sectionName = panel.dataset.settingsPanel;
    const allowed = settingsSectionAllowed(sectionName);
    panel.hidden = !allowed;
    panel.classList.toggle("active", allowed && sectionName === nextSection);
  });

  if (nextSection === "agents") loadAgentsFile();
  updateSettingsSearch();
}

function clearSettingsSearch() {
  if (!settingsSearchInput || !settingsSearchInput.value) return;
  settingsSearchInput.value = "";
  updateSettingsSearch();
}

function updateSettingsSearch() {
  if (!settingsSearchInput || !settingsSearchEmpty) return;

  const query = settingsSearchInput.value.trim().toLowerCase();
  const activeSection = nextAllowedSettingsSection(settingsDrawer.dataset.activeSection || "general");
  settingsDrawer.classList.toggle("settings-searching", Boolean(query));
  let visibleCount = 0;

  settingsPanels.forEach((panel) => {
    const sectionName = panel.dataset.settingsPanel;
    const allowed = settingsSectionAllowed(sectionName);
    if (!allowed) {
      panel.hidden = true;
      panel.classList.remove("active");
      return;
    }

    let panelMatches = 0;
    const rows = Array.from(panel.querySelectorAll(".setting-row, .setting-column, .settings-action-row, .settings-action-button, .settings-status, .shortcut-list > div"));
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      const matches = !query || text.includes(query);
      row.hidden = Boolean(query && !matches);
      row.classList.toggle("settings-search-match", Boolean(query && matches));
      if (matches) panelMatches += 1;
    });

    if (query) {
      const showPanel = panelMatches > 0;
      panel.hidden = !showPanel;
      panel.classList.toggle("active", showPanel);
      if (showPanel) visibleCount += panelMatches;
    } else {
      panel.hidden = false;
      panel.classList.toggle("active", sectionName === activeSection);
      rows.forEach((row) => {
        row.hidden = false;
        row.classList.remove("settings-search-match");
      });
    }
  });

  settingsNavButtons.forEach((button) => {
    const sectionName = button.dataset.settingsSection;
    if (!sectionName) return;
    const allowed = settingsSectionAllowed(sectionName);
    if (!query) {
      button.hidden = !allowed;
      button.classList.toggle("active", allowed && sectionName === activeSection);
      return;
    }
    const panel = settingsPanels.find((item) => item.dataset.settingsPanel === sectionName);
    button.hidden = !allowed || !panel || panel.hidden;
  });
  updateSettingsNavGroups();

  settingsSearchEmpty.hidden = !query || visibleCount > 0;
}

function updateSettingsNavGroups() {
  if (!settingsDrawer) return;
  settingsDrawer.querySelectorAll(".settings-nav-group").forEach((group) => {
    const buttons = Array.from(group.querySelectorAll(".settings-nav-button"));
    if (!buttons.length) return;
    group.hidden = buttons.every((button) => button.hidden);
  });
}

function openFind() {
  if (editorScreen.hidden) {
    projectSearch.focus();
    projectSearch.select();
    return;
  }
  if (activeMediaFile) return;

  closeSettings();
  setMode("source");
  requestAnimationFrame(() => {
    editor.focus();
    const query = window.prompt("Find in current file", lastFindQuery);
    if (query === null) return;
    highlightFindMatches(query);
    findNextTextMatch(query, false);
  });
}

function findNextMatch(reverse = false) {
  if (editorScreen.hidden) {
    projectSearch.focus();
    projectSearch.select();
    return;
  }
  if (activeMediaFile) return;

  setMode("source");
  requestAnimationFrame(() => {
    editor.focus();
    if (!lastFindQuery) openFind();
    else findNextTextMatch(lastFindQuery, reverse);
  });
}

function clearFindHighlights() {
  findHighlightMarks.forEach((mark) => mark.clear());
  findHighlightMarks = [];
}

function highlightFindMatches(query) {
  clearFindHighlights();
  lastFindQuery = String(query || "");
  if (!lastFindQuery) return;

  const cursor = editor.getSearchCursor(lastFindQuery, { line: 0, ch: 0 }, { caseFold: true });
  while (cursor.findNext()) {
    findHighlightMarks.push(editor.markText(cursor.from(), cursor.to(), { className: "cm-searching-all" }));
  }
}

function findNextTextMatch(query, reverse = false) {
  if (!query) return;
  lastFindQuery = query;
  const cursorPosition = editor.getCursor();
  const start = reverse
    ? { line: cursorPosition.line, ch: Math.max(0, cursorPosition.ch - 1) }
    : { line: cursorPosition.line, ch: cursorPosition.ch + 1 };
  let cursor = editor.getSearchCursor(query, start, { caseFold: true });
  let found = reverse ? cursor.findPrevious() : cursor.findNext();

  if (!found) {
    cursor = editor.getSearchCursor(query, reverse ? CodeMirror.Pos(editor.lastLine()) : CodeMirror.Pos(editor.firstLine(), 0), { caseFold: true });
    found = reverse ? cursor.findPrevious() : cursor.findNext();
  }

  if (!found) return;
  editor.setSelection(cursor.from(), cursor.to());
  editor.scrollIntoView(cursor.from(), 96);
}

function scheduleSpellGrammarCheck() {
  clearTimeout(spellCheckTimer);
  if (!spellCheckEnabled || !editor || activeMediaFile) {
    clearSpellGrammarMarks();
    return;
  }
  spellCheckTimer = setTimeout(runSpellGrammarCheck, 260);
}

function clearSpellGrammarMarks() {
  spellIssueMarks.forEach((issue) => issue.mark.clear());
  spellIssueMarks = [];
  closeSpellContextMenu();
}

function runSpellGrammarCheck() {
  clearSpellGrammarMarks();
  if (!spellCheckEnabled || !editor || activeMediaFile) return;

  const lines = editor.getValue().split("\n");
  const maxLines = Math.min(lines.length, 1200);
  for (let lineIndex = 0; lineIndex < maxLines; lineIndex += 1) {
    const line = lines[lineIndex];
    markRepeatedWords(line, lineIndex);
    markKnownTypos(line, lineIndex);
  }
}

function markRepeatedWords(line, lineIndex) {
  const repeatRegex = /\b([A-Za-z][A-Za-z'-]{2,})\s+\1\b/gi;
  let match;
  while ((match = repeatRegex.exec(line))) {
    const duplicateStart = match.index + match[0].toLowerCase().lastIndexOf(match[1].toLowerCase());
    addSpellIssue({
      from: { line: lineIndex, ch: duplicateStart },
      to: { line: lineIndex, ch: duplicateStart + match[1].length },
      word: match[1],
      kind: "grammar",
      message: "Repeated word",
      suggestions: []
    });
  }
}

function markKnownTypos(line, lineIndex) {
  const wordRegex = /\b[A-Za-z][A-Za-z'-]{2,}\b/g;
  let match;
  while ((match = wordRegex.exec(line))) {
    const word = match[0];
    const lower = word.toLowerCase().replace(/^'+|'+$/g, "");
    if (SPELL_IGNORED_WORDS.has(lower)) continue;
    if (!SPELL_SUGGESTIONS.has(lower)) continue;
    if (line[Math.max(0, match.index - 1)] === "\\") continue;

    addSpellIssue({
      from: { line: lineIndex, ch: match.index },
      to: { line: lineIndex, ch: match.index + word.length },
      word,
      kind: "spelling",
      message: "Possible spelling issue",
      suggestions: SPELL_SUGGESTIONS.get(lower).map((suggestion) => matchWordCase(word, suggestion))
    });
  }
}

function addSpellIssue(issue) {
  const mark = editor.markText(issue.from, issue.to, {
    className: `cm-spell-issue cm-spell-${issue.kind}`,
    title: issue.message
  });
  spellIssueMarks.push({ ...issue, mark });
}

function matchWordCase(original, suggestion) {
  if (original === original.toUpperCase()) return suggestion.toUpperCase();
  if (original[0] === original[0].toUpperCase()) return `${suggestion[0].toUpperCase()}${suggestion.slice(1)}`;
  return suggestion;
}

function handleEditorContextMenu(event) {
  if (!spellCheckEnabled || !editor) return;
  const coords = { left: event.clientX, top: event.clientY };
  const pos = editor.coordsChar(coords, "window");
  const issue = spellIssueAt(pos);
  if (!issue) return;

  event.preventDefault();
  event.stopPropagation();
  showSpellContextMenu(event, issue);
}

function spellIssueAt(pos) {
  return spellIssueMarks.find((issue) => {
    const range = issue.mark.find();
    if (!range) return false;
    if (pos.line < range.from.line || pos.line > range.to.line) return false;
    if (pos.line === range.from.line && pos.ch < range.from.ch) return false;
    if (pos.line === range.to.line && pos.ch > range.to.ch) return false;
    return true;
  });
}

function showSpellContextMenu(event, issue) {
  closeSpellContextMenu();
  const menu = document.createElement("div");
  menu.className = "spell-context-menu";
  menu.setAttribute("role", "menu");

  const title = document.createElement("div");
  title.className = "spell-context-title";
  title.textContent = issue.message;
  menu.appendChild(title);

  const suggestions = issue.kind === "grammar"
    ? [{ label: "Remove duplicate word", value: "" }]
    : issue.suggestions.map((value) => ({ label: value, value }));

  suggestions.forEach((suggestion) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = suggestion.label;
    button.addEventListener("click", () => {
      applySpellSuggestion(issue, suggestion.value);
      closeSpellContextMenu();
    });
    menu.appendChild(button);
  });

  const ignoreButton = document.createElement("button");
  ignoreButton.type = "button";
  ignoreButton.textContent = "Ignore";
  ignoreButton.addEventListener("click", () => {
    issue.mark.clear();
    spellIssueMarks = spellIssueMarks.filter((item) => item !== issue);
    closeSpellContextMenu();
  });
  menu.appendChild(ignoreButton);

  document.body.appendChild(menu);
  const left = clampNumber(event.clientX, 8, window.innerWidth - menu.offsetWidth - 8, 8);
  const top = clampNumber(event.clientY, 8, window.innerHeight - menu.offsetHeight - 8, 8);
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  spellContextMenu = menu;
}

function applySpellSuggestion(issue, replacement) {
  const range = issue.mark.find();
  if (!range) return;
  const nextText = issue.kind === "grammar" && !replacement ? "" : replacement;
  editor.replaceRange(nextText, range.from, range.to);
  scheduleSpellGrammarCheck();
}

function closeSpellContextMenu() {
  if (spellContextMenu) spellContextMenu.remove();
  spellContextMenu = null;
}

function changePdfZoom(delta) {
  setPdfZoom(Math.round((pdfZoom + delta) * 10) / 10, { render: false, live: true });
  schedulePdfZoomRender(80);
}

function fitPdfToBoundaries() {
  const pageShell = pdfViewer.querySelector(".pdf-page");
  if (!pageShell) return;
  const viewerStyles = getComputedStyle(pdfViewer);
  const available = pdfViewer.clientWidth
    - Number.parseFloat(viewerStyles.paddingLeft || "0")
    - Number.parseFloat(viewerStyles.paddingRight || "0");
  const pageWidth = pageShell.getBoundingClientRect().width;
  if (!(available > 0) || !(pageWidth > 0)) return;
  setPdfZoom(pdfZoom * (available / pageWidth));
}

function setPdfZoom(value, { render = true, live = false } = {}) {
  pdfZoom = clampNumber(value, MIN_PDF_ZOOM, MAX_PDF_ZOOM, DEFAULT_PDF_ZOOM);
  localStorage.setItem("latexStudioPdfZoom", String(pdfZoom));
  updatePdfZoomLabel();
  if (live) applyPdfLiveZoom();
  if (render) renderPdf({ showLoading: false });
}

function schedulePdfZoomRender(delay = 220) {
  clearTimeout(pdfZoomGestureTimer);
  pdfZoomGestureTimer = setTimeout(() => renderPdf({ showLoading: false }), delay);
}

function handlePdfWheelZoom(event) {
  if (!event.ctrlKey && !event.metaKey) handlePdfSpeechManualNavigation();
  if (event.shiftKey && !event.metaKey && !event.ctrlKey) {
    event.preventDefault();
    pdfViewer.scrollLeft += event.deltaY || event.deltaX;
    return;
  }

  if (!event.ctrlKey && !event.metaKey) return;

  event.preventDefault();
  event.stopPropagation();
  const wheelDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
  const factor = Math.exp(-wheelDelta * 0.003);
  setPdfZoom(pdfZoom * factor, { render: false, live: true });
  schedulePdfZoomRender();
}

function handlePdfGestureStart(event) {
  event.preventDefault();
  event.stopPropagation();
  pdfGestureStartZoom = pdfZoom;
}

function handlePdfGestureChange(event) {
  event.preventDefault();
  event.stopPropagation();
  const scale = Number(event.scale) || 1;
  setPdfZoom(pdfGestureStartZoom * scale, { render: false, live: true });
  schedulePdfZoomRender();
}

function handlePdfGestureEnd(event) {
  event.preventDefault();
  event.stopPropagation();
  schedulePdfZoomRender(80);
}

function updatePdfZoomLabel() {
  pdfZoomLabel.textContent = `${Math.round(pdfZoom * 100)}%`;
}

function applyPdfLiveZoom() {
  const pages = Array.from(pdfViewer.querySelectorAll(".pdf-page"));
  if (!pages.length || !renderedPdfZoom) return;

  const ratio = pdfZoom / renderedPdfZoom;
  const oldScrollWidth = Math.max(pdfViewer.scrollWidth, 1);
  const oldScrollHeight = Math.max(pdfViewer.scrollHeight, 1);
  const centerX = pdfViewer.scrollLeft + pdfViewer.clientWidth / 2;
  const centerY = pdfViewer.scrollTop + pdfViewer.clientHeight / 2;

  pages.forEach((pageShell) => {
    const canvas = pageShell.querySelector("canvas");
    const renderedWidth = Number(pageShell.dataset.renderedWidth);
    const renderedHeight = Number(pageShell.dataset.renderedHeight);
    if (!canvas || !renderedWidth || !renderedHeight) return;

    const width = Math.floor(renderedWidth * ratio);
    const height = Math.floor(renderedHeight * ratio);
    pageShell.style.width = `${width}px`;
    pageShell.style.height = `${height}px`;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const linkLayer = pageShell.querySelector(".pdf-link-layer");
    if (linkLayer) {
      linkLayer.style.transform = ratio === 1 ? "" : `scale(${ratio})`;
    }
    const speechLayer = pageShell.querySelector(".pdf-speech-highlight-layer");
    if (speechLayer) {
      speechLayer.style.transform = ratio === 1 ? "" : `scale(${ratio})`;
    }
    const textLayer = pageShell.querySelector(".pdf-text-layer");
    if (textLayer) {
      textLayer.style.transform = ratio === 1 ? "" : `scale(${ratio})`;
    }
  });

  pdfViewer.scrollLeft = (centerX / oldScrollWidth) * pdfViewer.scrollWidth - pdfViewer.clientWidth / 2;
  pdfViewer.scrollTop = (centerY / oldScrollHeight) * pdfViewer.scrollHeight - pdfViewer.clientHeight / 2;
}

function updateSaveButtonVisibility() {
  if (saveButton) saveButton.hidden = autoSaveToggle.checked;
}

function setProjectView(view) {
  projectViewMode = view === "rows" ? "rows" : "grid";
  localStorage.setItem("latexStudioProjectView", projectViewMode);
  updateProjectViewButtons();
  renderProjectGrid();
}

function setProjectSort(mode) {
  projectSortMode = normalizeProjectSortMode(mode);
  localStorage.setItem("latexStudioProjectSort", projectSortMode);
  updateProjectSortControl();
  renderProjectGrid();
}

function normalizeProjectSortMode(mode) {
  return ["favorites", "recent", "name-asc", "name-desc", "folder", "tex"].includes(mode) ? mode : "favorites";
}

function projectSortLabel(mode = projectSortMode) {
  return {
    favorites: "Favorites first",
    recent: "Recently edited",
    "name-asc": "Name A-Z",
    "name-desc": "Name Z-A",
    folder: "Folder",
    tex: "TeX file"
  }[normalizeProjectSortMode(mode)] || "Favorites first";
}

function updateProjectSortControl() {
  if (projectSortButton) {
    projectSortButton.title = `Sort: ${projectSortLabel()}`;
    projectSortButton.setAttribute("aria-label", `Sort documents: ${projectSortLabel()}`);
  }
  if (projectSortMenu) {
    projectSortMenu.querySelectorAll("[data-project-sort]").forEach((button) => {
      const active = button.dataset.projectSort === projectSortMode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-checked", String(active));
    });
  }
}

function setProjectSortMenuOpen(open) {
  if (!projectSortButton || !projectSortMenu) return;
  const next = Boolean(open);
  projectSortMenu.hidden = !next;
  projectSortButton.setAttribute("aria-expanded", String(next));
}

function toggleProjectSortMenu(event) {
  if (event) event.stopPropagation();
  if (!projectSortMenu) return;
  setProjectSortMenuOpen(projectSortMenu.hidden);
}

function updateProjectViewButtons() {
  projectGridButton.classList.toggle("active", projectViewMode === "grid");
  projectRowsButton.classList.toggle("active", projectViewMode === "rows");
  projectGrid.classList.toggle("rows-view", projectViewMode === "rows");
}

function applyPdfRenderMode() {
  pdfViewer.classList.toggle("pdf-dark-render", pdfDarkMode && pdfRenderMode !== "original");
  pdfViewer.classList.toggle("pdf-invert-pages", pdfDarkMode && pdfRenderMode === "invert");
  if (pdfThumbnailList) {
    pdfThumbnailList.classList.toggle("pdf-dark-render", pdfDarkMode && pdfRenderMode !== "original");
    pdfThumbnailList.classList.toggle("pdf-invert-pages", pdfDarkMode && pdfRenderMode === "invert");
  }
}

function setupTerminalPanel() {
  if (!window.localOverleaf || !window.Terminal || !window.FitAddon) return;

  window.localOverleaf.onTerminalData(({ id, data }) => {
    if (sshAuthSession && sshAuthSession.id === id) {
      sshAuthSession.term.write(data);
      return;
    }
    const session = terminalSessions.find((item) => item.id === id);
    if (session) {
      session.term.write(data);
      trackAgentTerminalOutput(session, data);
    }
  });

  window.localOverleaf.onTerminalExit(({ id, code, signal }) => {
    if (sshAuthSession && sshAuthSession.id === id) {
      sshAuthSession.exited = true;
      sshAuthSession.term.writeln("");
      if (Number(code) === 0 && !signal) {
        sshAuthSession.term.writeln("\x1b[38;5;70m[ssh authentication complete]\x1b[0m");
      } else {
        sshAuthSession.term.writeln(`\x1b[38;5;203m[ssh authentication failed: ${signal || code || "unknown"}]\x1b[0m`);
      }
      if (sshAuthSession.resolve) sshAuthSession.resolve({ code, signal });
      return;
    }

    const session = terminalSessions.find((item) => item.id === id);
    if (!session) {
      pendingTerminalExits.set(id, { code, signal });
      setTimeout(() => pendingTerminalExits.delete(id), 5000);
      return;
    }

    session.exited = true;
    session.term.writeln("");
    session.term.writeln(`\x1b[38;5;244m[process exited: ${signal || code || 0}]\x1b[0m`);
    if (isCompileAgentSession(session) && Number(code) === 0 && !signal) {
      finishAgentTurn(session.id, { force: true });
    }
    renderTerminalTabs();
  });
}

function isCompileAgentSession(session) {
  return Boolean(session && (session.kind === "codex" || session.kind === "claude"));
}

function markAgentTurnStarted(session) {
  if (!isCompileAgentSession(session)) return;
  clearTimeout(session.agentCompileTimer);
  session.agentCompileTimer = null;
  session.agentTurnPending = true;
  session.agentOutputSeen = false;
  session.agentTurnStartedAt = Date.now();
}

function trackAgentTerminalOutput(session, data) {
  if (!isCompileAgentSession(session) || !session.agentTurnPending || !String(data || "").length) return;
  session.agentOutputSeen = true;
  clearTimeout(session.agentCompileTimer);
  const minimumRemaining = Math.max(0, AGENT_TURN_MINIMUM_MS - (Date.now() - session.agentTurnStartedAt));
  session.agentCompileTimer = setTimeout(
    () => finishAgentTurn(session.id),
    Math.max(AGENT_OUTPUT_IDLE_MS, minimumRemaining)
  );
}

async function finishAgentTurn(id, { force = false } = {}) {
  const session = terminalSessions.find((item) => item.id === id);
  if (!isCompileAgentSession(session) || !session.agentTurnPending || (!force && !session.agentOutputSeen)) return false;

  clearTimeout(session.agentCompileTimer);
  session.agentCompileTimer = null;
  session.agentTurnPending = false;

  if (!activeProject || (session.projectId && session.projectId !== activeProject.id)) return false;
  if (!activeMediaFile && getSourceText() !== savedText) {
    compileLog.textContent = "Agent finished. Save or reload the editor changes before compiling.";
    return false;
  }

  compileLog.textContent = "Agent finished. Syncing files and compiling...";
  await pollExternalSourceUpdate();
  await compileManuscript({ manual: false });
  return true;
}

async function createTerminalSession(kind = "shell") {
  if (!window.localOverleaf || !window.Terminal || !window.FitAddon) return;

  const requestedKind = ["shell", "codex", "claude", "ssh"].includes(kind) ? kind : "shell";
  if (requestedKind === "ssh" && !remoteWorkspace.host) {
    await openSshProjectFlow({ startTerminal: false });
    if (!remoteWorkspace.host) return null;
  }
  terminalEmpty.hidden = true;
  setTerminalControlsDisabled(true);

  try {
    const terminalProjectId = isRemoteProject() ? null : activeProject && activeProject.id;
    const descriptor = await window.localOverleaf.createTerminal(terminalProjectId, requestedKind, {
      remote: remoteWorkspace
    });
    const sessionIndex = nextTerminalIndex(requestedKind);
    const terminalNode = document.createElement("div");
    terminalNode.className = "terminal-instance";
    terminalNode.hidden = true;
    terminalBody.appendChild(terminalNode);

    const term = new Terminal({
      allowProposedApi: false,
      convertEol: true,
      cursorBlink: true,
      fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
      fontSize: 12,
      lineHeight: 1.25,
      rows: 12,
      scrollback: 5000,
      theme: terminalTheme()
    });
    const fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalNode);

    const session = {
      id: descriptor.id,
      index: sessionIndex,
      title: `${descriptor.title} ${sessionIndex}`,
      commandLabel: descriptor.commandLabel,
      cwd: descriptor.cwd,
      projectId: terminalProjectId,
      kind: requestedKind,
      term,
      fitAddon,
      node: terminalNode,
      exited: false,
      agentTurnPending: false,
      agentOutputSeen: false,
      agentTurnStartedAt: 0,
      agentCompileTimer: null,
      readyAt: Date.now() + (requestedKind === "codex" ? 1500 : requestedKind === "claude" ? 1200 : 350)
    };

    term.onData((data) => {
      if (/[\r\n]/.test(data)) markAgentTurnStarted(session);
      window.localOverleaf.writeTerminal(session.id, data);
    });
    term.onResize(({ cols, rows }) => window.localOverleaf.resizeTerminal(session.id, cols, rows));
    term.writeln(`\x1b[38;5;214m${descriptor.commandLabel}\x1b[0m`);
    term.writeln(`\x1b[38;5;244m${descriptor.cwd}\x1b[0m`);

    terminalSessions.push(session);
    renderTerminalTabs();
    activateTerminal(session.id);
    return session;
  } catch (error) {
    terminalEmpty.hidden = false;
    terminalEmpty.textContent = formatError(error);
    return null;
  } finally {
    setTerminalControlsDisabled(false);
  }
}

function renderTerminalTabs() {
  terminalTabs.innerHTML = "";
  terminalEmpty.hidden = terminalSessions.length > 0;

  terminalSessions.forEach((session) => {
    const button = document.createElement("button");
    button.className = "terminal-tab";
    button.classList.toggle("active", session.id === activeTerminalId);
    button.classList.toggle("exited", session.exited);
    button.type = "button";
    button.draggable = true;
    button.dataset.terminalId = session.id;
    button.innerHTML = `
      <span class="terminal-tab-kind terminal-tab-kind-${escapeHtml(session.kind)}" aria-hidden="true">${terminalKindIcon(session.kind)}</span>
      <span class="terminal-tab-title">${escapeHtml(session.title)}</span>
      <span class="terminal-tab-close" role="button" aria-label="Close terminal" title="Close terminal">${CLOSE_ICON_SVG}</span>
    `;
    button.addEventListener("click", () => activateTerminal(session.id));
    button.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", session.id);
      event.dataTransfer.effectAllowed = "move";
    });
    button.addEventListener("dragover", (event) => {
      event.preventDefault();
      button.classList.add("drop-target");
    });
    button.addEventListener("dragleave", () => button.classList.remove("drop-target"));
    button.addEventListener("drop", (event) => {
      event.preventDefault();
      button.classList.remove("drop-target");
      splitTerminals(event.dataTransfer.getData("text/plain"), session.id);
    });
    button.querySelector(".terminal-tab-close").addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeTerminalSession(session.id);
    });
    terminalTabs.appendChild(button);
  });
}

function terminalKindIcon(kind) {
  if (kind === "codex") {
    return `
      <svg class="terminal-brand-icon openai-mark" viewBox="0 0 16 16">
        <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 3.234.41l-.096.054-3.23 1.838a.53.53 0 0 0-.265.455zm.742-1.577 1.758-1 1.762 1v2l-1.755 1-1.762-1z"></path>
      </svg>`;
  }
  if (kind === "claude") {
    return `
      <svg class="terminal-brand-icon anthropic-mark" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M9.218 2h2.402L16 12.987h-2.402zM4.379 2h2.512l4.38 10.987H8.82l-.895-2.308h-4.58l-.896 2.307H0L4.38 2.001zm2.755 6.64L5.635 4.777 4.137 8.64z"></path>
      </svg>`;
  }
  if (kind === "ssh") return "SSH";
  return ">";
}

function nextTerminalIndex(kind) {
  const used = new Set(terminalSessions
    .filter((session) => session.kind === kind)
    .map((session) => session.index));
  let index = 1;
  while (used.has(index)) index += 1;
  return index;
}

function activateTerminal(id) {
  activeTerminalId = id;
  if (!splitTerminalIds.includes(id)) splitTerminalIds = [id];
  updateTerminalVisibility();
  renderTerminalTabs();
  scheduleTerminalFit();
}

function splitTerminals(firstId, secondId) {
  if (!firstId || !secondId || firstId === secondId) {
    activateTerminal(secondId || firstId);
    return;
  }

  const ids = [firstId, secondId].filter((id) => terminalSessions.some((session) => session.id === id));
  if (ids.length < 2) return;

  splitTerminalIds = ids;
  activeTerminalId = secondId;
  updateTerminalVisibility();
  renderTerminalTabs();
  scheduleTerminalFit();
}

async function splitActiveTerminal() {
  const baseId = activeTerminalId;
  const session = await createTerminalSession("shell");
  if (!session) return;

  const nextIds = [
    ...splitTerminalIds,
    baseId,
    session.id
  ].filter(Boolean);
  splitTerminalIds = Array.from(new Set(nextIds))
    .filter((id) => terminalSessions.some((item) => item.id === id && !item.exited));
  activeTerminalId = session.id;
  updateTerminalVisibility();
  renderTerminalTabs();
  scheduleTerminalFit();
}

function toggleTerminalMaximized() {
  const host = terminalLayoutHost();
  const maximizeClass = presentationTerminalIsActive() ? "pptx-terminal-maximized" : "terminal-maximized";
  const maximized = host.classList.toggle(maximizeClass);
  if (maximized) {
    setTerminalCollapsed(false);
    setTerminalHeight(Math.max(MIN_TERMINAL_HEIGHT, host.getBoundingClientRect().height - 116), { persist: false });
  } else {
    const height = clampNumber(Number(localStorage.getItem("latexStudioTerminalHeight")), MIN_TERMINAL_HEIGHT, MAX_TERMINAL_HEIGHT, DEFAULT_TERMINAL_HEIGHT);
    setTerminalHeight(height);
  }
  scheduleTerminalFit();
}

function updateTerminalVisibility() {
  const visibleIds = new Set(splitTerminalIds.length ? splitTerminalIds : [activeTerminalId].filter(Boolean));
  terminalBody.classList.toggle("terminal-split", visibleIds.size > 1);
  terminalBody.style.setProperty("--terminal-split-count", String(Math.max(1, visibleIds.size)));
  terminalSessions.forEach((session) => {
    session.node.hidden = !visibleIds.has(session.id);
    session.node.classList.toggle("split-active", visibleIds.has(session.id));
  });
}

async function closeTerminalSession(id) {
  const session = terminalSessions.find((item) => item.id === id);
  if (!session) return;

  if (!session.exited) {
    session.term.writeln("");
    session.term.writeln("\x1b[38;5;203m[terminating]\x1b[0m");

    try {
      await window.localOverleaf.killTerminal(session.id);
    } catch (error) {
      session.term.writeln(formatError(error));
      return;
    }
  }

  removeTerminalSession(session.id);
}

function removeTerminalSession(id) {
  const index = terminalSessions.findIndex((item) => item.id === id);
  if (index === -1) return;

  const [session] = terminalSessions.splice(index, 1);
  clearTimeout(session.agentCompileTimer);
  session.term.dispose();
  session.node.remove();

  if (activeTerminalId === id) {
    const nextSession = terminalSessions[Math.max(0, index - 1)] || terminalSessions[0];
    activeTerminalId = nextSession ? nextSession.id : null;
  }

  splitTerminalIds = splitTerminalIds.filter((item) => item !== id && terminalSessions.some((session) => session.id === item));
  if (!splitTerminalIds.length && activeTerminalId) splitTerminalIds = [activeTerminalId];
  updateTerminalVisibility();
  renderTerminalTabs();
  terminalEmpty.hidden = terminalSessions.length > 0;
  scheduleTerminalFit();
}

function scheduleTerminalFit() {
  clearTimeout(terminalFitTimer);
  terminalFitTimer = setTimeout(fitActiveTerminal, 80);
}

function fitActiveTerminal() {
  const visibleIds = new Set(splitTerminalIds.length ? splitTerminalIds : [activeTerminalId].filter(Boolean));
  terminalSessions.forEach((session) => {
    if (!visibleIds.has(session.id) || session.node.hidden) return;

    try {
      session.fitAddon.fit();
      if (session.id === activeTerminalId) session.term.focus();
    } catch (error) {
      // xterm can report zero dimensions while the app is switching views.
    }
  });
}

function refreshTerminalThemes() {
  terminalSessions.forEach((session) => {
    session.term.options.theme = terminalTheme();
  });
}

function terminalTheme() {
  const dark = resolvedTerminalTheme() === "dark";
  const accentRgb = themeColor("--accent-rgb", "249, 115, 22");
  const transparent = document.body.classList.contains("transparent-theme");
  return {
    background: transparent ? "rgba(0, 0, 0, 0)" : themeColor("--terminal-bg", dark ? "#111827" : "#ffffff"),
    foreground: themeColor("--terminal-text", dark ? "#e5edf7" : "#1f2937"),
    cursor: dark ? "#ffffff" : themeColor("--accent", DEFAULT_ACCENT),
    selectionBackground: themeColor("--terminal-selection", `rgba(${accentRgb}, 0.2)`),
    black: dark ? themeColor("--bg", "#111827") : themeColor("--cm-text", "#1f2937"),
    red: themeColor("--red", "#ef4444"),
    green: themeColor("--green", "#22c55e"),
    yellow: dark ? "#fbbf24" : "#b45309",
    blue: themeColor("--blue", "#60a5fa"),
    magenta: dark ? "#c084fc" : "#7c3aed",
    cyan: dark ? "#22d3ee" : "#0891b2",
    white: dark ? "#e5e7eb" : "#f8fafc",
    brightBlack: themeColor("--muted", "#6b7280"),
    brightRed: themeColor("--red", "#f87171"),
    brightGreen: themeColor("--green", "#4ade80"),
    brightYellow: dark ? "#fde68a" : "#92400e",
    brightBlue: themeColor("--blue", "#93c5fd"),
    brightMagenta: dark ? "#d8b4fe" : "#6d28d9",
    brightCyan: dark ? "#67e8f9" : "#0e7490",
    brightWhite: "#ffffff"
  };
}

function themeColor(name, fallback) {
  const bodyValue = getComputedStyle(document.body).getPropertyValue(name).trim();
  const rootValue = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return bodyValue || rootValue || fallback;
}

function setTerminalControlsDisabled(value) {
  terminalNewButton.disabled = value;
  terminalRemoteButton.disabled = value;
  terminalShellButton.disabled = value;
  terminalCodexButton.disabled = value;
  terminalClaudeButton.disabled = value;
  terminalSplitButton.disabled = value;
}

function scheduleSelectionCodexPopover() {
  clearTimeout(selectionCodexTimer);
  selectionCodexTimer = setTimeout(updateSelectionCodexPopover, 80);
}

function updateSelectionCodexPopover() {
  if (!editor || editorScreen.hidden || workspace.classList.contains("source-hidden") || !visualEditor.hidden) {
    hideSelectionCodexPopover();
    return;
  }

  const selectedText = editor.somethingSelected() ? editor.getSelection("\n") : "";
  if (!selectedText.trim()) {
    hideSelectionCodexPopover();
    return;
  }

  selectionCodexText = selectedText;
  selectionCodexPopover.hidden = false;
  positionSelectionCodexPopover();
}

function positionSelectionCodexPopover() {
  if (!editor || selectionCodexPopover.hidden) return;

  const cursor = editor.getCursor("to");
  const coords = editor.cursorCoords(cursor, "window");
  const width = selectionCodexPopover.offsetWidth || 320;
  const height = selectionCodexPopover.offsetHeight || 44;
  const left = clampNumber(coords.left, 12, window.innerWidth - width - 12, 12);
  const top = clampNumber(coords.bottom + 8, 12, window.innerHeight - height - 12, 12);

  selectionCodexPopover.style.left = `${left}px`;
  selectionCodexPopover.style.top = `${top}px`;
}

function hideSelectionCodexPopover() {
  clearTimeout(selectionCodexTimer);
  selectionCodexPopover.hidden = true;
  selectionCodexText = "";
}

async function sendSelectionToCodex() {
  const selectedText = selectionCodexText || (editor && editor.somethingSelected() ? editor.getSelection("\n") : "");
  if (!selectedText.trim()) {
    hideSelectionCodexPopover();
    return;
  }

  const userPrompt = selectionCodexPrompt.value.trim() || "Use this selected text as context.";
  const sourceLabel = (activeFile && activeFile.relativePath) || (activeProject && activeProject.texName) || "current editor";
  const message = withProfileContext([
    `Selected text from ${sourceLabel}:`,
    "",
    selectedText,
    "",
    "User request:",
    userPrompt
  ].join("\n"));

  hideSelectionCodexPopover();
  selectionCodexPrompt.value = "";
  const agentKind = normalizeAgentChoice(selectionAgentChoice);
  const session = await ensureAgentTerminalSession(agentKind);
  if (!session) return;

  await waitForTerminalReady(session);
  const pastedMessage = message.replace(/\r\n?/g, "\n");
  markAgentTurnStarted(session);
  window.localOverleaf.writeTerminal(session.id, `\x1b[200~${pastedMessage}\x1b[201~\r`);
  compileLog.textContent = `Sent selected text to ${agentKind === "claude" ? "Claude" : agentKind === "shell" ? "Shell" : "Codex"}.`;
}

async function ensureCodexTerminalSession() {
  return ensureAgentTerminalSession("codex");
}

async function ensureAgentTerminalSession(kind = "codex") {
  const agentKind = normalizeAgentChoice(kind);
  let session = terminalSessions.find((item) => item.kind === agentKind && !item.exited);
  setTerminalCollapsed(false);
  if (session) {
    activateTerminal(session.id);
    return session;
  }

  session = await createTerminalSession(agentKind);
  if (session) activateTerminal(session.id);
  return session;
}

async function waitForTerminalReady(session) {
  if (!session) return;
  const remaining = Math.max(0, Number(session.readyAt || 0) - Date.now());
  if (remaining > 0) await wait(remaining);
  await wait(120);
}

function resetHistoryEvents(text = "") {
  clearTimeout(historyCaptureTimer);
  lastHistoryText = String(text || "");
  historyEvents = [];
  try {
    const stored = JSON.parse(localStorage.getItem(historyStorageKey()) || "[]");
    if (Array.isArray(stored)) historyEvents = stored.filter((entry) => entry && typeof entry.text === "string");
  } catch (error) {
    historyEvents = [];
  }
  if (!historyEvents.length) {
    historyEvents = [makeHistoryEntry("Opened", "Loaded the current document.", lastHistoryText, lastHistoryText)];
  } else if (historyEvents[0].text !== lastHistoryText) {
    historyEvents.unshift(makeHistoryEntry("Opened", summarizeTextChange(historyEvents[0].text, lastHistoryText), historyEvents[0].text, lastHistoryText));
  }
  persistHistoryEvents();
}

function historyStorageKey(projectId = activeProject && activeProject.id, relativePath = activeFile && activeFile.relativePath) {
  if (!projectId || !relativePath) return "";
  return `openleafHistory:${encodeURIComponent(String(projectId))}:${encodeURIComponent(String(relativePath))}`;
}

function persistHistoryEvents() {
  const key = historyStorageKey();
  if (!key) return;
  try {
    localStorage.setItem(key, JSON.stringify(historyEvents));
  } catch (error) {
    console.warn("Could not persist document history.", error);
  }
}

function scheduleHistoryCapture(reason = "Edited") {
  clearTimeout(historyCaptureTimer);
  historyCaptureTimer = setTimeout(() => recordHistoryEvent(reason), 900);
}

function recordHistoryEvent(reason = "Edited", { force = false } = {}) {
  if (!editor || activeMediaFile) return;
  const currentText = getSourceText();
  if (!force && currentText === lastHistoryText) return;

  historyEvents.unshift(makeHistoryEntry(reason, summarizeTextChange(lastHistoryText, currentText), lastHistoryText, currentText));
  lastHistoryText = currentText;
  persistHistoryEvents();
}

function makeHistoryEntry(title, summary, previousText, currentText) {
  const diff = historyDiffStats(previousText, currentText);
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    summary,
    fileName: (activeFile && activeFile.name) || (activeProject && activeProject.texName) || "document",
    time: new Date().toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }),
    added: diff.added,
    removed: diff.removed,
    text: String(currentText || "")
  };
}

function historyDiffStats(previousText, currentText) {
  const previousLines = String(previousText || "").split("\n");
  const currentLines = String(currentText || "").split("\n");
  const previousSet = new Map();
  previousLines.forEach((line) => previousSet.set(line, (previousSet.get(line) || 0) + 1));
  let added = 0;

  currentLines.forEach((line) => {
    const count = previousSet.get(line) || 0;
    if (count > 0) previousSet.set(line, count - 1);
    else added += 1;
  });

  const removed = Array.from(previousSet.values()).reduce((total, count) => total + count, 0);
  return { added, removed };
}

function summarizeTextChange(previousText, currentText) {
  const stats = historyDiffStats(previousText, currentText);
  if (!stats.added && !stats.removed) return "No visible text changes.";
  const parts = [];
  if (stats.added) parts.push(`${stats.added} line${stats.added === 1 ? "" : "s"} added`);
  if (stats.removed) parts.push(`${stats.removed} line${stats.removed === 1 ? "" : "s"} removed`);
  return parts.join(", ");
}

async function openHistoryWindow() {
  recordHistoryEvent("Current version");
  const currentText = activeMediaFile ? "" : getSourceText();
  if (!historyEvents.length) resetHistoryEvents(currentText);
  historySelectedIndex = 0;
  setHistoryPanelOpen(true);
}

function toggleHistoryPanel() {
  setHistoryPanelOpen(!historyPanelOpen);
}

function setHistoryPanelOpen(open) {
  historyPanelOpen = Boolean(open);
  historyPanel.hidden = !historyPanelOpen;
  previewPane.classList.toggle("history-open", historyPanelOpen);
  if (historyPanelOpen) renderHistoryPanel();
}

function renderHistoryPanel() {
  if (!historyPanelBody) return;
  const currentText = activeMediaFile ? "" : getSourceText();
  const entries = historyEvents.length
    ? historyEvents
    : [makeHistoryEntry("Current version", "No recorded edits in this session.", currentText, currentText)];
  historySelectedIndex = clampNumber(historySelectedIndex, 0, entries.length - 1, 0);
  const selected = entries[historySelectedIndex] || entries[0];
  const previewLines = String(selected.text || "")
    .split("\n");

  historyPanelBody.innerHTML = `
    <div class="history-entry-list" role="listbox" aria-label="History entries">
      ${entries.map((entry, index) => `
        <button class="history-entry ${index === historySelectedIndex ? "active" : ""}" type="button" data-history-index="${index}">
          <strong>${escapeHtml(entry.time || entry.title)}</strong>
          <span>${escapeHtml(entry.summary || entry.title)}</span>
          <small>${escapeHtml(entry.fileName || "")}${entry.added || entry.removed ? ` · +${entry.added || 0} -${entry.removed || 0}` : ""}</small>
        </button>
      `).join("")}
    </div>
    <article class="history-document-preview">
      <header>
        <strong>${escapeHtml(selected.title || "History")}</strong>
        <span>${escapeHtml(selected.time || "")}</span>
      </header>
      <pre>${escapeHtml(previewLines.join("\n"))}</pre>
    </article>
  `;

  historyPanelBody.querySelectorAll("[data-history-index]").forEach((button) => {
    button.addEventListener("click", () => {
      historySelectedIndex = Number(button.dataset.historyIndex) || 0;
      renderHistoryPanel();
    });
  });
}

function updatePdfPageIndicator() {
  if (!pdfPageIndicator) return;
  const pages = Array.from(pdfViewer.querySelectorAll(".pdf-page"));
  if (!pages.length || !renderedPdfPageCount) {
    pdfPageIndicator.textContent = "Page 0 / 0";
    return;
  }

  const viewerRect = pdfViewer.getBoundingClientRect();
  const midY = viewerRect.top + viewerRect.height * 0.36;
  const nearest = pages.reduce((best, page) => {
    const rect = page.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - midY);
    return !best || distance < best.distance ? { page, distance } : best;
  }, null);
  const pageNumber = nearest && nearest.page ? Number(nearest.page.dataset.page) || 1 : 1;
  pdfPageIndicator.textContent = `Page ${pageNumber} / ${renderedPdfPageCount}`;
  if (pdfThumbnailList) {
    pdfThumbnailList.querySelectorAll(".pdf-thumbnail").forEach((button) => {
      button.classList.toggle("active", Number(button.dataset.page) === pageNumber);
    });
  }
}

function insertLatexSnippet(snippetId) {
  const snippet = LATEX_SNIPPETS[snippetId];
  if (!snippet) return;
  if (!activeProject || activeMediaFile) {
    compileLog.textContent = "Open a text file before adding LaTeX handbook snippets.";
    closeSettings();
    return;
  }

  closeSettings();
  setMode("source");
  requestAnimationFrame(() => {
    editor.focus();
    editor.replaceSelection(snippet, "end");
    handleSourceChanged({ renderVisual: false });
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadProjects() {
  if (!projectGrid.childElementCount) projectGrid.innerHTML = '<div class="project-cache-placeholder" aria-hidden="true"></div>';

  try {
    const data = await window.localOverleaf.listProjects();
    projects = data.projects || [];
    projectCollections = readProjectCollections();
    ensureDemogReadingCollection();
    renderProjectGrid();
  } catch (error) {
    projectGrid.innerHTML = `<div class="project-loading project-error">${escapeHtml(formatError(error))}</div>`;
    projectEmpty.hidden = true;
  }
}

function renderProjectGrid() {
  const previewGeneration = ++projectPreviewGeneration;
  updateProjectViewButtons();
  updateProjectSortControl();
  const query = projectSearch.value.trim().toLowerCase();
  const groupedProjectIds = new Set(projectCollections.flatMap((collection) => (
    collection.divisions.flatMap((division) => division.projectIds)
  )));
  const visibleProjects = sortProjectsForDisplay(projects.filter((project) => {
    const haystack = `${project.displayName || ""} ${project.name} ${project.texName} ${project.folderName} ${project.texPath}`.toLowerCase();
    return !groupedProjectIds.has(project.id) && haystack.includes(query);
  }));
  const visibleCollections = projectCollections.filter((collection) => {
    const memberProjects = collection.divisions.flatMap((division) => division.projectIds)
      .map((id) => projects.find((project) => project.id === id))
      .filter(Boolean);
    const haystack = `${collection.name} ${collection.divisions.map((division) => division.name).join(" ")} ${memberProjects.map(projectDisplaySortName).join(" ")}`.toLowerCase();
    return haystack.includes(query);
  });

  projectGrid.innerHTML = "";
  projectEmpty.hidden = visibleProjects.length + visibleCollections.length > 0;

  const subjectsSection = createProjectHomeSection(
    "Subjects",
    "Collections organized into readings, notes, assignments, and other divisions.",
    "subjects"
  );
  const projectsSection = createProjectHomeSection(
    "Projects",
    "Documents and presentations that are not inside a subject.",
    "projects"
  );
  if (visibleCollections.length) projectGrid.appendChild(subjectsSection.section);
  if (visibleProjects.length) projectGrid.appendChild(projectsSection.section);

  visibleCollections.forEach((collection) => subjectsSection.grid.appendChild(renderProjectCollectionCard(collection)));

  visibleProjects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.projectId = project.id;
    card.draggable = false;
    const displayName = project.displayName || project.name;
    const sourceLabel = project.texName || "main.tex";
    card.innerHTML = `
      <button class="project-card-open" type="button" aria-label="Open ${escapeHtml(displayName)}">
        <span class="project-preview" aria-hidden="true">
          <span class="project-preview-message">${escapeHtml((displayName[0] || "P").toUpperCase())}</span>
        </span>
        <span class="project-card-copy">
          <span class="project-card-title-row">
            <span class="project-name">${escapeHtml(displayName)}</span>
          </span>
          <span class="project-file">${escapeHtml(sourceLabel)} · ${escapeHtml(project.folderName)}</span>
          <span class="project-card-meta-row">
            <span class="project-meta">Edited ${escapeHtml(relativeTime(project.modifiedAt))}</span>
          </span>
        </span>
      </button>
      <button class="project-favorite-button ${project.favorite ? "active" : ""}" type="button" aria-label="${project.favorite ? "Unfavorite" : "Favorite"} ${escapeHtml(project.name)}" title="${project.favorite ? "Unfavorite project" : "Favorite project"}">
        ${STAR_ICON_SVG}
      </button>
      <button class="project-remove-button" type="button" aria-label="Remove ${escapeHtml(project.name)} from editor" title="Remove project">
        ${TRASH_ICON_SVG}
      </button>
    `;
    card.querySelector(".project-card-open").addEventListener("click", () => {
      if (card.classList.contains("renaming")) return;
      openProject(project.id);
    });
    card.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (card.classList.contains("renaming")) return;
      showProjectContextMenu(event, project);
    });
    wireProjectCardDrag(card, project.id);
    card.querySelector(".project-remove-button").addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      removeProject(project);
    });
    card.querySelector(".project-favorite-button").addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleProjectFavorite(project);
    });
    projectsSection.grid.appendChild(card);
    scheduleProjectPreview(card, project, previewGeneration);
  });
}

function createProjectHomeSection(title, description, kind) {
  const section = document.createElement("section");
  section.className = `project-home-section project-home-${kind}`;
  section.setAttribute("aria-labelledby", `project-home-${kind}-title`);
  section.innerHTML = `
    <header class="project-home-section-header">
      <div>
        <h2 id="project-home-${kind}-title">${escapeHtml(title)}</h2>
        <p>${escapeHtml(description)}</p>
      </div>
    </header>
    <div class="project-home-section-grid"></div>
  `;
  return { section, grid: section.querySelector(".project-home-section-grid") };
}

function scheduleProjectPreview(card, project, generation) {
  projectPreviewQueue = projectPreviewQueue
    .catch(() => {})
    .then(async () => {
      if (generation !== projectPreviewGeneration || !card.isConnected) return;
      await renderProjectPreview(card, project);
    });
}

function readProjectCollections() {
  let stored = [];
  try {
    stored = JSON.parse(localStorage.getItem("openleafProjectCollections") || "[]");
  } catch (_error) {
    stored = [];
  }
  const knownIds = new Set(projects.map((project) => project.id));
  return (Array.isArray(stored) ? stored : []).map((collection) => ({
    id: String(collection.id || ""),
    name: String(collection.name || "Untitled Subject"),
    divisions: (Array.isArray(collection.divisions) ? collection.divisions : []).map((division) => ({
      id: String(division.id || ""),
      name: String(division.name || "Projects"),
      projectIds: (Array.isArray(division.projectIds) ? division.projectIds : []).filter((id) => knownIds.has(id))
    })).filter((division) => division.id)
  })).filter((collection) => collection.id && collection.divisions.length);
}

function saveProjectCollections() {
  localStorage.setItem("openleafProjectCollections", JSON.stringify(projectCollections));
}

function collectionIdentifier(prefix = "folder") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function ensureDemogReadingCollection() {
  const demogProjects = projects.filter((project) => /demog\s*c?126|c126.*demog/i.test(`${project.name} ${project.displayName} ${project.folderName} ${project.texPath}`));
  const demog = demogProjects.sort((left, right) => (
    (Array.isArray(right.readingFiles) ? right.readingFiles.length : 0)
      - (Array.isArray(left.readingFiles) ? left.readingFiles.length : 0)
  ))[0];
  if (!demog) return;
  let collection = projectCollections.find((item) => /demog\s*c?126|c126.*demog/i.test(item.name));
  if (!collection) {
    collection = {
      id: collectionIdentifier("subject"),
      name: "DEMOG C126",
      divisions: [{ id: collectionIdentifier("division"), name: "Readings", projectIds: [] }]
    };
    projectCollections.unshift(collection);
  }
  let readings = collection.divisions.find((division) => /^readings$/i.test(division.name));
  if (!readings) {
    readings = { id: collectionIdentifier("division"), name: "Readings", projectIds: [] };
    collection.divisions.unshift(readings);
  }
  const demogIds = new Set(demogProjects.map((project) => project.id));
  collection.divisions.forEach((division) => {
    division.projectIds = division.projectIds.filter((id) => !demogIds.has(id));
  });
  readings.projectIds.unshift(demog.id);
  saveProjectCollections();
}

function projectCollectionMembership(projectId) {
  for (const collection of projectCollections) {
    for (const division of collection.divisions) {
      if (division.projectIds.includes(projectId)) return { collection, division };
    }
  }
  return null;
}

function removeProjectFromCollections(projectId) {
  projectCollections.forEach((collection) => {
    collection.divisions.forEach((division) => {
      division.projectIds = division.projectIds.filter((id) => id !== projectId);
    });
  });
}

function addProjectToCollection(projectId, collection, division = collection && collection.divisions[0]) {
  if (!projectId || !collection || !division) return;
  removeProjectFromCollections(projectId);
  let liveCollection = projectCollections.find((item) => item.id === collection.id);
  if (!liveCollection) {
    liveCollection = collection;
    projectCollections.push(liveCollection);
  }
  let liveDivision = liveCollection.divisions.find((item) => item.id === division.id);
  if (!liveDivision) {
    liveDivision = division;
    liveDivision.projectIds = [];
    liveCollection.divisions.push(liveDivision);
  }
  if (!liveDivision.projectIds.includes(projectId)) liveDivision.projectIds.push(projectId);
  saveProjectCollections();
}

function createProjectCollection(sourceProjectId, targetProjectId) {
  if (!sourceProjectId || !targetProjectId || sourceProjectId === targetProjectId) return;
  const targetMembership = projectCollectionMembership(targetProjectId);
  if (targetMembership) {
    addProjectToCollection(sourceProjectId, targetMembership.collection, targetMembership.division);
    renderProjectGrid();
    openProjectCollection(targetMembership.collection.id);
    return;
  }
  removeProjectFromCollections(sourceProjectId);
  removeProjectFromCollections(targetProjectId);
  const collection = {
    id: collectionIdentifier("subject"),
    name: "New Subject",
    divisions: [{
      id: collectionIdentifier("division"),
      name: "Projects",
      projectIds: [targetProjectId, sourceProjectId]
    }]
  };
  projectCollections.unshift(collection);
  saveProjectCollections();
  renderProjectGrid();
  openProjectCollection(collection.id, { editName: true });
}

function wireProjectCardDrag(card, projectId) {
  card.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || event.target.closest(".project-favorite-button, .project-remove-button, input")) return;
    card.draggable = true;
  });
  card.addEventListener("dragstart", (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("application/x-openleaf-project", projectId);
    card.classList.add("is-dragging");
  });
  card.addEventListener("dragend", () => {
    card.draggable = false;
    card.classList.remove("is-dragging");
  });
  card.addEventListener("pointerup", () => { card.draggable = false; });
  card.addEventListener("pointercancel", () => { card.draggable = false; });
  card.addEventListener("dragover", (event) => {
    if (!Array.from(event.dataTransfer.types || []).includes("application/x-openleaf-project")) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    card.classList.add("is-drop-target");
  });
  card.addEventListener("dragleave", () => card.classList.remove("is-drop-target"));
  card.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();
    card.classList.remove("is-drop-target");
    createProjectCollection(event.dataTransfer.getData("application/x-openleaf-project"), projectId);
  });
}

function renderProjectCollectionCard(collection) {
  const memberIds = collection.divisions.flatMap((division) => division.projectIds);
  const members = memberIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean);
  const readingCount = members.reduce((count, project) => count + (Array.isArray(project.readingFiles) ? project.readingFiles.length : 0), 0);
  const itemCount = readingCount || members.length;
  const card = document.createElement("button");
  card.type = "button";
  card.className = "project-collection-card";
  card.setAttribute("aria-label", `Open ${collection.name}`);
  card.dataset.collectionId = collection.id;
  const tiles = members.slice(0, 4).map((project) => project.previewImageUrl
    ? `<img src="${escapeHtml(project.previewImageUrl)}" alt="">`
    : project.readingFiles && project.readingFiles.find((reading) => reading.previewImageUrl)
      ? `<img src="${escapeHtml(project.readingFiles.find((reading) => reading.previewImageUrl).previewImageUrl)}" alt="">`
    : `<span>${escapeHtml((projectDisplaySortName(project)[0] || "P").toUpperCase())}</span>`).join("");
  card.innerHTML = `
    <span class="project-collection-preview" aria-hidden="true">${tiles}</span>
    <span class="project-collection-copy">
      <strong>${escapeHtml(collection.name)}</strong>
      <small>${itemCount} ${readingCount ? (itemCount === 1 ? "reading" : "readings") : (itemCount === 1 ? "project" : "projects")} · ${collection.divisions.length} ${collection.divisions.length === 1 ? "division" : "divisions"}</small>
    </span>
  `;
  card.addEventListener("click", () => openProjectCollection(collection.id));
  card.addEventListener("dragover", (event) => {
    if (!Array.from(event.dataTransfer.types || []).includes("application/x-openleaf-project")) return;
    event.preventDefault();
    card.classList.add("is-drop-target");
  });
  card.addEventListener("dragleave", () => card.classList.remove("is-drop-target"));
  card.addEventListener("drop", (event) => {
    event.preventDefault();
    card.classList.remove("is-drop-target");
    addProjectToCollection(event.dataTransfer.getData("application/x-openleaf-project"), collection);
    renderProjectGrid();
  });
  return card;
}

function closeProjectCollection() {
  document.querySelector(".project-collection-overlay")?.remove();
  openProjectCollectionId = "";
}

function openProjectCollection(collectionId, { editName = false } = {}) {
  closeProjectCollection();
  const collection = projectCollections.find((item) => item.id === collectionId);
  if (!collection) return;
  openProjectCollectionId = collectionId;
  const overlay = document.createElement("section");
  overlay.className = "project-collection-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", collection.name);
  overlay.innerHTML = `
    <div class="project-collection-panel">
      <header class="project-collection-header">
        <input class="project-collection-name" value="${escapeHtml(collection.name)}" aria-label="Subject name">
        <div class="project-collection-actions">
          <button class="project-collection-add-division" type="button">+ Division</button>
          <button class="project-collection-close" type="button" aria-label="Close folder">×</button>
        </div>
      </header>
      <div class="project-collection-divisions"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  const nameInput = overlay.querySelector(".project-collection-name");
  nameInput.addEventListener("change", () => {
    collection.name = nameInput.value.trim() || "Untitled Subject";
    nameInput.value = collection.name;
    saveProjectCollections();
  });
  nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") nameInput.blur();
  });
  overlay.querySelector(".project-collection-close").addEventListener("click", () => {
    closeProjectCollection();
    renderProjectGrid();
  });
  overlay.addEventListener("click", (event) => {
    if (event.target !== overlay) return;
    closeProjectCollection();
    renderProjectGrid();
  });
  overlay.querySelector(".project-collection-add-division").addEventListener("click", () => {
    const name = window.prompt("Division name", "New Division");
    if (!name || !name.trim()) return;
    collection.divisions.push({ id: collectionIdentifier("division"), name: name.trim(), projectIds: [] });
    saveProjectCollections();
    renderOpenProjectCollection(collection, overlay);
  });
  renderOpenProjectCollection(collection, overlay);
  requestAnimationFrame(() => {
    if (editName) nameInput.select();
    nameInput.focus();
  });
}

function renderOpenProjectCollection(collection, overlay) {
  const container = overlay.querySelector(".project-collection-divisions");
  container.replaceChildren();
  collection.divisions.forEach((division) => {
    const entries = division.projectIds
      .map((id) => projects.find((project) => project.id === id))
      .filter(Boolean)
      .flatMap((project) => Array.isArray(project.readingFiles) && project.readingFiles.length
        ? project.readingFiles.map((reading) => ({ project, reading }))
        : [{ project, reading: null }]);
    const section = document.createElement("section");
    section.className = "project-division";
    section.dataset.divisionId = division.id;
    section.innerHTML = `<header><strong>${escapeHtml(division.name)}</strong><small>${entries.length}</small></header><div class="project-division-grid"></div>`;
    const grid = section.querySelector(".project-division-grid");
    entries.forEach(({ project, reading }) => {
      const title = reading ? reading.name : projectDisplaySortName(project);
      const card = document.createElement("article");
      card.className = "project-division-card";
      card.classList.toggle("reading-card", Boolean(reading));
      card.draggable = false;
      card.dataset.projectId = project.id;
      if (reading) card.dataset.pdfRelativePath = reading.relativePath;
      card.innerHTML = `
        <span class="project-division-preview">${(reading && reading.previewImageUrl) || project.previewImageUrl ? `<img src="${escapeHtml((reading && reading.previewImageUrl) || project.previewImageUrl)}" alt="">` : "PDF"}</span>
        <span class="project-division-card-copy">
          <strong>${escapeHtml(title)}</strong>
          ${reading ? `<small>${escapeHtml(reading.category || "Reading")}</small>` : ""}
        </span>
        ${reading ? "" : `<button type="button" aria-label="Move ${escapeHtml(title)} to Home">×</button>`}
      `;
      card.addEventListener("click", (event) => {
        if (event.target.closest("button")) return;
        closeProjectCollection();
        openProject(project.id, {
          pdfRelativePath: reading ? reading.relativePath : "",
          sourceRelativePath: reading ? reading.textRelativePath : ""
        });
      });
      const removeButton = card.querySelector("button");
      if (removeButton) removeButton.addEventListener("click", () => {
          removeProjectFromCollections(project.id);
          saveProjectCollections();
          renderOpenProjectCollection(collection, overlay);
        });
      if (reading) {
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Open ${title}`);
        card.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          closeProjectCollection();
          openProject(project.id, { pdfRelativePath: reading.relativePath, sourceRelativePath: reading.textRelativePath });
        });
      }
      card.addEventListener("dragstart", (event) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("application/x-openleaf-project", project.id);
      });
      card.addEventListener("pointerdown", (event) => {
        if (reading || event.button !== 0 || event.target.closest("button, input")) return;
        card.draggable = true;
      });
      card.addEventListener("dragend", () => { card.draggable = false; });
      card.addEventListener("pointerup", () => { card.draggable = false; });
      card.addEventListener("pointercancel", () => { card.draggable = false; });
      grid.appendChild(card);
    });
    section.addEventListener("dragover", (event) => {
      if (!Array.from(event.dataTransfer.types || []).includes("application/x-openleaf-project")) return;
      event.preventDefault();
      section.classList.add("is-drop-target");
    });
    section.addEventListener("dragleave", () => section.classList.remove("is-drop-target"));
    section.addEventListener("drop", (event) => {
      event.preventDefault();
      section.classList.remove("is-drop-target");
      addProjectToCollection(event.dataTransfer.getData("application/x-openleaf-project"), collection, division);
      renderOpenProjectCollection(collection, overlay);
    });
    container.appendChild(section);
  });
}

function sortProjectsForDisplay(items) {
  const collator = new Intl.Collator(undefined, { sensitivity: "base", numeric: true });
  const byRecent = (a, b) => dateValue(b.modifiedAt || b.updatedAt || b.lastOpenedAt) - dateValue(a.modifiedAt || a.updatedAt || a.lastOpenedAt);
  const byName = (a, b) => collator.compare(projectDisplaySortName(a), projectDisplaySortName(b));
  const byFavorite = (a, b) => Number(Boolean(b.favorite)) - Number(Boolean(a.favorite));
  const byFolder = (a, b) => collator.compare(String(a.folderName || ""), String(b.folderName || "")) || byName(a, b);
  const byTex = (a, b) => collator.compare(String(a.texName || ""), String(b.texName || "")) || byName(a, b);

  return [...items].sort((a, b) => {
    if (projectSortMode === "recent") return byRecent(a, b) || byName(a, b);
    if (projectSortMode === "name-asc") return byName(a, b);
    if (projectSortMode === "name-desc") return byName(b, a);
    if (projectSortMode === "folder") return byFolder(a, b);
    if (projectSortMode === "tex") return byTex(a, b);
    return byFavorite(a, b) || byRecent(a, b) || byName(a, b);
  });
}

function projectDisplaySortName(project) {
  return String(project.displayName || project.name || project.folderName || "");
}

function dateValue(value) {
  const time = Date.parse(value || "");
  return Number.isFinite(time) ? time : 0;
}

function showProjectContextMenu(event, project) {
  closeProjectContextMenu();
  closeFileContextMenu();

  const menu = document.createElement("div");
  menu.className = "project-context-segment";
  menu.setAttribute("role", "menu");

  const renameButton = document.createElement("button");
  renameButton.type = "button";
  renameButton.textContent = "Rename";
  renameButton.addEventListener("click", (clickEvent) => {
    clickEvent.stopPropagation();
    renameProject(project);
  });

  const favoriteButton = document.createElement("button");
  favoriteButton.type = "button";
  favoriteButton.textContent = project.favorite ? "Unfavorite" : "Favorite";
  favoriteButton.addEventListener("click", (clickEvent) => {
    clickEvent.stopPropagation();
    toggleProjectFavorite(project);
  });

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.className = "danger";
  removeButton.addEventListener("click", (clickEvent) => {
    clickEvent.stopPropagation();
    removeProject(project);
  });

  menu.append(renameButton, favoriteButton, removeButton);
  document.body.appendChild(menu);

  const margin = 8;
  const rect = menu.getBoundingClientRect();
  const left = Math.min(event.clientX, window.innerWidth - rect.width - margin);
  const top = Math.min(event.clientY, window.innerHeight - rect.height - margin);
  menu.style.left = `${Math.max(margin, left)}px`;
  menu.style.top = `${Math.max(margin, top)}px`;
  projectContextMenu = menu;
}

function closeProjectContextMenu() {
  if (!projectContextMenu) return;
  projectContextMenu.remove();
  projectContextMenu = null;
}

async function renameProject(project) {
  closeProjectContextMenu();
  const card = Array.from(projectGrid.querySelectorAll(".project-card")).find((item) => item.dataset.projectId === project.id);
  if (!card) return;
  startProjectRename(card, project);
}

function startProjectRename(card, project) {
  const nameElement = card.querySelector(".project-name");
  if (!nameElement || card.querySelector(".project-rename-input")) return;

  const input = document.createElement("input");
  input.className = "project-rename-input";
  input.type = "text";
  input.value = project.name;
  input.setAttribute("aria-label", "Project name");
  input.spellcheck = false;

  nameElement.replaceWith(input);
  card.classList.add("renaming");
  card.tabIndex = -1;

  let finished = false;
  const finish = async (commit) => {
    if (finished) return;
    finished = true;
    input.disabled = true;
    const name = input.value.trim();
    if (!commit || !name || name === project.name) {
      renderProjectGrid();
      return;
    }
    await saveProjectName(project, name);
  };

  input.addEventListener("click", (event) => event.stopPropagation());
  input.addEventListener("pointerdown", (event) => event.stopPropagation());
  input.addEventListener("contextmenu", (event) => event.stopPropagation());
  input.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      event.preventDefault();
      finish(true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      finish(false);
    }
  });
  input.addEventListener("blur", () => finish(true));

  requestAnimationFrame(() => {
    input.focus();
    input.select();
  });
}

async function saveProjectName(project, name) {
  setProjectBusy(true);
  try {
    const result = await window.localOverleaf.renameProject(project.id, name);
    projects = result.projects || projects.map((item) => (item.id === project.id ? { ...item, name } : item));
    renderProjectGrid();
  } catch (error) {
    projectGrid.innerHTML = `<div class="project-loading project-error">${escapeHtml(formatError(error))}</div>`;
  } finally {
    setProjectBusy(false);
  }
}

async function removeProject(project) {
  closeProjectContextMenu();
  const confirmed = window.confirm(`Remove "${project.name}" from the editor?\n\nThis will not delete any files from disk.`);
  if (!confirmed) return;

  setProjectBusy(true);
  try {
    const result = await window.localOverleaf.removeProject(project.id);
    projects = result.projects || projects.filter((item) => item.id !== project.id);
    renderProjectGrid();
  } catch (error) {
    projectGrid.innerHTML = `<div class="project-loading project-error">${escapeHtml(formatError(error))}</div>`;
  } finally {
    setProjectBusy(false);
  }
}

async function toggleProjectFavorite(project) {
  closeProjectContextMenu();
  if (!window.localOverleaf || !window.localOverleaf.toggleProjectFavorite) return;
  try {
    const result = await window.localOverleaf.toggleProjectFavorite(project.id);
    projects = result.projects || projects.map((item) => (
      item.id === project.id ? { ...item, favorite: !item.favorite } : item
    ));
    renderProjectGrid();
  } catch (error) {
    projectGrid.innerHTML = `<div class="project-loading project-error">${escapeHtml(formatError(error))}</div>`;
  }
}

async function renderProjectPreview(card, project) {
  const preview = card.querySelector(".project-preview");
  if (!preview) return;
  const canUseCachedPreview = Boolean(project.previewImageUrl);
  preview.classList.toggle("pdf-dark-render", pdfDarkMode && pdfRenderMode !== "original");
  preview.classList.toggle("pdf-invert-pages", pdfDarkMode && pdfRenderMode === "invert");
  if (canUseCachedPreview) {
    const image = previewImageElement(project.previewImageUrl, `${project.name} preview`);
    image.classList.add("project-preview-raster");
    preview.replaceChildren(image);
    try {
      await image.decode();
      return;
    } catch (error) {
      // Home never decodes the source PDF. Opening the project refreshes this
      // lightweight cache from the already-rendered first page instead.
    }
    if (!card.isConnected) return;
  }
  preview.innerHTML = `<span class="project-preview-message">${escapeHtml(((project.displayName || project.name || "P")[0] || "P").toUpperCase())}</span>`;
}

function cacheActiveProjectPreview(sourceCanvas) {
  if (
    !sourceCanvas
    || !activeProject
    || isRemoteProject()
    || pdfDarkMode
    || !activeProject.pdfExists
    || activeProject.previewImageUrl
    || !window.localOverleaf.cacheProjectPreview
  ) return;
  const sourceWidth = sourceCanvas.width;
  const sourceHeight = sourceCanvas.height;
  if (!(sourceWidth > 1) || !(sourceHeight > 1)) return;
  const width = Math.min(720, sourceWidth);
  const height = Math.max(1, Math.round(width * sourceHeight / sourceWidth));
  const previewCanvas = document.createElement("canvas");
  previewCanvas.width = width;
  previewCanvas.height = height;
  const context = previewCanvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(sourceCanvas, 0, 0, width, height);
  window.localOverleaf.cacheProjectPreview(activeProject.id, previewCanvas.toDataURL("image/png"))
    .then((result) => {
      if (result && result.previewImageUrl && activeProject) activeProject.previewImageUrl = result.previewImageUrl;
    })
    .catch(() => {});
}

function cachePdfViewPreview(sourceCanvas, relativePath, fingerprint) {
  if (!sourceCanvas || !activeProject || isRemoteProject() || !window.localOverleaf.cachePdfViewPreview) return;
  const cacheKey = `${activeProject.id}:${relativePath || "main.pdf"}:${fingerprint || "current"}`;
  if (pdfViewPreviewWrites.has(cacheKey)) return;
  const sourceWidth = sourceCanvas.width;
  const sourceHeight = sourceCanvas.height;
  if (!(sourceWidth > 1) || !(sourceHeight > 1)) return;
  pdfViewPreviewWrites.add(cacheKey);
  const width = Math.min(1100, sourceWidth);
  const height = Math.max(1, Math.round(width * sourceHeight / sourceWidth));
  const previewCanvas = document.createElement("canvas");
  previewCanvas.width = width;
  previewCanvas.height = height;
  const context = previewCanvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(sourceCanvas, 0, 0, width, height);
  window.localOverleaf.cachePdfViewPreview(
    activeProject.id,
    relativePath || "",
    previewCanvas.toDataURL("image/webp", 0.84)
  ).catch(() => pdfViewPreviewWrites.delete(cacheKey));
}

function showCachedPdfViewPreview(previewImageUrl, token) {
  // Cached previews contain the original light PDF pixels. Showing one while
  // adaptive dark rendering is in progress causes a bright white page flash.
  if (pdfDarkMode && pdfRenderMode === "adaptive") return;
  if (!previewImageUrl || token !== pdfRenderToken || pdfViewer.querySelector(".pdf-page:not(.pdf-page-cached)")) return;
  const page = document.createElement("div");
  page.className = "pdf-page pdf-page-cached";
  const image = previewImageElement(previewImageUrl, `${activePdfName()} cached preview`);
  image.className = "pdf-cached-page-image";
  page.appendChild(image);
  pdfViewer.replaceChildren(page);
}

function toggleNewProjectPanel(force) {
  const show = typeof force === "boolean" ? force : newProjectPanel.hidden;
  if (show) openNewProjectPanel();
  else closeNewProjectPanel();
}

function openNewProjectPanel() {
  closeCommandPalette();
  closeSettings({ keepBackdrop: true });
  closeTemplatesPanel({ keepBackdrop: true });
  closeSshProjectPanel({ keepBackdrop: true });
  settingsBackdrop.hidden = false;
  newProjectPanel.hidden = false;
  addProjectButton.classList.add("active");
  projectDropZone.focus();
}

function closeNewProjectPanel({ keepBackdrop = false } = {}) {
  newProjectPanel.hidden = true;
  newProjectPanel.classList.remove("drop-active");
  projectDropZone.classList.remove("drop-active");
  addProjectButton.classList.remove("active");
  if (!keepBackdrop) updateOverlayBackdrop();
}

async function addProject(kind) {
  setProjectBusy(true);

  try {
    const result = await window.localOverleaf.addProject(kind);
    projects = result.projects || projects;
    renderProjectGrid();
    if (result.project) toggleNewProjectPanel(false);
    if (result.project) await openProject(result.project.id);
  } catch (error) {
    projectGrid.innerHTML = `<div class="project-loading project-error">${escapeHtml(formatError(error))}</div>`;
  } finally {
    setProjectBusy(false);
  }
}

function wireProjectDrop(target) {
  target.addEventListener("click", () => addProject("folder"));
  target.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    addProject("folder");
  });

  target.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.stopPropagation();
    target.classList.add("drop-active");
    newProjectPanel.classList.add("drop-active");
  });

  target.addEventListener("dragleave", (event) => {
    event.stopPropagation();
    if (!target.contains(event.relatedTarget)) {
      target.classList.remove("drop-active");
      newProjectPanel.classList.remove("drop-active");
    }
  });

  target.addEventListener("drop", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    target.classList.remove("drop-active");
    newProjectPanel.classList.remove("drop-active");

    const paths = Array.from(event.dataTransfer.files)
      .map(projectPathFromFile)
      .filter(Boolean);
    if (!paths.length) return;

    setProjectBusy(true);
    try {
      const result = await window.localOverleaf.addProjectFromPath(paths);
      projects = result.projects || projects;
      renderProjectGrid();
      toggleNewProjectPanel(false);
      if (result.project) await openProject(result.project.id);
    } catch (error) {
      projectGrid.innerHTML = `<div class="project-loading project-error">${escapeHtml(formatError(error))}</div>`;
    } finally {
      setProjectBusy(false);
    }
  });
}

function projectPathFromFile(file) {
  if (file.path) return file.path;
  try {
    return window.localOverleaf.getPathForFile(file);
  } catch (error) {
    return "";
  }
}

function currentPresentationSlide() {
  return activePresentation && activePresentation.slides
    ? activePresentation.slides[activePresentationSlideIndex] || null
    : null;
}

function presentationViewIsActive() {
  return Boolean(presentationScreen && presentationScreen.classList.contains("pptx-presenting"));
}

function updatePresentationViewControls() {
  if (!activePresentation) return;
  const slideCount = activePresentation.slides.length;
  if (pptxPresentStatus) pptxPresentStatus.value = `${activePresentationSlideIndex + 1} / ${slideCount}`;
  if (pptxPresentPreviousButton) pptxPresentPreviousButton.disabled = activePresentationSlideIndex <= 0;
  if (pptxPresentNextButton) pptxPresentNextButton.disabled = activePresentationSlideIndex >= slideCount - 1;
}

async function setPresentationView(enabled, { manageFullscreen = true } = {}) {
  if (!presentationScreen || presentationScreen.hidden || !activePresentation) return;
  const shouldPresent = Boolean(enabled);
  const fullscreenPromise = shouldPresent
    && manageFullscreen
    && !document.fullscreenElement
    && presentationScreen.requestFullscreen
    ? presentationScreen.requestFullscreen().catch(() => {})
    : null;

  presentationScreen.classList.toggle("pptx-presenting", shouldPresent);
  if (presentationZoomRenderFrame) {
    cancelAnimationFrame(presentationZoomRenderFrame);
    presentationZoomRenderFrame = 0;
  }
  presentationZoomAnchor = null;
  if (pptxPresentControls) pptxPresentControls.hidden = !shouldPresent;
  if (shouldPresent) {
    presentationSelectionScope = "canvas";
    selectPresentationElement(null, { rerender: false });
  }
  updatePresentationViewControls();

  await new Promise((resolve) => requestAnimationFrame(resolve));
  await renderPresentationSlide({ preserveSelection: false });
  if (shouldPresent) {
    pptxStageViewport.focus({ preventScroll: true });
    if (fullscreenPromise) await fullscreenPromise;
  } else if (
    manageFullscreen
    && document.fullscreenElement === presentationScreen
    && document.exitFullscreen
  ) {
    await document.exitFullscreen().catch(() => {});
  }
}

function presentationElementKey(slide, element) {
  return `${slide.path}:${element.id}`;
}

function clonePresentationValue(value) {
  if (value === undefined || value === null) return value;
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

const PRESENTATION_TRACKED_ELEMENT_PROPERTIES = [
  "text",
  "richTextRuns",
  "x",
  "y",
  "cx",
  "cy",
  "fontSize",
  "fontFamily",
  "color",
  "fillColor",
  "lineColor",
  "lineWidth",
  "lineStyle",
  "bold",
  "italic",
  "underline",
  "align",
  "zIndex"
];

function presentationElementTrackedState(element) {
  const state = {};
  PRESENTATION_TRACKED_ELEMENT_PROPERTIES.forEach((property) => {
    state[property] = clonePresentationValue(
      property === "richTextRuns" ? normalizedPresentationTextRuns(element) : element?.[property]
    );
  });
  return state;
}

function rebuildPresentationElementBaselines() {
  presentationElementBaselines = new Map();
  (activePresentation?.slides || []).forEach((slide) => {
    (slide.elements || []).forEach((element) => {
      if (!element.isNew) {
        presentationElementBaselines.set(presentationElementKey(slide, element), presentationElementTrackedState(element));
      }
    });
  });
}

function presentationValuesEqual(left, right) {
  if (Object.is(left, right)) return true;
  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch (error) {
    return false;
  }
}

function presentationHistorySnapshot() {
  const slide = currentPresentationSlide();
  return {
    presentation: clonePresentationValue(activePresentation),
    changes: clonePresentationValue(Array.from(presentationChangeMap.entries())),
    dirty: presentationDirty,
    slideIndex: activePresentationSlideIndex,
    selectionScope: presentationSelectionScope,
    selectedSlidePath: slide ? slide.path : "",
    selectedElementId: selectedPresentationElement ? selectedPresentationElement.id : ""
  };
}

function updatePresentationHistoryButtons() {
  if (pptxUndoButton) pptxUndoButton.disabled = presentationUndoStack.length === 0;
  if (pptxRedoButton) pptxRedoButton.disabled = presentationRedoStack.length === 0;
}

function pushPresentationUndoSnapshot(snapshot) {
  if (presentationHistorySuspended || !snapshot) return;
  presentationUndoStack.push(snapshot);
  if (presentationUndoStack.length > 60) presentationUndoStack.shift();
  presentationRedoStack = [];
  updatePresentationHistoryButtons();
}

function recordPresentationUndo() {
  if (!activePresentation || presentationHistorySuspended) return;
  pushPresentationUndoSnapshot(presentationHistorySnapshot());
}

async function restorePresentationHistorySnapshot(snapshot) {
  if (!snapshot) return;
  presentationHistorySuspended = true;
  activePresentation = clonePresentationValue(snapshot.presentation);
  presentationChangeMap = new Map(clonePresentationValue(snapshot.changes));
  presentationDirty = Boolean(snapshot.dirty);
  activePresentationSlideIndex = Math.max(
    0,
    Math.min(Number(snapshot.slideIndex) || 0, Math.max(0, activePresentation.slides.length - 1))
  );
  presentationSelectionScope = snapshot.selectionScope || "canvas";
  const slide = currentPresentationSlide();
  selectedPresentationElement = slide && snapshot.selectedElementId
    ? slide.elements.find((element) => element.id === snapshot.selectedElementId && !element.deleted) || null
    : null;
  pptxSlideCount.textContent = `${activePresentation.slides.length}`;
  await renderPresentationSlideList();
  await renderPresentationSlide({ preserveSelection: true });
  renderPresentationInspector();
  setPresentationStatus(presentationDirty ? "Unsaved changes" : "Saved", presentationDirty ? "unsaved" : "ok");
  presentationHistorySuspended = false;
  updatePresentationHistoryButtons();
}

async function undoPresentationChange() {
  if (!presentationUndoStack.length || !activePresentation) return;
  const target = presentationUndoStack.pop();
  presentationRedoStack.push(presentationHistorySnapshot());
  await restorePresentationHistorySnapshot(target);
}

async function redoPresentationChange() {
  if (!presentationRedoStack.length || !activePresentation) return;
  const target = presentationRedoStack.pop();
  presentationUndoStack.push(presentationHistorySnapshot());
  await restorePresentationHistorySnapshot(target);
}

function setPresentationStatus(message, state = "") {
  if (!pptxSaveStatus) return;
  pptxSaveStatus.textContent = message;
  pptxSaveStatus.dataset.state = state;
}

function setPresentationCollaborationStatus(message, state = "synced") {
  if (!pptxCollaborationStatus) return;
  pptxCollaborationStatus.lastChild.textContent = message;
  pptxCollaborationStatus.dataset.state = state;
}

function stopPresentationCollaborationPolling() {
  if (presentationCollaborationTimer) clearInterval(presentationCollaborationTimer);
  presentationCollaborationTimer = null;
  presentationCollaborationBusy = false;
}

async function reloadPresentationFromSharedSource() {
  if (!activeProject || !activePresentation) return false;
  const projectId = activeProject.id;
  const slideIndex = activePresentationSlideIndex;
  const result = await window.localOverleaf.loadPresentationProject(projectId);
  if (!activeProject || activeProject.id !== projectId || presentationDirty) return false;
  activeProject = result.project || activeProject;
  activePresentation = result.presentation;
  rebuildPresentationElementBaselines();
  await loadPresentationPdf(result.pdf, result.thumbnailPdf);
  activePresentationSlideIndex = Math.min(slideIndex, Math.max(0, activePresentation.slides.length - 1));
  selectedPresentationElement = null;
  presentationSelectionScope = "canvas";
  presentationUndoStack = [];
  presentationRedoStack = [];
  updatePresentationHistoryButtons();
  await renderPresentationSlideList();
  await renderPresentationSlide();
  renderPresentationInspector();
  setPresentationStatus("Updated from shared poster", "ok");
  setPresentationCollaborationStatus("Shared · synced", "synced");
  return true;
}

async function pollPresentationCollaboration() {
  if (
    presentationCollaborationBusy
    || !activeProject
    || !activePresentation
    || presentationScreen.hidden
    || !window.localOverleaf.getPresentationProjectRevision
  ) return;
  presentationCollaborationBusy = true;
  try {
    const source = await window.localOverleaf.getPresentationProjectRevision(activeProject.id);
    if (!source?.revision || source.revision === activePresentation.revision) return;
    if (presentationDirty) {
      setPresentationStatus("Shared edits available · Save to merge", "unsaved");
      setPresentationCollaborationStatus("Shared · merge pending", "pending");
      return;
    }
    await reloadPresentationFromSharedSource();
  } catch (error) {
    setPresentationCollaborationStatus("Shared · offline", "conflict");
  } finally {
    presentationCollaborationBusy = false;
  }
}

function startPresentationCollaborationPolling() {
  stopPresentationCollaborationPolling();
  setPresentationCollaborationStatus("Shared · synced", "synced");
  presentationCollaborationTimer = setInterval(() => {
    void pollPresentationCollaboration();
  }, 2500);
}

async function loadPresentationPdf(pdfBuffer, thumbnailPdfBuffer) {
  if (presentationZoomRenderFrame) {
    cancelAnimationFrame(presentationZoomRenderFrame);
    presentationZoomRenderFrame = 0;
  }
  presentationZoomAnchor = null;
  if (presentationBackgroundRenderTask) {
    presentationBackgroundRenderTask.cancel();
    try {
      await presentationBackgroundRenderTask.promise;
    } catch (error) {
    }
    presentationBackgroundRenderTask = null;
  }
  if (activePresentationPdf && activePresentationPdf.destroy) {
    try {
      await activePresentationPdf.destroy();
    } catch (error) {
    }
  }
  if (activePresentationThumbnailPdf && activePresentationThumbnailPdf.destroy) {
    try {
      await activePresentationThumbnailPdf.destroy();
    } catch (error) {
    }
  }
  const pdfjsLib = await loadPdfJs();
  const backgroundTask = pdfjsLib.getDocument({ data: new Uint8Array(pdfBuffer) });
  const thumbnailTask = pdfjsLib.getDocument({
    data: new Uint8Array(thumbnailPdfBuffer || pdfBuffer.slice(0))
  });
  [activePresentationPdf, activePresentationThumbnailPdf] = await Promise.all([
    backgroundTask.promise,
    thumbnailTask.promise
  ]);
}

async function openPresentationProject(project) {
  clearTimeout(autoCompileTimer);
  stopExternalSourcePolling();
  stopPresentationCollaborationPolling();
  activeProject = project;
  activePresentation = null;
  selectedPresentationElement = null;
  presentationTextSelection = null;
  presentationChangeMap = new Map();
  presentationDirty = false;
  presentationSelectionScope = "canvas";
  presentationUndoStack = [];
  presentationRedoStack = [];
  updatePresentationHistoryButtons();
  activePresentationSlideIndex = 0;
  projectScreen.hidden = true;
  editorScreen.hidden = true;
  presentationScreen.hidden = false;
  presentationScreen.classList.remove("pptx-presenting");
  if (pptxPresentControls) pptxPresentControls.hidden = true;
  placePresentationTerminalPanel();
  setPresentationTerminalOpen(false, { persist: false });
  pptxProjectTitle.textContent = project.displayName || project.name || project.texName || "Presentation";
  if (pptxFileTree) pptxFileTree.innerHTML = '<div class="file-message">Loading files...</div>';
  pptxSlideList.innerHTML = '<div class="file-message">Loading slides...</div>';
  pptxElementLayer.innerHTML = "";
  setPresentationStatus("Loading PowerPoint…");
  pptxSaveButton.disabled = true;

  try {
    const data = await window.localOverleaf.loadPresentationProject(project.id);
    activeProject = data.project || project;
    activePresentation = data.presentation;
    rebuildPresentationElementBaselines();
    await loadPresentationPdf(data.pdf, data.thumbnailPdf);
    pptxProjectTitle.textContent = activePresentation.fileName || activeProject.displayName || activeProject.name;
    pptxSlideCount.textContent = `${activePresentation.slides.length}`;
    presentationScreen.style.setProperty("--pptx-aspect", `${activePresentation.width} / ${activePresentation.height}`);
    await loadProjectFiles();
    await renderPresentationSlideList();
    await renderPresentationSlide();
    renderPresentationInspector();
    setPresentationStatus("Saved", "ok");
    startPresentationCollaborationPolling();
    pptxSaveButton.disabled = false;
  } catch (error) {
    pptxSlideList.innerHTML = `<div class="file-message file-error">${escapeHtml(formatError(error))}</div>`;
    setPresentationStatus("Load failed", "error");
  }
}

async function renderPresentationSlideList() {
  if (!activePresentation) return;
  const token = ++presentationThumbnailToken;
  pptxSlideList.innerHTML = "";
  activePresentation.slides.forEach((slide, index) => {
    const button = document.createElement("button");
    button.className = "pptx-slide-thumb";
    button.classList.toggle("active", index === activePresentationSlideIndex);
    button.type = "button";
    button.dataset.slideIndex = String(index);
    button.setAttribute("aria-label", `Slide ${index + 1}: ${slide.title || `Slide ${index + 1}`}`);
    button.innerHTML = `
      <span class="pptx-slide-thumb-number">${index + 1}</span>
      <span class="pptx-slide-thumb-preview"><canvas></canvas></span>
    `;
    button.addEventListener("click", async () => {
      presentationSelectionScope = "slide";
      activePresentationSlideIndex = index;
      selectedPresentationElement = null;
      pptxSlideList.querySelectorAll(".pptx-slide-thumb").forEach((thumbnail, thumbnailIndex) => {
        thumbnail.classList.toggle("active", thumbnailIndex === activePresentationSlideIndex);
      });
      await renderPresentationSlide();
      renderPresentationInspector();
    });
    button.addEventListener("focus", () => {
      presentationSelectionScope = "slide";
    });
    pptxSlideList.appendChild(button);
  });
  void renderPresentationThumbnails(token).catch(() => {});
}

async function renderPresentationThumbnails(token) {
  const thumbnailDocument = activePresentationThumbnailPdf || activePresentationPdf;
  if (!thumbnailDocument || !activePresentation) return;
  const buttons = Array.from(pptxSlideList.querySelectorAll(".pptx-slide-thumb"));
  for (let index = 0; index < buttons.length; index += 1) {
    if (token !== presentationThumbnailToken) return;
    const canvas = buttons[index].querySelector("canvas");
    if (!canvas) continue;
    const slide = activePresentation.slides[index];
    const pageIndex = Math.max(0, Number(slide.previewPageIndex ?? slide.index ?? index));
    const page = await thumbnailDocument.getPage(Math.min(thumbnailDocument.numPages, pageIndex + 1));
    const baseViewport = page.getViewport({ scale: 1 });
    const preview = buttons[index].querySelector(".pptx-slide-thumb-preview");
    const targetWidth = Math.max(132, Math.min(220, Math.round(preview?.clientWidth || 168)));
    const viewport = page.getViewport({ scale: targetWidth / baseViewport.width });
    const outputScale = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    canvas.width = Math.max(1, Math.floor(viewport.width * outputScale));
    canvas.height = Math.max(1, Math.floor(viewport.height * outputScale));
    const context = canvas.getContext("2d");
    context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
    const task = page.render({ canvasContext: context, viewport, background: "#ffffff" });
    const completed = await Promise.race([
      task.promise.then(() => true).catch(() => false),
      new Promise((resolve) => setTimeout(() => resolve(false), 8000))
    ]);
    if (!completed) {
      task.cancel();
      return;
    }
  }
}

function capturePresentationZoomAnchor({ clientX, clientY } = {}) {
  if (!pptxStageViewport || !pptxSlideCanvas) return null;
  const viewportRect = pptxStageViewport.getBoundingClientRect();
  const canvasRect = pptxSlideCanvas.getBoundingClientRect();
  if (!canvasRect.width || !canvasRect.height) return null;
  const focusX = Number.isFinite(clientX)
    ? Math.max(viewportRect.left, Math.min(viewportRect.right, clientX))
    : viewportRect.left + (viewportRect.width / 2);
  const focusY = Number.isFinite(clientY)
    ? Math.max(viewportRect.top, Math.min(viewportRect.bottom, clientY))
    : viewportRect.top + (viewportRect.height / 2);
  return {
    focusX,
    focusY,
    slideX: Math.max(0, Math.min(1, (focusX - canvasRect.left) / canvasRect.width)),
    slideY: Math.max(0, Math.min(1, (focusY - canvasRect.top) / canvasRect.height))
  };
}

function restorePresentationZoomAnchor(anchor) {
  if (!anchor || !pptxStageViewport || !pptxSlideCanvas) return;
  const canvasRect = pptxSlideCanvas.getBoundingClientRect();
  const anchoredX = canvasRect.left + (canvasRect.width * anchor.slideX);
  const anchoredY = canvasRect.top + (canvasRect.height * anchor.slideY);
  pptxStageViewport.scrollLeft += anchoredX - anchor.focusX;
  pptxStageViewport.scrollTop += anchoredY - anchor.focusY;
}

function setPresentationZoom(value, focalPoint = {}) {
  if (!pptxZoomRange || presentationViewIsActive()) return;
  const minimum = Number(pptxZoomRange.min || 25);
  const maximum = Number(pptxZoomRange.max || 400);
  const clamped = Math.max(minimum, Math.min(maximum, Number(value) || 100));
  presentationZoomAnchor = capturePresentationZoomAnchor(focalPoint);
  pptxZoomRange.value = String(clamped);
  presentationScreen.classList.toggle("pptx-overview-mode", clamped < 90);
  if (pptxZoomOutput) pptxZoomOutput.value = `${clamped}%`;
  if (presentationZoomRenderFrame) cancelAnimationFrame(presentationZoomRenderFrame);
  presentationZoomRenderFrame = requestAnimationFrame(() => {
    presentationZoomRenderFrame = 0;
    const anchor = presentationZoomAnchor;
    presentationZoomAnchor = null;
    void renderPresentationSlide({ preserveSelection: true }).then(() => {
      requestAnimationFrame(() => restorePresentationZoomAnchor(anchor));
    });
  });
}

function stepPresentationZoom(direction, focalPoint = {}) {
  const step = Number(pptxZoomRange?.step || 5);
  setPresentationZoom(Number(pptxZoomRange?.value || 100) + (direction * step), focalPoint);
}

function presentationCanvasDimensions() {
  const presenting = presentationViewIsActive();
  const canvasPadding = presenting ? 0 : 72;
  const availableWidth = Math.max(320, (pptxStageViewport.clientWidth || 900) - canvasPadding);
  const availableHeight = Math.max(180, (pptxStageViewport.clientHeight || 640) - canvasPadding);
  const aspect = activePresentation.width / activePresentation.height;
  const fitWidth = Math.min(presenting ? availableWidth : 1100, availableWidth, availableHeight * aspect);
  const zoom = presenting ? 1 : Math.max(0.5, Number(pptxZoomRange.value || 100) / 100);
  return {
    width: Math.max(320, fitWidth * zoom),
    height: Math.max(180, (fitWidth / aspect) * zoom)
  };
}

async function renderPresentationSlide({ preserveSelection = false } = {}) {
  const slide = currentPresentationSlide();
  if (!slide || !activePresentationPdf) return;
  const token = ++presentationRenderToken;
  if (presentationBackgroundRenderTask) {
    presentationBackgroundRenderTask.cancel();
    try {
      await presentationBackgroundRenderTask.promise;
    } catch (error) {
    }
    presentationBackgroundRenderTask = null;
    if (token !== presentationRenderToken) return;
  }
  const selectedId = preserveSelection && selectedPresentationElement ? selectedPresentationElement.id : "";
  const dimensions = presentationCanvasDimensions();
  const cssWidth = Math.round(dimensions.width);
  const cssHeight = Math.round(dimensions.height);
  presentationCanvasScale = cssWidth / activePresentation.width;
  pptxSlideCanvas.style.width = `${cssWidth}px`;
  pptxSlideCanvas.style.height = `${cssHeight}px`;
  pptxStageLabel.textContent = `Slide ${activePresentationSlideIndex + 1} of ${activePresentation.slides.length}`;
  if (pptxStatusSlide) pptxStatusSlide.textContent = `Slide ${activePresentationSlideIndex + 1} of ${activePresentation.slides.length}`;
  updatePresentationViewControls();
  presentationScreen.classList.toggle("pptx-overview-mode", Number(pptxZoomRange.value || 100) < 90);
  if (pptxZoomOutput) pptxZoomOutput.value = `${pptxZoomRange.value}%`;
  if (pptxBackgroundColorInput && /^#[0-9a-f]{6}$/i.test(slide.backgroundColor || "")) {
    pptxBackgroundColorInput.value = slide.backgroundColor;
  }
  if (pptxBackgroundButton) {
    pptxBackgroundButton.style.setProperty("--pptx-background-swatch", slide.backgroundColor || "#ffffff");
  }
  if (pptxTransitionButton) {
    const hasFade = slide.transition === "fade";
    pptxTransitionButton.classList.toggle("active", hasFade);
    pptxTransitionButton.textContent = hasFade ? "Transition: Fade" : "Transition";
  }
  pptxBackgroundCanvas.style.width = `${cssWidth}px`;
  pptxBackgroundCanvas.style.height = `${cssHeight}px`;
  const outputScale = Math.max(1, Math.min(
    2.5,
    Math.max(1.5, window.devicePixelRatio || 1),
    8192 / Math.max(1, cssWidth),
    8192 / Math.max(1, cssHeight)
  ));
  pptxBackgroundCanvas.width = Math.floor(cssWidth * outputScale);
  pptxBackgroundCanvas.height = Math.floor(cssHeight * outputScale);

  renderPresentationElements();
  const pageIndex = Math.max(0, Number(slide.previewPageIndex ?? slide.index ?? activePresentationSlideIndex));
  const page = await activePresentationPdf.getPage(Math.min(activePresentationPdf.numPages, pageIndex + 1));
  if (token !== presentationRenderToken) return;
  const baseViewport = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: cssWidth / baseViewport.width });
  const context = pptxBackgroundCanvas.getContext("2d");
  context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
  context.clearRect(0, 0, cssWidth, cssHeight);
  const renderTask = page.render({ canvasContext: context, viewport, background: "#ffffff" });
  presentationBackgroundRenderTask = renderTask;
  try {
    const completed = await Promise.race([
      renderTask.promise.then(() => true),
      new Promise((resolve) => setTimeout(() => resolve(false), 12000))
    ]);
    if (!completed) renderTask.cancel();
  } catch (error) {
    if (error?.name !== "RenderingCancelledException") throw error;
    return;
  } finally {
    if (presentationBackgroundRenderTask === renderTask) presentationBackgroundRenderTask = null;
  }
  if (token !== presentationRenderToken) return;
  if (selectedId) {
    const selected = slide.elements.find((element) => element.id === selectedId && !element.deleted);
    selectPresentationElement(selected || null, { rerender: false });
  }
}

function presentationTextAlign(value) {
  if (value === "ctr") return "center";
  if (value === "r") return "right";
  if (value === "just") return "justify";
  return "left";
}

function presentationElementCanHaveOutline(element) {
  return Boolean(element && ["p:sp", "p:pic", "p:cxnSp"].includes(element.tagName));
}

function presentationLineCssStyle(value) {
  if (value === "dash") return "dashed";
  if (value === "dot") return "dotted";
  if (value === "dashDot") return "dashed";
  return "solid";
}

function presentationLinePixels(width) {
  const points = Math.max(0, Number(width) || 0);
  return points * (PPTX_EMU_PER_INCH / 72) * presentationCanvasScale;
}

function positionPresentationElementNode(node, element) {
  const scale = presentationCanvasScale;
  node.style.left = `${element.x * scale}px`;
  node.style.top = `${element.y * scale}px`;
  node.style.width = `${Math.max(2, element.cx * scale)}px`;
  node.style.height = `${Math.max(2, element.cy * scale)}px`;
  node.style.transform = element.rotation ? `rotate(${element.rotation}deg)` : "";
}

function decorateSelectedPresentationElementNode(node, element) {
  if (!node || !element) return;
  node.classList.add("selected");
  if (node.querySelector(".pptx-element-handle")) return;
  ["nw", "ne", "sw", "se"].forEach((direction) => {
    const handle = document.createElement("span");
    handle.className = "pptx-element-handle";
    handle.dataset.handle = direction;
    handle.setAttribute("aria-hidden", "true");
    handle.addEventListener("pointerdown", (event) => beginPresentationElementResize(event, element, node, direction));
    node.appendChild(handle);
  });
}

function presentationTextRunFallback(element, text = "") {
  return {
    text,
    fontSize: Number(element.fontSize) || 18,
    fontFamily: element.fontFamily || "Aptos",
    color: element.color || "#1f2937",
    bold: Boolean(element.bold),
    italic: Boolean(element.italic),
    underline: Boolean(element.underline)
  };
}

function mergePresentationTextRuns(runs) {
  const merged = [];
  runs.filter((run) => run && run.text !== "").forEach((run) => {
    const normalized = { ...presentationTextRunFallback(run, String(run.text || "")), ...run };
    normalized.text = String(run.text || "");
    const previous = merged[merged.length - 1];
    const sameStyle = previous
      && previous.fontSize === normalized.fontSize
      && previous.fontFamily === normalized.fontFamily
      && previous.color === normalized.color
      && previous.bold === Boolean(normalized.bold)
      && previous.italic === Boolean(normalized.italic)
      && previous.underline === Boolean(normalized.underline);
    normalized.bold = Boolean(normalized.bold);
    normalized.italic = Boolean(normalized.italic);
    normalized.underline = Boolean(normalized.underline);
    if (sameStyle) previous.text += normalized.text;
    else merged.push(normalized);
  });
  return merged;
}

function normalizedPresentationTextRuns(element) {
  const text = String(element.text || "");
  const source = Array.isArray(element.richTextRuns) ? element.richTextRuns : [];
  const runs = mergePresentationTextRuns(source);
  if (!runs.length || runs.map((run) => run.text).join("") !== text) {
    return [presentationTextRunFallback(element, text)];
  }
  return runs;
}

function presentationTextRunsWithUpdatedText(element, nextText) {
  const previousText = String(element.text || "");
  const normalizedNextText = String(nextText || "");
  const previousRuns = normalizedPresentationTextRuns(element);
  if (previousText === normalizedNextText) return previousRuns;

  const characterStyles = [];
  previousRuns.forEach((run) => {
    const style = { ...run };
    delete style.text;
    for (let index = 0; index < run.text.length; index += 1) characterStyles.push(style);
  });

  let prefixLength = 0;
  const sharedLength = Math.min(previousText.length, normalizedNextText.length);
  while (
    prefixLength < sharedLength
    && previousText[prefixLength] === normalizedNextText[prefixLength]
  ) prefixLength += 1;

  let suffixLength = 0;
  while (
    suffixLength < previousText.length - prefixLength
    && suffixLength < normalizedNextText.length - prefixLength
    && previousText[previousText.length - suffixLength - 1]
      === normalizedNextText[normalizedNextText.length - suffixLength - 1]
  ) suffixLength += 1;

  const fallbackStyle = presentationTextRunFallback(element, "");
  delete fallbackStyle.text;
  const insertedStyle = characterStyles[prefixLength - 1]
    || characterStyles[Math.min(prefixLength, Math.max(0, characterStyles.length - 1))]
    || fallbackStyle;
  const nextRuns = [];
  for (let index = 0; index < normalizedNextText.length; index += 1) {
    let style = insertedStyle;
    if (index < prefixLength) style = characterStyles[index] || insertedStyle;
    else if (index >= normalizedNextText.length - suffixLength) {
      const previousIndex = previousText.length - (normalizedNextText.length - index);
      style = characterStyles[previousIndex] || insertedStyle;
    }
    nextRuns.push({ ...style, text: normalizedNextText[index] });
  }
  return mergePresentationTextRuns(nextRuns);
}

function presentationFontPixels(fontSize) {
  return Math.max(4, Number(fontSize || 18) * (pptxSlideCanvas.clientWidth / activePresentation.widthInches) / 72);
}

function renderPresentationRichText(textNode, element) {
  textNode.innerHTML = "";
  normalizedPresentationTextRuns(element).forEach((run) => {
    const span = document.createElement("span");
    span.className = "pptx-text-run";
    span.textContent = run.text;
    span.style.color = run.color || element.color || "#1f2937";
    span.style.fontFamily = run.fontFamily || element.fontFamily || "Aptos";
    span.style.fontSize = `${presentationFontPixels(run.fontSize)}px`;
    span.style.fontWeight = run.bold ? "700" : "400";
    span.style.fontStyle = run.italic ? "italic" : "normal";
    span.style.textDecoration = run.underline ? "underline" : "none";
    textNode.appendChild(span);
  });
}

function presentationTextOffset(root, node, offset) {
  try {
    const range = document.createRange();
    range.selectNodeContents(root);
    range.setEnd(node, offset);
    return range.toString().length;
  } catch (error) {
    return 0;
  }
}

function capturePresentationTextSelection() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return presentationTextSelection;
  const range = selection.getRangeAt(0);
  const startElement = range.startContainer.nodeType === Node.ELEMENT_NODE
    ? range.startContainer
    : range.startContainer.parentElement;
  const endElement = range.endContainer.nodeType === Node.ELEMENT_NODE
    ? range.endContainer
    : range.endContainer.parentElement;
  const textNode = startElement && startElement.closest ? startElement.closest(".pptx-element-text") : null;
  if (!textNode || !endElement || !textNode.contains(endElement)) return presentationTextSelection;
  const elementNode = textNode.closest(".pptx-element");
  if (!elementNode) return presentationTextSelection;
  const start = presentationTextOffset(textNode, range.startContainer, range.startOffset);
  const end = presentationTextOffset(textNode, range.endContainer, range.endOffset);
  presentationTextSelection = {
    elementId: elementNode.dataset.elementId,
    start: Math.min(start, end),
    end: Math.max(start, end)
  };
  return presentationTextSelection;
}

function presentationTextPointAtOffset(root, requestedOffset) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let remaining = Math.max(0, Number(requestedOffset) || 0);
  let node = walker.nextNode();
  let last = null;
  while (node) {
    last = node;
    const length = node.textContent.length;
    if (remaining <= length) return { node, offset: remaining };
    remaining -= length;
    node = walker.nextNode();
  }
  if (!last) {
    last = document.createTextNode("");
    root.appendChild(last);
  }
  return { node: last, offset: last.textContent.length };
}

function presentationWordBoundsAtOffset(text, requestedOffset) {
  const source = String(text || "");
  if (!source) return null;
  const isWordCharacter = (character) => /[\p{L}\p{N}_'-]/u.test(character || "");
  let offset = Math.max(0, Math.min(source.length, Number(requestedOffset) || 0));
  if (offset === source.length && offset > 0) offset -= 1;
  if (!isWordCharacter(source[offset]) && offset > 0 && isWordCharacter(source[offset - 1])) offset -= 1;
  if (!isWordCharacter(source[offset])) return null;
  let start = offset;
  let end = offset + 1;
  while (start > 0 && isWordCharacter(source[start - 1])) start -= 1;
  while (end < source.length && isWordCharacter(source[end])) end += 1;
  return { start, end };
}

function restorePresentationTextSelection(textNode, selectionState) {
  if (!textNode || !selectionState) return;
  const selection = window.getSelection();
  const start = presentationTextPointAtOffset(textNode, selectionState.start);
  const end = presentationTextPointAtOffset(textNode, selectionState.end);
  const range = document.createRange();
  range.setStart(start.node, start.offset);
  range.setEnd(end.node, end.offset);
  selection.removeAllRanges();
  selection.addRange(range);
}

function presentationSelectionStyleValue(property) {
  const element = selectedPresentationElement;
  if (!element) return undefined;
  const selection = capturePresentationTextSelection();
  if (!selection || selection.elementId !== String(element.id) || selection.end <= selection.start) {
    return element[property];
  }
  let cursor = 0;
  const matchingRuns = normalizedPresentationTextRuns(element).filter((run) => {
    const runStart = cursor;
    const runEnd = cursor + run.text.length;
    cursor = runEnd;
    return selection.start < runEnd && selection.end > runStart;
  });
  if (!matchingRuns.length) return element[property];
  if (["bold", "italic", "underline"].includes(property)) {
    return matchingRuns.every((run) => Boolean(run[property]));
  }
  return matchingRuns[0][property];
}

function applyPresentationTextRangeFormat(element, selectionState, property, value) {
  const nextRuns = [];
  let cursor = 0;
  normalizedPresentationTextRuns(element).forEach((run) => {
    const runStart = cursor;
    const runEnd = cursor + run.text.length;
    cursor = runEnd;
    const overlapStart = Math.max(runStart, selectionState.start);
    const overlapEnd = Math.min(runEnd, selectionState.end);
    if (overlapStart >= overlapEnd) {
      nextRuns.push(run);
      return;
    }
    const beforeLength = overlapStart - runStart;
    const selectedLength = overlapEnd - overlapStart;
    if (beforeLength > 0) nextRuns.push({ ...run, text: run.text.slice(0, beforeLength) });
    nextRuns.push({
      ...run,
      text: run.text.slice(beforeLength, beforeLength + selectedLength),
      [property]: value
    });
    if (overlapEnd < runEnd) nextRuns.push({ ...run, text: run.text.slice(beforeLength + selectedLength) });
  });
  element.richTextRuns = mergePresentationTextRuns(nextRuns);
}

function formatSelectedPresentationTextRange(property, value) {
  const element = selectedPresentationElement;
  if (!element || !(element.type === "text" || element.hasTextBody)) return false;
  const selectionState = capturePresentationTextSelection();
  if (!selectionState || selectionState.elementId !== String(element.id) || selectionState.end <= selectionState.start) return false;
  recordPresentationUndo();
  applyPresentationTextRangeFormat(element, selectionState, property, value);
  markPresentationElementChanged(element);
  const elementNode = pptxElementLayer.querySelector(`[data-element-id="${CSS.escape(String(element.id))}"]`);
  const textNode = elementNode && elementNode.querySelector(".pptx-element-text");
  if (textNode) {
    const wasEditing = elementNode.classList.contains("editing");
    renderPresentationRichText(textNode, element);
    textNode.contentEditable = wasEditing ? "true" : "false";
    if (wasEditing) restorePresentationTextSelection(textNode, selectionState);
  }
  renderPresentationInspector();
  return true;
}

function renderPresentationElements() {
  const slide = currentPresentationSlide();
  if (!slide) return;
  pptxElementLayer.innerHTML = "";
  slide.elements.filter((element) => !element.deleted).forEach((element) => {
    const node = document.createElement("div");
    const isText = element.type === "text" || element.hasTextBody;
    node.className = `pptx-element ${isText ? "pptx-text-element" : "pptx-nontext-element"}`;
    node.dataset.elementId = element.id;
    node.style.zIndex = String(Math.max(1, element.zIndex + 1));
    node.style.color = element.color || "#1f2937";
    node.style.fontFamily = element.fontFamily || "Aptos";
    node.style.fontSize = `${presentationFontPixels(element.fontSize)}px`;
    node.style.fontWeight = element.bold ? "700" : "400";
    node.style.fontStyle = element.italic ? "italic" : "normal";
    node.style.textDecoration = element.underline ? "underline" : "none";
    node.style.textAlign = presentationTextAlign(element.align);
    node.style.justifyContent = element.verticalAlign === "ctr" ? "center" : element.verticalAlign === "b" ? "flex-end" : "flex-start";
    positionPresentationElementNode(node, element);
    const hasLocalVisualChange = element.isNew
      || presentationChangeMap.has(presentationElementKey(slide, element));
    if (hasLocalVisualChange && element.fillColor && element.tagName === "p:sp") {
      node.style.background = element.fillColor;
    }
    if (hasLocalVisualChange && presentationElementCanHaveOutline(element)) {
      const lineWidth = Math.max(0, Number(element.lineWidth) || 0);
      if (lineWidth > 0) {
        node.style.borderColor = element.lineColor || "#1f2937";
        node.style.borderStyle = presentationLineCssStyle(element.lineStyle);
        node.style.borderWidth = `${Math.max(1, presentationLinePixels(lineWidth))}px`;
      } else {
        node.style.borderColor = "transparent";
        node.style.borderWidth = "0";
      }
    }
    if (element.shapeType === "ellipse") node.style.borderRadius = "50%";

    if (isText) {
      const text = document.createElement("span");
      text.className = "pptx-element-text";
      renderPresentationRichText(text, element);
      text.style.padding = `${element.marginTop * presentationCanvasScale}px ${element.marginRight * presentationCanvasScale}px ${element.marginBottom * presentationCanvasScale}px ${element.marginLeft * presentationCanvasScale}px`;
      node.appendChild(text);
      node.addEventListener("dblclick", (event) => beginPresentationInlineEdit(event, element, text, node));
    } else {
      if (element.type === "image" && element.imageData) {
        const image = document.createElement("img");
        image.className = "pptx-inserted-image";
        image.src = element.imageData;
        image.alt = element.name || "Inserted image";
        image.draggable = false;
        node.appendChild(image);
      }
      const label = document.createElement("span");
      label.className = "pptx-nontext-label";
      label.textContent = element.type;
      node.appendChild(label);
    }

    node.addEventListener("pointerdown", (event) => beginPresentationElementDrag(event, element, node));
    if (selectedPresentationElement && selectedPresentationElement.id === element.id) {
      decorateSelectedPresentationElementNode(node, element);
    }
    pptxElementLayer.appendChild(node);
  });
}

function selectPresentationElement(element, { rerender = true } = {}) {
  if (!element || !selectedPresentationElement || String(element.id) !== String(selectedPresentationElement.id)) {
    presentationTextSelection = null;
  }
  selectedPresentationElement = element || null;
  presentationSelectionScope = selectedPresentationElement ? "element" : "canvas";
  if (pptxDeleteElementButton) pptxDeleteElementButton.disabled = !selectedPresentationElement;
  renderPresentationInspector();
  if (rerender) renderPresentationElements();
}

function updatePresentationOrderControls(element = selectedPresentationElement) {
  const slide = currentPresentationSlide();
  const ordered = slide
    ? slide.elements
      .filter((item) => !item.deleted)
      .slice()
      .sort((a, b) => (Number(a.zIndex) || 0) - (Number(b.zIndex) || 0))
    : [];
  const index = element ? ordered.indexOf(element) : -1;
  const canMoveBackward = index > 0;
  const canMoveForward = index >= 0 && index < ordered.length - 1;
  if (pptxSendToBackButton) pptxSendToBackButton.disabled = !canMoveBackward;
  if (pptxSendBackwardButton) pptxSendBackwardButton.disabled = !canMoveBackward;
  if (pptxBringForwardButton) pptxBringForwardButton.disabled = !canMoveForward;
  if (pptxBringToFrontButton) pptxBringToFrontButton.disabled = !canMoveForward;
}

function renderPresentationInspector() {
  const element = selectedPresentationElement;
  if (pptxInspectorEmpty) pptxInspectorEmpty.hidden = Boolean(element);
  if (pptxInspectorFields) pptxInspectorFields.hidden = !element;
  if (pptxContextToolbar) pptxContextToolbar.hidden = !element;
  presentationScreen.classList.toggle("pptx-has-selection", Boolean(element));
  if (pptxElementType) {
    const label = !element
      ? "No selection"
      : (element.type === "text" || element.hasTextBody)
        ? "Text"
        : element.type === "image"
          ? "Image"
          : element.type === "shape"
            ? "Shape"
            : "Object";
    pptxElementType.textContent = label;
  }
  updatePresentationOrderControls(element);
  if (!element) return;
  const isText = element.type === "text" || element.hasTextBody;
  if (pptxTextContextControls) pptxTextContextControls.hidden = !isText;
  if (pptxTextInput) {
    pptxTextInput.disabled = !isText;
    pptxTextInput.value = isText ? (element.text || "") : "";
  }
  if (pptxXInput) pptxXInput.value = (element.x / PPTX_EMU_PER_INCH).toFixed(2);
  if (pptxYInput) pptxYInput.value = (element.y / PPTX_EMU_PER_INCH).toFixed(2);
  if (pptxWidthInput) pptxWidthInput.value = (element.cx / PPTX_EMU_PER_INCH).toFixed(2);
  if (pptxHeightInput) pptxHeightInput.value = (element.cy / PPTX_EMU_PER_INCH).toFixed(2);
  pptxFontSizeInput.disabled = !isText;
  pptxFontSizeInput.value = Math.round(presentationSelectionStyleValue("fontSize") || element.fontSize || 18);
  const canFill = element.type === "shape";
  const selectedColor = isText ? (presentationSelectionStyleValue("color") || element.color) : element.fillColor;
  pptxColorInput.disabled = !(isText || canFill);
  pptxColorInput.value = /^#[0-9a-f]{6}$/i.test(selectedColor || "") ? selectedColor : (isText ? "#1f2937" : "#5B9BD5");
  const colorControl = pptxColorInput.closest(".pptx-color-control");
  if (colorControl) {
    colorControl.hidden = !(isText || canFill);
    colorControl.style.setProperty("--pptx-color-swatch", pptxColorInput.value);
  }
  const canOutline = presentationElementCanHaveOutline(element);
  if (pptxOutlineControls) pptxOutlineControls.hidden = !canOutline;
  if (pptxLineColorInput) {
    pptxLineColorInput.disabled = !canOutline;
    pptxLineColorInput.value = /^#[0-9a-f]{6}$/i.test(element.lineColor || "")
      ? element.lineColor
      : "#1f2937";
    const lineColorControl = pptxLineColorInput.closest(".pptx-line-color-control");
    if (lineColorControl) lineColorControl.style.setProperty("--pptx-line-color-swatch", pptxLineColorInput.value);
  }
  if (pptxLineWidthInput) {
    pptxLineWidthInput.disabled = !canOutline;
    pptxLineWidthInput.value = String(Math.max(0, Number(element.lineWidth) || 0));
  }
  if (pptxLineStyleSelect) {
    pptxLineStyleSelect.disabled = !canOutline;
    pptxLineStyleSelect.value = ["solid", "dash", "dot", "dashDot"].includes(element.lineStyle)
      ? element.lineStyle
      : "solid";
  }
  pptxFontFamilyInput.disabled = !isText;
  const selectedFontFamily = presentationSelectionStyleValue("fontFamily") || element.fontFamily || "Aptos";
  Array.from(pptxFontFamilyInput.options || [])
    .filter((option) => option.dataset.dynamicFont === "true" && option.value !== selectedFontFamily)
    .forEach((option) => option.remove());
  if (!Array.from(pptxFontFamilyInput.options || []).some((option) => option.value === selectedFontFamily)) {
    const option = document.createElement("option");
    option.value = selectedFontFamily;
    option.textContent = selectedFontFamily;
    option.dataset.dynamicFont = "true";
    pptxFontFamilyInput.appendChild(option);
  }
  pptxFontFamilyInput.value = selectedFontFamily;
  pptxBoldButton.disabled = !isText;
  pptxItalicButton.disabled = !isText;
  pptxUnderlineButton.disabled = !isText;
  pptxBoldButton.setAttribute("aria-pressed", presentationSelectionStyleValue("bold") ? "true" : "false");
  pptxItalicButton.setAttribute("aria-pressed", presentationSelectionStyleValue("italic") ? "true" : "false");
  pptxUnderlineButton.setAttribute("aria-pressed", presentationSelectionStyleValue("underline") ? "true" : "false");
  pptxAlignSelect.disabled = !isText;
  pptxAlignSelect.value = ["l", "ctr", "r", "just"].includes(element.align) ? element.align : "l";
}

function markPresentationElementChanged(element) {
  const slide = currentPresentationSlide();
  if (!slide || !element) return;
  const key = presentationElementKey(slide, element);
  const base = presentationElementBaselines.get(key) || {};
  const current = presentationElementTrackedState(element);
  const changedProperties = element.isNew
    ? PRESENTATION_TRACKED_ELEMENT_PROPERTIES.slice()
    : element.deleted
      ? ["deleted"]
      : PRESENTATION_TRACKED_ELEMENT_PROPERTIES.filter((property) => (
        !presentationValuesEqual(current[property], base[property])
      ));
  presentationChangeMap.set(key, {
    slidePath: slide.path,
    id: element.id,
    name: element.name,
    type: element.type,
    shapeType: element.shapeType,
    isNew: Boolean(element.isNew),
    deleted: Boolean(element.deleted),
    ...current,
    richTextRuns: clonePresentationValue(normalizedPresentationTextRuns(element)),
    imageData: element.isNew ? element.imageData : undefined,
    imageFileName: element.isNew ? element.imageFileName : undefined,
    imageMediaType: element.isNew ? element.imageMediaType : undefined,
    bold: Boolean(element.bold),
    italic: Boolean(element.italic),
    underline: Boolean(element.underline),
    base: clonePresentationValue(base),
    changedProperties
  });
  presentationDirty = true;
  setPresentationStatus("Unsaved changes", "unsaved");
}

function updateSelectedPresentationElement(property, value, { rerender = true } = {}) {
  if (!selectedPresentationElement) return;
  const textStyleProperties = ["fontSize", "fontFamily", "color", "bold", "italic", "underline"];
  if (textStyleProperties.includes(property) && formatSelectedPresentationTextRange(property, value)) return;
  if (selectedPresentationElement[property] === value) return;
  recordPresentationUndo();
  selectedPresentationElement[property] = value;
  const isText = selectedPresentationElement.type === "text" || selectedPresentationElement.hasTextBody;
  if (isText && property === "text") {
    selectedPresentationElement.richTextRuns = [presentationTextRunFallback(selectedPresentationElement, String(value || ""))];
  } else if (isText && textStyleProperties.includes(property)) {
    selectedPresentationElement.richTextRuns = normalizedPresentationTextRuns(selectedPresentationElement)
      .map((run) => ({ ...run, [property]: value }));
  }
  markPresentationElementChanged(selectedPresentationElement);
  renderPresentationInspector();
  if (rerender) renderPresentationElements();
}

function updateSelectedPresentationOutline(changes, { activateIfNeeded = false } = {}) {
  const element = selectedPresentationElement;
  if (!presentationElementCanHaveOutline(element)) return;
  const next = { ...changes };
  if (Object.prototype.hasOwnProperty.call(next, "lineWidth")) {
    next.lineWidth = Math.max(0, Math.min(20, Number(next.lineWidth) || 0));
  }
  if (Object.prototype.hasOwnProperty.call(next, "lineStyle")
    && !["solid", "dash", "dot", "dashDot"].includes(next.lineStyle)) {
    next.lineStyle = "solid";
  }
  if (activateIfNeeded && !Object.prototype.hasOwnProperty.call(next, "lineWidth")
    && Math.max(0, Number(element.lineWidth) || 0) === 0) {
    next.lineWidth = 1;
  }
  const changed = Object.entries(next).some(([property, value]) => element[property] !== value);
  if (!changed) return;
  recordPresentationUndo();
  Object.assign(element, next);
  markPresentationElementChanged(element);
  renderPresentationInspector();
  renderPresentationElements();
}

function hidePresentationAlignmentGuides() {
  [pptxVerticalGuide, pptxHorizontalGuide].forEach((guide) => {
    if (!guide) return;
    guide.classList.remove("visible");
    guide.style.removeProperty("left");
    guide.style.removeProperty("top");
  });
}

function showPresentationAlignmentGuides({ x = null, y = null } = {}) {
  if (pptxVerticalGuide) {
    const visible = Number.isFinite(x);
    pptxVerticalGuide.classList.toggle("visible", visible);
    if (visible) pptxVerticalGuide.style.left = `${x * presentationCanvasScale}px`;
  }
  if (pptxHorizontalGuide) {
    const visible = Number.isFinite(y);
    pptxHorizontalGuide.classList.toggle("visible", visible);
    if (visible) pptxHorizontalGuide.style.top = `${y * presentationCanvasScale}px`;
  }
}

function presentationAlignmentCandidates(element, axis) {
  if (!activePresentation) return [];
  const isX = axis === "x";
  const slideExtent = isX ? activePresentation.width : activePresentation.height;
  const values = [0, slideExtent / 2, slideExtent];
  const slide = currentPresentationSlide();
  (slide?.elements || []).forEach((candidate) => {
    if (
      !candidate
      || candidate.deleted
      || String(candidate.id) === String(element.id)
    ) return;
    const start = Number(isX ? candidate.x : candidate.y);
    const size = Number(isX ? candidate.cx : candidate.cy);
    if (!Number.isFinite(start) || !Number.isFinite(size)) return;
    values.push(start, start + (size / 2), start + size);
  });
  return values;
}

function nearestPresentationAlignment(points, candidates, threshold) {
  let best = null;
  points.forEach((point) => {
    candidates.forEach((candidate) => {
      const delta = candidate - point;
      const distance = Math.abs(delta);
      if (distance > threshold || (best && distance >= best.distance)) return;
      best = { delta, distance, guide: candidate };
    });
  });
  return best;
}

function snapPresentationElementGeometry(element, geometry, {
  mode = "move",
  direction = "",
  disable = false
} = {}) {
  const next = { ...geometry };
  if (disable || !activePresentation || !presentationCanvasScale) {
    hidePresentationAlignmentGuides();
    return next;
  }
  const threshold = 6 / presentationCanvasScale;
  const xCandidates = presentationAlignmentCandidates(element, "x");
  const yCandidates = presentationAlignmentCandidates(element, "y");
  let xSnap = null;
  let ySnap = null;

  if (mode === "move") {
    xSnap = nearestPresentationAlignment(
      [next.x, next.x + (next.cx / 2), next.x + next.cx],
      xCandidates,
      threshold
    );
    ySnap = nearestPresentationAlignment(
      [next.y, next.y + (next.cy / 2), next.y + next.cy],
      yCandidates,
      threshold
    );
    if (xSnap) next.x += xSnap.delta;
    if (ySnap) next.y += ySnap.delta;
  } else {
    if (direction.includes("w")) {
      xSnap = nearestPresentationAlignment([next.x], xCandidates, threshold);
      if (xSnap) {
        next.x += xSnap.delta;
        next.cx -= xSnap.delta;
      }
    } else if (direction.includes("e")) {
      xSnap = nearestPresentationAlignment([next.x + next.cx], xCandidates, threshold);
      if (xSnap) next.cx += xSnap.delta;
    }
    if (direction.includes("n")) {
      ySnap = nearestPresentationAlignment([next.y], yCandidates, threshold);
      if (ySnap) {
        next.y += ySnap.delta;
        next.cy -= ySnap.delta;
      }
    } else if (direction.includes("s")) {
      ySnap = nearestPresentationAlignment([next.y + next.cy], yCandidates, threshold);
      if (ySnap) next.cy += ySnap.delta;
    }
  }

  const minimum = PPTX_EMU_PER_INCH * 0.1;
  next.cx = Math.max(minimum, next.cx);
  next.cy = Math.max(minimum, next.cy);
  next.x = Math.max(0, Math.min(activePresentation.width - next.cx, next.x));
  next.y = Math.max(0, Math.min(activePresentation.height - next.cy, next.y));
  showPresentationAlignmentGuides({
    x: xSnap ? xSnap.guide : null,
    y: ySnap ? ySnap.guide : null
  });
  return next;
}

function beginPresentationElementDrag(event, element, node) {
  if (event.button !== 0 || event.target.classList.contains("pptx-element-handle")) return;
  if (node.classList.contains("editing")) return;
  const isEditableText = element.type === "text" || element.hasTextBody;
  if (isEditableText && Number(event.detail) >= 2) {
    const textNode = node.querySelector(".pptx-element-text");
    if (textNode) {
      beginPresentationInlineEdit(event, element, textNode, node);
      return;
    }
  }
  event.preventDefault();
  event.stopPropagation();
  hidePresentationAlignmentGuides();
  if (node.setPointerCapture && Number.isFinite(event.pointerId)) {
    try {
      node.setPointerCapture(event.pointerId);
    } catch (error) {
    }
  }
  selectPresentationElement(element, { rerender: false });
  pptxElementLayer.querySelectorAll(".pptx-element.selected").forEach((selectedNode) => {
    if (selectedNode !== node) selectedNode.classList.remove("selected");
  });
  decorateSelectedPresentationElementNode(node, element);
  presentationDragState = {
    mode: "move",
    element,
    node,
    historySnapshot: presentationHistorySnapshot(),
    startX: event.clientX,
    startY: event.clientY,
    pointerId: event.pointerId,
    originalX: element.x,
    originalY: element.y,
    changed: false
  };
  node.classList.add("dragging");
  window.addEventListener("pointermove", updatePresentationDrag);
  window.addEventListener("pointerup", finishPresentationDrag);
  window.addEventListener("pointercancel", finishPresentationDrag);
}

function beginPresentationElementResize(event, element, node, direction = "se") {
  event.preventDefault();
  event.stopPropagation();
  hidePresentationAlignmentGuides();
  if (node.setPointerCapture && Number.isFinite(event.pointerId)) {
    try {
      node.setPointerCapture(event.pointerId);
    } catch (error) {
    }
  }
  presentationDragState = {
    mode: "resize",
    direction,
    element,
    node,
    historySnapshot: presentationHistorySnapshot(),
    startX: event.clientX,
    startY: event.clientY,
    pointerId: event.pointerId,
    originalX: element.x,
    originalY: element.y,
    originalCx: element.cx,
    originalCy: element.cy,
    changed: false
  };
  node.classList.add("dragging");
  window.addEventListener("pointermove", updatePresentationDrag);
  window.addEventListener("pointerup", finishPresentationDrag);
  window.addEventListener("pointercancel", finishPresentationDrag);
}

function updatePresentationDrag(event) {
  if (!presentationDragState || !activePresentation) return;
  if (
    Number.isFinite(presentationDragState.pointerId)
    && Number.isFinite(event.pointerId)
    && event.pointerId !== presentationDragState.pointerId
  ) return;
  const deltaX = (event.clientX - presentationDragState.startX) / presentationCanvasScale;
  const deltaY = (event.clientY - presentationDragState.startY) / presentationCanvasScale;
  const element = presentationDragState.element;
  if (presentationDragState.mode === "move") {
    let nextX = Math.max(0, Math.min(activePresentation.width - element.cx, presentationDragState.originalX + deltaX));
    let nextY = Math.max(0, Math.min(activePresentation.height - element.cy, presentationDragState.originalY + deltaY));
    const snapped = snapPresentationElementGeometry(element, {
      x: nextX,
      y: nextY,
      cx: element.cx,
      cy: element.cy
    }, { mode: "move", disable: event.altKey });
    nextX = snapped.x;
    nextY = snapped.y;
    presentationDragState.changed = presentationDragState.changed
      || Math.abs(nextX - presentationDragState.originalX) > 1
      || Math.abs(nextY - presentationDragState.originalY) > 1;
    element.x = nextX;
    element.y = nextY;
  } else {
    const minimum = PPTX_EMU_PER_INCH * 0.1;
    const direction = presentationDragState.direction || "se";
    let nextX = presentationDragState.originalX;
    let nextY = presentationDragState.originalY;
    let nextCx = presentationDragState.originalCx;
    let nextCy = presentationDragState.originalCy;
    if (direction.includes("e")) {
      nextCx = Math.max(minimum, Math.min(
        activePresentation.width - presentationDragState.originalX,
        presentationDragState.originalCx + deltaX
      ));
    }
    if (direction.includes("s")) {
      nextCy = Math.max(minimum, Math.min(
        activePresentation.height - presentationDragState.originalY,
        presentationDragState.originalCy + deltaY
      ));
    }
    if (direction.includes("w")) {
      const maximumX = presentationDragState.originalX + presentationDragState.originalCx - minimum;
      nextX = Math.max(0, Math.min(maximumX, presentationDragState.originalX + deltaX));
      nextCx = presentationDragState.originalX + presentationDragState.originalCx - nextX;
    }
    if (direction.includes("n")) {
      const maximumY = presentationDragState.originalY + presentationDragState.originalCy - minimum;
      nextY = Math.max(0, Math.min(maximumY, presentationDragState.originalY + deltaY));
      nextCy = presentationDragState.originalY + presentationDragState.originalCy - nextY;
    }
    const snapped = snapPresentationElementGeometry(element, {
      x: nextX,
      y: nextY,
      cx: nextCx,
      cy: nextCy
    }, { mode: "resize", direction, disable: event.altKey });
    nextX = snapped.x;
    nextY = snapped.y;
    nextCx = snapped.cx;
    nextCy = snapped.cy;
    presentationDragState.changed = presentationDragState.changed
      || Math.abs(nextX - presentationDragState.originalX) > 1
      || Math.abs(nextY - presentationDragState.originalY) > 1
      || Math.abs(nextCx - presentationDragState.originalCx) > 1
      || Math.abs(nextCy - presentationDragState.originalCy) > 1;
    element.x = nextX;
    element.y = nextY;
    element.cx = nextCx;
    element.cy = nextCy;
  }
  if (presentationDragState.node) positionPresentationElementNode(presentationDragState.node, element);
  renderPresentationInspector();
}

function finishPresentationDrag(event) {
  if (
    presentationDragState
    && Number.isFinite(presentationDragState.pointerId)
    && Number.isFinite(event?.pointerId)
    && event.pointerId !== presentationDragState.pointerId
  ) return;
  window.removeEventListener("pointermove", updatePresentationDrag);
  window.removeEventListener("pointerup", finishPresentationDrag);
  window.removeEventListener("pointercancel", finishPresentationDrag);
  hidePresentationAlignmentGuides();
  const changed = Boolean(presentationDragState && presentationDragState.element && presentationDragState.changed);
  const dragNode = presentationDragState && presentationDragState.node;
  const pointerId = presentationDragState && presentationDragState.pointerId;
  dragNode?.classList.remove("dragging");
  if (dragNode && dragNode.releasePointerCapture && Number.isFinite(pointerId)) {
    try {
      if (dragNode.hasPointerCapture(pointerId)) dragNode.releasePointerCapture(pointerId);
    } catch (error) {
    }
  }
  if (changed) {
    pushPresentationUndoSnapshot(presentationDragState.historySnapshot);
    markPresentationElementChanged(presentationDragState.element);
  }
  presentationDragState = null;
  if (changed) renderPresentationElements();
}

function insertPlainPresentationText(textNode, value) {
  if (!textNode) return false;
  const selection = window.getSelection();
  let range = selection && selection.rangeCount ? selection.getRangeAt(0) : null;
  if (!range || !textNode.contains(range.commonAncestorContainer)) {
    range = document.createRange();
    range.selectNodeContents(textNode);
    range.collapse(false);
  }
  range.deleteContents();
  const inserted = document.createTextNode(String(value || ""));
  range.insertNode(inserted);
  range.setStartAfter(inserted);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
}

function beginPresentationInlineEdit(event, element, textNode, elementNode) {
  if (!(element.type === "text" || element.hasTextBody)) return;
  if (elementNode.classList.contains("editing")) return;
  event.preventDefault();
  event.stopPropagation();
  selectPresentationElement(element, { rerender: false });
  decorateSelectedPresentationElementNode(elementNode, element);
  elementNode.classList.add("editing");
  textNode.contentEditable = "true";
  textNode.focus();
  const selection = window.getSelection();
  let range = null;
  if (Number.isFinite(event.clientX) && Number.isFinite(event.clientY) && document.caretRangeFromPoint) {
    const pointRange = document.caretRangeFromPoint(event.clientX, event.clientY);
    if (pointRange && textNode.contains(pointRange.startContainer)) range = pointRange;
  }
  if (!range) {
    range = document.createRange();
    range.selectNodeContents(textNode);
    range.collapse(false);
  } else {
    const textOffset = presentationTextOffset(textNode, range.startContainer, range.startOffset);
    const wordBounds = presentationWordBoundsAtOffset(textNode.innerText, textOffset);
    if (wordBounds) {
      const start = presentationTextPointAtOffset(textNode, wordBounds.start);
      const end = presentationTextPointAtOffset(textNode, wordBounds.end);
      range.setStart(start.node, start.offset);
      range.setEnd(end.node, end.offset);
    }
  }
  selection.removeAllRanges();
  selection.addRange(range);
  capturePresentationTextSelection();
  const originalText = element.text || "";
  const historySnapshot = presentationHistorySnapshot();
  const syncEditableText = () => {
    const nextText = textNode.innerText;
    if (nextText === element.text) return false;
    element.richTextRuns = presentationTextRunsWithUpdatedText(element, nextText);
    element.text = nextText;
    markPresentationElementChanged(element);
    return true;
  };
  const finish = (blurEvent) => {
    syncEditableText();
    textNode.contentEditable = "false";
    elementNode.classList.remove("editing");
    if (element.text !== originalText) {
      pushPresentationUndoSnapshot(historySnapshot);
    }
    const nextFocus = blurEvent && blurEvent.relatedTarget;
    const preserveFormattingSelection = Boolean(
      nextFocus
      && pptxContextToolbar
      && pptxContextToolbar.contains(nextFocus)
    );
    if (!preserveFormattingSelection) presentationTextSelection = null;
    renderPresentationInspector();
    renderPresentationElements();
  };
  textNode.addEventListener("input", () => {
    syncEditableText();
    capturePresentationTextSelection();
  });
  textNode.addEventListener("blur", finish, { once: true });
  textNode.addEventListener("paste", (pasteEvent) => {
    const plainText = pasteEvent.clipboardData?.getData("text/plain");
    if (typeof plainText !== "string") return;
    pasteEvent.preventDefault();
    insertPlainPresentationText(textNode, plainText);
    syncEditableText();
    capturePresentationTextSelection();
  });
  textNode.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.key === "Enter" && !keyEvent.metaKey && !keyEvent.ctrlKey) {
      keyEvent.preventDefault();
      insertPlainPresentationText(textNode, "\n");
      syncEditableText();
      capturePresentationTextSelection();
      return;
    }
    if (keyEvent.key === "Escape") {
      keyEvent.preventDefault();
      textNode.blur();
    }
    if ((keyEvent.metaKey || keyEvent.ctrlKey) && keyEvent.key === "Enter") {
      keyEvent.preventDefault();
      textNode.blur();
    }
  });
}

function focusPresentationElementText(element = selectedPresentationElement) {
  if (!element || !(element.type === "text" || element.hasTextBody)) return false;
  const elementNode = pptxElementLayer.querySelector(`[data-element-id="${CSS.escape(String(element.id))}"]`);
  const textNode = elementNode && elementNode.querySelector(".pptx-element-text");
  if (!elementNode || !textNode) return false;
  beginPresentationInlineEdit({
    preventDefault() {},
    stopPropagation() {}
  }, element, textNode, elementNode);
  return true;
}

function nudgeSelectedPresentationElement(key, largeStep = false) {
  if (!selectedPresentationElement || !activePresentation) return false;
  const element = selectedPresentationElement;
  const step = PPTX_EMU_PER_INCH * (largeStep ? 0.1 : 0.01);
  let nextX = element.x;
  let nextY = element.y;
  if (key === "ArrowLeft") nextX -= step;
  if (key === "ArrowRight") nextX += step;
  if (key === "ArrowUp") nextY -= step;
  if (key === "ArrowDown") nextY += step;
  nextX = Math.max(0, Math.min(activePresentation.width - element.cx, nextX));
  nextY = Math.max(0, Math.min(activePresentation.height - element.cy, nextY));
  if (nextX === element.x && nextY === element.y) return false;
  recordPresentationUndo();
  element.x = nextX;
  element.y = nextY;
  markPresentationElementChanged(element);
  renderPresentationElements();
  renderPresentationInspector();
  return true;
}

function duplicateSelectedPresentationElement() {
  const source = selectedPresentationElement;
  const slide = currentPresentationSlide();
  if (!source || !slide || !activePresentation) return false;
  const canDuplicate = source.type === "text"
    || source.hasTextBody
    || source.type === "shape"
    || (source.type === "image" && source.imageData);
  if (!canDuplicate) {
    setPresentationStatus("This imported object can be moved and resized, but not duplicated yet.");
    return false;
  }
  recordPresentationUndo();
  const clone = JSON.parse(JSON.stringify(source));
  clone.id = `new-copy-${Date.now()}`;
  clone.name = `${source.name || "Object"} copy`;
  clone.isNew = true;
  clone.deleted = false;
  clone.x = Math.min(activePresentation.width - clone.cx, Math.max(0, source.x + (PPTX_EMU_PER_INCH * 0.12)));
  clone.y = Math.min(activePresentation.height - clone.cy, Math.max(0, source.y + (PPTX_EMU_PER_INCH * 0.12)));
  clone.zIndex = slide.elements.reduce((highest, item) => Math.max(highest, Number(item.zIndex) || 0), 0) + 1;
  slide.elements.push(clone);
  markPresentationElementChanged(clone);
  selectPresentationElement(clone);
  return true;
}

function addPresentationTextBox() {
  const slide = currentPresentationSlide();
  if (!slide || !activePresentation) return;
  recordPresentationUndo();
  const element = {
    id: `new-${Date.now()}`,
    name: "Openleaf Text Box",
    type: "text",
    tagName: "p:sp",
    zIndex: slide.elements.length + 1,
    text: "New text",
    richTextRuns: [{
      text: "New text",
      fontSize: 24,
      fontFamily: "Aptos",
      color: "#1f2937",
      bold: false,
      italic: false,
      underline: false
    }],
    hasTextBody: true,
    isNew: true,
    x: activePresentation.width * 0.12,
    y: activePresentation.height * 0.12,
    cx: activePresentation.width * 0.42,
    cy: activePresentation.height * 0.14,
    rotation: 0,
    fontSize: 24,
    fontFamily: "Aptos",
    color: "#1f2937",
    bold: false,
    italic: false,
    underline: false,
    align: "l",
    verticalAlign: "t",
    marginLeft: 91440,
    marginRight: 91440,
    marginTop: 45720,
    marginBottom: 45720,
    lineColor: "",
    lineWidth: 0,
    lineStyle: "solid"
  };
  slide.elements.push(element);
  markPresentationElementChanged(element);
  selectPresentationElement(element);
  requestAnimationFrame(() => focusPresentationElementText(element));
}

function addPresentationShape(shapeType) {
  const slide = currentPresentationSlide();
  if (!slide || !activePresentation) return;
  recordPresentationUndo();
  const normalizedShape = shapeType === "ellipse" ? "ellipse" : "rect";
  const element = {
    id: `new-${normalizedShape}-${Date.now()}`,
    name: normalizedShape === "ellipse" ? "Openleaf Ellipse" : "Openleaf Rectangle",
    type: "shape",
    shapeType: normalizedShape,
    tagName: "p:sp",
    zIndex: slide.elements.length + 1,
    text: "",
    hasTextBody: false,
    isNew: true,
    x: activePresentation.width * 0.18,
    y: activePresentation.height * 0.2,
    cx: activePresentation.width * 0.28,
    cy: activePresentation.height * 0.18,
    rotation: 0,
    fillColor: normalizedShape === "ellipse" ? "#6BAED6" : "#5B9BD5",
    lineColor: "#2F5597",
    lineWidth: 1,
    lineStyle: "solid"
  };
  slide.elements.push(element);
  markPresentationElementChanged(element);
  selectPresentationElement(element);
}

function addPresentationLine() {
  if (!activePresentation || !currentPresentationSlide()) return;
  const element = presentationShapePrimitive({
    id: `new-line-${Date.now()}`,
    name: "Openleaf Line",
    x: activePresentation.width * 0.24,
    y: activePresentation.height * 0.48,
    cx: activePresentation.width * 0.5,
    cy: Math.max(14000, activePresentation.height * 0.006),
    fillColor: "#475569"
  });
  addPresentationElements([element]);
}

function addPresentationTitleLayout() {
  if (!activePresentation || !currentPresentationSlide()) return;
  const stamp = Date.now();
  const title = presentationTextPrimitive({
    id: `new-layout-title-${stamp}`,
    name: "Title placeholder",
    text: "Presentation title",
    x: activePresentation.width * 0.1,
    y: activePresentation.height * 0.12,
    cx: activePresentation.width * 0.8,
    cy: activePresentation.height * 0.15,
    fontSize: 30,
    bold: true,
    align: "ctr"
  });
  const body = presentationTextPrimitive({
    id: `new-layout-body-${stamp}`,
    name: "Body placeholder",
    text: "Add supporting content",
    x: activePresentation.width * 0.15,
    y: activePresentation.height * 0.38,
    cx: activePresentation.width * 0.7,
    cy: activePresentation.height * 0.22,
    fontSize: 20,
    color: "#475569",
    align: "ctr"
  });
  addPresentationElements([title, body], { select: title });
}

function markPresentationSlideChange(kind, payload = {}) {
  const slide = currentPresentationSlide();
  if (!slide) return;
  presentationChangeMap.set(`${slide.path}:__${kind}__`, {
    slidePath: slide.path,
    type: kind,
    ...payload
  });
  presentationDirty = true;
  setPresentationStatus("Unsaved changes", "unsaved");
}

function setPresentationBackground(color) {
  if (!/^#[0-9a-f]{6}$/i.test(String(color || ""))) return;
  const slide = currentPresentationSlide();
  if (!slide) return;
  if (slide.backgroundColor === color) return;
  recordPresentationUndo();
  slide.backgroundColor = color;
  markPresentationSlideChange("slide-background", { color });
  pptxBackgroundButton.style.setProperty("--pptx-background-swatch", color);
}

function setPresentationFadeTransition() {
  const slide = currentPresentationSlide();
  if (!slide) return;
  if (slide.transition === "fade") return;
  recordPresentationUndo();
  slide.transition = "fade";
  markPresentationSlideChange("slide-transition", { transition: "fade" });
  pptxTransitionButton.classList.add("active");
  pptxTransitionButton.textContent = "Transition: Fade";
}

function handlePresentationMenu(menu) {
  if (menu === "file") {
    void saveActivePresentation();
    return;
  }
  if (menu === "view") {
    setPresentationTerminalOpen(!presentationScreen.classList.contains("pptx-terminal-open"));
    return;
  }
  if (menu === "insert") {
    addPresentationTextBox();
    return;
  }
  if (menu === "edit") {
    const slide = currentPresentationSlide();
    const target = selectedPresentationElement || (slide && slide.elements.find((element) => element.type === "text" && !element.deleted));
    if (target) {
      selectPresentationElement(target);
      requestAnimationFrame(() => focusPresentationElementText(target));
    }
    return;
  }
  if (menu === "format" && selectedPresentationElement) {
    const isText = selectedPresentationElement.type === "text" || selectedPresentationElement.hasTextBody;
    if (isText) pptxFontFamilyInput.focus();
    else if (!pptxColorInput.disabled) pptxColorInput.click();
    return;
  }
  if (menu === "slide") {
    addPresentationTitleLayout();
    return;
  }
  if (menu === "arrange") {
    if (selectedPresentationElement && activePresentation) {
      recordPresentationUndo();
      selectedPresentationElement.x = Math.max(0, (activePresentation.width - selectedPresentationElement.cx) / 2);
      selectedPresentationElement.y = Math.max(0, (activePresentation.height - selectedPresentationElement.cy) / 2);
      markPresentationElementChanged(selectedPresentationElement);
      renderPresentationElements();
      renderPresentationInspector();
    }
    return;
  }
  if (menu === "tools") {
    openSettings();
    return;
  }
  if (menu === "extensions") {
    setPresentationTerminalOpen(true);
    return;
  }
  if (menu === "help") {
    openDocumentationSettings();
  }
}

function addPresentationElements(elements, { select = null } = {}) {
  const slide = currentPresentationSlide();
  if (!slide || !activePresentation || !Array.isArray(elements) || !elements.length) return;
  recordPresentationUndo();
  elements.forEach((element) => {
    element.zIndex = slide.elements.length + 1;
    slide.elements.push(element);
    markPresentationElementChanged(element);
  });
  selectPresentationElement(select || elements[elements.length - 1]);
}

function presentationTextPrimitive({
  id,
  name,
  text,
  x,
  y,
  cx,
  cy,
  fontSize = 16,
  color = "#1f2937",
  fillColor = "",
  bold = false,
  align = "l"
}) {
  return {
    id,
    name,
    type: "text",
    tagName: "p:sp",
    text,
    hasTextBody: true,
    isNew: true,
    x,
    y,
    cx,
    cy,
    rotation: 0,
    fontSize,
    fontFamily: "Aptos",
    color,
    fillColor,
    bold,
    italic: false,
    underline: false,
    align,
    verticalAlign: "ctr",
    marginLeft: 45720,
    marginRight: 45720,
    marginTop: 22860,
    marginBottom: 22860,
    lineColor: "",
    lineWidth: 0,
    lineStyle: "solid"
  };
}

function presentationShapePrimitive({ id, name, x, y, cx, cy, fillColor, shapeType = "rect" }) {
  return {
    id,
    name,
    type: "shape",
    shapeType,
    tagName: "p:sp",
    text: "",
    hasTextBody: false,
    isNew: true,
    x,
    y,
    cx,
    cy,
    rotation: 0,
    fillColor,
    lineColor: "#2F5597",
    lineWidth: 1,
    lineStyle: "solid"
  };
}

function addPresentationChart() {
  if (!activePresentation || !currentPresentationSlide()) return;
  const stamp = Date.now();
  const left = activePresentation.width * 0.2;
  const top = activePresentation.height * 0.18;
  const width = activePresentation.width * 0.58;
  const height = activePresentation.height * 0.58;
  const axisColor = "#475569";
  const colors = ["#8B1E3F", "#2F7F8D", "#DB8B38", "#6B7A99"];
  const values = [0.68, 0.86, 0.52, 0.74];
  const elements = [
    presentationTextPrimitive({
      id: `new-chart-title-${stamp}`,
      name: "Chart title",
      text: "Results",
      x: left,
      y: top,
      cx: width,
      cy: height * 0.12,
      fontSize: 22,
      bold: true,
      align: "ctr"
    }),
    presentationShapePrimitive({
      id: `new-chart-y-axis-${stamp}`,
      name: "Chart y-axis",
      x: left + width * 0.08,
      y: top + height * 0.16,
      cx: Math.max(11000, width * 0.006),
      cy: height * 0.72,
      fillColor: axisColor
    }),
    presentationShapePrimitive({
      id: `new-chart-x-axis-${stamp}`,
      name: "Chart x-axis",
      x: left + width * 0.08,
      y: top + height * 0.875,
      cx: width * 0.86,
      cy: Math.max(11000, height * 0.008),
      fillColor: axisColor
    })
  ];
  values.forEach((value, index) => {
    const barWidth = width * 0.12;
    const barHeight = height * 0.62 * value;
    const x = left + width * (0.16 + index * 0.2);
    const y = top + height * 0.87 - barHeight;
    elements.push(
      presentationShapePrimitive({
        id: `new-chart-bar-${stamp}-${index}`,
        name: `Chart bar ${index + 1}`,
        x,
        y,
        cx: barWidth,
        cy: barHeight,
        fillColor: colors[index]
      }),
      presentationTextPrimitive({
        id: `new-chart-label-${stamp}-${index}`,
        name: `Chart label ${index + 1}`,
        text: `Group ${index + 1}`,
        x: x - width * 0.02,
        y: top + height * 0.9,
        cx: width * 0.16,
        cy: height * 0.08,
        fontSize: 11,
        align: "ctr"
      })
    );
  });
  addPresentationElements(elements, { select: elements[0] });
}

function addPresentationTable() {
  if (!activePresentation || !currentPresentationSlide()) return;
  const stamp = Date.now();
  const rows = 4;
  const columns = 3;
  const left = activePresentation.width * 0.18;
  const top = activePresentation.height * 0.2;
  const width = activePresentation.width * 0.64;
  const height = activePresentation.height * 0.48;
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  const elements = [];
  const labels = [
    ["Metric", "Baseline", "Fine-tuned"],
    ["Depth error", "1.00", "0.55"],
    ["Scale error", "30%", "15%"],
    ["Volume MAE", "0.82", "0.43"]
  ];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const cellId = `${stamp}-${row}-${column}`;
      const fillColor = row === 0 ? "#8B1E3F" : (row % 2 ? "#F1F5F9" : "#FFFFFF");
      const textColor = row === 0 ? "#FFFFFF" : "#1F2937";
      elements.push(
        presentationShapePrimitive({
          id: `new-table-cell-${cellId}`,
          name: `Table cell ${row + 1}, ${column + 1}`,
          x: left + column * cellWidth,
          y: top + row * cellHeight,
          cx: cellWidth - 5500,
          cy: cellHeight - 5500,
          fillColor
        }),
        presentationTextPrimitive({
          id: `new-table-text-${cellId}`,
          name: `Table text ${row + 1}, ${column + 1}`,
          text: labels[row][column],
          x: left + column * cellWidth,
          y: top + row * cellHeight,
          cx: cellWidth - 5500,
          cy: cellHeight - 5500,
          fontSize: row === 0 ? 15 : 14,
          color: textColor,
          bold: row === 0,
          align: column === 0 ? "l" : "ctr"
        })
      );
    }
  }
  addPresentationElements(elements, { select: elements[1] });
}

function fileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")), { once: true });
    reader.addEventListener("error", () => reject(reader.error || new Error("Could not read image.")), { once: true });
    reader.readAsDataURL(file);
  });
}

function imageDimensions(dataUrl) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => resolve({ width: image.naturalWidth || 1, height: image.naturalHeight || 1 }), { once: true });
    image.addEventListener("error", () => resolve({ width: 4, height: 3 }), { once: true });
    image.src = dataUrl;
  });
}

function flashPresentationStatus(message, duration = 900) {
  if (!pptxSaveStatus) return;
  const restoreMessage = presentationDirty ? "Unsaved changes" : "Saved";
  const restoreState = presentationDirty ? "unsaved" : "ok";
  setPresentationStatus(message);
  window.setTimeout(() => {
    if (pptxSaveStatus && pptxSaveStatus.textContent === message) {
      setPresentationStatus(restoreMessage, restoreState);
    }
  }, duration);
}

function presentationElementSupportsClipboard(element) {
  return Boolean(element && (
    element.type === "text"
    || element.hasTextBody
    || element.type === "shape"
    || (element.type === "image" && element.imageData)
  ));
}

function presentationElementSnapshotImage(element) {
  if (
    !element
    || element.type !== "image"
    || !activePresentation
    || !pptxBackgroundCanvas
    || !pptxBackgroundCanvas.width
    || !pptxBackgroundCanvas.height
  ) return "";
  const scaleX = pptxBackgroundCanvas.width / activePresentation.width;
  const scaleY = pptxBackgroundCanvas.height / activePresentation.height;
  const sourceX = Math.max(0, Math.floor(Number(element.x || 0) * scaleX));
  const sourceY = Math.max(0, Math.floor(Number(element.y || 0) * scaleY));
  const sourceWidth = Math.max(1, Math.min(
    pptxBackgroundCanvas.width - sourceX,
    Math.ceil(Number(element.cx || 0) * scaleX)
  ));
  const sourceHeight = Math.max(1, Math.min(
    pptxBackgroundCanvas.height - sourceY,
    Math.ceil(Number(element.cy || 0) * scaleY)
  ));
  if (sourceWidth <= 0 || sourceHeight <= 0) return "";
  try {
    const canvas = document.createElement("canvas");
    canvas.width = sourceWidth;
    canvas.height = sourceHeight;
    const context = canvas.getContext("2d");
    context.drawImage(
      pptxBackgroundCanvas,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      sourceWidth,
      sourceHeight
    );
    return canvas.toDataURL("image/png");
  } catch (error) {
    return "";
  }
}

function presentationElementForClipboard(element) {
  if (!element) return null;
  const copy = clonePresentationValue(element);
  if (copy.type === "image" && !copy.imageData) {
    copy.imageData = presentationElementSnapshotImage(element);
    copy.imageFileName = `${element.name || "Copied image"}.png`;
    copy.imageMediaType = "image/png";
  }
  return presentationElementSupportsClipboard(copy) ? copy : null;
}

function presentationElementClipboardText(element) {
  const text = String(element && element.text || "").trim();
  return text || String(element && element.name || "OpenLeaf slide element");
}

function rememberSelectedPresentationElement({ clipboardWritten = false } = {}) {
  const source = selectedPresentationElement;
  const clipboardElement = presentationElementForClipboard(source);
  if (!clipboardElement || !activeProject) return false;
  presentationElementClipboard = {
    version: 1,
    projectId: activeProject.id,
    copiedAt: Date.now(),
    plainText: presentationElementClipboardText(source),
    clipboardWritten,
    element: clipboardElement
  };
  presentationElementPasteCount = 0;
  return true;
}

async function copySelectedPresentationElementToClipboard() {
  if (!rememberSelectedPresentationElement()) return false;
  try {
    if (window.localOverleaf && window.localOverleaf.writePresentationElementClipboard) {
      await window.localOverleaf.writePresentationElementClipboard(presentationElementClipboard.plainText);
    } else {
      await navigator.clipboard.writeText(presentationElementClipboard.plainText);
    }
    presentationElementClipboard.clipboardWritten = true;
  } catch (error) {
    presentationElementClipboard.clipboardWritten = false;
  }
  flashPresentationStatus(`Copied ${selectedPresentationElement.name || "element"}`);
  return true;
}

async function pastePresentationClipboardFromSystem() {
  let clipboardValue = null;
  try {
    if (window.localOverleaf && window.localOverleaf.readPresentationClipboard) {
      clipboardValue = await window.localOverleaf.readPresentationClipboard();
    }
  } catch (error) {
    clipboardValue = null;
  }

  if (clipboardValue && clipboardValue.kind === "image" && clipboardValue.dataUrl) {
    addPresentationImage({
      dataUrl: clipboardValue.dataUrl,
      fileName: "Clipboard image.png",
      mediaType: clipboardValue.mediaType || "image/png",
      width: clipboardValue.width || 1,
      height: clipboardValue.height || 1
    });
    return true;
  }

  if (
    clipboardValue
    && clipboardValue.kind === "text"
    && presentationElementClipboard
    && clipboardValue.text === presentationElementClipboard.plainText
  ) {
    return pastePresentationElement(presentationElementClipboard);
  }

  if (presentationSelectionScope === "slide" && presentationSlideClipboard) {
    return pastePresentationSlide();
  }
  return false;
}

function handlePresentationCopy(event) {
  if (
    !presentationScreen
    || presentationScreen.hidden
    || !activePresentation
    || presentationViewIsActive()
    || !selectedPresentationElement
    || presentationShortcutTargetBlocksSlideActions(event.target)
  ) return;
  if (!rememberSelectedPresentationElement({ clipboardWritten: Boolean(event.clipboardData) })) return;
  if (event.clipboardData) {
    const payload = JSON.stringify(presentationElementClipboard);
    event.clipboardData.setData("text/plain", presentationElementClipboard.plainText);
    try {
      event.clipboardData.setData(OPENLEAF_PRESENTATION_ELEMENT_MIME, payload);
    } catch (error) {
      presentationElementClipboard.clipboardWritten = false;
    }
  }
  event.preventDefault();
  flashPresentationStatus(`Copied ${selectedPresentationElement.name || "element"}`);
}

function presentationClipboardImageFile(event) {
  const transfer = event && event.clipboardData;
  if (!transfer) return null;
  const item = Array.from(transfer.items || []).find((candidate) => (
    candidate.kind === "file" && /^image\//i.test(candidate.type || "")
  ));
  const itemFile = item && item.getAsFile ? item.getAsFile() : null;
  if (itemFile) return itemFile;
  return Array.from(transfer.files || []).find((file) => /^image\//i.test(file.type || "")) || null;
}

function presentationClipboardDataImage(event) {
  const transfer = event && event.clipboardData;
  if (!transfer) return "";
  const html = transfer.getData("text/html");
  if (!html) return "";
  try {
    const documentNode = new DOMParser().parseFromString(html, "text/html");
    const source = documentNode.querySelector("img")?.getAttribute("src") || "";
    return /^data:image\//i.test(source) ? source : "";
  } catch (error) {
    return "";
  }
}

function presentationElementPayloadFromPaste(event) {
  const transfer = event && event.clipboardData;
  if (transfer) {
    const encoded = transfer.getData(OPENLEAF_PRESENTATION_ELEMENT_MIME);
    if (encoded) {
      try {
        const payload = JSON.parse(encoded);
        if (payload && presentationElementSupportsClipboard(payload.element)) return payload;
      } catch (error) {
      }
    }
  }
  if (!presentationElementClipboard || !presentationElementSupportsClipboard(presentationElementClipboard.element)) {
    return null;
  }
  if (!transfer || !presentationElementClipboard.clipboardWritten) return presentationElementClipboard;
  const clipboardText = transfer.getData("text/plain");
  return clipboardText === presentationElementClipboard.plainText ? presentationElementClipboard : null;
}

function pastePresentationElement(payload) {
  const source = payload && payload.element;
  const slide = currentPresentationSlide();
  if (!presentationElementSupportsClipboard(source) || !slide || !activePresentation) return false;
  recordPresentationUndo();
  presentationElementPasteCount += 1;
  const clone = clonePresentationValue(source);
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const offset = PPTX_EMU_PER_INCH * 0.12 * Math.min(6, presentationElementPasteCount);
  clone.id = `new-paste-${stamp}`;
  clone.name = `${source.name || "Object"} copy`;
  clone.isNew = true;
  clone.deleted = false;
  clone.x = Math.min(
    Math.max(0, activePresentation.width - clone.cx),
    Math.max(0, Number(source.x || 0) + offset)
  );
  clone.y = Math.min(
    Math.max(0, activePresentation.height - clone.cy),
    Math.max(0, Number(source.y || 0) + offset)
  );
  clone.zIndex = slide.elements.reduce((highest, element) => (
    Math.max(highest, Number(element.zIndex) || 0)
  ), 0) + 1;
  slide.elements.push(clone);
  markPresentationElementChanged(clone);
  selectPresentationElement(clone);
  return true;
}

async function handlePresentationPaste(event) {
  if (
    !presentationScreen
    || presentationScreen.hidden
    || !activePresentation
    || presentationViewIsActive()
  ) return false;
  if (Date.now() - presentationPasteShortcutAt < 500) {
    event.preventDefault();
    return false;
  }

  const imageFile = presentationClipboardImageFile(event);
  if (imageFile) {
    event.preventDefault();
    await addPresentationImageFile(imageFile);
    return true;
  }

  const dataImage = presentationClipboardDataImage(event);
  if (dataImage) {
    event.preventDefault();
    const dimensions = await imageDimensions(dataImage);
    addPresentationImage({
      dataUrl: dataImage,
      fileName: "Clipboard image.png",
      mediaType: dataImage.slice(5, dataImage.indexOf(";")) || "image/png",
      ...dimensions
    });
    return true;
  }

  if (presentationShortcutTargetBlocksSlideActions(event.target)) return false;
  const elementPayload = presentationElementPayloadFromPaste(event);
  if (elementPayload) {
    event.preventDefault();
    presentationElementClipboard = {
      ...elementPayload,
      element: clonePresentationValue(elementPayload.element)
    };
    return pastePresentationElement(presentationElementClipboard);
  }

  if (presentationSelectionScope === "slide" && presentationSlideClipboard) {
    event.preventDefault();
    return pastePresentationSlide();
  }
  return false;
}

async function addPresentationImageFile(file) {
  try {
    const dataUrl = await fileAsDataUrl(file);
    const dimensions = await imageDimensions(dataUrl);
    addPresentationImage({
      dataUrl,
      fileName: file.name || "image.png",
      mediaType: file.type || "image/png",
      ...dimensions
    });
  } catch (error) {
    window.alert(formatError(error));
  }
}

function addPresentationImage({ dataUrl, fileName = "image.png", mediaType = "image/png", width = 4, height = 3 } = {}) {
  const slide = currentPresentationSlide();
  if (!slide || !activePresentation || !dataUrl) return;
  recordPresentationUndo();
  const targetWidth = activePresentation.width * 0.42;
  const targetHeight = Math.min(activePresentation.height * 0.48, targetWidth * Math.max(0.15, height / Math.max(1, width)));
  const element = {
    id: `new-image-${Date.now()}`,
    name: fileName,
    type: "image",
    tagName: "p:pic",
    zIndex: slide.elements.length + 1,
    text: "",
    hasTextBody: false,
    isNew: true,
    x: (activePresentation.width - targetWidth) / 2,
    y: (activePresentation.height - targetHeight) / 2,
    cx: targetWidth,
    cy: targetHeight,
    rotation: 0,
    imageData: dataUrl,
    imageFileName: fileName,
    imageMediaType: mediaType
  };
  slide.elements.push(element);
  markPresentationElementChanged(element);
  selectPresentationElement(element);
}

function deleteSelectedPresentationElement() {
  if (!selectedPresentationElement) return;
  recordPresentationUndo();
  selectedPresentationElement.deleted = true;
  markPresentationElementChanged(selectedPresentationElement);
  selectedPresentationElement = null;
  renderPresentationInspector();
  renderPresentationElements();
  pptxDeleteElementButton.disabled = true;
}

function reorderSelectedPresentationElement(mode) {
  const slide = currentPresentationSlide();
  const element = selectedPresentationElement;
  if (!slide || !element) return false;
  const ordered = slide.elements
    .filter((item) => !item.deleted)
    .slice()
    .sort((a, b) => (Number(a.zIndex) || 0) - (Number(b.zIndex) || 0));
  const currentIndex = ordered.indexOf(element);
  if (currentIndex < 0) return false;
  let targetIndex = currentIndex;
  if (mode === "back") targetIndex = 0;
  if (mode === "backward") targetIndex = Math.max(0, currentIndex - 1);
  if (mode === "forward") targetIndex = Math.min(ordered.length - 1, currentIndex + 1);
  if (mode === "front") targetIndex = ordered.length - 1;
  if (targetIndex === currentIndex) return false;

  recordPresentationUndo();
  ordered.splice(currentIndex, 1);
  ordered.splice(targetIndex, 0, element);
  ordered.forEach((item, index) => {
    item.zIndex = index;
    markPresentationElementChanged(item);
  });
  renderPresentationElements();
  renderPresentationInspector();
  flashPresentationStatus(
    mode === "front"
      ? "Brought to front"
      : mode === "back"
        ? "Sent to back"
        : mode === "forward"
          ? "Brought forward"
          : "Sent backward"
  );
  return true;
}

function refreshPresentationSlideMetadata() {
  if (!activePresentation) return;
  activePresentation.slides.forEach((slide, index) => {
    slide.index = index;
    slide.number = index + 1;
  });
  pptxSlideCount.textContent = `${activePresentation.slides.length}`;
}

function syncPresentationSlideOrderChange() {
  if (!activePresentation) return;
  presentationChangeMap.set("__slide-order__", {
    type: "slide-order",
    slidePaths: activePresentation.slides.map((slide) => slide.path)
  });
  presentationDirty = true;
  setPresentationStatus("Unsaved changes", "unsaved");
}

function focusActivePresentationThumbnail() {
  const thumbnail = pptxSlideList.querySelector(
    `.pptx-slide-thumb[data-slide-index="${activePresentationSlideIndex}"]`
  );
  if (thumbnail) thumbnail.focus({ preventScroll: true });
}

function copyActivePresentationSlide() {
  const slide = currentPresentationSlide();
  if (!slide || !activeProject) return false;
  presentationSlideClipboard = {
    projectId: activeProject.id,
    sourceSlidePath: slide.sourceSlidePath || slide.path,
    slide: clonePresentationValue(slide)
  };
  return true;
}

async function pastePresentationSlide() {
  if (
    !activePresentation
    || !presentationSlideClipboard
    || !activeProject
    || presentationSlideClipboard.projectId !== activeProject.id
  ) return false;
  recordPresentationUndo();
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const temporaryPath = `openleaf://slide-copy/${stamp}`;
  const clone = clonePresentationValue(presentationSlideClipboard.slide);
  clone.path = temporaryPath;
  clone.sourceSlidePath = presentationSlideClipboard.sourceSlidePath;
  clone.previewPageIndex = Number(
    presentationSlideClipboard.slide.previewPageIndex
    ?? presentationSlideClipboard.slide.index
    ?? activePresentationSlideIndex
  );
  clone.elements = Array.isArray(clone.elements) ? clone.elements : [];
  activePresentation.slides.splice(activePresentationSlideIndex + 1, 0, clone);
  activePresentationSlideIndex += 1;
  selectedPresentationElement = null;
  presentationSelectionScope = "slide";
  presentationChangeMap.set(`${temporaryPath}:__slide-copy__`, {
    type: "slide-copy",
    slidePath: temporaryPath,
    sourceSlidePath: presentationSlideClipboard.sourceSlidePath
  });
  clone.elements.forEach((element) => markPresentationElementChanged(element));
  if (/^#[0-9a-f]{6}$/i.test(clone.backgroundColor || "")) {
    presentationChangeMap.set(`${temporaryPath}:__slide-background__`, {
      type: "slide-background",
      slidePath: temporaryPath,
      color: clone.backgroundColor
    });
  }
  if (clone.transition === "fade") {
    presentationChangeMap.set(`${temporaryPath}:__slide-transition__`, {
      type: "slide-transition",
      slidePath: temporaryPath,
      transition: "fade"
    });
  }
  refreshPresentationSlideMetadata();
  syncPresentationSlideOrderChange();
  await renderPresentationSlideList();
  await renderPresentationSlide();
  renderPresentationInspector();
  focusActivePresentationThumbnail();
  return true;
}

async function deleteActivePresentationSlide() {
  if (!activePresentation || activePresentation.slides.length <= 1) return false;
  const slide = currentPresentationSlide();
  if (!slide) return false;
  recordPresentationUndo();
  activePresentation.slides.splice(activePresentationSlideIndex, 1);
  Array.from(presentationChangeMap.keys()).forEach((key) => {
    if (key.startsWith(`${slide.path}:`)) presentationChangeMap.delete(key);
  });
  activePresentationSlideIndex = Math.min(activePresentationSlideIndex, activePresentation.slides.length - 1);
  selectedPresentationElement = null;
  presentationSelectionScope = "slide";
  refreshPresentationSlideMetadata();
  syncPresentationSlideOrderChange();
  await renderPresentationSlideList();
  await renderPresentationSlide();
  renderPresentationInspector();
  focusActivePresentationThumbnail();
  return true;
}

async function selectPresentationSlideByOffset(offset) {
  if (!activePresentation || !activePresentation.slides.length) return;
  const nextIndex = Math.max(
    0,
    Math.min(activePresentation.slides.length - 1, activePresentationSlideIndex + offset)
  );
  presentationSelectionScope = "slide";
  selectedPresentationElement = null;
  if (nextIndex !== activePresentationSlideIndex) {
    activePresentationSlideIndex = nextIndex;
    pptxSlideList.querySelectorAll(".pptx-slide-thumb").forEach((thumbnail, index) => {
      thumbnail.classList.toggle("active", index === activePresentationSlideIndex);
    });
    await renderPresentationSlide();
    renderPresentationInspector();
  }
  updatePresentationViewControls();
  if (!presentationViewIsActive()) focusActivePresentationThumbnail();
}

function presentationShortcutTargetBlocksSlideActions(target) {
  const element = target && target.nodeType === 1 ? target : null;
  if (!element || !element.closest) return false;
  if (element.closest("input, textarea, select, [contenteditable='true'], .CodeMirror, .xterm")) return true;
  return Boolean(element.closest("button") && !element.closest(".pptx-slide-thumb"));
}

function handlePresentationHistoryShortcut(event) {
  if (
    !presentationScreen
    || presentationScreen.hidden
    || !activePresentation
    || presentationViewIsActive()
  ) return false;
  const shortcut = event.metaKey || event.ctrlKey;
  const key = String(event.key || "").toLowerCase();
  if (!shortcut || (key !== "z" && key !== "y")) return false;
  event.preventDefault();
  if (key === "y" || event.shiftKey) void redoPresentationChange();
  else void undoPresentationChange();
  return true;
}

function handlePresentationShortcut(event) {
  if (!presentationScreen || presentationScreen.hidden || !activePresentation) return false;
  if (presentationViewIsActive()) {
    if (event.key === "Escape") {
      event.preventDefault();
      void setPresentationView(false);
      return true;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") {
      event.preventDefault();
      void selectPresentationSlideByOffset(-1);
      return true;
    }
    if (
      event.key === "ArrowRight"
      || event.key === "ArrowDown"
      || event.key === "PageDown"
      || event.key === " "
      || event.key === "Enter"
    ) {
      event.preventDefault();
      void selectPresentationSlideByOffset(1);
      return true;
    }
    if (event.key === "Home") {
      event.preventDefault();
      void selectPresentationSlideByOffset(-activePresentation.slides.length);
      return true;
    }
    if (event.key === "End") {
      event.preventDefault();
      void selectPresentationSlideByOffset(activePresentation.slides.length);
      return true;
    }
    event.preventDefault();
    return true;
  }
  if (event.key === "F5") {
    event.preventDefault();
    void setPresentationView(true);
    return true;
  }
  const shortcut = event.metaKey || event.ctrlKey;
  const key = String(event.key || "").toLowerCase();

  if (handlePresentationHistoryShortcut(event)) return true;
  if (selectedPresentationElement && shortcut && ["b", "i", "u"].includes(key)) {
    const isText = selectedPresentationElement.type === "text" || selectedPresentationElement.hasTextBody;
    if (isText) {
      event.preventDefault();
      const property = key === "b" ? "bold" : key === "i" ? "italic" : "underline";
      updateSelectedPresentationElement(property, !presentationSelectionStyleValue(property));
      return true;
    }
  }
  if (
    selectedPresentationElement
    && shortcut
    && key === "c"
    && !presentationShortcutTargetBlocksSlideActions(event.target)
  ) {
    event.preventDefault();
    void copySelectedPresentationElementToClipboard();
    return true;
  }
  if (presentationShortcutTargetBlocksSlideActions(event.target)) return false;
  if (shortcut && key === "v") {
    event.preventDefault();
    presentationPasteShortcutAt = Date.now();
    void pastePresentationClipboardFromSystem();
    return true;
  }
  if (!event.altKey && (key === "+" || key === "=")) {
    event.preventDefault();
    stepPresentationZoom(1);
    return true;
  }
  if (!event.altKey && (key === "-" || key === "_")) {
    event.preventDefault();
    stepPresentationZoom(-1);
    return true;
  }
  if (shortcut && key === "s") {
    event.preventDefault();
    void saveActivePresentation();
    return true;
  }
  if (shortcut && key === "p") {
    event.preventDefault();
    window.print();
    return true;
  }
  if (selectedPresentationElement && shortcut && key === "d") {
    event.preventDefault();
    duplicateSelectedPresentationElement();
    return true;
  }
  if (
    selectedPresentationElement
    && !shortcut
    && event.altKey
    && (event.key === "ArrowUp" || event.key === "ArrowDown")
  ) {
    event.preventDefault();
    reorderSelectedPresentationElement(
      event.key === "ArrowUp"
        ? (event.shiftKey ? "front" : "forward")
        : (event.shiftKey ? "back" : "backward")
    );
    return true;
  }
  if (selectedPresentationElement && !shortcut && !event.altKey && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
    event.preventDefault();
    nudgeSelectedPresentationElement(event.key, event.shiftKey);
    return true;
  }
  if (selectedPresentationElement && !shortcut && event.key === "Enter") {
    const isText = selectedPresentationElement.type === "text" || selectedPresentationElement.hasTextBody;
    if (isText) {
      event.preventDefault();
      focusPresentationElementText(selectedPresentationElement);
      return true;
    }
  }
  if (selectedPresentationElement && !shortcut && event.key === "Escape") {
    event.preventDefault();
    selectPresentationElement(null);
    pptxStageViewport.focus({ preventScroll: true });
    return true;
  }
  if (presentationSelectionScope === "slide" && shortcut && key === "c") {
    event.preventDefault();
    copyActivePresentationSlide();
    return true;
  }
  if (presentationSelectionScope === "slide" && shortcut && key === "x") {
    event.preventDefault();
    if (copyActivePresentationSlide()) void deleteActivePresentationSlide();
    return true;
  }
  if (presentationSelectionScope === "slide" && shortcut && key === "d") {
    event.preventDefault();
    if (copyActivePresentationSlide()) void pastePresentationSlide();
    return true;
  }
  if (!shortcut && (event.key === "Backspace" || event.key === "Delete")) {
    if (presentationSelectionScope === "slide") {
      event.preventDefault();
      void deleteActivePresentationSlide();
      return true;
    }
    if (selectedPresentationElement) {
      event.preventDefault();
      deleteSelectedPresentationElement();
      return true;
    }
  }
  if (presentationSelectionScope === "slide" && !shortcut && !event.altKey) {
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      void selectPresentationSlideByOffset(-1);
      return true;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      void selectPresentationSlideByOffset(1);
      return true;
    }
    if (event.key === "Home") {
      event.preventDefault();
      void selectPresentationSlideByOffset(-activePresentation.slides.length);
      return true;
    }
    if (event.key === "End") {
      event.preventDefault();
      void selectPresentationSlideByOffset(activePresentation.slides.length);
      return true;
    }
  }
  return false;
}

async function saveActivePresentation() {
  if (!activeProject || !activePresentation || !presentationDirty) {
    setPresentationStatus("Saved", "ok");
    return;
  }
  pptxSaveButton.disabled = true;
  setPresentationStatus("Saving PowerPoint…");
  const slideIndex = activePresentationSlideIndex;
  try {
    const result = await window.localOverleaf.savePresentationProject(
      activeProject.id,
      Array.from(presentationChangeMap.values()),
      { baseRevision: activePresentation.revision || "" }
    );
    activeProject = result.project || activeProject;
    activePresentation = result.presentation;
    rebuildPresentationElementBaselines();
    await loadPresentationPdf(result.pdf, result.thumbnailPdf);
    activePresentationSlideIndex = Math.min(slideIndex, activePresentation.slides.length - 1);
    selectedPresentationElement = null;
    presentationChangeMap = new Map();
    presentationDirty = false;
    presentationSelectionScope = "canvas";
    presentationUndoStack = [];
    presentationRedoStack = [];
    updatePresentationHistoryButtons();
    await renderPresentationSlideList();
    await renderPresentationSlide();
    renderPresentationInspector();
    setPresentationStatus(
      result.mergeStatus === "merged" ? "Saved · merged shared edits" : "Saved · backup created",
      "ok"
    );
    setPresentationCollaborationStatus("Shared · synced", "synced");
  } catch (error) {
    setPresentationStatus("Save failed", "error");
    setPresentationCollaborationStatus("Shared · conflict", "conflict");
    window.alert(formatError(error));
  } finally {
    pptxSaveButton.disabled = false;
  }
}

async function openProject(projectId, { pdfRelativePath = "", sourceRelativePath = "" } = {}) {
  resetTextTabs();
  cancelProjectFileCreation();
  selectedFileTreeNode = null;
  expandedFileFolders = new Set();
  selectedPdfRelativePath = "";
  clearRemoteCompiledPdf();
  setSshConnectionState("disconnected");
  const project = projects.find((item) => item.id === projectId);
  activeProject = project || { id: projectId, name: "Project", texName: "main.tex" };
  if (activeProject.kind === "presentation" || /\.pptx$/i.test(activeProject.texName || activeProject.texPath || "")) {
    await openPresentationProject(activeProject);
    return;
  }
  showEditorShell();
  setFileSidebarVisible(false, { persist: false });
  setTerminalCollapsed(true, { persist: false });
  setCompileLogCollapsed(true, { persist: false });
  await loadManuscript(projectId, { pdfRelativePath, sourceRelativePath });
  await loadProjectFiles();
  if (typeof loadNotesForActiveProject === "function") loadNotesForActiveProject();
  startExternalSourcePolling();
}

function showEditorShell() {
  restoreEditorTerminalPanel();
  projectScreen.hidden = true;
  editorScreen.hidden = false;
  presentationScreen.hidden = true;
  requestAnimationFrame(() => editor.refresh());
}

async function showProjects({ discardChanges = false } = {}) {
  if (!discardChanges && presentationScreen && !presentationScreen.hidden && presentationDirty) {
    const confirmed = window.confirm("Return to Projects without saving the PowerPoint changes?");
    if (!confirmed) return false;
  }
  syncActiveTextTabFromEditor();
  recordHistoryEvent("Edited");
  togglePdfReaderMode(false);
  if (!discardChanges && activeProject && openTextTabs.some((tab) => tab.dirty)) {
    const confirmed = window.confirm("Return to Projects and keep unsaved editor changes only in this window?");
    if (!confirmed) return false;
  }

  clearTimeout(autoCompileTimer);
  stopPdfSpeech({ resetCursor: true, updateStatus: false });
  stopExternalSourcePolling();
  stopPresentationCollaborationPolling();
  updateProjectHeroGreeting({ rotate: true });
  projectScreen.hidden = false;
  editorScreen.hidden = true;
  presentationScreen.classList.remove("pptx-presenting");
  if (pptxPresentControls) pptxPresentControls.hidden = true;
  presentationScreen.hidden = true;
  restoreEditorTerminalPanel();
  presentationDirty = false;
  await loadProjects();
  return true;
}

async function loadManuscript(projectId = activeProject && activeProject.id, { pdfRelativePath = "", sourceRelativePath = "" } = {}) {
  if (!projectId) return;

  setBusy(true);
  isLoading = true;

  try {
    const data = await window.localOverleaf.load(projectId, sourceRelativePath);
    activeProject = data.project;
    resetTextTabs();
    selectedPdfRelativePath = pdfRelativePath;
    clearRemoteCompiledPdf();
    setActiveLoadedTextFile(data.file, data.tex);
    editor.setValue(data.tex);
    setMode("source");
    updateEditorFileTitle();
    pdfTitle.textContent = activeProject.pdfName || "main.pdf";
    pdfMeta.textContent = "";
    updateActiveDocumentTitle();
    populateProjectSettingsForm();
    updateStats();
    scheduleSourceMinimapUpdate();
    renderVisualEditor();
    await setPdf();
    setSaveState("Saved", "ok");
    setCompileState("PDF loaded", "ok");
    setPdfStale(false);
    compileLog.textContent = `Loaded ${activeProject.name}.`;
  } catch (error) {
    setSaveState("Load failed", "error");
    setCompileState("Load failed", "error");
    pdfViewer.innerHTML = '<div class="pdf-loading pdf-error">Could not load this project.</div>';
    compileLog.textContent = formatError(error);
  } finally {
    isLoading = false;
    setBusy(false);
    requestAnimationFrame(() => editor.refresh());
  }
}

async function loadProjectFile(relativePath, { confirmUnsaved = true, preview = true } = {}) {
  if (!activeProject || !relativePath) return;

  syncActiveTextTabFromEditor();
  const existingTab = openTextTabs.find((tab) => tab.relativePath === relativePath);
  if (existingTab) {
    if (!preview) existingTab.preview = false;
    switchTextTab(relativePath);
    renderTextTabs();
    return;
  }

  setBusy(true);
  isLoading = true;
  setSaveState("Loading...");

  try {
    let compiledAfterLoad = false;
    const data = isRemoteProject()
      ? await window.localOverleaf.readRemoteFile(remoteWorkspace, relativePath)
      : await window.localOverleaf.load(activeProject.id, relativePath);
    if (!isRemoteProject()) activeProject = data.project;
    setActiveLoadedTextFile(data.file, data.tex, { preview });
    editor.setValue(data.tex);
    setMode(visualEditor.hidden ? "source" : "visual");
    updateEditorFileTitle();
    updateActiveDocumentTitle();
    populateProjectSettingsForm();
    updateStats();
    scheduleSourceMinimapUpdate();
    renderVisualEditor();
    if (isRemoteProject() && /\.tex$/i.test(relativePath)) {
      if (!selectedPdfRelativePath) selectedPdfRelativePath = pdfRelativePathForActiveSource();
      updatePdfTitleFromSelection();
      pdfMeta.textContent = "Compiling locally...";
      await compileManuscript({ manual: false });
      compiledAfterLoad = true;
    }
    setSaveState("Saved", "ok");
    if (!compiledAfterLoad) compileLog.textContent = `Loaded ${activeFile.relativePath}.`;
  } catch (error) {
    setSaveState("Load failed", "error");
    compileLog.textContent = formatError(error);
  } finally {
    isLoading = false;
    setBusy(false);
    requestAnimationFrame(() => editor.refresh());
  }
}

function activeFileTreeContainer() {
  if (presentationScreen && !presentationScreen.hidden && pptxFileTree) return pptxFileTree;
  return fileTree;
}

function projectFileStatus(message, tone = "") {
  if (presentationScreen && !presentationScreen.hidden) {
    setPresentationStatus(message, tone);
    return;
  }
  compileLog.textContent = message;
}

async function loadProjectFiles() {
  if (!activeProject) return;

  const tree = activeFileTreeContainer();
  if (tree) tree.innerHTML = '<div class="file-message">Loading files...</div>';

  try {
    const data = isRemoteProject()
      ? await window.localOverleaf.listRemoteFiles(remoteWorkspace)
      : await window.localOverleaf.listProjectFiles(activeProject.id);
    const shouldOpenRemoteEntry = isRemoteProject() && !activeFile && !openTextTabs.length;
    if (!isRemoteProject()) activeProject = data.project || activeProject;
    projectFiles = data.files || [];
    updateActiveDocumentTitle();
    populateProjectSettingsForm();
    renderFileTree();
    if (!isRemoteProject() && !activeProject.pdfExists && !selectedPdfRelativePath) {
      const firstReading = projectPdfFiles().sort((left, right) => (
        String(left.relativePath || "").localeCompare(String(right.relativePath || ""), undefined, { numeric: true })
      ))[0];
      if (firstReading) {
        selectedPdfRelativePath = firstReading.relativePath;
        updatePdfTitleFromSelection();
        await renderPdf({ showLoading: true, preserveView: false, preserveLogOnError: true });
      }
    }
    if (shouldOpenRemoteEntry) {
      const entry = findDefaultTexFileNode(projectFiles);
      if (entry) await loadProjectFile(entry.relativePath, { confirmUnsaved: false, preview: false });
    }
  } catch (error) {
    if (tree) tree.innerHTML = `<div class="file-message file-error">${escapeHtml(formatError(error))}</div>`;
  }
}

function renderFileTree() {
  const tree = activeFileTreeContainer();
  if (!tree || !activeProject) return;
  tree.innerHTML = "";

  if (!projectFiles.length) {
    tree.innerHTML = '<div class="file-message">No files found.</div>';
    return;
  }

  projectFiles.forEach((node) => tree.appendChild(renderFileNode(node, 0)));
  updateFileOutline();
  updatePdfTitleFromSelection();
}

function flattenProjectFileNodes(nodes = []) {
  const flattened = [];
  nodes.forEach((node) => {
    flattened.push(node);
    if (node.children) flattened.push(...flattenProjectFileNodes(node.children));
  });
  return flattened;
}

function isPdfFileNode(node) {
  return Boolean(node && node.kind === "file" && /\.pdf$/i.test(node.name || node.relativePath || ""));
}

function isPresentationFileNode(node) {
  return Boolean(node && node.kind === "file" && /\.pptx?$/i.test(node.name || node.relativePath || ""));
}

function isPreviewDocumentNode(node) {
  return isPdfFileNode(node) || isPresentationFileNode(node);
}

function projectPdfFiles() {
  return flattenProjectFileNodes(projectFiles).filter((node) => (
    isPdfFileNode(node) || (!isRemoteProject() && isPresentationFileNode(node))
  ));
}

function findDefaultTexFileNode(nodes = []) {
  const texFiles = flattenProjectFileNodes(nodes).filter((node) => (
    node && node.kind === "file" && /\.tex$/i.test(node.name || node.relativePath || "")
  ));
  return texFiles.find((node) => /(^|\/)manuscript\/main\.tex$/i.test(node.relativePath || ""))
    || texFiles.find((node) => /(^|\/)main\.tex$/i.test(node.relativePath || node.name || ""))
    || texFiles[0]
    || null;
}

function pdfRelativePathForActiveSource() {
  const relativePath = activeFile && activeFile.relativePath ? String(activeFile.relativePath) : "";
  if (!/\.tex$/i.test(relativePath)) return "";
  return relativePath.replace(/\.tex$/i, ".pdf");
}

function inferredRemotePdfRelativePath() {
  if (selectedPdfRelativePath) return selectedPdfRelativePath;
  const pdfs = projectPdfFiles();
  const sourcePdf = pdfRelativePathForActiveSource();
  if (sourcePdf && pdfs.some((node) => node.relativePath === sourcePdf)) return sourcePdf;
  const mainPdf = pdfs.find((node) => /(^|\/)main\.pdf$/i.test(node.relativePath || node.name || ""));
  return (mainPdf && mainPdf.relativePath) || (pdfs[0] && pdfs[0].relativePath) || sourcePdf || "main.pdf";
}

function pdfRelativePathForRender() {
  return isRemoteProject() ? inferredRemotePdfRelativePath() : selectedPdfRelativePath;
}

function activePdfName() {
  const relativePath = isRemoteProject() ? inferredRemotePdfRelativePath() : selectedPdfRelativePath;
  if (relativePath) return relativePath.split("/").pop() || relativePath;
  return (activeProject && activeProject.pdfName) || "main.pdf";
}

function updatePdfTitleFromSelection() {
  if (!pdfTitle || !activeProject) return;
  pdfTitle.textContent = activePdfName();
  pdfTitle.title = "Choose PDF or PowerPoint";
  pdfTitle.classList.toggle("clickable", true);
  const showingPresentation = /\.pptx?$/i.test(selectedPdfRelativePath || "");
  openPdfButton.title = showingPresentation ? "Open PowerPoint in system viewer" : "Open PDF in system viewer";
  openPdfButton.setAttribute("aria-label", openPdfButton.title);
  downloadPdfButton.title = showingPresentation ? "Download converted PDF" : "Download PDF";
  downloadPdfButton.setAttribute("aria-label", downloadPdfButton.title);
}

function togglePdfFileMenu(event) {
  if (event) event.stopPropagation();
  if (!pdfFileMenu || !activeProject) return;
  if (!pdfFileMenu.hidden) {
    pdfFileMenu.hidden = true;
    return;
  }
  renderPdfFileMenu();
}

function renderPdfFileMenu() {
  const pdfs = projectPdfFiles();
  if (!pdfFileMenu || !activeProject) return;
  const menuPdfs = [...pdfs];
  if (selectedPdfRelativePath && !menuPdfs.some((node) => node.relativePath === selectedPdfRelativePath)) {
    menuPdfs.unshift({
      name: activePdfName(),
      relativePath: selectedPdfRelativePath
    });
  }
  pdfFileMenu.innerHTML = "";
  const defaultButton = document.createElement("button");
  defaultButton.type = "button";
  defaultButton.className = "pdf-file-option";
  defaultButton.classList.toggle("active", !selectedPdfRelativePath);
  defaultButton.textContent = isRemoteProject()
    ? `Next to source: ${inferredRemotePdfRelativePath()}`
    : ((activeProject && activeProject.pdfName) || "Compiled PDF");
  defaultButton.addEventListener("click", () => selectPdfFile(""));
  pdfFileMenu.appendChild(defaultButton);
  menuPdfs.forEach((node) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pdf-file-option";
    button.classList.toggle("active", selectedPdfRelativePath === node.relativePath);
    button.textContent = node.relativePath;
    button.addEventListener("click", () => selectPdfFile(node.relativePath));
    pdfFileMenu.appendChild(button);
  });
  pdfFileMenu.hidden = false;
}

async function selectPdfFile(relativePath = "") {
  selectedPdfRelativePath = relativePath;
  if (pdfFileMenu) pdfFileMenu.hidden = true;
  updatePdfTitleFromSelection();
  const reading = activeProject && Array.isArray(activeProject.readingFiles)
    ? activeProject.readingFiles.find((item) => item.relativePath === relativePath)
    : null;
  if (reading && reading.textRelativePath && activeFile && activeFile.relativePath !== reading.textRelativePath) {
    await loadProjectFile(reading.textRelativePath, { confirmUnsaved: true, preview: false });
  }
  await renderPdf({ showLoading: true, preserveView: false });
}

function renderFileNode(node, depth) {
  const depthIndent = `${depth * 14}px`;

  if (node.kind === "folder") {
    const details = document.createElement("details");
    details.className = "file-folder";
    details.open = expandedFileFolders.has(node.relativePath);
    details.style.setProperty("--depth-indent", depthIndent);

    const summary = document.createElement("summary");
    summary.dataset.filePath = node.relativePath;
    summary.classList.toggle("selected", isSelectedFileTreeNode(node));
    summary.innerHTML = `
      <span class="file-folder-icon" aria-hidden="true">
        <img src="${MATERIAL_ICON_BASE}/${folderIconName(node)}" alt="">
      </span>
      <span class="folder-name">${escapeHtml(node.name)}</span>
    `;
    summary.addEventListener("click", () => selectFileTreeNode(node));
    attachFileContextMenu(summary, node);
    details.appendChild(summary);

    const children = document.createElement("div");
    children.className = "file-children";
    children.style.setProperty("--depth-indent", depthIndent);
    (node.children || []).forEach((child) => children.appendChild(renderFileNode(child, depth + 1)));
    details.appendChild(children);
    details.addEventListener("toggle", () => {
      if (details.open) expandedFileFolders.add(node.relativePath);
      else expandedFileFolders.delete(node.relativePath);
    });
    return details;
  }

  const button = document.createElement("button");
  button.className = "file-item";
  button.type = "button";
  button.dataset.filePath = node.relativePath;
  button.style.setProperty("--depth-indent", depthIndent);
  const activePresentationEntry = Boolean(
    activeProject
    && activeProject.kind === "presentation"
    && node.presentation
    && node.relativePath === activeProject.texName
  );
  button.classList.toggle("active", Boolean(
    (activeFile && activeFile.relativePath === node.relativePath)
    || activePresentationEntry
  ));
  button.classList.toggle("selected", isSelectedFileTreeNode(node));
  button.innerHTML = `
    ${fileIconMarkup(node)}
    <span class="file-name">${escapeHtml(node.name)}</span>
  `;
  button.addEventListener("click", () => {
    selectFileTreeNode(node);
    selectProjectFile(node, { preview: true });
  });
  button.addEventListener("dblclick", (event) => {
    event.preventDefault();
    selectFileTreeNode(node);
    selectProjectFile(node, { preview: false });
  });
  attachFileContextMenu(button, node);
  return button;
}

function fileIconMarkup(node) {
  return `
    <span class="file-icon file-icon-svg" aria-hidden="true">
      <img src="${MATERIAL_ICON_BASE}/${fileIconName(node)}" alt="">
    </span>
  `;
}

function fileIconName(node) {
  const name = String(node.name || "").toLowerCase();
  const namedIcon = FILE_ICON_NAMES.get(name);
  if (namedIcon) return namedIcon;
  if (name.endsWith(".tar.gz")) return "zip.svg";
  const extension = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  if (node.image) return "image.svg";
  return FILE_ICON_EXTENSIONS.get(extension) || "file.svg";
}

function folderIconName(node) {
  const name = String(node.name || "").toLowerCase();
  return FOLDER_ICON_NAMES.get(name) || "folder.svg";
}

async function selectProjectFile(node, { preview = true } = {}) {
  const presentationProject = Boolean(activeProject && activeProject.kind === "presentation");
  const presentationVisible = Boolean(presentationScreen && !presentationScreen.hidden);
  const activePresentationEntry = presentationProject
    && isPresentationFileNode(node)
    && node.relativePath === activeProject.texName;

  if (activePresentationEntry) {
    if (presentationVisible) return;
    if (openTextTabs.some((tab) => tab.dirty)) {
      const confirmed = window.confirm("Return to the PowerPoint without saving the open text-file changes?");
      if (!confirmed) return;
    }
    await openPresentationProject(activeProject);
    return;
  }

  if (presentationVisible && isPresentationFileNode(node)) {
    if (presentationDirty) {
      const confirmed = window.confirm("Open another PowerPoint without saving the current changes?");
      if (!confirmed) return;
    }
    try {
      const filePath = decodeURIComponent(new URL(node.fileUrl).pathname);
      const result = await window.localOverleaf.addProjectFromPath([filePath]);
      projects = result.projects || projects;
      if (result.project) await openPresentationProject(result.project);
    } catch (error) {
      projectFileStatus(formatError(error), "error");
    }
    return;
  }

  if (presentationVisible) {
    if (presentationDirty) {
      const confirmed = window.confirm("Open this file without saving the current PowerPoint changes?");
      if (!confirmed) return;
    }
    resetTextTabs();
    showEditorShell();
    setFileSidebarVisible(true, { persist: false });
    renderFileTree();
  }

  if (isPreviewDocumentNode(node)) {
    if (isPresentationFileNode(node) && isRemoteProject()) {
      filePreview.hidden = false;
      filePreview.innerHTML = `
        <strong>${escapeHtml(node.name)}</strong>
        <p>PowerPoint preview is currently available for local projects.</p>
      `;
      return;
    }
    filePreview.hidden = true;
    await selectPdfFile(node.relativePath);
    return;
  }

  if (node.editable) {
    filePreview.hidden = true;
    await loadProjectFile(node.relativePath, { preview });
    return;
  }

  if (node.image) {
    openMediaFile(node, { preview });
    return;
  }

  filePreview.hidden = false;
  filePreview.innerHTML = `
    <strong>${escapeHtml(node.name)}</strong>
    <p>This file is listed in the project but is not editable here.</p>
  `;
}

function showImagePreview(node) {
  renderFileTree();
  filePreview.hidden = false;
  filePreview.innerHTML = `
    <strong>${escapeHtml(node.name)}</strong>
    <img src="${escapeHtml(node.fileUrl)}" alt="${escapeHtml(node.name)}">
    <code>${escapeHtml(node.relativePath)}</code>
  `;
}

function openMediaFile(node, { preview = true } = {}) {
  if (!node || !node.relativePath) return;
  syncActiveTextTabFromEditor();
  let tab = openTextTabs.find((item) => item.relativePath === node.relativePath);
  if (!tab) {
    clearReplaceablePreviewTab(node.relativePath);
    tab = {
      relativePath: node.relativePath,
      name: node.name,
      file: node,
      text: "",
      savedText: "",
      dirty: false,
      preview: Boolean(preview),
      kind: "image"
    };
    openTextTabs.push(tab);
  } else if (!preview) {
    tab.preview = false;
  }

  activeTextTabPath = tab.relativePath;
  activeFile = node;
  activeMediaFile = node;
  savedText = "";
  showMediaTab(tab);
  updateEditorFileTitle();
  updateActiveDocumentTitle();
  renderTextTabs();
  renderFileTree();
  updateFileOutline();
  filePreview.hidden = true;
  syncPythonNotebookVisibility();
}

function showMediaTab(tab) {
  editor.getWrapperElement().hidden = true;
  visualEditor.hidden = true;
  mediaViewer.hidden = false;
  mediaViewer.innerHTML = `
    <figure class="media-preview">
      <img src="${escapeHtml(tab.file.fileUrl)}" alt="${escapeHtml(tab.name)}">
      <figcaption>${escapeHtml(tab.relativePath)}</figcaption>
    </figure>
  `;
  applyMinimapVisibility();
}

function createProjectFile(kind) {
  if (!activeProject) return;
  if (isRemoteProject()) {
    compileLog.textContent = "Use the SSH terminal to create files or folders in a remote workspace.";
    return;
  }

  cancelProjectFileCreation();
  closeFileContextMenu();

  const parentPath = currentFileFolderTarget();
  const depth = parentPath ? parentPath.split("/").length : 0;
  const row = document.createElement("div");
  row.className = "file-create-row";
  row.style.setProperty("--depth-indent", `${depth * 14}px`);

  const icon = document.createElement("span");
  icon.className = kind === "folder" ? "file-folder-icon" : "file-icon file-icon-svg";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = `<img src="${MATERIAL_ICON_BASE}/${kind === "folder" ? "folder.svg" : "file.svg"}" alt="">`;

  const input = document.createElement("input");
  input.className = "file-create-input";
  input.type = "text";
  input.spellcheck = false;
  input.autocomplete = "off";
  input.setAttribute("aria-label", kind === "folder" ? "New folder name" : "New file name");

  row.append(icon, input);
  const container = fileCreationContainer(parentPath);
  const tree = activeFileTreeContainer();
  const emptyMessage = container === tree ? tree.querySelector(".file-message") : null;
  if (emptyMessage) emptyMessage.hidden = true;
  container.prepend(row);
  activeFileCreation = { kind, parentPath, row, input, emptyMessage, committing: false };

  const cancel = () => cancelProjectFileCreation();
  const commit = () => commitProjectFileCreation();
  input.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      event.preventDefault();
      void commit();
    } else if (event.key === "Escape") {
      event.preventDefault();
      cancel();
    }
  });
  input.addEventListener("blur", () => {
    if (input.value.trim()) void commit();
    else cancel();
  });

  requestAnimationFrame(() => input.focus());
}

function fileCreationContainer(parentPath) {
  const tree = activeFileTreeContainer();
  if (!parentPath) return tree;
  const summary = Array.from(tree.querySelectorAll(".file-folder > summary[data-file-path]"))
    .find((candidate) => candidate.dataset.filePath === parentPath);
  const details = summary && summary.parentElement;
  if (!details) return tree;
  expandedFileFolders.add(parentPath);
  details.open = true;
  return Array.from(details.children).find((child) => child.classList.contains("file-children")) || tree;
}

function cancelProjectFileCreation() {
  if (!activeFileCreation || activeFileCreation.committing) return;
  const { row, emptyMessage } = activeFileCreation;
  activeFileCreation = null;
  row.remove();
  if (emptyMessage) emptyMessage.hidden = false;
}

async function commitProjectFileCreation() {
  const creation = activeFileCreation;
  if (!creation || creation.committing) return false;
  const name = creation.input.value.trim();
  if (!name) {
    cancelProjectFileCreation();
    return false;
  }

  creation.committing = true;
  creation.input.disabled = true;
  creation.row.classList.remove("invalid");

  try {
    const result = await window.localOverleaf.projectFileAction(
      activeProject.id,
      creation.parentPath,
      creation.kind === "folder" ? "create-folder" : "create-file",
      { name }
    );
    selectedFileTreeNode = result.file
      ? { relativePath: result.file.relativePath, kind: result.file.kind || creation.kind }
      : selectedFileTreeNode;
    activeFileCreation = null;
    creation.row.remove();
    applyFileActionResult(result);
    if (creation.kind === "file" && result.file && result.file.editable) {
      await loadProjectFile(result.file.relativePath, { preview: false });
    }
    projectFileStatus(`${creation.kind === "folder" ? "Created folder" : "Created file"} ${name}.`, "ok");
    return true;
  } catch (error) {
    projectFileStatus(formatError(error), "error");
    creation.committing = false;
    creation.input.disabled = false;
    creation.row.classList.add("invalid");
    creation.input.title = formatError(error);
    requestAnimationFrame(() => {
      creation.input.focus();
      creation.input.select();
    });
    return false;
  }
}

function currentFileFolderTarget() {
  if (selectedFileTreeNode && selectedFileTreeNode.relativePath) {
    const selectedNode = flattenProjectFileNodes(projectFiles)
      .find((node) => node.relativePath === selectedFileTreeNode.relativePath);
    if (selectedNode) {
      if (selectedNode.kind === "folder") return selectedNode.relativePath;
      const selectedParts = selectedNode.relativePath.split("/");
      selectedParts.pop();
      return selectedParts.join("/");
    }
    selectedFileTreeNode = null;
  }
  if (!activeFile || !activeFile.relativePath) return "";
  const parts = activeFile.relativePath.split("/");
  parts.pop();
  return parts.join("/");
}

function isSelectedFileTreeNode(node) {
  return Boolean(selectedFileTreeNode && node && selectedFileTreeNode.relativePath === node.relativePath);
}

function selectFileTreeNode(node) {
  if (!node || !node.relativePath) return;
  selectedFileTreeNode = { relativePath: node.relativePath, kind: node.kind };
  const tree = activeFileTreeContainer();
  tree.querySelectorAll(".selected").forEach((row) => row.classList.remove("selected"));
  const selectedRow = Array.from(tree.querySelectorAll("[data-file-path]"))
    .find((candidate) => candidate.dataset.filePath === node.relativePath);
  if (selectedRow) selectedRow.classList.add("selected");
}

function updateFileOutline() {
  if (!fileOutline || !fileOutlineBody) return;
  const tab = currentTextTab();
  if (!tab || tab.kind !== "text" || isPythonExecutionFile(tab.file)) {
    fileOutline.hidden = true;
    fileOutlineBody.innerHTML = "";
    return;
  }

  const items = buildFileOutlineItems(tab.text || getSourceText());
  if (!items.length) {
    fileOutline.hidden = true;
    fileOutlineBody.innerHTML = "";
    return;
  }

  fileOutline.hidden = false;
  fileOutlineBody.innerHTML = "";
  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `file-outline-item level-${item.level}`;
    button.textContent = item.label;
    button.title = item.label;
    button.addEventListener("click", () => jumpToSourceLine(item.line));
    fileOutlineBody.appendChild(button);
  });
}

function buildFileOutlineItems(text) {
  const items = [];
  String(text || "").split("\n").forEach((line, index) => {
    const markdown = line.match(/^(#{1,6})\s+(.+)$/);
    if (markdown) {
      items.push({ label: markdown[2].trim(), level: markdown[1].length, line: index });
      return;
    }

    const section = line.match(/\\(chapter|section|subsection|subsubsection)\*?\{([^}]+)\}/);
    if (section) {
      const level = { chapter: 1, section: 1, subsection: 2, subsubsection: 3 }[section[1]] || 1;
      items.push({ label: latexToVisual(section[2]), level, line: index });
      return;
    }

    const figure = line.match(/\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/);
    if (figure) items.push({ label: `Figure: ${figure[1]}`, level: 2, line: index });
    if (/\\begin\{equation\}/.test(line)) items.push({ label: "Equation", level: 2, line: index });
  });
  return items.slice(0, 80);
}

function jumpToSourceLine(line) {
  setMode("source");
  requestAnimationFrame(() => {
    editor.focus();
    editor.setCursor({ line, ch: 0 });
    editor.scrollIntoView({ line, ch: 0 }, 96);
  });
}

function attachFileContextMenu(target, node) {
  target.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    selectFileTreeNode(node);
    showFileContextMenu(event, node);
  });
}

function showFileContextMenu(event, node) {
  closeFileContextMenu();

  const menu = document.createElement("div");
  menu.className = "file-context-menu";
  menu.setAttribute("role", "menu");

  const actions = [
    ...(node.kind === "folder"
      ? [
          { id: "new-file", label: "New File..." },
          { id: "new-folder", label: "New Folder..." },
          { separator: true }
        ]
      : []),
    { id: "open", label: node.kind === "folder" ? "Open in Finder" : "Open" },
    { id: "reveal", label: "Reveal in Finder" },
    { separator: true },
    { id: "copy", label: "Copy" },
    { id: "paste", label: "Paste", disabled: !copiedProjectItem },
    { id: "duplicate", label: "Duplicate" },
    { separator: true },
    { id: "copy-path", label: "Copy Path" },
    { id: "copy-relative-path", label: "Copy Relative Path" },
    { id: "copy-name", label: "Copy Name" },
    { separator: true },
    { id: "rename", label: "Rename" },
    { id: "delete", label: "Delete", danger: true }
  ];

  actions.forEach((item) => {
    if (item.separator) {
      const separator = document.createElement("div");
      separator.className = "file-context-separator";
      menu.appendChild(separator);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item.label;
    button.disabled = Boolean(item.disabled);
    button.classList.toggle("danger", Boolean(item.danger));
    button.addEventListener("click", () => runFileContextAction(item.id, node));
    menu.appendChild(button);
  });

  document.body.appendChild(menu);
  const margin = 8;
  const rect = menu.getBoundingClientRect();
  const left = Math.min(event.clientX, window.innerWidth - rect.width - margin);
  const top = Math.min(event.clientY, window.innerHeight - rect.height - margin);
  menu.style.left = `${Math.max(margin, left)}px`;
  menu.style.top = `${Math.max(margin, top)}px`;
  fileContextMenu = menu;
}

function closeFileContextMenu() {
  if (!fileContextMenu) return;
  fileContextMenu.remove();
  fileContextMenu = null;
}

async function runFileContextAction(action, node) {
  closeFileContextMenu();
  if (!activeProject || !node || !node.relativePath) return;

  try {
    if (action === "new-file" || action === "new-folder") {
      selectFileTreeNode(node);
      createProjectFile(action === "new-folder" ? "folder" : "file");
      return;
    }

    if (isRemoteProject()) {
      if (action === "open") {
        if (node.editable || node.image) await selectProjectFile(node);
        return;
      }
      if (action === "copy" || action === "copy-relative-path") {
        await navigator.clipboard.writeText(node.relativePath);
        projectFileStatus(`${node.relativePath} copied.`, "ok");
        return;
      }
      if (action === "copy-name") {
        await navigator.clipboard.writeText(node.name || "");
        projectFileStatus(`${node.name || ""} copied.`, "ok");
        return;
      }
      projectFileStatus("That file action is local-only for now. Use the SSH terminal for remote rename, delete, copy, or reveal.");
      return;
    }

    if (action === "open") {
      if (node.editable || node.image) await selectProjectFile(node);
      else await window.localOverleaf.projectFileAction(activeProject.id, node.relativePath, "open");
      return;
    }

    if (action === "copy") {
      copiedProjectItem = node;
      projectFileStatus(`Copied ${node.relativePath}.`, "ok");
      return;
    }

    if (action === "paste") {
      if (!copiedProjectItem) return;
      const result = await window.localOverleaf.projectFileAction(activeProject.id, node.relativePath, "copy-into", {
        sourceRelativePath: copiedProjectItem.relativePath
      });
      applyFileActionResult(result);
      projectFileStatus(`Pasted ${copiedProjectItem.name}.`, "ok");
      return;
    }

    if (action === "rename") {
      startFileRename(node);
      return;
    }

    if (action === "delete") {
      const confirmed = window.confirm(`Delete "${node.name}" from disk?\n\nThis cannot be undone.`);
      if (!confirmed) return;
      const result = await window.localOverleaf.projectFileAction(activeProject.id, node.relativePath, "delete");
      removeTextTabsUnderPath(node.relativePath);
      applyFileActionResult(result);
      projectFileStatus(`Deleted ${node.relativePath}.`, "ok");
      return;
    }

    const result = await window.localOverleaf.projectFileAction(activeProject.id, node.relativePath, action);
    if (["duplicate"].includes(action)) applyFileActionResult(result);
    if (action.startsWith("copy-")) projectFileStatus(`${result.value || node.relativePath} copied.`, "ok");
  } catch (error) {
    projectFileStatus(formatError(error), "error");
  }
}

function startFileRename(node) {
  if (!activeProject || !node || !node.relativePath) return;
  if (activeFileRenameInput) activeFileRenameInput.blur();

  const tree = activeFileTreeContainer();
  const row = Array.from(tree.querySelectorAll("[data-file-path]"))
    .find((candidate) => candidate.dataset.filePath === node.relativePath);
  const label = row && row.querySelector(".file-name, .folder-name");
  if (!row || !label) return;

  const originalName = node.name || "";
  const input = document.createElement("input");
  input.className = "file-rename-input";
  input.type = "text";
  input.value = originalName;
  input.setAttribute("aria-label", `Rename ${originalName}`);

  const originalNode = label.cloneNode(true);
  label.replaceWith(input);
  row.classList.add("renaming");
  activeFileRenameInput = input;

  let finished = false;
  const restore = () => {
    if (!input.isConnected) return;
    input.replaceWith(originalNode);
    row.classList.remove("renaming");
    if (activeFileRenameInput === input) activeFileRenameInput = null;
  };

  const commit = async () => {
    if (finished) return;
    finished = true;
    const nextName = input.value.trim();
    if (!nextName || nextName === originalName) {
      restore();
      return;
    }

    input.disabled = true;
    try {
      await renameProjectFileNode(node, nextName);
    } catch (error) {
      projectFileStatus(formatError(error), "error");
      restore();
    } finally {
      if (activeFileRenameInput === input) activeFileRenameInput = null;
    }
  };

  const cancel = () => {
    if (finished) return;
    finished = true;
    restore();
  };

  input.addEventListener("click", (event) => event.stopPropagation());
  input.addEventListener("dblclick", (event) => event.stopPropagation());
  input.addEventListener("pointerdown", (event) => event.stopPropagation());
  input.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      event.preventDefault();
      commit();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      cancel();
    }
  });
  input.addEventListener("blur", commit);

  requestAnimationFrame(() => {
    input.focus();
    const extensionStart = originalName.lastIndexOf(".");
    const selectionEnd = extensionStart > 0 && node.kind !== "folder" ? extensionStart : originalName.length;
    input.setSelectionRange(0, selectionEnd);
  });
}

async function renameProjectFileNode(node, nextName) {
  const previousPath = node.relativePath;
  const result = await window.localOverleaf.projectFileAction(activeProject.id, previousPath, "rename", { name: nextName });
  const renamedFile = result.file;

  if (renamedFile) {
    const oldPrefix = `${previousPath}/`;
    const newPrefix = `${renamedFile.relativePath}/`;
    openTextTabs.forEach((tab) => {
      if (tab.relativePath === previousPath) {
        tab.relativePath = renamedFile.relativePath;
        tab.name = renamedFile.name;
        tab.file = renamedFile;
      } else if (tab.relativePath.startsWith(oldPrefix)) {
        tab.relativePath = `${newPrefix}${tab.relativePath.slice(oldPrefix.length)}`;
      }
    });
    if (activeTextTabPath === previousPath) activeTextTabPath = renamedFile.relativePath;
    else if (activeTextTabPath.startsWith(oldPrefix)) activeTextTabPath = `${newPrefix}${activeTextTabPath.slice(oldPrefix.length)}`;
    if (activeFile && activeFile.relativePath === previousPath) activeFile = renamedFile;
    else if (activeFile && activeFile.relativePath && activeFile.relativePath.startsWith(oldPrefix)) {
      activeFile = { ...activeFile, relativePath: `${newPrefix}${activeFile.relativePath.slice(oldPrefix.length)}` };
    }
    if (selectedFileTreeNode && selectedFileTreeNode.relativePath === previousPath) {
      selectedFileTreeNode = { relativePath: renamedFile.relativePath, kind: renamedFile.kind || node.kind };
    } else if (selectedFileTreeNode && selectedFileTreeNode.relativePath.startsWith(oldPrefix)) {
      selectedFileTreeNode = {
        ...selectedFileTreeNode,
        relativePath: `${newPrefix}${selectedFileTreeNode.relativePath.slice(oldPrefix.length)}`
      };
    }
    if (expandedFileFolders.delete(previousPath)) expandedFileFolders.add(renamedFile.relativePath);
  }

  applyFileActionResult(result);
  updateEditorFileTitle();
  updateActiveDocumentTitle();
  projectFileStatus(`Renamed ${node.name} to ${nextName}.`, "ok");
}

function applyFileActionResult(result) {
  if (!result) return;
  activeProject = result.project || activeProject;
  projectFiles = result.files || projectFiles;
  renderFileTree();
  renderTextTabs();
}

async function chooseProjectFiles() {
  if (!activeProject) return;
  if (isRemoteProject()) {
    compileLog.textContent = "Use the SSH terminal to upload or copy files into a remote workspace.";
    return;
  }

  try {
    const result = await window.localOverleaf.chooseProjectFiles(activeProject.id);
    projectFiles = result.files || projectFiles;
    renderFileTree();
    projectFileStatus(`Imported ${(result.imported || []).length} file(s).`, "ok");
  } catch (error) {
    projectFileStatus(formatError(error), "error");
  }
}

function wireFileDrop(target) {
  const dropSurface = target.closest(".file-pane, .pptx-file-pane") || target;
  target.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropSurface.classList.add("drop-active");
  });

  target.addEventListener("dragleave", (event) => {
    event.stopPropagation();
    if (!dropSurface.contains(event.relatedTarget)) dropSurface.classList.remove("drop-active");
  });

  target.addEventListener("drop", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropSurface.classList.remove("drop-active");
    if (!activeProject) return;
    if (isRemoteProject()) {
      compileLog.textContent = "Drag/drop import is local-only. Use scp, rsync, or git from the SSH terminal for remote files.";
      return;
    }

    const files = await Promise.all(Array.from(event.dataTransfer.files).map(fileToImportPayload));
    const usableFiles = files.filter(Boolean);
    if (!usableFiles.length) return;

    try {
      const result = await window.localOverleaf.importProjectFiles(activeProject.id, usableFiles);
      projectFiles = result.files || projectFiles;
      renderFileTree();
      projectFileStatus(`Imported ${(result.imported || []).length} file(s).`, "ok");
    } catch (error) {
      projectFileStatus(formatError(error), "error");
    }
  });
}

async function fileToImportPayload(file) {
  const filePath = projectPathFromFile(file);
  if (filePath) return { path: filePath, name: file.name };
  const bytes = await file.arrayBuffer();
  return { name: file.name, bytes };
}

async function reloadFromDisk() {
  if (!activeProject) return false;
  if (!activeMediaFile && getSourceText() !== savedText) {
    const confirmed = window.confirm("Reload from disk and discard unsaved editor changes?");
    if (!confirmed) return false;
  }

  if (activeFile && activeFile.image) {
    openMediaFile(activeFile, { preview: false });
  } else {
    await loadProjectFile(activeFile ? activeFile.relativePath : "", { confirmUnsaved: false, preview: false });
  }
  return true;
}

async function refreshActiveProject() {
  if (!activeProject) return;
  setCompileState("Refreshing project...");

  try {
    const reloaded = await reloadFromDisk();
    if (!reloaded) {
      setCompileState("Refresh cancelled");
      return;
    }
    await loadProjectFiles();
    await renderPdf({ showLoading: true, preserveView: true });
    setCompileState("Project refreshed", "ok");
  } catch (error) {
    setCompileState("Refresh failed", "error");
    compileLog.textContent = formatError(error);
  }
}

async function saveManuscript({ auto = false } = {}) {
  if (!activeProject) return false;
  if (activeMediaFile) {
    if (!auto) compileLog.textContent = "Image tabs do not need saving.";
    return true;
  }
  if (auto && getSourceText() === savedText) return true;

  setBusy(true);
  clearTimeout(autoSaveTimer);
  if (!auto) clearTimeout(autoCompileTimer);
  setSaveState(auto ? "Auto-saving..." : "Saving...");

  try {
    const tex = getSourceText();
    const result = isRemoteProject()
      ? await window.localOverleaf.saveRemoteFile(remoteWorkspace, activeFile && activeFile.relativePath, tex)
      : await window.localOverleaf.save(activeProject.id, activeFile && activeFile.relativePath, tex);
    if (!isRemoteProject()) activeProject = result.project || activeProject;
    activeFile = result.file || activeFile;
    savedText = tex;
    updateActiveTextTabAfterSave(activeFile, tex);
    updateEditorFileTitle();
    updateActiveDocumentTitle();
    setSaveState(`${auto ? "Auto-saved" : "Saved"} ${timeStamp()}`, "ok");
    return true;
  } catch (error) {
    setSaveState("Save failed", "error");
    compileLog.textContent = formatError(error);
    return false;
  } finally {
    setBusy(false);
  }
}

async function compileManuscript({ manual = false } = {}) {
  if (!activeProject) return;
  if (isPythonExecutionFile()) {
    if (manual) return runActivePythonCell();
    return false;
  }
  if (isRemoteProject()) {
    if (activeMediaFile) {
      compileLog.textContent = "Switch to a text file before compiling.";
      return;
    }
    if (!activeFile || !/\.tex$/i.test(activeFile.relativePath || "")) {
      compileLog.textContent = "Choose a remote TeX file before compiling.";
      return;
    }
    if (isCompiling) {
      pendingCompile = true;
      setCompileState("Compile queued");
      return;
    }

    clearTimeout(autoCompileTimer);
    clearTimeout(autoSaveTimer);
    setBusy(true);
    isCompiling = true;
    setSaveState("Saving...");
    setCompileState(manual ? "Compiling locally..." : "Auto compiling locally...");
    compileLog.textContent = `Mirroring SSH workspace and compiling ${activeFile.name || activeFile.relativePath} locally...`;

    try {
      const tex = getSourceText();
      const saveResult = await window.localOverleaf.saveRemoteFile(remoteWorkspace, activeFile.relativePath, tex);
      activeFile = saveResult.file || activeFile;
      const result = await window.localOverleaf.compileRemote(remoteWorkspace, activeFile.relativePath, tex);
      activeFile = result.file || activeFile;
      selectedPdfRelativePath = result.compiledPdfRelativePath || pdfRelativePathForActiveSource();
      rememberRemoteCompiledPdf(result);
      savedText = tex;
      updateActiveTextTabAfterSave(activeFile, tex);
      updateEditorFileTitle();
      updateActiveDocumentTitle();
      updatePdfTitleFromSelection();
      setSaveState(`Saved ${timeStamp()}`, "ok");
      setCompileState(
        result.compileWarning
          ? `${manual ? "Compile warning" : "Auto compile warning"} ${timeStamp()}`
          : `${manual ? "Compiled" : "Auto compiled"} ${timeStamp()}`,
        result.compileWarning ? "error" : "ok"
      );
      compileLog.textContent = result.output || "Compiled successfully.";
      setPdfStale(Boolean(result.compileWarning));
      setBusy(false);
      setPdf({ preserveView: true }).catch((error) => {
        setCompileState("PDF render failed", "error");
        compileLog.textContent = formatError(error);
      });
    } catch (error) {
      setSaveState(getSourceText() === savedText ? "Saved" : "Unsaved changes");
      setCompileState("Compile failed", "error");
      const errorText = formatError(error);
      compileLog.textContent = errorText;
      const fallbackPdf = selectedPdfRelativePath || pdfRelativePathForActiveSource() || inferredRemotePdfRelativePath();
      if (fallbackPdf) {
        selectedPdfRelativePath = fallbackPdf;
        updatePdfTitleFromSelection();
        const renderedFallback = await setPdf({ preserveView: true, showLoading: false, preserveLogOnError: true });
        if (renderedFallback) {
          compileLog.textContent = `${errorText}\n\nShowing existing ${activePdfName()} from the local SSH mirror. Compile failed, so this PDF may be stale.`;
        }
      }
    } finally {
      isCompiling = false;
      setBusy(false);
      if (pendingCompile) {
        pendingCompile = false;
        scheduleAutoCompile("Changes queued while compiling");
      }
    }
    return;
  }
  if (activeMediaFile) {
    compileLog.textContent = "Switch to a text file before compiling.";
    return;
  }

  clearTimeout(autoCompileTimer);
  clearTimeout(autoSaveTimer);

  if (isCompiling) {
    pendingCompile = true;
    setCompileState("Compile queued");
    return;
  }

  setBusy(true);
  isCompiling = true;
  setSaveState("Saving...");
  setCompileState(manual ? "Compiling..." : "Auto compiling...");
  const activeSourceName = (activeFile && activeFile.name) || activeProject.texName || "main.tex";
  const entryName = activeProject.texName || "main.tex";
  compileLog.textContent = activeSourceName === entryName
    ? `Running tectonic ${entryName}...`
    : `Saving ${activeSourceName} and running tectonic ${entryName}...`;

  try {
    const tex = getSourceText();
    const result = await window.localOverleaf.compile(activeProject.id, activeFile && activeFile.relativePath, tex);
    activeProject = result.project || activeProject;
    activeFile = result.file || activeFile;
    if (result.compiledPdfRelativePath) selectedPdfRelativePath = result.compiledPdfRelativePath;
    savedText = tex;
    updateActiveTextTabAfterSave(activeFile, tex);
    updateEditorFileTitle();
    updateActiveDocumentTitle();
    updatePdfTitleFromSelection();
    await setPdf({ preserveView: true });
    setSaveState(`Saved ${timeStamp()}`, "ok");
    setCompileState(`${manual ? "Compiled" : "Auto compiled"} ${timeStamp()}`, "ok");
    compileLog.textContent = result.output.trim() || "Compiled successfully.";
    setPdfStale(false);
  } catch (error) {
    setSaveState(getSourceText() === savedText ? "Saved" : "Unsaved changes");
    setCompileState("Compile failed", "error");
    compileLog.textContent = formatError(error);
  } finally {
    isCompiling = false;
    setBusy(false);

    if (pendingCompile) {
      pendingCompile = false;
      scheduleAutoCompile("Changes queued while compiling");
    }
  }
}

async function openPdf() {
  if (!activeProject) return;

  try {
    await window.localOverleaf.openPdf(activeProject.id, selectedPdfRelativePath);
  } catch (error) {
    compileLog.textContent = formatError(error);
  }
}

async function downloadPdf() {
  if (!activeProject) return;

  setBusy(true);
  setCompileState("Preparing PDF download...");

  try {
    const result = await window.localOverleaf.downloadPdf(activeProject.id, selectedPdfRelativePath);
    if (result && result.filePath) setCompileState("PDF downloaded", "ok");
    else setCompileState("Download canceled");
  } catch (error) {
    setCompileState("Download failed", "error");
    compileLog.textContent = formatError(error);
  } finally {
    setBusy(false);
  }
}

async function downloadProjectPackage() {
  if (!activeProject || !window.localOverleaf || !window.localOverleaf.downloadProjectPackage) return;
  if (isRemoteProject()) {
    compileLog.textContent = "Use the SSH terminal to archive or download remote workspaces.";
    return;
  }

  setBusy(true);
  setCompileState("Preparing project package...");

  try {
    const result = await window.localOverleaf.downloadProjectPackage(activeProject.id);
    if (result && result.filePath) {
      setCompileState(`Package downloaded (${result.format || "archive"})`, "ok");
      compileLog.textContent = `Saved project package to ${result.filePath}.`;
    } else {
      setCompileState("Package download canceled");
    }
  } catch (error) {
    setCompileState("Package download failed", "error");
    compileLog.textContent = formatError(error);
  } finally {
    setBusy(false);
  }
}

async function pushActiveProjectToGithub() {
  if (!activeProject || !window.localOverleaf || !window.localOverleaf.pushProjectToGithub) return;

  setBusy(true);
  setSaveState("Pushing...");
  setCompileState("Pushing to GitHub...");

  try {
    if (!activeMediaFile && getSourceText() !== savedText) {
      await saveManuscript();
    }
    const result = await window.localOverleaf.pushProjectToGithub(activeProject.id, {
      defaultRemote: defaultGithubRemote || DEFAULT_GITHUB_REMOTE
    });
    const commitText = result && result.commit ? ` (${result.commit.slice(0, 7)})` : "";
    setSaveState("Saved", "ok");
    setCompileState(`Pushed LaTeX sources${commitText}`, "ok");
    const targetText = result && result.remote
      ? `Pushed LaTeX sources to ${result.remote}${result.folder ? `/${result.folder}` : ""}.`
      : "Pushed LaTeX sources to GitHub.";
    compileLog.textContent = [targetText, result && result.output].filter(Boolean).join("\n\n");
  } catch (error) {
    setSaveState(activeMediaFile || getSourceText() === savedText ? "Saved" : "Unsaved changes");
    setCompileState("GitHub push failed", "error");
    compileLog.textContent = formatError(error);
  } finally {
    setBusy(false);
  }
}

async function pullActiveProjectFromGithub() {
  if (!activeProject || !window.localOverleaf || !window.localOverleaf.pullProjectFromGithub) return;
  const projectRemote = (projectGithubRemoteInput && projectGithubRemoteInput.value.trim()) || activeProject.githubRemote || "";
  const defaultRemote = defaultGithubRemote || DEFAULT_GITHUB_REMOTE;

  const confirmed = window.confirm("Pull will overwrite local LaTeX source files. Openleaf will try the default GitHub repo first, then the project GitHub remote if needed. Continue?");
  if (!confirmed) return;

  setBusy(true);
  setSaveState("Pulling...");
  setCompileState("Pulling from GitHub...");

  try {
    if (!activeMediaFile && getSourceText() !== savedText) {
      await saveManuscript();
    }
    const result = await window.localOverleaf.pullProjectFromGithub(activeProject.id, { defaultRemote });
    activeProject = result.project || activeProject;
    setCompileState(`Pulled ${result.files ? result.files.length : 0} LaTeX files`, "ok");
    const sourceLabel = result.source === "default"
      ? `default GitHub${result.folder ? ` (${result.folder})` : ""}`
      : "project GitHub";
    compileLog.textContent = [
      `Pulled LaTeX sources from ${sourceLabel}: ${result.remote || projectRemote || defaultRemote}.`,
      result.files && result.files.length ? result.files.join("\n") : ""
    ].filter(Boolean).join("\n\n");
    await loadManuscript(activeProject.id);
    await loadProjectFiles();
    populateProjectSettingsForm();
  } catch (error) {
    setSaveState(activeMediaFile || getSourceText() === savedText ? "Saved" : "Unsaved changes");
    setCompileState("GitHub pull failed", "error");
    compileLog.textContent = formatError(error);
    if (projectSettingsStatus) {
      projectSettingsStatus.textContent = formatError(error);
      setStatusClass(projectSettingsStatus, "error");
    }
  } finally {
    setBusy(false);
  }
}

function togglePdfReaderMode(force) {
  const next = typeof force === "boolean" ? force : !document.body.classList.contains("pdf-reader-mode");
  document.body.classList.toggle("pdf-reader-mode", next);
  workspace.classList.toggle("pdf-reader-mode", next);
  if (pdfReaderButton) {
    pdfReaderButton.setAttribute("aria-pressed", String(next));
    pdfReaderButton.title = next ? "Exit PDF reader mode" : "PDF reader mode";
  }
  requestAnimationFrame(() => {
    renderPdf({ showLoading: false });
    updatePdfPageIndicator();
  });
}

function applyExtraFeaturesSetting(enabled, { persist = true } = {}) {
  extraFeaturesEnabled = Boolean(enabled);
  if (settingsExtraFeaturesToggle) settingsExtraFeaturesToggle.checked = extraFeaturesEnabled;
  if (pdfCinematicButton) pdfCinematicButton.hidden = !extraFeaturesEnabled;
  if (persist) localStorage.setItem("openleafExtraFeaturesEnabled", String(extraFeaturesEnabled));
  if (!extraFeaturesEnabled) closePdfCinematicMode();
}

function currentPdfPageShell() {
  const pages = Array.from(pdfViewer.querySelectorAll(".pdf-page"));
  if (!pages.length) return null;
  const viewerBounds = pdfViewer.getBoundingClientRect();
  const focusY = viewerBounds.top + viewerBounds.height * 0.42;
  return pages.reduce((best, page) => {
    const bounds = page.getBoundingClientRect();
    const distance = Math.abs(bounds.top + bounds.height / 2 - focusY);
    return !best || distance < best.distance ? { page, distance } : best;
  }, null)?.page || pages[0];
}

function pdfCinematicArtworkPageShell(fallbackPage) {
  const pages = Array.from(pdfViewer.querySelectorAll(".pdf-page"))
    .filter((page) => {
      const canvas = page.querySelector("canvas");
      return canvas && canvas.width > 1 && canvas.height > 1;
    });
  if (!pages.length) return fallbackPage;
  const fallbackNumber = Number(fallbackPage && fallbackPage.dataset.page) || 1;
  const illustrated = pages.filter((page) => {
    const pageNumber = Number(page.dataset.page) || 1;
    return (pdfPageTextLines.get(pageNumber) || []).some((line) => (
      /\b(credit|figure|photo(?:graph)?|illustration|image)\b/i.test(String(line.text || ""))
    ));
  });
  return (illustrated.length ? illustrated : [fallbackPage].filter(Boolean)).sort((left, right) => (
    Math.abs((Number(left.dataset.page) || 1) - fallbackNumber)
      - Math.abs((Number(right.dataset.page) || 1) - fallbackNumber)
  ))[0] || fallbackPage;
}

function pdfCinematicReadingScene(pageNumber) {
  let chunkIndex = Number.isInteger(pdfSpeechChunkIndex) ? pdfSpeechChunkIndex : -1;
  let chunk = pdfSpeechPlan.chunks[chunkIndex];
  if (!chunk || !chunk.words.some((word) => Number(word.pageNumber) === pageNumber)) {
    chunkIndex = pdfSpeechPlan.chunks.findIndex((candidate) => (
      candidate.words.some((word) => Number(word.pageNumber) === pageNumber)
    ));
    chunk = pdfSpeechPlan.chunks[chunkIndex];
  }

  if (chunk) {
    const startIndex = chunkIndex === pdfSpeechChunkIndex
      ? clampNumber(pdfSpeechWordIndex, 0, Math.max(0, chunk.words.length - 1), 0)
      : 0;
    const words = chunk.words.slice(startIndex);
    const narration = pdfSpeechChunkText(words.length ? words : chunk.words).trim();
    if (narration) return { title: `Page ${pageNumber}`, narration };
  }

  const narration = (pdfPageTextLines.get(pageNumber) || [])
    .filter((line, index, lines) => !isPdfSpeechNonContentLine(line, index, lines.length))
    .map((line) => String(line.text || "").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(" ");
  return {
    title: `Page ${pageNumber}`,
    narration: narration || "This page does not contain readable text yet."
  };
}

function pdfCinematicArtworkUrl(pageShell) {
  const canvas = pageShell && pageShell.querySelector("canvas");
  if (!canvas || canvas.width <= 1 || canvas.height <= 1) return "";
  try {
    let crop = { left: 0, top: 0, right: canvas.width, bottom: canvas.height };
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const boxes = detectPdfFigureBoxes(context.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height)
      .sort((left, right) => ((right.right - right.left) * (right.bottom - right.top)) - ((left.right - left.left) * (left.bottom - left.top)));
    if (boxes[0]) crop = boxes[0];
    crop.left = clampNumber(crop.left, 0, canvas.width - 1, 0);
    crop.top = clampNumber(crop.top, 0, canvas.height - 1, 0);
    crop.right = clampNumber(crop.right, crop.left + 1, canvas.width, canvas.width);
    crop.bottom = clampNumber(crop.bottom, crop.top + 1, canvas.height, canvas.height);
    let sourceWidth = Math.max(1, crop.right - crop.left);
    let sourceHeight = Math.max(1, crop.bottom - crop.top);
    const targetRatio = 16 / 9;
    if (sourceWidth / sourceHeight > targetRatio) {
      const width = sourceHeight * targetRatio;
      crop.left += (sourceWidth - width) / 2;
      sourceWidth = width;
    } else {
      const height = sourceWidth / targetRatio;
      crop.top += (sourceHeight - height) / 2;
      sourceHeight = height;
    }
    const output = document.createElement("canvas");
    output.width = 1280;
    output.height = 720;
    output.getContext("2d").drawImage(canvas, crop.left, crop.top, sourceWidth, sourceHeight, 0, 0, output.width, output.height);
    return output.toDataURL("image/jpeg", 0.86);
  } catch (_error) {
    try {
      return canvas.toDataURL("image/jpeg", 0.82);
    } catch (_fallbackError) {
      return "";
    }
  }
}

async function openPdfCinematicMode() {
  if (!extraFeaturesEnabled || !pdfCinematicStage) return;
  if (!pdfSpeechPlan.chunks.length || !pdfSpeechPlan.wordCount) return;
  ++pdfCinematicGeneration;

  if (pdfSpeechPlaying) {
    if (pdfSpeechAudio) pdfSpeechAudio.pause();
    cancelAnimationFrame(pdfSpeechAnimationFrame);
    pdfSpeechPlaying = false;
    pdfSpeechPaused = true;
    updatePdfSpeechButton();
    setPdfSpeechStatus("Paused", "paused");
  }
  closePdfCinematicAudio();
  pdfCinematicChunkIndex = 0;
  pdfCinematicWordIndex = 0;
  pdfCinematicCurrentTimings = [];
  pdfCinematicPlaying = true;
  pdfCinematicPaused = false;
  pdfCinematicFollowText = true;
  pdfCinematicTitle.textContent = activePdfName();
  renderPdfCinematicTranscript();
  pdfCinematicStatus.textContent = `Preparing ${pdfSpeechVoiceLabel()}…`;
  pdfCinematicProgressBar.style.transform = "scaleX(0)";
  pdfCinematicStage.hidden = false;
  document.body.classList.add("pdf-cinematic-open");
  pdfCinematicStage.classList.add("is-visible", "is-preparing");
  if (pdfCinematicFollowButton) {
    pdfCinematicFollowButton.classList.add("active");
    pdfCinematicFollowButton.setAttribute("aria-pressed", "true");
  }
  const savedArtwork = clampNumber(Number(localStorage.getItem("openleafPdfCinematicArtwork")), 0, PDF_CINEMATIC_ARTWORKS.length - 1, 0);
  if (pdfCinematicBackdropIntensity) pdfCinematicBackdropIntensity.value = localStorage.getItem("openleafPdfCinematicBackdropIntensity") || "0.78";
  if (pdfCinematicTextSize) pdfCinematicTextSize.value = localStorage.getItem("openleafPdfCinematicTextSize") || "1";
  setPdfCinematicArtwork(savedArtwork);
  applyPdfCinematicAppearance();
  updatePdfCinematicPlaybackButton();
  pdfCinematicPlaybackButton?.focus();
  await playPdfCinematicChunk();
}

function togglePdfCinematicPlayback() {
  if (!pdfCinematicStage || pdfCinematicStage.hidden) return;
  if (!pdfCinematicAudio) {
    if (pdfCinematicChunkIndex >= pdfSpeechPlan.chunks.length) {
      pdfCinematicChunkIndex = 0;
      pdfCinematicWordIndex = 0;
      resetPdfCinematicTranscriptProgress();
    }
    pdfCinematicPlaying = true;
    pdfCinematicPaused = false;
    updatePdfCinematicPlaybackButton();
    void playPdfCinematicChunk();
    return;
  }
  if (pdfCinematicAudio.paused) {
    pdfCinematicAudio.play().then(() => {
      pdfCinematicPlaying = true;
      pdfCinematicPaused = false;
      pdfCinematicStage.classList.add("is-narrating");
      updatePdfCinematicPlaybackButton();
      monitorPdfCinematicAudio();
    }).catch(() => {});
  } else {
    pdfCinematicAudio.pause();
    pdfCinematicPlaying = false;
    pdfCinematicPaused = true;
    cancelAnimationFrame(pdfCinematicAnimationFrame);
    pdfCinematicStage.classList.remove("is-narrating");
    pdfCinematicStatus.textContent = "Paused · press Space to continue";
    updatePdfCinematicPlaybackButton();
  }
}

function renderPdfCinematicTranscript() {
  if (!pdfCinematicNarration) return;
  pdfCinematicNarration.innerHTML = pdfSpeechPlan.chunks.map((chunk, chunkIndex) => {
    const words = chunk.words.reduce((html, word, wordIndex) => {
      const previous = chunk.words[wordIndex - 1];
      const separator = wordIndex > 0 && !(previous && previous.joinsNext) ? " " : "";
      return `${html}${separator}<span data-cinematic-chunk="${chunkIndex}" data-cinematic-word="${wordIndex}">${escapeHtml(word.text || word.spokenText)}</span>`;
    }, "");
    return `<p data-cinematic-paragraph="${chunkIndex}">${words}</p>`;
  }).join("");
  pdfCinematicNarration.scrollTop = 0;
  pdfCinematicActiveWord = null;
}

function resetPdfCinematicTranscriptProgress() {
  if (!pdfCinematicNarration) return;
  pdfCinematicNarration.querySelectorAll(".is-active, .is-read").forEach((element) => element.classList.remove("is-active", "is-read"));
  pdfCinematicNarration.scrollTop = 0;
  pdfCinematicActiveWord = null;
  pdfCinematicProgressBar.style.transform = "scaleX(0)";
}

function setPdfCinematicArtwork(index) {
  const artworkIndex = clampNumber(Number(index), 0, PDF_CINEMATIC_ARTWORKS.length - 1, 0);
  if (pdfCinematicArtwork) pdfCinematicArtwork.src = PDF_CINEMATIC_ARTWORKS[artworkIndex];
  pdfCinematicBackdropButtons.forEach((button) => {
    const active = Number(button.dataset.cinematicArtwork) === artworkIndex;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  localStorage.setItem("openleafPdfCinematicArtwork", String(artworkIndex));
}

function applyPdfCinematicAppearance() {
  if (!pdfCinematicStage) return;
  const intensity = clampNumber(Number(pdfCinematicBackdropIntensity && pdfCinematicBackdropIntensity.value), 0.25, 1, 0.78);
  const textSize = clampNumber(Number(pdfCinematicTextSize && pdfCinematicTextSize.value), 0.8, 1.4, 1);
  pdfCinematicStage.style.setProperty("--cinematic-art-opacity", String(intensity));
  pdfCinematicStage.style.setProperty("--cinematic-text-scale", String(textSize));
  localStorage.setItem("openleafPdfCinematicBackdropIntensity", String(intensity));
  localStorage.setItem("openleafPdfCinematicTextSize", String(textSize));
}

function scrollPdfCinematicWordIntoView(wordElement, force = false) {
  if (!pdfCinematicFollowText || !pdfCinematicNarration || !wordElement) return;
  const viewport = pdfCinematicNarration.getBoundingClientRect();
  const bounds = wordElement.getBoundingClientRect();
  const outsideFocusBand = bounds.top < viewport.top + viewport.height * 0.28
    || bounds.bottom > viewport.bottom - viewport.height * 0.28;
  if (force || outsideFocusBand) wordElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}

function highlightPdfCinematicWord(chunkIndex, wordIndex) {
  if (!pdfCinematicNarration) return;
  const next = pdfCinematicNarration.querySelector(`[data-cinematic-chunk="${chunkIndex}"][data-cinematic-word="${wordIndex}"]`);
  if (!next || next === pdfCinematicActiveWord) return;
  if (pdfCinematicActiveWord) {
    pdfCinematicActiveWord.classList.remove("is-active");
    pdfCinematicActiveWord.classList.add("is-read");
  }
  next.classList.add("is-active");
  pdfCinematicActiveWord = next;
  scrollPdfCinematicWordIntoView(next);
}

function pdfCinematicCompletedWords() {
  let count = 0;
  for (let index = 0; index < Math.min(pdfCinematicChunkIndex, pdfSpeechPlan.chunks.length); index += 1) {
    count += pdfSpeechPlan.chunks[index].words.length;
  }
  return count + Math.max(0, pdfCinematicWordIndex);
}

function updatePdfCinematicProgress() {
  const completedWords = pdfCinematicCompletedWords();
  const progress = pdfSpeechPlan.wordCount
    ? clampNumber(completedWords / pdfSpeechPlan.wordCount, 0, 1, 0)
    : 0;
  pdfCinematicProgressBar.style.transform = `scaleX(${progress})`;
  let rawElapsed = 0;
  for (let index = 0; index < Math.min(pdfCinematicChunkIndex, pdfSpeechChunkDurations.length); index += 1) {
    rawElapsed += Number(pdfSpeechChunkDurations[index]) || 0;
  }
  rawElapsed += Number(pdfCinematicAudio && pdfCinematicAudio.currentTime) || 0;
  const rate = pdfSpeechPlaybackRate();
  const total = pdfSpeechDurationEstimate().duration / rate;
  pdfCinematicStatus.textContent = `${pdfSpeechVoiceLabel()} · ${formatPdfSpeechTime(rawElapsed / rate)} / ${total ? formatPdfSpeechTime(total) : "--:--"} · ${Math.round(progress * 100)}%`;
}

function updatePdfCinematicPlaybackButton() {
  if (!pdfCinematicPlaybackButton) return;
  const playing = pdfCinematicPlaying && !pdfCinematicPaused;
  pdfCinematicPlaybackButton.classList.toggle("is-playing", playing);
  pdfCinematicPlaybackButton.setAttribute("aria-label", playing ? "Pause cinematic reading" : "Resume cinematic reading");
  pdfCinematicPlaybackButton.setAttribute("aria-pressed", String(playing));
}

function monitorPdfCinematicAudio() {
  cancelAnimationFrame(pdfCinematicAnimationFrame);
  const update = () => {
    if (!pdfCinematicAudio || !pdfCinematicPlaying || pdfCinematicAudio.paused) return;
    const time = Number(pdfCinematicAudio.currentTime) || 0;
    let timing = pdfCinematicCurrentTimings[0];
    pdfCinematicCurrentTimings.forEach((candidate) => {
      if (candidate.start <= time) timing = candidate;
    });
    if (timing && timing.wordIndex !== pdfCinematicWordIndex) {
      pdfCinematicWordIndex = timing.wordIndex;
      highlightPdfCinematicWord(pdfCinematicChunkIndex, pdfCinematicWordIndex);
    }
    updatePdfCinematicProgress();
    pdfCinematicAnimationFrame = requestAnimationFrame(update);
  };
  pdfCinematicAnimationFrame = requestAnimationFrame(update);
}

async function playPdfCinematicChunk() {
  if (!pdfCinematicPlaying || pdfCinematicPaused || !pdfCinematicStage || pdfCinematicStage.hidden) return;
  const chunk = pdfSpeechPlan.chunks[pdfCinematicChunkIndex];
  if (!chunk) {
    closePdfCinematicAudio();
    pdfCinematicPlaying = false;
    pdfCinematicPaused = false;
    pdfCinematicChunkIndex = pdfSpeechPlan.chunks.length;
    pdfCinematicWordIndex = 0;
    pdfCinematicStage.classList.remove("is-preparing", "is-narrating");
    pdfCinematicProgressBar.style.transform = "scaleX(1)";
    pdfCinematicStatus.textContent = `Finished · ${pdfSpeechPlan.wordCount.toLocaleString()} words`;
    updatePdfCinematicPlaybackButton();
    return;
  }
  const generation = pdfCinematicGeneration;
  pdfCinematicStage.classList.add("is-preparing");
  pdfCinematicStatus.textContent = `Preparing passage ${pdfCinematicChunkIndex + 1} of ${pdfSpeechPlan.chunks.length}…`;
  try {
    const result = await preparePdfSpeechAudio(pdfCinematicChunkIndex);
    if (generation !== pdfCinematicGeneration || pdfCinematicStage.hidden || !pdfCinematicPlaying) return;
    pdfSpeechChunkDurations[pdfCinematicChunkIndex] = Number(result.duration) || 0;
    pdfCinematicCurrentTimings = alignPdfSpeechTimings(chunk.words, result.timings, result.duration);
    recordPdfSpeechChunkMetadata(pdfCinematicChunkIndex, pdfCinematicCurrentTimings, result.voice);
    closePdfCinematicAudio();
    pdfCinematicAudio = new Audio(result.audioUrl);
    pdfCinematicAudio.preload = "auto";
    pdfCinematicAudio.playbackRate = pdfSpeechPlaybackRate();
    pdfCinematicAudio.preservesPitch = true;
    pdfCinematicAudio.addEventListener("ended", () => {
      if (generation !== pdfCinematicGeneration) return;
      cancelAnimationFrame(pdfCinematicAnimationFrame);
      const paragraph = pdfCinematicNarration && pdfCinematicNarration.querySelector(`[data-cinematic-paragraph="${pdfCinematicChunkIndex}"]`);
      if (paragraph) paragraph.classList.add("is-read");
      pdfCinematicChunkIndex += 1;
      pdfCinematicWordIndex = 0;
      void playPdfCinematicChunk();
    }, { once: true });
    pdfCinematicAudio.addEventListener("error", () => {
      if (generation !== pdfCinematicGeneration) return;
      pdfCinematicPlaying = false;
      pdfCinematicPaused = true;
      pdfCinematicStage.classList.remove("is-preparing", "is-narrating");
      pdfCinematicStatus.textContent = "Narration paused because this passage could not be loaded.";
      updatePdfCinematicPlaybackButton();
    }, { once: true });
    highlightPdfCinematicWord(pdfCinematicChunkIndex, pdfCinematicWordIndex);
    await pdfCinematicAudio.play();
    if (generation !== pdfCinematicGeneration) return;
    pdfCinematicStage.classList.remove("is-preparing");
    pdfCinematicStage.classList.add("is-narrating");
    updatePdfCinematicPlaybackButton();
    updatePdfCinematicProgress();
    monitorPdfCinematicAudio();
    void preparePdfSpeechAudio(pdfCinematicChunkIndex + 1).catch(() => {});
  } catch (error) {
    if (generation !== pdfCinematicGeneration) return;
    pdfCinematicPlaying = false;
    pdfCinematicPaused = true;
    pdfCinematicStage.classList.remove("is-preparing", "is-narrating");
    pdfCinematicStatus.textContent = `Narration unavailable · ${formatError(error)}`;
    updatePdfCinematicPlaybackButton();
  }
}

function closePdfCinematicAudio() {
  cancelAnimationFrame(pdfCinematicAnimationFrame);
  pdfCinematicAnimationFrame = 0;
  if (!pdfCinematicAudio) return;
  pdfCinematicAudio.pause();
  pdfCinematicAudio.removeAttribute("src");
  pdfCinematicAudio.load();
  pdfCinematicAudio = null;
}

function closePdfCinematicMode() {
  if (!pdfCinematicStage) return;
  pdfCinematicGeneration += 1;
  closePdfCinematicAudio();
  pdfCinematicPlaying = false;
  pdfCinematicPaused = false;
  pdfCinematicCurrentTimings = [];
  pdfCinematicActiveWord = null;
  pdfCinematicStage.classList.remove("is-visible", "is-preparing", "is-narrating");
  pdfCinematicStage.hidden = true;
  document.body.classList.remove("pdf-cinematic-open");
  updatePdfCinematicPlaybackButton();
  if (pdfCinematicButton && !pdfCinematicButton.hidden) pdfCinematicButton.focus();
}

async function loadAgentsFile() {
  const token = ++agentsLoadToken;
  if (!activeProject) {
    agentsPathLabel.textContent = "AGENTS.md";
    agentsEditor.value = "";
    agentsEditor.disabled = true;
    reloadAgentsButton.disabled = true;
    saveAgentsButton.disabled = true;
    agentsStatus.textContent = "No project is open.";
    setStatusClass(agentsStatus);
    return;
  }

  agentsEditor.disabled = true;
  reloadAgentsButton.disabled = true;
  saveAgentsButton.disabled = true;
  agentsStatus.textContent = "Loading AGENTS.md...";
  setStatusClass(agentsStatus);

  try {
    const result = await window.localOverleaf.readAgents(activeProject.id);
    if (token !== agentsLoadToken) return;
    agentsPathLabel.textContent = "AGENTS.md";
    agentsEditor.value = result.text || "";
    agentsStatus.textContent = result.exists ? "AGENTS.md loaded." : "";
  } catch (error) {
    if (token !== agentsLoadToken) return;
    agentsStatus.textContent = formatError(error);
    setStatusClass(agentsStatus, "error");
  } finally {
    if (token === agentsLoadToken) {
      agentsEditor.disabled = false;
      reloadAgentsButton.disabled = false;
      saveAgentsButton.disabled = false;
    }
  }
}

async function saveAgentsFile() {
  if (!activeProject) return;

  agentsEditor.disabled = true;
  reloadAgentsButton.disabled = true;
  saveAgentsButton.disabled = true;
  agentsStatus.textContent = "Saving AGENTS.md...";
  setStatusClass(agentsStatus);

  try {
    const result = await window.localOverleaf.saveAgents(activeProject.id, agentsEditor.value);
    agentsPathLabel.textContent = "AGENTS.md";
    agentsStatus.textContent = `Saved AGENTS.md ${timeStamp()}`;
    setStatusClass(agentsStatus, "ok");
  } catch (error) {
    agentsStatus.textContent = formatError(error);
    setStatusClass(agentsStatus, "error");
  } finally {
    agentsEditor.disabled = false;
    reloadAgentsButton.disabled = false;
    saveAgentsButton.disabled = false;
  }
}

function handleSourceChanged({ renderVisual = false } = {}) {
  updateStats();
  scheduleSourceMinimapUpdate();
  updateActiveDocumentTitle();
  updateActiveTextTabDirtyState();
  updateFileOutline();
  setSaveState(getSourceText() === savedText ? "Saved" : "Unsaved changes");
  if (renderVisual) renderVisualEditor();
  scheduleAutoSave();
  if (!isPythonExecutionFile()) {
    setPdfStale(true);
    scheduleAutoCompile("Waiting for edits to settle...");
  }
  scheduleHistoryCapture("Edited");
}

function setupSourceMinimap() {
  if (!sourceMinimap || !editor) return;

  const jumpToPointer = (clientY) => {
    const rect = sourceMinimap.getBoundingClientRect();
    if (!rect.height) return;

    const info = editor.getScrollInfo();
    const ratio = clampNumber((clientY - rect.top) / rect.height, 0, 1, 0);
    const maxTop = Math.max(0, info.height - info.clientHeight);
    const top = ratio * info.height - info.clientHeight / 2;
    editor.scrollTo(null, Math.max(0, Math.min(maxTop, top)));
  };

  sourceMinimap.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    sourceMinimapDragging = true;
    sourceMinimap.setPointerCapture(event.pointerId);
    jumpToPointer(event.clientY);
  });

  sourceMinimap.addEventListener("pointermove", (event) => {
    if (!sourceMinimapDragging) return;
    event.preventDefault();
    jumpToPointer(event.clientY);
  });

  sourceMinimap.addEventListener("pointerup", (event) => {
    sourceMinimapDragging = false;
    if (sourceMinimap.hasPointerCapture(event.pointerId)) sourceMinimap.releasePointerCapture(event.pointerId);
  });
}

function scheduleSourceMinimapUpdate() {
  if (!sourceMinimap || !sourceMinimapLines || !editor) return;
  cancelAnimationFrame(sourceMinimapFrame);
  sourceMinimapFrame = requestAnimationFrame(updateSourceMinimap);
}

function updateSourceMinimap() {
  if (!sourceMinimap || !sourceMinimapLines || !editor) return;

  const lines = editor.getValue().split("\n");
  sourceMinimap.classList.toggle("short", lines.length <= 80);
  sourceMinimapLines.style.setProperty("--minimap-lines", String(Math.max(lines.length, 1)));
  sourceMinimapLines.innerHTML = lines.map((line) => {
    const trimmed = line.trim();
    const kind = sourceMinimapLineKind(trimmed);
    const previewText = renderSourceMinimapSyntax(line.replace(/\t/g, "  ").slice(0, 150));
    return `<span class="source-minimap-line ${kind}">${previewText || "&nbsp;"}</span>`;
  }).join("");
  updateSourceMinimapViewport();
}

function renderSourceMinimapSyntax(line) {
  if (!line) return "";

  const commentIndex = findLatexCommentIndex(line);
  const code = commentIndex === -1 ? line : line.slice(0, commentIndex);
  const comment = commentIndex === -1 ? "" : line.slice(commentIndex);
  const tokenPattern = /(\\[a-zA-Z@]+\*?|\\.|\{|\}|\[|\]|\b\d+(?:\.\d+)?\b|[$^_&#~]|--)/g;
  let html = "";
  let cursor = 0;
  let match;

  while ((match = tokenPattern.exec(code)) !== null) {
    if (match.index > cursor) {
      html += `<span class="source-minimap-token text">${escapeHtml(code.slice(cursor, match.index))}</span>`;
    }
    const token = match[0];
    html += `<span class="source-minimap-token ${sourceMinimapTokenKind(token)}">${escapeHtml(token)}</span>`;
    cursor = match.index + token.length;
  }

  if (cursor < code.length) {
    html += `<span class="source-minimap-token text">${escapeHtml(code.slice(cursor))}</span>`;
  }
  if (comment) {
    html += `<span class="source-minimap-token comment">${escapeHtml(comment)}</span>`;
  }
  return html;
}

function findLatexCommentIndex(line) {
  for (let index = 0; index < line.length; index += 1) {
    if (line[index] !== "%") continue;
    let slashCount = 0;
    for (let cursor = index - 1; cursor >= 0 && line[cursor] === "\\"; cursor -= 1) {
      slashCount += 1;
    }
    if (slashCount % 2 === 0) return index;
  }
  return -1;
}

function sourceMinimapTokenKind(token) {
  if (token.startsWith("\\")) return "keyword";
  if (token === "{" || token === "}" || token === "[" || token === "]") return "variable";
  if (/^\d/.test(token)) return "text";
  return "atom";
}

function sourceMinimapLineKind(line) {
  if (!line) return "empty";
  if (line.startsWith("%")) return "comment";
  if (/\\(section|subsection|subsubsection|title|author)\b/.test(line)) return "heading";
  if (/\\(includegraphics|caption|label)\b/.test(line)) return "figure";
  if (/^\\|\\(begin|end|usepackage|documentclass|newcommand)\b/.test(line)) return "command";
  return "text";
}

function updateSourceMinimapViewport() {
  if (!sourceMinimapViewport || !editor) return;

  const info = editor.getScrollInfo();
  const lineCount = Math.max(editor.lineCount(), 1);
  const from = clampNumber(editor.lineAtHeight(info.top, "local"), 0, lineCount - 1, 0);
  const to = clampNumber(editor.lineAtHeight(info.top + info.clientHeight, "local"), from, lineCount - 1, from);
  const top = clampNumber((from / lineCount) * 100, 0, 100, 0);
  const height = clampNumber(((to - from + 1) / lineCount) * 100, 8, 100, 100);
  sourceMinimapViewport.style.top = `${top}%`;
  sourceMinimapViewport.style.height = `${Math.min(height, 100 - top)}%`;
}

function scheduleAutoSave() {
  if (!activeProject || !autoSaveToggle.checked || isLoading || isCompiling) return;
  if (getSourceText() === savedText) return;

  clearTimeout(autoSaveTimer);
  setSaveState("Auto-save pending");
  autoSaveTimer = setTimeout(() => {
    saveManuscript({ auto: true });
  }, 450);
}

let pdfStale = false;

function setPdfStale(stale) {
  pdfStale = Boolean(stale);
  if (!compileButton) return;
  compileButton.classList.toggle("stale", pdfStale);
  compileButton.dataset.tip = pdfStale ? "Compile PDF - out of date" : "Compile PDF - up to date";
}

function scheduleAutoCompile(message) {
  if (!activeProject || !autoCompileToggle.checked || isLoading || isPythonExecutionFile()) return;

  if (isCompiling) {
    pendingCompile = true;
    setCompileState("Compile queued");
    return;
  }

  clearTimeout(autoCompileTimer);
  setCompileState(message);
  autoCompileTimer = setTimeout(() => {
    compileManuscript({ manual: false });
  }, 450);
}

function setMode(mode) {
  if (activeMediaFile) {
    editor.getWrapperElement().hidden = true;
    visualEditor.hidden = true;
    mediaViewer.hidden = false;
    applyMinimapVisibility();
    return;
  }

  const notebook = isIpynbFile();
  const visual = mode === "visual" && !isPythonExecutionFile();
  sourceModeButton.classList.toggle("active", !visual);
  visualModeButton.classList.toggle("active", visual);
  editor.getWrapperElement().hidden = visual || notebook;
  if (ipynbNotebookEditor) ipynbNotebookEditor.hidden = !notebook;
  if (!notebook && ipynbCellEditors.length) destroyIpynbCellEditors();
  mediaViewer.hidden = true;
  visualEditor.hidden = !visual;
  if (sourceMinimap) sourceMinimap.hidden = notebook || !minimapVisible;
  updateVimModeIndicator();
  applyMinimapVisibility();
  updateEditorFileTitle();

  if (notebook) renderIpynbNotebookEditor();
  else if (visual) renderVisualEditor();
  else {
    editor.refresh();
    scheduleSourceMinimapUpdate();
  }
}

function renderVisualEditor() {
  const tex = getSourceText();
  if (isMarkdownFile()) {
    renderMarkdownPreview(tex);
    return;
  }

  visualItems = extractVisualItems(tex);
  visualBlocks = visualItems.filter((item) => item.type === "paragraph");
  visualEditor.innerHTML = "";

  if (!visualItems.length) {
    visualEditor.innerHTML = '<p class="visual-empty">No editable prose blocks found.</p>';
    return;
  }

  const page = document.createElement("article");
  page.className = "visual-page";

  const meta = extractVisualMeta(tex);
  if (meta.title) {
    const title = document.createElement("h1");
    title.className = "visual-title";
    title.textContent = meta.title;
    page.appendChild(title);
  }

  let currentSection = null;

  visualItems.forEach((item) => {
    if (item.type === "section") {
      currentSection = document.createElement("section");
      currentSection.className = "visual-section";
      currentSection.innerHTML = `<h2>${escapeHtml(item.title)}</h2>`;
      page.appendChild(currentSection);
      return;
    }

    if (!currentSection) {
      currentSection = document.createElement("section");
      currentSection.className = "visual-section";
      page.appendChild(currentSection);
    }

    if (item.type === "paragraph") currentSection.appendChild(renderVisualParagraph(item));
    if (item.type === "figure") currentSection.appendChild(renderVisualFigure(item));
    if (item.type === "table") currentSection.appendChild(renderVisualTable(item));
    if (item.type === "equation") currentSection.appendChild(renderVisualEquation(item));
  });

  visualEditor.appendChild(page);
}

function renderMarkdownPreview(markdown) {
  clearTimeout(markdownVisualTimer);
  visualEditor.innerHTML = "";
  const article = document.createElement("article");
  article.className = "markdown-preview markdown-visual-editor";
  article.contentEditable = "true";
  article.spellcheck = spellCheckEnabled;
  article.innerHTML = markdownToHtml(markdown);
  article.addEventListener("input", () => {
    clearTimeout(markdownVisualTimer);
    markdownVisualTimer = setTimeout(() => {
      const nextMarkdown = markdownDomToMarkdown(article);
      if (nextMarkdown === getSourceText()) return;
      suppressSourceChange = true;
      editor.setValue(nextMarkdown);
      suppressSourceChange = false;
      handleSourceChanged({ renderVisual: false });
    }, 180);
  });
  visualEditor.appendChild(article);
}

function markdownDomToMarkdown(root) {
  const blocks = [];

  const inlineText = (node) => String(node.innerText || node.textContent || "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .trimEnd();

  Array.from(root.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = String(node.textContent || "").trim();
      if (text) blocks.push(text);
      return;
    }

    if (!(node instanceof HTMLElement)) return;
    const tag = node.tagName.toLowerCase();
    if (/^h[1-6]$/.test(tag)) {
      const level = Number(tag.slice(1));
      blocks.push(`${"#".repeat(level)} ${inlineText(node).trim()}`);
      return;
    }

    if (tag === "ul" || tag === "ol") {
      const items = Array.from(node.querySelectorAll(":scope > li"))
        .map((item) => `- ${inlineText(item).trim()}`)
        .filter((line) => line !== "- ");
      if (items.length) blocks.push(items.join("\n"));
      return;
    }

    if (tag === "pre") {
      blocks.push(`\`\`\`\n${inlineText(node)}\n\`\`\``);
      return;
    }

    if (tag === "blockquote") {
      const quote = inlineText(node)
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n")
        .trim();
      if (quote) blocks.push(quote);
      return;
    }

    const text = inlineText(node).trim();
    if (text) blocks.push(text);
  });

  return `${blocks.join("\n\n").trimEnd()}\n`;
}

function markdownToHtml(markdown) {
  const lines = String(markdown || "").split("\n");
  const html = [];
  let inCode = false;
  let listOpen = false;

  const closeList = () => {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  };

  lines.forEach((line) => {
    if (line.trim().startsWith("```")) {
      closeList();
      html.push(inCode ? "</code></pre>" : "<pre><code>");
      inCode = !inCode;
      return;
    }

    if (inCode) {
      html.push(escapeHtml(line));
      return;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length, 6);
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      return;
    }

    const list = line.match(/^\s*[-*]\s+(.+)$/);
    if (list) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${inlineMarkdown(list[1])}</li>`);
      return;
    }

    closeList();
    if (!line.trim()) return;
    html.push(`<p>${inlineMarkdown(line)}</p>`);
  });

  closeList();
  if (inCode) html.push("</code></pre>");
  return html.join("\n");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function renderVisualParagraph(block) {
  const paragraph = document.createElement("p");
  paragraph.className = "visual-block";
  paragraph.contentEditable = "plaintext-only";
  paragraph.dataset.blockId = block.id;
  paragraph.spellcheck = true;
  paragraph.textContent = block.visualText;
  paragraph.addEventListener("input", () => applyVisualEdit(block.id, paragraph.innerText));
  return paragraph;
}

function renderVisualFigure(item) {
  const figure = document.createElement("figure");
  figure.className = "visual-figure";

  const imageUrls = assetUrlsFor(item.imagePath);
  if (imageUrls.length) {
    const image = document.createElement("img");
    let imageIndex = 0;
    image.src = imageUrls[imageIndex];
    image.alt = item.caption || item.imagePath;
    image.addEventListener("error", () => {
      imageIndex += 1;
      if (imageUrls[imageIndex]) {
        image.src = imageUrls[imageIndex];
        return;
      }

      image.hidden = true;
      if (!figure.querySelector(".visual-missing-asset")) {
        figure.prepend(visualMissingAsset(`Figure image not found: ${item.imagePath || "unknown path"}`));
      }
    });
    figure.appendChild(image);
  } else if (item.placeholderText) {
    const placeholder = document.createElement("div");
    placeholder.className = "visual-figure-placeholder";
    placeholder.textContent = item.placeholderText;
    figure.appendChild(placeholder);
  } else {
    figure.appendChild(visualMissingAsset(`Figure image not found: ${item.imagePath || "unknown path"}`));
  }

  if (item.caption) {
    const caption = document.createElement("figcaption");
    caption.textContent = item.caption;
    figure.appendChild(caption);
  }

  return figure;
}

function visualMissingAsset(message) {
  const missing = document.createElement("div");
  missing.className = "visual-missing-asset";
  missing.textContent = message;
  return missing;
}

function renderVisualTable(item) {
  const wrapper = document.createElement("figure");
  wrapper.className = "visual-table-figure";

  const table = document.createElement("table");
  table.className = "visual-table";

  item.rows.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    row.forEach((cell, cellIndex) => {
      const node = document.createElement(rowIndex === 0 ? "th" : "td");
      node.textContent = cell;
      node.contentEditable = "plaintext-only";
      node.spellcheck = true;
      node.addEventListener("input", () => {
        item.rows[rowIndex][cellIndex] = node.innerText.trim();
        applyVisualTableEdit(item);
      });
      tr.appendChild(node);
    });
    table.appendChild(tr);
  });

  wrapper.appendChild(table);

  if (item.caption) {
    const caption = document.createElement("figcaption");
    caption.textContent = item.caption;
    wrapper.appendChild(caption);
  }

  return wrapper;
}

function renderVisualEquation(item) {
  const block = document.createElement("pre");
  block.className = "visual-equation";
  block.textContent = latexToVisual(item.raw);
  return block;
}

function assetUrlFor(relativePath) {
  return assetUrlsFor(relativePath)[0] || "";
}

function assetUrlsFor(relativePath) {
  if (!activeProject || !activeProject.rootUrl || !relativePath) return [];
  const paths = candidateAssetPaths(relativePath);
  return paths.map((assetPath) => {
    try {
      return new URL(assetPath.split("/").map(encodeURIComponent).join("/"), activeProject.rootUrl).href;
    } catch (error) {
      return "";
    }
  }).filter(Boolean);
}

function candidateAssetPaths(relativePath) {
  const cleanPath = normalizeLatexAssetPath(relativePath);
  if (!cleanPath) return [];
  const candidates = new Set([cleanPath]);
  const hasExtension = /\.[a-z0-9]+$/i.test(cleanPath);
  if (!hasExtension) {
    ["png", "jpg", "jpeg", "webp", "gif", "svg", "pdf"].forEach((extension) => {
      candidates.add(`${cleanPath}.${extension}`);
    });
  }

  const targetName = cleanPath.split("/").pop().toLowerCase();
  flattenProjectFiles(projectFiles).forEach((node) => {
    if (!node.image || !node.relativePath) return;
    const relative = normalizeLatexAssetPath(node.relativePath);
    const basename = relative.split("/").pop().toLowerCase();
    if (basename === targetName || (!hasExtension && basename.replace(/\.[^.]+$/, "") === targetName)) {
      candidates.add(relative);
    }
  });

  return Array.from(candidates);
}

function flattenProjectFiles(nodes) {
  return (nodes || []).flatMap((node) => {
    if (node.kind === "folder") return flattenProjectFiles(node.children || []);
    return [node];
  });
}

function normalizeLatexAssetPath(value) {
  return String(value || "")
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\/g, "/")
    .replace(/^\.\/+/, "")
    .replace(/^\/+/, "");
}

function applyVisualEdit(blockId, value) {
  const block = visualBlocks.find((item) => item.id === blockId);
  if (!block) return;

  const current = getSourceText();
  const replacement = visualToLatex(value);
  const next = `${current.slice(0, block.start)}${replacement}${current.slice(block.end)}`;
  const delta = replacement.length - (block.end - block.start);

  suppressSourceChange = true;
  setSourceText(next);
  block.end = block.start + replacement.length;

  visualBlocks.forEach((item) => {
    if (item.start > block.start) {
      item.start += delta;
      item.end += delta;
    }
  });

  block.visualText = value;
  handleSourceChanged({ renderVisual: false });
}

function applyVisualTableEdit(item) {
  if (!Number.isFinite(item.start) || !Number.isFinite(item.end) || !item.raw) return;

  const current = getSourceText();
  const updatedTabular = rowsToLatexTableBody(item.rows);
  const replacement = `${item.raw.slice(0, item.bodyStart)}${updatedTabular}${item.raw.slice(item.bodyEnd)}`;
  const next = `${current.slice(0, item.start)}${replacement}${current.slice(item.end)}`;
  const delta = replacement.length - (item.end - item.start);

  suppressSourceChange = true;
  setSourceText(next);
  item.raw = replacement;
  item.bodyEnd += updatedTabular.length - (item.bodyEnd - item.bodyStart);
  item.end = item.start + replacement.length;

  visualItems.forEach((candidate) => {
    if (candidate.start > item.start) {
      candidate.start += delta;
      candidate.end += delta;
    }
  });
  visualBlocks.forEach((candidate) => {
    if (candidate.start > item.start) {
      candidate.start += delta;
      candidate.end += delta;
    }
  });

  handleSourceChanged({ renderVisual: false });
}

function rowsToLatexTableBody(rows) {
  return `\n${rows.map((row) => row.map(visualToLatexCell).join(" & ")).join(" \\\\\n")} \\\\\n`;
}

function visualToLatexCell(value) {
  return visualToLatex(String(value || "").replace(/\n+/g, " ").trim());
}

function extractVisualItems(tex) {
  const items = [];
  const counter = { value: 0 };

  const abstractMatch = tex.match(/\\begin\{abstract\}([\s\S]*?)\\keywords/);
  if (abstractMatch && abstractMatch.index !== undefined) {
    const start = abstractMatch.index + "\\begin{abstract}".length;
    const end = abstractMatch.index + abstractMatch[0].lastIndexOf("\\keywords");
    const raw = tex.slice(start, end).trim();
    if (raw) {
      items.push({ type: "section", title: "Abstract" });
      items.push({
        type: "paragraph",
        id: `block-${counter.value++}`,
        start: start + leadingWhitespaceLength(tex.slice(start, end)),
        end: end - trailingWhitespaceLength(tex.slice(start, end)),
        visualText: latexToVisual(raw)
      });
    }
  }

  const sectionRegex = /\\section\{([^}]+)\}/g;
  const sections = [];
  let match;
  while ((match = sectionRegex.exec(tex))) {
    sections.push({
      title: match[1],
      commandStart: match.index,
      start: match.index + match[0].length,
      end: tex.length
    });
  }
  sections.forEach((section, index) => {
    if (sections[index + 1]) section.end = sections[index + 1].commandStart;
  });

  sections.forEach((section) => {
    const content = tex.slice(section.start, section.end);
    items.push({ type: "section", title: section.title });
    items.push(...extractContentItems(content, section.start, counter));
  });

  return items;
}

function extractContentItems(content, baseOffset, counter) {
  const items = [];
  const environmentRegex = /\\begin\{(figure|table|equation)\}[\s\S]*?\\end\{\1\}/g;
  let cursor = 0;
  let match;

  while ((match = environmentRegex.exec(content))) {
    items.push(...extractParagraphItems(content.slice(cursor, match.index), baseOffset + cursor, counter));
    const raw = match[0];
    if (match[1] === "figure") items.push(parseFigureItem(raw));
    if (match[1] === "table") items.push(parseTableItem(raw, baseOffset + match.index));
    if (match[1] === "equation") items.push({ type: "equation", raw });
    cursor = match.index + raw.length;
  }

  items.push(...extractParagraphItems(content.slice(cursor), baseOffset + cursor, counter));
  return items;
}

function extractParagraphItems(content, baseOffset, counter) {
  const items = [];
  const paragraphRegex = /(^|\n\n)([^\n][\s\S]*?)(?=\n\n|$)/g;
  let paragraph;

  while ((paragraph = paragraphRegex.exec(content))) {
    const raw = paragraph[2].trim();
    if (!isEditableParagraph(raw)) continue;

    const localStart = paragraph.index + paragraph[1].length + leadingWhitespaceLength(paragraph[2]);
    const localEnd = paragraph.index + paragraph[1].length + paragraph[2].length - trailingWhitespaceLength(paragraph[2]);
    items.push({
      type: "paragraph",
      id: `block-${counter.value++}`,
      start: baseOffset + localStart,
      end: baseOffset + localEnd,
      visualText: latexToVisual(raw)
    });
  }

  return items;
}

function parseFigureItem(raw) {
  const includeMatch = raw.match(/\\includegraphics\*?(?:\s*\[[^\]]*\])?\s*\{([^}]+)\}/);
  const placeholderArgs = extractCommandArguments(raw, "figureplaceholder", 2);
  return {
    type: "figure",
    imagePath: includeMatch ? normalizeLatexAssetPath(includeMatch[1]) : "",
    placeholderSize: placeholderArgs[0] || "",
    placeholderText: latexToVisual(placeholderArgs[1] || ""),
    caption: latexToVisual(extractCommandBody(raw, "caption"))
  };
}

function parseTableItem(raw, start) {
  const tabular = extractTabularBody(raw);
  return {
    type: "table",
    start,
    end: start + raw.length,
    raw,
    bodyStart: tabular.bodyStart,
    bodyEnd: tabular.bodyEnd,
    caption: latexToVisual(extractCommandBody(raw, "caption")),
    rows: tabular.body ? parseTabularRows(tabular.body) : []
  };
}

function extractTabularBody(raw) {
  const begin = raw.indexOf("\\begin{tabular}");
  const end = raw.indexOf("\\end{tabular}");
  if (begin === -1 || end === -1 || end <= begin) return { body: "", bodyStart: 0, bodyEnd: 0 };

  const specStart = raw.indexOf("{", begin + "\\begin{tabular}".length);
  if (specStart === -1 || specStart > end) return { body: "", bodyStart: 0, bodyEnd: 0 };

  let depth = 0;
  let cursor = specStart;
  while (cursor < end) {
    const char = raw[cursor];
    const previous = raw[cursor - 1];
    if (char === "{" && previous !== "\\") depth += 1;
    if (char === "}" && previous !== "\\") depth -= 1;
    cursor += 1;
    if (depth === 0) break;
  }

  return {
    body: raw.slice(cursor, end),
    bodyStart: cursor,
    bodyEnd: end
  };
}

function parseTabularRows(raw) {
  const cleaned = raw.replace(/\\(toprule|midrule|bottomrule|hline)\s*/g, "");
  return cleaned
    .split(/\\\\/)
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => row
      .split("&")
      .map((cell) => latexToVisual(cell.trim()))
      .filter(Boolean)
    )
    .filter((row) => row.length);
}

function isEditableParagraph(text) {
  if (!text) return false;
  if (text.startsWith("\\begin{") || text.startsWith("\\end{")) return false;
  if (text.startsWith("\\bibliographystyle") || text.startsWith("\\bibliography")) return false;
  if (text.startsWith("\\caption") || text.startsWith("\\label") || text.startsWith("\\includegraphics")) return false;
  if (text.includes("\\begin{table}") || text.includes("\\begin{figure}") || text.includes("\\begin{equation}")) return false;
  if (text.includes("\\toprule") || text.includes("\\midrule") || text.includes("\\bottomrule")) return false;
  return /[A-Za-z]/.test(text);
}

function latexToVisual(text) {
  return text
    .replace(/\\%/g, "%")
    .replace(/\\&/g, "&")
    .replace(/--/g, "-")
    .replace(/~\\ref\{([^}]+)\}/g, " [ref:$1]")
    .replace(/\\cite\{([^}]+)\}/g, "[$1]")
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\\times/g, "x")
    .replace(/\\[a-zA-Z]+\{([^{}]*)\}/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function visualToLatex(text) {
  return text
    .trim()
    .replace(/%/g, "\\%")
    .replace(/&/g, "\\&")
    .replace(/\[ref:([^\]]+)\]/g, "~\\ref{$1}")
    .replace(/\[((?=[^\]]*[A-Za-z])[A-Za-z0-9_,:-]+)\]/g, "\\cite{$1}");
}

function getSourceText() {
  return editor.getValue();
}

function setSourceText(value) {
  const cursor = editor.getCursor();
  editor.setValue(value);
  editor.setCursor(cursor);
}

function capturePdfViewState() {
  if (!pdfViewer || !pdfViewer.querySelector(".pdf-page")) return null;

  const viewerCenter = pdfViewer.scrollTop + pdfViewer.clientHeight / 2;
  const pages = Array.from(pdfViewer.querySelectorAll(".pdf-page"));
  const centeredPage = pages.find((page) => {
    const top = page.offsetTop;
    return viewerCenter >= top && viewerCenter <= top + page.offsetHeight;
  }) || pages[0];

  if (!centeredPage) return null;
  const pageHeight = Math.max(centeredPage.offsetHeight, 1);
  return {
    page: Number(centeredPage.dataset.page || 1),
    pageRatio: clampNumber((viewerCenter - centeredPage.offsetTop) / pageHeight, 0, 1, 0),
    leftRatio: clampNumber(pdfViewer.scrollLeft / Math.max(1, pdfViewer.scrollWidth - pdfViewer.clientWidth), 0, 1, 0),
    scrollTop: pdfViewer.scrollTop,
    scrollLeft: pdfViewer.scrollLeft
  };
}

function restorePdfViewState(state) {
  if (!state || !pdfViewer) return;
  const page = pdfViewer.querySelector(`.pdf-page[data-page="${state.page}"]`) || pdfViewer.querySelector(".pdf-page");
  if (page) {
    const center = page.offsetTop + page.offsetHeight * clampNumber(state.pageRatio, 0, 1, 0);
    pdfViewer.scrollTop = Math.max(0, center - pdfViewer.clientHeight / 2);
  } else {
    pdfViewer.scrollTop = state.scrollTop || 0;
  }
  const maxLeft = Math.max(0, pdfViewer.scrollWidth - pdfViewer.clientWidth);
  pdfViewer.scrollLeft = maxLeft ? maxLeft * clampNumber(state.leftRatio, 0, 1, 0) : (state.scrollLeft || 0);
}

async function setPdf(options = {}) {
  return renderPdf(options);
}

function pdfSpeechDocumentFingerprint(pdfBuffer) {
  const bytes = pdfBuffer instanceof Uint8Array ? pdfBuffer : new Uint8Array(pdfBuffer);
  let hash = 2166136261;
  const stride = Math.max(1, Math.floor(bytes.length / 4096));
  for (let index = 0; index < bytes.length; index += stride) {
    hash ^= bytes[index];
    hash = Math.imul(hash, 16777619);
  }
  return `${bytes.length}:${(hash >>> 0).toString(16)}`;
}

function clearPdfLazyRenderJobs() {
  if (pdfLazyRenderObserver) pdfLazyRenderObserver.disconnect();
  pdfLazyRenderObserver = null;
  pdfLazyRenderQueue = [];
  pdfLazyRenderActive = false;
}

function setupPdfLazyRenderJobs(jobs, token) {
  if (!jobs.size || token !== pdfRenderToken) return;
  pdfLazyRenderObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const job = jobs.get(entry.target);
      if (!job || entry.target.dataset.canvasRendered === "true") return;
      pdfLazyRenderObserver.unobserve(entry.target);
      pdfLazyRenderQueue.push({ job, token });
    });
    processPdfLazyRenderQueue();
  }, { root: pdfViewer, rootMargin: "1000px 0px", threshold: 0.01 });
  jobs.forEach((_job, pageShell) => pdfLazyRenderObserver.observe(pageShell));
}

async function processPdfLazyRenderQueue() {
  if (pdfLazyRenderActive) return;
  pdfLazyRenderActive = true;
  try {
    while (pdfLazyRenderQueue.length) {
      const next = pdfLazyRenderQueue.shift();
      if (!next || next.token !== pdfRenderToken) continue;
      await next.job();
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  } finally {
    pdfLazyRenderActive = false;
  }
}

async function renderPdf({ showLoading = true, preserveView = false, preserveLogOnError = false } = {}) {
  if (!activeProject || editorScreen.hidden || previewPane.classList.contains("python-output-active")) return false;

  const token = ++pdfRenderToken;
  clearPdfLazyRenderJobs();
  const zoomForRender = pdfZoom;
  const pdfRelativePath = pdfRelativePathForRender();
  const speechDocumentKey = `${activeProject.id || "project"}:${pdfRelativePath || "main.pdf"}`;
  const sameSpeechDocument = pdfSpeechPlan.wordCount > 0 && pdfSpeechPlan.documentKey === speechDocumentKey;
  let speechSessionReset = false;
  let preserveSpeechSession = false;
  let speechFingerprint = "";
  if (!sameSpeechDocument) {
    beginPdfSpeechAnalysis();
    speechSessionReset = true;
  }
  const hasExistingPages = Boolean(pdfViewer.querySelector(".pdf-page"));
  const preservedViewState = preserveView ? capturePdfViewState() : null;
  applyPdfRenderMode();
  if (showLoading || !hasExistingPages) {
    pdfViewer.innerHTML = '<div class="pdf-opening-placeholder" aria-hidden="true"></div>';
  }
  if (!isRemoteProject() && window.localOverleaf.getPdfViewPreview) {
    window.localOverleaf.getPdfViewPreview(activeProject.id, pdfRelativePath)
      .then((result) => showCachedPdfViewPreview(result && result.previewImageUrl, token))
      .catch(() => {});
  }
  if (isRemoteProject()) {
    updatePdfTitleFromSelection();
    pdfMeta.textContent = pdfRelativePath || remoteWorkspace.path || remoteWorkspace.host || "Remote";
  }

  try {
    const remotePdfBuffer = isRemoteProject() ? remotePdfBufferForRender(pdfRelativePath) : null;
    const [pdfjsLib, pdfBuffer] = await Promise.all([
      loadPdfJs(),
      isRemoteProject()
        ? (remotePdfBuffer || window.localOverleaf.readRemotePdf(remoteWorkspace, pdfRelativePath))
        : window.localOverleaf.readPdf(activeProject.id, pdfRelativePath)
    ]);

    if (token !== pdfRenderToken) return;

    const pdfBytes = new Uint8Array(pdfBuffer);
    speechFingerprint = pdfSpeechDocumentFingerprint(pdfBytes);
    preserveSpeechSession = sameSpeechDocument && pdfSpeechPlan.fingerprint === speechFingerprint;
    if (!preserveSpeechSession && !speechSessionReset) {
      beginPdfSpeechAnalysis();
      speechSessionReset = true;
    }
    const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
    const pdf = await loadingTask.promise;
    if (token !== pdfRenderToken) return;

    const fragment = document.createDocumentFragment();
    const progressiveRender = !preservedViewState && (showLoading || !hasExistingPages);
    updatePdfTitleFromSelection();
    pdfMeta.textContent = `${pdf.numPages} ${pdf.numPages === 1 ? "page" : "pages"}`;
    const nextPageTextLines = new Map();
    const renderedPageCanvases = new Map();
    const lazyPageRenderJobs = new Map();

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      if (token !== pdfRenderToken) return;

      const page = await pdf.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const fitScale = pdfFitScaleForPage(baseViewport.width);
      const baseScale = Math.min(PDF_BASE_RENDER_SCALE, fitScale);
      const scale = Math.min(MAX_PDF_RENDER_SCALE, baseScale * zoomForRender);
      const viewport = page.getViewport({ scale });
      const outputScale = pdfCanvasOutputScale("page", pdf.numPages);

      const pageShell = document.createElement("div");
      pageShell.className = "pdf-page";
      pageShell.dataset.page = `${pageNumber}`;
      pageShell.dataset.renderedWidth = `${Math.floor(viewport.width)}`;
      pageShell.dataset.renderedHeight = `${Math.floor(viewport.height)}`;
      pageShell.style.width = `${Math.floor(viewport.width)}px`;
      pageShell.style.height = `${Math.floor(viewport.height)}px`;

      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      canvas.dataset.renderedWidth = `${Math.floor(viewport.width)}`;
      canvas.dataset.renderedHeight = `${Math.floor(viewport.height)}`;
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const textContent = await page.getTextContent();
      nextPageTextLines.set(pageNumber, buildPdfTextLines(textContent, viewport, pdfjsLib, pageNumber));
      pageShell.addEventListener("click", (event) => jumpToSourceFromPdfClick(event, pageNumber));

      pageShell.appendChild(canvas);
      if (pageNumber <= 2) {
        const textLayer = await buildPdfTextLayer(textContent, viewport, pdfjsLib, pageNumber);
        const annotations = await page.getAnnotations({ intent: "display" });
        const linkLayer = buildPdfLinkLayer(annotations, viewport);
        pageShell.appendChild(textLayer);
        if (linkLayer) pageShell.appendChild(linkLayer);
        pageShell.dataset.textLayerRendered = "true";
      } else {
        pageShell.dataset.textLayerRendered = "false";
      }
      fragment.appendChild(pageShell);
      const renderPageCanvas = async (pageToRender) => {
        if (token !== pdfRenderToken || pageShell.dataset.canvasRendered === "true") return;
        pageShell.dataset.canvasRendered = "loading";
        const imageBoxes = pdfDarkMode && pdfRenderMode === "adaptive"
          ? await pdfImageBoxesForPage(pageToRender, viewport, pdfjsLib, outputScale)
          : [];
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        const context = canvas.getContext("2d");
        context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
        preparePdfCanvasForRender(context, canvas);
        await pageToRender.render({ canvasContext: context, viewport, background: "#ffffff" }).promise;
        if (token !== pdfRenderToken) return;
        if (pageNumber === 1) {
          cacheActiveProjectPreview(canvas);
          cachePdfViewPreview(canvas, pdfRelativePath, speechFingerprint);
        }
        applyPdfCanvasRenderMode(context, canvas, imageBoxes);
        pageShell.dataset.canvasRendered = "true";
      };
      if (pageNumber <= 2) {
        await renderPageCanvas(page);
        renderedPageCanvases.set(pageNumber, canvas);
        page.cleanup();
      } else {
        page.cleanup();
        lazyPageRenderJobs.set(pageShell, async () => {
          if (token !== pdfRenderToken || pageShell.dataset.canvasRendered === "true") return;
          const lazyPage = await pdf.getPage(pageNumber);
          try {
            const lazyTextContent = await lazyPage.getTextContent();
            if (token !== pdfRenderToken) return;
            const textLayer = await buildPdfTextLayer(lazyTextContent, viewport, pdfjsLib, pageNumber);
            const annotations = await lazyPage.getAnnotations({ intent: "display" });
            if (token !== pdfRenderToken) return;
            const linkLayer = buildPdfLinkLayer(annotations, viewport);
            pageShell.appendChild(textLayer);
            if (linkLayer) pageShell.appendChild(linkLayer);
            pageShell.dataset.textLayerRendered = "true";
            await renderPageCanvas(lazyPage);
          } finally {
            lazyPage.cleanup();
          }
          const activeChunk = pdfSpeechPlan.chunks[pdfSpeechChunkIndex];
          const activeWord = activeChunk && (activeChunk.words[pdfSpeechWordIndex] || activeChunk.words[0]);
          if ((pdfSpeechPlaying || pdfSpeechPaused) && activeWord && activeWord.pageNumber === pageNumber) {
            highlightPdfSpeechWord(activeWord);
          }
        });
      }
      if (progressiveRender) {
        // Show the first page immediately; stream the rest in so opening a
        // project feels instant instead of waiting on the full document.
        if (pageNumber === 1) {
          pdfViewer.replaceChildren(fragment);
        } else {
          pdfViewer.appendChild(pageShell);
        }
        pdfPageTextLines = nextPageTextLines;
        renderedPdfPageCount = pdf.numPages;
        renderedPdfZoom = zoomForRender;
        updatePdfPageIndicator();
        await new Promise((resolve) => setTimeout(resolve, 0));
        if (token !== pdfRenderToken) return;
      }
    }

    if (token !== pdfRenderToken) return;
    const preserveScroll = !showLoading && hasExistingPages && !preservedViewState;
    const scrollLeft = pdfViewer.scrollLeft;
    const scrollTop = pdfViewer.scrollTop;
    pdfPageTextLines = nextPageTextLines;
    renderedPdfPageCount = pdf.numPages;
    renderedPdfZoom = zoomForRender;
    if (!progressiveRender) {
      pdfViewer.replaceChildren(fragment);
      if (preservedViewState) {
        restorePdfViewState(preservedViewState);
      } else if (preserveScroll) {
        pdfViewer.scrollLeft = scrollLeft;
        pdfViewer.scrollTop = scrollTop;
      }
    }
    // PDF.js keeps decoded fonts, image masks, and page operator resources after
    // text extraction. Release those now; nearby lazy jobs can request them
    // again when a page actually enters the viewport.
    await pdf.cleanup();
    if (pdfZoom !== zoomForRender) applyPdfLiveZoom();
    setupPdfLazyRenderJobs(lazyPageRenderJobs, token);
    updatePdfPageIndicator();
    if (preserveSpeechSession) {
      refreshPdfSpeechGeometry(nextPageTextLines);
      const activeChunk = pdfSpeechPlan.chunks[pdfSpeechChunkIndex];
      if ((pdfSpeechPlaying || pdfSpeechPaused) && activeChunk) {
        highlightPdfSpeechWord(activeChunk.words[pdfSpeechWordIndex] || activeChunk.words[0]);
      } else {
        clearPdfSpeechHighlight();
      }
    } else {
      preparePdfSpeechPlan(nextPageTextLines, pdf.numPages, speechDocumentKey, speechFingerprint);
    }
    await renderPdfThumbnails(pdf, pdfjsLib, token, renderedPageCanvases);
    return true;
  } catch (error) {
    if (token !== pdfRenderToken) return false;
    const showingPresentation = /\.pptx?$/i.test(pdfRelativePath || "");
    pdfViewer.innerHTML = isRemoteProject()
      ? `<div class="pdf-loading pdf-error">Could not render ${escapeHtml(activePdfName())}. Click Compile PDF to generate it locally or choose another PDF from the title.</div>`
      : showingPresentation
        ? `<div class="pdf-loading pdf-error">Could not render ${escapeHtml(activePdfName())}. PowerPoint preview requires LibreOffice; see Log for details.</div>`
        : '<div class="pdf-loading pdf-error">Could not render PDF. Openleaf tried compiling the TeX entry; see Log for details.</div>';
    pdfMeta.textContent = isRemoteProject() ? (pdfRelativePath || "Remote PDF unavailable") : pdfMeta.textContent;
    if (!sameSpeechDocument) resetPdfSpeechPlan("No readable PDF");
    if (!preserveLogOnError) compileLog.textContent = formatError(error);
    return false;
  }
}

async function renderPdfThumbnails(pdf, pdfjsLib, token, renderedPageCanvases = new Map()) {
  if (!pdfThumbnailList) return;
  if (!pdfSidebarVisible) {
    pdfThumbnailList.innerHTML = "";
    return;
  }

  pdfThumbnailList.innerHTML = "";
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    if (token !== pdfRenderToken) return;
    const sourceCanvas = renderedPageCanvases.get(pageNumber);
    if (sourceCanvas) {
      appendPdfThumbnailFromSource(pageNumber, sourceCanvas);
      continue;
    }

    const page = await pdf.getPage(pageNumber);
    const baseViewport = page.getViewport({ scale: 1 });
    const targetWidth = pdfThumbnailTargetWidth();
    const scale = targetWidth / baseViewport.width;
    const viewport = page.getViewport({ scale });
    const outputScale = pdfCanvasOutputScale("thumbnail", pdf.numPages);
    const button = document.createElement("button");
    button.className = "pdf-thumbnail";
    button.type = "button";
    button.dataset.page = String(pageNumber);
    button.setAttribute("aria-label", `Page ${pageNumber}`);

    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;
    const context = canvas.getContext("2d");
    context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
    preparePdfCanvasForRender(context, canvas);
    button.prepend(canvas);
    button.addEventListener("click", () => {
      const pageEl = pdfViewer.querySelector(`.pdf-page[data-page="${pageNumber}"]`);
      if (pageEl) pdfViewer.scrollTo({ top: pageEl.offsetTop - 12, behavior: "smooth" });
    });
    pdfThumbnailList.appendChild(button);
    await page.render({ canvasContext: context, viewport, background: "#ffffff" }).promise;
    applyPdfPreviewCanvasRenderMode(context, canvas);
    page.cleanup();
  }
  updatePdfPageIndicator();
}

function appendPdfThumbnailFromSource(pageNumber, sourceCanvas) {
  const sourceWidth = Number(sourceCanvas.dataset.renderedWidth) || sourceCanvas.width;
  const sourceHeight = Number(sourceCanvas.dataset.renderedHeight) || sourceCanvas.height;
  if (!sourceWidth || !sourceHeight) return;

  const targetWidth = pdfThumbnailTargetWidth();
  const targetHeight = targetWidth * (sourceHeight / sourceWidth);
  const outputScale = pdfCanvasOutputScale("thumbnail");
  const button = document.createElement("button");
  button.className = "pdf-thumbnail";
  button.type = "button";
  button.dataset.page = String(pageNumber);
  button.setAttribute("aria-label", `Page ${pageNumber}`);

  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(targetWidth * outputScale);
  canvas.height = Math.floor(targetHeight * outputScale);
  canvas.style.width = `${Math.floor(targetWidth)}px`;
  canvas.style.height = `${Math.floor(targetHeight)}px`;
  canvas.classList.toggle("pdf-canvas-dark-adaptive", sourceCanvas.classList.contains("pdf-canvas-dark-adaptive"));
  canvas.classList.toggle("pdf-canvas-dark-filter", sourceCanvas.classList.contains("pdf-canvas-dark-filter"));

  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  preparePdfCanvasForRender(context, canvas);
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.drawImage(sourceCanvas, 0, 0, canvas.width, canvas.height);
  applyPdfPreviewCanvasRenderMode(context, canvas, { sourceCanvas });
  mirrorPdfCanvasDisplayStyle(sourceCanvas, canvas);

  button.prepend(canvas);
  button.addEventListener("click", () => {
    const pageEl = pdfViewer.querySelector(`.pdf-page[data-page="${pageNumber}"]`);
    if (pageEl) pdfViewer.scrollTo({ top: pageEl.offsetTop - 12, behavior: "smooth" });
  });
  pdfThumbnailList.appendChild(button);
}

function mirrorPdfCanvasDisplayStyle(sourceCanvas, targetCanvas) {
  if (!sourceCanvas || !targetCanvas || !sourceCanvas.isConnected) return;
  const sourceStyle = getComputedStyle(sourceCanvas);
  targetCanvas.style.setProperty("background-color", sourceStyle.backgroundColor || "transparent", "important");
  targetCanvas.style.setProperty("filter", sourceStyle.filter && sourceStyle.filter !== "none" ? sourceStyle.filter : "none", "important");
}

function applyPdfPreviewCanvasRenderMode(context, canvas, { sourceCanvas = null } = {}) {
  canvas.classList.remove("pdf-canvas-dark-adaptive", "pdf-canvas-dark-filter");
  if (sourceCanvas) {
    if (sourceCanvas.classList.contains("pdf-canvas-dark-filter")) {
      canvas.classList.add("pdf-canvas-dark-filter");
      return;
    }
    if (sourceCanvas.classList.contains("pdf-canvas-dark-adaptive")) {
      canvas.classList.add("pdf-canvas-dark-adaptive");
      return;
    }
  }

  if (!pdfDarkMode || pdfRenderMode === "original") return;

  if (pdfRenderMode === "invert") {
    canvas.classList.add("pdf-canvas-dark-filter");
    return;
  }

  if (!sourceCanvas || !sourceCanvas.classList.contains("pdf-canvas-dark-adaptive")) {
    applyDarkPdfCanvas(context, canvas);
  }
  canvas.classList.add("pdf-canvas-dark-adaptive");
  normalizePdfThumbnailDarkPreview(context, canvas);
}

function normalizePdfThumbnailDarkPreview(context, canvas) {
  if (!pdfDarkMode || pdfRenderMode !== "adaptive") return;

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const paper = cssColorToRgb(themeColor("--pdf-dark-paper", "#111827"), { r: 17, g: 24, b: 39 });
  const paperLuminance = 0.2126 * paper.r + 0.7152 * paper.g + 0.0722 * paper.b;

  for (let index = 0; index < data.length; index += 4) {
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const saturation = max === 0 ? 0 : chroma / max;
    if (saturation > 0.22 || luminance >= paperLuminance + 8) continue;

    const amount = clampNumber((paperLuminance + 22 - luminance) / (paperLuminance + 22), 0, 0.86, 0);
    data[index] = Math.round(r + (paper.r - r) * amount);
    data[index + 1] = Math.round(g + (paper.g - g) * amount);
    data[index + 2] = Math.round(b + (paper.b - b) * amount);
  }

  context.putImageData(imageData, 0, 0);
}

function pdfFitScaleForPage(pageWidth) {
  const fallback = Math.min(MAX_PDF_RENDER_SCALE, PDF_BASE_RENDER_SCALE);
  if (!pdfViewer || !pageWidth) return fallback;

  const style = getComputedStyle(pdfViewer);
  const paddingLeft = Number.parseFloat(style.paddingLeft) || 0;
  const paddingRight = Number.parseFloat(style.paddingRight) || 0;
  const availableWidth = Math.max(220, pdfViewer.clientWidth - paddingLeft - paddingRight - 64);
  return clampNumber(availableWidth / pageWidth, 0.25, MAX_PDF_RENDER_SCALE, fallback);
}

function pdfThumbnailTargetWidth() {
  const sidebarWidth = pdfSidebar ? pdfSidebar.clientWidth : 0;
  return Math.round(clampNumber(sidebarWidth - 40, 72, 124, 100));
}

function pdfCanvasOutputScale(kind = "page", pageCount = renderedPdfPageCount) {
  const deviceScale = window.devicePixelRatio || 1;
  const longDocument = Number(pageCount) >= 12;
  const minimum = kind === "thumbnail" ? 1.35 : (longDocument ? 1.35 : 1.75);
  const maximum = kind === "thumbnail" ? 2 : (longDocument ? 1.6 : 2.25);
  return clampNumber(Math.max(deviceScale, minimum), 1, maximum, minimum);
}

function preparePdfCanvasForRender(context, canvas) {
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.globalCompositeOperation = "source-over";
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();
}

async function pdfImageBoxesForPage(page, viewport, pdfjsLib, outputScale = 1) {
  try {
    const operatorList = await page.getOperatorList();
    const ops = pdfjsLib.OPS || {};
    const imageOps = new Set([
      ops.paintImageXObject,
      ops.paintInlineImageXObject
    ].filter(Number.isFinite));
    const stack = [];
    const canvasWidth = viewport.width * outputScale;
    const canvasHeight = viewport.height * outputScale;
    let matrix = Array.from(viewport.transform || [1, 0, 0, 1, 0, 0]);

    const multiply = (left, right) => [
      left[0] * right[0] + left[2] * right[1],
      left[1] * right[0] + left[3] * right[1],
      left[0] * right[2] + left[2] * right[3],
      left[1] * right[2] + left[3] * right[3],
      left[0] * right[4] + left[2] * right[5] + left[4],
      left[1] * right[4] + left[3] * right[5] + left[5]
    ];
    const transformPoint = (transform, x, y) => ({
      x: transform[0] * x + transform[2] * y + transform[4],
      y: transform[1] * x + transform[3] * y + transform[5]
    });
    const boxes = [];

    operatorList.fnArray.forEach((operator, index) => {
      if (operator === ops.save) {
        stack.push([...matrix]);
        return;
      }
      if (operator === ops.restore) {
        matrix = stack.pop() || matrix;
        return;
      }
      if (operator === ops.transform) {
        const next = Array.from(operatorList.argsArray[index] || []).slice(0, 6).map(Number);
        if (next.length === 6 && next.every(Number.isFinite)) matrix = multiply(matrix, next);
        return;
      }
      if (!imageOps.has(operator)) return;

      const corners = [
        transformPoint(matrix, 0, 0),
        transformPoint(matrix, 1, 0),
        transformPoint(matrix, 0, 1),
        transformPoint(matrix, 1, 1)
      ];
      const xs = corners.map((point) => point.x * outputScale);
      const ys = corners.map((point) => point.y * outputScale);
      const box = {
        left: Math.max(0, Math.min(...xs)),
        top: Math.max(0, Math.min(...ys)),
        right: Math.min(canvasWidth, Math.max(...xs)),
        bottom: Math.min(canvasHeight, Math.max(...ys))
      };
      if (box.right - box.left >= 12 && box.bottom - box.top >= 12) boxes.push(box);
    });

    return boxes;
  } catch (error) {
    return [];
  }
}

function applyPdfCanvasRenderMode(context, canvas, imageBoxes = []) {
  canvas.classList.remove("pdf-canvas-dark-adaptive", "pdf-canvas-dark-filter");
  if (!pdfDarkMode) return;

  if (pdfRenderMode === "adaptive") {
    applyDarkPdfCanvas(context, canvas, imageBoxes);
    canvas.classList.add("pdf-canvas-dark-adaptive");
    return;
  }

  canvas.classList.add("pdf-canvas-dark-filter");
}

function buildPdfLinkLayer(annotations, viewport) {
  const links = annotations
    .map((annotation) => ({
      rect: Array.isArray(annotation.rect) ? annotation.rect : null,
      url: normalizePdfLinkUrl(annotation.url || annotation.unsafeUrl)
    }))
    .filter((link) => link.rect && link.url);

  if (!links.length) return null;

  const layer = document.createElement("div");
  layer.className = "pdf-link-layer";
  layer.style.width = `${Math.floor(viewport.width)}px`;
  layer.style.height = `${Math.floor(viewport.height)}px`;

  links.forEach((link) => {
    const rect = viewport.convertToViewportRectangle(link.rect);
    const left = Math.min(rect[0], rect[2]);
    const top = Math.min(rect[1], rect[3]);
    const width = Math.abs(rect[0] - rect[2]);
    const height = Math.abs(rect[1] - rect[3]);
    if (width <= 0 || height <= 0) return;

    const button = document.createElement("button");
    button.className = "pdf-link-region";
    button.type = "button";
    button.title = link.url;
    button.setAttribute("aria-label", `Open ${link.url}`);
    button.style.left = `${left}px`;
    button.style.top = `${top}px`;
    button.style.width = `${width}px`;
    button.style.height = `${height}px`;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openPdfLink(link.url);
    });
    layer.appendChild(button);
  });

  return layer.childElementCount ? layer : null;
}

function normalizePdfLinkUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";

  try {
    const url = new URL(raw);
    if (!["http:", "https:", "mailto:"].includes(url.protocol)) return "";
    return url.toString();
  } catch (error) {
    return "";
  }
}

async function openPdfLink(url) {
  const confirmed = window.confirm(`Do you want to go to ${url}?`);
  if (!confirmed) return;

  try {
    await window.localOverleaf.openExternalLink(url);
  } catch (error) {
    setCompileState(formatError(error), "error");
  }
}

function applyDarkPdfCanvas(context, canvas, imageBoxes = []) {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const basePaper = cssColorToRgb(themeColor("--pdf-dark-paper", "#111827"), { r: 17, g: 24, b: 39 });
  const baseText = cssColorToRgb(themeColor("--text", "#f8fafc"), { r: 248, g: 250, b: 252 });
  const paper = basePaper;
  const text = mixRgb(baseText, { r: 255, g: 255, b: 255 }, 0.18);

  for (let index = 0; index < data.length; index += 4) {
    const pixel = index / 4;
    const x = pixel % canvas.width;
    const y = Math.floor(pixel / canvas.width);
    if (pointInBoxes(x, y, imageBoxes)) continue;

    const alpha = data[index + 3] / 255;
    let r = data[index];
    let g = data[index + 1];
    let b = data[index + 2];
    if (alpha < 1) {
      r = Math.round(r * alpha + 255 * (1 - alpha));
      g = Math.round(g * alpha + 255 * (1 - alpha));
      b = Math.round(b * alpha + 255 * (1 - alpha));
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = 255;
    }

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const saturation = max === 0 ? 0 : chroma / max;
    const neutral = saturation < 0.18 || chroma < 24;

    if (!neutral && luminance < 242) continue;

    const mix = Math.pow(clampNumber(luminance / 255, 0, 1, 1), 1.42);
    data[index] = Math.round(text.r + (paper.r - text.r) * mix);
    data[index + 1] = Math.round(text.g + (paper.g - text.g) * mix);
    data[index + 2] = Math.round(text.b + (paper.b - text.b) * mix);
  }

  context.putImageData(imageData, 0, 0);
}

function detectPdfImageBoxes(data, width, height) {
  const cellSize = 24;
  const cols = Math.ceil(width / cellSize);
  const rows = Math.ceil(height / cellSize);
  const cells = new Uint8Array(cols * rows);
  const sampleStep = 3;

  for (let cellY = 0; cellY < rows; cellY += 1) {
    for (let cellX = 0; cellX < cols; cellX += 1) {
      const left = cellX * cellSize;
      const top = cellY * cellSize;
      const right = Math.min(width, left + cellSize);
      const bottom = Math.min(height, top + cellSize);
      let samples = 0;
      let nonPaper = 0;
      let midtones = 0;
      let colorful = 0;
      let edges = 0;
      let minimum = 255;
      let maximum = 0;

      for (let y = top; y < bottom; y += sampleStep) {
        let previousLuminance = null;
        for (let x = left; x < right; x += sampleStep) {
          const index = (y * width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          const saturation = max === 0 ? 0 : (max - min) / max;
          samples += 1;
          if (luminance < 246) nonPaper += 1;
          if (luminance > 22 && luminance < 236) midtones += 1;
          if (saturation > 0.16 && max - min > 18) colorful += 1;
          if (previousLuminance !== null && Math.abs(luminance - previousLuminance) > 11) edges += 1;
          previousLuminance = luminance;
          minimum = Math.min(minimum, luminance);
          maximum = Math.max(maximum, luminance);
        }
      }

      const occupancy = nonPaper / Math.max(1, samples);
      const midtoneRatio = midtones / Math.max(1, samples);
      const colorRatio = colorful / Math.max(1, samples);
      const edgeRatio = edges / Math.max(1, samples);
      const photographic = occupancy > 0.36
        && maximum - minimum > 42
        && midtoneRatio > 0.28
        && (edgeRatio > 0.04 || midtoneRatio > 0.5);
      const illustrated = occupancy > 0.24 && colorRatio > 0.12 && maximum - minimum > 28;
      if (photographic || illustrated) cells[cellY * cols + cellX] = 1;
    }
  }

  const joined = cells.slice();
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const index = y * cols + x;
      if (cells[index]) continue;
      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          if (!dx && !dy) continue;
          const nextX = x + dx;
          const nextY = y + dy;
          if (nextX < 0 || nextY < 0 || nextX >= cols || nextY >= rows) continue;
          neighbors += cells[nextY * cols + nextX] ? 1 : 0;
        }
      }
      if (neighbors >= 3) joined[index] = 1;
    }
  }

  // Find actual 2D textured regions before joining anything. Text lines are
  // long, shallow components; photographs and figures occupy substantial area
  // in both dimensions. Filtering here prevents titles and captions from being
  // absorbed into a nearby image rectangle.
  const candidates = [];
  const visited = new Uint8Array(joined.length);
  const stack = [];
  for (let cell = 0; cell < joined.length; cell += 1) {
    if (!joined[cell] || visited[cell]) continue;
    let minX = cols;
    let minY = rows;
    let maxX = 0;
    let maxY = 0;
    let count = 0;
    stack.push(cell);
    visited[cell] = 1;
    while (stack.length) {
      const current = stack.pop();
      const x = current % cols;
      const y = Math.floor(current / cols);
      if (cells[current]) {
        count += 1;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          if (!dx && !dy) continue;
          const nextX = x + dx;
          const nextY = y + dy;
          if (nextX < 0 || nextY < 0 || nextX >= cols || nextY >= rows) continue;
          const next = nextY * cols + nextX;
          if (!joined[next] || visited[next]) continue;
          visited[next] = 1;
          stack.push(next);
        }
      }
    }
    const boxWidth = (maxX - minX + 1) * cellSize;
    const boxHeight = (maxY - minY + 1) * cellSize;
    const aspectRatio = boxWidth / Math.max(1, boxHeight);
    if (count < 10 || boxWidth < 84 || boxHeight < 96 || aspectRatio > 6) continue;
    const pad = 0;
    candidates.push({
      left: Math.max(0, minX * cellSize - pad),
      top: Math.max(0, minY * cellSize - pad),
      right: Math.min(width, (maxX + 1) * cellSize + pad),
      bottom: Math.min(height, (maxY + 1) * cellSize + pad)
    });
  }

  if (candidates.length < 2) return candidates;
  const parents = candidates.map((_box, index) => index);
  const find = (index) => {
    let root = index;
    while (parents[root] !== root) root = parents[root];
    while (parents[index] !== index) {
      const next = parents[index];
      parents[index] = root;
      index = next;
    }
    return root;
  };
  const join = (left, right) => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot !== rightRoot) parents[rightRoot] = leftRoot;
  };
  const mergeGap = cellSize * 4;
  candidates.forEach((left, leftIndex) => {
    candidates.slice(leftIndex + 1).forEach((right, offset) => {
      const rightIndex = leftIndex + offset + 1;
      const horizontalGap = Math.max(0, Math.max(left.left, right.left) - Math.min(left.right, right.right));
      const verticalGap = Math.max(0, Math.max(left.top, right.top) - Math.min(left.bottom, right.bottom));
      const horizontalOverlap = Math.max(0, Math.min(left.right, right.right) - Math.max(left.left, right.left));
      const verticalOverlap = Math.max(0, Math.min(left.bottom, right.bottom) - Math.max(left.top, right.top));
      const aligned = horizontalOverlap >= Math.min(left.right - left.left, right.right - right.left) * 0.2
        || verticalOverlap >= Math.min(left.bottom - left.top, right.bottom - right.top) * 0.2;
      if (aligned && horizontalGap <= mergeGap && verticalGap <= mergeGap) join(leftIndex, rightIndex);
    });
  });

  const merged = new Map();
  candidates.forEach((box, index) => {
    const root = find(index);
    const current = merged.get(root);
    merged.set(root, current ? {
      left: Math.min(current.left, box.left),
      top: Math.min(current.top, box.top),
      right: Math.max(current.right, box.right),
      bottom: Math.max(current.bottom, box.bottom)
    } : box);
  });
  return Array.from(merged.values());
}

function mixRgb(from, to, amount) {
  const ratio = clampNumber(amount, 0, 1, 0);
  return {
    r: Math.round(from.r + (to.r - from.r) * ratio),
    g: Math.round(from.g + (to.g - from.g) * ratio),
    b: Math.round(from.b + (to.b - from.b) * ratio)
  };
}

function detectPdfFigureBoxes(data, width, height) {
  const cellSize = 14;
  const cols = Math.ceil(width / cellSize);
  const rows = Math.ceil(height / cellSize);
  const cells = new Uint8Array(cols * rows);

  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const saturation = max === 0 ? 0 : (max - min) / max;

      if (saturation > 0.24 && luminance > 28 && luminance < 248) {
        const cellX = Math.floor(x / cellSize);
        const cellY = Math.floor(y / cellSize);
        cells[cellY * cols + cellX] = 1;
      }
    }
  }

  const boxes = [];
  const visited = new Uint8Array(cells.length);
  const stack = [];

  for (let cell = 0; cell < cells.length; cell += 1) {
    if (!cells[cell] || visited[cell]) continue;

    let minX = cols;
    let minY = rows;
    let maxX = 0;
    let maxY = 0;
    let count = 0;
    stack.push(cell);
    visited[cell] = 1;

    while (stack.length) {
      const current = stack.pop();
      const x = current % cols;
      const y = Math.floor(current / cols);
      count += 1;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);

      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
        const nextX = x + dx;
        const nextY = y + dy;
        if (nextX < 0 || nextY < 0 || nextX >= cols || nextY >= rows) return;
        const next = nextY * cols + nextX;
        if (!cells[next] || visited[next]) return;
        visited[next] = 1;
        stack.push(next);
      });
    }

    const boxWidth = (maxX - minX + 1) * cellSize;
    const boxHeight = (maxY - minY + 1) * cellSize;
    if (count >= 10 && boxWidth >= 48 && boxHeight >= 38) {
      const pad = 36;
      boxes.push({
        left: Math.max(0, minX * cellSize - pad),
        top: Math.max(0, minY * cellSize - pad),
        right: Math.min(width, (maxX + 1) * cellSize + pad),
        bottom: Math.min(height, (maxY + 1) * cellSize + pad)
      });
    }
  }

  return boxes;
}

function pointInBoxes(x, y, boxes) {
  return boxes.some((box) => x >= box.left && x <= box.right && y >= box.top && y <= box.bottom);
}

function cssColorToRgb(value, fallback) {
  const color = String(value || "").trim();
  const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const raw = hex[1].length === 3
      ? hex[1].split("").map((char) => `${char}${char}`).join("")
      : hex[1];
    const number = Number.parseInt(raw, 16);
    return {
      r: (number >> 16) & 255,
      g: (number >> 8) & 255,
      b: number & 255
    };
  }

  const rgb = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
  if (rgb) {
    return {
      r: clampNumber(Number(rgb[1]), 0, 255, fallback.r),
      g: clampNumber(Number(rgb[2]), 0, 255, fallback.g),
      b: clampNumber(Number(rgb[3]), 0, 255, fallback.b)
    };
  }

  return fallback;
}

function loadPdfJs() {
  if (!pdfJsPromise) {
    pdfJsPromise = import("./node_modules/pdfjs-dist/build/pdf.mjs").then((pdfjsLib) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = "./node_modules/pdfjs-dist/build/pdf.worker.mjs";
      return pdfjsLib;
    });
  }

  return pdfJsPromise;
}

// Local neural PDF reader powered by Kokoro/MLX.
function beginPdfSpeechAnalysis() {
  stopPdfSpeech({ resetCursor: true, updateStatus: false });
  pdfSpeechFirstChunkReady = false;
  pdfSpeechPreparedCount = 0;
  pdfSpeechPreprocessActive = false;
  pdfSpeechBackgroundPreloadActive = false;
  pdfSpeechPlanRevision += 1;
  pdfSpeechPlan = { chunks: [], wordCount: 0, pageCount: 0, documentKey: "", fingerprint: "" };
  pdfSpeechChunkDurations = [];
  pdfSpeechWordMetadata = new Map();
  pdfSpeechAutoFollow = true;
  updatePdfSpeechProgress();
  if (pdfSpeechButton) pdfSpeechButton.disabled = true;
  setPdfSpeechStatus("Analyzing PDF…", "analyzing");
}

function resetPdfSpeechPlan(message = "Waiting for PDF") {
  stopPdfSpeech({ resetCursor: true, updateStatus: false });
  pdfSpeechFirstChunkReady = false;
  pdfSpeechPreparedCount = 0;
  pdfSpeechPreprocessActive = false;
  pdfSpeechBackgroundPreloadActive = false;
  pdfSpeechPlanRevision += 1;
  pdfSpeechPlan = { chunks: [], wordCount: 0, pageCount: 0, documentKey: "", fingerprint: "" };
  pdfSpeechChunkDurations = [];
  pdfSpeechWordMetadata = new Map();
  updatePdfSpeechProgress();
  if (pdfSpeechButton) pdfSpeechButton.disabled = true;
  setPdfSpeechStatus(message);
}

function preparePdfSpeechPlan(pageLines, pageCount, documentKey = "", fingerprint = "") {
  const words = [];
  const pageWordIndexes = new Map();
  const recurringNonContent = pdfSpeechRecurringNonContent(pageLines);
  Array.from(pageLines.entries())
    .sort((left, right) => left[0] - right[0])
    .forEach(([pageNumber, lines]) => {
      let previousLineWord = null;
      const pageMetrics = pdfSpeechPageMetrics(lines);
      lines.forEach((line, lineIndex) => {
        if (isPdfSpeechNonContentLine(line, lineIndex, lines.length, { pageMetrics, recurringNonContent })) return;
        const sourceWords = line.words || [];
        const lineWords = sourceWords.map((word) => {
          const spokenText = normalizePdfSpeechToken(word.text);
          if (!spokenText) return null;
          const pageWordIndex = pageWordIndexes.get(pageNumber) || 0;
          pageWordIndexes.set(pageNumber, pageWordIndex + 1);
          return { ...word, pageNumber, pageWordIndex, spokenText, joinsNext: false };
        }).filter(Boolean);
        if (
          previousLineWord
          && lineWords[0]
          && /[\p{L}\p{M}][\-‐‑‒–—]$/u.test(previousLineWord.spokenText)
          && /^[\p{L}\p{M}]/u.test(lineWords[0].spokenText)
        ) {
          previousLineWord.joinsNext = true;
        }
        words.push(...lineWords);
        previousLineWord = lineWords[lineWords.length - 1] || previousLineWord;
      });
    });
  const chunks = buildPdfSpeechChunks(words);
  pdfSpeechPlan = {
    chunks,
    wordCount: words.length,
    pageCount: Number(pageCount) || pageLines.size,
    documentKey,
    fingerprint
  };
  pdfSpeechChunkDurations = new Array(pdfSpeechPlan.chunks.length).fill(0);
  rebuildPdfSpeechWordMetadata();
  pdfSpeechChunkIndex = 0;
  pdfSpeechWordIndex = 0;
  pdfSpeechFirstChunkReady = false;
  pdfSpeechPreparedCount = 0;
  pdfSpeechPreprocessActive = false;
  pdfSpeechBackgroundPreloadActive = false;
  pdfSpeechPlanRevision += 1;
  clearPdfSpeechHighlight();
  updatePdfSpeechProgress();
  startPdfSpeechPreprocessing();
}

function isPdfSpeechNonContentLine(line, lineIndex, lineCount, options = {}) {
  const text = String(line && line.text || "").trim();
  const wordCount = Array.isArray(line && line.words) ? line.words.length : 0;
  if (!text || !wordCount) return true;

  const normalized = normalizePdfSpeechLineKey(text);
  if (
    options.recurringNonContent instanceof Set
    && options.recurringNonContent.has(normalized)
    && (lineIndex <= 2 || lineIndex >= lineCount - 3 || wordCount <= 12)
  ) return true;

  if (/^(?:page\s+)?(?:\d{1,4}|[ivxlcdm]{1,8})$/i.test(text)) {
    return wordCount <= 2 && (lineIndex <= 1 || lineIndex >= lineCount - 2 || /^page\s+/i.test(text));
  }

  if (/\breading\s+(?:\d+|[ivxlcdm]+)\b/i.test(text) && lineIndex <= 3) return true;
  if (/^(?:chapter|part|section|appendix)\s+(?:\d+|[ivxlcdm]+|[a-z])\b/i.test(text)) return true;
  if (/^(?:by|written\s+by|authors?|edited\s+by|prepared\s+by)\b/i.test(text)) return true;
  if (/^(?:abstract|introduction|conclusion|discussion|references|bibliography|acknowledg(?:e)?ments?|contents)\s*[:.]?$/i.test(text)) return true;
  if (/^(?:fig(?:ure)?|table|chart|photo(?:graph)?|image|illustration|map|plate|scheme|box)\s*(?:[a-z]?\d+|[ivxlcdm]+)?\s*(?:[.:)\-–—]|$)/i.test(text)) return true;
  if (/^(?:source|sources|credit|credits|photo\s+credit|image\s+credit|note|notes)\s*[:.]/i.test(text)) return true;
  if (/\b(?:source|sources|credit|credits|photo\s+credit|image\s+credit)\s*:/i.test(text)) return true;
  if (/\b(?:photo(?:graph)?|image|illustration)\s+(?:by|courtesy\s+of|credit)\b/i.test(text)) return true;
  if (/\b(?:shutterstock|getty\s+images|alamy|istock|wikimedia\s+commons|all\s+rights\s+reserved|copyright)\b|©/i.test(text)) return true;
  if (/^(?:https?:\/\/|www\.|doi\s*:)/i.test(text)) return true;

  const pageMetrics = options.pageMetrics || {};
  const bodyHeight = Number(pageMetrics.bodyHeight) || 0;
  const lineHeight = Number(line && line.height) || 0;
  const headingSized = bodyHeight > 0 && lineHeight >= bodyHeight * 1.16;
  const smallPrint = bodyHeight > 0 && lineHeight <= bodyHeight * 0.79;
  if (headingSized && wordCount <= 24) return true;
  if (smallPrint && wordCount <= 38) return true;

  const tokens = text.split(/\s+/).filter(Boolean);
  const numericTokens = tokens.filter((token) => /\d/.test(token)).length;
  const alphabeticTokens = tokens.filter((token) => /[\p{L}\p{M}]{2,}/u.test(token)).length;
  if (tokens.length >= 3 && numericTokens / tokens.length >= 0.46 && alphabeticTokens <= numericTokens + 1) return true;
  if (numericTokens >= 2 && alphabeticTokens <= 3 && /[%±=<>]|\b(?:ci|sd|se|n\s*=)\b/i.test(text)) return true;
  return false;
}

function normalizePdfSpeechLineKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\b(?:page\s*)?\d+\b/g, "#")
    .replace(/[^\p{L}\p{M}\p{N}#]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pdfSpeechRecurringNonContent(pageLines) {
  const pageOccurrences = new Map();
  Array.from(pageLines.entries()).forEach(([pageNumber, lines]) => {
    const seen = new Set();
    lines.forEach((line) => {
      const text = String(line && line.text || "").trim();
      const wordCount = Array.isArray(line && line.words) ? line.words.length : 0;
      if (!text || text.length > 140 || wordCount > 16) return;
      const key = normalizePdfSpeechLineKey(text);
      if (!key || seen.has(key)) return;
      seen.add(key);
      if (!pageOccurrences.has(key)) pageOccurrences.set(key, new Set());
      pageOccurrences.get(key).add(pageNumber);
    });
  });
  const threshold = pageLines.size <= 2 ? 2 : 3;
  return new Set(Array.from(pageOccurrences.entries())
    .filter(([, pages]) => pages.size >= threshold)
    .map(([key]) => key));
}

function pdfSpeechPageMetrics(lines) {
  const heights = (lines || [])
    .filter((line) => Array.isArray(line.words) && line.words.length >= 2)
    .map((line) => Number(line.height) || 0)
    .filter((height) => height > 0)
    .sort((left, right) => left - right);
  if (!heights.length) return { bodyHeight: 0 };
  const middle = Math.floor(heights.length / 2);
  const bodyHeight = heights.length % 2
    ? heights[middle]
    : (heights[middle - 1] + heights[middle]) / 2;
  return { bodyHeight };
}

function rebuildPdfSpeechWordMetadata() {
  const voice = pdfSpeechVoiceId();
  const metadata = new Map();
  pdfSpeechPlan.chunks.forEach((chunk, chunkIndex) => {
    chunk.words.forEach((word, wordIndex) => {
      metadata.set(word.domKey, {
        domKey: word.domKey,
        documentKey: pdfSpeechPlan.documentKey,
        fingerprint: pdfSpeechPlan.fingerprint,
        voice,
        pageNumber: word.pageNumber,
        pageWordIndex: word.pageWordIndex,
        chunkIndex,
        wordIndex,
        text: word.text,
        x: word.x,
        top: word.top,
        width: word.width,
        height: word.height,
        corners: word.corners || null,
        start: null,
        end: null
      });
    });
  });
  pdfSpeechWordMetadata = metadata;
  bindPdfSpeechWordMetadata();
}

function refreshPdfSpeechGeometry(pageLines) {
  const geometryByKey = new Map();
  Array.from(pageLines.values()).forEach((lines) => {
    lines.forEach((line) => {
      (line.words || []).forEach((word) => geometryByKey.set(word.domKey, word));
    });
  });

  pdfSpeechPlan.chunks.forEach((chunk) => {
    chunk.words.forEach((word) => {
      const geometry = geometryByKey.get(word.domKey);
      if (!geometry) return;
      word.x = geometry.x;
      word.top = geometry.top;
      word.width = geometry.width;
      word.height = geometry.height;
      word.corners = geometry.corners || null;
      const metadata = pdfSpeechWordMetadata.get(word.domKey);
      if (!metadata) return;
      pdfSpeechWordMetadata.set(word.domKey, {
        ...metadata,
        x: word.x,
        top: word.top,
        width: word.width,
        height: word.height,
        corners: word.corners
      });
    });
  });
  bindPdfSpeechWordMetadata();
}

function recordPdfSpeechChunkMetadata(chunkIndex, timings, voice) {
  const chunk = pdfSpeechPlan.chunks[chunkIndex];
  if (!chunk) return;
  (timings || []).forEach((timing) => {
    const word = chunk.words[timing.wordIndex];
    if (!word || !word.domKey) return;
    const current = pdfSpeechWordMetadata.get(word.domKey);
    if (!current) return;
    pdfSpeechWordMetadata.set(word.domKey, {
      ...current,
      voice,
      start: Number(timing.start) || 0,
      end: Number(timing.end) || 0
    });
  });
  bindPdfSpeechWordMetadata();
}

function bindPdfSpeechWordMetadata(root = pdfViewer) {
  if (!root || !pdfSpeechWordMetadata.size) return;
  root.querySelectorAll(".pdf-speech-word[data-pdf-speech-key]").forEach((element) => {
    const metadata = pdfSpeechWordMetadata.get(element.dataset.pdfSpeechKey);
    if (!metadata) return;
    element.dataset.pdfSpeechChunkIndex = String(metadata.chunkIndex);
    element.dataset.pdfSpeechWordIndex = String(metadata.wordIndex);
    element.dataset.pdfSpeechVoice = metadata.voice;
    if (metadata.start !== null) element.dataset.pdfSpeechStart = String(metadata.start);
    if (metadata.end !== null) element.dataset.pdfSpeechEnd = String(metadata.end);
  });
}

function normalizePdfSpeechToken(value) {
  return String(value || "")
    .replace(/\uFB00/g, "ff")
    .replace(/\uFB01/g, "fi")
    .replace(/\uFB02/g, "fl")
    .replace(/[\u00AD]/g, "")
    .trim();
}

function setPdfSpeechStatus(message, state = "idle") {
  if (!pdfSpeechStatus) return;
  pdfSpeechStatus.textContent = message;
  pdfSpeechControls.dataset.state = state;
}

function pdfSpeechPlaybackRate() {
  return clampNumber(Number(pdfSpeechRate && pdfSpeechRate.value), 0.5, 2, 1);
}

function updatePdfSpeechRateOutput() {
  if (!pdfSpeechRateOutput) return;
  pdfSpeechRateOutput.textContent = `${pdfSpeechPlaybackRate().toFixed(2).replace(/0$/, "")}×`;
}

function formatPdfSpeechTime(value) {
  const seconds = Math.max(0, Math.floor(Number(value) || 0));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = String(seconds % 60).padStart(2, "0");
  return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${remainder}` : `${minutes}:${remainder}`;
}

function pdfSpeechDurationEstimate() {
  let knownDuration = 0;
  let knownWords = 0;
  const secondsPerWordSamples = [];
  const knownIndexes = [];
  pdfSpeechChunkDurations.forEach((duration, index) => {
    if (!(duration > 0)) return;
    const chunkWords = pdfSpeechPlan.chunks[index] ? pdfSpeechPlan.chunks[index].words.length : 0;
    if (chunkWords > 0) {
      secondsPerWordSamples.push(duration / chunkWords);
      knownIndexes.push(index);
    }
    knownDuration += duration;
    knownWords += chunkWords;
  });
  const complete = pdfSpeechChunkDurations.length > 0 && pdfSpeechChunkDurations.every((duration) => duration > 0);
  if (complete) return { duration: knownDuration, estimated: false };

  const voiceWordsPerMinute = {
    am_adam: 150.7,
    am_michael: 150.7,
    af_bella: 160.2,
    af_sarah: 160.2,
    af_heart: 166.5
  }[pdfSpeechVoiceId()] || 155;
  const baselineDuration = pdfSpeechPlan.wordCount * 60 / voiceWordsPerMinute;
  if (!knownWords || !secondsPerWordSamples.length) {
    return { duration: baselineDuration, estimated: true };
  }

  secondsPerWordSamples.sort((left, right) => left - right);
  const middle = Math.floor(secondsPerWordSamples.length / 2);
  const medianSecondsPerWord = secondsPerWordSamples.length % 2
    ? secondsPerWordSamples[middle]
    : (secondsPerWordSamples[middle - 1] + secondsPerWordSamples[middle]) / 2;
  const sampledDuration = medianSecondsPerWord * pdfSpeechPlan.wordCount;
  const sampleSpan = knownIndexes.length > 1
    ? (Math.max(...knownIndexes) - Math.min(...knownIndexes)) / Math.max(1, pdfSpeechPlan.chunks.length - 1)
    : 0;
  const distributedSamplesReady = secondsPerWordSamples.length >= 5 && sampleSpan >= 0.45;
  const confidence = distributedSamplesReady ? 1 : Math.min(0.22, knownWords / 900);
  return {
    duration: baselineDuration + (sampledDuration - baselineDuration) * confidence,
    estimated: true
  };
}

function updatePdfSpeechProgress() {
  if (!pdfSpeechProgressCurrent || !pdfSpeechProgressTotal) return;
  const total = pdfSpeechDurationEstimate();
  const secondsPerWord = total.duration > 0 && pdfSpeechPlan.wordCount > 0
    ? total.duration / pdfSpeechPlan.wordCount
    : 60 / 175;
  let rawElapsed = 0;
  for (let index = 0; index < Math.min(pdfSpeechChunkIndex, pdfSpeechChunkDurations.length); index += 1) {
    const knownDuration = Number(pdfSpeechChunkDurations[index]) || 0;
    const chunk = pdfSpeechPlan.chunks[index];
    rawElapsed += knownDuration > 0
      ? knownDuration
      : (chunk ? chunk.words.length * secondsPerWord : 0);
  }
  if (pdfSpeechAudio) {
    rawElapsed += Number(pdfSpeechAudio.currentTime) || 0;
  } else if (pdfSpeechChunkIndex < pdfSpeechPlan.chunks.length && pdfSpeechWordIndex > 0) {
    const chunk = pdfSpeechPlan.chunks[pdfSpeechChunkIndex];
    const word = chunk && chunk.words[pdfSpeechWordIndex];
    const metadata = word && word.domKey ? pdfSpeechWordMetadata.get(word.domKey) : null;
    const chunkDuration = Number(pdfSpeechChunkDurations[pdfSpeechChunkIndex]) || 0;
    rawElapsed += metadata && metadata.start !== null && chunkDuration > 0
      ? Number(metadata.start) || 0
      : (chunkDuration > 0
          ? chunkDuration * (pdfSpeechWordIndex / Math.max(1, chunk ? chunk.words.length : 1))
          : pdfSpeechWordIndex * secondsPerWord);
  }
  let completedWords = 0;
  for (let index = 0; index < Math.min(pdfSpeechChunkIndex, pdfSpeechPlan.chunks.length); index += 1) {
    completedWords += pdfSpeechPlan.chunks[index].words.length;
  }
  if (pdfSpeechChunkIndex < pdfSpeechPlan.chunks.length) completedWords += Math.max(0, pdfSpeechWordIndex);
  if (pdfSpeechChunkIndex >= pdfSpeechPlan.chunks.length && pdfSpeechPlan.wordCount) completedWords = pdfSpeechPlan.wordCount;
  const progress = pdfSpeechPlan.wordCount ? clampNumber(completedWords / pdfSpeechPlan.wordCount, 0, 1, 0) : 0;
  const rate = pdfSpeechPlaybackRate();
  const elapsed = rawElapsed / rate;
  const totalDuration = total.duration / rate;
  pdfSpeechProgressCurrent.textContent = formatPdfSpeechTime(elapsed);
  pdfSpeechProgressTotal.textContent = `/ ${totalDuration ? formatPdfSpeechTime(totalDuration) : "--:--"}`;
  if (pdfSpeechProgressDetail) {
    const percentLabel = `${(progress * 100).toFixed(progress < 0.1 ? 1 : 0)}%`;
    pdfSpeechProgressDetail.textContent = `${completedWords.toLocaleString()} of ${pdfSpeechPlan.wordCount.toLocaleString()} words · ${percentLabel}`;
  }
}

async function setupPdfSpeech() {
  if (!pdfSpeechControls || !pdfSpeechButton || !pdfSpeechRate || !pdfSpeechVoice) return;
  const savedRate = Number(localStorage.getItem("openleafPdfSpeechRate"));
  const savedVoice = localStorage.getItem("openleafPdfSpeechVoice");
  pdfSpeechRate.value = String(clampNumber(savedRate, 0.5, 2, 1));
  if (savedVoice && Array.from(pdfSpeechVoice.options).some((option) => option.value === savedVoice)) {
    pdfSpeechVoice.value = savedVoice;
  }
  if (pdfPronunciationDictionary) {
    pdfPronunciationDictionary.value = localStorage.getItem("openleafPdfPronunciationDictionary") || "";
  }
  updatePdfSpeechRateOutput();
  pdfSpeechButton.disabled = true;
  setPdfSpeechStatus("Loading Kokoro…", "analyzing");
  try {
    pdfSpeechBackend = await window.localOverleaf.pdfSpeechStatus();
  } catch (error) {
    pdfSpeechBackend = { available: false, model: "", voice: "" };
  }
  if (!pdfSpeechBackend.available) {
    setPdfSpeechStatus("Kokoro runtime unavailable", "error");
  } else {
    startPdfSpeechPreprocessing();
  }
  window.addEventListener("beforeunload", () => stopPdfSpeech({ resetCursor: true, updateStatus: false }));
}

function buildPdfSpeechChunks(words) {
  const chunks = [];
  let current = [];
  let characterCount = 0;
  const flush = () => {
    if (!current.length) return;
    chunks.push({
      text: pdfSpeechChunkText(current),
      words: current
    });
    current = [];
    characterCount = 0;
  };
  words.forEach((word) => {
    const nextLength = characterCount + word.spokenText.length + (current.length ? 1 : 0);
    const previous = current[current.length - 1];
    if (current.length && nextLength > 180 && !(previous && previous.joinsNext)) flush();
    current.push(word);
    characterCount += word.spokenText.length + (current.length > 1 ? 1 : 0);
    const sentenceEnd = /[.!?][\])}\"'’”]*$/.test(word.spokenText);
    const softBreak = /[,;:][\])}\"'’”]*$/.test(word.spokenText) && current.length >= 24;
    if (!word.joinsNext && (sentenceEnd || softBreak || current.length >= 34)) flush();
  });
  flush();
  return chunks;
}

function pdfSpeechChunkText(words) {
  return words.reduce((text, word, index) => {
    if (!index) return word.spokenText;
    const previous = words[index - 1];
    if (previous && previous.joinsNext) {
      return `${text.replace(/[\-‐‑‒–—]$/u, "")}${word.spokenText}`;
    }
    return `${text} ${word.spokenText}`;
  }, "");
}

function updatePdfSpeechReadyState() {
  if (!pdfSpeechButton || !pdfSpeechPlan.wordCount) return;
  const ready = pdfSpeechBackend.available && pdfSpeechFirstChunkReady;
  pdfSpeechButton.disabled = pdfSpeechPlaying ? false : !ready;
  const wordLabel = `${pdfSpeechPlan.wordCount.toLocaleString()} words`;
  const totalChunks = pdfSpeechPlan.chunks.length;
  const cacheProgress = totalChunks ? `${Math.min(pdfSpeechPreparedCount, totalChunks)}/${totalChunks}` : "0/0";
  const stateLabel = !pdfSpeechBackend.available
    ? "Kokoro unavailable"
    : ready
      ? `${pdfSpeechVoiceLabel()} ready · ${pdfSpeechPreparedCount >= totalChunks ? "fully preloaded" : `${cacheProgress} preloaded`}`
      : `Preparing ${cacheProgress}`;
  setPdfSpeechStatus(`${stateLabel} · ${wordLabel}`, ready ? "ready" : (pdfSpeechBackend.available ? "analyzing" : "error"));
  pdfSpeechButton.setAttribute("aria-label", ready ? "Read PDF aloud" : "Preparing local neural voice");
  pdfSpeechControls.title = pdfSpeechBackend.available
    ? `${wordLabel} pre-analyzed locally. ${pdfSpeechBackend.model} · ${pdfSpeechVoiceLabel()}.`
    : "The private Kokoro/MLX runtime is unavailable.";
}

async function startPdfSpeechPreprocessing() {
  updatePdfSpeechReadyState();
  if (!pdfSpeechBackend.available || !pdfSpeechPlan.chunks.length || pdfSpeechPreprocessActive) return;
  const revision = pdfSpeechPlanRevision;
  const initialBufferSize = Math.min(3, pdfSpeechPlan.chunks.length);
  pdfSpeechPreprocessActive = true;
  try {
    for (let index = 0; index < initialBufferSize; index += 1) {
      if (revision !== pdfSpeechPlanRevision) return;
      const result = await preparePdfSpeechAudio(index);
      if (revision !== pdfSpeechPlanRevision) return;
      pdfSpeechChunkDurations[index] = Number(result.duration) || 0;
      recordPdfSpeechChunkMetadata(index, alignPdfSpeechTimings(pdfSpeechPlan.chunks[index].words, result.timings, result.duration), result.voice);
      pdfSpeechPreparedCount = index + 1;
      if (pdfSpeechPreparedCount >= initialBufferSize) pdfSpeechFirstChunkReady = true;
      if (!pdfSpeechPlaying && !pdfSpeechPaused) updatePdfSpeechReadyState();
      updatePdfSpeechProgress();
    }
  } catch (error) {
    if (revision !== pdfSpeechPlanRevision) return;
    if (!pdfSpeechFirstChunkReady) {
      pdfSpeechButton.disabled = true;
      setPdfSpeechStatus(`Kokoro error · ${formatError(error)}`, "error");
    }
  } finally {
    if (revision === pdfSpeechPlanRevision) {
      pdfSpeechPreprocessActive = false;
      void preloadRemainingPdfSpeechChunks(revision, initialBufferSize);
    }
  }
}

async function waitForPdfSpeechPreloadIdle() {
  await new Promise((resolve) => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(resolve, { timeout: 1200 });
    } else {
      setTimeout(resolve, 80);
    }
  });
}

async function preloadRemainingPdfSpeechChunks(revision, startIndex) {
  if (pdfSpeechBackgroundPreloadActive || revision !== pdfSpeechPlanRevision) return;
  pdfSpeechBackgroundPreloadActive = true;
  try {
    // Sample a short runway plus evenly spaced passages. This keeps CPU and
    // memory bounded while preventing a cover page or table of contents from
    // distorting the duration shown for a book-length document.
    const chunkCount = pdfSpeechPlan.chunks.length;
    const indexes = Array.from(new Set([
      Math.max(0, startIndex),
      Math.floor(chunkCount * 0.25),
      Math.floor(chunkCount * 0.5),
      Math.floor(chunkCount * 0.75),
      Math.max(0, chunkCount - 1)
    ].map((index) => Math.min(Math.max(0, chunkCount - 1), index))));
    for (const index of indexes) {
      if (revision !== pdfSpeechPlanRevision) return;
      if (pdfSpeechChunkDurations[index] > 0) continue;
      await waitForPdfSpeechPreloadIdle();
      if (revision !== pdfSpeechPlanRevision) return;
      const result = await preparePdfSpeechAudio(index);
      if (revision !== pdfSpeechPlanRevision) return;
      pdfSpeechChunkDurations[index] = Number(result.duration) || 0;
      recordPdfSpeechChunkMetadata(index, alignPdfSpeechTimings(pdfSpeechPlan.chunks[index].words, result.timings, result.duration), result.voice);
      pdfSpeechPreparedCount = pdfSpeechChunkDurations.filter((duration) => duration > 0).length;
      updatePdfSpeechProgress();
      if (!pdfSpeechPlaying && !pdfSpeechPaused) updatePdfSpeechReadyState();
    }
  } catch (_error) {
    // Playback can regenerate an individual passage if background preloading is interrupted.
  } finally {
    if (revision === pdfSpeechPlanRevision) {
      pdfSpeechBackgroundPreloadActive = false;
      if (!pdfSpeechPlaying && !pdfSpeechPaused) updatePdfSpeechReadyState();
    }
  }
}

async function queuePdfSpeechLookahead(startIndex) {
  if (pdfSpeechPreprocessActive || !pdfSpeechPlaying) return;
  const revision = pdfSpeechPlanRevision;
  const endIndex = Math.min(pdfSpeechPlan.chunks.length, startIndex + 4);
  pdfSpeechPreprocessActive = true;
  try {
    for (let index = Math.max(0, startIndex); index < endIndex; index += 1) {
      if (revision !== pdfSpeechPlanRevision || !pdfSpeechPlaying) return;
      const result = await preparePdfSpeechAudio(index);
      if (revision !== pdfSpeechPlanRevision || !pdfSpeechPlaying) return;
      pdfSpeechChunkDurations[index] = Number(result.duration) || 0;
      recordPdfSpeechChunkMetadata(index, alignPdfSpeechTimings(pdfSpeechPlan.chunks[index].words, result.timings, result.duration), result.voice);
      pdfSpeechPreparedCount = pdfSpeechChunkDurations.filter((duration) => duration > 0).length;
      updatePdfSpeechProgress();
    }
  } catch (_error) {
    // Playback will surface a generation error if the next chunk is needed.
  } finally {
    if (revision === pdfSpeechPlanRevision) pdfSpeechPreprocessActive = false;
  }
}

function handlePdfSpeechRateChange() {
  updatePdfSpeechRateOutput();
  localStorage.setItem("openleafPdfSpeechRate", String(pdfSpeechPlaybackRate()));
  if (pdfSpeechAudio) pdfSpeechAudio.playbackRate = pdfSpeechPlaybackRate();
  if (pdfCinematicAudio) pdfCinematicAudio.playbackRate = pdfSpeechPlaybackRate();
  updatePdfSpeechProgress();
  if (pdfCinematicStage && !pdfCinematicStage.hidden) updatePdfCinematicProgress();
}

function handlePdfSpeechVoiceChange() {
  const restart = pdfSpeechPlaying;
  const restartCinematic = Boolean(pdfCinematicStage && !pdfCinematicStage.hidden && (pdfCinematicPlaying || pdfCinematicPaused));
  stopPdfSpeech({ resetCursor: false, updateStatus: false });
  const selectedVoice = pdfSpeechVoiceId();
  localStorage.setItem("openleafPdfSpeechVoice", selectedVoice);
  restartPdfSpeechPreprocessing();
  if (restart) {
    pdfSpeechPlaying = true;
    updatePdfSpeechButton();
    speakCurrentPdfChunk();
  } else {
    updatePdfSpeechReadyState();
  }
  if (restartCinematic) {
    pdfCinematicGeneration += 1;
    closePdfCinematicAudio();
    pdfCinematicPlaying = true;
    pdfCinematicPaused = false;
    updatePdfCinematicPlaybackButton();
    void playPdfCinematicChunk();
  }
}

function handlePdfPronunciationDictionaryChange() {
  if (!pdfPronunciationDictionary) return;
  localStorage.setItem("openleafPdfPronunciationDictionary", pdfPronunciationDictionary.value);
  clearTimeout(pdfPronunciationDictionaryTimer);
  pdfPronunciationDictionaryTimer = setTimeout(() => restartPdfSpeechPreprocessing(), 360);
}

function pdfPronunciationRules() {
  const source = pdfPronunciationDictionary
    ? pdfPronunciationDictionary.value
    : localStorage.getItem("openleafPdfPronunciationDictionary") || "";
  return String(source).split(/\r?\n/).map((line) => {
    const match = line.match(/^\s*(.+?)\s*(?:=>|=|→|\t)\s*(.+?)\s*$/);
    return match ? { source: match[1], replacement: match[2] } : null;
  }).filter((rule) => rule && rule.source && rule.replacement);
}

function applyPdfPronunciationRules(text) {
  return pdfPronunciationRules().reduce((result, rule) => {
    const escaped = rule.source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, "giu");
    return result.replace(pattern, (_match, prefix) => `${prefix}${rule.replacement}`);
  }, String(text || ""));
}

function restartPdfSpeechPreprocessing() {
  pdfSpeechPlanRevision += 1;
  pdfSpeechAudioCache.clear();
  pdfSpeechFirstChunkReady = false;
  pdfSpeechPreparedCount = 0;
  pdfSpeechPreprocessActive = false;
  pdfSpeechBackgroundPreloadActive = false;
  pdfSpeechChunkDurations = new Array(pdfSpeechPlan.chunks.length).fill(0);
  rebuildPdfSpeechWordMetadata();
  updatePdfSpeechProgress();
  startPdfSpeechPreprocessing();
}

function pdfSpeechVoiceId() {
  return pdfSpeechVoice ? String(pdfSpeechVoice.value || "am_adam") : "am_adam";
}

function pdfSpeechVoiceLabel() {
  const selected = pdfSpeechVoice && pdfSpeechVoice.selectedOptions ? pdfSpeechVoice.selectedOptions[0] : null;
  return selected ? selected.textContent.split("·")[0].trim() : "Adam";
}

function togglePdfSpeech() {
  if (!pdfSpeechPlan.chunks.length || !pdfSpeechBackend.available) return;
  if (pdfSpeechPlaying && pdfSpeechAudio) {
    pdfSpeechAudio.pause();
    cancelAnimationFrame(pdfSpeechAnimationFrame);
    pdfSpeechPlaying = false;
    pdfSpeechPaused = true;
    updatePdfSpeechButton();
    setPdfSpeechStatus("Paused", "paused");
    return;
  }
  if (pdfSpeechPaused && pdfSpeechAudio) {
    pdfSpeechAudio.play().then(() => {
      pdfSpeechPlaying = true;
      pdfSpeechPaused = false;
      updatePdfSpeechButton();
      setPdfSpeechStatus(`${pdfSpeechVoiceLabel()} reading`, "playing");
      monitorPdfSpeechAudio();
    }).catch(handlePdfSpeechPlaybackError);
    return;
  }
  if (pdfSpeechChunkIndex >= pdfSpeechPlan.chunks.length) {
    pdfSpeechChunkIndex = 0;
    pdfSpeechWordIndex = 0;
  }
  pdfSpeechAutoFollow = true;
  pdfSpeechPlaying = true;
  pdfSpeechPaused = false;
  updatePdfSpeechButton();
  speakCurrentPdfChunk();
}

async function speakCurrentPdfChunk() {
  if (!pdfSpeechPlaying || pdfSpeechPaused) return;
  const chunk = pdfSpeechPlan.chunks[pdfSpeechChunkIndex];
  if (!chunk) {
    finishPdfSpeech();
    return;
  }
  const generation = ++pdfSpeechRequestGeneration;
  const requestedVoice = pdfSpeechVoiceId();
  setPdfSpeechStatus("Kokoro generating…", "analyzing");
  try {
    const result = await preparePdfSpeechAudio(pdfSpeechChunkIndex, requestedVoice);
    if (generation !== pdfSpeechRequestGeneration || !pdfSpeechPlaying) return;
    if (requestedVoice !== pdfSpeechVoiceId() || result.voice !== requestedVoice) {
      speakCurrentPdfChunk();
      return;
    }
    pdfSpeechChunkDurations[pdfSpeechChunkIndex] = Number(result.duration) || 0;
    pdfSpeechFirstChunkReady = true;
    if (pdfSpeechButton) pdfSpeechButton.disabled = false;
    cancelPdfSpeechAudio({ invalidate: false });
    pdfSpeechCurrentTimings = alignPdfSpeechTimings(chunk.words, result.timings, result.duration);
    recordPdfSpeechChunkMetadata(pdfSpeechChunkIndex, pdfSpeechCurrentTimings, result.voice);
    pdfSpeechAudio = new Audio(result.audioUrl);
    pdfSpeechAudio.preload = "auto";
    pdfSpeechAudio.playbackRate = pdfSpeechPlaybackRate();
    pdfSpeechAudio.preservesPitch = true;
    pdfSpeechAudio.addEventListener("ended", () => {
      if (generation !== pdfSpeechRequestGeneration) return;
      cancelAnimationFrame(pdfSpeechAnimationFrame);
      pdfSpeechChunkIndex += 1;
      pdfSpeechWordIndex = 0;
      updatePdfSpeechProgress();
      speakCurrentPdfChunk();
    }, { once: true });
    pdfSpeechAudio.addEventListener("error", handlePdfSpeechPlaybackError, { once: true });
    const startingTiming = pdfSpeechCurrentTimings.find((timing) => timing.wordIndex === pdfSpeechWordIndex);
    if (startingTiming && startingTiming.start > 0) {
      await seekPdfSpeechAudio(pdfSpeechAudio, startingTiming.start, generation);
    }
    await pdfSpeechAudio.play();
    if (generation !== pdfSpeechRequestGeneration) return;
    updatePdfSpeechButton();
    setPdfSpeechStatus(`${pdfSpeechVoiceLabel()} reading`, "playing");
    highlightPdfSpeechWord(chunk.words[pdfSpeechWordIndex] || chunk.words[0]);
    monitorPdfSpeechAudio();
    queuePdfSpeechLookahead(pdfSpeechChunkIndex + 1);
  } catch (error) {
    if (generation !== pdfSpeechRequestGeneration) return;
    handlePdfSpeechPlaybackError(error);
  }
}

async function seekPdfSpeechAudio(audio, targetTime, generation) {
  if (audio.readyState < HTMLMediaElement.HAVE_METADATA) {
    await new Promise((resolve, reject) => {
      audio.addEventListener("loadedmetadata", resolve, { once: true });
      audio.addEventListener("error", reject, { once: true });
      audio.load();
    });
  }
  if (generation !== pdfSpeechRequestGeneration || !pdfSpeechPlaying) return;
  const duration = Number(audio.duration) || Number.POSITIVE_INFINITY;
  const nextTime = Math.max(0, Math.min(Number(targetTime) || 0, duration - 0.02));
  if (Math.abs(audio.currentTime - nextTime) < 0.03) return;
  await new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      audio.removeEventListener("seeked", finish);
      resolve();
    };
    const timer = setTimeout(finish, 1500);
    audio.addEventListener("seeked", finish, { once: true });
    audio.currentTime = nextTime;
  });
}

function seekPdfSpeechToWord({ domKey = "", pageNumber = 0, pageWordIndex = -1, chunkIndex = -1, wordIndex = -1, text = "" } = {}) {
  if (!pdfSpeechPlan.chunks.length || !pdfSpeechBackend.available) return;
  const continuePlaying = pdfSpeechPlaying;
  const stored = pdfSpeechWordMetadata.get(domKey);
  let targetChunkIndex = stored ? stored.chunkIndex : Number(chunkIndex);
  let targetWordIndex = stored ? stored.wordIndex : Number(wordIndex);
  const directChunk = pdfSpeechPlan.chunks[targetChunkIndex];
  const directWord = directChunk && directChunk.words[targetWordIndex];
  if (!directWord || directWord.domKey !== domKey) {
    targetChunkIndex = -1;
    targetWordIndex = -1;
    pdfSpeechPlan.chunks.some((chunk, nextChunkIndex) => {
      const nextWordIndex = chunk.words.findIndex((word) => word.domKey === domKey);
      if (nextWordIndex < 0) return false;
      targetChunkIndex = nextChunkIndex;
      targetWordIndex = nextWordIndex;
      return true;
    });
  }
  if (targetChunkIndex < 0 || targetWordIndex < 0) {
    const normalizedTarget = normalizePdfSpeechAlignment(text);
    let closest = null;
    pdfSpeechPlan.chunks.forEach((chunk, chunkIndex) => {
      chunk.words.forEach((word, wordIndex) => {
        if (word.pageNumber !== Number(pageNumber)) return;
        if (normalizedTarget && normalizePdfSpeechAlignment(word.text) !== normalizedTarget) return;
        const distance = Math.abs(Number(word.pageWordIndex) - Number(pageWordIndex));
        if (!closest || distance < closest.distance) closest = { chunkIndex, wordIndex, distance };
      });
    });
    if (closest) {
      targetChunkIndex = closest.chunkIndex;
      targetWordIndex = closest.wordIndex;
    }
  }
  if (targetChunkIndex < 0 || targetWordIndex < 0) {
    setPdfSpeechStatus(`Could not seek to “${text || "word"}”`, "error");
    return;
  }

  cancelPdfSpeechAudio();
  pdfSpeechChunkIndex = targetChunkIndex;
  pdfSpeechWordIndex = targetWordIndex;
  pdfSpeechPlaying = continuePlaying;
  pdfSpeechPaused = !continuePlaying;
  updatePdfSpeechButton();
  updatePdfSpeechProgress();
  const targetWord = pdfSpeechPlan.chunks[targetChunkIndex].words[targetWordIndex];
  highlightPdfSpeechWord(targetWord);
  if (continuePlaying) {
    setPdfSpeechStatus(`Seeking to “${targetWord.text}”…`, "analyzing");
    speakCurrentPdfChunk();
  } else {
    setPdfSpeechStatus(`Paused at “${targetWord.text}”`, "paused");
  }
}

function pdfSpeechWordHitAtEvent(event) {
  if (!pdfSpeechPlan.wordCount) return null;
  const target = event.target instanceof Element ? event.target : null;
  if (!target || target.closest("a, button, input, select, textarea")) return null;
  const pageShell = target.closest(".pdf-page");
  if (!pageShell || !pdfViewer.contains(pageShell)) return null;
  const x = event.clientX;
  const y = event.clientY;
  const pageNumber = Number(pageShell.dataset.page);
  const matches = Array.from(pdfSpeechWordMetadata.values())
    .filter((metadata) => metadata.pageNumber === pageNumber)
    .map((metadata) => ({ metadata, bounds: pdfSpeechWordClientBounds(pageShell, metadata) }))
    .filter(({ bounds }) => x >= bounds.left - 2 && x <= bounds.right + 2 && y >= bounds.top - 2 && y <= bounds.bottom + 2);
  if (!matches.length) return null;
  return matches.reduce((best, candidate) => {
    const centerX = candidate.bounds.left + candidate.bounds.width / 2;
    const centerY = candidate.bounds.top + candidate.bounds.height / 2;
    const distance = Math.hypot(x - centerX, y - centerY);
    return !best || distance < best.distance ? { ...candidate, distance } : best;
  }, null);
}

function handlePdfSpeechWordClick(event) {
  if (event.button !== 0 || !pdfSpeechBackend.available) return;
  const hit = pdfSpeechWordHitAtEvent(event);
  if (!hit) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  pdfSpeechAutoFollow = true;
  const metadata = hit.metadata;
  seekPdfSpeechToWord({
    domKey: metadata.domKey,
    pageNumber: metadata.pageNumber,
    pageWordIndex: metadata.pageWordIndex,
    chunkIndex: metadata.chunkIndex,
    wordIndex: metadata.wordIndex,
    text: metadata.text
  });
}

function pdfWordDefinitionCacheMap() {
  if (pdfWordDefinitionCache) return pdfWordDefinitionCache;
  let stored = [];
  try {
    stored = JSON.parse(localStorage.getItem("openleafWordDefinitionsV2") || "[]");
  } catch (_error) {
    stored = [];
  }
  pdfWordDefinitionCache = new Map(Array.isArray(stored) ? stored.slice(-200) : []);
  return pdfWordDefinitionCache;
}

function rememberPdfWordDefinition(word, result) {
  const cache = pdfWordDefinitionCacheMap();
  cache.set(word, result);
  while (cache.size > 200) cache.delete(cache.keys().next().value);
  try {
    localStorage.setItem("openleafWordDefinitionsV2", JSON.stringify(Array.from(cache.entries())));
  } catch (_error) {
    // A session cache is still available if browser storage is full or disabled.
  }
}

function closePdfWordDefinition() {
  pdfWordDefinitionRequest += 1;
  if (!pdfWordDefinitionCard) return;
  const wordElement = pdfWordDefinitionCard.pdfWordElement;
  if (wordElement) wordElement.classList.remove("is-defining");
  if (pdfWordDefinitionCard.pdfHighlightLayer) pdfWordDefinitionCard.pdfHighlightLayer.remove();
  pdfWordDefinitionCard.remove();
  pdfWordDefinitionCard = null;
  const selection = window.getSelection();
  if (selection) selection.removeAllRanges();
}

function positionPdfWordDefinitionCard(card, anchorX, anchorY) {
  const margin = 12;
  const gap = 10;
  const bounds = card.getBoundingClientRect();
  const left = clampNumber(anchorX - 18, margin, window.innerWidth - bounds.width - margin, margin);
  const below = anchorY + gap;
  const top = below + bounds.height <= window.innerHeight - margin
    ? below
    : Math.max(margin, anchorY - bounds.height - gap);
  card.style.left = `${Math.round(left)}px`;
  card.style.top = `${Math.round(top)}px`;
}

function renderPdfWordDefinition(card, result) {
  if (!card || card !== pdfWordDefinitionCard) return;
  const word = card.querySelector(".pdf-word-definition-word");
  const pronunciation = card.querySelector(".pdf-word-definition-pronunciation");
  const definition = card.querySelector(".pdf-word-definition-text");
  word.textContent = result.word || card.dataset.word;
  pronunciation.textContent = result.pronunciation || "";
  pronunciation.hidden = !result.pronunciation;
  definition.textContent = result.definition || "No definition found for this word.";
  card.classList.remove("is-loading");
  positionPdfWordDefinitionCard(card, card.pdfAnchorX, card.pdfAnchorY);
}

function highlightPdfDefinitionWord(wordElement) {
  const domKey = String(wordElement.dataset.pdfSpeechKey || "");
  const word = pdfSpeechWordMetadata.get(domKey);
  if (!word) return null;
  const pageShell = wordElement.closest(".pdf-page");
  if (!pageShell) return null;
  const geometry = pdfSpeechWordPageGeometry(pageShell, word, wordElement);
  const layer = document.createElement("div");
  layer.className = "pdf-definition-highlight-layer";
  const highlight = document.createElement("span");
  highlight.className = "pdf-speech-highlight";
  const padding = 4;
  highlight.style.left = `${Math.max(0, geometry.x - padding)}px`;
  highlight.style.top = `${Math.max(0, geometry.top - padding)}px`;
  highlight.style.width = `${Math.max(1, geometry.width) + padding * 2}px`;
  highlight.style.height = `${Math.max(1, geometry.height) + padding * 2}px`;
  layer.style.width = `${Number(pageShell.dataset.renderedWidth) || pageShell.clientWidth}px`;
  layer.style.height = `${Number(pageShell.dataset.renderedHeight) || pageShell.clientHeight}px`;
  const ratio = renderedPdfZoom ? pdfZoom / renderedPdfZoom : 1;
  layer.style.transform = ratio !== 1 ? `scale(${ratio})` : "";
  layer.appendChild(highlight);
  pageShell.appendChild(layer);
  return layer;
}

async function showPdfWordDefinition(word, wordElement, anchorX, anchorY) {
  closePdfWordDefinition();
  const request = ++pdfWordDefinitionRequest;
  const card = document.createElement("aside");
  card.className = "pdf-word-definition-card is-loading";
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", `Definition of ${word}`);
  card.dataset.word = word;
  card.pdfWordElement = wordElement;
  card.pdfAnchorX = anchorX;
  card.pdfAnchorY = anchorY;
  card.pdfHighlightLayer = highlightPdfDefinitionWord(wordElement);
  card.innerHTML = `
    <button class="pdf-word-definition-close" type="button" aria-label="Close definition">×</button>
    <strong class="pdf-word-definition-word"></strong>
    <span class="pdf-word-definition-pronunciation" hidden></span>
    <p class="pdf-word-definition-text">Finding a concise definition…</p>
  `;
  card.querySelector(".pdf-word-definition-word").textContent = word;
  card.querySelector(".pdf-word-definition-close").addEventListener("click", (event) => {
    event.stopPropagation();
    closePdfWordDefinition();
  });
  card.addEventListener("contextmenu", (event) => event.stopPropagation());
  document.body.appendChild(card);
  pdfWordDefinitionCard = card;
  if (!card.pdfHighlightLayer) wordElement.classList.add("is-defining");
  positionPdfWordDefinitionCard(card, anchorX, anchorY);

  const cache = pdfWordDefinitionCacheMap();
  if (cache.has(word.toLowerCase()) && cache.get(word.toLowerCase()).pronunciation) {
    renderPdfWordDefinition(card, cache.get(word.toLowerCase()));
    return;
  }
  try {
    const result = await window.localOverleaf.lookupWordDefinition(word);
    if (request !== pdfWordDefinitionRequest || card !== pdfWordDefinitionCard) return;
    rememberPdfWordDefinition(word.toLowerCase(), result);
    renderPdfWordDefinition(card, result);
  } catch (_error) {
    if (request !== pdfWordDefinitionRequest || card !== pdfWordDefinitionCard) return;
    renderPdfWordDefinition(card, {
      word,
      partOfSpeech: "definition unavailable",
      definition: "Openleaf could not reach the definition service. Right-click again when you’re online."
    });
  }
}

function handlePdfSpeechWordDefinition(event) {
  const target = event.target instanceof Element ? event.target : null;
  let wordElement = target && target.closest(".pdf-speech-word");
  if (!wordElement) {
    const hit = pdfSpeechWordHitAtEvent(event);
    wordElement = hit && pdfViewer.querySelector(`[data-pdf-speech-key="${CSS.escape(hit.metadata.domKey)}"]`);
  }
  if (!wordElement) return;
  if (!window.localOverleaf.lookupWordDefinition) return;
  event.preventDefault();
  event.stopImmediatePropagation();

  const textNode = Array.from(wordElement.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
  const source = String(textNode ? textNode.textContent : wordElement.textContent || "");
  const lexicalWord = source.match(/[\p{L}\p{M}]+(?:[’'-][\p{L}\p{M}]+)*/u);
  const word = lexicalWord ? lexicalWord[0] : source.trim();
  if (word) void showPdfWordDefinition(word, wordElement, event.clientX, event.clientY);
}

function pdfSpeechWordClientBounds(pageShell, word) {
  const wordElement = word && word.domKey
    ? pageShell.querySelector(`[data-pdf-speech-key="${CSS.escape(word.domKey)}"]`)
    : null;
  if (wordElement) {
    const bounds = wordElement.getBoundingClientRect();
    if (bounds.width > 0 && bounds.height > 0) {
      return {
        left: bounds.left,
        top: bounds.top,
        right: bounds.right,
        bottom: bounds.bottom,
        width: bounds.width,
        height: bounds.height
      };
    }
  }
  const canvas = pageShell.querySelector("canvas");
  const canvasBounds = (canvas || pageShell).getBoundingClientRect();
  const renderedWidth = Number(pageShell.dataset.renderedWidth) || Math.max(1, pageShell.offsetWidth);
  const renderedHeight = Number(pageShell.dataset.renderedHeight) || Math.max(1, pageShell.offsetHeight);
  const scaleX = canvasBounds.width / Math.max(1, renderedWidth);
  const scaleY = canvasBounds.height / Math.max(1, renderedHeight);
  const corners = Array.isArray(word.corners) && word.corners.length === 4
    ? word.corners
    : [
        { x: word.x, y: word.top },
        { x: word.x + word.width, y: word.top },
        { x: word.x + word.width, y: word.top + word.height },
        { x: word.x, y: word.top + word.height }
      ];
  const points = corners.map((point) => ({
    x: canvasBounds.left + point.x * scaleX,
    y: canvasBounds.top + point.y * scaleY
  }));
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  return {
    left: Math.min(...xs),
    top: Math.min(...ys),
    right: Math.max(...xs),
    bottom: Math.max(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys)
  };
}

function pdfSpeechWordPageGeometry(pageShell, word, suppliedElement = null) {
  const canvas = pageShell.querySelector("canvas");
  const canvasBounds = (canvas || pageShell).getBoundingClientRect();
  const renderedWidth = Number(pageShell.dataset.renderedWidth) || Math.max(1, pageShell.offsetWidth);
  const renderedHeight = Number(pageShell.dataset.renderedHeight) || Math.max(1, pageShell.offsetHeight);
  const scaleX = canvasBounds.width / Math.max(1, renderedWidth);
  const scaleY = canvasBounds.height / Math.max(1, renderedHeight);
  const wordElement = suppliedElement || (word && word.domKey
    ? pageShell.querySelector(`[data-pdf-speech-key="${CSS.escape(word.domKey)}"]`)
    : null);
  if (wordElement) {
    const bounds = wordElement.getBoundingClientRect();
    if (bounds.width > 0 && bounds.height > 0 && scaleX > 0 && scaleY > 0) {
      return {
        x: (bounds.left - canvasBounds.left) / scaleX,
        top: (bounds.top - canvasBounds.top) / scaleY,
        width: bounds.width / scaleX,
        height: bounds.height / scaleY
      };
    }
  }
  return {
    x: Number(word && word.x) || 0,
    top: Number(word && word.top) || 0,
    width: Math.max(1, Number(word && word.width) || 1),
    height: Math.max(1, Number(word && word.height) || 1)
  };
}

function preparePdfSpeechAudio(chunkIndex, voiceId = pdfSpeechVoiceId()) {
  const chunk = pdfSpeechPlan.chunks[chunkIndex];
  if (!chunk) return Promise.reject(new Error("No speech chunk."));
  const speechText = applyPdfPronunciationRules(chunk.text);
  const key = `${voiceId}:${speechText}`;
  if (pdfSpeechAudioCache.has(key)) return pdfSpeechAudioCache.get(key);
  const request = window.localOverleaf.synthesizePdfSpeech(speechText, 1, voiceId);
  pdfSpeechAudioCache.set(key, request);
  while (pdfSpeechAudioCache.size > 3) {
    pdfSpeechAudioCache.delete(pdfSpeechAudioCache.keys().next().value);
  }
  request.catch(() => pdfSpeechAudioCache.delete(key));
  return request;
}

function normalizePdfSpeechAlignment(value) {
  return String(value || "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function alignPdfSpeechTimings(words, rawTimings, duration) {
  const modelTokens = (rawTimings || [])
    .map((timing) => ({ ...timing, normalized: normalizePdfSpeechAlignment(timing.text) }))
    .filter((timing) => timing.normalized);
  const aligned = new Array(words.length).fill(null);
  let modelText = "";
  modelTokens.forEach((token) => {
    token.characterStart = modelText.length;
    modelText += token.normalized;
    token.characterEnd = modelText.length;
  });
  let characterCursor = 0;
  words.forEach((word, wordIndex) => {
    const target = normalizePdfSpeechAlignment(word.spokenText);
    if (!target) return;
    const matchStart = modelText.indexOf(target, characterCursor);
    if (matchStart < 0 || matchStart - characterCursor > 48) return;
    const matchEnd = matchStart + target.length;
    const overlapping = modelTokens.filter((token) => token.characterEnd > matchStart && token.characterStart < matchEnd);
    if (!overlapping.length) return;
    aligned[wordIndex] = {
      start: Number(overlapping[0].start) || 0,
      end: Number(overlapping[overlapping.length - 1].end) || 0,
      wordIndex
    };
    characterCursor = matchEnd;
  });

  let index = 0;
  while (index < aligned.length) {
    if (aligned[index]) {
      index += 1;
      continue;
    }
    const gapStart = index;
    while (index < aligned.length && !aligned[index]) index += 1;
    const gapEnd = index;
    const leftAnchor = gapStart > 0 ? aligned[gapStart - 1] : null;
    const rightAnchor = gapEnd < aligned.length ? aligned[gapEnd] : null;
    const timeStart = leftAnchor ? leftAnchor.end : 0;
    const timeEnd = rightAnchor ? rightAnchor.start : duration;
    const weights = words.slice(gapStart, gapEnd).map((word) => Math.max(1, normalizePdfSpeechAlignment(word.spokenText).length));
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0) || 1;
    let weightCursor = 0;
    weights.forEach((weight, offset) => {
      const wordIndex = gapStart + offset;
      aligned[wordIndex] = {
        start: timeStart + (weightCursor / totalWeight) * Math.max(0, timeEnd - timeStart),
        end: timeStart + ((weightCursor + weight) / totalWeight) * Math.max(0, timeEnd - timeStart),
        wordIndex
      };
      weightCursor += weight;
    });
  }
  return aligned.sort((left, right) => left.start - right.start);
}

function monitorPdfSpeechAudio() {
  cancelAnimationFrame(pdfSpeechAnimationFrame);
  const update = () => {
    if (!pdfSpeechAudio || !pdfSpeechPlaying || pdfSpeechAudio.paused) return;
    const time = pdfSpeechAudio.currentTime;
    let timing = pdfSpeechCurrentTimings[0];
    pdfSpeechCurrentTimings.forEach((candidate) => {
      if (candidate.start <= time) timing = candidate;
    });
    const chunk = pdfSpeechPlan.chunks[pdfSpeechChunkIndex];
    if (timing && chunk && timing.wordIndex !== pdfSpeechWordIndex) {
      pdfSpeechWordIndex = timing.wordIndex;
      highlightPdfSpeechWord(chunk.words[pdfSpeechWordIndex]);
    }
    updatePdfSpeechProgress();
    pdfSpeechAnimationFrame = requestAnimationFrame(update);
  };
  pdfSpeechAnimationFrame = requestAnimationFrame(update);
}

function cancelPdfSpeechAudio({ invalidate = true } = {}) {
  cancelAnimationFrame(pdfSpeechAnimationFrame);
  pdfSpeechAnimationFrame = 0;
  if (invalidate) pdfSpeechRequestGeneration += 1;
  if (pdfSpeechAudio) {
    pdfSpeechAudio.pause();
    pdfSpeechAudio.removeAttribute("src");
    pdfSpeechAudio.load();
  }
  pdfSpeechAudio = null;
  pdfSpeechCurrentTimings = [];
  updatePdfSpeechProgress();
}

function handlePdfSpeechPlaybackError(error) {
  stopPdfSpeech({ resetCursor: false, updateStatus: false });
  setPdfSpeechStatus(`Kokoro error · ${formatError(error)}`, "error");
}

function stopPdfSpeech({ resetCursor = false, updateStatus = true } = {}) {
  cancelPdfSpeechAudio();
  pdfSpeechPlaying = false;
  pdfSpeechPaused = false;
  if (resetCursor) {
    pdfSpeechChunkIndex = 0;
    pdfSpeechWordIndex = 0;
    clearPdfSpeechHighlight();
  }
  updatePdfSpeechButton();
  if (updateStatus) updatePdfSpeechReadyState();
}

function finishPdfSpeech() {
  cancelPdfSpeechAudio();
  pdfSpeechPlaying = false;
  pdfSpeechPaused = false;
  pdfSpeechChunkIndex = pdfSpeechPlan.chunks.length;
  pdfSpeechWordIndex = 0;
  clearPdfSpeechHighlight();
  updatePdfSpeechButton();
  updatePdfSpeechProgress();
  setPdfSpeechStatus("Finished · press play to restart", "ready");
}

function updatePdfSpeechButton() {
  if (!pdfSpeechButton) return;
  pdfSpeechButton.setAttribute("aria-pressed", String(pdfSpeechPlaying));
  pdfSpeechButton.setAttribute("aria-label", pdfSpeechPlaying ? "Pause PDF reading" : (pdfSpeechPaused ? "Resume PDF reading" : "Read PDF aloud"));
  pdfSpeechButton.title = pdfSpeechPlaying ? `Pause ${pdfSpeechVoiceLabel()}` : (pdfSpeechPaused ? `Resume ${pdfSpeechVoiceLabel()}` : `Read with local ${pdfSpeechVoiceLabel()}`);
}

function highlightPdfSpeechWord(word) {
  if (!word) return;
  const pageShell = pdfViewer.querySelector(`.pdf-page[data-page="${word.pageNumber}"]`);
  if (!pageShell) return;
  let layer = pdfViewer.querySelector(".pdf-speech-highlight-layer");
  let highlight = layer && layer.parentElement === pageShell
    ? layer.querySelector(".pdf-speech-highlight")
    : null;
  const canMorph = Boolean(layer && highlight && layer.parentElement === pageShell);
  if (!canMorph) {
    clearPdfSpeechHighlight();
    layer = document.createElement("div");
    layer.className = "pdf-speech-highlight-layer";
    highlight = document.createElement("span");
    highlight.className = "pdf-speech-highlight";
    layer.appendChild(highlight);
    pageShell.appendChild(layer);
  }
  layer.style.width = `${Number(pageShell.dataset.renderedWidth) || pageShell.clientWidth}px`;
  layer.style.height = `${Number(pageShell.dataset.renderedHeight) || pageShell.clientHeight}px`;
  const ratio = renderedPdfZoom ? pdfZoom / renderedPdfZoom : 1;
  layer.style.transform = ratio !== 1 ? `scale(${ratio})` : "";

  const geometry = pdfSpeechWordPageGeometry(pageShell, word);
  const highlightPadding = 4;
  const nextLeft = Math.max(0, geometry.x - highlightPadding);
  const nextTop = Math.max(0, geometry.top - highlightPadding);
  const nextWidth = Math.max(1, geometry.width) + highlightPadding * 2;
  const nextHeight = Math.max(1, geometry.height) + highlightPadding * 2;
  const previousLeft = Number.parseFloat(highlight.style.left);
  const previousTop = Number.parseFloat(highlight.style.top);
  const travel = canMorph && Number.isFinite(previousLeft) && Number.isFinite(previousTop)
    ? Math.hypot(nextLeft - previousLeft, nextTop - previousTop)
    : 0;

  highlight.style.left = `${nextLeft}px`;
  highlight.style.top = `${nextTop}px`;
  highlight.style.width = `${nextWidth}px`;
  highlight.style.height = `${nextHeight}px`;
  if (travel > 1 && typeof highlight.animate === "function" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const horizontalTravel = Math.abs(nextLeft - previousLeft) >= Math.abs(nextTop - previousTop);
    if (highlight.pdfSpeechMorphAnimation) highlight.pdfSpeechMorphAnimation.cancel();
    highlight.style.transformOrigin = horizontalTravel
      ? (nextLeft >= previousLeft ? "0 50%" : "100% 50%")
      : (nextTop >= previousTop ? "50% 0" : "50% 100%");
    highlight.pdfSpeechMorphAnimation = highlight.animate([
      { transform: "scale(1)", borderRadius: "7px" },
      { transform: horizontalTravel ? "scaleX(1.12) scaleY(0.9)" : "scaleX(0.94) scaleY(1.1)", borderRadius: "999px", offset: 0.46 },
      { transform: "scale(1)", borderRadius: "7px" }
    ], {
      duration: Math.round(clampNumber(150 + travel * 0.18, 160, 260, 190)),
      easing: "cubic-bezier(0.22, 1, 0.36, 1)"
    });
  }
  scrollPdfSpeechWordIntoView(word, pageShell);
}

function scrollPdfSpeechWordIntoView(word, pageShell) {
  if (!pdfSpeechAutoFollow) return;
  const viewerBounds = pdfViewer.getBoundingClientRect();
  const wordBounds = pdfSpeechWordClientBounds(pageShell, word);
  const safeTop = viewerBounds.top + 48;
  const safeBottom = viewerBounds.bottom - 86;
  let delta = 0;
  if (wordBounds.top < safeTop) delta = wordBounds.top - safeTop;
  else if (wordBounds.bottom > safeBottom) delta = wordBounds.bottom - safeBottom;
  if (Math.abs(delta) > 1) pdfViewer.scrollBy({ top: delta, behavior: "smooth" });
}

function handlePdfSpeechManualNavigation() {
  if (pdfSpeechPlaying || pdfSpeechPaused) pdfSpeechAutoFollow = false;
}

function clearPdfSpeechHighlight() {
  if (!pdfViewer) return;
  pdfViewer.querySelectorAll(".pdf-speech-word.is-speaking").forEach((element) => element.classList.remove("is-speaking"));
  pdfViewer.querySelectorAll(".pdf-speech-highlight-layer").forEach((element) => element.remove());
}

async function buildPdfTextLayer(textContent, viewport, pdfjsLib, pageNumber) {
  const layer = document.createElement("div");
  layer.className = "pdf-text-layer";
  layer.setAttribute("aria-hidden", "true");
  layer.style.setProperty("--scale-factor", String(viewport.scale || 1));
  const textLayer = new pdfjsLib.TextLayer({ textContentSource: textContent, container: layer, viewport });
  await textLayer.render();
  let pageWordIndex = 0;
  textLayer.textDivs.forEach((textDiv, itemIndex) => {
    const source = String(textLayer.textContentItemsStr[itemIndex] || textDiv.textContent || "");
    const matches = Array.from(source.matchAll(/\S+/g));
    if (!matches.length) return;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    matches.forEach((match, matchIndex) => {
      const start = match.index || 0;
      if (start > cursor) fragment.appendChild(document.createTextNode(source.slice(cursor, start)));
      const word = document.createElement("span");
      word.className = "pdf-speech-word";
      word.dataset.pdfSpeechKey = `${pageNumber}:${itemIndex}:${matchIndex}`;
      word.dataset.pdfSpeechPageWordIndex = String(pageWordIndex);
      word.textContent = match[0];
      fragment.appendChild(word);
      pageWordIndex += 1;
      cursor = start + match[0].length;
    });
    if (cursor < source.length) fragment.appendChild(document.createTextNode(source.slice(cursor)));
    textDiv.replaceChildren(fragment);
  });
  bindPdfSpeechWordMetadata(layer);
  return layer;
}

function buildPdfTextLines(textContent, viewport, pdfjsLib, pageNumber) {
  const lineBuckets = [];
  const tolerance = 5;
  let textItemIndex = -1;

  (textContent.items || []).forEach((item) => {
    if (typeof item.str !== "string") return;
    textItemIndex += 1;
    const text = String(item.str || "");
    if (!text.trim()) return;

    const geometry = pdfTextItemGeometry(item, textContent.styles || {}, viewport, pdfjsLib);
    let bucket = lineBuckets.find((line) => Math.abs(line.y - geometry.top) <= tolerance);

    if (!bucket) {
      bucket = { y: geometry.top, items: [] };
      lineBuckets.push(bucket);
    }

    bucket.items.push({ ...geometry, text, itemIndex: textItemIndex, pageNumber });
  });

  return lineBuckets
    .map((line) => {
      const items = line.items
        .sort((a, b) => a.x - b.x)
        .map((item) => ({ ...item, words: splitPdfItemWords(item) }));
      return {
        y: line.y,
        items,
        words: items.flatMap((item) => item.words),
        height: Math.max(...items.map((item) => Number(item.height) || 0), 0),
        x: Math.min(...items.map((item) => Number(item.x) || 0)),
        right: Math.max(...items.map((item) => (Number(item.x) || 0) + (Number(item.width) || 0)), 0),
        text: items
          .map((item) => item.text)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()
      };
    })
    .filter((line) => line.text)
    .sort((a, b) => a.y - b.y);
}

function pdfTextItemGeometry(item, styles, viewport, pdfjsLib) {
  const transform = pdfjsLib.Util.transform(viewport.transform, item.transform);
  const style = styles[item.fontName] || {};
  let angle = Math.atan2(transform[1], transform[0]);
  if (style.vertical) angle += Math.PI / 2;
  const fontHeight = Math.max(1, Math.hypot(transform[2], transform[3]));
  const ascentRatio = Number.isFinite(style.ascent)
    ? style.ascent
    : Number.isFinite(style.descent)
      ? 1 + style.descent
      : 0.8;
  const fontAscent = fontHeight * ascentRatio;
  const left = angle === 0
    ? transform[4]
    : transform[4] + fontAscent * Math.sin(angle);
  const top = angle === 0
    ? transform[5] - fontAscent
    : transform[5] - fontAscent * Math.cos(angle);
  const declaredAdvance = Math.abs(Number(style.vertical ? item.height : item.width) || 0) * (Number(viewport.scale) || 1);
  const fallbackAdvance = Math.max(1, Math.hypot(transform[0], transform[1]) * Math.max(1, String(item.str || "").length) * 0.5);
  return {
    x: left,
    top,
    width: declaredAdvance || fallbackAdvance,
    height: fontHeight,
    angle,
    fontFamily: style.fontFamily || "sans-serif",
    direction: item.dir || "ltr"
  };
}

function splitPdfItemWords(item) {
  const matches = Array.from(item.text.matchAll(/\S+/g));
  const context = pdfWordMeasureContext || (pdfWordMeasureContext = document.createElement("canvas").getContext("2d"));
  context.font = `${Math.max(1, item.height)}px ${item.fontFamily || "sans-serif"}`;
  const totalMeasuredWidth = context.measureText(item.text).width;
  const measurementScale = totalMeasuredWidth > 0 ? item.width / totalMeasuredWidth : item.width / Math.max(item.text.length, 1);

  return matches.map((match, matchIndex) => {
    const text = match[0];
    const startIndex = match.index || 0;
    const endIndex = startIndex + text.length;
    const measuredStart = context.measureText(item.text.slice(0, startIndex)).width * measurementScale;
    const measuredEnd = context.measureText(item.text.slice(0, endIndex)).width * measurementScale;
    const advanceStart = item.direction === "rtl" ? item.width - measuredEnd : measuredStart;
    const advanceEnd = item.direction === "rtl" ? item.width - measuredStart : measuredEnd;
    const corners = pdfWordBoxCorners(item, advanceStart, advanceEnd);
    const xs = corners.map((point) => point.x);
    const ys = corners.map((point) => point.y);
    const left = Math.min(...xs);
    const top = Math.min(...ys);
    const right = Math.max(...xs);
    const bottom = Math.max(...ys);
    return {
      text,
      normalized: normalizeSearchText(text).split(" ")[0] || "",
      domKey: `${item.pageNumber}:${item.itemIndex}:${matchIndex}`,
      x: left,
      top,
      width: Math.max(right - left, 2),
      height: Math.max(bottom - top, 2),
      corners
    };
  });
}

function pdfWordBoxCorners(item, advanceStart, advanceEnd) {
  const cosine = Math.cos(item.angle || 0);
  const sine = Math.sin(item.angle || 0);
  const point = (advance, down) => ({
    x: item.x + advance * cosine - down * sine,
    y: item.top + advance * sine + down * cosine
  });
  return [
    point(advanceStart, 0),
    point(advanceEnd, 0),
    point(advanceEnd, item.height),
    point(advanceStart, item.height)
  ];
}

function jumpToSourceFromPdfClick(event, pageNumber) {
  if (!activeProject || event.defaultPrevented) return;

  const pageShell = event.currentTarget;
  const canvas = pageShell.querySelector("canvas");
  if (!canvas) return;

  const bounds = canvas.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) return;

  const renderedHeight = Number(canvas.dataset.renderedHeight) || bounds.height;
  const renderedWidth = Number(canvas.dataset.renderedWidth) || bounds.width;
  const textX = x * (renderedWidth / Math.max(bounds.width, 1));
  const textY = y * (renderedHeight / Math.max(bounds.height, 1));
  const lines = pdfPageTextLines.get(pageNumber) || [];
  const nearest = lines.reduce((best, line) => {
    const distance = Math.abs(line.y - textY);
    return !best || distance < best.distance ? { line, distance } : best;
  }, null);

  const clickedWord = nearest && nearest.line ? findClickedPdfWord(nearest.line, textX) : null;
  const sourcePosition = nearest && nearest.distance < 26
    ? findBestSourcePositionForPdfText(nearest.line.text, clickedWord && clickedWord.text)
    : null;
  const fallbackLine = sourcePosition
    ? sourcePosition.line
    : approximateSourceLineFromPdfPosition(pageNumber, textY, renderedHeight);
  jumpToSourcePosition(sourcePosition || { line: fallbackLine });
}

function findClickedPdfWord(line, x) {
  const words = line.words || [];
  if (!words.length) return null;

  const direct = words.find((word) => x >= word.x - 3 && x <= word.x + word.width + 3);
  if (direct) return direct;

  return words.reduce((best, word) => {
    const center = word.x + word.width / 2;
    const distance = Math.abs(center - x);
    return !best || distance < best.distance ? { word, distance } : best;
  }, null)?.word || null;
}

function findBestSourcePositionForPdfText(lineText, clickedWord) {
  const target = normalizeSearchText(lineText);
  const targetWord = normalizeSearchText(clickedWord).split(" ")[0] || "";
  if (target.length < 5 && targetWord.length < 3) return null;

  const sourceLines = getSourceText().split("\n");
  let best = { line: -1, ch: 0, length: 0, score: 0 };

  sourceLines.forEach((line, index) => {
    const visualLine = latexToVisual(line);
    const candidate = normalizeSearchText(visualLine);
    if (!candidate) return;

    let score = 0;
    if (candidate.includes(target)) score = target.length + 100;
    else if (target.includes(candidate) && candidate.length > 8) score = candidate.length + 70;
    else {
      const targetWords = target.split(" ").filter((word) => word.length > 3);
      const candidateWords = new Set(candidate.split(" ").filter((word) => word.length > 3));
      const matches = targetWords.filter((word) => candidateWords.has(word)).length;
      score = matches * 10 + Math.min(candidate.length, target.length) / 100;
    }

    if (targetWord && candidate.includes(targetWord)) score += 35;

    if (score > best.score) {
      const wordColumn = findSourceColumnForPdfWord(line, visualLine, targetWord);
      best = {
        line: index,
        ch: wordColumn.ch,
        length: wordColumn.length,
        score
      };
    }
  });

  return best.score >= 20 ? { line: best.line, ch: best.ch, length: best.length } : null;
}

function findSourceColumnForPdfWord(sourceLine, visualLine, targetWord) {
  const firstTextColumn = Math.max(0, sourceLine.search(/\S/));
  if (!targetWord) return { ch: firstTextColumn, length: 0 };

  const tokens = Array.from(sourceLine.matchAll(/[A-Za-z0-9][A-Za-z0-9_-]*/g));
  const exact = tokens.find((match) => normalizeSearchText(match[0]) === targetWord);
  if (exact) return { ch: exact.index || firstTextColumn, length: exact[0].length };

  const fuzzy = tokens.find((match) => {
    const token = normalizeSearchText(match[0]);
    return token && (token.includes(targetWord) || targetWord.includes(token));
  });
  if (fuzzy) return { ch: fuzzy.index || firstTextColumn, length: fuzzy[0].length };

  const visualIndex = normalizeSearchText(visualLine).indexOf(targetWord);
  return {
    ch: visualIndex >= 0 ? Math.min(sourceLine.length, firstTextColumn + visualIndex) : firstTextColumn,
    length: 0
  };
}

function approximateSourceLineFromPdfPosition(pageNumber, y, pageHeight) {
  const sourceLines = getSourceText().split("\n");
  const pageProgress = (Math.max(0, pageNumber - 1) + clampNumber(y / Math.max(pageHeight, 1), 0, 1, 0)) / Math.max(renderedPdfPageCount, 1);
  return clampNumber(Math.round(pageProgress * sourceLines.length), 0, Math.max(sourceLines.length - 1, 0), 0);
}

function jumpToSourcePosition(position) {
  const sourceLines = getSourceText().split("\n");
  const line = clampNumber(position && position.line, 0, Math.max(sourceLines.length - 1, 0), 0);
  const defaultColumn = Math.max(0, sourceLines[line].search(/\S/));
  const ch = clampNumber(position && Number.isFinite(position.ch) ? position.ch : defaultColumn, 0, sourceLines[line].length, defaultColumn);
  const length = clampNumber(position && Number.isFinite(position.length) ? position.length : 0, 0, sourceLines[line].length - ch, 0);
  const cursorPosition = { line, ch };

  setMode("source");
  requestAnimationFrame(() => {
    editor.focus();
    editor.setCursor(cursorPosition);
    if (length > 0) {
      const mark = editor.markText(cursorPosition, { line, ch: ch + length }, { className: "source-word-flash" });
      setTimeout(() => mark.clear(), 900);
    }
    editor.scrollIntoView(cursorPosition, 120);
  });
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function setupFileSplitter() {
  let dragStartX = 0;
  let dragStartWidth = 0;
  let collapsedDuringDrag = false;

  const stopDragging = (event) => {
    if (fileSplitter.hasPointerCapture(event.pointerId)) fileSplitter.releasePointerCapture(event.pointerId);
    document.body.classList.remove("is-resizing-files");
    window.removeEventListener("pointermove", resize);
    window.removeEventListener("pointerup", stopDragging);
    if (!collapsedDuringDrag) localStorage.setItem("latexStudioFileWidth", String(Math.round(getFileSidebarWidth())));
    renderPdf({ showLoading: false });
    scheduleTerminalFit();
  };

  const resize = (event) => {
    const bounds = workspace.getBoundingClientRect();
    const minFile = MIN_FILE_WIDTH;
    const maxFile = Math.min(MAX_FILE_WIDTH, Math.max(minFile, bounds.width - MIN_EDITOR_WIDTH - getPdfMinimumWidth() - splitter.offsetWidth - fileSplitter.offsetWidth));
    const nextWidth = dragStartWidth + event.clientX - dragStartX;
    if (nextWidth < FILE_COLLAPSE_THRESHOLD) {
      collapsedDuringDrag = true;
      setFileSidebarVisible(false);
      stopDragging(event);
      return;
    }

    const clamped = Math.min(maxFile, Math.max(minFile, nextWidth));
    workspace.style.setProperty("--file-width", `${clamped}px`);
  };

  fileSplitter.addEventListener("pointerdown", (event) => {
    if (workspace.classList.contains("files-hidden")) return;
    collapsedDuringDrag = false;
    dragStartX = event.clientX;
    dragStartWidth = filePane.getBoundingClientRect().width;
    fileSplitter.setPointerCapture(event.pointerId);
    document.body.classList.add("is-resizing-files");
    window.addEventListener("pointermove", resize);
    window.addEventListener("pointerup", stopDragging);
  });

  fileSplitter.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const currentWidth = filePane.getBoundingClientRect().width;
    const delta = event.key === "ArrowLeft" ? -24 : 24;
    const nextWidth = clampNumber(currentWidth + delta, MIN_FILE_WIDTH, MAX_FILE_WIDTH, DEFAULT_FILE_WIDTH);
    workspace.style.setProperty("--file-width", `${nextWidth}px`);
    localStorage.setItem("latexStudioFileWidth", String(Math.round(nextWidth)));
    renderPdf({ showLoading: false });
    scheduleTerminalFit();
  });
}

function setupFileOutlineResize() {
  if (!fileOutlineResizeHandle) return;
  let dragStartY = 0;
  let dragStartHeight = 0;

  const stopDragging = (event) => {
    if (fileOutlineResizeHandle.hasPointerCapture(event.pointerId)) fileOutlineResizeHandle.releasePointerCapture(event.pointerId);
    document.body.classList.remove("is-resizing-outline");
    window.removeEventListener("pointermove", resize);
    window.removeEventListener("pointerup", stopDragging);
    localStorage.setItem("latexStudioFileOutlineHeight", String(Math.round(getFileOutlineHeight())));
  };

  const resize = (event) => {
    const nextHeight = dragStartHeight + dragStartY - event.clientY;
    if (nextHeight <= MIN_FILE_OUTLINE_HEIGHT * 0.66) {
      setFileOutlineCollapsed(true);
      return;
    }
    if (fileOutline.classList.contains("collapsed")) setFileOutlineCollapsed(false);
    setFileOutlineHeight(nextHeight, { persist: false });
  };

  fileOutlineResizeHandle.addEventListener("pointerdown", (event) => {
    if (fileOutline.hidden) return;
    dragStartY = event.clientY;
    dragStartHeight = fileOutline.classList.contains("collapsed") ? MIN_FILE_OUTLINE_HEIGHT : getFileOutlineHeight();
    fileOutlineResizeHandle.setPointerCapture(event.pointerId);
    document.body.classList.add("is-resizing-outline");
    window.addEventListener("pointermove", resize);
    window.addEventListener("pointerup", stopDragging);
  });

  fileOutlineResizeHandle.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const nextHeight = getFileOutlineHeight() + (event.key === "ArrowUp" ? 20 : -20);
    if (nextHeight <= MIN_FILE_OUTLINE_HEIGHT * 0.66) setFileOutlineCollapsed(true);
    else {
      if (fileOutline.classList.contains("collapsed")) setFileOutlineCollapsed(false);
      setFileOutlineHeight(nextHeight);
    }
  });
}

function setupTerminalResize() {
  let dragStartY = 0;
  let dragStartHeight = 0;

  const maxTerminalHeight = () => {
    const sourceHeight = presentationTerminalIsActive()
      ? presentationScreen.getBoundingClientRect().height
      : (workspace.classList.contains("python-terminal-wide") ? workspace : sourcePane).getBoundingClientRect().height;
    return Math.min(MAX_TERMINAL_HEIGHT, Math.max(MIN_TERMINAL_HEIGHT, sourceHeight - 220));
  };

  const stopDragging = (event) => {
    if (terminalResizeHandle.hasPointerCapture(event.pointerId)) terminalResizeHandle.releasePointerCapture(event.pointerId);
    document.body.classList.remove("is-resizing-terminal");
    window.removeEventListener("pointermove", resize);
    window.removeEventListener("pointerup", stopDragging);
    localStorage.setItem("latexStudioTerminalHeight", String(Math.round(getTerminalHeight())));
    scheduleTerminalFit();
  };

  const resize = (event) => {
    const nextHeight = dragStartHeight + dragStartY - event.clientY;
    if (nextHeight <= TERMINAL_COLLAPSE_THRESHOLD) {
      setTerminalCollapsed(true);
      return;
    }

    if (terminalIsCollapsed()) setTerminalCollapsed(false);
    const maxHeight = maxTerminalHeight();
    const host = terminalLayoutHost();
    const maximizeClass = presentationTerminalIsActive() ? "pptx-terminal-maximized" : "terminal-maximized";
    host.classList.toggle(maximizeClass, nextHeight >= maxHeight - 10);
    setTerminalHeight(clampNumber(nextHeight, MIN_TERMINAL_HEIGHT, maxHeight, DEFAULT_TERMINAL_HEIGHT), { persist: false });
  };

  terminalResizeHandle.addEventListener("pointerdown", (event) => {
    if (!terminalSessions.length) createTerminalSession("shell");
    dragStartY = event.clientY;
    dragStartHeight = terminalIsCollapsed() ? MIN_TERMINAL_HEIGHT : getTerminalHeight();
    terminalResizeHandle.setPointerCapture(event.pointerId);
    document.body.classList.add("is-resizing-terminal");
    window.addEventListener("pointermove", resize);
    window.addEventListener("pointerup", stopDragging);
  });

  terminalResizeHandle.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    if (terminalIsCollapsed()) setTerminalCollapsed(false);
    const delta = event.key === "ArrowUp" ? 24 : -24;
    const nextHeight = getTerminalHeight() + delta;
    if (nextHeight <= TERMINAL_COLLAPSE_THRESHOLD) setTerminalCollapsed(true);
    else {
      const maxHeight = maxTerminalHeight();
      const host = terminalLayoutHost();
      const maximizeClass = presentationTerminalIsActive() ? "pptx-terminal-maximized" : "terminal-maximized";
      host.classList.toggle(maximizeClass, nextHeight >= maxHeight - 10);
      setTerminalHeight(clampNumber(nextHeight, MIN_TERMINAL_HEIGHT, maxHeight, DEFAULT_TERMINAL_HEIGHT));
    }
  });
}

function setupTerminalTabsResize() {
  if (!terminalTabsResizeHandle) return;
  let dragStartX = 0;
  let dragStartWidth = 0;

  const stopDragging = (event) => {
    if (terminalTabsResizeHandle.hasPointerCapture(event.pointerId)) terminalTabsResizeHandle.releasePointerCapture(event.pointerId);
    document.body.classList.remove("is-resizing-terminal-tabs");
    window.removeEventListener("pointermove", resize);
    window.removeEventListener("pointerup", stopDragging);
    localStorage.setItem("latexStudioTerminalTabsWidth", String(Math.round(getTerminalTabsWidth())));
    scheduleTerminalFit();
  };

  const resize = (event) => {
    const nextWidth = dragStartWidth + dragStartX - event.clientX;
    setTerminalTabsWidth(nextWidth, { persist: false });
  };

  terminalTabsResizeHandle.addEventListener("pointerdown", (event) => {
    dragStartX = event.clientX;
    dragStartWidth = getTerminalTabsWidth();
    terminalTabsResizeHandle.setPointerCapture(event.pointerId);
    document.body.classList.add("is-resizing-terminal-tabs");
    window.addEventListener("pointermove", resize);
    window.addEventListener("pointerup", stopDragging);
  });

  terminalTabsResizeHandle.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowLeft" ? 18 : -18;
    setTerminalTabsWidth(getTerminalTabsWidth() + delta);
  });
}

function setupCompileLogResize() {
  let dragStartY = 0;
  let dragStartHeight = 0;

  const maxCompileLogHeight = () => {
    const previewHeight = previewPane.getBoundingClientRect().height;
    return Math.min(MAX_COMPILE_LOG_HEIGHT, Math.max(MIN_COMPILE_LOG_HEIGHT, previewHeight - 220));
  };

  const stopDragging = (event) => {
    if (compileLogResizeHandle.hasPointerCapture(event.pointerId)) compileLogResizeHandle.releasePointerCapture(event.pointerId);
    document.body.classList.remove("is-resizing-log");
    window.removeEventListener("pointermove", resize);
    window.removeEventListener("pointerup", stopDragging);
    localStorage.setItem("latexStudioCompileLogHeight", String(Math.round(getCompileLogHeight())));
  };

  const resize = (event) => {
    const nextHeight = dragStartHeight + dragStartY - event.clientY;
    if (nextHeight <= COMPILE_LOG_COLLAPSE_THRESHOLD) {
      setCompileLogCollapsed(true);
      return;
    }

    if (compileLogPanel.classList.contains("log-collapsed")) setCompileLogCollapsed(false);
    const maxHeight = maxCompileLogHeight();
    setCompileLogMaximized(nextHeight >= maxHeight - 10);
    setCompileLogHeight(clampNumber(nextHeight, MIN_COMPILE_LOG_HEIGHT, maxHeight, DEFAULT_COMPILE_LOG_HEIGHT), { persist: false });
  };

  compileLogResizeHandle.addEventListener("pointerdown", (event) => {
    dragStartY = event.clientY;
    dragStartHeight = compileLogPanel.classList.contains("log-collapsed") ? MIN_COMPILE_LOG_HEIGHT : getCompileLogHeight();
    compileLogResizeHandle.setPointerCapture(event.pointerId);
    document.body.classList.add("is-resizing-log");
    window.addEventListener("pointermove", resize);
    window.addEventListener("pointerup", stopDragging);
  });

  compileLogResizeHandle.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    if (compileLogPanel.classList.contains("log-collapsed")) setCompileLogCollapsed(false);
    const delta = event.key === "ArrowUp" ? 24 : -24;
    const nextHeight = getCompileLogHeight() + delta;
    if (nextHeight <= COMPILE_LOG_COLLAPSE_THRESHOLD) setCompileLogCollapsed(true);
    else {
      const maxHeight = maxCompileLogHeight();
      setCompileLogMaximized(nextHeight >= maxHeight - 10);
      setCompileLogHeight(clampNumber(nextHeight, MIN_COMPILE_LOG_HEIGHT, maxHeight, DEFAULT_COMPILE_LOG_HEIGHT));
    }
  });
}

function setupSplitter() {
  let dragStartX = 0;
  let dragStartWidth = 0;

  const stopDragging = (event) => {
    if (splitter.hasPointerCapture(event.pointerId)) splitter.releasePointerCapture(event.pointerId);
    document.body.classList.remove("is-resizing");
    window.removeEventListener("pointermove", resize);
    window.removeEventListener("pointerup", stopDragging);
    renderPdf({ showLoading: false });
  };

  const notesColumnWidth = () => {
    const notesPanel = document.getElementById("notesPanel");
    if (!notesPanel || notesPanel.classList.contains("notes-off") || notesPanel.parentElement !== workspace) return 0;
    return notesPanel.getBoundingClientRect().width;
  };

  const resize = (event) => {
    const bounds = workspace.getBoundingClientRect();
    const fileWidth = workspace.classList.contains("files-hidden")
      ? fileRail.getBoundingClientRect().width
      : filePane.getBoundingClientRect().width + fileSplitter.offsetWidth;
    const notesWidth = notesColumnWidth();
    const nextWidth = dragStartWidth + event.clientX - dragStartX;
    if (nextWidth < SOURCE_COLLAPSE_THRESHOLD) {
      setSourceCollapsed(true);
      stopDragging(event);
      return;
    }

    const minLeft = MIN_EDITOR_WIDTH;
    const rightWidth = bounds.width - fileWidth - notesWidth - nextWidth - splitter.offsetWidth;
    if (rightWidth < PDF_COLLAPSE_THRESHOLD) {
      setPdfCollapsed(true);
      stopDragging(event);
      return;
    }

    if (workspace.classList.contains("pdf-hidden")) setPdfCollapsed(false);
    const minRight = Math.min(760, Math.max(getPdfMinimumWidth(), bounds.width * 0.28));
    const maxLeft = Math.max(minLeft, bounds.width - fileWidth - notesWidth - minRight - splitter.offsetWidth);
    const clamped = Math.min(maxLeft, Math.max(minLeft, nextWidth));
    workspace.style.setProperty("--editor-width", `${clamped}px`);
  };

  splitter.addEventListener("pointerdown", (event) => {
    if (workspace.classList.contains("source-hidden")) return;
    dragStartX = event.clientX;
    dragStartWidth = sourcePane.getBoundingClientRect().width;
    splitter.setPointerCapture(event.pointerId);
    document.body.classList.add("is-resizing");
    window.addEventListener("pointermove", resize);
    window.addEventListener("pointerup", stopDragging);
  });

  splitter.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const bounds = workspace.getBoundingClientRect();
    const fileWidth = workspace.classList.contains("files-hidden")
      ? fileRail.getBoundingClientRect().width
      : filePane.getBoundingClientRect().width + fileSplitter.offsetWidth;
    const minRight = Math.min(760, Math.max(getPdfMinimumWidth(), bounds.width * 0.28));
    const maxLeft = Math.max(MIN_EDITOR_WIDTH, bounds.width - fileWidth - minRight - splitter.offsetWidth);
    const currentWidth = sourcePane.getBoundingClientRect().width;
    const delta = event.key === "ArrowLeft" ? -32 : 32;
    const nextWidth = currentWidth + delta;
    if (nextWidth < SOURCE_COLLAPSE_THRESHOLD) {
      setSourceCollapsed(true);
      return;
    }
    if (bounds.width - fileWidth - nextWidth - splitter.offsetWidth < PDF_COLLAPSE_THRESHOLD) {
      setPdfCollapsed(true);
      return;
    }
    if (workspace.classList.contains("pdf-hidden")) setPdfCollapsed(false);
    workspace.style.setProperty("--editor-width", `${Math.min(maxLeft, Math.max(MIN_EDITOR_WIDTH, nextWidth))}px`);
    renderPdf({ showLoading: false });
  });
}

function updateLogState() {
  previewPane.classList.toggle("log-collapsed", compileLogPanel.classList.contains("log-collapsed"));
}

function updateStats() {
  if (activeMediaFile) {
    sourceStats.textContent = "image preview";
    return;
  }
  const text = getSourceText();
  const lines = text ? text.split("\n").length : 0;
  const words = (text.match(/\b[\w'-]+\b/g) || []).length;
  sourceStats.textContent = `${lines.toLocaleString()} lines · ${words.toLocaleString()} words`;
  updateRelativeLineNumbers();
}

function setSaveState(message, type) {
  saveState.textContent = message;
  setStatusClass(saveState, type);
  updateTopSaveStatus(message, type);
}

function updateTopSaveStatus(message, type) {
  const status = saveStatusForMessage(message, type);
  topSaveStatusButton.dataset.saveStatus = status.kind;
  topSaveStatusButton.title = message;
  topSaveStatusLabel.textContent = status.label;
}

function saveStatusForMessage(message, type) {
  const text = String(message || "").toLowerCase();

  if (type === "error" || text.includes("failed")) return { kind: "error", label: "Error" };
  if (text.includes("saving") || text.includes("pending") || text.includes("loading")) return { kind: "busy", label: "Saving" };
  if (text.includes("unsaved")) return { kind: "unsaved", label: "Unsaved" };
  if (type === "ok" || text.includes("saved")) return { kind: "saved", label: "Saved" };
  return { kind: "neutral", label: message || "Not loaded" };
}

function setCompileState(message, type) {
  compileState.textContent = message;
  setStatusClass(compileState, type);
}

function setStatusClass(node, type) {
  node.classList.remove("status-ok", "status-error");
  if (type === "ok") node.classList.add("status-ok");
  if (type === "error") node.classList.add("status-error");
}

function setBusy(value) {
  if (saveButton) saveButton.disabled = value;
  compileButton.disabled = value;
  openPdfButton.disabled = value;
  downloadPdfButton.disabled = value;
  if (downloadPackageButton) downloadPackageButton.disabled = value;
  if (pushGithubButton) pushGithubButton.disabled = value;
  if (pullGithubButton) pullGithubButton.disabled = value;
  if (saveProjectSettingsButton) saveProjectSettingsButton.disabled = value;
  if (pullProjectGithubButton) pullProjectGithubButton.disabled = value;
  if (pdfReaderButton) pdfReaderButton.disabled = value;
}

function setProjectBusy(value) {
  addProjectButton.disabled = value;
  templatesButton.disabled = value;
  importTemplateButton.disabled = value;
  refreshProjectsButton.disabled = value;
}

function timeStamp() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function relativeTime(value) {
  if (!value) return "recently";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "recently";

  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.round(hours / 24);
  if (days < 14) return `${days} day${days === 1 ? "" : "s"} ago`;

  return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

function formatError(error) {
  if (!error) return "Unknown error.";
  if (typeof error === "string") return error;
  return error.message || JSON.stringify(error, null, 2);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function extractVisualMeta(tex) {
  return {
    title: latexToVisual(extractCommandBody(tex, "title"))
  };
}

function extractCommandBody(tex, command) {
  const pattern = new RegExp(`\\\\${command}\\{`);
  const match = pattern.exec(tex);
  if (!match) return "";

  let depth = 1;
  let cursor = match.index + match[0].length;
  while (cursor < tex.length) {
    const char = tex[cursor];
    const previous = tex[cursor - 1];
    if (char === "{" && previous !== "\\") depth += 1;
    if (char === "}" && previous !== "\\") depth -= 1;
    if (depth === 0) return tex.slice(match.index + match[0].length, cursor);
    cursor += 1;
  }

  return "";
}

function extractCommandArguments(tex, command, count) {
  const pattern = new RegExp(`\\\\${command}\\*?`);
  const match = pattern.exec(tex);
  if (!match) return [];

  const args = [];
  let cursor = match.index + match[0].length;

  while (args.length < count && cursor < tex.length) {
    while (/\s/.test(tex[cursor] || "")) cursor += 1;
    if (tex[cursor] !== "{") break;

    const start = cursor + 1;
    let depth = 1;
    cursor = start;

    while (cursor < tex.length) {
      const char = tex[cursor];
      const previous = tex[cursor - 1];
      if (char === "{" && previous !== "\\") depth += 1;
      if (char === "}" && previous !== "\\") depth -= 1;
      if (depth === 0) {
        args.push(tex.slice(start, cursor));
        cursor += 1;
        break;
      }
      cursor += 1;
    }
  }

  return args;
}

function leadingWhitespaceLength(value) {
  const match = value.match(/^\s*/);
  return match ? match[0].length : 0;
}

function trailingWhitespaceLength(value) {
  const match = value.match(/\s*$/);
  return match ? match[0].length : 0;
}

var loadNotesForActiveProject;

function renderMarkdownToHtml(source) {
  const inline = (text) => escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/~~([^~]+)~~/g, "<del>$1</del>")
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');

  const lines = source.split("\n");
  const out = [];
  let list = null;
  let inCode = false;
  let codeLines = [];
  let quote = [];
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  const closeQuote = () => { if (quote.length) { out.push("<blockquote>" + quote.join("<br>") + "</blockquote>"); quote = []; } };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^```/.test(line.trim())) {
      if (inCode) {
        out.push("<pre><code>" + escapeHtml(codeLines.join("\n")) + "</code></pre>");
        codeLines = [];
        inCode = false;
      } else {
        closeList();
        closeQuote();
        inCode = true;
      }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    if (/^\s*\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      closeList();
      closeQuote();
      const parseRow = (row) => row.trim().replace(/^\||\|$/g, "").split("|").map((cell) => inline(cell.trim()));
      let html = "<table><thead><tr>" + parseRow(line).map((cell) => `<th>${cell}</th>`).join("") + "</tr></thead><tbody>";
      let j = i + 2;
      while (j < lines.length && /^\s*\|.*\|\s*$/.test(lines[j])) {
        html += "<tr>" + parseRow(lines[j]).map((cell) => `<td>${cell}</td>`).join("") + "</tr>";
        j += 1;
      }
      out.push(html + "</tbody></table>");
      i = j - 1;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      closeList();
      closeQuote();
      out.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`);
      continue;
    }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) { closeList(); closeQuote(); out.push("<hr>"); continue; }
    const quoted = line.match(/^\s*>\s?(.*)$/);
    if (quoted) { closeList(); quote.push(inline(quoted[1])); continue; }
    closeQuote();
    const check = line.match(/^\s*[-*]\s+\[([ xX])\]\s+(.*)$/);
    if (check) {
      if (list !== "ul") { closeList(); out.push("<ul>"); list = "ul"; }
      const checked = check[1].toLowerCase() === "x";
      out.push(`<li class="notes-check"><input type="checkbox" data-md-line="${i}"${checked ? " checked" : ""}><span${checked ? ' class="notes-done"' : ""}>${inline(check[2])}</span></li>`);
      continue;
    }
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) {
      if (list !== "ul") { closeList(); out.push("<ul>"); list = "ul"; }
      out.push(`<li>${inline(bullet[1])}</li>`);
      continue;
    }
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (numbered) {
      if (list !== "ol") { closeList(); out.push("<ol>"); list = "ol"; }
      out.push(`<li>${inline(numbered[1])}</li>`);
      continue;
    }
    closeList();
    if (!line.trim()) continue;
    out.push(`<p>${inline(line)}</p>`);
  }
  if (inCode) out.push("<pre><code>" + escapeHtml(codeLines.join("\n")) + "</code></pre>");
  closeList();
  closeQuote();
  return out.join("\n");
}

function notesHtmlToMarkdown(root) {
  const inline = (node) => {
    let out = "";
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) { out += child.textContent; return; }
      if (child.nodeType !== Node.ELEMENT_NODE) return;
      const tag = child.tagName;
      if (tag === "INPUT") return;
      const inner = inline(child);
      if (tag === "STRONG" || tag === "B") out += `**${inner}**`;
      else if (tag === "EM" || tag === "I") out += `*${inner}*`;
      else if (tag === "DEL" || tag === "S" || tag === "STRIKE") out += `~~${inner}~~`;
      else if (tag === "CODE") out += "`" + child.textContent + "`";
      else if (tag === "A") out += `[${inner}](${child.getAttribute("href") || ""})`;
      else if (tag === "IMG") out += `![${child.getAttribute("alt") || ""}](${child.getAttribute("src") || ""})`;
      else if (tag === "BR") out += "\n";
      else out += inner;
    });
    return out;
  };

  const blocks = [];
  const walkBlocks = (parent) => {
    parent.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text) blocks.push(text);
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName;
      if (/^H[1-6]$/.test(tag)) blocks.push("#".repeat(Number(tag[1])) + " " + inline(node).trim());
      else if (tag === "HR") blocks.push("---");
      else if (tag === "PRE") blocks.push("```\n" + node.textContent.replace(/\n$/, "") + "\n```");
      else if (tag === "BLOCKQUOTE") blocks.push(inline(node).split("\n").map((line) => "> " + line).join("\n"));
      else if (tag === "UL" || tag === "OL") {
        const lines = [];
        Array.from(node.children).forEach((li, index) => {
          if (li.tagName !== "LI") return;
          const box = li.querySelector("input[type=checkbox]");
          const text = inline(li).trim();
          if (box) lines.push(`- [${box.checked ? "x" : " "}] ${text}`);
          else if (tag === "UL") lines.push(`- ${text}`);
          else lines.push(`${index + 1}. ${text}`);
        });
        if (lines.length) blocks.push(lines.join("\n"));
      } else if (tag === "TABLE") {
        const rows = Array.from(node.querySelectorAll("tr"));
        if (!rows.length) return;
        const lines = rows.map((row) => "| " + Array.from(row.children).map((cell) => inline(cell).trim()).join(" | ") + " |");
        lines.splice(1, 0, "| " + Array.from(rows[0].children).map(() => "---").join(" | ") + " |");
        blocks.push(lines.join("\n"));
      } else if (tag === "P" || tag === "DIV") {
        if (node.querySelector("h1,h2,h3,h4,h5,h6,ul,ol,table,pre,blockquote")) { walkBlocks(node); return; }
        const text = inline(node).trim();
        if (text) blocks.push(text);
      } else {
        const text = inline(node).trim();
        if (text) blocks.push(text);
      }
    });
  };
  walkBlocks(root);
  return blocks.join("\n\n");
}

function setupTooltips() {
  const tip = document.createElement("div");
  tip.id = "appTooltip";
  tip.setAttribute("role", "tooltip");
  tip.hidden = true;
  document.body.appendChild(tip);
  let showTimer = null;
  let currentTarget = null;

  const adopt = (el) => {
    if (el.hasAttribute("title")) {
      const title = el.getAttribute("title");
      if (title) el.dataset.tip = title;
      el.removeAttribute("title");
    }
    if (!el.dataset.tip && el.matches("button, [role=button], a, input, select")) {
      const aria = el.getAttribute("aria-label");
      if (aria && !(el.textContent || "").trim()) el.dataset.tip = aria;
    }
  };

  const hasVisibleLabel = (el) => {
    const clone = el.cloneNode(true);
    clone.querySelectorAll(".visually-hidden, .refresh-glyph, .notes-md-glyph").forEach((node) => node.remove());
    return /[A-Za-z0-9]/.test((clone.textContent || "").trim());
  };

  const findTarget = (node) => {
    let el = node instanceof Element ? node : null;
    while (el && el !== document.body) {
      adopt(el);
      if (el.dataset.tip) return el;
      el = el.parentElement;
    }
    return null;
  };

  const hide = () => {
    clearTimeout(showTimer);
    showTimer = null;
    currentTarget = null;
    tip.hidden = true;
    tip.classList.remove("visible");
  };

  const show = (target) => {
    if (!document.contains(target)) return;
    const rect = target.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    tip.textContent = target.dataset.tip;
    tip.hidden = false;
    const tipRect = tip.getBoundingClientRect();
    let x = rect.left + rect.width / 2 - tipRect.width / 2;
    x = Math.max(8, Math.min(x, window.innerWidth - tipRect.width - 8));
    let y = rect.bottom + 8;
    if (y + tipRect.height > window.innerHeight - 8) y = rect.top - tipRect.height - 8;
    tip.style.left = `${Math.round(x)}px`;
    tip.style.top = `${Math.round(y)}px`;
    tip.classList.add("visible");
  };

  document.addEventListener("mouseover", (event) => {
    const target = findTarget(event.target);
    if (!target) {
      hide();
      return;
    }
    if (target === currentTarget) return;
    clearTimeout(showTimer);
    currentTarget = target;
    showTimer = setTimeout(() => show(target), 110);
  }, true);

  document.addEventListener("mouseout", (event) => {
    if (!currentTarget || !(event.target instanceof Element) || !currentTarget.contains(event.target)) return;
    const next = event.relatedTarget;
    if (!next || !(next instanceof Element) || !currentTarget.contains(next)) hide();
  }, true);

  ["mousedown", "wheel", "keydown"].forEach((type) => window.addEventListener(type, hide, true));
  window.addEventListener("scroll", hide, true);
  window.addEventListener("blur", () => hide());
}

function setupNotesPanel() {
  const shell = document.querySelector(".pdf-viewer-shell");
  const panel = document.getElementById("notesPanel");
  if (!shell || !panel) return;
  const railButton = document.getElementById("notesRailButton");
  const fullscreenButton = document.getElementById("notesFullscreenButton");
  const clearButton = document.getElementById("notesClearButton");
  const modeTextButton = document.getElementById("notesModeTextButton");
  const modeDrawButton = document.getElementById("notesModeDrawButton");
  const textArea = document.getElementById("notesText");
  const canvasWrap = document.getElementById("notesCanvasWrap");
  const canvas = document.getElementById("notesCanvas");
  const drawToolsBar = canvasWrap.querySelector(".notes-draw-tools");
  const previewButton = document.getElementById("notesPreviewButton");
  const previewPaneEl = document.getElementById("notesPreview");
  const settingsToggle = document.getElementById("settingsNotesToggle");
  const ctx = canvas.getContext("2d");

  let drawTool = "pen";
  let drawColor = "ink";
  let drawSize = 3.5;
  let drawingPointer = null;
  let lastPoint = null;
  let shapeSnapshot = null;
  let notesPreviewOn = false;
  let notesPdfRerenderTimer = null;
  let pendingDrawData = null;
  let textSaveTimer = null;
  let drawSaveTimer = null;

  const notesKey = (kind) => `latexStudioNotes${kind}:${(activeProject && activeProject.id) || "global"}`;
  const isDrawMode = () => !canvasWrap.hidden;

  function canvasCssSize() {
    const rect = canvas.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  let strokes = [];
  let activeStroke = null;
  let baseImage = null;
  let drawUndoStack = [];
  let drawRedoStack = [];
  const pendingErase = new Set();
  const boardDpr = () => window.devicePixelRatio || 1;

  function pushDrawHistory() {
    drawUndoStack.push(strokes.slice());
    if (drawUndoStack.length > 60) drawUndoStack.shift();
    drawRedoStack = [];
  }

  function undoDraw() {
    if (!drawUndoStack.length) return;
    drawRedoStack.push(strokes.slice());
    strokes = drawUndoStack.pop();
    pendingErase.clear();
    redrawBoard();
    scheduleDrawSave();
  }

  function redoDraw() {
    if (!drawRedoStack.length) return;
    drawUndoStack.push(strokes.slice());
    strokes = drawRedoStack.pop();
    pendingErase.clear();
    redrawBoard();
    scheduleDrawSave();
  }

  function resolveDrawColor(color) {
    if (color !== "ink") return color;
    const themed = getComputedStyle(document.body).getPropertyValue("--cm-text").trim();
    return themed || "#111827";
  }

  function applyStrokeStyle(target, stroke) {
    target.globalAlpha = stroke.tool === "highlighter" ? 0.35 : 1;
    target.globalCompositeOperation = "source-over";
    target.strokeStyle = resolveDrawColor(stroke.color);
    target.lineWidth = stroke.tool === "highlighter" ? stroke.size * 4 : stroke.size;
    target.lineCap = "round";
    target.lineJoin = "round";
  }

  function drawStroke(target, stroke) {
    applyStrokeStyle(target, stroke);
    if (pendingErase.has(stroke)) {
      target.strokeStyle = "#9ca3af";
      target.globalAlpha = 0.45;
    }
    target.beginPath();
    if (stroke.points) {
      const points = stroke.points;
      if (!points.length) return;
      target.moveTo(points[0].x, points[0].y);
      if (points.length === 1) target.lineTo(points[0].x + 0.01, points[0].y);
      for (let i = 1; i < points.length; i += 1) target.lineTo(points[i].x, points[i].y);
    } else if (stroke.tool === "line" || stroke.tool === "arrow") {
      target.moveTo(stroke.from.x, stroke.from.y);
      target.lineTo(stroke.to.x, stroke.to.y);
      if (stroke.tool === "arrow") {
        const angle = Math.atan2(stroke.to.y - stroke.from.y, stroke.to.x - stroke.from.x);
        const head = 10 + stroke.size * 2;
        target.moveTo(stroke.to.x, stroke.to.y);
        target.lineTo(stroke.to.x - head * Math.cos(angle - Math.PI / 6), stroke.to.y - head * Math.sin(angle - Math.PI / 6));
        target.moveTo(stroke.to.x, stroke.to.y);
        target.lineTo(stroke.to.x - head * Math.cos(angle + Math.PI / 6), stroke.to.y - head * Math.sin(angle + Math.PI / 6));
      }
    } else if (stroke.tool === "rect") {
      target.rect(Math.min(stroke.from.x, stroke.to.x), Math.min(stroke.from.y, stroke.to.y), Math.abs(stroke.to.x - stroke.from.x), Math.abs(stroke.to.y - stroke.from.y));
    } else if (stroke.tool === "ellipse") {
      target.ellipse((stroke.from.x + stroke.to.x) / 2, (stroke.from.y + stroke.to.y) / 2, Math.abs(stroke.to.x - stroke.from.x) / 2, Math.abs(stroke.to.y - stroke.from.y) / 2, 0, 0, Math.PI * 2);
    }
    target.stroke();
    target.globalAlpha = 1;
  }

  function redrawBoard() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, rect.width, rect.height);
    if (baseImage) {
      const dpr = boardDpr();
      ctx.drawImage(baseImage, 0, 0, baseImage.width / dpr, baseImage.height / dpr);
    }
    strokes.forEach((stroke) => drawStroke(ctx, stroke));
  }

  function syncCanvasSize() {
    if (canvasWrap.hidden || !panel.classList.contains("notes-open")) return;
    const { width, height } = canvasCssSize();
    if (width < 2 || height < 2) return;
    const dpr = boardDpr();
    const nextWidth = Math.round(width * dpr);
    const nextHeight = Math.round(height * dpr);
    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    redrawBoard();
  }

  function restorePendingDrawing() {
    if (!pendingDrawData) {
      return;
    }
    const data = pendingDrawData;
    pendingDrawData = null;
    const image = new Image();
    image.onload = () => {
      baseImage = image;
      redrawBoard();
    };
    image.src = data;
  }

  function distanceToSegment(point, a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const lengthSq = dx * dx + dy * dy;
    if (!lengthSq) return Math.hypot(point.x - a.x, point.y - a.y);
    let t = ((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSq;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy));
  }

  function strokeHit(stroke, point, radius) {
    const reach = radius + (stroke.tool === "highlighter" ? stroke.size * 2 : stroke.size / 2);
    if (stroke.points) {
      const points = stroke.points;
      if (points.length === 1) return Math.hypot(point.x - points[0].x, point.y - points[0].y) <= reach;
      for (let i = 1; i < points.length; i += 1) {
        if (distanceToSegment(point, points[i - 1], points[i]) <= reach) return true;
      }
      return false;
    }
    if (stroke.tool === "line" || stroke.tool === "arrow") {
      return distanceToSegment(point, stroke.from, stroke.to) <= reach;
    }
    if (stroke.tool === "rect") {
      const x1 = Math.min(stroke.from.x, stroke.to.x);
      const x2 = Math.max(stroke.from.x, stroke.to.x);
      const y1 = Math.min(stroke.from.y, stroke.to.y);
      const y2 = Math.max(stroke.from.y, stroke.to.y);
      const corners = [{ x: x1, y: y1 }, { x: x2, y: y1 }, { x: x2, y: y2 }, { x: x1, y: y2 }];
      for (let i = 0; i < 4; i += 1) {
        if (distanceToSegment(point, corners[i], corners[(i + 1) % 4]) <= reach) return true;
      }
      return false;
    }
    if (stroke.tool === "ellipse") {
      const cx = (stroke.from.x + stroke.to.x) / 2;
      const cy = (stroke.from.y + stroke.to.y) / 2;
      const rx = Math.max(1, Math.abs(stroke.to.x - stroke.from.x) / 2);
      const ry = Math.max(1, Math.abs(stroke.to.y - stroke.from.y) / 2);
      let prev = { x: cx + rx, y: cy };
      for (let i = 1; i <= 32; i += 1) {
        const angle = (i / 32) * Math.PI * 2;
        const next = { x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) };
        if (distanceToSegment(point, prev, next) <= reach) return true;
        prev = next;
      }
      return false;
    }
    return false;
  }

  function markEraseAt(point) {
    let changed = false;
    strokes.forEach((stroke) => {
      if (!pendingErase.has(stroke) && strokeHit(stroke, point, 12)) {
        pendingErase.add(stroke);
        changed = true;
      }
    });
    if (changed) redrawBoard();
  }

  function commitErase() {
    if (!pendingErase.size) return;
    pushDrawHistory();
    strokes = strokes.filter((stroke) => !pendingErase.has(stroke));
    pendingErase.clear();
    redrawBoard();
    scheduleDrawSave();
  }

  function scheduleTextSave() {
    clearTimeout(textSaveTimer);
    textSaveTimer = setTimeout(() => localStorage.setItem(notesKey("Text"), textArea.value), 350);
  }

  function scheduleDrawSave() {
    clearTimeout(drawSaveTimer);
    drawSaveTimer = setTimeout(() => {
      try {
        localStorage.setItem(notesKey("Strokes"), JSON.stringify(strokes));
      } catch (error) {
        // Storage full; strokes stay in memory only.
      }
    }, 500);
  }

  function setNotesOpen(open, { persist = true } = {}) {
    panel.classList.toggle("notes-open", open);
    if (persist) localStorage.setItem("latexStudioNotesOpen", String(open));
    if (!open) setNotesFullscreen(false);
    if (open) requestAnimationFrame(() => { syncCanvasSize(); restorePendingDrawing(); });
    clearTimeout(notesPdfRerenderTimer);
    notesPdfRerenderTimer = setTimeout(() => renderPdf({ showLoading: false }), 220);
  }

  function setNotesMode(mode, { persist = true } = {}) {
    const draw = mode === "draw";
    modeTextButton.classList.toggle("active", !draw);
    modeDrawButton.classList.toggle("active", draw);
    textArea.hidden = draw || notesPreviewOn;
    canvasWrap.hidden = !draw;
    previewPaneEl.hidden = draw || !notesPreviewOn;
    if (!draw && notesPreviewOn) renderNotesPreview();
    const toolbarEl = document.getElementById("notesToolbar");
    if (toolbarEl) toolbarEl.hidden = draw;
    if (persist) localStorage.setItem("latexStudioNotesMode", draw ? "draw" : "text");
    if (draw) requestAnimationFrame(() => { syncCanvasSize(); restorePendingDrawing(); });
  }

  function setNotesFullscreen(on) {
    panel.classList.toggle("notes-fullscreen", on);
    fullscreenButton.setAttribute("aria-pressed", String(on));
    fullscreenButton.title = on ? "Exit fullscreen notes" : "Fullscreen notes";
    // Ancestor backdrop-filters trap position: fixed, so fullscreen lives on <body>.
    if (on && panel.parentElement !== document.body) document.body.appendChild(panel);
    if (!on && panel.parentElement !== workspace) workspace.appendChild(panel);
    requestAnimationFrame(() => { syncCanvasSize(); restorePendingDrawing(); });
  }

  function setNotesEnabled(enabled, { persist = true } = {}) {
    panel.classList.toggle("notes-off", !enabled);
    if (!enabled) setNotesFullscreen(false);
    if (settingsToggle) settingsToggle.checked = enabled;
    if (persist) localStorage.setItem("latexStudioNotesEnabled", String(enabled));
  }

  function notesCapWidth() {
    const wsWidth = Math.min(workspace.getBoundingClientRect().width, window.innerWidth);
    const pdfHidden = workspace.classList.contains("pdf-hidden");
    const sourceHidden = workspace.classList.contains("source-hidden");
    if (pdfHidden && sourceHidden) return wsWidth - 170;
    if (pdfHidden) return wsWidth - 460;
    return wsWidth - 720;
  }

  function setNotesWidth(width, { persist = true } = {}) {
    const clamped = clampNumber(width, 220, Math.max(260, Math.round(notesCapWidth())), 400);
    panel.style.setProperty("--notes-width", `${Math.round(clamped)}px`);
    if (persist) localStorage.setItem("latexStudioNotesWidth", String(Math.round(clamped)));
  }

  function setupNotesResize() {
    const handle = document.getElementById("notesResizeHandle");
    if (!handle) return;
    let dragStartX = 0;
    let dragStartWidth = 0;

    const stopDragging = (event) => {
      if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
      document.body.classList.remove("is-resizing-notes");
      window.removeEventListener("pointermove", resize);
      window.removeEventListener("pointerup", stopDragging);
      if (panel.classList.contains("notes-open")) setNotesWidth(panel.getBoundingClientRect().width);
      requestAnimationFrame(() => { syncCanvasSize(); restorePendingDrawing(); renderPdf({ showLoading: false }); });
    };

    const resize = (event) => {
      const nextWidth = dragStartWidth + dragStartX - event.clientX;
      if (nextWidth < 140) {
        setNotesOpen(false);
        stopDragging(event);
        return;
      }
      // Dragging past the cap collapses the PDF, then the code editor;
      // dragging back restores them in reverse order.
      const wsWidth = Math.min(workspace.getBoundingClientRect().width, window.innerWidth);
      const pdfHidden = () => workspace.classList.contains("pdf-hidden");
      const sourceHidden = () => workspace.classList.contains("source-hidden");
      if (nextWidth > notesCapWidth() + 60) {
        if (!pdfHidden()) setPdfCollapsed(true);
        else if (!sourceHidden()) setSourceCollapsed(true);
      } else if (pdfHidden() && sourceHidden()) {
        if (nextWidth < wsWidth - 460 - 80) setSourceCollapsed(false);
      } else if (pdfHidden()) {
        if (nextWidth < wsWidth - 720 - 80) setPdfCollapsed(false);
      }
      setNotesWidth(nextWidth, { persist: false });
    };

    handle.addEventListener("pointerdown", (event) => {
      dragStartX = event.clientX;
      dragStartWidth = panel.getBoundingClientRect().width;
      handle.setPointerCapture(event.pointerId);
      document.body.classList.add("is-resizing-notes");
      window.addEventListener("pointermove", resize);
      window.addEventListener("pointerup", stopDragging);
    });

    handle.addEventListener("pointerup", () => {
      localStorage.setItem("latexStudioNotesWidth", String(Math.round(panel.getBoundingClientRect().width)));
    });

    handle.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const delta = event.key === "ArrowLeft" ? 24 : -24;
      setNotesWidth(panel.getBoundingClientRect().width + delta);
    });
  }

  function selectDrawControl(button) {
    if (button.dataset.notesTool) {
      drawTool = button.dataset.notesTool;
      drawToolsBar.querySelectorAll("[data-notes-tool]").forEach((item) => item.classList.toggle("active", item === button));
    } else if (button.dataset.notesColor) {
      drawColor = button.dataset.notesColor;
      drawToolsBar.querySelectorAll("[data-notes-color]").forEach((item) => item.classList.toggle("active", item === button));
    } else if (button.dataset.notesSize) {
      drawSize = Number(button.dataset.notesSize);
      drawToolsBar.querySelectorAll("[data-notes-size]").forEach((item) => item.classList.toggle("active", item === button));
    }
  }

  const isShapeTool = () => ["line", "arrow", "rect", "ellipse"].includes(drawTool);

  function pointFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  canvas.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    drawingPointer = event.pointerId;
    try { canvas.setPointerCapture(event.pointerId); } catch (error) { /* synthetic pointers */ }
    const point = pointFromEvent(event);
    lastPoint = point;
    if (drawTool === "eraser") {
      pendingErase.clear();
      markEraseAt(point);
      return;
    }
    if (isShapeTool()) {
      activeStroke = { tool: drawTool, color: drawColor, size: drawSize, from: point, to: point };
      shapeSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } else {
      activeStroke = { tool: drawTool, color: drawColor, size: drawSize, points: [point] };
    }
  });

  canvas.addEventListener("pointermove", (event) => {
    if (drawingPointer !== event.pointerId || !lastPoint) return;
    const next = pointFromEvent(event);
    if (drawTool === "eraser") {
      markEraseAt(next);
      lastPoint = next;
      return;
    }
    if (!activeStroke) return;
    if (isShapeTool()) {
      activeStroke.to = next;
      if (shapeSnapshot) ctx.putImageData(shapeSnapshot, 0, 0);
      drawStroke(ctx, activeStroke);
    } else {
      activeStroke.points.push(next);
      if (activeStroke.tool === "highlighter") {
        // Redraw the highlighter as one path. Painting individual translucent
        // segments stacks alpha at every sample and creates visible dots.
        redrawBoard();
        drawStroke(ctx, activeStroke);
      } else {
        applyStrokeStyle(ctx, activeStroke);
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
    lastPoint = next;
  });

  const endStroke = (event) => {
    if (drawingPointer !== event.pointerId) return;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    if (drawTool === "eraser") {
      if (event.type === "pointercancel") {
        pendingErase.clear();
        redrawBoard();
      } else {
        commitErase();
      }
    }
    if (activeStroke) {
      pushDrawHistory();
      strokes.push(activeStroke);
      if (activeStroke.tool === "highlighter") redrawBoard();
      scheduleDrawSave();
    }
    activeStroke = null;
    drawingPointer = null;
    lastPoint = null;
    shapeSnapshot = null;
  };
  canvas.addEventListener("pointerup", endStroke);
  canvas.addEventListener("pointercancel", endStroke);

  drawToolsBar.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-notes-draw]");
    if (actionButton) {
      if (actionButton.dataset.notesDraw === "undo") undoDraw();
      else if (actionButton.dataset.notesDraw === "redo") redoDraw();
      return;
    }
    const button = event.target.closest("button");
    if (button) selectDrawControl(button);
  });

  railButton.addEventListener("click", () => setNotesOpen(true));
  fullscreenButton.addEventListener("click", () => setNotesFullscreen(!panel.classList.contains("notes-fullscreen")));
  modeTextButton.addEventListener("click", () => setNotesMode("text"));
  modeDrawButton.addEventListener("click", () => setNotesMode("draw"));
  let visualSyncTimer = null;

  function renderNotesPreview() {
    previewPaneEl.innerHTML = renderMarkdownToHtml(textArea.value);
    previewPaneEl.contentEditable = "true";
  }

  function syncVisualToSource() {
    textArea.value = notesHtmlToMarkdown(previewPaneEl);
    scheduleTextSave();
  }

  function scheduleVisualSync() {
    clearTimeout(visualSyncTimer);
    visualSyncTimer = setTimeout(syncVisualToSource, 350);
  }

  function setNotesPreview(on) {
    notesPreviewOn = on;
    previewButton.setAttribute("aria-pressed", String(on));
    previewButton.classList.toggle("active", on);
    if (canvasWrap.hidden) {
      textArea.hidden = on;
      previewPaneEl.hidden = !on;
      if (on) renderNotesPreview();
    }
  }

  previewButton.addEventListener("click", () => setNotesPreview(!notesPreviewOn));

  previewPaneEl.addEventListener("input", scheduleVisualSync);

  previewPaneEl.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (link && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if (window.localOverleaf && window.localOverleaf.openExternalLink) window.localOverleaf.openExternalLink(link.getAttribute("href"));
      return;
    }
    const box = event.target.closest("input[type=checkbox]");
    if (box) {
      const next = box.checked;
      event.preventDefault();
      setTimeout(() => {
        box.checked = next;
        const label = box.parentElement ? box.parentElement.querySelector("span") : null;
        if (label) label.classList.toggle("notes-done", next);
        syncVisualToSource();
      }, 0);
    }
  });

  clearButton.addEventListener("click", () => {
    if (isDrawMode()) {
      pushDrawHistory();
      strokes = [];
      baseImage = null;
      pendingDrawData = null;
      localStorage.removeItem(notesKey("Draw"));
      localStorage.removeItem(notesKey("Strokes"));
      redrawBoard();
    } else {
      textArea.value = "";
      localStorage.setItem(notesKey("Text"), "");
      if (notesPreviewOn) renderNotesPreview();
    }
  });

  textArea.addEventListener("input", scheduleTextSave);

  function surroundSelection(before, after = before, placeholder = "text") {
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selected = textArea.value.slice(start, end) || placeholder;
    textArea.setRangeText(before + selected + after, start, end, "end");
    textArea.selectionStart = start + before.length;
    textArea.selectionEnd = start + before.length + selected.length;
    textArea.focus();
    scheduleTextSave();
  }

  function prefixSelectedLines(prefixFor) {
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const value = textArea.value;
    const blockStart = value.lastIndexOf("\n", start - 1) + 1;
    const blockEndIndex = value.indexOf("\n", Math.max(end - 1, blockStart));
    const blockEnd = blockEndIndex === -1 ? value.length : blockEndIndex;
    const next = value
      .slice(blockStart, blockEnd)
      .split("\n")
      .map((line, index) => prefixFor(index) + line)
      .join("\n");
    textArea.setRangeText(next, blockStart, blockEnd, "end");
    textArea.focus();
    scheduleTextSave();
  }

  function insertBlock(text) {
    const start = textArea.selectionStart;
    const prefix = start === 0 || textArea.value[start - 1] === "\n" ? "" : "\n";
    textArea.setRangeText(prefix + text, start, textArea.selectionEnd, "end");
    textArea.focus();
    scheduleTextSave();
  }

  const toolbar = document.getElementById("notesToolbar");
  if (toolbar) {
    toolbar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-notes-md]");
      if (!button) return;
      const action = button.dataset.notesMd;
      if (notesPreviewOn && canvasWrap.hidden) {
        previewPaneEl.focus();
        const exec = (command, value = null) => document.execCommand(command, false, value);
        switch (action) {
          case "undo": exec("undo"); break;
          case "redo": exec("redo"); break;
          case "bold": exec("bold"); break;
          case "italic": exec("italic"); break;
          case "strike": exec("strikeThrough"); break;
          case "heading": exec("formatBlock", "<h2>"); break;
          case "bullet": exec("insertUnorderedList"); break;
          case "numbered": exec("insertOrderedList"); break;
          case "quote": exec("formatBlock", "<blockquote>"); break;
          case "code": exec("insertHTML", `<code>${escapeHtml(String(window.getSelection()) || "code")}</code>`); break;
          case "checklist": exec("insertHTML", '<ul><li class="notes-check"><input type="checkbox"><span>todo</span></li></ul>'); break;
          case "link": exec("createLink", "https://"); break;
          case "image": exec("insertHTML", '<img alt="alt" src="image-url">'); break;
          case "table": exec("insertHTML", "<table><thead><tr><th>Col 1</th><th>Col 2</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p></p>"); break;
        }
        scheduleVisualSync();
        return;
      }
      if (action === "undo" || action === "redo") {
        textArea.focus();
        document.execCommand(action);
        scheduleTextSave();
        return;
      }
      switch (action) {
        case "bold": surroundSelection("**"); break;
        case "italic": surroundSelection("*"); break;
        case "strike": surroundSelection("~~"); break;
        case "code": surroundSelection("`", "`", "code"); break;
        case "heading": prefixSelectedLines(() => "# "); break;
        case "bullet": prefixSelectedLines(() => "- "); break;
        case "numbered": prefixSelectedLines((index) => `${index + 1}. `); break;
        case "checklist": prefixSelectedLines(() => "- [ ] "); break;
        case "quote": prefixSelectedLines(() => "> "); break;
        case "link": surroundSelection("[", "](url)", "title"); break;
        case "image": insertBlock("![alt](image-url)\n"); break;
        case "table": insertBlock("| Col 1 | Col 2 |\n| --- | --- |\n|  |  |\n"); break;
      }
    });
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("notes-fullscreen")) setNotesFullscreen(false);
  });
  window.addEventListener("resize", () => requestAnimationFrame(syncCanvasSize));

  if (settingsToggle) {
    settingsToggle.addEventListener("change", () => setNotesEnabled(settingsToggle.checked));
  }

  loadNotesForActiveProject = () => {
    clearTimeout(textSaveTimer);
    clearTimeout(drawSaveTimer);
    setNotesOpen(false, { persist: false });
    textArea.value = localStorage.getItem(notesKey("Text")) || "";
    if (notesPreviewOn && canvasWrap.hidden) renderNotesPreview();
    try {
      strokes = JSON.parse(localStorage.getItem(notesKey("Strokes")) || "[]");
    } catch (error) {
      strokes = [];
    }
    baseImage = null;
    drawUndoStack = [];
    drawRedoStack = [];
    pendingErase.clear();
    pendingDrawData = localStorage.getItem(notesKey("Draw")) || null;
    redrawBoard();
    requestAnimationFrame(() => { syncCanvasSize(); restorePendingDrawing(); });
  };

  setupNotesResize();
  setNotesWidth(Number(localStorage.getItem("latexStudioNotesWidth")) || 400, { persist: false });
  setNotesEnabled(localStorage.getItem("latexStudioNotesEnabled") !== "false", { persist: false });
  setNotesOpen(false, { persist: false });
  setNotesMode(localStorage.getItem("latexStudioNotesMode") === "draw" ? "draw" : "text", { persist: false });
  loadNotesForActiveProject();
}
