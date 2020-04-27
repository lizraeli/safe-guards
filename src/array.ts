import { isNumber, isString, isArray } from "./core";

export type TypeCheck<T> = (value: unknown) => value is T;

export const isArrayOf = <T>(check: TypeCheck<T>) => (
  value: unknown
): value is T[] => {
  return isArray(value) && value.every(check);
};

export const isNumberArray = isArrayOf(isNumber);
export const isStringArray = isArrayOf(isString);
