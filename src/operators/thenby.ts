
import { Func, OperatorTR } from "../common/types";
import { ordebyImpl, OrderedIterable, OrderingState } from "../common/ordering";
import { wrapInThunk } from "../common/wrap";

function _thenby<T>(source: OrderedIterable<T>, keySelector: Func<T, any>): OrderedIterable<T> {
    var state: OrderingState<T> = { descending: false, keySelector, originalIterable: source.state.originalIterable, prevState: source.state };
    var sortingIterable = ordebyImpl(state);
    return { state, ...sortingIterable };
}

export function thenby<T>(source: OrderedIterable<T>, keySelector: Func<T, any>): OrderedIterable<T>;
export function thenby<T>(keySelector: Func<T, any>): OperatorTR<OrderedIterable<T>, OrderedIterable<T>>;
export function thenby() {
    return wrapInThunk(arguments, _thenby);
}

