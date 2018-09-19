import { Enumerable } from "../enumerable_";
import { keySelector, OperatorR } from "../common/types";
import { maxmin } from "../common/maxmin";
import { wrapInThunk } from "../common/wrap";

function _min<T, TValue>(source: Iterable<T>, valueSelector?: keySelector<T, TValue>): any {
    return maxmin(source, valueSelector || ((item) => <any>item), (key: any, minmaxKey: any) => key < minmaxKey, true);
}
export function min<T>(source: Iterable<T>): T | undefined;
export function min<T, TValue>(source: Iterable<T>, valueSelector: keySelector<T, TValue>): TValue | undefined;
export function min<T>(): OperatorR<T, T | undefined>;
export function min<T, TValue>(valueSelector: keySelector<T, TValue>): OperatorR<T, TValue | undefined>;
export function min() {
    return wrapInThunk(arguments, _min);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        min(): T | undefined;
        min<TValue>(valueSelector?: keySelector<T, TValue>): TValue | undefined;
    }
}
Enumerable.prototype.min = function <T, TValue>(this: Enumerable<T>, valueSelector?: keySelector<T, TValue>): TValue | T | undefined {
    return _min(this, valueSelector);
};