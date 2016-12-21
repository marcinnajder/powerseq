import {Enumerable} from "./enumerable";
import {keySelector} from "./common/types";

export interface OrderingState<T> {
    originalIterable: Iterable<T>;
    keySelector: keySelector<T, any>;
    descending: boolean;
    prevState?: OrderingState<T>;
}

export class OrderedEnumerable<T> extends Enumerable<T>{
    constructor(_iterable: Iterable<T>, public state: OrderingState<T>) {
        super(_iterable)
    }
}