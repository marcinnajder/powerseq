import { predicate } from "../common/types";
import { Enumerable } from "../enumerable_";

export function every<T>(source: Iterable<T>, predicate: predicate<T>): boolean {
    var index = 0;
    for (var item of source) {
        if (!predicate(item, index++)) {
            return false;
        }
    }
    return true;
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        every(predicate: predicate<T>): boolean;
    }
}
Enumerable.prototype.every = function <T>(this: Enumerable<T>, predicate: predicate<T>): boolean {
    return every(this, predicate);
};