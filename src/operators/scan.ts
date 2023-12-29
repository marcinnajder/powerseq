import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _scan<T, TAccumulate>(source: Iterable<T>, func: (prev: TAccumulate, item: T) => TAccumulate, seed?: TAccumulate): Iterable<TAccumulate> {
    return wrapInIterable(function* () {
        var iterator = source[Symbol.iterator]();
        var value: IteratorResult<T>;
        var accumulator: TAccumulate;

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

export function scan<T>(source: Iterable<T>, func: (prev: T, item: T) => T): Iterable<T>;
export function scan<T, TAccumulate>(source: Iterable<T>, func: (prev: TAccumulate, item: T) => TAccumulate, seed: TAccumulate): Iterable<TAccumulate>;
export function scan<T>(func: (prev: T, item: T) => T): Operator<T, T>;
export function scan<T, TAccumulate>(func: (prev: TAccumulate, item: T) => TAccumulate, seed: TAccumulate): Operator<T, TAccumulate>;
export function scan() {
    return wrapInThunk(arguments, _scan);
}
