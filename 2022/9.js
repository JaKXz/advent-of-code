import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url);

// advent of code 2022 day 9
// https://adventofcode.com/2022/day/9

const example = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`.trim();

function trackTailVisits(d = data, knots = 1) {
  const motions = d.split("\n");
  let result = new Set(["0,0"]);
  let head = [0, 0];
  let tail = Array.from({ length: knots }).map(() => [0, 0]);

  for (let i = 0; i < motions.length; i++) {
    const [dir, steps] = motions[i].split(" ");

    for (let j = 0; j < Number(steps); j++) {
      switch (dir) {
        case "R":
          head[0]++;
          break;
        case "L":
          head[0]--;
          break;
        case "U":
          head[1]++;
          break;
        case "D":
          head[1]--;
          break;
      }
      for (let k = 0; k < knots; k++) {
        const prev = k === 0 ? head : tail[k - 1];
        let knot = tail[k];
        const dx = Math.abs(prev[0] - knot[0]);
        const dy = Math.abs(prev[1] - knot[1]);

        if ((dx > 1 && dy >= 1) || (dx >= 1 && dy > 1)) {
          if (dy > dx) {
            knot[0] = prev[0];
            knot[1] = moveOneBehind(prev[1], dir);
          } else {
            knot[0] = moveOneBehind(prev[0], dir);
            knot[1] = prev[1];
          }
          if (k === knots - 1) {
            result.add(knot.toString());
          }
        } else if (dx > 1) {
          knot[0] = moveOneBehind(prev[0], dir);
          if (k === knots - 1) {
            result.add(knot.toString());
          }
        } else if (dy > 1) {
          knot[1] = moveOneBehind(prev[1], dir, 1);
          if (k === knots - 1) {
            result.add(knot.toString());
          }
        }
      }
      // console.log({ head, tail: tail[8], move: motions[i] });
    }
  }
  return result.size;
}

function moveOneBehind(coord, dir) {
  switch (dir) {
    case "R":
    case "U":
      return coord - 1;
    case "L":
    case "D":
      return coord + 1;
  }
}

test("part 1 ex", () => {
  assert.equal(trackTailVisits(example), 13);
});

test("part 1", () => {
  assert.equal(trackTailVisits(), 5779);
});

const ropeExample = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`.trim();

test.skip("part 2 ex", () => {
  // assert.equal(trackTailVisits(example, 9), 1);
  assert.equal(trackTailVisits(ropeExample, 9), 36);
});

test("some speed", async () => {
  console.log(await time(trackTailVisits));
});

test.run();
