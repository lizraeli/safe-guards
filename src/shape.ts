import { isObject } from "./core";
import type { TypeCheckDict, TestResult } from "./types";

export function testShape<T>(checkDict: TypeCheckDict<T>) {
  return function <K>(value: K): TestResult<K> {
    if (!isObject(value)) {
      return {
        success: false,
        message: "argument is not a plain object",
      };
    }

    for (const key in checkDict) {
      const check = checkDict[key];

      if (!(key in value)) {
        return {
          success: false,
          message: `missing property: ${key}`,
        };
      }

      if (!check(value[key])) {
        return {
          success: false,
          message: `value of property '${key}' is not of the expected type.`,
        };
      }
    }

    return {
      success: true,
      value,
    };
  };
}

export function isShape<T>(checkDict: TypeCheckDict<T>) {
  return function (value: unknown): value is T {
    const result = testShape(checkDict)(value);
    return result.success;
  };
}
