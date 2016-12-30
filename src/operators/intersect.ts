import { Enumerable } from "../enumerable";
import { keySelector } from "../common/types";
import wrap from "../common/wrap";

export function intersect<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>) {
    return wrap(function* () {
        if (typeof keySelector === "undefined") {
            keySelector = item => item;
        }
        var set = new Set<any>();
        for (var s of source) {
            set.add(keySelector(s));
        }
        var key;
        for (var item of source2) {
            key = keySelector(item);
            if (set.has(key)) {
                yield item;
            }
        }
    });
}
declare module '../enumerable' {
    interface Enumerable<T> {
        intersect(source2: Iterable<T>, keySelector?: keySelector<T, any>): Enumerable<T>;
    }
}
Enumerable.prototype.intersect = function <T>(this: Enumerable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>): Enumerable<T> {
    return new Enumerable<T>(intersect<T>(this, source2, keySelector));
};