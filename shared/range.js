import { test } from "uvu";
import * as assert from "uvu/assert";

export function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
