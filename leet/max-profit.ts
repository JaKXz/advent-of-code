import { test } from "uvu";
import * as assert from "uvu/assert";

import { time } from "../shared/timer.js";

function maxProfit(prices: number[]): number {
  let profit = 0;
  for (let buyDay = 0, sellDay = 1; sellDay < prices.length; sellDay++) {
    if (prices[buyDay] < prices[sellDay]) {
      profit = Math.max(profit, prices[sellDay] - prices[buyDay]);
    } else {
      buyDay = sellDay;
    }
  }
  return profit;
}

[
  { prices: [7, 1, 5, 3, 6, 4], expected: 5 },
  { prices: [2, 4, 1], expected: 2 },
].forEach(({ prices, expected }) => {
  test(`${prices} => ${expected}`, async () => {
    assert.is(maxProfit(prices), expected);
    console.log(await time(maxProfit.bind(this, prices)));
  });
});

function multiDayMaxProfit(prices: number[]): number {
  let profit = 0;
  for (let buyDay = 0, sellDay = 1; sellDay < prices.length; sellDay++) {
    if (prices[buyDay] < prices[sellDay]) {
      profit += prices[sellDay] - prices[buyDay];
    }
    buyDay = sellDay;
  }
  return profit;
}

[
  { prices: [7, 1, 5, 3, 6, 4], expected: 7 },
  { prices: [1, 2, 3, 4, 5], expected: 4 },
  { prices: [7, 6, 4, 3, 1], expected: 0 },
].forEach(({ prices, expected }) => {
  test(`${prices} => ${expected}`, async () => {
    assert.is(multiDayMaxProfit(prices), expected);
    console.log(await time(multiDayMaxProfit.bind(this, prices)));
  });
});

test.run();
