import { Func2, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _sum<T>(source: Iterable<T>, valueSelector?: Func2<T, number, number>): number {
    let result = 0;

    if (typeof valueSelector === "undefined") {
        for (const item of source) {
            result += <any>item;
        }
    } else {
        let index = 0;
        for (const item of source) {
            result += valueSelector(item, index);
            index++;
        }
    }
    return result;
}

export function sum<T>(source: Iterable<T>, valueSelector?: Func2<T, number, number>): number;
export function sum<T>(valueSelector?: Func2<T, number, number>): OperatorR<T, number>;
export function sum() {
    return wrapInThunk(arguments, _sum);
}
