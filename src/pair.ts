import { isArray } from "./core";
import type { TypeCheck } from "./types";

export const isPairOf = <X, Y>(
  checkFirst: TypeCheck<X>,
  checkSecond: TypeCheck<Y>
) => (value: unknown): value is [X, Y] => {
  return (
    isArray(value) &&
    value.length === 2 &&
    checkFirst(value[0]) &&
    checkSecond(value[1])
  );
};
