import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data: string[] = (await input(import.meta.url)).split("\n");

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

test("p1 example", () => {
  // each line may have symbols
  // check for numbers starting near those indeces
  // isNumCoordAdjacent
  const adjacencies = getAdjacencies(EX);
  const sum = adjacencies.reduce(
    (acc, vals) =>
      acc + vals.reduce((inner: number, val: number) => inner + val, 0),
    0,
  );

  assert.is(sum, 4361);
});
test("p1", async () => {
  const adjacencies = getAdjacencies();
  const sum = adjacencies.reduce(
    (acc, vals) =>
      acc + vals.reduce((inner: number, val: number) => inner + val, 0),
    0,
  );
  assert.ok(sum > 506033);
  assert.is(sum, 553825);
  assert.ok(sum < 556290);
  console.log(await time(getAdjacencies.bind(this)));
});

test("p2 example", () => {
  const adjacencies = getAdjacencies(EX, "?<symbol>\\*");
  const sum = adjacencies.reduce((acc, vals) => {
    if (vals.length !== 2) {
      return acc;
    }
    return acc + vals[0] * vals[1];
  }, 0);

  assert.is(sum, 467835);
});

test("p2", async () => {
  const adjacencies = getAdjacencies(data, "?<symbol>\\*");
  const sum = adjacencies.reduce((acc, vals) => {
    if (vals.length !== 2) {
      return acc;
    }
    return acc + vals[0] * vals[1];
  }, 0);

  assert.is(sum, 93994191);
  console.log(await time(getAdjacencies.bind(this, data, "?<symbol>\\*")));
});

type Coord = readonly [number, number];

function getAdjacencies(
  lines = data,
  symbolPattern = "?<symbol>[^.0-9]",
): number[][] {
  const nums: [Coord, string][] = [];
  const symbols: [Coord, string][] = [];
  const matchPattern = new RegExp(`(${symbolPattern})|(?<num>\\d+)`, "g");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    [...line.matchAll(matchPattern)].forEach((match) => {
      const coord = [i, match.index] as const;
      if (match.groups.symbol) {
        symbols.push([coord, match[0]]);
      }
      if (match.groups.num) {
        nums.push([coord, match[0]]);
      }
    });
  }
  const adjacencies: number[][] = [];
  symbols.forEach(([[x, y]], id) => {
    adjacencies[id] = [];
    nums.forEach(([[i, j], num]) => {
      const rowDelta = Math.abs(i - x);
      if (rowDelta <= 1) {
        const colDelta = (col: number) => Math.abs(y - col);
        const offset = num.length - 1;
        if (colDelta(j) <= 1 || colDelta(j + offset) <= 1) {
          adjacencies[id].push(Number(num));
        }
      }
    });
  });
  return adjacencies;
}

test.run();
