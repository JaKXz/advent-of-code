# `advent-of-code` test harness

On a system with [`mise`](https://mise.jdx.dev/)

```sh
# clone the repo, e.g. npx degit jakxz/advent-of-code && cd $_
mise install
bun install
bun [--watch] <year>/<day>
```

> **Note**: you need to add an `.env` file, with contents like:

```
AOC_SESSION=<your_token>
```

> which you can get from your network session on adventofcode.com
