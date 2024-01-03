import { Dictionary, Operator, OperatorR, Func } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _toobject<T, E>(source: Iterable<T>, keySelector: Func<T, any>, elementSelector?: Func<T, E>): Dictionary<E> {
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

export function toobject<T>(source: Iterable<T>, keySelector: Func<T, any>): Dictionary<T>;
export function toobject<T, E>(source: Iterable<T>, keySelector: Func<T, any>, elementSelector: Func<T, E>): Dictionary<E>;
export function toobject<T>(keySelector: Func<T, any>): OperatorR<T, Dictionary<T>>;
export function toobject<T, E>(keySelector: Func<T, any>, elementSelector: Func<T, E>): OperatorR<T, Dictionary<E>>;
export function toobject() {
    return wrapInThunk(arguments, _toobject);
}

