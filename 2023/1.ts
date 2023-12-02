import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = (await input(import.meta.url)).split("\n");

function getCalibrationValue(lines) {
  return lines.reduce((acc, line) => {
    const arr = line.split("").map(Number).filter(Boolean);
    return acc + arr[0] * 10 + arr[arr.length - 1];
  }, 0);
}

test("ex1, part 1", () => {
  const data = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`.split("\n");
  assert.is(getCalibrationValue(data), 142);
});

test("part 1", async () => {
  assert.is(getCalibrationValue(data), 54304);
  console.log(await time(getCalibrationValue.bind(this, data)));
});
