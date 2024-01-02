
import { Selector, Operator, Selector2 } from "../common/types";
import { wrapInIterable, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

function _groupjoin<T1, T2, K, R>(source1: Iterable<T1>, source2: Iterable<T2>, key1Selector: Selector<T1, K>,
    key2Selector: Selector<T2, K>, resultSelector: Selector2<T1, T2[], R>): Iterable<R> {

    return wrapInIterable(function* () {
        const map = new Map<K, T2[]>();

        for (var item2 of source2) {
            const key = key2Selector(item2);
            const values = map.get(key)
            if (typeof values === "undefined") {
                map.set(key, [item2]);
            }
            else {
                values.push(item2);
            }
        }

        for (var item1 of source1) {
            const key = key1Selector(item1);
            const values = map.get(key) ?? [];
            yield resultSelector(item1, values);
        }
    });
}


export function groupjoin<T1, T2, K, R>(source1: Iterable<T1>, source2: Iterable<T2>, key1Selector: Selector<T1, K>,
    key2Selector: Selector<T2, K>, resultSelector: Selector2<T1, T2[], R>): Iterable<R>;
export function groupjoin<T1, T2, K, R>(source2: Iterable<T2>, key1Selector: Selector<T1, K>,
    key2Selector: Selector<T2, K>, resultSelector: Selector2<T1, T2[], R>): Operator<T1, R>;
export function groupjoin() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _groupjoin);
}

