import { Enumerable } from "../enumerable_";
import { predicate, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _findindex<T>(source: Iterable<T>, predicate: predicate<T>): number | undefined {
    var index = 0;
    for (var item of source) {
        if (predicate(item, index)) {
            return index;
        }
        index++;
    }
}

export function findindex<T>(source: Iterable<T>, predicate: predicate<T>): number | undefined;
export function findindex<T>(predicate: predicate<T>): OperatorR<T, number | undefined>;
export function findindex() {
    return wrapInThunk(arguments, _findindex);
}


declare module '../enumerable_' {
    interface Enumerable<T> {
        findindex(predicate: predicate<T>): number | undefined;
    }
}
Enumerable.prototype.findindex = function <T>(this: Enumerable<T>, predicate: predicate<T>): number | undefined {
    return _findindex(this, predicate);
};
