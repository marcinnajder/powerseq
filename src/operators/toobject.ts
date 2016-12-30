import { Enumerable } from "../enumerable";
import { Dictionary } from "../common/types";

export function toobject<T>(source: Iterable<T>, keySelector: (item: T) => any): Dictionary<T>;
export function toobject<T, TElement>(source: Iterable<T>, keySelector: (item: T) => any, elementSelector: (item: T) => TElement): Dictionary<TElement>
export function toobject<T, TElement>(source: Iterable<T>, keySelector: (item: T) => any, elementSelector?: (item: T) => TElement): Dictionary<TElement> {
    var map: Dictionary<TElement> = {};

    if (typeof elementSelector === "undefined") {
        for (var item of source) {
            map[keySelector(item)] = <any>item;
        }
    }
    else {
        for (var item of source) {
            map[keySelector(item)] = elementSelector(item);
        }
    }
    return map;
}
declare module '../enumerable' {
    interface Enumerable<T> {
        toobject(keySelector: (item: T) => any): Dictionary<T>;
        toobject<TElement>(keySelector: (item: T) => any, elementSelector: (item: T) => TElement): Dictionary<TElement>;
    }
}
Enumerable.prototype.toobject = function <T, TElement>(this: Enumerable<T>, keySelector: (item: T) => any, elementSelector?: (item: T) => TElement): Dictionary<TElement> {
    return toobject(this._iterable, keySelector, elementSelector);
};
