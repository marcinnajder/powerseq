import { wrapInThunk } from "../common/wrap";
import { OperatorR, Func2, Func } from "../common/types";
import { identity } from "../common/utils"

export function _groupby<T, K, E = T>(source: Iterable<T>, keySelector: Func2<T, number, K>, elementSelector?: Func<T, E>): Map<K, E[]> {
    const result = new Map<K, E[]>();
    const eSelector = elementSelector ?? (identity as any);
    let index = 0;

    for (let item of source) {
        const key = keySelector(item, index++);
        const element = eSelector(item);
        const elements = result.get(key);

        if (typeof elements === "undefined") {
            result.set(key, [element]);
        } else {
            elements.push(element);
        }
    }

    return result;
}

export function groupby<T, K>(source: Iterable<T>, keySelector: Func2<T, number, K>): Map<K, T[]>;
export function groupby<T, K, E>(source: Iterable<T>, keySelector: Func2<T, number, K>, elementSelector: Func<T, E>): Map<K, E[]>;
export function groupby<T, K>(keySelector: Func2<T, number, K>): OperatorR<T, Map<K, T[]>>;
export function groupby<T, K, E>(keySelector: Func2<T, number, K>, elementSelector: Func<T, E>): OperatorR<T, Map<K, E[]>>;
export function groupby() {
    return wrapInThunk(arguments, _groupby);
}



