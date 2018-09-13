import { keySelector } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function except<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>) {
    return wrapInIterable(function* () {
        if (typeof keySelector === "undefined") {
            keySelector = item => item;
        }
        var set = new Set<T>();
        var set2 = new Set<T>();
        var key;
        for (var s of source2) {
            set2.add(keySelector(s));
        }
        for (var item of source) {
            key = keySelector(item);
            if (!set.has(key)) {
                set.add(key);
                if (!set2.has(key)) {
                    yield item;
                }
            }
        }

    });
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        except(source2: Iterable<T>, keySelector?: keySelector<T, any>): Enumerable<T>;
    }
}
Enumerable.prototype.except = function <T>(this: Enumerable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>): Enumerable<T> {
    return new Enumerable<T>(except<T>(this, source2, keySelector));
};