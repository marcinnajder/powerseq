import { Dictionary, Operator, OperatorR } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _toobject<T, TElement>(source: Iterable<T>, keySelector: (item: T) => any, elementSelector?: (item: T) => TElement): Dictionary<TElement> {
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

export function toobject<T>(source: Iterable<T>, keySelector: (item: T) => any): Dictionary<T>;
export function toobject<T, TElement>(source: Iterable<T>, keySelector: (item: T) => any, elementSelector: (item: T) => TElement): Dictionary<TElement>;
export function toobject<T>(keySelector: (item: T) => any): OperatorR<T, Dictionary<T>>;
export function toobject<T, TElement>(keySelector: (item: T) => any, elementSelector: (item: T) => TElement): OperatorR<T, Dictionary<TElement>>;
export function toobject() {
    return wrapInThunk(arguments, _toobject);
}

