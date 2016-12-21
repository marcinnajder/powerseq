import { Enumerable } from "../enumerable";
import { keySelector } from "../common/types";
import { maxmin } from "../common/maxmin";

export function max<T>(source: Iterable<T>): T | undefined;
export function max<T, TValue>(source: Iterable<T>, valueSelector: keySelector<T, TValue>): TValue | undefined;
export function max<T, TValue>(source: Iterable<T>, valueSelector?: keySelector<T, TValue>): any {
    return maxmin<T, TValue>(source, valueSelector || (item => <any>item), (key: any, minmaxKey: any) => key > minmaxKey, true);
}
declare module '../enumerable' {
    interface Enumerable<T> {
        max(): T | undefined;
        max<TValue>(valueSelector: keySelector<T, TValue>): TValue | undefined;
    }
}
Enumerable.prototype.max = function <T, TValue>(this: Enumerable<T>, valueSelector?: keySelector<T, TValue>): T | TValue | undefined {
    return max(this, valueSelector);
};