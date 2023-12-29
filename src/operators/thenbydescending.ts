
// import { OrderedEnumerable, OrderingState } from "../orderedEnumerable";
// import { keySelector, OperatorTR } from "../common/types";
// import { ordebyImpl } from "../common/ordering";
// import { wrapInThunk } from "../common/wrap";

// function _thenbydescending<T>(source: OrderedEnumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
//     var state: OrderingState<T> = { descending: true, keySelector, originalIterable: source.state.originalIterable, prevState: source.state };
//     var sortingIterable = ordebyImpl(state);
//     return new OrderedEnumerable<T>(sortingIterable, state);
// }

// export function thenbydescending<T>(source: OrderedEnumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T>;
// export function thenbydescending<T>(keySelector: keySelector<T, any>): OperatorTR<OrderedEnumerable<T>, OrderedEnumerable<T>>;
// export function thenbydescending() {
//     return wrapInThunk(arguments, _thenbydescending);
// }

// declare module '../orderedEnumerable' {
//     interface OrderedEnumerable<T> {
//         thenbydescending(keySelector: keySelector<T, any>): OrderedEnumerable<T>;
//     }
// }
// OrderedEnumerable.prototype.thenbydescending = function <T>(this: OrderedEnumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
//     return _thenbydescending<T>(this, keySelector);
// };