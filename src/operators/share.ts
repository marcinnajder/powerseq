import { wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _share<T>(source: Iterable<T>): Iterable<T> {
    const iterator = source[Symbol.iterator]();
    return {
        [Symbol.iterator]() {
            return {
                next(...args) {
                    return iterator.next(...args);
                }
                // return(value) { return iterator.return!(value); },
                // throw(error) { return iterator.throw!(error); }
            };
        }
    }
}


export function share<T>(source: Iterable<T>): Iterable<T>;
export function share<T>(): Operator<T, T>;
export function share() {
    return wrapInThunk(arguments, _share);
}

// function* _share<T>(source: Iterable<T>): Iterable<T> {
//     yield* source;
// }

// - function above implemented using JS generator works almost correctly
// - generator functions in JS return iterator object containing all 3 functions: 'next', 'return' and 'throw'
// - when such an iterator is consumed inside for/of loop, at the end of iteration function 'return(undefined)' is called
// - that means that iteration is over so the iterator object is "disposed", any following calls of 'next' returns '{done: true}'
// - in case of 'share' operator, the whole idea is to "share" the same iterator by many consumers so we cannot dispose it
