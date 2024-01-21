import { Func, Operator, Func2 } from "../common/types";
import { wrapInIterable, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

function _join<T1, T2, K, R>(source1: Iterable<T1>, source2: Iterable<T2>, key1Selector: Func<T1, K>,
    key2Selector: Func<T2, K>, resultSelector: Func2<T1, T2, R>) {
    return wrapInIterable(function* () {
        const map2 = new Map<K, T2[]>();

        for (const item2 of source2) {
            const key = key2Selector(item2);
            const values = map2.get(key)
            if (typeof values === "undefined") {
                map2.set(key, [item2]);
            } else {
                values.push(item2);
            }
        }

        for (const item1 of source1) {
            const key = key1Selector(item1);
            const values = map2.get(key);
            if (typeof values !== "undefined") {
                for (const item2 of values) {
                    yield resultSelector(item1, item2);
                }
            }
        }
    });
}


export function join<T1, T2, K, R>(source1: Iterable<T1>, source2: Iterable<T2>, key1Selector: Func<T1, K>, key2Selector: Func<T2, K>, resultSelector: Func2<T1, T2, R>): Iterable<R>;
export function join<T1, T2, K, R>(source2: Iterable<T2>, key1Selector: Func<T1, K>, key2Selector: Func<T2, K>, resultSelector: Func2<T1, T2, R>): Operator<T1, R>;
export function join() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _join);
}
