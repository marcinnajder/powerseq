import { Dictionary, Operator, OperatorR, Func, Func2 } from "../common/types";
import { wrapInThunk } from "../common/wrap";

// moze zrezygnowac z tego groupbytoobject aby tutaj nie pisac countbytoobject zaraz, moze toobject dla Map wystarczy dodac

// groupby(), toobject()
// countby(), toobject()

function _countby<T, K>(source: Iterable<T>, keySelector: Func2<T, number, K>): Map<K, number> {
    const result = new Map<K, number>();
    let index = 0;

    for (let item of source) {
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

