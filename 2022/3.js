import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { range } from "../shared/range.js";
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
        .reduce(prioritySummation, 0)
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

function parseRucksacksPerTeamSize(d = data, teamSize = 3) {
  const rucksacks = d.split("\n");
  if (rucksacks.length % teamSize !== 0) console.warn("Uneven team size");
  const checks = range(2, teamSize);
  let acc = 0;
  for (let i = rucksacks.length; i >= teamSize; i -= teamSize) {
    acc += rucksacks[i - 1]
      .split("")
      .filter((badge) => checks.every((j) => rucksacks[i - j].includes(badge)))
      .reduce(prioritySummation, 0);
  }
  return acc;
}

function prioritySummation(sum, badge, i, badges) {
  return badges.indexOf(badge) !== i
    ? sum
    : badge.toLowerCase() === badge
    ? sum + badge.charCodeAt(0) - 96
    : sum + badge.charCodeAt(0) - 38;
}

test("rucksacks per 3", () => {
  assert.equal(
    parseRucksacksPerTeamSize(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`),
    70
  );
  assert.equal(parseRucksacksPerTeamSize(), 2752);
});

test("is fast", async () => {
  console.log(await time(parseLineItems));
  console.log(await time(parseRucksacksPerTeamSize));
});

test.run();
