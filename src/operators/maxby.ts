import { Func2, OperatorR } from "../common/types";
import { maxmin } from "../common/maxmin";
import { wrapInThunk } from "../common/wrap";

function _maxby<T>(source: Iterable<T>, valueSelector: Func2<T, number, any>): T | undefined {
    return maxmin(source, valueSelector, (key: any, minmaxKey: any) => key > minmaxKey, false);
}

export function maxby<T>(source: Iterable<T>, valueSelector: Func2<T, number, any>): T | undefined;
export function maxby<T>(valueSelector: Func2<T, number, any>): OperatorR<T, T | undefined>;
export function maxby() {
    return wrapInThunk(arguments, _maxby);
}
