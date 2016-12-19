import { Enumerable } from "../enumerable";
import { keySelector } from "../common/types";

export function average(source: Iterable<number>): number | undefined;
export function average<T>(source: Iterable<T>, valueSelector: keySelector<T, number>): number | undefined;
export function average<T>(source: Iterable<T>, valueSelector?: keySelector<T, number>): number | undefined {
    var result = 0;
    var count = 0;
    if (typeof valueSelector === "undefined") {
        for (var item of source) {
            result += <any>item;
            count++;
        }
    } else {
        for (var item of source) {
            result += valueSelector(item);
            count++
        }
    }
    return count === 0 ? undefined : (result / count);
}

declare module '../enumerable' {
    interface Enumerable<T> {
        average(): number | undefined;
        average(valueSelector: keySelector<T, number>): number | undefined;
    }
}
Enumerable.prototype.average = function <T>(this: Enumerable<T>, valueSelector?: keySelector<T, number>): number | undefined {
    return average(this, valueSelector);
};