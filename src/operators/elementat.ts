import { Enumerable } from "../enumerable";
import { predicate } from "../common/types";

export function elementat<T>(source: Iterable<T>, index: number, defaultValue: T): T;
export function elementat<T>(source: Iterable<T>, index: number): T | undefined;
export function elementat<T>(source: Iterable<T>, index: number, defaultValue?: T): T | undefined {
    if (index >= 0) {
        var i = 0;
        for (var item of source) {
            if (i++ === index) {
                return item;
            }
        }
    }
    return defaultValue;
}
declare module '../enumerable' {
    interface Enumerable<T> {
        elementat(index: number, defaultValue: T): T;
        elementat(index: number): T | undefined;
    }
}
Enumerable.prototype.elementat = function <T>(this: Enumerable<T>, index: number, defaultValue?: T): T | undefined {
    return elementat<T>(this, index, defaultValue);
};