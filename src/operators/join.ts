import { Enumerable } from "../enumerable_";
import { keySelector, EIterable, Operator } from "../common/types";
import { wrapInIterable, wrapInThunkAlways, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

function _join<T, T2, TKey, TResult>(source1: Iterable<T>, source2: Iterable<T2>, key1Selector: keySelector<T, TKey>,
    key2Selector: keySelector<T2, TKey>, resultSelector: (item1: T, item2: T2) => TResult) {
    return wrapInIterable(function* () {
        var map2 = new Map<TKey, T2[]>();
        var key: TKey, values: T2[];

        for (var item2 of source2) {
            key = key2Selector(item2);
            values = map2.get(key)
            if (typeof values === "undefined") {
                map2.set(key, [item2]);
            }
            else {
                values.push(item2);
            }
        }

        for (var item1 of source1) {
            key = key1Selector(item1);
            values = map2.get(key);
            if (typeof values !== "undefined") {
                for (var item2 of values) {
                    yield resultSelector(item1, item2);
                }
            }
        }
    });
}


export function join<T, T2, TKey, TResult>(source1: Iterable<T>, source2: Iterable<T2>, key1Selector: keySelector<T, TKey>,
    key2Selector: keySelector<T2, TKey>, resultSelector: (item1: T, item2: T2) => TResult): Iterable<TResult>;
export function join<T, T2, TKey, TResult>(source2: Iterable<T2>, key1Selector: keySelector<T, TKey>,
    key2Selector: keySelector<T2, TKey>, resultSelector: (item1: T, item2: T2) => TResult): Operator<T, TResult>;
export function join() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _join);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        join<T2, TKey, TResult>(source2: EIterable<T2>, key1Selector: keySelector<T, TKey>,
            key2Selector: keySelector<T2, TKey>, resultSelector: (item1: T, item2: T2) => TResult): Enumerable<TResult>;
    }
}
Enumerable.prototype.join = function <T, T2, TKey, TResult>(this: Enumerable<T>, source2: EIterable<T2>, key1Selector: keySelector<T, TKey>,
    key2Selector: keySelector<T2, TKey>, resultSelector: (item1: T, item2: T2) => TResult): Enumerable<TResult> {
    return new Enumerable<TResult>(_join(this, source2, key1Selector, key2Selector, resultSelector));
};
