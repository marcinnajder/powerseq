import { Enumerable } from "../enumerable_";
import { OrderedEnumerable, OrderingState } from "../orderedEnumerable";
import { comparer, keySelector } from "../common/types";
import { ordebyImpl } from "../common/ordering";

export function orderby<T>(source: Iterable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    var state: OrderingState<T> = { descending: false, keySelector, originalIterable: source };
    var sortingIterable = ordebyImpl(state);
    return new OrderedEnumerable<T>(sortingIterable, state);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        orderby(keySelector: keySelector<T, any>): OrderedEnumerable<T>;
    }
}
Enumerable.prototype.orderby = function <T>(this: Enumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    return orderby<T>(this, keySelector);
};