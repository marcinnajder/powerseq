import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function repeatvalue<T>(value: T, count?: number) {
    return wrapInIterable(function* () {
        if (typeof count === "undefined") {
            while (true) {
                yield value;
            }
        }
        else {
            for (var i = 0; i < count; i++) {
                yield value;
            }
        }
    });
}
declare module '../enumerable_' {
    namespace Enumerable {
        export function repeatvalue<T>(value: T, count?: number): Enumerable<T>;
    }
}
Enumerable.repeatvalue = function <T>(value: T, count?: number): Enumerable<T> {
    return new Enumerable<T>(repeatvalue(value, count));
}