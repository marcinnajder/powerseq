import { Func2, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _average<T>(source: Iterable<T>, valueSelector?: Func2<T, number, number>): number | undefined {
    let result = 0;
    let count = 0;

    if (typeof valueSelector === "undefined") {
        for (const item of source) {
            result += <any>item;
            count++;
        }
    } else {

        for (const item of source) {
            result += valueSelector(item, count);
            count++
        }
    }
    return count === 0 ? undefined : (result / count);
}

export function average(source: Iterable<number>): number | undefined;
export function average<T>(source: Iterable<T>, valueSelector: Func2<T, number, number>): number | undefined;
export function average<T>(): OperatorR<T, number | undefined>;
export function average<T>(valueSelector: Func2<T, number, number>): OperatorR<T, number | undefined>;
export function average() {
    return wrapInThunk(arguments, _average);
}