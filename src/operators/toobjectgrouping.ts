import { wrapInThunk } from "../common/wrap";
import { OperatorR, Func2, Dictionary } from "../common/types";
import { groupby } from "./groupby";
import { toobject } from "./toobject";


export function _toobjectgrouping<T, K, E>(source: Iterable<T>, keySelector: Func2<T, number, K>, elementSelector?: Func2<T[], K, E>): Dictionary<E | T[]> {
    const eSelector = elementSelector ?? (((values) => values) as Func2<T[], K, T[]>);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return toobject(groupby(source, keySelector), ([key]) => key, ([key, values]) => eSelector(values, key));
}

export function toobjectgrouping<T, K, E>(source: Iterable<T>, keySelector: Func2<T, number, K>, elementSelector: Func2<T[], K, E>): Dictionary<E>;
export function toobjectgrouping<T, K>(source: Iterable<T>, keySelector: Func2<T, number, K>): Dictionary<T[]>;
export function toobjectgrouping<T, K, E>(keySelector: Func2<T, number, K>, elementSelector: Func2<T[], K, E>): OperatorR<T, Dictionary<E>>;
export function toobjectgrouping<T, K>(keySelector: Func2<T, number, K>): OperatorR<T, Dictionary<T[]>>;
export function toobjectgrouping() {
    return wrapInThunk(arguments, _toobjectgrouping);
}



