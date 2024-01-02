import { Selector, OperatorR } from "../common/types";
import { maxmin } from "../common/maxmin";
import { wrapInThunk } from "../common/wrap";

function _max<T, TValue>(source: Iterable<T>, valueSelector?: Selector<T, TValue>): any {
    return maxmin<T, TValue>(source, valueSelector || (item => <any>item), (key: any, minmaxKey: any) => key > minmaxKey, true);
}

export function max<T>(source: Iterable<T>): T | undefined;
export function max<T, TValue>(source: Iterable<T>, valueSelector: Selector<T, TValue>): TValue | undefined;
export function max<T>(): OperatorR<T, T | undefined>;
export function max<T, TValue>(valueSelector: Selector<T, TValue>): OperatorR<T, TValue | undefined>;
export function max() {
    return wrapInThunk(arguments, _max);
}
