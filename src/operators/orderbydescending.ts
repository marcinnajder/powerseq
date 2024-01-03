import { Func, OperatorR } from "../common/types";
import { ordebyImpl, OrderedIterable, OrderingState } from "../common/ordering";
import { wrapInThunk } from "../common/wrap";

function _orderbydescending<T>(source: Iterable<T>, keySelector: Func<T, any>): OrderedIterable<T> {
    var state: OrderingState<T> = { descending: true, keySelector, originalIterable: source };
    var sortingIterable = ordebyImpl(state);
    return { state, ...sortingIterable };
}

export function orderbydescending<T>(source: Iterable<T>, keySelector: Func<T, any>): OrderedIterable<T>;
export function orderbydescending<T>(keySelector: Func<T, any>): OperatorR<T, OrderedIterable<T>>;
export function orderbydescending() {
    return wrapInThunk(arguments, _orderbydescending);
}
