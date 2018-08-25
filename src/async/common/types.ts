// file was generated
import { AsyncEnumerable } from "../enumerable";

export type selector<T, TResult> = (item: T, index: number) => TResult;
export type predicate<T> = (item: T, index: number) => boolean;
export type comparer<T> = (a: T, b: T) => number;
export type Dictionary<T> = {
    [key: string]: T;
}
export type keySelector<T, TKey> = (item: T) => TKey;

// this was try to resolve TS inference problem  

//export type EAsyncIterable<T> = AsyncIterable<T> | AsyncEnumerable<T>;
// This was try to resolve TypeScript type inference problem, problem occurs when method has many iterable arguments 
// with different generic type like for example zip<T1,T2,...>(s1:I<T1>, s2:I<T2>, (a:T1,b:T2) => ... ) but we pass argument
// of type array or AsyncIterable<T> or AsyncEnumerable<T>. For some of them type of lambda expression argument is unknown.
// Problem mainly occurs in "extension method" variant, "standalone method" variant works fine. 
export type EAsyncIterable<T> = AsyncIterable<T>;
// After introducing EAsyncIterable<T> type problem still exist in some cases so better solution is to use manually asiterable method in those cases.
// EAsyncIterable<T> still exist as a marker of problematic cases, probable it will be removed in the future.


export type func0<TResult> = () => TResult;
export type func1<TArg, TResult> = (arg: TArg) => TResult;
export type func2<TArg1, TArg2, TResult> = (arg1: TArg1, arg2: TArg2) => TResult;
