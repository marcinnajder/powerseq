import { Predicate, Operator, PredicateS } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _takewhile<T>(source: Iterable<T>, predicate: Predicate<T>) {
    return wrapInIterable(function* () {
        let index = 0;
        for (const item of source) {
            if (!predicate(item, index++)) {
                break;
            }
            yield item;
        }
    });
}

export function takewhile<T, S extends T>(source: Iterable<T>, predicate: PredicateS<T, S>): Iterable<S>;
export function takewhile<T, S extends T>(predicate: PredicateS<T, S>): Operator<T, S>;
export function takewhile<T>(source: Iterable<T>, predicate: Predicate<T>): Iterable<T>;
export function takewhile<T>(predicate: Predicate<T>): Operator<T, T>;
export function takewhile() {
    return wrapInThunk(arguments, _takewhile);
}
