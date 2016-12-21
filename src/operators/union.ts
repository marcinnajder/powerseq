import { Enumerable } from "../enumerable";
import { keySelector } from "../common/types";

export function* union<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>): Iterable<T> {
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
}
declare module '../enumerable' {
    interface Enumerable<T> {
        union(source2: Iterable<T>, keySelector?: keySelector<T, any>): Enumerable<T>;
    }
}
Enumerable.prototype.union = function <T>(this: Enumerable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>): Enumerable<T> {
    return new Enumerable<T>(union<T>(this, source2, keySelector));
};