import { Predicate, OperatorR, PredicateS } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _find<T>(source: Iterable<T>, predicate?: Predicate<T>, defaultValue?: T): T | undefined {
    if (typeof predicate === "undefined") {
        for (const item of source) {
            return item;
        }
        return defaultValue;
    } else {
        let index = 0;
        for (const item of source) {
            if (predicate(item, index++)) {
                return item;
            }
        }
        return defaultValue;
    }
}

export function find<T, S extends T>(source: Iterable<T>, predicate?: PredicateS<T, S>): S | undefined;
export function find<T, S extends T>(source: Iterable<T>, predicate: PredicateS<T, S>, defaultValue: S): S;
export function find<T, S extends T>(predicate?: PredicateS<T, S>): OperatorR<T, S | undefined>;
export function find<T, S extends T>(predicate: PredicateS<T, S>, defaultValue: S): OperatorR<T, S>;
export function find<T>(source: Iterable<T>, predicate?: Predicate<T>): T | undefined;
export function find<T>(source: Iterable<T>, predicate: Predicate<T>, defaultValue: T): T;
export function find<T>(predicate?: Predicate<T>): OperatorR<T, T | undefined>;
export function find<T>(predicate: Predicate<T>, defaultValue: T): OperatorR<T, T>;
export function find() {
    return wrapInThunk(arguments, _find);
}