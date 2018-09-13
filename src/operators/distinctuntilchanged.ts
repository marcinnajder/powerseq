import { keySelector } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function distinctuntilchanged<T>(source: Iterable<T>, keySelector?: keySelector<T, any>) {
    return wrapInIterable(function* () {
        if (typeof keySelector === "undefined") {
            keySelector = item => item;
        }

        var iterator = source[Symbol.iterator]();
        var value: IteratorResult<T>;
        var lastKey: T;
        var key;

        value = iterator.next();
        if (value.done) return;
        lastKey = keySelector(value.value);
        yield value.value;

        while (true) {
            value = iterator.next();
            if (value.done) return;

            key = keySelector(value.value);
            if (lastKey !== key) {
                lastKey = key;
                yield value.value;
            }
        }
    });
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        distinctuntilchanged(keySelector?: keySelector<T, any>): Enumerable<T>;
    }
}
Enumerable.prototype.distinctuntilchanged = function <T>(this: Enumerable<T>, keySelector?: keySelector<T, any>): Enumerable<T> {
    return new Enumerable<T>(distinctuntilchanged<T>(this, keySelector));
};