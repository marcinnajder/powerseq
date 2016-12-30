import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function skip<T>(source: Iterable<T>, count: number) {
    return wrap(function* () {
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
declare module '../enumerable' {
    interface Enumerable<T> {
        skip(count: number): Enumerable<T>;
    }
}
Enumerable.prototype.skip = function <T>(this: Enumerable<T>, count: number) {
    return new Enumerable<T>(skip<T>(this, count));
};