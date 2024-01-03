import { wrapInThunk } from "../common/wrap";
import { Dictionary, OperatorR, Func2, Func } from "../common/types";
import { _groupby } from "./groupby"

function _groupbytoobject<T, E = T>(source: Iterable<T>, keySelector: Func2<T, number, any>, elementSelector?: Func<T, E>): Dictionary<E[]> {
    return Object.fromEntries(_groupby(source, keySelector, elementSelector));
}

export function groupbytoobject<T>(source: Iterable<T>, keySelector: Func2<T, number, any>): Dictionary<T[]>;
export function groupbytoobject<T, E>(source: Iterable<T>, keySelector: Func2<T, number, any>, elementSelector: Func<T, E>): Dictionary<E[]>;
export function groupbytoobject<T>(keySelector: Func2<T, number, any>): OperatorR<T, Dictionary<T[]>>;
export function groupbytoobject<T, E>(keySelector: Func2<T, number, any>, elementSelector: Func<T, E>): OperatorR<T, Dictionary<E[]>>;
export function groupbytoobject() {
    return wrapInThunk(arguments, _groupbytoobject);
}



