export type TypeCheck<T> = (value: unknown) => value is T;
export type TypeCheckDict<T extends { [key:string]: any }> = { [K in keyof T]: TypeCheck<T[K]> };
