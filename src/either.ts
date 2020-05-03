import type { TypeCheck } from "./types";

type EitherTestResult<X, Y> =
  | {
      success: true;
      value: X | Y;
    }
  | { success: false };

export function testEither<X, Y>(
  checkFirst: TypeCheck<X>,
  checkSecond: TypeCheck<Y>
) {
  function test(value: unknown): EitherTestResult<X, Y> {
    if (checkFirst(value) || checkSecond(value)) {
      return {
        success: true,
        value,
      };
    }

    return {
      success: false,
    };
  }

  return test;
}

export function isEither<X, Y>(
  checkFirst: TypeCheck<X>,
  checkSecond: TypeCheck<Y>
) {
  function check(value: unknown): value is X | Y {
    const result = testEither(checkFirst, checkSecond)(value);
    return result.success;
  }

  return check;
}
