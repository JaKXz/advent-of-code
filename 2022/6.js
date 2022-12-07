import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url);

function parseSignalStartLocation(d = data, distinct = 4) {
  const chars = d.split("");
  for (let i = 0; i < chars.length; i++) {
    const unique = chars
      .slice(i, i + distinct)
      .filter((c, j, a) => a.indexOf(c) === j);
    if (unique.length === distinct) {
      return i + distinct;
    }
  }
}

test("example 1", () => {
  assert.equal(parseSignalStartLocation(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`), 7);
});
test("example 2", () => {
  assert.equal(parseSignalStartLocation(`bvwbjplbgvbhsrlpgdmjqwftvncz`), 5);
});
test("example 3", () => {
  assert.equal(parseSignalStartLocation(`nppdvjthqldpwncqszvftbrmjlhg`), 6);
});
test("example 4", () => {
  assert.equal(
    parseSignalStartLocation(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`),
    10
  );
});
test("example 5", () => {
  assert.equal(
    parseSignalStartLocation(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`),
    11
  );
});

test("part 1", () => {
  assert.equal(parseSignalStartLocation(), 1100);
});

test("part 2", () => {
  assert.equal(parseSignalStartLocation(data, 14), 2421);
});

test("is fast", async () => {
  console.log(await time(parseSignalStartLocation));
  console.log(await time(parseSignalStartLocation.bind(null, data, 14)));
});

test.run();
