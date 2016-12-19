import { Enumerable } from "../enumerable";
import { predicate } from "../common/types";

export function elementat<T>(source: Iterable<T>, index: number): T | undefined {
    if (index >= 0) {
        var i = 0;
        for (var item of source) {
            if (i++ === index) {
                return item;
            }
        }
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        elementat(index: number): T | undefined;
    }
}
Enumerable.prototype.elementat = function <T>(this: Enumerable<T>, index: number): T | undefined {
    return elementat<T>(this, index);
};