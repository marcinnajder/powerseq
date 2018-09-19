import { Enumerable } from "../enumerable_";
import { OrderedEnumerable, OrderingState } from "../orderedEnumerable";
import { keySelector, OperatorR } from "../common/types";
import { ordebyImpl } from "../common/ordering";
import { wrapInThunk } from "../common/wrap";

function _orderbydescending<T>(source: Iterable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    var state: OrderingState<T> = { descending: true, keySelector, originalIterable: source };
    var sortingIterable = ordebyImpl(state);
    return new OrderedEnumerable<T>(sortingIterable, state);
}

export function orderbydescending<T>(source: Iterable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T>;
export function orderbydescending<T>(keySelector: keySelector<T, any>): OperatorR<T, OrderedEnumerable<T>>;
export function orderbydescending() {
    return wrapInThunk(arguments, _orderbydescending);
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        orderbydescending(keySelector: keySelector<T, any>): OrderedEnumerable<T>;
    }
}
Enumerable.prototype.orderbydescending = function <T>(this: Enumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    return _orderbydescending<T>(this, keySelector);
};