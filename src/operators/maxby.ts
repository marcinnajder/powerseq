import { Enumerable } from "../enumerable_";
import { keySelector, OperatorR } from "../common/types";
import { maxmin } from "../common/maxmin";
import { wrapInThunk } from "../common/wrap";

function _maxby<T>(source: Iterable<T>, valueSelector: keySelector<T, any>): T | undefined {
    return maxmin(source, valueSelector, (key: any, minmaxKey: any) => key > minmaxKey, false);
}

export function maxby<T>(source: Iterable<T>, valueSelector: keySelector<T, any>): T | undefined;
export function maxby<T>(valueSelector: keySelector<T, any>): OperatorR<T, T | undefined>;
export function maxby() {
    return wrapInThunk(arguments, _maxby);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        maxby(valueSelector?: keySelector<T, any>): T | undefined;
    }
}
Enumerable.prototype.maxby = function <T>(this: Enumerable<T>, valueSelector: keySelector<T, any>): T | undefined {
    return _maxby(this, valueSelector);
};