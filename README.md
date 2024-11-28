# Fease

A composable function library for creating animation easing functions.

More information coming soon.

## Scripts

- `dev` or `start`: Start the dev server (vite) and run the demo code in your browser.
- `lint` : lint the code. You can also do `fix` to auto-fix.
- `test` : test with jest. Also `test:coverage` and `test:watch`
- `build` : bundle the code
- `commit` & `release` : see below
- `pushpub`: Used after `release` it pushes and publishes the library.
- `deploy`: Build the demo code (`index.html` and `src/demo`) and publish to gh-pages

## Commits & Releases

Code is automatically linted before being committed. I recommend installing the plugins for eslint and prettier in your code editor. You can attempt to fix linting issues with `yarn fix`.

When ready to commit, please commit using `yarn commit` to use commitizen for standard format commits.

When ready to release use `yarn release` with the `-r patch|minor|major` flag (default without the flag is `patch`).

You'll then need to publish your changes separately. That can be done with `yarn pushpub`.

You can deploy an updated demo to github pages using `yarn deploy`

## See also

- Easing function graph for pixi.js: [pixi-easing-graph](https://github.com/mimshwright/pixi-easing-graph)
- Project template: [vite-library-template](https://github.com/mimshwright/vite-library-template)
