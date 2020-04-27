import { isArray } from "./core";
import type { TypeCheck, TestResult } from "./types";

type EitherTestResult<X, Y> =
  | {
      success: true;
      value: X | Y;
    }
  | { success: false };

export const testEither = <X, Y>(
  checkFirst: TypeCheck<X>,
  checkSecond: TypeCheck<Y>
) => (value: unknown): EitherTestResult<X, Y> => {
  if (checkFirst(value) || checkSecond(value)) {
    return {
      success: true,
      value,
    };
  }

  return {
    success: false,
  };
};

export const isEither = <X, Y>(
  checkFirst: TypeCheck<X>,
  checkSecond: TypeCheck<Y>
) => (value: unknown): value is X | Y => {
  const result = testEither(checkFirst, checkSecond)(value);
  return result.success;
};
