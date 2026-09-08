<p align="center">
  <img src="assets/icon.png" width="80" alt="Openleaf">
</p>

# Openleaf

**All your research. In one place.**

Openleaf is a local desktop workspace for writing papers, running Python, and making slides. Keep your source files, results, and finished work together, with terminals and coding agents available inside the project.

[Website and demos](https://www.alex-dils.com/openleaf/) · [Docs](https://www.alex-dils.com/openleaf/docs) · [Latest release](https://github.com/axel-slid/openleaf/releases/latest) · [Contribute](#contributing)

## Three ways to work

| Write papers | Run Python | Make slides |
| --- | --- | --- |
| Edit LaTeX in source or visual mode, compile locally, and read the PDF alongside your manuscript. | Open scripts and notebooks, choose a Python interpreter, and run cells with a persistent kernel. | Open native PowerPoint files, edit text and slide elements, and present your deck. |

See the [feature reference](docs/features.md) for the full list.

## Install on macOS

```sh
curl -fsSL https://alex-dils.com/openleaf/install.sh | bash
```

## Run from source

Install Node.js, npm, and Git, then:

```sh
git clone https://github.com/axel-slid/openleaf.git
cd openleaf
npm install
npm start
```

## Contributing

Bug reports, documentation improvements, and code contributions are welcome.

1. [Find an issue](https://github.com/axel-slid/openleaf/issues), or open one describing what you want to change. For bugs, include your OS, steps to reproduce, and any relevant error output.
2. Fork the repository and create a branch from `dev`.
3. Make a focused change. Run `npm run check` and the tests relevant to it, then try the affected workflow in the app.
4. Open a pull request against `dev`, explaining the change and how you checked it.

Useful checks include `npm run test:include-compile` for LaTeX entry-file resolution and `npm run test:pptx` for PowerPoint work. See `package.json` for the available scripts and [AGENTS.md](AGENTS.md) for the branch policy.

For a larger feature, start with an [issue](https://github.com/axel-slid/openleaf/issues/new) so the scope can be discussed before implementation.
