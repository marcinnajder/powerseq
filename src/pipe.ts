import { OperatorR, Operator, f } from "./common/types";

// export function pipe<T>(source: Iterable<T>): Iterable<T>;
// export function pipe<T, A>(source: Iterable<T>, op1: OperatorR<T, A>): A;
// export function pipe<T, A, B>(source: Iterable<T>, op1: Operator<T, A>, op2: OperatorR<A, B>): B;
// export function pipe<T, A, B, C>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: OperatorR<B, C>): C;
// export function pipe<T, A, B, C, D>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: OperatorR<C, D>): D;
// export function pipe<T, A, B, C, D, E>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: Operator<C, D>, op5: OperatorR<D, E>): E;
// export function pipe<T, A, B, C, D, E, F>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: Operator<C, D>, op5: Operator<D, E>, op6: OperatorR<E, F>): F;
// export function pipe<T, A, B, C, D, E, F, G>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: Operator<C, D>, op5: Operator<D, E>, op6: Operator<E, F>, op7: OperatorR<F, G>): G;
// export function pipe<T, A, B, C, D, E, F, G, H>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: Operator<C, D>, op5: Operator<D, E>, op6: Operator<E, F>, op7: Operator<F, G>, op8: OperatorR<G, H>): H;
// export function pipe<T, A, B, C, D, E, F, G, H, I>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: Operator<C, D>, op5: Operator<D, E>, op6: Operator<E, F>, op7: Operator<F, G>, op8: Operator<G, H>, op9: OperatorR<H, I>): I;
// export function pipe<T, R>(source: Iterable<T>, ...operators: any[]): R {
//     return operators.reduce((iterable, operator) => {
//         if (typeof operator !== "function") {
//             throw new Error(`Argument '${operator}' passed to the 'pipe' method is not a function.`);
//         }
//         return operator(iterable);
//     }, source);
// }



// f - functions
// export type f1<R> = () => R;
// export type f2<T1, R> = (a1: T1) => R;
// export type f3<T1, T2, R> = (a1: T1, a2: T2) => R;
// export type f4<T1, T2, T3, R> = (a1: T1, a2: T2, a3: T3) => R;
// export type f5<T1, T2, T3, T4, R> = (a1: T1, a2: T2, a3: T3, a4: T4) => R;



export function pipe<T1>(a: T1): T1;
export function pipe<T1, T2>(a: T1, f1: f<T1, T2>): T2;
export function pipe<T1, T2, T3>(a: T1, f1: f<T1, T2>, f2: f<T2, T3>): T3;
export function pipe<T1, T2, T3, T4>(a: T1, f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>): T4;
export function pipe<T1, T2, T3, T4, T5>(a: T1, f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>, f4: f<T4, T5>): T5;
export function pipe<T1, T2, T3, T4, T5, T6>(a: T1, f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>, f4: f<T4, T5>, f5: f<T5, T6>): T6;
export function pipe<T1, T2, T3, T4, T5, T6, T7>(a: T1, f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>, f4: f<T4, T5>, f5: f<T5, T6>, f6: f<T6, T7>): T7;
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8>(a: T1, f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>, f4: f<T4, T5>, f5: f<T5, T6>, f6: f<T6, T7>, f7: f<T7, T8>): T8;
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(a: T1, f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>, f4: f<T4, T5>, f5: f<T5, T6>, f6: f<T6, T7>, f7: f<T7, T8>, f8: f<T8, T9>): T9;
export function pipe(source: any, ...operators: Function[]): any {
    return operators.reduce((iterable, operator) => {
        if (typeof operator !== "function") {
            throw new Error(`Argument '${operator}' passed to the 'pipe' method is not a function.`);
        }
        return operator(iterable);
    }, source);
}
// export function pipe(a: any, ...fs: Function[]) {
//     return fs.reduce((prev, el) => el(prev), a);
// }

