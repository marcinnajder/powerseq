import { Predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _findindex<T>(source: Iterable<T>, predicate: Predicate<T>): number | undefined {
    let index = 0;
    for (const item of source) {
        if (predicate(item, index)) {
            return index;
        }
        index++;
    }
}

export function findindex<T>(source: Iterable<T>, predicate: Predicate<T>): number | undefined;
export function findindex<T>(predicate: Predicate<T>): OperatorR<T, number | undefined>;
export function findindex() {
    return wrapInThunk(arguments, _findindex);
}

