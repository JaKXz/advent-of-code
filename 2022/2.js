import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url);

const scores = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 1, // rock
  Y: 2,
  Z: 3,
};

const matchResultForP2 = (p1, p2) => {
  if (scores[p1] === scores[p2]) {
    return 3;
  }
  if (scores[p2] - scores[p1] === 1 || (p2 === "X" && p1 === "C")) {
    return 6;
  }
  return 0;
};

test("rules of rock paper scissors", () => {
  assert.ok(matchResultForP2("A", "X") === 3);
  assert.ok(matchResultForP2("A", "Y") === 6);
  assert.ok(matchResultForP2("A", "Z") === 0);
  assert.ok(matchResultForP2("B", "X") === 0);
});

const parse = (d = data) =>
  d.split("\n").reduce((acc, line) => {
    const [p1, p2] = line.split(" ");
    return acc + matchResultForP2(p1, p2) + scores[p2];
  }, 0);

test("sums the scores", () => {
  assert.equal(parse(), 15632);
});

const secretStrategy = (d = data) =>
  d.split("\n").reduce((acc, line) => {
    const [p1, result] = line.split(" ");
    const played = scores[p1];
    return {
      X: acc + (played === 1 ? 3 : played - 1),
      Y: acc + played + 3,
      Z: acc + 6 + (played === 3 ? 1 : played + 1),
    }[result];
  }, 0);

test("derive p2 from result and p1", () => {
  assert.equal(secretStrategy(), 14416);
});

test("is fast", async () => {
  console.log(await time(parse));
  console.log(await time(secretStrategy));
});

test.run();
