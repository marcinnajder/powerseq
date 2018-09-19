import { Enumerable } from "../enumerable_";
import { wrapInThunk } from "../common/wrap";
import { Operator, OperatorR } from "../common/types";

function _tomap<T, TKey, TElement>(source: Iterable<T>, keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement): Map<TKey, TElement> {
    var map = new Map<TKey, TElement>();

    if (typeof elementSelector === "undefined") {
        for (var item of source) {
            //if(map.has(key)) throw new TypeError("keySelector produces duplicate keys for two elements");
            map.set(keySelector(item), <any>item);
        }
    }
    else {
        for (var item of source) {
            map.set(keySelector(item), elementSelector(item));
        }
    }
    return map;
}

export function tomap<T, TKey>(source: Iterable<T>, keySelector: (item: T) => TKey): Map<TKey, T>;
export function tomap<T, TKey, TElement>(source: Iterable<T>, keySelector: (item: T) => TKey, elementSelector: (item: T) => TElement): Map<TKey, TElement>;
export function tomap<T, TKey>(keySelector: (item: T) => TKey): OperatorR<T, Map<TKey, T>>;
export function tomap<T, TKey, TElement>(keySelector: (item: T) => TKey, elementSelector: (item: T) => TElement): OperatorR<T, Map<TKey, TElement>>;
export function tomap() {
    return wrapInThunk(arguments, _tomap);
}


declare module '../enumerable_' {
    interface Enumerable<T> {
        tomap<TKey>(keySelector: (item: T) => TKey): Map<TKey, T>;
        tomap<TKey, TElement>(keySelector: (item: T) => TKey, elementSelector: (item: T) => TElement): Map<TKey, TElement>;
    }
}
Enumerable.prototype.tomap = function <T, TKey, TElement>(this: Enumerable<T>, keySelector: (item: T) => TKey, elementSelector?: (item: T) => TElement): Map<TKey, TElement> {
    return _tomap(this._iterable, keySelector, elementSelector);
};