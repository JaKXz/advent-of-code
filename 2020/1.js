import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url);

const getNumbersFiltered = (d = data) =>
  d
    .split("\n")
    .map(Number)
    .filter((n) => n < 2020);

function partOne() {
  const numbers = getNumbersFiltered();

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === 2020) {
        return numbers[i] * numbers[j];
      }
    }
  }
}

test("correct partOne", () => {
  assert.is(partOne(), 802011);
});

function partTwo() {
  const numbers = getNumbersFiltered();

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const intermediate = numbers[i] + numbers[j];
      if (intermediate < 2020) {
        for (let k = j + 1; k < numbers.length; k++) {
          if (intermediate + numbers[k] === 2020) {
            return numbers[i] * numbers[j] * numbers[k];
          }
        }
      }
    }
  }
}

test("correct partTwo", () => {
  assert.is(partTwo(), 248607374);
});

test("is fast", async () => {
  console.log(await time(partOne));
  console.log(await time(partTwo));
});

test.run();
