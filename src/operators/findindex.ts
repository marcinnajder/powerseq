import { Enumerable } from "../enumerable";
import { predicate } from "../common/types";

export function findindex<T>(source: Iterable<T>, predicate: predicate<T>): number | undefined {
    var index = 0;
    for (var item of source) {
        if (predicate(item, index)) {
            return index;
        }
        index++;
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        findindex(predicate: predicate<T>): number | undefined;
    }
}
Enumerable.prototype.findindex = function <T>(this: Enumerable<T>, predicate: predicate<T>): number | undefined {
    return findindex(this, predicate);
};
