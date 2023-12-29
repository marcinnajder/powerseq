import { wrapInThunk } from "../common/wrap";
import { OperatorR } from "../common/types";

function _reduce<T, TAccumulate>(source: Iterable<T>, func: (prev: TAccumulate, item: T) => TAccumulate, seed?: TAccumulate): TAccumulate {
    var iterator = source[Symbol.iterator]();
    var value: IteratorResult<T>;
    var accumulator: TAccumulate;

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

export function reduce<T>(source: Iterable<T>, func: (prev: T, item: T) => T): T;
export function reduce<T, TAccumulate>(source: Iterable<T>, func: (prev: TAccumulate, item: T) => TAccumulate, seed: TAccumulate): TAccumulate;
export function reduce<T>(func: (prev: T, item: T) => T): OperatorR<T, T>;
export function reduce<T, TAccumulate>(func: (prev: TAccumulate, item: T) => TAccumulate, seed: TAccumulate): OperatorR<T, TAccumulate>;
export function reduce() {
    return wrapInThunk(arguments, _reduce);
}
