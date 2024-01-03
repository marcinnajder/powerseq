import { Func, OperatorR } from "../common/types";
import { ordebyImpl, OrderedIterable, OrderingState } from "../common/ordering";
import { wrapInThunk } from "../common/wrap";

function _orderby<T>(source: Iterable<T>, keySelector: Func<T, any>): OrderedIterable<T> {
    var state: OrderingState<T> = { descending: false, keySelector, originalIterable: source };
    var sortingIterable = ordebyImpl(state);
    return { state, ...sortingIterable };
}

export function orderby<T>(source: Iterable<T>, keySelector: Func<T, any>): OrderedIterable<T>;
export function orderby<T>(keySelector: Func<T, any>): OperatorR<T, OrderedIterable<T>>;
export function orderby() {
    return wrapInThunk(arguments, _orderby);
}
