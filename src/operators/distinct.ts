import { keySelector, Operator } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _distinct<T>(source: Iterable<T>, keySelector?: keySelector<T, any>) {
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

export function distinct<T>(source: Iterable<T>, keySelector?: keySelector<T, any>): Iterable<T>;
export function distinct<T>(keySelector?: keySelector<T, any>): Operator<T, T>;
export function distinct() {
    return wrapInThunk(arguments, _distinct);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        distinct(keySelector?: keySelector<T, any>): Enumerable<T>;
    }
}
Enumerable.prototype.distinct = function <T>(this: Enumerable<T>, keySelector?: keySelector<T, any>): Enumerable<T> {
    return new Enumerable<T>(_distinct<T>(this, keySelector));
};