
export type Func<T, R> = (arg: T) => R;
export type Func2<T1, T2, R> = (arg1: T1, arg2: T2) => R;
export type Func3<T1, T2, T3, R> = (arg1: T1, arg2: T2, arg3: T3) => R;

export type Predicate<T> = (item: T, index: number) => boolean;
export type Comparer<T> = (a: T, b: T) => number;

export type Dictionary<T> = {
    [key: string]: T;
}


export type OperatorTR<T, R> = (source: T) => R;

export type OperatorR<T, R> = OperatorTR<Iterable<T>, R>;

export type Operator<T, R> = OperatorTR<Iterable<T>, Iterable<R>>;

export type Nothing = null | undefined;


// **** ****
//research: this was try to resolve TS inference problem  

//export type EIterable<T> = Iterable<T> | Enumerable<T>;
// This was try to resolve TypeScript type inference problem, problem occurs when method has many iterable arguments 
// with different generic type like for example zip<T1,T2,...>(s1:I<T1>, s2:I<T2>, (a:T1,b:T2) => ... ) but we pass argument
// of type array or Iterable<T> or Enumerable<T>. For some of them type of lambda expression argument is unknown.
// Problem mainly occurs in "extension method" variant, "standalone method" variant works fine. 
// export type EIterable<T> = Iterable<T>;
// After introducing EIterable<T> type problem still exist in some cases so better solution is to use manually asiterable method in those cases.
// EIterable<T> still exist as a marker of problematic cases, probable it will be removed in the future.

// **** ****
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

