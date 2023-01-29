import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { time } from "../shared/timer.js";

const data = await input(import.meta.url).then((lines) => lines.split("\n"));

function checkPasswordsPartOne(list = data) {
  return list.filter((line) => {
    const [range, char, password] = line.replace(":", "").split(" ");
    const [min, max] = range.split("-");
    const contents = password.split("").filter((c) => c === char).length;
    return contents >= min && contents <= max;
  }).length;
}

test("part 1", () => {
  assert.equal(checkPasswordsPartOne(), 556);
});

function newValidationRules(list = data) {
  return list.filter((line) => {
    const [positions, char, password] = line.replace(":", "").split(" ");
    return (
      positions.split("-").filter((i) => password[Number(i) - 1] === char)
        .length === 1
    );
  }).length;
}

test("part 2 ex", () => {
  const input = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`.split("\n");
  assert.equal(newValidationRules(input), 1);
});

test("part 2", () => {
  assert.equal(newValidationRules(), 605);
});

test("is fast", async () => {
  console.log(await time(checkPasswordsPartOne));
  console.log(await time(newValidationRules));
});

test.run();
