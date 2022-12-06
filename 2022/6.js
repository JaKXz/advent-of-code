import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url);

function parseSignal(d = data, distinct = 4) {
  const chars = d.split("");
  let start = 0;
  for (let end = distinct; end < chars.length; end++) {
    const buffer = chars.slice(start, end);
    const len = buffer.length;
    const unique = buffer.filter((c, i, a) => a.indexOf(c) === i).length;
    if (unique === len) {
      return end;
    }
    start++;
  }
  return null;
}

test("example 1", () => {
  assert.equal(parseSignal(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`), 7);
});
test("example 2", () => {
  assert.equal(parseSignal(`bvwbjplbgvbhsrlpgdmjqwftvncz`), 5);
});
test("example 3", () => {
  assert.equal(parseSignal(`nppdvjthqldpwncqszvftbrmjlhg`), 6);
});
test("example 4", () => {
  assert.equal(parseSignal(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`), 10);
});
test("example 5", () => {
  assert.equal(parseSignal(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`), 11);
});

test("part 1", () => {
  assert.equal(parseSignal(), 1100);
});

test("part 2", () => {
  assert.equal(parseSignal(data, 14), 2421);
});

test("is fast", async () => {
  console.log(await time(parseSignal));
  console.log(await time(parseSignal.bind(null, data, 14)));
});

test.run();
