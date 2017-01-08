import { Enumerable } from "../enumerable";
import { predicate } from "../common/types";

export function find<T>(source: Iterable<T>, predicate?: predicate<T>): T | undefined;
export function find<T>(source: Iterable<T>, predicate: predicate<T>, defaultValue: T): T;
export function find<T>(source: Iterable<T>, predicate?: predicate<T>, defaultValue?: T): T | undefined {
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
declare module '../enumerable' {
    interface Enumerable<T> {
        find(predicate?: predicate<T>): T | undefined;
        find(predicate: predicate<T>, defaultValue: T): T;
    }
}
Enumerable.prototype.find = function <T>(this: Enumerable<T>, predicate?: predicate<T>, defaultValue?: T): T | undefined {
    return find(this, predicate, defaultValue);
};