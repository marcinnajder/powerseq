import { predicate } from "../common/types";
import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function repeat<T>(source: Iterable<T>, count?: number) {
    return wrap(function* () {
        if (typeof count === "undefined") {
            while (true) {
                yield* source;
            }
        } else {
            for (var i = 0; i < count; i++) {
                yield* source;
            }
        }
    });
}
declare module '../enumerable' {
    interface Enumerable<T> {
        repeat(count?: number): Enumerable<T>;
    }
}
Enumerable.prototype.repeat = function <T>(this: Enumerable<T>, count?: number) {
    return new Enumerable<T>(repeat<T>(this, count));
};

