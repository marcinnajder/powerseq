import { keySelector, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _average<T>(source: Iterable<T>, valueSelector?: keySelector<T, number>): number | undefined {
    var result = 0;
    var count = 0;
    if (typeof valueSelector === "undefined") {
        for (var item of source) {
            result += <any>item;
            count++;
        }
    } else {
        for (var item of source) {
            result += valueSelector(item);
            count++
        }
    }
    return count === 0 ? undefined : (result / count);
}

export function average(source: Iterable<number>): number | undefined;
export function average<T>(source: Iterable<T>, valueSelector: keySelector<T, number>): number | undefined;
export function average<T>(): OperatorR<T, number | undefined>;
export function average<T>(valueSelector: keySelector<T, number>): OperatorR<T, number | undefined>;
export function average() {
    return wrapInThunk(arguments, _average);
}