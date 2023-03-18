import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url).then((data) => data.split("\n"));

const MEASUREMENT_CYCLES = [20, 60, 100, 140, 180, 220];

function calculateSignalStrength(d = data) {
  let result = 0;

  let register = 1;
  let cycle = 1;

  for (const line of d) {
    const [_op, addxVal] = line.split(" ");

    if (addxVal) {
      for (let j = 0; j <= 1; j++) {
        const cycleIndex = MEASUREMENT_CYCLES.indexOf(cycle);
        if (cycleIndex > -1) {
          result += register * MEASUREMENT_CYCLES[cycleIndex];
        }
        if (j === 1) {
          register += Number(addxVal);
        }
        cycle++;
      }
    } else {
      const cycleIndex = MEASUREMENT_CYCLES.indexOf(cycle);
      if (cycleIndex > -1) {
        result += register * MEASUREMENT_CYCLES[cycleIndex];
      }
      cycle++;
    }
  }

  return result;
}

test("part 1 ex", () => {
  const ex = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`
    .trim()
    .split("\n");

  assert.equal(calculateSignalStrength(ex), 13140);
});

test("part 1", async () => {
  assert.equal(calculateSignalStrength(), 11780);
  console.log(await time(calculateSignalStrength));
});

test.run();
