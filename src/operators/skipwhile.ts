import { Enumerable } from "../enumerable_";
import { predicate } from "../common/types";
import { wrapInIterable } from "../common/wrap";

export function skipwhile<T>(source: Iterable<T>, predicate: predicate<T>) {
    return wrapInIterable(function* () {
        var iterator = source[Symbol.iterator]();
        var value: IteratorResult<T>;
        var index = 0;

        while (true) {
            value = iterator.next();
            if (value.done) return;
            if (predicate(value.value, index++)) continue;
            yield value.value;
            break;
        }

        while (true) {
            var value = iterator.next();
            if (value.done) return;
            yield value.value;
        }
    });
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        skipwhile(predicate: predicate<T>): Enumerable<T>;
    }
}
Enumerable.prototype.skipwhile = function <T>(this: Enumerable<T>, predicate: predicate<T>) {
    return new Enumerable<T>(skipwhile(this, predicate));
};