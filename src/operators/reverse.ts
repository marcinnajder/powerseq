import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _reverse<T>(source: Iterable<T>) {
    return wrapInIterable(function* () {
        yield* Array.from(source).reverse();
    });
}

export function reverse<T>(source: Iterable<T>): Iterable<T>;
export function reverse<T>(): Operator<T, T>;
export function reverse() {
    return wrapInThunk(arguments, _reverse);
}


declare module '../enumerable_' {
    interface Enumerable<T> {
        reverse(): Enumerable<T>;
    }
}
Enumerable.prototype.reverse = function <T>(this: Enumerable<T>): Enumerable<T> {
    return new Enumerable<T>(_reverse<T>(this));
};