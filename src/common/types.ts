
export type f<T, R> = (arg: T) => R;

export type selector<T, TResult> = (item: T, index: number) => TResult;
export type predicate<T> = (item: T, index: number) => boolean;
export type comparer<T> = (a: T, b: T) => number;

export type Dictionary<T> = {
    [key: string]: T;
}

export type Selector<T, R> = (item: T) => R;
export type SelectorI<T, R> = (item: T, index: number) => R;

export type Selector2<T1, T2, R> = (item1: T1, item2: T2) => R;
export type Selector3<T1, T2, T3, R> = (item1: T1, item2: T2, item3: T3) => R;

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



// 
// research: inferring the second overload of operator (used inside 'pipe') does not work correctly,
// 'infer T' for generics arguments return 'unkwnown'

// type AlsoOperatorR<F extends (...args: any) => any> = F extends (first: Iterable<infer T>, ...args: infer Args) => infer R ?
//     F & ((...args: Args) => OperatorR<T, R>) : never;

// function _count<T>(source: Iterable<T>, predicate?: predicate<T>): number {
//     return 1
// }

// const count: AlsoOperatorR<typeof _count> = function count() {
//     return 1; // return wrapInThunk(arguments, _count);
// } as any;

// var a1 = count([1, 2, 3], x => x > 0)
// var a2 = count((x: number) => x > 0)([1, 2, 3]); // TS compilation errors

