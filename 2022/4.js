import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url);

const countPairsFullyContained = (d = data) =>
  d.split("\n").reduce((acc, line) => {
    const [a, b, c, d] = parseLineForBoundaries(line);
    return (a <= c && b >= d) || (c <= a && d >= b) ? acc + 1 : acc;
  }, 0);

function parseLineForBoundaries(line) {
  return line.replace(",", "-").split("-").map(Number);
}

test("part 1", () => {
  assert.equal(
    countPairsFullyContained(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`),
    2
  );
  assert.equal(countPairsFullyContained(), 509);
});

const countPairsPartiallyContained = (d = data) =>
  d.split("\n").reduce((acc, line) => {
    const [a, b, c, d] = parseLineForBoundaries(line);
    return b < c || d < a ? acc : acc + 1;
  }, 0);

test("part 2", () => {
  assert.equal(
    countPairsPartiallyContained(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`),
    4
  );
  assert.equal(countPairsPartiallyContained(), 870);
});

test("is fast", async () => {
  console.log(await time(countPairsFullyContained));
  console.log(await time(countPairsPartiallyContained));
});

test.run();
