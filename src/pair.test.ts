import { isNumber, isString } from "./core";
import { isPairOf } from "./pair";

const voidFunction = () => {};
const date = new Date();

describe("isPairOf(isNumber, isNumber)", () => {
  const isPairOfNumbers = isPairOf(isNumber, isNumber);
  test("returns true for a pair of numbers ", () => {
    expect(isPairOfNumbers([4, 2])).toBe(true);
  });

  test.each([
    [["4", 2]],
    [[4, "2"]],
    [["4", "2"]],
    [[{}, 2]],
    [[2, {}]],
    [[date, 2]],
    [[2, date]],
    [[voidFunction, 2]],
    [[2, voidFunction]],
  ])("returns false for %p", (pair) => {
    expect(isPairOfNumbers(pair)).toBe(false);
  });

  test.each([[[]], [[2]], [[2, 3, 4]]])("returns false for %p", (pair) => {
    expect(isPairOfNumbers(pair)).toBe(false);
  });
});

describe("isPairOf(isNumber, isString)", () => {
  const isPairOfNumbers = isPairOf(isNumber, isString);
  test("returns true for a pair of [number, string] ", () => {
    expect(isPairOfNumbers([4, "2"])).toBe(true);
  });

  test.each([
    [["4", 2]],
    [[4, 2]],
    [["4", "2"]],
    [[{}, 2]],
    [[2, {}]],
    [[date, 2]],
    [[2, date]],
    [[voidFunction, 2]],
    [[2, voidFunction]],
  ])("returns false for %p", (pair) => {
    expect(isPairOfNumbers(pair)).toBe(false);
  });

  test.each([[[]], [[2]], [["2"]], [[2, "3", 4]]])(
    "returns false for %p",
    (pair) => {
      expect(isPairOfNumbers(pair)).toBe(false);
    }
  );
});

describe("isPairOf(isString, isNumber)", () => {
  const isPairOfNumbers = isPairOf(isString, isNumber);
  test("returns true for a pair of [number, string] ", () => {
    expect(isPairOfNumbers(["4", 2])).toBe(true);
  });

  test.each([
    [[4, "2"]],
    [[4, 2]],
    [["4", "2"]],
    [[{}, 2]],
    [[2, {}]],
    [[date, 2]],
    [[2, date]],
    [[voidFunction, 2]],
    [[2, voidFunction]],
  ])("returns false for %p", (pair) => {
    expect(isPairOfNumbers(pair)).toBe(false);
  });

  test.each([[[]], [[2]], [["2"]], [["2", 3, 4]]])(
    "returns false for %p",
    (pair) => {
      expect(isPairOfNumbers(pair)).toBe(false);
    }
  );
});
