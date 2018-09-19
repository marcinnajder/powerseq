import { Enumerable } from "../enumerable_";
import { keySelector, OperatorR } from "../common/types";
import { maxmin } from "../common/maxmin";
import { wrapInThunk } from "../common/wrap";

function _minby<T>(source: Iterable<T>, valueSelector: keySelector<T, any>): T | undefined {
    return maxmin(source, valueSelector, (key: any, minmaxKey: any) => key < minmaxKey, false);
}

export function minby<T>(source: Iterable<T>, valueSelector: keySelector<T, any>): T | undefined;
export function minby<T>(valueSelector: keySelector<T, any>): OperatorR<T, T | undefined>;
export function minby() {
    return wrapInThunk(arguments, _minby);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        minby(valueSelector?: keySelector<T, any>): T | undefined;
    }
}
Enumerable.prototype.minby = function <T>(this: Enumerable<T>, valueSelector: keySelector<T, any>): T | undefined {
    return _minby(this, valueSelector);
};