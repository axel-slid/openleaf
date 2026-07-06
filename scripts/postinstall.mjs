const isOpenleafBundleInstall = process.cwd().includes("Openleaf.app/Contents/Resources/app");

if (!isOpenleafBundleInstall) {
  console.log(`
Openleaf installed.

macOS desktop app:
  npx openleaf install

Local development:
  npm start
`);
}
