import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";

const source = await readFile(new URL("../app.js", import.meta.url), "utf8");
const between = (start, end) => source.slice(source.indexOf(start), source.indexOf(end));

test("deleting a subject preserves documents and persists across automatic grouping", () => {
  const stored = new Map();
  const context = vm.createContext({
    localStorage: { getItem: (key) => stored.get(key), setItem: (key, value) => stored.set(key, value) },
    projects: [{ id: "reading", readingCollection: { subject: "Course", division: "Readings" }, readingFiles: [{}] }],
    projectCollections: [
      { id: "course", name: "Course", divisions: [{ id: "readings", projectIds: ["reading"] }] },
      { id: "other", name: "Other", divisions: [{ id: "notes", projectIds: [] }] }
    ],
    openProjectCollectionId: "course",
    renderProjectGrid() {},
    closeProjectCollection() { context.openProjectCollectionId = ""; },
    collectionIdentifier: () => "unexpected-new-collection"
  });
  vm.runInContext(
    between("function saveProjectCollections()", "function collectionIdentifier(") +
    between("function ensureCourseReadingCollections()", "function ensureDemogReadingCollection()") +
    between("function readDismissedSubjectProjects()", "function projectCollectionMembership("), context
  );
  context.deleteProjectCollection("course");
  assert.equal(context.projects.length, 1);
  assert.equal(context.projects[0].id, "reading");
  assert.equal(context.projectCollections.length, 1);
  assert.equal(context.projectCollections[0].id, "other");
  assert.equal(context.openProjectCollectionId, "");
  context.projectCollections = JSON.parse(stored.get("openleafProjectCollections"));
  context.ensureCourseReadingCollections();
  assert.equal(context.projectCollections.length, 1);
  assert.equal(context.projectCollections[0].id, "other");
});

for (const [name, expected] of [["", "Good morning"], ["Alex Dils", "Good morning, Alex"]]) {
  test(`greeting stays visible ${name ? "with" : "without"} a profile name`, () => {
    const title = { hidden: true, style: { display: "none" } };
    const context = vm.createContext({
      projectHeroTitle: title, aiProfile: { name },
      Date: class { getHours() { return 9; } },
      PROJECT_TIME_GREETINGS: { morning: { named: ["Good morning, {name}"], anonymous: ["Good morning"] } },
      localStorage: { getItem: () => null },
      clampNumber: () => 0
    });
    vm.runInContext(between("function updateProjectHeroGreeting(", "function profilePromptContext()"), context);
    context.updateProjectHeroGreeting();
    assert.equal(title.hidden, false);
    assert.equal(title.style.display, "");
    assert.equal(title.textContent, expected);
  });
}
