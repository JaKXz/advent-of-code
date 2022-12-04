import { test } from "uvu";
import * as assert from "uvu/assert";
import { input } from "./download-input.js";

const data = await input("2020/1.js");

test("input exports a function to download input", () => {
  assert.type(input, "function");
  assert.instance(input("1.js"), Promise);
});

test("input downloads the input for the current day", () => {
  assert.type(data, "string");
});

test("input data is trimmed", () => {
  assert.is(data, data.trim());
});

test.run();
