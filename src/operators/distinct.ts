import { keySelector } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function distinct<T>(source: Iterable<T>, keySelector?: keySelector<T, any>) {
    return wrapInIterable(function* () {
        if (typeof keySelector === "undefined") {
            keySelector = item => item;
        }
        var set = new Set<any>();
        var key;
        for (var item of source) {
            key = keySelector(item);
            if (!set.has(key)) {
                set.add(key);
                yield item;
            }
        }
    });
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        distinct(keySelector?: keySelector<T, any>): Enumerable<T>;
    }
}
Enumerable.prototype.distinct = function <T>(this: Enumerable<T>, keySelector?: keySelector<T, any>): Enumerable<T> {
    return new Enumerable<T>(distinct<T>(this, keySelector));
};