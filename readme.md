# `advent-of-code` test harness

Requires the latest version of node.
Getting started a system with [`brew`](https://brew.sh):

```sh
brew install node pnpm
npx degit jakxz/advent-of-code
cd advent-of-code
pnpm install
pnpm test
```

For your actual submissions you'll want to use your own session by replacing the constant in the `shared/download-input.js` file.

> **Note**: you can also try a `.env` file with [`bun`](https://github.com/oven-sh/bun#install) instead of `pnpm` if you don't want to have to commit your token.
