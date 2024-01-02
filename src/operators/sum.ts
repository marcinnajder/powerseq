import { Selector, Operator, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _sum<T>(source: Iterable<T>, valueSelector?: Selector<T, number>): number {
    var result = 0;
    if (typeof valueSelector === "undefined") {
        for (var item of source) {
            result += <any>item;
        }
    } else {
        for (var item of source) {
            result += valueSelector(item);
        }
    }
    return result;
}

export function sum<T>(source: Iterable<T>, valueSelector?: Selector<T, number>): number;
export function sum<T>(valueSelector?: Selector<T, number>): OperatorR<T, number>;
export function sum() {
    return wrapInThunk(arguments, _sum);
}
