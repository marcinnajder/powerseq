import { Enumerable } from "../enumerable";
import { OrderedEnumerable, OrderingState} from "../orderedEnumerable";
import { keySelector } from "../common/types";
import { ordebyImpl } from "../common/ordering";

export function orderbydescending<T>(source: Iterable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    var state: OrderingState<T> = { descending: true, keySelector, originalIterable: source};
    var sortingIterable = ordebyImpl(state);
    return new OrderedEnumerable<T>(sortingIterable, state);
}

declare module '../enumerable' {
    interface Enumerable<T> {
        orderbydescending(keySelector: keySelector<T, any>): OrderedEnumerable<T>;
    }
}
Enumerable.prototype.orderbydescending = function <T>(this: Enumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    return orderbydescending<T>(this, keySelector);
};