import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data: string[] = (await input(import.meta.url)).split("\n");

function partsSum(acc: number, line: string, i: number, arr: string[]) {
  [...line.matchAll(/\.?(\d+)\.?/g)]
    .flatMap((match) => ({
      num: match[1],
      index: match[0].startsWith(".") ? match.index + 1 : match.index,
    }))
    .forEach((match) => {
      let lines: string[] = [];
      if (i !== 0) {
        lines.push(arr[i - 1]);
      }
      lines.push(line);
      if (i !== arr.length - 1) {
        lines.push(arr[i + 1]);
      }
      const offset = match.num.length - 1;
      const coord = [i, match.index] as const;
      const isAdjacent = isNumCoordAdjacent(coord, offset, lines);

      if (isAdjacent) {
        acc += Number(match.num);
      }
    });

  return acc;
}

function isNumCoordAdjacent(
  [_, y]: readonly [number, number],
  offset: number,
  lines: string[],
) {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const symbol = lines[i][j];
      if (symbol !== "." && /\D/.test(symbol)) {
        let delta = Math.abs(j - y);
        if (delta === 0 || delta === 1) {
          return true;
        }
        delta = Math.abs(j - (y + offset));
        if (delta === 0 || delta === 1) {
          return true;
        }
      }
    }
  }
  return false;
}

const EX = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
  .trim()
  .split("\n");

test("isAdjacent", () => {
  assert.is(isNumCoordAdjacent([0, 0], 3, ["467..114..", "...*......"]), true);
});

test("not adjacent", () => {
  assert.is(isNumCoordAdjacent([0, 5], 3, ["467..114..", "...*......"]), true);
});

test("part number without leading .", () => {
  assert.is(
    isNumCoordAdjacent([1, 63], 3, [
      ".854...........................................................................362...........271...732........838.........24................",
      "...*.............................117*...........459........767*648....#.........*...................................$...&..=................",
      "....970.........368.124.+............57................653...........723.....366....*443..60.........536....441....45..879.....789...*......",
    ]),
    true,
  );
});

test("p1 example", () => {
  // each line may have symbols
  // check for numbers starting near those indeces
  // isNumCoordAdjacent
  assert.is(EX.reduce(partsSum, 0), 4361);
});
test("p1", async () => {
  const sum = data.reduce(partsSum, 0);
  assert.ok(sum > 506033);
  assert.is(sum, 553825);
  assert.ok(sum < 556290);
  console.log(await time(() => data.reduce(partsSum, 0)));
});

test.run();
