import { wrapInThunk } from "../common/wrap";
import { OperatorR, SelectorI, Selector } from "../common/types";
import { identity } from "../common/utils"

// zmiany
// - zwaracamy zawsze Map ktora jest iterowalana, wartoscia jest tablica a nie Enumerable<T>
// - teraz funkcja nie bedzie "leniwa", tylko od razu zwraca rezultat
// - mniej przeladowac, kompletnie nie bedzie 'resultSelector'
// - na przykladach poprawek w powerseq lub osobnych pokazac jak obecnie korzystac z groupby dla kazdego z poprzednich przeladowan

export function _groupby<T, K, E = T>(source: Iterable<T>, keySelector: SelectorI<T, K>, elementSelector?: Selector<T, E>): Map<K, E[]> {
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

export function groupby<T, K>(source: Iterable<T>, keySelector: SelectorI<T, K>): Map<K, T[]>;
export function groupby<T, K, E>(source: Iterable<T>, keySelector: SelectorI<T, K>, elementSelector: Selector<T, E>): Map<K, E[]>;
export function groupby<T, K>(keySelector: SelectorI<T, K>): OperatorR<T, Map<K, T[]>>;
export function groupby<T, K, E>(keySelector: SelectorI<T, K>, elementSelector: Selector<T, E>): OperatorR<T, Map<K, E[]>>;
export function groupby() {
    return wrapInThunk(arguments, _groupby);
}



