import { isObject } from "./core";
import type { TypeCheckDict } from "./types";

export type ShapeTestResult<K> =
  | { success: true; value: K }
  | { success: false; message: string };

export function testShape<T>(checkDict: TypeCheckDict<T>) {
  function test<K>(value: K): ShapeTestResult<K> {
    if (!isObject(value)) {
      return {
        success: false,
        message: "argument is not a plain object",
      };
    }

    for (const key in checkDict) {
      if (!(key in value)) {
        return {
          success: false,
          message: `missing property: ${key}`,
        };
      }

      const check = checkDict[key];
      const propValue = value[key];

      if (!check(propValue)) {
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
  }

  return test;
}

export function isShape<T>(checkDict: TypeCheckDict<T>) {
  function check(value: unknown): value is T {
    const result = testShape(checkDict)(value);
    return result.success;
  }

  return check;
}
