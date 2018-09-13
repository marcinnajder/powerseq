import { Enumerable } from "../enumerable_";
import { Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { predicate } from "../common/types";

function _filter<T>(source: Iterable<T>, predicate: predicate<T>): Iterable<T> {
    return wrapInIterable(function* () {
        var index = 0;
        for (var item of source) {
            if (predicate(item, index++)) {
                yield item;
            }
        }
    });
}

export function filter<T>(source: Iterable<T>, predicate: predicate<T>): Iterable<T>;
export function filter<T>(predicate: predicate<T>): Operator<T, T>;
export function filter() {
    return wrapInThunk(arguments, _filter);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        filter(predicate: predicate<T>): Enumerable<T>;
    }
}
Enumerable.prototype.filter = function <T>(this: Enumerable<T>, predicate: predicate<T>) {
    return new Enumerable<T>(filter(this, predicate));
};