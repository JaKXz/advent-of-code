import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url);

function visibleTrees(d = data) {
  const rows = d.split("\n");
  let result = rows.length * 2 + (rows.length - 2) * 2;
  let cols = [];
  for (let i = 1; i < rows.length - 1; i++) {
    const row = rows[i];
    for (let j = 1; j < row.length - 1; j++) {
      const tree = row[j];
      if (isTreeVisibleInSetFromOutside(tree, row.split(""), j)) {
        result++;
        continue;
      }
      let col;
      if (cols[j]) {
        col = cols[j];
      } else {
        col = rows.map((r) => r[j]);
        cols[j] = col;
      }
      if (isTreeVisibleInSetFromOutside(tree, col, i)) {
        result++;
      }
    }
  }
  return result;
}

function isTreeVisibleInSetFromOutside(tree, set, index) {
  const left = set.slice(0, index);
  const right = set.slice(index + 1);
  const predicate = (t) => Number(tree) > Number(t);
  return left.every(predicate) || right.every(predicate);
}

test("part 1 example", () => {
  assert.equal(
    visibleTrees(`30373
25512
65332
33549
35390`),
    21
  );
});

test("part 1", () => {
  assert.equal(visibleTrees(), 1801);
});

function calculateScenicScore(d = data) {
  const rows = d.split("\n");
  let cols = [];
  let max = 0;

  for (let i = 1; i < rows.length - 1; i++) {
    const row = rows[i].split("").map(Number);
    for (let j = 1; j < row.length - 1; j++) {
      const tree = row[j];
      // if (tree < 5) continue;
      let col;
      if (cols[j]) {
        col = cols[j];
      } else {
        col = rows.map((r) => Number(r[j]));
        cols[j] = col;
      }
      const left = visibleFromTreehousePredicate(
        tree,
        row.slice(0, j).reverse()
      );
      const right = visibleFromTreehousePredicate(tree, row.slice(j + 1));
      const top = visibleFromTreehousePredicate(
        tree,
        col.slice(0, i).reverse()
      );
      const bottom = visibleFromTreehousePredicate(tree, col.slice(i + 1));
      const score = left * right * top * bottom;
      if (score > max) {
        max = score;
      }
    }
  }
  return max;
}

function visibleFromTreehousePredicate(treehouse, trees) {
  let count = 0;
  for (let i = 0; i < trees.length; i++) {
    if (trees[i] > treehouse && i !== trees.length - 1) {
      return count;
    } else if (trees[i] === treehouse) {
      return count + 1;
    } else {
      count++;
    }
  }
  return count;
}

test("part 2 example", () => {
  assert.equal(
    calculateScenicScore(`30373
25512
65332
33549
35390`),
    8
  );
});

test("part 2", () => {
  assert.equal(calculateScenicScore(), 209880);
});

test("is mediocre?", async () => {
  console.log(await time(visibleTrees));
  console.log(await time(calculateScenicScore));
});

test.run();
