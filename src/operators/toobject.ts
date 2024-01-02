import { Dictionary, Operator, OperatorR, Selector } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _toobject<T, E>(source: Iterable<T>, keySelector: Selector<T, any>, elementSelector?: Selector<T, E>): Dictionary<E> {
    var map: Dictionary<E> = {};

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

export function toobject<T>(source: Iterable<T>, keySelector: Selector<T, any>): Dictionary<T>;
export function toobject<T, E>(source: Iterable<T>, keySelector: Selector<T, any>, elementSelector: Selector<T, E>): Dictionary<E>;
export function toobject<T>(keySelector: Selector<T, any>): OperatorR<T, Dictionary<T>>;
export function toobject<T, E>(keySelector: Selector<T, any>, elementSelector: Selector<T, E>): OperatorR<T, Dictionary<E>>;
export function toobject() {
    return wrapInThunk(arguments, _toobject);
}

