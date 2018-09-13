import { predicate } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function repeat<T>(source: Iterable<T>, count?: number) {
    return wrapInIterable(function* () {
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
declare module '../enumerable_' {
    interface Enumerable<T> {
        repeat(count?: number): Enumerable<T>;
    }
}
Enumerable.prototype.repeat = function <T>(this: Enumerable<T>, count?: number) {
    return new Enumerable<T>(repeat<T>(this, count));
};

export const rxjs = "repeat";

