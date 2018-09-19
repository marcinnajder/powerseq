import { Enumerable } from "../enumerable_";
import { OperatorR } from "../common/types";
import { wrapInThunkAlways, wrapInThunk } from "../common/wrap";

function _isempty<T>(source: Iterable<T>): boolean {
    for (var item of source) {
        return false;
    }
    return true;
}

export function isempty<T>(source: Iterable<T>): boolean;
export function isempty<T>(): OperatorR<T, boolean>;
export function isempty() {
    return wrapInThunk(arguments, _isempty);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        isempty<TResult>(): boolean;
    }
}
Enumerable.prototype.isempty = function <T>(this: Enumerable<T>) {
    return _isempty(this);
};