import { Enumerable } from "../enumerable";
import { predicate } from "../common/types";
import wrap from "../common/wrap";

export function takelast<T>(source: Iterable<T>, count: number) {
    return wrap(function* () {
        if (typeof count === "undefined" || count <= 0) {
            return;
        }

        var iterator = source[Symbol.iterator]();
        var value: IteratorResult<T>;

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
declare module '../enumerable' {
    interface Enumerable<T> {
        takelast(count: number): Enumerable<T>;
    }
}
Enumerable.prototype.takelast = function <T>(this: Enumerable<T>, count: number) {
    return new Enumerable<T>(takelast<T>(this, count));
};