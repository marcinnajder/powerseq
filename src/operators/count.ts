import { Predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _count<T>(source: Iterable<T>, predicate?: Predicate<T>): number {
    let count = 0;
    if (typeof predicate === "undefined") {
        if (Array.isArray(source)) {
            return source.length;
        }
        for (const _ of source) {
            count++;
        }
        return count;
    }
    else {
        let index = 0;
        for (const item of source) {
            if (predicate(item, index++)) {
                count++;
            }
        }
        return count;
    }
}

export function count<T>(source: Iterable<T>, predicate?: Predicate<T>): number;
export function count<T>(predicate?: Predicate<T>): OperatorR<T, number>;
export function count() {
    return wrapInThunk(arguments, _count);
}