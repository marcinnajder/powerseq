import { Enumerable } from "../enumerable";
import { predicate } from "../common/types";

export function last<T>(source: Iterable<T>, predicate?: predicate<T>): T | undefined {
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
declare module '../enumerable' {
    interface Enumerable<T> {
        last(predicate?: predicate<T>): T | undefined;
    }
}
Enumerable.prototype.last = function <T>(this: Enumerable<T>, predicate?: predicate<T>): T | undefined {
    return last(this, predicate);
};