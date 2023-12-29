import { Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _takelast<T>(source: Iterable<T>, count: number) {
    return wrapInIterable(function* () {
        if (typeof count === "undefined" || count <= 0) {
            return;
        }

        var iterator = source[Symbol.iterator]();
        var value: IteratorResult<T> | undefined;

        if (count === 1) {
            while (true) {
                var temp = iterator.next();
                if (temp.done) {
                    if (value) {
                        yield value.value;
                    }
                    return;
                }
                value = temp;
            }
        }

        var result: T[] = [];

        // process first 'count' items
        for (let i = 0; i < count; i++) {
            value = iterator.next();
            if (value.done) {
                if (i > 0) {
                    yield* result;
                }
                return;
            }
            result.push(value.value);
        }

        // process other items
        var j = 0;
        while (true) {
            value = iterator.next();
            if (value.done) {
                for (var k = 0; k < count; k++) {
                    yield result[(j + k) % count];
                }
                return;
            }
            result[j++] = value.value;
            if (j === count) {
                j = 0;
            }
        }
    });
}

export function takelast<T>(source: Iterable<T>, count: number): Iterable<T>;
export function takelast<T>(count: number): Operator<T, T>;
export function takelast() {
    return wrapInThunk(arguments, _takelast);
}
