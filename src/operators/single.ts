import { Enumerable } from "../enumerable_";
import { predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _single<T>(source: Iterable<T>, predicate?: predicate<T>): T | undefined {
    var hasValue = false;
    var value: T | undefined = undefined;

    if (typeof predicate === "undefined") {
        for (var item of source) {
            if (!hasValue) {
                value = item;
                hasValue = true;
            }
            else {
                throw new TypeError("More than one element satisfies the condition in predicate.");
            }
        }
    }
    else {
        var index = 0;
        for (var item of source) {
            if (predicate(item, index++)) {
                if (!hasValue) {
                    value = item;
                    hasValue = true;
                }
                else {
                    throw new TypeError("More than one element satisfies the condition in predicate.");
                }
            }
        }
    }
    return value;
}

export function single<T>(source: Iterable<T>, predicate?: predicate<T>): T | undefined;
export function single<T>(predicate?: predicate<T>): OperatorR<T, T | undefined>;
export function single() {
    return wrapInThunk(arguments, _single);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        single(predicate?: predicate<T>): T | undefined;
    }
}
Enumerable.prototype.single = function <T>(this: Enumerable<T>, predicate?: predicate<T>): T | undefined {
    return _single(this, predicate);
};