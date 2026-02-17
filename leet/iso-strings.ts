import { test } from "uvu";
import * as assert from "uvu/assert";

import { time } from "../shared/timer.js";

/**
 * Given two strings s and t, determine if they are isomorphic.
 * Two strings s and t are isomorphic if the characters in s can be replaced to get t.
 * All occurrences of a character must be replaced with another character while preserving the order of characters.
 * No two characters may map to the same character, but a character may map to itself.
 */
function isomorphicStrings(s: string, t: string): boolean {
  const leftMap = {};
  const rightMap = {};

  for (let i = 0; i < s.length; i++) {
    if (leftMap[s[i]] && leftMap[s[i]] !== t[i]) {
      return false;
    }
    if (rightMap[t[i]] && rightMap[t[i]] !== s[i]) {
      return false;
    }
    leftMap[s[i]] = t[i];
    rightMap[t[i]] = s[i];
  }

  return true;
}

[
  [["egg", "add"], true],
  [["foo", "bar"], false],
  [["paper", "title"], true],
  [["badc", "baba"], false],
  [["bbbaaaba", "aaabbbba"], false],
  [["egcd", "adfd"], false],
].forEach(([args, expected]: [[string, string], boolean]) => {
  test(`${args} case`, async () => {
    assert.equal(isomorphicStrings(...args), expected);
    console.log(await time(isomorphicStrings.bind(this, ...args)));
  });
});

test.run();
