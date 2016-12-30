import { Enumerable } from "../enumerable";
import { predicate } from "../common/types";

export function includes<T>(source: Iterable<T>, searchElement: T, fromIndex?: number): boolean {
    if (typeof fromIndex === "undefined") {
        for (var item of source) {
            if (item === searchElement) {
                return true;
            }
        }
        return false;
    } else {
        var iterator = source[Symbol.iterator]();
        var value: IteratorResult<T>;
        var index = 0;

        while (index < fromIndex) {
            value = iterator.next();
            if (value.done) return false;
            index++;
        }

        while (true) {
            value = iterator.next();
            if (value.done) return false;

            if (value.value === searchElement) {
                return true;
            }
        }
    }
}

declare module '../enumerable' {
    interface Enumerable<T> {
        includes(earchElement: T, fromIndex?: number): boolean;
    }
}
Enumerable.prototype.includes = function <T>(this: Enumerable<T>, searchElement: T, fromIndex?: number): boolean {
    return includes(this, searchElement, fromIndex);
};