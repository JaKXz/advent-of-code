import { test } from "uvu";
import * as assert from "uvu/assert";

import { time } from "../shared/timer.js";

function determinant(strArray: string[]) {
  const cols = strArray.indexOf("<>");
  const rows = strArray.join("").split("<>").length;

  if (cols !== rows) {
    return -1;
  }
  const numArray: number[] = strArray.reduce(
    (acc, val) => (val === "<>" ? acc : acc.concat(Number(val))),
    []
  );

  let matrix: number[][] = new Array(rows)
    .fill(0)
    .map(() => new Array(cols).fill(0));
  for (let i = 0, row = 0; i < numArray.length; i++) {
    if (i % rows === 0 && i >= cols) {
      row++;
    }
    const col = i % cols;
    matrix[row][col] = numArray[i];
  }

  // Recursive function to calculate determinant
  function calcDeterminant(matrix: number[][]): number {
    if (matrix.length === 1) {
      return matrix[0][0];
    } else if (matrix.length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    } else {
      let det = 0;
      for (let i = 0; i < matrix.length; i++) {
        let subMatrix = [];
        for (let j = 1; j < matrix.length; j++) {
          subMatrix[j - 1] = matrix[j].filter((val, index) => index !== i);
        }
        det +=
          (i % 2 === 0 ? 1 : -1) * matrix[0][i] * calcDeterminant(subMatrix);
      }
      return det;
    }
  }

  return calcDeterminant(matrix);
}

[
  { strArray: ["1", "2", "3", "<>", "4", "5", "6"], expected: -1 },
  { strArray: ["1", "2", "<>", "3", "4"], expected: -2 },
  { strArray: ["5", "0", "<>", "0", "5"], expected: 25 },
  {
    strArray: ["2", "-3", "1", "<>", "2", "0", "-1", "<>", "1", "4", "5"],
    expected: 49,
  },
].forEach(({ strArray, expected }) => {
  test(`det(${strArray}) === ${expected}`, async () => {
    assert.is(determinant(strArray), expected);
    console.log(await time(determinant.bind(this, strArray)));
  });
});

test.run();
