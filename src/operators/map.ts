import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { selector, Operator } from "../common/types";

function _map<T, TResult>(source: Iterable<T>, projection: selector<T, TResult>) {
    return wrapInIterable(function* () {
        var index = 0;
        for (var item of source) {
            yield projection(item, index++);
        }
    });
}

export function map<T, TResult>(source: Iterable<T>, projection: selector<T, TResult>): Iterable<TResult>;
export function map<T, TResult>(projection: selector<T, TResult>): Operator<T, TResult>;
export function map() {
    return wrapInThunk(arguments, _map);
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        map<TResult>(projection: selector<T, TResult>): Enumerable<TResult>;
    }
}
Enumerable.prototype.map = function <T, TResult>(this: Enumerable<T>, projection: selector<T, TResult>) {
    return new Enumerable<TResult>(_map(this, projection));
};
