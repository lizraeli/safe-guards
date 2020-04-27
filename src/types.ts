export type TypeCheck<T> = (value: unknown) => value is T;
export type TypeCheckDict<T> = { [K in keyof T]: TypeCheck<T[K]> };
