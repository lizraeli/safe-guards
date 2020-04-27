import {
  isNumber,
  isString,
  isBoolean,
  isObject,
  isArray,
  isFunction,
} from "./core";

const number = 42;
const voidFunction = () => {};
const addFunction = (x: number, y: number) => x + y;
const emptyObject = {};
const stringNumber = "42";
const stringName = "Lev";
const date = new Date();
const numberArray = [1, 2, 3];
const emptyArray: any[] = [];
class Langauge {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const englishLanguage = new Langauge("English");

describe("isNumber", () => {
  test.each([[number], [NaN], [Infinity], [-Infinity]])(
    "returns true for a %p",
    (value) => {
      expect(isNumber(value)).toBe(true);
    }
  );

  test.each([[stringNumber], [stringName], [emptyObject], [voidFunction]])(
    "returns false for %p",
    (value) => {
      expect(isNumber(value)).toBe(false);
    }
  );
});

describe("isString", () => {
  test.each([[stringNumber], [stringName]])("returns true for %p", (value) => {
    expect(isString(value)).toBe(true);
  });

  test.each([
    [number],
    [NaN],
    [Infinity],
    [-Infinity],
    [emptyObject],
    [voidFunction],
  ])("returns false for a %p", (value) => {
    expect(isString(value)).toBe(false);
  });
});

describe("isBoolean", () => {
  test.each([true, false])("returns true for %p", (value) => {
    expect(isBoolean(value)).toBe(true);
  });

  test.each([
    [stringNumber],
    [stringName],
    [number],
    [NaN],
    [Infinity],
    [-Infinity],
    [emptyObject],
    [voidFunction],
  ])("returns false for a %p", (value) => {
    expect(isBoolean(value)).toBe(false);
  });
});

describe("isObject", () => {
  test.each([[emptyObject], [date], [englishLanguage]])(
    "returns true for %p",
    (value) => {
      expect(isObject(value)).toBe(true);
    }
  );

  test.each([
    [true],
    [false],
    [stringNumber],
    [stringName],
    [number],
    [NaN],
    [Infinity],
    [-Infinity],
    [numberArray],
    [voidFunction],
  ])("returns false for a %p", (value) => {
    expect(isObject(value)).toBe(false);
  });
});

describe("isArray", () => {
  test.each([[numberArray], [emptyArray]])("returns true for %p", (value) => {
    expect(isArray(value)).toBe(true);
  });

  test.each([
    [true],
    [false],
    [stringNumber],
    [stringName],
    [number],
    [NaN],
    [Infinity],
    [-Infinity],
    [voidFunction],
    [date],
    [englishLanguage],
  ])("returns false for a %p", (value) => {
    expect(isArray(value)).toBe(false);
  });
});

describe("isFunction", () => {
  test.each([[voidFunction, addFunction]])("returns true for %p", (value) => {
    expect(isFunction(value)).toBe(true);
  });

  test.each([
    [true],
    [false],
    [stringNumber],
    [stringName],
    [number],
    [NaN],
    [Infinity],
    [-Infinity],
    [date],
    [englishLanguage],
  ])("returns false for a %p", (value) => {
    expect(isArray(value)).toBe(false);
  });
});
