import { test } from "uvu";
import * as assert from "uvu/assert";

import { time } from "./timer.js";

test("reports in microseconds", async () => {
  assert.ok((await time(() => {})).includes("µs"));
});

test("calls out very slow functions", async () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const result = await time(() => sleep(1000));

  assert.ok(result.includes("took 1.00s!"));
});

test.run();
