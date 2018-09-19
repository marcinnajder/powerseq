import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _skip<T>(source: Iterable<T>, count: number) {
    return wrapInIterable(function* () {
        if (count >= 0) {
            var iterator = source[Symbol.iterator]();
            var value: IteratorResult<T>;

            var i = 0;
            while (i++ < count) {
                value = iterator.next();
                if (value.done) return;
            }

            while (true) {
                var value = iterator.next();
                if (value.done) return;
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


declare module '../enumerable_' {
    interface Enumerable<T> {
        skip(count: number): Enumerable<T>;
    }
}
Enumerable.prototype.skip = function <T>(this: Enumerable<T>, count: number) {
    return new Enumerable<T>(_skip<T>(this, count));
};