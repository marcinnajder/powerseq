import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Func2, Operator } from "../common/types";

function _scan<T, A>(source: Iterable<T>, func: Func2<A, T, A>, seed?: A): Iterable<A> {
    return wrapInIterable(function* () {
        var iterator = source[Symbol.iterator]();
        var value: IteratorResult<T>;
        var accumulator: A;

        if (typeof seed === "undefined") {
            value = iterator.next();
            if (value.done) return;
            accumulator = <any>value.value;
        } else {
            accumulator = seed;
        }

        while (true) {
            value = iterator.next();
            if (value.done) return;

            accumulator = func(accumulator, value.value);
            yield accumulator;
        }
    });
}

export function scan<T>(source: Iterable<T>, func: Func2<T, T, T>): Iterable<T>;
export function scan<T, A>(source: Iterable<T>, func: Func2<A, T, A>, seed: A): Iterable<A>;
export function scan<T>(func: Func2<T, T, T>): Operator<T, T>;
export function scan<T, A>(func: Func2<A, T, A>, seed: A): Operator<T, A>;
export function scan() {
    return wrapInThunk(arguments, _scan);
}
