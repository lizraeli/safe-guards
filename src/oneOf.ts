import { isLiteral } from "./literal";

type OneOfTestResult<T> =
  | {
      success: true;
      value: T;
    }
  | { success: false };

export function testOneOfLiterals<T extends string | number>(
  ...intialValues: T[]
) {
  const checks = intialValues.map(isLiteral);

  function test(value: unknown): OneOfTestResult<T> {
    for (const check of checks) {
      if (check(value)) {
        return {
          success: true,
          value,
        };
      }
    }

    return {
      success: false,
    };
  }

  return test;
}

export function isOneOfLiterals<T extends string | number>(...values: T[]) {
  function check(value: unknown): value is T {
    const result = testOneOfLiterals(...values)(value);
    return result.success;
  }

  return check;
}

// const isTwoOrThree = isOneOfLiterals(2, 3);
// function doSomething(val: unknown) {
//   if (isTwoOrThree(val)) {
//     val;
//   }
// }

// interface Dice {
//   sides: 1 | 2 | 3 | 4 | 5 | 6;
//   names: "cat" | "dog";
// }

// const isDice = isShape<Dice>({
//   sides: isOneOfLiterals(1, 2, 3),
//   names: isOneOfLiterals("cat"),
// });
