import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = (await input(import.meta.url)).split("\n");

function getCalibrationValue(lines: string[]) {
  return lines.reduce<number>((acc, line) => {
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

const nums = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const;

function getRealCalibrationValue(lines: string[]) {
  let sum = 0;

  for (const line of lines) {
    sum += getValues(line);
  }

  return sum;
}

function getValues(line: string) {
  let temp = "";
  let first = 10;
  const keys = Object.keys(nums);
  const vals = Object.values(nums).map(String);
  if (!isNaN(line[0])) {
    first *= Number(line[0]);
  } else {
    for (const char of line) {
      temp += char;
      const num = interpolateNum(keys, vals, temp);
      if (num) {
        first *= num;
        break;
      }
    }
  }
  temp = "";

  if (!isNaN(line[line.length - 1])) {
    return first + Number(line[line.length - 1]);
  }
  for (let i = line.length - 1; i > 0; i--) {
    const char = line[i];
    temp = char + temp;
    const num = interpolateNum(keys, vals, temp);
    if (num) {
      return first + num;
    }
  }
  return first + first / 10;
}

function interpolateNum(keys, vals, temp) {
  const key = keys.find((k) => temp.includes(k));
  return key ? nums[key] : Number(vals.find((v) => temp.includes(v)));
}

test("ex2, part 2", () => {
  const lines = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`.split("\n");

  assert.is(getValues("two1nine"), 29);
  assert.is(getValues("4nineeightseven2"), 42);
  assert.is(getValues("7pqrstsixteen"), 76);
  assert.is(getValues("9sbxg"), 99);
  assert.equal(lines.map(getValues), [29, 83, 13, 24, 42, 14, 76]);
  assert.is(getRealCalibrationValue(lines), 281);
});

test("part 2", async () => {
  assert.is(getValues("six9six2gxmn"), 62);
  assert.is(getValues("zxcnjzxc3xxxxxx"), 33);
  assert.is(getRealCalibrationValue(data), 54418);
  console.log(await time(getRealCalibrationValue.bind(this, data)));
});

test.run();
