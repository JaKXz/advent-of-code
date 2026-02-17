import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = (await input(import.meta.url)).split("\n");

const EXAMPLE_GAMES = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split("\n");

function possibleGamesSum(lines: string[] = data) {
  const MAX_RED = 12;
  const MAX_GREEN = 13;
  const MAX_BLUE = 14;

  return lines.reduce((acc, line, i) => {
    const id = i + 1;
    const { green, red, blue } = lineMaxes(line);
    if (green <= MAX_GREEN && blue <= MAX_BLUE && red <= MAX_RED) {
      return acc + id;
    }
    return acc;
  }, 0);
}

function lineMaxes(line: string) {
  return line
    .match(/\d+ \w+/g)
    .map((l) => l.split(" "))
    .reduce(
      (acc, [num, colour]) => {
        acc[colour] = Math.max(Number(num), acc[colour]);
        return acc;
      },
      { green: 0, red: 0, blue: 0 },
    );
}

test("ex1 part 1", () => {
  assert.is(possibleGamesSum(EXAMPLE_GAMES), 8);
});

test("part 1", async () => {
  assert.is(possibleGamesSum(data), 2617);
  console.log(await time(possibleGamesSum));
});

function cubeSetPower(lines: string[] = data) {
  return lines.reduce((acc, line) => {
    const { green, red, blue } = lineMaxes(line);
    return acc + green * red * blue;
  }, 0);
}

test("ex2 part 2", () => {
  assert.is(cubeSetPower(EXAMPLE_GAMES), 2286);
});

test("part 2", async () => {
  assert.is(cubeSetPower(data), 59795);
  console.log(await time(cubeSetPower));
});

test.run();
