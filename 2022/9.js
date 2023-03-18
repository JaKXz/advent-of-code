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
        const leader = k === 0 ? head : tail[k - 1];
        let follower = tail[k];

        const dx = leader[0] - follower[0];
        const dy = leader[1] - follower[1];
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (
          (absDx > 1 && absDy > 1) ||
          (absDx === 2 && absDy === 1) ||
          (absDx === 1 && absDy === 2)
        ) {
          follower[0] += dx / absDx;
          follower[1] += dy / absDy;
        } else if (absDx === 0 && absDy > 1) {
          follower[1] += dy / absDy;
        } else if (absDy === 0 && absDx > 1) {
          follower[0] += dx / absDx;
        }

        if (k === knots - 1) {
          result.add(follower.toString());
        }
      }
    }
  }
  return result.size;
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

test("part 2 ex", () => {
  assert.equal(trackTailVisits(ropeExample, 9), 36);
});

test("part 2", () => {
  assert.equal(trackTailVisits(data, 9), 2331);
});

test("some speed", async () => {
  console.log(await time(trackTailVisits));
});

test.run();
