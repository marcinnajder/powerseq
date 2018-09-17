import { predicate, Operator } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _defaultifempty<T>(source: Iterable<T>, defaultValue?: T): Iterable<T> {
    return wrapInIterable(function* () {
        var hasValue = false;
        for (var item of source) {
            hasValue = true;
            yield item;
        }
        if (!hasValue) {
            yield defaultValue;
        }
    });
}

export function defaultifempty<T>(source: Iterable<T>, defaultValue?: T): Iterable<T>
export function defaultifempty<T>(defaultValue?: T): Operator<T, T>
export function defaultifempty() {
    return wrapInThunk(arguments, _defaultifempty);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        defaultifempty(defaultValue?: T): Enumerable<T>;
    }
}
Enumerable.prototype.defaultifempty = function <T>(this: Enumerable<T>, defaultValue?: T): Enumerable<T> {
    return new Enumerable<T>(_defaultifempty<T>(this, defaultValue));
};