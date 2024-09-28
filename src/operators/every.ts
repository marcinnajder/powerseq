import { Predicate, OperatorR, PredicateS, OperatorS } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _every<T>(source: Iterable<T>, predicate: Predicate<T>): boolean {
    let index = 0;
    for (const item of source) {
        if (!predicate(item, index++)) {
            return false;
        }
    }
    return true;
}

export function every<T, S extends T>(source: Iterable<T>, predicate: PredicateS<T, S>): source is Iterable<S>;
export function every<T, S extends T>(predicate: PredicateS<T, S>): OperatorS<T, S>
export function every<T>(source: Iterable<T>, predicate: Predicate<T>): boolean;
export function every<T>(predicate: Predicate<T>): OperatorR<T, boolean>;
export function every() {
    return wrapInThunk(arguments, _every);
}   