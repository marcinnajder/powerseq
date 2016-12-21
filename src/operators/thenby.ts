import { Enumerable } from "../enumerable";
import { OrderedEnumerable, OrderingState} from "../orderedEnumerable";
import { keySelector } from "../common/types";
import { ordebyImpl } from "../common/ordering";

export function thenby<T>(source: OrderedEnumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    var state: OrderingState<T> = { descending: false, keySelector, originalIterable: source.state.originalIterable, prevState: source.state };
    var sortingIterable = ordebyImpl(state);
    return new OrderedEnumerable<T>(sortingIterable, state);
}

declare module '../orderedEnumerable' {
    interface OrderedEnumerable<T> {
        thenby(keySelector: keySelector<T, any>): OrderedEnumerable<T>;
    }
}
OrderedEnumerable.prototype.thenby = function <T>(this: OrderedEnumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    return thenby<T>(this, keySelector);
};