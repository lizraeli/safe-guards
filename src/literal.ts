export function isLiteral<T extends string | number>(literal: T) {
  function check(value: unknown): value is T {
    return value === literal;
  }
  return check;
}
