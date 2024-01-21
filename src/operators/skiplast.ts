import { Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _skiplast<T>(source: Iterable<T>, count: number) {
    return wrapInIterable(function* () {

        if (typeof count === "undefined" || count <= 0) {
            yield* source;
            return;
        }

        const iterator = source[Symbol.iterator]();
        let value: IteratorResult<T>;
        const cache: T[] = [];

        // process first 'count' items
        for (let i = 0; i < count; i++) {
            value = iterator.next();
            if (value.done) {
                return;
            }
            cache.push(value.value);
        }

        // process other items
        let j = 0;
        while (true) {
            value = iterator.next();
            if (value.done) {
                return;
            }

            yield cache[j];

            cache[j++] = value.value;

            if (j === count) {
                j = 0;
            }
        }
    });
}

export function skiplast<T>(source: Iterable<T>, count: number): Iterable<T>;
export function skiplast<T>(count: number): Operator<T, T>;
export function skiplast() {
    return wrapInThunk(arguments, _skiplast);
}
