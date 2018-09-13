import { Enumerable } from "../enumerable_";
import { keySelector } from "../common/types";
import { wrapInIterable } from "../common/wrap";

export function union<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>) {
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
        for (var item of source2) {
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
        union(source2: Iterable<T>, keySelector?: keySelector<T, any>): Enumerable<T>;
    }
}
Enumerable.prototype.union = function <T>(this: Enumerable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>): Enumerable<T> {
    return new Enumerable<T>(union<T>(this, source2, keySelector));
};