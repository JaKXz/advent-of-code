import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url);

const parseLineItems = (d = data) =>
  d.split("\n").reduce((acc, line) => {
    const partA = line.substring(0, line.length / 2);
    const partB = line.substring(line.length / 2);

    return (
      acc +
      partA
        .split("")
        .filter((c) => partB.includes(c))
        .filter((c, i, a) => a.indexOf(c) === i)
        .reduce((sum, c) => {
          if (c.toLowerCase() === c) {
            return sum + c.charCodeAt(0) - 96;
          }
          return sum + c.charCodeAt(0) - 38;
        }, 0)
    );
  }, 0);

test("parses rucksacks correctly", () => {
  assert.equal(
    parseLineItems(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`),
    157
  );
  assert.equal(parseLineItems(), 7821);
});

const parseRucksacksPerThree = (d = data) => {
  const lines = d.split("\n");
  let acc = 0;
  for (let i = 0; i < lines.length + 3; i++) {
    if (i > 0 && i % 3 === 0) {
      acc += lines[i - 3]
        .split("")
        .filter((c) => lines[i - 2].includes(c) && lines[i - 1].includes(c))
        .reduce(
          (sum, c, j, a) =>
            a.indexOf(c) !== j
              ? sum
              : c.toLowerCase() === c
              ? sum + c.charCodeAt(0) - 96
              : sum + c.charCodeAt(0) - 38,
          0
        );
    }
  }
  return acc;
};

test("rucksacks per 3", () => {
  assert.equal(
    parseRucksacksPerThree(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`),
    70
  );
  assert.equal(parseRucksacksPerThree(), 2752);
});

test("is fast", async () => {
  console.log(await time(parseLineItems));
  console.log(await time(parseRucksacksPerThree));
});

test.run();
