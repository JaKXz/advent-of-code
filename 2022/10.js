import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";
import { ex } from "./10-ex.js";

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
        result += takeCycleMeasurement(cycle, register);
        if (j === 1) {
          register += Number(addxVal);
        }
        cycle++;
      }
    } else {
      result += takeCycleMeasurement(cycle, register);
      cycle++;
    }
  }

  return result;
}

function takeCycleMeasurement(cycle, register) {
  const cycleIndex = MEASUREMENT_CYCLES.indexOf(cycle);
  if (cycleIndex > -1) {
    return register * MEASUREMENT_CYCLES[cycleIndex];
  }
  return 0;
}

test("part 1 ex", () => {
  assert.equal(calculateSignalStrength(ex), 13140);
});

test("part 1", async () => {
  assert.equal(calculateSignalStrength(), 11780);
  console.log(await time(calculateSignalStrength));
});

test.run();
