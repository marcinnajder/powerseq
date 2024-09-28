import { Operator, Predicate, PredicateS } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _filter<T>(source: Iterable<T>, predicate: Predicate<T>): Iterable<T> {
    return wrapInIterable(function* () {
        let index = 0;
        for (const item of source) {
            if (predicate(item, index++)) {
                yield item;
            }
        }
    });
}

export function filter<T, S extends T>(source: Iterable<T>, predicate: PredicateS<T, S>): Iterable<S>;
export function filter<T, S extends T>(predicate: PredicateS<T, S>): Operator<T, S>;
export function filter<T>(source: Iterable<T>, predicate: Predicate<T>): Iterable<T>;
export function filter<T>(predicate: Predicate<T>): Operator<T, T>;
export function filter() {
    return wrapInThunk(arguments, _filter);
}
