
export type selector<T, TResult> = (item: T, index: number) => TResult;
export type predicate<T> = (item: T, index: number) => boolean;
export type comparer<T> = (a: T, b: T) => number;

export type Dictionary<T> = {
    [key: string]: T;
}

export type keySelector<T, TKey> = (item: T) => TKey;

// this was try to resolve TS inference problem  

//export type EIterable<T> = Iterable<T> | Enumerable<T>;
// This was try to resolve TypeScript type inference problem, problem occurs when method has many iterable arguments 
// with different generic type like for example zip<T1,T2,...>(s1:I<T1>, s2:I<T2>, (a:T1,b:T2) => ... ) but we pass argument
// of type array or Iterable<T> or Enumerable<T>. For some of them type of lambda expression argument is unknown.
// Problem mainly occurs in "extension method" variant, "standalone method" variant works fine. 
export type EIterable<T> = Iterable<T>;
// After introducing EIterable<T> type problem still exist in some cases so better solution is to use manually asiterable method in those cases.
// EIterable<T> still exist as a marker of problematic cases, probable it will be removed in the future.


// export type func0<TResult> = () => TResult;
// export type func1<TArg, TResult> = (arg: TArg) => TResult;
// export type func2<TArg1, TArg2, TResult> = (arg1: TArg1, arg2: TArg2) => TResult;


export type OperatorTR<T, R> = (source: T) => R;

export type OperatorR<T, R> = OperatorTR<Iterable<T>, R>;

export type Operator<T, R> = OperatorTR<Iterable<T>, Iterable<R>>;

export type Nothing = null | undefined;