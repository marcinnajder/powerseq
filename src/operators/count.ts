import { predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _count<T>(source: Iterable<T>, predicate?: predicate<T>): number {
    var count = 0;
    if (typeof predicate === "undefined") {
        if (Array.isArray(source)) {
            return source.length;
        }
        for (var item of source) {
            count++;
        }
        return count;
    }
    else {
        var index = 0;
        for (var item of source) {
            if (predicate(item, index++)) {
                count++;
            }
        }
        return count;
    }
}

export function count<T>(source: Iterable<T>, predicate?: predicate<T>): number;
export function count<T>(predicate?: predicate<T>): OperatorR<T, number>;
export function count() {
    return wrapInThunk(arguments, _count);
}