
import { Selector, OperatorTR } from "../common/types";
import { ordebyImpl, OrderedIterable, OrderingState } from "../common/ordering";
import { wrapInThunk } from "../common/wrap";

function _thenbydescending<T>(source: OrderedIterable<T>, keySelector: Selector<T, any>): OrderedIterable<T> {
    var state: OrderingState<T> = { descending: true, keySelector, originalIterable: source.state.originalIterable, prevState: source.state };
    var sortingIterable = ordebyImpl(state);
    return { state, ...sortingIterable };
}

export function thenbydescending<T>(source: OrderedIterable<T>, keySelector: Selector<T, any>): OrderedIterable<T>;
export function thenbydescending<T>(keySelector: Selector<T, any>): OperatorTR<OrderedIterable<T>, OrderedIterable<T>>;
export function thenbydescending() {
    return wrapInThunk(arguments, _thenbydescending);
}

