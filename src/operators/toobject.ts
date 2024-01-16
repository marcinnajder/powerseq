import { Dictionary, OperatorR, OperatorTR, Func2 } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _toobject<T, K, E>(source: Iterable<T>, keySelector?: Func2<T, number, K>, elementSelector?: Func2<T, K, E>): Dictionary<E | T> {
    if (typeof keySelector === "undefined") {
        return Object.fromEntries(source as Iterable<[K, E]>);
    }

    const result: Dictionary<E | T> = {};

    if (typeof elementSelector === "undefined") {
        let index = 0;
        for (const item of source) {
            result[keySelector(item, index++) as string] = item;
        }
    } else {
        let index = 0;
        for (const item of source) {
            const key = keySelector(item, index++);
            result[key as string] = elementSelector(item, key);
        }
    }
    return result;
}

export function toobject<K, E>(source: Iterable<[K, E]>): Dictionary<E>;
export function toobject<T, K>(source: Iterable<T>, keySelector: Func2<T, number, K>): Dictionary<T>;
export function toobject<T, K, E>(source: Iterable<T>, keySelector: Func2<T, number, K>, elementSelector: Func2<T, K, E>): Dictionary<E>;
export function toobject<K, E>(): OperatorTR<Iterable<[K, E]>, Dictionary<E>>;
export function toobject<T, K>(keySelector: Func2<T, number, K>): OperatorR<T, Dictionary<T>>;
export function toobject<T, K, E>(keySelector: Func2<T, number, K>, elementSelector: Func2<T, K, E>): OperatorR<T, Dictionary<E>>;
export function toobject() {
    return wrapInThunk(arguments, _toobject);
}

