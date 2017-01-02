import { Enumerable } from "../enumerable";

export type selector<T, TResult> = (item: T, index: number) => TResult;
export type predicate<T> = (item: T, index: number) => boolean;
export type comparer<T> = (a: T, b: T) => number;
export type Dictionary<T> = {
    [key: string]: T;
}
export type keySelector<T, TKey> = (item: T) => TKey;
export type EIterable<T> = Iterable<T> | Enumerable<T>;

export type func0<TResult> = () => TResult;
export type func1<TArg, TResult> = (arg: TArg) => TResult;
export type func2<TArg1, TArg2, TResult> = (arg1: TArg1, arg2: TArg2) => TResult;
