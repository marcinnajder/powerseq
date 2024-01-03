import { Func, OperatorR } from "../common/types";
import { maxmin } from "../common/maxmin";
import { wrapInThunk } from "../common/wrap";

function _minby<T>(source: Iterable<T>, valueSelector: Func<T, any>): T | undefined {
    return maxmin(source, valueSelector, (key: any, minmaxKey: any) => key < minmaxKey, false);
}

export function minby<T>(source: Iterable<T>, valueSelector: Func<T, any>): T | undefined;
export function minby<T>(valueSelector: Func<T, any>): OperatorR<T, T | undefined>;
export function minby() {
    return wrapInThunk(arguments, _minby);
}
