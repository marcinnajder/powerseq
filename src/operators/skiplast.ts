import { Enumerable } from "../enumerable";
import { predicate } from "../common/types";
import wrap from "../common/wrap";

export function skiplast<T>(source: Iterable<T>, count: number) {
    return wrap(function* () {

        if (typeof count === "undefined" || count <= 0) {
            yield* source;
            return;
        }

        var iterator = source[Symbol.iterator]();
        var value: IteratorResult<T>;
        var cache: T[] = [];

        // process first 'count' items
        for (let i = 0; i < count; i++) {
            value = iterator.next();
            if (value.done) {
                return;
            }
            cache.push(value.value);
        }

        // process other items
        var j = 0;
        while (true) {
            value = iterator.next();
            if (value.done) {
                return;
            }

            yield cache[j];

            cache[j++] = value.value;

            if (j === count) {
                j = 0;
            }
        }
    });
}

declare module '../enumerable' {
    interface Enumerable<T> {
        skiplast(count: number): Enumerable<T>;
    }
}
Enumerable.prototype.skiplast = function <T>(this: Enumerable<T>, count: number) {
    return new Enumerable<T>(skiplast<T>(this, count));
};