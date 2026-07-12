const port = Number(process.env.OPENLEAF_DEBUG_PORT || 9342);
const projectPath = process.env.OPENLEAF_TEST_PROJECT || "/tmp/openleaf-regression-project";
const phase = process.env.OPENLEAF_HISTORY_PHASE || "verify";
const marker = "# openleaf persistent history relaunch check";

const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
if (!tabs.length) throw new Error("No Openleaf renderer tab was found.");

const socket = new WebSocket(tabs[0].webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let commandId = 0;
function evaluate(expression) {
  return new Promise((resolve, reject) => {
    const id = ++commandId;
    const onMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== id) return;
      socket.removeEventListener("message", onMessage);
      if (message.error || message.result?.exceptionDetails) reject(new Error(JSON.stringify(message.error || message.result.exceptionDetails)));
      else resolve(message.result.result.value);
    };
    socket.addEventListener("message", onMessage);
    socket.send(JSON.stringify({
      id,
      method: "Runtime.evaluate",
      params: { expression, awaitPromise: true, returnByValue: true }
    }));
  });
}

try {
  const result = await evaluate(`(async () => {
    const added = await window.localOverleaf.addProjectFromPath([${JSON.stringify(projectPath)}]);
    const project = added.project || (added.projects || []).find((item) => item.folderPath === ${JSON.stringify(projectPath)});
    await openProject(project.id);
    await loadProjectFile("sample.py", { preview: false });
    const marker = ${JSON.stringify(marker)};
    if (${JSON.stringify(phase)} === "seed") {
      const original = getSourceText();
      suppressSourceChange = true;
      setSourceText(original + "\\n" + marker);
      suppressSourceChange = false;
      recordHistoryEvent("Edited");
      suppressSourceChange = true;
      setSourceText(original);
      suppressSourceChange = false;
      return { phase: "seed", persisted: historyEvents.some((entry) => entry.text.includes(marker)), count: historyEvents.length };
    }
    resetHistoryEvents(getSourceText());
    return { phase: "verify", persisted: historyEvents.some((entry) => entry.text.includes(marker)), count: historyEvents.length };
  })()`);
  console.log(JSON.stringify(result));
  if (!result.persisted) process.exitCode = 1;
} finally {
  socket.close();
}
