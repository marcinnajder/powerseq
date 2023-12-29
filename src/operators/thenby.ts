// import { OrderedEnumerable, OrderingState } from "../orderedEnumerable";
// import { keySelector, OperatorTR } from "../common/types";
// import { ordebyImpl } from "../common/ordering";
// import { wrapInThunk } from "../common/wrap";

// function _thenby<T>(source: OrderedEnumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
//     var state: OrderingState<T> = { descending: false, keySelector, originalIterable: source.state.originalIterable, prevState: source.state };
//     var sortingIterable = ordebyImpl(state);
//     return new OrderedEnumerable<T>(sortingIterable, state);
// }

// export function thenby<T>(source: OrderedEnumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T>;
// export function thenby<T>(keySelector: keySelector<T, any>): OperatorTR<OrderedEnumerable<T>, OrderedEnumerable<T>>;
// export function thenby() {
//     return wrapInThunk(arguments, _thenby);
// }

// declare module '../orderedEnumerable' {
//     interface OrderedEnumerable<T> {
//         thenby(keySelector: keySelector<T, any>): OrderedEnumerable<T>;
//     }
// }
// OrderedEnumerable.prototype.thenby = function <T>(this: OrderedEnumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
//     return _thenby<T>(this, keySelector);
// };