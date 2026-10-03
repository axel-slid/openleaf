// An automation is a small DAG of steps that turns selected files into a new
// Openleaf project: choose files, start from a LaTeX template, run one or more
// agent steps (Codex or Claude) with their own instructions, and compile.
// Steps run one at a time in topological order inside one project folder.
// Built-in automations ship with the app; user-made ones (and edits to
// built-ins) are stored as JSON in the app's userData folder.

const AUTOMATION_TEMPLATES = {
  "math-notes": {
    label: "Math notes",
    tex: (title) => String.raw`\documentclass[11pt]{article}
\usepackage[margin=1in]{geometry}
\usepackage{amsmath,amssymb,amsthm,mathtools}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{tikz}
\usepackage[hidelinks]{hyperref}

\setlength{\parindent}{0pt}
\setlength{\parskip}{6pt}

\theoremstyle{plain}
\newtheorem{theorem}{Theorem}[section]
\newtheorem{lemma}[theorem]{Lemma}
\newtheorem{proposition}[theorem]{Proposition}
\newtheorem{corollary}[theorem]{Corollary}
\theoremstyle{definition}
\newtheorem{definition}[theorem]{Definition}
\newtheorem{example}[theorem]{Example}
\newtheorem{exercise}[theorem]{Exercise}
\theoremstyle{remark}
\newtheorem*{remark}{Remark}
\newtheorem*{note}{Note}

% Unreadable handwriting: \illegible{best guess}
\newcommand{\illegible}[1]{\textcolor{red}{[#1?]}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\N}{\mathbb{N}}
\newcommand{\Z}{\mathbb{Z}}
\newcommand{\Q}{\mathbb{Q}}
\newcommand{\C}{\mathbb{C}}

\title{${title}}
\author{}
\date{}

\begin{document}
\maketitle

%% BEGIN NOTES
Transcription in progress.
%% END NOTES

\end{document}
`
  },
  "plain-notes": {
    label: "Plain notes",
    tex: (title) => String.raw`\documentclass[11pt]{article}
\usepackage[margin=1in]{geometry}
\usepackage{amsmath,amssymb}
\usepackage{xcolor}
\usepackage[hidelinks]{hyperref}

\setlength{\parindent}{0pt}
\setlength{\parskip}{6pt}

% Unreadable handwriting: \illegible{best guess}
\newcommand{\illegible}[1]{\textcolor{red}{[#1?]}}

\title{${title}}
\author{}
\date{}

\begin{document}
\maketitle

%% BEGIN NOTES
Transcription in progress.
%% END NOTES

\end{document}
`
  }
};

const MATH_NOTES_INSTRUCTIONS = `Transcribe my handwritten math notes into LaTeX.

- Keep the preamble and environments already in main.tex. Replace the text between "%% BEGIN NOTES" and "%% END NOTES". You may also set \\title and \\date in the preamble from the first page.
- Transcribe faithfully, in the order of the pages. Do not summarize, reorder, correct, or add content.
- Reproduce every equation exactly. Use align* for multi-line derivations and keep the steps I wrote.
- Use \\section and \\subsection for my headings, and the theorem, lemma, definition, example, remark, and proof environments where my notes use them.
- Use itemize or enumerate for lists, and tabular for tables.
- Redraw simple diagrams and graphs with TikZ. For anything too complex, write \\textit{[Figure: short description]}.
- Wrap anything you cannot read in \\illegible{best guess}.`;

const NODE_TYPES = {
  input: "Choose files",
  template: "Template",
  agent: "Agent step",
  compile: "Compile PDF"
};

const BUILT_IN_AUTOMATIONS = [
  {
    id: "transcribe-math-notes",
    name: "Transcribe math notes",
    description: "Turn scanned or photographed math notes into a typeset LaTeX PDF.",
    builtIn: true,
    nodes: [
      { id: "files", type: "input", label: "Choose notes", x: 24, y: 120 },
      { id: "template", type: "template", label: "Math notes template", template: "math-notes", x: 254, y: 120 },
      { id: "transcribe", type: "agent", label: "Transcribe", instructions: MATH_NOTES_INSTRUCTIONS, x: 484, y: 120 },
      { id: "compile", type: "compile", label: "Compile PDF", x: 714, y: 120 }
    ],
    edges: [
      { from: "files", to: "template" },
      { from: "template", to: "transcribe" },
      { from: "transcribe", to: "compile" }
    ]
  }
];

const AUTOMATION_SOURCE_EXTENSIONS = ["pdf", "png", "jpg", "jpeg", "heic", "heif", "tif", "tiff"];

