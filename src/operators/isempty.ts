import { Enumerable } from "../enumerable_";

export function isempty<T>(source: Iterable<T>) {
    for (var item of source) {
        return false;
    }
    return true;
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        isempty<TResult>(): boolean;
    }
}
Enumerable.prototype.isempty = function <T>(this: Enumerable<T>) {
    return isempty(this);
};