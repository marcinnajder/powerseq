import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { selector, Operator } from "../common/types";

function _map<T, TResult>(source: Iterable<T>, projection: selector<T, TResult>) {
    return wrapInIterable(function* () {
        var index = 0;
        for (var item of source) {
            yield projection(item, index++);
        }
    });
}

export function map<T, TResult>(source: Iterable<T>, projection: selector<T, TResult>): Iterable<TResult>;
export function map<T, TResult>(projection: selector<T, TResult>): Operator<T, TResult>;
export function map() {
    return wrapInThunk(arguments, _map);
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        map<TResult>(projection: selector<T, TResult>): Enumerable<TResult>;
    }
}
Enumerable.prototype.map = function <T, TResult>(this: Enumerable<T>, projection: selector<T, TResult>) {
    return new Enumerable<TResult>(map(this, projection));
};




// function filterImpl<T>(source: Iterable<T>, predicate: predicate<T>): Iterable<T> {
//     return wrapInIterable(function* () {
//         var index = 0;
//         for (var item of source) {
//             if (predicate(item, index++)) {
//                 yield item;
//             }
//         }
//     });
// }

// export function filter<T>(source: Iterable<T>, predicate: predicate<T>): Iterable<T>;
// export function filter<T>(predicate: predicate<T>): Operator<T, T>;
// export function filter() {
//     return wrapInThunk(arguments, filterImpl);
// }

// declare module '../enumerable_' {
//     interface Enumerable<T> {
//         filter(predicate: predicate<T>): Enumerable<T>;
//     }
// }
// Enumerable.prototype.filter = function <T>(this: Enumerable<T>, predicate: predicate<T>) {
//     return new Enumerable<T>(filter(this, predicate));
// };