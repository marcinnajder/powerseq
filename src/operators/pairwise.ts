import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _pairwise<T>(source: Iterable<T>) {
    return wrapInIterable(function* () {
        const iterator = source[Symbol.iterator]();
        let result;

        if (!(result = iterator.next()).done) {
            let prev = result.value;
            while (!(result = iterator.next()).done) {
                yield [prev, result.value];
                prev = result.value;
            }
        }
    });
}

export function pairwise<T>(source: Iterable<T>): Iterable<[T, T]>;
export function pairwise<T>(): Operator<T, [T, T]>;
export function pairwise() {
    return wrapInThunk(arguments, _pairwise);
}