function automationTemplateTex(templateId, title) {
  const template = AUTOMATION_TEMPLATES[templateId] || AUTOMATION_TEMPLATES["plain-notes"];
  const safeTitle = String(title || "Notes").replace(/[\\{}$&#^_%~]/g, " ").trim() || "Notes";
  return template.tex(safeTitle);
}

function automationTemplateOptions() {
  return Object.entries(AUTOMATION_TEMPLATES).map(([id, template]) => ({ id, label: template.label }));
}

// Automations saved before the graph editor had one template and one prompt.
function graphFromLegacy(record) {
  if (Array.isArray(record.nodes)) return record;
  return {
    ...record,
    nodes: [
      { id: "files", type: "input", label: "Choose files", x: 24, y: 120 },
      { id: "template", type: "template", label: "Template", template: record.template, x: 254, y: 120 },
      { id: "agent", type: "agent", label: "Agent step", instructions: record.instructions, x: 484, y: 120 },
      { id: "compile", type: "compile", label: "Compile PDF", x: 714, y: 120 }
    ],
    edges: [
      { from: "files", to: "template" },
      { from: "template", to: "agent" },
      { from: "agent", to: "compile" }
    ]
  };
}

// Kahn's algorithm. Ties keep the left-to-right order of the canvas so
// parallel branches run in the order they are drawn.
function automationStepOrder(automation) {
  const nodes = [...automation.nodes].sort((a, b) => a.x - b.x || a.y - b.y);
  const indegree = new Map(nodes.map((node) => [node.id, 0]));
  automation.edges.forEach((edge) => indegree.set(edge.to, indegree.get(edge.to) + 1));
  const ready = nodes.filter((node) => indegree.get(node.id) === 0);
  const order = [];
  while (ready.length) {
    const node = ready.shift();
    order.push(node);
    automation.edges
      .filter((edge) => edge.from === node.id)
      .forEach((edge) => {
        indegree.set(edge.to, indegree.get(edge.to) - 1);
        if (indegree.get(edge.to) === 0) {
          ready.push(nodes.find((item) => item.id === edge.to));
          ready.sort((a, b) => a.x - b.x || a.y - b.y);
        }
      });
  }
  if (order.length !== nodes.length) throw new Error("The steps contain a cycle. Remove an edge so every path flows one way.");
  return order;
}

function normalizeNode(node = {}) {
  const type = NODE_TYPES[node.type] ? node.type : "agent";
  const normalized = {
    id: String(node.id || "").trim().slice(0, 64),
    type,
    label: (String(node.label || "").trim() || NODE_TYPES[type]).slice(0, 60),
    x: Math.round(Number(node.x) || 0),
    y: Math.round(Number(node.y) || 0)
  };
  if (!normalized.id) throw new Error("Every step needs an id.");
  if (type === "template") normalized.template = AUTOMATION_TEMPLATES[node.template] ? node.template : "plain-notes";
  if (type === "agent") {
    normalized.instructions = String(node.instructions || "").trim().slice(0, 8000);
    if (!normalized.instructions) throw new Error(`Write instructions for the step "${normalized.label}".`);
  }
  return normalized;
}

function normalizeAutomation(record = {}) {
  const graph = graphFromLegacy(record);
  const name = String(graph.name || "").trim();
  if (!name) throw new Error("Give the automation a name.");
  const nodes = (graph.nodes || []).map(normalizeNode);
  const ids = new Set(nodes.map((node) => node.id));
  if (ids.size !== nodes.length) throw new Error("Two steps share the same id.");
  const inputs = nodes.filter((node) => node.type === "input");
  if (inputs.length !== 1) throw new Error("An automation needs exactly one Choose files step.");
  if (!nodes.some((node) => node.type === "agent")) throw new Error("Add at least one Agent step.");
  const edges = [];
  const seen = new Set();
  (graph.edges || []).forEach((edge) => {
    const from = String(edge.from || "");
    const to = String(edge.to || "");
    const key = `${from}->${to}`;
    if (!ids.has(from) || !ids.has(to) || from === to || seen.has(key)) return;
    seen.add(key);
    edges.push({ from, to });
  });
  if (edges.some((edge) => edge.to === inputs[0].id)) throw new Error("Choose files must be the first step.");
  const automation = {
    id: String(graph.id || "").trim(),
    name: name.slice(0, 80),
    description: String(graph.description || "").trim().slice(0, 200),
    builtIn: false,
    nodes,
    edges
  };
  automationStepOrder(automation);
  return automation;
}

// The full prompt wraps one step's instructions with the facts the agent
// needs about this run: where the pages are and what earlier steps did.
function automationPrompt(automation, node, pagePaths, completedSteps = []) {
  return [
    node.instructions,
    "",
    `This is the step "${node.label}" of the automation "${automation.name}".`,
    completedSteps.length ? `Earlier steps already finished: ${completedSteps.join(", ")}.` : "",
    "",
    "Source pages, in reading order (paths relative to the current directory):",
    ...pagePaths.map((pagePath, index) => `${index + 1}. ${pagePath}`),
    "",
    "Work on main.tex in the current directory. Do not modify or delete anything in sources/ or pages/.",
    "Before you stop, run `tectonic main.tex` and fix any LaTeX errors until it compiles cleanly."
  ].filter((line, index, lines) => line !== "" || lines[index - 1] !== "").join("\n");
}

// Returns the executable name and arguments for a non-interactive agent run.
// The prompt is sent on stdin so long instructions never hit argv limits.
function automationAgentCommand(agent, cwd, imagePaths) {
  if (agent === "claude") {
    return {
      executable: "claude",
      args: ["-p", "--output-format", "text", "--dangerously-skip-permissions", "--add-dir", cwd]
    };
  }
  if (agent === "codex") {
    // "-" (read the prompt from stdin) comes before --image, whose values are
    // variadic and would otherwise swallow it.
    return {
      executable: "codex",
      args: [
        "exec",
        "-",
        "--dangerously-bypass-approvals-and-sandbox",
        "--skip-git-repo-check",
        "--color", "never",
        "-C", cwd,
        ...imagePaths.flatMap((imagePath) => ["--image", imagePath])
      ]
    };
  }
  throw new Error("Choose Codex or Claude as the agent in Settings to run automations.");
}

module.exports = {
  BUILT_IN_AUTOMATIONS,
  AUTOMATION_SOURCE_EXTENSIONS,
  NODE_TYPES,
  automationTemplateTex,
  automationTemplateOptions,
  graphFromLegacy,
  automationStepOrder,
  normalizeAutomation,
  automationPrompt,
  automationAgentCommand
};
