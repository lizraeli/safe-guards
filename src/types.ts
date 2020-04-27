export type TypeCheck<T> = (value: unknown) => value is T;
export type TypeCheckDict<T> = { [K in keyof T]: TypeCheck<T[K]> };

export type TestResult<K> =
  | { success: true; value: K }
  | { success: false; message: string };
