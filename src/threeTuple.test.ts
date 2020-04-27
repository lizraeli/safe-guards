import { isNumber, isString } from "./core";
import { isThreeTuple } from "./threeTuple";

const voidFunction = () => {};
const date = new Date();

describe("isThreeTupleOf(isNumber, isNumber, isNumber)", () => {
  const isThreeTupleOfNumbers = isThreeTuple(isNumber, isNumber, isNumber);
  test("returns true for a three-tuple of numbers ", () => {
    expect(isThreeTupleOfNumbers([4, 2, 6])).toBe(true);
  });

  test.each([
    [["4", 2, 6]],
    [[4, "2", 6]],
    [["4", 2, "6"]],
    [[{}, 2, 6]],
    [[2, {}, 6]],
    [[date, 2, 6]],
    [[2, date, 6]],
    [[voidFunction, 2, 6]],
    [[2, voidFunction, 6]],
  ])("returns false for %p", (pair) => {
    expect(isThreeTupleOfNumbers(pair)).toBe(false);
  });

  test.each([[[]], [[2]], [[2, 3]], [[2, 3, 4, 5]]])(
    "returns false for %p",
    (pair) => {
      expect(isThreeTupleOfNumbers(pair)).toBe(false);
    }
  );
});



describe("isThreeTupleOf(isNumber, isString, isNumber)", () => {
    const isThreeTupleOfNumbers = isThreeTuple(isNumber, isString, isNumber);
    test("returns true for a three-tuple of numbers ", () => {
      expect(isThreeTupleOfNumbers([4, "2", 6])).toBe(true);
    });
  
    test.each([
      [["4", 2, 6]],
      [[4, 2, 6]],
      [["4", 2, "6"]],
      [[4, "2", "6"]],
      [[{}, 2, 6]],
      [[2, {}, 6]],
      [[date, 2, 6]],
      [[2, date, 6]],
      [[voidFunction, 2, 6]],
      [[2, voidFunction, 6]],
    ])("returns false for %p", (pair) => {
      expect(isThreeTupleOfNumbers(pair)).toBe(false);
    });
  
    test.each([[[]], [[2]], [[2, "3"]], [[2, "3", 4, 5]]])(
      "returns false for %p",
      (pair) => {
        expect(isThreeTupleOfNumbers(pair)).toBe(false);
      }
    );
  });



describe("isThreeTupleOf(isNumber, isString, isString)", () => {
    const isThreeTupleOfNumbers = isThreeTuple(isNumber, isString, isString);
    test("returns true for a three-tuple of numbers ", () => {
      expect(isThreeTupleOfNumbers([4, "2", "6"])).toBe(true);
    });
  
    test.each([
      [["4", 2, 6]],
      [[4, 2, 6]],
      [["4", 2, "6"]],
      [[{}, 2, 6]],
      [[2, {}, 6]],
      [[date, 2, 6]],
      [[2, date, 6]],
      [[voidFunction, 2, 6]],
      [[2, voidFunction, 6]],
    ])("returns false for %p", (pair) => {
      expect(isThreeTupleOfNumbers(pair)).toBe(false);
    });
  
    test.each([[[]], [[2]], [[2, "3"]], [[2, "3", "4", 5]]])(
      "returns false for %p",
      (pair) => {
        expect(isThreeTupleOfNumbers(pair)).toBe(false);
      }
    );
  });



describe("isThreeTupleOf(isString, isNumber, isString)", () => {
    const isThreeTupleOfNumbers = isThreeTuple(isString, isNumber, isString);
    test("returns true for a three-tuple of numbers ", () => {
      expect(isThreeTupleOfNumbers(["4", 2, "6"])).toBe(true);
    });
  
    test.each([
      [["4", 2, 6]],
      [[4, 2, 6]],
      [["4", "2", "6"]],
      [[{}, 2, 6]],
      [[2, {}, 6]],
      [[date, 2, 6]],
      [[2, date, 6]],
      [[voidFunction, 2, 6]],
      [[2, voidFunction, 6]],
    ])("returns false for %p", (pair) => {
      expect(isThreeTupleOfNumbers(pair)).toBe(false);
    });
  
    test.each([[[]], [["2"]], [["2", 3]], [["2", 3, "4", 5]]])(
      "returns false for %p",
      (pair) => {
        expect(isThreeTupleOfNumbers(pair)).toBe(false);
      }
    );
  });