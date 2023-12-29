// import { Enumerable } from "../enumerable_";
// import { OrderedEnumerable, OrderingState } from "../orderedEnumerable";
// import { keySelector, comparer } from "./types";
// import { isNothing } from "./utils";
// import { wrapInIterable } from "./wrap";

// export function ordebyImpl<T>(state: OrderingState<T>) {
//     return wrapInIterable(function* () {
//         yield* Array.from<T>(state.originalIterable).sort(buildComparer(state));
//     });
// }


// function buildComparer<T>(state: OrderingState<T>): comparer<T> {
//     if (state.prevState) {
//         var prevComparer = buildComparer(state.prevState);
//         return (a, b) => {
//             var res = prevComparer(a, b);
//             if (res === 0) {
//                 return compare(a, b);
//             }
//             return res;
//         }
//     }
//     else {
//         return compare;
//     }

//     function compare(a: T, b: T) {
//         var aKey = state.keySelector(a);
//         var bKey = state.keySelector(b);
//         if (aKey === bKey) {
//             return 0;
//         }
//         return state.descending ? (aKey < bKey ? 1 : -1) : (aKey < bKey ? -1 : 1);
//     };
// }

