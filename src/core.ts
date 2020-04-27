export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

export const isArray = (value: unknown): value is any[] => Array.isArray(value);

export const isObject = (value: unknown): value is { [key: string]: unknown } =>
  typeof value == "object" &&
  value instanceof Object &&
  !(value instanceof Array);

export const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === "function";
