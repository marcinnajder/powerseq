import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { OperatorR } from "../common/types";

function _toarray<T>(source: Iterable<T>): T[] {
    if (Array.isArray(source)) {
        return source;
    }
    var result: T[] = [];
    for (var item of source) {
        result.push(item);
    }
    return result;
}

export function toarray<T>(source: Iterable<T>): T[];
export function toarray<T>(): OperatorR<T, T[]>;
export function toarray() {
    return wrapInThunk(arguments, _toarray);
}
