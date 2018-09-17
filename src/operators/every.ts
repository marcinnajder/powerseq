import { predicate, OperatorR } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInThunk } from "../common/wrap";

function _every<T>(source: Iterable<T>, predicate: predicate<T>): boolean {
    var index = 0;
    for (var item of source) {
        if (!predicate(item, index++)) {
            return false;
        }
    }
    return true;
}

export function every<T>(source: Iterable<T>, predicate: predicate<T>): boolean;
export function every<T>(predicate: predicate<T>): OperatorR<T, boolean>;
export function every() {
    return wrapInThunk(arguments, _every);
}


declare module '../enumerable_' {
    interface Enumerable<T> {
        every(predicate: predicate<T>): boolean;
    }
}
Enumerable.prototype.every = function <T>(this: Enumerable<T>, predicate: predicate<T>): boolean {
    return _every(this, predicate);
};