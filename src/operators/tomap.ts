import { wrapInThunk } from "../common/wrap";
import { Func, OperatorR } from "../common/types";

function _tomap<T, K, E>(source: Iterable<T>, keySelector: Func<T, K>, elementSelector?: Func<T, E>): Map<K, E> {
    const map = new Map<K, E>();

    if (typeof elementSelector === "undefined") {
        for (const item of source) {
            //if(map.has(key)) throw new TypeError("keySelector produces duplicate keys for two elements");
            map.set(keySelector(item), <any>item);
        }
    }
    else {
        for (const item of source) {
            map.set(keySelector(item), elementSelector(item));
        }
    }
    return map;
}

export function tomap<T, K>(source: Iterable<T>, keySelector: Func<T, K>): Map<K, T>;
export function tomap<T, K, E>(source: Iterable<T>, keySelector: Func<T, K>, elementSelector: Func<T, E>): Map<K, E>;
export function tomap<T, K>(keySelector: Func<T, K>): OperatorR<T, Map<K, T>>;
export function tomap<T, K, E>(keySelector: Func<T, K>, elementSelector: Func<T, E>): OperatorR<T, Map<K, E>>;
export function tomap() {
    return wrapInThunk(arguments, _tomap);
}
