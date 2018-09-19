import { Enumerable } from "../enumerable_";
import { predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _last<T>(source: Iterable<T>, predicate?: predicate<T>): T | undefined {
    var value: T | undefined = undefined;
    if (typeof predicate === "undefined") {
        for (var item of source) {
            value = item;
        }
    }
    else {
        var index = 0;
        for (var item of source) {
            if (predicate(item, index++)) {
                value = item;
            }
        }
    }
    return value;
}

export function last<T>(source: Iterable<T>, predicate?: predicate<T>): T | undefined;
export function last<T>(predicate?: predicate<T>): OperatorR<T, T | undefined>;
export function last() {
    return wrapInThunk(arguments, _last);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        last(predicate?: predicate<T>): T | undefined;
    }
}
Enumerable.prototype.last = function <T>(this: Enumerable<T>, predicate?: predicate<T>): T | undefined {
    return _last(this, predicate);
};