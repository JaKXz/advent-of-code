import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url);

const RELEVANT_FILE_TREE_INFO = /(?<size>^\d+).*$|^\$ cd (?<dir>\w+|\.+)$/;

function parseLines(d = data) {
  const lines = d.split("\n");
  let result = {};
  let currentPath = "/";
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const pathSplit = currentPath.split("/");

    const {
      groups: { size, dir },
    } = line.match(RELEVANT_FILE_TREE_INFO) ?? { groups: {} };
    if (dir === "..") {
      currentPath = `${pathSplit.slice(0, pathSplit.length - 2).join("/")}/`;
    } else if (dir != null) {
      currentPath += `${dir}/`;
    } else if (size != null) {
      for (let j = 0; j < pathSplit.length - 1; j++) {
        const path = `${pathSplit.slice(0, j + 1).join("/")}/`;
        if (result[path]) {
          result[path] += Number(size);
        } else {
          result[path] = Number(size);
        }
      }
    }
  }
  return result;
}

function getTotalEligibleDirsSizes(parsed = parseLines()) {
  return Object.entries(parsed).reduce(
    (acc, [_, size]) => (size > 100_000 ? acc : acc + size),
    0
  );
}

const exampleParsed = parseLines(`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`);

test("part 1 example", () => {
  assert.equal(getTotalEligibleDirsSizes(exampleParsed), 95437);
});

test("part 1", () => {
  assert.equal(getTotalEligibleDirsSizes(), 1886043);
});

function findDirToDelete(parsed = parseLines()) {
  const sorted = Object.entries(parsed).sort((a, b) => b[1] - a[1]);
  const SPACE_USED = sorted[0][1];
  const SPACE_AVAILABLE = 70_000_000 - SPACE_USED;
  const SPACE_NEEDED = 30_000_000 - SPACE_AVAILABLE;
  for (let i = sorted.length - 1; i > 0; i--) {
    const [_dir, size] = sorted[i];
    if (size >= SPACE_NEEDED) {
      return size;
    }
  }
}

test("part 2 example", () => {
  assert.equal(findDirToDelete(exampleParsed), 24933642);
});

test("part 2", () => {
  assert.equal(findDirToDelete(), 3842121);
});

test("is fast", async () => {
  console.log(await time(getTotalEligibleDirsSizes));
  console.log(await time(findDirToDelete));
});

test.run();
