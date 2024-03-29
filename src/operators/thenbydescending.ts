
import { Func, OperatorTR } from "../common/types";
import { ordebyImpl, OrderedIterable, OrderingState } from "../common/ordering";
import { wrapInThunk } from "../common/wrap";

function _thenbydescending<T>(source: OrderedIterable<T>, keySelector: Func<T, any>): OrderedIterable<T> {
    const state: OrderingState<T> = { descending: true, keySelector, originalIterable: source.state.originalIterable, prevState: source.state };
    const sortingIterable = ordebyImpl(state);
    return { state, ...sortingIterable };
}

export function thenbydescending<T>(source: OrderedIterable<T>, keySelector: Func<T, any>): OrderedIterable<T>;
export function thenbydescending<T>(keySelector: Func<T, any>): OperatorTR<OrderedIterable<T>, OrderedIterable<T>>;
export function thenbydescending() {
    return wrapInThunk(arguments, _thenbydescending);
}

