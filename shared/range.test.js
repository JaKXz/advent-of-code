import { test } from "uvu";
import * as assert from "uvu/assert";
import { range } from "./range.js";

test("range", () => {
  assert.equal(range(1, 3), [1, 2, 3]);
});

test.run();
