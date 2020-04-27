import { isNumber, isString, isArray, isObject } from "./core";
import { isEither, testEither } from "./either";

const number = 42;
const voidFunction = () => {};
const addFunction = (x: number, y: number) => x + y;
const emptyObject = {};
const stringNumber = "42";
const stringName = "Lev";
const numberArray = [1, 2, 3];
const emptyArray: any[] = [];
class Langauge {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const englishLanguage = new Langauge("English");

describe("isEither(number, string)", () => {
  const isNumberOrString = isEither<number, string>(isNumber, isString);
  test.each([[2], [stringNumber], [stringName]])(
    "returns true for a %p",
    (value) => {
      expect(isNumberOrString(value)).toBe(true);
    }
  );

  test.each([
    [emptyObject],
    [voidFunction],
    [emptyArray],
    [numberArray],
    [englishLanguage],
  ])("returns false for %p", (value) => {
    expect(isNumberOrString(value)).toBe(false);
  });
});

describe("isEither(array, string)", () => {
  const isArrayOrString = isEither(isArray, isString);
  test.each([[stringNumber], [stringName], [emptyArray], [numberArray]])(
    "returns true for a %p",
    (value) => {
      expect(isArrayOrString(value)).toBe(true);
    }
  );

  test.each([[emptyObject], [voidFunction], [englishLanguage], [number]])(
    "returns false for %p",
    (value) => {
      expect(isArrayOrString(value)).toBe(false);
    }
  );
});

describe("isEither(object, number)", () => {
  const isObjectOrNumber = isEither<object, number>(isObject, isNumber);
  test.each([[emptyObject], [englishLanguage], [number]])(
    "returns true for a %p",
    (value) => {
      expect(isObjectOrNumber(value)).toBe(true);
    }
  );

  test.each([[numberArray], [emptyArray], [stringNumber], [voidFunction]])(
    "returns false for %p",
    (value) => {
      expect(isObjectOrNumber(value)).toBe(false);
    }
  );
});

describe("isEither(object, isEither(number, string))", () => {
  const isObjectOrNumberOrString = isEither(
    isObject,
    isEither(isNumber, isString)
  );

  test.each([
    [emptyObject],
    [englishLanguage],
    [number],
    [stringNumber],
  ])("returns true for a %p", (value) => {
    expect(isObjectOrNumberOrString(value)).toBe(true);
  });

  test.each([[emptyArray], [numberArray], [voidFunction]])(
    "returns false for %p",
    (value) => {
      expect(isObjectOrNumberOrString(value)).toBe(false);
    }
  );
});
