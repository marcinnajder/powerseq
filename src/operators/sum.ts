import { Enumerable } from "../enumerable_";
import { keySelector } from "../common/types";

export function sum(source: Iterable<number>): number;
export function sum<T>(source: Iterable<T>, valueSelector: keySelector<T, number>): number;
export function sum<T>(source: Iterable<T>, valueSelector?: keySelector<T, number>): number {
    var result = 0;
    if (typeof valueSelector === "undefined") {
        for (var item of source) {
            result += <any>item;
        }
    } else {
        for (var item of source) {
            result += valueSelector(item);
        }
    }
    return result;
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        sum(): number;
        sum(valueSelector: keySelector<T, number>): number;
    }
}
Enumerable.prototype.sum = function <T>(this: Enumerable<T>, valueSelector?: keySelector<T, number>): number {
    return sum(this, valueSelector);
};