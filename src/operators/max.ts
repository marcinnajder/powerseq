import { Func2, OperatorR } from "../common/types";
import { maxmin } from "../common/maxmin";
import { wrapInThunk } from "../common/wrap";
import { identity } from "../common/utils";

function _max<T, V>(source: Iterable<T>, valueSelector?: Func2<T, number, V>): any {
    return maxmin(source, valueSelector ?? identity, (key: any, minmaxKey: any) => key > minmaxKey, true);
}

export function max<T>(source: Iterable<T>): T | undefined;
export function max<T, V>(source: Iterable<T>, valueSelector: Func2<T, number, V>): V | undefined;
export function max<T>(): OperatorR<T, T | undefined>;
export function max<T, V>(valueSelector: Func2<T, number, V>): OperatorR<T, V | undefined>;
export function max() {
    return wrapInThunk(arguments, _max);
}
