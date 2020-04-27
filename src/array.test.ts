import { isNumber } from "./core";
import { isArrayOf } from "./array";

const voidFunction = () => {};
const date = new Date();

describe("isArrayOf(isNumber)", () => {
  const isArrayOfNumbers = isArrayOf(isNumber);

  test.each([[[]], [[2, 4]], [[2, 4, 6]]])("returns true for %p", (array) => {
    expect(isArrayOfNumbers(array)).toBe(true);
  });

  test.each([
    [[2, 4, 6, 8, "10"]],
    [[{}, 2, 4]],
    [[2, {}, 4]],
    [[date, 2, 4]],
    [[2, date]],
    [[voidFunction, 2]],
    [[2, voidFunction]],
  ])("returns false for %p", (array) => {
    expect(isArrayOfNumbers(array)).toBe(false);
  });
});
