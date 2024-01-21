import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _skip<T>(source: Iterable<T>, count: number) {
    return wrapInIterable(function* () {
        if (count >= 0) {
            const iterator = source[Symbol.iterator]();
            let value: IteratorResult<T>;

            let i = 0;
            while (i++ < count) {
                value = iterator.next();
                if (value.done) return;
            }

            while (true) {
                const value = iterator.next();
                if (value.done) {
                    return;
                }
                yield value.value;
            }
        }
    });
}

export function skip<T>(source: Iterable<T>, count: number): Iterable<T>;
export function skip<T>(count: number): Operator<T, T>;
export function skip() {
    return wrapInThunk(arguments, _skip);
}
