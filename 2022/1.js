import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url);
const groupElves = (d = data) =>
  d
    .split("\n\n")
    .map((elf, i) => [
      i + 1,
      elf.split("\n").reduce((acc, cal) => acc + Number(cal), 0),
    ])
    .sort((a, b) => b[1] - a[1]);

test("returns elf with most calories", () => {
  assert.equal(groupElves()[0][1], 69281);
});

test("sum of the top 3 elves", () => {
  assert.equal(
    groupElves()
      .slice(0, 3)
      .reduce((acc, [_, cals]) => acc + cals, 0),
    201524
  );
});

test("is fast", async () => {
  console.log(await time(groupElves));
});

test.run();
