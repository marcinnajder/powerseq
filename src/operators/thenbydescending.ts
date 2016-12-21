
import { Enumerable } from "../enumerable";
import { OrderedEnumerable, OrderingState} from "../orderedEnumerable";
import { keySelector } from "../common/types";
import { ordebyImpl } from "../common/ordering";

export function thenbydescending<T>(source: OrderedEnumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    var state: OrderingState<T> = { descending: true, keySelector, originalIterable: source.state.originalIterable, prevState: source.state };
    var sortingIterable = ordebyImpl(state);
    return new OrderedEnumerable<T>(sortingIterable, state);
}

declare module '../orderedEnumerable' {
    interface OrderedEnumerable<T> {
        thenbydescending(keySelector: keySelector<T, any>): OrderedEnumerable<T>;
    }
}
OrderedEnumerable.prototype.thenbydescending = function <T>(this: OrderedEnumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    return thenbydescending<T>(this, keySelector);
};