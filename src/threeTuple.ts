import { isArray } from "./core";
import type { TypeCheck } from "./types";

export const isThreeTuple = <X, Y, Z>(
  checkFirst: TypeCheck<X>,
  checkSecond: TypeCheck<Y>,
  checkThird: TypeCheck<Z>
) => (value: unknown): value is [X, Y, Z] => {
  return (
    isArray(value) &&
    value.length === 3 &&
    checkFirst(value[0]) &&
    checkSecond(value[1]) &&
    checkThird(value[2])
  );
};
