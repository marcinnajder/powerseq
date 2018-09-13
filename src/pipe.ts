import { OperatorR, Operator } from "./common/types";

export function pipe<T>(source: Iterable<T>): Iterable<T>;
export function pipe<T, A>(source: Iterable<T>, op1: OperatorR<T, A>): A;
export function pipe<T, A, B>(source: Iterable<T>, op1: Operator<T, A>, op2: OperatorR<A, B>): B;
export function pipe<T, A, B, C>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: OperatorR<B, C>): C;
export function pipe<T, A, B, C, D>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: OperatorR<C, D>): D;
export function pipe<T, A, B, C, D, E>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: Operator<C, D>, op5: OperatorR<D, E>): E;
export function pipe<T, A, B, C, D, E, F>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: Operator<C, D>, op5: Operator<D, E>, op6: OperatorR<E, F>): F;
export function pipe<T, A, B, C, D, E, F, G>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: Operator<C, D>, op5: Operator<D, E>, op6: Operator<E, F>, op7: OperatorR<F, G>): G;
export function pipe<T, A, B, C, D, E, F, G, H>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: Operator<C, D>, op5: Operator<D, E>, op6: Operator<E, F>, op7: Operator<F, G>, op8: OperatorR<G, H>): H;
export function pipe<T, A, B, C, D, E, F, G, H, I>(source: Iterable<T>, op1: Operator<T, A>, op2: Operator<A, B>, op3: Operator<B, C>, op4: Operator<C, D>, op5: Operator<D, E>, op6: Operator<E, F>, op7: Operator<F, G>, op8: Operator<G, H>, op9: OperatorR<H, I>): I;
export function pipe<T, R>(source: Iterable<T>, ...operators: any[]): R {
    return operators.reduce((iterable, operator) => operator(iterable), source);
}

