// import { Enumerable } from "../enumerable_";
// import { keySelector, EIterable, Operator } from "../common/types";
// import { wrapInIterable, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

// function _groupjoin<T, T2, TKey, TResult>(source1: Iterable<T>, source2: Iterable<T2>, key1Selector: keySelector<T, TKey>,
//     key2Selector: keySelector<T2, TKey>, resultSelector: (item1: T, item2: Iterable<T2>) => TResult): Iterable<TResult> {
//     return wrapInIterable(function* () {
//         var map2 = new Map<TKey, T2[]>();
//         var key: TKey, values: T2[];

//         for (var item2 of source2) {
//             key = key2Selector(item2);
//             values = map2.get(key)
//             if (typeof values === "undefined") {
//                 map2.set(key, [item2]);
//             }
//             else {
//                 values.push(item2);
//             }
//         }

//         for (var item1 of source1) {
//             key = key1Selector(item1);
//             values = map2.get(key);
//             if (typeof values !== "undefined") {
//                 yield resultSelector(item1, new Enumerable<T2>(values));
//             }
//         }
//     });
// }


// export function groupjoin<T, T2, TKey, TResult>(source1: Iterable<T>, source2: Iterable<T2>, key1Selector: keySelector<T, TKey>,
//     key2Selector: keySelector<T2, TKey>, resultSelector: (item1: T, item2: Iterable<T2>) => TResult): Iterable<TResult>;
// export function groupjoin<T, T2, TKey, TResult>(source1: Iterable<T>, source2: Iterable<T2>, key1Selector: keySelector<T, TKey>,
//     key2Selector: keySelector<T2, TKey>, resultSelector: (item1: T, item2: Iterable<T2>) => TResult): Iterable<TResult>;
// export function groupjoin<T, T2, TKey, TResult>(source2: Iterable<T2>, key1Selector: keySelector<T, TKey>,
//     key2Selector: keySelector<T2, TKey>, resultSelector: (item1: T, item2: Iterable<T2>) => TResult): Operator<T, TResult>;
// export function groupjoin<T, T2, TKey, TResult>(source2: Iterable<T2>, key1Selector: keySelector<T, TKey>,
//     key2Selector: keySelector<T2, TKey>, resultSelector: (item1: T, item2: Iterable<T2>) => TResult): Operator<T, TResult>;
// export function groupjoin() {
//     return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _groupjoin);
// }

