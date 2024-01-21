import { OperatorR, Func2 } from "../common/types";
import { wrapInThunk } from "../common/wrap";

function _countby<T, K>(source: Iterable<T>, keySelector: Func2<T, number, K>): Map<K, number> {
    const result = new Map<K, number>();
    let index = 0;

    for (const item of source) {
        const key = keySelector(item, index++);
        result.set(key, (result.get(key) ?? 0) + 1);
    }

    return result;
}

export function countby<T, K>(source: Iterable<T>, keySelector: Func2<T, number, K>): Map<K, number>;
export function countby<T, K>(keySelector: Func2<T, number, K>): OperatorR<T, Map<T, number>>;
export function countby() {
    return wrapInThunk(arguments, _countby);
}

