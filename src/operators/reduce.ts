import { wrapInThunk } from "../common/wrap";
import { Func2, OperatorR } from "../common/types";

function _reduce<T, A>(source: Iterable<T>, func: Func2<A, T, A>, seed?: A): A {
    var iterator = source[Symbol.iterator]();
    var value: IteratorResult<T>;
    var accumulator: A;

    if (typeof seed === "undefined") {
        value = iterator.next();
        if (value.done) throw new TypeError('Sequence contains no elements')
        accumulator = <any>value.value;
    } else {
        accumulator = seed;
    }

    while (true) {
        value = iterator.next();
        if (value.done) break;

        accumulator = func(accumulator, value.value);
    }

    return accumulator;
}

export function reduce<T>(source: Iterable<T>, func: Func2<T, T, T>): T;
export function reduce<T, A>(source: Iterable<T>, func: Func2<A, T, A>, seed: A): A;
export function reduce<T>(func: Func2<T, T, T>): OperatorR<T, T>;
export function reduce<T, A>(func: Func2<A, T, A>, seed: A): OperatorR<T, A>;
export function reduce() {
    return wrapInThunk(arguments, _reduce);
}
