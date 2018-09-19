import { Enumerable } from "../enumerable_";
import { OperatorR } from "../common/types";
import { wrapInThunkAlways } from "../common/wrap";

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

export function includesp<T>(searchElement: T, fromIndex?: number): OperatorR<T, boolean> {
    return wrapInThunkAlways(arguments, includes) as any;
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        includes(earchElement: T, fromIndex?: number): boolean;
    }
}
Enumerable.prototype.includes = function <T>(this: Enumerable<T>, searchElement: T, fromIndex?: number): boolean {
    return includes(this, searchElement, fromIndex);
};