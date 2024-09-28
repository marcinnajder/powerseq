import { Predicate, OperatorR, PredicateS } from "../common/types";
import { wrapInThunk } from "../common/wrap";
import { find } from "./find";

function _last<T>(source: Iterable<T>, predicate?: Predicate<T>, defaultValue?: T): T | undefined {
    const array = [...source];
    array.reverse();
    const offset = array.length - 1;
    return predicate ? find(array, (item, index) => predicate(item, offset - index), defaultValue!) : find(array);
}

export function last<T, S extends T>(source: Iterable<T>, predicate?: PredicateS<T, S>): S | undefined;
export function last<T, S extends T>(source: Iterable<T>, predicate: PredicateS<T, S>, defaultValue: S): S;
export function last<T, S extends T>(predicate?: PredicateS<T, S>): OperatorR<T, S | undefined>;
export function last<T, S extends T>(predicate: PredicateS<T, S>, defaultValue: S): OperatorR<T, S>;
export function last<T>(source: Iterable<T>, predicate?: Predicate<T>): T | undefined;
export function last<T>(source: Iterable<T>, predicate: Predicate<T>, defaultValue: T): T;
export function last<T>(predicate?: Predicate<T>): OperatorR<T, T | undefined>;
export function last<T>(predicate: Predicate<T>, defaultValue: T): OperatorR<T, T>;
export function last() {
    return wrapInThunk(arguments, _last);
}