import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url).then((data) => data.split("\n"));

function trackTailVisits(d = data, knots = 1) {
  const visits = new Set(["0,0"]);
  let head = [0, 0];
  let tail = Array.from({ length: knots }).map(() => [0, 0]);

  for (const motion of d) {
    let [dir, steps] = motion.split(" ");
    steps = Number(steps);
    for (let j = 0; j < steps; j++) {
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
          (absDx > 1 && absDy === 1) ||
          (absDx === 1 && absDy > 1)
        ) {
          follower[0] += dx / absDx;
          follower[1] += dy / absDy;
        } else if (absDx === 0 && absDy > 1) {
          follower[1] += dy / absDy;
        } else if (absDy === 0 && absDx > 1) {
          follower[0] += dx / absDx;
        }

        if (k === knots - 1) {
          visits.add(follower.toString());
        }
      }
    }
  }
  return visits.size;
}

test("part 1 ex", () => {
  const example = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`
    .trim()
    .split("\n");

  assert.equal(trackTailVisits(example), 13);
});

test("part 1", async () => {
  assert.equal(trackTailVisits(), 5779);
  console.log(await time(trackTailVisits));
});

test("part 2 ex", () => {
  const ropeExample = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`
    .trim()
    .split("\n");

  assert.equal(trackTailVisits(ropeExample, 9), 36);
});

test("part 2", async () => {
  assert.equal(trackTailVisits(data, 9), 2331);
  console.log(await time(trackTailVisits.bind(this, data, 9)));
});

test.run();
