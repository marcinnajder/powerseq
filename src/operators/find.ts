import { Enumerable } from "../enumerable_";
import { predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _find<T>(source: Iterable<T>, predicate?: predicate<T>, defaultValue?: T): T | undefined {
    if (typeof predicate === "undefined") {
        for (var item of source) {
            return item;
        }
        return defaultValue;
    }
    else {
        var index = 0;
        for (var item of source) {
            if (predicate(item, index++)) {
                return item;
            }
        }
        return defaultValue;
    }
}

export function find<T>(source: Iterable<T>, predicate?: predicate<T>): T | undefined;
export function find<T>(source: Iterable<T>, predicate: predicate<T>, defaultValue: T): T;
export function find<T>(predicate?: predicate<T>): OperatorR<T, T | undefined>;
export function find<T>(predicate: predicate<T>, defaultValue: T): OperatorR<T, T>;
export function find() {
    return wrapInThunk(arguments, _find);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        find(predicate?: predicate<T>): T | undefined;
        find(predicate: predicate<T>, defaultValue: T): T;
    }
}
Enumerable.prototype.find = function <T>(this: Enumerable<T>, predicate?: predicate<T>, defaultValue?: T): T | undefined {
    return _find(this, predicate, defaultValue);
};