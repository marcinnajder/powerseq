import { Func2, OperatorR } from "../common/types";
import { maxmin } from "../common/maxmin";
import { wrapInThunk } from "../common/wrap";

function _minby<T>(source: Iterable<T>, valueSelector: Func2<T, number, any>): T | undefined {
    return maxmin(source, valueSelector, (key: any, minmaxKey: any) => key < minmaxKey, false);
}

export function minby<T>(source: Iterable<T>, valueSelector: Func2<T, number, any>): T | undefined;
export function minby<T>(valueSelector: Func2<T, number, any>): OperatorR<T, T | undefined>;
export function minby() {
    return wrapInThunk(arguments, _minby);
}
