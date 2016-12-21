import { Enumerable } from "../enumerable";

export function reduce<T>(source: Iterable<T>, func: (prev: T, item: T) => T): T;
export function reduce<T, TAccumulate>(source: Iterable<T>, func: (prev: TAccumulate, item: T) => TAccumulate, seed: TAccumulate): TAccumulate;
export function reduce<T, TAccumulate>(source: Iterable<T>, func: (prev: TAccumulate, item: T) => TAccumulate, seed?: TAccumulate): TAccumulate {
    var iterator = source[Symbol.iterator]();
    var value: IteratorResult<T>;
    var accumulator = seed;
    var valueIsSet = typeof seed !== "undefined";

    if (typeof seed === "undefined") {
        value = iterator.next();
        if (value.done) throw new TypeError('Sequence contains no elements')
        accumulator = <any>value.value;
    }

    while (true) {
        value = iterator.next();
        if (value.done) break;

        accumulator = func(accumulator, value.value);
    }

    return accumulator;
}
declare module '../enumerable' {
    interface Enumerable<T> {
        reduce(func: (prev: T, item: T) => T): T;
        reduce<TAccumulate>(func: (prev: TAccumulate, item: T) => TAccumulate, seed: TAccumulate): TAccumulate;
    }
}
Enumerable.prototype.reduce = function <T, TAccumulate>(this: Enumerable<T>, func: (prev: TAccumulate, item: T) => TAccumulate, seed?: TAccumulate): TAccumulate {
    return reduce(this, func, seed);
};