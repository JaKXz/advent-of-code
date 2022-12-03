import { test } from "uvu";
import * as assert from "uvu/assert";

export function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

test("range", () => {
  assert.equal(range(1, 3), [1, 2, 3]);
});

test.run();
