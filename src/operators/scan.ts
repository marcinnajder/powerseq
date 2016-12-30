import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function scan<T>(source: Iterable<T>, func: (prev: T, item: T) => T): Iterable<T>;
export function scan<T, TAccumulate>(source: Iterable<T>, func: (prev: TAccumulate, item: T) => TAccumulate, seed: TAccumulate): Iterable<TAccumulate>;
export function scan<T, TAccumulate>(source: Iterable<T>, func: (prev: TAccumulate, item: T) => TAccumulate, seed?: TAccumulate): Iterable<TAccumulate> {
    return wrap(function* () {
        var iterator = source[Symbol.iterator]();
        var value: IteratorResult<T>;
        var accumulator = seed;

        if (typeof seed === "undefined") {
            value = iterator.next();
            if (value.done) return;
            accumulator = <any>value.value;
        }

        while (true) {
            value = iterator.next();
            if (value.done) return;

            accumulator = func(accumulator, value.value);
            yield accumulator;
        }
    });
}
declare module '../enumerable' {
    interface Enumerable<T> {
        scan(func: (prev: T, item: T) => T): Enumerable<T>;
        scan<TAccumulate>(func: (prev: TAccumulate, item: T) => TAccumulate, seed: TAccumulate): Enumerable<TAccumulate>;
    }
}
Enumerable.prototype.scan = function <T, TAccumulate>(this: Enumerable<T>, func: (prev: TAccumulate, item: T) => TAccumulate, seed?: TAccumulate): Enumerable<TAccumulate> {
    return new Enumerable(scan(this, func, seed));
};