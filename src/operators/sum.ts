import { Enumerable } from "../enumerable_";
import { keySelector, Operator, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _sum<T>(source: Iterable<T>, valueSelector?: keySelector<T, number>): number {
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

export function sum<T>(source: Iterable<T>, valueSelector?: keySelector<T, number>): number;
export function sum<T>(valueSelector?: keySelector<T, number>): OperatorR<T, number>;
export function sum() {
    return wrapInThunk(arguments, _sum);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        sum(): number;
        sum(valueSelector: keySelector<T, number>): number;
    }
}
Enumerable.prototype.sum = function <T>(this: Enumerable<T>, valueSelector?: keySelector<T, number>): number {
    return _sum(this, valueSelector);
};