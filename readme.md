# `advent-of-code` test harness

Requires the latest version of node.
On a system with [`brew`](https://brew.sh) (run the equivalent for your package manager):

```sh
brew tap oven-sh/bun
brew install node bun
npx degit jakxz/advent-of-code
cd advent-of-code
bun install
bun run test
```

> **Note**: you need to add an `.env` file, with contents like:

```
AOC_SESSION=<your_token>
```

> which you can get from your network session on adventofcode.com
