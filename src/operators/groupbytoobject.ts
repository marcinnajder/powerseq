import { wrapInThunk } from "../common/wrap";
import { OperatorR, Func2, Dictionary } from "../common/types";
import { identity } from "../common/utils";


export function _groupbytoobject<T, K, E = T>(source: Iterable<T>, keySelector: Func2<T, number, K>,
    elementSelector?: Func2<T, K, E>): Dictionary<E[]> {

    const result: Dictionary<any> = {};
    const eSelector = elementSelector ?? (identity as Func2<T, K, E>);
    let index = 0;

    for (const item of source) {
        const key = keySelector(item, index++);
        const element = eSelector(item, key);
        const elements = result[key as any];

        if (typeof elements === "undefined") {
            result[key as any] = [element];
        } else {
            elements.push(element);
        }
    }

    return result;
}


export function groupbytoobject<T, K>(source: Iterable<T>, keySelector: Func2<T, number, K>): Dictionary<T[]>;
export function groupbytoobject<T, K, E>(source: Iterable<T>, keySelector: Func2<T, number, K>, elementSelector: Func2<T, K, E>): Dictionary<E[]>;
export function groupbytoobject<T, K>(keySelector: Func2<T, number, K>): OperatorR<T, Dictionary<T[]>>;
export function groupbytoobject<T, K, E>(keySelector: Func2<T, number, K>, elementSelector: Func2<T, K, E>): OperatorR<T, Dictionary<E[]>>;
export function groupbytoobject() {
    return wrapInThunk(arguments, _groupbytoobject);
}



