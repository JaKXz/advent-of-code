import { test } from "uvu";
import * as assert from "uvu/assert";

import { input } from "../shared/download-input.js";
import { range } from "../shared/range.js";
import { time } from "../shared/timer.js";

const data = (await input(import.meta.url)).split("\n");

const initialStacks = (d = data, height = 9) =>
  d.slice(0, height).reduce(
    (acc, line) => {
      const result = line.match(/\[\w]|\s{4}/g);
      if (!result) return acc;
      return acc.map((stack, i) => stack + result[i].replaceAll(/\W/g, ""));
    },
    range(1, height).map(() => "")
  );

const procedure = (d = data, start = 10) => d.slice(start);

function run(stacks = initialStacks(), steps = procedure()) {
  for (let i = 0; i < steps.length; i++) {
    let [num, from, to] = steps[i].match(/\d+/g).map(Number);
    from -= 1;
    to -= 1;
    const move = determineMove.call(this, stacks[from], num);
    stacks[to] = move + stacks[to];
    stacks[from] = stacks[from].substring(num);
  }
  return stacks
    .map((s) => s[0])
    .join("")
    .trim();
}

function determineMove(from, num) {
  const substring = from.substring(0, num);
  if (this && this.cranePowerLevel > 9000) {
    return substring;
  }
  return substring.split("").reverse().join("");
}

test("part 1", () => {
  assert.equal(
    run.call(
      {},
      initialStacks(
        `    [D]    
[N] [C]    
[Z] [M] [P]`.split("\n"),
        3
      ),
      procedure(
        `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.split("\n"),
        0
      )
    ),
    "CMZ"
  );
  assert.equal(run.call({}), "TPGVQPFDH");
});

test("part 2 crates move in the same order", () => {
  assert.equal(run.call({ cranePowerLevel: 9001 }), "DMRDFRHHH");
});

test("is fast", async () => {
  console.log(await time(run));
  console.log(await time(run.bind({ cranePowerLevel: 9001 })));
});

test.run();
