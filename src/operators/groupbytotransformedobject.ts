import { wrapInThunk } from "../common/wrap";
import { OperatorR, Func2, Dictionary } from "../common/types";

export function _groupbytotransformedobject<T, K, V>(source: Iterable<T>, keySelector: Func2<T, number, K>, valueSelector: Func2<T[], string, V>): Dictionary<V> {
    const result: Dictionary<any> = {};
    let index = 0;

    for (const item of source) {
        const key = keySelector(item, index++);
        const elements = result[key as any];
        if (typeof elements === "undefined") {
            result[key as any] = [item];
        } else {
            elements.push(item);
        }
    }

    for (const [key, values] of Object.entries(result)) {
        result[key] = valueSelector(values, key);
    }

    return result;
}

export function groupbytotransformedobject<T, K, V>(source: Iterable<T>, keySelector: Func2<T, number, K>, valueSelector: Func2<T[], string, V>): Dictionary<V>;
export function groupbytotransformedobject<T, K, V>(keySelector: Func2<T, number, K>, valueSelector: Func2<T[], string, V>): OperatorR<T, Dictionary<V>>;
export function groupbytotransformedobject() {
    return wrapInThunk(arguments, _groupbytotransformedobject);
}



